from collections.abc import Awaitable, Callable
from datetime import datetime
from typing import NamedTuple

import grpc.aio  # type: ignore


class SensorReadout(NamedTuple):
    temperature_degree_celsius: float
    relative_humidity_percent: float
    executed_at_utc: datetime


class SensorSetup(NamedTuple):
    sensor: grpc.aio.Server
    port: int


ReadSensor = Callable[[], Awaitable[SensorReadout]]
