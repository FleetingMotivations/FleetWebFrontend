import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import logo from '../images/UoNHorse.png';

export default class NavBar extends Component{
  static PropTypes = {
    navTitle: PropTypes.string
  }

  render(){
    var { navTitle } = this.props;

    return(
      <div id="nav">
        <div className="sidebar-top">
          <Link to="/">
          <div className="logo"><img role="presentation" src={logo} /></div>
          </Link>
        </div>

        <div className="dashboard-top">
          
          <div className="room-name">{ navTitle }</div>
          <div className="logout">Sign out</div>
        </div>

      </div>
    );
  }
}
