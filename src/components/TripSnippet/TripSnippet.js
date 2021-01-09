import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
}));

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

  const classes = useStyles();

  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography
          variant="h6"
          component={Link}
          to={`/trips/${tripID}`}
          color="primary"
        >
          {tripName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Created {dayjs(createdAt).fromNow()}
        </Typography>
        {members ? (
          <Typography variant="body1">Members: {members.join(', ')}</Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}

TripSnippet.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default TripSnippet;
