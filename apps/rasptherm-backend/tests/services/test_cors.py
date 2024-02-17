import json

import pytest

from rasptherm_backend.services.cors import CorsConfig, get_cors_config
from rasptherm_backend.services.settings import get_settings


@pytest.mark.usefixtures("config_cors")
def test_cors_config(cors_config: CorsConfig) -> None:
    get_settings.cache_clear()
    get_cors_config.cache_clear()
    assert get_cors_config() == cors_config


@pytest.fixture
def cors_config() -> CorsConfig:
    return CorsConfig(
        cors_enabled=True,
        cors_allow_origins=["https://www.example.com/"],
    )


@pytest.fixture
def config_cors(monkeypatch: pytest.MonkeyPatch, cors_config: CorsConfig) -> None:
    monkeypatch.setenv(
        name="BACKEND_CORS_ENABLED",
        value=str(cors_config.cors_enabled),
    )

    monkeypatch.setenv(
        name="BACKEND_CORS_ALLOW_ORIGINS",
        value=json.dumps(cors_config.cors_allow_origins),
    )
