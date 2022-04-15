'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewAbstract from './../nslview-abstract.js';

/*
 * This class supplies essential functions for the NSLViewTitle class and the child classes of this helper class.
 */
export default class NSLViewTitleAbstract extends NSLViewAbstract {

  constructor( object ) {
    super( object );
  }

  set( object ) {
    if ( typeof object === 'undefined' ) {
      object = {};
    }
    document.title = object.content;
  }

}
