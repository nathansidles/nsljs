"use strict";

import NSLControllerAbstract from './../nslcontroller-abstract.js';

/*
 * This class supplies essential functions for the NSLViewDOM class and the child classes of this helper class.
 */
export default class NSLControllerDOMAbstract extends NSLControllerAbstract {

	constructor( parameters ) {
		super( parameters );
	}

	addView( view ) {
		view.addSubscriber( this );
	}

	addEvent( event, view ) {
	}

	getNotification( publisher, event ) {
		console.log( publisher );
		console.log( event );
	}

}
