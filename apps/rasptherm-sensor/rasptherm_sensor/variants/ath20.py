import asyncio

import board  # type: ignore
from adafruit_ahtx0 import AHTx0  # type: ignore

from rasptherm_sensor.types import SensorReadout


async def read_ath20_sensor() -> SensorReadout:
    return await asyncio.to_thread(_readout_ath20_sensor)


def _readout_ath20_sensor() -> SensorReadout:
    sensor = AHTx0(i2c_bus=board.I2C())

    return SensorReadout(
        temperature_degree_celsius=sensor.temperature,
        relative_humidity_percent=sensor.relative_humidity,
    )
