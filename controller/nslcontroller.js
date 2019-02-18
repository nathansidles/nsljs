'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLControllerAbstract from './nslcontroller-abstract.js';

import NSLControllerDOM from './dom/nslcontrollerdom.js';

/**
 * Class for NSLController objects. NSLControllers are controllers in a Model-View-Controller framework.
 *    They receive notifications that events have occurred and pass that on to models so that those models
 *    can update the views to update themselves. Occasionally, controllers may order view updates
 *    directly.
 * @extends NSLControllerAbstract
 */
export default class NSLController extends NSLControllerAbstract {
  /**
   * Function for creating an NSLController object. Should not be called directly. Instead, use the new() function.
   *
   * @param {Object} parameters - Parameters for creating the object.
   *    controllers: Array of NSLController publishers to which this object subscribes. Optional.
   *    models:      Array of NSLModel publishers to which this object subscribes. Optional.
   *    views:       Array of NSLView publishers to which this object subscribes. Optional.
   */
  constructor( parameters ) {
    super( parameters );
  }

  /**
   * Function for creating a new NSLController object. Preferred method for creating a new NSLController object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    controllers: Array of NSLController publishers to which this object subscribes. Optional.
   *    models:      Array of NSLModel publishers to which this object subscribes. Optional.
   *    views:       Array of NSLView publishers to which this object subscribes. Optional.
   * @return {NSLController} Created NSLController object.
   */
  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    return new NSLController( parameters );
  }

  /**
   * Function for accessing "dom" child objects of the NSLController class. Not intended for use as a constructor.
   *
   * @return {NSLControllerDOM} Created NSLControllerDOM object.
   */
  get dom() {
    return new NSLControllerDOM();
  }
}
