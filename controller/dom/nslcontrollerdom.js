'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLControllerDOMAbstract from './nslcontrollerdom-abstract.js';
/**
 * Class for NSLControllerDOM objects. NSLControllerDOMs are controllers for NSLControllerViews in a Model-View-Controller framework.
 *    They receive notifications from NSLViewDOMs and notify NSLModelDOMs.
 * @extends NSLControllerDOMAbstract
 */
export default class NSLControllerDOM extends NSLControllerDOMAbstract {
  /**
   * Function for creating an NSLControllerDOM object. Should not be called directly. Instead, use the new() function.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   */
  constructor( parameters ) {
    super( parameters );
  }

  /**
   * Function for creating a new NSLControllerDOM object. Preferred method for creating a new NSLControllerDOM object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   * @return {NSLControllerDOM} Created NSLControllerDOM object.
   */
  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    return new NSLControllerDOM( parameters );
  }
}
