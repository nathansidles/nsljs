'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLModelAbstract from './nslmodel-abstract.js';

import NSLModelDOM from './dom/nslmodeldom.js';

/**
 * Class for NSLModel objects. NSLModels are models in a Model-View-Controller framework.
 *    They receive event notifications from NSLControllers, update their data and models accordingly, and then order
 *    NSLViews (or other NSLModels, or NSLControllers) to update themselves.
 */
export default class NSLModel extends NSLModelAbstract {
  /**
   * Function for creating an NSLModel object. Should not be called directly. Instead, use the new() function.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   */
  constructor( parameters ) {
    super( parameters );
  }

  /**
   * Function for creating a new NSLModel object. Preferred method for creating a new NSLModel object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   * @return {NSLModel} Created NSLModel object.
   */
  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    parameters.new = new NSLModel( parameters );
    super.new( parameters );
    return parameters.new;
  }

  /**
   * Function for accessing "dom" child objects of the NSLModel class. Not intended for use as a constructor.
   *
   * @return {NSLModelDOM} Created NSLModelDOM object.
   */
  get dom() {
    return new NSLModelDOM();
  }
}
