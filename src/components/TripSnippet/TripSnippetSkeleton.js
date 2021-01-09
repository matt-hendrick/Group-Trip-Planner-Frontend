import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
}));

function TripSnippetSkeleton() {
  const classes = useStyles();

  const content = Array.from({ length: 2 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
}

export default TripSnippetSkeleton;
