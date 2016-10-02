import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/** Here we want to import reducers from this reducers folder **/
import user from './user';
import sessionHistory from './sessionHistory';
import session from './session';

const fleetApp = combineReducers({
	user,
	sessionHistory,
	session,
	routing: routerReducer
});

export default fleetApp;