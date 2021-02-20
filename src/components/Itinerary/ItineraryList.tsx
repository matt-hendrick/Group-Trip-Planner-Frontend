import React, { useEffect, useState, Fragment } from 'react';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

// Redux
import { useSelector } from 'react-redux';

// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles } from '@material-ui/core';

// Components
import Header from '../Header/Header';
import CreateItineraryItem from './CreateItineraryItem';
import DeleteItineraryItem from './DeleteItineraryItem';
import SaveItineraryOrderButton from './SaveItineraryOrderButton';

// Utility Functions
import colorAssignment from '../../utility/colorAssignment';

// Types
import { ReducerState, ItineraryItem } from '../../utility/sharedTypes';

interface Props {
  itineraryItems: ItineraryItem[];
  tripID: string;
}

const useStyles = makeStyles<Theme, object>((theme) => ({
  ...(theme.classes as object),
}));

function ItineraryList(props: Props) {
  const classes = useStyles();

  const [localItinerary, setLocalItinerary] = useState<ItineraryItem[]>([]);
  const [changed, setChanged] = useState(false);

  const { tripID, itineraryItems } = props;

  const loggedInUserHandle = useSelector(
    (state: ReducerState) => state.user.credentials.handle
  );
  const members = useSelector((state: ReducerState) => state.trip.trip.members);

  useEffect(() => {
    if (itineraryItems && Object.keys(itineraryItems).length !== 0) {
      setLocalItinerary(Object.values(itineraryItems));
      setChanged(false);
    } else {
      setLocalItinerary(itineraryItems);
      setChanged(false);
    }
  }, [itineraryItems, tripID]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (
      itineraryItems &&
      Object.keys(itineraryItems).length !== 0 &&
      localItinerary
    ) {
      const items = Object.values(localItinerary);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setLocalItinerary(items);
      setChanged(true);
    }
  };

  let itineraryItemsDisplay: null | React.ReactNode;

  if (localItinerary && loggedInUserHandle) {
    itineraryItemsDisplay = Object.values(localItinerary).map(
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
                      <Typography variant="body1" color={userColor}>
                        {userHandle}
                      </Typography>
                    ) : (
                      <Typography variant="body1" style={{ color: userColor }}>
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
                          itineraryItems &&
                          Object.keys(itineraryItems).length !== 0
                            ? localItinerary
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
              aria-label="Itinerary List"
              className={classes.itineraryList}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {itineraryItemsDisplay}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <CreateItineraryItem
        tripID={tripID}
        userHandle={loggedInUserHandle}
        itineraryItems={
          itineraryItems && Object.keys(itineraryItems).length !== 0
            ? localItinerary
            : []
        }
      />
      {itineraryItems && Object.keys(itineraryItems).length > 1 ? (
        <div>
          <br />
          <SaveItineraryOrderButton
            tripID={tripID}
            itineraryItems={localItinerary}
            changed={changed}
          />
        </div>
      ) : null}
    </Fragment>
  );
}

export default ItineraryList;
