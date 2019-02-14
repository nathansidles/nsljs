  'use strict';

import NSLViewDOMElementAbstract from './../nslviewdomelement-abstract.js';
import NSLViewDOMElement from './../../element/nslviewdomelement.js';

export default class NSLViewDOMElementButtonAbstract extends NSLViewDOMElementAbstract {

  constructor( object ) {
    super( object );
    if ( typeof object !== 'undefined' ) {
      var env = this;
      this['$node'] = this.create({ 'appendee' : object.appendee, 'tagName' : 'div', 'classes' : [ 'nsl-element-button' ] });
      this.content = new NSLViewDOMElement({ 'appendee' : env['$node'], 'tagName' : 'div', 'classes' : [ 'nsl-title' ], 'content' : object.content });
    }
  }

}
