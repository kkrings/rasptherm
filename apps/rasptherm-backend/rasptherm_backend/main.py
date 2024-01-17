from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from rasptherm_backend.models.metadata import MetadataModel
from rasptherm_backend.routers.sensor import sensor_router
from rasptherm_backend.services.metadata import get_metadata

app = FastAPI()

origins = ["http://localhost:4200"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> MetadataModel:
    return get_metadata()


app.include_router(router=sensor_router)
