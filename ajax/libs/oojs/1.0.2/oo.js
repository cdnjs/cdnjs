/*!
 * Object Oriented JavaScript Library v1.0.2
 * https://github.com/trevorparscal/oojs
 *
 * Copyright 2011-2013 OOJS Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: Thu Jul 25 2013 04:30:26 GMT+0200 (CEST)
 */
( function ( global ) {

'use strict';
var
	/**
	 * Namespace for all classes, static methods and static properties.
	 * @class OO
	 * @singleton
	 */
	oo = {},
	hasOwn = oo.hasOwnProperty,
	toString = oo.toString;

/* Class Methods */


/**
 * Assert whether a value is a plain object or not.
 *
 * @method
 * @param {Mixed} obj
 * @return {boolean}
 */
oo.isPlainObject = function ( obj ) {
	// Any object or value whose internal [[Class]] property is not "[object Object]"
	if ( toString.call( obj ) !== '[object Object]' ) {
		return false;
	}

	// The try/catch suppresses exceptions thrown when attempting to access
	// the "constructor" property of certain host objects suich as window.location
	// in Firefox < 20 (https://bugzilla.mozilla.org/814622)
	try {
		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, 'isPrototypeOf' ) ) {
			return false;
		}
	} catch ( e ) {
		return false;
	}

	return true;
};

/**
 * Utility for common usage of Object#create for inheriting from one
 * prototype to another.
 *
 * Beware: This redefines the prototype, call before setting your prototypes.
 * Beware: This redefines the prototype, can only be called once on a function.
 *  If called multiple times on the same function, the previous prototype is lost.
 *  This is how prototypal inheritance works, it can only be one straight chain
 *  (just like classical inheritance in PHP for example). If you need to work with
 *  multiple constructors consider storing an instance of the other constructor in a
 *  property instead, or perhaps use a mixin (see oo.mixinClass).
 *
 *     function Foo() {}
 *     Foo.prototype.jump = function () {};
 *
 *     function FooBar() {}
 *     oo.inheritClass( FooBar, Foo );
 *     FooBar.prop.feet = 2;
 *     FooBar.prototype.walk = function () {};
 *
 *     function FooBarQuux() {}
 *     OO.inheritClass( FooBarQuux, FooBar );
 *     FooBarQuux.prototype.jump = function () {};
 *
 *     FooBarQuux.prop.feet === 2;
 *     var fb = new FooBar();
 *     fb.jump();
 *     fb.walk();
 *     fb instanceof Foo && fb instanceof FooBar && fb instanceof FooBarQuux;
 *
 * @method
 * @param {Function} targetFn
 * @param {Function} originFn
 * @throws {Error} If target already inherits from origin
 */
oo.inheritClass = function ( targetFn, originFn ) {
	if ( targetFn.prototype instanceof originFn ) {
		throw new Error( 'Target already inherits from origin' );
	}

	var targetConstructor = targetFn.prototype.constructor;

	targetFn.prototype = Object.create( originFn.prototype, {
		// Restore constructor property of targetFn
		constructor: {
			value: targetConstructor,
			enumerable: false,
			writable: true,
			configurable: true
		}
	} );

	// Extend static properties - always initialize both sides
	originFn.static = originFn.static || {};
	targetFn.static = Object.create( originFn.static );

	// Copy mixin tracking
	targetFn.mixins = originFn.mixins ? originFn.mixins.slice( 0 ) : [];
};

/**
 * Utility to copy over *own* prototype properties of a mixin.
 * The 'constructor' (whether implicit or explicit) is not copied over.
 *
 * This does not create inheritance to the origin. If inheritance is needed
 * use oo.inheritClass instead.
 *
 * Beware: This can redefine a prototype property, call before setting your prototypes.
 * Beware: Don't call before oo.inheritClass.
 *
 *     function Foo() {}
 *     function Context() {}
 *
 *     // Avoid repeating this code
 *     function ContextLazyLoad() {}
 *     ContextLazyLoad.prototype.getContext = function () {
 *         if ( !this.context ) {
 *             this.context = new Context();
 *         }
 *         return this.context;
 *     };
 *
 *     function FooBar() {}
 *     OO.inheritClass( FooBar, Foo );
 *     OO.mixinClass( FooBar, ContextLazyLoad );
 *
 * @method
 * @param {Function} targetFn
 * @param {Function} originFn
 */
oo.mixinClass = function ( targetFn, originFn ) {
	var key;

	// Copy prototype properties
	for ( key in originFn.prototype ) {
		if ( key !== 'constructor' && hasOwn.call( originFn.prototype, key ) ) {
			targetFn.prototype[key] = originFn.prototype[key];
		}
	}

	// Copy static properties - always initialize both sides
	targetFn.static = targetFn.static || {};
	if ( originFn.static ) {
		for ( key in originFn.static ) {
			if ( hasOwn.call( originFn.static, key ) ) {
				targetFn.static[key] = originFn.static[key];
			}
		}
	} else {
		originFn.static = {};
	}
};

/* Object Methods */

