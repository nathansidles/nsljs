'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

export default class NSLViewURL {

  constructor( baseURL ) {

  }

  new( baseURL ) {
    return new NSLViewURL( baseURL );
  }

  getURL( url ) {
    let env = this;

    if ( typeof url === 'undefined' ) {
      url = env.deepCopy( window.location );
    } else {
      var tempElement = document.createElement( 'a' );
      tempElement.href = url;
      var tempLocation = env.deepCopy( window.location );
      var tempURL = {};
      for ( var i in tempLocation ) {
        tempURL[i] = tempElement[i];
      }
      url = tempURL;
    }
    url.patharray = url.pathname.split( '/' );

    var parameters = {};
    var pairs = ( url.search[0] === '?' ? url.search.substr( 1 ) : url.search ).split( '&' );
    for ( let i = 0; i < pairs.length; i++ ) {
      var pair = pairs[i].split( '=' );
      var key = decodeURIComponent( pair[0] ).replace( '[]', '' );
      if ( typeof parameters[key] === 'undefined' ) {
        parameters[key] = [];
      }
      var values = decodeURIComponent( pair[1] || '' ).split( ',' );
      for ( let j = 0; j < values.length; j++ ) {
        if ( !NSL.hasElement( parameters[key], values[j] ) ) {
          parameters[key].push( values[j] );
        }
      }
    }
    url.searcharray = parameters;

    return url;
  }

}
