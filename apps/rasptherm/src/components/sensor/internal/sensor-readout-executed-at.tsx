import { Skeleton } from '@mui/material';

interface SensorReadoutExecutedAtProps {
  executedAt: string;
  loading: boolean;
}

function SensorReadoutExecutedAt(props: SensorReadoutExecutedAtProps) {
  return props.loading ? (
    <Skeleton width="60%" />
  ) : (
    <span>{new Date(props.executedAt).toLocaleString()}</span>
  );
}

export default SensorReadoutExecutedAt;
