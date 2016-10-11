/** Redux reducer for session setup and state **/ 


import moment from 'moment';

/** 
	workstationInitialStatePart is a const we use to apply 
	additional workstation details that are required for application state
	but do not exist when fetched from the server 
**/
const workstationInitialStatePart = {
	canShare: false,
	inWorkgroup: false,
	requestDisable: false,
	requestEnable: false,
	requestRemoveFromWorkgroup: false,
	requestAddToWorkgroup: false
}

/* This initialState is applied for when an application loads with no persistent session state */
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

	workstations: [], //Stores workstation data from server + workstationinitialStatePart

	workgroup: [], // ids array of workstations stored in workstations array

	selectedWorkstations:[], // ids array of workstations

	campuses: [],
	buildings: [],
	rooms: []
}

/** Redux session reducer returns new state applied as a result of application actions **/ 
export default function session(state = initialState, action) {

	/** 
		Common use case is sending workstationId, gets the workstation details rather than 
		accessing it every time in the following cases 
	**/
	var givenWorkstation = null;
	if(action && action.workstationId) {
		givenWorkstation = state.workstations.find(w => {return w.id === action.workstationId});
	}

	switch(action.type) {
		
		case 'CREATE_SESSION_FROM_PREVIOUS':{
			return Object.assign({}, state, {creatingFromPrevious: true, createFailed: false })

		}
		case 'CREATING_SESSION_FROM_PREVIOUS_FAILED':{
			return Object.assign({}, state, {creatingFromPrevious: false, createFailed: true })
			
		}
		case 'REQUEST_CAMPUSES':{
			return Object.assign({}, state, {fetchingCampuses: true })

		}
		case 'RECEIVE_CAMPUSES':{
			if(action.error) {
				return Object.assign({}, state, {fetchError: true, fetchingCampuses: false })
			}
			return Object.assign({}, state, {fetchingCampuses: false, campuses: action.campuses })
	
		}
		case 'SELECT_CAMPUS':{
			return Object.assign({}, state, {selectedCampusId: action.campusId })

		}
		case 'DESELECT_CAMPUS':{
			return Object.assign({}, state, {selectedCampusId: null, campusCommited: false })

		}
		case 'COMMIT_CAMPUS_SELECTION':{
			return Object.assign({}, state, {campusCommited: true })

		}
		case 'REQUEST_BUILDINGS':{
			return Object.assign({}, state, {fetchingBuildings: true });

		}
		case 'RECEIVE_BUILDINGS':{
			if(action.error) {
				return Object.assign({}, state, {fetchError: true, fetchingBuildings: false })
			}
			return Object.assign({}, state, {fetchingBuildings: false, buildings: action.buildings })
	
		}
		case 'SELECT_BUILDING':{
			return Object.assign({}, state, {selectedBuildingId: action.buildingId })
			
		}
		case 'DESELECT_BUILDING':{
			return Object.assign({}, state, {selectedBuildingId: null, buildingCommited: false })

		}
		case 'COMMIT_BUILDING_SELECTION':{
			return Object.assign({}, state, {buildingCommited: true })

		}
		case 'REQUEST_ROOMS':{
			return Object.assign({}, state, {fetchingRooms: true });

		}
		case 'RECEIVE_ROOMS':{
			if(action.error) {
				return Object.assign({}, state, {fetchError: true, fetchingRooms: false })
			}
			return Object.assign({}, state, {fetchingRooms: false, rooms: action.rooms })

		}
		case 'SELECT_ROOM':{
			return Object.assign({}, state, {selectedRoomId: action.roomId })

		}
		case 'DESELECT_ROOM':{
			return Object.assign({}, state, {selectedRoomId: null, roomCommited: false })

		}
		case 'COMMIT_ROOM_SELECTION': {
			return Object.assign({}, state, {roomCommited: true })

		}
		case 'REQUEST_WORKSTATIONS':{
			return Object.assign({}, state, {fetchingWorkstations: true })

		}
		case 'RECEIVE_WORKSTATIONS':{
			if(action.error) {
				return Object.assign({}, state, {fetchError: true, fetchingWorkstations: false })
			}
			return Object.assign({}, state, {
				fetchingWorkstations: false,
				workstations: action.workstations.map(w => {
					return {...w, ...workstationInitialStatePart}
				}) 
			})
		}

		case 'REQUEST_WORKSTATIONS_UPDATE':{
			return state;
		}
		case 'RESPONSE_WORKSTATIONS_UPDATE':{
			if(action.error) {
				return state;
			}

			// apply changes to workstations we have fetched
			let workstations = state.workstations.map(w => {
				/* 
					we only care if canShare and available have changed on workstations
					outside of our workgroup because we don't have control over them but want to
					update the workstations interface with their current status 
				*/
				var newW = action.response.find(f => r.id === w.id)

				return {
					...w,
					canShare: newW.sharingEnabled,
					available: newW.available
				}
			})			

			return Object.assign({}, state, { workstations })

		}
		case 'REQUEST_WORKGROUP_UPDATE':{
			return state;
		}
		case 'RESPONSE_WORKGROUP_UPDATE':{
			if(action.error) {
				return state;
			}

			let workstations = state.workstations.map(w => {
				var newW = action.response.find(f => f.id === w.id)

				return {
					...w,
					canShare: newW.sharingEnabled,
					available: newW.available,
					lastSeen: newW.lastSeen,
					inWorkgroup: true // we got it requesting an update of our workgroup, therefore always in our workgroup
				}
			})

			let workgroup = workstations.filter(w => w.inWorkgroup).map(w => {return w.id});

			return Object.assign({}, state, { workstations, workgroup })
		}

		case 'SELECT_WORKSTATION':{

			let selectedWorkstations = state.selectedWorkstations.slice();
			
			if(!givenWorkstation 
			||  givenWorkstation.selected
			|| (!givenWorkstation.available && !givenWorkstation.inWorkgroup)
			||  selectedWorkstations.find(id => id === givenWorkstation.id))
			{
				return state;
			}

			givenWorkstation.selected = true;

			let workstations = state.workstations.filter(w => w.id !== givenWorkstation.id)
			workstations.push(givenWorkstation);

			selectedWorkstations.push(givenWorkstation.id);

			return Object.assign({}, state, {selectedWorkstations, workstations })

		}
		case 'DESELECT_WORKSTATION':{
			if(!givenWorkstation || !givenWorkstation.selected) {
				return state;
			}

			givenWorkstation.selected = false;

			let selectedWorkstations = state.selectedWorkstations.filter(w => w !== givenWorkstation.id)
			let workstations = state.workstations.filter(w => w.id !== givenWorkstation.id)

			workstations.push(givenWorkstation);

			return Object.assign({}, state, {selectedWorkstations, workstations })

		}
		case 'SELECT_ALL_WORKSTATIONS':{
			let workstations = state.workstations.map(w =>{
				if(w.available) {
					return {...w, selected: true }
				}

				return w;
			});

			let selectedWorkstations = workstations.filter(w => w.available).map((w) =>{return w.id});

			return Object.assign({}, state, {selectedWorkstations, workstations })


		}
		case 'DESELECT_ALL_WORKSTATIONS':{
			let workstations = state.workstations.map(w =>{return {...w, selected: false } });

			return Object.assign({}, state, {selectedWorkstations: [], workstations })
		
		}
		case 'SELECT_END_TIME':{

			return Object.assign({}, state, { endTime: action.time })

		}
		case 'REQUEST_START_SESSION':{
			return Object.assign({}, state, { 
				roomCommited: true,
				requestingStart: true,
				requestFailed: false
			})
			 
		}
		case 'RECEIVE_START_SESSION_RESPONSE':{
			if(action.error) {
				return Object.assign({}, state, { 
					requestingStart: false,
					requestFailed: true
				})	
			}

			if(action.success) {					
				return Object.assign({}, state, { 
					started: true,
					requestingStart: false,
					requestFailed: false,
					id: action.result.id,
					workgroup: [],
					selectedWorkstations:[]
				})
			}
			return Object.assign({}, state, { 
				requestingStart: false,
				requestFailed: true
			})	
		}
		case 'REQUEST_ENABLE_WORKSTATION':{

			let workstations = state.workstations.map(w => {
				if(w.id === action.workstationId) {
					return {...w, requestEnable: true}
				}			
				return w;
			})

			return Object.assign({}, state, {workstations})


		}
		case 'RESPONSE_ENABLE_WORKSTATION':{
			
			if(!givenWorkstation || !givenWorkstation.requestEnable) {
				return state;
			}

			givenWorkstation.requestEnable = false;
			givenWorkstation.selected = false;

			if(!action.error) {
				 givenWorkstation.canShare = action.success
			}

			let selectedWorkstations = state.selectedWorkstations.filter(id => {return id !== givenWorkstation.id})

			let workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}			
				return w;
			})
			
			return Object.assign({}, state, {workstations, selectedWorkstations})


		}
		case 'REQUEST_DISABLE_WORKSTATION':{
			let workstations = state.workstations.map(w => {
				if(w.id === action.workstationId) {
					return {...w, requestDisable: true}
				}			
				return w;
			})

			return Object.assign({}, state, {workstations})

		}
		case 'RESPONSE_DISABLE_WORKSTATION':{
			if(!givenWorkstation || !givenWorkstation.requestDisable) {
				return state;
			}

			// setup givenWorkstation so we only need to do one .map of workstations array
			givenWorkstation.requestDisable = false;
			givenWorkstation.selected = false;

			if(!action.error) {
				givenWorkstation.canShare = !action.success // successful action means it can't share etc
			}

			let selectedWorkstations = state.selectedWorkstations.filter(id => id !== givenWorkstation.id)

			let workstations = state.workstations.map(w =>{
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}
				return w;
			});

			return Object.assign({}, state, {workstations, selectedWorkstations})

		}
		case 'REQUEST_ENABLE_ALL_WORKSTATIONS':{

			let workstations = state.workstations.map(w => {
				let wi = state.workgroup.find(id => id === w.id)	

				// only enable workstations in our workgroup
				if(wi !== undefined){
					return {...w, requestEnable: true} 
				}

				return w
			})

			return Object.assign({}, state, {workstations})

		}
		case 'RESPONSE_ENABLE_ALL_WORKSTATIONS':{

			let workstations = state.workstations.map(w => {
				let wi = state.workgroup.find(id => id === w.id)	

				// only disable workstations in our workgroup
				if(wi !== undefined){
					let nw = {...w, requestEnable: false}

					/** 
						we don't want nw.canShare = action.success
						because if the action failed it may still
						be able to share
					**/
					if(action.success) {
						nw.canShare = true
					}
					
					return nw;
				}

				return w
			})

			let allSharingDisabled = state.allSharingDisabled;

			if(!action.error){
				allSharingDisabled = action.success;
			}

			return Object.assign({}, state, {
				workstations,
				allSharingDisabled
			})

		}
		case 'REQUEST_DISABLE_ALL_WORKSTATIONS':{
			let workstations = state.workstations.map(w => {
				let wi = state.workgroup.find(id => id === w.id)	

				/* only disable workstations in our workgroup */
				if(wi !== undefined){
					return {...w, requestDisable: true} 
				}

				return w
			})

			return Object.assign({}, state, {workstations})

		}
		case 'RESPONSE_DISABLE_ALL_WORKSTATIONS':{
			let workstations = state.workstations.map(w => {
				let wi = state.workgroup.find(id => id === w.id)	
				
				/* only disable our workgroup workstations */
				if(wi !== undefined){
					let nw = {...w, requestDisable: false}
					
					/* not nw.canShare = action.success because if the action failed it might still be able to share */
					if(action.success) {
						nw.canShare = true;
					}
					return nw;
				}			
				return w;
			})

			let allSharingDisabled = state.allSharingDisabled;

			if(!action.error){
				allSharingDisabled = !action.success;
			}

			return Object.assign({}, state, {
				workstations,
				allSharingDisabled
			})

		}
		case 'REQUEST_ADD_WORKSTATION_TO_WORKGROUP':{
			if(!givenWorkstation || givenWorkstation.inWorkgroup){
				return state;
			}

			let workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return {...w, requestAddToWorkgroup: true }
				}

				return w;
			})
			
			return Object.assign({}, state, {workstations})

		}
		case 'RESPONSE_ADD_WORKSTATION_TO_WORKGROUP':{

			if(!givenWorkstation || givenWorkstation.inWorkgroup) {
				return state;
			}

			let workgroup = state.workgroup.slice();

			/**
				setup givenWorkstation before so we can do a single .map call
				previously had many calls that were not neccessary and optimized out
			**/
			givenWorkstation.requestAddToWorkgroup = false
			givenWorkstation.selected = false

			if(!action.error) {
				givenWorkstation.inWorkgroup = action.success

				if(action.success){
					workgroup.push(givenWorkstation.id)
				}
			}

			let selectedWorkstations = state.selectedWorkstations.filter(id => id !== givenWorkstation.id)

			let workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}
				return w;
			})
			
			return Object.assign({}, state, {workstations, workgroup, selectedWorkstations })

		
		}
		case 'REQUEST_REMOVE_WORKSTATION_FROM_WORKGROUP':{
			if(!givenWorkstation || !givenWorkstation.inWorkgroup){
				return state;
			}

			let workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return {...w, requestRemoveFromWorkgroup: true}
				}

				return w;
			})	
			
			return Object.assign({}, state, {workstations})

		
		}
		case 'RESPONSE_REMOVE_WORKSTATION_FROM_WORKGROUP':{
			if(!givenWorkstation || !givenWorkstation.inWorkgroup) {
				return state;
			}

			let workgroup = state.workgroup.slice();
			
			/**
				setup givenWorkstation before so we can do a single .map call
				previously had many calls that were not neccessary and optimized out
			**/
			givenWorkstation.requestRemoveFromWorkgroup = false
			givenWorkstation.selected = false

			if(!action.error){
				givenWorkstation.inWorkgroup = !action.success;

				if(action.success) {
					workgroup = workgroup.filter(id => id !== givenWorkstation.id)
				}
			}

			let selectedWorkstations = state.selectedWorkstations.filter(id => id !== givenWorkstation.id)

			let workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}

				return w
			})
		
			return Object.assign({}, state, {workstations, workgroup, selectedWorkstations })

		}
		case 'TIMER_COUNTDOWN':{
			if(state.endTime) {
				var end = moment(state.endTime)
				let totalSec = end.diff(moment(), 'seconds');
				let hours = parseInt( totalSec / 3600, 10 ) % 24;
				let minutes = parseInt( totalSec / 60, 10 ) % 60;
				let seconds = totalSec % 60;

				let result = (hours < 10 ? "0" + hours : hours) + "-" + (minutes < 10 ? "0" + minutes : minutes) + "-" + (seconds  < 10 ? "0" + seconds : seconds);

	    		return Object.assign({}, state, {
					countDown: result
				})
			}

			return state;

		}
		case 'END_SESSION':{
				return initialState

		}
		default:
			return state

	}
}