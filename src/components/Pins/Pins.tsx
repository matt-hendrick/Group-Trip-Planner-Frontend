import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Marker } from 'react-map-gl';

// Redux
import { useSelector } from 'react-redux';

// MUI
import RoomIcon from '@material-ui/icons/Room';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import MyButton from '../MyButton/MyButton';

// Utility Functions
import colorAssignment from '../../utility/colorAssignment';

// Types
import { ReducerState, Pin } from '../../utility/sharedTypes';

interface Props {
  pins: Pin[];
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

const Pins = (props: Props) => {
  const classes = useStyles();

  const { pins } = props;

  const loggedInUserHandle = useSelector(
    (state: ReducerState) => state.user.credentials.handle
  );
  const members = useSelector((state: ReducerState) => state.trip.trip.members);

  dayjs.extend(relativeTime);

  let pinsDisplay =
    pins && loggedInUserHandle
      ? pins.map((pin) => {
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
  return <React.Fragment>{pinsDisplay}</React.Fragment>;
};

export default Pins;
