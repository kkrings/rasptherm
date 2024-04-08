import { screen } from '@testing-library/react';
import { render } from '../../test-utils/render';
import userEvent from '@testing-library/user-event';
import Topbar from './topbar';

describe('Topbar', () => {
  it('should be themed in light mode', async () => {
    render(<Topbar />);
    await userEvent.click(await screen.findByLabelText('Theme mode'));
    await userEvent.click(await screen.findByLabelText('Light'));
    const appTitle = await screen.findByText('Rasptherm');
    const header = appTitle.parentElement?.parentElement;
    expect(header).toHaveStyle('background-color: #1976d2');
  });

  it('should be themed in dark mode', async () => {
    render(<Topbar />);
    await userEvent.click(await screen.findByLabelText('Theme mode'));
    await userEvent.click(await screen.findByLabelText('Dark'));
    const appTitle = await screen.findByText('Rasptherm');
    const header = appTitle.parentElement?.parentElement;
    expect(header).toHaveStyle('background-color: #121212');
  });
});
