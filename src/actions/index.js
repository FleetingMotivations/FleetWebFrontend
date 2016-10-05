import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';
import * as config from '../../config.json';

const apiURL = config.dev.apiURL;

function query(dispatch, request, receive, endpoint) {
		dispatch(request());

	return fetch(apiURL+endpoint)
		.then(response => response.json())
		.then(json => dispatch(receive(json)))
		.catch(err => dispatch(receive(null, err)))	
}

/** CAMPUS RETEIVAL **/
export const requestCampuses = () => ({type: types.REQUEST_CAMPUSES});
export const receiveCampuses = (json, error) => ({type: types.RECEIVE_CAMPUSES, campusList: json.data, error});
export const fetchCampuses = () => (dispatch) => { return query(dispatch, requestCampuses, receiveCampuses, 'campuses/') }

/** BUILDING RETREIVAL **/ 
export const requestBuildings = () => ({type: types.REQUEST_BUILDINGS});
export const receiveBuildings = (json, error) => ({type: types.RECEIVE_BUILDINGS, buildingsList: json.data, error });
export const fetchBuildings = () => (dispatch) => { return query(dispatch, requestBuildings, receiveBuildings, 'buildings/') }

/** ROOM RETREIVAL **/
export const requestRooms = () => ({type: types.REQUEST_ROOMS});
export const receiveRooms = (json, error) => ({type: types.RECEIVE_ROOMS, campusList: json.data, error});
export const fetchRooms = () => (dispatch) => { return query(dispatch, requestRooms, receiveRooms, 'rooms/') }

/** WORKSTATION RETREIVAL **/
export const requestWorkstations = () => ({type: types.REQUEST_WORKSTATIONS});
export const receiveWorkstations = (json, error) => ({type: types.RECEIVE_WORKSTATIONS, campusList: json.data, error});
export const fetchWorkstations = () => (dispatch) => { return query(dispatch, requestWorkstations, receiveWorkstations, 'workstations/') }


/** SESSION HISTORY **/
export const requestSessionHistory = () => ({type: types.REQUEST_SESSION_HISTORY});
export const receiveSessionHistory = (json, error) => ({type: types.RECEIVE_SESSION_HISTORY, error});


const fetchSessionHistory = loginDetails => dispatch => {
	console.log(loginDetails);

	dispatch(requestSessionHistory());

	return fetch('http://localhost:3000/sessionHistory/')
		.then(response => response.json())
		.then(json => dispatch(receiveSessionHistory(json)))
		.catch(err => dispatch(receiveSessionHistory(null, err)))
}

export const loadSessionHistory = loginDetails => (dispatch, getState) => {
  console.log(loginDetails);
  const sessionHistory = getState().sessionHistory;

  if(sessionHistory.length > 0)
  {
  	return null;
  }

  return dispatch(fetchSessionHistory(loginDetails))
}


/** SESSION STARTUP **/
export const selectCampus = (campusId) => ({type: types.SELECT_CAMPUS, campusId });
export const deselectCampus = () => ({type: types.DESELECT_CAMPUS });
export const commitCampusSelection = () => ({type: types.COMMIT_CAMPUS_SELECTION});

export const selectRoom = (roomId) => ({type: types.SELECT_ROOM, roomId });
export const deselectRoom = () => ({type: types.DESELECT_ROOM });
export const commitRoomSelection = () => ({type: types.COMMIT_ROOM_SELECTION});

export const selectBuilding = (buildingId) => ({type: types.SELECT_BUILDING, buildingId});
export const deselectBuilding = () => ({type: types.DESELECT_BUILDING});
export const commitBuildingSelection = () => ({type: types.COMMIT_BUILDING_SELECTION});

export const selectWorkstation = (workstationId) => ({type: types.SELECT_WORKSTATION, workstationId});
export const deselectWorkstation = (workstationId) => ({type: types.DESELECT_WORKSTATION, workstationId});
export const selectEndTime = (time) => ({type: types.SELECT_END_TIME, time});
export const deselectAllWorkstations = () => ({type: types.DESELECT_ALL_WORKSTATIONS});
export const selectAllWorkstations = () => ({type: types.SELECT_ALL_WORKSTATIONS});

export const startSession = () => ({type: types.START_SESSION });
export const endSession = () => ({type: types.END_SESSION});
export const requestStartSession = () => ({type: types.REQUEST_START_SESSION});
export const receiveStartSessionResponse = (result) => ({type: types.RECEIVE_START_SESSION_RESPONSE, result});

export const commitSession = (userId, selectedWorkstations, endTime) => (dispatch) => {
	dispatch(requestStartSession());

	var data = {
		userId,
		selectedWorkstations,
		endTime
	};

	return fetch(apiURL+'workgroups', {
				method: "POST",
		  		body: JSON.stringify(data),
		  		headers: {"Content-Type": "application/json"}
			})
			.then(response => response.json())
		  	.then(json => dispatch(receiveStartSessionResponse(json)))
		  	.catch(err => {console.log(err)})
};

/** SESSION CONTROL **/
export const addWorkstationToWorkgroup = (workstationId) => ({ type: types.ADD_WORKSTATION_TO_WORKGROUP, workstationId });
export const removeWorkstationFromWorkgroup = (workstationId) => ({ type: types.REMOVE_WORKSTATION_FROM_WORKGROUP, workstationId });
