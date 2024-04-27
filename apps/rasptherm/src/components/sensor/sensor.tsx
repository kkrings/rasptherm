import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useSensor } from '../../hooks/sensor';

interface SensorProps {
  sensorLocation: string;
}

interface SensorReadoutExecutedAtProps {
  executedAt: string;
  loading: boolean;
}

interface SensorReadoutProps {
  temperature: number;
  humidity: number;
  loading: boolean;
}

function SensorReadoutExecutedAt(props: SensorReadoutExecutedAtProps) {
  return props.loading ? (
    <Skeleton width="60%" />
  ) : (
    <span>{new Date(props.executedAt).toLocaleString()}</span>
  );
}

function Temperature({ value }: { value: number }) {
  return <span>{value.toFixed(1)}&#x202f;&#x2103;</span>;
}

function Humidity({ value }: { value: number }) {
  return <span>{value.toFixed(1)}&#x202f;&#x25;</span>;
}

function Slash() {
  return <span> / </span>;
}

function SensorReadoutWithoutLoading(
  props: Omit<SensorReadoutProps, 'loading'>
) {
  return (
    <>
      <Temperature value={props.temperature} />
      <Slash />
      <Humidity value={props.humidity} />
    </>
  );
}

function SensorReadout(props: SensorReadoutProps) {
  return (
    <Typography variant="h4">
      {props.loading ? (
        <Skeleton width="80%" />
      ) : (
        <SensorReadoutWithoutLoading
          temperature={props.temperature}
          humidity={props.humidity}
        />
      )}
    </Typography>
  );
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
            executedAt={sensorReadout.executedAtUtc}
            loading={sensorReadoutIsLoading}
          />
        }
      />
      <CardContent>
        <SensorReadout
          temperature={sensorReadout.temperatureDegreeCelsius}
          humidity={sensorReadout.relativeHumidityPercent}
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
