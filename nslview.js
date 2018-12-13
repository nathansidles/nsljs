import NSL from './nsl.js';

class NSLView {

	/**
	 * Function for constructing an instance of the class.
	 */
	constructor() {
		var env = this;
	}



}

class NSLViewCollection {

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

class NSLTable extends NSLView {}

export default class NSLViewBig {

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

export class NSLViewBigTable extends NSLViewBig {

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

class NSLViewBigList extends NSLViewBig {

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
