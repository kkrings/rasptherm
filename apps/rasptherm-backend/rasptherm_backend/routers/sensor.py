from typing import Annotated

from fastapi import APIRouter, Depends

from rasptherm_backend.models.sensor import ReadSensorModel
from rasptherm_backend.services.sensor import Sensor, get_sensor
from rasptherm_backend.services.sensor import read_sensor as _read_sensor

sensor_router = APIRouter(prefix="/sensor", tags=["sensor"])


@sensor_router.get("/read")
async def read_sensor(
    sensor: Annotated[Sensor, Depends(get_sensor)],
) -> ReadSensorModel:
    return await _read_sensor(sensor)
