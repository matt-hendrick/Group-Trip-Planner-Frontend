import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function Header(props) {
  const { headerTitle } = props;

  const classes = useStyles();
  return (
    <Paper className={classes.header}>
      <Typography variant="h5" color="primary">
        {headerTitle}
      </Typography>
    </Paper>
  );
}

Header.propTypes = {
  headerTitle: PropTypes.string,
};

export default Header;
