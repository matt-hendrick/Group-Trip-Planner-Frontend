import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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
        const { comment, address, createdAt, coordinates, userHandle } = pin;
        const toolTip = comment
          ? `"${comment}" at ${address} by ${userHandle} - ${dayjs(
              createdAt
            ).fromNow()}`
          : `${address} by ${userHandle} - ${dayjs(createdAt).fromNow()}`;
        return (
          <Marker
            anchor="bottom"
            latitude={coordinates[1]}
            longitude={coordinates[0]}
            key={createdAt}
          >
            <MyButton tip={toolTip} tipClassName={classes.marker}>
              <RoomIcon color="primary" style={{ fontSize: 30 }} />
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