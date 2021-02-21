import axios from 'axios';

// Redux Types
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

// Redux Actions
import { setErrors, clearErrors } from './errorsActions';

// Types
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Trip, ItineraryDictionary } from '../../utility/sharedTypes';

interface NewTrip {
  tripName: string;
}

interface NewPin {
  comment: string;
  coordinates: number[];
  address: string;
}

interface NewListItem {
  body: string;
  listType: string;
}

export const getTrip = (tripID: string) => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch(loadingData());
  axios
    .get(`/trips/${tripID}`)
    .then((res) => {
      dispatch({ type: SET_TRIP, payload: res.data });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err?.response?.data));
    });
};

export const createTrip = (newTrip: NewTrip) => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch(loadingData());
  axios
    .post(`/trips`, newTrip)
    .then((res) => {
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err?.response?.data)));
};

export const deleteTrip = (tripID: string) => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch(loadingData());
  axios
    .delete(`/trips/${tripID}`)
    .then(() => {
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err?.response?.data)));
};

export const editTripName = (tripID: string, tripName: string) => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}`, tripName)
    .then((res) => {
      dispatch({ type: EDIT_TRIP_NAME, payload: tripName });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err?.response?.data)));
};

export const setTripCoordinates = (tripID: string, coordinates: number[]) => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}`, { destination: coordinates })
    .then((res) => {
      dispatch({ type: SET_COORDINATES, payload: coordinates });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err?.response?.data));
    });
};

export const setTripMapZoomLevel = (tripID: string, mapZoomLevel: number) => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  axios
    .post(`/trips/${tripID}`, { mapZoomLevel })
    .then((res) => {
      dispatch({ type: SET_MAP_ZOOM_LEVEL, payload: mapZoomLevel });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(setErrors(err?.response?.data));
    });
};

export const editItineraryOrder = (
  tripID: string,
  itineraryItems: ItineraryDictionary
) => (dispatch: ThunkDispatch<Trip, void, Action>) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}`, { itineraryItems })
    .then((res) => {
      dispatch({ type: EDIT_ITINERARY_ORDER, payload: itineraryItems });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err?.response?.data)));
};

export const createPin = (tripID: string, newPin: NewPin) => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/pin`, newPin)
    .then((res) => {
      dispatch({ type: CREATE_PIN, payload: res.data });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err?.response?.data)));
};

export const createListItem = (tripID: string, newListItem: NewListItem) => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/listitem`, newListItem)
    .then((res) => {
      dispatch({ type: CREATE_LIST_ITEM, payload: res.data });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err?.response?.data)));
};

export const deleteListItem = (tripID: string, listItemID: string) => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch(loadingData());
  axios
    .delete(`/trips/${tripID}/listitems/${listItemID}`)
    .then(() => {
      dispatch({ type: DELETE_LIST_ITEM, payload: listItemID });
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err?.response?.data));
    });
};

export const likeListItem = (
  tripID: string,
  listItemID: string,
  userHandle: string
) => (dispatch: ThunkDispatch<Trip, void, Action>) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/listitems/${listItemID}/like`)
    .then((res) => {
      dispatch({ type: LIKE_LIST_ITEM, payload: { listItemID, userHandle } });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err?.response?.data));
    });
};

export const unlikeListItem = (
  tripID: string,
  listItemID: string,
  userHandle: string
) => (dispatch: ThunkDispatch<Trip, void, Action>) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/listitems/${listItemID}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_LIST_ITEM, payload: { listItemID, userHandle } });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err?.response?.data));
    });
};

export const inviteUser = (
  tripID: string,
  recipient: { recipient: string }
) => (dispatch: ThunkDispatch<Trip, void, Action>) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/invite`, recipient)
    .then((res) => {
      dispatch({ type: INVITE_USER, payload: recipient.recipient });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err?.response?.data));
    });
};

export const loadingData = () => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch({ type: LOADING_DATA });
};

export const clearLoadingData = () => (
  dispatch: ThunkDispatch<Trip, void, Action>
) => {
  dispatch({ type: CLEAR_LOADING_DATA });
};
