import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

import MyButton from '../MyButton/MyButton';

// Redux
import { useDispatch } from 'react-redux';
import { editItineraryItem } from '../../redux/actions/dataActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  ...theme.classes,
  button: {
    float: 'right',
  },
});

function EditItineraryItem(props) {
  const [localItineraryBody, setLocalItineraryBody] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  const { tripID, itineraryItemID, itineraryBody } = props;

  const mapUserDetailsToState = () => {
    setLocalItineraryBody(itineraryBody ? itineraryBody : '');
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState();
  };

  const handleClose = () => {
    setOpen(false);
    mapUserDetailsToState();
  };

  const handleSubmit = () => {
    const body = localItineraryBody;
    dispatch(editItineraryItem(tripID, itineraryItemID, { body }));
    handleClose();
  };

  const bodyChangedHandler = (event) => {
    const updatedBody = event.target.value;
    setLocalItineraryBody(updatedBody);
  };

  return (
    <Fragment>
      <MyButton
        tip="Edit Itinerary Item"
        onClick={handleOpen}
        btnClassName={classes.noPaddingButton}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Itinerary Item</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="Edit Itinerary Item"
              type="text"
              label="Edit Itinerary Item"
              multiline
              placeholder="Edit Itinerary Item"
              className={classes.textField}
              value={localItineraryBody}
              onChange={(event) => bodyChangedHandler(event)}
              fullWidth
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

EditItineraryItem.propTypes = {
  tripID: PropTypes.string.isRequired,
  itineraryBody: PropTypes.string.isRequired,
};

export default EditItineraryItem;
