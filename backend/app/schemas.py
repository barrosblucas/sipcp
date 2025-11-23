from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


class Role(str, Enum):
    admin = "ADMIN"
    manager = "MANAGER"
    viewer = "VIEWER"


class UserBase(BaseModel):
    name: str
    email: EmailStr
    department: Optional[str] = None
    role: Role = Role.viewer


class UserCreate(UserBase):
    password: str = Field(min_length=6)


class UserPublic(UserBase):
    id: str


class Secretaria(BaseModel):
    id: str
    nome: str
    sigla: str
    endereco: Optional[str] = None
    telefone: Optional[str] = None
    email: Optional[str] = None
    cep: Optional[str] = None


class SecretariaCreate(BaseModel):
    nome: str
    sigla: str
    endereco: Optional[str] = None
    telefone: Optional[str] = None
    email: Optional[EmailStr] = None
    cep: Optional[str] = None


class DfdStatus(str, Enum):
    rascunho = "RASCUNHO"
    em_analise = "EM_ANALISE"
    aprovado = "APROVADO"
    rejeitado = "REJEITADO"
    revisao = "REVISAO"


class HistoricoEvento(BaseModel):
    acao: str
    realizado_por: Optional[str] = None
    observacao: Optional[str] = None
    data: datetime = Field(default_factory=datetime.utcnow)


class DfdItem(BaseModel):
    descricao: str
    cat_codigo: Optional[str] = Field(default=None, alias="catCodigo")
    unidade_medida: Optional[str] = None
    quantidade: float
    memoria_calculo: Optional[str] = Field(default=None, alias="memoriaCalculo")
    justificativa_quantitativo: Optional[str] = None

    class Config:
        populate_by_name = True


class Dfd(BaseModel):
    id: str
    numero: str
    secretaria_id: str
    status: DfdStatus = DfdStatus.rascunho
    titulo: str
    necessidade: Optional[str] = None
    gestor_contrato: Optional[str] = None
    fiscal_contrato: Optional[str] = None
    suplentes: List[str] = []
    itens: List[DfdItem] = []
    local_entrega: Optional[str] = None
    substituicao_contrato: bool = False
    vencimento_contrato: Optional[str] = None
    processo_anterior: Optional[str] = None
    aceite: bool = False
    anexos: List[str] = []
    dotacoes: List[str] = []
    logs: List[HistoricoEvento] = []
    termo_referencia_id: Optional[str] = None
    etp_id: Optional[str] = None
    criado_em: datetime = Field(default_factory=datetime.utcnow)
    atualizado_em: datetime = Field(default_factory=datetime.utcnow)


class DfdCreate(BaseModel):
    secretaria_id: str
    titulo: str
    necessidade: Optional[str] = None
    gestor_contrato: Optional[str] = None
    fiscal_contrato: Optional[str] = None
    suplentes: List[str] = []
    itens: List[DfdItem] = []
    local_entrega: Optional[str] = None
    substituicao_contrato: bool = False
    vencimento_contrato: Optional[str] = None
    processo_anterior: Optional[str] = None
    aceite: bool = False
    anexos: List[str] = []
    dotacoes: List[str] = []

    class Config:
        populate_by_name = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AiEnhanceRequest(BaseModel):
    texto: str
    modo: str = Field(
        description="formalizar_texto | memoria_calculo | ortografia | descritivo_item",
        examples=["formalizar_texto"],
    )
    contexto: Optional[str] = None


class AiEnhanceResponse(BaseModel):
    sugestao: str


class DocumentoTipo(str, Enum):
    termo_referencia = "TR"
    etp = "ETP"


class DocumentoStatus(str, Enum):
    rascunho = "RASCUNHO"
    gerado = "GERADO"
    aprovado = "APROVADO"
    arquivado = "ARQUIVADO"


class DocumentoBase(BaseModel):
    dfd_id: str
    tipo: DocumentoTipo
    titulo: str
    escopo: Optional[str] = None
    justificativa: Optional[str] = None
    requisitos: Optional[str] = None
    riscos: Optional[str] = None
    entregaveis: Optional[str] = None
    fontes_pesquisa: List[str] = []
    estimativa_custos: Optional[str] = None
    anexos: List[str] = []
    status: DocumentoStatus = DocumentoStatus.rascunho
    logs: List[HistoricoEvento] = []


class Documento(DocumentoBase):
    id: str
    numero: str
    criado_em: datetime = Field(default_factory=datetime.utcnow)
    atualizado_em: datetime = Field(default_factory=datetime.utcnow)


class DocumentoCreate(DocumentoBase):
    class Config:
        populate_by_name = True
