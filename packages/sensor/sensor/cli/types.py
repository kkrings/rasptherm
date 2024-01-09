from typing import Any, override

from click import ParamType
from click.core import Context, Parameter

from sensor.variants.ath20 import read_ath20_sensor
from sensor.variants.fake import read_fake_sensor


class SensorVariant(ParamType):
    name = "sensor_variant"

    @override
    def convert(self, value: Any, param: Parameter | None, ctx: Context | None) -> Any:
        match value:
            case "ath20":
                return read_ath20_sensor
            case "fake":
                return read_fake_sensor
            case _:
                self.fail(f"Unknown sensor variant '{value}'", param, ctx)


SENSOR_VARIANT = SensorVariant()
