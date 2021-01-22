import {
  SET_TRIP,
  LOADING_DATA,
  CLEAR_LOADING_DATA,
  CREATE_TRIP,
  DELETE_TRIP,
  EDIT_TRIP_NAME,
  CREATE_PIN,
  EDIT_ITINERARY_ORDER,
  CREATE_LIST_ITEM,
  DELETE_LIST_ITEM,
  LIKE_LIST_ITEM,
  UNLIKE_LIST_ITEM,
  INVITE_USER,
  SET_COORDINATES,
  SET_MAP_ZOOM_LEVEL,
} from '../types';

const initialState = {
  trips: [],
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
    case CLEAR_LOADING_DATA:
      return {
        ...state,
        loading: false,
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
    case EDIT_TRIP_NAME:
      return {
        ...state,
        trip: {
          ...state.trip,
          tripName: action.payload,
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
    case CREATE_PIN:
      return {
        ...state,
        trip: {
          ...state.trip,
          pins: [action.payload, ...state.trip.pins],
        },
      };
    case EDIT_ITINERARY_ORDER:
      return {
        ...state,
        trip: {
          ...state.trip,
          itineraryItems: action.payload,
        },
      };
    case CREATE_LIST_ITEM:
      return {
        ...state,
        trip: {
          ...state.trip,
          listItems: [action.payload, ...state.trip.listItems],
        },
      };
    case DELETE_LIST_ITEM:
      let deleteListItemIndex = state.trip.listItems.findIndex(
        (listItem) => listItem.listItemID === action.payload
      );
      state.trip.listItems.splice(deleteListItemIndex, 1);
      return {
        ...state,
      };
    case LIKE_LIST_ITEM:
      let likeListItemIndex = state.trip.listItems.findIndex(
        (listItem) => listItem.listItemID === action.payload.listItemID
      );
      state.trip.listItems[likeListItemIndex].likes.push(
        action.payload.userHandle
      );
      return {
        ...state,
      };
    case UNLIKE_LIST_ITEM:
      let unlikeListItemIndex = state.trip.listItems.findIndex(
        (listItem) => listItem.listItemID === action.payload.listItemID
      );
      let unlikeLikeIndex = state.trip.listItems[
        unlikeListItemIndex
      ].likes.findIndex(
        (userHandle) => userHandle === action.payload.userHandle
      );
      state.trip.listItems[unlikeListItemIndex].likes.splice(
        unlikeLikeIndex,
        1
      );
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
