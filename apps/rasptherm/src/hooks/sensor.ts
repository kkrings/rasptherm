import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { readSensor } from '../store/sensor.slice';
import { SensorReadout } from '../types/sensor';

type UseSensor = {
  sensorReadout: SensorReadout;
  refreshSensorReadout: () => void;
};

export function useSensor(): UseSensor {
  const dispatch = useAppDispatch();
  const sensorReadout = useAppSelector((state) => state.sensor.readout);

  const refreshSensorReadout = useCallback(
    () => dispatch(readSensor()),
    [dispatch]
  );

  return { sensorReadout, refreshSensorReadout };
}
