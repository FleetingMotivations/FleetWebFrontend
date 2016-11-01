/* 
 * Description: Defines all application actions that dispatch to the reducers
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */


import fetch from 'isomorphic-fetch';
import * as config from '../../config.json';
import { browserHistory } from 'react-router'
import moment from 'moment';

/* Sets api URL from config based on environment */
// const apiURL = (process.env.NODE_ENV === 'production') ? config.dev.apiURL : config.prod.apiURL;
const apiURL = config.dev.apiURL;

/** Query function for general api enpoint query structures **/
function query(dispatch, request, receive, endpoint) {
	/* dispatch request function to the reducer indicating an async request has begun */ 
	dispatch(request()); 

	/** make request to api using isomorphic-fetch and return result to 
		action function 'receive' 
	**/
	console.log(apiURL+endpoint);
	return fetch(apiURL+endpoint)
			.then(response => { return response.json()})
			.then(json => dispatch(receive(json, null)))
			.catch(err => dispatch(receive(null, err)))	
}

/** LOGIN **/
export const setUsername = (username) => ({type: 'SET_USERNAME', username});
export const setPassword = (password) => ({type: 'SET_PASSWORD', password});

export const requestLogin = () => ({type: 'REQUEST_LOGIN'});
export const receiveLoginResult = (success, result, error) => ({type: 'RECEIVE_LOGIN_RESULT', success, result, error});

export const logout = () => ({type: 'LOGOUT'});
export const login = () => (dispatch, getState) => {

	const login = getState().user;		
 
	if(login.username === "c3138738" && login.password === "lolthx") {
		dispatch(receiveLoginResult(
			true,
			{
				loggedIn: true,
				firstname: "Alistair",
				lastname: "Woodcock",
				username: "c3138738",
				token: "boopbooptoken20-i1f0inefg8394ghbw[e0g8h3489pf-hw",
				tokenExpiry: "never-cool-okay",
				userId: 2
			}
			, null)
		);
	} else {
		dispatch(receiveLoginResult(false, null, 'error here'));
	}


	// dispatch(requestLogin());

	// return fetch(apiURL+'login?username='+login.username+'&password='+login.password)
	// .then(response => {
	//	 
	// else if (response.status === 422) {
		// console.log(response);
            // throw new Error("Bad request to API");
        // }
		// response.json()
	// })
	// .then(json => dispatch(receiveLoginResult(json, null)))
	// .catch(err => dispatch(receiveLoginResult(null, err)))
}


/** CAMPUS RETEIVAL **/
export const requestCampuses = () => ({type: 'REQUEST_CAMPUSES'});
export const receiveCampuses = (campuses, error) => ({type: 'RECEIVE_CAMPUSES', campuses, error});
export const fetchCampuses = () => (dispatch) => { 
	return query(dispatch, requestCampuses, receiveCampuses, 'campuses/') 
};

/** BUILDING RETREIVAL **/ 
export const requestBuildings = () => ({type: 'REQUEST_BUILDINGS'});
export const receiveBuildings = (buildings, error) => ({type: 'RECEIVE_BUILDINGS', buildings, error });
export const fetchBuildings = (campusId) => (dispatch, getState) => { 
	return query(dispatch, requestBuildings, receiveBuildings, 'campuses/'+campusId+'/buildings') 
}

/** ROOM RETREIVAL **/
export const requestRooms = () => ({type: 'REQUEST_ROOMS'});
export const receiveRooms = (rooms, error) => ({type: 'RECEIVE_ROOMS', rooms, error});
export const fetchRooms = (buildingId) => (dispatch, getState) => { 
	return query(dispatch, requestRooms, receiveRooms, 'buildings/'+buildingId+'/rooms') 
}

/** WORKSTATION RETREIVAL **/
export const requestWorkstations = () => ({type: 'REQUEST_WORKSTATIONS'});
export const receiveWorkstations = (workstations, error) => ({type: 'RECEIVE_WORKSTATIONS', workstations, error});
export const fetchWorkstations = (roomId) => (dispatch, getState) => { 
	return query(dispatch, requestWorkstations, receiveWorkstations, 'rooms/'+roomId+'/workstations') 
}

