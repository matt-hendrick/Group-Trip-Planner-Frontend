import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

//Redux
import { useSelector } from 'react-redux';

// MUI stuff
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Icons
import CalendarToday from '@material-ui/icons/CalendarToday';

import TripProfileSkeleton from './TripProfileSkeleton';
import InviteUserButton from '../Invites/InviteUserButton';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function TripProfile() {
  const classes = useStyles();

  const loading = useSelector((state) => state.user.loading);
  const createdAt = useSelector((state) => state.data.trip.createdAt);
  const members = useSelector((state) => state.data.trip.members);
  const pendingInvites = useSelector((state) => state.data.trip.pendingInvites);
  const tripID = useSelector((state) => state.data.trip.tripID);

  let profileDisplay =
    !loading && createdAt ? (
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
    ) : (
      <TripProfileSkeleton />
    );

  return profileDisplay;
}

export default TripProfile;
