"use strict";

import NSLViewDOMStructureAbstract from './../nslviewdomstructure-abstract.js';
import NSLViewDOMElement from './../../element/nslviewdomelement.js';

/*
 * This class supplies essential functions for the NSLViewDOM class and the child classes of this helper class.
 */
export default class NSLViewDOMStructureStageAbstract extends NSLViewDOMStructureAbstract {

	constructor( appendee ) {
		super();
		if( typeof appendee !== 'undefined' ) {
			var factory = new NSLViewDOMElement();

			this['$node']      = factory.create( appendee, 'div', [ 'nsl-structure-stage', 'nsl-structure-stage-container' ] );

			this.top           = factory.new( this, 'div', [ 'nsl-structure-stage-top' ] );
			this.top.left      = factory.new( this.top, 'div', [ 'nsl-structure-stage-left' ] );
			this.top.center    = factory.new( this.top, 'div', [ 'nsl-structure-stage-center' ] );
			this.top.right     = factory.new( this.top, 'div', [ 'nsl-structure-stage-right' ] );

			this.middle        = factory.new( this, 'div', [ 'nsl-structure-stage-middle' ] );
			this.middle.left   = factory.new( this.middle, 'div', [ 'nsl-structure-stage-left' ] );
			this.middle.center = factory.new( this.middle, 'div', [ 'nsl-structure-stage-center' ] );
			this.middle.right  = factory.new( this.middle, 'div', [ 'nsl-structure-stage-right' ] );

			this.bottom        = factory.new( this, 'div', [ 'nsl-structure-stage-bottom' ] );
			this.bottom.left   = factory.new( this.bottom, 'div', [ 'nsl-structure-stage-left' ] );
			this.bottom.center = factory.new( this.bottom, 'div', [ 'nsl-structure-stage-center' ] );
			this.bottom.right  = factory.new( this.bottom, 'div', [ 'nsl-structure-stage-right' ] );

		}
		return this;
	}

}
