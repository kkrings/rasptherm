import { AppBar, Toolbar } from '@mui/material';
import ThemeMode from '../theme-mode/theme-mode';

function Topbar() {
  return (
    <AppBar position="static" sx={{ mb: '1rem' }}>
      <Toolbar>
        <ThemeMode />
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
