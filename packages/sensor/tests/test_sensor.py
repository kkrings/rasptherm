import pytest

from sensor.client import non_ssl_sensor_connection
from sensor.setup import non_ssl_sensor_setup
from sensor.types import SensorReadout


def test_read_sensor(readout: SensorReadout, expected_readout: SensorReadout) -> None:
    assert readout == expected_readout


@pytest.fixture
def expected_readout() -> SensorReadout:
    return SensorReadout(
        temperature_degree_celsius=21.0, relative_humidity_percent=60.0
    )


@pytest.fixture
async def readout(expected_readout: SensorReadout) -> SensorReadout:
    async def read_sensor() -> SensorReadout:
        return expected_readout

    server, port = non_ssl_sensor_setup(read_sensor)

    await server.start()

    async with non_ssl_sensor_connection(host=f"localhost:{port}") as client:
        readout = await client.read_sensor()

    await server.stop(grace=None)

    return readout
