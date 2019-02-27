'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMCollectionAbstract from './nslviewdomcollection-abstract.js';

export default class NSLViewDOMCollection extends NSLViewDOMCollectionAbstract {

  constructor( parameters ) {
    super( parameters );
  }

  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    return new NSLViewDOMCollection( parameters );
  }

}
