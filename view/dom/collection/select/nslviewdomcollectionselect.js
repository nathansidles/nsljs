'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMCollectionSelectAbstract from './nslviewdomcollectionselect-abstract.js';


export default class NSLViewDOMCollectionSelect extends NSLViewDOMCollectionSelectAbstract {

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
    return new NSLViewDOMSCollectionSelect( parameters );
  }

}
