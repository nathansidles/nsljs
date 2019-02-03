import NSL from './old-nsl.js';

/**
 * Class for storing information about a URL.
 */
export default class NSLURL {

	/**
	 * Function for constructing an instance of the class.
	 */
	constructor( baseURL ) {
		var env = this;

		if( typeof baseURL !== 'string' ) {
			baseURL = NSL.getURL();
		}
		env.copyURL( baseURL );
		env.getBasePathName( baseURL );
		env.getDiffPathName( baseURL );
	}

	copyURL() {
		var env = this;

		if( typeof baseURL !== 'undefined' ) {
			var tempBase = NSL.getURL( NSL.getScriptLocation( baseURL ) );
		} else {

		}
		var tempLocation = NSL.getURL();
		for( var i in tempLocation ) {
			env[i] = tempLocation[i];
		}
	}

	getBasePathName( baseURL ) {
		var env = this;

		if( typeof baseURL !== 'undefined' ) {
			var tempBase = NSL.getURL( NSL.getScriptLocation( baseURL ) );
			env.basepathname = tempBase.pathname;
			env.basepatharray = tempBase.patharray;
		} else {
			var tempLocation = NSL.getURL();
			env.basepathname = tempLocation.pathname;
			env.basepatharray = tempLocation.patharray;
		}
	}

	getDiffPathName( baseURL ) {
		var env = this;

		var tempLocation = NSL.getURL();
		env.diffpathname = tempLocation.pathname.replace( env.basepathname, '' );
		env.diffpatharray = NSL.filterArray( tempLocation.patharray, env.basepatharray );
	}

	setURL() {
		var env = this;
		var tempLocation = NSL.getURL();
		env.diffpathname = tempLocation.pathname.replace( env.basepathname, '' );
		env.diffpatharray = NSL.filterArray( tempLocation.patharray, env.basepatharray );
	}

	/**
	 * Function for appending a specified key/value pair as a new search parameter.
	 */
	append() {

	}

	/**
	 * Function for deleteing the given search parameter, and its associated value, from the list of all search parameters.
	 */
	delete() {

	}

	/**
	 * Function for returning an iterator allowing to go through all key/value pairs contained in this object.
	 */
	entries() {

	}

	/**
	 * Function for returning the first value associated to the given search parameter.
	 */
	get() {

	}

	/**
	 * Function for returning the first value associated to the given search parameter.
	 */
	getAll() {

	}

	/**
	 * Function for returning a Boolean indicating if such a search parameter exists.
	 */
	has() {

	}

	/**
	 * Function for returning an iterator allowing to go through all keys of the key/value pairs contained in this object.
	 */
	keys() {

	}

	/**
	 * Function for setting the value associated to a given search parameter to the given value. If there were several values, deleting the others.
	 */
	set() {

	}

	/**
	 * Function for sorting all key/value pairs, if any, by their keys.
	 */
	sort() {

	}

	/**
	 * Function for returning a string containing a query string suitable for use in a URL.
	 */
	toString() {

	}


	/**
	 * Function for returning an iterator allowing to go through all values of the key/value pairs contained in this object.
	 */
	values() {

	}

}
