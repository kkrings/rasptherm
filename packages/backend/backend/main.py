from fastapi import FastAPI

from backend.models.metadata import MetadataModel
from backend.routers.sensor import sensor_router
from backend.services.metadata import get_metadata

app = FastAPI()


@app.get("/")
def read_root() -> MetadataModel:
    return get_metadata()


app.include_router(router=sensor_router)
