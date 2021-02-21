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

// Types
import {
  Trip,
  NestedTrip,
  ItineraryDictionary,
  Pin,
  ListItem,
} from '../../utility/sharedTypes';

interface Action {
  type: string;
  payload?: any;
}

export const initialState: Trip = {
  trip: {} as NestedTrip,
  loading: false,
};

const tripReducer = (state = initialState, action: Action) => {
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
          pins: [action.payload as Pin, ...state.trip.pins],
        },
      };
    case EDIT_ITINERARY_ORDER:
      return {
        ...state,
        trip: {
          ...state.trip,
          itineraryItems: action.payload as ItineraryDictionary,
        },
      };
    case CREATE_LIST_ITEM:
      return {
        ...state,
        trip: {
          ...state.trip,
          listItems: [action.payload as ListItem, ...state.trip.listItems],
        },
      };
    case DELETE_LIST_ITEM:
      const deleteListItemIndex = state.trip.listItems.findIndex(
        (listItem) => listItem.listItemID === (action.payload as string)
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
        (listItem) =>
          listItem.listItemID === (action.payload.listItemID as string)
      );
      const newListArrayForLike = _.cloneDeep(state.trip.listItems);
      newListArrayForLike[likeListItemIndex].likes.push(
        action.payload.userHandle as string
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
        (listItem) =>
          listItem.listItemID === (action.payload.listItemID as string)
      );
      const unlikeLikeIndex = state.trip.listItems[
        unlikeListItemIndex
      ].likes.findIndex(
        (userHandle) => userHandle === (action.payload.userHandle as string)
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
          pendingInvites: [
            action.payload as string,
            ...state.trip.pendingInvites,
          ],
        },
      };
    default:
      return state;
  }
};

export default tripReducer;
