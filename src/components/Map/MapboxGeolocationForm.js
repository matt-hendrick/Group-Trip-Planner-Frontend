import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setErrors, setTripCoordinates } from '../../redux/actions/dataActions';

// MUI
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function MapboxGeolocationForm() {
  const [userLocationQuery, setUserLocationQuery] = useState(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const tripID = useSelector((state) => state.data.trip.tripID);
  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;
    let response = null;

    if (!loading) {
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
  }, [loading, userLocationQuery, dispatch]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const userLocationQueryChangedHandler = (event) => {
    const updatedLocation = event.target.value;
    setUserLocationQuery(updatedLocation);
  };

  const filterOptions = createFilterOptions({
    trim: true,
  });

  return (
    <Autocomplete
      id="MapboxGeolocationForm"
      style={{ textAlign: 'center' }}
      clearOnEscape={true}
      filterOptions={filterOptions}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(option, value) =>
        dispatch(setTripCoordinates(tripID, value.center))
      }
      getOptionLabel={(option) => option.place_name}
      options={options}
      loading={loading}
      loadingText="Searching location"
      noOptionsText="No results found. Try clearing the text and re-searching."
      renderInput={(params) => (
        <TextField
          {...params}
          label="Change Map Center"
          variant="outlined"
          margin="normal"
          onChange={(event) => userLocationQueryChangedHandler(event)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && userLocationQuery ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default MapboxGeolocationForm;
