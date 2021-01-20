import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// MUI
import Paper from '@material-ui/core/Paper';

// Icons
import CalendarToday from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
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
