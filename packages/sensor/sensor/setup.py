import grpc.aio  # type: ignore

from sensor.interface.sensor_pb2_grpc import add_SensorServicer_to_server
from sensor.sensor import Sensor
from sensor.types import ReadSensor, SensorSetup


def non_ssl_sensor_setup(read_sensor: ReadSensor, port: int = 0) -> SensorSetup:
    sensor = _create_sensor(read_sensor)
    port = sensor.add_insecure_port(f"[::]:{port}")

    return SensorSetup(sensor, port)


def _create_sensor(read_sensor: ReadSensor) -> grpc.Server:
    server = grpc.aio.server()
    sensor = Sensor(read_sensor)
    add_SensorServicer_to_server(sensor, server)  # type: ignore
    return server
