import NSL from './nsl.js';

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
		if( typeof parameter !== 'undefined' ) {
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

}
