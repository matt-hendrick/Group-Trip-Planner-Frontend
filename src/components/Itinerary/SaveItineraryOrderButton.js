import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

// Redux
import { editItineraryOrder } from '../../redux/actions/tripActions';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  ...theme.classes,
});

function SaveItineraryOrderButton(props) {
  const classes = useStyles();

  const loading = useSelector((state) => state.trip.loading);
  const dispatch = useDispatch();

  const { tripID, itineraryItems, changed } = props;

  const handleSubmit = () => {
    let itineraryItemDict = {};

    itineraryItems?.forEach((item, index) => {
      itineraryItemDict[index] = item;
    });
    dispatch(editItineraryOrder(tripID, itineraryItemDict));
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.centeredButton}
      disabled={!changed}
      onClick={handleSubmit}
    >
      Save Reordered Itinerary
      {loading && (
        <CircularProgress size={30} className={classes.progressSpinner} />
      )}
    </Button>
  );
}

SaveItineraryOrderButton.propTypes = {
  tripID: PropTypes.string.isRequired,
  itineraryBody: PropTypes.string.isRequired,
};

export default SaveItineraryOrderButton;
