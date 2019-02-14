'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

export default class NSLControllerViewEventAction {

  constructor( view ) {
    this.view = ( view.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) ? view : {};
    this.events = {};
  }

}
