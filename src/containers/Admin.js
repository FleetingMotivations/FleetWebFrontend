import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import WorkstationsDisplay from '../components/WorkstationsDisplay';
// import AdminSideBar from '../components/AdminSideBar';

import * as config from '../../config.json';

class Admin extends Component{
	componentDidMount(){
	}

	componentWillUnmount(){
	}

	render() {

		return (
			<div>
				<h2>Admin</h2>
			</div>
		)

	}
}


const mapStateToProps = state => ({
	
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(FleetActions, dispatch)
})


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin)	



