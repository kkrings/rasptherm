function SensorReadoutTemperature({ value }: { value: number | null }) {
  return <span>{value?.toFixed(1) ?? '0.0'}&#x202f;&#x2103;</span>;
}

export default SensorReadoutTemperature;
