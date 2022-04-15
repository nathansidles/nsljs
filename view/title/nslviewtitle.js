'use strict';

import NSLViewTitleAbstract from './nslviewtitle-abstract.js';

export default class NSLViewTitle extends NSLViewTitleAbstract {

  constructor( parameters ) {
    super( parameters )
  }

  new( object ) {
    if ( typeof object === 'undefined' ) {
      object = {};
    }
    if ( typeof object.content !== 'undefined' ) {
      this.set( object );
    }
    return new NSLViewTitle( object );
  }

}
