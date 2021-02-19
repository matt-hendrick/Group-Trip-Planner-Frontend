import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Link } from 'react-router-dom';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import DeleteTrip from './DeleteTrip';

interface Props {
  trip: {
    itineraryItems: object | null;
    createdBy: string;
    createdAt: string;
    tripName: string;
    members: string[];
    tripID: string;
  };
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function TripSnippet(props: Props) {
  const {
    trip: { tripName, tripID, createdAt, members, createdBy },
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
          Created {dayjs(createdAt).fromNow()} by {createdBy}
        </Typography>
        <Grid container>
          <Grid item xs={11}>
            {members ? (
              <Typography variant="body1">
                Members: {members.join(', ')}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={1}>
            <DeleteTrip tripID={tripID} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TripSnippet;
