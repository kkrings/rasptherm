import { SensorReadoutProps } from './sensor-readout';
import SensorReadoutHumidity from './sensor-readout-humidity';
import SensorReadoutTemperature from './sensor-readout-temperature';
import Slash from './slash';

function SensorReadoutWithoutLoading(
  props: Omit<SensorReadoutProps, 'loading'>
) {
  return (
    <>
      <SensorReadoutTemperature value={props.temperature} />
      <Slash />
      <SensorReadoutHumidity value={props.humidity} />
    </>
  );
}

export default SensorReadoutWithoutLoading;
