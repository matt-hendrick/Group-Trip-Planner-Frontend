import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getTrip } from '../../redux/actions/dataActions';

// MUI
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import Header from '../../components/Header/Header';
import Map from '../../components/Map/Map';
import MapboxGeolocationForm from '../../components/Map/MapboxGeolocationForm';
import TripProfile from '../../components/TripProfile/TripProfile';
import ItineraryList from '../../components/Itinerary/ItineraryList';
// import Comments from '../../components/Comments/Comments';
// import CommentForm from '../../components/Comments/CommentForm';
import ZoomButton from '../../components/Map/ZoomButton';
import CreatePin from '../../components/Pins/CreatePin';
import MapCenterButton from '../../components/Map/MapCenterButton';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function Trip() {
  const classes = useStyles();

  const trip = useSelector((state) => state.data.trip);
  const coordinates = useSelector((state) => state.data.coordinates);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  const path = window.location.pathname;
  const tripID = path.substring(path.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(getTrip(tripID));
  }, [dispatch, tripID]);

  let mapDisplay =
    !loading && coordinates ? (
      <div className={classes.map}>
        <Map />
      </div>
    ) : (
      <Skeleton variant="rect" width="100%" height="40vh" />
    );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        <Header headerTitle={trip.tripName} />
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

        {/* <Comments comments={trip.comments} />
        <CommentForm tripID={tripID} /> */}
      </Grid>
      <Grid item sm={4} xs={12}>
        <TripProfile />
        <ItineraryList tripID={tripID} itinerary={trip.itineraryitems} />
      </Grid>
    </Grid>
  );
}

export default Trip;
