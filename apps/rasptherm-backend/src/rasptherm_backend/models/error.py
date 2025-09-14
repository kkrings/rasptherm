from pydantic import BaseModel


class ErrorDetailModel(BaseModel):
    msg: str


class ServiceNotAvailableModel(BaseModel):
    detail: ErrorDetailModel
