from collections.abc import Sequence
from functools import lru_cache
from typing import NamedTuple

from pydantic import AnyUrl

from rasptherm_backend.services.settings import get_settings


class CorsConfig(NamedTuple):
    cors_enabled: bool
    cors_allow_origins: Sequence[str]


@lru_cache
def get_cors_config() -> CorsConfig:
    settings = get_settings()

    return CorsConfig(
        cors_enabled=settings.cors_enabled,
        cors_allow_origins=[
            url_to_str(origin) for origin in settings.cors_allow_origins
        ],
    )


def url_to_str(url: AnyUrl) -> str:
    url_str = str(url)
    return url_str[:-1] if url_str.endswith("/") else url_str
