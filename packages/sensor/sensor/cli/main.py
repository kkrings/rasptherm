import click

from sensor.cli.protoc import protoc as _protoc


@click.group()
def cli() -> None:
    ...


@cli.command()
def protoc() -> None:
    _protoc()
