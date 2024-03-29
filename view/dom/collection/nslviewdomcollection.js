'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMCollectionAbstract from './nslviewdomcollection-abstract.js';

import NSLViewDOMCollectionTable from './table/nslviewdomcollectiontable.js';

import NSLViewDOMCollectionSelect from './select/nslviewdomcollectionselect.js';

export default class NSLViewDOMCollection extends NSLViewDOMCollectionAbstract {

  /**
   * Function for creating an NSLViewDOMCollection object.
   *
   * @param {Object} params - Parameters the function Properties:
   *    appendee:   DOM or NSLViewDOM object to which to append this object.
   *    publisher:  Publisher or array of pubs to which this object subscribes.
   *    subscriber: Subscriber or array of subs to which this object publishes.
   */
  constructor( parameters ) {
    super( parameters );
  }

  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    return new NSLViewDOMCollection( parameters );
  }

  get select() {
    return new NSLViewDOMCollectionSelect();
  }

  get table() {
    return new NSLViewDOMCollectionTable();
  }

}
