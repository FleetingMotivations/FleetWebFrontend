import React, { Component, PropTypes } from 'react';
import workstationImg from '../images/workstation.png';

export default class WorkstationsDisplay extends Component{
	
	renderWorkstation(workstation){
		var { workstationClicked } = this.props;

		var wclass = "workstation " 
								+ (workstation.inWorkgroup ? " not-available " : "") 
								+ (workstation.selected ? " selected " : "");
		return (
				<div className={wclass} key={workstation.id} onClick={()=>{workstationClicked(workstation.id)}}  
						 data-workstation-id={workstation.id} 
						 style={{top: workstation.top, left:workstation.left}}>
					<img src={workstationImg} role="presentation"/>
					<div className="name"><span data-status={workstation.status} className="status"></span>{workstation.name}</div>
				</div>
		);
	}

	render(){
		var { workstations } = this.props;

		if(!workstations || workstations.length === 0)
		{
			return(
				<div>Workstations Loading</div>
			);
		}

		return(
				<div id="workstation-display" className="workstations">
					{workstations.map(workstation =>{return this.renderWorkstation(workstation)})}
				</div>
		);
	}
}
