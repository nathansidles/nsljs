'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

/**
 * Class for supplying essential functions for the NSL class. This is a pseudo-abstract class. It implements the Observer pattern.
 *    It is the root class for all classes in the NSL except the NSLHelper classes.
 */
export default class NSLAbstract {
  /**
   * Function for creating an NSLModelAbstract object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    publishers:  Array of publishers to which this object subscribes.
   *    subscribers: Array of subscribers to which this object subscribes.
   */
  constructor( parameters ) {
    Object.defineProperty( this, '$id', {
      value: NSLHelper.randomString(),
    });
    this['$pubs'] = {};
    this['$pubs']['$controllers'] = {};
    this['$pubs']['$models'] = {};
    this['$pubs']['$views'] = {};
    this['$subs'] = {};
    this['$subs']['$controllers'] = {};
    this['$subs']['$models'] = {};
    this['$subs']['$views'] = {};
    parameters = NSLHelper.parametersExtractor( parameters );
    if ( Array.isArray( parameters.publisher ) ) {
      for ( let i = 0; i < parameters.publisher.length; i++ ) {
        this.addPublisher( parameters.publisher[i] );
      }
    } else if ( typeof parameters.publisher !== 'undefined' ) {
      this.addPublisher( parameters.publisher );
    }
    if ( Array.isArray( parameters.subscriber ) ) {
      this.addSubscriber( parameters.subscriber[i] );
    } else if ( typeof parameters.subscriber !== 'undefined' ) {
      this.addSubscriber( parameters.subscriber );
    }
  }

