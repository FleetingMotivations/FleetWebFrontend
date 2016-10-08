import React, { Component, PropTypes } from 'react';

export default class SessionHistory extends Component{
  static PropTypes = {
    sessions: PropTypes.array.isRequired,
    createSessionClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    loadingLabel: 'loading...'
  }

  render(){
    var {isFetching, loadingLabel, sessions, renderSession, fetchError } = this.props;

    var sessionMsg = null;

    if (isFetching) {
      sessionMsg = <div><i>{loadingLabel}</i></div>
    } else if(fetchError){
      sessionMsg = <div><i>There was an issue retrieving your sessions</i></div>
    } else if (sessions.length === 0) {
      sessionMsg = <div>You have no previous sessions</div>
    } else {
      sessionMsg = sessions.map(renderSession)
    }

    return(
      <div>
        <h3>Previous Sessions</h3>
        {sessionMsg}
      </div>
    );
  }
}
