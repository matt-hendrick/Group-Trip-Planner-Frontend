import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import userReducer from './reducers/userReducer';
import tripReducer from './reducers/tripReducer';
import errorsReducer from './reducers/errorsReducer';

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
  trip: tripReducer,
  errors: errorsReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
