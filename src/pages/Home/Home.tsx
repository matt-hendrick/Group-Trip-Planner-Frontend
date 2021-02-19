import React from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Components
import Trips from '../Trips/Trips';

// Types
import { ReducerState } from '../../utility/sharedTypes';

function Home() {
  const authenticated = useSelector(
    (state: ReducerState) => state.user.authenticated
  );
  const loading = useSelector((state: ReducerState) => state.trip.loading);
  return !loading ? authenticated ? <Trips /> : <Redirect to="/login" /> : null;
}

export default Home;
