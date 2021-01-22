import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Marker } from 'react-map-gl';

// Redux
import { useSelector } from 'react-redux';

// MUI
import RoomIcon from '@material-ui/icons/Room';

import MyButton from '../MyButton/MyButton';
import colorAssignment from '../../utility/colorAssignment';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function Pins(props) {
  const classes = useStyles();

  const { pins } = props;

  const loggedInUserHandle = useSelector(
    (state) => state.user.credentials.handle
  );
  const members = useSelector((state) => state.data.trip.members);

  let pinsDisplay =
    pins && loggedInUserHandle
      ? pins.map((pin, index) => {
          const { comment, address, createdAt, coordinates, userHandle } = pin;
          const toolTip = comment
            ? `"${comment}" at ${address} by ${userHandle} - ${dayjs(
                createdAt
              ).fromNow()}`
            : `${address} by ${userHandle} - ${dayjs(createdAt).fromNow()}`;
          const userColor = colorAssignment(
            loggedInUserHandle,
            members,
            userHandle
          );
          return (
            <Marker
              anchor="bottom"
              latitude={coordinates[1]}
              longitude={coordinates[0]}
              key={createdAt}
            >
              <MyButton tip={toolTip} tipClassName={classes.pins}>
                {userColor === 'primary' || userColor === 'secondary' ? (
                  <RoomIcon color={userColor} style={{ fontSize: 30 }} />
                ) : (
                  <RoomIcon
                    style={{
                      color: userColor,
                      fontSize: 30,
                    }}
                  />
                )}
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
