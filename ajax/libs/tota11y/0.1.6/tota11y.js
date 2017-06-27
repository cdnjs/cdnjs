/*!
 * tota11y v0.1.6
 * http://khan.github.io/tota11y
 * 
 * Includes Accessibility Developer Tools
 * http://github.com/GoogleChrome/accessibility-developer-tools
 * 
 * Copyright (c) 2015 Khan Academy
 * Released under the MIT license
 * http://github.com/Khan/tota11y/blob/master/LICENSE.txt
 * 
 * Date: 2016-10-03
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(buildElement) {/**
	 * The entry point for tota11y.
	 *
	 * Builds and mounts the toolbar.
	 */

	// Require the base tota11y styles right away so they can be overwritten
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(/*! ./less/tota11y.less */ 5);

	var $ = __webpack_require__(/*! jquery */ 4);

	var plugins = __webpack_require__(/*! ./plugins */ 9);
	var logoTemplate = __webpack_require__(/*! ./templates/logo.handlebars */ 47);

	// Chrome Accessibility Developer Tools - required once as a global
	__webpack_require__(/*! script!./~/accessibility-developer-tools/dist/js/axs_testing.js */ 48);

	var Toolbar = (function () {
	    function Toolbar() {
	        _classCallCheck(this, Toolbar);

	        this.activePlugin = null;
	    }

	    /**
	     * Manages the state of the toolbar when a plugin is clicked, and toggles
	     * the appropriate plugins on and off.
	     */

	    _createClass(Toolbar, [{
	        key: "handlePluginClick",
	        value: function handlePluginClick(plugin) {
	            // If the plugin was already selected, toggle it off
	            if (plugin === this.activePlugin) {
	                plugin.deactivate();
	                this.activePlugin = null;
	            } else {
	                // Deactivate the active plugin if there is one
	                if (this.activePlugin) {
	                    this.activePlugin.deactivate();
	                }

	                // Activate the selected plugin
	                plugin.activate();
	                this.activePlugin = plugin;
	            }
	        }

	        /**
	         * Renders the toolbar and appends it to the specified element.
	         */
	    }, {
	        key: "appendTo",
	        value: function appendTo($el) {
	            var _this = this;

	            var $logo = $(logoTemplate());
	            var $toolbar = undefined;

	            var $defaultPlugins = plugins["default"].map(function (Plugin) {
	                // eslint-disable-line no-unused-vars
	                return buildElement(Plugin, { onClick: _this.handlePluginClick.bind(_this) });
	            });

	            var $experimentalPlugins = null;
	            if (plugins.experimental.length) {
	                $experimentalPlugins = buildElement(
	                    "li",
	                    null,
	                    buildElement(
	                        "div",
	                        { className: "tota11y-plugins-separator" },
	                        "Experimental"
	                    ),
	                    buildElement(
	                        "ul",
	                        null,
	                        plugins.experimental.map(function (Plugin) {
	                            // eslint-disable-line no-unused-vars
	                            return buildElement(Plugin, { onClick: _this.handlePluginClick.bind(_this) });
	                        })
	                    )
	                );
	            }

	            var $plugins = buildElement(
	                "ul",
	                { className: "tota11y-plugins" },
	                $defaultPlugins,
	                $experimentalPlugins
	            );

	            var handleToggleClick = function handleToggleClick(e) {
	                e.preventDefault();
	                e.stopPropagation();
	                $toolbar.toggleClass("tota11y-expanded");
	                $toolbar.attr("aria-expanded", $toolbar.is(".tota11y-expanded"));
	            };

	            var $toggle = buildElement(
	                "button",
	                { "aria-controls": "tota11y-toolbar",
	                    className: "tota11y-toolbar-toggle",
	                    onClick: handleToggleClick,
	                    "aria-label": "[tota11y] Toggle menu" },
	                buildElement(
	                    "div",
	                    { "aria-hidden": "true", className: "tota11y-toolbar-logo" },
	                    $logo
	                )
	            );

	            $toolbar = buildElement(
	                "div",
	                { id: "tota11y-toolbar", className: "tota11y tota11y-toolbar",
	                    role: "region",
	                    "aria-expanded": "false" },
	                buildElement(
	                    "div",
	                    { className: "tota11y-toolbar-body" },
	                    $plugins
	                ),
	                $toggle
	            );

	            $el.append($toolbar);
	        }
	    }]);

	    return Toolbar;
	})();

	$(function () {
	    var bar = new Toolbar();

	    // TODO: Make this customizable
	    bar.appendTo($("body"));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./utils/element */ 3)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/*!**************************!*\
  !*** ./utils/element.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A function used by Babel to transpile JSX code into jQuery elements
	 */
	"use strict";

	function buildElement(type, props) {
	    var _arguments = arguments;

	    // We need to require jQuery inside of this method because `require()`
	    // will work different after mocha's magic "before" method runs.
	    //
	    // This allows us to use the jQuery instance provided by our jsdom
	    // instance.
	    var $ = __webpack_require__(/*! jquery */ 4);

	    // Is our element a TextNode?
	    if (props === undefined) {
	        // Type will be the text content, which can simply be returned here
	        return type;

	        // Is our element a Plugin?
	    } else if (type.render) {
	            // Render the plugin with the passed-in click handler
	            return type.render(props && props.onClick);

	            // Otherwise, build the element with jQuery
	        } else {
	                var _len, children, _key;

	                var _ret = (function () {
	                    var $el = $("<" + type + ">");

	                    // Iterate through props
	                    if (props !== null) {
	                        for (var propName in props) {
	                            // onClick gets turned into a jQuery event handler
	                            // TODO: Handle props like onHover, onFocus, etc.
	                            if (propName === "onClick") {
	                                var handler = props[propName];
	                                $el.click(handler);

	                                // Some passed-in props need to be set with $.attr
	                                // Currently we do this for role and aria-*
	                            } else if (/^aria-/.test(propName) || propName === "role") {
	                                    var value = props[propName];
	                                    $el.attr(propName, value);

	                                    // All other props can go right to $.prop
	                                } else {
	                                        var value = props[propName];
	                                        $el.prop(propName, value);
	                                    }
	                        }
	                    }

	                    // Recurse through the children and append each resulting element to
	                    // the parent

	                    for (_len = _arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	                        children[_key - 2] = _arguments[_key];
	                    }

	                    children.forEach(function (child) {
	                        $el.append(buildElement(child));
	                    });

	                    return {
	                        v: $el
	                    };
	                })();

	                if (typeof _ret === "object") return _ret.v;
	            }
	}

	module.exports = buildElement;

/***/ },
/* 4 */
/*!*********************************!*\
  !*** ./~/jquery/dist/jquery.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-05-20T17:23Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
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
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
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
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
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

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}

			return key === undefined || hasOwn.call( obj, key );
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

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
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
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
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

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

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
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
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
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
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
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

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
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

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
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

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
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

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
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

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

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
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
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

		attrHandle: {},

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
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

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
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

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

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
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
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
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
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

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

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
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
								idx = indexOf( seed, matched[i] );
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
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
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
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

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
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
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
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
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

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
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
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
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
	};

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
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
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

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
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

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
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
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

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
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
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
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
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
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
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

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
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

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
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
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
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
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
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
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
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


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
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
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
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
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

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
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

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

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
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
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
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
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
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

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
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

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
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
			return elem;
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
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

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
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
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

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

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
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
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
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
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
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
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

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

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
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
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
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
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

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
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

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
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
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

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

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
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

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
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
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
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

			values[ index ] = dataPriv.get( elem, "olddisplay" );
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
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
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

	jQuery.extend( {

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

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
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

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

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
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
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
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
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

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
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

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

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

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
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

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
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

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
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

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
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

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

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
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

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
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
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

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
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

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

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
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
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
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

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
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

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
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
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
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
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
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
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

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
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
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
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
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

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

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

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
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
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
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
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
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
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
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
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
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
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

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
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
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
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
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

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
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

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

	// Serialize an array of form elements or a set of
	// key/values into a query string
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
			} );

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

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
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
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
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
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
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
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
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

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
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
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
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

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
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
		} );
	} );


	jQuery.fn.extend( {

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
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 5 */
/*!***************************!*\
  !*** ./less/tota11y.less ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(/*! !./../~/css-loader!./../~/postcss-loader!./../~/autoprefixer-loader?{browsers:['> 1%']}!./../~/less-loader!./tota11y.less */ 6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../~/style-loader/addStyles.js */ 8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../node_modules/less-loader/index.js!./tota11y.less", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../node_modules/less-loader/index.js!./tota11y.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/*!*************************************************************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/autoprefixer-loader?{browsers:['> 1%']}!./~/less-loader!./less/tota11y.less ***!
  \*************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 7)();
	exports.push([module.id, ".tota11y-dark-color-scheme {\n  background-color: #333 !important;\n  color: #f2f2f2 !important;\n}\n.tota11y-no-select {\n  -webkit-user-select: none !important;\n     -moz-user-select: none !important;\n      -ms-user-select: none !important;\n          user-select: none !important;\n}\n/**\n * Base styles for tota11y to make sure things look consistent under\n * reasonable circumstances.\n */\n.tota11y,\n.tota11y * {\n  border: none !important;\n  background-color: inherit !important;\n  box-sizing: border-box !important;\n  color: #f2f2f2 !important;\n  font-family: Arial !important;\n  font-size: 14px !important;\n  font-style: normal !important;\n  font-weight: 400 !important;\n  line-height: 1.35 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  text-align: left !important;\n  text-shadow: none !important;\n}\n.tota11y * {\n  height: auto !important;\n  width: auto !important;\n}\n.tota11y strong {\n  font-weight: bold !important;\n}\n.tota11y pre,\n.tota11y code {\n  background-color: #ddd !important;\n  border: none !important;\n  border-radius: 0 !important;\n  color: inherit !important;\n  font-family: monospace !important;\n  font-size: inherit !important;\n  line-height: inherit !important;\n}\n.tota11y pre {\n  padding: 5px 10px !important;\n  margin: 0 0 10px !important;\n  overflow-x: scroll !important;\n}\n.tota11y code {\n  border-radius: 2px !important;\n  display: inline !important;\n  padding: 1px !important;\n}\n.tota11y i,\n.tota11y em {\n  font-style: italic !important;\n}\n.tota11y p {\n  margin: 0 0 10px !important;\n}\n.tota11y a,\n.tota11y a:hover,\n.tota11y a:focus {\n  background-color: inherit !important;\n  color: inherit !important;\n  text-decoration: none !important;\n}\n.tota11y-toolbar {\n  background-color: #333 !important;\n  color: #f2f2f2 !important;\n  position: fixed !important;\n  top: auto !important;\n  right: auto !important;\n  bottom: 0 !important;\n  left: 10px !important;\n  border-top-left-radius: 5px !important;\n  border-top-right-radius: 5px !important;\n  overflow: hidden !important;\n  z-index: 9998 !important;\n}\n.tota11y-toolbar-toggle {\n  background-color: #333 !important;\n  display: block !important;\n  padding: 7px !important;\n  width: 100% !important;\n}\n.tota11y-toolbar-logo {\n  height: 25px !important;\n  margin: 0 auto !important;\n  text-align: center !important;\n  width: 35px !important;\n}\n.tota11y-toolbar-logo svg {\n  height: 25px !important;\n}\n.tota11y-toolbar-body {\n  display: none !important;\n}\n.tota11y-toolbar.tota11y-expanded .tota11y-toolbar-body {\n  display: block !important;\n}\n.tota11y-sr-only {\n  border: 0 !important;\n  clip: rect(0, 0, 0, 0) !important;\n  height: 1px !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  position: absolute !important;\n  width: 1px !important;\n}\n", ""]);

/***/ },
/* 7 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	// 
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(var i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/*!**************************!*\
  !*** ./plugins/index.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * An index of plugins.
	 *
	 * Exposes an array of plugin instances.
	 */

	"use strict";

	var AltTextPlugin = __webpack_require__(/*! ./alt-text */ 10);
	var ContrastPlugin = __webpack_require__(/*! ./contrast */ 31);
	var HeadingsPlugin = __webpack_require__(/*! ./headings */ 36);
	var LabelsPlugin = __webpack_require__(/*! ./labels */ 40);
	var LandmarksPlugin = __webpack_require__(/*! ./landmarks */ 42);
	var LinkTextPlugin = __webpack_require__(/*! ./link-text */ 43);
	var A11yTextWand = __webpack_require__(/*! ./a11y-text-wand */ 44);

	module.exports = {
	    "default": [new HeadingsPlugin(), new ContrastPlugin(), new LinkTextPlugin(), new LabelsPlugin(), new AltTextPlugin(), new LandmarksPlugin()],

	    experimental: [new A11yTextWand()]
	};

/***/ },
/* 10 */
/*!***********************************!*\
  !*** ./plugins/alt-text/index.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(buildElement) {/**
	 * A plugin to check for valid alternative representations for images
	 */

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var $ = __webpack_require__(/*! jquery */ 4);
	var Plugin = __webpack_require__(/*! ../base */ 11);
	var annotate = __webpack_require__(/*! ../shared/annotate */ 13)("alt-text");
	var audit = __webpack_require__(/*! ../shared/audit */ 30);

	var AltTextPlugin = (function (_Plugin) {
	    _inherits(AltTextPlugin, _Plugin);

	    function AltTextPlugin() {
	        _classCallCheck(this, AltTextPlugin);

	        _get(Object.getPrototypeOf(AltTextPlugin.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(AltTextPlugin, [{
	        key: "getTitle",
	        value: function getTitle() {
	            return "Image alt-text";
	        }
	    }, {
	        key: "getDescription",
	        value: function getDescription() {
	            return "Annotates images without alt text";
	        }
	    }, {
	        key: "reportError",
	        value: function reportError(el) {
	            var $el = $(el);
	            var src = $el.attr("src") || "..";
	            var title = "Image is missing alt text";
	            var $error = buildElement(
	                "div",
	                null,
	                buildElement(
	                    "p",
	                    null,
	                    "This image does not have an associated \"alt\" attribute. Please specify the alt text for this image like so:"
	                ),
	                buildElement(
	                    "pre",
	                    null,
	                    buildElement(
	                        "code",
	                        null,
	                        "&lt;img src=\"" + src + "\" alt=\"Image description\"&gt"
	                    )
	                ),
	                buildElement(
	                    "p",
	                    null,
	                    "If the image is decorative and does not convey any information to the surrounding content, however, you may leave this \"alt\" attribute empty, or specify a \"role\" attribute with a value of \"presentation.\""
	                ),
	                buildElement(
	                    "pre",
	                    null,
	                    buildElement(
	                        "code",
	                        null,
	                        "&lt;img src=\"" + src + "\" alt=\"\"&gt;",
	                        buildElement("br", null),
	                        "&lt;img src=\"" + src + "\" role=\"presentation\"&gt;"
	                    )
	                )
	            );

	            // Place an error label on the element and register it as an
	            // error in the info panel
	            var entry = this.error(title, $error, $el);
	            annotate.errorLabel($el, "", title, entry);
	        }
	    }, {
	        key: "run",
	        value: function run() {
	            // Generate errors for any images that fail the Accessibility
	            // Developer Tools audit

	            var _audit = audit("imagesWithoutAltText");

	            var result = _audit.result;
	            var elements = _audit.elements;

	            if (result === "FAIL") {
	                elements.forEach(this.reportError.bind(this));
	            }

	            // Additionally, label presentational images
	            $("img[role=\"presentation\"], img[alt=\"\"]").each(function (i, el) {
	                // "Error" labels have a warning icon and expanded text on hover,
	                // but we add a special `warning` class to color it differently.
	                annotate.errorLabel($(el), "", "This image is decorative").addClass("tota11y-label-warning");
	            });
	        }
	    }, {
	        key: "cleanup",
	        value: function cleanup() {
	            annotate.removeAll();
	        }
	    }]);

	    return AltTextPlugin;
	})(Plugin);

	module.exports = AltTextPlugin;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./utils/element */ 3)))

/***/ },
/* 11 */
/*!*************************!*\
  !*** ./plugins/base.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(buildElement) {/**
	 * Base class for plugins.
	 *
	 * This module defines methods to render and mount plugins to the toolbar.
	 * Each plugin will define four methods:
	 *     getTitle: title to display in the toolbar
	 *     getDescription: description to display in the toolbar
	 *     run: code to run when the plugin is activated from the toolbar
	 *     cleanup: code to run when the plugin is deactivated from the toolbar
	 */

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InfoPanel = __webpack_require__(/*! ./shared/info-panel */ 12);

	__webpack_require__(/*! ./style.less */ 28);

	var Plugin = (function () {
	    function Plugin() {
	        _classCallCheck(this, Plugin);

	        this.panel = new InfoPanel(this);
	        this.$checkbox = null;
	    }

	    _createClass(Plugin, [{
	        key: "getTitle",
	        value: function getTitle() {
	            return "New plugin";
	        }
	    }, {
	        key: "getDescription",
	        value: function getDescription() {
	            return "";
	        }

	        /**
	         * Methods that communicate directly with the info panel
	         * TODO: Consider names like `setSummary` and `addError`
	         */

	        // Populates the info panel's "Summary" tab
	    }, {
	        key: "summary",
	        value: function summary($html) {
	            return this.panel.setSummary($html);
	        }

	        // Populates the info panel's "About" tab
	    }, {
	        key: "about",
	        value: function about($html) {
	            return this.panel.setAbout($html);
	        }

	        // Adds an entry to the info panel's "Errors" tab
	    }, {
	        key: "error",
	        value: function error(title, $description, $el) {
	            return this.panel.addError(title, $description, $el);
	        }

	        /**
	         * Renders the plugin view.
	         */
	    }, {
	        key: "render",
	        value: function render(clickHandler) {
	            var _this = this;

	            this.$checkbox = buildElement("input", {
	                className: "tota11y-plugin-checkbox tota11y-sr-only",
	                type: "checkbox",
	                onClick: function () {
	                    return clickHandler(_this);
	                } });

	            var $switch = buildElement(
	                "label",
	                { className: "tota11y-plugin-switch" },
	                this.$checkbox,
	                buildElement(
	                    "div",
	                    { "aria-hidden": "true",
	                        className: "tota11y-plugin-indicator" },
	                    "✓"
	                ),
	                buildElement(
	                    "div",
	                    { className: "tota11y-plugin-info" },
	                    buildElement(
	                        "div",
	                        { className: "tota11y-plugin-title" },
	                        this.getTitle()
	                    ),
	                    buildElement(
	                        "div",
	                        { className: "tota11y-plugin-description" },
	                        this.getDescription()
	                    )
	                )
	            );

	            var $el = buildElement(
	                "li",
	                { role: "menu-item", className: "tota11y-plugin" },
	                $switch
	            );

	            return $el;
	        }

	        /**
	         * Activate the plugin from the UI.
	         */
	    }, {
	        key: "activate",
	        value: function activate() {
	            this.run();
	            this.panel.render();
	        }

	        /**
	         * Deactivate the plugin from the UI.
	         */
	    }, {
	        key: "deactivate",
	        value: function deactivate() {
	            this.cleanup();
	            this.panel.destroy();

	            this.$checkbox.prop("checked", false);
	        }
	    }]);

	    return Plugin;
	})();

	module.exports = Plugin;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./utils/element */ 3)))

/***/ },
/* 12 */
/*!********************************************!*\
  !*** ./plugins/shared/info-panel/index.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(buildElement) {/**
	 * The following code defines an information panel that can be invoked from
	 * any plugin to display summaries, errors, or more information about what
	 * the plugin is doing.
	 *
	 * These panels are moveable and closeable, and are unique to the plugin that
	 * created them. They appear in the bottom right corner of the viewport.
	 *
	 * Info panels consist of a title and three optional sections, which form
	 * tabs that users can switch between.
	 *
	 *   Summary: A summary of the plugin's results
	 *   Errors: A list of violations reported by this plugin. The tab marker also
	 *           contains the number of errors listed
	 */

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var $ = __webpack_require__(/*! jquery */ 4);
	var annotate = __webpack_require__(/*! ../annotate */ 13)("info-panel");

	var errorTemplate = __webpack_require__(/*! ./error.handlebars */ 25);
	__webpack_require__(/*! ./style.less */ 26);

	var INITIAL_PANEL_MARGIN_PX = 10;
	var COLLAPSED_CLASS_NAME = "tota11y-collapsed";
	var HIDDEN_CLASS_NAME = "tota11y-info-hidden";

	var InfoPanel = (function () {
	    function InfoPanel(plugin) {
	        _classCallCheck(this, InfoPanel);

	        this.plugin = plugin;

	        this.about = null;
	        this.summary = null;
	        this.errors = [];

	        this.$el = null;
	    }

	    /**
	     * Sets the contents of the about section as HTML
	     */

	    _createClass(InfoPanel, [{
	        key: "setAbout",
	        value: function setAbout(about) {
	            this.about = about;
	        }

	        /**
	         * Sets the contents of the summary section as HTML
	         */
	    }, {
	        key: "setSummary",
	        value: function setSummary(summary) {
	            this.summary = summary;
	        }

	        /**
	         * Adds an error to the errors tab. Also receives a jQuery element to
	         * highlight on hover.
	         */
	    }, {
	        key: "addError",
	        value: function addError(title, $description, $el) {
	            var error = { title: title, $description: $description, $el: $el };
	            this.errors.push(error);
	            return error;
	        }
	    }, {
	        key: "_addTab",
	        value: function _addTab(title, html) {
	            var _this = this;

	            // Create and append a tab marker
	            var $tab = buildElement(
	                "li",
	                { className: "tota11y-info-tab" },
	                buildElement(
	                    "a",
	                    { className: "tota11y-info-tab-anchor", href: "#" },
	                    buildElement(
	                        "span",
	                        { className: "tota11y-info-tab-anchor-text" },
	                        title
	                    )
	                )
	            );

	            this.$el.find(".tota11y-info-tabs").append($tab);

	            // Create and append the tab content
	            var $section = $("<div>").addClass("tota11y-info-section").html(html);
	            this.$el.find(".tota11y-info-sections").append($section);

	            // Register an "activate" event for the tab, which switches the
	            // tab's associated content to be visible, and changes the
	            // appearance of the newly-active tab marker
	            $tab.on("activate", function () {
	                _this.$el.find(".tota11y-info-tab.active").removeClass("active");
	                _this.$el.find(".tota11y-info-section.active").removeClass("active");

	                $tab.addClass("active");
	                $section.addClass("active");
	            });

	            // Activate the tab when its anchor is clicked
	            $tab.on("click", function (e) {
	                e.preventDefault();
	                e.stopPropagation();
	                $tab.trigger("activate");
	            });

	            return $tab;
	        }

	        /**
	         * Positions the info panel and sets up event listeners to make the
	         * panel draggable
	         */
	    }, {
	        key: "initAndPosition",
	        value: function initAndPosition() {
	            var _this2 = this;

	            var panelLeftPx = undefined,
	                panelTopPx = undefined;

	            // Wire up the dismiss button
	            this.$el.find(".tota11y-info-dismiss-trigger").click(function (e) {
	                e.preventDefault();
	                e.stopPropagation();
	                _this2.$el.addClass(HIDDEN_CLASS_NAME);

	                // (a11y) Bring the focus back to the plugin's checkbox
	                _this2.plugin.$checkbox.focus();
	            });

	            // Append the info panel to the body. In reality we'll likely want
	            // it directly adjacent to the toolbar.
	            $("body").append(this.$el);

	            // Position info panel on the bottom right of the window
	            panelLeftPx = window.innerWidth - this.$el.width() - INITIAL_PANEL_MARGIN_PX;
	            panelTopPx = window.innerHeight - this.$el.height() - INITIAL_PANEL_MARGIN_PX;

	            // Wire up draggable surface
	            var $draggable = this.$el.find(".tota11y-info-title");
	            var isDragging = false;

	            // Variables for the starting positions of the mouse and panel
	            var initMouseX = undefined,
	                initMouseY = undefined;
	            var initPanelLeft = undefined,
	                initPanelTop = undefined;

	            $draggable.on("mousedown", function (e) {
	                e.preventDefault();

	                // Start dragging, and record initial mouse and panel
	                // positions
	                isDragging = true;

	                initMouseX = e.pageX;
	                initMouseY = e.pageY;

	                initPanelLeft = panelLeftPx;
	                initPanelTop = panelTopPx;
	            }).on("mouseup", function (e) {
	                e.preventDefault();
	                isDragging = false;
	            });

	            $(window).on("mousemove", function (e) {
	                if (!isDragging) {
	                    return;
	                }
	                e.preventDefault();

	                var deltaX = e.pageX - initMouseX;
	                var deltaY = e.pageY - initMouseY;

	                panelLeftPx = initPanelLeft + deltaX;
	                panelTopPx = initPanelTop + deltaY;

	                _this2.$el.css({
	                    left: panelLeftPx,
	                    top: panelTopPx
	                });
	            });

	            this.$el.css({
	                left: panelLeftPx,
	                top: panelTopPx
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;

	            // Destroy the existing info panel to prevent double-renders
	            if (this.$el) {
	                this.$el.remove();
	            }

	            var hasContent = false;

	            this.$el = buildElement(
	                "div",
	                { className: "tota11y tota11y-info", tabindex: "-1" },
	                buildElement(
	                    "header",
	                    { className: "tota11y-info-title" },
	                    this.plugin.getTitle(),
	                    buildElement(
	                        "span",
	                        { className: "tota11y-info-controls" },
	                        buildElement(
	                            "label",
	                            { className: "tota11y-info-annotation-toggle" },
	                            "Annotate:",
	                            " ",
	                            buildElement("input", {
	                                className: "toggle-annotation",
	                                type: "checkbox",
	                                checked: "checked" })
	                        ),
	                        buildElement(
	                            "a",
	                            { "aria-label": "Close info panel",
	                                href: "#",
	                                className: "tota11y-info-dismiss-trigger" },
	                            "×"
	                        )
	                    )
	                ),
	                buildElement(
	                    "div",
	                    { className: "tota11y-info-body" },
	                    buildElement("div", { className: "tota11y-info-sections" }),
	                    buildElement("ul", { role: "tablist", className: "tota11y-info-tabs" })
	                )
	            );

	            // Add the appropriate tabs based on which information the info panel
	            // was provided, then highlight the most important one.
	            var $activeTab = undefined;
	            if (this.about) {
	                $activeTab = this._addTab("About", this.about);
	            }

	            if (this.summary) {
	                $activeTab = this._addTab("Summary", this.summary);
	            }

	            // Wire annotation toggling
	            this.$el.find(".toggle-annotation").click(function (e) {
	                if ($(e.target).prop("checked")) {
	                    annotate.show();
	                } else {
	                    annotate.hide();
	                }
	            });

	            if (this.errors.length > 0) {
	                (function () {
	                    var $errors = $("<ul>").addClass("tota11y-info-errors");

	                    // Store a reference to the "Errors" tab so we can switch to it
	                    // later
	                    var $errorsTab = undefined;

	                    _this3.errors.forEach(function (error, i) {
	                        var $error = $(errorTemplate(error));

	                        // Insert description jQuery object into template.
	                        // Description is passed as jQuery object
	                        // so that functionality can be inserted.
	                        $error.find(".tota11y-info-error-description").prepend(error.$description);

	                        $errors.append($error);

	                        // Wire up the expand/collapse trigger
	                        var $trigger = $error.find(".tota11y-info-error-trigger");
	                        var $desc = $error.find(".tota11y-info-error-description");

	                        $trigger.click(function (e) {
	                            e.preventDefault();
	                            e.stopPropagation();
	                            $trigger.toggleClass(COLLAPSED_CLASS_NAME);
	                            $desc.toggleClass(COLLAPSED_CLASS_NAME);
	                        });

	                        // Attach a function to the original error object to open
	                        // this error so it can be done externally. We'll use this to
	                        // access error entries in the info panel from labels.
	                        error.show = function () {
	                            // Make sure info panel is visible
	                            _this3.$el.removeClass(HIDDEN_CLASS_NAME);

	                            // Open the error entry
	                            $trigger.removeClass(COLLAPSED_CLASS_NAME);
	                            $desc.removeClass(COLLAPSED_CLASS_NAME);

	                            // Switch to the "Errors" tab
	                            $errorsTab.trigger("activate");

	                            // Scroll to the error entry
	                            var $scrollParent = $trigger.parents(".tota11y-info-section");
	                            $scrollParent[0].scrollTop = $trigger[0].offsetTop - 10;
	                        };

	                        // Attach the `$trigger` as well so can access it externally.
	                        // We use this to highlight the trigger when hovering over
	                        // inline error labels.
	                        error.$trigger = $trigger;

	                        // Wire up the scroll-to-error button
	                        var $scroll = $error.find(".tota11y-info-error-scroll");
	                        $scroll.click(function (e) {
	                            e.preventDefault();
	                            e.stopPropagation();

	                            // TODO: This attempts to scroll to fixed elements
	                            $(document).scrollTop(error.$el.offset().top - 80);
	                        });

	                        // Expand the first violation
	                        if (i === 0) {
	                            $desc.toggleClass(COLLAPSED_CLASS_NAME);
	                            $trigger.toggleClass(COLLAPSED_CLASS_NAME);
	                        }

	                        // Highlight the violating element on hover/focus. We do it
	                        // for both $trigger and $scroll to allow users to see the
	                        // highlight when scrolling to the element with the button.
	                        annotate.toggleHighlight(error.$el, $trigger);
	                        annotate.toggleHighlight(error.$el, $scroll);

	                        // Add code from error.$el to the information panel
	                        var errorHTML = error.$el[0].outerHTML;

	                        // Trim the code block if it is over 300 characters
	                        if (errorHTML.length > 300) {
	                            errorHTML = errorHTML.substring(0, 300) + "...";
	                        }

	                        var $relevantCode = $error.find(".tota11y-info-error-description-code-container code");
	                        $relevantCode.text(errorHTML);
	                    });

	                    $errorsTab = $activeTab = _this3._addTab("Errors", $errors);

	                    // Add a small badge next to the tab title
	                    var $badge = $("<div>").addClass("tota11y-info-error-count").text(_this3.errors.length);

	                    $activeTab.find(".tota11y-info-tab-anchor").append($badge);
	                })();
	            }

	            if ($activeTab) {
	                $activeTab.trigger("activate");
	                // hasContent is technically coupled to $activeTab, since if there
	                // is no $activeTab then there is no content. This behavior may
	                // change in the future.
	                hasContent = true;
	            }

	            if (hasContent) {
	                this.initAndPosition();
	            }

	            // (a11y) Shift focus to the newly-opened info panel
	            this.$el.focus();

	            return this.$el;
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            // Reset contents
	            this.about = null;
	            this.summary = null;
	            this.errors = [];

	            // Remove the element
	            if (this.$el) {
	                this.$el.remove();
	                this.$el = null;
	            }

	            // Remove the annotations
	            annotate.removeAll();
	        }
	    }]);

	    return InfoPanel;
	})();

	module.exports = InfoPanel;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./utils/element */ 3)))

