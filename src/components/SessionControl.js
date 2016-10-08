import React, { Component, PropTypes } from 'react';

export default class WorkstationsDisplay extends Component{
	
	render(){
		
		const {
			allSharingPaused,
			pauseAllSharing,
			resumeAllSHaring,
			disableSharing,
			enableSharing,
			addWorkstations,
			removeWorkstations,
			endSession,
		} = this.props;

		var shareButton = <div className="btn" onClick={pauseAllSharing}>Pause All Sharing</div>

		if(allSharingPaused) {
			shareButton = <div className="btn" onClick={resumeAllSHaring}>Resume All Sharing</div>
		}

		return(      
			<div className="control">
	          <h3>Control</h3>
	          {shareButton}
	          <div className="btn" onClick={disableSharing}>Pause Selected Sharing</div>
	          <div className="btn" onClick={enableSharing}>Resume Selected Sharing</div>
	          <div className="btn" onClick={addWorkstations}>Add Selected Workstations</div>
	          <div className="btn" onClick={removeWorkstations}>Remove Selected Workstation</div>
	          <div className="btn red" onClick={endSession}>End session</div>
      		</div>
		);
	}
}
