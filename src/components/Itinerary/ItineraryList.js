import React, { useEffect, useState, Fragment, useMemo } from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Redux
import { useSelector } from 'react-redux';

// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Header from '../Header/Header';
import CreateItineraryItem from './CreateItineraryItem';
import DeleteItineraryItem from './DeleteItineraryItem';
// import EditItineraryItem from './EditItineraryItem';

import colorAssignment from '../../utility/colorAssignment';
import SaveItineraryOrderButton from './SaveItineraryOrderButton';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function ItineraryList(props) {
  const classes = useStyles();

  // reorderedItinerary is initially an empty object
  // itinerary items are initially sorted by createdAt date on the back end
  // if a user has saved a reordered itinerary, an indexed object is saved in the Trip document with the new order
  // if reorderedItinerary exists, that is used to display itineraryItems
  const { tripID, itinerary, reorderedItinerary } = props;

  const loggedInUserHandle = useSelector(
    (state) => state.user.credentials.handle
  );
  const members = useSelector((state) => state.data.trip.members);

  const [itineraryItems, updateItineraryItems] = useState();
  const [localReorderedItinerary, updateLocalReorderedItinerary] = useState();

  useEffect(() => {
    if (reorderedItinerary && Object.keys(reorderedItinerary).length !== 0) {
      console.log('reorder use effect');
      updateLocalReorderedItinerary(Object.values(reorderedItinerary));
    } else {
      console.log('normal use effect');
      updateItineraryItems(itinerary);
    }
  }, [itinerary, reorderedItinerary]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    else if (
      reorderedItinerary &&
      Object.keys(reorderedItinerary).length !== 0
    ) {
      const items = Object.values(localReorderedItinerary);
      console.log('in else if', items, reorderedItinerary);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      updateLocalReorderedItinerary(items);
    } else {
      const items = Array.from(itineraryItems);
      console.log('in else', items, reorderedItinerary);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      updateItineraryItems(items);
    }
  };

  console.log('ran iList', localReorderedItinerary, reorderedItinerary);

  let reorderedDisplay;

  if (localReorderedItinerary) {
    reorderedDisplay = Object.values(localReorderedItinerary).map(
      ({ itineraryItemID, body, userHandle }, index) => {
        const userColor = colorAssignment(
          loggedInUserHandle,
          members,
          userHandle
        );
        return (
          <Draggable
            key={itineraryItemID}
            draggableId={itineraryItemID}
            index={index}
          >
            {(provided) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={classes.itineraryListItem}
              >
                <Grid container>
                  <Grid item xs={11}>
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
                  </Grid>
                  <Grid item xs={11}>
                    <Typography>{body}</Typography>
                  </Grid>
                  {/* <Grid item xs={1}>
          <EditItineraryItem
            tripID={tripID}
            itineraryItemID={itineraryItemID}
            itineraryBody={body}
          />
        </Grid> */}
                  {loggedInUserHandle === userHandle ? (
                    <Grid item xs={1}>
                      <DeleteItineraryItem
                        tripID={tripID}
                        itineraryItemID={itineraryItemID}
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </li>
            )}
          </Draggable>
        );
      }
    );
  }

  return (
    <Fragment>
      <Header headerTitle="Itinerary" />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="itineraryList">
          {(provided) => (
            <ul
              className={classes.itineraryList}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {localReorderedItinerary
                ? reorderedDisplay
                : itineraryItems?.map(
                    ({ itineraryItemID, body, userHandle }, index) => {
                      const userColor = colorAssignment(
                        loggedInUserHandle,
                        members,
                        userHandle
                      );
                      return (
                        <Draggable
                          key={itineraryItemID}
                          draggableId={itineraryItemID}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={classes.itineraryListItem}
                            >
                              <Grid container>
                                <Grid item xs={11}>
                                  {userColor === 'primary' ||
                                  userColor === 'secondary' ? (
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
                                </Grid>
                                <Grid item xs={11}>
                                  <Typography>{body}</Typography>
                                </Grid>
                                {/* <Grid item xs={1}>
                              <EditItineraryItem
                                tripID={tripID}
                                itineraryItemID={itineraryItemID}
                                itineraryBody={body}
                              />
                            </Grid> */}
                                {loggedInUserHandle === userHandle ? (
                                  <Grid item xs={1}>
                                    <DeleteItineraryItem
                                      tripID={tripID}
                                      itineraryItemID={itineraryItemID}
                                    />
                                  </Grid>
                                ) : null}
                              </Grid>
                            </li>
                          )}
                        </Draggable>
                      );
                    }
                  )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <CreateItineraryItem tripID={tripID} />
      <SaveItineraryOrderButton
        tripID={tripID}
        itineraryItems={
          reorderedItinerary && Object.keys(reorderedItinerary).length !== 0
            ? localReorderedItinerary
            : itineraryItems
        }
      />
    </Fragment>
  );
}

export default ItineraryList;
