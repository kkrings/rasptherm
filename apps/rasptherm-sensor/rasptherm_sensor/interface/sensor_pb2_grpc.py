# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from rasptherm_sensor.interface import sensor_pb2 as rasptherm__sensor_dot_interface_dot_sensor__pb2


class SensorStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.ReadSensor = channel.unary_unary(
                '/rasptherm_sensor.interface.sensor.Sensor/ReadSensor',
                request_serializer=rasptherm__sensor_dot_interface_dot_sensor__pb2.ReadSensorRequest.SerializeToString,
                response_deserializer=rasptherm__sensor_dot_interface_dot_sensor__pb2.ReadSensorResponse.FromString,
                )


class SensorServicer(object):
    """Missing associated documentation comment in .proto file."""

    def ReadSensor(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_SensorServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'ReadSensor': grpc.unary_unary_rpc_method_handler(
                    servicer.ReadSensor,
                    request_deserializer=rasptherm__sensor_dot_interface_dot_sensor__pb2.ReadSensorRequest.FromString,
                    response_serializer=rasptherm__sensor_dot_interface_dot_sensor__pb2.ReadSensorResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'rasptherm_sensor.interface.sensor.Sensor', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Sensor(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def ReadSensor(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/rasptherm_sensor.interface.sensor.Sensor/ReadSensor',
            rasptherm__sensor_dot_interface_dot_sensor__pb2.ReadSensorRequest.SerializeToString,
            rasptherm__sensor_dot_interface_dot_sensor__pb2.ReadSensorResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
