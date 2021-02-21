// Redux Types
import { SET_ERRORS, CLEAR_ERRORS } from '../reduxTypes';

// Types
import { Errors, Error } from '../../utility/sharedTypes';

interface Action {
  type: string;
  payload?: Error;
}

export const initialState: Errors = {
  errors: '',
};

const errorsReducer = (state = initialState, action: Action) => {
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
