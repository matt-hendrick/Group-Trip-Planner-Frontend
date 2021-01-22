import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_DATA,
  STOP_LOADING_DATA,
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getOwnUserDetails());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
      dispatch({ type: STOP_LOADING_DATA });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getOwnUserDetails());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
      dispatch({ type: STOP_LOADING_DATA });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getOwnUserDetails = () => (dispatch) => {
  axios
    .get(`/user`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const acceptInvite = (tripID, inviteID) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/trips/${tripID}/invite/${inviteID}`)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_DATA });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const rejectInvite = (tripID, inviteID) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .delete(`/trips/${tripID}/invite/${inviteID}`)
    .then((res) => {
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_DATA });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
