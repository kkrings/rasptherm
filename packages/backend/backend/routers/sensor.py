from fastapi import APIRouter

from backend.models.sensor import ReadSensorModel

sensor_router = APIRouter(prefix="/sensor", tags=["sensor"])


@sensor_router.get("/read")
async def read_sensor() -> ReadSensorModel:
    return ReadSensorModel(
        temperature_degree_celsius=21.0,
        relative_humidity_percent=60.0,
    )
