import {
  SET_GROUPS,
  SET_GROUP,
  SET_TRIP,
  LOADING_DATA,
  CREATE_GROUP,
  CREATE_TRIP,
} from '../types';

const initialState = {
  groups: [],
  group: {},
  trip: {},
  loading: false,
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
    default:
      return state;
  }
};

export default dataReducer;
