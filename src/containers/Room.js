import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	selectWorkstation,
	deselectWorkstation,
	selectEndTime,
	deselectAllWorkstations,
	selectAllWorkstations,
	commitSession
} from '../actions';
import Select from 'react-select';

import WorkstationsDisplay from '../components/WorkstationsDisplay';

class Room extends Component{
	static propTypes = {

	}

	workstationClicked(workstationId){
		var filter = this.props.selectedWorkstations.filter((w)=>{return w === workstationId});
		if(filter.length > 0){
			this.props.deselectWorkstation(workstationId);
		} else {
			this.props.selectWorkstation(workstationId);
		}
	}

	selectTime(val){
		var v = val ? val.value : null
		this.props.selectEndTime(v);
	}

	commitSession(){
		this.props.commitSession();
		// browserHistory.push("/:building/:room/session");
	}

	render() {
		var { endTime, workstations, selectedWorkstations } = this.props;

		var timeOptions = [];


		function addMinutes(date, minutes) {
			return new Date(date.getTime() + minutes*60000);
		}

		function formatAMPM(date) {
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0'+minutes : minutes;
			var strTime = hours + ':' + minutes + ' ' + ampm;
			return strTime;
		}

		var d1 = new Date();
		var d2 = new Date();
		var nd = new Date();
		var coeff = 1000 * 60 * 15;
		d2 = new Date(Math.round(nd.getTime() / coeff) * coeff)

		var msToMidnight = d1.setHours(24,0,0,0) - d2.getTime();
		var hoursToMidnight = msToMidnight / 100 / 60 / 60;

		for(var i = 1; i < hoursToMidnight*4; i++) {
			var nd = addMinutes(d2, 15*i);
			timeOptions.push({value: nd, label: formatAMPM(nd)})
		}

		var startSessionClass = "start-button btn " + (selectedWorkstations.length > 0 && endTime != null ? "green" : "grey");

		return (
			<div className="start-session">
				<h2>Start a collaboration session</h2>
				<div className="instruction">Select workstations to join your workgroup</div>
				
				<WorkstationsDisplay workstations={workstations} workstationClicked={this.workstationClicked.bind(this)}/>


				<div className="duration">
				  <div className="start">Starting from now until: </div>
				  <div className="end">
					<Select
					  id="time"
					  name="session-end-select"
					  value={endTime ? {value: endTime, label: formatAMPM(endTime)} : null}
					  options={timeOptions}
					  onChange={this.selectTime.bind(this)}

					/>
				  </div>
				</div>

				<div className="buttons">
				  <div onClick={this.props.deselectAllWorkstations}className="deselect-all btn grey">Select None</div>
				  <div onClick={this.props.selectAllWorkstations}className="select-all btn">Select All</div>
				  <div onClick={this.commitSession.bind(this)} className={startSessionClass} >Start Session</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	endTime: state.session.endTime,
	workstations: state.session.workstations,
	selectedWorkstations: state.session.selectedWorkstations
})

const mapDispatchToProps = dispatch => ({
selectWorkstation: (workstationId) => { dispatch(selectWorkstation(workstationId)) },
deselectWorkstation: (workstationId) => { dispatch(deselectWorkstation(workstationId)) },
selectEndTime: (time) => { dispatch(selectEndTime(time)) },
deselectAllWorkstations: () => { dispatch(deselectAllWorkstations()) },
selectAllWorkstations: () => { dispatch(selectAllWorkstations()) },
commitSession: () => { dispatch(commitSession()) }
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Room)	