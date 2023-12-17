#!/usr/bin/env python

import pathlib

import grpc_tools.protoc


def main() -> None:
    command_arguments = [
        "--proto_path=./interface",
        "--python_out=./sensor",
        "--pyi_out=./sensor",
        "--grpc_python_out=./sensor",
        "./interface/sensor.proto",
    ]

    grpc_tools.protoc.main(command_arguments)
    pathlib.Path("./sensor/interface/__init__.py").touch()


if __name__ == "__main__":
    main()
