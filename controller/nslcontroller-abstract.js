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
   * Create an NSLControllerAbstract object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    controllers: Array of NSLController publishers to which this object subscribes. Optional.
   *    models:      Array of NSLModel publishers to which this object subscribes. Optional.
   *    views:       Array of NSLView publishers to which this object subscribes. Optional.
   */
  constructor( parameters ) {
    super( parameters );
    if ( typeof parameters !== 'undefined' ) {
      if ( typeof parameters.controllers !== 'undefined' ) {
        for ( let i = 0; i < parameters.controllers.length; i++ ) {
          parameters.models[i].addSubscriber( env );
          this['$views'][parameters.controllers[i].id] = new NSLControllerViewEventAction( parameters.views[i] );
        }
      }
      if ( typeof parameters.models !== 'undefined' ) {
        for ( let i = 0; i < parameters.models.length; i++ ) {
          parameters.models[i].addSubscriber( env );
          this['$views'][parameters.models[i].id] = new NSLControllerViewEventAction( parameters.views[i] );
        }
      }
      if ( typeof parameters.views !== 'undefined' ) {
        for ( let i = 0; i < parameters.views.length; i++ ) {
          parameters.views[i].addSubscriber( env );
          this['$views'][parameters.views[i].id] = new NSLControllerViewEventAction( parameters.views[i] );
        }
      }
    }
  }

  /**
   * Function for creating adding a view or set of views, events, and actions to this controller,
   *    Accepts as a parameter a view to which to subscribe, events for which to listen, and actions to take for those
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

  addViewView( view ) {
    if ( view.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
      if ( typeof this['$pubs']['$views'][view.id] === 'undefined' ) {
        view.addSubscriber( this );
        this['$pubs']['$views'][view.id].events = {};
      }
    }
  }

  addViewViewEvent( view, event ) {
    this['$pubs']['$views'][view.id].events[event] = {};
    view.addEventListener( event );
  }

  addViewViewEventAction( view, event, action ) {
    this['$pubs']['$views'][view.id].events[event][action] = action;
  }

  removeView( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    if ( Array.isArray( parameters.view ) ) {
      for ( let i = 0; i < parameters.view.length; i++ ) {
        if ( Array.isArray( parameters.event ) ) {
          for ( let j = 0; j < parameters.event.length; j++ ) {
            if ( Array.isArray( parameters.action ) ) {
              for ( let k = 0; k < parameters.action.length; k++ ) {

              }
            } else if ( typeof action !== 'undefined' ) {

            } else {

            }
          }
        } else if ( typeof event !== 'undefined' ) {
          if ( Array.isArray( parameters.action ) ) {
            for ( let k = 0; K < parameters.action.length; k++ ) {

            }
          } else if ( typeof action !== 'undefined' ) {

          } else {

          }
        } else {

        }
      }
    } else if ( parameters.view.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
      if ( Array.isArray( parameters.event ) ) {
        for ( let j = 0; j < parameters.event.length; j++ ) {
          if ( Array.isArray( parameters.action ) ) {
            for ( let k = 0; k < parameters.action.length; k++ ) {

            }
          } else if ( typeof action !== 'undefined' ) {

          } else {

          }
        }
      } else if ( typeof event !== 'undefined' ) {
        if ( Array.isArray( parameters.action ) ) {
          for ( let k = 0; K < parameters.action.length; k++ ) {

          }
        } else if ( typeof action !== 'undefined' ) {

        } else {

        }
      } else {

      }
    }
  }

  removeViewView( view ) {
    delete this['$pubs']['$views'][view.id];
  }

  removeViewEvent( view, event ) {
    delete this['$pubs']['$views'][view.id][event];
  }

  removeViewEventAction( view, event, action ) {
    delete this['$pubs']['$views'][view.id][event][action];
  }

  onNotification( parameters ) {
    const env = this;
    Object.getOwnPropertyNames( env['$pubs']['$views'][parameters.publisher.id].events[parameters.event] ).forEach( function( e ) {
      env['$pubs']['$views'][parameters.publisher.id].events[parameters.event][e]( parameters );
    });
  }
}
