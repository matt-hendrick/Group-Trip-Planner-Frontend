import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MyButton from '../MyButton/MyButton';
import LogoutButton from '../LogoutButton/LogoutButton';
// import CreatePost from '../Post/CreatePost';
// import Notifications from '../Notifications/Notifications';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
import HomeIcon from '@material-ui/icons/Home';

function Navbar(props) {
  const { authenticated } = props;
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            {/* <CreatePost /> */}
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <LogoutButton />

            {/* <Notifications /> */}

            {/* <Button color="inherit" component={Link} to="/posts">
              Posts
            </Button> */}
            {/* <Notifications /> */}
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
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

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
