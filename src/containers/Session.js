import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { addWorkstationToWorkgroup, removeWorkstationFromWorkgroup } from '../actions';

import FileShare from '../components/FileShare';
import SessionControl from '../components/SessionControl';
import WorkstationsDisplay from '../components/WorkstationsDisplay';
import SideBar from '../components/SideBar';


class Session extends Component{
	static propTypes = {

	}

	addWorkstation(id){
		this.props.addWorkstationToWorkgroup(id);
	}

	removeWorkstation(id){
		this.props.removeWorkstationFromWorkgroup(id);
	}

	render() {

		var { workstations, applications, workgroup } = this.props;
		

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

			        <WorkstationsDisplay workstations={workstations} />
						

			        <SessionControl />

		      	</div>
	      	</div>
		);
	}
}


const mapStateToProps = state => ({
	workstations: state.session.workstations,
	applications: state.session.applications,
	workgroup: state.session.workgroup
})

const mapDispatchToProps = dispatch => ({
	addWorkstationToWorkgroup: (workstationId) => { dispatch(addWorkstationToWorkgroup(workstationId)) },
	removeWorkstationFromWorkgroup: (workstationId) => { dispatch(removeWorkstationFromWorkgroup(workstationId)) }
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Session)	



