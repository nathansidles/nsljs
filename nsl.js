'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLAbstract from './nsl-abstract.js';

import NSLController from './controller/nslcontroller.js';
import NSLModel from './model/nslmodel.js';
import NSLView from './view/nslview.js';

/**
 * Class for NSL objects. NSL objects are the root object of the NSL experience.
 *    They define the basic publish and subscribe behavior used by NSLModel, NSLView, and NSLController.
 *    They allow users convenient access to the rest of the NSL - its models, views, controllers, and general helpers.
 *
 */
export default class NSL extends NSLAbstract {
  /**
   * Function for creating an NSL object. Should not be called directly. Instead, use the new() function.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   */
  constructor( parameters ) {
    super( parameters );
  }

  /**
   * Function for creating a new NSL object. Preferred method for creating a new NSL object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   * @return {NSL} Created NSLModel object.
   */
  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    super.new();
    return new NSL( parameters );
  }

  /**
   * Function for accessing "controller" child objects of the NSL class. Not intended for use as a constructor.
   *
   * @return {NSLController} Created NSLController object.
   */
  static get controller() {
    return new NSLController();
  }

  /**
   * Function for accessing "controller" child objects of the NSL class. Not intended for use as a constructor.
   *
   * @return {NSLController} Created NSLController object.
   */
  static get helper() {
    return new NSLHelper();
  }

  /**
   * Function for accessing "model" child objects of the NSL class. Not intended for use as a constructor.
   *
   * @return {NSLModel} Created NSLModel object.
   */
  static get model() {
    return new NSLModel();
  }

  /**
   * Function for accessing "view" child objects of the NSL class. Not intended for use as a constructor.
   *
   * @return {NSLView} Created NSLView object.
   */
  static get view() {
    return new NSLView();
  }
}
