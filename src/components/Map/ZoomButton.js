import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// React
import { useSelector, useDispatch } from 'react-redux';
import { setTripMapZoomLevel } from '../../redux/actions/dataActions';

// MUI Icons
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

import MyButton from '../MyButton/MyButton';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function ZoomButton(props) {
  const classes = useStyles();

  const { tripID, zoomType } = props;

  let mapZoomLevel = useSelector((state) => state.data.trip.mapZoomLevel);
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

ZoomButton.propTypes = {
  zoomType: PropTypes.string.isRequired,
};

export default ZoomButton;
