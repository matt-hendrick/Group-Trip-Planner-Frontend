import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

import PropTypes from 'prop-types';

import MyButton from '../MyButton/MyButton';

// Redux
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles({
  ...theme.classes,
});

function DeleteComment(props) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const { tripID, commentID } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(tripID, commentID));
    setOpen(false);
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete Comment"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this comment</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteComment} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

DeleteComment.propTypes = {
  commentID: PropTypes.string.isRequired,
  tripID: PropTypes.string.isRequired,
};

export default DeleteComment;