/**
 * Create a new object that is an instance of the same
 * constructor as the input, inherits from the same object
 * and contains the same own properties.
 *
 * This makes a shallow non-recursive copy of own properties.
 * To create a recursive copy of plain objects, use #copy.
 *
 *     var foo = new Person( mom, dad );
 *     foo.setAge( 21 );
 *     var foo2 = OO.cloneObject( foo );
 *     foo.setAge( 22 );
 *
 *     // Then
 *     foo2 !== foo; // true
 *     foo2 instanceof Person; // true
 *     foo2.getAge(); // 21
 *     foo.getAge(); // 22
 *
 * @method
 * @param {Object} origin
 * @return {Object} Clone of origin
 */
oo.cloneObject = function ( origin ) {
	var key, r;

	r = Object.create( origin.constructor.prototype );

	for ( key in origin ) {
		if ( hasOwn.call( origin, key ) ) {
			r[key] = origin[key];
		}
	}

	return r;
};

/**
 * Gets an array of all property values in an object.
 *
 * @method
 * @param {Object} Object to get values from
 * @returns {Array} List of object values
 */
oo.getObjectValues = function ( obj ) {
	var key, values;

	if ( obj !== Object( obj ) ) {
		throw new TypeError( 'Called on non-object' );
	}

	values = [];
	for ( key in obj ) {
		if ( hasOwn.call( obj, key ) ) {
			values[values.length] = obj[key];
		}
	}

	return values;
};

/**
 * Recursively compares properties between two objects.
 *
 * A false result may be caused by property inequality or by properties in one object missing from
 * the other. An asymmetrical test may also be performed, which checks only that properties in the
 * first object are present in the second object, but not the inverse.
 *
 * @method
 * @param {Object} a First object to compare
 * @param {Object} b Second object to compare
 * @param {boolean} [asymmetrical] Whether to check only that b contains values from a
 * @returns {boolean} If the objects contain the same values as each other
 */
oo.compare = function ( a, b, asymmetrical ) {
	var aValue, bValue, aType, bType, k;

	if ( a === b ) {
		return true;
	}

	for ( k in a ) {
		aValue = a[k];
		bValue = b[k];
		aType = typeof aValue;
		bType = typeof bValue;
		if ( aType !== bType ||
			( ( aType === 'string' || aType === 'number' ) && aValue !== bValue ) ||
			( aValue === Object( aValue ) && !oo.compare( aValue, bValue, asymmetrical ) ) ) {
			return false;
		}
	}
	// If the check is not asymmetrical, recursing with the arguments swapped will verify our result
	return asymmetrical ? true : oo.compare( b, a, true );
};

/**
 * Create a plain deep copy of any kind of object.
 *
 * Copies are deep, and will either be an object or an array depending on `source`.
 *
 * @method
 * @param {Object} source Object to copy
 * @param {Function} [callback] Applied to leaf values before they added to the clone
 * @returns {Object} Copy of source object
 */
oo.copy = function ( source, callback ) {
	var key, sourceValue, sourceType, destination;

	if ( typeof source.clone === 'function' ) {
		return source.clone();
	}

	destination = Array.isArray( source ) ? new Array( source.length ) : {};

	for ( key in source ) {
		sourceValue = source[key];
		sourceType = typeof sourceValue;
		if ( Array.isArray( sourceValue ) ) {
			// Array
			destination[key] = oo.copy( sourceValue, callback );
		} else if ( sourceValue && typeof sourceValue.clone === 'function' ) {
			// Duck type object with custom clone method
			destination[key] = callback ?
				callback( sourceValue.clone() ) : sourceValue.clone();
		} else if ( sourceValue && typeof sourceValue.cloneNode === 'function' ) {
			// DOM Node
			destination[key] = callback ?
				callback( sourceValue.cloneNode( true ) ) : sourceValue.cloneNode( true );
		} else if ( oo.isPlainObject( sourceValue ) ) {
			// Plain objects
			destination[key] = oo.copy( sourceValue, callback );
		} else {
			// Non-plain objects (incl. functions) and primitive values
			destination[key] = callback ? callback( sourceValue ) : sourceValue;
		}
	}

	return destination;
};
/**
 * Event emitter.
 *
 * @class OO.EventEmitter
 * @constructor
 * @property {Object} bindings
 */
oo.EventEmitter = function OoEventEmitter() {
	// Properties
	this.bindings = {};
};

/* Methods */

/**
 * Add a listener to events of a specific event.
 *
 * @method
 * @param {string} event Type of event to listen to
 * @param {Function} callback Function to call when event occurs
 * @param {Array} [args] Arguments to pass to listener, will be prepended to emitted arguments
 * @param {Object} [context=null] Object to use as context for callback function or call method on
 * @throws {Error} Listener argument is not a function or method name
 * @chainable
 */
oo.EventEmitter.prototype.on = function ( event, callback, args, context ) {
	// Validate callback
	if ( typeof callback !== 'function' ) {
		throw new Error( 'Invalid callback. Function or method name expected.' );
	}

	// Auto-initialize binding
	if ( !( event in this.bindings ) ) {
		this.bindings[event] = [];
	}

	// Add binding
	this.bindings[event].push( {
		'callback': callback,
		'args': args,
		'context': context || null
	} );
	return this;
};

