/* 
 * Description: Provides functions for Persisting redux state accross page loads
 * 				Serialization and Deserialization of state into and out of browser local storage
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */
export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if(serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch(err) {
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
	}
}