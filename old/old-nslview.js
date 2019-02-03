import NSL from './old-nsl.js';
import NSLDOM from './old-nsldom.js';

export default class NSLView {

	/**
	 * Function for constructing an instance of the class.
	 */
	constructor( url, title, html ) {
		var env = this;

		if( typeof url !== 'undefined' ) {
			env.url = url;
		} else {
			env.url = NSL.url;
		}
		if( typeof title !== 'undefined' ) {
			env.title = title;
		} else {
			env.title = document.title;
		}
		if( typeof html !== 'undefined' ) {
			env.html = html;
		} else {
			env.html = {};
			env.html.body = NSL.view.element.new( document.getElementsByTagName( 'body' )[0], env.html );
			console.log( env.html.body );
		}
	}

	static get element() {
		return new NSLElement();
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

	/**
	 * Function for clearing out a HTML node. The node itself is removed.
	 *
	 * @param {Object} node - Node/element to clear out.
	 */
	static deleteNode( node ) {
		node.parentNode.removeChild( node );
	}

	/**
	 * Function for clearing out a HTML node recursively. The node itself remains.
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
	static numberWithCommas( x ) {
		var parts = x.toString().split( '.' );
		parts[0] = parts[0].replace( /\B(?=(\d{3})+(?!\d) )/g, ',' );
		return parts.join( '.' );
	}

}

export class NSLViewElement {

}

export class NSLViewCollection extends NSLView {

	/**
	 * Function for constructing an instance of the class.
	 */
	constructor() {
		var env = this;
	}

	makeRow() {

	}

	makeCell() {

	}

}

export class NSLViewCollectionTable extends NSLViewCollection {}

export class NSLViewCollectionBig extends NSLViewCollection {

	/**
	 * Function for constructing an instance of the class.
	 */
	constructor() {
		var env = this;
	}

	set() {

	}

	scrollDown() {

	}

	scrollUp() {

	}

	scrollLeft() {

	}

	scrollRight() {

	}

}

export class NSLViewCollectionBigTable extends NSLViewCollectionBig {

	/**
	 * Function for constructing an instance of the class.
	 */
	 constructor( container, height, width, data, columns, headers ) {
 		super();
 		var env = this;
		env.container = container['$element'];
		env.width = width;
		env.height = height;
		if( !Array.isArray( data ) ) {
			data = NSL.objectToArray( NSL.deepCopy( data ) );
		}
		for( var i = 0; i < data.length; i++ ) {
			data[i].height = 0;
			data[i].visible = false;
		}
		env.data = data;
		env.columns = columns;
		env.headers = headers;
 	}

	setTable() {
		var env = this;

		var table, cell, a, tempHeight = 0;
		var row = {};

		env.container.style.height = env.height;
		env.container.style.width = env.width;
		env.container.style.overflowY = 'auto';

		var top = NSL.createElement( env.container, 'div' );
		top.style.height = 0 + 'px';

		table = NSL.createElement( env.container, 'table' );
		for( var i = 0; i < env.data.length && tempHeight < env.container.offsetHeight; i++ ) {
			row[i] = NSL.createElement( table, 'tr' );
			Object.getOwnPropertyNames( env.data[i] ).forEach( function( e ) {
				cell = NSL.createElement( row[i], 'td', env.data[i][e] );
			});
			tempHeight += row[i].offsetHeight;
			env.data[i].height = row[i].offsetHeight;
		}

		for( i; i < env.data.length; i++ ) {
			env.data[i].height = row[0].offsetHeight;
		}

		var bottom = NSL.createElement( env.container, 'div' );
		bottom.style.height = row[0].offsetHeight * env.data.length + 'px';

		var containerHeight = env.container.scrollHeight;
		var visibleHeight = env.container.offsetHeight;

		var oldTop = env.container.scrollTop;

		env.container.addEventListener( 'scroll', function( e ) {

			var newTop = e.target.scrollTop;
			if( newTop < 0 ) {
				newTop = 0;
			}

			var tempPercentTop = newTop / containerHeight;
			var tempPercentBottom = ( newTop + visibleHeight ) / containerHeight;
			var offsetTop = Math.floor( tempPercentTop * env.data.length );
			var offsetBottom = Math.floor( tempPercentBottom * env.data.length );

			if( oldTop < newTop ) {
				for( var i = offsetTop; i < offsetBottom; i++ ) {
					if( typeof row[i] === 'undefined' && typeof env.data[i] !== 'undefined' ) {
						row[i] = NSL.createElement( table, 'tr' );
						Object.getOwnPropertyNames( env.data[i] ).forEach( function( e ) {
							cell = NSL.createElement( row[i], 'td', env.data[i][e] );
						});
					}
				}
			} else {
				for( var i = ( offsetBottom - 1 ); i >= offsetTop; i-- ) {
					if( typeof row[i] === 'undefined' && typeof env.data[i] !== 'undefined' ) {
						row[i] = NSL.createElement( table, 'tr', table.firstChild );
						Object.getOwnPropertyNames( env.data[i] ).forEach( function( e ) {
							cell = NSL.createElement( row[i], 'td', env.data[i][e] );
						});
					}
				}
			}

			if( oldTop < newTop ) {
				for( var i = 0; i < offsetTop; i++ ) {
					var tempHeight = env.data[i].height;
					if( typeof row[i] !== 'undefined' ) {
						NSL.deleteNode( row[i] );
						delete row[i];
						if( newTop > oldTop + visibleHeight || newTop < oldTop - visibleHeight ) {
							top.style.height = newTop + 'px';
							bottom.style.height = ( containerHeight - newTop - visibleHeight ) + 'px';
						} else {
							top.style.height = ( parseInt( top.style.height ) + tempHeight ) + 'px'
							bottom.style.height = ( parseInt( bottom.style.height ) - tempHeight ) + 'px'
						}
					}
				}
			} else {
				for( var i = offsetBottom; i < env.data.length; i++ ) {
					var tempHeight = env.data[i].height;
					if( typeof row[i] !== 'undefined' ) {
						NSL.deleteNode( row[i] );
						delete row[i];
						if( newTop > oldTop + visibleHeight || newTop < oldTop - visibleHeight ) {
							top.style.height = newTop + 'px';
							bottom.style.height = ( containerHeight - newTop - visibleHeight ) + 'px';
						} else {
							top.style.height = ( parseInt( top.style.height ) - tempHeight ) + 'px'
							bottom.style.height = ( parseInt( bottom.style.height ) + tempHeight ) + 'px'
						}
					}
				}
			}

			oldTop = newTop;
		});

		return table;

	}

}

export class NSLViewCollectionBigList extends NSLViewCollectionBig {

	/**
	 * Function for constructing an instance of the class.
	 */
	constructor( container, width, height ) {
		super();
		var env = this;
	}
}

export class NSLViewColumn {

	/**
	 * Function for constructing an instance of the class.
	 */
	 constructor( id, title, type, width, actions ) {
 		var env = this;
		env.id = id;
		env.title = title;
		env.type = type;
		env.width = width;
		if( !Array.isArray( actions ) ) {
			actions = [ actions ];
		}
		env.actions = actions;
 	}
}

export class NSLViewList extends NSLView {}

export class NSLViewDropdown {}
