import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useSelector, useDispatch } from 'react-redux';
import { getTrip } from '../../redux/actions/dataActions';

import UserProfile from '../../components/UserProfile/UserProfile';
import Header from '../../components/Header/Header';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import TripProfile from '../../components/TripProfile/TripProfile';
import InviteUser from '../../components/InviteUser/InviteUser';

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
      <div>Map Skeleton</div>
    );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        <Header headerTitle={trip.tripName} />
        {Map}
        <div>Comments</div>
      </Grid>
      <Grid item sm={4} xs={12}>
        <TripProfile />
        <InviteUser tripID={tripID} />
        {/* <UserProfile /> */}
      </Grid>
    </Grid>
  );
}

export default Trip;
