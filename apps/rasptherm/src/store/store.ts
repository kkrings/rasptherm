import { configureStore } from '@reduxjs/toolkit';
import { SENSOR_FEATURE_KEY, sensorReducer } from './sensor.slice';

export const store = configureStore({
  reducer: { [SENSOR_FEATURE_KEY]: sensorReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
