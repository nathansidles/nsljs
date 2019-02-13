"use strict";

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLControllerDOMAbstract from './nslcontrollerdom-abstract.js';

export default class NSLControllerDOM extends NSLControllerDOMAbstract {

	constructor( parameters ) {
		super( parameters );
	}

	new( parameters ) {
		parameters = NSLHelper.parametersExtractor( parameters );
		return new NSLControllerDOM( parameters );
	}


}
