'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewAbstract from './../nslview-abstract.js';

/*
 * This class supplies essential functions for the NSLViewDOM class and the child classes of this helper class.
 */
export default class NSLViewDOMAbstract extends NSLViewAbstract {

  constructor( object ) {
    super( object );
    this['$node'];
    this['$listeners'] = {};
    if ( typeof object !== 'undefined' ) {
      this['$node'] = this.nodeExtractor( object.node );
    }
  }

  /**
   * Helper function extracts the HTMLElement out of an NSLViewDOM object, if an exists.
   *
   * @param {Object} - pendee - either an HTMLElement object or an NSLViewDOM object.
   *
   * @return {Object} - HTMLElement object.
  */
  nodeExtractor( node ) {

    if ( typeof node !== 'undefined' ) {
      var nodeType = node.constructor.name;
      if ( nodeType.lastIndexOf( 'HTML', 0 ) === 0 && nodeType.indexOf( 'Element', nodeType.length - 7 ) !== 0 ) {
        return node;
      } else if ( nodeType.lastIndexOf( 'NSLViewDOM' ) === 0 ) {
        return node['$node'];
      }
    } else {
      return node;
    }

  }

  /**
   * Function for clearing out a HTML node. The node itself is removed.
   *
   * @param {Object} node - NSLViewDOM object or HTLMElement to delete. Optional. If missing, the current object's element is deleted.
   */
  delete( node ) {
    if ( typeof node === 'undefined' ) {
      node = this['$node'];
    }
    node = this.nodeExtractor( node );
    node.parentNode.removeChild( node );
    this['$node'] = null;
  }

  /**
   * Function for clearing out a HTML node or NSLViewDOM object recursively. The node or object itself remains.
   *
   * @param {Object} node - Node/element to clear out. Optional. If missing, the current object's element is cleared out.
   */
  clear( node ) {
    if ( typeof node === 'undefined' ) {
      node = this['$node'];
    }
    while( node.hasChildNodes() ) {
      node.removeChild( node.lastChild );
    }
  }

  /**
   * Function for retrieving the child objects of an NSLViewDOM object.
   *
   * @return {Array} - Child NSLViewDOM properties of this object.
   */
  getChildren( node ) {
    if ( typeof node === 'undefined' ) {
      node = this;
    }
    var tempArray = [];
    Object.getOwnPropertyNames( node ).forEach( function( e ) {
      if ( e.lastIndexOf( '$', 0 ) !== 0 ) {
        tempArray.push( node[e] );
      }
    });
    return tempArray;
  }

  /**
   * Function for retrieving the child objects of an NSLViewDOM object.
   *
   * @param {Object} node - NSLViewDOM object to retrieve children from. Optional. If missing, the current object is used.
   *
   * @return {Array} - Names of the NSLViewDOM properties of this object.
   */
  getChildrenNames( node ) {
    if ( typeof node === 'undefined' ) {
      node = this;
    }
    var tempArray = [];
    Object.getOwnPropertyNames( node ).forEach( function( e ) {
      if ( e.lastIndexOf( '$', 0 ) !== 0 ) {
        tempArray.push( e );
      }
    });
    return tempArray;
  }

  /**
   * Function for retrieving a single, named child object of the NSLViewDOM object.
   *
    * @param {String} name - name of the child object to return.
   * @param {Object} node - NSLViewDOM object to retrieve children from. Optional. If missing, the current object is used.
   *
   * @return {Object} - NSLViewDOM object returned. Null if the named object does not exist.
   */
  getChild( name, node ) {
    if ( typeof node === 'undefined' ) {
      node = this;
    }
    if ( typeof this[name] !== 'undefined' ) {
      return this[name];
    } else {
      return;
    }
  }

