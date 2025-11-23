from uuid import uuid4

from fastapi import APIRouter, HTTPException

from ..schemas import Dfd, DfdCreate, DfdStatus, HistoricoEvento

router = APIRouter()

_DFDS: dict[str, Dfd] = {}


def _build_numero() -> str:
    return f"DFD-{len(_DFDS) + 1:04d}"


@router.post("/", response_model=Dfd)
async def create_dfd(payload: DfdCreate) -> Dfd:
    dfd_id = str(uuid4())
    numero = _build_numero()
    historico = [HistoricoEvento(acao="CRIACAO", observacao="DFD criado")] 
    dfd = Dfd(id=dfd_id, numero=numero, logs=historico, **payload.model_dump())
    _DFDS[dfd.id] = dfd
    return dfd


@router.get("/", response_model=list[Dfd])
async def list_dfds() -> list[Dfd]:
    return list(_DFDS.values())


@router.get("/search", response_model=list[Dfd])
async def search_dfds(query: str = "") -> list[Dfd]:
    query_lower = query.lower()
    return [
        dfd
        for dfd in _DFDS.values()
        if query_lower in dfd.titulo.lower() or (dfd.necessidade or "").lower().find(query_lower) >= 0
    ]


@router.get("/{dfd_id}", response_model=Dfd)
async def get_dfd(dfd_id: str) -> Dfd:
    if dfd_id not in _DFDS:
        raise HTTPException(status_code=404, detail="DFD não encontrado")
    return _DFDS[dfd_id]


@router.patch("/{dfd_id}", response_model=Dfd)
async def update_status(dfd_id: str, status: DfdStatus, motivo: str | None = None) -> Dfd:
    if dfd_id not in _DFDS:
        raise HTTPException(status_code=404, detail="DFD não encontrado")
    evento = HistoricoEvento(acao=f"STATUS_{status}", observacao=motivo)
    updated = _DFDS[dfd_id].copy(update={"status": status, "logs": [* _DFDS[dfd_id].logs, evento]})
    _DFDS[dfd_id] = updated
    return updated


@router.put("/{dfd_id}", response_model=Dfd)
async def update_dfd(dfd_id: str, payload: DfdCreate) -> Dfd:
    if dfd_id not in _DFDS:
        raise HTTPException(status_code=404, detail="DFD não encontrado")
    updated = _DFDS[dfd_id].copy(update=payload.model_dump())
    _DFDS[dfd_id] = updated
    return updated
