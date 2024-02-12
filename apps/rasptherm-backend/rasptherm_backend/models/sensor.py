from datetime import datetime

from pydantic import BaseModel


class ReadSensorModel(BaseModel):
    temperature_degree_celsius: float
    relative_humidity_percent: float
    executed_at_utc: datetime
