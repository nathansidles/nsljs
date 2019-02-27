'use strict';

import NSLHelperAbstract from './nslhelper-abstract.js';

import NSLHelperAJAX from './ajax/nslhelperajax.js';

/**
 * Class for NSLHelper objects. NSLHelper objects contain useful JavaScript functions. They are not intended to be instantiated.
 *    This class is not intended for instantiation.
 * @extends NSLHelperAbstract
 */
export default class NSLHelper extends NSLHelperAbstract {
  /**
   * Function for accessing "dom" child objects of the NSLModel class. Not intended for use as a constructor.
   *
   * @return {NSLModelDOM} Created NSLModelDOM object.
   */
  static get ajax() {
    return new NSLHelperAJAX();
  }

  /**
   * Function for transforming one- and two-dimensional arrays into objects, with a row's value at the offset serving as key.
   *
   * @param {Array} array - Array to transform.
   * @param {Number} offset - Offset of key values.
   *
   * @return {Object} - Array-sourced object.
   */
  static arrayToObject( array, offset ) {
    const temp = {};
    for ( let i = 0; i < array.length; i++ ) {
      if ( typeof array[i] === 'object' ) {
        temp[array[i][offset]] = array[i];
      } else if ( typeof array[i] === 'string' || typeof array[i] === 'number' ) {
        temp[array[i]] = array[i];
      }
    }
    return temp;
  }

  /**
   * Function for transforming objects into arrays, with all own properties being turned into array values.
   *
   * @param {Object} object - Object to transform.
   *
   * @return {Array} - Object-sourced array.
   */
  static objectToArray( object ) {
    const temp = [];
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
    for ( let i = 0; i < metadata.length; i++ ) {
      if ( metadata[i] == columnName ) {
        return i;
      }
    }
    return false;
  }

  /**
   * Function for getting an array of ID values of elements related to the element with the passed ID in an object or array.
   *
   * @param {String} id - ID value to match related IDs against.
   * @param {number} idOffset - offset value of the ID property in the passed object or array.
   * @param {Number} relativeOffset - offset value of the related ID property in the passed object or array.
   * @param {Object} object - the object or array passed to search for related IDs.
   *
   * @return {Array} - set of related IDs, including the original IDs.
   */
  static getRelatedIds( id, idOffset, relativeOffset, object ) {
    const env = this;
    const tempArray = [String( id )];
    tempArray = tempArray.concat( env.getRelatedIdsRecursive( id, idOffset, relativeOffset, env.deepCopy( object ) ) );
    const tempObject = env.arrayToObject( tempArray, 0 );
    tempArray = env.objectToArray( tempObject );
    return tempArray;
  }

  /**
   * Abstract recursive function for getRelatedIds. Should not be called directly.
   *
   * @param {String} id - ID value to match related IDs against.
   * @param {number} idOffset - offset value of the ID property in the passed object or array.
   * @param {Number} relativeOffset - offset value of the related ID property in the passed object or array.
   * @param {Object} object - the object or array passed to search for related IDs.
   *
   * @return {Array} - set of related IDs, including the original IDs.
   */
  static getRelatedIdsRecursive( id, idOffset, relativeOffset, object ) {
    const env = this;
    const tempArray = [];
    if ( Array.isArray( object ) ) {
      for ( let i = 0; i < object.length; i++ ) {
        if ( object[i][idOffset] == id && id != 0 && object[i][relativeOffset] != 0 ) {
          const tempId = object[i][relativeOffset];
          tempArray = tempArray.concat( object[i][relativeOffset] );
          tempArray = tempArray.concat( env.getRelatedIds( tempId, idOffset, relativeOffset, object ) );
        }
      }
    } else {
      Object.getOwnPropertyNames( object ).forEach( function( e ) {
        if ( object[e][idOffset] == id && id != 0 && object[e][relativeOffset] != 0 ) {
          const tempId = object[e][relativeOffset];
          tempArray = tempArray.concat( object[e][relativeOffset] );
          tempArray = tempArray.concat( env.getRelatedIds( tempId, idOffset, relativeOffset, object ) );
        }
      });
    }
    return tempArray;
  }

