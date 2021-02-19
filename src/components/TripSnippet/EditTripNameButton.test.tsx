import React from 'react';
import { render } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import EditTripNameButton from './EditTripNameButton';

describe('EditTripNameButton tests', () => {
  it('Properly renders EditTripNameButton if passed tripinfo', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <EditTripNameButton tripName="example trip" tripID="asdfasdf" />
      </MemoryRouter>
    );
    expect(
      getByRole('button', { name: /edit trip name/i })
    ).toBeInTheDocument();
  });
});
