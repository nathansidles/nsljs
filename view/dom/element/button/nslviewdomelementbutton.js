"use strict";

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMElementButtonAbstract from './nslviewdomelementbutton-abstract.js';
import NSLViewDOMElement from './../nslviewdomelement.js';

export default class NSLViewDOMElementButton extends NSLViewDOMElementButtonAbstract {

	constructor( parameters ) {
		super( parameters );
	}

	new( parameters ) {

		if( typeof parameters === 'undefined' ) {
			parameters = {};
		}
		if( typeof parameters.appendee === 'undefined' ) {
			parameters.appendee = this['$node'].parentNode;
		}
		if( typeof parameters.content === 'undefined' ) {
			parameters.content = this.content['$node'].textContent;
		}
		var env = this;
		var temp = new NSLViewDOMElementButton( parameters );
		Object.getOwnPropertyNames( env ).forEach( function( e ) {
			if( e !== '$node' && e !== '$listeners' && e !== '$subscribers' && e !== '$publishers'  && e !== '$id' && e !== 'content' ) {
				temp[e] = env[e];
			}
		});
		Object.getOwnPropertyNames( env['$listeners'] ).forEach( function( e ) {
			Object.getOwnPropertyNames( env['$listeners'][e] ).forEach( function( f ) {
				temp.addEventListener( e, env['$listeners'][e][f] );
			});
		});
		Object.getOwnPropertyNames( env['$publishers'] ).forEach( function( e ) {
			Object.getOwnPropertyNames( env['$publishers'][e] ).forEach( function( f ) {
				env['$publishers'][e][f].addSubscriber( temp );
			});
		});
		Object.getOwnPropertyNames( env['$subscribers'] ).forEach( function( e ) {
			Object.getOwnPropertyNames( env['$subscribers'][e] ).forEach( function( f ) {
				env['$subscribers'][e][f].addPublisher( temp );
			});
		});

		return temp;
	}

}
