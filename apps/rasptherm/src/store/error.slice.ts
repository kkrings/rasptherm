import {
  PayloadAction,
  SerializedError,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { getErrorMessage } from '../utils/error';
import { RootState } from './store';

export const ERROR_FEATURE_KEY = 'error';

type ApiError = FetchBaseQueryError | SerializedError;

interface ErrorState {
  latestError: ApiError | null;
}

const initialErrorState: ErrorState = {
  latestError: null,
};

const errorSlice = createSlice({
  name: ERROR_FEATURE_KEY,
  initialState: initialErrorState,
  reducers: {
    setLatestError: (state, action: PayloadAction<ApiError | undefined>) => ({
      ...state,
      latestError: action.payload ?? null,
    }),
    dismissLatestError: (state) => ({
      ...state,
      latestError: null,
    }),
  },
});

export const { setLatestError, dismissLatestError } = errorSlice.actions;

export const errorReducer = errorSlice.reducer;

export const getLatestError = createSelector(
  (state: RootState) => state.error.latestError,
  (error) => ({
    message: error ? getErrorMessage(error) : '',
    dismissed: error === null,
  })
);
