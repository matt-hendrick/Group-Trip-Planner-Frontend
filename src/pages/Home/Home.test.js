import React from 'react';
import { render, screen } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home tests', () => {
  it('Renders Trips page when passed credentials in initialState', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      {
        initialState: {
          user: {
            authenticated: true,
            credentials: { handle: 'johndoe' },
          },
        },
      }
    );
    expect(
      getByRole('heading', { name: /johndoe's trips/i })
    ).toBeInTheDocument();
    expect(
      getByRole('button', { name: /create a new trip!/i })
    ).toBeInTheDocument();
  });
});
