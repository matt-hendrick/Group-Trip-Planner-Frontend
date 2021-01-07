import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';
import PropTypes from 'prop-types';

import MyButton from '../MyButton/MyButton';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { inviteUser, clearErrors } from '../../redux/actions/dataActions';

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

function InviteUser(props) {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState('');

  const classes = useStyles();

  const { tripID } = props;

  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);
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
    setOpen(false);
  };

  const changeRecipient = (event) => {
    const updatedRecipient = event.target.value;
    setRecipient(updatedRecipient);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(inviteUser(tripID, { recipient }));
  };

  return (
    <Fragment>
      <MyButton tip="Invite a user to the trip!" onClick={handleOpen}>
        <span>Invite a user to the trip! </span>
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
        <DialogTitle>Invite a user to the trip</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="Invite User"
              type="text"
              label="Invite User"
              multiline
              rows="3"
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

InviteUser.propTypes = {
  tripID: PropTypes.string.isRequired,
};

export default InviteUser;
