import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Header from '../Header/Header';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function ItineraryList(props) {
  const classes = useStyles();

  const { itinerary } = props;

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
    <div>
      <header>
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
                          <Typography>{body}</Typography>
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
      </header>
    </div>
  );
}

export default ItineraryList;
