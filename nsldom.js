import NSL from './nsl.js';

/**
 * Class for storing DOM elements in a friendlier way.
 */
export default class NSLDOM {

	/**
	 * Function for constructing an instance of the class.
	 */
  constructor( element, ancestor ) {
    var env = this;
		env['$element'] = element;
		env['$ancestors'];
		env['$descendants'];
		env['$siblings'];
  }

	getElement() {
		var env = this;
		return env.element;
	}

	setElement( element ) {
		var env = this;
		if( element.constructor.name.lastIndexOf( 'HTML', 0 ) === 0 && element.constructor.name.indexOf( 'Element', element.constructor.name.length - 7 ) !== 0 ) {
			env.element = element;
		} else {
			throw 'Parameter is not an HTML element.';
		}
	}

	deleteElement() {
		var env = this;
		if( typeof env.element !== 'undefined' ) {
			delete env.element;
		}
	}

	getParent() {
		var env = this;
		return env.parent;
	}

	setParent( parent ) {
		var env = this;
		if( parent.constructor.name === 'NSLDOM' ) {
			env.parent = parent;
		} else {
			throw 'Parameter is not an NSLDOM object.';
		}
	}

	deleteParent() {
		var env = this;
		if( typeof env.parent !== 'undefined' ) {
			delete env.parent;
		}
	}

	getChildren() {
		var env = this;
		var tempArray = [];
		Object.getOwnPropertyNames( env ).forEach( function( e ) {
			if( e.lastIndexOf( '$', 0 ) !== 0 ) {
				tempArray.push( env[e] );
			}
		});
		return tempArray;
	}

	getChildrenNames() {
		var env = this;
		var tempArray = [];
		Object.getOwnPropertyNames( env ).forEach( function( e ) {
			if( e.lastIndexOf( '$', 0 ) !== 0 ) {
				tempArray.push( e );
			}
		});
		return tempArray;
	}

	getChild( child ) {
		var env = this;
		if( typeof env.children[child] !== 'undefined' ) {
			return env.children[child];
		} else {
			return;
		}
	}

	setChild( child ) {
		var env = this;
		if( child.constructor.name === 'NSLDOM' ) {
			env.children[child] = child;
		} else {
			throw 'Parameter is not an NSLDOM object.';
		}
	}

	deleteChild( child ) {
		var env = this;
		if( typeof env.children[child] !== 'undefined' ) {
			delete env.children[child];
		}
	}

	clearChildren( element ) {
		var env = this;
		if( Array.isArray( element ) ) {
			for( var i = 0; i < element.length; i++ ) {
				Object.getOwnPropertyNames( element[i] ).forEach( function( e ) {
					var tempNode = element[i]['$element'];
					if( e.lastIndexOf( '$', 0 ) !== 0 ) {
						env.clearChildrenRecursive( element[i][e] );
					}
					NSL.clearNode( tempNode );
				});
			}
		} else {
			Object.getOwnPropertyNames( element ).forEach( function( e ) {
				if( e.lastIndexOf( '$', 0 ) !== 0 ) {
					env.clearChildrenRecursive( element[e] );
				}
				NSL.clearNode( element['$element'] );
			});
		}
	}

	clearChildrenRecursive( element ) {
		var env = this;
		Object.getOwnPropertyNames( element ).forEach( function( e ) {
			if( e.lastIndexOf( '$', 0 ) !== 0 ) {
				env.clearChildrenRecursive( element[e] );
			}
			element['$element'] = null;
		});
	}

	getSiblings() {
		var env = this;
		return env.siblings;
	}

	getSibling( sibling ) {
		var env = this;
		if( typeof env.siblings[sibling] !== 'undefined' ) {
			return env.siblings[sibling];
		} else {
			return;
		}
	}

	setSibling( sibling ) {
		var env = this;
		if( sibling.constructor.name === 'NSLDOM' ) {
			env.siblings[sibling] = sibling;
		} else {
			throw 'Parameter is not an NSLDOM object.';
		}
	}

	deleteSibling( sibling ) {
		var env = this;
		if( typeof env.siblings[sibling] !== 'undefined' ) {
			delete env.siblings[sibling];
		}
	}

}
