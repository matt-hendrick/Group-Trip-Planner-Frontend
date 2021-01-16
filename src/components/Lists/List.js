import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { likeListItem, unlikeListItem } from '../../redux/actions/dataActions';

// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsUpOutlined from '@material-ui/icons/ThumbUpOutlined';

import CreateListItem from './CreateListItem';
import DeleteListItem from './DeleteListItem';
import MyButton from '../MyButton/MyButton';

import colorAssignment from '../../utility/colorAssignment';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function List(props) {
  const classes = useStyles();

  const { tabType } = props;

  const listItems = useSelector((state) => state.data.trip.listItems);
  const tripID = useSelector((state) => state.data.trip.tripID);
  const loggedInUserHandle = useSelector(
    (state) => state.user.credentials.handle
  );
  const members = useSelector((state) => state.data.trip.members);
  const dispatch = useDispatch();

  const handleLikeListItem = (tripID, listItemID, userHandle) => {
    dispatch(likeListItem(tripID, listItemID, userHandle));
  };
  const handleUnlikeListItem = (tripID, listItemID, userHandle) => {
    dispatch(unlikeListItem(tripID, listItemID, userHandle));
  };

  let listItemsDisplay = listItems ? (
    <Fragment>
      <Grid container>
        {listItems
          .filter((list) => {
            return tabType === list.listType;
          })
          .map((list, index) => {
            const { body, createdAt, userHandle, listItemID, likes } = list;
            const userColor = colorAssignment(
              loggedInUserHandle,
              members,
              userHandle
            );
            const likedListItem = () => {
              if (likes && likes.includes(loggedInUserHandle)) {
                return true;
              } else return false;
            };
            const likeButton = likedListItem() ? (
              <MyButton
                tip="Undo like"
                onClick={() =>
                  handleUnlikeListItem(tripID, listItemID, loggedInUserHandle)
                }
                tipClassName={classes.listItemButton}
              >
                <ThumbsUpIcon color="primary" />
              </MyButton>
            ) : (
              <MyButton
                tip="Like"
                onClick={() =>
                  handleLikeListItem(tripID, listItemID, loggedInUserHandle)
                }
                tipClassName={classes.listItemButton}
              >
                <ThumbsUpOutlined color="primary" />
              </MyButton>
            );
            return (
              <Fragment key={createdAt}>
                <Grid item xs={12}>
                  <Paper className={classes.listData}>
                    {userColor === 'primary' || userColor === 'secondary' ? (
                      <Typography
                        variant="body1"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color={userColor}
                      >
                        {userHandle}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        component={Link}
                        to={`/users/${userHandle}`}
                        style={{ color: userColor }}
                      >
                        {userHandle}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Grid container>
                      <Grid item xs={9} sm={10}>
                        <Typography variant="body1">{body}</Typography>
                      </Grid>
                      <Grid item xs={2} sm={1}>
                        {likeButton} {likes.length}
                      </Grid>
                      {loggedInUserHandle === userHandle ? (
                        <Grid item xs={1}>
                          <DeleteListItem
                            tripID={tripID}
                            listItemID={listItemID}
                          />
                        </Grid>
                      ) : null}
                    </Grid>
                  </Paper>
                </Grid>
                <hr className={classes.invisibleSeparator} />
              </Fragment>
            );
          })}
      </Grid>
      <CreateListItem tripID={tripID} listType={tabType} />
    </Fragment>
  ) : (
    <CreateListItem tripID={tripID} listType={tabType} />
  );
  return listItemsDisplay;
}

List.propTypes = {
  tabType: PropTypes.string.isRequired,
};

export default List;
