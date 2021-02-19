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

export interface UserReducerState {
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
          members: object[];
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
}
