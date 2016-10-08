import fetch from 'isomorphic-fetch';
import * as config from '../../config.json';

import moment from 'moment';

const apiURL = config.dev.apiURL;

function query(dispatch, request, receive, endpoint) {
		dispatch(request());

	return fetch(apiURL+endpoint)
		.then(response => response.json())
		.then(json => dispatch(receive(json, null)))
		.catch(err => dispatch(receive(null, err)))	
}

/** LOGIN **/
export const setUsername = (username) => ({type: 'SET_USERNAME', username});
export const setPassword = (password) => ({type: 'SET_PASSWORD', password});

export const requestLogin = () => ({type: 'REQUEST_LOGIN'});
export const receiveLoginResult = (success, err) => ({type: 'RECEIVE_LOGIN_RESULT', success, error:err});

export const login = () => (dispatch, getState) => {

	const login = getState().user;

	dispatch(requestLogin());

	return 	fetch(apiURL+'login?username='+login.username+'&password='+login.password)
			.then(response => response.json())
			.then(json => dispatch(receiveLoginResult(json, null)))
			.catch(err => dispatch(receiveLoginResult(null, err)))

}

/** CAMPUS RETEIVAL **/
export const requestCampuses = () => ({type: 'REQUEST_CAMPUSES'});
export const receiveCampuses = (campuses, error) => ({type: 'RECEIVE_CAMPUSES', campuses, error});
export const fetchCampuses = () => (dispatch) => { return query(dispatch, requestCampuses, receiveCampuses, 'campuses/') };

/** BUILDING RETREIVAL **/ 
export const requestBuildings = () => ({type: 'REQUEST_BUILDINGS'});
export const receiveBuildings = (buildings, error) => ({type: 'RECEIVE_BUILDINGS', buildings, error });
export const fetchBuildings = () => (dispatch, getState) => { 
	const { selectedCampusId } = getState().session;
	return query(dispatch, requestBuildings, receiveBuildings, 'campuses/'+selectedCampusId+'/buildings') 
}

/** ROOM RETREIVAL **/
export const requestRooms = () => ({type: 'REQUEST_ROOMS'});
export const receiveRooms = (rooms, error) => ({type: 'RECEIVE_ROOMS', rooms, error});
export const fetchRooms = () => (dispatch, getState) => { 
	const { selectedBuildingId } = getState().session;
	return query(dispatch, requestRooms, receiveRooms, 'buildings/'+selectedBuildingId+'/rooms') 
}

/** WORKSTATION RETREIVAL **/
export const requestWorkstations = () => ({type: 'REQUEST_WORKSTATIONS'});
export const receiveWorkstations = (workstations, error) => ({type: 'RECEIVE_WORKSTATIONS', workstations, error});
export const fetchWorkstations = () => (dispatch, getState) => { 
	const { selectedRoomId } = getState().session;
	return query(dispatch, requestWorkstations, receiveWorkstations, 'rooms/'+selectedRoomId+'/workstations') 
}

/** SESSION HISTORY **/
export const requestSessionHistory = () => ({type: 'REQUEST_SESSION_HISTORY'});
export const receiveSessionHistory = (history, error) => ({type: 'RECEIVE_SESSION_HISTORY', history, error});
export const fetchSessionHistory = () => (dispatch, getState) => {
  const { username } = getState().user;
  return query(dispatch, requestSessionHistory, receiveSessionHistory, 'users/'+username+'/workgroups?count=6')
}

// export const loadSessionHistory = () => (dispatch, getState) => {

//   return dispatch(fetchSessionHistory(user))
// }


/** SESSION STARTUP **/
export const selectCampus = (campusId) => ({type: 'SELECT_CAMPUS', campusId });
export const deselectCampus = () => ({type: 'DESELECT_CAMPUS' });
export const commitCampusSelection = () => ({type: 'COMMIT_CAMPUS_SELECTION'});

export const selectRoom = (roomId) => ({type: 'SELECT_ROOM', roomId });
export const deselectRoom = () => ({type: 'DESELECT_ROOM' });
export const commitRoomSelection = () => ({type: 'COMMIT_ROOM_SELECTION'});

export const selectBuilding = (buildingId) => ({type: 'SELECT_BUILDING', buildingId});
export const deselectBuilding = () => ({type: 'DESELECT_BUILDING'});
export const commitBuildingSelection = () => ({type: 'COMMIT_BUILDING_SELECTION'});

export const selectWorkstation = (workstationId) => ({type: 'SELECT_WORKSTATION', workstationId});
export const deselectWorkstation = (workstationId) => ({type: 'DESELECT_WORKSTATION', workstationId});
export const selectEndTime = (time) => ({type: 'SELECT_END_TIME', time});
export const deselectAllWorkstations = () => ({type: 'DESELECT_ALL_WORKSTATIONS'});
export const selectAllWorkstations = () => ({type: 'SELECT_ALL_WORKSTATIONS'});

export const startSession = () => ({type: 'START_SESSION' });
export const endSession = () => ({type: 'END_SESSION'});
export const requestStartSession = () => ({type: 'REQUEST_START_SESSION'});
export const receiveStartSessionResponse = (result, error) => ({type: 'RECEIVE_START_SESSION_RESPONSE', result, error});

