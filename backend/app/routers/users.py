from uuid import uuid4

from fastapi import APIRouter, HTTPException

from ..schemas import UserCreate, UserPublic, UserBase

router = APIRouter()

_USERS: dict[str, UserPublic] = {}


def _fake_user_from_payload(payload: UserCreate) -> UserPublic:
    return UserPublic(
        id=str(uuid4()),
        name=payload.name,
        email=payload.email,
        department=payload.department,
        role=payload.role,
    )


@router.post("/", response_model=UserPublic)
async def create_user(payload: UserCreate) -> UserPublic:
    if payload.email in (user.email for user in _USERS.values()):
        raise HTTPException(status_code=409, detail="Usuário já cadastrado")
    user = _fake_user_from_payload(payload)
    _USERS[user.id] = user
    return user


@router.get("/", response_model=list[UserPublic])
async def list_users() -> list[UserPublic]:
    return list(_USERS.values())


@router.get("/{user_id}", response_model=UserPublic)
async def get_user(user_id: str) -> UserPublic:
    if user_id not in _USERS:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return _USERS[user_id]


@router.put("/{user_id}", response_model=UserPublic)
async def update_user(user_id: str, payload: UserBase) -> UserPublic:
    if user_id not in _USERS:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    current = _USERS[user_id]
    updated = current.copy(update=payload.model_dump())
    _USERS[user_id] = updated
    return updated
