import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  getTrip,
  // setTripMapZoomLevel,
} from './dataActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('dataActions tests', () => {
  it('getTrip should dispatch an initial Loading UI action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const mockResult = {};

    fetchMock.getOnce('/trips/100', mockResult);

    store.dispatch(getTrip());

    const actions = store.getActions();
    let expectedPayload = { type: 'LOADING_DATA' };
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
});
