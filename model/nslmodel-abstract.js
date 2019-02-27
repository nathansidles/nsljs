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
   *    method:           Default HTTP method of the object's request. Optional.
   *    scheme:           Default schema of the requested resource. Optional.
   *    host:             Default hostname of the requested resource. To be concatenated with scheme. Optional.
   *    basePath:         Default shared base path of the requested resource. To be concatenated with host. Optional.
   *    path:             Default individual resource path of the request. To be concatenated with basePath. Optional.
   *    collectionFormat: Default type of concatenation for multiple parameter values. Optional.
   *    parameters:       Default array of parameter/value pairs for the request. Optional.
   *    callback:         Default callback function of the request. Accepts data as an input. Optional.
   */
  constructor( parameters ) {
    super( parameters );
    if ( typeof parameters !== 'undefined' ) {
      this['$data'] = parameters.data;
      this['$protocol'] = ( typeof parameters.protocol === 'string' ) ? parameters.protocol : '';
      this['$method'] = ( typeof parameters.method === 'string' ) ? parameters.method : '';
      this['$scheme'] = ( typeof parameters.scheme === 'string' ) ? parameters.scheme : '';
      this['$host'] = ( typeof parameters.host === 'string' ) ? parameters.host : '';
      this['$basePath'] = ( typeof parameters.basePath === 'string' ) ? parameters.basePath : '';
      this['$path'] = ( typeof parameters.path === 'string' ) ? parameters.path : '';
      this['$collectionFormat'] = ( typeof parameters.collectionFormat === 'string' ) ? parameters.collectionFormat : '';
      this['$parameters'] = ( Array.isArray( parameters.parameters ) ) ? parameters.parameters : '';
      this['$callback'] = ( typeof parameters.callback === 'function' ) ? parameters.callback : '';
    }
  }

  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    super.instanceNew( parameters );
  }

  /**
   * Function for getting the model's data.
   *
   * @param {Object} parameters - Parameters for getting the object's data.
   *
   * @return {Object} - Data from this class.
   */
  getData( parameters ) {
    return this['$data'];
  }

  /**
   * Function for setting the model's data
   *
   * @param {Object} parameters - Parameters for setting the object's data.
   */
  setData( parameters ) {
    this['$data'] = parameters;
  }

  ajax( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    parameters.caller = this;
    parameters.protocol = ( typeof parameters.protocol === 'string' ) ? parameters.protocol : this['$protocol'];
    parameters.method = ( typeof parameters.method === 'string' ) ? parameters.method : this['$method'];
    parameters.scheme = ( typeof parameters.scheme === 'string' ) ? parameters.scheme : this['$scheme'];
    parameters.host = ( typeof parameters.host === 'string' ) ? parameters.host : this['$host'];
    parameters.basePath = ( typeof parameters.basePath === 'string' ) ? parameters.basePath : this['$basePath'];
    parameters.path = ( typeof parameters.path === 'string' ) ? parameters.path : this['$path'];
    parameters.collectionFormat = ( typeof parameters.collectionFormat === 'string' ) ? parameters.collectionFormat : this['$collectionFormat'];
    parameters.parameters = ( Array.isArray( parameters.parameters ) ) ? parameters.parameters : this['$parameters'];
    parameters.callback = ( typeof parameters.callback === 'function' ) ? parameters.callback : this['$callback'];
    return NSLHelper.ajax.request( parameters );
  }

  websocket( parameters ) {

  }

  sse( parameters ) {

  }

  getResponse( parameters ) {
    this.onNotification( parameters );
  }
}
