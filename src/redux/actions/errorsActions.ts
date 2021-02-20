import { SET_ERRORS, CLEAR_ERRORS } from '../reduxTypes';
import { Dispatch } from 'redux';
import { Error } from '../../utility/sharedTypes';

export const clearErrors = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const setErrors = (errors: Error) => (dispatch: Dispatch) => {
  dispatch({ type: SET_ERRORS, payload: errors });
};
