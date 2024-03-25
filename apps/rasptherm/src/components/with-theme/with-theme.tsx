import * as React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useCreateTheme } from '../../hooks/theme';

interface WithThemeProps {
  children: React.ReactNode;
}

function WithTheme({ children }: WithThemeProps) {
  const theme = useCreateTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default WithTheme;
