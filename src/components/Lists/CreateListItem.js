import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  createListItem,
  clearLoadingData,
} from '../../redux/actions/tripActions';
import { clearErrors } from '../../redux/actions/errorsActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../MyButton/MyButton';

const useStyles = makeStyles({
  ...theme.classes,
});

function CreateListItem(props) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');

  const { tripID, listType } = props;

  const classes = useStyles();

  const loading = useSelector((state) => state.trip.loading);
  const errors = useSelector((state) => state.errors.errors);
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

  const changeBody = (event) => {
    const updatedBody = event.target.value;
    setBody(updatedBody);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createListItem(tripID, { body, listType }));
  };

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        className={classes.centeredButton}
        variant="contained"
        color="primary"
      >
        Add new list item
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Add a new item to your list</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="New list item"
              type="text"
              label="New list item"
              multiline
              placeholder="Add a new item to your list"
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

export default CreateListItem;
