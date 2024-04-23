import { baseApi as api } from './base.api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    readSensorSensorReadGet: build.query<
      ReadSensorSensorReadGetApiResponse,
      ReadSensorSensorReadGetApiArg
    >({
      query: () => ({ url: `/sensor/read` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as sensorApi };
export type ReadSensorSensorReadGetApiResponse =
  /** status 200 Successful Response */ ReadSensorModel;
export type ReadSensorSensorReadGetApiArg = void;
export type ReadSensorModel = {
  temperatureDegreeCelsius: number;
  relativeHumidityPercent: number;
  executedAtUtc: string;
};
export type ErrorDetailModel = {
  msg: string;
};
export type ServiceNotAvailableModel = {
  detail: ErrorDetailModel;
};
export const { useReadSensorSensorReadGetQuery } = injectedRtkApi;
