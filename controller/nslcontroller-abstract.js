"use strict";

import NSLAbstract from './../nsl-abstract.js';

/*
 * This class supplies essential functions for the NSLController class and the child classes of this helper class.
 */
export default class NSLControllerAbstract extends NSLAbstract {

	constructor() {
		super();
	}

	addView() {}

	removeView() {}

	removeViews() {}

	addEventListener( view, event, controller ) {}

	removeEventListener( view, event, controller ) {}
	
}
