import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function Demo() {
  const classes = useStyles();

  return (
    <div className={classes.demoDiv}>
      <ReactPlayer
        url="https://youtu.be/IYfwnjsngSc"
        controls={true}
        width="100%"
        height="80vh"
        role="main"
      />
    </div>
  );
}

export default Demo;
