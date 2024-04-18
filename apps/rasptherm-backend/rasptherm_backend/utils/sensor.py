from collections.abc import Awaitable, Callable
from functools import wraps
from typing import TypeVar

from fastapi import HTTPException, status
from grpc import StatusCode  # type: ignore
from grpc.aio import AioRpcError  # type: ignore

from rasptherm_backend.types.sensor import Sensor

_SensorOutput = TypeVar("_SensorOutput")
_SensorFunc = Callable[[Sensor], Awaitable[_SensorOutput]]


def sensor_not_available_handling(
    sensor_func: _SensorFunc[_SensorOutput],
) -> _SensorFunc[_SensorOutput]:
    @wraps(sensor_func)
    async def handle_sensor_not_awailable(sensor: Sensor) -> _SensorOutput:
        try:
            return await sensor_func(sensor)
        except AioRpcError as rpc_exception:
            if rpc_exception.code() != StatusCode.UNAVAILABLE:
                raise rpc_exception

            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail={"msg": "The requested sensor is currently not available"},
            )

    return handle_sensor_not_awailable
