// Redux Types
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from '../reduxTypes';

// Types
import { User } from '../../utility/sharedTypes';

interface Action {
  type: string;
  payload?: User;
}

interface Credentials {
  email: string;
  userID: string;
  handle: string;
  createdAt: string;
}

export const initialState: User = {
  authenticated: false,
  credentials: {} as Credentials,
  trips: null,
  invites: null,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
