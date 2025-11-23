from datetime import datetime, timedelta
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from jose import jwt
from passlib.context import CryptContext

from ..config import get_settings
from ..schemas import LoginRequest, TokenResponse

router = APIRouter()
settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory demo credentials
_FAKE_USER = {
    "email": "admin@sipcp.local",
    "password_hash": pwd_context.hash("admin123"),
    "name": "Administrador",
    "role": "ADMIN",
}


def _create_token(email: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.jwt_expires_minutes)
    payload = {"sub": email, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest) -> TokenResponse:
    if payload.email != _FAKE_USER["email"]:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    if not pwd_context.verify(payload.password, _FAKE_USER["password_hash"]):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = _create_token(payload.email)
    return TokenResponse(access_token=token)


@router.get("/me")
async def me() -> dict:
    return {
        "id": str(uuid4()),
        "email": _FAKE_USER["email"],
        "name": _FAKE_USER["name"],
        "role": _FAKE_USER["role"],
    }
