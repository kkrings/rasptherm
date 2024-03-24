import { render } from '@testing-library/react';

import ThemeMode from './theme-mode';

describe('ThemeMode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeMode />);
    expect(baseElement).toBeTruthy();
  });
});
