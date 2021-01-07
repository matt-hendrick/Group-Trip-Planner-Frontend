import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';

// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DeleteComment from './DeleteComment';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function Comments(props) {
  const classes = useStyles();

  const { comments } = props;

  const tripID = useSelector((state) => state.data.trip.tripID);
  const authenticated = useSelector((state) => state.user.authenticated);
  const handle = useSelector((state) => state.user.credentials.handle);

  let commentsDisplay = comments ? (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.commentData}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant="body1">{body}</Typography>
                  {authenticated && handle === comment.userHandle ? (
                    <DeleteComment
                      tripID={tripID}
                      commentID={comment.commentID}
                    />
                  ) : null}
                </Paper>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  ) : null;
  return commentsDisplay;
}

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