/***/ },
/* 13 */
/*!******************************************!*\
  !*** ./plugins/shared/annotate/index.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Utility functions to annotate particular site elements.
	 *
	 * Annotations are namespaced, meaning you would normally include this
	 * package like so:
	 *
	 *     let annotate = require("./annotate")("headers");
	 *
	 * This allows plugins to easily maintain their annotations, rather than
	 * keeping track of an extra class name elsewhere.
	 */

	"use strict";

	var $ = __webpack_require__(/*! jquery */ 4);

	var errorLabelTemplate = __webpack_require__(/*! ./error-label.handlebars */ 14);
	__webpack_require__(/*! ./style.less */ 23);

	// For very small (or zero-area) elements, highlights are not very useful.
	// This constant declares highlights to be at least `MIN_HIGHLIGHT_SIZE` tall
	// and across.
	var MIN_HIGHLIGHT_SIZE = 25;

	// Polyfill fallback for IE < 10
	window.requestAnimationFrame = window.requestAnimationFrame || function (callback) {
	    window.setTimeout(callback, 16);
	};

	module.exports = function (namespace) {
	    // The class that will be applied to any annotation generated in this
	    // namespace
	    var ANNOTATION_CLASS = "tota11y-annotation-" + namespace;

	    // A queue of {$annotation, $parent}'s that is populated by
	    // `createAnnotation` and emptied by the `render()` method.
	    //
	    // Annotations are queued to reduce reflows.
	    var queue = [];

	    // Register a new annotation to a given jQuery element
	    var createAnnotation = function createAnnotation($el, className) {
	        // Create a position an annotation relative to its offset parent.
	        // We also store the element its annotation so we can reposition when
	        // the window resizes.
	        var $annotation = $("<div>").addClass("tota11y") // tota11y base class for styling
	        .addClass(ANNOTATION_CLASS).addClass(className).css($el.position()).data({ $el: $el });

	        // TODO: We can invoke a requestAnimationFrame(render) here to limit
	        // the amount of times we run that timer

	        // Append an object to the queue. We'll add the annotation to the DOM
	        // later to reduce reflows.
	        queue.push({
	            $annotation: $annotation,
	            $parent: $el.offsetParent()
	        });

	        return $annotation;
	    };

	    // To maintain a high framerate, we'll only render `RENDER_CHUNK_SIZE`
	    // annotations per frame.
	    //
	    // NOTE: A value of "20" consistently hits 60fps on facebook.com
	    var RENDER_CHUNK_SIZE = 20;

	    // Mount all annotations to the DOM in sequence. This is done by
	    // picking items off the queue, where each item consists of the
	    // annotation and the node to which we'll append it.
	    (function loop() {
	        for (var i = 0; queue.length > 0 && i < RENDER_CHUNK_SIZE; i++) {
	            var item = queue.shift();
	            item.$parent.append(item.$annotation);
	        }

	        window.requestAnimationFrame(loop);
	    })();

	    // Handle resizes by repositioning all annotations in bulk
	    $(window).resize(function () {
	        var $annotations = $("." + ANNOTATION_CLASS);

	        // Record the position of each annotation's corresponding element to
	        // batch measurements
	        var positions = $annotations.map(function (i, el) {
	            return $(el).data("$el").position();
	        });

	        // Reposition each annotation (batching invalidations)
	        $annotations.each(function (i, el) {
	            $(el).css({
	                top: positions[i].top,
	                left: positions[i].left
	            });
	        });
	    });

	    return {
	        // Places a small label in the top left corner of a given jQuery
	        // element. By default, this label contains the element's tagName.
	        label: function label($el) {
	            var text = arguments.length <= 1 || arguments[1] === undefined ? $el.prop("tagName").toLowerCase() : arguments[1];
	            return (function () {
	                var $label = createAnnotation($el, "tota11y-label");
	                return $label.html(text);
	            })();
	        },

	        // Places a special label on an element that, when hovered, displays
	        // an expanded error message.
	        //
	        // This method also accepts an optional `errorEntry`, which
	        // corresponds to the object returned from `InfoPanel.addError`. This
	        // object will contain a "show()" method when the info panel is
	        // rendered, allowing us to externally open the entry in the info
	        // panel corresponding to this error.
	        errorLabel: function errorLabel($el, text, expanded, errorEntry) {
	            var $innerHtml = $(errorLabelTemplate({
	                text: text,
	                detail: expanded,
	                hasErrorEntry: !!errorEntry
	            }));

	            if (errorEntry) {
	                $innerHtml.find(".tota11y-label-link").click(function (e) {
	                    e.preventDefault();
	                    e.stopPropagation();
	                    errorEntry.show();
	                });

	                $innerHtml.hover(function () {
	                    errorEntry.$trigger.addClass("trigger-highlight");
	                }, function () {
	                    errorEntry.$trigger.removeClass("trigger-highlight");
	                });
	            }

	            return this.label($el).addClass("tota11y-label-error").html($innerHtml);
	        },

	        // Highlights a given jQuery element by placing a translucent
	        // rectangle directly over it
	        highlight: function highlight($el) {
	            var $highlight = createAnnotation($el, "tota11y-highlight");
	            return $highlight.css({
	                // include margins
	                width: Math.max(MIN_HIGHLIGHT_SIZE, $el.outerWidth(true)),
	                height: Math.max(MIN_HIGHLIGHT_SIZE, $el.outerHeight(true))
	            });
	        },

	        // Toggles a highlight on a given jQuery element `$el` when `$trigger`
	        // is hovered (mouseenter/mouseleave) or focused (focus/blur)
	        toggleHighlight: function toggleHighlight($el, $trigger) {
	            var _this = this;

	            var $highlight = undefined;

	            $trigger.on("mouseenter focus", function () {
	                if ($highlight) {
	                    $highlight.remove();
	                }

	                $highlight = _this.highlight($el);
	            });

	            $trigger.on("mouseleave blur", function () {
	                if ($highlight) {
	                    $highlight.remove();
	                    $highlight = null;
	                }
	            });
	        },

	        hide: function hide() {
	            $(".tota11y.tota11y-label").hide();
	        },

	        show: function show() {
	            $(".tota11y.tota11y-label").show();
	        },

	        removeAll: function removeAll() {
	            // Remove all annotations
	            $("." + ANNOTATION_CLASS).remove();
	        }
	    };
	};

/***/ },
/* 14 */
/*!********************************************************!*\
  !*** ./plugins/shared/annotate/error-label.handlebars ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(/*! ./~/handlebars/runtime.js */ 15);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    return "        <div class=\"tota11y-label-help\">\n            (<a class=\"tota11y-label-link\" href=\"#\">?</a>)\n        </div>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

	  return "<span class=\"tota11y-label-error-icon\">\n    <!--\n        \"Warning\" icon by Lorena Salagre\n        https://thenounproject.com/lorens/\n\n        Licensed under Creative Commons by 3.0 US\n        http://creativecommons.org/licenses/by/3.0/us/legalcode\n    -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\">\n        <path d=\"M80.515,90.781H19.485c-6.145,0-10.779-2.168-13.052-6.103c-2.273-3.938-1.832-9.036,1.24-14.356l30.515-52.851  c3.07-5.321,7.266-8.251,11.811-8.251s8.741,2.93,11.811,8.251l30.515,52.851c3.072,5.32,3.513,10.418,1.24,14.356  C91.293,88.613,86.659,90.781,80.515,90.781z M50,12.384c-3.367,0-6.59,2.369-9.071,6.669L10.415,71.904  c-2.483,4.3-2.924,8.275-1.24,11.191c1.683,2.916,5.345,4.521,10.311,4.521h61.029c4.966,0,8.628-1.605,10.311-4.521  c1.683-2.916,1.243-6.89-1.24-11.191L59.071,19.053C56.59,14.753,53.367,12.384,50,12.384z M56.227,72.18  c0-3.172-2.572-5.744-5.744-5.744s-5.744,2.572-5.744,5.744c0,3.172,2.572,5.744,5.744,5.744S56.227,75.352,56.227,72.18z   M56.382,37.613c0-3.257-2.641-5.898-5.898-5.898c-3.257,0-5.898,2.641-5.898,5.898l1.393,20.932h0.019  c0.202,2.312,2.121,4.132,4.486,4.132c2.187,0,4.012-1.551,4.434-3.613c0.034-0.167,0.037-0.345,0.052-0.518h0.04L56.382,37.613z\"/>\n    </svg>\n</span>\n\n<span class=\"tota11y-label-content\">\n    <div class=\"tota11y-label-text\">"
	    + ((stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "</div>\n"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.hasErrorEntry : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "    <div class=\"tota11y-label-detail\">"
	    + ((stack1 = ((helper = (helper = helpers.detail || (depth0 != null ? depth0.detail : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"detail","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "</div>\n</span>\n";
	},"useData":true});

/***/ },
/* 15 */
/*!*********************************!*\
  !*** ./~/handlebars/runtime.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(/*! ./dist/cjs/handlebars.runtime */ 16)['default'];


/***/ },
/* 16 */
/*!*****************************************************!*\
  !*** ./~/handlebars/dist/cjs/handlebars.runtime.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;

	var _import = __webpack_require__(/*! ./handlebars/base */ 17);

	var base = _interopRequireWildcard(_import);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _SafeString = __webpack_require__(/*! ./handlebars/safe-string */ 20);

	var _SafeString2 = _interopRequireWildcard(_SafeString);

	var _Exception = __webpack_require__(/*! ./handlebars/exception */ 19);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var _import2 = __webpack_require__(/*! ./handlebars/utils */ 18);

	var Utils = _interopRequireWildcard(_import2);

	var _import3 = __webpack_require__(/*! ./handlebars/runtime */ 21);

	var runtime = _interopRequireWildcard(_import3);

	var _noConflict = __webpack_require__(/*! ./handlebars/no-conflict */ 22);

	var _noConflict2 = _interopRequireWildcard(_noConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _SafeString2['default'];
	  hb.Exception = _Exception2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_noConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 17 */
/*!**************************************************!*\
  !*** ./~/handlebars/dist/cjs/handlebars/base.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	exports.createFrame = createFrame;

	var _import = __webpack_require__(/*! ./utils */ 18);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(/*! ./exception */ 19);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var VERSION = '3.0.1';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 6;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};

	  registerDefaultHelpers(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: logger,
	  log: log,

	  registerHelper: function registerHelper(name, fn) {
	    if (toString.call(name) === objectType) {
	      if (fn) {
	        throw new _Exception2['default']('Arg not supported with multiple helpers');
	      }
	      Utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _Exception2['default']('Attempting to register a partial as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  }
	};

	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function () {
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} constuct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });

	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });

	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _Exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  instance.registerHelper('if', function (conditional, options) {
	    if (isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });

	  instance.registerHelper('with', function (context, options) {
	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!Utils.isEmpty(context)) {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
	        options = { data: data };
	      }

	      return fn(context, options);
	    } else {
	      return options.inverse(this);
	    }
	  });

	  instance.registerHelper('log', function (message, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, message);
	  });

	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	}

	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 1,

	  // Can be overridden in the host environment
	  log: function log(level, message) {
	    if (typeof console !== 'undefined' && logger.level <= level) {
	      var method = logger.methodMap[level];
	      (console[method] || console.log).call(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports.logger = logger;
	var log = logger.log;

	exports.log = log;

	function createFrame(object) {
	  var frame = Utils.extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	/* [args, ]options */

/***/ },
/* 18 */
/*!***************************************************!*\
  !*** ./~/handlebars/dist/cjs/handlebars/utils.js ***!
  \***************************************************/
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;

	// Older IE versions do not directly support indexOf so we must implement our own, sadly.
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#x27;',
	  '`': '&#x60;'
	};

	var badChars = /[&<>"'`]/g,
	    possible = /[&<>"'`]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/*eslint-disable func-style, no-var */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	/*eslint-enable func-style, no-var */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};exports.isArray = isArray;

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 19 */
/*!*******************************************************!*\
  !*** ./~/handlebars/dist/cjs/handlebars/exception.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 20 */
/*!*********************************************************!*\
  !*** ./~/handlebars/dist/cjs/handlebars/safe-string.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 21 */
/*!*****************************************************!*\
  !*** ./~/handlebars/dist/cjs/handlebars/runtime.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;
	exports.checkRevision = checkRevision;

	// TODO: Remove this line and break up compilePartial

	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _import = __webpack_require__(/*! ./utils */ 18);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(/*! ./exception */ 19);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(/*! ./base */ 17);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
	          compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
	      throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _Exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      return templateSpec[i];
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      depths = options.depths ? [context].concat(options.depths) : [context];
	    }

	    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _Exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _Exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
	  }
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    partial = options.partials[options.name];
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;

	  if (partial === undefined) {
	    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

/***/ },
/* 22 */
/*!*********************************************************!*\
  !*** ./~/handlebars/dist/cjs/handlebars/no-conflict.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;
	/*global window */

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/*!********************************************!*\
  !*** ./plugins/shared/annotate/style.less ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/postcss-loader!./../../../~/autoprefixer-loader?{browsers:['> 1%']}!./../../../~/less-loader!./style.less */ 24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/*!******************************************************************************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/autoprefixer-loader?{browsers:['> 1%']}!./~/less-loader!./plugins/shared/annotate/style.less ***!
  \******************************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 7)();
	exports.push([module.id, ".tota11y-dark-color-scheme {\n  background-color: #333 !important;\n  color: #f2f2f2 !important;\n}\n.tota11y-no-select {\n  -webkit-user-select: none !important;\n     -moz-user-select: none !important;\n      -ms-user-select: none !important;\n          user-select: none !important;\n}\n.tota11y-label {\n  background-color: #ffe800 !important;\n  border: 1px solid rgba(0, 0, 0, 0.1) !important;\n  cursor: default !important;\n  padding: 3px !important;\n  position: absolute !important;\n  z-index: 9997 !important;\n}\n.tota11y-label-error {\n  background-color: #ffaeae !important;\n}\n.tota11y-label-error-icon {\n  display: block !important;\n  float: left !important;\n  margin-right: 3px !important;\n  width: 12px !important;\n}\n.tota11y-label-success {\n  background-color: #b9eda9 !important;\n}\n.tota11y-label-warning {\n  background-color: #ffe800 !important;\n}\n.tota11y-label,\n.tota11y-label-text,\n.tota11y-label-detail,\n.tota11y-label-link,\n.tota11y-label-help {\n  color: #333 !important;\n  font-size: 12px !important;\n}\n.tota11y-label-text {\n  float: left !important;\n}\n.tota11y-label-detail {\n  clear: both !important;\n  display: none !important;\n  max-width: 300px !important;\n}\n.tota11y-label:hover .tota11y-label-detail {\n  display: block !important;\n}\n.tota11y-label-help {\n  float: left !important;\n  margin-left: 5px !important;\n}\n.tota11y-label-link:hover,\n.tota11y-label-link:focus {\n  opacity: 0.6 !important;\n  text-decoration: underline !important;\n}\n.tota11y-highlight {\n  background-color: rgba(120, 130, 200, 0.4) !important;\n  pointer-events: none !important;\n  position: absolute !important;\n  z-index: 9999 !important;\n}\n", ""]);

/***/ },
/* 25 */
/*!****************************************************!*\
  !*** ./plugins/shared/info-panel/error.handlebars ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(/*! ./~/handlebars/runtime.js */ 15);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1, helper;

	  return "<li class=\"tota11y-info-error\">\n    <a aria-label=\"Scroll to error\" href=\"#\" class=\"tota11y-info-error-scroll\">\n        <div class=\"tota11y-info-error-scroll-glyph tota11y-info-error-scroll-lens\"></div>\n        <div class=\"tota11y-info-error-scroll-glyph tota11y-info-error-scroll-handle\"></div>\n    </a>\n    <a href=\"#\" class=\"tota11y-info-error-trigger tota11y-collapsed\">\n        <div class=\"tota11y-info-error-title\">\n            <span class=\"tota11y-info-error-chevron\">\n                &#8250;\n            </span>\n            "
	    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
	    + "\n        </div>\n    </a>\n    <div class=\"tota11y-info-error-description tota11y-collapsed\">\n        <div class=\"tota11y-info-error-description-code-container\">\n            <em>Relevant code:</em>\n            <code></code>\n        </div>\n    </div>\n</li>\n";
	},"useData":true});

/***/ },
/* 26 */
/*!**********************************************!*\
  !*** ./plugins/shared/info-panel/style.less ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/postcss-loader!./../../../~/autoprefixer-loader?{browsers:['> 1%']}!./../../../~/less-loader!./style.less */ 27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/*!********************************************************************************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/autoprefixer-loader?{browsers:['> 1%']}!./~/less-loader!./plugins/shared/info-panel/style.less ***!
  \********************************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 7)();
	exports.push([module.id, ".tota11y-dark-color-scheme {\n  background-color: #333 !important;\n  color: #f2f2f2 !important;\n}\n.tota11y-no-select {\n  -webkit-user-select: none !important;\n     -moz-user-select: none !important;\n      -ms-user-select: none !important;\n          user-select: none !important;\n}\n.tota11y-info {\n  background-color: #333 !important;\n  color: #f2f2f2 !important;\n  -webkit-user-select: none !important;\n     -moz-user-select: none !important;\n      -ms-user-select: none !important;\n          user-select: none !important;\n  border-radius: 5px !important;\n  position: fixed !important;\n  z-index: 9998 !important;\n}\n.tota11y-info-controls {\n  float: right !important;\n}\n.tota11y-info-annotation-toggle {\n  float: left !important;\n  margin-right: 10px !important;\n}\n.tota11y-info-hidden {\n  display: none !important;\n}\n.tota11y-info-dismiss-trigger {\n  font-size: 25px !important;\n  line-height: 25px !important;\n  position: relative !important;\n  top: -2px !important;\n}\n.tota11y-info-title,\n.tota11y-info-body {\n  padding: 10px 10px 0 !important;\n}\n.tota11y-info-title:hover {\n  cursor: move !important;\n}\n.tota11y-info-tabs {\n  display: -webkit-box !important;\n  display: flex !important;\n  margin: 0 !important;\n  padding: 0 0 10px !important;\n}\n.tota11y-info-tab {\n  height: 30px !important;\n  list-style: none !important;\n  position: relative !important;\n  text-align: center !important;\n  width: 100% !important;\n  -webkit-box-flex: 1 !important;\n          flex-grow: 1 !important;\n}\n.tota11y-info-tab-anchor {\n  position: absolute !important;\n  top: 0 !important;\n  right: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  text-align: center !important;\n}\n.tota11y-info-tab-anchor-text {\n  line-height: 30px !important;\n}\n.tota11y-info-tab:hover {\n  background-color: #555 !important;\n}\n.tota11y-info-tab.active,\n.tota11y-info-tab.active:hover {\n  background-color: #f2f2f2 !important;\n}\n.tota11y-info-tab.active .tota11y-info-tab-anchor-text {\n  color: #333 !important;\n}\n.tota11y-info-sections {\n  position: relative !important;\n  height: 270px !important;\n  width: 400px !important;\n}\n.tota11y-info-section {\n  position: absolute !important;\n  top: 0 !important;\n  right: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  background-color: #f2f2f2 !important;\n  display: none !important;\n  overflow-y: scroll !important;\n  padding: 10px !important;\n}\n.tota11y-info-section,\n.tota11y-info-section * {\n  color: #333 !important;\n}\n.tota11y-info-section.active {\n  display: block !important;\n}\n.tota11y-info-errors {\n  margin: 0 !important;\n  padding: 0 !important;\n}\n.tota11y-info-error {\n  list-style: none !important;\n  margin-bottom: 10px !important;\n}\n.tota11y-info-error-trigger {\n  display: block !important;\n}\n.tota11y-info-error-trigger.trigger-highlight {\n  background-color: rgba(120, 130, 200, 0.4) !important;\n}\n.tota11y-info-error-chevron {\n  display: inline-block !important;\n  font-size: 20px !important;\n  height: 14px !important;\n  line-height: 14px !important;\n  margin-right: 3px !important;\n  -webkit-transform: rotateZ(90deg) !important;\n          transform: rotateZ(90deg) !important;\n  -webkit-transform-origin: 3px 8px !important;\n          transform-origin: 3px 8px !important;\n  -webkit-transition: -webkit-transform ease-in-out 50ms !important;\n          transition: transform ease-in-out 50ms !important;\n}\n.tota11y-info-error-trigger.tota11y-collapsed .tota11y-info-error-chevron {\n  -webkit-transform: rotateZ(0deg) !important;\n          transform: rotateZ(0deg) !important;\n}\n.tota11y-info-error-title {\n  font-weight: bold !important;\n}\n.tota11y-info-error-scroll {\n  float: right !important;\n  margin-top: 3px !important;\n  padding-left: 5px !important;\n}\n.tota11y-info-error-scroll-glyph {\n  border-color: #333 !important;\n}\n.tota11y-info-error-scroll:hover .tota11y-info-error-scroll-glyph {\n  border-color: #999 !important;\n}\n.tota11y-info-error-scroll-lens {\n  border: 1px solid !important;\n  border-radius: 50% !important;\n  height: 8px !important;\n  width: 8px !important;\n}\n.tota11y-info-error-scroll-handle {\n  border-left: 1px solid !important;\n  height: 7px !important;\n  -webkit-transform: translateX(-2px) translateY(-2px) rotate(45deg) !important;\n          transform: translateX(-2px) translateY(-2px) rotate(45deg) !important;\n  width: 1px !important;\n}\n.tota11y-info-error-description {\n  font-size: 13px !important;\n  padding: 10px 0 0 !important;\n  -webkit-user-select: text !important;\n     -moz-user-select: text !important;\n      -ms-user-select: text !important;\n          user-select: text !important;\n}\n.tota11y-info-error-description-code-container {\n  margin-top: 10px !important;\n}\n.tota11y-info-error-description-code-container code {\n  display: block !important;\n  margin-top: 10px !important;\n  padding: 5px 10px !important;\n  word-wrap: break-word !important;\n}\n.tota11y-info-error-description.tota11y-collapsed {\n  display: none !important;\n}\n.tota11y-info-error-count {\n  background-color: red !important;\n  border-radius: 20px !important;\n  color: white !important;\n  display: inline !important;\n  margin-left: 5px !important;\n  padding: 1px 8px !important;\n}\n", ""]);

/***/ },
/* 28 */
/*!****************************!*\
  !*** ./plugins/style.less ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(/*! !./../~/css-loader!./../~/postcss-loader!./../~/autoprefixer-loader?{browsers:['> 1%']}!./../~/less-loader!./style.less */ 29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../~/style-loader/addStyles.js */ 8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 29 */
/*!**************************************************************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/autoprefixer-loader?{browsers:['> 1%']}!./~/less-loader!./plugins/style.less ***!
  \**************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 7)();
	exports.push([module.id, ".tota11y-dark-color-scheme {\n  background-color: #333 !important;\n  color: #f2f2f2 !important;\n}\n.tota11y-no-select {\n  -webkit-user-select: none !important;\n     -moz-user-select: none !important;\n      -ms-user-select: none !important;\n          user-select: none !important;\n}\n.tota11y-plugin {\n  -webkit-user-select: none !important;\n     -moz-user-select: none !important;\n      -ms-user-select: none !important;\n          user-select: none !important;\n  border-bottom: 1px solid #555 !important;\n  list-style: none !important;\n}\n.tota11y-plugin-switch {\n  -webkit-box-align: center !important;\n          align-items: center !important;\n  cursor: pointer !important;\n  display: -webkit-box !important;\n  display: flex !important;\n  padding: 12px 12px 12px 0 !important;\n  margin: 0 !important;\n}\n.tota11y-plugin-indicator {\n  margin: 0 15px !important;\n}\n.tota11y-plugin-indicator {\n  border-radius: 16px !important;\n  border: 1px solid #999 !important;\n  color: transparent !important;\n  font-size: 13px !important;\n  height: 16px !important;\n  line-height: 16px !important;\n  padding: 0 0 0 1px !important;\n  width: 16px !important;\n}\n.tota11y-plugin-checkbox:focus + .tota11y-plugin-indicator {\n  border-color: #639b24 !important;\n  background-color: #49721a !important;\n  color: #49721a !important;\n}\n.tota11y-plugin-checkbox:checked + .tota11y-plugin-indicator {\n  background-color: #639b24 !important;\n  border-color: #639b24 !important;\n  color: white !important;\n}\n.tota11y-plugin-title {\n  font-weight: bold !important;\n}\n.tota11y-plugin-description {\n  font-size: 11px !important;\n  font-style: italic !important;\n  width: 200px !important;\n  margin-right: 3px !important;\n}\n.tota11y-plugins-separator {\n  font-size: 12px !important;\n  margin: 7px 15px 0 !important;\n  text-transform: uppercase !important;\n}\n", ""]);

/***/ },
/* 30 */
/*!*********************************!*\
  !*** ./plugins/shared/audit.js ***!
  \*********************************/
