import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

// Redux
import { useSelector } from 'react-redux';

function Map() {
  const coordinates = useSelector((state) => state.data.coordinates);

  const [viewport, setViewport] = useState({
    zoom: 8,
  });

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: coordinates[1],
      longitude: coordinates[0],
    });
  }, [coordinates]);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API}
      mapStyle="mapbox://styles/grouptripplanner/ckjr7jtco28rp19s80zg4xsd9"
      height="100%"
      width="100%"
    />
  );
}

export default Map;
