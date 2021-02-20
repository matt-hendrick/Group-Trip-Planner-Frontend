import React, { useState, useEffect, Fragment } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  editItineraryOrder,
  clearLoadingData,
} from '../../redux/actions/tripActions';
import { clearErrors } from '../../redux/actions/errorsActions';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import MyButton from '../MyButton/MyButton';

// Types
import {
  ReducerState,
  ItineraryItem,
  ItineraryDictionary,
} from '../../utility/sharedTypes';

interface Props {
  itineraryItems: ItineraryItem[];
  tripID: string;
  userHandle: string;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function CreateItineraryItem(props: Props) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');

  const { tripID, userHandle, itineraryItems } = props;

  const classes = useStyles();

  const loading = useSelector((state: ReducerState) => state.trip.loading);
  const errors = useSelector((state: ReducerState) => state.errors.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!errors && !loading) {
      setBody('');
      setOpen(false);
    }
  }, [loading, errors]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(clearErrors());
    dispatch(clearLoadingData());
    setOpen(false);
  };

  const changeBody = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedBody = target.value;
      setBody(updatedBody);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const createdAt = new Date().toISOString();
    const newItem = { body, userHandle, createdAt };
    itineraryItems.push(newItem);
    let itineraryItemDict: ItineraryDictionary = {};

    itineraryItems?.forEach((item, index) => {
      itineraryItemDict[index] = item;
    });
    dispatch(editItineraryOrder(tripID, itineraryItemDict));
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        className={classes.centeredButton}
        variant="contained"
        color="primary"
      >
        Add new itinerary item
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Add a new item to your itinerary</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="New itinerary item"
              type="text"
              label="New itinerary item"
              multiline
              placeholder="Add a new item to your itinerary"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={changeBody}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading || !body}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CreateItineraryItem;
