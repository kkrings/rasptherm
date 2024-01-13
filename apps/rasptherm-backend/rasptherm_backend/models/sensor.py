from pydantic import BaseModel


class ReadSensorModel(BaseModel):
    temperature_degree_celsius: float
    relative_humidity_percent: float
