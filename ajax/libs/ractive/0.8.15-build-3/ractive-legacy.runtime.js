/*
	Ractive.js v0.8.15-edge
	Thu Sep 21 2017 18:58:56 GMT+0000 (UTC) - commit 029c025d1a822ef4a7b30c34a04eb6e80bd2bd2d

	http://ractivejs.org
	http://twitter.com/RactiveJS

	Released under the MIT License.
*/


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	((function() { var current = global.Ractive; var next = factory(); next.noConflict = function() { global.Ractive = current; return next; }; return global.Ractive = next; })());
}(this, function () { 'use strict';

	var defaults = {
		// render placement:
		el:                     void 0,
		append:				    false,

		// template:
		template:               null,

		// parse:
		delimiters:             [ '{{', '}}' ],
		tripleDelimiters:       [ '{{{', '}}}' ],
		staticDelimiters:       [ '[[', ']]' ],
		staticTripleDelimiters: [ '[[[', ']]]' ],
		csp: 					true,
		interpolate:            false,
		preserveWhitespace:     false,
		sanitize:               false,
		stripComments:          true,
		contextLines:           0,

		// data & binding:
		data:                   {},
		computed:               {},
		magic:                  false,
		modifyArrays:           false,
		adapt:                  [],
		isolated:               false,
		twoway:                 true,
		lazy:                   false,

		// transitions:
		noIntro:                false,
		transitionsEnabled:     true,
		complete:               void 0,

		// css:
		css:                    null,
		noCssTransform:         false
	};

	// These are a subset of the easing equations found at
	// https://raw.github.com/danro/easing-js - license info
	// follows:

	// --------------------------------------------------
	// easing.js v0.5.4
	// Generic set of easing functions with AMD support
	// https://github.com/danro/easing-js
	// This code may be freely distributed under the MIT license
	// http://danro.mit-license.org/
	// --------------------------------------------------
	// All functions adapted from Thomas Fuchs & Jeremy Kahn
	// Easing Equations (c) 2003 Robert Penner, BSD license
	// https://raw.github.com/danro/easing-js/master/LICENSE
	// --------------------------------------------------

	// In that library, the functions named easeIn, easeOut, and
	// easeInOut below are named easeInCubic, easeOutCubic, and
	// (you guessed it) easeInOutCubic.
	//
	// You can add additional easing functions to this list, and they
	// will be globally available.


	var easing = {
		linear: function ( pos ) { return pos; },
		easeIn: function ( pos ) { return Math.pow( pos, 3 ); },
		easeOut: function ( pos ) { return ( Math.pow( ( pos - 1 ), 3 ) + 1 ); },
		easeInOut: function ( pos ) {
			if ( ( pos /= 0.5 ) < 1 ) { return ( 0.5 * Math.pow( pos, 3 ) ); }
			return ( 0.5 * ( Math.pow( ( pos - 2 ), 3 ) + 2 ) );
		}
	};

	/*global console, navigator */

	var win = typeof window !== 'undefined' ? window : null;
	var doc = win ? document : null;

	var isClient = !!doc;
	var isJsdom = ( typeof navigator !== 'undefined' && /jsDom/.test( navigator.appName ) );
	var hasConsole = ( typeof console !== 'undefined' && typeof console.warn === 'function' && typeof console.warn.apply === 'function' );

	var magicSupported;
	try {
		Object.defineProperty({}, 'test', { value: 0 });
		magicSupported = true;
	} catch ( e ) {
		magicSupported = false;
	}

	var svg = doc ?
		doc.implementation.hasFeature( 'http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1' ) :
		false;

	var vendors = [ 'o', 'ms', 'moz', 'webkit' ];

	function noop () {}

	var exportedShims;

	if ( !win ) {
		exportedShims = null;
	} else {
		exportedShims = {};

		// Shims for older browsers

		if ( !Date.now ) {
			Date.now = function () { return +new Date(); };
		}

		if ( !String.prototype.trim ) {
			String.prototype.trim = function () {
				return this.replace(/^\s+/, '').replace(/\s+$/, '');
			};
		}

		// Polyfill for Object.create
		if ( !Object.create ) {
			Object.create = (function () {
				var Temp = function () {};
				return function ( prototype, properties ) {
					if ( typeof prototype !== 'object' ) {
						throw new TypeError( 'Prototype must be an object' );
					}
					Temp.prototype = prototype;
					var result = new Temp();
					defineProperties( result, properties );
					Temp.prototype = null;
					return result;
				};
			})();
		}

		// Polyfill Object.defineProperty
		if ( !Object.defineProperty ) {
			Object.defineProperty = defineProperty;
		}

		if ( !Object.freeze ) {
			Object.freeze = function () { 'LOL'; };
		}

		// Polyfill for Object.keys
		// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
		if ( !Object.keys ) {
			Object.keys = (function () {
				var hasOwnProperty = Object.prototype.hasOwnProperty,
					hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
					dontEnums = [
						'toString',
						'toLocaleString',
						'valueOf',
						'hasOwnProperty',
						'isPrototypeOf',
						'propertyIsEnumerable',
						'constructor'
					],
					dontEnumsLength = dontEnums.length;

				return function ( obj ) {
					if ( typeof obj !== 'object' && typeof obj !== 'function' || obj === null ) {
						throw new TypeError( 'Object.keys called on non-object' );
					}

					var result = [];

					for ( var prop in obj ) {
						if ( hasOwnProperty.call( obj, prop ) ){
							result.push( prop );
						}
					}

					if ( hasDontEnumBug ) {
						for ( var i=0; i < dontEnumsLength; i++ ) {
							if ( hasOwnProperty.call( obj, dontEnums[i] ) ){
								result.push( dontEnums[i] );
							}
						}
					}
					return result;
				};
			}());
		}

		// TODO: use defineProperty to make these non-enumerable

		// Array extras
		if ( !Array.prototype.indexOf ) {
			Array.prototype.indexOf = function ( needle, i ) {
				var this$1 = this;

				var len;

				if ( i === undefined ) {
					i = 0;
				}

				if ( i < 0 ) {
					i+= this.length;
				}

				if ( i < 0 ) {
					i = 0;
				}

				for ( len = this$1.length; i<len; i++ ) {
					if ( this$1.hasOwnProperty( i ) && this$1[i] === needle ) {
						return i;
					}
				}

				return -1;
			};
		}

		if ( !Array.prototype.forEach ) {
			Array.prototype.forEach = function ( callback, context ) {
				var this$1 = this;

				var i, len;

				for ( i=0, len=this$1.length; i<len; i+=1 ) {
					if ( this$1.hasOwnProperty( i ) ) {
						callback.call( context, this$1[i], i, this$1 );
					}
				}
			};
		}

		if ( !Array.prototype.map ) {
			Array.prototype.map = function ( mapper, context ) {
				var array = this, i, len, mapped = [], isActuallyString;

				// incredibly, if you do something like
				// Array.prototype.map.call( someString, iterator )
				// then `this` will become an instance of String in IE8.
				// And in IE8, you then can't do string[i]. Facepalm.
				if ( array instanceof String ) {
					array = array.toString();
					isActuallyString = true;
				}

				for ( i=0, len=array.length; i<len; i+=1 ) {
					if ( array.hasOwnProperty( i ) || isActuallyString ) {
						mapped[i] = mapper.call( context, array[i], i, array );
					}
				}

				return mapped;
			};
		}

		if ( typeof Array.prototype.reduce !== 'function' ) {
			Array.prototype.reduce = function(callback, opt_initialValue){
				var this$1 = this;

				var i, value, len, valueIsSet;

				if ('function' !== typeof callback) {
					throw new TypeError(callback + ' is not a function');
				}

				len = this.length;
				valueIsSet = false;

				if ( arguments.length > 1 ) {
					value = opt_initialValue;
					valueIsSet = true;
				}

				for ( i = 0; i < len; i += 1) {
					if ( this$1.hasOwnProperty( i ) ) {
						if ( valueIsSet ) {
							value = callback(value, this$1[i], i, this$1);
						}
					} else {
						value = this$1[i];
						valueIsSet = true;
					}
				}

				if ( !valueIsSet ) {
					throw new TypeError( 'Reduce of empty array with no initial value' );
				}

				return value;
			};
		}

		if ( !Array.prototype.filter ) {
			Array.prototype.filter = function ( filter, context ) {
				var this$1 = this;

				var i, len, filtered = [];

				for ( i=0, len=this$1.length; i<len; i+=1 ) {
					if ( this$1.hasOwnProperty( i ) && filter.call( context, this$1[i], i, this$1 ) ) {
						filtered[ filtered.length ] = this$1[i];
					}
				}

				return filtered;
			};
		}

		if ( !Array.prototype.every ) {
			Array.prototype.every = function ( iterator, context ) {
				var t, len, i;

				if ( this == null ) {
					throw new TypeError();
				}

				t = Object( this );
				len = t.length >>> 0;

				if ( typeof iterator !== 'function' ) {
					throw new TypeError();
				}

				for ( i = 0; i < len; i += 1 ) {
					if ( i in t && !iterator.call( context, t[i], i, t) ) {
						return false;
					}
				}

				return true;
			};
		}

		if ( typeof Function.prototype.bind !== 'function' ) {
			Function.prototype.bind = function ( context ) {
				var args, fn, Empty, bound, slice = [].slice;

				if ( typeof this !== 'function' ) {
					throw new TypeError( 'Function.prototype.bind called on non-function' );
				}

				args = slice.call( arguments, 1 );
				fn = this;
				Empty = function () {};

				bound = function () {
					var ctx = this instanceof Empty && context ? this : context;
					return fn.apply( ctx, args.concat( slice.call( arguments ) ) );
				};

				Empty.prototype = this.prototype;
				bound.prototype = new Empty();

				return bound;
			};
		}

		// https://gist.github.com/Rich-Harris/6010282 via https://gist.github.com/jonathantneal/2869388
		// addEventListener polyfill IE6+
		if ( !win.addEventListener ) {
			((function(win, doc) {
				var Event, addEventListener, removeEventListener, head, style, origCreateElement;

				// because sometimes inquiring minds want to know
				win.appearsToBeIELessEqual8 = true;

				Event = function ( e, element ) {
					var property, instance = this;

					for ( property in e ) {
						instance[ property ] = e[ property ];
					}

					instance.currentTarget =  element;
					instance.target = e.srcElement || element;
					instance.timeStamp = +new Date();

					instance.preventDefault = function () {
						e.returnValue = false;
					};

					instance.stopPropagation = function () {
						e.cancelBubble = true;
					};
				};

				addEventListener = function ( type, listener ) {
					var element = this, listeners, i;

					listeners = element.listeners || ( element.listeners = [] );
					i = listeners.length;

					listeners[i] = [ listener, function (e) {
						listener.call( element, new Event( e, element ) );
					}];

					element.attachEvent( 'on' + type, listeners[i][1] );
				};

				removeEventListener = function ( type, listener ) {
					var element = this, listeners, i;

					if ( !element.listeners ) {
						return;
					}

					listeners = element.listeners;
					i = listeners.length;

					while ( i-- ) {
						if (listeners[i][0] === listener) {
							element.detachEvent( 'on' + type, listeners[i][1] );
						}
					}
				};

				win.addEventListener = doc.addEventListener = addEventListener;
				win.removeEventListener = doc.removeEventListener = removeEventListener;

				if ( 'Element' in win ) {
					win.Element.prototype.addEventListener = addEventListener;
					win.Element.prototype.removeEventListener = removeEventListener;
				} else {
					// First, intercept any calls to document.createElement - this is necessary
					// because the CSS hack (see below) doesn't come into play until after a
					// node is added to the DOM, which is too late for a lot of Ractive setup work
					origCreateElement = doc.createElement;

					doc.createElement = function ( tagName ) {
						var el = origCreateElement( tagName );
						el.addEventListener = addEventListener;
						el.removeEventListener = removeEventListener;
						return el;
					};

					// Then, mop up any additional elements that weren't created via
					// document.createElement (i.e. with innerHTML).
					head = doc.getElementsByTagName('head')[0];
					style = doc.createElement('style');

					head.insertBefore( style, head.firstChild );

					//style.styleSheet.cssText = '*{-ms-event-prototype:expression(!this.addEventListener&&(this.addEventListener=addEventListener)&&(this.removeEventListener=removeEventListener))}';
				}
			})( win, doc ));
		}

		// The getComputedStyle polyfill interacts badly with jQuery, so we don't attach
		// it to window. Instead, we export it for other modules to use as needed

		// https://github.com/jonathantneal/Polyfills-for-IE8/blob/master/getComputedStyle.js
		if ( !win.getComputedStyle ) {
			exportedShims.getComputedStyle = (function () {
				var borderSizes = {};

				function getPixelSize ( element, style, property, fontSize ) {
					var sizeWithSuffix = style[property];
					var size = parseFloat(sizeWithSuffix);
					var suffix = sizeWithSuffix.split(/\d/)[0];

					if ( isNaN( size ) ) {
						if ( /^thin|medium|thick$/.test( sizeWithSuffix ) ) {
							size = getBorderPixelSize( sizeWithSuffix );
							suffix = '';
						}

						else {
							// TODO...
						}
					}

					fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
					var rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

					return (suffix == 'em') ? size * fontSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
				}

				function getBorderPixelSize ( size ) {
					var div, bcr;

					// `thin`, `medium` and `thick` vary between browsers. (Don't ever use them.)
					if ( !borderSizes[ size ] ) {
						div = doc.createElement( 'div' );
						div.style.display = 'block';
						div.style.position = 'fixed';
						div.style.width = div.style.height = '0';
						div.style.borderRight = size + ' solid black';

						doc.getElementsByTagName( 'body' )[0].appendChild( div );
						bcr = div.getBoundingClientRect();

						borderSizes[ size ] = bcr.right - bcr.left;
					}

					return borderSizes[ size ];
				}

				function setShortStyleProperty(style, property) {
					var borderSuffix = property == 'border' ? 'Width' : '';
					var t = "" + property + "Top" + borderSuffix;
					var r = "" + property + "Right" + borderSuffix;
					var b = "" + property + "Bottom" + borderSuffix;
					var l = "" + property + "Left" + borderSuffix;

					style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
					: style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
					: style[l] == style[r] ? [style[t], style[r], style[b]]
					: [style[t], style[r], style[b], style[l]]).join(' ');
				}

				var normalProps = {
					fontWeight: 400,
					lineHeight: 1.2, // actually varies depending on font-family, but is generally close enough...
					letterSpacing: 0
				};

				function CSSStyleDeclaration(element) {
					var currentStyle, style, fontSize, property;

					currentStyle = element.currentStyle;
					style = this;
					fontSize = getPixelSize(element, currentStyle, 'fontSize', null);

					// TODO tidy this up, test it, send PR to jonathantneal!
					for (property in currentStyle) {
						if ( currentStyle[property] === 'normal' && normalProps.hasOwnProperty( property ) ) {
							style[ property ] = normalProps[ property ];
						} else if ( /width|height|margin.|padding.|border.+W/.test(property) ) {
							if ( currentStyle[ property ] === 'auto' ) {
								if ( /^width|height/.test( property ) ) {
									// just use clientWidth/clientHeight...
									style[ property ] = ( property === 'width' ? element.clientWidth : element.clientHeight ) + 'px';
								}

								else if ( /(?:padding)?Top|Bottom$/.test( property ) ) {
									style[ property ] = '0px';
								}
							}

							else {
								style[ property ] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
							}
						} else if (property === 'styleFloat') {
							style.float = currentStyle[property];
						} else {
							style[property] = currentStyle[property];
						}
					}

					setShortStyleProperty(style, 'margin');
					setShortStyleProperty(style, 'padding');
					setShortStyleProperty(style, 'border');

					style.fontSize = fontSize + 'px';

					return style;
				}

				CSSStyleDeclaration.prototype = {
					constructor: CSSStyleDeclaration,
					getPropertyPriority: noop,
					getPropertyValue: function ( prop ) {
						return this[prop] || '';
					},
					item: noop,
					removeProperty: noop,
					setProperty: noop,
					getPropertyCSSValue: noop
				};

				function getComputedStyle(element) {
					return new CSSStyleDeclaration(element);
				}

				return getComputedStyle;
			}());
		}
	}

	var legacy = exportedShims;

	var html   = 'http://www.w3.org/1999/xhtml';
	var mathml = 'http://www.w3.org/1998/Math/MathML';
	var svg$1    = 'http://www.w3.org/2000/svg';
	var xlink  = 'http://www.w3.org/1999/xlink';
	var xml    = 'http://www.w3.org/XML/1998/namespace';
	var xmlns  = 'http://www.w3.org/2000/xmlns';

	var namespaces = { html: html, mathml: mathml, svg: svg$1, xlink: xlink, xml: xml, xmlns: xmlns };

	var createElement;
	var matches;
	var div;
	var methodNames;
	var unprefixed;
	var prefixed;
	var i;
	var j;
	var makeFunction;
	// Test for SVG support
	if ( !svg ) {
		createElement = function ( type, ns, extend ) {
			if ( ns && ns !== html ) {
				throw 'This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you\'re trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information';
			}

			return extend ?
				doc.createElement( type, extend ) :
				doc.createElement( type );
		};
	} else {
		createElement = function ( type, ns, extend ) {
			if ( !ns || ns === html ) {
				return extend ?
					doc.createElement( type, extend ) :
					doc.createElement( type );
			}

			return extend ?
				doc.createElementNS( ns, type, extend ) :
				doc.createElementNS( ns, type );
		};
	}

	function createDocumentFragment () {
		return doc.createDocumentFragment();
	}

	function getElement ( input ) {
		var output;

		if ( !input || typeof input === 'boolean' ) { return; }

		if ( !win || !doc || !input ) {
			return null;
		}

		// We already have a DOM node - no work to do. (Duck typing alert!)
		if ( input.nodeType ) {
			return input;
		}

		// Get node from string
		if ( typeof input === 'string' ) {
			// try ID first
			output = doc.getElementById( input );

			// then as selector, if possible
			if ( !output && doc.querySelector ) {
				output = doc.querySelector( input );
			}

			// did it work?
			if ( output && output.nodeType ) {
				return output;
			}
		}

		// If we've been given a collection (jQuery, Zepto etc), extract the first item
		if ( input[0] && input[0].nodeType ) {
			return input[0];
		}

		return null;
	}

	if ( !isClient ) {
		matches = null;
	} else {
		div = createElement( 'div' );
		methodNames = [ 'matches', 'matchesSelector' ];

		makeFunction = function ( methodName ) {
			return function ( node, selector ) {
				return node[ methodName ]( selector );
			};
		};

		i = methodNames.length;

		while ( i-- && !matches ) {
			unprefixed = methodNames[i];

			if ( div[ unprefixed ] ) {
				matches = makeFunction( unprefixed );
			} else {
				j = vendors.length;
				while ( j-- ) {
					prefixed = vendors[i] + unprefixed.substr( 0, 1 ).toUpperCase() + unprefixed.substring( 1 );

					if ( div[ prefixed ] ) {
						matches = makeFunction( prefixed );
						break;
					}
				}
			}
		}

		// IE8...
		if ( !matches ) {
			matches = function ( node, selector ) {
				var nodes, parentNode, i;

				parentNode = node.parentNode;

				if ( !parentNode ) {
					// empty dummy <div>
					div.innerHTML = '';

					parentNode = div;
					node = node.cloneNode();

					div.appendChild( node );
				}

				nodes = parentNode.querySelectorAll( selector );

				i = nodes.length;
				while ( i-- ) {
					if ( nodes[i] === node ) {
						return true;
					}
				}

				return false;
			};
		}
	}

	function detachNode ( node ) {
		if ( node && typeof node.parentNode !== 'unknown' && node.parentNode ) {
			node.parentNode.removeChild( node );
		}

		return node;
	}

	function safeToStringValue ( value ) {
		return ( value == null || !value.toString ) ? '' : '' + value;
	}

	function safeAttributeString ( string ) {
		return safeToStringValue( string )
			.replace( /&/g, '&amp;' )
			.replace( /"/g, '&quot;' )
			.replace( /'/g, '&#39;' );
	}

	var decamel = /[A-Z]/g;
	function decamelize ( string ) {
		return string.replace( decamel, function ( s ) { return ("-" + (s.toLowerCase())); } );
	}

	var create;
	var defineProperty;
	var defineProperties;
	try {
		Object.defineProperty({}, 'test', { get: function() {}, set: function() {} });

		if ( doc ) {
			Object.defineProperty( createElement( 'div' ), 'test', { value: 0 });
		}

		defineProperty = Object.defineProperty;
	} catch ( err ) {
		// Object.defineProperty doesn't exist, or we're in IE8 where you can
		// only use it with DOM objects (what were you smoking, MSFT?)
		defineProperty = function ( obj, prop, desc ) {
			if ( desc.get ) obj[ prop ] = desc.get();
			else obj[ prop ] = desc.value;
		};
	}

	try {
		try {
			Object.defineProperties({}, { test: { value: 0 } });
		} catch ( err ) {
			// TODO how do we account for this? noMagic = true;
			throw err;
		}

		if ( doc ) {
			Object.defineProperties( createElement( 'div' ), { test: { value: 0 } });
		}

		defineProperties = Object.defineProperties;
	} catch ( err ) {
		defineProperties = function ( obj, props ) {
			var prop;

			for ( prop in props ) {
				if ( props.hasOwnProperty( prop ) ) {
					defineProperty( obj, prop, props[ prop ] );
				}
			}
		};
	}

	try {
		Object.create( null );

		create = Object.create;
	} catch ( err ) {
		// sigh
		create = (function () {
			var F = function () {};

			return function ( proto, props ) {
				var obj;

				if ( proto === null ) {
					return {};
				}

				F.prototype = proto;
				obj = new F();

				if ( props ) {
					Object.defineProperties( obj, props );
				}

				return obj;
			};
		}());
	}

	function extendObj ( target ) {
		var sources = [], len = arguments.length - 1;
		while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

		var prop;

		sources.forEach( function ( source ) {
			for ( prop in source ) {
				if ( hasOwn.call( source, prop ) ) {
					target[ prop ] = source[ prop ];
				}
			}
		});

		return target;
	}

	function fillGaps ( target ) {
		var sources = [], len = arguments.length - 1;
		while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

		sources.forEach( function ( s ) {
			for ( var key in s ) {
				if ( hasOwn.call( s, key ) && !( key in target ) ) {
					target[ key ] = s[ key ];
				}
			}
		});

		return target;
	}

	var hasOwn = Object.prototype.hasOwnProperty;

	var toString = Object.prototype.toString;
	// thanks, http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
	function isArray ( thing ) {
		return toString.call( thing ) === '[object Array]';
	}

	function isEqual ( a, b ) {
		if ( a === null && b === null ) {
			return true;
		}

		if ( typeof a === 'object' || typeof b === 'object' ) {
			return false;
		}

		return a === b;
	}

	// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
	function isNumeric ( thing ) {
		return !isNaN( parseFloat( thing ) ) && isFinite( thing );
	}

	function isObject ( thing ) {
		return ( thing && toString.call( thing ) === '[object Object]' );
	}

	var alreadyWarned = {};
	var log;
	var printWarning;
	var welcome;
	if ( hasConsole ) {
		var welcomeIntro = [
			("%cRactive.js %c0.8.15-edge-029c025d1a822ef4a7b30c34a04eb6e80bd2bd2d %cin debug mode, %cmore..."),
			'color: rgb(114, 157, 52); font-weight: normal;',
			'color: rgb(85, 85, 85); font-weight: normal;',
			'color: rgb(85, 85, 85); font-weight: normal;',
			'color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;'
		];
		var welcomeMessage = "You're running Ractive 0.8.15-edge-029c025d1a822ef4a7b30c34a04eb6e80bd2bd2d in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\nTo disable debug mode, add this line at the start of your app:\n  Ractive.DEBUG = false;\n\nTo disable debug mode when your app is minified, add this snippet:\n  Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});\n\nGet help and support:\n  http://docs.ractivejs.org\n  http://stackoverflow.com/questions/tagged/ractivejs\n  http://groups.google.com/forum/#!forum/ractive-js\n  http://twitter.com/ractivejs\n\nFound a bug? Raise an issue:\n  https://github.com/ractivejs/ractive/issues\n\n";

		welcome = function () {
			if ( Ractive.WELCOME_MESSAGE === false ) {
				welcome = noop;
				return;
			}
			var message = 'WELCOME_MESSAGE' in Ractive ? Ractive.WELCOME_MESSAGE : welcomeMessage;
			var hasGroup = !!console.groupCollapsed;
			if ( hasGroup ) console.groupCollapsed.apply( console, welcomeIntro );
			console.log( message );
			if ( hasGroup ) {
				console.groupEnd( welcomeIntro );
			}

			welcome = noop;
		};

		printWarning = function ( message, args ) {
			welcome();

			// extract information about the instance this message pertains to, if applicable
			if ( typeof args[ args.length - 1 ] === 'object' ) {
				var options = args.pop();
				var ractive = options ? options.ractive : null;

				if ( ractive ) {
					// if this is an instance of a component that we know the name of, add
					// it to the message
					var name;
					if ( ractive.component && ( name = ractive.component.name ) ) {
						message = "<" + name + "> " + message;
					}

					var node;
					if ( node = ( options.node || ( ractive.fragment && ractive.fragment.rendered && ractive.find( '*' ) ) ) ) {
						args.push( node );
					}
				}
			}

			console.warn.apply( console, [ '%cRactive.js: %c' + message, 'color: rgb(114, 157, 52);', 'color: rgb(85, 85, 85);' ].concat( args ) );
		};

		log = function () {
			console.log.apply( console, arguments );
		};
	} else {
		printWarning = log = welcome = noop;
	}

	function format ( message, args ) {
		return message.replace( /%s/g, function () { return args.shift(); } );
	}

	function fatal ( message ) {
		var args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		message = format( message, args );
		throw new Error( message );
	}

	function logIfDebug () {
		if ( Ractive.DEBUG ) {
			log.apply( null, arguments );
		}
	}

	function warn ( message ) {
		var args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		message = format( message, args );
		printWarning( message, args );
	}

	function warnOnce ( message ) {
		var args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		message = format( message, args );

		if ( alreadyWarned[ message ] ) {
			return;
		}

		alreadyWarned[ message ] = true;
		printWarning( message, args );
	}

	function warnIfDebug () {
		if ( Ractive.DEBUG ) {
			warn.apply( null, arguments );
		}
	}

	function warnOnceIfDebug () {
		if ( Ractive.DEBUG ) {
			warnOnce.apply( null, arguments );
		}
	}

	// Error messages that are used (or could be) in multiple places
	var badArguments = 'Bad arguments';
	var noRegistryFunctionReturn = 'A function was specified for "%s" %s, but no %s was returned';
	var missingPlugin = function ( name, type ) { return ("Missing \"" + name + "\" " + type + " plugin. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#" + type + "s"); };

	function findInViewHierarchy ( registryName, ractive, name ) {
		var instance = findInstance( registryName, ractive, name );
		return instance ? instance[ registryName ][ name ] : null;
	}

	function findInstance ( registryName, ractive, name ) {
		while ( ractive ) {
			if ( name in ractive[ registryName ] ) {
				return ractive;
			}

			if ( ractive.isolated ) {
				return null;
			}

			ractive = ractive.parent;
		}
	}

	function interpolate ( from, to, ractive, type ) {
		if ( from === to ) return null;

		if ( type ) {
			var interpol = findInViewHierarchy( 'interpolators', ractive, type );
			if ( interpol ) return interpol( from, to ) || null;

			fatal( missingPlugin( type, 'interpolator' ) );
		}

		return interpolators.number( from, to ) ||
		       interpolators.array( from, to ) ||
		       interpolators.object( from, to ) ||
		       null;
	}

	function snap ( to ) {
		return function () { return to; };
	}

	var interpolators = {
		number: function ( from, to ) {
			var delta;

			if ( !isNumeric( from ) || !isNumeric( to ) ) {
				return null;
			}

			from = +from;
			to = +to;

			delta = to - from;

			if ( !delta ) {
				return function () { return from; };
			}

			return function ( t ) {
				return from + ( t * delta );
			};
		},

		array: function ( from, to ) {
			var intermediate, interpolators, len, i;

			if ( !isArray( from ) || !isArray( to ) ) {
				return null;
			}

			intermediate = [];
			interpolators = [];

			i = len = Math.min( from.length, to.length );
			while ( i-- ) {
				interpolators[i] = interpolate( from[i], to[i] );
			}

			// surplus values - don't interpolate, but don't exclude them either
			for ( i=len; i<from.length; i+=1 ) {
				intermediate[i] = from[i];
			}

			for ( i=len; i<to.length; i+=1 ) {
				intermediate[i] = to[i];
			}

			return function ( t ) {
				var i = len;

				while ( i-- ) {
					intermediate[i] = interpolators[i]( t );
				}

				return intermediate;
			};
		},

		object: function ( from, to ) {
			var properties, len, interpolators, intermediate, prop;

			if ( !isObject( from ) || !isObject( to ) ) {
				return null;
			}

			properties = [];
			intermediate = {};
			interpolators = {};

			for ( prop in from ) {
				if ( hasOwn.call( from, prop ) ) {
					if ( hasOwn.call( to, prop ) ) {
						properties.push( prop );
						interpolators[ prop ] = interpolate( from[ prop ], to[ prop ] ) || snap( to[ prop ] );
					}

					else {
						intermediate[ prop ] = from[ prop ];
					}
				}
			}

			for ( prop in to ) {
				if ( hasOwn.call( to, prop ) && !hasOwn.call( from, prop ) ) {
					intermediate[ prop ] = to[ prop ];
				}
			}

			len = properties.length;

			return function ( t ) {
				var i = len, prop;

				while ( i-- ) {
					prop = properties[i];

					intermediate[ prop ] = interpolators[ prop ]( t );
				}

				return intermediate;
			};
		}
	};

	// TODO: deprecate in future release
	var deprecations = {
		construct: {
			deprecated: 'beforeInit',
			replacement: 'onconstruct'
		},
		render: {
			deprecated: 'init',
			message: 'The "init" method has been deprecated ' +
				'and will likely be removed in a future release. ' +
				'You can either use the "oninit" method which will fire ' +
				'only once prior to, and regardless of, any eventual ractive ' +
				'instance being rendered, or if you need to access the ' +
				'rendered DOM, use "onrender" instead. ' +
				'See http://docs.ractivejs.org/latest/migrating for more information.'
		},
		complete: {
			deprecated: 'complete',
			replacement: 'oncomplete'
		}
	};

	var Hook = function Hook ( event ) {
		this.event = event;
		this.method = 'on' + event;
		this.deprecate = deprecations[ event ];
	};

	Hook.prototype.call = function call ( method, ractive, arg ) {
		if ( ractive[ method ] ) {
			arg ? ractive[ method ]( arg ) : ractive[ method ]();
			return true;
		}
	};

	Hook.prototype.fire = function fire ( ractive, arg ) {
		this.call( this.method, ractive, arg );

		// handle deprecations
		if ( !ractive[ this.method ] && this.deprecate && this.call( this.deprecate.deprecated, ractive, arg ) ) {
			if ( this.deprecate.message ) {
				warnIfDebug( this.deprecate.message );
			} else {
				warnIfDebug( 'The method "%s" has been deprecated in favor of "%s" and will likely be removed in a future release. See http://docs.ractivejs.org/latest/migrating for more information.', this.deprecate.deprecated, this.deprecate.replacement );
			}
		}

		// TODO should probably use internal method, in case ractive.fire was overwritten
		arg ? ractive.fire( this.event, arg ) : ractive.fire( this.event );
	};

	function addToArray ( array, value ) {
		var index = array.indexOf( value );

		if ( index === -1 ) {
			array.push( value );
		}
	}

	function arrayContains ( array, value ) {
		for ( var i = 0, c = array.length; i < c; i++ ) {
			if ( array[i] == value ) {
				return true;
			}
		}

		return false;
	}

	function arrayContentsMatch ( a, b ) {
		var i;

		if ( !isArray( a ) || !isArray( b ) ) {
			return false;
		}

		if ( a.length !== b.length ) {
			return false;
		}

		i = a.length;
		while ( i-- ) {
			if ( a[i] !== b[i] ) {
				return false;
			}
		}

		return true;
	}

	function ensureArray ( x ) {
		if ( typeof x === 'string' ) {
			return [ x ];
		}

		if ( x === undefined ) {
			return [];
		}

		return x;
	}

	function lastItem ( array ) {
		return array[ array.length - 1 ];
	}

	function removeFromArray ( array, member ) {
		if ( !array ) {
			return;
		}

		var index = array.indexOf( member );

		if ( index !== -1 ) {
			array.splice( index, 1 );
		}
	}

	function toArray ( arrayLike ) {
		var array = [], i = arrayLike.length;
		while ( i-- ) {
			array[i] = arrayLike[i];
		}

		return array;
	}

	var _Promise;
	var PENDING = {};
	var FULFILLED = {};
	var REJECTED = {};
	if ( typeof Promise === 'function' ) {
		// use native Promise
		_Promise = Promise;
	} else {
		_Promise = function ( callback ) {
			var fulfilledHandlers = [],
				rejectedHandlers = [],
				state = PENDING,

				result,
				dispatchHandlers,
				makeResolver,
				fulfil,
				reject,

				promise;

			makeResolver = function ( newState ) {
				return function ( value ) {
					if ( state !== PENDING ) {
						return;
					}

					result = value;
					state = newState;

					dispatchHandlers = makeDispatcher( ( state === FULFILLED ? fulfilledHandlers : rejectedHandlers ), result );

					// dispatch onFulfilled and onRejected handlers asynchronously
					wait( dispatchHandlers );
				};
			};

			fulfil = makeResolver( FULFILLED );
			reject = makeResolver( REJECTED );

			try {
				callback( fulfil, reject );
			} catch ( err ) {
				reject( err );
			}

			promise = {
				// `then()` returns a Promise - 2.2.7
				then: function ( onFulfilled, onRejected ) {
					var promise2 = new _Promise( function ( fulfil, reject ) {

						var processResolutionHandler = function ( handler, handlers, forward ) {

							// 2.2.1.1
							if ( typeof handler === 'function' ) {
								handlers.push( function ( p1result ) {
									var x;

									try {
										x = handler( p1result );
										resolve( promise2, x, fulfil, reject );
									} catch ( err ) {
										reject( err );
									}
								});
							} else {
								// Forward the result of promise1 to promise2, if resolution handlers
								// are not given
								handlers.push( forward );
							}
						};

						// 2.2
						processResolutionHandler( onFulfilled, fulfilledHandlers, fulfil );
						processResolutionHandler( onRejected, rejectedHandlers, reject );

						if ( state !== PENDING ) {
							// If the promise has resolved already, dispatch the appropriate handlers asynchronously
							wait( dispatchHandlers );
						}

					});

					return promise2;
				}
			};

			promise[ 'catch' ] = function ( onRejected ) {
				return this.then( null, onRejected );
			};

			return promise;
		};

		_Promise.all = function ( promises ) {
			return new _Promise( function ( fulfil, reject ) {
				var result = [], pending, i, processPromise;

				if ( !promises.length ) {
					fulfil( result );
					return;
				}

				processPromise = function ( promise, i ) {
					if ( promise && typeof promise.then === 'function' ) {
						promise.then( function ( value ) {
							result[i] = value;
							--pending || fulfil( result );
						}, reject );
					}

					else {
						result[i] = promise;
						--pending || fulfil( result );
					}
				};

				pending = i = promises.length;
				while ( i-- ) {
					processPromise( promises[i], i );
				}
			});
		};

		_Promise.resolve = function ( value ) {
			return new _Promise( function ( fulfil ) {
				fulfil( value );
			});
		};

		_Promise.reject = function ( reason ) {
			return new _Promise( function ( fulfil, reject ) {
				reject( reason );
			});
		};
	}

	var Promise$1 = _Promise;

	// TODO use MutationObservers or something to simulate setImmediate
	function wait ( callback ) {
		setTimeout( callback, 0 );
	}

	function makeDispatcher ( handlers, result ) {
		return function () {
			var handler;

			while ( handler = handlers.shift() ) {
				handler( result );
			}
		};
	}

	function resolve ( promise, x, fulfil, reject ) {
		// Promise Resolution Procedure
		var then;

		// 2.3.1
		if ( x === promise ) {
			throw new TypeError( 'A promise\'s fulfillment handler cannot return the same promise' );
		}

		// 2.3.2
		if ( x instanceof _Promise ) {
			x.then( fulfil, reject );
		}

		// 2.3.3
		else if ( x && ( typeof x === 'object' || typeof x === 'function' ) ) {
			try {
				then = x.then; // 2.3.3.1
			} catch ( e ) {
				reject( e ); // 2.3.3.2
				return;
			}

			// 2.3.3.3
			if ( typeof then === 'function' ) {
				var called, resolvePromise, rejectPromise;

				resolvePromise = function ( y ) {
					if ( called ) {
						return;
					}
					called = true;
					resolve( promise, y, fulfil, reject );
				};

				rejectPromise = function ( r ) {
					if ( called ) {
						return;
					}
					called = true;
					reject( r );
				};

				try {
					then.call( x, resolvePromise, rejectPromise );
				} catch ( e ) {
					if ( !called ) { // 2.3.3.3.4.1
						reject( e ); // 2.3.3.3.4.2
						called = true;
						return;
					}
				}
			}

			else {
				fulfil( x );
			}
		}

		else {
			fulfil( x );
		}
	}

	var TransitionManager = function TransitionManager ( callback, parent ) {
		this.callback = callback;
		this.parent = parent;

		this.intros = [];
		this.outros = [];

		this.children = [];
		this.totalChildren = this.outroChildren = 0;

		this.detachQueue = [];
		this.outrosComplete = false;

		if ( parent ) {
			parent.addChild( this );
		}
	};

	TransitionManager.prototype.add = function add ( transition ) {
		var list = transition.isIntro ? this.intros : this.outros;
		list.push( transition );
	};

	TransitionManager.prototype.addChild = function addChild ( child ) {
		this.children.push( child );

		this.totalChildren += 1;
		this.outroChildren += 1;
	};

	TransitionManager.prototype.decrementOutros = function decrementOutros () {
		this.outroChildren -= 1;
		check( this );
	};

	TransitionManager.prototype.decrementTotal = function decrementTotal () {
		this.totalChildren -= 1;
		check( this );
	};

	TransitionManager.prototype.detachNodes = function detachNodes () {
		this.detachQueue.forEach( detach );
		this.children.forEach( _detachNodes );
		this.detachQueue = [];
	};

	TransitionManager.prototype.ready = function ready () {
		detachImmediate( this );
	};

	TransitionManager.prototype.remove = function remove ( transition ) {
		var list = transition.isIntro ? this.intros : this.outros;
		removeFromArray( list, transition );
		check( this );
	};

	TransitionManager.prototype.start = function start () {
		this.children.forEach( function ( c ) { return c.start(); } );
		this.intros.concat( this.outros ).forEach( function ( t ) { return t.start(); } );
		this.ready = true;
		check( this );
	};

	function detach ( element ) {
		element.detach();
	}

	function _detachNodes ( tm ) { // _ to avoid transpiler quirk
		tm.detachNodes();
	}

	function check ( tm ) {
		if ( !tm.ready || tm.outros.length || tm.outroChildren ) return;

		// If all outros are complete, and we haven't already done this,
		// we notify the parent if there is one, otherwise
		// start detaching nodes
		if ( !tm.outrosComplete ) {
			tm.outrosComplete = true;

			if ( tm.parent && !tm.parent.outrosComplete ) {
				tm.parent.decrementOutros( tm );
			} else {
				tm.detachNodes();
			}
		}

		// Once everything is done, we can notify parent transition
		// manager and call the callback
		if ( !tm.intros.length && !tm.totalChildren ) {
			if ( typeof tm.callback === 'function' ) {
				tm.callback();
			}

			if ( tm.parent && !tm.notifiedTotal ) {
				tm.notifiedTotal = true;
				tm.parent.decrementTotal();
			}
		}
	}

	// check through the detach queue to see if a node is up or downstream from a
	// transition and if not, go ahead and detach it
	function detachImmediate ( manager ) {
		var queue = manager.detachQueue;
		var outros = collectAllOutros( manager );

		var i = queue.length, j = 0, node, trans;
		start: while ( i-- ) {
			node = queue[i].node;
			j = outros.length;
			while ( j-- ) {
				trans = outros[j].element.node;
				// check to see if the node is, contains, or is contained by the transitioning node
				if ( trans === node || trans.contains( node ) || node.contains( trans ) ) continue start;
			}

			// no match, we can drop it
			queue[i].detach();
			queue.splice( i, 1 );
		}
	}

	function collectAllOutros ( manager, list ) {
		if ( !list ) {
			list = [];
			var parent = manager;
			while ( parent.parent ) parent = parent.parent;
			return collectAllOutros( parent, list );
		} else {
			var i = manager.children.length;
			while ( i-- ) {
				list = collectAllOutros( manager.children[i], list );
			}
			list = list.concat( manager.outros );
			return list;
		}
	}

	var changeHook = new Hook( 'change' );

	var batch;

	var runloop = {
		start: function ( instance, returnPromise ) {
			var promise, fulfilPromise;

			if ( returnPromise ) {
				promise = new Promise$1( function ( f ) { return ( fulfilPromise = f ); } );
			}

			batch = {
				previousBatch: batch,
				transitionManager: new TransitionManager( fulfilPromise, batch && batch.transitionManager ),
				fragments: [],
				tasks: [],
				immediateObservers: [],
				deferredObservers: [],
				ractives: [],
				instance: instance
			};

			return promise;
		},

		end: function () {
			flushChanges();

			if ( !batch.previousBatch ) batch.transitionManager.start();

			batch = batch.previousBatch;
		},

		addFragment: function ( fragment ) {
			addToArray( batch.fragments, fragment );
		},

		// TODO: come up with a better way to handle fragments that trigger their own update
		addFragmentToRoot: function ( fragment ) {
			if ( !batch ) return;

			var b = batch;
			while ( b.previousBatch ) {
				b = b.previousBatch;
			}

			addToArray( b.fragments, fragment );
		},

		addInstance: function ( instance ) {
			if ( batch ) addToArray( batch.ractives, instance );
		},

		addObserver: function ( observer, defer ) {
			addToArray( defer ? batch.deferredObservers : batch.immediateObservers, observer );
		},

		registerTransition: function ( transition ) {
			transition._manager = batch.transitionManager;
			batch.transitionManager.add( transition );
		},

		// synchronise node detachments with transition ends
		detachWhenReady: function ( thing ) {
			batch.transitionManager.detachQueue.push( thing );
		},

		scheduleTask: function ( task, postRender ) {
			var _batch;

			if ( !batch ) {
				task();
			} else {
				_batch = batch;
				while ( postRender && _batch.previousBatch ) {
					// this can't happen until the DOM has been fully updated
					// otherwise in some situations (with components inside elements)
					// transitions and decorators will initialise prematurely
					_batch = _batch.previousBatch;
				}

				_batch.tasks.push( task );
			}
		}
	};

	function dispatch ( observer ) {
		observer.dispatch();
	}

	function flushChanges () {
		var which = batch.immediateObservers;
		batch.immediateObservers = [];
		which.forEach( dispatch );

		// Now that changes have been fully propagated, we can update the DOM
		// and complete other tasks
		var i = batch.fragments.length;
		var fragment;

		which = batch.fragments;
		batch.fragments = [];
		var ractives = batch.ractives;
		batch.ractives = [];

		while ( i-- ) {
			fragment = which[i];

			// TODO deprecate this. It's annoying and serves no useful function
			var ractive = fragment.ractive;
			if ( Object.keys( ractive.viewmodel.changes ).length ) {
				changeHook.fire( ractive, ractive.viewmodel.changes );
			}
			ractive.viewmodel.changes = {};
			removeFromArray( ractives, ractive );

			fragment.update();
		}

		i = ractives.length;
		while ( i-- ) {
			var ractive$1 = ractives[i];
			changeHook.fire( ractive$1, ractive$1.viewmodel.changes );
			ractive$1.viewmodel.changes = {};
		}

		batch.transitionManager.ready();

		which = batch.deferredObservers;
		batch.deferredObservers = [];
		which.forEach( dispatch );

		var tasks = batch.tasks;
		batch.tasks = [];

		for ( i = 0; i < tasks.length; i += 1 ) {
			tasks[i]();
		}

		// If updating the view caused some model blowback - e.g. a triple
		// containing <option> elements caused the binding on the <select>
		// to update - then we start over
		if ( batch.fragments.length || batch.immediateObservers.length || batch.deferredObservers.length || batch.ractives.length || batch.tasks.length ) return flushChanges();
	}

	var refPattern = /\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g;
	var splitPattern = /([^\\](?:\\\\)*)\./;
	var escapeKeyPattern = /\\|\./g;
	var unescapeKeyPattern = /((?:\\)+)\1|\\(\.)/g;

	function escapeKey ( key ) {
		if ( typeof key === 'string' ) {
			return key.replace( escapeKeyPattern, '\\$&' );
		}

		return key;
	}

	function normalise ( ref ) {
		return ref ? ref.replace( refPattern, '.$1' ) : '';
	}

	function splitKeypathI ( keypath ) {
		var result = [],
			match;

		keypath = normalise( keypath );

		while ( match = splitPattern.exec( keypath ) ) {
			var index = match.index + match[1].length;
			result.push( keypath.substr( 0, index ) );
			keypath = keypath.substr( index + 1 );
		}

		result.push(keypath);

		return result;
	}

	function unescapeKey ( key ) {
		if ( typeof key === 'string' ) {
			return key.replace( unescapeKeyPattern, '$1$2' );
		}

		return key;
	}

	var fnBind = Function.prototype.bind;

	function bind ( fn, context ) {
		if ( !/this/.test( fn.toString() ) ) return fn;

		var bound = fnBind.call( fn, context );
		for ( var prop in fn ) bound[ prop ] = fn[ prop ];

		return bound;
	}

	function set ( ractive, pairs ) {
		var promise = runloop.start( ractive, true );

		var i = pairs.length;
		while ( i-- ) {
			var ref = pairs[i], model = ref[0], value = ref[1];
			if ( typeof value === 'function' ) value = bind( value, ractive );
			model.set( value );
		}

		runloop.end();

		return promise;
	}

	var star = /\*/;
	function gather ( ractive, keypath, base ) {
		if ( base === void 0 ) base = ractive.viewmodel;

		if ( star.test( keypath ) ) {
			return base.findMatches( splitKeypathI( keypath ) );
		} else {
			return [ base.joinAll( splitKeypathI( keypath ) ) ];
		}
	}

	function build ( ractive, keypath, value ) {
		var sets = [];

		// set multiple keypaths in one go
		if ( isObject( keypath ) ) {
			var loop = function ( k ) {
				if ( keypath.hasOwnProperty( k ) ) {
					sets.push.apply( sets, gather( ractive, k ).map( function ( m ) { return [ m, keypath[k] ]; } ) );
				}
			};

			for ( var k in keypath ) loop( k );

		}
		// set a single keypath
		else {
			sets.push.apply( sets, gather( ractive, keypath ).map( function ( m ) { return [ m, value ]; } ) );
		}

		return sets;
	}

	var errorMessage = 'Cannot add to a non-numeric value';

	function add ( ractive, keypath, d ) {
		if ( typeof keypath !== 'string' || !isNumeric( d ) ) {
			throw new Error( 'Bad arguments' );
		}

		var sets = build( ractive, keypath, d );

		return set( ractive, sets.map( function ( pair ) {
			var model = pair[0], add = pair[1], value = model.get();
			if ( !isNumeric( add ) || !isNumeric( value ) ) throw new Error( errorMessage );
			return [ model, value + add ];
		}));
	}

	function Ractive$add ( keypath, d ) {
		return add( this, keypath, ( d === undefined ? 1 : +d ) );
	}

	var noAnimation = Promise$1.resolve();
	defineProperty( noAnimation, 'stop', { value: noop });

	var linear = easing.linear;

	function getOptions ( options, instance ) {
		options = options || {};

		var easing;
		if ( options.easing ) {
			easing = typeof options.easing === 'function' ?
				options.easing :
				instance.easing[ options.easing ];
		}

		return {
			easing: easing || linear,
			duration: 'duration' in options ? options.duration : 400,
			complete: options.complete || noop,
			step: options.step || noop
		};
	}

	function protoAnimate ( ractive, model, to, options ) {
		options = getOptions( options, ractive );
		var from = model.get();

		// don't bother animating values that stay the same
		if ( isEqual( from, to ) ) {
			options.complete( options.to );
			return noAnimation; // TODO should this have .then and .catch methods?
		}

		var interpolator = interpolate( from, to, ractive, options.interpolator );

		// if we can't interpolate the value, set it immediately
		if ( !interpolator ) {
			runloop.start();
			model.set( to );
			runloop.end();

			return noAnimation;
		}

		return model.animate( from, to, options, interpolator );
	}

	function Ractive$animate ( keypath, to, options ) {
		if ( typeof keypath === 'object' ) {
			var keys = Object.keys( keypath );

			throw new Error( ("ractive.animate(...) no longer supports objects. Instead of ractive.animate({\n  " + (keys.map( function ( key ) { return ("'" + key + "': " + (keypath[ key ])); } ).join( '\n  ' )) + "\n}, {...}), do\n\n" + (keys.map( function ( key ) { return ("ractive.animate('" + key + "', " + (keypath[ key ]) + ", {...});"); } ).join( '\n' )) + "\n") );
		}


		return protoAnimate( this, this.viewmodel.joinAll( splitKeypathI( keypath ) ), to, options );
	}

	var detachHook = new Hook( 'detach' );

	function Ractive$detach () {
		if ( this.isDetached ) {
			return this.el;
		}

		if ( this.el ) {
			removeFromArray( this.el.__ractive_instances__, this );
		}

		this.el = this.fragment.detach();
		this.isDetached = true;

		detachHook.fire( this );
		return this.el;
	}

	function Ractive$find ( selector ) {
		if ( !this.el ) throw new Error( ("Cannot call ractive.find('" + selector + "') unless instance is rendered to the DOM") );

		return this.fragment.find( selector );
	}

	function sortByDocumentPosition ( node, otherNode ) {
		if ( node.compareDocumentPosition ) {
			var bitmask = node.compareDocumentPosition( otherNode );
			return ( bitmask & 2 ) ? 1 : -1;
		}

		// In old IE, we can piggy back on the mechanism for
		// comparing component positions
		return sortByItemPosition( node, otherNode );
	}

	function sortByItemPosition ( a, b ) {
		var ancestryA = getAncestry( a.component || a._ractive.proxy );
		var ancestryB = getAncestry( b.component || b._ractive.proxy );

		var oldestA = lastItem( ancestryA );
		var oldestB = lastItem( ancestryB );
		var mutualAncestor;

		// remove items from the end of both ancestries as long as they are identical
		// - the final one removed is the closest mutual ancestor
		while ( oldestA && ( oldestA === oldestB ) ) {
			ancestryA.pop();
			ancestryB.pop();

			mutualAncestor = oldestA;

			oldestA = lastItem( ancestryA );
			oldestB = lastItem( ancestryB );
		}

		// now that we have the mutual ancestor, we can find which is earliest
		oldestA = oldestA.component || oldestA;
		oldestB = oldestB.component || oldestB;

		var fragmentA = oldestA.parentFragment;
		var fragmentB = oldestB.parentFragment;

		// if both items share a parent fragment, our job is easy
		if ( fragmentA === fragmentB ) {
			var indexA = fragmentA.items.indexOf( oldestA );
			var indexB = fragmentB.items.indexOf( oldestB );

			// if it's the same index, it means one contains the other,
			// so we see which has the longest ancestry
			return ( indexA - indexB ) || ancestryA.length - ancestryB.length;
		}

		// if mutual ancestor is a section, we first test to see which section
		// fragment comes first
		var fragments = mutualAncestor.iterations;
		if ( fragments ) {
			var indexA$1 = fragments.indexOf( fragmentA );
			var indexB$1 = fragments.indexOf( fragmentB );

			return ( indexA$1 - indexB$1 ) || ancestryA.length - ancestryB.length;
		}

		throw new Error( 'An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/ractivejs/ractive/issues - thanks!' );
	}

	function getParent ( item ) {
		var parentFragment = item.parentFragment;

		if ( parentFragment ) return parentFragment.owner;

		if ( item.component && ( parentFragment = item.component.parentFragment ) ) {
			return parentFragment.owner;
		}
	}

	function getAncestry ( item ) {
		var ancestry = [ item ];
		var ancestor = getParent( item );

		while ( ancestor ) {
			ancestry.push( ancestor );
			ancestor = getParent( ancestor );
		}

		return ancestry;
	}


	var Query = function Query ( ractive, selector, live, isComponentQuery ) {
		this.ractive = ractive;
		this.selector = selector;
		this.live = live;
		this.isComponentQuery = isComponentQuery;

		this.result = [];

		this.dirty = true;
	};

	Query.prototype.add = function add ( item ) {
		this.result.push( item );
		this.makeDirty();
	};

	Query.prototype.cancel = function cancel () {
		var liveQueries = this._root[ this.isComponentQuery ? 'liveComponentQueries' : 'liveQueries' ];
		var selector = this.selector;

		var index = liveQueries.indexOf( selector );

		if ( index !== -1 ) {
			liveQueries.splice( index, 1 );
			liveQueries[ selector ] = null;
		}
	};

	Query.prototype.init = function init () {
		this.dirty = false;
	};

	Query.prototype.makeDirty = function makeDirty () {
		var this$1 = this;

			if ( !this.dirty ) {
			this.dirty = true;

			// Once the DOM has been updated, ensure the query
			// is correctly ordered
			runloop.scheduleTask( function () { return this$1.update(); } );
		}
	};

	Query.prototype.remove = function remove ( nodeOrComponent ) {
		var index = this.result.indexOf( this.isComponentQuery ? nodeOrComponent.instance : nodeOrComponent );
		if ( index !== -1 ) this.result.splice( index, 1 );
	};

	Query.prototype.update = function update () {
		this.result.sort( this.isComponentQuery ? sortByItemPosition : sortByDocumentPosition );
		this.dirty = false;
	};

	Query.prototype.test = function test ( item ) {
		return this.isComponentQuery ?
			( !this.selector || item.name === this.selector ) :
			( item ? matches( item, this.selector ) : null );
	};

	function Ractive$findAll ( selector, options ) {
		if ( !this.el ) throw new Error( ("Cannot call ractive.findAll('" + selector + "', ...) unless instance is rendered to the DOM") );

		options = options || {};
		var liveQueries = this._liveQueries;

		// Shortcut: if we're maintaining a live query with this
		// selector, we don't need to traverse the parallel DOM
		var query = liveQueries[ selector ];
		if ( query ) {
			// Either return the exact same query, or (if not live) a snapshot
			return ( options && options.live ) ? query : query.slice();
		}

		query = new Query( this, selector, !!options.live, false );

		// Add this to the list of live queries Ractive needs to maintain,
		// if applicable
		if ( query.live ) {
			liveQueries.push( selector );
			liveQueries[ '_' + selector ] = query;
		}

		this.fragment.findAll( selector, query );

		query.init();
		return query.result;
	}

	function Ractive$findAllComponents ( selector, options ) {
		options = options || {};
		var liveQueries = this._liveComponentQueries;

		// Shortcut: if we're maintaining a live query with this
		// selector, we don't need to traverse the parallel DOM
		var query = liveQueries[ selector ];
		if ( query ) {
			// Either return the exact same query, or (if not live) a snapshot
			return ( options && options.live ) ? query : query.slice();
		}

		query = new Query( this, selector, !!options.live, true );

		// Add this to the list of live queries Ractive needs to maintain,
		// if applicable
		if ( query.live ) {
			liveQueries.push( selector );
			liveQueries[ '_' + selector ] = query;
		}

		this.fragment.findAllComponents( selector, query );

		query.init();
		return query.result;
	}

	function Ractive$findComponent ( selector ) {
		return this.fragment.findComponent( selector );
	}

	function Ractive$findContainer ( selector ) {
		if ( this.container ) {
			if ( this.container.component && this.container.component.name === selector ) {
				return this.container;
			} else {
				return this.container.findContainer( selector );
			}
		}

		return null;
	}

	function Ractive$findParent ( selector ) {

		if ( this.parent ) {
			if ( this.parent.component && this.parent.component.name === selector ) {
				return this.parent;
			} else {
				return this.parent.findParent ( selector );
			}
		}

		return null;
	}

	function enqueue ( ractive, event ) {
		if ( ractive.event ) {
			ractive._eventQueue.push( ractive.event );
		}

		ractive.event = event;
	}

	function dequeue ( ractive ) {
		if ( ractive._eventQueue.length ) {
			ractive.event = ractive._eventQueue.pop();
		} else {
			ractive.event = null;
		}
	}

	var starMaps = {};

	// This function takes a keypath such as 'foo.bar.baz', and returns
	// all the variants of that keypath that include a wildcard in place
	// of a key, such as 'foo.bar.*', 'foo.*.baz', 'foo.*.*' and so on.
	// These are then checked against the dependants map (ractive.viewmodel.depsMap)
	// to see if any pattern observers are downstream of one or more of
	// these wildcard keypaths (e.g. 'foo.bar.*.status')
	function getPotentialWildcardMatches ( keypath ) {
		var keys, starMap, mapper, i, result, wildcardKeypath;

		keys = splitKeypathI( keypath );
		if( !( starMap = starMaps[ keys.length ]) ) {
			starMap = getStarMap( keys.length );
		}

		result = [];

		mapper = function ( star, i ) {
			return star ? '*' : keys[i];
		};

		i = starMap.length;
		while ( i-- ) {
			wildcardKeypath = starMap[i].map( mapper ).join( '.' );

			if ( !result.hasOwnProperty( wildcardKeypath ) ) {
				result.push( wildcardKeypath );
				result[ wildcardKeypath ] = true;
			}
		}

		return result;
	}

	// This function returns all the possible true/false combinations for
	// a given number - e.g. for two, the possible combinations are
	// [ true, true ], [ true, false ], [ false, true ], [ false, false ].
	// It does so by getting all the binary values between 0 and e.g. 11
	function getStarMap ( num ) {
		var ones = '', max, binary, starMap, mapper, i, j, l, map;

		if ( !starMaps[ num ] ) {
			starMap = [];

			while ( ones.length < num ) {
				ones += 1;
			}

			max = parseInt( ones, 2 );

			mapper = function ( digit ) {
				return digit === '1';
			};

			for ( i = 0; i <= max; i += 1 ) {
				binary = i.toString( 2 );
				while ( binary.length < num ) {
					binary = '0' + binary;
				}

				map = [];
				l = binary.length;
				for (j = 0; j < l; j++) {
					map.push( mapper( binary[j] ) );
				}
				starMap[i] = map;
			}

			starMaps[ num ] = starMap;
		}

		return starMaps[ num ];
	}

	var wildcardCache = {};

	function fireEvent ( ractive, eventName, options ) {
		if ( options === void 0 ) options = {};

		if ( !eventName ) { return; }

		if ( !options.event ) {
			options.event = {
				name: eventName,
				// until event not included as argument default
				_noArg: true
			};
		} else {
			options.event.name = eventName;
		}

		var eventNames = getWildcardNames( eventName );

		return fireEventAs( ractive, eventNames, options.event, options.args, true );
	}

	function getWildcardNames ( eventName ) {
		if ( wildcardCache.hasOwnProperty( eventName ) ) {
			return wildcardCache[ eventName ];
		} else {
			return wildcardCache[ eventName ] = getPotentialWildcardMatches( eventName );
		}
	}

	function fireEventAs  ( ractive, eventNames, event, args, initialFire ) {

		if ( initialFire === void 0 ) initialFire = false;

		var subscribers, i, bubble = true;

		enqueue( ractive, event );

		for ( i = eventNames.length; i >= 0; i-- ) {
			subscribers = ractive._subs[ eventNames[ i ] ];

			if ( subscribers ) {
				bubble = notifySubscribers( ractive, subscribers, event, args ) && bubble;
			}
		}

		dequeue( ractive );

		if ( ractive.parent && bubble ) {

			if ( initialFire && ractive.component ) {
				var fullName = ractive.component.name + '.' + eventNames[ eventNames.length-1 ];
				eventNames = getWildcardNames( fullName );

				if( event && !event.component ) {
					event.component = ractive;
				}
			}

			bubble = fireEventAs( ractive.parent, eventNames, event, args );
		}

		return bubble;
	}

	function notifySubscribers ( ractive, subscribers, event, args ) {
		var originalEvent = null, stopEvent = false;

		if ( event && !event._noArg ) {
			args = [ event ].concat( args );
		}

		// subscribers can be modified inflight, e.g. "once" functionality
		// so we need to copy to make sure everyone gets called
		subscribers = subscribers.slice();

		for ( var i = 0, len = subscribers.length; i < len; i += 1 ) {
			if ( !subscribers[ i ].off && subscribers[ i ].callback.apply( ractive, args ) === false ) {
				stopEvent = true;
			}
		}

		if ( event && !event._noArg && stopEvent && ( originalEvent = event.original ) ) {
			originalEvent.preventDefault && originalEvent.preventDefault();
			originalEvent.stopPropagation && originalEvent.stopPropagation();
		}

		return !stopEvent;
	}

	function Ractive$fire ( eventName ) {
		var args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		return fireEvent( this, eventName, { args: args });
	}

	function badReference ( key ) {
		throw new Error( ("An index or key reference (" + key + ") cannot have child properties") );
	}

	function resolveAmbiguousReference ( fragment, ref ) {
		var localViewmodel = fragment.findContext().root;
		var keys = splitKeypathI( ref );
		var key = keys[0];

		var hasContextChain;
		var crossedComponentBoundary;
		var aliases;

		while ( fragment ) {
			// repeated fragments
			if ( fragment.isIteration ) {
				if ( key === fragment.parent.keyRef ) {
					if ( keys.length > 1 ) badReference( key );
					return fragment.context.getKeyModel( fragment.key );
				}

				if ( key === fragment.parent.indexRef ) {
					if ( keys.length > 1 ) badReference( key );
					return fragment.context.getKeyModel( fragment.index );
				}
			}

			// alias node or iteration
			if ( ( ( aliases = fragment.owner.aliases ) || ( aliases = fragment.aliases ) ) && aliases.hasOwnProperty( key ) ) {
				var model = aliases[ key ];

				if ( keys.length === 1 ) return model;
				else if ( typeof model.joinAll === 'function' ) {
					return model.joinAll( keys.slice( 1 ) );
				}
			}

			if ( fragment.context ) {
				// TODO better encapsulate the component check
				if ( !fragment.isRoot || fragment.ractive.component ) hasContextChain = true;

				if ( fragment.context.has( key ) ) {
					if ( crossedComponentBoundary ) {
						return localViewmodel.createLink( key, fragment.context.joinKey( keys.shift() ), key ).joinAll( keys );
					}

					return fragment.context.joinAll( keys );
				}
			}

			if ( fragment.componentParent && !fragment.ractive.isolated ) {
				// ascend through component boundary
				fragment = fragment.componentParent;
				crossedComponentBoundary = true;
			} else {
				fragment = fragment.parent;
			}
		}

		if ( !hasContextChain ) {
			return localViewmodel.joinAll( keys );
		}
	}

	var stack = [];
	var captureGroup;

	function startCapturing () {
		stack.push( captureGroup = [] );
	}

	function stopCapturing () {
		var dependencies = stack.pop();
		captureGroup = stack[ stack.length - 1 ];
		return dependencies;
	}

	function capture ( model ) {
		if ( captureGroup ) {
			captureGroup.push( model );
		}
	}

	var KeyModel = function KeyModel ( key, parent ) {
		this.value = key;
		this.isReadonly = this.isKey = true;
		this.deps = [];
		this.links = [];
		this.parent = parent;
	};

	KeyModel.prototype.get = function get ( shouldCapture ) {
		if ( shouldCapture ) capture( this );
		return unescapeKey( this.value );
	};

	KeyModel.prototype.getKeypath = function getKeypath () {
		return unescapeKey( this.value );
	};

	KeyModel.prototype.rebinding = function rebinding ( next, previous ) {
		var this$1 = this;

			var i = this.deps.length;
		while ( i-- ) this$1.deps[i].rebinding( next, previous, false );

		i = this.links.length;
		while ( i-- ) this$1.links[i].rebinding( next, previous, false );
	};

	KeyModel.prototype.register = function register ( dependant ) {
		this.deps.push( dependant );
	};

	KeyModel.prototype.registerLink = function registerLink ( link ) {
		addToArray( this.links, link );
	};

	KeyModel.prototype.unregister = function unregister ( dependant ) {
		removeFromArray( this.deps, dependant );
	};

	KeyModel.prototype.unregisterLink = function unregisterLink ( link ) {
		removeFromArray( this.links, link );
	};

	KeyModel.prototype.reference = noop;
	KeyModel.prototype.unreference = noop;

	function bind$1               ( x ) { x.bind(); }
	function cancel             ( x ) { x.cancel(); }
	function handleChange       ( x ) { x.handleChange(); }
	function mark               ( x ) { x.mark(); }
	function marked             ( x ) { x.marked(); }
	function markedAll          ( x ) { x.markedAll(); }
	function notifiedUpstream   ( x ) { x.notifiedUpstream(); }
	function render             ( x ) { x.render(); }
	function teardown           ( x ) { x.teardown(); }
	function unbind             ( x ) { x.unbind(); }
	function unrender           ( x ) { x.unrender(); }
	function unrenderAndDestroy ( x ) { x.unrender( true ); }
	function update             ( x ) { x.update(); }
	function toString$1           ( x ) { return x.toString(); }
	function toEscapedString    ( x ) { return x.toString( true ); }

	var KeypathModel = function KeypathModel ( parent, ractive ) {
		this.parent = parent;
		this.ractive = ractive;
		this.value = ractive ? parent.getKeypath( ractive ) : parent.getKeypath();
		this.deps = [];
		this.children = {};
		this.isReadonly = this.isKeypath = true;
	};

	KeypathModel.prototype.get = function get ( shouldCapture ) {
		if ( shouldCapture ) capture( this );
		return this.value;
	};

	KeypathModel.prototype.getChild = function getChild ( ractive ) {
		if ( !( ractive._guid in this.children ) ) {
			var model = new KeypathModel( this.parent, ractive );
			this.children[ ractive._guid ] = model;
			model.owner = this;
		}
		return this.children[ ractive._guid ];
	};

	KeypathModel.prototype.getKeypath = function getKeypath () {
		return this.value;
	};

	KeypathModel.prototype.handleChange = function handleChange$1 () {
		var this$1 = this;

			var keys = Object.keys( this.children );
		var i = keys.length;
		while ( i-- ) {
			this$1.children[ keys[i] ].handleChange();
		}

		this.deps.forEach( handleChange );
	};

	KeypathModel.prototype.rebindChildren = function rebindChildren ( next ) {
		var this$1 = this;

			var keys = Object.keys( this.children );
		var i = keys.length;
		while ( i-- ) {
			var child = this$1.children[keys[i]];
			child.value = next.getKeypath( child.ractive );
			child.handleChange();
		}
	};

	KeypathModel.prototype.rebinding = function rebinding ( next, previous ) {
		var this$1 = this;

			var model = next ? next.getKeypathModel( this.ractive ) : undefined;

		var keys = Object.keys( this.children );
		var i = keys.length;
		while ( i-- ) {
			this$1.children[ keys[i] ].rebinding( next, previous, false );
		}

		i = this.deps.length;
		while ( i-- ) {
			this$1.deps[i].rebinding( model, this$1, false );
		}
	};

	KeypathModel.prototype.register = function register ( dep ) {
		this.deps.push( dep );
	};

	KeypathModel.prototype.removeChild = function removeChild( model ) {
		if ( model.ractive ) delete this.children[ model.ractive._guid ];
	};

	KeypathModel.prototype.teardown = function teardown () {
		var this$1 = this;

			if ( this.owner ) this.owner.removeChild( this );

		var keys = Object.keys( this.children );
		var i = keys.length;
		while ( i-- ) {
			this$1.children[ keys[i] ].teardown();
		}
	};

	KeypathModel.prototype.unregister = function unregister ( dep ) {
		removeFromArray( this.deps, dep );
		if ( !this.deps.length ) this.teardown();
	};

	KeypathModel.prototype.reference = noop;
	KeypathModel.prototype.unreference = noop;

	var hasProp = Object.prototype.hasOwnProperty;

	var shuffleTasks = { early: [], mark: [] };
	var registerQueue = { early: [], mark: [] };

	var ModelBase = function ModelBase ( parent ) {
		this.deps = [];

		this.children = [];
		this.childByKey = {};
		this.links = [];

		this.keyModels = {};

		this.unresolved = [];
		this.unresolvedByKey = {};

		this.bindings = [];
		this.patternObservers = [];

		if ( parent ) {
			this.parent = parent;
			this.root = parent.root;
		}
	};

	ModelBase.prototype.addUnresolved = function addUnresolved ( key, resolver ) {
		if ( !this.unresolvedByKey[ key ] ) {
			this.unresolved.push( key );
			this.unresolvedByKey[ key ] = [];
		}

		this.unresolvedByKey[ key ].push( resolver );
	};

	ModelBase.prototype.addShuffleTask = function addShuffleTask ( task, stage ) { if ( stage === void 0 ) stage = 'early';

		shuffleTasks[stage].push( task ); };
	ModelBase.prototype.addShuffleRegister = function addShuffleRegister ( item, stage ) { if ( stage === void 0 ) stage = 'early';

		registerQueue[stage].push({ model: this, item: item }); };

	ModelBase.prototype.clearUnresolveds = function clearUnresolveds ( specificKey ) {
		var this$1 = this;

			var i = this.unresolved.length;

		while ( i-- ) {
			var key = this$1.unresolved[i];

			if ( specificKey && key !== specificKey ) continue;

			var resolvers = this$1.unresolvedByKey[ key ];
			var hasKey = this$1.has( key );

			var j = resolvers.length;
			while ( j-- ) {
				if ( hasKey ) resolvers[j].attemptResolution();
				if ( resolvers[j].resolved ) resolvers.splice( j, 1 );
			}

			if ( !resolvers.length ) {
				this$1.unresolved.splice( i, 1 );
				this$1.unresolvedByKey[ key ] = null;
			}
		}
	};

	ModelBase.prototype.findMatches = function findMatches ( keys ) {
		var len = keys.length;

		var existingMatches = [ this ];
		var matches;
		var i;

		var loop = function (  ) {
			var key = keys[i];

			if ( key === '*' ) {
				matches = [];
				existingMatches.forEach( function ( model ) {
					matches.push.apply( matches, model.getValueChildren( model.get() ) );
				});
			} else {
				matches = existingMatches.map( function ( model ) { return model.joinKey( key ); } );
			}

			existingMatches = matches;
		};

			for ( i = 0; i < len; i += 1 ) loop(  );

		return matches;
	};

	ModelBase.prototype.getKeyModel = function getKeyModel ( key, skip ) {
		if ( key !== undefined && !skip ) return this.parent.getKeyModel( key, true );

		if ( !( key in this.keyModels ) ) this.keyModels[ key ] = new KeyModel( escapeKey( key ), this );

		return this.keyModels[ key ];
	};

	ModelBase.prototype.getKeypath = function getKeypath ( ractive ) {
		if ( ractive !== this.ractive && this._link ) return this._link.target.getKeypath( ractive );

		if ( !this.keypath ) {
			this.keypath = this.parent.isRoot ? this.key : ("" + (this.parent.getKeypath( ractive )) + "." + (escapeKey( this.key )));
		}

		return this.keypath;
	};

	ModelBase.prototype.getValueChildren = function getValueChildren ( value ) {
		var this$1 = this;

			var children;
		if ( isArray( value ) ) {
			children = [];
			if ( 'length' in this && this.length !== value.length ) {
				children.push( this.joinKey( 'length' ) );
			}
			value.forEach( function ( m, i ) {
				children.push( this$1.joinKey( i ) );
			});
		}

		else if ( isObject( value ) || typeof value === 'function' ) {
			children = Object.keys( value ).map( function ( key ) { return this$1.joinKey( key ); } );
		}

		else if ( value != null ) {
			return [];
		}

		return children;
	};

	ModelBase.prototype.getVirtual = function getVirtual ( shouldCapture ) {
		var this$1 = this;

			var value = this.get( shouldCapture, { virtual: false } );
		if ( isObject( value ) ) {
			var result = isArray( value ) ? [] : {};

			var keys = Object.keys( value );
			var i = keys.length;
			while ( i-- ) {
				var child = this$1.childByKey[ keys[i] ];
				if ( !child ) result[ keys[i] ] = value[ keys[i] ];
				else if ( child._link ) result[ keys[i] ] = child._link.getVirtual();
				else result[ keys[i] ] = child.getVirtual();
			}

			i = this.children.length;
			while ( i-- ) {
				var child$1 = this$1.children[i];
				if ( !( child$1.key in result ) && child$1._link ) {
					result[ child$1.key ] = child$1._link.getVirtual();
				}
			}

			return result;
		} else return value;
	};

	ModelBase.prototype.has = function has ( key ) {
		if ( this._link ) return this._link.has( key );

		var value = this.get();
		if ( !value ) return false;

		key = unescapeKey( key );
		if ( hasProp.call( value, key ) ) return true;

		// We climb up the constructor chain to find if one of them contains the key
		var constructor = value.constructor;
		while ( constructor !== Function && constructor !== Array && constructor !== Object ) {
			if ( hasProp.call( constructor.prototype, key ) ) return true;
			constructor = constructor.constructor;
		}

		return false;
	};

	ModelBase.prototype.joinAll = function joinAll ( keys, opts ) {
		var model = this;
		for ( var i = 0; i < keys.length; i += 1 ) {
			if ( opts && opts.lastLink === false && i + 1 === keys.length && model.childByKey[keys[i]] && model.childByKey[keys[i]]._link ) return model.childByKey[keys[i]];
			model = model.joinKey( keys[i], opts );
		}

		return model;
	};

	ModelBase.prototype.notifyUpstream = function notifyUpstream () {
		var parent = this.parent, path = [ this.key ];
		while ( parent ) {
			if ( parent.patternObservers.length ) parent.patternObservers.forEach( function ( o ) { return o.notify( path.slice() ); } );
			path.unshift( parent.key );
			parent.links.forEach( notifiedUpstream );
			parent.deps.forEach( handleChange );
			parent = parent.parent;
		}
	};

	ModelBase.prototype.rebinding = function rebinding ( next, previous, safe ) {
		// tell the deps to move to the new target
		var this$1 = this;

			var i = this.deps.length;
		while ( i-- ) {
			if ( this$1.deps[i].rebinding ) this$1.deps[i].rebinding( next, previous, safe );
		}

		i = this.links.length;
		while ( i-- ) {
			var link = this$1.links[i];
			// only relink the root of the link tree
			if ( link.owner._link ) link.relinking( next, true, safe );
		}

		i = this.children.length;
		while ( i-- ) {
			var child = this$1.children[i];
			child.rebinding( next ? next.joinKey( child.key ) : undefined, child, safe );
		}

		i = this.unresolved.length;
		while ( i-- ) {
			var unresolved = this$1.unresolvedByKey[ this$1.unresolved[i] ];
			var c = unresolved.length;
			while ( c-- ) {
				unresolved[c].rebinding( next, previous );
			}
		}

		if ( this.keypathModel ) this.keypathModel.rebinding( next, previous, false );

		i = this.bindings.length;
		while ( i-- ) {
			this$1.bindings[i].rebinding( next, previous, safe );
		}
	};

	ModelBase.prototype.reference = function reference () {
		'refs' in this ? this.refs++ : this.refs = 1;
	};

	ModelBase.prototype.register = function register ( dep ) {
		this.deps.push( dep );
	};

	ModelBase.prototype.registerChange = function registerChange ( key, value ) {
		if ( !this.isRoot ) {
			this.root.registerChange( key, value );
		} else {
			this.changes[ key ] = value;
			runloop.addInstance( this.root.ractive );
		}
	};

	ModelBase.prototype.registerLink = function registerLink ( link ) {
		addToArray( this.links, link );
	};

	ModelBase.prototype.registerPatternObserver = function registerPatternObserver ( observer ) {
		this.patternObservers.push( observer );
		this.register( observer );
	};

	ModelBase.prototype.registerTwowayBinding = function registerTwowayBinding ( binding ) {
		this.bindings.push( binding );
	};

	ModelBase.prototype.removeUnresolved = function removeUnresolved ( key, resolver ) {
		var resolvers = this.unresolvedByKey[ key ];

		if ( resolvers ) {
			removeFromArray( resolvers, resolver );
		}
	};

	ModelBase.prototype.shuffled = function shuffled () {
		var this$1 = this;

			var i = this.children.length;
		while ( i-- ) {
			this$1.children[i].shuffled();
		}
		if ( this.wrapper ) {
			this.wrapper.teardown();
			this.wrapper = null;
			this.rewrap = true;
		}
	};

	ModelBase.prototype.unreference = function unreference () {
		if ( 'refs' in this ) this.refs--;
	};

	ModelBase.prototype.unregister = function unregister ( dep ) {
		removeFromArray( this.deps, dep );
	};

	ModelBase.prototype.unregisterLink = function unregisterLink ( link ) {
		removeFromArray( this.links, link );
	};

	ModelBase.prototype.unregisterPatternObserver = function unregisterPatternObserver ( observer ) {
		removeFromArray( this.patternObservers, observer );
		this.unregister( observer );
	};

	ModelBase.prototype.unregisterTwowayBinding = function unregisterTwowayBinding ( binding ) {
		removeFromArray( this.bindings, binding );
	};

	ModelBase.prototype.updateFromBindings = function updateFromBindings$1 ( cascade ) {
		var this$1 = this;

			var i = this.bindings.length;
		while ( i-- ) {
			var value = this$1.bindings[i].getValue();
			if ( value !== this$1.value ) this$1.set( value );
		}

		// check for one-way bindings if there are no two-ways
		if ( !this.bindings.length ) {
			var oneway = findBoundValue( this.deps );
			if ( oneway && oneway.value !== this.value ) this.set( oneway.value );
		}

		if ( cascade ) {
			this.children.forEach( updateFromBindings );
			this.links.forEach( updateFromBindings );
			if ( this._link ) this._link.updateFromBindings( cascade );
		}
	};

	function updateFromBindings ( model ) {
		model.updateFromBindings( true );
	}

	function findBoundValue( list ) {
		var i = list.length;
		while ( i-- ) {
			if ( list[i].bound ) {
				var owner = list[i].owner;
				if ( owner ) {
					var value = owner.name === 'checked' ?
						owner.node.checked :
						owner.node.value;
					return { value: value };
				}
			}
		}
	}

	function fireShuffleTasks ( stage ) {
		if ( !stage ) {
			fireShuffleTasks( 'early' );
			fireShuffleTasks( 'mark' );
		} else {
			var tasks = shuffleTasks[stage];
			shuffleTasks[stage] = [];
			var i = tasks.length;
			while ( i-- ) tasks[i]();

			var register = registerQueue[stage];
			registerQueue[stage] = [];
			i = register.length;
			while ( i-- ) register[i].model.register( register[i].item );
		}
	}

	KeyModel.prototype.addShuffleTask = ModelBase.prototype.addShuffleTask;
	KeyModel.prototype.addShuffleRegister = ModelBase.prototype.addShuffleRegister;
	KeypathModel.prototype.addShuffleTask = ModelBase.prototype.addShuffleTask;
	KeypathModel.prototype.addShuffleRegister = ModelBase.prototype.addShuffleRegister;

	// this is the dry method of checking to see if a rebind applies to
	// a particular keypath because in some cases, a dep may be bound
	// directly to a particular keypath e.g. foo.bars.0.baz and need
	// to avoid getting kicked to foo.bars.1.baz if foo.bars is unshifted
	function rebindMatch ( template, next, previous ) {
		var keypath = template.r || template;

		// no valid keypath, go with next
		if ( !keypath || typeof keypath !== 'string' ) return next;

		// completely contextual ref, go with next
		if ( keypath === '.' || keypath[0] === '@' || (next || previous).isKey || (next || previous).isKeypath ) return next;

		var parts = keypath.split( '/' );
		var keys = splitKeypathI( parts[ parts.length - 1 ] );

		// check the keypath against the model keypath to see if it matches
		var model = next || previous;
		var i = keys.length;
		var match = true, shuffling = false;

		while ( model && i-- ) {
			if ( model.shuffling ) shuffling = true;
			// non-strict comparison to account for indices in keypaths
			if ( keys[i] != model.key ) match = false;
			model = model.parent;
		}

		// next is undefined, but keypath is shuffling and previous matches
		if ( !next && match && shuffling ) return previous;
		// next is defined, but doesn't match the keypath
		else if ( next && !match && shuffling ) return previous;
		else return next;
	}

	var LinkModel = (function (ModelBase) {
		function LinkModel ( parent, owner, target, key ) {
			ModelBase.call( this, parent );

			this.owner = owner;
			this.target = target;
			this.key = key === undefined ? owner.key : key;
			if ( owner.isLink ) this.sourcePath = "" + (owner.sourcePath) + "." + (this.key);

			target.registerLink( this );

			this.isReadonly = parent.isReadonly;

			this.isLink = true;
		}

		LinkModel.prototype = Object.create( ModelBase && ModelBase.prototype );
		LinkModel.prototype.constructor = LinkModel;

		LinkModel.prototype.animate = function animate ( from, to, options, interpolator ) {
			return this.target.animate( from, to, options, interpolator );
		};

		LinkModel.prototype.applyValue = function applyValue ( value ) {
			this.target.applyValue( value );
		};

		LinkModel.prototype.get = function get ( shouldCapture, opts ) {
			if ( shouldCapture ) {
				capture( this );

				// may need to tell the target to unwrap
				opts = opts || {};
				opts.unwrap = true;
			}

			return this.target.get( false, opts );
		};

		LinkModel.prototype.getKeypath = function getKeypath ( ractive ) {
			if ( ractive && ractive !== this.root.ractive ) return this.target.getKeypath( ractive );

			return ModelBase.prototype.getKeypath.call( this, ractive );
		};

		LinkModel.prototype.getKeypathModel = function getKeypathModel ( ractive ) {
			if ( !this.keypathModel ) this.keypathModel = new KeypathModel( this );
			if ( ractive && ractive !== this.root.ractive ) return this.keypathModel.getChild( ractive );
			return this.keypathModel;
		};

		LinkModel.prototype.handleChange = function handleChange$1 () {
			this.deps.forEach( handleChange );
			this.links.forEach( handleChange );
			this.notifyUpstream();
		};

		LinkModel.prototype.joinKey = function joinKey ( key ) {
			// TODO: handle nested links
			if ( key === undefined || key === '' ) return this;

			if ( !this.childByKey.hasOwnProperty( key ) ) {
				var child = new LinkModel( this, this, this.target.joinKey( key ), key );
				this.children.push( child );
				this.childByKey[ key ] = child;
			}

			return this.childByKey[ key ];
		};

		LinkModel.prototype.mark = function mark () {
			this.target.mark();
		};

		LinkModel.prototype.marked = function marked$1 () {
			this.links.forEach( marked );

			this.deps.forEach( handleChange );
			this.clearUnresolveds();
		};

		LinkModel.prototype.markedAll = function markedAll$1 () {
			this.children.forEach( markedAll );
			this.marked();
		};

		LinkModel.prototype.notifiedUpstream = function notifiedUpstream$1 () {
			this.links.forEach( notifiedUpstream );
			this.deps.forEach( handleChange );
		};

		LinkModel.prototype.relinked = function relinked () {
			this.target.registerLink( this );
			this.children.forEach( function ( c ) { return c.relinked(); } );
		};

		LinkModel.prototype.relinking = function relinking ( target, root, safe ) {
			var this$1 = this;

			if ( root && this.sourcePath ) target = rebindMatch( this.sourcePath, target, this.target );
			if ( !target || this.target === target ) return;

			this.target.unregisterLink( this );
			if ( this.keypathModel ) this.keypathModel.rebindChildren( target );

			this.target = target;
			this.children.forEach( function ( c ) {
				c.relinking( target.joinKey( c.key ), false, safe );
			});

			if ( root ) this.addShuffleTask( function () {
				this$1.relinked();
				if ( !safe ) this$1.notifyUpstream();
			});
		};

		LinkModel.prototype.set = function set ( value ) {
			this.target.set( value );
		};

		LinkModel.prototype.shuffle = function shuffle ( newIndices ) {
			// watch for extra shuffles caused by a shuffle in a downstream link
			var this$1 = this;

			if ( this.shuffling ) return;

			// let the real model handle firing off shuffles
			if ( !this.target.shuffling ) {
				this.target.shuffle( newIndices );
			} else {
				this.shuffling = true;

				var i = newIndices.length;
				while ( i-- ) {
					var idx = newIndices[ i ];
					// nothing is actually changing, so move in the index and roll on
					if ( i === idx ) {
						continue;
					}

					// rebind the children on i to idx
					if ( i in this$1.childByKey ) this$1.childByKey[ i ].rebinding( !~idx ? undefined : this$1.joinKey( idx ), this$1.childByKey[ i ], true );

					if ( !~idx && this$1.keyModels[ i ] ) {
						this$1.keyModels[i].rebinding( undefined, this$1.keyModels[i], false );
					} else if ( ~idx && this$1.keyModels[ i ] ) {
						if ( !this$1.keyModels[ idx ] ) this$1.childByKey[ idx ].getKeyModel( idx );
						this$1.keyModels[i].rebinding( this$1.keyModels[ idx ], this$1.keyModels[i], false );
					}
				}

				var upstream = this.source().length !== this.source().value.length;

				this.links.forEach( function ( l ) { return l.shuffle( newIndices ); } );

				i = this.deps.length;
				while ( i-- ) {
					if ( this$1.deps[i].shuffle ) this$1.deps[i].shuffle( newIndices );
				}

				this.marked();

				if ( upstream ) this.notifyUpstream();

				this.shuffling = false;
			}

		};

		LinkModel.prototype.source = function source () {
			if ( this.target.source ) return this.target.source();
			else return this.target;
		};

		LinkModel.prototype.teardown = function teardown$1 () {
			if ( this._link ) this._link.teardown();
			this.target.unregisterLink( this );
			this.children.forEach( teardown );
		};

		return LinkModel;
	}(ModelBase));

	ModelBase.prototype.link = function link ( model, keypath ) {
		var lnk = this._link || new LinkModel( this.parent, this, model, this.key );
		lnk.sourcePath = keypath;
		if ( this._link ) this._link.relinking( model, true, false );
		this.rebinding( lnk, this, false );
		fireShuffleTasks();

		var unresolved = !this._link;
		this._link = lnk;
		if ( unresolved ) this.parent.clearUnresolveds();
		lnk.markedAll();
		return lnk;
	};

	ModelBase.prototype.unlink = function unlink () {
		if ( this._link ) {
			var ln = this._link;
			this._link = undefined;
			ln.rebinding( this, this._link );
			fireShuffleTasks();
			ln.teardown();
		}
	};

	var requestAnimationFrame;

	// If window doesn't exist, we don't need requestAnimationFrame
	if ( !win ) {
		requestAnimationFrame = null;
	} else {
		// https://gist.github.com/paulirish/1579671
		(function(vendors, lastTime, win) {

			var x, setTimeout;

			if ( win.requestAnimationFrame ) {
				return;
			}

			for ( x = 0; x < vendors.length && !win.requestAnimationFrame; ++x ) {
				win.requestAnimationFrame = win[vendors[x]+'RequestAnimationFrame'];
			}

			if ( !win.requestAnimationFrame ) {
				setTimeout = win.setTimeout;

				win.requestAnimationFrame = function(callback) {
					var currTime, timeToCall, id;

					currTime = Date.now();
					timeToCall = Math.max( 0, 16 - (currTime - lastTime ) );
					id = setTimeout( function() { callback(currTime + timeToCall); }, timeToCall );

					lastTime = currTime + timeToCall;
					return id;
				};
			}

		}( vendors, 0, win ));

		requestAnimationFrame = win.requestAnimationFrame;
	}

	var rAF = requestAnimationFrame;

	var getTime = ( win && win.performance && typeof win.performance.now === 'function' ) ?
		function () { return win.performance.now(); } :
		function () { return Date.now(); };

	// TODO what happens if a transition is aborted?

	var tickers = [];
	var running = false;

	function tick () {
		runloop.start();

		var now = getTime();

		var i;
		var ticker;

		for ( i = 0; i < tickers.length; i += 1 ) {
			ticker = tickers[i];

			if ( !ticker.tick( now ) ) {
				// ticker is complete, remove it from the stack, and decrement i so we don't miss one
				tickers.splice( i--, 1 );
			}
		}

		runloop.end();

		if ( tickers.length ) {
			rAF( tick );
		} else {
			running = false;
		}
	}

	var Ticker = function Ticker ( options ) {
		this.duration = options.duration;
		this.step = options.step;
		this.complete = options.complete;
		this.easing = options.easing;

		this.start = getTime();
		this.end = this.start + this.duration;

		this.running = true;

		tickers.push( this );
		if ( !running ) rAF( tick );
	};

	Ticker.prototype.tick = function tick$1 ( now ) {
		if ( !this.running ) return false;

		if ( now > this.end ) {
			if ( this.step ) this.step( 1 );
			if ( this.complete ) this.complete( 1 );

			return false;
		}

		var elapsed = now - this.start;
		var eased = this.easing( elapsed / this.duration );

		if ( this.step ) this.step( eased );

		return true;
	};

	Ticker.prototype.stop = function stop () {
		if ( this.abort ) this.abort();
		this.running = false;
	};

	var prefixers = {};

	// TODO this is legacy. sooner we can replace the old adaptor API the better
	function prefixKeypath ( obj, prefix ) {
		var prefixed = {}, key;

		if ( !prefix ) {
			return obj;
		}

		prefix += '.';

		for ( key in obj ) {
			if ( obj.hasOwnProperty( key ) ) {
				prefixed[ prefix + key ] = obj[ key ];
			}
		}

		return prefixed;
	}

	function getPrefixer ( rootKeypath ) {
		var rootDot;

		if ( !prefixers[ rootKeypath ] ) {
			rootDot = rootKeypath ? rootKeypath + '.' : '';

			prefixers[ rootKeypath ] = function ( relativeKeypath, value ) {
				var obj;

				if ( typeof relativeKeypath === 'string' ) {
					obj = {};
					obj[ rootDot + relativeKeypath ] = value;
					return obj;
				}

				if ( typeof relativeKeypath === 'object' ) {
					// 'relativeKeypath' is in fact a hash, not a keypath
					return rootDot ? prefixKeypath( relativeKeypath, rootKeypath ) : relativeKeypath;
				}
			};
		}

		return prefixers[ rootKeypath ];
	}

	var Model = (function (ModelBase) {
		function Model ( parent, key ) {
			ModelBase.call( this, parent );

			this.ticker = null;

			if ( parent ) {
				this.key = unescapeKey( key );
				this.isReadonly = parent.isReadonly;

				if ( parent.value ) {
					this.value = parent.value[ this.key ];
					if ( isArray( this.value ) ) this.length = this.value.length;
					this.adapt();
				}
			}
		}

		Model.prototype = Object.create( ModelBase && ModelBase.prototype );
		Model.prototype.constructor = Model;

		Model.prototype.adapt = function adapt () {
			var this$1 = this;

			var adaptors = this.root.adaptors;
			var len = adaptors.length;

			this.rewrap = false;

			// Exit early if no adaptors
			if ( len === 0 ) return;

			var value = this.wrapper ? ( 'newWrapperValue' in this ? this.newWrapperValue : this.wrapperValue ) : this.value;

			// TODO remove this legacy nonsense
			var ractive = this.root.ractive;
			var keypath = this.getKeypath();

			// tear previous adaptor down if present
			if ( this.wrapper ) {
				var shouldTeardown = this.wrapperValue === value ? false : !this.wrapper.reset || this.wrapper.reset( value ) === false;

				if ( shouldTeardown ) {
					this.wrapper.teardown();
					this.wrapper = null;

					// don't branch for undefined values
					if ( this.value !== undefined ) {
						var parentValue = this.parent.value || this.parent.createBranch( this.key );
						if ( parentValue[ this.key ] !== value ) parentValue[ this.key ] = value;
					}
				} else {
					delete this.newWrapperValue;
					this.wrapperValue = value;
					this.value = this.wrapper.get();
					return;
				}
			}

			var i;

			for ( i = 0; i < len; i += 1 ) {
				var adaptor = adaptors[i];
				if ( adaptor.filter( value, keypath, ractive ) ) {
					this$1.wrapper = adaptor.wrap( ractive, value, keypath, getPrefixer( keypath ) );
					this$1.wrapperValue = value;
					this$1.wrapper.__model = this$1; // massive temporary hack to enable array adaptor

					this$1.value = this$1.wrapper.get();

					break;
				}
			}
		};

		Model.prototype.animate = function animate ( from, to, options, interpolator ) {
			var this$1 = this;

			if ( this.ticker ) this.ticker.stop();

			var fulfilPromise;
			var promise = new Promise$1( function ( fulfil ) { return fulfilPromise = fulfil; } );

			this.ticker = new Ticker({
				duration: options.duration,
				easing: options.easing,
				step: function ( t ) {
					var value = interpolator( t );
					this$1.applyValue( value );
					if ( options.step ) options.step( t, value );
				},
				complete: function () {
					this$1.applyValue( to );
					if ( options.complete ) options.complete( to );

					this$1.ticker = null;
					fulfilPromise();
				}
			});

			promise.stop = this.ticker.stop;
			return promise;
		};

		Model.prototype.applyValue = function applyValue ( value ) {
			if ( isEqual( value, this.value ) ) return;

			// TODO deprecate this nonsense
			this.registerChange( this.getKeypath(), value );

			if ( this.parent.wrapper && this.parent.wrapper.set ) {
				this.parent.wrapper.set( this.key, value );
				this.parent.value = this.parent.wrapper.get();

				this.value = this.parent.value[ this.key ];
				if ( this.wrapper ) this.newWrapperValue = this.value;
				this.adapt();
			} else if ( this.wrapper ) {
				this.newWrapperValue = value;
				this.adapt();
			} else {
				var parentValue = this.parent.value || this.parent.createBranch( this.key );
				parentValue[ this.key ] = value;

				this.value = value;
				this.adapt();
			}

			this.parent.clearUnresolveds();
			this.clearUnresolveds();

			// keep track of array stuff
			if ( isArray( value ) ) {
				this.length = value.length;
				this.isArray = true;
			} else {
				this.isArray = false;
			}

			// notify dependants
			this.links.forEach( handleChange );
			this.children.forEach( mark );
			this.deps.forEach( handleChange );

			this.notifyUpstream();

			if ( this.parent.isArray ) {
				if ( this.key === 'length' ) this.parent.length = value;
				else this.parent.joinKey( 'length' ).mark();
			}
		};

		Model.prototype.createBranch = function createBranch ( key ) {
			var branch = isNumeric( key ) ? [] : {};
			this.set( branch );

			return branch;
		};

		Model.prototype.get = function get ( shouldCapture, opts ) {
			if ( this._link ) return this._link.get( shouldCapture, opts );
			if ( shouldCapture ) capture( this );
			// if capturing, this value needs to be unwrapped because it's for external use
			if ( opts && opts.virtual ) return this.getVirtual( false );
			return ( shouldCapture || ( opts && opts.unwrap ) ) && this.wrapper ? this.wrapperValue : this.value;
		};

		Model.prototype.getKeypathModel = function getKeypathModel ( ractive ) {
			if ( !this.keypathModel ) this.keypathModel = new KeypathModel( this );
			return this.keypathModel;
		};

		Model.prototype.joinKey = function joinKey ( key, opts ) {
			if ( this._link ) {
				if ( opts && !opts.lastLink === false && ( key === undefined || key === '' ) ) return this;
				return this._link.joinKey( key );
			}

			if ( key === undefined || key === '' ) return this;


			if ( !this.childByKey.hasOwnProperty( key ) ) {
				var child = new Model( this, key );
				this.children.push( child );
				this.childByKey[ key ] = child;
			}

			if ( this.childByKey[ key ]._link ) return this.childByKey[ key ]._link;
			return this.childByKey[ key ];
		};

		Model.prototype.mark = function mark$1 () {
			if ( this._link ) return this._link.mark();

			var value = this.retrieve();

			if ( !isEqual( value, this.value ) ) {
				var old = this.value;
				this.value = value;

				// make sure the wrapper stays in sync
				if ( old !== value || this.rewrap ) {
					if ( this.wrapper ) this.newWrapperValue = value;
					this.adapt();
				}

				// keep track of array stuff
				if ( isArray( value ) ) {
					this.length = value.length;
					this.isArray = true;
				} else {
					this.isArray = false;
				}

				this.children.forEach( mark );
				this.links.forEach( marked );

				this.deps.forEach( handleChange );
				this.clearUnresolveds();
			}
		};

		Model.prototype.merge = function merge ( array, comparator ) {
			var oldArray = this.value, newArray = array;
			if ( oldArray === newArray ) oldArray = recreateArray( this );
			if ( comparator ) {
				oldArray = oldArray.map( comparator );
				newArray = newArray.map( comparator );
			}

			var oldLength = oldArray.length;

			var usedIndices = {};
			var firstUnusedIndex = 0;

			var newIndices = oldArray.map( function ( item ) {
				var index;
				var start = firstUnusedIndex;

				do {
					index = newArray.indexOf( item, start );

					if ( index === -1 ) {
						return -1;
					}

					start = index + 1;
				} while ( ( usedIndices[ index ] === true ) && start < oldLength );

				// keep track of the first unused index, so we don't search
				// the whole of newArray for each item in oldArray unnecessarily
				if ( index === firstUnusedIndex ) {
					firstUnusedIndex += 1;
				}
				// allow next instance of next "equal" to be found item
				usedIndices[ index ] = true;
				return index;
			});

			this.parent.value[ this.key ] = array;
			this.shuffle( newIndices );
		};

		Model.prototype.retrieve = function retrieve () {
			return this.parent.value ? this.parent.value[ this.key ] : undefined;
		};

		Model.prototype.set = function set ( value ) {
			if ( this.ticker ) this.ticker.stop();
			this.applyValue( value );
		};

		Model.prototype.shuffle = function shuffle ( newIndices ) {
			var this$1 = this;

			this.shuffling = true;
			var i = newIndices.length;
			while ( i-- ) {
				var idx = newIndices[ i ];
				// nothing is actually changing, so move in the index and roll on
				if ( i === idx ) {
					continue;
				}

				// rebind the children on i to idx
				if ( i in this$1.childByKey ) this$1.childByKey[ i ].rebinding( !~idx ? undefined : this$1.joinKey( idx ), this$1.childByKey[ i ], true );

				if ( !~idx && this$1.keyModels[ i ] ) {
					this$1.keyModels[i].rebinding( undefined, this$1.keyModels[i], false );
				} else if ( ~idx && this$1.keyModels[ i ] ) {
					if ( !this$1.keyModels[ idx ] ) this$1.childByKey[ idx ].getKeyModel( idx );
					this$1.keyModels[i].rebinding( this$1.keyModels[ idx ], this$1.keyModels[i], false );
				}
			}

			var upstream = this.length !== this.value.length;

			this.links.forEach( function ( l ) { return l.shuffle( newIndices ); } );
			fireShuffleTasks( 'early' );

			i = this.deps.length;
			while ( i-- ) {
				if ( this$1.deps[i].shuffle ) this$1.deps[i].shuffle( newIndices );
			}

			this.mark();
			fireShuffleTasks( 'mark' );

			if ( upstream ) this.notifyUpstream();
			this.shuffling = false;
		};

		Model.prototype.teardown = function teardown$1 () {
			if ( this._link ) this._link.teardown();
			this.children.forEach( teardown );
			if ( this.wrapper ) this.wrapper.teardown();
			if ( this.keypathModel ) this.keypathModel.teardown();
		};

		return Model;
	}(ModelBase));

	function recreateArray( model ) {
		var array = [];

		for ( var i = 0; i < model.length; i++ ) {
			array[ i ] = (model.childByKey[i] || {}).value;
		}

		return array;
	}

	var GlobalModel = (function (Model) {
		function GlobalModel ( ) {
			Model.call( this, null, '@global' );
			this.value = typeof global !== 'undefined' ? global : window;
			this.isRoot = true;
			this.root = this;
			this.adaptors = [];
		}

		GlobalModel.prototype = Object.create( Model && Model.prototype );
		GlobalModel.prototype.constructor = GlobalModel;

		GlobalModel.prototype.getKeypath = function getKeypath() {
			return '@global';
		};

		// global model doesn't contribute changes events because it has no instance
		GlobalModel.prototype.registerChange = function registerChange () {};

		return GlobalModel;
	}(Model));

	var GlobalModel$1 = new GlobalModel();

	var keypathExpr = /^@[^\(]+\(([^\)]+)\)/;

	function resolveReference ( fragment, ref ) {
		var context = fragment.findContext();

		// special references
		// TODO does `this` become `.` at parse time?
		if ( ref === '.' || ref === 'this' ) return context;
		if ( ref.indexOf( '@keypath' ) === 0 ) {
			var match = keypathExpr.exec( ref );
			if ( match && match[1] ) {
				var model = resolveReference( fragment, match[1] );
				if ( model ) return model.getKeypathModel();
			}
			return context.getKeypathModel();
		}
		if ( ref.indexOf( '@rootpath' ) === 0 ) {
			// check to see if this is an empty component root
			while ( context.isRoot && context.ractive.component ) {
				context = context.ractive.component.parentFragment.findContext();
			}

			var match$1 = keypathExpr.exec( ref );
			if ( match$1 && match$1[1] ) {
				var model$1 = resolveReference( fragment, match$1[1] );
				if ( model$1 ) return model$1.getKeypathModel( fragment.ractive.root );
			}
			return context.getKeypathModel( fragment.ractive.root );
		}
		if ( ref === '@index' || ref === '@key' ) {
			var repeater = fragment.findRepeatingFragment();
			// make sure the found fragment is actually an iteration
			if ( !repeater.isIteration ) return;
			return repeater.context.getKeyModel( repeater[ ref[1] === 'i' ? 'index' : 'key' ] );
		}
		if ( ref === '@this' ) {
			return fragment.ractive.viewmodel.getRactiveModel();
		}
		if ( ref === '@global' ) {
			return GlobalModel$1;
		}

		// ancestor references
		if ( ref[0] === '~' ) return fragment.ractive.viewmodel.joinAll( splitKeypathI( ref.slice( 2 ) ) );
		if ( ref[0] === '.' ) {
			var parts = ref.split( '/' );

			while ( parts[0] === '.' || parts[0] === '..' ) {
				var part = parts.shift();

				if ( part === '..' ) {
					context = context.parent;
				}
			}

			ref = parts.join( '/' );

			// special case - `{{.foo}}` means the same as `{{./foo}}`
			if ( ref[0] === '.' ) ref = ref.slice( 1 );
			return context.joinAll( splitKeypathI( ref ) );
		}

		return resolveAmbiguousReference( fragment, ref );
	}

	function Ractive$get ( keypath, opts ) {
		if ( typeof keypath !== 'string' ) return this.viewmodel.get( true, keypath );

		var keys = splitKeypathI( keypath );
		var key = keys[0];

		var model;

		if ( !this.viewmodel.has( key ) ) {
			// if this is an inline component, we may need to create
			// an implicit mapping
			if ( this.component && !this.isolated ) {
				model = resolveReference( this.component.parentFragment, key );

				if ( model ) {
					this.viewmodel.map( key, model );
				}
			}
		}

		model = this.viewmodel.joinAll( keys );
		return model.get( true, opts );
	}

	function gatherRefs( fragment ) {
		var key = {}, index = {};

		// walk up the template gather refs as we go
		while ( fragment ) {
			if ( fragment.parent && ( fragment.parent.indexRef || fragment.parent.keyRef ) ) {
				var ref = fragment.parent.indexRef;
				if ( ref && !( ref in index ) ) index[ref] = fragment.index;
				ref = fragment.parent.keyRef;
				if ( ref && !( ref in key ) ) key[ref] = fragment.key;
			}

			if ( fragment.componentParent && !fragment.ractive.isolated ) {
				fragment = fragment.componentParent;
			} else {
				fragment = fragment.parent;
			}
		}

		return { key: key, index: index };
	}

	// This function takes an array, the name of a mutator method, and the
	// arguments to call that mutator method with, and returns an array that
	// maps the old indices to their new indices.

	// So if you had something like this...
	//
	//     array = [ 'a', 'b', 'c', 'd' ];
	//     array.push( 'e' );
	//
	// ...you'd get `[ 0, 1, 2, 3 ]` - in other words, none of the old indices
	// have changed. If you then did this...
	//
	//     array.unshift( 'z' );
	//
	// ...the indices would be `[ 1, 2, 3, 4, 5 ]` - every item has been moved
	// one higher to make room for the 'z'. If you removed an item, the new index
	// would be -1...
	//
	//     array.splice( 2, 2 );
	//
	// ...this would result in [ 0, 1, -1, -1, 2, 3 ].
	//
	// This information is used to enable fast, non-destructive shuffling of list
	// sections when you do e.g. `ractive.splice( 'items', 2, 2 );

	function getNewIndices ( length, methodName, args ) {
		var spliceArguments, newIndices = [], removeStart, removeEnd, balance, i;

		spliceArguments = getSpliceEquivalent( length, methodName, args );

		if ( !spliceArguments ) {
			return null; // TODO support reverse and sort?
		}

		balance = ( spliceArguments.length - 2 ) - spliceArguments[1];

		removeStart = Math.min( length, spliceArguments[0] );
		removeEnd = removeStart + spliceArguments[1];
		newIndices.startIndex = removeStart;

		for ( i = 0; i < removeStart; i += 1 ) {
			newIndices.push( i );
		}

		for ( ; i < removeEnd; i += 1 ) {
			newIndices.push( -1 );
		}

		for ( ; i < length; i += 1 ) {
			newIndices.push( i + balance );
		}

		// there is a net shift for the rest of the array starting with index + balance
		if ( balance !== 0 ) {
			newIndices.touchedFrom = spliceArguments[0];
		} else {
			newIndices.touchedFrom = length;
		}

		return newIndices;
	}


	// The pop, push, shift an unshift methods can all be represented
	// as an equivalent splice
	function getSpliceEquivalent ( length, methodName, args ) {
		switch ( methodName ) {
			case 'splice':
				if ( args[0] !== undefined && args[0] < 0 ) {
					args[0] = length + Math.max( args[0], -length );
				}

				if ( args[0] === undefined ) args[0] = 0;

				while ( args.length < 2 ) {
					args.push( length - args[0] );
				}

				if ( typeof args[1] !== 'number' ) {
					args[1] = length - args[0];
				}

				// ensure we only remove elements that exist
				args[1] = Math.min( args[1], length - args[0] );

				return args;

			case 'sort':
			case 'reverse':
				return null;

			case 'pop':
				if ( length ) {
					return [ length - 1, 1 ];
				}
				return [ 0, 0 ];

			case 'push':
				return [ length, 0 ].concat( args );

			case 'shift':
				return [ 0, length ? 1 : 0 ];

			case 'unshift':
				return [ 0, 0 ].concat( args );
		}
	}

	var arrayProto = Array.prototype;

	function makeArrayMethod ( methodName ) {
		function path ( keypath ) {
			var args = [], len = arguments.length - 1;
			while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

			return model( this.viewmodel.joinAll( splitKeypathI( keypath ) ), args );
		}

		function model ( mdl, args ) {
			var array = mdl.get();

			if ( !isArray( array ) ) {
				if ( array === undefined ) {
					array = [];
					var result$1 = arrayProto[ methodName ].apply( array, args );
					var promise$1 = runloop.start( this, true ).then( function () { return result$1; } );
					mdl.set( array );
					runloop.end();
					return promise$1;
				} else {
					throw new Error( ("shuffle array method " + methodName + " called on non-array at " + (mdl.getKeypath())) );
				}
			}

			var newIndices = getNewIndices( array.length, methodName, args );
			var result = arrayProto[ methodName ].apply( array, args );

			var promise = runloop.start( this, true ).then( function () { return result; } );
			promise.result = result;

			if ( newIndices ) {
				mdl.shuffle( newIndices );
			} else {
				mdl.set( result );
			}

			runloop.end();

			return promise;
		}

		return { path: path, model: model };
	}

	var comparators = {};

	function getComparator ( option ) {
		if ( !option ) return null; // use existing arrays
		if ( option === true ) return JSON.stringify;
		if ( typeof option === 'function' ) return option;

		if ( typeof option === 'string' ) {
			return comparators[ option ] || ( comparators[ option ] = function ( thing ) { return thing[ option ]; } );
		}

		throw new Error( 'If supplied, options.compare must be a string, function, or `true`' ); // TODO link to docs
	}

	function merge$1 ( ractive, model, array, options ) {
		var promise = runloop.start( ractive, true );
		var value = model.get();

		if ( !isArray( value ) || !isArray( array ) ) {
			throw new Error( 'You cannot merge an array with a non-array' );
		}

		var comparator = getComparator( options && options.compare );
		model.merge( array, comparator );

		runloop.end();
		return promise;
	}

	function thisRactive$merge ( keypath, array, options ) {
		return merge$1( this, this.viewmodel.joinAll( splitKeypathI( keypath ) ), array, options );
	}

	var updateHook = new Hook( 'update' );

	function update$2 ( ractive, model ) {
		// if the parent is wrapped, the adaptor will need to be updated before
		// updating on this keypath
		if ( model.parent && model.parent.wrapper ) {
			model.parent.adapt();
		}

		var promise = runloop.start( ractive, true );

		model.mark();
		model.registerChange( model.getKeypath(), model.get() );

		if ( !model.isRoot ) {
			// there may be unresolved refs that are now resolvable up the context tree
			var parent = model.parent, key = model.key;
			while ( parent && !parent.isRoot ) {
				if ( parent.clearUnresolveds ) parent.clearUnresolveds( key );
				key = parent.key;
				parent = parent.parent;
			}
		}

		// notify upstream of changes
		model.notifyUpstream();

		runloop.end();

		updateHook.fire( ractive, model );

		return promise;
	}

	function Ractive$update ( keypath ) {
		if ( keypath ) keypath = splitKeypathI( keypath );

		return update$2( this, keypath ? this.viewmodel.joinAll( keypath ) : this.viewmodel );
	}

	var modelPush = makeArrayMethod( 'push' ).model;
	var modelPop = makeArrayMethod( 'pop' ).model;
	var modelShift = makeArrayMethod( 'shift' ).model;
	var modelUnshift = makeArrayMethod( 'unshift' ).model;
	var modelSort = makeArrayMethod( 'sort' ).model;
	var modelSplice = makeArrayMethod( 'splice' ).model;
	var modelReverse = makeArrayMethod( 'reverse' ).model;

	// TODO: at some point perhaps this could support relative * keypaths?
	function build$1 ( el, keypath, value ) {
		var sets = [];

		// set multiple keypaths in one go
		if ( isObject( keypath ) ) {
			for ( var k in keypath ) {
				if ( keypath.hasOwnProperty( k ) ) {
					sets.push( [ findModel( el, k ).model, keypath[k] ] );
				}
			}

		}
		// set a single keypath
		else {
			sets.push( [ findModel( el, keypath ).model, value ] );
		}

		return sets;
	}

	// get relative keypaths and values
	function get ( keypath ) {
		if ( !keypath ) return this._element.parentFragment.findContext().get( true );

		var model = resolveReference( this._element.parentFragment, keypath );

		return model ? model.get( true ) : undefined;
	}

	function resolve$1 ( path, ractive ) {
		var ref = findModel( this, path ), model = ref.model, instance = ref.instance;
		return model ? model.getKeypath( ractive || instance ) : path;
	}

	function findModel ( el, path ) {
		var frag = el._element.parentFragment;

		if ( typeof path !== 'string' ) {
			return { model: frag.findContext(), instance: path };
		}

		return { model: resolveReference( frag, path ), instance: frag.ractive };
	}

	// the usual mutation suspects
	function add$1 ( keypath, value ) {
		if ( value === undefined ) value = 1;
		if ( !isNumeric( value ) ) throw new Error( 'Bad arguments' );
		return set( this.ractive, build$1( this, keypath, value ).map( function ( pair ) {
			var model = pair[0], val = pair[1], value = model.get();
			if ( !isNumeric( val ) || !isNumeric( value ) ) throw new Error( 'Cannot add non-numeric value' );
			return [ model, value + val ];
		}) );
	}

	function animate ( keypath, value, options ) {
		var model = findModel( this, keypath ).model;
		return protoAnimate( this.ractive, model, value, options );
	}

	function link ( source, dest ) {
		var there = findModel( this, source ).model, here = findModel( this, dest ).model;
		var promise = runloop.start( this.ractive, true );
		here.link( there, source );
		runloop.end();
		return promise;
	}

	function merge ( keypath, array, options ) {
		return merge$1( this.ractive, findModel( this, keypath ).model, array, options );
	}

	function pop ( keypath ) {
		return modelPop( findModel( this, keypath ).model, [] );
	}

	function push ( keypath ) {
		var values = [], len = arguments.length - 1;
		while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

		return modelPush( findModel( this, keypath ).model, values );
	}

	function reverse ( keypath ) {
		return modelReverse( findModel( this, keypath ).model, [] );
	}

	function set$1 ( keypath, value ) {
		return set( this.ractive, build$1( this, keypath, value ) );
	}

	function shift ( keypath ) {
		return modelShift( findModel( this, keypath ).model, [] );
	}

	function splice ( keypath, index, drop ) {
		var add = [], len = arguments.length - 3;
		while ( len-- > 0 ) add[ len ] = arguments[ len + 3 ];

		add.unshift( index, drop );
		return modelSplice( findModel( this, keypath ).model, add );
	}

	function sort ( keypath ) {
		return modelSort( findModel( this, keypath ).model, [] );
	}

	function subtract ( keypath, value ) {
		if ( value === undefined ) value = 1;
		if ( !isNumeric( value ) ) throw new Error( 'Bad arguments' );
		return set( this.ractive, build$1( this, keypath, value ).map( function ( pair ) {
			var model = pair[0], val = pair[1], value = model.get();
			if ( !isNumeric( val ) || !isNumeric( value ) ) throw new Error( 'Cannot add non-numeric value' );
			return [ model, value - val ];
		}) );
	}

	function toggle ( keypath ) {
		var ref = findModel( this, keypath ), model = ref.model;
		return set( this.ractive, [ [ model, !model.get() ] ] );
	}

	function unlink ( dest ) {
		var here = findModel( this, dest ).model;
		var promise = runloop.start( this.ractive, true );
		if ( here.owner && here.owner._link ) here.owner.unlink();
		runloop.end();
		return promise;
	}

	function unshift ( keypath ) {
		var add = [], len = arguments.length - 1;
		while ( len-- > 0 ) add[ len ] = arguments[ len + 1 ];

		return modelUnshift( findModel( this, keypath ).model, add );
	}

	function update$1 ( keypath ) {
		return update$2( this.ractive, findModel( this, keypath ).model );
	}

	function updateModel ( keypath, cascade ) {
		var ref = findModel( this, keypath ), model = ref.model;
		var promise = runloop.start( this.ractive, true );
		model.updateFromBindings( cascade );
		runloop.end();
		return promise;
	}

	// two-way binding related helpers
	function isBound () {
		var ref = getBindingModel( this ), model = ref.model;
		return !!model;
	}

	function getBindingPath ( ractive ) {
		var ref = getBindingModel( this ), model = ref.model, instance = ref.instance;
		if ( model ) return model.getKeypath( ractive || instance );
	}

	function getBinding () {
		var ref = getBindingModel( this ), model = ref.model;
		if ( model ) return model.get( true );
	}

	function getBindingModel ( ctx ) {
		var el = ctx._element;
		return { model: el.binding && el.binding.model, instance: el.parentFragment.ractive };
	}

	function setBinding ( value ) {
		var ref = getBindingModel( this ), model = ref.model;
		return set( this.ractive, [ [ model, value ] ] );
	}

	// deprecated getters
	function keypath () {
		warnOnceIfDebug( ("Object property keypath is deprecated, please use resolve() instead.") );
		return this.resolve();
	}

	function rootpath () {
		warnOnceIfDebug( ("Object property rootpath is deprecated, please use resolve( ractive.root ) instead.") );
		return this.resolve( this.ractive.root );
	}

	function context () {
		warnOnceIfDebug( ("Object property context is deprecated, please use get() instead.") );
		return this.get();
	}

	function index () {
		warnOnceIfDebug( ("Object property index is deprecated, you can use get( \"indexName\" ) instead.") );
		return gatherRefs( this._element.parentFragment ).index;
	}

	function key () {
		warnOnceIfDebug( ("Object property key is deprecated, you can use get( \"keyName\" ) instead.") );
		return gatherRefs( this._element.parentFragment ).key;
	}

	function addHelpers ( obj, element ) {
		defineProperties( obj, {
			_element: { value: element },
			ractive: { value: element.parentFragment.ractive },
			resolve: { value: resolve$1 },
			get: { value: get },

			add: { value: add$1 },
			animate: { value: animate },
			link: { value: link },
			merge: { value: merge },
			pop: { value: pop },
			push: { value: push },
			reverse: { value: reverse },
			set: { value: set$1 },
			shift: { value: shift },
			sort: { value: sort },
			splice: { value: splice },
			subtract: { value: subtract },
			toggle: { value: toggle },
			unlink: { value: unlink },
			unshift: { value: unshift },
			update: { value: update$1 },
			updateModel: { value: updateModel },

			isBound: { value: isBound },
			getBindingPath: { value: getBindingPath },
			getBinding: { value: getBinding },
			setBinding: { value: setBinding },

			keypath: { get: keypath },
			rootpath: { get: rootpath },
			context: { get: context },
			index: { get: index },
			key: { get: key }
		});

		return obj;
	}

	var query = doc && doc.querySelector;

	function staticInfo( node ) {
		if ( typeof node === 'string' && query ) {
			node = query.call( document, node );
		}

		if ( !node || !node._ractive ) return undefined;

		var storage = node._ractive;

		return addHelpers( {}, storage.proxy );
	}

	function getNodeInfo( node ) {
		if ( typeof node === 'string' ) {
			node = this.find( node );
		}

		return staticInfo( node );
	}

	var insertHook = new Hook( 'insert' );

	function Ractive$insert ( target, anchor ) {
		if ( !this.fragment.rendered ) {
			// TODO create, and link to, documentation explaining this
			throw new Error( 'The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.' );
		}

		target = getElement( target );
		anchor = getElement( anchor ) || null;

		if ( !target ) {
			throw new Error( 'You must specify a valid target to insert into' );
		}

		target.insertBefore( this.detach(), anchor );
		this.el = target;

		( target.__ractive_instances__ || ( target.__ractive_instances__ = [] ) ).push( this );
		this.isDetached = false;

		fireInsertHook( this );
	}

	function fireInsertHook( ractive ) {
		insertHook.fire( ractive );

		ractive.findAllComponents('*').forEach( function ( child ) {
			fireInsertHook( child.instance );
		});
	}

	function link$1( there, here ) {
		if ( here === there || (there + '.').indexOf( here + '.' ) === 0 || (here + '.').indexOf( there + '.' ) === 0 ) {
			throw new Error( 'A keypath cannot be linked to itself.' );
		}

		var promise = runloop.start();
		var model;

		// may need to allow a mapping to resolve implicitly
		var sourcePath = splitKeypathI( there );
		if ( !this.viewmodel.has( sourcePath[0] ) && this.component ) {
			model = resolveReference( this.component.parentFragment, sourcePath[0] );
			model = model.joinAll( sourcePath.slice( 1 ) );
		}

		this.viewmodel.joinAll( splitKeypathI( here ) ).link( model || this.viewmodel.joinAll( sourcePath ), there );

		runloop.end();

		return promise;
	}

	var ReferenceResolver = function ReferenceResolver ( fragment, reference, callback ) {
		var this$1 = this;

			this.fragment = fragment;
		this.reference = normalise( reference );
		this.callback = callback;

		this.keys = splitKeypathI( reference );
		this.resolved = false;

		this.contexts = [];

		// TODO the consumer should take care of addUnresolved
		// we attach to all the contexts between here and the root
		// - whenever their values change, they can quickly
		// check to see if we can resolve
		while ( fragment ) {
			if ( fragment.context ) {
				fragment.context.addUnresolved( this$1.keys[0], this$1 );
				this$1.contexts.push( fragment.context );
			}

			fragment = fragment.componentParent || fragment.parent;
		}
	};

	ReferenceResolver.prototype.attemptResolution = function attemptResolution () {
		if ( this.resolved ) return;

		var model = resolveAmbiguousReference( this.fragment, this.reference );

		if ( model ) {
			this.resolved = true;
			this.callback( model );
		}
	};

	ReferenceResolver.prototype.forceResolution = function forceResolution () {
		if ( this.resolved ) return;

		var model = this.fragment.findContext().joinAll( this.keys );
		this.callback( model );
		this.resolved = true;
	};

	ReferenceResolver.prototype.rebinding = function rebinding ( next, previous ) {
		var this$1 = this;

			if ( previous ) previous.removeUnresolved( this.keys[0], this );

		this.next = next;
		if ( next ) runloop.scheduleTask( function () {
			if ( next === this$1.next ) {
				next.addUnresolved( this$1.keys[0], this$1 );
				this$1.next = null;
			}
		});
	};

	ReferenceResolver.prototype.unbind = function unbind () {
		var this$1 = this;

			if ( this.fragment ) removeFromArray( this.fragment.unresolved, this );

		if ( this.resolved ) return;

		this.contexts.forEach( function ( c ) { return c.removeUnresolved( this$1.keys[0], this$1 ); } );
	};

	function observe ( keypath, callback, options ) {
		var this$1 = this;

		if ( this.torndown ) return { cancel: function() {} };

		var observers = [];
		var map;

		if ( isObject( keypath ) ) {
			map = keypath;
			options = callback || {};

			Object.keys( map ).forEach( function ( keypath ) {
				var callback = map[ keypath ];

				var keypaths = keypath.split( ' ' );
				if ( keypaths.length > 1 ) keypaths = keypaths.filter( function ( k ) { return k; } );

				keypaths.forEach( function ( keypath ) {
					observers.push( createObserver( this$1, keypath, callback, options ) );
				});
			});
		}

		else {
			var keypaths;

			if ( typeof keypath === 'function' ) {
				options = callback;
				callback = keypath;
				keypaths = [ '' ];
			} else {
				keypaths = keypath.split( ' ' );
			}

			if ( keypaths.length > 1 ) keypaths = keypaths.filter( function ( k ) { return k; } );

			keypaths.forEach( function ( keypath ) {
				observers.push( createObserver( this$1, keypath, callback, options || {} ) );
			});
		}

		// add observers to the Ractive instance, so they can be
		// cancelled on ractive.teardown()
		this._observers.push.apply( this._observers, observers );

		return {
			cancel: function () {
				observers.forEach( function ( observer ) {
					removeFromArray ( this$1._observers, observer );
					observer.cancel();
				} );
			}
		};
	}

	function createObserver ( ractive, keypath, callback, options ) {
		var viewmodel = ractive.viewmodel;

		var keys = splitKeypathI( keypath );
		var wildcardIndex = keys.indexOf( '*' );
		options.keypath = keypath;

		// normal keypath - no wildcards
		if ( !~wildcardIndex ) {
			var key = keys[0];
			var model;

			// if not the root model itself, check if viewmodel has key.
			if ( key !== '' && !viewmodel.has( key ) ) {
				// if this is an inline component, we may need to create an implicit mapping
				if ( ractive.component && !ractive.isolated ) {
					model = resolveReference( ractive.component.parentFragment, key );
					if ( model ) {
						viewmodel.map( key, model );
						model = viewmodel.joinAll( keys );
					}
				}
			} else {
				model = viewmodel.joinAll( keys );
			}

			return new Observer( ractive, model, callback, options );
		}

		// pattern observers - more complex case
		var baseModel = wildcardIndex === 0 ?
			viewmodel :
			viewmodel.joinAll( keys.slice( 0, wildcardIndex ) );

		return new PatternObserver( ractive, baseModel, keys.splice( wildcardIndex ), callback, options );
	}

	var Observer = function Observer ( ractive, model, callback, options ) {
		var this$1 = this;

			this.context = options.context || ractive;
		this.callback = callback;
		this.ractive = ractive;

		if ( model ) this.resolved( model );
		else {
			this.keypath = options.keypath;
			this.resolver = new ReferenceResolver( ractive.fragment, options.keypath, function ( model ) {
				this$1.resolved( model );
			});
		}

		if ( options.init !== false ) {
			this.dirty = true;
			this.dispatch();
		} else {
			this.oldValue = this.newValue;
		}

		this.defer = options.defer;
		this.once = options.once;
		this.strict = options.strict;

		this.dirty = false;
	};

	Observer.prototype.cancel = function cancel () {
		this.cancelled = true;
		if ( this.model ) {
			this.model.unregister( this );
		} else {
			this.resolver.unbind();
		}
	};

	Observer.prototype.dispatch = function dispatch () {
		if ( !this.cancelled ) {
			this.callback.call( this.context, this.newValue, this.oldValue, this.keypath );
			this.oldValue = this.model ? this.model.get() : this.newValue;
			this.dirty = false;
		}
	};

	Observer.prototype.handleChange = function handleChange () {
		var this$1 = this;

			if ( !this.dirty ) {
			var newValue = this.model.get();
			if ( isEqual( newValue, this.oldValue ) ) return;

			this.newValue = newValue;

			if ( this.strict && this.newValue === this.oldValue ) return;

			runloop.addObserver( this, this.defer );
			this.dirty = true;

			if ( this.once ) runloop.scheduleTask( function () { return this$1.cancel(); } );
		}
	};

	Observer.prototype.rebinding = function rebinding ( next, previous ) {
		var this$1 = this;

			next = rebindMatch( this.keypath, next, previous );
		// TODO: set up a resolver if next is undefined?
		if ( next === this.model ) return false;

		if ( this.model ) this.model.unregister( this );
		if ( next ) next.addShuffleTask( function () { return this$1.resolved( next ); } );
	};

	Observer.prototype.resolved = function resolved ( model ) {
		this.model = model;
		this.keypath = model.getKeypath( this.ractive );

		this.oldValue = undefined;
		this.newValue = model.get();

		model.register( this );
	};

	var PatternObserver = function PatternObserver ( ractive, baseModel, keys, callback, options ) {
		var this$1 = this;

			this.context = options.context || ractive;
		this.ractive = ractive;
		this.baseModel = baseModel;
		this.keys = keys;
		this.callback = callback;

		var pattern = keys.join( '\\.' ).replace( /\*/g, '(.+)' );
		var baseKeypath = baseModel.getKeypath( ractive );
		this.pattern = new RegExp( ("^" + (baseKeypath ? baseKeypath + '\\.' : '') + "" + pattern + "$") );

		this.oldValues = {};
		this.newValues = {};

		this.defer = options.defer;
		this.once = options.once;
		this.strict = options.strict;

		this.dirty = false;
		this.changed = [];
		this.partial = false;

		var models = baseModel.findMatches( this.keys );

		models.forEach( function ( model ) {
			this$1.newValues[ model.getKeypath( this$1.ractive ) ] = model.get();
		});

		if ( options.init !== false ) {
			this.dispatch();
		} else {
			this.oldValues = this.newValues;
		}

		baseModel.registerPatternObserver( this );
	};

	PatternObserver.prototype.cancel = function cancel () {
		this.baseModel.unregisterPatternObserver( this );
	};

	PatternObserver.prototype.dispatch = function dispatch () {
		var this$1 = this;

			var newValues = this.newValues;
		this.newValues = {};
		Object.keys( newValues ).forEach( function ( keypath ) {
			if ( this$1.newKeys && !this$1.newKeys[ keypath ] ) return;

			var newValue = newValues[ keypath ];
			var oldValue = this$1.oldValues[ keypath ];

			if ( this$1.strict && newValue === oldValue ) return;
			if ( isEqual( newValue, oldValue ) ) return;

			var args = [ newValue, oldValue, keypath ];
			if ( keypath ) {
				var wildcards = this$1.pattern.exec( keypath );
				if ( wildcards ) {
					args = args.concat( wildcards.slice( 1 ) );
				}
			}

			this$1.callback.apply( this$1.context, args );
		});

		if ( this.partial ) {
			for ( var k in newValues ) {
				this.oldValues[k] = newValues[k];
			}
		} else {
			this.oldValues = newValues;
		}

		this.newKeys = null;
		this.dirty = false;
	};

	PatternObserver.prototype.notify = function notify ( key ) {
		this.changed.push( key );
	};

	PatternObserver.prototype.shuffle = function shuffle ( newIndices ) {
		var this$1 = this;

			if ( !isArray( this.baseModel.value ) ) return;

		var base = this.baseModel.getKeypath( this.ractive );
		var max = this.baseModel.value.length;
		var suffix = this.keys.length > 1 ? '.' + this.keys.slice( 1 ).join( '.' ) : '';

		this.newKeys = {};
		for ( var i = 0; i < newIndices.length; i++ ) {
			if ( newIndices[ i ] === -1 || newIndices[ i ] === i ) continue;
			this$1.newKeys[ ("" + base + "." + i + "" + suffix) ] = true;
		}

		for ( var i$1 = newIndices.touchedFrom; i$1 < max; i$1++ ) {
			this$1.newKeys[ ("" + base + "." + i$1 + "" + suffix) ] = true;
		}
	};

	PatternObserver.prototype.handleChange = function handleChange () {
		var this$1 = this;

			if ( !this.dirty || this.changed.length ) {
			if ( !this.dirty ) this.newValues = {};

			// handle case where previously extant keypath no longer exists -
			// observer should still fire, with undefined as new value
			// TODO huh. according to the test suite that's not the case...
			// NOTE: I don't think this will work with partial updates
			// Object.keys( this.oldValues ).forEach( keypath => {
			// this.newValues[ keypath ] = undefined;
			// });

			if ( !this.changed.length ) {
				this.baseModel.findMatches( this.keys ).forEach( function ( model ) {
					var keypath = model.getKeypath( this$1.ractive );
					this$1.newValues[ keypath ] = model.get();
				});
				this.partial = false;
			} else {
				var count = 0;
				var ok = this.baseModel.isRoot ?
					this.changed.map( function ( keys ) { return keys.map( escapeKey ).join( '.' ); } ) :
					this.changed.map( function ( keys ) { return this$1.baseModel.getKeypath( this$1.ractive ) + '.' + keys.map( escapeKey ).join( '.' ); } );

				this.baseModel.findMatches( this.keys ).forEach( function ( model ) {
					var keypath = model.getKeypath( this$1.ractive );
					var check = function ( k ) {
						return ( k.indexOf( keypath ) === 0 && ( k.length === keypath.length || k[ keypath.length ] === '.' ) ) ||
								   ( keypath.indexOf( k ) === 0 && ( k.length === keypath.length || keypath[ k.length ] === '.' ) );
					};

					// is this model on a changed keypath?
					if ( ok.filter( check ).length ) {
						count++;
						this$1.newValues[ keypath ] = model.get();
					}
				});

				// no valid change triggered, so bail to avoid breakage
				if ( !count ) return;

				this.partial = true;
			}

			runloop.addObserver( this, this.defer );
			this.dirty = true;
			this.changed.length = 0;

			if ( this.once ) this.cancel();
		}
	};

	function observeList ( keypath, callback, options ) {
		if ( typeof keypath !== 'string' ) {
			throw new Error( 'ractive.observeList() must be passed a string as its first argument' );
		}

		var model = this.viewmodel.joinAll( splitKeypathI( keypath ) );
		var observer = new ListObserver( this, model, callback, options || {} );

		// add observer to the Ractive instance, so it can be
		// cancelled on ractive.teardown()
		this._observers.push( observer );

		return {
			cancel: function () {
				observer.cancel();
			}
		};
	}

	function negativeOne () {
		return -1;
	}

	var ListObserver = function ListObserver ( context, model, callback, options ) {
		this.context = context;
		this.model = model;
		this.keypath = model.getKeypath();
		this.callback = callback;

		this.pending = null;

		model.register( this );

		if ( options.init !== false ) {
			this.sliced = [];
			this.shuffle([]);
			this.handleChange();
		} else {
			this.sliced = this.slice();
		}
	};

	ListObserver.prototype.handleChange = function handleChange () {
		if ( this.pending ) {
			// post-shuffle
			this.callback( this.pending );
			this.pending = null;
		}

		else {
			// entire array changed
			this.shuffle( this.sliced.map( negativeOne ) );
			this.handleChange();
		}
	};

	ListObserver.prototype.shuffle = function shuffle ( newIndices ) {
		var this$1 = this;

			var newValue = this.slice();

		var inserted = [];
		var deleted = [];
		var start;

		var hadIndex = {};

		newIndices.forEach( function ( newIndex, oldIndex ) {
			hadIndex[ newIndex ] = true;

			if ( newIndex !== oldIndex && start === undefined ) {
				start = oldIndex;
			}

			if ( newIndex === -1 ) {
				deleted.push( this$1.sliced[ oldIndex ] );
			}
		});

		if ( start === undefined ) start = newIndices.length;

		var len = newValue.length;
		for ( var i = 0; i < len; i += 1 ) {
			if ( !hadIndex[i] ) inserted.push( newValue[i] );
		}

		this.pending = { inserted: inserted, deleted: deleted, start: start };
		this.sliced = newValue;
	};

	ListObserver.prototype.slice = function slice () {
		var value = this.model.get();
		return isArray( value ) ? value.slice() : [];
	};

	var onceOptions = { init: false, once: true };

	function observeOnce ( keypath, callback, options ) {
		if ( isObject( keypath ) || typeof keypath === 'function' ) {
			options = extendObj( callback || {}, onceOptions );
			return this.observe( keypath, options );
		}

		options = extendObj( options || {}, onceOptions );
		return this.observe( keypath, callback, options );
	}

	function trim ( str ) { return str.trim(); };

	function notEmptyString ( str ) { return str !== ''; };

	function Ractive$off ( eventName, callback ) {
		// if no arguments specified, remove all callbacks
		var this$1 = this;

		if ( !eventName ) {
			// TODO use this code instead, once the following issue has been resolved
			// in PhantomJS (tests are unpassable otherwise!)
			// https://github.com/ariya/phantomjs/issues/11856
			// defineProperty( this, '_subs', { value: create( null ), configurable: true });
			for ( eventName in this._subs ) {
				delete this._subs[ eventName ];
			}
		}

		else {
			// Handle multiple space-separated event names
			var eventNames = eventName.split( ' ' ).map( trim ).filter( notEmptyString );

			eventNames.forEach( function ( eventName ) {
				var subscribers = this$1._subs[ eventName ];

				// If we have subscribers for this event...
				if ( subscribers ) {
					// ...if a callback was specified, only remove that
					if ( callback ) {
						// flag this callback as off so that any in-flight firings don't call
						// a cancelled handler - this is _slightly_ hacky
						var i = subscribers.length;
						while ( i-- ) {
							if ( subscribers[i].callback === callback ) {
								subscribers[i].off = true;
								subscribers.splice( i, 1 );
							}
						}
					}

					// ...otherwise remove all callbacks
					else {
						this$1._subs[ eventName ] = [];
					}
				}
			});
		}

		return this;
	}

	function Ractive$on ( eventName, callback ) {
		// allow multiple listeners to be bound in one go
		var this$1 = this;

		if ( typeof eventName === 'object' ) {
			var listeners = [];
			var n;

			for ( n in eventName ) {
				if ( eventName.hasOwnProperty( n ) ) {
					listeners.push( this.on( n, eventName[ n ] ) );
				}
			}

			return {
				cancel: function () { listeners.forEach( function ( l ) { return l.cancel(); } ); }
			};
		}

		// Handle multiple space-separated event names
		var eventNames = eventName.split( ' ' ).map( trim ).filter( notEmptyString );

		eventNames.forEach( function ( eventName ) {
			( this$1._subs[ eventName ] || ( this$1._subs[ eventName ] = [] ) ).push( { callback: callback } );
		});

		return {
			cancel: function () { return eventNames.forEach( function ( n ) { return this$1.off( n, callback ); } ); }
		};
	}

	function Ractive$once ( eventName, handler ) {
		var listener = this.on( eventName, function () {
			handler.apply( this, arguments );
			listener.cancel();
		});

		// so we can still do listener.cancel() manually
		return listener;
	}

	var pop$1 = makeArrayMethod( 'pop' ).path;

	var push$1 = makeArrayMethod( 'push' ).path;

	var PREFIX = '/* Ractive.js component styles */';

	// Holds current definitions of styles.
	var styleDefinitions = [];

	// Flag to tell if we need to update the CSS
	var isDirty = false;

	// These only make sense on the browser. See additional setup below.
	var styleElement = null;
	var useCssText = null;

	function addCSS( styleDefinition ) {
		styleDefinitions.push( styleDefinition );
		isDirty = true;
	}

	function applyCSS() {

		// Apply only seems to make sense when we're in the DOM. Server-side renders
		// can call toCSS to get the updated CSS.
		if ( !doc || !isDirty ) return;

		if ( useCssText ) {
			styleElement.styleSheet.cssText = getCSS( null );
		} else {
			styleElement.innerHTML = getCSS( null );
		}

		isDirty = false;
	}

	function getCSS( cssIds ) {

		var filteredStyleDefinitions = cssIds ? styleDefinitions.filter( function ( style ) { return ~cssIds.indexOf( style.id ); } ) : styleDefinitions;

		return filteredStyleDefinitions.reduce( function ( styles, style ) { return ("" + styles + "\n\n/* {" + (style.id) + "} */\n" + (style.styles)); }, PREFIX );

	}

	// If we're on the browser, additional setup needed.
	if ( doc && ( !styleElement || !styleElement.parentNode ) ) {

		styleElement = doc.createElement( 'style' );
		styleElement.type = 'text/css';

		doc.getElementsByTagName( 'head' )[ 0 ].appendChild( styleElement );

		useCssText = !!styleElement.styleSheet;
	}

	var renderHook = new Hook( 'render' );
	var completeHook = new Hook( 'complete' );

	function render$1 ( ractive, target, anchor, occupants ) {
		// if `noIntro` is `true`, temporarily disable transitions
		var transitionsEnabled = ractive.transitionsEnabled;
		if ( ractive.noIntro ) ractive.transitionsEnabled = false;

		var promise = runloop.start( ractive, true );
		runloop.scheduleTask( function () { return renderHook.fire( ractive ); }, true );

		if ( ractive.fragment.rendered ) {
			throw new Error( 'You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first' );
		}

		anchor = getElement( anchor ) || ractive.anchor;

		ractive.el = target;
		ractive.anchor = anchor;

		// ensure encapsulated CSS is up-to-date
		if ( ractive.cssId ) applyCSS();

		if ( target ) {
			( target.__ractive_instances__ || ( target.__ractive_instances__ = [] ) ).push( ractive );

			if ( anchor ) {
				var docFrag = doc.createDocumentFragment();
				ractive.fragment.render( docFrag );
				target.insertBefore( docFrag, anchor );
			} else {
				ractive.fragment.render( target, occupants );
			}
		}

		runloop.end();
		ractive.transitionsEnabled = transitionsEnabled;

		return promise.then( function () { return completeHook.fire( ractive ); } );
	}

	function Ractive$render ( target, anchor ) {
		if ( this.torndown ) {
			warnIfDebug( 'ractive.render() was called on a Ractive instance that was already torn down' );
			return Promise.resolve();
		}

		target = getElement( target ) || this.el;

		if ( !this.append && target ) {
			// Teardown any existing instances *before* trying to set up the new one -
			// avoids certain weird bugs
			var others = target.__ractive_instances__;
			if ( others ) others.forEach( teardown );

			// make sure we are the only occupants
			if ( !this.enhance ) {
				target.innerHTML = ''; // TODO is this quicker than removeChild? Initial research inconclusive
			}
		}

		var occupants = this.enhance ? toArray( target.childNodes ) : null;
		var promise = render$1( this, target, anchor, occupants );

		if ( occupants ) {
			while ( occupants.length ) target.removeChild( occupants.pop() );
		}

		return promise;
	}

	var adaptConfigurator = {
		extend: function ( Parent, proto, options ) {
			proto.adapt = combine( proto.adapt, ensureArray( options.adapt ) );
		},

		init: function () {}
	};

	function combine ( a, b ) {
		var c = a.slice();
		var i = b.length;

		while ( i-- ) {
			if ( !~c.indexOf( b[i] ) ) {
				c.push( b[i] );
			}
		}

		return c;
	}

	var remove = /\/\*(?:[\s\S]*?)\*\//g;
	var escape = /url\(\s*(['"])(?:\\[\s\S]|(?!\1).)*\1\s*\)|url\((?:\\[\s\S]|[^)])*\)|(['"])(?:\\[\s\S]|(?!\2).)*\2/gi;
	var value = /\0(\d+)/g;

	// Removes comments and strings from the given CSS to make it easier to parse.
	// Callback receives the cleaned CSS and a function which can be used to put
	// the removed strings back in place after parsing is done.
	function cleanCss ( css, callback, additionalReplaceRules ) {
		if ( additionalReplaceRules === void 0 ) additionalReplaceRules = [];

		var values = [];
		var reconstruct = function ( css ) { return css.replace( value, function ( match, n ) { return values[ n ]; } ); };
		css = css.replace( escape, function ( match ) { return ("\u0000" + (values.push( match ) - 1)); }).replace( remove, '' );

		additionalReplaceRules.forEach( function ( pattern ) {
			css = css.replace( pattern, function ( match ) { return ("\u0000" + (values.push( match ) - 1)); } );
		});

		return callback( css, reconstruct );
	}

	var selectorsPattern = /(?:^|\}|\{)\s*([^\{\}\0]+)\s*(?=\{)/g;
	var keyframesDeclarationPattern = /@keyframes\s+[^\{\}]+\s*\{(?:[^{}]+|\{[^{}]+})*}/gi;
	var selectorUnitPattern = /((?:(?:\[[^\]]+\])|(?:[^\s\+\>~:]))+)((?:::?[^\s\+\>\~\(:]+(?:\([^\)]+\))?)*\s*[\s\+\>\~]?)\s*/g;
	var excludePattern = /^(?:@|\d+%)/;
	var dataRvcGuidPattern = /\[data-ractive-css~="\{[a-z0-9-]+\}"]/g;

	function trim$1 ( str ) {
		return str.trim();
	}

	function extractString ( unit ) {
		return unit.str;
	}

	function transformSelector ( selector, parent ) {
		var selectorUnits = [];
		var match;

		while ( match = selectorUnitPattern.exec( selector ) ) {
			selectorUnits.push({
				str: match[0],
				base: match[1],
				modifiers: match[2]
			});
		}

		// For each simple selector within the selector, we need to create a version
		// that a) combines with the id, and b) is inside the id
		var base = selectorUnits.map( extractString );

		var transformed = [];
		var i = selectorUnits.length;

		while ( i-- ) {
			var appended = base.slice();

			// Pseudo-selectors should go after the attribute selector
			var unit = selectorUnits[i];
			appended[i] = unit.base + parent + unit.modifiers || '';

			var prepended = base.slice();
			prepended[i] = parent + ' ' + prepended[i];

			transformed.push( appended.join( ' ' ), prepended.join( ' ' ) );
		}

		return transformed.join( ', ' );
	}

	function transformCss ( css, id ) {
		var dataAttr = "[data-ractive-css~=\"{" + id + "}\"]";

		var transformed;

		if ( dataRvcGuidPattern.test( css ) ) {
			transformed = css.replace( dataRvcGuidPattern, dataAttr );
		} else {
			transformed = cleanCss( css, function ( css, reconstruct ) {
				css = css.replace( selectorsPattern, function ( match, $1 ) {
					// don't transform at-rules and keyframe declarations
					if ( excludePattern.test( $1 ) ) return match;

					var selectors = $1.split( ',' ).map( trim$1 );
					var transformed = selectors
						.map( function ( selector ) { return transformSelector( selector, dataAttr ); } )
						.join( ', ' ) + ' ';

					return match.replace( $1, transformed );
				});

				return reconstruct( css );
			}, [ keyframesDeclarationPattern ]);
		}

		return transformed;
	}

	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	function uuid() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	var cssConfigurator = {
		name: 'css',

		// Called when creating a new component definition
		extend: function ( Parent, proto, options ) {
			if ( !options.css ) return;

			var id = uuid();
			var styles = options.noCssTransform ? options.css : transformCss( options.css, id );

			proto.cssId = id;

			addCSS( { id: id, styles: styles } );

		},

		// Called when creating a new component instance
		init: function ( Parent, target, options ) {
			if ( !options.css ) return;

			warnIfDebug( ("\nThe css option is currently not supported on a per-instance basis and will be discarded. Instead, we recommend instantiating from a component definition with a css option.\n\nconst Component = Ractive.extend({\n\t...\n\tcss: '/* your css */',\n\t...\n});\n\nconst componentInstance = new Component({ ... })\n\t\t") );
		}

	};

	function validate ( data ) {
		// Warn if userOptions.data is a non-POJO
		if ( data && data.constructor !== Object ) {
			if ( typeof data === 'function' ) {
				// TODO do we need to support this in the new Ractive() case?
			} else if ( typeof data !== 'object' ) {
				fatal( ("data option must be an object or a function, `" + data + "` is not valid") );
			} else {
				warnIfDebug( 'If supplied, options.data should be a plain JavaScript object - using a non-POJO as the root object may work, but is discouraged' );
			}
		}
	}

	var dataConfigurator = {
		name: 'data',

		extend: function ( Parent, proto, options ) {
			var key;
			var value;

			// check for non-primitives, which could cause mutation-related bugs
			if ( options.data && isObject( options.data ) ) {
				for ( key in options.data ) {
					value = options.data[ key ];

					if ( value && typeof value === 'object' ) {
						if ( isObject( value ) || isArray( value ) ) {
							warnIfDebug( ("Passing a `data` option with object and array properties to Ractive.extend() is discouraged, as mutating them is likely to cause bugs. Consider using a data function instead:\n\n  // this...\n  data: function () {\n    return {\n      myObject: {}\n    };\n  })\n\n  // instead of this:\n  data: {\n    myObject: {}\n  }") );
						}
					}
				}
			}

			proto.data = combine$1( proto.data, options.data );
		},

		init: function ( Parent, ractive, options ) {
			var result = combine$1( Parent.prototype.data, options.data );

			if ( typeof result === 'function' ) result = result.call( ractive );

			// bind functions to the ractive instance at the top level,
			// unless it's a non-POJO (in which case alarm bells should ring)
			if ( result && result.constructor === Object ) {
				for ( var prop in result ) {
					if ( typeof result[ prop ] === 'function' ) result[ prop ] = bind( result[ prop ], ractive );
				}
			}

			return result || {};
		},

		reset: function ( ractive ) {
			var result = this.init( ractive.constructor, ractive, ractive.viewmodel );
			ractive.viewmodel.root.set( result );
			return true;
		}
	};

	function combine$1 ( parentValue, childValue ) {
		validate( childValue );

		var parentIsFn = typeof parentValue === 'function';
		var childIsFn = typeof childValue === 'function';

		// Very important, otherwise child instance can become
		// the default data object on Ractive or a component.
		// then ractive.set() ends up setting on the prototype!
		if ( !childValue && !parentIsFn ) {
			childValue = {};
		}

		// Fast path, where we just need to copy properties from
		// parent to child
		if ( !parentIsFn && !childIsFn ) {
			return fromProperties( childValue, parentValue );
		}

		return function () {
			var child = childIsFn ? callDataFunction( childValue, this ) : childValue;
			var parent = parentIsFn ? callDataFunction( parentValue, this ) : parentValue;

			return fromProperties( child, parent );
		};
	}

	function callDataFunction ( fn, context ) {
		var data = fn.call( context );

		if ( !data ) return;

		if ( typeof data !== 'object' ) {
			fatal( 'Data function must return an object' );
		}

		if ( data.constructor !== Object ) {
			warnOnceIfDebug( 'Data function returned something other than a plain JavaScript object. This might work, but is strongly discouraged' );
		}

		return data;
	}

	function fromProperties ( primary, secondary ) {
		if ( primary && secondary ) {
			for ( var key in secondary ) {
				if ( !( key in primary ) ) {
					primary[ key ] = secondary[ key ];
				}
			}

			return primary;
		}

		return primary || secondary;
	}

	var TEMPLATE_VERSION = 4;

	var pattern = /\$\{([^\}]+)\}/g;

	function fromExpression ( body, length ) {
		if ( length === void 0 ) length = 0;

		var args = new Array( length );

		while ( length-- ) {
			args[length] = "_" + length;
		}

		// Functions created directly with new Function() look like this:
		//     function anonymous (_0 /**/) { return _0*2 }
		//
		// With this workaround, we get a little more compact:
		//     function (_0){return _0*2}
		return new Function( [], ("return function (" + (args.join(',')) + "){return(" + body + ");};") )();
	}

	function fromComputationString ( str, bindTo ) {
		var hasThis;

		var functionBody = 'return (' + str.replace( pattern, function ( match, keypath ) {
			hasThis = true;
			return ("__ractive.get(\"" + keypath + "\")");
		}) + ');';

		if ( hasThis ) functionBody = "var __ractive = this; " + functionBody;
		var fn = new Function( functionBody );
		return hasThis ? fn.bind( bindTo ) : fn;
	}

	var functions = create( null );

	function getFunction ( str, i ) {
		if ( functions[ str ] ) return functions[ str ];
		return functions[ str ] = createFunction( str, i );
	}

	function addFunctions( template ) {
		if ( !template ) return;

		var exp = template.e;

		if ( !exp ) return;

		Object.keys( exp ).forEach( function ( str ) {
			if ( functions[ str ] ) return;
			functions[ str ] = exp[ str ];
		});
	}

	var parse = null;

	var parseOptions = [
		'delimiters',
		'tripleDelimiters',
		'staticDelimiters',
		'staticTripleDelimiters',
		'csp',
		'interpolate',
		'preserveWhitespace',
		'sanitize',
		'stripComments',
		'contextLines'
	];

	var TEMPLATE_INSTRUCTIONS = "Either preparse or use a ractive runtime source that includes the parser. ";

	var COMPUTATION_INSTRUCTIONS = "Either use:\n\n\tRactive.parse.computedStrings( component.computed )\n\nat build time to pre-convert the strings to functions, or use functions instead of strings in computed properties.";


	function throwNoParse ( method, error, instructions ) {
		if ( !method ) {
			fatal( ("Missing Ractive.parse - cannot parse " + error + ". " + instructions) );
		}
	}

	function createFunction ( body, length ) {
		throwNoParse( fromExpression, 'new expression function', TEMPLATE_INSTRUCTIONS );
		return fromExpression( body, length );
	}

	function createFunctionFromString ( str, bindTo ) {
		throwNoParse( fromComputationString, 'compution string "${str}"', COMPUTATION_INSTRUCTIONS );
		return fromComputationString( str, bindTo );
	}

	var parser = {

		fromId: function ( id, options ) {
			if ( !doc ) {
				if ( options && options.noThrow ) { return; }
				throw new Error( ("Cannot retrieve template #" + id + " as Ractive is not running in a browser.") );
			}

			if ( id ) id = id.replace( /^#/, '' );

			var template;

			if ( !( template = doc.getElementById( id ) )) {
				if ( options && options.noThrow ) { return; }
				throw new Error( ("Could not find template element with id #" + id) );
			}

			if ( template.tagName.toUpperCase() !== 'SCRIPT' ) {
				if ( options && options.noThrow ) { return; }
				throw new Error( ("Template element with id #" + id + ", must be a <script> element") );
			}

			return ( 'textContent' in template ? template.textContent : template.innerHTML );

		},

		isParsed: function ( template) {
			return !( typeof template === 'string' );
		},

		getParseOptions: function ( ractive ) {
			// Could be Ractive or a Component
			if ( ractive.defaults ) { ractive = ractive.defaults; }

			return parseOptions.reduce( function ( val, key ) {
				val[ key ] = ractive[ key ];
				return val;
			}, {});
		},

		parse: function ( template, options ) {
			throwNoParse( parse, 'template', TEMPLATE_INSTRUCTIONS );
			var parsed = parse( template, options );
			addFunctions( parsed );
			return parsed;
		},

		parseFor: function( template, ractive ) {
			return this.parse( template, this.getParseOptions( ractive ) );
		}
	};

	var templateConfigurator = {
		name: 'template',

		extend: function ( Parent, proto, options ) {
			// only assign if exists
			if ( 'template' in options ) {
				var template = options.template;

				if ( typeof template === 'function' ) {
					proto.template = template;
				} else {
					proto.template = parseTemplate( template, proto );
				}
			}
		},

		init: function ( Parent, ractive, options ) {
			// TODO because of prototypal inheritance, we might just be able to use
			// ractive.template, and not bother passing through the Parent object.
			// At present that breaks the test mocks' expectations
			var template = 'template' in options ? options.template : Parent.prototype.template;
			template = template || { v: TEMPLATE_VERSION, t: [] };

			if ( typeof template === 'function' ) {
				var fn = template;
				template = getDynamicTemplate( ractive, fn );

				ractive._config.template = {
					fn: fn,
					result: template
				};
			}

			template = parseTemplate( template, ractive );

			// TODO the naming of this is confusing - ractive.template refers to [...],
			// but Component.prototype.template refers to {v:1,t:[],p:[]}...
			// it's unnecessary, because the developer never needs to access
			// ractive.template
			ractive.template = template.t;

			if ( template.p ) {
				extendPartials( ractive.partials, template.p );
			}
		},

		reset: function ( ractive ) {
			var result = resetValue( ractive );

			if ( result ) {
				var parsed = parseTemplate( result, ractive );

				ractive.template = parsed.t;
				extendPartials( ractive.partials, parsed.p, true );

				return true;
			}
		}
	};

	function resetValue ( ractive ) {
		var initial = ractive._config.template;

		// If this isn't a dynamic template, there's nothing to do
		if ( !initial || !initial.fn ) {
			return;
		}

		var result = getDynamicTemplate( ractive, initial.fn );

		// TODO deep equality check to prevent unnecessary re-rendering
		// in the case of already-parsed templates
		if ( result !== initial.result ) {
			initial.result = result;
			return result;
		}
	}

	function getDynamicTemplate ( ractive, fn ) {
		return fn.call( ractive, {
			fromId: parser.fromId,
			isParsed: parser.isParsed,
			parse: function ( template, options ) {
				if ( options === void 0 ) options = parser.getParseOptions( ractive );

				return parser.parse( template, options );
			}
		});
	}

	function parseTemplate ( template, ractive ) {
		if ( typeof template === 'string' ) {
			// parse will validate and add expression functions
			template = parseAsString( template, ractive );
		}
		else {
			// need to validate and add exp for already parsed template
			validate$1( template );
			addFunctions( template );
		}

		return template;
	}

	function parseAsString ( template, ractive ) {
		// ID of an element containing the template?
		if ( template[0] === '#' ) {
			template = parser.fromId( template );
		}

		return parser.parseFor( template, ractive );
	}

	function validate$1( template ) {

		// Check that the template even exists
		if ( template == undefined ) {
			throw new Error( ("The template cannot be " + template + ".") );
		}

		// Check the parsed template has a version at all
		else if ( typeof template.v !== 'number' ) {
			throw new Error( 'The template parser was passed a non-string template, but the template doesn\'t have a version.  Make sure you\'re passing in the template you think you are.' );
		}

		// Check we're using the correct version
		else if ( template.v !== TEMPLATE_VERSION ) {
			throw new Error( ("Mismatched template version (expected " + TEMPLATE_VERSION + ", got " + (template.v) + ") Please ensure you are using the latest version of Ractive.js in your build process as well as in your app") );
		}
	}

	function extendPartials ( existingPartials, newPartials, overwrite ) {
		if ( !newPartials ) return;

		// TODO there's an ambiguity here - we need to overwrite in the `reset()`
		// case, but not initially...

		for ( var key in newPartials ) {
			if ( overwrite || !existingPartials.hasOwnProperty( key ) ) {
				existingPartials[ key ] = newPartials[ key ];
			}
		}
	}

	var registryNames = [
		'adaptors',
		'components',
		'computed',
		'decorators',
		'easing',
		'events',
		'interpolators',
		'partials',
		'transitions'
	];

	var Registry = function Registry ( name, useDefaults ) {
		this.name = name;
		this.useDefaults = useDefaults;
	};

	Registry.prototype.extend = function extend ( Parent, proto, options ) {
		this.configure(
			this.useDefaults ? Parent.defaults : Parent,
			this.useDefaults ? proto : proto.constructor,
			options );
	};

	Registry.prototype.init = function init () {
		// noop
	};

	Registry.prototype.configure = function configure ( Parent, target, options ) {
		var name = this.name;
		var option = options[ name ];

		var registry = create( Parent[name] );

		for ( var key in option ) {
			registry[ key ] = option[ key ];
		}

		target[ name ] = registry;
	};

	Registry.prototype.reset = function reset ( ractive ) {
		var registry = ractive[ this.name ];
		var changed = false;

		Object.keys( registry ).forEach( function ( key ) {
			var item = registry[ key ];
				
			if ( item._fn ) {
				if ( item._fn.isOwner ) {
					registry[key] = item._fn;
				} else {
					delete registry[key];
				}
				changed = true;
			}
		});

		return changed;
	};

	var registries = registryNames.map( function ( name ) { return new Registry( name, name === 'computed' ); } );

	function wrap ( parent, name, method ) {
		if ( !/_super/.test( method ) ) return method;

		function wrapper () {
			var superMethod = getSuperMethod( wrapper._parent, name );
			var hasSuper = '_super' in this;
			var oldSuper = this._super;

			this._super = superMethod;

			var result = method.apply( this, arguments );

			if ( hasSuper ) {
				this._super = oldSuper;
			} else {
				delete this._super;
			}

			return result;
		}

		wrapper._parent = parent;
		wrapper._method = method;

		return wrapper;
	}

	function getSuperMethod ( parent, name ) {
		if ( name in parent ) {
			var value = parent[ name ];

			return typeof value === 'function' ?
				value :
				function () { return value; };
		}

		return noop;
	}

	function getMessage( deprecated, correct, isError ) {
		return "options." + deprecated + " has been deprecated in favour of options." + correct + "."
			+ ( isError ? (" You cannot specify both options, please use options." + correct + ".") : '' );
	}

	function deprecateOption ( options, deprecatedOption, correct ) {
		if ( deprecatedOption in options ) {
			if( !( correct in options ) ) {
				warnIfDebug( getMessage( deprecatedOption, correct ) );
				options[ correct ] = options[ deprecatedOption ];
			} else {
				throw new Error( getMessage( deprecatedOption, correct, true ) );
			}
		}
	}

	function deprecate ( options ) {
		deprecateOption( options, 'beforeInit', 'onconstruct' );
		deprecateOption( options, 'init', 'onrender' );
		deprecateOption( options, 'complete', 'oncomplete' );
		deprecateOption( options, 'eventDefinitions', 'events' );

		// Using extend with Component instead of options,
		// like Human.extend( Spider ) means adaptors as a registry
		// gets copied to options. So we have to check if actually an array
		if ( isArray( options.adaptors ) ) {
			deprecateOption( options, 'adaptors', 'adapt' );
		}
	}

	var custom = {
		adapt: adaptConfigurator,
		css: cssConfigurator,
		data: dataConfigurator,
		template: templateConfigurator
	};

	var defaultKeys = Object.keys( defaults );

	var isStandardKey = makeObj( defaultKeys.filter( function ( key ) { return !custom[ key ]; } ) );

	// blacklisted keys that we don't double extend
	var isBlacklisted = makeObj( defaultKeys.concat( registries.map( function ( r ) { return r.name; } ) ) );

	var order = [].concat(
		defaultKeys.filter( function ( key ) { return !registries[ key ] && !custom[ key ]; } ),
		registries,
		//custom.data,
		custom.template,
		custom.css
	);

	var config = {
		extend: function ( Parent, proto, options ) { return configure( 'extend', Parent, proto, options ); },

		init: function ( Parent, ractive, options ) { return configure( 'init', Parent, ractive, options ); },

		reset: function ( ractive ) {
			return order.filter( function ( c ) {
				return c.reset && c.reset( ractive );
			}).map( function ( c ) { return c.name; } );
		},

		// this defines the order. TODO this isn't used anywhere in the codebase,
		// only in the test suite - should get rid of it
		order: order
	};

	function configure ( method, Parent, target, options ) {
		deprecate( options );

		for ( var key in options ) {
			if ( isStandardKey.hasOwnProperty( key ) ) {
				var value = options[ key ];

				// warn the developer if they passed a function and ignore its value

				// NOTE: we allow some functions on "el" because we duck type element lists
				// and some libraries or ef'ed-up virtual browsers (phantomJS) return a
				// function object as the result of querySelector methods
				if ( key !== 'el' && typeof value === 'function' ) {
					warnIfDebug( ("" + key + " is a Ractive option that does not expect a function and will be ignored"),
						method === 'init' ? target : null );
				}
				else {
					target[ key ] = value;
				}
			}
		}

		// disallow combination of `append` and `enhance`
		if ( options.append && options.enhance ) {
			throw new Error( 'Cannot use append and enhance at the same time' );
		}

		registries.forEach( function ( registry ) {
			registry[ method ]( Parent, target, options );
		});

		adaptConfigurator[ method ]( Parent, target, options );
		templateConfigurator[ method ]( Parent, target, options );
		cssConfigurator[ method ]( Parent, target, options );

		extendOtherMethods( Parent.prototype, target, options );
	}

	function extendOtherMethods ( parent, target, options ) {
		for ( var key in options ) {
			if ( !isBlacklisted[ key ] && options.hasOwnProperty( key ) ) {
				var member = options[ key ];

				// if this is a method that overwrites a method, wrap it:
				if ( typeof member === 'function' ) {
					member = wrap( parent, key, member );
				}

				target[ key ] = member;
			}
		}
	}

	function makeObj ( array ) {
		var obj = {};
		array.forEach( function ( x ) { return obj[x] = true; } );
		return obj;
	}

	var shouldRerender = [ 'template', 'partials', 'components', 'decorators', 'events' ];

	var completeHook$1 = new Hook( 'complete' );
	var resetHook = new Hook( 'reset' );
	var renderHook$1 = new Hook( 'render' );
	var unrenderHook = new Hook( 'unrender' );

	function Ractive$reset ( data ) {
		data = data || {};

		if ( typeof data !== 'object' ) {
			throw new Error( 'The reset method takes either no arguments, or an object containing new data' );
		}

		// TEMP need to tidy this up
		data = dataConfigurator.init( this.constructor, this, { data: data });

		var promise = runloop.start( this, true );

		// If the root object is wrapped, try and use the wrapper's reset value
		var wrapper = this.viewmodel.wrapper;
		if ( wrapper && wrapper.reset ) {
			if ( wrapper.reset( data ) === false ) {
				// reset was rejected, we need to replace the object
				this.viewmodel.set( data );
			}
		} else {
			this.viewmodel.set( data );
		}

		// reset config items and track if need to rerender
		var changes = config.reset( this );
		var rerender;

		var i = changes.length;
		while ( i-- ) {
			if ( shouldRerender.indexOf( changes[i] ) > -1 ) {
				rerender = true;
				break;
			}
		}

		if ( rerender ) {
			unrenderHook.fire( this );
			this.fragment.resetTemplate( this.template );
			renderHook$1.fire( this );
			completeHook$1.fire( this );
		}

		runloop.end();

		resetHook.fire( this, data );

		return promise;
	}

	var TEXT              = 1;
	var INTERPOLATOR      = 2;
	var TRIPLE            = 3;
	var SECTION           = 4;
	var ELEMENT           = 7;
	var PARTIAL           = 8;
	var ATTRIBUTE         = 13;
	var COMPONENT         = 15;
	var YIELDER           = 16;
	var DOCTYPE           = 18;
	var ALIAS             = 19;

	var NUMBER_LITERAL    = 20;
	var STRING_LITERAL    = 21;
	var REFERENCE         = 30;
	var SECTION_IF        = 50;
	var SECTION_UNLESS    = 51;
	var SECTION_EACH      = 52;
	var SECTION_WITH      = 53;
	var SECTION_IF_WITH   = 54;

	var EVENT             = 70;
	var DECORATOR         = 71;
	var TRANSITION        = 72;
	var BINDING_FLAG      = 73;

	function collect( source, name, attr, dest ) {
		source.forEach( function ( item ) {
			// queue to rerender if the item is a partial and the current name matches
			if ( item.type === PARTIAL && ( item.refName ===  name || item.name === name ) ) {
				item.inAttribute = attr;
				dest.push( item );
				return; // go no further
			}

			// if it has a fragment, process its items
			if ( item.fragment ) {
				collect( item.fragment.iterations || item.fragment.items, name, attr, dest );
			}

			// or if it is itself a fragment, process its items
			else if ( isArray( item.items ) ) {
				collect( item.items, name, attr, dest );
			}

			// or if it is a component, step in and process its items
			else if ( item.type === COMPONENT && item.instance ) {
				// ...unless the partial is shadowed
				if ( item.instance.partials[ name ] ) return;
				collect( item.instance.fragment.items, name, attr, dest );
			}

			// if the item is an element, process its attributes too
			if ( item.type === ELEMENT ) {
				if ( isArray( item.attributes ) ) {
					collect( item.attributes, name, true, dest );
				}
			}
		});
	}

	function forceResetTemplate ( partial ) {
		partial.forceResetTemplate();
	}

	function resetPartial ( name, partial ) {
		var collection = [];
		collect( this.fragment.items, name, false, collection );

		var promise = runloop.start( this, true );

		this.partials[ name ] = partial;
		collection.forEach( forceResetTemplate );

		runloop.end();

		return promise;
	}

	var Item = function Item ( options ) {
		this.parentFragment = options.parentFragment;
		this.ractive = options.parentFragment.ractive;

		this.template = options.template;
		this.index = options.index;
		this.type = options.template.t;

		this.dirty = false;
	};

	Item.prototype.bubble = function bubble () {
		if ( !this.dirty ) {
			this.dirty = true;
			this.parentFragment.bubble();
		}
	};

	Item.prototype.destroyed = function destroyed () {
		if ( this.fragment ) this.fragment.destroyed();
	};

	Item.prototype.find = function find () {
		return null;
	};

	Item.prototype.findAll = function findAll () {
		// noop
	};

	Item.prototype.findComponent = function findComponent () {
		return null;
	};

	Item.prototype.findAllComponents = function findAllComponents () {
		// noop;
	};

	Item.prototype.findNextNode = function findNextNode () {
		return this.parentFragment.findNextNode( this );
	};

	Item.prototype.shuffled = function shuffled () {
		if ( this.fragment ) this.fragment.shuffled();
	};

	Item.prototype.valueOf = function valueOf () {
		return this.toString();
	};

	var ComputationChild = (function (Model) {
		function ComputationChild ( parent, key ) {
			Model.call( this, parent, key );

			this.dirty = true;
		}

		ComputationChild.prototype = Object.create( Model && Model.prototype );
		ComputationChild.prototype.constructor = ComputationChild;

		ComputationChild.prototype.get = function get ( shouldCapture ) {
			if ( shouldCapture ) capture( this );

			if ( this.dirty ) {
				var parentValue = this.parent.get();
				this.value = parentValue ? parentValue[ this.key ] : undefined;
			}

			return this.value;
		};

		ComputationChild.prototype.handleChange = function handleChange$1 () {
			this.dirty = true;

			this.links.forEach( marked );
			this.deps.forEach( handleChange );
			this.children.forEach( handleChange );
			this.clearUnresolveds(); // TODO is this necessary?
		};

		ComputationChild.prototype.joinKey = function joinKey ( key ) {
			if ( key === undefined || key === '' ) return this;

			if ( !this.childByKey.hasOwnProperty( key ) ) {
				var child = new ComputationChild( this, key );
				this.children.push( child );
				this.childByKey[ key ] = child;
			}

			return this.childByKey[ key ];
		};

		return ComputationChild;
	}(Model));

	function createResolver ( proxy, ref, index ) {
		var resolver = proxy.fragment.resolve( ref, function ( model ) {
			removeFromArray( proxy.resolvers, resolver );
			proxy.models[ index ] = model;
			proxy.bubble();
		});

		proxy.resolvers.push( resolver );
	}

	var ExpressionProxy = (function (Model) {
		function ExpressionProxy ( fragment, template ) {
			var this$1 = this;

			Model.call( this, fragment.ractive.viewmodel, null );

			this.fragment = fragment;
			this.template = template;

			this.isReadonly = true;
			this.dirty = true;

			this.fn = getFunction( template.s, template.r.length );

			this.resolvers = [];
			this.models = this.template.r.map( function ( ref, index ) {
				var model = resolveReference( this$1.fragment, ref );

				if ( !model ) {
					createResolver( this$1, ref, index );
				}

				return model;
			});
			this.dependencies = [];

			this.shuffle = undefined;

			this.bubble();
		}

		ExpressionProxy.prototype = Object.create( Model && Model.prototype );
		ExpressionProxy.prototype.constructor = ExpressionProxy;

		ExpressionProxy.prototype.bubble = function bubble ( actuallyChanged ) {
			// refresh the keypath
			if ( actuallyChanged === void 0 ) actuallyChanged = true;

			if ( this.registered ) delete this.root.expressions[ this.keypath ];
			this.keypath = undefined;

			if ( actuallyChanged ) {
				this.dirty = true;
				this.handleChange();
			}
		};

		ExpressionProxy.prototype.get = function get ( shouldCapture ) {
			if ( shouldCapture ) capture( this );

			if ( this.dirty ) {
				this.dirty = false;
				this.value = this.getValue();
				if ( this.wrapper ) this.newWrapperValue = this.value;
				this.adapt();
			}

			return shouldCapture && this.wrapper ? this.wrapperValue : this.value;
		};

		ExpressionProxy.prototype.getKeypath = function getKeypath () {
			var this$1 = this;

			if ( !this.template ) return '@undefined';
			if ( !this.keypath ) {
				this.keypath = '@' + this.template.s.replace( /_(\d+)/g, function ( match, i ) {
					if ( i >= this$1.models.length ) return match;

					var model = this$1.models[i];
					return model ? model.getKeypath() : '@undefined';
				});

				this.root.expressions[ this.keypath ] = this;
				this.registered = true;
			}

			return this.keypath;
		};

		ExpressionProxy.prototype.getValue = function getValue () {
			var this$1 = this;

			startCapturing();
			var result;

			try {
				var params = this.models.map( function ( m ) { return m ? m.get( true ) : undefined; } );
				result = this.fn.apply( this.fragment.ractive, params );
			} catch ( err ) {
				warnIfDebug( ("Failed to compute " + (this.getKeypath()) + ": " + (err.message || err)) );
			}

			var dependencies = stopCapturing();
			// remove missing deps
			this.dependencies.filter( function ( d ) { return !~dependencies.indexOf( d ); } ).forEach( function ( d ) {
				d.unregister( this$1 );
				removeFromArray( this$1.dependencies, d );
			});
			// register new deps
			dependencies.filter( function ( d ) { return !~this$1.dependencies.indexOf( d ); } ).forEach( function ( d ) {
				d.register( this$1 );
				this$1.dependencies.push( d );
			});

			return result;
		};

		ExpressionProxy.prototype.handleChange = function handleChange$1 () {
			this.dirty = true;

			this.links.forEach( marked );
			this.deps.forEach( handleChange );
			this.children.forEach( handleChange );

			this.clearUnresolveds();
		};

		ExpressionProxy.prototype.joinKey = function joinKey ( key ) {
			if ( key === undefined || key === '' ) return this;

			if ( !this.childByKey.hasOwnProperty( key ) ) {
				var child = new ComputationChild( this, key );
				this.children.push( child );
				this.childByKey[ key ] = child;
			}

			return this.childByKey[ key ];
		};

		ExpressionProxy.prototype.mark = function mark () {
			this.handleChange();
		};

		ExpressionProxy.prototype.rebinding = function rebinding ( next, previous, safe ) {
			var idx = this.models.indexOf( previous );

			if ( ~idx ) {
				next = rebindMatch( this.template.r[idx], next, previous );
				if ( next !== previous ) {
					previous.unregister( this );
					this.models.splice( idx, 1, next );
					// TODO: set up a resolver if there is no next?
					if ( next ) next.addShuffleRegister( this, 'mark' );
				}
			}
			this.bubble( !safe );
		};

		ExpressionProxy.prototype.retrieve = function retrieve () {
			return this.get();
		};

		ExpressionProxy.prototype.teardown = function teardown () {
			var this$1 = this;

			this.unbind();
			this.fragment = undefined;
			if ( this.dependencies ) this.dependencies.forEach( function ( d ) { return d.unregister( this$1 ); } );
			Model.prototype.teardown.call(this);
		};

		ExpressionProxy.prototype.unreference = function unreference () {
			Model.prototype.unreference.call(this);
			if ( !this.deps.length && !this.refs ) this.teardown();
		};

		ExpressionProxy.prototype.unregister = function unregister( dep ) {
			Model.prototype.unregister.call( this, dep );
			if ( !this.deps.length && !this.refs ) this.teardown();
		};

		ExpressionProxy.prototype.unbind = function unbind$1 () {
			this.resolvers.forEach( unbind );
		};

		return ExpressionProxy;
	}(Model));

	var ReferenceExpressionChild = (function (Model) {
		function ReferenceExpressionChild ( parent, key ) {
			Model.call ( this, parent, key );
		}

		ReferenceExpressionChild.prototype = Object.create( Model && Model.prototype );
		ReferenceExpressionChild.prototype.constructor = ReferenceExpressionChild;

		ReferenceExpressionChild.prototype.applyValue = function applyValue ( value ) {
			if ( isEqual( value, this.value ) ) return;

			var parent = this.parent, keys = [ this.key ];
			while ( parent ) {
				if ( parent.base ) {
					var target = parent.model.joinAll( keys );
					target.applyValue( value );
					break;
				}

				keys.unshift( parent.key );

				parent = parent.parent;
			}
		};

		ReferenceExpressionChild.prototype.joinKey = function joinKey ( key ) {
			if ( key === undefined || key === '' ) return this;

			if ( !this.childByKey.hasOwnProperty( key ) ) {
				var child = new ReferenceExpressionChild( this, key );
				this.children.push( child );
				this.childByKey[ key ] = child;
			}

			return this.childByKey[ key ];
		};

		ReferenceExpressionChild.prototype.retrieve = function retrieve () {
			var parent = this.parent.get();
			return parent && parent[ this.key ];
		};

		return ReferenceExpressionChild;
	}(Model));

	var ReferenceExpressionProxy = (function (Model) {
		function ReferenceExpressionProxy ( fragment, template ) {
			var this$1 = this;

			Model.call( this, null, null );
			this.dirty = true;
			this.root = fragment.ractive.viewmodel;
			this.template = template;

			this.resolvers = [];

			this.base = resolve$2( fragment, template );
			var baseResolver;

			var intermediary = this.intermediary = {
				handleChange: function () { return this$1.handleChange(); },
				rebinding: function ( next, previous ) {
					if ( previous === this$1.base ) {
						next = rebindMatch( template, next, previous );
						if ( next !== this$1.base ) {
							this$1.base.unregister( intermediary );
							this$1.base = next;
							// TODO: if there is no next, set up a resolver?
						}
					} else {
						var idx = this$1.members.indexOf( previous );
						if ( ~idx ) {
							// only direct references will rebind... expressions handle themselves
							next = rebindMatch( template.m[idx].n, next, previous );
							if ( next !== this$1.members[idx] ) {
								this$1.members.splice( idx, 1, next );
								// TODO: if there is no next, set up a resolver?
							}
						}
					}

					if ( next !== previous ) previous.unregister( intermediary );
					if ( next ) next.addShuffleTask( function () { return next.register( intermediary ); } );

					this$1.bubble();
				}
			};

			this.members = template.m.map( function ( template, i ) {
				if ( typeof template === 'string' ) {
					return { get: function () { return template; } };
				}

				var model;
				var resolver;

				if ( template.t === REFERENCE ) {
					model = resolveReference( fragment, template.n );

					if ( model ) {
						model.register( intermediary );
					} else {
						resolver = fragment.resolve( template.n, function ( model ) {
							this$1.members[i] = model;

							model.register( intermediary );
							this$1.handleChange();

							removeFromArray( this$1.resolvers, resolver );
						});

						this$1.resolvers.push( resolver );
					}

					return model;
				}

				model = new ExpressionProxy( fragment, template );
				model.register( intermediary );
				return model;
			});

			if ( !this.base ) {
				baseResolver = fragment.resolve( template.r, function ( model ) {
					this$1.base = model;
					this$1.base.register( intermediary );
					this$1.bubble();

					removeFromArray( this$1.resolvers, baseResolver );
				});

				this.resolvers.push( baseResolver );
			} else {
				this.base.register( intermediary );
			}

			this.isUnresolved = true;
			this.bubble();
		}

		ReferenceExpressionProxy.prototype = Object.create( Model && Model.prototype );
		ReferenceExpressionProxy.prototype.constructor = ReferenceExpressionProxy;

		ReferenceExpressionProxy.prototype.bubble = function bubble () {
			if ( !this.base ) return;
			if ( !this.dirty ) this.handleChange();
		};

		ReferenceExpressionProxy.prototype.forceResolution = function forceResolution () {
			this.resolvers.forEach( function ( resolver ) { return resolver.forceResolution(); } );
			this.dirty = true;
			this.bubble();
		};

		ReferenceExpressionProxy.prototype.get = function get ( shouldCapture ) {
			var this$1 = this;

			if ( this.dirty ) {
				this.bubble();

				var i = this.members.length, resolved = true;
				while ( resolved && i-- ) {
					if ( !this$1.members[i] ) resolved = false;
				}

				if ( this.base && resolved ) {
					var keys = this.members.map( function ( m ) { return escapeKey( String( m.get() ) ); } );
					var model = this.base.joinAll( keys );

					if ( model !== this.model ) {
						if ( this.model ) {
							this.model.unregister( this );
							this.model.unregisterTwowayBinding( this );
						}

						this.model = model;
						this.parent = model.parent;
						this.model.register( this );
						this.model.registerTwowayBinding( this );

						if ( this.keypathModel ) this.keypathModel.handleChange();
					}
				}

				this.value = this.model ? this.model.get( shouldCapture ) : undefined;
				this.dirty = false;
				this.mark();
				return this.value;
			} else {
				return this.model ? this.model.get( shouldCapture ) : undefined;
			}
		};

		// indirect two-way bindings
		ReferenceExpressionProxy.prototype.getValue = function getValue () {
			var this$1 = this;

			this.value = this.model ? this.model.get() : undefined;

			var i = this.bindings.length;
			while ( i-- ) {
				var value = this$1.bindings[i].getValue();
				if ( value !== this$1.value ) return value;
			}

			// check one-way bindings
			var oneway = findBoundValue( this.deps );
			if ( oneway ) return oneway.value;

			return this.value;
		};

		ReferenceExpressionProxy.prototype.getKeypath = function getKeypath () {
			return this.model ? this.model.getKeypath() : '@undefined';
		};

		ReferenceExpressionProxy.prototype.handleChange = function handleChange$1 () {
			this.dirty = true;
			this.mark();
		};

		ReferenceExpressionProxy.prototype.joinKey = function joinKey ( key ) {
			if ( key === undefined || key === '' ) return this;

			if ( !this.childByKey.hasOwnProperty( key ) ) {
				var child = new ReferenceExpressionChild( this, key );
				this.children.push( child );
				this.childByKey[ key ] = child;
			}

			return this.childByKey[ key ];
		};

		ReferenceExpressionProxy.prototype.mark = function mark$1 () {
			if ( this.dirty ) {
				this.deps.forEach( handleChange );
			}

			this.links.forEach( marked );
			this.children.forEach( mark );
			this.clearUnresolveds();
		};

		ReferenceExpressionProxy.prototype.retrieve = function retrieve () {
			return this.value;
		};

		ReferenceExpressionProxy.prototype.rebinding = function rebinding () { }; // NOOP

		ReferenceExpressionProxy.prototype.set = function set ( value ) {
			if ( !this.model ) throw new Error( 'Unresolved reference expression. This should not happen!' );
			this.model.set( value );
		};

		ReferenceExpressionProxy.prototype.teardown = function teardown () {
			var this$1 = this;

			this.resolvers.forEach( unbind );

			if ( this.model ) {
				this.model.unregister( this );
				this.model.unregisterTwowayBinding( this );
			}
			if ( this.members ) {
				this.members.forEach( function ( m ) { return m && m.unregister && m.unregister( this$1 ); } );
			}
		};

		ReferenceExpressionProxy.prototype.unreference = function unreference () {
			Model.prototype.unreference.call(this);
			if ( !this.deps.length && !this.refs ) this.teardown();
		};

		ReferenceExpressionProxy.prototype.unregister = function unregister( dep ) {
			Model.prototype.unregister.call( this, dep );
			if ( !this.deps.length && !this.refs ) this.teardown();
		};

		return ReferenceExpressionProxy;
	}(Model));

	function resolve$2 ( fragment, template ) {
		if ( template.r ) {
			return resolveReference( fragment, template.r );
		}

		else if ( template.x ) {
			return new ExpressionProxy( fragment, template.x );
		}

		else if ( template.rx ) {
			return new ReferenceExpressionProxy( fragment, template.rx );
		}
	}

	function resolveAliases( section ) {
		if ( section.template.z ) {
			section.aliases = {};

			var refs = section.template.z;
			for ( var i = 0; i < refs.length; i++ ) {
				section.aliases[ refs[i].n ] = resolve$2( section.parentFragment, refs[i].x );
			}
		}

		for ( var k in section.aliases ) {
			section.aliases[k].reference();
		}
	}

	var Alias = (function (Item) {
		function Alias ( options ) {
			Item.call( this, options );

			this.fragment = null;
		}

		Alias.prototype = Object.create( Item && Item.prototype );
		Alias.prototype.constructor = Alias;

		Alias.prototype.bind = function bind () {
			resolveAliases( this );

			this.fragment = new Fragment({
				owner: this,
				template: this.template.f
			}).bind();
		};

		Alias.prototype.detach = function detach () {
			return this.fragment ? this.fragment.detach() : createDocumentFragment();
		};

		Alias.prototype.find = function find ( selector ) {
			if ( this.fragment ) {
				return this.fragment.find( selector );
			}
		};

		Alias.prototype.findAll = function findAll ( selector, query ) {
			if ( this.fragment ) {
				this.fragment.findAll( selector, query );
			}
		};

		Alias.prototype.findComponent = function findComponent ( name ) {
			if ( this.fragment ) {
				return this.fragment.findComponent( name );
			}
		};

		Alias.prototype.findAllComponents = function findAllComponents ( name, query ) {
			if ( this.fragment ) {
				this.fragment.findAllComponents( name, query );
			}
		};

		Alias.prototype.firstNode = function firstNode ( skipParent ) {
			return this.fragment && this.fragment.firstNode( skipParent );
		};

		Alias.prototype.rebinding = function rebinding () {
			var this$1 = this;

			if ( this.locked ) return;
			this.locked = true;
			runloop.scheduleTask( function () {
				this$1.locked = false;
				resolveAliases( this$1 );
			});
		};

		Alias.prototype.render = function render ( target ) {
			this.rendered = true;
			if ( this.fragment ) this.fragment.render( target );
		};

		Alias.prototype.toString = function toString ( escape ) {
			return this.fragment ? this.fragment.toString( escape ) : '';
		};

		Alias.prototype.unbind = function unbind () {
			this.aliases = {};

			for ( var k in this.fragment.aliases ) {
				this.aliases[k].unreference();
			}

			if ( this.fragment ) this.fragment.unbind();
		};

		Alias.prototype.unrender = function unrender ( shouldDestroy ) {
			if ( this.rendered && this.fragment ) this.fragment.unrender( shouldDestroy );
			this.rendered = false;
		};

		Alias.prototype.update = function update () {
			if ( this.dirty ) {
				this.dirty = false;
				this.fragment.update();
			}
		};

		return Alias;
	}(Item));

	function findElement( start, orComponent, name ) {
		if ( orComponent === void 0 ) orComponent = true;

		while ( start && ( start.type !== ELEMENT || ( name && start.name !== name ) ) && ( !orComponent || start.type !== COMPONENT ) ) {
			// start is a fragment - look at the owner
			if ( start.owner ) start = start.owner;
			// start is a component or yielder - look at the container
			else if ( start.component ) start = start.containerFragment || start.component.parentFragment;
			// start is an item - look at the parent
			else if ( start.parent ) start = start.parent;
			// start is an item without a parent - look at the parent fragment
			else if ( start.parentFragment ) start = start.parentFragment;

			else start = undefined;
		}

		return start;
	}

	var space = /\s+/;
	var remove$1 = /\/\*(?:[\s\S]*?)\*\//g;
	var escape$1 = /url\(\s*(['"])(?:\\[\s\S]|(?!\1).)*\1\s*\)|url\((?:\\[\s\S]|[^)])*\)|(['"])(?:\\[\s\S]|(?!\1).)*\2/gi;
	var value$1 = /\0(\d+)/g;

	function readStyle ( css ) {
		var values = [];

		if ( typeof css !== 'string' ) return {};

		return css.replace( escape$1, function ( match ) { return ("\u0000" + (values.push( match ) - 1)); })
			.replace( remove$1, '' )
			.split( ';' )
			.filter( function ( rule ) { return !!rule.trim(); } )
			.map( function ( rule ) { return rule.replace( value$1, function ( match, n ) { return values[ n ]; } ); } )
			.reduce(function ( rules, rule ) {
				var i = rule.indexOf(':');
				var name = rule.substr( 0, i ).trim();
				rules[ name ] = rule.substr( i + 1 ).trim();
				return rules;
			}, {});
	}

	function readClass ( str ) {
		var list = str.split( space );

		// remove any empty entries
		var i = list.length;
		while ( i-- ) {
			if ( !list[i] ) list.splice( i, 1 );
		}

		return list;
	}

	var textTypes = [ undefined, 'text', 'search', 'url', 'email', 'hidden', 'password', 'search', 'reset', 'submit' ];

	function getUpdateDelegate ( attribute ) {
		var element = attribute.element, name = attribute.name;

		if ( name === 'id' ) return updateId;

		if ( name === 'value' ) {
			if ( attribute.interpolator ) attribute.interpolator.bound = true;

			// special case - selects
			if ( element.name === 'select' && name === 'value' ) {
				return element.getAttribute( 'multiple' ) ? updateMultipleSelectValue : updateSelectValue;
			}

			if ( element.name === 'textarea' ) return updateStringValue;

			// special case - contenteditable
			if ( element.getAttribute( 'contenteditable' ) != null ) return updateContentEditableValue;

			// special case - <input>
			if ( element.name === 'input' ) {
				var type = element.getAttribute( 'type' );

				// type='file' value='{{fileList}}'>
				if ( type === 'file' ) return noop; // read-only

				// type='radio' name='{{twoway}}'
				if ( type === 'radio' && element.binding && element.binding.attribute.name === 'name' ) return updateRadioValue;

				if ( ~textTypes.indexOf( type ) ) return updateStringValue;
			}

			return updateValue;
		}

		var node = element.node;

		// special case - <input type='radio' name='{{twoway}}' value='foo'>
		if ( attribute.isTwoway && name === 'name' ) {
			if ( node.type === 'radio' ) return updateRadioName;
			if ( node.type === 'checkbox' ) return updateCheckboxName;
		}

		if ( name === 'style' ) return updateStyleAttribute;

		if ( name.indexOf( 'style-' ) === 0 ) return updateInlineStyle;

		// special case - class names. IE fucks things up, again
		if ( name === 'class' && ( !node.namespaceURI || node.namespaceURI === html ) ) return updateClassName;

		if ( name.indexOf( 'class-' ) === 0 ) return updateInlineClass;

		if ( attribute.isBoolean ) {
			var type$1 = element.getAttribute( 'type' );
			if ( attribute.interpolator && name === 'checked' && ( type$1 === 'checkbox' || type$1 === 'radio' ) ) attribute.interpolator.bound = true;
			return updateBoolean;
		}

		if ( attribute.namespace && attribute.namespace !== attribute.node.namespaceURI ) return updateNamespacedAttribute;

		return updateAttribute;
	}

	function updateId ( reset ) {
		var ref = this, node = ref.node;
		var value = this.getValue();

		// remove the mapping to this node if it hasn't already been replaced
		if ( this.ractive.nodes[ node.id ] === node ) delete this.ractive.nodes[ node.id ];
		if ( reset ) return node.removeAttribute( 'id' );

		this.ractive.nodes[ value ] = node;

		node.id = value;
	}

	function updateMultipleSelectValue ( reset ) {
		var value = this.getValue();

		if ( !isArray( value ) ) value = [ value ];

		var options = this.node.options;
		var i = options.length;

		if ( reset ) {
			while ( i-- ) options[i].selected = false;
		} else {
			while ( i-- ) {
				var option = options[i];
				var optionValue = option._ractive ?
					option._ractive.value :
					option.value; // options inserted via a triple don't have _ractive

				option.selected = arrayContains( value, optionValue );
			}
		}
	}

	function updateSelectValue ( reset ) {
		var value = this.getValue();

		if ( !this.locked ) { // TODO is locked still a thing?
			this.node._ractive.value = value;

			var options = this.node.options;
			var i = options.length;
			var wasSelected = false;

			if ( reset ) {
				while ( i-- ) options[i].selected = false;
			} else {
				while ( i-- ) {
					var option = options[i];
					var optionValue = option._ractive ?
						option._ractive.value :
						option.value; // options inserted via a triple don't have _ractive
					if ( option.disabled && option.selected ) wasSelected = true;

					if ( optionValue == value ) { // double equals as we may be comparing numbers with strings
						option.selected = true;
						return;
					}
				}
			}

			if ( !wasSelected ) this.node.selectedIndex = -1;
		}
	}


	function updateContentEditableValue ( reset ) {
		var value = this.getValue();

		if ( !this.locked ) {
			if ( reset ) this.node.innerHTML = '';
			else this.node.innerHTML = value === undefined ? '' : value;
		}
	}

	function updateRadioValue ( reset ) {
		var node = this.node;
		var wasChecked = node.checked;

		var value = this.getValue();

		if ( reset ) return node.checked = false;

		//node.value = this.element.getAttribute( 'value' );
		node.value = this.node._ractive.value = value;
		node.checked = value === this.element.getAttribute( 'name' );

		// This is a special case - if the input was checked, and the value
		// changed so that it's no longer checked, the twoway binding is
		// most likely out of date. To fix it we have to jump through some
		// hoops... this is a little kludgy but it works
		if ( wasChecked && !node.checked && this.element.binding && this.element.binding.rendered ) {
			this.element.binding.group.model.set( this.element.binding.group.getValue() );
		}
	}

	function updateValue ( reset ) {
		if ( !this.locked ) {
			if ( reset ) {
				this.node.removeAttribute( 'value' );
				this.node.value = this.node._ractive.value = null;
				return;
			}

			var value = this.getValue();

			this.node.value = this.node._ractive.value = value;
			this.node.setAttribute( 'value', safeToStringValue( value ) );
		}
	}

	function updateStringValue ( reset ) {
		if ( !this.locked ) {
			if ( reset ) {
				this.node._ractive.value = '';
				this.node.removeAttribute( 'value' );
				return;
			}

			var value = this.getValue();

			this.node._ractive.value = value;

			this.node.value = safeToStringValue( value );
			this.node.setAttribute( 'value', safeToStringValue( value ) );
		}
	}

	function updateRadioName ( reset ) {
		if ( reset ) this.node.checked = false;
		else this.node.checked = ( this.getValue() == this.node._ractive.value );
	}

	function updateCheckboxName ( reset ) {
		var ref = this, element = ref.element, node = ref.node;
		var binding = element.binding;

		var value = this.getValue();
		var valueAttribute = element.getAttribute( 'value' );

		if ( reset ) {
			// TODO: WAT?
		}

		if ( !isArray( value ) ) {
			binding.isChecked = node.checked = ( value == valueAttribute );
		} else {
			var i = value.length;
			while ( i-- ) {
				if ( valueAttribute == value[i] ) {
					binding.isChecked = node.checked = true;
					return;
				}
			}
			binding.isChecked = node.checked = false;
		}
	}

	function updateStyleAttribute ( reset ) {
		var props = reset ? {} : readStyle( this.getValue() || '' );
		var style = this.node.style;
		var keys = Object.keys( props );
		var prev = this.previous || [];

		var i = 0;
		while ( i < keys.length ) {
			if ( keys[i] in style ) {
				var safe = props[ keys[i] ].replace( '!important', '' );
				style.setProperty( keys[i], safe, safe.length !== props[ keys[i] ].length ? 'important' : '' );
			}
			i++;
		}

		// remove now-missing attrs
		i = prev.length;
		while ( i-- ) {
			if ( !~keys.indexOf( prev[i] ) && prev[i] in style ) style.setProperty( prev[i], '', '' );
		}

		this.previous = keys;
	}

	function updateInlineStyle ( reset ) {
		if ( !this.style ) {
			this.style = decamelize( this.name.substr( 6 ) );
		}

		var value = reset ? '' : safeToStringValue( this.getValue() );
		var safe = value.replace( '!important', '' );
		this.node.style.setProperty( this.style, safe, safe.length !== value.length ? 'important' : '' );
	}

	function updateClassName ( reset ) {
		var value = reset ? [] : readClass( safeToStringValue( this.getValue() ) );

		// watch for weirdo svg elements
		var cls = this.node.className;
		cls = cls.baseVal !== undefined ? cls.baseVal : cls;

		var attr = readClass( cls );
		var prev = this.previous || attr.slice( 0 );

		var className = value.concat( attr.filter( function ( c ) { return !~prev.indexOf( c ); } ) ).join( ' ' );

		if ( className !== cls ) {
			if ( typeof this.node.className !== 'string' ) {
				this.node.className.baseVal = className;
			} else {
				this.node.className = className;
			}
		}

		this.previous = value;
	}

	function updateInlineClass ( reset ) {
		var name = this.name.substr( 6 );

		// watch for weirdo svg elements
		var cls = this.node.className;
		cls = cls.baseVal !== undefined ? cls.baseVal : cls;

		var attr = readClass( cls );
		var value = reset ? false : this.getValue();

		if ( !this.inlineClass ) this.inlineClass = name;

		if ( value && !~attr.indexOf( name ) ) attr.push( name );
		else if ( !value && ~attr.indexOf( name ) ) attr.splice( attr.indexOf( name ), 1 );

		if ( typeof this.node.className !== 'string' ) {
			this.node.className.baseVal = attr.join( ' ' );
		} else {
			this.node.className = attr.join( ' ' );
		}
	}

	function updateBoolean ( reset ) {
		// with two-way binding, only update if the change wasn't initiated by the user
		// otherwise the cursor will often be sent to the wrong place
		if ( !this.locked ) {
			if ( reset ) {
				if ( this.useProperty ) this.node[ this.propertyName ] = false;
				this.node.removeAttribute( this.propertyName );
				return;
			}

			if ( this.useProperty ) {
				this.node[ this.propertyName ] = this.getValue();
			} else {
				if ( this.getValue() ) {
					this.node.setAttribute( this.propertyName, '' );
				} else {
					this.node.removeAttribute( this.propertyName );
				}
			}
		}
	}

	function updateAttribute ( reset ) {
		if ( reset ) this.node.removeAttribute( this.name );
		else this.node.setAttribute( this.name, safeToStringValue( this.getString() ) );
	}

	function updateNamespacedAttribute ( reset ) {
		if ( reset ) this.node.removeAttributeNS( this.namespace, this.name.slice( this.name.indexOf( ':' ) + 1 ) );
		else this.node.setAttributeNS( this.namespace, this.name.slice( this.name.indexOf( ':' ) + 1 ), safeToStringValue( this.getString() ) );
	}

	var propertyNames = {
		'accept-charset': 'acceptCharset',
		accesskey: 'accessKey',
		bgcolor: 'bgColor',
		'class': 'className',
		codebase: 'codeBase',
		colspan: 'colSpan',
		contenteditable: 'contentEditable',
		datetime: 'dateTime',
		dirname: 'dirName',
		'for': 'htmlFor',
		'http-equiv': 'httpEquiv',
		ismap: 'isMap',
		maxlength: 'maxLength',
		novalidate: 'noValidate',
		pubdate: 'pubDate',
		readonly: 'readOnly',
		rowspan: 'rowSpan',
		tabindex: 'tabIndex',
		usemap: 'useMap'
	};

	// https://github.com/kangax/html-minifier/issues/63#issuecomment-37763316
	var booleanAttributes = /^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i;
	var voidElementNames = /^(?:area|base|br|col|command|doctype|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;

	var htmlEntities = { quot: 34, amp: 38, apos: 39, lt: 60, gt: 62, nbsp: 160, iexcl: 161, cent: 162, pound: 163, curren: 164, yen: 165, brvbar: 166, sect: 167, uml: 168, copy: 169, ordf: 170, laquo: 171, not: 172, shy: 173, reg: 174, macr: 175, deg: 176, plusmn: 177, sup2: 178, sup3: 179, acute: 180, micro: 181, para: 182, middot: 183, cedil: 184, sup1: 185, ordm: 186, raquo: 187, frac14: 188, frac12: 189, frac34: 190, iquest: 191, Agrave: 192, Aacute: 193, Acirc: 194, Atilde: 195, Auml: 196, Aring: 197, AElig: 198, Ccedil: 199, Egrave: 200, Eacute: 201, Ecirc: 202, Euml: 203, Igrave: 204, Iacute: 205, Icirc: 206, Iuml: 207, ETH: 208, Ntilde: 209, Ograve: 210, Oacute: 211, Ocirc: 212, Otilde: 213, Ouml: 214, times: 215, Oslash: 216, Ugrave: 217, Uacute: 218, Ucirc: 219, Uuml: 220, Yacute: 221, THORN: 222, szlig: 223, agrave: 224, aacute: 225, acirc: 226, atilde: 227, auml: 228, aring: 229, aelig: 230, ccedil: 231, egrave: 232, eacute: 233, ecirc: 234, euml: 235, igrave: 236, iacute: 237, icirc: 238, iuml: 239, eth: 240, ntilde: 241, ograve: 242, oacute: 243, ocirc: 244, otilde: 245, ouml: 246, divide: 247, oslash: 248, ugrave: 249, uacute: 250, ucirc: 251, uuml: 252, yacute: 253, thorn: 254, yuml: 255, OElig: 338, oelig: 339, Scaron: 352, scaron: 353, Yuml: 376, fnof: 402, circ: 710, tilde: 732, Alpha: 913, Beta: 914, Gamma: 915, Delta: 916, Epsilon: 917, Zeta: 918, Eta: 919, Theta: 920, Iota: 921, Kappa: 922, Lambda: 923, Mu: 924, Nu: 925, Xi: 926, Omicron: 927, Pi: 928, Rho: 929, Sigma: 931, Tau: 932, Upsilon: 933, Phi: 934, Chi: 935, Psi: 936, Omega: 937, alpha: 945, beta: 946, gamma: 947, delta: 948, epsilon: 949, zeta: 950, eta: 951, theta: 952, iota: 953, kappa: 954, lambda: 955, mu: 956, nu: 957, xi: 958, omicron: 959, pi: 960, rho: 961, sigmaf: 962, sigma: 963, tau: 964, upsilon: 965, phi: 966, chi: 967, psi: 968, omega: 969, thetasym: 977, upsih: 978, piv: 982, ensp: 8194, emsp: 8195, thinsp: 8201, zwnj: 8204, zwj: 8205, lrm: 8206, rlm: 8207, ndash: 8211, mdash: 8212, lsquo: 8216, rsquo: 8217, sbquo: 8218, ldquo: 8220, rdquo: 8221, bdquo: 8222, dagger: 8224, Dagger: 8225, bull: 8226, hellip: 8230, permil: 8240, prime: 8242, Prime: 8243, lsaquo: 8249, rsaquo: 8250, oline: 8254, frasl: 8260, euro: 8364, image: 8465, weierp: 8472, real: 8476, trade: 8482, alefsym: 8501, larr: 8592, uarr: 8593, rarr: 8594, darr: 8595, harr: 8596, crarr: 8629, lArr: 8656, uArr: 8657, rArr: 8658, dArr: 8659, hArr: 8660, forall: 8704, part: 8706, exist: 8707, empty: 8709, nabla: 8711, isin: 8712, notin: 8713, ni: 8715, prod: 8719, sum: 8721, minus: 8722, lowast: 8727, radic: 8730, prop: 8733, infin: 8734, ang: 8736, and: 8743, or: 8744, cap: 8745, cup: 8746, 'int': 8747, there4: 8756, sim: 8764, cong: 8773, asymp: 8776, ne: 8800, equiv: 8801, le: 8804, ge: 8805, sub: 8834, sup: 8835, nsub: 8836, sube: 8838, supe: 8839, oplus: 8853, otimes: 8855, perp: 8869, sdot: 8901, lceil: 8968, rceil: 8969, lfloor: 8970, rfloor: 8971, lang: 9001, rang: 9002, loz: 9674, spades: 9824, clubs: 9827, hearts: 9829, diams: 9830	};
	var controlCharacters = [ 8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 157, 382, 376 ];
	var entityPattern = new RegExp( '&(#?(?:x[\\w\\d]+|\\d+|' + Object.keys( htmlEntities ).join( '|' ) + '));?', 'g' );
	var codePointSupport = typeof String.fromCodePoint === 'function';
	var codeToChar = codePointSupport ? String.fromCodePoint : String.fromCharCode;

	function decodeCharacterReferences ( html ) {
		return html.replace( entityPattern, function ( match, entity ) {
			var code;

			// Handle named entities
			if ( entity[0] !== '#' ) {
				code = htmlEntities[ entity ];
			} else if ( entity[1] === 'x' ) {
				code = parseInt( entity.substring( 2 ), 16 );
			} else {
				code = parseInt( entity.substring( 1 ), 10 );
			}

			if ( !code ) {
				return match;
			}

			return codeToChar( validateCode( code ) );
		});
	}

	var lessThan = /</g;
	var greaterThan = />/g;
	var amp = /&/g;
	var invalid = 65533;

	function escapeHtml ( str ) {
		return str
			.replace( amp, '&amp;' )
			.replace( lessThan, '&lt;' )
			.replace( greaterThan, '&gt;' );
	}

	// some code points are verboten. If we were inserting HTML, the browser would replace the illegal
	// code points with alternatives in some cases - since we're bypassing that mechanism, we need
	// to replace them ourselves
	//
	// Source: http://en.wikipedia.org/wiki/Character_encodings_in_HTML#Illegal_characters
	function validateCode ( code ) {
		if ( !code ) {
			return invalid;
		}

		// line feed becomes generic whitespace
		if ( code === 10 ) {
			return 32;
		}

		// ASCII range. (Why someone would use HTML entities for ASCII characters I don't know, but...)
		if ( code < 128 ) {
			return code;
		}

		// code points 128-159 are dealt with leniently by browsers, but they're incorrect. We need
		// to correct the mistake or we'll end up with missing € signs and so on
		if ( code <= 159 ) {
			return controlCharacters[ code - 128 ];
		}

		// basic multilingual plane
		if ( code < 55296 ) {
			return code;
		}

		// UTF-16 surrogate halves
		if ( code <= 57343 ) {
			return invalid;
		}

		// rest of the basic multilingual plane
		if ( code <= 65535 ) {
			return code;
		} else if ( !codePointSupport ) {
			return invalid;
		}

		// supplementary multilingual plane 0x10000 - 0x1ffff
		if ( code >= 65536 && code <= 131071 ) {
			return code;
		}

		// supplementary ideographic plane 0x20000 - 0x2ffff
		if ( code >= 131072 && code <= 196607 ) {
			return code;
		}

		return invalid;
	}

	function lookupNamespace ( node, prefix ) {
		var qualified = "xmlns:" + prefix;

		while ( node ) {
			if ( node.hasAttribute && node.hasAttribute( qualified ) ) return node.getAttribute( qualified );
			node = node.parentNode;
		}

		return namespaces[ prefix ];
	}

	var attribute = false;
	function inAttribute () { return attribute; }

	var Attribute = (function (Item) {
		function Attribute ( options ) {
			Item.call( this, options );

			this.name = options.template.n;
			this.namespace = null;

			this.owner = options.owner || options.parentFragment.owner || options.element || findElement( options.parentFragment );
			this.element = options.element || (this.owner.attributeByName ? this.owner : findElement( options.parentFragment ) );
			this.parentFragment = options.parentFragment; // shared
			this.ractive = this.parentFragment.ractive;

			this.rendered = false;
			this.updateDelegate = null;
			this.fragment = null;

			this.element.attributeByName[ this.name ] = this;

			if ( !isArray( options.template.f ) ) {
				this.value = options.template.f;
				if ( this.value === 0 ) {
					this.value = '';
				}
			} else {
				this.fragment = new Fragment({
					owner: this,
					template: options.template.f
				});
			}

			this.interpolator = this.fragment &&
				this.fragment.items.length === 1 &&
				this.fragment.items[0].type === INTERPOLATOR &&
				this.fragment.items[0];

			if ( this.interpolator ) this.interpolator.owner = this;
		}

		Attribute.prototype = Object.create( Item && Item.prototype );
		Attribute.prototype.constructor = Attribute;

		Attribute.prototype.bind = function bind () {
			if ( this.fragment ) {
				this.fragment.bind();
			}
		};

		Attribute.prototype.bubble = function bubble () {
			if ( !this.dirty ) {
				this.parentFragment.bubble();
				this.element.bubble();
				this.dirty = true;
			}
		};

		Attribute.prototype.destroyed = function destroyed () {
			this.updateDelegate( true );
		};

		Attribute.prototype.getString = function getString () {
			attribute = true;
			var value = this.fragment ?
				this.fragment.toString() :
				this.value != null ? '' + this.value : '';
			attribute = false;
			return value;
		};

		// TODO could getValue ever be called for a static attribute,
		// or can we assume that this.fragment exists?
		Attribute.prototype.getValue = function getValue () {
			attribute = true;
			var value = this.fragment ? this.fragment.valueOf() : booleanAttributes.test( this.name ) ? true : this.value;
			attribute = false;
			return value;
		};

		Attribute.prototype.render = function render () {
			var node = this.element.node;
			this.node = node;

			// should we use direct property access, or setAttribute?
			if ( !node.namespaceURI || node.namespaceURI === namespaces.html ) {
				this.propertyName = propertyNames[ this.name ] || this.name;

				if ( node[ this.propertyName ] !== undefined ) {
					this.useProperty = true;
				}

				// is attribute a boolean attribute or 'value'? If so we're better off doing e.g.
				// node.selected = true rather than node.setAttribute( 'selected', '' )
				if ( booleanAttributes.test( this.name ) || this.isTwoway ) {
					this.isBoolean = true;
				}

				if ( this.propertyName === 'value' ) {
					node._ractive.value = this.value;
				}
			}

			if ( node.namespaceURI ) {
				var index = this.name.indexOf( ':' );
				if ( index !== -1 ) {
					this.namespace = lookupNamespace( node, this.name.slice( 0, index ) );
				} else {
					this.namespace = node.namespaceURI;
				}
			}

			this.rendered = true;
			this.updateDelegate = getUpdateDelegate( this );
			this.updateDelegate();
		};

		Attribute.prototype.toString = function toString () {
			attribute = true;

			var value = this.getValue();

			// Special case - select and textarea values (should not be stringified)
			if ( this.name === 'value' && ( this.element.getAttribute( 'contenteditable' ) !== undefined || ( this.element.name === 'select' || this.element.name === 'textarea' ) ) ) {
				return;
			}

			// Special case – bound radio `name` attributes
			if ( this.name === 'name' && this.element.name === 'input' && this.interpolator && this.element.getAttribute( 'type' ) === 'radio' ) {
				return ("name=\"{{" + (this.interpolator.model.getKeypath()) + "}}\"");
			}

			// Special case - style and class attributes and directives
			if ( this.owner === this.element && ( this.name === 'style' || this.name === 'class' || this.style || this.inlineClass ) ) {
				return;
			}

			if ( !this.rendered && this.owner === this.element && ( !this.name.indexOf( 'style-' ) || !this.name.indexOf( 'class-' ) ) ) {
				if ( !this.name.indexOf( 'style-' ) ) {
					this.style = decamelize( this.name.substr( 6 ) );
				} else {
					this.inlineClass = this.name.substr( 6 );
				}

				return;
			}

			if ( booleanAttributes.test( this.name ) ) return value ? this.name : '';
			if ( value == null ) return '';

			var str = safeAttributeString( this.getString() );
			attribute = false;

			return str ?
				("" + (this.name) + "=\"" + str + "\"") :
				this.name;
		};

		Attribute.prototype.unbind = function unbind () {
			if ( this.fragment ) this.fragment.unbind();
		};

		Attribute.prototype.unrender = function unrender () {
			this.updateDelegate( true );

			this.rendered = false;
		};

		Attribute.prototype.update = function update () {
			if ( this.dirty ) {
				this.dirty = false;
				if ( this.fragment ) this.fragment.update();
				if ( this.rendered ) this.updateDelegate();
				if ( this.isTwoway && !this.locked ) {
					this.interpolator.twowayBinding.lastVal( true, this.interpolator.model.get() );
				}
			}
		};

		return Attribute;
	}(Item));

	var BindingFlag = (function (Item) {
		function BindingFlag ( options ) {
			Item.call( this, options );

			this.owner = options.owner || options.parentFragment.owner || findElement( options.parentFragment );
			this.element = this.owner.attributeByName ? this.owner : findElement( options.parentFragment );
			this.flag = options.template.v === 'l' ? 'lazy' : 'twoway';

			if ( this.element.type === ELEMENT ) {
				if ( isArray( options.template.f ) ) {
					this.fragment = new Fragment({
						owner: this,
						template: options.template.f
					});
				}

				this.interpolator = this.fragment &&
									this.fragment.items.length === 1 &&
									this.fragment.items[0].type === INTERPOLATOR &&
									this.fragment.items[0];
			}
		}

		BindingFlag.prototype = Object.create( Item && Item.prototype );
		BindingFlag.prototype.constructor = BindingFlag;

		BindingFlag.prototype.bind = function bind () {
			if ( this.fragment ) this.fragment.bind();
			set$2( this, this.getValue(), true );
		};

		BindingFlag.prototype.bubble = function bubble () {
			if ( !this.dirty ) {
				this.element.bubble();
				this.dirty = true;
			}
		};

		BindingFlag.prototype.getValue = function getValue () {
			if ( this.fragment ) return this.fragment.valueOf();
			else if ( 'value' in this ) return this.value;
			else if ( 'f' in this.template ) return this.template.f;
			else return true;
		};

		BindingFlag.prototype.render = function render () {
			set$2( this, this.getValue(), true );
		};

		BindingFlag.prototype.toString = function toString () { return ''; };

		BindingFlag.prototype.unbind = function unbind () {
			if ( this.fragment ) this.fragment.unbind();

			delete this.element[ this.flag ];
		};

		BindingFlag.prototype.unrender = function unrender () {
			if ( this.element.rendered ) this.element.recreateTwowayBinding();
		};

		BindingFlag.prototype.update = function update () {
			if ( this.dirty ) {
				if ( this.fragment ) this.fragment.update();
				set$2( this, this.getValue(), true );
			}
		};

		return BindingFlag;
	}(Item));

	function set$2 ( flag, value, update ) {
		if ( value === 0 ) {
			flag.value = true;
		} else if ( value === 'true' ) {
			flag.value = true;
		} else if ( value === 'false' || value === '0' ) {
			flag.value = false;
		} else {
			flag.value = value;
		}

		var current = flag.element[ flag.flag ];
		flag.element[ flag.flag ] = flag.value;
		if ( update && !flag.element.attributes.binding && current !== flag.value ) {
			flag.element.recreateTwowayBinding();
		}

		return flag.value;
	}

	var div$1 = doc ? createElement( 'div' ) : null;

	var attributes = false;
	function inAttributes() { return attributes; }
	function doInAttributes( fn ) {
		attributes = true;
		fn();
		attributes = false;
	}

	var ConditionalAttribute = (function (Item) {
		function ConditionalAttribute ( options ) {
			Item.call( this, options );

			this.attributes = [];

			this.owner = options.owner;

			this.fragment = new Fragment({
				ractive: this.ractive,
				owner: this,
				template: this.template
			});
			// this fragment can't participate in node-y things
			this.fragment.findNextNode = noop;

			this.dirty = false;
		}

		ConditionalAttribute.prototype = Object.create( Item && Item.prototype );
		ConditionalAttribute.prototype.constructor = ConditionalAttribute;

		ConditionalAttribute.prototype.bind = function bind () {
			this.fragment.bind();
		};

		ConditionalAttribute.prototype.bubble = function bubble () {
			if ( !this.dirty ) {
				this.dirty = true;
				this.owner.bubble();
			}
		};

		ConditionalAttribute.prototype.render = function render () {
			this.node = this.owner.node;
			if ( this.node ) {
				this.isSvg = this.node.namespaceURI === svg$1;
			}

			attributes = true;
			if ( !this.rendered ) this.fragment.render();
			attributes = false;

			this.rendered = true;
			this.dirty = true; // TODO this seems hacky, but necessary for tests to pass in browser AND node.js
			this.update();
		};

		ConditionalAttribute.prototype.toString = function toString () {
			return this.fragment.toString();
		};

		ConditionalAttribute.prototype.unbind = function unbind () {
			this.fragment.unbind();
		};

		ConditionalAttribute.prototype.unrender = function unrender () {
			this.rendered = false;
			this.fragment.unrender();
		};

		ConditionalAttribute.prototype.update = function update () {
			var this$1 = this;

			var str;
			var attrs;

			if ( this.dirty ) {
				this.dirty = false;

				attributes = true;
				this.fragment.update();
				attributes = false;

				if ( this.rendered && this.node ) {
					str = this.fragment.toString();
					attrs = parseAttributes( str, this.isSvg );

					// any attributes that previously existed but no longer do
					// must be removed
					this.attributes.filter( function ( a ) { return notIn( attrs, a ); } ).forEach( function ( a ) {
						this$1.node.removeAttribute( a.name );
					});

					attrs.forEach( function ( a ) {
						this$1.node.setAttribute( a.name, a.value );
					});

					this.attributes = attrs;
				}
			}
		};

		return ConditionalAttribute;
	}(Item));

	function parseAttributes ( str, isSvg ) {
		var tagName = isSvg ? 'svg' : 'div';
		return str
			? (div$1.innerHTML = "<" + tagName + " " + str + "></" + tagName + ">") &&
				toArray(div$1.childNodes[0].attributes)
			: [];
	}

	function notIn ( haystack, needle ) {
		var i = haystack.length;

		while ( i-- ) {
			if ( haystack[i].name === needle.name ) {
				return false;
			}
		}

		return true;
	}

	function processWrapper ( wrapper, array, methodName, newIndices ) {
		var __model = wrapper.__model;

		if ( newIndices ) {
			__model.shuffle( newIndices );
		} else {
			// If this is a sort or reverse, we just do root.set()...
			// TODO use merge logic?
			//root.viewmodel.mark( keypath );
		}
	}

	var mutatorMethods = [ 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift' ];
	var patchedArrayProto = [];

	mutatorMethods.forEach( function ( methodName ) {
		var method = function () {
			var this$1 = this;
			var args = [], len = arguments.length;
			while ( len-- ) args[ len ] = arguments[ len ];

			var newIndices = getNewIndices( this.length, methodName, args );

			// lock any magic array wrappers, so that things don't get fudged
			this._ractive.wrappers.forEach( function ( r ) { if ( r.magic ) r.magic.locked = true; } );

			// apply the underlying method
			var result = Array.prototype[ methodName ].apply( this, arguments );

			// trigger changes
			runloop.start();

			this._ractive.setting = true;
			var i = this._ractive.wrappers.length;
			while ( i-- ) {
				processWrapper( this$1._ractive.wrappers[i], this$1, methodName, newIndices );
			}

			runloop.end();

			this._ractive.setting = false;

			// unlock the magic arrays... magic... bah
			this._ractive.wrappers.forEach( function ( r ) { if ( r.magic ) r.magic.locked = false; } );

			return result;
		};

		defineProperty( patchedArrayProto, methodName, {
			value: method,
			configurable: true
		});
	});

	var patchArrayMethods;
	var unpatchArrayMethods;

	// can we use prototype chain injection?
	// http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_prototype_chain_injection
	if ( ({}).__proto__ ) {
		// yes, we can
		patchArrayMethods = function ( array ) { return array.__proto__ = patchedArrayProto; };
		unpatchArrayMethods = function ( array ) { return array.__proto__ = Array.prototype; };
	}

	else {
		// no, we can't
		patchArrayMethods = function ( array ) {
			var i = mutatorMethods.length;
			while ( i-- ) {
				var methodName = mutatorMethods[i];
				defineProperty( array, methodName, {
					value: patchedArrayProto[ methodName ],
					configurable: true
				});
			}
		};

		unpatchArrayMethods = function ( array ) {
			var i = mutatorMethods.length;
			while ( i-- ) {
				delete array[ mutatorMethods[i] ];
			}
		};
	}

	patchArrayMethods.unpatch = unpatchArrayMethods; // TODO export separately?
	var patch = patchArrayMethods;

	var errorMessage$1 = 'Something went wrong in a rather interesting way';

	var arrayAdaptor = {
		filter: function ( object ) {
			// wrap the array if a) b) it's an array, and b) either it hasn't been wrapped already,
			// or the array didn't trigger the get() itself
			return isArray( object ) && ( !object._ractive || !object._ractive.setting );
		},
		wrap: function ( ractive, array, keypath ) {
			return new ArrayWrapper( ractive, array, keypath );
		}
	};

	var ArrayWrapper = function ArrayWrapper ( ractive, array ) {
		this.root = ractive;
		this.value = array;
		this.__model = null; // filled in later

		// if this array hasn't already been ractified, ractify it
		if ( !array._ractive ) {
			// define a non-enumerable _ractive property to store the wrappers
			defineProperty( array, '_ractive', {
				value: {
					wrappers: [],
					instances: [],
					setting: false
				},
				configurable: true
			});

			patch( array );
		}

		// store the ractive instance, so we can handle transitions later
		if ( !array._ractive.instances[ ractive._guid ] ) {
			array._ractive.instances[ ractive._guid ] = 0;
			array._ractive.instances.push( ractive );
		}

		array._ractive.instances[ ractive._guid ] += 1;
		array._ractive.wrappers.push( this );
	};

	ArrayWrapper.prototype.get = function get () {
		return this.value;
	};

	ArrayWrapper.prototype.reset = function reset ( value ) {
		return this.value === value;
	};

	ArrayWrapper.prototype.teardown = function teardown () {
		var array, storage, wrappers, instances, index;

		array = this.value;
		storage = array._ractive;
		wrappers = storage.wrappers;
		instances = storage.instances;

		// if teardown() was invoked because we're clearing the cache as a result of
		// a change that the array itself triggered, we can save ourselves the teardown
		// and immediate setup
		if ( storage.setting ) {
			return false; // so that we don't remove it from cached wrappers
		}

		index = wrappers.indexOf( this );
		if ( index === -1 ) {
			throw new Error( errorMessage$1 );
		}

		wrappers.splice( index, 1 );

		// if nothing else depends on this array, we can revert it to its
		// natural state
		if ( !wrappers.length ) {
			delete array._ractive;
			patch.unpatch( this.value );
		}

		else {
			// remove ractive instance if possible
			instances[ this.root._guid ] -= 1;
			if ( !instances[ this.root._guid ] ) {
				index = instances.indexOf( this.root );

				if ( index === -1 ) {
					throw new Error( errorMessage$1 );
				}

				instances.splice( index, 1 );
			}
		}
	};

	var magicAdaptor;

	try {
		Object.defineProperty({}, 'test', { get: function() {}, set: function() {} });

		magicAdaptor = {
			filter: function ( value ) {
				return value && typeof value === 'object';
			},
			wrap: function ( ractive, value, keypath ) {
				return new MagicWrapper( ractive, value, keypath );
			}
		};
	} catch ( err ) {
		magicAdaptor = false;
	}

	var magicAdaptor$1 = magicAdaptor;

	function createOrWrapDescriptor ( originalDescriptor, ractive, keypath, wrapper ) {
		if ( originalDescriptor.set && originalDescriptor.set.__magic ) {
			originalDescriptor.set.__magic.dependants.push({ ractive: ractive, keypath: keypath });
			return originalDescriptor;
		}

		var setting;

		var dependants = [{ ractive: ractive, keypath: keypath }];

		var descriptor = {
			get: function () {
				return 'value' in originalDescriptor ? originalDescriptor.value : originalDescriptor.get.call( this );
			},
			set: function (value) {
				if ( setting ) return;

				if ( 'value' in originalDescriptor ) {
					originalDescriptor.value = value;
				} else {
					originalDescriptor.set.call( this, value );
				}

				if ( wrapper.locked ) return;
				setting = true;

				if ( wrapper.setting ) {
					dependants.forEach( function (ref) {
						var ractive = ref.ractive;
						var keypath = ref.keypath;

						ractive.viewmodel.joinAll( splitKeypathI( keypath ) ).mark();
					});
				} else {
					dependants.forEach( function (ref) {
						var ractive = ref.ractive;
						var keypath = ref.keypath;

						ractive.set( keypath, value );
					});
				}

				setting = false;
			},
			enumerable: true
		};

		descriptor.set.__magic = { dependants: dependants, originalDescriptor: originalDescriptor };

		return descriptor;
	}

	function revert ( descriptor, ractive, keypath ) {
		if ( !descriptor.set || !descriptor.set.__magic ) return true;

		var dependants = descriptor.set.__magic;
		var i = dependants.length;
		while ( i-- ) {
			var dependant = dependants[i];
			if ( dependant.ractive === ractive && dependant.keypath === keypath ) {
				dependants.splice( i, 1 );
				return false;
			}
		}
	}

	var MagicWrapper = function MagicWrapper ( ractive, value, keypath ) {
		var this$1 = this;

			this.ractive = ractive;
		this.value = value;
		this.keypath = keypath;

		this.originalDescriptors = {};

		// wrap all properties with getters
		Object.keys( value ).forEach( function ( key ) {
			var originalDescriptor = Object.getOwnPropertyDescriptor( this$1.value, key );
			this$1.originalDescriptors[ key ] = originalDescriptor;

			var childKeypath = keypath ? ("" + keypath + "." + (escapeKey( key ))) : escapeKey( key );

			var descriptor = createOrWrapDescriptor( originalDescriptor, ractive, childKeypath, this$1 );



			Object.defineProperty( this$1.value, key, descriptor );
		});
	};

	MagicWrapper.prototype.get = function get () {
		return this.value;
	};

	MagicWrapper.prototype.reset = function reset ( value ) {
		return this.value === value;
	};

	MagicWrapper.prototype.set = function set ( key, value ) {
		this.setting = true;
		this.value[ key ] = value;
		this.setting = false;
	};

	MagicWrapper.prototype.teardown = function teardown () {
		var this$1 = this;

			Object.keys( this.value ).forEach( function ( key ) {
			var descriptor = Object.getOwnPropertyDescriptor( this$1.value, key );
			if ( !descriptor.set || !descriptor.set.__magic ) return;

			revert( descriptor );

			if ( descriptor.set.__magic.dependants.length === 1 ) {
				Object.defineProperty( this$1.value, key, descriptor.set.__magic.originalDescriptor );
			}
		});
	};

	var MagicArrayWrapper = function MagicArrayWrapper ( ractive, array, keypath ) {
		this.value = array;

		this.magic = true;

		this.magicWrapper = magicAdaptor$1.wrap( ractive, array, keypath );
		this.arrayWrapper = arrayAdaptor.wrap( ractive, array, keypath );
		this.arrayWrapper.magic = this.magicWrapper;

		// ugh, this really is a terrible hack
		Object.defineProperty( this, '__model', {
			get: function () {
				return this.arrayWrapper.__model;
			},
			set: function ( model ) {
				this.arrayWrapper.__model = model;
			}
		});
	};

	MagicArrayWrapper.prototype.get = function get () {
		return this.value;
	};

	MagicArrayWrapper.prototype.teardown = function teardown () {
		this.arrayWrapper.teardown();
		this.magicWrapper.teardown();
	};

	MagicArrayWrapper.prototype.reset = function reset ( value ) {
		return this.arrayWrapper.reset( value ) && this.magicWrapper.reset( value );
	};

	var magicArrayAdaptor = {
		filter: function ( object, keypath, ractive ) {
			return magicAdaptor$1.filter( object, keypath, ractive ) && arrayAdaptor.filter( object );
		},

		wrap: function ( ractive, array, keypath ) {
			return new MagicArrayWrapper( ractive, array, keypath );
		}
	};

	// TODO this is probably a bit anal, maybe we should leave it out
	function prettify ( fnBody ) {
		var lines = fnBody
			.replace( /^\t+/gm, function ( tabs ) { return tabs.split( '\t' ).join( '  ' ); } )
			.split( '\n' );

		var minIndent = lines.length < 2 ? 0 :
			lines.slice( 1 ).reduce( function ( prev, line ) {
				return Math.min( prev, /^\s*/.exec( line )[0].length );
			}, Infinity );

		return lines.map( function ( line, i ) {
			return '    ' + ( i ? line.substring( minIndent ) : line );
		}).join( '\n' );
	}

	// Ditto. This function truncates the stack to only include app code
	function truncateStack ( stack ) {
		if ( !stack ) return '';

		var lines = stack.split( '\n' );
		var name = Computation.name + '.getValue';

		var truncated = [];

		var len = lines.length;
		for ( var i = 1; i < len; i += 1 ) {
			var line = lines[i];

			if ( ~line.indexOf( name ) ) {
				return truncated.join( '\n' );
			} else {
				truncated.push( line );
			}
		}
	}

	var Computation = (function (Model) {
		function Computation ( viewmodel, signature, key ) {
			Model.call( this, null, null );

			this.root = this.parent = viewmodel;
			this.signature = signature;

			this.key = key; // not actually used, but helps with debugging
			this.isExpression = key && key[0] === '@';

			this.isReadonly = !this.signature.setter;

			this.context = viewmodel.computationContext;

			this.dependencies = [];

			this.children = [];
			this.childByKey = {};

			this.deps = [];

			this.dirty = true;

			// TODO: is there a less hackish way to do this?
			this.shuffle = undefined;
		}

		Computation.prototype = Object.create( Model && Model.prototype );
		Computation.prototype.constructor = Computation;

		Computation.prototype.get = function get ( shouldCapture ) {
			if ( shouldCapture ) capture( this );

			if ( this.dirty ) {
				this.dirty = false;
				this.value = this.getValue();
				if ( this.wrapper ) this.newWrapperValue = this.value;
				this.adapt();
			}

			// if capturing, this value needs to be unwrapped because it's for external use
			return shouldCapture && this.wrapper ? this.wrapperValue : this.value;
		};

		Computation.prototype.getValue = function getValue () {
			startCapturing();
			var result;

			try {
				result = this.signature.getter.call( this.context );
			} catch ( err ) {
				warnIfDebug( ("Failed to compute " + (this.getKeypath()) + ": " + (err.message || err)) );

				// TODO this is all well and good in Chrome, but...
				// ...also, should encapsulate this stuff better, and only
				// show it if Ractive.DEBUG
				if ( hasConsole ) {
					if ( console.groupCollapsed ) console.groupCollapsed( '%cshow details', 'color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;' );
					var functionBody = prettify( this.signature.getterString );
					var stack = this.signature.getterUseStack ? '\n\n' + truncateStack( err.stack ) : '';
					console.error( ("" + (err.name) + ": " + (err.message) + "\n\n" + functionBody + "" + stack) );
					if ( console.groupCollapsed ) console.groupEnd();
				}
			}

			var dependencies = stopCapturing();
			this.setDependencies( dependencies );

			// if not the first computation and the value is not the same,
			// register the change for change events
			if ( 'value' in this && result !== this.value ) {
				this.registerChange( this.getKeypath(), result );
			}

			return result;
		};

		Computation.prototype.handleChange = function handleChange$1 () {
			this.dirty = true;

			this.links.forEach( marked );
			this.deps.forEach( handleChange );
			this.children.forEach( handleChange );
			this.clearUnresolveds(); // TODO same question as on Model - necessary for primitives?
		};

		Computation.prototype.joinKey = function joinKey ( key ) {
			if ( key === undefined || key === '' ) return this;

			if ( !this.childByKey.hasOwnProperty( key ) ) {
				var child = new ComputationChild( this, key );
				this.children.push( child );
				this.childByKey[ key ] = child;
			}

			return this.childByKey[ key ];
		};

		Computation.prototype.mark = function mark () {
			this.handleChange();
		};

		Computation.prototype.rebinding = function rebinding ( next, previous ) {
			// computations will grab all of their deps again automagically
			if ( next !== previous ) this.handleChange();
		};

		Computation.prototype.set = function set ( value ) {
			if ( !this.signature.setter ) {
				throw new Error( ("Cannot set read-only computed value '" + (this.key) + "'") );
			}

			this.signature.setter( value );
			this.mark();
		};

		Computation.prototype.setDependencies = function setDependencies ( dependencies ) {
			// unregister any soft dependencies we no longer have
			var this$1 = this;

			var i = this.dependencies.length;
			while ( i-- ) {
				var model = this$1.dependencies[i];
				if ( !~dependencies.indexOf( model ) ) model.unregister( this$1 );
			}

			// and add any new ones
			i = dependencies.length;
			while ( i-- ) {
				var model$1 = dependencies[i];
				if ( !~this$1.dependencies.indexOf( model$1 ) ) model$1.register( this$1 );
			}

			this.dependencies = dependencies;
		};

		Computation.prototype.teardown = function teardown () {
			var this$1 = this;

			var i = this.dependencies.length;
			while ( i-- ) {
				if ( this$1.dependencies[i] ) this$1.dependencies[i].unregister( this$1 );
			}
			if ( this.root.computations[this.key] === this ) delete this.root.computations[this.key];
			Model.prototype.teardown.call(this);
		};

		Computation.prototype.unregister = function unregister ( dependent ) {
			Model.prototype.unregister.call( this, dependent );
			// tear down expressions with no deps, because they will be replaced when needed
			if ( this.isExpression && this.deps.length === 0 ) this.teardown();
		};

		return Computation;
	}(Model));

	var RactiveModel = (function (Model) {
		function RactiveModel ( ractive ) {
			Model.call( this, null, '' );
			this.value = ractive;
			this.isRoot = true;
			this.root = this;
			this.adaptors = [];
			this.ractive = ractive;
			this.changes = {};
		}

		RactiveModel.prototype = Object.create( Model && Model.prototype );
		RactiveModel.prototype.constructor = RactiveModel;

		RactiveModel.prototype.getKeypath = function getKeypath() {
			return '@this';
		};

		return RactiveModel;
	}(Model));

	var hasProp$1 = Object.prototype.hasOwnProperty;

	var RootModel = (function (Model) {
		function RootModel ( options ) {
			Model.call( this, null, null );

			// TODO deprecate this
			this.changes = {};

			this.isRoot = true;
			this.root = this;
			this.ractive = options.ractive; // TODO sever this link

			this.value = options.data;
			this.adaptors = options.adapt;
			this.adapt();

			this.computationContext = options.ractive;
			this.computations = {};

			// TODO this is only for deprecation of using expression keypaths
			this.expressions = {};
		}

		RootModel.prototype = Object.create( Model && Model.prototype );
		RootModel.prototype.constructor = RootModel;

		RootModel.prototype.applyChanges = function applyChanges () {
			this._changeHash = {};
			this.flush();

			return this._changeHash;
		};

		RootModel.prototype.compute = function compute ( key, signature ) {
			var computation = new Computation( this, signature, key );
			this.computations[ escapeKey( key ) ] = computation;

			return computation;
		};

		RootModel.prototype.createLink = function createLink ( keypath, target, targetPath ) {
			var this$1 = this;

			var keys = splitKeypathI( keypath );

			var model = this;
			while ( keys.length ) {
				var key = keys.shift();
				model = this$1.childByKey[ key ] || this$1.joinKey( key );
			}

			return model.link( target, targetPath );
		};

		RootModel.prototype.get = function get ( shouldCapture, options ) {
			var this$1 = this;

			if ( shouldCapture ) capture( this );

			if ( !options || options.virtual !== false ) {
				var result = this.getVirtual();
				var keys = Object.keys( this.computations );
				var i = keys.length;
				while ( i-- ) {
					var computation = this$1.computations[ keys[i] ];
					// exclude template expressions
					if ( !computation.isExpression ) {
						result[ keys[i] ] = computation.get();
					}
				}

				return result;
			} else {
				return this.value;
			}
		};

		RootModel.prototype.getKeypath = function getKeypath () {
			return '';
		};

		RootModel.prototype.getRactiveModel = function getRactiveModel() {
			return this.ractiveModel || ( this.ractiveModel = new RactiveModel( this.ractive ) );
		};

		RootModel.prototype.getValueChildren = function getValueChildren () {
			var children = Model.prototype.getValueChildren.call( this, this.value );

			this.children.forEach( function ( child ) {
				if ( child._link ) {
					var idx = children.indexOf( child );
					if ( ~idx ) children.splice( idx, 1, child._link );
					else children.push( child._link );
				}
			});

			for ( var k in this.computations ) {
				children.push( this.computations[k] );
			}

			return children;
		};

		RootModel.prototype.handleChange = function handleChange$1 () {
			this.deps.forEach( handleChange );
		};

		RootModel.prototype.has = function has ( key ) {
			var value = this.value;
			var unescapedKey = unescapeKey( key );

			if ( hasProp$1.call( value, unescapedKey ) ) return true;

			// mappings/links and computations
			if ( key in this.computations || this.childByKey[unescapedKey] && this.childByKey[unescapedKey]._link ) return true;
			// TODO remove this after deprecation is done
			if ( key in this.expressions ) return true;

			// We climb up the constructor chain to find if one of them contains the unescapedKey
			var constructor = value.constructor;
			while ( constructor !== Function && constructor !== Array && constructor !== Object ) {
				if ( hasProp$1.call( constructor.prototype, unescapedKey ) ) return true;
				constructor = constructor.constructor;
			}

			return false;
		};

		RootModel.prototype.joinKey = function joinKey ( key, opts ) {
			if ( key === '@global' ) return GlobalModel$1;
			if ( key === '@this' ) return this.getRactiveModel();

			if ( this.expressions.hasOwnProperty( key ) ) {
				warnIfDebug( ("Accessing expression keypaths (" + (key.substr(1)) + ") from the instance is deprecated. You can used a getNodeInfo or event object to access keypaths with expression context.") );
				return this.expressions[ key ];
			}

			return this.computations.hasOwnProperty( key ) ? this.computations[ key ] :
			       Model.prototype.joinKey.call( this, key, opts );
		};

		RootModel.prototype.map = function map ( localKey, origin ) {
			var local = this.joinKey( localKey );
			local.link( origin );
		};

		RootModel.prototype.rebinding = function rebinding () {
		};

		RootModel.prototype.set = function set ( value ) {
			// TODO wrapping root node is a baaaad idea. We should prevent this
			var wrapper = this.wrapper;
			if ( wrapper ) {
				var shouldTeardown = !wrapper.reset || wrapper.reset( value ) === false;

				if ( shouldTeardown ) {
					wrapper.teardown();
					this.wrapper = null;
					this.value = value;
					this.adapt();
				}
			} else {
				this.value = value;
				this.adapt();
			}

			this.deps.forEach( handleChange );
			this.children.forEach( mark );
			this.clearUnresolveds(); // TODO do we need to do this with primitive values? if not, what about e.g. unresolved `length` property of null -> string?
		};

		RootModel.prototype.retrieve = function retrieve () {
			return this.wrapper ? this.wrapper.get() : this.value;
		};

		RootModel.prototype.teardown = function teardown () {
			Model.prototype.teardown.call(this);
			for ( var k in this.computations ) {
				this.computations[ k ].teardown();
			}
		};

		RootModel.prototype.update = function update () {
			// noop
		};

		return RootModel;
	}(Model));

	function getComputationSignature ( ractive, key, signature ) {
		var getter;
		var setter;

		// useful for debugging
		var getterString;
		var getterUseStack;
		var setterString;

		if ( typeof signature === 'function' ) {
			getter = bind( signature, ractive );
			getterString = signature.toString();
			getterUseStack = true;
		}

		if ( typeof signature === 'string' ) {
			getter = createFunctionFromString( signature, ractive );
			getterString = signature;
		}

		if ( typeof signature === 'object' ) {
			if ( typeof signature.get === 'string' ) {
				getter = createFunctionFromString( signature.get, ractive );
				getterString = signature.get;
			} else if ( typeof signature.get === 'function' ) {
				getter = bind( signature.get, ractive );
				getterString = signature.get.toString();
				getterUseStack = true;
			} else {
				fatal( '`%s` computation must have a `get()` method', key );
			}

			if ( typeof signature.set === 'function' ) {
				setter = bind( signature.set, ractive );
				setterString = signature.set.toString();
			}
		}

		return {
			getter: getter,
			setter: setter,
			getterString: getterString,
			setterString: setterString,
			getterUseStack: getterUseStack
		};
	}

	var constructHook = new Hook( 'construct' );

	var registryNames$1 = [
		'adaptors',
		'components',
		'decorators',
		'easing',
		'events',
		'interpolators',
		'partials',
		'transitions'
	];

	var uid = 0;

	function construct ( ractive, options ) {
		if ( Ractive.DEBUG ) welcome();

		initialiseProperties( ractive );

		// TODO remove this, eventually
		defineProperty( ractive, 'data', { get: deprecateRactiveData });

		// TODO don't allow `onconstruct` with `new Ractive()`, there's no need for it
		constructHook.fire( ractive, options );

		// Add registries
		registryNames$1.forEach( function ( name ) {
			ractive[ name ] = extendObj( create( ractive.constructor[ name ] || null ), options[ name ] );
		});

		// Create a viewmodel
		var viewmodel = new RootModel({
			adapt: getAdaptors( ractive, ractive.adapt, options ),
			data: dataConfigurator.init( ractive.constructor, ractive, options ),
			ractive: ractive
		});

		ractive.viewmodel = viewmodel;

		// Add computed properties
		var computed = extendObj( create( ractive.constructor.prototype.computed ), options.computed );

		for ( var key in computed ) {
			var signature = getComputationSignature( ractive, key, computed[ key ] );
			viewmodel.compute( key, signature );
		}
	}

	function combine$2 ( arrays ) {
		var res = [];
		var args = res.concat.apply( res, arrays );

		var i = args.length;
		while ( i-- ) {
			if ( !~res.indexOf( args[i] ) ) {
				res.unshift( args[i] );
			}
		}

		return res;
	}

	function getAdaptors ( ractive, protoAdapt, options ) {
		protoAdapt = protoAdapt.map( lookup );
		var adapt = ensureArray( options.adapt ).map( lookup );

		var builtins = [];
		var srcs = [ protoAdapt, adapt ];
		if ( ractive.parent && !ractive.isolated ) {
			srcs.push( ractive.parent.viewmodel.adaptors );
		}
		srcs.push( builtins );

		var magic = 'magic' in options ? options.magic : ractive.magic;
		var modifyArrays = 'modifyArrays' in options ? options.modifyArrays : ractive.modifyArrays;

		if ( magic ) {
			if ( !magicSupported ) {
				throw new Error( 'Getters and setters (magic mode) are not supported in this browser' );
			}

			if ( modifyArrays ) {
				builtins.push( magicArrayAdaptor );
			}

			builtins.push( magicAdaptor$1 );
		}

		if ( modifyArrays ) {
			builtins.push( arrayAdaptor );
		}

		return combine$2( srcs );


		function lookup ( adaptor ) {
			if ( typeof adaptor === 'string' ) {
				adaptor = findInViewHierarchy( 'adaptors', ractive, adaptor );

				if ( !adaptor ) {
					fatal( missingPlugin( adaptor, 'adaptor' ) );
				}
			}

			return adaptor;
		}
	}

	function initialiseProperties ( ractive ) {
		// Generate a unique identifier, for places where you'd use a weak map if it
		// existed
		ractive._guid = 'r-' + uid++;

		// events
		ractive._subs = create( null );

		// storage for item configuration from instantiation to reset,
		// like dynamic functions or original values
		ractive._config = {};

		// nodes registry
		ractive.nodes = {};

		// events
		ractive.event = null;
		ractive._eventQueue = [];

		// live queries
		ractive._liveQueries = [];
		ractive._liveComponentQueries = [];

		// observers
		ractive._observers = [];

		if(!ractive.component){
			ractive.root = ractive;
			ractive.parent = ractive.container = null; // TODO container still applicable?
		}

	}

	function deprecateRactiveData () {
		throw new Error( 'Using `ractive.data` is no longer supported - you must use the `ractive.get()` API instead' );
	}

	function getChildQueue ( queue, ractive ) {
		return queue[ ractive._guid ] || ( queue[ ractive._guid ] = [] );
	}

	function fire ( hookQueue, ractive ) {
		var childQueue = getChildQueue( hookQueue.queue, ractive );

		hookQueue.hook.fire( ractive );

		// queue is "live" because components can end up being
		// added while hooks fire on parents that modify data values.
		while ( childQueue.length ) {
			fire( hookQueue, childQueue.shift() );
		}

		delete hookQueue.queue[ ractive._guid ];
	}

	var HookQueue = function HookQueue ( event ) {
		this.hook = new Hook( event );
		this.inProcess = {};
		this.queue = {};
	};

	HookQueue.prototype.begin = function begin ( ractive ) {
		this.inProcess[ ractive._guid ] = true;
	};

	HookQueue.prototype.end = function end ( ractive ) {
		var parent = ractive.parent;

		// If this is *isn't* a child of a component that's in process,
		// it should call methods or fire at this point
		if ( !parent || !this.inProcess[ parent._guid ] ) {
			fire( this, ractive );
		}
		// elsewise, handoff to parent to fire when ready
		else {
			getChildQueue( this.queue, parent ).push( ractive );
		}

		delete this.inProcess[ ractive._guid ];
	};

	var configHook = new Hook( 'config' );
	var initHook = new HookQueue( 'init' );

	function initialise ( ractive, userOptions, options ) {
		Object.keys( ractive.viewmodel.computations ).forEach( function ( key ) {
			var computation = ractive.viewmodel.computations[ key ];

			if ( ractive.viewmodel.value.hasOwnProperty( key ) ) {
				computation.set( ractive.viewmodel.value[ key ] );
			}
		});

		// init config from Parent and options
		config.init( ractive.constructor, ractive, userOptions );

		configHook.fire( ractive );
		initHook.begin( ractive );

		var fragment;

		// Render virtual DOM
		if ( ractive.template ) {
			var cssIds;

			if ( options.cssIds || ractive.cssId ) {
				cssIds = options.cssIds ? options.cssIds.slice() : [];

				if ( ractive.cssId ) {
					cssIds.push( ractive.cssId );
				}
			}

			ractive.fragment = fragment = new Fragment({
				owner: ractive,
				template: ractive.template,
				cssIds: cssIds
			}).bind( ractive.viewmodel );
		}

		initHook.end( ractive );

		if ( fragment ) {
			// render automatically ( if `el` is specified )
			var el = getElement( ractive.el );
			if ( el ) {
				var promise = ractive.render( el, ractive.append );

				if ( Ractive.DEBUG_PROMISES ) {
					promise['catch']( function ( err ) {
						warnOnceIfDebug( 'Promise debugging is enabled, to help solve errors that happen asynchronously. Some browsers will log unhandled promise rejections, in which case you can safely disable promise debugging:\n  Ractive.DEBUG_PROMISES = false;' );
						warnIfDebug( 'An error happened during rendering', { ractive: ractive });
						logIfDebug( err );

						throw err;
					});
				}
			}
		}
	}

	var DOMEvent = function DOMEvent ( name, owner ) {
		if ( name.indexOf( '*' ) !== -1 ) {
			fatal( ("Only component proxy-events may contain \"*\" wildcards, <" + (owner.name) + " on-" + name + "=\"...\"/> is not valid") );
		}

		this.name = name;
		this.owner = owner;
		this.node = null;
		this.handler = null;
	};

	DOMEvent.prototype.listen = function listen ( directive ) {
		var node = this.node = this.owner.node;
		var name = this.name;

		if ( !( ("on" + name) in node ) ) {
			warnOnce( missingPlugin( name, 'events' ) );
			}

			node.addEventListener( name, this.handler = function( event ) {
			directive.fire({
					node: node,
				original: event
				});
			}, false );
	};

	DOMEvent.prototype.unlisten = function unlisten () {
		if ( this.handler ) this.node.removeEventListener( this.name, this.handler, false );
	};

	var CustomEvent = function CustomEvent ( eventPlugin, owner ) {
		this.eventPlugin = eventPlugin;
		this.owner = owner;
		this.handler = null;
	};

	CustomEvent.prototype.listen = function listen ( directive ) {
		var node = this.owner.node;

		this.handler = this.eventPlugin( node, function ( event ) {
			if ( event === void 0 ) event = {};

				event.node = event.node || node;
			directive.fire( event );
		});
	};

	CustomEvent.prototype.unlisten = function unlisten () {
		this.handler.teardown();
	};

	var RactiveEvent = function RactiveEvent ( ractive, name ) {
		this.ractive = ractive;
		this.name = name;
		this.handler = null;
	};

	RactiveEvent.prototype.listen = function listen ( directive ) {
		var ractive = this.ractive;

		this.handler = ractive.on( this.name, function () {
			var event;

			// semi-weak test, but what else? tag the event obj ._isEvent ?
			if ( arguments.length && arguments[0] && arguments[0].node ) {
				event = Array.prototype.shift.call( arguments );
				event.component = ractive;
			}

			var args = Array.prototype.slice.call( arguments );
			directive.fire( event, args );

			// cancel bubbling
			return false;
		});
	};

	RactiveEvent.prototype.unlisten = function unlisten () {
		this.handler.cancel();
	};

	var specialPattern = /^(event|arguments)(\..+)?$/;
	var dollarArgsPattern = /^\$(\d+)(\..+)?$/;

	var EventDirective = function EventDirective ( options ) {
		var this$1 = this;

			this.owner = options.owner || options.parentFragment.owner || findElement( options.parentFragment );
		this.element = this.owner.attributeByName ? this.owner : findElement( options.parentFragment );
		this.template = options.template;
		this.parentFragment = options.parentFragment;
		this.ractive = options.parentFragment.ractive;

		this.events = [];

		if ( this.element.type === COMPONENT ) {
			this.template.n.split( '-' ).forEach( function ( n ) {
				this$1.events.push( new RactiveEvent( this$1.element.instance, n ) );
			});
		} else {
			this.template.n.split( '-' ).forEach( function ( n ) {
				var fn = findInViewHierarchy( 'events', this$1.ractive, n );
				// we need to pass in "this" in order to get
				// access to node when it is created.
				this$1.events.push(fn ? new CustomEvent( fn, this$1.element ) : new DOMEvent( n, this$1.element ));
			});
		}

		this.context = null;

		// method calls
		this.resolvers = null;
		this.models = null;

		// handler directive
		this.action = null;
		this.args = null;
	};

	EventDirective.prototype.bind = function bind () {
		var this$1 = this;

			this.context = this.parentFragment.findContext();

		var template = this.template.f;

		if ( template.x ) {
			this.fn = getFunction( template.x.s, template.x.r.length );
			this.resolvers = [];
			this.models = template.x.r.map( function ( ref, i ) {
				var specialMatch = specialPattern.exec( ref );
				if ( specialMatch ) {
					// on-click="foo(event.node)"
					return {
						special: specialMatch[1],
						keys: specialMatch[2] ? splitKeypathI( specialMatch[2].substr(1) ) : []
					};
				}

				var dollarMatch = dollarArgsPattern.exec( ref );
				if ( dollarMatch ) {
					// on-click="foo($1)"
					return {
						special: 'arguments',
						keys: [ dollarMatch[1] - 1 ].concat( dollarMatch[2] ? splitKeypathI( dollarMatch[2].substr( 1 ) ) : [] )
					};
				}

				var resolver;

				var model = resolveReference( this$1.parentFragment, ref );
				if ( !model ) {
					resolver = this$1.parentFragment.resolve( ref, function ( model ) {
						this$1.models[i] = model;
						removeFromArray( this$1.resolvers, resolver );
						model.register( this$1 );
					});

					this$1.resolvers.push( resolver );
				} else model.register( this$1 );

				return model;
			});
		}

		else {
			// TODO deprecate this style of directive
			this.action = typeof template === 'string' ? // on-click='foo'
				template :
				typeof template.n === 'string' ? // on-click='{{dynamic}}'
					template.n :
					new Fragment({
						owner: this,
						template: template.n
					});

			this.args = template.a ? // static arguments
				( typeof template.a === 'string' ? [ template.a ] : template.a ) :
				template.d ? // dynamic arguments
					new Fragment({
						owner: this,
						template: template.d
					}) :
					[]; // no arguments
		}

		if ( this.action && typeof this.action !== 'string' ) this.action.bind();
		if ( this.args && template.d ) this.args.bind();
	};

	EventDirective.prototype.bubble = function bubble () {
		if ( !this.dirty ) {
			this.dirty = true;
			this.owner.bubble();
		}
	};

	EventDirective.prototype.destroyed = function destroyed () {
		this.events.forEach( function ( e ) { return e.unlisten(); } );
	};

	EventDirective.prototype.fire = function fire ( event, passedArgs ) {

		// augment event object
		if ( passedArgs === void 0 ) passedArgs = [];

			if ( event && !event.hasOwnProperty( '_element' ) ) {
			   addHelpers( event, this.owner );
		}

		if ( this.fn ) {
			var values = [];

			if ( event ) passedArgs.unshift( event );

			if ( this.models ) {
				this.models.forEach( function ( model ) {
					if ( !model ) return values.push( undefined );

					if ( model.special ) {
						var obj = model.special === 'event' ? event : passedArgs;
						var keys = model.keys.slice();

						while ( keys.length ) obj = obj[ keys.shift() ];
						return values.push( obj );
					}

					if ( model.wrapper ) {
						return values.push( model.wrapperValue );
					}

					values.push( model.get() );
				});
			}

			// make event available as `this.event`
			var ractive = this.ractive;
			var oldEvent = ractive.event;

			ractive.event = event;
			var result = this.fn.apply( ractive, values ).pop();

			// Auto prevent and stop if return is explicitly false
			if ( result === false ) {
				var original = event ? event.original : undefined;
				if ( original ) {
					original.preventDefault && original.preventDefault();
					original.stopPropagation && original.stopPropagation();
				} else {
					warnOnceIfDebug( ("handler '" + (this.template.n) + "' returned false, but there is no event available to cancel") );
				}
			}

			ractive.event = oldEvent;
		}

		else {
			var action = this.action.toString();
			var args = this.template.f.d ? this.args.getArgsList() : this.args;

			if ( passedArgs.length ) args = args.concat( passedArgs );

			if ( event ) event.name = action;

			fireEvent( this.ractive, action, {
				event: event,
				args: args
			});
		}
	};

	EventDirective.prototype.handleChange = function handleChange () {};

	EventDirective.prototype.rebinding = function rebinding ( next, previous ) {
		var this$1 = this;

			if ( !this.models ) return;
		var idx = this.models.indexOf( previous );

		if ( ~idx ) {
			this.models.splice( idx, 1, next );
			previous.unregister( this );
			if ( next ) next.addShuffleTask( function () { return next.register( this$1 ); } );
		}
	};

	EventDirective.prototype.render = function render () {
		// render events after everything else, so they fire after bindings
		var this$1 = this;

			runloop.scheduleTask( function () { return this$1.events.forEach( function ( e ) { return e.listen( this$1 ); }, true ); } );
	};

	EventDirective.prototype.toString = function toString() { return ''; };

	EventDirective.prototype.unbind = function unbind$1 () {
		var this$1 = this;

			var template = this.template.f;

		if ( template.x ) {
			if ( this.resolvers ) this.resolvers.forEach( unbind );
			this.resolvers = [];

			if ( this.models ) this.models.forEach( function ( m ) {
				if ( m && m.unregister ) m.unregister( this$1 );
			});
			this.models = null;
		}

		else {
			// TODO this is brittle and non-explicit, fix it
			if ( this.action && this.action.unbind ) this.action.unbind();
			if ( this.args && this.args.unbind ) this.args.unbind();
		}
	};

	EventDirective.prototype.unrender = function unrender () {
		this.events.forEach( function ( e ) { return e.unlisten(); } );
	};

	EventDirective.prototype.update = function update () {
		if ( this.method || !this.dirty ) return; // nothing to do

		this.dirty = false;

		// ugh legacy
		if ( this.action && this.action.update ) this.action.update();
		if ( this.args && this.args.update ) this.args.update();
	};

	// TODO it's unfortunate that this has to run every time a
	// component is rendered... is there a better way?
	function updateLiveQueries ( component ) {
		// Does this need to be added to any live queries?
		var instance = component.ractive;

		do {
			var liveQueries = instance._liveComponentQueries;

			var i = liveQueries.length;
			while ( i-- ) {
				var name = liveQueries[i];
				var query = liveQueries[ ("_" + name) ];

				if ( query.test( component ) ) {
					query.add( component.instance );
					// keep register of applicable selectors, for when we teardown
					component.liveQueries.push( query );
				}
			}
		} while ( instance = instance.parent );
	}

	function removeFromLiveComponentQueries ( component ) {
		var instance = component.ractive;

		while ( instance ) {
			var query = instance._liveComponentQueries[ ("_" + (component.name)) ];
			if ( query ) query.remove( component );

			instance = instance.parent;
		}
	}

	function makeDirty ( query ) {
		query.makeDirty();
	}

	var teardownHook = new Hook( 'teardown' );

	var Component = (function (Item) {
		function Component ( options, ComponentConstructor ) {
			var this$1 = this;

			Item.call( this, options );
			this.type = COMPONENT; // override ELEMENT from super

			var instance = create( ComponentConstructor.prototype );

			this.instance = instance;
			this.name = options.template.e;
			this.parentFragment = options.parentFragment;

			this.liveQueries = [];

			if ( instance.el ) {
				warnIfDebug( ("The <" + (this.name) + "> component has a default 'el' property; it has been disregarded") );
			}

			var partials = options.template.p || {};
			if ( !( 'content' in partials ) ) partials.content = options.template.f || [];
			this._partials = partials; // TEMP

			this.yielders = {};

			// find container
			var fragment = options.parentFragment;
			var container;
			while ( fragment ) {
				if ( fragment.owner.type === YIELDER ) {
					container = fragment.owner.container;
					break;
				}

				fragment = fragment.parent;
			}

			// add component-instance-specific properties
			instance.parent = this.parentFragment.ractive;
			instance.container = container || null;
			instance.root = instance.parent.root;
			instance.component = this;

			construct( this.instance, { partials: partials });

			// for hackability, this could be an open option
			// for any ractive instance, but for now, just
			// for components and just for ractive...
			instance._inlinePartials = partials;

			this.attributeByName = {};

			this.attributes = [];
			var leftovers = [];
			( this.template.m || [] ).forEach( function ( template ) {
				switch ( template.t ) {
					case ATTRIBUTE:
					case EVENT:
					case TRANSITION:
						this$1.attributes.push( createItem({
							owner: this$1,
							parentFragment: this$1.parentFragment,
							template: template
						}) );
						break;

					case BINDING_FLAG:
					case DECORATOR:
						break;

					default:
						leftovers.push( template );
						break;
				}
			});

			this.attributes.push( new ConditionalAttribute({
				owner: this,
				parentFragment: this.parentFragment,
				template: leftovers
			}) );

			this.eventHandlers = [];
			if ( this.template.v ) this.setupEvents();
		}

		Component.prototype = Object.create( Item && Item.prototype );
		Component.prototype.constructor = Component;

		Component.prototype.bind = function bind$1$$ () {
			this.attributes.forEach( bind$1 );

			initialise( this.instance, {
				partials: this._partials
			}, {
				cssIds: this.parentFragment.cssIds
			});

			this.eventHandlers.forEach( bind$1 );

			this.bound = true;
		};

		Component.prototype.bubble = function bubble () {
			if ( !this.dirty ) {
				this.dirty = true;
				this.parentFragment.bubble();
			}
		};

		Component.prototype.checkYielders = function checkYielders () {
			var this$1 = this;

			Object.keys( this.yielders ).forEach( function ( name ) {
				if ( this$1.yielders[ name ].length > 1 ) {
					runloop.end();
					throw new Error( ("A component template can only have one {{yield" + (name ? ' ' + name : '') + "}} declaration at a time") );
				}
			});
		};

		Component.prototype.destroyed = function destroyed () {
			if ( this.instance.fragment ) this.instance.fragment.destroyed();
		};

		Component.prototype.detach = function detach () {
			return this.instance.fragment.detach();
		};

		Component.prototype.find = function find ( selector ) {
			return this.instance.fragment.find( selector );
		};

		Component.prototype.findAll = function findAll ( selector, query ) {
			this.instance.fragment.findAll( selector, query );
		};

		Component.prototype.findComponent = function findComponent ( name ) {
			if ( !name || this.name === name ) return this.instance;

			if ( this.instance.fragment ) {
				return this.instance.fragment.findComponent( name );
			}
		};

		Component.prototype.findAllComponents = function findAllComponents ( name, query ) {
			if ( query.test( this ) ) {
				query.add( this.instance );

				if ( query.live ) {
					this.liveQueries.push( query );
				}
			}

			this.instance.fragment.findAllComponents( name, query );
		};

		Component.prototype.firstNode = function firstNode ( skipParent ) {
			return this.instance.fragment.firstNode( skipParent );
		};

		Component.prototype.render = function render$1$$ ( target, occupants ) {
			render$1( this.instance, target, null, occupants );

			this.checkYielders();
			this.attributes.forEach( render );
			this.eventHandlers.forEach( render );
			updateLiveQueries( this );

			this.rendered = true;
		};

		Component.prototype.setupEvents = function setupEvents () {
			var this$1 = this;

			var handlers = this.eventHandlers;

			Object.keys( this.template.v ).forEach( function ( key ) {
				var eventNames = key.split( '-' );
				var template = this$1.template.v[ key ];

				eventNames.forEach( function ( eventName ) {
					var event = new RactiveEvent( this$1.instance, eventName );
					handlers.push( new EventDirective( this$1, event, template ) );
				});
			});
		};

		Component.prototype.shuffled = function shuffled () {
			this.liveQueries.forEach( makeDirty );
			Item.prototype.shuffled.call(this);
		};

		Component.prototype.toString = function toString () {
			return this.instance.toHTML();
		};

		Component.prototype.unbind = function unbind$1 () {
			this.bound = false;

			this.attributes.forEach( unbind );

			var instance = this.instance;
			instance.viewmodel.teardown();
			instance.fragment.unbind();
			instance._observers.forEach( cancel );

			removeFromLiveComponentQueries( this );

			if ( instance.el && instance.el.__ractive_instances__ ) {
				removeFromArray( instance.el.__ractive_instances__, instance );
			}

			teardownHook.fire( instance );
		};

		Component.prototype.unrender = function unrender$1 ( shouldDestroy ) {
			var this$1 = this;

			this.rendered = false;

			this.shouldDestroy = shouldDestroy;
			this.instance.unrender();
			this.attributes.forEach( unrender );
			this.eventHandlers.forEach( unrender );
			this.liveQueries.forEach( function ( query ) { return query.remove( this$1.instance ); } );
		};

		Component.prototype.update = function update$1 () {
			this.dirty = false;
			this.instance.fragment.update();
			this.checkYielders();
			this.attributes.forEach( update );
			this.eventHandlers.forEach( update );
		};

		return Component;
	}(Item));

	var missingDecorator = {
		update: noop,
		teardown: noop
	};

	var Decorator = function Decorator ( options ) {
		this.owner = options.owner || options.parentFragment.owner || findElement( options.parentFragment );
		this.element = this.owner.attributeByName ? this.owner : findElement( options.parentFragment );
		this.parentFragment = this.owner.parentFragment;
		this.ractive = this.owner.ractive;
		var template = this.template = options.template;

		this.dynamicName = typeof template.f.n === 'object';
		this.dynamicArgs = !!template.f.d;

		if ( this.dynamicName ) {
			this.nameFragment = new Fragment({
				owner: this,
				template: template.f.n
			});
		} else {
			this.name = template.f.n || template.f;
		}

		if ( this.dynamicArgs ) {
			this.argsFragment = new Fragment({
				owner: this,
				template: template.f.d
			});
		} else {
			if ( template.f.a && template.f.a.s ) {
				this.args = [];
			} else {
				this.args = template.f.a || [];
			}
		}

		this.node = null;
		this.intermediary = null;

		this.element.decorators.push( this );
	};

	Decorator.prototype.bind = function bind () {
		var this$1 = this;

			if ( this.dynamicName ) {
			this.nameFragment.bind();
			this.name = this.nameFragment.toString();
		}

		if ( this.dynamicArgs ) this.argsFragment.bind();

		// TODO: dry this up once deprecation is done
		if ( this.template.f.a && this.template.f.a.s ) {
			this.resolvers = [];
			this.models = this.template.f.a.r.map( function ( ref, i ) {
				var resolver;
				var model = resolveReference( this$1.parentFragment, ref );
				if ( !model ) {
					resolver = this$1.parentFragment.resolve( ref, function ( model ) {
						this$1.models[i] = model;
						removeFromArray( this$1.resolvers, resolver );
						model.register( this$1 );
					});

					this$1.resolvers.push( resolver );
				} else model.register( this$1 );

				return model;
			});
			this.argsFn = getFunction( this.template.f.a.s, this.template.f.a.r.length );
		}
	};

	Decorator.prototype.bubble = function bubble () {
		if ( !this.dirty ) {
			this.dirty = true;
			this.owner.bubble();
		}
	};

	Decorator.prototype.destroyed = function destroyed () {
		if ( this.intermediary ) this.intermediary.teardown();
		this.shouldDestroy = true;
	};

	Decorator.prototype.handleChange = function handleChange () { this.bubble(); };

	Decorator.prototype.rebinding = function rebinding ( next, previous, safe ) {
		var idx = this.models.indexOf( previous );
		if ( !~idx ) return;

		next = rebindMatch( this.template.f.a.r[ idx ], next, previous );
		if ( next === previous ) return;

		previous.unregister( this );
		this.models.splice( idx, 1, next );
		if ( next ) next.addShuffleRegister( this, 'mark' );

		if ( !safe ) this.bubble();
	};

	Decorator.prototype.render = function render () {
		var this$1 = this;

			runloop.scheduleTask( function () {
			var fn = findInViewHierarchy( 'decorators', this$1.ractive, this$1.name );

			if ( !fn ) {
				warnOnce( missingPlugin( this$1.name, 'decorator' ) );
				this$1.intermediary = missingDecorator;
				return;
			}

			this$1.node = this$1.element.node;

			var args;
			if ( this$1.argsFn ) {
				args = this$1.models.map( function ( model ) {
					if ( !model ) return undefined;

					return model.get();
				});
				args = this$1.argsFn.apply( this$1.ractive, args );
			} else {
				args = this$1.dynamicArgs ? this$1.argsFragment.getArgsList() : this$1.args;
			}

			this$1.intermediary = fn.apply( this$1.ractive, [ this$1.node ].concat( args ) );

			if ( !this$1.intermediary || !this$1.intermediary.teardown ) {
				throw new Error( ("The '" + (this$1.name) + "' decorator must return an object with a teardown method") );
			}

			// watch out for decorators that cause their host element to be unrendered
			if ( this$1.shouldDestroy ) this$1.destroyed();
		}, true );
		this.rendered = true;
	};

	Decorator.prototype.toString = function toString () { return ''; };

	Decorator.prototype.unbind = function unbind$1 () {
		var this$1 = this;

			if ( this.dynamicName ) this.nameFragment.unbind();
		if ( this.dynamicArgs ) this.argsFragment.unbind();
		if ( this.resolvers ) this.resolvers.forEach( unbind );
		if ( this.models ) this.models.forEach( function ( m ) {
			if ( m ) m.unregister( this$1 );
		});
	};

	Decorator.prototype.unrender = function unrender ( shouldDestroy ) {
		if ( ( !shouldDestroy || this.element.rendered ) && this.intermediary ) this.intermediary.teardown();
		this.rendered = false;
	};

	Decorator.prototype.update = function update () {
		if ( !this.dirty ) return;

		this.dirty = false;

		var nameChanged = false;

		if ( this.dynamicName && this.nameFragment.dirty ) {
			var name = this.nameFragment.toString();
			nameChanged = name !== this.name;
			this.name = name;
		}

		if ( this.intermediary ) {
			if ( nameChanged || !this.intermediary.update ) {
				this.unrender();
				this.render();
			}
			else {
				if ( this.dynamicArgs ) {
					if ( this.argsFragment.dirty ) {
						var args = this.argsFragment.getArgsList();
						this.intermediary.update.apply( this.ractive, args );
					}
				}
				else if ( this.argsFn ) {
					var args$1 = this.models.map( function ( model ) {
						if ( !model ) return undefined;

						return model.get();
					});
					this.intermediary.update.apply( this.ractive, this.argsFn.apply( this.ractive, args$1 ) );
				}
				else {
					this.intermediary.update.apply( this.ractive, this.args );
				}
			}
		}

		// need to run these for unrender/render cases
		// so can't just be in conditional if above

		if ( this.dynamicName && this.nameFragment.dirty ) {
			this.nameFragment.update();
		}

		if ( this.dynamicArgs && this.argsFragment.dirty ) {
			this.argsFragment.update();
		}
	};

	var Doctype = (function (Item) {
		function Doctype () {
			Item.apply(this, arguments);
		}

		Doctype.prototype = Object.create( Item && Item.prototype );
		Doctype.prototype.constructor = Doctype;

		Doctype.prototype.bind = function bind () {
			// noop
		};

		Doctype.prototype.render = function render () {
			// noop
		};

		Doctype.prototype.teardown = function teardown () {
			// noop
		};

		Doctype.prototype.toString = function toString () {
			return '<!DOCTYPE' + this.template.a + '>';
		};

		Doctype.prototype.unbind = function unbind () {
			// noop
		};

		Doctype.prototype.unrender = function unrender () {
			// noop
		};

		Doctype.prototype.update = function update () {
			// noop
		};

		return Doctype;
	}(Item));

	function updateLiveQueries$1 ( element ) {
		// Does this need to be added to any live queries?
		var node = element.node;
		var instance = element.ractive;

		do {
			var liveQueries = instance._liveQueries;

			var i = liveQueries.length;
			while ( i-- ) {
				var selector = liveQueries[i];
				var query = liveQueries[ ("_" + selector) ];

				if ( query.test( node ) ) {
					query.add( node );
					// keep register of applicable selectors, for when we teardown
					element.liveQueries.push( query );
				}
			}
		} while ( instance = instance.parent );
	}

	function warnAboutAmbiguity ( description, ractive ) {
		warnOnceIfDebug( ("The " + description + " being used for two-way binding is ambiguous, and may cause unexpected results. Consider initialising your data to eliminate the ambiguity"), { ractive: ractive });
	}

	var Binding = function Binding ( element, name ) {
		if ( name === void 0 ) name = 'value';

			this.element = element;
		this.ractive = element.ractive;
		this.attribute = element.attributeByName[ name ];

		var interpolator = this.attribute.interpolator;
		interpolator.twowayBinding = this;

		var model = interpolator.model;

		// not bound?
		if ( !model ) {
			// try to force resolution
			interpolator.resolver.forceResolution();
			model = interpolator.model;

			warnAboutAmbiguity( ("'" + (interpolator.template.r) + "' reference"), this.ractive );
			}

			else if ( model.isUnresolved ) {
				// reference expressions (e.g. foo[bar])
				model.forceResolution();
				warnAboutAmbiguity( 'expression', this.ractive );
		}

		// TODO include index/key/keypath refs as read-only
		else if ( model.isReadonly ) {
			var keypath = model.getKeypath().replace( /^@/, '' );
			warnOnceIfDebug( ("Cannot use two-way binding on <" + (element.name) + "> element: " + keypath + " is read-only. To suppress this warning use <" + (element.name) + " twoway='false'...>"), { ractive: this.ractive });
			return false;
		}

		this.attribute.isTwoway = true;
		this.model = model;

		// initialise value, if it's undefined
		var value = model.get();
		this.wasUndefined = value === undefined;

		if ( value === undefined && this.getInitialValue ) {
			value = this.getInitialValue();
			model.set( value );
		}
		this.lastVal( true, value );

		var parentForm = findElement( this.element, false, 'form' );
		if ( parentForm ) {
			this.resetValue = value;
			parentForm.formBindings.push( this );
		}
	};

	Binding.prototype.bind = function bind () {
		this.model.registerTwowayBinding( this );
	};

	Binding.prototype.handleChange = function handleChange () {
		var this$1 = this;

			var value = this.getValue();
		if ( this.lastVal() === value ) return;

		runloop.start( this.root );
		this.attribute.locked = true;
		this.model.set( value );
		this.lastVal( true, value );

		// if the value changes before observers fire, unlock to be updatable cause something weird and potentially freezy is up
		if ( this.model.get() !== value ) this.attribute.locked = false;
		else runloop.scheduleTask( function () { return this$1.attribute.locked = false; } );

		runloop.end();
	};

	Binding.prototype.lastVal = function lastVal ( setting, value ) {
		if ( setting ) this.lastValue = value;
		else return this.lastValue;
	};

	Binding.prototype.rebinding = function rebinding ( next, previous ) {
		var this$1 = this;

			if ( this.model && this.model === previous ) previous.unregisterTwowayBinding( this );
		if ( next ) {
			this.model = next;
			runloop.scheduleTask( function () { return next.registerTwowayBinding( this$1 ); } );
		}
	};

	Binding.prototype.render = function render () {
		this.node = this.element.node;
		this.node._ractive.binding = this;
		this.rendered = true; // TODO is this used anywhere?
	};

		Binding.prototype.setFromNode = function setFromNode ( node ) {
			this.model.set( node.value );
	};

	Binding.prototype.unbind = function unbind () {
		this.model.unregisterTwowayBinding( this );
	};

	Binding.prototype.unrender = function unrender () {
			// noop?
		};

	// This is the handler for DOM events that would lead to a change in the model
	// (i.e. change, sometimes, input, and occasionally click and keyup)
	function handleDomEvent () {
		this._ractive.binding.handleChange();
	}

	var CheckboxBinding = (function (Binding) {
		function CheckboxBinding ( element ) {
			Binding.call( this, element, 'checked' );
		}

		CheckboxBinding.prototype = Object.create( Binding && Binding.prototype );
		CheckboxBinding.prototype.constructor = CheckboxBinding;

		CheckboxBinding.prototype.render = function render () {
			Binding.prototype.render.call(this);

			this.node.addEventListener( 'change', handleDomEvent, false );

			if ( this.node.attachEvent ) {
				this.node.addEventListener( 'click', handleDomEvent, false );
			}
		};

		CheckboxBinding.prototype.unrender = function unrender () {
			this.node.removeEventListener( 'change', handleDomEvent, false );
			this.node.removeEventListener( 'click', handleDomEvent, false );
		};

		CheckboxBinding.prototype.getInitialValue = function getInitialValue () {
			return !!this.element.getAttribute( 'checked' );
		};

		CheckboxBinding.prototype.getValue = function getValue () {
			return this.node.checked;
		};

		CheckboxBinding.prototype.setFromNode = function setFromNode ( node ) {
			this.model.set( node.checked );
		};

		return CheckboxBinding;
	}(Binding));

	function getBindingGroup ( group, model, getValue ) {
		var hash = "" + group + "-bindingGroup";
		return model[hash] || ( model[ hash ] = new BindingGroup( hash, model, getValue ) );
	}

	var BindingGroup = function BindingGroup ( hash, model, getValue ) {
		var this$1 = this;

			this.model = model;
		this.hash = hash;
		this.getValue = function () {
			this$1.value = getValue.call(this$1);
			return this$1.value;
		};

		this.bindings = [];
	};

	BindingGroup.prototype.add = function add ( binding ) {
		this.bindings.push( binding );
	};

	BindingGroup.prototype.bind = function bind () {
		this.value = this.model.get();
		this.model.registerTwowayBinding( this );
		this.bound = true;
	};

		BindingGroup.prototype.remove = function remove ( binding ) {
		removeFromArray( this.bindings, binding );
		if ( !this.bindings.length ) {
			this.unbind();
		}
	};

	BindingGroup.prototype.unbind = function unbind () {
		this.model.unregisterTwowayBinding( this );
		this.bound = false;
		delete this.model[this.hash];
	};

	BindingGroup.prototype.rebinding = Binding.prototype.rebinding;

	var push$2 = [].push;

	function getValue() {
		var all = this.bindings.filter(function ( b ) { return b.node && b.node.checked; }).map(function ( b ) { return b.element.getAttribute( 'value' ); });
		var res = [];
		all.forEach(function ( v ) { if ( !arrayContains( res, v ) ) res.push( v ); });
		return res;
	}

	var CheckboxNameBinding = (function (Binding) {
		function CheckboxNameBinding ( element ) {
			Binding.call( this, element, 'name' );

			this.checkboxName = true; // so that ractive.updateModel() knows what to do with this

			// Each input has a reference to an array containing it and its
			// group, as two-way binding depends on being able to ascertain
			// the status of all inputs within the group
			this.group = getBindingGroup( 'checkboxes', this.model, getValue );
			this.group.add( this );

			if ( this.noInitialValue ) {
				this.group.noInitialValue = true;
			}

			// If no initial value was set, and this input is checked, we
			// update the model
			if ( this.group.noInitialValue && this.element.getAttribute( 'checked' ) ) {
				var existingValue = this.model.get();
				var bindingValue = this.element.getAttribute( 'value' );

				if ( !arrayContains( existingValue, bindingValue ) ) {
					push$2.call( existingValue, bindingValue ); // to avoid triggering runloop with array adaptor
				}
			}
		}

		CheckboxNameBinding.prototype = Object.create( Binding && Binding.prototype );
		CheckboxNameBinding.prototype.constructor = CheckboxNameBinding;

		CheckboxNameBinding.prototype.bind = function bind () {
			if ( !this.group.bound ) {
				this.group.bind();
			}
		};

		CheckboxNameBinding.prototype.changed = function changed () {
			var wasChecked = !!this.isChecked;
			this.isChecked = this.node.checked;
			return this.isChecked === wasChecked;
		};

		CheckboxNameBinding.prototype.getInitialValue = function getInitialValue () {
			// This only gets called once per group (of inputs that
			// share a name), because it only gets called if there
			// isn't an initial value. By the same token, we can make
			// a note of that fact that there was no initial value,
			// and populate it using any `checked` attributes that
			// exist (which users should avoid, but which we should
			// support anyway to avoid breaking expectations)
			this.noInitialValue = true; // TODO are noInitialValue and wasUndefined the same thing?
			return [];
		};

		CheckboxNameBinding.prototype.getValue = function getValue$1 () {
			return this.group.value;
		};

		CheckboxNameBinding.prototype.handleChange = function handleChange () {
			this.isChecked = this.element.node.checked;
			this.group.value = this.model.get();
			var value = this.element.getAttribute( 'value' );
			if ( this.isChecked && !arrayContains( this.group.value, value ) ) {
				this.group.value.push( value );
			} else if ( !this.isChecked && arrayContains( this.group.value, value ) ) {
				removeFromArray( this.group.value, value );
			}
			// make sure super knows there's a change
			this.lastValue = null;
			Binding.prototype.handleChange.call(this);
		};

		CheckboxNameBinding.prototype.render = function render () {
			Binding.prototype.render.call(this);

			var node = this.node;

			var existingValue = this.model.get();
			var bindingValue = this.element.getAttribute( 'value' );

			if ( isArray( existingValue ) ) {
				this.isChecked = arrayContains( existingValue, bindingValue );
			} else {
				this.isChecked = existingValue == bindingValue;
			}

			node.name = '{{' + this.model.getKeypath() + '}}';
			node.checked = this.isChecked;

			node.addEventListener( 'change', handleDomEvent, false );

			// in case of IE emergency, bind to click event as well
			if ( node.attachEvent ) {
				node.addEventListener( 'click', handleDomEvent, false );
			}
		};

		CheckboxNameBinding.prototype.setFromNode = function setFromNode ( node ) {
			this.group.bindings.forEach( function ( binding ) { return binding.wasUndefined = true; } );

			if ( node.checked ) {
				var valueSoFar = this.group.getValue();
				valueSoFar.push( this.element.getAttribute( 'value' ) );

				this.group.model.set( valueSoFar );
			}
		};

		CheckboxNameBinding.prototype.unbind = function unbind () {
			this.group.remove( this );
		};

		CheckboxNameBinding.prototype.unrender = function unrender () {
			var node = this.element.node;

			node.removeEventListener( 'change', handleDomEvent, false );
			node.removeEventListener( 'click', handleDomEvent, false );
		};

		return CheckboxNameBinding;
	}(Binding));

	var ContentEditableBinding = (function (Binding) {
		function ContentEditableBinding () {
			Binding.apply(this, arguments);
		}

		ContentEditableBinding.prototype = Object.create( Binding && Binding.prototype );
		ContentEditableBinding.prototype.constructor = ContentEditableBinding;

		ContentEditableBinding.prototype.getInitialValue = function getInitialValue () {
			return this.element.fragment ? this.element.fragment.toString() : '';
		};

		ContentEditableBinding.prototype.getValue = function getValue () {
			return this.element.node.innerHTML;
		};

		ContentEditableBinding.prototype.render = function render () {
			Binding.prototype.render.call(this);

			var node = this.node;

			node.addEventListener( 'change', handleDomEvent, false );
			node.addEventListener( 'blur', handleDomEvent, false );

			if ( !this.ractive.lazy ) {
				node.addEventListener( 'input', handleDomEvent, false );

				if ( node.attachEvent ) {
					node.addEventListener( 'keyup', handleDomEvent, false );
				}
			}
		};

		ContentEditableBinding.prototype.setFromNode = function setFromNode ( node ) {
			this.model.set( node.innerHTML );
		};

		ContentEditableBinding.prototype.unrender = function unrender () {
			var node = this.node;

			node.removeEventListener( 'blur', handleDomEvent, false );
			node.removeEventListener( 'change', handleDomEvent, false );
			node.removeEventListener( 'input', handleDomEvent, false );
			node.removeEventListener( 'keyup', handleDomEvent, false );
		};

		return ContentEditableBinding;
	}(Binding));

	function handleBlur () {
		handleDomEvent.call( this );

		var value = this._ractive.binding.model.get();
		this.value = value == undefined ? '' : value;
	}

	function handleDelay ( delay ) {
		var timeout;

		return function () {
			var this$1 = this;

			if ( timeout ) clearTimeout( timeout );

			timeout = setTimeout( function () {
				var binding = this$1._ractive.binding;
				if ( binding.rendered ) handleDomEvent.call( this$1 );
				timeout = null;
			}, delay );
		};
	}

	var GenericBinding = (function (Binding) {
		function GenericBinding () {
			Binding.apply(this, arguments);
		}

		GenericBinding.prototype = Object.create( Binding && Binding.prototype );
		GenericBinding.prototype.constructor = GenericBinding;

		GenericBinding.prototype.getInitialValue = function getInitialValue () {
			return '';
		};

		GenericBinding.prototype.getValue = function getValue () {
			return this.node.value;
		};

		GenericBinding.prototype.render = function render () {
			Binding.prototype.render.call(this);

			// any lazy setting for this element overrides the root
			// if the value is a number, it's a timeout
			var lazy = this.ractive.lazy;
			var timeout = false;

			if ( 'lazy' in this.element ) {
				lazy = this.element.lazy;
			}

			if ( isNumeric( lazy ) ) {
				timeout = +lazy;
				lazy = false;
			}

			this.handler = timeout ? handleDelay( timeout ) : handleDomEvent;

			var node = this.node;

			node.addEventListener( 'change', handleDomEvent, false );

			if ( !lazy ) {
				node.addEventListener( 'input', this.handler, false );

				if ( node.attachEvent ) {
					node.addEventListener( 'keyup', this.handler, false );
				}
			}

			node.addEventListener( 'blur', handleBlur, false );
		};

		GenericBinding.prototype.unrender = function unrender () {
			var node = this.element.node;
			this.rendered = false;

			node.removeEventListener( 'change', handleDomEvent, false );
			node.removeEventListener( 'input', this.handler, false );
			node.removeEventListener( 'keyup', this.handler, false );
			node.removeEventListener( 'blur', handleBlur, false );
		};

		return GenericBinding;
	}(Binding));

	var FileBinding = (function (GenericBinding) {
		function FileBinding () {
			GenericBinding.apply(this, arguments);
		}

		FileBinding.prototype = Object.create( GenericBinding && GenericBinding.prototype );
		FileBinding.prototype.constructor = FileBinding;

		FileBinding.prototype.getInitialValue = function getInitialValue () {
			return undefined;
		};

		FileBinding.prototype.getValue = function getValue () {
			return this.node.files;
		};

		FileBinding.prototype.render = function render () {
			this.element.lazy = false;
			GenericBinding.prototype.render.call(this);
		};

		FileBinding.prototype.setFromNode = function setFromNode( node ) {
			this.model.set( node.files );
		};

		return FileBinding;
	}(GenericBinding));

	function getSelectedOptions ( select ) {
	    return select.selectedOptions
			? toArray( select.selectedOptions )
			: select.options
				? toArray( select.options ).filter( function ( option ) { return option.selected; } )
				: [];
	}

	var MultipleSelectBinding = (function (Binding) {
		function MultipleSelectBinding () {
			Binding.apply(this, arguments);
		}

		MultipleSelectBinding.prototype = Object.create( Binding && Binding.prototype );
		MultipleSelectBinding.prototype.constructor = MultipleSelectBinding;

		MultipleSelectBinding.prototype.forceUpdate = function forceUpdate () {
			var this$1 = this;

			var value = this.getValue();

			if ( value !== undefined ) {
				this.attribute.locked = true;
				runloop.scheduleTask( function () { return this$1.attribute.locked = false; } );
				this.model.set( value );
			}
		};

		MultipleSelectBinding.prototype.getInitialValue = function getInitialValue () {
			return this.element.options
				.filter( function ( option ) { return option.getAttribute( 'selected' ); } )
				.map( function ( option ) { return option.getAttribute( 'value' ); } );
		};

		MultipleSelectBinding.prototype.getValue = function getValue () {
			var options = this.element.node.options;
			var len = options.length;

			var selectedValues = [];

			for ( var i = 0; i < len; i += 1 ) {
				var option = options[i];

				if ( option.selected ) {
					var optionValue = option._ractive ? option._ractive.value : option.value;
					selectedValues.push( optionValue );
				}
			}

			return selectedValues;
		};

		MultipleSelectBinding.prototype.handleChange = function handleChange () {
			var attribute = this.attribute;
			var previousValue = attribute.getValue();

			var value = this.getValue();

			if ( previousValue === undefined || !arrayContentsMatch( value, previousValue ) ) {
				Binding.prototype.handleChange.call(this);
			}

			return this;
		};

		MultipleSelectBinding.prototype.render = function render () {
			Binding.prototype.render.call(this);

			this.node.addEventListener( 'change', handleDomEvent, false );

			if ( this.model.get() === undefined ) {
				// get value from DOM, if possible
				this.handleChange();
			}
		};

		MultipleSelectBinding.prototype.setFromNode = function setFromNode ( node ) {
			var selectedOptions = getSelectedOptions( node );
			var i = selectedOptions.length;
			var result = new Array( i );

			while ( i-- ) {
				var option = selectedOptions[i];
				result[i] = option._ractive ? option._ractive.value : option.value;
			}

			this.model.set( result );
		};

		MultipleSelectBinding.prototype.setValue = function setValue () {
			throw new Error( 'TODO not implemented yet' );
		};

		MultipleSelectBinding.prototype.unrender = function unrender () {
			this.node.removeEventListener( 'change', handleDomEvent, false );
		};

		MultipleSelectBinding.prototype.updateModel = function updateModel () {
			if ( this.attribute.value === undefined || !this.attribute.value.length ) {
				this.keypath.set( this.initialValue );
			}
		};

		return MultipleSelectBinding;
	}(Binding));

	var NumericBinding = (function (GenericBinding) {
		function NumericBinding () {
			GenericBinding.apply(this, arguments);
		}

		NumericBinding.prototype = Object.create( GenericBinding && GenericBinding.prototype );
		NumericBinding.prototype.constructor = NumericBinding;

		NumericBinding.prototype.getInitialValue = function getInitialValue () {
			return undefined;
		};

		NumericBinding.prototype.getValue = function getValue () {
			var value = parseFloat( this.node.value );
			return isNaN( value ) ? undefined : value;
		};

		NumericBinding.prototype.setFromNode = function setFromNode( node ) {
			var value = parseFloat( node.value );
			if ( !isNaN( value ) ) this.model.set( value );
		};

		return NumericBinding;
	}(GenericBinding));

	var siblings = {};

	function getSiblings ( hash ) {
		return siblings[ hash ] || ( siblings[ hash ] = [] );
	}

	var RadioBinding = (function (Binding) {
		function RadioBinding ( element ) {
			Binding.call( this, element, 'checked' );

			this.siblings = getSiblings( this.ractive._guid + this.element.getAttribute( 'name' ) );
			this.siblings.push( this );
		}

		RadioBinding.prototype = Object.create( Binding && Binding.prototype );
		RadioBinding.prototype.constructor = RadioBinding;

		RadioBinding.prototype.getValue = function getValue () {
			return this.node.checked;
		};

		RadioBinding.prototype.handleChange = function handleChange () {
			runloop.start( this.root );

			this.siblings.forEach( function ( binding ) {
				binding.model.set( binding.getValue() );
			});

			runloop.end();
		};

		RadioBinding.prototype.render = function render () {
			Binding.prototype.render.call(this);

			this.node.addEventListener( 'change', handleDomEvent, false );

			if ( this.node.attachEvent ) {
				this.node.addEventListener( 'click', handleDomEvent, false );
			}
		};

		RadioBinding.prototype.setFromNode = function setFromNode ( node ) {
			this.model.set( node.checked );
		};

		RadioBinding.prototype.unbind = function unbind () {
			removeFromArray( this.siblings, this );
		};

		RadioBinding.prototype.unrender = function unrender () {
			this.node.removeEventListener( 'change', handleDomEvent, false );
			this.node.removeEventListener( 'click', handleDomEvent, false );
		};

		return RadioBinding;
	}(Binding));

	function getValue$1() {
		var checked = this.bindings.filter( function ( b ) { return b.node.checked; } );
		if ( checked.length > 0 ) {
			return checked[0].element.getAttribute( 'value' );
		}
	}

	var RadioNameBinding = (function (Binding) {
		function RadioNameBinding ( element ) {
			Binding.call( this, element, 'name' );

			this.group = getBindingGroup( 'radioname', this.model, getValue$1 );
			this.group.add( this );

			if ( element.checked ) {
				this.group.value = this.getValue();
			}
		}

		RadioNameBinding.prototype = Object.create( Binding && Binding.prototype );
		RadioNameBinding.prototype.constructor = RadioNameBinding;

		RadioNameBinding.prototype.bind = function bind () {
			var this$1 = this;

			if ( !this.group.bound ) {
				this.group.bind();
			}

			// update name keypath when necessary
			this.nameAttributeBinding = {
				handleChange: function () { return this$1.node.name = "{{" + (this$1.model.getKeypath()) + "}}"; },
				rebinding: noop
			};

			this.model.getKeypathModel().register( this.nameAttributeBinding );
		};

		RadioNameBinding.prototype.getInitialValue = function getInitialValue () {
			if ( this.element.getAttribute( 'checked' ) ) {
				return this.element.getAttribute( 'value' );
			}
		};

		RadioNameBinding.prototype.getValue = function getValue$1 () {
			return this.element.getAttribute( 'value' );
		};

		RadioNameBinding.prototype.handleChange = function handleChange () {
			// If this <input> is the one that's checked, then the value of its
			// `name` model gets set to its value
			if ( this.node.checked ) {
				this.group.value = this.getValue();
				Binding.prototype.handleChange.call(this);
			}
		};

		RadioNameBinding.prototype.lastVal = function lastVal ( setting, value ) {
			if ( !this.group ) return;
			if ( setting ) this.group.lastValue = value;
			else return this.group.lastValue;
		};

		RadioNameBinding.prototype.render = function render () {
			Binding.prototype.render.call(this);

			var node = this.node;

			node.name = "{{" + (this.model.getKeypath()) + "}}";
			node.checked = this.model.get() == this.element.getAttribute( 'value' );

			node.addEventListener( 'change', handleDomEvent, false );

			if ( node.attachEvent ) {
				node.addEventListener( 'click', handleDomEvent, false );
			}
		};

		RadioNameBinding.prototype.setFromNode = function setFromNode ( node ) {
			if ( node.checked ) {
				this.group.model.set( this.element.getAttribute( 'value' ) );
			}
		};

		RadioNameBinding.prototype.unbind = function unbind () {
			this.group.remove( this );

			this.model.getKeypathModel().unregister( this.nameAttributeBinding );
		};

		RadioNameBinding.prototype.unrender = function unrender () {
			var node = this.node;

			node.removeEventListener( 'change', handleDomEvent, false );
			node.removeEventListener( 'click', handleDomEvent, false );
		};

		return RadioNameBinding;
	}(Binding));

	var SingleSelectBinding = (function (Binding) {
		function SingleSelectBinding () {
			Binding.apply(this, arguments);
		}

		SingleSelectBinding.prototype = Object.create( Binding && Binding.prototype );
		SingleSelectBinding.prototype.constructor = SingleSelectBinding;

		SingleSelectBinding.prototype.forceUpdate = function forceUpdate () {
			var this$1 = this;

			var value = this.getValue();

			if ( value !== undefined ) {
				this.attribute.locked = true;
				runloop.scheduleTask( function () { return this$1.attribute.locked = false; } );
				this.model.set( value );
			}
		};

		SingleSelectBinding.prototype.getInitialValue = function getInitialValue () {
			if ( this.element.getAttribute( 'value' ) !== undefined ) {
				return;
			}

			var options = this.element.options;
			var len = options.length;

			if ( !len ) return;

			var value;
			var optionWasSelected;
			var i = len;

			// take the final selected option...
			while ( i-- ) {
				var option = options[i];

				if ( option.getAttribute( 'selected' ) ) {
					if ( !option.getAttribute( 'disabled' ) ) {
						value = option.getAttribute( 'value' );
					}

					optionWasSelected = true;
					break;
				}
			}

			// or the first non-disabled option, if none are selected
			if ( !optionWasSelected ) {
				while ( ++i < len ) {
					if ( !options[i].getAttribute( 'disabled' ) ) {
						value = options[i].getAttribute( 'value' );
						break;
					}
				}
			}

			// This is an optimisation (aka hack) that allows us to forgo some
			// other more expensive work
			// TODO does it still work? seems at odds with new architecture
			if ( value !== undefined ) {
				this.element.attributeByName.value.value = value;
			}

			return value;
		};

		SingleSelectBinding.prototype.getValue = function getValue () {
			var options = this.node.options;
			var len = options.length;

			var i;
			for ( i = 0; i < len; i += 1 ) {
				var option = options[i];

				if ( options[i].selected && !options[i].disabled ) {
					return option._ractive ? option._ractive.value : option.value;
				}
			}
		};

		SingleSelectBinding.prototype.render = function render () {
			Binding.prototype.render.call(this);
			this.node.addEventListener( 'change', handleDomEvent, false );
		};

		SingleSelectBinding.prototype.setFromNode = function setFromNode ( node ) {
			var option = getSelectedOptions( node )[0];
			this.model.set( option._ractive ? option._ractive.value : option.value );
		};

		// TODO this method is an anomaly... is it necessary?
		SingleSelectBinding.prototype.setValue = function setValue ( value ) {
			this.model.set( value );
		};

		SingleSelectBinding.prototype.unrender = function unrender () {
			this.node.removeEventListener( 'change', handleDomEvent, false );
		};

		return SingleSelectBinding;
	}(Binding));

	function isBindable ( attribute ) {
		return attribute &&
			   attribute.template.f &&
		       attribute.template.f.length === 1 &&
		       attribute.template.f[0].t === INTERPOLATOR &&
		       !attribute.template.f[0].s;
	}

	function selectBinding ( element ) {
		var attributes = element.attributeByName;

		// contenteditable - bind if the contenteditable attribute is true
		// or is bindable and may thus become true...
		if ( element.getAttribute( 'contenteditable' ) || isBindable( attributes.contenteditable ) ) {
			// ...and this element also has a value attribute to bind
			return isBindable( attributes.value ) ? ContentEditableBinding : null;
		}

		// <input>
		if ( element.name === 'input' ) {
			var type = element.getAttribute( 'type' );

			if ( type === 'radio' || type === 'checkbox' ) {
				var bindName = isBindable( attributes.name );
				var bindChecked = isBindable( attributes.checked );

				// for radios we can either bind the name attribute, or the checked attribute - not both
				if ( bindName && bindChecked ) {
					if ( type === 'radio' ) {
						warnIfDebug( 'A radio input can have two-way binding on its name attribute, or its checked attribute - not both', { ractive: element.root });
					} else {
						// A checkbox with bindings for both name and checked - see https://github.com/ractivejs/ractive/issues/1749
						return CheckboxBinding;
					}
				}

				if ( bindName ) {
					return type === 'radio' ? RadioNameBinding : CheckboxNameBinding;
				}

				if ( bindChecked ) {
					return type === 'radio' ? RadioBinding : CheckboxBinding;
				}
			}

			if ( type === 'file' && isBindable( attributes.value ) ) {
				return FileBinding;
			}

			if ( isBindable( attributes.value ) ) {
				return ( type === 'number' || type === 'range' ) ? NumericBinding : GenericBinding;
			}

			return null;
		}

		// <select>
		if ( element.name === 'select' && isBindable( attributes.value ) ) {
			return element.getAttribute( 'multiple' ) ? MultipleSelectBinding : SingleSelectBinding;
		}

		// <textarea>
		if ( element.name === 'textarea' && isBindable( attributes.value ) ) {
			return GenericBinding;
		}
	}

	function makeDirty$1 ( query ) {
		query.makeDirty();
	}

	var endsWithSemi = /;\s*$/;

	var Element = (function (Item) {
		function Element ( options ) {
			var this$1 = this;

			Item.call( this, options );

			this.liveQueries = []; // TODO rare case. can we handle differently?

			this.name = options.template.e.toLowerCase();
			this.isVoid = voidElementNames.test( this.name );

			// find parent element
			this.parent = findElement( this.parentFragment, false );

			if ( this.parent && this.parent.name === 'option' ) {
				throw new Error( ("An <option> element cannot contain other elements (encountered <" + (this.name) + ">)") );
			}

			this.decorators = [];

			// create attributes
			this.attributeByName = {};

			this.attributes = [];
			var leftovers = [];
			( this.template.m || [] ).forEach( function ( template ) {
				switch ( template.t ) {
					case ATTRIBUTE:
					case BINDING_FLAG:
					case DECORATOR:
					case EVENT:
					case TRANSITION:
						this$1.attributes.push( createItem({
							owner: this$1,
							parentFragment: this$1.parentFragment,
							template: template
						}) );
						break;

					default:
						leftovers.push( template );
						break;
				}
			});

			if ( leftovers.length ) {
				this.attributes.push( new ConditionalAttribute({
					owner: this,
					parentFragment: this.parentFragment,
					template: leftovers
				}) );
			}

			var i = this.attributes.length;
			while ( i-- ) {
				var attr = this$1.attributes[ i ];
				if ( attr.name === 'type' ) this$1.attributes.unshift( this$1.attributes.splice( i, 1 )[ 0 ] );
				else if ( attr.name === 'max' ) this$1.attributes.unshift( this$1.attributes.splice( i, 1 )[ 0 ] );
				else if ( attr.name === 'min' ) this$1.attributes.unshift( this$1.attributes.splice( i, 1 )[ 0 ] );
				else if ( attr.name === 'class' ) this$1.attributes.unshift( this$1.attributes.splice( i, 1 )[ 0 ] );
				else if ( attr.name === 'value' ) {
					this$1.attributes.push( this$1.attributes.splice( i, 1 )[ 0 ] );
				}
			}

			// create children
			if ( options.template.f && !options.deferContent ) {
				this.fragment = new Fragment({
					template: options.template.f,
					owner: this,
					cssIds: null
				});
			}

			this.binding = null; // filled in later
		}

		Element.prototype = Object.create( Item && Item.prototype );
		Element.prototype.constructor = Element;

		Element.prototype.bind = function bind$1$$ () {
			this.attributes.binding = true;
			this.attributes.forEach( bind$1 );
			this.attributes.binding = false;

			if ( this.fragment ) this.fragment.bind();

			// create two-way binding if necessary
			if ( !this.binding ) this.recreateTwowayBinding();
		};

		Element.prototype.createTwowayBinding = function createTwowayBinding () {
			var shouldBind = 'twoway' in this ? this.twoway : this.ractive.twoway;

			if ( !shouldBind ) return null;

			var Binding = selectBinding( this );

			if ( !Binding ) return null;

			var binding = new Binding( this );

			return binding && binding.model ?
				binding :
				null;
		};

		Element.prototype.destroyed = function destroyed () {
			this.attributes.forEach( function ( a ) { return a.destroyed(); } );
			if ( this.fragment ) this.fragment.destroyed();
		};

		Element.prototype.detach = function detach () {
			// if this element is no longer rendered, the transitions are complete and the attributes can be torn down
			if ( !this.rendered ) this.destroyed();

			return detachNode( this.node );
		};

		Element.prototype.find = function find ( selector ) {
			if ( this.node && matches( this.node, selector ) ) return this.node;
			if ( this.fragment ) {
				return this.fragment.find( selector );
			}
		};

		Element.prototype.findAll = function findAll ( selector, query ) {
			// Add this node to the query, if applicable, and register the
			// query on this element
			var matches = query.test( this.node );
			if ( matches ) {
				query.add( this.node );
				if ( query.live ) this.liveQueries.push( query );
			}

			if ( this.fragment ) {
				this.fragment.findAll( selector, query );
			}
		};

		Element.prototype.findComponent = function findComponent ( name ) {
			if ( this.fragment ) {
				return this.fragment.findComponent( name );
			}
		};

		Element.prototype.findAllComponents = function findAllComponents ( name, query ) {
			if ( this.fragment ) {
				this.fragment.findAllComponents( name, query );
			}
		};

		Element.prototype.findNextNode = function findNextNode () {
			return null;
		};

		Element.prototype.firstNode = function firstNode () {
			return this.node;
		};

		Element.prototype.getAttribute = function getAttribute ( name ) {
			var attribute = this.attributeByName[ name ];
			return attribute ? attribute.getValue() : undefined;
		};

		Element.prototype.recreateTwowayBinding = function recreateTwowayBinding () {
			if ( this.binding ) {
				this.binding.unbind();
				this.binding.unrender();
			}

			if ( this.binding = this.createTwowayBinding() ) {
				this.binding.bind();
				if ( this.rendered ) this.binding.render();
			}
		};

		Element.prototype.render = function render$1 ( target, occupants ) {
			// TODO determine correct namespace
			var this$1 = this;

			this.namespace = getNamespace( this );

			var node;
			var existing = false;

			if ( occupants ) {
				var n;
				while ( ( n = occupants.shift() ) ) {
					if ( n.nodeName.toUpperCase() === this$1.template.e.toUpperCase() && n.namespaceURI === this$1.namespace ) {
						this$1.node = node = n;
						existing = true;
						break;
					} else {
						detachNode( n );
					}
				}
			}

			if ( !node ) {
				node = createElement( this.template.e, this.namespace, this.getAttribute( 'is' ) );
				this.node = node;
			}

			defineProperty( node, '_ractive', {
				value: {
					proxy: this
				}
			});

			// Is this a top-level node of a component? If so, we may need to add
			// a data-ractive-css attribute, for CSS encapsulation
			if ( this.parentFragment.cssIds ) {
				node.setAttribute( 'data-ractive-css', this.parentFragment.cssIds.map( function ( x ) { return ("{" + x + "}"); } ).join( ' ' ) );
			}

			if ( existing && this.foundNode ) this.foundNode( node );

			if ( this.fragment ) {
				var children = existing ? toArray( node.childNodes ) : undefined;

				this.fragment.render( node, children );

				// clean up leftover children
				if ( children ) {
					children.forEach( detachNode );
				}
			}

			if ( existing ) {
				// store initial values for two-way binding
				if ( this.binding && this.binding.wasUndefined ) this.binding.setFromNode( node );
				// remove unused attributes
				var i = node.attributes.length;
				while ( i-- ) {
					var name = node.attributes[i].name;
					if ( !( name in this$1.attributeByName ) ) node.removeAttribute( name );
				}
			}

			this.attributes.forEach( render );

			if ( this.binding ) this.binding.render();

			updateLiveQueries$1( this );

			if ( this._introTransition && this.ractive.transitionsEnabled ) {
				this._introTransition.isIntro = true;
				runloop.registerTransition( this._introTransition );
			}

			if ( !existing ) {
				target.appendChild( node );
			}

			this.rendered = true;
		};

		Element.prototype.shuffled = function shuffled () {
			this.liveQueries.forEach( makeDirty$1 );
			Item.prototype.shuffled.call(this);
		};

		Element.prototype.toString = function toString () {
			var tagName = this.template.e;

			var attrs = this.attributes.map( stringifyAttribute ).join( '' );

			// Special case - selected options
			if ( this.name === 'option' && this.isSelected() ) {
				attrs += ' selected';
			}

			// Special case - two-way radio name bindings
			if ( this.name === 'input' && inputIsCheckedRadio( this ) ) {
				attrs += ' checked';
			}

			// Special case style and class attributes and directives
			var style, cls;
			this.attributes.forEach( function ( attr ) {
				if ( attr.name === 'class' ) {
					cls = ( cls || '' ) + ( cls ? ' ' : '' ) + safeAttributeString( attr.getString() );
				} else if ( attr.name === 'style' ) {
					style = ( style || '' ) + ( style ? ' ' : '' ) + safeAttributeString( attr.getString() );
					if ( style && !endsWithSemi.test( style ) ) style += ';';
				} else if ( attr.style ) {
					style = ( style || '' ) + ( style ? ' ' : '' ) +  "" + (attr.style) + ": " + (safeAttributeString( attr.getString() )) + ";";
				} else if ( attr.inlineClass && attr.getValue() ) {
					cls = ( cls || '' ) + ( cls ? ' ' : '' ) + attr.inlineClass;
				}
			});
			// put classes first, then inline style
			if ( style !== undefined ) attrs = ' style' + ( style ? ("=\"" + style + "\"") : '' ) + attrs;
			if ( cls !== undefined ) attrs = ' class' + (cls ? ("=\"" + cls + "\"") : '') + attrs;

			var str = "<" + tagName + "" + attrs + ">";

			if ( this.isVoid ) return str;

			// Special case - textarea
			if ( this.name === 'textarea' && this.getAttribute( 'value' ) !== undefined ) {
				str += escapeHtml( this.getAttribute( 'value' ) );
			}

			// Special case - contenteditable
			else if ( this.getAttribute( 'contenteditable' ) !== undefined ) {
				str += ( this.getAttribute( 'value' ) || '' );
			}

			if ( this.fragment ) {
				str += this.fragment.toString( !/^(?:script|style)$/i.test( this.template.e ) ); // escape text unless script/style
			}

			str += "</" + tagName + ">";
			return str;
		};

		Element.prototype.unbind = function unbind$1 () {
			this.attributes.unbinding = true;
			this.attributes.forEach( unbind );
			this.attributes.unbinding = false;

			if ( this.binding ) this.binding.unbind();
			if ( this.fragment ) this.fragment.unbind();
		};

		Element.prototype.unrender = function unrender ( shouldDestroy ) {
			if ( !this.rendered ) return;
			this.rendered = false;

			// unrendering before intro completed? complete it now
			// TODO should be an API for aborting transitions
			var transition = this._introTransition;
			if ( transition && transition.complete ) transition.complete();

			// Detach as soon as we can
			if ( this.name === 'option' ) {
				// <option> elements detach immediately, so that
				// their parent <select> element syncs correctly, and
				// since option elements can't have transitions anyway
				this.detach();
			} else if ( shouldDestroy ) {
				runloop.detachWhenReady( this );
			}

			if ( this.fragment ) this.fragment.unrender();

			if ( this.binding ) this.binding.unrender();

			// outro transition
			if ( this._outroTransition && this.ractive.transitionsEnabled ) {
				this._outroTransition.isIntro = false;
				runloop.registerTransition( this._outroTransition );
			}

			removeFromLiveQueries( this );
			// TODO forms are a special case
		};

		Element.prototype.update = function update$1 () {
			if ( this.dirty ) {
				this.dirty = false;

				this.attributes.forEach( update );

				if ( this.fragment ) this.fragment.update();
			}
		};

		return Element;
	}(Item));

	function inputIsCheckedRadio ( element ) {
		var attributes = element.attributeByName;

		var typeAttribute  = attributes.type;
		var valueAttribute = attributes.value;
		var nameAttribute  = attributes.name;

		if ( !typeAttribute || ( typeAttribute.value !== 'radio' ) || !valueAttribute || !nameAttribute.interpolator ) {
			return;
		}

		if ( valueAttribute.getValue() === nameAttribute.interpolator.model.get() ) {
			return true;
		}
	}

	function stringifyAttribute ( attribute ) {
		var str = attribute.toString();
		return str ? ' ' + str : '';
	}

	function removeFromLiveQueries ( element ) {
		var i = element.liveQueries.length;
		while ( i-- ) {
			var query = element.liveQueries[i];
			query.remove( element.node );
		}
	}

	function getNamespace ( element ) {
		// Use specified namespace...
		var xmlns = element.getAttribute( 'xmlns' );
		if ( xmlns ) return xmlns;

		// ...or SVG namespace, if this is an <svg> element
		if ( element.name === 'svg' ) return svg$1;

		var parent = element.parent;

		if ( parent ) {
			// ...or HTML, if the parent is a <foreignObject>
			if ( parent.name === 'foreignobject' ) return html;

			// ...or inherit from the parent node
			return parent.node.namespaceURI;
		}

		return element.ractive.el.namespaceURI;
	}

	var Form = (function (Element) {
		function Form ( options ) {
			Element.call( this, options );
			this.formBindings = [];
		}

		Form.prototype = Object.create( Element && Element.prototype );
		Form.prototype.constructor = Form;

		Form.prototype.render = function render ( target, occupants ) {
			Element.prototype.render.call( this, target, occupants );
			this.node.addEventListener( 'reset', handleReset, false );
		};

		Form.prototype.unrender = function unrender ( shouldDestroy ) {
			this.node.removeEventListener( 'reset', handleReset, false );
			Element.prototype.unrender.call( this, shouldDestroy );
		};

		return Form;
	}(Element));

	function handleReset () {
		var element = this._ractive.proxy;

		runloop.start();
		element.formBindings.forEach( updateModel$1 );
		runloop.end();
	}

	function updateModel$1 ( binding ) {
		binding.model.set( binding.resetValue );
	}

	var Mustache = (function (Item) {
		function Mustache ( options ) {
			Item.call( this, options );

			this.parentFragment = options.parentFragment;
			this.template = options.template;
			this.index = options.index;
			if ( options.owner ) this.parent = options.owner;

			this.isStatic = !!options.template.s;

			this.model = null;
			this.dirty = false;
		}

		Mustache.prototype = Object.create( Item && Item.prototype );
		Mustache.prototype.constructor = Mustache;

		Mustache.prototype.bind = function bind () {
			// try to find a model for this view
			var this$1 = this;

			var model = resolve$2( this.parentFragment, this.template );
			var value = model ? model.get() : undefined;

			if ( this.isStatic ) {
				this.model = { get: function () { return value; } };
				return;
			}

			if ( model ) {
				model.register( this );
				this.model = model;
			} else if ( this.template.r ) {
				this.resolver = this.parentFragment.resolve( this.template.r, function ( model ) {
					this$1.model = model;
					model.register( this$1 );

					this$1.handleChange();
					this$1.resolver = null;
				});
			}
		};

		Mustache.prototype.handleChange = function handleChange () {
			this.bubble();
		};

		Mustache.prototype.rebinding = function rebinding ( next, previous, safe ) {
			next = rebindMatch( this.template, next, previous );
			if ( this['static'] ) return false;
			if ( next === this.model ) return false;

			if ( this.model ) {
				this.model.unregister( this );
			}
			if ( next ) next.addShuffleRegister( this, 'mark' );
			this.model = next;
			if ( !safe ) this.handleChange();
			return true;
		};

		Mustache.prototype.unbind = function unbind () {
			if ( !this.isStatic ) {
				this.model && this.model.unregister( this );
				this.model = undefined;
				this.resolver && this.resolver.unbind();
			}
		};

		return Mustache;
	}(Item));

	var Interpolator = (function (Mustache) {
		function Interpolator () {
			Mustache.apply(this, arguments);
		}

		Interpolator.prototype = Object.create( Mustache && Mustache.prototype );
		Interpolator.prototype.constructor = Interpolator;

		Interpolator.prototype.bubble = function bubble () {
			if ( this.owner ) this.owner.bubble();
			Mustache.prototype.bubble.call(this);
		};

		Interpolator.prototype.detach = function detach () {
			return detachNode( this.node );
		};

		Interpolator.prototype.firstNode = function firstNode () {
			return this.node;
		};

		Interpolator.prototype.getString = function getString () {
			return this.model ? safeToStringValue( this.model.get() ) : '';
		};

		Interpolator.prototype.render = function render ( target, occupants ) {
			if ( inAttributes() ) return;
			var value = this.getString();

			this.rendered = true;

			if ( occupants ) {
				var n = occupants[0];
				if ( n && n.nodeType === 3 ) {
					occupants.shift();
					if ( n.nodeValue !== value ) {
						n.nodeValue = value;
					}
				} else {
					n = this.node = doc.createTextNode( value );
					if ( occupants[0] ) {
						target.insertBefore( n, occupants[0] );
					} else {
						target.appendChild( n );
					}
				}

				this.node = n;
			} else {
				this.node = doc.createTextNode( value );
				target.appendChild( this.node );
			}
		};

		Interpolator.prototype.toString = function toString ( escape ) {
			var string = this.getString();
			return escape ? escapeHtml( string ) : string;
		};

		Interpolator.prototype.unrender = function unrender ( shouldDestroy ) {
			if ( shouldDestroy ) this.detach();
			this.rendered = false;
		};

		Interpolator.prototype.update = function update () {
			if ( this.dirty ) {
				this.dirty = false;
				if ( this.rendered ) {
					this.node.data = this.getString();
				}
			}
		};

		Interpolator.prototype.valueOf = function valueOf () {
			return this.model ? this.model.get() : undefined;
		};

		return Interpolator;
	}(Mustache));

	var Input = (function (Element) {
		function Input () {
			Element.apply(this, arguments);
		}

		Input.prototype = Object.create( Element && Element.prototype );
		Input.prototype.constructor = Input;

		Input.prototype.render = function render ( target, occupants ) {
			Element.prototype.render.call( this, target, occupants );
			this.node.defaultValue = this.node.value;
		};

		return Input;
	}(Element));

	var Parser;
	var ParseError;
	var leadingWhitespace = /^\s+/;
	ParseError = function ( message ) {
		this.name = 'ParseError';
		this.message = message;
		try {
			throw new Error(message);
		} catch (e) {
			this.stack = e.stack;
		}
	};

	ParseError.prototype = Error.prototype;

	Parser = function ( str, options ) {
		var this$1 = this;

		var items, item, lineStart = 0;

		this.str = str;
		this.options = options || {};
		this.pos = 0;

		this.lines = this.str.split( '\n' );
		this.lineEnds = this.lines.map( function ( line ) {
			var lineEnd = lineStart + line.length + 1; // +1 for the newline

			lineStart = lineEnd;
			return lineEnd;
		}, 0 );

		// Custom init logic
		if ( this.init ) this.init( str, options );

		items = [];

		while ( ( this$1.pos < this$1.str.length ) && ( item = this$1.read() ) ) {
			items.push( item );
		}

		this.leftover = this.remaining();
		this.result = this.postProcess ? this.postProcess( items, options ) : items;
	};

	Parser.prototype = {
		read: function ( converters ) {
			var this$1 = this;

			var pos, i, len, item;

			if ( !converters ) converters = this.converters;

			pos = this.pos;

			len = converters.length;
			for ( i = 0; i < len; i += 1 ) {
				this$1.pos = pos; // reset for each attempt

				if ( item = converters[i]( this$1 ) ) {
					return item;
				}
			}

			return null;
		},

		getContextMessage: function ( pos, message ) {
			var ref = this.getLinePos( pos ), lineNum = ref[0], columnNum = ref[1];
			if ( this.options.contextLines === -1 ) {
				return [ lineNum, columnNum, ("" + message + " at line " + lineNum + " character " + columnNum) ];
			}

			var line = this.lines[ lineNum - 1 ];

			var contextUp = '';
			var contextDown = '';
			if ( this.options.contextLines ) {
				var start = lineNum - 1 - this.options.contextLines < 0 ? 0 : lineNum - 1 - this.options.contextLines;
				contextUp = this.lines.slice( start, lineNum - 1 - start ).join( '\n' ).replace( /\t/g, '  ' );
				contextDown = this.lines.slice( lineNum, lineNum + this.options.contextLines ).join( '\n' ).replace( /\t/g, '  ' );
				if ( contextUp ) {
					contextUp += '\n';
				}
				if ( contextDown ) {
					contextDown = '\n' + contextDown;
				}
			}

			var numTabs = 0;
			var annotation = contextUp + line.replace( /\t/g, function ( match, char ) {
				if ( char < columnNum ) {
					numTabs += 1;
				}

				return '  ';
			}) + '\n' + new Array( columnNum + numTabs ).join( ' ' ) + '^----' + contextDown;

			return [ lineNum, columnNum, ("" + message + " at line " + lineNum + " character " + columnNum + ":\n" + annotation) ];
		},

		getLinePos: function ( char ) {
			var this$1 = this;

			var lineNum = 0, lineStart = 0, columnNum;

			while ( char >= this$1.lineEnds[ lineNum ] ) {
				lineStart = this$1.lineEnds[ lineNum ];
				lineNum += 1;
			}

			columnNum = char - lineStart;
			return [ lineNum + 1, columnNum + 1, char ]; // line/col should be one-based, not zero-based!
		},

		error: function ( message ) {
			var ref = this.getContextMessage( this.pos, message ), lineNum = ref[0], columnNum = ref[1], msg = ref[2];

			var error = new ParseError( msg );

			error.line = lineNum;
			error.character = columnNum;
			error.shortMessage = message;

			throw error;
		},

		matchString: function ( string ) {
			if ( this.str.substr( this.pos, string.length ) === string ) {
				this.pos += string.length;
				return string;
			}
		},

		matchPattern: function ( pattern ) {
			var match;

			if ( match = pattern.exec( this.remaining() ) ) {
				this.pos += match[0].length;
				return match[1] || match[0];
			}
		},

		allowWhitespace: function () {
			this.matchPattern( leadingWhitespace );
		},

		remaining: function () {
			return this.str.substring( this.pos );
		},

		nextChar: function () {
			return this.str.charAt( this.pos );
		}
	};

	Parser.extend = function ( proto ) {
		var Parent = this, Child, key;

		Child = function ( str, options ) {
			Parser.call( this, str, options );
		};

		Child.prototype = create( Parent.prototype );

		for ( key in proto ) {
			if ( hasOwn.call( proto, key ) ) {
				Child.prototype[ key ] = proto[ key ];
			}
		}

		Child.extend = Parser.extend;
		return Child;
	};

	var Parser$1 = Parser;

	var stringMiddlePattern;
	var escapeSequencePattern;
	var lineContinuationPattern;
	// Match one or more characters until: ", ', \, or EOL/EOF.
	// EOL/EOF is written as (?!.) (meaning there's no non-newline char next).
	stringMiddlePattern = /^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/;

	// Match one escape sequence, including the backslash.
	escapeSequencePattern = /^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/;

	// Match one ES5 line continuation (backslash + line terminator).
	lineContinuationPattern = /^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/;

	// Helper for defining getDoubleQuotedString and getSingleQuotedString.
	function makeQuotedStringMatcher ( okQuote ) {
		return function ( parser ) {
			var literal = '"';
			var done = false;
			var next;

			while ( !done ) {
				next = ( parser.matchPattern( stringMiddlePattern ) || parser.matchPattern( escapeSequencePattern ) ||
					parser.matchString( okQuote ) );
				if ( next ) {
					if ( next === ("\"") ) {
						literal += "\\\"";
					} else if ( next === ("\\'") ) {
						literal += "'";
					} else {
						literal += next;
					}
				} else {
					next = parser.matchPattern( lineContinuationPattern );
					if ( next ) {
						// convert \(newline-like) into a \u escape, which is allowed in JSON
						literal += '\\u' + ( '000' + next.charCodeAt(1).toString(16) ).slice( -4 );
					} else {
						done = true;
					}
				}
			}

			literal += '"';

			// use JSON.parse to interpret escapes
			return JSON.parse( literal );
		};
	}

	var getSingleQuotedString = makeQuotedStringMatcher( ("\"") );
	var getDoubleQuotedString = makeQuotedStringMatcher( ("'") );

	function readStringLiteral ( parser ) {
		var start, string;

		start = parser.pos;

		if ( parser.matchString( '"' ) ) {
			string = getDoubleQuotedString( parser );

			if ( !parser.matchString( '"' ) ) {
				parser.pos = start;
				return null;
			}

			return {
				t: STRING_LITERAL,
				v: string
			};
		}

		if ( parser.matchString( ("'") ) ) {
			string = getSingleQuotedString( parser );

			if ( !parser.matchString( ("'") ) ) {
				parser.pos = start;
				return null;
			}

			return {
				t: STRING_LITERAL,
				v: string
			};
		}

		return null;
	}

	// bulletproof number regex from https://gist.github.com/Rich-Harris/7544330
	var numberPattern$1 = /^(?:[+-]?)0*(?:(?:(?:[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;

	function readNumberLiteral ( parser ) {
		var result;

		if ( result = parser.matchPattern( numberPattern$1 ) ) {
			return {
				t: NUMBER_LITERAL,
				v: result
			};
		}

		return null;
	}

	var name = /^[a-zA-Z_$][a-zA-Z_$0-9]*/;

	var identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;

	// http://mathiasbynens.be/notes/javascript-properties
	// can be any name, string literal, or number literal
	function readKey ( parser ) {
		var token;

		if ( token = readStringLiteral( parser ) ) {
			return identifier.test( token.v ) ? token.v : '"' + token.v.replace( /"/g, '\\"' ) + '"';
		}

		if ( token = readNumberLiteral( parser ) ) {
			return token.v;
		}

		if ( token = parser.matchPattern( name ) ) {
			return token;
		}

		return null;
	}

	// simple JSON parser, without the restrictions of JSON parse
	// (i.e. having to double-quote keys).
	//
	// If passed a hash of values as the second argument, ${placeholders}
	// will be replaced with those values

	var specials = {
		'true': true,
		'false': false,
		'null': null,
		undefined: undefined
	};

	var specialsPattern = new RegExp( '^(?:' + Object.keys( specials ).join( '|' ) + ')' );
	var numberPattern = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
	var placeholderPattern = /\$\{([^\}]+)\}/g;
	var placeholderAtStartPattern = /^\$\{([^\}]+)\}/;
	var onlyWhitespace = /^\s*$/;

	var JsonParser = Parser$1.extend({
		init: function ( str, options ) {
			this.values = options.values;
			this.allowWhitespace();
		},

		postProcess: function ( result ) {
			if ( result.length !== 1 || !onlyWhitespace.test( this.leftover ) ) {
				return null;
			}

			return { value: result[0].v };
		},

		converters: [
			function getPlaceholder ( parser ) {
				if ( !parser.values ) return null;

				var placeholder = parser.matchPattern( placeholderAtStartPattern );

				if ( placeholder && ( parser.values.hasOwnProperty( placeholder ) ) ) {
					return { v: parser.values[ placeholder ] };
				}
			},

			function getSpecial ( parser ) {
				var special = parser.matchPattern( specialsPattern );
				if ( special ) return { v: specials[ special ] };
			},

			function getNumber ( parser ) {
				var number = parser.matchPattern( numberPattern );
				if ( number ) return { v: +number };
			},

			function getString ( parser ) {
				var stringLiteral = readStringLiteral( parser );
				var values = parser.values;

				if ( stringLiteral && values ) {
					return {
						v: stringLiteral.v.replace( placeholderPattern, function ( match, $1 ) { return ( $1 in values ? values[ $1 ] : $1 ); } )
					};
				}

				return stringLiteral;
			},

			function getObject ( parser ) {
				if ( !parser.matchString( '{' ) ) return null;

				var result = {};

				parser.allowWhitespace();

				if ( parser.matchString( '}' ) ) {
					return { v: result };
				}

				var pair;
				while ( pair = getKeyValuePair( parser ) ) {
					result[ pair.key ] = pair.value;

					parser.allowWhitespace();

					if ( parser.matchString( '}' ) ) {
						return { v: result };
					}

					if ( !parser.matchString( ',' ) ) {
						return null;
					}
				}

				return null;
			},

			function getArray ( parser ) {
				if ( !parser.matchString( '[' ) ) return null;

				var result = [];

				parser.allowWhitespace();

				if ( parser.matchString( ']' ) ) {
					return { v: result };
				}

				var valueToken;
				while ( valueToken = parser.read() ) {
					result.push( valueToken.v );

					parser.allowWhitespace();

					if ( parser.matchString( ']' ) ) {
						return { v: result };
					}

					if ( !parser.matchString( ',' ) ) {
						return null;
					}

					parser.allowWhitespace();
				}

				return null;
			}
		]
	});

	function getKeyValuePair ( parser ) {
		parser.allowWhitespace();

		var key = readKey( parser );

		if ( !key ) return null;

		var pair = { key: key };

		parser.allowWhitespace();
		if ( !parser.matchString( ':' ) ) {
			return null;
		}
		parser.allowWhitespace();

		var valueToken = parser.read();

		if ( !valueToken ) return null;

		pair.value = valueToken.v;
		return pair;
	}

	function parseJSON ( str, values ) {
		var parser = new JsonParser( str, { values: values });
		return parser.result;
	}

	var Mapping = (function (Item) {
		function Mapping ( options ) {
			Item.call( this, options );

			this.name = options.template.n;

			this.owner = options.owner || options.parentFragment.owner || options.element || findElement( options.parentFragment );
			this.element = options.element || (this.owner.attributeByName ? this.owner : findElement( options.parentFragment ) );
			this.parentFragment = this.element.parentFragment; // shared
			this.ractive = this.parentFragment.ractive;

			this.fragment = null;

			this.element.attributeByName[ this.name ] = this;

			this.value = options.template.f;
		}

		Mapping.prototype = Object.create( Item && Item.prototype );
		Mapping.prototype.constructor = Mapping;

		Mapping.prototype.bind = function bind () {
			if ( this.fragment ) {
				this.fragment.bind();
			}

			var template = this.template.f;
			var viewmodel = this.element.instance.viewmodel;

			if ( template === 0 ) {
				// empty attributes are `true`
				viewmodel.joinKey( this.name ).set( true );
			}

			else if ( typeof template === 'string' ) {
				var parsed = parseJSON( template );
				viewmodel.joinKey( this.name ).set( parsed ? parsed.value : template );
			}

			else if ( isArray( template ) ) {
				createMapping( this, true );
			}
		};

		Mapping.prototype.render = function render () {};

		Mapping.prototype.unbind = function unbind () {
			if ( this.fragment ) this.fragment.unbind();
			if ( this.model ) this.model.unregister( this );
			if ( this.boundFragment ) this.boundFragment.unbind();

			if ( this.element.bound ) {
				if ( this.link.target === this.model ) this.link.owner.unlink();
			}
		};

		Mapping.prototype.unrender = function unrender () {};

		Mapping.prototype.update = function update () {
			if ( this.dirty ) {
				this.dirty = false;
				if ( this.fragment ) this.fragment.update();
				if ( this.boundFragment ) this.boundFragment.update();
				if ( this.rendered ) this.updateDelegate();
			}
		};

		return Mapping;
	}(Item));

	function createMapping ( item ) {
		var template = item.template.f;
		var viewmodel = item.element.instance.viewmodel;
		var childData = viewmodel.value;

		if ( template.length === 1 && template[0].t === INTERPOLATOR ) {
			item.model = resolve$2( item.parentFragment, template[0] );

			if ( !item.model ) {
				warnOnceIfDebug( ("The " + (item.name) + "='{{" + (template[0].r) + "}}' mapping is ambiguous, and may cause unexpected results. Consider initialising your data to eliminate the ambiguity"), { ractive: item.element.instance }); // TODO add docs page explaining item
				item.parentFragment.ractive.get( item.name ); // side-effect: create mappings as necessary
				item.model = item.parentFragment.findContext().joinKey( item.name );
			}

			item.link = viewmodel.createLink( item.name, item.model, template[0].r );

			if ( item.model.get() === undefined && !item.model.isReadonly && item.name in childData ) {
				item.model.set( childData[ item.name ] );
			}
		}

		else {
			item.boundFragment = new Fragment({
				owner: item,
				template: template
			}).bind();

			item.model = viewmodel.joinKey( item.name );
			item.model.set( item.boundFragment.valueOf() );

			// item is a *bit* of a hack
			item.boundFragment.bubble = function () {
				Fragment.prototype.bubble.call( item.boundFragment );
				// defer this to avoid mucking around model deps if there happens to be an expression involved
				runloop.scheduleTask(function () {
					item.boundFragment.update();
					item.model.set( item.boundFragment.valueOf() );
				});
			};
		}
	}

	var Option = (function (Element) {
		function Option ( options ) {
			var template = options.template;
			if ( !template.a ) template.a = {};

			// If the value attribute is missing, use the element's content,
			// as long as it isn't disabled
			if ( template.a.value === undefined && !( 'disabled' in template.a ) ) {
				template.a.value = template.f || '';
			}

			Element.call( this, options );

			this.select = findElement( this.parent || this.parentFragment, false, 'select' );
		}

		Option.prototype = Object.create( Element && Element.prototype );
		Option.prototype.constructor = Option;

		Option.prototype.bind = function bind () {
			if ( !this.select ) {
				Element.prototype.bind.call(this);
				return;
			}

			// If the select has a value, it overrides the `selected` attribute on
			// this option - so we delete the attribute
			var selectedAttribute = this.attributeByName.selected;
			if ( selectedAttribute && this.select.getAttribute( 'value' ) !== undefined ) {
				var index = this.attributes.indexOf( selectedAttribute );
				this.attributes.splice( index, 1 );
				delete this.attributeByName.selected;
			}

			Element.prototype.bind.call(this);
			this.select.options.push( this );
		};

		Option.prototype.bubble = function bubble () {
			// if we're using content as value, may need to update here
			var value = this.getAttribute( 'value' );
			if ( this.node && this.node.value !== value ) {
				this.node._ractive.value = value;
			}
			Element.prototype.bubble.call(this);
		};

		Option.prototype.getAttribute = function getAttribute ( name ) {
			var attribute = this.attributeByName[ name ];
			return attribute ? attribute.getValue() : name === 'value' && this.fragment ? this.fragment.valueOf() : undefined;
		};

		Option.prototype.isSelected = function isSelected () {
			var optionValue = this.getAttribute( 'value' );

			if ( optionValue === undefined || !this.select ) {
				return false;
			}

			var selectValue = this.select.getAttribute( 'value' );

			if ( selectValue == optionValue ) {
				return true;
			}

			if ( this.select.getAttribute( 'multiple' ) && isArray( selectValue ) ) {
				var i = selectValue.length;
				while ( i-- ) {
					if ( selectValue[i] == optionValue ) {
						return true;
					}
				}
			}
		};

		Option.prototype.render = function render ( target, occupants ) {
			Element.prototype.render.call( this, target, occupants );

			if ( !this.attributeByName.value ) {
				this.node._ractive.value = this.getAttribute( 'value' );
			}
		};

		Option.prototype.unbind = function unbind () {
			Element.prototype.unbind.call(this);

			if ( this.select ) {
				removeFromArray( this.select.options, this );
			}
		};

		return Option;
	}(Element));

	function getPartialTemplate ( ractive, name, parentFragment ) {
		// If the partial in instance or view heirarchy instances, great
		var partial = getPartialFromRegistry( ractive, name, parentFragment || {} );
		if ( partial ) return partial;

		// Does it exist on the page as a script tag?
		partial = parser.fromId( name, { noThrow: true } );
		if ( partial ) {
			// parse and register to this ractive instance
			var parsed = parser.parseFor( partial, ractive );

			// register extra partials on the ractive instance if they don't already exist
			if ( parsed.p ) fillGaps( ractive.partials, parsed.p );

			// register (and return main partial if there are others in the template)
			return ractive.partials[ name ] = parsed.t;
		}
	}

	function getPartialFromRegistry ( ractive, name, parentFragment ) {
		// if there was an instance up-hierarchy, cool
		var partial = findParentPartial( name, parentFragment.owner );
		if ( partial ) return partial;

		// find first instance in the ractive or view hierarchy that has this partial
		var instance = findInstance( 'partials', ractive, name );

		if ( !instance ) { return; }

		partial = instance.partials[ name ];

		// partial is a function?
		var fn;
		if ( typeof partial === 'function' ) {
			fn = partial.bind( instance );
			fn.isOwner = instance.partials.hasOwnProperty(name);
			partial = fn.call( ractive, parser );
		}

		if ( !partial && partial !== '' ) {
			warnIfDebug( noRegistryFunctionReturn, name, 'partial', 'partial', { ractive: ractive });
			return;
		}

		// If this was added manually to the registry,
		// but hasn't been parsed, parse it now
		if ( !parser.isParsed( partial ) ) {
			// use the parseOptions of the ractive instance on which it was found
			var parsed = parser.parseFor( partial, instance );

			// Partials cannot contain nested partials!
			// TODO add a test for this
			if ( parsed.p ) {
				warnIfDebug( 'Partials ({{>%s}}) cannot contain nested inline partials', name, { ractive: ractive });
			}

			// if fn, use instance to store result, otherwise needs to go
			// in the correct point in prototype chain on instance or constructor
			var target = fn ? instance : findOwner( instance, name );

			// may be a template with partials, which need to be registered and main template extracted
			target.partials[ name ] = partial = parsed.t;
		}

		// store for reset
		if ( fn ) partial._fn = fn;

		return partial.v ? partial.t : partial;
	}

	function findOwner ( ractive, key ) {
		return ractive.partials.hasOwnProperty( key )
			? ractive
			: findConstructor( ractive.constructor, key);
	}

	function findConstructor ( constructor, key ) {
		if ( !constructor ) { return; }
		return constructor.partials.hasOwnProperty( key )
			? constructor
			: findConstructor( constructor._Parent, key );
	}

	function findParentPartial( name, parent ) {
		if ( parent ) {
			if ( parent.template && parent.template.p && parent.template.p[name] ) {
				return parent.template.p[name];
			} else if ( parent.parentFragment && parent.parentFragment.owner ) {
				return findParentPartial( name, parent.parentFragment.owner );
			}
		}
	}

	var Partial = (function (Mustache) {
		function Partial () {
			Mustache.apply(this, arguments);
		}

		Partial.prototype = Object.create( Mustache && Mustache.prototype );
		Partial.prototype.constructor = Partial;

		Partial.prototype.bind = function bind () {
			// keep track of the reference name for future resets
			this.refName = this.template.r;

			// name matches take priority over expressions
			var template = this.refName ? getPartialTemplate( this.ractive, this.refName, this.parentFragment ) || null : null;
			var templateObj;

			if ( template ) {
				this.named = true;
				this.setTemplate( this.template.r, template );
			}

			if ( !template ) {
				Mustache.prototype.bind.call(this);
				if ( this.model && ( templateObj = this.model.get() ) && typeof templateObj === 'object' && ( typeof templateObj.template === 'string' || isArray( templateObj.t ) ) ) {
					if ( templateObj.template ) {
						this.source = templateObj.template;
						templateObj = parsePartial( this.template.r, templateObj.template, this.ractive );
					} else {
						this.source = templateObj.t;
					}
					this.setTemplate( this.template.r, templateObj.t );
				} else if ( ( !this.model || typeof this.model.get() !== 'string' ) && this.refName ) {
					this.setTemplate( this.refName, template );
				} else {
					this.setTemplate( this.model.get() );
				}
			}

			this.fragment = new Fragment({
				owner: this,
				template: this.partialTemplate
			}).bind();
		};

		Partial.prototype.detach = function detach () {
			return this.fragment.detach();
		};

		Partial.prototype.find = function find ( selector ) {
			return this.fragment.find( selector );
		};

		Partial.prototype.findAll = function findAll ( selector, query ) {
			this.fragment.findAll( selector, query );
		};

		Partial.prototype.findComponent = function findComponent ( name ) {
			return this.fragment.findComponent( name );
		};

		Partial.prototype.findAllComponents = function findAllComponents ( name, query ) {
			this.fragment.findAllComponents( name, query );
		};

		Partial.prototype.firstNode = function firstNode ( skipParent ) {
			return this.fragment.firstNode( skipParent );
		};

		Partial.prototype.forceResetTemplate = function forceResetTemplate () {
			var this$1 = this;

			this.partialTemplate = undefined;

			// on reset, check for the reference name first
			if ( this.refName ) {
				this.partialTemplate = getPartialTemplate( this.ractive, this.refName, this.parentFragment );
			}

			// then look for the resolved name
			if ( !this.partialTemplate ) {
				this.partialTemplate = getPartialTemplate( this.ractive, this.name, this.parentFragment );
			}

			if ( !this.partialTemplate ) {
				warnOnceIfDebug( ("Could not find template for partial '" + (this.name) + "'") );
				this.partialTemplate = [];
			}

			if ( this.inAttribute ) {
				doInAttributes( function () { return this$1.fragment.resetTemplate( this$1.partialTemplate ); } );
			} else {
				this.fragment.resetTemplate( this.partialTemplate );
			}

			this.bubble();
		};

		Partial.prototype.render = function render ( target, occupants ) {
			this.fragment.render( target, occupants );
		};

		Partial.prototype.setTemplate = function setTemplate ( name, template ) {
			this.name = name;

			if ( !template && template !== null ) template = getPartialTemplate( this.ractive, name, this.parentFragment );

			if ( !template ) {
				warnOnceIfDebug( ("Could not find template for partial '" + name + "'") );
			}

			this.partialTemplate = template || [];
		};

		Partial.prototype.toString = function toString ( escape ) {
			return this.fragment.toString( escape );
		};

		Partial.prototype.unbind = function unbind () {
			Mustache.prototype.unbind.call(this);
			this.fragment.unbind();
		};

		Partial.prototype.unrender = function unrender ( shouldDestroy ) {
			this.fragment.unrender( shouldDestroy );
		};

		Partial.prototype.update = function update () {
			var template;

			if ( this.dirty ) {
				this.dirty = false;

				if ( !this.named ) {
					if ( this.model ) {
						template = this.model.get();
					}

					if ( template && typeof template === 'string' && template !== this.name ) {
						this.setTemplate( template );
						this.fragment.resetTemplate( this.partialTemplate );
					} else if ( template && typeof template === 'object' && ( typeof template.template === 'string' || isArray( template.t ) ) ) {
						if ( template.t !== this.source && template.template !== this.source ) {
							if ( template.template ) {
								this.source = template.template;
								template = parsePartial( this.name, template.template, this.ractive );
							} else {
								this.source = template.t;
							}
							this.setTemplate( this.name, template.t );
							this.fragment.resetTemplate( this.partialTemplate );
						}
					}
				}

				this.fragment.update();
			}
		};

		return Partial;
	}(Mustache));

	function parsePartial( name, partial, ractive ) {
		var parsed;

		try {
			parsed = parser.parse( partial, parser.getParseOptions( ractive ) );
		} catch (e) {
			warnIfDebug( ("Could not parse partial from expression '" + name + "'\n" + (e.message)) );
		}

		return parsed || { t: [] };
	}

	var RepeatedFragment = function RepeatedFragment ( options ) {
		this.parent = options.owner.parentFragment;

		// bit of a hack, so reference resolution works without another
		// layer of indirection
		this.parentFragment = this;
		this.owner = options.owner;
		this.ractive = this.parent.ractive;

		// encapsulated styles should be inherited until they get applied by an element
		this.cssIds = 'cssIds' in options ? options.cssIds : ( this.parent ? this.parent.cssIds : null );

		this.context = null;
		this.rendered = false;
		this.iterations = [];

		this.template = options.template;

		this.indexRef = options.indexRef;
		this.keyRef = options.keyRef;

		this.pendingNewIndices = null;
		this.previousIterations = null;

		// track array versus object so updates of type rest
		this.isArray = false;
	};

	RepeatedFragment.prototype.bind = function bind ( context ) {
		var this$1 = this;

			this.context = context;
		var value = context.get();

		// {{#each array}}...
		if ( this.isArray = isArray( value ) ) {
			// we can't use map, because of sparse arrays
			this.iterations = [];
			var max = value.length;
			for ( var i = 0; i < max; i += 1 ) {
				this$1.iterations[i] = this$1.createIteration( i, i );
			}
		}

		// {{#each object}}...
		else if ( isObject( value ) ) {
			this.isArray = false;

			// TODO this is a dreadful hack. There must be a neater way
			if ( this.indexRef ) {
				var refs = this.indexRef.split( ',' );
				this.keyRef = refs[0];
				this.indexRef = refs[1];
			}

			this.iterations = Object.keys( value ).map( function ( key, index ) {
				return this$1.createIteration( key, index );
			});
		}

		return this;
	};

	RepeatedFragment.prototype.bubble = function bubble () {
		this.owner.bubble();
	};

	RepeatedFragment.prototype.createIteration = function createIteration ( key, index ) {
		var fragment = new Fragment({
			owner: this,
			template: this.template
		});

		// TODO this is a bit hacky
		fragment.key = key;
		fragment.index = index;
		fragment.isIteration = true;

		var model = this.context.joinKey( key );

		// set up an iteration alias if there is one
		if ( this.owner.template.z ) {
			fragment.aliases = {};
			fragment.aliases[ this.owner.template.z[0].n ] = model;
		}

		return fragment.bind( model );
	};

	RepeatedFragment.prototype.destroyed = function destroyed () {
		this.iterations.forEach( function ( i ) { return i.destroyed(); } );
	};

	RepeatedFragment.prototype.detach = function detach () {
		var docFrag = createDocumentFragment();
		this.iterations.forEach( function ( fragment ) { return docFrag.appendChild( fragment.detach() ); } );
		return docFrag;
	};

	RepeatedFragment.prototype.find = function find ( selector ) {
		var this$1 = this;

			var len = this.iterations.length;
		var i;

		for ( i = 0; i < len; i += 1 ) {
			var found = this$1.iterations[i].find( selector );
			if ( found ) return found;
		}
	};

	RepeatedFragment.prototype.findAll = function findAll ( selector, query ) {
		var this$1 = this;

			var len = this.iterations.length;
		var i;

		for ( i = 0; i < len; i += 1 ) {
			this$1.iterations[i].findAll( selector, query );
		}
	};

	RepeatedFragment.prototype.findComponent = function findComponent ( name ) {
		var this$1 = this;

			var len = this.iterations.length;
		var i;

		for ( i = 0; i < len; i += 1 ) {
			var found = this$1.iterations[i].findComponent( name );
			if ( found ) return found;
		}
	};

	RepeatedFragment.prototype.findAllComponents = function findAllComponents ( name, query ) {
		var this$1 = this;

			var len = this.iterations.length;
		var i;

		for ( i = 0; i < len; i += 1 ) {
			this$1.iterations[i].findAllComponents( name, query );
		}
	};

	RepeatedFragment.prototype.findNextNode = function findNextNode ( iteration ) {
		var this$1 = this;

			if ( iteration.index < this.iterations.length - 1 ) {
			for ( var i = iteration.index + 1; i < this$1.iterations.length; i++ ) {
				var node = this$1.iterations[ i ].firstNode( true );
				if ( node ) return node;
			}
		}

		return this.owner.findNextNode();
	};

	RepeatedFragment.prototype.firstNode = function firstNode ( skipParent ) {
		return this.iterations[0] ? this.iterations[0].firstNode( skipParent ) : null;
	};

	RepeatedFragment.prototype.rebinding = function rebinding ( next ) {
		var this$1 = this;

			this.context = next;
		this.iterations.forEach( function ( fragment ) {
			var model = next ? next.joinKey( fragment.key || fragment.index ) : undefined;
			fragment.context = model;
			if ( this$1.owner.template.z ) {
				fragment.aliases = {};
				fragment.aliases[ this$1.owner.template.z[0].n ] = model;
			}
		});
	};

	RepeatedFragment.prototype.render = function render ( target, occupants ) {
		// TODO use docFrag.cloneNode...

		if ( this.iterations ) {
			this.iterations.forEach( function ( fragment ) { return fragment.render( target, occupants ); } );
		}

		this.rendered = true;
	};

	RepeatedFragment.prototype.shuffle = function shuffle ( newIndices ) {
		var this$1 = this;

			if ( !this.pendingNewIndices ) this.previousIterations = this.iterations.slice();

		if ( !this.pendingNewIndices ) this.pendingNewIndices = [];

		this.pendingNewIndices.push( newIndices );

		var iterations = [];

		newIndices.forEach( function ( newIndex, oldIndex ) {
			if ( newIndex === -1 ) return;

			var fragment = this$1.iterations[ oldIndex ];
			iterations[ newIndex ] = fragment;

			if ( newIndex !== oldIndex && fragment ) fragment.dirty = true;
		});

		this.iterations = iterations;

		this.bubble();
	};

	RepeatedFragment.prototype.shuffled = function shuffled () {
		this.iterations.forEach( function ( i ) { return i.shuffled(); } );
	};

	RepeatedFragment.prototype.toString = function toString$1$$ ( escape ) {
		return this.iterations ?
			this.iterations.map( escape ? toEscapedString : toString$1 ).join( '' ) :
			'';
	};

	RepeatedFragment.prototype.unbind = function unbind$1 () {
		this.iterations.forEach( unbind );
		return this;
	};

	RepeatedFragment.prototype.unrender = function unrender$1 ( shouldDestroy ) {
		this.iterations.forEach( shouldDestroy ? unrenderAndDestroy : unrender );
		if ( this.pendingNewIndices && this.previousIterations ) {
			this.previousIterations.forEach( function ( fragment ) {
				if ( fragment.rendered ) shouldDestroy ? unrenderAndDestroy( fragment ) : unrender( fragment );
			});
		}
		this.rendered = false;
	};

	// TODO smart update
	RepeatedFragment.prototype.update = function update$1 () {
		// skip dirty check, since this is basically just a facade

		var this$1 = this;

			if ( this.pendingNewIndices ) {
			this.updatePostShuffle();
			return;
		}

		if ( this.updating ) return;
		this.updating = true;

		var value = this.context.get(),
				  wasArray = this.isArray;

		var toRemove;
		var oldKeys;
		var reset = true;
		var i;

		if ( this.isArray = isArray( value ) ) {
			if ( wasArray ) {
				reset = false;
				if ( this.iterations.length > value.length ) {
					toRemove = this.iterations.splice( value.length );
				}
			}
		} else if ( isObject( value ) && !wasArray ) {
			reset = false;
			toRemove = [];
			oldKeys = {};
			i = this.iterations.length;

			while ( i-- ) {
				var fragment$1 = this$1.iterations[i];
				if ( fragment$1.key in value ) {
					oldKeys[ fragment$1.key ] = true;
				} else {
					this$1.iterations.splice( i, 1 );
					toRemove.push( fragment$1 );
				}
			}
		}

		if ( reset ) {
			toRemove = this.iterations;
			this.iterations = [];
		}

		if ( toRemove ) {
			toRemove.forEach( function ( fragment ) {
				fragment.unbind();
				fragment.unrender( true );
			});
		}

		// update the remaining ones
		this.iterations.forEach( update );

		// add new iterations
		var newLength = isArray( value ) ?
			value.length :
			isObject( value ) ?
				Object.keys( value ).length :
				0;

		var docFrag;
		var fragment;

		if ( newLength > this.iterations.length ) {
			docFrag = this.rendered ? createDocumentFragment() : null;
			i = this.iterations.length;

			if ( isArray( value ) ) {
				while ( i < value.length ) {
					fragment = this$1.createIteration( i, i );

					this$1.iterations.push( fragment );
					if ( this$1.rendered ) fragment.render( docFrag );

					i += 1;
				}
			}

			else if ( isObject( value ) ) {
				// TODO this is a dreadful hack. There must be a neater way
				if ( this.indexRef && !this.keyRef ) {
					var refs = this.indexRef.split( ',' );
					this.keyRef = refs[0];
					this.indexRef = refs[1];
				}

				Object.keys( value ).forEach( function ( key ) {
					if ( !oldKeys || !( key in oldKeys ) ) {
						fragment = this$1.createIteration( key, i );

						this$1.iterations.push( fragment );
						if ( this$1.rendered ) fragment.render( docFrag );

						i += 1;
					}
				});
			}

			if ( this.rendered ) {
				var parentNode = this.parent.findParentNode();
				var anchor = this.parent.findNextNode( this.owner );

				parentNode.insertBefore( docFrag, anchor );
			}
		}

		this.updating = false;
	};

	RepeatedFragment.prototype.updatePostShuffle = function updatePostShuffle () {
		var this$1 = this;

			var newIndices = this.pendingNewIndices[ 0 ];

		// map first shuffle through
		this.pendingNewIndices.slice( 1 ).forEach( function ( indices ) {
			newIndices.forEach( function ( newIndex, oldIndex ) {
				newIndices[ oldIndex ] = indices[ newIndex ];
			});
		});

		// This algorithm (for detaching incorrectly-ordered fragments from the DOM and
		// storing them in a document fragment for later reinsertion) seems a bit hokey,
		// but it seems to work for now
		var len = this.context.get().length, oldLen = this.previousIterations.length;
		var i;
		var removed = {};

		newIndices.forEach( function ( newIndex, oldIndex ) {
			var fragment = this$1.previousIterations[ oldIndex ];
			this$1.previousIterations[ oldIndex ] = null;

			if ( newIndex === -1 ) {
				removed[ oldIndex ] = fragment;
			} else if ( fragment.index !== newIndex ) {
				var model = this$1.context.joinKey( newIndex );
				fragment.index = fragment.key = newIndex;
				fragment.context = model;
				if ( this$1.owner.template.z ) {
					fragment.aliases = {};
					fragment.aliases[ this$1.owner.template.z[0].n ] = model;
				}
			}
		});

		// if the array was spliced outside of ractive, sometimes there are leftover fragments not in the newIndices
		this.previousIterations.forEach( function ( frag, i ) {
			if ( frag ) removed[ i ] = frag;
		});

		// create new/move existing iterations
		var docFrag = this.rendered ? createDocumentFragment() : null;
		var parentNode = this.rendered ? this.parent.findParentNode() : null;

		var contiguous = 'startIndex' in newIndices;
		i = contiguous ? newIndices.startIndex : 0;

		for ( i; i < len; i++ ) {
			var frag = this$1.iterations[i];

			if ( frag && contiguous ) {
				// attach any built-up iterations
				if ( this$1.rendered ) {
					if ( removed[i] ) docFrag.appendChild( removed[i].detach() );
					if ( docFrag.childNodes.length  ) parentNode.insertBefore( docFrag, frag.firstNode() );
				}
				continue;
			}

			if ( !frag ) this$1.iterations[i] = this$1.createIteration( i, i );

			if ( this$1.rendered ) {
				if ( removed[i] ) docFrag.appendChild( removed[i].detach() );

				if ( frag ) docFrag.appendChild( frag.detach() );
				else {
					this$1.iterations[i].render( docFrag );
				}
			}
		}

		// append any leftovers
		if ( this.rendered ) {
			for ( i = len; i < oldLen; i++ ) {
				if ( removed[i] ) docFrag.appendChild( removed[i].detach() );
			}

			if ( docFrag.childNodes.length ) {
				parentNode.insertBefore( docFrag, this.owner.findNextNode() );
			}
		}

		// trigger removal on old nodes
		Object.keys( removed ).forEach( function ( k ) { return removed[k].unbind().unrender( true ); } );

		this.iterations.forEach( update );

		this.pendingNewIndices = null;

		this.shuffled();
	};

	function isEmpty ( value ) {
		return !value ||
		       ( isArray( value ) && value.length === 0 ) ||
			   ( isObject( value ) && Object.keys( value ).length === 0 );
	}

	function getType ( value, hasIndexRef ) {
		if ( hasIndexRef || isArray( value ) ) return SECTION_EACH;
		if ( isObject( value ) || typeof value === 'function' ) return SECTION_IF_WITH;
		if ( value === undefined ) return null;
		return SECTION_IF;
	}

	var Section = (function (Mustache) {
		function Section ( options ) {
			Mustache.call( this, options );

			this.sectionType = options.template.n || null;
			this.templateSectionType = this.sectionType;
			this.subordinate = options.template.l === 1;
			this.fragment = null;
		}

		Section.prototype = Object.create( Mustache && Mustache.prototype );
		Section.prototype.constructor = Section;

		Section.prototype.bind = function bind () {
			Mustache.prototype.bind.call(this);

			if ( this.subordinate ) {
				this.sibling = this.parentFragment.items[ this.parentFragment.items.indexOf( this ) - 1 ];
				this.sibling.nextSibling = this;
			}

			// if we managed to bind, we need to create children
			if ( this.model ) {
				this.dirty = true;
				this.update();
			} else if ( this.sectionType && this.sectionType === SECTION_UNLESS && ( !this.sibling || !this.sibling.isTruthy() ) ) {
				this.fragment = new Fragment({
					owner: this,
					template: this.template.f
				}).bind();
			}
		};

		Section.prototype.detach = function detach () {
			return this.fragment ? this.fragment.detach() : createDocumentFragment();
		};

		Section.prototype.find = function find ( selector ) {
			if ( this.fragment ) {
				return this.fragment.find( selector );
			}
		};

		Section.prototype.findAll = function findAll ( selector, query ) {
			if ( this.fragment ) {
				this.fragment.findAll( selector, query );
			}
		};

		Section.prototype.findComponent = function findComponent ( name ) {
			if ( this.fragment ) {
				return this.fragment.findComponent( name );
			}
		};

		Section.prototype.findAllComponents = function findAllComponents ( name, query ) {
			if ( this.fragment ) {
				this.fragment.findAllComponents( name, query );
			}
		};

		Section.prototype.firstNode = function firstNode ( skipParent ) {
			return this.fragment && this.fragment.firstNode( skipParent );
		};

		Section.prototype.isTruthy = function isTruthy () {
			if ( this.subordinate && this.sibling.isTruthy() ) return true;
			var value = !this.model ? undefined : this.model.isRoot ? this.model.value : this.model.get();
			return !!value && ( this.templateSectionType === SECTION_IF_WITH || !isEmpty( value ) );
		};

		Section.prototype.rebinding = function rebinding ( next, previous, safe ) {
			if ( Mustache.prototype.rebinding.call( this, next, previous, safe ) ) {
				if ( this.fragment && this.sectionType !== SECTION_IF && this.sectionType !== SECTION_UNLESS ) {
					this.fragment.rebinding( next, previous );
				}
			}
		};

		Section.prototype.render = function render ( target, occupants ) {
			this.rendered = true;
			if ( this.fragment ) this.fragment.render( target, occupants );
		};

		Section.prototype.shuffle = function shuffle ( newIndices ) {
			if ( this.fragment && this.sectionType === SECTION_EACH ) {
				this.fragment.shuffle( newIndices );
			}
		};

		Section.prototype.toString = function toString ( escape ) {
			return this.fragment ? this.fragment.toString( escape ) : '';
		};

		Section.prototype.unbind = function unbind () {
			Mustache.prototype.unbind.call(this);
			if ( this.fragment ) this.fragment.unbind();
		};

		Section.prototype.unrender = function unrender ( shouldDestroy ) {
			if ( this.rendered && this.fragment ) this.fragment.unrender( shouldDestroy );
			this.rendered = false;
		};

		Section.prototype.update = function update () {
			if ( !this.dirty ) return;

			if ( this.fragment && this.sectionType !== SECTION_IF && this.sectionType !== SECTION_UNLESS ) {
				this.fragment.context = this.model;
			}

			if ( !this.model && this.sectionType !== SECTION_UNLESS ) return;

			this.dirty = false;

			var value = !this.model ? undefined : this.model.isRoot ? this.model.value : this.model.get();
			var siblingFalsey = !this.subordinate || !this.sibling.isTruthy();
			var lastType = this.sectionType;

			// watch for switching section types
			if ( this.sectionType === null || this.templateSectionType === null ) this.sectionType = getType( value, this.template.i );
			if ( lastType && lastType !== this.sectionType && this.fragment ) {
				if ( this.rendered ) {
					this.fragment.unbind().unrender( true );
				}

				this.fragment = null;
			}

			var newFragment;

			var fragmentShouldExist = this.sectionType === SECTION_EACH || // each always gets a fragment, which may have no iterations
			                            this.sectionType === SECTION_WITH || // with (partial context) always gets a fragment
			                            ( siblingFalsey && ( this.sectionType === SECTION_UNLESS ? !this.isTruthy() : this.isTruthy() ) ); // if, unless, and if-with depend on siblings and the condition

			if ( fragmentShouldExist ) {
				if ( this.fragment ) {
					this.fragment.update();
				} else {
					if ( this.sectionType === SECTION_EACH ) {
						newFragment = new RepeatedFragment({
							owner: this,
							template: this.template.f,
							indexRef: this.template.i
						}).bind( this.model );
					} else {
		 				// only with and if-with provide context - if and unless do not
						var context = this.sectionType !== SECTION_IF && this.sectionType !== SECTION_UNLESS ? this.model : null;
						newFragment = new Fragment({
							owner: this,
							template: this.template.f
						}).bind( context );
					}
				}
			} else {
				if ( this.fragment ) {
					this.fragment.unbind();
					if ( this.rendered ) this.fragment.unrender( true );
				}

				this.fragment = null;
			}

			if ( newFragment ) {
				if ( this.rendered ) {
					var parentNode = this.parentFragment.findParentNode();
					var anchor = this.parentFragment.findNextNode( this );

					if ( anchor ) {
						var docFrag = createDocumentFragment();
						newFragment.render( docFrag );

						// we use anchor.parentNode, not parentNode, because the sibling
						// may be temporarily detached as a result of a shuffle
						anchor.parentNode.insertBefore( docFrag, anchor );
					} else {
						newFragment.render( parentNode );
					}
				}

				this.fragment = newFragment;
			}

			if ( this.nextSibling ) {
				this.nextSibling.dirty = true;
				this.nextSibling.update();
			}
		};

		return Section;
	}(Mustache));

	function valueContains ( selectValue, optionValue ) {
		var i = selectValue.length;
		while ( i-- ) {
			if ( selectValue[i] == optionValue ) return true;
		}
	}

	var Select = (function (Element) {
		function Select ( options ) {
			Element.call( this, options );
			this.options = [];
		}

		Select.prototype = Object.create( Element && Element.prototype );
		Select.prototype.constructor = Select;

		Select.prototype.foundNode = function foundNode ( node ) {
			if ( this.binding ) {
				var selectedOptions = getSelectedOptions( node );

				if ( selectedOptions.length > 0 ) {
					this.selectedOptions = selectedOptions;
				}
			}
		};

		Select.prototype.render = function render ( target, occupants ) {
			Element.prototype.render.call( this, target, occupants );
			this.sync();

			var node = this.node;

			var i = node.options.length;
			while ( i-- ) {
				node.options[i].defaultSelected = node.options[i].selected;
			}

			this.rendered = true;
		};

		Select.prototype.sync = function sync () {
			var this$1 = this;

			var selectNode = this.node;

			if ( !selectNode ) return;

			var options = toArray( selectNode.options );

			if ( this.selectedOptions ) {
				options.forEach( function ( o ) {
					if ( this$1.selectedOptions.indexOf( o ) >= 0 ) o.selected = true;
					else o.selected = false;
				});
				this.binding.setFromNode( selectNode );
				delete this.selectedOptions;
				return;
			}

			var selectValue = this.getAttribute( 'value' );
			var isMultiple = this.getAttribute( 'multiple' );
			var array = isMultiple && isArray( selectValue );

			// If the <select> has a specified value, that should override
			// these options
			if ( selectValue !== undefined ) {
				var optionWasSelected;

				options.forEach( function ( o ) {
					var optionValue = o._ractive ? o._ractive.value : o.value;
					var shouldSelect = isMultiple ? array && valueContains( selectValue, optionValue ) : selectValue == optionValue;

					if ( shouldSelect ) {
						optionWasSelected = true;
					}

					o.selected = shouldSelect;
				});

				if ( !optionWasSelected && !isMultiple ) {
					if ( this.binding ) {
						this.binding.forceUpdate();
					}
				}
			}

			// Otherwise the value should be initialised according to which
			// <option> element is selected, if twoway binding is in effect
			else if ( this.binding ) {
				this.binding.forceUpdate();
			}
		};

		Select.prototype.update = function update () {
			var dirty = this.dirty;
			Element.prototype.update.call(this);
			if ( dirty ) {
				this.sync();
			}
		};

		return Select;
	}(Element));

	var Textarea = (function (Input) {
		function Textarea( options ) {
			var template = options.template;

			options.deferContent = true;

			Input.call( this, options );

			// check for single interpolator binding
			if ( !this.attributeByName.value ) {
				if ( template.f && isBindable( { template: template } ) ) {
					this.attributes.push( createItem( {
						owner: this,
						template: { t: ATTRIBUTE, f: template.f, n: 'value' },
						parentFragment: this.parentFragment
					} ) );
				} else {
					this.fragment = new Fragment({ owner: this, cssIds: null, template: template.f });
				}
			}
		}

		Textarea.prototype = Object.create( Input && Input.prototype );
		Textarea.prototype.constructor = Textarea;

		Textarea.prototype.bubble = function bubble () {
			var this$1 = this;

			if ( !this.dirty ) {
				this.dirty = true;

				if ( this.rendered && !this.binding && this.fragment ) {
					runloop.scheduleTask( function () {
						this$1.dirty = false;
						this$1.node.value = this$1.fragment.toString();
					});
				}

				this.parentFragment.bubble(); // default behaviour
			}
		};

		return Textarea;
	}(Input));

	var Text = (function (Item) {
		function Text ( options ) {
			Item.call( this, options );
			this.type = TEXT;
		}

		Text.prototype = Object.create( Item && Item.prototype );
		Text.prototype.constructor = Text;

		Text.prototype.bind = function bind () {
			// noop
		};

		Text.prototype.detach = function detach () {
			return detachNode( this.node );
		};

		Text.prototype.firstNode = function firstNode () {
			return this.node;
		};

		Text.prototype.render = function render ( target, occupants ) {
			if ( inAttributes() ) return;
			this.rendered = true;

			if ( occupants ) {
				var n = occupants[0];
				if ( n && n.nodeType === 3 ) {
					occupants.shift();
					if ( n.nodeValue !== this.template ) {
						n.nodeValue = this.template;
					}
				} else {
					n = this.node = doc.createTextNode( this.template );
					if ( occupants[0] ) {
						target.insertBefore( n, occupants[0] );
					} else {
						target.appendChild( n );
					}
				}

				this.node = n;
			} else {
				this.node = doc.createTextNode( this.template );
				target.appendChild( this.node );
			}
		};

		Text.prototype.toString = function toString ( escape ) {
			return escape ? escapeHtml( this.template ) : this.template;
		};

		Text.prototype.unbind = function unbind () {
			// noop
		};

		Text.prototype.unrender = function unrender ( shouldDestroy ) {
			if ( this.rendered && shouldDestroy ) this.detach();
			this.rendered = false;
		};

		Text.prototype.update = function update () {
			// noop
		};

		Text.prototype.valueOf = function valueOf () {
			return this.template;
		};

		return Text;
	}(Item));

	function camelCase ( hyphenatedStr ) {
		return hyphenatedStr.replace( /-([a-zA-Z])/g, function ( match, $1 ) {
			return $1.toUpperCase();
		});
	}

	var prefix;

	if ( !isClient ) {
		prefix = null;
	} else {
		var prefixCache = {};
		var testStyle = createElement( 'div' ).style;

		prefix = function ( prop ) {
			prop = camelCase( prop );

			if ( !prefixCache[ prop ] ) {
				if ( testStyle[ prop ] !== undefined ) {
					prefixCache[ prop ] = prop;
				}

				else {
					// test vendors...
					var capped = prop.charAt( 0 ).toUpperCase() + prop.substring( 1 );

					var i = vendors.length;
					while ( i-- ) {
						var vendor = vendors[i];
						if ( testStyle[ vendor + capped ] !== undefined ) {
							prefixCache[ prop ] = vendor + capped;
							break;
						}
					}
				}
			}

			return prefixCache[ prop ];
		};
	}

	var prefix$1 = prefix;

	var visible;
	var hidden = 'hidden';

	if ( doc ) {
		var prefix$2;

		if ( hidden in doc ) {
			prefix$2 = '';
		} else {
			var i$1 = vendors.length;
			while ( i$1-- ) {
				var vendor = vendors[i$1];
				hidden = vendor + 'Hidden';

				if ( hidden in doc ) {
					prefix$2 = vendor;
					break;
				}
			}
		}

		if ( prefix$2 !== undefined ) {
			doc.addEventListener( prefix$2 + 'visibilitychange', onChange );
			onChange();
		} else {
			// gah, we're in an old browser
			if ( 'onfocusout' in doc ) {
				doc.addEventListener( 'focusout', onHide );
				doc.addEventListener( 'focusin', onShow );
			}

			else {
				win.addEventListener( 'pagehide', onHide );
				win.addEventListener( 'blur', onHide );

				win.addEventListener( 'pageshow', onShow );
				win.addEventListener( 'focus', onShow );
			}

			visible = true; // until proven otherwise. Not ideal but hey
		}
	}

	function onChange () {
		visible = !doc[ hidden ];
	}

	function onHide () {
		visible = false;
	}

	function onShow () {
		visible = true;
	}

	var unprefixPattern = new RegExp( '^-(?:' + vendors.join( '|' ) + ')-' );

	function unprefix ( prop ) {
		return prop.replace( unprefixPattern, '' );
	}

	var vendorPattern = new RegExp( '^(?:' + vendors.join( '|' ) + ')([A-Z])' );

	function hyphenate ( str ) {
		if ( !str ) return ''; // edge case

		if ( vendorPattern.test( str ) ) str = '-' + str;

		return str.replace( /[A-Z]/g, function ( match ) { return '-' + match.toLowerCase(); } );
	}

	var createTransitions;

	if ( !isClient ) {
		createTransitions = null;
	} else {
		var testStyle$1 = createElement( 'div' ).style;
		var linear$1 = function ( x ) { return x; };

		var canUseCssTransitions = {};
		var cannotUseCssTransitions = {};

		// determine some facts about our environment
		var TRANSITION$1;
		var TRANSITIONEND;
		var CSS_TRANSITIONS_ENABLED;
		var TRANSITION_DURATION;
		var TRANSITION_PROPERTY;
		var TRANSITION_TIMING_FUNCTION;

		if ( testStyle$1.transition !== undefined ) {
			TRANSITION$1 = 'transition';
			TRANSITIONEND = 'transitionend';
			CSS_TRANSITIONS_ENABLED = true;
		} else if ( testStyle$1.webkitTransition !== undefined ) {
			TRANSITION$1 = 'webkitTransition';
			TRANSITIONEND = 'webkitTransitionEnd';
			CSS_TRANSITIONS_ENABLED = true;
		} else {
			CSS_TRANSITIONS_ENABLED = false;
		}

		if ( TRANSITION$1 ) {
			TRANSITION_DURATION = TRANSITION$1 + 'Duration';
			TRANSITION_PROPERTY = TRANSITION$1 + 'Property';
			TRANSITION_TIMING_FUNCTION = TRANSITION$1 + 'TimingFunction';
		}

		createTransitions = function ( t, to, options, changedProperties, resolve ) {

			// Wait a beat (otherwise the target styles will be applied immediately)
			// TODO use a fastdom-style mechanism?
			setTimeout( function () {
				var jsTransitionsComplete;
				var cssTransitionsComplete;
				var cssTimeout;

				function transitionDone () { clearTimeout( cssTimeout ); }

				function checkComplete () {
					if ( jsTransitionsComplete && cssTransitionsComplete ) {
						t.unregisterCompleteHandler( transitionDone );
						// will changes to events and fire have an unexpected consequence here?
						t.ractive.fire( t.name + ':end', t.node, t.isIntro );
						resolve();
					}
				}

				// this is used to keep track of which elements can use CSS to animate
				// which properties
				var hashPrefix = ( t.node.namespaceURI || '' ) + t.node.tagName;

				// need to reset transition properties
				var style = t.node.style;
				var previous = {
					property: style[ TRANSITION_PROPERTY ],
					timing: style[ TRANSITION_TIMING_FUNCTION ],
					duration: style[ TRANSITION_DURATION ]
				};

				style[ TRANSITION_PROPERTY ] = changedProperties.map( prefix$1 ).map( hyphenate ).join( ',' );
				style[ TRANSITION_TIMING_FUNCTION ] = hyphenate( options.easing || 'linear' );
				style[ TRANSITION_DURATION ] = ( options.duration / 1000 ) + 's';

				function transitionEndHandler ( event ) {
					var index = changedProperties.indexOf( camelCase( unprefix( event.propertyName ) ) );

					if ( index !== -1 ) {
						changedProperties.splice( index, 1 );
					}

					if ( changedProperties.length ) {
						// still transitioning...
						return;
					}

					clearTimeout( cssTimeout );
					cssTransitionsDone();
				}

				function cssTransitionsDone () {
					style[ TRANSITION_PROPERTY ] = previous.property;
					style[ TRANSITION_TIMING_FUNCTION ] = previous.duration;
					style[ TRANSITION_DURATION ] = previous.timing;

					t.node.removeEventListener( TRANSITIONEND, transitionEndHandler, false );

					cssTransitionsComplete = true;
					checkComplete();
				}

				t.node.addEventListener( TRANSITIONEND, transitionEndHandler, false );

				// safety net in case transitionend never fires
				cssTimeout = setTimeout( function () {
					changedProperties = [];
					cssTransitionsDone();
				}, options.duration + ( options.delay || 0 ) + 50 );
				t.registerCompleteHandler( transitionDone );

				setTimeout( function () {
					var i = changedProperties.length;
					var hash;
					var originalValue;
					var index;
					var propertiesToTransitionInJs = [];
					var prop;
					var suffix;
					var interpolator;

					while ( i-- ) {
						prop = changedProperties[i];
						hash = hashPrefix + prop;

						if ( CSS_TRANSITIONS_ENABLED && !cannotUseCssTransitions[ hash ] ) {
							style[ prefix$1( prop ) ] = to[ prop ];

							// If we're not sure if CSS transitions are supported for
							// this tag/property combo, find out now
							if ( !canUseCssTransitions[ hash ] ) {
								originalValue = t.getStyle( prop );

								// if this property is transitionable in this browser,
								// the current style will be different from the target style
								canUseCssTransitions[ hash ] = ( t.getStyle( prop ) != to[ prop ] );
								cannotUseCssTransitions[ hash ] = !canUseCssTransitions[ hash ];

								// Reset, if we're going to use timers after all
								if ( cannotUseCssTransitions[ hash ] ) {
									style[ prefix$1( prop ) ] = originalValue;
								}
							}
						}

						if ( !CSS_TRANSITIONS_ENABLED || cannotUseCssTransitions[ hash ] ) {
							// we need to fall back to timer-based stuff
							if ( originalValue === undefined ) {
								originalValue = t.getStyle( prop );
							}

							// need to remove this from changedProperties, otherwise transitionEndHandler
							// will get confused
							index = changedProperties.indexOf( prop );
							if ( index === -1 ) {
								warnIfDebug( 'Something very strange happened with transitions. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!', { node: t.node });
							} else {
								changedProperties.splice( index, 1 );
							}

							// TODO Determine whether this property is animatable at all

							suffix = /[^\d]*$/.exec( to[ prop ] )[0];
							interpolator = interpolate( parseFloat( originalValue ), parseFloat( to[ prop ] ) ) || ( function () { return to[ prop ]; } );

							// ...then kick off a timer-based transition
							propertiesToTransitionInJs.push({
								name: prefix$1( prop ),
								interpolator: interpolator,
								suffix: suffix
							});
						}
					}

					// javascript transitions
					if ( propertiesToTransitionInJs.length ) {
						var easing;

						if ( typeof options.easing === 'string' ) {
							easing = t.ractive.easing[ options.easing ];

							if ( !easing ) {
								warnOnceIfDebug( missingPlugin( options.easing, 'easing' ) );
								easing = linear$1;
							}
						} else if ( typeof options.easing === 'function' ) {
							easing = options.easing;
						} else {
							easing = linear$1;
						}

						new Ticker({
							duration: options.duration,
							easing: easing,
							step: function ( pos ) {
								var i = propertiesToTransitionInJs.length;
								while ( i-- ) {
									var prop = propertiesToTransitionInJs[i];
									t.node.style[ prop.name ] = prop.interpolator( pos ) + prop.suffix;
								}
							},
							complete: function () {
								jsTransitionsComplete = true;
								checkComplete();
							}
						});
					} else {
						jsTransitionsComplete = true;
					}

					if ( !changedProperties.length ) {
						// We need to cancel the transitionEndHandler, and deal with
						// the fact that it will never fire
						t.node.removeEventListener( TRANSITIONEND, transitionEndHandler, false );
						cssTransitionsComplete = true;
						checkComplete();
					}
				}, 0 );
			}, options.delay || 0 );
		};
	}

	var createTransitions$1 = createTransitions;

	function resetStyle ( node, style ) {
		if ( style ) {
			node.setAttribute( 'style', style );
		} else {
			// Next line is necessary, to remove empty style attribute!
			// See http://stackoverflow.com/a/7167553
			node.getAttribute( 'style' );
			node.removeAttribute( 'style' );
		}
	}

	var getComputedStyle = win && ( win.getComputedStyle || legacy.getComputedStyle );
	var resolved = Promise$1.resolve();

	var names = {
		t0: 'intro-outro',
		t1: 'intro',
		t2: 'outro'
	};

	var Transition = function Transition ( options ) {
		this.owner = options.owner || options.parentFragment.owner || findElement( options.parentFragment );
		this.element = this.owner.attributeByName ? this.owner : findElement( options.parentFragment );
		this.ractive = this.owner.ractive;
		this.template = options.template;
		this.parentFragment = options.parentFragment;
		this.options = options;
		this.onComplete = [];
	};

	Transition.prototype.animateStyle = function animateStyle ( style, value, options ) {
		var this$1 = this;

			if ( arguments.length === 4 ) {
			throw new Error( 't.animateStyle() returns a promise - use .then() instead of passing a callback' );
		}

		// Special case - page isn't visible. Don't animate anything, because
		// that way you'll never get CSS transitionend events
		if ( !visible ) {
			this.setStyle( style, value );
			return resolved;
		}

		var to;

		if ( typeof style === 'string' ) {
			to = {};
			to[ style ] = value;
		} else {
			to = style;

			// shuffle arguments
			options = value;
		}

		// As of 0.3.9, transition authors should supply an `option` object with
		// `duration` and `easing` properties (and optional `delay`), plus a
		// callback function that gets called after the animation completes

		// TODO remove this check in a future version
		if ( !options ) {
			warnOnceIfDebug( 'The "%s" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340', this.name );
			options = this;
		}

		return new Promise$1( function ( fulfil ) {
			// Edge case - if duration is zero, set style synchronously and complete
			if ( !options.duration ) {
				this$1.setStyle( to );
				fulfil();
				return;
			}

			// Get a list of the properties we're animating
			var propertyNames = Object.keys( to );
			var changedProperties = [];

			// Store the current styles
			var computedStyle = getComputedStyle( this$1.node );

			var i = propertyNames.length;
			while ( i-- ) {
				var prop = propertyNames[i];
				var current = computedStyle[ prefix$1( prop ) ];

				if ( current === '0px' ) current = 0;

				// we need to know if we're actually changing anything
				if ( current != to[ prop ] ) { // use != instead of !==, so we can compare strings with numbers
					changedProperties.push( prop );

					// make the computed style explicit, so we can animate where
					// e.g. height='auto'
					this$1.node.style[ prefix$1( prop ) ] = current;
				}
			}

			// If we're not actually changing anything, the transitionend event
			// will never fire! So we complete early
			if ( !changedProperties.length ) {
				fulfil();
				return;
			}

			createTransitions$1( this$1, to, options, changedProperties, fulfil );
		});
	};

	Transition.prototype.bind = function bind () {
		var this$1 = this;

			var options = this.options;
		var type = options.template && options.template.v;
		if ( type ) {
			if ( type === 't0' || type === 't1' ) this.element._introTransition = this;
			if ( type === 't0' || type === 't2' ) this.element._outroTransition = this;
			this.eventName = names[ type ];
		}

		var ractive = this.owner.ractive;

		if ( options.name ) {
			this.name = options.name;
		} else {
			var name = options.template.f;
			if ( typeof name.n === 'string' ) name = name.n;

			if ( typeof name !== 'string' ) {
				var fragment = new Fragment({
					owner: this.owner,
					template: name.n
				}).bind(); // TODO need a way to capture values without bind()

				name = fragment.toString();
				fragment.unbind();

				if ( name === '' ) {
					// empty string okay, just no transition
					return;
				}
			}

			this.name = name;
		}

		if ( options.params ) {
			this.params = options.params;
		} else {
			if ( options.template.f.a && !options.template.f.a.s ) {
				this.params = options.template.f.a;
			}

			else if ( options.template.f.d ) {
				// TODO is there a way to interpret dynamic arguments without all the
				// 'dependency thrashing'?
				var fragment$1 = new Fragment({
					owner: this.owner,
					template: options.template.f.d
				}).bind();

				this.params = fragment$1.getArgsList();
				fragment$1.unbind();
			}
		}

		if ( typeof this.name === 'function' ) {
			this._fn = this.name;
			this.name = this._fn.name;
		} else {
			this._fn = findInViewHierarchy( 'transitions', ractive, this.name );
		}

		if ( !this._fn ) {
			warnOnceIfDebug( missingPlugin( this.name, 'transition' ), { ractive: ractive });
		}

		// TODO: dry up after deprecation is done
		if ( options.template && this.template.f.a && this.template.f.a.s ) {
			this.resolvers = [];
			this.models = this.template.f.a.r.map( function ( ref, i ) {
				var resolver;
				var model = resolveReference( this$1.parentFragment, ref );
				if ( !model ) {
					resolver = this$1.parentFragment.resolve( ref, function ( model ) {
						this$1.models[i] = model;
						removeFromArray( this$1.resolvers, resolver );
						model.register( this$1 );
					});

					this$1.resolvers.push( resolver );
				} else model.register( this$1 );

				return model;
			});
			this.argsFn = getFunction( this.template.f.a.s, this.template.f.a.r.length );
		}
	};

	Transition.prototype.destroyed = function destroyed () {};

	Transition.prototype.getStyle = function getStyle ( props ) {
		var computedStyle = getComputedStyle( this.node );

		if ( typeof props === 'string' ) {
			var value = computedStyle[ prefix$1( props ) ];
			return value === '0px' ? 0 : value;
		}

		if ( !isArray( props ) ) {
			throw new Error( 'Transition$getStyle must be passed a string, or an array of strings representing CSS properties' );
		}

		var styles = {};

		var i = props.length;
		while ( i-- ) {
			var prop = props[i];
			var value$1 = computedStyle[ prefix$1( prop ) ];

			if ( value$1 === '0px' ) value$1 = 0;
			styles[ prop ] = value$1;
		}

		return styles;
	};

	Transition.prototype.handleChange = function handleChange () {};

	Transition.prototype.processParams = function processParams ( params, defaults ) {
		if ( typeof params === 'number' ) {
			params = { duration: params };
		}

		else if ( typeof params === 'string' ) {
			if ( params === 'slow' ) {
				params = { duration: 600 };
			} else if ( params === 'fast' ) {
				params = { duration: 200 };
			} else {
				params = { duration: 400 };
			}
		} else if ( !params ) {
			params = {};
		}

		return extendObj( {}, defaults, params );
	};

	Transition.prototype.rebinding = function rebinding ( next, previous ) {
		var idx = this.models.indexOf( previous );
		if ( !~idx ) return;

		next = rebindMatch( this.template.f.a.r[ idx ], next, previous );
		if ( next === previous ) return;

		previous.unregister( this );
		this.models.splice( idx, 1, next );
		if ( next ) next.addShuffleRegister( this, 'mark' );
	};

	Transition.prototype.registerCompleteHandler = function registerCompleteHandler ( fn ) {
		addToArray( this.onComplete, fn );
	};

	Transition.prototype.render = function render () {};

	Transition.prototype.setStyle = function setStyle ( style, value ) {
		if ( typeof style === 'string' ) {
			this.node.style[ prefix$1( style ) ] = value;
		}

		else {
			var prop;
			for ( prop in style ) {
				if ( style.hasOwnProperty( prop ) ) {
					this.node.style[ prefix$1( prop ) ] = style[ prop ];
				}
			}
		}

		return this;
	};

	Transition.prototype.start = function start () {
		var this$1 = this;

			var node = this.node = this.element.node;
		var originalStyle = node.getAttribute( 'style' );

		var completed;
		var args = this.params;

		// create t.complete() - we don't want this on the prototype,
		// because we don't want `this` silliness when passing it as
		// an argument
		this.complete = function ( noReset ) {
			if ( completed ) {
				return;
			}

			this$1.onComplete.forEach( function ( fn ) { return fn(); } );
			if ( !noReset && this$1.isIntro ) {
				resetStyle( node, originalStyle);
			}

			this$1._manager.remove( this$1 );

			completed = true;
		};

		// If the transition function doesn't exist, abort
		if ( !this._fn ) {
			this.complete();
			return;
		}

		// get expression args if supplied
		if ( this.argsFn ) {
			var values = this.models.map( function ( model ) {
				if ( !model ) return undefined;

				return model.get();
			});
			args = this.argsFn.apply( this.ractive, values );
		}

		var promise = this._fn.apply( this.ractive, [ this ].concat( args ) );
		if ( promise ) promise.then( this.complete );
	};

	Transition.prototype.toString = function toString () { return ''; };

	Transition.prototype.unbind = function unbind$1 () {
		if ( this.resolvers ) this.resolvers.forEach( unbind );
		if ( !this.element.attributes.unbinding ) {
			var type = this.options && this.options.template && this.options.template.v;
			if ( type === 't0' || type === 't1' ) this.element._introTransition = null;
			if ( type === 't0' || type === 't2' ) this.element._outroTransition = null;
		}
	};

	Transition.prototype.unregisterCompleteHandler = function unregisterCompleteHandler ( fn ) {
		removeFromArray( this.onComplete, fn );
	};

	Transition.prototype.unrender = function unrender () {};

	Transition.prototype.update = function update () {};

	var elementCache = {};

	var ieBug;
	var ieBlacklist;

	try {
		createElement( 'table' ).innerHTML = 'foo';
	} catch ( err ) {
		ieBug = true;

		ieBlacklist = {
			TABLE:  [ '<table class="x">', '</table>' ],
			THEAD:  [ '<table><thead class="x">', '</thead></table>' ],
			TBODY:  [ '<table><tbody class="x">', '</tbody></table>' ],
			TR:     [ '<table><tr class="x">', '</tr></table>' ],
			SELECT: [ '<select class="x">', '</select>' ]
		};
	}

	function insertHtml ( html, node, docFrag ) {
		var nodes = [];

		// render 0 and false
		if ( html == null || html === '' ) return nodes;

		var container;
		var wrapper;
		var selectedOption;

		if ( ieBug && ( wrapper = ieBlacklist[ node.tagName ] ) ) {
			container = element( 'DIV' );
			container.innerHTML = wrapper[0] + html + wrapper[1];
			container = container.querySelector( '.x' );

			if ( container.tagName === 'SELECT' ) {
				selectedOption = container.options[ container.selectedIndex ];
			}
		}

		else if ( node.namespaceURI === svg$1 ) {
			container = element( 'DIV' );
			container.innerHTML = '<svg class="x">' + html + '</svg>';
			container = container.querySelector( '.x' );
		}

		else if ( node.tagName === 'TEXTAREA' ) {
			container = createElement( 'div' );

			if ( typeof container.textContent !== 'undefined' ) {
				container.textContent = html;
			} else {
				container.innerHTML = html;
			}
		}

		else {
			container = element( node.tagName );
			container.innerHTML = html;

			if ( container.tagName === 'SELECT' ) {
				selectedOption = container.options[ container.selectedIndex ];
			}
		}

		var child;
		while ( child = container.firstChild ) {
			nodes.push( child );
			docFrag.appendChild( child );
		}

		// This is really annoying. Extracting <option> nodes from the
		// temporary container <select> causes the remaining ones to
		// become selected. So now we have to deselect them. IE8, you
		// amaze me. You really do
		// ...and now Chrome too
		var i;
		if ( node.tagName === 'SELECT' ) {
			i = nodes.length;
			while ( i-- ) {
				if ( nodes[i] !== selectedOption ) {
					nodes[i].selected = false;
				}
			}
		}

		return nodes;
	}

	function element ( tagName ) {
		return elementCache[ tagName ] || ( elementCache[ tagName ] = createElement( tagName ) );
	}

	var Triple = (function (Mustache) {
		function Triple ( options ) {
			Mustache.call( this, options );
		}

		Triple.prototype = Object.create( Mustache && Mustache.prototype );
		Triple.prototype.constructor = Triple;

		Triple.prototype.detach = function detach () {
			var docFrag = createDocumentFragment();
			this.nodes.forEach( function ( node ) { return docFrag.appendChild( node ); } );
			return docFrag;
		};

		Triple.prototype.find = function find ( selector ) {
			var this$1 = this;

			var len = this.nodes.length;
			var i;

			for ( i = 0; i < len; i += 1 ) {
				var node = this$1.nodes[i];

				if ( node.nodeType !== 1 ) continue;

				if ( matches( node, selector ) ) return node;

				var queryResult = node.querySelector( selector );
				if ( queryResult ) return queryResult;
			}

			return null;
		};

		Triple.prototype.findAll = function findAll ( selector, query ) {
			var this$1 = this;

			var len = this.nodes.length;
			var i;

			for ( i = 0; i < len; i += 1 ) {
				var node = this$1.nodes[i];

				if ( node.nodeType !== 1 ) continue;

				if ( query.test( node ) ) query.add( node );

				var queryAllResult = node.querySelectorAll( selector );
				if ( queryAllResult ) {
					var numNodes = queryAllResult.length;
					var j;

					for ( j = 0; j < numNodes; j += 1 ) {
						query.add( queryAllResult[j] );
					}
				}
			}
		};

		Triple.prototype.findComponent = function findComponent () {
			return null;
		};

		Triple.prototype.firstNode = function firstNode () {
			return this.nodes[0];
		};

		Triple.prototype.render = function render ( target ) {
			var html = this.model ? this.model.get() : '';
			this.nodes = insertHtml( html, this.parentFragment.findParentNode(), target );
			this.rendered = true;
		};

		Triple.prototype.toString = function toString () {
			var value = this.model && this.model.get();
			value = value != null ? '' + value : '';

			return inAttribute() ? decodeCharacterReferences( value ) : value;
		};

		Triple.prototype.unrender = function unrender () {
			if ( this.nodes ) this.nodes.forEach( function ( node ) { return detachNode( node ); } );
			this.rendered = false;
		};

		Triple.prototype.update = function update () {
			if ( this.rendered && this.dirty ) {
				this.dirty = false;

				this.unrender();
				var docFrag = createDocumentFragment();
				this.render( docFrag );

				var parentNode = this.parentFragment.findParentNode();
				var anchor = this.parentFragment.findNextNode( this );

				parentNode.insertBefore( docFrag, anchor );
			} else {
				// make sure to reset the dirty flag even if not rendered
				this.dirty = false;
			}
		};

		return Triple;
	}(Mustache));

	var Yielder = (function (Item) {
		function Yielder ( options ) {
			Item.call( this, options );

			this.container = options.parentFragment.ractive;
			this.component = this.container.component;

			this.containerFragment = options.parentFragment;
			this.parentFragment = this.component.parentFragment;

			// {{yield}} is equivalent to {{yield content}}
			this.name = options.template.n || '';
		}

		Yielder.prototype = Object.create( Item && Item.prototype );
		Yielder.prototype.constructor = Yielder;

		Yielder.prototype.bind = function bind () {
			var name = this.name;

			( this.component.yielders[ name ] || ( this.component.yielders[ name ] = [] ) ).push( this );

			// TODO don't parse here
			var template = this.container._inlinePartials[ name || 'content' ];

			if ( typeof template === 'string' ) {
				template = parse( template ).t;
			}

			if ( !template ) {
				warnIfDebug( ("Could not find template for partial \"" + name + "\""), { ractive: this.ractive });
				template = [];
			}

			this.fragment = new Fragment({
				owner: this,
				ractive: this.container.parent,
				template: template
			}).bind();
		};

		Yielder.prototype.bubble = function bubble () {
			if ( !this.dirty ) {
				this.containerFragment.bubble();
				this.dirty = true;
			}
		};

		Yielder.prototype.detach = function detach () {
			return this.fragment.detach();
		};

		Yielder.prototype.find = function find ( selector ) {
			return this.fragment.find( selector );
		};

		Yielder.prototype.findAll = function findAll ( selector, queryResult ) {
			this.fragment.findAll( selector, queryResult );
		};

		Yielder.prototype.findComponent = function findComponent ( name ) {
			return this.fragment.findComponent( name );
		};

		Yielder.prototype.findAllComponents = function findAllComponents ( name, queryResult ) {
			this.fragment.findAllComponents( name, queryResult );
		};

		Yielder.prototype.findNextNode = function findNextNode() {
			return this.containerFragment.findNextNode( this );
		};

		Yielder.prototype.firstNode = function firstNode ( skipParent ) {
			return this.fragment.firstNode( skipParent );
		};

		Yielder.prototype.render = function render ( target, occupants ) {
			return this.fragment.render( target, occupants );
		};

		Yielder.prototype.setTemplate = function setTemplate ( name ) {
			var template = this.parentFragment.ractive.partials[ name ];

			if ( typeof template === 'string' ) {
				template = parse( template ).t;
			}

			this.partialTemplate = template || []; // TODO warn on missing partial
		};

		Yielder.prototype.toString = function toString ( escape ) {
			return this.fragment.toString( escape );
		};

		Yielder.prototype.unbind = function unbind () {
			this.fragment.unbind();
			removeFromArray( this.component.yielders[ this.name ], this );
		};

		Yielder.prototype.unrender = function unrender ( shouldDestroy ) {
			this.fragment.unrender( shouldDestroy );
		};

		Yielder.prototype.update = function update () {
			this.dirty = false;
			this.fragment.update();
		};

		return Yielder;
	}(Item));

	// finds the component constructor in the registry or view hierarchy registries
	function getComponentConstructor ( ractive, name ) {
		var instance = findInstance( 'components', ractive, name );
		var Component;

		if ( instance ) {
			Component = instance.components[ name ];

			// best test we have for not Ractive.extend
			if ( !Component._Parent ) {
				// function option, execute and store for reset
				var fn = Component.bind( instance );
				fn.isOwner = instance.components.hasOwnProperty( name );
				Component = fn();

				if ( !Component ) {
					warnIfDebug( noRegistryFunctionReturn, name, 'component', 'component', { ractive: ractive });
					return;
				}

				if ( typeof Component === 'string' ) {
					// allow string lookup
					Component = getComponentConstructor( ractive, Component );
				}

				Component._fn = fn;
				instance.components[ name ] = Component;
			}
		}

		return Component;
	}

	var constructors = {};
	constructors[ ALIAS ] = Alias;
	constructors[ DOCTYPE ] = Doctype;
	constructors[ INTERPOLATOR ] = Interpolator;
	constructors[ PARTIAL ] = Partial;
	constructors[ SECTION ] = Section;
	constructors[ TRIPLE ] = Triple;
	constructors[ YIELDER ] = Yielder;

	constructors[ ATTRIBUTE ] = Attribute;
	constructors[ BINDING_FLAG ] = BindingFlag;
	constructors[ DECORATOR ] = Decorator;
	constructors[ EVENT ] = EventDirective;
	constructors[ TRANSITION ] = Transition;

	var specialElements = {
		doctype: Doctype,
		form: Form,
		input: Input,
		option: Option,
		select: Select,
		textarea: Textarea
	};

	function createItem ( options ) {
		if ( typeof options.template === 'string' ) {
			return new Text( options );
		}

		if ( options.template.t === ELEMENT ) {
			// could be component or element
			var ComponentConstructor = getComponentConstructor( options.parentFragment.ractive, options.template.e );
			if ( ComponentConstructor ) {
				return new Component( options, ComponentConstructor );
			}

			var tagName = options.template.e.toLowerCase();

			var ElementConstructor = specialElements[ tagName ] || Element;
			return new ElementConstructor( options );
		}

		var Item;

		// component mappings are a special case of attribute
		if ( options.template.t === ATTRIBUTE ) {
			var el = options.owner;
			if ( !el || ( el.type !== COMPONENT && el.type !== ELEMENT ) ) {
				el = findElement( options.parentFragment );
			}
			options.element = el;

			Item = el.type === COMPONENT ? Mapping : Attribute;
		} else {
			Item = constructors[ options.template.t ];
		}

		if ( !Item ) throw new Error( ("Unrecognised item type " + (options.template.t)) );

		return new Item( options );
	}

	// TODO all this code needs to die
	function processItems ( items, values, guid, counter ) {
		if ( counter === void 0 ) counter = 0;

		return items.map( function ( item ) {
			if ( item.type === TEXT ) {
				return item.template;
			}

			if ( item.fragment ) {
				if ( item.fragment.iterations ) {
					return item.fragment.iterations.map( function ( fragment ) {
						return processItems( fragment.items, values, guid, counter );
					}).join( '' );
				} else {
					return processItems( item.fragment.items, values, guid, counter );
				}
			}

			var placeholderId = "" + guid + "-" + (counter++);
			var model = item.model || item.newModel;

			values[ placeholderId ] = model ?
				model.wrapper ?
					model.wrapperValue :
					model.get() :
				undefined;

			return '${' + placeholderId + '}';
		}).join( '' );
	}

	function unrenderAndDestroy$1 ( item ) {
		item.unrender( true );
	}

	var Fragment = function Fragment ( options ) {
		this.owner = options.owner; // The item that owns this fragment - an element, section, partial, or attribute

		this.isRoot = !options.owner.parentFragment;
		this.parent = this.isRoot ? null : this.owner.parentFragment;
		this.ractive = options.ractive || ( this.isRoot ? options.owner : this.parent.ractive );

		this.componentParent = ( this.isRoot && this.ractive.component ) ? this.ractive.component.parentFragment : null;

		this.context = null;
		this.rendered = false;

		// encapsulated styles should be inherited until they get applied by an element
		this.cssIds = 'cssIds' in options ? options.cssIds : ( this.parent ? this.parent.cssIds : null );

		this.resolvers = [];

		this.dirty = false;
		this.dirtyArgs = this.dirtyValue = true; // TODO getArgsList is nonsense - should deprecate legacy directives style

		this.template = options.template || [];
		this.createItems();
	};

	Fragment.prototype.bind = function bind$1$$ ( context ) {
		this.context = context;
		this.items.forEach( bind$1 );
		this.bound = true;

		// in rare cases, a forced resolution (or similar) will cause the
		// fragment to be dirty before it's even finished binding. In those
		// cases we update immediately
		if ( this.dirty ) this.update();

		return this;
	};

	Fragment.prototype.bubble = function bubble () {
		this.dirtyArgs = this.dirtyValue = true;

		if ( !this.dirty ) {
			this.dirty = true;

			if ( this.isRoot ) { // TODO encapsulate 'is component root, but not overall root' check?
				if ( this.ractive.component ) {
					this.ractive.component.bubble();
				} else if ( this.bound ) {
					runloop.addFragment( this );
				}
			} else {
				this.owner.bubble();
			}
		}
	};

	Fragment.prototype.createItems = function createItems () {
		// this is a hot code path
		var this$1 = this;

			var max = this.template.length;
		this.items = [];
		for ( var i = 0; i < max; i++ ) {
			this$1.items[i] = createItem({ parentFragment: this$1, template: this$1.template[i], index: i });
		}
	};

	Fragment.prototype.destroyed = function destroyed () {
		this.items.forEach( function ( i ) { return i.destroyed(); } );
	};

	Fragment.prototype.detach = function detach () {
		var docFrag = createDocumentFragment();
		this.items.forEach( function ( item ) { return docFrag.appendChild( item.detach() ); } );
		return docFrag;
	};

	Fragment.prototype.find = function find ( selector ) {
		var this$1 = this;

			var len = this.items.length;
		var i;

		for ( i = 0; i < len; i += 1 ) {
			var found = this$1.items[i].find( selector );
			if ( found ) return found;
		}
	};

	Fragment.prototype.findAll = function findAll ( selector, query ) {
		var this$1 = this;

			if ( this.items ) {
			var len = this.items.length;
			var i;

			for ( i = 0; i < len; i += 1 ) {
				var item = this$1.items[i];

				if ( item.findAll ) {
					item.findAll( selector, query );
				}
			}
		}

		return query;
	};

	Fragment.prototype.findComponent = function findComponent ( name ) {
		var this$1 = this;

			var len = this.items.length;
		var i;

		for ( i = 0; i < len; i += 1 ) {
			var found = this$1.items[i].findComponent( name );
			if ( found ) return found;
		}
	};

	Fragment.prototype.findAllComponents = function findAllComponents ( name, query ) {
		var this$1 = this;

			if ( this.items ) {
			var len = this.items.length;
			var i;

			for ( i = 0; i < len; i += 1 ) {
				var item = this$1.items[i];

				if ( item.findAllComponents ) {
					item.findAllComponents( name, query );
				}
			}
		}

		return query;
	};

	Fragment.prototype.findContext = function findContext () {
		var fragment = this;
		while ( fragment && !fragment.context ) fragment = fragment.parent;
		if ( !fragment ) return this.ractive.viewmodel;
		else return fragment.context;
	};

	Fragment.prototype.findNextNode = function findNextNode ( item ) {
		// search for the next node going forward
		var this$1 = this;

			if ( item ) {
			for ( var i = item.index + 1; i < this$1.items.length; i++ ) {
				if ( !this$1.items[ i ] ) continue;

				var node = this$1.items[ i ].firstNode( true );
				if ( node ) return node;
			}
		}

		// if this is the root fragment, and there are no more items,
		// it means we're at the end...
		if ( this.isRoot ) {
			if ( this.ractive.component ) {
				return this.ractive.component.parentFragment.findNextNode( this.ractive.component );
			}

			// TODO possible edge case with other content
			// appended to this.ractive.el?
			return null;
		}

		if ( this.parent ) return this.owner.findNextNode( this ); // the argument is in case the parent is a RepeatedFragment
	};

	Fragment.prototype.findParentNode = function findParentNode () {
		var fragment = this;

		do {
			if ( fragment.owner.type === ELEMENT ) {
				return fragment.owner.node;
			}

			if ( fragment.isRoot && !fragment.ractive.component ) { // TODO encapsulate check
				return fragment.ractive.el;
			}

			if ( fragment.owner.type === YIELDER ) {
				fragment = fragment.owner.containerFragment;
			} else {
				fragment = fragment.componentParent || fragment.parent; // TODO ugh
			}
		} while ( fragment );

		throw new Error( 'Could not find parent node' ); // TODO link to issue tracker
	};

	Fragment.prototype.findRepeatingFragment = function findRepeatingFragment () {
		var fragment = this;
		// TODO better check than fragment.parent.iterations
		while ( ( fragment.parent || fragment.componentParent ) && !fragment.isIteration ) {
			fragment = fragment.parent || fragment.componentParent;
		}

		return fragment;
	};

	Fragment.prototype.firstNode = function firstNode ( skipParent ) {
		var this$1 = this;

			var node;
		for ( var i = 0; i < this$1.items.length; i++ ) {
			node = this$1.items[i].firstNode( true );

			if ( node ) {
				return node;
			}
		}

		if ( skipParent ) return null;

		return this.parent.findNextNode( this.owner );
	};

	// TODO ideally, this would be deprecated in favour of an
	// expression-like approach
	Fragment.prototype.getArgsList = function getArgsList () {
		if ( this.dirtyArgs ) {
			var values = {};
			var source = processItems( this.items, values, this.ractive._guid );
			var parsed = parseJSON( '[' + source + ']', values );

			this.argsList = parsed ?
				parsed.value :
				[ this.toString() ];

			this.dirtyArgs = false;
		}

		return this.argsList;
	};

	Fragment.prototype.rebinding = function rebinding ( next ) {
		this.context = next;
	};

	Fragment.prototype.render = function render ( target, occupants ) {
		if ( this.rendered ) throw new Error( 'Fragment is already rendered!' );
		this.rendered = true;

		this.items.forEach( function ( item ) { return item.render( target, occupants ); } );
	};

	Fragment.prototype.resetTemplate = function resetTemplate ( template ) {
		var wasBound = this.bound;
		var wasRendered = this.rendered;

		// TODO ensure transitions are disabled globally during reset

		if ( wasBound ) {
			if ( wasRendered ) this.unrender( true );
			this.unbind();
		}

		this.template = template;
		this.createItems();

		if ( wasBound ) {
			this.bind( this.context );

			if ( wasRendered ) {
				var parentNode = this.findParentNode();
				var anchor = this.findNextNode();

				if ( anchor ) {
					var docFrag = createDocumentFragment();
					this.render( docFrag );
					parentNode.insertBefore( docFrag, anchor );
				} else {
					this.render( parentNode );
				}
			}
		}
	};

	Fragment.prototype.resolve = function resolve ( template, callback ) {
		if ( !this.context && this.parent.resolve ) {
			return this.parent.resolve( template, callback );
		}

		var resolver = new ReferenceResolver( this, template, callback );
		this.resolvers.push( resolver );

		return resolver; // so we can e.g. force resolution
	};

	Fragment.prototype.shuffled = function shuffled () {
		this.items.forEach( function ( i ) { return i.shuffled(); } );
	};

	Fragment.prototype.toHtml = function toHtml () {
		return this.toString();
	};

	Fragment.prototype.toString = function toString$1$$ ( escape ) {
		return this.items.map( escape ? toEscapedString : toString$1 ).join( '' );
	};

	Fragment.prototype.unbind = function unbind$1 () {
		this.items.forEach( unbind );
		this.resolvers.forEach( unbind );
		this.bound = false;

		return this;
	};

	Fragment.prototype.unrender = function unrender$1 ( shouldDestroy ) {
		this.items.forEach( shouldDestroy ? unrenderAndDestroy$1 : unrender );
		this.rendered = false;
	};

	Fragment.prototype.update = function update$1 () {
		if ( this.dirty ) {
			if ( !this.updating ) {
				this.dirty = false;
				this.updating = true;
				this.items.forEach( update );
				this.updating = false;
			} else if ( this.isRoot ) {
				runloop.addFragmentToRoot( this );
			}
		}
	};

	Fragment.prototype.valueOf = function valueOf () {
		if ( this.items.length === 1 ) {
			return this.items[0].valueOf();
		}

		if ( this.dirtyValue ) {
			var values = {};
			var source = processItems( this.items, values, this.ractive._guid );
			var parsed = parseJSON( source, values );

			this.value = parsed ?
				parsed.value :
				this.toString();

			this.dirtyValue = false;
		}

		return this.value;
	};

	// TODO should resetTemplate be asynchronous? i.e. should it be a case
	// of outro, update template, intro? I reckon probably not, since that
	// could be achieved with unrender-resetTemplate-render. Also, it should
	// conceptually be similar to resetPartial, which couldn't be async

	function Ractive$resetTemplate ( template ) {
		templateConfigurator.init( null, this, { template: template });

		var transitionsEnabled = this.transitionsEnabled;
		this.transitionsEnabled = false;

		// Is this is a component, we need to set the `shouldDestroy`
		// flag, otherwise it will assume by default that a parent node
		// will be detached, and therefore it doesn't need to bother
		// detaching its own nodes
		var component = this.component;
		if ( component ) component.shouldDestroy = true;
		this.unrender();
		if ( component ) component.shouldDestroy = false;

		// remove existing fragment and create new one
		this.fragment.unbind().unrender( true );

		this.fragment = new Fragment({
			template: this.template,
			root: this,
			owner: this
		});

		var docFrag = createDocumentFragment();
		this.fragment.bind( this.viewmodel ).render( docFrag );

		// if this is a component, its el may not be valid, so find a
		// target based on the component container
		if ( component ) {
			this.fragment.findParentNode().insertBefore( docFrag, component.findNextNode() );
		} else {
			this.el.insertBefore( docFrag, this.anchor );
		}

		this.transitionsEnabled = transitionsEnabled;
	}

	var reverse$1 = makeArrayMethod( 'reverse' ).path;

	function Ractive$set ( keypath, value ) {
		var ractive = this;

		return set( ractive, build( ractive, keypath, value ) );
	}

	var shift$1 = makeArrayMethod( 'shift' ).path;

	var sort$1 = makeArrayMethod( 'sort' ).path;

	var splice$1 = makeArrayMethod( 'splice' ).path;

	function Ractive$subtract ( keypath, d ) {
		return add( this, keypath, ( d === undefined ? -1 : -d ) );
	}

	var teardownHook$1 = new Hook( 'teardown' );

	// Teardown. This goes through the root fragment and all its children, removing observers
	// and generally cleaning up after itself

	function Ractive$teardown () {
		if ( this.torndown ) {
			warnIfDebug( 'ractive.teardown() was called on a Ractive instance that was already torn down' );
			return Promise$1.resolve();
		}

		this.torndown = true;
		this.fragment.unbind();
		this.viewmodel.teardown();

		this._observers.forEach( cancel );

		if ( this.fragment.rendered && this.el.__ractive_instances__ ) {
			removeFromArray( this.el.__ractive_instances__, this );
		}

		this.shouldDestroy = true;
		var promise = ( this.fragment.rendered ? this.unrender() : Promise$1.resolve() );

		teardownHook$1.fire( this );

		return promise;
	}

	function Ractive$toggle ( keypath ) {
		if ( typeof keypath !== 'string' ) {
			throw new TypeError( badArguments );
		}

		return set( this, gather( this, keypath ).map( function ( m ) { return [ m, !m.get() ]; } ) );
	}

	function Ractive$toCSS() {
		var cssIds = [ this.cssId ].concat( this.findAllComponents().map( function ( c ) { return c.cssId; } ) );
		var uniqueCssIds = Object.keys(cssIds.reduce( function ( ids, id ) { return (ids[id] = true, ids); }, {}));
		return getCSS( uniqueCssIds );
	}

	function Ractive$toHTML () {
		return this.fragment.toString( true );
	}

	function toText () {
		return this.fragment.toString( false );
	}

	function Ractive$transition ( name, node, params ) {

		if ( node instanceof HTMLElement ) {
			// good to go
		}
		else if ( isObject( node ) ) {
			// omitted, use event node
			params = node;
		}

		// if we allow query selector, then it won't work
		// simple params like "fast"

		// else if ( typeof node === 'string' ) {
		// 	// query selector
		// 	node = this.find( node )
		// }

		node = node || this.event.node;

		if ( !node || !node._ractive ) {
			fatal( ("No node was supplied for transition " + name) );
		}

		params = params || {};
		var owner = node._ractive.proxy;
		var transition = new Transition({ owner: owner, parentFragment: owner.parentFragment, name: name, params: params });
		transition.bind();

		var promise = runloop.start( this, true );
		runloop.registerTransition( transition );
		runloop.end();

		promise.then( function () { return transition.unbind(); } );
		return promise;
	}

	function unlink$1( here ) {
		var promise = runloop.start();
		this.viewmodel.joinAll( splitKeypathI( here ), { lastLink: false } ).unlink();
		runloop.end();
		return promise;
	}

	var unrenderHook$1 = new Hook( 'unrender' );

	function Ractive$unrender () {
		if ( !this.fragment.rendered ) {
			warnIfDebug( 'ractive.unrender() was called on a Ractive instance that was not rendered' );
			return Promise$1.resolve();
		}

		var promise = runloop.start( this, true );

		// If this is a component, and the component isn't marked for destruction,
		// don't detach nodes from the DOM unnecessarily
		var shouldDestroy = !this.component || this.component.shouldDestroy || this.shouldDestroy;
		this.fragment.unrender( shouldDestroy );

		removeFromArray( this.el.__ractive_instances__, this );

		unrenderHook$1.fire( this );

		runloop.end();
		return promise;
	}

	var unshift$1 = makeArrayMethod( 'unshift' ).path;

	function Ractive$updateModel ( keypath, cascade ) {
		var promise = runloop.start( this, true );

		if ( !keypath ) {
			this.viewmodel.updateFromBindings( true );
		} else {
			this.viewmodel.joinAll( splitKeypathI( keypath ) ).updateFromBindings( cascade !== false );
		}

		runloop.end();

		return promise;
	}

	var proto = {
		add: Ractive$add,
		animate: Ractive$animate,
		detach: Ractive$detach,
		find: Ractive$find,
		findAll: Ractive$findAll,
		findAllComponents: Ractive$findAllComponents,
		findComponent: Ractive$findComponent,
		findContainer: Ractive$findContainer,
		findParent: Ractive$findParent,
		fire: Ractive$fire,
		get: Ractive$get,
		getNodeInfo: getNodeInfo,
		insert: Ractive$insert,
		link: link$1,
		merge: thisRactive$merge,
		observe: observe,
		observeList: observeList,
		observeOnce: observeOnce,
		// TODO reinstate these
		// observeListOnce,
		off: Ractive$off,
		on: Ractive$on,
		once: Ractive$once,
		pop: pop$1,
		push: push$1,
		render: Ractive$render,
		reset: Ractive$reset,
		resetPartial: resetPartial,
		resetTemplate: Ractive$resetTemplate,
		reverse: reverse$1,
		set: Ractive$set,
		shift: shift$1,
		sort: sort$1,
		splice: splice$1,
		subtract: Ractive$subtract,
		teardown: Ractive$teardown,
		toggle: Ractive$toggle,
		toCSS: Ractive$toCSS,
		toCss: Ractive$toCSS,
		toHTML: Ractive$toHTML,
		toHtml: Ractive$toHTML,
		toText: toText,
		transition: Ractive$transition,
		unlink: unlink$1,
		unrender: Ractive$unrender,
		unshift: unshift$1,
		update: Ractive$update,
		updateModel: Ractive$updateModel
	};

	function wrap$1 ( method, superMethod, force ) {

		if ( force || needsSuper( method, superMethod ) )  {

			return function () {

				var hasSuper = ( '_super' in this ), _super = this._super, result;

				this._super = superMethod;

				result = method.apply( this, arguments );

				if ( hasSuper ) {
					this._super = _super;
				}

				return result;
			};
		}

		else {
			return method;
		}
	}

	function needsSuper ( method, superMethod ) {
		return typeof superMethod === 'function' && /_super/.test( method );
	}

	function unwrap ( Child ) {
		var options = {};

		while ( Child ) {
			addRegistries( Child, options );
			addOtherOptions( Child, options );

			if ( Child._Parent !== Ractive ) {
				Child = Child._Parent;
			} else {
				Child = false;
			}
		}

		return options;
	}

	function addRegistries ( Child, options ) {
		registries.forEach( function ( r ) {
			addRegistry(
				r.useDefaults ? Child.prototype : Child,
				options, r.name );
		});
	}

	function addRegistry ( target, options, name ) {
		var registry, keys = Object.keys( target[ name ] );

		if ( !keys.length ) { return; }

		if ( !( registry = options[ name ] ) ) {
			registry = options[ name ] = {};
		}

		keys
			.filter( function ( key ) { return !( key in registry ); } )
			.forEach( function ( key ) { return registry[ key ] = target[ name ][ key ]; } );
	}

	function addOtherOptions ( Child, options ) {
		Object.keys( Child.prototype ).forEach( function ( key ) {
			if ( key === 'computed' ) { return; }

			var value = Child.prototype[ key ];

			if ( !( key in options ) ) {
				options[ key ] = value._method ? value._method : value;
			}

			// is it a wrapped function?
			else if ( typeof options[ key ] === 'function'
					&& typeof value === 'function'
					&& options[ key ]._method ) {

				var result, needsSuper = value._method;

				if ( needsSuper ) { value = value._method; }

				// rewrap bound directly to parent fn
				result = wrap$1( options[ key ]._method, value );

				if ( needsSuper ) { result._method = result; }

				options[ key ] = result;
			}
		});
	}

	function extend () {
		var options = [], len = arguments.length;
		while ( len-- ) options[ len ] = arguments[ len ];

		if( !options.length ) {
			return extendOne( this );
		} else {
			return options.reduce( extendOne, this );
		}
	}

	function extendOne ( Parent, options ) {
		if ( options === void 0 ) options = {};

		var Child, proto;

		// if we're extending with another Ractive instance...
		//
		//   var Human = Ractive.extend(...), Spider = Ractive.extend(...);
		//   var Spiderman = Human.extend( Spider );
		//
		// ...inherit prototype methods and default options as well
		if ( options.prototype instanceof Ractive ) {
			options = unwrap( options );
		}

		Child = function ( options ) {
			if ( !( this instanceof Child ) ) return new Child( options );

			construct( this, options || {} );
			initialise( this, options || {}, {} );
		};

		proto = create( Parent.prototype );
		proto.constructor = Child;

		// Static properties
		defineProperties( Child, {
			// alias prototype as defaults
			defaults: { value: proto },

			// extendable
			extend: { value: extend, writable: true, configurable: true },

			// Parent - for IE8, can't use Object.getPrototypeOf
			_Parent: { value: Parent }
		});

		// extend configuration
		config.extend( Parent, proto, options );

		dataConfigurator.extend( Parent, proto, options );

		if ( options.computed ) {
			proto.computed = extendObj( create( Parent.prototype.computed ), options.computed );
		}

		Child.prototype = proto;

		return Child;
	}

	function joinKeys () {
		var keys = [], len = arguments.length;
		while ( len-- ) keys[ len ] = arguments[ len ];

		return keys.map( escapeKey ).join( '.' );
	}

	function splitKeypath ( keypath ) {
		return splitKeypathI( keypath ).map( unescapeKey );
	}

	// Ractive.js makes liberal use of things like Array.prototype.indexOf. In
	// older browsers, these are made available via a shim - here, we do a quick
	// pre-flight check to make sure that either a) we're not in a shit browser,
	// or b) we're using a Ractive-legacy.js build
	var FUNCTION = 'function';

	if (
		typeof Date.now !== FUNCTION                 ||
		typeof String.prototype.trim !== FUNCTION    ||
		typeof Object.keys !== FUNCTION              ||
		typeof Array.prototype.indexOf !== FUNCTION  ||
		typeof Array.prototype.forEach !== FUNCTION  ||
		typeof Array.prototype.map !== FUNCTION      ||
		typeof Array.prototype.filter !== FUNCTION   ||
		( win && typeof win.addEventListener !== FUNCTION )
	) {
		throw new Error( 'It looks like you\'re attempting to use Ractive.js in an older browser. You\'ll need to use one of the \'legacy builds\' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.' );
	}

	function Ractive ( options ) {
		if ( !( this instanceof Ractive ) ) return new Ractive( options );

		construct( this, options || {} );
		initialise( this, options || {}, {} );
	}

	extendObj( Ractive.prototype, proto, defaults );
	Ractive.prototype.constructor = Ractive;

	// alias prototype as `defaults`
	Ractive.defaults = Ractive.prototype;

	// static properties
	defineProperties( Ractive, {

		// debug flag
		DEBUG:          { writable: true, value: true },
		DEBUG_PROMISES: { writable: true, value: true },

		// static methods:
		extend:         { value: extend },
		escapeKey:      { value: escapeKey },
		getNodeInfo:    { value: staticInfo },
		joinKeys:       { value: joinKeys },
		parse:          { value: parse },
		splitKeypath:   { value: splitKeypath },
		unescapeKey:    { value: unescapeKey },
		getCSS:         { value: getCSS },

		// namespaced constructors
		Promise:        { value: Promise$1 },

		// support
		enhance:        { writable: true, value: false },
		svg:            { value: svg },
		magic:          { value: magicSupported },

		// version
		VERSION:        { value: '0.8.15-edge-029c025d1a822ef4a7b30c34a04eb6e80bd2bd2d' },

		// plugins
		adaptors:       { writable: true, value: {} },
		components:     { writable: true, value: {} },
		decorators:     { writable: true, value: {} },
		easing:         { writable: true, value: easing },
		events:         { writable: true, value: {} },
		interpolators:  { writable: true, value: interpolators },
		partials:       { writable: true, value: {} },
		transitions:    { writable: true, value: {} }
	});

	return Ractive;

}));