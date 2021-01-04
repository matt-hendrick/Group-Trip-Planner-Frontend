import {
  SET_GROUPS,
  SET_GROUP,
  LOADING_DATA,
  LOADING_UI,
  STOP_LOADING_UI,
  CREATE_GROUP,
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

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
