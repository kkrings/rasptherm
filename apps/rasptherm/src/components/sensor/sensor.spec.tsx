import { screen } from '@testing-library/react';
import { render } from '../../test-utils/render';
import Sensor from './sensor';

describe('Sensor', () => {
  it('should render sensor location', async () => {
    render(<Sensor sensorLocation="Some location" />);
    await screen.findByText('Some location');
  });

  it('should render sensor readout timestamp', async () => {
    render(<Sensor sensorLocation="Some location" />);
    await screen.findByText(new Date('2024-01-22').toLocaleString());
  });

  it('should render sensor temperature', async () => {
    render(<Sensor sensorLocation="Some location" />);
    await screen.findByText(/21.0/);
  });

  it('should render sensor humidity', async () => {
    render(<Sensor sensorLocation="Some location" />);
    await screen.findByText(/60.0/);
  });
});
