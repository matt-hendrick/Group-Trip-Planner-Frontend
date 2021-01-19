import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  // ACCEPT_INVITE,
  // REJECT_INVITE,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
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
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return { ...state, loading: true };
    // case ACCEPT_INVITE:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       invites: [action.payload, ...state.user.invites],
    //     },
    //   };
    // case REJECT_INVITE:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       invites: [action.payload, ...state.user.pendingInvites],
    //     },
    //   };
    default:
      return state;
  }
};

export default userReducer;
