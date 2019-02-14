'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

/*
 * This is a pseudo-abstract class. It implements the Observer pattern.
 * It is the root class for all classes in the NSL.
 */
export default class NSLAbstract {
  constructor( parameters ) {
    Object.defineProperty( this, '$id', {
      value: NSLHelper.randomString(),
    });
    this['$publishers'] = {};
    this['$publishers']['$controllers'] = {};
    this['$publishers']['$models'] = {};
    this['$publishers']['$views'] = {};
    this['$subscribers'] = {};
    this['$subscribers']['$controllers'] = {};
    this['$subscribers']['$models'] = {};
    this['$subscribers']['$views'] = {};
  }

  get id() {
    return this['$id'];
  }

  addSubscriber( subscriber ) {
    if ( typeof subscriber !== 'undefined' ) {
      if ( typeof subscriber.onNotification === 'function' ) {
        this.addSubscriberBasic( subscriber );
        subscriber.addPublisherBasic( this );
      }
    }
  }

  addSubscriberBasic( subscriber ) {
    if ( subscriber.constructor.name.lastIndexOf( 'NSLController', 0 ) === 0 ) {
      this['$subscribers']['$controllers'][subscriber.id] = {};
      this['$subscribers']['$controllers'][subscriber.id].subscriber = subscriber;
    } else if ( subscriber.constructor.name.lastIndexOf( 'NSLModel', 0 ) === 0 ) {
      this['$subscribers']['$models'][subscriber.id] = {};
      this['$subscribers']['$models'][subscriber.id].subscriber = subscriber;
    } else if ( subscriber.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
      this['$subscribers']['$views'][subscriber.id] = {};
      this['$subscribers']['$views'][subscriber.id].subscriber = subscriber;
    }
  }

  removeSubscriber( subscriber ) {
    var env = this;
    Object.getOwnPropertyNames( env['$subscribers'] ).forEach( function( e ) {
      delete env['$subscribers'][e][subscriber.id];
    });
    subscriber.removePublisher( this );
  }

  removeSubscribers() {
    this['$subscribers']['$controllers'] = {};
    this['$subscribers']['$models'] = {};
    this['$subscribers']['$views'] = {};
  }

  notifySubscribers() {
    var env = this;
    Object.getOwnPropertyNames( env['$subscribers'] ).forEach( function( e ) {
      Object.getOwnPropertyNames( env['$subscribers'][e] ).forEach( function( f ) {
        env['$subscribers'][e][f].onNotification( env );
      });
    });
  }

  addPublisher( publisher, parameters ) {
    if ( typeof publisher !== 'undefined' ) {
      if ( typeof publisher.notifySubscribers === 'function' ) {
        this.addPublisherBasic( publisher, parameters );
        publisher.addSubscriberBasic( this );
      }
    }
  }

  addPublisherBasic( publisher, parameters ) {
    var env = this;
    if ( publisher.constructor.name.lastIndexOf( 'NSLController', 0 ) === 0 ) {
      env['$publishers']['$controllers'][publisher.id] = {};
      env['$publishers']['$controllers'][publisher.id].publisher = publisher;
      if ( typeof parameters !== 'undefined' ) {
        Object.getOwnPropertyNames( parameters ).forEach( function( e ) {
          env['$publishers']['$controllers'][publisher.id][e] = parameters[e];
        });
      }
    } else if ( publisher.constructor.name.lastIndexOf( 'NSLModel', 0 ) === 0 ) {
      env['$publishers']['$models'][publisher.id] = {};
      env['$publishers']['$models'][publisher.id].publisher = publisher;
      if ( typeof parameters !== 'undefined' ) {
        Object.getOwnPropertyNames( parameters ).forEach( function( e ) {
          env['$publishers']['$models'][publisher.id][e] = parameters[e];
        });
      }
    } else if ( publisher.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
      env['$publishers']['$views'][publisher.id] = {};
      env['$publishers']['$views'][publisher.id].publisher = publisher;
      if ( typeof parameters !== 'undefined' ) {
        Object.getOwnPropertyNames( parameters ).forEach( function( e ) {
          env['$publishers']['$views'][publisher.id][e] = parameters[e];
        });
      }
    }
  }

  removePublisher( publisher ) {
    var env = this;
    Object.getOwnPropertyNames( env['$publishers'] ).forEach( function( e ) {
      delete env['$publishers'][e][publisher.id];
    });;
  }

  onNotification( parameters ) {}

}
