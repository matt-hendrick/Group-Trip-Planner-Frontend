import React from 'react';

// React Player
import ReactPlayer from 'react-player/lazy';

//MUI
import { Theme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
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
