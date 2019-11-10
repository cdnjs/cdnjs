/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<9
	// For `typeof node.method` instead of `node.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.1",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support, all, a,
		input, select, fragment,
		opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var i, l, thisCache,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			for ( i = 0, l = name.length; i < l; i++ ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				// Try to fetch any internally stored data first
				return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
			}

			this.each(function() {
				jQuery.data( this, key, value );
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, notxml, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			// In IE9+, Flash objects don't have .getAttribute (#12945)
			// Support: IE9+
			if ( typeof elem.getAttribute !== core_strundefined ) {
				ret =  elem.getAttribute( name );
			}

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( rboolean.test( name ) ) {
					// Set corresponding property to false for boolean attributes
					// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
					if ( !getSetAttribute && ruseDefault.test( name ) ) {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					} else {
						elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		var
			// Use .prop to determine if this attribute is understood as boolean
			prop = jQuery.prop( elem, name ),

			// Fetch it accordingly
			attr = typeof prop === "boolean" && elem.getAttribute( name ),
			detail = typeof prop === "boolean" ?

				getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test( name ) ?
						elem[ jQuery.camelCase( "default-" + name ) ] :
						!!attr :

				// fetch an attribute node for properties not recognized as boolean
				elem.getAttributeNode( name );

		return detail && detail.value !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return jQuery.nodeName( elem, "input" ) ?

				// Ignore the value *property* by using defaultValue
				elem.defaultValue :

				ret && ret.specified ? ret.value : undefined;
		},
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret == null ? undefined : ret;
			}
		});
	});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur != this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== document.activeElement && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === document.activeElement && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /^[^{]+\{\s*\[native code/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( preferredDoc.documentElement.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		while ( (elem = this[i++]) ) {
			results.push( elem );
		}
		return results;
	};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !documentIsXML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results, slice.call( newContext.querySelectorAll(
						newSelector
					), 0 ) );
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );

				return m ?
					m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
						[m] :
						undefined :
					[];
			}
		};
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.tagNameNoComments ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Name
	Expr.find["NAME"] = support.getByName && function( tag, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};

	// Class
	Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
			return context.getElementsByClassName( className );
		}
	};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		var compare;

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
			if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
				if ( a === doc || contains( preferredDoc, a ) ) {
					return -1;
				}
				if ( b === doc || contains( preferredDoc, b ) ) {
					return 1;
				}
				return 0;
			}
			return compare & 4 ? -1 : 1;
		}

		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	hasDuplicate = false;
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// rbuggyQSA always contains :focus, so no need for an existence check
	if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	var val;

	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( !documentIsXML ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( documentIsXML || support.attributes ) {
		return elem.getAttribute( name );
	}
	return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
		name :
		val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && ( ~b.sourceIndex || MAX_NEGATIVE ) - ( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[4] ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}

			nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifider
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsXML ?
						elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
						elem.lang) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !documentIsXML &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		documentIsXML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, ret, self,
			len = this.length;

		if ( typeof selector !== "string" ) {
			self = this;
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		ret = [];
		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, this[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true) );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		var isFunc = jQuery.isFunction( value );

		// Make sure that the elements are removed from the DOM before they are inserted
		// this can help fix replacing a parent with child elements
		if ( !isFunc && typeof value !== "string" ) {
			value = jQuery( value ).not( this ).detach();
		}

		return this.domManip( [ value ], true, function( elem ) {
			var next = this.nextSibling,
				parent = this.parentNode;

			if ( parent ) {
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		});
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, table ? self.html() : undefined );
				}
				self.domManip( args, table, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						node,
						i
					);
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery.ajax({
									url: node.src,
									type: "GET",
									dataType: "script",
									async: false,
									global: false,
									"throws": true
								});
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	var attr = elem.getAttributeNode("type");
	elem.type = ( attr && attr.specified ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		var bool = typeof state === "boolean";

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.hover = function( fnOver, fnOut ) {
	return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
};
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 ) {
					isSuccess = true;
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					isSuccess = true;
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {
	var conv2, current, conv, tmp,
		converters = {},
		i = 0,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ];

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var value, name, index, easing, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/*jshint validthis:true */
	var prop, index, length,
		value, dataShow, toggle,
		tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.cur && hooks.cur.finish ) {
				hooks.cur.finish.call( this );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.documentElement;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.documentElement;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
/*
* math-like functionality
* quaternion, vector, matrix
*/

var $3Dmol = $3Dmol || {};
$3Dmol.Math = {

    clamp : function(x, min, max) {
        return Math.min( Math.max( x, min ), max );
    },

    degToRad : function() {
       var degreeToRadiansFactor = Math.PI / 180;
       
       return function(deg) {
           return deg * degreeToRadiansFactor;
       };
    
    }()
    
};


// Quaternion
/** @constructor */
$3Dmol.Quaternion = function(x, y, z, w) {

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = (w !== undefined) ? w : 1;

};

$3Dmol.Quaternion.prototype = {

    constructor : $3Dmol.Quaternion,

    set : function(x, y, z, w) {
        
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    },

    copy : function(q) {
        
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        this.w = q.w;

        return this;
    },

    conjugate : function() {
        
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;

        return this;
    },

    inverse : function() {
        
        return this.conjugate().normalize();
    },

    length : function() {
        
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    },

    normalize : function() {
        
        var l = this.length();

        if (l === 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
        } else {
            l = 1 / l;

            this.x *= l;
            this.y *= l;
            this.z *= l;
            this.w *= l;
        }

        return this;

    },

    multiply : function(q) {
        
        return this.multiplyQuaternions(this, q);
    },

    multiplyQuaternions : function(a, b) {

        var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
        var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

        this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

    }
};

//A 2 Vector
/** @constructor */
$3Dmol.Vector2 = function(x, y) {
    
    this.x = x || 0.0;
    this.y = y || 0.0;
};

$3Dmol.Vector2.prototype = {
    
    constructor : $3Dmol.Vector2,
   
    set : function(x, y) {
       
        this.x = x;
        this.y = y;
       
        return this;
    },
    
    subVectors : function(a, b) {
        
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      
      return this;
    },
   
    copy : function(v) {
       
        this.x = v.x;
        this.y = v.y;
       
        return this;
    },
   
    clone : function() {
        
        return new $3Dmol.Vector2(this.x, this.y);
    }    
   
};

//A 3 Vector

$3Dmol.Vector3 = function(x, y, z) {
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;
};
/** @this {$3Dmol.Vector3} */
$3Dmol.Vector3.prototype =  {
    
    constructor : $3Dmol.Vector3,
    
    set : function(x, y, z) {
        
        this.x = x;
        this.y = y;
        this.z = z;
        
        return this;
    },
    
    copy : function(v) {
        
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        
        return this;  
    },
    
    add : function(v) {
        
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;  
        
        return this;
    },
    
    addVectors : function(a, b) {
        
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        
        return this;
    },
    
    sub : function(v) {
        
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        
        return this;
    },
    
    subVectors : function(a, b) {
        
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        
        return this;
    },
    
    multiplyScalar : function(s) {
        
        this.x *= s;
        this.y *= s;
        this.z *= s;
        
        return this;
    },
    
    divideScalar : function(s) {
        
        if (s !== 0) {
            this.x /= s;
            this.y /= s;
            this.z /= s;
        }
        
        else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        
        return this;
    },
    

    distanceTo: function(v) {
        return Math.sqrt(this.distanceToSquared(v));
    },

    distanceToSquared: function(v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        var dz = this.z - v.z;

        return dx * dx + dy * dy + dz * dz;
    },
    
    applyMatrix4 : function(m) {
    
        var x = this.x, y = this.y, z = this.z;
        
        var e = m.elements;
        
        this.x = e[0]*x + e[4]*y + e[8]*z + e[12];
        this.y = e[1]*x + e[5]*y + e[9]*z + e[13];
        this.z = e[2]*x + e[6]*y + e[10]*z + e[14];
        
        return this;
    },
    
    applyProjection : function(m) {
        
        //input: $3Dmol.Matrix4 projection matrix
        
        var x = this.x, y = this.y, z = this.z;
        
        var e = m.elements;
        var d = ( e[3]*x + e[7]*y + e[11]*z + e[15]);
        
        this.x = (e[0]*x + e[4]*y + e[8]*z + e[12]) / d;
        this.y = (e[1]*x + e[5]*y + e[9]*z + e[13]) / d;
        this.z = (e[2]*x + e[6]*y + e[10]*z + e[14]) / d;
        
        return this;
    },
    
    applyQuaternion : function(q) { 
        
    	//save values
        var x = this.x;
        var y = this.y;
        var z = this.z;
        
        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;
        
        //compute this as
        //t = 2 * cross(q.xyz, v)
        //newv = v + q.w * t + cross(q.xyz, t)
        //this from molecularmusings
        //http://molecularmusings.wordpress.com/2013/05/24/a-faster-quaternion-vector-multiplication/
        var t = {};
        t.x = 2*(y * qz - z * qy);
        t.y = 2*(z * qx - x * qz);
        t.z = 2*(x * qy - y * qx);
        
        //cross t with q
        var t2 = {};
        t2.x = t.y * qz - t.z * qy;
        t2.y = t.z * qx - t.x * qz;
        t2.z = t.x * qy - t.y * qx;
        
        this.x = x + q.w*t.x + t2.x;
        this.y = y + q.w*t.y + t2.y;
        this.z = z + q.w*t.z + t2.z;
        
        return this;
    },
    
    negate : function() {
        
        return this.multiplyScalar(-1);
    },
    
    dot : function(v) {
        
        return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    
    length : function() {
        
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    },
    
    lengthSq : function() {
    
        return (this.x*this.x + this.y*this.y + this.z*this.z);
    },
    
    normalize : function() {
        
        return this.divideScalar( this.length() );
    },
    
    cross : function (v) {
        
        var x = this.x, y = this.y, z = this.z;
        
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        
        return this;
    },
    
    crossVectors : function(a, b) {
        
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        
        return this;
    },
    
    getPositionFromMatrix : function(m) {
        
        this.x = m.elements[12];
        this.y = m.elements[13];
        this.z = m.elements[14];
        
        return this;
    },

    setEulerFromRotationMatrix : function (m, order) {

        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

        var te = m.elements;
        var m11 = te[0], m12 = te[4], m13 = te[8];
        var m21 = te[1], m22 = te[5], m23 = te[9];
        var m31 = te[2], m32 = te[6], m33 = te[10];

        if ( order === undefined || order === 'XYZ' ) {

            this.y = Math.asin( $3Dmol.Math.clamp( m13, -1, 1 ) );

            if ( Math.abs( m13 ) < 0.99999 ) {

                this.x = Math.atan2( - m23, m33 );
                this.z = Math.atan2( - m12, m11 );

            } else {

                this.x = Math.atan2( m32, m22 );
                this.z = 0;

            }
        }
        
        else {
            console.error("Error with vector's setEulerFromRotationMatrix: Unknown order: " + order);
        }
        
        return this;

    },
    
    clone : function() {
        return new $3Dmol.Vector3(this.x, this.y, this.z);
    }
    
};

//Matrices

//Matrix3
/** @constructor */
$3Dmol.Matrix3 = function(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    
    this.elements = new Float32Array(9);
    
    this.set(
        (n11 !== undefined) ? n11 : 1, n12 || 0, n13 || 0,
        n21 || 0, (n22 !== undefined) ? n22 : 1, n23 || 0,
        n31 || 0, n32 || 0, (n33 !== undefined) ? n33 : 1
    );
    
};

$3Dmol.Matrix3.prototype = {
    
    constructor : $3Dmol.Matrix3,    
   
    set : function(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        var te = this.elements;
        
        te[0] = n11; te[3] = n12; te[6] = n13;
        te[1] = n21; te[4] = n22; te[7] = n23;
        te[2] = n31; te[5] = n32; te[8] = n33;
        
        return this;
    },
    
    identity : function() {   
        this.set(
            1,0,0,
            0,1,0,
            0,0,1
        );
        
        return this;
    },
   
    copy : function(m) {
        var me = m.elements;
       
        this.set(
            me[0], me[3], me[6],
            me[1], me[4], me[7],
            me[2], me[5], me[8]
        );
    },
    
    multiplyScalar: function ( s ) {
        var te = this.elements;

        te[0] *= s; te[3] *= s; te[6] *= s;
        te[1] *= s; te[4] *= s; te[7] *= s;
        te[2] *= s; te[5] *= s; te[8] *= s;

        return this;
    },

    getInverse: function ( matrix, throwOnInvertible ) {
        // input: Matrix4

        var me = matrix.elements;
        var te = this.elements;

        te[ 0 ] =   me[10] * me[5] - me[6] * me[9];
        te[ 1 ] = - me[10] * me[1] + me[2] * me[9];
        te[ 2 ] =   me[6] * me[1] - me[2] * me[5];
        te[ 3 ] = - me[10] * me[4] + me[6] * me[8];
        te[ 4 ] =   me[10] * me[0] - me[2] * me[8];
        te[ 5 ] = - me[6] * me[0] + me[2] * me[4];
        te[ 6 ] =   me[9] * me[4] - me[5] * me[8];
        te[ 7 ] = - me[9] * me[0] + me[1] * me[8];
        te[ 8 ] =   me[5] * me[0] - me[1] * me[4];

        var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 3 ] + me[ 2 ] * te[ 6 ];

        // no inverse

        if ( det === 0 ) {

            var msg = "Matrix3.getInverse(): can't invert matrix, determinant is 0";

            if ( throwOnInvertible || false ) {

                throw new Error( msg ); 

            } else {

                console.warn( msg );

            }

            this.identity();

            return this;

        }

        this.multiplyScalar( 1.0 / det );

        return this;
    },
    
    transpose: function () {
        var tmp, m = this.elements;

        tmp = m[1]; m[1] = m[3]; m[3] = tmp;
        tmp = m[2]; m[2] = m[6]; m[6] = tmp;
        tmp = m[5]; m[5] = m[7]; m[7] = tmp;

        return this;
    },
    
    clone: function () {
        var te = this.elements;

        return new $3Dmol.Matrix3(

            te[0], te[3], te[6],
            te[1], te[4], te[7],
            te[2], te[5], te[8]

        );
    }
   
};

//Matrix 4
/** @constructor */
$3Dmol.Matrix4 = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {

    var te = this.elements = new Float32Array( 16 );
    
    te[0] = ( n11 !== undefined ) ? n11 : 1; te[4] = n12 || 0; te[8] = n13 || 0; te[12] = n14 || 0;
    te[1] = n21 || 0; te[5] = ( n22 !== undefined ) ? n22 : 1; te[9] = n23 || 0; te[13] = n24 || 0;
    te[2] = n31 || 0; te[6] = n32 || 0; te[10] = ( n33 !== undefined ) ? n33 : 1; te[14] = n34 || 0;
    te[3] = n41 || 0; te[7] = n42 || 0; te[11] = n43 || 0; te[15] = ( n44 !== undefined ) ? n44 : 1;

};

$3Dmol.Matrix4.prototype = {

    constructor : $3Dmol.Matrix4,

    set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {
        var te = this.elements;

        te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
        te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
        te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
        te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;

        return this;
    },

    identity: function () {
        this.set(

            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1

        );

        return this;
    },

    copy: function ( m ) {
        var me = m.elements;

        this.set(

            me[0], me[4], me[8], me[12],
            me[1], me[5], me[9], me[13],
            me[2], me[6], me[10], me[14],
            me[3], me[7], me[11], me[15]

        );

        return this;
    },

    setRotationFromEuler: function ( v, order ) {

        var te = this.elements;

        var x = v.x, y = v.y, z = v.z;
        var a = Math.cos( x ), b = Math.sin( x );
        var c = Math.cos( y ), d = Math.sin( y );
        var e = Math.cos( z ), f = Math.sin( z );

        if ( order === undefined || order === 'XYZ' ) {

            var ae = a * e, af = a * f, be = b * e, bf = b * f;

            te[0] = c * e;
            te[4] = - c * f;
            te[8] = d;

            te[1] = af + be * d;
            te[5] = ae - bf * d;
            te[9] = - b * c;

            te[2] = bf - ae * d;
            te[6] = be + af * d;
            te[10] = a * c;

        } 
        
        else
            console.error("Error with matrix4 setRotationFromEuler. Order: " + order);

        return this;

    },

    setRotationFromQuaternion: function ( q ) {
        var te = this.elements;

        var x = q.x, y = q.y, z = q.z, w = q.w;
        var x2 = x + x, y2 = y + y, z2 = z + z;
        var xx = x * x2, xy = x * y2, xz = x * z2;
        var yy = y * y2, yz = y * z2, zz = z * z2;
        var wx = w * x2, wy = w * y2, wz = w * z2;

        te[0] = 1 - ( yy + zz );
        te[4] = xy - wz;
        te[8] = xz + wy;

        te[1] = xy + wz;
        te[5] = 1 - ( xx + zz );
        te[9] = yz - wx;

        te[2] = xz - wy;
        te[6] = yz + wx;
        te[10] = 1 - ( xx + yy );

        return this;
    },

    lookAt: function() {
        var x = new $3Dmol.Vector3();
        var y = new $3Dmol.Vector3();
        var z = new $3Dmol.Vector3();

        return function ( eye, target, up ) {

            var te = this.elements;

            z.subVectors( eye, target ).normalize();

            if ( z.length() === 0 ) {

                z.z = 1;

            }

            x.crossVectors( up, z ).normalize();

            if ( x.length() === 0 ) {

                z.x += 0.0001;
                x.crossVectors( up, z ).normalize();

            }

            y.crossVectors( z, x );


            te[0] = x.x; te[4] = y.x; te[8] = z.x;
            te[1] = x.y; te[5] = y.y; te[9] = z.y;
            te[2] = x.z; te[6] = y.z; te[10] = z.z;

            return this;
        };

    }(),

    multiplyMatrices: function ( a, b ) {
        var ae = a.elements;
        var be = b.elements;
        var te = this.elements;

        var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

        var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
        var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
        var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
        var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return this;
    },
    
    multiplyScalar: function ( s ) {
        var te = this.elements;
    
        te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
        te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
        te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
        te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;
    
        return this;
    },
    
    transpose: function () {
        var te = this.elements;
        var tmp;

        tmp = te[1]; te[1] = te[4]; te[4] = tmp;
        tmp = te[2]; te[2] = te[8]; te[8] = tmp;
        tmp = te[6]; te[6] = te[9]; te[9] = tmp;

        tmp = te[3]; te[3] = te[12]; te[12] = tmp;
        tmp = te[7]; te[7] = te[13]; te[13] = tmp;
        tmp = te[11]; te[11] = te[14]; te[14] = tmp;

        return this;
    },

    getPosition: function() {
        var v1 = new $3Dmol.Vector3();

        return function () {

            console.warn( 'DEPRECATED: Matrix4\'s .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.' );

            var te = this.elements;
            return v1.set( te[12], te[13], te[14] );
        };

    }(),

    setPosition: function ( v ) {
        var te = this.elements;

        te[12] = v.x;
        te[13] = v.y;
        te[14] = v.z;

        return this;
    },

    getInverse: function ( m, throwOnInvertible ) {
        // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        var te = this.elements;
        var me = m.elements;

        var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
        var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
        var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
        var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

        te[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
        te[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
        te[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
        te[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
        te[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
        te[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
        te[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
        te[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
        te[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
        te[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
        te[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
        te[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
        te[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
        te[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
        te[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
        te[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;

        var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 4 ] + me[ 2 ] * te[ 8 ] + me[ 3 ] * te[ 12 ];

        if ( det === 0 ) {

            var msg = "Matrix4.getInverse(): can't invert matrix, determinant is 0";

            if ( throwOnInvertible || false ) {

                throw new Error( msg ); 

            } else {

                console.warn( msg );

            }

            this.identity();

            return this;
        }

        this.multiplyScalar( 1 / det );

        return this;
    },

    compose: function() {
        var mRotation = new $3Dmol.Matrix4(),
            mScale = new $3Dmol.Matrix4();
        
        return function ( translation, rotation, scale ) {

            var te = this.elements;

            mRotation.identity();
            mRotation.setRotationFromQuaternion( rotation );

            mScale.makeScale( scale.x, scale.y, scale.z );

            this.multiplyMatrices( mRotation, mScale );

            te[12] = translation.x;
            te[13] = translation.y;
            te[14] = translation.z;

            return this;

        };
    }(),

    decompose: function() {
        var x = new $3Dmol.Vector3(),
            y = new $3Dmol.Vector3(),
            z = new $3Dmol.Vector3(),
            matrix = new $3Dmol.Matrix4();

        return function ( translation, rotation, scale ) {

            var te = this.elements;

            // grab the axis vectors
            x.set( te[0], te[1], te[2] );
            y.set( te[4], te[5], te[6] );
            z.set( te[8], te[9], te[10] );

            translation = ( translation instanceof $3Dmol.Vector3 ) ? translation : new $3Dmol.Vector3();
            rotation = ( rotation instanceof $3Dmol.Quaternion ) ? rotation : new $3Dmol.Quaternion();
            scale = ( scale instanceof $3Dmol.Vector3 ) ? scale : new $3Dmol.Vector3();

            scale.x = x.length();
            scale.y = y.length();
            scale.z = z.length();

            translation.x = te[12];
            translation.y = te[13];
            translation.z = te[14];

            // scale the rotation part

            matrix.copy( this );

            matrix.elements[0] /= scale.x;
            matrix.elements[1] /= scale.x;
            matrix.elements[2] /= scale.x;

            matrix.elements[4] /= scale.y;
            matrix.elements[5] /= scale.y;
            matrix.elements[6] /= scale.y;

            matrix.elements[8] /= scale.z;
            matrix.elements[9] /= scale.z;
            matrix.elements[10] /= scale.z;

            rotation.setFromRotationMatrix( matrix );

            return [ translation, rotation, scale ];

        };
    }(),

    scale: function ( v ) {
        var te = this.elements;
        var x = v.x, y = v.y, z = v.z;

        te[0] *= x; te[4] *= y; te[8] *= z;
        te[1] *= x; te[5] *= y; te[9] *= z;
        te[2] *= x; te[6] *= y; te[10] *= z;
        te[3] *= x; te[7] *= y; te[11] *= z;

        return this;
    },
    
    getMaxScaleOnAxis : function() {
        
        var te = this.elements;
        
        var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
        
        return Math.sqrt(Math.max(scaleXSq, Math.max(scaleYSq, scaleZSq)));
        
    },

    makeFrustum: function ( left, right, bottom, top, near, far ) {
        var te = this.elements;
        var x = 2 * near / ( right - left );
        var y = 2 * near / ( top - bottom );

        var a = ( right + left ) / ( right - left );
        var b = ( top + bottom ) / ( top - bottom );
        var c = - ( far + near ) / ( far - near );
        var d = - 2 * far * near / ( far - near );

        te[0] = x;  te[4] = 0;  te[8] = a;  te[12] = 0;
        te[1] = 0;  te[5] = y;  te[9] = b;  te[13] = 0;
        te[2] = 0;  te[6] = 0;  te[10] = c; te[14] = d;
        te[3] = 0;  te[7] = 0;  te[11] = - 1;   te[15] = 0;

        return this;
    },

    makePerspective: function ( fov, aspect, near, far ) {
        var ymax = near * Math.tan( $3Dmol.Math.degToRad( fov * 0.5 ) );
        var ymin = - ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );
    },
    

    clone: function () {
        var te = this.elements;

        return new $3Dmol.Matrix4(

            te[0], te[4], te[8], te[12],
            te[1], te[5], te[9], te[13],
            te[2], te[6], te[10], te[14],
            te[3], te[7], te[11], te[15]

        );
    }
    
};
/** @constructor */
$3Dmol.Ray = function(origin, direction) {
    
    this.origin = (origin !== undefined) ? 
        origin : new $3Dmol.Vector3();
        
    this.direction = (direction !== undefined) ?
        direction : new $3Dmol.Vector3();
      
};

//TODO: Remove methods we don't need (intersectPlane ??)
$3Dmol.Ray.prototype = {
    
    constructor : $3Dmol.Ray,
     
    set : function(origin, direction){
        
        this.origin.copy(origin);
        this.direction.copy(direction);
        
        return this;
    
    },
    
    copy : function(ray) {
        
        this.origin.copy(ray.origin);
        this.direction.copy(ray.direction);
        
        return this;
        
    },
    
    at : function(t, optionalTarget) {
        
        var result = optionalTarget || new $3Dmol.Vector3();
        
        return result.copy(this.direction).multiplyScalar(t).add(this.origin);
        
    },
    
    recast : function() {
        
        var v1 = new $3Dmol.Vector3();
        
        return function(t) {
            this.origin.copy(this.at(t, v1));
            
            return this;
        };
        
    }(),
    
    closestPointToPoint : function(point, optionalTarget) {
        
        var result = optionalTarget || new $3Dmol.Vector3();
        result.subVectors(point, this.origin);
        var directionDistance = result.dot(this.direction);
        
        //returns a point on this ray
        return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
        
    },
    
    distanceToPoint : function() {
        
        var v1 = new $3Dmol.Vector3();
        
        return function(point) {
            var directionDistance = v1.subVectors(point, this.origin).dot(this.direction);
            v1.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
            
            return v1.distanceTo(point);
        };
        
    }(),
    
    isIntersectionCylinder : function() {
        
    },
    
    isIntersectionSphere : function(sphere) {
       
       return (this.distanceToPoint(sphere.center) <= sphere.radius);
          
    },
    
    isIntersectionPlane : function(plane) {
        
        var denominator = plane.normal.dot(this.direction);
        
        //plane and ray are not perpendicular
        if (denominator !== 0) 
            return true;
        
        if (plane.distanceToPoint(this.origin) === 0) 
            return true;
        
        return false;
        
    },
    
    distanceToPlane : function(plane) {
       
       var denominator = plane.normal.dot(this.direction);
       if (denominator === 0) {
           
           //line is coplanar
       if (plane.distanceToPoint(this.origin) === 0)
           return 0;
       
       //ray is parallel
           return undefined;
       }
       
       var t = - (this.origin.dot(plane.normal) + plane.constant) / denominator;
       
       return t;
       
    },
    
    intersectPlane : function(plane, optionalTarget) {
       
       var t = this.distanceToPlane(plane);
       
       if (t === undefined)
           return undefined;
       
       return this.at(t, optionalTarget);
       
    },
    
    applyMatrix4 : function(matrix4) {
       
       this.direction.add(this.origin).applyMatrix4(matrix4);
       this.origin.applyMatrix4(matrix4);
       this.direction.sub(this.origin);
       
       return this;
       
    },
    
    equals : function(ray) {
       
       return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
       
    },
    
    clone : function() {
    
       return new $3Dmol.Ray().copy(this);
    
    }
 
     
};

//Intersection sphere and box shapes.  


//Intersection sphere for sphere, stick render
/** @constructor */
$3Dmol.Sphere = function(center, radius) {

    this.center = (center !== undefined) ? 
        center : new $3Dmol.Vector3();
        
    this.radius = (radius !== undefined) ?
        radius : 0;
        
};

$3Dmol.Sphere.prototype = {
    
    constructor : $3Dmol.Sphere,
    
    set : function(center, radius) {
        
        this.center.copy(center);
        this.radius = radius;
        
        return this;
        
    },
    
    copy : function(sphere) {
        
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        
        return this;
        
    },
    
    applyMatrix4 : function(matrix) {
        
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        
        return this;
        
    },
    
    translate : function(offset) {
        
        this.center.add(offset);
        
        return this;
        
    },
    
    equals : function(sphere) {
        
        return sphere.center.equals(this.center) && (sphere.radius === this.radius);
        
    },
       
    clone : function() {
        
        return new $3Dmol.Sphere().copy(this);
        
    }

};


//Bounding cylinder for stick render  
/** @constructor */
$3Dmol.Cylinder = function(c1, c2, radius) {

    this.c1 = (c1 !== undefined) ?
        c1 : new $3Dmol.Vector3();

    this.c2 = (c2 !== undefined) ?
        c2 : new $3Dmol.Vector3();
        
    this.direction = new $3Dmol.Vector3().subVectors(this.c2, this.c1).normalize();

    this.radius = (radius !== undefined) ?
        radius : 0;
    
};

$3Dmol.Cylinder.prototype = {

    constructor : $3Dmol.Cylinder,

    copy : function(cylinder) {

        this.c1.copy(cylinder.c1);
        this.c2.copy(cylinder.c2);
        this.direction.copy(cylinder.direction);
        this.radius = cylinder.radius;

        return this;

    },
    
    lengthSq : function() {
    
        var vector = new $3Dmol.Vector3();
        
        return function(){
            return vector.subVectors(this.c2, this.c1).lengthSq();
        };
        
    }(),

    applyMatrix4 : function(matrix) {
        
        this.direction.add(this.c1).applyMatrix4(matrix);
        this.c1.applyMatrix4(matrix);
        this.c2.applyMatrix4(matrix);
        this.direction.sub(this.c1).normalize();
        this.radius = this.radius * matrix.getMaxScaleOnAxis();

        return this;

    }

};


//plane specified by three points
/** @constructor */
$3Dmol.Triangle = function(a, b, c){
   
    this.a = (a !== undefined) ?
        a : new $3Dmol.Vector3();

    this.b = (b !== undefined) ?
        b : new $3Dmol.Vector3();
    
    this.c = (c !== undefined) ?
        c : new $3Dmol.Vector3();   
  
};

$3Dmol.Triangle.prototype = {

    constructor : $3Dmol.Triangle,
    
    copy : function(triangle) {
        
        this.a.copy(triangle.a);
        this.b.copy(triangle.b);
        this.c.copy(triangle.c);
        
        return this;
        
    },
    
    applyMatrix4 : function(matrix) {
        
        this.a.applyMatrix4(matrix);
        this.b.applyMatrix4(matrix);
        this.c.applyMatrix4(matrix);
        
        return this;
        
    },
    
    getNormal : function() {
        
        var v1 = new $3Dmol.Vector3();
        
        return function() {
            
            var norm = this.a.clone();
            norm.sub(this.b);
            v1.subVectors(this.c, this.b);
            
            norm.cross(v1);
            norm.normalize();
            
            return norm;
            
        };
        
    }()

};


/* core Object3D
 * Base class for Scene, Camera, Geometry
 * Geometry class
 */

//Event Handling
/** @this {$3Dmol.EventDispatcher} */
$3Dmol.EventDispatcher = function() {
  
    var listeners = {};
    
    this.addEventListener = function(type, listener) {
        if (listeners[type] === undefined)
            listeners[type] = [];
        
        if (listeners[type].indexOf(listener) === -1)
            listeners[type].push(listener);
    };  
    
    this.removeEventListener = function(type, listener) {
        
        var index = listeners[type].indexOf(listener);
        
        if (index !== -1)
            listeners[type].splice(index, 1);
              
    };
    
    this.dispatchEvent = function(event) {
        
        var listenerArray = listeners[event.type];
        
        if (listenerArray !== undefined) {
            event.target = this;
            
            for (var i = 0, l = listenerArray.length; i < l; i++)
                listenerArray[i].call(this, event);
                
        }
            
    };
    
};

$3Dmol.Color = function( color ){
    
    if ( arguments.length > 1) {
            this.r = arguments[0] || 0.0;
            this.g = arguments[1] || 0.0;
            this.b = arguments[2] || 0.0;

            return this;
    }
    
    return this.set(color);
                
};

$3Dmol.Color.prototype = {
    
    constructor: $3Dmol.Color,
    
    r: 0.0, g: 0.0, b: 0.0,
    
    set : function(val) {
        
            if (val instanceof $3Dmol.Color) 
                return val.clone();

            else if (typeof val === 'number')
                this.setHex(val);
    },
    
    setHex: function(hex) {
        
            hex = Math.floor(hex);

            this.r = (hex >> 16 & 255) / 255;
            this.g = (hex >> 8 & 255) / 255;
            this.b = (hex & 255) / 255;                                                                                     
        
            return this;
    },
    
    getHex: function() {
    	var R = Math.round(this.r*255);
    	var G = Math.round(this.g*255);
    	var B = Math.round(this.b*255);
    	return R<<16 | G << 8 | B;
    },
    
    clone : function() {
            return new $3Dmol.Color(this.r, this.g, this.b);
    },
        
    copy : function(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        
        return this;
    },
    
    //return object that represents color components from 0 to 255
    scaled : function() {
    	var ret = {};
    	ret.r = Math.round(this.r*255);
    	ret.g = Math.round(this.g*255);
    	ret.b = Math.round(this.b*255);
    	ret.a = 1.0;
    	return ret;
    }
    
};

//Object3D base constructor function
/** @this {$3Dmol.Object3D} */
$3Dmol.Object3D = function() {
    
    this.id = $3Dmol.Object3DIDCount++;
    
    this.name = "";
    
    this.parent = undefined;
    this.children = [];
    
    this.position = new $3Dmol.Vector3();
    this.rotation = new $3Dmol.Vector3();
    this.matrix = new $3Dmol.Matrix4();
    this.matrixWorld = new $3Dmol.Matrix4();
    this.quaternion = new $3Dmol.Quaternion();
    this.eulerOrder = 'XYZ';
    
    this.up = new $3Dmol.Vector3(0, 1, 0);
    this.scale = new $3Dmol.Vector3(1, 1, 1);
    
    this.matrixAutoUpdate = true;
    this.matrixWorldNeedsUpdate = true;
    this.rotationAutoUpdate = true;
    this.useQuaternion = false;
    
    this.visible = true;
    
};

$3Dmol.Object3D.prototype = {
    
    constructor : $3Dmol.Object3D,
    
    lookAt : function(vector) {
        
        this.matrix.lookAt(vector, this.position, this.up);
        
        if (this.rotationAutoUpdate) {
            
            if (this.useQuaternion === true) 
                this.quaternion.copy(this.matrix.decompose()[1]);
            else
                this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder);
        }
    },
    
    //add child object
    add : function(object) {
        if (object === this){
            console.error("Can't add $3Dmol.Object3D to itself");
            return;
        }
        
        object.parent = this;
        this.children.push(object);
        
        //add to the scene (i.e. follow up this instance's parents until reach the top)
        
        var scene = this;
        
        while (scene.parent !== undefined)
            scene = scene.parent;
            
        if (scene !== undefined && scene instanceof $3Dmol.Scene) 
            scene.__addObject(object);
        
    },
    
    remove : function(object) {
        
        var index = this.children.indexOf(object);
        
        if (index !== -1) {
            
            object.parent = undefined;
            this.children.splice(index, 1);
            
            //Remove from scene
            
            var scene = this;
            
            while (scene.parent !== undefined)
                scene = scene.parent;
                
            if (scene !== undefined && scene instanceof $3Dmol.Scene)
                scene.__removeObject(object);
                
        }
    },
    
    updateMatrix : function() {
        
        this.matrix.setPosition(this.position);
        
        if (this.useQuaternion === false) 
            this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder);
        else
            this.matrix.setRotationFromQuaternion(this.quaternion);
        
        //TODO: Do I need this??
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1)
            this.matrix.scale(this.scale);
            
        this.matrixWorldNeedsUpdate = true;
        
    },
    
    updateMatrixWorld : function(force) {
        
        if (this.matrixAutoUpdate === true) 
            this.updateMatrix();
        
        if (this.matrixWorldNeedsUpdate === true || force === true) {
            
            if (this.parent === undefined)
                this.matrixWorld.copy(this.matrix);
            else
                this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
                
        }
        
        this.matrixWorldNeedsUpdate = false;
        
        //Update matrices of all children
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].updateMatrixWorld(true);
        }
    },
    
    clone : function(object) {
        
        if (object === undefined)
            object = new $3Dmol.Object3D();
            
        object.name = this.name;
        
        object.up.copy(this.up);
        object.position.copy(this.position);
        object.rotation.copy(this.rotation);
        object.eulerOrder = this.eulerOrder;
        object.scale.copy(this.scale);
        
        object.rotationAutoUpdate = this.rotationAutoUpdate;
        object.matrix.copy(this.matrix);
        object.matrixWorld.copy(this.matrixWorld);
        object.quaternion.copy(this.quaternion);
        
        object.useQuaternion = this.useQuaternion;
        
        object.visible = this.visible;
        
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            object.add(child.clone());
        }
        
        return object;
        
    }
    
};

$3Dmol.Object3DIDCount = 0;

//Geometry class
//TODO: What can I remove - how can I optimize ?
$3Dmol.Geometry = (function() {
   
    var BUFFERSIZE = 65535; //limited to 16bit indices
    
    
    /** @constructor */
    var geometryGroup = function(id) {
        this.id = id || 0;
        //for performance reasons, callers must directly modify these
        this.vertexArray = null;
        this.colorArray = null;
        this.normalArray = null;
        this.faceArray = null;
        this.lineArray = null;
        this.vertices = 0;
        this.faceidx = 0;
        this.lineidx = 0;
        
    };
    
    geometryGroup.prototype.getNumVertices = function() {
    	return this.vertices;
    };
    
    geometryGroup.prototype.getVertices = function() {
    	return this.vertexArray;
    };
    
    
    geometryGroup.prototype.getCentroid = function() {
        
        var centroid = new $3Dmol.Vector3();
        var offset, x, y, z;
        
        for (var i = 0; i < this.vertices; ++i) {
            offset = i*3;
            
            x = this.vertexArray[offset]; y = this.vertexArray[offset+1]; z = this.vertexArray[offset+2];
            
            centroid.x += x; centroid.y += y; centroid.z += z;
        }
        
        //divideScalar checks for 0 denom
        centroid.divideScalar(this.vertices);
        
        return centroid;
    };
    
    //setup normals - vertex and face array must exist
    geometryGroup.prototype.setNormals = function() {        
        
        var faces = this.faceArray;
        var verts = this.vertexArray;
        var norms = this.normalArray;
        
        if (! this.vertices || ! this.faceidx) 
            return;
        
        //vertex indices
        var a, b, c, d,
        //and actual vertices
        vA, vB, vC, norm;
            
        for (var i = 0; i < faces.length / 3; ++i) {
            
            a = faces[i * 3] * 3;
            b = faces[i * 3 + 1] * 3;
            c = faces[i * 3 + 2] * 3;
            
            vA = new $3Dmol.Vector3(verts[a], verts[a+1], verts[a+2]);
            vB = new $3Dmol.Vector3(verts[b], verts[b+1], verts[b+2]);
            vC = new $3Dmol.Vector3(verts[c], verts[c+1], verts[c+2]);
            
            vA.subVectors(vA, vB);
            vC.subVectors(vC, vB);
            vC.cross(vA);
            
            //face normal
            norm = vC;
            norm.normalize();
            
            norms[a] += norm.x; norms[b] += norm.x; norms[c] += norm.x;
            norms[a + 1] += norm.y; norms[b + 1] += norm.y; norms[c + 1] += norm.y;
            norms[a + 2] += norm.z; norms[b + 2] += norm.z; norms[c + 2] += norm.z;
            
        }             
                
    };
    
    //sets line index array from face arr
    //Note - assumes all faces are triangles (i.e. there will
    //be an extra diagonal for four-sided faces - user should 
    //specify linearr for custom shape generation to show wireframe squares
    //as rectangles rather than two triangles)
    geometryGroup.prototype.setLineIndices = function() {
        
        if (! this.faceidx)
            return;
                    
        var faceArr = this.faceArray, lineArr = this.lineArray = new Uint16Array(this.faceidx*2);      
        this.lineidx = this.faceidx*2;         
        var faceoffset;
            
        for (var i = 0; i < this.faceidx / 3; ++i) {
            
            faceoffset = i*3; lineoffset = faceoffset*2;          
            var a = faceArr[faceoffset], b = faceArr[faceoffset+1], c = faceArr[faceoffset+2];
            
            lineArr[lineoffset] = a; lineArr[lineoffset+1] = b;
            lineArr[lineoffset+2] = a; lineArr[lineoffset+3] = c;
            lineArr[lineoffset+4] = b; lineArr[lineoffset+5] = c;
            
        }
    };
    
    geometryGroup.prototype.truncateArrayBuffers = function(mesh, reallocatemem) {
        
        mesh = (mesh === true) ? true : false;
        
        var vertexArr = this.vertexArray,
            colorArr = this.colorArray,
            normalArr = this.normalArray,
            faceArr = this.faceArray,
            lineArr = this.lineArray;

	//subarray to avoid copying and reallocating memory
        this.vertexArray = vertexArr.subarray(0,this.vertices*3);
        this.colorArray = colorArr.subarray(0,this.vertices*3);
        
        if (mesh) {
            this.normalArray = normalArr.subarray(0,this.vertices*3);
            this.faceArray = faceArr.subarray(0,this.faceidx); 

            if(this.lineidx > 0) //not always set so reclaim memory
                this.lineArray = lineArr.subarray(0,this.lineidx); 
            else
                this.lineArray = new Uint16Array();
        }
        else {
            this.normalArray = new Float32Array(); 
            this.faceArray = new Uint16Array(); 
            this.lineArray = new Uint16Array(); 
        }
        
        if(reallocatemem) { 
        	//actually copy smaller arrays to save memory
        	if(this.normalArray) this.normalArray = new Float32Array(this.normalArray);
        	if(this.faceArray) this.faceArray = new Uint16Array(this.faceArray);
        	if(this.lineArray) this.lineArray = new Uint16Array(this.lineArray);
        	if(this.vertexArray) this.vertexArray = new Float32Array(this.vertexArray);
        	if(this.colorArray) this.colorArray = new Float32Array(this.colorArray);
        	
        }
        this.__inittedArrays = true;        
        
    };
    
    var addGroup = function(geo) {
        var ret = new geometryGroup(geo.geometryGroups.length);
        geo.geometryGroups.push(ret);
        geo.groups = geo.geometryGroups.length;
        
        ret.vertexArray = new Float32Array(BUFFERSIZE*3);
        ret.colorArray = new Float32Array(BUFFERSIZE*3);
        
        //TODO: instantiating uint arrays according to max number of vertices
        // is dangerous, since there exists the possibility that there will be 
        // more face or line indices than vertex points - but so far that doesn't
        // seem to be the case for any of the renders 
        if (geo.mesh) {
            ret.normalArray = new Float32Array(BUFFERSIZE*3);
            ret.faceArray = new Uint16Array(BUFFERSIZE*6);
            ret.lineArray = new Uint16Array(BUFFERSIZE*6);
        }
        
        
        return ret;
    };
    /** @constructor */
    var Geometry = function(mesh) {
        
        $3Dmol.EventDispatcher.call(this);
        
        this.id = $3Dmol.GeometryIDCount++;
    
        this.name = '';
    
        this.hasTangents = false;
    
        this.dynamic = true; // the intermediate typed arrays will be deleted when set to false
        this.mesh = (mesh === true) ? true : false; // Does this geometry represent a mesh (i.e. do we need Face/Line index buffers?)
        // update flags
    
        this.verticesNeedUpdate = false;
        this.elementsNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
    
        this.buffersNeedUpdate = false;
        
        this.geometryGroups = [];
        this.groups = 0;
        
    };
    
    Geometry.prototype = {
        
        constructor : Geometry,

        //Get geometry group to accomodate addVertices new vertices - create 
        // new group if necessary       
        updateGeoGroup : function(addVertices) {
        
            addVertices = addVertices || 0;
            
            var retGroup = this.groups > 0 ? this.geometryGroups[ this.groups - 1 ] : null;
            
            if (!retGroup || retGroup.vertices + addVertices > BUFFERSIZE) 
                retGroup = addGroup(this);
                
            return retGroup;
            
        },
        
        addGeoGroup : function() {
            return addGroup(this);  
        },
        
        setUpNormals : function(three) {
            
            three = three || false;
            
            for (var g = 0; g < this.groups; g++) {
            
                var geoGroup = this.geometryGroups[g];            
                
                geoGroup.setNormals(three);
                
            }  
                      
        },
        
        setUpWireframe : function() {
            for (var g = 0; g < this.groups; g++) {
                var geoGroup = this.geometryGroups[g];
                
                geoGroup.setLineIndices();
            }
        },
        
        //After vertices, colors, etc are collected in regular or typed arrays,
        //  create typed arrays from regular arrays if they don't already exist,
        initTypedArrays : function() {
                
            for (var g = 0; g < this.groups; g++) {
                
                var group = this.geometryGroups[g];
                
                if (group.__inittedArrays === true)
                    continue;
                
                //do not actually reallocate smaller memory here because
                //of the performance hit - if you know your geometry is small,
                //truncate manually with the second parameter true
                group.truncateArrayBuffers(this.mesh, false);
            }
            
        
        },
        
        dispose : function() {
            this.dispatchEvent( {type : 'dispose'} );
        }
    };

    
    return Geometry;
    
})();

Object.defineProperty($3Dmol.Geometry.prototype, "vertices", {
    
    /** @this {$3Dmol.Geometry} */
    get : function() {
        var vertices = 0;
        for (var g = 0; g < this.groups; g++)
            vertices += this.geometryGroups[g].vertices;
            
        return vertices;
    } 
        
});

$3Dmol.GeometryIDCount = 0;


//Raycaster
/** @constructor */
$3Dmol.Raycaster = (function() {
    
    var Raycaster = function(origin, direction, far, near) {
        
        this.ray = new $3Dmol.Ray(origin, direction);
        
        if (this.ray.direction.lengthSq() > 0) 
            this.ray.direction.normalize();
        
        this.near = near || 0;
        this.far = far || Infinity;
    
    };
    
    var sphere = new $3Dmol.Sphere();
    var cylinder = new $3Dmol.Cylinder();
    var triangle = new $3Dmol.Triangle();
    var w_0 = new $3Dmol.Vector3(); // for cylinders, cylinder.c1 - ray.origin
    var v1 = new $3Dmol.Vector3(); // all purpose local vector
    var v2 = new $3Dmol.Vector3();
    var v3 = new $3Dmol.Vector3();
    //var facePlane = new $3Dmol.Plane();
    var localRay = new $3Dmol.Ray();
    var intersectPoint = new $3Dmol.Vector3();
    var matrixPosition = new $3Dmol.Vector3();
    
    var inverseMatrix = new $3Dmol.Matrix4();
        
    var descSort = function(a, b) {
        return a.distance - b.distance;
    };

    // [-1, 1]
    var clamp = function(x) {
        return Math.min(Math.max(x, -1), 1);
    };
    
    //object is a Sphere or (Bounding) Box
    var intersectObject = function(group, clickable, raycaster, intersects) {
        
        matrixPosition.getPositionFromMatrix(group.matrixWorld);
        
        if ((clickable.clickable !== true) || (clickable.intersectionShape === undefined))
            return intersects;
        
        var intersectionShape = clickable.intersectionShape;
        var precision = raycaster.linePrecision;
        precision *= group.matrixWorld.getMaxScaleOnAxis();
        var precisionSq = precision*precision;

        //Check for intersection with clickable's bounding sphere, if it exists
        if (clickable.boundingSphere !== undefined && clickable.boundingSphere instanceof $3Dmol.Sphere) {
            sphere.copy(clickable.boundingSphere);
            sphere.applyMatrix4(group.matrixWorld);
            
            if (!raycaster.ray.isIntersectionSphere(sphere)) {
                return intersects;
            }
        }
        
        //Iterate through intersection objects
        var i, il,
            norm, normProj, cylProj, rayProj,
            distance, closestDistSq, denom, discriminant,
            s, t, s_c, t_c;
        //triangle faces
        for (i = 0, il = intersectionShape.triangle.length; i < il; i++) {
            
            if (intersectionShape.triangle[i] instanceof $3Dmol.Triangle) {
                
                triangle.copy(intersectionShape.triangle[i]);
                triangle.applyMatrix4(group.matrixWorld);
                
                norm = triangle.getNormal();
                
                normProj = raycaster.ray.direction.dot(norm);
                
                //face culling
                if (normProj >= 0)
                    continue;
                
                w_0.subVectors(triangle.a, raycaster.ray.origin);
                
                distance = (norm.dot(w_0)) / normProj;
                
                if (distance < 0)
                    continue;
                    
                //intersects with plane, check if P inside triangle
                v1.copy(raycaster.ray.direction).multiplyScalar(distance).add(raycaster.ray.origin);
                v1.sub(triangle.a); // from pt a to intersection point P
                
                v2.copy(triangle.b).sub(triangle.a); // from pt a to b
                v3.copy(triangle.c).sub(triangle.a); // from pt a to c
                var b_dot_c = v2.dot(v3);
                var b_sq = v2.lengthSq();
                var c_sq = v3.lengthSq();
                
                // P = A + s(v2) + t(v3), inside trianle if 0 <= s, t <=1  and (s + t) <=0
                
                t = ( b_sq*v1.dot(v3) - b_dot_c*v1.dot(v2) ) / ( b_sq*c_sq - b_dot_c*b_dot_c );
                
                if (t < 0 || t > 1)
                    continue;
                
                s = ( v1.dot(v2) - t*b_dot_c ) / b_sq;
                
                if ( (s < 0 || s > 1) || s + t > 1)
                    continue;
                    
                else
                    intersects.push({clickable : clickable,
                                     distance : distance});  
            }
        }
        
        //cylinders
        for (i = 0, il = intersectionShape.cylinder.length; i < il; i++) {
            
            if (intersectionShape.cylinder[i] instanceof $3Dmol.Cylinder){
                
                cylinder.copy(intersectionShape.cylinder[i]);
                cylinder.applyMatrix4(group.matrixWorld);
                
                w_0.subVectors(cylinder.c1, raycaster.ray.origin); 
                
                cylProj = w_0.dot(cylinder.direction); // Dela
                rayProj = w_0.dot(raycaster.ray.direction); // Epsilon
                
                normProj = clamp(raycaster.ray.direction.dot(cylinder.direction)); // Beta
                
                denom = 1 - normProj*normProj;
                
                if (denom === 0.0)
                    continue;
                
                s_c = (normProj*rayProj - cylProj) / denom;
                t_c = (rayProj - normProj*cylProj) / denom;
                
                v1.copy(cylinder.direction).multiplyScalar(s_c).add(cylinder.c1);  // Q_c
                v2.copy(raycaster.ray.direction).multiplyScalar(t_c).add(raycaster.ray.origin); // P_c
                
                closestDistSq = v3.subVectors(v1, v2).lengthSq();
                var radiusSq = cylinder.radius*cylinder.radius;
                
                //Smoothing?
                //if (closestDistSq > radiusSq) radiusSq += precisionSq;
                
                // closest distance between ray and cylinder axis not greater than cylinder radius;
                // might intersect this cylinder between atom and bond midpoint
                if (closestDistSq <= radiusSq){

                    //Find points where ray intersects sides of cylinder
                    discriminant = (normProj*cylProj - rayProj)*(normProj*cylProj - rayProj) - 
                            denom*(w_0.lengthSq() - cylProj*cylProj - radiusSq);
                    
                    // ray tangent to cylinder?
                    if (discriminant <= 0)
                        t = distance = Math.sqrt(closestDistSq);
                    else
                        t = distance = ( (rayProj - normProj*cylProj) - Math.sqrt(discriminant) ) / denom; 
                    
                    //find closest intersection point; make sure it's between atom's position and cylinder midpoint
                    
                    s = normProj*t - cylProj;
                    
                    //does not intersect cylinder between atom and midpoint,
                    // or intersects cylinder behind camera
                    if (s < 0 || s*s > cylinder.lengthSq() || t < 0)
                        continue;
                    
                    else
                        intersects.push({clickable : clickable,
                                         distance : distance});
                    
                }
                    
                
            }
            
        }
         
        //lines
        for (i = 0, il = intersectionShape.line.length; i < il; i += 2) {
            
            v1.copy(intersectionShape.line[i]);
            v1.applyMatrix4(group.matrixWorld);
            v2.copy(intersectionShape.line[i+1]);
            v2.applyMatrix4(group.matrixWorld);
            
            v3.subVectors(v2, v1);
            var bondLengthSq = v3.lengthSq();
            v3.normalize();
            
            w_0.subVectors(v1, raycaster.ray.origin);
            
            lineProj = w_0.dot(v3);
            rayProj = w_0.dot(raycaster.ray.direction);
            
            normProj = clamp(raycaster.ray.direction.dot(v3));
            
            denom = 1 - normProj*normProj;
            
            if (denom === 0.0)
                continue;
            
            s_c = (normProj*rayProj - lineProj) / denom;
            t_c = (rayProj - normProj*lineProj) / denom;
            
            v1.add(v3.multiplyScalar(s_c)); // Q_c
            v2.copy(raycaster.ray.direction).multiplyScalar(t_c).add(raycaster.ray.origin); // P_c
            
            closestDistSq = v3.subVectors(v2, v1).lengthSq();
            
            if (closestDistSq < precisionSq && s_c*s_c < bondLengthSq)
                intersects.push({clickable : clickable,
                                 distance : t_c
                                });
            
        }

        for (i = 0, il = intersectionShape.sphere.length; i < il; i++) {
            //sphere
            if (intersectionShape.sphere[i] instanceof $3Dmol.Sphere) {
                
                sphere.copy(intersectionShape.sphere[i]);
                sphere.applyMatrix4(group.matrixWorld);
                
                if (raycaster.ray.isIntersectionSphere(sphere)) {
                    
                    v1.subVectors(sphere.center, raycaster.ray.origin);
                    
                    //distance from ray origin to point on the ray normal to sphere's center
                    //must be less than sphere's radius (since ray intersects sphere)
                    var distanceToCenter = v1.dot(raycaster.ray.direction);
                    
                    discriminant = distanceToCenter*distanceToCenter - (v1.lengthSq() - sphere.radius*sphere.radius);
                    
                    //Don't select if sphere center behind camera
                    if (distanceToCenter < 0) 
                        return intersects;
                    
                    //ray tangent to sphere?
                    if (discriminant <= 0)
                        distance = distanceToCenter;
                    
                    //This is reversed if sphere is closer than ray origin.  Do we have 
                    //to worry about handling that case?
                    else 
                        distance = distanceToCenter - Math.sqrt(discriminant);
    
                    intersects.push({clickable : clickable, 
                                     distance : distance});
                    return intersects;
                }
            }        
       }
        
    };   
       
    Raycaster.prototype.precision = 0.0001;
    Raycaster.prototype.linePrecision = 0.2;
    
    Raycaster.prototype.set = function(origin, direction) {
        
        this.ray.set(origin, direction);
          
    };
    
    Raycaster.prototype.intersectObjects = function(group, objects) {
        
        var intersects = [];
        
        for (var i = 0, l = objects.length; i < l; i++)            
            intersectObject(group, objects[i], this, intersects);
            
        intersects.sort(descSort);
        
        return intersects;
        
    };
    
    return Raycaster;
    
})();


//$3Dmol Projecion 
//TODO: can probably strip this down a lot (only used for selection handling)
/** @constructor */
$3Dmol.Projector = function () {

    var _viewMatrix = new $3Dmol.Matrix4(),
    _viewProjectionMatrix = new $3Dmol.Matrix4();

    this.projectVector = function ( vector, camera ) {

        camera.matrixWorldInverse.getInverse( camera.matrixWorld );

        _viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );

        return vector.applyProjection( _viewProjectionMatrix );

    };

    this.unprojectVector = function ( vector, camera ) {

        camera.projectionMatrixInverse.getInverse(camera.projectionMatrix);

        _viewProjectionMatrix.multiplyMatrices(camera.matrixWorld, camera.projectionMatrixInverse);

        return vector.applyProjection( _viewProjectionMatrix );

    };

};
/*
 * Simplified Perspective Camera
 */

/** @constructor */
$3Dmol.Camera = function(fov, aspect, near, far) {
    
    $3Dmol.Object3D.call(this);
    
    this.fov = fov !== undefined ? fov : 50;
    this.aspect = aspect !== undefined ? aspect : 1;
    this.near = near !== undefined ? near : 0.1;
    this.far = far !== undefined ? far : 2000;

    this.projectionMatrix = new $3Dmol.Matrix4();
    this.projectionMatrixInverse = new $3Dmol.Matrix4();
    this.matrixWorldInverse = new $3Dmol.Matrix4();
    
    this.updateProjectionMatrix();
        
};

//Inherit Object3D's prototyped methods
$3Dmol.Camera.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Camera.prototype.lookAt = function(vector){
    
    //Why is the parameter order switched (compared to Object3D)?
    this.matrix.lookAt(this.position, vector, this.up);
    
    if (this.rotationAutoUpdate) {    
        
        if (this.useQuaternion === false) 
            this.rotation.setEulerFromRotationMatrix( this.matrix, this.eulerOrder );
        else
            this.quaternion.copy( this.matrix.decompose()[ 1 ] );    
            
    }
    
};

$3Dmol.Camera.prototype.updateProjectionMatrix = function () {

    this.projectionMatrix.makePerspective( this.fov, this.aspect, this.near, this.far );

};


//Render plugins go here

/**
 * Sprite render plugin
 * @this {$3Dmol.SpritePlugin}
 */

$3Dmol.SpritePlugin = function () {

    var _gl, _renderer, _precision, _sprite = {};

    this.init = function ( renderer ) {

        _gl = renderer.context;
        _renderer = renderer;

        _precision = renderer.getPrecision();

        _sprite.vertices = new Float32Array( 8 + 8 );
        _sprite.faces    = new Uint16Array( 6 );

        var i = 0;

        _sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = -1; // vertex 0
        _sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 0;  // uv 0

        _sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = -1; // vertex 1
        _sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 0;  // uv 1

        _sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;  // vertex 2
        _sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;  // uv 2

        _sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = 1;  // vertex 3
        _sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 1;  // uv 3

        i = 0;

        _sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 1; _sprite.faces[ i++ ] = 2;
        _sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 2; _sprite.faces[ i++ ] = 3;

        _sprite.vertexBuffer  = _gl.createBuffer();
        _sprite.elementBuffer = _gl.createBuffer();

        _gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );
        _gl.bufferData( _gl.ARRAY_BUFFER, _sprite.vertices, _gl.STATIC_DRAW );

        _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );
        _gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, _sprite.faces, _gl.STATIC_DRAW );

        _sprite.program = createProgram( $3Dmol.ShaderLib.sprite, _precision );

        _sprite.attributes = {};
        _sprite.uniforms = {};

        _sprite.attributes.position           = _gl.getAttribLocation ( _sprite.program, "position" );
        _sprite.attributes.uv                 = _gl.getAttribLocation ( _sprite.program, "uv" );

        _sprite.uniforms.uvOffset             = _gl.getUniformLocation( _sprite.program, "uvOffset" );
        _sprite.uniforms.uvScale              = _gl.getUniformLocation( _sprite.program, "uvScale" );

        _sprite.uniforms.rotation             = _gl.getUniformLocation( _sprite.program, "rotation" );
        _sprite.uniforms.scale                = _gl.getUniformLocation( _sprite.program, "scale" );
        _sprite.uniforms.alignment            = _gl.getUniformLocation( _sprite.program, "alignment" );

        _sprite.uniforms.color                = _gl.getUniformLocation( _sprite.program, "color" );
        _sprite.uniforms.map                  = _gl.getUniformLocation( _sprite.program, "map" );
        _sprite.uniforms.opacity              = _gl.getUniformLocation( _sprite.program, "opacity" );

        _sprite.uniforms.useScreenCoordinates = _gl.getUniformLocation( _sprite.program, "useScreenCoordinates" );
        _sprite.uniforms.screenPosition       = _gl.getUniformLocation( _sprite.program, "screenPosition" );
        _sprite.uniforms.modelViewMatrix      = _gl.getUniformLocation( _sprite.program, "modelViewMatrix" );
        _sprite.uniforms.projectionMatrix     = _gl.getUniformLocation( _sprite.program, "projectionMatrix" );

        _sprite.uniforms.fogType              = _gl.getUniformLocation( _sprite.program, "fogType" );
        _sprite.uniforms.fogDensity           = _gl.getUniformLocation( _sprite.program, "fogDensity" );
        _sprite.uniforms.fogNear              = _gl.getUniformLocation( _sprite.program, "fogNear" );
        _sprite.uniforms.fogFar               = _gl.getUniformLocation( _sprite.program, "fogFar" );
        _sprite.uniforms.fogColor             = _gl.getUniformLocation( _sprite.program, "fogColor" );

        _sprite.uniforms.alphaTest            = _gl.getUniformLocation( _sprite.program, "alphaTest" );

    };

    this.render = function ( scene, camera, viewportWidth, viewportHeight ) {

        var sprites = scene.__webglSprites,
            nSprites = sprites.length;

        if ( ! nSprites ) return;

        var attributes = _sprite.attributes,
            uniforms = _sprite.uniforms;

        var invAspect = viewportHeight / viewportWidth;

        var halfViewportWidth = viewportWidth * 0.5,
            halfViewportHeight = viewportHeight * 0.5;

        // setup gl

        _gl.useProgram( _sprite.program );

        _gl.enableVertexAttribArray( attributes.position );
        _gl.enableVertexAttribArray( attributes.uv );

        _gl.disable( _gl.CULL_FACE );
        _gl.enable( _gl.BLEND );

        _gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );
        _gl.vertexAttribPointer( attributes.position, 2, _gl.FLOAT, false, 2 * 8, 0 );
        _gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 2 * 8, 8 );

        _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );

        _gl.uniformMatrix4fv( uniforms.projectionMatrix, false, camera.projectionMatrix.elements );

        _gl.activeTexture( _gl.TEXTURE0 );
        _gl.uniform1i( uniforms.map, 0 );

        var oldFogType = 0;
        var sceneFogType = 0;
        var fog = scene.fog;

        if ( fog ) {

            _gl.uniform3f( uniforms.fogColor, fog.color.r, fog.color.g, fog.color.b );

            _gl.uniform1f( uniforms.fogNear, fog.near );
            _gl.uniform1f( uniforms.fogFar, fog.far );

            _gl.uniform1i( uniforms.fogType, 1 );
            oldFogType = 1;
            sceneFogType = 1;


        } 
        
        else {

            _gl.uniform1i( uniforms.fogType, 0 );
            oldFogType = 0;
            sceneFogType = 0;

        }


        // update positions and sort

        var i, sprite, material, screenPosition, size, fogType, scale = [];

        for( i = 0; i < nSprites; i ++ ) {

            sprite = sprites[ i ];
            material = sprite.material;

            if ( ! sprite.visible || material.opacity === 0 ) continue;

            if ( ! material.useScreenCoordinates ) {

                sprite._modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, sprite.matrixWorld );
                sprite.z = - sprite._modelViewMatrix.elements[ 14 ];

            } else {

                sprite.z = - sprite.position.z;

            }

        }

        sprites.sort( painterSortStable );

        // render all sprites

        for( i = 0; i < nSprites; i ++ ) {

            sprite = sprites[ i ];
            material = sprite.material;

            if ( ! sprite.visible || material.opacity === 0 ) continue;

            if ( material.map && material.map.image && material.map.image.width ) {

                _gl.uniform1f( uniforms.alphaTest, material.alphaTest );
                var w = material.map.image.width;
                var h = material.map.image.height;
                
                scale[ 0 ] = w*_renderer.devicePixelRatio/viewportWidth;
                scale[ 1 ] = h*_renderer.devicePixelRatio/viewportHeight;
                
                if ( material.useScreenCoordinates === true ) {

                    _gl.uniform1i( uniforms.useScreenCoordinates, 1 );
                    _gl.uniform3f(
                        uniforms.screenPosition,
                        ( ( sprite.position.x * _renderer.devicePixelRatio ) - halfViewportWidth  ) / halfViewportWidth,
                        ( halfViewportHeight - ( sprite.position.y * _renderer.devicePixelRatio ) ) / halfViewportHeight,
                        Math.max( 0, Math.min( 1, sprite.position.z ) )
                    );

                } else {

                    _gl.uniform1i( uniforms.useScreenCoordinates, 0 );
                    _gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, sprite._modelViewMatrix.elements );
                }

                if ( scene.fog && material.fog ) {

                    fogType = sceneFogType;

                } else {

                    fogType = 0;

                }

                if ( oldFogType !== fogType ) {

                    _gl.uniform1i( uniforms.fogType, fogType );
                    oldFogType = fogType;

                }

                size = 1 / ( material.scaleByViewport ? viewportHeight : 1 );

                scale[ 0 ] *= size * sprite.scale.x;
                scale[ 1 ] *= size * sprite.scale.y;

                _gl.uniform2f( uniforms.uvScale, material.uvScale.x, material.uvScale.y );
                _gl.uniform2f( uniforms.uvOffset, material.uvOffset.x, material.uvOffset.y );
                _gl.uniform2f( uniforms.alignment, material.alignment.x, material.alignment.y );

                _gl.uniform1f( uniforms.opacity, material.opacity );
                _gl.uniform3f( uniforms.color, material.color.r, material.color.g, material.color.b );

                _gl.uniform1f( uniforms.rotation, sprite.rotation );
                _gl.uniform2fv( uniforms.scale, scale );

                //_renderer.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );
                _renderer.setDepthTest( material.depthTest );
                _renderer.setDepthWrite( material.depthWrite );
                _renderer.setTexture( material.map, 0 );

                _gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );

            }

        }

        // restore gl

        _gl.enable( _gl.CULL_FACE );

    };

    function createProgram ( shader, precision ) {

        var program = _gl.createProgram();

        var fragmentShader = _gl.createShader( _gl.FRAGMENT_SHADER );
        var vertexShader = _gl.createShader( _gl.VERTEX_SHADER );

        var prefix = "precision " + precision + " float;\n";

        _gl.shaderSource( fragmentShader, prefix + shader.fragmentShader );
        _gl.shaderSource( vertexShader, prefix + shader.vertexShader );

        _gl.compileShader( fragmentShader );
        _gl.compileShader( vertexShader );
        
        if ( ! _gl.getShaderParameter(fragmentShader, _gl.COMPILE_STATUS) || ! _gl.getShaderParameter(vertexShader,_gl.COMPILE_STATUS) ) {

                console.error(_gl.getShaderInfoLog(fragmentShader));
                console.error("could not initialize shader");
                return null;
        }

        _gl.attachShader( program, fragmentShader );
        _gl.attachShader( program, vertexShader );

        _gl.linkProgram( program );

        if (! _gl.getProgramParameter(program, _gl.LINK_STATUS) )
                console.error("Could not initialize shader");

        return program;

    }

    function painterSortStable ( a, b ) {

        if ( a.z !== b.z ) {

            return b.z - a.z;

        } else {

            return b.id - a.id;

        }

    }

};

$3Dmol.Light = function(hex, intensity) {
    
    $3Dmol.Object3D.call(this);
    
    this.color = new $3Dmol.Color(hex);
    this.position = new $3Dmol.Vector3( 0, 1, 0 );
    this.target = new $3Dmol.Object3D();

    this.intensity = ( intensity !== undefined ) ? intensity : 1;

    this.castShadow = false;
    this.onlyShadow = false;
    
};

$3Dmol.Light.prototype = Object.create($3Dmol.Object3D.prototype);
/**
 * Line and Mesh material types
 * @constructor
 */
$3Dmol.Material = function () {

    $3Dmol.EventDispatcher.call( this );

    this.id = $3Dmol.MaterialIdCount ++;

    this.name = '';
    
    //TODO: Which of these instance variables can I remove??
    this.side = $3Dmol.FrontSide;

    this.opacity = 1;
    this.transparent = false;

    this.blending = $3Dmol.NormalBlending;

    this.depthTest = true;
    this.depthWrite = true;

    this.polygonOffset = false;
    this.polygonOffsetFactor = 0;
    this.polygonOffsetUnits = 0;

    this.alphaTest = 0;

    this.visible = true;

    this.needsUpdate = true;

};


$3Dmol.Material.prototype.setValues = function ( values ) {

    if ( values === undefined ) return;

    for ( var key in values ) {

        var newValue = values[ key ];

        if ( newValue === undefined ) {

            console.warn( '$3Dmol.Material: \'' + key + '\' parameter is undefined.' );
            continue;

        }

        if ( key in this ) {

            var currentValue = this[ key ];

            if ( currentValue instanceof $3Dmol.Color && newValue instanceof $3Dmol.Color ) {

                currentValue.copy( newValue );

            } else if ( currentValue instanceof $3Dmol.Color ) {

                currentValue.set( newValue );

            } else if ( currentValue instanceof $3Dmol.Vector3 && newValue instanceof $3Dmol.Vector3 ) {

                currentValue.copy( newValue );

            } else {

                this[ key ] = newValue;

            }

        }

    }

};
//TODO: might want to look into blending equations
$3Dmol.Material.prototype.clone = function ( material ) {

    if ( material === undefined ) material = new $3Dmol.Material();

    material.name = this.name;

    material.side = this.side;

    material.opacity = this.opacity;
    material.transparent = this.transparent;

    material.blending = this.blending;

    material.depthTest = this.depthTest;
    material.depthWrite = this.depthWrite;

    material.polygonOffset = this.polygonOffset;
    material.polygonOffsetFactor = this.polygonOffsetFactor;
    material.polygonOffsetUnits = this.polygonOffsetUnits;

    material.alphaTest = this.alphaTest;

    material.overdraw = this.overdraw;

    material.visible = this.visible;

    return material;

};

$3Dmol.Material.prototype.dispose = function () {

    this.dispatchEvent( { type: 'dispose' } );

};

$3Dmol.MaterialIdCount = 0;

//Line basic material
/** @constructor */
$3Dmol.LineBasicMaterial = function(parameters) {
    
    $3Dmol.Material.call(this);
    
    this.color = new $3Dmol.Color(0xffffff);
    
    this.linewidth = 1;
    this.linecap = 'round';
    this.linejoin = 'round';
    
    this.vertexColors = false;
    
    this.fog = true;
    this.shaderID = "basic";
    this.setValues(parameters);
    
};

$3Dmol.LineBasicMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.LineBasicMaterial.prototype.clone = function() {
  
    var material = new $3Dmol.LineBasicMaterial();
    
    $3Dmol.Material.prototype.clone.call(this, material);
    
    material.color.copy();
    return material;
};

//Mesh Lambert material
/** @constructor */
$3Dmol.MeshLambertMaterial = function(parameters) {
    
    $3Dmol.Material.call(this);
    
    this.color = new $3Dmol.Color(0xffffff);
    this.ambient = new $3Dmol.Color(0xfffff);
    this.emissive = new $3Dmol.Color(0x000000);
    
    //TODO: Which of these instance variables do I really need?
    this.wrapAround = false;
    this.wrapRGB = new $3Dmol.Vector3(1,1,1);
    
    this.map = null;
    
    this.lightMap = null;
    
    this.specularMap = null;
    
    this.envMap = null;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    
    this.fog = true;
    
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';
    
    this.shading = $3Dmol.SmoothShading;
    this.shaderID = "lambert";
    this.vertexColors = $3Dmol.NoColors;
    
    this.skinning = false;
    
    this.setValues(parameters);
    
};

$3Dmol.MeshLambertMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.MeshLambertMaterial.prototype.clone = function(material) {
  
    if ( typeof material === "undefined" ) material = new $3Dmol.MeshLambertMaterial();
    
    $3Dmol.Material.prototype.clone.call(this, material);
    
    material.color.copy(this.color);
    material.ambient.copy(this.ambient);
    material.emissive.copy(this.emissive);
    
    material.wrapAround = this.wrapAround;
    material.wrapRGB.copy(this.wrapRGB);
    
    material.map = this.map;
    
    material.lightMap = this.lightMap;
    
    material.specularMap = this.specularMap;
    
    material.envMap = this.envMap;
    material.combine = this.combine;
    material.reflectivity = this.reflectivity;
    material.refractionRatio = this.refractionRatio;
    
    material.fog = this.fog;
    
    material.shading = this.shading;
    material.shaderID = this.shaderID;
    material.vertexColors = this.vertexColors;
    
    material.skinning = this.skinning;
    material.morphTargets = this.morphTargets;
    material.morphNormals = this.morphNormals;
    
    return material;
    
};

//Double sided Mesh Lambert material
/** @constructor */
$3Dmol.MeshDoubleLambertMaterial = function(parameters) {
    
    $3Dmol.MeshLambertMaterial.call(this);

    this.shaderID = "lambertdouble";
    this.side = $3Dmol.DoubleSide;    
    
};

$3Dmol.MeshDoubleLambertMaterial.prototype = Object.create($3Dmol.MeshLambertMaterial.prototype);

$3Dmol.MeshDoubleLambertMaterial.prototype.clone = function() {
  
    var material = new $3Dmol.MeshDoubleLambertMaterial();
    
    $3Dmol.MeshLambertMaterial.prototype.clone.call(this, material);
        
    return material;
    
};


//Imposter material
/** @constructor */
$3Dmol.ImposterMaterial = function(parameters) {
  
  $3Dmol.Material.call(this);
  
  this.color = new $3Dmol.Color(0xffffff);
  this.ambient = new $3Dmol.Color(0xfffff);
  this.emissive = new $3Dmol.Color(0x000000);
  
  //TODO: Which of these instance variables do I really need?
  this.wrapAround = false;
  this.wrapRGB = new $3Dmol.Vector3(1,1,1);
  
  this.map = null;
  
  this.lightMap = null;
  
  this.specularMap = null;
  
  this.envMap = null;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;
  
  this.fog = true;
  
  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.wireframeLinecap = 'round';
  this.wireframeLinejoin = 'round';
  
  this.shading = $3Dmol.SmoothShading;
  this.shaderID = "sphereimposter";
  this.vertexColors = $3Dmol.NoColors;
  
  this.skinning = false;
  
  this.setValues(parameters);
  
};

$3Dmol.ImposterMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.ImposterMaterial.prototype.clone = function() {

  var material = new $3Dmol.ImposterMaterial();
  
  $3Dmol.Material.prototype.clone.call(this, material);
  
  material.color.copy(this.color);
  material.ambient.copy(this.ambient);
  material.emissive.copy(this.emissive);
  
  material.wrapAround = this.wrapAround;
  material.wrapRGB.copy(this.wrapRGB);
  
  material.map = this.map;
  
  material.lightMap = this.lightMap;
  
  material.specularMap = this.specularMap;
  
  material.envMap = this.envMap;
  material.combine = this.combine;
  material.reflectivity = this.reflectivity;
  material.refractionRatio = this.refractionRatio;
  
  material.fog = this.fog;
  
  material.shading = this.shading;
  material.shaderID = this.shaderID;
  material.vertexColors = this.vertexColors;
  
  material.skinning = this.skinning;
  material.morphTargets = this.morphTargets;
  material.morphNormals = this.morphNormals;
  
  return material;
  
};


//Sprite material
/** @constructor */
$3Dmol.SpriteMaterial = function(parameters) {
    
    $3Dmol.Material.call(this);
    
    this.color = new $3Dmol.Color(0xffffff);
    this.map = new $3Dmol.Texture();
    
    this.useScreenCoordinates = true;
    this.depthTest = !this.useScreenCoordinates;
    this.sizeAttenuation = !this.useScreenCoordinates;
    this.scaleByViewPort = !this.sizeAttenuation;
    this.alignment = $3Dmol.SpriteAlignment.center.clone();
    
    this.fog = false; // use scene fog
    
    this.uvOffset = new $3Dmol.Vector2(0, 0);
    this.uvScale = new $3Dmol.Vector2(1, 1);
    
    this.setValues(parameters);
    
    parameters = parameters || {};
    
    if (parameters.depthTest === undefined)
        this.depthTest = !this.useScreenCoordinates;
    if (parameters.sizeAttenuation === undefined)
        this.sizeAttenuation = !this.useScreenCoordinates;
    if (parameters.scaleByViewPort === undefined)
        this.scaleByViewPort = !this.sizeAttenuation;
    
};

$3Dmol.SpriteMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.SpriteMaterial.prototype.clone = function() {
    
    var material = new $3Dmol.SpriteMaterial();
    
    $3Dmol.Material.prototype.clone.call(this, material);
    
    material.color.copy(this.color);
    material.map = this.map;
    
    material.useScreenCoordinates = useScreenCoordinates;
    material.sizeAttenuation = this.sizeAttenuation;
    material.scaleByViewport = this.scaleByViewPort;
    material.alignment.copy(this.alignment);
    
    material.uvOffset.copy(this.uvOffset);
    
    return material;
    
};

//Alignment for Sprites

$3Dmol.SpriteAlignment = {};
$3Dmol.SpriteAlignment.topLeft = new $3Dmol.Vector2(1, -1);
$3Dmol.SpriteAlignment.topCenter = new $3Dmol.Vector2(0, -1);
$3Dmol.SpriteAlignment.topRight = new $3Dmol.Vector2(-1, -1);
$3Dmol.SpriteAlignment.centerLeft = new $3Dmol.Vector2(1, 0);
$3Dmol.SpriteAlignment.center = new $3Dmol.Vector2(0, 0);
$3Dmol.SpriteAlignment.centerRight = new $3Dmol.Vector2(-1, 0);
$3Dmol.SpriteAlignment.bottomLeft = new $3Dmol.Vector2(1, 1);
$3Dmol.SpriteAlignment.bottomCenter = new $3Dmol.Vector2(0, 1);
$3Dmol.SpriteAlignment.bottomRight = new $3Dmol.Vector2(-1, 1);


//Texture
//We really only create textures from 2d rendering contexts (to display text labels)
/** @constructor */
$3Dmol.Texture = function(image) {

    $3Dmol.EventDispatcher.call(this);
    
    this.id = $3Dmol.TextureIdCount++;
    
    this.name = "";
    
    this.image = image;
    this.mipmaps = [];
    
    this.mapping = new $3Dmol.UVMapping();
    
    this.wrapS = $3Dmol.ClampToEdgeWrapping;
    this.wrapT = $3Dmol.ClampToEdgeWrapping;
    
    this.magFilter = $3Dmol.LinearFilter;
    this.minFilter = $3Dmol.LinearMipMapLinearFilter;
    
    this.anisotropy = 1;
    
    this.format = $3Dmol.RGBAFormat;
    this.type = $3Dmol.UnsignedByteType;
    
    this.offset = new $3Dmol.Vector2(0, 0);
    this.repeat = new $3Dmol.Vector2(1, 1);
    
    this.generateMipmaps = true;
    this.premultiplyAlpha = false;
    this.flipY = true;
    this.unpackAlignment = 4;
    
    this.needsUpdate = false;
    this.onUpdate = null;
    
};

$3Dmol.Texture.prototype = {

    constructor : $3Dmol.Texture,
    
    clone : function(texture) {
        
        if (texture === undefined)
            texture = new $3Dmol.Texture();
        
        texture.image = this.image;
        texture.mipmaps = this.mipmaps.slice(0);
        
        texture.mapping = this.mapping;
        
        texture.wrapS = this.wrapS;
        texture.wrapT = this.wrapT;
        
        texture.magFilter = this.magFilter;
        texture.minFilter = this.minFilter;
        
        texture.anisotropy = this.anisotropy;
        
        texture.format = this.format;
        texture.type = this.type;
        
        texture.offset.copy(this.offset);
        texture.repeat.copy(this.repeat);
        
        texture.generateMipmaps = this.generateMipmaps;
        texture.premultiplyAlpha = this.premultiplyAlpha;
        texture.flipY = this.flipY;
        texture.unpackAlignment = this.unpackAlignment;
        
        return texture;
        
    },
    
    dispose : function() {
        
        this.dispatchEvent( {type: 'dispose'});
        
    }    
    
};

$3Dmol.TextureIdCount = 0;


// sides
$3Dmol.FrontSide = 0;
$3Dmol.BackSide = 1;
$3Dmol.DoubleSide = 2;

// blending modes
$3Dmol.NoBlending = 0;
$3Dmol.NormalBlending = 1;
$3Dmol.AdditiveBlending = 2;
$3Dmol.SubtractiveBlending = 3;
$3Dmol.MultiplyBlending = 4;
$3Dmol.CustomBlending = 5;

// shading
$3Dmol.NoShading = 0;
$3Dmol.FlatShading = 1;
$3Dmol.SmoothShading = 2;

// colors
$3Dmol.NoColors = 0;
$3Dmol.FaceColors = 1;
$3Dmol.VertexColors = 2;

//Texture constants
//TODO: Which of these do I need (since I only use textures to display label sprites) ?
$3Dmol.MultiplyOperation = 0;
$3Dmol.MixOperation = 1;
$3Dmol.AddOperation = 2;

// mapping modes

$3Dmol.UVMapping = function() {};

// wrapping modes
$3Dmol.ClampToEdgeWrapping = 1001;

//Filters
$3Dmol.LinearFilter = 1006;
$3Dmol.LinearMipMapLinearFilter = 1008;

//Data types
$3Dmol.UnsignedByteType = 1009;

//Pixel formats
$3Dmol.RGBAFormat = 1021;/* 
 * $3Dmol Mesh and Line objects
 */


//Line Object
/** @constructor */
$3Dmol.Line = function (geometry, material, type) {

    $3Dmol.Object3D.call(this);

    this.geometry = geometry;
        //TODO: update material and type to webgl
    this.material = (material !== undefined) ? material : new $3Dmol.LineBasicMaterial( { color: Math.random() * 0xffffff } );
    this.type = (type !== undefined) ? type : $3Dmol.LineStrip;

};

$3Dmol.LineStrip = 0;
$3Dmol.LinePieces = 1;

$3Dmol.Line.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Line.prototype.clone = function (object) {

    if (object === undefined) object = new $3Dmol.Line(this.geometry, this.material, this.type);

    $3Dmol.Object3D.prototype.clone.call(this, object);

    return object;

};


//Mesh Object
/** @constructor */
$3Dmol.Mesh = function(geometry, material) {

    $3Dmol.Object3D.call(this);

    this.geometry = geometry;
    this.material = (material !== undefined) ? material : new $3Dmol.MeshBasicMaterial( { color: Math.random() * 0xffffff, wireframe: true } );

};

$3Dmol.Mesh.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Mesh.prototype.clone = function (object) {

    if (object === undefined) object = new $3Dmol.Mesh(this.geometry, this.material);

    $3Dmol.Object3D.prototype.clone.call(this, object);

    return object;

};


//Sprite object
/** @constructor */
$3Dmol.Sprite = function(material) {
    
    $3Dmol.Object3D.call(this);
    
    this.material = (material !== undefined) ? material : new $3Dmol.SpriteMaterial();

    this.rotation3d = this.rotation;
    this.rotation = 0;
    
};

$3Dmol.Sprite.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Sprite.prototype.updateMatrix = function() {
    
    this.matrix.setPosition(this.position);
    
    this.rotation3d.set(0, 0, this.rotation);
    this.matrix.setRotationFromEuler(this.rotation3d);
    
    if (this.scale.x !== 1 || this.scale.y !== 1)
        this.matrix.scale(this.scale);
    
    this.matrixWorldNeedsUpdate = true;
    
};

$3Dmol.Sprite.prototype.clone = function(object) {
    
    if (object === undefined)
        object = new $3Dmol.Sprite(this.material);
    
    $3Dmol.Object3D.prototype.clone.call(this, object);
    
    return object;
    
};
/**
Simplified webGL renderer 
 */

$3Dmol.Renderer = function ( parameters ) {
    
    parameters = parameters || {};
    
    var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement( 'canvas' ),

    _precision = parameters.precision !== undefined ? parameters.precision : 'highp',

    _alpha = parameters.alpha !== undefined ? parameters.alpha : true,
    _premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
    _antialias = parameters.antialias !== undefined ? parameters.antialias : false,
    _stencil = parameters.stencil !== undefined ? parameters.stencil : true,
    _preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,

    _clearColor = parameters.clearColor !== undefined ? new $3Dmol.Color( parameters.clearColor ) : new $3Dmol.Color( 0x000000 ),
    _clearAlpha = parameters.clearAlpha !== undefined ? parameters.clearAlpha : 0;
    
    this.domElement = _canvas;
    this.context = null;
    this.devicePixelRatio = parameters.devicePixelRatio !== undefined ? 
    parameters.devicePixelRatio : (self.devicePixelRatio !== undefined) ? 
                                   self.devicePixelRatio : 1;

    // clearing

    this.autoClear = true;
    this.autoClearColor = true;
    this.autoClearDepth = true;
    this.autoClearStencil = true;

    // scene graph

    this.sortObjects = true;

    this.autoUpdateObjects = true;
    this.autoUpdateScene = true;
    
    this.renderPluginsPost = [];
    
    // info

    this.info = {

        memory: {
    
        programs: 0,
        geometries: 0,
        textures: 0
    
        },
    
        render: {
    
        calls: 0,
        vertices: 0,
        faces: 0,
        points: 0
    
        }

    };

    // internal properties

    var _this = this,

    _programs = [],
    _programs_counter = 0,

    // internal state cache

    _currentProgram = null,
    _currentFramebuffer = null,
    _currentMaterialId = -1,
    _currentGeometryGroupHash = null,
    _currentCamera = null,
    _geometryGroupCounter = 0,

    _usedTextureUnits = 0,

    // GL state cache

    _oldDoubleSided = -1,
    _oldFlipSided = -1,

    _oldBlending = -1,

    _oldBlendEquation = -1,
    _oldBlendSrc = -1,
    _oldBlendDst = -1,

    _oldDepthTest = -1,
    _oldDepthWrite = -1,

    _oldPolygonOffset = null,
    _oldPolygonOffsetFactor = null,
    _oldPolygonOffsetUnits = null,

    _oldLineWidth = null,

    _viewportX = 0,
    _viewportY = 0,
    _viewportWidth = 0,
    _viewportHeight = 0,
    _currentWidth = 0,
    _currentHeight = 0,

    _enabledAttributes = {},

     // camera matrices cache

    _projScreenMatrix = new $3Dmol.Matrix4(),

    _vector3 = new $3Dmol.Vector3(),

    // light arrays cache

    _direction = new $3Dmol.Vector3(),

    _lightsNeedUpdate = true,

    _lights = {

            ambient: [0,0,0],
            directional: { length: 0, colors: [], positions: [] },
            point: { length: 0, colors: [], positions: [], distances: [] },
            spot: { length: 0, colors: [], positions: [], distances: [], directions: [], anglesCos: [], exponents: [] },
            hemi: { length: 0, skyColors: [], groundColors: [], positions: [] }

    };

    // initialize

    var _gl;

    initGL();

    setDefaultGLState();

    this.context = _gl;    

    // API

    this.getContext = function () {

            return _gl;

    };

    this.getPrecision = function () {

            return _precision;

    };
    
    this.setClearColorHex = function ( hex, alpha ) {

            _clearColor.setHex( hex );
            _clearAlpha = alpha;

            _gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );

    };

    this.setSize = function ( width, height ) {

            _canvas.width = width * this.devicePixelRatio;
            _canvas.height = height * this.devicePixelRatio;

            _canvas.style.width = width + 'px';
            _canvas.style.height = height + 'px';

            this.setViewport( 0, 0, _canvas.width, _canvas.height );

    };

    this.setViewport = function ( x, y, width, height ) {

            _viewportX = x !== undefined ? x : 0;
            _viewportY = y !== undefined ? y : 0;

            _viewportWidth = width !== undefined ? width : _canvas.width;
            _viewportHeight = height !== undefined ? height : _canvas.height;

            _gl.viewport( _viewportX, _viewportY, _viewportWidth, _viewportHeight );

    };

    this.clear = function ( color, depth, stencil ) {

            var bits = 0;

            if ( color === undefined || color ) bits |= _gl.COLOR_BUFFER_BIT;
            if ( depth === undefined || depth ) bits |= _gl.DEPTH_BUFFER_BIT;
            if ( stencil === undefined || stencil ) bits |= _gl.STENCIL_BUFFER_BIT;

            _gl.clear( bits );

    };

    this.clearTarget = function ( color, depth, stencil ) {

            
            this.clear( color, depth, stencil );

    };

    this.setMaterialFaces = function ( material ) {

            var doubleSided = material.side === $3Dmol.DoubleSide;
            var flipSided = material.side === $3Dmol.BackSide;

            if ( _oldDoubleSided !== doubleSided ) {

                if ( doubleSided ) {

                    _gl.disable( _gl.CULL_FACE );

                } else {

                    _gl.enable( _gl.CULL_FACE );

                }

                _oldDoubleSided = doubleSided;

            }

            if ( _oldFlipSided !== flipSided ) {

                if ( flipSided ) {

                    _gl.frontFace( _gl.CW );

                } else {

                    _gl.frontFace( _gl.CCW );

                }

                _oldFlipSided = flipSided;

            }    

    };
    
    this.setDepthTest = function ( depthTest ) {

            if ( _oldDepthTest !== depthTest ) {

                if ( depthTest ) {

                    _gl.enable( _gl.DEPTH_TEST );

                } else {

                    _gl.disable( _gl.DEPTH_TEST );

                }

                _oldDepthTest = depthTest;

            }

    };

    this.setDepthWrite = function ( depthWrite ) {

            if ( _oldDepthWrite !== depthWrite ) {

                    _gl.depthMask( depthWrite );
                    _oldDepthWrite = depthWrite;

            }

    };

    this.setBlending = function( blending ) {

            if (blending === $3Dmol.NoBlending) 
                    _gl.disable( _gl.BLEND );

            else {
                    _gl.enable( _gl.BLEND );
                    _gl.blendEquationSeparate( _gl.FUNC_ADD, _gl.FUNC_ADD );
                    _gl.blendFuncSeparate( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA, _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA );
            }

            _oldBlending = blending;
    };
    
    // Plugins
    
    this.addPostPlugin = function(plugin) {

        plugin.init(this);
        this.renderPluginsPost.push(plugin);

    };

    // Sorting

    function numericalSort ( a, b ) {

            return b[ 0 ] - a[ 0 ];

    }

    function enableAttribute( attribute ) {

        if ( ! _enabledAttributes[ attribute ] ) {

            _gl.enableVertexAttribArray( attribute );
            _enabledAttributes[ attribute ] = true;

        }

    }

    function disableAttributes() {

        for ( var attribute in _enabledAttributes ) {

            if ( _enabledAttributes[ attribute ] ) {

                _gl.disableVertexAttribArray( attribute );
                _enabledAttributes[ attribute ] = false;

            }

        }

    } 

    function setPolygonOffset ( polygonOffset, factor, units) {

        if ( _oldPolygonOffset !== polygonOffset ) {

            if (polygonOffset)
                _gl.enable( _gl.POLYGON_OFFSET_FILL );
            else
                _gl.disable( _gl.POLYGON_OFFSET_FILL );
        }
    }

    function setLineWidth ( width ) {

        if ( width !== _oldLineWidth ) {
            _gl.lineWidth(width);
            _oldLineWidth = width;
        }

    }
    
    var onGeometryDispose = function(event) {
        
        var geometry = event.target;
        geometry.removeEventListener('dispose', onGeometryDispose);
        
        deallocateGeometry(geometry);
        
        _this.info.memory.geometries--;
        
    };
    
    var onTextureDispose = function(event) {

        var texture = event.target;

        texture.removeEventListener('dispose', onTextureDispose);

        deallocateTexture(texture);

        _this.info.memory.textures--;


    };
    
    var onMaterialDispose = function(event) {
        
        var material = event.target;
        material.removeEventListener('dispose', onMaterialDispose);
        
        deallocateMaterial(material);
        
    };
    
    var deallocateGeometry = function(geometry) {
        
        geometry.__webglInit = undefined;
        
        if (geometry.__webglVertexBuffer !== undefined)
            _gl.deleteBuffer(geometry.__webglVertexBuffer);
        
        if (geometry.__webglColorBuffer !== undefined)
            _gl.deleteBuffer(geometry.__webglColorBuffer);
        
        if (geometry.geometryGroups !== undefined) {
            
            for (var g = 0, gl = geometry.groups; g < gl; g++) {  
                
                var geometryGroup = geometry.geometryGroups[g];

                if (geometryGroup.__webglVertexBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglVertexBuffer);

                if (geometryGroup.__webglColorBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglColorBuffer);
                
                if (geometryGroup.__webglNormalBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglNormalBuffer);  
                
                if (geometryGroup.__webglFaceBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglFaceBuffer);
                    
                if (geometryGroup.__webglLineBuffer !== undefined)
                    _gl.deleteBuffer(geometryGroup.__webglLineBuffer);
                    
            }
        }
    };
    
    var deallocateMaterial = function (material) {

        var program = material.program;

        if ( program === undefined ) return;

        material.program = undefined;

        // only deallocate GL program if this was the last use of shared program
        // assumed there is only single copy of any program in the _programs list
        // (that's how it's constructed)

        var i, il, programInfo;
        var deleteProgram = false;

        for ( i = 0, il = _programs.length; i < il; i ++ ) {

            programInfo = _programs[ i ];

            if ( programInfo.program === program ) {

                programInfo.usedTimes --;

                if ( programInfo.usedTimes === 0 ) {

                    deleteProgram = true;

                }

                break;

            }

        }

        if ( deleteProgram === true ) {

            // avoid using array.splice, this is costlier than creating new array from scratch

            var newPrograms = [];

            for ( i = 0, il = _programs.length; i < il; i ++ ) {

                programInfo = _programs[ i ];

                if ( programInfo.program !== program ) {

                    newPrograms.push( programInfo );

                }

            }

            _programs = newPrograms;

            _gl.deleteProgram( program );

            _this.info.memory.programs --;

        }

    };
    
    var deallocateTexture = function(texture) {

        if (texture.image && texture.image.__webglTextureCube) {

            // cube texture

            _gl.deleteTexture(texture.image.__webglTextureCube);

        } 
        
        else {

            // 2D texture

            if ( ! texture.__webglInit ) return;

            texture.__webglInit = false;
            _gl.deleteTexture( texture.__webglTexture );

        }

    };

    //Compile and return shader
    function getShader (type, str) {

        var shader;

        if (type === "fragment")
            shader = _gl.createShader( _gl.FRAGMENT_SHADER );
        else if (type === "vertex")
            shader = _gl.createShader( _gl.VERTEX_SHADER );

        _gl.shaderSource(shader, str);
        _gl.compileShader(shader);

        if ( ! _gl.getShaderParameter(shader, _gl.COMPILE_STATUS) ) {

            console.error(_gl.getShaderInfoLog(shader));
            console.error("could not initialize shader");
            return null;

        }

        return shader;

    } 


    //Compile appropriate shaders (if necessary) from source code and attach to gl program.
    function buildProgram(fragmentShader, vertexShader, uniforms, parameters) {

        var p, pl, d, program, code;
        var chunks = [];

        chunks.push(fragmentShader);
        chunks.push(vertexShader);
        
        for (p in parameters) {
            chunks.push(p);
            chunks.push(parameters[p]);
        }
        
        code = chunks.join();

        //check if program has already been compiled

        for (p = 0, pl = _programs.length; p < pl; p++) {

            var programInfo = _programs[p];

            if (programInfo.code === code) {

                programInfo.usedTimes++;

                return programInfo.program;
            }
        }

        //Set up new program and compile shaders

        program = _gl.createProgram();
        
        //set up precision
        var precision = _precision;
        var prefix = "precision " + precision + " float;";
        
        var prefix_vertex = [
                             prefix
                            ].join("\n");
                            
        var prefix_fragment = [                               
                               parameters.wireframe ? "#define WIREFRAME 1" : "",
                               prefix
                              ].join("\n");
        
        var glFragmentShader = getShader("fragment", prefix_fragment + fragmentShader);
        var glVertexShader = getShader("vertex", prefix_vertex + vertexShader);

        _gl.attachShader(program, glVertexShader);
        _gl.attachShader(program, glFragmentShader);

        _gl.linkProgram(program);

        if (! _gl.getProgramParameter(program, _gl.LINK_STATUS) )
            console.error("Could not initialize shader");

        //gather and cache uniform variables and attributes

        program.uniforms = {};
        program.attributes = {};

        var identifiers, u, a, i;

        //uniform vars
        identifiers = 
            [ 'viewMatrix', 'modelViewMatrix', 'projectionMatrix', 'normalMatrix', 'modelMatrix', 'cameraPosition' ];

        //custom uniform vars
        for (u in uniforms) 
            identifiers.push(u);

        for (i = 0; i < identifiers.length; i++) {

            var uniformVar = identifiers[i];
            program.uniforms[uniformVar] = _gl.getUniformLocation(program, uniformVar);

        }

        //attributes
        identifiers = 
            [ 'position', 'normal', 'color', 'lineDistance' ];

        /*
        for (a in attributes)
                identifiers.push(a);
        */

        for (i = 0; i < identifiers.length; i++) {

            var attributeVar = identifiers[i];
            program.attributes[attributeVar] = _gl.getAttribLocation(program, attributeVar);
        }

        program.id = _programs_counter++;
        _programs.push( {program: program, code: code, usedTimes: 1} );
        _this.info.memory.programs = _programs.length;

        return program;
    }

    //TODO: need to set up shader attributes and uniforms as attributes on material object after attaching prgm
    //We need to attach appropriate uniform variables to material after shaders have been chosen
    this.initMaterial = function ( material, lights, fog, object ) {

        material.addEventListener('dispose', onMaterialDispose);

        var u, a, identifiers, i, parameters, maxLightCount, maxBones, maxShadows, shaderID;

        shaderID = material.shaderID;

        if (shaderID) {

            var shader = $3Dmol.ShaderLib[shaderID];
            material.vertexShader = shader.vertexShader;
            material.fragmentShader = shader.fragmentShader;
            material.uniforms = $3Dmol.ShaderUtils.clone(shader.uniforms);
            //TODO: set material uniforms to shader uniform variables

        }
        
        parameters = {
            wireframe: material.wireframe
        };

        material.program = buildProgram(material.fragmentShader, material.vertexShader, material.uniforms, parameters);

    };

    function setProgram( camera, lights, fog, material, object ) {

        if ( material.needsUpdate ) {

            if (material.program)
                deallocateMaterial(material);

                _this.initMaterial( material, lights, fog, object );
                material.needsUpdate = false;
        }

        var refreshMaterial = false;

        //p_uniforms: uniformVarName => uniformLocation
        //m_uniforms: uniformVarName => uniformJsVal
        var program = material.program,
            p_uniforms = program.uniforms,
            m_uniforms = material.uniforms;

        if (program != _currentProgram) {   
            _gl.useProgram(program);
            _currentProgram = program;

            refreshMaterial = true;
        }

        if (material.id != _currentMaterialId) {
            _currentMaterialId = material.id;
            refreshMaterial = true;
        }

        if (camera != _currentCamera) {    
            _currentCamera = camera;
            refreshMaterial = true;
        }

        //Send projection matrix to uniform variable in shader
        if (refreshMaterial) {

            //Load projection, model-view matrices for perspective
            _gl.uniformMatrix4fv(p_uniforms.projectionMatrix, false, camera.projectionMatrix.elements);
            _gl.uniformMatrix4fv(p_uniforms.modelViewMatrix, false, object._modelViewMatrix.elements);

            //Set up correct fog uniform vals
            m_uniforms.fogColor.value = fog.color;
            m_uniforms.fogNear.value = fog.near;
            m_uniforms.fogFar.value = fog.far;

            //Set up lights for lambert shader
            if (material.shaderID.lastIndexOf("lambert",0) === 0) {

                //load view and normal matrices for directional and object lighting
                _gl.uniformMatrix4fv(p_uniforms.viewMatrix, false, camera.matrixWorldInverse.elements);
                _gl.uniformMatrix3fv(p_uniforms.normalMatrix, false, object._normalMatrix.elements);
                //_gl.uniformMatrix4fv(p_uniforms.modelMatrix, false, object.matrixWorld.elements);

                if (_lightsNeedUpdate) {
                    setupLights(program, lights);
                    _lightsNeedUpdate = false;
                }

                //Set up correct light uniform var vals
                m_uniforms.ambientLightColor.value = _lights.ambient;
                m_uniforms.directionalLightColor.value = _lights.directional.colors;
                m_uniforms.directionalLightDirection.value = _lights.directional.positions;
                m_uniforms.ambient.value = material.ambient;
                m_uniforms.emissive.value = material.emissive;

            }
            else if( material.shaderID === "sphereimposter") {
                _gl.uniformMatrix4fv(p_uniforms.viewMatrix, false, camera.matrixWorldInverse.elements);
                _gl.uniformMatrix3fv(p_uniforms.normalMatrix, false, object._normalMatrix.elements);
            }
            	

            //opacity, diffuse, emissive, etc
            m_uniforms.opacity.value = material.opacity;
            m_uniforms.diffuse.value = material.color;

            //Load any other material specific uniform variables to gl shaders
            loadMaterialUniforms(p_uniforms, m_uniforms);

        }

        return program;

    }

    function loadMaterialUniforms(p_uniforms, m_uniforms) {
        var uniformVar, type, uniformVal, uniformLoc;

        for (uniformVar in m_uniforms) {
            if (! p_uniforms[uniformVar])
                continue;

            type = m_uniforms[uniformVar].type;
            uniformVal = m_uniforms[uniformVar].value;
            uniformLoc = p_uniforms[uniformVar];

            //single float
            if (type === 'f')
                _gl.uniform1f(uniformLoc, uniformVal);
            //array of floats
            else if (type === 'fv')
                _gl.uniform3fv(uniformLoc, uniformVal);
            //color - r,g,b floats
            else if (type === 'c')
                _gl.uniform3f(uniformLoc, uniformVal.r, uniformVal.g, uniformVal.b);

        }

    }

    this.renderBuffer = function ( camera, lights, fog, material, geometryGroup, object ) {

        if ( ! material.visible )
            return;

        var program, attributes, linewidth, primitives, a, attribute, i, il;

        //Sets up proper vertex and fragment shaders and attaches them to webGL program
        //Also sets appropriate uniform variables 
        program = setProgram(camera, lights, fog, material, object);

        attributes = program.attributes;

        var updateBuffers = false,
            wireframeBit = material.wireframe ? 1 : 0,
            geometryGroupHash = (geometryGroup.id * 0xffffff) + (program.id * 2) + wireframeBit;

        if (geometryGroupHash !== _currentGeometryGroupHash) {
            _currentGeometryGroupHash = geometryGroupHash;
            updateBuffers = true;
        }

        //rebind shader attributes to appropriate (and already initialized) gl buffers
        if (updateBuffers) {

            disableAttributes();

            // Vertices
            if (attributes.position >= 0) {            
                _gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
                enableAttribute( attributes.position );
                _gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );    
            }

            // Colors
            if (attributes.color >= 0) {
                _gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer);
                enableAttribute( attributes.color );
                _gl.vertexAttribPointer( attributes.color, 3, _gl.FLOAT, false, 0, 0 );
            }

            // Normals (lambert shader only)
            if (attributes.normal >=0) {
                _gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );
                enableAttribute( attributes.normal );
                _gl.vertexAttribPointer( attributes.normal, 3, _gl.FLOAT, false, 0, 0 );
            }

        }

        //Render
        var faceCount, lineCount;
        //lambert shaders - draw triangles
        //TODO: make sure geometryGroup's face count is setup correctly
        if (object instanceof $3Dmol.Mesh) {
            
            if (material.wireframe) {
                lineCount = geometryGroup.lineidx;
                setLineWidth(material.wireframeLinewidth);
                
                if (updateBuffers)
                    _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );
                
                _gl.drawElements( _gl.LINES, lineCount, _gl.UNSIGNED_SHORT, 0 );
            }
            
            else {
                faceCount = geometryGroup.faceidx;

                if (updateBuffers)
                    _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );
                
                _gl.drawElements( _gl.TRIANGLES, faceCount, _gl.UNSIGNED_SHORT, 0 );
                
            }


            _this.info.render.calls++;
            _this.info.render.vertices += faceCount;
            _this.info.render.faces += faceCount / 3;
        }

        //basic shaders - draw lines
        else if (object instanceof $3Dmol.Line) {
            lineCount = geometryGroup.vertices;

            setLineWidth(material.linewidth);
            _gl.drawArrays( _gl.LINES, 0, lineCount );

            _this.info.render.calls++;
        }

    };

    //rendering
    function renderObjects ( renderList, reverse, materialType, camera, lights, fog, useBlending, overrideMaterial)  {

        var webglObject, object, buffer, material, start, end, delta;

        //Forward or backward render

        if (reverse) {
            start = renderList.length - 1;
            end = -1;
            delta = -1;
        }

        else {
            start = 0;
            end = renderList.length;
            delta = 1;
        }

        for (var i = start; i !== end; i += delta) {

            webglObject = renderList[i];

            if (webglObject.render) {

                object = webglObject.object;
                buffer = webglObject.buffer;
                material = webglObject[materialType];

                if ( ! material )
                    continue;

                if (useBlending)
                    _this.setBlending(material.blending);

                _this.setDepthTest(material.depthTest);
                _this.setDepthWrite(material.depthWrite);
                setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);

                _this.setMaterialFaces(material);

                _this.renderBuffer(camera, lights, fog, material, buffer, object);
            }
        }

    }
    
    this.render = function ( scene, camera, forceClear ) {

        if ( camera instanceof $3Dmol.Camera === false )  {

            console.error( '$3Dmol.Renderer.render: camera is not an instance of $3Dmol.Camera.' );
            return;

        }

        var i, il,

        webglObject, object,
        renderList,

        lights = scene.__lights,
        fog = scene.fog;

        // reset caching for this frame

        _currentMaterialId = -1;
        _lightsNeedUpdate = true;

        // update scene graph

        if ( this.autoUpdateScene ) scene.updateMatrixWorld();

        // update camera matrices
        //Pretty sure camera's parent is always going to be undefined for our purposes...
        if ( camera.parent === undefined ) camera.updateMatrixWorld();

        camera.matrixWorldInverse.getInverse( camera.matrixWorld );

        _projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );

        // update WebGL objects

        if ( this.autoUpdateObjects ) this.initWebGLObjects( scene );


        _this.info.render.calls = 0;
        _this.info.render.vertices = 0;
        _this.info.render.faces = 0;
        _this.info.render.points = 0;

        _currentWidth = _viewportWidth;
        _currentHeight = _viewportHeight;

        if ( this.autoClear || forceClear ) {

            this.clear( this.autoClearColor, this.autoClearDepth, this.autoClearStencil );

        }

        // set matrices for regular objects (frustum culled)

        renderList = scene.__webglObjects;

        for ( i = 0, il = renderList.length; i < il; i ++ ) {

            webglObject = renderList[ i ];
            object = webglObject.object;

            webglObject.render = false;

            if ( object.visible ) {        
                setupMatrices( object, camera );
                unrollBufferMaterial( webglObject );
                webglObject.render = true;
            }
        }

        // set matrices for immediate objects

        var material = null;

        // opaque pass (front-to-back order)

        this.setBlending( $3Dmol.NoBlending );

        renderObjects( scene.__webglObjects, true, "opaque", camera, lights, fog, false, material );
        
        //prime depth buffer
        renderObjects( scene.__webglObjects, true, "blank", camera, lights, fog, true, material );

        // transparent pass (back-to-front order)

        renderObjects( scene.__webglObjects, false, "transparent", camera, lights, fog, true, material );

        // Render plugins (e.g. sprites), and reset state
        
        renderPlugins(this.renderPluginsPost, scene, camera);

        // Ensure depth buffer writing is enabled so it can be cleared on next render

        this.setDepthTest( true );
        this.setDepthWrite( true );

        //_gl.finish();

    };
    
    function renderPlugins(plugins, scene, camera) {
        
        //Reset state once regardless
        //This should also fix cartoon render bug (after transparent surface render)
        
        _currentGeometryGroupHash = -1;
        _currentProgram = null;
        _currentCamera = null;
        _oldBlending = -1;
        _oldDepthWrite = -1;
        _oldDepthTest = -1;
        _oldDoubleSided = -1;
        _currentMaterialId = -1;
        _oldFlipSided = -1;
        
        
        if (!plugins.length)
            return;
        
        for (var i = 0, il = plugins.length; i < il; i++) {
            
            _lightsNeedUpdate = true;
            
            plugins[i].render(scene, camera, _currentWidth, _currentHeight);
            
            //Reset state after plugin render
            _currentGeometryGroupHash = -1;
            _currentProgram = null;
            _currentCamera = null;
            _oldBlending = -1;
            _oldDepthWrite = -1;
            _oldDepthTest = -1;
            _oldDoubleSided = -1;
            _currentMaterialId = -1;
            _oldFlipSided = -1;       
                
        }  
        
    }

    this.initWebGLObjects = function ( scene ) {

        if ( !scene.__webglObjects ) {

            scene.__webglObjects = [];
            scene.__webglObjectsImmediate = [];
            scene.__webglSprites = [];
            scene.__webglFlares = [];

        }

        //Add objects; this sets up buffers for each geometryGroup
        if (scene.__objectsAdded.length) {
            
            while(scene.__objectsAdded.length){
                addObject(scene.__objectsAdded[0], scene);
                scene.__objectsAdded.splice(0, 1);
            }
            
            //Force buffer update during render
            //Hackish fix for initial cartoon-render-then-transparent-surface bug
            _currentGeometryGroupHash = -1;
            
        }

        while (scene.__objectsRemoved.length) {

            removeObject(scene.__objectsRemoved[ 0 ], scene);
            scene.__objectsRemoved.splice(0, 1);

        }

        // update must be called after objects adding / removal
        //This sends typed arrays to GL buffers for each geometryGroup
        for ( var o = 0, ol = scene.__webglObjects.length; o < ol; o ++ ) {

            updateObject(scene.__webglObjects[ o ].object);

        }

    };
    
    // Objects adding

    function addObject (object, scene) {

        var g, gl, geometry, material, geometryGroup;

        if ( !object.__webglInit ) {

            object.__webglInit = true;

            object._modelViewMatrix = new $3Dmol.Matrix4();
            object._normalMatrix = new $3Dmol.Matrix3();

            if (object.geometry !== undefined && object.geometry.__webglInit === undefined) {

                object.geometry.__webglInit = true;
                object.geometry.addEventListener('dispose', onGeometryDispose);

            }
            
            if (object instanceof $3Dmol.Mesh || object instanceof $3Dmol.Line) {
                geometry = object.geometry;
                material = object.material;           
    
                for (g = 0, gl = geometry.geometryGroups.length; g < gl; g++) {
    
                    geometryGroup = geometry.geometryGroups[ g ];
                    
                    geometryGroup.id = _geometryGroupCounter++;

                    // initialise VBO on the first access

                    if ( !geometryGroup.__webglVertexBuffer ) {
                            
                        if (object instanceof $3Dmol.Mesh) {
                            createMeshBuffers(geometryGroup);
                            geometry.elementsNeedUpdate = true;
                            geometry.normalsNeedUpdate = true;
                        }
                            
                        else if (object instanceof $3Dmol.Line)
                            createLineBuffers(geometryGroup);

                        geometry.verticesNeedUpdate = true;
                        geometry.colorsNeedUpdate = true;

                    }
                        
                }
                
            }
        
        }
        
        if ( ! object.__webglActive ) {
            
            if (object instanceof $3Dmol.Mesh || object instanceof $3Dmol.Line) {
                
                geometry = object.geometry;

                for ( g = 0, gl = geometry.geometryGroups.length; g < gl; g++ ) {
                    geometryGroup = geometry.geometryGroups[g];

                    addBuffer(scene.__webglObjects, geometryGroup, object);
                }
                
            }
            
            //Sprite
            else if (object instanceof $3Dmol.Sprite) 
                scene.__webglSprites.push(object);
         
                     
            object.__webglActive = true;
            
        }

    }

    function updateObject ( object ) {

        var geometry = object.geometry, material = object.material,
                geometryGroup, customAttributesDirty;
        
        if ( object instanceof $3Dmol.Mesh || object instanceof $3Dmol.Line ) {
            
            for (var g = 0, gl = geometry.geometryGroups.length; g < gl; g++) {
                
                geometryGroup = geometry.geometryGroups[ g ];

                if ( geometry.verticesNeedUpdate || geometry.elementsNeedUpdate || geometry.colorsNeedUpdate || geometry.normalsNeedUpdate) {
                    setBuffers( geometryGroup, _gl.STATIC_DRAW );
                }
            }
            
            geometry.verticesNeedUpdate = false;
            geometry.elementsNeedUpdate = false;
            geometry.normalsNeedUpdate = false;
            geometry.colorsNeedUpdate = false;

            geometry.buffersNeedUpdate = false;

        }

    }
    
    function removeObject( object, scene ) {

        if (object instanceof $3Dmol.Mesh || object instanceof $3Dmol.Line )
            removeInstances(scene.__webglObjects, object);

        else if (object instanceof $3Dmol.Sprite)
            removeInstancesDirect(scene.__webglSprites, object);
            
        object.__webglActive = false;

    }

    function removeInstances( objList, object ) {

        for (var o = objList.length - 1; o >= 0; --o) {

            if (objList[o].object === object) 
                objList.splice(o, 1);

        }
    }

    function removeInstancesDirect( objList, object ) {

        for (var o = objList.length - 1; o >= 0; --o) {

            if (objList[o] === object) 
                objList.splice(o, 1);

        }
    }

    function unrollBufferMaterial( globject ) {

        var object = globject.object;
        var material = object.material;

        if ( material.transparent) {                    
            globject.opaque = null;
            globject.transparent = material;
            var blankMaterial = material.clone();
            blankMaterial.opacity = 0;
            globject.blank = blankMaterial;
        }

        else {
            globject.opaque = material;
            globject.transparent = null;
        }

    }

    function setBuffers( geometryGroup, hint, line ) {

        var vertexArray = geometryGroup.vertexArray;
        var colorArray = geometryGroup.colorArray;
         
        //vertex buffers
        _gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
        _gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );        

        //color buffers
        _gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer );
        _gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );    
              
        
        //normal buffers
        if (geometryGroup.normalArray !== undefined && geometryGroup.__webglNormalBuffer !== undefined) {
            var normalArray = geometryGroup.normalArray;
            _gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );
            _gl.bufferData( _gl.ARRAY_BUFFER, normalArray, hint );       
             
        }
        
        //face (index) buffers
        if (geometryGroup.faceArray !== undefined && geometryGroup.__webglFaceBuffer !== undefined) {
            var faceArray = geometryGroup.faceArray;
            _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );
            _gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, faceArray, hint );  
                      
        }
        
        //line (index) buffers (for wireframe)
        if (geometryGroup.lineArray !== undefined && geometryGroup.__webglLineBuffer !== undefined) {
            var lineArray = geometryGroup.lineArray;            
            _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );
            _gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, lineArray, hint );
        }

    }
    
    //Creates appropriate gl buffers for geometry chunk
    //TODO: do we need line buffer for mesh objects?
    //Also, can we integrate this with createLineBuffers?
    function createMeshBuffers ( geometryGroup ) {

        geometryGroup.__webglVertexBuffer = _gl.createBuffer();
        geometryGroup.__webglNormalBuffer = _gl.createBuffer();
        geometryGroup.__webglColorBuffer = _gl.createBuffer();

        geometryGroup.__webglFaceBuffer = _gl.createBuffer();
        geometryGroup.__webglLineBuffer = _gl.createBuffer();

        _this.info.memory.geometries++;
    }
    
    function createLineBuffers ( geometry ) {
        
        geometry.__webglVertexBuffer = _gl.createBuffer();
        geometry.__webglColorBuffer = _gl.createBuffer();
        
        _this.info.memory.geometries++;
    }

    function addBuffer (objlist, buffer, object) {

        objlist.push(
            {
                buffer: buffer,
                object: object,
                opaque: null,
                transparent: null
            }
        );

    }

    function setupMatrices (object, camera) {

        object._modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, object.matrixWorld );

        object._normalMatrix.getInverse( object._modelViewMatrix );
        object._normalMatrix.transpose();

    }

    function isPowerOfTwo ( value ) {

        return ( value & ( value - 1 ) ) === 0;

    }
    
    // Fallback filters for non-power-of-2 textures

    function filterFallback ( f ) {

        return _gl.LINEAR;

    }

    function setTextureParameters ( textureType, texture, isImagePowerOfTwo ) {

        if ( isImagePowerOfTwo ) {

            _gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, paramToGL( texture.wrapS ) );
            _gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, paramToGL( texture.wrapT ) );

            _gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, paramToGL( texture.magFilter ) );
            _gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, paramToGL( texture.minFilter ) );

        } else {

            _gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );

            _gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, filterFallback( texture.magFilter ) );
            _gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, filterFallback( texture.minFilter ) );

        }

    }
    
    this.setTexture = function (texture, slot) {

        if (texture.needsUpdate) {

            if ( !texture.__webglInit ) {

                texture.__webglInit = true;

                texture.addEventListener('dispose', onTextureDispose);

                texture.__webglTexture = _gl.createTexture();

                _this.info.memory.textures++;

            }

            _gl.activeTexture(_gl.TEXTURE0 + slot);
            _gl.bindTexture(_gl.TEXTURE_2D, texture.__webglTexture);

            _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
            _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
            _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);

            var image = texture.image,
            isImagePowerOfTwo = isPowerOfTwo(image.width) && isPowerOfTwo(image.height),
            glFormat = paramToGL(texture.format),
            glType = paramToGL(texture.type);

            setTextureParameters(_gl.TEXTURE_2D, texture, isImagePowerOfTwo);

            var mipmap, mipmaps = texture.mipmaps;

            // regular Texture (image, video, canvas)

            // use manually created mipmaps if available
            // if there are no manual mipmaps
            // set 0 level mipmap and then use GL to generate other mipmap levels

            if ( mipmaps.length > 0 && isImagePowerOfTwo ) {

                for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {
                    mipmap = mipmaps[ i ];
                    _gl.texImage2D( _gl.TEXTURE_2D, i, glFormat, glFormat, glType, mipmap );
                }
                
                texture.generateMipmaps = false;
            } 
            
            else 
                _gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, glFormat, glType, texture.image );

            
            if ( texture.generateMipmaps && isImagePowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );

            texture.needsUpdate = false;

            if ( texture.onUpdate ) texture.onUpdate();

        } else {

            _gl.activeTexture( _gl.TEXTURE0 + slot );
            _gl.bindTexture( _gl.TEXTURE_2D, texture.__webglTexture );

        }

    };
    
    // Map constants to WebGL constants

    function paramToGL ( p ) {

        if ( p === $3Dmol.UnsignedByteType ) return _gl.UNSIGNED_BYTE;
        if ( p === $3Dmol.RGBAFormat ) return _gl.RGBA;

        return 0;

    }
    
    function setupLights ( program, lights ) {
        var l, ll, light, n,
        r = 0, g = 0, b = 0,
        color,
        position,
        intensity,
        distance,
        
        zlights = _lights,
        
        dirColors = zlights.directional.colors,
        dirPositions = zlights.directional.positions,
        
        dirCount = 0,
        dirLength = 0,
        dirOffset = 0;
        
        for ( l = 0, ll = lights.length; l < ll; l++) {
            
            light = lights[l];
            
            color = light.color;
            intensity = light.intensity;
            distance = light.distance;
            
            if (light instanceof $3Dmol.Light) {
                
                dirCount++;
                
                _direction.getPositionFromMatrix(light.matrixWorld);
                _vector3.getPositionFromMatrix(light.target.matrixWorld);
                _direction.sub(_vector3);
                _direction.normalize();
                
                if (_direction.x === 0 && _direction.y === 0 && _direction.z === 0)
                    continue;
                
                dirPositions[dirOffset] = _direction.x;
                dirPositions[dirOffset + 1] = _direction.y;
                dirPositions[dirOffset + 2] = _direction.z;

                dirColors[dirOffset] = color.r * intensity;
                dirColors[dirOffset + 1] = color.g * intensity;
                dirColors[dirOffset + 2] = color.b * intensity;
                
                dirOffset += 3;
                
                dirLength++;    
            }
        
        }

        zlights.ambient[0] = r;
        zlights.ambient[1] = g;
        zlights.ambient[2] = b;
        zlights.directional.length = dirLength;
    }

    function initGL () {

        try {

            if ( ! ( _gl = _canvas.getContext( 'experimental-webgl', { alpha: _alpha, premultipliedAlpha: _premultipliedAlpha, antialias: _antialias, stencil: _stencil, preserveDrawingBuffer: _preserveDrawingBuffer } ) ) ) {
                if ( ! ( _gl = _canvas.getContext( 'webgl', { alpha: _alpha, premultipliedAlpha: _premultipliedAlpha, antialias: _antialias, stencil: _stencil, preserveDrawingBuffer: _preserveDrawingBuffer } ) ) ) {
                throw 'Error creating WebGL context.';
                }
            }

        } catch ( error ) {

            console.error( error );
        }
        var ext = _gl.getExtension('EXT_frag_depth');
    }

    function setDefaultGLState () {

        _gl.clearColor( 0, 0, 0, 1 );
        _gl.clearDepth( 1 );
        _gl.clearStencil( 0 );

        _gl.enable( _gl.DEPTH_TEST );
        _gl.depthFunc( _gl.LEQUAL );

        _gl.frontFace( _gl.CCW );
        _gl.cullFace( _gl.BACK );
        _gl.enable( _gl.CULL_FACE );

        _gl.enable( _gl.BLEND );
        _gl.blendEquation( _gl.FUNC_ADD );
        _gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA );

        _gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );
        var ext = _gl.getExtension('EXT_frag_depth');


    }
    
    this.addPostPlugin(new $3Dmol.SpritePlugin());
        
};

/*
 * Scene class
 */
/** @constructor */
$3Dmol.Scene = function() {
    
    $3Dmol.Object3D.call(this);
    
    this.fog = null;
    
    //May not need...
    this.overrideMaterial = null;
    
    this.matrixAutoUpdate = false;
    
    this.__objects = [];
    this.__lights = [];
    
    this.__objectsAdded = [];
    this.__objectsRemoved = [];
    
};

$3Dmol.Scene.prototype = Object.create($3Dmol.Object3D.prototype);

$3Dmol.Scene.prototype.__addObject = function(object) {
    
    //Directional Lighting
    if (object instanceof $3Dmol.Light) {
        
        if (this.__lights.indexOf(object) === -1)
            this.__lights.push(object);
        
        //TODO: Do I need this??
        if (object.target && object.target.parent === undefined)
            this.add(object.target);
            
    }
    
    //Rotation group
    else {
        
        if (this.__objects.indexOf(object) === -1) {
            
            this.__objects.push(object);
            this.__objectsAdded.push(object);
            
            //Check if previously removed
            
            var idx = this.__objectsRemoved.indexOf(object);
            
            if (idx !== -1)
                this.__objectsRemoved.splice(i, 1);
                
        }
    }
    
    //Add object's children
    
    for (var i = 0; i < object.children.length; i++) 
        this.__addObject(object.children[i]);
    
};

$3Dmol.Scene.prototype.__removeObject = function(object) {
    
    var idx;
    if (object instanceof $3Dmol.Light) {
        
        idx = this.__lights.indexOf(object);
        
        if (idx !== -1)
            this.__lights.splice(idx, 1);
            
    }
    
    //Object3D
    else {
        
        idx = this.__objects.indexOf(object);
        
        if (idx !== -1) {
            
            this.__objects.splice(idx, 1);
            this.__objectsRemoved.push(object);
            
            //Check if previously added
            
            var ai = this.__objectsAdded.indexOf(object);
            
            if (ai !== -1) 
                this.__objectsAdded.splice(idx, 1);
                
        }
    
    }
    
    //Remove object's children
    for (var i = 0; i < object.children.length; i++)
        this.__removeObject(object.children[i]);
    
};


/*
 * Fog Class
 */

/** @constructor */
$3Dmol.Fog = function ( hex, near, far ) {

    this.name = '';

    this.color = new $3Dmol.Color( hex );

    this.near = ( near !== undefined ) ? near : 1;
    this.far = ( far !== undefined ) ? far : 1000;

};

$3Dmol.Fog.prototype.clone = function () {

    return new $3Dmol.Fog( this.color.getHex(), this.near, this.far );

};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$3Dmol.ShaderUtils = {
    
    clone: function ( uniforms_src ) {
        
        var u, p, parameter, parameter_src, uniforms_clone = {};
        
        for (u in uniforms_src) {
            uniforms_clone[u] = {};
            uniforms_clone[u].type = uniforms_src[u].type;
            
            var srcValue = uniforms_src[u].value;
            
            if (srcValue instanceof $3Dmol.Color)
                uniforms_clone[u].value = srcValue.clone();
            else if (typeof srcValue === "number")
                uniforms_clone[u].value = srcValue;
            else if (srcValue instanceof Array) 
                uniforms_clone[u].value = [];
            else
                console.error("Error copying shader uniforms from ShaderLib: unknown type for uniform");
            
        }
        
        return uniforms_clone;
    }
};

$3Dmol.ShaderLib = { 
    'basic' : {
        fragmentShader : [
"uniform mat4 viewMatrix;",
"uniform vec3 cameraPosition;",
"uniform vec3 diffuse;",
"uniform float opacity;",

"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",

"varying vec3 vColor;",

"void main() {",
    
"    gl_FragColor = vec4( diffuse, opacity );",
"    gl_FragColor = gl_FragColor * vec4( vColor, opacity );",
    
"    float depth = gl_FragCoord.z / gl_FragCoord.w;",    
"    float fogFactor = smoothstep( fogNear, fogFar, depth );",
    
"    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

"}"
                                                     
].join("\n"),
        
        vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 cameraPosition;",

"attribute vec3 position;",
"attribute vec3 color;",

"varying vec3 vColor;",

"void main() {",

"    vColor = color;",
"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
"    gl_Position = projectionMatrix * mvPosition;",

"}"
        
].join("\n"),
    
        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            diffuse: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000}
        }

    },
    
 'sphereimposter' : {
        fragmentShader : [
"uniform mat4 viewMatrix;",
"uniform vec3 cameraPosition;",
"uniform vec3 diffuse;",
"uniform float opacity;",

"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",

"varying vec3 vColor;",
"varying vec2 mapping;",

"void main() {",
"	 float lensqr = dot(mapping,mapping);",
"	 if(lensqr > 2.0)",
"	    discard;",
"	 float w = sqrt(2.0 - lensqr);",
"	 float z = sqrt(sqrt(2.0)-lensqr);",
"	 gl_FragDepthEXT = -.1*z;",
"    gl_FragColor = vec4( w*vColor, 1 );",
    


"}"
                                                     
].join("\n"),
        
        vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 cameraPosition;",

"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",

"varying vec2 mapping;",
"varying vec3 vColor;",

"void main() {",

"    vColor = color;",
"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
"    vec4 projPosition = projectionMatrix * mvPosition;",
"	 vec4 adjust = projectionMatrix*vec4(normal, 1.0);  adjust.y *= -1.0; adjust.z = 0.0; adjust.w = 0.0;",
"	 mapping = normal.xy;",
"	 gl_Position = projPosition+adjust;",

"}"
        
].join("\n"),
    
        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            diffuse: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000}
        }

    },
    
    
    'lambert' : { 
        fragmentShader : [

"uniform mat4 viewMatrix;",
"uniform vec3 cameraPosition;",
"uniform float opacity;",

"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",

"varying vec3 vLightFront;",
"varying vec3 vColor;",

"void main() {",
    
"    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
    
"    #ifndef WIREFRAME",
"    gl_FragColor.xyz *= vLightFront;",
"    #endif",
    
"    gl_FragColor = gl_FragColor * vec4( vColor, opacity );",
"    float depth = gl_FragCoord.z / gl_FragCoord.w;",
    
"    float fogFactor = smoothstep( fogNear, fogFar, depth );",
    
"    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

"}"


].join("\n"),
       
       vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 cameraPosition;",
"uniform vec3 ambient;",
"uniform vec3 diffuse;",
"uniform vec3 emissive;",
"uniform vec3 ambientLightColor;",
"uniform vec3 directionalLightColor[ 1 ];",
"uniform vec3 directionalLightDirection[ 1 ];",

"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",

"varying vec3 vColor;",
"varying vec3 vLightFront;",

"void main() {",
    
"    vColor = color;",
    
"    vec3 objectNormal = normal;",  
"    vec3 transformedNormal = normalMatrix * objectNormal;",    
"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
    
"    vLightFront = vec3( 0.0 );",
    
"    transformedNormal = normalize( transformedNormal );",
    
"    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );",
"    vec3 dirVector = normalize( lDirection.xyz );",
"    float dotProduct = dot( transformedNormal, dirVector );",
"    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",
    
"    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;",
"    vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;",
    
"    gl_Position = projectionMatrix * mvPosition;",
"}"
           
].join("\n"),

        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            diffuse: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000},           
            ambient: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            emissive: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            ambientLightColor: { type: 'fv', value: [] },
            directionalLightColor: { type: 'fv', value: [] },
            directionalLightDirection: { type: 'fv', value: [] }
        }

    },
    
    //for double sided lighting
    'lambertdouble' : { 
        fragmentShader : [

"uniform mat4 viewMatrix;",
"uniform vec3 cameraPosition;",
"uniform float opacity;",

"uniform vec3 fogColor;",
"uniform float fogNear;",
"uniform float fogFar;",

"varying vec3 vLightFront;",
"varying vec3 vLightBack;",

"varying vec3 vColor;",

"void main() {",
    
"    gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
    
"    #ifndef WIREFRAME",
"	 if ( gl_FrontFacing )",
"		gl_FragColor.xyz *= vLightFront;",
"	 else",
"		gl_FragColor.xyz *= vLightBack;",
"    #endif",
    
"    gl_FragColor = gl_FragColor * vec4( vColor, opacity );",
"    float depth = gl_FragCoord.z / gl_FragCoord.w;",
    
"    float fogFactor = smoothstep( fogNear, fogFar, depth );",
    
"    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

"}"


].join("\n"),
       
       vertexShader : [

"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform mat4 viewMatrix;",
"uniform mat3 normalMatrix;",
"uniform vec3 cameraPosition;",
"uniform vec3 ambient;",
"uniform vec3 diffuse;",
"uniform vec3 emissive;",
"uniform vec3 ambientLightColor;",
"uniform vec3 directionalLightColor[ 1 ];",
"uniform vec3 directionalLightDirection[ 1 ];",

"attribute vec3 position;",
"attribute vec3 normal;",
"attribute vec3 color;",

"varying vec3 vColor;",
"varying vec3 vLightFront;",
"varying vec3 vLightBack;",

"void main() {",
    
"    vColor = color;",
    
"    vec3 objectNormal = normal;",  
"    vec3 transformedNormal = normalMatrix * objectNormal;",    
"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
    
"    vLightFront = vec3( 0.0 );",
"    vLightBack = vec3( 0.0 );",
    
"    transformedNormal = normalize( transformedNormal );",
    
"    vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );",
"    vec3 dirVector = normalize( lDirection.xyz );",
"    float dotProduct = dot( transformedNormal, dirVector );",
"    vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",
"	 vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

"    vLightFront += directionalLightColor[ 0 ] * directionalLightWeighting;",
"	 vLightBack += directionalLightColor[ 0 ] * directionalLightWeightingBack;",

"    vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;",
"	 vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;",

"    gl_Position = projectionMatrix * mvPosition;",
"}"
           
].join("\n"),

        uniforms : {
            opacity: { type: 'f', value: 1.0 },
            diffuse: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogColor: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            fogNear: { type: 'f', value: 1.0 },
            fogFar: { type: 'f', value: 2000},           
            ambient: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            emissive: { type: 'c', value: new $3Dmol.Color(1.0, 1.0, 1.0) },
            ambientLightColor: { type: 'fv', value: [] },
            directionalLightColor: { type: 'fv', value: [] },
            directionalLightDirection: { type: 'fv', value: [] }
        }

    },
    
    
    'sprite': {
        
        fragmentShader: [
                                                         
"uniform vec3 color;",
"uniform sampler2D map;",
"uniform float opacity;",

"uniform int fogType;",
"uniform vec3 fogColor;",
"uniform float fogDensity;",
"uniform float fogNear;",
"uniform float fogFar;",
"uniform float alphaTest;",

"varying vec2 vUV;",

"void main() {",
    
"    vec4 texture = texture2D(map, vUV);",
    
"    if (texture.a < alphaTest) discard;",
    
"    gl_FragColor = vec4(color * texture.xyz, texture.a * opacity);",
    
"    if (fogType > 0) {",
        
"        float depth = gl_FragCoord.z / gl_FragCoord.w;",
"        float fogFactor = 0.0;",
        
"        if (fogType == 1) {",
"            fogFactor = smoothstep(fogNear, fogFar, depth);",
"        }",
        
"        else {",
"            const float LOG2 = 1.442695;",
"            float fogFactor = exp2(- fogDensity * fogDensity * depth * depth * LOG2);",
"            fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);",
"        }",
        
"        gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);",
        
"    }",
"}"                                              
            
].join("\n"),
        
        vertexShader: [

"uniform int useScreenCoordinates;",
"uniform vec3 screenPosition;",
"uniform mat4 modelViewMatrix;",
"uniform mat4 projectionMatrix;",
"uniform float rotation;",
"uniform vec2 scale;",
"uniform vec2 alignment;",
"uniform vec2 uvOffset;",
"uniform vec2 uvScale;",

"attribute vec2 position;",
"attribute vec2 uv;",

"varying vec2 vUV;",

"void main() {",
    
"    vUV = uvOffset + uv * uvScale;",
    
"    vec2 alignedPosition = position + alignment;",
    
"    vec2 rotatedPosition;",
"    rotatedPosition.x = ( cos(rotation) * alignedPosition.x - sin(rotation) * alignedPosition.y ) * scale.x;",
"    rotatedPosition.y = ( sin(rotation) * alignedPosition.x + cos(rotation) * alignedPosition.y ) * scale.y;",
    
"    vec4 finalPosition;",
    
"    if(useScreenCoordinates != 0) {",
"        finalPosition = vec4(screenPosition.xy + rotatedPosition, screenPosition.z, 1.0);",
"    }",
    
"    else {",
"        finalPosition = projectionMatrix * modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0); finalPosition /= finalPosition.w;",
"        finalPosition.xy += rotatedPosition; ",
"    }",
    
"    gl_Position = finalPosition;",
    
"}"
       
].join("\n"),

        uniforms : {
            
        }
        
    }
    
};var $3Dmol = $3Dmol || {};

//properties for mapping
$3Dmol.partialCharges = [
    { resn: "ALA", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ALA", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ALA", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ALA", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ALA", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "ARG", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ARG", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ARG", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ARG", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "ARG", atom: "CD", props: {'partialCharge': 0.10}},
	{ resn: "ARG", atom: "NE", props: {'partialCharge': -0.10}},
	{ resn: "ARG", atom: "CZ", props: {'partialCharge': 0.50}},
	{ resn: "ARG", atom: "NH1", props: {'partialCharge': 0.25}},
	{ resn: "ARG", atom: "NH2", props: {'partialCharge': 0.25}},
	{ resn: "ARG", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ARG", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "ASN", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ASN", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ASN", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ASN", atom: "CG", props: {'partialCharge': 0.55}},
	{ resn: "ASN", atom: "OD1", props: {'partialCharge': -0.55}},
	{ resn: "ASN", atom: "ND2", props: {'partialCharge': 0.00}},
	{ resn: "ASN", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ASN", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "ASP", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ASP", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ASP", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ASP", atom: "CG", props: {'partialCharge': 0.14}},
	{ resn: "ASP", atom: "OD1", props: {'partialCharge': -0.57}},
	{ resn: "ASP", atom: "OD2", props: {'partialCharge': -0.57}},
	{ resn: "ASP", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ASP", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "CYS", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "CYS", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "CYS", atom: "CB", props: {'partialCharge': 0.19}},
	{ resn: "CYS", atom: "SG", props: {'partialCharge': -0.19}},
	{ resn: "CYS", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "CYS", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "GLN", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "GLN", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "GLN", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "GLN", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "GLN", atom: "CD", props: {'partialCharge': 0.55}},
	{ resn: "GLN", atom: "OE1", props: {'partialCharge': -0.55}},
	{ resn: "GLN", atom: "NE2", props: {'partialCharge': 0.00}},
	{ resn: "GLN", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "GLN", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "GLU", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "GLU", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "GLU", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "GLU", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "GLU", atom: "CD", props: {'partialCharge': 0.14}},
	{ resn: "GLU", atom: "OE1", props: {'partialCharge': -0.57}},
	{ resn: "GLU", atom: "OE2", props: {'partialCharge': -0.57}},
	{ resn: "GLU", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "GLU", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "GLY", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "GLY", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "GLY", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "GLY", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "HIS", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "HIS", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "HIS", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "HIS", atom: "CG", props: {'partialCharge': 0.10}},
	{ resn: "HIS", atom: "ND1", props: {'partialCharge': -0.10}},
	{ resn: "HIS", atom: "CD2", props: {'partialCharge': 0.10}},
	{ resn: "HIS", atom: "NE2", props: {'partialCharge': -0.40}},
	{ resn: "HIS", atom: "CE1", props: {'partialCharge': 0.30}},
	{ resn: "HIS", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "HIS", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "ILE", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ILE", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ILE", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ILE", atom: "CG2", props: {'partialCharge': 0.00}},
	{ resn: "ILE", atom: "CG1", props: {'partialCharge': 0.00}},
	{ resn: "ILE", atom: "CD", props: {'partialCharge': 0.00}},
	{ resn: "ILE", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ILE", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "LEU", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "LEU", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "LEU", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "LEU", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "LEU", atom: "CD1", props: {'partialCharge': 0.00}},
	{ resn: "LEU", atom: "CD2", props: {'partialCharge': 0.00}},
	{ resn: "LEU", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "LEU", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "LYS", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "LYS", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "LYS", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "LYS", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "LYS", atom: "CD", props: {'partialCharge': 0.00}},
	{ resn: "LYS", atom: "CE", props: {'partialCharge': 0.25}},
	{ resn: "LYS", atom: "NZ", props: {'partialCharge': 0.75}},
	{ resn: "LYS", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "LYS", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "MET", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "MET", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "MET", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "MET", atom: "CG", props: {'partialCharge': 0.06}},
	{ resn: "MET", atom: "SD", props: {'partialCharge': -0.12}},
	{ resn: "MET", atom: "CE", props: {'partialCharge': 0.06}},
	{ resn: "MET", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "MET", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "PHE", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "PHE", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "PHE", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CD1", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CD2", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CE1", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CE2", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CZ", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "PHE", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "PRO", atom: "N", props: {'partialCharge': -0.25}},
	{ resn: "PRO", atom: "CD", props: {'partialCharge': 0.10}},
	{ resn: "PRO", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "PRO", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "PRO", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "PRO", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "PRO", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "SER", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "SER", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "SER", atom: "CB", props: {'partialCharge': 0.25}},
	{ resn: "SER", atom: "OG", props: {'partialCharge': -0.25}},
	{ resn: "SER", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "SER", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "THR", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "THR", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "THR", atom: "CB", props: {'partialCharge': 0.25}},
	{ resn: "THR", atom: "OG1", props: {'partialCharge': -0.25}},
	{ resn: "THR", atom: "CG2", props: {'partialCharge': 0.00}},
	{ resn: "THR", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "THR", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "TRP", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "TRP", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "TRP", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "TRP", atom: "CG", props: {'partialCharge': -0.03}},
	{ resn: "TRP", atom: "CD2", props: {'partialCharge': 0.10}},
	{ resn: "TRP", atom: "CE2", props: {'partialCharge': -0.04}},
	{ resn: "TRP", atom: "CE3", props: {'partialCharge': -0.03}},
	{ resn: "TRP", atom: "CD1", props: {'partialCharge': 0.06}},
	{ resn: "TRP", atom: "NE1", props: {'partialCharge': -0.06}},
	{ resn: "TRP", atom: "CZ2", props: {'partialCharge': 0.00}},
	{ resn: "TRP", atom: "CZ3", props: {'partialCharge': 0.00}},
	{ resn: "TRP", atom: "CH2", props: {'partialCharge': 0.00}},
	{ resn: "TRP", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "TRP", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "TYR", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "TYR", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "TYR", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CD1", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CE1", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CD2", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CE2", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CZ", props: {'partialCharge': 0.25}},
	{ resn: "TYR", atom: "OH", props: {'partialCharge': -0.25}},
	{ resn: "TYR", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "TYR", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "VAL", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "VAL", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "VAL", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "VAL", atom: "CG1", props: {'partialCharge': 0.00}},
	{ resn: "VAL", atom: "CG2", props: {'partialCharge': 0.00}},
	{ resn: "VAL", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "VAL", atom: "O", props: {'partialCharge': -0.55}}
]; 
	
$3Dmol['partialCharges'] = $3Dmol.partialCharges;

$3Dmol = $3Dmol || {};
//Encapsulate marching cube algorithm for isosurface generation
// (currently used by protein surface rendering and generic volumetric data reading)
$3Dmol.MarchingCube = (function() {
    
    //Marching cube algorithm - assume data has been pre-treated so isovalue is 0 
    // (i.e. select points greater than 0)
    //origin -  vector of origin of volumetric data (default is (0,0,0))
    // nX, nY, nZ - specifies number of voxels in each dimension
    // scale - cube diagonal unit vector scale (3Dmol vector) (specifying distance between data points); diagonal of cube
    // - default is 1 - assumes unit cube (1,1,1) diag)
    // fulltable - if true, use full marching cubes and tritables - else use trimmed table (e.g. surf render)
    // voxel - if true, draws with a blocky voxel style (default false)
    // verts, faces - vertex and face arrays to fill up
    
    //to match with protein surface...
    var ISDONE = 2;
    var my = {};
    
    my.march = function(data, verts, faces, spec) {

        var fulltable = !!(spec.fulltable);
        var origin = (spec.hasOwnProperty('origin') && spec.origin.hasOwnProperty('x')) ? spec.origin : {x:0, y:0, z:0};
        var voxel = !!(spec.voxel);
        
        var nX = spec.nX || 0;
        var nY = spec.nY || 0;
        var nZ = spec.nZ || 0;
        
        var scale = spec.scale || 1.0;
        
        var unitCube = new $3Dmol.Vector3(1,1,1).multiplyScalar(scale);
        
        //keep track of calculated vertices to avoid repeats
        var vertnums = new Int32Array(nX*nY*nZ);
        
        var i, il;
        
        for (i = 0, il = vertnums.length; i < il; ++i)
            vertnums[i] = -1;

        // create (or retrieve) a vertex at the appropriate point for
        // the edge (p1,p2)
        
        var getVertex = function(i, j, k, code, p1, p2) {
            var pt = new $3Dmol.Vector3();
            pt.copy(origin);
            var val1 = !!(code & (1 << p1));
            var val2 = !!(code & (1 << p2));
             
            // p1 if they are the same or if !val1
            var p = p1;
            if (!val1 && val2)
                p = p2;
            
            // adjust i,j,k by p
            if (p & 1)
                k++;
            if (p & 2)
                j++;
            if (p & 4)
                i++;
    
            pt.x += unitCube.x*i;
            pt.y += unitCube.y*j;
            pt.z += unitCube.z*k;
    
            var index = ((nY * i) + j) * nZ + k;
            
            //Have to add option to do voxels
            if (!voxel) {
            
                if (vertnums[index] < 0) // not created yet
                {
                    vertnums[index] = verts.length;
                    verts.push( pt );
                }
                return vertnums[index];
            
            }
            
            else {
                verts.push(pt);
                return verts.length - 1;
            }
            
        };
            
        var intersects = new Int32Array(12);
        
        var etable = (fulltable) ? edgeTable2 : edgeTable;
        var tritable = (fulltable) ? triTable2 : triTable;
                
        //Run marching cubes algorithm
        for (i = 0; i < nX-1; ++i) {
            
            for (var j = 0; j < nY-1; ++j){
                
                for (var k = 0; k < nZ-1; ++k){
                    
                    var code = 0;
                    
                    for (var p = 0; p < 8; ++p) {
                        var index = ((nY * (i + ((p & 4) >> 2))) + j + ((p & 2) >> 1)) *
                                        nZ + k + (p & 1);

                        //TODO: Need to fix vpBits in protein surface for this to work
                        var val = !!(data[index] & ISDONE);
                        //var val = !!(data[index] > 0);   
                        
                        code |= val << p;                        
                    }
                    
                    if (code === 0 || code === 255)
                        continue;
                    
                    var ecode = etable[code];
                    
                    if (ecode === 0)
                        continue;
                        
                    var ttable = tritable[code];                        
                    
                    if (ecode & 1)
                        intersects[0] = getVertex(i, j, k, code, 0, 1);
                    if (ecode & 2)
                        intersects[1] = getVertex(i, j, k, code, 1, 3);
                    if (ecode & 4)
                        intersects[2] = getVertex(i, j, k, code, 3, 2);
                    if (ecode & 8)
                        intersects[3] = getVertex(i, j, k, code, 2, 0);
                    if (ecode & 16)
                        intersects[4] = getVertex(i, j, k, code, 4, 5);
                    if (ecode & 32)
                        intersects[5] = getVertex(i, j, k, code, 5, 7);
                    if (ecode & 64)
                        intersects[6] = getVertex(i, j, k, code, 7, 6);
                    if (ecode & 128)
                        intersects[7] = getVertex(i, j, k, code, 6, 4);
                    if (ecode & 256)
                        intersects[8] = getVertex(i, j, k, code, 0, 4);
                    if (ecode & 512)
                        intersects[9] = getVertex(i, j, k, code, 1, 5);
                    if (ecode & 1024)
                        intersects[10] = getVertex(i, j, k, code, 3, 7);
                    if (ecode & 2048)
                        intersects[11] = getVertex(i, j, k, code, 2, 6);       
                        
                    for (var t = 0; t < ttable.length; t += 3) {
                        
                        var a = intersects[ttable[t]],
                            b = intersects[ttable[t+1]],
                            c = intersects[ttable[t+2]];         
                                           
                        if (voxel && t >= 3) {
                            verts.push(verts[a]); a = verts.length - 1;
                            verts.push(verts[b]); b = verts.length - 1;
                            verts.push(verts[c]); c = verts.length - 1;
                        }

                        
                        faces.push(a); faces.push(b); faces.push(c);                               
                    }              
                    
                }
                
            }
            
        }
             
        
    };

    my.laplacianSmooth = function(numiter, verts, faces) {
            var tps = new Array(verts.length);
            var i, il, j, jl, k, kl;
            for (i = 0, il = verts.length; i < il; i++)
                    tps[i] = {
                        x : 0,
                        y : 0,
                        z : 0
                    };
            var vertdeg = new Array(20);
            var flagvert;
            for (i = 0; i < 20; i++)
                    vertdeg[i] = new Array(verts.length);
            for (i = 0, il = verts.length; i < il; i++)
                    vertdeg[0][i] = 0;
            for (i = 0, il = faces.length / 3; i < il; i++) {
                var aoffset = i*3, boffset = i*3 + 1, coffset = i*3 + 2;
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[aoffset]]; j < jl; j++) {
                    if (faces[boffset] == vertdeg[j + 1][faces[aoffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[aoffset]]++;
                    vertdeg[vertdeg[0][faces[aoffset]]][faces[aoffset]] = faces[boffset];
                }
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[aoffset]]; j < jl; j++) {
                    if (faces[coffset] == vertdeg[j + 1][faces[aoffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[aoffset]]++;
                    vertdeg[vertdeg[0][faces[aoffset]]][faces[aoffset]] = faces[coffset];
                }
                // b
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[boffset]]; j < jl; j++) {
                    if (faces[aoffset] == vertdeg[j + 1][faces[boffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[boffset]]++;
                    vertdeg[vertdeg[0][faces[boffset]]][faces[boffset]] = faces[aoffset];
                }
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[boffset]]; j < jl; j++) {
                    if (faces[coffset] == vertdeg[j + 1][faces[boffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[boffset]]++;
                    vertdeg[vertdeg[0][faces[boffset]]][faces[boffset]] = faces[coffset];
                }
                // c
                flagvert = true;
                for (j = 0; j < vertdeg[0][faces[coffset]]; j++) {
                    if (faces[aoffset] == vertdeg[j + 1][faces[coffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[coffset]]++;
                    vertdeg[vertdeg[0][faces[coffset]]][faces[coffset]] = faces[aoffset];
                }
                flagvert = true;
                for (j = 0, jl = vertdeg[0][faces[coffset]]; j < jl; j++) {
                    if (faces[boffset] == vertdeg[j + 1][faces[coffset]]) {
                        flagvert = false;
                        break;
                    }
                }
                if (flagvert) {
                    vertdeg[0][faces[coffset]]++;
                    vertdeg[vertdeg[0][faces[coffset]]][faces[coffset]] = faces[boffset];
                }
            }

            var wt = 1.00;
            var wt2 = 0.50;
            var ssign;
            var scaleFactor = 1;
            var outwt = 0.75 / (scaleFactor + 3.5); // area-preserving
            for (k = 0; k < numiter; k++) {
                    for (i = 0, il = verts.length; i < il; i++) {
                            if (vertdeg[0][i] < 3) {
                                    tps[i].x = verts[i].x;
                                    tps[i].y = verts[i].y;
                                    tps[i].z = verts[i].z;
                            } else if (vertdeg[0][i] == 3 || vertdeg[0][i] == 4) {
                                    tps[i].x = 0;
                                    tps[i].y = 0;
                                    tps[i].z = 0;
                                    for (j = 0, jl = vertdeg[0][i]; j < jl; j++) {
                                            tps[i].x += verts[vertdeg[j + 1][i]].x;
                                            tps[i].y += verts[vertdeg[j + 1][i]].y;
                                            tps[i].z += verts[vertdeg[j + 1][i]].z;
                                    }
                                    tps[i].x += wt2 * verts[i].x;
                                    tps[i].y += wt2 * verts[i].y;
                                    tps[i].z += wt2 * verts[i].z;
                                    tps[i].x /= wt2 + vertdeg[0][i];
                                    tps[i].y /= wt2 + vertdeg[0][i];
                                    tps[i].z /= wt2 + vertdeg[0][i];
                            } else {
                                    tps[i].x = 0;
                                    tps[i].y = 0;
                                    tps[i].z = 0;
                                    for (j = 0, jl = vertdeg[0][i]; j < jl; j++) {
                                            tps[i].x += verts[vertdeg[j + 1][i]].x;
                                            tps[i].y += verts[vertdeg[j + 1][i]].y;
                                            tps[i].z += verts[vertdeg[j + 1][i]].z;
                                    }
                                    tps[i].x += wt * verts[i].x;
                                    tps[i].y += wt * verts[i].y;
                                    tps[i].z += wt * verts[i].z;
                                    tps[i].x /= wt + vertdeg[0][i];
                                    tps[i].y /= wt + vertdeg[0][i];
                                    tps[i].z /= wt + vertdeg[0][i];
                            }
                    }
                    for (i = 0, il = verts.length; i < il; i++) {
                            verts[i].x = tps[i].x;
                            verts[i].y = tps[i].y;
                            verts[i].z = tps[i].z;
                    }
                    /*
                     * computenorm(); for (var i = 0; i < vertnumber; i++) { if
                     * (verts[i].inout) ssign = 1; else ssign = -1; verts[i].x += ssign *
                     * outwt * verts[i].pn.x; verts[i].y += ssign * outwt *
                     * verts[i].pn.y; verts[i].z += ssign * outwt * verts[i].pn.z; }
                     */
            }
    };


    /*
     * These tables are based off those by Paul Bourke and Geoffrey Heller:
     * http://paulbourke.net/geometry/polygonise/
     * http://paulbourke.net/geometry/polygonise/table2.txt
     * 
     * However, they have been substantially modified to reflect a more 
     * sensible corner numbering scheme and the discrete nature of our voxel data
     * (resulting in fewer faces).
     */
    my.edgeTable = [ 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
            0xb00, 0x0, 0x0, 0x0, 0x700, 0x0, 0xd00, 0xe00, 0xf00, 0x0, 0x0, 0x0,
            0x8a, 0x0, 0x15, 0x0, 0x86, 0x0, 0x0, 0x0, 0x28c, 0x0, 0x813, 0xf19,
            0xe10, 0x0, 0x0, 0x0, 0x2a, 0x0, 0x0, 0x0, 0x126, 0x0, 0x0, 0x15, 0x1c,
            0x0, 0xf23, 0x419, 0xd20, 0x0, 0xa8, 0xa2, 0xaa, 0x0, 0x285, 0x9ab,
            0x8a2, 0x0, 0x2af, 0x125, 0xac, 0xfaa, 0xea3, 0xda9, 0xca0, 0x0, 0x0,
            0x0, 0x0, 0x0, 0x45, 0x0, 0x384, 0x0, 0x0, 0x0, 0x700, 0x8a, 0x83,
            0x648, 0x780, 0x0, 0x51, 0x0, 0x81a, 0x54, 0x55, 0x54, 0x56, 0x0, 0x51,
            0x0, 0xe5c, 0x14a, 0x451, 0x759, 0x650, 0x0, 0x0, 0x0, 0x2a, 0x0, 0x45,
            0x0, 0x1f6, 0x0, 0x0, 0x15, 0xdfc, 0x8a, 0x7f3, 0x4f9, 0x5f0, 0xb00,
            0x68, 0x921, 0x6a, 0x348, 0x245, 0x16f, 0x66, 0xb00, 0xe6f, 0xd65,
            0xc6c, 0x76a, 0x663, 0x569, 0x460, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
            0xf46, 0x0, 0x0, 0x45, 0x24c, 0x2a, 0x823, 0x29, 0xb40, 0x0, 0x0, 0x0,
            0x6ba, 0x0, 0x8f5, 0xfff, 0xef6, 0x0, 0xff, 0x2f5, 0x2fc, 0x9ea, 0x8f3,
            0xbf9, 0xaf0, 0x0, 0x0, 0x51, 0x152, 0x0, 0xf55, 0x45f, 0xd56, 0x54,
            0x357, 0x55, 0x154, 0x852, 0xb53, 0x59, 0x950, 0x700, 0x2c8, 0xc2,
            0x48a, 0xfc4, 0xec5, 0xdcf, 0xcc6, 0x2c4, 0x2cf, 0xc5, 0xcc, 0xbca,
            0xac3, 0x9c9, 0x8c0, 0x0, 0x0, 0x0, 0x0, 0xa8, 0x1a4, 0xa8, 0x7a6,
            0xa2, 0xa2, 0x2a4, 0xbac, 0xaa, 0xa3, 0x2a8, 0x3a0, 0xd00, 0xc18,
            0xd00, 0xe3a, 0x34, 0x35, 0x73f, 0x636, 0x924, 0x83f, 0xb35, 0xa3c,
            0x12a, 0x33, 0x339, 0x230, 0xe00, 0xe00, 0xc12, 0xd9a, 0x684, 0x795,
            0x49f, 0x596, 0x92, 0xb9f, 0x815, 0x99c, 0x9a, 0x393, 0x99, 0x190,
            0xf00, 0xe08, 0xd01, 0xc0a, 0x704, 0x605, 0x50f, 0x406, 0xb02, 0xa0f,
            0x905, 0x80c, 0x30a, 0x203, 0x109, 0x0 ];
    
    var edgeTable = new Uint32Array(my.edgeTable);
    
    var triTable = my.triTable = [ [], [], [], [], [], [], [], [ 11, 9, 8 ], [], [], [],
            [ 8, 10, 9 ], [], [ 10, 8, 11 ], [ 9, 11, 10 ],
            [ 8, 10, 9, 8, 11, 10 ], [], [], [], [ 1, 7, 3 ], [], [ 4, 2, 0 ], [],
            [ 2, 1, 7 ], [], [], [], [ 2, 7, 3, 2, 9, 7 ], [],
            [ 1, 4, 11, 1, 0, 4 ], [ 3, 8, 0, 11, 9, 4, 11, 10, 9 ],
            [ 4, 11, 9, 11, 10, 9 ], [], [], [], [ 5, 3, 1 ], [], [], [],
            [ 2, 5, 8, 2, 1, 5 ], [], [], [ 2, 4, 0 ], [ 3, 2, 4 ], [],
            [ 0, 9, 1, 8, 10, 5, 8, 11, 10 ], [ 3, 4, 0, 3, 10, 4 ],
            [ 5, 8, 10, 8, 11, 10 ], [], [ 3, 5, 7 ], [ 7, 1, 5 ],
            [ 1, 7, 3, 1, 5, 7 ], [], [ 9, 2, 0, 9, 7, 2 ],
            [ 0, 3, 8, 1, 7, 11, 1, 5, 7 ], [ 11, 1, 7, 1, 5, 7 ], [],
            [ 9, 1, 0, 5, 3, 2, 5, 7, 3 ], [ 8, 2, 5, 8, 0, 2 ],
            [ 2, 5, 3, 5, 7, 3 ], [ 3, 9, 1, 3, 8, 9, 7, 11, 10, 7, 10, 5 ],
            [ 9, 1, 0, 10, 7, 11, 10, 5, 7 ], [ 3, 8, 0, 7, 10, 5, 7, 11, 10 ],
            [ 11, 5, 7, 11, 10, 5 ], [], [], [], [], [], [ 0, 6, 2 ], [],
            [ 7, 2, 9, 7, 9, 8 ], [], [], [], [ 8, 10, 9 ], [ 7, 1, 3 ],
            [ 7, 1, 0 ], [ 6, 9, 3, 6, 10, 9 ], [ 7, 10, 8, 10, 9, 8 ], [],
            [ 6, 0, 4 ], [], [ 11, 1, 4, 11, 3, 1 ], [ 2, 4, 6 ],
            [ 2, 0, 4, 2, 4, 6 ], [ 2, 4, 6 ], [ 1, 4, 2, 4, 6, 2 ], [],
            [ 6, 0, 4 ], [], [ 2, 11, 3, 6, 9, 4, 6, 10, 9 ], [ 8, 6, 1, 8, 1, 3 ],
            [ 10, 0, 6, 0, 4, 6 ], [ 8, 0, 3, 9, 6, 10, 9, 4, 6 ],
            [ 10, 4, 6, 10, 9, 4 ], [], [], [], [ 5, 3, 1 ], [], [ 0, 6, 2 ], [],
            [ 7, 4, 8, 5, 2, 1, 5, 6, 2 ], [], [], [ 2, 4, 0 ],
            [ 7, 4, 8, 2, 11, 3, 10, 5, 6 ], [ 7, 1, 3 ],
            [ 5, 6, 10, 0, 9, 1, 8, 7, 4 ], [ 5, 6, 10, 7, 0, 3, 7, 4, 0 ],
            [ 10, 5, 6, 4, 8, 7 ], [ 9, 11, 8 ], [ 3, 5, 6 ],
            [ 0, 5, 11, 0, 11, 8 ], [ 6, 3, 5, 3, 1, 5 ], [ 3, 9, 6, 3, 8, 9 ],
            [ 9, 6, 0, 6, 2, 0 ], [ 0, 3, 8, 2, 5, 6, 2, 1, 5 ],
            [ 1, 6, 2, 1, 5, 6 ], [ 9, 11, 8 ], [ 1, 0, 9, 6, 10, 5, 11, 3, 2 ],
            [ 6, 10, 5, 2, 8, 0, 2, 11, 8 ], [ 3, 2, 11, 10, 5, 6 ],
            [ 10, 5, 6, 9, 3, 8, 9, 1, 3 ], [ 0, 9, 1, 5, 6, 10 ],
            [ 8, 0, 3, 10, 5, 6 ], [ 10, 5, 6 ], [], [], [], [], [], [], [],
            [ 1, 10, 2, 9, 11, 6, 9, 8, 11 ], [], [], [ 6, 0, 2 ],
            [ 3, 6, 9, 3, 2, 6 ], [ 3, 5, 1 ], [ 0, 5, 1, 0, 11, 5 ], [ 0, 3, 5 ],
            [ 6, 9, 11, 9, 8, 11 ], [], [], [], [ 4, 5, 9, 7, 1, 10, 7, 3, 1 ], [],
            [ 11, 6, 7, 2, 4, 5, 2, 0, 4 ],
            [ 11, 6, 7, 8, 0, 3, 1, 10, 2, 9, 4, 5 ],
            [ 6, 7, 11, 1, 10, 2, 9, 4, 5 ], [],
            [ 4, 1, 0, 4, 5, 1, 6, 7, 3, 6, 3, 2 ], [ 9, 4, 5, 0, 6, 7, 0, 2, 6 ],
            [ 4, 5, 9, 6, 3, 2, 6, 7, 3 ], [ 6, 7, 11, 5, 3, 8, 5, 1, 3 ],
            [ 6, 7, 11, 4, 1, 0, 4, 5, 1 ], [ 4, 5, 9, 3, 8, 0, 11, 6, 7 ],
            [ 9, 4, 5, 7, 11, 6 ], [], [], [ 0, 6, 4 ], [ 8, 6, 4, 8, 1, 6 ], [],
            [ 0, 10, 2, 0, 9, 10, 4, 8, 11, 4, 11, 6 ],
            [ 10, 2, 1, 6, 0, 3, 6, 4, 0 ], [ 10, 2, 1, 11, 4, 8, 11, 6, 4 ],
            [ 4, 2, 6 ], [ 1, 0, 9, 2, 4, 8, 2, 6, 4 ], [ 2, 4, 0, 2, 6, 4 ],
            [ 8, 2, 4, 2, 6, 4 ], [ 11, 4, 1, 11, 6, 4 ],
            [ 0, 9, 1, 4, 11, 6, 4, 8, 11 ], [ 3, 6, 0, 6, 4, 0 ],
            [ 8, 6, 4, 8, 11, 6 ], [ 10, 8, 9 ], [ 6, 3, 9, 6, 7, 3 ], [ 6, 7, 1 ],
            [ 10, 7, 1, 7, 3, 1 ], [ 7, 11, 6, 8, 10, 2, 8, 9, 10 ],
            [ 11, 6, 7, 10, 0, 9, 10, 2, 0 ], [ 2, 1, 10, 7, 11, 6, 8, 0, 3 ],
            [ 1, 10, 2, 6, 7, 11 ], [ 7, 2, 6, 7, 9, 2 ],
            [ 1, 0, 9, 3, 6, 7, 3, 2, 6 ], [ 7, 0, 6, 0, 2, 6 ],
            [ 2, 7, 3, 2, 6, 7 ], [ 7, 11, 6, 3, 9, 1, 3, 8, 9 ],
            [ 9, 1, 0, 11, 6, 7 ], [ 0, 3, 8, 11, 6, 7 ], [ 11, 6, 7 ], [], [], [],
            [], [ 5, 3, 7 ], [ 8, 5, 2, 8, 7, 5 ], [ 5, 3, 7 ],
            [ 1, 10, 2, 5, 8, 7, 5, 9, 8 ], [ 1, 7, 5 ], [ 1, 7, 5 ],
            [ 9, 2, 7, 9, 7, 5 ], [ 11, 3, 2, 8, 5, 9, 8, 7, 5 ],
            [ 1, 3, 7, 1, 7, 5 ], [ 0, 7, 1, 7, 5, 1 ], [ 9, 3, 5, 3, 7, 5 ],
            [ 9, 7, 5, 9, 8, 7 ], [ 8, 10, 11 ], [ 3, 4, 10, 3, 10, 11 ],
            [ 8, 10, 11 ], [ 5, 9, 4, 1, 11, 3, 1, 10, 11 ], [ 2, 4, 5 ],
            [ 5, 2, 4, 2, 0, 4 ], [ 0, 3, 8, 5, 9, 4, 10, 2, 1 ],
            [ 2, 1, 10, 9, 4, 5 ], [ 2, 8, 5, 2, 11, 8 ],
            [ 3, 2, 11, 1, 4, 5, 1, 0, 4 ], [ 9, 4, 5, 8, 2, 11, 8, 0, 2 ],
            [ 11, 3, 2, 9, 4, 5 ], [ 8, 5, 3, 5, 1, 3 ], [ 5, 0, 4, 5, 1, 0 ],
            [ 3, 8, 0, 4, 5, 9 ], [ 9, 4, 5 ], [ 11, 9, 10 ], [ 11, 9, 10 ],
            [ 1, 11, 4, 1, 10, 11 ], [ 8, 7, 4, 11, 1, 10, 11, 3, 1 ],
            [ 2, 7, 9, 2, 9, 10 ], [ 4, 8, 7, 0, 10, 2, 0, 9, 10 ],
            [ 2, 1, 10, 0, 7, 4, 0, 3, 7 ], [ 10, 2, 1, 8, 7, 4 ], [ 1, 7, 4 ],
            [ 3, 2, 11, 4, 8, 7, 9, 1, 0 ], [ 11, 4, 2, 4, 0, 2 ],
            [ 2, 11, 3, 7, 4, 8 ], [ 4, 1, 7, 1, 3, 7 ], [ 1, 0, 9, 8, 7, 4 ],
            [ 3, 4, 0, 3, 7, 4 ], [ 8, 7, 4 ], [ 8, 9, 10, 8, 10, 11 ],
            [ 3, 9, 11, 9, 10, 11 ], [ 0, 10, 8, 10, 11, 8 ],
            [ 10, 3, 1, 10, 11, 3 ], [ 2, 8, 10, 8, 9, 10 ], [ 9, 2, 0, 9, 10, 2 ],
            [ 8, 0, 3, 1, 10, 2 ], [ 10, 2, 1 ], [ 1, 11, 9, 11, 8, 9 ],
            [ 11, 3, 2, 0, 9, 1 ], [ 11, 0, 2, 11, 8, 0 ], [ 11, 3, 2 ],
            [ 8, 1, 3, 8, 9, 1 ], [ 9, 1, 0 ], [ 8, 0, 3 ], [] ];
     
    var edgeTable2 = [ 0x0, 0x109, 0x203, 0x30a, 0x80c, 0x905, 0xa0f,
            0xb06, 0x406, 0x50f, 0x605, 0x70c, 0xc0a, 0xd03, 0xe09, 0xf00, 0x190,
            0x99, 0x393, 0x29a, 0x99c, 0x895, 0xb9f, 0xa96, 0x596, 0x49f, 0x795,
            0x69c, 0xd9a, 0xc93, 0xf99, 0xe90, 0x230, 0x339, 0x33, 0x13a, 0xa3c,
            0xb35, 0x83f, 0x936, 0x636, 0x73f, 0x435, 0x53c, 0xe3a, 0xf33, 0xc39,
            0xd30, 0x3a0, 0x2a9, 0x1a3, 0xaa, 0xbac, 0xaa5, 0x9af, 0x8a6, 0x7a6,
            0x6af, 0x5a5, 0x4ac, 0xfaa, 0xea3, 0xda9, 0xca0, 0x8c0, 0x9c9, 0xac3,
            0xbca, 0xcc, 0x1c5, 0x2cf, 0x3c6, 0xcc6, 0xdcf, 0xec5, 0xfcc, 0x4ca,
            0x5c3, 0x6c9, 0x7c0, 0x950, 0x859, 0xb53, 0xa5a, 0x15c, 0x55, 0x35f,
            0x256, 0xd56, 0xc5f, 0xf55, 0xe5c, 0x55a, 0x453, 0x759, 0x650, 0xaf0,
            0xbf9, 0x8f3, 0x9fa, 0x2fc, 0x3f5, 0xff, 0x1f6, 0xef6, 0xfff, 0xcf5,
            0xdfc, 0x6fa, 0x7f3, 0x4f9, 0x5f0, 0xb60, 0xa69, 0x963, 0x86a, 0x36c,
            0x265, 0x16f, 0x66, 0xf66, 0xe6f, 0xd65, 0xc6c, 0x76a, 0x663, 0x569,
            0x460, 0x460, 0x569, 0x663, 0x76a, 0xc6c, 0xd65, 0xe6f, 0xf66, 0x66,
            0x16f, 0x265, 0x36c, 0x86a, 0x963, 0xa69, 0xb60, 0x5f0, 0x4f9, 0x7f3,
            0x6fa, 0xdfc, 0xcf5, 0xfff, 0xef6, 0x1f6, 0xff, 0x3f5, 0x2fc, 0x9fa,
            0x8f3, 0xbf9, 0xaf0, 0x650, 0x759, 0x453, 0x55a, 0xe5c, 0xf55, 0xc5f,
            0xd56, 0x256, 0x35f, 0x55, 0x15c, 0xa5a, 0xb53, 0x859, 0x950, 0x7c0,
            0x6c9, 0x5c3, 0x4ca, 0xfcc, 0xec5, 0xdcf, 0xcc6, 0x3c6, 0x2cf, 0x1c5,
            0xcc, 0xbca, 0xac3, 0x9c9, 0x8c0, 0xca0, 0xda9, 0xea3, 0xfaa, 0x4ac,
            0x5a5, 0x6af, 0x7a6, 0x8a6, 0x9af, 0xaa5, 0xbac, 0xaa, 0x1a3, 0x2a9,
            0x3a0, 0xd30, 0xc39, 0xf33, 0xe3a, 0x53c, 0x435, 0x73f, 0x636, 0x936,
            0x83f, 0xb35, 0xa3c, 0x13a, 0x33, 0x339, 0x230, 0xe90, 0xf99, 0xc93,
            0xd9a, 0x69c, 0x795, 0x49f, 0x596, 0xa96, 0xb9f, 0x895, 0x99c, 0x29a,
            0x393, 0x99, 0x190, 0xf00, 0xe09, 0xd03, 0xc0a, 0x70c, 0x605, 0x50f,
            0x406, 0xb06, 0xa0f, 0x905, 0x80c, 0x30a, 0x203, 0x109, 0x0 ];
     
    var triTable2 = [ [], [ 8, 3, 0 ], [ 9, 0, 1 ], [ 8, 3, 1, 8, 1, 9 ],
            [ 11, 2, 3 ], [ 11, 2, 0, 11, 0, 8 ], [ 11, 2, 3, 0, 1, 9 ],
            [ 2, 1, 11, 1, 9, 11, 11, 9, 8 ], [ 10, 1, 2 ], [ 8, 3, 0, 1, 2, 10 ],
            [ 9, 0, 2, 9, 2, 10 ], [ 3, 2, 8, 2, 10, 8, 8, 10, 9 ],
            [ 10, 1, 3, 10, 3, 11 ], [ 1, 0, 10, 0, 8, 10, 10, 8, 11 ],
            [ 0, 3, 9, 3, 11, 9, 9, 11, 10 ], [ 8, 10, 9, 8, 11, 10 ], [ 8, 4, 7 ],
            [ 3, 0, 4, 3, 4, 7 ], [ 1, 9, 0, 8, 4, 7 ],
            [ 9, 4, 1, 4, 7, 1, 1, 7, 3 ], [ 2, 3, 11, 7, 8, 4 ],
            [ 7, 11, 4, 11, 2, 4, 4, 2, 0 ], [ 3, 11, 2, 4, 7, 8, 9, 0, 1 ],
            [ 2, 7, 11, 2, 1, 7, 1, 4, 7, 1, 9, 4 ], [ 10, 1, 2, 8, 4, 7 ],
            [ 2, 10, 1, 0, 4, 7, 0, 7, 3 ], [ 4, 7, 8, 0, 2, 10, 0, 10, 9 ],
            [ 2, 7, 3, 2, 9, 7, 7, 9, 4, 2, 10, 9 ],
            [ 8, 4, 7, 11, 10, 1, 11, 1, 3 ],
            [ 11, 4, 7, 1, 4, 11, 1, 11, 10, 1, 0, 4 ],
            [ 3, 8, 0, 7, 11, 4, 11, 9, 4, 11, 10, 9 ],
            [ 7, 11, 4, 4, 11, 9, 11, 10, 9 ], [ 9, 5, 4 ], [ 3, 0, 8, 4, 9, 5 ],
            [ 5, 4, 0, 5, 0, 1 ], [ 4, 8, 5, 8, 3, 5, 5, 3, 1 ],
            [ 11, 2, 3, 9, 5, 4 ], [ 9, 5, 4, 8, 11, 2, 8, 2, 0 ],
            [ 3, 11, 2, 1, 5, 4, 1, 4, 0 ],
            [ 8, 5, 4, 2, 5, 8, 2, 8, 11, 2, 1, 5 ], [ 2, 10, 1, 9, 5, 4 ],
            [ 0, 8, 3, 5, 4, 9, 10, 1, 2 ], [ 10, 5, 2, 5, 4, 2, 2, 4, 0 ],
            [ 3, 4, 8, 3, 2, 4, 2, 5, 4, 2, 10, 5 ],
            [ 5, 4, 9, 1, 3, 11, 1, 11, 10 ],
            [ 0, 9, 1, 4, 8, 5, 8, 10, 5, 8, 11, 10 ],
            [ 3, 4, 0, 3, 10, 4, 4, 10, 5, 3, 11, 10 ],
            [ 4, 8, 5, 5, 8, 10, 8, 11, 10 ], [ 9, 5, 7, 9, 7, 8 ],
            [ 0, 9, 3, 9, 5, 3, 3, 5, 7 ], [ 8, 0, 7, 0, 1, 7, 7, 1, 5 ],
            [ 1, 7, 3, 1, 5, 7 ], [ 11, 2, 3, 8, 9, 5, 8, 5, 7 ],
            [ 9, 2, 0, 9, 7, 2, 2, 7, 11, 9, 5, 7 ],
            [ 0, 3, 8, 2, 1, 11, 1, 7, 11, 1, 5, 7 ],
            [ 2, 1, 11, 11, 1, 7, 1, 5, 7 ], [ 1, 2, 10, 5, 7, 8, 5, 8, 9 ],
            [ 9, 1, 0, 10, 5, 2, 5, 3, 2, 5, 7, 3 ],
            [ 5, 2, 10, 8, 2, 5, 8, 5, 7, 8, 0, 2 ],
            [ 10, 5, 2, 2, 5, 3, 5, 7, 3 ],
            [ 3, 9, 1, 3, 8, 9, 7, 11, 10, 7, 10, 5 ],
            [ 9, 1, 0, 10, 7, 11, 10, 5, 7 ], [ 3, 8, 0, 7, 10, 5, 7, 11, 10 ],
            [ 11, 5, 7, 11, 10, 5 ], [ 11, 7, 6 ], [ 0, 8, 3, 11, 7, 6 ],
            [ 9, 0, 1, 11, 7, 6 ], [ 7, 6, 11, 3, 1, 9, 3, 9, 8 ],
            [ 2, 3, 7, 2, 7, 6 ], [ 8, 7, 0, 7, 6, 0, 0, 6, 2 ],
            [ 1, 9, 0, 3, 7, 6, 3, 6, 2 ], [ 7, 6, 2, 7, 2, 9, 2, 1, 9, 7, 9, 8 ],
            [ 1, 2, 10, 6, 11, 7 ], [ 2, 10, 1, 7, 6, 11, 8, 3, 0 ],
            [ 11, 7, 6, 10, 9, 0, 10, 0, 2 ],
            [ 7, 6, 11, 3, 2, 8, 8, 2, 10, 8, 10, 9 ],
            [ 6, 10, 7, 10, 1, 7, 7, 1, 3 ],
            [ 6, 10, 1, 6, 1, 7, 7, 1, 0, 7, 0, 8 ],
            [ 9, 0, 3, 6, 9, 3, 6, 10, 9, 6, 3, 7 ],
            [ 6, 10, 7, 7, 10, 8, 10, 9, 8 ], [ 8, 4, 6, 8, 6, 11 ],
            [ 11, 3, 6, 3, 0, 6, 6, 0, 4 ], [ 0, 1, 9, 4, 6, 11, 4, 11, 8 ],
            [ 1, 9, 4, 11, 1, 4, 11, 3, 1, 11, 4, 6 ],
            [ 3, 8, 2, 8, 4, 2, 2, 4, 6 ], [ 2, 0, 4, 2, 4, 6 ],
            [ 1, 9, 0, 3, 8, 2, 2, 8, 4, 2, 4, 6 ], [ 9, 4, 1, 1, 4, 2, 4, 6, 2 ],
            [ 10, 1, 2, 11, 8, 4, 11, 4, 6 ],
            [ 10, 1, 2, 11, 3, 6, 6, 3, 0, 6, 0, 4 ],
            [ 0, 2, 10, 0, 10, 9, 4, 11, 8, 4, 6, 11 ],
            [ 2, 11, 3, 6, 9, 4, 6, 10, 9 ],
            [ 8, 4, 6, 8, 6, 1, 6, 10, 1, 8, 1, 3 ],
            [ 1, 0, 10, 10, 0, 6, 0, 4, 6 ], [ 8, 0, 3, 9, 6, 10, 9, 4, 6 ],
            [ 10, 4, 6, 10, 9, 4 ], [ 9, 5, 4, 7, 6, 11 ],
            [ 4, 9, 5, 3, 0, 8, 11, 7, 6 ], [ 6, 11, 7, 4, 0, 1, 4, 1, 5 ],
            [ 6, 11, 7, 4, 8, 5, 5, 8, 3, 5, 3, 1 ], [ 4, 9, 5, 6, 2, 3, 6, 3, 7 ],
            [ 9, 5, 4, 8, 7, 0, 0, 7, 6, 0, 6, 2 ],
            [ 4, 0, 1, 4, 1, 5, 6, 3, 7, 6, 2, 3 ], [ 7, 4, 8, 5, 2, 1, 5, 6, 2 ],
            [ 6, 11, 7, 1, 2, 10, 9, 5, 4 ],
            [ 11, 7, 6, 8, 3, 0, 1, 2, 10, 9, 5, 4 ],
            [ 11, 7, 6, 10, 5, 2, 2, 5, 4, 2, 4, 0 ],
            [ 7, 4, 8, 2, 11, 3, 10, 5, 6 ],
            [ 4, 9, 5, 6, 10, 7, 7, 10, 1, 7, 1, 3 ],
            [ 5, 6, 10, 0, 9, 1, 8, 7, 4 ], [ 5, 6, 10, 7, 0, 3, 7, 4, 0 ],
            [ 10, 5, 6, 4, 8, 7 ], [ 5, 6, 9, 6, 11, 9, 9, 11, 8 ],
            [ 0, 9, 5, 0, 5, 3, 3, 5, 6, 3, 6, 11 ],
            [ 0, 1, 5, 0, 5, 11, 5, 6, 11, 0, 11, 8 ],
            [ 11, 3, 6, 6, 3, 5, 3, 1, 5 ], [ 9, 5, 6, 3, 9, 6, 3, 8, 9, 3, 6, 2 ],
            [ 5, 6, 9, 9, 6, 0, 6, 2, 0 ], [ 0, 3, 8, 2, 5, 6, 2, 1, 5 ],
            [ 1, 6, 2, 1, 5, 6 ], [ 1, 2, 10, 5, 6, 9, 9, 6, 11, 9, 11, 8 ],
            [ 1, 0, 9, 6, 10, 5, 11, 3, 2 ], [ 6, 10, 5, 2, 8, 0, 2, 11, 8 ],
            [ 3, 2, 11, 10, 5, 6 ], [ 10, 5, 6, 9, 3, 8, 9, 1, 3 ],
            [ 0, 9, 1, 5, 6, 10 ], [ 8, 0, 3, 10, 5, 6 ], [ 10, 5, 6 ],
            [ 10, 6, 5 ], [ 8, 3, 0, 10, 6, 5 ], [ 0, 1, 9, 5, 10, 6 ],
            [ 10, 6, 5, 9, 8, 3, 9, 3, 1 ], [ 3, 11, 2, 10, 6, 5 ],
            [ 6, 5, 10, 2, 0, 8, 2, 8, 11 ], [ 1, 9, 0, 6, 5, 10, 11, 2, 3 ],
            [ 1, 10, 2, 5, 9, 6, 9, 11, 6, 9, 8, 11 ], [ 1, 2, 6, 1, 6, 5 ],
            [ 0, 8, 3, 2, 6, 5, 2, 5, 1 ], [ 5, 9, 6, 9, 0, 6, 6, 0, 2 ],
            [ 9, 6, 5, 3, 6, 9, 3, 9, 8, 3, 2, 6 ], [ 11, 6, 3, 6, 5, 3, 3, 5, 1 ],
            [ 0, 5, 1, 0, 11, 5, 5, 11, 6, 0, 8, 11 ],
            [ 0, 5, 9, 0, 3, 5, 3, 6, 5, 3, 11, 6 ],
            [ 5, 9, 6, 6, 9, 11, 9, 8, 11 ], [ 10, 6, 5, 4, 7, 8 ],
            [ 5, 10, 6, 7, 3, 0, 7, 0, 4 ], [ 5, 10, 6, 0, 1, 9, 8, 4, 7 ],
            [ 4, 5, 9, 6, 7, 10, 7, 1, 10, 7, 3, 1 ],
            [ 7, 8, 4, 2, 3, 11, 10, 6, 5 ],
            [ 11, 6, 7, 10, 2, 5, 2, 4, 5, 2, 0, 4 ],
            [ 11, 6, 7, 8, 0, 3, 1, 10, 2, 9, 4, 5 ],
            [ 6, 7, 11, 1, 10, 2, 9, 4, 5 ], [ 7, 8, 4, 5, 1, 2, 5, 2, 6 ],
            [ 4, 1, 0, 4, 5, 1, 6, 7, 3, 6, 3, 2 ],
            [ 9, 4, 5, 8, 0, 7, 0, 6, 7, 0, 2, 6 ], [ 4, 5, 9, 6, 3, 2, 6, 7, 3 ],
            [ 6, 7, 11, 4, 5, 8, 5, 3, 8, 5, 1, 3 ],
            [ 6, 7, 11, 4, 1, 0, 4, 5, 1 ], [ 4, 5, 9, 3, 8, 0, 11, 6, 7 ],
            [ 9, 4, 5, 7, 11, 6 ], [ 10, 6, 4, 10, 4, 9 ],
            [ 8, 3, 0, 9, 10, 6, 9, 6, 4 ], [ 1, 10, 0, 10, 6, 0, 0, 6, 4 ],
            [ 8, 6, 4, 8, 1, 6, 6, 1, 10, 8, 3, 1 ],
            [ 2, 3, 11, 6, 4, 9, 6, 9, 10 ],
            [ 0, 10, 2, 0, 9, 10, 4, 8, 11, 4, 11, 6 ],
            [ 10, 2, 1, 11, 6, 3, 6, 0, 3, 6, 4, 0 ],
            [ 10, 2, 1, 11, 4, 8, 11, 6, 4 ], [ 9, 1, 4, 1, 2, 4, 4, 2, 6 ],
            [ 1, 0, 9, 3, 2, 8, 2, 4, 8, 2, 6, 4 ], [ 2, 4, 0, 2, 6, 4 ],
            [ 3, 2, 8, 8, 2, 4, 2, 6, 4 ],
            [ 1, 4, 9, 11, 4, 1, 11, 1, 3, 11, 6, 4 ],
            [ 0, 9, 1, 4, 11, 6, 4, 8, 11 ], [ 11, 6, 3, 3, 6, 0, 6, 4, 0 ],
            [ 8, 6, 4, 8, 11, 6 ], [ 6, 7, 10, 7, 8, 10, 10, 8, 9 ],
            [ 9, 3, 0, 6, 3, 9, 6, 9, 10, 6, 7, 3 ],
            [ 6, 1, 10, 6, 7, 1, 7, 0, 1, 7, 8, 0 ],
            [ 6, 7, 10, 10, 7, 1, 7, 3, 1 ],
            [ 7, 11, 6, 3, 8, 2, 8, 10, 2, 8, 9, 10 ],
            [ 11, 6, 7, 10, 0, 9, 10, 2, 0 ], [ 2, 1, 10, 7, 11, 6, 8, 0, 3 ],
            [ 1, 10, 2, 6, 7, 11 ], [ 7, 2, 6, 7, 9, 2, 2, 9, 1, 7, 8, 9 ],
            [ 1, 0, 9, 3, 6, 7, 3, 2, 6 ], [ 8, 0, 7, 7, 0, 6, 0, 2, 6 ],
            [ 2, 7, 3, 2, 6, 7 ], [ 7, 11, 6, 3, 9, 1, 3, 8, 9 ],
            [ 9, 1, 0, 11, 6, 7 ], [ 0, 3, 8, 11, 6, 7 ], [ 11, 6, 7 ],
            [ 11, 7, 5, 11, 5, 10 ], [ 3, 0, 8, 7, 5, 10, 7, 10, 11 ],
            [ 9, 0, 1, 10, 11, 7, 10, 7, 5 ],
            [ 3, 1, 9, 3, 9, 8, 7, 10, 11, 7, 5, 10 ],
            [ 10, 2, 5, 2, 3, 5, 5, 3, 7 ],
            [ 5, 10, 2, 8, 5, 2, 8, 7, 5, 8, 2, 0 ],
            [ 9, 0, 1, 10, 2, 5, 5, 2, 3, 5, 3, 7 ],
            [ 1, 10, 2, 5, 8, 7, 5, 9, 8 ], [ 2, 11, 1, 11, 7, 1, 1, 7, 5 ],
            [ 0, 8, 3, 2, 11, 1, 1, 11, 7, 1, 7, 5 ],
            [ 9, 0, 2, 9, 2, 7, 2, 11, 7, 9, 7, 5 ],
            [ 11, 3, 2, 8, 5, 9, 8, 7, 5 ], [ 1, 3, 7, 1, 7, 5 ],
            [ 8, 7, 0, 0, 7, 1, 7, 5, 1 ], [ 0, 3, 9, 9, 3, 5, 3, 7, 5 ],
            [ 9, 7, 5, 9, 8, 7 ], [ 4, 5, 8, 5, 10, 8, 8, 10, 11 ],
            [ 3, 0, 4, 3, 4, 10, 4, 5, 10, 3, 10, 11 ],
            [ 0, 1, 9, 4, 5, 8, 8, 5, 10, 8, 10, 11 ],
            [ 5, 9, 4, 1, 11, 3, 1, 10, 11 ],
            [ 3, 8, 4, 3, 4, 2, 2, 4, 5, 2, 5, 10 ],
            [ 10, 2, 5, 5, 2, 4, 2, 0, 4 ], [ 0, 3, 8, 5, 9, 4, 10, 2, 1 ],
            [ 2, 1, 10, 9, 4, 5 ], [ 8, 4, 5, 2, 8, 5, 2, 11, 8, 2, 5, 1 ],
            [ 3, 2, 11, 1, 4, 5, 1, 0, 4 ], [ 9, 4, 5, 8, 2, 11, 8, 0, 2 ],
            [ 11, 3, 2, 9, 4, 5 ], [ 4, 5, 8, 8, 5, 3, 5, 1, 3 ],
            [ 5, 0, 4, 5, 1, 0 ], [ 3, 8, 0, 4, 5, 9 ], [ 9, 4, 5 ],
            [ 7, 4, 11, 4, 9, 11, 11, 9, 10 ],
            [ 3, 0, 8, 7, 4, 11, 11, 4, 9, 11, 9, 10 ],
            [ 11, 7, 4, 1, 11, 4, 1, 10, 11, 1, 4, 0 ],
            [ 8, 7, 4, 11, 1, 10, 11, 3, 1 ],
            [ 2, 3, 7, 2, 7, 9, 7, 4, 9, 2, 9, 10 ],
            [ 4, 8, 7, 0, 10, 2, 0, 9, 10 ], [ 2, 1, 10, 0, 7, 4, 0, 3, 7 ],
            [ 10, 2, 1, 8, 7, 4 ], [ 2, 11, 7, 2, 7, 1, 1, 7, 4, 1, 4, 9 ],
            [ 3, 2, 11, 4, 8, 7, 9, 1, 0 ], [ 7, 4, 11, 11, 4, 2, 4, 0, 2 ],
            [ 2, 11, 3, 7, 4, 8 ], [ 9, 1, 4, 4, 1, 7, 1, 3, 7 ],
            [ 1, 0, 9, 8, 7, 4 ], [ 3, 4, 0, 3, 7, 4 ], [ 8, 7, 4 ],
            [ 8, 9, 10, 8, 10, 11 ], [ 0, 9, 3, 3, 9, 11, 9, 10, 11 ],
            [ 1, 10, 0, 0, 10, 8, 10, 11, 8 ], [ 10, 3, 1, 10, 11, 3 ],
            [ 3, 8, 2, 2, 8, 10, 8, 9, 10 ], [ 9, 2, 0, 9, 10, 2 ],
            [ 8, 0, 3, 1, 10, 2 ], [ 10, 2, 1 ], [ 2, 11, 1, 1, 11, 9, 11, 8, 9 ],
            [ 11, 3, 2, 0, 9, 1 ], [ 11, 0, 2, 11, 8, 0 ], [ 11, 3, 2 ],
            [ 8, 1, 3, 8, 9, 1 ], [ 9, 1, 0 ], [ 8, 0, 3 ], [] ];
            
            return my;
})();



/*  ProteinSurface.js by biochem_fan

Ported and modified for Javascript based on EDTSurf,
  whose license is as follows.

Permission to use, copy, modify, and distribute this program for any
purpose, with or without fee, is hereby granted, provided that this
copyright notice and the reference information appear in all copies or
substantial portions of the Software. It is provided "as is" without
express or implied warranty. 

Reference:
http://zhanglab.ccmb.med.umich.edu/EDTSurf/
D. Xu, Y. Zhang (2009) Generating Triangulated Macromolecular Surfaces
by Euclidean Distance Transform. PLoS ONE 4(12): e8140.

=======

TODO: Improved performance on Firefox
      Reduce memory consumption
      Refactor!
 */


// dkoes
// Surface calculations.  This must be safe to use within a web worker.
if (typeof console === 'undefined') {
    // this should only be true inside of a webworker
    console = {
        log : function() {
        }
    };
}

$3Dmol.ProteinSurface = function() {

    // constants for vpbits bitmasks
    /** @const */
    var INOUT = 1;
    /** @const */
    var ISDONE = 2;
    /** @const */
    var ISBOUND = 4;

    var ptranx = 0, ptrany = 0, ptranz = 0;
    var probeRadius = 1.4;
    var defaultScaleFactor = 2;
    var scaleFactor = defaultScaleFactor; // 2 is .5A grid; if this is made user configurable,
                            // also have to adjust offset used to find non-shown
                            // atoms
    var pHeight = 0, pWidth = 0, pLength = 0;
    var cutRadius = 0;
    var vpBits = null; // uint8 array of bitmasks
    var vpDistance = null; // floatarray of _squared_ distances
    var vpAtomID = null; // intarray
    var vertnumber = 0, facenumber = 0;
    var pminx = 0, pminy = 0, pminz = 0, pmaxx = 0, pmaxy = 0, pmaxz = 0;

    var vdwRadii = {
            "H" : 1.2,
            "Li" : 1.82,
            "Na" : 2.27,
            "K" : 2.75,
            "C" : 1.7,
            "N" : 1.55,
            "O" : 1.52,
            "F" : 1.47,
            "P" : 1.80,
            "S" : 1.80,
            "CL" : 1.75,
            "BR" : 1.85,
            "SE" : 1.90,
            "ZN" : 1.39,
            "CU" : 1.4,
            "NI" : 1.63,
            "X" : 2
        };
    
    /** @param {AtomSpec} atom */
    var getVDWIndex = function(atom) {
        if(!atom.elem || typeof(vdwRadii[atom.elem]) == "undefined") {
            return "X";
        }
        return atom.elem;
    };
    
    var depty = {}, widxz = {};
    var faces, verts;
    var nb = [ new Int32Array([ 1, 0, 0 ]), new Int32Array([ -1, 0, 0 ]), 
               new Int32Array([ 0, 1, 0 ]), new Int32Array([ 0, -1, 0 ]),
               new Int32Array([ 0, 0, 1 ]), 
               new Int32Array([ 0, 0, -1 ]), 
               new Int32Array([ 1, 1, 0 ]), 
               new Int32Array([ 1, -1, 0 ]), 
               new Int32Array([ -1, 1, 0 ]),
               new Int32Array([ -1, -1, 0 ]), 
               new Int32Array([ 1, 0, 1 ]), 
               new Int32Array([ 1, 0, -1 ]), 
               new Int32Array([ -1, 0, 1 ]),
               new Int32Array([ -1, 0, -1 ]), 
               new Int32Array([ 0, 1, 1 ]), 
               new Int32Array([ 0, 1, -1 ]), 
               new Int32Array([ 0, -1, 1 ]),
               new Int32Array([ 0, -1, -1 ]), 
               new Int32Array([ 1, 1, 1 ]), 
               new Int32Array([ 1, 1, -1 ]), 
               new Int32Array([ 1, -1, 1 ]),
               new Int32Array([ -1, 1, 1 ]), 
               new Int32Array([ 1, -1, -1 ]), 
               new Int32Array([ -1, -1, 1 ]), 
               new Int32Array([ -1, 1, -1 ]),
               new Int32Array([ -1, -1, -1 ]) ];

    var origextent;

    var inOrigExtent = function(x, y, z) {
        if (x < origextent[0][0] || x > origextent[1][0])
            return false;
        if (y < origextent[0][1] || y > origextent[1][1])
            return false;
        if (z < origextent[0][2] || z > origextent[1][2])
            return false;
        return true;
    };

    this.getFacesAndVertices = function(atomlist) {
        var atomsToShow = {};
        var i, il;
        for (i = 0, il = atomlist.length; i < il; i++)
            atomsToShow[atomlist[i]] = true;
        var vertices = verts;
        for (i = 0, il = vertices.length; i < il; i++) {
            vertices[i].x = vertices[i].x / scaleFactor - ptranx;
            vertices[i].y = vertices[i].y / scaleFactor - ptrany;
            vertices[i].z = vertices[i].z / scaleFactor - ptranz;
        }

        var finalfaces = [];
        for (i = 0, il = faces.length; i < il; i += 3) {
            //var f = faces[i];
            var fa = faces[i], fb = faces[i+1], fc = faces[i+2];
            var a = vertices[fa]['atomid'], b = vertices[fb]['atomid'], c = vertices[fc]['atomid'];

            // must be a unique face for each atom
            var which = a;
            if (b < which)
                which = b;
            if (c < which)
                which = c;
            if (!atomsToShow[which]) {
                continue;
            }
            var av = vertices[faces[i]];
            var bv = vertices[faces[i+1]];
            var cv = vertices[faces[i+2]];

            if (fa !== fb && fb !== fc && fa !== fc){
                finalfaces.push(fa); 
                finalfaces.push(fb); 
                finalfaces.push(fc); 
            }
               
        }

        //try to help the garbage collector
        vpBits = null; // uint8 array of bitmasks
        vpDistance = null; // floatarray
        vpAtomID = null; // intarray
        
        return {
            'vertices' : vertices,
            'faces' : finalfaces
        };
    };


    this.initparm = function(extent, btype, volume) {
        if(volume > 1000000) //heuristical decrease resolution to avoid large memory consumption
            scaleFactor = defaultScaleFactor/2;
        
        var margin = (1 / scaleFactor) * 5.5; // need margin to avoid
                                                // boundary/round off effects
        origextent = extent;
        pminx = extent[0][0]; pmaxx = extent[1][0];
        pminy = extent[0][1]; pmaxy = extent[1][1];
        pminz = extent[0][2]; pmaxz = extent[1][2];

        if (!btype) {
            pminx -= margin;
            pminy -= margin;
            pminz -= margin;
            pmaxx += margin;
            pmaxy += margin;
            pmaxz += margin;
        } else {
            pminx -= probeRadius + margin;
            pminy -= probeRadius + margin;
            pminz -= probeRadius + margin;
            pmaxx += probeRadius + margin;
            pmaxy += probeRadius + margin;
            pmaxz += probeRadius + margin;
        }

        pminx = Math.floor(pminx * scaleFactor) / scaleFactor;
        pminy = Math.floor(pminy * scaleFactor) / scaleFactor;
        pminz = Math.floor(pminz * scaleFactor) / scaleFactor;
        pmaxx = Math.ceil(pmaxx * scaleFactor) / scaleFactor;
        pmaxy = Math.ceil(pmaxy * scaleFactor) / scaleFactor;
        pmaxz = Math.ceil(pmaxz * scaleFactor) / scaleFactor;

        ptranx = -pminx;
        ptrany = -pminy;
        ptranz = -pminz;

        pLength = Math.ceil(scaleFactor * (pmaxx - pminx)) + 1;
        pWidth = Math.ceil(scaleFactor * (pmaxy - pminy)) + 1;
        pHeight = Math.ceil(scaleFactor * (pmaxz - pminz)) + 1;

        this.boundingatom(btype);
        cutRadius = probeRadius * scaleFactor;

        vpBits = new Uint8Array(pLength * pWidth * pHeight);
        vpDistance = new Float64Array(pLength * pWidth * pHeight); // float 32
        // doesn't
        // play
        // nicely
        // with
        // native
        // floats
        vpAtomID = new Int32Array(pLength * pWidth * pHeight);
        console.log("Box size: ", pLength, pWidth, pHeight, vpBits.length);
    };

    this.boundingatom = function(btype) {
        var tradius = [];
        var txz, tdept, sradius, idx;
        flagradius = btype;

        for ( var i in vdwRadii) {
            if(!vdwRadii.hasOwnProperty(i))
                continue;
            var r = vdwRadii[i];
            if (!btype)
                tradius[i] = r * scaleFactor + 0.5;
            else
                tradius[i] = (r + probeRadius) * scaleFactor + 0.5;

            sradius = tradius[i] * tradius[i];
            widxz[i] = Math.floor(tradius[i]) + 1;
            depty[i] = new Int32Array(widxz[i] * widxz[i]);
            indx = 0;
            for (j = 0; j < widxz[i]; j++) {
                for (k = 0; k < widxz[i]; k++) {
                    txz = j * j + k * k;
                    if (txz > sradius)
                        depty[i][indx] = -1; // outside
                    else {
                        tdept = Math.sqrt(sradius - txz);
                        depty[i][indx] = Math.floor(tdept);
                    }
                    indx++;
                }
            }
        }
    };

    this.fillvoxels = function(atoms, atomlist) { // (int seqinit,int
        // seqterm,bool
        // atomtype,atom*
        // proseq,bool bcolor)
        var i, il;
        for (i = 0, il = vpBits.length; i < il; i++) {
            vpBits[i] = 0;
            vpDistance[i] = -1.0;
            vpAtomID[i] = -1;
        }

        for (i in atomlist) {
            var atom = atoms[atomlist[i]];
            if (atom === undefined)
                continue;
            this.fillAtom(atom, atoms);
        }

        for (i = 0, il = vpBits.length; i < il; i++)
            if (vpBits[i] & INOUT)
                vpBits[i] |= ISDONE;

    };


    this.fillAtom = function(atom, atoms) {
        var cx, cy, cz, ox, oy, oz, mi, mj, mk, i, j, k, si, sj, sk;
        var ii, jj, kk, n;
        cx = Math.floor(0.5 + scaleFactor * (atom.x + ptranx));
        cy = Math.floor(0.5 + scaleFactor * (atom.y + ptrany));
        cz = Math.floor(0.5 + scaleFactor * (atom.z + ptranz));

        var at = getVDWIndex(atom);
        var nind = 0;
        var cnt = 0;
        var pWH = pWidth*pHeight;
        
        for (i = 0, n = widxz[at]; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (depty[at][nind] != -1) {
                    for (ii = -1; ii < 2; ii++) {
                        for (jj = -1; jj < 2; jj++) {
                            for (kk = -1; kk < 2; kk++) {
                                if (ii !== 0 && jj !== 0 && kk !== 0) {
                                    mi = ii * i;
                                    mk = kk * j;
                                    for (k = 0; k <= depty[at][nind]; k++) {
                                        mj = k * jj;
                                        si = cx + mi;
                                        sj = cy + mj;
                                        sk = cz + mk;
                                        if (si < 0 || sj < 0 || 
                                                sk < 0 ||
                                                si >= pLength || 
                                                sj >= pWidth || 
                                                sk >= pHeight)
                                            continue;
                                        var index = si * pWH + sj * pHeight + sk;

                                        if (!(vpBits[index] & INOUT)) {
                                            vpBits[index] |= INOUT;
                                            vpAtomID[index] = atom.serial;
                                        } else {
                                            var atom2 = atoms[vpAtomID[index]];
                                            ox = Math.floor(0.5 + scaleFactor *
                                                    (atom2.x + ptranx));
                                            oy = Math.floor(0.5 + scaleFactor *
                                                    (atom2.y + ptrany));
                                            oz = Math.floor(0.5 + scaleFactor *
                                                    (atom2.z + ptranz));
                                            if (mi * mi + mj * mj + mk * mk < ox *
                                                    ox + oy * oy + oz * oz)
                                                vpAtomID[index] = atom.serial;
                                        }

                                    }// k
                                }// if
                            }// kk
                        }// jj
                    }// ii
                }// if
                nind++;
            }// j
        }// i
    };

    this.fillvoxelswaals = function(atoms, atomlist) {
        var i, il;
        for (i = 0, il = vpBits.length; i < il; i++)
            vpBits[i] &= ~ISDONE; // not isdone

        for (i in atomlist) {
            var atom = atoms[atomlist[i]];
            if (atom === undefined)
                continue;

            this.fillAtomWaals(atom, atoms);
        }
    };

    this.fillAtomWaals = function(atom, atoms) {
        var cx, cy, cz, ox, oy, oz, nind = 0;
        var mi, mj, mk, si, sj, sk, i, j, k, ii, jj, kk, n;
        cx = Math.floor(0.5 + scaleFactor * (atom.x + ptranx));
        cy = Math.floor(0.5 + scaleFactor * (atom.y + ptrany));
        cz = Math.floor(0.5 + scaleFactor * (atom.z + ptranz));

        var at = getVDWIndex(atom);
        var pWH = pWidth*pHeight;
        for (i = 0, n = widxz[at]; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (depty[at][nind] != -1) {
                    for (ii = -1; ii < 2; ii++) {
                        for (jj = -1; jj < 2; jj++) {
                            for (kk = -1; kk < 2; kk++) {
                                if (ii !== 0 && jj !== 0 && kk !== 0) {
                                    mi = ii * i;
                                    mk = kk * j;
                                    for (k = 0; k <= depty[at][nind]; k++) {
                                        mj = k * jj;
                                        si = cx + mi;
                                        sj = cy + mj;
                                        sk = cz + mk;
                                        if (si < 0 || sj < 0 || 
                                                sk < 0 || 
                                                si >= pLength || 
                                                sj >= pWidth || 
                                                sk >= pHeight)
                                            continue;
                                        var index = si * pWH + sj * pHeight + sk;
                                        if (!(vpBits[index] & ISDONE)) {
                                            vpBits[index] |= ISDONE;
                                            vpAtomID[index] = atom.serial;
                                        } else {
                                            var atom2 = atoms[vpAtomID[index]];
                                            ox = Math.floor(0.5 + scaleFactor * (atom2.x + ptranx));
                                            oy = Math.floor(0.5 + scaleFactor * (atom2.y + ptrany));
                                            oz = Math.floor(0.5 + scaleFactor * (atom2.z + ptranz));
                                            if (mi * mi + mj * mj + mk * mk < ox *
                                                    ox + oy * oy + oz * oz)
                                                vpAtomID[index] = atom.serial;
                                        }

                                    }// k
                                }// if
                            }// kk
                        }// jj
                    }// ii
                }// if
                nind++;
            }// j
        }// i
    };

    this.buildboundary = function() {
        var pWH = pWidth*pHeight;
        for (i = 0; i < pLength; i++) {
            for (j = 0; j < pHeight; j++) {
                for (k = 0; k < pWidth; k++) {
                    var index = i * pWH + k * pHeight + j;
                    if (vpBits[index] & INOUT) {
                        var flagbound = false;
                        var ii = 0;
                        while (ii < 26) {
                            var ti = i + nb[ii][0], tj = j + nb[ii][2], tk = k +
                                    nb[ii][1];
                            if (ti > -1 && 
                                ti < pLength && 
                                tk > -1 && 
                                tk < pWidth && 
                                tj > -1 && 
                                tj < pHeight && 
                                !(vpBits[ti * pWH + tk * pHeight + tj] & INOUT)) {
                                vpBits[index] |= ISBOUND;
                                break;
                            } else
                                ii++;
                        }
                    }
                }
            }
        }
    };

    // a little class for 3d array, should really generalize this and
    // use throughout...
    var PointGrid = function(length, width, height) {
        // the standard says this is zero initialized
        var data = new Int32Array(length * width * height * 3);

        // set position x,y,z to pt, which has ix,iy,and iz
        this.set = function(x, y, z, pt) {
            var index = ((((x * width) + y) * height) + z) * 3;
            data[index] = pt.ix;
            data[index + 1] = pt.iy;
            data[index + 2] = pt.iz;
        };

        // return point at x,y,z
        this.get = function(x, y, z) {
            var index = ((((x * width) + y) * height) + z) * 3;
            return {
                ix : data[index],
                iy : data[index + 1],
                iz : data[index + 2]
            };
        };
    };

    this.fastdistancemap = function() {
        var eliminate = 0;
        var certificate;
        var i, j, k, n;

        var boundPoint = new PointGrid(pLength, pWidth, pHeight);
        var pWH = pWidth*pHeight;
        var cutRSq = cutRadius*cutRadius;
        
        var inarray = [];
        var outarray = [];
        
        var index;
        
        for (i = 0; i < pLength; i++) {
            for (j = 0; j < pWidth; j++) {
                for (k = 0; k < pHeight; k++) {
                    index = i * pWH + j * pHeight + k;
                    vpBits[index] &= ~ISDONE; // isdone = false
                    if (vpBits[index] & INOUT) {
                        if (vpBits[index] & ISBOUND) {
                            var triple = {
                                ix : i,
                                iy : j,
                                iz : k
                            };
                            boundPoint.set(i, j, k, triple);
                            inarray.push(triple);
                            vpDistance[index] = 0;
                            vpBits[index] |= ISDONE;
                            vpBits[index] &= ~ISBOUND;
                        } 
                    }
                }
            }
        }

        do {
            outarray = this.fastoneshell(inarray, boundPoint);
            inarray = [];
            for (i = 0, n = outarray.length; i < n; i++) {
                index = pWH * outarray[i].ix + pHeight *
                    outarray[i].iy + outarray[i].iz;
                vpBits[index] &= ~ISBOUND;
                if (vpDistance[index] <= 1.0404 * cutRSq) {
                    inarray.push({
                        ix : outarray[i].ix,
                        iy : outarray[i].iy,
                        iz : outarray[i].iz
                    });
                }
            }
        } while (inarray.length !== 0);

        inarray = [];
        outarray = [];
        boundPoint = null;
        
        var cutsf = scaleFactor - 0.5;
        if (cutsf < 0)
            cutsf = 0;
        var cutoff = cutRSq - 0.50 / (0.1 + cutsf);
        for (i = 0; i < pLength; i++) {
            for (j = 0; j < pWidth; j++) {
                for (k = 0; k < pHeight; k++) {
                    index = i * pWH + j * pHeight + k;
                    vpBits[index] &= ~ISBOUND;
                    // ses solid
                    if (vpBits[index] & INOUT) {
                        if (!(vpBits[index] & ISDONE) ||
                                ((vpBits[index] & ISDONE) && vpDistance[index] >= cutoff)) {
                            vpBits[index] |= ISBOUND;
                        }
                    }
                }
            }
        }

    };

    this.fastoneshell = function(inarray, boundPoint) { // (int* innum,int
        // *allocout,voxel2
        // ***boundPoint, int*
        // outnum, int *elimi)
        var tx, ty, tz;
        var dx, dy, dz;
        var i, j, n;
        var square;
        var bp, index;
        var outarray = [];
        if (inarray.length === 0)
            return outarray;

        tnv = {
            ix : -1,
            iy : -1,
            iz : -1
        };
        var pWH = pWidth*pHeight;
        for ( i = 0, n = inarray.length; i < n; i++) {
            tx = inarray[i].ix;
            ty = inarray[i].iy;
            tz = inarray[i].iz;
            bp = boundPoint.get(tx, ty, tz);

            for (j = 0; j < 6; j++) {
                tnv.ix = tx + nb[j][0];
                tnv.iy = ty + nb[j][1];
                tnv.iz = tz + nb[j][2];
                
                if (tnv.ix < pLength && tnv.ix > -1 && tnv.iy < pWidth &&
                        tnv.iy > -1 && tnv.iz < pHeight && tnv.iz > -1) {
                    index = tnv.ix * pWH + pHeight * tnv.iy + tnv.iz;
                    
                    if ((vpBits[index] & INOUT) && !(vpBits[index] & ISDONE)) {
    
                        boundPoint.set(tnv.ix, tnv.iy, tz + nb[j][2], bp);
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        vpDistance[index] = square;
                        vpBits[index] |= ISDONE;
                        vpBits[index] |= ISBOUND;
    
                        outarray.push({
                            ix : tnv.ix,
                            iy : tnv.iy,
                            iz : tnv.iz
                        });
                    } else if ((vpBits[index] & INOUT) && (vpBits[index] & ISDONE)) {
    
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        if (square < vpDistance[index]) {
                            boundPoint.set(tnv.ix, tnv.iy, tnv.iz, bp);
    
                            vpDistance[index] = square;
                            if (!(vpBits[index] & ISBOUND)) {
                                vpBits[index] |= ISBOUND;
                                outarray.push({
                                    ix : tnv.ix,
                                    iy : tnv.iy,
                                    iz : tnv.iz
                                });
                            }
                        }
                    }
                }
            }
        }

        // console.log("part1", positout);

        for (i = 0, n = inarray.length; i < n; i++) {
            tx = inarray[i].ix;
            ty = inarray[i].iy;
            tz = inarray[i].iz;
            bp = boundPoint.get(tx, ty, tz);

            for (j = 6; j < 18; j++) {
                tnv.ix = tx + nb[j][0];
                tnv.iy = ty + nb[j][1];
                tnv.iz = tz + nb[j][2];

                if(tnv.ix < pLength && tnv.ix > -1 && tnv.iy < pWidth &&
                        tnv.iy > -1 && tnv.iz < pHeight && tnv.iz > -1) {
                    index = tnv.ix * pWH + pHeight * tnv.iy + tnv.iz;
                    
                    if ((vpBits[index] & INOUT) && !(vpBits[index] & ISDONE)) {
                        boundPoint.set(tnv.ix, tnv.iy, tz + nb[j][2], bp);
    
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        vpDistance[index] = square;
                        vpBits[index] |= ISDONE;
                        vpBits[index] |= ISBOUND;
    
                        outarray.push({
                            ix : tnv.ix,
                            iy : tnv.iy,
                            iz : tnv.iz
                        });
                    } else if ((vpBits[index] & INOUT) && (vpBits[index] & ISDONE)) {
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        if (square < vpDistance[index]) {
                            boundPoint.set(tnv.ix, tnv.iy, tnv.iz, bp);
                            vpDistance[index] = square;
                            if (!(vpBits[index] & ISBOUND)) {
                                vpBits[index] |= ISBOUND;
                                outarray.push({
                                    ix : tnv.ix,
                                    iy : tnv.iy,
                                    iz : tnv.iz
                                });
                            }
                        }
                    }
                }
            }
        }

        // console.log("part2", positout);

        for (i = 0, n = inarray.length; i < n; i++) {
            tx = inarray[i].ix;
            ty = inarray[i].iy;
            tz = inarray[i].iz;
            bp = boundPoint.get(tx, ty, tz);

            for (j = 18; j < 26; j++) {
                tnv.ix = tx + nb[j][0];
                tnv.iy = ty + nb[j][1];
                tnv.iz = tz + nb[j][2];

                if (tnv.ix < pLength && tnv.ix > -1 && tnv.iy < pWidth &&
                        tnv.iy > -1 && tnv.iz < pHeight && tnv.iz > -1) {
                    index = tnv.ix * pWH + pHeight * tnv.iy + tnv.iz;

                    if ((vpBits[index] & INOUT) && !(vpBits[index] & ISDONE)) {
                        boundPoint.set(tnv.ix, tnv.iy, tz + nb[j][2], bp);

                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        vpDistance[index] = square;
                        vpBits[index] |= ISDONE;
                        vpBits[index] |= ISBOUND;

                        outarray.push({
                            ix : tnv.ix,
                            iy : tnv.iy,
                            iz : tnv.iz
                        });
                    } else if ((vpBits[index] & INOUT)  && (vpBits[index] & ISDONE)) {
                        dx = tnv.ix - bp.ix;
                        dy = tnv.iy - bp.iy;
                        dz = tnv.iz - bp.iz;
                        square = dx * dx + dy * dy + dz * dz;
                        if (square < vpDistance[index]) {
                            boundPoint.set(tnv.ix, tnv.iy, tnv.iz, bp);

                            vpDistance[index] = square;
                            if (!(vpBits[index] & ISBOUND)) {
                                vpBits[index] |= ISBOUND;
                                outarray.push({
                                    ix : tnv.ix,
                                    iy : tnv.iy,
                                    iz : tnv.iz
                                });
                            }
                        }
                    }
                }
            }
        }

        // console.log("part3", positout);
        return outarray;
    };

    this.marchingcubeinit = function(stype) {
        for ( var i = 0, lim = vpBits.length; i < lim; i++) {
            if (stype == 1) {// vdw
                vpBits[i] &= ~ISBOUND;
            } else if (stype == 4) { // ses
                vpBits[i] &= ~ISDONE;
                if (vpBits[i] & ISBOUND)
                    vpBits[i] |= ISDONE;
                vpBits[i] &= ~ISBOUND;
            } else if (stype == 2) {// after vdw
                if ((vpBits[i] & ISBOUND) && (vpBits[i] & ISDONE))
                    vpBits[i] &= ~ISBOUND;
                else if ((vpBits[i] & ISBOUND) && !(vpBits[i] & ISDONE))
                    vpBits[i] |= ISDONE;
            } else if (stype == 3) { // sas
                vpBits[i] &= ~ISBOUND;
            }
        }
    };

    // this code allows me to empirically prune the marching cubes code tables
    // to more efficiently handle discrete data
    var counter = function() {
        var data = Array(256);
        for ( var i = 0; i < 256; i++)
            data[i] = [];

        this.incrementUsed = function(i, j) {
            if (typeof data[i][j] === 'undefined')
                data[i][j] = {
                    used : 0,
                    unused : 0
                };
            data[i][j].used++;
        };

        this.incrementUnused = function(i, j) {
            if (typeof data[i][j] === 'undefined')
                data[i][j] = {
                    used : 0,
                    unused : 0
                };
            data[i][j].unused++;

        };

        var redoTable = function(triTable) {
            var str = "[";
            for ( var i = 0; i < triTable.length; i++) {
                var code = 0;
                var table = triTable[i];
                for ( var j = 0; j < table.length; j++) {
                    code |= (1 << (table[j]));
                }
                str += "0x" + code.toString(16) + ", ";
            }
            str += "]";
            console.log(str);
        };

        this.print = function() {

            var table = MarchingCube.triTable;
            var str;
            var newtable = [];
            for ( var i = 0; i < table.length; i++) {
                var newarr = [];
                for ( var j = 0; j < table[i].length; j += 3) {
                    var k = j / 3;
                    if (typeof data[i][k] === 'undefined' || !data[i][k].unused) {
                        newarr.push(table[i][j]);
                        newarr.push(table[i][j + 1]);
                        newarr.push(table[i][j + 2]);
                    }
                    if (typeof data[i][k] === 'undefined')
                        console.log("undef " + i + "," + k);
                }
                newtable.push(newarr);
            }
            console.log(JSON.stringify(newtable));
            redoTable(newtable);
        };
    };
    
    this.marchingcube = function(stype) {
        this.marchingcubeinit(stype);
        verts = []; faces = [];   
        $3Dmol.MarchingCube.march(vpBits, verts, faces, {
            smooth : 1,
            nX : pLength,
            nY : pWidth,
            nZ : pHeight        
        });      

        var pWH = pWidth*pHeight;
        for (var i = 0, vlen = verts.length; i < vlen; i++) {
            verts[i]['atomid'] = vpAtomID[verts[i].x * pWH + pHeight *
                    verts[i].y + verts[i].z];
        }  

        $3Dmol.MarchingCube.laplacianSmooth(1, verts, faces);

    };


};

//This defines the $3Dmol object which is used to create viewers
//and configure system-wide settings

/** 
 * All of the functionality of $3Dmol.js is contained within the
 * $3Dmol global namespace
 * @namespace */
$3Dmol = (function(window) {
    
    var my = window['$3Dmol'] || {};
    //var $ = window['jQuery'];
    
    return my;

})(window);

/* The following code "phones home" to register that an ip 
   address has loaded 3Dmol.js.  Being able track this usage
   is very helpful when reporting to funding agencies.  Please
   leave this code in if you would like to increase the 
   likelihood of 3Dmo.js remaining supported.
*/
$.get("http://3dmol.csb.pitt.edu/track/report.cgi");
    
/**
 * Create and initialize an appropriate viewer at supplied HTML element using specification in config
 * @param {Object | string} element - Either HTML element or string identifier
 * @param {ViewerSpec} config Viewer specification
 * @return {$3Dmol.GLViewer} GLViewer, null if unable to instantiate WebGL
 * 
 * @example
 * // Assume there exists an HTML div with id "gldiv"
 * var element = $("#gldiv");
 * 
 * // Viewer config - properties 'defaultcolors' and 'callback'
 * var config = {defaultcolors: $3Dmol.rasmolElementColors };
 * 
 * // Create GLViewer within 'gldiv' 
 * var myviewer = $3Dmol.createViewer(element, config);
 * //'data' is a string containing molecule data in pdb format  
 * myviewer.addModel(data, "pdb");
 * myviewer.zoomTo();
 * myviewer.render();                        
 *                        
 */
$3Dmol.createViewer = function(element, config)
{
    if($.type(element) === "string")
        element = $("#"+element);
    if(!element) return;

    config = config || {};
 
    
    if(!config.defaultcolors)
        config.defaultcolors = $3Dmol.elementColors.defaultColors;

    //try to create the  viewer
    try {
    	return new $3Dmol.GLViewer(element, config.callback, config.defaultcolors, config.nomouse);
    }
    catch(e) {
    	throw "error creating viewer: "+e;
    }
    
    return null;
};
   
/**
 * Contains a dictionary of embedded viewers created from HTML elements
 * with a the viewer_3Dmoljs css class indexed by their id (or numerically
 * if they do not have an id).
*/
$3Dmol.viewers = {};

/**
 * Load a PDB/PubChem structure into existing viewer. Automatically calls 'zoomTo' and 'render' on viewer after loading model
 * 
 * @function $3Dmol.download
 * @param {string} query String specifying pdb or pubchem id; must be prefaced with "pdb: " or "cid: ", respectively
 * @param {$3Dmol.GLViewer} viewer - Add new model to existing viewer
 * @example
 * var myviewer = $3Dmol.createViewer(gldiv);
 * 
 * // GLModel 'm' created and loaded into glviewer for PDB id 2POR
 * var m = $3Dmol.download('pdb: 2POR', myviewer);
 * 
 * @return {$3Dmol.GLModel} GLModel
 */ 
$3Dmol.download = function(query, viewer) {
    var baseURL = '';
    var type = "";
    var m = null;
    if (query.substr(0, 4) === 'pdb:') {
        type = "pdb";
        query = query.substr(4).toUpperCase();
        if (!query.match(/^[1-9][A-Za-z0-9]{3}$/)) {
           alert("Wrong PDB ID"); return;
        }
        uri = "http://www.pdb.org/pdb/files/" + query + ".pdb";
    } else if (query.substr(0, 4) == 'cid:') {
        type = "sdf";
        query = query.substr(4);
        if (!query.match(/^[1-9]+$/)) {
           alert("Wrong Compound ID"); return;
        }
        uri = "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + query + 
          "/SDF?record_type=3d";
    }

   $.get(uri, function(ret) {
      viewer.addModel(ret, type);
      viewer.zoomTo();
      viewer.render();                            
   });
   
   return m;
};
       

/**
 * $3Dmol surface types
 * @enum {number}
 */
$3Dmol.SurfaceType = {
    VDW : 1,
    MS : 2,
    SAS : 3,
    SES  : 4
};

// in an attempt to reduce memory overhead, cache all $3Dmol.Colors
// this makes things a little faster
$3Dmol.CC = {
    cache : {},
    color : function(hex) {

        if(typeof(this.cache[hex]) !== "undefined") {
            return this.cache[hex];
        }
        else {
            hex = this.getHex(hex);
            var c = new $3Dmol.Color(hex);
            this.cache[hex] = c;
            return c;
        }
    },
    colorTab : {
        'white' : 0xFFFFFF,
        'silver' : 0xC0C0C0,
        'gray' : 0x808080,
        'grey' : 0x808080,
        'black' : 0x000000,
        'red' : 0xFF0000,
        'maroon' : 0x800000,
        'yellow' : 0xFFFF00,
        'orange' : 0xFF6600,
        'olive' : 0x808000,
        'lime' : 0x00FF00,
        'green' : 0x008000,
        'aqua' : 0x00FFFF,
        'cyan' : 0x00FFFF,
        'teal' : 0x008080,
        'blue' : 0x0000FF,
        'navy' : 0x000080,
        'fuchsia' : 0xFF00FF,
        'magenta' : 0xFF00FF,
        'purple' : 0x800080
    },    
    getHex : function(hex) {
        if (parseInt(hex))
            return parseInt(hex);
        
        else if (typeof(hex) === 'string') {
            
            return this.colorTab[hex.trim().toLowerCase()] || 0x000000;
        }
        
    }
    
};



$3Dmol['CC'] = $3Dmol.CC;
$3Dmol['CC']['color'] = $3Dmol.CC.color;

//Miscellaneous functions and classes - to be incorporated into $3Dmol proper
/**
 * 
 * @param {$3Dmol.Geometry} geometry
 * @param {$3Dmol.Mesh} mesh
 * @returns {undefined}
 */
$3Dmol.mergeGeos = function(geometry, mesh) {
    
    var meshGeo = mesh.geometry;
    
    if (meshGeo === undefined) 
        return;
    
    geometry.geometryGroups.push( meshGeo.geometryGroups[0] );
    
};

$3Dmol.multiLineString = function(f) {
    return f.toString()
            .replace(/^[^\/]+\/\*!?/, '')
            .replace(/\*\/[^\/]+$/, '');
            
};

/** 
 * Render surface synchronously if true
 * @param {boolean} [$3Dmol.SyncSurface=false]
 * @type {boolean} */
$3Dmol.syncSurface = false;

// Internet Explorer refuses to allow webworkers in data blobs.  I can find
// no way of checking for this feature directly, so must do a brower check
if(window.navigator.userAgent.indexOf('MSIE ') >= 0 ||
		window.navigator.userAgent.indexOf('Trident/') >= 0) {
	$3Dmol.syncSurface = true; // can't use webworkers
}

/**
 * Parse a string that represents a style or atom selection and convert it
 * into an object.  The goal is to make it easier to write out these specifications
 * without resorting to json. Objects cannot be defined recursively.
 * ; - delineates fields of the object 
 * : - if the field has a value other than an empty object, it comes after a colon
 * , - delineates key/value pairs of a value object
 *     If the value object consists of ONLY keys (no = present) the keys are 
 *     converted to a list.  Otherwise a object of key/value pairs is created with
 *     any missing values set to null
 * = OR ~ - separates key/value pairs of a value object, if not provided value is null
 * 	twiddle is supported since = has special meaning in URLs
 * @param (String) str
 * @returns {Object}
 */
$3Dmol.specStringToObject = function(str) {
	if(typeof(str) === "object") {
		return str; //not string, assume was converted already
	}
	else if(typeof(str) === "undefined" || str == null) {
		return str; 
	}
	var ret = {};
	var fields = str.split(';');
	for(var i = 0; i < fields.length; i++) {
		var fv = fields[i].split(':');
		var f = fv[0];
		var val = {};
		var vstr = fv[1];
		if(vstr) {
			vstr = vstr.replace(/~/g,"=");
			if(vstr.indexOf('=') !== -1) {
				//has key=value pairs, must be object
				var kvs = vstr.split(',');
				for(var j = 0; j < kvs.length; j++) {
					var kv = kvs[j].split('=',2);
					val[kv[0]] = kv[1];
				}
			}
			else if(vstr.indexOf(',') !== -1) {
				//has multiple values, must list
				val = vstr.split(',');
			}
			else {
				val = vstr; //value itself
			}
		}
		ret[f] = val;
	}
	
	return ret;
}



/*
//Hackish way to create webworker (independent of $3Dmol namespace) within minified file
//Had to hard-code uglify-js minified version of worker string in order to work with closure compiler...
$3Dmol.workerString = function(){

    self.onmessage = function(oEvent) {
    	var obj = oEvent.data;
    	var type = obj.type;
    	if (type < 0) // sending atom data, initialize
    	{
    		self.atomData = obj.atoms;
    		self.volume = obj.volume;
    		self.ps = new ProteinSurface();
    	} else {
    		var ps = self.ps;
    		ps.initparm(obj.expandedExtent, (type == 1) ? false : true, self.volume);
    		ps.fillvoxels(self.atomData, obj.extendedAtoms);
    		ps.buildboundary();
    		if (type === 4 || type === 2) {
    			ps.fastdistancemap();
                ps.boundingatom(false);
                ps.fillvoxelswaals(self.atomData, obj.extendedAtoms);	
            }		
    		ps.marchingcube(type);
    		var VandF = ps.getFacesAndVertices(obj.atomsToShow);
    		self.postMessage(VandF);
    	}
    };
    
}.toString().replace(/(^.*?\{|\}$)/g, "");
$3Dmol.workerString += ";var Vector3=function(x,y,z){this.x=x||0,this.y=y||0,this.z=z||0};Vector3.prototype={constructor:Vector3,copy:function(v){return this.x=v.x,this.y=v.y,this.z=v.z,this},multiplyScalar:function(s){return this.x*=s,this.y*=s,this.z*=s,this}}"
$3Dmol.workerString += ";var ISDONE=2";
$3Dmol.workerString += ",ProteinSurface=" + $3Dmol.ProteinSurface.toString().replace(/$3Dmol.MarchingCube./g, "");
$3Dmol.workerString += ",march=" + $3Dmol.MarchingCube.march.toString().replace(/$3Dmol./g, "");
$3Dmol.workerString += ",laplacianSmooth=" + $3Dmol.MarchingCube.laplacianSmooth.toString();

$3Dmol.workerString += ",edgeTable=new Uint32Array([" + $3Dmol.MarchingCube.edgeTable.toString() + "])";

$3Dmol.workerString += ",triTable=[";

for (var i = 0, il = $3Dmol.MarchingCube.triTable.length; i < il - 1; i++)
    $3Dmol.workerString += "[" + $3Dmol.MarchingCube.triTable[i].toString() + "],";

$3Dmol.workerString += "[]]";
*/

//TODO: Make this dynamic
//Otherwise, must uncomment and run the above with 3Dmol-min.js, and cut and paste below everytime ProteinSurface or MarchingCube modified
$3Dmol.workerString = 'self.onmessage=function(oEvent){var obj=oEvent.data,type=obj.type;if(0>type)self.atomData=obj.atoms,self.volume=obj.volume,self.ps=new ProteinSurface;else{var ps=self.ps;ps.initparm(obj.expandedExtent,1==type?!1:!0,self.volume),ps.fillvoxels(self.atomData,obj.extendedAtoms),ps.buildboundary(),(4===type||2===type)&&(ps.fastdistancemap(),ps.boundingatom(!1),ps.fillvoxelswaals(self.atomData,obj.extendedAtoms)),ps.marchingcube(type);var VandF=ps.getFacesAndVertices(obj.atomsToShow);self.postMessage(VandF)}};var Vector3=function(x,y,z){this.x=x||0,this.y=y||0,this.z=z||0};Vector3.prototype={constructor:Vector3,copy:function(v){return this.x=v.x,this.y=v.y,this.z=v.z,this},multiplyScalar:function(s){return this.x*=s,this.y*=s,this.z*=s,this}};var ISDONE=2,ProteinSurface=function (){var faces,verts,origextent,INOUT=1,ISDONE=2,ISBOUND=4,ptranx=0,ptrany=0,ptranz=0,probeRadius=1.4,defaultScaleFactor=2,scaleFactor=defaultScaleFactor,pHeight=0,pWidth=0,pLength=0,cutRadius=0,vpBits=null,vpDistance=null,vpAtomID=null,pminx=0,pminy=0,pminz=0,pmaxx=0,pmaxy=0,pmaxz=0,vdwRadii={H:1.2,Li:1.82,Na:2.27,K:2.75,C:1.7,N:1.55,O:1.52,F:1.47,P:1.8,S:1.8,CL:1.75,BR:1.85,SE:1.9,ZN:1.39,CU:1.4,NI:1.63,X:2},getVDWIndex=function(atom){return atom.elem&&"undefined"!=typeof vdwRadii[atom.elem]?atom.elem:"X"},depty={},widxz={},nb=[new Int32Array([1,0,0]),new Int32Array([-1,0,0]),new Int32Array([0,1,0]),new Int32Array([0,-1,0]),new Int32Array([0,0,1]),new Int32Array([0,0,-1]),new Int32Array([1,1,0]),new Int32Array([1,-1,0]),new Int32Array([-1,1,0]),new Int32Array([-1,-1,0]),new Int32Array([1,0,1]),new Int32Array([1,0,-1]),new Int32Array([-1,0,1]),new Int32Array([-1,0,-1]),new Int32Array([0,1,1]),new Int32Array([0,1,-1]),new Int32Array([0,-1,1]),new Int32Array([0,-1,-1]),new Int32Array([1,1,1]),new Int32Array([1,1,-1]),new Int32Array([1,-1,1]),new Int32Array([-1,1,1]),new Int32Array([1,-1,-1]),new Int32Array([-1,-1,1]),new Int32Array([-1,1,-1]),new Int32Array([-1,-1,-1])];this.getFacesAndVertices=function(atomlist){var i,il,atomsToShow={};for(i=0,il=atomlist.length;il>i;i++)atomsToShow[atomlist[i]]=!0;var vertices=verts;for(i=0,il=vertices.length;il>i;i++)vertices[i].x=vertices[i].x/scaleFactor-ptranx,vertices[i].y=vertices[i].y/scaleFactor-ptrany,vertices[i].z=vertices[i].z/scaleFactor-ptranz;var finalfaces=[];for(i=0,il=faces.length;il>i;i+=3){var fa=faces[i],fb=faces[i+1],fc=faces[i+2],a=vertices[fa].atomid,b=vertices[fb].atomid,c=vertices[fc].atomid,which=a;if(which>b&&(which=b),which>c&&(which=c),atomsToShow[which]){{vertices[faces[i]],vertices[faces[i+1]],vertices[faces[i+2]]}fa!==fb&&fb!==fc&&fa!==fc&&(finalfaces.push(fa),finalfaces.push(fb),finalfaces.push(fc))}}return vpBits=null,vpDistance=null,vpAtomID=null,{vertices:vertices,faces:finalfaces}},this.initparm=function(extent,btype,volume){volume>1e6&&(scaleFactor=defaultScaleFactor/2);var margin=1/scaleFactor*5.5;origextent=extent,pminx=extent[0][0],pmaxx=extent[1][0],pminy=extent[0][1],pmaxy=extent[1][1],pminz=extent[0][2],pmaxz=extent[1][2],btype?(pminx-=probeRadius+margin,pminy-=probeRadius+margin,pminz-=probeRadius+margin,pmaxx+=probeRadius+margin,pmaxy+=probeRadius+margin,pmaxz+=probeRadius+margin):(pminx-=margin,pminy-=margin,pminz-=margin,pmaxx+=margin,pmaxy+=margin,pmaxz+=margin),pminx=Math.floor(pminx*scaleFactor)/scaleFactor,pminy=Math.floor(pminy*scaleFactor)/scaleFactor,pminz=Math.floor(pminz*scaleFactor)/scaleFactor,pmaxx=Math.ceil(pmaxx*scaleFactor)/scaleFactor,pmaxy=Math.ceil(pmaxy*scaleFactor)/scaleFactor,pmaxz=Math.ceil(pmaxz*scaleFactor)/scaleFactor,ptranx=-pminx,ptrany=-pminy,ptranz=-pminz,pLength=Math.ceil(scaleFactor*(pmaxx-pminx))+1,pWidth=Math.ceil(scaleFactor*(pmaxy-pminy))+1,pHeight=Math.ceil(scaleFactor*(pmaxz-pminz))+1,this.boundingatom(btype),cutRadius=probeRadius*scaleFactor,vpBits=new Uint8Array(pLength*pWidth*pHeight),vpDistance=new Float64Array(pLength*pWidth*pHeight),vpAtomID=new Int32Array(pLength*pWidth*pHeight)},this.boundingatom=function(btype){var txz,tdept,sradius,tradius=[];flagradius=btype;for(var i in vdwRadii)if(vdwRadii.hasOwnProperty(i)){var r=vdwRadii[i];for(tradius[i]=btype?(r+probeRadius)*scaleFactor+.5:r*scaleFactor+.5,sradius=tradius[i]*tradius[i],widxz[i]=Math.floor(tradius[i])+1,depty[i]=new Int32Array(widxz[i]*widxz[i]),indx=0,j=0;j<widxz[i];j++)for(k=0;k<widxz[i];k++)txz=j*j+k*k,txz>sradius?depty[i][indx]=-1:(tdept=Math.sqrt(sradius-txz),depty[i][indx]=Math.floor(tdept)),indx++}},this.fillvoxels=function(atoms,atomlist){var i,il;for(i=0,il=vpBits.length;il>i;i++)vpBits[i]=0,vpDistance[i]=-1,vpAtomID[i]=-1;for(i in atomlist){var atom=atoms[atomlist[i]];void 0!==atom&&this.fillAtom(atom,atoms)}for(i=0,il=vpBits.length;il>i;i++)vpBits[i]&INOUT&&(vpBits[i]|=ISDONE)},this.fillAtom=function(atom,atoms){var cx,cy,cz,ox,oy,oz,mi,mj,mk,i,j,k,si,sj,sk,ii,jj,kk,n;cx=Math.floor(.5+scaleFactor*(atom.x+ptranx)),cy=Math.floor(.5+scaleFactor*(atom.y+ptrany)),cz=Math.floor(.5+scaleFactor*(atom.z+ptranz));var at=getVDWIndex(atom),nind=0,pWH=pWidth*pHeight;for(i=0,n=widxz[at];n>i;i++)for(j=0;n>j;j++){if(-1!=depty[at][nind])for(ii=-1;2>ii;ii++)for(jj=-1;2>jj;jj++)for(kk=-1;2>kk;kk++)if(0!==ii&&0!==jj&&0!==kk)for(mi=ii*i,mk=kk*j,k=0;k<=depty[at][nind];k++)if(mj=k*jj,si=cx+mi,sj=cy+mj,sk=cz+mk,!(0>si||0>sj||0>sk||si>=pLength||sj>=pWidth||sk>=pHeight)){var index=si*pWH+sj*pHeight+sk;if(vpBits[index]&INOUT){var atom2=atoms[vpAtomID[index]];ox=Math.floor(.5+scaleFactor*(atom2.x+ptranx)),oy=Math.floor(.5+scaleFactor*(atom2.y+ptrany)),oz=Math.floor(.5+scaleFactor*(atom2.z+ptranz)),ox*ox+oy*oy+oz*oz>mi*mi+mj*mj+mk*mk&&(vpAtomID[index]=atom.serial)}else vpBits[index]|=INOUT,vpAtomID[index]=atom.serial}nind++}},this.fillvoxelswaals=function(atoms,atomlist){var i,il;for(i=0,il=vpBits.length;il>i;i++)vpBits[i]&=~ISDONE;for(i in atomlist){var atom=atoms[atomlist[i]];void 0!==atom&&this.fillAtomWaals(atom,atoms)}},this.fillAtomWaals=function(atom,atoms){var cx,cy,cz,ox,oy,oz,mi,mj,mk,si,sj,sk,i,j,k,ii,jj,kk,n,nind=0;cx=Math.floor(.5+scaleFactor*(atom.x+ptranx)),cy=Math.floor(.5+scaleFactor*(atom.y+ptrany)),cz=Math.floor(.5+scaleFactor*(atom.z+ptranz));var at=getVDWIndex(atom),pWH=pWidth*pHeight;for(i=0,n=widxz[at];n>i;i++)for(j=0;n>j;j++){if(-1!=depty[at][nind])for(ii=-1;2>ii;ii++)for(jj=-1;2>jj;jj++)for(kk=-1;2>kk;kk++)if(0!==ii&&0!==jj&&0!==kk)for(mi=ii*i,mk=kk*j,k=0;k<=depty[at][nind];k++)if(mj=k*jj,si=cx+mi,sj=cy+mj,sk=cz+mk,!(0>si||0>sj||0>sk||si>=pLength||sj>=pWidth||sk>=pHeight)){var index=si*pWH+sj*pHeight+sk;if(vpBits[index]&ISDONE){var atom2=atoms[vpAtomID[index]];ox=Math.floor(.5+scaleFactor*(atom2.x+ptranx)),oy=Math.floor(.5+scaleFactor*(atom2.y+ptrany)),oz=Math.floor(.5+scaleFactor*(atom2.z+ptranz)),ox*ox+oy*oy+oz*oz>mi*mi+mj*mj+mk*mk&&(vpAtomID[index]=atom.serial)}else vpBits[index]|=ISDONE,vpAtomID[index]=atom.serial}nind++}},this.buildboundary=function(){var pWH=pWidth*pHeight;for(i=0;pLength>i;i++)for(j=0;pHeight>j;j++)for(k=0;pWidth>k;k++){var index=i*pWH+k*pHeight+j;if(vpBits[index]&INOUT)for(var ii=0;26>ii;){var ti=i+nb[ii][0],tj=j+nb[ii][2],tk=k+nb[ii][1];if(ti>-1&&pLength>ti&&tk>-1&&pWidth>tk&&tj>-1&&pHeight>tj&&!(vpBits[ti*pWH+tk*pHeight+tj]&INOUT)){vpBits[index]|=ISBOUND;break}ii++}}};var PointGrid=function(length,width,height){var data=new Int32Array(length*width*height*3);this.set=function(x,y,z,pt){var index=3*((x*width+y)*height+z);data[index]=pt.ix,data[index+1]=pt.iy,data[index+2]=pt.iz},this.get=function(x,y,z){var index=3*((x*width+y)*height+z);return{ix:data[index],iy:data[index+1],iz:data[index+2]}}};this.fastdistancemap=function(){var i,j,k,n,index,boundPoint=new PointGrid(pLength,pWidth,pHeight),pWH=pWidth*pHeight,cutRSq=cutRadius*cutRadius,inarray=[],outarray=[];for(i=0;pLength>i;i++)for(j=0;pWidth>j;j++)for(k=0;pHeight>k;k++)if(index=i*pWH+j*pHeight+k,vpBits[index]&=~ISDONE,vpBits[index]&INOUT&&vpBits[index]&ISBOUND){var triple={ix:i,iy:j,iz:k};boundPoint.set(i,j,k,triple),inarray.push(triple),vpDistance[index]=0,vpBits[index]|=ISDONE,vpBits[index]&=~ISBOUND}do for(outarray=this.fastoneshell(inarray,boundPoint),inarray=[],i=0,n=outarray.length;n>i;i++)index=pWH*outarray[i].ix+pHeight*outarray[i].iy+outarray[i].iz,vpBits[index]&=~ISBOUND,vpDistance[index]<=1.0404*cutRSq&&inarray.push({ix:outarray[i].ix,iy:outarray[i].iy,iz:outarray[i].iz});while(0!==inarray.length);inarray=[],outarray=[],boundPoint=null;var cutsf=scaleFactor-.5;0>cutsf&&(cutsf=0);var cutoff=cutRSq-.5/(.1+cutsf);for(i=0;pLength>i;i++)for(j=0;pWidth>j;j++)for(k=0;pHeight>k;k++)index=i*pWH+j*pHeight+k,vpBits[index]&=~ISBOUND,vpBits[index]&INOUT&&(!(vpBits[index]&ISDONE)||vpBits[index]&ISDONE&&vpDistance[index]>=cutoff)&&(vpBits[index]|=ISBOUND)},this.fastoneshell=function(inarray,boundPoint){var tx,ty,tz,dx,dy,dz,i,j,n,square,bp,index,outarray=[];if(0===inarray.length)return outarray;tnv={ix:-1,iy:-1,iz:-1};var pWH=pWidth*pHeight;for(i=0,n=inarray.length;n>i;i++)for(tx=inarray[i].ix,ty=inarray[i].iy,tz=inarray[i].iz,bp=boundPoint.get(tx,ty,tz),j=0;6>j;j++)tnv.ix=tx+nb[j][0],tnv.iy=ty+nb[j][1],tnv.iz=tz+nb[j][2],tnv.ix<pLength&&tnv.ix>-1&&tnv.iy<pWidth&&tnv.iy>-1&&tnv.iz<pHeight&&tnv.iz>-1&&(index=tnv.ix*pWH+pHeight*tnv.iy+tnv.iz,vpBits[index]&INOUT&&!(vpBits[index]&ISDONE)?(boundPoint.set(tnv.ix,tnv.iy,tz+nb[j][2],bp),dx=tnv.ix-bp.ix,dy=tnv.iy-bp.iy,dz=tnv.iz-bp.iz,square=dx*dx+dy*dy+dz*dz,vpDistance[index]=square,vpBits[index]|=ISDONE,vpBits[index]|=ISBOUND,outarray.push({ix:tnv.ix,iy:tnv.iy,iz:tnv.iz})):vpBits[index]&INOUT&&vpBits[index]&ISDONE&&(dx=tnv.ix-bp.ix,dy=tnv.iy-bp.iy,dz=tnv.iz-bp.iz,square=dx*dx+dy*dy+dz*dz,square<vpDistance[index]&&(boundPoint.set(tnv.ix,tnv.iy,tnv.iz,bp),vpDistance[index]=square,vpBits[index]&ISBOUND||(vpBits[index]|=ISBOUND,outarray.push({ix:tnv.ix,iy:tnv.iy,iz:tnv.iz})))));for(i=0,n=inarray.length;n>i;i++)for(tx=inarray[i].ix,ty=inarray[i].iy,tz=inarray[i].iz,bp=boundPoint.get(tx,ty,tz),j=6;18>j;j++)tnv.ix=tx+nb[j][0],tnv.iy=ty+nb[j][1],tnv.iz=tz+nb[j][2],tnv.ix<pLength&&tnv.ix>-1&&tnv.iy<pWidth&&tnv.iy>-1&&tnv.iz<pHeight&&tnv.iz>-1&&(index=tnv.ix*pWH+pHeight*tnv.iy+tnv.iz,vpBits[index]&INOUT&&!(vpBits[index]&ISDONE)?(boundPoint.set(tnv.ix,tnv.iy,tz+nb[j][2],bp),dx=tnv.ix-bp.ix,dy=tnv.iy-bp.iy,dz=tnv.iz-bp.iz,square=dx*dx+dy*dy+dz*dz,vpDistance[index]=square,vpBits[index]|=ISDONE,vpBits[index]|=ISBOUND,outarray.push({ix:tnv.ix,iy:tnv.iy,iz:tnv.iz})):vpBits[index]&INOUT&&vpBits[index]&ISDONE&&(dx=tnv.ix-bp.ix,dy=tnv.iy-bp.iy,dz=tnv.iz-bp.iz,square=dx*dx+dy*dy+dz*dz,square<vpDistance[index]&&(boundPoint.set(tnv.ix,tnv.iy,tnv.iz,bp),vpDistance[index]=square,vpBits[index]&ISBOUND||(vpBits[index]|=ISBOUND,outarray.push({ix:tnv.ix,iy:tnv.iy,iz:tnv.iz})))));for(i=0,n=inarray.length;n>i;i++)for(tx=inarray[i].ix,ty=inarray[i].iy,tz=inarray[i].iz,bp=boundPoint.get(tx,ty,tz),j=18;26>j;j++)tnv.ix=tx+nb[j][0],tnv.iy=ty+nb[j][1],tnv.iz=tz+nb[j][2],tnv.ix<pLength&&tnv.ix>-1&&tnv.iy<pWidth&&tnv.iy>-1&&tnv.iz<pHeight&&tnv.iz>-1&&(index=tnv.ix*pWH+pHeight*tnv.iy+tnv.iz,vpBits[index]&INOUT&&!(vpBits[index]&ISDONE)?(boundPoint.set(tnv.ix,tnv.iy,tz+nb[j][2],bp),dx=tnv.ix-bp.ix,dy=tnv.iy-bp.iy,dz=tnv.iz-bp.iz,square=dx*dx+dy*dy+dz*dz,vpDistance[index]=square,vpBits[index]|=ISDONE,vpBits[index]|=ISBOUND,outarray.push({ix:tnv.ix,iy:tnv.iy,iz:tnv.iz})):vpBits[index]&INOUT&&vpBits[index]&ISDONE&&(dx=tnv.ix-bp.ix,dy=tnv.iy-bp.iy,dz=tnv.iz-bp.iz,square=dx*dx+dy*dy+dz*dz,square<vpDistance[index]&&(boundPoint.set(tnv.ix,tnv.iy,tnv.iz,bp),vpDistance[index]=square,vpBits[index]&ISBOUND||(vpBits[index]|=ISBOUND,outarray.push({ix:tnv.ix,iy:tnv.iy,iz:tnv.iz})))));return outarray},this.marchingcubeinit=function(stype){for(var i=0,lim=vpBits.length;lim>i;i++)1==stype?vpBits[i]&=~ISBOUND:4==stype?(vpBits[i]&=~ISDONE,vpBits[i]&ISBOUND&&(vpBits[i]|=ISDONE),vpBits[i]&=~ISBOUND):2==stype?vpBits[i]&ISBOUND&&vpBits[i]&ISDONE?vpBits[i]&=~ISBOUND:vpBits[i]&ISBOUND&&!(vpBits[i]&ISDONE)&&(vpBits[i]|=ISDONE):3==stype&&(vpBits[i]&=~ISBOUND)};this.marchingcube=function(stype){this.marchingcubeinit(stype),verts=[],faces=[],march(vpBits,verts,faces,{smooth:1,nX:pLength,nY:pWidth,nZ:pHeight});for(var pWH=pWidth*pHeight,i=0,vlen=verts.length;vlen>i;i++)verts[i].atomid=vpAtomID[verts[i].x*pWH+pHeight*verts[i].y+verts[i].z];laplacianSmooth(1,verts,faces)}},march=function (data,verts,faces,spec){var i,il,fulltable=!!spec.fulltable,origin=spec.hasOwnProperty("origin")&&spec.origin.hasOwnProperty("x")?spec.origin:{x:0,y:0,z:0},voxel=!!spec.voxel,nX=spec.nX||0,nY=spec.nY||0,nZ=spec.nZ||0,scale=spec.scale||1,unitCube=new Vector3(1,1,1).multiplyScalar(scale),vertnums=new Int32Array(nX*nY*nZ);for(i=0,il=vertnums.length;il>i;++i)vertnums[i]=-1;var getVertex=function(i,j,k,code,p1,p2){var pt=new Vector3;pt.copy(origin);var val1=!!(code&1<<p1),val2=!!(code&1<<p2),p=p1;!val1&&val2&&(p=p2),1&p&&k++,2&p&&j++,4&p&&i++,pt.x+=unitCube.x*i,pt.y+=unitCube.y*j,pt.z+=unitCube.z*k;var index=(nY*i+j)*nZ+k;return voxel?(verts.push(pt),verts.length-1):(vertnums[index]<0&&(vertnums[index]=verts.length,verts.push(pt)),vertnums[index])},intersects=new Int32Array(12),etable=fulltable?edgeTable2:edgeTable,tritable=fulltable?triTable2:triTable;for(i=0;nX-1>i;++i)for(var j=0;nY-1>j;++j)for(var k=0;nZ-1>k;++k){for(var code=0,p=0;8>p;++p){var index=(nY*(i+((4&p)>>2))+j+((2&p)>>1))*nZ+k+(1&p),val=!!(data[index]&ISDONE);code|=val<<p}if(0!==code&&255!==code){var ecode=etable[code];if(0!==ecode){var ttable=tritable[code];1&ecode&&(intersects[0]=getVertex(i,j,k,code,0,1)),2&ecode&&(intersects[1]=getVertex(i,j,k,code,1,3)),4&ecode&&(intersects[2]=getVertex(i,j,k,code,3,2)),8&ecode&&(intersects[3]=getVertex(i,j,k,code,2,0)),16&ecode&&(intersects[4]=getVertex(i,j,k,code,4,5)),32&ecode&&(intersects[5]=getVertex(i,j,k,code,5,7)),64&ecode&&(intersects[6]=getVertex(i,j,k,code,7,6)),128&ecode&&(intersects[7]=getVertex(i,j,k,code,6,4)),256&ecode&&(intersects[8]=getVertex(i,j,k,code,0,4)),512&ecode&&(intersects[9]=getVertex(i,j,k,code,1,5)),1024&ecode&&(intersects[10]=getVertex(i,j,k,code,3,7)),2048&ecode&&(intersects[11]=getVertex(i,j,k,code,2,6));for(var t=0;t<ttable.length;t+=3){var a=intersects[ttable[t]],b=intersects[ttable[t+1]],c=intersects[ttable[t+2]];voxel&&t>=3&&(verts.push(verts[a]),a=verts.length-1,verts.push(verts[b]),b=verts.length-1,verts.push(verts[c]),c=verts.length-1),faces.push(a),faces.push(b),faces.push(c)}}}}},laplacianSmooth=function (numiter,verts,faces){var i,il,j,jl,k,tps=new Array(verts.length);for(i=0,il=verts.length;il>i;i++)tps[i]={x:0,y:0,z:0};var flagvert,vertdeg=new Array(20);for(i=0;20>i;i++)vertdeg[i]=new Array(verts.length);for(i=0,il=verts.length;il>i;i++)vertdeg[0][i]=0;for(i=0,il=faces.length/3;il>i;i++){var aoffset=3*i,boffset=3*i+1,coffset=3*i+2;for(flagvert=!0,j=0,jl=vertdeg[0][faces[aoffset]];jl>j;j++)if(faces[boffset]==vertdeg[j+1][faces[aoffset]]){flagvert=!1;break}for(flagvert&&(vertdeg[0][faces[aoffset]]++,vertdeg[vertdeg[0][faces[aoffset]]][faces[aoffset]]=faces[boffset]),flagvert=!0,j=0,jl=vertdeg[0][faces[aoffset]];jl>j;j++)if(faces[coffset]==vertdeg[j+1][faces[aoffset]]){flagvert=!1;break}for(flagvert&&(vertdeg[0][faces[aoffset]]++,vertdeg[vertdeg[0][faces[aoffset]]][faces[aoffset]]=faces[coffset]),flagvert=!0,j=0,jl=vertdeg[0][faces[boffset]];jl>j;j++)if(faces[aoffset]==vertdeg[j+1][faces[boffset]]){flagvert=!1;break}for(flagvert&&(vertdeg[0][faces[boffset]]++,vertdeg[vertdeg[0][faces[boffset]]][faces[boffset]]=faces[aoffset]),flagvert=!0,j=0,jl=vertdeg[0][faces[boffset]];jl>j;j++)if(faces[coffset]==vertdeg[j+1][faces[boffset]]){flagvert=!1;break}for(flagvert&&(vertdeg[0][faces[boffset]]++,vertdeg[vertdeg[0][faces[boffset]]][faces[boffset]]=faces[coffset]),flagvert=!0,j=0;j<vertdeg[0][faces[coffset]];j++)if(faces[aoffset]==vertdeg[j+1][faces[coffset]]){flagvert=!1;break}for(flagvert&&(vertdeg[0][faces[coffset]]++,vertdeg[vertdeg[0][faces[coffset]]][faces[coffset]]=faces[aoffset]),flagvert=!0,j=0,jl=vertdeg[0][faces[coffset]];jl>j;j++)if(faces[boffset]==vertdeg[j+1][faces[coffset]]){flagvert=!1;break}flagvert&&(vertdeg[0][faces[coffset]]++,vertdeg[vertdeg[0][faces[coffset]]][faces[coffset]]=faces[boffset])}var wt=1,wt2=.5;for(k=0;numiter>k;k++){for(i=0,il=verts.length;il>i;i++)if(vertdeg[0][i]<3)tps[i].x=verts[i].x,tps[i].y=verts[i].y,tps[i].z=verts[i].z;else if(3==vertdeg[0][i]||4==vertdeg[0][i]){for(tps[i].x=0,tps[i].y=0,tps[i].z=0,j=0,jl=vertdeg[0][i];jl>j;j++)tps[i].x+=verts[vertdeg[j+1][i]].x,tps[i].y+=verts[vertdeg[j+1][i]].y,tps[i].z+=verts[vertdeg[j+1][i]].z;tps[i].x+=wt2*verts[i].x,tps[i].y+=wt2*verts[i].y,tps[i].z+=wt2*verts[i].z,tps[i].x/=wt2+vertdeg[0][i],tps[i].y/=wt2+vertdeg[0][i],tps[i].z/=wt2+vertdeg[0][i]}else{for(tps[i].x=0,tps[i].y=0,tps[i].z=0,j=0,jl=vertdeg[0][i];jl>j;j++)tps[i].x+=verts[vertdeg[j+1][i]].x,tps[i].y+=verts[vertdeg[j+1][i]].y,tps[i].z+=verts[vertdeg[j+1][i]].z;tps[i].x+=wt*verts[i].x,tps[i].y+=wt*verts[i].y,tps[i].z+=wt*verts[i].z,tps[i].x/=wt+vertdeg[0][i],tps[i].y/=wt+vertdeg[0][i],tps[i].z/=wt+vertdeg[0][i]}for(i=0,il=verts.length;il>i;i++)verts[i].x=tps[i].x,verts[i].y=tps[i].y,verts[i].z=tps[i].z}},edgeTable=new Uint32Array([0,0,0,0,0,0,0,2816,0,0,0,1792,0,3328,3584,3840,0,0,0,138,0,21,0,134,0,0,0,652,0,2067,3865,3600,0,0,0,42,0,0,0,294,0,0,21,28,0,3875,1049,3360,0,168,162,170,0,645,2475,2210,0,687,293,172,4010,3747,3497,3232,0,0,0,0,0,69,0,900,0,0,0,1792,138,131,1608,1920,0,81,0,2074,84,85,84,86,0,81,0,3676,330,1105,1881,1616,0,0,0,42,0,69,0,502,0,0,21,3580,138,2035,1273,1520,2816,104,2337,106,840,581,367,102,2816,3695,3429,3180,1898,1635,1385,1120,0,0,0,0,0,0,0,3910,0,0,69,588,42,2083,41,2880,0,0,0,1722,0,2293,4095,3830,0,255,757,764,2538,2291,3065,2800,0,0,81,338,0,3925,1119,3414,84,855,85,340,2130,2899,89,2384,1792,712,194,1162,4036,3781,3535,3270,708,719,197,204,3018,2755,2505,2240,0,0,0,0,168,420,168,1958,162,162,676,2988,170,163,680,928,3328,3096,3328,3642,52,53,1855,1590,2340,2111,2869,2620,298,51,825,560,3584,3584,3090,3482,1668,1941,1183,1430,146,2975,2069,2460,154,915,153,400,3840,3592,3329,3082,1796,1541,1295,1030,2818,2575,2309,2060,778,515,265,0]),triTable=[[],[],[],[],[],[],[],[11,9,8],[],[],[],[8,10,9],[],[10,8,11],[9,11,10],[8,10,9,8,11,10],[],[],[],[1,7,3],[],[4,2,0],[],[2,1,7],[],[],[],[2,7,3,2,9,7],[],[1,4,11,1,0,4],[3,8,0,11,9,4,11,10,9],[4,11,9,11,10,9],[],[],[],[5,3,1],[],[],[],[2,5,8,2,1,5],[],[],[2,4,0],[3,2,4],[],[0,9,1,8,10,5,8,11,10],[3,4,0,3,10,4],[5,8,10,8,11,10],[],[3,5,7],[7,1,5],[1,7,3,1,5,7],[],[9,2,0,9,7,2],[0,3,8,1,7,11,1,5,7],[11,1,7,1,5,7],[],[9,1,0,5,3,2,5,7,3],[8,2,5,8,0,2],[2,5,3,5,7,3],[3,9,1,3,8,9,7,11,10,7,10,5],[9,1,0,10,7,11,10,5,7],[3,8,0,7,10,5,7,11,10],[11,5,7,11,10,5],[],[],[],[],[],[0,6,2],[],[7,2,9,7,9,8],[],[],[],[8,10,9],[7,1,3],[7,1,0],[6,9,3,6,10,9],[7,10,8,10,9,8],[],[6,0,4],[],[11,1,4,11,3,1],[2,4,6],[2,0,4,2,4,6],[2,4,6],[1,4,2,4,6,2],[],[6,0,4],[],[2,11,3,6,9,4,6,10,9],[8,6,1,8,1,3],[10,0,6,0,4,6],[8,0,3,9,6,10,9,4,6],[10,4,6,10,9,4],[],[],[],[5,3,1],[],[0,6,2],[],[7,4,8,5,2,1,5,6,2],[],[],[2,4,0],[7,4,8,2,11,3,10,5,6],[7,1,3],[5,6,10,0,9,1,8,7,4],[5,6,10,7,0,3,7,4,0],[10,5,6,4,8,7],[9,11,8],[3,5,6],[0,5,11,0,11,8],[6,3,5,3,1,5],[3,9,6,3,8,9],[9,6,0,6,2,0],[0,3,8,2,5,6,2,1,5],[1,6,2,1,5,6],[9,11,8],[1,0,9,6,10,5,11,3,2],[6,10,5,2,8,0,2,11,8],[3,2,11,10,5,6],[10,5,6,9,3,8,9,1,3],[0,9,1,5,6,10],[8,0,3,10,5,6],[10,5,6],[],[],[],[],[],[],[],[1,10,2,9,11,6,9,8,11],[],[],[6,0,2],[3,6,9,3,2,6],[3,5,1],[0,5,1,0,11,5],[0,3,5],[6,9,11,9,8,11],[],[],[],[4,5,9,7,1,10,7,3,1],[],[11,6,7,2,4,5,2,0,4],[11,6,7,8,0,3,1,10,2,9,4,5],[6,7,11,1,10,2,9,4,5],[],[4,1,0,4,5,1,6,7,3,6,3,2],[9,4,5,0,6,7,0,2,6],[4,5,9,6,3,2,6,7,3],[6,7,11,5,3,8,5,1,3],[6,7,11,4,1,0,4,5,1],[4,5,9,3,8,0,11,6,7],[9,4,5,7,11,6],[],[],[0,6,4],[8,6,4,8,1,6],[],[0,10,2,0,9,10,4,8,11,4,11,6],[10,2,1,6,0,3,6,4,0],[10,2,1,11,4,8,11,6,4],[4,2,6],[1,0,9,2,4,8,2,6,4],[2,4,0,2,6,4],[8,2,4,2,6,4],[11,4,1,11,6,4],[0,9,1,4,11,6,4,8,11],[3,6,0,6,4,0],[8,6,4,8,11,6],[10,8,9],[6,3,9,6,7,3],[6,7,1],[10,7,1,7,3,1],[7,11,6,8,10,2,8,9,10],[11,6,7,10,0,9,10,2,0],[2,1,10,7,11,6,8,0,3],[1,10,2,6,7,11],[7,2,6,7,9,2],[1,0,9,3,6,7,3,2,6],[7,0,6,0,2,6],[2,7,3,2,6,7],[7,11,6,3,9,1,3,8,9],[9,1,0,11,6,7],[0,3,8,11,6,7],[11,6,7],[],[],[],[],[5,3,7],[8,5,2,8,7,5],[5,3,7],[1,10,2,5,8,7,5,9,8],[1,7,5],[1,7,5],[9,2,7,9,7,5],[11,3,2,8,5,9,8,7,5],[1,3,7,1,7,5],[0,7,1,7,5,1],[9,3,5,3,7,5],[9,7,5,9,8,7],[8,10,11],[3,4,10,3,10,11],[8,10,11],[5,9,4,1,11,3,1,10,11],[2,4,5],[5,2,4,2,0,4],[0,3,8,5,9,4,10,2,1],[2,1,10,9,4,5],[2,8,5,2,11,8],[3,2,11,1,4,5,1,0,4],[9,4,5,8,2,11,8,0,2],[11,3,2,9,4,5],[8,5,3,5,1,3],[5,0,4,5,1,0],[3,8,0,4,5,9],[9,4,5],[11,9,10],[11,9,10],[1,11,4,1,10,11],[8,7,4,11,1,10,11,3,1],[2,7,9,2,9,10],[4,8,7,0,10,2,0,9,10],[2,1,10,0,7,4,0,3,7],[10,2,1,8,7,4],[1,7,4],[3,2,11,4,8,7,9,1,0],[11,4,2,4,0,2],[2,11,3,7,4,8],[4,1,7,1,3,7],[1,0,9,8,7,4],[3,4,0,3,7,4],[8,7,4],[8,9,10,8,10,11],[3,9,11,9,10,11],[0,10,8,10,11,8],[10,3,1,10,11,3],[2,8,10,8,9,10],[9,2,0,9,10,2],[8,0,3,1,10,2],[10,2,1],[1,11,9,11,8,9],[11,3,2,0,9,1],[11,0,2,11,8,0],[11,3,2],[8,1,3,8,9,1],[9,1,0],[8,0,3],[]]';

$3Dmol.SurfaceWorker = window.URL.createObjectURL(new Blob([$3Dmol.workerString]));

$3Dmol['workerString'] = $3Dmol.workerString;
$3Dmol['SurfaceWorker'] = $3Dmol.SurfaceWorker;
//auto-initialization
//Create embedded viewer from HTML attributes if true

$(document).ready(function() {

    if ($(".viewer_3Dmoljs")[0] !== undefined)
        $3Dmol.autoinit = true;
        
    if ($3Dmol.autoinit) { 
        $3Dmol.viewers = {};
        var nviewers = 0;
        $(".viewer_3Dmoljs").each( function() {
            var viewerdiv = $(this);
            var datauri = null;
            
        
            var callback = (typeof(window[viewerdiv.data("callback")]) === 'function') ? 
                    window[viewerdiv.data("callback")] : null;
            
            if (viewerdiv.data("pdb"))
                datauri = "http://www.pdb.org/pdb/files/" + viewerdiv.data("pdb") + ".pdb";
            else if (viewerdiv.data("href"))
                datauri = viewerdiv.data("href");
                
            var bgcolor = Number(viewerdiv.data("backgroundcolor")) || 0x000000;
            var style = {line:{}};
            if(viewerdiv.data("style")) style = $3Dmol.specStringToObject(viewerdiv.data("style"));
            var select = {};
            if(viewerdiv.data("select")) select = $3Dmol.specStringToObject(viewerdiv.data("select"));
            var selectstylelist = [];
            var surfaces = [];
            var labels = [];
            var d = viewerdiv.data();
            
            //let users specify individual but matching select/style tags, eg.
            //data-select1 data-style1
            var stylere = /style(.+)/;
            var surfre = /surface(.*)/;
            var reslabre = /labelres(.*)/;
            var keys = [];
            for(var dataname in d) {
            	if(d.hasOwnProperty(dataname)) {
            		keys.push(dataname);
            	}
            }
            keys.sort();
            for(var i = 0; i < keys.length; i++) {
            	var dataname = keys[i];
            	var m = stylere.exec(dataname);
            	if(m) {
            		var selname = "select"+m[1];
            		var newsel = $3Dmol.specStringToObject(d[selname]);
            		var styleobj = $3Dmol.specStringToObject(d[dataname]);
            		selectstylelist.push([newsel,styleobj]);
            	}         
            	m = surfre.exec(dataname);
            	if(m) {
            		var selname = "select"+m[1];
            		var newsel = $3Dmol.specStringToObject(d[selname]);
            		var styleobj = $3Dmol.specStringToObject(d[dataname]);
            		surfaces.push([newsel,styleobj]);
            	}
            	m = reslabre.exec(dataname);
            	if(m) {
            		var selname = "select"+m[1];
            		var newsel = $3Dmol.specStringToObject(d[selname]);
            		var styleobj = $3Dmol.specStringToObject(d[dataname]);
            		labels.push([newsel,styleobj]);
            	}
            }
            
            try {
            	var glviewer = $3Dmol.viewers[this.id || nviewers++] = $3Dmol.createViewer(viewerdiv, {defaultcolors: $3Dmol.rasmolElementColors, callback: function(viewer) {            
            		viewer.setBackgroundColor(bgcolor);            
            	}});
            } catch ( error ) {
            	//for autoload, provide a useful error message
            	window.location = "http://get.webgl.org";            		
            }
            
            
            if (datauri) {  
                
                var type = viewerdiv.data("type") || viewerdiv.data("datatype");
                if(!type) {
                	type = datauri.substr(datauri.lastIndexOf('.')+1).substring(0,3);
                	if(type.length != 3) type = "pdb";
                }
                $.get(datauri, function(ret) {
                    glviewer.addModel(ret, type);
                    glviewer.setStyle(select,style);
                    for(var i = 0; i < selectstylelist.length; i++) {
                    	var sel = selectstylelist[i][0] || {};
                    	var sty = selectstylelist[i][1] || {"line":{}}
                    	glviewer.setStyle(sel, sty);
                    }
                    for(var i = 0; i < surfaces.length; i++) {
                    	var sel = surfaces[i][0] || {};
                    	var sty = surfaces[i][1] || {}
                    	glviewer.addSurface($3Dmol.SurfaceType.VDW, sty, sel, sel);
                    }
                    for(var i = 0; i < labels.length; i++) {
                    	var sel = labels[i][0] || {};
                    	var sty = labels[i][1] || {}
                    	glviewer.addResLabels(sel, sty);
                    }
                    // Allowing us to fire callback after viewer has added model
                    if (callback) 
                        callback(glviewer);                    
                    
                    glviewer.zoomTo();
                    glviewer.render();          
                    
                }, 'text');
           
            }
            
            else {
                
                if (viewerdiv.data("element")) {
                    var moldata = $("#" + viewerdiv.data("element")).val() || "";
                    var type = viewerdiv.data("type") || viewerdiv.data("datatype");

                    if (!type){

                        console.log("Warning: No type specified for embedded viewer with moldata from " + viewerdiv.data("element") +
                                    "\n assuming type 'pdb'")

                        type = 'pdb';
                    }

                    glviewer.addModel(moldata, type);
                	glviewer.setStyle(select, style);
                    for(var i = 0; i < selectstylelist.length; i++) {
                    	var sel = selectstylelist[i][0] || {};
                    	var sty = selectstylelist[i][1] || {"line":{}}
                    	glviewer.setStyle(sel, sty);
                    }                
                }


                if (callback) 
                    callback(glviewer);
                
                glviewer.zoomTo();
                glviewer.render();
            }
            
        });              
    }
});
    

/** Preset element coloring - from individual element colors to entire mappings (e.g. '$3Dmol.elementColors.Jmol' colors atoms with Jmol stylings)
 * @struct
 */
$3Dmol.elementColors = $3Dmol.elementColors || {};

$3Dmol.elementColors.defaultColor = 0xff1493;

/** @property Jmol-like element colors*/
$3Dmol.elementColors.Jmol = {
		'H': 0xFFFFFF,
		'He': 0xD9FFFF,
		'HE': 0xD9FFFF,
		'Li': 0xCC80FF,
		'LI': 0xCC80FF,
		'B': 0xFFB5B5,
		'C': 0x909090,
		'N': 0x3050F8,
		'O': 0xFF0D0D,
		'F': 0x90E050,
		'Na': 0xAB5CF2,
		'NA': 0xAB5CF2,
		'Mg': 0x8AFF00,
		'MG': 0x8AFF00,
		'Al': 0xBFA6A6,
		'AL': 0xBFA6A6,
		'Si': 0xF0C8A0,
		'SI': 0xF0C8A0,
		'P': 0xFF8000,
		'S': 0xFFFF30,
		'Cl': 0x1FF01F,
		'CL': 0x1FF01F,
		'Ca': 0x3DFF00,
		'CA': 0x3DFF00,
		'Ti': 0xBFC2C7,
		'TI': 0xBFC2C7,
		'Cr': 0x8A99C7,
		'CR': 0x8A99C7,
		'Mn': 0x9C7AC7,
		'MN': 0x9C7AC7,
		'Fe': 0xE06633,
		'FE': 0xE06633,
		'Ni': 0x50D050,
		'NI': 0x50D050,
		'Cu': 0xC88033,
		'CU': 0xC88033,
		'Zn': 0x7D80B0,
		'ZN': 0x7D80B0,
		'Br': 0xA62929,
		'BR': 0xA62929,
		'Ag': 0xC0C0C0,
		'AG': 0xC0C0C0,
		'I': 0x940094,
		'Ba': 0x00C900,
		'BA': 0x00C900,
		'Au': 0xFFD123,
		'AU': 0xFFD123
};

/** @property rasmol-like element colors */
$3Dmol.elementColors.rasmol = {
		'H': 0xFFFFFF,
		'He': 0xFFC0CB,
		'HE': 0xFFC0CB,
		'Li': 0xB22222,
		'LI': 0xB22222,
		'B': 0x00FF00,
		'C': 0xC8C8C8,
		'N': 0x8F8FFF,
		'O': 0xF00000,
		'F': 0xDAA520,
		'Na': 0x0000FF,
		'NA': 0x0000FF,
		'Mg': 0x228B22,
		'MG': 0x228B22,
		'Al': 0x808090,
		'AL': 0x808090,
		'Si': 0xDAA520,
		'SI': 0xDAA520,
		'P': 0xFFA500,
		'S': 0xFFC832,
		'Cl': 0x00FF00,
		'CL': 0x00FF00,
		'Ca': 0x808090,
		'CA': 0x808090,
		'Ti': 0x808090,
		'TI': 0x808090,
		'Cr': 0x808090,
		'CR': 0x808090,
		'Mn': 0x808090,
		'MN': 0x808090,
		'Fe': 0xFFA500,
		'FE': 0xFFA500,
		'Ni': 0xA52A2A,
		'NI': 0xA52A2A,
		'Cu': 0xA52A2A,
		'CU': 0xA52A2A,
		'Zn': 0xA52A2A,
		'ZN': 0xA52A2A,
		'Br': 0xA52A2A,
		'BR': 0xA52A2A,
		'Ag': 0x808090,
		'AG': 0x808090,
		'I': 0xA020F0,
		'Ba': 0xFFA500,
		'BA': 0xFFA500,
		'Au': 0xDAA520,
		'AU': 0xDAA520	
};

$3Dmol.elementColors.defaultColors = $3Dmol.elementColors.rasmol;

$3Dmol.elementColors.greenCarbon = $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.greenCarbon['C'] = 0x00ff00;

$3Dmol.elementColors.cyanCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.cyanCarbon['C'] = 0x00ffff;

$3Dmol.elementColors.magentaCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.magentaCarbon['C'] = 0xff00ff;

$3Dmol.elementColors.yellowCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.yellowCarbon['C'] = 0xffff00;

$3Dmol.elementColors.whiteCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.whiteCarbon['C'] = 0xffffff;

$3Dmol.elementColors.orangeCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.orangeCarbon['C'] = 0xff6600;

$3Dmol.elementColors.purpleCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.purpleCarbon['C'] = 0x800080;

$3Dmol.elementColors.blueCarbon =  $.extend({},$3Dmol.elementColors.defaultColors);
$3Dmol.elementColors.blueCarbon['C'] = 0x0000ff;
//glcartoon.js
//This contains all the routines for rendering a cartoon given a set
//of atoms with assigned secondary structure

//TODO: generate normals directly in drawStrip and drawThinStrip

var $3Dmol = $3Dmol || {};


/**@typedef CartoonStyleSpec
 * @prop {string} color - solid color, may specify as 'spectrum'
 * @prop {string} style - style of cartoon rendering (currently just default and trace)
 */

/**
 * @ignore
 * @param {$3Dmol.Object3D} group
 * @param {AtomSpec} atomlist
 * @param {$3Dmol.Gradient} gradientscheme
 */
$3Dmol.drawCartoon = (function() {

    var axisDIV = 5; // 3 still gives acceptable quality
    var strandDIV = 6;
    var nucleicAcidStrandDIV = 4;
    var tubeDIV = 8;
    var coilWidth = 0.3;
    var helixSheetWidth = 1.3;
    var nucleicAcidWidth = 0.8;
    var defaultThickness = 0.4; 

    // helper functions

    // Catmull-Rom subdivision
    var subdivide = function(_points, DIV) { // points as Vector3
        var ret = [];
        var points = _points;
        points = []; // Smoothing test
        points.push(_points[0]);
        
        var i, lim, size;
        var p0, p1, p2, p3, v0, v1;
        
        for (i = 1, lim = _points.length - 1; i < lim; i++) {
            p1 = _points[i]; p2 = _points[i + 1];
            if (p1.smoothen)
                points.push(new $3Dmol.Vector3((p1.x + p2.x) / 2, (p1.y + p2.y) / 2,
                        (p1.z + p2.z) / 2));
            else
                points.push(p1);
        }
        points.push(_points[_points.length - 1]);

        
        for (i = -1, size = points.length; i <= size - 3; i++) {
            p0 = points[(i === -1) ? 0 : i];
            p1 = points[i + 1]; p2 = points[i + 2];
            p3 = points[(i === size - 3) ? size - 1 : i + 3];
            v0 = new $3Dmol.Vector3().subVectors(p2, p0).multiplyScalar(0.5);
            v1 = new $3Dmol.Vector3().subVectors(p3, p1).multiplyScalar(0.5);

            for ( var j = 0; j < DIV; j++) {
                var t = 1.0 / DIV * j;
                var x = p1.x + t * v0.x + t * t * 
                        (-3 * p1.x + 3 * p2.x - 2 * v0.x - v1.x) + t * t * t *
                        (2 * p1.x - 2 * p2.x + v0.x + v1.x);
                var y = p1.y + t * v0.y + t * t * 
                        (-3 * p1.y + 3 * p2.y - 2 * v0.y - v1.y) + t * t * t *
                        (2 * p1.y - 2 * p2.y + v0.y + v1.y);
                var z = p1.z + t * v0.z + t * t * 
                        (-3 * p1.z + 3 * p2.z - 2 * v0.z - v1.z) + t * t * t * 
                        (2 * p1.z - 2 * p2.z + v0.z + v1.z);
                        
                var pt = new $3Dmol.Vector3(x, y, z);
                
                var atomIndex = Math.floor( (ret.length+2) / DIV);
                
                if (_points[atomIndex] !== undefined && _points[atomIndex].atom !== undefined)
                    pt.atom = _points[atomIndex].atom;
                    
                ret.push(pt);
            }
        }
        ret.push(points[points.length - 1]);
        return ret;
    };

    var drawThinStrip = function(group, p1, p2, colors, div) {
    
        var geo = new $3Dmol.Geometry(true);       
        var offset, vertoffset;
        var color;

        
        for ( var i = 0, lim = p1.length; i < lim; i++) {
            
            color = $3Dmol.CC.color(colors[Math.round((i - 1) / div)]);
           
            geoGroup = geo.updateGeoGroup(2);
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            var faceArray = geoGroup.faceArray;
            offset = geoGroup.vertices; vertoffset = offset*3;
            
            vertexArray[vertoffset] = p1[i].x;
            vertexArray[vertoffset+1] = p1[i].y;
            vertexArray[vertoffset+2] = p1[i].z;
            
            vertexArray[vertoffset+3] = p2[i].x;
            vertexArray[vertoffset+4] = p2[i].y;
            vertexArray[vertoffset+5] = p2[i].z;
            
            for (var j = 0; j < 6; ++j) {                
                colorArray[vertoffset+3*j] = color.r; colorArray[vertoffset+1+3*j] = color.g; colorArray[vertoffset+2+3*j] = color.b;                
            }            
           
            if (i > 0) {
                var faces = [offset, offset + 1, offset - 1, offset - 2];
                var faceoffset = geoGroup.faceidx;
                
                faceArray[faceoffset] = faces[0]; faceArray[faceoffset+1] = faces[1]; faceArray[faceoffset+2] = faces[3];
                faceArray[faceoffset+3] = faces[1]; faceArray[faceoffset+4] = faces[2]; faceArray[faceoffset+5] = faces[3];

                geoGroup.faceidx += 6;
            }
            
            geoGroup.vertices += 2;
        }
        
        geo.initTypedArrays();
        geo.setUpNormals();
        
        var material = new $3Dmol.MeshLambertMaterial();
        material.vertexColors = $3Dmol.FaceColors;
                material.side = $3Dmol.DoubleSide;
        var mesh = new $3Dmol.Mesh(geo, material);
        group.add(mesh);
    };

    var drawStrip = function(group, p1, p2, colors, div, thickness) {
        if ((p1.length) < 2)
            return;
        div = div || axisDIV;
        p1 = subdivide(p1, div);
        p2 = subdivide(p2, div);
        if (!thickness)
            return drawThinStrip(group, p1, p2, colors, div);

        var geo = new $3Dmol.Geometry(true);
        
        //var vs = geo.vertices, fs = geo.faces;
                var vs = [], fs = [];
        var axis, p1v, p2v, a1v, a2v;
        
        var faces = [ [ 0, 2, -6, -8 ], [ -4, -2, 6, 4 ], [ 7, -1, -5, 3 ],
                [ -3, 5, 1, -7 ] ];
                
        var offset, vertoffset, faceoffset;
        var color;
        var currentAtom, lastAtom;
        var i, lim, j;
        var face1, face2, face3;
        var geoGroup;
        
        for (i = 0, lim = p1.length; i < lim; i++) {
        
            color = $3Dmol.CC.color(colors[Math.round((i - 1) / div)]);
            
            vs.push(p1v = p1[i]); // 0
            vs.push(p1v); // 1
            vs.push(p2v = p2[i]); // 2
            vs.push(p2v); // 3
            if (i < lim - 1) {
                var toNext = p1[i + 1].clone().sub(p1[i]);
                var toSide = p2[i].clone().sub(p1[i]);
                axis = toSide.cross(toNext).normalize().multiplyScalar(
                        thickness);
            }
            vs.push(a1v = p1[i].clone().add(axis)); // 4
            vs.push(a1v); // 5
            vs.push(a2v = p2[i].clone().add(axis)); // 6
            vs.push(a2v); // 7
            
            if (p1v.atom !== undefined)
                currentAtom = p1v.atom;
            
            geoGroup = geo.updateGeoGroup(8);
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            var faceArray = geoGroup.faceArray;
            offset = geoGroup.vertices; vertoffset = offset*3;
            
            vertexArray[vertoffset] = p1v.x; vertexArray[vertoffset+1] = p1v.y; vertexArray[vertoffset+2] = p1v.z;
            vertexArray[vertoffset+3] = p1v.x; vertexArray[vertoffset+4] = p1v.y; vertexArray[vertoffset+5] = p1v.z;
            vertexArray[vertoffset+6] = p2v.x; vertexArray[vertoffset+7] = p2v.y; vertexArray[vertoffset+8] = p2v.z;
            vertexArray[vertoffset+9] = p2v.x; vertexArray[vertoffset+10] = p2v.y; vertexArray[vertoffset+11] = p2v.z;
            vertexArray[vertoffset+12] = a1v.x; vertexArray[vertoffset+13] = a1v.y; vertexArray[vertoffset+14] = a1v.z;
            vertexArray[vertoffset+15] = a1v.x; vertexArray[vertoffset+16] = a1v.y; vertexArray[vertoffset+17] = a1v.z;
            vertexArray[vertoffset+18] = a2v.x; vertexArray[vertoffset+19] = a2v.y; vertexArray[vertoffset+20] = a2v.z;
            vertexArray[vertoffset+21] = a2v.x; vertexArray[vertoffset+22] = a2v.y; vertexArray[vertoffset+23] = a2v.z;
            
            for (j = 0; j < 8; ++j) {                
                colorArray[vertoffset+3*j] = color.r; colorArray[vertoffset+1+3*j] = color.g; colorArray[vertoffset+2+3*j] = color.b;                
            }
            
            if (i > 0) {
             
                //both points have distinct atoms
                var diffAtoms = ((lastAtom !== undefined && currentAtom !== undefined) && lastAtom.serial !== currentAtom.serial);
                
                for (j = 0; j < 4; j++ ) {
                
                    var face = [offset + faces[j][0], offset + faces[j][1], offset + faces[j][2], offset + faces[j][3]];
                    
                    faceoffset = geoGroup.faceidx;    
                    
                    faceArray[faceoffset] = face[0]; faceArray[faceoffset+1] = face[1]; faceArray[faceoffset+2] = face[3];             
                    faceArray[faceoffset+3] = face[1]; faceArray[faceoffset+4] = face[2]; faceArray[faceoffset+5] = face[3];
                    
                    geoGroup.faceidx += 6;
                    
                    if (currentAtom.clickable || lastAtom.clickable) {
                        
                        var p1a = vs[face[3]].clone(), p1b = vs[face[0]].clone(),
                            p2a = vs[face[2]].clone(), p2b = vs[face[1]].clone();
                        
                        p1a.atom = vs[face[3]].atom || null; //should be same
                        p2a.atom = vs[face[2]].atom || null; 
                        
                        
                        p1b.atom = vs[face[0]].atom || null; //should be same                      
                        p2b.atom = vs[face[1]].atom || null; 
                        
                        if (diffAtoms) {
                            var m1 = p1a.clone().add(p1b).multiplyScalar(0.5);
                            var m2 = p2a.clone().add(p2b).multiplyScalar(0.5);
                            var m = p1a.clone().add(p2b).multiplyScalar(0.5);
                            
                            if (j % 2 === 0)
                            {
                                if (lastAtom.clickable) {
                                    face1 = new $3Dmol.Triangle(m1, m, p1a);
                                    face2 = new $3Dmol.Triangle(m2, p2a, m);
                                    face3 = new $3Dmol.Triangle(m, p2a, p1a);
                                    lastAtom.intersectionShape.triangle.push(face1);
                                    lastAtom.intersectionShape.triangle.push(face2);
                                    lastAtom.intersectionShape.triangle.push(face3);
                                }
                                
                                if (currentAtom.clickable) {
                                    face1 = new $3Dmol.Triangle(p1b, p2b, m);
                                    face2 = new $3Dmol.Triangle(p2b, m2, m);
                                    face3 = new $3Dmol.Triangle(p1b, m, m1);
                                    currentAtom.intersectionShape.triangle.push(face1);
                                    currentAtom.intersectionShape.triangle.push(face2);
                                    currentAtom.intersectionShape.triangle.push(face3);
                                }
                            }
                            else {
                                if (currentAtom.clickable) {
                                    face1 = new $3Dmol.Triangle(m1, m, p1a);
                                    face2 = new $3Dmol.Triangle(m2, p2a, m);
                                    face3 = new $3Dmol.Triangle(m, p2a, p1a);
                                    currentAtom.intersectionShape.triangle.push(face1);
                                    currentAtom.intersectionShape.triangle.push(face2);
                                    currentAtom.intersectionShape.triangle.push(face3);
                                }
                                
                                if (lastAtom.clickable) {
                                    face1 = new $3Dmol.Triangle(p1b, p2b, m);
                                    face2 = new $3Dmol.Triangle(p2b, m2, m);
                                    face3 = new $3Dmol.Triangle(p1b, m, m1);
                                    lastAtom.intersectionShape.triangle.push(face1);
                                    lastAtom.intersectionShape.triangle.push(face2);
                                    lastAtom.intersectionShape.triangle.push(face3);
                                }                          
                            }
                            
                        }
                        
                        //face for single atom
                        else if (currentAtom.clickable) {
                            face1 = new $3Dmol.Triangle(p1b, p2b, p1a);
                            face2 = new $3Dmol.Triangle(p2b, p2a, p1a);
                            currentAtom.intersectionShape.triangle.push(face1);
                            currentAtom.intersectionShape.triangle.push(face2);
                        }
                        
                    }
                    
                }
            }
            
            geoGroup.vertices += 8;
            lastAtom = currentAtom;
        }
        

        var vsize = vs.length - 8; // Cap
        
        geoGroup = geo.updateGeoGroup(8);
        var vertexArray = geoGroup.vertexArray;
        var colorArray = geoGroup.colorArray;
        var faceArray = geoGroup.faceArray;
        offset = geoGroup.vertices; vertoffset = offset*3; faceoffset = geoGroup.faceidx;
        
        for (i = 0; i < 4; i++) {
            vs.push(vs[i * 2]);
            vs.push(vs[vsize + i * 2]);
            
            var v1 = vs[i * 2], v2 = vs[vsize + i * 2];
            
            vertexArray[vertoffset+6*i] = v1.x; vertexArray[vertoffset+1+6*i] = v1.y; vertexArray[vertoffset+2+6*i] = v1.z;
            vertexArray[vertoffset+3+6*i] = v2.x; vertexArray[vertoffset+4+6*i] = v2.y; vertexArray[vertoffset+5+6*i] = v2.z;
            
            colorArray[vertoffset+6*i] = color.r; colorArray[vertoffset+1+6*i] = color.g; colorArray[vertoffset+2+6*i] = color.b;
            colorArray[vertoffset+3+6*i] = color.r; colorArray[vertoffset+4+6*i] = color.g; colorArray[vertoffset+5+6*i] = color.b;

        }
        
        vsize += 8;
                
        face1 = [offset, offset + 2, offset + 6, offset + 4];
        face2 = [offset + 1, offset + 5, offset + 7, offset + 3];
        
        faceArray[faceoffset] = face1[0]; faceArray[faceoffset+1] = face1[1]; faceArray[faceoffset+2] = face1[3];
        faceArray[faceoffset+3] = face1[1]; faceArray[faceoffset+4] = face1[2]; faceArray[faceoffset+5] = face1[3];
        faceArray[faceoffset+6] = face2[0]; faceArray[faceoffset+7] = face2[1]; faceArray[faceoffset+8] = face2[3];
        faceArray[faceoffset+9] = face2[1]; faceArray[faceoffset+10] = face2[2]; faceArray[faceoffset+11] = face2[3];
        
        geoGroup.faceidx += 12;
        geoGroup.vertices += 8;
        
        //TODO: Add intersection planes for caps
        
        geo.initTypedArrays();
        geo.setUpNormals();
        
        var material = new $3Dmol.MeshLambertMaterial();
        material.vertexColors = $3Dmol.FaceColors;
        material.side = $3Dmol.DoubleSide;
        var mesh = new $3Dmol.Mesh(geo, material);
        group.add(mesh);
        
    };

    //TODO: Need to update this (will we ever use this?)
    var drawSmoothCurve = function(group, _points, width, colors, div) {
        if (_points.length === 0)
            return;

        div = (div === undefined) ? 5 : div;

        var geo = new $3Dmol.Geometry();
        var points = subdivide(_points, div);
                /*
        for ( var i = 0; i < points.length; i++) {
            geo.vertices.push(points[i]);
            geo.colors.push($3Dmol.color(colors[(i == 0) ? 0 : Math.round((i - 1)
                    / div)]));
        }
                */
        var lineMaterial = new $3Dmol.LineBasicMaterial({
            linewidth : width
        });
        lineMaterial.vertexColors = true;
        var line = new $3Dmol.Line(geo, lineMaterial);
        line.type = $3Dmol.LineStrip;
        group.add(line);
    };

    var drawStrand = function(group, atomlist, num, div, fill, coilWidth,
            helixSheetWidth, doNotSmoothen, gradientscheme) {
        num = num || strandDIV;
        div = div || axisDIV;
        doNotSmoothen = !!(doNotSmoothen);
        var points = [];
        var i, j, k;
        for (k = 0; k < num; k++)
            points[k] = [];
        var colors = [];
        var currentChain, currentReschain, currentResi, currentCA, currentAtom;
        var prevCO = null, ss = null, ssborder = false;
        var tracegeo = null;
        var atomcolor;
        var thickness = defaultThickness;
        
        for (i in atomlist) {
            var atom = atomlist[i];
            if (atom === undefined)
                continue;

            if ((atom.atom == 'O' || atom.atom == 'CA') && !atom.hetflag) {
            	
            	//get style
            	var cstyle = atom.style.cartoon;
                if (atom.atom == 'CA') {
                    //set atom color
                	var prevatomcolor = atomcolor;
                    atomcolor = atom.color;
                    if (gradientscheme) {
                        atomcolor = gradientscheme.valueToHex(atom.resi, gradientscheme.range());
                    }
                    else if(typeof(cstyle.color) !== "undefined") {
                        atomcolor = cstyle.color;
                    }
                    
                    if($.isNumeric(cstyle.thickness)) {
                    	thickness = cstyle.thickness;
                    } else {
                    	thickness = defaultThickness;
                    }
                    
                    if(cstyle.style == 'trace') { //trace draws every pair of atoms
                		
                		//trace draws straight lines between CAs
                		if(currentChain != atom.chain || currentResi + 1 != atom.resi) {
                			//do not draw connections between chains; ignore differences
                			//in reschain to properly support CA only files
                    		if(!tracegeo) tracegeo = new $3Dmol.Geometry(true);

                		} else if(currentCA) {
                			//if both atoms same color, draw single cylinder
                			if(prevatomcolor == atomcolor) {
                				var C = $3Dmol.CC.color(atomcolor);
                    			$3Dmol.GLDraw.drawCylinder(tracegeo, currentCA, atom, thickness, C, true, true);
                			}
                			else {
                                var mp = new $3Dmol.Vector3().addVectors(currentCA, atom).multiplyScalar(0.5);
                                var C1 = $3Dmol.CC.color(prevatomcolor);
                                var C2 = $3Dmol.CC.color(atomcolor);
                    			$3Dmol.GLDraw.drawCylinder(tracegeo, currentCA, mp, thickness, C1, true, false);
                       			$3Dmol.GLDraw.drawCylinder(tracegeo, mp, atom, thickness, C2, false, true);
                			}                                    
                		}
                    }
                    else if (currentChain != atom.chain || currentResi + 1 != atom.resi || currentReschain != atom.reschain) {
                		//end of chain of connected residues, draw accumulated points
                       for (j = 0; !thickness && j < num; j++)
                            drawSmoothCurve(group, points[j], 1, colors, div);
                        if (fill)
                            drawStrip(group, points[0], points[num - 1],
                                    colors, div, thickness);
                    	
                        points = [];
                        for (k = 0; k < num; k++)
                            points[k] = [];
                        colors = [];
                        prevCO = null;
                        ss = null;
                        ssborder = false;
                    }                	 
                    	
                    currentCA = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                    currentAtom = atom;
                    currentChain = atom.chain;
                    currentReschain = atom.reschain;
                    currentResi = atom.resi;
                    ss = atom.ss;
                    ssborder = atom.ssbegin || atom.ssend;

                    colors.push(atomcolor);
                    
                    if (atom.clickable === true && (atom.intersectionShape === undefined || atom.intersectionShape.triangle === undefined)) 
                        atom.intersectionShape = {sphere : null, cylinder : [], line : [], triangle : []};
                    
                }                 
                else if(cstyle.style != 'trace') { // O, unneeded for trace style
                	//the oxygen atom is used to orient the direction of the draw strip
                    var O = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                    O.sub(currentCA);
                    O.normalize(); // can be omitted for performance
                    O.multiplyScalar((ss == 'c') ? coilWidth : helixSheetWidth);
                    if (prevCO !== null && O.dot(prevCO) < 0)
                        O.negate();
                    prevCO = O;
                    for (j = 0; j < num; j++) {
                        var delta = -1 + 2 / (num - 1) * j;
                        var v = new $3Dmol.Vector3(currentCA.x + prevCO.x * delta,
                                currentCA.y + prevCO.y * delta, currentCA.z + prevCO.z * delta);
                        v.atom = currentAtom;
                        if (!doNotSmoothen && ss == 's')
                            v.smoothen = true;
                        points[j].push(v);
                    }
                }
            }
        }
        for (j = 0; !thickness && j < num; j++)
            drawSmoothCurve(group, points[j], 1, colors, div);
        if (fill)
            drawStrip(group, points[0], points[num - 1], colors, div, thickness);
        
        if(tracegeo) {
        	var material = new $3Dmol.MeshLambertMaterial();
        	material.vertexColors = $3Dmol.FaceColors;
        	material.side = $3Dmol.DoubleSide;
        	var mesh = new $3Dmol.Mesh(tracegeo, material);
        	group.add(mesh);
        }
    };

    // actual function call
    var drawCartoon = function(group, atomlist, gradientscheme) {
        
        drawStrand(group, atomlist, 2, undefined, true, coilWidth, helixSheetWidth,
                false, gradientscheme);
    };

    return drawCartoon;
})();
//

var $3Dmol = $3Dmol || {};

/**
 * Lower level utilities for creating WebGL shape geometries.
 * These are not intended for general consumption.
 * @namespace $3Dmol.GLDraw
  */
$3Dmol.GLDraw = (function() {

	var draw = {}; // object for exporting functions

	// Rotation matrix around z and x axis -
	// according to y basis vector
	// TODO: Try to optimize this (square roots?)
	var getRotationMatrix = function() {

		var d = new $3Dmol.Vector3();
		// var rot = new Float32Array(9);

		return function(dir) {

			d.set(dir[0], dir[1], dir[2]);

			var dx = d.x, dy = d.y, dz = d.z;

			var dxy = Math.sqrt(dx * dx + dy * dy);
			var dxz, dyz;

			var sinA, cosA, sinB, cosB, sinC, cosC;

			// about z axis - Phi
			if (dxy < 0.0001) {
				sinA = 0;
				cosA = 1;
			}

			else {
				sinA = -dx / dxy;
				cosA = dy / dxy;
			}

			// recast dy in terms of new axes - z is the same

			dy = -sinA * dx + cosA * dy;
			dyz = Math.sqrt(dy * dy + dz * dz);

			// about new x axis - Theta

			if (dyz < 0.0001) {
				sinB = 0;
				cosB = 1;
			}

			else {
				sinB = dz / dyz;
				cosB = dy / dyz;
			}

			var rot = new Float32Array(9);
			rot[0] = cosA;
			rot[1] = sinA;
			rot[2] = 0;
			rot[3] = -sinA * cosB;
			rot[4] = cosA * cosB;
			rot[5] = sinB;
			rot[6] = sinA * sinB;
			rot[7] = -cosA * sinB;
			rot[8] = cosB;

			return rot;

		};

	}();
	
	// Ortho normal vectors for cylinder radius/ sphere cap equator and cones
	// Direction is j basis (0,1,0)
	var basisVectors = function() {

		var ret = {
			vertices : [],
			norms : []
		};

		var nvecs = [];

		nvecs[0] = new $3Dmol.Vector3(-1, 0, 0);
		nvecs[4] = new $3Dmol.Vector3(0, 0, 1);
		nvecs[8] = new $3Dmol.Vector3(1, 0, 0);
		nvecs[12] = new $3Dmol.Vector3(0, 0, -1);

		// now quarter positions
		nvecs[2] = nvecs[0].clone().add(nvecs[4]).normalize();
		nvecs[6] = nvecs[4].clone().add(nvecs[8]).normalize();
		nvecs[10] = nvecs[8].clone().add(nvecs[12]).normalize();
		nvecs[14] = nvecs[12].clone().add(nvecs[0]).normalize();

		// eights
		nvecs[1] = nvecs[0].clone().add(nvecs[2]).normalize();
		nvecs[3] = nvecs[2].clone().add(nvecs[4]).normalize();
		nvecs[5] = nvecs[4].clone().add(nvecs[6]).normalize();
		nvecs[7] = nvecs[6].clone().add(nvecs[8]).normalize();
		nvecs[9] = nvecs[8].clone().add(nvecs[10]).normalize();
		nvecs[11] = nvecs[10].clone().add(nvecs[12]).normalize();
		nvecs[13] = nvecs[12].clone().add(nvecs[14]).normalize();
		nvecs[15] = nvecs[14].clone().add(nvecs[0]).normalize();

		/*
		 * nvecs[0] = new $3Dmol.Vector3(-1,0,0); nvecs[1] = new
		 * $3Dmol.Vector3(0,0,1); nvecs[2] = new $3Dmol.Vector3(1,0,0);
		 * nvecs[3] = new $3Dmol.Vector3(0,0,-1);
		 */
		return nvecs;

	}();

	// memoize capped cylinder for given radius
	var cylVertexCache = {

		cache : {},

		getVerticesForRadius : function(radius) {

			if (this.cache[radius] !== undefined)
				return this.cache[radius];

			var dir = new $3Dmol.Vector3(0, 1, 0);
			var w = basisVectors.length;
			var nvecs = [], norms = [];
			var n;

			for (var i = 0; i < w; i++) {
				// bottom
				nvecs.push(basisVectors[i].clone().multiplyScalar(radius));
				// top
				nvecs.push(basisVectors[i].clone().multiplyScalar(radius));

				// NOTE: this normal is used for constructing sphere caps -
				// cylinder normals taken care of in drawCylinder
				n = basisVectors[i].clone().normalize();
				norms.push(n);
				norms.push(n);
			}

			// norms[0]

			var verticesRows = [];

			// Require that heightSegments is even and >= 2
			// Equator points at h/2 (theta = pi/2)
			// (repeated) polar points at 0 and h (theta = 0 and pi)
			var heightSegments = 10, widthSegments = w; // 16 or however many
														// basis vectors for
														// cylinder

			if (heightSegments % 2 !== 0 || !heightSegments) {
				console.error("heightSegments must be even");

				return null;
			}

			var phiStart = 0;
			var phiLength = Math.PI * 2;

			var thetaStart = 0;
			var thetaLength = Math.PI;

			var x, y;
			var polar = false, equator = false;

			for (y = 0; y <= heightSegments; y++) {

				polar = (y === 0 || y === heightSegments) ? true : false;
				equator = (y === heightSegments / 2) ? true : false;

				var verticesRow = [], toRow = [];

				for (x = 0; x <= widthSegments; x++) {

					// Two vertices rows for equator pointing to previously
					// constructed cyl points
					if (equator) {
						var xi = (x < widthSegments) ? 2 * x : 0;
						toRow.push(xi + 1);
						verticesRow.push(xi);

						continue;
					}

					var u = x / widthSegments;
					var v = y / heightSegments;

					// Only push first polar point

					if (!polar || x === 0) {

						if (x < widthSegments) {
							var vertex = new $3Dmol.Vector3();
							vertex.x = -radius
									* Math.cos(phiStart + u * phiLength)
									* Math.sin(thetaStart + v * thetaLength);
							vertex.y = radius
									* Math.cos(thetaStart + v * thetaLength);
							vertex.z = radius
									* Math.sin(phiStart + u * phiLength)
									* Math.sin(thetaStart + v * thetaLength);

							if (Math.abs(vertex.x) < 1e-5)
								vertex.x = 0;
							if (Math.abs(vertex.y) < 1e-5)
								vertex.y = 0;
							if (Math.abs(vertex.z) < 1e-5)
								vertex.z = 0;

							n = new $3Dmol.Vector3(vertex.x, vertex.y, vertex.z);
							n.normalize();

							nvecs.push(vertex);
							norms.push(n);

							verticesRow.push(nvecs.length - 1);
						}

						// last point is just the first point for this row
						else {
							verticesRow.push(nvecs.length - widthSegments);
						}

					}

					// x > 0; index to already added point
					else if (polar)
						verticesRow.push(nvecs.length - 1);

				}

				// extra equator row
				if (equator)
					verticesRows.push(toRow);

				verticesRows.push(verticesRow);

			}

			var obj = {
				vertices : nvecs,
				normals : norms,
				verticesRows : verticesRows,
				w : widthSegments,
				h : heightSegments
			};

			this.cache[radius] = obj;

			return obj;

		}
	};

	// creates a cylinder
	var drawnC = 0;
	
	/** Create a cylinder 
	 * @function $3Dmol.GLDraw.drawCylinder
	 * @param {geometry}
	 *            geo
	 * @param {Point}
	 *            from
	 * @param {Point}
	 *            to
	 * @param {float}
	 *            radius
	 * @param {$3Dmol.Color}
	 *            color
	 * @param {boolean} fromCap
	 * @param {boolean} toCap
	 *            
	 * */
	draw.drawCylinder = function(geo, from, to, radius, color, fromCap, toCap) {
		if (!from || !to)
			return;
		drawnC++;
		// vertices
		var drawcaps = fromCap || toCap;
		color = color || {r:0, g:0, b:0};

		/** @type {Array.<number>} */
		var dir = [ to.x, to.y, to.z ];
		dir[0] -= from.x;
		dir[1] -= from.y;
		dir[2] -= from.z;

		var e = getRotationMatrix(dir);
		// get orthonormal vectors from cache
		// TODO: Will have orient with model view matrix according to direction
		var vobj = cylVertexCache.getVerticesForRadius(radius);

		// w (n) corresponds to the number of orthonormal vectors for cylinder
		// (default 16)
		var n = vobj.w, h = vobj.h;
		var w = n;
		// get orthonormal vector
		var n_verts = (drawcaps) ? h * n + 2 : 2 * n;

		var geoGroup = geo.updateGeoGroup(n_verts);

		var vertices = vobj.vertices, normals = vobj.normals, verticesRows = vobj.verticesRows;
		var toRow = verticesRows[h / 2], fromRow = verticesRows[h / 2 + 1];

		var start = geoGroup.vertices;
		var offset, faceoffset;
		var i, x, y, z;

		var vertexArray = geoGroup.vertexArray;
		var normalArray = geoGroup.normalArray;
		var colorArray = geoGroup.colorArray;
		var faceArray = geoGroup.faceArray;
		// add vertices, opposing vertices paired together
		for (i = 0; i < n; ++i) {

			var vi = 2 * i;

			x = e[0] * vertices[vi].x + e[3] * vertices[vi].y + e[6]
					* vertices[vi].z;
			y = e[1] * vertices[vi].x + e[4] * vertices[vi].y + e[7]
					* vertices[vi].z;
			z = e[5] * vertices[vi].y + e[8] * vertices[vi].z;

			// var xn = x/radius, yn = y/radius, zn = z/radius;

			offset = 3 * (start + vi);
			faceoffset = geoGroup.faceidx;

			// from
			vertexArray[offset] = x + from.x;
			vertexArray[offset + 1] = y + from.y;
			vertexArray[offset + 2] = z + from.z;
			// to
			vertexArray[offset + 3] = x + to.x;
			vertexArray[offset + 4] = y + to.y;
			vertexArray[offset + 5] = z + to.z;

			// normals
			normalArray[offset] = x;
			normalArray[offset + 3] = x;
			normalArray[offset + 1] = y;
			normalArray[offset + 4] = y;
			normalArray[offset + 2] = z;
			normalArray[offset + 5] = z;

			// colors
			colorArray[offset] = color.r;
			colorArray[offset + 3] = color.r;
			colorArray[offset + 1] = color.g;
			colorArray[offset + 4] = color.g;
			colorArray[offset + 2] = color.b;
			colorArray[offset + 5] = color.b;

			// faces
			// 0 - 2 - 1
			faceArray[faceoffset] = fromRow[i] + start;
			faceArray[faceoffset + 1] = fromRow[i + 1] + start;
			faceArray[faceoffset + 2] = toRow[i] + start;
			// 1 - 2 - 3
			faceArray[faceoffset + 3] = toRow[i] + start;
			faceArray[faceoffset + 4] = fromRow[i + 1] + start;
			faceArray[faceoffset + 5] = toRow[i + 1] + start;

			geoGroup.faceidx += 6;

		}

		// SPHERE CAPS

		if (drawcaps) {

			// h - sphere rows, verticesRows.length - 2
			var ystart = (toCap) ? 0 : h / 2;
			var yend = (fromCap) ? h + 1 : h / 2 + 1;

			var v1, v2, v3, v4, x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, nx1, nx2, nx3, nx4, ny1, ny2, ny3, ny4, nz1, nz2, nz3, nz4, v1offset, v2offset, v3offset, v4offset;

			for (y = ystart; y < yend; y++) {
				if (y === h / 2)
					continue;
				// n number of points for each level (verticesRows[i].length -
				// 1)
				var cap = (y <= h / 2) ? to : from;

				for (x = 0; x < n; x++) {

					faceoffset = geoGroup.faceidx;

					v1 = verticesRows[y][x + 1];
					v1offset = (v1 + start) * 3;
					v2 = verticesRows[y][x];
					v2offset = (v2 + start) * 3;
					v3 = verticesRows[y + 1][x];
					v3offset = (v3 + start) * 3;
					v4 = verticesRows[y + 1][x + 1];
					v4offset = (v4 + start) * 3;

					// rotate sphere vectors
					x1 = e[0] * vertices[v1].x + e[3] * vertices[v1].y + e[6]
							* vertices[v1].z;
					x2 = e[0] * vertices[v2].x + e[3] * vertices[v2].y + e[6]
							* vertices[v2].z;
					x3 = e[0] * vertices[v3].x + e[3] * vertices[v3].y + e[6]
							* vertices[v3].z;
					x4 = e[0] * vertices[v4].x + e[3] * vertices[v4].y + e[6]
							* vertices[v4].z;

					y1 = e[1] * vertices[v1].x + e[4] * vertices[v1].y + e[7]
							* vertices[v1].z;
					y2 = e[1] * vertices[v2].x + e[4] * vertices[v2].y + e[7]
							* vertices[v2].z;
					y3 = e[1] * vertices[v3].x + e[4] * vertices[v3].y + e[7]
							* vertices[v3].z;
					y4 = e[1] * vertices[v4].x + e[4] * vertices[v4].y + e[7]
							* vertices[v4].z;

					z1 = e[5] * vertices[v1].y + e[8] * vertices[v1].z;
					z2 = e[5] * vertices[v2].y + e[8] * vertices[v2].z;
					z3 = e[5] * vertices[v3].y + e[8] * vertices[v3].z;
					z4 = e[5] * vertices[v4].y + e[8] * vertices[v4].z;

					vertexArray[v1offset] = x1 + cap.x;
					vertexArray[v2offset] = x2 + cap.x;
					vertexArray[v3offset] = x3 + cap.x;
					vertexArray[v4offset] = x4 + cap.x;

					vertexArray[v1offset + 1] = y1 + cap.y;
					vertexArray[v2offset + 1] = y2 + cap.y;
					vertexArray[v3offset + 1] = y3 + cap.y;
					vertexArray[v4offset + 1] = y4 + cap.y;

					vertexArray[v1offset + 2] = z1 + cap.z;
					vertexArray[v2offset + 2] = z2 + cap.z;
					vertexArray[v3offset + 2] = z3 + cap.z;
					vertexArray[v4offset + 2] = z4 + cap.z;

					colorArray[v1offset] = color.r;
					colorArray[v2offset] = color.r;
					colorArray[v3offset] = color.r;
					colorArray[v4offset] = color.r;

					colorArray[v1offset + 1] = color.g;
					colorArray[v2offset + 1] = color.g;
					colorArray[v3offset + 1] = color.g;
					colorArray[v4offset + 1] = color.g;

					colorArray[v1offset + 2] = color.b;
					colorArray[v2offset + 2] = color.b;
					colorArray[v3offset + 2] = color.b;
					colorArray[v4offset + 2] = color.b;

					nx1 = e[0] * normals[v1].x + e[3] * normals[v1].y + e[6]
							* normals[v1].z;
					nx2 = e[0] * normals[v2].x + e[3] * normals[v2].y + e[6]
							* normals[v2].z;
					nx3 = e[0] * normals[v3].x + e[3] * normals[v3].y + e[6]
							* normals[v3].z;
					nx4 = e[0] * normals[v4].x + e[3] * normals[v4].y + e[6]
							* normals[v4].z;

					ny1 = e[1] * normals[v1].x + e[4] * normals[v1].y + e[7]
							* normals[v1].z;
					ny2 = e[1] * normals[v2].x + e[4] * normals[v2].y + e[7]
							* normals[v2].z;
					ny3 = e[1] * normals[v3].x + e[4] * normals[v3].y + e[7]
							* normals[v3].z;
					ny4 = e[1] * normals[v4].x + e[4] * normals[v4].y + e[7]
							* normals[v4].z;

					nz1 = e[5] * normals[v1].y + e[8] * normals[v1].z;
					nz2 = e[5] * normals[v2].y + e[8] * normals[v2].z;
					nz3 = e[5] * normals[v3].y + e[8] * normals[v3].z;
					nz4 = e[5] * normals[v4].y + e[8] * normals[v4].z;

					// if (Math.abs(vobj.sphereVertices[v1].y) === radius) {
					if (y === 0) {
						// face = [v1, v3, v4];
						// norm = [n1, n3, n4];

						normalArray[v1offset] = nx1;
						normalArray[v3offset] = nx3;
						normalArray[v4offset] = nx4;
						normalArray[v1offset + 1] = ny1;
						normalArray[v3offset + 1] = ny3;
						normalArray[v4offset + 1] = ny4;
						normalArray[v1offset + 2] = nz1;
						normalArray[v3offset + 2] = nz3;
						normalArray[v4offset + 2] = nz4;

						faceArray[faceoffset] = v1 + start;
						faceArray[faceoffset + 1] = v3 + start;
						faceArray[faceoffset + 2] = v4 + start;

						geoGroup.faceidx += 3;

					}

					// else if (Math.abs(vobj.sphereVertices[v3].y) === radius)
					// {
					else if (y === yend - 1) {
						// face = [v1, v2, v3];
						// norm = [n1, n2, n3];

						normalArray[v1offset] = nx1;
						normalArray[v2offset] = nx2;
						normalArray[v3offset] = nx3;
						normalArray[v1offset + 1] = ny1;
						normalArray[v2offset + 1] = ny2;
						normalArray[v3offset + 1] = ny3;
						normalArray[v1offset + 2] = nz1;
						normalArray[v2offset + 2] = nz2;
						normalArray[v3offset + 2] = nz3;

						faceArray[faceoffset] = v1 + start;
						faceArray[faceoffset + 1] = v2 + start;
						faceArray[faceoffset + 2] = v3 + start;

						geoGroup.faceidx += 3;

					}

					else {
						// face = [v1, v2, v3, v4];
						// norm = [n1, n2, n3, n4];

						normalArray[v1offset] = nx1;
						normalArray[v2offset] = nx2;
						normalArray[v4offset] = nx4;
						normalArray[v1offset + 1] = ny1;
						normalArray[v2offset + 1] = ny2;
						normalArray[v4offset + 1] = ny4;
						normalArray[v1offset + 2] = nz1;
						normalArray[v2offset + 2] = nz2;
						normalArray[v4offset + 2] = nz4;

						normalArray[v2offset] = nx2;
						normalArray[v3offset] = nx3;
						normalArray[v4offset] = nx4;
						normalArray[v2offset + 1] = ny2;
						normalArray[v3offset + 1] = ny3;
						normalArray[v4offset + 1] = ny4;
						normalArray[v2offset + 2] = nz2;
						normalArray[v3offset + 2] = nz3;
						normalArray[v4offset + 2] = nz4;

						faceArray[faceoffset] = v1 + start;
						faceArray[faceoffset + 1] = v2 + start;
						faceArray[faceoffset + 2] = v4 + start;

						faceArray[faceoffset + 3] = v2 + start;
						faceArray[faceoffset + 4] = v3 + start;
						faceArray[faceoffset + 5] = v4 + start;

						geoGroup.faceidx += 6;
					}

				}
			}

		}

		geoGroup.vertices += n_verts;
	};

	/** Create a cone 
	 * @function $3Dmol.GLDraw.drawCone
	 * @param {geometry}
	 *            geo
	 * @param {Point}
	 *            from
	 * @param {Point}
	 *            to
	 * @param {float}
	 *            radius
	 * @param {$3Dmol.Color}
	 *            color
	 *            */
	draw.drawCone = function(geo, from, to, radius, color) {
		if (!from || !to)
			return;

		color = color || {r:0, g:0, b:0};

		var dir =[to.x, to.y, to.z ];		
		dir.x -= from.x;
		dir.y -= from.y;
		dir.z -= from.z;

		var e = getRotationMatrix(dir);


		// n vertices around bottom plust the two points
		var n = basisVectors.length;
		var basis = basisVectors;
		var n_verts =  n + 2;

		
		//setup geo structures
		var geoGroup = geo.updateGeoGroup(n_verts);
		var start = geoGroup.vertices;	
		var offset, faceoffset;
		var i, x, y, z;
		var vertexArray = geoGroup.vertexArray;
		var normalArray = geoGroup.normalArray;
		var colorArray = geoGroup.colorArray;
		var faceArray = geoGroup.faceArray;
		
		var offset = start*3;
		var ndir = new $3Dmol.Vector3(dir[0],dir[1],dir[2]).normalize();
		//base point first vertex
		vertexArray[offset] = from.x;
		vertexArray[offset+1] = from.y;
		vertexArray[offset+2] = from.z;
		normalArray[offset] = -ndir.x;
		normalArray[offset + 1] = -ndir.y;
		normalArray[offset + 2] = -ndir.z;
		colorArray[offset] = color.r;
		colorArray[offset + 1] = color.g;
		colorArray[offset + 2] = color.b;
		
		//second vertex top
		vertexArray[offset+3] = to.x;
		vertexArray[offset+4] = to.y;
		vertexArray[offset+5] = to.z;
		
		normalArray[offset+3] = ndir.x;
		normalArray[offset+4] = ndir.y;
		normalArray[offset+5] = ndir.z;
		colorArray[offset+3] = color.r;
		colorArray[offset + 4] = color.g;
		colorArray[offset + 5] = color.b;
		
		offset += 6;
		
		// add circle vertices
		for (i = 0; i < n; ++i) {
			var vec = basis[i].clone();
			vec.multiplyScalar(radius);
			x = e[0] * vec.x + e[3] * vec.y + e[6]
					* vec.z;
			y = e[1] * vec.x + e[4] * vec.y + e[7]
					* vec.z;
			z = e[5] * vec.y + e[8] * vec.z;

			// from
			vertexArray[offset] = x + from.x;
			vertexArray[offset + 1] = y + from.y;
			vertexArray[offset + 2] = z + from.z;

			// normals
			normalArray[offset] = x;
			normalArray[offset + 1] = y;
			normalArray[offset + 2] = z;

			// colors
			colorArray[offset] = color.r;
			colorArray[offset + 1] = color.g;
			colorArray[offset + 2] = color.b;
			
			offset += 3;

		}
		geoGroup.vertices += (n+2);
		//faces
		var faceoffset = geoGroup.faceidx;
		for( i = 0; i < n; i++) {
			//two neighboring circle vertices
			var v1 = start+2+i;
			var v2 = start+2+ ((i+1)%n);
			
			faceArray[faceoffset] = v1;
			faceArray[faceoffset+1] = v2;
			faceArray[faceoffset+2] = start;
			faceoffset += 3;
			faceArray[faceoffset] = v1;
			faceArray[faceoffset+1] = v2;
			faceArray[faceoffset+2] = start+1;
			faceoffset += 3;
		}
		geoGroup.faceidx += 6*n;
	};

	
	// Sphere component
	var sphereVertexCache = {
		cache : {},
		getVerticesForRadius : function(radius) {

			if (typeof (this.cache[radius]) !== "undefined")
				return this.cache[radius];

			var obj = {
				vertices : [],
				verticesRows : [],
				normals : []
			};
			// scale quality with radius heuristically
			var widthSegments = 16;
			var heightSegments = 10;
			if (radius < 1) {
				widthSegments = 10;
				heightSegments = 8;
			}

			var phiStart = 0;
			var phiLength = Math.PI * 2;

			var thetaStart = 0;
			var thetaLength = Math.PI;

			var x, y, vertices = [], uvs = [];

			for (y = 0; y <= heightSegments; y++) {

				var verticesRow = [];
				for (x = 0; x <= widthSegments; x++) {

					var u = x / widthSegments;
					var v = y / heightSegments;

					var vertex = {};
					vertex.x = -radius * Math.cos(phiStart + u * phiLength)
							* Math.sin(thetaStart + v * thetaLength);
					vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
					vertex.z = radius * Math.sin(phiStart + u * phiLength)
							* Math.sin(thetaStart + v * thetaLength);

					var n = new $3Dmol.Vector3(vertex.x, vertex.y, vertex.z);
					n.normalize();

					obj.vertices.push(vertex);
					obj.normals.push(n);

					verticesRow.push(obj.vertices.length - 1);

				}

				obj.verticesRows.push(verticesRow);

			}

			this.cache[radius] = obj;
			return obj;
		}

	};

	/** Create a sphere.
	 * @function $3Dmol.GLDraw.drawSphere
	 * @param {geometry}
	 *            geo
	 * @param {Point}
	 *            pos
	 * @param {float}
	 *            radius
	 * @param {$3Dmol.Color}
	 *            color
	 */
	draw.drawSphere = function(geo, pos, radius, color) {

		var center = new $3Dmol.Vector3(pos.x, pos.y, pos.z);

		var x, y;
		var vobj = sphereVertexCache.getVerticesForRadius(radius);

		var vertices = vobj.vertices;
		var normals = vobj.normals;

		var geoGroup = geo.updateGeoGroup(vertices.length);

		var start = geoGroup.vertices;
		var vertexArray = geoGroup.vertexArray;
		var colorArray = geoGroup.colorArray;
		var faceArray = geoGroup.faceArray;
		var lineArray = geoGroup.lineArray;
		var normalArray = geoGroup.normalArray;

		for (var i = 0, il = vertices.length; i < il; ++i) {
			var offset = 3 * (start + i);
			var v = vertices[i];

			vertexArray[offset] = (v.x + pos.x);
			vertexArray[offset + 1] = (v.y + pos.y);
			vertexArray[offset + 2] = (v.z + pos.z);

			colorArray[offset] = color.r;
			colorArray[offset + 1] = color.g;
			colorArray[offset + 2] = color.b;

		}

		geoGroup.vertices += vertices.length;

		var verticesRows = vobj.verticesRows;
		var h = verticesRows.length - 1;

		for (y = 0; y < h; y++) {
			var w = verticesRows[y].length - 1;
			for (x = 0; x < w; x++) {

				var faceoffset = geoGroup.faceidx, lineoffset = geoGroup.lineidx;

				var v1 = verticesRows[y][x + 1] + start, v1offset = v1 * 3;
				var v2 = verticesRows[y][x] + start, v2offset = v2 * 3;
				var v3 = verticesRows[y + 1][x] + start, v3offset = v3 * 3;
				var v4 = verticesRows[y + 1][x + 1] + start, v4offset = v4 * 3;

				var n1 = normals[v1 - start];
				var n2 = normals[v2 - start];
				var n3 = normals[v3 - start];
				var n4 = normals[v4 - start];
				var face, norm;
				if (Math.abs(vertices[v1 - start].y) === radius) {
					// face = [v1, v3, v4];
					// norm = [n1, n3, n4];

					normalArray[v1offset] = n1.x;
					normalArray[v3offset] = n3.x;
					normalArray[v4offset] = n4.x;
					normalArray[v1offset + 1] = n1.y;
					normalArray[v3offset + 1] = n3.y;
					normalArray[v4offset + 1] = n4.y;
					normalArray[v1offset + 2] = n1.z;
					normalArray[v3offset + 2] = n3.z;
					normalArray[v4offset + 2] = n4.z;

					faceArray[faceoffset] = v1;
					faceArray[faceoffset + 1] = v3;
					faceArray[faceoffset + 2] = v4;

					lineArray[lineoffset] = v1;
					lineArray[lineoffset + 1] = v3;
					lineArray[lineoffset + 2] = v1;
					lineArray[lineoffset + 3] = v4;
					lineArray[lineoffset + 4] = v3;
					lineArray[lineoffset + 5] = v4;

					geoGroup.faceidx += 3;
					geoGroup.lineidx += 6;

				} else if (Math.abs(vertices[v3 - start].y) === radius) {
					// face = [v1, v2, v3];
					// norm = [n1, n2, n3];

					normalArray[v1offset] = n1.x;
					normalArray[v2offset] = n2.x;
					normalArray[v3offset] = n3.x;
					normalArray[v1offset + 1] = n1.y;
					normalArray[v2offset + 1] = n2.y;
					normalArray[v3offset + 1] = n3.y;
					normalArray[v1offset + 2] = n1.z;
					normalArray[v2offset + 2] = n2.z;
					normalArray[v3offset + 2] = n3.z;

					faceArray[faceoffset] = v1;
					faceArray[faceoffset + 1] = v2;
					faceArray[faceoffset + 2] = v3;

					lineArray[lineoffset] = v1;
					lineArray[lineoffset + 1] = v2;
					lineArray[lineoffset + 2] = v1;
					lineArray[lineoffset + 3] = v3;
					lineArray[lineoffset + 4] = v2;
					lineArray[lineoffset + 5] = v3;

					geoGroup.faceidx += 3;
					geoGroup.lineidx += 6;

				} else {
					// face = [v1, v2, v3, v4];
					// norm = [n1, n2, n3, n4];

					normalArray[v1offset] = n1.x;
					normalArray[v2offset] = n2.x;
					normalArray[v4offset] = n4.x;
					normalArray[v1offset + 1] = n1.y;
					normalArray[v2offset + 1] = n2.y;
					normalArray[v4offset + 1] = n4.y;
					normalArray[v1offset + 2] = n1.z;
					normalArray[v2offset + 2] = n2.z;
					normalArray[v4offset + 2] = n4.z;

					normalArray[v2offset] = n2.x;
					normalArray[v3offset] = n3.x;
					normalArray[v4offset] = n4.x;
					normalArray[v2offset + 1] = n2.y;
					normalArray[v3offset + 1] = n3.y;
					normalArray[v4offset + 1] = n4.y;
					normalArray[v2offset + 2] = n2.z;
					normalArray[v3offset + 2] = n3.z;
					normalArray[v4offset + 2] = n4.z;

					faceArray[faceoffset] = v1;
					faceArray[faceoffset + 1] = v2;
					faceArray[faceoffset + 2] = v4;

					faceArray[faceoffset + 3] = v2;
					faceArray[faceoffset + 4] = v3;
					faceArray[faceoffset + 5] = v4;

					lineArray[lineoffset] = v1;
					lineArray[lineoffset + 1] = v2;
					lineArray[lineoffset + 2] = v1;
					lineArray[lineoffset + 3] = v4;

					lineArray[lineoffset + 4] = v2;
					lineArray[lineoffset + 5] = v3;
					lineArray[lineoffset + 6] = v3;
					lineArray[lineoffset + 7] = v4;

					geoGroup.faceidx += 6;
					geoGroup.lineidx += 8;

				}

			}
		}

	};

	return draw;

})();// A model is a collection of related atoms.  Bonds are only allowed between
//atoms in the same model.  An atom is uniquely specified by its model id and
//its serial number.
//A glmodel knows how to apply the styles on each atom to create a gl object

var $3Dmol = $3Dmol || {};

/**
 * GLModel represents a group of related atoms
 * @constructor 
 * @param {number=} mid 
 * @param {Object=} defaultcolors Object defining default atom colors as atom => color property value pairs
 * @see $3Dmol.download
 */
$3Dmol.GLModel = (function() {

    // class variables go here
    var defaultAtomStyle = {
        line : {}
    };

    var Nucleotides = [ '  G', '  A', '  T', '  C', '  U', ' DG', ' DA', ' DT',
            ' DC', ' DU' ];

    var defaultlineWidth = 1.0;

    // Reference: A. Bondi, J. Phys. Chem., 1964, 68, 441.
    var vdwRadii = {
        "H" : 1.2,
        "Li" : 1.82,
        "LI" : 1.82,
        "Na" : 2.27,
        "NA" : 2.27,
        "K" : 2.75,
        "C" : 1.7,
        "N" : 1.55,
        "O" : 1.52,
        "F" : 1.47,
        "P" : 1.80,
        "S" : 1.80,
        "CL" : 1.75,
        "Cl" : 1.75,
        "BR" : 1.85,
        "Br" : 1.85,
        "SE" : 1.90,
        "Se" : 1.90,
        "ZN" : 1.39,
        "Zn" : 1.39,
        "CU" : 1.4,
        "Cu" : 1.4,
        "NI" : 1.63,
        "Ni" : 1.63
    };

    // class functions

    // return true if a and b represent the same style
    var sameObj = function(a,b) {
        if(a && b)
            return JSON.stringify(a) == JSON.stringify(b);
        else
            return a == b;
    };    

   
    function GLModel(mid, defaultcolors) {
        // private variables
        var atoms = [];
        var id = mid;
        var molObj = null;
        var renderedMolObj = null;
        var lastStyle = null; // cache previous styles to avoid recomputation
        var lastColors = null;
        
        var defaultColor = $3Dmol.elementColors.defaultColor;
        
        var ElementColors = (defaultcolors) ? defaultcolors : $3Dmol.elementColors.defaultColors;


        // drawing functions must be associated with model object since
        // geometries can't span multiple canvases

        // sphere drawing
        var defaultSphereRadius = 1.5;

        // return proper radius for atom given style
        /** 
         * 
         * @param {AtomSpec} atom
         * @param {atomstyle} style
         * @return {number} 
         * 
         */
        var getRadiusFromStyle = function(atom, style) {
            var r = defaultSphereRadius;
            if (typeof (style.radius) != "undefined")
                r = style.radius;
            else if (vdwRadii[atom.elem])
                r = vdwRadii[atom.elem];

            if (typeof (style.scale) != "undefined")
                r *= style.scale;
            return r;
        };

  
        /** Return proper color for atom given style
         * @param {AtomSpec} atom
         * @param {AtomStyle} style
         * @return {$3Dmol.Color}
         */
        var getColorFromStyle = function(atom, style) {
            var color = atom.color;
            if (typeof (style.color) != "undefined")
                color = style.color;
            if(typeof(style.colorscheme) != "undefined" &&
            		typeof($3Dmol.elementColors[style.colorscheme]) != "undefined") {
            	var scheme = $3Dmol.elementColors[style.colorscheme];
            	if(typeof(scheme[atom.elem]) != "undefined") {
            		color = scheme[atom.elem];
            	}
            }
            var C = $3Dmol.CC.color(color);
            return C;
        }

        // cross drawing
		/** @typedef CrossStyleSpec
		 * @prop {boolean} hidden - do not show 
		 * @prop {number} linewidth 
		 * @prop {number} radius 
		 * @prop {string} colorscheme - element based coloring
		 * @prop {string} color - fixed coloring, overrides colorscheme
		 */
		
        /**
         * 
         * @param {AtomSpec} atom
         * @param {$3Dmol.Geometry[]} geos
         */
        var drawAtomCross = function(atom, geos) {
            if (!atom.style.cross)
                return;
            var style = atom.style.cross;
            if (style.hidden)
                return;
            var linewidth = (style.linewidth || defaultlineWidth);
            if (!geos[linewidth])
                geos[linewidth] = new $3Dmol.Geometry();
                
            var geoGroup = geos[linewidth].updateGeoGroup(6);
            
            var delta = getRadiusFromStyle(atom, style);

            var points = [ [ delta, 0, 0 ], [ -delta, 0, 0 ], [ 0, delta, 0 ],
                    [ 0, -delta, 0 ], [ 0, 0, delta ], [ 0, 0, -delta ] ];

            var clickable = atom.clickable;
            if (clickable && atom.intersectionShape === undefined)
                atom.intersectionShape = {sphere : [], cylinder : [], line : []};
            
            var c = getColorFromStyle(atom, style);
            
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            
            for ( var j = 0; j < 6; j++) {
                
                var offset = geoGroup.vertices*3;
                
                geoGroup.vertices++;
                vertexArray[offset] = atom.x + points[j][0];
                vertexArray[offset+1] = atom.y + points[j][1];
                vertexArray[offset+2] = atom.z + points[j][2];
                colorArray[offset] = c.r;
                colorArray[offset+1] = c.g;
                colorArray[offset+2] = c.b;
                
                if (clickable){
                    var point = new $3Dmol.Vector3(points[j][0], points[j][1], points[j][2]);
                    
                    //decrease cross size for selection to prevent misselection from atom overlap
                    point.multiplyScalar(0.1);
                    point.set(point.x+atom.x, point.y+atom.y, point.z+atom.z);
                    atom.intersectionShape.line.push(point);
                }

            }
                        
        };

        //from atom, return a normalized vector v that is orthogonal and along which
        //it is appropraite to draw multiple bonds
		var getSideBondV = function(atom, atom2, i) {

			var p1 = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
			var p2 = new $3Dmol.Vector3(atom2.x, atom2.y, atom2.z);

			var dir = p2.clone();
			var v = null;
			dir.sub(p1);

			var p1a, p1b, p2a, p2b;
			var i2, j2, atom3, p3, dir2;
			if (atom.bonds.length === 1) {
				if (atom2.bonds.length === 1) {
					v = dir.clone();
					if (Math.abs(v.x) > 0.0001)
						v.y += 1;
					else
						v.x += 1;
				} else {
					i2 = (i + 1) % atom2.bonds.length;
					j2 = atom2.bonds[i2];
					atom3 = atoms[j2];
					p3 = new $3Dmol.Vector3(atom3.x, atom3.y, atom3.z);

					dir2 = p3.clone();
					dir2.sub(p1);

					v = dir2.clone();
					v.cross(dir);
				}
			} else {
				// get vector 2 different neighboring atom
				i2 = (i + 1) % atom.bonds.length;
				j2 = atom.bonds[i2];
				atom3 = atoms[j2];
				p3 = new $3Dmol.Vector3(atom3.x, atom3.y, atom3.z);

				dir2 = p3.clone();
				dir2.sub(p1);

				v = dir2.clone();
				v.cross(dir);
			}

			// especially for C#C (triple bond) dir and dir2
			// may be opposites resulting in a zero v
			if (v.lengthSq() < 0.01) {
				v = dir.clone();
				if (Math.abs(v.x) > 0.0001)
					v.y += 1;
				else
					v.x += 1;
			}

			v.cross(dir);
			v.normalize();
			
			return v;
			
			v.multiplyScalar(r * 1.5);

		}
		
		var getTripleBondPoints = function() {
			
            v.cross(dir);
            v.normalize();
            v.multiplyScalar(r * 3);

            p1a = p1.clone();
            p1a.add(v);
            p1b = p1.clone();
            p1b.sub(v);

            p2a = p1a.clone();
            p2a.add(dir);
            p2b = p1b.clone();
            p2b.add(dir);
		}
		
		var addLine = function(vertexArray, colorArray, offset, p1, p2, c1) {
			//make line from p1 to p2, does not incremeant counts
            vertexArray[offset] = p1.x; vertexArray[offset+1] = p1.y; vertexArray[offset+2] = p1.z;
            colorArray[offset] = c1.r; colorArray[offset+1] = c1.g; colorArray[offset+2] = c1.b;
            vertexArray[offset+3] = p2.x; vertexArray[offset+4] = p2.y; vertexArray[offset+5] = p2.z;
            colorArray[offset+3] = c1.r; colorArray[offset+4] = c1.g; colorArray[offset+5] = c1.b;            
		}
		
		/**@typedef LineStyleSpec
		 * @prop {boolean} hidden - do not show line
		 * @prop {number} linewidth 
		 * @prop {string} colorscheme - element based coloring
		 * @prop {string} color - fixed coloring, overrides colorscheme
		 */
		
        // bonds - both atoms must match bond style
        // standardize on only drawing for lowest to highest
        /**
		 * 
		 * @param {AtomSpec}
		 *            atom
		 * @param {AtomSpec[]} atoms
		 * @param {$3Dmol.Geometry[]} geos
		 */
        var drawBondLines = function(atom, atoms, geos) {
            if (!atom.style.line)
                return;
            var style = atom.style.line;
            if (style.hidden)
                return;

            // have a separate geometry for each linewidth
            var linewidth = (style.linewidth || defaultlineWidth);

            if (!geos[linewidth])
                geos[linewidth] = new $3Dmol.Geometry();
            /** @type {geometryGroup} */
            var geoGroup = geos[linewidth].updateGeoGroup(2*atom.bonds.length);
            
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            
            for ( var i = 0; i < atom.bonds.length; i++) {
                var j = atom.bonds[i]; // our neighbor
                
                var atom2 = atoms[j];
                if (!atom2.style.line)
                    continue; // don't sweat the details

                if (atom.serial >= atom2.serial) // only draw if less, this way we can do multi bonds correctly
                	continue;
                var p1 = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                var p2 = new $3Dmol.Vector3(atom2.x, atom2.y, atom2.z);                
                var mp = p1.clone().add(p2).multiplyScalar(0.5);
                var singleBond = false;               
                
                if (atom.clickable){
                    if (atom.intersectionShape === undefined)
                        atom.intersectionShape = {sphere : [], cylinder : [], line : [], triangle : []};
                    atom.intersectionShape.line.push(p1);
                    atom.intersectionShape.line.push(p2);
                }

                var c1 = getColorFromStyle(atom, atom.style.line);
                var c2 = getColorFromStyle(atom2, atom2.style.line);
               
                if(atom.bondStyles && atom.bondStyles[i]) {
                	var bstyle = atom.bondStyles[i];
                	if(!bstyle.iswire) {
                		continue;
                	}
                	if(bstyle.radius) bondR = bstyle.radius;
                	if(bstyle.singleBond) singleBond = true;
                	if(typeof(bstyle.color1) != "undefined") {
                		c1 = $3Dmol.CC.color(bstyle.color1);
                	}
                	if(typeof(bstyle.color2) != "undefined") {
                		c2 = $3Dmol.CC.color(bstyle.color2);
                	}
                }

                var offset = geoGroup.vertices*3;
                
                if(atom.bondOrder[i] > 1 && atom.bondOrder[i] < 4 && !singleBond) {
                    var v = getSideBondV(atom, atom2, i);
                    var dir = p2.clone();
                    dir.sub(p1);
                    
                    if(atom.bondOrder[i] == 2) { //double
                    	
                    	v.multiplyScalar(.1);
               			p1a = p1.clone();
            			p1a.add(v);
            			p1b = p1.clone();
            			p1b.sub(v);

            			p2a = p1a.clone();
            			p2a.add(dir);
            			p2b = p1b.clone();
            			p2b.add(dir);
            			
            			if(c1 == c2) {
    		                geoGroup.vertices += 4;
    	                	addLine(vertexArray, colorArray, offset, p1a, p2a, c1);            				
    	                	addLine(vertexArray, colorArray, offset+6, p1b, p2b, c1);            				
            			}
            			else {
    		                geoGroup.vertices += 8;
    		                dir.multiplyScalar(0.5);
    		                var mpa = p1a.clone();
    		                mpa.add(dir);
    		                var mpb = p1b.clone();
    		                mpb.add(dir);
    		                
    	                	addLine(vertexArray, colorArray, offset, p1a, mpa, c1);            				
    	                	addLine(vertexArray, colorArray, offset+6, mpa, p2a, c2);            				
    	                	addLine(vertexArray, colorArray, offset+12, p1b, mpb, c1); 
    	                	addLine(vertexArray, colorArray, offset+18, mpb, p2b, c2); 
            			}
                    }
                    else if(atom.bondOrder[i] == 3) { //triple
                    	
                    	v.multiplyScalar(.1);
               			p1a = p1.clone();
            			p1a.add(v);
            			p1b = p1.clone();
            			p1b.sub(v);

            			p2a = p1a.clone();
            			p2a.add(dir);
            			p2b = p1b.clone();
            			p2b.add(dir);
            			
            			if(c1 == c2) {
    		                geoGroup.vertices += 6;
    	                	addLine(vertexArray, colorArray, offset, p1, p2, c1);            				
    	                	addLine(vertexArray, colorArray, offset+6, p1a, p2a, c1);            				
    	                	addLine(vertexArray, colorArray, offset+12, p1b, p2b, c1);            				
            			}
            			else {
    		                geoGroup.vertices += 12;
    		                dir.multiplyScalar(0.5);
    		                var mpa = p1a.clone();
    		                mpa.add(dir);
    		                var mpb = p1b.clone();
    		                mpb.add(dir);

    	                	addLine(vertexArray, colorArray, offset, p1, mp, c1);            				
    	                	addLine(vertexArray, colorArray, offset+6, mp, p2, c2);
    	                	addLine(vertexArray, colorArray, offset+12, p1a, mpa, c1);            				
    	                	addLine(vertexArray, colorArray, offset+18, mpa, p2a, c2);            				
    	                	addLine(vertexArray, colorArray, offset+24, p1b, mpb, c1); 
    	                	addLine(vertexArray, colorArray, offset+30, mpb, p2b, c2); 
            			}
                    }
                }
                else { //single bond                	                
	                if(c1 == c2) {
		                geoGroup.vertices += 2;
	                	addLine(vertexArray, colorArray, offset, p1, p2, c1);
	                } else {
		                geoGroup.vertices += 4;
	                	addLine(vertexArray, colorArray, offset, p1, mp, c1);
	                	addLine(vertexArray, colorArray, offset+6, mp, p2, c2);	                	
	                }
	                
                }
            }

        };

        // bonds as cylinders
        var defaultStickRadius = 0.25;

		/**@typedef SphereStyleSpec
		 * @prop {boolean} hidden - do not show atom
		 * @prop {number} radius - override van der waals radius
		 * @prop {string} colorscheme - element based coloring
		 * @prop {string} color - fixed coloring, overrides colorscheme
		 */
		
        //sphere drawing
        //See also: drawCylinder
        /** 
         * 
         * @param {AtomSpec} atom
         * @param {$3Dmol.Geometry} geo
         */
        var drawAtomSphere = function(atom, geo) {
            
            if (!atom.style.sphere)
                return;
            var style = atom.style.sphere;
            if (style.hidden)
                return;
                                                                 
            var C = getColorFromStyle(atom, style);
            
            var x, y;
            var radius = getRadiusFromStyle(atom, style);
            
            if ((atom.clickable === true) && (atom.intersectionShape !== undefined)) {
                var center = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                atom.intersectionShape.sphere.push(new $3Dmol.Sphere(center, radius));
            }
            
            $3Dmol.GLDraw.drawSphere(geo, atom, radius, C);    
            
        };
        
        //dkoes - test code for sphere imposters
        var drawAtomImposter = function(atom, geo) {
            
            if (!atom.style.spherei)
                return;
            var style = atom.style.spherei;
            if (style.hidden)
                return;
            
            var radius = getRadiusFromStyle(atom, style);
            var C = getColorFromStyle(atom, style);
            
            //create flat square                       
            
            var geoGroup = geo.updateGeoGroup(4);
            var startv =  geoGroup.vertices;
            var start = startv*3;
            var vertexArray = geoGroup.vertexArray;
            var colorArray = geoGroup.colorArray;
            
            //use center point for each vertex
            for(var i = 0; i < 4; i++) {
                vertexArray[start+3*i] = atom.x;
                vertexArray[start+3*i+1] = atom.y ;
                vertexArray[start+3*i+2] = atom.z;                       	
            }
            

            //same colors for all 4 vertices
            var normalArray = geoGroup.normalArray;
            var colorArray = geoGroup.colorArray;
            for(var i = 0; i < 4; i++) {
            	colorArray[start+3*i] = C.r;
            	colorArray[start+3*i+1] = C.g;
            	colorArray[start+3*i+2] = C.b;
            	
            }
            
        	normalArray[start+0] = -radius;
        	normalArray[start+1] = -radius;
        	normalArray[start+2] = 0;
        	
        	normalArray[start+3] = -radius;
        	normalArray[start+4] = radius;
        	normalArray[start+5] = 0;
        	
        	normalArray[start+6] = radius;
        	normalArray[start+7] = radius;
        	normalArray[start+8] = 0;
        	
        	normalArray[start+9] = radius;
        	normalArray[start+10] = -radius;
        	normalArray[start+11] = 0;
        	
            geoGroup.vertices += 4;
            
            //two faces
            var faceArray = geoGroup.faceArray;
            var faceoffset = geoGroup.faceidx; //not number faces, but index
            faceArray[faceoffset+0] = startv;
            faceArray[faceoffset+1] = startv+1;
            faceArray[faceoffset+2] = startv+2;
            faceArray[faceoffset+3] = startv+2;
            faceArray[faceoffset+4] = startv+3;
            faceArray[faceoffset+5] = startv;
            geoGroup.faceidx += 6;
            
        };
                
           
		/**@typedef StickStyleSpec
		 * @prop {boolean} hidden - do not show 
		 * @prop {number} radius 
		 * @prop {boolean} singleBonds - draw all bonds as single bonds if set
		 * @prop {string} colorscheme - element based coloring
		 * @prop {string} color - fixed coloring, overrides colorscheme
		 */
		
        // draws cylinders and small spheres (at bond radius)
        var drawBondSticks = function(atom, atoms, geo) {
            if (!atom.style.stick)
                return;
            var style = atom.style.stick;
            if (style.hidden)
                return;

            var atomBondR = style.radius || defaultStickRadius;
            var bondR = atomBondR;
            var atomSingleBond = style.singleBonds || false;
            var fromCap = false, toCap = false;

            var C1 = getColorFromStyle(atom, style);

            var mp, mp1, mp2;
            
            if (!atom.capDrawn && atom.bonds.length < 4)
                fromCap = true;              
                
            for (var i = 0; i < atom.bonds.length; i++) {
                var j = atom.bonds[i]; // our neighbor
                var atom2 = atoms[j]; //parsePDB, etc should only add defined bonds
                
                if (atom.serial < atom2.serial) {// only draw if less, this
                    // lets us combine
                    // cylinders of the same
                    // color
                	var style2 = atom2.style;
                    if (!style2.stick)
                        continue; // don't sweat the details                     
                   
                    var C2 = getColorFromStyle(atom2, style2.stick);
                    
                    //support bond specific styles
                    bondR = atomBondR;                    
                    var singleBond = atomSingleBond;
                    if(atom.bondStyles && atom.bondStyles[i]) {
                    	var bstyle = atom.bondStyles[i];
                    	if(bstyle.iswire) {
                    		continue;
                    	}
                    	if(bstyle.radius) bondR = bstyle.radius;
                    	if(bstyle.singleBond) singleBond = true;
                    	if(typeof(bstyle.color1) != "undefined") {
                    		C1 = $3Dmol.CC.color(bstyle.color1);
                    	}
                    	if(typeof(bstyle.color2) != "undefined") {
                    		C2 = $3Dmol.CC.color(bstyle.color2);
                    	}
                    }
                    var p1 = new $3Dmol.Vector3(atom.x, atom.y, atom.z);
                    var p2 = new $3Dmol.Vector3(atom2.x, atom2.y, atom2.z);

                    // draw cylinders
                    if (atom.bondOrder[i] === 1 || singleBond) {

                        if (!atom2.capDrawn && atom2.bonds.length < 4)
                            toCap = true;       
                                                
                        if (C1 != C2) {
                            mp = new $3Dmol.Vector3().addVectors(p1, p2)
                                    .multiplyScalar(0.5);
                            $3Dmol.GLDraw.drawCylinder(geo, p1, mp, bondR, C1, fromCap, false);
                            $3Dmol.GLDraw.drawCylinder(geo, mp, p2, bondR, C2, false, toCap);
                        } else {
                        	$3Dmol.GLDraw.drawCylinder(geo, p1, p2, bondR, C1, fromCap, toCap);
                        }
                        
                        if (atom.clickable || atom2.clickable) {
                            mp = new $3Dmol.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
                            if (atom.clickable){
                                var cylinder1 = new $3Dmol.Cylinder(p1 , mp , bondR);
                                var sphere1 = new $3Dmol.Sphere(p1 , bondR);
                                atom.intersectionShape.cylinder.push(cylinder1);   
                                atom.intersectionShape.sphere.push(sphere1);                             
                            }
                            if (atom2.clickable){
                                var cylinder2 = new $3Dmol.Cylinder(p2 , mp , bondR);
                                var sphere2 = new $3Dmol.Sphere(p2 , bondR);
                                atom2.intersectionShape.cylinder.push(cylinder2);
                                atom2.intersectionShape.sphere.push(sphere2);
                            }

                        }
                        
                    } 
                    
                    else if (atom.bondOrder[i] > 1) {
                        var mfromCap = false; mtoCap = false; //multi bond caps
                        
                        if(bondR != atomBondR) {
                        	//assume jmol style multiple bonds - the radius doesn't fit within atom sphere
                        	mfromCap = true;
                        	mtoCap = true;
                        }
                        
                        var dir = p2.clone();
                        var v = null;
                        dir.sub(p1);
                        
                        var r, p1a, p1b, p2a, p2b;
                        var v = getSideBondV(atom, atom2, i);
                        
                        if (atom.bondOrder[i] == 2) {
                        	var r = bondR/2.5;
                        	var v = getSideBondV(atom, atom2, i);
                        	
                        	v.multiplyScalar(r*1.5);
                			p1a = p1.clone();
                			p1a.add(v);
                			p1b = p1.clone();
                			p1b.sub(v);

                			p2a = p1a.clone();
                			p2a.add(dir);
                			p2b = p1b.clone();
                			p2b.add(dir);

                                                                 
                            if (C1 != C2) {
                                mp = new $3Dmol.Vector3().addVectors(p1a, p2a)
                                        .multiplyScalar(0.5);
                                mp2 = new $3Dmol.Vector3().addVectors(p1b, p2b)
                                        .multiplyScalar(0.5);
                                $3Dmol.GLDraw.drawCylinder(geo, p1a, mp, r, C1, mfromCap, false);
                                $3Dmol.GLDraw.drawCylinder(geo, mp, p2a, r, C2, false, mtoCap);
                                $3Dmol.GLDraw.drawCylinder(geo, p1b, mp2, r, C1, mfromCap, false);
                                $3Dmol.GLDraw.drawCylinder(geo, mp2, p2b, r, C2, false, mtoCap);
                            } else {
                            	$3Dmol.GLDraw.drawCylinder(geo, p1a, p2a, r, C1, mfromCap, mtoCap);
                            	$3Dmol.GLDraw.drawCylinder(geo, p1b, p2b, r, C1, mfromCap, mtoCap);
                            }
                            if (atom.clickable || atom2.clickable){
                                mp = new $3Dmol.Vector3().addVectors(p1a, p2a)
                                               .multiplyScalar(0.5);
                                mp2 = new $3Dmol.Vector3().addVectors(p1b, p2b)
                                                .multiplyScalar(0.5);
                                if (atom.clickable) {
                                    cylinder1a = new $3Dmol.Cylinder(p1a , mp , r);
                                    cylinder1b = new $3Dmol.Cylinder(p1b , mp2 , r);
                                    atom.intersectionShape.cylinder.push(cylinder1a);
                                    atom.intersectionShape.cylinder.push(cylinder1b);
                                }
                                if (atom2.clickable) {
                                    cylinder2a = new $3Dmol.Cylinder(p2a , mp , r);
                                    cylinder2b = new $3Dmol.Cylinder(p2b , mp2 , r);
                                    atom2.intersectionShape.cylinder.push(cylinder2a);
                                    atom2.intersectionShape.cylinder.push(cylinder2b);                               
                                }
                            }
                        } 
                        else if (atom.bondOrder[i] == 3) {
                            r = bondR / 4;
                            v.cross(dir);
                            v.normalize();
                            v.multiplyScalar(r * 3);

                            p1a = p1.clone();
                            p1a.add(v);
                            p1b = p1.clone();
                            p1b.sub(v);

                            p2a = p1a.clone();
                            p2a.add(dir);
                            p2b = p1b.clone();
                            p2b.add(dir);

                            if (C1 != C2) {
                                mp = new $3Dmol.Vector3().addVectors(p1a, p2a)
                                        .multiplyScalar(0.5);
                                mp2 = new $3Dmol.Vector3().addVectors(p1b, p2b)
                                        .multiplyScalar(0.5);
                                mp3 = new $3Dmol.Vector3().addVectors(p1, p2)
                                        .multiplyScalar(0.5);
                                $3Dmol.GLDraw.drawCylinder(geo, p1a, mp, r, C1, mfromCap, false);
                                $3Dmol.GLDraw.drawCylinder(geo, mp, p2a, r, C2, false, mtoCap);
                                $3Dmol.GLDraw.drawCylinder(geo, p1, mp3, r, C1, fromCap, false);
                                $3Dmol.GLDraw.drawCylinder(geo, mp3, p2, r, C2, false, toCap);
                                $3Dmol.GLDraw.drawCylinder(geo, p1b, mp2, r, C1, mfromCap, false);
                                $3Dmol.GLDraw.drawCylinder(geo, mp2, p2b, r, C2, false, mtoCap);
                            } else {
                            	$3Dmol.GLDraw.drawCylinder(geo, p1a, p2a, r, C1, mfromCap, mtoCap);
                            	$3Dmol.GLDraw.drawCylinder(geo, p1, p2, r, C1, fromCap, toCap);
                            	$3Dmol.GLDraw.drawCylinder(geo, p1b, p2b, r, C1, mfromCap, mtoCap);

                            }
                            if (atom.clickable || atom2.clickable) {
                                mp = new $3Dmol.Vector3().addVectors(p1a, p2a)
                                        .multiplyScalar(0.5);
                                mp2 = new $3Dmol.Vector3().addVectors(p1b, p2b)
                                        .multiplyScalar(0.5);
                                mp3 = new $3Dmol.Vector3().addVectors(p1, p2)
                                        .multiplyScalar(0.5);
                                                                
                                if (atom.clickable) {
                                    cylinder1a = new $3Dmol.Cylinder(p1a.clone(), mp.clone(), r);
                                    cylinder1b = new $3Dmol.Cylinder(p1b.clone(), mp2.clone(), r);
                                    cylinder1c = new $3Dmol.Cylinder(p1.clone(), mp3.clone(), r);
                                    atom.intersectionShape.cylinder.push(cylinder1a);
                                    atom.intersectionShape.cylinder.push(cylinder1b);
                                    atom.intersectionShape.cylinder.push(cylinder1c);
                                } 
                                if (atom2.clickable) {                               
                                    cylinder2a = new $3Dmol.Cylinder(p2a.clone(), mp.clone(), r);
                                    cylinder2b = new $3Dmol.Cylinder(p2b.clone(), mp2.clone(), r);
                                    cylinder2c = new $3Dmol.Cylinder(p2.clone(), mp3.clone(), r);
                                    atom2.intersectionShape.cylinder.push(cylinder2a);
                                    atom2.intersectionShape.cylinder.push(cylinder2b);
                                    atom2.intersectionShape.cylinder.push(cylinder2c);                                
                                }
                            }
                        }
                    }
                     
                }                   
                                 
            }            

            // draw non bonded heteroatoms as spheres
            var drawSphere = false;
            var numsinglebonds = 0;
            var differentradii = false;
            //also, if any bonds were drawn as multiples, need sphere
            for(var i = 0; i < atom.bonds.length; i++) {
                var singleBond = atomSingleBond;
                if(atom.bondStyles && atom.bondStyles[i]) {
                	var bstyle = atom.bondStyles[i];
                	if(bstyle.singleBond) singleBond = true;
                	if(bstyle.radius && bstyle.radius != atomBondR) {
                		differentradii = true;
                	}
                }
                if(singleBond || atom.bondOrder[i] == 1) {
                	numsinglebonds++;
                }
            }
            
            if(differentradii) { //jmol style double/triple bonds - no sphere
            	if(numsinglebonds > 0) drawSphere = true; //unless needed as a cap
            }
            else if(numsinglebonds == 0 && atom.bonds.length > 0) {
            	drawSphere = true;
            }
           
            if (drawSphere) {
                var savedstyle = atom.style;
                bondR = atomBondR;
                //do not use bond style as this can be variable, particularly
                //with jmol export of double/triple bonds
                $3Dmol.GLDraw.drawSphere(geo, atom, bondR, C1);    
            }
            
        };

        // go through all the atoms and regenerate their geometries
        // we try to have one geometry for each style since this is much much
        // faster
        // at some point we should optimize this to avoid unnecessary
        // recalculation
        /** param {AtomSpec[]} atoms */
        var createMolObj = function(atoms) {

            console.log("creating for "+id);
            var ret = new $3Dmol.Object3D();
            var cartoonAtoms = [];
            var lineGeometries = {};
            var crossGeometries = {};
            var sphereGeometry = new $3Dmol.Geometry(true);                                                         
            var imposterGeometry = new $3Dmol.Geometry(true);                                                         
            var stickGeometry = new $3Dmol.Geometry(true);
            var i, n;
            var range = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
            for (i = 0, n = atoms.length; i < n; i++) {
                var atom = atoms[i];
                // recreate gl info for each atom as necessary
                // set up appropriate intersection spheres for clickable atoms
                if (atom && atom.style) {
                    if (atom.clickable && atom.intersectionShape === undefined)
                        atom.intersectionShape = {sphere: [], cylinder: [], line: [], triangle : []};                    
                    drawAtomSphere(atom, sphereGeometry);
                    drawAtomImposter(atom, imposterGeometry);
                    drawAtomCross(atom, crossGeometries);
                    drawBondLines(atom, atoms, lineGeometries);
                    drawBondSticks(atom, atoms, stickGeometry);
                    if (typeof (atom.style.cartoon) !== "undefined" && !atom.style.cartoon.hidden) {
                        //gradient color scheme range
                        if (atom.style.cartoon.color === 'spectrum' && typeof(atom.resi) === "number") {                            
                            if (atom.resi < range[0])
                                range[0] = atom.resi;
                            if (atom.resi > range[1])
                                range[1] = atom.resi;
                        }
                        
                        cartoonAtoms.push(atom);
                    }
                    

                }
            }
            // create cartoon if needed - this is a whole model analysis
            if (cartoonAtoms.length > 0) {
                var gradientscheme = null;
                //TODO: Should have an option to choose gradient type
                if (range[0] < range[1])
                    gradientscheme = new $3Dmol.Gradient.Sinebow(range[0], range[1]);

                $3Dmol.drawCartoon(ret, cartoonAtoms, gradientscheme);
                
                for (i = 0; i < ret.children.length; i++){
                    var geo = ret.children[i].geometry;
                }
            }

            // add sphere geometry
            if (sphereGeometry.vertices > 0) {
                var sphereMaterial = new $3Dmol.MeshLambertMaterial({
                    ambient : 0x000000,
                    vertexColors : true,
                    reflectivity : 0,
                });
                
                //Initialize buffers in geometry                
                sphereGeometry.initTypedArrays();
                
                var sphere = new $3Dmol.Mesh(sphereGeometry, sphereMaterial);
                ret.add(sphere);
            }
            
            // add imposter geometry
            if (imposterGeometry.vertices > 0) {
                var imposterMaterial = new $3Dmol.ImposterMaterial({
                    ambient : 0x000000,
                    vertexColors : true,
                    reflectivity : 0
                });
                
                //Initialize buffers in geometry                
                imposterGeometry.initTypedArrays();
                
                var spherei = new $3Dmol.Mesh(imposterGeometry, imposterMaterial);
                console
                        .log("spherei geometry " + imposterGeometry.vertices.length);

                ret.add(spherei);
            }
            
            // add stick geometry
            if (stickGeometry.vertices > 0) {
                var cylinderMaterial = new $3Dmol.MeshLambertMaterial({
                    vertexColors : true,
                    ambient : 0x000000,
                    reflectivity : 0
                });

                //Initialize buffers in geometry                
                stickGeometry.initTypedArrays();
                
                if (cylinderMaterial.wireframe)
                    stickGeometry.setUpWireframe();
                
                var sticks = new $3Dmol.Mesh(stickGeometry, cylinderMaterial);
                ret.add(sticks);
            }
            
            //var linewidth;
            // add any line geometries, distinguished by line width
            for (i in lineGeometries) {
                if (lineGeometries.hasOwnProperty(i)) {
                    var linewidth = i;
                    var lineMaterial = new $3Dmol.LineBasicMaterial({
                        linewidth : linewidth,
                        vertexColors : true
                    });
                    
                    lineGeometries[i].initTypedArrays();
                    
                    var line = new $3Dmol.Line(lineGeometries[i], lineMaterial,
                            $3Dmol.LinePieces);

                    ret.add(line);
                }
            }

            // add any cross geometries
            for (i in crossGeometries) {
                if (crossGeometries.hasOwnProperty(i)) {
                    var linewidth = i;
                    var crossMaterial = new $3Dmol.LineBasicMaterial({
                        linewidth : linewidth,
                        vertexColors : true
                    });

                    crossGeometries[i].initTypedArrays();
                    
                    var cross = new $3Dmol.Line(crossGeometries[i], crossMaterial,
                            $3Dmol.LinePieces);

                    ret.add(cross);
                }
            }

            return ret;
        };

        /**
         * Returns model id number
         * 
         * @function $3Dmol.GLMode#getID
         * @return {number} Model ID
         */
        this.getID = function() {
            return id;
        };

        // set default style and colors for atoms
        var setAtomDefaults = function(atoms, id) {
            for ( var i = 0; i < atoms.length; i++) {
                var atom = atoms[i];
                if (atom) {
                    atom.style = atom.style || defaultAtomStyle;
                    atom.color = atom.color || ElementColors[atom.elem] || defaultColor;
                    atom.model = id;
                    if (atom.clickable)
                        atom.intersectionShape = {sphere : [], cylinder : [], line : [], triangle : []};
                }
            }
        };

        /** add atoms to this model from molecular data string
         * 
         * @function $3Dmol.GLModel#addMolData
         * @param {string} data - atom structure file input data string
         * @param {string} format - input file string format (e.g 'pdb', 'sdf', etc.)
         * @param {Object} options - format dependent options (e.g. 'options.keepH' to keep hydrogens)
         */
        this.addMolData = function(data, format, options) {
            options = options || {}; 
            if (!data)
                console.error("Erorr with addMolData: No input data specified");
            
            if(typeof($3Dmol.Parsers[format]) != "undefined") {
            	var parse = $3Dmol.Parsers[format];
            	parse(atoms, data, options)
            }
            else {
            	console.error("Unknown format: "+format);
            }
            
            setAtomDefaults(atoms, id);
        };
        
        /** given a selection specification, return true if atom is selected
         * 
         * @function $3Dmol.GLModel#atomIsSelected
         * @param {AtomSpec} atom
         * @param {AtomSelectionSpec} sel
         * @return {boolean}
         */
        this.atomIsSelected = function(atom, sel) {
            if (typeof (sel) === "undefined")
                return true; // undef gets all
            var invert = !!sel.invert;
            var ret = true;
            for ( var key in sel) {
            	if(key === 'predicate') { //a user supplied function for evaluating atoms
            		if(!sel['predicate'](atom) ) {
            			ret = false;
            			break;
            		}
            	}
            	else if (sel.hasOwnProperty(key) && key != "props" && key != "invert" && key != "model") {
                    // if something is in sel, atom must have it                	
                    if (typeof (atom[key]) === "undefined") {
                        ret = false;
                        break;
                    }
                    var isokay = false;
                    if(key === "bonds") {
                    	//special case counting number of bonds, for selecting nonbonded mostly
                    	var val = sel[key];
                    	if(val != atom.bonds.length) {
                    		ret = false;
                    		break;
                    	}
                    }
                    else if ($.isArray(sel[key])) {
                        // can be any of the listed values
                        var valarr = sel[key];
                        for ( var i = 0; i < valarr.length; i++) {
                            if (atom[key] == valarr[i]) {
                                isokay = true;
                                break;
                            }
                        }
                        if (!isokay) {
                            ret = false;
                            break;
                        }
                    } else { // single match
                        var val = sel[key];
                        if (atom[key] != val) {
                            ret = false;
                            break;
                        }
                    }
                }
            }
            
            return invert ? !ret : ret;
        };


        /** return list of atoms selected by sel, this is specific to glmodel
         * 
         * @function $3Dmol.GLModel#selectedAtoms
         * @param {AtomSelectionSpec} sel
         * @return {Array.<Object>}
         */
        this.selectedAtoms = function(sel) {
            var ret = [];
            for ( var i = 0; i < atoms.length; i++) {
                var atom = atoms[i];
                if (atom) {
                    if (this.atomIsSelected(atom, sel))
                        ret.push(atom);
                }
            }
            return ret;
        };
        
        /** Add list of new atoms to model.  Adjusts bonds appropriately.
         * 
         * @function $3Dmol.GLModel#addAtoms
         * @param {type} newatoms
         */        
        this.addAtoms = function(newatoms) {
            molObj = null;
            var start = atoms.length;
            var indexmap = [];
            // mapping from old index to new index
            var i;
            for(i = 0; i < newatoms.length; i++) {
                indexmap[newatoms[i].index] = start+i;
            }
            
            // copy and push newatoms onto atoms
            for(i = 0; i < newatoms.length; i++) {
                var olda = newatoms[i];
                var nindex = indexmap[olda.index];
                var a = $.extend(false, {}, olda);
                a.index = nindex;
                a.bonds = [];
                a.bondOrder = [];
                // copy over all bonds contained in selection,
                // updating indices appropriately
                for(var j = 0; j < olda.bonds.length; j++) {
                    var neigh = indexmap[olda.bonds[j]];
                    if(typeof(neigh) != "undefined") {
                        a.bonds.push(neigh);
                        a.bondOrder.push(olda.bondOrder[j]);
                    }                
                }
                atoms.push(a);
            }
        };

        /** Remove specified atoms from model
         * 
         * @function $3Dmol.GLModel#removeAtoms
         * @param {type} badatoms
         * @return {removeAtoms}
         */
        this.removeAtoms = function(badatoms) {
            molObj = null;
            // make map of all baddies
            var baddies = [];
            var i;
            for(i = 0; i < badatoms.length; i++) {
                baddies[badatoms[i].index] = true;
            }
            
            // create list of good atoms
            var newatoms = [];
            for(i = 0; i < atoms.length; i++) {
                var a = atoms[i];
                if(!baddies[a.index])
                    newatoms.push(a);
            }
            
            // clear it all out
            atoms = [];
            // and add back in to get updated bonds
            this.addAtoms(newatoms);
        };
        
        
        /** Set atom style of selected atoms
         * 
         * @function $3Dmol.GLModel#setStyle
         * @param {AtomSelectionSpec} sel
         * @param {AtomStyleSpec} style
         * @param {boolean} add - if true, add to current style, don't replace
         */
        this.setStyle = function(sel, style, add) {
            
            if(!add && molObj !== null && sameObj(style, lastStyle))
                return; // no need to recompute
            
            if(add) lastStyle = null; // todo: compute merged style
            else lastStyle = style;

            // do a copy to enforce style changes through this function
            var mystyle = $.extend(true, {}, style);
            var changedAtoms = false;
            // somethings we only calculate if there is a change in a certain
            // style, although these checks will only catch cases where both
            // are either null or undefined
            for ( var i = 0; i < atoms.length; i++) {
                atoms[i].capDrawn = false; //reset for proper stick render
                
                if (this.atomIsSelected(atoms[i], sel)) {
                    changedAtoms = true;
                    if (atoms[i].clickable) 
                        atoms[i].intersectionShape = {sphere : [], cylinder : [], line : [], triangle : []};                    
    
                   
                    if(!add) atoms[i].style = {};
                    for(var s in mystyle) {
                        if(mystyle.hasOwnProperty(s)) {
                            atoms[i].style[s] = mystyle[s];
                        }
                    }
                }
            }
            
            if (changedAtoms)
                molObj = null; //force rebuild
            
        };
        
        /** given a mapping from element to color, set atom colors
         * 
         * @function $3Dmol.GLModel#setColorByElement
         * @param {type} sel
         * @param {type} colors
         */
        this.setColorByElement = function(sel, colors) {
            
            if(molObj !== null && sameObj(colors,lastColors))
                return; // don't recompute
            lastColors = colors;
            var atoms = this.selectedAtoms(sel);
            if(atoms.length > 0)
                molObj = null; // force rebuild
            for ( var i = 0; i < atoms.length; i++) {
                var a = atoms[i];
                if(typeof(colors[a.elem]) !== "undefined") {
                    a.color = colors[a.elem];
                }
            }
        };
        
        /**
         * @function $3Dmol.GLModel.setColorByProperty
         * @param {type} sel
         * @param {type} prop
         * @param {type} scheme
         */
        this.setColorByProperty = function(sel, prop, scheme) {
            var atoms = this.selectedAtoms(sel);
            lastColors = null; // don't bother memoizing
            if(atoms.length > 0)
                molObj = null; // force rebuild
            var min =  Number.POSITIVE_INFINITY;
            var max =  Number.NEGATIVE_INFINITY;
            var i, a;
            // compute the range            
            for (i = 0; i < atoms.length; i++) {
                a = atoms[i];
                if(a.properties && typeof(a.properties[prop]) !== undefined) {
                    var p = parseFloat(a.properties[prop]);
                    if(p < min) min = p;
                    if(p > max) max = p;
                }                    
            }
            // now apply colors using scheme
            for (i = 0; i < atoms.length; i++) {
                a = atoms[i];
                if(a.properties && typeof(a.properties[prop]) !== undefined) {
                    var c = scheme.valueToHex(parseFloat(a.properties[prop]), [min,max]);
                    a.color = c;
                }                    
            }
        };


        /** manage the globj for this model in the possed modelGroup - if it has to be regenerated, remove and add
         * 
         * @function $3Dmol.GLModel#globj
         * @param {$3Dmol.Object3D} group
         */
        this.globj = function(group) {
            var time = new Date();
            if(molObj === null) { // have to regenerate
                molObj = createMolObj(atoms);
                var time2 = new Date();
                console.log("object creation time: " + (time2 - time));
                if(renderedMolObj) { // previously rendered, remove
                    group.remove(renderedMolObj);
                    renderedMolObj = null;
                }
                renderedMolObj = molObj.clone();
                group.add(renderedMolObj);
            }
        };
        
        /** Remove any renderable mol object from scene
         * 
         * @function $3Dmol.GLModel#removegl
         * @param {$3Dmol.Object3D} group
         */
        this.removegl = function(group) {
            if(renderedMolObj) {
                //dispose of geos and materials
                if (renderedMolObj.geometry !== undefined) renderedMolObj.geometry.dispose();             
                if (renderedMolObj.material !== undefined) renderedMolObj.material.dispose();
                group.remove(renderedMolObj);
                renderedMolObj = null;
            }
            molObj = null;
        };
        
        /** Create labels for residues of selected atoms.
         * Will create a single label at the center of mass of all atoms
         * with the same chain,resn, and resi.
         * @function $3Dmol.GLModel#addResLabels
         * 
         * @param {AtomSelectionSpec} sel
         * @param {$3Dmol.GLViewer} viewer
         */
        this.addResLabels = function(sel, viewer, style) {
        	var atoms = this.selectedAtoms(sel);
        	var bylabel = {}
        	//collect by chain:resn:resi
        	for(var i = 0; i < atoms.length; i++) {
        		var a = atoms[i];
        		var c = a.chain;
        		var resn = a.resn;
        		var resi = a.resi;
        		var label =  resn + '' + resi;
        		if(!bylabel[c]) bylabel[c] = {};
        		if(!bylabel[c][label]) bylabel[c][label] = []
        		bylabel[c][label].push(a);
        	}
        	
            var mystyle = $.extend(true, {}, style);
        	//now compute centers of mass
        	for(var c in bylabel) {
        		if(bylabel.hasOwnProperty(c)) {
        			var labels = bylabel[c];
        			for(var label in labels) {
        				if(labels.hasOwnProperty(label)) {
        					var atoms = labels[label];
        					var sum = new $3Dmol.Vector3(0,0,0);
        					for(var i = 0; i < atoms.length; i++) {
        						var a = atoms[i];
        						sum.x += a.x;
        						sum.y += a.y;
        						sum.z += a.z;
        					}
        					sum.divideScalar(atoms.length);
        					mystyle.position = sum;
        					viewer.addLabel(label, mystyle);
        				}        				
        			}
        		}
        	}
        }

    }

    return GLModel;
    
})();
/**
 * A GLShape is a collection of user specified shapes.
 * 
 * @constructor $3Dmol.GLShape
 * @extends {ShapeSpec}
 * @param {number} sid - Unique identifier
 * @param {ShapeSpec} stylespec - shape style specification
 */
$3Dmol.GLShape = (function() {

	// Marching cube, to match with protein surface generation
	var ISDONE = 2;

	/**
	 * 
	 * @param {$3Dmol.Geometry}
	 *            geo
	 * @param {$3Dmol.Color |
	 *            colorlike} color
	 */
	var updateColor = function(geo, color) {

		var C = color || $3Dmol.CC.color(color);
		geo.colorsNeedUpdate = true;

		for ( var g in geo.geometryGroups) {

			var geoGroup = geo.geometryGroups[g];
			var colorArr = geoGroup.colorArray;

			for (var i = 0, il = geoGroup.vertices; i < il; ++i) {
				colorArr[i * 3] = C.r;
				colorArr[i * 3 + 1] = C.g;
				colorArr[i * 3 + 2] = C.b;
			}
		}

	};


	/**
	 * @param {$3Dmol.GLShape}
	 *            shape
	 * @param {geometryGroup}
	 *            geoGroup
	 * @param {ArrowSpec}
	 *            spec
	 */
	var drawArrow = function(shape, geoGroup, spec) {

		var from = spec.start, end = spec.end, radius = spec.radius, radiusRatio = spec.radiusRatio, mid = spec.mid;

		if (!(from && end))
			return;

		// vertices

		var dir = end.clone();
		dir.sub(from).multiplyScalar(mid);
		var to = from.clone().add(dir);
		var negDir = dir.clone().negate();

		shape.intersectionShape.cylinder.push(new $3Dmol.Cylinder(from.clone(),
				to.clone(), radius));
		shape.intersectionShape.sphere.push(new $3Dmol.Sphere(from.clone(),
				radius));

		// get orthonormal vector
		var nvecs = [];
		nvecs[0] = dir.clone();
		if (Math.abs(nvecs[0].x) > 0.0001)
			nvecs[0].y += 1;
		else
			nvecs[0].x += 1;
		nvecs[0].cross(dir);
		nvecs[0].normalize();

		nvecs[0] = nvecs[0];
		// another orth vector
		nvecs[4] = nvecs[0].clone();
		nvecs[4].crossVectors(nvecs[0], dir);
		nvecs[4].normalize();
		nvecs[8] = nvecs[0].clone().negate();
		nvecs[12] = nvecs[4].clone().negate();

		// now quarter positions
		nvecs[2] = nvecs[0].clone().add(nvecs[4]).normalize();
		nvecs[6] = nvecs[4].clone().add(nvecs[8]).normalize();
		nvecs[10] = nvecs[8].clone().add(nvecs[12]).normalize();
		nvecs[14] = nvecs[12].clone().add(nvecs[0]).normalize();

		// eights
		nvecs[1] = nvecs[0].clone().add(nvecs[2]).normalize();
		nvecs[3] = nvecs[2].clone().add(nvecs[4]).normalize();
		nvecs[5] = nvecs[4].clone().add(nvecs[6]).normalize();
		nvecs[7] = nvecs[6].clone().add(nvecs[8]).normalize();
		nvecs[9] = nvecs[8].clone().add(nvecs[10]).normalize();
		nvecs[11] = nvecs[10].clone().add(nvecs[12]).normalize();
		nvecs[13] = nvecs[12].clone().add(nvecs[14]).normalize();
		nvecs[15] = nvecs[14].clone().add(nvecs[0]).normalize();

		// var start = geo.vertices.length;
		var start = geoGroup.vertices;
		var vertexArray = geoGroup.vertexArray;
		var colorArray = geoGroup.colorArray;
		var faceArray = geoGroup.faceArray;
		var normalArray = geoGroup.normalArray;
		var lineArray = geoGroup.lineArray;

		var offset, i, n;
		// add vertices, opposing vertices paired together
		for (i = 0, n = nvecs.length; i < n; ++i) {
			offset = 3 * (start + 3 * i);
			var bottom = nvecs[i].clone().multiplyScalar(radius).add(from);
			var top = nvecs[i].clone().multiplyScalar(radius).add(to);
			var conebase = nvecs[i].clone()
					.multiplyScalar(radius * radiusRatio).add(to);

			vertexArray[offset] = bottom.x;
			vertexArray[offset + 1] = bottom.y;
			vertexArray[offset + 2] = bottom.z;

			vertexArray[offset + 3] = top.x;
			vertexArray[offset + 4] = top.y;
			vertexArray[offset + 5] = top.z;

			vertexArray[offset + 6] = conebase.x;
			vertexArray[offset + 7] = conebase.y;
			vertexArray[offset + 8] = conebase.z;

			if (i > 0) {
				var prev_x = vertexArray[offset - 3];
				var prev_y = vertexArray[offset - 2];
				var prev_z = vertexArray[offset - 1];

				var c = new $3Dmol.Vector3(prev_x, prev_y, prev_z);
				var b = end.clone(), b2 = to.clone();
				var a = new $3Dmol.Vector3(conebase.x, conebase.y, conebase.z);

				shape.intersectionShape.triangle.push(new $3Dmol.Triangle(a, b,
						c));
				shape.intersectionShape.triangle.push(new $3Dmol.Triangle(c
						.clone(), b2, a.clone()));
			}
		}

		geoGroup.vertices += 48;
		offset = geoGroup.vertices * 3;

		// caps
		vertexArray[offset] = from.x;
		vertexArray[offset + 1] = from.y;
		vertexArray[offset + 2] = from.z;

		vertexArray[offset + 3] = to.x;
		vertexArray[offset + 4] = to.y;
		vertexArray[offset + 5] = to.z;

		vertexArray[offset + 6] = end.x;
		vertexArray[offset + 7] = end.y;
		vertexArray[offset + 8] = end.z;

		geoGroup.vertices += 3;

		// now faces
		var face, norm, faceoffset, lineoffset;
		var t1, t2, t2b, t3, t3b, t4, t1offset, t2offset, t2boffset, t3offset, t3boffset, t4offset;
		var n1, n2, n3, n4;
		var n_vertices = 0;
		var fromi = geoGroup.vertices - 3, toi = geoGroup.vertices - 2, endi = geoGroup.vertices - 1;
		var fromoffset = fromi * 3, tooffset = toi * 3, endoffset = endi * 3;
		for (i = 0, n = nvecs.length - 1; i < n; ++i) {

			var ti = start + 3 * i;
			offset = ti * 3;
			faceoffset = geoGroup.faceidx;
			lineoffset = geoGroup.lineidx;

			t1 = ti;
			t1offset = t1 * 3;
			t2 = ti + 1;
			t2offset = t2 * 3;
			t2b = ti + 2;
			t2boffset = t2b * 3;
			t3 = ti + 4;
			t3offset = t3 * 3;
			t3b = ti + 5;
			t3boffset = t3b * 3;
			t4 = ti + 3;
			t4offset = t4 * 3;

			// face = [t1, t2, t4], [t2, t3, t4];
			// face = [t1, t2, t3, t4];

			norm = [ nvecs[i], nvecs[i], nvecs[i + 1], nvecs[i + 1] ];

			n1 = n2 = nvecs[i];
			n3 = n4 = nvecs[i + 1];

			normalArray[t1offset] = n1.x;
			normalArray[t2offset] = n2.x;
			normalArray[t4offset] = n4.x;
			normalArray[t1offset + 1] = n1.y;
			normalArray[t2offset + 1] = n2.y;
			normalArray[t4offset + 1] = n4.y;
			normalArray[t1offset + 2] = n1.z;
			normalArray[t2offset + 2] = n2.z;
			normalArray[t4offset + 2] = n4.z;

			normalArray[t2offset] = n2.x;
			normalArray[t3offset] = n3.x;
			normalArray[t4offset] = n4.x;
			normalArray[t2offset + 1] = n2.y;
			normalArray[t3offset + 1] = n3.y;
			normalArray[t4offset + 1] = n4.y;
			normalArray[t2offset + 2] = n2.z;
			normalArray[t3offset + 2] = n3.z;
			normalArray[t4offset + 2] = n4.z;

			normalArray[t2boffset] = n2.x;
			normalArray[t3boffset] = n3.x;
			normalArray[t2boffset + 1] = n2.y;
			normalArray[t3boffset + 1] = n3.y;
			normalArray[t2boffset + 2] = n2.z;
			normalArray[t3boffset + 2] = n3.z;

			// sides
			faceArray[faceoffset] = t1;
			faceArray[faceoffset + 1] = t2;
			faceArray[faceoffset + 2] = t4;
			faceArray[faceoffset + 3] = t2;
			faceArray[faceoffset + 4] = t3;
			faceArray[faceoffset + 5] = t4;
			// caps
			faceArray[faceoffset + 6] = t1;
			faceArray[faceoffset + 7] = t4;
			faceArray[faceoffset + 8] = fromi;
			faceArray[faceoffset + 9] = t2b;
			faceArray[faceoffset + 10] = toi;
			faceArray[faceoffset + 11] = t3b;
			// arrowhead
			faceArray[faceoffset + 12] = t2b;
			faceArray[faceoffset + 13] = endi;
			faceArray[faceoffset + 14] = t3b;

			// sides
			lineArray[lineoffset] = t1;
			lineArray[lineoffset + 1] = t2;
			lineArray[lineoffset + 2] = t1;
			lineArray[lineoffset + 3] = t4;
			// lineArray[lineoffset+4] = t2, lineArray[lineoffset+5] = t3;
			lineArray[lineoffset + 4] = t3;
			lineArray[lineoffset + 5] = t4;
			// caps
			lineArray[lineoffset + 6] = t1;
			lineArray[lineoffset + 7] = t4;
			// lineArray[lineoffset+10] = t1, lineArray[lineoffset+11] = fromi;
			// lineArray[lineoffset+12] = t4, lineArray[lineoffset+13] = fromi;

			lineArray[lineoffset + 8] = t2b;
			lineArray[lineoffset + 9] = t2; // toi
			lineArray[lineoffset + 10] = t2b;
			lineArray[lineoffset + 11] = t3b;
			lineArray[lineoffset + 12] = t3;
			lineArray[lineoffset + 13] = t3b; // toi
			// arrowhead
			lineArray[lineoffset + 14] = t2b;
			lineArray[lineoffset + 15] = endi;
			lineArray[lineoffset + 16] = t2b;
			lineArray[lineoffset + 17] = t3b;
			lineArray[lineoffset + 18] = endi;
			lineArray[lineoffset + 19] = t3b;

			geoGroup.faceidx += 15;
			geoGroup.lineidx += 20;

		}
		// final face

		face = [ start + 45, start + 46, start + 1, start, start + 47,
				start + 2 ];
		norm = [ nvecs[15], nvecs[15], nvecs[0], nvecs[0] ];

		faceoffset = geoGroup.faceidx;
		lineoffset = geoGroup.lineidx;

		t1 = face[0];
		t1offset = t1 * 3;
		t2 = face[1];
		t2offset = t2 * 3;
		t2b = face[4];
		t2boffset = t2b * 3;
		t3 = face[2];
		t3offset = t3 * 3;
		t3b = face[5];
		t3boffset = t3b * 3;
		t4 = face[3];
		t4offset = t4 * 3;

		n1 = n2 = nvecs[15];
		n3 = n4 = nvecs[0];

		normalArray[t1offset] = n1.x;
		normalArray[t2offset] = n2.x;
		normalArray[t4offset] = n4.x;
		normalArray[t1offset + 1] = n1.y;
		normalArray[t2offset + 1] = n2.y;
		normalArray[t4offset + 1] = n4.y;
		normalArray[t1offset + 2] = n1.z;
		normalArray[t2offset + 2] = n2.z;
		normalArray[t4offset + 2] = n4.z;

		normalArray[t2offset] = n2.x;
		normalArray[t3offset] = n3.x;
		normalArray[t4offset] = n4.x;
		normalArray[t2offset + 1] = n2.y;
		normalArray[t3offset + 1] = n3.y;
		normalArray[t4offset + 1] = n4.y;
		normalArray[t2offset + 2] = n2.z;
		normalArray[t3offset + 2] = n3.z;
		normalArray[t4offset + 2] = n4.z;

		normalArray[t2boffset] = n2.x;
		normalArray[t3boffset] = n3.x;
		normalArray[t2boffset + 1] = n2.y;
		normalArray[t3boffset + 1] = n3.y;
		normalArray[t2boffset + 2] = n2.z;
		normalArray[t3boffset + 2] = n3.z;

		// Cap normals
		dir.normalize();
		negDir.normalize();
		normalArray[fromoffset] = negDir.x;
		normalArray[tooffset] = normalArray[endoffset] = dir.x;
		normalArray[fromoffset + 1] = negDir.y;
		normalArray[tooffset + 1] = normalArray[endoffset + 1] = dir.y;
		normalArray[fromoffset + 2] = negDir.z;
		normalArray[tooffset + 2] = normalArray[endoffset + 2] = dir.z;

		// Final side
		faceArray[faceoffset] = t1;
		faceArray[faceoffset + 1] = t2;
		faceArray[faceoffset + 2] = t4;
		faceArray[faceoffset + 3] = t2;
		faceArray[faceoffset + 4] = t3;
		faceArray[faceoffset + 5] = t4;
		// final caps
		faceArray[faceoffset + 6] = t1;
		faceArray[faceoffset + 7] = t4;
		faceArray[faceoffset + 8] = fromi;
		faceArray[faceoffset + 9] = t2b;
		faceArray[faceoffset + 10] = toi;
		faceArray[faceoffset + 11] = t3b;
		// final arrowhead
		faceArray[faceoffset + 12] = t2b;
		faceArray[faceoffset + 13] = endi;
		faceArray[faceoffset + 14] = t3b;

		// sides
		lineArray[lineoffset] = t1;
		lineArray[lineoffset + 1] = t2;
		lineArray[lineoffset + 2] = t1;
		lineArray[lineoffset + 3] = t4;
		// lineArray[lineoffset+4] = t2, lineArray[lineoffset+5] = t3;
		lineArray[lineoffset + 4] = t3;
		lineArray[lineoffset + 5] = t4;
		// caps
		lineArray[lineoffset + 6] = t1;
		lineArray[lineoffset + 7] = t4;
		// lineArray[lineoffset+10] = t1, lineArray[lineoffset+11] = fromi;
		// lineArray[lineoffset+12] = t4, lineArray[lineoffset+13] = fromi;

		lineArray[lineoffset + 8] = t2b;
		lineArray[lineoffset + 9] = t2; // toi
		lineArray[lineoffset + 10] = t2b;
		lineArray[lineoffset + 11] = t3b;
		lineArray[lineoffset + 12] = t3;
		lineArray[lineoffset + 13] = t3b; // toi
		// arrowhead
		lineArray[lineoffset + 14] = t2b;
		lineArray[lineoffset + 15] = endi;
		lineArray[lineoffset + 16] = t2b;
		lineArray[lineoffset + 17] = t3b;
		lineArray[lineoffset + 18] = endi;
		lineArray[lineoffset + 19] = t3b;

		geoGroup.faceidx += 15;
		geoGroup.lineidx += 20;

	};

	// handles custom shape generation from user supplied arrays
	// May need to generate normal and/or line indices
	/**
	 * @param {$3Dmol.GLShape}
	 *            shape
	 * @param {geometryGroup}
	 *            geoGroup
	 * @param {CustomSpec}
	 *            customSpec
	 */
	var drawCustom = function(shape, geoGroup, customSpec) {

		var vertexArr = customSpec.vertexArr, normalArr = customSpec.normalArr, faceArr = customSpec.faceArr, lineArr = customSpec.lineArr;

		if (vertexArr.length === 0 || faceArr.length === 0) {
			console
					.warn("Error adding custom shape component: No vertices and/or face indices supplied!");
		}

		geoGroup.vertices = vertexArr.length;
		geoGroup.faceidx = faceArr.length;

		var offset, v, a, b, c, i, il;

		for (i = 0, il = geoGroup.vertices; i < il; ++i) {
			offset = i * 3;
			v = vertexArr[i];
			geoGroup.vertexArray[offset] = v.x;
			geoGroup.vertexArray[offset + 1] = v.y;
			geoGroup.vertexArray[offset + 2] = v.z;
		}

		for (i = 0, il = geoGroup.faceidx / 3; i < il; ++i) {
			offset = i * 3;
			a = faceArr[offset];
			b = faceArr[offset + 1];
			c = faceArr[offset + 2];
			var vA = new $3Dmol.Vector3(), vB = new $3Dmol.Vector3(), vC = new $3Dmol.Vector3();
			shape.intersectionShape.triangle.push(new $3Dmol.Triangle(vA
					.copy(vertexArr[a]), vB.copy(vertexArr[b]), vC
					.copy(vertexArr[c])));
		}

		geoGroup.faceArray = new Uint16Array(faceArr);

		geoGroup.truncateArrayBuffers(true, true);

		if (normalArr.length < geoGroup.vertices)
			geoGroup.setNormals();
		else {

			geoGroup.normalArray = new Float32Array(geoGroup.vertices * 3);
			var n;
			for (i = 0, il = geoGroup.vertices; i < il; ++i) {
				offset = i * 3;
				n = normalArr[i];
				geoGroup.normalArray[offset] = n.x;
				geoGroup.normalArray[offset + 1] = n.y;
				geoGroup.normalArray[offset + 2] = n.z;
			}
		}

		if (!lineArr.length)
			geoGroup.setLineIndices();
		else
			geoGroup.lineArray = new Uint16Array(lineArr);

		geoGroup.lineidx = geoGroup.lineArray.length;

	};

	// Read a cube file - generate model and possibly shape(s)
	/**
	 * @param {$3Dmol.GLShape}
	 *            shape
	 * @param {geometryGroup}
	 *            geoGroup
	 * @param {string}
	 *            str
	 * @param {number}
	 *            isoval
	 * @param {boolean}
	 *            voxel
	 */
	var parseCube = function(shape, geoGroup, str, isoval, voxel) {

		var lines = str.replace(/^\s+/, "").split(/[\n\r]+/);

		if (lines.length < 6)
			return;

		var lineArr = lines[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(
				" ");

		var natoms = Math.abs(parseFloat(lineArr[0]));
		var origin = new $3Dmol.Vector3(parseFloat(lineArr[1]),
				parseFloat(lineArr[2]), parseFloat(lineArr[3]));

		lineArr = lines[3].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

		// might have to convert from bohr units to angstroms
		var convFactor = (parseFloat(lineArr[0]) > 0) ? 0.529177 : 1;

		origin.multiplyScalar(convFactor);

		var nX = Math.abs(lineArr[0]);
		var xVec = new $3Dmol.Vector3(parseFloat(lineArr[1]),
				parseFloat(lineArr[2]), parseFloat(lineArr[3]))
				.multiplyScalar(convFactor);

		lineArr = lines[4].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

		var nY = Math.abs(lineArr[0]);
		var yVec = new $3Dmol.Vector3(parseFloat(lineArr[1]),
				parseFloat(lineArr[2]), parseFloat(lineArr[3]))
				.multiplyScalar(convFactor);

		lineArr = lines[5].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

		var nZ = Math.abs(lineArr[0]);
		var zVec = new $3Dmol.Vector3(parseFloat(lineArr[1]),
				parseFloat(lineArr[2]), parseFloat(lineArr[3]))
				.multiplyScalar(convFactor);

		// lines.splice(6, natoms).join("\n");

		lines = new Float32Array(lines.splice(natoms + 7).join(" ").replace(
				/^\s+/, "").split(/[\s\r]+/));

		var vertnums = new Int16Array(nX * nY * nZ);

		var i, il;

		for (i = 0, il = vertnums.length; i < il; ++i)
			vertnums[i] = -1;

		var bitdata = new Uint8Array(nX * nY * nZ);

		for (i = 0, il = lines.length; i < il; ++i) {
			var val = (isoval >= 0) ? lines[i] - isoval : isoval - lines[i];

			if (val > 0)
				bitdata[i] |= ISDONE;

		}

		var verts = [], faces = [];

		$3Dmol.MarchingCube.march(bitdata, verts, faces, {
			fulltable : true,
			voxel : voxel,
			scale : xVec.length(),
			origin : origin,
			nX : nX,
			nY : nY,
			nZ : nZ
		});

		if (!voxel)
			$3Dmol.MarchingCube.laplacianSmooth(10, verts, faces);

		drawCustom(shape, geoGroup, {
			vertexArr : verts,
			faceArr : faces,
			normalArr : [],
			lineArr : []
		});

	};

	// Update a bounding sphere's position and radius
	// from list of centroids and new points
	/**
	 * @param {$3Dmol.Sphere}
	 *            sphere
	 * @param {Object}
	 *            components
	 * @param {Array}
	 *            points
	 */
	var updateBoundingFromPoints = function(sphere, components, points) {

		sphere.center.set(0, 0, 0);

		var i, il;

		if (components.length > 0) {

			for (i = 0, il = components.length; i < il; ++i) {
				var centroid = components[i].centroid;
				sphere.center.add(centroid);
			}

			sphere.center.divideScalar(components.length);
		}

		var maxRadiusSq = sphere.radius * sphere.radius;

		for (i = 0, il = points.length / 3; i < il; i++) {
			var x = points[i * 3], y = points[i * 3 + 1], z = points[i * 3 + 2];
			var radiusSq = sphere.center.distanceToSquared({
				x : x,
				y : y,
				z : z
			});
			maxRadiusSq = Math.max(maxRadiusSq, radiusSq);
		}

		sphere.radius = Math.sqrt(maxRadiusSq);

	};

	/**
	 * 
	 * @param {$3Dmol.GLShape}
	 *            shape
	 * @param {ShapeSpec}
	 *            stylespec
	 * @returns {undefined}
	 */
	var updateFromStyle = function(shape, stylespec) {
		shape.color = stylespec.color || new $3Dmol.Color();
		if(! (stylespec.color instanceof $3Dmol.Color))
			shape.color = $3Dmol.CC.color(stylespec.color);
		shape.wireframe = stylespec.wireframe ? true : false;
		shape.alpha = stylespec.alpha ? $3Dmol.Math.clamp(stylespec.alpha, 0.0,
				1.0) : 1.0;
		shape.side = (stylespec.side !== undefined) ? stylespec.side
				: $3Dmol.DoubleSide;

		// Click handling
		shape.clickable = stylespec.clickable ? true : false;
		shape.callback = typeof (stylespec.callback) === "function" ? stylespec.callback
				: null;
	};

	/**
	 * Custom renderable shape
	 * 
	 * @constructor $3Dmol.GLShape
	 * 
	 * @param {Number}
	 *            sid - Unique identifier
	 * @param {Object}
	 *            stylespec
	 * @returns {$3Dmol.GLShape}
	 */
	var GLShape = function(sid, stylespec) {

		stylespec = stylespec || {};
		$3Dmol.ShapeIDCount++;
		this.id = sid;

		this.boundingSphere = new $3Dmol.Sphere();
		/** @type {IntersectionShapes} */
		this.intersectionShape = {
			sphere : [],
			cylinder : [],
			line : [],
			triangle : []
		};

		updateFromStyle(this, stylespec);

		// Keep track of shape components and their centroids
		var components = [];
		var shapeObj = null;
		var renderedShapeObj = null;

		var geo = new $3Dmol.Geometry(true);

		/** Update shape with new style specification
		 * @param {ShapeSpec} newspec
		 * @return {$3Dmol.GLShape}
		 */
		this.updateStyle = function(newspec) {

			for ( var prop in newspec) {
				stylespec[prop] = newspec[prop];
			}

			updateFromStyle(this, stylespec);
		};

		/**
		 * Creates a custom shape from supplied vertex and face arrays
		 * @param {CustomSpec} customSpec
		 * @return {$3Dmol.GLShape}
		 */
		this.addCustom = function(customSpec) {

			customSpec.vertexArr = customSpec.vertexArr || [];
			customSpec.faceArr = customSpec.faceArr || [];
			customSpec.normalArr = customSpec.normalArr || [];
			customSpec.lineArr = customSpec.lineArr || [];

			// Force creation of new geometryGroup for each added component
			var geoGroup = geo.addGeoGroup();
			drawCustom(this, geoGroup, customSpec);
			geoGroup.truncateArrayBuffers(true, true);

			for (var i = 0; i < geoGroup.colorArray.length / 3; ++i) {
				geoGroup.colorArray[i * 3] = this.color.r;
				geoGroup.colorArray[i * 3 + 1] = this.color.g;
				geoGroup.colorArray[i * 3 + 2] = this.color.b;
			}

			components.push({
				id : geoGroup.id,
				geoGroup : geoGroup,
				centroid : geoGroup.getCentroid()
			});

			updateBoundingFromPoints(this.boundingSphere, components,
					geoGroup.vertexArray);
		};

		/**
		 * Creates a sphere shape
		 * @param {SphereSpec} sphereSpec
		 * @return {$3Dmol.GLShape}
		 */
		this.addSphere = function(sphereSpec) {

			sphereSpec.center = sphereSpec.center || {
				x : 0,
				y : 0,
				z : 0
			};
			sphereSpec.radius = sphereSpec.radius ? $3Dmol.Math.clamp(
					sphereSpec.radius, 0, Infinity) : 1.5;
			sphereSpec.color = $3Dmol.CC.color(sphereSpec.color);
			
			this.intersectionShape.sphere.push(new $3Dmol.Sphere(
					sphereSpec.center, sphereSpec.radius));

			var geoGroup = geo.addGeoGroup();
			$3Dmol.GLDraw.drawSphere(geo, sphereSpec.center,
					sphereSpec.radius, sphereSpec.color);
			geoGroup.truncateArrayBuffers(true, true);

			components.push({
				id : geoGroup.id,
				geoGroup : geoGroup, // has to be last group added
				centroid : new $3Dmol.Vector3(sphereSpec.center.x,
						sphereSpec.center.y, sphereSpec.center.z)
			});

			updateBoundingFromPoints(this.boundingSphere, components,
					geoGroup.vertexArray);
		};

		/**
		 * Creates a cylinder shape
		 * @param {CylinderSpec} cylinderSpec
		 * @return {$3Dmol.GLShape}
		 */
		this.addCylinder = function(cylinderSpec) {

			cylinderSpec.start = cylinderSpec.start || {};
			cylinderSpec.end = cylinderSpec.end || {};

			var start = new $3Dmol.Vector3(cylinderSpec.start.x || 0,
					cylinderSpec.start.y || 0, cylinderSpec.start.z || 0);
			var end = new $3Dmol.Vector3(cylinderSpec.end.x || 3,
					cylinderSpec.end.y || 0, cylinderSpec.end.z || 0);

			var radius = cylinderSpec.radius || 0.1;

			var color = $3Dmol.CC.color(cylinderSpec.color);


			var geoGroup = geo.addGeoGroup();

			$3Dmol.GLDraw.drawCylinder(geo, start, end, radius, color, cylinderSpec.fromCap, cylinderSpec.toCap);			
			geoGroup.truncateArrayBuffers(true, true);

			var centroid = new $3Dmol.Vector3();
			components.push({
				id : geoGroup.id,
				geoGroup : geoGroup,
				centroid : centroid.addVectors(cylinderSpec.start,
						cylinderSpec.end).multiplyScalar(0.5)
			});

			updateBoundingFromPoints(this.boundingSphere, components,
					geoGroup.vertexArray);

		};

		/**
		 * Creates an arrow shape
		 * @param {ArrowSpec} arrowSpec
		 * @return {$3Dmol.GLShape}
		 */
		this.addArrow = function(arrowSpec) {

			arrowSpec.start = arrowSpec.start || {};
			arrowSpec.end = arrowSpec.end || {};

			arrowSpec.start = new $3Dmol.Vector3(arrowSpec.start.x || 0,
					arrowSpec.start.y || 0, arrowSpec.start.z || 0);

			if (arrowSpec.dir instanceof $3Dmol.Vector3
					&& arrowSpec.length instanceof number) {
				var end = arrowSpec.dir.clone().multiplyScalar(length).add(
						start);
				arrowSpec.end = end;
			}

			else {
				arrowSpec.end = new $3Dmol.Vector3(arrowSpec.end.x || 3,
						arrowSpec.end.y || 0, arrowSpec.end.z || 0);
			}

			arrowSpec.radius = arrowSpec.radius || 0.1;

			arrowSpec.radiusRatio = arrowSpec.radiusRatio || 1.618034;
			arrowSpec.mid = (0 < arrowSpec.mid && arrowSpec.mid < 1) ? arrowSpec.mid
					: 0.618034;

			var geoGroup = geo.addGeoGroup();

			drawArrow(this, geoGroup, arrowSpec);
			geoGroup.truncateArrayBuffers(true, true);

			var centroid = new $3Dmol.Vector3();
			components.push({
				id : geoGroup.id,
				geoGroup : geoGroup,
				centroid : centroid.addVectors(arrowSpec.start, arrowSpec.end)
						.multiplyScalar(0.5)
			});

			updateBoundingFromPoints(this.boundingSphere, components,
					geoGroup.vertexArray);

		};
		
		/** 
		 * Creates custom shape from volumetric data 
		 * @param {string} data - Volumetric input data 
		 * @param {string} fmt - Input data format (e.g. 'cube' for cube file format)
		 * @param {VolSpec} volSpec - Volumetric data shape specification
		 * @return {$3Dmol.GLShape}
		 */
		this.addVolumetricData = function(data, fmt, volSpec) {

			// str, fmt, isoval, vxl
			var isoval = (volSpec.isoval !== undefined && typeof (volSpec.isoval) === "number") ? volSpec.isoval
					: 0.0;
			var vxl = (volSpec.voxel) ? true : false;

			var geoGroup = geo.addGeoGroup();

			// TODO: Initialize geometry group here (parseCube currently calls
			// addCustom...)
			switch (fmt) {
			case "cube":
				parseCube(this, geoGroup, data, isoval, vxl);
				break;
			}

			components.push({
				id : geoGroup.id,
				geoGroup : geoGroup,
				centroid : geoGroup.getCentroid()
			});

			this.updateStyle(volSpec);

			updateBoundingFromPoints(this.boundingSphere, components,
					geoGroup.vertexArray);

		};

		/**
		 * Initialize webgl objects for rendering
		 * @param {$3Dmol.Object3D} group
		 * 
		 */  
		this.globj = function(group) {

			geo.initTypedArrays();

			updateColor(geo, this.color);

			shapeObj = new $3Dmol.Object3D();
			var material = new $3Dmol.MeshLambertMaterial({
				wireframe : this.wireframe,
				vertexColors : true,
				ambient : 0x000000,
				reflectivity : 0,
				side : this.side,
				transparent : (this.alpha < 1) ? true : false,
				opacity : this.alpha
			});

			var mesh = new $3Dmol.Mesh(geo, material);
			shapeObj.add(mesh);

			if (renderedShapeObj) {
				group.remove(renderedShapeObj);
				renderedShapeObj = null;
			}
			renderedShapeObj = shapeObj.clone();
			group.add(renderedShapeObj);

		};

		this.removegl = function(group) {
			if (renderedShapeObj) {
				// dispose of geos and materials
				if (renderedShapeObj.geometry !== undefined)
					renderedShapeObj.geometry.dispose();
				if (renderedShapeObj.material !== undefined)
					renderedShapeObj.material.dispose();
				group.remove(renderedShapeObj);
				renderedShapeObj = null;
			}
			shapeObj = null;
		};

	};

	Object.defineProperty(GLShape.prototype, "position", {

		get : function() {
			return this.boundingSphere.center;
		}

	});

	Object.defineProperty(GLShape.prototype, "x", {

		get : function() {
			return this.boundingSphere.center.x;
		}

	});

	Object.defineProperty(GLShape.prototype, "y", {

		get : function() {
			return this.boundingSphere.center.y;
		}

	});

	Object.defineProperty(GLShape.prototype, "z", {

		get : function() {
			return this.boundingSphere.center.z;
		}

	});

	return GLShape;

}());

$3Dmol.ShapeIDCount = 0;//a molecular viewer based on GLMol



/**
 * WebGL-based 3Dmol.js viewer
 * Note: The preferred method of instantiating a GLViewer is through {@link $3Dmol.createViewer} 
 * 
 * @constructor 
 * @param {Object} element HTML element within which to create viewer
 * @param {function} callback - Callback function to be immediately executed on this viewer
 * @param {Object} defaultcolors - Object defining default atom colors as atom => color property value pairs for all models within this viewer
 */
$3Dmol.GLViewer = (function() {
	// private class variables
	var numWorkers = 4; // number of threads for surface generation
	var maxVolume = 64000; // how much to break up surface calculations

	// private class helper functions

	// computes the bounding box around the provided atoms
	/**
	 * @param {AtomSpec[]} atomlist
	 * @return {Array}
	 */
	var getExtent = function(atomlist) {
		var xmin, ymin, zmin, xmax, ymax, zmax, xsum, ysum, zsum, cnt;

		xmin = ymin = zmin = 9999;
		xmax = ymax = zmax = -9999;
		xsum = ysum = zsum = cnt = 0;

		if (atomlist.length === 0)
			return [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
		for (var i = 0; i < atomlist.length; i++) {
			var atom = atomlist[i];
			if (atom === undefined)
				continue;
			cnt++;
			xsum += atom.x;
			ysum += atom.y;
			zsum += atom.z;

			xmin = (xmin < atom.x) ? xmin : atom.x;
			ymin = (ymin < atom.y) ? ymin : atom.y;
			zmin = (zmin < atom.z) ? zmin : atom.z;
			xmax = (xmax > atom.x) ? xmax : atom.x;
			ymax = (ymax > atom.y) ? ymax : atom.y;
			zmax = (zmax > atom.z) ? zmax : atom.z;
		}

		return [ [ xmin, ymin, zmin ], [ xmax, ymax, zmax ],
				[ xsum / cnt, ysum / cnt, zsum / cnt ] ];
	};

	function GLViewer(element, callback, defaultcolors, nomouse) {
		// set variables
		var _viewer = this;
		var container = element;
		var id = container.id;

		var models = []; // atomistic molecular models
		var surfaces = [];
		var shapes = []; // Generic shapes
		var labels = [];
		var WIDTH = container.width();
		var HEIGHT = container.height();

		// set dimensions
		// $(container).width(WIDTH);
		// $(container).height(HEIGHT);

		var ASPECT = WIDTH / HEIGHT;
		var NEAR = 1, FAR = 800;
		var CAMERA_Z = 150;
		var fov = 20;


		var renderer = new $3Dmol.Renderer({
			antialias : true
		});
		// renderer.sortObjects = false; // hopefully improve performance

		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		renderer.domElement.style.padding = "0";
		renderer.domElement.style.position = "absolute"; //TODO: get rid of this
		renderer.domElement.style.top = "0px";
		renderer.domElement.style.zIndex = "0";
		container.append(renderer.domElement);
		renderer.setSize(WIDTH, HEIGHT);
		var camera = new $3Dmol.Camera(fov, ASPECT, NEAR, FAR);
		camera.position = new $3Dmol.Vector3(0, 0, CAMERA_Z);
		var vec = new $3Dmol.Vector3();
		camera.lookAt(vec);

		var raycaster = new $3Dmol.Raycaster(new $3Dmol.Vector3(0, 0, 0),
				new $3Dmol.Vector3(0, 0, 0));
		var projector = new $3Dmol.Projector();
		var mouseVector = new $3Dmol.Vector3(0, 0, 0);

		var scene = null;
		var rotationGroup = null; // which contains modelGroup
		var modelGroup = null;

		var bgColor = 0x000000;
		var fogStart = 0.4;
		var slabNear = -50; // relative to the center of rotationGroup
		var slabFar = 50;

		// UI variables
		var cq = new $3Dmol.Quaternion(0, 0, 0, 1);
		var dq = new $3Dmol.Quaternion(0, 0, 0, 1);
		var isDragging = false;
		var mouseStartX = 0;
		var mouseStartY = 0;
		var touchDistanceStart = 0;
		var currentModelPos = 0;
		var cz = 0;
		var cslabNear = 0;
		var cslabFar = 0;

		var setSlabAndFog = function() {
			var center = camera.position.z - rotationGroup.position.z;
			if (center < 1)
				center = 1;
			camera.near = center + slabNear;
			if (camera.near < 1)
				camera.near = 1;
			camera.far = center + slabFar;
			if (camera.near + 1 > camera.far)
				camera.far = camera.near + 1;
			if (camera instanceof $3Dmol.Camera) {
				camera.fov = fov;
			} else {
				camera.right = center * Math.tan(Math.PI / 180 * fov);
				camera.left = -camera.right;
				camera.top = camera.right / ASPECT;
				camera.bottom = -camera.top;
			}
			camera.updateProjectionMatrix();
			scene.fog.near = camera.near + fogStart
					* (camera.far - camera.near);
			// if (scene.fog.near > center) scene.fog.near = center;
			scene.fog.far = camera.far;
		};

		// display scene
		var show = function() {
			if (!scene)
				return;

			// var time = new Date();
			setSlabAndFog();
			renderer.render(scene, camera);
			// console.log("rendered in " + (+new Date() - time) + "ms");
		};

		var initializeScene = function() {

			scene = new $3Dmol.Scene();
			scene.fog = new $3Dmol.Fog(bgColor, 100, 200);

			modelGroup = new $3Dmol.Object3D();
			rotationGroup = new $3Dmol.Object3D();
			rotationGroup.useQuaternion = true;
			rotationGroup.quaternion = new $3Dmol.Quaternion(0, 0, 0, 1);
			rotationGroup.add(modelGroup);

			scene.add(rotationGroup);

			// setup lights
			var directionalLight = new $3Dmol.Light(0xFFFFFF);
			directionalLight.position = new $3Dmol.Vector3(0.2, 0.2, 1)
					.normalize();
			directionalLight.intensity = 1.0;
			scene.add(directionalLight);
		};

		initializeScene();

		renderer.setClearColorHex(bgColor, 1.0);
		scene.fog.color = $3Dmol.CC.color(bgColor);

		var clickedAtom = null;
		// enable mouse support
		var glDOM = $(renderer.domElement);

		// Checks for selection intersects on mousedown
		var handleClickSelection = function(mouseX, mouseY) {

			var mouse = {
				x : mouseX,
				y : mouseY,
				z : -1.0
			};
			mouseVector.set(mouse.x, mouse.y, mouse.z);
			projector.unprojectVector(mouseVector, camera);
			mouseVector.sub(camera.position).normalize();

			raycaster.set(camera.position, mouseVector);

			var clickables = [], intersects = [];
			var i, il;

			for (i = 0, il = models.length; i < il; i++) {
				var model = models[i];

				var atoms = model.selectedAtoms({
					clickable : true
				});
				clickables = clickables.concat(atoms);

			}

			for (i = 0, il = shapes.length; i < il; i++) {

				var shape = shapes[i];
				if (shape.clickable) {
					clickables.push(shape);
				}

			}

			intersects = raycaster.intersectObjects(modelGroup, clickables);

			if (intersects.length) {
				var selected = intersects[0].clickable;
				if (selected.callback !== undefined
						&& typeof (selected.callback) === "function") {
					selected.callback(selected, _viewer);
				}
			}

			show();
		};

		var calcTouchDistance = function(ev) { // distance between first two
												// fingers
			var xdiff = ev.originalEvent.targetTouches[0].pageX
					- ev.originalEvent.targetTouches[1].pageX;
			var ydiff = ev.originalEvent.targetTouches[0].pageY
					- ev.originalEvent.targetTouches[1].pageY;
			return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
		}

		if (!nomouse) {
			// user can request that the mouse handlers not be installed
			glDOM.bind('mousedown touchstart', function(ev) {
				ev.preventDefault();
				if (!scene)
					return;
				var x = ev.pageX, y = ev.pageY;
				if (ev.originalEvent.targetTouches
						&& ev.originalEvent.targetTouches[0]) {
					x = ev.originalEvent.targetTouches[0].pageX;
					y = ev.originalEvent.targetTouches[0].pageY;
				}
				if (x === undefined)
					return;
				isDragging = true;
				clickedAtom = null;
				mouseButton = ev.which;
				mouseStartX = x;
				mouseStartY = y;
				touchDistanceStart = 0;
				if (ev.originalEvent.targetTouches
						&& ev.originalEvent.targetTouches.length == 2) {
					touchDistanceStart = calcTouchDistance(ev);
				}
				cq = rotationGroup.quaternion;
				cz = rotationGroup.position.z;
				currentModelPos = modelGroup.position.clone();
				cslabNear = slabNear;
				cslabFar = slabFar;

				// handle selection
				var mouseX = (x / $(window).width()) * 2 - 1;
				var mouseY = -(y / HEIGHT) * 2 + 1;
				handleClickSelection(mouseX, mouseY, ev, container);

			});

			glDOM.bind('DOMMouseScroll mousewheel', function(ev) { // Zoom
				ev.preventDefault();
				if (!scene)
					return;
				var scaleFactor = (CAMERA_Z - rotationGroup.position.z) * 0.85;
				if (ev.originalEvent.detail) { // Webkit
					rotationGroup.position.z += scaleFactor
							* ev.originalEvent.detail / 10;
				} else if (ev.originalEvent.wheelDelta) { // Firefox
					rotationGroup.position.z -= scaleFactor
							* ev.originalEvent.wheelDelta / 400;
				}

				show();
			});

			glDOM.bind("contextmenu", function(ev) {
				ev.preventDefault();
			});
			$('body').bind('mouseup touchend', function(ev) {
				isDragging = false;
			});

			glDOM
					.bind(
							'mousemove touchmove',
							function(ev) { // touchmove
								ev.preventDefault();
								if (!scene)
									return;
								if (!isDragging)
									return;
								var mode = 0;

								var x = ev.pageX, y = ev.pageY;
								if (ev.originalEvent.targetTouches
										&& ev.originalEvent.targetTouches[0]) {
									x = ev.originalEvent.targetTouches[0].pageX;
									y = ev.originalEvent.targetTouches[0].pageY;
								}
								if (x === undefined)
									return;
								var dx = (x - mouseStartX) / WIDTH;
								var dy = (y - mouseStartY) / HEIGHT;
								// check for pinch
								if (touchDistanceStart != 0
										&& ev.originalEvent.targetTouches
										&& ev.originalEvent.targetTouches.length == 2) {
									var newdist = calcTouchDistance(ev);
									// change to zoom
									mode = 2;
									dy = (touchDistanceStart - newdist) * 2
											/ (WIDTH + HEIGHT);
								} else if (ev.originalEvent.targetTouches
										&& ev.originalEvent.targetTouches.length == 3) {
									// translate
									mode = 1;
								}

								var r = Math.sqrt(dx * dx + dy * dy);
								var scaleFactor;
								if (mode == 3
										|| (mouseButton == 3 && ev.ctrlKey)) { // Slab
									slabNear = cslabNear + dx * 100;
									slabFar = cslabFar + dy * 100;
								} else if (mode == 2 || mouseButton == 3
										|| ev.shiftKey) { // Zoom
									scaleFactor = (CAMERA_Z - rotationGroup.position.z) * 0.85;
									if (scaleFactor < 80)
										scaleFactor = 80;
									rotationGroup.position.z = cz - dy
											* scaleFactor;
								} else if (mode == 1 || mouseButton == 2
										|| ev.ctrlKey) { // Translate
									var q = rotationGroup.quaternion;						
									var t = new $3Dmol.Vector3(0,0,rotationGroup.position.z);
									projector.projectVector(t, camera);
									t.x += dx*2;
									t.y -= dy*2;
									projector.unprojectVector(t, camera);
									t.z = 0;							
									t.applyQuaternion(q);

									modelGroup.position.addVectors(currentModelPos,t);
								} else if ((mode === 0 || mouseButton == 1)
										&& r !== 0) { // Rotate
									var rs = Math.sin(r * Math.PI) / r;
									dq.x = Math.cos(r * Math.PI);
									dq.y = 0;
									dq.z = rs * dx;
									dq.w = -rs * dy;
									rotationGroup.quaternion = new $3Dmol.Quaternion(
											1, 0, 0, 0);
									rotationGroup.quaternion.multiply(dq);
									rotationGroup.quaternion.multiply(cq);
								}
								show();
							});
		}
		// public methods
		/**
		 * Set the background color (default white)
		 * 
		 * @function $3Dmol.GLViewer#setBackgroundColor
		 * @param {number}
		 *            hex Hexcode specified background color, or standard color spec
		 * @param {number}
		 *            a Alpha level (default 1.0)
		 * 
		 * @example
		 * 
		 * //Set 'myviewer' background color to white
		 * myviewer.setBackgroundColor(0xffffff)
		 * 
		 */
		this.setBackgroundColor = function(hex, a) {
			a = a | 1.0;
			var c = $3Dmol.CC.color(hex);
			scene.fog.color = c;
			bgColor = c.getHex();
			renderer.setClearColorHex(c.getHex(), a);
			show();
		};

		/**
		 * Set viewer width
		 * 
		 * @function $3Dmol.GLViewer#setWidth
		 * @param {number}
		 *            w Width in pixels
		 */
		this.setWidth = function(w) {
			WIDTH = w || WIDTH;
			renderer.setSize(WIDTH, HEIGHT);
		};

		/**
		 * Set viewer height
		 * 
		 * @function $3Dmol.GLViewer#setHeight
		 * @param {number}
		 *            h Height in pixels
		 */
		this.setHeight = function(h) {
			HEIGHT = h || HEIGHT;
			renderer.setSize(WIDTH, HEIGHT);
		};

		/**
		 * Resize viewer according to containing HTML element's dimensions
		 * 
		 * @function $3Dmol.GLViewer#resize
		 */
		this.resize = function() {
			WIDTH = container.width();
			HEIGHT = container.height();
			ASPECT = WIDTH / HEIGHT;
			renderer.setSize(WIDTH, HEIGHT);
			camera.aspect = ASPECT;
			camera.updateProjectionMatrix();
			show();
		};

		$(window).resize(this.resize);

		/**
		 * Return specified model
		 * 
		 * @function $3Dmol.GLViewer#getModel
		 * @param {number}
		 *            [id=last model id] - Retrieve model with specified id
		 * @default Returns last model added to viewer
		 * @return {GLModel}
		 * 
		 * @example // Retrieve reference to first GLModel added var m =
		 *          glviewer.getModel(0);
		 */
		this.getModel = function(id) {
			id = id || models.length - 1;
			return models[id];
		};

		/**
		 * Rotate scene by angle degrees around axis
		 * 
		 * @function $3Dmol.GLViewer#rotate
		 * @param {number}
		 *            [angle] - Angle, in degrees, to rotate by.
		 * @param {string}
		 *            [angle] - Axis ("x", "y", or "z") to rotate around.
		 *            Default "y"
		 * 
		 */
		this.rotate = function(angle, axis) {
			if (typeof (axis) === "undefined") {
				axis = "y";
			}
			var i = 0, j = 0, k = 0;
			var rangle = Math.PI * angle / 180.0;
			var s = Math.sin(rangle / 2.0);
			var c = Math.cos(rangle / 2.0);
			if (axis == "x")
				i = s;
			if (axis == "y")
				j = s;
			if (axis == "z")
				k = s;

			var q = new $3Dmol.Quaternion(i, j, k, c).normalize();
			rotationGroup.quaternion.multiply(q);
			show();
		};

		/** Returns an array representing the current viewpoint.
		 * Translation, zoom, and rotation quaternion. 
		 * @returns {Array.<number>} arg */
		this.getView = function() {
			if (!modelGroup)
				return [ 0, 0, 0, 0, 0, 0, 0, 1 ];
			var pos = modelGroup.position;
			var q = rotationGroup.quaternion;
			return [ pos.x, pos.y, pos.z, rotationGroup.position.z, q.x, q.y,
					q.z, q.w ];
		};

		/** Sets the view to the specified translation, zoom, and rotation. 
		 * @param {Array.<number>} arg */
		this.setView = function(arg) {

			if (arg === undefined
					|| !(arg instanceof Array || arg.length !== 8))
				return;

			if (!modelGroup || !rotationGroup)
				return;
			modelGroup.position.x = arg[0];
			modelGroup.position.y = arg[1];
			modelGroup.position.z = arg[2];
			rotationGroup.position.z = arg[3];
			rotationGroup.quaternion.x = arg[4];
			rotationGroup.quaternion.y = arg[5];
			rotationGroup.quaternion.z = arg[6];
			rotationGroup.quaternion.w = arg[7];
			if(typeof(arg[8]) != "undefined") {
				rotationGroup.position.x = arg[8];
				rotationGroup.position.y = arg[9];
			}
			show();
		};

		// apply styles, models, etc in viewer
		/**
		 * Render current state of viewer, after 
		 * adding/removing models, applying styles, etc.
		 * 
		 * @function $3Dmol.GLViewer#render
		 */
		this.render = function() {

			var time1 = new Date();
			var view = this.getView();
			var i;
			for (i = 0; i < models.length; i++) {
				if (models[i]) {
					models[i].globj(modelGroup);
				}
			}

			for (i = 0; i < shapes.length; i++) {
				if (shapes[i]) {
					shapes[i].globj(modelGroup);
				}
			}

			for (i in surfaces) { // this is an array with possible holes
				if (surfaces.hasOwnProperty(i)) {
					var geo = surfaces[i].geo;
					// async surface generation can cause
					// the geometry to be webgl initialized before it is fully
					// formed; force various recalculations until full surface
					// is
					// available
					if (!surfaces[i].finished) {
						geo.verticesNeedUpdate = true;
						geo.elementsNeedUpdate = true;
						geo.normalsNeedUpdate = true;
						geo.colorsNeedUpdate = true;
						geo.buffersNeedUpdate = true;
						geo.boundingSphere = null;

						if (surfaces[i].done)
							surfaces[i].finished = true;

						// remove partially rendered surface
						if (surfaces[i].lastGL)
							modelGroup.remove(surfaces[i].lastGL);

						// create new surface
						var smesh = null;
						if(surfaces[i].mat instanceof $3Dmol.LineBasicMaterial) {
							//special case line meshes
							smesh = new $3Dmol.Line(geo, surfaces[i].mat);
						}
						else {
							smesh = new $3Dmol.Mesh(geo, surfaces[i].mat);
						}
						surfaces[i].lastGL = smesh;
						modelGroup.add(smesh);
					} // else final surface already there
				}
			}
			this.setView(view); // Calls show() => renderer render
			var time2 = new Date();
			console.log("render time: " + (time2 - time1));
		};

		/**
		 * 
		 * @param {AtomSelectionSpec}
		 *            sel
		 * @return {AtomSpec[]}
		 */
		function getAtomsFromSel(sel) {
			var atoms = [];
			if (typeof (sel) === "undefined")
				sel = {};

			var ms = [];
			var i;

			if (typeof sel.model === "undefined") {
				for (i = 0; i < models.length; i++) {
					if (models[i])
						ms.push(models[i]);
				}
			} else { // specific to some models
				ms = sel.model;
				if (!$.isArray(ms))
					ms = [ ms ];
			}

			for (i = 0; i < ms.length; i++) {
				atoms = atoms.concat(ms[i].selectedAtoms(sel));
			}

			return atoms;
		}

		/**
		 * 
		 * @param {AtomSpec}
		 *            atom
		 * @param {AtomSpec}
		 *            sel
		 * @return {boolean}
		 */
		function atomIsSelected(atom, sel) {
			if (typeof (sel) === "undefined")
				sel = {};

			var ms = [];
			var i;

			if (typeof sel.model === "undefined") {
				for (i = 0; i < models.length; i++) {
					if (models[i])
						ms.push(models[i]);
				}
			} else { // specific to some models
				ms = sel.model;
				if (!$.isArray(ms))
					ms = [ ms ];
			}

			for (i = 0; i < ms.length; i++) {
				if (ms[i].atomIsSelected(atom, sel))
					return true;
			}

			return false;
		}

		/**
		 * Return pdb output of selected atoms (if atoms from pdb input)
		 * 
		 * @function $3Dmol.GLViewer#pdbData  
		 * @param {Object=} [sel] - Selection specification specifying model and atom properties to select.  Default: all atoms in viewer
		 * @return {string} PDB string of selected atoms
		 */
		this.pdbData = function(sel) {
			var atoms = getAtomsFromSel(sel);
			var ret = "";
			for (var i = 0, n = atoms.length; i < n; ++i) {
				ret += atoms[i].pdbline + "\n";
			}
			return ret;
		};

		/**
		 * Zoom current view by a constant factor
		 * 
		 * @function $3Dmol.GLViewer#zoom
		 * @param {number}
		 *            [factor] - Magnification factor. Values greater than 1
		 *            will zoom in, less than one will zoom out. Default 2.
		 * 
		 */
		this.zoom = function(factor) {
			var factor = factor || 2;
			var scale = (CAMERA_Z - rotationGroup.position.z) / factor;
			rotationGroup.position.z = CAMERA_Z - scale;
			show();
		};
		

		/**
		 * Zoom to center of atom selection
		 * 
		 * @function $3Dmol.GLViewer#zoomTo
		 * @param {Object}
		 *            [sel] - Selection specification specifying model and atom
		 *            properties to select. Default: all atoms in viewer
		 * 
		 * @example // Assuming we have created a model of a protein with
		 *          multiple chains (e.g. from a PDB file), focus on atoms in
		 *          chain B glviewer.zoomTo({chain: 'B'});
		 *  // Focus on centroid of all atoms of all models in this
		 * viewer glviewer.zoomTo(); // (equivalent to glviewer.zoomTo({}) )
		 */
		this.zoomTo = function(sel) {
			var atoms = getAtomsFromSel(sel).concat(shapes);
			var allatoms = getAtomsFromSel({}).concat(shapes);
			var tmp = getExtent(atoms);
			var alltmp = getExtent(allatoms);
			// use selection for center
			var center = new $3Dmol.Vector3(tmp[2][0], tmp[2][1], tmp[2][2]);
			modelGroup.position = center.clone().multiplyScalar(-1);
			// but all for bounding box
			var x = alltmp[1][0] - alltmp[0][0], y = alltmp[1][1]
					- alltmp[0][1], z = alltmp[1][2] - alltmp[0][2];

			var maxD = Math.sqrt(x * x + y * y + z * z);
			if (maxD < 5)
				maxD = 5;

			// use full bounding box for slab/fog
			slabNear = -maxD / 1.9;
			slabFar = maxD / 2;

			// for zoom, use selection box
			x = tmp[1][0] - tmp[0][0];
			y = tmp[1][1] - tmp[0][1];
			z = tmp[1][2] - tmp[0][2];
			maxD = Math.sqrt(x * x + y * y + z * z);
			if (maxD < 5)
				maxD = 5;
			
			//find the farthest atom from center to get max distance needed for view
			var maxDsq = 25;
			for (var i = 0; i < atoms.length; i++) {
				var dsq = center.distanceToSquared(atoms[i]);
				if(dsq > maxDsq)
					maxDsq = dsq;
			}
			
			var maxD = Math.sqrt(maxDsq)*2;

			rotationGroup.position.z = -(maxD * 0.5
					/ Math.tan(Math.PI / 180.0 * camera.fov / 2) - CAMERA_Z);

			show();
		};

		/**
		 * Add label to viewer
		 * 
		 * @function $3Dmol.GLViewer#addLabel
		 * @param {string}
		 *            text - Label text
		 * @param {Object}
		 *            data - Label style specification
		 * @return {$3Dmol.Label}
		 * 
		 * @example
		 *  // Assuming glviewer contains a model representing a protein, label
		 * all alpha carbons with their residue name
		 *  // Select all alpha carbons (have property atom : "CA") from last
		 * model added var atoms =
		 * glviewer.getModel().selectedAtoms({atom:"CA"}); var labels = [];
		 * 
		 * for (var a in atoms) { var atom = atoms[a];
		 *  // Create label at alpha carbon's position displaying atom's residue
		 * and residue number var labelText = atom.resname + " " + atom.resi;
		 * 
		 * var l = glviewer.createLabel(labelText, {fontSize: 12, position: {x:
		 * atom.x, y: atom.y, z: atom.z});
		 * 
		 * labels.push(l); }
		 *  // Render labels glviewer.render();
		 */
		this.addLabel = function(text, data) {
			var label = new $3Dmol.Label(text, data);
			label.setContext();
			modelGroup.add(label.sprite);
			labels.push(label);
			show();
			return label;
		};
		
		/** Add residue labels.  This will generate one label per a
		 * residue within the selected atoms.  The label will be at the
		 * centroid of the atoms and styled according to the passed style.
		 * The label text will be [resn][resi]
		 * 
		 * @param {Object} sel
		 * @param {Object} style
		 */
        this.addResLabels = function(sel, style) {
			applyToModels("addResLabels", sel, this, style);
        }

		/**
		 * Remove label from viewer
		 * 
		 * @function $3Dmol.GLViewer#removeLabel
		 * @param {$3Dmol.Label}
		 *            label - $3Dmol label
		 * 
		 * @example // Remove labels created in [addLabel example]{@link $3Dmol.GLViewer#addLabel}
		 * 
		 * for (var i = 0; i < labels.length; i++) {
		 * glviewer.removeLabel(label); }
		 * 
		 * glviewer.render();
		 */
		this.removeLabel = function(label) {
			labels.remove(label);
			label.dispose();
			modelGroup.remove(label.sprite);
		};

		/**
		 * Remove all labels from viewer
		 * 
		 * @function $3Dmol.GLViewer#removeAllLabels

		 */
		this.removeAllLabels = function() {
			for (var i = 0; i < labels.length; i++) {
				modelGroup.remove(labels[i].sprite);
			}
			labels = [];
		};
		
		// Modify label style
		/**
		 * Modify existing label's style
		 * 
		 * @function $3Dmol.GLViewer#setLabelStyle
		 * @param {$3Dmol.Label}
		 *            label - $3Dmol label
		 * @param {Object}
		 *            stylespec - Label style specification
		 * @return {$3Dmol.Label}
		 */
		this.setLabelStyle = function(label, stylespec) {

			label.dispose();
			label.stylespec = stylespec;
			label.setContext();
			modelGroup.add(label.sprite);

			return label;

		};

		// Change label text
		/**
		 * Modify existing label's text
		 * 
		 * @function $3Dmol.GLViewer#setLabelText
		 * @param {$3Dmol.Label}
		 *            label - $3Dmol label
		 * @param {String}
		 *            text - Label text
		 * @return {$3Dmol.Label}
		 */
		this.setLabelText = function(label, text) {

			label.dispose();
			label.text = text;
			label.setContext();
			modelGroup.add(label.sprite);

			return label;

		};

		/**
		 * Add shape object to viewer 
		 * @see {@link $3Dmol.GLShape}
		 * 
		 * @function $3Dmol.GLViewer#addShape
		 * @param {ShapeSpec} shapeSpec - style specification for label
		 * @return {$3Dmol.GLShape}
		 */
		this.addShape = function(shapeSpec) {
			shapeSpec = shapeSpec || {};
			var shape = new $3Dmol.GLShape(shapes.length, shapeSpec);
			shapes.push(shape);

			return shape;

		};

		/**
		 * Remove shape object from viewer
		 *
		 * @function $3Dmol.GLViewer#removeShape
		 * @param {$3Dmol.GLShape} shape - Reference to shape object to remove
		 */
		this.removeShape = function(shape) {
			if (!shape)
				return;
			shape.removegl(modelGroup);
			delete shapes[shape.id];
			// clear off back of model array
			while (shapes.length > 0
					&& typeof (shapes[shapes.length - 1]) === "undefined")
				shapes.pop();
		};
		
		/**
		 * Remove all shape objects from viewer
		 * @function $3Dmol.GLViewer#removeAllShapes
		 */
		this.removeAllShapes = function() {
			for (var i = 0; i < shapes.length; i++) {
				var shape = shapes[i];
				shape.removegl(modelGroup);
			}
			shapes = [];
		}

		/**
		 * Create and add sphere shape. This method provides a shorthand 
		 * way to create a spherical shape object
		 * 
		 * @function $3Dmol.GLViewer#addSphere
		 * @param {SphereSpec} spec - Sphere shape style specification
		 * @return {$3Dmol.GLShape}
		 */
		this.addSphere = function(spec) {
			var s = new $3Dmol.GLShape(shapes.length);
			spec = spec || {};
			s.addSphere(spec);
			shapes.push(s);

			return s;
		};

		/**
		 * Create and add arrow shape
		 * 
		 * @function $3Dmol.GLViewer#addArrow
		 * @param {ArrowSpec} spec - Style specification
		 * @return {$3Dmol.GLShape}
		 */
		this.addArrow = function(spec) {
			var s = new $3Dmol.GLShape(shapes.length);
			spec = spec || {};
			s.addArrow(spec);
			shapes.push(s);

			return s;
		};
		
		/**
		 * Create and add cylinder shape
		 * 
		 * @function $3Dmol.GLViewer#addArrow
		 * @param {CylinderSpec} spec - Style specification
		 * @return {$3Dmol.GLShape}
		 */
		this.addCylinder = function(spec) {
			var s = new $3Dmol.GLShape(shapes.length);
			spec = spec || {};
			s.addCylinder(spec);
			shapes.push(s);

			return s;
		};

		/**
		 * Add custom shape component from user supplied function
		 * 
		 * @function $3Dmol.GLViewer#addCustom
		 * @param {CustomSpec} spec - Style specification
		 * @return {$3Dmol.GLShape}
		 */
		this.addCustom = function(spec) {
			var s = new $3Dmol.GLShape(shapes.length);
			spec = spec || {};
			s.addCustom(spec);
			shapes.push(s);

			return s;
		};

		/**
		 * Construct isosurface from volumetric data in gaussian cube format
		 * 
		 * @function $3Dmol.GLViewer#addVolumetricData
		 * @param {String} data - Input file contents 
		 * @param {String} format - Input file format (currently only supports "cube")
		 * @param {VolSpec} spec - Shape style specification
		 * @return {$3Dmol.GLShape}
		 */
		this.addVolumetricData = function(data, format, spec) {
			var s = new $3Dmol.GLShape(shapes.length);
			spec = spec || {};
			s.addVolumetricData(data, format, spec);
			shapes.push(s);

			return s;
		};

		/**
		 * Create and add model to viewer, given molecular data and its format 
		 * (pdb, sdf, xyz, or mol2)
		 * 
		 * @function $3Dmol.GLViewer#addModel
		 * @param {string} data - Input data
		 * @param {string} format - Input format ('pdb', 'sdf', 'xyz', or 'mol2')
		 * @return {$3Dmol.GLModel}
		 */
		this.addModel = function(data, format, options) {

			var m = new $3Dmol.GLModel(models.length, defaultcolors);
			m.addMolData(data, format, options);
			models.push(m);

			return m;
		};

		/**
		 * Delete specified model from viewer
		 * 
		 * @function $3Dmol.GLViewer#removeModel
		 * @param {$3Dmol.GLModel} model
		 */
		this.removeModel = function(model) {
			if (!model)
				return;
			model.removegl(modelGroup);
			delete models[model.getID()];
			// clear off back of model array
			while (models.length > 0
					&& typeof (models[models.length - 1]) === "undefined")
				models.pop();
		};

		/** 
		 * Delete all existing models
		 * @function $3Dmol.GLViewer#removeAllModels
		 */
		this.removeAllModels = function() {
			for (var i = 0; i < models.length; i++) {
				var model = models[i];
				model.removegl(modelGroup);

			}
			models = [];
		};

		/**
		 * Create a new model from atoms specified by sel.
		 * If extract, removes selected atoms from existing models 
		 * 
		 * @function $3Dmol.GLViewer#createModelFrom
		 * @param {Object} sel - Atom selection specification
		 * @param {boolean=} extract - If true, remove selected atoms from existing models
		 * @return {$3Dmol.GLModel}
		 */
		this.createModelFrom = function(sel, extract) {
			var m = new $3Dmol.GLModel(models.length, defaultcolors);
			for (var i = 0; i < models.length; i++) {
				if (models[i]) {
					var atoms = models[i].selectedAtoms(sel);
					m.addAtoms(atoms);
					if (extract)
						models[i].removeAtoms(atoms);
				}
			}
			models.push(m);
			return m;
		};

		function applyToModels(func, sel, value1, value2) {
			for (var i = 0; i < models.length; i++) {
				if (models[i]) {
					models[i][func](sel, value1, value2);
				}
			}
		}

		/**
		 * Set style properties to all selected atoms
		 * 
		 * @function $3Dmol.GLViewer#setStyle
		 * @param {AtomSelectionSpec} sel - Atom selection specification
		 * @param {AtomStyleSpec} style - Style spec to apply to specified atoms
		 * 
		 * @example
		 * viewer.setStyle({}, {stick:{}}); //set all atoms to stick
		 * viewer.setStyle({chain: 'B'}, {carton: {color: spectrum}}); //set chain B to rainbow cartoon
		 */
		this.setStyle = function(sel, style) {
			applyToModels("setStyle", sel, style, false);
		};

		/**
		 * Add style properties to all selected atoms
		 * 
		 * @function $3Dmol.GLViewer#addStyle
		 * @param {AtomSelectionSpec} sel - Atom selection specification
		 * @param {AtomStyleSpec} style - style spec to add to specified atoms
		 */
		this.addStyle = function(sel, style) {
			applyToModels("setStyle", sel, style, true);
		};

		/**
		 * @function $3Dmol.GLViewer#setColorByProperty
		 * @param {AtomSelectionSpec} sel
		 * @param {type} prop
		 * @param {type} scheme
		 */
		this.setColorByProperty = function(sel, prop, scheme) {
			applyToModels("setColorByProperty", sel, prop, scheme);
		};

		/**
		 * @function $3Dmol.GLViewer#setColorByElement
		 * @param {AtomSelectionSpec} sel
		 * @param {type} colors
		 */
		this.setColorByElement = function(sel, colors) {
			applyToModels("setColorByElement", sel, colors);
		};

		/**
		 * 
		 * @param {AtomSpec[]} atomlist
		 * @param {Array}
		 *            extent
		 * @return {Array}
		 */
		var getAtomsWithin = function(atomlist, extent) {
			var ret = [];

			for (var i = 0; i < atomlist.length; i++) {
				var atom = atomlist[i];
				if (typeof (atom) == "undefined")
					continue;

				if (atom.x < extent[0][0] || atom.x > extent[1][0])
					continue;
				if (atom.y < extent[0][1] || atom.y > extent[1][1])
					continue;
				if (atom.z < extent[0][2] || atom.z > extent[1][2])
					continue;
				ret.push(i);
			}
			return ret;
		};

		// return volume of extent
		var volume = function(extent) {
			var w = extent[1][0] - extent[0][0];
			var h = extent[1][1] - extent[0][1];
			var d = extent[1][2] - extent[0][2];
			return w * h * d;
		}; // volume
		/*
		 * Break up bounding box/atoms into smaller pieces so we can parallelize
		 * with webworkers and also limit the size of the working memory Returns
		 * a list of bounding boxes with the corresponding atoms. These extents
		 * are expanded by 4 angstroms on each side.
		 */
		/**
		 * 
		 * @param {Array}
		 *            extent
		 * @param {AtomSpec[]} atomlist
		 * @param {AtomSpec[]} atomstoshow
		 * @return {Array}
		 */
		var carveUpExtent = function(extent, atomlist, atomstoshow) {
			var ret = [];

			var copyExtent = function(extent) {
				// copy just the dimensions
				var ret = [];
				ret[0] = [ extent[0][0], extent[0][1], extent[0][2] ];
				ret[1] = [ extent[1][0], extent[1][1], extent[1][2] ];
				return ret;
			}; // copyExtent
			var splitExtentR = function(extent) {
				// recursively split until volume is below maxVol
				if (volume(extent) < maxVolume) {
					return [ extent ];
				} else {
					// find longest edge
					var w = extent[1][0] - extent[0][0];
					var h = extent[1][1] - extent[0][1];
					var d = extent[1][2] - extent[0][2];

					var index;

					if (w > h && w > d) {
						index = 0;
					} else if (h > w && h > d) {
						index = 1;
					} else {
						index = 2;
					}

					// create two halves, splitting at index
					var a = copyExtent(extent);
					var b = copyExtent(extent);
					var mid = (extent[1][index] - extent[0][index]) / 2
							+ extent[0][index];
					a[1][index] = mid;
					b[0][index] = mid;

					var alist = splitExtentR(a);
					var blist = splitExtentR(b);
					return alist.concat(blist);
				}
			}; // splitExtentR

			// divide up extent
			var splits = splitExtentR(extent);
			// now compute atoms within expanded (this could be more efficient)
			var off = 6; // enough for water and 2*r, also depends on scale
			// factor
			for (var i = 0, n = splits.length; i < n; i++) {
				var e = copyExtent(splits[i]);
				e[0][0] -= off;
				e[0][1] -= off;
				e[0][2] -= off;
				e[1][0] += off;
				e[1][1] += off;
				e[1][2] += off;

				var atoms = getAtomsWithin(atomlist, e);
				var toshow = getAtomsWithin(atomstoshow, splits[i]);

				// ultimately, divide up by atom for best meshing
				ret.push({
					extent : splits[i],
					atoms : atoms,
					toshow : toshow
				});
			}

			return ret;
		};

		// create a mesh defined from the passed vertices and faces and material
		// Just create a single geometry chunk - broken up whether sync or not
		/**
		 * 
		 * @param {AtomSpec[]} atoms
		 * @param {{vertices:number,faces:number}}
		 *            VandF
		 * @param {$3Dmol.MeshLambertMaterial}
		 *            mat
		 * @return {$3Dmol.Mesh}
		 */
		var generateSurfaceMesh = function(atoms, VandF, mat) {

			var geo = new $3Dmol.Geometry(true);
			// Only one group per call to generate surface mesh (addSurface
			// should split up mesh render)
			var geoGroup = geo.updateGeoGroup(0);

			var vertexArray = geoGroup.vertexArray;
			// reconstruct vertices and faces
			var v = VandF['vertices'];
			var offset;
			var i, il;
			for (i = 0, il = v.length; i < il; i++) {
				offset = geoGroup.vertices * 3;
				vertexArray[offset] = v[i].x;
				vertexArray[offset + 1] = v[i].y;
				vertexArray[offset + 2] = v[i].z;
				geoGroup.vertices++;
			}

			var faces = VandF['faces'];
			geoGroup.faceidx = faces.length;// *3;
			geo.initTypedArrays();

			// set colors for vertices
			var colors = [];
			for (i = 0, il = atoms.length; i < il; i++) {
				var atom = atoms[i];
				if (atom) {
					if (typeof (atom.surfaceColor) != "undefined") {
						colors[i] = atom.surfaceColor;
					} else if (atom.color) // map from atom
						colors[i] = $3Dmol.CC.color(atom.color);
				}
			}

			var verts = geoGroup.vertexArray;
			var colorArray = geoGroup.colorArray;
			var normalArray = geoGroup.normalArray;
			var vA, vB, vC, norm;

			// Setup colors, faces, and normals
			for (i = 0, il = faces.length; i < il; i += 3) {

				// var a = faces[i].a, b = faces[i].b, c = faces[i].c;
				var a = faces[i], b = faces[i + 1], c = faces[i + 2];
				var A = v[a]['atomid'];
				var B = v[b]['atomid'];
				var C = v[c]['atomid'];

				var offsetA = a * 3, offsetB = b * 3, offsetC = c * 3;

				colorArray[offsetA] = colors[A].r;
				colorArray[offsetA + 1] = colors[A].g;
				colorArray[offsetA + 2] = colors[A].b;
				colorArray[offsetB] = colors[B].r;
				colorArray[offsetB + 1] = colors[B].g;
				colorArray[offsetB + 2] = colors[B].b;
				colorArray[offsetC] = colors[C].r;
				colorArray[offsetC + 1] = colors[C].g;
				colorArray[offsetC + 2] = colors[C].b;

				// setup Normals

				vA = new $3Dmol.Vector3(verts[offsetA], verts[offsetA + 1],
						verts[offsetA + 2]);
				vB = new $3Dmol.Vector3(verts[offsetB], verts[offsetB + 1],
						verts[offsetB + 2]);
				vC = new $3Dmol.Vector3(verts[offsetC], verts[offsetC + 1],
						verts[offsetC + 2]);

				vC.subVectors(vC, vB);
				vA.subVectors(vA, vB);
				vC.cross(vA);

				// face normal
				norm = vC;
				norm.normalize();

				normalArray[offsetA] += norm.x;
				normalArray[offsetB] += norm.x;
				normalArray[offsetC] += norm.x;
				normalArray[offsetA + 1] += norm.y;
				normalArray[offsetB + 1] += norm.y;
				normalArray[offsetC + 1] += norm.y;
				normalArray[offsetA + 2] += norm.z;
				normalArray[offsetB + 2] += norm.z;
				normalArray[offsetC + 2] += norm.z;

			}
			geoGroup.faceArray = new Uint16Array(faces);
			var mesh = new $3Dmol.Mesh(geo, mat);
			mesh.doubleSided = true;

			return mesh;
		};

		// do same thing as worker in main thread
		/**
		 * 
		 * @param {$3Dmol.SurfaceType}
		 *            type
		 * @param {Array}
		 *            expandedExtent
		 * @param {Array}
		 *            extendedAtoms
		 * @param {Array}
		 *            atomsToShow
		 * @param {AtomSpec[]} atoms
		 * @param {number}
		 *            vol
		 * @return {Object}
		 */
		var generateMeshSyncHelper = function(type, expandedExtent,
				extendedAtoms, atomsToShow, atoms, vol) {
			var time = new Date();
			var ps = new $3Dmol.ProteinSurface();
			ps.initparm(expandedExtent, (type === 1) ? false : true, vol);

			var time2 = new Date();
			console.log("initialize " + (time2 - time) + "ms");

			ps.fillvoxels(atoms, extendedAtoms);

			var time3 = new Date();
			console.log("fillvoxels " + (time3 - time2) + "  " + (time3 - time)
					+ "ms");

			ps.buildboundary();

			if (type == $3Dmol.SurfaceType.SES) {
				ps.fastdistancemap();
				ps.boundingatom(false);
				ps.fillvoxelswaals(atoms, extendedAtoms);
			}

			var time4 = new Date();
			console.log("buildboundaryetc " + (time4 - time3) + "  "
					+ (time4 - time) + "ms");

			ps.marchingcube(type);

			var time5 = new Date();
			console.log("marching cube " + (time5 - time4) + "  "
					+ (time5 - time) + "ms");

			return ps.getFacesAndVertices(atomsToShow);
		};

		/**
		 * 
		 * @param {matSpec}
		 *            style
		 * @return {$3Dmol.MeshLambertMaterial}
		 */
		function getMatWithStyle(style) {
			var mat = new $3Dmol.MeshLambertMaterial();
			mat.vertexColors = $3Dmol.VertexColors;

			for ( var prop in style) {
				if (prop === "color" || prop === "map") {
					// ignore
				} else if (style.hasOwnProperty(prop))
					mat[prop] = style[prop];
			}
			if (style.opacity !== undefined) {
				if (style.opacity === 1)
					mat.transparent = false;
				else
					mat.transparent = true;
			}

			return mat;
		}

		// get the min and max values of the specified property in the provided
		// atoms
		function getPropertyRange(atomlist, prop) {
			var min = Number.POSITIVE_INFINITY;
			var max = Number.NEGATIVE_INFINITY;

			for (var i = 0, n = atomlist.length; i < n; i++) {
				var atom = atomlist[i];
				if (atom.properties
						&& typeof (atom.properties[prop]) != "undefined") {
					var val = atom.properties[prop];
					if (val < min)
						min = val;
					if (val > max)
						max = val;
				}
			}

			if (!isFinite(min) && !isFinite(max))
				min = max = 0;
			else if (!isFinite(min))
				min = max;
			else if (!isFinite(max))
				max = min;

			return [ min, max ];
		}

		
		/**
		 * Adds an explicit mesh as a surface object.
		 * 
		 * @param {$3Dmol.Mesh}
		 *            mesh
		 * @param {Object}
		 *            style
		 * @returns {Number} surfid
		 */
		this.addMesh = function(mesh) {
			var surfobj = {
				geo : mesh.geometry,
				mat : mesh.material,
				done : true,
				finished : false //the rendered finishes surfaces when they are done
			};
			var surfid = surfaces.length;
			surfaces[surfid] = surfobj;
			return surfid;
		}

		/**
		 * Add surface representation to atoms
		 *  @function $3Dmol.GLViewer#addSurface
		 * @param {$3Dmol.SurfaceType} type - Surface type
		 * @param {Object} style - optional style specification for surface material (e.g. for different coloring scheme, etc)
		 * @param {AtomSelectionSpec} atomsel - Show surface for atoms in this selection
		 * @param {AtomSelectionSpec} allsel - Use atoms in this selection to calculate surface; may be larger group than 'atomsel' 
		 * @param {AtomSelectionSpec} focus - Optionally begin rendering surface specified atoms
		 * 
		 * @return {number} surfid - Identifying number for this surface
		 */
		this.addSurface = function(type, style, atomsel, allsel, focus) {
			// type 1: VDW 3: SAS 4: MS 2: SES
			// if sync is true, does all work in main thread, otherwise uses
			// workers
			// with workers, must ensure group is the actual modelgroup since
			// surface
			// will get added asynchronously
			// all atoms in atomlist are used to compute surfaces, but only the
			// surfaces
			// of atomsToShow are displayed (e.g., for showing cavities)
			// if focusSele is specified, will start rending surface around the
			// atoms specified by this selection
			var atomsToShow = getAtomsFromSel(atomsel);
			var atomlist = getAtomsFromSel(allsel);
			var focusSele = getAtomsFromSel(focus);
			var atom;
			style = style || {};

			var time = new Date();

			var mat = getMatWithStyle(style);

			var extent = getExtent(atomsToShow);

			var i, il;
			if (style['map'] && style['map']['prop']) {
				// map color space using already set atom properties
				/** @type {AtomSpec} */
				var prop = style['map']['prop'];
				/** @type {Gradient} */
				var scheme = style['map']['scheme'] || new $3Dmol.Gradient.RWB();
				var range = scheme.range();
				if (!range) {
					range = getPropertyRange(atomsToShow, prop);
				}

				for (i = 0, il = atomsToShow.length; i < il; i++) {
					atom = atomsToShow[i];
					atom.surfaceColor = $3Dmol.CC.color(scheme.valueToHex(
							atom.properties[prop], range));
				}
			}
			else if(typeof(style['color']) != 'undefined') {
				//explicitly set color, otherwise material color just blends
				for (i = 0, il = atomsToShow.length; i < il; i++) {
					atom = atomsToShow[i];
					atom.surfaceColor = $3Dmol.CC.color(style['color']);
				}
			}
			else if(typeof(style['colorscheme']) != 'undefined') {
				for (i = 0, il = atomsToShow.length; i < il; i++) {
					atom = atomsToShow[i];
					var scheme = $3Dmol.elementColors[style.colorscheme];
	            	if(scheme && typeof(scheme[atom.elem]) != "undefined") {
						atom.surfaceColor = $3Dmol.CC.color(scheme[atom.elem]);
	            	}
				}
			}

			var totalVol = volume(extent); // used to scale resolution
			var extents = carveUpExtent(extent, atomlist, atomsToShow);

			if (focusSele && focusSele.length && focusSele.length > 0) {
				var seleExtent = getExtent(focusSele);
				// sort by how close to center of seleExtent
				var sortFunc = function(a, b) {
					var distSq = function(ex, sele) {
						// distance from e (which has no center of mass) and
						// sele which does
						var e = ex.extent;
						var x = e[1][0] - e[0][0];
						var y = e[1][1] - e[0][1];
						var z = e[1][2] - e[0][2];
						var dx = (x - sele[2][0]);
						dx *= dx;
						var dy = (y - sele[2][1]);
						dy *= dy;
						var dz = (z - sele[2][2]);
						dz *= dz;

						return dx + dy + dz;
					};
					var d1 = distSq(a, seleExtent);
					var d2 = distSq(b, seleExtent);
					return d1 - d2;
				};
				extents.sort(sortFunc);
			}

			console.log("Extents " + extents.length + "  "
					+ (+new Date() - time) + "ms");

			var surfobj = {
				geo : new $3Dmol.Geometry(true),
				mat : mat,
				done : false,
				finished : false
			// also webgl initialized
			};
			var surfid = surfaces.length;
			surfaces[surfid] = surfobj;
			var reducedAtoms = [];
			// to reduce amount data transfered, just pass x,y,z,serial and elem
			for (i = 0, il = atomlist.length; i < il; i++) {
				atom = atomlist[i];
				reducedAtoms[i] = {
					x : atom.x,
					y : atom.y,
					z : atom.z,
					serial : i,
					elem : atom.elem
				};
			}

			var sync = !!($3Dmol.syncSurface);
			if (sync) { // don't use worker, still break up for memory purposes

				// to keep the browser from locking up, call through setTimeout
				var callSyncHelper = function callSyncHelper(i) {
					if (i >= extents.length)
						return;

					var VandF = generateMeshSyncHelper(type, extents[i].extent,
							extents[i].atoms, extents[i].toshow, reducedAtoms,
							totalVol);
					var mesh = generateSurfaceMesh(atomlist, VandF, mat);
					$3Dmol.mergeGeos(surfobj.geo, mesh);
					_viewer.render();

					setTimeout(callSyncHelper, 1, i + 1);
				}

				setTimeout(callSyncHelper, 1, 0);

				// TODO: Asynchronously generate geometryGroups (not separate
				// meshes) and merge them into a single geometry
			} else { // use worker

				var workers = [];
				if (type < 0)
					type = 0; // negative reserved for atom data
				for (i = 0, il = numWorkers; i < il; i++) {
					// var w = new Worker('3Dmol/SurfaceWorker.js');
					var w = new Worker($3Dmol.SurfaceWorker);
					workers.push(w);
					w.postMessage({
						'type' : -1,
						'atoms' : reducedAtoms,
						'volume' : totalVol
					});
				}
				var cnt = 0;

				var rfunction = function(event) {
					var VandF = event.data;
					var mesh = generateSurfaceMesh(atomlist, VandF, mat);
					$3Dmol.mergeGeos(surfobj.geo, mesh);
					_viewer.render();
					console.log("async mesh generation " + (+new Date() - time)
							+ "ms");
					cnt++;
					if (cnt == extents.length)
						surfobj.done = true;
				};

				var efunction = function(event) {
					console.log(event.message + " (" + event.filename + ":"
							+ event.lineno + ")");
				};

				for (i = 0; i < extents.length; i++) {
					var worker = workers[i % workers.length];
					worker.onmessage = rfunction;

					worker.onerror = efunction;

					worker.postMessage({
						'type' : type,
						'expandedExtent' : extents[i].extent,
						'extendedAtoms' : extents[i].atoms,
						'atomsToShow' : extents[i].toshow
					});
				}
			}

			// NOTE: This is misleading if 'async' mesh generation - returns
			// immediately
			console.log("full mesh generation " + (+new Date() - time) + "ms");

			return surfid;
		};

		/**
		 * Set the surface material to something else, must render change
		 * 
		 * @param {number} surf - Surface ID to apply changes to
		 * @param {matSpec} style - new material style specification
		 */ 
		this.setSurfaceMaterialStyle = function(surf, style) {
			if (surfaces[surf]) {
				surfaces[surf].mat = getMatWithStyle(style);
				surfaces[surf].mat.side = $3Dmol.FrontSide;
				surfaces[surf].finished = false; // trigger redraw
			}
		};

		/**
		 * Remove surface with given ID
		 * 
		 * @param {number} surf - surface id
		 */
		this.removeSurface = function(surf) {
			if (surfaces[surf] && surfaces[surf].lastGL) {
				if (surfaces[surf].geo !== undefined)
					surfaces[surf].geo.dispose();
				if (surfaces[surf].mat !== undefined)
					surfaces[surf].mat.dispose();
				modelGroup.remove(surfaces[surf].lastGL); // remove from scene
			}
			delete surfaces[surf];
			show();
		};
		
		/** Remove all surfaces.
		 * @function $3Dmol.GLViewer#removeAllSurfaces */
		this.removeAllSurfaces = function() {
			for(var i = 0; i < surfaces.length; i++) {
				if (surfaces[i] && surfaces[i].lastGL) {
					if (surfaces[i].geo !== undefined)
						surfaces[i].geo.dispose();
					if (surfaces[i].mat !== undefined)
						surfaces[i].mat.dispose();
					modelGroup.remove(surfaces[i].lastGL); // remove from scene
				}
				delete surfaces[i];
			}
			show();
		};

		/** return Jmol moveto command to position this scene */
		this.jmolMoveTo = function() {
			var pos = modelGroup.position;
			// center on same position
			var ret = "center { " + (-pos.x) + " " + (-pos.y) + " " + (-pos.z)
					+ " }; ";
			// apply rotation
			var q = rotationGroup.quaternion;
			ret += "moveto .5 quaternion { " + q.x + " " + q.y + " " + q.z
					+ " " + q.w + " };";
			// zoom is tricky.. maybe i would be best to let callee zoom on
			// selection?
			// can either do a bunch of math, or maybe zoom to the center with a
			// fixed
			// but reasonable percentage

			return ret;
		};

		/** Clear scene of all objects 
		 * @function $3Dmol.GLViewer#clear
		 * */
		this.clear = function() {
			this.removeAllSurfaces();
			this.removeAllModels();
			this.removeAllLabels();
			this.removeAllShapes();
			show();
		};

		// props is a list of objects that select certain atoms and enumerate
		// properties for those atoms
		/**
		 * Add specified properties to all atoms matching input argument
		 * @param {AtomSpec} props
		 */
		this.mapAtomProperties = function(props) {
			var atoms = getAtomsFromSel({});
			for (var a = 0, numa = atoms.length; a < numa; a++) {
				var atom = atoms[a];
				for (var i = 0, n = props.length; i < n; i++) {
					var prop = props[i];
					if (prop.props) {
						for ( var p in prop.props) {
							if (prop.props.hasOwnProperty(p)) {
								// check the atom
								if (atomIsSelected(atom, prop)) {
									if (!atom.properties)
										atom.properties = {};
									atom.properties[p] = prop.props[p];
								}
							}
						}
					}
				}
			}
		};

		var getModelGroup = function() {
			return modelGroup;
		};

		try {
			if (typeof (callback) === "function")
				callback(this);
		} catch (e) {
			// errors in callback shouldn't invalidate the viewer
			console.log("error with glviewer callback: " + e);
		}
	}

	return GLViewer;

})();

$3Dmol['glmolViewer'] = $3Dmol.GLViewer;
//color scheme mappings
var $3Dmol = $3Dmol || {};

/** Color mapping gradiens
 * @interface
 * @param {number} min
 * @param {number} max
 */
$3Dmol.Gradient = function(min, max) {};

/**
 * Map value to hex color
 * @param {number} val
 * @param {number} range
 * @returns {number}
 */
$3Dmol.Gradient.valueToHex = function(val, range) {};
$3Dmol.Gradient.jmolID = function() {};
//return range used for color mapping, null if none set
$3Dmol.Gradient.range = function() {};



/**
 * Color scheme red to white to blue, for charges
 * @constructor
 * @implements {$3Dmol.Gradient}
 */
$3Dmol.Gradient.RWB = function(min, max) {
	
	//map value to hex color, range is provided
	this.valueToHex = function(val, range) {
		var lo, hi;
		if(range) {
			lo = range[0];
			hi = range[1];
		}
		else {
			lo = min;
			hi = max;
		}
	
		if(val === undefined)
			return 0xffffff;
		
		if(val < lo) val = lo;
		if(val > hi) val = hi;
		
		var middle = (hi+lo)/2;
		var scale, color;
		
		//scale bottom from red to white
		if(val <= middle) {
			scale = Math.floor(255*Math.sqrt((val-lo)/(middle-lo)));
			color = 0xff0000 + 0x100*scale + scale;
			return color;
		}
		else { //form white to blue
			scale = Math.floor(255*Math.sqrt((1-(val-middle)/(hi-middle))));
			color =  0x10000*scale+0x100*scale+0xff;
			return color;
		}
	};
	
	this.jmolID = function() {
		return "rwb";
	};

	//return range used for color mapping, null if none set
	this.range = function() {
		if(typeof(min) != "undefined" && typeof(max) != "undefined") {
			return [min,max];
		}
		return null;
	};

};

/**
 * rainbow gradient, but without purple to match jmol
 * @constructor
 * @implements {$3Dmol.Gradient}
 */
$3Dmol.Gradient.ROYGB = function(min, max) {
	
	//map value to hex color, range is provided
	this.valueToHex = function(val, range) {
		var lo, hi;
		if(range) {
			lo = range[0];
			hi = range[1];
		}
		else {
			lo = min;
			hi = max;
		}
	
		if(typeof(val) == "undefined")
			return 0xffffff;
		
		if(val < lo) val = lo;
		if(val > hi) val = hi;
		
		var mid = (lo+hi)/2;
		var q1 = (lo+mid)/2;
		var q3 = (mid+hi)/2;
		
		var scale, color;
		
		if(val < q1) { //scale green up, red up, blue down
			scale = Math.floor(255*Math.sqrt((val-lo)/(q1-lo)));
			color = 0xff0000 + 0x100*scale + 0;
			return color;
		}
		else if(val < mid) { //scale red down, green up, blue down
			scale = Math.floor(255*Math.sqrt((1-(val-q1)/(mid-q1))));
			color =  0x010000*scale+0xff00+0x0;
			return color;
		}
		else if(val < q3) { //scale blue up, red down, green up
			scale = Math.floor(255*Math.sqrt((val-mid)/(q3-mid)));
			color = 0x000000 + 0xff00 + 0x1*scale;
			return color;
		}
		else { //scale green down, blue up, red down
			scale = Math.floor(255*Math.sqrt((1-(val-q3)/(hi-q3))));
			color =  0x000000+0x0100*scale+0xff;
			return color;
		}		
	};
	
	this.jmolID = function() {
		return "roygb";
	};

	//return range used for color mapping, null if none set
	this.range = function() {
		if(typeof(min) != "undefined" && typeof(max) != "undefined") {
			return [min,max];
		}
		return null;
	};

};

/**
 * rainbow gradient with constant saturation, all the way to purple!
 * @constructor
 * @implements {$3Dmol.Gradient}
 */
$3Dmol.Gradient.Sinebow = function(min, max) {
	
	//map value to hex color, range is provided
	this.valueToHex = function(val, range) {
		var lo, hi;
		if(range) {
			lo = range[0];
			hi = range[1];
		}
		else {
			lo = min;
			hi = max;
		}
	
		if(typeof(val) == "undefined")
			return 0xffffff;
		
		if(val < lo) val = lo;
		if(val > hi) val = hi;
		
		var scale = (val-lo)/(hi-lo);
		var h = (5*scale/6.0+0.5);
		var r = Math.sin(Math.PI*h);
		r *= r*255;
		var g = Math.sin(Math.PI*(h+1/3.0));
		g *= g*255;
		var b = Math.sin(Math.PI*(h+2/3.0));
		b *= b*255;
		
		return 0x10000*Math.floor(r)+0x100*Math.floor(b)+0x1*Math.floor(g);
	};
	
	this.jmolID = function() {
		return "sinebow";
	};

	//return range used for color mapping, null if none set
	this.range = function() {
		if(typeof(min) != "undefined" && typeof(max) != "undefined") {
			return [min,max];
		}
		return null;
	};

};
//Adapted from the text sprite example from http://stemkoski.github.io/Three.js/index.html

$3Dmol.LabelCount = 0;

/**
 * Renderable labels
 * @constructor $3Dmol.Label
 * @param {string} tag - Label text
 * @param {LabelSpec} parameters Label style and font specifications
 */
$3Dmol.Label = function(text, parameters) {

	this.id = $3Dmol.LabelCount++;
	this.stylespec = parameters || {};

	this.canvas = document.createElement('canvas');
	//todo: implement resizing canvas..
	this.canvas.width = 134;
	this.canvas.height = 35;
	this.context = this.canvas.getContext('2d');
	this.sprite = new $3Dmol.Sprite();
	this.text = text;

};

$3Dmol.Label.prototype = {

	constructor : $3Dmol.Label,

	setContext : function() {
		// function for drawing rounded rectangles - for Label drawing
		var roundRect = function(ctx, x, y, w, h, r, drawBorder) {

			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.lineTo(x + w - r, y);
			ctx.quadraticCurveTo(x + w, y, x + w, y + r);
			ctx.lineTo(x + w, y + h - r);
			ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
			ctx.lineTo(x + r, y + h);
			ctx.quadraticCurveTo(x, y + h, x, y + h - r);
			ctx.lineTo(x, y + r);
			ctx.quadraticCurveTo(x, y, x + r, y);
			ctx.closePath();
			ctx.fill();
			if(drawBorder)
				ctx.stroke();

		};
		
		//do all the checks to figure out what color is desired
		var getColor = function(style, stylealpha, init) {
			var ret = init;
			if(typeof(style) != 'undefined') {
				//convet regular colors
				if(typeof(style) === 'string') 
					ret = $3Dmol.CC.color(style).scaled()
				else if(style instanceof $3Dmol.Color) 
					ret = style.scaled();				
			}
			if(typeof(stylealpha) != 'undefined') {
				ret.a = parseFloat(stylealpha);
			}
			return ret;
		}

		/**
		 * Label type specification
		 * @typedef LabelSpec
		 * @struct
		 * @prop {string} font - font name, default sans-serif
		 * @prop {number} fontSize - height of text, default 18
		 * @prop {string} fontColor - font color, default white
		 * @prop {number} fontOpacity - font opacity, default 1
		 * @prop {number} borderThickness - line width of border around label, default 0
		 * @prop {string} borderColor - color of border, default backgroundColor
		 * @prop {string} borderOpacity - color of border
		 * @prop {string} backgroundColor - color of background, default black
		 * @prop {string} backgroundOpacity - opacity of background, default 1
		 * @prop {Object} position - x,y,z coordinates for label
		 * @prop {boolean} inFront - always put labels in from of model
		 * @prop {boolean} showBackground - show background rounded rectangle, default true
		 */
		return function() {
			
			var style = this.stylespec;
			var useScreen =  typeof(style.useScreen) == "undefined" ? false : style.useScreen;
			
			var showBackground = style.showBackground;
			if(showBackground === '0' || showBackground === 'false') showBackground = false;
			if(typeof(showBackground) == "undefined") showBackground = true; //default
			var font = style.font ? style.font : "sans-serif";

			var fontSize = parseInt(style.fontSize) ? parseInt(style.fontSize) : 18;

			var fontColor = getColor(style.fontColor, style.fontOpacity,
					 {
						r : 255,
						g : 255,
						b : 255,
						a : 1.0
					});

			var padding = style.padding ? style.padding : 4;
			var borderThickness = style.borderThickness ? style.borderThickness
					: 0;
	
			var backgroundColor = getColor(style.backgroundColor, style.backgroundOpacity, 
					 {
						r : 0,
						g : 0,
						b : 0,
						a : 1.0
					});
					
			var borderColor = getColor(style.borderColor, style.borderOpacity, backgroundColor);

					
			var position = style.position ? style.position
					: {
						x : -10,
						y : 1,
						z : 1
					};
					
			// Should labels always be in front of model?
			var inFront = (style.inFront !== undefined) ? style.inFront	: true;
			if(inFront === 'false' || inFront === '0') inFront = false;

			// clear canvas

			var spriteAlignment = style.alignment || $3Dmol.SpriteAlignment.topLeft;

			var bold = "";
			if(style.bold)
				bold = "bold ";
			this.context.font = bold+fontSize + "px  " + font;

			var metrics = this.context.measureText(this.text);
			var textWidth = metrics.width;
			
			if(!showBackground) borderThickness = 0;
		
			var width = textWidth+2.5*borderThickness +2*padding;
			var height = fontSize*1.25+2*borderThickness+2*padding;			// 1.25 is extra height factor for text below baseline: g,j,p,q.

			
			if(style.backgroundImage) {
				var img = style.backgroundImage;
				var w = style.backgroundWidth ? style.backgroundWidth : img.width;
				var h = style.backgroundHeight ? style.backgroundHeight : img.height;
				if(w > width) width = w;
				if(h > height) height = h;
			}

			this.canvas.width = width;
			this.canvas.height = height;
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

			var bold = "";
			if(style.bold)
				bold = "bold ";
			this.context.font = bold+fontSize + "px  " + font;

			// background color
			this.context.fillStyle = "rgba(" + backgroundColor.r + ","
					+ backgroundColor.g + "," + backgroundColor.b
					+ "," + backgroundColor.a + ")";
			// border color
			this.context.strokeStyle = "rgba(" + borderColor.r + ","
					+ borderColor.g + "," + borderColor.b + ","
					+ borderColor.a + ")";

			this.context.lineWidth = borderThickness;
			if(showBackground) {
				roundRect(this.context, borderThickness,borderThickness , width-2*borderThickness,height-2*borderThickness, 6, borderThickness > 0);
			}
			
			if(style.backgroundImage) {
				var img = style.backgroundImage;
				var w = style.backgroundWidth ? style.backgroundWidth : img.width;
				var h = style.backgroundHeight ? style.backgroundHeight : img.height;
				this.context.drawImage(img,0,0, w, h);
			}
			

			// text color
			this.context.fillStyle = "rgba(" + fontColor.r + ","
					+ fontColor.g + "," + fontColor.b + ","
					+ fontColor.a + ")";
			
			this.context.fillText(this.text, borderThickness+padding,
					fontSize + borderThickness+padding, textWidth);

			// canvas contents will be used for a texture
			var texture = new $3Dmol.Texture(this.canvas);
			texture.needsUpdate = true;
			this.sprite.material = new $3Dmol.SpriteMaterial({
				map : texture,
				useScreenCoordinates : useScreen,
				alignment : spriteAlignment,
				depthTest : !inFront
			});

			this.sprite.scale.set(1,1,1);

			this.sprite.position.set(position.x, position.y, position.z);
		};

	}(),

	// clean up material and texture
	dispose : function() {

		if (this.sprite.material.map !== undefined)
			this.sprite.material.map.dispose();
		if (this.sprite.material !== undefined)
			this.sprite.material.dispose();
	}

};

/**
 * $3Dmol.Parsers stores functions for parsing molecular data.
 * The all take an atom list (which gets filled out) and a string.
 * 
 * $3Dmol.Parsers.<ext> corresponds to the parsers for files with extension ext
 */
$3Dmol.Parsers = (function() {
	var parsers = {};
	
	 /** @param {AtomSpec[]} atomsarray */
    var assignBonds = function(atomsarray) {
        // assign bonds - yuck, can't count on connect records
        var atoms = atomsarray.slice(0);
        var i, j, n;
        for (i = 0, n = atomsarray.length; i < n; i++)
        {
            //Don't reindex if atoms are already indexed 
            if (!atomsarray[i].index)
                atomsarray[i].index = i;
        }
        
        atoms.sort(function(a, b) {
            return a.z - b.z;
        });
        for (i = 0, n = atoms.length; i < n; i++) {
            var ai = atoms[i];

            for (j = i + 1; j < n; j++) {
                var aj = atoms[j];
                if (aj.z - ai.z > 1.9) // can't be connected
                    break;
                if (areConnected(ai, aj)) {
                    if (ai.bonds.indexOf(aj.index) == -1) {
                        // only add if not already there
                        ai.bonds.push(aj.index);
                        ai.bondOrder.push(1);
                        aj.bonds.push(ai.index);
                        aj.bondOrder.push(1);
                    }
                }
            }
        }
    };
    
    // this is optimized for proteins where it is assumed connected
    // atoms are on the same or next residue
    /** @param {AtomSpec[]} atomsarray */
    var assignPDBBonds = function(atomsarray) {
        // assign bonds - yuck, can't count on connect records
        var protatoms = [];
        var hetatoms = [];        
        var i, n;
        for (i = 0, n = atomsarray.length; i < n; i++) {
            var atom = atomsarray[i];
            atom.index = i;
            if(atom.hetflag)
                hetatoms.push(atom);
            else
                protatoms.push(atom);
        }

        assignBonds(hetatoms);
        
        // sort by resid
        protatoms.sort(function(a, b) {
            if(a.chain != b.chain)
                return a.chain < b.chain ? -1 : 1;
            return a.resi - b.resi;
        });
        
        //for identifying connected residues
        var currentResi = -1;
        var reschain = -1;
        var lastResConnected;
        
        for (i = 0, n = protatoms.length; i < n; i++) {
            var ai = protatoms[i];
            
            if (ai.resi !== currentResi) {
                currentResi = ai.resi;
                if (!lastResConnected)
                    reschain++;
                    
                lastResConnected = false;
            }
            
            ai.reschain = reschain;

            for ( var j = i + 1; j < protatoms.length; j++) {
                var aj = protatoms[j];
                if(aj.chain != ai.chain)
                    break;
                if (aj.resi - ai.resi > 1) // can't be connected
                    break;
                if (areConnected(ai, aj)) {
                    if (ai.bonds.indexOf(aj.index) === -1) {
                        // only add if not already there
                        ai.bonds.push(aj.index);
                        ai.bondOrder.push(1);
                        aj.bonds.push(ai.index);
                        aj.bondOrder.push(1);
                    }
                    
                    if (ai.resi !== aj.resi) 
                        lastResConnected = true;                   
                        
                }
            }
        }
        
    };

    // this will identify all hydrogen bonds between backbone
    // atoms; assume atom names are correct, only identifies
    // single closest hbond
    var assignBackboneHBonds = function(atomsarray) {
	var maxlength = 3.2;
	var maxlengthSq = 10.24;
        var atoms = [];
        var i, j, n;
        for (i = 0, n = atomsarray.length; i < n; i++) {
            atomsarray[i].index = i;
            // only consider 'N' and 'O'
            var atom = atomsarray[i];
            if (!atom.hetflag && (atom.atom === "N" || atom.atom === "O")) {
                atoms.push(atom);
                atom.hbondOther = null;
                atom.hbondDistanceSq = Number.POSITIVE_INFINITY;                
            }
        }

        atoms.sort(function(a, b) {
            return a.z - b.z;
        });
        for (i = 0, n = atoms.length; i < n; i++) {
            var ai = atoms[i];

            for (j = i + 1; j < n; j++) {
                var aj = atoms[j];
		var zdiff = aj.z - ai.z;
                if (zdiff > maxlength) // can't be connected
                    break;
		if (aj.atom == ai.atom)
		    continue; //can't be connected, but later might be	
		var ydiff = Math.abs(aj.y - ai.y);
		if( ydiff > maxlength)
		    continue;
		var xdiff = Math.abs(aj.x - ai.x);
		if(xdiff > maxlength)
		    continue;
                var dist = xdiff*xdiff+ydiff*ydiff+zdiff*zdiff;
		if (dist >  maxlengthSq)
		    continue;

		if(aj.chain == ai.chain && Math.abs(aj.resi - ai.resi) < 4)
		    continue; //ignore bonds between too close residues
		//select closest hbond
                if (dist < ai.hbondDistanceSq) {
                    ai.hbondOther = aj;
                    ai.hbondDistanceSq = dist;
                }
                if(dist < aj.hbondDistanceSq) {
                    aj.hbondOther = ai;
                    aj.hbondDistanceSq = dist;
                }
            }
        }
    };

    var computeSecondaryStructure = function(atomsarray) {
        assignBackboneHBonds(atomsarray);
        
        // compute, per residue, what the secondary structure is
        var chres = {}; // lookup by chain and resid
        var i, il, c, r;
        var atom, val;
        
        for (i = 0, il = atomsarray.length; i < il; i++) {
            atom = atomsarray[i];
            
            if (typeof(chres[atom.chain]) === "undefined")
                chres[atom.chain] = [];
            
            if (isFinite(atom.hbondDistanceSq)) {
                var other = atom.hbondOther;
                if (Math.abs(other.resi - atom.resi) === 4) { 
                    // helix
                    chres[atom.chain][atom.resi] = 'h';
                }
                else { // otherwise assume sheet
                    chres[atom.chain][atom.resi] = 's';
                }
            }
        }
        
        // plug gaps and remove singletons
        for (c in chres) {
            for (r = 1; r < chres[c].length-1; r++) {
                var valbefore = chres[c][r-1];
                var valafter = chres[c][r+1];
                val = chres[c][r];
                if(valbefore == valafter && val != valbefore) {
                    chres[c][r] = valbefore;
                }
            }
            for (r = 0; r < chres[c].length; r++) {
                val = chres[c][r];
                if (val == 'h' || val == 's') {
                    if (chres[c][r-1] != val && chres[c][r+1] != val)
                        delete chres[c][r];
                }
            }
        }
        
        // assign to all atoms in residue, keep track of start
        var curres = null;
        for (i = 0, il = atomsarray.length; i < il; i++) {
            atom = atomsarray[i];
            val = chres[atom.chain][atom.resi];
            if(typeof(val) == "undefined")
                continue;
            atom.ss = val;
            if(chres[atom.chain][atom.resi-1] != val)
                atom.ssbegin = true;
            if(chres[atom.chain][atom.resi+1] != val)
                atom.ssend = true;
        }
    };
    
    /**
     * @param {AtomSpec[]} atoms
     * @param {string} str
     */
    parsers.cube = parsers.CUBE  = function(atoms, str, options) {
        var lines = str.replace(/^\s+/, "").split(/[\n\r]+/);
        
        if (lines.length < 6)
            return;
            
        var lineArr = lines[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");       
          
        var natoms = Math.abs(parseFloat(lineArr[0]));        
        
        lineArr = lines[3].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
        
        //might have to convert from bohr units to angstroms
        var convFactor = (parseFloat(lineArr[0]) > 0) ? 0.529177 : 1;
        
        //Extract atom portion; send to new GLModel...
        lines = lines.splice(6, natoms);
       
        var start = atoms.length;
        var end = start + lines.length;
        
        for (var i = start; i < end; ++i) {
            var atom = {};
            atom.serial = i;
            var line = lines[i - start];
            var tokens = line.replace(/^\s+/, "").replace(/\s+/g, " ").split(
                    " ");
            
            if (tokens[0] == 6) 
                atom.elem = "C";
                        
            else if (tokens[0] == 1) 
                atom.elem = "H";
            
            else if (tokens[0] == 8)
                atom.elem = "O";
                
            else if (tokens[0] == 17)
                atom.elem = "CL";
                
            atom.x = parseFloat(tokens[2]) * convFactor;
            atom.y = parseFloat(tokens[3]) * convFactor;
            atom.z = parseFloat(tokens[4]) * convFactor;
            
            atom.hetflag = true;
            atom.bonds = [];
            atom.bondOrder = [];
            atom.properties = {};
            atoms.push(atom);
            
        }   
        
        assignBonds(atoms);
        
        return true; 
    };
        
    // read an XYZ file from str and put the result in atoms
    /**
     * @param {AtomSpec[]} atoms
     * @param {string} str
     */
    parsers.xyz = parsers.XYZ = function(atoms, str, options) {

        var lines = str.split("\n");
        if (lines.length < 3)
            return;
        var atomCount = parseInt(lines[0].substr(0, 3));
        if (isNaN(atomCount) || atomCount <= 0)
            return;
        if (lines.length < atomCount + 2)
            return;
        var offset = 2;
        var start = atoms.length;
        var end = start + atomCount;
        for ( var i = start; i < end; i++) {
            var line = lines[offset++];
            var tokens = line.replace(/^\s+/, "").replace(/\s+/g, " ").split(
                    " ");
            var atom = {};
            atom.serial = i;
            atom.atom = atom.elem = tokens[0];
            atom.x = parseFloat(tokens[1]);
            atom.y = parseFloat(tokens[2]);
            atom.z = parseFloat(tokens[3]);
            atom.hetflag = true;
            atom.bonds = [];
            atom.bondOrder = [];
            atom.properties = {};
            atoms[i] = atom;
        }
        assignBonds(atoms);

        return true;
    };

    // put atoms specified in sdf fromat in str into atoms
    // adds to atoms, does not replace
    /** 
     * @param {AtomSpec[]} atoms
     * @param {string} str
     */
    parsers.sdf = parsers.SDF = function(atoms, str, options) {

        var lines = str.split("\n");
        if (lines.length < 4)
            return;
        var atomCount = parseInt(lines[3].substr(0, 3));
        if (isNaN(atomCount) || atomCount <= 0)
            return;
        var bondCount = parseInt(lines[3].substr(3, 3));
        var offset = 4;
        if (lines.length < 4 + atomCount + bondCount)
            return;
        var start = atoms.length;
        var end = start + atomCount;
        var i, line;
        for (i = start; i < end; i++) {
            line = lines[offset];
            offset++;
            var atom = {};
            atom.serial = i;
            atom.x = parseFloat(line.substr(0, 10));
            atom.y = parseFloat(line.substr(10, 10));
            atom.z = parseFloat(line.substr(20, 10));
            atom.hetflag = true;
            atom.atom = atom.elem = line.substr(31, 3).replace(/ /g, "");
            atom.bonds = [];
            atom.bondOrder = [];
            atom.properties = {};
            atoms[i] = atom;
        }
        
        for (i = 0; i < bondCount; i++) {
            line = lines[offset];
            offset++;
            var from = parseInt(line.substr(0, 3)) - 1 + start;
            var to = parseInt(line.substr(3, 3)) - 1 + start;
            var order = parseInt(line.substr(6, 3));            
            atoms[from].bonds.push(to);
            atoms[from].bondOrder.push(order);
            atoms[to].bonds.push(from);
            atoms[to].bondOrder.push(order);
        }

        return true;
    };

    // parse SYBYL mol2 file from string - assumed to only contain one molecule
    // tag
    // TODO: Figure out how to handle multi molecule files (for SDF, too)
    /**
     * @param {AtomSpec[]} atoms
     * @param {string} str
     * @param {Object} options - keepH (do not strip hydrogens)
     */
    parsers.mol2 = parsers.MOL2 = function(atoms, str, options) {
        
        var noH = false;
        if(typeof options.keepH !== "undefined") 
        	noH = !options.keepH;
        
        // Note: these regex's work, though they don't match '<TRIPOS>'
        // correctly - something to do with angle brackets
        var mol_pos = str.search(/@<TRIPOS>MOLECULE/);
        var atom_pos = str.search(/@<TRIPOS>ATOM/);
        
        // Assuming both Molecule and Atom sections exist
        if (mol_pos == -1 || atom_pos == -1)
            return;
        
        // serial is atom's index in file; index is atoms index in 'atoms'
        var serialToIndex = [];
        

        // assert (mol_pos < atom_pos), "Unexpected formatting of mol2 file
        // (expected 'molecule' section before 'atom' section)";
        

        var lines = str.substr(mol_pos, str.length).split("\n");
        var tokens = lines[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
        var natoms = parseInt(tokens[0]);
        var nbonds = 0;
        
        if (tokens.length > 1)
            nbonds = parseInt(tokens[1]); 
        
        var offset = 4;
        var i;
        // Continue until 'Atom' section
        for (i = 3; i < lines.length; i++)
        {
            if (lines[i] == "@<TRIPOS>ATOM")
            {
                offset = i+1;
                break;
            }
        }
        
        var start = atoms.length;
        var end = start + natoms;
        var line;
        // Process ATOMS
        for (i = start; i < end; i++) {
            line = lines[offset++];
            tokens = line.replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
            var atom = {};
            
            // 'index' is this atom's index in 'atoms'; 'serial' is this atom's
            // serial id in mol2 file
            var index = i;
            var serial = parseInt(tokens[0]);
            atom.serial = serial;
            // atom.serial = i;
            
            atom.x = parseFloat(tokens[2]);
            atom.y = parseFloat(tokens[3]);
            atom.z = parseFloat(tokens[4]);
            atom.atom = atom.elem = tokens[5].split('.')[0];
                        
            // TODO: Add capability to ignore H's

            if (atom.elem == 'H' && noH)
                continue;
                
            atom.bonds = [];
            atom.bondOrder = [];
            atom.properties = {};
            
            serialToIndex[serial] = index;
            atoms.push(atom);
        }
        
        // Process BONDS
        var bonds_found = false;
        while (offset < lines.length)
        {
            if (lines[offset++] == "@<TRIPOS>BOND")
            {
                bonds_found = true;
                break;            
            }        
        }
        
        if (bonds_found && nbonds)
        {
            for (i = 0; i < nbonds; i++)
            {
                line = lines[offset++];

                tokens = line.replace(/^\s+/, "").replace(/\s+/g, " ").split(
                            " ");
                var from = parseInt(tokens[1]);
                fromAtom = atoms[serialToIndex[from]];
                var to = parseInt(tokens[2]);
                toAtom = atoms[serialToIndex[to]];              
                    
                // Won't be able to read aromatic bonds correctly...
                var order = parseInt(tokens[3]);
                if (isNaN(order))
                    order = 1;
                
                if (fromAtom !== undefined && toAtom !== undefined){
                    fromAtom.bonds.push(serialToIndex[to]);
                    fromAtom.bondOrder.push(order);
                    toAtom.bonds.push(serialToIndex[from]);
                    toAtom.bondOrder.push(order);
                }    

                
                /*
                 * atoms[from].bonds.push(to);
                 * atoms[from].bondOrder.push(order);
                 * atoms[to].bonds.push(from); atoms[to].bondOrder.push(order);
                 */

            }
        }
        
        return true;
        
    };
    

    // return true if atom1 and atom2 are probably bonded to each other
    // based on distance alone
    var areConnected = function(atom1, atom2) {
        var maxsq = 3.6;

        var xdiff = atom1.x - atom2.x;
        xdiff *= xdiff;
        if (xdiff > maxsq)
            return false;
        var ydiff = atom1.y - atom2.y;
        ydiff *= ydiff;
        if (ydiff > maxsq)
            return false;
        var zdiff = atom1.z - atom2.z;
        zdiff *= zdiff;
        if (zdiff > maxsq)
            return false;

        var distSquared = xdiff + ydiff + zdiff;

        if (isNaN(distSquared))
            return false;
        if (distSquared < 0.5)
            return false; // maybe duplicate position.

        if (distSquared > 1.3 && (atom1.elem == 'H' || atom2.elem == 'H' || atom1.elem == 'D' || atom2.elem == 'D'))
            return false;
        if (distSquared < 3.6 && (atom1.elem == 'S' || atom2.elem == 'S'))
            return true;
        if (distSquared > 2.78)
            return false;
        return true;
    };
    
    // parse pdb file from str and create atoms
    //if computeStruct is true will always perform secondary structure analysis,
    //otherwise only do analysis of SHEET/HELIX comments are missing
    /**
     * @param {AtomSpec[]} atoms
     * @param {string} str
     * @param {Object} options - keepH (do not strip hydrogens), noSecondaryStructure (do not compute ss)
     */
    parsers.pdb = parsers.PDB = function(atoms, str, options) {

        var atoms_cnt = 0;
        var noH = !options.keepH; // suppress hydrogens by default
        var computeStruct = !options.noSecondaryStructure;
        var start = atoms.length;
        var atom;
        var protein = {
            sheet : [],
            helix : []
        }; // get secondary structure straight from pdb

        var hasStruct = false;
        var serialToIndex = []; // map from pdb serial to index in atoms
        var lines = str.split("\n");
        var i, j, k, line;
        for (i = 0; i < lines.length; i++) {
            line = lines[i].replace(/^\s*/, ''); // remove indent
            var recordName = line.substr(0, 6);
            var startChain, startResi, endChain, endResi;
            if (recordName == 'ATOM  ' || recordName == 'HETATM') {
                var resn, chain, resi, icode, x, y, z, hetflag, elem, serial, altLoc, b;
                altLoc = line.substr(16, 1);
                if (altLoc != ' ' && altLoc != 'A')
                    continue; // FIXME: ad hoc
                serial = parseInt(line.substr(6, 5));
                atom = line.substr(12, 4).replace(/ /g, "");
                resn = line.substr(17, 3);
                chain = line.substr(21, 1);
                resi = parseInt(line.substr(22, 4));
                icode = line.substr(26, 1);
                x = parseFloat(line.substr(30, 8));
                y = parseFloat(line.substr(38, 8));
                z = parseFloat(line.substr(46, 8));
                b = parseFloat(line.substr(60, 8));
                elem = line.substr(76, 2).replace(/ /g, "");
                if (elem === '') { // for some incorrect PDB files
                    elem = line.substr(12, 2).replace(/ /g, "");
                }
                if((elem == 'H' || elem == 'HH' || elem == 'HD') && noH)
                    continue;
                if (line[0] == 'H')
                    hetflag = true;
                else
                    hetflag = false;
                serialToIndex[serial] = atoms.length;
                atoms.push({
                    'resn' : resn,
                    'x' : x,
                    'y' : y,
                    'z' : z,
                    'elem' : elem,
                    'hetflag' : hetflag,
                    'chain' : chain,
                    'resi' : resi,
                    'icode' : icode,
                    'rescode': resi + (icode != ' ' ? "^"+icode: ""), // combo
                                                                        // resi
                                                                        // and
                                                                        // icode
                    'serial' : serial,
                    'atom' : atom,
                    'bonds' : [],
                    'ss' : 'c',
                    'bondOrder' : [],
                    'properties' : {},
                    'b' : b,
                    'pdbline' : line
                });
            } else if (recordName == 'SHEET ') {
            	hasStruct = true;
                startChain = line.substr(21, 1);
                startResi = parseInt(line.substr(22, 4));
                endChain = line.substr(32, 1);
                endResi = parseInt(line.substr(33, 4));
                protein.sheet
                        .push([ startChain, startResi, endChain, endResi ]);
            } else if (recordName == 'CONECT') {
                // MEMO: We don't have to parse SSBOND, LINK because both are
                // also
                // described in CONECT. But what about 2JYT???
                var from = parseInt(line.substr(6, 5));
                var fromAtom = atoms[serialToIndex[from]];
                for (j = 0; j < 4; j++) {
                    var to = parseInt(line.substr([ 11, 16, 21, 26 ][j], 5));
                    var toAtom = atoms[serialToIndex[to]];
                    if (fromAtom !== undefined && toAtom !== undefined) {
                        fromAtom.bonds.push(serialToIndex[to]);
                        fromAtom.bondOrder.push(1);
                    }
                }
            } else if (recordName == 'HELIX ') {
            	hasStruct = true;
                startChain = line.substr(19, 1);
                startResi = parseInt(line.substr(21, 4));
                endChain = line.substr(31, 1);
                endResi = parseInt(line.substr(33, 4));
                protein.helix
                        .push([ startChain, startResi, endChain, endResi ]);
            }

        }

        var starttime = (new Date()).getTime();
        // assign bonds - yuck, can't count on connect records
        assignPDBBonds(atoms);
        console.log("bond connecting " + ((new Date()).getTime() - starttime));
        
        
        if(computeStruct || !hasStruct) {
            starttime = (new Date()).getTime();
        	computeSecondaryStructure(atoms);
        	console.log("secondary structure " + ((new Date()).getTime() - starttime));
        }
        
        // Assign secondary structures from pdb file
        for (i = start; i < atoms.length; i++) {
            atom = atoms[i];
            if (atom === undefined)
                continue;

            var found = false;
            // MEMO: Can start chain and end chain differ?
            for (j = 0; j < protein.sheet.length; j++) {
                if (atom.chain != protein.sheet[j][0])
                    continue;
                if (atom.resi < protein.sheet[j][1])
                    continue;
                if (atom.resi > protein.sheet[j][3])
                    continue;
                atom.ss = 's';
                if (atom.resi == protein.sheet[j][1])
                    atom.ssbegin = true;
                if (atom.resi == protein.sheet[j][3])
                    atom.ssend = true;
            }
            for (j = 0; j < protein.helix.length; j++) {
                if (atom.chain != protein.helix[j][0])
                    continue;
                if (atom.resi < protein.helix[j][1])
                    continue;
                if (atom.resi > protein.helix[j][3])
                    continue;
                atom.ss = 'h';
                if (atom.resi == protein.helix[j][1])
                    atom.ssbegin = true;
                else if (atom.resi == protein.helix[j][3])
                    atom.ssend = true;
            }
        }
        return true;
    };

        
    /** Parse a pqr file from str and create atoms.  A pqr file is assumed
     * to be a whitespace delimited PDB with charge and radius fields.

     * 
     * @param {AtomSpec[]} atoms
     * @param {string} str
     * @param {Object} options -  noSecondaryStructure (do not compute ss)
     */
    parsers.pqr = parsers.PQR = function(atoms, str, options) {

        var atoms_cnt = 0;
        var start = atoms.length;
        var atom;
        var computeStruct = !options.noSecondaryStructure;

        var serialToIndex = []; // map from pdb serial to index in atoms
        var lines = str.split("\n");
        var i, j, k, line;
        for (i = 0; i < lines.length; i++) {
            line = lines[i].replace(/^\s*/, ''); // remove indent
            var recordName = line.substr(0, 6);
            var startChain, startResi, endChain, endResi;
            if (recordName == 'ATOM  ' || recordName == 'HETATM') {
	                //I would have liked to split based solely on whitespace, but
                //it seems that there is no guarantee that all the fields will
                //be filled out (e.g. the chain) so this doesn't work
                var serial = parseInt(line.substr(6, 5));
                var atom = line.substr(12, 4).replace(/ /g, "");
                var resn = line.substr(17, 3);
                var chain = line.substr(21, 1);
                var resi = parseInt(line.substr(22, 4));
                //however let's split the coordinates, charge and radius by whitespace
                //to support extra precision
                var vals = line.substr(30).trim().split(/\s+/);
                var x = parseFloat(vals[0]);
                var y = parseFloat(vals[1]);
                var z = parseFloat(vals[2]);
                var charge = parseFloat(vals[3]);
                var radius = parseFloat(vals[4]);
                
                var elem = atom[0];
                if(atom.length > 1 && atom[1].toUpperCase() != atom[1]) {
                	//slight hack - identify two character elements by the
                	//second character in the atom name being lowercase
                	elem = atom.substr(0,2);
                }

                if (line[0] == 'H')
                    hetflag = true;
                else
                    hetflag = false;
                serialToIndex[serial] = atoms.length;
                atoms.push({
                    'resn' : resn,
                    'x' : x,
                    'y' : y,
                    'z' : z,
                    'elem' : elem,
                    'hetflag' : hetflag,
                    'chain' : chain,
                    'resi' : resi,
                    'serial' : serial,
                    'atom' : atom,
                    'bonds' : [],
                    'ss' : 'c',
                    'bondOrder' : [],
                    'properties' : {'charge': charge, 'radius': radius},
                    'pdbline' : line
                });
            } else if (recordName == 'CONECT') {
                // MEMO: We don't have to parse SSBOND, LINK because both are
                // also
                // described in CONECT. But what about 2JYT???
                var from = parseInt(line.substr(6, 5));
                var fromAtom = atoms[serialToIndex[from]];
                for (j = 0; j < 4; j++) {
                    var to = parseInt(line.substr([ 11, 16, 21, 26 ][j], 5));
                    var toAtom = atoms[serialToIndex[to]];
                    if (fromAtom !== undefined && toAtom !== undefined) {
                        fromAtom.bonds.push(serialToIndex[to]);
                        fromAtom.bondOrder.push(1);
                    }
                }
            }
        }

        // assign bonds - yuck, can't count on connect records
        assignPDBBonds(atoms);
        if(computeStruct)
        	computeSecondaryStructure(atoms);
        
        return true;
    };

    
	
	return parsers;
})();var $3Dmol = $3Dmol || {};

//properties for mapping
$3Dmol.partialCharges = [
    { resn: "ALA", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ALA", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ALA", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ALA", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ALA", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "ARG", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ARG", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ARG", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ARG", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "ARG", atom: "CD", props: {'partialCharge': 0.10}},
	{ resn: "ARG", atom: "NE", props: {'partialCharge': -0.10}},
	{ resn: "ARG", atom: "CZ", props: {'partialCharge': 0.50}},
	{ resn: "ARG", atom: "NH1", props: {'partialCharge': 0.25}},
	{ resn: "ARG", atom: "NH2", props: {'partialCharge': 0.25}},
	{ resn: "ARG", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ARG", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "ASN", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ASN", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ASN", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ASN", atom: "CG", props: {'partialCharge': 0.55}},
	{ resn: "ASN", atom: "OD1", props: {'partialCharge': -0.55}},
	{ resn: "ASN", atom: "ND2", props: {'partialCharge': 0.00}},
	{ resn: "ASN", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ASN", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "ASP", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ASP", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ASP", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ASP", atom: "CG", props: {'partialCharge': 0.14}},
	{ resn: "ASP", atom: "OD1", props: {'partialCharge': -0.57}},
	{ resn: "ASP", atom: "OD2", props: {'partialCharge': -0.57}},
	{ resn: "ASP", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ASP", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "CYS", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "CYS", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "CYS", atom: "CB", props: {'partialCharge': 0.19}},
	{ resn: "CYS", atom: "SG", props: {'partialCharge': -0.19}},
	{ resn: "CYS", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "CYS", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "GLN", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "GLN", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "GLN", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "GLN", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "GLN", atom: "CD", props: {'partialCharge': 0.55}},
	{ resn: "GLN", atom: "OE1", props: {'partialCharge': -0.55}},
	{ resn: "GLN", atom: "NE2", props: {'partialCharge': 0.00}},
	{ resn: "GLN", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "GLN", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "GLU", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "GLU", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "GLU", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "GLU", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "GLU", atom: "CD", props: {'partialCharge': 0.14}},
	{ resn: "GLU", atom: "OE1", props: {'partialCharge': -0.57}},
	{ resn: "GLU", atom: "OE2", props: {'partialCharge': -0.57}},
	{ resn: "GLU", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "GLU", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "GLY", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "GLY", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "GLY", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "GLY", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "HIS", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "HIS", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "HIS", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "HIS", atom: "CG", props: {'partialCharge': 0.10}},
	{ resn: "HIS", atom: "ND1", props: {'partialCharge': -0.10}},
	{ resn: "HIS", atom: "CD2", props: {'partialCharge': 0.10}},
	{ resn: "HIS", atom: "NE2", props: {'partialCharge': -0.40}},
	{ resn: "HIS", atom: "CE1", props: {'partialCharge': 0.30}},
	{ resn: "HIS", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "HIS", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "ILE", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "ILE", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "ILE", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "ILE", atom: "CG2", props: {'partialCharge': 0.00}},
	{ resn: "ILE", atom: "CG1", props: {'partialCharge': 0.00}},
	{ resn: "ILE", atom: "CD", props: {'partialCharge': 0.00}},
	{ resn: "ILE", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "ILE", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "LEU", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "LEU", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "LEU", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "LEU", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "LEU", atom: "CD1", props: {'partialCharge': 0.00}},
	{ resn: "LEU", atom: "CD2", props: {'partialCharge': 0.00}},
	{ resn: "LEU", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "LEU", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "LYS", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "LYS", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "LYS", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "LYS", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "LYS", atom: "CD", props: {'partialCharge': 0.00}},
	{ resn: "LYS", atom: "CE", props: {'partialCharge': 0.25}},
	{ resn: "LYS", atom: "NZ", props: {'partialCharge': 0.75}},
	{ resn: "LYS", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "LYS", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "MET", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "MET", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "MET", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "MET", atom: "CG", props: {'partialCharge': 0.06}},
	{ resn: "MET", atom: "SD", props: {'partialCharge': -0.12}},
	{ resn: "MET", atom: "CE", props: {'partialCharge': 0.06}},
	{ resn: "MET", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "MET", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "PHE", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "PHE", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "PHE", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CD1", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CD2", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CE1", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CE2", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "CZ", props: {'partialCharge': 0.00}},
	{ resn: "PHE", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "PHE", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "PRO", atom: "N", props: {'partialCharge': -0.25}},
	{ resn: "PRO", atom: "CD", props: {'partialCharge': 0.10}},
	{ resn: "PRO", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "PRO", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "PRO", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "PRO", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "PRO", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "SER", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "SER", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "SER", atom: "CB", props: {'partialCharge': 0.25}},
	{ resn: "SER", atom: "OG", props: {'partialCharge': -0.25}},
	{ resn: "SER", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "SER", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "THR", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "THR", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "THR", atom: "CB", props: {'partialCharge': 0.25}},
	{ resn: "THR", atom: "OG1", props: {'partialCharge': -0.25}},
	{ resn: "THR", atom: "CG2", props: {'partialCharge': 0.00}},
	{ resn: "THR", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "THR", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "TRP", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "TRP", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "TRP", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "TRP", atom: "CG", props: {'partialCharge': -0.03}},
	{ resn: "TRP", atom: "CD2", props: {'partialCharge': 0.10}},
	{ resn: "TRP", atom: "CE2", props: {'partialCharge': -0.04}},
	{ resn: "TRP", atom: "CE3", props: {'partialCharge': -0.03}},
	{ resn: "TRP", atom: "CD1", props: {'partialCharge': 0.06}},
	{ resn: "TRP", atom: "NE1", props: {'partialCharge': -0.06}},
	{ resn: "TRP", atom: "CZ2", props: {'partialCharge': 0.00}},
	{ resn: "TRP", atom: "CZ3", props: {'partialCharge': 0.00}},
	{ resn: "TRP", atom: "CH2", props: {'partialCharge': 0.00}},
	{ resn: "TRP", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "TRP", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "TYR", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "TYR", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "TYR", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CG", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CD1", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CE1", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CD2", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CE2", props: {'partialCharge': 0.00}},
	{ resn: "TYR", atom: "CZ", props: {'partialCharge': 0.25}},
	{ resn: "TYR", atom: "OH", props: {'partialCharge': -0.25}},
	{ resn: "TYR", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "TYR", atom: "O", props: {'partialCharge': -0.55}},
	{ resn: "VAL", atom: "N", props: {'partialCharge': -0.15}},
	{ resn: "VAL", atom: "CA", props: {'partialCharge': 0.10}},
	{ resn: "VAL", atom: "CB", props: {'partialCharge': 0.00}},
	{ resn: "VAL", atom: "CG1", props: {'partialCharge': 0.00}},
	{ resn: "VAL", atom: "CG2", props: {'partialCharge': 0.00}},
	{ resn: "VAL", atom: "C", props: {'partialCharge': 0.60}},
	{ resn: "VAL", atom: "O", props: {'partialCharge': -0.55}}
]; 
	
$3Dmol['partialCharges'] = $3Dmol.partialCharges;
// Specifications for various object types used in 3Dmol.js
// This is primarily for documentation 
(function() {
/**
 * GLViewer input specification
 * @typedef ViewerSpec
 */
var ViewerSpec = {};
ViewerSpec.defaultcolors;
ViewerSpec.callback;

/**
 * Atom representation. Depending on the input file format, not all fields may be defined.
 * @typedef AtomSpec
 * @prop {string} resn - Parent residue name
 * @prop {number} x - Atom's x coordinate
 * @prop {number} y - Atom's y coordinate
 * @prop {number} z - Atom's z coordinate
 * @prop {number} color - Atom's color, as hex code
 * @prop {number} surfaceColor - Hex code for color to be used for surface patch over this atom
 * @prop {string} elem - Element abbreviation (e.g. 'H', 'Ca', etc)
 * @prop {boolean} hetflag - Set to true if atom is a heteroatom
 * @prop {string} chain - Chain this atom belongs to, if specified in input file (e.g 'A' for chain A)
 * @prop {number} resi - Residue number 
 * @prop {number} icode
 * @prop {number} rescode
 * @prop {number} serial - Atom's serial id number
 * @prop {string} atom - Atom name; may be more specific than 'elem' (e.g 'CA' for alpha carbon)
 * @prop {Array.<number>} bonds - Array of atom ids this atom is bonded to
 * @prop {string} ss - Secondary structure identifier (for cartoon render; e.g. 'h' for helix)
 * @prop {boolean} singleBonds - true if this atom forms only single bonds or no bonds at all
 * @prop {Array.<number>} bondOrder - Array of this atom's bond orders, corresponding to bonds identfied by 'bonds'
 * @prop {Object} properties - Optional mapping of additional properties
 * @prop {number} b - Atom b factor data
 * @prop {string} pdbline - If applicable, this atom's record entry from the input PDB file (used to output new PDB from models)
 * @prop {boolean} clickable - Set this flag to true to enable click selection handling for this atom
 * @prop {function(this, $3Dmol.GLViewer)} callback - Callback click handler function to be executed on this atom and its parent viewer
 * @prop {boolean} invert - for selection, inverts the meaning of the selection
 */


/**
 * Atom selection object. Used to specify what atoms should be selected.  Can include
 * any field from {@link AtomSpec} in which case atoms must equal the specified value.  
 * All fields must match for the selection to hold. If values
 * are provided as a list, then only one value of the list must match.
 * 
 * @example
 * viewer.addResLabels({resi: [1,2,3,4,5], atom: 'CA'}); // will label alpha carbons (CA) of residues 1-5
 * 
 * @typedef AtomSelectionSpec
 * @prop {AtomSpec} ... - any field from {@link AtomSpec}, values may be singletons or lists
 * @prop {GLModel} model - a single model or list of models from which atoms should be selected
 * @prop {number} bonds - overloaded to select number of bonds, e.g. {bonds: 0} will select all nonbonded atoms
 * @prop {function} predicate - user supplied function that gets passed an {AtomSpec} and should return true if the atom should be selected
 * @prop {boolean} invert - if set, inverts the meaning of the selection
 */



/** 
 * @typedef AtomStyleSpec
 * @prop {LineStyleSpec} line - draw bonds as lines
 * @prop {CrossStyleSpec} cross - draw atoms as crossed lines (aka stars)
 * @prop {StickStyleSpec} stick  - draw bonds as capped cylinders
 * @prop {SphereStyleSpec} sphere - draw atoms as spheres
 * @prop {CartoonStyleSpec} cartoon - draw cartoon representation of secondary structure
 */



/** 
 * GLShape style specification
 * @typedef
 */
var ShapeSpec = {};
/** @type {$3Dmol.Color} */
ShapeSpec.color;
ShapeSpec.wireframe;
ShapeSpec.alpha;
ShapeSpec.side;
ShapeSpec.clickable;
/** @type {function($3Dmol.GLShape, $3Dmol.GLViewer)} */
ShapeSpec.callback;

/**
 * Specification for adding custom shape
 * @typedef
 */
var CustomShapeSpec = {};
CustomShapeSpec.vertexArr;
CustomShapeSpec.faceArr;
CustomShapeSpec.normalArr;
CustomShapeSpec.lineArr;

/**
 * Sphere shape specification
 * @typedef
 */
var SphereSpec = {};
SphereSpec.radius;
/** @type {$3Dmol.Vector3} */
SphereSpec.center;

/**
 * Arrow shape specification
 * @typedef
 */
var ArrowSpec = {};
/** @var {$3Dmol.Vector3} ArrowSpec.start - Arrow start point*/
ArrowSpec.start;
/** @property {$3Dmol.Vector3} */
ArrowSpec.end;
ArrowSpec.radius;
ArrowSpec.radiusRatio;
ArrowSpec.mid;


/**
 * Volumetric data specification
 * @typedef
 */
var VolSpec = {};
VolSpec.isoval;
VolSpec.voxel;
})();