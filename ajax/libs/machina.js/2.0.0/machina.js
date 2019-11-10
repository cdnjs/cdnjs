/*!
 *  * machina - A library for creating powerful and flexible finite state machines. Loosely inspired by Erlang/OTP's gen_fsm behavior.
 *  * Author: Jim Cowart (http://ifandelse.com)
 *  * Version: v2.0.0
 *  * Url: http://machina-js.org/
 *  * License(s): 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["machina"] = factory(require("lodash"));
	else
		root["machina"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );
	var emitter = __webpack_require__( 2 );
	
	module.exports = _.merge( emitter.instance, {
		Fsm: __webpack_require__( 5 ),
		BehavioralFsm: __webpack_require__( 6 ),
		utils: __webpack_require__( 3 ),
		eventListeners: {
			newFsm: []
		}
	} );


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__( 3 );
	var _ = __webpack_require__( 1 );
	
	function getInstance() {
		return {
			emit: function( eventName ) {
				var args = utils.getLeaklessArgs( arguments );
				if ( this.eventListeners[ "*" ] ) {
					_.each( this.eventListeners[ "*" ], function( callback ) {
						if ( !this.useSafeEmit ) {
							callback.apply( this, args );
						} else {
							try {
								callback.apply( this, args );
							} catch ( exception ) {
								/* istanbul ignore else  */
								if ( console && typeof console.log !== "undefined" ) {
									console.log( exception.stack );
								}
							}
						}
					}, this );
				}
				if ( this.eventListeners[ eventName ] ) {
					_.each( this.eventListeners[ eventName ], function( callback ) {
						if ( !this.useSafeEmit ) {
							callback.apply( this, args.slice( 1 ) );
						} else {
							try {
								callback.apply( this, args.slice( 1 ) );
							} catch ( exception ) {
								/* istanbul ignore else  */
								if ( console && typeof console.log !== "undefined" ) {
									console.log( exception.stack );
								}
							}
						}
					}, this );
				}
			},
	
			on: function( eventName, callback ) {
				var self = this;
				self.eventListeners = self.eventListeners || { "*": [] };
				if ( !self.eventListeners[ eventName ] ) {
					self.eventListeners[ eventName ] = [];
				}
				self.eventListeners[ eventName ].push( callback );
				return {
					eventName: eventName,
					callback: callback,
					off: function() {
						self.off( eventName, callback );
					}
				};
			},
	
			off: function( eventName, callback ) {
				this.eventListeners = this.eventListeners || { "*": [] };
				if ( !eventName ) {
					this.eventListeners = {};
				} else {
					if ( callback ) {
						this.eventListeners[ eventName ] = _.without( this.eventListeners[ eventName ], callback );
					} else {
						this.eventListeners[ eventName ] = [];
					}
				}
			}
		};
	}
	
	module.exports = {
		getInstance: getInstance,
		instance: getInstance()
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var slice = [].slice;
	var events = __webpack_require__( 4 );
	var _ = __webpack_require__( 1 );
	
	var makeFsmNamespace = ( function() {
		var machinaCount = 0;
		return function() {
			return "fsm." + machinaCount++;
		};
	} )();
	
	function getDefaultBehavioralOptions() {
		return {
			initialState: "uninitialized",
			eventListeners: {
				"*": []
			},
			states: {},
			namespace: makeFsmNamespace(),
			useSafeEmit: false,
			hierarchy: {},
			pendingDelegations: {}
		};
	}
	
	function getDefaultClientMeta() {
		return {
			inputQueue: [],
			targetReplayState: "",
			state: undefined,
			priorState: undefined,
			priorAction: "",
			currentAction: "",
			currentActionArgs: undefined,
			inExitHandler: false
		};
	}
	
	function getLeaklessArgs( args, startIdx ) {
		var result = [];
		for ( var i = ( startIdx || 0 ); i < args.length; i++ ) {
			result[ i ] = args[ i ];
		}
		return result;
	}
	/*
		handle ->
			child = stateObj._child && stateObj._child.instance;
	
		transition ->
			newStateObj._child = getChildFsmInstance( newStateObj._child );
			child = newStateObj._child && newStateObj._child.instance;
	*/
	function getChildFsmInstance( config ) {
		if ( !config ) {
			return;
		}
		var childFsmDefinition = {};
		if ( typeof config === "object" ) {
			// is this a config object with a factory?
			if ( config.factory ) {
				childFsmDefinition = config;
				childFsmDefinition.instance = childFsmDefinition.factory();
			} else {
				// assuming this is a machina instance
				childFsmDefinition.factory = function() {
					return config;
				};
			}
		} else if ( typeof config === "function" ) {
			childFsmDefinition.factory = config;
		}
		childFsmDefinition.instance = childFsmDefinition.factory();
		return childFsmDefinition;
	}
	
	function listenToChild( fsm, child ) {
		// Need to investigate potential for discarded event
		// listener memory leak in long-running, deeply-nested hierarchies.
		return child.on( "*", function( eventName, data ) {
			switch ( eventName ) {
				case events.NO_HANDLER:
					if ( !data.ticket && !data.delegated && data.namespace !== fsm.namespace ) {
						// Ok - we're dealing w/ a child handling input that should bubble up
						data.args[ 1 ].bubbling = true;
					}
					// we do NOT bubble _reset inputs up to the parent
					if ( data.inputType !== "_reset" ) {
						fsm.handle.apply( fsm, data.args );
					}
					break;
				case events.HANDLING :
					var ticket = data.ticket;
					if ( ticket && fsm.pendingDelegations[ ticket ] ) {
						delete fsm.pendingDelegations[ ticket ];
					}
					fsm.emit( eventName, data ); // possibly transform payload?
					break;
				default:
					fsm.emit( eventName, data ); // possibly transform payload?
					break;
			}
		} );
	}
	
	// _machKeys are members we want to track across the prototype chain of an extended FSM constructor
	// Since we want to eventually merge the aggregate of those values onto the instance so that FSMs
	// that share the same extended prototype won't share state *on* those prototypes.
	var _machKeys = [ "states", "initialState" ];
	var extend = function( protoProps, staticProps ) {
		var parent = this;
		var fsm; // placeholder for instance constructor
		var machObj = {}; // object used to hold initialState & states from prototype for instance-level merging
		var Ctor = function() {}; // placeholder ctor function used to insert level in prototype chain
	
		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		if ( protoProps && protoProps.hasOwnProperty( "constructor" ) ) {
			fsm = protoProps.constructor;
		} else {
			// The default machina constructor (when using inheritance) creates a
			// deep copy of the states/initialState values from the prototype and
			// extends them over the instance so that they'll be instance-level.
			// If an options arg (args[0]) is passed in, a states or intialState
			// value will be preferred over any data pulled up from the prototype.
			fsm = function() {
				var args = slice.call( arguments, 0 );
				args[ 0 ] = args[ 0 ] || {};
				var blendedState;
				var instanceStates = args[ 0 ].states || {};
				blendedState = _.merge( _.cloneDeep( machObj ), { states: instanceStates } );
				blendedState.initialState = args[ 0 ].initialState || this.initialState;
				_.extend( args[ 0 ], blendedState );
				parent.apply( this, args );
			};
		}
	
		// Inherit class (static) properties from parent.
		_.merge( fsm, parent );
	
		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function.
		Ctor.prototype = parent.prototype;
		fsm.prototype = new Ctor();
	
		// Add prototype properties (instance properties) to the subclass,
		// if supplied.
		if ( protoProps ) {
			_.extend( fsm.prototype, protoProps );
			_.merge( machObj, _.transform( protoProps, function( accum, val, key ) {
				if ( _machKeys.indexOf( key ) !== -1 ) {
					accum[ key ] = val;
				}
			} ) );
		}
	
		// Add static properties to the constructor function, if supplied.
		if ( staticProps ) {
			_.merge( fsm, staticProps );
		}
	
		// Correctly set child's `prototype.constructor`.
		fsm.prototype.constructor = fsm;
	
		// Set a convenience property in case the parent's prototype is needed later.
		fsm.__super__ = parent.prototype;
		return fsm;
	};
	
	function createUUID() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for ( var i = 0; i < 36; i++ ) {
			s[ i ] = hexDigits.substr( Math.floor( Math.random() * 0x10 ), 1 );
		}
		s[ 14 ] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		/* jshint ignore:start */
		s[ 19 ] = hexDigits.substr( ( s[ 19 ] & 0x3 ) | 0x8, 1 ); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		/* jshint ignore:end */
		s[ 8 ] = s[ 13 ] = s[ 18 ] = s[ 23 ] = "-";
		return s.join( "" );
	}
	
	module.exports = {
		createUUID: createUUID,
		extend: extend,
		getDefaultBehavioralOptions: getDefaultBehavioralOptions,
		getDefaultOptions: getDefaultBehavioralOptions,
		getDefaultClientMeta: getDefaultClientMeta,
		getChildFsmInstance: getChildFsmInstance,
		getLeaklessArgs: getLeaklessArgs,
		listenToChild: listenToChild,
		makeFsmNamespace: makeFsmNamespace
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		NEXT_TRANSITION: "transition",
		HANDLING: "handling",
		HANDLED: "handled",
		NO_HANDLER: "nohandler",
		TRANSITION: "transition",
		TRANSITIONED: "transitioned",
		INVALID_STATE: "invalidstate",
		DEFERRED: "deferred",
		NEW_FSM: "newfsm"
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var BehavioralFsm = __webpack_require__( 6 );
	var utils = __webpack_require__( 3 );
	var _ = __webpack_require__( 1 );
	
	var Fsm = {
		constructor: function() {
			BehavioralFsm.apply( this, arguments );
			this.ensureClientMeta();
		},
		initClient: function initClient() {
			var initialState = this.initialState;
			if ( !initialState ) {
				throw new Error( "You must specify an initial state for this FSM" );
			}
			if ( !this.states[ initialState ] ) {
				throw new Error( "The initial state specified does not exist in the states object." );
			}
			this.transition( initialState );
		},
		ensureClientMeta: function ensureClientMeta() {
			if ( !this._stamped ) {
				this._stamped = true;
				_.defaults( this, _.cloneDeep( utils.getDefaultClientMeta() ) );
				this.initClient();
			}
			return this;
		},
	
		ensureClientArg: function( args ) {
			var _args = args;
			// we need to test the args and verify that if a client arg has
			// been passed, it must be this FSM instance (this isn't a behavioral FSM)
			if ( typeof _args[ 0 ] === "object" && !( "inputType" in _args[ 0 ] ) && _args[ 0 ] !== this ) {
				_args.splice( 0, 1, this );
			} else if ( typeof _args[ 0 ] !== "object" || ( typeof _args[ 0 ] === "object" && ( "inputType" in _args[ 0 ] ) ) ) {
				_args.unshift( this );
			}
			return _args;
		},
	
		getHandlerArgs: function( args, isCatchAll ) {
			// index 0 is the client, index 1 is inputType
			// if we're in a catch-all handler, input type needs to be included in the args
			// inputType might be an object, so we need to just get the inputType string if so
			var _args = args;
			var input = _args[ 1 ];
			if ( typeof inputType === "object" ) {
				_args.splice( 1, 1, input.inputType );
			}
			return isCatchAll ?
				_args.slice( 1 ) :
				_args.slice( 2 );
		},
	
		getSystemHandlerArgs: function( args, client ) {
			return args;
		},
	
		// "classic" machina FSM do not emit the client property on events (which would be the FSM itself)
		buildEventPayload: function() {
			var args = this.ensureClientArg( utils.getLeaklessArgs( arguments ) );
			var data = args[ 1 ];
			if ( _.isPlainObject( data ) ) {
				return _.extend( data, { namespace: this.namespace } );
			} else {
				return { data: data || null, namespace: this.namespace };
			}
		}
	};
	
	_.each( [
		"handle",
		"transition",
		"deferUntilTransition",
		"processQueue",
		"clearQueue"
	], function( methodWithClientInjected ) {
		Fsm[ methodWithClientInjected ] = function() {
			var args = this.ensureClientArg( utils.getLeaklessArgs( arguments ) );
			return BehavioralFsm.prototype[ methodWithClientInjected ].apply( this, args );
		};
	} );
	
	Fsm = BehavioralFsm.extend( Fsm );
	
	module.exports = Fsm;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );
	var utils = __webpack_require__( 3 );
	var emitter = __webpack_require__( 2 );
	var topLevelEmitter = emitter.instance;
	var events = __webpack_require__( 4 );
	
	var MACHINA_PROP = "__machina__";
	
	function BehavioralFsm( options ) {
		_.extend( this, options );
		_.defaults( this, utils.getDefaultBehavioralOptions() );
		this.initialize.apply( this, arguments );
		topLevelEmitter.emit( events.NEW_FSM, this );
	}
	
	_.extend( BehavioralFsm.prototype, {
		initialize: function() {},
	
		initClient: function initClient( client ) {
			var initialState = this.initialState;
			if ( !initialState ) {
				throw new Error( "You must specify an initial state for this FSM" );
			}
			if ( !this.states[ initialState ] ) {
				throw new Error( "The initial state specified does not exist in the states object." );
			}
			this.transition( client, initialState );
		},
	
		configForState: function configForState( newState ) {
			var newStateObj = this.states[ newState ];
			var child;
			_.each( this.hierarchy, function( childListener, key ) {
				if ( childListener && typeof childListener.off === "function" ) {
					childListener.off();
				}
			} );
	
			if ( newStateObj._child ) {
				newStateObj._child = utils.getChildFsmInstance( newStateObj._child );
				child = newStateObj._child && newStateObj._child.instance;
				this.hierarchy[ child.namespace ] = utils.listenToChild( this, child );
			}
	
			return child;
		},
	
		ensureClientMeta: function ensureClientMeta( client ) {
			if ( typeof client !== "object" ) {
				throw new Error( "An FSM client must be an object." );
			}
			client[ MACHINA_PROP ] = client[ MACHINA_PROP ] || {};
			if ( !client[ MACHINA_PROP ][ this.namespace ] ) {
				client[ MACHINA_PROP ][ this.namespace ] = _.cloneDeep( utils.getDefaultClientMeta() );
				this.initClient( client );
			}
			return client[ MACHINA_PROP ][ this.namespace ];
		},
	
		buildEventPayload: function( client, data ) {
			if ( _.isPlainObject( data ) ) {
				return _.extend( data, { client: client, namespace: this.namespace } );
			} else {
				return { client: client, data: data || null, namespace: this.namespace };
			}
		},
	
		getHandlerArgs: function( args, isCatchAll ) {
			// index 0 is the client, index 1 is inputType
			// if we're in a catch-all handler, input type needs to be included in the args
			// inputType might be an object, so we need to just get the inputType string if so
			var _args = args.slice( 0 );
			var input = _args[ 1 ];
			if ( typeof input === "object" ) {
				_args.splice( 1, 1, input.inputType );
			}
			return isCatchAll ?
				_args :
				[ _args[ 0 ] ].concat( _args.slice( 2 ) );
		},
	
		getSystemHandlerArgs: function( args, client ) {
			return [ client ].concat( args );
		},
	
		handle: function( client, input ) {
			var inputDef = input;
			if ( typeof input === "undefined" ) {
				throw new Error( "The input argument passed to the FSM's handle method is undefined. Did you forget to pass the input name?" );
			}
			if ( typeof input === "string" ) {
				inputDef = { inputType: input, delegated: false, ticket: undefined };
			}
			var clientMeta = this.ensureClientMeta( client );
			var args = utils.getLeaklessArgs( arguments );
			if ( typeof input !== "object" ) {
				args.splice( 1, 1, inputDef );
			}
			clientMeta.currentActionArgs = args.slice( 1 );
			var currentState = clientMeta.state;
			var stateObj = this.states[ currentState ];
			var handlerName;
			var handler;
			var isCatchAll = false;
			var child;
			var result;
			var action;
			if ( !clientMeta.inExitHandler ) {
				child = this.configForState( currentState );
				if ( child && !this.pendingDelegations[ inputDef.ticket ] && !inputDef.bubbling ) {
					inputDef.ticket = ( inputDef.ticket || utils.createUUID() );
					inputDef.delegated = true;
					this.pendingDelegations[ inputDef.ticket ] = { delegatedTo: child.namespace };
					// WARNING - returning a value from `handle` on child FSMs is not really supported.
					// If you need to return values from child FSM input handlers, use events instead.
					result = child.handle.apply( child, args );
				} else {
					if ( inputDef.ticket && this.pendingDelegations[ inputDef.ticket ] ) {
						delete this.pendingDelegations[ inputDef.ticket ];
					}
					handlerName = stateObj[ inputDef.inputType ] ? inputDef.inputType : "*";
					isCatchAll = ( handlerName === "*" );
					handler = ( stateObj[ handlerName ] || this[ handlerName ] ) || this[ "*" ];
					action = clientMeta.state + "." + handlerName;
					clientMeta.currentAction = action;
					var eventPayload = this.buildEventPayload(
						client,
						{ inputType: inputDef.inputType, delegated: inputDef.delegated, ticket: inputDef.ticket }
					);
					if ( !handler ) {
						this.emit( events.NO_HANDLER, _.extend( { args: args }, eventPayload ) );
					} else {
						this.emit( events.HANDLING, eventPayload );
						if ( typeof handler === "function" ) {
							result = handler.apply( this, this.getHandlerArgs( args, isCatchAll ) );
						} else {
							result = handler;
							this.transition( client, handler );
						}
						this.emit( events.HANDLED, eventPayload );
					}
					clientMeta.priorAction = clientMeta.currentAction;
					clientMeta.currentAction = "";
					clientMeta.currentActionArgs = undefined;
				}
			}
			return result;
		},
	
		transition: function( client, newState ) {
			var clientMeta = this.ensureClientMeta( client );
			var curState = clientMeta.state;
			var curStateObj = this.states[ curState ];
			var newStateObj = this.states[ newState ];
			var child;
			var args = utils.getLeaklessArgs( arguments ).slice( 2 );
			if ( !clientMeta.inExitHandler && newState !== curState ) {
				if ( newStateObj ) {
					child = this.configForState( newState );
					if ( curStateObj && curStateObj._onExit ) {
						clientMeta.inExitHandler = true;
						curStateObj._onExit.call( this, client );
						clientMeta.inExitHandler = false;
					}
					clientMeta.targetReplayState = newState;
					clientMeta.priorState = curState;
					clientMeta.state = newState;
					var eventPayload = this.buildEventPayload( client, {
						fromState: clientMeta.priorState,
						action: clientMeta.currentAction,
						toState: newState
					} );
					this.emit( events.TRANSITION, eventPayload );
					if ( newStateObj._onEnter ) {
						newStateObj._onEnter.apply( this, this.getSystemHandlerArgs( args, client ) );
						this.emit( events.TRANSITIONED, eventPayload );
					}
					if ( child ) {
						child.handle( client, "_reset" );
					}
	
					if ( clientMeta.targetReplayState === newState ) {
						this.processQueue( client, events.NEXT_TRANSITION );
					}
					return;
				}
				this.emit( events.INVALID_STATE, this.buildEventPayload( client, {
					state: clientMeta.state,
					attemptedState: newState
				} ) );
			}
		},
	
		deferUntilTransition: function( client, stateName ) {
			var clientMeta = this.ensureClientMeta( client );
			if ( clientMeta.currentActionArgs ) {
				var queued = {
					type: events.NEXT_TRANSITION,
					untilState: stateName,
					args: clientMeta.currentActionArgs
				};
				clientMeta.inputQueue.push( queued );
				var eventPayload = this.buildEventPayload( client, {
					state: clientMeta.state,
					queuedArgs: queued
				} );
				this.emit( events.DEFERRED, eventPayload );
			}
		},
	
		deferAndTransition: function( client, stateName ) {
			this.deferUntilTransition( client, stateName );
			this.transition( client, stateName );
		},
	
		processQueue: function( client ) {
			var clientMeta = this.ensureClientMeta( client );
			var filterFn = function( item ) {
				return ( ( !item.untilState ) || ( item.untilState === clientMeta.state ) );
			};
			var toProcess = _.filter( clientMeta.inputQueue, filterFn );
			clientMeta.inputQueue = _.difference( clientMeta.inputQueue, toProcess );
			_.each( toProcess, function( item ) {
				this.handle.apply( this, [ client ].concat( item.args ) );
			}, this );
		},
	
		clearQueue: function( client, name ) {
			var clientMeta = this.ensureClientMeta( client );
			if ( !name ) {
				clientMeta.inputQueue = [];
			} else {
				var filter = function( evnt ) {
					return ( name ? evnt.untilState !== name : true );
				};
				clientMeta.inputQueue = _.filter( clientMeta.inputQueue, filter );
			}
		},
	
		compositeState: function( client ) {
			var clientMeta = this.ensureClientMeta( client );
			var state = clientMeta.state;
			var child = this.states[state]._child && this.states[state]._child.instance;
			if ( child ) {
				state += "." + child.compositeState( client );
			}
			return state;
		}
	}, emitter.getInstance() );
	
	BehavioralFsm.extend = utils.extend;
	
	module.exports = BehavioralFsm;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmYjkzODgzNmEwNGY2Y2Y0NTkzZSIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjaGluYS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIixcImFtZFwiOlwibG9kYXNoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9lbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9Gc20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JlaGF2aW9yYWxGc20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQ1ZELGdEOzs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBIiwiZmlsZSI6Im1hY2hpbmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJsb2Rhc2hcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wibG9kYXNoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm1hY2hpbmFcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJsb2Rhc2hcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm1hY2hpbmFcIl0gPSBmYWN0b3J5KHJvb3RbXCJfXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmYjkzODgzNmEwNGY2Y2Y0NTkzZVxuICoqLyIsInZhciBfID0gcmVxdWlyZSggXCJsb2Rhc2hcIiApO1xudmFyIGVtaXR0ZXIgPSByZXF1aXJlKCBcIi4vZW1pdHRlclwiICk7XG5cbm1vZHVsZS5leHBvcnRzID0gXy5tZXJnZSggZW1pdHRlci5pbnN0YW5jZSwge1xuXHRGc206IHJlcXVpcmUoIFwiLi9Gc21cIiApLFxuXHRCZWhhdmlvcmFsRnNtOiByZXF1aXJlKCBcIi4vQmVoYXZpb3JhbEZzbVwiICksXG5cdHV0aWxzOiByZXF1aXJlKCBcIi4vdXRpbHNcIiApLFxuXHRldmVudExpc3RlbmVyczoge1xuXHRcdG5ld0ZzbTogW11cblx0fVxufSApO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9tYWNoaW5hLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIl9cIixcImNvbW1vbmpzXCI6XCJsb2Rhc2hcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoXCIsXCJhbWRcIjpcImxvZGFzaFwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB1dGlscyA9IHJlcXVpcmUoIFwiLi91dGlsc1wiICk7XG52YXIgXyA9IHJlcXVpcmUoIFwibG9kYXNoXCIgKTtcblxuZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKSB7XG5cdHJldHVybiB7XG5cdFx0ZW1pdDogZnVuY3Rpb24oIGV2ZW50TmFtZSApIHtcblx0XHRcdHZhciBhcmdzID0gdXRpbHMuZ2V0TGVha2xlc3NBcmdzKCBhcmd1bWVudHMgKTtcblx0XHRcdGlmICggdGhpcy5ldmVudExpc3RlbmVyc1sgXCIqXCIgXSApIHtcblx0XHRcdFx0Xy5lYWNoKCB0aGlzLmV2ZW50TGlzdGVuZXJzWyBcIipcIiBdLCBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0aWYgKCAhdGhpcy51c2VTYWZlRW1pdCApIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmFwcGx5KCB0aGlzLCBhcmdzICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrLmFwcGx5KCB0aGlzLCBhcmdzICk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoICggZXhjZXB0aW9uICkge1xuXHRcdFx0XHRcdFx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAgKi9cblx0XHRcdFx0XHRcdFx0aWYgKCBjb25zb2xlICYmIHR5cGVvZiBjb25zb2xlLmxvZyAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyggZXhjZXB0aW9uLnN0YWNrICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIHRoaXMgKTtcblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5ldmVudExpc3RlbmVyc1sgZXZlbnROYW1lIF0gKSB7XG5cdFx0XHRcdF8uZWFjaCggdGhpcy5ldmVudExpc3RlbmVyc1sgZXZlbnROYW1lIF0sIGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRpZiAoICF0aGlzLnVzZVNhZmVFbWl0ICkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suYXBwbHkoIHRoaXMsIGFyZ3Muc2xpY2UoIDEgKSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjay5hcHBseSggdGhpcywgYXJncy5zbGljZSggMSApICk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoICggZXhjZXB0aW9uICkge1xuXHRcdFx0XHRcdFx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAgKi9cblx0XHRcdFx0XHRcdFx0aWYgKCBjb25zb2xlICYmIHR5cGVvZiBjb25zb2xlLmxvZyAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyggZXhjZXB0aW9uLnN0YWNrICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIHRoaXMgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0b246IGZ1bmN0aW9uKCBldmVudE5hbWUsIGNhbGxiYWNrICkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0c2VsZi5ldmVudExpc3RlbmVycyA9IHNlbGYuZXZlbnRMaXN0ZW5lcnMgfHwgeyBcIipcIjogW10gfTtcblx0XHRcdGlmICggIXNlbGYuZXZlbnRMaXN0ZW5lcnNbIGV2ZW50TmFtZSBdICkge1xuXHRcdFx0XHRzZWxmLmV2ZW50TGlzdGVuZXJzWyBldmVudE5hbWUgXSA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0c2VsZi5ldmVudExpc3RlbmVyc1sgZXZlbnROYW1lIF0ucHVzaCggY2FsbGJhY2sgKTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGV2ZW50TmFtZTogZXZlbnROYW1lLFxuXHRcdFx0XHRjYWxsYmFjazogY2FsbGJhY2ssXG5cdFx0XHRcdG9mZjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2VsZi5vZmYoIGV2ZW50TmFtZSwgY2FsbGJhY2sgKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0b2ZmOiBmdW5jdGlvbiggZXZlbnROYW1lLCBjYWxsYmFjayApIHtcblx0XHRcdHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzIHx8IHsgXCIqXCI6IFtdIH07XG5cdFx0XHRpZiAoICFldmVudE5hbWUgKSB7XG5cdFx0XHRcdHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0dGhpcy5ldmVudExpc3RlbmVyc1sgZXZlbnROYW1lIF0gPSBfLndpdGhvdXQoIHRoaXMuZXZlbnRMaXN0ZW5lcnNbIGV2ZW50TmFtZSBdLCBjYWxsYmFjayApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZXZlbnRMaXN0ZW5lcnNbIGV2ZW50TmFtZSBdID0gW107XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRnZXRJbnN0YW5jZTogZ2V0SW5zdGFuY2UsXG5cdGluc3RhbmNlOiBnZXRJbnN0YW5jZSgpXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9lbWl0dGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgZXZlbnRzID0gcmVxdWlyZSggXCIuL2V2ZW50cy5qc1wiICk7XG52YXIgXyA9IHJlcXVpcmUoIFwibG9kYXNoXCIgKTtcblxudmFyIG1ha2VGc21OYW1lc3BhY2UgPSAoIGZ1bmN0aW9uKCkge1xuXHR2YXIgbWFjaGluYUNvdW50ID0gMDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBcImZzbS5cIiArIG1hY2hpbmFDb3VudCsrO1xuXHR9O1xufSApKCk7XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRCZWhhdmlvcmFsT3B0aW9ucygpIHtcblx0cmV0dXJuIHtcblx0XHRpbml0aWFsU3RhdGU6IFwidW5pbml0aWFsaXplZFwiLFxuXHRcdGV2ZW50TGlzdGVuZXJzOiB7XG5cdFx0XHRcIipcIjogW11cblx0XHR9LFxuXHRcdHN0YXRlczoge30sXG5cdFx0bmFtZXNwYWNlOiBtYWtlRnNtTmFtZXNwYWNlKCksXG5cdFx0dXNlU2FmZUVtaXQ6IGZhbHNlLFxuXHRcdGhpZXJhcmNoeToge30sXG5cdFx0cGVuZGluZ0RlbGVnYXRpb25zOiB7fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0Q2xpZW50TWV0YSgpIHtcblx0cmV0dXJuIHtcblx0XHRpbnB1dFF1ZXVlOiBbXSxcblx0XHR0YXJnZXRSZXBsYXlTdGF0ZTogXCJcIixcblx0XHRzdGF0ZTogdW5kZWZpbmVkLFxuXHRcdHByaW9yU3RhdGU6IHVuZGVmaW5lZCxcblx0XHRwcmlvckFjdGlvbjogXCJcIixcblx0XHRjdXJyZW50QWN0aW9uOiBcIlwiLFxuXHRcdGN1cnJlbnRBY3Rpb25BcmdzOiB1bmRlZmluZWQsXG5cdFx0aW5FeGl0SGFuZGxlcjogZmFsc2Vcblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0TGVha2xlc3NBcmdzKCBhcmdzLCBzdGFydElkeCApIHtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHRmb3IgKCB2YXIgaSA9ICggc3RhcnRJZHggfHwgMCApOyBpIDwgYXJncy5sZW5ndGg7IGkrKyApIHtcblx0XHRyZXN1bHRbIGkgXSA9IGFyZ3NbIGkgXTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuLypcblx0aGFuZGxlIC0+XG5cdFx0Y2hpbGQgPSBzdGF0ZU9iai5fY2hpbGQgJiYgc3RhdGVPYmouX2NoaWxkLmluc3RhbmNlO1xuXG5cdHRyYW5zaXRpb24gLT5cblx0XHRuZXdTdGF0ZU9iai5fY2hpbGQgPSBnZXRDaGlsZEZzbUluc3RhbmNlKCBuZXdTdGF0ZU9iai5fY2hpbGQgKTtcblx0XHRjaGlsZCA9IG5ld1N0YXRlT2JqLl9jaGlsZCAmJiBuZXdTdGF0ZU9iai5fY2hpbGQuaW5zdGFuY2U7XG4qL1xuZnVuY3Rpb24gZ2V0Q2hpbGRGc21JbnN0YW5jZSggY29uZmlnICkge1xuXHRpZiAoICFjb25maWcgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBjaGlsZEZzbURlZmluaXRpb24gPSB7fTtcblx0aWYgKCB0eXBlb2YgY29uZmlnID09PSBcIm9iamVjdFwiICkge1xuXHRcdC8vIGlzIHRoaXMgYSBjb25maWcgb2JqZWN0IHdpdGggYSBmYWN0b3J5P1xuXHRcdGlmICggY29uZmlnLmZhY3RvcnkgKSB7XG5cdFx0XHRjaGlsZEZzbURlZmluaXRpb24gPSBjb25maWc7XG5cdFx0XHRjaGlsZEZzbURlZmluaXRpb24uaW5zdGFuY2UgPSBjaGlsZEZzbURlZmluaXRpb24uZmFjdG9yeSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBhc3N1bWluZyB0aGlzIGlzIGEgbWFjaGluYSBpbnN0YW5jZVxuXHRcdFx0Y2hpbGRGc21EZWZpbml0aW9uLmZhY3RvcnkgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGNvbmZpZztcblx0XHRcdH07XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCB0eXBlb2YgY29uZmlnID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cdFx0Y2hpbGRGc21EZWZpbml0aW9uLmZhY3RvcnkgPSBjb25maWc7XG5cdH1cblx0Y2hpbGRGc21EZWZpbml0aW9uLmluc3RhbmNlID0gY2hpbGRGc21EZWZpbml0aW9uLmZhY3RvcnkoKTtcblx0cmV0dXJuIGNoaWxkRnNtRGVmaW5pdGlvbjtcbn1cblxuZnVuY3Rpb24gbGlzdGVuVG9DaGlsZCggZnNtLCBjaGlsZCApIHtcblx0Ly8gTmVlZCB0byBpbnZlc3RpZ2F0ZSBwb3RlbnRpYWwgZm9yIGRpc2NhcmRlZCBldmVudFxuXHQvLyBsaXN0ZW5lciBtZW1vcnkgbGVhayBpbiBsb25nLXJ1bm5pbmcsIGRlZXBseS1uZXN0ZWQgaGllcmFyY2hpZXMuXG5cdHJldHVybiBjaGlsZC5vbiggXCIqXCIsIGZ1bmN0aW9uKCBldmVudE5hbWUsIGRhdGEgKSB7XG5cdFx0c3dpdGNoICggZXZlbnROYW1lICkge1xuXHRcdFx0Y2FzZSBldmVudHMuTk9fSEFORExFUjpcblx0XHRcdFx0aWYgKCAhZGF0YS50aWNrZXQgJiYgIWRhdGEuZGVsZWdhdGVkICYmIGRhdGEubmFtZXNwYWNlICE9PSBmc20ubmFtZXNwYWNlICkge1xuXHRcdFx0XHRcdC8vIE9rIC0gd2UncmUgZGVhbGluZyB3LyBhIGNoaWxkIGhhbmRsaW5nIGlucHV0IHRoYXQgc2hvdWxkIGJ1YmJsZSB1cFxuXHRcdFx0XHRcdGRhdGEuYXJnc1sgMSBdLmJ1YmJsaW5nID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyB3ZSBkbyBOT1QgYnViYmxlIF9yZXNldCBpbnB1dHMgdXAgdG8gdGhlIHBhcmVudFxuXHRcdFx0XHRpZiAoIGRhdGEuaW5wdXRUeXBlICE9PSBcIl9yZXNldFwiICkge1xuXHRcdFx0XHRcdGZzbS5oYW5kbGUuYXBwbHkoIGZzbSwgZGF0YS5hcmdzICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIGV2ZW50cy5IQU5ETElORyA6XG5cdFx0XHRcdHZhciB0aWNrZXQgPSBkYXRhLnRpY2tldDtcblx0XHRcdFx0aWYgKCB0aWNrZXQgJiYgZnNtLnBlbmRpbmdEZWxlZ2F0aW9uc1sgdGlja2V0IF0gKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIGZzbS5wZW5kaW5nRGVsZWdhdGlvbnNbIHRpY2tldCBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZzbS5lbWl0KCBldmVudE5hbWUsIGRhdGEgKTsgLy8gcG9zc2libHkgdHJhbnNmb3JtIHBheWxvYWQ/XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0ZnNtLmVtaXQoIGV2ZW50TmFtZSwgZGF0YSApOyAvLyBwb3NzaWJseSB0cmFuc2Zvcm0gcGF5bG9hZD9cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9ICk7XG59XG5cbi8vIF9tYWNoS2V5cyBhcmUgbWVtYmVycyB3ZSB3YW50IHRvIHRyYWNrIGFjcm9zcyB0aGUgcHJvdG90eXBlIGNoYWluIG9mIGFuIGV4dGVuZGVkIEZTTSBjb25zdHJ1Y3RvclxuLy8gU2luY2Ugd2Ugd2FudCB0byBldmVudHVhbGx5IG1lcmdlIHRoZSBhZ2dyZWdhdGUgb2YgdGhvc2UgdmFsdWVzIG9udG8gdGhlIGluc3RhbmNlIHNvIHRoYXQgRlNNc1xuLy8gdGhhdCBzaGFyZSB0aGUgc2FtZSBleHRlbmRlZCBwcm90b3R5cGUgd29uJ3Qgc2hhcmUgc3RhdGUgKm9uKiB0aG9zZSBwcm90b3R5cGVzLlxudmFyIF9tYWNoS2V5cyA9IFsgXCJzdGF0ZXNcIiwgXCJpbml0aWFsU3RhdGVcIiBdO1xudmFyIGV4dGVuZCA9IGZ1bmN0aW9uKCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcyApIHtcblx0dmFyIHBhcmVudCA9IHRoaXM7XG5cdHZhciBmc207IC8vIHBsYWNlaG9sZGVyIGZvciBpbnN0YW5jZSBjb25zdHJ1Y3RvclxuXHR2YXIgbWFjaE9iaiA9IHt9OyAvLyBvYmplY3QgdXNlZCB0byBob2xkIGluaXRpYWxTdGF0ZSAmIHN0YXRlcyBmcm9tIHByb3RvdHlwZSBmb3IgaW5zdGFuY2UtbGV2ZWwgbWVyZ2luZ1xuXHR2YXIgQ3RvciA9IGZ1bmN0aW9uKCkge307IC8vIHBsYWNlaG9sZGVyIGN0b3IgZnVuY3Rpb24gdXNlZCB0byBpbnNlcnQgbGV2ZWwgaW4gcHJvdG90eXBlIGNoYWluXG5cblx0Ly8gVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGUgbmV3IHN1YmNsYXNzIGlzIGVpdGhlciBkZWZpbmVkIGJ5IHlvdVxuXHQvLyAodGhlIFwiY29uc3RydWN0b3JcIiBwcm9wZXJ0eSBpbiB5b3VyIGBleHRlbmRgIGRlZmluaXRpb24pLCBvciBkZWZhdWx0ZWRcblx0Ly8gYnkgdXMgdG8gc2ltcGx5IGNhbGwgdGhlIHBhcmVudCdzIGNvbnN0cnVjdG9yLlxuXHRpZiAoIHByb3RvUHJvcHMgJiYgcHJvdG9Qcm9wcy5oYXNPd25Qcm9wZXJ0eSggXCJjb25zdHJ1Y3RvclwiICkgKSB7XG5cdFx0ZnNtID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3Rvcjtcblx0fSBlbHNlIHtcblx0XHQvLyBUaGUgZGVmYXVsdCBtYWNoaW5hIGNvbnN0cnVjdG9yICh3aGVuIHVzaW5nIGluaGVyaXRhbmNlKSBjcmVhdGVzIGFcblx0XHQvLyBkZWVwIGNvcHkgb2YgdGhlIHN0YXRlcy9pbml0aWFsU3RhdGUgdmFsdWVzIGZyb20gdGhlIHByb3RvdHlwZSBhbmRcblx0XHQvLyBleHRlbmRzIHRoZW0gb3ZlciB0aGUgaW5zdGFuY2Ugc28gdGhhdCB0aGV5J2xsIGJlIGluc3RhbmNlLWxldmVsLlxuXHRcdC8vIElmIGFuIG9wdGlvbnMgYXJnIChhcmdzWzBdKSBpcyBwYXNzZWQgaW4sIGEgc3RhdGVzIG9yIGludGlhbFN0YXRlXG5cdFx0Ly8gdmFsdWUgd2lsbCBiZSBwcmVmZXJyZWQgb3ZlciBhbnkgZGF0YSBwdWxsZWQgdXAgZnJvbSB0aGUgcHJvdG90eXBlLlxuXHRcdGZzbSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGFyZ3MgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMsIDAgKTtcblx0XHRcdGFyZ3NbIDAgXSA9IGFyZ3NbIDAgXSB8fCB7fTtcblx0XHRcdHZhciBibGVuZGVkU3RhdGU7XG5cdFx0XHR2YXIgaW5zdGFuY2VTdGF0ZXMgPSBhcmdzWyAwIF0uc3RhdGVzIHx8IHt9O1xuXHRcdFx0YmxlbmRlZFN0YXRlID0gXy5tZXJnZSggXy5jbG9uZURlZXAoIG1hY2hPYmogKSwgeyBzdGF0ZXM6IGluc3RhbmNlU3RhdGVzIH0gKTtcblx0XHRcdGJsZW5kZWRTdGF0ZS5pbml0aWFsU3RhdGUgPSBhcmdzWyAwIF0uaW5pdGlhbFN0YXRlIHx8IHRoaXMuaW5pdGlhbFN0YXRlO1xuXHRcdFx0Xy5leHRlbmQoIGFyZ3NbIDAgXSwgYmxlbmRlZFN0YXRlICk7XG5cdFx0XHRwYXJlbnQuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcblx0XHR9O1xuXHR9XG5cblx0Ly8gSW5oZXJpdCBjbGFzcyAoc3RhdGljKSBwcm9wZXJ0aWVzIGZyb20gcGFyZW50LlxuXHRfLm1lcmdlKCBmc20sIHBhcmVudCApO1xuXG5cdC8vIFNldCB0aGUgcHJvdG90eXBlIGNoYWluIHRvIGluaGVyaXQgZnJvbSBgcGFyZW50YCwgd2l0aG91dCBjYWxsaW5nXG5cdC8vIGBwYXJlbnRgJ3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXG5cdEN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcblx0ZnNtLnByb3RvdHlwZSA9IG5ldyBDdG9yKCk7XG5cblx0Ly8gQWRkIHByb3RvdHlwZSBwcm9wZXJ0aWVzIChpbnN0YW5jZSBwcm9wZXJ0aWVzKSB0byB0aGUgc3ViY2xhc3MsXG5cdC8vIGlmIHN1cHBsaWVkLlxuXHRpZiAoIHByb3RvUHJvcHMgKSB7XG5cdFx0Xy5leHRlbmQoIGZzbS5wcm90b3R5cGUsIHByb3RvUHJvcHMgKTtcblx0XHRfLm1lcmdlKCBtYWNoT2JqLCBfLnRyYW5zZm9ybSggcHJvdG9Qcm9wcywgZnVuY3Rpb24oIGFjY3VtLCB2YWwsIGtleSApIHtcblx0XHRcdGlmICggX21hY2hLZXlzLmluZGV4T2YoIGtleSApICE9PSAtMSApIHtcblx0XHRcdFx0YWNjdW1bIGtleSBdID0gdmFsO1xuXHRcdFx0fVxuXHRcdH0gKSApO1xuXHR9XG5cblx0Ly8gQWRkIHN0YXRpYyBwcm9wZXJ0aWVzIHRvIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiwgaWYgc3VwcGxpZWQuXG5cdGlmICggc3RhdGljUHJvcHMgKSB7XG5cdFx0Xy5tZXJnZSggZnNtLCBzdGF0aWNQcm9wcyApO1xuXHR9XG5cblx0Ly8gQ29ycmVjdGx5IHNldCBjaGlsZCdzIGBwcm90b3R5cGUuY29uc3RydWN0b3JgLlxuXHRmc20ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZnNtO1xuXG5cdC8vIFNldCBhIGNvbnZlbmllbmNlIHByb3BlcnR5IGluIGNhc2UgdGhlIHBhcmVudCdzIHByb3RvdHlwZSBpcyBuZWVkZWQgbGF0ZXIuXG5cdGZzbS5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlO1xuXHRyZXR1cm4gZnNtO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlVVVJRCgpIHtcblx0dmFyIHMgPSBbXTtcblx0dmFyIGhleERpZ2l0cyA9IFwiMDEyMzQ1Njc4OWFiY2RlZlwiO1xuXHRmb3IgKCB2YXIgaSA9IDA7IGkgPCAzNjsgaSsrICkge1xuXHRcdHNbIGkgXSA9IGhleERpZ2l0cy5zdWJzdHIoIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiAweDEwICksIDEgKTtcblx0fVxuXHRzWyAxNCBdID0gXCI0XCI7IC8vIGJpdHMgMTItMTUgb2YgdGhlIHRpbWVfaGlfYW5kX3ZlcnNpb24gZmllbGQgdG8gMDAxMFxuXHQvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cdHNbIDE5IF0gPSBoZXhEaWdpdHMuc3Vic3RyKCAoIHNbIDE5IF0gJiAweDMgKSB8IDB4OCwgMSApOyAvLyBiaXRzIDYtNyBvZiB0aGUgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZCB0byAwMVxuXHQvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXHRzWyA4IF0gPSBzWyAxMyBdID0gc1sgMTggXSA9IHNbIDIzIF0gPSBcIi1cIjtcblx0cmV0dXJuIHMuam9pbiggXCJcIiApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Y3JlYXRlVVVJRDogY3JlYXRlVVVJRCxcblx0ZXh0ZW5kOiBleHRlbmQsXG5cdGdldERlZmF1bHRCZWhhdmlvcmFsT3B0aW9uczogZ2V0RGVmYXVsdEJlaGF2aW9yYWxPcHRpb25zLFxuXHRnZXREZWZhdWx0T3B0aW9uczogZ2V0RGVmYXVsdEJlaGF2aW9yYWxPcHRpb25zLFxuXHRnZXREZWZhdWx0Q2xpZW50TWV0YTogZ2V0RGVmYXVsdENsaWVudE1ldGEsXG5cdGdldENoaWxkRnNtSW5zdGFuY2U6IGdldENoaWxkRnNtSW5zdGFuY2UsXG5cdGdldExlYWtsZXNzQXJnczogZ2V0TGVha2xlc3NBcmdzLFxuXHRsaXN0ZW5Ub0NoaWxkOiBsaXN0ZW5Ub0NoaWxkLFxuXHRtYWtlRnNtTmFtZXNwYWNlOiBtYWtlRnNtTmFtZXNwYWNlXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRORVhUX1RSQU5TSVRJT046IFwidHJhbnNpdGlvblwiLFxuXHRIQU5ETElORzogXCJoYW5kbGluZ1wiLFxuXHRIQU5ETEVEOiBcImhhbmRsZWRcIixcblx0Tk9fSEFORExFUjogXCJub2hhbmRsZXJcIixcblx0VFJBTlNJVElPTjogXCJ0cmFuc2l0aW9uXCIsXG5cdFRSQU5TSVRJT05FRDogXCJ0cmFuc2l0aW9uZWRcIixcblx0SU5WQUxJRF9TVEFURTogXCJpbnZhbGlkc3RhdGVcIixcblx0REVGRVJSRUQ6IFwiZGVmZXJyZWRcIixcblx0TkVXX0ZTTTogXCJuZXdmc21cIlxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZXZlbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIEJlaGF2aW9yYWxGc20gPSByZXF1aXJlKCBcIi4vQmVoYXZpb3JhbEZzbVwiICk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCBcIi4vdXRpbHNcIiApO1xudmFyIF8gPSByZXF1aXJlKCBcImxvZGFzaFwiICk7XG5cbnZhciBGc20gPSB7XG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblx0XHRCZWhhdmlvcmFsRnNtLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR0aGlzLmVuc3VyZUNsaWVudE1ldGEoKTtcblx0fSxcblx0aW5pdENsaWVudDogZnVuY3Rpb24gaW5pdENsaWVudCgpIHtcblx0XHR2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5pbml0aWFsU3RhdGU7XG5cdFx0aWYgKCAhaW5pdGlhbFN0YXRlICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcIllvdSBtdXN0IHNwZWNpZnkgYW4gaW5pdGlhbCBzdGF0ZSBmb3IgdGhpcyBGU01cIiApO1xuXHRcdH1cblx0XHRpZiAoICF0aGlzLnN0YXRlc1sgaW5pdGlhbFN0YXRlIF0gKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiVGhlIGluaXRpYWwgc3RhdGUgc3BlY2lmaWVkIGRvZXMgbm90IGV4aXN0IGluIHRoZSBzdGF0ZXMgb2JqZWN0LlwiICk7XG5cdFx0fVxuXHRcdHRoaXMudHJhbnNpdGlvbiggaW5pdGlhbFN0YXRlICk7XG5cdH0sXG5cdGVuc3VyZUNsaWVudE1ldGE6IGZ1bmN0aW9uIGVuc3VyZUNsaWVudE1ldGEoKSB7XG5cdFx0aWYgKCAhdGhpcy5fc3RhbXBlZCApIHtcblx0XHRcdHRoaXMuX3N0YW1wZWQgPSB0cnVlO1xuXHRcdFx0Xy5kZWZhdWx0cyggdGhpcywgXy5jbG9uZURlZXAoIHV0aWxzLmdldERlZmF1bHRDbGllbnRNZXRhKCkgKSApO1xuXHRcdFx0dGhpcy5pbml0Q2xpZW50KCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGVuc3VyZUNsaWVudEFyZzogZnVuY3Rpb24oIGFyZ3MgKSB7XG5cdFx0dmFyIF9hcmdzID0gYXJncztcblx0XHQvLyB3ZSBuZWVkIHRvIHRlc3QgdGhlIGFyZ3MgYW5kIHZlcmlmeSB0aGF0IGlmIGEgY2xpZW50IGFyZyBoYXNcblx0XHQvLyBiZWVuIHBhc3NlZCwgaXQgbXVzdCBiZSB0aGlzIEZTTSBpbnN0YW5jZSAodGhpcyBpc24ndCBhIGJlaGF2aW9yYWwgRlNNKVxuXHRcdGlmICggdHlwZW9mIF9hcmdzWyAwIF0gPT09IFwib2JqZWN0XCIgJiYgISggXCJpbnB1dFR5cGVcIiBpbiBfYXJnc1sgMCBdICkgJiYgX2FyZ3NbIDAgXSAhPT0gdGhpcyApIHtcblx0XHRcdF9hcmdzLnNwbGljZSggMCwgMSwgdGhpcyApO1xuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBfYXJnc1sgMCBdICE9PSBcIm9iamVjdFwiIHx8ICggdHlwZW9mIF9hcmdzWyAwIF0gPT09IFwib2JqZWN0XCIgJiYgKCBcImlucHV0VHlwZVwiIGluIF9hcmdzWyAwIF0gKSApICkge1xuXHRcdFx0X2FyZ3MudW5zaGlmdCggdGhpcyApO1xuXHRcdH1cblx0XHRyZXR1cm4gX2FyZ3M7XG5cdH0sXG5cblx0Z2V0SGFuZGxlckFyZ3M6IGZ1bmN0aW9uKCBhcmdzLCBpc0NhdGNoQWxsICkge1xuXHRcdC8vIGluZGV4IDAgaXMgdGhlIGNsaWVudCwgaW5kZXggMSBpcyBpbnB1dFR5cGVcblx0XHQvLyBpZiB3ZSdyZSBpbiBhIGNhdGNoLWFsbCBoYW5kbGVyLCBpbnB1dCB0eXBlIG5lZWRzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBhcmdzXG5cdFx0Ly8gaW5wdXRUeXBlIG1pZ2h0IGJlIGFuIG9iamVjdCwgc28gd2UgbmVlZCB0byBqdXN0IGdldCB0aGUgaW5wdXRUeXBlIHN0cmluZyBpZiBzb1xuXHRcdHZhciBfYXJncyA9IGFyZ3M7XG5cdFx0dmFyIGlucHV0ID0gX2FyZ3NbIDEgXTtcblx0XHRpZiAoIHR5cGVvZiBpbnB1dFR5cGUgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRfYXJncy5zcGxpY2UoIDEsIDEsIGlucHV0LmlucHV0VHlwZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gaXNDYXRjaEFsbCA/XG5cdFx0XHRfYXJncy5zbGljZSggMSApIDpcblx0XHRcdF9hcmdzLnNsaWNlKCAyICk7XG5cdH0sXG5cblx0Z2V0U3lzdGVtSGFuZGxlckFyZ3M6IGZ1bmN0aW9uKCBhcmdzLCBjbGllbnQgKSB7XG5cdFx0cmV0dXJuIGFyZ3M7XG5cdH0sXG5cblx0Ly8gXCJjbGFzc2ljXCIgbWFjaGluYSBGU00gZG8gbm90IGVtaXQgdGhlIGNsaWVudCBwcm9wZXJ0eSBvbiBldmVudHMgKHdoaWNoIHdvdWxkIGJlIHRoZSBGU00gaXRzZWxmKVxuXHRidWlsZEV2ZW50UGF5bG9hZDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGFyZ3MgPSB0aGlzLmVuc3VyZUNsaWVudEFyZyggdXRpbHMuZ2V0TGVha2xlc3NBcmdzKCBhcmd1bWVudHMgKSApO1xuXHRcdHZhciBkYXRhID0gYXJnc1sgMSBdO1xuXHRcdGlmICggXy5pc1BsYWluT2JqZWN0KCBkYXRhICkgKSB7XG5cdFx0XHRyZXR1cm4gXy5leHRlbmQoIGRhdGEsIHsgbmFtZXNwYWNlOiB0aGlzLm5hbWVzcGFjZSB9ICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB7IGRhdGE6IGRhdGEgfHwgbnVsbCwgbmFtZXNwYWNlOiB0aGlzLm5hbWVzcGFjZSB9O1xuXHRcdH1cblx0fVxufTtcblxuXy5lYWNoKCBbXG5cdFwiaGFuZGxlXCIsXG5cdFwidHJhbnNpdGlvblwiLFxuXHRcImRlZmVyVW50aWxUcmFuc2l0aW9uXCIsXG5cdFwicHJvY2Vzc1F1ZXVlXCIsXG5cdFwiY2xlYXJRdWV1ZVwiXG5dLCBmdW5jdGlvbiggbWV0aG9kV2l0aENsaWVudEluamVjdGVkICkge1xuXHRGc21bIG1ldGhvZFdpdGhDbGllbnRJbmplY3RlZCBdID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGFyZ3MgPSB0aGlzLmVuc3VyZUNsaWVudEFyZyggdXRpbHMuZ2V0TGVha2xlc3NBcmdzKCBhcmd1bWVudHMgKSApO1xuXHRcdHJldHVybiBCZWhhdmlvcmFsRnNtLnByb3RvdHlwZVsgbWV0aG9kV2l0aENsaWVudEluamVjdGVkIF0uYXBwbHkoIHRoaXMsIGFyZ3MgKTtcblx0fTtcbn0gKTtcblxuRnNtID0gQmVoYXZpb3JhbEZzbS5leHRlbmQoIEZzbSApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZzbTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvRnNtLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCBcImxvZGFzaFwiICk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCBcIi4vdXRpbHNcIiApO1xudmFyIGVtaXR0ZXIgPSByZXF1aXJlKCBcIi4vZW1pdHRlclwiICk7XG52YXIgdG9wTGV2ZWxFbWl0dGVyID0gZW1pdHRlci5pbnN0YW5jZTtcbnZhciBldmVudHMgPSByZXF1aXJlKCBcIi4vZXZlbnRzXCIgKTtcblxudmFyIE1BQ0hJTkFfUFJPUCA9IFwiX19tYWNoaW5hX19cIjtcblxuZnVuY3Rpb24gQmVoYXZpb3JhbEZzbSggb3B0aW9ucyApIHtcblx0Xy5leHRlbmQoIHRoaXMsIG9wdGlvbnMgKTtcblx0Xy5kZWZhdWx0cyggdGhpcywgdXRpbHMuZ2V0RGVmYXVsdEJlaGF2aW9yYWxPcHRpb25zKCkgKTtcblx0dGhpcy5pbml0aWFsaXplLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0dG9wTGV2ZWxFbWl0dGVyLmVtaXQoIGV2ZW50cy5ORVdfRlNNLCB0aGlzICk7XG59XG5cbl8uZXh0ZW5kKCBCZWhhdmlvcmFsRnNtLnByb3RvdHlwZSwge1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbigpIHt9LFxuXG5cdGluaXRDbGllbnQ6IGZ1bmN0aW9uIGluaXRDbGllbnQoIGNsaWVudCApIHtcblx0XHR2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5pbml0aWFsU3RhdGU7XG5cdFx0aWYgKCAhaW5pdGlhbFN0YXRlICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcIllvdSBtdXN0IHNwZWNpZnkgYW4gaW5pdGlhbCBzdGF0ZSBmb3IgdGhpcyBGU01cIiApO1xuXHRcdH1cblx0XHRpZiAoICF0aGlzLnN0YXRlc1sgaW5pdGlhbFN0YXRlIF0gKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiVGhlIGluaXRpYWwgc3RhdGUgc3BlY2lmaWVkIGRvZXMgbm90IGV4aXN0IGluIHRoZSBzdGF0ZXMgb2JqZWN0LlwiICk7XG5cdFx0fVxuXHRcdHRoaXMudHJhbnNpdGlvbiggY2xpZW50LCBpbml0aWFsU3RhdGUgKTtcblx0fSxcblxuXHRjb25maWdGb3JTdGF0ZTogZnVuY3Rpb24gY29uZmlnRm9yU3RhdGUoIG5ld1N0YXRlICkge1xuXHRcdHZhciBuZXdTdGF0ZU9iaiA9IHRoaXMuc3RhdGVzWyBuZXdTdGF0ZSBdO1xuXHRcdHZhciBjaGlsZDtcblx0XHRfLmVhY2goIHRoaXMuaGllcmFyY2h5LCBmdW5jdGlvbiggY2hpbGRMaXN0ZW5lciwga2V5ICkge1xuXHRcdFx0aWYgKCBjaGlsZExpc3RlbmVyICYmIHR5cGVvZiBjaGlsZExpc3RlbmVyLm9mZiA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0XHRjaGlsZExpc3RlbmVyLm9mZigpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdGlmICggbmV3U3RhdGVPYmouX2NoaWxkICkge1xuXHRcdFx0bmV3U3RhdGVPYmouX2NoaWxkID0gdXRpbHMuZ2V0Q2hpbGRGc21JbnN0YW5jZSggbmV3U3RhdGVPYmouX2NoaWxkICk7XG5cdFx0XHRjaGlsZCA9IG5ld1N0YXRlT2JqLl9jaGlsZCAmJiBuZXdTdGF0ZU9iai5fY2hpbGQuaW5zdGFuY2U7XG5cdFx0XHR0aGlzLmhpZXJhcmNoeVsgY2hpbGQubmFtZXNwYWNlIF0gPSB1dGlscy5saXN0ZW5Ub0NoaWxkKCB0aGlzLCBjaGlsZCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBjaGlsZDtcblx0fSxcblxuXHRlbnN1cmVDbGllbnRNZXRhOiBmdW5jdGlvbiBlbnN1cmVDbGllbnRNZXRhKCBjbGllbnQgKSB7XG5cdFx0aWYgKCB0eXBlb2YgY2xpZW50ICE9PSBcIm9iamVjdFwiICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcIkFuIEZTTSBjbGllbnQgbXVzdCBiZSBhbiBvYmplY3QuXCIgKTtcblx0XHR9XG5cdFx0Y2xpZW50WyBNQUNISU5BX1BST1AgXSA9IGNsaWVudFsgTUFDSElOQV9QUk9QIF0gfHwge307XG5cdFx0aWYgKCAhY2xpZW50WyBNQUNISU5BX1BST1AgXVsgdGhpcy5uYW1lc3BhY2UgXSApIHtcblx0XHRcdGNsaWVudFsgTUFDSElOQV9QUk9QIF1bIHRoaXMubmFtZXNwYWNlIF0gPSBfLmNsb25lRGVlcCggdXRpbHMuZ2V0RGVmYXVsdENsaWVudE1ldGEoKSApO1xuXHRcdFx0dGhpcy5pbml0Q2xpZW50KCBjbGllbnQgKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNsaWVudFsgTUFDSElOQV9QUk9QIF1bIHRoaXMubmFtZXNwYWNlIF07XG5cdH0sXG5cblx0YnVpbGRFdmVudFBheWxvYWQ6IGZ1bmN0aW9uKCBjbGllbnQsIGRhdGEgKSB7XG5cdFx0aWYgKCBfLmlzUGxhaW5PYmplY3QoIGRhdGEgKSApIHtcblx0XHRcdHJldHVybiBfLmV4dGVuZCggZGF0YSwgeyBjbGllbnQ6IGNsaWVudCwgbmFtZXNwYWNlOiB0aGlzLm5hbWVzcGFjZSB9ICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB7IGNsaWVudDogY2xpZW50LCBkYXRhOiBkYXRhIHx8IG51bGwsIG5hbWVzcGFjZTogdGhpcy5uYW1lc3BhY2UgfTtcblx0XHR9XG5cdH0sXG5cblx0Z2V0SGFuZGxlckFyZ3M6IGZ1bmN0aW9uKCBhcmdzLCBpc0NhdGNoQWxsICkge1xuXHRcdC8vIGluZGV4IDAgaXMgdGhlIGNsaWVudCwgaW5kZXggMSBpcyBpbnB1dFR5cGVcblx0XHQvLyBpZiB3ZSdyZSBpbiBhIGNhdGNoLWFsbCBoYW5kbGVyLCBpbnB1dCB0eXBlIG5lZWRzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBhcmdzXG5cdFx0Ly8gaW5wdXRUeXBlIG1pZ2h0IGJlIGFuIG9iamVjdCwgc28gd2UgbmVlZCB0byBqdXN0IGdldCB0aGUgaW5wdXRUeXBlIHN0cmluZyBpZiBzb1xuXHRcdHZhciBfYXJncyA9IGFyZ3Muc2xpY2UoIDAgKTtcblx0XHR2YXIgaW5wdXQgPSBfYXJnc1sgMSBdO1xuXHRcdGlmICggdHlwZW9mIGlucHV0ID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0X2FyZ3Muc3BsaWNlKCAxLCAxLCBpbnB1dC5pbnB1dFR5cGUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIGlzQ2F0Y2hBbGwgP1xuXHRcdFx0X2FyZ3MgOlxuXHRcdFx0WyBfYXJnc1sgMCBdIF0uY29uY2F0KCBfYXJncy5zbGljZSggMiApICk7XG5cdH0sXG5cblx0Z2V0U3lzdGVtSGFuZGxlckFyZ3M6IGZ1bmN0aW9uKCBhcmdzLCBjbGllbnQgKSB7XG5cdFx0cmV0dXJuIFsgY2xpZW50IF0uY29uY2F0KCBhcmdzICk7XG5cdH0sXG5cblx0aGFuZGxlOiBmdW5jdGlvbiggY2xpZW50LCBpbnB1dCApIHtcblx0XHR2YXIgaW5wdXREZWYgPSBpbnB1dDtcblx0XHRpZiAoIHR5cGVvZiBpbnB1dCA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvciggXCJUaGUgaW5wdXQgYXJndW1lbnQgcGFzc2VkIHRvIHRoZSBGU00ncyBoYW5kbGUgbWV0aG9kIGlzIHVuZGVmaW5lZC4gRGlkIHlvdSBmb3JnZXQgdG8gcGFzcyB0aGUgaW5wdXQgbmFtZT9cIiApO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGlucHV0RGVmID0geyBpbnB1dFR5cGU6IGlucHV0LCBkZWxlZ2F0ZWQ6IGZhbHNlLCB0aWNrZXQ6IHVuZGVmaW5lZCB9O1xuXHRcdH1cblx0XHR2YXIgY2xpZW50TWV0YSA9IHRoaXMuZW5zdXJlQ2xpZW50TWV0YSggY2xpZW50ICk7XG5cdFx0dmFyIGFyZ3MgPSB1dGlscy5nZXRMZWFrbGVzc0FyZ3MoIGFyZ3VtZW50cyApO1xuXHRcdGlmICggdHlwZW9mIGlucHV0ICE9PSBcIm9iamVjdFwiICkge1xuXHRcdFx0YXJncy5zcGxpY2UoIDEsIDEsIGlucHV0RGVmICk7XG5cdFx0fVxuXHRcdGNsaWVudE1ldGEuY3VycmVudEFjdGlvbkFyZ3MgPSBhcmdzLnNsaWNlKCAxICk7XG5cdFx0dmFyIGN1cnJlbnRTdGF0ZSA9IGNsaWVudE1ldGEuc3RhdGU7XG5cdFx0dmFyIHN0YXRlT2JqID0gdGhpcy5zdGF0ZXNbIGN1cnJlbnRTdGF0ZSBdO1xuXHRcdHZhciBoYW5kbGVyTmFtZTtcblx0XHR2YXIgaGFuZGxlcjtcblx0XHR2YXIgaXNDYXRjaEFsbCA9IGZhbHNlO1xuXHRcdHZhciBjaGlsZDtcblx0XHR2YXIgcmVzdWx0O1xuXHRcdHZhciBhY3Rpb247XG5cdFx0aWYgKCAhY2xpZW50TWV0YS5pbkV4aXRIYW5kbGVyICkge1xuXHRcdFx0Y2hpbGQgPSB0aGlzLmNvbmZpZ0ZvclN0YXRlKCBjdXJyZW50U3RhdGUgKTtcblx0XHRcdGlmICggY2hpbGQgJiYgIXRoaXMucGVuZGluZ0RlbGVnYXRpb25zWyBpbnB1dERlZi50aWNrZXQgXSAmJiAhaW5wdXREZWYuYnViYmxpbmcgKSB7XG5cdFx0XHRcdGlucHV0RGVmLnRpY2tldCA9ICggaW5wdXREZWYudGlja2V0IHx8IHV0aWxzLmNyZWF0ZVVVSUQoKSApO1xuXHRcdFx0XHRpbnB1dERlZi5kZWxlZ2F0ZWQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnBlbmRpbmdEZWxlZ2F0aW9uc1sgaW5wdXREZWYudGlja2V0IF0gPSB7IGRlbGVnYXRlZFRvOiBjaGlsZC5uYW1lc3BhY2UgfTtcblx0XHRcdFx0Ly8gV0FSTklORyAtIHJldHVybmluZyBhIHZhbHVlIGZyb20gYGhhbmRsZWAgb24gY2hpbGQgRlNNcyBpcyBub3QgcmVhbGx5IHN1cHBvcnRlZC5cblx0XHRcdFx0Ly8gSWYgeW91IG5lZWQgdG8gcmV0dXJuIHZhbHVlcyBmcm9tIGNoaWxkIEZTTSBpbnB1dCBoYW5kbGVycywgdXNlIGV2ZW50cyBpbnN0ZWFkLlxuXHRcdFx0XHRyZXN1bHQgPSBjaGlsZC5oYW5kbGUuYXBwbHkoIGNoaWxkLCBhcmdzICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIGlucHV0RGVmLnRpY2tldCAmJiB0aGlzLnBlbmRpbmdEZWxlZ2F0aW9uc1sgaW5wdXREZWYudGlja2V0IF0gKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMucGVuZGluZ0RlbGVnYXRpb25zWyBpbnB1dERlZi50aWNrZXQgXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRoYW5kbGVyTmFtZSA9IHN0YXRlT2JqWyBpbnB1dERlZi5pbnB1dFR5cGUgXSA/IGlucHV0RGVmLmlucHV0VHlwZSA6IFwiKlwiO1xuXHRcdFx0XHRpc0NhdGNoQWxsID0gKCBoYW5kbGVyTmFtZSA9PT0gXCIqXCIgKTtcblx0XHRcdFx0aGFuZGxlciA9ICggc3RhdGVPYmpbIGhhbmRsZXJOYW1lIF0gfHwgdGhpc1sgaGFuZGxlck5hbWUgXSApIHx8IHRoaXNbIFwiKlwiIF07XG5cdFx0XHRcdGFjdGlvbiA9IGNsaWVudE1ldGEuc3RhdGUgKyBcIi5cIiArIGhhbmRsZXJOYW1lO1xuXHRcdFx0XHRjbGllbnRNZXRhLmN1cnJlbnRBY3Rpb24gPSBhY3Rpb247XG5cdFx0XHRcdHZhciBldmVudFBheWxvYWQgPSB0aGlzLmJ1aWxkRXZlbnRQYXlsb2FkKFxuXHRcdFx0XHRcdGNsaWVudCxcblx0XHRcdFx0XHR7IGlucHV0VHlwZTogaW5wdXREZWYuaW5wdXRUeXBlLCBkZWxlZ2F0ZWQ6IGlucHV0RGVmLmRlbGVnYXRlZCwgdGlja2V0OiBpbnB1dERlZi50aWNrZXQgfVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoICFoYW5kbGVyICkge1xuXHRcdFx0XHRcdHRoaXMuZW1pdCggZXZlbnRzLk5PX0hBTkRMRVIsIF8uZXh0ZW5kKCB7IGFyZ3M6IGFyZ3MgfSwgZXZlbnRQYXlsb2FkICkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmVtaXQoIGV2ZW50cy5IQU5ETElORywgZXZlbnRQYXlsb2FkICk7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gaGFuZGxlci5hcHBseSggdGhpcywgdGhpcy5nZXRIYW5kbGVyQXJncyggYXJncywgaXNDYXRjaEFsbCApICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGhhbmRsZXI7XG5cdFx0XHRcdFx0XHR0aGlzLnRyYW5zaXRpb24oIGNsaWVudCwgaGFuZGxlciApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLmVtaXQoIGV2ZW50cy5IQU5ETEVELCBldmVudFBheWxvYWQgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjbGllbnRNZXRhLnByaW9yQWN0aW9uID0gY2xpZW50TWV0YS5jdXJyZW50QWN0aW9uO1xuXHRcdFx0XHRjbGllbnRNZXRhLmN1cnJlbnRBY3Rpb24gPSBcIlwiO1xuXHRcdFx0XHRjbGllbnRNZXRhLmN1cnJlbnRBY3Rpb25BcmdzID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdHRyYW5zaXRpb246IGZ1bmN0aW9uKCBjbGllbnQsIG5ld1N0YXRlICkge1xuXHRcdHZhciBjbGllbnRNZXRhID0gdGhpcy5lbnN1cmVDbGllbnRNZXRhKCBjbGllbnQgKTtcblx0XHR2YXIgY3VyU3RhdGUgPSBjbGllbnRNZXRhLnN0YXRlO1xuXHRcdHZhciBjdXJTdGF0ZU9iaiA9IHRoaXMuc3RhdGVzWyBjdXJTdGF0ZSBdO1xuXHRcdHZhciBuZXdTdGF0ZU9iaiA9IHRoaXMuc3RhdGVzWyBuZXdTdGF0ZSBdO1xuXHRcdHZhciBjaGlsZDtcblx0XHR2YXIgYXJncyA9IHV0aWxzLmdldExlYWtsZXNzQXJncyggYXJndW1lbnRzICkuc2xpY2UoIDIgKTtcblx0XHRpZiAoICFjbGllbnRNZXRhLmluRXhpdEhhbmRsZXIgJiYgbmV3U3RhdGUgIT09IGN1clN0YXRlICkge1xuXHRcdFx0aWYgKCBuZXdTdGF0ZU9iaiApIHtcblx0XHRcdFx0Y2hpbGQgPSB0aGlzLmNvbmZpZ0ZvclN0YXRlKCBuZXdTdGF0ZSApO1xuXHRcdFx0XHRpZiAoIGN1clN0YXRlT2JqICYmIGN1clN0YXRlT2JqLl9vbkV4aXQgKSB7XG5cdFx0XHRcdFx0Y2xpZW50TWV0YS5pbkV4aXRIYW5kbGVyID0gdHJ1ZTtcblx0XHRcdFx0XHRjdXJTdGF0ZU9iai5fb25FeGl0LmNhbGwoIHRoaXMsIGNsaWVudCApO1xuXHRcdFx0XHRcdGNsaWVudE1ldGEuaW5FeGl0SGFuZGxlciA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNsaWVudE1ldGEudGFyZ2V0UmVwbGF5U3RhdGUgPSBuZXdTdGF0ZTtcblx0XHRcdFx0Y2xpZW50TWV0YS5wcmlvclN0YXRlID0gY3VyU3RhdGU7XG5cdFx0XHRcdGNsaWVudE1ldGEuc3RhdGUgPSBuZXdTdGF0ZTtcblx0XHRcdFx0dmFyIGV2ZW50UGF5bG9hZCA9IHRoaXMuYnVpbGRFdmVudFBheWxvYWQoIGNsaWVudCwge1xuXHRcdFx0XHRcdGZyb21TdGF0ZTogY2xpZW50TWV0YS5wcmlvclN0YXRlLFxuXHRcdFx0XHRcdGFjdGlvbjogY2xpZW50TWV0YS5jdXJyZW50QWN0aW9uLFxuXHRcdFx0XHRcdHRvU3RhdGU6IG5ld1N0YXRlXG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0dGhpcy5lbWl0KCBldmVudHMuVFJBTlNJVElPTiwgZXZlbnRQYXlsb2FkICk7XG5cdFx0XHRcdGlmICggbmV3U3RhdGVPYmouX29uRW50ZXIgKSB7XG5cdFx0XHRcdFx0bmV3U3RhdGVPYmouX29uRW50ZXIuYXBwbHkoIHRoaXMsIHRoaXMuZ2V0U3lzdGVtSGFuZGxlckFyZ3MoIGFyZ3MsIGNsaWVudCApICk7XG5cdFx0XHRcdFx0dGhpcy5lbWl0KCBldmVudHMuVFJBTlNJVElPTkVELCBldmVudFBheWxvYWQgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGNoaWxkICkge1xuXHRcdFx0XHRcdGNoaWxkLmhhbmRsZSggY2xpZW50LCBcIl9yZXNldFwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIGNsaWVudE1ldGEudGFyZ2V0UmVwbGF5U3RhdGUgPT09IG5ld1N0YXRlICkge1xuXHRcdFx0XHRcdHRoaXMucHJvY2Vzc1F1ZXVlKCBjbGllbnQsIGV2ZW50cy5ORVhUX1RSQU5TSVRJT04gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmVtaXQoIGV2ZW50cy5JTlZBTElEX1NUQVRFLCB0aGlzLmJ1aWxkRXZlbnRQYXlsb2FkKCBjbGllbnQsIHtcblx0XHRcdFx0c3RhdGU6IGNsaWVudE1ldGEuc3RhdGUsXG5cdFx0XHRcdGF0dGVtcHRlZFN0YXRlOiBuZXdTdGF0ZVxuXHRcdFx0fSApICk7XG5cdFx0fVxuXHR9LFxuXG5cdGRlZmVyVW50aWxUcmFuc2l0aW9uOiBmdW5jdGlvbiggY2xpZW50LCBzdGF0ZU5hbWUgKSB7XG5cdFx0dmFyIGNsaWVudE1ldGEgPSB0aGlzLmVuc3VyZUNsaWVudE1ldGEoIGNsaWVudCApO1xuXHRcdGlmICggY2xpZW50TWV0YS5jdXJyZW50QWN0aW9uQXJncyApIHtcblx0XHRcdHZhciBxdWV1ZWQgPSB7XG5cdFx0XHRcdHR5cGU6IGV2ZW50cy5ORVhUX1RSQU5TSVRJT04sXG5cdFx0XHRcdHVudGlsU3RhdGU6IHN0YXRlTmFtZSxcblx0XHRcdFx0YXJnczogY2xpZW50TWV0YS5jdXJyZW50QWN0aW9uQXJnc1xuXHRcdFx0fTtcblx0XHRcdGNsaWVudE1ldGEuaW5wdXRRdWV1ZS5wdXNoKCBxdWV1ZWQgKTtcblx0XHRcdHZhciBldmVudFBheWxvYWQgPSB0aGlzLmJ1aWxkRXZlbnRQYXlsb2FkKCBjbGllbnQsIHtcblx0XHRcdFx0c3RhdGU6IGNsaWVudE1ldGEuc3RhdGUsXG5cdFx0XHRcdHF1ZXVlZEFyZ3M6IHF1ZXVlZFxuXHRcdFx0fSApO1xuXHRcdFx0dGhpcy5lbWl0KCBldmVudHMuREVGRVJSRUQsIGV2ZW50UGF5bG9hZCApO1xuXHRcdH1cblx0fSxcblxuXHRkZWZlckFuZFRyYW5zaXRpb246IGZ1bmN0aW9uKCBjbGllbnQsIHN0YXRlTmFtZSApIHtcblx0XHR0aGlzLmRlZmVyVW50aWxUcmFuc2l0aW9uKCBjbGllbnQsIHN0YXRlTmFtZSApO1xuXHRcdHRoaXMudHJhbnNpdGlvbiggY2xpZW50LCBzdGF0ZU5hbWUgKTtcblx0fSxcblxuXHRwcm9jZXNzUXVldWU6IGZ1bmN0aW9uKCBjbGllbnQgKSB7XG5cdFx0dmFyIGNsaWVudE1ldGEgPSB0aGlzLmVuc3VyZUNsaWVudE1ldGEoIGNsaWVudCApO1xuXHRcdHZhciBmaWx0ZXJGbiA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHRcdFx0cmV0dXJuICggKCAhaXRlbS51bnRpbFN0YXRlICkgfHwgKCBpdGVtLnVudGlsU3RhdGUgPT09IGNsaWVudE1ldGEuc3RhdGUgKSApO1xuXHRcdH07XG5cdFx0dmFyIHRvUHJvY2VzcyA9IF8uZmlsdGVyKCBjbGllbnRNZXRhLmlucHV0UXVldWUsIGZpbHRlckZuICk7XG5cdFx0Y2xpZW50TWV0YS5pbnB1dFF1ZXVlID0gXy5kaWZmZXJlbmNlKCBjbGllbnRNZXRhLmlucHV0UXVldWUsIHRvUHJvY2VzcyApO1xuXHRcdF8uZWFjaCggdG9Qcm9jZXNzLCBmdW5jdGlvbiggaXRlbSApIHtcblx0XHRcdHRoaXMuaGFuZGxlLmFwcGx5KCB0aGlzLCBbIGNsaWVudCBdLmNvbmNhdCggaXRlbS5hcmdzICkgKTtcblx0XHR9LCB0aGlzICk7XG5cdH0sXG5cblx0Y2xlYXJRdWV1ZTogZnVuY3Rpb24oIGNsaWVudCwgbmFtZSApIHtcblx0XHR2YXIgY2xpZW50TWV0YSA9IHRoaXMuZW5zdXJlQ2xpZW50TWV0YSggY2xpZW50ICk7XG5cdFx0aWYgKCAhbmFtZSApIHtcblx0XHRcdGNsaWVudE1ldGEuaW5wdXRRdWV1ZSA9IFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZmlsdGVyID0gZnVuY3Rpb24oIGV2bnQgKSB7XG5cdFx0XHRcdHJldHVybiAoIG5hbWUgPyBldm50LnVudGlsU3RhdGUgIT09IG5hbWUgOiB0cnVlICk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xpZW50TWV0YS5pbnB1dFF1ZXVlID0gXy5maWx0ZXIoIGNsaWVudE1ldGEuaW5wdXRRdWV1ZSwgZmlsdGVyICk7XG5cdFx0fVxuXHR9LFxuXG5cdGNvbXBvc2l0ZVN0YXRlOiBmdW5jdGlvbiggY2xpZW50ICkge1xuXHRcdHZhciBjbGllbnRNZXRhID0gdGhpcy5lbnN1cmVDbGllbnRNZXRhKCBjbGllbnQgKTtcblx0XHR2YXIgc3RhdGUgPSBjbGllbnRNZXRhLnN0YXRlO1xuXHRcdHZhciBjaGlsZCA9IHRoaXMuc3RhdGVzW3N0YXRlXS5fY2hpbGQgJiYgdGhpcy5zdGF0ZXNbc3RhdGVdLl9jaGlsZC5pbnN0YW5jZTtcblx0XHRpZiAoIGNoaWxkICkge1xuXHRcdFx0c3RhdGUgKz0gXCIuXCIgKyBjaGlsZC5jb21wb3NpdGVTdGF0ZSggY2xpZW50ICk7XG5cdFx0fVxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxufSwgZW1pdHRlci5nZXRJbnN0YW5jZSgpICk7XG5cbkJlaGF2aW9yYWxGc20uZXh0ZW5kID0gdXRpbHMuZXh0ZW5kO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJlaGF2aW9yYWxGc207XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL0JlaGF2aW9yYWxGc20uanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9