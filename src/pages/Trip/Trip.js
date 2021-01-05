import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useSelector, useDispatch } from 'react-redux';
import { getTrip } from '../../redux/actions/dataActions';

import Header from '../../components/Header/Header';

function Trip() {
  const trip = useSelector((state) => state.data.trip);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  const path = window.location.pathname;
  const tripID = path.substring(path.lastIndexOf('/') + 1);
  const groupID = path.split('/')[2];

  useEffect(() => {
    dispatch(getTrip(groupID, tripID));
  }, [dispatch, groupID, tripID]);

  let Map = !loading && trip ? <div>Map</div> : <div>Map Skeleton</div>;

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={12}>
        <Header headerTitle={trip.tripName} />
        {Map}
        <div>Comments</div>
      </Grid>
      <Grid item sm={4} xs={12}>
        <div>Lists</div>
      </Grid>
    </Grid>
  );
}

export default Trip;
