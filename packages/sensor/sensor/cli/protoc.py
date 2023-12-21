from importlib import resources
from pathlib import Path

import grpc_tools.command  # type: ignore

import sensor


def protoc() -> None:
    grpc_tools.command.build_package_protos(
        package_root=_get_sensor_package_path(), strict_mode=True
    )


def _get_sensor_package_path() -> Path:
    with resources.as_file(resources.files(sensor.__package__)) as sensor_package_path:
        return sensor_package_path
