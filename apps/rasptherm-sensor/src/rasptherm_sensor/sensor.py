from grpc.aio import ServicerContext  # type: ignore
from typing_extensions import override

from rasptherm_sensor.interface.sensor_pb2 import ReadSensorRequest, ReadSensorResponse
from rasptherm_sensor.interface.sensor_pb2_grpc import SensorServicer
from rasptherm_sensor.types import ReadSensor
from rasptherm_sensor.utils import as_timestamp


class Sensor(SensorServicer):
    def __init__(self, read_sensor: ReadSensor) -> None:
        self._read_sensor = read_sensor

    @override
    async def ReadSensor(
        self, _: ReadSensorRequest, __: ServicerContext
    ) -> ReadSensorResponse:
        temperature, humidity, executed_at = await self._read_sensor()

        return ReadSensorResponse(
            temperature_degree_celsius=temperature,
            relative_humidity_percent=humidity,
            executed_at=as_timestamp(dt=executed_at),
        )
