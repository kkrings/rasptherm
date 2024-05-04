import { Typography } from '@mui/material';
import SensorReadoutHumidity from './sensor-readout-humidity';
import SensorReadoutTemperature from './sensor-readout-temperature';
import Slash from './slash';
import WithLoading from './with-loading';

interface SensorReadoutProps {
  temperature: number | null;
  humidity: number | null;
  loading?: boolean;
}

function SensorReadout(props: SensorReadoutProps) {
  return (
    <Typography variant="h4">
      <WithLoading
        visible={props.loading || !props.temperature || !props.humidity}
        pulse={props.loading}
        width="252px"
      >
        <SensorReadoutTemperature value={props.temperature} />
        <Slash />
        <SensorReadoutHumidity value={props.humidity} />
      </WithLoading>
    </Typography>
  );
}

export default SensorReadout;
