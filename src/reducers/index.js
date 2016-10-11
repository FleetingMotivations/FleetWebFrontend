/* 
 * Description: Combines and applies all the redux reducers in the reducers directory
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import sessionHistory from './sessionHistory';
import session from './session';

const fleetAppReducer = combineReducers({
	user,
	sessionHistory,
	session,
	routing: routerReducer
})

/** 
	We apply rootReducer before returning the fleetAppReducer so 
	we can catch actions like logout, where we need to reset the app 
	state stored in persistence. 
**/
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