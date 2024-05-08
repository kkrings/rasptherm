import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiError } from '../types/error';

export const ERROR_FEATURE_KEY = 'error';

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
    setLatestError: (
      state,
      action: PayloadAction<ErrorState['latestError']>
    ) => ({
      ...state,
      latestError: action.payload,
    }),
  },
});

export const { setLatestError } = errorSlice.actions;

export const errorReducer = errorSlice.reducer;
