"use strict";

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMElementButtonAbstract from './nslviewdomelementbutton-abstract.js';
import NSLViewDOMElement from './../nslviewdomelement.js';

export default class NSLViewDOMElementButton extends NSLViewDOMElementButtonAbstract {

	constructor( object ) {
		super( object );
	}

	new( object ) {
		if( typeof object === 'undefined' ) {
			object = {};
		}
		var env = this;
		var temp = new NSLViewDOMElementButton( object );
		Object.getOwnPropertyNames( env ).forEach( function( e ) {
			if( e !== '$node' && e !== '$listeners' ) {
				temp[e] = env[e];
			}
		});
		Object.getOwnPropertyNames( env['$listeners'] ).forEach( function( e ) {
			Object.getOwnPropertyNames( env['$listeners'][e] ).forEach( function( f ) {
				temp.addEventListener( e, env['$listeners'][e][f] );
			});
		});
		for( var i = 0; i < env['$publishers'].length; i++ ) {
			env['$publishers'][i].addSubscriber( temp );
		}
		return temp;
	}

}
