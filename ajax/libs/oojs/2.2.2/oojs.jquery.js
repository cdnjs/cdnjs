/*!
 * OOjs v2.2.2 optimised for jQuery
 * https://www.mediawiki.org/wiki/OOjs
 *
 * Copyright 2011-2018 OOjs Team and other contributors.
 * Released under the MIT license
 * https://oojs.mit-license.org
 *
 * Date: 2018-06-14T20:13:14Z
 */
( function ( global ) {

'use strict';

/* exported toString */
var
	/**
	 * Namespace for all classes, static methods and static properties.
	 * @class OO
	 * @singleton
	 */
	oo = {},
	// Optimisation: Local reference to Object.prototype.hasOwnProperty
	hasOwn = oo.hasOwnProperty,
	toString = oo.toString;

/* Class Methods */

/**
 * Utility to initialize a class for OO inheritance.
 *
 * Currently this just initializes an empty static object.
 *
 * @param {Function} fn
 */
oo.initClass = function ( fn ) {
	fn.static = fn.static || {};
};

/**
 * Inherit from prototype to another using Object#create.
 *
 * Beware: This redefines the prototype, call before setting your prototypes.
 *
 * Beware: This redefines the prototype, can only be called once on a function.
 * If called multiple times on the same function, the previous prototype is lost.
 * This is how prototypal inheritance works, it can only be one straight chain
 * (just like classical inheritance in PHP for example). If you need to work with
 * multiple constructors consider storing an instance of the other constructor in a
 * property instead, or perhaps use a mixin (see OO.mixinClass).
 *
 *     function Thing() {}
 *     Thing.prototype.exists = function () {};
 *
 *     function Person() {
 *         Person.super.apply( this, arguments );
 *     }
 *     OO.inheritClass( Person, Thing );
 *     Person.static.defaultEyeCount = 2;
 *     Person.prototype.walk = function () {};
 *
 *     function Jumper() {
 *         Jumper.super.apply( this, arguments );
 *     }
 *     OO.inheritClass( Jumper, Person );
 *     Jumper.prototype.jump = function () {};
 *
 *     Jumper.static.defaultEyeCount === 2;
 *     var x = new Jumper();
 *     x.jump();
 *     x.walk();
 *     x instanceof Thing && x instanceof Person && x instanceof Jumper;
 *
 * @param {Function} targetFn
 * @param {Function} originFn
 * @throws {Error} If target already inherits from origin
 */
oo.inheritClass = function ( targetFn, originFn ) {
	var targetConstructor;

	if ( !originFn ) {
		throw new Error( 'inheritClass: Origin is not a function (actually ' + originFn + ')' );
	}
	if ( targetFn.prototype instanceof originFn ) {
		throw new Error( 'inheritClass: Target already inherits from origin' );
	}

	targetConstructor = targetFn.prototype.constructor;

	// [DEPRECATED] Provide .parent as alias for code supporting older browsers which
	// allows people to comply with their style guide.
	targetFn.super = targetFn.parent = originFn;

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
	oo.initClass( originFn );
	targetFn.static = Object.create( originFn.static );
};

/**
 * Copy over *own* prototype properties of a mixin.
 *
 * The 'constructor' (whether implicit or explicit) is not copied over.
 *
 * This does not create inheritance to the origin. If you need inheritance,
 * use OO.inheritClass instead.
 *
 * Beware: This can redefine a prototype property, call before setting your prototypes.
 *
 * Beware: Don't call before OO.inheritClass.
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
 * @param {Function} targetFn
 * @param {Function} originFn
 */
oo.mixinClass = function ( targetFn, originFn ) {
	var key;

	if ( !originFn ) {
		throw new Error( 'mixinClass: Origin is not a function (actually ' + originFn + ')' );
	}

	// Copy prototype properties
	for ( key in originFn.prototype ) {
		if ( key !== 'constructor' && hasOwn.call( originFn.prototype, key ) ) {
			targetFn.prototype[ key ] = originFn.prototype[ key ];
		}
	}

	// Copy static properties - always initialize both sides
	oo.initClass( targetFn );
	if ( originFn.static ) {
		for ( key in originFn.static ) {
			if ( hasOwn.call( originFn.static, key ) ) {
				targetFn.static[ key ] = originFn.static[ key ];
			}
		}
	} else {
		oo.initClass( originFn );
	}
};

/**
 * Test whether one class is a subclass of another, without instantiating it.
 *
 * Every class is considered a subclass of Object and of itself.
 *
 * @param {Function} testFn The class to be tested
 * @param {Function} baseFn The base class
 * @return {boolean} Whether testFn is a subclass of baseFn (or equal to it)
 */
oo.isSubclass = function ( testFn, baseFn ) {
	return testFn === baseFn || testFn.prototype instanceof baseFn;
};

/* Object Methods */

/**
 * Get a deeply nested property of an object using variadic arguments, protecting against
 * undefined property errors.
 *
 * `quux = OO.getProp( obj, 'foo', 'bar', 'baz' );` is equivalent to `quux = obj.foo.bar.baz;`
 * except that the former protects against JS errors if one of the intermediate properties
 * is undefined. Instead of throwing an error, this function will return undefined in
 * that case.
 *
 * @param {Object} obj
 * @param {...Mixed} [keys]
 * @return {Object|undefined} obj[arguments[1]][arguments[2]].... or undefined
 */
oo.getProp = function ( obj ) {
	var i,
		retval = obj;
	for ( i = 1; i < arguments.length; i++ ) {
		if ( retval === undefined || retval === null ) {
			// Trying to access a property of undefined or null causes an error
			return undefined;
		}
		retval = retval[ arguments[ i ] ];
	}
	return retval;
};

/**
 * Set a deeply nested property of an object using variadic arguments, protecting against
 * undefined property errors.
 *
 * `oo.setProp( obj, 'foo', 'bar', 'baz' );` is equivalent to `obj.foo.bar = baz;` except that
 * the former protects against JS errors if one of the intermediate properties is
 * undefined. Instead of throwing an error, undefined intermediate properties will be
 * initialized to an empty object. If an intermediate property is not an object, or if obj itself
 * is not an object, this function will silently abort.
 *
 * @param {Object} obj
 * @param {...Mixed} [keys]
 * @param {Mixed} [value]
 */
oo.setProp = function ( obj ) {
	var i,
		prop = obj;
	if ( Object( obj ) !== obj || arguments.length < 2 ) {
		return;
	}
	for ( i = 1; i < arguments.length - 2; i++ ) {
		if ( prop[ arguments[ i ] ] === undefined ) {
			prop[ arguments[ i ] ] = {};
		}
		if ( Object( prop[ arguments[ i ] ] ) !== prop[ arguments[ i ] ] ) {
			return;
		}
		prop = prop[ arguments[ i ] ];
	}
	prop[ arguments[ arguments.length - 2 ] ] = arguments[ arguments.length - 1 ];
};

/**
 * Delete a deeply nested property of an object using variadic arguments, protecting against
 * undefined property errors, and deleting resulting empty objects.
 *
 * @param {Object} obj
 * @param {...Mixed} [keys]
 */
oo.deleteProp = function ( obj ) {
	var i,
		prop = obj,
		props = [ prop ];
	if ( Object( obj ) !== obj || arguments.length < 2 ) {
		return;
	}
	for ( i = 1; i < arguments.length - 1; i++ ) {
		if ( prop[ arguments[ i ] ] === undefined || Object( prop[ arguments[ i ] ] ) !== prop[ arguments[ i ] ] ) {
			return;
		}
		prop = prop[ arguments[ i ] ];
		props.push( prop );
	}
	delete prop[ arguments[ i ] ];
	// Walk back through props removing any plain empty objects
	while ( props.length > 1 && ( prop = props.pop() ) && oo.isPlainObject( prop ) && !Object.keys( prop ).length ) {
		delete props[ props.length - 1 ][ arguments[ props.length ] ];
	}
};

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
 * @param {Object} origin
 * @return {Object} Clone of origin
 */
oo.cloneObject = function ( origin ) {
	var key, r;

	r = Object.create( origin.constructor.prototype );

	for ( key in origin ) {
		if ( hasOwn.call( origin, key ) ) {
			r[ key ] = origin[ key ];
		}
	}

	return r;
};

/**
 * Get an array of all property values in an object.
 *
 * @param {Object} obj Object to get values from
 * @return {Array} List of object values
 */
oo.getObjectValues = function ( obj ) {
	var key, values;

	if ( obj !== Object( obj ) ) {
		throw new TypeError( 'Called on non-object' );
	}

	values = [];
	for ( key in obj ) {
		if ( hasOwn.call( obj, key ) ) {
			values[ values.length ] = obj[ key ];
		}
	}

	return values;
};

/**
 * Use binary search to locate an element in a sorted array.
 *
 * searchFunc is given an element from the array. `searchFunc(elem)` must return a number
 * above 0 if the element we're searching for is to the right of (has a higher index than) elem,
 * below 0 if it is to the left of elem, or zero if it's equal to elem.
 *
 * To search for a specific value with a comparator function (a `function cmp(a,b)` that returns
 * above 0 if `a > b`, below 0 if `a < b`, and 0 if `a == b`), you can use
 * `searchFunc = cmp.bind( null, value )`.
 *
 * @param {Array} arr Array to search in
 * @param {Function} searchFunc Search function
 * @param {boolean} [forInsertion] If not found, return index where val could be inserted
 * @return {number|null} Index where val was found, or null if not found
 */
oo.binarySearch = function ( arr, searchFunc, forInsertion ) {
	var mid, cmpResult,
		left = 0,
		right = arr.length;
	while ( left < right ) {
		// Equivalent to Math.floor( ( left + right ) / 2 ) but much faster
		// eslint-disable-next-line no-bitwise
		mid = ( left + right ) >> 1;
		cmpResult = searchFunc( arr[ mid ] );
		if ( cmpResult < 0 ) {
			right = mid;
		} else if ( cmpResult > 0 ) {
			left = mid + 1;
		} else {
			return mid;
		}
	}
	return forInsertion ? right : null;
};

/**
 * Recursively compare properties between two objects.
 *
 * A false result may be caused by property inequality or by properties in one object missing from
 * the other. An asymmetrical test may also be performed, which checks only that properties in the
 * first object are present in the second object, but not the inverse.
 *
 * If either a or b is null or undefined it will be treated as an empty object.
 *
 * @param {Object|undefined|null} a First object to compare
 * @param {Object|undefined|null} b Second object to compare
 * @param {boolean} [asymmetrical] Whether to check only that a's values are equal to b's
 *  (i.e. a is a subset of b)
 * @return {boolean} If the objects contain the same values as each other
 */
oo.compare = function ( a, b, asymmetrical ) {
	var aValue, bValue, aType, bType, k;

	if ( a === b ) {
		return true;
	}

	a = a || {};
	b = b || {};

	if ( typeof a.nodeType === 'number' && typeof a.isEqualNode === 'function' ) {
		return a.isEqualNode( b );
	}

	for ( k in a ) {
		if ( !hasOwn.call( a, k ) || a[ k ] === undefined || a[ k ] === b[ k ] ) {
			// Ignore undefined values, because there is no conceptual difference between
			// a key that is absent and a key that is present but whose value is undefined.
			continue;
		}

		aValue = a[ k ];
		bValue = b[ k ];
		aType = typeof aValue;
		bType = typeof bValue;
		if ( aType !== bType ||
			(
				( aType === 'string' || aType === 'number' || aType === 'boolean' ) &&
				aValue !== bValue
			) ||
			( aValue === Object( aValue ) && !oo.compare( aValue, bValue, true ) ) ) {
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
 * @param {Object} source Object to copy
 * @param {Function} [leafCallback] Applied to leaf values after they are cloned but before they are added to the clone
 * @param {Function} [nodeCallback] Applied to all values before they are cloned.  If the nodeCallback returns a value other than undefined, the returned value is used instead of attempting to clone.
 * @return {Object} Copy of source object
 */
oo.copy = function ( source, leafCallback, nodeCallback ) {
	var key, destination;

	if ( nodeCallback ) {
		// Extensibility: check before attempting to clone source.
		destination = nodeCallback( source );
		if ( destination !== undefined ) {
			return destination;
		}
	}

	if ( Array.isArray( source ) ) {
		// Array (fall through)
		destination = new Array( source.length );
	} else if ( source && typeof source.clone === 'function' ) {
		// Duck type object with custom clone method
		return leafCallback ? leafCallback( source.clone() ) : source.clone();
	} else if ( source && typeof source.cloneNode === 'function' ) {
		// DOM Node
		return leafCallback ?
			leafCallback( source.cloneNode( true ) ) :
			source.cloneNode( true );
	} else if ( oo.isPlainObject( source ) ) {
		// Plain objects (fall through)
		destination = {};
	} else {
		// Non-plain objects (incl. functions) and primitive values
		return leafCallback ? leafCallback( source ) : source;
	}

	// source is an array or a plain object
	for ( key in source ) {
		destination[ key ] = oo.copy( source[ key ], leafCallback, nodeCallback );
	}

	// This is an internal node, so we don't apply the leafCallback.
	return destination;
};

/**
 * Generate a hash of an object based on its name and data.
 *
 * Performance optimization: <http://jsperf.com/ve-gethash-201208#/toJson_fnReplacerIfAoForElse>
 *
 * To avoid two objects with the same values generating different hashes, we utilize the replacer
 * argument of JSON.stringify and sort the object by key as it's being serialized. This may or may
 * not be the fastest way to do this; we should investigate this further.
 *
 * Objects and arrays are hashed recursively. When hashing an object that has a .getHash()
 * function, we call that function and use its return value rather than hashing the object
 * ourselves. This allows classes to define custom hashing.
 *
 * @param {Object} val Object to generate hash for
 * @return {string} Hash of object
 */
oo.getHash = function ( val ) {
	return JSON.stringify( val, oo.getHash.keySortReplacer );
};

/**
 * Sort objects by key (helper function for OO.getHash).
 *
 * This is a callback passed into JSON.stringify.
 *
 * @method getHash_keySortReplacer
 * @param {string} key Property name of value being replaced
 * @param {Mixed} val Property value to replace
 * @return {Mixed} Replacement value
 */
oo.getHash.keySortReplacer = function ( key, val ) {
	var normalized, keys, i, len;
	if ( val && typeof val.getHashObject === 'function' ) {
		// This object has its own custom hash function, use it
		val = val.getHashObject();
	}
	if ( !Array.isArray( val ) && Object( val ) === val ) {
		// Only normalize objects when the key-order is ambiguous
		// (e.g. any object not an array).
		normalized = {};
		keys = Object.keys( val ).sort();
		i = 0;
		len = keys.length;
		for ( ; i < len; i += 1 ) {
			normalized[ keys[ i ] ] = val[ keys[ i ] ];
		}
		return normalized;
	} else {
		// Primitive values and arrays get stable hashes
		// by default. Lets those be stringified as-is.
		return val;
	}
};

/**
 * Get the unique values of an array, removing duplicates
 *
 * @param {Array} arr Array
 * @return {Array} Unique values in array
 */
oo.unique = function ( arr ) {
	return arr.reduce( function ( result, current ) {
		if ( result.indexOf( current ) === -1 ) {
			result.push( current );
		}
		return result;
	}, [] );
};

/**
 * Compute the union (duplicate-free merge) of a set of arrays.
 *
 * Arrays values must be convertable to object keys (strings).
 *
 * By building an object (with the values for keys) in parallel with
 * the array, a new item's existence in the union can be computed faster.
 *
 * @param {...Array} arrays Arrays to union
 * @return {Array} Union of the arrays
 */
oo.simpleArrayUnion = function () {
	var i, ilen, arr, j, jlen,
		obj = {},
		result = [];

	for ( i = 0, ilen = arguments.length; i < ilen; i++ ) {
		arr = arguments[ i ];
		for ( j = 0, jlen = arr.length; j < jlen; j++ ) {
			if ( !obj[ arr[ j ] ] ) {
				obj[ arr[ j ] ] = true;
				result.push( arr[ j ] );
			}
		}
	}

	return result;
};

/**
 * Combine arrays (intersection or difference).
 *
 * An intersection checks the item exists in 'b' while difference checks it doesn't.
 *
 * Arrays values must be convertable to object keys (strings).
 *
 * By building an object (with the values for keys) of 'b' we can
 * compute the result faster.
 *
 * @private
 * @param {Array} a First array
 * @param {Array} b Second array
 * @param {boolean} includeB Whether to items in 'b'
 * @return {Array} Combination (intersection or difference) of arrays
 */
function simpleArrayCombine( a, b, includeB ) {
	var i, ilen, isInB,
		bObj = {},
		result = [];

	for ( i = 0, ilen = b.length; i < ilen; i++ ) {
		bObj[ b[ i ] ] = true;
	}

	for ( i = 0, ilen = a.length; i < ilen; i++ ) {
		isInB = !!bObj[ a[ i ] ];
		if ( isInB === includeB ) {
			result.push( a[ i ] );
		}
	}

	return result;
}

/**
 * Compute the intersection of two arrays (items in both arrays).
 *
 * Arrays values must be convertable to object keys (strings).
 *
 * @param {Array} a First array
 * @param {Array} b Second array
 * @return {Array} Intersection of arrays
 */
oo.simpleArrayIntersection = function ( a, b ) {
	return simpleArrayCombine( a, b, true );
};

/**
 * Compute the difference of two arrays (items in 'a' but not 'b').
 *
 * Arrays values must be convertable to object keys (strings).
 *
 * @param {Array} a First array
 * @param {Array} b Second array
 * @return {Array} Intersection of arrays
 */
oo.simpleArrayDifference = function ( a, b ) {
	return simpleArrayCombine( a, b, false );
};

/* global $ */

oo.isPlainObject = $.isPlainObject;

/* global hasOwn */

( function () {

	/**
	 * @class OO.EventEmitter
	 *
	 * @constructor
	 */
	oo.EventEmitter = function OoEventEmitter() {
		// Properties

		/**
		 * Storage of bound event handlers by event name.
		 *
		 * @property
		 */
		this.bindings = {};
	};

	oo.initClass( oo.EventEmitter );

	/* Private helper functions */

	/**
	 * Validate a function or method call in a context
	 *
	 * For a method name, check that it names a function in the context object
	 *
	 * @private
	 * @param {Function|string} method Function or method name
	 * @param {Mixed} context The context of the call
	 * @throws {Error} A method name is given but there is no context
	 * @throws {Error} In the context object, no property exists with the given name
	 * @throws {Error} In the context object, the named property is not a function
	 */
	function validateMethod( method, context ) {
		// Validate method and context
		if ( typeof method === 'string' ) {
			// Validate method
			if ( context === undefined || context === null ) {
				throw new Error( 'Method name "' + method + '" has no context.' );
			}
			if ( typeof context[ method ] !== 'function' ) {
				// Technically the property could be replaced by a function before
				// call time. But this probably signals a typo.
				throw new Error( 'Property "' + method + '" is not a function' );
			}
		} else if ( typeof method !== 'function' ) {
			throw new Error( 'Invalid callback. Function or method name expected.' );
		}
	}

	/**
	 * @private
	 * @param {OO.EventEmitter} eventEmitter Event emitter
	 * @param {string} event Event name
	 * @param {Object} binding
	 */
	function addBinding( eventEmitter, event, binding ) {
		var bindings;
		// Auto-initialize bindings list
		if ( hasOwn.call( eventEmitter.bindings, event ) ) {
			bindings = eventEmitter.bindings[ event ];
		} else {
			bindings = eventEmitter.bindings[ event ] = [];
		}
		// Add binding
		bindings.push( binding );
	}

	/* Methods */

	/**
	 * Add a listener to events of a specific event.
	 *
	 * The listener can be a function or the string name of a method; if the latter, then the
	 * name lookup happens at the time the listener is called.
	 *
	 * @param {string} event Type of event to listen to
	 * @param {Function|string} method Function or method name to call when event occurs
	 * @param {Array} [args] Arguments to pass to listener, will be prepended to emitted arguments
	 * @param {Object} [context=null] Context object for function or method call
	 * @chainable
	 * @throws {Error} Listener argument is not a function or a valid method name
	 */
	oo.EventEmitter.prototype.on = function ( event, method, args, context ) {
		validateMethod( method, context );

		// Ensure consistent object shape (optimisation)
		addBinding( this, event, {
			method: method,
			args: args,
			context: ( arguments.length < 4 ) ? null : context,
			once: false
		} );
		return this;
	};

	/**
	 * Add a one-time listener to a specific event.
	 *
	 * @param {string} event Type of event to listen to
	 * @param {Function} listener Listener to call when event occurs
	 * @chainable
	 */
	oo.EventEmitter.prototype.once = function ( event, listener ) {
		validateMethod( listener );

		// Ensure consistent object shape (optimisation)
		addBinding( this, event, {
			method: listener,
			args: undefined,
			context: null,
			once: true
		} );
		return this;
	};

	/**
	 * Remove a specific listener from a specific event.
	 *
	 * @param {string} event Type of event to remove listener from
	 * @param {Function|string} [method] Listener to remove. Must be in the same form as was passed
	 * to "on". Omit to remove all listeners.
	 * @param {Object} [context=null] Context object function or method call
	 * @chainable
	 * @throws {Error} Listener argument is not a function or a valid method name
	 */
	oo.EventEmitter.prototype.off = function ( event, method, context ) {
		var i, bindings;

		if ( arguments.length === 1 ) {
			// Remove all bindings for event
			delete this.bindings[ event ];
			return this;
		}

		validateMethod( method, context );

		if ( !hasOwn.call( this.bindings, event ) || !this.bindings[ event ].length ) {
			// No matching bindings
			return this;
		}

		// Default to null context
		if ( arguments.length < 3 ) {
			context = null;
		}

		// Remove matching handlers
		bindings = this.bindings[ event ];
		i = bindings.length;
		while ( i-- ) {
			if ( bindings[ i ].method === method && bindings[ i ].context === context ) {
				bindings.splice( i, 1 );
			}
		}

		// Cleanup if now empty
		if ( bindings.length === 0 ) {
			delete this.bindings[ event ];
		}
		return this;
	};

	/**
	 * Emit an event.
	 *
	 * @param {string} event Type of event
	 * @param {...Mixed} args First in a list of variadic arguments passed to event handler (optional)
	 * @return {boolean} Whether the event was handled by at least one listener
	 */
	oo.EventEmitter.prototype.emit = function ( event ) {
		var args = [],
			i, len, binding, bindings, method;

		if ( hasOwn.call( this.bindings, event ) ) {
			// Slicing ensures that we don't get tripped up by event handlers that add/remove bindings
			bindings = this.bindings[ event ].slice();
			for ( i = 1, len = arguments.length; i < len; i++ ) {
				args.push( arguments[ i ] );
			}
			for ( i = 0, len = bindings.length; i < len; i++ ) {
				binding = bindings[ i ];
				if ( typeof binding.method === 'string' ) {
					// Lookup method by name (late binding)
					method = binding.context[ binding.method ];
				} else {
					method = binding.method;
				}
				if ( binding.once ) {
					// Must unbind before calling method to avoid
					// any nested triggers.
					this.off( event, method );
				}
				method.apply(
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
	 * @param {Object} context Object to call methods on when events occur
	 * @param {Object.<string,string>|Object.<string,Function>|Object.<string,Array>} methods List of
	 *  event bindings keyed by event name containing either method names, functions or arrays containing
	 *  method name or function followed by a list of arguments to be passed to callback before emitted
	 *  arguments.
	 * @chainable
	 */
	oo.EventEmitter.prototype.connect = function ( context, methods ) {
		var method, args, event;

		for ( event in methods ) {
			method = methods[ event ];
			// Allow providing additional args
			if ( Array.isArray( method ) ) {
				args = method.slice( 1 );
				method = method[ 0 ];
			} else {
				args = [];
			}
			// Add binding
			this.on( event, method, args, context );
		}
		return this;
	};

	/**
	 * Disconnect event handlers from an object.
	 *
	 * @param {Object} context Object to disconnect methods from
	 * @param {Object.<string,string>|Object.<string,Function>|Object.<string,Array>} [methods] List of
	 *  event bindings keyed by event name. Values can be either method names, functions or arrays
	 *  containing a method name.
	 *  NOTE: To allow matching call sites with connect(), array values are allowed to contain the
	 *  parameters as well, but only the method name is used to find bindings. Tt is discouraged to
	 *  have multiple bindings for the same event to the same listener, but if used (and only the
	 *  parameters vary), disconnecting one variation of (event name, event listener, parameters)
	 *  will disconnect other variations as well.
	 * @chainable
	 */
	oo.EventEmitter.prototype.disconnect = function ( context, methods ) {
		var i, event, method, bindings;

		if ( methods ) {
			// Remove specific connections to the context
			for ( event in methods ) {
				method = methods[ event ];
				if ( Array.isArray( method ) ) {
					method = method[ 0 ];
				}
				this.off( event, method, context );
			}
		} else {
			// Remove all connections to the context
			for ( event in this.bindings ) {
				bindings = this.bindings[ event ];
				i = bindings.length;
				while ( i-- ) {
					// bindings[i] may have been removed by the previous step's
					// this.off so check it still exists
					if ( bindings[ i ] && bindings[ i ].context === context ) {
						this.off( event, bindings[ i ].method, context );
					}
				}
			}
		}

		return this;
	};

}() );

( function () {

	/**
	 * Contain and manage a list of OO.EventEmitter items.
	 *
	 * Aggregates and manages their events collectively.
	 *
	 * This mixin must be used in a class that also mixes in OO.EventEmitter.
	 *
	 * @abstract
	 * @class OO.EmitterList
	 * @constructor
	 */
	oo.EmitterList = function OoEmitterList() {
		this.items = [];
		this.aggregateItemEvents = {};
	};

	/* Events */

	/**
	 * Item has been added
	 *
	 * @event add
	 * @param {OO.EventEmitter} item Added item
	 * @param {number} index Index items were added at
	 */

	/**
	 * Item has been moved to a new index
	 *
	 * @event move
	 * @param {OO.EventEmitter} item Moved item
	 * @param {number} index Index item was moved to
	 * @param {number} oldIndex The original index the item was in
	 */

	/**
	 * Item has been removed
	 *
	 * @event remove
	 * @param {OO.EventEmitter} item Removed item
	 * @param {number} index Index the item was removed from
	 */

	/**
	 * @event clear The list has been cleared of items
	 */

	/* Methods */

	/**
	 * Normalize requested index to fit into the bounds of the given array.
	 *
	 * @private
	 * @static
	 * @param {Array} arr Given array
	 * @param {number|undefined} index Requested index
	 * @return {number} Normalized index
	 */
	function normalizeArrayIndex( arr, index ) {
		return ( index === undefined || index < 0 || index >= arr.length ) ?
			arr.length :
			index;
	}

	/**
	 * Get all items.
	 *
	 * @return {OO.EventEmitter[]} Items in the list
	 */
	oo.EmitterList.prototype.getItems = function () {
		return this.items.slice( 0 );
	};

	/**
	 * Get the index of a specific item.
	 *
	 * @param {OO.EventEmitter} item Requested item
	 * @return {number} Index of the item
	 */
	oo.EmitterList.prototype.getItemIndex = function ( item ) {
		return this.items.indexOf( item );
	};

	/**
	 * Get number of items.
	 *
	 * @return {number} Number of items in the list
	 */
	oo.EmitterList.prototype.getItemCount = function () {
		return this.items.length;
	};

	/**
	 * Check if a list contains no items.
	 *
	 * @return {boolean} Group is empty
	 */
	oo.EmitterList.prototype.isEmpty = function () {
		return !this.items.length;
	};

	/**
	 * Aggregate the events emitted by the group.
	 *
	 * When events are aggregated, the group will listen to all contained items for the event,
	 * and then emit the event under a new name. The new event will contain an additional leading
	 * parameter containing the item that emitted the original event. Other arguments emitted from
	 * the original event are passed through.
	 *
	 * @param {Object.<string,string|null>} events An object keyed by the name of the event that should be
	 *  aggregated  (e.g., ‘click’) and the value of the new name to use (e.g., ‘groupClick’).
	 *  A `null` value will remove aggregated events.

	 * @throws {Error} If aggregation already exists
	 */
	oo.EmitterList.prototype.aggregate = function ( events ) {
		var i, item, add, remove, itemEvent, groupEvent;

		for ( itemEvent in events ) {
			groupEvent = events[ itemEvent ];

			// Remove existing aggregated event
			if ( Object.prototype.hasOwnProperty.call( this.aggregateItemEvents, itemEvent ) ) {
				// Don't allow duplicate aggregations
				if ( groupEvent ) {
					throw new Error( 'Duplicate item event aggregation for ' + itemEvent );
				}
				// Remove event aggregation from existing items
				for ( i = 0; i < this.items.length; i++ ) {
					item = this.items[ i ];
					if ( item.connect && item.disconnect ) {
						remove = {};
						remove[ itemEvent ] = [ 'emit', this.aggregateItemEvents[ itemEvent ], item ];
						item.disconnect( this, remove );
					}
				}
				// Prevent future items from aggregating event
				delete this.aggregateItemEvents[ itemEvent ];
			}

			// Add new aggregate event
			if ( groupEvent ) {
				// Make future items aggregate event
				this.aggregateItemEvents[ itemEvent ] = groupEvent;
				// Add event aggregation to existing items
				for ( i = 0; i < this.items.length; i++ ) {
					item = this.items[ i ];
					if ( item.connect && item.disconnect ) {
						add = {};
						add[ itemEvent ] = [ 'emit', groupEvent, item ];
						item.connect( this, add );
					}
				}
			}
		}
	};

	/**
	 * Add items to the list.
	 *
	 * @param {OO.EventEmitter|OO.EventEmitter[]} items Item to add or
	 *  an array of items to add
	 * @param {number} [index] Index to add items at. If no index is
	 *  given, or if the index that is given is invalid, the item
	 *  will be added at the end of the list.
	 * @chainable
	 * @fires add
	 * @fires move
	 */
	oo.EmitterList.prototype.addItems = function ( items, index ) {
		var i, oldIndex;

		if ( !Array.isArray( items ) ) {
			items = [ items ];
		}

		if ( items.length === 0 ) {
			return this;
		}

		index = normalizeArrayIndex( this.items, index );
		for ( i = 0; i < items.length; i++ ) {
			oldIndex = this.items.indexOf( items[ i ] );
			if ( oldIndex !== -1 ) {
				// Move item to new index
				index = this.moveItem( items[ i ], index );
				this.emit( 'move', items[ i ], index, oldIndex );
			} else {
				// insert item at index
				index = this.insertItem( items[ i ], index );
				this.emit( 'add', items[ i ], index );
			}
			index++;
		}

		return this;
	};

	/**
	 * Move an item from its current position to a new index.
	 *
	 * The item is expected to exist in the list. If it doesn't,
	 * the method will throw an exception.
	 *
	 * @private
	 * @param {OO.EventEmitter} item Items to add
	 * @param {number} newIndex Index to move the item to
	 * @return {number} The index the item was moved to
	 * @throws {Error} If item is not in the list
	 */
	oo.EmitterList.prototype.moveItem = function ( item, newIndex ) {
		var existingIndex = this.items.indexOf( item );

		if ( existingIndex === -1 ) {
			throw new Error( 'Item cannot be moved, because it is not in the list.' );
		}

		newIndex = normalizeArrayIndex( this.items, newIndex );

		// Remove the item from the current index
		this.items.splice( existingIndex, 1 );

		// If necessary, adjust new index after removal
		if ( existingIndex < newIndex ) {
			newIndex--;
		}

		// Move the item to the new index
		this.items.splice( newIndex, 0, item );

		return newIndex;
	};

	/**
	 * Utility method to insert an item into the list, and
	 * connect it to aggregate events.
	 *
	 * Don't call this directly unless you know what you're doing.
	 * Use #addItems instead.
	 *
	 * This method can be extended in child classes to produce
	 * different behavior when an item is inserted. For example,
	 * inserted items may also be attached to the DOM or may
	 * interact with some other nodes in certain ways. Extending
	 * this method is allowed, but if overriden, the aggregation
	 * of events must be preserved, or behavior of emitted events
	 * will be broken.
	 *
	 * If you are extending this method, please make sure the
	 * parent method is called.
	 *
	 * @protected
	 * @param {OO.EventEmitter} item Items to add
	 * @param {number} index Index to add items at
	 * @return {number} The index the item was added at
	 */
	oo.EmitterList.prototype.insertItem = function ( item, index ) {
		var events, event;

		// Add the item to event aggregation
		if ( item.connect && item.disconnect ) {
			events = {};
			for ( event in this.aggregateItemEvents ) {
				events[ event ] = [ 'emit', this.aggregateItemEvents[ event ], item ];
			}
			item.connect( this, events );
		}

		index = normalizeArrayIndex( this.items, index );

		// Insert into items array
		this.items.splice( index, 0, item );
		return index;
	};

	/**
	 * Remove items.
	 *
	 * @param {OO.EventEmitter[]} items Items to remove
	 * @chainable
	 * @fires remove
	 */
	oo.EmitterList.prototype.removeItems = function ( items ) {
		var i, item, index;

		if ( !Array.isArray( items ) ) {
			items = [ items ];
		}

		if ( items.length === 0 ) {
			return this;
		}

		// Remove specific items
		for ( i = 0; i < items.length; i++ ) {
			item = items[ i ];
			index = this.items.indexOf( item );
			if ( index !== -1 ) {
				if ( item.connect && item.disconnect ) {
					// Disconnect all listeners from the item
					item.disconnect( this );
				}
				this.items.splice( index, 1 );
				this.emit( 'remove', item, index );
			}
		}

		return this;
	};

	/**
	 * Clear all items
	 *
	 * @chainable
	 * @fires clear
	 */
	oo.EmitterList.prototype.clearItems = function () {
		var i, item,
			cleared = this.items.splice( 0, this.items.length );

		// Disconnect all items
		for ( i = 0; i < cleared.length; i++ ) {
			item = cleared[ i ];
			if ( item.connect && item.disconnect ) {
				item.disconnect( this );
			}
		}

		this.emit( 'clear' );

		return this;
	};

}() );

/**
 * Manage a sorted list of OO.EmitterList objects.
 *
 * The sort order is based on a callback that compares two items. The return value of
 * callback( a, b ) must be less than zero if a < b, greater than zero if a > b, and zero
 * if a is equal to b. The callback should only return zero if the two objects are
 * considered equal.
 *
 * When an item changes in a way that could affect their sorting behavior, it must
 * emit the itemSortChange event. This will cause it to be re-sorted automatically.
 *
 * This mixin must be used in a class that also mixes in OO.EventEmitter.
 *
 * @abstract
 * @class OO.SortedEmitterList
 * @mixins OO.EmitterList
 * @constructor
 * @param {Function} sortingCallback Callback that compares two items.
 */
oo.SortedEmitterList = function OoSortedEmitterList( sortingCallback ) {
	// Mixin constructors
	oo.EmitterList.call( this );

	this.sortingCallback = sortingCallback;

	// Listen to sortChange event and make sure
	// we re-sort the changed item when that happens
	this.aggregate( {
		sortChange: 'itemSortChange'
	} );

	this.connect( this, {
		itemSortChange: 'onItemSortChange'
	} );
};

oo.mixinClass( oo.SortedEmitterList, oo.EmitterList );

/* Events */

/**
 * An item has changed properties that affect its sort positioning
 * inside the list.
 *
 * @private
 * @event itemSortChange
 */

/* Methods */

/**
 * Handle a case where an item changed a property that relates
 * to its sorted order
 *
 * @param {OO.EventEmitter} item Item in the list
 */
oo.SortedEmitterList.prototype.onItemSortChange = function ( item ) {
	// Remove the item
	this.removeItems( item );
	// Re-add the item so it is in the correct place
	this.addItems( item );
};

/**
 * Change the sorting callback for this sorted list.
 *
 * The callback receives two items. The return value of callback(a, b) must be less than zero
 * if a < b, greater than zero if a > b, and zero if a is equal to b.
 *
 * @param {Function} sortingCallback Sorting callback
 */
oo.SortedEmitterList.prototype.setSortingCallback = function ( sortingCallback ) {
	var items = this.getItems();

	this.sortingCallback = sortingCallback;

	// Empty the list
	this.clearItems();
	// Re-add the items in the new order
	this.addItems( items );
};

/**
 * Add items to the sorted list.
 *
 * @param {OO.EventEmitter|OO.EventEmitter[]} items Item to add or
 *  an array of items to add
 * @chainable
 */
oo.SortedEmitterList.prototype.addItems = function ( items ) {
	var index, i, insertionIndex;

	if ( !Array.isArray( items ) ) {
		items = [ items ];
	}

	if ( items.length === 0 ) {
		return this;
	}

	for ( i = 0; i < items.length; i++ ) {
		// Find insertion index
		insertionIndex = this.findInsertionIndex( items[ i ] );

		// Check if the item exists using the sorting callback
		// and remove it first if it exists
		if (
			// First make sure the insertion index is not at the end
			// of the list (which means it does not point to any actual
			// items)
			insertionIndex <= this.items.length &&
			// Make sure there actually is an item in this index
			this.items[ insertionIndex ] &&
			// The callback returns 0 if the items are equal
			this.sortingCallback( this.items[ insertionIndex ], items[ i ] ) === 0
		) {
			// Remove the existing item
			this.removeItems( this.items[ insertionIndex ] );
		}

		// Insert item at the insertion index
		index = this.insertItem( items[ i ], insertionIndex );
		this.emit( 'add', items[ i ], index );
	}

	return this;
};

/**
 * Find the index a given item should be inserted at. If the item is already
 * in the list, this will return the index where the item currently is.
 *
 * @param {OO.EventEmitter} item Items to insert
 * @return {number} The index the item should be inserted at
 */
oo.SortedEmitterList.prototype.findInsertionIndex = function ( item ) {
	var list = this;

	return oo.binarySearch(
		this.items,
		// Fake a this.sortingCallback.bind( null, item ) call here
		// otherwise this doesn't pass tests in phantomJS
		function ( otherItem ) {
			return list.sortingCallback( item, otherItem );
		},
		true
	);

};

/* global hasOwn */

/**
 * A map interface for associating arbitrary data with a symbolic name. Used in
 * place of a plain object to provide additional {@link #method-register registration}
 * or {@link #method-lookup lookup} functionality.
 *
 * See <https://www.mediawiki.org/wiki/OOjs/Registries_and_factories>.
 *
 * @class OO.Registry
 * @mixins OO.EventEmitter
 *
 * @constructor
 */
oo.Registry = function OoRegistry() {
	// Mixin constructors
	oo.EventEmitter.call( this );

	// Properties
	this.registry = {};
};

/* Inheritance */

oo.mixinClass( oo.Registry, oo.EventEmitter );

/* Events */

/**
 * @event register
 * @param {string} name
 * @param {Mixed} data
 */

/**
 * @event unregister
 * @param {string} name
 * @param {Mixed} data Data removed from registry
 */

/* Methods */

/**
 * Associate one or more symbolic names with some data.
 *
 * Any existing entry with the same name will be overridden.
 *
 * @param {string|string[]} name Symbolic name or list of symbolic names
 * @param {Mixed} data Data to associate with symbolic name
 * @fires register
 * @throws {Error} Name argument must be a string or array
 */
oo.Registry.prototype.register = function ( name, data ) {
	var i, len;
	if ( typeof name === 'string' ) {
		this.registry[ name ] = data;
		this.emit( 'register', name, data );
	} else if ( Array.isArray( name ) ) {
		for ( i = 0, len = name.length; i < len; i++ ) {
			this.register( name[ i ], data );
		}
	} else {
		throw new Error( 'Name must be a string or array, cannot be a ' + typeof name );
	}
};

/**
 * Remove one or more symbolic names from the registry
 *
 * @param {string|string[]} name Symbolic name or list of symbolic names
 * @fires unregister
 * @throws {Error} Name argument must be a string or array
 */
oo.Registry.prototype.unregister = function ( name ) {
	var i, len, data;
	if ( typeof name === 'string' ) {
		data = this.lookup( name );
		if ( data !== undefined ) {
			delete this.registry[ name ];
			this.emit( 'unregister', name, data );
		}
	} else if ( Array.isArray( name ) ) {
		for ( i = 0, len = name.length; i < len; i++ ) {
			this.unregister( name[ i ] );
		}
	} else {
		throw new Error( 'Name must be a string or array, cannot be a ' + typeof name );
	}
};

/**
 * Get data for a given symbolic name.
 *
 * @param {string} name Symbolic name
 * @return {Mixed|undefined} Data associated with symbolic name
 */
oo.Registry.prototype.lookup = function ( name ) {
	if ( hasOwn.call( this.registry, name ) ) {
		return this.registry[ name ];
	}
};

/**
 * @class OO.Factory
 * @extends OO.Registry
 *
 * @constructor
 */
oo.Factory = function OoFactory() {
	// Parent constructor
	oo.Factory.super.call( this );
};

/* Inheritance */

oo.inheritClass( oo.Factory, oo.Registry );

/* Methods */

/**
 * Register a constructor with the factory.
 *
 * Classes must have a static `name` property to be registered.
 *
 *     function MyClass() {};
 *     OO.initClass( MyClass );
 *     // Adds a static property to the class defining a symbolic name
 *     MyClass.static.name = 'mine';
 *     // Registers class with factory, available via symbolic name 'mine'
 *     factory.register( MyClass );
 *
 * @param {Function} constructor Constructor to use when creating object
 * @throws {Error} Name must be a string and must not be empty
 * @throws {Error} Constructor must be a function
 */
oo.Factory.prototype.register = function ( constructor ) {
	var name;

	if ( typeof constructor !== 'function' ) {
		throw new Error( 'constructor must be a function, cannot be a ' + typeof constructor );
	}
	name = constructor.static && constructor.static.name;
	if ( typeof name !== 'string' || name === '' ) {
		throw new Error( 'Name must be a string and must not be empty' );
	}

	// Parent method
	oo.Factory.super.prototype.register.call( this, name, constructor );
};

/**
 * Unregister a constructor from the factory.
 *
 * @param {Function} constructor Constructor to unregister
 * @throws {Error} Name must be a string and must not be empty
 * @throws {Error} Constructor must be a function
 */
oo.Factory.prototype.unregister = function ( constructor ) {
	var name;

	if ( typeof constructor !== 'function' ) {
		throw new Error( 'constructor must be a function, cannot be a ' + typeof constructor );
	}
	name = constructor.static && constructor.static.name;
	if ( typeof name !== 'string' || name === '' ) {
		throw new Error( 'Name must be a string and must not be empty' );
	}

	// Parent method
	oo.Factory.super.prototype.unregister.call( this, name );
};

/**
 * Create an object based on a name.
 *
 * Name is used to look up the constructor to use, while all additional arguments are passed to the
 * constructor directly, so leaving one out will pass an undefined to the constructor.
 *
 * @param {string} name Object name
 * @param {...Mixed} [args] Arguments to pass to the constructor
 * @return {Object} The new object
 * @throws {Error} Unknown object name
 */
oo.Factory.prototype.create = function ( name ) {
	var obj, i,
		args = [],
		constructor = this.lookup( name );

	if ( !constructor ) {
		throw new Error( 'No class registered by that name: ' + name );
	}

	// Convert arguments to array and shift the first argument (name) off
	for ( i = 1; i < arguments.length; i++ ) {
		args.push( arguments[ i ] );
	}

	// We can't use the "new" operator with .apply directly because apply needs a
	// context. So instead just do what "new" does: create an object that inherits from
	// the constructor's prototype (which also makes it an "instanceof" the constructor),
	// then invoke the constructor with the object as context, and return it (ignoring
	// the constructor's return value).
	obj = Object.create( constructor.prototype );
	constructor.apply( obj, args );
	return obj;
};

/* eslint-env node */

/* istanbul ignore next */
if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = oo;
} else {
	global.OO = oo;
}

}( this ) );
