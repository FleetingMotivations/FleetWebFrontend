import React, { Component } from 'react';
export default class WorkstationStatus extends Component{
  render(){
    return(
      <div className="status" data-status={this.props.status}> <div className="tooltip"></div></div>    );
  }
}
