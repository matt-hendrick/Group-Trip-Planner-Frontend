import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

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

function ProfileCard(props) {
  const classes = useStyles();
  const { name, link, createdAt, members } = props;

  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h6" component={MuiLink} to={link} color="primary">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        {members ? (
          <Typography variant="body1">Members: {members.join(', ')}</Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  members: PropTypes.array,
};

export default ProfileCard;
