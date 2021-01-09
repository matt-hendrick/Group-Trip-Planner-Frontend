import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function Map() {
  const [viewport, setViewport] = useState({
    width: '70vw',
    height: '70vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      //   mapboxApiAccessToken={mapboxApiAccessToken}
      mapStyle="mapbox://styles/grouptripplanner/ckjoy8uip00x819mq8afczf6z"
    />
  );
}

export default Map;
