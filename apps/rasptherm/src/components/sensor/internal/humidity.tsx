function Humidity({ value }: { value: number }) {
  return <span>{value.toFixed(1)}&#x202f;&#x25;</span>;
}

export default Humidity;
