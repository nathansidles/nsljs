"use strict";

import NSLBigTable from './old-nslview.js';
import NSLRequest from './old-nslrequest.js';
import NSLDOM from './old-nsldom.js';
import NSLURL from './old-nslurl.js';
import NSLView from './old-nslview.js';
import NSLRoot from './old-nslroot.js';

export default class NSL {

	static get root() {
		return new NSLRoot();
	}

	static get view() {
		return new NSLView();
	}

	static get url() {
		return new NSLURL();
	}

	static get dom() {
		return new NSLDOM();
	}

	static get request() {
		return new NSLRequest();
	}

	/**
	 * Function for making an AJAX call to a public development iteration of a NSL-standard API.
	 *
	 * @param {Object} pairs - Key-value parameters of request.
	 * @param {String} type - Endpoint for the NSL API.
	 * @param {Object} callbackFunction - Function called upon successful AJAX response.
	 */
	static ajax( type, base, path, parameters, callbackFunction ) {
		var env = this;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if ( this.readyState == 4 && this.status == 200 ) {
				if( typeof callbackFunction !== 'undefined' ) {
					var data = JSON.parse( this.responseText );
					callbackFunction( data );
				}
			}
		}
		var request = base + '/' + path + "/?";
		var data = '';
		var count = 0;
		if( Array.isArray( parameters ) ) {
			data = encodeURIComponent( parameters[0].parameter ) + '=' + encodeURIComponent( parameters[0].value );
			for( var i = 1; i < parameters.length; i++ ) {
				data += '&' + encodeURIComponent( parameters[i].parameter ) + '=' + encodeURIComponent( parameters[i].value );
			}
		} else {
			for( var parameter in parameters ) {
				if( parameters.hasOwnProperty( parameter ) ) {
					if( count > 0 ) {
						data += '&';
					}
					data += encodeURIComponent( parameter ) + '=' + encodeURIComponent( parameters[parameter] );
					count++;
				}
			}
		}
		console.log( request + data );
		xmlhttp.open( "GET", request + data, true );
		xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlhttp.send( data );
	}

	/**
	 * Function for transforming one- and two-dimensional arrays into objects, with a row's value at the offset serving as key.
	 *
	 * @param {Array} - Array to transform.
	 * @param {Number} - Offset of key values.
	 *
	 * @return {Object} - Array-sourced object.
	 */
  static arrayToObject( array, offset ) {
    var temp = {};
    for( var i = 0; i < array.length; i++ ) {
			if( typeof array[i] === 'object' ) {
	      temp[array[i][offset]] = array[i];
			} else if( typeof array[i] === 'string' || typeof array[i] === 'number' ) {
				temp[array[i]] = array[i];
			}
    }
    return temp;
  }

	/**
	 * Function for transforming objects into arrays, with all own properties being turned into array values.
	 *
	 * @param {Object} - Object to transform.
	 *
	 * @return {Array} - Object-sourced array.
	 */
	static objectToArray( object ) {
		var temp = [];
		Object.getOwnPropertyNames( object ).forEach( function( e ) {
			temp.push( object[e] );
		});
		return temp;
	}

	/**
	 * Function for getting the offset of a column name in an API response.
	 *
	 * @param {Array} metadata - Field names (haystack).
	 * @param {String} columnName - Target name (needle).
	 *
	 * @return {Number} - Column offset.
	 */
  static getColumnIndex( metadata, columnName ) {
    for( var i = 0; i < metadata.length; i++ ) {
      if( metadata[i] == columnName ) {
        return i;
      }
    }
    return false;
  }

	static getRelatedIds( id, idOffset, relativeOffset, object ) {
		var env = this;
		var tempArray = [ String( id ) ];
		tempArray = tempArray.concat( env.getRelatedIdsRecursive( id, idOffset, relativeOffset, env.deepCopy( object ) ) );
		var tempObject = env.arrayToObject( tempArray, 0 );
		tempArray = env.objectToArray( tempObject );
		return tempArray;
	}

	static getRelatedIdsRecursive( id, idOffset, relativeOffset, object ) {
		var env = this;
		var tempArray = [];
		if( Array.isArray( object ) ) {
			for( var i = 0; i < object.length; i++ ) {
				if( object[i][idOffset] == id && id != 0 && object[i][relativeOffset] != 0 ) {
					var tempId = object[i][relativeOffset];
					tempArray = tempArray.concat( object[i][relativeOffset] );
					tempArray = tempArray.concat( env.getRelatedIds( tempId, idOffset, relativeOffset, object ) );
				}
			}
		} else {
			Object.getOwnPropertyNames( object ).forEach( function( e ) {
				if( object[e][idOffset] == id && id != 0 && object[e][relativeOffset] != 0 ) {
					var tempId = object[e][relativeOffset];
					tempArray = tempArray.concat( object[e][relativeOffset] );
					tempArray = tempArray.concat( env.getRelatedIds( tempId, idOffset, relativeOffset, object ) );
				}
			});
		}
		return tempArray;
	}

	/**
	 * Function for finding if an array contains an element elements.
	 *
	 * @param {Array} target  - Array to search on.
	 * @param {String} source - String or array to search by.
	 *
	 * @return {Boolean} - Whether or not the array has this value.
	 */
	static hasElement( target, source ) {
		if( Array.isArray( target ) ) {
			if( Array.isArray( source ) ) {
				var length = source.length;
				for( var i = 0; i < length; i++ ) {
					if( target.indexOf( source[i] ) > -1 ) {
						return true;
					}
				}
				return false;
			} else {
				return target.indexOf( source ) > -1 ? true : false;
			}
		} else {
			return false;
		}
 	}

	/**
	 * Function for getting all elements on a page with a given ID prefix.
	 *
	 * @param {String} idPrefix - String to search by.
	 * @param {Object} elements - element or set of elements to search within (optional).
	 *
	 * @return {Array} - Elements matching search criteria.
	 */
	static getElementsByIdPrefix( idPrefix, elements ) {
		if( typeof elements === 'undefined' ) {
			elements = document.querySelectorAll( '*' );
		}
		var tempElements = [];
		for( var i = 0; i < elements.length; i++ ) {
		    if( inputs[i].name.indexOf( idPrefix ) === 0 ) {
		        tempElements.push(inputs[i]);
		    }
		}
		return tempElements;
	}

	/**
	 * Function for getting all elements on a page with a given attribute
	 *
	 * @param {String} attributeName - String to search by.
	 * @param {Object} elements      - element or set of elements to search within (optional).
	 *
	 * @return {Array} - Elements matching search criteria.
	 */
	static getElementsByAttributeName( attributeName, elements ) {
		if( typeof elements === 'undefined' ) {
			return document.querySelectorAll( '[' + attributeName + ']' );
		} else {
			return elements.querySelectorAll( '[' + attributeName + ']' );
		}
	}

	/**
	 * Function for deduplicating a simple array.
	 *
	 * @param {Array} array     - Array to deduplicate.
	 * @param {String} idOffset - String identifier of array offset.
	 *
	 * @return {Array} - deduplicated array.
	 */
	static deduplicate( array, idOffset ) {
		var env = this;
		return env.objectToArray( env.arrayToObject( array, idOffset ) );
 	}

	/**
 	 * Function for making a deep copy of an object.
 	 *
 	 * @param {Object} object - Array or object which to copy deeply.
 	 *
 	 * @return {Object} - copied object.
 	 */
	static deepCopy( object ) {
		return JSON.parse( JSON.stringify( object ) );
	}

	static getScriptLocation( name ) {
		var scripts = document.getElementsByTagName( 'script' );
		for( var i in scripts ) {
			if( scripts[i].src && scripts[i].src.endsWith( name + '.js' ) ) {
				return scripts[i].src.replace( '/' + name + '.js', '' );
			}
		}
		return '';
	}

	static getURL( url ) {
		var env = this;

		if( typeof url === 'undefined' ) {
			url = env.deepCopy( window.location );
		} else {
			var tempElement = document.createElement( 'a' );
			tempElement.href = url;
			var tempLocation = env.deepCopy( window.location );
			var tempURL = {};
			for( var i in tempLocation ) {
				tempURL[i] = tempElement[i];
			}
			url = tempURL;
		}
		url.patharray = url.pathname.split( '/' );

		var parameters = {};
		var pairs = ( url.search[0] === '?' ? url.search.substr( 1 ) : url.search ).split( '&' );
		for ( var i = 0; i < pairs.length; i++ ) {
			var pair = pairs[i].split( '=' );
			var key = decodeURIComponent( pair[0] ).replace( '[]', '' );
			if( typeof parameters[key] === 'undefined' ) {
				parameters[key] = [];
			}
			var values = decodeURIComponent( pair[1] || '' ).split( ',' );
			for( var j = 0; j < values.length; j++ ) {
				if( !NSL.hasElement( parameters[key], values[j] ) ) {
					parameters[key].push( values[j] );
				}
			}
		}
		url.searcharray = parameters;

		return url;
	}

	static setURL( state, title, path, parameters ) {
		var tempState, tempTitle, tempPath, tempParameters, tempUrl;

		if( typeof state === 'object' ) {
			tempState = state;
			tempTitle = title;
			tempUrl = path;
		} else if( typeof state === 'string' ) {
			tempState = {};
			tempTitle = state;
			tempUrl = title;
		}
		if( typeof parameters === 'string' ) {
			tempUrl += parameters;
		} else if( typeof parameters === 'object' ) {
			tempUrl += '?';
			Object.getOwnPropertyNames( parameters ).forEach( function( parameter ) {
				tempUrl += parameter + '=';
				for( var i = 0; i < parameters[paramater].length; i++ ) {
					url += parameter + parameters[parameter][i];
					if( i < parameters[parameter.length - 1] ) {
						url += ',';
					}
				}
			});
		}
		history.pushState( tempState, tempTitle, tempUrl );
		document.title = tempTitle;
	}

	static filterArray( filtered, filter ) {
		return filtered.filter( function( e ) {
		  return filter.indexOf( e ) < 0;
		});
	}

	static capitalize( string, type ) {
		if( typeof type === 'undefined' || type === 'first' ) {
			return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
		} else if( type === 'camel' ) {
			string = string.split( ' ' );
	    for ( var i = 0; i < string.length; i++) {
				string[i] = string[i][0].toUpperCase() + string[i].substr( 1 );
	    }
    	return string.join( ' ' );
		} else if( type === 'all' ) {
    	return string.toUpperCase();
		} else {
			return string;
		}
	}

	static filterProperties( object, properties ) {
		var tempObject = NSL.deepCopy( object );
		Object.getOwnPropertyNames( tempObject ).forEach( function( e ) {
			if( !NSL.hasElement( properties, e ) ) {
				delete tempObject[e];
			}
		});
		return tempObject;
	}

	static selectColumns( array, column ) {
		if( Array.isArray( column ) ) {

		} else {

		}
	}

	static getRelatives( object, id, relative_id ) {

	}

}
