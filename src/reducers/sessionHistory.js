const initialState = {
	isFetching: false,
	sessions:
			[
			  {
			    "room": {
			      "name": "sample string 1",
			      "id": 2
			    },
			    "started": "2016-10-06T10:30:29.7525594+11:00",
			    "id": 2
			  },
			  {
			    "room": {
			      "name": "sample string 1",
			      "id": 2
			    },
			    "started": "2016-10-06T10:30:29.7525594+11:00",
			    "id": 1
			  }
			],
	fetchingSessionDetails: false,
	selectedSession:{
					  "started": "2016-10-06T10:30:29.341618+11:00",
					  "ended": "2016-10-06T10:30:29.341618+11:00",
					  "duration": 3,
					  "allowedApplications": [
					    {
					      "name": "sample string 1",
					      "id": 1
					    },
					    {
					      "name": "sample string 1",
					      "id": 2
					    }
					  ],
					  "room": {
					    "name": "sample string 1",
					    "id": 2
					  },
					  "workstations": [
					    {
					      "lastSeen": "2016-10-06T10:30:29.3456309+11:00",
					      "identifier": "sample string 1",
					      "topXRoomOffset": 2.1,
					      "topYRoomOffset": 3.1,
					      "available": true,
					      "colour": "sample string 5",
					      "name": "sample string 6",
					      "id": 6
					    },
					    {
					      "lastSeen": "2016-10-06T10:30:29.3456309+11:00",
					      "identifier": "sample string 1",
					      "topXRoomOffset": 2.1,
					      "topYRoomOffset": 3.1,
					      "available": true,
					      "colour": "sample string 5",
					      "name": "sample string 6",
					      "id": 7
					    }
					  ]
					},
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