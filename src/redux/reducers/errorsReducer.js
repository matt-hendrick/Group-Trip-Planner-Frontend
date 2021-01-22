import { SET_ERRORS, CLEAR_ERRORS } from '../types';

export const initialState = {
  errors: '',
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: '',
      };
    default:
      return state;
  }
};

export default errorsReducer;
