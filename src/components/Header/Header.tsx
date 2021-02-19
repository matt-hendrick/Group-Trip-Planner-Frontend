import React from 'react';
import PropTypes from 'prop-types';

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core';

interface Props {
  headerTitle: string;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function Header(props: Props) {
  const { headerTitle } = props;

  const classes = useStyles({} as object);
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
