import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useSelector, useDispatch } from 'react-redux';
import { getGroup } from '../../redux/actions/dataActions';

import TripSnippet from '../../components/TripSnippet/TripSnippet';
import TripSnippetSkeleton from '../../components/TripSnippet/TripSnippetSkeleton';

import UserProfile from '../../components/UserProfile/UserProfile';
import GroupProfile from '../../components/GroupProfile/GroupProfile';
import CreateTrip from '../../components/TripSnippet/CreateTrip';
import Header from '../../components/Header/Header';
import InviteUser from '../../components/InviteUser/InviteUser';

function Group() {
  const group = useSelector((state) => state.data.group);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  const path = window.location.pathname;
  const groupID = path.substring(path.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(getGroup(groupID));
  }, [dispatch, groupID]);

  let TripList =
    !loading && group ? (
      group.trips?.map((trip) => (
        <TripSnippet key={trip.tripID} trip={trip} groupID={groupID} />
      ))
    ) : (
      <TripSnippetSkeleton />
    );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        <Header headerTitle={group.groupName} />
        {TripList}
        <CreateTrip groupID={groupID} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <GroupProfile />
        <UserProfile />
        <InviteUser groupID={groupID} />
      </Grid>
    </Grid>
  );
}

export default Group;
