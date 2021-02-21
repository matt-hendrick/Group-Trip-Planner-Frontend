import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Redux Actions
import { logoutUser } from './userActions';

// Types
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { User } from '../../utility/sharedTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('userActions tests', () => {
  it('logoutUser should dispatch a set unauthenticated action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const dispatchStore = store.dispatch as ThunkDispatch<User, void, Action>;

    dispatchStore(logoutUser());

    const actions = store.getActions();
    const expectedPayload = { type: 'SET_UNAUTHENTICATED' };
    expect(actions).toEqual([expectedPayload]);
  });
});
