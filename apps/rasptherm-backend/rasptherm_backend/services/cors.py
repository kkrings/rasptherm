from collections.abc import Sequence
from functools import lru_cache
from typing import NamedTuple

from rasptherm_backend.services.settings import get_settings


class CorsConfig(NamedTuple):
    cors_enabled: bool
    cors_allow_origins: Sequence[str]


@lru_cache
def get_cors_config() -> CorsConfig:
    settings = get_settings()

    return CorsConfig(
        cors_enabled=settings.cors_enabled,
        cors_allow_origins=[str(origin) for origin in settings.cors_allow_origins],
    )
