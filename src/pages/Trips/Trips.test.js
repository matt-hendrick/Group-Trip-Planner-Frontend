import React from 'react';
import { cleanup, render } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Trips from './Trips';

describe('Trips tests', () => {
  afterEach(cleanup);
  it('Renders Trips page when passed valid credentials and trip info', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Trips />
      </MemoryRouter>,
      {
        initialState: {
          trip: { loading: false },
          user: {
            authenticated: true,
            credentials: {
              handle: 'johndoe',
              createdAt: '2020-12-31T22:06:07.402Z',
              userID: 'asdfasdfsdafkFry1MDw2',
            },
            trips: [
              {
                createdBy: 'johndoe',
                tripName: 'Example Trip',
                createdAt: '2021-01-10T21:00:44.230Z',
                members: ['janedoe', 'johndoe'],
                mapZoomLevel: 6,
                itineraryItems: {
                  0: {
                    userHandle: 'janedoe',
                    createdAt: '2021-01-17T17:56:44.726Z',
                    body: '10 am hike',
                  },
                },
                destination: [-5.93833, 54.59667],
                pendingInvites: ['jimdoe', 'billdoe'],
                tripID: 'MfaserccsfJyX2DeUYI',
              },
            ],
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
    expect(getByRole('link', { name: /example trip/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /delete trip/i })).toBeInTheDocument();
  });

  it('Renders create new trip dialog when create new trip button clicked', async () => {
    const { getByRole, findByRole, findByText } = render(
      <MemoryRouter>
        <Trips />
      </MemoryRouter>,
      {
        initialState: {
          trip: { loading: false },
          user: {
            authenticated: true,
            credentials: {
              handle: 'johndoe',
              createdAt: '2020-12-31T22:06:07.402Z',
              userID: 'asdfasdfsdafkFry1MDw2',
            },
            trips: [
              {
                createdBy: 'johndoe',
                tripName: 'Example Trip',
                createdAt: '2021-01-10T21:00:44.230Z',
                members: ['janedoe', 'johndoe'],
                mapZoomLevel: 6,
                itineraryItems: {
                  0: {
                    userHandle: 'janedoe',
                    createdAt: '2021-01-17T17:56:44.726Z',
                    body: '10 am hike',
                  },
                },
                destination: [-5.93833, 54.59667],
                pendingInvites: ['jimdoe', 'billdoe'],
                tripID: 'MfaserccsfJyX2DeUYI',
              },
            ],
          },
        },
      }
    );
    userEvent.click(getByRole('button', { name: /create a new trip/i }));
    await findByRole('heading', { name: /create a new trip/i });
    await findByRole('button', { name: /submit/i });
    await findByText(/trip name/i);
  });

  it('Renders delete trip confirmation dialog when delete trip button clicked', async () => {
    const { getByRole, findByRole, findByText } = render(
      <MemoryRouter>
        <Trips />
      </MemoryRouter>,
      {
        initialState: {
          trip: { loading: false },
          user: {
            authenticated: true,
            credentials: {
              handle: 'johndoe',
              createdAt: '2020-12-31T22:06:07.402Z',
              userID: 'asdfasdfsdafkFry1MDw2',
            },
            trips: [
              {
                createdBy: 'johndoe',
                tripName: 'Example Trip',
                createdAt: '2021-01-10T21:00:44.230Z',
                members: ['janedoe', 'johndoe'],
                mapZoomLevel: 6,
                itineraryItems: {
                  0: {
                    userHandle: 'janedoe',
                    createdAt: '2021-01-17T17:56:44.726Z',
                    body: '10 am hike',
                  },
                },
                destination: [-5.93833, 54.59667],
                pendingInvites: ['jimdoe', 'billdoe'],
                tripID: 'MfaserccsfJyX2DeUYI',
              },
            ],
          },
        },
      }
    );
    userEvent.click(getByRole('button', { name: /delete trip/i }));
    await findByRole('button', { name: /delete/i });
    await findByRole('button', { name: /cancel/i });
    await findByText(/Are you sure you want to delete this trip/i);
  });

  it('Renders "No Profile Found" after logout button clicked', async () => {
    const { getByRole, findByText } = render(
      <MemoryRouter>
        <Trips />
      </MemoryRouter>,
      {
        initialState: {
          trip: { loading: false },
          user: {
            authenticated: true,
            credentials: {
              handle: 'johndoe',
              createdAt: '2020-12-31T22:06:07.402Z',
              userID: 'asdfasdfsdafkFry1MDw2',
            },
            trips: [
              {
                createdBy: 'johndoe',
                tripName: 'Example Trip',
                createdAt: '2021-01-10T21:00:44.230Z',
                members: ['janedoe', 'johndoe'],
                mapZoomLevel: 6,
                itineraryItems: {
                  0: {
                    userHandle: 'janedoe',
                    createdAt: '2021-01-17T17:56:44.726Z',
                    body: '10 am hike',
                  },
                },
                destination: [-5.93833, 54.59667],
                pendingInvites: ['jimdoe', 'billdoe'],
                tripID: 'MfaserccsfJyX2DeUYI',
              },
            ],
          },
        },
      }
    );
    userEvent.click(getByRole('button', { name: /logout/i }));
    await findByText(/No profile found, please login again/i);
  });
});
