from typing import Any, Optional

from click import ParamType
from click.core import Context, Parameter
from typing_extensions import override

from rasptherm_sensor.variants.ath20 import read_ath20_sensor
from rasptherm_sensor.variants.fake import read_fake_sensor


class SensorVariant(ParamType):
    name = "sensor_variant"

    @override
    def convert(
        self, value: Any, param: Optional[Parameter], ctx: Optional[Context]
    ) -> Any:
        if value == "ath20":
            return read_ath20_sensor
        if value == "fake":
            return read_fake_sensor

        self.fail(f"Unknown sensor variant '{value}'", param, ctx)


SENSOR_VARIANT = SensorVariant()
