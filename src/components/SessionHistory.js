import React, { Component, PropTypes } from 'react';

export default class SessionHistory extends Component{
  static PropTypes = {
    sessions: PropTypes.array.isRequired,
    createSessionClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    isFetching: true,
    loadingLabel: 'loading...'
  }

  render(){
    var {isFetching, loadingLabel, sessions, renderSession } = this.props;

    if (isFetching) {
      return <h2><i>{loadingLabel}</i></h2>
    }

    if(sessions.length === 0) {
      return <h2>You have no previous sessions</h2>
    }

    return(
      <div>
      {sessions.map(renderSession)}
      </div>
    );
  }
}
