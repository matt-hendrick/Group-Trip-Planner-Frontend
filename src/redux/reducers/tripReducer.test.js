import reducer, { initialState } from './tripReducer';
import * as types from '../types';

const mockState = {
  loading: false,
  trip: {
    members: ['johndoe', 'janedoe'],
    createdAt: '2021-01-09T00:03:22.311Z',
    createdBy: 'johndoe',
    mapZoomLevel: 11,
    tripName: 'DC Trip',
    pendingInvites: [],
    destination: [-77.0366, 38.895],
    tripID: 'T3D8VGkmXZHFv0fCeDen',
    pins: [
      {
        address:
          'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
        userHandle: 'johndoe',
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        coordinates: [-77.036556, 38.8977365],
        comment: null,
        createdAt: '2021-01-20T21:26:44.243Z',
        pinID: 'yaBxVUvoOHOougcvZceW',
      },
    ],
    listItems: [
      {
        listType: 'Lodging',
        location: null,
        createdAt: '2021-01-17T17:41:54.055Z',
        body: 'List Item example',
        date: null,
        userHandle: 'johndoe',
        likes: ['johndoe', 'janedoe'],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        price: null,
        link: null,
        listItemID: 'AG4xIQg4g6x9h5x2QNOu',
      },
    ],
    itineraryItems: {
      0: {
        body: '10 am hike',
        createdAt: '2021-01-17T17:56:44.726Z',
        userHandle: 'janedoe',
      },
      1: {
        body: 'Friday the 4th, Dinner in Belfast',
        userHandle: 'janedoe',
        createdAt: '2021-01-20T00:36:07.237Z',
      },
      2: {
        userHandle: 'janedoe',
        createdAt: '2021-01-20T00:36:28.166Z',
        body: 'New item',
      },
    },
  },
};

