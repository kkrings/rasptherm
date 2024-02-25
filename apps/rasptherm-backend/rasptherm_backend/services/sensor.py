from collections.abc import AsyncIterator
from typing import Annotated, Protocol

from fastapi import Depends
from rasptherm_sensor.client import non_ssl_sensor_connection, ssl_sensor_connection
from rasptherm_sensor.types import SensorReadout

from rasptherm_backend.models.sensor import ReadSensorModel
from rasptherm_backend.services.certs import read_sensor_certs
from rasptherm_backend.services.settings import Settings, get_settings


class Sensor(Protocol):
    async def read_sensor(self) -> SensorReadout:
        ...


async def get_sensor(
    settings: Annotated[Settings, Depends(get_settings)],
) -> AsyncIterator[Sensor]:
    sensor_certs = read_sensor_certs(settings)

    connect_to_sensor = (
        ssl_sensor_connection(
            host=str(settings.sensor_host),
            ssl_root_certificate=sensor_certs.ssl_root_certificate,
            ssl_private_key=sensor_certs.ssl_private_key,
            ssl_certificate=sensor_certs.ssl_certificate,
        )
        if sensor_certs.ssl_root_certificate is not None
        else non_ssl_sensor_connection(host=str(settings.sensor_host))
    )

    async with connect_to_sensor as sensor:
        yield sensor


async def read_sensor(sensor: Sensor) -> ReadSensorModel:
    readout = await sensor.read_sensor()

    return ReadSensorModel(
        temperature_degree_celsius=readout.temperature_degree_celsius,
        relative_humidity_percent=readout.relative_humidity_percent,
        executed_at_utc=readout.executed_at_utc,
    )
