import { render } from '../../test-utils/render';

import ThemeMode from './theme-mode';

describe('ThemeMode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeMode />);
    expect(baseElement).toBeTruthy();
  });
});
