from collections.abc import AsyncIterator, Iterator
from datetime import datetime, timezone

import pytest
from fastapi import FastAPI, status
from fastapi.testclient import TestClient
from grpc import StatusCode  # type: ignore
from grpc.aio import AioRpcError  # type: ignore
from rasptherm_sensor.types import SensorReadout

from rasptherm_backend.models.sensor import ReadSensorModel
from rasptherm_backend.services.sensor import get_sensor
from rasptherm_backend.utils.dependency import override_dependency


@pytest.mark.usefixtures("override_get_sensor")
def test_read_sensor(client: TestClient, expected_readout: ReadSensorModel) -> None:
    response = client.get("/sensor/read")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == expected_readout.model_dump(mode="json", by_alias=True)


@pytest.mark.usefixtures("override_get_sensor_with_not_available_sensor")
def test_read_sensor_service_unavailable(client: TestClient) -> None:
    response = client.get("/sensor/read")
    assert response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE


class FakeSensor:
    def __init__(self, readout: ReadSensorModel) -> None:
        self._readout = readout

    async def read_sensor(self) -> SensorReadout:
        return SensorReadout(
            temperature_degree_celsius=self._readout.temperature_degree_celsius,
            relative_humidity_percent=self._readout.relative_humidity_percent,
            executed_at_utc=self._readout.executed_at_utc,
        )


class FakeSensorNotAvailable:
    async def read_sensor(self) -> SensorReadout:
        raise AioRpcError(
            code=StatusCode.UNAVAILABLE,
            initial_metadata=None,
            trailing_metadata=None,
        )


@pytest.fixture
def expected_readout() -> ReadSensorModel:
    return ReadSensorModel(
        temperature_degree_celsius=21.0,
        relative_humidity_percent=60.0,
        executed_at_utc=datetime.now(timezone.utc),
    )


@pytest.fixture
def override_get_sensor(
    app: FastAPI, expected_readout: ReadSensorModel
) -> Iterator[None]:
    async def get_fake_sensor() -> AsyncIterator[FakeSensor]:
        yield FakeSensor(readout=expected_readout)

    with override_dependency(app, get_sensor, get_fake_sensor):
        yield


@pytest.fixture
def override_get_sensor_with_not_available_sensor(app: FastAPI) -> Iterator[None]:
    async def get_fake_sensor() -> AsyncIterator[FakeSensorNotAvailable]:
        yield FakeSensorNotAvailable()

    with override_dependency(app, get_sensor, get_fake_sensor):
        yield
