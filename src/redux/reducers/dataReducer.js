import {
  SET_GROUPS,
  SET_GROUP,
  SET_TRIP,
  LOADING_DATA,
  CREATE_GROUP,
  CREATE_TRIP,
  INVITE_USER,
} from '../types';

const initialState = {
  groups: [],
  group: {},
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
    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        loading: false,
      };
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case SET_TRIP:
      return {
        ...state,
        trip: action.payload,
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [action.payload, ...state.groups],
      };
    case CREATE_TRIP:
      return {
        ...state,
        group: {
          ...state.group,
          trips: [action.payload, ...state.group.trips],
        },
      };
    case INVITE_USER:
      return {
        ...state,
        group: {
          ...state.group,
          pendingInvites: [action.payload, ...state.group.pendingInvites],
        },
      };
    default:
      return state;
  }
};

export default dataReducer;
