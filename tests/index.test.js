import { render, screen } from '@testing-library/react';
import App from '../pages/index';

describe('App Testing', () => {
  it("should render without crashing", () => {
    render(<App />);
    expect(
      screen.getByText('Hello, Clipboard health!')
    ).toBeDefined();
  });
});