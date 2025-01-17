import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { createPin, clearLoadingData } from '../../redux/actions/tripActions';
import { clearErrors, setErrors } from '../../redux/actions/errorsActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import MyButton from '../MyButton/MyButton';

// Types
import { ReducerState, MapBoxFeature } from '../../utility/sharedTypes';

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function CreatePin() {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [userLocationQuery, setUserLocationQuery] = useState<string | null>(
    null
  );
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [pinInfo, setPinInfo] = useState<MapBoxFeature | null>(null);

  const classes = useStyles();

  const loading = useSelector((state: ReducerState) => state.trip.loading);
  const errors = useSelector((state: ReducerState) => state.errors.errors);
  const tripID = useSelector((state: ReducerState) => state.trip.trip.tripID);
  const dispatch = useDispatch();

  const autocompleteLoading = autocompleteOpen && options.length === 0;

  useEffect(() => {
    if (!errors && !loading) {
      setComment('');
      setPinInfo(null);
      setUserLocationQuery(null);
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
      if (userLocationQuery && userLocationQuery?.length > 3) {
        axios
          .post('/pinGeocode', { address: userLocationQuery })
          .then((data) => {
            response = data.data.features;

            if (active && response) {
              setOptions(response.map((data: MapBoxFeature) => data));
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
    dispatch(clearLoadingData());
    setOpen(false);
  };

  const changeTripName = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedTripName = target.value;
      setComment(updatedTripName);
    }
  };

  const userLocationQueryChangedHandler = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedLocation = target.value;
      setUserLocationQuery(updatedLocation);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (pinInfo?.center) {
      const coordinates = pinInfo.center;
      const address = pinInfo.place_name;
      dispatch(createPin(tripID, { comment, coordinates, address }));
    }
  };

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
              filterOptions={(options, state) => options}
              open={autocompleteOpen}
              onOpen={() => {
                setAutocompleteOpen(true);
              }}
              onClose={() => {
                setAutocompleteOpen(false);
              }}
              onChange={(option, value: MapBoxFeature | null) => {
                if (value) setPinInfo(value);
              }}
              getOptionLabel={(option: MapBoxFeature) => {
                return option.place_name;
              }}
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
              disabled={loading || !pinInfo}
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
