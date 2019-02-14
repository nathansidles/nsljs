'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';
import NSLModelDOM from './dom/nslmodeldom.js';

export default class NSLModel {

  constructor() {

  }

  new( data ) {
    return new NSLModel( data );
  }

  get dom() {
    return new NSLModelDOM();
  }

}
