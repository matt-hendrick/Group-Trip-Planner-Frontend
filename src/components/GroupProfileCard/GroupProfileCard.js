import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
}));

function GroupProfileCard(props) {
  const classes = useStyles();
  const {
    group: { groupName, createdAt },
  } = props;

  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        {/* <Typography variant="h5" color="primary">
          {userHandle}
        </Typography> */}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{groupName}</Typography>
        {/* <PostDetails
      postID={postID}
      userHandle={userHandle}
      openDialog={props.openDialog}
    /> */}
      </CardContent>
    </Card>
  );
}

GroupProfileCard.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupProfileCard;
