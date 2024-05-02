import WithLoading from './with-loading';

interface SensorReadoutExecutedAtProps {
  executedAt: string | null;
  loading?: boolean;
}

function SensorReadoutExecutedAt(props: SensorReadoutExecutedAtProps) {
  const executedAt = new Date(props?.executedAt ?? '').toLocaleString();

  return (
    <WithLoading loading={props.loading} width="158px">
      <span>{executedAt !== 'Invalid Date' ? executedAt : '...'}</span>
    </WithLoading>
  );
}

export default SensorReadoutExecutedAt;
