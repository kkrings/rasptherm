import { useCallback, useMemo } from 'react';
import { Theme, createTheme, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ThemeMode } from '../types/theme';
import { setThemeMode } from '../store/theme.slice';

interface UseThemeMode {
  themeMode: ThemeMode;
  changeThemeMode: (mode: ThemeMode) => void;
}

export function useThemeMode(): UseThemeMode {
  const themeMode = useAppSelector((state) => state.theme.mode);

  const dispatch = useAppDispatch();

  const changeThemeMode = useCallback(
    (mode: ThemeMode) => dispatch(setThemeMode(mode)),
    [dispatch]
  );

  return { themeMode, changeThemeMode };
}

export function useCreateTheme(): Theme {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const themeModeSystem = useMemo(
    () => (prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode]
  );

  const { themeMode } = useThemeMode();

  const mode = useMemo(
    () => (themeMode === 'system' ? themeModeSystem : themeMode),
    [themeMode, themeModeSystem]
  );

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return theme;
}
