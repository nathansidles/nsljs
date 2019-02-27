'use strict';

import NSLAbstract from './../nsl-abstract.js';

/*
 * This class supplies essential functions for the NSLView class and the child classes of this helper class.
 */
export default class NSLViewAbstract extends NSLAbstract {

  constructor( parameters ) {
    super( parameters );
  }

  getData( model ) {
    model.getData();
  }

}
