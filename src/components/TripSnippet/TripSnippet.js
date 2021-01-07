import React from 'react';

import PropTypes from 'prop-types';

import ProfileCard from '../ProfileCard/ProfileCard';

function TripSnippet(props) {
  const {
    trip: {
      tripName,
      tripID,
      createdAt,
      members,
      // destination, mapZoomLevel
    },
  } = props;

  return (
    <ProfileCard
      name={tripName}
      link={`/trips/${tripID}`}
      createdAt={createdAt}
      members={members}
    />
  );
}

TripSnippet.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default TripSnippet;
