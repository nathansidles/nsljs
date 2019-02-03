"use strict";

import NSLViewDOMElementAbstract from './nslviewdomelement-abstract.js';
import NSLViewDOMElementButton from './button/nslviewdomelementbutton.js';

export default class NSLViewDOMElement extends NSLViewDOMElementAbstract {

	constructor( appendee, tagName, classes, attributes, content, prependee ) {
		super( appendee, tagName, classes, attributes, content, prependee );
	}

	new( appendee, tagName, classes, attributes, content, prependee ) {
		if( typeof appendee === 'undefined' ) {
			appendee = document.getElementsByTagName( 'html' )[0];
		}
		return new NSLViewDOMElement( appendee, tagName, classes, attributes, content, prependee );
	}

	get button() {
		return new NSLViewDOMElementButton();
	}

}
