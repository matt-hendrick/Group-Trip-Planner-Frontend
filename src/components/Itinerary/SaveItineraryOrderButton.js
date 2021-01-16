import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

// Redux
import { editItineraryOrder } from '../../redux/actions/dataActions';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  ...theme.classes,
});

function SaveItineraryOrderButton(props) {
  const classes = useStyles();

  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  const { tripID, itineraryItems } = props;

  const handleSubmit = () => {
    let itineraryItemDict = {};

    itineraryItems?.map((item, index) => {
      itineraryItemDict[index] = item;
    });
    console.log(itineraryItemDict);
    dispatch(editItineraryOrder(tripID, itineraryItemDict));
    // itineraryItems.map(({ itineraryItemID, index }, arrayIndex) => {
    //   setTimeout(() => {
    //     console.log('submit button', itineraryItemID, { index });
    //     dispatch(editItineraryOrder(tripID, itineraryItemID, { index }));
    //   }, 1000);
    // });
    // itineraryItems.forEach(({ itineraryItemID, index }, arrayIndex) => {
    //   setTimeout(() => {
    //     console.log('submit button', itineraryItemID, { index });
    //     dispatch(editItineraryOrder(tripID, itineraryItemID, { index }));
    //   }, 1000);
    // });
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.submitButton}
      disabled={loading}
      onClick={handleSubmit}
    >
      Save Itinerary Order
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
