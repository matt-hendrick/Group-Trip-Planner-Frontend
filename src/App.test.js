import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App tests', () => {
  it('App renders Login page by default', () => {
    render(
      // <MemoryRouter>
      <App />
      // </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /here/i })).toBeInTheDocument();
  });
});
