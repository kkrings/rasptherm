import {
  ReadSensorModel,
  useReadSensorSensorReadGetQuery,
} from '../store/sensor.api';

interface UseSensor {
  sensorReadout: ReadSensorModel;
  refreshSensorReadout: () => void;
}

export function useSensor(): UseSensor {
  const { sensorReadout, refetch } = useReadSensorSensorReadGetQuery(
    undefined,
    {
      pollingInterval: 6e4,
      selectFromResult: ({ data }) => ({
        sensorReadout: data ?? {
          temperatureDegreeCelsius: 0,
          relativeHumidityPercent: 0,
          executedAtUtc: new Date().toISOString(),
        },
      }),
    }
  );

  return { sensorReadout, refreshSensorReadout: refetch };
}
