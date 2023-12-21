from collections.abc import Awaitable, Callable
from typing import NamedTuple


class SensorReadout(NamedTuple):
    temperature_degree_celsius: float
    relative_humidity_percent: float


ReadSensor = Callable[[], Awaitable[SensorReadout]]
