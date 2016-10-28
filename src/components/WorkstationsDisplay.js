/* 
 * Description: React Workstation Display Component
 * 				Outputs the group of workstations and their styles based on the session state
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */


import React, { Component } from 'react';
import workstationImg from '../images/workstation.png';
import shareOpen from '../images/share-open.png';
import shareClosed from '../images/share-closed.png';

export default class WorkstationsDisplay extends Component{
	
	/** Returns a single workstation item (as jsx) based on the given workstation state
		and applies the workstationClicked function property for when a workstation
		is clicked 
	**/
	renderWorkstation(workstation){
		var { workstationClicked } = this.props;

		var shareIcon = workstation.canShare ? <img className="share" src={shareOpen} role="presentation"/> 
											 : <img className="share" src={shareClosed} role="presentation"/>;

		
		var wclass = "workstation " + (!workstation.available && !workstation.inWorkgroup ? " not-available " : "") 
									+ (workstation.selected ? " selected " : "")
									+ (workstation.inWorkgroup ? " in-workgroup " : "");

		var changePending = (workstation.requestDisable || workstation.requestEnable 
						   	|| workstation.requestRemoveFromWorkgroup || workstation.requestAddToWorkgroup)

		var loading = changePending ? <div className="loader">Loading Campuses...</div> : null

		if(changePending) {
			wclass += " pending";
		}

		return (
				<div className={wclass} 
					 key={workstation.id} 
					 onClick={()=>{workstationClicked(workstation.id)}}  
					 data-workstation-id={workstation.id}>
					{shareIcon}
					{loading}
					<img className="workstationImg" src={workstationImg} role="presentation"/>
					<div className="name">{workstation.name}</div>
				</div>
		);
	}
	/** Returns the workstation display component jsx based on the given state props */
	render(){
		var { workstations, fetchingWorkstations } = this.props;

		if((!workstations || workstations.length === 0) && fetchingWorkstations)
		{
			
			return( <div><div className="loader">Loading workstations...</div></div> );

		} else if(workstations.length === 0) {
			
			return( <div><i>There are no workstations in this room</i></div> );
		}

		var orderedWorkstations = workstations.sort(function(a, b){
			if(a.name < b.name) return -1;
			if(a.name > b.name) return 1;
			return 0;
		})

		return(
				<div id="workstation-display" className="workstations">
					{workstations.map(workstation =>{return this.renderWorkstation(workstation)})}
				</div>
		);
	}
}
