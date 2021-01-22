import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import tripReducer from './reducers/tripReducer';
import errorsReducer from './reducers/errorsReducer';

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
  trip: tripReducer,
  errors: errorsReducer,
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
