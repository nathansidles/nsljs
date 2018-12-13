"use strict";

import NSLBigTable from './nslview.js';
import NSLRequest from './nslrequest.js';
import NSLDOM from './nsldom.js';
import NSLURL from './nslurl.js';

export default class NSL {

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
	 * Function for interacting with requests and their associated data, including AJAX calls.
	 *
	 * @param {Object} request - request object.
	 * @param {Object} callbackFunction - Function to execute upon succes.
	 */
  static makeRequest( request, callbackFunction ) {
    var env = this;
		env.ajax( request.type, request.base, request.path, request.parameters, callbackFunction );
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
	 * Function for creating an HTML element.
	 *
	 * @param {Object} appendee - HTML element on which to attach new element.
	 * @param {String} tagName - Type of HTML element to create.
	 * @param {Array} classes - Classes to attach to new element (optional).
	 * @param {Object} attributes - Attributes to attach to new element (optional).
	 * @param {String} content - Text to attach to new element (optional).
	 *
	 * @return {Object} - Created HTML element.
	 */
  static createElement( appendee, tagName, classes, attributes, content, prependee ) {

    var element = document.createElement( tagName );
		var prependText = '';
		var prependElement;


    if( Array.isArray( classes ) ) {
      var i;
      for( i in classes ) {
        element.classList.add( classes[i] );
      }
    } else if( typeof classes === 'object' && classes !== null ) {
			if( classes.constructor.name.lastIndexOf( 'HTML', 0 ) === 0 && classes.constructor.name.indexOf( 'Element', classes.constructor.name.length - 7 ) !== 0 ) {
				prependText = classes.constructor.name;
				prependElement = classes;
			} else {
	      Object.getOwnPropertyNames( classes ).forEach( function( e ) {
	        element.setAttribute( e, classes[e] )
	      });
			}
    } else if( typeof classes === 'string' ) {
      var text = document.createTextNode( classes );
      element.appendChild( text );
    }

		if( Array.isArray( attributes ) ) {
      var i;
      for( i in attributes ) {
        element.classList.add( attributes[i] );
      }
    } else if( typeof attributes === 'object' && attributes !== null ) {
			if( attributes.constructor.name.lastIndexOf( 'HTML', 0 ) === 0 && attributes.constructor.name.indexOf( 'Element', attributes.constructor.name.length - 7 ) !== 0 ) {
				prependText = attributes.constructor.name;
				prependElement = attributes;
			} else {
	      Object.getOwnPropertyNames( attributes ).forEach( function( e ) {
	        element.setAttribute( e, attributes[e] )
	      });
			}
    } else if( typeof attributes === 'string' ) {
      var text = document.createTextNode( attributes );
      element.appendChild( text );
    }

		if( Array.isArray( content ) ) {
      var i;
      for( i in content ) {
        element.classList.add( content[i] );
      }
    } else if( typeof content === 'string' ) {
      var text = document.createTextNode( content );
      element.appendChild( text );
    } else if( typeof content === 'object' && content !== null ) {
			if( content.constructor.name.lastIndexOf( 'HTML', 0 ) === 0 && content.constructor.name.indexOf( 'Element', content.constructor.name.length - 7 ) !== 0 ) {
				prependText = content.constructor.name;
				prependElement = content;
			} else {
				Object.getOwnPropertyNames( content ).forEach( function( e ) {
	        element.setAttribute( e, content[e] )
	      });
			}
		}

		if( appendee.constructor.name.lastIndexOf( 'HTML', 0 ) === 0 && appendee.constructor.name.indexOf( 'Element', appendee.constructor.name.length - 7 ) !== 0 ) {
			if( prependText.lastIndexOf( 'HTML', 0 ) === 0 && prependText.indexOf( 'Element', prependText.length - 7 ) !== 0 ) {
				appendee.insertBefore( element, prependElement );
			} else if( prependText === 'NSLDOM' ) {
				appendee.insertBefore( element, prependElement['$element'] );
			} else {
				appendee.appendChild( element );
			}
			return element;
		} else if( appendee.constructor.name === 'NSLDOM' ) {
			if( prependText.lastIndexOf( 'HTML', 0 ) === 0 && prependText.indexOf( 'Element', prependText.length - 7 ) !== 0 ) {
				appendee['$element'].insertBefore( element, prependElement )
			} else if( prependText === 'NSLDOM' ) {
				appendee['$element'].insertBefore( element, prependElement['$element'] );
			} else {
				appendee['$element'].appendChild( element );
			}
			return new NSLDOM( element );
		}
  }

	static deleteNode( node ) {
		node.parentNode.removeChild( node );
	}

	/**
	 * Function for clearing out a HTML node.
	 *
	 * @param {Object} node - Node/element to clear out.
	 */
  static clearNode( node ) {
    if( typeof node === 'undefined' ) {
      node = this.root.body;
    } else if( Array.isArray( node ) ) {
			for( var i = 0; i < node.length; i++ ) {
				while ( node[i].hasChildNodes() ) {
		      this.clearNodeRecursive( node[i].firstChild );
		    }
			}
		} else {
	    while ( node.hasChildNodes() ) {
	      this.clearNodeRecursive( node.firstChild );
	    }
		}
  }

	/**
	 * Function for helping clearNode() out, propogating through all descendant nodes.
	 *
	 * @param {Object} node - Node/element to clear out.
	 */
  static clearNodeRecursive( node ) {
    while ( node.hasChildNodes() ) {
      this.clearNodeRecursive( node.firstChild );
    }
    node.parentNode.removeChild( node );
  }

	/**
	 * Function for determing if an element has a given class.
	 *
	 * @param {Object} element - Element to test.
	 * @param {String} test_class - Class to search for.
	 *
	 * @return {Boolean} - Truth value of presence of class associated with element.
	 */
  static hasClass( element, test_class ) {
		var tempElement;
		if( element.constructor.name.lastIndexOf( 'HTML', 0 ) === 0 && element.constructor.name.indexOf( 'Element', element.constructor.name.length - 7 ) !== 0 ) {
			tempElement = element;
		} else if( element.constructor.name === 'NSLDOM' ) {
			tempElement = element['$element'];
		}
		if( Array.isArray( test_class ) ) {
			for( var i = 0; i < test_class.length; i++ ) {
				if( ( ' ' + tempElement.className + ' ' ).indexOf( ' ' + test_class[i] + ' ' ) > -1 ) {
					return true;
				}
				return false;
			}
		} else {
			return ( ' ' + tempElement.className + ' ' ).indexOf( ' ' + test_class + ' ' ) > -1;
		}
  }

	/**
	 * Function for adding a class to an element.
	 *
	 * @param {Object} element - Element to which to add class.
	 * @param {String} test_class - Class to add.
	 *
	 * @return {Object} -
	 */
  static addClass( element, test_class ) {
		var tempElement;
		if( element.constructor.name.lastIndexOf( 'HTML', 0 ) === 0 && element.constructor.name.indexOf( 'Element', element.constructor.name.length - 7 ) !== 0 ) {
			tempElement = element;
		} else if( element.constructor.name === 'NSLDOM' ) {
			tempElement = element['$element'];
		}
		if( Array.isArray( test_class ) ) {
			for( var i = 0; i < test_class.length; i++ ) {
				if( typeof test_class[i] === 'string' ) {
					tempElement.classList.add( test_class[i] );
				}
			}
		} else if( typeof test_class === 'string' ) {
			tempElement.classList.add( test_class );
		}
  }

	/**
	 * Function for adding a class to an element and removing it from all similar elements.
	 *
	 * @param {Array} elements - Element from which to remove the class.
	 * @param {Object} element - Element to which to add the class.
	 * @param {String} test_class - Class to add and remove.
	 * @param {String} value - Element property to search (optional).
	 *
	 * @return {Object} - Element property.
	 */
  static addClassUnique( elements, element, test_class, value ) {
    var env = this;
    for( var j = 0; j < elements.length; j++ ) {
      env.removeClass( elements[j], test_class );
    }
    env.addClass( element, 'button-active' );
    return element[value];
  }

	/**
	 * Function for removing a class from an element.
	 *
	 * @param {Object} element - Element to which to remove the class.
	 * @param {String} test_class - Class to remove.
	 */
  static removeClass( element, test_class ) {
		var tempElement;
		if( element.constructor.name.lastIndexOf( 'HTML', 0 ) === 0 && element.constructor.name.indexOf( 'Element', element.constructor.name.length - 7 ) !== 0 ) {
			tempElement = element;
		} else if( element.constructor.name === 'NSLDOM' ) {
			tempElement = element['$element'];
		}
		if( Array.isArray( test_class ) ) {
			for( var i = 0; i < test_class.length; i++ ) {
				if( typeof test_class[i] === 'string' ) {
					tempElement.classList.remove( test_class[i] );
				}
			}
		} else if( typeof test_class === 'string' ) {
			tempElement.classList.remove( test_class );
		}
  }

	/**
	 * Function for replacing text in an elemnt.
	 *
	 * @param {Object} element - Element to which to add text.
	 * @param {String} text - Text to add to element.
	 */
  static replaceText( element, text ) {
    for( var node in element.childNodes ) {
      if( element.childNodes[node].nodeType == 3 ) {
        element.removeChild( element.childNodes[node] );
        element.appendChild( document.createTextNode( text ) );
      }
    }
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

	/**
	 * Function for toggling an element.
	 *
	 * @param {Object} element - Element to toggle.
	 */
	static toggle( element ) {
		if( element.style.display == 'none' || element.style.display == '' ) {
			element.style.display = 'block'
		} else {
			element.style.display = 'none';
		}
	}

	/**
	 * Function for getting a number with commas and periods. Thanks, https://stackoverflow.com/users/28324/elias-zamaria, for this function!
	 *
	 * @param {Number} x - Number to which to add commas and periods.
	 *
	 * @return {String} - Formatted number.
	 */
	static numberWithCommas(x) {
		var parts = x.toString().split(".");
	  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	  return parts.join(".");
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
		var tempObject = object;
		Object.getOwnPropertyNames( tempObject ).forEach( function( e ) {
			if( !NSL.hasElement( properties, e ) ) {
				delete tempObject[e];
			}
		});
		return tempObject;
	}

}
