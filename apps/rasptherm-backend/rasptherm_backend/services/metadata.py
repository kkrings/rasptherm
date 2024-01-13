import importlib.metadata

import rasptherm_backend as backend
from rasptherm_backend.models.metadata import MetadataModel


def get_metadata() -> MetadataModel:
    metadata = importlib.metadata.metadata(backend.__package__)

    return MetadataModel(
        description=metadata["Summary"],
        license=metadata["License"],
        version=metadata["Version"],
    )
