import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { clearErrors, setErrors } from './errorsActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('errorActions tests', () => {
  it('clearErrors should dispatch a clear errors action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(clearErrors());

    const actions = store.getActions(clearErrors());
    const expectedPayload = { type: 'CLEAR_ERRORS' };
    expect(actions).toEqual([expectedPayload]);
  });

  it('setErrors should dispatch a set errors action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(setErrors());

    const actions = store.getActions();
    const expectedPayload = { type: 'SET_ERRORS' };
    expect(actions).toEqual([expectedPayload]);
  });
});
