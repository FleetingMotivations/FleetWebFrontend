const initialState = {
	id: null,

	started: false,
	endTime: null,
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

	requestingStart: false,
	requestFailed: false,

	allSharingDisabled: false,

	workstations: [
		{id: '123', name: 'Name1', status: 'active',   top: '20%', left: '20%', inWorkgroup: false, available:true, selected: false},
		{id: '124', name: 'Name2', status: 'inactive', top: '20%', left: '30%', inWorkgroup: false, available:true, selected: false},
		{id: '125', name: 'Name3', status: 'offline',  top: '30%', left: '40%', inWorkgroup: false, available:true, selected: false },
		{id: '126', name: 'Name4', status: 'offline',  top: '30%', left: '60%', inWorkgroup: false, available:false,selected: false },
		{id: '127', name: 'Name5', status: 'active',   top: '20%', left: '70%', inWorkgroup: false, available:false,selected: false },
		{id: '128', name: 'Name6', status: 'inactive', top: '20%', left: '80%', inWorkgroup: false, available:false,selected: false },
	],

	workgroup: [],

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

		case 'REQUEST_CAMPUSES':
			return Object.assign({}, state, {fetchingCampuses: true })

		case 'RECEIVE_CAMPUSES':
			if(action.error) {
				return Object.assign({}, state, {fetchError: true })
			}

			return Object.assign({}, state, {
				fetchingCampuses: false,
				campuses: action.campuses	
			})
	
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
				return Object.assign({}, state, {
					fetchError: true
				})
			}
			return Object.assign({}, state, {fetchingCampuses: false, buildings: action.buildings })
	
		case 'SELECT_BUILDING':
			return Object.assign({}, state, {selectedBuildingId: action.buildingId })
			
		case 'DESELECT_BUILDING':
			return Object.assign({}, state, {selectedBuildingId: null, buildingCommited: false })

		case 'COMMIT_BUILDING_SELECTION':
			return Object.assign({}, state, {buildingCommited: true })

		case 'SELECT_ROOM':
			return Object.assign({}, state, {selectedRoomId: action.roomId })

		case 'DESELECT_ROOM':
			return Object.assign({}, state, {selectedRoomId: null, roomCommited: false })

		case 'COMMIT_ROOM_SELECTION': 
			return Object.assign({}, state, {roomCommited: true })

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

					var workgroup = selectedWorkstations.slice()
					var selectedWorkstations = [];

					return Object.assign({}, state, { 
						started: true,
						requestingStart: false,
						requestFailed: false,
						id: action.result.id,
						workgroup,
						selectedWorkstations
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

			if(!action.error) {
				 givenWorkstation.canShare = action.success
			}

			var workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}			
				return w;
			})
			
			return Object.assign({}, state, {workstations})


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

			givenWorkstation.requestDisable = false

			if(!action.error) {
				givenWorkstation.canShare = !action.success
			}

			var workstations = state.workstations.map(w =>{
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}
				return w;
			});

			return Object.assign({}, state, {workstations})

		case 'REQUEST_ENABLE_ALL_WORKSTATIONS':

			var workstations = state.workstations.map(w => {
				var wi = state.workgroup.find(wk => {return wk.id === w.id})	

				if(wi){
					return {...w, requestEnable: true} 
				}

				return w
			})

			return Object.assign({}, state, {workstations})

		case 'RESPONSE_ENABLE_ALL_WORKSTATIONS':

			var workstations = state.workstations.map(w => {
				var wi = state.workgroup.find(wk => {return wk.id === w.id})	

				if(wi){
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
				var wi = state.workgroup.find(wk => {return wk.id === w.id})	

				if(wi){
					return {...w, requestDisable: true} 
				}

				return w
			})

			return Object.assign({}, state, {workstations})

		case 'RESPONSE_DISABLE_ALL_WORKSTATIONS':
			var workstations = state.workstations.map(w => {
				var wi = state.workgroup.find(wk => {return wk.id === w.id})	

				if(wi){
					var nw = {...w, requestDisable: false}
					if(action.success) {
						nw.canShare = true;
					}
					return w;
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

			if(!action.error) {
				givenWorkstation.inWorkgroup = action.success

				if(action.success){
					workgroup.push(givenWorkstation.id)
				}
			}

			var workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}
				return w;
			})
			
			return Object.assign({}, state, {
				workstations,
				workgroup
			}) 

		
		case 'REQUEST_REMOVE_WORKSTATION_FROM_WORKGROUP':
			if(!givenWorkstation || !givenWorkstation.inWorkgroup){
				return state;
			}

			var workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return {...w, requestRemoveFromWorkgroup: true }
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

			if(!action.error){
				givenWorkstation.inWorkgroup = !action.success;

				if(action.success) {
					workgroup = workgroup.filter(id => {return id !== givenWorkstation.id})
				}
			}

			var workstations = state.workstations.map(w => {
				if(w.id === givenWorkstation.id) {
					return givenWorkstation
				}

				return w
			})
		
			return Object.assign({}, state, {workstations, workgroup })

		case 'END_SESSION':
				return initialState

		default:
			return state

	}
}