'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMCollectionAbstract from './nslviewdomcollection-abstract.js';

import NSLViewDOMCollectionAbsolute from './absolute/nslviewdomcollectionabsolute.js';
import NSLViewDOMCollectionTable from './table/nslviewdomcollectiontable.js';

export default class NSLViewDOMCollection extends NSLViewDOMCollectionAbstract {

  constructor( parameters ) {
    super( parameters );
  }

  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    return new NSLViewDOMCollection( parameters );
  }

  get absolute() {
    return new NSLViewDOMCollectionAbsolute();
  }

  get table() {
    return new NSLViewDOMCollectionTable();
  }

}
