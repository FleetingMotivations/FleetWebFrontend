import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FleetActions from '../actions';
import Select from 'react-select';

import WorkstationsDisplay from '../components/WorkstationsDisplay';

class Room extends Component{
	static propTypes = {

	}

	workstationSelect(){
		
	}

	selectTime(val){
		console.log(val);
	}

	deselectAll(){

	}

	selectAll(){

	}

	commitSession(){

	}

	render() {
		var { endTime, workstations } = this.props;

		return (
			<div className="start-session">
		        <h2>Start a collaboration session</h2>
		        <div className="instruction">Select workstations to join your workgroup</div>
		        
		        <WorkstationsDisplay workstations={workstations} workstationClicked={this.workstationSelect.bind(this)}/>


		        <div className="duration">
		          <div className="start">Starting from now until: </div>
		          <div className="end">
		            <Select
		              id="time"
		              name="session-end-select"
		              value={endTime ? {value: endTime.time, label: endTime.text} : null}
		              options={[{value: '5:00 AM', label: '5:00 AM'},{value: '5:00 AM', label: '5:00 AM'}]}
		              onChange={this.selectTime.bind(this)}

		            />
		          </div>
		        </div>

		        <div className="buttons">
		          <div onClick={this.deselectAll.bind(this)}className="deselect-all btn grey">Select None</div>
		          <div onClick={this.selectAll.bind(this)}className="select-all btn">Select All</div>
		          <div onClick={this.commitSession.bind(this)} className="start-button btn grey" id="start-session-btn">Start Session</div>
		        </div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	endTime: state.session.endTime,
	workstations: state.session.workstations
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Room)	