/***/ function(module, exports) {

	/**
	 * Abstractions for how we use Accessibility Developer Tools
	 */

	"use strict";

	function allRuleNames() {
	    return axs.AuditRules.getRules().map(function (rule) {
	        return rule.name;
	    });
	}

	// Creates an audit configuration that whitelists a single rule and limits the
	// amount of tests to run
	function createWhitelist(ruleName) {
	    var config = new axs.AuditConfiguration();
	    config.showUnsupportedRulesWarning = false;

	    // Ignore elements that are part of the toolbar
	    config.ignoreSelectors(ruleName, ".tota11y *");

	    allRuleNames().forEach(function (name) {
	        if (name !== ruleName) {
	            config.ignoreSelectors(name, "*");
	        }
	    });

	    return config;
	}

	/*eslint-disable*/
	// Patch collectMatchingElements to match
	// https://github.com/GoogleChrome/accessibility-developer-tools/blob/0062f77258eb4eb8508dad3c92fd2df63c2381fc/src/js/AuditRule.js
	//
	// TODO: Remove once https://github.com/GoogleChrome/accessibility-developer-tools/commit/df400939addf6dbc5f2a9e1d52a6219f356f82d8
	// makes its way to npm
	function patchCollectMatchingElements() {
	    /**
	     * Recursively collect elements which match |matcher| into |collection|,
	     * starting at |node|.
	     * @param {Node} node
	     * @param {function(Element): boolean} matcher
	     * @param {Array.<Element>} collection
	     * @param {ShadowRoot=} opt_shadowRoot The nearest ShadowRoot ancestor, if any.
	     */
	    axs.AuditRule.collectMatchingElements = function (node, matcher, collection, opt_shadowRoot) {
	        if (node.nodeType === Node.ELEMENT_NODE) var element = /** @type {Element} */node;

	        if (element && matcher.call(null, element)) collection.push(element);

	        // Descend into node:
	        // If it has a ShadowRoot, ignore all child elements - these will be picked
	        // up by the <content> or <shadow> elements. Descend straight into the
	        // ShadowRoot.
	        if (element) {
	            // NOTE: grunt qunit DOES NOT support Shadow DOM, so if changing this
	            // code, be sure to run the tests in the browser before committing.
	            var shadowRoot = element.shadowRoot || element.webkitShadowRoot;
	            if (shadowRoot) {
	                axs.AuditRule.collectMatchingElements(shadowRoot, matcher, collection, shadowRoot);
	                return;
	            }
	        }

	        // If it is a <content> element, descend into distributed elements - descend
	        // into distributed elements - these are elements from outside the shadow
	        // root which are rendered inside the shadow DOM.
	        if (element && element.localName == 'content') {
	            var content = /** @type {HTMLContentElement} */element;
	            var distributedNodes = content.getDistributedNodes();
	            for (var i = 0; i < distributedNodes.length; i++) {
	                axs.AuditRule.collectMatchingElements(distributedNodes[i], matcher, collection, opt_shadowRoot);
	            }
	            return;
	        }

	        // If it is a <shadow> element, descend into the olderShadowRoot of the
	        // current ShadowRoot.
	        if (element && element.localName == 'shadow') {
	            var shadow = /** @type {HTMLShadowElement} */element;
	            if (!opt_shadowRoot) {
	                console.warn('ShadowRoot not provided for', element);
	            } else {
	                var distributedNodes = shadow.getDistributedNodes();
	                for (var i = 0; i < distributedNodes.length; i++) {
	                    axs.AuditRule.collectMatchingElements(distributedNodes[i], matcher, collection, opt_shadowRoot);
	                }
	            }
	        }

	        // If it is neither the parent of a ShadowRoot, a <content> element, nor
	        // a <shadow> element recurse normally.
	        var child = node.firstChild;
	        while (child != null) {
	            axs.AuditRule.collectMatchingElements(child, matcher, collection, opt_shadowRoot);
	            child = child.nextSibling;
	        }
	    };
	}
	/*eslint-enable*/

	// Audits for a single rule (by name) and returns the results for only that
	// rule
	function audit(ruleName) {
	    var whitelist = createWhitelist(ruleName);

	    patchCollectMatchingElements();

	    return axs.Audit.run(whitelist).filter(function (result) {
	        return result.rule.name === ruleName;
	    })[0];
	}

	module.exports = audit;

/***/ },
/* 31 */
/*!***********************************!*\
  !*** ./plugins/contrast/index.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A plugin to label different levels of contrast on the page, and highlight
	 * those with poor contrast while suggesting alternatives.
	 */

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var $ = __webpack_require__(/*! jquery */ 4);
	var Plugin = __webpack_require__(/*! ../base */ 11);
	var annotate = __webpack_require__(/*! ../shared/annotate */ 13)("contrast");

	var titleTemplate = __webpack_require__(/*! ./error-title.handlebars */ 32);
	var descriptionTemplate = __webpack_require__(/*! ./error-description.handlebars */ 33);

	__webpack_require__(/*! ./style.less */ 34);

	var ContrastPlugin = (function (_Plugin) {
	    _inherits(ContrastPlugin, _Plugin);

	    function ContrastPlugin() {
	        _classCallCheck(this, ContrastPlugin);

	        _get(Object.getPrototypeOf(ContrastPlugin.prototype), "constructor", this).call(this);
	        // List of original colors for elements with insufficient contrast.
	        // Used to restore original colors in cleanup.
	        this.preservedColors = [];
	    }

	    _createClass(ContrastPlugin, [{
	        key: "getTitle",
	        value: function getTitle() {
	            return "Contrast";
	        }
	    }, {
	        key: "getDescription",
	        value: function getDescription() {
	            return "Labels elements with insufficient contrast";
	        }
	    }, {
	        key: "addError",
	        value: function addError(_ref, el) {
	            var style = _ref.style;
	            var fgColor = _ref.fgColor;
	            var bgColor = _ref.bgColor;
	            var contrastRatio = _ref.contrastRatio;
	            var requiredRatio = _ref.requiredRatio;

	            // Suggest colors at an "AA" level
	            var suggestedColors = axs.color.suggestColors(bgColor, fgColor, { AA: requiredRatio }).AA;

	            var templateData = {
	                fgColorHex: axs.color.colorToString(fgColor),
	                bgColorHex: axs.color.colorToString(bgColor),
	                contrastRatio: contrastRatio,
	                requiredRatio: requiredRatio,
	                suggestedFgColorHex: suggestedColors.fg,
	                suggestedBgColorHex: suggestedColors.bg,
	                suggestedColorsRatio: suggestedColors.contrast
	            };

	            // Add click handler to preview checkbox
	            var $description = $(descriptionTemplate(templateData));
	            var originalFgColor = style.color;
	            var originalBgColor = style.backgroundColor;

	            $description.find(".preview-contrast-fix").click(function (e) {
	                if ($(e.target).prop("checked")) {
	                    // Set suggested colors
	                    $(el).css("color", suggestedColors.fg);
	                    $(el).css("background-color", suggestedColors.bg);
	                } else {
	                    // Set original colors
	                    $(el).css("color", originalFgColor);
	                    $(el).css("background-color", originalBgColor);
	                }
	            });

	            return this.error(titleTemplate(templateData), $description, $(el));
	        }
	    }, {
	        key: "run",
	        value: function run() {
	            var _this = this;

	            // A map of fg/bg color pairs that we have already seen to the error
	            // entry currently present in the info panel
	            var combinations = {};

	            $("*").each(function (i, el) {
	                // Only check elements with a direct text descendant
	                if (!axs.properties.hasDirectTextDescendant(el)) {
	                    return;
	                }

	                // Ignore elements that are part of the tota11y UI
	                if ($(el).parents(".tota11y").length > 0) {
	                    return;
	                }

	                // Ignore invisible elements
	                if (axs.utils.elementIsTransparent(el) || axs.utils.elementHasZeroArea(el)) {
	                    return;
	                }

	                var style = getComputedStyle(el);
	                var bgColor = axs.utils.getBgColor(style, el);
	                var fgColor = axs.utils.getFgColor(style, el, bgColor);
	                var contrastRatio = axs.color.calculateContrastRatio(fgColor, bgColor).toFixed(2);

	                // Calculate required ratio based on size
	                // Using strings to prevent rounding
	                var requiredRatio = axs.utils.isLargeFont(style) ? 3.0 : 4.5;

	                // Build a key for our `combinations` map and report the color
	                // if we have not seen it yet
	                var key = axs.color.colorToString(fgColor) + "/" + axs.color.colorToString(bgColor) + "/" + requiredRatio;

	                if (!axs.utils.isLowContrast(contrastRatio, style)) {
	                    // For acceptable contrast values, we don't show ratios if
	                    // they have been presented already
	                    if (!combinations[key]) {
	                        annotate.label($(el), contrastRatio).addClass("tota11y-label-success");

	                        // Add the key to the combinations map. We don't have an
	                        // error to associate it with, so we'll just give it the
	                        // value of `true`.
	                        combinations[key] = true;
	                    }
	                } else {
	                    if (!combinations[key]) {
	                        // We do not show duplicates in the errors panel, however,
	                        // to keep the output from being overwhelming
	                        var error = _this.addError({
	                            style: style,
	                            fgColor: fgColor,
	                            bgColor: bgColor,
	                            contrastRatio: contrastRatio,
	                            requiredRatio: requiredRatio
	                        }, el);

	                        // Save original color so it can be restored on cleanup.
	                        _this.preservedColors.push({
	                            $el: $(el),
	                            fg: style.color,
	                            bg: style.backgroundColor
	                        });

	                        combinations[key] = error;
	                    }

	                    // We display errors multiple times for emphasis. Each error
	                    // will point back to the entry in the info panel for that
	                    // particular color combination.
	                    //
	                    // TODO: The error entry in the info panel will only highlight
	                    // the first element with that color combination
	                    annotate.errorLabel($(el), contrastRatio, "This contrast is insufficient at this size.", combinations[key]);
	                }
	            });
	        }
	    }, {
	        key: "cleanup",
	        value: function cleanup() {
	            // Set all elements to original color
	            this.preservedColors.forEach(function (entry) {
	                entry.$el.css("color", entry.fg);
	                entry.$el.css("background-color", entry.bg);
	            });

	            annotate.removeAll();
	        }
	    }]);

	    return ContrastPlugin;
	})(Plugin);

	module.exports = ContrastPlugin;

/***/ },
/* 32 */
/*!*************************************************!*\
  !*** ./plugins/contrast/error-title.handlebars ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(/*! ./~/handlebars/runtime.js */ 15);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

	  return "Insufficient contrast ratio ("
	    + alias3(((helper = (helper = helpers.contrastRatio || (depth0 != null ? depth0.contrastRatio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contrastRatio","hash":{},"data":data}) : helper)))
	    + " &lt; "
	    + alias3(((helper = (helper = helpers.requiredRatio || (depth0 != null ? depth0.requiredRatio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"requiredRatio","hash":{},"data":data}) : helper)))
	    + ")\n\n<span class=\"tota11y-swatches\">\n    <span class=\"tota11y-swatch\" style=\"background-color: "
	    + alias3(((helper = (helper = helpers.fgColorHex || (depth0 != null ? depth0.fgColorHex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"fgColorHex","hash":{},"data":data}) : helper)))
	    + " !important\"></span>\n    /\n    <span class=\"tota11y-swatch\" style=\"background-color: "
	    + alias3(((helper = (helper = helpers.bgColorHex || (depth0 != null ? depth0.bgColorHex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"bgColorHex","hash":{},"data":data}) : helper)))
	    + " !important\"></span>\n</span>\n";
	},"useData":true});

/***/ },
/* 33 */
/*!*******************************************************!*\
  !*** ./plugins/contrast/error-description.handlebars ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(/*! ./~/handlebars/runtime.js */ 15);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

	  return "<div>\n    <p>\n        The color combination\n        <span class=\"tota11y-color-hexes\">"
	    + alias3(((helper = (helper = helpers.fgColorHex || (depth0 != null ? depth0.fgColorHex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"fgColorHex","hash":{},"data":data}) : helper)))
	    + "/"
	    + alias3(((helper = (helper = helpers.bgColorHex || (depth0 != null ? depth0.bgColorHex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"bgColorHex","hash":{},"data":data}) : helper)))
	    + "</span>\n        has a contrast ratio of <strong>"
	    + alias3(((helper = (helper = helpers.contrastRatio || (depth0 != null ? depth0.contrastRatio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contrastRatio","hash":{},"data":data}) : helper)))
	    + "</strong>, which is not\n        sufficient. At this size, you will need a ratio of at least\n        <strong>"
	    + alias3(((helper = (helper = helpers.requiredRatio || (depth0 != null ? depth0.requiredRatio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"requiredRatio","hash":{},"data":data}) : helper)))
	    + "</strong>.\n    </p>\n\n    <p>\n        Consider using the following foreground/background combination:\n    </p>\n\n    <div class=\"tota11y-contrast-suggestion\">\n        <span class=\"tota11y-color-hexes\">\n            "
	    + alias3(((helper = (helper = helpers.suggestedFgColorHex || (depth0 != null ? depth0.suggestedFgColorHex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"suggestedFgColorHex","hash":{},"data":data}) : helper)))
	    + "/"
	    + alias3(((helper = (helper = helpers.suggestedBgColorHex || (depth0 != null ? depth0.suggestedBgColorHex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"suggestedBgColorHex","hash":{},"data":data}) : helper)))
	    + "\n        </span>\n\n        <span class=\"tota11y-swatches\">\n            <span\n                class=\"tota11y-swatch\"\n                style=\"background-color: "
	    + alias3(((helper = (helper = helpers.suggestedFgColorHex || (depth0 != null ? depth0.suggestedFgColorHex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"suggestedFgColorHex","hash":{},"data":data}) : helper)))
	    + " !important\">\n            </span>\n            /\n            <span\n                class=\"tota11y-swatch\"\n                style=\"background-color: "
	    + alias3(((helper = (helper = helpers.suggestedBgColorHex || (depth0 != null ? depth0.suggestedBgColorHex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"suggestedBgColorHex","hash":{},"data":data}) : helper)))
	    + " !important\">\n            </span>\n        </span>\n\n        has a ratio of <strong>"
	    + alias3(((helper = (helper = helpers.suggestedColorsRatio || (depth0 != null ? depth0.suggestedColorsRatio : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"suggestedColorsRatio","hash":{},"data":data}) : helper)))
	    + "</strong>\n        <br />\n\n        <label>\n            Preview:\n            <input class=\"preview-contrast-fix\" type=\"checkbox\">\n        </label>\n    </div>\n</div>\n";
	},"useData":true});

/***/ },
/* 34 */
/*!*************************************!*\
  !*** ./plugins/contrast/style.less ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/postcss-loader!./../../~/autoprefixer-loader?{browsers:['> 1%']}!./../../~/less-loader!./style.less */ 35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/*!***********************************************************************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/autoprefixer-loader?{browsers:['> 1%']}!./~/less-loader!./plugins/contrast/style.less ***!
  \***********************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 7)();
	exports.push([module.id, ".tota11y-swatches {\n  margin-left: 5px !important;\n  margin-right: 5px !important;\n  position: relative !important;\n  top: 1px !important;\n}\n.tota11y-swatch {\n  border: 1px solid #000 !important;\n  display: inline-block !important;\n  height: 12px !important;\n  width: 12px !important;\n}\n.tota11y-contrast-suggestion {\n  margin: 0 0 15px 15px !important;\n}\n.tota11y-color-hexes {\n  font-family: monospace !important;\n}\n", ""]);

/***/ },
/* 36 */
/*!***********************************!*\
  !*** ./plugins/headings/index.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(buildElement) {/**
	 * A plugin to identify and validate heading tags (<h1>, <h2>, etc.)
	 */

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var $ = __webpack_require__(/*! jquery */ 4);
	var Plugin = __webpack_require__(/*! ../base */ 11);
	var annotate = __webpack_require__(/*! ../shared/annotate */ 13)("headings");

	var outlineItemTemplate = __webpack_require__(/*! ./outline-item.handlebars */ 37);
	__webpack_require__(/*! ./style.less */ 38);

	var ERRORS = {
	    FIRST_NOT_H1: function FIRST_NOT_H1(level) {
	        return {
	            title: "First heading is not an &lt;h1&gt;",
	            description: "\n                <div>\n                    To give your document a proper structure for assistive\n                    technologies, it is important to lay out your headings\n                    beginning with an <code>&lt;h1&gt;</code>. We found an\n                    <code>&lt;h" + level + "&gt;</code> instead.\n                </div>\n            "
	        };
	    },

	    // This error is currently unused.
	    //
	    // The HTML5 outlining algorithm[1] enables the use of "sectioning roots"
	    // to support multiple <h1> tags when embedded inside of containers like
	    // <section> or <article>. There are currently "no known implementations
	    // of the outline algorithm in graphical browsers or assistive technology
	    // user agents" [2], so we instead simply "use heading rank (h1-h6) to
	    // convey document structure." [2].
	    //
	    // [1]: http://www.w3.org/html/wg/drafts/html/master/semantics.html#outline
	    // [2]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document#The_HTML5_Outline_Algorithm
	    MULTIPLE_H1: {
	        title: "&lt;h1&gt; used when one is already present"
	    },

	    // This error accepts two arguments to display a relevant error message
	    NONCONSECUTIVE_HEADER: function NONCONSECUTIVE_HEADER(prevLevel, currLevel) {
	        var _tag = function _tag(level) {
	            return "<code>&lt;h" + level + "&gt;</code>";
	        };
	        var description = "\n            <div>\n                This document contains an " + _tag(currLevel) + " tag directly\n                following an " + _tag(prevLevel) + ". In order to maintain a consistent\n                outline of the page for assistive technologies, reduce the gap in\n                the heading level by upgrading this tag to an\n                " + _tag(prevLevel + 1);

	        // Suggest upgrading the tag to the same level as `prevLevel` iff
	        // `prevLevel` is not 1
	        if (prevLevel !== 1) {
	            description += " or " + _tag(prevLevel);
	        }

	        description += ".</div>";

	        return {
	            title: "\n                Nonconsecutive heading level used (h" + prevLevel + " &rarr;\n                h" + currLevel + ")\n            ",
	            description: description
	        };
	    }
	};

	var HeadingsPlugin = (function (_Plugin) {
	    _inherits(HeadingsPlugin, _Plugin);

	    function HeadingsPlugin() {
	        _classCallCheck(this, HeadingsPlugin);

	        _get(Object.getPrototypeOf(HeadingsPlugin.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(HeadingsPlugin, [{
	        key: "getTitle",
	        value: function getTitle() {
	            return "Headings";
	        }
	    }, {
	        key: "getDescription",
	        value: function getDescription() {
	            return "\n            Highlights headings (&lt;h1&gt;, &lt;h2&gt;, etc) and\n            order violations\n        ";
	        }

	        /**
	         * Computes an outline of the page and reports any violations.
	         */
	    }, {
	        key: "outline",
	        value: function outline($headings) {
	            var _this = this;

	            var $items = [];

	            var prevLevel = undefined;
	            $headings.each(function (i, el) {
	                var $el = $(el);
	                var level = +$el.prop("tagName").slice(1);
	                var error = undefined;

	                // Check for any violations
	                // NOTE: These violations do not overlap, but as we add more, we
	                // may want to separate the conditionals here to report multiple
	                // errors on the same tag.
	                if (i === 0 && level !== 1) {
	                    error = ERRORS.FIRST_NOT_H1(level); // eslint-disable-line new-cap
	                } else if (prevLevel && level - prevLevel > 1) {
	                        error = ERRORS.NONCONSECUTIVE_HEADER(prevLevel, level); // eslint-disable-line new-cap
	                    }

	                prevLevel = level;

	                // Render the entry in the outline for the "Summary" tab
	                var $item = $(outlineItemTemplate({
	                    level: level,
	                    text: $el.text()
	                }));

	                $items.push($item);

	                // Highlight the heading element on hover
	                annotate.toggleHighlight($el, $item);

	                if (error) {
	                    // Register an error to the info panel
	                    var infoPanelError = _this.error(error.title, $(error.description), $el);

	                    // Place an error label on the heading tag
	                    annotate.errorLabel($el, $el.prop("tagName").toLowerCase(), error.title, infoPanelError);

	                    // Mark the summary item as red
	                    // Pretty hacky, since we're borrowing label styles for this
	                    // summary tab
	                    $item.find(".tota11y-heading-outline-level").addClass("tota11y-label-error");
	                } else {
	                    // Label the heading tag
	                    annotate.label($el).addClass("tota11y-label-success");

	                    // Mark the summary item as green
	                    $item.find(".tota11y-heading-outline-level").addClass("tota11y-label-success");
	                }
	            });

	            return $items;
	        }
	    }, {
	        key: "run",
	        value: function run() {
	            var $headings = $("h1, h2, h3, h4, h5, h6");
	            // `this.outline` has the side-effect of also reporting violations
	            var $items = this.outline($headings);

	            if ($items.length) {
	                var $outline = buildElement(
	                    "div",
	                    { className: "tota11y-heading-outline" },
	                    $items
	                );

	                this.summary($outline);
	            }
	        }
	    }, {
	        key: "cleanup",
	        value: function cleanup() {
	            annotate.removeAll();
	        }
	    }]);

	    return HeadingsPlugin;
	})(Plugin);

	module.exports = HeadingsPlugin;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./utils/element */ 3)))

/***/ },
/* 37 */
/*!**************************************************!*\
  !*** ./plugins/headings/outline-item.handlebars ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(/*! ./~/handlebars/runtime.js */ 15);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

	  return "<div class=\"tota11y-heading-outline-entry heading-level-"
	    + alias3(((helper = (helper = helpers.level || (depth0 != null ? depth0.level : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"level","hash":{},"data":data}) : helper)))
	    + "\">\n    <span class=\"tota11y-heading-outline-level tota11y-label\">"
	    + alias3(((helper = (helper = helpers.level || (depth0 != null ? depth0.level : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"level","hash":{},"data":data}) : helper)))
	    + "</span>\n    <span class=\"tota11y-heading-outline-heading-text\">"
	    + alias3(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper)))
	    + "</span>\n</div>\n";
	},"useData":true});

/***/ },
/* 38 */
/*!*************************************!*\
  !*** ./plugins/headings/style.less ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/postcss-loader!./../../~/autoprefixer-loader?{browsers:['> 1%']}!./../../~/less-loader!./style.less */ 39);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 39 */
/*!***********************************************************************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/autoprefixer-loader?{browsers:['> 1%']}!./~/less-loader!./plugins/headings/style.less ***!
  \***********************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 7)();
	exports.push([module.id, ".tota11y-dark-color-scheme {\n  background-color: #333 !important;\n  color: #f2f2f2 !important;\n}\n.tota11y-no-select {\n  -webkit-user-select: none !important;\n     -moz-user-select: none !important;\n      -ms-user-select: none !important;\n          user-select: none !important;\n}\n.tota11y-heading-outline {\n  color: #333 !important;\n}\n.tota11y-heading-outline-entry {\n  margin-bottom: 8px !important;\n}\n.tota11y-heading-outline-entry.heading-level-1 {\n  margin-left: 0 !important;\n}\n.tota11y-heading-outline-entry.heading-level-2 {\n  margin-left: 20px !important;\n}\n.tota11y-heading-outline-entry.heading-level-3 {\n  margin-left: 40px !important;\n}\n.tota11y-heading-outline-entry.heading-level-4 {\n  margin-left: 60px !important;\n}\n.tota11y-heading-outline-entry.heading-level-5 {\n  margin-left: 80px !important;\n}\n.tota11y-heading-outline-entry.heading-level-6 {\n  margin-left: 100px !important;\n}\n.tota11y-heading-outline-level {\n  position: relative !important;\n  top: -2px !important;\n  right: auto !important;\n  bottom: auto !important;\n  left: auto !important;\n  margin-right: 5px !important;\n  padding: 2px 3px !important;\n  pointer-events: none !important;\n}\n", ""]);

/***/ },
/* 40 */
/*!*********************************!*\
  !*** ./plugins/labels/index.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A plugin to identify unlabeled inputs
	 */

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var $ = __webpack_require__(/*! jquery */ 4);
	var Plugin = __webpack_require__(/*! ../base */ 11);
	var annotate = __webpack_require__(/*! ../shared/annotate */ 13)("labels");
	var audit = __webpack_require__(/*! ../shared/audit */ 30);

	var errorTemplate = __webpack_require__(/*! ./error-template.handlebars */ 41);

	var LabelsPlugin = (function (_Plugin) {
	    _inherits(LabelsPlugin, _Plugin);

	    function LabelsPlugin() {
	        _classCallCheck(this, LabelsPlugin);

	        _get(Object.getPrototypeOf(LabelsPlugin.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(LabelsPlugin, [{
	        key: "getTitle",
	        value: function getTitle() {
	            return "Labels";
	        }
	    }, {
	        key: "getDescription",
	        value: function getDescription() {
	            return "Identifies inputs with missing labels";
	        }
	    }, {
	        key: "errorMessage",
	        value: function errorMessage($el) {
	            return errorTemplate({
	                placeholder: $el.attr("placeholder"),
	                id: $el.attr("id"),
	                tagName: $el.prop("tagName").toLowerCase()
	            });
	        }
	    }, {
	        key: "run",
	        value: function run() {
	            var _this = this;

	            var _audit = audit("controlsWithoutLabel");

	            var result = _audit.result;
	            var elements = _audit.elements;

	            if (result === "FAIL") {
	                elements.forEach(function (element) {
	                    var $el = $(element);
	                    var title = "Input is missing a label";

	                    // Place an error label on the element and register it as an
	                    // error in the info panel
	                    var entry = _this.error(title, $(_this.errorMessage($el)), $el);
	                    annotate.errorLabel($el, "", title, entry);
	                });
	            }
	        }
	    }, {
	        key: "cleanup",
	        value: function cleanup() {
	            annotate.removeAll();
	        }
	    }]);

	    return LabelsPlugin;
	})(Plugin);

	module.exports = LabelsPlugin;

/***/ },
/* 41 */
/*!**************************************************!*\
  !*** ./plugins/labels/error-template.handlebars ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(/*! ./~/handlebars/runtime.js */ 15);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    return "    <p>\n        The <code>placeholder</code> attribute is not guaranteed to be read by\n        assistive technologies. It is better to include a proper label.\n    </p>\n";
	},"3":function(depth0,helpers,partials,data) {
	    var helper;

	  return "    <p>\n        The simplest way to do so is by creating a <code>&lt;label&gt;</code>\n        tag with a <code>for</code> attribute like so:\n    </p>\n\n    <pre><code>&lt;label for=\""
	    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
	    + "\"&gt;\n    Label text here...\n&lt;/label&gt;</code></pre>\n";
	},"5":function(depth0,helpers,partials,data) {
	    var helper;

	  return "    <p>\n        You can give this element an <code>id</code> attribute and build a\n        <code>&lt;label&gt;</code> with a corresponding <code>for</code>\n        attribute like so:\n\n        <pre><code>&lt;label for=\"my-input\"&gt;\n    Label text here...\n&lt;/label&gt;\n&lt;"
	    + this.escapeExpression(((helper = (helper = helpers.tagName || (depth0 != null ? depth0.tagName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"tagName","hash":{},"data":data}) : helper)))
	    + " id=\"my-input\"&gt;</code></pre>\n    </p>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.placeholder : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "");
	},"useData":true});

