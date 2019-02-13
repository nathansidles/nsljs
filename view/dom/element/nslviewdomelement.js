"use strict";

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMElementAbstract from './nslviewdomelement-abstract.js';
import NSLViewDOMElementButton from './button/nslviewdomelementbutton.js';

export default class NSLViewDOMElement extends NSLViewDOMElementAbstract {

	constructor( parameters ) {
		super( parameters );
	}

	new( parameters ) {
		parameters = NSLHelper.parametersExtractor( parameters );
		return new NSLViewDOMElement( parameters );
	}

	get button() {
		return new NSLViewDOMElementButton();
	}

}
