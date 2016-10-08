import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import FileShare from '../components/FileShare';
import SessionControl from '../components/SessionControl';
import WorkstationsDisplay from '../components/WorkstationsDisplay';
import SideBar from '../components/SideBar';


class Session extends Component{
	static propTypes = {

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

	pauseSharing(){
		this.props.actions.disableSharingAll();
	}

	resumeSharing(){
		this.props.actions.enableSharingAll();
	}

	endSession(){
		this.props.action.endSession();
	}

	render() {

		var { workstations, applications, workgroup, allSharingDisabled } = this.props;
		

		var availableWorkstations = workstations.filter(w => {return !w.inWorkgroup && w.available})
		var takenWorkstations = workstations.filter(w => {return !w.available})
		var workgroupWorkstations = workstations.filter(w => {
			return workgroup.find(id => {return id === w.id}) !== undefined
		})
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
			        <div className="session-duration">Time Remaining: </div>

			        <WorkstationsDisplay workstations={workstations} workstationClicked={this.workstationClicked.bind(this)}/>
						

			        <SessionControl
			        	allSharingPaused={allSharingDisabled}
			        	addWorkstations={this.addWorkstations.bind(this)}
			        	removeWorkstations={this.removeWorkstations.bind(this)}
			        	disableSharing={this.disableSharing.bind(this)}
			        	enableSharing={this.enableSharing.bind(this)}
			        	pauseAllSharing={this.pauseSharing.bind(this)}
			        	resumeAllSharing={this.resumeSharing.bind(this)}
			        	endSession={this.endSession.bind(this)}
			         />

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
	allSharingDisabled: state.session.allSharingDisabled
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Session)	



