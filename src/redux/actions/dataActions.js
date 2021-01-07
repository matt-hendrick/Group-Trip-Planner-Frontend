import {
  SET_TRIPS,
  SET_TRIP,
  LOADING_UI,
  STOP_LOADING_UI,
  CREATE_TRIP,
  INVITE_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
} from '../types';
import axios from 'axios';

export const getTrips = (tripID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/trips/${tripID}`)
    .then((res) => {
      dispatch({ type: SET_TRIPS, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTrip = (tripID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/trips/${tripID}`)
    .then((res) => {
      dispatch({ type: SET_TRIP, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createTrip = (newTrip) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trips`, newTrip)
    .then((res) => {
      dispatch({ type: CREATE_TRIP, payload: res.data });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const inviteUser = (tripID, recipient) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trips/${tripID}/invite`, recipient)
    .then((res) => {
      dispatch({ type: INVITE_USER, payload: recipient.recipient });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
