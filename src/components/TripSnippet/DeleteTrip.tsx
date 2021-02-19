import React, { useState, Fragment } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { deleteTrip } from '../../redux/actions/tripActions';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import MyButton from '../MyButton/MyButton';

interface Props {
  tripID: string;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function DeleteTrip(props: Props) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const { tripID } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTrip = () => {
    dispatch(deleteTrip(tripID));
    setOpen(false);
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete Trip"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this trip?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTrip} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default DeleteTrip;
