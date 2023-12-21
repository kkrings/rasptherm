from sensor.interface.sensor_pb2 import ReadSensorRequest
from sensor.interface.sensor_pb2_grpc import SensorStub


async def test_read_sensor_temperature(
    sensor_stub: SensorStub, temperature: float
) -> None:
    response = await sensor_stub.ReadSensor(ReadSensorRequest())
    assert response.temperature_degree_celsius == temperature


async def test_read_sensor_humidity(sensor_stub: SensorStub, humidity: float) -> None:
    response = await sensor_stub.ReadSensor(ReadSensorRequest())
    assert response.relative_humidity_percent == humidity
