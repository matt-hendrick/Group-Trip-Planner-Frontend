import React, { Fragment } from 'react';
import dayjs from 'dayjs';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { likeListItem, unlikeListItem } from '../../redux/actions/tripActions';

// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import CreateListItem from './CreateListItem';
import DeleteListItem from './DeleteListItem';
import MyButton from '../MyButton/MyButton';

// Utility Functions
import colorAssignment from '../../utility/colorAssignment';

// Types
import { ReducerState } from '../../utility/sharedTypes';

interface Props {
  tabType: string;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function List(props: Props) {
  const classes = useStyles();

  const { tabType } = props;

  const listItems = useSelector(
    (state: ReducerState) => state.trip.trip.listItems
  );
  const tripID = useSelector((state: ReducerState) => state.trip.trip.tripID);
  const loggedInUserHandle = useSelector(
    (state: ReducerState) => state.user.credentials.handle
  );
  const members = useSelector((state: ReducerState) => state.trip.trip.members);
  const loading = useSelector((state: ReducerState) => state.trip.loading);
  const dispatch = useDispatch();

  const handleLikeListItem = (
    tripID: string,
    listItemID: string,
    userHandle: string
  ) => {
    dispatch(likeListItem(tripID, listItemID, userHandle));
  };
  const handleUnlikeListItem = (
    tripID: string,
    listItemID: string,
    userHandle: string
  ) => {
    dispatch(unlikeListItem(tripID, listItemID, userHandle));
  };

  let listItemsDisplay =
    listItems && loggedInUserHandle ? (
      <Fragment>
        <Grid container>
          {listItems
            // filters so component only renders items from active list
            .filter((list) => {
              return tabType === list.listType;
            })
            // sorts list items by number of likes
            .sort((listA, listB) =>
              listA.likes.length < listB.likes.length ? 1 : -1
            )
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
                  tip="Unlike"
                  onClick={() =>
                    handleUnlikeListItem(tripID, listItemID, loggedInUserHandle)
                  }
                  tipClassName={classes.noPaddingButton}
                >
                  <ThumbsUpIcon color="primary" />
                </MyButton>
              ) : (
                <MyButton
                  tip="Like"
                  onClick={() =>
                    handleLikeListItem(tripID, listItemID, loggedInUserHandle)
                  }
                  tipClassName={classes.noPaddingButton}
                >
                  <ThumbsUpOutlined color="primary" />
                </MyButton>
              );
              return (
                <Fragment key={createdAt}>
                  <Grid item xs={12}>
                    <Paper className={classes.listData}>
                      <div className={classes.itemHandleAndDate}>
                        {userColor === 'primary' ||
                        userColor === 'secondary' ? (
                          <Typography variant="body1" color={userColor}>
                            {userHandle}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body1"
                            style={{ color: userColor }}
                          >
                            {userHandle}
                          </Typography>
                        )}
                        <Typography variant="body2" color="textSecondary">
                          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                      </div>
                      <hr className={classes.invisibleSeparator} />
                      <Grid container>
                        <Grid item xs={9} sm={10}>
                          <Typography variant="body1">{body}</Typography>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          {likeButton}{' '}
                          <Tooltip title={likes.join(', ')}>
                            <span>{likes.length}</span>
                          </Tooltip>
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

export default List;
