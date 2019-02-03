"use strict";

import NSLViewDOMStructureAbstract from './nslviewdomstructure-abstract.js';
import NSLViewDOMStructureStage from './stage/nslviewdomstructurestage.js';

export default class NSLViewDOMStructure extends NSLViewDOMStructureAbstract {

	constructor() {
		super();
	}

	new() {
		return new NSLViewDOMStructure();
	}

	get stage() {
		return new NSLViewDOMStructureStage();
	}


}
