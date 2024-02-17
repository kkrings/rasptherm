from functools import lru_cache

from pydantic import AnyHttpUrl, AnyUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    sensor_host: AnyUrl
    cors_enabled: bool = False
    cors_allow_origins: set[AnyHttpUrl] = set()
    model_config = SettingsConfigDict(env_prefix="backend_")


@lru_cache
def get_settings() -> Settings:
    return Settings()
