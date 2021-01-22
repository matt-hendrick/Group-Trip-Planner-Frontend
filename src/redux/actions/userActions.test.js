import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { logoutUser } from './userActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('userActions tests', () => {
  it('logoutUser should dispatch a set unauthenticated action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(logoutUser());

    const actions = store.getActions();
    const expectedPayload = { type: 'SET_UNAUTHENTICATED' };
    expect(actions).toEqual([expectedPayload]);
  });
});