/** SESSION HISTORY **/
export const requestSessionHistory = () => ({type: 'REQUEST_SESSION_HISTORY'});
export const receiveSessionHistory = (history, error) => ({type: 'RECEIVE_SESSION_HISTORY', history, error});
export const fetchSessionHistory = (sessionNum) => (dispatch, getState) => {
  const { userId } = getState().user;
  return query(dispatch, requestSessionHistory, receiveSessionHistory, 'users/'+userId+'/workgroups?count='+sessionNum)
}

export const removePreviousSessionDetails = (sessionId) => ({type: 'REMOVE_PREVIOUS_SESSION_DETAILS', sessionId});
export const requestPreviousSessionDetails = () => ({type: 'REQUEST_SESSION_DETAILS'});
export const receivePreviousSessionDetails = (sessionDetails, error) => ({type: 'RECEIVE_SESSION_DETAILS', sessionDetails, error});
export const getPreviousSessionDetails = (workgroupId) => (dispatch, getState) => {
	dispatch(requestPreviousSessionDetails());

	const { userId } = getState().user;

	return fetch(apiURL+'users/'+userId+'/workgroups/'+workgroupId)
			.then(response => {
				
				if (response.status === 422) {
            		console.log(response);
            		throw new Error("Bad request to API");
        		}
				return response.json()
			})
		  	.then(json => {dispatch(receivePreviousSessionDetails(json, null)) })
		  	.catch(err => dispatch(receivePreviousSessionDetails(null, err)))
}

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

export const requestStartSession = () => ({type: 'REQUEST_START_SESSION'});
export const receiveStartSessionResponse = (result, success, error) => ({type: 'RECEIVE_START_SESSION_RESPONSE', result, success, error});

