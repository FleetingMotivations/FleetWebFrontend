import React, { Component } from 'react';
import Select from 'react-select';
import logo from './images/UoNHorse.png';
import workstationImg from './images/workstation.png'
import './App.css';

let applications = [
  {name: 'App 1', status: 'running'},
  {name: 'App 2', status: 'closing'},
  {name: 'App 3', status: 'closed'}
]

let workstations = [
  {name: 'Name1', id: '123', status: 'active', top: '50%', left: '50%'},
  {name: 'Name2', id: '124', status: 'inactive', top: '20%', left: '15%'},
  {name: 'Name3', id: '125', status: 'offline' , top: '30%', left: '30%' },
  {name: 'Name4', id: '126', status: 'active' }
]

let workgroup = {
  workstations : [
  {name: 'Name1', id: '123', status: 'active', top: '50%', left: '50%'},
  {name: 'Name2', id: '124', status: 'inactive', top: '20%', left: '15%'},
  {name: 'Name3', id: '125', status: 'offline' , top: '30%', left: '30%' }
  ]
}

let buildings = [{name:'ICT'},{name:'EE'},{name:'EA'}]
let rooms = [{name: 'RM123'}, {name: 'RM124'}, {name: 'RM125'}, {name: 'RM126'}]



class AppLocation extends Component{
  render(){
    return(
      <div className="app-location">
          <span className="location">Rooms</span>
          <span className="location-divider"></span>
          <span className="location">RM123</span>
          <span className="location-divider"></span>
          <span className="location">Dashboard</span>
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
              return <li data-workstation-id={workstation.id}><span className="name">{workstation.name}</span><WorkstationStatus status={workstation.status}/> <div className="remove"></div></li>
            })}
          </ul>
        </div>
        <div className="workstation-list">
          <h3>Workstations</h3>
          <ul>
            {workstations.map(workstation => {
              return <li data-workstation-id={workstation.id}><span className="name">{workstation.name}</span> <WorkstationStatus status={workstation.status} /> <div className="add"></div></li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

class Sidebar extends Component{
  render(){
    return(
      <div id="sidebar">
        <SessionDetails />
      </div>
    );
  }
}



class RoomSelect extends Component{
  render(){
    return(
      <div className="room-select">
          <h2>Please select your building</h2>

          <div className="building-list">
            <Select
                name="building-select"
                value="one"
                options={buildings}
                onChange={this.logChange}
            />

            // <label>Search: <input type="text" placeholder="Building Name" /></label>
            // <ul>
            //   {buildings.map(building => {
            //     return <li>{building.name}</li>
            //   })}
            // </ul>
          </div>

          <div className="room-list">
            <label>Search: <input type="text" placeholder="Room Number" /></label>
            <ul>
              {rooms.map(room => {
                return <li>{room.name}</li>
              })}
            </ul>            
          </div>
      </div>
    );
  }

  logChange(val) {
    console.log("Selected: " + val);
  }


}

class StartSession extends Component {
  render(){
    return(
      <div className="start-session">
        <h2>Start a collaboration session</h2>
        
        <WorkstationsDisplay/>


        <div className="duration">
          <div className="start">Starting from now until: </div>
          <div className="end">
            <select name="time" id="time">

              <option value="5:00 AM">5:00 AM</option>
              <option value="5:15 AM">5:15 AM</option>
              <option value="5:30 AM">5:30 AM</option>
              <option value="5:45 AM">5:45 AM</option>

              <option value="6:00 AM">6:00 AM</option>
              <option value="6:15 AM">6:15 AM</option>
              <option value="6:30 AM">6:30 AM</option>
              <option value="6:45 AM">6:45 AM</option>

              <option value="7:00 AM">7:00 AM</option>
              <option value="7:15 AM">7:15 AM</option>
              <option value="7:30 AM">7:30 AM</option>
              <option value="7:45 AM">7:45 AM</option>

              <option value="8:00 AM">8:00 AM</option>
              <option value="8:15 AM">8:15 AM</option>
              <option value="8:30 AM">8:30 AM</option>
            </select>
          </div>
        </div>

        <div className="buttons">
          <div className="deselect-all btn grey">Select None</div>
          <div className="select-all btn">Select All</div>
          <div className="start-button btn green">Start Session</div>
        </div>


      </div>

    );
  }
}

class WorkstationsDisplay extends Component{
  render(){
    return(
        <div className="workstations">
          {workstations.map(workstation =>{
           return (
              <div className="workstation" data-workstation-id={workstation.id} style={{top: workstation.top, left:workstation.left}}>
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
  render() {
    return (
      <div className="App">
        <Nav roomName="RM123" />
        <Sidebar />
        <Dashboard currentDash="ROOM_SELECT" />
        <Footer />
      </div>
      );
  }
}

export default App;
