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
    this['$pubs'] = {};
    this['$pubs']['$controllers'] = {};
    this['$pubs']['$models'] = {};
    this['$pubs']['$views'] = {};
    this['$subs'] = {};
    this['$subs']['$controllers'] = {};
    this['$subs']['$models'] = {};
    this['$subs']['$views'] = {};
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

  removeSubscriber( subscriber ) {
    let env = this;
    Object.getOwnPropertyNames( env['$subs'] ).forEach( function( e ) {
      delete env['$subs'][e][subscriber.id];
    });
    subscriber.removePublisher( this );
  }

  removeSubscribers() {
    this['$subs']['$controllers'] = {};
    this['$subs']['$models'] = {};
    this['$subs']['$views'] = {};
  }

  notifySubscribers() {
    let env = this;
    Object.getOwnPropertyNames( env['$subs'] ).forEach( function( e ) {
      Object.getOwnPropertyNames( env['$subs'][e] ).forEach( function( f ) {
        env['$subs'][e][f].onNotification( env );
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
    let env = this;
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

  removePublisher( publisher ) {
    let env = this;
    Object.getOwnPropertyNames( env['$pubs'] ).forEach( function( e ) {
      delete env['$pubs'][e][publisher.id];
    });;
  }

  onNotification( parameters ) {}

}
