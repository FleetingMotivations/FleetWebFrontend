import React, { Component } from 'react';
import Select from 'react-select';
import './Select.css';

import logo from './images/UoNHorse.png';
import workstationImg from './images/workstation.png'
import './App.css';

let applications = [
  {name: 'App 1', status: 'running'},
  {name: 'App 2', status: 'closing'},
  {name: 'App 3', status: 'closed'}
]

let workstations = [
  {name: 'Name1', id: '123', status: 'active',   top: '20%', left: '20%', inWorkgroup: true, selected: false},
  {name: 'Name2', id: '124', status: 'inactive', top: '20%', left: '30%', inWorkgroup: true, selected: false},
  {name: 'Name3', id: '125', status: 'offline',  top: '30%', left: '40%', inWorkgroup: true, selected: false },
  {name: 'Name4', id: '125', status: 'offline',  top: '30%', left: '60%', inWorkgroup: false, selected: false },
  {name: 'Name5', id: '125', status: 'active',   top: '20%', left: '70%', inWorkgroup: false, selected: false },
  {name: 'Name6', id: '125', status: 'inactive', top: '20%', left: '80%', inWorkgroup: false, selected: false },
]

let workgroup = {
  workstations : [
  {name: 'Name1', id: '123', status: 'active', top: '50%', left: '50%'},
  {name: 'Name2', id: '124', status: 'inactive', top: '20%', left: '15%'},
  {name: 'Name3', id: '125', status: 'offline' , top: '30%', left: '30%' }
  ]
}

let newWorkgroup = [];

let buildings = [{name:'ICT'},{name:'EE'},{name:'EA'}]
let rooms = [{name: 'RM123'}, {name: 'RM124'}, {name: 'RM125'}, {name: 'RM126'}]



class AppLocation extends Component{
  render(){
    return(
      <div className="app-location">
          <span className="location">Rooms</span>
          
      </div>
    );
  }
}

class Nav extends Component{
  render(){
    return(
      <div id="nav">
        <div className="sidebar-top">
          <div className="logo"><img role="presentation" src={logo} /></div>
        </div>

        <div className="dashboard-top">
          <AppLocation/>
          <div className="room-name">{this.props.roomName}</div>
          <div className="logout">Sign out</div>
        </div>

      </div>
    );
  }
}

class WorkstationStatus extends Component{
  render(){
    return(
      <div className="status" data-status={this.props.status}> <div className="tooltip"></div></div>
    );
  }
}

class SessionDetails extends Component{
  render(){
    return(
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

class Sidebar extends Component{
  render(){

    var sidebar;
    switch(this.props.currentSidebar)
    {
      case 'SESSION':
        sidebar = <SessionDetails/>
        break;
      default:
        sidebar = <div>Welcome {this.props.username}</div>
        break;
    }

    return(
      <div id="sidebar">
        {sidebar}
      </div>
    );
  }
}

class RoomSelect extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      roomSelected: null
    };
  }

  render(){
    return(
      <div className="room-select">
          <h2>Please select your room</h2>

          <div className="room-list">
            <Select
                name="room-select"
                value={this.state.roomSelected}
                options={rooms.map(room => {return {value: room.name, label: room.name}})}
                onChange={this.roomSelected.bind(this)}
            />            
            <div id="continue-btn" className="btn small grey right" onClick={this.next.bind(this)}>Continue</div>
          </div>
      </div>
    );
  }

  next(){
    if(this.state.roomSelected != null)
    {
      console.log("lets go to the next state");
    }
  }

  roomSelected(val) {
    var btn = document.getElementById("continue-btn");

    this.setState({
      roomSelected: val.value
    });

    if(val.value === null)
    {
      btn.className = "btn small grey right";
    }
    else
    {
      btn.className = "btn small green right";
    }

  }


}

class BuildingSelect extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      selectedBuilding: null
    };
  }

  render(){
    return(
      <div className="building-select">
        <div className="building-list">
          <h2>Please select your building</h2>
          <Select
              name="building-select"
              value={this.state.selectedBuilding}
              placeholder="Building Name..."
              options={buildings.map(building => {return {value: building.name, label: building.name}})}
              onChange={this.buildingSelected.bind(this)}
          />

          <div id="continue-btn" className="btn small grey right" onClick={this.next.bind(this)}>Continue</div>
        </div>
      </div>
    );
  }

  next(e){
    if(this.state.selectedBuilding !== null)
    {
      console.log("lets go to the next state");
    }
  }

  buildingSelected(val) {
    var btn = document.getElementById('continue-btn');

    this.setState({
      selectedBuilding: val.value
    });

    if(val.value == null)
    {
      btn.className = "btn small grey right";
    }
    else
    {
      btn.className = "btn small green right";
    }

  }
}

