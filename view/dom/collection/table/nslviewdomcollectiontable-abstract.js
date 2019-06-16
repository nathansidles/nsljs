'use strict';

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLViewDOMAbstract from './../../nslviewdom-abstract.js';
import NSLViewDOMElement from './../../element/nslviewdomelement.js';

/**
 * Class for creating NSLViewCollectionAbstract objects. This is a pseudo-
 * abstract class.
 * @extends NSLViewDOMAbstract
 */
export default class NSLViewDOMCollectionAbstract extends NSLViewDOMAbstract {
  /**
   * Function for creating an NSLViewDOMCollectionAbstract object.
   *
   * @param {Object} params - Parameters the function Properties:
   *    appendee:   DOM or NSLViewDOM object to which to append this object.
   *    publisher:  Publisher or array of pubs to which this object subscribes.
   *    subscriber: Subscriber or array of subs to which this object publishes.
   */
  constructor( params ) {
    super( params );
    if ( typeof params !== 'undefined' ) {
      if ( typeof params.appendee !== 'undefined' ) {
        const factory = new NSLViewDOMElement();
        this['$container'] = factory.new({
          'appendee': params.appendee,
          'tagName': 'div',
          'classes': ['nsl-collection-container'],
        });
      }
      this['$content'] =
        ( typeof params.content === 'Object' ) ? params.content : {};
      this['$content'].data = {};
      this['$content'].display = {};
      this['$content'].displayBounds = {};
      this['$content'].table = new NSLViewDOMElement({
        'appendee': this['$container'],
        'tagName': 'div',
        'classes': ['nsl-collection'],
      });

      this['$content'].containerWidth = this.getWidth();
      this['$content'].containerHeight = this.getHeight();
      this['$content'].width = this.getWidth();
      this['$content'].height = this.getHeight();

      this['$content'].columns = {};
      this['$content'].columns.all = [];
      this['$content'].columns.min = 0;
      this['$content'].columns.max = 0;
      this['$content'].columns.average = 0;

      this['$content'].rows = {};
      this['$content'].rows.all = [];
      this['$content'].rows.min = 0;
      this['$content'].rows.max = 0;
      this['$content'].rows.average = 0;

      this['$content'].scrollTop = 0;
      this['$content'].scrollLeft = 0;

      this['$content'].time = Date.now();
    }
  }

  /**
   * Function for displaying a collection inside this view. Default callback for
   * onNotification().
   *
   * @param {Object} params - Parameters for the function. Properties:
   *    data: Data to be displayed as a collection.
   */
  displayCollection( params ) {
    this['$content'].data = NSLHelper.randomArray2D({
      'height': 1000,
      'width': 1000,
      'length': 1,
    });
    this.initializeCollection();
    this.setPage();
    this.scroll();
  }

  /**
   * Function for initializing a new collection to display.
   *
   * @param {Object} params - Parameters for the function. Properties:
   *    width:   default element width.
   *    height:  default element height.
   */
  initializeCollection( params ) {
    params = NSLHelper.parametersExtractor( params );
    const data = this['$content'].data;
    let height = 1;
    let width = 1;
    if ( typeof params.width !== 'undefined' ) {
      width = params.width;
    }
    if ( typeof params.height !== 'undefined' ) {
      height = params.height;
    }
    this.initializeDimension({
      'data': data,
      'name': 'rows',
      'size': height,
      'estimate': true,
    });
    this.initializeDimension({
      'data': data[0],
      'name': 'columns',
      'size': width,
      'estimate': true,
    });
    this.initializeDisplay();
  }

  /**
   * Function for initializing the dimension of a new collection to display.
   * Helper function for initializeCollection().
   *
   * @param {Object} params - Parameters for the function. Properties:
   *    data:     single-dimension data to initialize.
   *    estimate: Boolean of size estimation or actual. Optional. Default: true.
   *    name:     name of dimension to initialize.
   *    size:     default size of element's dimension. Optional. Default: 1.
   */
  initializeDimension( params ) {
    const data = params.data;
    const name = params.name;
    let size = 1;
    if ( typeof params.size !== 'undefined' ) {
      size = params.size;
    }
    let estimate = true;
    if ( typeof params.estimate !== 'undefined' ) {
      estimate = params.estimate;
    }
    let offset = 0;
    for ( let i = 0; i < data.length; i++ ) {
      if ( typeof this['$content'][name].all[i-1] !== 'undefined' ) {
        const prev = this['$content'][name].all[i-1];
        offset = prev.offset + prev.size;
      }
      this['$content'][name].all[i] = {};
      this['$content'][name].all[i].size = size;
      this['$content'][name].all[i].offset = offset;
      this['$content'][name].all[i].estimate = estimate;
    }
    this['$content'][name].average = size;
    this['$content'][name].min = 0;
    this['$content'][name].max = data.length-1;
  }

