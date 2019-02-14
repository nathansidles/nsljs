'use strict';

import NSLViewDOMStructureStageAbstract from './nslviewdomstructurestage-abstract.js';

export default class NSLViewDOMStructureStage extends NSLViewDOMStructureStageAbstract {

  constructor( object ) {
    super( object );
  }

  new( object ) {
    if ( typeof object === 'undefined' ) {
      object = {};
    }
    return new NSLViewDOMStructureStage( object );
  }

}
