'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMCollectionAbstract from './../nslviewdomcollection-abstract.js';
import NSLViewDOMElement from './../../element/nslviewdomelement.js';

/**
 * Class for creating NSLViewCollectionAbstract objects. This is a pseudo-
 * abstract class.
 * @extends NSLViewDOMAbstract
 */
export default class NSLViewDOMCollectionSelectAbstract extends NSLViewDOMCollectionAbstract {
  /**
   * Function for creating an NSLViewDOMCollectionAbstract object.
   *
   * @param {Object} params - Parameters the function. Properties:
   *    appendee:   DOM or NSLViewDOM object to which to append this object.
   *    publisher:  Publisher or array of pubs to which this object subscribes.
   *    subscriber: Subscriber or array of subs to which this object publishes.
   */
  constructor( params ) {
    super( params );
    if ( typeof params !== 'undefined' ) {
      if ( typeof params.appendee !== 'undefined' ) {
        const factory = new NSLViewDOMElement();
        this['$container'] = factory.new({
          'appendee': params.appendee,
          'tagName': 'div',
          'classes': ['nsl-collection-container'],
        });
      }
    }
  }

}
