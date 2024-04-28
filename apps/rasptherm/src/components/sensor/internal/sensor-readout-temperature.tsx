function SensorReadoutTemperature({ value }: { value: number }) {
  return <span>{value.toFixed(1)}&#x202f;&#x2103;</span>;
}

export default SensorReadoutTemperature;
