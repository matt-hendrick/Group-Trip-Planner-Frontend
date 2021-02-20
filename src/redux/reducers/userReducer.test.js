import reducer, { initialState } from './userReducer';
import * as types from '../reduxTypes';

describe('userReducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      authenticated: false,
      credentials: {},
      trips: null,
      invites: null,
    });
  });

  it('should handle SET_AUTHENTICATED', () => {
    expect(
      reducer(initialState, {
        type: types.SET_AUTHENTICATED,
        authenticated: true,
        ...initialState,
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
        type: types.SET_UNAUTHENTICATED,
        initialState,
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
      credentials: {
        userHandle: 'john doe',
        createdAt: '1/1/2025',
        email: 'johndoe@gmail.com',
      },
      trips: [{ tripID: 1, tripName: 'test trip', createdAt: '1/1/2025' }],
      invites: [
        {
          sender: 'jimdoe',
          recipient: 'johndoe',
          createdAt: '1/1/2025',
          tripID: 2,
        },
      ],
    };
    expect(
      reducer([], {
        type: types.SET_USER,
        authenticated: true,
        payload,
      })
    ).toEqual({
      authenticated: true,
      credentials: {
        userHandle: 'john doe',
        createdAt: '1/1/2025',
        email: 'johndoe@gmail.com',
      },
      trips: [{ tripID: 1, tripName: 'test trip', createdAt: '1/1/2025' }],
      invites: [
        {
          sender: 'jimdoe',
          recipient: 'johndoe',
          createdAt: '1/1/2025',
          tripID: 2,
        },
      ],
    });
  });
});
