import React, { useState, useEffect, useMemo } from 'react';
import ReactMapGL from 'react-map-gl';

// Redux
import { useSelector } from 'react-redux';

// Components
import Pins from '../Pins/Pins';

// Types
import { ReducerState } from '../../utility/sharedTypes';

function Map() {
  const destination = useSelector(
    (state: ReducerState) => state.trip.trip.destination
  );
  const mapZoomLevel = useSelector(
    (state: ReducerState) => state.trip.trip.mapZoomLevel
  );
  const pins = useSelector((state: ReducerState) => state.trip.trip.pins);

  const [viewport, setViewport] = useState({});

  useEffect(() => {
    if (destination) {
      if (mapZoomLevel) {
        setViewport((viewport) => ({
          ...viewport,
          latitude: destination[1],
          longitude: destination[0],
          zoom: mapZoomLevel,
        }));
      } else {
        setViewport((viewport) => ({
          ...viewport,
          latitude: destination[1],
          longitude: destination[0],
          zoom: 9,
        }));
      }
    } else {
      if (mapZoomLevel) {
        setViewport((viewport) => ({
          ...viewport,
          latitude: 40.7648,
          longitude: -73.9808,
          zoom: mapZoomLevel,
        }));
      } else {
        setViewport((viewport) => ({
          ...viewport,
          latitude: 40.7648,
          longitude: -73.9808,
          zoom: 9,
        }));
      }
    }
  }, [destination, mapZoomLevel]);

  const pinsDisplay = useMemo(() => {
    return <Pins pins={pins} />;
  }, [pins]);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API}
      mapStyle="mapbox://styles/grouptripplanner/ckjr7jtco28rp19s80zg4xsd9"
      height="100%"
      width="100%"
    >
      {pinsDisplay}
    </ReactMapGL>
  );
}

export default Map;
