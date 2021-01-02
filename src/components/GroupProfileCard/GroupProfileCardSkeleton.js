import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover',
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10,
  },
}));

function GroupProfileCardSkeleton() {
  const classes = useStyles();

  const content = Array.from({ length: 3 }).map((item, index) => (
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

export default GroupProfileCardSkeleton;
