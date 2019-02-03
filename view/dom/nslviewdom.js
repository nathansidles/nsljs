"use strict";

import NSLViewDOMAbstract from './nslviewdom-abstract.js';
import NSLViewDOMElement from './element/nslviewdomelement.js';
import NSLViewDOMStructure from './structure/nslviewdomstructure.js';

export default class NSLViewDOM extends NSLViewDOMAbstract {

	constructor() {
		super();
	}

	new() {
		return new NSLViewDOM();
	}

	get element() {
		return new NSLViewDOMElement();
	}

	get structure() {
		return new NSLViewDOMStructure();
	}


}
