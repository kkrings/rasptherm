import { useThemeMode } from '../../hooks/theme';
import ThemeModeFormControl from './theme-mode-form-control';
import ThemeModePopover from './theme-mode-popover';

export function ThemeMode() {
  const { themeMode, changeThemeMode } = useThemeMode();

  return (
    <ThemeModePopover>
      <ThemeModeFormControl mode={themeMode} onModeChange={changeThemeMode} />
    </ThemeModePopover>
  );
}

export default ThemeMode;
