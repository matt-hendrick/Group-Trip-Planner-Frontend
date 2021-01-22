import reducer, { initialState } from './userReducer';
import * as types from '../types';
import { mock } from 'fetch-mock';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      authenticated: false,
      loading: false,
      credentials: {},
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
      loading: false,
      credentials: {},
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
      loading: false,
      credentials: {},
    });
  });

  it('should handle SET_USER', () => {
    // const mockCredentials = {
    //   userHandle: 'john doe',
    //   createdAt: '1/1/2025',
    //   email: 'johndoe@gmail.com',
    // };
    expect(
      reducer(initialState, {
        type: types.SET_USER,
        authenticated: true,
        loading: false,
      })
    ).toEqual({
      authenticated: true,
      loading: false,
      //   credentials: {},
    });
  });
});
