import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ThemeMode } from '../types/theme';

export const THEME_FEATURE_KEY = 'theme';

interface ThemeState {
  mode: ThemeMode;
}

const initialThemeState: ThemeState = {
  mode: 'system',
};

const themeSlice = createSlice({
  name: THEME_FEATURE_KEY,
  initialState: initialThemeState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => ({
      ...state,
      mode: action.payload,
    }),
  },
});

export const { setThemeMode } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
