import { AppBar, Toolbar, Typography } from '@mui/material';
import ThemeMode from '../theme-mode/theme-mode';

function Topbar() {
  return (
    <AppBar position="static" sx={{ mb: '1rem' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Rasptherm
        </Typography>
        <ThemeMode />
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
