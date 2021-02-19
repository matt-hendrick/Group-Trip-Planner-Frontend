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
        }[]
      | [];
    invites:
      | null
      | {
          createdAt: string;
          tripName: string;
          recipient: string;
          sender: string;
          tripID: string;
          inviteID: string;
        }[]
      | [];
  };
  trip: {
    loading: boolean;
    trip: {
      itineraryItems: object | null;
      createdBy: string;
      destination: null | number[];
      pendingInvites: object[] | [];
      mapZoomLevel: number;
      tripName: string;
      members: string[];
      tripID: string;
      pins: object[];
      listItems: object[];
    };
  };
  errors: {
    errors: {
      email?: string;
      password?: string;
      general?: string;
      error?: string;
    };
  };
}
