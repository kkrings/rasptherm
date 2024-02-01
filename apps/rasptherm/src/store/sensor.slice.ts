import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RaspthermClient } from '../client';
import { SensorReadout } from '../types/sensor';

export const SENSOR_FEATURE_KEY = 'sensor';

export interface SensorState {
  readout: SensorReadout;
  status: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

const initialSensorState: SensorState = {
  readout: {
    executedAt: new Date().toISOString(),
    temperature: 0.0,
    humidity: 0.0,
  },
  status: 'not loaded',
  error: null,
};

export const readSensor = createAsyncThunk('sensor/read', async () => {
  const client = new RaspthermClient({
    BASE: 'http://localhost:8000',
  });

  const readout = await client.sensor.readSensorSensorReadGet();

  const sensorReadout: SensorReadout = {
    executedAt: new Date().toISOString(),
    temperature: readout.temperature_degree_celsius,
    humidity: readout.relative_humidity_percent,
  };

  return sensorReadout;
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
