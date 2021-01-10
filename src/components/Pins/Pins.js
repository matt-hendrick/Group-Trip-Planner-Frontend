import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';

import { Marker } from 'react-map-gl';

// MUI
import RoomIcon from '@material-ui/icons/Room';

import MyButton from '../MyButton/MyButton';

// import DeletePin from './DeletePin';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function Pins(props) {
  const classes = useStyles();

  const { pins } = props;

  let pinsDisplay = pins
    ? pins.map((pin, index) => {
        const { body, createdAt, location, userHandle } = pin;
        return (
          <Marker
            anchor="bottom"
            latitude={location[1]}
            longitude={location[0]}
            key={createdAt}
          >
            <MyButton tip={body}>
              <RoomIcon color="primary" />
            </MyButton>
          </Marker>
        );
      })
    : null;
  return pinsDisplay;
}

Pins.propTypes = {
  pins: PropTypes.array,
};

export default Pins;
