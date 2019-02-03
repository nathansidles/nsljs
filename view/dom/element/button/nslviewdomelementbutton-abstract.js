"use strict";

import NSLViewDOMElementAbstract from './../nslviewdomelement-abstract.js';

export default class NSLViewDOMElementButtonAbstract extends NSLViewDOMElementAbstract {

	constructor( appendee, content, prependee ) {
		super( appendee );
		this.content = {};
		if( typeof appendee !== 'undefined' ) {
			this['$node'] = this.create( appendee, 'div', [ 'nsl-element-button' ] );
			this.content = this.create( this['$node'], 'div', [ 'nsl-title' ], content );
		}
	}

}
