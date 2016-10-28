/* 
 * Description: Workstation Selection Component for React web app. 
 *				Displays all the available workstations to be selected before
 *				a workgroup session is started	
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
import Select from 'react-select';

import moment from 'moment';

import WorkstationsDisplay from '../components/WorkstationsDisplay';

class WorkstationSelect extends Component{

	componentWillMount() {
		this.props.actions.fetchWorkstations(this.props.state.session.selectedRoomId);
	}

	workstationClicked(workstationId){
		var find = this.props.selectedWorkstations.find(id => id === workstationId);
		if(find !== undefined ){
			this.props.actions.deselectWorkstation(workstationId);
		} else {
			this.props.actions.selectWorkstation(workstationId);
		}
	}

	selectTime(val){
		var v = val ? val.value : null
		this.props.actions.selectEndTime(v);
	}

	commitSession(){
		this.props.actions.commitSession();

		browserHistory.push('/session');
	}

	render() {
		var { endTime, workstations } = this.props;

		/* generate list of tiems based on 15 minute increments */
		var timeOptions = [];
		
		var mmt = moment().add('m', 15 - moment().minute() % 15);
		var mmtMidnight = mmt.clone().hour(23).minute(59).second(59);


		var diffHours = mmtMidnight.diff(mmt, 'hours');
		//TODO(AL):Remove this diff bit
		diffHours = 4;


		for(var i = 0; i < diffHours*4; i++)
		{	
			var newMoment = mmt.clone().add(i*15, 'minutes');
			timeOptions.push({
				value: newMoment,
				label: newMoment.format('LT')
			})
		}

		var startSessionClass = "start-button btn " + (endTime ? "green" : "grey");

		var commit = endTime ? this.commitSession.bind(this) : null

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
					  value={endTime ? {value: endTime, label: moment(endTime).format('LT')} : null}
					  options={timeOptions}
					  onChange={this.selectTime.bind(this)}

					/>
				  </div>
				</div>

				<div className="buttons">
				  <div onClick={this.props.actions.deselectAllWorkstations}className="deselect-all btn">Select None</div>
				  <div onClick={this.props.actions.selectAllWorkstations}className="select-all btn">Select All</div>
				  <div onClick={commit} className={startSessionClass} >Start Session</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	state: state,
	endTime: state.session.endTime,
	workstations: state.session.workstations,
	selectedWorkstations: state.session.selectedWorkstations,
	userId: state.user.userId
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WorkstationSelect)	