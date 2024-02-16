from typing import Optional

from grpc.aio import Server  # type: ignore

from rasptherm_sensor.setup import non_ssl_sensor_setup, ssl_sensor_setup
from rasptherm_sensor.types import ReadSensor


async def serve(
    port: int,
    variant: ReadSensor,
    ssl_certificate: str,
    ssl_private_key: str,
    ssl_root_certificate: Optional[str] = None,
) -> None:
    sensor, _ = ssl_sensor_setup(
        read_sensor=variant,
        ssl_certificate=ssl_certificate,
        ssl_private_key=ssl_private_key,
        ssl_root_certificate=ssl_root_certificate,
        port=port,
    )

    await sensor.start()
    await _wait_for_termination(sensor)


async def serve_witout_ssl(port: int, variant: ReadSensor) -> None:
    sensor, _ = non_ssl_sensor_setup(read_sensor=variant, port=port)
    await sensor.start()
    await _wait_for_termination(sensor)


async def _wait_for_termination(sensor: Server) -> None:
    try:
        await sensor.wait_for_termination()
    finally:
        await sensor.stop(grace=None)
