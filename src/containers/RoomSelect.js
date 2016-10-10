import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import Selector from '../components/Selector';

class RoomSelect extends Component{
	static propTypes = {

	}

	componentWillMount() {
	 	this.props.actions.fetchRooms(this.props.state.session.selectedBuildingId);
	}

	selectRoom() {
		this.props.actions.commitRoomSelection();
		browserHistory.push('/workstationSelect');
	}

	render() {

		var {rooms, selectedRoom, roomCommited, fetchingRooms } = this.props;
		var instruction, val, options, select, deselect, cont;

		if(!roomCommited) {
			instruction = "Please select your room";
			val = selectedRoom ? {value: selectedRoom.id, label: selectedRoom.name} : null;
			options = rooms;
			cont = val ? this.selectRoom.bind(this) : null;
			select = this.props.actions.selectRoom;
			deselect = this.props.actions.deselectRoom;
			
		} else {
			instruction = "oops something went wrong...";
		}
		
		var btnClass = "btn small right " + ((val == null) ? "grey" : "green");

		var display =   <Selector 
							val={val}
							options={options}
							btnClass={btnClass}
							select={select}
							deselect={deselect}
							cont={cont}
						/>

		if(fetchingRooms) {
			display = <div className="loader">Loading Campuses...</div>
		}

		return(
			<div>
				<div className="room-select">
					<h2>{instruction}</h2>

				 	{display}
					
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
		state: state,
		rooms: state.session.rooms,
		selectedRoom: (state.session.selectedRoomId != null) ? state.session.rooms[state.session.selectedRoomId] : null,
		roomCommited: state.session.roomCommited,
		fetchingRooms: state.session.fetchingRooms
})


const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomSelect)	