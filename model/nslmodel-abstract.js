'use strict';

import NSLAbstract from './../nsl-abstract.js';

import NSLHelper from '/nsljs/helper/nslhelper.js';

/**
 * Class for supplying essential functions for the NSLModel class.
 * @extends NSLAbstract
 */
export default class NSLModelAbstract extends NSLAbstract {
  /**
   * Function for creating an NSLModelAbstract object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   */
  constructor( parameters ) {
    super( parameters );
    if ( typeof parameters !== 'undefined' ) {
      this.data = parameters.data;
    }
    this.protocol;
    this.method;
    this.scheme;
    this.host;
    this.basePath;
    this.path;
    this.collectionFormat;
    this.parameters;
    this.callback;
  }

  /**
   * Function for getting the model's data.
   *
   * @param {Object} parameters - Parameters for getting the object's data.
   *
   * @return {Object} - Data from this class.
   */
  getData( parameters ) {
    return this.data;
  }

  /**
   * Function for setting the model's data
   *
   * @param {Object} parameters - Parameters for setting the object's data.
   */
  setData( parameters ) {
    this.data = parameters;
  }

  ajax( parameters ) {
    return NSLHelper.ajax.request( parameters );
  }

  websocket( parameters ) {

  }

  sse( parameters ) {

  }
}
