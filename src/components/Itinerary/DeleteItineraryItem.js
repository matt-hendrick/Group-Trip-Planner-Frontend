import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

import PropTypes from 'prop-types';

import MyButton from '../MyButton/MyButton';

// Redux
import { useDispatch } from 'react-redux';
import { editItineraryOrder } from '../../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  ...theme.classes,
});

function DeleteItineraryItem(props) {
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
    let itineraryItemDict = {};
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

DeleteItineraryItem.propTypes = {
  itineraryItemID: PropTypes.string.isRequired,
  tripID: PropTypes.string.isRequired,
};

export default DeleteItineraryItem;
