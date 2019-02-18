'use strict';

import NSLModelDOMAbstract from './nslmodeldom-abstract.js';
/**
 * Class for NSLModelDOM objects. NSLModelDOMs are models for NSLControllerDOMs in a Model-View-Controller framework.
 *    They receive notifications from NSLControllerDOMs and update NSLViewDOMs.
 * @extends NSLModelDOMAbstract
 */
export default class NSLModelDOM extends NSLModelDOMAbstract {
  /**
   * Function for creating an NSLModelDOM object. Should not be called directly. Instead, use the new() function.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   */
  constructor( parameters ) {
    super( parameters );
  }

  /**
   * Function for creating a new NSLModelDOM object. Preferred method for creating a new NSLModelDOM object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   * @return {NSLModelDOM} Created NSLModelDOM object.
   */
  new( parameters ) {
    return new NSLModelDOM( parameters );
  }
}
