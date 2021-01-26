import React from 'react';

import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import Trips from '../Trips/Trips';

function Home() {
  const authenticated = useSelector((state) => state.user.authenticated);
  const loading = useSelector((state) => state.trip.loading);
  return !loading ? authenticated ? <Trips /> : <Redirect to="/login" /> : null;
}

export default Home;
