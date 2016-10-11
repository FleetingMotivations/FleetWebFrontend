const initialState = {
	isFetching: false,
	sessions: [],
	fetchingSessionDetails: false,
	selectedSession:null,
	fetchError: null 
}

export default function sessionHistory(state = initialState, action) {
	switch(action.type) {
		case 'REQUEST_SESSION_HISTORY':
			return Object.assign({}, state, {isFetching: true, fetchError: false })

		case 'RECEIVE_SESSION_HISTORY':
			if(action.error) {
				return Object.assign({}, state, {isFetching: false, /*fetchError: action.error*/ })
			} 

			return Object.assign({}, state, {isFetching: false, sessions: action.history, })

		case 'REQUEST_SESSION_DETAILS':
			return Object.assign({}, state, {fetchingSessionDetails: true, fetchError: false})


		case 'RECEIVE_SESSION_DETAILS':
			if(action.error) {
				return Object.assign({}, state, {fetchingSessionDetails: false, /*fetchError: action.error*/})
			} 

			return Object.assign({}, state, {fetchingSessionDetails: false, selectedSession: action.session})

		case 'REMOVE_PREVIOUS_SESSION_DETAILS':
			return Object.assign({}, state, {selectedSession: null})

		default:
			return state
	}
}