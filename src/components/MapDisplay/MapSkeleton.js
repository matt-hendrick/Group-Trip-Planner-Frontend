import React from 'react';
import NoImgMap from '../../images/no-img-map.png';
import { makeStyles } from '@material-ui/core/styles';
// MUI
import Paper from '@material-ui/core/Paper';
// Icons

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function MapSkeleton() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImgMap} alt="profile" className="profile-image" />
        </div>
      </div>
    </Paper>
  );
}

export default MapSkeleton;
