from google.protobuf import timestamp_pb2 as _timestamp_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ReadSensorRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class ReadSensorResponse(_message.Message):
    __slots__ = ("temperature_degree_celsius", "relative_humidity_percent", "executed_at")
    TEMPERATURE_DEGREE_CELSIUS_FIELD_NUMBER: _ClassVar[int]
    RELATIVE_HUMIDITY_PERCENT_FIELD_NUMBER: _ClassVar[int]
    EXECUTED_AT_FIELD_NUMBER: _ClassVar[int]
    temperature_degree_celsius: float
    relative_humidity_percent: float
    executed_at: _timestamp_pb2.Timestamp
    def __init__(self, temperature_degree_celsius: _Optional[float] = ..., relative_humidity_percent: _Optional[float] = ..., executed_at: _Optional[_Union[_timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...
