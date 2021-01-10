import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

// Redux
import { useSelector } from 'react-redux';

function Map() {
  const destination = useSelector((state) => state.data.trip.destination);
  const mapZoomLevel = useSelector((state) => state.data.trip.mapZoomLevel);

  const [viewport, setViewport] = useState({});

  console.log(typeof mapZoomLevel);

  useEffect(() => {
    if (destination) {
      if (mapZoomLevel) {
        setViewport({
          ...viewport,
          latitude: destination[1],
          longitude: destination[0],
          zoom: mapZoomLevel,
        });
      } else {
        setViewport({
          ...viewport,
          latitude: destination[1],
          longitude: destination[0],
          zoom: 9,
        });
      }
    } else if (!destination) {
      if (mapZoomLevel) {
        setViewport({
          ...viewport,
          latitude: 40.7648,
          longitude: -73.9808,
          zoom: mapZoomLevel,
        });
      } else {
        setViewport({
          ...viewport,
          latitude: 40.7648,
          longitude: -73.9808,
          zoom: 9,
        });
      }
    }
  }, [destination, mapZoomLevel]);

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
