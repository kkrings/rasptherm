import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { SENSOR_FEATURE_KEY, sensorReducer } from './sensor.slice';
import { THEME_FEATURE_KEY, themeReducer } from './theme.slice';

const rootReducer = combineReducers({
  [SENSOR_FEATURE_KEY]: sensorReducer,
  [THEME_FEATURE_KEY]: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const store = setupStore();
export type AppDispatch = typeof store.dispatch;
