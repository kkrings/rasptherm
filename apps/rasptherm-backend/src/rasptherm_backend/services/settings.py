from functools import lru_cache

from pydantic import AnyHttpUrl, AnyUrl, FilePath
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    sensor_host: AnyUrl
    sensor_ssl_root_certificate: FilePath | None = None
    sensor_ssl_private_key_and_certificate: tuple[FilePath, FilePath] | None = None
    cors_enabled: bool = False
    cors_allow_origins: set[AnyHttpUrl] = set()
    model_config = SettingsConfigDict(env_prefix="backend_")


@lru_cache
def get_settings() -> Settings:
    return Settings()
