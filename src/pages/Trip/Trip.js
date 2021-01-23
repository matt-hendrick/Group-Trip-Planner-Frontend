import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getTrip } from '../../redux/actions/tripActions';

// MUI
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Map from '../../components/Map/Map';
import TripProfile from '../../components/TripProfile/TripProfile';
import ItineraryList from '../../components/Itinerary/ItineraryList';
import ZoomButton from '../../components/Map/ZoomButton';
import CreatePin from '../../components/Pins/CreatePin';
import MapCenterButton from '../../components/Map/MapCenterButton';
import Lists from '../../components/Lists/Lists';
import EditTripNameButton from '../../components/TripSnippet/EditTripNameButton';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function Trip() {
  const classes = useStyles();
  const [localLoading, setLocalLoading] = useState(true);

  const trip = useSelector((state) => state.trip.trip);
  const authenticated = useSelector((state) => state.user.authenticated);

  const dispatch = useDispatch();

  const path = window.location.pathname;
  const tripID = path.substring(path.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(getTrip(tripID));

    setLocalLoading(false);
  }, [dispatch, tripID]);

  if (window.gtag) {
    window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search,
    });
  }

  let mapDisplay = !localLoading ? (
    <div className={classes.map}>
      <Map />
    </div>
  ) : (
    <Skeleton variant="rect" width="100%" height="40vh" />
  );

  const tripDisplay = (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item sm={8} xs={12}>
          <Grid>
            <Paper className={classes.tripHeader}>
              <Grid item xs={11}>
                <Typography
                  variant="h5"
                  color="primary"
                  className={classes.tripHeaderText}
                >
                  {trip.tripName}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <EditTripNameButton
                  tripID={tripID}
                  tripName={trip.tripName}
                  className={classes.editTripNameButton}
                />
              </Grid>
            </Paper>
            {mapDisplay}
            <Grid container>
              <Grid item sm={5} xs={5}>
                <MapCenterButton />{' '}
              </Grid>
              <Grid item sm={5} xs={5}>
                <CreatePin />
              </Grid>
              <Grid item sm={1} xs={1}>
                <ZoomButton zoomType="plus" tripID={tripID} />
                <ZoomButton zoomType="minus" tripID={tripID} />
              </Grid>
            </Grid>
          </Grid>
          <br />
          <Grid>
            <Lists />
          </Grid>
        </Grid>
        <Grid item sm={4} xs={12}>
          <TripProfile />
          <ItineraryList tripID={tripID} itineraryItems={trip.itineraryItems} />
        </Grid>
      </Grid>
    </Fragment>
  );

  return authenticated ? tripDisplay : <Redirect to="/login" />;
}

export default Trip;
