import React, { useState, Fragment } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { editTripName } from '../../redux/actions/tripActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import MyButton from '../MyButton/MyButton';

interface Props {
  tripID: string;
  tripName?: string;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function EditTripName(props: Props) {
  const [localTripName, setLocalTripName] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  const { tripID, tripName } = props;

  const mapUserDetailsToState = () => {
    setLocalTripName(tripName ? tripName : '');
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
    dispatch(editTripName(tripID, localTripName));
    handleClose();
  };

  const tripNameChangedHandler = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedTripName = target.value;
      setLocalTripName(updatedTripName);
    }
  };

  return (
    <Fragment>
      <MyButton
        tip="Edit Trip Name"
        onClick={handleOpen}
        btnClassName={classes.noPaddingButton}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Trip Name</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="Edit Trip Name"
              type="text"
              label="Edit Trip Name"
              multiline
              placeholder="Edit Trip Name"
              className={classes.textField}
              value={localTripName}
              onChange={(event) => tripNameChangedHandler(event)}
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

export default EditTripName;
