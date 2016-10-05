import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { loadSessionHistory } from '../actions';

import SessionHistory from '../components/SessionHistory';


class Home extends Component{
	static propTypes = {

	}

	componentWillMount() {
	 	const { loadSessionHistory, user } = this.props;

	 	loadSessionHistory(user.token);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}

	handleNewSessionClick(){
		browserHistory.push('/roomSelect');		
	}

	hanldeCreateSession(session){

	}

	renderSession(session){
		const { createSessionClick } = this.props;

		return(
			<div className="prev-session" onClick={createSessionClick.bind(session)}>
			<div className="building">{session.building}</div>
			<div className="room">{session.room}</div>
			<div className="duration">{session.duration}</div>
			</div>
			);
	}

  	render() {

		var { user, pastSessions } = this.props;
		
		return (
			<div>
				<div className="welcome">Welcome Back {user.title} {user.lastname}</div>

				<div className="instruction-wrapper">
					<div className="instruction">Choose a previous session or </div>
					<div className="btn new-session" onClick={this.handleNewSessionClick.bind(this)}>Start New Session</div>
				</div>

			</div>
		);
	}
}


const mapStateToProps = state => ({
	user : state.user,
	pastSessions : state.sessionHistory
})

const mapDispatchToProps = dispatch => ({
	loadSessionHistory: (token) => {dispatch(loadSessionHistory(token))},
	changeRoute: (route) => {dispatch(push(route))}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)	



