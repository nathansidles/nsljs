"use strict";

import NSLControllerDOMAbstract from './nslcontrollerdom-abstract.js';

export default class NSLControllerDOM extends NSLControllerDOMAbstract {

	constructor( actions, models, views ) {
		super( models, views, actions );
	}

	new( actions, models, views ) {
		return new NSLControllerDOM( actions, models, views );
	}


}
