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
	commitBuildingSelection
} from '../actions';

import Select from 'react-select';
import '../styles/Select.css';

class RoomSelect extends Component{
	static propTypes = {

	}

	roomSelectChange(val){
		if(val) {
			this.props.selectRoom(val.value);
		} else {
			this.props.deselectRoom();
		}
	}

	buildingSelectChange(val){
		if(val){
			this.props.selectBuilding(val.value);
		} else {
			this.props.deselectBuilding();
		}
	}

	selectRoom() {
		this.props.commitRoomSelection();
		
		var newPath = "/"+this.props.selectedBuilding.id+"/"+this.props.selectedRoom.id;
		browserHistory.push(newPath)
	}

	selectBuilding(){
		this.props.commitBuildingSelection();
	}

	render() {
		var { 
			rooms, 
			buildings, 
			selectedRoom, 
			roomCommited,
			selectedBuilding,
			buildingCommited
		} = this.props;
		
		var instruction, val, options, change, cont;

		if(buildingCommited) 
		{
			instruction = "Please select your room";
			val = selectedRoom ? {value: selectedRoom.id, label: selectedRoom.name} : null;
			options = rooms;
			change = this.roomSelectChange.bind(this);
			cont = this.selectRoom.bind(this);
		}
		else
		{
			instruction = "Please select your building";
			val = selectedBuilding ? {value: selectedBuilding.id, label: selectedBuilding.name} : null;
			options = buildings;
			change = this.buildingSelectChange.bind(this);
			cont = this.selectBuilding.bind(this)

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
						onChange={change}
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
		selectedRoom: (state.session.selectedRoomId != null) ? state.session.rooms[state.session.selectedRoomId] : null,
		selectedBuilding: (state.session.selectedBuildingId != null) ? state.session.buildings[state.session.selectedBuildingId] : null,
		roomCommited: state.session.roomCommited,
		buildingCommited: state.session.buildingCommited
})

const mapDispatchToProps = dispatch => ({
	selectRoom: (roomId) => {dispatch(selectRoom(roomId))},
	deselectRoom: () => {dispatch(deselectRoom())},
	commitRoomSelection: () => {dispatch(commitRoomSelection())},
	selectBuilding: (buildingId) => {dispatch(selectBuilding(buildingId))},
	deselectBuilding: () => {dispatch(deselectBuilding())},
	commitBuildingSelection: () => {dispatch(commitBuildingSelection())}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomSelect)	