"use strict";

import NSLViewDOMElementButtonAbstract from './nslviewdomelementbutton-abstract.js';
import NSLViewDOMElement from './../nslviewdomelement.js';

export default class NSLViewDOMElementButton extends NSLViewDOMElementButtonAbstract {

	constructor( appendee, content, prependee ) {
		super( appendee, content, prependee );
	}

	new( appendee, content, prependee ) {
		if( typeof appendee === 'undefined' ) {
			appendee = document.getElementsByTagName( 'body' )[0];
		}
		return new NSLViewDOMElementButton( appendee, content, prependee );
	}

}
