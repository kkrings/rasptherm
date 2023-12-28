from sensor.setup import non_ssl_sensor_setup
from sensor.types import ReadSensor


async def serve_witout_ssl(port: int, variant: ReadSensor) -> None:
    sensor, _ = non_ssl_sensor_setup(read_sensor=variant, port=port)
    await sensor.start()
    await sensor.wait_for_termination()
