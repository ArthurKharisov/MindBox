import * as React from 'react';
import { render } from '@testing-library/react';

import App from '..'

export function setupComponent() {
  const { container, unmount } = render(
    <App />
  )
  return {
    container,
    unmount,
  }
}
