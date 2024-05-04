import WithLoading from './with-loading';

interface SensorReadoutExecutedAtProps {
  executedAt: string | null;
  loading?: boolean;
}

function SensorReadoutExecutedAt(props: SensorReadoutExecutedAtProps) {
  return (
    <WithLoading
      visible={props.loading || !props.executedAt}
      pulse={props.loading}
      width="158px"
    >
      <span>{new Date(props?.executedAt ?? '').toLocaleString()}</span>
    </WithLoading>
  );
}

export default SensorReadoutExecutedAt;
