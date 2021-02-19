import React from 'react';
import { render } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import TripSnippet from './TripSnippet';

describe('TripSnippet tests', () => {
  it('Properly renders TripSnippet if passed tripinfo', () => {
    const trip = {
      tripName: 'example trip',
      tripID: 'asdfasdf',
      createdAt: '2020-12-31T22:06:07.402Z',
      members: ['johndoe', 'janedoe'],
      createdBy: 'johndoe',
    };
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <TripSnippet trip={trip} />
      </MemoryRouter>
    );
    expect(getByRole('link', { name: /example trip/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /delete trip/i })).toBeInTheDocument();
    expect(getByText(/by johndoe/i)).toBeInTheDocument();
    expect(getByText(/members: johndoe, janedoe/i)).toBeInTheDocument();
  });
});
