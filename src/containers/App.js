import '../styles/app.css';

import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FleetActions from '../actions';
/** import components here **/

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import BGImage from '../images/image0027.jpg';

// browserHistory.push('/roomSelect');

class App extends Component {
	static propTypes = {
 		actions: PropTypes.object.isRequired   
	}

	render(){
		const { children, room, building, campus, loggedIn } = this.props;

		var navTitle = campus ? (campus.name + (building ? " | " + building.name + (room ? " | "+room.name : "") : "")) : "";

		return (
			<div className="App">
				
				<NavBar  navTitle={navTitle} loggedIn={loggedIn} />	

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
	loggedIn: state.user.loggedIn
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)