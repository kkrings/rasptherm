from fastapi import FastAPI

from rasptherm_backend.models.metadata import MetadataModel
from rasptherm_backend.routers.sensor import sensor_router
from rasptherm_backend.services.metadata import get_metadata

app = FastAPI()


@app.get("/")
def read_root() -> MetadataModel:
    return get_metadata()


app.include_router(router=sensor_router)
