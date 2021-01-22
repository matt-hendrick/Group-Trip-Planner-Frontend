import { SET_USER, SET_UNAUTHENTICATED } from '../types';
import { setErrors, clearErrors } from './errorsActions';
import { loadingData, clearLoadingData } from './dataActions';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getOwnUserDetails());
      dispatch(clearErrors());
      history.push('/');
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getOwnUserDetails());
      dispatch(clearErrors());
      history.push('/');
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
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
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const acceptInvite = (tripID, inviteID) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/invite/${inviteID}`)
    .then((res) => {
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      console.log(err);
      dispatch(setErrors(err.response.data));
    });
};

export const rejectInvite = (tripID, inviteID) => (dispatch) => {
  dispatch(loadingData());
  axios
    .delete(`/trips/${tripID}/invite/${inviteID}`)
    .then((res) => {
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      console.log(err);
      dispatch(setErrors(err.response.data));
    });
};

export const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
