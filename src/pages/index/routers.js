import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './containers/Home/Home';
import HomeInfo from './containers/HomeInfo/HomeInfo';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/homeDetail" component={HomeInfo} />
  </Switch>
);

export default Router;
