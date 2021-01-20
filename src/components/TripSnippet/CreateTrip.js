import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

import MyButton from '../MyButton/MyButton';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { createTrip, clearErrors } from '../../redux/actions/dataActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  ...theme.classes,
});

function CreateTrip() {
  const [open, setOpen] = useState(false);
  const [tripName, setTripName] = useState('');

  const classes = useStyles();

  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!errors && !loading) {
      setTripName('');
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

  const changeTripName = (event) => {
    const updatedTripName = event.target.value;
    setTripName(updatedTripName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTrip({ tripName }));
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.centeredButton}
      >
        Create a new trip!
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Create a new trip</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="Trip Name"
              type="text"
              label="Trip Name"
              placeholder="Create a new trip"
              error={errors.tripName ? true : false}
              helperText={errors.tripName}
              className={classes.textField}
              onChange={changeTripName}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading || !tripName}
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

export default CreateTrip;
