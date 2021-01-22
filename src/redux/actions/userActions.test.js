import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { logoutUser, clearErrors } from './userActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('data actions tests', () => {
  it('logoutUser should dispatch a set unauthenticated action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(logoutUser());

    const actions = store.getActions();
    const expectedPayload = { type: 'SET_UNAUTHENTICATED' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('clearErrors should dispatch a clear errors action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(clearErrors());

    const actions = store.getActions();
    const expectedPayload = { type: 'CLEAR_ERRORS' };
    expect(actions).toEqual([expectedPayload]);
  });
});
