import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import WorkstationsDisplay from '../components/WorkstationsDisplay';
import SideBar from '../components/SideBar';

import * as config from '../../config.json';

const pollInterval = config.dev.pollInterval;
var pollIntervalId = null;
var countdownIntervalId = null;

class Session extends Component{
	componentDidMount(){
		pollIntervalId = window.setInterval(this.props.actions.pollForWorkstations, pollInterval);
		countdownIntervalId = window.setInterval(this.props.actions.timerCountdown, 1000);
	}

	componentWillUnmount(){
		clearInterval(pollIntervalId);
		clearInterval(countdownIntervalId);
	}

	addWorkstation(id){
		this.props.actions.addWorkstationsToWorkgroup([id]);
	}

	addWorkstations(){
		this.props.actions.addWorkstationsToWorkgroup(this.props.selectedWorkstations);
	}

	removeWorkstation(id){
		this.props.actions.removeWorkstationsFromWorkgroup([id]);
	}

	removeWorkstations(){
		this.props.actions.removeWorkstationsFromWorkgroup(this.props.selectedWorkstations);
	}

	workstationClicked(workstationId){
		var workstation = this.props.selectedWorkstations.find((w)=>{return w === workstationId});
		if(workstation){
			this.props.actions.deselectWorkstation(workstationId);
		} else {
			this.props.actions.selectWorkstation(workstationId);
		}
	}

	disableSharing(){
		this.props.actions.disableSharing(this.props.selectedWorkstations);
	}

	enableSharing(){
		this.props.actions.enableSharing(this.props.selectedWorkstations);
	}

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
				</div>
			)
		}


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



