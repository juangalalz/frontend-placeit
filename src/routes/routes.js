import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from '../App';
import Home from '../pages/home';
import Reservations from '../pages/reservations';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path= "/" component= { Home }/>
            <Route exact path= "/reservas" component= { Reservations }/>
            <Redirect from='*' to='/' />
        </Switch>
    </App>

export default AppRoutes;
