import React from 'react';

import PropTypes from 'prop-types';

import ProfileCard from '../ProfileCard/ProfileCard';

function GroupProfileCard(props) {
  const {
    groupID,
    trip: { tripName, tripID, createdAt, destination, mapZoomLevel },
  } = props;

  return (
    <ProfileCard
      name={tripName}
      link={`/groups/${groupID}/trips/${tripID}`}
      createdAt={createdAt}
    />
  );
}

GroupProfileCard.propTypes = {
  groupID: PropTypes.string.isRequired,
  trip: PropTypes.object.isRequired,
};

export default GroupProfileCard;
