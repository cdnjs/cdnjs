/**
 * machina - A library for creating powerful and flexible finite state machines. Loosely inspired by Erlang/OTP's gen_fsm behavior.
 * Author: Jim Cowart (http://ifandelse.com)
 * Version: v1.1.2
 * Url: http://machina-js.org/
 * License(s): MIT, GPL
 */

( function( root, factory ) {
	/* istanbul ignore if  */
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "lodash" ], function( _ ) {
			return factory( _, root );
		} );
	/* istanbul ignore else  */
	} else if ( typeof module === "object" && module.exports ) {
		// Node, or CommonJS-Like environments
		module.exports = factory( require( "lodash" ) );
	} else {
		// Browser globals
		root.machina = factory( root._, root );
	}
}( this, function( _, global, undefined ) {
	var slice = [].slice;
	var NEXT_TRANSITION = "transition";
	var HANDLING = "handling";
	var HANDLED = "handled";
	var NO_HANDLER = "nohandler";
	var TRANSITION = "transition";
	var INVALID_STATE = "invalidstate";
	var DEFERRED = "deferred";
	var NEW_FSM = "newfsm";

	function getDefaultBehavioralOptions() {
	return {
		initialState: "uninitialized",
		eventListeners: {
			"*": []
		},
		states: {},
		namespace: utils.makeFsmNamespace(),
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

	function getChildFsmInstance( config ) {
	if ( !config ) {
		return;
	}
	var childFsmDefinition = {};
	if ( typeof config === "object" ) {
		// is this a config object with a factory?
		if ( config.factory ) {
			childFsmDefinition = config;
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
	return child.on( "*", function( eventName, data ) {
		switch ( eventName ) {
			case "nohandler":
				if ( !data.ticket && !data.delegated && data.namespace !== fsm.namespace ) {
					// Ok - we're dealing w/ a child handling input that should bubble up
					data.args[ 1 ].bubbling = true;
				}
				// we do NOT bubble _reset inputs up to the parent
				if ( data.inputType !== "_reset" ) {
					fsm.handle.apply( fsm, data.args );
				}
				break;
			case "handling" :
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
	
	s[ 19 ] = hexDigits.substr( ( s[ 19 ] & 0x3 ) | 0x8, 1 ); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	
	s[ 8 ] = s[ 13 ] = s[ 18 ] = s[ 23 ] = "-";
	return s.join( "" );
}

	var utils = {
	makeFsmNamespace: ( function() {
		var machinaCount = 0;
		return function() {
			return "fsm." + machinaCount++;
		};
	} )(),
	listenToChild: listenToChild,
	getLeaklessArgs: getLeaklessArgs,
	getDefaultOptions: getDefaultBehavioralOptions,
	getDefaultClientMeta: getDefaultClientMeta,
	createUUID: createUUID
};

	var emitter = {

		emit: function( eventName ) {
		var args = getLeaklessArgs( arguments );
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

	var MACHINA_PROP = "__machina__";

	function BehavioralFsm( options ) {
	_.extend( this, options );
	_.defaults( this, getDefaultBehavioralOptions() );
	this.initialize.apply( this, arguments );
	machina.emit( NEW_FSM, this );
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

	handle: function( client, input ) {
		var inputDef = input;
		if ( typeof input === "undefined" ) {
			throw new Error( "The input argument passed to the FSM's handle method is undefined. Did you forget to pass the input name?" );
		}
		if ( typeof input === "string" ) {
			inputDef = { inputType: input, delegated: false, ticket: undefined };
		}
		var clientMeta = this.ensureClientMeta( client );
		var args = getLeaklessArgs( arguments );
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
			child = stateObj._child && stateObj._child.instance;
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
					this.emit( NO_HANDLER, _.extend( { args: args }, eventPayload ) );
				} else {
					this.emit( HANDLING, eventPayload );
					if ( typeof handler === "function" ) {
						result = handler.apply( this, this.getHandlerArgs( args, isCatchAll ) );
					} else {
						result = handler;
						this.transition( client, handler );
					}
					this.emit( HANDLED, eventPayload );
				}
				clientMeta.priorAction = clientMeta.currentAction;
				clientMeta.currentAction = "";
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
		if ( !clientMeta.inExitHandler && newState !== curState ) {
			if ( newStateObj ) {
				if ( newStateObj._child ) {
					newStateObj._child = getChildFsmInstance( newStateObj._child );
					child = newStateObj._child && newStateObj._child.instance;
				}
				if ( curStateObj && curStateObj._onExit ) {
					clientMeta.inExitHandler = true;
					curStateObj._onExit.call( this, client );
					clientMeta.inExitHandler = false;
				}
				if ( curStateObj && curStateObj._child && curStateObj._child.instance && this.hierarchy[ curStateObj._child.instance.namespace ] ) {
					this.hierarchy[ curStateObj._child.instance.namespace ].off();
				}
				clientMeta.targetReplayState = newState;
				clientMeta.priorState = curState;
				clientMeta.state = newState;
				if ( child ) {
					this.hierarchy[ child.namespace ] = utils.listenToChild( this, child );
				}
				var eventPayload = this.buildEventPayload( client, {
					fromState: clientMeta.priorState,
					action: clientMeta.currentAction,
					toState: newState
				} );
				this.emit( TRANSITION, eventPayload );
				if ( newStateObj._onEnter ) {
					newStateObj._onEnter.call( this, client );
				}
				if ( child ) {
					child.handle( client, "_reset" );
				}

				if ( clientMeta.targetReplayState === newState ) {
					this.processQueue( client, NEXT_TRANSITION );
				}
				return;
			}
			this.emit( INVALID_STATE, this.buildEventPayload( client, {
				state: clientMeta.state,
				attemptedState: newState
			} ) );
		}
	},

	deferUntilTransition: function( client, stateName ) {
		var clientMeta = this.ensureClientMeta( client );
		if ( clientMeta.currentActionArgs ) {
			var queued = {
				type: NEXT_TRANSITION,
				untilState: stateName,
				args: clientMeta.currentActionArgs
			};
			clientMeta.inputQueue.push( queued );
			var eventPayload = this.buildEventPayload( client, {
				state: clientMeta.state,
				queuedArgs: queued
			} );
			this.emit( DEFERRED, eventPayload );
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
}, emitter );

	BehavioralFsm.extend = extend;

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
			_.defaults( this, _.cloneDeep( getDefaultClientMeta() ) );
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
	Fsm[methodWithClientInjected] = function() {
		var args = this.ensureClientArg( utils.getLeaklessArgs( arguments ) );
		return BehavioralFsm.prototype[methodWithClientInjected].apply( this, args );
	};
} );
 
	Fsm = BehavioralFsm.extend( Fsm );

	var machina = _.merge( emitter, {
	Fsm: Fsm,
	BehavioralFsm: BehavioralFsm,
	utils: utils,
	eventListeners: {
		newFsm: []
	}
} );

	return machina;
} ) );
