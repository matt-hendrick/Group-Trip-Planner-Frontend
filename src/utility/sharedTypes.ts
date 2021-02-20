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

export interface ReducerState {
  user: {
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
          pendingInvites: object[] | [];
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
  };
  trip: {
    loading: boolean;
    trip: {
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
    };
  };
  errors: {
    errors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      handle?: string;
      general?: string;
      error?: string;
      tripName?: string;
      body?: string;
    };
  };
}

export interface ItineraryItem {
  createdAt: string;
  userHandle: string;
  body: string;
}

export interface ItineraryDictionary {
  [key: number]: ItineraryItem;
}
