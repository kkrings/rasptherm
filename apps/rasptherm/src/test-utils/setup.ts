import '@testing-library/jest-dom';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { ReadSensorModel } from '../store/sensor.api';

export const backendUrl = 'https://api.rasptherm-test.com';

const sensorReadout: ReadSensorModel = {
  temperatureDegreeCelsius: 21,
  relativeHumidityPercent: 60,
  executedAtUtc: new Date('2024-01-22').toISOString(),
};

const server = setupServer(
  http.get(`${backendUrl}/sensor/read`, () => {
    return HttpResponse.json({ ...sensorReadout });
  })
);

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  vi.stubEnv('VITE_BACKEND_URL', backendUrl);
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
