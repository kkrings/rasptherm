from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from rasptherm_backend.models.metadata import MetadataModel
from rasptherm_backend.routers.sensor import sensor_router
from rasptherm_backend.services.cors import get_cors_config
from rasptherm_backend.services.metadata import get_metadata

app = FastAPI()

cors_enabled, cors_allow_origins = get_cors_config()

if cors_enabled:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_allow_origins,
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )


@app.get("/")
def read_root() -> MetadataModel:
    return get_metadata()


app.include_router(router=sensor_router)
