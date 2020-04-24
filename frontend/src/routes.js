import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ReadPost from './pages/ReadPost';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/posts/:id" component={ReadPost} />
            </Switch>
        </BrowserRouter>
    );
}