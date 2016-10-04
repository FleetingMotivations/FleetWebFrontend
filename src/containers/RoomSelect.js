import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
	selectRoom, 
	deselectRoom, 
	commitRoomSelection,
	selectBuilding,
	deselectBuilding,
	commitBuildingSelection,
	selectCampus,
	deselectCampus,
	commitCampusSelection
} from '../actions';

import Select from 'react-select';
import '../styles/Select.css';

class RoomSelect extends Component{
	static propTypes = {

	}

	selectRoom() {
		this.props.commitRoomSelection();
		
		var newPath = "/"+this.props.selectedBuilding.id+"/"+this.props.selectedRoom.id;
		browserHistory.push(newPath)
	}

	selectBuilding(){
		this.props.commitBuildingSelection();
	}

	selectCampus(){
		this.props.commitCampusSelection();
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
			select = this.props.selectCampus;
			deselect = this.props.deselectCampus;
			
		} else if(!buildingCommited) {
			instruction = "Please select your building";
			val = selectedBuilding ? {value: selectedBuilding.id, label: selectedBuilding.name} : null;
			options = buildings;
			cont = this.selectBuilding.bind(this)
			select = this.props.selectBuilding;
			deselect = this.props.deselectBuilding;
		} else if(!roomCommited) {
			instruction = "Please select your room";
			val = selectedRoom ? {value: selectedRoom.id, label: selectedRoom.name} : null;
			options = rooms;
			cont = this.selectRoom.bind(this);
			select = this.props.selectRoom;
			deselect = this.props.deselectRoom;
			
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
		campusCommited: state.session.campusCommited
})

const mapDispatchToProps = dispatch => ({
	selectRoom: (roomId) => {dispatch(selectRoom(roomId))},
	deselectRoom: () => {dispatch(deselectRoom())},
	commitRoomSelection: () => {dispatch(commitRoomSelection())},
	selectBuilding: (buildingId) => {dispatch(selectBuilding(buildingId))},
	deselectBuilding: () => {dispatch(deselectBuilding())},
	commitBuildingSelection: () => {dispatch(commitBuildingSelection())},
	selectCampus: (CampusId) => {dispatch(selectCampus(CampusId))},
	deselectCampus: () => {dispatch(deselectCampus())},
	commitCampusSelection: () => {dispatch(commitCampusSelection())}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomSelect)	