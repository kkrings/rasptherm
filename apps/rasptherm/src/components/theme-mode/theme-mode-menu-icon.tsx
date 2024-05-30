import { useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function ThemeModeMenuIcon() {
  const theme = useTheme();
  return theme.palette.mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />;
}

export default ThemeModeMenuIcon;