/***/ },
/* 42 */
/*!************************************!*\
  !*** ./plugins/landmarks/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A plugin to label all ARIA landmark roles
	 */

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var $ = __webpack_require__(/*! jquery */ 4);
	var Plugin = __webpack_require__(/*! ../base */ 11);
	var annotate = __webpack_require__(/*! ../shared/annotate */ 13)("landmarks");

	var LandmarksPlugin = (function (_Plugin) {
	    _inherits(LandmarksPlugin, _Plugin);

	    function LandmarksPlugin() {
	        _classCallCheck(this, LandmarksPlugin);

	        _get(Object.getPrototypeOf(LandmarksPlugin.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(LandmarksPlugin, [{
	        key: "getTitle",
	        value: function getTitle() {
	            return "Landmarks";
	        }
	    }, {
	        key: "getDescription",
	        value: function getDescription() {
	            return "Labels all ARIA landmarks";
	        }
	    }, {
	        key: "run",
	        value: function run() {
	            $("[role]:not(.tota11y-toolbar,.tota11y-plugin)").each(function () {
	                annotate.label($(this), $(this).attr("role"));
	            });
	        }
	    }, {
	        key: "cleanup",
	        value: function cleanup() {
	            annotate.removeAll();
	        }
	    }]);

	    return LandmarksPlugin;
	})(Plugin);

	module.exports = LandmarksPlugin;

/***/ },
/* 43 */
/*!************************************!*\
  !*** ./plugins/link-text/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(buildElement) {/**
	 * A plugin to identify unclear link text such as "more" and "click here,"
	 * which can make for a bad experience when using a screen reader
	 */

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var $ = __webpack_require__(/*! jquery */ 4);
	var Plugin = __webpack_require__(/*! ../base */ 11);
	var annotate = __webpack_require__(/*! ../shared/annotate */ 13)("link-text");

	var LinkTextPlugin = (function (_Plugin) {
	    _inherits(LinkTextPlugin, _Plugin);

	    function LinkTextPlugin() {
	        _classCallCheck(this, LinkTextPlugin);

	        _get(Object.getPrototypeOf(LinkTextPlugin.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(LinkTextPlugin, [{
	        key: "getTitle",
	        value: function getTitle() {
	            return "Link text";
	        }
	    }, {
	        key: "getDescription",
	        value: function getDescription() {
	            return "\n            Identifies links that may be confusing when read by a screen\n            reader\n        ";
	        }

	        /**
	         * Slightly modified unclear text checking that has been refactored into
	         * a single method to be called with arbitrary strings.
	         *
	         * Original: https://github.com/GoogleChrome/accessibility-developer-tools/blob/9183b21cb0a02f5f04928f5cb7cb339b6bbc9ff8/src/audits/LinkWithUnclearPurpose.js#L55-67
	         */
	    }, {
	        key: "isDescriptiveText",
	        value: function isDescriptiveText(textContent) {
	            // Handle when the text is undefined or null
	            if (typeof textContent === "undefined" || textContent === null) {
	                return false;
	            }

	            var stopWords = ["click", "tap", "go", "here", "learn", "more", "this", "page", "link", "about"];
	            // Generate a regex to match each of the stopWords
	            var stopWordsRE = new RegExp("\\b(" + stopWords.join("|") + ")\\b", "ig");

	            textContent = textContent
	            // Strip leading non-alphabetical characters
	            .replace(/[^a-zA-Z ]/g, "")
	            // Remove the stopWords
	            .replace(stopWordsRE, "");

	            // Return whether or not there is any text left
	            return textContent.trim() !== "";
	        }
	    }, {
	        key: "reportError",
	        value: function reportError($el, $description, content) {
	            var entry = this.error("Link text is unclear", $description, $el);
	            annotate.errorLabel($el, "", "Link text \"" + content + "\" is unclear", entry);
	        }

	        /**
	         * We can call linkWithUnclearPurpose from ADT directly once the following
	         * issue has been resolved. There is some extra code here until then.
	         * https://github.com/GoogleChrome/accessibility-developer-tools/issues/156
	         */
	    }, {
	        key: "run",
	        value: function run() {
	            var _this = this;

	            $("a").each(function (i, el) {
	                var $el = $(el);

	                // Ignore the tota11y UI
	                if ($el.parents(".tota11y").length) {
	                    return;
	                }

	                // Ignore hidden links
	                if (axs.utils.isElementOrAncestorHidden(el)) {
	                    return;
	                }

	                // Extract the text alternatives for this element: including
	                // its text content, aria-label/labelledby, and alt text for
	                // images.
	                //
	                // TODO: Read from `alts` to determine where the text is coming
	                // from (for tailored error messages)
	                var alts = {};
	                var extractedText = axs.properties.findTextAlternatives(el, alts);

	                if (!_this.isDescriptiveText(extractedText)) {
	                    var $description = buildElement(
	                        "div",
	                        null,
	                        "The text",
	                        " ",
	                        buildElement(
	                            "i",
	                            null,
	                            "\"",
	                            extractedText,
	                            "\""
	                        ),
	                        " ",
	                        "is unclear without context and may be confusing to screen readers. Consider rearranging the",
	                        " ",
	                        buildElement(
	                            "code",
	                            null,
	                            "&lt;a&gt;&lt;/a&gt;"
	                        ),
	                        " ",
	                        "tags or including special screen reader text."
	                    );

	                    _this.reportError($el, $description, extractedText);
	                }
	            });
	        }
	    }, {
	        key: "cleanup",
	        value: function cleanup() {
	            annotate.removeAll();
	        }
	    }]);

	    return LinkTextPlugin;
	})(Plugin);

	module.exports = LinkTextPlugin;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./utils/element */ 3)))

/***/ },
/* 44 */
/*!*****************************************!*\
  !*** ./plugins/a11y-text-wand/index.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(buildElement) {/**
	 * Allows users to see what screen readers would see.
	 */

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var $ = __webpack_require__(/*! jquery */ 4);
	var Plugin = __webpack_require__(/*! ../base */ 11);

	__webpack_require__(/*! ./style.less */ 45);

	var A11yTextWand = (function (_Plugin) {
	    _inherits(A11yTextWand, _Plugin);

	    function A11yTextWand() {
	        _classCallCheck(this, A11yTextWand);

	        _get(Object.getPrototypeOf(A11yTextWand.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(A11yTextWand, [{
	        key: "getTitle",
	        value: function getTitle() {
	            return "Screen Reader Wand";
	        }
	    }, {
	        key: "getDescription",
	        value: function getDescription() {
	            return "Hover over elements to view them as a screen reader would";
	        }
	    }, {
	        key: "run",
	        value: function run() {
	            // HACK(jordan): We provide a fake summary to force the info panel to
	            //     render.
	            this.summary(" ");
	            this.panel.render();

	            $(document).on("mousemove.wand", function (e) {
	                var element = document.elementFromPoint(e.clientX, e.clientY);

	                var textAlternative = axs.properties.findTextAlternatives(element, {});

	                $(".tota11y-outlined").removeClass("tota11y-outlined");
	                $(element).addClass("tota11y-outlined");

	                if (!textAlternative) {
	                    $(".tota11y-info-section.active").html(buildElement(
	                        "i",
	                        { className: "tota11y-nothingness" },
	                        "No text visible to a screen reader"
	                    ));
	                } else {
	                    $(".tota11y-info-section.active").text(textAlternative);
	                }
	            });
	        }
	    }, {
	        key: "cleanup",
	        value: function cleanup() {
	            $(".tota11y-outlined").removeClass("tota11y-outlined");
	            $(document).off("mousemove.wand");
	        }
	    }]);

	    return A11yTextWand;
	})(Plugin);

	module.exports = A11yTextWand;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./utils/element */ 3)))

/***/ },
/* 45 */
/*!*******************************************!*\
  !*** ./plugins/a11y-text-wand/style.less ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/postcss-loader!./../../~/autoprefixer-loader?{browsers:['> 1%']}!./../../~/less-loader!./style.less */ 46);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../node_modules/less-loader/index.js!./style.less", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/autoprefixer-loader/index.js?{browsers:['> 1%']}!./../../node_modules/less-loader/index.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 46 */
/*!*****************************************************************************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/autoprefixer-loader?{browsers:['> 1%']}!./~/less-loader!./plugins/a11y-text-wand/style.less ***!
  \*****************************************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 7)();
	exports.push([module.id, ".tota11y-dark-color-scheme {\n  background-color: #333 !important;\n  color: #f2f2f2 !important;\n}\n.tota11y-no-select {\n  -webkit-user-select: none !important;\n     -moz-user-select: none !important;\n      -ms-user-select: none !important;\n          user-select: none !important;\n}\n.tota11y-outlined {\n  outline: 2px solid #7882c8 !important;\n}\n.tota11y-nothingness {\n  color: #888 !important;\n}\n", ""]);

/***/ },
/* 47 */
/*!***********************************!*\
  !*** ./templates/logo.handlebars ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(/*! ./~/handlebars/runtime.js */ 15);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    return "<!--\n    \"Glasses\" icon by Kyle Scott\n    https://thenounproject.com/Kyle/\n\n    Licensed under Creative Commons by 3.0 US\n    http://creativecommons.org/licenses/by/3.0/us/legalcode\n-->\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\">\n    <path fill=\"#ffffff\" d=\"M74.466,35.24c-1.069-0.19-2.208-0.267-3.228-0.562c-0.639-0.184-1.348-0.622-1.965-1.075  c-1.246-0.919-2.479-1.557-3.928-2.152c-0.671-0.276-1.617-0.698-2.432-0.608c-0.582,0.064-1.196,0.664-1.73,1.029  c-1.196,0.818-2.186,1.442-3.32,2.198c-0.524,0.35-1.308,0.798-1.543,1.263c-0.142,0.279-0.13,0.736-0.281,1.029  c-0.35,0.679-1.069,1.434-1.777,1.403c-0.835-0.038-1.773-1.518-1.449-2.619c0.177-0.602,1.126-0.902,1.776-1.262  c2.041-1.134,3.803-2.3,5.52-3.602c1.106-0.841,2.579-1.471,4.536-1.542c1.889-0.071,4.45-0.083,6.22,0  c1.465,0.066,2.698,0.164,3.976,0.42c7.308,1.469,14.698,2.788,21.607,4.77c0.739,0.213,2.896,0.613,3.086,1.311  c0.121,0.439-0.236,1.435-0.375,2.151c-0.165,0.865-0.292,1.626-0.42,2.246c-0.12,0.574-0.65,1.174-0.936,1.776  c-0.842,1.778-1.379,3.821-2.104,5.753c-0.954,2.545-2.02,4.859-3.554,6.968c-1.46,2.005-3.442,3.33-5.987,4.536  c-1.128,0.534-2.43,1.083-3.835,1.403c-1.355,0.311-3.263,0.63-4.817,0.28c-2.233-0.501-3.081-2.543-3.882-4.536  c-0.848-2.115-1.351-4.049-1.636-6.827c-2.692,0.176-3.259,2.014-4.163,3.928c-0.384,0.812-0.792,1.623-1.168,2.385  c-1.542,3.115-3.197,6.47-5.473,8.746c-1.215,1.213-2.581,2.03-4.35,2.758c-3.331,1.373-6.847,2.569-10.757,3.462  c-3.598,0.821-8.923,1.642-12.252-0.093c-2.136-1.113-3.105-3.939-4.023-6.268c-0.458-1.159-0.835-2.459-1.262-3.882  c-0.378-1.259-0.708-2.778-1.543-3.602c-1.053-1.037-2.78-1.414-3.227-2.993c-0.815-0.307-1.563-0.821-2.292-1.308  c-4.349-2.915-8.693-5.774-13.141-8.606c-0.727-0.462-1.667-0.958-2.151-1.497c-0.712-0.792-1.108-2.117-1.684-3.133  c-0.265-0.469-0.588-0.92-0.888-1.357c-0.275-0.4-0.536-0.997-1.076-1.076C2.223,36.823,2.365,37.469,2.349,38  c-0.017,0.549-0.077,1.172-0.047,1.823c0.028,0.606,0.297,1.049,0.28,1.544c-0.018,0.515-0.291,1.036-0.841,1.029  c-0.727-0.009-0.8-0.98-0.983-1.686c-0.209-0.807-0.483-1.551-0.421-2.245c0.049-0.531,0.341-1.223,0.468-2.057  c0.246-1.599,0.126-3.078,1.451-3.415C3.004,32.804,4,33.38,4.781,33.649c0.789,0.272,1.597,0.428,2.339,0.702  c0.854,0.316,1.706,0.875,2.524,1.355c2.526,1.484,4.626,3.112,7.062,4.63c3.273,2.041,6.545,3.955,9.307,6.267  c7.434-2.179,16.722-3.566,25.863-4.302c4.176-0.337,8.326-0.174,12.253,0.374c5.624,0.787,10.073-1.58,13.844-3.18  c2.035-0.864,4.078-1.653,6.173-2.573C80.804,36.331,77.705,35.814,74.466,35.24z M93.968,39.729  c-1.838-0.388-3.732-0.737-5.471-1.075c-0.059-0.012-0.127-0.067-0.188-0.046c-1.143,0.392-2.279,0.613-3.367,1.029  c-2.033,0.773-4.015,1.775-5.752,3.039C78.33,43.3,77.372,44,76.897,44.733c-1.609,2.489-1.206,7.214-0.467,10.149  c0.27,1.071,0.411,1.79,0.889,2.666c3.022,1.287,6.88-0.183,8.885-1.684c1.526-1.142,2.676-2.75,3.602-4.35  C91.815,48.042,93.102,43.946,93.968,39.729z M64.878,46.089c-6.121-1.937-14.865-0.822-21.232,0.467  c-4.477,0.907-9.474,1.92-10.944,5.753c-0.801,2.086-1.009,5.098-0.701,7.903c0.284,2.599,1.076,4.892,2.011,6.594  c2.943,2.698,10.038,1.581,14.124,0.375c2.523-0.745,4.112-1.389,5.845-2.197c1.973-0.921,4.636-1.939,5.285-4.116  c0.179-0.597,0.115-1.244,0.188-1.824c0.492-3.909,1.942-7.447,4.303-9.634c0.477-0.441,1.146-0.679,1.357-1.262  C65.37,47.428,65.13,46.709,64.878,46.089z\"/>\n</svg>\n";
	},"useData":true});

/***/ },
/* 48 */
/*!**********************************************************************************!*\
  !*** ./~/script-loader!./~/accessibility-developer-tools/dist/js/axs_testing.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! !./~/script-loader/addScript.js */ 49)(__webpack_require__(/*! !./~/raw-loader!./~/accessibility-developer-tools/dist/js/axs_testing.js */ 50)+"\n\n// SCRIPT-LOADER FOOTER\n//# sourceURL=script:///Users/jordanscales/khan/tota11y/node_modules/accessibility-developer-tools/dist/js/axs_testing.js")

/***/ },
/* 49 */
/*!**************************************!*\
  !*** ./~/script-loader/addScript.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript === "function")
			execScript(src);
		else
			eval.call(null, src);
	}

/***/ },
/* 50 */
/*!*******************************************************************************!*\
  !*** ./~/raw-loader!./~/accessibility-developer-tools/dist/js/axs_testing.js ***!
  \*******************************************************************************/
