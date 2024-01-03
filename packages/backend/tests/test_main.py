import importlib.metadata

import pytest
from fastapi import status
from fastapi.testclient import TestClient

import backend
from backend.schemas.metadata import MetadataSchema


def test_read_root(client: TestClient, expected_metadata: MetadataSchema) -> None:
    response = client.get("/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == expected_metadata.model_dump(mode="json")


@pytest.fixture
def expected_metadata() -> MetadataSchema:
    metadata = importlib.metadata.metadata(backend.__package__)

    return MetadataSchema(
        description=metadata["Summary"],
        license=metadata["License"],
        version=metadata["Version"],
    )
