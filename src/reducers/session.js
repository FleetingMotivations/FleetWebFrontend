import { 
	SELECT_CAMPUS,
	DESELECT_CAMPUS,
	COMMIT_CAMPUS_SELECTION,
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
	DISABLE_WORKSTATIONS,
	SELECT_WORKSTATION,
	DESELECT_WORKSTATION,
	SELECT_END_TIME,
	DESELECT_ALL_WORKSTATIONS,
	SELECT_ALL_WORKSTATIONS,
	COMMIT_SESSION
} from '../constants/ActionTypes';

const initialState = {
	started: false,
	startTime: null,
	endTime: null,

	selectedCampusId: null,
	selectedBuildingId: null,
	selectedRoomId: null,
	campusCommited: false,
	buildingCommited: false,
	roomCommited: false,

	workstations: [
		{id: '123', name: 'Name1', status: 'active',   top: '20%', left: '20%', inWorkgroup: true, selected: false},
		{id: '124', name: 'Name2', status: 'inactive', top: '20%', left: '30%', inWorkgroup: true, selected: false},
		{id: '125', name: 'Name3', status: 'offline',  top: '30%', left: '40%', inWorkgroup: true, selected: false },
		{id: '126', name: 'Name4', status: 'offline',  top: '30%', left: '60%', inWorkgroup: false, selected: false },
		{id: '127', name: 'Name5', status: 'active',   top: '20%', left: '70%', inWorkgroup: false, selected: false },
		{id: '128', name: 'Name6', status: 'inactive', top: '20%', left: '80%', inWorkgroup: false, selected: false },
	],

	workgroup: [
		{name: 'Name1', id: '123', status: 'active', top: '50%', left: '50%'},
		{name: 'Name2', id: '124', status: 'inactive', top: '20%', left: '15%'},
		{name: 'Name3', id: '125', status: 'offline' , top: '30%', left: '30%' }
	],

	selectedWorkstations:[],

	applications: [  {name: 'App 1', status: 'running'}, {name: 'App 2', status: 'closing'}, {name: 'App 3', status: 'closed'}],
	campuses: [{id:0, name:'test'},{id:1, name:'Singapore'},{id:2, name:'Callaghan'}],
	buildings: [{id:'ICT', name:'ICT'},{id:'EE', name:'EE'},{id:'EA', name:'EA'}],
	rooms: [{id:'RM123', name: 'RM123'}, {id:'RM124', name: 'RM124'}, {id:'RM125', name: 'RM125'}, {id:'RM126', name: 'RM126'}]
}

export default function session(state = initialState, action) {
	switch(action.type) {

		case SELECT_CAMPUS:
			return Object.assign({}, state, {
				selectedCampusId: action.campusId
			}) 

		case DESELECT_CAMPUS:
			return Object.assign({}, state, {
				selectedCampusId: null,
				campusCommited: false
			}) 

		case COMMIT_CAMPUS_SELECTION:
			return Object.assign({}, state, {
				campusCommited: true
			})	

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

		case SELECT_WORKSTATION:
			var filter = state.selectedWorkstations.filter((w)=>{return w === action.workstationId});

			if(filter.length > 0)
			{
				return state;
			}

			var workstations = state.workstations.map((workstation) =>{
				if(workstation.id === action.workstationId && !workstation.inWorkgroup)
				{
					return {
						...workstation,
						selected: true
					};
				}
				return {...workstation};
			});

			var selectedWorkstations = workstations.filter((w)=>{
				return w.selected
			}).map((w)=>{
				return w.id
			})

			return Object.assign({}, state, {
				selectedWorkstations: selectedWorkstations,
				workstations: workstations
			})

		case DESELECT_WORKSTATIONS:
			var selectedWorkstations = state.selectedWorkstations.slice();

		case SELECT_ALL_WORKSTATIONS:
			var workstations = state.workstations.map((workstation) =>{
				if(!workstation.inWorkgroup) {
					return {
						...workstation,
						selected: true
					}
				}

				return {...workstation };
			});

			var selectedWorkstations = workstations
											.filter((w)=>{return !w.inWorkgroup})
											.map((w)=>{return w.id});

			return Object.assign({}, state, {
				selectedWorkstations: selectedWorkstations,
				workstations: workstations
			})


		case DESELECT_ALL_WORKSTATIONS:
			var workstations = state.workstations.map((workstation) =>{
				return {
					...workstation,
					selected: false
				}
			});

			return Object.assign({}, state, {
				selectedWorkstations: [],
				workstations : workstations
			})

		
		case SELECT_END_TIME:
			return Object.assign({}, state, { endTime: action.time })

		case COMMIT_SESSION: 
			
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