  /**
   * Function for initializing the displayed elements object.
   */
  initializeDisplay() {
    for ( let i = 0; i < this['$content'].data.length; i++ ) {
      this['$content'].display[i] = {};
    }
  }

  /**
   * Function for sizing a subset of a dimension to display. A subset of values
   * will be known. These affect the average size of the others.
   *
   * @param {Object} params - Parameters for the function. Properties:
   *    data:  single-dimension data to resize the elements of.
   *    known: subset of known elements.
   *    name:  name of dimension to initialize.
   */
  sizeElements( params ) {
  }

  /**
   * Function for positioning a subset of a dimension to display. A value is
   * known. This will affect the offset of all elements further down the array.
   *
   * @param {Object} params - Parameters for the function. Properties:
   *    data:  single-dimension data to resize the elements of.
   *    known: known element.
   *    name:  name of dimension to initialize.
   */
  positionElements( ) {
  }

  /**
   * Function for getting the size of a page.
   */
  sizePage() {
    this['$content'].width =
      this['$content'].columns.average * this['$content'].data[0].length;
    this['$content'].height =
      this['$content'].rows.average * this['$content'].data.length;
    this['$container'].setAttribute({
      'style':
        `height:
          ${this['$content'].height}px;
          width:${this['$content'].width}px;`,
    });
  }

  /**
   * Function for handling small scroll events.
   */
  scroll() {
    const env = this;
    const container = this['$container']['$node'];
    container.parentNode.addEventListener( 'scroll', function( e ) {
      env['$content'].scrollTop = container.parentNode.scrollTop;
      env['$content'].scrollLeft = container.parentNode.scrollLeft;
      env.setPage();
    });
  }

  /**
   * Function for handling large scroll events.
   */
  jump() {
    const env = this;
    const container = this['$container']['$node'];
    container.parentNode.addEventListener( 'scroll', function( e ) {
      env['$content'].scrollTop = container.parentNode.scrollTop;
      env['$content'].scrollLeft = container.parentNode.scrollLeft;
      env.setPage();
    });
  }

  /**
   * Function for setting a page.
   *
   * @param {Object} params - Parameters for setting a page. Properties:
   *    xMin: minimum horizontal offset of the visible space.
   *    xMax: maximum horizontal offset of the visible space.
   *    yMin: minimum vertical offset of the visible space.
   *    yMax: maximum vertical offset of the visible space.
   */
  setPage( params ) {
    params = NSLHelper.parametersExtractor( params );
    const content = this['$content'];
    const outputs = {};
    const oldDisplayBounds = NSLHelper.deepCopy(
        this['$content'].displayBounds );
    outputs.rowOffset = this.findOffset({
      'name': 'rows',
      'dimension': 'height',
    });
    outputs.columnOffset = this.findOffset({
      'name': 'columns',
      'dimension': 'width',
    });
    outputs.xOffsetMax = content.scrollLeft + content.containerWidth;
    outputs.xOffsetMin = content.scrollLeft;
    outputs.yOffset = content.scrollTop;
    this['$content'].displayBounds.top = outputs.rowOffset;
    const prevRow = this['$content'].rows.all[outputs.rowOffset-1];
    if ( typeof prevRow !== 'undefined' && prevRow.estimate === false ) {
      outputs.yOffset = prevRow.offset + prevRow.size;
    }
    const yOffsetMax = content.scrollTop + content.containerHeight;
    do {
      outputs.yOffset += this.setRow( outputs );
      outputs.rowOffset++;
    } while ( outputs.yOffset < yOffsetMax );
    this['$content'].displayBounds.bottom = outputs.rowOffset;
    this.setAverage({'name': 'rows'});
    this.setAverage({'name': 'columns'});
    this.setOffset({'name': 'rows'});
    this.setOffset({'name': 'columns'});
    this.setPageSize();
    this.unsetPage({
      'old': oldDisplayBounds,
      'new': this['$content'].displayBounds,
    });
    console.log('setPage');
  }

