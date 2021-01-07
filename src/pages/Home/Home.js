import React from 'react';

import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import Trips from '../Trips/Trips';

function Home() {
  const authenticated = useSelector((state) => state.user.authenticated);
  return authenticated ? <Trips /> : <Redirect to="/login" />;
}

export default Home;