/***/ function(module, exports) {

	module.exports = "/*\n * Copyright 2015 Google Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n *\n * Generated from http://github.com/GoogleChrome/accessibility-developer-tools/tree/952a710bc74ae546473b239e32b76cb3946c6fad\n *\n * See project README for build steps.\n */\n\n// AUTO-GENERATED CONTENT BELOW: DO NOT EDIT! See above for details.\n\nvar fn = (function() {\n  var COMPILED = !0, goog = goog || {};\ngoog.global = this;\ngoog.isDef = function(a) {\n  return void 0 !== a;\n};\ngoog.exportPath_ = function(a, b, c) {\n  a = a.split(\".\");\n  c = c || goog.global;\n  a[0] in c || !c.execScript || c.execScript(\"var \" + a[0]);\n  for (var d;a.length && (d = a.shift());) {\n    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {};\n  }\n};\ngoog.define = function(a, b) {\n  var c = b;\n  COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));\n  goog.exportPath_(a, c);\n};\ngoog.DEBUG = !0;\ngoog.LOCALE = \"en\";\ngoog.TRUSTED_SITE = !0;\ngoog.STRICT_MODE_COMPATIBLE = !1;\ngoog.provide = function(a) {\n  if (!COMPILED) {\n    if (goog.isProvided_(a)) {\n      throw Error('Namespace \"' + a + '\" already declared.');\n    }\n    delete goog.implicitNamespaces_[a];\n    for (var b = a;(b = b.substring(0, b.lastIndexOf(\".\"))) && !goog.getObjectByName(b);) {\n      goog.implicitNamespaces_[b] = !0;\n    }\n  }\n  goog.exportPath_(a);\n};\ngoog.setTestOnly = function(a) {\n  if (COMPILED && !goog.DEBUG) {\n    throw a = a || \"\", Error(\"Importing test-only code into non-debug environment\" + a ? \": \" + a : \".\");\n  }\n};\ngoog.forwardDeclare = function(a) {\n};\nCOMPILED || (goog.isProvided_ = function(a) {\n  return !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a));\n}, goog.implicitNamespaces_ = {});\ngoog.getObjectByName = function(a, b) {\n  for (var c = a.split(\".\"), d = b || goog.global, e;e = c.shift();) {\n    if (goog.isDefAndNotNull(d[e])) {\n      d = d[e];\n    } else {\n      return null;\n    }\n  }\n  return d;\n};\ngoog.globalize = function(a, b) {\n  var c = b || goog.global, d;\n  for (d in a) {\n    c[d] = a[d];\n  }\n};\ngoog.addDependency = function(a, b, c) {\n  if (goog.DEPENDENCIES_ENABLED) {\n    var d;\n    a = a.replace(/\\\\/g, \"/\");\n    for (var e = goog.dependencies_, f = 0;d = b[f];f++) {\n      e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = !0;\n    }\n    for (d = 0;b = c[d];d++) {\n      a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0;\n    }\n  }\n};\ngoog.ENABLE_DEBUG_LOADER = !0;\ngoog.require = function(a) {\n  if (!COMPILED && !goog.isProvided_(a)) {\n    if (goog.ENABLE_DEBUG_LOADER) {\n      var b = goog.getPathFromDeps_(a);\n      if (b) {\n        goog.included_[b] = !0;\n        goog.writeScripts_();\n        return;\n      }\n    }\n    a = \"goog.require could not find: \" + a;\n    goog.global.console && goog.global.console.error(a);\n    throw Error(a);\n  }\n};\ngoog.basePath = \"\";\ngoog.nullFunction = function() {\n};\ngoog.identityFunction = function(a, b) {\n  return a;\n};\ngoog.abstractMethod = function() {\n  throw Error(\"unimplemented abstract method\");\n};\ngoog.addSingletonGetter = function(a) {\n  a.getInstance = function() {\n    if (a.instance_) {\n      return a.instance_;\n    }\n    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);\n    return a.instance_ = new a;\n  };\n};\ngoog.instantiatedSingletons_ = [];\ngoog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;\ngoog.DEPENDENCIES_ENABLED && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {\n  var a = goog.global.document;\n  return \"undefined\" != typeof a && \"write\" in a;\n}, goog.findBasePath_ = function() {\n  if (goog.global.CLOSURE_BASE_PATH) {\n    goog.basePath = goog.global.CLOSURE_BASE_PATH;\n  } else {\n    if (goog.inHtmlDocument_()) {\n      for (var a = goog.global.document.getElementsByTagName(\"script\"), b = a.length - 1;0 <= b;--b) {\n        var c = a[b].src, d = c.lastIndexOf(\"?\"), d = -1 == d ? c.length : d;\n        if (\"base.js\" == c.substr(d - 7, 7)) {\n          goog.basePath = c.substr(0, d - 7);\n          break;\n        }\n      }\n    }\n  }\n}, goog.importScript_ = function(a) {\n  var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;\n  !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0);\n}, goog.writeScriptTag_ = function(a) {\n  if (goog.inHtmlDocument_()) {\n    var b = goog.global.document;\n    if (\"complete\" == b.readyState) {\n      if (/\\bdeps.js$/.test(a)) {\n        return !1;\n      }\n      throw Error('Cannot write \"' + a + '\" after document load');\n    }\n    b.write('<script type=\"text/javascript\" src=\"' + a + '\">\\x3c/script>');\n    return !0;\n  }\n  return !1;\n}, goog.writeScripts_ = function() {\n  function a(e) {\n    if (!(e in d.written)) {\n      if (!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) {\n        for (var g in d.requires[e]) {\n          if (!goog.isProvided_(g)) {\n            if (g in d.nameToPath) {\n              a(d.nameToPath[g]);\n            } else {\n              throw Error(\"Undefined nameToPath for \" + g);\n            }\n          }\n        }\n      }\n      e in c || (c[e] = !0, b.push(e));\n    }\n  }\n  var b = [], c = {}, d = goog.dependencies_, e;\n  for (e in goog.included_) {\n    d.written[e] || a(e);\n  }\n  for (e = 0;e < b.length;e++) {\n    if (b[e]) {\n      goog.importScript_(goog.basePath + b[e]);\n    } else {\n      throw Error(\"Undefined script input\");\n    }\n  }\n}, goog.getPathFromDeps_ = function(a) {\n  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null;\n}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + \"deps.js\"));\ngoog.typeOf = function(a) {\n  var b = typeof a;\n  if (\"object\" == b) {\n    if (a) {\n      if (a instanceof Array) {\n        return \"array\";\n      }\n      if (a instanceof Object) {\n        return b;\n      }\n      var c = Object.prototype.toString.call(a);\n      if (\"[object Window]\" == c) {\n        return \"object\";\n      }\n      if (\"[object Array]\" == c || \"number\" == typeof a.length && \"undefined\" != typeof a.splice && \"undefined\" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable(\"splice\")) {\n        return \"array\";\n      }\n      if (\"[object Function]\" == c || \"undefined\" != typeof a.call && \"undefined\" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable(\"call\")) {\n        return \"function\";\n      }\n    } else {\n      return \"null\";\n    }\n  } else {\n    if (\"function\" == b && \"undefined\" == typeof a.call) {\n      return \"object\";\n    }\n  }\n  return b;\n};\ngoog.isNull = function(a) {\n  return null === a;\n};\ngoog.isDefAndNotNull = function(a) {\n  return null != a;\n};\ngoog.isArray = function(a) {\n  return \"array\" == goog.typeOf(a);\n};\ngoog.isArrayLike = function(a) {\n  var b = goog.typeOf(a);\n  return \"array\" == b || \"object\" == b && \"number\" == typeof a.length;\n};\ngoog.isDateLike = function(a) {\n  return goog.isObject(a) && \"function\" == typeof a.getFullYear;\n};\ngoog.isString = function(a) {\n  return \"string\" == typeof a;\n};\ngoog.isBoolean = function(a) {\n  return \"boolean\" == typeof a;\n};\ngoog.isNumber = function(a) {\n  return \"number\" == typeof a;\n};\ngoog.isFunction = function(a) {\n  return \"function\" == goog.typeOf(a);\n};\ngoog.isObject = function(a) {\n  var b = typeof a;\n  return \"object\" == b && null != a || \"function\" == b;\n};\ngoog.getUid = function(a) {\n  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);\n};\ngoog.hasUid = function(a) {\n  return !!a[goog.UID_PROPERTY_];\n};\ngoog.removeUid = function(a) {\n  \"removeAttribute\" in a && a.removeAttribute(goog.UID_PROPERTY_);\n  try {\n    delete a[goog.UID_PROPERTY_];\n  } catch (b) {\n  }\n};\ngoog.UID_PROPERTY_ = \"closure_uid_\" + (1E9 * Math.random() >>> 0);\ngoog.uidCounter_ = 0;\ngoog.getHashCode = goog.getUid;\ngoog.removeHashCode = goog.removeUid;\ngoog.cloneObject = function(a) {\n  var b = goog.typeOf(a);\n  if (\"object\" == b || \"array\" == b) {\n    if (a.clone) {\n      return a.clone();\n    }\n    var b = \"array\" == b ? [] : {}, c;\n    for (c in a) {\n      b[c] = goog.cloneObject(a[c]);\n    }\n    return b;\n  }\n  return a;\n};\ngoog.bindNative_ = function(a, b, c) {\n  return a.call.apply(a.bind, arguments);\n};\ngoog.bindJs_ = function(a, b, c) {\n  if (!a) {\n    throw Error();\n  }\n  if (2 < arguments.length) {\n    var d = Array.prototype.slice.call(arguments, 2);\n    return function() {\n      var c = Array.prototype.slice.call(arguments);\n      Array.prototype.unshift.apply(c, d);\n      return a.apply(b, c);\n    };\n  }\n  return function() {\n    return a.apply(b, arguments);\n  };\n};\ngoog.bind = function(a, b, c) {\n  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf(\"native code\") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;\n  return goog.bind.apply(null, arguments);\n};\ngoog.partial = function(a, b) {\n  var c = Array.prototype.slice.call(arguments, 1);\n  return function() {\n    var b = c.slice();\n    b.push.apply(b, arguments);\n    return a.apply(this, b);\n  };\n};\ngoog.mixin = function(a, b) {\n  for (var c in b) {\n    a[c] = b[c];\n  }\n};\ngoog.now = goog.TRUSTED_SITE && Date.now || function() {\n  return +new Date;\n};\ngoog.globalEval = function(a) {\n  if (goog.global.execScript) {\n    goog.global.execScript(a, \"JavaScript\");\n  } else {\n    if (goog.global.eval) {\n      if (null == goog.evalWorksForGlobals_ && (goog.global.eval(\"var _et_ = 1;\"), \"undefined\" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {\n        goog.global.eval(a);\n      } else {\n        var b = goog.global.document, c = b.createElement(\"script\");\n        c.type = \"text/javascript\";\n        c.defer = !1;\n        c.appendChild(b.createTextNode(a));\n        b.body.appendChild(c);\n        b.body.removeChild(c);\n      }\n    } else {\n      throw Error(\"goog.globalEval not available\");\n    }\n  }\n};\ngoog.evalWorksForGlobals_ = null;\ngoog.getCssName = function(a, b) {\n  var c = function(a) {\n    return goog.cssNameMapping_[a] || a;\n  }, d = function(a) {\n    a = a.split(\"-\");\n    for (var b = [], d = 0;d < a.length;d++) {\n      b.push(c(a[d]));\n    }\n    return b.join(\"-\");\n  }, d = goog.cssNameMapping_ ? \"BY_WHOLE\" == goog.cssNameMappingStyle_ ? c : d : function(a) {\n    return a;\n  };\n  return b ? a + \"-\" + d(b) : d(a);\n};\ngoog.setCssNameMapping = function(a, b) {\n  goog.cssNameMapping_ = a;\n  goog.cssNameMappingStyle_ = b;\n};\n!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);\ngoog.getMsg = function(a, b) {\n  var c = b || {}, d;\n  for (d in c) {\n    var e = (\"\" + c[d]).replace(/\\$/g, \"$$$$\");\n    a = a.replace(new RegExp(\"\\\\{\\\\$\" + d + \"\\\\}\", \"gi\"), e);\n  }\n  return a;\n};\ngoog.getMsgWithFallback = function(a, b) {\n  return a;\n};\ngoog.exportSymbol = function(a, b, c) {\n  goog.exportPath_(a, b, c);\n};\ngoog.exportProperty = function(a, b, c) {\n  a[b] = c;\n};\ngoog.inherits = function(a, b) {\n  function c() {\n  }\n  c.prototype = b.prototype;\n  a.superClass_ = b.prototype;\n  a.prototype = new c;\n  a.prototype.constructor = a;\n  a.base = function(a, c, f) {\n    var g = Array.prototype.slice.call(arguments, 2);\n    return b.prototype[c].apply(a, g);\n  };\n};\ngoog.base = function(a, b, c) {\n  var d = arguments.callee.caller;\n  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) {\n    throw Error(\"arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C\");\n  }\n  if (d.superClass_) {\n    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1));\n  }\n  for (var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {\n    if (g.prototype[b] === d) {\n      f = !0;\n    } else {\n      if (f) {\n        return g.prototype[b].apply(a, e);\n      }\n    }\n  }\n  if (a[b] === d) {\n    return a.constructor.prototype[b].apply(a, e);\n  }\n  throw Error(\"goog.base called from a method of one name to a method of a different name\");\n};\ngoog.scope = function(a) {\n  a.call(goog.global);\n};\nvar axs = {};\naxs.browserUtils = {};\naxs.browserUtils.matchSelector = function(a, b) {\n  return a.matches ? a.matches(b) : a.webkitMatchesSelector ? a.webkitMatchesSelector(b) : a.mozMatchesSelector ? a.mozMatchesSelector(b) : a.msMatchesSelector ? a.msMatchesSelector(b) : !1;\n};\naxs.constants = {};\naxs.constants.ARIA_ROLES = {alert:{namefrom:[\"author\"], parent:[\"region\"]}, alertdialog:{namefrom:[\"author\"], namerequired:!0, parent:[\"alert\", \"dialog\"]}, application:{namefrom:[\"author\"], namerequired:!0, parent:[\"landmark\"]}, article:{namefrom:[\"author\"], parent:[\"document\", \"region\"]}, banner:{namefrom:[\"author\"], parent:[\"landmark\"]}, button:{childpresentational:!0, namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"command\"], properties:[\"aria-expanded\", \"aria-pressed\"]}, checkbox:{namefrom:[\"contents\", \n\"author\"], namerequired:!0, parent:[\"input\"], requiredProperties:[\"aria-checked\"], properties:[\"aria-checked\"]}, columnheader:{namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"gridcell\", \"sectionhead\", \"widget\"], properties:[\"aria-sort\"], scope:[\"row\"]}, combobox:{mustcontain:[\"listbox\", \"textbox\"], namefrom:[\"author\"], namerequired:!0, parent:[\"select\"], requiredProperties:[\"aria-expanded\"], properties:[\"aria-expanded\", \"aria-autocomplete\", \"aria-required\"]}, command:{\"abstract\":!0, namefrom:[\"author\"], \nparent:[\"widget\"]}, complementary:{namefrom:[\"author\"], parent:[\"landmark\"]}, composite:{\"abstract\":!0, childpresentational:!1, namefrom:[\"author\"], parent:[\"widget\"], properties:[\"aria-activedescendant\"]}, contentinfo:{namefrom:[\"author\"], parent:[\"landmark\"]}, definition:{namefrom:[\"author\"], parent:[\"section\"]}, dialog:{namefrom:[\"author\"], namerequired:!0, parent:[\"window\"]}, directory:{namefrom:[\"contents\", \"author\"], parent:[\"list\"]}, document:{namefrom:[\" author\"], namerequired:!0, parent:[\"structure\"], \nproperties:[\"aria-expanded\"]}, form:{namefrom:[\"author\"], parent:[\"landmark\"]}, grid:{mustcontain:[\"row\", \"rowgroup\"], namefrom:[\"author\"], namerequired:!0, parent:[\"composite\", \"region\"], properties:[\"aria-level\", \"aria-multiselectable\", \"aria-readonly\"]}, gridcell:{namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"section\", \"widget\"], properties:[\"aria-readonly\", \"aria-required\", \"aria-selected\"], scope:[\"row\"]}, group:{namefrom:[\" author\"], parent:[\"section\"], properties:[\"aria-activedescendant\"]}, \nheading:{namerequired:!0, parent:[\"sectionhead\"], properties:[\"aria-level\"]}, img:{childpresentational:!0, namefrom:[\"author\"], namerequired:!0, parent:[\"section\"]}, input:{\"abstract\":!0, namefrom:[\"author\"], parent:[\"widget\"]}, landmark:{\"abstract\":!0, namefrom:[\"contents\", \"author\"], namerequired:!1, parent:[\"region\"]}, link:{namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"command\"], properties:[\"aria-expanded\"]}, list:{mustcontain:[\"group\", \"listitem\"], namefrom:[\"author\"], parent:[\"region\"]}, \nlistbox:{mustcontain:[\"option\"], namefrom:[\"author\"], namerequired:!0, parent:[\"list\", \"select\"], properties:[\"aria-multiselectable\", \"aria-required\"]}, listitem:{namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"section\"], properties:[\"aria-level\", \"aria-posinset\", \"aria-setsize\"], scope:[\"list\"]}, log:{namefrom:[\" author\"], namerequired:!0, parent:[\"region\"]}, main:{namefrom:[\"author\"], parent:[\"landmark\"]}, marquee:{namerequired:!0, parent:[\"section\"]}, math:{childpresentational:!0, namefrom:[\"author\"], \nparent:[\"section\"]}, menu:{mustcontain:[\"group\", \"menuitemradio\", \"menuitem\", \"menuitemcheckbox\"], namefrom:[\"author\"], namerequired:!0, parent:[\"list\", \"select\"]}, menubar:{namefrom:[\"author\"], parent:[\"menu\"]}, menuitem:{namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"command\"], scope:[\"menu\", \"menubar\"]}, menuitemcheckbox:{namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"checkbox\", \"menuitem\"], scope:[\"menu\", \"menubar\"]}, menuitemradio:{namefrom:[\"contents\", \"author\"], namerequired:!0, \nparent:[\"menuitemcheckbox\", \"radio\"], scope:[\"menu\", \"menubar\"]}, navigation:{namefrom:[\"author\"], parent:[\"landmark\"]}, note:{namefrom:[\"author\"], parent:[\"section\"]}, option:{namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"input\"], properties:[\"aria-checked\", \"aria-posinset\", \"aria-selected\", \"aria-setsize\"]}, presentation:{parent:[\"structure\"]}, progressbar:{childpresentational:!0, namefrom:[\"author\"], namerequired:!0, parent:[\"range\"]}, radio:{namefrom:[\"contents\", \"author\"], namerequired:!0, \nparent:[\"checkbox\", \"option\"]}, radiogroup:{mustcontain:[\"radio\"], namefrom:[\"author\"], namerequired:!0, parent:[\"select\"], properties:[\"aria-required\"]}, range:{\"abstract\":!0, namefrom:[\"author\"], parent:[\"widget\"], properties:[\"aria-valuemax\", \"aria-valuemin\", \"aria-valuenow\", \"aria-valuetext\"]}, region:{namefrom:[\" author\"], parent:[\"section\"]}, roletype:{\"abstract\":!0, properties:\"aria-atomic aria-busy aria-controls aria-describedby aria-disabled aria-dropeffect aria-flowto aria-grabbed aria-haspopup aria-hidden aria-invalid aria-label aria-labelledby aria-live aria-owns aria-relevant\".split(\" \")}, \nrow:{mustcontain:[\"columnheader\", \"gridcell\", \"rowheader\"], namefrom:[\"contents\", \"author\"], parent:[\"group\", \"widget\"], properties:[\"aria-level\", \"aria-selected\"], scope:[\"grid\", \"rowgroup\", \"treegrid\"]}, rowgroup:{mustcontain:[\"row\"], namefrom:[\"contents\", \"author\"], parent:[\"group\"], scope:[\"grid\"]}, rowheader:{namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"gridcell\", \"sectionhead\", \"widget\"], properties:[\"aria-sort\"], scope:[\"row\"]}, search:{namefrom:[\"author\"], parent:[\"landmark\"]}, \nsection:{\"abstract\":!0, namefrom:[\"contents\", \"author\"], parent:[\"structure\"], properties:[\"aria-expanded\"]}, sectionhead:{\"abstract\":!0, namefrom:[\"contents\", \"author\"], parent:[\"structure\"], properties:[\"aria-expanded\"]}, select:{\"abstract\":!0, namefrom:[\"author\"], parent:[\"composite\", \"group\", \"input\"]}, separator:{childpresentational:!0, namefrom:[\"author\"], parent:[\"structure\"], properties:[\"aria-expanded\", \"aria-orientation\"]}, scrollbar:{childpresentational:!0, namefrom:[\"author\"], namerequired:!1, \nparent:[\"input\", \"range\"], requiredProperties:[\"aria-controls\", \"aria-orientation\", \"aria-valuemax\", \"aria-valuemin\", \"aria-valuenow\"], properties:[\"aria-controls\", \"aria-orientation\", \"aria-valuemax\", \"aria-valuemin\", \"aria-valuenow\"]}, slider:{childpresentational:!0, namefrom:[\"author\"], namerequired:!0, parent:[\"input\", \"range\"], requiredProperties:[\"aria-valuemax\", \"aria-valuemin\", \"aria-valuenow\"], properties:[\"aria-valuemax\", \"aria-valuemin\", \"aria-valuenow\", \"aria-orientation\"]}, spinbutton:{namefrom:[\"author\"], \nnamerequired:!0, parent:[\"input\", \"range\"], requiredProperties:[\"aria-valuemax\", \"aria-valuemin\", \"aria-valuenow\"], properties:[\"aria-valuemax\", \"aria-valuemin\", \"aria-valuenow\", \"aria-required\"]}, status:{parent:[\"region\"]}, structure:{\"abstract\":!0, parent:[\"roletype\"]}, tab:{namefrom:[\"contents\", \"author\"], parent:[\"sectionhead\", \"widget\"], properties:[\"aria-selected\"], scope:[\"tablist\"]}, tablist:{mustcontain:[\"tab\"], namefrom:[\"author\"], parent:[\"composite\", \"directory\"], properties:[\"aria-level\"]}, \ntabpanel:{namefrom:[\"author\"], namerequired:!0, parent:[\"region\"]}, textbox:{namefrom:[\"author\"], namerequired:!0, parent:[\"input\"], properties:[\"aria-activedescendant\", \"aria-autocomplete\", \"aria-multiline\", \"aria-readonly\", \"aria-required\"]}, timer:{namefrom:[\"author\"], namerequired:!0, parent:[\"status\"]}, toolbar:{namefrom:[\"author\"], parent:[\"group\"]}, tooltip:{namerequired:!0, parent:[\"section\"]}, tree:{mustcontain:[\"group\", \"treeitem\"], namefrom:[\"author\"], namerequired:!0, parent:[\"select\"], \nproperties:[\"aria-multiselectable\", \"aria-required\"]}, treegrid:{mustcontain:[\"row\"], namefrom:[\"author\"], namerequired:!0, parent:[\"grid\", \"tree\"]}, treeitem:{namefrom:[\"contents\", \"author\"], namerequired:!0, parent:[\"listitem\", \"option\"], scope:[\"group\", \"tree\"]}, widget:{\"abstract\":!0, parent:[\"roletype\"]}, window:{\"abstract\":!0, namefrom:[\" author\"], parent:[\"roletype\"], properties:[\"aria-expanded\"]}};\naxs.constants.WIDGET_ROLES = {};\naxs.constants.addAllParentRolesToSet_ = function(a, b) {\n  if (a.parent) {\n    for (var c = a.parent, d = 0;d < c.length;d++) {\n      var e = c[d];\n      b[e] = !0;\n      axs.constants.addAllParentRolesToSet_(axs.constants.ARIA_ROLES[e], b);\n    }\n  }\n};\naxs.constants.addAllPropertiesToSet_ = function(a, b, c) {\n  var d = a[b];\n  if (d) {\n    for (var e = 0;e < d.length;e++) {\n      c[d[e]] = !0;\n    }\n  }\n  if (a.parent) {\n    for (a = a.parent, d = 0;d < a.length;d++) {\n      axs.constants.addAllPropertiesToSet_(axs.constants.ARIA_ROLES[a[d]], b, c);\n    }\n  }\n};\nfor (var roleName in axs.constants.ARIA_ROLES) {\n  var role = axs.constants.ARIA_ROLES[roleName], propertiesSet = {};\n  axs.constants.addAllPropertiesToSet_(role, \"properties\", propertiesSet);\n  role.propertiesSet = propertiesSet;\n  var requiredPropertiesSet = {};\n  axs.constants.addAllPropertiesToSet_(role, \"requiredProperties\", requiredPropertiesSet);\n  role.requiredPropertiesSet = requiredPropertiesSet;\n  var parentRolesSet = {};\n  axs.constants.addAllParentRolesToSet_(role, parentRolesSet);\n  role.allParentRolesSet = parentRolesSet;\n  \"widget\" in parentRolesSet && (axs.constants.WIDGET_ROLES[roleName] = role);\n}\naxs.constants.ARIA_PROPERTIES = {activedescendant:{type:\"property\", valueType:\"idref\"}, atomic:{defaultValue:\"false\", type:\"property\", valueType:\"boolean\"}, autocomplete:{defaultValue:\"none\", type:\"property\", valueType:\"token\", values:[\"inline\", \"list\", \"both\", \"none\"]}, busy:{defaultValue:\"false\", type:\"state\", valueType:\"boolean\"}, checked:{defaultValue:\"undefined\", type:\"state\", valueType:\"token\", values:[\"true\", \"false\", \"mixed\", \"undefined\"]}, controls:{type:\"property\", valueType:\"idref_list\"}, \ndescribedby:{type:\"property\", valueType:\"idref_list\"}, disabled:{defaultValue:\"false\", type:\"state\", valueType:\"boolean\"}, dropeffect:{defaultValue:\"none\", type:\"property\", valueType:\"token_list\", values:\"copy move link execute popup none\".split(\" \")}, expanded:{defaultValue:\"undefined\", type:\"state\", valueType:\"token\", values:[\"true\", \"false\", \"undefined\"]}, flowto:{type:\"property\", valueType:\"idref_list\"}, grabbed:{defaultValue:\"undefined\", type:\"state\", valueType:\"token\", values:[\"true\", \"false\", \n\"undefined\"]}, haspopup:{defaultValue:\"false\", type:\"property\", valueType:\"boolean\"}, hidden:{defaultValue:\"false\", type:\"state\", valueType:\"boolean\"}, invalid:{defaultValue:\"false\", type:\"state\", valueType:\"token\", values:[\"grammar\", \"false\", \"spelling\", \"true\"]}, label:{type:\"property\", valueType:\"string\"}, labelledby:{type:\"property\", valueType:\"idref_list\"}, level:{type:\"property\", valueType:\"integer\"}, live:{defaultValue:\"off\", type:\"property\", valueType:\"token\", values:[\"off\", \"polite\", \"assertive\"]}, \nmultiline:{defaultValue:\"false\", type:\"property\", valueType:\"boolean\"}, multiselectable:{defaultValue:\"false\", type:\"property\", valueType:\"boolean\"}, orientation:{defaultValue:\"vertical\", type:\"property\", valueType:\"token\", values:[\"horizontal\", \"vertical\"]}, owns:{type:\"property\", valueType:\"idref_list\"}, posinset:{type:\"property\", valueType:\"integer\"}, pressed:{defaultValue:\"undefined\", type:\"state\", valueType:\"token\", values:[\"true\", \"false\", \"mixed\", \"undefined\"]}, readonly:{defaultValue:\"false\", \ntype:\"property\", valueType:\"boolean\"}, relevant:{defaultValue:\"additions text\", type:\"property\", valueType:\"token_list\", values:[\"additions\", \"removals\", \"text\", \"all\"]}, required:{defaultValue:\"false\", type:\"property\", valueType:\"boolean\"}, selected:{defaultValue:\"undefined\", type:\"state\", valueType:\"token\", values:[\"true\", \"false\", \"undefined\"]}, setsize:{type:\"property\", valueType:\"integer\"}, sort:{defaultValue:\"none\", type:\"property\", valueType:\"token\", values:[\"ascending\", \"descending\", \"none\", \n\"other\"]}, valuemax:{type:\"property\", valueType:\"decimal\"}, valuemin:{type:\"property\", valueType:\"decimal\"}, valuenow:{type:\"property\", valueType:\"decimal\"}, valuetext:{type:\"property\", valueType:\"string\"}};\n(function() {\n  for (var a in axs.constants.ARIA_PROPERTIES) {\n    var b = axs.constants.ARIA_PROPERTIES[a];\n    if (b.values) {\n      for (var c = {}, d = 0;d < b.values.length;d++) {\n        c[b.values[d]] = !0;\n      }\n      b.valuesSet = c;\n    }\n  }\n})();\naxs.constants.GLOBAL_PROPERTIES = axs.constants.ARIA_ROLES.roletype.propertiesSet;\naxs.constants.NO_ROLE_NAME = \" \";\naxs.constants.WIDGET_ROLE_TO_NAME = {alert:\"aria_role_alert\", alertdialog:\"aria_role_alertdialog\", button:\"aria_role_button\", checkbox:\"aria_role_checkbox\", columnheader:\"aria_role_columnheader\", combobox:\"aria_role_combobox\", dialog:\"aria_role_dialog\", grid:\"aria_role_grid\", gridcell:\"aria_role_gridcell\", link:\"aria_role_link\", listbox:\"aria_role_listbox\", log:\"aria_role_log\", marquee:\"aria_role_marquee\", menu:\"aria_role_menu\", menubar:\"aria_role_menubar\", menuitem:\"aria_role_menuitem\", menuitemcheckbox:\"aria_role_menuitemcheckbox\", \nmenuitemradio:\"aria_role_menuitemradio\", option:axs.constants.NO_ROLE_NAME, progressbar:\"aria_role_progressbar\", radio:\"aria_role_radio\", radiogroup:\"aria_role_radiogroup\", rowheader:\"aria_role_rowheader\", scrollbar:\"aria_role_scrollbar\", slider:\"aria_role_slider\", spinbutton:\"aria_role_spinbutton\", status:\"aria_role_status\", tab:\"aria_role_tab\", tabpanel:\"aria_role_tabpanel\", textbox:\"aria_role_textbox\", timer:\"aria_role_timer\", toolbar:\"aria_role_toolbar\", tooltip:\"aria_role_tooltip\", treeitem:\"aria_role_treeitem\"};\naxs.constants.STRUCTURE_ROLE_TO_NAME = {article:\"aria_role_article\", application:\"aria_role_application\", banner:\"aria_role_banner\", columnheader:\"aria_role_columnheader\", complementary:\"aria_role_complementary\", contentinfo:\"aria_role_contentinfo\", definition:\"aria_role_definition\", directory:\"aria_role_directory\", document:\"aria_role_document\", form:\"aria_role_form\", group:\"aria_role_group\", heading:\"aria_role_heading\", img:\"aria_role_img\", list:\"aria_role_list\", listitem:\"aria_role_listitem\", \nmain:\"aria_role_main\", math:\"aria_role_math\", navigation:\"aria_role_navigation\", note:\"aria_role_note\", region:\"aria_role_region\", rowheader:\"aria_role_rowheader\", search:\"aria_role_search\", separator:\"aria_role_separator\"};\naxs.constants.ATTRIBUTE_VALUE_TO_STATUS = [{name:\"aria-autocomplete\", values:{inline:\"aria_autocomplete_inline\", list:\"aria_autocomplete_list\", both:\"aria_autocomplete_both\"}}, {name:\"aria-checked\", values:{\"true\":\"aria_checked_true\", \"false\":\"aria_checked_false\", mixed:\"aria_checked_mixed\"}}, {name:\"aria-disabled\", values:{\"true\":\"aria_disabled_true\"}}, {name:\"aria-expanded\", values:{\"true\":\"aria_expanded_true\", \"false\":\"aria_expanded_false\"}}, {name:\"aria-invalid\", values:{\"true\":\"aria_invalid_true\", \ngrammar:\"aria_invalid_grammar\", spelling:\"aria_invalid_spelling\"}}, {name:\"aria-multiline\", values:{\"true\":\"aria_multiline_true\"}}, {name:\"aria-multiselectable\", values:{\"true\":\"aria_multiselectable_true\"}}, {name:\"aria-pressed\", values:{\"true\":\"aria_pressed_true\", \"false\":\"aria_pressed_false\", mixed:\"aria_pressed_mixed\"}}, {name:\"aria-readonly\", values:{\"true\":\"aria_readonly_true\"}}, {name:\"aria-required\", values:{\"true\":\"aria_required_true\"}}, {name:\"aria-selected\", values:{\"true\":\"aria_selected_true\", \n\"false\":\"aria_selected_false\"}}];\naxs.constants.INPUT_TYPE_TO_INFORMATION_TABLE_MSG = {button:\"input_type_button\", checkbox:\"input_type_checkbox\", color:\"input_type_color\", datetime:\"input_type_datetime\", \"datetime-local\":\"input_type_datetime_local\", date:\"input_type_date\", email:\"input_type_email\", file:\"input_type_file\", image:\"input_type_image\", month:\"input_type_month\", number:\"input_type_number\", password:\"input_type_password\", radio:\"input_type_radio\", range:\"input_type_range\", reset:\"input_type_reset\", search:\"input_type_search\", \nsubmit:\"input_type_submit\", tel:\"input_type_tel\", text:\"input_type_text\", url:\"input_type_url\", week:\"input_type_week\"};\naxs.constants.TAG_TO_INFORMATION_TABLE_VERBOSE_MSG = {A:\"tag_link\", BUTTON:\"tag_button\", H1:\"tag_h1\", H2:\"tag_h2\", H3:\"tag_h3\", H4:\"tag_h4\", H5:\"tag_h5\", H6:\"tag_h6\", LI:\"tag_li\", OL:\"tag_ol\", SELECT:\"tag_select\", TEXTAREA:\"tag_textarea\", UL:\"tag_ul\", SECTION:\"tag_section\", NAV:\"tag_nav\", ARTICLE:\"tag_article\", ASIDE:\"tag_aside\", HGROUP:\"tag_hgroup\", HEADER:\"tag_header\", FOOTER:\"tag_footer\", TIME:\"tag_time\", MARK:\"tag_mark\"};\naxs.constants.TAG_TO_INFORMATION_TABLE_BRIEF_MSG = {BUTTON:\"tag_button\", SELECT:\"tag_select\", TEXTAREA:\"tag_textarea\"};\naxs.constants.MIXED_VALUES = {\"true\":!0, \"false\":!0, mixed:!0};\naxs.constants.Severity = {INFO:\"Info\", WARNING:\"Warning\", SEVERE:\"Severe\"};\naxs.constants.AuditResult = {PASS:\"PASS\", FAIL:\"FAIL\", NA:\"NA\"};\naxs.constants.InlineElements = {TT:!0, I:!0, B:!0, BIG:!0, SMALL:!0, EM:!0, STRONG:!0, DFN:!0, CODE:!0, SAMP:!0, KBD:!0, VAR:!0, CITE:!0, ABBR:!0, ACRONYM:!0, A:!0, IMG:!0, OBJECT:!0, BR:!0, SCRIPT:!0, MAP:!0, Q:!0, SUB:!0, SUP:!0, SPAN:!0, BDO:!0, INPUT:!0, SELECT:!0, TEXTAREA:!0, LABEL:!0, BUTTON:!0};\naxs.constants.NATIVELY_DISABLEABLE = {BUTTON:!0, INPUT:!0, SELECT:!0, TEXTAREA:!0, FIELDSET:!0, OPTGROUP:!0, OPTION:!0};\naxs.constants.ARIA_TO_HTML_ATTRIBUTE = {\"aria-checked\":\"checked\", \"aria-disabled\":\"disabled\", \"aria-hidden\":\"hidden\", \"aria-expanded\":\"open\", \"aria-valuemax\":\"max\", \"aria-valuemin\":\"min\", \"aria-readonly\":\"readonly\", \"aria-required\":\"required\", \"aria-selected\":\"selected\", \"aria-valuenow\":\"value\"};\naxs.constants.TAG_TO_IMPLICIT_SEMANTIC_INFO = {A:[{role:\"link\", allowed:\"button checkbox menuitem menuitemcheckbox menuitemradio tab treeitem\".split(\" \"), selector:\"a[href]\"}], ADDRESS:[{role:\"\", allowed:[\"contentinfo\", \"presentation\"]}], AREA:[{role:\"link\", selector:\"area[href]\"}], ARTICLE:[{role:\"article\", allowed:[\"presentation\", \"article\", \"document\", \"application\", \"main\"]}], ASIDE:[{role:\"complementary\", allowed:[\"note\", \"complementary\", \"search\", \"presentation\"]}], AUDIO:[{role:\"\", allowed:[\"application\", \n\"presentation\"]}], BASE:[{role:\"\", reserved:!0}], BODY:[{role:\"document\", allowed:[\"presentation\"]}], BUTTON:[{role:\"button\", allowed:[\"link\", \"menuitem\", \"menuitemcheckbox\", \"menuitemradio\", \"radio\"], selector:'button:not([aria-pressed]):not([type=\"menu\"])'}, {role:\"button\", allowed:[\"button\"], selector:\"button[aria-pressed]\"}, {role:\"button\", attributes:{\"aria-haspopup\":!0}, allowed:[\"link\", \"menuitem\", \"menuitemcheckbox\", \"menuitemradio\", \"radio\"], selector:'button[type=\"menu\"]'}], CAPTION:[{role:\"\", \nallowed:[\"presentation\"]}], COL:[{role:\"\", reserved:!0}], COLGROUP:[{role:\"\", reserved:!0}], DATALIST:[{role:\"listbox\", attributes:{\"aria-multiselectable\":!1}, allowed:[\"presentation\"]}], DEL:[{role:\"\", allowed:[\"*\"]}], DD:[{role:\"\", allowed:[\"presentation\"]}], DT:[{role:\"\", allowed:[\"presentation\"]}], DETAILS:[{role:\"group\", allowed:[\"group\", \"presentation\"]}], DIALOG:[{role:\"dialog\", allowed:\"dialog alert alertdialog application log marquee status\".split(\" \"), selector:\"dialog[open]\"}, {role:\"dialog\", \nattributes:{\"aria-hidden\":!0}, allowed:\"dialog alert alertdialog application log marquee status\".split(\" \"), selector:\"dialog:not([open])\"}], DIV:[{role:\"\", allowed:[\"*\"]}], DL:[{role:\"list\", allowed:[\"presentation\"]}], EMBED:[{role:\"\", allowed:[\"application\", \"document\", \"img\", \"presentation\"]}], FIGURE:[{role:\"\", allowed:[\"*\"]}], FOOTER:[{role:\"\", allowed:[\"contentinfo\", \"presentation\"]}], FORM:[{role:\"form\", allowed:[\"presentation\"]}], P:[{role:\"\", allowed:[\"*\"]}], PRE:[{role:\"\", allowed:[\"*\"]}], \nBLOCKQUOTE:[{role:\"\", allowed:[\"*\"]}], H1:[{role:\"heading\"}], H2:[{role:\"heading\"}], H3:[{role:\"heading\"}], H4:[{role:\"heading\"}], H5:[{role:\"heading\"}], H6:[{role:\"heading\"}], HEAD:[{role:\"\", reserved:!0}], HEADER:[{role:\"\", allowed:[\"banner\", \"presentation\"]}], HR:[{role:\"separator\", allowed:[\"presentation\"]}], HTML:[{role:\"\", reserved:!0}], IFRAME:[{role:\"\", allowed:[\"application\", \"document\", \"img\", \"presentation\"], selector:\"iframe:not([seamless])\"}, {role:\"\", allowed:[\"application\", \"document\", \n\"img\", \"presentation\", \"group\"], selector:\"iframe[seamless]\"}], IMG:[{role:\"presentation\", reserved:!0, selector:'img[alt=\"\"]'}, {role:\"img\", allowed:[\"*\"], selector:'img[alt]:not([alt=\"\"])'}], INPUT:[{role:\"button\", allowed:[\"link\", \"menuitem\", \"menuitemcheckbox\", \"menuitemradio\", \"radio\"], selector:'input[type=\"button\"]:not([aria-pressed])'}, {role:\"button\", allowed:[\"button\"], selector:'input[type=\"button\"][aria-pressed]'}, {role:\"checkbox\", allowed:[\"checkbox\"], selector:'input[type=\"checkbox\"]'}, \n{role:\"\", selector:'input[type=\"color\"]'}, {role:\"\", selector:'input[type=\"date\"]'}, {role:\"\", selector:'input[type=\"datetime\"]'}, {role:\"textbox\", selector:'input[type=\"email\"]:not([list])'}, {role:\"\", selector:'input[type=\"file\"]'}, {role:\"\", reserved:!0, selector:'input[type=\"hidden\"]'}, {role:\"button\", allowed:[\"button\"], selector:'input[type=\"image\"][aria-pressed]'}, {role:\"button\", allowed:[\"link\", \"menuitem\", \"menuitemcheckbox\", \"menuitemradio\", \"radio\"], selector:'input[type=\"image\"]:not([aria-pressed])'}, \n{role:\"\", selector:'input[type=\"month\"]'}, {role:\"\", selector:'input[type=\"number\"]'}, {role:\"textbox\", selector:'input[type=\"password\"]'}, {role:\"radio\", allowed:[\"menuitemradio\"], selector:'input[type=\"radio\"]'}, {role:\"slider\", selector:'input[type=\"range\"]'}, {role:\"button\", selector:'input[type=\"reset\"]'}, {role:\"combobox\", selector:'input[type=\"search\"][list]'}, {role:\"textbox\", selector:'input[type=\"search\"]:not([list])'}, {role:\"button\", selector:'input[type=\"submit\"]'}, {role:\"combobox\", \nselector:'input[type=\"tel\"][list]'}, {role:\"textbox\", selector:'input[type=\"tel\"]:not([list])'}, {role:\"combobox\", selector:'input[type=\"text\"][list]'}, {role:\"textbox\", selector:'input[type=\"text\"]:not([list])'}, {role:\"textbox\", selector:\"input:not([type])\"}, {role:\"\", selector:'input[type=\"time\"]'}, {role:\"combobox\", selector:'input[type=\"url\"][list]'}, {role:\"textbox\", selector:'input[type=\"url\"]:not([list])'}, {role:\"\", selector:'input[type=\"week\"]'}], INS:[{role:\"\", allowed:[\"*\"]}], KEYGEN:[{role:\"\"}], \nLABEL:[{role:\"\", allowed:[\"presentation\"]}], LI:[{role:\"listitem\", allowed:\"menuitem menuitemcheckbox menuitemradio option tab treeitem presentation\".split(\" \"), selector:'ol:not([role=\"presentation\"])>li, ul:not([role=\"presentation\"])>li'}, {role:\"listitem\", allowed:\"listitem menuitem menuitemcheckbox menuitemradio option tab treeitem presentation\".split(\" \"), selector:'ol[role=\"presentation\"]>li, ul[role=\"presentation\"]>li'}], LINK:[{role:\"link\", reserved:!0, selector:\"link[href]\"}], MAIN:[{role:\"\", \nallowed:[\"main\", \"presentation\"]}], MAP:[{role:\"\", reserved:!0}], MATH:[{role:\"\", allowed:[\"presentation\"]}], MENU:[{role:\"toolbar\", selector:'menu[type=\"toolbar\"]'}], MENUITEM:[{role:\"menuitem\", selector:'menuitem[type=\"command\"]'}, {role:\"menuitemcheckbox\", selector:'menuitem[type=\"checkbox\"]'}, {role:\"menuitemradio\", selector:'menuitem[type=\"radio\"]'}], META:[{role:\"\", reserved:!0}], METER:[{role:\"progressbar\", allowed:[\"presentation\"]}], NAV:[{role:\"navigation\", allowed:[\"navigation\", \"presentation\"]}], \nNOSCRIPT:[{role:\"\", reserved:!0}], OBJECT:[{role:\"\", allowed:[\"application\", \"document\", \"img\", \"presentation\"]}], OL:[{role:\"list\", allowed:\"directory group listbox menu menubar tablist toolbar tree presentation\".split(\" \")}], OPTGROUP:[{role:\"\", allowed:[\"presentation\"]}], OPTION:[{role:\"option\"}], OUTPUT:[{role:\"status\", allowed:[\"*\"]}], PARAM:[{role:\"\", reserved:!0}], PICTURE:[{role:\"\", reserved:!0}], PROGRESS:[{role:\"progressbar\", allowed:[\"presentation\"]}], SCRIPT:[{role:\"\", reserved:!0}], \nSECTION:[{role:\"region\", allowed:\"alert alertdialog application contentinfo dialog document log marquee search status presentation\".split(\" \")}], SELECT:[{role:\"listbox\"}], SOURCE:[{role:\"\", reserved:!0}], SPAN:[{role:\"\", allowed:[\"*\"]}], STYLE:[{role:\"\", reserved:!0}], SVG:[{role:\"\", allowed:[\"application\", \"document\", \"img\", \"presentation\"]}], SUMMARY:[{role:\"\", allowed:[\"presentation\"]}], TABLE:[{role:\"\", allowed:[\"*\"]}], TEMPLATE:[{role:\"\", reserved:!0}], TEXTAREA:[{role:\"textbox\"}], TBODY:[{role:\"rowgroup\", \nallowed:[\"*\"]}], THEAD:[{role:\"rowgroup\", allowed:[\"*\"]}], TFOOT:[{role:\"rowgroup\", allowed:[\"*\"]}], TITLE:[{role:\"\", reserved:!0}], TD:[{role:\"\", allowed:[\"*\"]}], TH:[{role:\"\", allowed:[\"*\"]}], TR:[{role:\"\", allowed:[\"*\"]}], TRACK:[{role:\"\", reserved:!0}], UL:[{role:\"list\", allowed:\"directory group listbox menu menubar tablist toolbar tree presentation\".split(\" \")}], VIDEO:[{role:\"\", allowed:[\"application\", \"presentation\"]}]};\naxs.color = {};\naxs.color.Color = function(a, b, c, d) {\n  this.red = a;\n  this.green = b;\n  this.blue = c;\n  this.alpha = d;\n};\naxs.color.YCbCr = function(a) {\n  this.luma = this.z = a[0];\n  this.Cb = this.x = a[1];\n  this.Cr = this.y = a[2];\n};\naxs.color.YCbCr.prototype = {multiply:function(a) {\n  return new axs.color.YCbCr([this.luma * a, this.Cb * a, this.Cr * a]);\n}, add:function(a) {\n  return new axs.color.YCbCr([this.luma + a.luma, this.Cb + a.Cb, this.Cr + a.Cr]);\n}, subtract:function(a) {\n  return new axs.color.YCbCr([this.luma - a.luma, this.Cb - a.Cb, this.Cr - a.Cr]);\n}};\naxs.color.calculateContrastRatio = function(a, b) {\n  1 > a.alpha && (a = axs.color.flattenColors(a, b));\n  var c = axs.color.calculateLuminance(a), d = axs.color.calculateLuminance(b);\n  return (Math.max(c, d) + .05) / (Math.min(c, d) + .05);\n};\naxs.color.calculateLuminance = function(a) {\n  return axs.color.toYCbCr(a).luma;\n};\naxs.color.luminanceRatio = function(a, b) {\n  return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);\n};\naxs.color.parseColor = function(a) {\n  if (\"transparent\" === a) {\n    return new axs.color.Color(0, 0, 0, 0);\n  }\n  var b = a.match(/^rgb\\((\\d+), (\\d+), (\\d+)\\)$/);\n  if (b) {\n    a = parseInt(b[1], 10);\n    var c = parseInt(b[2], 10), d = parseInt(b[3], 10);\n    return new axs.color.Color(a, c, d, 1);\n  }\n  return (b = a.match(/^rgba\\((\\d+), (\\d+), (\\d+), (\\d*(\\.\\d+)?)\\)/)) ? (a = parseInt(b[1], 10), c = parseInt(b[2], 10), d = parseInt(b[3], 10), b = parseFloat(b[4]), new axs.color.Color(a, c, d, b)) : null;\n};\naxs.color.colorChannelToString = function(a) {\n  a = Math.round(a);\n  return 15 >= a ? \"0\" + a.toString(16) : a.toString(16);\n};\naxs.color.colorToString = function(a) {\n  return 1 == a.alpha ? \"#\" + axs.color.colorChannelToString(a.red) + axs.color.colorChannelToString(a.green) + axs.color.colorChannelToString(a.blue) : \"rgba(\" + [a.red, a.green, a.blue, a.alpha].join() + \")\";\n};\naxs.color.luminanceFromContrastRatio = function(a, b, c) {\n  return c ? (a + .05) * b - .05 : (a + .05) / b - .05;\n};\naxs.color.translateColor = function(a, b) {\n  for (var c = b > a.luma ? axs.color.WHITE_YCC : axs.color.BLACK_YCC, d = c == axs.color.WHITE_YCC ? axs.color.YCC_CUBE_FACES_WHITE : axs.color.YCC_CUBE_FACES_BLACK, e = new axs.color.YCbCr([0, a.Cb, a.Cr]), f = new axs.color.YCbCr([1, a.Cb, a.Cr]), f = {a:e, b:f}, e = null, g = 0;g < d.length && !(e = axs.color.findIntersection(f, d[g]), 0 <= e.z && 1 >= e.z);g++) {\n  }\n  if (!e) {\n    throw \"Couldn't find intersection with YCbCr color cube for Cb=\" + a.Cb + \", Cr=\" + a.Cr + \".\";\n  }\n  if (e.x != a.x || e.y != a.y) {\n    throw \"Intersection has wrong Cb/Cr values.\";\n  }\n  if (Math.abs(c.luma - e.luma) < Math.abs(c.luma - b)) {\n    return c = [b, a.Cb, a.Cr], axs.color.fromYCbCrArray(c);\n  }\n  c = (b - e.luma) / (c.luma - e.luma);\n  c = [b, e.Cb - e.Cb * c, e.Cr - e.Cr * c];\n  return axs.color.fromYCbCrArray(c);\n};\naxs.color.suggestColors = function(a, b, c) {\n  var d = {}, e = axs.color.calculateLuminance(a), f = axs.color.calculateLuminance(b), g = f > e, h = axs.color.toYCbCr(b), k = axs.color.toYCbCr(a), m;\n  for (m in c) {\n    var l = c[m], n = axs.color.luminanceFromContrastRatio(e, l + .02, g);\n    if (1 >= n && 0 <= n) {\n      var p = axs.color.translateColor(h, n), l = axs.color.calculateContrastRatio(p, a), n = {};\n      n.fg = axs.color.colorToString(p);\n      n.bg = axs.color.colorToString(a);\n      n.contrast = l.toFixed(2);\n      d[m] = n;\n    } else {\n      l = axs.color.luminanceFromContrastRatio(f, l + .02, !g), 1 >= l && 0 <= l && (p = axs.color.translateColor(k, l), l = axs.color.calculateContrastRatio(b, p), n = {}, n.bg = axs.color.colorToString(p), n.fg = axs.color.colorToString(b), n.contrast = l.toFixed(2), d[m] = n);\n    }\n  }\n  return d;\n};\naxs.color.flattenColors = function(a, b) {\n  var c = a.alpha;\n  return new axs.color.Color((1 - c) * b.red + c * a.red, (1 - c) * b.green + c * a.green, (1 - c) * b.blue + c * a.blue, a.alpha + b.alpha * (1 - a.alpha));\n};\naxs.color.multiplyMatrixVector = function(a, b) {\n  var c = b[0], d = b[1], e = b[2];\n  return [a[0][0] * c + a[0][1] * d + a[0][2] * e, a[1][0] * c + a[1][1] * d + a[1][2] * e, a[2][0] * c + a[2][1] * d + a[2][2] * e];\n};\naxs.color.toYCbCr = function(a) {\n  var b = a.red / 255, c = a.green / 255;\n  a = a.blue / 255;\n  b = .03928 >= b ? b / 12.92 : Math.pow((b + .055) / 1.055, 2.4);\n  c = .03928 >= c ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4);\n  a = .03928 >= a ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4);\n  return new axs.color.YCbCr(axs.color.multiplyMatrixVector(axs.color.YCC_MATRIX, [b, c, a]));\n};\naxs.color.fromYCbCr = function(a) {\n  return axs.color.fromYCbCrArray([a.luma, a.Cb, a.Cr]);\n};\naxs.color.fromYCbCrArray = function(a) {\n  var b = axs.color.multiplyMatrixVector(axs.color.INVERTED_YCC_MATRIX, a), c = b[0];\n  a = b[1];\n  b = b[2];\n  c = .00303949 >= c ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - .055;\n  a = .00303949 >= a ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - .055;\n  b = .00303949 >= b ? 12.92 * b : 1.055 * Math.pow(b, 1 / 2.4) - .055;\n  c = Math.min(Math.max(Math.round(255 * c), 0), 255);\n  a = Math.min(Math.max(Math.round(255 * a), 0), 255);\n  b = Math.min(Math.max(Math.round(255 * b), 0), 255);\n  return new axs.color.Color(c, a, b, 1);\n};\naxs.color.RGBToYCbCrMatrix = function(a, b) {\n  return [[a, 1 - a - b, b], [-a / (2 - 2 * b), (a + b - 1) / (2 - 2 * b), (1 - b) / (2 - 2 * b)], [(1 - a) / (2 - 2 * a), (a + b - 1) / (2 - 2 * a), -b / (2 - 2 * a)]];\n};\naxs.color.invert3x3Matrix = function(a) {\n  var b = a[0][0], c = a[0][1], d = a[0][2], e = a[1][0], f = a[1][1], g = a[1][2], h = a[2][0], k = a[2][1];\n  a = a[2][2];\n  return axs.color.scalarMultiplyMatrix([[f * a - g * k, d * k - c * a, c * g - d * f], [g * h - e * a, b * a - d * h, d * e - b * g], [e * k - f * h, h * c - b * k, b * f - c * e]], 1 / (b * (f * a - g * k) - c * (a * e - g * h) + d * (e * k - f * h)));\n};\naxs.color.findIntersection = function(a, b) {\n  var c = [a.a.x - b.p0.x, a.a.y - b.p0.y, a.a.z - b.p0.z], d = axs.color.invert3x3Matrix([[a.a.x - a.b.x, b.p1.x - b.p0.x, b.p2.x - b.p0.x], [a.a.y - a.b.y, b.p1.y - b.p0.y, b.p2.y - b.p0.y], [a.a.z - a.b.z, b.p1.z - b.p0.z, b.p2.z - b.p0.z]]), c = axs.color.multiplyMatrixVector(d, c)[0];\n  return a.a.add(a.b.subtract(a.a).multiply(c));\n};\naxs.color.scalarMultiplyMatrix = function(a, b) {\n  for (var c = [], d = 0;3 > d;d++) {\n    c[d] = axs.color.scalarMultiplyVector(a[d], b);\n  }\n  return c;\n};\naxs.color.scalarMultiplyVector = function(a, b) {\n  for (var c = [], d = 0;d < a.length;d++) {\n    c[d] = a[d] * b;\n  }\n  return c;\n};\naxs.color.kR = .2126;\naxs.color.kB = .0722;\naxs.color.YCC_MATRIX = axs.color.RGBToYCbCrMatrix(axs.color.kR, axs.color.kB);\naxs.color.INVERTED_YCC_MATRIX = axs.color.invert3x3Matrix(axs.color.YCC_MATRIX);\naxs.color.BLACK = new axs.color.Color(0, 0, 0, 1);\naxs.color.BLACK_YCC = axs.color.toYCbCr(axs.color.BLACK);\naxs.color.WHITE = new axs.color.Color(255, 255, 255, 1);\naxs.color.WHITE_YCC = axs.color.toYCbCr(axs.color.WHITE);\naxs.color.RED = new axs.color.Color(255, 0, 0, 1);\naxs.color.RED_YCC = axs.color.toYCbCr(axs.color.RED);\naxs.color.GREEN = new axs.color.Color(0, 255, 0, 1);\naxs.color.GREEN_YCC = axs.color.toYCbCr(axs.color.GREEN);\naxs.color.BLUE = new axs.color.Color(0, 0, 255, 1);\naxs.color.BLUE_YCC = axs.color.toYCbCr(axs.color.BLUE);\naxs.color.CYAN = new axs.color.Color(0, 255, 255, 1);\naxs.color.CYAN_YCC = axs.color.toYCbCr(axs.color.CYAN);\naxs.color.MAGENTA = new axs.color.Color(255, 0, 255, 1);\naxs.color.MAGENTA_YCC = axs.color.toYCbCr(axs.color.MAGENTA);\naxs.color.YELLOW = new axs.color.Color(255, 255, 0, 1);\naxs.color.YELLOW_YCC = axs.color.toYCbCr(axs.color.YELLOW);\naxs.color.YCC_CUBE_FACES_BLACK = [{p0:axs.color.BLACK_YCC, p1:axs.color.RED_YCC, p2:axs.color.GREEN_YCC}, {p0:axs.color.BLACK_YCC, p1:axs.color.GREEN_YCC, p2:axs.color.BLUE_YCC}, {p0:axs.color.BLACK_YCC, p1:axs.color.BLUE_YCC, p2:axs.color.RED_YCC}];\naxs.color.YCC_CUBE_FACES_WHITE = [{p0:axs.color.WHITE_YCC, p1:axs.color.CYAN_YCC, p2:axs.color.MAGENTA_YCC}, {p0:axs.color.WHITE_YCC, p1:axs.color.MAGENTA_YCC, p2:axs.color.YELLOW_YCC}, {p0:axs.color.WHITE_YCC, p1:axs.color.YELLOW_YCC, p2:axs.color.CYAN_YCC}];\naxs.utils = {};\naxs.utils.FOCUSABLE_ELEMENTS_SELECTOR = \"input:not([type=hidden]):not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),a[href],iframe,[tabindex]\";\naxs.utils.LABELABLE_ELEMENTS_SELECTOR = \"button,input:not([type=hidden]),keygen,meter,output,progress,select,textarea\";\naxs.utils.parentElement = function(a) {\n  if (!a) {\n    return null;\n  }\n  if (a.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {\n    return a.host;\n  }\n  var b = a.parentElement;\n  if (b) {\n    return b;\n  }\n  a = a.parentNode;\n  if (!a) {\n    return null;\n  }\n  switch(a.nodeType) {\n    case Node.ELEMENT_NODE:\n      return a;\n    case Node.DOCUMENT_FRAGMENT_NODE:\n      return a.host;\n    default:\n      return null;\n  }\n};\naxs.utils.asElement = function(a) {\n  switch(a.nodeType) {\n    case Node.COMMENT_NODE:\n      return null;\n    case Node.ELEMENT_NODE:\n      if (\"script\" == a.tagName.toLowerCase()) {\n        return null;\n      }\n      break;\n    case Node.TEXT_NODE:\n      a = axs.utils.parentElement(a);\n      break;\n    default:\n      return console.warn(\"Unhandled node type: \", a.nodeType), null;\n  }\n  return a;\n};\naxs.utils.elementIsTransparent = function(a) {\n  return \"0\" == a.style.opacity;\n};\naxs.utils.elementHasZeroArea = function(a) {\n  a = a.getBoundingClientRect();\n  var b = a.top - a.bottom;\n  return a.right - a.left && b ? !1 : !0;\n};\naxs.utils.elementIsOutsideScrollArea = function(a) {\n  for (var b = axs.utils.parentElement(a), c = a.ownerDocument.defaultView;b != c.document.body;) {\n    if (axs.utils.isClippedBy(a, b)) {\n      return !0;\n    }\n    if (axs.utils.canScrollTo(a, b) && !axs.utils.elementIsOutsideScrollArea(b)) {\n      return !1;\n    }\n    b = axs.utils.parentElement(b);\n  }\n  return !axs.utils.canScrollTo(a, c.document.body);\n};\naxs.utils.canScrollTo = function(a, b) {\n  var c = a.getBoundingClientRect(), d = b.getBoundingClientRect(), e = d.top, f = d.left, g = e - b.scrollTop, e = e - b.scrollTop + b.scrollHeight, h = f - b.scrollLeft + b.scrollWidth;\n  if (c.right < f - b.scrollLeft || c.bottom < g || c.left > h || c.top > e) {\n    return !1;\n  }\n  f = a.ownerDocument.defaultView;\n  g = f.getComputedStyle(b);\n  return c.left > d.right || c.top > d.bottom ? \"scroll\" == g.overflow || \"auto\" == g.overflow || b instanceof f.HTMLBodyElement : !0;\n};\naxs.utils.isClippedBy = function(a, b) {\n  var c = a.getBoundingClientRect(), d = b.getBoundingClientRect(), e = d.top - b.scrollTop, f = d.left - b.scrollLeft, g = a.ownerDocument.defaultView.getComputedStyle(b);\n  return (c.right < d.left || c.bottom < d.top || c.left > d.right || c.top > d.bottom) && \"hidden\" == g.overflow ? !0 : c.right < f || c.bottom < e ? \"visible\" != g.overflow : !1;\n};\naxs.utils.isAncestor = function(a, b) {\n  return null == b ? !1 : b === a ? !0 : axs.utils.isAncestor(a, b.parentNode);\n};\naxs.utils.overlappingElements = function(a) {\n  if (axs.utils.elementHasZeroArea(a)) {\n    return null;\n  }\n  for (var b = [], c = a.getClientRects(), d = 0;d < c.length;d++) {\n    var e = c[d], e = document.elementFromPoint((e.left + e.right) / 2, (e.top + e.bottom) / 2);\n    if (null != e && e != a && !axs.utils.isAncestor(e, a) && !axs.utils.isAncestor(a, e)) {\n      var f = window.getComputedStyle(e, null);\n      f && (f = axs.utils.getBgColor(f, e)) && 0 < f.alpha && 0 > b.indexOf(e) && b.push(e);\n    }\n  }\n  return b;\n};\naxs.utils.elementIsHtmlControl = function(a) {\n  var b = a.ownerDocument.defaultView;\n  return a instanceof b.HTMLButtonElement || a instanceof b.HTMLInputElement || a instanceof b.HTMLSelectElement || a instanceof b.HTMLTextAreaElement ? !0 : !1;\n};\naxs.utils.elementIsAriaWidget = function(a) {\n  return a.hasAttribute(\"role\") && (a = a.getAttribute(\"role\")) && (a = axs.constants.ARIA_ROLES[a]) && \"widget\" in a.allParentRolesSet ? !0 : !1;\n};\naxs.utils.elementIsVisible = function(a) {\n  return axs.utils.elementIsTransparent(a) || axs.utils.elementHasZeroArea(a) || axs.utils.elementIsOutsideScrollArea(a) || axs.utils.overlappingElements(a).length ? !1 : !0;\n};\naxs.utils.isLargeFont = function(a) {\n  var b = a.fontSize;\n  a = \"bold\" == a.fontWeight;\n  var c = b.match(/(\\d+)px/);\n  if (c) {\n    b = parseInt(c[1], 10);\n    if (c = window.getComputedStyle(document.body, null).fontSize.match(/(\\d+)px/)) {\n      var d = parseInt(c[1], 10), c = 1.2 * d, d = 1.5 * d\n    } else {\n      c = 19.2, d = 24;\n    }\n    return a && b >= c || b >= d;\n  }\n  if (c = b.match(/(\\d+)em/)) {\n    return b = parseInt(c[1], 10), a && 1.2 <= b || 1.5 <= b ? !0 : !1;\n  }\n  if (c = b.match(/(\\d+)%/)) {\n    return b = parseInt(c[1], 10), a && 120 <= b || 150 <= b ? !0 : !1;\n  }\n  if (c = b.match(/(\\d+)pt/)) {\n    if (b = parseInt(c[1], 10), a && 14 <= b || 18 <= b) {\n      return !0;\n    }\n  }\n  return !1;\n};\naxs.utils.getBgColor = function(a, b) {\n  var c = axs.color.parseColor(a.backgroundColor);\n  if (!c) {\n    return null;\n  }\n  1 > a.opacity && (c.alpha *= a.opacity);\n  if (1 > c.alpha) {\n    var d = axs.utils.getParentBgColor(b);\n    if (null == d) {\n      return null;\n    }\n    c = axs.color.flattenColors(c, d);\n  }\n  return c;\n};\naxs.utils.getParentBgColor = function(a) {\n  var b = a;\n  a = [];\n  for (var c = null;b = axs.utils.parentElement(b);) {\n    var d = window.getComputedStyle(b, null);\n    if (d) {\n      var e = axs.color.parseColor(d.backgroundColor);\n      if (e && (1 > d.opacity && (e.alpha *= d.opacity), 0 != e.alpha && (a.push(e), 1 == e.alpha))) {\n        c = !0;\n        break;\n      }\n    }\n  }\n  c || a.push(new axs.color.Color(255, 255, 255, 1));\n  for (b = a.pop();a.length;) {\n    c = a.pop(), b = axs.color.flattenColors(c, b);\n  }\n  return b;\n};\naxs.utils.getFgColor = function(a, b, c) {\n  var d = axs.color.parseColor(a.color);\n  if (!d) {\n    return null;\n  }\n  1 > d.alpha && (d = axs.color.flattenColors(d, c));\n  1 > a.opacity && (b = axs.utils.getParentBgColor(b), d.alpha *= a.opacity, d = axs.color.flattenColors(d, b));\n  return d;\n};\naxs.utils.getContrastRatioForElement = function(a) {\n  var b = window.getComputedStyle(a, null);\n  return axs.utils.getContrastRatioForElementWithComputedStyle(b, a);\n};\naxs.utils.getContrastRatioForElementWithComputedStyle = function(a, b) {\n  if (axs.utils.isElementHidden(b)) {\n    return null;\n  }\n  var c = axs.utils.getBgColor(a, b);\n  if (!c) {\n    return null;\n  }\n  var d = axs.utils.getFgColor(a, b, c);\n  return d ? axs.color.calculateContrastRatio(d, c) : null;\n};\naxs.utils.isNativeTextElement = function(a) {\n  var b = a.tagName.toLowerCase();\n  a = a.type ? a.type.toLowerCase() : \"\";\n  if (\"textarea\" == b) {\n    return !0;\n  }\n  if (\"input\" != b) {\n    return !1;\n  }\n  switch(a) {\n    case \"email\":\n    ;\n    case \"number\":\n    ;\n    case \"password\":\n    ;\n    case \"search\":\n    ;\n    case \"text\":\n    ;\n    case \"tel\":\n    ;\n    case \"url\":\n    ;\n    case \"\":\n      return !0;\n    default:\n      return !1;\n  }\n};\naxs.utils.isLowContrast = function(a, b, c) {\n  a = Math.round(10 * a) / 10;\n  return c ? 4.5 > a || !axs.utils.isLargeFont(b) && 7 > a : 3 > a || !axs.utils.isLargeFont(b) && 4.5 > a;\n};\naxs.utils.hasLabel = function(a) {\n  var b = a.tagName.toLowerCase(), c = a.type ? a.type.toLowerCase() : \"\";\n  if (a.hasAttribute(\"aria-label\") || a.hasAttribute(\"title\") || \"img\" == b && a.hasAttribute(\"alt\") || \"input\" == b && \"image\" == c && a.hasAttribute(\"alt\") || \"input\" == b && (\"submit\" == c || \"reset\" == c) || a.hasAttribute(\"aria-labelledby\") || a.hasAttribute(\"id\") && 0 < document.querySelectorAll('label[for=\"' + a.id + '\"]').length) {\n    return !0;\n  }\n  for (b = axs.utils.parentElement(a);b;) {\n    if (\"label\" == b.tagName.toLowerCase() && b.control == a) {\n      return !0;\n    }\n    b = axs.utils.parentElement(b);\n  }\n  return !1;\n};\naxs.utils.isNativelyDisableable = function(a) {\n  return a.tagName.toUpperCase() in axs.constants.NATIVELY_DISABLEABLE;\n};\naxs.utils.isElementDisabled = function(a) {\n  if (axs.browserUtils.matchSelector(a, \"[aria-disabled=true], [aria-disabled=true] *\")) {\n    return !0;\n  }\n  if (!axs.utils.isNativelyDisableable(a) || axs.browserUtils.matchSelector(a, \"fieldset>legend:first-of-type *\")) {\n    return !1;\n  }\n  for (;null !== a;a = axs.utils.parentElement(a)) {\n    if (axs.utils.isNativelyDisableable(a) && a.hasAttribute(\"disabled\")) {\n      return !0;\n    }\n  }\n  return !1;\n};\naxs.utils.isElementHidden = function(a) {\n  if (!(a instanceof a.ownerDocument.defaultView.HTMLElement)) {\n    return !1;\n  }\n  if (a.hasAttribute(\"chromevoxignoreariahidden\")) {\n    var b = !0\n  }\n  var c = window.getComputedStyle(a, null);\n  return \"none\" == c.display || \"hidden\" == c.visibility ? !0 : a.hasAttribute(\"aria-hidden\") && \"true\" == a.getAttribute(\"aria-hidden\").toLowerCase() ? !b : !1;\n};\naxs.utils.isElementOrAncestorHidden = function(a) {\n  return axs.utils.isElementHidden(a) ? !0 : axs.utils.parentElement(a) ? axs.utils.isElementOrAncestorHidden(axs.utils.parentElement(a)) : !1;\n};\naxs.utils.isInlineElement = function(a) {\n  a = a.tagName.toUpperCase();\n  return axs.constants.InlineElements[a];\n};\naxs.utils.getRoles = function(a, b) {\n  if (!a || a.nodeType !== Node.ELEMENT_NODE || !a.hasAttribute(\"role\") && !b) {\n    return null;\n  }\n  var c = a.getAttribute(\"role\");\n  !c && b && (c = axs.properties.getImplicitRole(a));\n  if (!c) {\n    return null;\n  }\n  for (var c = c.split(\" \"), d = {roles:[], valid:!1}, e = 0;e < c.length;e++) {\n    var f = c[e], g = axs.constants.ARIA_ROLES[f], f = {name:f};\n    g && !g.abstract ? (f.details = g, d.applied || (d.applied = f), f.valid = d.valid = !0) : f.valid = !1;\n    d.roles.push(f);\n  }\n  return d;\n};\naxs.utils.getAriaPropertyValue = function(a, b, c) {\n  var d = a.replace(/^aria-/, \"\"), e = axs.constants.ARIA_PROPERTIES[d], d = {name:a, rawValue:b};\n  if (!e) {\n    return d.valid = !1, d.reason = '\"' + a + '\" is not a valid ARIA property', d;\n  }\n  e = e.valueType;\n  if (!e) {\n    return d.valid = !1, d.reason = '\"' + a + '\" is not a valid ARIA property', d;\n  }\n  switch(e) {\n    case \"idref\":\n      a = axs.utils.isValidIDRefValue(b, c), d.valid = a.valid, d.reason = a.reason, d.idref = a.idref;\n    case \"idref_list\":\n      a = b.split(/\\s+/);\n      d.valid = !0;\n      for (b = 0;b < a.length;b++) {\n        e = axs.utils.isValidIDRefValue(a[b], c), e.valid || (d.valid = !1), d.values ? d.values.push(e) : d.values = [e];\n      }\n      return d;\n    case \"integer\":\n      c = axs.utils.isValidNumber(b);\n      if (!c.valid) {\n        return d.valid = !1, d.reason = c.reason, d;\n      }\n      Math.floor(c.value) !== c.value ? (d.valid = !1, d.reason = \"\" + b + \" is not a whole integer\") : (d.valid = !0, d.value = c.value);\n      return d;\n    case \"decimal\":\n    ;\n    case \"number\":\n      c = axs.utils.isValidNumber(b);\n      d.valid = c.valid;\n      if (!c.valid) {\n        return d.reason = c.reason, d;\n      }\n      d.value = c.value;\n      return d;\n    case \"string\":\n      return d.valid = !0, d.value = b, d;\n    case \"token\":\n      return c = axs.utils.isValidTokenValue(a, b.toLowerCase()), c.valid ? (d.valid = !0, d.value = c.value) : (d.valid = !1, d.value = b, d.reason = c.reason), d;\n    case \"token_list\":\n      e = b.split(/\\s+/);\n      d.valid = !0;\n      for (b = 0;b < e.length;b++) {\n        c = axs.utils.isValidTokenValue(a, e[b].toLowerCase()), c.valid || (d.valid = !1, d.reason ? (d.reason = [d.reason], d.reason.push(c.reason)) : (d.reason = c.reason, d.possibleValues = c.possibleValues)), d.values ? d.values.push(c.value) : d.values = [c.value];\n      }\n      return d;\n    case \"tristate\":\n      return c = axs.utils.isPossibleValue(b.toLowerCase(), axs.constants.MIXED_VALUES, a), c.valid ? (d.valid = !0, d.value = c.value) : (d.valid = !1, d.value = b, d.reason = c.reason), d;\n    case \"boolean\":\n      return c = axs.utils.isValidBoolean(b), c.valid ? (d.valid = !0, d.value = c.value) : (d.valid = !1, d.value = b, d.reason = c.reason), d;\n  }\n  d.valid = !1;\n  d.reason = \"Not a valid ARIA property\";\n  return d;\n};\naxs.utils.isValidTokenValue = function(a, b) {\n  var c = a.replace(/^aria-/, \"\");\n  return axs.utils.isPossibleValue(b, axs.constants.ARIA_PROPERTIES[c].valuesSet, a);\n};\naxs.utils.isPossibleValue = function(a, b, c) {\n  return b[a] ? {valid:!0, value:a} : {valid:!1, value:a, reason:'\"' + a + '\" is not a valid value for ' + c, possibleValues:Object.keys(b)};\n};\naxs.utils.isValidBoolean = function(a) {\n  try {\n    var b = JSON.parse(a);\n  } catch (c) {\n    b = \"\";\n  }\n  return \"boolean\" != typeof b ? {valid:!1, value:a, reason:'\"' + a + '\" is not a true/false value'} : {valid:!0, value:b};\n};\naxs.utils.isValidIDRefValue = function(a, b) {\n  return 0 == a.length ? {valid:!0, idref:a} : b.ownerDocument.getElementById(a) ? {valid:!0, idref:a} : {valid:!1, idref:a, reason:'No element with ID \"' + a + '\"'};\n};\naxs.utils.isValidNumber = function(a) {\n  var b = {valid:!1, value:a, reason:'\"' + a + '\" is not a number'};\n  if (!a) {\n    return b;\n  }\n  if (/^0x/i.test(a)) {\n    return b.reason = '\"' + a + '\" is not a decimal number', b;\n  }\n  a *= 1;\n  return isFinite(a) ? {valid:!0, value:a} : b;\n};\naxs.utils.isElementImplicitlyFocusable = function(a) {\n  var b = a.ownerDocument.defaultView;\n  return a instanceof b.HTMLAnchorElement || a instanceof b.HTMLAreaElement ? a.hasAttribute(\"href\") : a instanceof b.HTMLInputElement || a instanceof b.HTMLSelectElement || a instanceof b.HTMLTextAreaElement || a instanceof b.HTMLButtonElement || a instanceof b.HTMLIFrameElement ? !a.disabled : !1;\n};\naxs.utils.values = function(a) {\n  var b = [], c;\n  for (c in a) {\n    a.hasOwnProperty(c) && \"function\" != typeof a[c] && b.push(a[c]);\n  }\n  return b;\n};\naxs.utils.namedValues = function(a) {\n  var b = {}, c;\n  for (c in a) {\n    a.hasOwnProperty(c) && \"function\" != typeof a[c] && (b[c] = a[c]);\n  }\n  return b;\n};\naxs.utils.getQuerySelectorText = function(a) {\n  if (null == a || \"HTML\" == a.tagName) {\n    return \"html\";\n  }\n  if (\"BODY\" == a.tagName) {\n    return \"body\";\n  }\n  if (a.hasAttribute) {\n    if (a.id) {\n      return \"#\" + a.id;\n    }\n    if (a.className) {\n      for (var b = \"\", c = 0;c < a.classList.length;c++) {\n        b += \".\" + a.classList[c];\n      }\n      var d = 0;\n      if (a.parentNode) {\n        for (c = 0;c < a.parentNode.children.length;c++) {\n          var e = a.parentNode.children[c];\n          axs.browserUtils.matchSelector(e, b) && d++;\n          if (e === a) {\n            break;\n          }\n        }\n      } else {\n        d = 1;\n      }\n      if (1 == d) {\n        return axs.utils.getQuerySelectorText(a.parentNode) + \" > \" + b;\n      }\n    }\n    if (a.parentNode) {\n      b = a.parentNode.children;\n      d = 1;\n      for (c = 0;b[c] !== a;) {\n        b[c].tagName == a.tagName && d++, c++;\n      }\n      c = \"\";\n      \"BODY\" != a.parentNode.tagName && (c = axs.utils.getQuerySelectorText(a.parentNode) + \" > \");\n      return 1 == d ? c + a.tagName : c + a.tagName + \":nth-of-type(\" + d + \")\";\n    }\n  } else {\n    if (a.selectorText) {\n      return a.selectorText;\n    }\n  }\n  return \"\";\n};\naxs.utils.getIdReferrers = function(a, b) {\n  if (!b) {\n    return null;\n  }\n  var c = b.id, d = a.replace(/^aria-/, \"\"), d = axs.constants.ARIA_PROPERTIES[d];\n  if (!c || !d) {\n    return null;\n  }\n  d = d.valueType;\n  return \"idref_list\" === d || \"idref\" === d ? (c = c.replace(/'/g, \"\\\\'\"), b.ownerDocument.querySelectorAll(\"[\" + a + \"~='\" + c + \"']\")) : null;\n};\naxs.utils.getIdReferents = function(a, b) {\n  var c = [], d = a.replace(/^aria-/, \"\"), d = axs.constants.ARIA_PROPERTIES[d];\n  if (!d || !b.hasAttribute(a)) {\n    return c;\n  }\n  d = d.valueType;\n  if (\"idref_list\" === d || \"idref\" === d) {\n    for (var d = b.ownerDocument, e = b.getAttribute(a), e = e.split(/\\s+/), f = 0, g = e.length;f < g;f++) {\n      var h = d.getElementById(e[f]);\n      h && (c[c.length] = h);\n    }\n  }\n  return c;\n};\naxs.utils.getAriaPropertiesByValueType = function(a) {\n  var b = {}, c;\n  for (c in axs.constants.ARIA_PROPERTIES) {\n    var d = axs.constants.ARIA_PROPERTIES[c];\n    d && 0 <= a.indexOf(d.valueType) && (b[c] = d);\n  }\n  return b;\n};\naxs.utils.getSelectorForAriaProperties = function(a) {\n  a = Object.keys(a).map(function(a) {\n    return \"[aria-\" + a + \"]\";\n  });\n  a.sort();\n  return a.join(\",\");\n};\naxs.utils.findDescendantsWithRole = function(a, b) {\n  if (!a || !b) {\n    return [];\n  }\n  var c = axs.properties.getSelectorForRole(b);\n  if (c && (c = a.querySelectorAll(c))) {\n    c = Array.prototype.map.call(c, function(a) {\n      return a;\n    });\n  } else {\n    return [];\n  }\n  return c;\n};\naxs.properties = {};\naxs.properties.TEXT_CONTENT_XPATH = './/text()[normalize-space(.)!=\"\"]/parent::*[name()!=\"script\"]';\naxs.properties.getFocusProperties = function(a) {\n  var b = {}, c = a.getAttribute(\"tabindex\");\n  void 0 != c ? b.tabindex = {value:c, valid:!0} : axs.utils.isElementImplicitlyFocusable(a) && (b.implicitlyFocusable = {value:!0, valid:!0});\n  if (0 == Object.keys(b).length) {\n    return null;\n  }\n  var d = axs.utils.elementIsTransparent(a), e = axs.utils.elementHasZeroArea(a), f = axs.utils.elementIsOutsideScrollArea(a), g = axs.utils.overlappingElements(a);\n  if (d || e || f || 0 < g.length) {\n    var c = axs.utils.isElementOrAncestorHidden(a), h = {value:!1, valid:c};\n    d && (h.transparent = !0);\n    e && (h.zeroArea = !0);\n    f && (h.outsideScrollArea = !0);\n    g && 0 < g.length && (h.overlappingElements = g);\n    d = {value:c, valid:c};\n    c && (d.reason = axs.properties.getHiddenReason(a));\n    h.hidden = d;\n    b.visible = h;\n  } else {\n    b.visible = {value:!0, valid:!0};\n  }\n  return b;\n};\naxs.properties.getHiddenReason = function(a) {\n  if (!(a && a instanceof a.ownerDocument.defaultView.HTMLElement)) {\n    return null;\n  }\n  if (a.hasAttribute(\"chromevoxignoreariahidden\")) {\n    var b = !0\n  }\n  var c = window.getComputedStyle(a, null);\n  return \"none\" == c.display ? {property:\"display: none\", on:a} : \"hidden\" == c.visibility ? {property:\"visibility: hidden\", on:a} : a.hasAttribute(\"aria-hidden\") && \"true\" == a.getAttribute(\"aria-hidden\").toLowerCase() && !b ? {property:\"aria-hidden\", on:a} : axs.properties.getHiddenReason(axs.utils.parentElement(a));\n};\naxs.properties.getColorProperties = function(a) {\n  var b = {};\n  (a = axs.properties.getContrastRatioProperties(a)) && (b.contrastRatio = a);\n  return 0 == Object.keys(b).length ? null : b;\n};\naxs.properties.hasDirectTextDescendant = function(a) {\n  function b() {\n    for (var b = c.evaluate(axs.properties.TEXT_CONTENT_XPATH, a, null, XPathResult.ANY_TYPE, null), e = b.iterateNext();null != e;e = b.iterateNext()) {\n      if (e === a) {\n        return !0;\n      }\n    }\n    return !1;\n  }\n  var c;\n  c = a.nodeType == Node.DOCUMENT_NODE ? a : a.ownerDocument;\n  return c.evaluate ? b() : function() {\n    for (var b = c.createTreeWalker(a, NodeFilter.SHOW_TEXT, null, !1);b.nextNode();) {\n      var e = b.currentNode, f = e.parentNode.tagName.toLowerCase();\n      if (e.nodeValue.trim() && \"script\" !== f && a !== e) {\n        return !0;\n      }\n    }\n    return !1;\n  }();\n};\naxs.properties.getContrastRatioProperties = function(a) {\n  if (!axs.properties.hasDirectTextDescendant(a)) {\n    return null;\n  }\n  var b = {}, c = window.getComputedStyle(a, null), d = axs.utils.getBgColor(c, a);\n  if (!d) {\n    return null;\n  }\n  b.backgroundColor = axs.color.colorToString(d);\n  var e = axs.utils.getFgColor(c, a, d);\n  b.foregroundColor = axs.color.colorToString(e);\n  a = axs.utils.getContrastRatioForElementWithComputedStyle(c, a);\n  if (!a) {\n    return null;\n  }\n  b.value = a.toFixed(2);\n  axs.utils.isLowContrast(a, c) && (b.alert = !0);\n  var f = axs.utils.isLargeFont(c) ? 3 : 4.5, c = axs.utils.isLargeFont(c) ? 4.5 : 7, g = {};\n  f > a && (g.AA = f);\n  c > a && (g.AAA = c);\n  if (!Object.keys(g).length) {\n    return b;\n  }\n  (d = axs.color.suggestColors(d, e, g)) && Object.keys(d).length && (b.suggestedColors = d);\n  return b;\n};\naxs.properties.findTextAlternatives = function(a, b, c, d) {\n  var e = c || !1;\n  c = axs.utils.asElement(a);\n  if (!c || !e && !d && axs.utils.isElementOrAncestorHidden(c)) {\n    return null;\n  }\n  if (a.nodeType == Node.TEXT_NODE) {\n    return c = {type:\"text\"}, c.text = a.textContent, c.lastWord = axs.properties.getLastWord(c.text), b.content = c, a.textContent;\n  }\n  a = null;\n  e || (a = axs.properties.getTextFromAriaLabelledby(c, b));\n  c.hasAttribute(\"aria-label\") && (d = {type:\"text\"}, d.text = c.getAttribute(\"aria-label\"), d.lastWord = axs.properties.getLastWord(d.text), a ? d.unused = !0 : e && axs.utils.elementIsHtmlControl(c) || (a = d.text), b.ariaLabel = d);\n  c.hasAttribute(\"role\") && \"presentation\" == c.getAttribute(\"role\") || (a = axs.properties.getTextFromHostLanguageAttributes(c, b, a, e));\n  if (e && axs.utils.elementIsHtmlControl(c)) {\n    d = c.ownerDocument.defaultView;\n    if (c instanceof d.HTMLInputElement) {\n      var f = c;\n      \"text\" == f.type && f.value && 0 < f.value.length && (b.controlValue = {text:f.value});\n      \"range\" == f.type && (b.controlValue = {text:f.value});\n    }\n    c instanceof d.HTMLSelectElement && (b.controlValue = {text:c.value});\n    b.controlValue && (d = b.controlValue, a ? d.unused = !0 : a = d.text);\n  }\n  if (e && axs.utils.elementIsAriaWidget(c)) {\n    e = c.getAttribute(\"role\");\n    \"textbox\" == e && c.textContent && 0 < c.textContent.length && (b.controlValue = {text:c.textContent});\n    if (\"slider\" == e || \"spinbutton\" == e) {\n      c.hasAttribute(\"aria-valuetext\") ? b.controlValue = {text:c.getAttribute(\"aria-valuetext\")} : c.hasAttribute(\"aria-valuenow\") && (b.controlValue = {value:c.getAttribute(\"aria-valuenow\"), text:\"\" + c.getAttribute(\"aria-valuenow\")});\n    }\n    if (\"menu\" == e) {\n      var g = c.querySelectorAll(\"[role=menuitemcheckbox], [role=menuitemradio]\");\n      d = [];\n      for (f = 0;f < g.length;f++) {\n        \"true\" == g[f].getAttribute(\"aria-checked\") && d.push(g[f]);\n      }\n      if (0 < d.length) {\n        g = \"\";\n        for (f = 0;f < d.length;f++) {\n          g += axs.properties.findTextAlternatives(d[f], {}, !0), f < d.length - 1 && (g += \", \");\n        }\n        b.controlValue = {text:g};\n      }\n    }\n    if (\"combobox\" == e || \"select\" == e) {\n      b.controlValue = {text:\"TODO\"};\n    }\n    b.controlValue && (d = b.controlValue, a ? d.unused = !0 : a = d.text);\n  }\n  d = !0;\n  c.hasAttribute(\"role\") && (e = c.getAttribute(\"role\"), (e = axs.constants.ARIA_ROLES[e]) && (!e.namefrom || 0 > e.namefrom.indexOf(\"contents\")) && (d = !1));\n  (e = axs.properties.getTextFromDescendantContent(c)) && d && (d = {type:\"text\"}, d.text = e, d.lastWord = axs.properties.getLastWord(d.text), a ? d.unused = !0 : a = e, b.content = d);\n  c.hasAttribute(\"title\") && (e = {type:\"string\", valid:!0}, e.text = c.getAttribute(\"title\"), e.lastWord = axs.properties.getLastWord(e.lastWord), a ? e.unused = !0 : a = e.text, b.title = e);\n  return 0 == Object.keys(b).length && null == a ? null : a;\n};\naxs.properties.getTextFromDescendantContent = function(a) {\n  var b = a.childNodes;\n  a = [];\n  for (var c = 0;c < b.length;c++) {\n    var d = axs.properties.findTextAlternatives(b[c], {}, !0);\n    d && a.push(d.trim());\n  }\n  if (a.length) {\n    b = \"\";\n    for (c = 0;c < a.length;c++) {\n      b = [b, a[c]].join(\" \").trim();\n    }\n    return b;\n  }\n  return null;\n};\naxs.properties.getTextFromAriaLabelledby = function(a, b) {\n  var c = null;\n  if (!a.hasAttribute(\"aria-labelledby\")) {\n    return c;\n  }\n  for (var d = a.getAttribute(\"aria-labelledby\").split(/\\s+/), e = {valid:!0}, f = [], g = [], h = 0;h < d.length;h++) {\n    var k = {type:\"element\"}, m = d[h];\n    k.value = m;\n    var l = document.getElementById(m);\n    l ? (k.valid = !0, k.text = axs.properties.findTextAlternatives(l, {}, !0), k.lastWord = axs.properties.getLastWord(k.text), f.push(l.textContent.trim()), k.element = l) : (k.valid = !1, e.valid = !1, k.errorMessage = {messageKey:\"noElementWithId\", args:[m]});\n    g.push(k);\n  }\n  0 < g.length && (g[g.length - 1].last = !0, e.values = g, e.text = f.join(\" \"), e.lastWord = axs.properties.getLastWord(e.text), c = e.text, b.ariaLabelledby = e);\n  return c;\n};\naxs.properties.getTextFromHostLanguageAttributes = function(a, b, c, d) {\n  if (axs.browserUtils.matchSelector(a, \"img\") && a.hasAttribute(\"alt\")) {\n    var e = {type:\"string\", valid:!0};\n    e.text = a.getAttribute(\"alt\");\n    c ? e.unused = !0 : c = e.text;\n    b.alt = e;\n  }\n  if (axs.browserUtils.matchSelector(a, 'input:not([type=\"hidden\"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), video:not([disabled])') && !d) {\n    if (a.hasAttribute(\"id\")) {\n      d = document.querySelectorAll('label[for=\"' + a.id + '\"]');\n      for (var e = {}, f = [], g = [], h = 0;h < d.length;h++) {\n        var k = {type:\"element\"}, m = d[h], l = axs.properties.findTextAlternatives(m, {}, !0);\n        l && 0 < l.trim().length && (k.text = l.trim(), g.push(l.trim()));\n        k.element = m;\n        f.push(k);\n      }\n      0 < f.length && (f[f.length - 1].last = !0, e.values = f, e.text = g.join(\" \"), e.lastWord = axs.properties.getLastWord(e.text), c ? e.unused = !0 : c = e.text, b.labelFor = e);\n    }\n    d = axs.utils.parentElement(a);\n    for (e = {};d;) {\n      if (\"label\" == d.tagName.toLowerCase() && (f = d, f.control == a)) {\n        e.type = \"element\";\n        e.text = axs.properties.findTextAlternatives(f, {}, !0);\n        e.lastWord = axs.properties.getLastWord(e.text);\n        e.element = f;\n        break;\n      }\n      d = axs.utils.parentElement(d);\n    }\n    e.text && (c ? e.unused = !0 : c = e.text, b.labelWrapped = e);\n    Object.keys(b).length || (b.noLabel = !0);\n  }\n  return c;\n};\naxs.properties.getLastWord = function(a) {\n  if (!a) {\n    return null;\n  }\n  var b = a.lastIndexOf(\" \") + 1, c = a.length - 10;\n  return a.substring(b > c ? b : c);\n};\naxs.properties.getTextProperties = function(a) {\n  var b = {}, c = axs.properties.findTextAlternatives(a, b, !1, !0);\n  if (0 == Object.keys(b).length && ((a = axs.utils.asElement(a)) && axs.browserUtils.matchSelector(a, \"img\") && (b.alt = {valid:!1, errorMessage:\"No alt value provided\"}, a = a.src, \"string\" == typeof a && (c = a.split(\"/\").pop(), b.filename = {text:c})), !c)) {\n    return null;\n  }\n  b.hasProperties = Boolean(Object.keys(b).length);\n  b.computedText = c;\n  b.lastWord = axs.properties.getLastWord(c);\n  return b;\n};\naxs.properties.getAriaProperties = function(a) {\n  var b = {}, c = axs.properties.getGlobalAriaProperties(a), d;\n  for (d in axs.constants.ARIA_PROPERTIES) {\n    var e = \"aria-\" + d;\n    if (a.hasAttribute(e)) {\n      var f = a.getAttribute(e);\n      c[e] = axs.utils.getAriaPropertyValue(e, f, a);\n    }\n  }\n  0 < Object.keys(c).length && (b.properties = axs.utils.values(c));\n  f = axs.utils.getRoles(a);\n  if (!f) {\n    return Object.keys(b).length ? b : null;\n  }\n  b.roles = f;\n  if (!f.valid || !f.roles) {\n    return b;\n  }\n  for (var e = f.roles, g = 0;g < e.length;g++) {\n    var h = e[g];\n    if (h.details && h.details.propertiesSet) {\n      for (d in h.details.propertiesSet) {\n        d in c || (a.hasAttribute(d) ? (f = a.getAttribute(d), c[d] = axs.utils.getAriaPropertyValue(d, f, a), \"values\" in c[d] && (f = c[d].values, f[f.length - 1].isLast = !0)) : h.details.requiredPropertiesSet[d] && (c[d] = {name:d, valid:!1, reason:\"Required property not set\"}));\n      }\n    }\n  }\n  0 < Object.keys(c).length && (b.properties = axs.utils.values(c));\n  return 0 < Object.keys(b).length ? b : null;\n};\naxs.properties.getGlobalAriaProperties = function(a) {\n  var b = {}, c;\n  for (c in axs.constants.GLOBAL_PROPERTIES) {\n    if (a.hasAttribute(c)) {\n      var d = a.getAttribute(c);\n      b[c] = axs.utils.getAriaPropertyValue(c, d, a);\n    }\n  }\n  return b;\n};\naxs.properties.getVideoProperties = function(a) {\n  if (!axs.browserUtils.matchSelector(a, \"video\")) {\n    return null;\n  }\n  var b = {};\n  b.captionTracks = axs.properties.getTrackElements(a, \"captions\");\n  b.descriptionTracks = axs.properties.getTrackElements(a, \"descriptions\");\n  b.chapterTracks = axs.properties.getTrackElements(a, \"chapters\");\n  return b;\n};\naxs.properties.getTrackElements = function(a, b) {\n  var c = a.querySelectorAll(\"track[kind=\" + b + \"]\"), d = {};\n  if (!c.length) {\n    return d.valid = !1, d.reason = {messageKey:\"noTracksProvided\", args:[[b]]}, d;\n  }\n  d.valid = !0;\n  for (var e = [], f = 0;f < c.length;f++) {\n    var g = {}, h = c[f].getAttribute(\"src\"), k = c[f].getAttribute(\"srcLang\"), m = c[f].getAttribute(\"label\");\n    h ? (g.valid = !0, g.src = h) : (g.valid = !1, g.reason = {messageKey:\"noSrcProvided\"});\n    h = \"\";\n    m && (h += m, k && (h += \" \"));\n    k && (h += \"(\" + k + \")\");\n    \"\" == h && (h = \"[[object Object]]\");\n    g.name = h;\n    e.push(g);\n  }\n  d.values = e;\n  return d;\n};\naxs.properties.getAllProperties = function(a) {\n  var b = axs.utils.asElement(a);\n  if (!b) {\n    return {};\n  }\n  var c = {};\n  c.ariaProperties = axs.properties.getAriaProperties(b);\n  c.colorProperties = axs.properties.getColorProperties(b);\n  c.focusProperties = axs.properties.getFocusProperties(b);\n  c.textProperties = axs.properties.getTextProperties(a);\n  c.videoProperties = axs.properties.getVideoProperties(b);\n  return c;\n};\n(function() {\n  function a(a) {\n    if (!a) {\n      return null;\n    }\n    var c = a.tagName;\n    if (!c) {\n      return null;\n    }\n    c = c.toUpperCase();\n    c = axs.constants.TAG_TO_IMPLICIT_SEMANTIC_INFO[c];\n    if (!c || !c.length) {\n      return null;\n    }\n    for (var d = null, e = 0, f = c.length;e < f;e++) {\n      var g = c[e];\n      if (g.selector) {\n        if (axs.browserUtils.matchSelector(a, g.selector)) {\n          return g;\n        }\n      } else {\n        d = g;\n      }\n    }\n    return d;\n  }\n  axs.properties.getImplicitRole = function(b) {\n    return (b = a(b)) ? b.role : \"\";\n  };\n  axs.properties.canTakeAriaAttributes = function(b) {\n    return (b = a(b)) ? !b.reserved : !0;\n  };\n})();\naxs.properties.getNativelySupportedAttributes = function(a) {\n  var b = [];\n  if (!a) {\n    return b;\n  }\n  a = a.cloneNode(!1);\n  for (var c = Object.keys(axs.constants.ARIA_TO_HTML_ATTRIBUTE), d = 0;d < c.length;d++) {\n    var e = c[d];\n    axs.constants.ARIA_TO_HTML_ATTRIBUTE[e] in a && (b[b.length] = e);\n  }\n  return b;\n};\n(function() {\n  var a = {};\n  axs.properties.getSelectorForRole = function(b) {\n    if (!b) {\n      return \"\";\n    }\n    if (a[b] && a.hasOwnProperty(b)) {\n      return a[b];\n    }\n    var c = ['[role=\"' + b + '\"]'];\n    Object.keys(axs.constants.TAG_TO_IMPLICIT_SEMANTIC_INFO).forEach(function(a) {\n      var e = axs.constants.TAG_TO_IMPLICIT_SEMANTIC_INFO[a];\n      if (e && e.length) {\n        for (var f = 0;f < e.length;f++) {\n          var g = e[f];\n          if (g.role === b) {\n            if (g.selector) {\n              c[c.length] = g.selector;\n            } else {\n              c[c.length] = a;\n              break;\n            }\n          }\n        }\n      }\n    });\n    return a[b] = c.join(\",\");\n  };\n})();\naxs.AuditRule = function(a) {\n  for (var b = !0, c = [], d = 0;d < axs.AuditRule.requiredFields.length;d++) {\n    var e = axs.AuditRule.requiredFields[d];\n    e in a || (b = !1, c.push(e));\n  }\n  if (!b) {\n    throw \"Invalid spec; the following fields were not specified: \" + c.join(\", \") + \"\\n\" + JSON.stringify(a);\n  }\n  this.name = a.name;\n  this.severity = a.severity;\n  this.relevantElementMatcher_ = a.relevantElementMatcher;\n  this.test_ = a.test;\n  this.code = a.code;\n  this.heading = a.heading || \"\";\n  this.url = a.url || \"\";\n  this.requiresConsoleAPI = !!a.opt_requiresConsoleAPI;\n};\naxs.AuditRule.requiredFields = \"name severity relevantElementMatcher test code heading\".split(\" \");\naxs.AuditRule.NOT_APPLICABLE = {result:axs.constants.AuditResult.NA};\naxs.AuditRule.prototype.addElement = function(a, b) {\n  a.push(b);\n};\naxs.AuditRule.collectMatchingElements = function(a, b, c, d) {\n  if (a.nodeType == Node.ELEMENT_NODE) {\n    var e = a\n  }\n  e && b.call(null, e) && c.push(e);\n  if (e) {\n    var f = e.shadowRoot || e.webkitShadowRoot;\n    if (f) {\n      axs.AuditRule.collectMatchingElements(f, b, c, f);\n      return;\n    }\n  }\n  if (e && \"content\" == e.localName) {\n    for (var f = e.getDistributedNodes(), g = 0;g < f.length;g++) {\n      axs.AuditRule.collectMatchingElements(f[g], b, c, d);\n    }\n  } else {\n    if (e && \"shadow\" == e.localName) {\n      if (f = e, d) {\n        for (f = f.getDistributedNodes(), g = 0;g < f.length;g++) {\n          axs.AuditRule.collectMatchingElements(f[g], b, c, d);\n        }\n      } else {\n        console.warn(\"ShadowRoot not provided for\", e);\n      }\n    }\n    e && \"iframe\" == e.localName && e.contentDocument && axs.AuditRule.collectMatchingElements(e.contentDocument, b, c, d);\n    for (a = a.firstChild;null != a;) {\n      axs.AuditRule.collectMatchingElements(a, b, c, d), a = a.nextSibling;\n    }\n  }\n};\naxs.AuditRule.prototype.run = function(a) {\n  a = a || {};\n  var b = \"ignoreSelectors\" in a ? a.ignoreSelectors : [], c = \"maxResults\" in a ? a.maxResults : null, d = [];\n  axs.AuditRule.collectMatchingElements(\"scope\" in a ? a.scope : document, this.relevantElementMatcher_, d);\n  var e = [];\n  if (!d.length) {\n    return {result:axs.constants.AuditResult.NA};\n  }\n  for (var f = 0;f < d.length && !(null != c && e.length >= c);f++) {\n    var g = d[f], h;\n    a: {\n      h = g;\n      for (var k = 0;k < b.length;k++) {\n        if (axs.browserUtils.matchSelector(h, b[k])) {\n          h = !0;\n          break a;\n        }\n      }\n      h = !1;\n    }\n    !h && this.test_(g, a.config) && this.addElement(e, g);\n  }\n  a = {result:e.length ? axs.constants.AuditResult.FAIL : axs.constants.AuditResult.PASS, elements:e};\n  f < d.length && (a.resultsTruncated = !0);\n  return a;\n};\naxs.AuditRules = {};\n(function() {\n  var a = {}, b = {};\n  axs.AuditRules.specs = {};\n  axs.AuditRules.addRule = function(c) {\n    var d = new axs.AuditRule(c);\n    if (d.code in b) {\n      throw Error('Can not add audit rule with same code: \"' + d.code + '\"');\n    }\n    if (d.name in a) {\n      throw Error('Can not add audit rule with same name: \"' + d.name + '\"');\n    }\n    a[d.name] = b[d.code] = d;\n    axs.AuditRules.specs[c.name] = c;\n  };\n  axs.AuditRules.getRule = function(c) {\n    return a[c] || b[c] || null;\n  };\n  axs.AuditRules.getRules = function(b) {\n    var d = Object.keys(a);\n    return b ? d : d.map(function(a) {\n      return this.getRule(a);\n    }, axs.AuditRules);\n  };\n})();\naxs.AuditResults = function() {\n  this.errors_ = [];\n  this.warnings_ = [];\n};\ngoog.exportSymbol(\"axs.AuditResults\", axs.AuditResults);\naxs.AuditResults.prototype.addError = function(a) {\n  \"\" != a && this.errors_.push(a);\n};\ngoog.exportProperty(axs.AuditResults.prototype, \"addError\", axs.AuditResults.prototype.addError);\naxs.AuditResults.prototype.addWarning = function(a) {\n  \"\" != a && this.warnings_.push(a);\n};\ngoog.exportProperty(axs.AuditResults.prototype, \"addWarning\", axs.AuditResults.prototype.addWarning);\naxs.AuditResults.prototype.numErrors = function() {\n  return this.errors_.length;\n};\ngoog.exportProperty(axs.AuditResults.prototype, \"numErrors\", axs.AuditResults.prototype.numErrors);\naxs.AuditResults.prototype.numWarnings = function() {\n  return this.warnings_.length;\n};\ngoog.exportProperty(axs.AuditResults.prototype, \"numWarnings\", axs.AuditResults.prototype.numWarnings);\naxs.AuditResults.prototype.getErrors = function() {\n  return this.errors_;\n};\ngoog.exportProperty(axs.AuditResults.prototype, \"getErrors\", axs.AuditResults.prototype.getErrors);\naxs.AuditResults.prototype.getWarnings = function() {\n  return this.warnings_;\n};\ngoog.exportProperty(axs.AuditResults.prototype, \"getWarnings\", axs.AuditResults.prototype.getWarnings);\naxs.AuditResults.prototype.toString = function() {\n  for (var a = \"\", b = 0;b < this.errors_.length;b++) {\n    0 == b && (a += \"\\nErrors:\\n\");\n    var c = this.errors_[b], a = a + (c + \"\\n\\n\");\n  }\n  for (b = 0;b < this.warnings_.length;b++) {\n    0 == b && (a += \"\\nWarnings:\\n\"), c = this.warnings_[b], a += c + \"\\n\\n\";\n  }\n  return a;\n};\ngoog.exportProperty(axs.AuditResults.prototype, \"toString\", axs.AuditResults.prototype.toString);\naxs.Audit = {};\naxs.AuditConfiguration = function(a) {\n  null == a && (a = {});\n  this.rules_ = {};\n  this.maxResults = this.auditRulesToIgnore = this.auditRulesToRun = this.scope = null;\n  this.withConsoleApi = !1;\n  this.showUnsupportedRulesWarning = !0;\n  for (var b in this) {\n    this.hasOwnProperty(b) && b in a && (this[b] = a[b]);\n  }\n  goog.exportProperty(this, \"scope\", this.scope);\n  goog.exportProperty(this, \"auditRulesToRun\", this.auditRulesToRun);\n  goog.exportProperty(this, \"auditRulesToIgnore\", this.auditRulesToIgnore);\n  goog.exportProperty(this, \"withConsoleApi\", this.withConsoleApi);\n  goog.exportProperty(this, \"showUnsupportedRulesWarning\", this.showUnsupportedRulesWarning);\n};\ngoog.exportSymbol(\"axs.AuditConfiguration\", axs.AuditConfiguration);\naxs.AuditConfiguration.prototype = {ignoreSelectors:function(a, b) {\n  a in this.rules_ || (this.rules_[a] = {});\n  \"ignore\" in this.rules_[a] || (this.rules_[a].ignore = []);\n  Array.prototype.push.call(this.rules_[a].ignore, b);\n}, getIgnoreSelectors:function(a) {\n  return a in this.rules_ && \"ignore\" in this.rules_[a] ? this.rules_[a].ignore : [];\n}, setSeverity:function(a, b) {\n  a in this.rules_ || (this.rules_[a] = {});\n  this.rules_[a].severity = b;\n}, getSeverity:function(a) {\n  return a in this.rules_ && \"severity\" in this.rules_[a] ? this.rules_[a].severity : null;\n}, setRuleConfig:function(a, b) {\n  a in this.rules_ || (this.rules_[a] = {});\n  this.rules_[a].config = b;\n}, getRuleConfig:function(a) {\n  return a in this.rules_ && \"config\" in this.rules_[a] ? this.rules_[a].config : null;\n}};\ngoog.exportProperty(axs.AuditConfiguration.prototype, \"ignoreSelectors\", axs.AuditConfiguration.prototype.ignoreSelectors);\ngoog.exportProperty(axs.AuditConfiguration.prototype, \"getIgnoreSelectors\", axs.AuditConfiguration.prototype.getIgnoreSelectors);\naxs.Audit.unsupportedRulesWarningShown = !1;\naxs.Audit.getRulesCannotRun = function(a) {\n  return a.withConsoleApi ? [] : axs.AuditRules.getRules().filter(function(a) {\n    return a.requiresConsoleAPI;\n  }).map(function(a) {\n    return a.code;\n  });\n};\naxs.Audit.run = function(a) {\n  a = a || new axs.AuditConfiguration;\n  var b = a.withConsoleApi, c = [], d;\n  d = a.auditRulesToRun && 0 < a.auditRulesToRun.length ? a.auditRulesToRun : axs.AuditRules.getRules(!0);\n  if (a.auditRulesToIgnore) {\n    for (var e = 0;e < a.auditRulesToIgnore.length;e++) {\n      var f = a.auditRulesToIgnore[e];\n      0 > d.indexOf(f) || d.splice(d.indexOf(f), 1);\n    }\n  }\n  !axs.Audit.unsupportedRulesWarningShown && a.showUnsupportedRulesWarning && (e = axs.Audit.getRulesCannotRun(a), 0 < e.length && (console.warn(\"Some rules cannot be checked using the axs.Audit.run() method call. Use the Chrome plugin to check these rules: \" + e.join(\", \")), console.warn(\"To remove this message, pass an AuditConfiguration object to axs.Audit.run() and set configuration.showUnsupportedRulesWarning = false.\")), axs.Audit.unsupportedRulesWarningShown = !0);\n  for (e = 0;e < d.length;e++) {\n    var f = d[e], g = axs.AuditRules.getRule(f);\n    if (g && !g.disabled && (b || !g.requiresConsoleAPI)) {\n      var h = {}, k = a.getIgnoreSelectors(g.name);\n      if (0 < k.length || a.scope) {\n        h.ignoreSelectors = k;\n      }\n      k = a.getRuleConfig(g.name);\n      null != k && (h.config = k);\n      a.scope && (h.scope = a.scope);\n      a.maxResults && (h.maxResults = a.maxResults);\n      h = g.run.call(g, h);\n      g = axs.utils.namedValues(g);\n      g.severity = a.getSeverity(f) || g.severity;\n      h.rule = g;\n      c.push(h);\n    }\n  }\n  return c;\n};\ngoog.exportSymbol(\"axs.Audit.run\", axs.Audit.run);\naxs.Audit.auditResults = function(a) {\n  for (var b = new axs.AuditResults, c = 0;c < a.length;c++) {\n    var d = a[c];\n    d.result == axs.constants.AuditResult.FAIL && (d.rule.severity == axs.constants.Severity.SEVERE ? b.addError(axs.Audit.accessibilityErrorMessage(d)) : b.addWarning(axs.Audit.accessibilityErrorMessage(d)));\n  }\n  return b;\n};\ngoog.exportSymbol(\"axs.Audit.auditResults\", axs.Audit.auditResults);\naxs.Audit.createReport = function(a, b) {\n  var c;\n  c = \"*** Begin accessibility audit results ***\\nAn accessibility audit found \" + axs.Audit.auditResults(a).toString();\n  b && (c += \"\\nFor more information, please see \", c += b);\n  return c += \"\\n*** End accessibility audit results ***\";\n};\ngoog.exportSymbol(\"axs.Audit.createReport\", axs.Audit.createReport);\naxs.Audit.accessibilityErrorMessage = function(a) {\n  for (var b = a.rule.severity == axs.constants.Severity.SEVERE ? \"Error: \" : \"Warning: \", b = b + (a.rule.code + \" (\" + a.rule.heading + \") failed on the following \" + (1 == a.elements.length ? \"element\" : \"elements\")), b = 1 == a.elements.length ? b + \":\" : b + (\" (1 - \" + Math.min(5, a.elements.length) + \" of \" + a.elements.length + \"):\"), c = Math.min(a.elements.length, 5), d = 0;d < c;d++) {\n    var e = a.elements[d], b = b + \"\\n\";\n    try {\n      b += axs.utils.getQuerySelectorText(e);\n    } catch (f) {\n      b += \" tagName:\" + e.tagName, b += \" id:\" + e.id;\n    }\n  }\n  \"\" != a.rule.url && (b += \"\\nSee \" + a.rule.url + \" for more information.\");\n  return b;\n};\ngoog.exportSymbol(\"axs.Audit.accessibilityErrorMessage\", axs.Audit.accessibilityErrorMessage);\naxs.AuditRules.addRule({name:\"ariaOnReservedElement\", heading:\"This element does not support ARIA roles, states and properties\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_12\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return !axs.properties.canTakeAriaAttributes(a);\n}, test:function(a) {\n  return null !== axs.properties.getAriaProperties(a);\n}, code:\"AX_ARIA_12\"});\naxs.AuditRules.addRule({name:\"ariaOwnsDescendant\", heading:\"aria-owns should not be used if ownership is implicit in the DOM\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_06\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"[aria-owns]\");\n}, test:function(a) {\n  return axs.utils.getIdReferents(\"aria-owns\", a).some(function(b) {\n    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_CONTAINED_BY;\n  });\n}, code:\"AX_ARIA_06\"});\naxs.AuditRules.addRule({name:\"ariaRoleNotScoped\", heading:\"Elements with ARIA roles must be in the correct scope\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_09\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"[role]\");\n}, test:function(a) {\n  var b = axs.utils.getRoles(a);\n  if (!b || !b.applied) {\n    return !1;\n  }\n  b = b.applied.details.scope;\n  if (!b || 0 === b.length) {\n    return !1;\n  }\n  for (var c = a;c = c.parentNode;) {\n    var d = axs.utils.getRoles(c, !0);\n    if (d && d.applied && 0 <= b.indexOf(d.applied.name)) {\n      return !1;\n    }\n  }\n  if (a = axs.utils.getIdReferrers(\"aria-owns\", a)) {\n    for (c = 0;c < a.length;c++) {\n      if ((d = axs.utils.getRoles(a[c], !0)) && d.applied && 0 <= b.indexOf(d.applied.name)) {\n        return !1;\n      }\n    }\n  }\n  return !0;\n}, code:\"AX_ARIA_09\"});\naxs.AuditRules.addRule({name:\"audioWithoutControls\", heading:\"Audio elements should have controls\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_audio_01\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"audio[autoplay]\");\n}, test:function(a) {\n  return !a.querySelectorAll(\"[controls]\").length && 3 < a.duration;\n}, code:\"AX_AUDIO_01\"});\n(function() {\n  var a = /^aria\\-/;\n  axs.AuditRules.addRule({name:\"badAriaAttribute\", heading:\"This element has an invalid ARIA attribute\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_11\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(b) {\n    b = b.attributes;\n    for (var c = 0, d = b.length;c < d;c++) {\n      if (a.test(b[c].name)) {\n        return !0;\n      }\n    }\n    return !1;\n  }, test:function(b) {\n    b = b.attributes;\n    for (var c = 0, d = b.length;c < d;c++) {\n      var e = b[c].name;\n      if (a.test(e) && (e = e.replace(a, \"\"), !axs.constants.ARIA_PROPERTIES.hasOwnProperty(e))) {\n        return !0;\n      }\n    }\n    return !1;\n  }, code:\"AX_ARIA_11\"});\n})();\naxs.AuditRules.addRule({name:\"badAriaAttributeValue\", heading:\"ARIA state and property values must be valid\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_04\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(a) {\n  var b = axs.utils.getSelectorForAriaProperties(axs.constants.ARIA_PROPERTIES);\n  return axs.browserUtils.matchSelector(a, b);\n}, test:function(a) {\n  for (var b in axs.constants.ARIA_PROPERTIES) {\n    var c = \"aria-\" + b;\n    if (a.hasAttribute(c)) {\n      var d = a.getAttribute(c);\n      if (!axs.utils.getAriaPropertyValue(c, d, a).valid) {\n        return !0;\n      }\n    }\n  }\n  return !1;\n}, code:\"AX_ARIA_04\"});\naxs.AuditRules.addRule({name:\"badAriaRole\", heading:\"Elements with ARIA roles must use a valid, non-abstract ARIA role\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_01\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"[role]\");\n}, test:function(a) {\n  return !axs.utils.getRoles(a).valid;\n}, code:\"AX_ARIA_01\"});\naxs.AuditRules.addRule({name:\"controlsWithoutLabel\", heading:\"Controls and media elements should have labels\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_text_01\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(a) {\n  if (!axs.browserUtils.matchSelector(a, 'input:not([type=\"hidden\"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), video:not([disabled])') || \"presentation\" == a.getAttribute(\"role\")) {\n    return !1;\n  }\n  if (0 <= a.tabIndex) {\n    return !0;\n  }\n  for (a = axs.utils.parentElement(a);null != a;a = axs.utils.parentElement(a)) {\n    if (axs.utils.elementIsAriaWidget(a)) {\n      return !1;\n    }\n  }\n  return !0;\n}, test:function(a) {\n  if (axs.utils.isElementOrAncestorHidden(a) || \"input\" == a.tagName.toLowerCase() && \"button\" == a.type && a.value.length || \"button\" == a.tagName.toLowerCase() && a.textContent.replace(/^\\s+|\\s+$/g, \"\").length || axs.utils.hasLabel(a)) {\n    return !1;\n  }\n  a = axs.properties.findTextAlternatives(a, {});\n  return null === a || \"\" === a.trim() ? !0 : !1;\n}, code:\"AX_TEXT_01\", ruleName:\"Controls and media elements should have labels\"});\naxs.AuditRules.addRule({name:\"duplicateId\", heading:\"An element's ID must be unique in the DOM\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_html_02\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"[id]\");\n}, test:function(a) {\n  var b = a.id;\n  if (!b) {\n    return !1;\n  }\n  b = \"[id='\" + b.replace(/'/g, \"\\\\'\") + \"']\";\n  return 1 < a.ownerDocument.querySelectorAll(b).length;\n}, code:\"AX_HTML_02\"});\naxs.AuditRules.addRule({name:\"focusableElementNotVisibleAndNotAriaHidden\", heading:\"These elements are focusable but either invisible or obscured by another element\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_01\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  if (!axs.browserUtils.matchSelector(a, axs.utils.FOCUSABLE_ELEMENTS_SELECTOR)) {\n    return !1;\n  }\n  if (0 <= a.tabIndex) {\n    return !0;\n  }\n  for (var b = axs.utils.parentElement(a);null != b;b = axs.utils.parentElement(b)) {\n    if (axs.utils.elementIsAriaWidget(b)) {\n      return !1;\n    }\n  }\n  a = axs.properties.findTextAlternatives(a, {});\n  return null === a || \"\" === a.trim() ? !1 : !0;\n}, test:function(a) {\n  if (axs.utils.isElementOrAncestorHidden(a)) {\n    return !1;\n  }\n  a.focus();\n  return !axs.utils.elementIsVisible(a);\n}, code:\"AX_FOCUS_01\"});\naxs.AuditRules.addRule({name:\"humanLangMissing\", heading:\"The web page should have the content's human language indicated in the markup\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_html_01\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return a instanceof a.ownerDocument.defaultView.HTMLHtmlElement;\n}, test:function(a) {\n  return a.lang ? !1 : !0;\n}, code:\"AX_HTML_01\"});\naxs.AuditRules.addRule({name:\"imagesWithoutAltText\", heading:\"Images should have a text alternative or presentational role\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_text_02\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"img\") && !axs.utils.isElementOrAncestorHidden(a);\n}, test:function(a) {\n  if (a.hasAttribute(\"alt\") && \"\" == a.alt || \"presentation\" == a.getAttribute(\"role\")) {\n    return !1;\n  }\n  var b = {};\n  axs.properties.findTextAlternatives(a, b);\n  return 0 == Object.keys(b).length ? !0 : !1;\n}, code:\"AX_TEXT_02\"});\naxs.AuditRules.addRule({name:\"linkWithUnclearPurpose\", heading:\"The purpose of each link should be clear from the link text\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_text_04\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"a\") && !axs.utils.isElementOrAncestorHidden(a);\n}, test:function(a, b) {\n  for (var c = b || {}, d = c.blacklistPhrases || [], e = /\\s+/, f = 0;f < d.length;f++) {\n    var g = \"^\\\\s*\" + d[f].trim().replace(e, \"\\\\s*\") + \"s*[^a-z]$\";\n    if ((new RegExp(g, \"i\")).test(a.textContent)) {\n      return !0;\n    }\n  }\n  c = c.stopwords || \"click tap go here learn more this page link about\".split(\" \");\n  d = axs.properties.findTextAlternatives(a, {});\n  if (null === d || \"\" === d.trim()) {\n    return !0;\n  }\n  d = d.replace(/[^a-zA-Z ]/g, \"\");\n  for (f = 0;f < c.length;f++) {\n    if (d = d.replace(new RegExp(\"\\\\b\" + c[f] + \"\\\\b\", \"ig\"), \"\"), \"\" == d.trim()) {\n      return !0;\n    }\n  }\n  return !1;\n}, code:\"AX_TEXT_04\"});\naxs.AuditRules.addRule({name:\"lowContrastElements\", heading:\"Text elements should have a reasonable contrast ratio\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_color_01\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return axs.properties.hasDirectTextDescendant(a) && !axs.utils.isElementDisabled(a);\n}, test:function(a) {\n  var b = window.getComputedStyle(a, null);\n  return (a = axs.utils.getContrastRatioForElementWithComputedStyle(b, a)) && axs.utils.isLowContrast(a, b);\n}, code:\"AX_COLOR_01\"});\naxs.AuditRules.addRule({name:\"mainRoleOnInappropriateElement\", heading:\"role=main should only appear on significant elements\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_05\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"[role~=main]\");\n}, test:function(a) {\n  if (axs.utils.isInlineElement(a)) {\n    return !0;\n  }\n  a = axs.properties.getTextFromDescendantContent(a);\n  return !a || 50 > a.length ? !0 : !1;\n}, code:\"AX_ARIA_05\"});\naxs.AuditRules.addRule({name:\"elementsWithMeaningfulBackgroundImage\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return !axs.utils.isElementOrAncestorHidden(a);\n}, heading:\"Meaningful images should not be used in element backgrounds\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_image_01\", test:function(a) {\n  if (a.textContent && 0 < a.textContent.length) {\n    return !1;\n  }\n  a = window.getComputedStyle(a, null);\n  var b = a.backgroundImage;\n  if (!b || \"undefined\" === b || \"none\" === b || 0 != b.indexOf(\"url\")) {\n    return !1;\n  }\n  b = parseInt(a.width, 10);\n  a = parseInt(a.height, 10);\n  return 150 > b && 150 > a;\n}, code:\"AX_IMAGE_01\"});\naxs.AuditRules.addRule({name:\"multipleAriaOwners\", heading:\"An element's ID must not be present in more that one aria-owns attribute at any time\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_07\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"[aria-owns]\");\n}, test:function(a) {\n  return axs.utils.getIdReferents(\"aria-owns\", a).some(function(a) {\n    return 1 < axs.utils.getIdReferrers(\"aria-owns\", a).length;\n  });\n}, code:\"AX_ARIA_07\"});\naxs.AuditRules.addRule({name:\"multipleLabelableElementsPerLabel\", heading:\"A label element may not have labelable descendants other than its labeled control.\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#-ax_text_03--labels-should-only-contain-one-labelable-element\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"label\");\n}, test:function(a) {\n  if (1 < a.querySelectorAll(axs.utils.LABELABLE_ELEMENTS_SELECTOR).length) {\n    return !0;\n  }\n}, code:\"AX_TEXT_03\"});\naxs.AuditRules.addRule({name:\"nonExistentAriaRelatedElement\", heading:\"ARIA attributes which refer to other elements by ID should refer to elements which exist in the DOM\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_02\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(a) {\n  var b = axs.utils.getAriaPropertiesByValueType([\"idref\", \"idref_list\"]), b = axs.utils.getSelectorForAriaProperties(b);\n  return axs.browserUtils.matchSelector(a, b);\n}, test:function(a) {\n  for (var b = axs.utils.getAriaPropertiesByValueType([\"idref\", \"idref_list\"]), b = axs.utils.getSelectorForAriaProperties(b).split(\",\"), c = 0, d = b.length;c < d;c++) {\n    var e = b[c];\n    if (axs.browserUtils.matchSelector(a, e)) {\n      var e = e.match(/aria-[^\\]]+/)[0], f = a.getAttribute(e);\n      if (!axs.utils.getAriaPropertyValue(e, f, a).valid) {\n        return !0;\n      }\n    }\n  }\n  return !1;\n}, code:\"AX_ARIA_02\"});\naxs.AuditRules.addRule({name:\"pageWithoutTitle\", heading:\"The web page should have a title that describes topic or purpose\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_title_01\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return \"html\" == a.tagName.toLowerCase();\n}, test:function(a) {\n  a = a.querySelector(\"head\");\n  return a ? (a = a.querySelector(\"title\")) ? !a.textContent : !0 : !0;\n}, code:\"AX_TITLE_01\"});\naxs.AuditRules.addRule({name:\"requiredAriaAttributeMissing\", heading:\"Elements with ARIA roles must have all required attributes for that role\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_03\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"[role]\");\n}, test:function(a) {\n  var b = axs.utils.getRoles(a);\n  if (!b.valid) {\n    return !1;\n  }\n  for (var c = 0;c < b.roles.length;c++) {\n    var d = b.roles[c].details.requiredPropertiesSet, e;\n    for (e in d) {\n      if (d = e.replace(/^aria-/, \"\"), !(\"defaultValue\" in axs.constants.ARIA_PROPERTIES[d] || a.hasAttribute(e)) && 0 > axs.properties.getNativelySupportedAttributes(a).indexOf(e)) {\n        return !0;\n      }\n    }\n  }\n}, code:\"AX_ARIA_03\"});\n(function() {\n  function a(a) {\n    a = axs.utils.getRoles(a);\n    if (!a || !a.applied) {\n      return [];\n    }\n    a = a.applied;\n    return a.valid ? a.details.mustcontain || [] : [];\n  }\n  axs.AuditRules.addRule({name:\"requiredOwnedAriaRoleMissing\", heading:\"Elements with ARIA roles must ensure required owned elements are present\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_08\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(b) {\n    return axs.browserUtils.matchSelector(b, \"[role]\") ? 0 < a(b).length : !1;\n  }, test:function(b) {\n    if (\"true\" === b.getAttribute(\"aria-busy\")) {\n      return !1;\n    }\n    for (var c = a(b), d = c.length - 1;0 <= d;d--) {\n      var e = axs.utils.findDescendantsWithRole(b, c[d]);\n      if (e && e.length) {\n        return !1;\n      }\n    }\n    b = axs.utils.getIdReferents(\"aria-owns\", b);\n    for (d = b.length - 1;0 <= d;d--) {\n      if ((e = axs.utils.getRoles(b[d], !0)) && e.applied) {\n        for (var e = e.applied, f = c.length - 1;0 <= f;f--) {\n          if (e.name === c[f]) {\n            return !1;\n          }\n        }\n      }\n    }\n    return !0;\n  }, code:\"AX_ARIA_08\"});\n})();\naxs.AuditRules.addRule({name:\"tabIndexGreaterThanZero\", heading:\"Avoid positive integer values for tabIndex\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_03\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"[tabindex]\");\n}, test:function(a) {\n  if (0 < a.tabIndex) {\n    return !0;\n  }\n}, code:\"AX_FOCUS_03\"});\naxs.AuditRules.addRule({name:\"unfocusableElementsWithOnClick\", heading:\"Elements with onclick handlers must be focusable\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_02\", severity:axs.constants.Severity.WARNING, opt_requiresConsoleAPI:!0, relevantElementMatcher:function(a) {\n  return a instanceof a.ownerDocument.defaultView.HTMLBodyElement || axs.utils.isElementOrAncestorHidden(a) ? !1 : \"click\" in getEventListeners(a) ? !0 : !1;\n}, test:function(a) {\n  return !a.hasAttribute(\"tabindex\") && !axs.utils.isElementImplicitlyFocusable(a) && !a.disabled;\n}, code:\"AX_FOCUS_02\"});\n(function() {\n  var a = /^aria\\-/, b = axs.utils.getSelectorForAriaProperties(axs.constants.ARIA_PROPERTIES);\n  axs.AuditRules.addRule({name:\"unsupportedAriaAttribute\", heading:\"This element has an unsupported ARIA attribute\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_10\", severity:axs.constants.Severity.SEVERE, relevantElementMatcher:function(a) {\n    return axs.browserUtils.matchSelector(a, b);\n  }, test:function(b) {\n    var d = axs.utils.getRoles(b, !0), d = d && d.applied ? d.applied.details.propertiesSet : axs.constants.GLOBAL_PROPERTIES;\n    b = b.attributes;\n    for (var e = 0, f = b.length;e < f;e++) {\n      var g = b[e].name;\n      if (a.test(g)) {\n        var h = g.replace(a, \"\");\n        if (axs.constants.ARIA_PROPERTIES.hasOwnProperty(h) && !(g in d)) {\n          return !0;\n        }\n      }\n    }\n    return !1;\n  }, code:\"AX_ARIA_10\"});\n})();\naxs.AuditRules.addRule({name:\"videoWithoutCaptions\", heading:\"Video elements should use <track> elements to provide captions\", url:\"https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_video_01\", severity:axs.constants.Severity.WARNING, relevantElementMatcher:function(a) {\n  return axs.browserUtils.matchSelector(a, \"video\");\n}, test:function(a) {\n  return !a.querySelectorAll(\"track[kind=captions]\").length;\n}, code:\"AX_VIDEO_01\"});\n\n  return axs;\n});\n\n// Define AMD module if possible, export globals otherwise.\nif (typeof define !== 'undefined' && define.amd) {\n  define([], fn);\n} else {\n  var axs = fn.call(this);\n}\n\n"

/***/ }
/******/ ]);