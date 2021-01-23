import React from 'react';
import { render } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Trips from './Trips';

describe('Trips tests', () => {
  it('Renders Trips page when passed valid credentials and trip info', () => {
    const { getByRole, getByText } = render(
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

    // fireEvent.click(getByRole('button', { name: /delete trip/i }));
    // await (() => {
    //   expect(
    //     getByRole('link', { name: /example trip/i })
    //   ).not.toBeInTheDocument();
    // });
  });
});
