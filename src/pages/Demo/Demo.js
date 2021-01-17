import React from 'react';
import ReactPlayer from 'react-player/lazy';

function Demo() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ReactPlayer
        url="https://youtu.be/IYfwnjsngSc"
        controls={true}
        width="100%"
        height="80vh"
      />
    </div>
  );
}

export default Demo;
