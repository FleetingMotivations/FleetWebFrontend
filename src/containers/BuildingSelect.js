/* 
 * Description: Building Selector component for the React web application
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
	
	/* Before the component is displayed, fetches the buildings in the selected campus */
	componentWillMount() {
		this.props.actions.fetchBuildings(this.props.state.session.selectedCampusId);
	}

	/* handles completeing the building selection and navigating to the next view */
	selectBuilding(){
		this.props.actions.commitBuildingSelection();
		browserHistory.push('/roomSelect');
	}
	
	render() {

		var {buildings, selectedBuilding, fetchingBuildings } = this.props;
		
		var instruction = "Please select your building";
		var display = null;

		if(fetchingBuildings) {
			display = <div className="loader">Loading Campuses...</div>
		} else {
			var val = selectedBuilding ? {value: selectedBuilding.id, label: selectedBuilding.name} : null;
			var options = buildings;
			var cont = val ? this.selectBuilding.bind(this) : null
			var select = this.props.actions.selectBuilding;
			var deselect = this.props.actions.deselectBuilding;
			
			var btnClass = "btn small right " + ((val == null) ? "grey" : "green");

			display = <Selector val={val} options={options} btnClass={btnClass} select={select} deselect={deselect} cont={cont} />
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

/** Redux functions for accessing state in props */
const mapStateToProps = state => ({
		state: state,
		buildings: state.session.buildings,
		selectedBuilding: (state.session.selectedBuildingId != null && state.session.buildings != null) ? state.session.buildings.find(b => {return b.id === state.session.selectedBuildingId}) : null,
		buildingCommited: state.session.buildingCommited,
		fetcingBuildings: state.session.fetcingBuildings
})


const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomSelect)	