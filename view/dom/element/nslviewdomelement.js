'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMElementAbstract from './nslviewdomelement-abstract.js';
import NSLViewDOMElementButton from './button/nslviewdomelementbutton.js';

export default class NSLViewDOMElement extends NSLViewDOMElementAbstract {
  constructor( parameters ) {
    super( parameters );
  }

  new( parameters ) {
    if ( typeof parameters === 'undefined' ) {
      parameters = {};
    }
    if ( typeof parameters.appendee === 'undefined' ) {
      parameters.appendee = this['$node'].parentNode;
    }
    let env = this;
    var temp = new NSLViewDOMElement( parameters );
    Object.getOwnPropertyNames( env ).forEach( function( e ) {
      if ( e !== '$node' && e !== '$listeners' && e !== '$subs' && e !== '$pubs'  && e !== '$id' && e !== 'content' ) {
        temp[e] = env[e];
      }
    });
    Object.getOwnPropertyNames( env['$listeners'] ).forEach( function( e ) {
      Object.getOwnPropertyNames( env['$listeners'][e] ).forEach( function( f ) {
        temp.addEventListener( e, env['$listeners'][e][f] );
      });
    });
    Object.getOwnPropertyNames( env['$pubs'] ).forEach( function( e ) {
      Object.getOwnPropertyNames( env['$pubs'][e] ).forEach( function( f ) {
        env['$pubs'][e][f].publisher.addSubscriber( temp );
      });
    });
    Object.getOwnPropertyNames( env['$subs'] ).forEach( function( e ) {
      Object.getOwnPropertyNames( env['$subs'][e] ).forEach( function( f ) {
        env['$subs'][e][f].subscriber.addPublisher( temp, { 'events' : env['$subs'][e][f].subscriber['$pubs']['$views'][env.id].events } );
      });
    });

    return temp;
  }

  get button() {
    return new NSLViewDOMElementButton();
  }
}
