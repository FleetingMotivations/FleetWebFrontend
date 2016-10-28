/* 
 * Description: React component displaying previous sessions and their details receives session data and control functions as props
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */ 


import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import WorkstationsDisplay from './WorkstationsDisplay';

export default class SessionHistory extends Component{
  static PropTypes = {
    sessions: PropTypes.array.isRequired,
    createSessionClick: PropTypes.func.isRequired
  }

  /* Returns details (as jsx) of a single session */
  renderSession(session){

    const { viewSession } = this.props;

    var started = moment(session.started).format('MMMM Do YYYY, h:mm:ss')

    return(
      <div className="prev-session">
      <div className="room">{session.room.name}</div>
      <div className="started">{started}</div>
      <div className="btn green start" onClick={() => {viewSession(session.id)}} >View Session</div>
      </div>
    );
  }

  /** Returns all details (as jsx) of the given session 
      uses startSession and backToAllSessions function props to 
      handle click events
  **/
  renderSelectedSession(session){

        const { startSession, backToAllSessions } = this.props;

        var totalSec = session.duration*60;
        var hours = parseInt( totalSec / 3600, 10 ) % 24;
        var minutes = parseInt( totalSec / 60, 10 ) % 60;
        var seconds = totalSec % 60;

        var duration = (hours < 10 ? "0" + hours : hours) + "h " + (minutes < 10 ? "0" + minutes : minutes) + "m " + (seconds  < 10 ? "0" + seconds : seconds)+"s";


        return (
          <div className="selected-session">
            <div className="btn red exit" onClick={backToAllSessions}>x</div>
            <div className="room-name">{session.room.name}</div>
            <div className="start-session-wrapper">
              <div className="start-label">Create new session with this configuration:</div>
              <div className="btn green launch-session" onClick={() => {startSession(session.id)}}>Create</div>
            </div>
            <div className="duration-wrapper">
              <div className="duration-label">Session Duration: </div>
              <div className="duration">{duration}</div>
            </div>
            <div className="workstation-label">Workstations: </div>

            <div className="workstations">
              <WorkstationsDisplay workstations={session.workstations}/>
            </div>

          </div>
      )
  }

  /** Renders Session History component based on properties supplied **/
  render(){
    var {isFetching, sessions , fetchError, fetchingSessionDetails, selectedSession } = this.props;

    var prevSessions = null;

    if(selectedSession) {
      prevSessions = this.renderSelectedSession.bind(this)(selectedSession)
    } else if (isFetching || fetchingSessionDetails) {
      prevSessions = <div><i><div className="loader">Loading...</div></i></div>
    } else if(fetchError){
      prevSessions = <div><i>There was an issue retrieving your sessions</i></div>
    } else if (sessions.length === 0) {
      prevSessions = <div>You have no previous sessions</div>
    } else {
      prevSessions = sessions.map(this.renderSession.bind(this))
    }

    return(
      <div className="session-history">
        <h3>Previous Sessions</h3>
        <div className="prev-sessions">
        {prevSessions}
        </div>
      </div>
    );
  }
}
