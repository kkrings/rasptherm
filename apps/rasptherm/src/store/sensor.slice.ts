import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SensorReadout } from '../types/sensor';

export const SENSOR_FEATURE_KEY = 'sensor';

export type SensorState = {
  readout: SensorReadout;
  status: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
};

const initialSensorState: SensorState = {
  readout: {
    executedAt: new Date(),
    temperature: 0.0,
    humidity: 0.0,
  },
  status: 'not loaded',
  error: null,
};

export const readSensor = createAsyncThunk('sensor/read', async () => {
  const sensorReadout: SensorReadout = {
    executedAt: new Date(),
    temperature: 21.0,
    humidity: 60.0,
  };

  return Promise.resolve(sensorReadout);
});

const sensorSlice = createSlice({
  name: SENSOR_FEATURE_KEY,
  initialState: initialSensorState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readSensor.pending, (state: SensorState) => {
        state.status = 'loading';
      })
      .addCase(
        readSensor.fulfilled,
        (state: SensorState, action: PayloadAction<SensorReadout>) => {
          state.readout = action.payload;
          state.status = 'loaded';
        }
      )
      .addCase(readSensor.rejected, (state: SensorState, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const sensorReducer = sensorSlice.reducer;
