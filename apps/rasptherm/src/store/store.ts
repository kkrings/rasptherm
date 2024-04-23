import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { THEME_FEATURE_KEY, themeReducer } from './theme.slice';
import { sensorApi } from './sensor.api';

const rootReducer = combineReducers({
  [sensorApi.reducerPath]: sensorApi.reducer,
  [THEME_FEATURE_KEY]: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sensorApi.middleware),
    preloadedState,
  });

export const store = setupStore();
export type AppDispatch = typeof store.dispatch;
