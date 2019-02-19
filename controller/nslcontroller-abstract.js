'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLAbstract from './../nsl-abstract.js';

import NSLControllerViewEventAction from './nslcontroller-vieweventaction.js';

/**
 * Class for supplying essential functions for the NSLController class.
 * @extends NSLAbstract
 */
export default class NSLControllerAbstract extends NSLAbstract {
  /**
   * Function for creating an NSLControllerAbstract object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    controllers: Array of NSLController publishers to which this object subscribes. Optional.
   *    models:      Array of NSLModel publishers to which this object subscribes. Optional.
   *    views:       Array of NSLView publishers to which this object subscribes. Optional.
   */
  constructor( parameters ) {
    super( parameters );
    if ( typeof parameters !== 'undefined' ) {
      if ( typeof parameters.publisher !== 'undefined' ) {
        for ( let i = 0; i < parameters.publisher.length; i++ ) {
          parameters.publisher[i].addSubscriber( this );
          if ( parameters.publisher[i].constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
            this['$pubs']['$views'][parameters.publisher[i].id] = new NSLControllerViewEventAction( parameters.publisher[i] );
          }
        }
      }
    }
  }

  /**
   * Function for adding a view, event, and action (or sets of any of those) to this controller.
   *    Accepts as a parameter a view or views to which to subscribe, events for which to listen, and actions to take for those
   *    events.
   *
   * @param {Object} parameters - Parameters for adding to the view. Properties:
   *    view:   view or array of views to add as publishers for this object. Optional.
   *            If missing, all, all view publishers are associated with the events and actions.
   *    event:  event or array of events for which to listen from the publisher. Optional.
   *            If missing, no events or actions are associated with the publisher or performed by the controller.
   *    action: action or array of actions to take in response to events from the publisher. Optional.
   *            If missing, no actions are taken in response to events from the publisher.
   */
  addView( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    if ( typeof parameters.view !== 'undefined' ) {
      if ( Array.isArray( parameters.view ) ) {
        for ( let i = 0; i < parameters.view.length; i++ ) {
          this.addViewView( parameters.view[i] );
        }
      } else {
        this.addViewView( parameters.view );
      }
    }
    if ( typeof parameters.event !== 'undefined' ) {
      if ( Array.isArray( parameters.event ) ) {
        if ( Array.isArray( parameters.view ) ) {
          for ( let i = 0; i < parameters.event.length; i++ ) {
            for ( let j = 0; j < parameters.view.length; j++ ) {
              this.addViewViewEvent( parameters.view[j], parameters.event[i] );
              if ( Array.isArray( parameters.action ) ) {
                for ( let k = 0; k < parameters.action.length; k++ ) {
                  this.addViewViewEventAction( parameters.view[j], parameters.event[i], parameters.action[k] );
                }
              } else {
                this.addViewViewEventAction( parameters.view[j], parameters.event[i], parameters.action );
              }
            }
          }
        } else if ( typeof parameters.view === 'undefined' ) {
          for ( let i = 0; i < parameters.event.length; i++ ) {
            const env = this;
            Object.getOwnPropertyNames( env['$pubs']['$views'] ).forEach( function( e ) {
              env.addViewViewEvent( parameters.view[e].publisher, parameters.event[i] );
              if ( Array.isArray( parameters.action ) ) {
                for ( let k = 0; k < parameters.action.length; k++ ) {
                  env.addViewViewEventAction( parameters.view[e].publisher, parameters.event[i], parameters.action[k] );
                }
              } else {
                env.addViewViewEventAction( parameters.view[e].publisher, parameters.event[i], parameters.action );
              }
            });
          }
        } else if ( parameters.view.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
          this.addViewViewEvent( parameters.view, parameters.event[i] );
          if ( Array.isArray( parameters.action ) ) {
            for ( let k = 0; j < parameters.action.length; k++ ) {
              this.addViewViewEventAction( parameters.view, parameters.event[i], parameters.action[k] );
            }
          } else {
            this.addViewViewEventAction( parameters.view, parameters.event[i], parameters.action );
          }
        }
      } else {
        if ( Array.isArray( parameters.view ) ) {
          for ( let j = 0; j < parameters.view.length; j++ ) {
            this.addViewViewEvent( parameters.view[j], parameters.event );
            if ( Array.isArray( parameters.action ) ) {
              for ( let k = 0; k < parameters.action.length; k++ ) {
                this.addViewViewEventAction( parameters.view[j], parameters.event, parameters.action[k] );
              }
            } else {
              this.addViewViewEventAction( parameters.view[j], parameters.event, parameters.action );
            }
          }
        } else if ( typeof parameters.view === 'undefined' ) {
          const env = this;
          Object.getOwnPropertyNames( env['$pubs']['$views'] ).forEach( function( e ) {
            env.addViewViewEvent( env['$pubs']['$views'][e].publisher, parameters.event );
            if ( Array.isArray( parameters.action ) ) {
              for ( let k = 0; k < parameters.action.length; k++ ) {
                env.addViewViewEventAction( env['$pubs']['$views'][e].publisher, parameters.event, parameters.action[k] );
              }
            } else {
              env.addViewViewEventAction( env['$pubs']['$views'][e].publisher, parameters.event, parameters.action );
            }
          });
        } else if ( parameters.view.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
          this.addViewViewEvent( parameters.view, parameters.event );
          if ( Array.isArray( parameters.action ) ) {
            for ( let k = 0; j < parameters.action.length; k++ ) {
              this.addViewViewEventAction( parameters.view, parameters.event, parameters.action[k] );
            }
          } else {
            this.addViewViewEventAction( parameters.view, parameters.event, parameters.action );
          }
        }
      }
    }
  }

