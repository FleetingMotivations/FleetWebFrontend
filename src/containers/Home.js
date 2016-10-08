import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as FleetActions from '../actions';

import SessionHistory from '../components/SessionHistory';


class Home extends Component{
	static propTypes = {

	}

	componentWillMount() {
	 	this.props.actions.fetchSessionHistory();
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}

	handleNewSessionClick(){
		browserHistory.push('/roomSelect');		
	}

	hanldeCreateSession(sessionId){
		this.props.actions.createSessionFromPrevious(sessionId);
	}

	renderSession(session){

		return(
			<div className="prev-session" onClick={() => {this.hanldeCreateSession(session.id)}}>
			<div className="room">{session.room.name}</div>
			<div className="started">{session.started}</div>
			</div>
		);
	}

  	render() {

		var { user, sessionHistory } = this.props;
		
		return (
			<div className="home">
				<div className="welcome">Welcome {user.title} {user.lastname}</div>

				<div className="instruction-wrapper">
					<div className="btn new-session" onClick={this.handleNewSessionClick.bind(this)}>Start New Session</div>
				</div>

				<SessionHistory {...sessionHistory}/>

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