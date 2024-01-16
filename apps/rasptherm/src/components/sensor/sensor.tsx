import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

type SensorProps = {
  sensorLocation: string;
  sensorReadoutDatetime: Date;
  sensorReadoutTemperature: number;
  sensorReadoutHumidity: number;
  onSensorReadoutRefresh: () => void;
};

function Temperature({ value }: { value: number }) {
  return <span>{value.toFixed(2)}&#x202f;&#x2103;</span>;
}

function Humidity({ value }: { value: number }) {
  return <span>{value.toFixed(2)}&#x202f;&#x25;</span>;
}

function Slash() {
  return <span> / </span>;
}

function Sensor(props: SensorProps) {
  return (
    <Card>
      <CardHeader
        title={props.sensorLocation}
        subheader={props.sensorReadoutDatetime.toLocaleString()}
      />
      <CardContent>
        <Typography variant="h4">
          <Temperature value={props.sensorReadoutTemperature} />
          <Slash />
          <Humidity value={props.sensorReadoutHumidity} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<RefreshIcon />}
          onClick={props.onSensorReadoutRefresh}
        >
          Refresh
        </Button>
      </CardActions>
    </Card>
  );
}

export default Sensor;
