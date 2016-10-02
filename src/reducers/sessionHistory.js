import { 
	REQUEST_SESSION_HISTORY,
	RECEIVE_SESSION_HISTORY, 
	SELECT_PREV_SESSION 
} from '../constants/ActionTypes';

const initialState = {
	isFetching: false,
	sessions: null,
	fetchError: null 
}

export default function sessionHistory(state = initialState, action) {
	switch(action.type) {
		case REQUEST_SESSION_HISTORY:
			return {
				isFetching: true,
				sessions: null,
				fetchError: null
			}

		case RECEIVE_SESSION_HISTORY:

			if(action.error) 
			{
				return {
					isFetching: false,
					sessions: [{building: 0, room: 1, duration:'10h'},
								{building: 0, room: 2, duration:'1h'},
								{building: 0, room: 3, duration:'45m'}],
					fetchError: action.error
				}
			}
			else
			{
				return {
					isFetching: false,
					sessions: action.sessions,
					fetchError: null
				}
			}

		default:
			return state

	}
}