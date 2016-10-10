import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import WorkstationsDisplay from '../components/WorkstationsDisplay';
import AdminSidebar from '../components/AdminSidebar';

import * as config from '../../config.json';

class Admin extends Component{
	componentDidMount(){
	}

	componentWillUnmount(){
	}

	render() {

		const { campuses, buildings, rooms} = this.props;

		return (
			<div>
				<AdminSidebar campuses={campuses} buildings={buildings} rooms={rooms} />
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



