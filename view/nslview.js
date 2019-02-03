"use strict";

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewAbstract from './nslview-abstract.js';

import NSLViewDOM from './dom/nslviewdom.js';
import NSLViewTitle from './title/nslviewtitle.js';
import NSLViewURL from './url/nslviewurl.js';

export default class NSLView extends NSLViewAbstract {

	constructor() {
		super();
	}

	new() {
		return new NSLView();
	}

	get dom() {
		return new NSLViewDOM();
	}

	get title() {
		return new NSLViewTitle();
	}

	get url() {
		return new NSLViewURL();
	}

}
