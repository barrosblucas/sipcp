from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    app_name: str = "SIPCP API"
    mongo_url: str = Field(default="mongodb://localhost:27017/sicp_db", alias="MONGODB_URL")
    jwt_secret_key: str = Field(default="change-me", alias="JWT_SECRET_KEY")
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    jwt_expires_minutes: int = Field(default=60 * 8, alias="JWT_EXPIRES_MINUTES")
    openrouter_api_key: str = Field(default="", alias="OPENROUTER_API_KEY")
    openrouter_base_url: str = Field(default="https://openrouter.ai/api/v1", alias="OPENROUTER_BASE_URL")
    openrouter_model: str = Field(default="gpt-4o-mini", alias="OPENROUTER_MODEL")
    openrouter_temperature: float = Field(default=0.3, alias="OPENROUTER_TEMPERATURE")

    class Config:
        env_file = "../.env"
        env_file_encoding = "utf-8"


def get_settings() -> Settings:
    return Settings()
