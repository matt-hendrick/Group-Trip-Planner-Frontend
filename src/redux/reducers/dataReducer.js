import {
  SET_TRIPS,
  SET_TRIP,
  LOADING_DATA,
  CREATE_TRIP,
  DELETE_TRIP,
  CREATE_COMMENT,
  DELETE_COMMENT,
  CREATE_PIN,
  CREATE_ITINERARY_ITEM,
  DELETE_ITINERARY_ITEM,
  EDIT_ITINERARY_ITEM,
  INVITE_USER,
  SET_COORDINATES,
  SET_MAP_ZOOM_LEVEL,
} from '../types';

const initialState = {
  trips: [],
  trip: {},
  loading: false,
  invitedUsers: [],
  coordinates: [],
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
    case DELETE_TRIP:
      let deleteTripIndex = state.trips.findIndex(
        (trip) => trip.tripID === action.payload
      );
      state.trips.splice(deleteTripIndex, 1);
      return {
        ...state,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        trip: {
          ...state.trip,
          comments: [action.payload, ...state.trip.comments],
        },
      };
    case DELETE_COMMENT:
      let deleteCommentIndex = state.trip.comments.findIndex(
        (comment) => comment.commentID === action.payload
      );
      state.trip.comments.splice(deleteCommentIndex, 1);
      return {
        ...state,
      };
    case CREATE_PIN:
      return {
        ...state,
        trip: {
          ...state.trip,
          pins: [action.payload, ...state.trip.pins],
        },
      };
    case CREATE_ITINERARY_ITEM:
      return {
        ...state,
        trip: {
          ...state.trip,
          itineraryitems: [action.payload, ...state.trip.itineraryitems],
        },
      };
    case DELETE_ITINERARY_ITEM:
      let deleteItineraryItemIndex = state.trip.itineraryitems.findIndex(
        (itineraryitem) => itineraryitem.itineraryItemID === action.payload
      );
      state.trip.itineraryitems.splice(deleteItineraryItemIndex, 1);
      return {
        ...state,
      };
    case EDIT_ITINERARY_ITEM:
      let editItineraryItemIndex = state.trip.itineraryitems.findIndex(
        (itineraryitem) =>
          itineraryitem.itineraryItemID === action.payload.itineraryItemID
      );
      state.trip.itineraryitems[editItineraryItemIndex] =
        action.payload.newItineraryItem;
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
    case SET_COORDINATES:
      return {
        ...state,
        trip: {
          ...state.trip,
          destination: action.payload,
        },
      };
    case SET_MAP_ZOOM_LEVEL:
      return {
        ...state,
        trip: {
          ...state.trip,
          mapZoomLevel: action.payload,
        },
      };
    default:
      return state;
  }
};

export default dataReducer;
