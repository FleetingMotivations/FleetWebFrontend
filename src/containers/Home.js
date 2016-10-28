/* 
 * Description: Home component for the React web application
 *				Index page of the react application
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import moment from 'moment';

import SessionHistory from '../components/SessionHistory';


var sessionHistoryCount = 6; //This is setup like this cause I'm a lazy fuck, move to the SessionHistory reducer 

class Home extends Component{

	/* dispatches fetch of previous sessions before rendering */
	componentWillMount() {
	 	this.props.actions.fetchSessionHistory(sessionHistoryCount);
	}

	/* handler for starting session button */
	handleNewSessionClick(){
		browserHistory.push('/campusSelect');		
	}

	/* handler for going back to the current session */
	handleCurrentSessionClick(){
		browserHistory.push('/session');
	}

	/* handler passed to SessionHistory for creating a new session based on a previous session */
	hanldeCreateSession(sessionId){
		this.props.actions.createSessionFromPrevious(sessionId);
		this.props.actions.removePreviousSessionDetails(sessionId);
	}

	/* handler passed to SessionHistory for dispatching action to view a previous sessions details */
	handleViewSessionDetails(sessionId){
		this.props.actions.getPreviousSessionDetails(sessionId);
	}

	/* handler passed to SessionHistory for closing details of a previous session */
	handleCloseSessionDetails(sessionId){
		this.props.actions.removePreviousSessionDetails(sessionId);
	}

	handleMoreSessionsClick(){
		sessionHistoryCount += 6;
		this.props.actions.fetchSessionHistory(sessionHistoryCount);
	}

	render() {

		var { user, sessionHistory, session, selectedWorkstations } = this.props;
		
		var button =	<div className="instruction-wrapper">
							<div className="btn new-session" onClick={this.handleNewSessionClick.bind(this)}>Start New Session</div>
						</div>

		var currentSessions = null;
		var runningSessions = [];

		if(session.started) {
			button = null;

			// <div className="instruction-wrapper">
			// 			<div className="btn new-session" onClick={this.handleCurrentSessionClick.bind(this)}>Continue Current Session</div>
			// 		</div>

			var room = session.rooms.find(id => session.selectedRoomId);
			var endTime = moment(session.endTime).format('MMMM Do YYYY, h:mm:ss');

			currentSessions = <div className="current-sessions">
								<h3>Current Sessions</h3>
						        <div className="running-sessions">
						    		<div className="session">
										<div className="room">{room.name}</div>
								    	<div className="end-time">Ending: {endTime}</div>
										<div className="btn green start" onClick={this.handleCurrentSessionClick.bind(this)} >Open Session</div>
									</div>
						        </div>
							  </div>;
		}	
		
		var loadMore = null;
		if(sessionHistory.selectedSession === null)
		{
		 loadMore = <div className="more-sessions" onClick={this.handleMoreSessionsClick.bind(this)}>load more...</div>;
		}


		return (
			<div className="home">
				<div className="welcome">Welcome {user.firstname} {user.lastname}</div>	

				{button}
					
				{currentSessions}

				<SessionHistory 
					{...sessionHistory} 
					viewSession={this.handleViewSessionDetails.bind(this)}
					startSession={this.hanldeCreateSession.bind(this)}
					backToAllSessions={this.handleCloseSessionDetails.bind(this)}
				/>

				{loadMore}

			</div>
		);
	}
}

/* Redux functions for mapping state to props */
const mapStateToProps = state => ({
	user : state.user,
	sessionHistory : state.sessionHistory,
	session: state.session,
	selectedWorkstations: state.session.selectedWorkstations
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)	