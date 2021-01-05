import {
  SET_GROUPS,
  SET_GROUP,
  SET_TRIP,
  LOADING_DATA,
  LOADING_UI,
  STOP_LOADING_UI,
  CREATE_GROUP,
  CREATE_TRIP,
  INVITE_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
} from '../types';
import axios from 'axios';

export const getGroups = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/groups')
    .then((res) => {
      dispatch({ type: SET_GROUPS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_GROUPS, payload: [] });
    });
};

export const getGroup = (groupID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/groups/${groupID}`)
    .then((res) => {
      dispatch({ type: SET_GROUP, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTrip = (groupID, tripID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/groups/${groupID}/trips/${tripID}`)
    .then((res) => {
      dispatch({ type: SET_TRIP, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createGroup = (newGroup) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/groups', newGroup)
    .then((res) => {
      dispatch({ type: CREATE_GROUP, payload: res.data });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const createTrip = (groupID, newTrip) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/groups/${groupID}/trips`, newTrip)
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

export const inviteUser = (groupID, recipient) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(recipient);
  axios
    .post(`/groups/${groupID}/invite`, recipient)
    .then((res) => {
      // dispatch({ type: INVITE_USER, payload: res.data });
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
