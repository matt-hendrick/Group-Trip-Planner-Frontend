import React, { useEffect, useState, Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Header from '../Header/Header';
import CreateItineraryItem from './CreateItineraryItem';
import DeleteItineraryItem from './DeleteItineraryItem';
import EditItineraryItem from './EditItineraryItem';
// import ItineraryDateTimePicker from './ItineraryDateTimePicker';

// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function ItineraryList(props) {
  const classes = useStyles();

  const { tripID, itinerary } = props;

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
              {itineraryItems?.map(({ itineraryItemID, body }, index) => {
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
                          <Grid item xs={10}>
                            <Typography>{body}</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <EditItineraryItem
                              tripID={tripID}
                              itineraryItemID={itineraryItemID}
                              itineraryBody={body}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <DeleteItineraryItem
                              tripID={tripID}
                              itineraryItemID={itineraryItemID}
                            />
                          </Grid>
                        </Grid>
                      </li>
                    )}
                  </Draggable>
                );
              })}
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
