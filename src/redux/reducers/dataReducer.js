import {
  SET_TRIPS,
  SET_TRIP,
  LOADING_DATA,
  CREATE_TRIP,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
  INVITE_USER,
} from '../types';

const initialState = {
  trips: [],
  trip: {},
  loading: false,
  invitedUsers: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_TRIPS:
      return {
        ...state,
        trips: action.payload,
      };
    case SET_TRIP:
      return {
        ...state,
        trip: action.payload,
      };
    case CREATE_TRIP:
      return {
        ...state,

        trips: [action.payload, ...state.trips],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        trip: {
          ...state.trip,
          comments: [action.payload, ...state.trip.comments],
        },
      };
    case DELETE_COMMENT:
      let deleteIndex = state.trip.comments.findIndex(
        (comments) => comments.commentsID === action.payload
      );
      state.trip.comments.splice(deleteIndex, 1);
      return {
        ...state,
      };
    case INVITE_USER:
      return {
        ...state,
        trip: {
          ...state.trip,
          pendingInvites: [action.payload, ...state.trip.pendingInvites],
        },
      };
    default:
      return state;
  }
};

export default dataReducer;
