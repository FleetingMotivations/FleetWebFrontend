import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FleetActions from '../actions';

import logo from '../images/UoNLogo.png';

class Login extends Component{
	static propTypes = {

	}

	render() {
		return <div>
		<div id="login">
			<img src={logo} />
			<div className="secure">UoN Secure Login</div>
			<div className="fields">
				<input type="text" name="" value="" placeholder="Username"/>
				<input type="password" name="" value="" placeholder="Password"/>
			</div>
			<div className="login btn">Login</div>
			<div className="help">
				<div className="password-reset"><a href="https://www.newcastle.edu.au/current-students/campus-environment/information-technology/reset-forgotten-password">Reset Password</a></div>
				<div className="login0trouble">
			<a href="https://www.newcastle.edu.au/current-students/campus-environment/information-technology/having-trouble-logging-in">Having Trouble Logging in?</a>
			</div>
			<p>Need Help? Call (02) 492 17000</p>
			</div>

			</div>

		</div>
	}
}


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Login)	