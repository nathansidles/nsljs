'use strict';

import NSLViewDOMAbstract from './nslviewdom-abstract.js';

import NSLViewDOMCollection from './collection/nslviewdomcollection.js';
import NSLViewDOMElement from './element/nslviewdomelement.js';
import NSLViewDOMStructure from './structure/nslviewdomstructure.js';

export default class NSLViewDOM extends NSLViewDOMAbstract {

  constructor( object ) {
    super( object );
  }

  new( object ) {
    if ( typeof object === 'undefined' ) {
      object = {};
    }
    return new NSLViewDOM( object );
  }

  get collection() {
    return new NSLViewDOMCollection();
  }

  get element() {
    return new NSLViewDOMElement();
  }

  get structure() {
    return new NSLViewDOMStructure();
  }


}
