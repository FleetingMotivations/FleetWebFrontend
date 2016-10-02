import { 
	SELECT_BUILDING,
	DESELECT_BUILDING,
	COMMIT_BUILDING_SELECTION,
	SELECT_ROOM,
	DESELECT_ROOM,
	COMMIT_ROOM_SELECTION,
	START_SESSION,
	END_SESSION,
	ADD_WORKSTATION,
	REMOVE_WORKSTATION,
	DISABLE_WORKSTATION,
	DISABLE_WORKSTATIONS
} from '../constants/ActionTypes';

const initialState = {
	started: false,
	startTime: null,
	endTime: null,

	selectedBuildingId: null,
	selectedRoomId: null,
	roomCommited: false,
	buildingCommited: false,

	workstations: [
		{name: 'Name1', id: '123', status: 'active',   top: '20%', left: '20%', inWorkgroup: true, selected: false},
		{name: 'Name2', id: '124', status: 'inactive', top: '20%', left: '30%', inWorkgroup: true, selected: false},
		{name: 'Name3', id: '125', status: 'offline',  top: '30%', left: '40%', inWorkgroup: true, selected: false },
		{name: 'Name4', id: '126', status: 'offline',  top: '30%', left: '60%', inWorkgroup: false, selected: false },
		{name: 'Name5', id: '127', status: 'active',   top: '20%', left: '70%', inWorkgroup: false, selected: false },
		{name: 'Name6', id: '128', status: 'inactive', top: '20%', left: '80%', inWorkgroup: false, selected: false },
	],

	workgroup: [
		{name: 'Name1', id: '123', status: 'active', top: '50%', left: '50%'},
		{name: 'Name2', id: '124', status: 'inactive', top: '20%', left: '15%'},
		{name: 'Name3', id: '125', status: 'offline' , top: '30%', left: '30%' }
	],

	applications: [  {name: 'App 1', status: 'running'}, {name: 'App 2', status: 'closing'}, {name: 'App 3', status: 'closed'}],
	buildings: [{id:'ICT', name:'ICT'},{id:'EE', name:'EE'},{id:'EA', name:'EA'}],
	rooms: [{id:'RM123', name: 'RM123'}, {id:'RM124', name: 'RM124'}, {id:'RM125', name: 'RM125'}, {id:'RM126', name: 'RM126'}]
}

export default function session(state = initialState, action) {
	switch(action.type) {

		case SELECT_BUILDING:
			return Object.assign({}, state, {
				selectedBuildingId: action.buildingId
			})
			
		case DESELECT_BUILDING:
			return Object.assign({}, state, {
				selectedBuildingId: null,
				buildingCommited: false
			})

		case COMMIT_BUILDING_SELECTION:
			return Object.assign({}, state, {
				buildingCommited: true
			})	

		case SELECT_ROOM:
			return Object.assign({}, state, {
				selectedRoomId: action.roomId
			})

		case DESELECT_ROOM:
			return Object.assign({}, state, {
				selectedRoomId: null,
				roomCommited: false
			})

		case COMMIT_ROOM_SELECTION: 
			return Object.assign({}, state, {
				roomCommited: true
			})
			
		case START_SESSION:
			return state

		case END_SESSION:
			return state

		case ADD_WORKSTATION:
			return state

		case REMOVE_WORKSTATION:
			return state

		case DISABLE_WORKSTATION:
			return state

		case DISABLE_WORKSTATIONS:
			return state

		default:
			return state

	}
}