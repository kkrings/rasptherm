import { Skeleton, Typography } from '@mui/material';
import SensorReadoutWithoutLoading from './sensor-readout-without-loading';

export interface SensorReadoutProps {
  temperature: number;
  humidity: number;
  loading: boolean;
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

export default SensorReadout;
