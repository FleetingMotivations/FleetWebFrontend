import React, { Component, PropTypes } from 'react';

export default class WorkstationsDisplay extends Component{
	
	render(){
		
		return(      <div className="control">
          <h3>Control</h3>
          <div className="btn">Pause All Sharing</div>
          <div className="btn">Launch Application</div>
          <div className="btn">Add Workstation</div>
          <div className="btn">Remove Workstation</div>
          <div className="btn red">End session</div>
      </div>
		);
	}
}
