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
import { setErrors, clearErrors } from './errorsActions';
import axios from 'axios';

export const getTrip = (tripID) => (dispatch) => {
  dispatch(loadingData());
  axios
    .get(`/trips/${tripID}`)
    .then((res) => {
      dispatch({ type: SET_TRIP, payload: res.data });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const createTrip = (newTrip) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post(`/trips`, newTrip)
    .then((res) => {
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err.response.data)));
};

export const deleteTrip = (tripID) => (dispatch) => {
  dispatch(loadingData());
  axios
    .delete(`/trips/${tripID}`)
    .then(() => {
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err.response.data)));
};

export const editTripName = (tripID, tripName) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}`, tripName)
    .then((res) => {
      dispatch({ type: EDIT_TRIP_NAME, payload: tripName.tripName });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err.response.data)));
};

export const setTripCoordinates = (tripID, coordinates) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}`, { destination: coordinates })
    .then((res) => {
      dispatch({ type: SET_COORDINATES, payload: coordinates });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const setTripMapZoomLevel = (tripID, mapZoomLevel) => (dispatch) => {
  axios
    .post(`/trips/${tripID}`, { mapZoomLevel })
    .then((res) => {
      dispatch({ type: SET_MAP_ZOOM_LEVEL, payload: mapZoomLevel });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const editItineraryOrder = (tripID, itineraryItems) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}`, { itineraryItems })
    .then((res) => {
      dispatch({ type: EDIT_ITINERARY_ORDER, payload: itineraryItems });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err.response.data)));
};

export const createPin = (tripID, newPin) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/pin`, newPin)
    .then((res) => {
      dispatch({ type: CREATE_PIN, payload: res.data });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err.response.data)));
};

export const createListItem = (tripID, newListItem) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/listitem`, newListItem)
    .then((res) => {
      dispatch({ type: CREATE_LIST_ITEM, payload: res.data });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => dispatch(setErrors(err.response.data)));
};

export const deleteListItem = (tripID, listItemID) => (dispatch) => {
  dispatch(loadingData());
  axios
    .delete(`/trips/${tripID}/listitems/${listItemID}`)
    .then(() => {
      dispatch({ type: DELETE_LIST_ITEM, payload: listItemID });
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const likeListItem = (tripID, listItemID, userHandle) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/listitems/${listItemID}/like`)
    .then((res) => {
      dispatch({ type: LIKE_LIST_ITEM, payload: { listItemID, userHandle } });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const unlikeListItem = (tripID, listItemID, userHandle) => (
  dispatch
) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/listitems/${listItemID}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_LIST_ITEM, payload: { listItemID, userHandle } });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const inviteUser = (tripID, recipient) => (dispatch) => {
  dispatch(loadingData());
  axios
    .post(`/trips/${tripID}/invite`, recipient)
    .then((res) => {
      dispatch({ type: INVITE_USER, payload: recipient.recipient });
      dispatch(clearErrors());
      dispatch(clearLoadingData());
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const loadingData = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
};

export const clearLoadingData = () => (dispatch) => {
  dispatch({ type: CLEAR_LOADING_DATA });
};
