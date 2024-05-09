import { useEffect } from 'react';
import {
  ReadSensorModel,
  useReadSensorSensorReadGetQuery,
} from '../store/sensor.api';
import { useAppDispatch } from '../store/hooks';
import { dismissLatestError, setLatestError } from '../store/error.slice';

interface UseSensor {
  sensorReadout?: ReadSensorModel;
  sensorReadoutIsLoading: boolean;
  sensorReadoutIsFetching: boolean;
  readSensor: () => void;
}

export function useSensor(): UseSensor {
  const { data, isLoading, isFetching, error, refetch } =
    useReadSensorSensorReadGetQuery(undefined, {
      pollingInterval: 6e4,
    });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLatestError(error));
  }, [dispatch, error]);

  useEffect(() => {
    if (isLoading) {
      dispatch(dismissLatestError());
    }
  }, [isLoading, dispatch]);

  return {
    sensorReadout: data,
    sensorReadoutIsLoading: isLoading,
    sensorReadoutIsFetching: isFetching,
    readSensor: refetch,
  };
}
