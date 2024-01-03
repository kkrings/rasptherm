import importlib.metadata

import backend
from backend.schemas.metadata import MetadataSchema


def get_metadata() -> MetadataSchema:
    metadata = importlib.metadata.metadata(backend.__package__)

    return MetadataSchema(
        description=metadata["Summary"],
        license=metadata["License"],
        version=metadata["Version"],
    )
