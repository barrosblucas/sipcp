from uuid import uuid4

from fastapi import APIRouter, HTTPException

from ..schemas import (
    Documento,
    DocumentoCreate,
    DocumentoStatus,
    DocumentoTipo,
    HistoricoEvento,
)
from .dfd import _DFDS

router = APIRouter()

_DOCUMENTOS: dict[str, Documento] = {}


def _build_numero(tipo: DocumentoTipo) -> str:
    prefix = "TR" if tipo == DocumentoTipo.termo_referencia else "ETP"
    count = len([doc for doc in _DOCUMENTOS.values() if doc.tipo == tipo]) + 1
    return f"{prefix}-{count:04d}"


@router.post("/", response_model=Documento)
async def create_documento(payload: DocumentoCreate) -> Documento:
    if payload.dfd_id not in _DFDS:
        raise HTTPException(status_code=404, detail="DFD associado não encontrado")

    doc_id = str(uuid4())
    numero = _build_numero(payload.tipo)
    documento = Documento(id=doc_id, numero=numero, **payload.model_dump())
    _DOCUMENTOS[doc_id] = documento

    dfd = _DFDS[payload.dfd_id]
    patch = {"termo_referencia_id": doc_id} if payload.tipo == DocumentoTipo.termo_referencia else {"etp_id": doc_id}
    _DFDS[payload.dfd_id] = dfd.copy(update=patch, deep=True)
    return documento


@router.get("/", response_model=list[Documento])
async def list_documentos(tipo: DocumentoTipo | None = None) -> list[Documento]:
    if not tipo:
        return list(_DOCUMENTOS.values())
    return [doc for doc in _DOCUMENTOS.values() if doc.tipo == tipo]


@router.get("/{doc_id}", response_model=Documento)
async def get_documento(doc_id: str) -> Documento:
    if doc_id not in _DOCUMENTOS:
        raise HTTPException(status_code=404, detail="Documento não encontrado")
    return _DOCUMENTOS[doc_id]


@router.patch("/{doc_id}/status", response_model=Documento)
async def update_documento_status(doc_id: str, status: DocumentoStatus, observacao: str | None = None) -> Documento:
    if doc_id not in _DOCUMENTOS:
        raise HTTPException(status_code=404, detail="Documento não encontrado")
    doc = _DOCUMENTOS[doc_id]
    evento = HistoricoEvento(acao=f"STATUS_{status}", observacao=observacao)
    atualizado = doc.copy(update={"status": status, "logs": [*getattr(doc, "logs", []), evento]})
    _DOCUMENTOS[doc_id] = atualizado
    return atualizado


@router.post("/generate-from-dfd/{dfd_id}", response_model=Documento)
async def generate_from_dfd(dfd_id: str, tipo: DocumentoTipo) -> Documento:
    if dfd_id not in _DFDS:
        raise HTTPException(status_code=404, detail="DFD não encontrado para geração")

    base = _DFDS[dfd_id]
    payload = DocumentoCreate(
        dfd_id=dfd_id,
        tipo=tipo,
        titulo=f"{tipo.value} - {base.titulo}",
        escopo=f"Escopo sugerido a partir do DFD {base.numero}: {base.necessidade}",
        justificativa=base.necessidade,
        requisitos="Inclua requisitos técnicos, prazos e critérios de medição seguindo Comprasnet.",
        riscos="Liste riscos operacionais, de entrega e de orçamento.",
        entregaveis="Itens conforme quadro de quantidades e responsabilidades definidas no DFD.",
        fontes_pesquisa=[
            "Portal ComprasNet - histórico de itens semelhantes",
            "PNCP - consultas automáticas",
            "Base interna de DFD/ETP/TR anteriores",
        ],
        estimativa_custos="Consolidar pesquisas internas e externas com memória de cálculo.",
    )
    return await create_documento(payload)