  /**
   * Function for setting a single row.
   *
   * @param {Object} params - Parameters for setting a row. Properties:
   *    xMin: minimum horizontal offset of the visible space.
   *    xMax: maximum horizontal offset of the visible space.
   *    yOffset: vertical offset of row.
   * @return {Object} - a row.
   */
  setRow( params ) {
    const temp = {};
    temp.xOffset = params.xOffsetMin;
    temp.yOffset = params.yOffset;
    temp.columnOffset = params.columnOffset;
    temp.rowOffset = params.rowOffset;
    let column = this['$content'].columns.all[temp.columnOffset];
    temp.xOffset = column.offset;
    if ( column.estimate === false ) {
      temp.width = column.width;
    }
    let cell = {};
    let display =
      this['$content'].display[params.columnOffset][params.rowOffset];
    if ( typeof display === 'undefined' ) {
      cell = this.setCell( temp );
    } else {
      cell = this.getCell({'cell': display});
    }
    this['$content'].displayBounds.left = temp.columnOffset;
    do {
      column = this['$content'].columns.all[temp.columnOffset];
      temp.xOffset += column.size;
      temp.columnOffset++;
      display = this['$content'].display[temp.columnOffset][temp.rowOffset];
      if ( typeof display === 'undefined' ) {
        cell = this.setCell( temp );
      } else {
        cell = this.getCell({'cell': display});
      }
      console.log('setorgetcell');
    } while ( temp.xOffset < params.xOffsetMax );
    this['$content'].displayBounds.right = temp.columnOffset;
    return cell.height;
  }

  /**
   * Function for getting a cell
   *
   * @param {Object} params - Parameters for getting a cell. Properties:
   *    cell: element to retrieve cell information from.
   * @return {Object} - a cell.
   */
  getCell( params ) {
    const cell = params.cell;
    const temp = {};
    temp.height = this.getHeight( cell );
    temp.width = this.getWidth( cell );
    return temp;
  }

  /**
   * Function for setting a cell within a row.
   *
   * @param {Object} params - Parameters for setting a cell. Properties:
   *    xOffset: xOffset of the cell.
   *    yOffset: yOffset of the cell.
   *    width: width of cell.
   *    height: height of cell.
   * @return {Object} - a cell.
   */
  setCell( params ) {
    const column = this['$content'].columns.all[params.columnOffset];
    const row = this['$content'].rows.all[params.rowOffset];
    const attributes = {};
    attributes.style = '';
    if ( column.estimate === false ) {
      attributes.style += `left: ${column.offset}px;`;
      attributes.style += `width: ${column.size}px;`;
    } else {
      attributes.style += `left: ${params.xOffset}px;`;
    }
    if ( row.estimate === false ) {
      attributes.style += `top: ${row.offset}px;`;
      attributes.style += `height: ${row.size}px`;
    } else {
      attributes.style += `top: ${params.yOffset}px;`;
    }
    const cell = new NSLViewDOMElement({
      'appendee': this['$content'].table,
      'tagName': 'div',
      'classes': ['nsl-collection-cell'],
      'content':
        this['$content'].data[params.columnOffset][params.rowOffset]
          + ' ' + params.columnOffset
          + ' ' + params.rowOffset,
      'attributes': attributes,
    });
    const displayRow = this['$content'].display[params.columnOffset];
    displayRow[params.rowOffset] = cell;
    const temp = {};
    temp.height = this.getHeight( cell );
    temp.width = this.getWidth( cell );
    if ( column.estimate === true ) {
      column.offset = params.xOffset;
      column.size = temp.width;
      column.estimate = false;
    }
    if ( row.estimate === true ) {
      row.offset = params.yOffset;
      row.size = temp.height;
      row.estimate = false;
    }
    return temp;
  }

  /**
   * Function for setting the sizes of estimated dimension elements.
   *
   * @param {Object} params - Parameters for this function. Properties:
   *    name:   name of the dimension to search.
   */
  setAverage( params ) {
    let numerator = 0;
    let denominator = 0;
    let average = 0;
    const name = NSLHelper.parametersExtractor( params ).name;
    for ( let i = 0; i < this['$content'][name].all.length; i++ ) {
      const element = this['$content'][name].all[i];
      if ( element.estimate === false ) {
        numerator += element.size;
        denominator++;
      }
    }
    if ( denominator > 0 ) {
      average = numerator / denominator;
    }
    for ( let i = 0; i < this['$content'][name].all.length; i++ ) {
      const element = this['$content'][name].all[i];
      if ( element.estimate === true ) {
        if ( element.size === average ) {
          break;
        } else {
          element.size = average;
        }
      }
    }
  }

  /**
   * Function for setting the offsets of dimension elements.
   *
   * @param {Object} params - Parameters for this function. Properties:
   *    name:   name of the dimension to search.
   */
  setOffset( params ) {
    const name = NSLHelper.parametersExtractor( params ).name;
    const dimension = this['$content'][name].all;
    for ( let i = 0; i < this['$content'][name].all.length; i++ ) {
      if ( typeof this['$content'][name].all[i-1] !== 'undefined'
          && this['$content'][name].all[i].estimate === true ) {
        dimension[i].offset = dimension[i-1].offset + dimension[i].size;
      }
    }
  }