  /**
   * Function for setting an NSLViewDOM child object to the NSLViewDOM object.
   *
   * @param {String} - name of the child NSLViewDOM object to set.
   * @param {Object} - NSLViewDOM object to set as the child.
   * @param {Object} - NSLViewDOM object to which to set the child. Optional. If missing, the current object is used.
   *
   */
  setChild( name, child, node ) {
    if ( typeof node === 'undefined' ) {
      node = this;
    }
    if ( child.constructor.name.lastIndexOf( 'NSLViewDOM' ) === 0 && name.lastIndexOf( '$' ) === -1 ) {
      this[name] = child;
    } else {
      throw 'Parameter is not an NSLDOMView object.';
    }
  }

  /**
   * Function for clearing an NSLVieDOM child object from the NSLViewDOM object. The object itself may remain if it is referenced by another object.
   *
   * @param {String} - name of th child NSLViewDOM object to delete.
   * @param {Object} - NSLViewDOM object from which to clear the child. Optional. If missing, the current object is used.
   *
   */
  clearChild( name, node ) {
    if ( typeof node === 'undefined' ) {
      node = this;
    }
    if ( typeof this.name !== 'undefined' && name.lastIndexOf( '$' ) === -1 ) {
      delete this.name;
    }
  }

  /**
   * Function for adding an event listener to a DOM element.
   *
   * @param {String} event - event to listen for.
   * @param {Object} inputFunction - function to execute in response to event.
   */
  addEventListener( event, inputFunction, parameters ) {
    let env = this;
    if ( typeof this['$listeners'][event] === 'undefined' ) {
      this['$listeners'][event] = {};
      this['$node'].addEventListener( event, function() { env.notifySubscribers( event ); } );
    }
    this['$node'].addEventListener( event, inputFunction );
    this['$listeners'][event][inputFunction] = inputFunction;
  }

  /**
   * Function for removing an event listener from a DOM element.
   *
   * @param {String} event - event to remove.
   * @param {Object} inputFunction - function remove. If string, function is removed by name.
   */
  removeEventListener( event, inputFunction ) {
    this['$node'].removeEventListener( event, inputFunction );
    if ( typeof inputFunction === 'string' ) {
      Object.getOwnPropertyNames( this['$listeners'][event] ).forEach( function( e ) {
        if ( this['$listeners'][event][e].name === inputFunction ) {
          delete this['$listeners'][event][inputFunction];
        }
      });
    }
    delete this['$listeners'][event][inputFunction];
    if ( NSLHelper.isEmpty( this['$listeners'][event] ) ) {
      delete this['$listeners'][event];
    }
  }

  /**
   * Function for removing all functions associated with an event from a DOM element.
   *
   * @param {String} event - event to remove.
   */
  removeEventListeners( event ) {
    Object.getOwnPropertyNames( this['$listeners'][event] ).forEach( function( e ) {
      this['$node'].removeEventListener( event, this['$listeners'][event][e] );
    });
    delete this['$listeners'][event];
  }

  /**
   * Function for removing all event listeners from a DOM element.
   */
  removeAllEventListeners() {
    Object.getOwnPropertyNames( this['$listeners'] ).forEach( function( e ) {
      Object.getOwnPropertyNames( this['$listeners'][e] ).forEach( function( f ) {
        this['$node'].removeEventListener( this['$listeners'][e], this['$listeners'][event][e][f] );
      });
    });
    this['$listeners'] = {};
  }

  /**
   * Function for notifying subscribers that an event has occurred. In practice, these should be NSL constrollers. Similar to emit() in node.js.
   *
   * @param {String} event - event to notify subscribers about.
   */
  notifySubscribers( event ) {
    var parameters = {};
    parameters.publisher = this;
    parameters.event = event;
    Object.getOwnPropertyNames( parameters.publisher['$subs'] ).forEach( function( e ) {
      Object.getOwnPropertyNames( parameters.publisher['$subs'][e] ).forEach( function( f ) {
        parameters.publisher['$subs'][e][f].subscriber.onNotification( parameters );
      });
    });
  }

  onNotification( parameters ) {
    console.log( this );
  }

}
