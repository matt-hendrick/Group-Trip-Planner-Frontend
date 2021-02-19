import React from 'react';
import { render } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import TripProfile from './TripProfile';

describe('TripProfile tests', () => {
  it('Properly renders TripProfile if passed tripinfo', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <TripProfile />
      </MemoryRouter>,
      {
        initialState: {
          trip: {
            trip: {
              createdAt: '2020-12-31T22:06:07.402Z',
              members: ['johndoe', 'janedoe'],
              pendingInvites: ['bobdoe'],
              tripID: 'asdfsadfsa',
            },
          },
        },
      }
    );
    expect(
      getByRole('button', { name: /invite a user to the trip/i })
    ).toBeInTheDocument();
    expect(getByText(/created on dec 31 2020/i)).toBeInTheDocument();
    expect(getByText(/members: johndoe, janedoe/i)).toBeInTheDocument();
    expect(getByText(/Invited Users: bobdoe/i)).toBeInTheDocument();
  });

  it('Renders TripProfileSkeleton if no tripinfo passed ', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TripProfile />
      </MemoryRouter>,
      {
        initialState: {
          trip: {
            trip: {},
          },
        },
      }
    );
    expect(getByText(/created date/i)).toBeInTheDocument();
  });
});
