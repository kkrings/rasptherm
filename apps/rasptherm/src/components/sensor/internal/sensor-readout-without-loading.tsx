import { SensorReadoutProps } from './sensor-readout';
import Humidity from './humidity';
import Slash from './slash';
import Temperature from './temperature';

function SensorReadoutWithoutLoading(
  props: Omit<SensorReadoutProps, 'loading'>
) {
  return (
    <>
      <Temperature value={props.temperature} />
      <Slash />
      <Humidity value={props.humidity} />
    </>
  );
}

export default SensorReadoutWithoutLoading;
