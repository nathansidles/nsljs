"use strict";

import NSLHelper from '/js/helper/nslhelper.js';

import NSLAbstract from './nsl-abstract.js';

import NSLController from './controller/nslcontroller.js';
import NSLModel from './model/nslmodel.js';
import NSLView from './view/nslview.js';

export default class NSL extends NSLAbstract {

	constructor() {

	}

	new() {
		return new NSL();
	}

	static get controller() {
		return new NSLController();
	}

	static get helper() {
		return new NSLAbstract();
	}

	static get model() {
		return new NSLModel();
	}

	static get view() {
		return new NSLView();
	}

}
