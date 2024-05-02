import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useSensor } from '../../hooks/sensor';
import SensorReadout from './internal/sensor-readout';
import SensorReadoutExecutedAt from './internal/sensor-readout-executed-at';

interface SensorProps {
  sensorLocation: string;
}

function Sensor(props: SensorProps) {
  const {
    sensorReadout,
    sensorReadoutIsLoading,
    sensorReadoutIsFetching,
    readSensor,
  } = useSensor();

  return (
    <Card>
      <CardHeader
        title={props.sensorLocation}
        subheader={
          <SensorReadoutExecutedAt
            executedAt={sensorReadout?.executedAtUtc ?? null}
            loading={sensorReadoutIsLoading}
          />
        }
      />
      <CardContent>
        <SensorReadout
          temperature={sensorReadout?.temperatureDegreeCelsius ?? null}
          humidity={sensorReadout?.relativeHumidityPercent ?? null}
          loading={sensorReadoutIsLoading}
        />
      </CardContent>
      <CardActions>
        <Button
          startIcon={<RefreshIcon />}
          onClick={readSensor}
          disabled={sensorReadoutIsFetching}
        >
          Refresh
        </Button>
      </CardActions>
    </Card>
  );
}

export default Sensor;
