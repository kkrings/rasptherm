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
    temperatureDegreeCelsius: 0.0,
    relativeHumidityPercent: 0.0,
    executedAtUtc: new Date().toISOString(),
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
    temperatureDegreeCelsius: readout.temperatureDegreeCelsius,
    relativeHumidityPercent: readout.relativeHumidityPercent,
    executedAtUtc: readout.executedAtUtc,
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
