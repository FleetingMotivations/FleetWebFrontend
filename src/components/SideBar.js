/* 
 * Description: React Sidebar component rendering sidebar for the currently running session
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */ 

import React, { Component } from 'react';

export default class SessionDetails extends Component{
  render(){

  	var { 	
  		workstations, 
		workgroup, 
		unavailableWorkstations,
		addWorkstationToWorkgroup,
		removeWorkstationFromWorkgroup 
  	} = this.props;

	function sortFunc(a, b){
		if(a.name < b.name) return -1;
		if(a.name > b.name) return 1;
		return 0;
	}

  	var sortedWorkgroup = workgroup.sort(sortFunc);
  	var sortedUnavailableWorkstations = unavailableWorkstations.sort(sortFunc);
  	var sortedWorkstations = workstations.sort(sortFunc);

  	return(
		<div id="sidebar">
	      <div className="session-details">
	        <div className="workgroup-list">
	          <h3>Workgroup</h3>
	          <ul>
	            {sortedWorkgroup.map(workstation => {  
	              	return <li data-workstation-id={workstation.id}><span className="name">{workstation.name}</span> <div className="remove" onClick={() => {removeWorkstationFromWorkgroup(workstation.id)}}></div></li>
	            })}
	          </ul>
	        </div>
	        <div className="workstation-list">
	          <h3>Available Workstations</h3>
	          <ul>
	            {sortedWorkstations.map(workstation => {
	              return <li data-workstation-id={workstation.id}><span className="name">{workstation.name}</span> <div className="add" onClick={() => {addWorkstationToWorkgroup(workstation.id)}}></div></li> 
	          	})}
	          </ul>
	        </div>
	        <div className="workstation-list">
	          <h3>Unavailable Workstations</h3>
	          <ul>
	            {sortedUnavailableWorkstations.map(workstation => {
	              return <li data-workstation-id={workstation.id}><span className="name">{workstation.name}</span> </li> 
	          	})}
	          </ul>
	        </div>
	      </div>
		</div>
    );
  }
}