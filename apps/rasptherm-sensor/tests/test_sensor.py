from datetime import datetime, timezone

import pytest

from rasptherm_sensor.client import non_ssl_sensor_connection
from rasptherm_sensor.setup import non_ssl_sensor_setup
from rasptherm_sensor.types import SensorReadout


def test_read_sensor(readout: SensorReadout, expected_readout: SensorReadout) -> None:
    assert readout == expected_readout


@pytest.fixture
def expected_readout() -> SensorReadout:
    return SensorReadout(
        temperature_degree_celsius=21.0,
        relative_humidity_percent=60.0,
        executed_at_utc=datetime.now(timezone.utc),
    )


@pytest.fixture
async def readout(expected_readout: SensorReadout, port: int) -> SensorReadout:
    async def read_sensor() -> SensorReadout:
        return expected_readout

    server, port = non_ssl_sensor_setup(read_sensor, port)

    await server.start()

    async with non_ssl_sensor_connection(host=f"localhost:{port}") as client:
        readout = await client.read_sensor()

    await server.stop(grace=None)

    return readout
