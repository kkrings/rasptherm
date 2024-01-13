import importlib.metadata

import pytest
from fastapi import status
from fastapi.testclient import TestClient

import rasptherm_backend as backend
from rasptherm_backend.models.metadata import MetadataModel


def test_read_root(client: TestClient, expected_metadata: MetadataModel) -> None:
    response = client.get("/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == expected_metadata.model_dump(mode="json")


@pytest.fixture
def expected_metadata() -> MetadataModel:
    metadata = importlib.metadata.metadata(backend.__package__)

    return MetadataModel(
        description=metadata["Summary"],
        license=metadata["License"],
        version=metadata["Version"],
    )
