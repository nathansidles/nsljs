  'use strict';

import NSLViewDOMElementAbstract from './../nslviewdomelement-abstract.js';
import NSLViewDOMElement from './../../element/nslviewdomelement.js';

export default class NSLViewDOMElementButtonAbstract extends NSLViewDOMElementAbstract {

  constructor( object ) {
    super( object );
    if ( typeof object !== 'undefined' ) {
      let env = this;
      this['$node'] = this.create({
        'appendee' : object.appendee, 'tagName' : 'div', 'classes' : [ 'nsl-element-button' ] });
      this.content = new NSLViewDOMElement({ 'appendee' : this['$node'], 'tagName' : 'div', 'classes' : [ 'nsl-title' ], 'content' : object.content });
    }
  }

}
