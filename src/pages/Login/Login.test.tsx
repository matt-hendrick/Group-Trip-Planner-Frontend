import React from 'react';
import { render, screen } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login tests', () => {
  it('Renders Login by default', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /here/i })).toBeInTheDocument();
  });
});
