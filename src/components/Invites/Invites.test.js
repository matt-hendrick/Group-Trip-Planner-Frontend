import React from 'react';
import { render, screen } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import Invites from './Invites';

describe('Invites tests', () => {
  it('Properly renders Invites when invites are passed', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Invites />
      </MemoryRouter>,
      {
        initialState: {
          user: {
            invites: [
              {
                tripName: 'Trip name',
                sender: 'janedoe',
                recipient: 'johndoe',
                createdAt: '2021-01-22T12:23:52.737Z',
                tripID: 'EC3yJNZ9dZ0ABIjQX7TQ',
                inviteID: 'RVYnzBFlZxBylLw72iLe',
              },
            ],
          },
        },
      }
    );
    expect(getByRole('button', { name: /invites/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /invitebadge/i })).toBeInTheDocument();
  });

  it('Properly renders Invites when not invites are not passed', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Invites />
      </MemoryRouter>,
      {
        initialState: {
          user: {
            invites: [],
          },
        },
      }
    );
    expect(getByRole('button', { name: /invites/i })).toBeInTheDocument();
  });
});
