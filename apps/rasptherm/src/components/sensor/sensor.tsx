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

interface SensorReadoutProps {
  temperature: number;
  humidity: number;
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

function SensorReadout({ temperature, humidity }: SensorReadoutProps) {
  return (
    <>
      <Temperature value={temperature} />
      <Slash />
      <Humidity value={humidity} />
    </>
  );
}

function Sensor(props: SensorProps) {
  const { sensorReadout, sensorReadoutIsLoading, readSensor } = useSensor();

  return (
    <Card>
      <CardHeader
        title={props.sensorLocation}
        subheader={
          sensorReadoutIsLoading ? (
            <Skeleton width="60%" />
          ) : (
            new Date(sensorReadout.executedAtUtc).toLocaleString()
          )
        }
      />
      <CardContent>
        <Typography variant="h4">
          {sensorReadoutIsLoading ? (
            <Skeleton width="80%" />
          ) : (
            <SensorReadout
              temperature={sensorReadout.temperatureDegreeCelsius}
              humidity={sensorReadout.relativeHumidityPercent}
            />
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button startIcon={<RefreshIcon />} onClick={readSensor}>
          Refresh
        </Button>
      </CardActions>
    </Card>
  );
}

export default Sensor;
