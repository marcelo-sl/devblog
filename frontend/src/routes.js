import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

import Home from './pages/Home';
import ReadPost from './pages/ReadPost';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        { ...rest }
        render={props => (
        
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
            

        )}
    />
);

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/posts/:id" component={ReadPost} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

                <PrivateRoute path="/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
    );
}