import React from 'react';
import { render, fireEvent, screen } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home tests', () => {
  it('Renders Trips page when passed credentials in initialState', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      {
        initialState: {
          user: {
            loading: false,
            authenticated: true,
            credentials: { handle: 'johndoe' },
          },
        },
      }
    );
    expect(
      screen.getByRole('heading', { name: /johndoe's trips/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create a new trip!/i })
    ).toBeInTheDocument();
  });

  // it('Redirects to Login page when pass credentials in initialState', async () => {
  //   render(
  //     <MemoryRouter>
  //       <Home />
  //     </MemoryRouter>,
  //     {
  //       initialState: {
  //         user: {
  //           loading: false,
  //           authenticated: false,
  //         },
  //       },
  //     }
  //   );
  //   expect(
  //     screen.getByRole('heading', { name: /johndoe's trips/i })
  //   ).toBeInTheDocument();
  //   expect(
  //     screen.getByRole('button', { name: /create a new trip!/i })
  //   ).toBeInTheDocument();
  // });
});
