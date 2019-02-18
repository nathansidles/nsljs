'use strict';

import NSLModelAbstract from './../nslmodel-abstract.js';

/**
 * Class for supplying essential functions for the NSLModelDOM class.
 * @extends NSLModelAbstract
 */
export default class NSLModelDOMAbstract extends NSLModelAbstract {
  /**
   * Function for creating an NSLModelDOMAbstract object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   */
  constructor( parameters ) {
    super();
  }
}