  static new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    if ( typeof parameters.caller !== 'undefined' && parameters.caller.constructor.name.lastIndexOf( 'NSL', 0 ) === 0 ) {
      Object.getOwnPropertyNames( parameters.caller ).forEach( function( e ) {
        if ( e !== '$node' && e !== '$listeners' && e !== '$subs' && e !== '$pubs' && e !== '$id' && e !== 'content' ) {
          parameters.new[e] = parameters.caller[e];
        }
      });
      Object.getOwnPropertyNames( parameters.caller['$pubs'] ).forEach( function( e ) {
        Object.getOwnPropertyNames( parameters.caller['$pubs'][e] ).forEach( function( f ) {
          parameters.caller['$pubs'][e][f].publisher.addSubscriber( parameters.new );
        });
      });
      Object.getOwnPropertyNames( parameters.caller['$subs'] ).forEach( function( e ) {
        Object.getOwnPropertyNames( parameters.caller['$subs'][e] ).forEach( function( f ) {
          parameters.caller['$subs'][e][f].subscriber.addPublisher( parameters.new );
        });
      });
    }
  }

  instanceNew( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    if ( typeof parameters.caller !== 'undefined' && parameters.caller.constructor.name.lastIndexOf( 'NSL', 0 ) === 0 ) {
      Object.getOwnPropertyNames( parameters.caller ).forEach( function( e ) {
        if ( e !== '$node' && e !== '$listeners' && e !== '$subs' && e !== '$pubs' && e !== '$id' && e !== 'content' ) {
          parameters.new[e] = parameters.caller[e];
        }
      });
      Object.getOwnPropertyNames( parameters.caller['$pubs'] ).forEach( function( e ) {
        Object.getOwnPropertyNames( parameters.caller['$pubs'][e] ).forEach( function( f ) {
          parameters.caller['$pubs'][e][f].publisher.addSubscriber( parameters.new );
        });
      });
      Object.getOwnPropertyNames( parameters.caller['$subs'] ).forEach( function( e ) {
        Object.getOwnPropertyNames( parameters.caller['$subs'][e] ).forEach( function( f ) {
          parameters.caller['$subs'][e][f].subscriber.addPublisher( parameters.new );
        });
      });
    }
  }

  /**
   * Function for getting the id value of an NSL object.
   *
   * @return {String} - The string value of an NSL object.
   */
  get id() {
    return this['$id'];
  }

  /**
   * Function for adding an NSL object to the current object as a subscriber, thus making the current object a publisher.
   *    Also adds the current object to the NSL object as a publisher.
   *
   * @param {NSL} subscriber - NSL object to add to the current object as a subscriber.
   */
  addSubscriber( subscriber ) {
    if ( typeof subscriber !== 'undefined' ) {
      if ( typeof subscriber.onNotification === 'function' ) {
        this.addSubscriberBasic( subscriber );
        subscriber.addPublisherBasic( this );
      }
    }
  }

  /**
   * Helper function for addSubscriber(). Adds an NSL object to the current object as a subscriber in the appropriate bucket.
   *
   * @param {NSL} subscriber - NSL object to add to the current object as a subscriber.
   */
  addSubscriberBasic( subscriber ) {
    if ( subscriber.constructor.name.lastIndexOf( 'NSLController', 0 ) === 0 ) {
      this['$subs']['$controllers'][subscriber.id] = {};
      this['$subs']['$controllers'][subscriber.id].subscriber = subscriber;
    } else if ( subscriber.constructor.name.lastIndexOf( 'NSLModel', 0 ) === 0 ) {
      this['$subs']['$models'][subscriber.id] = {};
      this['$subs']['$models'][subscriber.id].subscriber = subscriber;
    } else if ( subscriber.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
      this['$subs']['$views'][subscriber.id] = {};
      this['$subs']['$views'][subscriber.id].subscriber = subscriber;
    }
  }

  /**
   * Function for removing an NSL object from the current object as a subscriber.
   *    Also removes the current object from the NSL object as a publisher.
   *
   * @param {NSL} subscriber - NSL object to remove from the current object as a subscriber.
   */
  removeSubscriber( subscriber ) {
    const env = this;
    Object.getOwnPropertyNames( env['$subs'] ).forEach( function( e ) {
      delete env['$subs'][e][subscriber.id];
    });
    subscriber.removePublisher( this );
  }

  /**
   * Function for removing all subscribers from the current object.
   *    Does not remove the current object from the NSL object as a publisher.
   */
  removeSubscribers() {
    this['$subs']['$controllers'] = {};
    this['$subs']['$models'] = {};
    this['$subs']['$views'] = {};
  }

  /**
   * Function for notifying all subscribers of the current object.
   */
  notifySubscribers() {
    const env = this;
    Object.getOwnPropertyNames( env['$subs'] ).forEach( function( e ) {
      Object.getOwnPropertyNames( env['$subs'][e] ).forEach( function( f ) {
        env['$subs'][e][f].subscriber.onNotification( env );
      });
    });
  }

  /**
   * Function for adding an NSL object to the current object as a publisher, thus making the current object a subscriber.
   *    Also adds the current object to the NSL object as a subscriber.
   *
   * @param {NSL} publisher - NSL object to add to the current object as a publisher.
   * @param {Object} parameters - Parameters to associate with this object as a publisher for this subscirber.
   *    An example parameter would be an 'event' object for an NSLView publisher. This 'event' object would have 'action'
   *    objects to perform when the subscribing object is notified by the publisher.
   */
  addPublisher( publisher, parameters ) {
    if ( typeof publisher !== 'undefined' ) {
      if ( typeof publisher.notifySubscribers === 'function' ) {
        this.addPublisherBasic( publisher, parameters );
        publisher.addSubscriberBasic( this );
      }
    }
  }

  /**
   * Helper function for addPublisher(). Adds an NSL object to the current object as a publisher in the appropriate bucket,
   *    along with any additional parameters.
   *
   * @param {NSL} publisher - NSL object to add to the current object as a publisher.
   * @param {Object} parameters - Parameters to associate with this object as a publisher for this subscirber.
   *    An example parameter would be an 'event' object for an NSLView publisher. This 'event' object would have 'action'
   *    objects to perform when the subscribing object is notified by the publisher.
   */
  addPublisherBasic( publisher, parameters ) {
    const env = this;
    if ( publisher.constructor.name.lastIndexOf( 'NSLController', 0 ) === 0 ) {
      env['$pubs']['$controllers'][publisher.id] = {};
      env['$pubs']['$controllers'][publisher.id].publisher = publisher;
      if ( typeof parameters !== 'undefined' ) {
        Object.getOwnPropertyNames( parameters ).forEach( function( e ) {
          env['$pubs']['$controllers'][publisher.id][e] = parameters[e];
        });
      }
    } else if ( publisher.constructor.name.lastIndexOf( 'NSLModel', 0 ) === 0 ) {
      env['$pubs']['$models'][publisher.id] = {};
      env['$pubs']['$models'][publisher.id].publisher = publisher;
      if ( typeof parameters !== 'undefined' ) {
        Object.getOwnPropertyNames( parameters ).forEach( function( e ) {
          env['$pubs']['$models'][publisher.id][e] = parameters[e];
        });
      }
    } else if ( publisher.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
      env['$pubs']['$views'][publisher.id] = {};
      env['$pubs']['$views'][publisher.id].publisher = publisher;
      if ( typeof parameters !== 'undefined' ) {
        Object.getOwnPropertyNames( parameters ).forEach( function( e ) {
          env['$pubs']['$views'][publisher.id][e] = parameters[e];
        });
      }
    }
  }

  /**
   * Function for removing an NSL object from the current object as a publisher.
   *    Also removes the current object from the NSL object as a subscriber.
   *
   * @param {NSL} publisher - NSL object to remove from the current object as a subscriber.
   */
  removePublisher( publisher ) {
    const env = this;
    Object.getOwnPropertyNames( env['$pubs'] ).forEach( function( e ) {
      delete env['$pubs'][e][publisher.id];
    });
  }

  /**
   * Stub function for actions to perform when this object is notified by one of its publishers.
   *    To be implemented by the NSL child classes in their capacity as subscribers.
   *
   * @param {Object} parameters - Parameters for notifying the object.
   */
  onNotification( parameters ) {}
}
