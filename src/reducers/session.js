import moment from 'moment';

const workstationInitialStatePart = {
	canShare: false,
	inWorkgroup: false,
	requestDisable: false,
	requestEnable: false,
	requestRemoveFromWorkgroup: false,
	requestAddToWorkgroup: false
}

const initialState = {
	id: null,

	started: false,
	endTime: null,
	countDown: '',
	fetchError: false,

	selectedCampusId: null,
	selectedBuildingId: null,
	selectedRoomId: null,
	campusCommited: false,
	buildingCommited: false,
	roomCommited: false,

	fetchingCampuses: false,
	fetchingBuildings: false,
	fetchingRooms: false,
	fetchingWorkstations: false,

	creatingFromPrevious: false,
	createFailed: false,

	requestingStart: false,
	requestFailed: false,

	allSharingDisabled: false,

	workstations: [
	{
		"lastSeen": "2016-10-06T10:30:30.8524639+11:00",
		"identifier": "sample string 1",
		"topXRoomOffset": 20.1,
		"topYRoomOffset": 3.1,
		"available": true,
		"colour": "sample string 5",
		"name": "sample string 6",
		"id": 7,
		canShare: false,
		inWorkgroup: false
	},
	{
		"lastSeen": "2016-10-06T10:30:30.8524639+11:00",
		"identifier": "sample string 1",
		"topXRoomOffset": 2.1,
		"topYRoomOffset": 3.1,
		"available": true,
		"colour": "sample string 5",
		"name": "sample string 6",
		"id": 6,
		canShare: true,
		inWorkgroup: true,
	}
	],

	workgroup: [6],

	selectedWorkstations:[],

	campuses: [{id:0, name:'test'},{id:1, name:'Singapore'},{id:2, name:'Callaghan'}],
	buildings: [{id:'ICT', name:'ICT'},{id:'EE', name:'EE'},{id:'EA', name:'EA'}],
	rooms: [{id:'RM123', name: 'RM123'}, {id:'RM124', name: 'RM124'}, {id:'RM125', name: 'RM125'}, {id:'RM126', name: 'RM126'}]
}

