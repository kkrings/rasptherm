import asyncio

import click

from sensor.cli.protoc import protoc as _protoc
from sensor.cli.serve import serve_witout_ssl as _serve_without_ssl
from sensor.cli.types import SENSOR_VARIANT
from sensor.types import ReadSensor


@click.group()
def cli() -> None:
    ...


@cli.command()
def protoc() -> None:
    _protoc()


@cli.command()
@click.option("--port", default=5000)
@click.option("--variant", type=SENSOR_VARIANT, default="fake")
def serve_without_ssl(port: int, variant: ReadSensor) -> None:
    asyncio.run(_serve_without_ssl(port, variant))
