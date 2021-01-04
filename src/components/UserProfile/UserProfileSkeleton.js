import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// MUI
import Paper from '@material-ui/core/Paper';
// Icons
import CalendarToday from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto',
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10,
  },
}));

function UserProfileSkeleton() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <hr />
          <CalendarToday color="primary" /> Joined date
        </div>
      </div>
    </Paper>
  );
}

export default UserProfileSkeleton;
