import grpc  # type: ignore
import grpc.aio  # type: ignore

from sensor.interface.sensor_pb2_grpc import add_SensorServicer_to_server
from sensor.sensor import Sensor
from sensor.types import ReadSensor, SensorSetup


def ssl_sensor_setup(
    read_sensor: ReadSensor,
    ssl_certificate: str,
    ssl_private_key: str,
    ssl_root_certificate: str | None = None,
    port: int = 0,
) -> SensorSetup:
    sensor = _create_sensor(read_sensor)

    server_credentials = grpc.ssl_server_credentials(
        private_key_certificate_chain_pairs=[(ssl_private_key, ssl_certificate)],
        root_certificates=ssl_root_certificate,
        require_client_auth=True if ssl_root_certificate is not None else False,
    )

    port = sensor.add_secure_port(
        address=f"[::]:{port}", server_credentials=server_credentials
    )

    return SensorSetup(sensor, port)


def non_ssl_sensor_setup(read_sensor: ReadSensor, port: int = 0) -> SensorSetup:
    sensor = _create_sensor(read_sensor)
    port = sensor.add_insecure_port(address=f"[::]:{port}")
    return SensorSetup(sensor, port)


def _create_sensor(read_sensor: ReadSensor) -> grpc.Server:
    server = grpc.aio.server()
    sensor = Sensor(read_sensor)
    add_SensorServicer_to_server(sensor, server)  # type: ignore
    return server