describe('tripReducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      trip: {},
      loading: false,
    });
  });

  it('should handle LOADING_DATA', () => {
    expect(
      reducer(initialState, {
        type: types.LOADING_DATA,
        loading: true,
        ...initialState,
      })
    ).toEqual({
      trip: {},
      loading: true,
    });
  });

  it('should handle CLEAR_LOADING_DATA', () => {
    expect(
      reducer(initialState, {
        type: types.CLEAR_LOADING_DATA,
        loading: false,
        ...initialState,
      })
    ).toEqual({
      trip: {},
      loading: false,
    });
  });

  it('should handle SET_TRIP', () => {
    const payload = mockState.trip;
    expect(
      reducer(initialState, {
        type: types.SET_TRIP,
        ...initialState,
        payload,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'DC Trip',
        pendingInvites: [],
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle EDIT_TRIP_NAME', () => {
    const payload = 'New Trip Name';
    expect(
      reducer(mockState, {
        type: types.EDIT_TRIP_NAME,
        ...mockState,
        payload,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'New Trip Name',
        pendingInvites: [],
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle SET_COORDINATES', () => {
    const payload = [-1, 3];
    expect(
      reducer(mockState, {
        type: types.SET_COORDINATES,
        ...mockState,
        payload,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'DC Trip',
        pendingInvites: [],
        destination: [-1, 3],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle SET_MAP_ZOOM_LEVEL', () => {
    const payload = 5;
    expect(
      reducer(mockState, {
        type: types.SET_MAP_ZOOM_LEVEL,
        ...mockState,
        payload,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 5,
        tripName: 'DC Trip',
        pendingInvites: [],
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle CREATE_PIN', () => {
    const payload = {
      address: 'Pin address',
      userHandle: 'johndoe',
      tripID: 'T3D8VGkmXZHFv0fCeDen',
      coordinates: [-77.036556, 38.8977365],
      comment: null,
      createdAt: '2021-01-20T21:26:44.243Z',
      pinID: '23123',
    };
    expect(
      reducer(mockState, {
        type: types.CREATE_PIN,
        ...mockState,
        payload,
        ...mockState.trip.pins,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'DC Trip',
        pendingInvites: [],
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address: 'Pin address',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: '23123',
          },
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle EDIT_ITINERARY_ORDER', () => {
    const payload = {
      2: {
        body: '10 am hike',
        createdAt: '2021-01-17T17:56:44.726Z',
        userHandle: 'janedoe',
      },
      1: {
        body: 'Friday the 4th, Dinner in Belfast',
        userHandle: 'janedoe',
        createdAt: '2021-01-20T00:36:07.237Z',
      },
      0: {
        userHandle: 'janedoe',
        createdAt: '2021-01-20T00:36:28.166Z',
        body: 'New item',
      },
    };
    expect(
      reducer(mockState, {
        type: types.EDIT_ITINERARY_ORDER,
        ...mockState,
        payload,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'DC Trip',
        pendingInvites: [],
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        itineraryItems: {
          2: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          0: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle CREATE_LIST_ITEM', () => {
    const payload = {
      listType: 'Other',
      location: null,
      createdAt: '2021-01-17T17:41:54.055Z',
      body: 'New list Item example',
      date: null,
      userHandle: 'johndoe',
      likes: ['johndoe', 'janedoe'],
      tripID: 'T3D8VGkmXZHFv0fCeDen',
      price: null,
      link: null,
      listItemID: 'AG4xIQg4g6x9h5x2QNOu',
    };
    expect(
      reducer(mockState, {
        type: types.CREATE_LIST_ITEM,
        ...mockState,
        payload,
        ...mockState.trip.listItems,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'DC Trip',
        pendingInvites: [],
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [
          {
            listType: 'Other',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'New list Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle DELETE_LIST_ITEM', () => {
    const payload = 'AG4xIQg4g6x9h5x2QNOu';
    expect(
      reducer(mockState, {
        type: types.DELETE_LIST_ITEM,
        ...mockState,
        payload,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'DC Trip',
        pendingInvites: [],
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle LIKE_LIST_ITEM', () => {
    const payload = {
      listItemID: 'AG4xIQg4g6x9h5x2QNOu',
      userHandle: 'jimdoe',
    };
    expect(
      reducer(mockState, {
        type: types.LIKE_LIST_ITEM,
        ...mockState,
        payload,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'DC Trip',
        pendingInvites: [],
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe', 'jimdoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle UNLIKE_LIST_ITEM', () => {
    const payload = {
      listItemID: 'AG4xIQg4g6x9h5x2QNOu',
      userHandle: 'janedoe',
    };
    expect(
      reducer(mockState, {
        type: types.UNLIKE_LIST_ITEM,
        ...mockState,
        payload,
      })
    ).toEqual({
      loading: false,
      trip: {
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'DC Trip',
        pendingInvites: [],
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        listItems: [
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });

  it('should handle INVITE_USER', () => {
    const payload = 'jimdoe';
    expect(
      reducer(mockState, {
        type: types.INVITE_USER,
        ...mockState,
        payload,
        ...mockState.trip.pendingInvites,
      })
    ).toEqual({
      loading: false,
      trip: {
        pendingInvites: ['jimdoe'],
        members: ['johndoe', 'janedoe'],
        createdAt: '2021-01-09T00:03:22.311Z',
        createdBy: 'johndoe',
        mapZoomLevel: 11,
        tripName: 'DC Trip',
        destination: [-77.0366, 38.895],
        tripID: 'T3D8VGkmXZHFv0fCeDen',
        listItems: [
          {
            listType: 'Lodging',
            location: null,
            createdAt: '2021-01-17T17:41:54.055Z',
            body: 'List Item example',
            date: null,
            userHandle: 'johndoe',
            likes: ['johndoe', 'janedoe'],
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            price: null,
            link: null,
            listItemID: 'AG4xIQg4g6x9h5x2QNOu',
          },
        ],
        pins: [
          {
            address:
              'The White House, 1600 Pennsylvania Ave NW, Washington, District of Columbia 20006, United States',
            userHandle: 'johndoe',
            tripID: 'T3D8VGkmXZHFv0fCeDen',
            coordinates: [-77.036556, 38.8977365],
            comment: null,
            createdAt: '2021-01-20T21:26:44.243Z',
            pinID: 'yaBxVUvoOHOougcvZceW',
          },
        ],
        itineraryItems: {
          0: {
            body: '10 am hike',
            createdAt: '2021-01-17T17:56:44.726Z',
            userHandle: 'janedoe',
          },
          1: {
            body: 'Friday the 4th, Dinner in Belfast',
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:07.237Z',
          },
          2: {
            userHandle: 'janedoe',
            createdAt: '2021-01-20T00:36:28.166Z',
            body: 'New item',
          },
        },
      },
    });
  });
});
