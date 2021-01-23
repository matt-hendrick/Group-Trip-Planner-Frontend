import React from 'react';
import { render } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Trip from './Trip';

describe('Trip tests', () => {
  it('Renders Trip page when passed valid credentials and trip info', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Trip />
      </MemoryRouter>,
      {
        initialState: {
          trip: {
            loading: false,
            trip: {
              destination: [-5.93833, 54.59667],
              tripName: 'Example Trip #2',
              itineraryItems: {
                0: {
                  userHandle: 'janedoe',
                  createdAt: '2021-01-17T17:56:44.726Z',
                  body: '10 am hike',
                },
              },
              createdAt: '2021-01-10T21:00:44.230Z',
              createdBy: 'janedoe',
              pendingInvites: ['jimdoe', 'billdoe'],
              mapZoomLevel: 6,
              members: ['janedoe', 'johndoe', 'bobdoe'],
              tripID: 'asdfsadf',
              pins: [
                {
                  createdAt: '2021-01-22T17:30:17.744Z',
                  coordinates: [-7.29, 54.59],
                  address: 'Omagh, Omagh, Northern Ireland, United Kingdom',
                  tripID: 'MlPuDgZccsfJyX2DeUYI',
                  comment: null,
                  userHandle: 'johndoe',
                  pinID: 'SWFmdtWFmE0ZQAiMrPYt',
                },
              ],
              listItems: [
                {
                  likes: ['johndoe'],
                  createdAt: '2021-01-20T21:29:50.650Z',
                  tripID: 'MlPuDgZccsfJyX2DeUYI',
                  body: 'Another thing',
                  listType: 'Lodging',
                  date: null,
                  price: null,
                  link: null,
                  location: null,
                  userHandle: 'janedoe',
                  listItemID: 'Y2WicqwRBADdOfuTnZvN',
                },
              ],
            },
          },
          user: {
            authenticated: true,
            credentials: {
              handle: 'johndoe',
              createdAt: '2020-12-31T22:06:07.402Z',
              userID: 'asdfasdfsdafkFry1MDw2',
            },
          },
        },
      }
    );
    expect(
      getByRole('heading', { name: /example trip #2/i })
    ).toBeInTheDocument();
    expect(getByRole('heading', { name: /itinerary/i })).toBeInTheDocument();
    expect(
      getByRole('button', { name: /edit trip name/i })
    ).toBeInTheDocument();
    expect(
      getByRole('button', { name: /change map center/i })
    ).toBeInTheDocument();
    expect(getByRole('tab', { name: /lodging/i })).toBeInTheDocument();
  });
});
