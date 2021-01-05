import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useSelector, useDispatch } from 'react-redux';
import { getGroup } from '../../redux/actions/dataActions';

import TripProfileCard from '../../components/TripProfileCard/TripProfileCard';
import TripProfileCardSkeleton from '../../components/TripProfileCard/TripProfileCardSkeleton';

import UserProfile from '../../components/UserProfile/UserProfile';
import CreateTrip from '../../components/TripProfileCard/CreateTrip';

function Group() {
  const group = useSelector((state) => state.data.group);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  const path = window.location.pathname;
  const groupID = path.substring(path.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(getGroup(groupID));
  }, [dispatch]);

  let TripList =
    !loading && group ? (
      group.trips?.map((trip) => (
        <TripProfileCard key={trip.tripID} trip={trip} groupID={groupID} />
      ))
    ) : (
      <TripProfileCardSkeleton />
    );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        {TripList}
        <CreateTrip groupID={groupID} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <UserProfile />
      </Grid>
    </Grid>
  );
}

export default Group;
