import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import CreateListItem from './CreateListItem';
import DeleteListItem from './DeleteListItem';

import colorAssignment from '../../utility/colorAssignment';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function List(props) {
  const classes = useStyles();

  const { tabType } = props;

  const listItems = useSelector((state) => state.data.trip.listItems);
  const tripID = useSelector((state) => state.data.trip.tripID);
  const currentUserHandle = useSelector(
    (state) => state.user.credentials.handle
  );
  const members = useSelector((state) => state.data.trip.members);

  let listItemsDisplay = listItems ? (
    <Fragment>
      <Grid container>
        {listItems.map((list, index) => {
          const {
            body,
            createdAt,
            userHandle,
            listType,
            link,
            listItemID,
          } = list;
          if (tabType === listType) {
            const userColor = colorAssignment(
              currentUserHandle,
              members,
              userHandle
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
                      <Grid item xs={9}>
                        <Typography variant="body1">{body}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <DeleteListItem
                          tripID={tripID}
                          listItemID={listItemID}
                        />
                      </Grid>
                    </Grid>
                    {/* {link ? (
                    <Typography
                      variant="body1"
                      component={Link}
                      to={link}
                      color="primary"
                    >
                      {link}
                    </Typography>
                  ) : null} */}
                  </Paper>
                </Grid>
                {index !== listItems.length - 1 && (
                  <hr className={classes.invisibleSeparator} />
                )}
              </Fragment>
            );
          }
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
