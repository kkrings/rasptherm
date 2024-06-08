import random
from datetime import datetime, timezone

from rasptherm_sensor.types import SensorReadout


async def read_fake_sensor_random() -> SensorReadout:
    temperature_degree_celsius = random.normalvariate(mu=21.0, sigma=5.0)

    relative_humidity_percent = max(
        0.0, min(random.normalvariate(mu=60.0, sigma=10.0), 100.0)
    )

    return SensorReadout(
        temperature_degree_celsius,
        relative_humidity_percent,
        executed_at_utc=datetime.now(timezone.utc),
    )


async def read_fake_sensor_static() -> SensorReadout:
    return SensorReadout(
        temperature_degree_celsius=21.0,
        relative_humidity_percent=60.0,
        executed_at_utc=datetime.now(timezone.utc),
    )
