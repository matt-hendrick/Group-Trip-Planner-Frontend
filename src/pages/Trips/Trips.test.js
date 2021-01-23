import React from 'react';
import {
  render,
  fireEvent,
  screen,
  cleanup,
} from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Trips from './Trips';

describe('Trips tests', () => {
  afterEach(cleanup);
  it('Renders Trips page when passed credentials in initialState', () => {
    render(
      <MemoryRouter>
        <Trips />
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
      screen.getByRole('heading', { name: /johndoe's trips/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create a new trip!/i })
    ).toBeInTheDocument();
  });

  // it('Renders Trips page when not passed credentials in initialState', () => {
  //   render(
  //     <MemoryRouter>
  //       <Trips />
  //     </MemoryRouter>,
  //     {
  //       initialState: {
  //         user: {
  //           authenticated: true,
  //           credentials: { handle: 'johndoe' },
  //         },
  //         trip: [
  //           { tripName: 'trip1', createdAt: '1/1/2021', members: ['johndoe'] },
  //         ],
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
