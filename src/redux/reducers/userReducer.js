import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from '../reduxTypes';

export const initialState = {
  authenticated: false,
  credentials: {},
  trips: null,
  invites: null,
};

const userReducer = (state = initialState, action) => {
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
