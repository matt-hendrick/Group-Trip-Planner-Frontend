import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

// MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import { Theme, makeStyles } from '@material-ui/core';

import MyButton from '../MyButton/MyButton';
import UserProfileSkeleton from './UserProfileSkeleton';

// Types
import { ReducerState } from '../../utility/sharedTypes';

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function UserProfile() {
  const classes = useStyles();

  const authenticated = useSelector(
    (state: ReducerState) => state.user.authenticated
  );
  const loading = useSelector((state: ReducerState) => state.trip.loading);
  const handle = useSelector(
    (state: ReducerState) => state.user.credentials.handle
  );
  const createdAt = useSelector(
    (state: ReducerState) => state.user.credentials.createdAt
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let profileDisplay = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <hr />
          <div className="profile-details">
            <Typography variant="h5" color="primary">
              {handle}
            </Typography>
            <hr />
            <CalendarToday color="primary" />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <MyButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <UserProfileSkeleton />
  );

  return profileDisplay;
}

export default UserProfile;
