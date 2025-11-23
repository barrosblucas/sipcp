from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .routers import auth, users, secretarias, dfd, ai, documents


settings = get_settings()

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(secretarias.router, prefix="/secretarias", tags=["secretarias"])
app.include_router(dfd.router, prefix="/dfds", tags=["dfds"])
app.include_router(documents.router, prefix="/documentos", tags=["documentos"])
app.include_router(ai.router, prefix="/ai", tags=["ia"])
