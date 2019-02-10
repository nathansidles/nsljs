"use strict";

import NSLViewDOMStructureAbstract from './../nslviewdomstructure-abstract.js';
import NSLViewDOMElement from './../../element/nslviewdomelement.js';

/*
 * This class supplies essential functions for the NSLViewDOM class and the child classes of this helper class.
 */
export default class NSLViewDOMStructureStageAbstract extends NSLViewDOMStructureAbstract {

	constructor( object ) {
		super( object );
		if( typeof object !== 'undefined' ) {
			var factory = new NSLViewDOMElement();

			this['$node']      = factory.create({ 'appendee' : object.appendee, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage', 'nsl-structure-stage-container' ], 'attributes' : object.attributes });

			this.top           = factory.new({ 'appendee' : this, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-top' ] });
			this.top.left      = factory.new({ 'appendee' : this.top, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-left' ] });
			this.top.center    = factory.new({ 'appendee' : this.top, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-center' ] });
			this.top.right     = factory.new({ 'appendee' : this.top, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-right' ] });

			this.middle        = factory.new({ 'appendee' : this, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-middle' ] });
			this.middle.left   = factory.new({ 'appendee' : this.middle, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-left' ] });
			this.middle.center = factory.new({ 'appendee' : this.middle, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-center' ] });
			this.middle.right  = factory.new({ 'appendee' : this.middle, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-right' ] });

			this.bottom        = factory.new({ 'appendee' : this, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-bottom' ] });
			this.bottom.left   = factory.new({ 'appendee' : this.bottom, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-left' ] });
			this.bottom.center = factory.new({ 'appendee' : this.bottom, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-center' ] });
			this.bottom.right  = factory.new({ 'appendee' : this.bottom, 'tagName' : 'div', 'classes' : [ 'nsl-structure-stage-right' ] });

		}
		return this;
	}

}
