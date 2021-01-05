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
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
});

function CreateTrip(props) {
  const [open, setOpen] = useState(false);
  const [tripName, setTripName] = useState('');

  const classes = useStyles();

  const { groupID } = props;

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
    dispatch(createTrip(groupID, { tripName }));
  };

  return (
    <Fragment>
      <MyButton tip="Create a new trip!" onClick={handleOpen}>
        <span>Create a new trip! </span>
        {/* <AddIcon /> */}
      </MyButton>
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
              multiline
              rows="3"
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

export default CreateTrip;
