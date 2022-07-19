import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("app automatically denies entry", () => {
    expect.assertions(1);
    render(<App />);
    const accessWasDenied = screen.getByTestId("accessDenied");
    expect(accessWasDenied).toBeInTheDocument();
});