  /**
   * Function for adding a view publisher to this controller. Helper function for addView().
   *
   * @param {Object} view - The view to add to this controller.
   */
  addViewView( view ) {
    if ( view.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
      if ( typeof this['$pubs']['$views'][view.id] === 'undefined' ) {
        view.addSubscriber( this );
        this['$pubs']['$views'][view.id].events = {};
      }
    }
  }

  /**
   * Function for adding an event to this controller's view publisher. Helper function for addView().
   *
   * @param {Object} view - The view to associate with this event.
   * @param {Object} event - The event to associate with this view.
   */
  addViewViewEvent( view, event ) {
    this['$pubs']['$views'][view.id].events[event] = {};
    view.addEventListener( event );
  }

  /**
   * Function for adding an action to this event to this controller's view publisher. Helper function for addView().
   *
   * @param {Object} view - The view to associate with this action.
   * @param {Object} event - The event to associate with this action.
   * @param {Object} action - The action to associate with this view's event.
   *
   */
  addViewViewEventAction( view, event, action ) {
    this['$pubs']['$views'][view.id].events[event][action] = action;
  }

  /**
   * Function for removing a view, event, and action (or sets of any of those) to this controller.
   *    Accepts as a parameter a view or views to which to remove subscribtion, events for which
   *    to stop listening, and actions to stop taking for those events.
   *
   * @param {Object} parameters - Parameters for removing from the view. Properties:
   *    view:   view or array of views to remove as publishers from this object. Optional.
   *            If missing, all, all view publishers are removed.
   *    event:  event or array of events for which to listen from the publisher. Optional.
   *            If missing, no events or actions are associated with the publisher or performed by the controller.
   *    action: action or array of actions to take in response to events from the publisher. Optional.
   *            If missing, no actions are taken in response to events from the publisher.
   */
  removeView( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    if ( Array.isArray( parameters.view ) ) {
      for ( let i = 0; i < parameters.view.length; i++ ) {
        if ( Array.isArray( parameters.event ) ) {
          for ( let j = 0; j < parameters.event.length; j++ ) {
            if ( Array.isArray( parameters.action ) ) {
              for ( let k = 0; k < parameters.action.length; k++ ) {
                delete this['$pubs']['$views'][parameters.view[i].id].events[parameters.event[j]][parameters.action[k]];
              }
            } else if ( typeof action !== 'undefined' ) {
              delete this['$pubs']['$views'][parameters.view[i].id].events[parameters.event[j]][parameters.action];
            } else {
              this['$pubs']['$views'][parameters.views[i].id].events[parameters.event[j]] = {};
            }
          }
        } else if ( typeof event !== 'undefined' ) {
          if ( Array.isArray( parameters.action ) ) {
            for ( let k = 0; k < parameters.action.length; k++ ) {
              delete this['$pubs']['$views'][parameters.view[i].id].events[parameters.event][parameters.action[k]];
            }
          } else if ( typeof action !== 'undefined' ) {
            delete this['$pubs']['$views'][parameters.view[i].id].events[parameters.event][parameters.action];
          } else {
            this['$pubs']['$views'][parameters.view[i].id].events[parameters.event] = {};
          }
        } else {
          this['$pubs']['$views'][parameters.view[i].id].events = {};
          parameters.view[i].removeSubscriber( this );
        }
      }
    } else if ( parameters.view.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
      if ( Array.isArray( parameters.event ) ) {
        for ( let j = 0; j < parameters.event.length; j++ ) {
          if ( Array.isArray( parameters.action ) ) {
            for ( let k = 0; k < parameters.action.length; k++ ) {
              delete this['$pubs']['$views'][parameters.view.id].events[parameters.event[j]][parameters.action[k]];
            }
          } else if ( typeof action !== 'undefined' ) {
            delete this['$pubs']['$views'][parameters.view.id].events[parameters.event[j]][parameters.action];
          } else {
            this['$pubs']['$views'][parameters.views.id].events[parameters.event[j]] = {};
          }
        }
      } else if ( typeof event !== 'undefined' ) {
        if ( Array.isArray( parameters.action ) ) {
          for ( let k = 0; k < parameters.action.length; k++ ) {
            delete this['$pubs']['$views'][parameters.view.id].events[parameters.event][parameters.action[k]];
          }
        } else if ( typeof action !== 'undefined' ) {
          delete this['$pubs']['$views'][parameters.view.id].events[parameters.event][parameters.action];
        } else {
          this['$pubs']['$views'][parameters.view.id].events[parameters.event] = {};
        }
      } else {
        this['$pubs']['$views'][parameters.view.id].events = {};
        parameters.view.removeSubscriber( this );
      }
    } else if ( typeof parameters.view === 'undefined' ) {
      const env = this;
      Object.getOwnPropertyNames( env['$pubs']['$views'] ).forEach( function( e ) {
        if ( Array.isArray( parameters.event ) ) {
          for ( let j = 0; j < parameters.event.length; j++ ) {
            if ( Array.isArray( parameters.action ) ) {
              for ( let k = 0; k < parameters.action.length; k++ ) {
                delete env['$pubs']['$views'][e].events[parameters.event[j]][parameters.action[k]];
              }
            } else if ( typeof action !== 'undefined' ) {
              delete env['$pubs']['$views'][e].events[parameters.event[j]][parameters.action];
            } else {
              env['$pubs']['$views'][e].events[parameters.event[j]] = {};
            }
          }
        } else if ( typeof event !== 'undefined' ) {
          if ( Array.isArray( parameters.action ) ) {
            for ( let k = 0; k < parameters.action.length; k++ ) {
              delete env['$pubs']['$views'][e].events[parameters.event][parameters.action[k]];
            }
          } else if ( typeof action !== 'undefined' ) {
            delete env['$pubs']['$views'][e].events[parameters.event][parameters.action];
          } else {
            env['$pubs']['$views'][e].events[parameters.event] = {};
          }
        } else {
          env['$pubs']['$views'][e].removeSubscriber( env );
        }
      });
    }
  }

