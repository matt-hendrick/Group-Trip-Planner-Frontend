import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// React-Leaflet
import { MapContainer, TileLayer } from 'react-leaflet';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function MapDisplay(props) {
  const classes = useStyles();
  let leafletDisplay = null;
  let coordinates = ['38.9072', '-77.0369'];
  const { destination } = props;

  if (!destination) {
    leafletDisplay = (
      <MapContainer
        key={coordinates}
        className={classes.map}
        center={coordinates}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }
  if (destination) {
    leafletDisplay = (
      <MapContainer
        key={destination}
        className={classes.map}
        center={[destination._latitude, destination._longitude]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }

  return <Fragment>{leafletDisplay}</Fragment>;
}

MapDisplay.propTypes = {
  destination: PropTypes.object,
};

export default MapDisplay;
