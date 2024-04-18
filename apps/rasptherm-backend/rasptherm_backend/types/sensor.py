from typing import Protocol

from rasptherm_sensor.types import SensorReadout


class Sensor(Protocol):
    async def read_sensor(self) -> SensorReadout: ...
