"use strict";

import NSLHelper from '/nsljs/helper/nslhelper.js';

import NSLAbstract from './../nsl-abstract.js';

import NSLControllerViewEventAction from './nslcontroller-vieweventaction.js';

/*
 * This class supplies essential functions for the NSLController class and the child classes of this helper class.
 */
export default class NSLControllerAbstract extends NSLAbstract {

	constructor( parameters ) {
		super( parameters );
		this['$controllers'] = {};
		this['$models'] = {};
		this['$views'] = {};
		if( typeof parameters !== 'undefined' ) {
			var env = this;
			if( typeof parameters.controllers !== 'undefined' ) {
				Object.getOwnPropertyNames( parameters.controllers, function( e ) {
					env['$controllers'][parameters.controllers[e].id] = parameters.controllers[e];
				});
			}
			if( typeof parameters.models !== 'undefined' ) {
				Object.getOwnPropertyNames( parameters.models, function( e ) {
					env['$models'][parameters.models[e].id] = parameters.models[e];
				});
			}
			if( typeof parameters.views !== 'undefined' ) {
				for( var i = 0; i < parameters.views.length; i++ ) {
					env['$views'][parameters.views[i].id] = new NSLControllerViewEventAction( parameters.views[i] );
					parameters.views[i].addSubscriber( env );
				}
			}
		}
	}

	addView( parameters ) {
		parameters = NSLHelper.parametersExtractor( parameters );
		if( typeof parameters.view !== 'undefined' ) {
			if( Array.isArray( parameters.view ) ) {
				for( var i = 0; i < parameters.view.length; i++ ) {
					this.addViewView( parameters.view[i] );
				}
			} else {
				this.addViewView( parameters.view );
			}
		}
		if( typeof parameters.event !== 'undefined' ) {
			if( Array.isArray( parameters.event ) ) {
				if( Array.isArray( parameters.view ) ) {
					for( var i = 0; i < parameters.event.length; i++ ) {
						for( var j = 0; j < parameters.view.length; j++ ) {
							this.addViewViewEvent( parameters.view[j], parameters.event[i] );
							if( Array.isArray( parameters.action ) ) {
								for( var k = 0; k < parameters.action.length; k++ ) {
									this.addViewViewEventAction( parameters.view[j], parameters.event[i], parameters.action[k] );
								}
							} else {
								this.addViewViewEventAction( parameters.view[j], parameters.event[i], parameters.action );
							}
						}
					}
				} else {
					this.addViewViewEvent( parameters.view, parameters.event[i] );
					if( Array.isArray( parameters.action ) ) {
						for( var k = 0; j < parameters.action.length; k) {
							this.addViewViewEventAction( parameters.view, parameters.event[i], parameters.action[k] );
						}
					} else {
						this.addViewViewEventAction( parameters.view, parameters.event[i], parameters.action );
					}
				}
			} else {
				if( Array.isArray( parameters.view ) ) {
					for( var j = 0; j < parameters.view.length; j++ ) {
						this.addViewViewEvent( parameters.view[j], parameters.event );
						if( Array.isArray( parameters.action ) ) {
							for( var k = 0; k < parameters.action.length; k++ ) {
								this.addViewViewEventAction( parameters.view[j], parameters.event, parameters.action[k] );
							}
						} else {
							this.addViewViewEventAction( parameters.view[j], parameters.event, parameters.action );
						}
					}
				} else {
					this.addViewViewEvent( parameters.view, parameters.event );
					if( Array.isArray( parameters.action ) ) {
						for( var k = 0; j < parameters.action.length; k) {
							this.addViewViewEventAction( parameters.view, parameters.event, parameters.action[k] );
						}
					} else {
						this.addViewViewEventAction( parameters.view, parameters.event, parameters.action );
					}
				}
			}
		}
	}

	addViewView( view ) {
		if( view.constructor.name.lastIndexOf( 'NSLView', 0 ) === 0 ) {
			if( typeof this['$views'][view.id] === 'undefined' ) {
				this['$views'][view.id] = new NSLControllerViewEventAction( view );
				view.addSubscriber( this );
			}
		}
	}

	addViewViewEvent( view, event ) {
		this['$views'][view.id].events[event] = {};
		view.addEventListener( event );
	}

	addViewViewEventAction( view, event, action ) {
		this['$views'][view.id].events[event][action] = action;
	}

	removeView( parameters ) {
		delete this['$views'][view.id];
	}

	onNotification( parameters ) {
		var env = this;
		Object.getOwnPropertyNames( this['$views'][parameters.publisher.id].events[parameters.event] ).forEach( function( e ) {
			env['$views'][parameters.publisher.id].events[parameters.event][e]( parameters );
		});
	}

}
