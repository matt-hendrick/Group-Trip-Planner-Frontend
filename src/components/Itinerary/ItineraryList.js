import React, { useEffect, useState, Fragment } from 'react';

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

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function ItineraryList(props) {
  const classes = useStyles();

  const { tripID, itinerary } = props;

  const currentUserHandle = useSelector(
    (state) => state.user.credentials.handle
  );
  const members = useSelector((state) => state.data.trip.members);

  const [itineraryItems, updateItineraryItems] = useState();

  useEffect(() => {
    updateItineraryItems(itinerary);
  }, [itinerary]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(itineraryItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateItineraryItems(items);
  };

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
              {itineraryItems?.map(
                ({ itineraryItemID, body, userHandle }, index) => {
                  const userColor = colorAssignment(
                    currentUserHandle,
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
                            {currentUserHandle === userHandle ? (
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
    </Fragment>
  );
}

export default ItineraryList;
