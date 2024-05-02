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
      <WithLoading loading={props.loading} width="252px">
        <SensorReadoutTemperature value={props.temperature} />
        <Slash />
        <SensorReadoutHumidity value={props.humidity} />
      </WithLoading>
    </Typography>
  );
}

export default SensorReadout;
