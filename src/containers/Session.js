/* 
 * Description: Session component for React web application
 *				This displays the current workgroup within a particular room
 *				This also handles the creation and clearing of polling events to
 *				the server to maintain a live status of the environment 	
 * 			
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import WorkstationsDisplay from '../components/WorkstationsDisplay';
import SideBar from '../components/SideBar';

import * as config from '../../config.json';

/* Polling interval based on environment */
const pollInterval = (process.env.NODE_ENV === 'production') ? config.prod.pollInterval : config.dev.pollInterval;

/* Polling Ids set when the component mounts, stored here because they are not necessary for state */
var workstationPollId = null;
var countdownIntervalId = null;
var workgroupPollId = null

class Session extends Component{
	
	/* before component renders begin polling events and ensure session is currently underway */
	componentDidMount(){
		this.props.actions.checkSessionRunning()

		workgroupPollId = window.setInterval(this.props.actions.pollWorkgroups, pollInterval);
		workstationPollId = window.setInterval(this.props.actions.pollForWorkstations, pollInterval);
		countdownIntervalId = window.setInterval(this.props.actions.timerCountdown, 1000);
	}

	/** reset polling intervals when component is unmounted */
	componentWillUnmount(){
		clearInterval(workstationPollId);
		clearInterval(countdownIntervalId);
		clearInterval(workgroupPollId);
	}

	/* handler for adding workstation to workgroup */
	addWorkstation(id){
		this.props.actions.addWorkstationsToWorkgroup([id]);
	}

	/* handler for adding all selected workstation to workgroup */
	addWorkstations(){
		this.props.actions.addWorkstationsToWorkgroup(this.props.selectedWorkstations);
	}

	/* handler for removing given workstation from workgroup */
	removeWorkstation(id){
		this.props.actions.removeWorkstationsFromWorkgroup([id]);
	}

	/* handler for removing all selected workstations from workgroup */
	removeWorkstations(){
		this.props.actions.removeWorkstationsFromWorkgroup(this.props.selectedWorkstations);
	}

	/* handler for selecting and deselecting workstation */
	workstationClicked(workstationId){
		var workstation = this.props.selectedWorkstations.find(id => id === workstationId);
		if(workstation){
			this.props.actions.deselectWorkstation(workstationId);
		} else {
			this.props.actions.selectWorkstation(workstationId);
		}
	}

	/* handler for disabling all sharing workgroup */
	disableSharing(){
		this.props.actions.disableSharing(this.props.selectedWorkstations);
	}

	/* handler for enabling all sharing in workgroup */
	enableSharing(){
		this.props.actions.enableSharing(this.props.selectedWorkstations);
	}

	/* handler for ending workgroup */
	endSession(){
		this.props.actions.endSession();
		browserHistory.push('/');
	}

	render() {

		var { workstations, workgroup, allSharingDisabled, countDown, selectedWorkstations, started, requestingStart } = this.props;
		
		var availableWorkstations = workstations.filter(w => {return !w.inWorkgroup && w.available}).sort( (a,b) => {return a.name >= b.name})
		var takenWorkstations = workstations.filter(w => {return !w.available})
		var workgroupWorkstations = workstations.filter(w => {
			return workgroup.find(id => {return id === w.id}) !== undefined
		})
		

		if(requestingStart) {
			return (
				<div>
					<SideBar 
			        	workstations={workstations}
			        	workgroup={[]}
			        	unavailableWorkstations={workstations}
					/>
					<div className="loader sessionStart">Requesting Session Start...</div>
				</div>
			)
		} else if(!requestingStart && !started) {
			return (
				<div>
					<h3 style={{textAlign: "center", fontWeight: "normal", marginTop: 20}}><i>Error connecting to or creating session</i></h3>
					<div style={{textAlign: "center", fontWeight: "normal", marginTop: 20}}>The session time may have run out</div>
				</div>
			)
		}

		/** The following buttons are set to dynamically change based on the current state and selection of 
			workstations in the workgroup. 
		**/

		var shareButton = <div className="btn" onClick={this.props.actions.disableSharingAll}>Stop All Sharing</div>

		if(allSharingDisabled) {
			shareButton = <div className="btn" onClick={this.props.actions.enableSharingAll}>Resume All Sharing</div>
		}

		var btn1 = {style: "btn ", text: "Disable Sharing", func: this.disableSharing.bind(this)};
		var btn2 = {style: "btn ", text: "Enable Sharing", func: this.enableSharing.bind(this)};
		var btn3 = {style: "btn ", text: "Add", func: this.addWorkstations.bind(this)};
		var btn4 = {style: "btn ", text: "Remove", func: this.removeWorkstations.bind(this)};
		var btn5 = {style: "btn ", text: "Select All", func: this.props.actions.selectAllWorkstations }
		var btn6 = {style: "btn ", text: "Deselect All", func: this.props.actions.deselectAllWorkstations}
		

		var selected = workstations.filter(w => {return selectedWorkstations.indexOf(w.id) > -1})
		var inWorkgroup = selected.filter(w => {return w.inWorkgroup})

		/** Checking for different conditions to disable the use of a particular button */

		if(inWorkgroup.filter(w => {return w.canShare}).length === 0) {
			btn1.style += "grey";
			btn1.func = null
		}

		if(inWorkgroup.filter(w => {return !w.canShare}).length === 0) {
			btn2.style += "grey";
			btn2.func = null
		}

		if(selected.filter(w => {return !w.inWorkgroup}).length === 0) {
			btn3.style += "grey";
			btn3.func = null
		}

		if(selected.filter(w => {return w.inWorkgroup}).length === 0) {
			btn4.style += "grey";
			btn4.func = null
		}

		if(selected.length === 0){
			btn6.style += "grey";
			btn6.func = null
		}

		return (
			<div>
		        <SideBar 
		        	workstations={availableWorkstations}
		        	workgroup={workgroupWorkstations}
		        	unavailableWorkstations={takenWorkstations}

		        	addWorkstationToWorkgroup={this.addWorkstation.bind(this)}
					removeWorkstationFromWorkgroup={this.removeWorkstation.bind(this)} 
				/>
				<div className="current-session">
			        <div className="session-duration">Time Remaining: {countDown}</div>
					<div className="end-session-wrapper">
			      		<div className="btn red end-session" onClick={this.endSession.bind(this)}>End Workgroup</div>
					</div>
					
			        <WorkstationsDisplay workstations={workstations} workstationClicked={this.workstationClicked.bind(this)}/>
					
					<div className="control">
						<h3>Control</h3>
					</div>
					<div className="control selected-workstations">
			         
				         <div className={btn1.style} onClick={btn1.func}>{btn1.text}</div>
				         <div className={btn2.style} onClick={btn2.func}>{btn2.text}</div>
				         <div className={btn3.style} onClick={btn3.func}>{btn3.text}</div>
				         <div className={btn4.style} onClick={btn4.func}>{btn4.text}</div>
			        </div>
					<div className="control all-workstations">
				         
				         {shareButton}
				         <div className={btn5.style} onClick={btn5.func}>{btn5.text}</div>
				         <div className={btn6.style} onClick={btn6.func}>{btn6.text}</div>
				         
			         </div>

		      	</div>
	      	</div>
		);
	}
}


const mapStateToProps = state => ({
	workstations: state.session.workstations,
	applications: state.session.applications,
	workgroup: state.session.workgroup,
	selectedWorkstations: state.session.selectedWorkstations,
	allSharingDisabled: state.session.allSharingDisabled,
	countDown: state.session.countDown,
	started: state.session.started,
	requestingStart: state.session.requestingStart
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Session)	



