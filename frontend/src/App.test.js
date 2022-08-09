import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("app is logged out by default", () => {
    expect.assertions(1);
    render(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
});