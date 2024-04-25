import { useMemo } from 'react';
import {
  ReadSensorModel,
  useReadSensorSensorReadGetQuery,
} from '../store/sensor.api';

interface UseSensor {
  sensorReadout: ReadSensorModel;
  sensorReadoutIsLoading: boolean;
  sensorReadoutIsFetching: boolean;
  readSensor: () => void;
}

export function useSensor(): UseSensor {
  const { data, isLoading, isFetching, refetch } =
    useReadSensorSensorReadGetQuery(undefined, {
      pollingInterval: 6e4,
    });

  const sensorReadout = useMemo(
    () =>
      data ?? {
        temperatureDegreeCelsius: 0,
        relativeHumidityPercent: 0,
        executedAtUtc: new Date().toISOString(),
      },
    [data]
  );

  return {
    sensorReadout,
    sensorReadoutIsLoading: isLoading,
    sensorReadoutIsFetching: isFetching,
    readSensor: refetch,
  };
}
