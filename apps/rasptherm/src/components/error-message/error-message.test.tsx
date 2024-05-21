import { HttpResponse, http } from 'msw';
import { screen } from '@testing-library/react';
import { ServiceNotAvailableModel } from '../../store/sensor.api';
import { render } from '../../test-utils/render';
import { backendUrl, server } from '../../test-utils/setup';
import { genericErrorMessage } from '../../utils/error';
import Sensor from '../sensor/sensor';
import ErrorMessage from './error-message';

function TestComponent() {
  return (
    <>
      <Sensor sensorLocation="Some location" />
      <ErrorMessage />
    </>
  );
}

describe('ErrorMessage', () => {
  it('error message should not be rendered', () => {
    render(<TestComponent />);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('generic error message should be rendered', async () => {
    server.use(
      http.get(`${backendUrl}/sensor/read`, () => {
        return HttpResponse.error();
      })
    );

    render(<TestComponent />);
    await screen.findByText(genericErrorMessage);
  });

  it('service not available error message should be rendered', async () => {
    const response: ServiceNotAvailableModel = {
      detail: { msg: 'Service is currently not available' },
    };

    server.use(
      http.get(`${backendUrl}/sensor/read`, () => {
        return HttpResponse.json(response, { status: 503 });
      })
    );

    render(<TestComponent />);
    await screen.findByText(response.detail.msg);
  });
});
