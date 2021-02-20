import React, { useState, useEffect, Fragment } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { inviteUser, clearLoadingData } from '../../redux/actions/tripActions';
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
import { ReducerState } from '../../utility/sharedTypes';

interface Props {
  tripID: string;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function InviteUser(props: Props) {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState('');

  const classes = useStyles();

  const { tripID } = props;

  const loading = useSelector((state: ReducerState) => state.trip.loading);
  const errors = useSelector((state: ReducerState) => state.errors.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!errors && !loading) {
      setRecipient('');
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

  const changeRecipient = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedRecipient = target.value;
      setRecipient(updatedRecipient);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(inviteUser(tripID, { recipient }));
  };

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        className={classes.centeredButton}
      >
        Invite a user to the trip
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Invite a user to the trip</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="Enter the user's handle"
              type="text"
              label="Enter the user's handle"
              placeholder="Enter the user's handle"
              error={errors.invite ? true : false}
              helperText={errors.invite}
              className={classes.textField}
              onChange={changeRecipient}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading || !recipient}
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

export default InviteUser;
