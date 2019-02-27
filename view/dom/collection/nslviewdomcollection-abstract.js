'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMAbstract from './../nslviewdom-abstract.js';
import NSLViewDOMElement from './../element/nslviewdomelement.js';

/**
 * Class for creating NSLViewCollectionAbstract objects. This is a pseudo-abstract class.
 * @extends NSLViewDOMAbstract
 */
export default class NSLViewDOMCollectionAbstract extends NSLViewDOMAbstract {
  /**
   * Function for creating an NSLViewDOMCollectionAbstract object.
   *
   * @param {Object} parameters - Parameters for creating the object. Properties:
   *    appendee:   DOM or NSLViewDOM object to which to append this object.
   *    publisher:  Publisher or array of publishers to which this object subscribes.
   *    subscriber: Subscriber or array of subscribers to which this object publishes.
   */
  constructor( parameters ) {
    super( parameters );
    if ( typeof parameters !== 'undefined' ) {
      this['$height'] = ( typeof parameters.height === 'string' ) ? parameters.height : this.nodeExtractor( parameters.appendee ).offsetHeight;
      this['$width'] = ( typeof parameters.width === 'string' ) ? parameters.width : this.nodeExtractor( parameters.appendee ).offsetWidth;
      if ( typeof parameters.appendee !== 'undefined' ) {
        const factory = new NSLViewDOMElement();
        this['$node'] = this.nodeExtractor( factory.new({'appendee': parameters.appendee, 'tagName': 'div', 'classes': ['nsl-collection-container']}) );
      }
      this['$content'] = ( typeof parameters.content === 'Object' ) ? parameters.content : {};
    }
  }

  /**
   * Function for displaying a collection inside this view. Default callback for onNotification().
   *
   * @param {Object} parameters - Parameters for displaying a collection. Properties:
   *    data: Data to be displayed as a collection.
   */
  displayCollection( parameters ) {
    // const data = parameters.data;
    const data = NSLHelper.randomArray2D({'height': 1000, 'width': 1000, 'length': 1});

    let yOffset = 0;
    let xOffset = 0;
    let height = 0;
    let width = 0;
    let averageHeight = 0;
    let averageWidth = 0;

    this['$content'].data;
    this['$content'].columns = [];
    this['$content'].rows = [];

    const table = new NSLViewDOMElement({'appendee': this['$node'], 'tagName': 'div', 'classes': ['nsl-collection']});
    // const thead = new NSLViewDOMElement({'appendee': table, 'tagName': 'div', 'classes': ['nsl-collection-head']});
    const tbody = new NSLViewDOMElement({'appendee': table, 'tagName': 'div', 'classes': ['nsl-collection-body']});

    for ( let i = 0; i < data.length && yOffset < this['$height']; i++ ) {
      yOffset = ( typeof this['$content'].rows[i-1] !== 'undefined' ) ? this['$content'].rows[i-1].yOffset + this['$content'].rows[i-1].height : 0;
      xOffset = 0;
      for ( let j = 0; j < data[i].length && xOffset < this['$width']; j++ ) {
        xOffset = ( typeof this['$content'].columns[j-1] !== 'undefined' ) ? this['$content'].columns[j-1].xOffset + this['$content'].columns[j-1].width : 0;
        const cell = new NSLViewDOMElement({
          'appendee': tbody,
          'tagName': 'div',
          'classes': ['nsl-collection-cell'],
          'content': data[i][j],
          'attributes': {'style': `top: ${yOffset}px; left: ${xOffset}px`},
        });
        if ( j === 0 ) {
          height = this.getHeight( cell );
          averageHeight = ( averageHeight * ( i-1 ) + height ) / ( ( i === 0 ) ? 1 : i );
          this['$content'].rows[i] = {'yOffset': yOffset, 'height': height};
        }
        if ( i === 0 ) {
          width = this.getWidth( cell );
          averageWidth = ( averageWidth * ( j - 1 ) + width ) / ( ( j === 0 ) ? 1 : j );
          this['$content'].columns[j] = {'xOffset': xOffset, 'width': width};
        }
      }
    }

    console.log( averageWidth );

    for ( let i = 0; i < data.length; i++ ) {
      if ( typeof this['$content'].rows[i] !== 'undefined' ) {
        this['$content'].rows[i] = {'yOffset': this['$content'].rows[i].yOffset + averageHeight, 'height': averageHeight};
      }
    }

    for ( let i = 0; i < data[0].length; i++ ) {
      if ( typeof this['$content'].columns[i] !== 'undefined' ) {
        this['$content'].columns[i] = {'xOffset': this['$content'].columns[i].yOffset + averageHeight, 'height': averageHeight};
      }
    }

    this['$node'].parentNode.addEventListener( 'scroll', function( e ) {
      console.log( e.target.scrollTop );
    });
  }

  /**
   * Function for getting the height of a collection element.
   *
   * @param {Object} element - NSLView object to get the height of. Optional. If blank, the current object isused.
   * @return {Number} - Display height of the object in pixels (using offsetHeight).
   */
  getHeight( element ) {
    if ( typeof element === 'undefined' ) {
      element = this;
    }
    return element['$node'].offsetHeight;
  }

  /**
   * Function for getting the width of a collection element.
   *
   * @param {Object} element - NSLView object to get the width of. Optional. If blank, the current object isused.
   * @return {Number} - Display width of the object in pixels (using offsetWidth).
   */
  getWidth( element ) {
    if ( typeof element === 'undefined' ) {
      element = this;
    }
    return element['$node'].offsetWidth;
  }

  /**
   * Function for adding a row below the currently displayed rows.
   *
   * @param {Object} parameters - Parameters for adding this row.
   * @return {Number} - The height of the created row.
   */
  addRowBelow( parameters ) {
    return this.getHeight( row );
  }

  /**
   * Function for adding a row above the currently displayed rows.
   *
   * @param {Object} parameters - Parameters for adding this row.
   */
  addRowAbove() {
  }

  /**
   * Function for adding a column to the right of the currently displayed columns.
   *
   * @param {Object} parameters - Parameters for adding this column.
   */
  addColumnRight() {
  }

  /**
   * Function for adding a column to the left of the currently displayed columns.
   *
   * @param {Object} parameters - Parameters for adding this column.
   */
  addColumnLeft() {
  }

  /**
   * Function for removing a row from below the currently displayed rows.
   *
   * @param {Object} parameters - Parameters for removing this row.
   */
  removeRowBelow() {

  }

  /**
   * Function for removing a row from above the currently displayed rows.
   *
   * @param {Object} parameters - Parameters for removing this row.
   */
  removeRowAbove() {
  }

  /**
   * Function for removing a column from the right of the  currently displayed columns.
   *
   * @param {Object} parameters - Parameters for removing this columns.
   */
  removeColumnRight() {
  }

  /**
   * Function for removing a column from the left of the  currently displayed columns.
   *
   * @param {Object} parameters - Parameters for removing this columns.
   */
  removeColumnLeft() {
  }

  /**
   * Function to perform actions when this object is notified by one of its publishers.
   *
   * @param {Object} parameters - Parameters for notifying the object.
   */
  onNotification( parameters ) {
    this['$content'].data = parameters['$data'];
    this.displayCollection( parameters['$data'].data );
  }
}
