import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

import MyButton from '../MyButton/MyButton';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  editItineraryOrder,
  clearErrors,
} from '../../redux/actions/dataActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  ...theme.classes,
});

function CreateItineraryItem(props) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');

  const { tripID, userHandle, itineraryItems } = props;

  const classes = useStyles();

  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);
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
    setOpen(false);
  };

  const changeBody = (event) => {
    const updatedBody = event.target.value;
    setBody(updatedBody);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const createdAt = new Date().toISOString();
    const newItem = { body, userHandle, createdAt };
    itineraryItems.push(newItem);
    let itineraryItemDict = {};

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
