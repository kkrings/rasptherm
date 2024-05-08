import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ServiceNotAvailableModel } from '../store/sensor.api';

export const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError =>
  (error as FetchBaseQueryError).status !== undefined;

export const isServiceNotAvailable = (
  status: FetchBaseQueryError['status'],
  data: FetchBaseQueryError['data']
): data is ServiceNotAvailableModel => data !== undefined && status === 503;

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string =>
  isFetchBaseQueryError(error) &&
  isServiceNotAvailable(error.status, error.data)
    ? error.data.detail.msg
    : genericErrorMessage;

const genericErrorMessage = 'Something went wrong. Please try again later.';