export const commitSession = () => (dispatch, getState) => {
	dispatch(requestStartSession());

	const state = getState();

	var durationMinutes = -moment().diff(state.session.endTime, 'minutes');
	
	var data = {
		userId: state.user.username,
		roomId: state.session.selectedRoomId,
		allowedApplications: [],
		workstations: state.session.selectedWorkstations,
		duration: durationMinutes,
		sharingEnabled: true
	};

	return fetch(apiURL+'workgroups', {
				method: "POST",
		  		body: JSON.stringify(data),
		  		headers: {"Content-Type": "application/json"}
			})
			.then(response => response.json())
		  	.then(json => dispatch(receiveStartSessionResponse(json, null)))
		  	.catch(err => dispatch(receiveStartSessionResponse(null, err)))
};

/** SESSION CONTROL **/
export const requestEnableWorkstation = (workstationId) => ({type: 'REQUEST_ENABLE_WORKSTATION', workstationId});
export const responseEnableWorkstation = (workstationId, success, error) => ({type: 'RESPONE_ENABLE_WORKSTATION', workstationId, success, error});
export const enableSharing = (workstationIds) => (dispatch, getState) => {
	workstationIds.map(workstationId => {
		dispatch(requestEnableWorkstation(workstationId));

		const { workgroupId } = getState().session

		return fetch(apiURL+'workgroups/'+workgroupId+'/workstations/'+workstationId+'/sharing')
		.then(response => response.json())
		.then(json => dispatch(responseEnableWorkstation(workstationId, true, null)))
		.catch(err => dispatch(responseEnableWorkstation(workstationId, false, err)))
	})
} 

export const requestDisableWorkstation = (workstationId) => ({type: 'REQUEST_DISABLE_WORKSTATION', workstationId});
export const responseDisableWorkstation = (workstationId, success, error) => ({type: 'RESPONE_DISABLE_WORKSTATION', workstationId, success, error});
export const disableSharing = (workstationIds) => (dispatch, getState) => {
	workstationIds.map(workstationId => {
		dispatch(requestEnableWorkstation(workstationId))

		const { workgroupId } = getState().session

		return fetch(apiURL+'workgroups/'+workgroupId+'/workstations/'+workstationId+'/sharing')
		.then(response => response.json())
		.then(json => dispatch(responseEnableWorkstation(workstationId, true, null)))
		.catch(err => dispatch(responseEnableWorkstation(workstationId, false, err)))
	})
} 

export const requestEnableAllWorkstations = () => ({type: 'REQUEST_ENABLE_ALL_WORKSTATIONS'});
export const responseEnableAllWorkstations = (success, error) => ({type: 'RESPONSE_ENABLE_ALL_WORKSTATIONS', success, error});
export const enableSharingAll = () => (dispatch, getState) => {
	dispatch(requestEnableAllWorkstations())

	const { workgroupId } = getState().session

	return fetch(apiURL+'workgroups/'+workgroupId+'/sharing')
	.then(response => response.json())
	.then(json => dispatch(responseEnableAllWorkstations(true, null)))
	.catch(err => dispatch(responseEnableAllWorkstations(false, err)))
}

export const requestDisableAllWorkstations = () => ({type: 'REQUEST_DISABLE_ALL_WORKSTATIONS'});
export const responseDisableAllWorkstations = (success, error) => ({type: 'RESPONSE_DISABLE_ALL_WORKSTATIONS', success, error});
export const disableSharingAll = () => (dispatch, getState) => {
	dispatch(requestDisableAllWorkstations())

	const { workgroupId } = getState().session

	return fetch(apiURL+'workgroups/'+workgroupId+'/sharing')
	.then(response => response.json())
	.then(json => dispatch(responseDisableAllWorkstations(true, null)))
	.catch(err => dispatch(responseDisableAllWorkstations(false, err)))
}

export const requestAddWorkstationToWorkgroup = (workstationId) => ({type: 'REQUEST_ADD_WORKSTATION_TO_WORKGROUP', workstationId});
export const responseAddWorkstationToWorkgroup = (workstationId, success, error) => ({type: 'RESPONSE_ADD_WORKSTATION_TO_WORKGROUP', workstationId, success, error});
export const addWorkstationsToWorkgroup = (workstationIds) => (dispatch, getState) => {
	workstationIds.map(workstationId => {
		dispatch(requestAddWorkstationToWorkgroup(workstationId))

		const { workgroupId } = getState().session
	
		return fetch(apiURL+'workgroups/'+workgroupId+'/workstations/'+workstationId, {
			method: "POST",
	  		headers: {"Content-Type": "application/json"}
		})
		.then(response => response.json())
		.then(json => dispatch(responseAddWorkstationToWorkgroup(workstationId, true, null)))
		.catch(err => dispatch(responseAddWorkstationToWorkgroup(workstationId, false, err)))
	})
}

export const requestRemoveWorkstationToWorkgroup = (workstationId) => ({type: 'REQUEST_REMOVE_WORKSTATION_TO_WORKGROUP', workstationId});
export const responseRemoveWorkstationToWorkgroup = (workstationId, success, error) => ({type: 'RESPONSE_REMOVE_WORKSTATION_TO_WORKGROUP', workstationId, success, error});
export const removeWorkstationsFromToWorkgroup = (workstationIds) => (dispatch, getState) => {
	workstationIds.map(workstationId => {
		dispatch(requestRemoveWorkstationToWorkgroup(workstationId))

		const { workgroupId } = getState().session

		return fetch(apiURL+'workgroups/'+workgroupId+'/workstations/'+workstationId, {
			method: "DELETE",
	  		headers: {"Content-Type": "application/json"}
		})
		.then(response => response.json())
		.then(json => dispatch(responseRemoveWorkstationToWorkgroup(workstationId, true, null)))
		.catch(err => dispatch(responseRemoveWorkstationToWorkgroup(workstationId, false, err)))
	})
}
