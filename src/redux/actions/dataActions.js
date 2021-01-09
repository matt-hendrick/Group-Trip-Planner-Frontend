import {
  SET_TRIPS,
  SET_TRIP,
  LOADING_UI,
  STOP_LOADING_UI,
  CREATE_TRIP,
  DELETE_TRIP,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
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

export const deleteTrip = (tripID) => (dispatch) => {
  axios
    .delete(`/trips/${tripID}`)
    .then(() => {
      dispatch({ type: DELETE_TRIP, payload: tripID });
    })
    .catch((err) => console.log(err));
};

export const submitComment = (tripID, newComment) => (dispatch) => {
  axios
    .post(`/trips/${tripID}/comment`, newComment)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const deleteComment = (tripID, commentID) => (dispatch) => {
  axios
    .delete(`/trips/${tripID}/comments/${commentID}`)
    .then(() => {
      dispatch({ type: DELETE_COMMENT, payload: commentID });
    })
    .catch((err) => console.log(err));
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
