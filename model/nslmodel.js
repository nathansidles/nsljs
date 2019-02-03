"use strict";

import NSLHelper from '/nsljs/helper/nslhelper.js';
import NSLModelDOM from './dom/nslmodeldom.js';

export default class NSLModel {

	constructor() {

	}

	new() {
		return new NSLModel();
	}

	get dom() {
		return new NSLModelDOM();
	}

}
