/* 
 * Description: React entrypoint
 * 				
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */

import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import { loadState, saveState } from './localStorage';

/* Retreives persisted state for entry into the redux storage configuration */ 
const persistedState = loadState();
const store = configureStore(persistedState);

/* Persist state session and user details changes accross page loads */
store.subscribe(() => {
	const session = store.getState().session;

	saveState( {
		user: store.getState().user, 
		session
	});	
})


const history = syncHistoryWithStore(browserHistory, store);

render(
	<Root store={store} history={history} />,
	document.getElementById('root')
);
