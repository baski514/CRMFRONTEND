import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  const auth = localStorage.getItem('access_token')
  debugger;
  console.log("Auth",auth)
  return (
    <Route
      {...rest}
      render={props =>
        auth!==null ? <Component {...props} />
          : <Redirect
              to={{
                pathname: '/signin',
                state: {from: props.location},
              }}
            />}
    />
  );
};

export default PrivateRoute;
