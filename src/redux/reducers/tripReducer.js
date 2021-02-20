import _ from 'lodash';
import {
  SET_TRIP,
  LOADING_DATA,
  CLEAR_LOADING_DATA,
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
} from '../reduxTypes';

export const initialState = {
  trip: {},
  loading: false,
};

const tripReducer = (state = initialState, action) => {
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
      const deleteListItemIndex = state.trip.listItems.findIndex(
        (listItem) => listItem.listItemID === action.payload
      );
      return {
        ...state,
        trip: {
          ...state.trip,
          listItems: state.trip.listItems.filter(
            (item, index) => index !== deleteListItemIndex
          ),
        },
      };
    case LIKE_LIST_ITEM:
      const likeListItemIndex = state.trip.listItems.findIndex(
        (listItem) => listItem.listItemID === action.payload.listItemID
      );
      const newListArrayForLike = _.cloneDeep(state.trip.listItems);
      newListArrayForLike[likeListItemIndex].likes.push(
        action.payload.userHandle
      );
      return {
        ...state,
        trip: {
          ...state.trip,
          listItems: newListArrayForLike,
        },
      };
    case UNLIKE_LIST_ITEM:
      const unlikeListItemIndex = state.trip.listItems.findIndex(
        (listItem) => listItem.listItemID === action.payload.listItemID
      );
      const unlikeLikeIndex = state.trip.listItems[
        unlikeListItemIndex
      ].likes.findIndex(
        (userHandle) => userHandle === action.payload.userHandle
      );
      const newListArrayForUnlike = _.cloneDeep(state.trip.listItems);
      newListArrayForUnlike[unlikeListItemIndex].likes.splice(
        unlikeLikeIndex,
        1
      );
      return {
        ...state,
        trip: {
          ...state.trip,
          listItems: newListArrayForUnlike,
        },
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

export default tripReducer;
