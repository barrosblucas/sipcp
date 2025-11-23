from uuid import uuid4

from fastapi import APIRouter, HTTPException

from ..schemas import Secretaria, SecretariaCreate

router = APIRouter()

_SECRETARIAS: dict[str, Secretaria] = {}


@router.post("/", response_model=Secretaria)
async def create_secretaria(payload: SecretariaCreate) -> Secretaria:
    secretaria = Secretaria(id=str(uuid4()), **payload.model_dump())
    _SECRETARIAS[secretaria.id] = secretaria
    return secretaria


@router.get("/", response_model=list[Secretaria])
async def list_secretarias() -> list[Secretaria]:
    return list(_SECRETARIAS.values())


@router.put("/{secretaria_id}", response_model=Secretaria)
async def update_secretaria(secretaria_id: str, payload: SecretariaCreate) -> Secretaria:
    if secretaria_id not in _SECRETARIAS:
        raise HTTPException(status_code=404, detail="Secretaria não encontrada")
    updated = _SECRETARIAS[secretaria_id].copy(update=payload.model_dump())
    _SECRETARIAS[secretaria_id] = updated
    return updated
