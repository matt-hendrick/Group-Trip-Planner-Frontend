import React from 'react';
import { render } from '../../utility/reduxTestUtils';
import { MemoryRouter } from 'react-router-dom';
import UserProfile from './UserProfile';

describe('UserProfile tests', () => {
  it('Properly renders UserProfile if authenticated and passed a handle/createdAt', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
      {
        initialState: {
          user: {
            authenticated: true,
            credentials: {
              handle: 'johndoe',
              createdAt: '2020-12-31T22:06:07.402Z',
            },
          },
        },
      }
    );
    expect(getByRole('heading', { name: /johndoe/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(getByText(/dec 2020/i)).toBeInTheDocument();
  });

  it('Renders "No profile found" if not authenticated', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
      {
        initialState: {
          user: {
            authenticated: false,
            credentials: { handle: undefined },
          },
        },
      }
    );
    expect(
      getByRole('heading', {
        name: /No profile found, please login again/i,
      })
    ).toBeInTheDocument();
  });

  it('Renders UserProfileSkeleton if loading ', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
      {
        initialState: {
          trip: { loading: true },
        },
      }
    );
    expect(getByText(/joined date/i)).toBeInTheDocument();
  });
});
