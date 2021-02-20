import { Theme } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    classes: object;
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    classes?: object;
  }
}

export interface Error {
  email?: string;
  password?: string;
  confirmPassword?: string;
  handle?: string;
  general?: string;
  error?: string;
  tripName?: string;
  body?: string;
  invite?: string;
}

export interface Errors {
  errors: Error | '';
}

export interface User {
  authenticated: boolean;
  credentials: {
    email: string;
    userID: string;
    handle: string;
    createdAt: string;
  };
  trips:
    | null
    | {
        itineraryItems: object | null;
        createdBy: string;
        destination: null | number[];
        pendingInvites: string[] | [];
        mapZoomLevel: number;
        tripName: string;
        members: string[];
        tripID: string;
        createdAt: string;
      }[];
  invites:
    | null
    | {
        createdAt: string;
        tripName: string;
        recipient: string;
        sender: string;
        tripID: string;
        inviteID: string;
      }[];
}

export interface NestedTrip {
  itineraryItems: { createdAt: string; userHandle: string; body: string }[];
  createdBy: string;
  createdAt: string;
  destination: null | number[];
  pendingInvites: object[] | [];
  mapZoomLevel: number;
  tripName: string;
  members: string[];
  tripID: string;
  pins: {
    comment: string;
    address: string;
    createdAt: string;
    coordinates: number[];
    userHandle: string;
  }[];
  listItems: {
    listType: string;
    likes: {}[];
    body: string;
    createdAt: string;
    userHandle: string;
    listItemID: string;
  }[];
}

export interface Trip {
  loading: boolean;
  trip: NestedTrip;
}

export interface ReducerState {
  user: User;
  trip: Trip;
  errors: { errors: Error };
}

export interface ItineraryItem {
  createdAt: string;
  userHandle: string;
  body: string;
}

export interface ItineraryDictionary {
  [key: number]: ItineraryItem;
}

export interface MapBoxFeature {
  bbox: number[];
  center: number[];
  context: {
    id: string;
    short_code: string;
    text: string;
    wikidata: string;
  }[];
  geometry: { type: string; coordinates: number[] };
  id: string;
  place_name: string;
  place_type: string[];
  properties: { wikidata: string };
  relevance: number;
  text: string;
  type: string;
}
