"use strict";

import NSLViewDOMStructureStageAbstract from './nslviewdomstructurestage-abstract.js';

export default class NSLViewDOMStructureStage extends NSLViewDOMStructureStageAbstract {

	constructor( appendee ) {
		super( appendee );
	}

	new( appendee ) {
		if( typeof appendee === 'undefined' ) {
			appendee = document.getElementsByTagName( 'body' )[0];
		}
		return new NSLViewDOMStructureStage( appendee );
	}

}