  /**
   * Function for setting the size of a page.
   */
  setPageSize() {
    let height = 0;
    for ( let i = 0; i < this['$content'].rows.all.length; i++ ) {
      height += this['$content'].rows.all[i].size;
    }
    let width = 0;
    for ( let i = 0; i < this['$content'].columns.all.length; i++ ) {
      width += this['$content'].columns.all[i].size;
    }
    this['$container']['$node'].style.width = width + 'px';
    this['$container']['$node'].style.height = height + 'px';
  }

  /**
   * Function for finding a row based on a vertical offset.
   *
   * @param {Object} params - Parameters for setting a page. Properties:
   *    name:   name of the dimension to search.
   *    offset: offset for which to search. Optional.
   *
   * @return {Object} - offsets.
   */
  findOffset( params ) {
    params = NSLHelper.parametersExtractor( params );
    let offset = 0;
    if ( params.dimension === 'height' ) {
      offset = this['$container']['$node'].parentNode.scrollTop;
    } else if ( params.dimension === 'width' ) {
      offset = this['$container']['$node'].parentNode.scrollLeft;
    } else if ( typeof params.offset !== 'undefined' ) {
      offset = params.offset;
    }
    return this.findOffsetRecursive({
      'max': this['$content'][params.name].max,
      'min': this['$content'][params.name].min,
      'name': params.name,
      'offset': offset,
    });
  }

  /**
   * Helper function for findOffset(). Recursively searches for the collection
   * element with the closest offset.
   *
   * @param {Object} params - Parameters for the function. Properties:
   *    max:    maximum element to search.
   *    min:    minimum element to search.
   *    name:   name of the dimension to search.
   *    offset: offset for which to search.
   *
   * @return {Object} - offsets.
   */
  findOffsetRecursive( params ) {
    params = NSLHelper.parametersExtractor( params );
    if ( ( params.max - params.min ) <= 1 ) {
      return params.min;
    }
    const pivot = params.min + NSLHelper.integerDivider({
      'numerator': params.max - params.min,
      'denominator': 2,
    });
    const offset = params.offset;
    const dimension = this['$content'][params.name].all;
    if ( dimension[pivot].offset < offset ) {
      return this.findOffsetRecursive({
        'max': params.max,
        'min': pivot,
        'name': params.name,
        'offset': offset,
      });
    } else {
      return this.findOffsetRecursive({
        'max': pivot,
        'min': params.min,
        'name': params.name,
        'offset': offset,
      });
    }
  }

  /**
   * Function for unsetting a page.
   *
   * @param {Object} params - Parameters for unsetting a page. Properties:
   *    data: Data to be displayed as a collection.
   */
  unsetPage( params ) {
    for ( let i = params.old.top; i < params.new.top; i++ ) {
      for ( let j = params.old.left; j < params.new.left; j++ ) {
        console.log( this['$content'].display[i][j] );
      }
      for ( let j = params.old.right; j < params.new.right; j++ ) {
        console.log('hello');
      }
      for ( let j = params.old.left; j <= params.old.right; j++ ) {
        if ( typeof this['$content'].display[j][i] !== 'undefined' ) {
          this['$content'].display[j][i].delete();
          delete this['$content'].display[j][i];
        }
      }
    }
    for ( let i = params.old.bottom; i < params.new.bottom; i++ ) {

    }
    for ( let i = params.old.left; i < params.new.left; i++ ) {

    }
    for ( let i = params.old.right; i < params.new.right; i++ ) {

    }
  }

  /**
   * Function for unsetting a single row.
   *
   * @param {Object} params - Parameters for unsetting a row. Properties:
   *    data: Data to be displayed as a collection.
   */
  unsetRow( params ) {

  }

  /**
   * Function for unsetting a single cell within a row.
   *
   * @param {Object} params - Parameters for unsetting a cell. Properties:
   *    data: Data to be displayed as a collection.
   */
  unsetCell( params ) {

  }

  /**
   * Function for getting the height of a collection element.
   *
   * @param {Object} element - NSLView object to get the height of. Optional. If
   *    blank, the current object isused.
   * @return {Number} - Display height of the object in pixels.
   */
  getHeight( element ) {
    if ( typeof element === 'undefined' ) {
      element = this['$container'];
    }
    return element['$node'].offsetHeight;
  }

  /**
   * Function for getting the width of a collection element.
   *
   * @param {Object} element - NSLView object to get the width of. Optional. If
   *    blank, the current object isused.
   * @return {Number} - Display width of the object in pixels.
   */
  getWidth( element ) {
    if ( typeof element === 'undefined' ) {
      element = this['$container'];
    }
    return element['$node'].offsetWidth;
  }

  /**
   * Function to perform actions when this object is notified by a publisher.
   *
   * @param {Object} params - Parameters for notifying the object.
   */
  onNotification( params ) {
    this['$content'].data = params['$data'];
    this.displayCollection( params['$data'].data );
  }
}
