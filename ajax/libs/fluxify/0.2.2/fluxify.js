/* fluxify v0.2.2 (13-2-2015)
 * https://github.com/arqex/fluxify
 * By Javi Marquez (http://arqex.com)
 * License: GNU-2
 */
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.fluxify = factory();
	}
}(this, function() {
	'use strict';
	

var xUtils = {
	// Object extend, Nod to underscore.js
	_extend: function( obj ){
		var source, prop;

		for (var i = 0; i < arguments.length; i++) {
			source = arguments[i];
			for( prop in source )
				obj[prop] = source[prop];
		}

		return obj;
	}
};



var XEmitter = function(){
	Object.defineProperty( this, '_events', {
		value: {}
	});

	if( typeof this.initialize == 'function' )
		this.initialize.apply( this, arguments );
};

// The prototype methods are stored in a different object
// and applied as non enumerable properties later
var emitterPrototype = {
	on: function( eventName, listener, once ){
		var listeners = this._events[ eventName ] || [];

		listeners.push({ callback: listener, once: once});
		this._events[ eventName ] =  listeners;

		return this;
	},

	once: function( eventName, listener ){
		this.on( eventName, listener, true );
	},

	off: function( eventName, listener ){
		if( typeof eventName == 'undefined' ){
			this._events = {};
		}
		else if( typeof listener == 'undefined' ) {
			this._events[ eventName ] = [];
		}
		else {
			var listeners = this._events[ eventName ] || [],
				i
			;

			for (i = listeners.length - 1; i >= 0; i--) {
				if( listeners[i] === listener )
					listeners.splice( i, 1 );
			}
		}

		return this;
	},

	trigger: function( eventName ){
		var args = [].slice.call( arguments, 1 ),
			listeners = this._events[ eventName ] || [],
			onceListeners = [],
			i, listener
		;

		// Call listeners
		for (i = 0; i < listeners.length; i++) {
			listener = listeners[i];

			if( listener.callback )
				listener.callback.apply( null, args );
			else {
				// If there is not a callback, remove!
				listener.once = true;
			}

			if( listener.once )
				onceListeners.push( i );
		}

		// Remove listeners marked as once
		for( i = onceListeners.length - 1; i >= 0; i-- ){
			listeners.splice( onceListeners[i], 1 );
		}

		return this;
	}
};

// EventEmitter methods
xUtils._extend( emitterPrototype, {
	addListener: emitterPrototype.on,
	removeListener: emitterPrototype.off,
	removeAllListeners: emitterPrototype.off,
	emit: emitterPrototype.trigger
});

// Methods are not enumerable so, when the stores are
// extended with the emitter, they can be iterated as
// hashmaps
XEmitter.prototype = {};
for (var method in emitterPrototype ) {
	Object.defineProperty(XEmitter.prototype, method, {
		value: emitterPrototype[ method ]
	});
}

// Extend method for 'inheritance', nod to backbone.js
Object.defineProperty( XEmitter, '_extend', {
	value: function( protoProps ){
		var parent = this,
			child
		;

		if ( protoProps && protoProps.hasOwnProperty( constructor ) ) {
			child = protoProps.constructor;
		} else {
			child = function(){ return parent.apply(this, arguments); };
		}

		xUtils._extend( child, parent );

		var Surrogate = function(){
			// Again the constructor is also defined as not enumerable
			Object.defineProperty( this, 'constructor', {
				value: child
			});
		};
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();

		// All the extending methods need to be also
		// non enumerable properties
		if ( protoProps ) {
			for( var p in protoProps ){
				if( p != 'constructor' ) {
					Object.defineProperty( child.prototype, p, {
						value: protoProps[p]
					});
				}
			}
		}

		child.__super__ = parent.prototype;

		return child;
	}
});



var Store = XEmitter._extend({
	initialize: function( props ){
		if( ! props )
			return this.props = {};

		this.props = {};
		for( var p in props )
			this.props[ p ] = props[ p ];
	},

	get: function( prop ){
		return this.props[ prop ];
	},

	set: function( prop, value ){
		var props = prop,
			updates = [],
			previousValue, p
		;

		if( typeof value != 'undefined' ) {
			props = {};
			props[ prop ] = value;
		}

		for( p in props ){
			if( this.props[p] != props[p] ){
				previousValue = this.props[p];
				this.props[p] = props[p];
				updates.push({
					prop: p,
					previousValue: previousValue,
					value: props[p]
				});
			}
		}

		if( updates.length )
			this.emit('change', updates);
	}
});

var XStore = XEmitter._extend({
	initialize: function( options ){
		var me = this,
			opts = options || {},
			store = new Store( opts.initialState ),
			actionType, stateProp
		;

		// Store id
		if( options.id ) {
			Object.defineProperty( this, '_id', {
				value: options.id
			});
		}

		// Register action callbacks in the store
		Object.defineProperties( this, {
			_callbacks: {
				writable: true,
				configurable: true,
				value: {}
			},
			addActionCallbacks: {
				value: function( clbks ){
					for( actionType in clbks ){
						me._callbacks[ actionType ] = clbks[ actionType ].bind( this, store );
					}
				}
			},

			// Callback for register in the dispatcher
			callback: {
				value: (function(){
					var actionType = arguments[ 0 ],
						args = [].slice.call( arguments, 1 )
					;

					if( this._callbacks[ actionType ] ){
						// The callbacks are already bound to this xStore and the mutable store
						return this._callbacks[ actionType ].apply( this, args );
					}

					return true;
				}).bind( this )
			}
		});

		this.addActionCallbacks( opts.actionCallbacks || {} );

		// Create inmmutable properties
		var addProperty = function( propName, value ) {
			Object.defineProperty( me, propName, {
				enumerable: true,
				configurable: false,
				get: function(){
					return store.get( propName );
				}
			});
		};

		if( opts.initialState ){
			for (stateProp in opts.initialState ){
				addProperty( stateProp, opts.initialState[ stateProp ] );
			}
		}

		// Emit on store change
		store.on( 'change', function( updates ){
			var updatesLength = updates.length,
				update,	i
			;

			for(i=0; i < updatesLength; i++){
				update = updates[i];

				// If the property is new, add it to the xStore
				if( !me.hasOwnProperty( update.prop ) )
					addProperty( update.prop, update.value );

				me.emit('change:' + update.prop, update.value, update.previousValue );
			}

			me.emit( 'change', updates );
		});
	},

	getState: function() {
		// Clone the store properties
		return xUtils._extend({}, this);
	},

	waitFor: function( ids ) {
		// The xDispatcher adds itself as a property
		// when the xStore is registered
		return this._dispatcher.waitFor( ids );
	}
});



/**
 * The asynchronous dispatcher compatible with Facebook's flux dispatcher
 * http://facebook.github.io/flux/docs/dispatcher.html
 *
 * Dispatch actions to the registered callbacks, those action can be
 * asynchronous if they return a Promise.
 */
var XDispatcher = function(){
	this._callbacks = {};
	this._dispatchQueue = [];
	this._currentDispatch = false;
	this._ID =  1;

	if( typeof Promise != 'undefined' ){
		this._Promise = Promise;
	}
};

XDispatcher.prototype = {

	/**
	 * Register a callback that will be called when an action is dispatched.
	 *
	 * @param  {String | Function}   id  If a string is passed, it will be the id of the callback.
	 *                  If a function is passed, it will be used as callback, and id is generated
	 *                  automatically.
	 * @param  {Function} callback If an id is passed as a first argument, this will be the callback.
	 * @return {String}            The id of the callback to be used with the waitFor method.
	 */
	register: function( id, callback ){
		var ID = id;

		// If the callback is the first parameter
		if( typeof id == 'function' ){
			ID = 'ID_' + this._ID;
			callback = id;
		}

		this._callbacks[ID] = callback;
		this._ID++;

		return ID;
	},

	/**
	 * Register a XStore in the dispacher. XStores has a method called callback. The dispatcher
	 * register that function as a regular callback.
	 *
	 * @param  {String} id     The id for the store to be used in the waitFor method.
	 * @param  {XStore} xStore Store to register in the dispatcher
	 * @return {String}        The id of the callback to be used with the waitFor method.
	 */
	registerStore: function( id, xStore ){

		Object.defineProperty(xStore, '_dispatcher', {
			value: this
		});

		return this.register( id, xStore.callback );
	},

	/**
	 * Unregister a callback given its id.
	 *
	 * @param  {String} id Callback/Store id
	 * @return {undefined}
	 */
	unregister: function( id ) {
		delete this._callbacks[id];
	},

	/**
	 * Creates a promise and waits for the callbacks specified to complete before resolve it.
	 * If it is used by an actionCallback, the promise should be resolved to let other callbacks
	 * wait for it if needed.
	 *
	 * Be careful of not to wait by a callback that is waiting by the current callback, or the
	 * promises will never fulfill.
	 *
	 * @param  {String<Array>|String} ids The id or ids of the callbacks/stores to wait for.
	 * @return {Promise} A promise to be resolved when the specified callbacks are completed.
	 */
	waitFor: function( ids ) {
		var promises = [],
			i = 0
		;

		if( !Array.isArray( ids ) )
			ids = [ ids ];

		for(; i<ids.length; i++ ){
			if( this._promises[ ids[i] ] )
				promises.push( this._promises[ ids[i] ] );
		}

		if( !promises.length )
			return this._Promise.resolve();

		return this._Promise.all( promises );
	},

	/**
	 * Dispatches an action to all the registered callbacks/stores.
	 *
	 * If a second action is dispatched while there is a dispatch on, it will be
	 * enqueued an dispatched after the current one.
	 *
	 * @return { Promise } A promise to be resolved when all the callbacks have finised.
	 */
	dispatch: function() {
		var me = this,
			dispatchArguments = arguments,
			promise, dequeue
		;

		if( ! this._Promise )
			throw( new TypeError( 'No promises.' ));

		// If we are in the middle of a dispatch, enqueue the dispatch
		if( this._currentDispatch ) {

			// Dispatch after the current one
			promise = this._currentDispatch.then( function(){
				return me._dispatch.apply(me, dispatchArguments);
			});

			// Enqueue, set the chain as the current promise and return
			this._dispatchQueue.push( promise );
			return this._currentDispatch = promise;
		}

		return this._currentDispatch = this._dispatch.apply( me, dispatchArguments );
	},

	/**
	 * Dispatches an action inmediatelly.
	 *
	 * @return {Promise} A promise to be resolved when all the callbacks have finised.
	 */
	_dispatch: function(){
		var me = this,
			dispatchArguments = arguments,
			promises = []
		;

		this._promises = [];

		// A closure is needed for the callback id
		Object.keys( this._callbacks ).forEach( function( id ){

			// All the promises must be set in me._promises before trying to resolve
			// in order to make waitFor work ok
			me._promises[ id ] = me._Promise.resolve()
				.then( function(){
					return me._callbacks[ id ].apply( me, dispatchArguments );
				})
				.catch( function( err ){
					console.error( err.stack || err );
				})
			;

			promises.push( me._promises[ id ] );
		});

		//
		var dequeue = function(){
			me._dispatchQueue.shift();
			if( !me._dispatchQueue.length )
				me._currentDispatch = false;
		};

		return this._Promise.all( promises )
			.then( dequeue, dequeue )
		;
	},

	/**
	 * Is this dispatcher currently dispatching.
	 *
	 * @return {Boolean}
	 */
	isDispatching: function() {
		return !!this._dispatchQueue.length;
	}

};



/**
 * Fluxify class that will be used as a singleton.
 * Initializes the dispatcher and the store.
 * Also set the Promise object if it is globally available.
 */
var Fluxify = function(){
	Object.defineProperty( this, 'dispatcher', {
		value: new XDispatcher()
	});

	this.stores = {};

	if( typeof Promise != 'undefined' ){
		this.promisify( Promise );
	}
};

Fluxify.prototype = {
	/**
	 * Create a new store. If an id is passed in the options,
	 * the store will be registered in the dispatcher and saved
	 * in fluxify.stores[id].
	 *
	 * @param  {Object} options {id, initialState, actionCallback}
	 * @return {XStore}
	 */
	createStore: function( options ){
		var store = new XStore( options );

		// If the store has an id, register it in Fluxify and in the dispatcher
		if( store._id ){
			this.stores[ store._id ] = store;
			this.dispatcher.registerStore( store._id, store );
		}

		return store;
	},

	/**
	 * Executes an action. The arguments of this function will be available
	 * for the action callbacks registered in the dispatcher.
	 * @return { Promise } A promise that is resolved when all the action callbacks
	 *                   have finished.
	 */
	doAction: function() {
		return this.dispatcher.dispatch.apply( this.dispatcher, arguments );
	},

	/**
	 * If ES6 Promise object is not defined globally or polyfilled, a Promise object
	 * can be given to fluxify in order to make it work, using this method.
	 *
	 * @param  { Promise } Promise ES6 Promise compatible object
	 * @return { undefined }
	 */
	promisify: function( Promise ){
		this._Promise = Promise;
		this.dispatcher._Promise = Promise;
	}
};


	return new Fluxify();
}));