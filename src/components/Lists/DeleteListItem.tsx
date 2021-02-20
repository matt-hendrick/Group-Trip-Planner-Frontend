import React, { useState, Fragment } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { deleteListItem } from '../../redux/actions/tripActions';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import MyButton from '../MyButton/MyButton';

interface Props {
  listItemID: string;
  tripID: string;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function DeleteListItem(props: Props) {
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
        tipClassName={classes.noPaddingButton}
      >
        <CloseIcon color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Are you sure you want to delete this list item?
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

export default DeleteListItem;
