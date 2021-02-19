import React from 'react';
import dayjs from 'dayjs';

//Redux
import { useSelector } from 'react-redux';

// MUI
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import TripProfileSkeleton from './TripProfileSkeleton';
import InviteUserButton from '../Invites/InviteUserButton';

// Types
import { ReducerState } from '../../utility/sharedTypes';

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function TripProfile() {
  const classes = useStyles();

  const createdAt = useSelector(
    (state: ReducerState) => state.trip.trip.createdAt
  );
  const members = useSelector((state: ReducerState) => state.trip.trip.members);
  const pendingInvites = useSelector(
    (state: ReducerState) => state.trip.trip.pendingInvites
  );
  const tripID = useSelector((state: ReducerState) => state.trip.trip.tripID);

  let profileDisplay =
    !createdAt && !members ? (
      <TripProfileSkeleton />
    ) : (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <hr />
          <div className="profile-details">
            {members ? (
              <Typography variant="body1">
                Members: {members.join(', ')}
              </Typography>
            ) : null}
            <hr />
            {pendingInvites ? (
              <Typography variant="body1">
                Invited Users: {pendingInvites.join(', ')}
              </Typography>
            ) : null}
            <hr />
            <CalendarToday color="primary" />
            <span>Created on {dayjs(createdAt).format('MMM DD YYYY')}</span>
          </div>
          <hr />
          <InviteUserButton tripID={tripID} />
        </div>
      </Paper>
    );

  return profileDisplay;
}

export default TripProfile;
