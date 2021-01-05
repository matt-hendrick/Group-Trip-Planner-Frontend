import React from 'react';

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

function Header(props) {
  const { headerTitle } = props;
  return (
    <Typography variant="h5" color="textSecondary">
      {headerTitle}
    </Typography>
  );
}

Header.propTypes = {
  headerTitle: PropTypes.string.isRequired,
};

export default Header;
