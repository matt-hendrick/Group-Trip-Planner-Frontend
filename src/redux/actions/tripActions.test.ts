import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

// Redux Actions
import { getTrip } from './tripActions';

// Types
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Trip } from '../../utility/sharedTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('tripActions tests', () => {
  it('getTrip should dispatch an initial Loading UI action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const mockResult = {};

    fetchMock.getOnce('/trips/100', mockResult);

    const dispatchStore = store.dispatch as ThunkDispatch<Trip, void, Action>;

    dispatchStore(getTrip('1'));

    const actions = store.getActions();
    let expectedPayload = { type: 'LOADING_DATA' };
    expect(actions).toEqual([expectedPayload]);
  });
});
