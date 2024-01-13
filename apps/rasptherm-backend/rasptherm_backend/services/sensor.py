from collections.abc import AsyncIterator
from typing import Annotated, Protocol

from fastapi import Depends
from rasptherm_sensor.client import non_ssl_sensor_connection
from rasptherm_sensor.types import SensorReadout

from rasptherm_backend.models.sensor import ReadSensorModel
from rasptherm_backend.services.settings import Settings, get_settings


class Sensor(Protocol):
    async def read_sensor(self) -> SensorReadout:
        ...


async def get_sensor(
    settings: Annotated[Settings, Depends(get_settings)],
) -> AsyncIterator[Sensor]:
    async with non_ssl_sensor_connection(host=str(settings.sensor_host)) as client:
        yield client


async def read_sensor(sensor: Sensor) -> ReadSensorModel:
    readout = await sensor.read_sensor()

    return ReadSensorModel(
        temperature_degree_celsius=readout.temperature_degree_celsius,
        relative_humidity_percent=readout.relative_humidity_percent,
    )
