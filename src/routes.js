/** 
	React Router implements url path page routing
	requireAuthentication(..) is called to check if a user has logged into the session and 
	redirects the user to login if they don't have access
**/

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Admin from './containers/Admin';
import Home from './containers/Home';
import Login from './containers/Login';
import CampusSelect from './containers/CampusSelect';
import BuildingSelect from './containers/BuildingSelect';
import RoomSelect from './containers/RoomSelect';
import WorkstationSelect from './containers/WorkstationSelect';
import Session from './containers/Session';
import { requireAuthentication } from './containers/requireAuthentication';

export default 
<Route path="/" component={App}> 
	<IndexRoute component={requireAuthentication(Home)}/>
	<Route path="/login" component={Login}></Route>
	<Route path="/campusSelect" component={requireAuthentication(CampusSelect)}></Route>
	<Route path="/buildingSelect" component={requireAuthentication(BuildingSelect)}></Route>
	<Route path="/roomSelect" component={requireAuthentication(RoomSelect)}></Route>
	<Route path="/workstationSelect" component={requireAuthentication(WorkstationSelect)}> </Route>
	<Route path="/session" component={requireAuthentication(Session)}> </Route>
	<Route path="/admin" component={requireAuthentication(Admin, true)}></Route>
</Route>