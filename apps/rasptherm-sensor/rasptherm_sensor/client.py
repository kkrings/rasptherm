from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from datetime import timezone
from typing import Optional

import grpc  # type: ignore
import grpc.aio  # type: ignore

from rasptherm_sensor.interface.sensor_pb2 import ReadSensorRequest, ReadSensorResponse
from rasptherm_sensor.interface.sensor_pb2_grpc import SensorStub
from rasptherm_sensor.types import SensorReadout


class SensorClient:
    def __init__(self, sensor: SensorStub) -> None:
        self._sensor = sensor

    async def read_sensor(self) -> SensorReadout:
        response: ReadSensorResponse = await self._sensor.ReadSensor(
            ReadSensorRequest()
        )

        return SensorReadout(
            temperature_degree_celsius=response.temperature_degree_celsius,
            relative_humidity_percent=response.relative_humidity_percent,
            executed_at_utc=response.executed_at.ToDatetime(timezone.utc),
        )


@asynccontextmanager
async def ssl_sensor_connection(
    host: str,
    ssl_root_certificate: bytes,
    ssl_private_key: Optional[bytes] = None,
    ssl_certificate: Optional[bytes] = None,
) -> AsyncIterator[SensorClient]:
    channel_credentials = grpc.ssl_channel_credentials(
        root_certificates=ssl_root_certificate,
        private_key=ssl_private_key,
        certificate_chain=ssl_certificate,
    )

    async with grpc.aio.secure_channel(
        target=host, credentials=channel_credentials
    ) as channel:
        sensor = SensorStub(channel)  # type: ignore
        yield SensorClient(sensor)


@asynccontextmanager
async def non_ssl_sensor_connection(host: str) -> AsyncIterator[SensorClient]:
    async with grpc.aio.insecure_channel(target=host) as channel:
        sensor = SensorStub(channel)  # type: ignore
        yield SensorClient(sensor)
