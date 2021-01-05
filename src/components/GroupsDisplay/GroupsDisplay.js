import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useSelector, useDispatch } from 'react-redux';
import { getOwnUserDetails } from '../../redux/actions/userActions';

import GroupProfileCard from '../GroupProfileCard/GroupProfileCard';
import GroupProfileCardSkeleton from '../GroupProfileCard/GroupProfileCardSkeleton';

import UserProfile from '../UserProfile/UserProfile';
import CreateGroup from './CreateGroup';
import Header from '../Header/Header';

function GroupsDisplay() {
  const groups = useSelector((state) => state.user.groups);
  const loading = useSelector((state) => state.ui.loading);
  const userHandle = useSelector((state) => state.user.credentials.handle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnUserDetails());
  }, [loading, dispatch]);

  let groupList =
    !loading && groups ? (
      groups.map((group) => (
        <GroupProfileCard key={group.groupID} group={group} />
      ))
    ) : (
      <GroupProfileCardSkeleton />
    );

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        <Header headerTitle={`${userHandle}'s Groups`} />
        {groupList}
        <CreateGroup />
      </Grid>
      <Grid item sm={4} xs={12}>
        <UserProfile />
      </Grid>
    </Grid>
  );
}

export default GroupsDisplay;
