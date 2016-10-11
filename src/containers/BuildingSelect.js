import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import Selector from '../components/Selector';

class RoomSelect extends Component{
	
	componentWillMount() {
		this.props.actions.fetchBuildings(this.props.state.session.selectedCampusId);
	}

	selectBuilding(){
		this.props.actions.commitBuildingSelection();
		browserHistory.push('/roomSelect');
	}
	
	render() {

		var {buildings, selectedBuilding, buildingCommited, fetchingBuildings } = this.props;
		
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

			var display = <Selector val={val} options={options} btnClass={btnClass} select={select} deselect={deselect} cont={cont} />
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
		buildings: state.session.buildings,
		selectedBuilding: (state.session.selectedBuildingId != null) ? state.session.buildings.find(b => {return b.id === state.session.selectedBuildingId}) : null,
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