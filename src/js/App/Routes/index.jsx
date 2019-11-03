import React, {Component, lazy} from 'react';
import {Switch, Route} from 'react-router-dom';

import asyncComponent from '../HOC/asyncComponent';

const Home = lazy(() => import('../Components/Home'));

const routes = [
  {path: '/', component: Home},
];

class Routes extends Component {
  render() {
    return (
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={asyncComponent(route.component)}
          />
        ))}
      </Switch>
    );
  }
}

export default Routes;
