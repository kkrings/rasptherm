import {
  ReadSensorModel,
  useReadSensorSensorReadGetQuery,
} from '../store/sensor.api';

interface UseSensor {
  sensorReadout?: ReadSensorModel;
  sensorReadoutIsLoading: boolean;
  sensorReadoutIsFetching: boolean;
  readSensor: () => void;
}

export function useSensor(): UseSensor {
  const { data, isLoading, isFetching, refetch } =
    useReadSensorSensorReadGetQuery(undefined, {
      pollingInterval: 6e4,
    });

  return {
    sensorReadout: data,
    sensorReadoutIsLoading: isLoading,
    sensorReadoutIsFetching: isFetching,
    readSensor: refetch,
  };
}
