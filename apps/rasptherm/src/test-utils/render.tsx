import { ReactElement, ReactNode } from 'react';
import { RenderOptions, render as _render } from '@testing-library/react';
import { RootState, setupStore } from '../store/store';
import { Provider } from 'react-redux';
import WithTheme from '../components/with-theme/with-theme';

export function render(
  ui: ReactElement,
  preloadedState?: Partial<RootState>,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const store = setupStore(preloadedState);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <WithTheme>{children}</WithTheme>
      </Provider>
    );
  }

  return _render(ui, { wrapper: Wrapper, ...options });
}
