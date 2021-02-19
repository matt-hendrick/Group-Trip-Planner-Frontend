import React, { Fragment } from 'react';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

// Components
import MyButton from '../MyButton/MyButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import Invites from '../Invites/Invites';

// Types
import { ReducerState } from '../../utility/sharedTypes';

function Navbar() {
  const authenticated = useSelector(
    (state: ReducerState) => state.user.authenticated
  );
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Invites />
            <LogoutButton />
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
