import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Redux Actions
import { clearErrors, setErrors } from './errorsActions';

// Types
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Error } from '../../utility/sharedTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('errorActions tests', () => {
  it('clearErrors should dispatch a clear errors action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const dispatchStore = store.dispatch as ThunkDispatch<Error, void, Action>;

    dispatchStore(clearErrors());

    const actions = store.getActions();
    const expectedPayload = { type: 'CLEAR_ERRORS' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('setErrors should dispatch a set errors action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const dispatchStore = store.dispatch as ThunkDispatch<Error, void, Action>;

    dispatchStore(setErrors({ email: 'Email already in use' }));

    const actions = store.getActions();
    const expectedPayload = {
      type: 'SET_ERRORS',
      payload: { email: 'Email already in use' },
    };
    expect(actions).toEqual([expectedPayload]);
  });
});
