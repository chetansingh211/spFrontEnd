import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
//components

export default class AppRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => <Redirect to={{pathname: '/home'}} />}/>
                <Route path='*' render={() => <Redirect to={{pathname: '/home'}} />}/>
            </Switch>
        );
    }
}