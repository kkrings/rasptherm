from pathlib import Path
from typing import NamedTuple

from rasptherm_backend.services.settings import Settings


class SensorCerts(NamedTuple):
    ssl_root_certificate: bytes | None
    ssl_private_key: bytes | None
    ssl_certificate: bytes | None


def read_sensor_certs(settings: Settings) -> SensorCerts:
    ssl_root_certificate = (
        _read_file(filepath=settings.sensor_ssl_root_certificate)
        if settings.sensor_ssl_root_certificate is not None
        else None
    )

    ssl_private_key = (
        _read_file(filepath=settings.sensor_ssl_private_key_and_certificate[0])
        if settings.sensor_ssl_private_key_and_certificate is not None
        else None
    )

    ssl_certificate = (
        _read_file(filepath=settings.sensor_ssl_private_key_and_certificate[1])
        if settings.sensor_ssl_private_key_and_certificate is not None
        else None
    )

    return SensorCerts(ssl_root_certificate, ssl_private_key, ssl_certificate)


def _read_file(filepath: Path) -> bytes:
    with open(filepath, "rb") as filestream:
        filecontent = filestream.read()

    return filecontent
