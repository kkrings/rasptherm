from datetime import datetime

from google.protobuf.timestamp_pb2 import Timestamp


def as_timestamp(dt: datetime) -> Timestamp:
    timestamp = Timestamp()
    timestamp.FromDatetime(dt)
    return timestamp
