import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/** Here we want to import reducers from this reducers folder **/
import user from './user';
import sessionHistory from './sessionHistory';
import session from './session';

const fleetAppReducer = combineReducers({
	user,
	sessionHistory,
	session,
	routing: routerReducer
})

const rootReducer = (state, action) => {

	switch(action.type)
	{
		case 'LOGOUT': {
			state = undefined
			
		} break;

		default:

	}

	return fleetAppReducer(state, action)
}

const fleetApp = rootReducer;

export default fleetApp;