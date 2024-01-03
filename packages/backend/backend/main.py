from fastapi import FastAPI

from backend.routers.sensor import sensor_router
from backend.schemas.metadata import MetadataSchema
from backend.services.metadata import get_metadata

app = FastAPI()


@app.get("/")
def read_root() -> MetadataSchema:
    return get_metadata()


app.include_router(router=sensor_router)
