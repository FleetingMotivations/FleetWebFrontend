import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import RoomSelect from './containers/RoomSelect';
import Room from './containers/Room';

export default 
<Route path="/" component={App}> 
	<IndexRoute component={Home}/>

	<Route path="/login" component={Login}></Route>
	<Route path="/roomSelect" component={RoomSelect}></Route>
	<Route path="/:building/:room" component={Room}> </Route>

</Route>