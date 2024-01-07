from sensor.setup import non_ssl_sensor_setup, ssl_sensor_setup
from sensor.types import ReadSensor


async def serve(
    port: int,
    variant: ReadSensor,
    ssl_certificate: str,
    ssl_private_key: str,
    ssl_root_certificate: str | None = None,
) -> None:
    sensor, _ = ssl_sensor_setup(
        read_sensor=variant,
        ssl_certificate=ssl_certificate,
        ssl_private_key=ssl_private_key,
        ssl_root_certificate=ssl_root_certificate,
        port=port,
    )

    await sensor.start()
    await sensor.wait_for_termination()


async def serve_witout_ssl(port: int, variant: ReadSensor) -> None:
    sensor, _ = non_ssl_sensor_setup(read_sensor=variant, port=port)
    await sensor.start()
    await sensor.wait_for_termination()
