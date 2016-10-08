const initialState = {
	isFetching: false,
	sessions: [],
	fetchError: null 
}

export default function sessionHistory(state = initialState, action) {
	switch(action.type) {
		case 'REQUEST_SESSION_HISTORY':
			return Object.assign({}, state, {isFetching: true })

		case 'RECEIVE_SESSION_HISTORY':

			if(action.error) 
			{
				return {
					isFetching: false,
					fetchError: action.error
				}
			}
			else
			{
				return Object.assign({}, state, {
					isFetching: false,
					sessions: action.history,
				}) 
			}

		default:
			return state

	}
}