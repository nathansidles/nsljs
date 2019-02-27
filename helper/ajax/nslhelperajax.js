'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLHelperAJAXAbstract from './nslhelperajax-abstract.js';

/**
 * Class for NSLHelperAJAX objects. NSLHelperAJAX objects contain useful JavaScript functions for AJAX operations.
 * @extends NSLHelperAJAXAbstract
 */
export default class NSLHelperAJAX extends NSLHelperAJAXAbstract {
  /**
   * Function for making an AJAX request.
   *
   * @param {Object} parameters - Parameters for performing the request. Properties:
   *    method:           HTTP method of the request.
   *    scheme:           Schema of the requested resource.
   *    host:             Hostname of the requested resource. To be concatenated with scheme.
   *    basePath:         Shared base path of the requested resource. To be concatenated with host.
   *    path:             Individual resource path of the request. To be concatenated with basePath.
   *    collectionFormat: Type of concatenation for multiple parameter values.
   *    parameters:       Array of parameter/value pairs for the request.
   *    callback:         Callback function of the request. Accepts data as an input.
   */
  request( parameters ) {
    this.requestXMLHTTPRequest( parameters );
  }

  /**
   * Helper function for request(). Implements request() as an XMLHTTPRequest.
   *
   * @param {Object} parameters - Parameters for performing the request. Properties:
   *    method:           HTTP method of the request.
   *    scheme:           Schema of the requested resource.
   *    host:             Hostname of the requested resource. To be concatenated with scheme.
   *    basePath:         Shared base path of the requested resource. To be concatenated with host.
   *    path:             Individual resource path of the request. To be concatenated with basePath.
   *    collectionFormat: Type of concatenation for multiple parameter values.
   *    parameters:       Array of parameter/value pairs for the request.
   *    callback:         Callback function of the request. Accepts data as an input.
   */
  requestXMLHTTPRequest( parameters ) {
    parameters = NSLHelper.parametersExtractor( parameters );
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if ( this.readyState == 4 && this.status == 200 ) {
        const data = JSON.parse( this.responseText );
        parameters.caller['$data'] = data;
        parameters.caller.notifySubscribers();
        if ( typeof parameters.callback === 'function' ) {
          parameters.callback( data );
        }
      }
    };
    const request = parameters.scheme + '://' + parameters.host + '/' + parameters.basePath + '/' + parameters.path + '/?';
    let data = '';
    let count = 0;
    if ( Array.isArray( parameters.parameters ) ) {
      data = encodeURIComponent( parameters.parameters[0].parameter ) + '=' + encodeURIComponent( parameters.parameters[0].value );
      for ( let i = 1; i < parameters.parameters.length; i++ ) {
        data += '&' + encodeURIComponent( parameters.parameters[i].parameter ) + '=' + encodeURIComponent( parameters.parameters[i].value );
      }
    } else {
      for ( const parameter in parameters.parameters ) {
        if ( parameters.parameters.hasOwnProperty( parameter ) ) {
          if ( count > 0 ) {
            data += '&';
          }
          data += encodeURIComponent( parameter ) + '=' + encodeURIComponent( parameters[parameter] );
          count++;
        }
      }
    }
    console.log( request + data );
    xmlhttp.open( parameters.method, request + data, true );
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send( data );
  }
}
