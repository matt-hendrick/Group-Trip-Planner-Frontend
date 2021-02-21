import axios from 'axios';

// Redux Types
import { SET_USER, SET_UNAUTHENTICATED } from '../reduxTypes';

//Redux Actions
import { setErrors, clearErrors } from './errorsActions';
import { loadingData, clearLoadingData } from './tripActions';

// Types
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { User } from '../../utility/sharedTypes';
import { History } from 'history';

interface UserData {
  email: string;
  password: string;
  confirmPassword?: string;
  handle?: string;
}

export const loginUser = (userData: UserData, history: History) => (
  dispatch: ThunkDispatch<User, void, Action>
) => {
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
      dispatch(setErrors(err?.response?.data));
    });
};

export const signupUser = (newUserData: UserData, history: History) => (
  dispatch: ThunkDispatch<User, void, Action>
) => {
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
      dispatch(setErrors(err?.response?.data));
    });
};

export const logoutUser = () => (
  dispatch: ThunkDispatch<User, void, Action>
) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getOwnUserDetails = () => (
  dispatch: ThunkDispatch<User, void, Action>
) => {
  axios
    .get(`/user`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => setErrors(err?.response?.data));
};

export const acceptInvite = (tripID: string, inviteID: string) => (
  dispatch: ThunkDispatch<User, void, Action>
) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/invite/${inviteID}`)
    .then((res) => {
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err?.response?.data));
    });
};

export const rejectInvite = (tripID: string, inviteID: string) => (
  dispatch: ThunkDispatch<User, void, Action>
) => {
  dispatch(loadingData());
  axios
    .delete(`/trips/${tripID}/invite/${inviteID}`)
    .then((res) => {
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err?.response?.data));
    });
};

export const setAuthorizationHeader = (token: string) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
