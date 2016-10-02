import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';

/** BUILDING RETREIVAL **/ 
export const setBuilding = (id, name) => ({type: types.SET_BUILDING, id, name });
export const requestBuildings = () => ({type: types.REQUEST_BUILDINGS});
export const receiveBuildings = (json, error) => ({type: types.RECEIVE_BUILDINGS, buildingsList: json.data.buildings, error });

export const fetchBuildings = () => (dispatch) => {

	dispatch(requestBuildings());

	return fetch('http://localhost:3000/buildings/')
		.then(response => response.json())
		.then(json => dispatch(receiveBuildings(json)))
		.catch(err => dispatch(receiveBuildings(null, err)))
}

export const fetchBuildingsIfNeeded = () => (dispatch, getState) => {
	const buildings = getState().buildings;

	if(!buildings) 
	{
		return dispatch(fetchBuildings());
	}
	else
	{
		return Promise.resolve();
	}
}

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
export const startSession = () => ({type: types.START_SESSION });

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
export const selectAllWorkstations = () => ({type: types.SELECT_ALL_WORKSTATION});
export const commitSession = () => ({type: types.COMMIT_SESSION});