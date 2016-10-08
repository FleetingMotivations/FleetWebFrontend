import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as FleetActions from '../actions';

import Select from 'react-select';
import '../styles/Select.css';

class RoomSelect extends Component{
	static propTypes = {

	}

	componentWillMount() {
	 	this.props.actions.fetchCampuses();
	}

	selectRoom() {
		this.props.actions.commitRoomSelection();
		browserHistory.push('/workstationSelect');
	}

	selectBuilding(){
		this.props.actions.commitBuildingSelection();
		this.props.actions.fetchRooms();
	}

	selectCampus(){
		this.props.actions.commitCampusSelection();
		this.props.actions.fetchBuildings();
	}

	render() {

		var { 
			rooms, 
			buildings, 
			campuses,
			selectedRoom, 
			roomCommited,
			selectedBuilding,
			buildingCommited,
			selectedCampus,
			campusCommited
		} = this.props;
		
		var instruction, val, options, select, deselect, cont;

		if(!campusCommited) {
			instruction = "Please select your campus";
			val = selectedCampus ? {value: selectedCampus.id, label: selectedCampus.name} : null;
			options = campuses;
			cont = this.selectCampus.bind(this)			
			select = this.props.actions.selectCampus;
			deselect = this.props.actions.deselectCampus;
			
		} else if(!buildingCommited) {
			instruction = "Please select your building";
			val = selectedBuilding ? {value: selectedBuilding.id, label: selectedBuilding.name} : null;
			options = buildings;
			cont = this.selectBuilding.bind(this)
			select = this.props.actions.selectBuilding;
			deselect = this.props.actions.deselectBuilding;
		} else if(!roomCommited) {
			instruction = "Please select your room";
			val = selectedRoom ? {value: selectedRoom.id, label: selectedRoom.name} : null;
			options = rooms;
			cont = this.selectRoom.bind(this);
			select = this.props.actions.selectRoom;
			deselect = this.props.actions.deselectRoom;
			
		} else {
			instruction = "oops something went wrong...";
		}
		
		var btnClass = "btn small right " + ((val == null) ? "grey" : "green");

		return(
			<div>
			<div className="room-select">
				<h2>{instruction}</h2>

				<div className="room-list">
					<Select
						name="room-select"
						value={val}
						options={options.map((option, index) => {return {value: index, label: option.name}})}
						onChange={(val) => { val ? select(val.value) : deselect() }}
						/>            
				</div>
			
				<div id="continue-btn" className={btnClass} onClick={cont}>Continue</div>
			</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
		rooms: state.session.rooms,
		buildings: state.session.buildings,
		campuses: state.session.campuses,
		selectedCampus: (state.session.selectedCampusId != null) ? state.session.campuses[state.session.selectedCampusId] : null,
		selectedRoom: (state.session.selectedRoomId != null) ? state.session.rooms[state.session.selectedRoomId] : null,
		selectedBuilding: (state.session.selectedBuildingId != null) ? state.session.buildings[state.session.selectedBuildingId] : null,
		roomCommited: state.session.roomCommited,
		buildingCommited: state.session.buildingCommited,
		campusCommited: state.session.campusCommited,
		fetchingRooms: state.session.fetchingRooms,
		fetcingBuildings: state.session.fetcingBuildings,
		fetchingCampuses: state.session.fetchingCampuses
})


const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomSelect)	