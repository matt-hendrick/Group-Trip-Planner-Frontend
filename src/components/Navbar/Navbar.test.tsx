import React from 'react';
import { render } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar tests', () => {
  it('Properly renders Navbar when authenticated', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      {
        initialState: {
          user: {
            authenticated: true,
          },
        },
      }
    );
    expect(getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /invites/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('Properly renders Navbar when not authenticated', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      {
        initialState: {
          user: {
            authenticated: false,
          },
        },
      }
    );
    expect(getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /signup/i })).toBeInTheDocument();
  });
});
