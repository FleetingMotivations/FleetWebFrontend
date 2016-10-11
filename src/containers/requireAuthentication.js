/* 
 * Description: requireAuthentication function to check the authentication currently
 *              set in the user state before routing to a view 
 *              Redirects to /login path if the user session is not authenticated correctly              
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* takes Component as a paramter to render on successful authorisation */
export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        /* checks auth before the component is rendered to prevent 
           the application from displaying pages they aren't authorised to view
        */
        componentWillMount () {
            this.checkAuth(this.props.loggedIn);
        }

        /* checks on state change incase the user is now authorised or deauthorised */
        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.loggedIn);
        }

        checkAuth (loggedIn) {
            if (!loggedIn) {
                /* switch to login page instead of doing anything else */
                browserHistory.push('/login'); 
            }
        }

        render () {
            /** if the user is logged the Component parameter passed in is rendered and passed all the 
                props of the Router calling this function, allowing the component to render normally
            **/
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