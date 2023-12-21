from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class ReadSensorRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class ReadSensorResponse(_message.Message):
    __slots__ = ("temperature_degree_celsius", "relative_humidity_percent")
    TEMPERATURE_DEGREE_CELSIUS_FIELD_NUMBER: _ClassVar[int]
    RELATIVE_HUMIDITY_PERCENT_FIELD_NUMBER: _ClassVar[int]
    temperature_degree_celsius: float
    relative_humidity_percent: float
    def __init__(self, temperature_degree_celsius: _Optional[float] = ..., relative_humidity_percent: _Optional[float] = ...) -> None: ...
