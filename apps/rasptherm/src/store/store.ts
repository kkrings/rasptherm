import { configureStore } from '@reduxjs/toolkit';
import { SENSOR_FEATURE_KEY, sensorReducer } from './sensor.slice';
import { THEME_FEATURE_KEY, themeReducer } from './theme.slice';

export const store = configureStore({
  reducer: {
    [SENSOR_FEATURE_KEY]: sensorReducer,
    [THEME_FEATURE_KEY]: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