export default function session(state = initialState, action) {

	var givenWorkstation = null;
	if(action && action.workstationId) {
		givenWorkstation = state.workstations.find(w => {return w.id === action.workstationId});
	}

	switch(action.type) {

		case 'CREATE_SESSION_FROM_PREVIOUS':
			return Object.assign({}, state, {creatingFromPrevious: true, createFailed: false })

		case 'CREATING_SESSION_FROM_PREVIOUS_FAILED':
			return Object.assign({}, state, {creatingFromPrevious: false, createFailed: true })
			
		case 'REQUEST_CAMPUSES':
			return Object.assign({}, state, {fetchingCampuses: true })

		case 'RECEIVE_CAMPUSES':
			if(action.error) {
				return Object.assign({}, state, {fetchError: true, fetchingCampuses: false })
			}
			return Object.assign({}, state, {fetchingCampuses: false, campuses: action.campuses })
	
		case 'SELECT_CAMPUS':
			return Object.assign({}, state, {selectedCampusId: action.campusId })

		case 'DESELECT_CAMPUS':
			return Object.assign({}, state, {selectedCampusId: null, campusCommited: false })

		case 'COMMIT_CAMPUS_SELECTION':
			return Object.assign({}, state, {campusCommited: true })

		case 'REQUEST_BUILDINGS':
			return Object.assign({}, state, {fetchingBuildings: true });

		case 'RECEIVE_BUILDINGS':
			if(action.error) {
				return Object.assign({}, state, {fetchError: true, fetchingBuildings: false })
			}
			return Object.assign({}, state, {fetchingBuildings: false, buildings: action.buildings })
	
		case 'SELECT_BUILDING':
			return Object.assign({}, state, {selectedBuildingId: action.buildingId })
			
		case 'DESELECT_BUILDING':
			return Object.assign({}, state, {selectedBuildingId: null, buildingCommited: false })

		case 'COMMIT_BUILDING_SELECTION':
			return Object.assign({}, state, {buildingCommited: true })

		case 'REQUEST_ROOMS':
			return Object.assign({}, state, {fetchingRooms: true });

		case 'RECEIVE_ROOMS':
			if(action.error) {
				return Object.assign({}, state, {fetchError: true, fetchingRooms: false })
			}
			return Object.assign({}, state, {fetchingRooms: false, buildings: action.buildings })

		case 'SELECT_ROOM':
			return Object.assign({}, state, {selectedRoomId: action.roomId })

		case 'DESELECT_ROOM':
			return Object.assign({}, state, {selectedRoomId: null, roomCommited: false })

		case 'COMMIT_ROOM_SELECTION': 
			return Object.assign({}, state, {roomCommited: true })

		case 'REQUEST_WORKSTATIONS':
			return Object.assign({}, state, {fetchingWorkstations: true })

		case 'RECEIVE_WORKSTATIONS':
			if(action.error) {
				return Object.assign({}, state, {fetchError: true, fetchingWorkstations: false })
			}
			return Object.assign({}, state, {
				fetchingWorkstations: false,
				workstations: action.workstations.map(w => {
					return {...w, ...workstationInitialStatePart}
				}) 
			})

		case 'SELECT_WORKSTATION':

			var selectedWorkstations = state.selectedWorkstations.slice();
			
			if(!givenWorkstation || givenWorkstation.selected
			|| !givenWorkstation.available
			|| selectedWorkstations.find(w => {w.id === givenWorkstation.id}))
			{
				return state;
			}
			givenWorkstation.selected = true;

			var workstations = state.workstations.filter(w => {return w.id !== givenWorkstation.id })

			workstations.push(givenWorkstation);
			selectedWorkstations.push(givenWorkstation.id);

			return Object.assign({}, state, {selectedWorkstations, workstations })

		case 'DESELECT_WORKSTATION':
			if(!givenWorkstation || !givenWorkstation.selected) {
				return state;
			}

			givenWorkstation.selected = false;

			var selectedWorkstations = state.selectedWorkstations.filter((w)=>{return w !== givenWorkstation.id })
			var workstations = state.workstations.filter((w)=>{ return w.id !== givenWorkstation.id })

			workstations.push(givenWorkstation);

			return Object.assign({}, state, {selectedWorkstations, workstations })

		case 'SELECT_ALL_WORKSTATIONS':
			var workstations = state.workstations.map(w =>{
				if(w.available) {
					return {...w, selected: true }
				}

				return {...w };
			});

			var selectedWorkstations = workstations.filter((w)=>{return w.available}).map((w)=>{return w.id});

			return Object.assign({}, state, {selectedWorkstations, workstations })


		case 'DESELECT_ALL_WORKSTATIONS':
			var workstations = state.workstations.map(w =>{return {...w, selected: false } });

			return Object.assign({}, state, {selectedWorkstations: [], workstations })
		
		case 'SELECT_END_TIME':

			return Object.assign({}, state, { endTime: action.time })

		case 'REQUEST_START_SESSION':
			return Object.assign({}, state, { 
				roomCommited: true,
				requestingStart: true,
				requestFailed: false
			})
			 
		case 'RECEIVE_START_SESSION_RESPONSE':
			if(action.error) {
				return Object.assign({}, state, { 
					requestingStart: false,
					requestFailed: true
				})	
			} else {
				if(action.success) {					
					return Object.assign({}, state, { 
						started: true,
						requestingStart: false,
						requestFailed: false,
						id: action.result.id,
						workgroup: selectedWorkstations.slice(),
						selectedWorkstations:[]
					})
				} else {
					return Object.assign({}, state, { 
						requestingStart: false,
						requestFailed: true
					})	
				}
			}

		case 'REQUEST_ENABLE_WORKSTATION':

			var workstations = state.workstations.map(w => {
				if(w.id === action.workstationId) {
					return {...w, requestEnable: true}
				}			
				return w;
			})

			return Object.assign({}, state, {workstations})


		case 'RESPONSE_ENABLE_WORKSTATION':
			
			if(!givenWorkstation || !givenWorkstation.requestEnable) {
				return state;
			}

			givenWorkstation.requestEnable = false;
			givenWorkstation.selected = false;

			if(!action.error) {
				 givenWorkstation.canShare = action.success
			}

			var selectedWorkstations = state.selectedWorkstations.filter(id => {return id !== givenWorkstation.id})

			var workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}			
				return w;
			})
			
			return Object.assign({}, state, {workstations, selectedWorkstations})


		case 'REQUEST_DISABLE_WORKSTATION':
			var workstations = state.workstations.map(w => {
				if(w.id === action.workstationId) {
					return {...w, requestDisable: true}
				}			
				return w;
			})

			return Object.assign({}, state, {workstations})

		case 'RESPONSE_DISABLE_WORKSTATION':
			if(!givenWorkstation || !givenWorkstation.requestDisable) {
				return state;
			}

			givenWorkstation.requestDisable = false;
			givenWorkstation.selected = false;

			if(!action.error) {
				givenWorkstation.canShare = !action.success
			}

			var selectedWorkstations = state.selectedWorkstations.filter(id => {return id !== givenWorkstation.id})

			var workstations = state.workstations.map(w =>{
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}
				return w;
			});

			return Object.assign({}, state, {workstations, selectedWorkstations})

		case 'REQUEST_ENABLE_ALL_WORKSTATIONS':

			var workstations = state.workstations.map(w => {
				var wi = state.workgroup.find(id => {return id === w.id})	

				if(wi >= 0){
					return {...w, requestEnable: true} 
				}

				return w
			})

			return Object.assign({}, state, {workstations})

		case 'RESPONSE_ENABLE_ALL_WORKSTATIONS':

			var workstations = state.workstations.map(w => {
				var wi = state.workgroup.find(id => {return id === w.id})	

				if(wi >= 0){
					var nw = {...w, requestEnable: false}

					if(action.success) {
						nw.canShare = true
					}
					
					return nw;
				}

				return w
			})

			var allSharingDisabled = state.allSharingDisabled;

			if(!action.error){
				allSharingDisabled = aciton.success;
			}

			return Object.assign({}, state, {
				workstations,
				allSharingDisabled
			})

		case 'REQUEST_DISABLE_ALL_WORKSTATIONS':
			var workstations = state.workstations.map(w => {
				var wi = state.workgroup.find(id => {return id === w.id})	

				if(wi >= 0){
					return {...w, requestDisable: true} 
				}

				return w
			})

			return Object.assign({}, state, {workstations})

		case 'RESPONSE_DISABLE_ALL_WORKSTATIONS':
			var workstations = state.workstations.map(w => {
				var wi = state.workgroup.find(id => {return id === w.id})	

				if(wi >= 0){
					var nw = {...w, requestDisable: false}
					if(action.success) {
						nw.canShare = true;
					}
					return nw;
				}			
				return w;
			})

			var allSharingDisabled = state.allSharingDisabled;

			if(!action.error){
				allSharingDisabled = !aciton.success;
			}

			return Object.assign({}, state, {
				workstations,
				allSharingDisabled
			})

		case 'REQUEST_ADD_WORKSTATION_TO_WORKGROUP':
			if(!givenWorkstation || givenWorkstation.inWorkgroup){
				return state;
			}

			var workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return {...w, requestAddToWorkgroup: true }
				}

				return {...w};
			})
			
			return Object.assign({}, state, {workstations})

		case 'RESPONSE_ADD_WORKSTATION_TO_WORKGROUP':

			if(!givenWorkstation || givenWorkstation.inWorkgroup) {
				return state;
			}

			var workgroup = state.workgroup.slice();

			givenWorkstation.requestAddToWorkgroup = false
			givenWorkstation.selected = false

			if(!action.error) {
				givenWorkstation.inWorkgroup = action.success

				if(action.success){
					workgroup.push(givenWorkstation.id)
				}
			}

			var selectedWorkstations = state.selectedWorkstations.filter(id => {return id !== givenWorkstation.id})

			var workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}
				return w;
			})
			
			return Object.assign({}, state, {workstations, workgroup, selectedWorkstations })

		
		case 'REQUEST_REMOVE_WORKSTATION_FROM_WORKGROUP':
			if(!givenWorkstation || !givenWorkstation.inWorkgroup){
				return state;
			}

			var workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return {...w, requestRemoveFromWorkgroup: true}
				}

				return {...w};
			})	
			
			return Object.assign({}, state, {workstations})

		
		case 'RESPONSE_REMOVE_WORKSTATION_FROM_WORKGROUP':
			if(!givenWorkstation || !givenWorkstation.inWorkgroup) {
				return state;
			}

			var workgroup = state.workgroup.slice();

			givenWorkstation.requestRemoveFromWorkgroup = false
			givenWorkstation.selected = false

			if(!action.error){
				givenWorkstation.inWorkgroup = !action.success;

				if(action.success) {
					workgroup = workgroup.filter(id => {return id !== givenWorkstation.id})
				}
			}

			var selectedWorkstations = state.selectedWorkstations.filter(id => {return id !== givenWorkstation.id})

			var workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}

				return w
			})
		
			return Object.assign({}, state, {workstations, workgroup, selectedWorkstations })

		case 'TIMER_COUNTDOWN':
			if(state.endTime) {
				var totalSec = state.endTime.diff(moment(), 'seconds');
				var hours = parseInt( totalSec / 3600 ) % 24;
				var minutes = parseInt( totalSec / 60 ) % 60;
				var seconds = totalSec % 60;

				var result = (hours < 10 ? "0" + hours : hours) + "-" + (minutes < 10 ? "0" + minutes : minutes) + "-" + (seconds  < 10 ? "0" + seconds : seconds);

	    		return Object.assign({}, state, {
					countDown: result
				})
			}

			return state;

		case 'END_SESSION':
				return initialState

		default:
			return state

	}
}