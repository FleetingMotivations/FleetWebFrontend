import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUsername, setPassword, login } from '../actions';

import logo from '../images/UoNLogo.png';

class Login extends Component{
	static propTypes = {

	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.loggedIn) {
			browserHistory.push('/');
		}
	}

	handleKeyPress(e){
		if (e.key === 'Enter') {
      		this.login();
    	}
	}

	setUsername(e){
		this.props.setUsername(e.target.value);
	}

	setPassword(e){
		this.props.setPassword(e.target.value);
	}

	login(){
		this.props.login();
	}

	render() {
		const { loginError, password, username} = this.props;

		var errorMessage = null;

		if(loginError) {
			errorMessage = <div style={{color: 'red'}}>Your username or password was incorrect</div>
		}

		return (<div>
		<div id="login">
			<img src={logo} />
			<div className="secure">UoN Secure Login</div>
			<div className="fields">
				<input type="text" name="" value={username} placeholder="Username" onChange={this.setUsername.bind(this)}/>
				<input type="password" name="" value={password} placeholder="Password" onChange={this.setPassword.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
			</div>
			{errorMessage}
			<div className="login btn" onClick={this.login.bind(this)}>Login</div>
			<div className="help">
				<div className="password-reset"><a href="https://www.newcastle.edu.au/current-students/campus-environment/information-technology/reset-forgotten-password">Reset Password</a></div>
				<div className="login0trouble">
			<a href="https://www.newcastle.edu.au/current-students/campus-environment/information-technology/having-trouble-logging-in">Having Trouble Logging in?</a>
			</div>
			<p>Need Help? Call (02) 492 17000</p>
			</div>

			</div>

		</div>
		);
	}
}


const mapStateToProps = state => ({
	password : state.user.password,
	username : state.user.username,
	loginError : state.user.loginError,
	loggedIn: state.user.loggedIn
})

const mapDispatchToProps = dispatch => ({
	login: (username, password) => { dispatch(login())},
	setUsername: (username) => {dispatch(setUsername(username))},
	setPassword: (password) => {dispatch(setPassword(password))},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)	