  /**
   * Function for removing a view publisher from this controller. Helper function for removeView().
   *
   * @param {Object} view - The view to remove from this controller.
   */
  removeViewView( view ) {
    delete this['$pubs']['$views'][view.id];
  }

  /**
   * Function for removing an event from this controller's view publisher. Helper function for removeView().
   *
   * @param {Object} view - The view to no longer associate with this event.
   * @param {Object} event - The event to no longer associate with this view.
   */
  removeViewEvent( view, event ) {
    delete this['$pubs']['$views'][view.id][event];
  }

  /**
   * Function for removing an action from this event to this controller's view publisher. Helper function for removeView().
   *
   * @param {Object} view - The view to no longer associate with this action.
   * @param {Object} event - The event to no longer associate with this action.
   * @param {Object} action - The action to no longer associate with this view's event.
   *
   */
  removeViewEventAction( view, event, action ) {
    delete this['$pubs']['$views'][view.id][event][action];
  }

  /**
   * Function for responding to view (or controller, or model) event notifications.
   *    Accepts as a parameter (at a minimum) the calling object and event.
   *
   * @param {Object} parameters - Parameters for adding to the view. Properties:
   *    publisher: publisher (usually a view) notifying the controller of an event.
   *    event:     event that has triggered the notification.
   */
  onNotification( parameters ) {
    const env = this;
    if ( parameters.publisher.constructor.name.lastIndexOf( 'NSLController', 0 ) === 0 ) {
      Object.getOwnPropertyNames( env['$pubs']['$controllers'][parameters.publisher.id].events[parameters.event] ).forEach( function( e ) {
        env['$pubs']['$controllers'][parameters.publisher.id].events[parameters.event][e]( parameters );
      });
    } else if ( parameters.publisher.constructor.name.lastIndexOf( 'NSLModel', 0 ) === 0 ) {
      Object.getOwnPropertyNames( env['$pubs']['$models'][parameters.publisher.id].events[parameters.event] ).forEach( function( e ) {
        env['$pubs']['$models'][parameters.publisher.id].events[parameters.event][e]( parameters );
      });
    } else if ( parameters.publisher.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
      Object.getOwnPropertyNames( env['$pubs']['$views'][parameters.publisher.id].events[parameters.event] ).forEach( function( e ) {
        env['$pubs']['$views'][parameters.publisher.id].events[parameters.event][e]( parameters );
      });
    }
  }
}
