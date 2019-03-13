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
        this['$container'] = factory.new({'appendee': parameters.appendee, 'tagName': 'div', 'classes': ['nsl-collection-container']});
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
    const data = NSLHelper.randomArray2D({'height': 100, 'width': 100, 'length': 1});

    let yOffset = 0;
    let xOffset = 0;
    let height = 0;
    let width = 0;
    let averageHeight = 0;
    let averageWidth = 0;

    const env = this;

    this['$content'].data;
    this['$content'].display = {};

    this['$content'].columns = {};
    this['$content'].columns.all = [];
    this['$content'].columns.min = 0;
    this['$content'].columns.max = 0;

    this['$content'].rows = {};
    this['$content'].rows.all = [];
    this['$content'].rows.min = 0;
    this['$content'].rows.max = 0;

    const table = new NSLViewDOMElement({'appendee': this['$container'], 'tagName': 'div', 'classes': ['nsl-collection']});
    const tbody = new NSLViewDOMElement({'appendee': table, 'tagName': 'div', 'classes': ['nsl-collection-body']});

    let horizontalOffset = this.getHorizontalOffset();
    let verticalOffset = this.getVerticalOffset();

    let width = this.getWidth();
    let height = this.getHeight();

    this.getRowMinimum();

    this.addPage({
      'data': data,
      'display': display,
      'columns': {
        'min': 0,
        'max': 100,
      },
      'rows': {
        'min': 0,
        'max': 100,
      },
    });

    return;

    for ( let i = 0; i < data.length && yOffset < this['$height']; i++ ) {
      yOffset = ( typeof this['$content'].rows.all[i-1] !== 'undefined' ) ? this['$content'].rows.all[i-1].yOffset + this['$content'].rows.all[i-1].height : 0;
      xOffset = 0;
      this['$content'].display[i] = {};
      for ( let j = 0; j < data[i].length && xOffset < this['$width']; j++ ) {
        xOffset = ( typeof this['$content'].columns.all[j-1] !== 'undefined' ) ? this['$content'].columns.all[j-1].xOffset + this['$content'].columns.all[j-1].width : 0;
        this['$content'].display[i][j] = new NSLViewDOMElement({
          'appendee': tbody,
          'tagName': 'div',
          'classes': ['nsl-collection-cell'],
          'content': data[i][j],
          'attributes': {'style': `top: ${yOffset}px; left: ${xOffset}px`},
        });
        if ( j === 0 ) {
          height = this.getHeight( this['$content'].display[i][j] );
          averageHeight = ( averageHeight * ( i-1 ) + height ) / ( ( i === 0 ) ? 1 : i );
          this['$content'].rows.all[i] = {'yOffset': yOffset, 'height': height};
          this['$content'].rows.max = i;
        }
        if ( i === 0 ) {
          width = this.getWidth( this['$content'].display[i][j] );
          averageWidth = ( averageWidth * ( j - 1 ) + width ) / ( ( j === 0 ) ? 1 : j );
          this['$content'].columns.all[j] = {'xOffset': xOffset, 'width': width};
          this['$content'].columns.max = j;
        }
      }
    }

    for ( let i = 0; i < data.length; i++ ) {
      if ( typeof this['$content'].rows.all[i] === 'undefined' ) {
        this['$content'].rows.all[i] = {'yOffset': this['$content'].rows.all[i-1].yOffset + averageHeight, 'height': averageHeight};
      }
    }

    for ( let i = 0; i < data[0].length; i++ ) {
      if ( typeof this['$content'].columns.all[i] === 'undefined' ) {
        this['$content'].columns.all[i] = {'xOffset': this['$content'].columns.all[i-1].xOffset + averageWidth, 'width': averageWidth};
      }
    }

    this['$container'].setAttribute({'style': `height: ${averageHeight*data.length}px; width:${averageWidth*data[0].length}px;`});

    this['$container']['$node'].parentNode.addEventListener( 'scroll', function( e ) {
      const newMinX = Math.floor( e.target.scrollLeft * data[0].length / env['$container']['$node'].offsetWidth );
      const newMinY = Math.floor( e.target.scrollTop * data.length / env['$container']['$node'].offsetHeight );
      const newMaxX = NSLHelper.least({
        'values': [Math.floor( ( e.target.scrollLeft + env['$width'] ) * data[0].length / env['$container']['$node'].offsetWidth ), env['$content'].columns.all.length],
      });
      const newMaxY = NSLHelper.least({
        'values': [Math.floor( ( e.target.scrollTop + env['$height'] ) * data.length / env['$container']['$node'].offsetHeight ), env['$content'].rows.all.length],
      });
      const oldMinX = env['$content'].columns.min;
      const oldMinY = env['$content'].rows.min;
      const oldMaxX = env['$content'].columns.max;
      const oldMaxY = env['$content'].rows.max;

      if ( newMaxY > oldMaxY ) {
        if ( oldMaxY > newMinY ) {
          for ( let i = oldMaxY; i < newMaxY; i++ ) {
            yOffset = env['$content'].rows.all[i].yOffset;
            env['$content'].display[i] = {};
            for ( let j = oldMinX; j < oldMaxX; j++ ) {
              if ( typeof env['$content'].display[i][j] === 'undefined' ) {
                xOffset = env['$content'].columns.all[j].xOffset;
                env['$content'].display[i][j] = new NSLViewDOMElement({
                  'appendee': tbody,
                  'tagName': 'div',
                  'classes': ['nsl-collection-cell'],
                  'content': data[i][j],
                  'attributes': {'style': `top: ${yOffset}px; left: ${xOffset}px`},
                });
              }
            }
          }
          for ( let i = oldMinY; i < newMinY; i++ ) {
            for ( let j = oldMinX; j < oldMaxX; j++ ) {
              if ( typeof env['$content'].display[i][j] !== 'undefined' ) {
                env['$content'].display[i][j].delete();
              }
            }
            delete env['$content'].display[i];
          }
        } else {
          for ( let i = newMinY; i < newMaxY; i++ ) {
            yOffset = env['$content'].rows.all[i].yOffset;
            env['$content'].display[i] = {};
            for ( let j = oldMinX; j < oldMaxX; j++ ) {
              if ( typeof env['$content'].display[i][j] === 'undefined' ) {
                xOffset = env['$content'].columns.all[j].xOffset;
                env['$content'].display[i][j] = new NSLViewDOMElement({
                  'appendee': tbody,
                  'tagName': 'div',
                  'classes': ['nsl-collection-cell'],
                  'content': data[i][j],
                  'attributes': {'style': `top: ${yOffset}px; left: ${xOffset}px`},
                });
              }
            }
          }
          for ( let i = oldMinY; i < oldMaxY; i++ ) {
            for ( let j = oldMinX; j < oldMaxX; j++ ) {
              if ( typeof env['$content'].display[i][j] !== 'undefined' ) {
                env['$content'].display[i][j].delete();
              }
            }
            delete env['$content'].display[i];
          }
        }
        env['$content'].columns.min = newMinX;
        env['$content'].columns.max = newMaxX;
        env['$content'].rows.min = newMinY;
        env['$content'].rows.max = newMaxY;
      } else if ( newMaxY < oldMaxY ) {
        if ( oldMinY < newMaxY ) {
          for ( let i = newMinY; i < oldMinY; i++ ) {
            yOffset = env['$content'].rows.all[i].yOffset;
            env['$content'].display[i] = {};
            for ( let j = oldMinX; j < oldMaxX; j++ ) {
              if ( typeof env['$content'].display[i][j] === 'undefined' ) {
                xOffset = env['$content'].columns.all[j].xOffset;
                env['$content'].display[i][j] = new NSLViewDOMElement({
                  'appendee': tbody,
                  'tagName': 'div',
                  'classes': ['nsl-collection-cell'],
                  'content': data[i][j],
                  'attributes': {'style': `top: ${yOffset}px; left: ${xOffset}px`},
                });
              }
            }
          }
          // for ( let i = newMaxY; i < oldMaxY; i++ ) {
          //   for ( let j = oldMinX; j < oldMaxX; j++ ) {
          //     if ( typeof env['$content'].display[i][j] !== 'undefined' ) {
          //       env['$content'].display[i][j].delete();
          //     }
          //   }
          //   delete env['$content'].display[i];
          // }
        } else {

        }
      }
    });
  }

  /**
   * Function for adding a complete page.
   *
   * @param {Object} parameters - Parameters for adding this page. Properties:
   *    appendee: DOM or NSLViewDOM object to which to append this object.
   *    data:     Array or NSLModelCollection to display.
   *    display:  Array of displayed elements.
   *    columns:  Column parameters. Properties:
   *        min:  The minimum column value to display.
   *        max:  The maximum column value to display.
   *    rows:     Row parameters. Properties:
   *        min:  The minimum row value to display.
   *        max:  The maximum row value to display.
   */
  addPage( parameters ) {
    for ( let i = parameters.columns.min; i < parameters.columns.max; i++ ) {
      for ( let j = parameters.rows.min; j < parameters.rows.max; j++ ) {
        if ( NSLHelper.defined({'object': parameters.data, 'names': [i, j]}) ) {

        }
      }
    }
  }

  /**
   * Function for removing a complete page.
   *
   * @param {Object} parameters - Parameters for removing the currently displayed page.
   */
  removePage( parameters ) {

  }

  /**
   * Function for getting the minimum column of a page.
   *
   * @return {Number} - Minimum column.
   */
  getMinColumn( parameters ) {

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
   * Function to perform actions when this object is notified by one of its publishers.
   *
   * @param {Object} parameters - Parameters for notifying the object.
   */
  onNotification( parameters ) {
    this['$content'].data = parameters['$data'];
    this.displayCollection( parameters['$data'].data );
  }
}
