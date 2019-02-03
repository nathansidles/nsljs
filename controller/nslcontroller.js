"use strict";

import NSLHelper from '/js/helper/nslhelper.js';

import NSLControllerAbstract from './nslcontroller-abstract.js';

import NSLControllerDOM from './dom/nslcontrollerdom.js';

export default class NSLController extends NSLControllerAbstract {

	constructor() {
		super();
	}

	new() {
		return new NSLController();
	}

	get dom() {
		return new NSLControllerDOM();
	}

}
