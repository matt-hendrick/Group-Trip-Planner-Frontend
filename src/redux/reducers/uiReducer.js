import { SET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
  loading: false,
  errors: '',
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: '',
      };

    default:
      return state;
  }
};

export default uiReducer;
