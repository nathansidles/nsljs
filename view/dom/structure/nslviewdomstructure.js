'use strict';

import NSLViewDOMStructureAbstract from './nslviewdomstructure-abstract.js';
import NSLViewDOMStructureStage from './stage/nslviewdomstructurestage.js';

export default class NSLViewDOMStructure extends NSLViewDOMStructureAbstract {

  constructor( object ) {
    super( object );
  }

  new() {
    if ( typeof object === 'undefined' ) {
      object = {};
    }
    return new NSLViewDOMStructure();
  }

  get stage() {
    return new NSLViewDOMStructureStage();
  }


}
