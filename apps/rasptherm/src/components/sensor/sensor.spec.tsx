import { render } from '@testing-library/react';

import Sensor from './sensor';

describe('Sensor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Sensor
        sensorLocation="Some location"
        sensorReadoutDatetime={new Date()}
        sensorReadoutTemperature={21}
        sensorReadoutHumidity={60}
        onSensorReadoutRefresh={vi.fn()}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
