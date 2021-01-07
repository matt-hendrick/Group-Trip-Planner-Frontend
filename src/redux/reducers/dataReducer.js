import {
  SET_TRIPS,
  SET_TRIP,
  LOADING_DATA,
  CREATE_TRIP,
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
