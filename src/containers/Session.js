import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import {  } from '../actions';

import FileShare from '../components/FileShare';
import SessionControl from '../components/SessionControl';
import WorkstationsDisplay from '../components/WorkstationsDisplay';
import SideBar from '../components/SideBar';


class Session extends Component{
	static propTypes = {

	}

	render() {

		var { workstations } = this.props;
		
		return (
			<div>
		        <SideBar />
				<div className="current-session">
			        <div className="session-duration">Time Remaining: </div>

			        <WorkstationsDisplay workstations={workstations}/>

			        <FileShare />
			        <SessionControl />

		      	</div>
	      	</div>
		);
	}
}


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)	



