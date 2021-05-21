import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../redux/reducers/userReducer';
import tripReducer from '../redux/reducers/tripReducer';
import errorsReducer from '../redux/reducers/errorsReducer';

const reducers = combineReducers({
  user: userReducer,
  trip: tripReducer,
  errors: errorsReducer,
});

function render(
  ui: React.ReactElement,
  {
    initialState,
    store = createStore(
      reducers,
      initialState,
      compose(applyMiddleware(thunk))
    ),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
