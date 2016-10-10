import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/app.css';

class App extends Component {
	static propTypes = {
 		actions: PropTypes.object.isRequired   
	}

	signOut(){
		this.props.actions.logout();
	}

	render(){
		const { children, room, building, campus, loggedIn, sessionStarted, requestingStart } = this.props;

		var navTitle = '';

		if(sessionStarted || requestingStart || this.props.location.pathname == '/workstationSelect'){

		   navTitle = campus.name + " | " + building.name + " | "+ room.name
		}
		
		return (
			<div className="App">
				
				<NavBar  navTitle={navTitle} loggedIn={loggedIn} signOutClick={this.signOut.bind(this)} />	

				{children}

				<Footer />
			</div>	
		);
	}
}


const mapStateToProps = (state) => ({
	campus: (state.session.selectedCampusId != null) ? state.session.campuses[state.session.selectedCampusId] : null,
	building: (state.session.selectedBuildingId != null) ? state.session.buildings[state.session.selectedBuildingId] : null,
	room : (state.session.selectedRoomId != null) ? state.session.rooms[state.session.selectedRoomId] : null,
	loggedIn: state.user.loggedIn,
	sessionStarted: state.session.started,
	requestingStart: state.session.requestingStart
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)