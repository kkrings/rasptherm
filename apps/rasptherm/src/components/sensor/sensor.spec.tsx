import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { ReadSensorModel } from '../../store/sensor.api';
import { render } from '../../test-utils/render';
import { server } from '../../test-utils/setup';
import Sensor from './sensor';

describe('Sensor', () => {
  it('should render sensor readout', async () => {
    const sensorReadoutExecutedAt = new Date();

    const sensorReadout: ReadSensorModel = {
      temperatureDegreeCelsius: 20,
      relativeHumidityPercent: 60,
      executedAtUtc: sensorReadoutExecutedAt.toISOString(),
    };

    server.use(
      http.get(`${import.meta.env.VITE_BACKEND_URL}/sensor/read`, () => {
        return HttpResponse.json({ ...sensorReadout });
      })
    );

    render(<Sensor sensorLocation="Some location" />);

    await screen.findByText('Some location');
    await screen.findByText(sensorReadoutExecutedAt.toLocaleString());
    await screen.findByText(/20.0/);
    await screen.findByText(/60.0/);
  });
});
