import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useSelector, useDispatch } from 'react-redux';
import { getTrip } from '../../redux/actions/dataActions';

import Header from '../../components/Header/Header';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import Skeleton from '@material-ui/lab/Skeleton';
import TripProfile from '../../components/TripProfile/TripProfile';
import Comments from '../../components/Comments/Comments';
import CommentForm from '../../components/Comments/CommentForm';
import ItineraryList from '../../components/Itinerary/ItineraryList';

function Trip() {
  const trip = useSelector((state) => state.data.trip);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  const path = window.location.pathname;
  const tripID = path.substring(path.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(getTrip(tripID));
  }, [dispatch, tripID]);

  let Map =
    !loading && trip ? (
      <MapDisplay destination={trip.destination} />
    ) : (
      <Skeleton variant="rect" width="100%" height="40vh" />
    );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        <Header headerTitle={trip.tripName} />
        {Map}
        <Comments comments={trip.comments} />
        <CommentForm tripID={tripID} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TripProfile />
        <ItineraryList tripID={tripID} itinerary={trip.itineraryitems} />
      </Grid>
    </Grid>
  );
}

export default Trip;
