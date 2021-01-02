import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useSelector } from 'react-redux';

import GroupProfileCard from '../../components/GroupProfileCard/GroupProfileCard';
import GroupProfileCardSkeleton from '../../components/GroupProfileCard/GroupProfileCardSkeleton';

function GroupsDisplay() {
  const groups = useSelector((state) => state.user.groups);
  const loading = useSelector((state) => state.ui.loading);

  let recentPosts =
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
        {recentPosts}
      </Grid>
      <Grid item sm={4} xs={12}>
        {/* <Profile /> */}
        User Profile
      </Grid>
    </Grid>
  );
}

export default GroupsDisplay;
