'use strict';

/**
 * Class for supplying NSLControllerViewAction objects to NSLController objects.
 *    NSLControllerViewAction objects allow actions to associated with specific
 *    views and events inside an NSLController.
 */
export default class NSLControllerViewEventAction {
  /**
   * Function for creating an NSLControllerViewAction object.
   *
   * @param {Object} view - NSLView for events and actions to be associated with.
   */
  constructor( view ) {
    this.view = ( view.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) ? view : {};
    this.events = {};
  }
}
