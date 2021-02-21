import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setTripCoordinates,
  clearLoadingData,
} from '../../redux/actions/tripActions';
import { clearErrors, setErrors } from '../../redux/actions/errorsActions';

// MUI
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

function MapCenterButton() {
  const [open, setOpen] = useState(false);
  const [userLocationQuery, setUserLocationQuery] = useState<string | null>(
    null
  );
  const [location, setLocation] = useState<number[] | null>(null);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [options, setOptions] = useState<MapBoxFeature[]>([]);

  const classes = useStyles();

  const loading = useSelector((state: ReducerState) => state.trip.loading);
  const errors = useSelector((state: ReducerState) => state.errors.errors);
  const tripID = useSelector((state: ReducerState) => state.trip.trip.tripID);
  const dispatch = useDispatch();

  const autocompleteLoading =
    autocompleteOpen && options && options.length === 0;

  useEffect(() => {
    if (!errors && !loading) {
      setUserLocationQuery(null);
      setLocation(null);
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
          .post('/mapCenterGeocode', { address: userLocationQuery })
          .then((data) => {
            response = data.data.features as MapBoxFeature[];
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (location) {
      dispatch(setTripCoordinates(tripID, location));
    }
  };

  const userLocationQueryChangedHandler = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const updatedLocation = target.value;
      setUserLocationQuery(updatedLocation);
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
        Change Map Center
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Change Map Center</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              id="ChangeMapCenterForm"
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
                if (value) setLocation(value.center);
              }}
              getOptionLabel={(option: MapBoxFeature): string => {
                return option.place_name;
              }}
              options={options ? options : []}
              loading={autocompleteLoading}
              loadingText="Searching a location"
              noOptionsText="No results found. Try closing the search box and re-searching."
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter the name of a country, region, or city"
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading || !location}
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

export default MapCenterButton;
