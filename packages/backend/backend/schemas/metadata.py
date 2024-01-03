from pydantic import BaseModel


class MetadataSchema(BaseModel):
    description: str
    license: str
    version: str
