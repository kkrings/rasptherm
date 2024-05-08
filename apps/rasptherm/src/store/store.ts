import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ERROR_FEATURE_KEY, errorReducer } from './error.slice';
import { THEME_FEATURE_KEY, themeReducer } from './theme.slice';
import { sensorApi } from './sensor.api';

const rootReducer = combineReducers({
  [sensorApi.reducerPath]: sensorApi.reducer,
  [ERROR_FEATURE_KEY]: errorReducer,
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
