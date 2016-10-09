import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as FleetActions from '../actions';

import Selector from '../components/Selector';

class RoomSelect extends Component{
	static propTypes = {

	}

	componentWillMount() {
	 	this.props.actions.fetchCampuses();
	}

	selectCampus(){
		this.props.actions.commitCampusSelection();
		browserHistory.push('/buildingSelect');
	}

	render() {

		var {campuses, selectedCampus, campusCommited, fetchingCampuses } = this.props;
		
		var instruction, val, options, select, deselect, cont;

		if(!campusCommited) {
			instruction = "Please select your campus";
			val = selectedCampus ? {value: selectedCampus.id, label: selectedCampus.name} : null;
			options = campuses;
			cont = val ? this.selectCampus.bind(this) : null
			select = this.props.actions.selectCampus;
			deselect = this.props.actions.deselectCampus;
			
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

		if(fetchingCampuses) {
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
		campuses: state.session.campuses,
		selectedCampus: (state.session.selectedCampusId != null) ? state.session.campuses[state.session.selectedCampusId] : null,
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