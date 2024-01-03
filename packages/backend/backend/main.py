from fastapi import FastAPI

from backend.schemas.metadata import MetadataSchema
from backend.services.metadata import get_metadata

app = FastAPI()


@app.get("/")
def read_root() -> MetadataSchema:
    return get_metadata()