class StartSession extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      timeSelected: null
    };
  }

  render(){
    return(
      <div className="start-session">
        <h2>Start a collaboration session</h2>
        <div className="instruction">Select workstations to join your workgroup</div>
        
        <WorkstationsDisplay workstationClicked={this.workstationSelect.bind(this)}/>


        <div className="duration">
          <div className="start">Starting from now until: </div>
          <div className="end">
            <Select
              id="time"
              name="session-end-select"
              value={this.state.timeSelected}
              options={[{value: '5:00 AM', label: '5:00 AM'},{value: '5:00 AM', label: '5:00 AM'}]}
              onChange={this.timeSelected.bind(this)}

            />
          </div>
        </div>

        <div className="buttons">
          <div onClick={this.deselectAll.bind(this)}className="deselect-all btn grey">Select None</div>
          <div onClick={this.selectAll.bind(this)}className="select-all btn">Select All</div>
          <div onClick={this.next.bind(this)} className="start-button btn grey" id="start-session-btn">Start Session</div>
        </div>


      </div>

    );
  }

  workstationSelect(workstation){
    console.log(workstation);
  
    if(!workstation.inWorkgroup)
    {
      workstation.selected !== workstation.selected;
      var index = newWorkgroup.indexOf(workstation)
      if(index === -1)
      {
        newWorkgroup.push(workstation);
      }
      else
      {
        newWorkgroup.splice(index,1);
      }

      if(newWorkgroup.length === 0)
      {
        btn.className = "start-button btn grey";
      }
    }
  }

  timeSelected(val){
    var btn = document.getElementById("start-session-btn");
    if(val === null)
    {
      this.setState({
          timeSelected: null
      });
    }
    else
    {
      this.setState({
          timeSelected: val.value
      });
    }
    
    if(val === null || val.value === null || newWorkgroup.length === 0)
    {
      btn.className = "start-button btn grey";
    }
    else
    {
      btn.className = "start-button btn green";
    }
  }

  next(e){
    console.log("lets go to the next state");
  }
}

class WorkstationsDisplay extends Component{
  
  workstationClicked(workstation){
    this.props.workstationClicked(workstation);
  }

  render(){
    return(
        <div className="workstations">
          {workstations.map(workstation =>{
            var classessss = "workstation ";
            if(workstation.inWorkgroup)
            {
              classessss += "not-available"; 
            }

            if(workstation.selected)
            {
              classessss += "selected";
            }

           return (
              <div className={classessss} onClick={this.workstationClicked.bind(this, workstation)}  data-workstation-id={workstation.id} style={{top: workstation.top, left:workstation.left}}>
                <img src={workstationImg} role="presentation"/>
                <div className="name"><span data-status={workstation.status} className="status"></span>{workstation.name}</div>
              </div>
           ); 
          })}
        </div>
    );
  }
}

class FileShare extends Component{
  render(){
    return(
        <div className="sharing">
          <h3>Share files to workstations</h3>
          <div className="drop">
            <form method="post" className="drop-box can-drop">
              <div className="input">
                <svg className="drop-icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>

                <input type="file" name="files[]" id="file" className="file" data-multiple-caption="files selected" multiple=""/>
              </div>
              <label htmlfor="file" className="instruction"><span className="choose">Choose a file</span><span className="dragdrop"> or drag it here</span>.</label>
            </form>
          </div>
        </div>  
    );
  }
}

class SessionControl extends Component{
  render(){
    return(
      <div className="control">
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

class CurrentSession extends Component{
  render(){
    return(
      <div className="current-session">
        <div className="session-duration">Time Remaining: 1h 30m</div>

        <WorkstationsDisplay/>

        <FileShare />
        <SessionControl />

      </div>
        
    );
  }
}

class Dashboard extends Component{
  render(){

    var dash;

    switch(this.props.currentDash)
    {
      case 'BUILDING_SELECT':
        dash = <BuildingSelect/>;
        break;
      case 'ROOM_SELECT':
        dash = <RoomSelect/>;
        break;
      case 'START_SESSION':
        dash = <StartSession/>;
        break;
      case 'DISPLAY_SESSION':
        dash = <CurrentSession/>;
        break;
      default:
        dash = <div>Error displaying dashboard</div>;
    }

    return(
      <div id="dashboard">
        {dash}
      </div>
    );
  }
}

class Footer extends Component{
  render(){
    return(
      <div id="footer">
      </div>
    );
  }
}

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      sidebar: '', 
      username: 'Alistair Woodcock',
      dash: 'START_SESSION',
      room: ''
    }

  }

  render() {
    
    return (
      <div className="App">
        <Nav roomName={this.state.room} />
        <Sidebar currentSidebar={this.state.sidebar} username={this.state.username}/>
        <Dashboard  currentDash={this.state.dash} />
        <Footer />
      </div>
      );
  }

}

export default App;
