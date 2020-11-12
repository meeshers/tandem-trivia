import { render, screen } from '@testing-library/react';
import App from './App';

test.skip('render without crashing', () => {
  render(<App />);
});