export const commitSession = () => (dispatch, getState) => {
	dispatch(requestStartSession());

	const state = getState();

	/** using momentjs to get diff between current time and end time
		sent to server for specifying duration of the session
	**/ 
	var durationMinutes = -moment().diff(moment(state.session.endTime), 'minutes');
	
	/** data setup for session to start 
		to be sent as post request via fetch
	**/
	var data = {
		userId: state.user.userId,
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
			.then(response => {
				 
				if (response.status === 422) {
            		console.log(response);
            		throw new Error("Bad request to API");
        		}
				return response.json()
			})
		  	.then(json => dispatch(receiveStartSessionResponse(json, true, null)))
		  	.catch(err => dispatch(receiveStartSessionResponse(null, false, err)))
};

export const creatingSessionFromPrevious = (sessionId) => ({type: 'CREATING_SESSION_FROM_PREVIOUS', sessionId});
export const creatingSessionFromPreviousFailed = (error) => ({type: 'CREATING_SESSION_FROM_PREVIOUS_FAILED', error});
export const setPrevSessionWorkgroup = (workgroup) => ({type: 'PREVIOUS_SESSION_WORKGROUP', workgroup}); 
export const createSessionFromPrevious = (sessionId) => (dispatch, getState) => {
	dispatch(creatingSessionFromPrevious());
 	
	const { selectedSession } = getState().sessionHistory;

	/** All these dispatches are required to fetch and setup the 
		data to view the workstation select page. It's essentially running
		throug the normal flow but instead with data retrieved regarding the
		selected previous session	
	**/
	dispatch(fetchBuildings(selectedSession.room.campusId))
	dispatch(fetchRooms(selectedSession.room.id))
	dispatch(selectCampus(selectedSession.room.campusId))
	dispatch(selectBuilding(selectedSession.room.buildingId))
	dispatch(selectRoom(selectedSession.room.id))
	
	dispatch(setPrevSessionWorkgroup(selectedSession.workstations.map(w=>{return w.id})));

	dispatch(selectEndTime(moment().add(selectedSession.duration, 'minutes')))

	/* jump to workstation select page */
	browserHistory.push('/workstationSelect')
};

/** SESSION CONTROL **/
export const requestEnableWorkstation = (workstationId) => ({type: 'REQUEST_ENABLE_WORKSTATION', workstationId});
export const responseEnableWorkstation = (workstationId, success, error) => ({type: 'RESPONSE_ENABLE_WORKSTATION', workstationId, success, error});
export const enableSharing = (workstationIds) => (dispatch, getState) => {
	/* go through every workstation sent and request enabling for each */
	workstationIds.map(workstationId => {

		const workstation = getState().session.workstations.find(w => w.id === workstationId)

		if(workstation && workstation.inWorkgroup && !workstation.canShare){ 
			dispatch(requestEnableWorkstation(workstationId));

			const { id } = getState().session

			return fetch(apiURL+'workgroups/'+id+'/workstations/'+workstationId+'/sharing',{method: 'PUT'})
					.then(response => {
						
						if (response.status === 422) {
            				console.log(response);
            				throw new Error("Bad request to API");
        				}
        				dispatch(responseEnableWorkstation(workstationId, true, null));
					})
					.catch(err => dispatch(responseEnableWorkstation(workstationId, false, err)))
		}

	})
} 

export const requestDisableWorkstation = (workstationId) => ({type: 'REQUEST_DISABLE_WORKSTATION', workstationId});
export const responseDisableWorkstation = (workstationId, success, error) => ({type: 'RESPONSE_DISABLE_WORKSTATION', workstationId, success, error});
export const disableSharing = (workstationIds) => (dispatch, getState) => {
	/* go through every workstation sent and request disabling for each */
	workstationIds.map(workstationId => {

		const workstation = getState().session.workstations.find(w => {return w.id === workstationId})

		if(workstation && workstation.inWorkgroup && workstation.canShare){ 
			dispatch(requestDisableWorkstation(workstationId))
			
			const { id } = getState().session

			return fetch(apiURL+'workgroups/'+id+'/workstations/'+workstationId+'/sharing', {method:'PUT'})
			.then(response => {
				
				if (response.status === 422) {
            		console.log(response);
            		throw new Error("Bad request to API");
        		}
				dispatch(responseDisableWorkstation(workstationId, true, null));	
			})
			.catch(err => dispatch(responseDisableWorkstation(workstationId, false, err)))
		}
	})
} 

export const requestEnableAllWorkstations = () => ({type: 'REQUEST_ENABLE_ALL_WORKSTATIONS'});
export const responseEnableAllWorkstations = (success, error) => ({type: 'RESPONSE_ENABLE_ALL_WORKSTATIONS', success, error});
export const enableSharingAll = () => (dispatch, getState) => {
	dispatch(requestEnableAllWorkstations())

	const { id } = getState().session

	return fetch(apiURL+'workgroups/'+id+'/sharing', {method: 'PUT'})
			.then(response => {
				
				if (response.status === 422) {
            		console.log(response);
            		throw new Error("Bad request to API");
        		}
				dispatch(responseEnableAllWorkstations(true, null))
			})
			.catch(err => dispatch(responseEnableAllWorkstations(false, err)))
}

export const requestDisableAllWorkstations = () => ({type: 'REQUEST_DISABLE_ALL_WORKSTATIONS'});
export const responseDisableAllWorkstations = (success, error) => ({type: 'RESPONSE_DISABLE_ALL_WORKSTATIONS', success, error});
export const disableSharingAll = () => (dispatch, getState) => {
	dispatch(requestDisableAllWorkstations())

	const { id } = getState().session

	return fetch(apiURL+'workgroups/'+id+'/sharing', {method:'PUT'})
	.then(response => {
		if (response.status === 422) {		
        	throw new Error("Bad request to API");
        }
		
		dispatch(responseDisableAllWorkstations(true, null))	
	})
	.catch(err => dispatch(responseDisableAllWorkstations(false, err)))
}

export const requestAddWorkstationToWorkgroup = (workstationId) => ({type: 'REQUEST_ADD_WORKSTATION_TO_WORKGROUP', workstationId});
export const responseAddWorkstationToWorkgroup = (workstationId, success, error) => ({type: 'RESPONSE_ADD_WORKSTATION_TO_WORKGROUP', workstationId, success, error});
export const addWorkstationsToWorkgroup = (workstationIds) => (dispatch, getState) => {
	/* go through every workstation sent and request adding to workgroup for each */
	workstationIds.map(workstationId => {
		dispatch(requestAddWorkstationToWorkgroup(workstationId))

		const { id } = getState().session
		
		return fetch(apiURL+'workgroups/'+id+'/workstations/'+workstationId, {method: 'POST', })
		.then(response => {

			if (response.status === 422) {
	    		console.log(response);
	    		throw new Error("Bad request to API");
        	}
        	
        	dispatch(responseAddWorkstationToWorkgroup(workstationId, true, null));

		})
		.catch(err => dispatch(responseAddWorkstationToWorkgroup(workstationId, false, err)))
	})
}

export const requestRemoveWorkstationFromWorkgroup = (workstationId) => ({type: 'REQUEST_REMOVE_WORKSTATION_FROM_WORKGROUP', workstationId});
export const responseRemoveWorkstationFromWorkgroup = (workstationId, success, error) => ({type: 'RESPONSE_REMOVE_WORKSTATION_FROM_WORKGROUP', workstationId, success, error});
export const removeWorkstationsFromWorkgroup = (workstationIds) => (dispatch, getState) => {
	/* go through every workstation sent and request removal for each */
	workstationIds.map(workstationId => {
		dispatch(requestRemoveWorkstationFromWorkgroup(workstationId))

		const { id } = getState().session

		return fetch(apiURL+'workgroups/'+id+'/workstations/'+workstationId, {method: "DELETE"})
		.then(response => {
		 	
			if (response.status === 422) {
	            throw new Error("Bad request to API");
		    }

		    dispatch(responseRemoveWorkstationFromWorkgroup(workstationId, true, null))
		})
		.catch(err => dispatch(responseRemoveWorkstationFromWorkgroup(workstationId, false, err)))
	})
}


export const sessionEnded = () => ({type: 'END_SESSION'});
export const requestEndSession = () => ({type: 'REQUEST_END_SESSION'});
export const endSession = () => (dispatch, getState) => {

	const { workgroup, id } = getState().session;

	return fetch(apiURL+'workgroups/'+id, {method: "DELETE"})
			.then(response => {
			 	
				if (response.status === 422) {
		            throw new Error("Bad request to API");
			    }

			    dispatch(sessionEnded())
			})
}

/** SESSION SERVER UPDATES (POLLING) **/
export const requestingWorkstationsUpdate = () => ({type: 'REQUEST_WORKSTATIONS_UPDATE'});
export const responseWorkstationsUpdate = (response, error) => ({type: 'RESPONSE_WORKSTATIONS_UPDATE', response, error});
export const pollForWorkstations = () => (dispatch, getState) => {
	dispatch(requestingWorkstationsUpdate())

	const { selectedRoomId } = getState().session

	return fetch(apiURL+'rooms/'+selectedRoomId+'/workstations')
			.then(response => {
				
				if (response.status === 422) {
            		console.log(response);
            		throw new Error("Bad request to API");
        		}
				return response.json()
			})
			.then(json => dispatch(responseWorkstationsUpdate(json, null)))
			.catch(err => dispatch(responseWorkstationsUpdate(null, err)))
}
export const requestingWorkgroupUpdate = () => ({type: 'REQUEST_WORKGROUP_UPDATE'});
export const responseWorkgroupUpdate = (response, error) => ({type: 'RESPONSE_WORKGROUP_UPDATE', response, error});
export const pollWorkgroup = () => (dispatch, getState) => {
	dispatch(requestingWorkgroupUpdate())

	const { id } = getState().session

	return fetch(apiURL+'workgroups/'+id+'/workstations')
			.then(response => {
				
				if (response.status === 422) {
            		console.log(response);
            		throw new Error("Bad request to API");
        		}
				return response.json()
			})
			.then(json => dispatch(responseWorkgroupUpdate(json, null)))
			.catch(err => dispatch(responseWorkgroupUpdate(null, err)))
}


/** SESSION COUNTDOWN **/
export const timerTick = () => ({type: 'TIMER_COUNTDOWN', seconds: 1});
export const checkSessionRunning = () => (dispatch, getState) => {
	const { session } = getState()

	if(moment(session.endTime) < moment()) {
		dispatch(endSession())
		browserHistory.push('/');
	}
};
export const timerCountdown = () => (dispatch, getState) => {
	dispatch(checkSessionRunning());
	dispatch(timerTick());
};

