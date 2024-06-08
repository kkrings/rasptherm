import asyncio
from typing import BinaryIO, Optional

import click

from rasptherm_sensor.cli.protoc import protoc as _protoc
from rasptherm_sensor.cli.serve import serve as _serve
from rasptherm_sensor.cli.serve import serve_witout_ssl as _serve_without_ssl
from rasptherm_sensor.cli.types import SENSOR_VARIANT
from rasptherm_sensor.types import ReadSensor


@click.group()
def cli() -> None: ...


@cli.command()
def protoc() -> None:
    _protoc()


@cli.command()
@click.option(
    "--port",
    default=5000,
    show_default=True,
)
@click.option(
    "--variant",
    type=SENSOR_VARIANT,
    default="fake-random",
    show_default=True,
)
@click.option(
    "--ssl-certificate",
    type=click.File(mode="rb"),
    required=True,
)
@click.option(
    "--ssl-private-key",
    type=click.File(mode="rb"),
    required=True,
)
@click.option(
    "--ssl-root-certificate",
    type=click.File(mode="rb"),
)
def serve(
    port: int,
    variant: ReadSensor,
    ssl_certificate: BinaryIO,
    ssl_private_key: BinaryIO,
    ssl_root_certificate: Optional[BinaryIO],
) -> None:
    serve_coroutine = _serve(
        port,
        variant,
        ssl_certificate=ssl_certificate.read(),
        ssl_private_key=ssl_private_key.read(),
        ssl_root_certificate=ssl_root_certificate.read()
        if ssl_root_certificate is not None
        else None,
    )

    asyncio.run(serve_coroutine)


@cli.command()
@click.option(
    "--port",
    default=5000,
    show_default=True,
)
@click.option(
    "--variant",
    type=SENSOR_VARIANT,
    default="fake-random",
    show_default=True,
)
def serve_without_ssl(port: int, variant: ReadSensor) -> None:
    asyncio.run(_serve_without_ssl(port, variant))
