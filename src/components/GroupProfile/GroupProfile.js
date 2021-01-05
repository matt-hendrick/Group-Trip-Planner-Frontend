import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import GroupProfileSkeleton from './GroupProfileSkeleton';
// MUI stuff
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// Icons
import CalendarToday from '@material-ui/icons/CalendarToday';
//Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function UserProfile() {
  const classes = useStyles();

  const loading = useSelector((state) => state.user.loading);
  const createdAt = useSelector((state) => state.data.group.createdAt);
  const members = useSelector((state) => state.data.group.members);
  const pendingInvites = useSelector(
    (state) => state.data.group.pendingInvites
  );

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
            <CalendarToday color="primary" />{' '}
            <span>Created on {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
        </div>
      </Paper>
    ) : (
      <GroupProfileSkeleton />
    );

  return profileDisplay;
}

export default UserProfile;
