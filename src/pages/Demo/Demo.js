import React from 'react';
import ReactPlayer from 'react-player/lazy';

import Video from '../../videos/tripplannerdemo.mp4';

function Demo() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ReactPlayer url={Video} controls={true} />
    </div>
  );
}

export default Demo;
