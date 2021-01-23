import React from 'react';
import { render, fireEvent, screen } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login tests', () => {
  it('Renders Login when connected with initialState', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
      // {
      //   initialState,
      // }
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /here/i })).toBeInTheDocument();
  });
});
