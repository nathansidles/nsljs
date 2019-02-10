"use strict";

import NSLViewDOMElementAbstract from './nslviewdomelement-abstract.js';
import NSLViewDOMElementButton from './button/nslviewdomelementbutton.js';

export default class NSLViewDOMElement extends NSLViewDOMElementAbstract {

	constructor( object ) {
		super( object );
	}

	new( object ) {
		if( typeof object === 'undefined' ) {
			object = {};
		}
		return new NSLViewDOMElement( object );
	}

	get button() {
		return new NSLViewDOMElementButton();
	}

}
