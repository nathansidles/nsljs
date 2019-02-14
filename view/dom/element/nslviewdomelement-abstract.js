'use strict';

import NSLViewDOMAbstract from './../nslviewdom-abstract.js';

export default class NSLViewDOMElementAbstract extends NSLViewDOMAbstract {

  constructor( object ) {
    super( object );
    if ( typeof object !== 'undefined' ) {
      if ( typeof object.tagName !== 'undefined' ) {
        this['$node'] = this.create( object );
      } else {
        this['$node'] = object.appendee;
      }
    }
  }

  /**
   * Function for creating an HTML element. Allows customization of placement, tag name, classes, attributes, and text content.
   *
   * @param {Object} appendee - HTMLElement or NSLViewDOM object on which to attach new element. Required.
   * @param {String} tagName - Type of HTML element to create. Required.
   * @param {Array} classes - Classes to attach to new element (optional).
   * @param {Object} attributes - Attributes to attach to new element (optional).
   * @param {String} content - Text to attach to new element (optional).
   * @param {Object} prependee -  HTMLElement or NSLViewDOM object on which to prepend new element. Optional.
   *
   * @return {Object} - Created HTML element.
   */
  create( object ) {
    var element = document.createElement( object.tagName );
    object.appendee = this.nodeExtractor( object.appendee );

    for ( var i in object.classes ) {
      element.classList.add( object.classes[i] );
    }

    if ( typeof object.attributs !== 'undefined' ) {
      Object.getOwnPropertyNames( object.attributes ).forEach( function( e ) {
        element.setAttribute( e, object.attributes[e] );
      });
    }

    if ( typeof object.content !== 'undefined' && object.content !== '' ) {
      element.appendChild( document.createTextNode( object.content ) );
    }

    if ( typeof object.prependee !== 'undefined' && typeof object.appendee !== 'undefined' ) {
      object.prependee = this.nodeExtractor( object.prependee );
      object.appendee.insertBefore( element, object.prependee );
    } else {
      if ( typeof object.appendee !== 'undefined' ) {
        object.appendee.appendChild( element );
      }
    }

    return element;

  }

  /**
   * Function for determing if an element has a given class.
   *
   * @param {Object} elements - Element or elements to test. Optional. If missing, the current object's class is evaluated.
   * @param {String} testClasses - Class to search for. If array, array of classes.
   *
   * @return {Boolean} - Truth value of presence of class associated with element.
   */
  hasClass( elements, testClasses ) {

    var inputs = this.classInputsIdentifier( elements, testClasses );

    for ( let i = 0; i < inputs.elements.length; i++ ) {
      for ( let j = 0; j < inputs.testClasses.length; j++ ) {
        if ( ( ' ' + inputs.elements[i].className + ' ' ).indexOf( ' ' + inputs.testClasses[j] + ' ' ) > -1 ) {
          return true;
        }
        return false;
      }
    }
  }

  /**
   * Function for adding a class to an element.
   *
   * @param {Object} element - HTMLElement(s) or NSLViewDOMElement object(s) to add to a class. Optional. If missing, the current object has the class attached.
   * @param {String} testClasses - Class to search for. If array, array of classes.
   *
   */
  addClass( elements, testClasses ) {

    var inputs = this.classInputsIdentifier( elements, testClasses );

    for ( let i = 0; i < inputs.elements.length; i++ ) {
      for ( let j = 0; j < inputs.testClasses.length; j++ ) {
        inputs.elements[i].classList.add( inputs.testClasses[j] );
      }
    }
  }

  /**
   * Function for removing a class from an element.
   *
   * @param {Object} element - HTMLElement(s) or NSLViewDOMElement object(s) to remove from a class. Optional. If missing, the current object has the class attached.
   * @param {String} testClasses - Class to search for. If array, array of classes.
   */
  removeClass( elements, testClasses ) {

    var inputs = this.classInputsIdentifier( elements, testClasses );

    for ( let i = 0; i < inputs.elements.length; i++ ) {
      for ( let j = 0; j < inputs.testClasses.length; j++ ) {
        inputs.elements[i].classList.remove( inputs.testClasses[j] );
      }
    }
  }

  /**
   * Function for adding a class to an element and removing it from all similar elements.
   *
   * @param {Object} removeElements - HTMLElement(s) or NSLViewDOMElement object(s) to remove from the class. Required.
   * @param {Object} addElements - HTMLElement(s) or NSLViewDOMElement object(s) to add to a class. Optional. If missing, the current object has the class attached
   * @param {String} testClasses - Class to search for. If array, array of classes.
   *
   * @return {Object} - Element property.
   */
  addClassUnique( removeElements, addElements, testClasses ) {

    this.removeClass( removeElements, testClasses );
    this.addClass( addElements, testClasses );
  }

  /**
   * Function for replacing text in an elemnt.
   *
   * @param {Object} element - HTMLElement or NSLViewDOM object in which to replace text.
   * @param {String} text - Text to add to element.
   */
  replaceText( parameters ) {
    if ( typeof parameters !== 'undefined' ) {
      if ( typeof parameters.element === 'undefined' ) {
        parameters.element = this['$node'];
      } else {
        parameters.element = this.nodeExtractor( parameters.element );
      }
      for ( var node in parameters.element.childNodes ) {
        if ( parameters.element.childNodes[node].nodeType == 3 ) {
          parameters.element.removeChild( parameters.element.childNodes[node] );
          parameters.element.appendChild( document.createTextNode( parameters.text ) );
        }
      }
    }
  }

  /**
   * Function for toggling an element visible or not.
   *
   * @param {Object} element - HTMLElement or NSLViewDOM object to toggle.
   */
  toggle( element ) {
    element = this.nodeExtractor( element );
    if ( element.style.display == 'none' || element.style.display == '' ) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }

  /**
   * Helper function for hasClass(), addClass(), and deleteClass() that identifies the type of input that has been provided.
   *
   * @param {Object} element - Element or elements to evaluate. Optional. If missing, the current object's class is evaluated.
   * @param {String} testClasses - Class to search for. If array, array of classes.
   *
   * @return {Object} - Returned object with two properties.
   */
  classInputsIdentifier( elements, testClasses ) {

    var tempReturn = {};

    tempReturn.elements = [];
    tempReturn.testClasses = [];

    if ( Array.isArray( elements ) ) {
      for ( let i = 0; i < elements.length; i++ ) {
        var tempElement = this.nodeExtractor( elements[i] );
        if ( typeof tempElement !== 'undefined' ) {
          tempReturn.elements.push( tempElement );
        } else if ( typeof element[i] === 'string' ) {
          tempReturn.testClasses.push( elements[i] );
        }
      }
      if ( tempReturn.elements.length === 0 ) {
        tempReturn.elements.push( this['$node'] );
      }
    } else if ( typeof elements === 'string' ) {
      tempReturn.elements.push( this['$node'] );
      tempReturn.testClasses.push( elements );
    } else if ( typeof elements === 'object' && elements !== null ) {
      tempReturn.elements.push( this.nodeExtractor( elements ) );
    }

    if ( Array.isArray( testClasses ) ) {
      for ( let i = 0; i < testClasses.length; i++ ) {
        if ( typeof testClasses[i] === 'string' ) {
          tempReturn.testClasses.push( testClasses[i] );
        }
      }
    }
    if ( typeof testClasses === 'string' ) {
      tempReturn.testClasses.push( testClasses );
    }

    return tempReturn;

  }

}
