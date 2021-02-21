import React from 'react';
import './App.css';
import axios from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Theme
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeObject from './utility/theme';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/reduxTypes';
import { logoutUser, getOwnUserDetails } from './redux/actions/userActions';

// Components
import Navbar from './components/Navbar/Navbar';
import AuthRoute from './components/AuthRoute/AuthRoute';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Trip from './pages/Trip/Trip';
import Demo from './pages/Demo/Demo';

// Utility Functions
import googleAnalytics from './utility/googleAnalytics';

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
  'https://us-central1-grouptripplannerbackend.cloudfunctions.net/api';

const token: string = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode<JwtPayload>(token);
  if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getOwnUserDetails());
  }
}

googleAnalytics();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              <Route exact path="/trips/:tripID" component={Trip} />
              <Route exact path="/demo" component={Demo} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
