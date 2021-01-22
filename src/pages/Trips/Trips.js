import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useSelector, useDispatch } from 'react-redux';
import { getOwnUserDetails } from '../../redux/actions/userActions';

import TripSnippet from '../../components/TripSnippet/TripSnippet';
import TripSnippetSkeleton from '../../components/TripSnippet/TripSnippetSkeleton';
import UserProfile from '../../components/UserProfile/UserProfile';
import CreateTrip from '../../components/TripSnippet/CreateTrip';
import Header from '../../components/Header/Header';

function Trip() {
  const trips = useSelector((state) => state.user.trips);
  const loading = useSelector((state) => state.trip.loading);
  const userHandle = useSelector((state) => state.user.credentials.handle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnUserDetails());
    window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search,
    });
  }, [loading, dispatch]);

  let tripList =
    !loading && trips ? (
      trips.map((trip) => <TripSnippet key={trip.tripID} trip={trip} />)
    ) : (
      <TripSnippetSkeleton />
    );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        <Header headerTitle={`${userHandle}'s Trips`} />
        {tripList}
        <CreateTrip />
      </Grid>
      <Grid item sm={4} xs={12}>
        <UserProfile />
      </Grid>
    </Grid>
  );
}

export default Trip;
