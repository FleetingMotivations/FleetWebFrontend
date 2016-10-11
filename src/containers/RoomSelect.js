/* 
 * Description: Room Selector component for the React web application
 *				
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import Selector from '../components/Selector';

class RoomSelect extends Component{
	static propTypes = {

	}

	/* fetch list of rooms within building before component renders */
	componentWillMount() {
	 	this.props.actions.fetchRooms(this.props.state.session.selectedBuildingId);
	}

	/* handles room selection commited and changes to next view */
	selectRoom() {
		this.props.actions.commitRoomSelection();
		browserHistory.push('/workstationSelect');
	}

	render() {

		var {rooms, selectedRoom, roomCommited, fetchingRooms } = this.props;

		var display = null;
		var instruction = "Please select your room";

		if(fetchingRooms) {
			display = <div className="loader">Loading Campuses...</div>
		} else {
			var val = selectedRoom ? {value: selectedRoom.id, label: selectedRoom.name} : null;
			var options = rooms;
			var cont = val ? this.selectRoom.bind(this) : null;
			var select = this.props.actions.selectRoom;
			var deselect = this.props.actions.deselectRoom;
			
			var btnClass = "btn small right " + ((val == null) ? "grey" : "green");

			var display = <Selector val={val} options={rooms} btnClass={btnClass} select={select} deselect={deselect} cont={cont} />
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

/* Redux functions for mapping state to props */
const mapStateToProps = state => ({
		state: state,
		rooms: state.session.rooms,
		selectedRoom: (state.session.rooms != null) ? state.session.rooms.find(r => r.id === state.session.selectedRoomId) : null,
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