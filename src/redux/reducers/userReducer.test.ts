import reducer, { initialState } from './userReducer';
import * as types from '../reduxTypes';

describe('userReducer tests', () => {
  it('should handle SET_AUTHENTICATED', () => {
    expect(
      reducer(initialState, {
        ...initialState,
        type: types.SET_AUTHENTICATED,
      })
    ).toEqual({
      authenticated: true,
      credentials: {},
      trips: null,
      invites: null,
    });
  });

  it('should handle SET_UNAUTHENTICATED', () => {
    expect(
      reducer(initialState, {
        ...initialState,
        type: types.SET_UNAUTHENTICATED,
      })
    ).toEqual({
      authenticated: false,
      credentials: {},
      trips: null,
      invites: null,
    });
  });

  it('should handle SET_USER', () => {
    const payload = {
      authenticated: true,
      credentials: {
        handle: 'john doe',
        createdAt: '1/1/2025',
        email: 'johndoe@gmail.com',
        userID: 'random',
      },
      trips: [
        {
          tripID: '1',
          tripName: 'test trip',
          createdAt: '1/1/2025',
          itineraryItems: {},
          createdBy: 'johndoe',
          destination: null,
          pendingInvites: ['janedoe'],
          mapZoomLevel: 8,
          members: ['johndoe'],
        },
      ],
      invites: [
        {
          sender: 'jimdoe',
          recipient: 'johndoe',
          createdAt: '1/1/2025',
          tripID: '1',
          tripName: 'test trip',
          inviteID: '2',
        },
      ],
    };
    expect(
      reducer(initialState, {
        type: types.SET_USER,
        payload,
      })
    ).toEqual({
      authenticated: true,
      credentials: {
        handle: 'john doe',
        createdAt: '1/1/2025',
        email: 'johndoe@gmail.com',
        userID: 'random',
      },
      trips: [
        {
          tripID: '1',
          tripName: 'test trip',
          createdAt: '1/1/2025',
          itineraryItems: {},
          createdBy: 'johndoe',
          destination: null,
          pendingInvites: ['janedoe'],
          mapZoomLevel: 8,
          members: ['johndoe'],
        },
      ],
      invites: [
        {
          sender: 'jimdoe',
          recipient: 'johndoe',
          createdAt: '1/1/2025',
          tripID: '1',
          tripName: 'test trip',
          inviteID: '2',
        },
      ],
    });
  });
});
