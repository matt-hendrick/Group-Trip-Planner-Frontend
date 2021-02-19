import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getOwnUserDetails } from '../../redux/actions/userActions';

// Components
import TripSnippet from '../../components/TripSnippet/TripSnippet';
import TripSnippetSkeleton from '../../components/TripSnippet/TripSnippetSkeleton';
import UserProfile from '../../components/UserProfile/UserProfile';
import CreateTrip from '../../components/TripSnippet/CreateTrip';
import Header from '../../components/Header/Header';

// Types
import { ReducerState } from '../../utility/sharedTypes';

// Utility Functions
import googleAnalytics from '../../utility/googleAnalytics';

function Trips() {
  const trips = useSelector((state: ReducerState) => state.user.trips);
  const loading = useSelector((state: ReducerState) => state.trip.loading);
  const userHandle = useSelector(
    (state: ReducerState) => state.user.credentials.handle
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnUserDetails());
  }, [loading, dispatch]);

  googleAnalytics();

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

export default Trips;
