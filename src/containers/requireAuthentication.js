import React from 'react';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';


export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.loggedIn);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.loggedIn);
        }

        checkAuth (loggedIn) {
            if (!loggedIn) {
                browserHistory.push('/login');
                // this.props.dispatch(push(null, '/login'));
            }
        }

        render () {
            return (
                <div>
                    {this.props.loggedIn === true ? <Component {...this.props}/> : null }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: state.user.token,
        userName: state.user.username,
        loggedIn: state.user.loggedIn
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}