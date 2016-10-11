/* 
 * Description: Redux reducer for getting previous sessions
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */

/* initialState for when application loads with no persisted state */
const initialState = {
	loggedIn: false,
	loginError: false,
	username: '',
	password: '',
	userId: null,
	firstname: null,
	lastname: null,
	token: null,
	tokenExpiry: null
}

/** Redux user reducer returns new state applied as a result of application actions **/ 
export default function user(state = initialState, action) {
	switch(action.type) {
		
		case 'SET_USERNAME':
			return Object.assign({}, state, {
				username: action.username
			})	

		case 'SET_PASSWORD':
			return Object.assign({}, state, {
				password: action.password
			})	

		case 'REQUEST_LOGIN':
			return Object.assign({}, state, {loginError: false})
			
		case 'RECEIVE_LOGIN_RESULT':

			if(action.success) {
				return Object.assign({}, state, {
					loggedIn: true,
					firstname: action.result.firstname,
					lastname: action.result.lastname,
					username: action.result.username,
					token: action.result.token,
					tokenExpiry: action.result.expires,
					userId: action.result.userId
				})	
			}

			return Object.assign({}, state, {loginError: true})

		case 'LOGOUT':
				return initialState // on logout we return the initial state to reset
		
		default:
			return state

	}
}
