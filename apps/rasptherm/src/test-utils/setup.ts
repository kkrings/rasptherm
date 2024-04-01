import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { SensorReadout } from '../types/sensor';

const backendUrl = 'http://localhost:8000';

const sensorReadout: SensorReadout = {
  temperatureDegreeCelsius: 21,
  relativeHumidityPercent: 60,
  executedAtUtc: new Date().toISOString(),
};

const server = setupServer(
  http.get(`${backendUrl}/sensor/read`, () => {
    return HttpResponse.json({ ...sensorReadout });
  })
);

beforeAll(() => {
  vi.stubEnv('VITE_BACKEND_URL', backendUrl);
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  vi.unstubAllEnvs();
});
