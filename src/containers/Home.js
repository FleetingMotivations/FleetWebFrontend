import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import SessionHistory from '../components/SessionHistory';


class Home extends Component{

	componentWillMount() {
	 	this.props.actions.fetchSessionHistory();
	}

	componentWillReceiveProps(nextProps) {

	}

	handleNewSessionClick(){
		browserHistory.push('/campusSelect');		
	}

	hanldeCreateSession(sessionId){
		this.props.actions.createSessionFromPrevious(sessionId);
	}

	handleViewSessionDetails(sessionId){
		this.props.actions.getPreviousSessionDetails(sessionId);
	}

	handleCloseSessionDetails(sessionId){
		this.props.actions.removePreviousSessionDetails(sessionId);
	}

	render() {

		var { user, sessionHistory } = this.props;
		
		console.log(user);

		return (
			<div className="home">
				<div className="welcome">Welcome {user.firstname} {user.lastname}</div>

				<div className="instruction-wrapper">
					<div className="btn new-session" onClick={this.handleNewSessionClick.bind(this)}>Start New Session</div>
				</div>

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


const mapStateToProps = state => ({
	user : state.user,
	sessionHistory : state.sessionHistory
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)	