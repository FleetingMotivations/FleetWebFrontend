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
	isFetching: false,
	sessions: [],
	fetchingSessionDetails: false,
	selectedSession:null,
	fetchError: null 
}

/** Redux sessionHistory reducer returns new state applied as a result of application actions **/ 
export default function sessionHistory(state = initialState, action) {
	switch(action.type) {
		case 'REQUEST_SESSION_HISTORY':
			return Object.assign({}, state, {isFetching: true, fetchError: false })

		case 'RECEIVE_SESSION_HISTORY':
			if(action.error) {
				return Object.assign({}, state, {isFetching: false, fetchError: action.error })
			} 

			return Object.assign({}, state, {isFetching: false, sessions: action.history, })

		case 'REQUEST_SESSION_DETAILS':
			return Object.assign({}, state, {fetchingSessionDetails: true, fetchError: false})


		case 'RECEIVE_SESSION_DETAILS':
			if(action.error) {
				return Object.assign({}, state, {fetchingSessionDetails: false, fetchError: action.error})
			} 

			let sessionDetails = action.sessionDetails;

			sessionDetails.workstations = sessionDetails.workstations.map(w => {
				w.inWorkgroup = true;
				return w; 
			})

			return Object.assign({}, state, {fetchingSessionDetails: false, selectedSession: sessionDetails})

		case 'REMOVE_PREVIOUS_SESSION_DETAILS':
			return Object.assign({}, state, {selectedSession: null})

		default:
			return state
	}
}