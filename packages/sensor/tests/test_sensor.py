import grpc.aio  # type: ignore
import pytest

from sensor.interface.sensor_pb2 import ReadSensorRequest, ReadSensorResponse
from sensor.interface.sensor_pb2_grpc import SensorStub
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

    async with grpc.aio.insecure_channel(f"localhost:{port}") as channel:
        client = SensorStub(channel)  # type: ignore
        response: ReadSensorResponse = await client.ReadSensor(ReadSensorRequest())

    await server.stop(grace=None)

    return SensorReadout(
        temperature_degree_celsius=response.temperature_degree_celsius,
        relative_humidity_percent=response.relative_humidity_percent,
    )
