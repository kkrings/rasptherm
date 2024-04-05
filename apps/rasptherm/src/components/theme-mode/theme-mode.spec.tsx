import { screen } from '@testing-library/react';
import { render } from '../../test-utils/render';
import userEvent from '@testing-library/user-event';
import ThemeMode from './theme-mode';

describe('ThemeMode', () => {
  it('popover should be closed', () => {
    render(<ThemeMode />);
    expect(screen.queryByText('Mode')).toBeNull();
  });

  it('popover should be open', async () => {
    render(<ThemeMode />);
    const button = await screen.findByLabelText('Theme mode');
    await userEvent.click(button);
    await screen.findByText('Mode');
  });

  it('system theme mode should be selected', async () => {
    render(<ThemeMode />);
    const button = await screen.findByLabelText('Theme mode');
    await userEvent.click(button);
    const systemMode = await screen.findByLabelText('System');
    expect(systemMode).toHaveProperty('checked');
  });
});
