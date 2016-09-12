import React, { Component } from 'react';
import logo from './images/UoNHorse.png';
import workstationImg from './images/workstation.png'
import './App.css';

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

class SessionDetails extends Component{
  render(){
    return(
      
    );
  }
}

class Sidebar extends Component{
  render(){
    return(
      <div id="sidebar">
      <div className="user-details"></div>

      <div className="session-details">
        <div className="application-list">
          <h3>Applications</h3>
          <ul>
            <li><span className="name">Application 1</span><span className="app-status" data-app-status="running">Running</span></li>
            <li><span className="name">Application 2</span><span className="app-status" data-app-status="closing">closing</span></li>
            <li><span className="name">Application 3</span></li>
            <li><span className="name">Application 4</span></li>
          </ul>
        </div>
        <div className="workgroup-list">
          <h3>Workgroup</h3>
          <ul>
            <li data-workstation-id="32310i32"><span className="name">workstation 1</span> <div className="status" data-status="active"> <div className="tooltip"></div></div><div className="remove"></div></li>
            <li data-workstation-id="45344323"><span className="name">workstation 2</span> <div className="status" data-status="inactive"></div><div className="remove"></div></li>
            <li data-workstation-id="23555653"><span className="name">workstation 3</span> <div className="status" data-status="offline"></div><div className="remove"></div></li>
            <li data-workstation-id="89785654"><span className="name">workstation 4</span> <div className="status" data-status="active"></div><div className="remove"></div></li>
          </ul>
        </div>
        <div className="workstation-list">
          <h3>Workstations</h3>
          <ul>
            <li data-workstation-id="32310i32"><span className="name">workstation 1</span> <div className="status" data-status="active"> <div className="tooltip"></div></div><div className="add"></div></li>
            <li data-workstation-id="45344323"><span className="name">workstation 2</span> <div className="status" data-status="inactive"></div><div className="add"></div></li>
            <li data-workstation-id="23555653"><span className="name">workstation 3</span> <div className="status" data-status="offline"></div><div className="add"></div></li>
            <li data-workstation-id="89785654"><span className="name">workstation 4</span> <div className="status" data-status="active"></div><div className="add"></div></li>
          </ul>
        </div>
      </div>
    </div>
    );
  }
}

class Dashboard extends Component{
  render(){
    return(
      <div id="dashboard">
  
      <div className="room-select">
          <h2>Please select your building</h2>

          <div className="building-list">
            <label>Search: <input type="text" placeholder="Building Name" /></label>
            <ul>
              <li>ICT</li>
              <li>Blah</li>
              <li>Bloop</li>
            </ul>
          </div>

          <div className="room-list">
            <label>Search: <input type="text" placeholder="Room Number" /></label>
            <ul>
              <li>RM123</li>
              <li>RM124</li>
              <li>RM125</li>
              <li>RM126</li>
              <li>RM126</li>
              <li>RM128</li>
            </ul>            
          </div>


      </div>
  
      <div className="start-session">
        <h2>Start a collaboration session</h2>
  
        <div className="workstations">
          <div className="workstation">
              <img src={workstationImg}/>
              <div className="name"><span data-status="active" className="status"></span>Workstation 1</div>
          </div>
          <div className="workstation">
              <img src={workstationImg}/>
              <div className="name"><span data-status="inactive" className="status"></span>Workstation 2</div>
          </div>
          <div className="workstation">
              <img src={workstationImg}/>
              <div className="name"><span data-status="offline" className="status"></span>Workstation 3</div>
          </div>
          <div className="workstation">
              <img src={workstationImg}/>
              <div className="name"><span data-status="active" className="status"></span>Workstation 4</div>
          </div>
        </div>

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

      <div className="current-session">
        <div className="session-duration">Time Remaining: 1h 30m</div>

        <div className="workstations">
          <div className="workstation">
              <img src={workstationImg}/>
              <div className="name"><span data-status="active" className="status"></span>Workstation 1</div>
          </div>
          <div className="workstation">
              <img src={workstationImg}/>
              <div className="name"><span data-status="inactive" className="status"></span>Workstation 2</div>
          </div>
          <div className="workstation">
              <img src={workstationImg}/>
              <div className="name"><span data-status="offline" className="status"></span>Workstation 3</div>
          </div>
          <div className="workstation">
              <img src={workstationImg}/>
              <div className="name"><span data-status="active" className="status"></span>Workstation 4</div>
          </div>
        </div>
      
        <div className="sharing">
          <h3>Share files to workstations</h3>
          <div className="drop">
            <form method="post" className="drop-box can-drop">
              <div className="input">
                <svg className="drop-icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>

                <input type="file" name="files[]" id="file" className="file" data-multiple-caption="files selected" multiple=""/>
              </div>
              <label for="file" className="instruction"><span className="choose">Choose a file</span><span className="dragdrop"> or drag it here</span>.</label>
            </form>
          </div>
        </div>  

        <div className="control">
          <h3>Control</h3>
          
          <div className="btn">Pause All Sharing</div>
          <div className="btn">Launch Application</div>
          <div className="btn">Add Workstation</div>
          <div className="btn">Remove Workstation</div>
          <div className="btn red">End session</div>

        </div>

      </div>


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
        <Dashboard />
      </div>
      );
  }
}

export default App;
