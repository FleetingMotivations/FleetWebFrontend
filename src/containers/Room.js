import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

class Room extends Component{
	static propTypes = {

	}

	render() {
		return <div>Room</div>
	}
}


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Room)	