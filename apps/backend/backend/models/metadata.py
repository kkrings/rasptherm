from pydantic import BaseModel


class MetadataModel(BaseModel):
    description: str
    license: str
    version: str
