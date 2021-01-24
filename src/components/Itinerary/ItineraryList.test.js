import React from 'react';
import { render } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import ItineraryList from './ItineraryList';

describe('ItineraryList tests', () => {
  it('Properly renders ItineraryList when passed valid credentials and list info', () => {
    const itineraryItems = {
      0: {
        userHandle: 'janedoe',
        createdAt: '2021-01-17T17:56:44.726Z',
        body: '10 am hike',
      },
    };
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <ItineraryList
          tripID="MlPuDgZccsfJyX2DeUYI"
          itineraryItems={itineraryItems}
        />
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
    expect(getByRole('heading', { name: /itinerary/i })).toBeInTheDocument();
    expect(
      getByRole('button', { name: /janedoe 10 am hike/i })
    ).toBeInTheDocument();
    expect(
      getByRole('button', { name: /Add new itinerary item/i })
    ).toBeInTheDocument();
    expect(getByRole('list', { name: /itinerary list/i })).toBeInTheDocument();
  });
});
