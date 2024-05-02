function SensorReadoutHumidity({ value }: { value: number | null }) {
  return <span>{value?.toFixed(1) ?? '...'}&#x202f;&#x25;</span>;
}

export default SensorReadoutHumidity;
