import React from 'react';

// MUI
import Paper from '@material-ui/core/Paper';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { Theme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
}));

function TripProfileSkeleton() {
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
          <div className={classes.fullLine} />
          <hr />
          <CalendarToday color="primary" /> Created date
        </div>
      </div>
    </Paper>
  );
}

export default TripProfileSkeleton;
