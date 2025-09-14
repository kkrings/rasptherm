import { Typography, useTheme } from '@mui/material';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils/render';
import userEvent from '@testing-library/user-event';
import Topbar from './topbar';

function TopbarTest() {
  const theme = useTheme();

  return (
    <>
      <Topbar />
      <Typography variant="body1">Theme mode: {theme.palette.mode}</Typography>
    </>
  );
}

describe('Topbar', () => {
  it('should be themed in light mode', async () => {
    render(<TopbarTest />);
    await userEvent.click(await screen.findByLabelText('Theme mode'));
    await userEvent.click(await screen.findByLabelText('Light'));
    await screen.findByText('Theme mode: light');
  });

  it('should be themed in dark mode', async () => {
    render(<TopbarTest />);
    await userEvent.click(await screen.findByLabelText('Theme mode'));
    await userEvent.click(await screen.findByLabelText('Dark'));
    await screen.findByText('Theme mode: dark');
  });
});
