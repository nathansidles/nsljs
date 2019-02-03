"use strict";

import NSLAbstract from './../nsl-abstract.js';

/*
 * This class supplies essential functions for the NSLModel class and the child classes of this pseudo-abstract class.
 */
export default class NSLModelAbstract extends NSLAbstract {

	constructor() {
		super();
		this.data;
	}

	getData() {
		return this.data;
	}

	setData( data ) {
		this.data = data;
	}

}
