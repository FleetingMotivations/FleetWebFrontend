import React, { Component, PropTypes } from 'react';
import WorkstationStatus from './WorkstationStatus';

export default class SessionDetails extends Component{
  render(){

  	var { 	
  		workstations, 
		workgroup, 
		unavailableWorkstations,
		addWorkstationToWorkgroup,
		removeWorkstationFromWorkgroup 
  	} = this.props;


  	return(
		<div id="sidebar">
	      <div className="session-details">
	        <div className="workgroup-list">
	          <h3>Workgroup</h3>
	          <ul>
	            {workgroup.map(workstation => {  
	              	return <li onMouseOut={this.exitHoverWorkstation} onMouseOver={this.hoverWorkstation} data-workstation-id={workstation.id}><span className="name">{workstation.name}</span> <WorkstationStatus status={workstation.status} /> <div className="remove" onClick={() => {removeWorkstationFromWorkgroup(workstation.id)}}></div></li>
	            })}
	          </ul>
	        </div>
	        <div className="workstation-list">
	          <h3>Available Workstations</h3>
	          <ul>
	            {workstations.map(workstation => {
	              return <li onMouseOut={this.exitHoverWorkstation} onMouseOver={this.hoverWorkstation} data-workstation-id={workstation.id}><span className="name">{workstation.name}</span> <WorkstationStatus status={workstation.status} /> <div className="add" onClick={() => {addWorkstationToWorkgroup(workstation.id)}}></div></li> 
	          	})}
	          </ul>
	        </div>
	        <div className="workstation-list">
	          <h3>Unavailable Workstations</h3>
	          <ul>
	            {unavailableWorkstations.map(workstation => {
	              return <li onMouseOut={this.exitHoverWorkstation} onMouseOver={this.hoverWorkstation} data-workstation-id={workstation.id}><span className="name">{workstation.name}</span> <WorkstationStatus status={workstation.status} /> </li> 
	          	})}
	          </ul>
	        </div>
	      </div>
		</div>
    );
  }

  hoverWorkstation(e){
    // var hoverWorkstationId = e.target.getAttribute('data-workstation-id');
    // var result = document.querySelectorAll('.workstations .workstation[data-workstation-id="'+hoverWorkstationId+'"]');
    // var workstation = result[0];
    // workstation.className += ' selected';
  }

  exitHoverWorkstation(e){
    // var hoverWorkstationId = e.target.getAttribute('data-workstation-id');
    // var result = document.querySelectorAll('.workstations .workstation[data-workstation-id="'+hoverWorkstationId+'"]');
    // var workstation = result[0];
    // workstation.className = 'workstation';
  }
}