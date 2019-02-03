import NSL from './old-nsl.js';

/**
 * Class for storing request and response data.
 */
export default class NSLRequest {

	/**
	 * Function for constructing an instance of the class.
	 *
	 * @param {Object} request - request object for building this instance.
	 */
  constructor( type, base, path, parameters, data ) {
		var env = this;
		if( typeof type !== 'undefined' ) {
			env.type = type;
		} else {
			env.type = '';
		}
		if( typeof base !== 'base' ) {
			env.base = base;
		} else {
			env.base = '';
		}
		if( typeof path !== 'undefined' ) {
			env.path = path;
		} else {
			env.path = '';
		}
		if( typeof parameters !== 'undefined' ) {
			env.parameters = parameters
		} else {
			env.parameters = {};
		}
		if( typeof data !== 'undefined' ) {
			env.data = data;
		} else {
			env.data = {};
		}
	}

	/**
	 * Function for interacting with requests and their associated data, including AJAX calls.
	 *
	 * @param {Object} request - request object.
	 * @param {Object} callbackFunction - Function to execute upon succes.
	 */
  makeRequest( request, callbackFunction ) {
    var env = this;
		NSL.ajax( request.type, request.base, request.path, request.parameters, callbackFunction );
  }

}
