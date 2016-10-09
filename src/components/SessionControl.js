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
			selectAll,
			selectNone,
		} = this.props;

		

		return(      
			<div></div>
		);
	}
}
