# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: interface/sensor.proto
# Protobuf Python Version: 4.25.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x16interface/sensor.proto\x12\x17sensor.interface.sensor\"\x13\n\x11ReadSensorRequest\"[\n\x12ReadSensorResponse\x12\"\n\x1atemperature_degree_celsius\x18\x01 \x01(\x01\x12!\n\x19relative_humidity_percent\x18\x02 \x01(\x01\x32q\n\x06Sensor\x12g\n\nReadSensor\x12*.sensor.interface.sensor.ReadSensorRequest\x1a+.sensor.interface.sensor.ReadSensorResponse\"\x00\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'interface.sensor_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  _globals['_READSENSORREQUEST']._serialized_start=51
  _globals['_READSENSORREQUEST']._serialized_end=70
  _globals['_READSENSORRESPONSE']._serialized_start=72
  _globals['_READSENSORRESPONSE']._serialized_end=163
  _globals['_SENSOR']._serialized_start=165
  _globals['_SENSOR']._serialized_end=278
# @@protoc_insertion_point(module_scope)
