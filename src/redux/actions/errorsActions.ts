// Redux Types
import { SET_ERRORS, CLEAR_ERRORS } from '../reduxTypes';

// Types
import { Error } from '../../utility/sharedTypes';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export const clearErrors = () => (
  dispatch: ThunkDispatch<Error, void, Action>
) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const setErrors = (errors: Error) => (
  dispatch: ThunkDispatch<Error, void, Action>
) => {
  dispatch({ type: SET_ERRORS, payload: errors });
};
