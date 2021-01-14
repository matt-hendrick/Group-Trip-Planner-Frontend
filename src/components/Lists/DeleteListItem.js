import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

import PropTypes from 'prop-types';

import MyButton from '../MyButton/MyButton';

// Redux
import { useDispatch } from 'react-redux';
import { deleteListItem } from '../../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  ...theme.classes,
});

function DeleteListItem(props) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const { tripID, listItemID } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteListItem = () => {
    dispatch(deleteListItem(tripID, listItemID));
    setOpen(false);
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete List Item"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <CloseIcon color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Are you sure you want to delete this list item
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteListItem} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

DeleteListItem.propTypes = {
  listItemID: PropTypes.string.isRequired,
  tripID: PropTypes.string.isRequired,
};

export default DeleteListItem;
