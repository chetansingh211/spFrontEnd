import React from 'react';
import { Route, Redirect } from "react-router-dom";

import { getToken } from '../utils/utility';

//import  UnauthorizedPage from './components/Confirm/UnauthorizedPage';

export const PrivateRoute = ({ component: Component, permission, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            getToken() === null
              ? <Redirect
                    to={{
                        pathname: "/sign_in",
                        state: { from: props.location }
                    }}/>
                  : <Component {...props} />
            )
        }
    />
)