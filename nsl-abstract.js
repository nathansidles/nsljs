"use strict";

import NSLHelper from '/nsljs/helper/nslhelper.js';

/*
 * This is a pseudo-abstract class. It implements the Observer pattern. It is the root class for all classes in the NSL.
 */
export default class NSLAbstract {

	constructor() {
		this.subscribers = [];
	}

	addSubscriber( subscriber ) {
		if( typeof subscriber !== 'undefined' ) {
			if( typeof subscriber.getNotification() === 'function' ) {
				this.subscribers.push( subscriber );
			}
		}
	}

	removeSubscriber( subscriber ) {
		this.subscribers.splice( this.subscribers.indexOf( subscriber ), 1 );
	}

	removeSubscribers() {
		this.subscribers = [];
	}

	notifySubscribers() {
		for( var i = 0, length = this.subscribers.length; i < length; i++ ) {
			if( typeof subscriber.getNotification() === 'function' ) {
				this.subscribers[i].getNotification( this );
			}
		}
	}

	getNotification( publisher ) {}

}
