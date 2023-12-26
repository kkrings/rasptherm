import random

from sensor.types import SensorReadout


async def read_fake_sensor() -> SensorReadout:
    temperature_degree_celsius = random.normalvariate(mu=21.0, sigma=5.0)

    relative_humidity_percent = max(
        0.0, min(random.normalvariate(mu=60.0, sigma=10.0), 100.0)
    )

    return SensorReadout(temperature_degree_celsius, relative_humidity_percent)
