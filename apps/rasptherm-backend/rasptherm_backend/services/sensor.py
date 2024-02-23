from collections.abc import AsyncIterator, Callable
from contextlib import AbstractAsyncContextManager, asynccontextmanager
from pathlib import Path
from typing import Annotated, Protocol

from fastapi import Depends
from rasptherm_sensor.client import non_ssl_sensor_connection, ssl_sensor_connection
from rasptherm_sensor.types import SensorReadout

from rasptherm_backend.models.sensor import ReadSensorModel
from rasptherm_backend.services.settings import Settings, get_settings


class Sensor(Protocol):
    async def read_sensor(self) -> SensorReadout:
        ...


SensorConnection = Callable[[], AbstractAsyncContextManager[Sensor]]


class SslSensorConnection:
    def __init__(
        self,
        host: str,
        sensor_ssl_root_certificate: str,
        sensor_ssl_private_key: str | None = None,
        sensor_ssl_certificate: str | None = None,
    ) -> None:
        self._host = host
        self._sensor_ssl_root_certificate = sensor_ssl_root_certificate
        self._sensor_ssl_private_key = sensor_ssl_private_key
        self._sensor_ssl_certificate = sensor_ssl_certificate

    @asynccontextmanager
    async def __call__(self) -> AsyncIterator[Sensor]:
        sensor_connection = ssl_sensor_connection(
            host=self._host,
            ssl_root_certificate=self._sensor_ssl_root_certificate,
            ssl_private_key=self._sensor_ssl_private_key,
            ssl_certificate=self._sensor_ssl_certificate,
        )

        async with sensor_connection as sensor:
            yield sensor


class NonSslSensorConnection:
    def __init__(self, host: str) -> None:
        self._host = host

    @asynccontextmanager
    async def __call__(self) -> AsyncIterator[Sensor]:
        async with non_ssl_sensor_connection(host=self._host) as sensor:
            yield sensor


def get_sensor_connection(
    settings: Annotated[Settings, Depends(get_settings)],
) -> SensorConnection:
    host = str(settings.sensor_host)

    if settings.sensor_ssl_root_certificate is None:
        return NonSslSensorConnection(host)

    sensor_ssl_root_certificate = _read_file(
        filepath=settings.sensor_ssl_root_certificate
    )

    sensor_client_ssl_private_key = (
        _read_file(filepath=settings.sensor_ssl_private_key_and_certificate[0])
        if settings.sensor_ssl_private_key_and_certificate is not None
        else None
    )

    sensor_client_ssl_certificate = (
        _read_file(filepath=settings.sensor_ssl_private_key_and_certificate[1])
        if settings.sensor_ssl_private_key_and_certificate is not None
        else None
    )

    return SslSensorConnection(
        host,
        sensor_ssl_root_certificate,
        sensor_client_ssl_private_key,
        sensor_client_ssl_certificate,
    )


async def get_sensor(
    sensor_connection: Annotated[SensorConnection, get_sensor_connection],
) -> AsyncIterator[Sensor]:
    async with sensor_connection() as sensor:
        yield sensor


async def read_sensor(sensor: Sensor) -> ReadSensorModel:
    readout = await sensor.read_sensor()

    return ReadSensorModel(
        temperature_degree_celsius=readout.temperature_degree_celsius,
        relative_humidity_percent=readout.relative_humidity_percent,
        executed_at_utc=readout.executed_at_utc,
    )


def _read_file(filepath: Path) -> str:
    with open(filepath) as filestream:
        filecontent = filestream.read()

    return filecontent
