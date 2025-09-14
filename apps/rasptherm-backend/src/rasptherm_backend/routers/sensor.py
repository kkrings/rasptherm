from typing import Annotated

from fastapi import APIRouter, Depends, status

from rasptherm_backend.models.error import ServiceNotAvailableModel
from rasptherm_backend.models.sensor import ReadSensorModel
from rasptherm_backend.services.sensor import get_sensor
from rasptherm_backend.services.sensor import read_sensor as _read_sensor
from rasptherm_backend.types.sensor import Sensor

sensor_router = APIRouter(prefix="/sensor", tags=["sensor"])


@sensor_router.get(
    "/read",
    responses={
        status.HTTP_503_SERVICE_UNAVAILABLE: {"model": ServiceNotAvailableModel}
    },
)
async def read_sensor(
    sensor: Annotated[Sensor, Depends(get_sensor)],
) -> ReadSensorModel:
    return await _read_sensor(sensor)