/**
 * Adds a one-time listener to a specific event.
 *
 * @method
 * @param {string} event Type of event to listen to
 * @param {Function} listener Listener to call when event occurs
 * @chainable
 */
oo.EventEmitter.prototype.once = function ( event, listener ) {
	var eventEmitter = this;
	return this.on( event, function listenerWrapper() {
		eventEmitter.off( event, listenerWrapper );
		listener.apply( eventEmitter, Array.prototype.slice.call( arguments, 0 ) );
	} );
};

/**
 * Remove a specific listener from a specific event.
 *
 * @method
 * @param {string} event Type of event to remove listener from
 * @param {Function} [callback] Listener to remove, omit to remove all
 * @chainable
 * @throws {Error} Listener argument is not a function
 */
oo.EventEmitter.prototype.off = function ( event, callback ) {
	var i, bindings;

	if ( arguments.length === 1 ) {
		// Remove all bindings for event
		if ( event in this.bindings ) {
			delete this.bindings[event];
		}
	} else {
		if ( typeof callback !== 'function' ) {
			throw new Error( 'Invalid callback. Function expected.' );
		}
		if ( !( event in this.bindings ) || !this.bindings[event].length ) {
			// No matching bindings
			return this;
		}
		// Remove matching handlers
		bindings = this.bindings[event];
		i = bindings.length;
		while ( i-- ) {
			if ( bindings[i].callback === callback ) {
				bindings.splice( i, 1 );
			}
		}
		// Cleanup if now empty
		if ( bindings.length === 0 ) {
			delete this.bindings[event];
		}
	}
	return this;
};

/**
 * Emit an event.
 * TODO: Should this be chainable? What is the usefulness of the boolean
 * return value here?
 *
 * @method
 * @param {string} event Type of event
 * @param {Mixed} args First in a list of variadic arguments passed to event handler (optional)
 * @returns {boolean} If event was handled by at least one listener
 */
oo.EventEmitter.prototype.emit = function ( event ) {
	var i, len, binding, bindings, args;

	if ( event in this.bindings ) {
		// Slicing ensures that we don't get tripped up by event handlers that add/remove bindings
		bindings = this.bindings[event].slice();
		args = Array.prototype.slice.call( arguments, 1 );
		for ( i = 0, len = bindings.length; i < len; i++ ) {
			binding = bindings[i];
			binding.callback.apply(
				binding.context,
				binding.args ? binding.args.concat( args ) : args
			);
		}
		return true;
	}
	return false;
};

/**
 * Connect event handlers to an object.
 *
 * @method
 * @param {Object} context Object to call methods on when events occur
 * @param {Object.<string,string>|Object.<string,Function>|Object.<string,Array>} methods List of
 * event bindings keyed by event name containing either method names, functions or arrays containing
 * method name or function followed by a list of arguments to be passed to callback before emitted
 * arguments
 * @chainable
 */
oo.EventEmitter.prototype.connect = function ( context, methods ) {
	var method, callback, args, event;

	for ( event in methods ) {
		method = methods[event];
		// Allow providing additional args
		if ( Array.isArray( method ) ) {
			args = method.slice( 1 );
			method = method[0];
		} else {
			args = [];
		}
		// Allow callback to be a method name
		if ( typeof method === 'string' ) {
			// Validate method
			if ( !context[method] || typeof context[method] !== 'function' ) {
				throw new Error( 'Method not found: ' + method );
			}
			// Resolve to function
			callback = context[method];
		} else {
			callback = method;
		}
		// Add binding
		this.on.apply( this, [ event, callback, args, context ] );
	}
	return this;
};

/**
 * Disconnect event handlers from an object.
 *
 * @method
 * @param {Object} context Object to disconnect methods from
 * @param {Object.<string,string>|Object.<string,Function>|Object.<string,Array>} [methods] List of
 * event bindings keyed by event name containing either method names or functions
 * @chainable
 */
oo.EventEmitter.prototype.disconnect = function ( context, methods ) {
	var i, method, callback, event, bindings;

	if ( methods ) {
		for ( event in methods ) {
			method = methods[event];
			if ( typeof method === 'string' ) {
				// Validate method
				if ( !context[method] || typeof context[method] !== 'function' ) {
					throw new Error( 'Method not found: ' + method );
				}
				// Resolve to function
				callback = context[method];
			} else {
				callback = method;
			}
			bindings = this.bindings[event];
			i = bindings.length;
			while ( i-- ) {
				if ( bindings[i].context === context && bindings[i].callback === callback ) {
					bindings.splice( i, 1 );
				}
			}
			if ( bindings.length === 0 ) {
				delete this.bindings[event];
			}
		}
	} else {
		for ( event in this.bindings ) {
			bindings = this.bindings[event];
			i = bindings.length;
			while ( i-- ) {
				if ( bindings[i].context === context ) {
					bindings.splice( i, 1 );
				}
			}
			if ( bindings.length === 0 ) {
				delete this.bindings[event];
			}
		}
	}

	return this;
};
/*jshint node:true */
if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = oo;
} else {
	global.OO = oo;
}
}( this ) );
