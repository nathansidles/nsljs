"use strict";

import NSLHelper from '/nsljs/helper/nslhelper.js';

/*
 * This is a pseudo-abstract class. It implements the Observer pattern. It is the root class for all classes in the NSL.
 */
export default class NSLAbstract {

	constructor() {
		this['$publishers'] = {};
		this['$publishers']['$controllers'] = [];
		this['$publishers']['$models'] = [];
		this['$publishers']['$views'] = [];
		this['$subscribers'] = {};
		this['$subscribers']['$controllers'] = [];
		this['$subscribers']['$models'] = [];
		this['$subscribers']['$views'] = [];
	}

	addSubscriber( subscriber ) {
		if( typeof subscriber !== 'undefined' ) {
			if( typeof subscriber.getNotification === 'function' ) {
				if( subscriber.constructor.name.lastIndexOf( 'NSLController', 0 ) === 0 ) {
					this['$subscribers']['$controllers'].push( subscriber );
				} else if( subscriber.constructor.name.lastIndexOf( 'NSLModel', 0 ) === 0 ) {
					this['$subscribers']['$models'].push( subscriber );
				} else if( subscriber.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
					this['$subscribers']['$views'].push( subscriber );
				}
				subscriber.addPublisher( this );
			}
		}
	}

	removeSubscriber( subscriber ) {
		var env = this;
		Object.getOwnPropertyNames( env['$subscribers'] ).forEach( function( e ) {
			env['$subscribers'][e].splice( env['$subscribers'][e].indexOf( subscriber ), 1 );
		});
		subscriber.removePublisher( this );
	}

	removeSubscribers() {
		this['$subscribers']['$controllers'] = [];
		this['$subscribers']['$models'] = [];
		this['$subscribers']['$views'] = [];
	}

	notifySubscribers() {
		var env = this;
		Object.getOwnPropertyNames( env['$subscribers'] ).forEach( function( e ) {
			for( var i = 0, length = env['$subscribers'][e]; i < length; i++ ) {
				env['$subscribers'][e][i].getNotification( env );
			}
		});
	}

	addPublisher( publisher ) {
		if( typeof publisher !== 'undefined' ) {
			if( typeof publisher.notifySubscribers === 'function' ) {
				if( publisher.constructor.name.lastIndexOf( 'NSLController', 0 ) === 0 ) {
					this['$publishers']['$controllers'].push( publisher );
				} else if( publisher.constructor.name.lastIndexOf( 'NSLModel', 0 ) === 0 ) {
					this['$publishers']['$models'].push( publisher );
				} else if( publisher.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
					this['$publishers']['$views'].push( publisher );
				}
			}
		}
	}

	removePublisher( publisher ) {
		var env = this;
		Object.getOwnPropertyNames( env['$publishers'] ).forEach( function( e ) {
			env['$publishers'][e].splice( env['$publishers'][e].indexOf( publisher ), 1 );
		});;
	}

	getNotification( publisher ) {}

}
