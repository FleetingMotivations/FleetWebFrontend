/* 
 * Description: Production Root application component. 
 * 				Do not add debugging components to this component
 *				
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

const Root = ({store, history}) => (
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
)

Root.propTypes = {
    store: PropTypes.isRequired,
    history: PropTypes.isRequired
}	

export default Root;