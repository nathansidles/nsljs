'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLAbstract from './../nsl-abstract.js';

import NSLControllerViewEventAction from './nslcontroller-vieweventaction.js';

/*
 * This class supplies essential functions for the NSLController class and the child classes of this helper class.
 */
export default class NSLControllerAbstract extends NSLAbstract {

  constructor( parameters ) {
    super( parameters );
    if ( typeof parameters !== 'undefined' ) {
      if ( typeof parameters.controllers !== 'undefined' ) {
        for ( var i = 0; i < parameters.controllers.length; i++ ) {
          parameters.models[i].addSubscriber( env );
          this['$views'][parameters.controllers[i].id] = new NSLControllerViewEventAction( parameters.views[i] );
        }
      }
      if ( typeof parameters.models !== 'undefined' ) {
        for ( var i = 0; i < parameters.models.length; i++ ) {
          parameters.models[i].addSubscriber( env );
          this['$views'][parameters.models[i].id] = new NSLControllerViewEventAction( parameters.views[i] );
        }
      }
      if ( typeof parameters.views !== 'undefined' ) {
        for ( var i = 0; i < parameters.views.length; i++ ) {
          parameters.views[i].addSubscriber( env );
          this['$views'][parameters.views[i].id] = new NSLControllerViewEventAction( parameters.views[i] );
        }
      }
    }
  }

  addView( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    if ( typeof parameters.view !== 'undefined' ) {
      if ( Array.isArray( parameters.view ) ) {
        for ( var i = 0; i < parameters.view.length; i++ ) {
          this.addViewView( parameters.view[i] );
        }
      } else {
        this.addViewView( parameters.view );
      }
    }
    if ( typeof parameters.event !== 'undefined' ) {
      if ( Array.isArray( parameters.event ) ) {
        if ( Array.isArray( parameters.view ) ) {
          for ( var i = 0; i < parameters.event.length; i++ ) {
            for ( var j = 0; j < parameters.view.length; j++ ) {
              this.addViewViewEvent( parameters.view[j], parameters.event[i] );
              if ( Array.isArray( parameters.action ) ) {
                for ( var k = 0; k < parameters.action.length; k++ ) {
                  this.addViewViewEventAction( parameters.view[j], parameters.event[i], parameters.action[k] );
                }
              } else {
                this.addViewViewEventAction( parameters.view[j], parameters.event[i], parameters.action );
              }
            }
          }
        } else {
          this.addViewViewEvent( parameters.view, parameters.event[i] );
          if ( Array.isArray( parameters.action ) ) {
            for ( var k = 0; j < parameters.action.length; k) {
              this.addViewViewEventAction( parameters.view, parameters.event[i], parameters.action[k] );
            }
          } else {
            this.addViewViewEventAction( parameters.view, parameters.event[i], parameters.action );
          }
        }
      } else {
        if ( Array.isArray( parameters.view ) ) {
          for ( var j = 0; j < parameters.view.length; j++ ) {
            this.addViewViewEvent( parameters.view[j], parameters.event );
            if ( Array.isArray( parameters.action ) ) {
              for ( var k = 0; k < parameters.action.length; k++ ) {
                this.addViewViewEventAction( parameters.view[j], parameters.event, parameters.action[k] );
              }
            } else {
              this.addViewViewEventAction( parameters.view[j], parameters.event, parameters.action );
            }
          }
        } else {
          this.addViewViewEvent( parameters.view, parameters.event );
          if ( Array.isArray( parameters.action ) ) {
            for ( var k = 0; j < parameters.action.length; k) {
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
      if ( typeof this['$publishers']['$views'][view.id] === 'undefined' ) {
        view.addSubscriber( this );
        this['$publishers']['$views'][view.id].events = {};
      }
    }
  }

  addViewViewEvent( view, event ) {
    this['$publishers']['$views'][view.id].events[event] = {};
    view.addEventListener( event );
  }

  addViewViewEventAction( view, event, action ) {
    this['$publishers']['$views'][view.id].events[event][action] = action;
  }

  removeView( parameters ) {
    parameters.removeSubscriber( this );
  }

  onNotification( parameters ) {
    var env = this;
    Object.getOwnPropertyNames( env['$publishers']['$views'][parameters.publisher.id].events[parameters.event] ).forEach( function( e ) {
      env['$publishers']['$views'][parameters.publisher.id].events[parameters.event][e]( parameters );
    });
  }

}
