import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Test from './containers/Test/Test';

const Router = (props) => (
	<Switch>
		<Route exact path="/info" component={Test} />
	</Switch>
);

export default Router;
