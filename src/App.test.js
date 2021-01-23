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
    expect(screen.getByRole('heading', /login/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', /email/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', /password/i)).toBeInTheDocument();
  });
});
