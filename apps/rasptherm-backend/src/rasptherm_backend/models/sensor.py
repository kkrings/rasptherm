from datetime import datetime

from pydantic import BaseModel, Field


class ReadSensorModel(BaseModel):
    temperature_degree_celsius: float = Field(
        serialization_alias="temperatureDegreeCelsius",
    )
    relative_humidity_percent: float = Field(
        serialization_alias="relativeHumidityPercent",
    )
    executed_at_utc: datetime = Field(
        serialization_alias="executedAtUtc",
    )
