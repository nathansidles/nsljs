'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMElementButtonAbstract from './nslviewdomelementbutton-abstract.js';
import NSLViewDOMElement from './../nslviewdomelement.js';

export default class NSLViewDOMElementButton extends NSLViewDOMElementButtonAbstract {

  constructor( parameters ) {
    super( parameters );
  }

  new( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    if ( typeof parameters.appendee === 'undefined' ) {
      parameters.appendee = this['$node'].parentNode;
    }
    if ( typeof parameters.content === 'undefined' ) {
      parameters.content = this.content['$node'].textContent;
    }
    let env = this;
    var temp = new NSLViewDOMElementButton( parameters );
    Object.getOwnPropertyNames( env ).forEach( function( e ) {
      if ( e !== '$node' && e !== '$listeners' && e !== '$subs' && e !== '$pubs'  && e !== '$id' && e !== 'content' ) {
        temp[e] = env[e];
      }
    });
    Object.getOwnPropertyNames( env['$listeners'] ).forEach( function( e ) {
      Object.getOwnPropertyNames( env['$listeners'][e] ).forEach( function( f ) {
        temp.addEventListener( e, env['$listeners'][e][f] );
        console.log( env['$listeners'][e][f] );
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

}
