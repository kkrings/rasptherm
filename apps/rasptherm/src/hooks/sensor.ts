import { useCallback, useEffect } from 'react';
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

  useEffect(() => {
    refreshSensorReadout();

    const sensorReadoutRefreshInterval = setInterval(
      () => refreshSensorReadout(),
      6e4
    );

    return () => clearInterval(sensorReadoutRefreshInterval);
  }, [refreshSensorReadout]);

  return { sensorReadout, refreshSensorReadout };
}
