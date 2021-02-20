import React from 'react';

// Redux
import { editItineraryOrder } from '../../redux/actions/tripActions';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Theme, makeStyles } from '@material-ui/core';

// Types
import {
  ReducerState,
  ItineraryItem,
  ItineraryDictionary,
} from '../../utility/sharedTypes';

interface Props {
  itineraryItems: ItineraryItem[] | null;
  tripID: string;
  changed: boolean;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function SaveItineraryOrderButton(props: Props) {
  const classes = useStyles();

  const loading = useSelector((state: ReducerState) => state.trip.loading);
  const dispatch = useDispatch();

  const { tripID, itineraryItems, changed } = props;

  const handleSubmit = () => {
    let itineraryItemDict: ItineraryDictionary = {};

    itineraryItems?.forEach((item: ItineraryItem, index: number) => {
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

export default SaveItineraryOrderButton;
