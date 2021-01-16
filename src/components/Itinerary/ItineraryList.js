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

import colorAssignment from '../../utility/colorAssignment';
import SaveItineraryOrderButton from './SaveItineraryOrderButton';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function ItineraryList(props) {
  const classes = useStyles();

  const { tripID, reorderedItinerary } = props;

  const loggedInUserHandle = useSelector(
    (state) => state.user.credentials.handle
  );
  const members = useSelector((state) => state.data.trip.members);

  const [localReorderedItinerary, updateLocalReorderedItinerary] = useState();

  useEffect(() => {
    if (reorderedItinerary && Object.keys(reorderedItinerary).length !== 0) {
      updateLocalReorderedItinerary(Object.values(reorderedItinerary));
    } else {
      updateLocalReorderedItinerary(reorderedItinerary);
    }
  }, [reorderedItinerary, tripID]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (reorderedItinerary && Object.keys(reorderedItinerary).length !== 0) {
      const items = Object.values(localReorderedItinerary);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      updateLocalReorderedItinerary(items);
    }
  };

  let reorderedDisplay;

  if (localReorderedItinerary) {
    reorderedDisplay = Object.values(localReorderedItinerary).map(
      ({ createdAt, body, userHandle }, index) => {
        const userColor = colorAssignment(
          loggedInUserHandle,
          members,
          userHandle
        );
        return (
          <Draggable key={createdAt} draggableId={createdAt} index={index}>
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
                  {loggedInUserHandle === userHandle ? (
                    <Grid item xs={1}>
                      <DeleteItineraryItem
                        tripID={tripID}
                        index={index}
                        itineraryItems={
                          reorderedItinerary &&
                          Object.keys(reorderedItinerary).length !== 0
                            ? localReorderedItinerary
                            : []
                        }
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
              {reorderedDisplay}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <CreateItineraryItem
        tripID={tripID}
        userHandle={loggedInUserHandle}
        itineraryItems={
          reorderedItinerary && Object.keys(reorderedItinerary).length !== 0
            ? localReorderedItinerary
            : []
        }
      />
      {reorderedItinerary && Object.keys(reorderedItinerary).length !== 0 ? (
        <SaveItineraryOrderButton
          tripID={tripID}
          itineraryItems={localReorderedItinerary}
        />
      ) : null}
    </Fragment>
  );
}

export default ItineraryList;
