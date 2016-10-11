/* 
 * Description: Dev implementation of Root component
 *				THis dev implementation allows for additional debugging components
 *				to be set before while developing. 
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';

const Root = ({ store, history }) => (
	<Provider store={store} >
		<div> 
			<Router history={history} routes={routes} />
		</div>
	</Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Root;