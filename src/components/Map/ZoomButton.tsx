import React from 'react';

// React
import { useSelector, useDispatch } from 'react-redux';
import { setTripMapZoomLevel } from '../../redux/actions/tripActions';

// MUI Icons
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import MyButton from '../MyButton/MyButton';

// Types
import { ReducerState } from '../../utility/sharedTypes';

interface Props {
  tripID: string;
  zoomType: string;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function ZoomButton(props: Props) {
  const classes = useStyles();

  const { tripID, zoomType } = props;

  let mapZoomLevel = useSelector(
    (state: ReducerState) => state.trip.trip.mapZoomLevel
  );
  const dispatch = useDispatch();

  const handleZoom = () => {
    if (zoomType === 'plus' && mapZoomLevel < 19) {
      const updatedMapZoomLevel = (mapZoomLevel += 1);
      dispatch(setTripMapZoomLevel(tripID, updatedMapZoomLevel));
    } else if (zoomType === 'minus' && mapZoomLevel > 1) {
      const updatedMapZoomLevel = (mapZoomLevel -= 1);
      dispatch(setTripMapZoomLevel(tripID, updatedMapZoomLevel));
    }
  };

  return (
    <MyButton
      tip={zoomType === 'plus' ? 'Zoom In' : 'Zoom Out'}
      onClick={handleZoom}
      color={zoomType === 'plus' ? 'primary' : 'secondary'}
      tipClassName={classes.noPaddingButton}
    >
      {zoomType === 'plus' ? <ZoomInIcon /> : <ZoomOutIcon />}
    </MyButton>
  );
}

export default ZoomButton;