  /**
   * Function for finding if an array or object contains a property.
   *
   * @param {Array} target  - Array to search on.
   * @param {String} source - String or array to search by.
   *
   * @return {Boolean} - Whether or not the array has this value.
   */
  static hasProperty( target, source ) {
    if ( Array.isArray( target ) ) {
      if ( Array.isArray( source ) ) {
        const length = source.length;
        for ( let i = 0; i < length; i++ ) {
          if ( target.indexOf( source[i] ) > -1 ) {
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
   * Function for deduplicating a simple array.
   *
   * @param {Array} array     - Array to deduplicate.
   * @param {String} idOffset - String identifier of array offset.
   *
   * @return {Array} - deduplicated array.
   */
  static deduplicate( array, idOffset ) {
    const env = this;
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

  /**
   * Function for getting the URL of a script with a given name.
   *
   * @param {String} name - name of the script (without appending ".js").
   *
   * @return {String} - URL of the script (or an empty string if the script does not exist).
   */
  static getScriptLocation( name ) {
    const scripts = document.getElementsByTagName( 'script' );
    for ( const i in scripts ) {
      if ( scripts[i].src && scripts[i].src.endsWith( name + '.js' ) ) {
        return scripts[i].src.replace( '/' + name + '.js', '' );
      }
    }
    return '';
  }

  /**
   * Function for capitalizing a string.
   *
   * @param {String} string - string to be capitalized.
   * @param {String} type - type of capitalization to perform. Values are 'first', 'camel', and 'all'.
   *
   * @return {Array} - array that contains only properties in the filter array.
   */
  static capitalize( string, type ) {
    if ( typeof type === 'undefined' || type === 'first' ) {
      return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
    } else if ( type === 'camel' ) {
      string = string.split( ' ' );
      for ( let i = 0; i < string.length; i++) {
        string[i] = string[i][0].toUpperCase() + string[i].substr( 1 );
      }
      return string.join( ' ' );
    } else if ( type === 'all' ) {
      return string.toUpperCase();
    } else {
      return string;
    }
  }

  /**
   * Function for filtering an array against the elements of another array.
   *
   * @param {Array} filtered - array to be filtered.
   * @param {Array} filter - array of property names to be included in the filtered array.
   *
   * @return {Array} - array that contains only properties in the filter array.
   */
  static filterArray( filtered, filter ) {
    return filtered.filter( function( e ) {
      return filter.indexOf( e ) < 0;
    });
  }

  /**
   * Function for filtering an object against the elements of an array.
   *
   * @param {Object} object - object to be filtered.
   * @param {Array} properties - array of property names to be included in the filtered object.
   *
   * @return {Object} - object that contains only properties in the filter array.
   */
  static filterObject( object, properties ) {
    const tempObject = NSLAbstract.deepCopy( object );
    Object.getOwnPropertyNames( tempObject ).forEach( function( e ) {
      if ( !NSLAbstract.hasProperty( properties, e ) ) {
        delete tempObject[e];
      }
    });
    return tempObject;
  }

  /**
   * Function for getting a number with commas and periods. Thanks, https://stackoverflow.com/users/28324/elias-zamaria, for this function!
   *
   * @param {Number} x - Number to which to add commas and periods.
   *
   * @return {String} - Formatted number.
   */
  static numberWithCommas( x ) {
    const parts = x.toString().split( '.' );
    parts[0] = parts[0].replace( /\B(?=(\d{3})+(?!\d) )/g, ',' );
    return parts.join( '.' );
  }

  /**
   * Function for determining if an object or array has any elements or properties.
   *
   * @param {Object} object - Object or array to test.
   *
   * @return {Boolean} - True if the object is empty, false otherwise.
   */
  static isEmpty( object ) {
    if ( Array.isArray( object ) ) {
      if ( object.length === 0 ) {
        return true;
      } else {
        return false;
      }
    } else {
      if ( typeof object === 'object' ) {
        const tempReturn = true;
        Object.getOwnPropertyNames( object ).forEach( function( e ) {
          tempReturn = false;
        });
        return tempReturn;
      } else {
        return true;
      }
    }
  }

  /**
   * Function for generating a random string of characters.
   *
   * @param {Object} parameters - Parameters for this function. Properties:
   *    length:     Length of random string to reach. Optional.
   *    characters: Characters for random string to choose from. Optional.
   *    string:     String for random characters to be appended to. Optional.
   *
   * @return {String} Random string of characters.
   */
  static randomString( parameters ) {
    parameters = this.parametersExtractor( parameters );
    if ( typeof parameters.length !== 'number' ) {
      parameters.length = 48;
    }
    if ( typeof parameters.characters !== 'string' ) {
      parameters.characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    if ( typeof parameters.string !== 'string' ) {
      parameters.string = '';
    }
    return this.randomStringRecursive( parameters );
  }

  /**
   * Helper function for randomString().
   *
   * @param {Object} parameters - Parameters for this function. Properties:
   *    length:     Length of random string to reach.
   *    characters: Characters for random string to choose from.
   *    string:     String for random characters to be appended to.
   *
   * @return {String} Random string of characters.
   */
  static randomStringRecursive( parameters ) {
    parameters = this.parametersExtractor( parameters );
    if ( typeof parameters.string === 'undefined' && parameters.characters.length === 62 ) {
      parameters.string = parameters.characters.substr( Math.floor( Math.random() * 52 ), 1 );
    } else {
      parameters.string += parameters.characters.substr( Math.floor( Math.random() * parameters.characters.length ), 1 );
    }
    if ( parameters.length > 0 ) {
      parameters.length -= 1;
      return this.randomStringRecursive( parameters );
    } else {
      return parameters.string;
    }
  }

  /**
   * Function for normalizing a possibly undefined object to an object.
   *    Useful for functions that depend on a "parameters" object for their parameters.
   *
   * @param {Object} parameters - Parameters for this function. Optional.
   *
   * @return {Object} Parameters object (or property-less object).
   */
  static parametersExtractor( parameters ) {
    return ( ( typeof parameters === 'undefined' ) ? {} : parameters );
  }

  /**
   * Function for generating a random array.
   *
   * @param {Object} parameters - Parameters for this function. Properties:
   *    length: Length of the content of each element.
   *    height: Length of the array.
   *    width:  Length of each element of the outer array.
   *
   * @return {Array} Returned array.
   */
  static randomArray2D( parameters ) {
    parameters = this.parametersExtractor( parameters );
    const tempArray = [];
    for ( let i = 0; i < parameters.height; i++) {
      tempArray[i] = [];
      for ( let j = 0; j < parameters.width; j++ ) {
        tempArray[i][j] = this.randomString({'length': parameters.length});
      }
    }
    return tempArray;
  }
}
