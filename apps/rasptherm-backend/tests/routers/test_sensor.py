from collections.abc import AsyncIterator, Iterator

import pytest
from fastapi import FastAPI, status
from fastapi.testclient import TestClient
from rasptherm_sensor.types import SensorReadout

from rasptherm_backend.models.sensor import ReadSensorModel
from rasptherm_backend.services.sensor import get_sensor
from rasptherm_backend.utils.dependency import override_dependency


@pytest.mark.usefixtures("override_get_sensor")
def test_read_sensor(client: TestClient, expected_readout: ReadSensorModel) -> None:
    response = client.get("/sensor/read")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == expected_readout.model_dump(mode="json")


class FakeSensor:
    def __init__(self, readout: ReadSensorModel) -> None:
        self._readout = readout

    async def read_sensor(self) -> SensorReadout:
        return SensorReadout(
            temperature_degree_celsius=self._readout.temperature_degree_celsius,
            relative_humidity_percent=self._readout.relative_humidity_percent,
        )


@pytest.fixture
def expected_readout() -> ReadSensorModel:
    return ReadSensorModel(
        temperature_degree_celsius=21.0, relative_humidity_percent=60.0
    )


@pytest.fixture
def override_get_sensor(
    app: FastAPI, expected_readout: ReadSensorModel
) -> Iterator[None]:
    async def get_fake_sensor() -> AsyncIterator[FakeSensor]:
        yield FakeSensor(readout=expected_readout)

    with override_dependency(app, get_sensor, get_fake_sensor):
        yield
