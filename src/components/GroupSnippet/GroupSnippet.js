import React from 'react';

import PropTypes from 'prop-types';

import ProfileCard from '../ProfileCard/ProfileCard';
function GroupProfileCard(props) {
  const {
    group: { groupName, groupID, createdAt, members },
  } = props;

  return (
    <ProfileCard
      name={groupName}
      link={`/groups/${groupID}`}
      createdAt={createdAt}
      members={members}
    />
  );
}

GroupProfileCard.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupProfileCard;
