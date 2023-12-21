from collections.abc import AsyncIterator

import grpc.aio  # type: ignore
import pytest

from sensor.interface import sensor_pb2_grpc
from sensor.interface.sensor_pb2_grpc import SensorStub
from sensor.service import SensorService
from sensor.types import SensorReadout


@pytest.fixture
def temperature() -> float:
    return 21.0


@pytest.fixture
def humidity() -> float:
    return 60.0


@pytest.fixture
def sensor(temperature: float, humidity: float) -> SensorService:
    async def read_sensor() -> SensorReadout:
        return SensorReadout(temperature, humidity)

    return SensorService(read_sensor=read_sensor)


@pytest.fixture
async def port(sensor: SensorService) -> AsyncIterator[int]:
    server = grpc.aio.server()
    sensor_pb2_grpc.add_SensorServicer_to_server(sensor, server)  #  type: ignore
    port = server.add_insecure_port("[::]")
    await server.start()
    yield port
    await server.stop(grace=True)


@pytest.fixture
async def sensor_stub(port: int) -> AsyncIterator[SensorStub]:
    async with grpc.aio.insecure_channel(f"localhost:{port}") as channel:
        yield SensorStub(channel)  # type: ignore
