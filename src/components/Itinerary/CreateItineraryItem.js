import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

import MyButton from '../MyButton/MyButton';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  createItineraryItem,
  clearErrors,
} from '../../redux/actions/dataActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  ...theme.classes,
});

function CreateItineraryItem(props) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');

  const { tripID } = props;

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
    dispatch(createItineraryItem(tripID, { body }));
  };

  return (
    <Fragment>
      <MyButton
        tip="Add new itinerary item"
        onClick={handleOpen}
        tipClassName={classes.deleteButton}
      >
        {/* Add new itinerary item */}
        <AddBoxIcon color="primary" />
      </MyButton>
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
              rows="3"
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
              disabled={loading}
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
