import React, { Component, PropTypes } from 'react';

export default class SessionDetails extends Component{
  render(){

  	var { applications, workstations, workgroup } = this.props;

    return(
		<div id="sidebar">
	      <div className="session-details">
	        <div className="application-list">
	          <h3>Applications</h3>
	          <ul>
	          {applications.map(app => {
	            return <li><span className="name">{app.name}</span><span className="app-status" data-app-status={app.status} >{app.status}</span> </li>
	          })}
	          </ul>
	          
	        </div>
	        <div className="workgroup-list">
	          <h3>Workgroup</h3>
	          <ul>
	            {workgroup.workstations.map(workstation => {
	              return <li onMouseOut={this.exitHoverWorkstation} onMouseOver={this.hoverWorkstation} data-workstation-id={workstation.id}><span className="name">{workstation.name}</span><WorkstationStatus status={workstation.status}/> <div className="remove"></div></li>
	            })}
	          </ul>
	        </div>
	        <div className="workstation-list">
	          <h3>Workstations</h3>
	          <ul>
	            {workstations.map(workstation => {
	              return <li onMouseOut={this.exitHoverWorkstation} onMouseOver={this.hoverWorkstation} data-workstation-id={workstation.id}><span className="name">{workstation.name}</span> <WorkstationStatus status={workstation.status} /> <div className="add"></div></li>
	            })}
	          </ul>
	        </div>
	      </div>
		</div>
    );
  }

  hoverWorkstation(e){
    var hoverWorkstationId = e.target.getAttribute('data-workstation-id');
    var result = document.querySelectorAll('.workstations .workstation[data-workstation-id="'+hoverWorkstationId+'"]');
    var workstation = result[0];
    workstation.className += ' selected';
  }

  exitHoverWorkstation(e){
    var hoverWorkstationId = e.target.getAttribute('data-workstation-id');
    var result = document.querySelectorAll('.workstations .workstation[data-workstation-id="'+hoverWorkstationId+'"]');
    var workstation = result[0];
    workstation.className = 'workstation';
  }
}