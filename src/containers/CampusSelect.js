import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import Selector from '../components/Selector';

class RoomSelect extends Component{

	componentWillMount() {
	 	this.props.actions.fetchCampuses();
	}

	selectCampus(){
		this.props.actions.commitCampusSelection();
		browserHistory.push('/buildingSelect');
	}

	render() {

		var {campuses, selectedCampus, campusCommited, fetchingCampuses } = this.props;
		
		var display = null;
		var instruction = "Please select your campus";

		if(fetchingCampuses) {
			display = <div className="loader">Loading Campuses...</div>
		} else {
			var val = selectedCampus ? {value: selectedCampus.id, label: selectedCampus.name} : null;
			var options = campuses;
			var cont = val ? this.selectCampus.bind(this) : null
			var select = this.props.actions.selectCampus;
			var deselect = this.props.actions.deselectCampus;
				
			var btnClass = "btn small right " + ((val == null) ? "grey" : "green");

			var display =   <Selector val={val} options={options} btnClass={btnClass} select={select} deselect={deselect} cont={cont} />
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
		campuses: state.session.campuses,
		selectedCampus: (state.session.selectedCampusId != null) ? state.session.campuses.find(c => {return c.id === state.session.selectedCampusId}) : null,
		campusCommited: state.session.campusCommited,
		fetchingCampuses: state.session.fetchingCampuses
})


const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoomSelect)	