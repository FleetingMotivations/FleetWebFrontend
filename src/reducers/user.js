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
				return initialState
		
		default:
			return state

	}
}
