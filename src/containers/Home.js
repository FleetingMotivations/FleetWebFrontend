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

import SessionHistory from '../components/SessionHistory';


class Home extends Component{

	/* dispatches fetch of previous sessions before rendering */
	componentWillMount() {
	 	this.props.actions.fetchSessionHistory();
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
	}

	/* handler passed to SessionHistory for dispatching action to view a previous sessions details */
	handleViewSessionDetails(sessionId){
		this.props.actions.getPreviousSessionDetails(sessionId);
	}

	/* handler passed to SessionHistory for closing details of a previous session */
	handleCloseSessionDetails(sessionId){
		this.props.actions.removePreviousSessionDetails(sessionId);
	}

	render() {

		var { user, sessionHistory, session } = this.props;
		
		var button =	<div className="instruction-wrapper">
							<div className="btn new-session" onClick={this.handleNewSessionClick.bind(this)}>Start New Session</div>
						</div>

		if(session.started) {
			button = 	<div className="instruction-wrapper">
							<div className="btn new-session" onClick={this.handleCurrentSessionClick.bind(this)}>Continue Current Session</div>
						</div>
		}	
		
		return (
			<div className="home">
				<div className="welcome">Welcome {user.firstname} {user.lastname}</div>	

				{button}
					
				<SessionHistory 
					{...sessionHistory} 
					viewSession={this.handleViewSessionDetails.bind(this)}
					startSession={this.hanldeCreateSession.bind(this)}
					backToAllSessions={this.handleCloseSessionDetails.bind(this)}
				/>

			</div>
		);
	}
}

/* Redux functions for mapping state to props */
const mapStateToProps = state => ({
	user : state.user,
	sessionHistory : state.sessionHistory,
	session: state.session
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)	