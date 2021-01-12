import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utility/theme';

import MyButton from '../MyButton/MyButton';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  createPin,
  clearErrors,
  setErrors,
} from '../../redux/actions/dataActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
  ...theme.classes,
});

function CreatePin() {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [userLocationQuery, setUserLocationQuery] = useState(null);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [pinInfo, setPinInfo] = useState();

  const classes = useStyles();

  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);
  const tripID = useSelector((state) => state.data.trip.tripID);
  const dispatch = useDispatch();

  const autocompleteLoading = autocompleteOpen && options.length === 0;

  useEffect(() => {
    if (!errors && !loading) {
      setComment('');
      setPinInfo();
      setUserLocationQuery();
      setOpen(false);
    }
  }, [loading, errors]);

  useEffect(() => {
    let active = true;
    let response = null;

    if (!autocompleteLoading) {
      return undefined;
    }

    const requestDataFromAPI = () => {
      if (userLocationQuery?.length > 3) {
        axios
          .post('/geocode', { address: userLocationQuery })
          .then((data) => {
            response = data.data.features;

            if (active && response) {
              setOptions(response.map((data) => data));
            }
          })
          .catch((error) => {
            dispatch(setErrors(error.message));
          });

        return () => {
          active = false;
        };
      }
    };

    // debouncing so API called only if user has stopped typing for one second
    const timeoutId = setTimeout(() => requestDataFromAPI(), 1000);
    return () => clearTimeout(timeoutId);
  }, [autocompleteLoading, userLocationQuery, dispatch]);

  useEffect(() => {
    if (!autocompleteOpen) {
      setOptions([]);
    }
  }, [autocompleteOpen]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(clearErrors());
    setOpen(false);
  };

  const changeTripName = (event) => {
    const updatedTripName = event.target.value;
    setComment(updatedTripName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const coordinates = pinInfo.center;
    const address = pinInfo.place_name;
    dispatch(createPin(tripID, { comment, coordinates, address }));
  };

  const userLocationQueryChangedHandler = (event) => {
    const updatedLocation = event.target.value;
    setUserLocationQuery(updatedLocation);
  };

  const filterOptions = createFilterOptions({
    trim: true,
  });

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.centeredButton}
      >
        Add a new pin
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Add a new pin</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              id="AddPinForm"
              style={{ textAlign: 'center' }}
              clearOnEscape={true}
              filterOptions={filterOptions}
              open={autocompleteOpen}
              onOpen={() => {
                setAutocompleteOpen(true);
              }}
              onClose={() => {
                setAutocompleteOpen(false);
              }}
              onChange={(option, value) => setPinInfo(value)}
              getOptionLabel={(option) => option.place_name}
              options={options}
              loading={autocompleteLoading}
              loadingText="Search a location"
              noOptionsText="No results found. Try closing the search box and re-searching."
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search a location"
                  variant="outlined"
                  margin="normal"
                  onChange={(event) => userLocationQueryChangedHandler(event)}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {autocompleteLoading && userLocationQuery ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            <TextField
              name="Add a comment to the pin (optional)"
              type="text"
              label="Add a comment to the pin (optional)"
              multiline
              placeholder="Add a comment to the pin (optional)"
              error={errors.error ? true : false}
              helperText={errors.error}
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

export default CreatePin;
