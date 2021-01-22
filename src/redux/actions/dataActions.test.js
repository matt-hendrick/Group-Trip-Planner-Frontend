import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  getTrip,
  // setTripMapZoomLevel,
  clearErrors,
  setErrors,
} from './dataActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('data actions tests', () => {
  it('getTrip should dispatch an initial Loading UI action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const mockResult = {};

    fetchMock.getOnce('/trips/100', mockResult);

    store.dispatch(getTrip());

    const actions = store.getActions();
    let expectedPayload = { type: 'LOADING_UI' };
    expect(actions).toEqual([expectedPayload]);
    // expectedPayload = { type: 'GET_TRIP', payload: mockResult };
  });

  // it('setTripMapZoomLevel should dispatch a set map zoom level action', () => {
  //   const initialState = {};
  //   const store = mockStore(initialState);

  //   const mockResult = {};

  //   fetchMock.postOnce('/trips/1002?mapZoomLevel=3', mockResult, {
  //     method: 'POST',
  //   });

  //   store.dispatch(setTripMapZoomLevel());

  //   const actions = store.getActions();
  //   let expectedPayload = { type: 'SET_MAP_ZOOM_LEVEL', payload: mockResult };
  //   expect(actions).toEqual([expectedPayload]);
  // });

  it('clearErrors should dispatch a clear errors action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(clearErrors());

    const actions = store.getActions();
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
