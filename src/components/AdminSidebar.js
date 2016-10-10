import React, { Component } from 'react';
import WorkstationStatus from './WorkstationStatus';

export default class AdminSidebar extends Component{

  renderCampusList(){
  	console.log("HIHIHIHI")
  	const { campuses } = this.props;

  	if(!campuses) {
  		return (
  			<div className="campus-list">
		        <h3>Fetching Campuses...</h3>
		    </div>
  		);
  	}
  	return (
  			<div className="campus-list">
		        <h3>Campuses</h3>
				<ul>
        		{campuses.map(campus => {  
          			return <li onMouseOut={this.exitHoverWorkstation} onMouseOver={this.hoverWorkstation} onClick={viewCampus} data-campus-id={campus.id}><span className="name">{campus.name}</span></li>
        		})}
      			</ul> 
	        </div>
    )
  }

  render(){

  	var { 	
  		buildings,
  		rooms
  	} = this.props;

	return(
		<div id="sidebar">
		  <div className="">
	        {this.renderCampusList.bind(this)()}
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