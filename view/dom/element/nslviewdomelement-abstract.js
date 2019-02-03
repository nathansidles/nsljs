"use strict";

import NSLViewDOMAbstract from './../nslviewdom-abstract.js';

export default class NSLViewDOMElementAbstract extends NSLViewDOMAbstract {

	constructor( appendee, tagName, classes, attributes, content, prependee ) {
		super();
		if( typeof appendee !== 'undefined' ) {
			if( typeof tagName === 'undefined' ) {
				this['$node'] = appendee;
			} else {
				this['$node'] = this.create( appendee, tagName, classes, attributes, content, prependee );
			}
		}
		this['$listeners'] = {};
	}

	/**
	 * Function for creating an HTML element. Allows customization of placement, tag name, classes, attributes, and text content. Only placement (appendee) and tagName are required.
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
	create( appendee, tagName, classes, attributes, content, prependee ) {

		var element = document.createElement( tagName );
		var inputs = this.createInputsIdentifier( classes, attributes, content, prependee );
		appendee = this.nodeExtractor( appendee );

		for( var i in inputs.classes ) {
			element.classList.add( inputs.classes[i] );
		}

		Object.getOwnPropertyNames( inputs.attributes ).forEach( function( e ) {
			element.setAttribute( e, inputs.attributes[e] )
		});

		if( inputs.content !== '' ) {
			element.appendChild( document.createTextNode( inputs.content ) );
		}

		if( typeof prependee !== 'undefined' ) {
			prependee = this.nodeExtractor( inputs.prependee );
			appendee.insertBefore( element, prependee );
		} else {
			appendee.appendChild( element );
		}

		return element;

	}

	/**
	 * Helper function for create() that identifies the type of input that has been provided.
	 *
	 * @param {Array} classes - Classes to attach to new element. Optional.
	 * @param {Object} attributes - Attributes to attach to new element. Optional.
	 * @param {String} content - Text to attach to new element. Optional.
	 * @param {Object} prependee -  HTMLElement or NSLViewDOM object on which to prepend new element. Optional.
	 *
	 * @return {Object} - Returned object with four properties, one of which may be customized per the inputted property.
	 */
	createInputsIdentifier( classes, attributes, content, prependee ) {

		var tempReturn = {};

		tempReturn.classes = [];
		tempReturn.attributes = {};
		tempReturn.content = '';
		tempReturn.prependee = {};

		if( Array.isArray( classes ) ) {
			tempReturn.classes = classes;
		}
		if( Array.isArray( attributes ) ) {
			tempReturn.classes = attributes;
		}
		if( Array.isArray( content ) ) {
			tempReturn.classes = content;
		}
		if( Array.isArray( prependee ) ) {
			tempReturn.classes = prependee;
		}

		if( !Array.isArray( classes ) && typeof classes === 'object' && classes !== null ) {
			if( ( classes.constructor.name.lastIndexOf( 'HTML', 0 ) === 0
					&& classes.constructor.name.indexOf( 'Element', classes.constructor.name.length - 7 ) !== 0
					) || classes.constructor.name.lastIndexOf( 'NSLViewDOM' ) === 0
			) {
				tempReturn.prependee = classes;
			} else {
				tempReturn.attributes = classes;
			}
		}
		if( !Array.isArray( attributes ) && typeof attributes === 'object' && attributes !== null ) {
			if( ( attributes.constructor.name.lastIndexOf( 'HTML', 0 ) === 0
					&& attributes.constructor.name.indexOf( 'Element', attributes.constructor.name.length - 7 ) !== 0
					) || attributes.constructor.name.lastIndexOf( 'NSLViewDOM' ) === 0
			) {
				tempReturn.prependee = attributes;
			} else {
				tempReturn.attributes = attributes;
			}
		}
		if( !Array.isArray( content ) && typeof content === 'object' && content !== null ) {
			if( ( content.constructor.name.lastIndexOf( 'HTML', 0 ) === 0
					&& content.constructor.name.indexOf( 'Element', content.constructor.name.length - 7 ) !== 0
				) || content.constructor.name.lastIndexOf( 'NSLViewDOM' ) === 0
			) {
				tempReturn.prependee = content;
			} else {
				tempReturn.attributes = content;
			}
		}
		if( !Array.isArray( prependee ) && typeof prependee === 'object' && prependee !== null ) {
			if( ( prependee.constructor.name.lastIndexOf( 'HTML', 0 ) === 0
					&& prependee.constructor.name.indexOf( 'Element', prependee.constructor.name.length - 7 ) !== 0
				) || prependee.constructor.name.lastIndexOf( 'NSLViewDOM' ) === 0
			) {
				tempReturn.prependee = prependee;
			} else {
				tempReturn.attributes = prependee;
			}
		}

		if( typeof classes === 'string' ) {
			tempReturn.content = classes;
		}
		if( typeof attributes === 'string' ) {
			tempReturn.content = attributes;
		}
		if( typeof content === 'string' ) {
			tempReturn.content = content;
		}
		if( typeof prependee === 'string' ) {
			tempReturn.content = prependee;
		}

		return tempReturn;

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

		for( var i = 0; i < inputs.elements.length; i++ ) {
			for( var j = 0; j < inputs.testClasses.length; j++ ) {
				if( ( ' ' + inputs.elements[i].className + ' ' ).indexOf( ' ' + inputs.testClasses[j] + ' ' ) > -1 ) {
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

		for( var i = 0; i < inputs.elements.length; i++ ) {
			for( var j = 0; j < inputs.testClasses.length; j++ ) {
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

		for( var i = 0; i < inputs.elements.length; i++ ) {
			for( var j = 0; j < inputs.testClasses.length; j++ ) {
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
	replaceText( element, text ) {
		element = this.nodeExtractor( element );s
		for( var node in element.childNodes ) {
			if( element.childNodes[node].nodeType == 3 ) {
				element.removeChild( element.childNodes[node] );
				element.appendChild( document.createTextNode( text ) );
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
		if( element.style.display == 'none' || element.style.display == '' ) {
			element.style.display = 'block'
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

		if( Array.isArray( elements ) ) {
			for( var i = 0; i < elements.length; i++ ) {
				var tempElement = this.nodeExtractor( elements[i] );
				if( typeof tempElement !== 'undefined' ) {
					tempReturn.elements.push( tempElement );
				} else if( typeof element[i] === 'string' ) {
					tempReturn.testClasses.push( elements[i] );
				}
			}
			if( tempReturn.elements.length === 0 ) {
				tempReturn.elements.push( this['$node'] );
			}
		} else if( typeof elements === 'string' ) {
			tempReturn.elements.push( this['$node'] );
			tempReturn.testClasses.push( elements );
		} else if( typeof elements === 'object' && elements !== null ) {
			tempReturn.elements.push( this.nodeExtractor( elements ) );
		}

		if( Array.isArray( testClasses ) ) {
			for( var i = 0; i < testClasses.length; i++ ) {
				if( typeof testClasses[i] === 'string' ) {
					tempReturn.testClasses.push( testClasses[i] );
				}
			}
		}
		if( typeof testClasses === 'string' ) {
			tempReturn.testClasses.push( testClasses );
		}

		return tempReturn;

	}

	/**
	 * Function for adding an event listener to an HTML element.
	 *
	 * @param {Object} element - HTMLElement or NSLViewDOM object to toggle.
	 */
	addEventListener( event, inputFunction ) {

		this['$node'].addEventListener( event, inputFunction );
		this['$listeners'][inputFunction] = inputFunction;

	}

}
