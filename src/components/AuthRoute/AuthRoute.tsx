import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Types
import { ReducerState } from '../../utility/sharedTypes';

interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>;
}

function AuthRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const authenticated = useSelector(
    (state: ReducerState) => state.user.authenticated
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
