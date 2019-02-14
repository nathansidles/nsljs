'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLControllerAbstract from './nslcontroller-abstract.js';

import NSLControllerDOM from './dom/nslcontrollerdom.js';

export default class NSLController extends NSLControllerAbstract {

  constructor( parameters ) {
    super( parameters );
  }

  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    return new NSLController( parameters );
  }

  get dom() {
    return new NSLControllerDOM();
  }

}
