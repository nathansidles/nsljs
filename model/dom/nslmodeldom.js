"use strict";

import NSLHelper from '/js/helper/nslhelper.js';

import NSLModelDOMAbstract from './nslmodeldom-abstract.js';

export default class NSLModelDOM extends NSLModelDOMAbstract {

	constructor( actions, models, views ) {
		super( models, views, actions );
	}

	new( actions, models, views ) {
		return new NSLModelDOM( actions, models, views );
	}


}
