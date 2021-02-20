import React, { useState, Fragment } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { editItineraryOrder } from '../../redux/actions/tripActions';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import MyButton from '../MyButton/MyButton';

// Types
import { ItineraryItem, ItineraryDictionary } from '../../utility/sharedTypes';

interface Props {
  itineraryItems: ItineraryItem[];
  tripID: string;
  index: number;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function DeleteItineraryItem(props: Props) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const { tripID, itineraryItems, index } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteItineraryItem = () => {
    itineraryItems.splice(index, 1);
    let itineraryItemDict: ItineraryDictionary = {};
    itineraryItems?.forEach((item, index) => {
      itineraryItemDict[index] = item;
    });
    dispatch(editItineraryOrder(tripID, itineraryItemDict));
    setOpen(false);
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete Itinerary Item"
        onClick={handleOpen}
        btnClassName={classes.itineraryDeleteButton}
      >
        <CloseIcon color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Are you sure you want to delete this itinerary item
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteItineraryItem} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default DeleteItineraryItem;
