import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';
import PropTypes from 'prop-types';

// Redux
import { useDispatch } from 'react-redux';
import { deleteTrip } from '../../redux/actions/tripActions';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import MyButton from '../MyButton/MyButton';

const useStyles = makeStyles({
  ...theme.classes,
});

function DeleteTrip(props) {
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

DeleteTrip.propTypes = {
  tripID: PropTypes.string.isRequired,
};

export default DeleteTrip;
