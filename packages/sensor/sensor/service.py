from typing import override

from grpc.aio import RpcContext  # type: ignore

from sensor.interface.sensor_pb2 import ReadSensorRequest, ReadSensorResponse
from sensor.interface.sensor_pb2_grpc import SensorServicer
from sensor.types import ReadSensor


class SensorService(SensorServicer):
    def __init__(self, read_sensor: ReadSensor) -> None:
        self._read_sensor = read_sensor

    @override
    async def ReadSensor(
        self, _: ReadSensorRequest, __: RpcContext
    ) -> ReadSensorResponse:
        temperature, humidity = await self._read_sensor()

        return ReadSensorResponse(
            temperature_degree_celsius=temperature, relative_humidity_percent=humidity
        )
