import {
  SET_TRIPS,
  SET_TRIP,
  LOADING_UI,
  STOP_LOADING_UI,
  CREATE_TRIP,
  DELETE_TRIP,
  EDIT_TRIP_NAME,
  CREATE_COMMENT,
  DELETE_COMMENT,
  CREATE_PIN,
  CREATE_ITINERARY_ITEM,
  DELETE_ITINERARY_ITEM,
  EDIT_ITINERARY_ITEM,
  CREATE_LIST_ITEM,
  DELETE_LIST_ITEM,
  INVITE_USER,
  SET_COORDINATES,
  SET_MAP_ZOOM_LEVEL,
  SET_ERRORS,
  CLEAR_ERRORS,
} from '../types';
import axios from 'axios';

export const getTrips = (tripID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/trips/${tripID}`)
    .then((res) => {
      dispatch({ type: SET_TRIPS, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTrip = (tripID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/trips/${tripID}`)
    .then((res) => {
      dispatch({ type: SET_TRIP, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createTrip = (newTrip) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trips`, newTrip)
    .then((res) => {
      dispatch({ type: CREATE_TRIP, payload: res.data });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const deleteTrip = (tripID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/trips/${tripID}`)
    .then(() => {
      dispatch({ type: DELETE_TRIP, payload: tripID });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const editTripName = (tripID, tripName) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trips/${tripID}`, tripName)
    .then((res) => {
      dispatch({ type: EDIT_TRIP_NAME, payload: tripName.tripName });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const setTripCoordinates = (tripID, coordinates) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trips/${tripID}`, { destination: coordinates })
    .then((res) => {
      dispatch({ type: SET_COORDINATES, payload: coordinates });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
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
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const createComment = (tripID, newComment) => (dispatch) => {
  axios
    .post(`/trips/${tripID}/comment`, newComment)
    .then((res) => {
      dispatch({ type: CREATE_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const deleteComment = (tripID, commentID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/trips/${tripID}/comments/${commentID}`)
    .then(() => {
      dispatch({ type: DELETE_COMMENT, payload: commentID });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const createPin = (tripID, newPin) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trips/${tripID}/pin`, newPin)
    .then((res) => {
      dispatch({ type: CREATE_PIN, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
      dispatch(clearErrors());
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const createItineraryItem = (tripID, newItineraryItem) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trips/${tripID}/itineraryitem`, newItineraryItem)
    .then((res) => {
      dispatch({ type: CREATE_ITINERARY_ITEM, payload: res.data });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const deleteItineraryItem = (tripID, itineraryItemID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/trips/${tripID}/itineraryitems/${itineraryItemID}`)
    .then(() => {
      dispatch({ type: DELETE_ITINERARY_ITEM, payload: itineraryItemID });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const editItineraryItem = (
  tripID,
  itineraryItemID,
  newItineraryItem
) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const editItemInfo = { newItineraryItem, itineraryItemID };
  axios
    .post(
      `/trips/${tripID}/itineraryitems/${itineraryItemID}`,
      newItineraryItem
    )
    .then((res) => {
      dispatch({ type: EDIT_ITINERARY_ITEM, payload: editItemInfo });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const createListItem = (tripID, newListItem) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trips/${tripID}/listitem`, newListItem)
    .then((res) => {
      dispatch({ type: CREATE_LIST_ITEM, payload: res.data });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const deleteListItem = (tripID, listItemID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/trips/${tripID}/listitems/${listItemID}`)
    .then(() => {
      dispatch({ type: DELETE_LIST_ITEM, payload: listItemID });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const inviteUser = (tripID, recipient) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trips/${tripID}/invite`, recipient)
    .then((res) => {
      dispatch({ type: INVITE_USER, payload: recipient.recipient });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const setErrors = () => (dispatch) => {
  dispatch({ type: SET_ERRORS });
};
