import React from 'react';

import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import GroupsDisplay from '../../components/GroupsDisplay/GroupsDisplay';

function Home() {
  const authenticated = useSelector((state) => state.user.authenticated);
  return authenticated ? <GroupsDisplay /> : <Redirect to="/login" />;
}

export default Home;
