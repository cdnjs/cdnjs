
/* Release Date: Sep-17-2025 
Copyright (c) 2011-2025 jQWidgets. 
License: https://jqwidgets.com/license/ */


/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};

/* Release Date: Sep-17-2025 
Copyright (c) 2011-2025 jQWidgets. 
License: https://jqwidgets.com/license/ */


/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5459:
/***/ ((module, exports, __nested_webpack_require_227__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* tslint:disable */
/* eslint-disable */
(function () {
	if (typeof document === 'undefined') {
		return;
	}

	var oldBrowser = document.all && !document.addEventListener;
	if (!oldBrowser) {
		(function (window, undefined) {
			var
				rootJQXLite,
				readyList,
				document = window.document,
				location = window.location,
				navigator = window.navigator,
				_JQXLite = window.JQXLite,
				_$ = window.$,

				// Save a reference to some core methods
				core_push = Array.prototype.push,
				core_slice = Array.prototype.slice,
				core_indexOf = Array.prototype.indexOf,
				core_toString = Object.prototype.toString,
				core_hasOwn = Object.prototype.hasOwnProperty,
				core_trim = String.prototype.trim,

				// Define a local copy of JQXLite
				JQXLite = function (selector, context) {
					// The JQXLite object is actually just the init constructor 'enhanced'
					return new JQXLite.fn.init(selector, context, rootJQXLite);
				},

				// Used for matching numbers
				core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

				// Used for detecting and trimming whitespace
				core_rnotwhite = /\S/,
				core_rspace = /\s+/,

				// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
				rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

				// A simple way to check for HTML strings
				// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
				rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

				// Match a standalone tag
				rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

				// JSON RegExp
				rvalidchars = /^[\],:{}\s]*$/,
				rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
				rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
				rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

				// Matches dashed string for camelizing
				rmsPrefix = /^-ms-/,
				rdashAlpha = /-([\da-z])/gi,

				// Used by JQXLite.camelCase as callback to replace()
				fcamelCase = function (all, letter) {
					return (letter + "").toUpperCase();
				},

				// The ready event handler and self cleanup method
				DOMContentLoaded = function () {
					if (document.addEventListener) {
						document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
						JQXLite.ready();
					} else if (document.readyState === "complete") {
						// we're here because readyState === "complete" in oldIE
						// which is good enough for us to call the dom ready!
						document.detachEvent("onreadystatechange", DOMContentLoaded);
						JQXLite.ready();
					}
				},

				// [[Class]] -> type pairs
				class2type = {};

			JQXLite.fn = JQXLite.prototype = {
				constructor: JQXLite,
				init: function (selector, context, rootJQXLite) {
					var match, elem, ret, doc;

					// Handle $(""), $(null), $(undefined), $(false)
					if (!selector) {
						return this;
					}

					// Handle $(DOMElement)
					if (selector.nodeType) {
						this.context = this[0] = selector;
						this.length = 1;
						return this;
					}

					// Handle HTML strings
					if (typeof selector === "string") {
						if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
							// Assume that strings that start and end with <> are HTML and skip the regex check
							match = [null, selector, null];

						} else {
							match = rquickExpr.exec(selector);
						}

						// Match html or make sure no context is specified for #id
						if (match && (match[1] || !context)) {

							// HANDLE: $(html) -> $(array)
							if (match[1]) {
								context = context instanceof JQXLite ? context[0] : context;
								doc = (context && context.nodeType ? context.ownerDocument || context : document);

								// scripts is true for back-compat
								selector = JQXLite.parseHTML(match[1], doc, true);
								if (rsingleTag.test(match[1]) && JQXLite.isPlainObject(context)) {
									this.attr.call(selector, context, true);
								}

								return JQXLite.merge(this, selector);

								// HANDLE: $(#id)
							} else {
								elem = document.getElementById(match[2]);

								// Check parentNode to catch when Blackberry 4.6 returns
								// nodes that are no longer in the document #6963
								if (elem && elem.parentNode) {
									// Handle the case where IE and Opera return items
									// by name instead of ID
									if (elem.id !== match[2]) {
										return rootJQXLite.find(selector);
									}

									// Otherwise, we inject the element directly into the JQXLite object
									this.length = 1;
									this[0] = elem;
								}

								this.context = document;
								this.selector = selector;
								return this;
							}

							// HANDLE: $(expr, $(...))
						} else if (!context || context.jqx) {
							return (context || rootJQXLite).find(selector);

							// HANDLE: $(expr, context)
							// (which is just equivalent to: $(context).find(expr)
						} else {
							return this.constructor(context).find(selector);
						}

						// HANDLE: $(function)
						// Shortcut for document ready
					} else if (JQXLite.isFunction(selector)) {
						return rootJQXLite.ready(selector);
					}

					if (selector.selector !== undefined) {
						this.selector = selector.selector;
						this.context = selector.context;
					}

					return JQXLite.makeArray(selector, this);
				},

				// Start with an empty selector
				selector: "",

				// The current version of JQXLite being used
				jqx: "4.5.0",

				// The default length of a JQXLite object is 0
				length: 0,

				// The number of elements contained in the matched element set
				size: function () {
					return this.length;
				},

				toArray: function () {
					return core_slice.call(this);
				},

				// Get the Nth element in the matched element set OR
				// Get the whole matched element set as a clean array
				get: function (num) {
					return num == null ?

						// Return a 'clean' array
						this.toArray() :

						// Return just the object
						(num < 0 ? this[this.length + num] : this[num]);
				},

				// Take an array of elements and push it onto the stack
				// (returning the new matched element set)
				pushStack: function (elems, name, selector) {

					// Build a new JQXLite matched element set
					var ret = JQXLite.merge(this.constructor(), elems);

					// Add the old object onto the stack (as a reference)
					ret.prevObject = this;

					ret.context = this.context;

					if (name === "find") {
						ret.selector = this.selector + (this.selector ? " " : "") + selector;
					} else if (name) {
						ret.selector = this.selector + "." + name + "(" + selector + ")";
					}

					// Return the newly-formed element set
					return ret;
				},

				// Execute a callback for every element in the matched set.
				// (You can seed the arguments with an array of args, but this is
				// only used internally.)
				each: function (callback, args) {
					return JQXLite.each(this, callback, args);
				},

				ready: function (fn) {
					// Add the callback
					JQXLite.ready.promise().done(fn);

					return this;
				},

				eq: function (i) {
					i = +i;
					return i === -1 ?
						this.slice(i) :
						this.slice(i, i + 1);
				},

				first: function () {
					return this.eq(0);
				},

				last: function () {
					return this.eq(-1);
				},

				slice: function () {
					return this.pushStack(core_slice.apply(this, arguments),
						"slice", core_slice.call(arguments).join(","));
				},

				map: function (callback) {
					return this.pushStack(JQXLite.map(this, function (elem, i) {
						return callback.call(elem, i, elem);
					}));
				},

				end: function () {
					return this.prevObject || this.constructor(null);
				},

				// For internal use only.
				// Behaves like an Array's method, not like a JQXLite method.
				push: core_push,
				sort: [].sort,
				splice: [].splice
			};

			// Give the init function the JQXLite prototype for later instantiation
			JQXLite.fn.init.prototype = JQXLite.fn;

			JQXLite.extend = JQXLite.fn.extend = function () {
				var options, name, src, copy, copyIsArray, clone,
					target = arguments[0] || {},
					i = 1,
					length = arguments.length,
					deep = false;

				// Handle a deep copy situation
				if (typeof target === "boolean") {
					deep = target;
					target = arguments[1] || {};
					// skip the boolean and the target
					i = 2;
				}

				// Handle case when target is a string or something (possible in deep copy)
				if (typeof target !== "object" && !JQXLite.isFunction(target)) {
					target = {};
				}

				// extend JQXLite itself if only one argument is passed
				if (length === i) {
					target = this;
					--i;
				}

				for (; i < length; i++) {
					// Only deal with non-null/undefined values
					if ((options = arguments[i]) != null) {
						// Extend the base object
						for (name in options) {
							src = target[name];
							copy = options[name];

							// Prevent never-ending loop
							if (target === copy) {
								continue;
							}

							// Recurse if we're merging plain objects or arrays
							if (deep && copy && (JQXLite.isPlainObject(copy) || (copyIsArray = JQXLite.isArray(copy)))) {
								if (copyIsArray) {
									copyIsArray = false;
									clone = src && JQXLite.isArray(src) ? src : [];

								} else {
									clone = src && JQXLite.isPlainObject(src) ? src : {};
								}

								// Never move original objects, clone them
								target[name] = JQXLite.extend(deep, clone, copy);

								// Don't bring in undefined values
							} else if (copy !== undefined) {
								target[name] = copy;
							}
						}
					}
				}

				// Return the modified object
				return target;
			};

			JQXLite.extend({
				noConflict: function (deep) {
					if (window.$ === JQXLite) {
						window.$ = _$;
					}

					if (deep && window.JQXLite === JQXLite) {
						window.JQXLite = _JQXLite;
					}

					return JQXLite;
				},

				// Is the DOM ready to be used? Set to true once it occurs.
				isReady: false,

				// A counter to track how many items to wait for before
				// the ready event fires. See #6781
				readyWait: 1,

				// Hold (or release) the ready event
				holdReady: function (hold) {
					if (hold) {
						JQXLite.readyWait++;
					} else {
						JQXLite.ready(true);
					}
				},

				// Handle when the DOM is ready
				ready: function (wait) {

					// Abort if there are pending holds or we're already ready
					if (wait === true ? --JQXLite.readyWait : JQXLite.isReady) {
						return;
					}

					// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
					if (!document.body) {
						return setTimeout(JQXLite.ready, 1);
					}

					// Remember that the DOM is ready
					JQXLite.isReady = true;

					// If a normal DOM Ready event fired, decrement, and wait if need be
					if (wait !== true && --JQXLite.readyWait > 0) {
						return;
					}

					// If there are functions bound, to execute
					readyList.resolveWith(document, [JQXLite]);

					// Trigger any bound ready events
					if (JQXLite.fn.trigger) {
						JQXLite(document).trigger("ready").off("ready");
					}
				},

				// See test/unit/core.js for details concerning isFunction.
				// Since version 1.3, DOM methods and functions like alert
				// aren't supported. They return false on IE (#2968).
				isFunction: function (obj) {
					return JQXLite.type(obj) === "function";
				},

				isArray: Array.isArray || function (obj) {
					return JQXLite.type(obj) === "array";
				},

				isWindow: function (obj) {
					return obj != null && obj == obj.window;
				},

				isNumeric: function (obj) {
					return !isNaN(parseFloat(obj)) && isFinite(obj);
				},

				type: function (obj) {
					return obj == null ?
						String(obj) :
						class2type[core_toString.call(obj)] || "object";
				},

				isPlainObject: function (obj) {
					// Must be an Object.
					// Because of IE, we also have to check the presence of the constructor property.
					// Make sure that DOM nodes and window objects don't pass through, as well
					if (!obj || JQXLite.type(obj) !== "object" || obj.nodeType || JQXLite.isWindow(obj)) {
						return false;
					}

					try {
						// Not own constructor property must be Object
						if (obj.constructor &&
							!core_hasOwn.call(obj, "constructor") &&
							!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
							return false;
						}
					} catch (e) {
						// IE8,9 Will throw exceptions on certain host objects #9897
						return false;
					}

					// Own properties are enumerated firstly, so to speed up,
					// if last one is own, then all properties are own.

					var key;
					for (key in obj) { }

					return key === undefined || core_hasOwn.call(obj, key);
				},

				isEmptyObject: function (obj) {
					var name;
					for (name in obj) {
						return false;
					}
					return true;
				},

				error: function (msg) {
					throw new Error(msg);
				},

				// data: string of html
				// context (optional): If specified, the fragment will be created in this context, defaults to document
				// scripts (optional): If true, will include scripts passed in the html string
				parseHTML: function (data, context, scripts) {
					var parsed;
					if (!data || typeof data !== "string") {
						return null;
					}
					if (typeof context === "boolean") {
						scripts = context;
						context = 0;
					}
					context = context || document;

					// Single tag
					if ((parsed = rsingleTag.exec(data))) {
						return [context.createElement(parsed[1])];
					}

					parsed = JQXLite.buildFragment([data], context, scripts ? null : []);
					return JQXLite.merge([],
						(parsed.cacheable ? JQXLite.clone(parsed.fragment) : parsed.fragment).childNodes);
				},

				parseJSON: function (data) {
					if (!data || typeof data !== "string") {
						return null;
					}

					// Make sure leading/trailing whitespace is removed (IE can't handle it)
					data = JQXLite.trim(data);

					// Attempt to parse using the native JSON parser first
					if (window.JSON && window.JSON.parse) {
						return window.JSON.parse(data);
					}

					// Make sure the incoming data is actual JSON
					// Logic borrowed from http://json.org/json2.js
					if (rvalidchars.test(data.replace(rvalidescape, "@")
						.replace(rvalidtokens, "]")
						.replace(rvalidbraces, ""))) {

						return (new Function("return " + data))();

					}
					JQXLite.error("Invalid JSON: " + data);
				},

				// Cross-browser xml parsing
				parseXML: function (data) {
					var xml, tmp;
					if (!data || typeof data !== "string") {
						return null;
					}
					try {
						if (window.DOMParser) { // Standard
							tmp = new DOMParser();
							xml = tmp.parseFromString(data, "text/xml");
						} else { // IE
							xml = new ActiveXObject("Microsoft.XMLDOM");
							xml.async = "false";
							xml.loadXML(data);
						}
					} catch (e) {
						xml = undefined;
					}
					if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
						JQXLite.error("Invalid XML: " + data);
					}
					return xml;
				},

				noop: function () { },

				// Evaluates a script in a global context
				// Workarounds based on findings by Jim Driscoll
				// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
				globalEval: function (data) {
					if (data && core_rnotwhite.test(data)) {
						// We use execScript on Internet Explorer
						// We use an anonymous function so that context is window
						// rather than JQXLite in Firefox
						(window.execScript || function (data) {
							window["eval"].call(window, data);
						})(data);
					}
				},

				// Convert dashed to camelCase; used by the css and data modules
				// Microsoft forgot to hump their vendor prefix (#9572)
				camelCase: function (string) {
					return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
				},

				nodeName: function (elem, name) {
					return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
				},

				// args is for internal usage only
				each: function (obj, callback, args) {
					var name,
						i = 0,
						length = obj.length,
						isObj = length === undefined || JQXLite.isFunction(obj);

					if (args) {
						if (isObj) {
							for (name in obj) {
								if (callback.apply(obj[name], args) === false) {
									break;
								}
							}
						} else {
							for (; i < length;) {
								if (callback.apply(obj[i++], args) === false) {
									break;
								}
							}
						}

						// A special, fast, case for the most common use of each
					} else {
						if (isObj) {
							for (name in obj) {
								if (callback.call(obj[name], name, obj[name]) === false) {
									break;
								}
							}
						} else {
							for (; i < length;) {
								if (callback.call(obj[i], i, obj[i++]) === false) {
									break;
								}
							}
						}
					}

					return obj;
				},

				// Use native String.trim function wherever possible
				trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
					function (text) {
						return text == null ?
							"" :
							core_trim.call(text);
					} :

					// Otherwise use our own trimming functionality
					function (text) {
						return text == null ?
							"" :
							(text + "").replace(rtrim, "");
					},

				// results is for internal usage only
				makeArray: function (arr, results) {
					var type,
						ret = results || [];

					if (arr != null) {
						// The window, strings (and functions) also have 'length'
						// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
						type = JQXLite.type(arr);

						if (arr.length == null || type === "string" || type === "function" || type === "regexp" || JQXLite.isWindow(arr)) {
							core_push.call(ret, arr);
						} else {
							JQXLite.merge(ret, arr);
						}
					}

					return ret;
				},

				inArray: function (elem, arr, i) {
					var len;

					if (arr) {
						if (core_indexOf) {
							return core_indexOf.call(arr, elem, i);
						}

						len = arr.length;
						i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

						for (; i < len; i++) {
							// Skip accessing in sparse arrays
							if (i in arr && arr[i] === elem) {
								return i;
							}
						}
					}

					return -1;
				},

				merge: function (first, second) {
					var l = second.length,
						i = first.length,
						j = 0;

					if (typeof l === "number") {
						for (; j < l; j++) {
							first[i++] = second[j];
						}

					} else {
						while (second[j] !== undefined) {
							first[i++] = second[j++];
						}
					}

					first.length = i;

					return first;
				},

				grep: function (elems, callback, inv) {
					var retVal,
						ret = [],
						i = 0,
						length = elems.length;
					inv = !!inv;

					// Go through the array, only saving the items
					// that pass the validator function
					for (; i < length; i++) {
						retVal = !!callback(elems[i], i);
						if (inv !== retVal) {
							ret.push(elems[i]);
						}
					}

					return ret;
				},

				// arg is for internal usage only
				map: function (elems, callback, arg) {
					var value, key,
						ret = [],
						i = 0,
						length = elems.length,
						// jqx objects are treated as arrays
						isArray = elems instanceof JQXLite || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || JQXLite.isArray(elems));

					// Go through the array, translating each of the items to their
					if (isArray) {
						for (; i < length; i++) {
							value = callback(elems[i], i, arg);

							if (value != null) {
								ret[ret.length] = value;
							}
						}

						// Go through every key on the object,
					} else {
						for (key in elems) {
							value = callback(elems[key], key, arg);

							if (value != null) {
								ret[ret.length] = value;
							}
						}
					}

					// Flatten any nested arrays
					return ret.concat.apply([], ret);
				},

				// A global GUID counter for objects
				guid: 1,

				// Bind a function to a context, optionally partially applying any
				// arguments.
				proxy: function (fn, context) {
					var tmp, args, proxy;

					if (typeof context === "string") {
						tmp = fn[context];
						context = fn;
						fn = tmp;
					}

					// Quick check to determine if target is callable, in the spec
					// this throws a TypeError, but we will just return undefined.
					if (!JQXLite.isFunction(fn)) {
						return undefined;
					}

					// Simulated bind
					args = core_slice.call(arguments, 2);
					proxy = function () {
						return fn.apply(context, args.concat(core_slice.call(arguments)));
					};

					// Set the guid of unique handler to the same of original handler, so it can be removed
					proxy.guid = fn.guid = fn.guid || JQXLite.guid++;

					return proxy;
				},

				// Multifunctional method to get and set values of a collection
				// The value/s can optionally be executed if it's a function
				access: function (elems, fn, key, value, chainable, emptyGet, pass) {
					var exec,
						bulk = key == null,
						i = 0,
						length = elems.length;

					// Sets many values
					if (key && typeof key === "object") {
						for (i in key) {
							JQXLite.access(elems, fn, i, key[i], 1, emptyGet, value);
						}
						chainable = 1;

						// Sets one value
					} else if (value !== undefined) {
						// Optionally, function values get executed if exec is true
						exec = pass === undefined && JQXLite.isFunction(value);

						if (bulk) {
							// Bulk operations only iterate when executing function values
							if (exec) {
								exec = fn;
								fn = function (elem, key, value) {
									return exec.call(JQXLite(elem), value);
								};

								// Otherwise they run against the entire set
							} else {
								fn.call(elems, value);
								fn = null;
							}
						}

						if (fn) {
							for (; i < length; i++) {
								fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
							}
						}

						chainable = 1;
					}

					return chainable ?
						elems :

						// Gets
						bulk ?
							fn.call(elems) :
							length ? fn(elems[0], key) : emptyGet;
				},

				now: function () {
					return (new Date()).getTime();
				}
			});

			JQXLite.ready.promise = function (obj) {
				if (!readyList) {

					readyList = JQXLite.Deferred();

					// Catch cases where $(document).ready() is called after the browser event has already occurred.
					// we once tried to use readyState "interactive" here, but it caused issues like the one
					// discovered by ChrisS here: http://bugs.jqx.com/ticket/12282#comment:15
					if (document.readyState === "complete") {
						// Handle it asynchronously to allow scripts the opportunity to delay ready
						setTimeout(JQXLite.ready, 1);

						// Standards-based browsers support DOMContentLoaded
					} else if (document.addEventListener) {
						// Use the handy event callback
						document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

						// A fallback to window.onload, that will always work
						window.addEventListener("load", JQXLite.ready, false);

						// If IE event model is used
					} else {
						// Ensure firing before onload, maybe late but safe also for iframes
						document.attachEvent("onreadystatechange", DOMContentLoaded);

						// A fallback to window.onload, that will always work
						window.attachEvent("onload", JQXLite.ready);

						// If IE and not a frame
						// continually check to see if the document is ready
						var top = false;

						try {
							top = window.frameElement == null && document.documentElement;
						} catch (e) { }

						if (top && top.doScroll) {
							(function doScrollCheck() {
								if (!JQXLite.isReady) {

									try {
										// Use the trick by Diego Perini
										// http://javascript.nwbox.com/IEContentLoaded/
										top.doScroll("left");
									} catch (e) {
										return setTimeout(doScrollCheck, 50);
									}

									// and execute any waiting functions
									JQXLite.ready();
								}
							})();
						}
					}
				}
				return readyList.promise(obj);
			};

			// Populate the class2type map
			JQXLite.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
				class2type["[object " + name + "]"] = name.toLowerCase();
			});

			// All JQXLite objects should point back to these
			rootJQXLite = JQXLite(document);
			// String to Object options format cache
			var optionsCache = {};

			// Convert String-formatted options into Object-formatted ones and store in cache
			function createOptions(options) {
				var object = optionsCache[options] = {};
				JQXLite.each(options.split(core_rspace), function (_, flag) {
					object[flag] = true;
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
			JQXLite.Callbacks = function (options) {

				// Convert options from String-formatted to Object-formatted if needed
				// (we check in cache first)
				options = typeof options === "string" ?
					(optionsCache[options] || createOptions(options)) :
					JQXLite.extend({}, options);

				var // Last fire value (for non-forgettable lists)
					memory,
					// Flag to know if list was already fired
					fired,
					// Flag to know if list is currently firing
					firing,
					// First callback to fire (used internally by add and fireWith)
					firingStart,
					// End of the loop when firing
					firingLength,
					// Index of currently firing callback (modified by remove if needed)
					firingIndex,
					// Actual callback list
					list = [],
					// Stack of fire calls for repeatable lists
					stack = !options.once && [],
					// Fire callbacks
					fire = function (data) {
						memory = options.memory && data;
						fired = true;
						firingIndex = firingStart || 0;
						firingStart = 0;
						firingLength = list.length;
						firing = true;
						for (; list && firingIndex < firingLength; firingIndex++) {
							if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
								memory = false; // To prevent further calls using add
								break;
							}
						}
						firing = false;
						if (list) {
							if (stack) {
								if (stack.length) {
									fire(stack.shift());
								}
							} else if (memory) {
								list = [];
							} else {
								self.disable();
							}
						}
					},
					// Actual Callbacks object
					self = {
						// Add a callback or a collection of callbacks to the list
						add: function () {
							if (list) {
								// First, we save the current length
								var start = list.length;
								(function add(args) {
									JQXLite.each(args, function (_, arg) {
										var type = JQXLite.type(arg);
										if (type === "function") {
											if (!options.unique || !self.has(arg)) {
												list.push(arg);
											}
										} else if (arg && arg.length && type !== "string") {
											// Inspect recursively
											add(arg);
										}
									});
								})(arguments);
								// Do we need to add the callbacks to the
								// current firing batch?
								if (firing) {
									firingLength = list.length;
									// With memory, if we're not firing then
									// we should call right away
								} else if (memory) {
									firingStart = start;
									fire(memory);
								}
							}
							return this;
						},
						// Remove a callback from the list
						remove: function () {
							if (list) {
								JQXLite.each(arguments, function (_, arg) {
									var index;
									while ((index = JQXLite.inArray(arg, list, index)) > -1) {
										list.splice(index, 1);
										// Handle firing indexes
										if (firing) {
											if (index <= firingLength) {
												firingLength--;
											}
											if (index <= firingIndex) {
												firingIndex--;
											}
										}
									}
								});
							}
							return this;
						},
						// Control if a given callback is in the list
						has: function (fn) {
							return JQXLite.inArray(fn, list) > -1;
						},
						// Remove all callbacks from the list
						empty: function () {
							list = [];
							return this;
						},
						// Have the list do nothing anymore
						disable: function () {
							list = stack = memory = undefined;
							return this;
						},
						// Is it disabled?
						disabled: function () {
							return !list;
						},
						// Lock the list in its current state
						lock: function () {
							stack = undefined;
							if (!memory) {
								self.disable();
							}
							return this;
						},
						// Is it locked?
						locked: function () {
							return !stack;
						},
						// Call all callbacks with the given context and arguments
						fireWith: function (context, args) {
							args = args || [];
							args = [context, args.slice ? args.slice() : args];
							if (list && (!fired || stack)) {
								if (firing) {
									stack.push(args);
								} else {
									fire(args);
								}
							}
							return this;
						},
						// Call all the callbacks with the given arguments
						fire: function () {
							self.fireWith(this, arguments);
							return this;
						},
						// To know if the callbacks have already been called at least once
						fired: function () {
							return !!fired;
						}
					};

				return self;
			};
			JQXLite.extend({

				Deferred: function (func) {
					var tuples = [
						// action, add listener, listener list, final state
						["resolve", "done", JQXLite.Callbacks("once memory"), "resolved"],
						["reject", "fail", JQXLite.Callbacks("once memory"), "rejected"],
						["notify", "progress", JQXLite.Callbacks("memory")]
					],
						state = "pending",
						promise = {
							state: function () {
								return state;
							},
							always: function () {
								deferred.done(arguments).fail(arguments);
								return this;
							},
							then: function ( /* fnDone, fnFail, fnProgress */) {
								var fns = arguments;
								return JQXLite.Deferred(function (newDefer) {
									JQXLite.each(tuples, function (i, tuple) {
										var action = tuple[0],
											fn = fns[i];
										// deferred[ done | fail | progress ] for forwarding actions to newDefer
										deferred[tuple[1]](JQXLite.isFunction(fn) ?
											function () {
												var returned = fn.apply(this, arguments);
												if (returned && JQXLite.isFunction(returned.promise)) {
													returned.promise()
														.done(newDefer.resolve)
														.fail(newDefer.reject)
														.progress(newDefer.notify);
												} else {
													newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
												}
											} :
											newDefer[action]
										);
									});
									fns = null;
								}).promise();
							},
							// Get a promise for this deferred
							// If obj is provided, the promise aspect is added to the object
							promise: function (obj) {
								return obj != null ? JQXLite.extend(obj, promise) : promise;
							}
						},
						deferred = {};

					// Keep pipe for back-compat
					promise.pipe = promise.then;

					// Add list-specific methods
					JQXLite.each(tuples, function (i, tuple) {
						var list = tuple[2],
							stateString = tuple[3];

						// promise[ done | fail | progress ] = list.add
						promise[tuple[1]] = list.add;

						// Handle state
						if (stateString) {
							list.add(function () {
								// state = [ resolved | rejected ]
								state = stateString;

								// [ reject_list | resolve_list ].disable; progress_list.lock
							}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
						}

						// deferred[ resolve | reject | notify ] = list.fire
						deferred[tuple[0]] = list.fire;
						deferred[tuple[0] + "With"] = list.fireWith;
					});

					// Make the deferred a promise
					promise.promise(deferred);

					// Call given func if any
					if (func) {
						func.call(deferred, deferred);
					}

					// All done!
					return deferred;
				},

				// Deferred helper
				when: function (subordinate /* , ..., subordinateN */) {
					var i = 0,
						resolveValues = core_slice.call(arguments),
						length = resolveValues.length,

						// the count of uncompleted subordinates
						remaining = length !== 1 || (subordinate && JQXLite.isFunction(subordinate.promise)) ? length : 0,

						// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
						deferred = remaining === 1 ? subordinate : JQXLite.Deferred(),

						// Update function for both resolve and progress values
						updateFunc = function (i, contexts, values) {
							return function (value) {
								contexts[i] = this;
								values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
								if (values === progressValues) {
									deferred.notifyWith(contexts, values);
								} else if (!(--remaining)) {
									deferred.resolveWith(contexts, values);
								}
							};
						},

						progressValues, progressContexts, resolveContexts;

					// add listeners to Deferred subordinates; treat others as resolved
					if (length > 1) {
						progressValues = new Array(length);
						progressContexts = new Array(length);
						resolveContexts = new Array(length);
						for (; i < length; i++) {
							if (resolveValues[i] && JQXLite.isFunction(resolveValues[i].promise)) {
								resolveValues[i].promise()
									.done(updateFunc(i, resolveContexts, resolveValues))
									.fail(deferred.reject)
									.progress(updateFunc(i, progressContexts, progressValues));
							} else {
								--remaining;
							}
						}
					}

					// if we're not waiting on anything, resolve the master
					if (!remaining) {
						deferred.resolveWith(resolveContexts, resolveValues);
					}

					return deferred.promise();
				}
			});
			JQXLite.support = (function () {

				var support,
					all,
					a,
					select,
					opt,
					input,
					fragment,
					eventName,
					i,
					isSupported,
					clickFn,
					div = document.createElement("div");

				// Setup
				div.setAttribute("className", "t");
				div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

				// Support tests won't run in some limited or non-browser environments
				all = div.getElementsByTagName("*");
				a = div.getElementsByTagName("a")[0];
				if (!all || !a || !all.length) {
					return {};
				}

				// First batch of tests
				select = document.createElement("select");
				opt = select.appendChild(document.createElement("option"));
				input = div.getElementsByTagName("input")[0];

				a.style.cssText = "top:1px;float:left;opacity:.5";
				support = {
					// IE strips leading whitespace when .innerHTML is used
					leadingWhitespace: (div.firstChild.nodeType === 3),

					// Make sure that tbody elements aren't automatically inserted
					// IE will insert them into empty tables
					tbody: !div.getElementsByTagName("tbody").length,

					// Make sure that link elements get serialized correctly by innerHTML
					// This requires a wrapper element in IE
					htmlSerialize: !!div.getElementsByTagName("link").length,

					// Get the style information from getAttribute
					// (IE uses .cssText instead)
					style: /top/.test(a.getAttribute("style")),

					// Make sure that URLs aren't manipulated
					// (IE normalizes it by default)
					hrefNormalized: (a.getAttribute("href") === "/a"),

					// Make sure that element opacity exists
					// (IE uses filter instead)
					// Use a regex to work around a WebKit issue. See #5145
					opacity: /^0.5/.test(a.style.opacity),

					// Verify style float existence
					// (IE uses styleFloat instead of cssFloat)
					cssFloat: !!a.style.cssFloat,

					// Make sure that if no value is specified for a checkbox
					// that it defaults to "on".
					// (WebKit defaults to "" instead)
					checkOn: (input.value === "on"),

					// Make sure that a selected-by-default option has a working selected property.
					// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
					optSelected: opt.selected,

					// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
					getSetAttribute: div.className !== "t",

					// Tests for enctype support on a form (#6743)
					enctype: !!document.createElement("form").enctype,

					// Makes sure cloning an html5 element does not cause problems
					// Where outerHTML is undefined, this still works
					html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",

					// JQXLite.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
					boxModel: (document.compatMode === "CSS1Compat"),

					// Will be defined later
					submitBubbles: true,
					changeBubbles: true,
					focusinBubbles: false,
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
				support.noCloneChecked = input.cloneNode(true).checked;

				// Make sure that the options inside disabled selects aren't marked as disabled
				// (WebKit marks them as disabled)
				select.disabled = true;
				support.optDisabled = !opt.disabled;

				// Test to see if it's possible to delete an expando from an element
				// Fails in Internet Explorer
				try {
					delete div.test;
				} catch (e) {
					support.deleteExpando = false;
				}

				if (!div.addEventListener && div.attachEvent && div.fireEvent) {
					div.attachEvent("onclick", clickFn = function () {
						// Cloning a node shouldn't copy over any
						// bound event handlers (IE does this)
						support.noCloneEvent = false;
					});
					div.cloneNode(true).fireEvent("onclick");
					div.detachEvent("onclick", clickFn);
				}

				// Check if a radio maintains its value
				// after being appended to the DOM
				input = document.createElement("input");
				input.value = "t";
				input.setAttribute("type", "radio");
				support.radioValue = input.value === "t";

				input.setAttribute("checked", "checked");

				// #11217 - WebKit loses check when the name is after the checked attribute
				input.setAttribute("name", "t");

				div.appendChild(input);
				fragment = document.createDocumentFragment();
				fragment.appendChild(div.lastChild);

				// WebKit doesn't clone checked state correctly in fragments
				support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

				// Check if a disconnected checkbox will retain its checked
				// value of true after appended to the DOM (IE6/7)
				support.appendChecked = input.checked;

				fragment.removeChild(input);
				fragment.appendChild(div);

				// Technique from Juriy Zaytsev
				// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
				// We only care about the case where non-standard event systems
				// are used, namely in IE. Short-circuiting here helps us to
				// avoid an eval call (in setAttribute) which can cause CSP
				// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
				if (div.attachEvent) {
					for (i in {
						submit: true,
						change: true,
						focusin: true
					}) {
						eventName = "on" + i;
						isSupported = (eventName in div);
						if (!isSupported) {
							div.setAttribute(eventName, "return;");
							isSupported = (typeof div[eventName] === "function");
						}
						support[i + "Bubbles"] = isSupported;
					}
				}

				// Run tests that need a body at doc ready
				JQXLite(function () {
					var container, div, tds, marginDiv,
						divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
						body = document.getElementsByTagName("body")[0];

					if (!body) {
						// Return for frameset docs that don't have a body
						return;
					}

					container = document.createElement("div");
					container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
					body.insertBefore(container, body.firstChild);

					// Construct the test element
					div = document.createElement("div");
					container.appendChild(div);

					// Check if table cells still have offsetWidth/Height when they are set
					// to display:none and there are still other visible table cells in a
					// table row; if so, offsetWidth/Height are not reliable for use when
					// determining if an element has been hidden directly using
					// display:none (it is still safe to use offsets if a parent element is
					// hidden; don safety goggles and see bug #4512 for more information).
					// (only IE 8 fails this test)
					div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
					tds = div.getElementsByTagName("td");
					tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
					isSupported = (tds[0].offsetHeight === 0);

					tds[0].style.display = "";
					tds[1].style.display = "none";

					// Check if empty table cells still have offsetWidth/Height
					// (IE <= 8 fail this test)
					support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);

					// Check box-sizing and margin behavior
					div.innerHTML = "";
					div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
					support.boxSizing = (div.offsetWidth === 4);
					support.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== 1);

					// NOTE: To any future maintainer, we've window.getComputedStyle
					// because jsdom on node.js will break without it.
					if (window.getComputedStyle) {
						support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
						support.boxSizingReliable = (window.getComputedStyle(div, null) || { width: "4px" }).width === "4px";

						// Check if div with explicit width and no margin-right incorrectly
						// gets computed margin-right based on width of container. For more
						// info see bug #3333
						// Fails in WebKit before Feb 2011 nightlies
						// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
						marginDiv = document.createElement("div");
						marginDiv.style.cssText = div.style.cssText = divReset;
						marginDiv.style.marginRight = marginDiv.style.width = "0";
						div.style.width = "1px";
						div.appendChild(marginDiv);
						support.reliableMarginRight =
							!parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
					}

					if (typeof div.style.zoom !== "undefined") {
						// Check if natively block-level elements act like inline-block
						// elements when setting their display to 'inline' and giving
						// them layout
						// (IE < 8 does this)
						div.innerHTML = "";
						div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
						support.inlineBlockNeedsLayout = (div.offsetWidth === 3);

						// Check if elements with layout shrink-wrap their children
						// (IE 6 does this)
						div.style.display = "block";
						div.style.overflow = "visible";
						div.innerHTML = "<div></div>";
						div.firstChild.style.width = "5px";
						support.shrinkWrapBlocks = (div.offsetWidth !== 3);

						container.style.zoom = 1;
					}

					// Null elements to avoid leaks in IE
					body.removeChild(container);
					container = div = tds = marginDiv = null;
				});

				// Null elements to avoid leaks in IE
				fragment.removeChild(div);
				all = a = select = opt = input = fragment = div = null;

				return support;
			})();
			var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
				rmultiDash = /([A-Z])/g;

			JQXLite.extend({
				cache: {},

				deletedIds: [],

				// Remove at next major release (1.9/2.0)
				uuid: 0,

				// Unique for each copy of JQXLite on the page
				// Non-digits removed to match rinlinejQuery
				expando: "JQXLite" + (JQXLite.fn.jqx + Math.random()).replace(/\D/g, ""),

				// The following elements throw uncatchable exceptions if you
				// attempt to add expando properties to them.
				noData: {
					"embed": true,
					// Ban all objects except for Flash (which handle expandos)
					"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
					"applet": true
				},

				hasData: function (elem) {
					elem = elem.nodeType ? JQXLite.cache[elem[JQXLite.expando]] : elem[JQXLite.expando];
					return !!elem && !isEmptyDataObject(elem);
				},

				data: function (elem, name, data, pvt /* Internal Use Only */) {
					if (!JQXLite.acceptData(elem)) {
						return;
					}

					var thisCache, ret,
						internalKey = JQXLite.expando,
						getByName = typeof name === "string",

						// We have to handle DOM nodes and JS objects differently because IE6-7
						// can't GC object references properly across the DOM-JS boundary
						isNode = elem.nodeType,

						// Only DOM nodes need the global JQXLite cache; JS object data is
						// attached directly to the object so GC can occur automatically
						cache = isNode ? JQXLite.cache : elem,

						// Only defining an ID for JS objects if its cache already exists allows
						// the code to shortcut on the same path as a DOM node with no cache
						id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

					// Avoid doing any more work than we need to when trying to get data on an
					// object that has no data at all
					if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) {
						return;
					}

					if (!id) {
						// Only DOM nodes need a new unique ID for each element since their data
						// ends up in the global cache
						if (isNode) {
							elem[internalKey] = id = JQXLite.deletedIds.pop() || JQXLite.guid++;
						} else {
							id = internalKey;
						}
					}

					if (!cache[id]) {
						cache[id] = {};

						// Avoids exposing JQXLite metadata on plain JS objects when the object
						// is serialized using JSON.stringify
						if (!isNode) {
							cache[id].toJSON = JQXLite.noop;
						}
					}

					// An object can be passed to JQXLite.data instead of a key/value pair; this gets
					// shallow copied over onto the existing cache
					if (typeof name === "object" || typeof name === "function") {
						if (pvt) {
							cache[id] = JQXLite.extend(cache[id], name);
						} else {
							cache[id].data = JQXLite.extend(cache[id].data, name);
						}
					}

					thisCache = cache[id];

					// JQXLite data() is stored in a separate object inside the object's internal data
					// cache in order to avoid key collisions between internal data and user-defined
					// data.
					if (!pvt) {
						if (!thisCache.data) {
							thisCache.data = {};
						}

						thisCache = thisCache.data;
					}

					if (data !== undefined) {
						thisCache[JQXLite.camelCase(name)] = data;
					}

					// Check for both converted-to-camel and non-converted data property names
					// If a data property was specified
					if (getByName) {

						// First Try to find as-is property data
						ret = thisCache[name];

						// Test for null|undefined property data
						if (ret == null) {

							// Try to find the camelCased property
							ret = thisCache[JQXLite.camelCase(name)];
						}
					} else {
						ret = thisCache;
					}

					return ret;
				},

				removeData: function (elem, name, pvt /* Internal Use Only */) {
					if (!JQXLite.acceptData(elem)) {
						return;
					}

					var thisCache, i, l,

						isNode = elem.nodeType,

						// See JQXLite.data for more information
						cache = isNode ? JQXLite.cache : elem,
						id = isNode ? elem[JQXLite.expando] : JQXLite.expando;

					// If there is already no cache entry for this object, there is no
					// purpose in continuing
					if (!cache[id]) {
						return;
					}

					if (name) {

						thisCache = pvt ? cache[id] : cache[id].data;

						if (thisCache) {

							// Support array or space separated string names for data keys
							if (!JQXLite.isArray(name)) {

								// try the string as a key before any manipulation
								if (name in thisCache) {
									name = [name];
								} else {

									// split the camel cased version by spaces unless a key with the spaces exists
									name = JQXLite.camelCase(name);
									if (name in thisCache) {
										name = [name];
									} else {
										name = name.split(" ");
									}
								}
							}

							for (i = 0, l = name.length; i < l; i++) {
								delete thisCache[name[i]];
							}

							// If there is no data left in the cache, we want to continue
							// and let the cache object itself get destroyed
							if (!(pvt ? isEmptyDataObject : JQXLite.isEmptyObject)(thisCache)) {
								return;
							}
						}
					}

					// See JQXLite.data for more information
					if (!pvt) {
						delete cache[id].data;

						// Don't destroy the parent cache unless the internal data object
						// had been the only thing left in it
						if (!isEmptyDataObject(cache[id])) {
							return;
						}
					}

					// Destroy the cache
					if (isNode) {
						JQXLite.cleanData([elem], true);

						// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
					} else if (JQXLite.support.deleteExpando || cache != cache.window) {
						delete cache[id];

						// When all else fails, null
					} else {
						cache[id] = null;
					}
				},

				// For internal use only.
				_data: function (elem, name, data) {
					return JQXLite.data(elem, name, data, true);
				},

				// A method for determining if a DOM node can handle the data expando
				acceptData: function (elem) {
					var noData = elem.nodeName && JQXLite.noData[elem.nodeName.toLowerCase()];

					// nodes accept data unless otherwise specified; rejection can be conditional
					return !noData || noData !== true && elem.getAttribute("classid") === noData;
				}
			});

			JQXLite.fn.extend({
				data: function (key, value) {
					var parts, part, attr, name, l,
						elem = this[0],
						i = 0,
						data = null;

					// Gets all values
					if (key === undefined) {
						if (this.length) {
							data = JQXLite.data(elem);

							if (elem.nodeType === 1 && !JQXLite._data(elem, "parsedAttrs")) {
								attr = elem.attributes;
								for (l = attr.length; i < l; i++) {
									name = attr[i].name;

									if (!name.indexOf("data-")) {
										name = JQXLite.camelCase(name.substring(5));

										dataAttr(elem, name, data[name]);
									}
								}
								JQXLite._data(elem, "parsedAttrs", true);
							}
						}

						return data;
					}

					// Sets multiple values
					if (typeof key === "object") {
						return this.each(function () {
							JQXLite.data(this, key);
						});
					}

					parts = key.split(".", 2);
					parts[1] = parts[1] ? "." + parts[1] : "";
					part = parts[1] + "!";

					return JQXLite.access(this, function (value) {

						if (value === undefined) {
							data = this.triggerHandler("getData" + part, [parts[0]]);

							// Try to fetch any internally stored data first
							if (data === undefined && elem) {
								data = JQXLite.data(elem, key);
								data = dataAttr(elem, key, data);
							}

							return data === undefined && parts[1] ?
								this.data(parts[0]) :
								data;
						}

						parts[1] = value;
						this.each(function () {
							var self = JQXLite(this);

							self.triggerHandler("setData" + part, parts);
							JQXLite.data(this, key, value);
							self.triggerHandler("changeData" + part, parts);
						});
					}, null, value, arguments.length > 1, null, false);
				},

				removeData: function (key) {
					return this.each(function () {
						JQXLite.removeData(this, key);
					});
				}
			});

			function dataAttr(elem, key, data) {
				// If nothing was found internally, try to fetch any
				// data from the HTML5 data-* attribute
				if (data === undefined && elem.nodeType === 1) {

					var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

					data = elem.getAttribute(name);

					if (typeof data === "string") {
						try {
							data = data === "true" ? true :
								data === "false" ? false :
									data === "null" ? null :
										// Only convert to a number if it doesn't change the string
										+data + "" === data ? +data :
											rbrace.test(data) ? JQXLite.parseJSON(data) :
												data;
						} catch (e) { }

						// Make sure we set the data so it isn't changed later
						JQXLite.data(elem, key, data);

					} else {
						data = undefined;
					}
				}

				return data;
			}

			// checks a cache object for emptiness
			function isEmptyDataObject(obj) {
				var name;
				for (name in obj) {

					// if the public data object is empty, the private is still empty
					if (name === "data" && JQXLite.isEmptyObject(obj[name])) {
						continue;
					}
					if (name !== "toJSON") {
						return false;
					}
				}

				return true;
			}
			JQXLite.extend({
				queue: function (elem, type, data) {
					var queue;

					if (elem) {
						type = (type || "fx") + "queue";
						queue = JQXLite._data(elem, type);

						// Speed up dequeue by getting out quickly if this is just a lookup
						if (data) {
							if (!queue || JQXLite.isArray(data)) {
								queue = JQXLite._data(elem, type, JQXLite.makeArray(data));
							} else {
								queue.push(data);
							}
						}
						return queue || [];
					}
				},

				dequeue: function (elem, type) {
					type = type || "fx";

					var queue = JQXLite.queue(elem, type),
						startLength = queue.length,
						fn = queue.shift(),
						hooks = JQXLite._queueHooks(elem, type),
						next = function () {
							JQXLite.dequeue(elem, type);
						};

					// If the fx queue is dequeued, always remove the progress sentinel
					if (fn === "inprogress") {
						fn = queue.shift();
						startLength--;
					}

					if (fn) {

						// Add a progress sentinel to prevent the fx queue from being
						// automatically dequeued
						if (type === "fx") {
							queue.unshift("inprogress");
						}

						// clear up the last queue stop function
						delete hooks.stop;
						fn.call(elem, next, hooks);
					}

					if (!startLength && hooks) {
						hooks.empty.fire();
					}
				},

				// not intended for public consumption - generates a queueHooks object, or returns the current one
				_queueHooks: function (elem, type) {
					var key = type + "queueHooks";
					return JQXLite._data(elem, key) || JQXLite._data(elem, key, {
						empty: JQXLite.Callbacks("once memory").add(function () {
							JQXLite.removeData(elem, type + "queue", true);
							JQXLite.removeData(elem, key, true);
						})
					});
				}
			});

			JQXLite.fn.extend({
				queue: function (type, data) {
					var setter = 2;

					if (typeof type !== "string") {
						data = type;
						type = "fx";
						setter--;
					}

					if (arguments.length < setter) {
						return JQXLite.queue(this[0], type);
					}

					return data === undefined ?
						this :
						this.each(function () {
							var queue = JQXLite.queue(this, type, data);

							// ensure a hooks for this queue
							JQXLite._queueHooks(this, type);

							if (type === "fx" && queue[0] !== "inprogress") {
								JQXLite.dequeue(this, type);
							}
						});
				},
				dequeue: function (type) {
					return this.each(function () {
						JQXLite.dequeue(this, type);
					});
				},
				// Based off of the plugin by Clint Helfers, with permission.
				// http://blindsignals.com/index.php/2009/07/jqx-delay/
				delay: function (time, type) {
					time = JQXLite.fx ? JQXLite.fx.speeds[time] || time : time;
					type = type || "fx";

					return this.queue(type, function (next, hooks) {
						var timeout = setTimeout(next, time);
						hooks.stop = function () {
							clearTimeout(timeout);
						};
					});
				},
				clearQueue: function (type) {
					return this.queue(type || "fx", []);
				},
				// Get a promise resolved when queues of a certain type
				// are emptied (fx is the type by default)
				promise: function (type, obj) {
					var tmp,
						count = 1,
						defer = JQXLite.Deferred(),
						elements = this,
						i = this.length,
						resolve = function () {
							if (!(--count)) {
								defer.resolveWith(elements, [elements]);
							}
						};

					if (typeof type !== "string") {
						obj = type;
						type = undefined;
					}
					type = type || "fx";

					while (i--) {
						tmp = JQXLite._data(elements[i], type + "queueHooks");
						if (tmp && tmp.empty) {
							count++;
							tmp.empty.add(resolve);
						}
					}
					resolve();
					return defer.promise(obj);
				}
			});
			var nodeHook, boolHook, fixSpecified,
				rclass = /[\t\r\n]/g,
				rreturn = /\r/g,
				rtype = /^(?:button|input)$/i,
				rfocusable = /^(?:button|input|object|select|textarea)$/i,
				rclickable = /^a(?:rea|)$/i,
				rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
				getSetAttribute = JQXLite.support.getSetAttribute;

			JQXLite.fn.extend({
				attr: function (name, value) {
					return JQXLite.access(this, JQXLite.attr, name, value, arguments.length > 1);
				},

				removeAttr: function (name) {
					return this.each(function () {
						JQXLite.removeAttr(this, name);
					});
				},

				prop: function (name, value) {
					return JQXLite.access(this, JQXLite.prop, name, value, arguments.length > 1);
				},

				removeProp: function (name) {
					name = JQXLite.propFix[name] || name;
					return this.each(function () {
						// try/catch handles cases where IE balks (such as removing a property on window)
						try {
							this[name] = undefined;
							delete this[name];
						} catch (e) { }
					});
				},

				addClass: function (value) {
					var classNames, i, l, elem,
						setClass, c, cl;

					if (JQXLite.isFunction(value)) {
						return this.each(function (j) {
							JQXLite(this).addClass(value.call(this, j, this.className));
						});
					}

					if (value && typeof value === "string") {
						classNames = value.split(core_rspace);

						for (i = 0, l = this.length; i < l; i++) {
							elem = this[i];

							if (elem.nodeType === 1) {
								if (!elem.className && classNames.length === 1) {
									elem.className = value;

								} else {
									setClass = " " + elem.className + " ";

									for (c = 0, cl = classNames.length; c < cl; c++) {
										if (setClass.indexOf(" " + classNames[c] + " ") < 0) {
											setClass += classNames[c] + " ";
										}
									}
									elem.className = JQXLite.trim(setClass);
								}
							}
						}
					}

					return this;
				},

				removeClass: function (value) {
					var removes, className, elem, c, cl, i, l;

					if (JQXLite.isFunction(value)) {
						return this.each(function (j) {
							JQXLite(this).removeClass(value.call(this, j, this.className));
						});
					}
					if ((value && typeof value === "string") || value === undefined) {
						removes = (value || "").split(core_rspace);

						for (i = 0, l = this.length; i < l; i++) {
							elem = this[i];
							if (elem.nodeType === 1 && elem.className) {

								className = (" " + elem.className + " ").replace(rclass, " ");

								// loop over each item in the removal list
								for (c = 0, cl = removes.length; c < cl; c++) {
									// Remove until there is nothing to remove,
									while (className.indexOf(" " + removes[c] + " ") >= 0) {
										className = className.replace(" " + removes[c] + " ", " ");
									}
								}
								elem.className = value ? JQXLite.trim(className) : "";
							}
						}
					}

					return this;
				},

				toggleClass: function (value, stateVal) {
					var type = typeof value,
						isBool = typeof stateVal === "boolean";

					if (JQXLite.isFunction(value)) {
						return this.each(function (i) {
							JQXLite(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
						});
					}

					return this.each(function () {
						if (type === "string") {
							// toggle individual class names
							var className,
								i = 0,
								self = JQXLite(this),
								state = stateVal,
								classNames = value.split(core_rspace);

							while ((className = classNames[i++])) {
								// check each className given, space separated list
								state = isBool ? state : !self.hasClass(className);
								self[state ? "addClass" : "removeClass"](className);
							}

						} else if (type === "undefined" || type === "boolean") {
							if (this.className) {
								// store className if set
								JQXLite._data(this, "__className__", this.className);
							}

							// toggle whole className
							this.className = this.className || value === false ? "" : JQXLite._data(this, "__className__") || "";
						}
					});
				},

				hasClass: function (selector) {
					var className = " " + selector + " ",
						i = 0,
						l = this.length;
					for (; i < l; i++) {
						if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
							return true;
						}
					}

					return false;
				},

				val: function (value) {
					var hooks, ret, isFunction,
						elem = this[0];

					if (!arguments.length) {
						if (elem) {
							hooks = JQXLite.valHooks[elem.type] || JQXLite.valHooks[elem.nodeName.toLowerCase()];

							if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
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

					isFunction = JQXLite.isFunction(value);

					return this.each(function (i) {
						var val,
							self = JQXLite(this);

						if (this.nodeType !== 1) {
							return;
						}

						if (isFunction) {
							val = value.call(this, i, self.val());
						} else {
							val = value;
						}

						// Treat null/undefined as ""; convert numbers to string
						if (val == null) {
							val = "";
						} else if (typeof val === "number") {
							val += "";
						} else if (JQXLite.isArray(val)) {
							val = JQXLite.map(val, function (value) {
								return value == null ? "" : value + "";
							});
						}

						hooks = JQXLite.valHooks[this.type] || JQXLite.valHooks[this.nodeName.toLowerCase()];

						// If set returns undefined, fall back to normal setting
						if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
							this.value = val;
						}
					});
				}
			});

			JQXLite.extend({
				valHooks: {
					option: {
						get: function (elem) {
							// attributes.value is undefined in Blackberry 4.7 but
							// uses .value. See #6932
							var val = elem.attributes.value;
							return !val || val.specified ? elem.value : elem.text;
						}
					},
					select: {
						get: function (elem) {
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
							for (; i < max; i++) {
								option = options[i];

								// oldIE doesn't update selected after form reset (#2551)
								if ((option.selected || i === index) &&
									// Don't return options that are disabled or in a disabled optgroup
									(JQXLite.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
									(!option.parentNode.disabled || !JQXLite.nodeName(option.parentNode, "optgroup"))) {

									// Get the specific value for the option
									value = JQXLite(option).val();

									// We don't need an array for one selects
									if (one) {
										return value;
									}

									// Multi-Selects return an array
									values.push(value);
								}
							}

							return values;
						},

						set: function (elem, value) {
							var values = JQXLite.makeArray(value);

							JQXLite(elem).find("option").each(function () {
								this.selected = JQXLite.inArray(JQXLite(this).val(), values) >= 0;
							});

							if (!values.length) {
								elem.selectedIndex = -1;
							}
							return values;
						}
					}
				},

				// Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
				attrFn: {},

				attr: function (elem, name, value, pass) {
					var ret, hooks, notxml,
						nType = elem.nodeType;

					// don't get/set attributes on text, comment and attribute nodes
					if (!elem || nType === 3 || nType === 8 || nType === 2) {
						return;
					}

					if (pass && JQXLite.isFunction(JQXLite.fn[name])) {
						return JQXLite(elem)[name](value);
					}

					// Fallback to prop when attributes are not supported
					if (typeof elem.getAttribute === "undefined") {
						return JQXLite.prop(elem, name, value);
					}

					notxml = nType !== 1 || !JQXLite.isXMLDoc(elem);

					// All attributes are lowercase
					// Grab necessary hook if one is defined
					if (notxml) {
						name = name.toLowerCase();
						hooks = JQXLite.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
					}

					if (value !== undefined) {

						if (value === null) {
							JQXLite.removeAttr(elem, name);
							return;

						} else if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
							return ret;

						} else {
							elem.setAttribute(name, value + "");
							return value;
						}

					} else if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
						return ret;

					} else {

						ret = elem.getAttribute(name);

						// Non-existent attributes return null, we normalize to undefined
						return ret === null ?
							undefined :
							ret;
					}
				},

				removeAttr: function (elem, value) {
					var propName, attrNames, name, isBool,
						i = 0;

					if (value && elem.nodeType === 1) {

						attrNames = value.split(core_rspace);

						for (; i < attrNames.length; i++) {
							name = attrNames[i];

							if (name) {
								propName = JQXLite.propFix[name] || name;
								isBool = rboolean.test(name);

								// See #9699 for explanation of this approach (setting first, then removal)
								// Do not do this for boolean attributes (see #10870)
								if (!isBool) {
									JQXLite.attr(elem, name, "");
								}
								elem.removeAttribute(getSetAttribute ? name : propName);

								// Set corresponding property to false for boolean attributes
								if (isBool && propName in elem) {
									elem[propName] = false;
								}
							}
						}
					}
				},

				attrHooks: {
					type: {
						set: function (elem, value) {
							// We can't allow the type property to be changed (since it causes problems in IE)
							if (rtype.test(elem.nodeName) && elem.parentNode) {
								JQXLite.error("type property can't be changed");
							} else if (!JQXLite.support.radioValue && value === "radio" && JQXLite.nodeName(elem, "input")) {
								// Setting the type on a radio button after the value resets the value in IE6-9
								// Reset value to it's default in case type is set after value
								// This is for element creation
								var val = elem.value;
								elem.setAttribute("type", value);
								if (val) {
									elem.value = val;
								}
								return value;
							}
						}
					},
					// Use the value property for back compat
					// Use the nodeHook for button elements in IE6/7 (#1954)
					value: {
						get: function (elem, name) {
							if (nodeHook && JQXLite.nodeName(elem, "button")) {
								return nodeHook.get(elem, name);
							}
							return name in elem ?
								elem.value :
								null;
						},
						set: function (elem, value, name) {
							if (nodeHook && JQXLite.nodeName(elem, "button")) {
								return nodeHook.set(elem, value, name);
							}
							// Does not return so that setAttribute is also used
							elem.value = value;
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

				prop: function (elem, name, value) {
					var ret, hooks, notxml,
						nType = elem.nodeType;

					// don't get/set properties on text, comment and attribute nodes
					if (!elem || nType === 3 || nType === 8 || nType === 2) {
						return;
					}

					notxml = nType !== 1 || !JQXLite.isXMLDoc(elem);

					if (notxml) {
						// Fix name and attach hooks
						name = JQXLite.propFix[name] || name;
						hooks = JQXLite.propHooks[name];
					}

					if (value !== undefined) {
						if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
							return ret;

						} else {
							return (elem[name] = value);
						}

					} else {
						if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
							return ret;

						} else {
							return elem[name];
						}
					}
				},

				propHooks: {
					tabIndex: {
						get: function (elem) {
							// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
							// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
							var attributeNode = elem.getAttributeNode("tabindex");

							return attributeNode && attributeNode.specified ?
								parseInt(attributeNode.value, 10) :
								rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ?
									0 :
									undefined;
						}
					}
				}
			});

			// Hook for boolean attributes
			boolHook = {
				get: function (elem, name) {
					// Align boolean attributes with corresponding properties
					// Fall back to attribute presence where some booleans are not supported
					var attrNode,
						property = JQXLite.prop(elem, name);
					return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ?
						name.toLowerCase() :
						undefined;
				},
				set: function (elem, value, name) {
					var propName;
					if (value === false) {
						// Remove boolean attributes when set to false
						JQXLite.removeAttr(elem, name);
					} else {
						// value is true since we know at this point it's type boolean and not false
						// Set boolean attributes to the same name and set the DOM property
						propName = JQXLite.propFix[name] || name;
						if (propName in elem) {
							// Only set the IDL specifically if it already exists on the element
							elem[propName] = true;
						}

						elem.setAttribute(name, name.toLowerCase());
					}
					return name;
				}
			};

			// IE6/7 call enctype encoding
			if (!JQXLite.support.enctype) {
				JQXLite.propFix.enctype = "encoding";
			}

			var rformElems = /^(?:textarea|input|select)$/i,
				rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
				rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
				rkeyEvent = /^key/,
				rmouseEvent = /^(?:mouse|contextmenu)|click/,
				rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
				hoverHack = function (events) {
					return JQXLite.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
				};

			/*
			 * Helper functions for managing events -- not part of the public interface.
			 * Props to Dean Edwards' addEvent library for many of the ideas.
			 */
			JQXLite.event = {

				add: function (elem, types, handler, data, selector) {

					var elemData, eventHandle, events,
						t, tns, type, namespaces, handleObj,
						handleObjIn, handlers, special;

					// Don't attach events to noData or text/comment nodes (allow plain objects tho)
					if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = JQXLite._data(elem))) {
						return;
					}

					// Caller can pass in an object of custom data in lieu of the handler
					if (handler.handler) {
						handleObjIn = handler;
						handler = handleObjIn.handler;
						selector = handleObjIn.selector;
					}

					// Make sure that the handler has a unique ID, used to find/remove it later
					if (!handler.guid) {
						handler.guid = JQXLite.guid++;
					}

					// Init the element's event structure and main handler, if this is the first
					events = elemData.events;
					if (!events) {
						elemData.events = events = {};
					}
					eventHandle = elemData.handle;
					if (!eventHandle) {
						elemData.handle = eventHandle = function (e) {
							// Discard the second event of a JQXLite.event.trigger() and
							// when an event is called after a page has unloaded
							return typeof JQXLite !== "undefined" && (!e || JQXLite.event.triggered !== e.type) ?
								JQXLite.event.dispatch.apply(eventHandle.elem, arguments) :
								undefined;
						};
						// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
						eventHandle.elem = elem;
					}

					// Handle multiple events separated by a space
					// JQXLite(...).bind("mouseover mouseout", fn);
					types = JQXLite.trim(hoverHack(types)).split(" ");
					for (t = 0; t < types.length; t++) {

						tns = rtypenamespace.exec(types[t]) || [];
						type = tns[1];
						namespaces = (tns[2] || "").split(".").sort();

						// If event changes its type, use the special event handlers for the changed type
						special = JQXLite.event.special[type] || {};

						// If selector defined, determine special event api type, otherwise given type
						type = (selector ? special.delegateType : special.bindType) || type;

						// Update special based on newly reset type
						special = JQXLite.event.special[type] || {};

						// handleObj is passed to all event handlers
						handleObj = JQXLite.extend({
							type: type,
							origType: tns[1],
							data: data,
							handler: handler,
							guid: handler.guid,
							selector: selector,
							needsContext: selector && JQXLite.expr.match.needsContext.test(selector),
							namespace: namespaces.join(".")
						}, handleObjIn);

						// Init the event handler queue if we're the first
						handlers = events[type];
						if (!handlers) {
							handlers = events[type] = [];
							handlers.delegateCount = 0;

							// Only use addEventListener/attachEvent if the special events handler returns false
							if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
								// Bind the global event handler to the element
								if (elem.addEventListener) {
									if (data && data.passive !== undefined) {
										elem.addEventListener(type, eventHandle, data);
									}
									else {
										elem.addEventListener(type, eventHandle, false);
									}
								} else if (elem.attachEvent) {
									elem.attachEvent("on" + type, eventHandle);
								}
							}
						}

						if (special.add) {
							special.add.call(elem, handleObj);

							if (!handleObj.handler.guid) {
								handleObj.handler.guid = handler.guid;
							}
						}

						// Add to the element's handler list, delegates in front
						if (selector) {
							handlers.splice(handlers.delegateCount++, 0, handleObj);
						} else {
							handlers.push(handleObj);
						}

						// Keep track of which events have ever been used, for event optimization
						JQXLite.event.global[type] = true;
					}

					// Nullify elem to prevent memory leaks in IE
					elem = null;
				},

				global: {},

				// Detach an event or set of events from an element
				remove: function (elem, types, handler, selector, mappedTypes) {

					var t, tns, type, origType, namespaces, origCount,
						j, events, special, eventType, handleObj,
						elemData = JQXLite.hasData(elem) && JQXLite._data(elem);

					if (!elemData || !(events = elemData.events)) {
						return;
					}

					// Once for each type.namespace in types; type may be omitted
					types = JQXLite.trim(hoverHack(types || "")).split(" ");
					for (t = 0; t < types.length; t++) {
						tns = rtypenamespace.exec(types[t]) || [];
						type = origType = tns[1];
						namespaces = tns[2];

						// Unbind all events (on this namespace, if provided) for the element
						if (!type) {
							for (type in events) {
								JQXLite.event.remove(elem, type + types[t], handler, selector, true);
							}
							continue;
						}

						special = JQXLite.event.special[type] || {};
						type = (selector ? special.delegateType : special.bindType) || type;
						eventType = events[type] || [];
						origCount = eventType.length;
						namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

						// Remove matching events
						for (j = 0; j < eventType.length; j++) {
							handleObj = eventType[j];

							if ((mappedTypes || origType === handleObj.origType) &&
								(!handler || handler.guid === handleObj.guid) &&
								(!namespaces || namespaces.test(handleObj.namespace)) &&
								(!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
								eventType.splice(j--, 1);

								if (handleObj.selector) {
									eventType.delegateCount--;
								}
								if (special.remove) {
									special.remove.call(elem, handleObj);
								}
							}
						}

						// Remove generic event handler if we removed something and no more handlers exist
						// (avoids potential for endless recursion during removal of special event handlers)
						if (eventType.length === 0 && origCount !== eventType.length) {
							if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
								JQXLite.removeEvent(elem, type, elemData.handle);
							}

							delete events[type];
						}
					}

					// Remove the expando if it's no longer used
					if (JQXLite.isEmptyObject(events)) {
						delete elemData.handle;

						// removeData also checks for emptiness and clears the expando if empty
						// so use it instead of delete
						JQXLite.removeData(elem, "events", true);
					}
				},

				// Events that are safe to short-circuit if no handlers are attached.
				// Native DOM events should not be added, they may have inline handlers.
				customEvent: {
					"getData": true,
					"setData": true,
					"changeData": true
				},

				trigger: function (event, data, elem, onlyHandlers) {
					// Don't do events on text and comment nodes
					if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
						return;
					}

					// Event object or event type
					var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
						type = event.type || event,
						namespaces = [];

					// focus/blur morphs to focusin/out; ensure we're not firing them right now
					if (rfocusMorph.test(type + JQXLite.event.triggered)) {
						return;
					}

					if (type.indexOf("!") >= 0) {
						// Exclusive events trigger only for the exact event (no namespaces)
						type = type.slice(0, -1);
						exclusive = true;
					}

					if (type.indexOf(".") >= 0) {
						// Namespaced trigger; create a regexp to match event type in handle()
						namespaces = type.split(".");
						type = namespaces.shift();
						namespaces.sort();
					}

					if ((!elem || JQXLite.event.customEvent[type]) && !JQXLite.event.global[type]) {
						// No JQXLite handlers for this event type, and it can't have inline handlers
						return;
					}

					// Caller can pass in an Event, Object, or just an event type string
					event = typeof event === "object" ?
						// JQXLite.Event object
						event[JQXLite.expando] ? event :
							// Object literal
							new JQXLite.Event(type, event) :
						// Just the event type (string)
						new JQXLite.Event(type);

					event.type = type;
					event.isTrigger = true;
					event.exclusive = exclusive;
					event.namespace = namespaces.join(".");
					event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
					ontype = type.indexOf(":") < 0 ? "on" + type : "";

					// Handle a global trigger
					if (!elem) {

						// TODO: Stop taunting the data cache; remove global events and always attach to document
						cache = JQXLite.cache;
						for (i in cache) {
							if (cache[i].events && cache[i].events[type]) {
								JQXLite.event.trigger(event, data, cache[i].handle.elem, true);
							}
						}
						return;
					}

					// Clean up the event in case it is being reused
					event.result = undefined;
					if (!event.target) {
						event.target = elem;
					}

					// Clone any incoming data and prepend the event, creating the handler arg list
					data = data != null ? JQXLite.makeArray(data) : [];
					data.unshift(event);

					// Allow special events to draw outside the lines
					special = JQXLite.event.special[type] || {};
					if (special.trigger && special.trigger.apply(elem, data) === false) {
						return;
					}

					// Determine event propagation path in advance, per W3C events spec (#9951)
					// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
					eventPath = [[elem, special.bindType || type]];
					if (!onlyHandlers && !special.noBubble && !JQXLite.isWindow(elem)) {

						bubbleType = special.delegateType || type;
						cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
						for (old = elem; cur; cur = cur.parentNode) {
							eventPath.push([cur, bubbleType]);
							old = cur;
						}

						// Only add window if we got to document (e.g., not plain obj or detached DOM)
						if (old === (elem.ownerDocument || document)) {
							eventPath.push([old.defaultView || old.parentWindow || window, bubbleType]);
						}
					}

					// Fire handlers on the event path
					for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {

						cur = eventPath[i][0];
						event.type = eventPath[i][1];

						handle = (JQXLite._data(cur, "events") || {})[event.type] && JQXLite._data(cur, "handle");
						if (handle) {
							handle.apply(cur, data);
						}
						// Note that this is a bare JS function and not a JQXLite handler
						handle = ontype && cur[ontype];
						if (handle && JQXLite.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
							event.preventDefault();
						}
					}
					event.type = type;

					// If nobody prevented the default action, do it now
					if (!onlyHandlers && !event.isDefaultPrevented()) {

						if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) &&
							!(type === "click" && JQXLite.nodeName(elem, "a")) && JQXLite.acceptData(elem)) {

							// Call a native DOM method on the target with the same name name as the event.
							// Can't use an .isFunction() check here because IE6/7 fails that test.
							// Don't do default actions on window, that's where global variables be (#6170)
							// IE<9 dies on focus/blur to hidden element (#1486)
							if (ontype && elem[type] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !JQXLite.isWindow(elem)) {

								// Don't re-trigger an onFOO event when we call its FOO() method
								old = elem[ontype];

								if (old) {
									elem[ontype] = null;
								}

								// Prevent re-triggering of the same event, since we already bubbled it above
								JQXLite.event.triggered = type;
								elem[type]();
								JQXLite.event.triggered = undefined;

								if (old) {
									elem[ontype] = old;
								}
							}
						}
					}

					return event.result;
				},

				dispatch: function (event) {

					// Make a writable JQXLite.Event from the native event object
					event = JQXLite.event.fix(event || window.event);

					var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
						handlers = ((JQXLite._data(this, "events") || {})[event.type] || []),
						delegateCount = handlers.delegateCount,
						args = core_slice.call(arguments),
						run_all = !event.exclusive && !event.namespace,
						special = JQXLite.event.special[event.type] || {},
						handlerQueue = [];

					// Use the fix-ed JQXLite.Event rather than the (read-only) native event
					args[0] = event;
					event.delegateTarget = this;

					// Call the preDispatch hook for the mapped type, and let it bail if desired
					if (special.preDispatch && special.preDispatch.call(this, event) === false) {
						return;
					}

					// Determine handlers that should run if there are delegated events
					// Avoid non-left-click bubbling in Firefox (#3861)
					if (delegateCount && !(event.button && event.type === "click")) {

						for (cur = event.target; cur != this; cur = cur.parentNode || this) {

							// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
							if (cur.disabled !== true || event.type !== "click") {
								selMatch = {};
								matches = [];
								for (i = 0; i < delegateCount; i++) {
									handleObj = handlers[i];
									sel = handleObj.selector;

									if (selMatch[sel] === undefined) {
										selMatch[sel] = handleObj.needsContext ?
											JQXLite(sel, this).index(cur) >= 0 :
											JQXLite.find(sel, this, null, [cur]).length;
									}
									if (selMatch[sel]) {
										matches.push(handleObj);
									}
								}
								if (matches.length) {
									handlerQueue.push({ elem: cur, matches: matches });
								}
							}
						}
					}

					// Add the remaining (directly-bound) handlers
					if (handlers.length > delegateCount) {
						handlerQueue.push({ elem: this, matches: handlers.slice(delegateCount) });
					}

					// Run delegates first; they may want to stop propagation beneath us
					for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
						matched = handlerQueue[i];
						event.currentTarget = matched.elem;

						for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
							handleObj = matched.matches[j];

							// Triggered event must either 1) be non-exclusive and have no namespace, or
							// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
							if (run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {

								event.data = handleObj.data;
								event.handleObj = handleObj;

								ret = ((JQXLite.event.special[handleObj.origType] || {}).handle || handleObj.handler)
									.apply(matched.elem, args);

								if (ret !== undefined) {
									event.result = ret;
									if (ret === false) {
										event.preventDefault();
										event.stopPropagation();
									}
								}
							}
						}
					}

					// Call the postDispatch hook for the mapped type
					if (special.postDispatch) {
						special.postDispatch.call(this, event);
					}

					return event.result;
				},

				// Includes some event props shared by KeyEvent and MouseEvent
				// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
				props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

				fixHooks: {},

				keyHooks: {
					props: "char charCode key keyCode".split(" "),
					filter: function (event, original) {

						// Add which for key events
						if (event.which == null) {
							event.which = original.charCode != null ? original.charCode : original.keyCode;
						}

						return event;
					}
				},

				mouseHooks: {
					props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
					filter: function (event, original) {
						var eventDoc, doc, body,
							button = original.button,
							fromElement = original.fromElement;

						// Calculate pageX/Y if missing and clientX/Y available
						if (event.pageX == null && original.clientX != null) {
							eventDoc = event.target.ownerDocument || document;
							doc = eventDoc.documentElement;
							body = eventDoc.body;

							event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
							event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
						}

						// Add relatedTarget, if necessary
						if (!event.relatedTarget && fromElement) {
							event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
						}

						// Add which for click: 1 === left; 2 === middle; 3 === right
						// Note: button is not normalized, so don't use it
						if (!event.which && button !== undefined) {
							event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
						}

						return event;
					}
				},

				fix: function (event) {
					if (event[JQXLite.expando]) {
						return event;
					}

					// Create a writable copy of the event object and normalize some properties
					var i, prop,
						originalEvent = event,
						fixHook = JQXLite.event.fixHooks[event.type] || {},
						copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

					event = JQXLite.Event(originalEvent);

					for (i = copy.length; i;) {
						prop = copy[--i];
						event[prop] = originalEvent[prop];
					}

					// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
					if (!event.target) {
						event.target = originalEvent.srcElement || document;
					}

					// Target should not be a text node (#504, Safari)
					if (event.target.nodeType === 3) {
						event.target = event.target.parentNode;
					}

					// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
					event.metaKey = !!event.metaKey;

					return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
				},

				special: {
					load: {
						// Prevent triggered image.load events from bubbling to window.load
						noBubble: true
					},

					focus: {
						delegateType: "focusin"
					},
					blur: {
						delegateType: "focusout"
					},

					beforeunload: {
						setup: function (data, namespaces, eventHandle) {
							// We only want to do this special case on windows
							if (JQXLite.isWindow(this)) {
								this.onbeforeunload = eventHandle;
							}
						},

						teardown: function (namespaces, eventHandle) {
							if (this.onbeforeunload === eventHandle) {
								this.onbeforeunload = null;
							}
						}
					}
				},

				simulate: function (type, elem, event, bubble) {
					// Piggyback on a donor event to simulate a different one.
					// Fake originalEvent to avoid donor's stopPropagation, but if the
					// simulated event prevents default then we do the same on the donor.
					var e = JQXLite.extend(
						new JQXLite.Event(),
						event,
						{
							type: type,
							isSimulated: true,
							originalEvent: {}
						}
					);
					if (bubble) {
						JQXLite.event.trigger(e, null, elem);
					} else {
						JQXLite.event.dispatch.call(elem, e);
					}
					if (e.isDefaultPrevented()) {
						event.preventDefault();
					}
				}
			};

			// Some plugins are using, but it's undocumented/deprecated and will be removed.
			// The 1.7 special event interface should provide all the hooks needed now.
			JQXLite.event.handle = JQXLite.event.dispatch;

			JQXLite.removeEvent = document.removeEventListener ?
				function (elem, type, handle) {
					if (elem.removeEventListener) {
						elem.removeEventListener(type, handle, false);
					}
				} :
				function (elem, type, handle) {
					var name = "on" + type;

					if (elem.detachEvent) {

						// #8545, #7054, preventing memory leaks for custom events in IE6-8
						// detachEvent needed property on element, by name of that event, to properly expose it to GC
						if (typeof elem[name] === "undefined") {
							elem[name] = null;
						}

						elem.detachEvent(name, handle);
					}
				};

			JQXLite.Event = function (src, props) {
				// Allow instantiation without the 'new' keyword
				if (!(this instanceof JQXLite.Event)) {
					return new JQXLite.Event(src, props);
				}

				// Event object
				if (src && src.type) {
					this.originalEvent = src;
					this.type = src.type;

					// Events bubbling up the document may have been marked as prevented
					// by a handler lower down the tree; reflect the correct value.
					this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
						src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;

					// Event type
				} else {
					this.type = src;
				}

				// Put explicitly provided properties onto the event object
				if (props) {
					JQXLite.extend(this, props);
				}

				// Create a timestamp if incoming event doesn't have one
				this.timeStamp = src && src.timeStamp || JQXLite.now();

				// Mark it as fixed
				this[JQXLite.expando] = true;
			};

			function returnFalse() {
				return false;
			}
			function returnTrue() {
				return true;
			}

			// JQXLite.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
			// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
			JQXLite.Event.prototype = {
				preventDefault: function () {
					this.isDefaultPrevented = returnTrue;

					var e = this.originalEvent;
					if (!e) {
						return;
					}

					// if preventDefault exists run it on the original event
					if (e.preventDefault) {
						e.preventDefault();

						// otherwise set the returnValue property of the original event to false (IE)
					} else {
						e.returnValue = false;
					}
				},
				stopPropagation: function () {
					this.isPropagationStopped = returnTrue;

					var e = this.originalEvent;
					if (!e) {
						return;
					}
					// if stopPropagation exists run it on the original event
					if (e.stopPropagation) {
						e.stopPropagation();
					}
					// otherwise set the cancelBubble property of the original event to true (IE)
					e.cancelBubble = true;
				},
				stopImmediatePropagation: function () {
					this.isImmediatePropagationStopped = returnTrue;
					this.stopPropagation();
				},
				isDefaultPrevented: returnFalse,
				isPropagationStopped: returnFalse,
				isImmediatePropagationStopped: returnFalse
			};

			// Create mouseenter/leave events using mouseover/out and event-time checks
			JQXLite.each({
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			}, function (orig, fix) {
				JQXLite.event.special[orig] = {
					delegateType: fix,
					bindType: fix,

					handle: function (event) {
						var ret,
							target = this,
							related = event.relatedTarget,
							handleObj = event.handleObj,
							selector = handleObj.selector;

						// For mousenter/leave call the handler if related is outside the target.
						// NB: No relatedTarget if the mouse left/entered the browser window
						if (!related || (related !== target && !JQXLite.contains(target, related))) {
							event.type = handleObj.origType;
							ret = handleObj.handler.apply(this, arguments);
							event.type = fix;
						}
						return ret;
					}
				};
			});

			JQXLite.fn.extend({

				on: function (types, selector, data, fn, /*INTERNAL*/ one) {
					var origFn, type;

					// Types can be a map of types/handlers
					if (typeof types === "object") {
						// ( types-Object, selector, data )
						if (typeof selector !== "string") { // && selector != null
							// ( types-Object, data )
							data = data || selector;
							selector = undefined;
						}
						for (type in types) {
							this.on(type, selector, data, types[type], one);
						}
						return this;
					}

					if (data == null && fn == null) {
						// ( types, fn )
						fn = selector;
						data = selector = undefined;
					} else if (fn == null) {
						if (typeof selector === "string") {
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
					if (fn === false) {
						fn = returnFalse;
					} else if (!fn) {
						return this;
					}

					if (one === 1) {
						origFn = fn;
						fn = function (event) {
							// Can use an empty set, since event contains the info
							JQXLite().off(event);
							return origFn.apply(this, arguments);
						};
						// Use same guid so caller can remove using origFn
						fn.guid = origFn.guid || (origFn.guid = JQXLite.guid++);
					}
					return this.each(function () {
						JQXLite.event.add(this, types, fn, data, selector);
					});
				},

				off: function (types, selector, fn) {
					var handleObj, type;
					if (types && types.preventDefault && types.handleObj) {
						// ( event )  dispatched JQXLite.Event
						handleObj = types.handleObj;
						JQXLite(types.delegateTarget).off(
							handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
							handleObj.selector,
							handleObj.handler
						);
						return this;
					}
					if (typeof types === "object") {
						// ( types-object [, selector] )
						for (type in types) {
							this.off(type, selector, types[type]);
						}
						return this;
					}
					if (selector === false || typeof selector === "function") {
						// ( types [, fn] )
						fn = selector;
						selector = undefined;
					}
					if (fn === false) {
						fn = returnFalse;
					}
					return this.each(function () {
						JQXLite.event.remove(this, types, fn, selector);
					});
				},

				delegate: function (selector, types, data, fn) {
					return this.on(types, selector, data, fn);
				},
				undelegate: function (selector, types, fn) {
					// ( namespace ) or ( selector, types [, fn] )
					return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
				},

				trigger: function (type, data) {
					return this.each(function () {
						JQXLite.event.trigger(type, data, this);
					});
				},
				triggerHandler: function (type, data) {
					if (this[0]) {
						return JQXLite.event.trigger(type, data, this[0], true);
					}
				},

				toggle: function (fn) {
					// Save reference to arguments for access in closure
					var args = arguments,
						guid = fn.guid || JQXLite.guid++,
						i = 0,
						toggler = function (event) {
							// Figure out which function to execute
							var lastToggle = (JQXLite._data(this, "lastToggle" + fn.guid) || 0) % i;
							JQXLite._data(this, "lastToggle" + fn.guid, lastToggle + 1);

							// Make sure that clicks stop
							event.preventDefault();

							// and execute the function
							return args[lastToggle].apply(this, arguments) || false;
						};

					// link all the functions, so any of them can unbind this click handler
					toggler.guid = guid;
					while (i < args.length) {
						args[i++].guid = guid;
					}

					return this.click(toggler);
				},

				hover: function (fnOver, fnOut) {
					return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
				}
			});

			JQXLite.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
				"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
				"change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

					// Handle event binding
					JQXLite.fn[name] = function (data, fn) {
						if (fn == null) {
							fn = data;
							data = null;
						}

						return arguments.length > 0 ?
							this.on(name, null, data, fn) :
							this.trigger(name);
					};

					if (rkeyEvent.test(name)) {
						JQXLite.event.fixHooks[name] = JQXLite.event.keyHooks;
					}

					if (rmouseEvent.test(name)) {
						JQXLite.event.fixHooks[name] = JQXLite.event.mouseHooks;
					}
				});
			/*!
			 * Sizzle CSS Selector Engine
			 * Copyright 2012 JQXLite Foundation and other contributors
			 * Released under the MIT license
			 * http://sizzlejs.com/
			 */
			(function (window, undefined) {

				var cachedruns,
					assertGetIdNotName,
					Expr,
					getText,
					isXML,
					contains,
					compile,
					sortOrder,
					hasDuplicate,
					outermostContext,

					baseHasDuplicate = true,
					strundefined = "undefined",

					expando = ("sizcache" + Math.random()).replace(".", ""),

					Token = String,
					document = window.document,
					docElem = document.documentElement,
					dirruns = 0,
					done = 0,
					pop = [].pop,
					push = [].push,
					slice = [].slice,
					// Use a stripped-down indexOf if a native one is unavailable
					indexOf = [].indexOf || function (elem) {
						var i = 0,
							len = this.length;
						for (; i < len; i++) {
							if (this[i] === elem) {
								return i;
							}
						}
						return -1;
					},

					// Augment a function for special use by Sizzle
					markFunction = function (fn, value) {
						fn[expando] = value == null || value;
						return fn;
					},

					createCache = function () {
						var cache = {},
							keys = [];

						return markFunction(function (key, value) {
							// Only keep the most recent entries
							if (keys.push(key) > Expr.cacheLength) {
								delete cache[keys.shift()];
							}

							// Retrieve with (key + " ") to avoid collision with native Object.prototype properties (see Issue #157)
							return (cache[key + " "] = value);
						}, cache);
					},

					classCache = createCache(),
					tokenCache = createCache(),
					compilerCache = createCache(),

					// Regex

					// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
					whitespace = "[\\x20\\t\\r\\n\\f]",
					// http://www.w3.org/TR/css3-syntax/#characters
					characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

					// Loosely modeled on CSS identifier characters
					// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
					// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
					identifier = characterEncoding.replace("w", "w#"),

					// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
					operators = "([*^$|!~]?=)",
					attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
						"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

					// Prefer arguments not in parens/brackets,
					//   then attribute selectors and non-pseudos (denoted by :),
					//   then anything else
					// These preferences are here to reduce the number of selectors
					//   needing tokenize in the PSEUDO preFilter
					pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

					// For matchExpr.POS and matchExpr.needsContext
					pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
						"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

					// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
					rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

					rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
					rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
					rpseudo = new RegExp(pseudos),

					// Easily-parseable/retrievable ID or TAG or CLASS selectors
					rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

					rnot = /^:not/,
					rsibling = /[\x20\t\r\n\f]*[+~]/,
					rendsWithNot = /:not\($/,

					rheader = /h\d/i,
					rinputs = /input|select|textarea|button/i,

					rbackslash = /\\(?!\\)/g,

					matchExpr = {
						"ID": new RegExp("^#(" + characterEncoding + ")"),
						"CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
						"NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
						"TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
						"ATTR": new RegExp("^" + attributes),
						"PSEUDO": new RegExp("^" + pseudos),
						"POS": new RegExp(pos, "i"),
						"CHILD": new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace +
							"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
							"*(\\d+)|))" + whitespace + "*\\)|)", "i"),
						// For use in libraries implementing .is()
						"needsContext": new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
					},

					// Support

					// Used for testing something on an element
					assert = function (fn) {
						var div = document.createElement("div");

						try {
							return fn(div);
						} catch (e) {
							return false;
						} finally {
							// release memory in IE
							div = null;
						}
					},

					// Check if getElementsByTagName("*") returns only elements
					assertTagNameNoComments = assert(function (div) {
						div.appendChild(document.createComment(""));
						return !div.getElementsByTagName("*").length;
					}),

					// Check if getAttribute returns normalized href attributes
					assertHrefNotNormalized = assert(function (div) {
						div.innerHTML = "<a href='#'></a>";
						return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
							div.firstChild.getAttribute("href") === "#";
					}),

					// Check if attributes should be retrieved by attribute nodes
					assertAttributes = assert(function (div) {
						div.innerHTML = "<select></select>";
						var type = typeof div.lastChild.getAttribute("multiple");
						// IE8 returns a string for some attributes even when not present
						return type !== "boolean" && type !== "string";
					}),

					// Check if getElementsByClassName can be trusted
					assertUsableClassName = assert(function (div) {
						// Opera can't find a second classname (in 9.6)
						div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
						if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
							return false;
						}

						// Safari 3.2 caches class attributes and doesn't catch changes
						div.lastChild.className = "e";
						return div.getElementsByClassName("e").length === 2;
					}),

					// Check if getElementById returns elements by name
					// Check if getElementsByName privileges form controls or returns elements by ID
					assertUsableName = assert(function (div) {
						// Inject content
						div.id = expando + 0;
						div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
						docElem.insertBefore(div, docElem.firstChild);

						// Test
						var pass = document.getElementsByName &&
							// buggy browsers will return fewer than the correct 2
							document.getElementsByName(expando).length === 2 +
							// buggy browsers will return more than the correct 0
							document.getElementsByName(expando + 0).length;
						assertGetIdNotName = !document.getElementById(expando);

						// Cleanup
						docElem.removeChild(div);

						return pass;
					});

				// If slice is not available, provide a backup
				try {
					slice.call(docElem.childNodes, 0)[0].nodeType;
				} catch (e) {
					slice = function (i) {
						var elem,
							results = [];
						for (; (elem = this[i]); i++) {
							results.push(elem);
						}
						return results;
					};
				}

				function Sizzle(selector, context, results, seed) {
					results = results || [];
					context = context || document;
					var match, elem, xml, m,
						nodeType = context.nodeType;

					if (!selector || typeof selector !== "string") {
						return results;
					}

					if (nodeType !== 1 && nodeType !== 9) {
						return [];
					}

					xml = isXML(context);

					if (!xml && !seed) {
						if ((match = rquickExpr.exec(selector))) {
							// Speed-up: Sizzle("#ID")
							if ((m = match[1])) {
								if (nodeType === 9) {
									elem = context.getElementById(m);
									// Check parentNode to catch when Blackberry 4.6 returns
									// nodes that are no longer in the document #6963
									if (elem && elem.parentNode) {
										// Handle the case where IE, Opera, and Webkit return items
										// by name instead of ID
										if (elem.id === m) {
											results.push(elem);
											return results;
										}
									} else {
										return results;
									}
								} else {
									// Context is not a document
									if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
										contains(context, elem) && elem.id === m) {
										results.push(elem);
										return results;
									}
								}

								// Speed-up: Sizzle("TAG")
							} else if (match[2]) {
								push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
								return results;

								// Speed-up: Sizzle(".CLASS")
							} else if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
								push.apply(results, slice.call(context.getElementsByClassName(m), 0));
								return results;
							}
						}
					}

					// All others
					return select(selector.replace(rtrim, "$1"), context, results, seed, xml);
				}

				Sizzle.matches = function (expr, elements) {
					return Sizzle(expr, null, null, elements);
				};

				Sizzle.matchesSelector = function (elem, expr) {
					return Sizzle(expr, null, null, [elem]).length > 0;
				};

				// Returns a function to use in pseudos for input types
				function createInputPseudo(type) {
					return function (elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === type;
					};
				}

				// Returns a function to use in pseudos for buttons
				function createButtonPseudo(type) {
					return function (elem) {
						var name = elem.nodeName.toLowerCase();
						return (name === "input" || name === "button") && elem.type === type;
					};
				}

				// Returns a function to use in pseudos for positionals
				function createPositionalPseudo(fn) {
					return markFunction(function (argument) {
						argument = +argument;
						return markFunction(function (seed, matches) {
							var j,
								matchIndexes = fn([], seed.length, argument),
								i = matchIndexes.length;

							// Match elements found at the specified indexes
							while (i--) {
								if (seed[(j = matchIndexes[i])]) {
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
				getText = Sizzle.getText = function (elem) {
					var node,
						ret = "",
						i = 0,
						nodeType = elem.nodeType;

					if (nodeType) {
						if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
							// Use textContent for elements
							// innerText usage removed for consistency of new lines (see #11153)
							if (typeof elem.textContent === "string") {
								return elem.textContent;
							} else {
								// Traverse its children
								for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
									ret += getText(elem);
								}
							}
						} else if (nodeType === 3 || nodeType === 4) {
							return elem.nodeValue;
						}
						// Do not include comment or processing instruction nodes
					} else {

						// If no nodeType, this is expected to be an array
						for (; (node = elem[i]); i++) {
							// Do not traverse comment nodes
							ret += getText(node);
						}
					}
					return ret;
				};

				isXML = Sizzle.isXML = function (elem) {
					// documentElement is verified for cases where it doesn't yet exist
					// (such as loading iframes in IE - #4833)
					var documentElement = elem && (elem.ownerDocument || elem).documentElement;
					return documentElement ? documentElement.nodeName !== "HTML" : false;
				};

				// Element contains another
				contains = Sizzle.contains = docElem.contains ?
					function (a, b) {
						var adown = a.nodeType === 9 ? a.documentElement : a,
							bup = b && b.parentNode;
						return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup));
					} :
					docElem.compareDocumentPosition ?
						function (a, b) {
							return b && !!(a.compareDocumentPosition(b) & 16);
						} :
						function (a, b) {
							while ((b = b.parentNode)) {
								if (b === a) {
									return true;
								}
							}
							return false;
						};

				Sizzle.attr = function (elem, name) {
					var val,
						xml = isXML(elem);

					if (!xml) {
						name = name.toLowerCase();
					}
					if ((val = Expr.attrHandle[name])) {
						return val(elem);
					}
					if (xml || assertAttributes) {
						return elem.getAttribute(name);
					}
					val = elem.getAttributeNode(name);
					return val ?
						typeof elem[name] === "boolean" ?
							elem[name] ? name : null :
							val.specified ? val.value : null :
						null;
				};

				Expr = Sizzle.selectors = {

					// Can be adjusted by the user
					cacheLength: 50,

					createPseudo: markFunction,

					match: matchExpr,

					// IE6/7 return a modified href
					attrHandle: assertHrefNotNormalized ?
						{} :
						{
							"href": function (elem) {
								return elem.getAttribute("href", 2);
							},
							"type": function (elem) {
								return elem.getAttribute("type");
							}
						},

					find: {
						"ID": assertGetIdNotName ?
							function (id, context, xml) {
								if (typeof context.getElementById !== strundefined && !xml) {
									var m = context.getElementById(id);
									// Check parentNode to catch when Blackberry 4.6 returns
									// nodes that are no longer in the document #6963
									return m && m.parentNode ? [m] : [];
								}
							} :
							function (id, context, xml) {
								if (typeof context.getElementById !== strundefined && !xml) {
									var m = context.getElementById(id);

									return m ?
										m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
											[m] :
											undefined :
										[];
								}
							},

						"TAG": assertTagNameNoComments ?
							function (tag, context) {
								if (typeof context.getElementsByTagName !== strundefined) {
									return context.getElementsByTagName(tag);
								}
							} :
							function (tag, context) {
								var results = context.getElementsByTagName(tag);

								// Filter out possible comments
								if (tag === "*") {
									var elem,
										tmp = [],
										i = 0;

									for (; (elem = results[i]); i++) {
										if (elem.nodeType === 1) {
											tmp.push(elem);
										}
									}

									return tmp;
								}
								return results;
							},

						"NAME": assertUsableName && function (tag, context) {
							if (typeof context.getElementsByName !== strundefined) {
								return context.getElementsByName(name);
							}
						},

						"CLASS": assertUsableClassName && function (className, context, xml) {
							if (typeof context.getElementsByClassName !== strundefined && !xml) {
								return context.getElementsByClassName(className);
							}
						}
					},

					relative: {
						">": { dir: "parentNode", first: true },
						" ": { dir: "parentNode" },
						"+": { dir: "previousSibling", first: true },
						"~": { dir: "previousSibling" }
					},

					preFilter: {
						"ATTR": function (match) {
							match[1] = match[1].replace(rbackslash, "");

							// Move the given value to match[3] whether quoted or unquoted
							match[3] = (match[4] || match[5] || "").replace(rbackslash, "");

							if (match[2] === "~=") {
								match[3] = " " + match[3] + " ";
							}

							return match.slice(0, 4);
						},

						"CHILD": function (match) {
							/* matches from matchExpr["CHILD"]
								1 type (only|nth|...)
								2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
								3 xn-component of xn+y argument ([+-]?\d*n|)
								4 sign of xn-component
								5 x of xn-component
								6 sign of y-component
								7 y of y-component
							*/
							match[1] = match[1].toLowerCase();

							if (match[1] === "nth") {
								// nth-child requires argument
								if (!match[2]) {
									Sizzle.error(match[0]);
								}

								// numeric x and y parameters for Expr.filter.CHILD
								// remember that false/true cast respectively to 0/1
								match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === "even" || match[2] === "odd"));
								match[4] = +((match[6] + match[7]) || match[2] === "odd");

								// other types prohibit arguments
							} else if (match[2]) {
								Sizzle.error(match[0]);
							}

							return match;
						},

						"PSEUDO": function (match) {
							var unquoted, excess;
							if (matchExpr["CHILD"].test(match[0])) {
								return null;
							}

							if (match[3]) {
								match[2] = match[3];
							} else if ((unquoted = match[4])) {
								// Only check arguments that contain a pseudo
								if (rpseudo.test(unquoted) &&
									// Get excess from tokenize (recursively)
									(excess = tokenize(unquoted, true)) &&
									// advance to the next closing parenthesis
									(excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

									// excess is a negative index
									unquoted = unquoted.slice(0, excess);
									match[0] = match[0].slice(0, excess);
								}
								match[2] = unquoted;
							}

							// Return only captures needed by the pseudo filter method (type and argument)
							return match.slice(0, 3);
						}
					},

					filter: {
						"ID": assertGetIdNotName ?
							function (id) {
								id = id.replace(rbackslash, "");
								return function (elem) {
									return elem.getAttribute("id") === id;
								};
							} :
							function (id) {
								id = id.replace(rbackslash, "");
								return function (elem) {
									var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
									return node && node.value === id;
								};
							},

						"TAG": function (nodeName) {
							if (nodeName === "*") {
								return function () { return true; };
							}
							nodeName = nodeName.replace(rbackslash, "").toLowerCase();

							return function (elem) {
								return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
							};
						},

						"CLASS": function (className) {
							var pattern = classCache[expando][className + " "];

							return pattern ||
								(pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
								classCache(className, function (elem) {
									return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
								});
						},

						"ATTR": function (name, operator, check) {
							return function (elem, context) {
								var result = Sizzle.attr(elem, name);

								if (result == null) {
									return operator === "!=";
								}
								if (!operator) {
									return true;
								}

								result += "";

								return operator === "=" ? result === check :
									operator === "!=" ? result !== check :
										operator === "^=" ? check && result.indexOf(check) === 0 :
											operator === "*=" ? check && result.indexOf(check) > -1 :
												operator === "$=" ? check && result.substr(result.length - check.length) === check :
													operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
														operator === "|=" ? result === check || result.substr(0, check.length + 1) === check + "-" :
															false;
							};
						},

						"CHILD": function (type, argument, first, last) {

							if (type === "nth") {
								return function (elem) {
									var node, diff,
										parent = elem.parentNode;

									if (first === 1 && last === 0) {
										return true;
									}

									if (parent) {
										diff = 0;
										for (node = parent.firstChild; node; node = node.nextSibling) {
											if (node.nodeType === 1) {
												diff++;
												if (elem === node) {
													break;
												}
											}
										}
									}

									// Incorporate the offset (or cast to NaN), then check against cycle size
									diff -= last;
									return diff === first || (diff % first === 0 && diff / first >= 0);
								};
							}

							return function (elem) {
								var node = elem;

								switch (type) {
									case "only":
									case "first":
										while ((node = node.previousSibling)) {
											if (node.nodeType === 1) {
												return false;
											}
										}

										if (type === "first") {
											return true;
										}

										node = elem;

									/* falls through */
									case "last":
										while ((node = node.nextSibling)) {
											if (node.nodeType === 1) {
												return false;
											}
										}

										return true;
								}
							};
						},

						"PSEUDO": function (pseudo, argument) {
							// pseudo-class names are case-insensitive
							// http://www.w3.org/TR/selectors/#pseudo-classes
							// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
							// Remember that setFilters inherits from pseudos
							var args,
								fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
									Sizzle.error("unsupported pseudo: " + pseudo);

							// The user may use createPseudo to indicate that
							// arguments are needed to create the filter function
							// just as Sizzle does
							if (fn[expando]) {
								return fn(argument);
							}

							// But maintain support for old signatures
							if (fn.length > 1) {
								args = [pseudo, pseudo, "", argument];
								return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
									markFunction(function (seed, matches) {
										var idx,
											matched = fn(seed, argument),
											i = matched.length;
										while (i--) {
											idx = indexOf.call(seed, matched[i]);
											seed[idx] = !(matches[idx] = matched[i]);
										}
									}) :
									function (elem) {
										return fn(elem, 0, args);
									};
							}

							return fn;
						}
					},

					pseudos: {
						"not": markFunction(function (selector) {
							// Trim the selector passed to compile
							// to avoid treating leading and trailing
							// spaces as combinators
							var input = [],
								results = [],
								matcher = compile(selector.replace(rtrim, "$1"));

							return matcher[expando] ?
								markFunction(function (seed, matches, context, xml) {
									var elem,
										unmatched = matcher(seed, null, xml, []),
										i = seed.length;

									// Match elements unmatched by `matcher`
									while (i--) {
										if ((elem = unmatched[i])) {
											seed[i] = !(matches[i] = elem);
										}
									}
								}) :
								function (elem, context, xml) {
									input[0] = elem;
									matcher(input, null, xml, results);
									return !results.pop();
								};
						}),

						"has": markFunction(function (selector) {
							return function (elem) {
								return Sizzle(selector, elem).length > 0;
							};
						}),

						"contains": markFunction(function (text) {
							return function (elem) {
								return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
							};
						}),

						"enabled": function (elem) {
							return elem.disabled === false;
						},

						"disabled": function (elem) {
							return elem.disabled === true;
						},

						"checked": function (elem) {
							// In CSS3, :checked should return both checked and selected elements
							// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
							var nodeName = elem.nodeName.toLowerCase();
							return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
						},

						"selected": function (elem) {
							// Accessing this property makes selected-by-default
							// options in Safari work properly
							if (elem.parentNode) {
								elem.parentNode.selectedIndex;
							}

							return elem.selected === true;
						},

						"parent": function (elem) {
							return !Expr.pseudos["empty"](elem);
						},

						"empty": function (elem) {
							// http://www.w3.org/TR/selectors/#empty-pseudo
							// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
							//   not comment, processing instructions, or others
							// Thanks to Diego Perini for the nodeName shortcut
							//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
							var nodeType;
							elem = elem.firstChild;
							while (elem) {
								if (elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4) {
									return false;
								}
								elem = elem.nextSibling;
							}
							return true;
						},

						"header": function (elem) {
							return rheader.test(elem.nodeName);
						},

						"text": function (elem) {
							var type, attr;
							// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
							// use getAttribute instead to test this case
							return elem.nodeName.toLowerCase() === "input" &&
								(type = elem.type) === "text" &&
								((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type);
						},

						// Input types
						"radio": createInputPseudo("radio"),
						"checkbox": createInputPseudo("checkbox"),
						"file": createInputPseudo("file"),
						"password": createInputPseudo("password"),
						"image": createInputPseudo("image"),

						"submit": createButtonPseudo("submit"),
						"reset": createButtonPseudo("reset"),

						"button": function (elem) {
							var name = elem.nodeName.toLowerCase();
							return name === "input" && elem.type === "button" || name === "button";
						},

						"input": function (elem) {
							return rinputs.test(elem.nodeName);
						},

						"focus": function (elem) {
							var doc = elem.ownerDocument;
							return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
						},

						"active": function (elem) {
							return elem === elem.ownerDocument.activeElement;
						},

						// Positional types
						"first": createPositionalPseudo(function () {
							return [0];
						}),

						"last": createPositionalPseudo(function (matchIndexes, length) {
							return [length - 1];
						}),

						"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
							return [argument < 0 ? argument + length : argument];
						}),

						"even": createPositionalPseudo(function (matchIndexes, length) {
							for (var i = 0; i < length; i += 2) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						}),

						"odd": createPositionalPseudo(function (matchIndexes, length) {
							for (var i = 1; i < length; i += 2) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						}),

						"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
							for (var i = argument < 0 ? argument + length : argument; --i >= 0;) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						}),

						"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
							for (var i = argument < 0 ? argument + length : argument; ++i < length;) {
								matchIndexes.push(i);
							}
							return matchIndexes;
						})
					}
				};

				function siblingCheck(a, b, ret) {
					if (a === b) {
						return ret;
					}

					var cur = a.nextSibling;

					while (cur) {
						if (cur === b) {
							return -1;
						}

						cur = cur.nextSibling;
					}

					return 1;
				}

				sortOrder = docElem.compareDocumentPosition ?
					function (a, b) {
						if (a === b) {
							hasDuplicate = true;
							return 0;
						}

						return (!a.compareDocumentPosition || !b.compareDocumentPosition ?
							a.compareDocumentPosition :
							a.compareDocumentPosition(b) & 4
						) ? -1 : 1;
					} :
					function (a, b) {
						// The nodes are identical, we can exit early
						if (a === b) {
							hasDuplicate = true;
							return 0;

							// Fallback to using sourceIndex (in IE) if it's available on both nodes
						} else if (a.sourceIndex && b.sourceIndex) {
							return a.sourceIndex - b.sourceIndex;
						}

						var al, bl,
							ap = [],
							bp = [],
							aup = a.parentNode,
							bup = b.parentNode,
							cur = aup;

						// If the nodes are siblings (or identical) we can do a quick check
						if (aup === bup) {
							return siblingCheck(a, b);

							// If no parents were found then the nodes are disconnected
						} else if (!aup) {
							return -1;

						} else if (!bup) {
							return 1;
						}

						// Otherwise they're somewhere else in the tree so we need
						// to build up a full list of the parentNodes for comparison
						while (cur) {
							ap.unshift(cur);
							cur = cur.parentNode;
						}

						cur = bup;

						while (cur) {
							bp.unshift(cur);
							cur = cur.parentNode;
						}

						al = ap.length;
						bl = bp.length;

						// Start walking down the tree looking for a discrepancy
						for (var i = 0; i < al && i < bl; i++) {
							if (ap[i] !== bp[i]) {
								return siblingCheck(ap[i], bp[i]);
							}
						}

						// We ended someplace up the tree so do a sibling check
						return i === al ?
							siblingCheck(a, bp[i], -1) :
							siblingCheck(ap[i], b, 1);
					};

				// Always assume the presence of duplicates if sort doesn't
				// pass them to our comparison function (as in Google Chrome).
				[0, 0].sort(sortOrder);
				baseHasDuplicate = !hasDuplicate;

				// Document sorting and removing duplicates
				Sizzle.uniqueSort = function (results) {
					var elem,
						duplicates = [],
						i = 1,
						j = 0;

					hasDuplicate = baseHasDuplicate;
					results.sort(sortOrder);

					if (hasDuplicate) {
						for (; (elem = results[i]); i++) {
							if (elem === results[i - 1]) {
								j = duplicates.push(i);
							}
						}
						while (j--) {
							results.splice(duplicates[j], 1);
						}
					}

					return results;
				};

				Sizzle.error = function (msg) {
					throw new Error("Syntax error, unrecognized expression: " + msg);
				};

				function tokenize(selector, parseOnly) {
					var matched, match, tokens, type,
						soFar, groups, preFilters,
						cached = tokenCache[expando][selector + " "];

					if (cached) {
						return parseOnly ? 0 : cached.slice(0);
					}

					soFar = selector;
					groups = [];
					preFilters = Expr.preFilter;

					while (soFar) {

						// Comma and first run
						if (!matched || (match = rcomma.exec(soFar))) {
							if (match) {
								// Don't consume trailing commas as valid
								soFar = soFar.slice(match[0].length) || soFar;
							}
							groups.push(tokens = []);
						}

						matched = false;

						// Combinators
						if ((match = rcombinators.exec(soFar))) {
							tokens.push(matched = new Token(match.shift()));
							soFar = soFar.slice(matched.length);

							// Cast descendant combinators to space
							matched.type = match[0].replace(rtrim, " ");
						}

						// Filters
						for (type in Expr.filter) {
							if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
								(match = preFilters[type](match)))) {

								tokens.push(matched = new Token(match.shift()));
								soFar = soFar.slice(matched.length);
								matched.type = type;
								matched.matches = match;
							}
						}

						if (!matched) {
							break;
						}
					}

					// Return the length of the invalid excess
					// if we're just parsing
					// Otherwise, throw an error or return tokens
					return parseOnly ?
						soFar.length :
						soFar ?
							Sizzle.error(selector) :
							// Cache the tokens
							tokenCache(selector, groups).slice(0);
				}

				function addCombinator(matcher, combinator, base) {
					var dir = combinator.dir,
						checkNonElements = base && combinator.dir === "parentNode",
						doneName = done++;

					return combinator.first ?
						// Check against closest ancestor/preceding element
						function (elem, context, xml) {
							while ((elem = elem[dir])) {
								if (checkNonElements || elem.nodeType === 1) {
									return matcher(elem, context, xml);
								}
							}
						} :

						// Check against all ancestor/preceding elements
						function (elem, context, xml) {
							// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
							if (!xml) {
								var cache,
									dirkey = dirruns + " " + doneName + " ",
									cachedkey = dirkey + cachedruns;
								while ((elem = elem[dir])) {
									if (checkNonElements || elem.nodeType === 1) {
										if ((cache = elem[expando]) === cachedkey) {
											return elem.sizset;
										} else if (typeof cache === "string" && cache.indexOf(dirkey) === 0) {
											if (elem.sizset) {
												return elem;
											}
										} else {
											elem[expando] = cachedkey;
											if (matcher(elem, context, xml)) {
												elem.sizset = true;
												return elem;
											}
											elem.sizset = false;
										}
									}
								}
							} else {
								while ((elem = elem[dir])) {
									if (checkNonElements || elem.nodeType === 1) {
										if (matcher(elem, context, xml)) {
											return elem;
										}
									}
								}
							}
						};
				}

				function elementMatcher(matchers) {
					return matchers.length > 1 ?
						function (elem, context, xml) {
							var i = matchers.length;
							while (i--) {
								if (!matchers[i](elem, context, xml)) {
									return false;
								}
							}
							return true;
						} :
						matchers[0];
				}

				function condense(unmatched, map, filter, context, xml) {
					var elem,
						newUnmatched = [],
						i = 0,
						len = unmatched.length,
						mapped = map != null;

					for (; i < len; i++) {
						if ((elem = unmatched[i])) {
							if (!filter || filter(elem, context, xml)) {
								newUnmatched.push(elem);
								if (mapped) {
									map.push(i);
								}
							}
						}
					}

					return newUnmatched;
				}

				function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
					if (postFilter && !postFilter[expando]) {
						postFilter = setMatcher(postFilter);
					}
					if (postFinder && !postFinder[expando]) {
						postFinder = setMatcher(postFinder, postSelector);
					}
					return markFunction(function (seed, results, context, xml) {
						var temp, i, elem,
							preMap = [],
							postMap = [],
							preexisting = results.length,

							// Get initial elements from seed or context
							elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

							// Prefilter to get matcher input, preserving a map for seed-results synchronization
							matcherIn = preFilter && (seed || !selector) ?
								condense(elems, preMap, preFilter, context, xml) :
								elems,

							matcherOut = matcher ?
								// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
								postFinder || (seed ? preFilter : preexisting || postFilter) ?

									// ...intermediate processing is necessary
									[] :

									// ...otherwise use results directly
									results :
								matcherIn;

						// Find primary matches
						if (matcher) {
							matcher(matcherIn, matcherOut, context, xml);
						}

						// Apply postFilter
						if (postFilter) {
							temp = condense(matcherOut, postMap);
							postFilter(temp, [], context, xml);

							// Un-match failing elements by moving them back to matcherIn
							i = temp.length;
							while (i--) {
								if ((elem = temp[i])) {
									matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
								}
							}
						}

						if (seed) {
							if (postFinder || preFilter) {
								if (postFinder) {
									// Get the final matcherOut by condensing this intermediate into postFinder contexts
									temp = [];
									i = matcherOut.length;
									while (i--) {
										if ((elem = matcherOut[i])) {
											// Restore matcherIn since elem is not yet a final match
											temp.push((matcherIn[i] = elem));
										}
									}
									postFinder(null, (matcherOut = []), temp, xml);
								}

								// Move matched elements from seed to results to keep them synchronized
								i = matcherOut.length;
								while (i--) {
									if ((elem = matcherOut[i]) &&
										(temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {

										seed[temp] = !(results[temp] = elem);
									}
								}
							}

							// Add elements to results, through postFinder if defined
						} else {
							matcherOut = condense(
								matcherOut === results ?
									matcherOut.splice(preexisting, matcherOut.length) :
									matcherOut
							);
							if (postFinder) {
								postFinder(null, results, matcherOut, xml);
							} else {
								push.apply(results, matcherOut);
							}
						}
					});
				}

				function matcherFromTokens(tokens) {
					var checkContext, matcher, j,
						len = tokens.length,
						leadingRelative = Expr.relative[tokens[0].type],
						implicitRelative = leadingRelative || Expr.relative[" "],
						i = leadingRelative ? 1 : 0,

						// The foundational matcher ensures that elements are reachable from top-level context(s)
						matchContext = addCombinator(function (elem) {
							return elem === checkContext;
						}, implicitRelative, true),
						matchAnyContext = addCombinator(function (elem) {
							return indexOf.call(checkContext, elem) > -1;
						}, implicitRelative, true),
						matchers = [function (elem, context, xml) {
							return (!leadingRelative && (xml || context !== outermostContext)) || (
								(checkContext = context).nodeType ?
									matchContext(elem, context, xml) :
									matchAnyContext(elem, context, xml));
						}];

					for (; i < len; i++) {
						if ((matcher = Expr.relative[tokens[i].type])) {
							matchers = [addCombinator(elementMatcher(matchers), matcher)];
						} else {
							matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

							// Return special upon seeing a positional matcher
							if (matcher[expando]) {
								// Find the next relative operator (if any) for proper handling
								j = ++i;
								for (; j < len; j++) {
									if (Expr.relative[tokens[j].type]) {
										break;
									}
								}
								return setMatcher(
									i > 1 && elementMatcher(matchers),
									i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"),
									matcher,
									i < j && matcherFromTokens(tokens.slice(i, j)),
									j < len && matcherFromTokens((tokens = tokens.slice(j))),
									j < len && tokens.join("")
								);
							}
							matchers.push(matcher);
						}
					}

					return elementMatcher(matchers);
				}

				function matcherFromGroupMatchers(elementMatchers, setMatchers) {
					var bySet = setMatchers.length > 0,
						byElement = elementMatchers.length > 0,
						superMatcher = function (seed, context, xml, results, expandContext) {
							var elem, j, matcher,
								setMatched = [],
								matchedCount = 0,
								i = "0",
								unmatched = seed && [],
								outermost = expandContext != null,
								contextBackup = outermostContext,
								// We must always have either seed elements or context
								elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
								// Nested matchers should use non-integer dirruns
								dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

							if (outermost) {
								outermostContext = context !== document && context;
								cachedruns = superMatcher.el;
							}

							// Add elements passing elementMatchers directly to results
							for (; (elem = elems[i]) != null; i++) {
								if (byElement && elem) {
									for (j = 0; (matcher = elementMatchers[j]); j++) {
										if (matcher(elem, context, xml)) {
											results.push(elem);
											break;
										}
									}
									if (outermost) {
										dirruns = dirrunsUnique;
										cachedruns = ++superMatcher.el;
									}
								}

								// Track unmatched elements for set filters
								if (bySet) {
									// They will have gone through all possible matchers
									if ((elem = !matcher && elem)) {
										matchedCount--;
									}

									// Lengthen the array for every element, matched or not
									if (seed) {
										unmatched.push(elem);
									}
								}
							}

							// Apply set filters to unmatched elements
							matchedCount += i;
							if (bySet && i !== matchedCount) {
								for (j = 0; (matcher = setMatchers[j]); j++) {
									matcher(unmatched, setMatched, context, xml);
								}

								if (seed) {
									// Reintegrate element matches to eliminate the need for sorting
									if (matchedCount > 0) {
										while (i--) {
											if (!(unmatched[i] || setMatched[i])) {
												setMatched[i] = pop.call(results);
											}
										}
									}

									// Discard index placeholder values to get only actual matches
									setMatched = condense(setMatched);
								}

								// Add matches to results
								push.apply(results, setMatched);

								// Seedless set matches succeeding multiple successful matchers stipulate sorting
								if (outermost && !seed && setMatched.length > 0 &&
									(matchedCount + setMatchers.length) > 1) {

									Sizzle.uniqueSort(results);
								}
							}

							// Override manipulation of globals by nested matchers
							if (outermost) {
								dirruns = dirrunsUnique;
								outermostContext = contextBackup;
							}

							return unmatched;
						};

					superMatcher.el = 0;
					return bySet ?
						markFunction(superMatcher) :
						superMatcher;
				}

				compile = Sizzle.compile = function (selector, group /* Internal Use Only */) {
					var i,
						setMatchers = [],
						elementMatchers = [],
						cached = compilerCache[expando][selector + " "];

					if (!cached) {
						// Generate a function of recursive functions that can be used to check each element
						if (!group) {
							group = tokenize(selector);
						}
						i = group.length;
						while (i--) {
							cached = matcherFromTokens(group[i]);
							if (cached[expando]) {
								setMatchers.push(cached);
							} else {
								elementMatchers.push(cached);
							}
						}

						// Cache the compiled function
						cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
					}
					return cached;
				};

				function multipleContexts(selector, contexts, results) {
					var i = 0,
						len = contexts.length;
					for (; i < len; i++) {
						Sizzle(selector, contexts[i], results);
					}
					return results;
				}

				function select(selector, context, results, seed, xml) {
					var i, tokens, token, type, find,
						match = tokenize(selector),
						j = match.length;

					if (!seed) {
						// Try to minimize operations if there is only one group
						if (match.length === 1) {

							// Take a shortcut and set the context if the root selector is an ID
							tokens = match[0] = match[0].slice(0);
							if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
								context.nodeType === 9 && !xml &&
								Expr.relative[tokens[1].type]) {

								context = Expr.find["ID"](token.matches[0].replace(rbackslash, ""), context, xml)[0];
								if (!context) {
									return results;
								}

								selector = selector.slice(tokens.shift().length);
							}

							// Fetch a seed set for right-to-left matching
							for (i = matchExpr["POS"].test(selector) ? -1 : tokens.length - 1; i >= 0; i--) {
								token = tokens[i];

								// Abort if we hit a combinator
								if (Expr.relative[(type = token.type)]) {
									break;
								}
								if ((find = Expr.find[type])) {
									// Search, expanding context for leading sibling combinators
									if ((seed = find(
										token.matches[0].replace(rbackslash, ""),
										rsibling.test(tokens[0].type) && context.parentNode || context,
										xml
									))) {

										// If seed is empty or no tokens remain, we can return early
										tokens.splice(i, 1);
										selector = seed.length && tokens.join("");
										if (!selector) {
											push.apply(results, slice.call(seed, 0));
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
					compile(selector, match)(
						seed,
						context,
						xml,
						results,
						rsibling.test(selector)
					);
					return results;
				}

				if (document.querySelectorAll) {
					(function () {
						var disconnectedMatch,
							oldSelect = select,
							rescape = /'|\\/g,
							rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

							// qSa(:focus) reports false when true (Chrome 21), no need to also add to buggyMatches since matches checks buggyQSA
							// A support test would require too much code (would include document ready)
							rbuggyQSA = [":focus"],

							// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
							// A support test would require too much code (would include document ready)
							// just skip matchesSelector for :active
							rbuggyMatches = [":active"],
							matches = docElem.matchesSelector ||
								docElem.mozMatchesSelector ||
								docElem.webkitMatchesSelector ||
								docElem.oMatchesSelector ||
								docElem.msMatchesSelector;

						// Build QSA regex
						// Regex strategy adopted from Diego Perini
						assert(function (div) {
							// Select is set to empty string on purpose
							// This is to test IE's treatment of not explictly
							// setting a boolean content attribute,
							// since its presence should be enough
							// http://bugs.jqx.com/ticket/12359
							div.innerHTML = "<select><option selected=''></option></select>";

							// IE8 - Some boolean attributes are not treated correctly
							if (!div.querySelectorAll("[selected]").length) {
								rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
							}

							// Webkit/Opera - :checked should return selected option elements
							// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
							// IE8 throws error here (do not put tests after this one)
							if (!div.querySelectorAll(":checked").length) {
								rbuggyQSA.push(":checked");
							}
						});

						assert(function (div) {

							// Opera 10-12/IE9 - ^= $= *= and empty values
							// Should not select anything
							div.innerHTML = "<p test=''></p>";
							if (div.querySelectorAll("[test^='']").length) {
								rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
							}

							// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
							// IE8 throws error here (do not put tests after this one)
							div.innerHTML = "<input type='hidden'/>";
							if (!div.querySelectorAll(":enabled").length) {
								rbuggyQSA.push(":enabled", ":disabled");
							}
						});

						// rbuggyQSA always contains :focus, so no need for a length check
						rbuggyQSA = /* rbuggyQSA.length && */ new RegExp(rbuggyQSA.join("|"));

						select = function (selector, context, results, seed, xml) {
							// Only use querySelectorAll when not filtering,
							// when this is not xml,
							// and when no QSA bugs apply
							if (!seed && !xml && !rbuggyQSA.test(selector)) {
								var groups, i,
									old = true,
									nid = expando,
									newContext = context,
									newSelector = context.nodeType === 9 && selector;

								// qSA works strangely on Element-rooted queries
								// We can work around this by specifying an extra ID on the root
								// and working up from there (Thanks to Andrew Dupont for the technique)
								// IE 8 doesn't work on object elements
								if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
									groups = tokenize(selector);

									if ((old = context.getAttribute("id"))) {
										nid = old.replace(rescape, "\\$&");
									} else {
										context.setAttribute("id", nid);
									}
									nid = "[id='" + nid + "'] ";

									i = groups.length;
									while (i--) {
										groups[i] = nid + groups[i].join("");
									}
									newContext = rsibling.test(selector) && context.parentNode || context;
									newSelector = groups.join(",");
								}

								if (newSelector) {
									try {
										push.apply(results, slice.call(newContext.querySelectorAll(
											newSelector
										), 0));
										return results;
									} catch (qsaError) {
									} finally {
										if (!old) {
											context.removeAttribute("id");
										}
									}
								}
							}

							return oldSelect(selector, context, results, seed, xml);
						};

						if (matches) {
							assert(function (div) {
								// Check to see if it's possible to do matchesSelector
								// on a disconnected node (IE 9)
								disconnectedMatch = matches.call(div, "div");

								// This should fail with an exception
								// Gecko does not error, returns false instead
								try {
									matches.call(div, "[test!='']:sizzle");
									rbuggyMatches.push("!=", pseudos);
								} catch (e) { }
							});

							// rbuggyMatches always contains :active and :focus, so no need for a length check
							rbuggyMatches = /* rbuggyMatches.length && */ new RegExp(rbuggyMatches.join("|"));

							Sizzle.matchesSelector = function (elem, expr) {
								// Make sure that attribute selectors are quoted
								expr = expr.replace(rattributeQuotes, "='$1']");

								// rbuggyMatches always contains :active, so no need for an existence check
								if (!isXML(elem) && !rbuggyMatches.test(expr) && !rbuggyQSA.test(expr)) {
									try {
										var ret = matches.call(elem, expr);

										// IE 9's matchesSelector returns false on disconnected nodes
										if (ret || disconnectedMatch ||
											// As well, disconnected nodes are said to be in a document
											// fragment in IE 9
											elem.document && elem.document.nodeType !== 11) {
											return ret;
										}
									} catch (e) { }
								}

								return Sizzle(expr, null, null, [elem]).length > 0;
							};
						}
					})();
				}

				// Deprecated
				Expr.pseudos["nth"] = Expr.pseudos["eq"];

				// Back-compat
				function setFilters() { }
				Expr.filters = setFilters.prototype = Expr.pseudos;
				Expr.setFilters = new setFilters();

				// Override sizzle attribute retrieval
				Sizzle.attr = JQXLite.attr;
				JQXLite.find = Sizzle;
				JQXLite.expr = Sizzle.selectors;
				JQXLite.expr[":"] = JQXLite.expr.pseudos;
				JQXLite.unique = Sizzle.uniqueSort;
				JQXLite.text = Sizzle.getText;
				JQXLite.isXMLDoc = Sizzle.isXML;
				JQXLite.contains = Sizzle.contains;


			})(window);
			var runtil = /Until$/,
				rparentsprev = /^(?:parents|prev(?:Until|All))/,
				isSimple = /^.[^:#\[\.,]*$/,
				rneedsContext = JQXLite.expr.match.needsContext,
				// methods guaranteed to produce a unique set when starting from a unique set
				guaranteedUnique = {
					children: true,
					contents: true,
					next: true,
					prev: true
				};

			JQXLite.fn.extend({
				find: function (selector) {
					var i, l, length, n, r, ret,
						self = this;

					if (typeof selector !== "string") {
						return JQXLite(selector).filter(function () {
							for (i = 0, l = self.length; i < l; i++) {
								if (JQXLite.contains(self[i], this)) {
									return true;
								}
							}
						});
					}

					ret = this.pushStack("", "find", selector);

					for (i = 0, l = this.length; i < l; i++) {
						length = ret.length;
						JQXLite.find(selector, this[i], ret);

						if (i > 0) {
							// Make sure that the results are unique
							for (n = length; n < ret.length; n++) {
								for (r = 0; r < length; r++) {
									if (ret[r] === ret[n]) {
										ret.splice(n--, 1);
										break;
									}
								}
							}
						}
					}

					return ret;
				},

				has: function (target) {
					var i,
						targets = JQXLite(target, this),
						len = targets.length;

					return this.filter(function () {
						for (i = 0; i < len; i++) {
							if (JQXLite.contains(this, targets[i])) {
								return true;
							}
						}
					});
				},

				not: function (selector) {
					return this.pushStack(winnow(this, selector, false), "not", selector);
				},

				filter: function (selector) {
					return this.pushStack(winnow(this, selector, true), "filter", selector);
				},

				is: function (selector) {
					return !!selector && (
						typeof selector === "string" ?
							// If this is a positional/relative selector, check membership in the returned set
							// so $("p:first").is("p:last") won't return true for a doc with two "p".
							rneedsContext.test(selector) ?
								JQXLite(selector, this.context).index(this[0]) >= 0 :
								JQXLite.filter(selector, this).length > 0 :
							this.filter(selector).length > 0);
				},

				closest: function (selectors, context) {
					var cur,
						i = 0,
						l = this.length,
						ret = [],
						pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
							JQXLite(selectors, context || this.context) :
							0;

					for (; i < l; i++) {
						cur = this[i];

						while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
							if (pos ? pos.index(cur) > -1 : JQXLite.find.matchesSelector(cur, selectors)) {
								ret.push(cur);
								break;
							}
							cur = cur.parentNode;
						}
					}

					ret = ret.length > 1 ? JQXLite.unique(ret) : ret;

					return this.pushStack(ret, "closest", selectors);
				},

				// Determine the position of an element within
				// the matched set of elements
				index: function (elem) {

					// No argument, return index in parent
					if (!elem) {
						return (this[0] && this[0].parentNode) ? this.prevAll().length : -1;
					}

					// index in selector
					if (typeof elem === "string") {
						return JQXLite.inArray(this[0], JQXLite(elem));
					}

					// Locate the position of the desired element
					return JQXLite.inArray(
						// If it receives a JQXLite object, the first element is used
						elem.jqx ? elem[0] : elem, this);
				},

				add: function (selector, context) {
					var set = typeof selector === "string" ?
						JQXLite(selector, context) :
						JQXLite.makeArray(selector && selector.nodeType ? [selector] : selector),
						all = JQXLite.merge(this.get(), set);

					return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ?
						all :
						JQXLite.unique(all));
				},

				addBack: function (selector) {
					return this.add(selector == null ?
						this.prevObject : this.prevObject.filter(selector)
					);
				}
			});

			JQXLite.fn.andSelf = JQXLite.fn.addBack;

			// A painfully simple check to see if an element is disconnected
			// from a document (should be improved, where feasible).
			function isDisconnected(node) {
				return !node || !node.parentNode || node.parentNode.nodeType === 11;
			}

			function sibling(cur, dir) {
				do {
					cur = cur[dir];
				} while (cur && cur.nodeType !== 1);

				return cur;
			}

			JQXLite.each({
				parent: function (elem) {
					var parent = elem.parentNode;
					return parent && parent.nodeType !== 11 ? parent : null;
				},
				parents: function (elem) {
					return JQXLite.dir(elem, "parentNode");
				},
				parentsUntil: function (elem, i, until) {
					return JQXLite.dir(elem, "parentNode", until);
				},
				next: function (elem) {
					return sibling(elem, "nextSibling");
				},
				prev: function (elem) {
					return sibling(elem, "previousSibling");
				},
				nextAll: function (elem) {
					return JQXLite.dir(elem, "nextSibling");
				},
				prevAll: function (elem) {
					return JQXLite.dir(elem, "previousSibling");
				},
				nextUntil: function (elem, i, until) {
					return JQXLite.dir(elem, "nextSibling", until);
				},
				prevUntil: function (elem, i, until) {
					return JQXLite.dir(elem, "previousSibling", until);
				},
				siblings: function (elem) {
					return JQXLite.sibling((elem.parentNode || {}).firstChild, elem);
				},
				children: function (elem) {
					return JQXLite.sibling(elem.firstChild);
				},
				contents: function (elem) {
					return JQXLite.nodeName(elem, "iframe") ?
						elem.contentDocument || elem.contentWindow.document :
						JQXLite.merge([], elem.childNodes);
				}
			}, function (name, fn) {
				JQXLite.fn[name] = function (until, selector) {
					var ret = JQXLite.map(this, fn, until);

					if (!runtil.test(name)) {
						selector = until;
					}

					if (selector && typeof selector === "string") {
						ret = JQXLite.filter(selector, ret);
					}

					ret = this.length > 1 && !guaranteedUnique[name] ? JQXLite.unique(ret) : ret;

					if (this.length > 1 && rparentsprev.test(name)) {
						ret = ret.reverse();
					}

					return this.pushStack(ret, name, core_slice.call(arguments).join(","));
				};
			});

			JQXLite.extend({
				filter: function (expr, elems, not) {
					if (not) {
						expr = ":not(" + expr + ")";
					}

					return elems.length === 1 ?
						JQXLite.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] :
						JQXLite.find.matches(expr, elems);
				},

				dir: function (elem, dir, until) {
					var matched = [],
						cur = elem[dir];

					while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !JQXLite(cur).is(until))) {
						if (cur.nodeType === 1) {
							matched.push(cur);
						}
						cur = cur[dir];
					}
					return matched;
				},

				sibling: function (n, elem) {
					var r = [];

					for (; n; n = n.nextSibling) {
						if (n.nodeType === 1 && n !== elem) {
							r.push(n);
						}
					}

					return r;
				}
			});

			// Implement the identical functionality for filter and not
			function winnow(elements, qualifier, keep) {

				// Can't pass null or undefined to indexOf in Firefox 4
				// Set to 0 to skip string check
				qualifier = qualifier || 0;

				if (JQXLite.isFunction(qualifier)) {
					return JQXLite.grep(elements, function (elem, i) {
						var retVal = !!qualifier.call(elem, i, elem);
						return retVal === keep;
					});

				} else if (qualifier.nodeType) {
					return JQXLite.grep(elements, function (elem, i) {
						return (elem === qualifier) === keep;
					});

				} else if (typeof qualifier === "string") {
					var filtered = JQXLite.grep(elements, function (elem) {
						return elem.nodeType === 1;
					});

					if (isSimple.test(qualifier)) {
						return JQXLite.filter(qualifier, filtered, !keep);
					} else {
						qualifier = JQXLite.filter(qualifier, filtered);
					}
				}

				return JQXLite.grep(elements, function (elem, i) {
					return (JQXLite.inArray(elem, qualifier) >= 0) === keep;
				});
			}
			function createSafeFragment(document) {
				var list = nodeNames.split("|"),
					safeFrag = document.createDocumentFragment();

				if (safeFrag.createElement) {
					while (list.length) {
						safeFrag.createElement(
							list.pop()
						);
					}
				}
				return safeFrag;
			}

			var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
				"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
				rinlinejQuery = / JQXLite\d+="(?:null|\d+)"/g,
				rleadingWhitespace = /^\s+/,
				rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
				rtagName = /<([\w:]+)/,
				rtbody = /<tbody/i,
				rhtml = /<|&#?\w+;/,
				rnoInnerhtml = /<(?:script|style|link)/i,
				rnocache = /<(?:script|object|embed|option|style)/i,
				rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
				rcheckableType = /^(?:checkbox|radio)$/,
				// checked="checked" or checked
				rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
				rscriptType = /\/(java|ecma)script/i,
				rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
				wrapMap = {
					option: [1, "<select multiple='multiple'>", "</select>"],
					legend: [1, "<fieldset>", "</fieldset>"],
					thead: [1, "<table>", "</table>"],
					tr: [2, "<table><tbody>", "</tbody></table>"],
					td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
					col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
					area: [1, "<map>", "</map>"],
					_default: [0, "", ""]
				},
				safeFragment = createSafeFragment(document),
				fragmentDiv = safeFragment.appendChild(document.createElement("div"));

			wrapMap.optgroup = wrapMap.option;
			wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
			wrapMap.th = wrapMap.td;

			// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
			// unless wrapped in a div with non-breaking characters in front of it.
			if (!JQXLite.support.htmlSerialize) {
				wrapMap._default = [1, "X<div>", "</div>"];
			}

			JQXLite.fn.extend({
				text: function (value) {
					return JQXLite.access(this, function (value) {
						return value === undefined ?
							JQXLite.text(this) :
							this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
					}, null, value, arguments.length);
				},

				wrapAll: function (html) {
					if (JQXLite.isFunction(html)) {
						return this.each(function (i) {
							JQXLite(this).wrapAll(html.call(this, i));
						});
					}

					if (this[0]) {
						// The elements to wrap the target around
						var wrap = JQXLite(html, this[0].ownerDocument).eq(0).clone(true);

						if (this[0].parentNode) {
							wrap.insertBefore(this[0]);
						}

						wrap.map(function () {
							var elem = this;

							while (elem.firstChild && elem.firstChild.nodeType === 1) {
								elem = elem.firstChild;
							}

							return elem;
						}).append(this);
					}

					return this;
				},

				wrapInner: function (html) {
					if (JQXLite.isFunction(html)) {
						return this.each(function (i) {
							JQXLite(this).wrapInner(html.call(this, i));
						});
					}

					return this.each(function () {
						var self = JQXLite(this),
							contents = self.contents();

						if (contents.length) {
							contents.wrapAll(html);

						} else {
							self.append(html);
						}
					});
				},

				wrap: function (html) {
					var isFunction = JQXLite.isFunction(html);

					return this.each(function (i) {
						JQXLite(this).wrapAll(isFunction ? html.call(this, i) : html);
					});
				},

				unwrap: function () {
					return this.parent().each(function () {
						if (!JQXLite.nodeName(this, "body")) {
							JQXLite(this).replaceWith(this.childNodes);
						}
					}).end();
				},

				append: function () {
					return this.domManip(arguments, true, function (elem) {
						if (this.nodeType === 1 || this.nodeType === 11) {
							this.appendChild(elem);
						}
					});
				},

				prepend: function () {
					return this.domManip(arguments, true, function (elem) {
						if (this.nodeType === 1 || this.nodeType === 11) {
							this.insertBefore(elem, this.firstChild);
						}
					});
				},

				before: function () {
					if (!isDisconnected(this[0])) {
						return this.domManip(arguments, false, function (elem) {
							this.parentNode.insertBefore(elem, this);
						});
					}

					if (arguments.length) {
						var set = JQXLite.clean(arguments);
						return this.pushStack(JQXLite.merge(set, this), "before", this.selector);
					}
				},

				after: function () {
					if (!isDisconnected(this[0])) {
						return this.domManip(arguments, false, function (elem) {
							this.parentNode.insertBefore(elem, this.nextSibling);
						});
					}

					if (arguments.length) {
						var set = JQXLite.clean(arguments);
						return this.pushStack(JQXLite.merge(this, set), "after", this.selector);
					}
				},

				// keepData is for internal use only--do not document
				remove: function (selector, keepData) {
					var elem,
						i = 0;

					for (; (elem = this[i]) != null; i++) {
						if (!selector || JQXLite.filter(selector, [elem]).length) {
							if (!keepData && elem.nodeType === 1) {
								JQXLite.cleanData(elem.getElementsByTagName("*"));
								JQXLite.cleanData([elem]);
							}

							if (elem.parentNode) {
								elem.parentNode.removeChild(elem);
							}
						}
					}

					return this;
				},

				empty: function () {
					var elem,
						i = 0;

					for (; (elem = this[i]) != null; i++) {
						// Remove element nodes and prevent memory leaks
						if (elem.nodeType === 1) {
							JQXLite.cleanData(elem.getElementsByTagName("*"));
						}

						// Remove any remaining nodes
						while (elem.firstChild) {
							elem.removeChild(elem.firstChild);
						}
					}

					return this;
				},

				clone: function (dataAndEvents, deepDataAndEvents) {
					dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
					deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

					return this.map(function () {
						return JQXLite.clone(this, dataAndEvents, deepDataAndEvents);
					});
				},

				html: function (value) {
					return JQXLite.access(this, function (value) {
						var elem = this[0] || {},
							i = 0,
							l = this.length;

						if (value === undefined) {
							return elem.nodeType === 1 ?
								elem.innerHTML.replace(rinlinejQuery, "") :
								undefined;
						}

						// See if we can take a shortcut and just use innerHTML
						if (typeof value === "string" && !rnoInnerhtml.test(value) &&
							(JQXLite.support.htmlSerialize || !rnoshimcache.test(value)) &&
							(JQXLite.support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
							!wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

							value = value.replace(rxhtmlTag, "<$1></$2>");

							try {
								for (; i < l; i++) {
									// Remove element nodes and prevent memory leaks
									elem = this[i] || {};
									if (elem.nodeType === 1) {
										JQXLite.cleanData(elem.getElementsByTagName("*"));
										elem.innerHTML = value;
									}
								}

								elem = 0;

								// If using innerHTML throws an exception, use the fallback method
							} catch (e) { }
						}

						if (elem) {
							this.empty().append(value);
						}
					}, null, value, arguments.length);
				},

				replaceWith: function (value) {
					if (!isDisconnected(this[0])) {
						// Make sure that the elements are removed from the DOM before they are inserted
						// this can help fix replacing a parent with child elements
						if (JQXLite.isFunction(value)) {
							return this.each(function (i) {
								var self = JQXLite(this), old = self.html();
								self.replaceWith(value.call(this, i, old));
							});
						}

						if (typeof value !== "string") {
							value = JQXLite(value).detach();
						}

						return this.each(function () {
							var next = this.nextSibling,
								parent = this.parentNode;

							JQXLite(this).remove();

							if (next) {
								JQXLite(next).before(value);
							} else {
								JQXLite(parent).append(value);
							}
						});
					}

					return this.length ?
						this.pushStack(JQXLite(JQXLite.isFunction(value) ? value() : value), "replaceWith", value) :
						this;
				},

				detach: function (selector) {
					return this.remove(selector, true);
				},

				domManip: function (args, table, callback) {

					// Flatten any nested arrays
					args = [].concat.apply([], args);

					var results, first, fragment, iNoClone,
						i = 0,
						value = args[0],
						scripts = [],
						l = this.length;

					// We can't cloneNode fragments that contain checked, in WebKit
					if (!JQXLite.support.checkClone && l > 1 && typeof value === "string" && rchecked.test(value)) {
						return this.each(function () {
							JQXLite(this).domManip(args, table, callback);
						});
					}

					if (JQXLite.isFunction(value)) {
						return this.each(function (i) {
							var self = JQXLite(this);
							args[0] = value.call(this, i, table ? self.html() : undefined);
							self.domManip(args, table, callback);
						});
					}

					if (this[0]) {
						results = JQXLite.buildFragment(args, this, scripts);
						fragment = results.fragment;
						first = fragment.firstChild;

						if (fragment.childNodes.length === 1) {
							fragment = first;
						}

						if (first) {
							table = table && JQXLite.nodeName(first, "tr");

							// Use the original fragment for the last item instead of the first because it can end up
							// being emptied incorrectly in certain situations (#8070).
							// Fragments from the fragment cache must always be cloned and never used in place.
							for (iNoClone = results.cacheable || l - 1; i < l; i++) {
								callback.call(
									table && JQXLite.nodeName(this[i], "table") ?
										findOrAppend(this[i], "tbody") :
										this[i],
									i === iNoClone ?
										fragment :
										JQXLite.clone(fragment, true, true)
								);
							}
						}

						// Fix #11809: Avoid leaking memory
						fragment = first = null;

						if (scripts.length) {
							JQXLite.each(scripts, function (i, elem) {
								if (elem.src) {
									if (JQXLite.ajax) {
										JQXLite.ajax({
											url: elem.src,
											type: "GET",
											dataType: "script",
											async: false,
											global: false,
											"throws": true
										});
									} else {
										JQXLite.error("no ajax");
									}
								} else {
									JQXLite.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, ""));
								}

								if (elem.parentNode) {
									elem.parentNode.removeChild(elem);
								}
							});
						}
					}

					return this;
				}
			});

			function findOrAppend(elem, tag) {
				return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
			}

			function cloneCopyEvent(src, dest) {

				if (dest.nodeType !== 1 || !JQXLite.hasData(src)) {
					return;
				}

				var type, i, l,
					oldData = JQXLite._data(src),
					curData = JQXLite._data(dest, oldData),
					events = oldData.events;

				if (events) {
					delete curData.handle;
					curData.events = {};

					for (type in events) {
						for (i = 0, l = events[type].length; i < l; i++) {
							JQXLite.event.add(dest, type, events[type][i]);
						}
					}
				}

				// make the cloned public data object a copy from the original
				if (curData.data) {
					curData.data = JQXLite.extend({}, curData.data);
				}
			}

			function cloneFixAttributes(src, dest) {
				var nodeName;

				// We do not need to do anything for non-Elements
				if (dest.nodeType !== 1) {
					return;
				}

				// clearAttributes removes the attributes, which we don't want,
				// but also removes the attachEvent events, which we *do* want
				if (dest.clearAttributes) {
					dest.clearAttributes();
				}

				// mergeAttributes, in contrast, only merges back on the
				// original attributes, not the events
				if (dest.mergeAttributes) {
					dest.mergeAttributes(src);
				}

				nodeName = dest.nodeName.toLowerCase();

				if (nodeName === "object") {
					// IE6-10 improperly clones children of object elements using classid.
					// IE10 throws NoModificationAllowedError if parent is null, #12132.
					if (dest.parentNode) {
						dest.outerHTML = src.outerHTML;
					}

					// This path appears unavoidable for IE9. When cloning an object
					// element in IE9, the outerHTML strategy above is not sufficient.
					// If the src has innerHTML and the destination does not,
					// copy the src.innerHTML into the dest.innerHTML. #10324
					if (JQXLite.support.html5Clone && (src.innerHTML && !JQXLite.trim(dest.innerHTML))) {
						dest.innerHTML = src.innerHTML;
					}

				} else if (nodeName === "input" && rcheckableType.test(src.type)) {
					// IE6-8 fails to persist the checked state of a cloned checkbox
					// or radio button. Worse, IE6-7 fail to give the cloned element
					// a checked appearance if the defaultChecked value isn't also set

					dest.defaultChecked = dest.checked = src.checked;

					// IE6-7 get confused and end up setting the value of a cloned
					// checkbox/radio button to an empty string instead of "on"
					if (dest.value !== src.value) {
						dest.value = src.value;
					}

					// IE6-8 fails to return the selected option to the default selected
					// state when cloning options
				} else if (nodeName === "option") {
					dest.selected = src.defaultSelected;

					// IE6-8 fails to set the defaultValue to the correct value when
					// cloning other types of input fields
				} else if (nodeName === "input" || nodeName === "textarea") {
					dest.defaultValue = src.defaultValue;

					// IE blanks contents when cloning scripts
				} else if (nodeName === "script" && dest.text !== src.text) {
					dest.text = src.text;
				}

				// Event data gets referenced instead of copied if the expando
				// gets copied too
				dest.removeAttribute(JQXLite.expando);
			}

			JQXLite.buildFragment = function (args, context, scripts) {
				var fragment, cacheable, cachehit,
					first = args[0];

				// Set context from what may come in as undefined or a JQXLite collection or a node
				// Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
				// also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
				context = context || document;
				context = !context.nodeType && context[0] || context;
				context = context.ownerDocument || context;

				// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
				// Cloning options loses the selected state, so don't cache them
				// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
				// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
				// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
				if (args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
					first.charAt(0) === "<" && !rnocache.test(first) &&
					(JQXLite.support.checkClone || !rchecked.test(first)) &&
					(JQXLite.support.html5Clone || !rnoshimcache.test(first))) {

					// Mark cacheable and look for a hit
					cacheable = true;
					fragment = JQXLite.fragments[first];
					cachehit = fragment !== undefined;
				}

				if (!fragment) {
					fragment = context.createDocumentFragment();
					JQXLite.clean(args, context, fragment, scripts);

					// Update the cache, but only store false
					// unless this is a second parsing of the same content
					if (cacheable) {
						JQXLite.fragments[first] = cachehit && fragment;
					}
				}

				return { fragment: fragment, cacheable: cacheable };
			};

			JQXLite.fragments = {};

			JQXLite.each({
				appendTo: "append",
				prependTo: "prepend",
				insertBefore: "before",
				insertAfter: "after",
				replaceAll: "replaceWith"
			}, function (name, original) {
				JQXLite.fn[name] = function (selector) {
					var elems,
						i = 0,
						ret = [],
						insert = JQXLite(selector),
						l = insert.length,
						parent = this.length === 1 && this[0].parentNode;

					if ((parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1) {
						insert[original](this[0]);
						return this;
					} else {
						for (; i < l; i++) {
							elems = (i > 0 ? this.clone(true) : this).get();
							JQXLite(insert[i])[original](elems);
							ret = ret.concat(elems);
						}

						return this.pushStack(ret, name, insert.selector);
					}
				};
			});

			function getAll(elem) {
				if (typeof elem.getElementsByTagName !== "undefined") {
					return elem.getElementsByTagName("*");

				} else if (typeof elem.querySelectorAll !== "undefined") {
					return elem.querySelectorAll("*");

				} else {
					return [];
				}
			}

			// Used in clean, fixes the defaultChecked property
			function fixDefaultChecked(elem) {
				if (rcheckableType.test(elem.type)) {
					elem.defaultChecked = elem.checked;
				}
			}

			JQXLite.extend({
				clone: function (elem, dataAndEvents, deepDataAndEvents) {
					var srcElements,
						destElements,
						i,
						clone;

					if (JQXLite.support.html5Clone || JQXLite.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
						clone = elem.cloneNode(true);

						// IE<=8 does not properly clone detached, unknown element nodes
					} else {
						fragmentDiv.innerHTML = elem.outerHTML;
						fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
					}

					if ((!JQXLite.support.noCloneEvent || !JQXLite.support.noCloneChecked) &&
						(elem.nodeType === 1 || elem.nodeType === 11) && !JQXLite.isXMLDoc(elem)) {
						// IE copies events bound via attachEvent when using cloneNode.
						// Calling detachEvent on the clone will also remove the events
						// from the original. In order to get around this, we use some
						// proprietary methods to clear the events. Thanks to MooTools
						// guys for this hotness.

						cloneFixAttributes(elem, clone);

						// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
						srcElements = getAll(elem);
						destElements = getAll(clone);

						// Weird iteration because IE will replace the length property
						// with an element if you are cloning the body and one of the
						// elements on the page has a name or id of "length"
						for (i = 0; srcElements[i]; ++i) {
							// Ensure that the destination node is not null; Fixes #9587
							if (destElements[i]) {
								cloneFixAttributes(srcElements[i], destElements[i]);
							}
						}
					}

					// Copy the events from the original to the clone
					if (dataAndEvents) {
						cloneCopyEvent(elem, clone);

						if (deepDataAndEvents) {
							srcElements = getAll(elem);
							destElements = getAll(clone);

							for (i = 0; srcElements[i]; ++i) {
								cloneCopyEvent(srcElements[i], destElements[i]);
							}
						}
					}

					srcElements = destElements = null;

					// Return the cloned set
					return clone;
				},

				clean: function (elems, context, fragment, scripts) {
					var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
						safe = context === document && safeFragment,
						ret = [];

					// Ensure that context is a document
					if (!context || typeof context.createDocumentFragment === "undefined") {
						context = document;
					}

					// Use the already-created safe fragment if context permits
					for (i = 0; (elem = elems[i]) != null; i++) {
						if (typeof elem === "number") {
							elem += "";
						}

						if (!elem) {
							continue;
						}

						// Convert html string into DOM nodes
						if (typeof elem === "string") {
							if (!rhtml.test(elem)) {
								elem = context.createTextNode(elem);
							} else {
								// Ensure a safe container in which to render the html
								safe = safe || createSafeFragment(context);
								div = context.createElement("div");
								safe.appendChild(div);

								// Fix "XHTML"-style tags in all browsers
								elem = elem.replace(rxhtmlTag, "<$1></$2>");

								// Go to html and back, then peel off extra wrappers
								tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
								wrap = wrapMap[tag] || wrapMap._default;
								depth = wrap[0];
								div.innerHTML = wrap[1] + elem + wrap[2];

								// Move to the right depth
								while (depth--) {
									div = div.lastChild;
								}

								// Remove IE's autoinserted <tbody> from table fragments
								if (!JQXLite.support.tbody) {

									// String was a <table>, *may* have spurious <tbody>
									hasBody = rtbody.test(elem);
									tbody = tag === "table" && !hasBody ?
										div.firstChild && div.firstChild.childNodes :

										// String was a bare <thead> or <tfoot>
										wrap[1] === "<table>" && !hasBody ?
											div.childNodes :
											[];

									for (j = tbody.length - 1; j >= 0; --j) {
										if (JQXLite.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
											tbody[j].parentNode.removeChild(tbody[j]);
										}
									}
								}

								// IE completely kills leading whitespace when innerHTML is used
								if (!JQXLite.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
									div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
								}

								elem = div.childNodes;

								// Take out of fragment container (we need a fresh div each time)
								div.parentNode.removeChild(div);
							}
						}

						if (elem.nodeType) {
							ret.push(elem);
						} else {
							JQXLite.merge(ret, elem);
						}
					}

					// Fix #11356: Clear elements from safeFragment
					if (div) {
						elem = div = safe = null;
					}

					// Reset defaultChecked for any radios and checkboxes
					// about to be appended to the DOM in IE 6/7 (#8060)
					if (!JQXLite.support.appendChecked) {
						for (i = 0; (elem = ret[i]) != null; i++) {
							if (JQXLite.nodeName(elem, "input")) {
								fixDefaultChecked(elem);
							} else if (typeof elem.getElementsByTagName !== "undefined") {
								JQXLite.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
							}
						}
					}

					// Append elements to a provided document fragment
					if (fragment) {
						// Special handling of each script element
						handleScript = function (elem) {
							// Check if we consider it executable
							if (!elem.type || rscriptType.test(elem.type)) {
								// Detach the script and store it in the scripts array (if provided) or the fragment
								// Return truthy to indicate that it has been handled
								return scripts ?
									scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) :
									fragment.appendChild(elem);
							}
						};

						for (i = 0; (elem = ret[i]) != null; i++) {
							// Check if we're done after handling an executable script
							if (!(JQXLite.nodeName(elem, "script") && handleScript(elem))) {
								// Append to fragment and handle embedded scripts
								fragment.appendChild(elem);
								if (typeof elem.getElementsByTagName !== "undefined") {
									// handleScript alters the DOM, so use JQXLite.merge to ensure snapshot iteration
									jsTags = JQXLite.grep(JQXLite.merge([], elem.getElementsByTagName("script")), handleScript);

									// Splice the scripts into ret after their former ancestor and advance our index beyond them
									ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
									i += jsTags.length;
								}
							}
						}
					}

					return ret;
				},

				cleanData: function (elems, /* internal */ acceptData) {
					var data, id, elem, type,
						i = 0,
						internalKey = JQXLite.expando,
						cache = JQXLite.cache,
						deleteExpando = JQXLite.support.deleteExpando,
						special = JQXLite.event.special;

					for (; (elem = elems[i]) != null; i++) {

						if (acceptData || JQXLite.acceptData(elem)) {

							id = elem[internalKey];
							data = id && cache[id];

							if (data) {
								if (data.events) {
									for (type in data.events) {
										if (special[type]) {
											JQXLite.event.remove(elem, type);

											// This is a shortcut to avoid JQXLite.event.remove's overhead
										} else {
											JQXLite.removeEvent(elem, type, data.handle);
										}
									}
								}

								// Remove cache only if it was not already removed by JQXLite.event.remove
								if (cache[id]) {

									delete cache[id];

									// IE does not allow us to delete expando properties from nodes,
									// nor does it have a removeAttribute function on Document nodes;
									// we must handle all of these cases
									if (deleteExpando) {
										delete elem[internalKey];

									} else if (elem.removeAttribute) {
										elem.removeAttribute(internalKey);

									} else {
										elem[internalKey] = null;
									}

									JQXLite.deletedIds.push(id);
								}
							}
						}
					}
				}
			});
			// Limit scope pollution from any deprecated API
			(function () {

				var matched, browser;

				// Use of JQXLite.browser is frowned upon.
				// More details: http://api.jqx.com/JQXLite.browser
				// JQXLite.uaMatch maintained for back-compat
				JQXLite.uaMatch = function (ua) {
					ua = ua.toLowerCase();

					var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
						/(webkit)[ \/]([\w.]+)/.exec(ua) ||
						/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
						/(msie) ([\w.]+)/.exec(ua) ||
						ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
						[];

					return {
						browser: match[1] || "",
						version: match[2] || "0"
					};
				};

				matched = JQXLite.uaMatch(navigator.userAgent);
				browser = {};

				if (matched.browser) {
					browser[matched.browser] = true;
					browser.version = matched.version;
				}

				// Chrome is Webkit, but Webkit is also Safari.
				if (browser.chrome) {
					browser.webkit = true;
				} else if (browser.webkit) {
					browser.safari = true;
				}

				JQXLite.browser = browser;

				JQXLite.sub = function () {
					function jQuerySub(selector, context) {
						return new jQuerySub.fn.init(selector, context);
					}
					JQXLite.extend(true, jQuerySub, this);
					jQuerySub.superclass = this;
					jQuerySub.fn = jQuerySub.prototype = this();
					jQuerySub.fn.constructor = jQuerySub;
					jQuerySub.sub = this.sub;
					jQuerySub.fn.init = function init(selector, context) {
						if (context && context instanceof JQXLite && !(context instanceof jQuerySub)) {
							context = jQuerySub(context);
						}

						return JQXLite.fn.init.call(this, selector, context, rootJQXLiteSub);
					};
					jQuerySub.fn.init.prototype = jQuerySub.fn;
					var rootJQXLiteSub = jQuerySub(document);
					return jQuerySub;
				};

			})();
			var curCSS, iframe, iframeDoc,
				ralpha = /alpha\([^)]*\)/i,
				ropacity = /opacity=([^)]*)/,
				rposition = /^(top|right|bottom|left)$/,
				// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
				// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
				rdisplayswap = /^(none|table(?!-c[ea]).+)/,
				rmargin = /^margin/,
				rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
				rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
				rrelNum = new RegExp("^([-+])=(" + core_pnum + ")", "i"),
				elemdisplay = { BODY: "block" },

				cssShow = { position: "absolute", visibility: "hidden", display: "block" },
				cssNormalTransform = {
					letterSpacing: 0,
					fontWeight: 400
				},

				cssExpand = ["Top", "Right", "Bottom", "Left"],
				cssPrefixes = ["Webkit", "O", "Moz", "ms"],

				eventsToggle = JQXLite.fn.toggle;

			// return a css property mapped to a potentially vendor prefixed property
			function vendorPropName(style, name) {

				// shortcut for names that are not vendor prefixed
				if (name in style) {
					return name;
				}

				// check for vendor prefixed names
				var capName = name.charAt(0).toUpperCase() + name.slice(1),
					origName = name,
					i = cssPrefixes.length;

				while (i--) {
					name = cssPrefixes[i] + capName;
					if (name in style) {
						return name;
					}
				}

				return origName;
			}

			function isHidden(elem, el) {
				elem = el || elem;
				return JQXLite.css(elem, "display") === "none" || !JQXLite.contains(elem.ownerDocument, elem);
			}

			function showHide(elements, show) {
				var elem, display,
					values = [],
					index = 0,
					length = elements.length;

				for (; index < length; index++) {
					elem = elements[index];
					if (!elem.style) {
						continue;
					}
					values[index] = JQXLite._data(elem, "olddisplay");
					if (show) {
						// Reset the inline display of this element to learn if it is
						// being hidden by cascaded rules or not
						if (!values[index] && elem.style.display === "none") {
							elem.style.display = "";
						}

						// Set elements which have been overridden with display: none
						// in a stylesheet to whatever the default browser style is
						// for such an element
						if (elem.style.display === "" && isHidden(elem)) {
							values[index] = JQXLite._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
						}
					} else {
						display = curCSS(elem, "display");

						if (!values[index] && display !== "none") {
							JQXLite._data(elem, "olddisplay", display);
						}
					}
				}

				// Set the display of most of the elements in a second loop
				// to avoid the constant reflow
				for (index = 0; index < length; index++) {
					elem = elements[index];
					if (!elem.style) {
						continue;
					}
					if (!show || elem.style.display === "none" || elem.style.display === "") {
						elem.style.display = show ? values[index] || "" : "none";
					}
				}

				return elements;
			}

			JQXLite.fn.extend({
				css: function (name, value) {
					return JQXLite.access(this, function (elem, name, value) {
						return value !== undefined ?
							JQXLite.style(elem, name, value) :
							JQXLite.css(elem, name);
					}, name, value, arguments.length > 1);
				},
				show: function () {
					return showHide(this, true);
				},
				hide: function () {
					return showHide(this);
				},
				toggle: function (state, fn2) {
					var bool = typeof state === "boolean";

					if (JQXLite.isFunction(state) && JQXLite.isFunction(fn2)) {
						return eventsToggle.apply(this, arguments);
					}

					return this.each(function () {
						if (bool ? state : isHidden(this)) {
							JQXLite(this).show();
						} else {
							JQXLite(this).hide();
						}
					});
				}
			});

			JQXLite.extend({
				// Add in style property hooks for overriding the default
				// behavior of getting and setting a style property
				cssHooks: {
					opacity: {
						get: function (elem, computed) {
							if (computed) {
								// We should always get a number back from opacity
								var ret = curCSS(elem, "opacity");
								return ret === "" ? "1" : ret;

							}
						}
					}
				},

				// Exclude the following css properties to add px
				cssNumber: {
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
					"float": JQXLite.support.cssFloat ? "cssFloat" : "styleFloat"
				},

				// Get and set the style property on a DOM Node
				style: function (elem, name, value, extra) {
					// Don't set styles on text and comment nodes
					if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
						return;
					}

					// Make sure that we're working with the right name
					var ret, type, hooks,
						origName = JQXLite.camelCase(name),
						style = elem.style;

					name = JQXLite.cssProps[origName] || (JQXLite.cssProps[origName] = vendorPropName(style, origName));

					// gets hook for the prefixed version
					// followed by the unprefixed version
					hooks = JQXLite.cssHooks[name] || JQXLite.cssHooks[origName];

					// Check if we're setting a value
					if (value !== undefined) {
						type = typeof value;

						// convert relative number strings (+= or -=) to relative numbers. #7345
						if (type === "string" && (ret = rrelNum.exec(value))) {
							value = (ret[1] + 1) * ret[2] + parseFloat(JQXLite.css(elem, name));
							// Fixes bug #9237
							type = "number";
						}

						// Make sure that NaN and null values aren't set. See: #7116
						if (value == null || type === "number" && isNaN(value)) {
							return;
						}

						// If a number was passed in, add 'px' to the (except for certain CSS properties)
						if (type === "number" && !JQXLite.cssNumber[origName]) {
							value += "px";
						}

						// If a hook was provided, use that value, otherwise just set the specified value
						if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
							// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
							// Fixes bug #5509
							try {
								style[name] = value;
							} catch (e) { }
						}

					} else {
						// If a hook was provided get the non-computed value from there
						if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
							return ret;
						}

						// Otherwise just get the value from the style object
						return style[name];
					}
				},

				css: function (elem, name, numeric, extra) {
					var val, num, hooks,
						origName = JQXLite.camelCase(name);

					// Make sure that we're working with the right name
					name = JQXLite.cssProps[origName] || (JQXLite.cssProps[origName] = vendorPropName(elem.style, origName));

					// gets hook for the prefixed version
					// followed by the unprefixed version
					hooks = JQXLite.cssHooks[name] || JQXLite.cssHooks[origName];

					// If a hook was provided get the computed value from there
					if (hooks && "get" in hooks) {
						val = hooks.get(elem, true, extra);
					}

					// Otherwise, if a way to get the computed value exists, use that
					if (val === undefined) {
						val = curCSS(elem, name);
					}

					//convert "normal" to computed value
					if (val === "normal" && name in cssNormalTransform) {
						val = cssNormalTransform[name];
					}

					// Return, converting to number if forced or a qualifier was provided and val looks numeric
					if (numeric || extra !== undefined) {
						num = parseFloat(val);
						return numeric || JQXLite.isNumeric(num) ? num || 0 : val;
					}
					return val;
				},

				// A method for quickly swapping in/out CSS properties to get correct calculations
				swap: function (elem, options, callback) {
					var ret, name,
						old = {};

					// Remember the old values, and insert the new ones
					for (name in options) {
						old[name] = elem.style[name];
						elem.style[name] = options[name];
					}

					ret = callback.call(elem);

					// Revert the old values
					for (name in options) {
						elem.style[name] = old[name];
					}

					return ret;
				}
			});

			// NOTE: To any future maintainer, we've window.getComputedStyle
			// because jsdom on node.js will break without it.
			if (window.getComputedStyle) {
				curCSS = function (elem, name) {
					var ret, width, minWidth, maxWidth,
						computed = window.getComputedStyle(elem, null),
						style = elem.style;

					if (computed) {

						// getPropertyValue is only needed for .css('filter') in IE9, see #12537
						ret = computed.getPropertyValue(name) || computed[name];

						if (ret === "" && !JQXLite.contains(elem.ownerDocument, elem)) {
							ret = JQXLite.style(elem, name);
						}

						// A tribute to the "awesome hack by Dean Edwards"
						// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
						// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
						// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
						if (rnumnonpx.test(ret) && rmargin.test(name)) {
							width = style.width;
							minWidth = style.minWidth;
							maxWidth = style.maxWidth;

							style.minWidth = style.maxWidth = style.width = ret;
							ret = computed.width;

							style.width = width;
							style.minWidth = minWidth;
							style.maxWidth = maxWidth;
						}
					}

					return ret;
				};
			} else if (document.documentElement.currentStyle) {
				curCSS = function (elem, name) {
					var left, rsLeft,
						ret = elem.currentStyle && elem.currentStyle[name],
						style = elem.style;

					// Avoid setting ret to empty string here
					// so we don't default to auto
					if (ret == null && style && style[name]) {
						ret = style[name];
					}

					// From the awesome hack by Dean Edwards
					// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

					// If we're not dealing with a regular pixel number
					// but a number that has a weird ending, we need to convert it to pixels
					// but not position css attributes, as those are proportional to the parent element instead
					// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
					if (rnumnonpx.test(ret) && !rposition.test(name)) {

						// Remember the original values
						left = style.left;
						rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

						// Put in the new values to get a computed value out
						if (rsLeft) {
							elem.runtimeStyle.left = elem.currentStyle.left;
						}
						style.left = name === "fontSize" ? "1em" : ret;
						ret = style.pixelLeft + "px";

						// Revert the changed values
						style.left = left;
						if (rsLeft) {
							elem.runtimeStyle.left = rsLeft;
						}
					}

					return ret === "" ? "auto" : ret;
				};
			}

			function setPositiveNumber(elem, value, subtract) {
				var matches = rnumsplit.exec(value);
				return matches ?
					Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :
					value;
			}

			function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
				var i = extra === (isBorderBox ? "border" : "content") ?
					// If we already have the right measurement, avoid augmentation
					4 :
					// Otherwise initialize for horizontal or vertical properties
					name === "width" ? 1 : 0,

					val = 0;

				for (; i < 4; i += 2) {
					// both box models exclude margin, so add it if we want it
					if (extra === "margin") {
						// we use JQXLite.css instead of curCSS here
						// because of the reliableMarginRight CSS hook!
						val += JQXLite.css(elem, extra + cssExpand[i], true);
					}

					// From this point on we use curCSS for maximum performance (relevant in animations)
					if (isBorderBox) {
						// border-box includes padding, so remove it if we want content
						if (extra === "content") {
							val -= parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0;
						}

						// at this point, extra isn't border nor margin, so remove border
						if (extra !== "margin") {
							val -= parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0;
						}
					} else {
						// at this point, extra isn't content, so add padding
						val += parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0;

						// at this point, extra isn't content nor padding, so add border
						if (extra !== "padding") {
							val += parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0;
						}
					}
				}

				return val;
			}

			function getWidthOrHeight(elem, name, extra) {

				// Start with offset property, which is equivalent to the border-box value
				var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
					valueIsBorderBox = true,
					isBorderBox = JQXLite.support.boxSizing && JQXLite.css(elem, "boxSizing") === "border-box";

				// some non-html elements return undefined for offsetWidth, so check for null/undefined
				// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
				// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
				if (val <= 0 || val == null) {
					// Fall back to computed then uncomputed css if necessary
					val = curCSS(elem, name);
					if (val < 0 || val == null) {
						val = elem.style[name];
					}

					// Computed unit is not pixels. Stop here and return.
					if (rnumnonpx.test(val)) {
						return val;
					}

					// we need the check for style in case a browser which returns unreliable values
					// for getComputedStyle silently falls back to the reliable elem.style
					valueIsBorderBox = isBorderBox && (JQXLite.support.boxSizingReliable || val === elem.style[name]);

					// Normalize "", auto, and prepare for extra
					val = parseFloat(val) || 0;
				}

				// use the active box-sizing model to add/subtract irrelevant styles
				return (val +
					augmentWidthOrHeight(
						elem,
						name,
						extra || (isBorderBox ? "border" : "content"),
						valueIsBorderBox
					)
				) + "px";
			}


			// Try to determine the default display value of an element
			function css_defaultDisplay(nodeName) {
				if (elemdisplay[nodeName]) {
					return elemdisplay[nodeName];
				}

				var elem = JQXLite("<" + nodeName + ">").appendTo(document.body),
					display = elem.css("display");
				elem.remove();

				// If the simple way fails,
				// get element's real default display by attaching it to a temp iframe
				if (display === "none" || display === "") {
					// Use the already-created iframe if possible
					iframe = document.body.appendChild(
						iframe || JQXLite.extend(document.createElement("iframe"), {
							frameBorder: 0,
							width: 0,
							height: 0
						})
					);

					// Create a cacheable copy of the iframe document on first call.
					// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
					// document to it; WebKit & Firefox won't allow reusing the iframe document.
					if (!iframeDoc || !iframe.createElement) {
						iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
						iframeDoc.write("<!doctype html><html><body>");
						iframeDoc.close();
					}

					elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));

					display = curCSS(elem, "display");
					document.body.removeChild(iframe);
				}

				// Store the correct default display
				elemdisplay[nodeName] = display;

				return display;
			}

			JQXLite.each(["height", "width"], function (i, name) {
				JQXLite.cssHooks[name] = {
					get: function (elem, computed, extra) {
						if (computed) {
							// certain elements can have dimension info if we invisibly show them
							// however, it must have a current display style that would benefit from this
							if (elem.offsetWidth === 0 && rdisplayswap.test(curCSS(elem, "display"))) {
								return JQXLite.swap(elem, cssShow, function () {
									return getWidthOrHeight(elem, name, extra);
								});
							} else {
								return getWidthOrHeight(elem, name, extra);
							}
						}
					},

					set: function (elem, value, extra) {
						return setPositiveNumber(elem, value, extra ?
							augmentWidthOrHeight(
								elem,
								name,
								extra,
								JQXLite.support.boxSizing && JQXLite.css(elem, "boxSizing") === "border-box"
							) : 0
						);
					}
				};
			});

			if (!JQXLite.support.opacity) {
				JQXLite.cssHooks.opacity = {
					get: function (elem, computed) {
						// IE uses filters for opacity
						return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
							(0.01 * parseFloat(RegExp.$1)) + "" :
							computed ? "1" : "";
					},

					set: function (elem, value) {
						var style = elem.style,
							currentStyle = elem.currentStyle,
							opacity = JQXLite.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
							filter = currentStyle && currentStyle.filter || style.filter || "";

						// IE has trouble with opacity if it does not have layout
						// Force it by setting the zoom level
						style.zoom = 1;

						// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
						if (value >= 1 && JQXLite.trim(filter.replace(ralpha, "")) === "" &&
							style.removeAttribute) {

							// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
							// if "filter:" is present at all, clearType is disabled, we want to avoid this
							// style.removeAttribute is IE Only, but so apparently is this code path...
							style.removeAttribute("filter");

							// if there there is no filter style applied in a css rule, we are done
							if (currentStyle && !currentStyle.filter) {
								return;
							}
						}

						// otherwise, set new filter values
						style.filter = ralpha.test(filter) ?
							filter.replace(ralpha, opacity) :
							filter + " " + opacity;
					}
				};
			}

			// These hooks cannot be added until DOM ready because the support test
			// for it is not run until after DOM ready
			JQXLite(function () {
				if (!JQXLite.support.reliableMarginRight) {
					JQXLite.cssHooks.marginRight = {
						get: function (elem, computed) {
							// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
							// Work around by temporarily setting element display to inline-block
							return JQXLite.swap(elem, { "display": "inline-block" }, function () {
								if (computed) {
									return curCSS(elem, "marginRight");
								}
							});
						}
					};
				}

				// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
				// getComputedStyle returns percent when specified for top/left/bottom/right
				// rather than make the css module depend on the offset module, we just check for it here
				if (!JQXLite.support.pixelPosition && JQXLite.fn.position) {
					JQXLite.each(["top", "left"], function (i, prop) {
						JQXLite.cssHooks[prop] = {
							get: function (elem, computed) {
								if (computed) {
									var ret = curCSS(elem, prop);
									// if curCSS returns percentage, fallback to offset
									return rnumnonpx.test(ret) ? JQXLite(elem).position()[prop] + "px" : ret;
								}
							}
						};
					});
				}

			});

			if (JQXLite.expr && JQXLite.expr.filters) {
				JQXLite.expr.filters.hidden = function (elem) {
					return (elem.offsetWidth === 0 && elem.offsetHeight === 0) || (!JQXLite.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS(elem, "display")) === "none");
				};

				JQXLite.expr.filters.visible = function (elem) {
					return !JQXLite.expr.filters.hidden(elem);
				};
			}

			// These hooks are used by animate to expand properties
			JQXLite.each({
				margin: "",
				padding: "",
				border: "Width"
			}, function (prefix, suffix) {
				JQXLite.cssHooks[prefix + suffix] = {
					expand: function (value) {
						var i,

							// assumes a single number if not a string
							parts = typeof value === "string" ? value.split(" ") : [value],
							expanded = {};

						for (i = 0; i < 4; i++) {
							expanded[prefix + cssExpand[i] + suffix] =
								parts[i] || parts[i - 2] || parts[0];
						}

						return expanded;
					}
				};

				if (!rmargin.test(prefix)) {
					JQXLite.cssHooks[prefix + suffix].set = setPositiveNumber;
				}
			});
			var r20 = /%20/g,
				rbracket = /\[\]$/,
				rCRLF = /\r?\n/g,
				rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
				rselectTextarea = /^(?:select|textarea)/i;

			JQXLite.fn.extend({
				serialize: function () {
					return JQXLite.param(this.serializeArray());
				},
				serializeArray: function () {
					return this.map(function () {
						return this.elements ? JQXLite.makeArray(this.elements) : this;
					})
						.filter(function () {
							return this.name && !this.disabled &&
								(this.checked || rselectTextarea.test(this.nodeName) ||
									rinput.test(this.type));
						})
						.map(function (i, elem) {
							var val = JQXLite(this).val();

							return val == null ?
								null :
								JQXLite.isArray(val) ?
									JQXLite.map(val, function (val, i) {
										return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
									}) :
									{ name: elem.name, value: val.replace(rCRLF, "\r\n") };
						}).get();
				}
			});

			//Serialize an array of form elements or a set of
			//key/values into a query string
			JQXLite.param = function (a, traditional) {
				var prefix,
					s = [],
					add = function (key, value) {
						// If value is a function, invoke it and return its value
						value = JQXLite.isFunction(value) ? value() : (value == null ? "" : value);
						s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
					};

				// Set traditional to true for JQXLite <= 1.3.2 behavior.
				if (traditional === undefined) {
					traditional = JQXLite.ajaxSettings && JQXLite.ajaxSettings.traditional;
				}

				// If an array was passed in, assume that it is an array of form elements.
				if (JQXLite.isArray(a) || (a.jqx && !JQXLite.isPlainObject(a))) {
					// Serialize the form elements
					JQXLite.each(a, function () {
						add(this.name, this.value);
					});

				} else {
					// If traditional, encode the "old" way (the way 1.3.2 or older
					// did it), otherwise encode params recursively.
					for (prefix in a) {
						buildParams(prefix, a[prefix], traditional, add);
					}
				}

				// Return the resulting serialization
				return s.join("&").replace(r20, "+");
			};

			function buildParams(prefix, obj, traditional, add) {
				var name;

				if (JQXLite.isArray(obj)) {
					// Serialize array item.
					JQXLite.each(obj, function (i, v) {
						if (traditional || rbracket.test(prefix)) {
							// Treat each array item as a scalar.
							add(prefix, v);

						} else {
							// If array item is non-scalar (array or object), encode its
							// numeric index to resolve deserialization ambiguity issues.
							// Note that rack (as of 1.0.0) can't currently deserialize
							// nested arrays properly, and attempting to do so may cause
							// a server error. Possible fixes are to modify rack's
							// deserialization algorithm or to provide an option or flag
							// to force array serialization to be shallow.
							buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
						}
					});

				} else if (!traditional && JQXLite.type(obj) === "object") {
					// Serialize object item.
					for (name in obj) {
						buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
					}

				} else {
					// Serialize scalar item.
					add(prefix, obj);
				}
			}


			// Create transport if the browser can provide an xhr
			if (JQXLite.support.ajax) {

				JQXLite.ajaxTransport(function (s) {
					// Cross domain only allowed if supported through XMLHttpRequest
					if (!s.crossDomain || JQXLite.support.cors) {

						var callback;

						return {
							send: function (headers, complete) {

								// Get a new xhr
								var handle, i,
									xhr = s.xhr();

								// Open the socket
								// Passing null username, generates a login popup on Opera (#2865)
								if (s.username) {
									xhr.open(s.type, s.url, s.async, s.username, s.password);
								} else {
									xhr.open(s.type, s.url, s.async);
								}

								// Apply custom fields if provided
								if (s.xhrFields) {
									for (i in s.xhrFields) {
										xhr[i] = s.xhrFields[i];
									}
								}

								// Override mime type if needed
								if (s.mimeType && xhr.overrideMimeType) {
									xhr.overrideMimeType(s.mimeType);
								}

								// X-Requested-With header
								// For cross-domain requests, seeing as conditions for a preflight are
								// akin to a jigsaw puzzle, we simply never set it to be sure.
								// (it can always be set on a per-request basis or even using ajaxSetup)
								// For same-domain requests, won't change header if already provided.
								if (!s.crossDomain && !headers["X-Requested-With"]) {
									headers["X-Requested-With"] = "XMLHttpRequest";
								}

								// Need an extra try/catch for cross domain requests in Firefox 3
								try {
									for (i in headers) {
										xhr.setRequestHeader(i, headers[i]);
									}
								} catch (_) { }

								// Do send the request
								// This may raise an exception which is actually
								// handled in JQXLite.ajax (so no try/catch here)
								xhr.send((s.hasContent && s.data) || null);

								// Listener
								callback = function (_, isAbort) {

									var status,
										statusText,
										responseHeaders,
										responses,
										xml;

									// Firefox throws exceptions when accessing properties
									// of an xhr when a network error occurred
									// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
									try {

										// Was never called and is aborted or complete
										if (callback && (isAbort || xhr.readyState === 4)) {

											// Only called once
											callback = undefined;

											// Do not keep as active anymore
											if (handle) {
												xhr.onreadystatechange = JQXLite.noop;
												if (xhrOnUnloadAbort) {
													delete xhrCallbacks[handle];
												}
											}

											// If it's an abort
											if (isAbort) {
												// Abort it manually if needed
												if (xhr.readyState !== 4) {
													xhr.abort();
												}
											} else {
												status = xhr.status;
												responseHeaders = xhr.getAllResponseHeaders();
												responses = {};
												xml = xhr.responseXML;

												// Construct response list
												if (xml && xml.documentElement /* #4958 */) {
													responses.xml = xml;
												}

												// When requesting binary data, IE6-9 will throw an exception
												// on any attempt to access responseText (#11426)
												try {
													responses.text = xhr.responseText;
												} catch (e) {
												}

												// Firefox throws an exception when accessing
												// statusText for faulty cross-domain requests
												try {
													statusText = xhr.statusText;
												} catch (e) {
													// We normalize with Webkit giving an empty statusText
													statusText = "";
												}

												// Filter status for non standard behaviors

												// If the request is local and we have data: assume a success
												// (success with no data won't get notified, that's the best we
												// can do given current implementations)
												if (!status && s.isLocal && !s.crossDomain) {
													status = responses.text ? 200 : 404;
													// IE - #1450: sometimes returns 1223 when it should be 204
												} else if (status === 1223) {
													status = 204;
												}
											}
										}
									} catch (firefoxAccessException) {
										if (!isAbort) {
											complete(-1, firefoxAccessException);
										}
									}

									// Call complete if needed
									if (responses) {
										complete(status, statusText, responses, responseHeaders);
									}
								};

								if (!s.async) {
									// if we're in sync mode we fire the callback
									callback();
								} else if (xhr.readyState === 4) {
									// (IE6 & IE7) if it's in cache and has been
									// retrieved directly we need to fire the callback
									setTimeout(callback, 0);
								} else {
									handle = ++xhrId;
									if (xhrOnUnloadAbort) {
										// Create the active xhrs callbacks list if needed
										// and attach the unload handler
										if (!xhrCallbacks) {
											xhrCallbacks = {};
											JQXLite(window).unload(xhrOnUnloadAbort);
										}
										// Add to list of active xhrs callbacks
										xhrCallbacks[handle] = callback;
									}
									xhr.onreadystatechange = callback;
								}
							},

							abort: function () {
								if (callback) {
									callback(0, 1);
								}
							}
						};
					}
				});
			}
			var fxNow, timerId,
				rfxtypes = /^(?:toggle|show|hide)$/,
				rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
				rrun = /queueHooks$/,
				animationPrefilters = [defaultPrefilter],
				tweeners = {
					"*": [function (prop, value) {
						var end, unit,
							tween = this.createTween(prop, value),
							parts = rfxnum.exec(value),
							target = tween.cur(),
							start = +target || 0,
							scale = 1,
							maxIterations = 20;

						if (parts) {
							end = +parts[2];
							unit = parts[3] || (JQXLite.cssNumber[prop] ? "" : "px");

							// We need to compute starting value
							if (unit !== "px" && start) {
								// Iteratively approximate from a nonzero starting point
								// Prefer the current property, because this process will be trivial if it uses the same units
								// Fallback to end or a simple constant
								start = JQXLite.css(tween.elem, prop, true) || end || 1;

								do {
									// If previous iteration zeroed out, double until we get *something*
									// Use a string for doubling factor so we don't accidentally see scale as unchanged below
									scale = scale || ".5";

									// Adjust and apply
									start = start / scale;
									JQXLite.style(tween.elem, prop, start + unit);

									// Update scale, tolerating zero or NaN from tween.cur()
									// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
								} while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
							}

							tween.unit = unit;
							tween.start = start;
							// If a +=/-= token was provided, we're doing a relative animation
							tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
						}
						return tween;
					}]
				};

			// Animations created synchronously will run synchronously
			function createFxNow() {
				setTimeout(function () {
					fxNow = undefined;
				}, 0);
				return (fxNow = JQXLite.now());
			}

			function createTweens(animation, props) {
				JQXLite.each(props, function (prop, value) {
					var collection = (tweeners[prop] || []).concat(tweeners["*"]),
						index = 0,
						length = collection.length;
					for (; index < length; index++) {
						if (collection[index].call(animation, prop, value)) {

							// we're done with this property
							return;
						}
					}
				});
			}

			function Animation(elem, properties, options) {
				var result,
					index = 0,
					tweenerIndex = 0,
					length = animationPrefilters.length,
					deferred = JQXLite.Deferred().always(function () {
						// don't match elem in the :animated selector
						delete tick.elem;
					}),
					tick = function () {
						var currentTime = fxNow || createFxNow(),
							remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
							// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
							temp = remaining / animation.duration || 0,
							percent = 1 - temp,
							index = 0,
							length = animation.tweens.length;

						for (; index < length; index++) {
							animation.tweens[index].run(percent);
						}

						deferred.notifyWith(elem, [animation, percent, remaining]);

						if (percent < 1 && length) {
							return remaining;
						} else {
							deferred.resolveWith(elem, [animation]);
							return false;
						}
					},
					animation = deferred.promise({
						elem: elem,
						props: JQXLite.extend({}, properties),
						opts: JQXLite.extend(true, { specialEasing: {} }, options),
						originalProperties: properties,
						originalOptions: options,
						startTime: fxNow || createFxNow(),
						duration: options.duration,
						tweens: [],
						createTween: function (prop, end, easing) {
							var tween = JQXLite.Tween(elem, animation.opts, prop, end,
								animation.opts.specialEasing[prop] || animation.opts.easing);
							animation.tweens.push(tween);
							return tween;
						},
						stop: function (gotoEnd) {
							var index = 0,
								// if we are going to the end, we want to run all the tweens
								// otherwise we skip this part
								length = gotoEnd ? animation.tweens.length : 0;

							for (; index < length; index++) {
								animation.tweens[index].run(1);
							}

							// resolve when we played the last frame
							// otherwise, reject
							if (gotoEnd) {
								deferred.resolveWith(elem, [animation, gotoEnd]);
							} else {
								deferred.rejectWith(elem, [animation, gotoEnd]);
							}
							return this;
						}
					}),
					props = animation.props;

				propFilter(props, animation.opts.specialEasing);

				for (; index < length; index++) {
					result = animationPrefilters[index].call(animation, elem, props, animation.opts);
					if (result) {
						return result;
					}
				}

				createTweens(animation, props);

				if (JQXLite.isFunction(animation.opts.start)) {
					animation.opts.start.call(elem, animation);
				}

				JQXLite.fx.timer(
					JQXLite.extend(tick, {
						anim: animation,
						queue: animation.opts.queue,
						elem: elem
					})
				);

				// attach callbacks from options
				return animation.progress(animation.opts.progress)
					.done(animation.opts.done, animation.opts.complete)
					.fail(animation.opts.fail)
					.always(animation.opts.always);
			}

			function propFilter(props, specialEasing) {
				var index, name, easing, value, hooks;

				// camelCase, specialEasing and expand cssHook pass
				for (index in props) {
					name = JQXLite.camelCase(index);
					easing = specialEasing[name];
					value = props[index];
					if (JQXLite.isArray(value)) {
						easing = value[1];
						value = props[index] = value[0];
					}

					if (index !== name) {
						props[name] = value;
						delete props[index];
					}

					hooks = JQXLite.cssHooks[name];
					if (hooks && "expand" in hooks) {
						value = hooks.expand(value);
						delete props[name];

						// not quite $.extend, this wont overwrite keys already present.
						// also - reusing 'index' from above because we have the correct "name"
						for (index in value) {
							if (!(index in props)) {
								props[index] = value[index];
								specialEasing[index] = easing;
							}
						}
					} else {
						specialEasing[name] = easing;
					}
				}
			}

			JQXLite.Animation = JQXLite.extend(Animation, {

				tweener: function (props, callback) {
					if (JQXLite.isFunction(props)) {
						callback = props;
						props = ["*"];
					} else {
						props = props.split(" ");
					}

					var prop,
						index = 0,
						length = props.length;

					for (; index < length; index++) {
						prop = props[index];
						tweeners[prop] = tweeners[prop] || [];
						tweeners[prop].unshift(callback);
					}
				},

				prefilter: function (callback, prepend) {
					if (prepend) {
						animationPrefilters.unshift(callback);
					} else {
						animationPrefilters.push(callback);
					}
				}
			});

			function defaultPrefilter(elem, props, opts) {
				var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
					anim = this,
					style = elem.style,
					orig = {},
					handled = [],
					hidden = elem.nodeType && isHidden(elem);

				// handle queue: false promises
				if (!opts.queue) {
					hooks = JQXLite._queueHooks(elem, "fx");
					if (hooks.unqueued == null) {
						hooks.unqueued = 0;
						oldfire = hooks.empty.fire;
						hooks.empty.fire = function () {
							if (!hooks.unqueued) {
								oldfire();
							}
						};
					}
					hooks.unqueued++;

					anim.always(function () {
						// doing this makes sure that the complete handler will be called
						// before this completes
						anim.always(function () {
							hooks.unqueued--;
							if (!JQXLite.queue(elem, "fx").length) {
								hooks.empty.fire();
							}
						});
					});
				}

				// height/width overflow pass
				if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opts.overflow = [style.overflow, style.overflowX, style.overflowY];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height animated
					if (JQXLite.css(elem, "display") === "inline" &&
						JQXLite.css(elem, "float") === "none") {

						// inline-level elements accept inline-block;
						// block-level elements need to be inline with layout
						if (!JQXLite.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
							style.display = "inline-block";

						} else {
							style.zoom = 1;
						}
					}
				}

				if (opts.overflow) {
					style.overflow = "hidden";
					if (!JQXLite.support.shrinkWrapBlocks) {
						anim.done(function () {
							style.overflow = opts.overflow[0];
							style.overflowX = opts.overflow[1];
							style.overflowY = opts.overflow[2];
						});
					}
				}


				// show/hide pass
				for (index in props) {
					value = props[index];
					if (rfxtypes.exec(value)) {
						delete props[index];
						toggle = toggle || value === "toggle";
						if (value === (hidden ? "hide" : "show")) {
							continue;
						}
						handled.push(index);
					}
				}

				length = handled.length;
				if (length) {
					dataShow = JQXLite._data(elem, "fxshow") || JQXLite._data(elem, "fxshow", {});
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}

					// store state if its toggle - enables .stop().toggle() to "reverse"
					if (toggle) {
						dataShow.hidden = !hidden;
					}
					if (hidden) {
						JQXLite(elem).show();
					} else {
						anim.done(function () {
							JQXLite(elem).hide();
						});
					}
					anim.done(function () {
						var prop;
						JQXLite.removeData(elem, "fxshow", true);
						for (prop in orig) {
							JQXLite.style(elem, prop, orig[prop]);
						}
					});
					for (index = 0; index < length; index++) {
						prop = handled[index];
						tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
						orig[prop] = dataShow[prop] || JQXLite.style(elem, prop);

						if (!(prop in dataShow)) {
							dataShow[prop] = tween.start;
							if (hidden) {
								tween.end = tween.start;
								tween.start = prop === "width" || prop === "height" ? 1 : 0;
							}
						}
					}
				}
			}

			function Tween(elem, options, prop, end, easing) {
				return new Tween.prototype.init(elem, options, prop, end, easing);
			}
			JQXLite.Tween = Tween;

			Tween.prototype = {
				constructor: Tween,
				init: function (elem, options, prop, end, easing, unit) {
					this.elem = elem;
					this.prop = prop;
					this.easing = easing || "swing";
					this.options = options;
					this.start = this.now = this.cur();
					this.end = end;
					this.unit = unit || (JQXLite.cssNumber[prop] ? "" : "px");
				},
				cur: function () {
					var hooks = Tween.propHooks[this.prop];

					return hooks && hooks.get ?
						hooks.get(this) :
						Tween.propHooks._default.get(this);
				},
				run: function (percent) {
					var eased,
						hooks = Tween.propHooks[this.prop];

					if (this.options.duration) {
						this.pos = eased = JQXLite.easing[this.easing](
							percent, this.options.duration * percent, 0, 1, this.options.duration
						);
					} else {
						this.pos = eased = percent;
					}
					this.now = (this.end - this.start) * eased + this.start;

					if (this.options.step) {
						this.options.step.call(this.elem, this.now, this);
					}

					if (hooks && hooks.set) {
						hooks.set(this);
					} else {
						Tween.propHooks._default.set(this);
					}
					return this;
				}
			};

			Tween.prototype.init.prototype = Tween.prototype;

			Tween.propHooks = {
				_default: {
					get: function (tween) {
						var result;

						if (tween.elem[tween.prop] != null &&
							(!tween.elem.style || tween.elem.style[tween.prop] == null)) {
							return tween.elem[tween.prop];
						}

						// passing any value as a 4th parameter to .css will automatically
						// attempt a parseFloat and fallback to a string if the parse fails
						// so, simple values such as "10px" are parsed to Float.
						// complex values such as "rotate(1rad)" are returned as is.
						result = JQXLite.css(tween.elem, tween.prop, false, "");
						// Empty strings, null, undefined and "auto" are converted to 0.
						return !result || result === "auto" ? 0 : result;
					},
					set: function (tween) {
						// use step hook for back compat - use cssHook if its there - use .style if its
						// available and use plain properties where available
						if (JQXLite.fx.step[tween.prop]) {
							JQXLite.fx.step[tween.prop](tween);
						} else if (tween.elem.style && (tween.elem.style[JQXLite.cssProps[tween.prop]] != null || JQXLite.cssHooks[tween.prop])) {
							JQXLite.style(tween.elem, tween.prop, tween.now + tween.unit);
						} else {
							tween.elem[tween.prop] = tween.now;
						}
					}
				}
			};

			// Remove in 2.0 - this supports IE8's panic based approach
			// to setting things on disconnected nodes

			Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
				set: function (tween) {
					if (tween.elem.nodeType && tween.elem.parentNode) {
						tween.elem[tween.prop] = tween.now;
					}
				}
			};

			JQXLite.each(["toggle", "show", "hide"], function (i, name) {
				var cssFn = JQXLite.fn[name];
				JQXLite.fn[name] = function (speed, easing, callback) {
					return speed == null || typeof speed === "boolean" ||
						// special check for .toggle( handler, handler, ... )
						(!i && JQXLite.isFunction(speed) && JQXLite.isFunction(easing)) ?
						cssFn.apply(this, arguments) :
						this.animate(genFx(name, true), speed, easing, callback);
				};
			});

			JQXLite.fn.extend({
				fadeTo: function (speed, to, easing, callback) {

					// show any hidden elements after setting opacity to 0
					return this.filter(isHidden).css("opacity", 0).show()

						// animate to the value specified
						.end().animate({ opacity: to }, speed, easing, callback);
				},
				animate: function (prop, speed, easing, callback) {
					var empty = JQXLite.isEmptyObject(prop),
						optall = JQXLite.speed(speed, easing, callback),
						doAnimation = function () {
							// Operate on a copy of prop so per-property easing won't be lost
							var anim = Animation(this, JQXLite.extend({}, prop), optall);

							// Empty animations resolve immediately
							if (empty) {
								anim.stop(true);
							}
						};

					return empty || optall.queue === false ?
						this.each(doAnimation) :
						this.queue(optall.queue, doAnimation);
				},
				stop: function (type, clearQueue, gotoEnd) {
					var stopQueue = function (hooks) {
						var stop = hooks.stop;
						delete hooks.stop;
						stop(gotoEnd);
					};

					if (typeof type !== "string") {
						gotoEnd = clearQueue;
						clearQueue = type;
						type = undefined;
					}
					if (clearQueue && type !== false) {
						this.queue(type || "fx", []);
					}

					return this.each(function () {
						var dequeue = true,
							index = type != null && type + "queueHooks",
							timers = JQXLite.timers,
							data = JQXLite._data(this);

						if (index) {
							if (data[index] && data[index].stop) {
								stopQueue(data[index]);
							}
						} else {
							for (index in data) {
								if (data[index] && data[index].stop && rrun.test(index)) {
									stopQueue(data[index]);
								}
							}
						}

						for (index = timers.length; index--;) {
							if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
								timers[index].anim.stop(gotoEnd);
								dequeue = false;
								timers.splice(index, 1);
							}
						}

						// start the next in the queue if the last step wasn't forced
						// timers currently will call their complete callbacks, which will dequeue
						// but only if they were gotoEnd
						if (dequeue || !gotoEnd) {
							JQXLite.dequeue(this, type);
						}
					});
				}
			});

			// Generate parameters to create a standard animation
			function genFx(type, includeWidth) {
				var which,
					attrs = { height: type },
					i = 0;

				// if we include width, step value is 1 to do all cssExpand values,
				// if we don't include width, step value is 2 to skip over Left and Right
				includeWidth = includeWidth ? 1 : 0;
				for (; i < 4; i += 2 - includeWidth) {
					which = cssExpand[i];
					attrs["margin" + which] = attrs["padding" + which] = type;
				}

				if (includeWidth) {
					attrs.opacity = attrs.width = type;
				}

				return attrs;
			}

			// Generate shortcuts for custom animations
			JQXLite.each({
				slideDown: genFx("show"),
				slideUp: genFx("hide"),
				slideToggle: genFx("toggle"),
				fadeIn: { opacity: "show" },
				fadeOut: { opacity: "hide" },
				fadeToggle: { opacity: "toggle" }
			}, function (name, props) {
				JQXLite.fn[name] = function (speed, easing, callback) {
					return this.animate(props, speed, easing, callback);
				};
			});

			JQXLite.speed = function (speed, easing, fn) {
				var opt = speed && typeof speed === "object" ? JQXLite.extend({}, speed) : {
					complete: fn || !fn && easing ||
						JQXLite.isFunction(speed) && speed,
					duration: speed,
					easing: fn && easing || easing && !JQXLite.isFunction(easing) && easing
				};

				opt.duration = JQXLite.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
					opt.duration in JQXLite.fx.speeds ? JQXLite.fx.speeds[opt.duration] : JQXLite.fx.speeds._default;

				// normalize opt.queue - true/undefined/null -> "fx"
				if (opt.queue == null || opt.queue === true) {
					opt.queue = "fx";
				}

				// Queueing
				opt.old = opt.complete;

				opt.complete = function () {
					if (JQXLite.isFunction(opt.old)) {
						opt.old.call(this);
					}

					if (opt.queue) {
						JQXLite.dequeue(this, opt.queue);
					}
				};

				return opt;
			};

			JQXLite.easing = {
				linear: function (p) {
					return p;
				},
				swing: function (p) {
					return 0.5 - Math.cos(p * Math.PI) / 2;
				}
			};

			JQXLite.timers = [];
			JQXLite.fx = Tween.prototype.init;
			JQXLite.fx.tick = function () {
				var timer,
					timers = JQXLite.timers,
					i = 0;

				fxNow = JQXLite.now();

				for (; i < timers.length; i++) {
					timer = timers[i];
					// Checks the timer has not already been removed
					if (!timer() && timers[i] === timer) {
						timers.splice(i--, 1);
					}
				}

				if (!timers.length) {
					JQXLite.fx.stop();
				}
				fxNow = undefined;
			};

			JQXLite.fx.timer = function (timer) {
				if (timer() && JQXLite.timers.push(timer) && !timerId) {
					timerId = setInterval(JQXLite.fx.tick, JQXLite.fx.interval);
				}
			};

			JQXLite.fx.interval = 13;

			JQXLite.fx.stop = function () {
				clearInterval(timerId);
				timerId = null;
			};

			JQXLite.fx.speeds = {
				slow: 600,
				fast: 200,
				// Default speed
				_default: 400
			};

			// Back Compat <1.8 extension point
			JQXLite.fx.step = {};

			if (JQXLite.expr && JQXLite.expr.filters) {
				JQXLite.expr.filters.animated = function (elem) {
					return JQXLite.grep(JQXLite.timers, function (fn) {
						return elem === fn.elem;
					}).length;
				};
			}
			var rroot = /^(?:body|html)$/i;

			JQXLite.fn.offset = function (options) {
				if (arguments.length) {
					return options === undefined ?
						this :
						this.each(function (i) {
							JQXLite.offset.setOffset(this, options, i);
						});
				}

				var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
					box = { top: 0, left: 0 },
					elem = this[0],
					doc = elem && elem.ownerDocument;

				if (!doc) {
					return;
				}

				if ((body = doc.body) === elem) {
					return JQXLite.offset.bodyOffset(elem);
				}

				docElem = doc.documentElement;

				// Make sure it's not a disconnected DOM node
				if (!JQXLite.contains(docElem, elem)) {
					return box;
				}

				// If we don't have gBCR, just use 0,0 rather than error
				// BlackBerry 5, iOS 3 (original iPhone)
				if (typeof elem.getBoundingClientRect !== "undefined") {
					box = elem.getBoundingClientRect();
				}
				win = getWindow(doc);
				clientTop = docElem.clientTop || body.clientTop || 0;
				clientLeft = docElem.clientLeft || body.clientLeft || 0;
				scrollTop = win.pageYOffset || docElem.scrollTop;
				scrollLeft = win.pageXOffset || docElem.scrollLeft;
				return {
					top: box.top + scrollTop - clientTop,
					left: box.left + scrollLeft - clientLeft
				};
			};

			JQXLite.offset = {

				bodyOffset: function (body) {
					var top = body.offsetTop,
						left = body.offsetLeft;

					if (JQXLite.support.doesNotIncludeMarginInBodyOffset) {
						top += parseFloat(JQXLite.css(body, "marginTop")) || 0;
						left += parseFloat(JQXLite.css(body, "marginLeft")) || 0;
					}

					return { top: top, left: left };
				},

				setOffset: function (elem, options, i) {
					var position = JQXLite.css(elem, "position");

					// set position first, in-case top/left are set even on static elem
					if (position === "static") {
						elem.style.position = "relative";
					}

					var curElem = JQXLite(elem),
						curOffset = curElem.offset(),
						curCSSTop = JQXLite.css(elem, "top"),
						curCSSLeft = JQXLite.css(elem, "left"),
						calculatePosition = (position === "absolute" || position === "fixed") && JQXLite.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
						props = {}, curPosition = {}, curTop, curLeft;

					// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
					if (calculatePosition) {
						curPosition = curElem.position();
						curTop = curPosition.top;
						curLeft = curPosition.left;
					} else {
						curTop = parseFloat(curCSSTop) || 0;
						curLeft = parseFloat(curCSSLeft) || 0;
					}

					if (JQXLite.isFunction(options)) {
						options = options.call(elem, i, curOffset);
					}

					if (options.top != null) {
						props.top = (options.top - curOffset.top) + curTop;
					}
					if (options.left != null) {
						props.left = (options.left - curOffset.left) + curLeft;
					}

					if ("using" in options) {
						options.using.call(elem, props);
					} else {
						curElem.css(props);
					}
				}
			};


			JQXLite.fn.extend({
				isRendered: function () {
					var that = this;
					var element = this[0];
					if (element.parentNode == null || (element.offsetWidth === 0 || element.offsetHeight === 0)) {
						return false;
					}

					return true;
				},

				getSizeFromStyle: function () {
					var that = this;
					var width = null;
					var height = null;
					var element = this[0];
					var computedStyle;

					if (element.style.width) {
						width = element.style.width;
					}
					if (element.style.height) {
						height = element.style.height;
					}

					if (window.getComputedStyle) {
						computedStyle = getComputedStyle(element, null);
					}
					else {
						computedStyle = element.currentStyle;
					}

					if (computedStyle) {
						if (computedStyle.width) {
							width = computedStyle.width;
						}
						if (computedStyle.height) {
							height = computedStyle.height;
						}
					}
					if (width === '0px') width = 0;
					if (height === '0px') height = 0;
					if (width === null) width = 0;
					if (height === null) height = 0;

					return { width: width, height: height };
				},

				initAnimate: function () {

				},

				sizeStyleChanged: function (resizeFn) {
					var that = this;

					var watchedElementData;

					var checkForChanges = function (mutations) {
						var data = watchedElementData;
						if (mutations && mutations[0] && mutations[0].attributeName === 'style' && mutations[0].type === 'attributes') {
							if (data.element.offsetWidth !== data.offsetWidth ||
								data.element.offsetHeight !== data.offsetHeight) {
								data.offsetWidth = data.element.offsetWidth;
								data.offsetHeight = data.element.offsetHeight;
								if (that.isRendered()) {
									data.callback();
								}
							}
						}
					}

					watchedElementData = {
						element: that[0],
						offsetWidth: that[0].offsetWidth,
						offsetHeight: that[0].offsetHeight,
						callback: resizeFn
					};

					try {
						if (!that.elementStyleObserver) {
							that.elementStyleObserver = new MutationObserver(checkForChanges);
							that.elementStyleObserver.observe(that[0], {
								attributes: true,
								childList: false,
								characterData: false
							});

						}
					}
					catch (error) { }
				},

				position: function () {
					if (!this[0]) {
						return;
					}

					var elem = this[0],

						// Get *real* offsetParent
						offsetParent = this.offsetParent(),

						// Get correct offsets
						offset = this.offset(),
						parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

					// Subtract element margins
					// note: when an element has margin: auto the offsetLeft and marginLeft
					// are the same in Safari causing offset.left to incorrectly be 0
					offset.top -= parseFloat(JQXLite.css(elem, "marginTop")) || 0;
					offset.left -= parseFloat(JQXLite.css(elem, "marginLeft")) || 0;

					// Add offsetParent borders
					parentOffset.top += parseFloat(JQXLite.css(offsetParent[0], "borderTopWidth")) || 0;
					parentOffset.left += parseFloat(JQXLite.css(offsetParent[0], "borderLeftWidth")) || 0;

					// Subtract the two offsets
					return {
						top: offset.top - parentOffset.top,
						left: offset.left - parentOffset.left
					};
				},

				offsetParent: function () {
					return this.map(function () {
						var offsetParent = this.offsetParent || document.body;
						while (offsetParent && (!rroot.test(offsetParent.nodeName) && JQXLite.css(offsetParent, "position") === "static")) {
							offsetParent = offsetParent.offsetParent;
						}
						return offsetParent || document.body;
					});
				}
			});
			// Create scrollLeft and scrollTop methods
			JQXLite.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
				var top = /Y/.test(prop);

				JQXLite.fn[method] = function (val) {
					return JQXLite.access(this, function (elem, method, val) {
						var win = getWindow(elem);

						if (val === undefined) {
							return win ? (prop in win) ? win[prop] :
								win.document.documentElement[method] :
								elem[method];
						}

						if (win) {
							win.scrollTo(
								!top ? val : JQXLite(win).scrollLeft(),
								top ? val : JQXLite(win).scrollTop()
							);

						} else {
							elem[method] = val;
						}
					}, method, val, arguments.length, null);
				};
			});

			function getWindow(elem) {
				return JQXLite.isWindow(elem) ?
					elem :
					elem.nodeType === 9 ?
						elem.defaultView || elem.parentWindow :
						false;
			}
			// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
			JQXLite.each({ Height: "height", Width: "width" }, function (name, type) {
				JQXLite.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {
					// margin is only for outerHeight, outerWidth
					JQXLite.fn[funcName] = function (margin, value) {
						var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
							extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

						return JQXLite.access(this, function (elem, type, value) {
							var doc;

							if (JQXLite.isWindow(elem)) {
								// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
								// isn't a whole lot we can do. See pull request at this URL for discussion:
								// https://github.com/jqx/jqx/pull/764
								return elem.document.documentElement["client" + name];
							}

							// Get document width or height
							if (elem.nodeType === 9) {
								doc = elem.documentElement;

								// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
								// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
								return Math.max(
									elem.body["scroll" + name], doc["scroll" + name],
									elem.body["offset" + name], doc["offset" + name],
									doc["client" + name]
								);
							}

							return value === undefined ?
								// Get width or height on the element, requesting but not forcing parseFloat
								JQXLite.css(elem, type, value, extra) :

								// Set width or height on the element
								JQXLite.style(elem, type, value, extra);
						}, type, chainable ? margin : undefined, chainable, null);
					};
				});
			});
			// Expose JQXLite to the global object
			window.JQXLite = window.jqxHelper = JQXLite;

			// Expose JQXLite as an AMD module, but only for AMD loaders that
			// understand the issues with loading multiple versions of JQXLite
			// in a page that all might call define(). The loader will indicate
			// they have special allowances for multiple JQXLite versions by
			// specifying define.amd.JQXLite = true. Register as a named module,
			// since JQXLite can be concatenated with other files that may use define,
			// but not use a proper concatenation script that understands anonymous
			// AMD modules. A named AMD is safest and most robust way to register.
			// Lowercase jqx is used because AMD module names are derived from
			// file names, and JQXLite is normally delivered in a lowercase file name.
			// Do this after creating the global so that if an AMD module wants to call
			// noConflict to hide this version of JQXLite, it will work.
			if (  true && __nested_webpack_require_227__.amdO.JQXLite) {
				!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () { return JQXLite; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			}

		})(window);
	}

	// jqxHelper
	(function (window) {
		if (window.jqxCore) {
			window.$$ = window.minQuery = window.JQXLite;

			if (!window.$) {
				window.$ = window.minQuery;
			}

			return;
		}

		if (window.jQuery) {
			window.minQuery = window.JQXLite = window.jQuery;
			return;
		}

		if (!window.$) {
			window.$ = window.minQuery = window.JQXLite;
		}
		else {
			window.minQuery = window.JQXLite = window.$;
		}
	})(window);
	// End of jqxHelper

	JQXLite.generateID = function () {
		var S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};

		var id = "";
		do {
			id = "jqx" + S4() + S4() + S4();
		} while ($('#' + id).length > 0);

		return id;
	}

	var jqxBaseFramework = window.jqxBaseFramework = window.minQuery || window.jQuery;

	(function ($) {

		$.jqx = $.jqx || {}
		window.jqx = $.jqx;

		var jqwidgets = {
			createInstance: function (selector, widgetName, params) {
				if (widgetName == 'jqxDataAdapter') {
					var source = params[0];
					var settings = params[1] || {};
					return new $.jqx.dataAdapter(source, settings);
				}

				$(selector)[widgetName](params || {});
				return $(selector)[widgetName]('getInstance');
			}
		};

		window.jqwidgets = jqwidgets;

		$.jqx.define = function (namespace, classname, baseclass) {
			namespace[classname] = function () {
				if (this.baseType) {
					this.base = new namespace[this.baseType]();
					this.base.defineInstance();
				}
				this.defineInstance();
				this.metaInfo();
			}

			namespace[classname].prototype.defineInstance = function () { };
			namespace[classname].prototype.metaInfo = function () { };
			namespace[classname].prototype.base = null;
			namespace[classname].prototype.baseType = undefined;

			if (baseclass && namespace[baseclass])
				namespace[classname].prototype.baseType = baseclass;
		}

		// method call
		$.jqx.invoke = function (object, args) {
			if (args.length == 0)
				return;

			var method = typeof (args) == Array || args.length > 0 ? args[0] : args;
			var methodArg = typeof (args) == Array || args.length > 1 ? Array.prototype.slice.call(args, 1) : $({}).toArray();

			while (object[method] == undefined && object.base != null) {
				if (object[method] != undefined && $.isFunction(object[method]))
					return object[method].apply(object, methodArg);

				if (typeof method == 'string') {
					var methodLowerCase = method.toLowerCase();
					if (object[methodLowerCase] != undefined && $.isFunction(object[methodLowerCase])) {
						return object[methodLowerCase].apply(object, methodArg);
					}
				}
				object = object.base;
			}

			if (object[method] != undefined && $.isFunction(object[method]))
				return object[method].apply(object, methodArg);

			if (typeof method == 'string') {
				var methodLowerCase = method.toLowerCase();
				if (object[methodLowerCase] != undefined && $.isFunction(object[methodLowerCase])) {
					return object[methodLowerCase].apply(object, methodArg);
				}
			}

			return;
		}

		$.jqx.getByPriority = function (arr) {
			var value = undefined;
			for (var i = 0; i < arr.length && value == undefined; i++) {
				if (value == undefined && arr[i] != undefined)
					value = arr[i];
			}

			return value;
		}

		$.jqx.hasProperty = function (obj, property) {
			if (typeof (property) == 'object') {
				for (var prop in property) {
					var o = obj;
					while (o) {
						if (o.hasOwnProperty(prop))
							return true;
						if (o.hasOwnProperty(prop.toLowerCase()))
							return true;
						o = o.base;
					}
					return false;
				}
			}
			else {
				while (obj) {
					if (obj.hasOwnProperty(property))
						return true;
					if (obj.hasOwnProperty(property.toLowerCase()))
						return true;
					obj = obj.base;
				}
			}

			return false;
		}

		$.jqx.hasFunction = function (object, args) {
			if (args.length == 0)
				return false;

			if (object == undefined)
				return false;

			var method = typeof (args) == Array || args.length > 0 ? args[0] : args;
			var methodArg = typeof (args) == Array || args.length > 1 ? Array.prototype.slice.call(args, 1) : {};

			while (object[method] == undefined && object.base != null) {
				if (object[method] && $.isFunction(object[method]))
					return true;

				if (typeof method == 'string') {
					var methodLowerCase = method.toLowerCase();
					if (object[methodLowerCase] && $.isFunction(object[methodLowerCase]))
						return true;
				}
				object = object.base;
			}

			if (object[method] && $.isFunction(object[method]))
				return true;

			if (typeof method == 'string') {
				var methodLowerCase = method.toLowerCase();
				if (object[methodLowerCase] && $.isFunction(object[methodLowerCase]))
					return true;
			}

			return false;
		}

		$.jqx.isPropertySetter = function (obj, args) {
			if (args.length == 1 && typeof (args[0]) == 'object')
				return true;

			if (args.length == 2 &&
				typeof (args[0]) == 'string' &&
				!$.jqx.hasFunction(obj, args)) {
				return true;
			}

			return false;
		}

		$.jqx.validatePropertySetter = function (obj, args, suppressException) {
			if (!$.jqx.propertySetterValidation)
				return true;

			if (args.length == 1 && typeof (args[0]) == 'object') {
				for (var i in args[0]) {
					var o = obj;
					while (!o.hasOwnProperty(i) && o.base)
						o = o.base;

					if (!o || !o.hasOwnProperty(i)) {
						if (!suppressException) {
							var hasLowerCase = o.hasOwnProperty(i.toString().toLowerCase());
							if (!hasLowerCase) {
								throw 'Invalid property: ' + i;
							}
							else return true;
						}
						return false;
					}
				}

				return true;
			}

			if (args.length != 2) {
				if (!suppressException)
					throw 'Invalid property: ' + args.length >= 0 ? args[0] : '';

				return false;
			}

			while (!obj.hasOwnProperty(args[0]) && obj.base)
				obj = obj.base;

			if (!obj || !obj.hasOwnProperty(args[0])) {
				if (!suppressException)
					throw 'Invalid property: ' + args[0];

				return false;
			}

			return true;
		}

		if (!Object.keys) {
			Object.keys = (function () {
				'use strict';
				var hasOwnProperty = Object.prototype.hasOwnProperty,
					hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
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

				return function (obj) {
					if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
						throw new TypeError('Object.keys called on non-object');
					}

					var result = [], prop, i;

					for (prop in obj) {
						if (hasOwnProperty.call(obj, prop)) {
							result.push(prop);
						}
					}

					if (hasDontEnumBug) {
						for (i = 0; i < dontEnumsLength; i++) {
							if (hasOwnProperty.call(obj, dontEnums[i])) {
								result.push(dontEnums[i]);
							}
						}
					}
					return result;
				};
			}());
		}

		$.jqx.set = function (object, args) {
			var newValuesLength = 0;
			if (args.length == 1 && typeof (args[0]) == 'object') {
				if (object.isInitialized && Object.keys && Object.keys(args[0]).length > 1) {
					var element = !object.base ? object.element : object.base.element;
					var initArgs = $.data(element, object.widgetName).initArgs;
					if (initArgs && JSON && JSON.stringify && args[0] && initArgs[0]) {
						try {
							if (JSON.stringify(args[0]) == JSON.stringify(initArgs[0])) {
								var toReturn = true;
								$.each(args[0], function (key, value) {
									if (object[key] != value) {
										toReturn = false;
										return false;
									}
								});
								if (toReturn) {
									return;
								}
							}
						}
						catch (err) {
						}
					}
					object.batchUpdate = args[0];
					var oldValues = {};
					var newValues = {};
					$.each(args[0], function (key, value) {
						var obj = object;
						while (!obj.hasOwnProperty(key) && obj.base != null)
							obj = obj.base;

						if (obj.hasOwnProperty(key)) {
							if (object[key] != value) {
								oldValues[key] = object[key];
								newValues[key] = value;
								newValuesLength++;
							}
						}
						else if (obj.hasOwnProperty(key.toLowerCase())) {
							if (object[key.toLowerCase()] != value) {
								oldValues[key.toLowerCase()] = object[key.toLowerCase()];
								newValues[key.toLowerCase()] = value;
								newValuesLength++;
							}
						}
					});
					if (newValuesLength < 2) {
						object.batchUpdate = null;
					}
				}

				$.each(args[0], function (key, value) {
					var obj = object;
					while (!obj.hasOwnProperty(key) && obj.base != null)
						obj = obj.base;

					if (obj.hasOwnProperty(key)) {
						$.jqx.setvalueraiseevent(obj, key, value);
					}
					else if (obj.hasOwnProperty(key.toLowerCase())) {
						$.jqx.setvalueraiseevent(obj, key.toLowerCase(), value);
					}
					else if ($.jqx.propertySetterValidation)
						throw "jqxCore: invalid property '" + key + "'";
				});

				if (object.batchUpdate != null) {
					object.batchUpdate = null;
					if (object.propertiesChangedHandler && newValuesLength > 1) {
						object.propertiesChangedHandler(object, oldValues, newValues);
					}
				}
			}
			else if (args.length == 2) {
				while (!object.hasOwnProperty(args[0]) && object.base)
					object = object.base;

				if (object.hasOwnProperty(args[0])) {
					$.jqx.setvalueraiseevent(object, args[0], args[1]);
				}
				else if (object.hasOwnProperty(args[0].toLowerCase())) {
					$.jqx.setvalueraiseevent(object, args[0].toLowerCase(), args[1]);
				}
				else if ($.jqx.propertySetterValidation)
					throw "jqxCore: invalid property '" + args[0] + "'";
			}
		}

		$.jqx.setvalueraiseevent = function (object, key, value) {
			var oldVal = object[key];

			object[key] = value;

			if (!object.isInitialized)
				return;

			if (object.propertyChangedHandler != undefined)
				object.propertyChangedHandler(object, key, oldVal, value);

			if (object.propertyChangeMap != undefined && object.propertyChangeMap[key] != undefined)
				object.propertyChangeMap[key](object, key, oldVal, value);
		};

		$.jqx.get = function (object, args) {
			if (args == undefined || args == null)
				return undefined;

			if (object.propertyMap) {
				var newVal = object.propertyMap(args);
				if (newVal != null)
					return newVal;
			}

			if (object.hasOwnProperty(args))
				return object[args];

			if (object.hasOwnProperty(args.toLowerCase()))
				return object[args.toLowerCase()];

			var arg = undefined;
			if (typeof (args) == Array) {
				if (args.length != 1)
					return undefined;
				arg = args[0];
			}
			else if (typeof (args) == 'string')
				arg = args;

			while (!object.hasOwnProperty(arg) && object.base)
				object = object.base;

			if (object)
				return object[arg];

			return undefined;
		}

		$.jqx.serialize = function (obj) {
			var txt = '';
			if ($.isArray(obj)) {
				txt = '['
				for (var i = 0; i < obj.length; i++) {
					if (i > 0)
						txt += ', ';
					txt += $.jqx.serialize(obj[i]);
				}
				txt += ']';
			}
			else if (typeof (obj) == 'object') {
				txt = '{';
				var j = 0;
				for (var i in obj) {
					if (j++ > 0)
						txt += ', ';
					txt += i + ': ' + $.jqx.serialize(obj[i]);
				}
				txt += '}';
			}
			else
				txt = obj.toString();

			return txt;
		}

		$.jqx.propertySetterValidation = true;

		$.jqx.jqxWidgetProxy = function (controlName, element, args) {
			var host = $(element);
			var vars = $.data(element, controlName);
			if (vars == undefined) {
				return undefined;
			}

			var obj = vars.instance;

			if ($.jqx.hasFunction(obj, args))
				return $.jqx.invoke(obj, args);

			if ($.jqx.isPropertySetter(obj, args)) {
				if ($.jqx.validatePropertySetter(obj, args)) {
					$.jqx.set(obj, args);
					return undefined;
				}
			} else {
				if (typeof (args) == 'object' && args.length == 0)
					return;
				else if (typeof (args) == 'object' && args.length == 1 && $.jqx.hasProperty(obj, args[0]))
					return $.jqx.get(obj, args[0]);
				else if (typeof (args) == 'string' && $.jqx.hasProperty(obj, args[0]))
					return $.jqx.get(obj, args);
			}

			throw "jqxCore: Invalid parameter '" + $.jqx.serialize(args) + "' does not exist.";
			//      return undefined;
		}

		$.jqx.applyWidget = function (element, controlName, args, instance) {
			var WinJS = false;
			try {
				WinJS = window.MSApp != undefined;
			}
			catch (e) {
			}

			var host = $(element);
			if (!instance) {
				instance = new $.jqx['_' + controlName]();
			}
			else {
				instance.host = host;
				instance.element = element;
			}
			if (element.id == "") {
				element.id = $.jqx.utilities.createId();
			}

			var vars = { host: host, element: element, instance: instance, initArgs: args };

			instance.widgetName = controlName;
			$.data(element, controlName, vars);
			$.data(element, 'jqxWidget', vars.instance);

			var inits = new Array();
			var instance = vars.instance;
			while (instance) {
				instance.isInitialized = false;
				inits.push(instance);
				instance = instance.base;
			}
			inits.reverse();
			inits[0].theme = $.jqx.theme || '';

			$.jqx.jqxWidgetProxy(controlName, element, args);

			for (var i in inits) {
				instance = inits[i];
				if (i == 0) {
					instance.host = host;
					instance.element = element;
					instance.WinJS = WinJS;
				}
				if (instance != undefined) {
					if (instance.definedInstance) {
						instance.definedInstance();
					}
					if (instance.createInstance != null) {
						if (WinJS) {
							MSApp.execUnsafeLocalFunction(function () {
								instance.createInstance(args);
							});
						}
						else {
							instance.createInstance(args);
						}
					}
				}
			}

			for (var i in inits) {
				if (inits[i] != undefined) {
					inits[i].isInitialized = true;
				}
			}

			if (WinJS) {
				MSApp.execUnsafeLocalFunction(function () {
					vars.instance.refresh(true);
				});
			}
			else {
				vars.instance.refresh(true);
			}

		}

		$.jqx.jqxWidget = function (name, base, params) {

			var WinJS = false;
			try {
				var jqxArgs = Array.prototype.slice.call(params, 0);
			}
			catch (e) {
				var jqxArgs = '';
			}

			try {
				WinJS = window.MSApp != undefined;
			}
			catch (e) {
			}

			var controlName = name;

			var baseControl = '';
			if (base)
				baseControl = '_' + base;
			$.jqx.define($.jqx, '_' + controlName, baseControl);

			var widgets = new Array();

			if (!window[controlName]) {
				var serializeObject = function (data) {
					if (data == null) return "";
					var dataType = $.type(data);
					switch (dataType) {
						case "string":
						case "number":
						case "date":
						case "boolean":
						case "bool":
							if (data === null)
								return "";
							return data.toString()
					}

					var str = "";
					$.each(data, function (index, value) {
						var val = value;
						if (index > 0) str += ', ';
						str += "[";
						var m = 0;

						if ($.type(val) == "object") {
							for (var obj in val) {
								if (m > 0) str += ', ';
								str += '{' + obj + ":" + val[obj] + '}';
								m++;
							}
						}
						else {
							if (m > 0) str += ', ';
							str += '{' + index + ":" + val + '}';
							m++;
						}

						str += "]";
					});
					return str;
				}

				jqwidgets[controlName] = window[controlName] = function (selector, params) {
					var args = [];
					if (!params) {
						params = {};
					}
					args.push(params);

					var uid = selector;
					if ($.type(uid) === "object" && selector[0]) {
						uid = selector[0].id;
						if (uid === "") {
							uid = selector[0].id = $.jqx.utilities.createId();
						}
					} else if ($.type(selector) === "object" && selector && selector.nodeName) {
						uid = selector.id;
						if (uid === "") {
							uid = selector.id = $.jqx.utilities.createId();
						}
					}

					if (window.jqxWidgets && window.jqxWidgets[uid]) {
						if (params) {
							$.each(window.jqxWidgets[uid], function (index) {
								var data = $(this.element).data();
								if (data && data.jqxWidget) {
									$(this.element)[controlName](params);
								}
							});
						}
						if (window.jqxWidgets[uid].length == 1) {
							var data = $(window.jqxWidgets[uid][0].widgetInstance.element).data();
							if (data && data.jqxWidget) {
								return window.jqxWidgets[uid][0];
							}
						}

						var data = $(window.jqxWidgets[uid][0].widgetInstance.element).data();
						if (data && data.jqxWidget) {
							return window.jqxWidgets[uid];
						}
					}

					var elements = $(selector);
					if (elements.length === 0) {
						elements = $("<div></div>");
						if (controlName === "jqxInput" || controlName === "jqxPasswordInput" || controlName === "jqxMaskedInput") {
							elements = $("<input/>");
						}
						if (controlName === "jqxTextArea") {
							elements = $("<textarea></textarea>");
						}
						if (controlName === "jqxButton" || controlName === "jqxRepeatButton" || controlName === "jqxToggleButton") {
							elements = $("<button/>");
						}
						if (controlName === "jqxSplitter") {
							elements = $("<div><div>Panel 1</div><div>Panel 2</div></div>");
						}
						if (controlName === "jqxTabs") {
							elements = $("<div><ul><li>Tab 1</li><li>Tab 2</li></ul><div>Content 1</div><div>Content 2</div></div>");
						}
						if (controlName === "jqxRibbon") {
							elements = $("<div><ul><li>Tab 1</li><li>Tab 2</li></ul><div><div>Content 1</div><div>Content 2</div></div></div>");
						}
						if (controlName === "jqxDocking") {
							elements = $("<div><div><div><div>Title 1</div><div>Content 1</div></div></div></div>");
						}
						if (controlName === "jqxWindow") {
							elements = $("<div><div>Title 1</div><div>Content 1</div></div>");
						}
					}
					var instances = [];


					$.each(elements, function (index) {
						var element = elements[index];
						$.jqx.applyWidget(element, controlName, args, undefined);
						if (!widgets[controlName]) {
							var instance = $.data(element, 'jqxWidget');
							var properties = $.jqx["_" + controlName].prototype.defineInstance();
							var metaInfo = {};

							if ($.jqx["_" + controlName].prototype.metaInfo) {
								metaInfo = $.jqx["_" + controlName].prototype.metaInfo();
							}

							if (controlName == "jqxDockingLayout") {
								properties = $.extend(properties, $.jqx["_jqxLayout"].prototype.defineInstance());
							}
							if (controlName == "jqxToggleButton" || controlName == "jqxRepeatButton") {
								properties = $.extend(properties, $.jqx["_jqxButton"].prototype.defineInstance());
							}
							if (controlName == "jqxTreeGrid") {
								properties = $.extend(properties, $.jqx["_jqxDataTable"].prototype.defineInstance());
							}

							var widgetConstructor = function (element) {
								var instance = $.data(element, 'jqxWidget');
								this.widgetInstance = instance;
								var widget = $.extend(this, instance);
								widget.on = widget.addEventListener = function (eventName, callback) {
									widget.addHandler(!widget.base ? widget.host : widget.base.host, eventName, callback);
								}
								widget.off = widget.removeEventListener = function (eventName) {
									widget.removeHandler(!widget.base ? widget.host : widget.base.host, eventName);
								}

								for (var obj in instance) {
									if ($.type(instance[obj]) == "function") {
										widget[obj] = $.proxy(instance[obj], instance);
									}
								}
								return widget;
							}
							widgets[controlName] = widgetConstructor;

							// widget properties
							$.each(properties, function (property, currentValue) {
								Object.defineProperty(widgetConstructor.prototype, property, {
									get: function () {
										if (this.widgetInstance) {
											return this.widgetInstance[property];
										}
										return currentValue;
									},
									set: function (newValue) {
										if (this.widgetInstance && (this.widgetInstance[property] != newValue || property === "width" || property === "height")) {
											var key1 = this.widgetInstance[property];
											var key2 = newValue;
											var dataType1 = $.type(key1);
											var dataType2 = $.type(key2);
											var differentTypes = false;
											if (dataType1 != dataType2 || property === "source" || property === "width" || property === "height") {
												differentTypes = true;
											}
											if (differentTypes || (serializeObject(key1) != serializeObject(key2))) {
												var settings = {};
												settings[property] = newValue;
												if (this.widgetInstance.host) {
													this.widgetInstance.host[controlName](settings);
												}
												else {
													this.widgetInstance.base.host[controlName](settings);
												}
												this.widgetInstance[property] = newValue;
												if (this.widgetInstance.propertyUpdated) {
													this.widgetInstance.propertyUpdated(property, key1, newValue);
												}
											}
										}
									}
								});
							});
						}
						var instance = new widgets[controlName](element);

						instances.push(instance);
						if (!window.jqxWidgets) {
							window.jqxWidgets = new Array();
						}
						if (!window.jqxWidgets[uid]) {
							window.jqxWidgets[uid] = new Array();
						}
						window.jqxWidgets[uid].push(instance);
					});

					if (instances.length === 1)
						return instances[0];

					return instances;

				}
			}

			$.fn[controlName] = function () {
				var args = Array.prototype.slice.call(arguments, 0);

				if (args.length == 0 || (args.length == 1 && typeof (args[0]) == 'object')) {
					if (this.length == 0) {
						if (this.selector) {
							throw new Error('Invalid Selector - ' + this.selector + '! Please, check whether the used ID or CSS Class name is correct.');
						}
						else {
							throw new Error('Invalid Selector! Please, check whether the used ID or CSS Class name is correct.');
						}
					}

					return this.each(function () {
						var host = $(this);
						var element = this; // element == this == host[0]
						var vars = $.data(element, controlName);

						if (vars == null) {
							$.jqx.applyWidget(element, controlName, args, undefined);
						}
						else {
							$.jqx.jqxWidgetProxy(controlName, this, args);
						}
					}); // each
				}
				else {
					if (this.length == 0) {
						if (this.selector) {
							throw new Error('Invalid Selector - ' + this.selector + '! Please, check whether the used ID or CSS Class name is correct.');
						}
						else {
							throw new Error('Invalid Selector! Please, check whether the used ID or CSS Class name is correct.');
						}
					}

					var returnVal = null;

					var cnt = 0;
					this.each(function () {
						var result = $.jqx.jqxWidgetProxy(controlName, this, args);

						if (cnt == 0) {
							returnVal = result;
							cnt++;
						}
						else {
							if (cnt == 1) {
								var tmp = [];
								tmp.push(returnVal);
								returnVal = tmp;
							}
							returnVal.push(result);
						}
					}); // each
				}

				return returnVal;
			}

			try {
				$.extend($.jqx['_' + controlName].prototype, Array.prototype.slice.call(params, 0)[0]);
			}
			catch (e) {
			}

			$.extend($.jqx['_' + controlName].prototype, {
				toThemeProperty: function (propertyName, override) {
					return $.jqx.toThemeProperty(this, propertyName, override);
				},

				isMaterialized: function () {
					if (!this.theme) {
						return false;
					}

					if (this.theme === "fluent") {
						return true;
					}

					if (this.theme === "tailwind" || this.theme === "tailwind-dark") {
						return true;
					}

					if (this.theme === "light") {
						return true;
					}


					if (this.theme === "dark") {
						return true;
					}

					if (this.theme === "deepblue") {
						return true;
					}

					if (this.theme.indexOf("material") >= 0) {
						return true;
					}
				},

				isModern: function () {
					if (!this.theme) {
						return false;
					}

					if (this.theme.indexOf("light") >= 0) {
						return true;
					}

					if (this.theme === "dark") {
						return true;
					}
				},

				_addBarAndLabel: function (host) {
					var that = this;

					var label = $("<label></label");
					label[0].innerHTML = this.placeHolder;
					label.addClass(that.toThemeProperty('jqx-input-label'));
					host.after(label);
					that.label = label;

					var bar = $("<span></span>");
					host.after(bar);
					bar.addClass(that.toThemeProperty('jqx-input-bar'));
					that.bar = bar;
					that.bar.css('top', this.host.height());
				}
			});

			$.jqx['_' + controlName].prototype.refresh = function () {
				if (this.base)
					this.base.refresh(true);
			}
			$.jqx['_' + controlName].prototype.createInstance = function () {
			}

			$.jqx.isPassiveSupported = function () {
				var that = this;

				if (that.supportsPassive !== undefined) {
					return that.supportsPassive;
				}

				that.supportsPassive = false;
				try {
					var opts = Object.defineProperty({
					}, 'passive', {
						// eslint-disable-next-line getter-return
						get: function () {
							that.supportsPassive = true;
						}
					});
					window.addEventListener('testPassive', null, opts);
					window.removeEventListener('testPassive', null, opts);
				}
				catch (e) {
					//
				}

				return that.supportsPassive;
			}

			$.jqx['_' + controlName].prototype.addEventHandler = function (event, fnHandler) {
				if (this.base) {
					this.base.host.on(event, fnHandler);
				}
				else {
					this.host.on(event, fnHandler);
				}
			}

			$.jqx['_' + controlName].prototype.removeEventHandler = function (event, fnHandler) {
				if (this.base) {
					this.base.host.off(event);
				}
				else {
					this.host.off(event);
				}
			}

			$.jqx['_' + controlName].prototype.applyTo = function (element, args) {
				if (!(args instanceof Array)) {
					var a = [];
					a.push(args);
					args = a;
				}

				$.jqx.applyWidget(element, controlName, args, this);
			}

			$.jqx['_' + controlName].prototype.getInstance = function () {
				return this;
			}
			$.jqx['_' + controlName].prototype.propertyChangeMap = {};

			$.jqx['_' + controlName].prototype.addHandler = function (source, events, func, data) {
				$.jqx.addHandler($(source), events, func, data);
			};

			$.jqx['_' + controlName].prototype.removeHandler = function (source, events, func) {
				$.jqx.removeHandler($(source), events, func);
			};

			$.jqx['_' + controlName].prototype.setOptions = function () {
				if (!this.host || !this.host.length || this.host.length != 1)
					return;

				return $.jqx.jqxWidgetProxy(controlName, this.host[0], arguments);
			};
		} // jqxWidget

		$.jqx.toThemeProperty = function (instance, propertyName, override) {
			if (instance.theme == '')
				return propertyName;

			var split = propertyName.split(' ');
			var result = '';
			for (var i = 0; i < split.length; i++) {
				if (i > 0)
					result += ' ';

				var key = split[i];

				if (override != null && override)
					result += key + '-' + instance.theme;
				else
					result += key + ' ' + key + '-' + instance.theme;
			}

			return result;
		}

		$.jqx.addHandler = function (source, eventsList, func, data) {
			var events = eventsList.split(' ');

			for (var i = 0; i < events.length; i++) {
				var event = events[i];

				if (window.addEventListener && source[0]) {
					switch (event) {
						case 'mousewheel':
							if ($.jqx.browser.mozilla) {
								source[0].addEventListener('DOMMouseScroll', func, $.jqx.isPassiveSupported() ? { passive: false } : false);
							}
							else {
								source[0].addEventListener('mousewheel', func, $.jqx.isPassiveSupported() ? { passive: false } : false);
							}
							continue;
						case 'mousemove':
							if (!data) {
								source[0].addEventListener('mousemove', func, false);
								continue;
							}
							break;
						case 'touchmove':
							if (!data) {
								source[0].addEventListener('touchmove', func, false);
								continue;
							}
							else if (data && data.passive) {
								source[0].addEventListener('touchmove', func, data);
								continue;
							}

							break;
					}
				}

				if (data == undefined || data == null) {
					if (source.on)
						source.on(event, func);
					else
						source.bind(event, func);
				}
				else {
					if (source.on)
						source.on(event, data, func);
					else
						source.bind(event, data, func);
				}
			} // for
		};

		$.jqx.removeHandler = function (source, eventsList, func) {
			if (!eventsList) {
				if (source.off)
					source.off();
				else
					source.unbind();
				return;
			}
			var events = eventsList.split(' ');

			for (var i = 0; i < events.length; i++) {
				var event = events[i];

				if (window.removeEventListener) {
					switch (event) {
						case 'mousewheel':
							if ($.jqx.browser.mozilla) {
								source[0].removeEventListener('DOMMouseScroll', func, false);
							}
							else {
								source[0].removeEventListener('mousewheel', func, false);
							}
							continue;
						case 'mousemove':
							if (func) {
								source[0].removeEventListener('mousemove', func, false);
								continue;
							}
							break;
						case 'touchmove':
							if (func) {
								source[0].removeEventListener('touchmove', func, false);
								continue;
							}
							break;
					}
				}

				if (event == undefined) {
					if (source.off)
						source.off();
					else
						source.unbind();
					continue;
				}

				if (func == undefined) {
					if (source.off)
						source.off(event);
					else
						source.unbind(event);
				}
				else {
					if (source.off)
						source.off(event, func);
					else
						source.unbind(event, func);
				}
			}
		};

		$.jqx.credits = $.jqx.credits || "";
		$.jqx.theme = $.jqx.theme || "";
		$.jqx.scrollAnimation = $.jqx.scrollAnimation || false;
		$.jqx.resizeDelay = $.jqx.resizeDelay || 10;

		$.jqx.ready = function () {
			$(window).trigger('jqxReady');
		}
		$.jqx.init = function () {
			$.each(arguments[0], function (index, value) {
				if (index == "theme") {
					$.jqx.theme = value;
				}
				if (index == "scrollBarSize") {
					$.jqx.utilities.scrollBarSize = value;
				}
				if (index == "touchScrollBarSize") {
					$.jqx.utilities.touchScrollBarSize = value;
				}
				if (index == "scrollBarButtonsVisibility") {
					$.jqx.utilities.scrollBarButtonsVisibility = value;
				}
			});
		}

		// Utilities
		$.jqx.utilities = $.jqx.utilities || {};
		$.extend($.jqx.utilities,
			{
				scrollBarSize: 13,
				touchScrollBarSize: 8,
				scrollBarButtonsVisibility: "visible",
				createId: function () {
					var S4 = function () {
						return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
					};
					return "jqxWidget" + S4() + S4() + S4();
				},

				setTheme: function (oldTheme, theme, element) {
					if (typeof element === 'undefined') {
						return;
					}

					if (!element[0].className.split) {
						return;
					}

					if (oldTheme === undefined) {
						oldTheme = '';
					}

					if (theme === undefined) {
						theme = '';
					}

					var classNames = element[0].className.split(' '),
						oldClasses = [], newClasses = [],
						children = element.children();
					for (var i = 0; i < classNames.length; i += 1) {
						if (classNames[i].indexOf(oldTheme) >= 0) {
							if (oldTheme.length > 0) {
								oldClasses.push(classNames[i]);
								newClasses.push(classNames[i].replace(oldTheme, theme));
							}
							else {
								newClasses.push(classNames[i].replace("-" + theme, "") + '-' + theme);
							}
						}
					}
					this._removeOldClasses(oldClasses, element);
					this._addNewClasses(newClasses, element);
					for (var i = 0; i < children.length; i += 1) {
						this.setTheme(oldTheme, theme, $(children[i]));
					}
				},

				_removeOldClasses: function (classes, element) {
					for (var i = 0; i < classes.length; i += 1) {
						element.removeClass(classes[i]);
					}
				},

				_addNewClasses: function (classes, element) {
					for (var i = 0; i < classes.length; i += 1) {
						element.addClass(classes[i]);
					}
				},

				getOffset: function (el) {
					var left = $.jqx.mobile.getLeftPos(el[0]);
					var top = $.jqx.mobile.getTopPos(el[0]);
					return { top: top, left: left };
				},

				resize: function (element, callback, destroy, checkForHidden) {
					if (checkForHidden === undefined) {
						checkForHidden = true;
					}

					var index = -1;
					var that = this;
					var getHiddenIndex = function (element) {
						if (!that.hiddenWidgets) {
							return -1;
						}

						var hiddenIndex = -1;
						for (var i = 0; i < that.hiddenWidgets.length; i++) {
							if (element.id) {
								if (that.hiddenWidgets[i].id == element.id) {
									hiddenIndex = i;
									break;
								}
							}
							else {
								if (that.hiddenWidgets[i].id == element[0].id) {
									hiddenIndex = i;
									break;
								}
							}
						}
						return hiddenIndex;
					}


					if (this.resizeHandlers) {
						for (var i = 0; i < this.resizeHandlers.length; i++) {
							if (element.id) {
								if (this.resizeHandlers[i].id == element.id) {
									index = i;
									break;
								}
							}
							else {
								if (this.resizeHandlers[i].id == element[0].id) {
									index = i;
									break;
								}
							}
						}

						if (destroy === true) {
							if (index != -1) {
								this.resizeHandlers.splice(index, 1);
								if (this.watchedElementData && this.watchedElementData.length > 0) {
									this.watchedElementData.splice(index, 1);
								}
							}

							if (this.resizeHandlers.length == 0) {
								var w = $(window);
								if (w.off) {
									w.off('resize.jqx');
									w.off('orientationchange.jqx');
									w.off('orientationchanged.jqx');
								}
								else {
									w.unbind('resize.jqx');
									w.unbind('orientationchange.jqx');
									w.unbind('orientationchanged.jqx');
								}
								this.resizeHandlers = null;
							}
							var hiddenIndex = getHiddenIndex(element);
							if (hiddenIndex != -1 && this.hiddenWidgets) {
								this.hiddenWidgets.splice(hiddenIndex, 1);
							}
							return;
						}
					}
					else if (destroy === true) {
						var hiddenIndex = getHiddenIndex(element);
						if (hiddenIndex != -1 && this.hiddenWidgets) {
							this.hiddenWidgets.splice(hiddenIndex, 1);
						}
						return;
					}
					var that = this;
					var doResize = function (isHidden, type) {
						if (!that.resizeHandlers)
							return;

						var getParentsCount = function (element) {
							var index = -1;
							var parent = element.parentNode;
							while (parent) {
								index++;
								parent = parent.parentNode;
							}
							return index;
						}

						var compare = function (value1, value2) {
							if (!value1.widget || !value2.widget)
								return 0;

							var parents1 = getParentsCount(value1.widget[0]);
							var parents2 = getParentsCount(value2.widget[0]);

							try {
								if (parents1 < parents2) { return -1; }
								if (parents1 > parents2) { return 1; }
							}
							catch (error) {
								var er = error;
							}

							return 0;
						};
						var handleHiddenWidgets = function (delay) {
							if (that.hiddenWidgets.length > 0) {
								that.hiddenWidgets.sort(compare);
								var updateHiddenWidgets = function () {
									var hasHiddenWidget = false;
									var currentHiddenWidgets = new Array();
									for (var p = 0; p < that.hiddenWidgets.length; p++) {
										var handler = that.hiddenWidgets[p];
										if ($.jqx.isHidden(handler.widget)) {
											hasHiddenWidget = true;
											currentHiddenWidgets.push(handler);
										}
										else {
											if (handler.callback) {
												handler.callback(type);
											}
										}
									}
									that.hiddenWidgets = currentHiddenWidgets;
									if (!hasHiddenWidget) {
										clearInterval(that.__resizeInterval);
									}
								}
								if (delay == false) {
									updateHiddenWidgets();
									if (that.__resizeInterval) clearInterval(that.__resizeInterval);
									return;
								}
								if (that.__resizeInterval) clearInterval(that.__resizeInterval);
								that.__resizeInterval = setInterval(function () {
									updateHiddenWidgets();
								}, 100);
							}
						}

						if (that.hiddenWidgets && that.hiddenWidgets.length > 0) {
							handleHiddenWidgets(false);
						}
						that.hiddenWidgets = new Array();
						that.resizeHandlers.sort(compare);
						for (var i = 0; i < that.resizeHandlers.length; i++) {
							var handler = that.resizeHandlers[i];
							var widget = handler.widget;
							var data = handler.data;
							if (!data) continue;
							if (!data.jqxWidget) continue;

							var width = data.jqxWidget.width;
							var height = data.jqxWidget.height;

							if (data.jqxWidget.base) {
								if (width == undefined) {
									width = data.jqxWidget.base.width;
								}
								if (height == undefined) {
									height = data.jqxWidget.base.height;
								}
							}

							if (width === undefined && height === undefined) {
								width = data.jqxWidget.element.style.width;
								height = data.jqxWidget.element.style.height;
							}

							var percentageSize = false;
							if (width != null && width.toString().indexOf("%") != -1) {
								percentageSize = true;
							}

							if (height != null && height.toString().indexOf("%") != -1) {
								percentageSize = true;
							}

							if ($.jqx.isHidden(widget)) {
								if (getHiddenIndex(widget) === -1) {
									if (percentageSize || isHidden === true) {
										if (handler.data.nestedWidget !== true) {
											that.hiddenWidgets.push(handler);
										}
									}
								}
							}
							else if (isHidden === undefined || isHidden !== true) {
								if (percentageSize) {
									handler.callback(type);
									if (that.watchedElementData) {
										for (var m = 0; m < that.watchedElementData.length; m++) {
											if (that.watchedElementData[m].element == data.jqxWidget.element) {
												that.watchedElementData[m].offsetWidth = data.jqxWidget.element.offsetWidth;
												that.watchedElementData[m].offsetHeight = data.jqxWidget.element.offsetHeight;
												break;
											}
										}
									}
									if (that.hiddenWidgets.indexOf(handler) >= 0) {
										that.hiddenWidgets.splice(that.hiddenWidgets.indexOf(handler), 1);
									}
								}
								if (data.jqxWidget.element) {
									var widgetClass = data.jqxWidget.element.className;
									if (widgetClass.indexOf('dropdownlist') >= 0 || widgetClass.indexOf('datetimeinput') >= 0 || widgetClass.indexOf('combobox') >= 0 || widgetClass.indexOf('menu') >= 0) {
										if (data.jqxWidget.isOpened) {
											var opened = data.jqxWidget.isOpened();
											if (opened) {
												if (type && type == "resize" && $.jqx.mobile.isTouchDevice())
													continue;

												data.jqxWidget.close();
											}
										}
									}
								}
							}
						};

						handleHiddenWidgets();
					}

					if (!this.resizeHandlers) {
						this.resizeHandlers = new Array();

						var w = $(window);
						if (w.on) {
							this._resizeTimer = null;
							this._initResize = null;
							w.on('resize.jqx', function (event) {
								if (that._resizeTimer != undefined) {
									clearTimeout(that._resizeTimer);
								}
								if (!that._initResize) {
									that._initResize = true;
									doResize(null, 'resize');
								}
								else {
									that._resizeTimer = setTimeout(function () {
										doResize(null, 'resize');
									}, $.jqx.resizeDelay);
								}
							});
							w.on('orientationchange.jqx', function (event) {
								doResize(null, 'orientationchange');
							});
							w.on('orientationchanged.jqx', function (event) {
								doResize(null, 'orientationchange');
							});
						}
						else {
							w.bind('resize.jqx', function (event) {
								doResize(null, 'orientationchange');
							});
							w.bind('orientationchange.jqx', function (event) {
								doResize(null, 'orientationchange');
							});
							w.bind('orientationchanged.jqx', function (event) {
								doResize(null, 'orientationchange');
							});
						}
					}
					var elementData = element.data();
					if (checkForHidden) {
						if (index === -1) {
							this.resizeHandlers.push({ id: element[0].id, widget: element, callback: callback, data: elementData });
						}
					}
					try {
						var width = elementData.jqxWidget.width;
						var height = elementData.jqxWidget.height;

						if (elementData.jqxWidget.base) {
							if (width == undefined) {
								width = elementData.jqxWidget.base.width;
							}
							if (height == undefined) {
								height = elementData.jqxWidget.base.height;
							}
						}

						if (width === undefined && height === undefined) {
							width = elementData.jqxWidget.element.style.width;
							height = elementData.jqxWidget.element.style.height;
						}

						var percentageSize = false;
						if (width != null && width.toString().indexOf("%") != -1) {
							percentageSize = true;
						}

						if (height != null && height.toString().indexOf("%") != -1) {
							percentageSize = true;
						}
						if (percentageSize) {
							if (!this.watchedElementData) {
								this.watchedElementData = [];
							}
							var that = this;
							var checkForChanges = function (mutations) {
								if (that.watchedElementData.forEach) {
									that.watchedElementData.forEach(function (data) {
										if (data.element.offsetWidth !== data.offsetWidth ||
											data.element.offsetHeight !== data.offsetHeight) {
											data.offsetWidth = data.element.offsetWidth;
											data.offsetHeight = data.element.offsetHeight;
											if (data.timer) {
												clearTimeout(data.timer);
											}
											data.timer = setTimeout(function () {
												if (!$.jqx.isHidden($(data.element))) {
													data.callback();
												}
												else {
													data.timer = setInterval(function () {
														if (!$.jqx.isHidden($(data.element))) {
															clearInterval(data.timer);
															data.callback();
														}
													}, 100);
												}
											});
										}
									});
								}
							};

							that.watchedElementData.push({
								element: element[0],
								offsetWidth: element[0].offsetWidth,
								offsetHeight: element[0].offsetHeight,
								callback: callback
							});
							if (!that.observer) {
								that.observer = new MutationObserver(checkForChanges);
								that.observer.observe(document.body, {
									attributes: true,
									childList: true,
									characterData: true
								});
							}
						}
					}
					catch (er) {
					}
					if ($.jqx.isHidden(element) && checkForHidden === true) {
						doResize(true);
					}
					$.jqx.resize = function () {
						doResize(null, 'resize');
					}
				},

				parseJSON: function (data) {
					if (!data || typeof data !== "string") {
						return null;
					}
					var rvalidchars = /^[\],:{}\s]*$/,
						rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
						rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
						rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g;

					// Make sure leading/trailing whitespace is removed (IE can't handle it)
					data = $.trim(data);

					// Attempt to parse using the native JSON parser first
					if (window.JSON && window.JSON.parse) {
						return window.JSON.parse(data);
					}

					// Make sure the incoming data is actual JSON
					// Logic borrowed from http://json.org/json2.js
					if (rvalidchars.test(data.replace(rvalidescape, "@")
						.replace(rvalidtokens, "]")
						.replace(rvalidbraces, ""))) {

						return (new Function("return " + data))();

					}
					throw new Error("Invalid JSON: " + data);
				},

				html: function (element, value) {
					if (!$(element).on || !$.access) {
						return $(element).html(value);
					}
					try {
						return $.access(element, function (value) {
							var elem = element[0] || {},
								i = 0,
								l = element.length;

							if (value === undefined) {
								return elem.nodeType === 1 ?
									elem.innerHTML.replace(rinlinejQuery, "") :
									undefined;
							}

							var rnoInnerhtml = /<(?:script|style|link)/i,
								nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
									"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
								rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
								rtagName = /<([\w:]+)/,
								rnocache = /<(?:script|object|embed|option|style)/i,
								rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
								rleadingWhitespace = /^\s+/,
								wrapMap = {
									option: [1, "<select multiple='multiple'>", "</select>"],
									legend: [1, "<fieldset>", "</fieldset>"],
									thead: [1, "<table>", "</table>"],
									tr: [2, "<table><tbody>", "</tbody></table>"],
									td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
									col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
									area: [1, "<map>", "</map>"],
									_default: [0, "", ""]
								};

							if (typeof value === "string" && !rnoInnerhtml.test(value) &&
								($.support.htmlSerialize || !rnoshimcache.test(value)) &&
								($.support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
								!wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

								value = value.replace(rxhtmlTag, "<$1></$2>");

								try {
									for (; i < l; i++) {
										elem = this[i] || {};
										if (elem.nodeType === 1) {
											$.cleanData(elem.getElementsByTagName("*"));
											elem.innerHTML = value;
										}
									}

									elem = 0;
								} catch (e) { }
							}

							if (elem) {
								element.empty().append(value);
							}
						}, null, value, arguments.length);
					}
					catch (error) {
						return $(element).html(value);
					}
				},

				hasTransform: function (el) {
					var transform = "";
					transform = el.css('transform');

					if (transform == "" || transform == 'none') {
						transform = el.parents().css('transform');
						if (transform == "" || transform == 'none') {
							var browserInfo = $.jqx.utilities.getBrowser();
							if (browserInfo.browser == 'msie') {
								transform = el.css('-ms-transform');
								if (transform == "" || transform == 'none') {
									transform = el.parents().css('-ms-transform');
								}
							}
							else if (browserInfo.browser == 'chrome') {
								transform = el.css('-webkit-transform');
								if (transform == "" || transform == 'none') {
									transform = el.parents().css('-webkit-transform');
								}
							}
							else if (browserInfo.browser == 'opera') {
								transform = el.css('-o-transform');
								if (transform == "" || transform == 'none') {
									transform = el.parents().css('-o-transform');
								}
							}
							else if (browserInfo.browser == 'mozilla') {
								transform = el.css('-moz-transform');
								if (transform == "" || transform == 'none') {
									transform = el.parents().css('-moz-transform');
								}
							}
						} else {
							return transform != "" && transform != 'none';
						}
					}
					if (transform == "" || transform == 'none') {
						transform = $(document.body).css('transform');
					}
					return transform != "" && transform != 'none' && transform != null;
				},

				getBrowser: function () {
					var ua = navigator.userAgent.toLowerCase();

					var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
						/(webkit)[ \/]([\w.]+)/.exec(ua) ||
						/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
						/(msie) ([\w.]+)/.exec(ua) ||
						ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
						[];

					var obj = {
						browser: match[1] || "",
						version: match[2] || "0"
					};
					if (ua.indexOf("rv:11.0") >= 0 && ua.indexOf(".net4.0c") >= 0) {
						obj.browser = "msie";
						obj.version = "11";
						match[1] = "msie";
					}
					if (ua.indexOf("edge") >= 0) {
						obj.browser = "msie";
						obj.version = "12";
						match[1] = "msie";
					}
					obj[match[1]] = match[1];
					return obj;
				}
			});
		$.jqx.browser = $.jqx.utilities.getBrowser();
		$.jqx.isHidden = function (element) {
			if (!element || !element[0])
				return false;

			var w = element[0].offsetWidth, h = element[0].offsetHeight;
			if (w === 0 || h === 0)
				return true;
			else {
				return false;
			}
		};

		$.jqx.ariaEnabled = true;
		$.jqx.aria = function (that, property, value) {
			if (!$.jqx.ariaEnabled)
				return;

			if (property == undefined) {
				$.each(that.aria, function (index, value) {
					var attrValue = !that.base ? that.host.attr(index) : that.base.host.attr(index);
					if (attrValue != undefined && !$.isFunction(attrValue)) {
						var newValue = attrValue;
						switch (value.type) {
							case "number":
								newValue = new Number(attrValue);
								if (isNaN(newValue)) newValue = attrValue;
								break;
							case "boolean":
								newValue = attrValue == "true" ? true : false;
								break;
							case "date":
								newValue = new Date(attrValue);
								if (newValue == "Invalid Date" || isNaN(newValue)) newValue = attrValue;
								break;
						}

						that[value.name] = newValue;
					}
					else {
						var attrValue = that[value.name];
						if ($.isFunction(attrValue)) attrValue = that[value.name]();
						if (attrValue == undefined) attrValue = "";
						try {
							!that.base ? that.host.attr(index, attrValue.toString()) : that.base.host.attr(index, attrValue.toString());
						}
						catch (error) {
						}
					}
				});
			}
			else {
				try {
					if (that.host) {
						if (!that.base) {
							if (that.host) {
								if (that.element.setAttribute) {
									that.element.setAttribute(property, value.toString());
								}
								else {
									that.host.attr(property, value.toString());
								}
							}
							else {
								that.attr(property, value.toString());
							}
						}
						else {
							if (that.base.host) {
								that.base.host.attr(property, value.toString());
							}
							else {
								that.attr(property, value.toString());
							}
						}
					}
					else if (that.setAttribute) {
						that.setAttribute(property, value.toString());
					}
				}
				catch (error) {
				}
			}
		};

		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (elt /*, from*/) {
				var len = this.length;

				var from = Number(arguments[1]) || 0;
				from = (from < 0)
					? Math.ceil(from)
					: Math.floor(from);
				if (from < 0)
					from += len;

				for (; from < len; from++) {
					if (from in this &&
						this[from] === elt)
						return from;
				}
				return -1;
			};
		}

		$.jqx.mobile = $.jqx.mobile || {};
		$.jqx.position = function (event) {
			var left = parseInt(event.pageX);
			var top = parseInt(event.pageY);

			if ($.jqx.mobile.isTouchDevice()) {
				var touches = $.jqx.mobile.getTouches(event);
				var touch = touches[0];
				left = parseInt(touch.pageX);
				top = parseInt(touch.pageY);
			}
			return { left: left, top: top }
		}

		$.extend($.jqx.mobile,
			{
				_touchListener: function (e, me) {
					var createTouchEvent = function (name, e) {
						var event = document.createEvent('MouseEvents');

						event.initMouseEvent(
							name,
							e.bubbles,
							e.cancelable,
							e.view,
							e.detail,
							e.screenX,
							e.screenY,
							e.clientX,
							e.clientY,
							e.ctrlKey,
							e.altKey,
							e.shiftKey,
							e.metaKey,
							e.button,
							e.relatedTarget
						);
						event._pageX = e.pageX;
						event._pageY = e.pageY;

						return event;
					}

					var eventMap = { 'mousedown': 'touchstart', 'mouseup': 'touchend', 'mousemove': 'touchmove' };
					var event = createTouchEvent(eventMap[e.type], e);
					e.target.dispatchEvent(event);

					var fn = e.target['on' + eventMap[e.type]];
					if (typeof fn === 'function') fn(e);
				},

				setMobileSimulator: function (element, value) {
					if (this.isTouchDevice()) {
						return;
					}

					this.simulatetouches = true;
					if (value == false) {
						this.simulatetouches = false;
					}

					var eventMap = { 'mousedown': 'touchstart', 'mouseup': 'touchend', 'mousemove': 'touchmove' };

					var self = this;
					if (window.addEventListener) {
						var subscribeToEvents = function () {
							for (var key in eventMap) {
								if (element.addEventListener) {
									element.removeEventListener(key, self._touchListener);
									element.addEventListener(key, self._touchListener, false);
								}

								//  document.removeEventListener(key, self._touchListener);
								//  document.addEventListener(key, self._touchListener, false);
							}
						}

						if ($.jqx.browser.msie) {
							subscribeToEvents();
						}
						else {
							subscribeToEvents();
						}
					}
				},

				isTouchDevice: function () {
					if (this.touchDevice != undefined)
						return this.touchDevice;

					var txt = "Browser CodeName: " + navigator.appCodeName + "";
					txt += "Browser Name: " + navigator.appName + "";
					txt += "Browser Version: " + navigator.appVersion + "";
					txt += "Platform: " + navigator.platform + "";
					txt += "User-agent header: " + navigator.userAgent + "";

					if (navigator.maxTouchPoints > 1) {
						//return true;
					}

					if (txt.indexOf('Android') != -1)
						return true;

					if (txt.indexOf('IEMobile') != -1)
						return true;

					if (txt.indexOf('Windows Phone') != -1)
						return true;

					if (txt.indexOf('WPDesktop') != -1)
						return true;

					if (txt.indexOf('ZuneWP7') != -1)
						return true;

					if (txt.indexOf('BlackBerry') != -1 && txt.indexOf('Mobile Safari') != -1)
						return true;

					if (txt.indexOf('ipod') != -1)
						return true;

					if (txt.indexOf('nokia') != -1 || txt.indexOf('Nokia') != -1)
						return true;

					if (txt.indexOf('Chrome/17') != -1)
						return false;

					if (txt.indexOf('CrOS') != -1)
						return false;

					if (txt.indexOf('Opera') != -1 && txt.indexOf('Mobi') == -1 && txt.indexOf('Mini') == -1 && txt.indexOf('Platform: Win') != -1) {
						return false;
					}

					if (txt.indexOf("HybridDeviceTouch") != -1) {
						return true
					}

					if (txt.indexOf("HybridDeviceMouse") != -1) {
						return false
					}

					if (txt.indexOf('Opera') != -1 && txt.indexOf('Mobi') != -1 && txt.indexOf('Opera Mobi') != -1) {
						return true;
					}

					if (txt.indexOf('Mozilla/5.0 (X11; Linux x86_64)') != -1) {
						return false;
					}

					var deviceTypes = {
						ios: 'i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ',
						android: '(Android |HTC_|Silk/)',
						blackberry: 'BlackBerry(?:.*)Version\/',
						rimTablet: 'RIM Tablet OS ',
						webos: '(?:webOS|hpwOS)\/',
						bada: 'Bada\/'
					}

					// check for IPad, IPhone, IE and Chrome
					try {
						if (this.touchDevice != undefined)
							return this.touchDevice;

						this.touchDevice = false;
						for (var i in deviceTypes) {
							if (deviceTypes.hasOwnProperty(i)) {
								var prefix = deviceTypes[i];
								var match = txt.match(new RegExp('(?:' + prefix + ')([^\\s;]+)'));
								if (match) {
									if (i.toString() == "blackberry") {
										// handle touches through mouse pointer.
										this.touchDevice = false;
										return false;
									}

									this.touchDevice = true;
									return true;
								}
							}
						}

						var userAgent = navigator.userAgent;
						if (navigator.platform.toLowerCase().indexOf('win') != -1) {
							if (userAgent.indexOf('Windows Phone') >= 0 || userAgent.indexOf('WPDesktop') >= 0 || userAgent.indexOf('IEMobile') >= 0 || userAgent.indexOf('ZuneWP7') >= 0) {
								this.touchDevice = true;
								return true;
							}
							else {
								if (userAgent.indexOf('Touch') >= 0) {
									var supported = ('MSPointerDown' in window) || ('pointerdown' in window);
									if (supported) {
										this.touchDevice = true;
										return true;
									}
									if (userAgent.indexOf('ARM') >= 0) {
										this.touchDevice = true;
										return true;
									}

									this.touchDevice = false;
									return false;
								}
							}
						}

						if (navigator.platform.toLowerCase().indexOf('win') != -1) {
							this.touchDevice = false;
							return false;
						}
						if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
							this.touchDevice = true;
						}
						return this.touchDevice;
					} catch (e) {
						this.touchDevice = false;
						return false;
					}
				},

				getLeftPos: function (inputObj) {
					var returnValue = inputObj.offsetLeft;
					while ((inputObj = inputObj.offsetParent) != null) {
						if (inputObj.tagName != 'HTML') {
							returnValue += inputObj.offsetLeft;
							if (document.all) returnValue += inputObj.clientLeft;
						}
					}
					return returnValue;
				},

				getTopPos: function (inputObj) {
					var returnValue = inputObj.offsetTop;
					var initialOffset = $(inputObj).coord();
					while ((inputObj = inputObj.offsetParent) != null) {
						if (inputObj.tagName != 'HTML') {
							returnValue += (inputObj.offsetTop - inputObj.scrollTop);
							if (document.all) returnValue += inputObj.clientTop;
						}
					}
					var agent = navigator.userAgent.toLowerCase();
					var wp8 = (agent.indexOf('windows phone') != -1 || agent.indexOf('WPDesktop') != -1 || agent.indexOf('ZuneWP7') != -1 || agent.indexOf('msie 9') != -1 || agent.indexOf('msie 11') != -1 || agent.indexOf('msie 10') != -1) && agent.indexOf('touch') != -1;
					if (wp8) {
						return initialOffset.top;
					}

					if (this.isSafariMobileBrowser()) {
						if (this.isSafari4MobileBrowser() && this.isIPadSafariMobileBrowser()) {
							return returnValue;
						}
						if (agent.indexOf('version/7') != -1) {
							return initialOffset.top;
						}
						if (agent.indexOf('version/6') != -1 || agent.indexOf('version/5') != -1) {
							returnValue = returnValue + $(window).scrollTop();
						}
						if (/(Android.*Chrome\/[.0-9]* (!?Mobile))/.exec(navigator.userAgent)) {
							return returnValue;
							//       return returnValue + $(window).scrollTop();
						}
						if (/(Android.*Chrome\/[.0-9]* Mobile)/.exec(navigator.userAgent)) {
							return returnValue;
							//        return returnValue + $(window).scrollTop();
						}

						return initialOffset.top;
					}

					return returnValue;
				},

				isChromeMobileBrowser: function () {
					var agent = navigator.userAgent.toLowerCase();
					var result = agent.indexOf('android') != -1;
					return result;
				},

				isOperaMiniMobileBrowser: function () {
					var agent = navigator.userAgent.toLowerCase();
					var result = agent.indexOf('opera mini') != -1 || agent.indexOf('opera mobi') != -1;
					return result;
				},

				isOperaMiniBrowser: function () {
					var agent = navigator.userAgent.toLowerCase();
					var result = agent.indexOf('opera mini') != -1;
					return result;
				},

				isNewSafariMobileBrowser: function () {
					var agent = navigator.userAgent.toLowerCase();
					var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1;
					result = result && (agent.indexOf('version/5') != -1);
					return result;
				},

				isSafari4MobileBrowser: function () {
					var agent = navigator.userAgent.toLowerCase();
					var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1;
					result = result && (agent.indexOf('version/4') != -1);
					return result;
				},

				isWindowsPhone: function () {
					var agent = navigator.userAgent.toLowerCase();
					var result = (agent.indexOf('windows phone') != -1 || agent.indexOf('WPDesktop') != -1 || agent.indexOf('ZuneWP7') != -1 || agent.indexOf('msie 9') != -1 || agent.indexOf('msie 11') != -1 || agent.indexOf('msie 10') != -1 && agent.indexOf('touch') != -1);
					return result;
				},

				isSafariMobileBrowser: function () {
					var agent = navigator.userAgent.toLowerCase();
					if (/(Android.*Chrome\/[.0-9]* (!?Mobile))/.exec(navigator.userAgent)) {
						return true;
					}
					if (/(Android.*Chrome\/[.0-9]* Mobile)/.exec(navigator.userAgent)) {
						return true;
					}

					var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1 || agent.indexOf('mobile safari') != -1;
					return result;
				},

				isIPadSafariMobileBrowser: function () {
					var agent = navigator.userAgent.toLowerCase();
					var result = agent.indexOf('ipad') != -1;
					return result;
				},

				isMobileBrowser: function () {
					var agent = navigator.userAgent.toLowerCase();
					var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('android') != -1;
					return result;
				},

				// Get the touch points from this event
				getTouches: function (e) {
					if (e.originalEvent) {
						if (e.originalEvent.touches && e.originalEvent.touches.length) {
							return e.originalEvent.touches;
						} else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
							return e.originalEvent.changedTouches;
						}
					}

					if (!e.touches) {
						e.touches = new Array();
						e.touches[0] = e.originalEvent != undefined ? e.originalEvent : e;

						if (e.originalEvent != undefined && e.pageX)
							e.touches[0] = e;
						if (e.type == 'mousemove') e.touches[0] = e;
					}

					return e.touches;
				},

				getTouchEventName: function (name) {
					if (this.isWindowsPhone()) {

						var agent = navigator.userAgent.toLowerCase();
						if (agent.indexOf('windows phone 7') != -1) {
							if (name.toLowerCase().indexOf('start') != -1) return 'MSPointerDown';
							if (name.toLowerCase().indexOf('move') != -1) return 'MSPointerMove';
							if (name.toLowerCase().indexOf('end') != -1) return 'MSPointerUp';
						}
						if (name.toLowerCase().indexOf('start') != -1) return 'pointerdown';
						if (name.toLowerCase().indexOf('move') != -1) return 'pointermove';
						if (name.toLowerCase().indexOf('end') != -1) return 'pointerup';
					}
					else {
						return name;
					}
				},

				// Dispatches a fake mouse event from a touch event
				dispatchMouseEvent: function (name, touch, target) {
					if (this.simulatetouches)
						return;

					var e = document.createEvent('MouseEvent');
					e.initMouseEvent(name, true, true, touch.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
					if (target != null) {
						target.dispatchEvent(e);
					}
				},

				// Find the root node of this target
				getRootNode: function (target) {
					while (target.nodeType !== 1) {
						target = target.parentNode;
					}
					return target;
				},

				setTouchScroll: function (enable, key) {
					if (!this.enableScrolling) this.enableScrolling = [];
					this.enableScrolling[key] = enable;
				},

				touchScroll: function (element, scrollHeight, callback, key, horizontalScroll, verticalScroll) {
					if (element == null)
						return;

					var me = this;
					var scrollY = 0;
					var touchY = 0;
					var movedY = 0;
					var scrollX = 0;
					var touchX = 0;
					var movedX = 0;
					if (!this.scrolling) this.scrolling = [];
					this.scrolling[key] = false;
					var moved = false;
					var $element = $(element);
					var touchTags = ['select', 'input', 'textarea'];
					var touchStart = 0;
					var touchEnd = 0;
					if (!this.enableScrolling) this.enableScrolling = [];
					this.enableScrolling[key] = true;
					var key = key;
					var touchStartName = this.getTouchEventName('touchstart') + ".touchScroll";
					var touchEndName = this.getTouchEventName('touchend') + ".touchScroll";
					var touchMoveName = this.getTouchEventName('touchmove') + ".touchScroll";

					//            horizontalScroll.fadeOut(0);
					//            verticalScroll.fadeOut(0);

					var view, indicator, relative, xframe, xdelta,
						xmax, min, max, offset, reference, pressed, xform,
						jqxAnimations, xjqxAnimations, frame, timestamp, ticker,
						amplitude, target, xtarget, xreference, timeConstant;
					max = scrollHeight;
					var min = 0;
					var offset = 0;
					var xoffset = 0;
					var initialOffset = 0;
					var initialXOffset = 0;
					var xmax = horizontalScroll.jqxScrollBar('max');
					var timeConstant = 325; // ms

					function ypos(e) {
						// touch event
						if (e.targetTouches && (e.targetTouches.length >= 1)) {
							return e.targetTouches[0].clientY;
						}
						else if (e.originalEvent && e.originalEvent.clientY !== undefined) {
							return e.originalEvent.clientY;
						}
						else {
							var touches = me.getTouches(e);
							return touches[0].clientY;
						}

						// mouse event
						//    return e.clientY;
					}

					function xpos(e) {
						// touch event
						if (e.targetTouches && (e.targetTouches.length >= 1)) {
							return e.targetTouches[0].clientX;
						}
						else if (e.originalEvent && e.originalEvent.clientX !== undefined) {
							return e.originalEvent.clientX;
						}
						else {
							var touches = me.getTouches(e);
							return touches[0].clientX;
						}

						// mouse event
						//   return e.clientX;
					}

					var track = function () {
						var now, elapsed, delta, v;

						now = Date.now();
						elapsed = now - timestamp;
						timestamp = now;
						delta = offset - frame;
						var xdelta = xoffset - xframe;
						frame = offset;
						xframe = xoffset;
						pressed = true;
						v = 1000 * delta / (1 + elapsed);
						var xv = 1000 * xdelta / (1 + elapsed);
						jqxAnimations = 0.8 * v + 0.2 * jqxAnimations;
						xjqxAnimations = 0.8 * xv + 0.2 * xjqxAnimations;
					}

					var tapped = false;

					var touchStart = function (event) {
						if (!me.enableScrolling[key])
							return true;

						// Allow certain HTML tags to receive touch events
						if ($.inArray(event.target.tagName.toLowerCase(), touchTags) !== -1) {
							return;
						}
						offset = verticalScroll.jqxScrollBar('value');
						xoffset = horizontalScroll.jqxScrollBar('value');

						var touches = me.getTouches(event);
						var touch = touches[0];
						if (touches.length == 1) {
							me.dispatchMouseEvent('mousedown', touch, me.getRootNode(touch.target));
						}
						xmax = horizontalScroll.jqxScrollBar('max');
						max = verticalScroll.jqxScrollBar('max');
						function tap(e) {
							tapped = false;
							pressed = true;
							reference = ypos(e);
							xreference = xpos(e);
							jqxAnimations = amplitude = xjqxAnimations = 0;
							frame = offset;
							xframe = xoffset;
							timestamp = Date.now();
							clearInterval(ticker);
							ticker = setInterval(track, 100);
							initialOffset = offset;
							initialXOffset = xoffset;

							if (offset > 0 && offset < max && verticalScroll[0].style.visibility != "hidden") {
								//      e.preventDefault();
							}
							//    if (xoffset > 0 && xoffset < xmax && horizontalScroll[0].style.visibility != "hidden") {
							//        e.preventDefault();

							//      e.stopPropagation();
							//   e.stopPropagation();
							// return false;
						}

						tap(event);
						moved = false;
						touchY = touch.pageY;
						touchX = touch.pageX;
						if (me.simulatetouches) {
							if (touch._pageY != undefined) {
								touchY = touch._pageY;
								touchX = touch._pageX;
							}
						}
						me.scrolling[key] = true;
						scrollY = 0;
						scrollX = 0;
						return true;
					}

					if ($element.on) {
						$element.on(touchStartName, touchStart);
					}
					else {
						$element.bind(touchStartName, touchStart);
					}

					var scroll = function (top, event) {
						offset = (top > max) ? max : (top < min) ? min : top;
						callback(null, top, 0, 0, event);

						return (top > max) ? "max" : (top < min) ? "min" : "value";
					}

					var hscroll = function (left, event) {
						xoffset = (left > xmax) ? xmax : (left < min) ? min : left;
						callback(left, null, 0, 0, event);

						return (left > xmax) ? "max" : (left < min) ? "min" : "value";
					}

					function autoScroll() {
						var elapsed, delta;
						if (amplitude) {
							elapsed = Date.now() - timestamp;
							delta = -amplitude * Math.exp(-elapsed / timeConstant);
							if (delta > 0.5 || delta < -0.5) {
								scroll(target + delta);
								requestAnimationFrame(autoScroll);
							} else {
								scroll(target);
								//     verticalScroll.fadeOut('fast');
							}
						}
					}
					function hAutoScroll() {
						var elapsed, delta;
						if (amplitude) {
							elapsed = Date.now() - timestamp;
							delta = -amplitude * Math.exp(-elapsed / timeConstant);
							if (delta > 0.5 || delta < -0.5) {
								hscroll(xtarget + delta);
								requestAnimationFrame(hAutoScroll);
							} else {
								hscroll(xtarget);
								//        horizontalScroll.fadeOut('fast');
							}

						}
					}
					var touchMove = function (event) {
						if (!me.enableScrolling[key])
							return true;

						if (!me.scrolling[key]) {
							return true;
						}

						if (tapped) {
							event.preventDefault();
							event.stopPropagation();
						}

						var touches = me.getTouches(event);
						if (touches.length > 1) {
							return true;
						}

						var pageY = touches[0].pageY;
						var pageX = touches[0].pageX;

						if (me.simulatetouches) {
							if (touches[0]._pageY != undefined) {
								pageY = touches[0]._pageY;
								pageX = touches[0]._pageX;
							}
						}


						var dy = pageY - touchY;
						var dx = pageX - touchX;
						touchEnd = pageY;
						var touchHorizontalEnd = pageX;
						movedY = dy - scrollY;
						movedX = dx - scrollX;
						moved = true;
						scrollY = dy;
						scrollX = dx;

						var hScrollVisible = horizontalScroll != null ? horizontalScroll[0].style.visibility != 'hidden' : true;
						var vScrollVisible = verticalScroll != null ? verticalScroll[0].style.visibility != 'hidden' : true;


						function drag(e) {
							var y, delta, x;
							if (pressed) {
								y = ypos(e);
								x = xpos(e);
								delta = reference - y;
								xdelta = xreference - x;
								var dragged = "value";
								if (delta > 2 || delta < -2) {
									reference = y;
									dragged = scroll(offset + delta, e);
									track();

									if (dragged == "min" && initialOffset === 0) {
										return true;
									}
									if (dragged == "max" && initialOffset === max) {
										return true;
									}

									if (!vScrollVisible) {
										return true;
									}
									e.preventDefault();
									e.stopPropagation();
									tapped = true;

									return false;
								}
								else {
									if (xdelta > 2 || xdelta < -2) {
										xreference = x;
										dragged = hscroll(xoffset + xdelta, e);
										track();

										if (dragged == "min" && initialXOffset === 0) {
											return true;
										}
										if (dragged == "max" && initialXOffset === xmax) {
											return true;
										}

										if (!hScrollVisible) {
											return true;
										}
										tapped = true;
										e.preventDefault();
										e.stopPropagation();
										return false;
									}
								}
								e.preventDefault();
							}
						}

						if (hScrollVisible || vScrollVisible) {
							if ((hScrollVisible) || (vScrollVisible)) {
								drag(event);

								//      callback(-movedX * 1, -movedY * 1, dx, dy, event);
								//event.preventDefault();
								//event.stopPropagation();
								//if (event.preventManipulation) {
								//    event.preventManipulation();
								//}
								//return false;
							}
						}
					}

					if ($element.on) {
						$element.on(touchMoveName, touchMove);
					}
					else $element.bind(touchMoveName, touchMove);



					var touchCancel = function (event) {
						if (!me.enableScrolling[key])
							return true;

						var touch = me.getTouches(event)[0];
						if (!me.scrolling[key]) {
							return true;
						}

						pressed = false;
						clearInterval(ticker);
						if (jqxAnimations > 10 || jqxAnimations < -10) {
							amplitude = 0.8 * jqxAnimations;
							target = Math.round(offset + amplitude);
							timestamp = Date.now();
							requestAnimationFrame(autoScroll);
							//             verticalScroll.fadeIn(100);
						}
						else if (xjqxAnimations > 10 || xjqxAnimations < -10) {
							amplitude = 0.8 * xjqxAnimations;
							xtarget = Math.round(xoffset + amplitude);
							timestamp = Date.now();
							requestAnimationFrame(hAutoScroll);
							//          horizontalScroll.fadeIn(100);
						}
						else {
							//        horizontalScroll.fadeOut(100);
							//        verticalScroll.fadeOut(100);
						}

						me.scrolling[key] = false;
						if (moved) {
							me.dispatchMouseEvent('mouseup', touch, event.target);
						} else {
							var touch = me.getTouches(event)[0],
								t = me.getRootNode(touch.target);

							//        event.preventDefault();
							//         event.stopPropagation();
							// Dispatch fake mouse up and click events if this touch event did not move
							me.dispatchMouseEvent('mouseup', touch, t);
							me.dispatchMouseEvent('click', touch, t);
							return true;
						}
					}

					if (this.simulatetouches) {
						var windowBindFunc = $(window).on != undefined || $(window).bind;
						var windowMouseUp = function (event) {
							try {
								touchCancel(event);
							}
							catch (er) {
							}
							me.scrolling[key] = false;
						};
						$(window).on != undefined ? $(document).on('mouseup.touchScroll', windowMouseUp) : $(document).bind('mouseup.touchScroll', windowMouseUp);

						if (window.frameElement) {
							if (window.top != null) {
								var eventHandle = function (event) {
									try {
										touchCancel(event);
									}
									catch (er) {
									}
									me.scrolling[key] = false;
								};

								if (window.top.document) {
									$(window.top.document).on ? $(window.top.document).on('mouseup', eventHandle) : $(window.top.document).bind('mouseup', eventHandle);
								}
							}
						}

						var docBindFunc = $(document).on != undefined || $(document).bind;
						var touchEndFunc = function (event) {
							if (!me.scrolling[key]) {
								return true;
							}

							me.scrolling[key] = false;
							var touch = me.getTouches(event)[0],
								target = me.getRootNode(touch.target);

							// Dispatch fake mouse up and click events if this touch event did not move
							me.dispatchMouseEvent('mouseup', touch, target);
							me.dispatchMouseEvent('click', touch, target);
						};

						$(document).on != undefined ? $(document).on('touchend', touchEndFunc) : $(document).bind('touchend', touchEndFunc);
					}

					if ($element.on) {
						$element.on('dragstart', function (event) {
							event.preventDefault();
						});
						$element.on('selectstart', function (event) {
							event.preventDefault();
						});
					}
					$element.on ? $element.on(touchEndName + ' touchcancel.touchScroll', touchCancel) : $element.bind(touchEndName + ' touchcancel.touchScroll', touchCancel);
				}

			});

		$.jqx.cookie = $.jqx.cookie || {};
		$.extend($.jqx.cookie,
			{
				cookie: function (key, value, options) {
					// set cookie.
					if (arguments.length > 1 && String(value) !== "[object Object]") {
						options = $.extend({}, options);

						if (value === null || value === undefined) {
							options.expires = -1;
						}

						if (typeof options.expires === 'number') {
							var days = options.expires, t = options.expires = new Date();
							t.setDate(t.getDate() + days);
						}

						value = String(value);

						return (document.cookie = [
							encodeURIComponent(key), '=',
							options.raw ? value : encodeURIComponent(value),
							options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
							options.path ? '; path=' + options.path : '',
							options.domain ? '; domain=' + options.domain : '',
							options.secure ? '; secure' : ''
						].join(''));
					}
					// get cookie...
					options = value || {};
					var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
					return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
				}
			});

		// stringutilities
		$.jqx.string = $.jqx.string || {};
		$.extend($.jqx.string,
			{
				replace: function (text, stringToFind, stringToReplace) {
					if (stringToFind === stringToReplace) return this;
					var temp = text;
					var index = temp.indexOf(stringToFind);
					while (index != -1) {
						temp = temp.replace(stringToFind, stringToReplace);
						index = temp.indexOf(stringToFind);
					}
					return temp;
				},

				contains: function (fullString, value) {
					if (fullString == null || value == null)
						return false;

					return fullString.indexOf(value) != -1;
				},

				containsIgnoreCase: function (fullString, value) {
					if (fullString == null || value == null)
						return false;

					return fullString.toString().toUpperCase().indexOf(value.toString().toUpperCase()) != -1;
				},

				equals: function (fullString, value) {
					if (fullString == null || value == null)
						return false;

					fullString = this.normalize(fullString);

					if (value.length == fullString.length) {
						return fullString.slice(0, value.length) == value;
					}

					return false;
				},

				equalsIgnoreCase: function (fullString, value) {
					if (fullString == null || value == null)
						return false;

					fullString = this.normalize(fullString);

					if (value.length == fullString.length) {
						return fullString.toUpperCase().slice(0, value.length) == value.toUpperCase();
					}

					return false;
				},

				startsWith: function (fullString, value) {
					if (fullString == null || value == null)
						return false;

					return fullString.slice(0, value.length) == value;
				},

				startsWithIgnoreCase: function (fullString, value) {
					if (fullString == null || value == null)
						return false;

					return fullString.toUpperCase().slice(0, value.length) == value.toUpperCase();
				},

				normalize: function (fullString) {
					if (fullString.charCodeAt(fullString.length - 1) == 65279) {
						fullString = fullString.substring(0, fullString.length - 1);
					}

					return fullString;
				},

				endsWith: function (fullString, value) {
					if (fullString == null || value == null)
						return false;

					fullString = this.normalize(fullString);
					return fullString.slice(-value.length) == value;
				},

				endsWithIgnoreCase: function (fullString, value) {
					if (fullString == null || value == null)
						return false;

					fullString = this.normalize(fullString);

					return fullString.toUpperCase().slice(-value.length) == value.toUpperCase();
				}
			});

		$.extend($.easing, {
			easeOutBack: function (x, t, b, c, d, s) {
				if (s == undefined) s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInQuad: function (x, t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeInOutCirc: function (x, t, b, c, d) {
				if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			},
			easeInOutSine: function (x, t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			},
			easeInCubic: function (x, t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOutCubic: function (x, t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOutCubic: function (x, t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			},
			easeInSine: function (x, t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOutSine: function (x, t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOutSine: function (x, t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			}
		});
	})(jqxBaseFramework);

	(function ($) {
		if ($.event && $.event.special) {
			$.extend($.event.special,
				{
					"close": { noBubble: true },
					"open": { noBubble: true },
					"cellclick": { noBubble: true },
					"rowclick": { noBubble: true },
					"tabclick": { noBubble: true },
					"selected": { noBubble: true },
					"expanded": { noBubble: true },
					"collapsed": { noBubble: true },
					"valuechanged": { noBubble: true },
					"expandedItem": { noBubble: true },
					"collapsedItem": { noBubble: true },
					"expandingItem": { noBubble: true },
					"collapsingItem": { noBubble: true }
				});
		}
		if ($.fn.extend) {
			$.fn.extend({
				ischildof: function (filter_string) {
					if (!$(this).parents) {
						var result = filter_string.element.contains(this.element)
						return result;
					}

					var parents = $(this).parents().get();

					for (var j = 0; j < parents.length; j++) {
						if (typeof filter_string != "string") {
							var parent = parents[j];
							if (filter_string !== undefined) {
								if (parent == filter_string[0])
									return true;
							}
						}
						else {
							if (filter_string !== undefined) {
								if ($(parents[j]).is(filter_string)) {
									return true;
								}
							}
						}
					}

					return false;
				}
			});
		}

		$.fn.jqxProxy = function () {
			var widget = $(this).data().jqxWidget;
			var args = Array.prototype.slice.call(arguments, 0);
			var element = widget.element;
			if (!element) element = widget.base.element;
			return $.jqx.jqxWidgetProxy(widget.widgetName, element, args);
		}

		var originalVal = $.originalVal = $.fn.val;
		$.fn.val = function (value) {
			if (typeof value == 'undefined') {
				if ($(this).hasClass('jqx-widget') || $(this).hasClass('jqx-input-group')) {
					var widget = $(this).data().jqxWidget;
					if (widget && widget.val) {
						return widget.val();
					}
				}
				if (this[0] && this[0].tagName.toLowerCase().indexOf('angular') >= 0) {
					var widget = $(this).find('.jqx-widget').data().jqxWidget;
					if (widget && widget.val) {
						return widget.val();
					}

				}
				return originalVal.call(this);
			}
			else {
				if ($(this).hasClass('jqx-widget') || $(this).hasClass('jqx-input-group')) {
					var widget = $(this).data().jqxWidget;
					if (widget && widget.val) {
						if (arguments.length != 2) {
							return widget.val(value);
						}
						else {
							return widget.val(value, arguments[1]);
						}
					}
				}
				if (this[0] && this[0].tagName.toLowerCase().indexOf('angular') >= 0) {
					var widget = $(this).find('.jqx-widget').data().jqxWidget;
					if (widget && widget.val) {
						if (arguments.length != 2) {
							return widget.val(value);
						}
						else {
							return widget.val(value, arguments[1]);
						}
					}

				}

				return originalVal.call(this, value);
			}
		};

		if ($.fn.modal && $.fn.modal.Constructor) {
			$.fn.modal.Constructor.prototype.enforceFocus = function () {
				$(document)
					.off('focusin.bs.modal') // guard against infinite focus loop
					.on('focusin.bs.modal', $.proxy(function (e) {
						if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
							if ($(e.target).parents().hasClass('jqx-popup'))
								return true;
							this.$element.trigger('focus')
						}
					}, this));
			}
		}

		$.fn.coord = function (options) {
			var docElem, win,
				box = { top: 0, left: 0 },
				elem = this[0],
				doc = elem && elem.ownerDocument;
			if (!doc) {
				return;
			}
			docElem = doc.documentElement;
			if (!$.contains(docElem, elem)) {
				return box;
			}
			if (typeof elem.getBoundingClientRect !== undefined) {
				box = elem.getBoundingClientRect();
			}
			var getWindow = function (elem) {
				return $.isWindow(elem) ?
					elem :
					elem.nodeType === 9 ?
						elem.defaultView || elem.parentWindow :
						false;
			};

			win = getWindow(doc);
			var additionalLeftOffset = 0;
			var additionalTopOffset = 0;
			var agent = navigator.userAgent.toLowerCase();
			var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1;
			if (result) {
				// fix for iphone/ipad left offsets.
				additionalLeftOffset = 2;
			}
			if (true == options) {
				if (document.body.style.position != 'static' && document.body.style.position != '') {
					var coords = $(document.body).coord();
					additionalLeftOffset = -coords.left;
					additionalTopOffset = -coords.top;
				}
			}

			return {
				top: additionalTopOffset + box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
				left: additionalLeftOffset + box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
			};
		};

		$.jqx.ripplers = [];
		$.jqx.ripple = function (element, hostElement, hostElementType) {
			if (!hostElement) {
				hostElement = element;
			}

			var rippler = $(element);
			var mouseCaptured = false;

			rippler.append("<span class='ink'></span>");
			var ink = rippler.find('.ink');


			var hasRippler = false;

			for (var i = 0; i < $.jqx.ripplers.length; i++) {
				var ripplerItem = $.jqx.ripplers[i];

				if (ripplerItem.element[0] === element[0]) {
					hasRippler = true;
					break;
				}
			}

			if (!hasRippler) {
				$.jqx.ripplers.push({ ink: ink, element: element, hostElement: hostElement, hostElementType: hostElementType });
			}

			if (hostElementType === "checkbox" || hostElementType === "radiobutton") {

				// set .ink diametr
				var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
				ink.css({ height: d, width: d });

				var x = rippler.width() / 2 - ink.width() / 2;
				var y = rippler.height() / 2 - ink.height() / 2;

				// set .ink position and add class .animate
				ink.css({
					top: y + 'px',
					left: x + 'px'
				});
			}

			// Ripple-effect animation
			if ($.jqx.ripplers.length === 1) {
				$(document).on('mouseup', function (e) {
					$.jqx.ripple.mouseCaptured = false;

					for (var i = 0; i < $.jqx.ripplers.length; i++) {
						var rippler = $.jqx.ripplers[i];

						rippler.ink.removeClass('active');
						rippler.element.removeClass('active');

						if (hostElementType !== "checkbox" && hostElementType !== "radiobutton") {
							if (rippler.ink.hasClass('animate')) {
								rippler.ink.removeClass('animate');
							}
						}
					}
				});
			}
			hostElement.off('mousedown.ripple');
			hostElement.on('mousedown.ripple', function (e) {
				var rippler = $(element);

				$.jqx.ripple.mouseCaptured = true;

				setTimeout(function () {
					// create .ink element if it doesn't exist

					if (rippler.find('.ink').length == 0) {
						rippler.append("<span class='ink'></span>");
					}

					var ink = rippler.find('.ink');

					// prevent quick double clicks
					ink.removeClass('animate');


					// set .ink diametr
					if (!ink.height() && !ink.width()) {
						var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
						ink.css({ height: d, width: d });
					}

					if (hostElementType === "checkbox" || hostElementType === "radiobutton") {
						if (hostElementType === "checkbox") {
							if (hostElement.jqxCheckBox('disabled')) {
								return;
							}
						}

						if (hostElementType === "radiobutton") {
							if (hostElement.jqxRadioButton('disabled')) {
								return;
							}
						}

						// get click coordinates
						var x = rippler.width() / 2 - ink.width() / 2;
						var y = rippler.height() / 2 - ink.height() / 2;

						// set .ink position and add class .animate
						ink.css({
							top: y + 'px',
							left: x + 'px'
						}).addClass('animate');

						ink.on('animationend', function () {
							if ($.jqx.ripple.mouseCaptured) {
								ink.removeClass('animate')
								ink.addClass('active')
								element.addClass('active')
							}
						});

						return;
					}

					// get click coordinates
					var x = e.pageX - rippler.offset().left - ink.width() / 2;
					var y = e.pageY - rippler.offset().top - ink.height() / 2;

					// set .ink position and add class .animate
					ink.css({
						top: y + 'px',
						left: x + 'px'
					}).addClass('animate');
				});
			});
		}
	})(jqxBaseFramework);
})();


/***/ }),

/***/ 4993:
/***/ (() => {


/* tslint:disable */
/* eslint-disable */
(function () {
    if (typeof document === 'undefined') {
        return;
    }

    (function ($) {
        $.jqx.jqxWidget("jqxDateTimeInput", "", {});

        $.extend($.jqx._jqxDateTimeInput.prototype, {

            defineInstance: function () {
                var settings = {
                    value: $.jqx._jqxDateTimeInput.getDateTime(new Date()),
                    minDate: $.jqx._jqxDateTimeInput.getDateTime(new Date()),
                    maxDate: $.jqx._jqxDateTimeInput.getDateTime(new Date()),
                    min: new Date(1900, 0, 1),
                    max: new Date(2100, 0, 1),
                    rowHeaderWidth: 25,
                    enableViews: true,
                    views: ['month', 'year', 'decade'],
                    selectableDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    change: null,
                    changing: null,
                    titleFormat: ["MMMM yyyy", "yyyy", "yyyy", "yyyy"],
                    // "primary", "inverse", "danger", "info", "success", "warning", "link"
                    template: "default",
                    // Default: 20
                    // Gets or sets the column header's height.
                    // Type: Number.
                    columnHeaderHeight: 20,
                    // Default: 25
                    // Gets or sets the title's height.
                    // Type: Number.
                    titleHeight: 30,
                    // Type: Number.
                    // Default: 0
                    // Gets or sets the first day of the week - Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6.
                    firstDayOfWeek: 0,
                    // Type: Boolean.
                    // Default: false.
                    // Shows or hides the week numbers.
                    showWeekNumbers: false,
                    showTimeButton: false,
                    // store value in cookie
                    cookies: false,
                    cookieoptions: null,
                    showFooter: false,
                    //Type: String.
                    //Default: null.
                    //Sets the masked input's formatString.
                    // Available ready to use patterns:
                    // short date pattern: "d",
                    // long date pattern: "D"
                    // short time pattern: "t"
                    // long time pattern: "T"
                    // long date, short time pattern: "f"
                    // long date, long time pattern: "F"
                    // month/day pattern: "M"
                    // month/year pattern: "Y"
                    // sortable format that does not vary by culture: "S"
                    formatString: "dd/MM/yyyy",
                    //Type: Number.
                    //Default: 0.
                    //Sets width of the masked input in pixels. Only positive values have effect.
                    width: 200,

                    //Type: Number.
                    //Default: 0.
                    //Sets height of the masked input in pixels.
                    height: 25,

                    // Type: String.
                    // Gets or sets the string format of the day names.
                    // Possible values: default, shortest, firstTwoLetters, firstLetter, full
                    dayNameFormat: 'firstTwoLetters',

                    // Type: String
                    // Sets the  text alignment.
                    textAlign: 'left',

                    // Type: Boolean
                    // Default: false
                    // Sets the readonly state of the input.
                    readonly: false,

                    // Type: String
                    // sets the culture.
                    // Default: 'default'
                    culture: "default",

                    activeEditor: null,

                    // Type: Boolean
                    // Default:true.
                    // shows or hides the calendar's button.
                    showCalendarButton: true,
                    showDeleteButton: false,
                    // Type: Number
                    // Default: 250
                    // Sets the animation's duration when the calendar is displayed.
                    openDelay: 250,

                    // Type: Number
                    // Default: 300
                    // Sets the animation's duration when the calendar is going to be hidden.
                    closeDelay: 300,

                    // Type: Boolean
                    // Default: true
                    // Sets whether to close the calendar after selecting a date.
                    closeCalendarAfterSelection: true,
                    // internal property
                    isEditing: false,
                    // Type: Boolean.
                    // enables the browser window bounds detection.
                    // Default: false.
                    enableBrowserBoundsDetection: false,
                    dropDownHorizontalAlignment: 'left',
                    dropDownVerticalAlignment: "bottom",
                    // Type: Boolean
                    // Enables absolute date selection. When this property is true, the user selects one symbol at a time instead of a group of symbols.
                    // Default: false
                    enableAbsoluteSelection: false,
                    // Type: Boolean
                    // Enables or disables the DateTimeInput.
                    // Default: false
                    disabled: false,
                    // Type: Number
                    // Default: 18
                    // Sets the button's size.
                    buttonSize: 21,
                    // default, none
                    // Type: String.
                    // enables or disables the animation.
                    animationType: 'slide',
                    // Type: String
                    // Default: auto ( the drop down takes the calendar's width.)
                    // Sets the popup's width.
                    dropDownWidth: '200px',
                    restrictedDates: new Array(),
                    // Type: String
                    // Default: 200px ( the height is 200px )
                    // Sets the popup's height.
                    dropDownHeight: '205px',
                    dropDownContainer: "default",
                    // 'none', 'range', 'default'
                    selectionMode: 'default',
                    renderMode: "full",
                    rtl: false,
                    timeRange: null,
                    _editor: false,
                    todayString: 'Today',
                    clearString: 'Clear',
                    popupZIndex: 3001,
                    allowNullDate: true,
                    changeType: null,
                    placeHolder: "",
                    enableHover: true,
                    hint: true,
                    allowKeyboardDelete: true,
                    yearCutoff: null,
                    editMode: 'default',// Possible values: 'default', 'full'
                    localization: {
                        backString: "Back",
                        forwardString: "Forward",
                        todayString: "Today",
                        clearString: "Clear",
                        calendar: {
                            name: "Gregorian_USEnglish",
                            "/": "/",
                            // separator of parts of a time (e.g. ":" in 05:44 PM)
                            ":": ":",
                            // the first day of the week (0:Sunday, 1:Monday, etc)
                            firstDay: 0,
                            days: {
                                // full day names
                                names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                // abbreviated day names
                                namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                // shortest day names
                                namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                            },
                            months: {
                                // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                                names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                                // abbreviated month names
                                namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                            },
                            // AM and PM designators in one of these forms:
                            // The usual view, and the upper and lower case versions
                            //      [standard,lowercase,uppercase]
                            // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                            //      null
                            AM: ["AM", "am", "AM"],
                            PM: ["PM", "pm", "PM"],
                            eras: [
                                // eras in reverse chronological order.
                                // name: the name of the era in this culture (e.g. A.D., C.E.)
                                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                                // offset: offset in years from gregorian calendar
                                { "name": "A.D.", "start": null, "offset": 0 }
                            ],
                            twoDigitYearMax: 2029,
                            patterns: {
                                // short date pattern
                                d: "M/d/yyyy",
                                // long date pattern
                                D: "dddd, MMMM dd, yyyy",
                                // short time pattern
                                t: "h:mm tt",
                                // long time pattern
                                T: "h:mm:ss tt",
                                // long date, short time pattern
                                f: "dddd, MMMM dd, yyyy h:mm tt",
                                // long date, long time pattern
                                F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                                // month/day pattern
                                M: "MMMM dd",
                                // month/year pattern
                                Y: "yyyy MMMM",
                                // S is a sortable format that does not vary by culture
                                S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                                // formatting of dates in MySQL DataBases
                                ISO: "yyyy-MM-dd hh:mm:ss"
                            }
                        }
                    },
                    // DateTimeInput events.
                    events:
                        [
                            // Occurs when the value is changed.
                            'valueChanged',
                            // Occurs when the text is changed.
                            'textchanged',
                            // Occurs when the mouse button is clicked.
                            'mousedown',
                            // Occurs when the mouse button is clicked.
                            'mouseup',
                            // Occurs when the user presses a key.
                            'keydown',
                            // Occurs when the user presses a key. Fired after keydown and keypress
                            'keyup',
                            // Occurs when the user presses a key.
                            'keypress',
                            // Occurs when the calendar is opened.
                            'open',
                            // Occurs when the calendar is hidden.
                            'close',
                            // Occurs when the value is changed.
                            'change'
                        ],
                    aria:
                    {
                        //      "aria-valuenow": { name: "getDate", type: "date" },
                        "aria-valuetext": { name: "getText", type: "string" },
                        //     "aria-valuemin": { name: "min", type: "date" },
                        //      "aria-valuemax": { name: "max", type: "date" },
                        "aria-disabled": { name: "disabled", type: "boolean" }
                    }
                };
                if (this === $.jqx._jqxDateTimeInput.prototype) {
                    return settings;
                }
                $.extend(true, this, settings);
                this.value._setHours(0);
                this.value._setMinutes(0);
                this.value._setSeconds(0);
                this.value._setMilliseconds(0);
                this.minDate._setYear(1900);
                this.minDate._setMonth(1);
                this.minDate._setDay(1);
                this.minDate._setHours(1);
                this.minDate._setMinutes(1);
                this.minDate._setSeconds(1);
                this.minDate._setMilliseconds(1);
                this.maxDate._setYear(2100);
                this.maxDate._setMonth(1);
                this.maxDate._setDay(1);
                this.maxDate._setHours(1);
                this.maxDate._setMinutes(1);
                this.maxDate._setSeconds(1);
                this.maxDate._setMilliseconds(1);
                this.defaultMinDate = this.minDate;
                this.defaultMaxDate = this.maxDate;
                return settings;
            },

            // creates the masked input's instance.
            createInstance: function (args) {
                var hasAttr = "";
                var that = this;
                if (!that.host.jqxCalendar) {
                    throw new Error("jqxDateTimeInput: Missing reference to jqxcalendar.js.");
                }
                if (that.isMaterialized()) {
                    var elementStyle = window.getComputedStyle(this.element);
                    var animation = elementStyle.getPropertyValue('--jqx-dropdown-animation');
                    var dropDownWidth = elementStyle.getPropertyValue('--jqx-datetimeinput-dropdown-width') || 280;
                    var dropDownHeight = elementStyle.getPropertyValue('--jqx-datetimeinput-dropdown-height') || 280;

                    if (animation && this.animationType == "default") {
                        this.animationType = animation.trim();
                    }
                    if (dropDownWidth) {
                        this.dropDownWidth = dropDownWidth;
                    }
                    if (dropDownHeight) {
                        this.dropDownHeight = dropDownHeight;
                    }
                }
                if (that.formatString != "dd/MM/yyyy") {
                    var formats = that.formatString.split(" ");
                    if (formats && formats.length > 1) {
                        var extendedFormat = "";
                        for (var i = 0; i < formats.length; i++) {
                            if (formats[i].length == "1") {
                                extendedFormat += that._getFormatValue(formats[i])
                            }
                            else extendedFormat += formats[i];

                            if (i < formats.length - 1) {
                                extendedFormat += " ";
                            }
                        }
                        that.formatString = extendedFormat;
                    }
                }

                if (that.element.nodeName.toLowerCase() == "input") {
                    var inputType = that.element.getAttribute("type")
                    if (inputType) {
                        if (that.formatString == "dd/MM/yyyy") {
                            if (inputType == "date") {
                                that.formatString = "d";
                            }
                            if (inputType == "datetime") {
                                var formatString = that._getFormatValue("d") + " " + that._getFormatValue("t");
                                that.formatString = formatString;
                                that.showTimeButton = true;
                            }
                            if (inputType == "time") {
                                that.formatString = "t";
                                that.showTimeButton = true;
                                that.showCalendarButton = false;
                            }
                        }
                    }
                    that.field = that.element;

                    if (that.field.getAttribute('min')) {
                        var min = new Date(that.field.getAttribute('min'));
                        if (that._isValidDate(min))
                            that.min = min;
                    }
                    if (that.field.getAttribute('max')) {
                        var max = new Date(that.field.getAttribute('max'));
                        if (that._isValidDate(max))
                            that.max = max;
                    }

                    if (that.field.className) {
                        that._className = that.field.className;
                    }

                    var properties = {
                        'title': that.field.title
                    };


                    if (that.field.value) {
                        properties.value = that.field.value;
                    }

                    if (that.field.id.length) {
                        properties.id = that.field.id.replace(/[^\w]/g, '_') + "_jqxDateTimeInput";
                    }
                    else {
                        properties.id = $.jqx.utilities.createId() + "_jqxDateTimeInput";
                    }

                    var wrapper = $("<div></div>", properties);
                    wrapper[0].style.cssText = that.field.style.cssText;
                    if (!that.width) {
                        that.width = $(that.field).width();
                    }
                    if (!that.height) {
                        that.height = $(that.field).outerHeight();
                    }
                    $(that.field).hide().after(wrapper);
                    var data = that.host.data();
                    that.host = wrapper;
                    that.host.data(data);
                    that.element = wrapper[0];
                    that.element.id = that.field.id;
                    that.field.id = properties.id;
                    if (that._className) {
                        that.host.addClass(that._className);
                        $(that.field).removeClass(that._className);
                    }

                    if (that.field.tabIndex) {
                        var tabIndex = that.field.tabIndex;
                        that.field.tabIndex = -1;
                        that.element.tabIndex = tabIndex;
                    }
                }

                if (that.host.attr('value')) {
                    hasAttr = true;
                    var val = that.host.attr('value');
                    if (that.selectionMode != 'range') {
                        var date = new Date(val);
                        if (date != undefined && !isNaN(date)) {
                            that.value = $.jqx._jqxDateTimeInput.getDateTime(date);
                        }
                    }
                }

                if (that.value != null && that.value instanceof Date) {
                    that.value = $.jqx._jqxDateTimeInput.getDateTime(that.value);
                }
                else if (that.value != null && typeof (that.value) == "string") {
                    var date = new Date(that.value);
                    if (date != undefined && !isNaN(date)) {
                        that.value = $.jqx._jqxDateTimeInput.getDateTime(date);
                    }
                    else if (that.value.indexOf(',') >= 0) {
                        that.value = that.value.replace(/\,/g, '/');
                        var date = new Date(that.value);
                        if (date != undefined && !isNaN(date)) {
                            that.value = $.jqx._jqxDateTimeInput.getDateTime(date);
                        }
                    }
                }


                this._initTimeRange();
                this._validateTimeRange();

                that.host.attr('data-role', 'input');
                that.render();
                $.jqx.aria(this);
                if (that.getDate() != null) {
                    $.jqx.aria(this, "aria-label", "Current focused date is " + that.getDate().toLocaleString());
                }
                else {
                    $.jqx.aria(this, "aria-label", "Current focused date is Null");
                }

                if (that.minDate !== that.defaultMinDate) {
                    that.min = that.minDate;
                }
                if (that.maxDate !== that.defaultMaxDate) {
                    that.max = that.maxDate;
                }

                that.setMaxDate(that.max, false);
                that.setMinDate(that.min, false);

                if (that.selectionMode !== 'range' && that.value && that.value.dateTime && that.min && that.max &&
                    (that.value.dateTime < that.min || that.value.dateTime > that.max)) {
                    if (that.value.dateTime < that.min) {
                        that.value.dateTime = that.min;
                    }
                    if (that.value.dateTime > that.max) {
                        that.value.dateTime = that.max;
                    }

                    that._updateText();
                }

                if (that.selectionMode == 'range') {
                    if (hasAttr) {
                        var val = that.host.attr('value');
                        var val1 = val.substring(0, val.indexOf('-'));
                        var val2 = val.substring(val.indexOf('-') + 1);
                        var from = new Date(val1);
                        var to = new Date(val2);
                        if (from != undefined && !isNaN(from)) {
                            if (to != undefined && !isNaN(to)) {
                                that.setRange(from, to);
                            }
                        }
                    }
                    else {
                        if (that.getDate() != null) {
                            that.setRange(that.getDate(), that.getDate());
                        }
                    }
                }

                that._getMask();

                if (that.editMode === 'full' && that.value === null && that._mask[0] !== undefined) {
                    that.dateTimeInput[0].value = that._mask[0];
                }
            },

            _validateTimeRange: function () {
                if (this.timeRange) {
                    var hours = this.value.dateTime.getHours()
                    var minute = this.value.dateTime.getMinutes();
                    if (hours <= this.timeRange.minHour) {
                        this.value._setHours(this.timeRange.minHour);
                        if (minute < this.timeRange.minMinute) {
                            this.value._setMinutes(this.timeRange.minMinute);
                            this._updateEditorsValue();
                        }
                        else {
                            this._updateEditorsValue();
                        }
                    }
                    if (hours >= this.timeRange.maxHour) {
                        this.value._setHours(this.timeRange.maxHour);
                        if (minute > this.timeRange.maxMinute) {
                            this.value._setMinutes(this.timeRange.maxMinute);
                            this._updateEditorsValue();
                        }
                        else {
                            this._updateEditorsValue();
                        }
                    }
                }
            },

            _initTimeRange: function () {
                if (this.timeRange) {
                    if (this.timeRange.min) {
                        var meridian = null;
                        if (this.timeRange.min.indexOf("AM") >= 0 || this.timeRange.min.indexOf("PM") >= 0) {
                            meridian = this.timeRange.min.indexOf("AM") >= 0 ? "AM" : "PM";
                        }

                        var minParts = this.timeRange.min.split(":");
                        var hour = parseInt(minParts[0]);
                        var minute = parseInt(minParts[1]);

                        if (meridian) {
                            this.timeRange.minDefaultHour = hour;
                            this.timeRange.minMeridian = meridian;
                        }

                        if (meridian && meridian == "PM") {
                            hour += 12;
                        }

                        this.timeRange.minHour = hour;
                        this.timeRange.minMinute = minute;
                    }
                    if (this.timeRange.max) {
                        var meridian = null;
                        if (this.timeRange.max.indexOf("AM") >= 0 || this.timeRange.max.indexOf("PM") >= 0) {
                            meridian = this.timeRange.max.indexOf("AM") >= 0 ? "AM" : "PM";
                        }

                        var maxParts = this.timeRange.max.split(":");
                        var hour = parseInt(maxParts[0]);
                        var minute = parseInt(maxParts[1]);
                        if (meridian) {
                            this.timeRange.maxDefaultHour = hour;
                            this.timeRange.maxMeridian = meridian;
                        }
                        if (meridian && meridian == "PM") {
                            hour += 12;
                        }

                        this.timeRange.maxHour = hour;
                        this.timeRange.maxMinute = minute;
                    }
                }
            },

            _format: function (date, format, culture) {
                var globalize = false;
                try {
                    if (window.Globalize != undefined) {
                        globalize = true;
                    }
                    if (document.Globalize) {
                        window.Globalize = document.Globalize;
                        globalize = true;
                    }
                }
                catch (error) {
                    if (document.Globalize) {
                        window.Globalize = document.Globalize;
                        globalize = true;
                    }
                }

                if (document.Globalize) {
                    window.Globalize = document.Globalize;
                    globalize = true;
                }

                if ($.global) {
                    return $.global.format(date, format, this.culture);
                }
                else if (globalize) {
                    try {
                        var format = window.Globalize.format(date, format, this.culture);
                        return format;
                    }
                    catch (error) {
                        return window.Globalize.format(date, format);
                    }
                }
                else if ($.jqx.dataFormat) {
                    if (date instanceof Date) {
                        return $.jqx.dataFormat.formatdate(date, format, this.localization.calendar);
                    }
                    else if (typeof date === "number") {
                        return $.jqx.dataFormat.formatnumber(date, format, this.localization.calendar);
                    }
                    else {
                        return $.jqx.dataFormat.formatdate(date, format, this.localization.calendar);
                    }
                }
                else throw new Error("jqxDateTimeInput: Missing reference to globalize.js.");
            },

            render: function () {
                var that = this;
                that._removeHandlers();
                that.element.innerHTML = "";
                that.host
                    .attr({
                        role: "spinbutton"
                    });
                that.id = $.jqx.utilities.createId();
                var id = $.jqx.utilities.createId();
                var buttonid = $.jqx.utilities.createId();

                that._setSize();
                if (that.width == null) {
                    that.width = that.host.width();
                    that.host.width(that.width);
                }

                that.touch = $.jqx.mobile.isTouchDevice();

                var wrapper = $("<div class='jqx-max-size jqx-position-relative'></div>").appendTo(that.host);
                that.dateTimeInput = $("<input role='textbox' style='border: none; padding-left: 3px; padding-right: 3px;' class='jqx-position-absolute' id='" + "input" + that.element.id + "' autocomplete='off' type='textarea'/>").appendTo(wrapper);
                that.dateTimeInput.addClass(that.toThemeProperty("jqx-reset"));
                that.dateTimeInput.addClass(that.toThemeProperty("jqx-clear"));
                that.dateTimeInput.addClass(that.toThemeProperty("jqx-input-content"));
                that.dateTimeInput.addClass(that.toThemeProperty("jqx-widget-content"));
                that.dateTimeInput.addClass(that.toThemeProperty("jqx-rc-all"));
                if (that.touch) {
                    that.dateTimeInput.attr('readonly', true);
                    that.readonly = true;
                }
                if (!that.isMaterialized()) {
                    that.dateTimeInput.attr('placeHolder', that.placeHolder);
                }
                if (that.renderMode != "full") {
                    that.dateTimeInput.remove();
                }
                var name = that.host.attr('name');
                if (name) {
                    that.dateTimeInput.attr('name', name);
                }
                if (that.host.attr('tabindex')) {
                    that.dateTimeInput.attr('tabindex', that.host.attr('tabindex'));
                    that.host.removeAttr('tabindex');
                }
                if (that.rtl) {
                    that.dateTimeInput.css('direction', 'rtl');
                    that.dateTimeInput.addClass('jqx-rtl');
                }

                that.calendarButton = $("<div style='height: 100%;' class='jqx-position-absolute'><div></div></div>").appendTo(wrapper);
                if (!that.rtl) {
                    that.calendarButton.addClass(that.toThemeProperty('jqx-action-button'));
                }
                else {
                    that.calendarButton.addClass(that.toThemeProperty('jqx-action-button-rtl'));
                }

                that.calendarButtonIcon = $(that.calendarButton.children()[0]);
                that.calendarButtonIcon.addClass(that.toThemeProperty('jqx-icon'));
                that.calendarButtonIcon.addClass(that.toThemeProperty('jqx-icon-calendar'));
                that.calendarButton.addClass(that.toThemeProperty('jqx-fill-state-normal'));
                if (!that.rtl) {
                    if (!that.showTimeButton) {
                        that.calendarButton.addClass(that.toThemeProperty('jqx-rc-r'));
                    }
                }
                else {
                    that.calendarButton.addClass(that.toThemeProperty('jqx-rc-l'));
                }

                //
                that.timeButton = $("<div style='height: 100%;' class='jqx-position-absolute'><div></div></div>").appendTo(wrapper);
                if (!that.rtl) {
                    that.timeButton.addClass(that.toThemeProperty('jqx-action-button'));
                }
                else {
                    that.timeButton.addClass(that.toThemeProperty('jqx-action-button-rtl'));
                }



                that.timeButtonIcon = $(that.timeButton.children()[0]);
                that.timeButtonIcon.addClass(that.toThemeProperty('jqx-icon'));
                that.timeButtonIcon.addClass(that.toThemeProperty('jqx-icon-time'));
                that.timeButton.addClass(that.toThemeProperty('jqx-fill-state-normal'));
                if (!that.rtl) {
                    that.timeButton.addClass(that.toThemeProperty('jqx-rc-r'));
                }
                else {
                    that.timeButton.addClass(that.toThemeProperty('jqx-rc-l'));
                }

                // delete button
                that.deleteButton = $("<div style='margin-left: 2px; right: 0px; height: 100%;' class='jqx-datetimeinput-delete-button jqx-position-absolute'><div></div></div>").appendTo(wrapper);
                if (!that.rtl) {
                    that.deleteButton.addClass(that.toThemeProperty('jqx-action-button'));
                }
                else {
                    that.deleteButton.addClass(that.toThemeProperty('jqx-action-button-rtl'));
                }


                that.deleteButton[0].onclick = function () {
                    that.setDate(null);
                }

                that.deleteButtonIcon = $(that.deleteButton.children()[0]);
                that.deleteButtonIcon.addClass(that.toThemeProperty('jqx-icon'));
                that.deleteButtonIcon.addClass(that.toThemeProperty('jqx-icon-close'));
                that.deleteButton.addClass(that.toThemeProperty('jqx-fill-state-normal'));
                if (!that.rtl) {
                    that.deleteButton.addClass(that.toThemeProperty('jqx-rc-r'));
                }
                else {
                    that.deleteButton.addClass(that.toThemeProperty('jqx-rc-l'));
                }
                // end of delete button

                var me = this;
                that._arrange();

                if ($.jqx._jqxCalendar != null && $.jqx._jqxCalendar != undefined) {
                    try {
                        var calendarID = 'calendar' + that.id;
                        var oldContainer = $($.find('#' + calendarID));
                        if (oldContainer.length > 0) {
                            oldContainer.remove();
                        }

                        $.jqx.aria(this, "aria-roledescription", "Date Picker");
                        $.jqx.aria(this, "aria-owns", calendarID);
                        $.jqx.aria(this, "aria-haspopup", true);
                        $.jqx.aria(this, "aria-readonly", that.selectionMode == 'range' ? true : false);

                        var container = $("<div class='jqx-calendar-container' style='overflow: hidden; background: transparent; position: absolute;' id='calendar" + that.id + "'><div id='innerCalendar" + that.id + "'></div><div id='innerTime" + that.id + "'></div></div>");
                        if ($.jqx.utilities.getBrowser().browser == 'opera') {
                            container.hide();
                        }

                        container.addClass(that.toThemeProperty('jqx-calendar-container'));

                        if (that.dropDownContainer == "element") {
                            container.appendTo(that.host);
                        }
                        else {
                            container.appendTo(document.body);
                        }
                        that.container = container;
                        that.calendarContainer = $($.find('#innerCalendar' + that.id)).jqxCalendar({ titleFormat: this.titleFormat, restrictedDates: this.restrictedDates, changing: that.changing, change: that.change, enableViews: that.enableViews, selectableDays: that.selectableDays, views: that.views, rowHeaderWidth: that.rowHeaderWidth, titleHeight: that.titleHeight, columnHeaderHeight: that.columnHeaderHeight, _checkForHiddenParent: false, enableAutoNavigation: false, canRender: false, localization: that.localization, todayString: that.todayString, clearString: that.clearString, dayNameFormat: that.dayNameFormat, rtl: that.rtl, culture: that.culture, showFooter: that.showFooter, selectionMode: that.selectionMode, firstDayOfWeek: that.firstDayOfWeek, showWeekNumbers: that.showWeekNumbers, width: that.dropDownWidth, height: that.dropDownHeight, theme: that.theme });
                        if (that.dropDownContainer == "element") {
                            that.calendarContainer.css({ position: 'absolute', top: 0, left: 0 });
                        }
                        else {
                            that.calendarContainer.css({ position: 'absolute', zIndex: that.popupZIndex, top: 0, left: 0 });
                        }
                        that.calendarContainer.addClass(that.toThemeProperty('jqx-popup'));
                        if ($.jqx.browser.msie) {
                            that.calendarContainer.addClass(that.toThemeProperty('jqx-noshadow'));
                        }

                        that.timeContainer = $($.find('#innerTime' + that.id));
                        that.timeContainer.css({ position: 'absolute', zIndex: that.popupZIndex, top: 0, left: 0 });
                        that.timeContainer.addClass(that.toThemeProperty('jqx-popup'));
                        if ($.jqx.browser.msie) {
                            that.timeContainer.addClass(that.toThemeProperty('jqx-noshadow'));
                        }

                        that._calendar = $.data(that.calendarContainer[0], "jqxCalendar").instance;
                        var me = this;

                        that._calendar.today = function () {
                            me.today();
                        }
                        that._calendar.clear = function () {
                            me.clear();
                        }

                        if ($.jqx.utilities.getBrowser().browser == 'opera') {
                            container.show();
                        }
                        container.height(parseInt(that.calendarContainer.height()) + 25);
                        container.width(parseInt(that.calendarContainer.width()) + 25);

                        if (that.selectionMode == 'range') {
                            that.readonly = true;
                        }

                        if (that.animationType == 'none') {
                            that.container.css('display', 'none');
                        }
                        else {
                            that.container.hide();
                        }

                    }
                    catch (e) {

                    }
                }

                if ($.global) {
                    $.global.preferCulture(that.culture);
                }

                that.selectedText = "";

                that._addHandlers();
                that.self = this;
                that.oldValue = that.getDate();
                that.items = new Array();
                that.editors = new Array();

                that._loadItems();
                that.editorText = "";

                if (that.readonly == true) {
                    that.dateTimeInput.css("readonly", that.readonly);
                }

                that.dateTimeInput.css("text-align", that.textAlign);
                that.host.addClass(that.toThemeProperty('jqx-widget'));
                that.host.addClass(that.toThemeProperty('jqx-datetimeinput'));
                that.host.addClass(that.toThemeProperty('jqx-input'));
                that.host.addClass(that.toThemeProperty('jqx-overflow-hidden'));
                that.host.addClass(that.toThemeProperty('jqx-rc-all'));
                that.host.addClass(that.toThemeProperty("jqx-reset"));
                that.host.addClass(that.toThemeProperty("jqx-clear"));
                that.host.addClass(that.toThemeProperty("jqx-widget-content"));

                that.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
                    if (value) {
                        instance.host.addClass(me.toThemeProperty('jqx-input-disabled'));
                        instance.host.addClass(me.toThemeProperty('jqx-fill-state-disabled'));
                    }
                    else {
                        instance.host.removeClass(me.toThemeProperty('jqx-fill-state-disabled'));
                        instance.host.removeClass(me.toThemeProperty('jqx-input-disabled'));
                    }
                    $.jqx.aria(instance, "aria-disabled", value);
                }

                if (that.disabled) {
                    that.host.addClass(that.toThemeProperty('jqx-input-disabled'));
                    that.host.addClass(that.toThemeProperty('jqx-fill-state-disabled'));
                    that.dateTimeInput.attr("disabled", true);
                }

                if (that.host.parents('form').length > 0) {
                    that.addHandler(that.host.parents('form'), 'reset', function () {
                        setTimeout(function () {
                            me.setDate(new Date());
                        }, 10);
                    });
                }

                if (that.cookies) {
                    var date = $.jqx.cookie.cookie("jqxDateTimeInput" + that.element.id);
                    if (date != null) {
                        that.setDate(new Date(date));
                    }
                }

                // fix for IE7
                if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
                    if (that.host.parents('.jqx-window').length > 0) {
                        var zIndex = that.host.parents('.jqx-window').css('z-index');
                        that.container.css('z-index', zIndex + 10);
                        that.calendarContainer.css('z-index', zIndex + 10);
                    }
                }

                if (that.culture != 'default') {
                    that._applyCulture();
                }

                if (that.value) {
                    if (that.calendarContainer.jqxCalendar('_isDisabled', that.value.dateTime)) {
                        that.dateTimeInput.addClass(that.toThemeProperty("jqx-input-invalid"));
                    }
                    else {
                        that.dateTimeInput.removeClass(that.toThemeProperty("jqx-input-invalid"));
                    }
                }

                this._addBarAndLabel(this.dateTimeInput);
                this._updateHint(true);

                if (that.template) {
                    that.bar.addClass(that.toThemeProperty("jqx-" + that.template))
                    that.label.addClass(that.toThemeProperty("jqx-" + that.template))
                    that.timeButton.addClass(that.toThemeProperty("jqx-" + that.template))
                    that.calendarButton.addClass(that.toThemeProperty("jqx-" + that.template))
                }

                this._setSize();
                this._arrange();
            },

            val: function (value) {
                var that = this;
                if (arguments.length != 0) {
                    if (value == null)
                        that.setDate(null);

                    if (that.selectionMode == 'range') {
                        that.setRange(arguments[0], arguments[1]);
                        return that.getText();
                    }

                    if (value instanceof Date) {
                        that.setDate(value);
                    }

                    if (typeof (value) == "string") {
                        if (value == 'date') {
                            return that.getDate();
                        }

                        that.setDate(value);
                    }
                    if (that._calendar.getDate() != that.getDate()) {
                        that._calendar.setDate(that.getDate());
                    }
                }
                return that.getText();
            },

            _setSize: function () {
                var computedStyle = window.getComputedStyle(this.element);
                var borderSize = parseInt(computedStyle.borderLeftWidth) * 2;
                var boxSizing = computedStyle.boxSizing;

                if (this.element.offsetWidth === 0) {
                    borderSize = 2;
                }

                if (boxSizing === 'border-box' || isNaN(borderSize)) {
                    borderSize = 0;
                }

                if (this.width != null && this.width.toString().indexOf("px") != -1) {
                    this.element.style.width = parseInt(this.width) - borderSize + 'px';
                }
                else if (this.width != undefined && !isNaN(this.width)) {
                    this.element.style.width = parseInt(this.width) - borderSize + 'px';
                }

                if (this.height != null && this.height.toString().indexOf("px") != -1) {
                    this.element.style.height = parseInt(this.height) - borderSize + 'px';
                }
                else if (this.height != undefined && !isNaN(this.height)) {
                    this.element.style.height = parseInt(this.height) - borderSize + 'px';
                };

                var isPercentage = false;
                if (this.width != null && this.width.toString().indexOf("%") != -1) {
                    isPercentage = true;
                    this.host.width(this.width);

                    if (borderSize > 0) {
                        this.host.css('box-sizing', 'border-box');
                    }
                }

                if (this.height != null && this.height.toString().indexOf("%") != -1) {
                    isPercentage = true;
                    this.host.height(this.height);
                }

                var me = this;
                var resizeFunc = function () {
                    if (me.calendarContainer) {
                        me._arrange();
                    }
                }

                if (isPercentage) {
                    if (this.calendarContainer) {
                        this._arrange();
                        var width = this.host.width();
                        if (this.dropDownWidth != 'auto') {
                            width = this.dropDownWidth;
                        }
                        this.calendarContainer.jqxCalendar({ width: width });
                        this.container.width(parseInt(width) + 25);
                    }
                }
                $.jqx.utilities.resize(this.host, function () {
                    resizeFunc();
                });
            },

            _arrange: function () {
                if (this.height == null) {
                    this.height = 27;
                    this.host.height(27);
                }
                var width = parseInt(this.host.width());
                var height = parseInt(this.host.height());

                var computedStyle = window.getComputedStyle(this.element);
                var borderSize = parseInt(computedStyle.borderLeftWidth) * 2;
                var boxSizing = computedStyle.boxSizing;


                if (boxSizing === 'border-box' || isNaN(borderSize)) {
                    borderSize = 0;
                }

                //     width -= borderSize;
                //    height -= borderSize;
                var buttonWidth = this.buttonSize;
                var rightOffset = 2;
                if (!this.showCalendarButton && !this.showTimeButton) {
                    buttonWidth = 0;
                    var buttonHeight = 0;
                    this.calendarButton.hide();
                    rightOffset = 0;
                }
                if (!this.showCalendarButton) {
                    this.calendarButton.hide();
                }
                else {
                    this.calendarButton.show();
                }
                if (!this.showTimeButton) {
                    this.timeButton.hide();
                }
                else {
                    this.timeButton.show();
                }

                if (!this.showDeleteButton) {
                    this.deleteButton.hide();
                }
                else {
                    this.deleteButton.show();
                }


                var contentWidth = width - buttonWidth - 1 * rightOffset;
                if (this.showTimeButton && this.showCalendarButton) {
                    var contentWidth = width - 2 * buttonWidth - 1 * rightOffset;
                }
                else if (this.showTimeButton || this.showCalendarButton) {
                    var contentWidth = width - buttonWidth - 1 * rightOffset;
                }

                if (this.showDeleteButton) {
                    contentWidth -= buttonWidth - rightOffset;
                }

                if (contentWidth > 0) {
                    this.dateTimeInput[0].style.width = contentWidth + 'px';
                }
                if (this.rtl) {
                    this.dateTimeInput[0].style.width = (-1 + contentWidth + 'px');
                }

                this.dateTimeInput[0].style.left = '0px';
                this.dateTimeInput[0].style.top = '0px';
                this.calendarButton[0].style.width = buttonWidth + 1 + 'px';
                this.calendarButton[0].style.left = 1 + contentWidth + 'px';
                this.timeButton[0].style.width = buttonWidth + 1 + 'px';
                if (this.showCalendarButton) {
                    this.timeButton[0].style.left = 1 + this.calendarButton.width() + contentWidth + 'px';
                }
                else {
                    this.timeButton[0].style.left = 1 + contentWidth + 'px';
                }

                if (this.renderMode != "full") {
                    this.calendarButton[0].style.width = '100%';
                    this.calendarButton[0].style.left = '0px';
                    this.calendarButton.css('border', 'none');
                    this.timeButton[0].style.width = '100%';
                    this.timeButton[0].style.left = '0px';
                    this.timeButton.css('border', 'none');
                }
                var inputHeight = this.dateTimeInput.height();
                if (inputHeight == 0 && this.renderMode != "full") {
                    inputHeight = parseInt(this.dateTimeInput.css('font-size')) + 3;
                    this.calendarButton.addClass(this.toThemeProperty('jqx-rc-all'));
                    this.timeButton.addClass(this.toThemeProperty('jqx-rc-all'));
                }
                else inputHeight = 17;

                if (this.dateTimeInput[0].className.indexOf('jqx-rc-all') == -1) {
                    this.dateTimeInput.addClass(this.toThemeProperty('jqx-rc-all'));
                }

                var top = parseInt(height) / 2 - parseInt(inputHeight) / 2;
                if (top > 0) {
                    var fontSize = this.dateTimeInput.css("font-size");
                    if ("" == fontSize) fontSize = 13;

                    var top = height - 2 - parseInt(fontSize) - 2;
                    if (isNaN(top)) top = 0;
                    if (top < 0) top = 0;

                    var topPadding = top / 2;

                    // fix for MSIE 6 and 7. These browsers double the top padding for some reason...
                    if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
                        topPadding = top / 4;
                    }
                    this.dateTimeInput[0].style.paddingTop = Math.round(topPadding) + "px";
                    this.dateTimeInput[0].style.paddingBottom = Math.round(topPadding) + "px";
                }

                if (this.rtl) {
                    this.calendarButton[0].style.width = buttonWidth + 'px';
                    this.timeButton[0].style.width = buttonWidth + 'px';
                    this.calendarButton.css('left', '0px');
                    if (this.showCalendarButton) {
                        this.timeButton.css('left', buttonWidth + 'px');
                    }
                    else {
                        this.timeButton.css('left', '0px');
                    }


                    this.dateTimeInput.css('left', this.calendarButton.width());
                    if (this.showTimeButton && this.showCalendarButton) {
                        this.dateTimeInput.css('left', this.timeButton.width() + this.calendarButton.width());
                    }
                    if ($.jqx.browser.msie && $.jqx.browser.version <= 8) {
                        this.dateTimeInput.css('left', 1 + this.calendarButton.width());
                        if (this.showTimeButton && this.showCalendarButton) {
                            this.dateTimeInput.css('left', 1 + this.timeButton.width() + this.calendarButton.width());
                        }
                    }
                }
            },

            _removeHandlers: function () {
                var me = this;
                this.removeHandler($(document), 'mousedown.' + this.id);
                if (this.dateTimeInput) {
                    this.removeHandler(this.dateTimeInput, 'keydown.' + this.id);
                    this.removeHandler(this.dateTimeInput, 'blur');
                    this.removeHandler(this.dateTimeInput, 'focus');
                    this.removeHandler(this.host, 'focus');
                    this.removeHandler(this.dateTimeInput, 'mousedown');
                    this.removeHandler(this.dateTimeInput, 'mouseup');
                    this.removeHandler(this.dateTimeInput, 'keydown');
                    this.removeHandler(this.dateTimeInput, 'keyup');
                    this.removeHandler(this.dateTimeInput, 'keypress');
                }
                if (this.calendarButton != null) {
                    this.removeHandler(this.calendarButton, 'mousedown');
                }
                if (this.timeButton != null) {
                    this.removeHandler(this.timeButton, 'mousedown');
                }
                if (this.calendarContainer != null) {
                    this.removeHandler(this.calendarContainer, 'cellSelected');
                    this.removeHandler(this.calendarContainer, 'cellMouseDown');
                }
                this.removeHandler($(window), 'resize.' + this.id);
            },

            isOpened: function () {
                var me = this;
                var openedCalendar = $.data(document.body, "openedJQXCalendar" + this.id);
                if (openedCalendar != null && openedCalendar == me.calendarContainer) {
                    return true;
                }

                return false;
            },

            wheel: function (event, self) {
                if (!self.isEditing) {
                    return;
                }

                self.changeType = "mouse";
                var delta = 0;
                if (!event) /* For IE. */
                    event = window.event;
                if (event.originalEvent && event.originalEvent.wheelDelta) {
                    event.wheelDelta = event.originalEvent.wheelDelta;
                }
                if (event.wheelDelta) { /* IE/Opera. */
                    delta = event.wheelDelta / 120;
                } else if (event.detail) { /** Mozilla case. */
                    delta = -event.detail / 3;
                }

                if (delta) {
                    var result = self._handleDelta(delta);
                    if (!result) {
                        if (event.preventDefault)
                            event.preventDefault();
                        event.returnValue = false;
                        return result;
                    }
                    else return false;
                }

                if (event.preventDefault)
                    event.preventDefault();
                event.returnValue = false;
            },

            _handleDelta: function (delta) {
                if (delta < 0) {
                    this.spinDown();
                }
                else this.spinUp();

                return false;
            },

            focus: function () {
                try {
                    var me = this;
                    me._firstFocusDate = me.getDate();
                    this._setSelectionStart(0);
                    this._selectGroup(-1);
                    this.dateTimeInput.focus();
                    setTimeout(function () {
                        me._setSelectionStart(0);
                        me._selectGroup(-1);
                        me.dateTimeInput.focus();
                    }, 25);
                }
                catch (error) {
                }
            },

            _addHandlers: function () {
                var id = this.element.id;
                var el = this.element;
                var me = this;

                if (this.host.parents()) {
                    this.addHandler(this.host.parents(), 'scroll.datetimeinput' + this.element.id, function (event) {
                        var opened = me.isOpened();
                        if (opened) {
                            me.close();
                        }
                    });
                }

                this.addHandler(this.host, 'mouseenter', function () {
                    if (!me.disabled && me.enableHover) {
                        var hovered = true;
                        me.calendarButtonIcon.addClass(me.toThemeProperty('jqx-icon-calendar-hover'));
                        me.calendarButton.addClass(me.toThemeProperty('jqx-fill-state-hover'));
                        if (me.showTimeButton) {
                            me.timeButtonIcon.addClass(me.toThemeProperty('jqx-icon-time-hover'));
                            me.timeButton.addClass(me.toThemeProperty('jqx-fill-state-hover'));
                        }
                    }
                });
                this.addHandler(this.host, 'mouseleave', function () {
                    if (!me.disabled && me.enableHover) {
                        me.calendarButtonIcon.removeClass(me.toThemeProperty('jqx-icon-calendar-hover'));
                        me.calendarButton.removeClass(me.toThemeProperty('jqx-fill-state-hover'));
                        if (me.showTimeButton) {
                            me.timeButtonIcon.removeClass(me.toThemeProperty('jqx-icon-time-hover'));
                            me.timeButton.removeClass(me.toThemeProperty('jqx-fill-state-hover'));
                        }
                    }
                });

                this.addHandler(this.host, 'mousewheel', function (event) {
                    me.wheel(event, me);
                });

                this.addHandler($(document), 'mousedown.' + this.id, this._closeOpenedCalendar, { me: this });
                if ($.jqx.mobile.isTouchDevice()) {
                    this.addHandler($(document), $.jqx.mobile.getTouchEventName('touchstart') + '.' + this.id, this._closeOpenedCalendar, { me: this });
                }

                this.addHandler(this.dateTimeInput, 'keydown.' + this.id, function (event) {
                    var openedCalendar = $.data(document.body, "openedJQXCalendar" + me.id);
                    if (openedCalendar != null && openedCalendar == me.calendarContainer) {
                        var result = me.handleCalendarKey(event, me);
                        return result;
                    }
                });

                if (this.calendarContainer != null) {
                    this.addHandler(this.calendarContainer, 'keydown', function (event) {
                        if (event.keyCode == 13) {
                            if (me.isOpened()) {
                                if (!me._calendar._viewAnimating && me._calendar.view == "month") {
                                    me.hideCalendar('selected', 'keyboard');
                                    me.dateTimeInput.focus();
                                    return false;
                                }
                            }
                            return true;
                        }
                        else if (event.keyCode == 9) {
                            if (me.isOpened()) {
                                me.hideCalendar('selected', 'keyboard');
                                return true;
                            }
                        }
                        else if (event.keyCode == 27) {
                            if (me.isOpened()) {
                                me.hideCalendar(null, 'keyboard');
                                me.dateTimeInput.focus();
                                return false;
                            }
                            return true;
                        }

                        me.timePopup = false;
                        if (event.keyCode == 84) {
                            me.timePopup = true;
                        }

                        if (event.keyCode == 115) {
                            if (me.isOpened()) {
                                me.hideCalendar("keyboard", 'keyboard');
                                me.dateTimeInput.focus();
                                return false;
                            }
                            else if (!me.isOpened()) {
                                me.showCalendar("keyboard", 'keyboard');
                                me.dateTimeInput.focus();
                                return false;
                            }
                        }

                        if (event.altKey) {
                            if (event.keyCode == 38) {
                                if (me.isOpened()) {
                                    me.hideCalendar("keyboard", 'keyboard');
                                    me.dateTimeInput.focus();
                                    return false;
                                }
                            }
                            else if (event.keyCode == 40) {
                                if (!me.isOpened()) {
                                    me.showCalendar("keyboard", 'keyboard');
                                    me.dateTimeInput.focus();
                                    return false;
                                }
                            }
                        }
                    });

                    this.addHandler(this.calendarContainer, 'cellSelected',
                        function (event) {
                            if (me.closeCalendarAfterSelection) {
                                var calendarOldValue = $.data(document.body, "openedJQXCalendarValue");
                                if (event.args.selectionType == 'mouse') {
                                    if (me.selectionMode != 'range') {
                                        me.hideCalendar('selected', 'mouse');
                                    }
                                    else {
                                        if (me._calendar._clicks == 0) {
                                            me.hideCalendar('selected', 'mouse');
                                        }
                                    }
                                }
                            }
                        });

                    this.addHandler(this.calendarContainer, 'cellMouseDown',
                        function (event) {
                            if (me.closeCalendarAfterSelection) {
                                if (me._calendar.value) {
                                    $.data(document.body, "openedJQXCalendarValue", new $.jqx._jqxDateTimeInput.getDateTime(me._calendar.value.dateTime));
                                }
                            }
                        });
                }

                this.addHandler(this.dateTimeInput, 'blur', function (event) {
                    me.bar.removeClass('focused');
                    me.label.removeClass('focused');

                    me._endFullEdit();

                    if (me.value != null) {
                        me.isEditing = false;
                        var oldDay = me.value.dateTime.getDay();
                        var oldValue = me._oldDT;
                        me._validateValue(true);
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        }
                        //if (me.selectableDays.length != 7) {
                        //    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        //    var d = me.value.dateTime.getDay();
                        //    var name = dayNames[d];
                        //    if (me.selectableDays.length > 0) {
                        //        if (me.selectableDays.indexOf(name) == -1) {
                        //            if (me.value.dateTime < oldValue) {
                        //                while (me.selectableDays.indexOf(name) == -1) {
                        //                    me.value._addDays(-1);
                        //                    var d = me.value.dateTime.getDay();
                        //                    name = dayNames[d];
                        //                }
                        //            }
                        //            else {
                        //                while (me.selectableDays.indexOf(name) == -1) {
                        //                    me.value._addDays(1);
                        //                    var d = me.value.dateTime.getDay();
                        //                    name = dayNames[d];
                        //                }
                        //            }
                        //            me.value.day = me.value.dateTime.getDate();
                        //            me.value.month = me.value.dateTime.getMonth() + 1;
                        //            me._updateEditorsValue();
                        //        }
                        //    }
                        //}
                        me._updateText();
                        me._raiseEvent(9, event);
                    }
                    if (!me.isOpened()) {
                        me.host.removeClass(me.toThemeProperty('jqx-fill-state-focus'));
                    }
                });

                this.addHandler(this.host, 'focus', function (event) {
                    me.focus();
                });

                this.addHandler(this.dateTimeInput, 'focus', function (event) {
                    me._firstFocusDate = me.getDate();
                    if (me.value != null) {
                        if (me.selectionMode != 'range') {
                            me._oldDT = new Date(me.value.dateTime);
                        }
                        else me._oldDT = me.getRange();
                        setTimeout(function () {
                            var selection = me._selection();
                            me.isEditing = true;
                            me._validateValue();
                            me._updateText();
                            me._setSelectionStart(0);
                            me._selectGroup(-1, selection);
                            me.host.addClass(me.toThemeProperty('jqx-fill-state-focus'));
                        });
                    }
                    else {
                        me._setSelectionStart(0);
                        me._selectGroup(-1);
                        me.host.addClass(me.toThemeProperty('jqx-fill-state-focus'));
                    }

                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }

                    me.bar.addClass('focused');
                    me.label.addClass('focused');

                    if (event.preventDefault) {
                        event.preventDefault();
                        return false;
                    }
                });

                var eventName = 'mousedown';
                if (this.touch) {
                    eventName = $.jqx.mobile.getTouchEventName('touchstart');
                }

                this.addHandler(this.calendarButton, eventName,
                    function (event) {
                        var calendar = me.container;
                        var isOpen = calendar.css('display') == 'block';
                        me.timePopup = false;
                        me.calendarPopup = true;
                        if (!me.disabled) {
                            if (!me.isanimating) {
                                if (isOpen) {
                                    me.hideCalendar();
                                    return false;
                                }
                                else {
                                    me.showCalendar("mouse");
                                    event.preventDefault();
                                }
                            }
                        }
                    });

                this.addHandler(this.timeButton, eventName,
                    function (event) {
                        var calendar = me.container;
                        var isOpen = calendar.css('display') == 'block';
                        me.timePopup = true;
                        me.calendarPopup = false;

                        if (!me.disabled) {
                            if (!me.isanimating) {
                                if (isOpen) {
                                    me.hideCalendar("mouse", 'mouse');
                                    return false;
                                }
                                else {
                                    me.showCalendar("mouse");
                                    event.preventDefault();
                                }
                            }
                        }
                    });

                this.addHandler(this.dateTimeInput, 'mousedown',
                    function (event) {
                        if (me.touch) {
                            if (me.showTimeButton === true && me.showCalendarButton === false) {
                                me.open('time');
                            }
                            else {
                                me.open();
                            }
                        }
                        return me._raiseEvent(2, event)
                    });

                this.addHandler(this.dateTimeInput, 'mouseup',
                    function (event) {
                        return me._raiseEvent(3, event)
                    });

                this.addHandler(this.dateTimeInput, 'keydown',
                    function (event) {
                        return me._raiseEvent(4, event)
                    });

                this.addHandler(this.dateTimeInput, 'keyup',
                    function (event) {
                        var value = this.value;

                        if (me._fullEditInProgress && me._enteredValue &&
                            me._mask[value.length] !== undefined) {
                            this.value = this.value + me._mask[value.length];
                        }

                        return me._raiseEvent(5, event)
                    });

                this.addHandler(this.dateTimeInput, 'keypress',
                    function (event) {
                        return me._raiseEvent(6, event)
                    });
            },

            createID: function () {
                var id = Math.random() + '';
                id = id.replace('.', '');
                id = '99' + id;
                id = id / 1;
                return 'dateTimeInput' + id;
            },

            setMaxDate: function (date, refresh) {
                if (date == null)
                    return;

                if (date != null && typeof (date) == "string") {
                    date = new Date(date);
                    if (!this._isValidDate(date))
                        return;
                }

                this.maxDate = $.jqx._jqxDateTimeInput.getDateTime(date);
                if (this._calendar != null) {
                    this._calendar.setMaxDate(date);
                }
                if (refresh != false) {
                    if (this.getDate() != null && this.getDate() > date) {
                        this.setDate(date);
                    }
                    //  $.jqx.aria(this, "aria-valuemax", date);
                    this._refreshValue();
                    this._updateText();
                }
            },

            getMaxDate: function () {
                if (this.maxDate != null && this.maxDate != undefined) {
                    return this.maxDate.dateTime;
                }

                return null;
            },

            setMinDate: function (date, refresh) {
                if (date == null)
                    return;

                if (date != null && typeof (date) == "string") {
                    date = new Date(date);
                    if (!this._isValidDate(date))
                        return;
                }

                this.minDate = $.jqx._jqxDateTimeInput.getDateTime(date);
                if (this._calendar != null) {
                    this._calendar.setMinDate(date);
                }
                if (refresh != false) {
                    if (this.getDate() != null && this.getDate() < date) {
                        this.setDate(date);
                    }
                    // $.jqx.aria(this, "aria-valuemin", date);
                    this._refreshValue();
                    this._updateText();
                }
            },

            getMinDate: function () {
                if (this.minDate != null && this.minDate != undefined) {
                    return this.minDate.dateTime;
                }

                return null;
            },

            _applyCulture: function () {
                var globalize = false;
                try {
                    if (window.Globalize != undefined) {
                        globalize = true;
                    }
                }
                catch (error) {
                }

                try {
                    if ($.global) {
                        $.global.preferCulture(this.culture);
                        this.localization.calendar = $.global.culture.calendar;
                    }
                    else if (globalize) {
                        var culture = Globalize.culture(this.culture);
                        this.localization.calendar = culture.calendar;
                    }
                    this._loadItems();
                    if (this._calendar != null) {
                        this._calendar.culture = this.culture;
                        this._calendar.localization = this.localization;
                        this._calendar.render();
                    }
                }
                catch (error) {
                }
            },

            propertyMap: function (key) {
                if (key == "value") {
                    if (this.selectionMode != 'range') {
                        return this.getDate();
                    }
                    else return this.getRange();
                }
                return null;
            },

            propertiesChangedHandler: function (object, oldValues, newValues) {
                if (newValues && newValues.width && newValues.height && Object.keys(newValues).length == 2) {
                    object.refresh();
                    object.close();
                }
            },

            propertyChangedHandler: function (object, key, oldvalue, value) {
                if (object.isInitialized == undefined || object.isInitialized == false)
                    return;

                if (object.batchUpdate && object.batchUpdate.width && object.batchUpdate.height && Object.keys(object.batchUpdate).length == 2) {
                    return;
                }

                if (key == "dropDownVerticalAlignment") {
                    object.close();
                }

                if (key == "template") {
                    object.bar.removeClass(object.toThemeProperty("jqx-" + oldvalue));
                    object.label.removeClass(object.toThemeProperty("jqx-" + oldvalue));
                    object.timeButton.removeClass(object.toThemeProperty("jqx-" + oldvalue))
                    object.calendarButton.removeClass(object.toThemeProperty("jqx-" + oldvalue))
                    object.bar.addClass(object.toThemeProperty("jqx-" + object.template))
                    object.label.addClass(object.toThemeProperty("jqx-" + object.template))
                    object.timeButton.addClass(object.toThemeProperty("jqx-" + object.template))
                    object.calendarButton.addClass(object.toThemeProperty("jqx-" + object.template))
                }

                if (key == "restrictedDates") {
                    object.calendarContainer.css({ restrictedDates: value });
                }

                if (key == "popupZIndex") {
                    object.calendarContainer.css({ zIndex: value });
                }

                if (key == "showCalendarButton" || key === "showDeleteButton") {
                    object._arrange();
                }

                if (key == "showTimeButton") {
                    object._arrange();
                    if (object.timePopupElement) {
                        object.timePopupElement.remove();
                        object.timePopupElement = null;
                    }
                }

                if (key == "selectionMode") {
                    object._calendar.selectionMode = value;
                    object.refreshValue();
                }

                if (key == "min") {
                    if (typeof (value) == "string") {
                        object.setMinDate(new Date(value));
                    }
                    else {
                        object.setMinDate(value);
                    }
                }
                if (key == "max") {
                    if (typeof (value) == "string") {
                        object.setMaxDate(new Date(value));
                    }
                    else {
                        object.setMaxDate(value);
                    }
                }

                if (key == "value") {
                    if (value != null && value instanceof Date) {
                        if (isNaN(value.getFullYear()) || isNaN(value.getMonth()) || isNaN(value.getDate())) {
                            this.value = oldvalue;
                            return;
                        }

                        value = $.jqx._jqxDateTimeInput.getDateTime(value);
                    }
                    else if (value != null && typeof (value) == "string") {
                        var date = new Date(value);
                        if (date != undefined && !isNaN(date)) {
                            this.value = $.jqx._jqxDateTimeInput.getDateTime(date);
                        }
                    }
                }

                if (key == "views") {
                    object.calendarContainer.jqxCalendar({ views: value });
                }

                if (key == "enableViews") {
                    object.calendarContainer.jqxCalendar({ enableViews: value });
                }

                if (key == "selectableDays") {
                    object.calendarContainer.jqxCalendar({ selectableDays: value });
                }

                if (key == "showFooter") {
                    object.calendarContainer.jqxCalendar({ showFooter: value });
                }

                if (key == 'rtl') {
                    object.calendarContainer.jqxCalendar({ rtl: value });
                    if (value) {
                        object.dateTimeInput.css('direction', 'rtl');
                        object.dateTimeInput.addClass('jqx-rtl');
                    }
                    else {
                        object.dateTimeInput.css('direction', 'ltr');
                        object.dateTimeInput.removeClass('jqx-rtl');
                    }
                }

                if (key == 'todayString' || key == 'clearString') {
                    object.calendarContainer.jqxCalendar({ clearString: object.clearString, todayString: object.todayString });
                }

                if (key == 'dayNameFormat') {
                    object.calendarContainer.jqxCalendar({ dayNameFormat: value });
                }

                if (key == 'firstDayOfWeek') {
                    object.calendarContainer.jqxCalendar({ firstDayOfWeek: value });
                }
                if (key == 'showWeekNumbers') {
                    object.calendarContainer.jqxCalendar({ showWeekNumbers: value });
                }

                if (key == 'culture' || key == 'localization') {
                    object._applyCulture();
                }
                else if (key == 'formatString' || key === 'yearCutoff' && (value === null || oldvalue === null)) {
                    if (key === 'formatString') {
                        object._getMask();
                    }

                    object.items = new Array();
                    object._loadItems();
                }

                if (key == "theme") {
                    $.jqx.utilities.setTheme(oldvalue, value, object.host);
                    object.calendarContainer.jqxCalendar({ theme: value });
                }

                if (key == "width" || key == "height") {
                    object.close();
                    object.refresh();
                    return;
                }

                object._setOption(key, value, oldvalue);
                if (key == 'dropDownWidth' || key == 'dropDownHeight') {
                    object.calendarContainer.jqxCalendar({ width: object.dropDownWidth, height: object.dropDownHeight });
                    object._calendar.render();
                    object.container.height(object.calendarContainer.height());
                    object.container.width(object.calendarContainer.width());
                }
            },

            clear: function () {
                if (this.allowNullDate) {
                    if (this.selectionMode != 'range') {
                        this.setDate(null);
                    }
                    else {
                        this._calendar._clicks = 1
                        this.setRange(null, null);
                    }
                    this._calendar._clicks = 0
                }
                else {
                    if (this.selectionMode != 'range') {
                        this.setDate(this.getMinDate());
                    }
                    else {
                        this._calendar._clicks = 1
                        this.setRange(this.getMinDate(), this.getMinDate());
                        this._calendar._clicks = 0
                    }
                }
                this.hideCalendar();
            },

            today: function () {
                var date = new Date();
                date.setHours(0, 0, 0, 0);
                if (this.selectionMode != 'range') {
                    this.setDate(date);
                }
                else {
                    this._calendar._clicks = 0
                    var toDate = new Date();
                    toDate.setHours(23, 59, 59, 0);
                    this.setRange(date, toDate);
                    this._calendar._clicks = 0
                }

                this.hideCalendar();
            },

            _isValidDate: function (date) {
                if (date == null) {
                    return true;
                }

                if (typeof (date) !== 'object')
                    return false;

                if (date !== null && date.getFullYear) {
                    return true;
                }

                if (date == "Invalid Date" || date.valueOf() < 0 || isNaN(date.valueOf()))
                    return false;

                return true;
            },

            setDate: function (date) {
                var oldDate = this.getDate();
                if (date != null && typeof (date) == "string") {
                    var beforeParse = date;
                    if (date.toString().indexOf(',') >= 0) {
                        date = date.replace(/\,/g, '/');
                        date = new Date(date);
                        if (!this._isValidDate(date)) {
                            date = beforeParse;
                        }
                    }
                    if (date.toString().indexOf('-') >= 0) {
                        date = date.replace(/\-/g, '/');
                        date = new Date(date);

                        if (!this._isValidDate(date)) {
                            date = beforeParse;
                        }

                        if (date.getFullYear && isNaN(date.getFullYear())) {
                            date = beforeParse;
                        }
                    }
                    if (date != '') {
                        var tmpDate = date;
                        if (window.Globalize != undefined) {
                            date = window.Globalize.parseDate(tmpDate, this.formatString, this.culture);
                        }
                        else if ($.jqx.dataFormat) {
                            date = $.jqx.dataFormat.parsedate(tmpDate, this.formatString, this.localization.calendar);
                        }
                        else {
                            date = new Date(date);
                        }

                        if (date === null && tmpDate !== null) {
                            if (this._isValidDate(tmpDate)) {
                                date = tmpDate;
                            }
                        }

                        if (!this._isValidDate(date)) {
                            return;
                        }
                    }
                }

                if (date == null || date == 'null' || date == 'undefined') {
                    if (!this.allowNullDate) {
                        date = this.min;
                    }
                }

                if (!this._isValidDate(date))
                    date = null;

                if (date == null || date == 'null' || date == 'undefined' || date === '') {
                    if (this.value != null) {
                        this.value = null;
                        this._calendar.setDate(null);
                        this._refreshValue();
                        if (this.cookies) {
                            if (this.value != null) {
                                $.jqx.cookie.cookie("jqxDateTimeInput" + this.element.id, this.value.dateTime.toString(), this.cookieoptions);
                            }
                        }
                        this._setSelectionStart(0);
                        this._selectGroup(-1);
                        this._raiseEvent('0', date, oldDate);
                        this._raiseEvent('9', date, oldDate);
                    }
                    return;
                }

                if (date < this.getMinDate() || date > this.getMaxDate()) {
                    return;
                }

                if (this.value == null) {
                    this.value = new $.jqx._jqxDateTimeInput.getDateTime(new Date());
                    this.value._setHours(0);
                    this.value._setMinutes(0);
                    this.value._setSeconds(0);
                    this.value._setMilliseconds(0);
                }

                if (date.getFullYear) {
                    this.value._setYear(date.getFullYear());
                    this.value._setDay(1);
                    this.value._setMonth(date.getMonth() + 1);
                    this.value._setHours(date.getHours());
                    this.value._setMinutes(date.getMinutes());
                    this.value._setSeconds(date.getSeconds());
                    this.value._setMilliseconds(date.getMilliseconds());
                    this.value._setDay(date.getDate());
                }

                this._validateTimeRange();
                this._refreshValue();

                if (this.cookies) {
                    if (this.value != null) {
                        $.jqx.cookie.cookie("jqxDateTimeInput" + this.element.id, this.value.dateTime.toString(), this.cookieoptions);
                    }
                }

                var newDate = this.getDate();

                var diff = (newDate - oldDate);
                if (diff != 0) {
                    this._raiseEvent('0', date, oldDate);
                    this._raiseEvent('9', date, oldDate);
                    return true;
                }
            },

            getDate: function () {
                if (this.value == undefined)
                    return null;

                return new Date(this.value.dateTime);
            },

            getText: function () {
                return this.dateTimeInput.val();
            },

            setRange: function (from, to) {
                if (typeof (from) == 'object' && !this._isValidDate(from))
                    from = null;

                if (typeof (to) == 'object' && !this._isValidDate(to))
                    to = null;

                if (from != null && typeof (from) == "string") {
                    from = new Date(from);
                    if (!this._isValidDate(from))
                        return;
                }
                if (to != null && typeof (to) == "string") {
                    to = new Date(to);
                    if (!this._isValidDate(to))
                        return;
                }

                if (from && isNaN(from) && from.toString() == "NaN" && typeof (from) != "string") {
                    return;
                }
                if (to && isNaN(to) && to.toString() == "NaN" && typeof (to) != "string") {
                    return;
                }
                this._calendar.setRange(from, to);
                if (to && from && (to.valueOf() != from.valueOf())) {
                    this._range = { from: from, to: to };
                }
                else {
                    this._range = this._calendar.getRange();
                }

                var date = from;
                if (date != null && date.getFullYear) {
                    if (this.value == null) {
                        this.value = new $.jqx._jqxDateTimeInput.getDateTime(new Date());
                        this.value._setHours(0);
                        this.value._setMinutes(0);
                        this.value._setSeconds(0);
                        this.value._setMilliseconds(0);
                    }

                    this.value._setYear(date.getFullYear());
                    this.value._setMonth(date.getMonth() + 1);
                    this.value._setHours(date.getHours());
                    this.value._setMinutes(date.getMinutes());
                    this.value._setSeconds(date.getSeconds());
                    this.value._setMilliseconds(date.getMilliseconds());
                    this.value._setDay(date.getDate());
                }
                this._refreshValue();
                if (this.value) {
                    this._raiseEvent('0', this.value.dateTime);
                }
                else {
                    this._raiseEvent('0', null);
                }
            },

            getRange: function () {
                var range = this._calendar.getRange();
                if (this._range) {
                    var from = this._range.from;
                    var to = this._range.to;
                    if (to && from && (to.valueOf() != from.valueOf())) {
                        if (range.from) {
                            range.from.setHours(from.getHours(), from.getMinutes(), from.getSeconds(), from.getMilliseconds());
                        }
                        if (range.to) {
                            range.to.setHours(to.getHours(), to.getMinutes(), to.getSeconds(), to.getMilliseconds());
                        }
                    }
                }
                return range;
            },

            _validateValue: function (blur) {
                var needValueUpdate = false;

                for (var i = 0; i < this.items.length; i++) {
                    var editValue = this.editors[i].value;
                    switch (this.items[i].type) {
                        case 'FORMAT_AMPM':
                            if (editValue < 0) {
                                editValue = 0;
                            }
                            else if (editValue > 1) {
                                editValue = 1;
                            }
                            break;
                        case 'Character':
                            break;
                        case 'Day':
                            if (editValue < 1) {
                                editValue = 1;
                            }
                            else if (editValue > 31) {
                                editValue = 31;
                            }
                            break;
                        case 'FORMAT_hh':
                            if (editValue < 1) {
                                editValue = 1;
                            }
                            else if (editValue > 12) {
                                editValue = 12;
                            }
                            break;
                        case 'FORMAT_HH':
                            if (editValue < 0) {
                                editValue = 0;
                            }
                            else if (editValue > 23) {
                                editValue = 23;
                            }
                            break;
                        case 'Millisecond':
                            if (editValue < 0) {
                                editValue = 0;
                            }
                            else if (editValue > 999) {
                                editValue = 999;
                            }
                            break;
                        case 'Minute':
                            if (editValue < 0) {
                                editValue = 0;
                            }
                            else if (editValue > 59) {
                                editValue = 59;
                            }
                            break;
                        case 'Month':
                            if (editValue < 1) {
                                editValue = 1;
                            }
                            else if (editValue > 12) {
                                editValue = 12;
                            }
                            break;
                        case 'ReadOnly':
                            break;
                        case 'Second':
                            if (editValue < 0) {
                                editValue = 0;
                            }
                            else if (editValue > 59) {
                                editValue = 59;
                            }
                            break;
                        case 'Year':
                            if (editValue < this.minDate.year) {
                                editValue = this.minDate.year;
                            }
                            else if (editValue > this.maxDate.year) {
                                editValue = this.maxDate.year;
                            }
                            break;
                    }

                    if (this.editors[i].value != editValue) {
                        this.editors[i].value = editValue;
                        needValueUpdate = true;
                    }
                }

                this.updateValue(blur);

                if (this.value != null && blur === true) {
                    if (this.value.dateTime > this.maxDate.dateTime) {
                        this._internalSetValue(this.maxDate);
                        this._updateEditorsValue();
                    }
                    else if (this.value.dateTime < this.minDate.dateTime) {
                        this._internalSetValue(this.minDate);
                        this._updateEditorsValue();
                    }
                    this._updateText();
                }
            },

            spinUp: function () {
                var value = this.value;
                if (value == null)
                    return;

                if (this.activeEditor != null) {
                    var currentEditorIndex = this.editors.indexOf(this.activeEditor);
                    if (currentEditorIndex == -1) return;
                    if (this.items[currentEditorIndex].type == 'Day') {
                        if (this.value != null) {
                            this.activeEditor.maxValue = this.value._daysInMonth(this.value.year, this.value.month);
                        }
                    }

                    var positions = this.activeEditor.positions;
                    this.activeEditor.increaseValue(this.enableAbsoluteSelection);

                    this.activeEditor.positions = positions;
                }

                if (this.isEditing) this.isEditing = false;

                this.updateValue();
                this.isEditing = true;
                this._updateText();

                var index1 = this.editors.indexOf(this.activeEditor);
                if (index1 >= 0) {
                    this._selectGroup(index1);
                }
            },

            spinDown: function () {
                var value = this.value;
                if (value == null)
                    return;

                if (this.activeEditor != null) {
                    var currentEditorIndex = this.editors.indexOf(this.activeEditor);
                    if (currentEditorIndex == -1) return;
                    if (this.items[currentEditorIndex].type == 'Day') {
                        if (this.value != null) {
                            this.activeEditor.maxValue = this.value._daysInMonth(this.value.year, this.value.month);
                        }
                    }

                    var positions = this.activeEditor.positions;
                    this.activeEditor.decreaseValue(this.enableAbsoluteSelection);
                    this.activeEditor.positions = positions;
                }

                if (this.isEditing) this.isEditing = false;

                this.updateValue();
                this.isEditing = true;
                this._updateText();

                var index1 = this.editors.indexOf(this.activeEditor);
                if (index1 >= 0) {
                    this._selectGroup(index1);
                }
            },

            _passKeyToCalendar: function (event) {
                if (event.keyCode == 13 || event.keyCode == 9) {
                    this.hideCalendar('selected', 'keyboard');
                    return true;
                }
                else if (event.keyCode == 27) {
                    var calendar = this.calendarContainer;
                    var calendarInstance = this._calendar;
                    var closeAfterSelection = this.closeCalendarAfterSelection;
                    this.closeCalendarAfterSelection = false;
                    calendarInstance.setDate(this.value.dateTime);
                    this.closeCalendarAfterSelection = closeAfterSelection;
                    this.hideCalendar();
                }

                var closeAfterSelection = this.closeCalendarAfterSelection;
                this.closeCalendarAfterSelection = false;
                var result = this._calendar._handleKey(event);
                this.closeCalendarAfterSelection = closeAfterSelection;
                return result;
            },

            handleCalendarKey: function (event, me) {
                var $target = $(event.target);
                var openedCalendar = $.data(document.body, "openedJQXCalendar" + this.id);
                if (openedCalendar != null) {
                    if (openedCalendar.length > 0) {
                        var result = me._passKeyToCalendar(event);
                        return result;
                    }
                }

                return true;
            },

            _findPos: function (obj) {
                if (obj == null)
                    return;

                while (obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
                    obj = obj['nextSibling'];
                }
                var position = $(obj).coord(true);
                return [position.left, position.top];
            },

            testOffset: function (element, offset, inputHeight) {
                var dpWidth = element.outerWidth();
                var dpHeight = element.outerHeight();
                var viewWidth = $(window).width() + $(window).scrollLeft();
                var viewHeight = $(window).height() + $(window).scrollTop();
                if (offset.left + dpWidth > viewWidth) {
                    if (dpWidth > this.host.width()) {
                        var hostLeft = this.host.coord().left;
                        var hOffset = dpWidth - this.host.width();
                        offset.left = hostLeft - hOffset + 2;
                    }
                }
                if (offset.left < 0) {
                    offset.left = parseInt(this.host.coord().left) + 'px'
                }

                offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
                    Math.abs(dpHeight + inputHeight + 23) : 0);

                return offset;
            },

            open: function (mode) {
                if (mode == "time") {
                    this.timePopup = true;
                }
                else {
                    this.timePopup = false;
                }
                this.showCalendar();
            },

            close: function (reason) {
                this.hideCalendar();
            },

            _getBodyOffset: function () {
                var top = 0;
                var left = 0;
                if ($('body').css('border-top-width') != '0px') {
                    top = parseInt($('body').css('border-top-width'));
                    if (isNaN(top)) top = 0;
                }
                if ($('body').css('border-left-width') != '0px') {
                    left = parseInt($('body').css('border-left-width'));
                    if (isNaN(left)) left = 0;
                }
                return { left: left, top: top };
            },

            initTimePopup: function () {
                this.timePopupElement = $("<div style='border-style: solid; border-width: 0px;'></div>").appendTo(this.timeContainer);
                this.timePopupElement.addClass(this.toThemeProperty('jqx-widget-content jqx-widget jqx-date-time-input-popup'));
                var popupTable = "";
                popupTable += "<table>"
                    + "<tbody>"
                    + "<tr>"
                    + "<td><a class='increment-hour-column' href='javascript:;' data-action='incrementHour'><div class='jqx-icon-up'></div></a>"
                    + "</td>"
                    + "<td class='separator'>&nbsp;</td>"
                    + "<td><a class='increment-minute-column' href='javascript:;' data-action='incrementMinute'><div class='jqx-icon-up'></div></a>"
                    + "</td>"
                    + "<td class='separator'>&nbsp;</td>"
                    + "<td><a class='increment-second-column' href='javascript:;' data-action='incrementSecond'><div class='jqx-icon-up'></div></a>"
                    + "</td>"
                    + "<td class='separator'>&nbsp;</td>"
                    + "<td><a class='increment-millisecond-column' href='javascript:;' data-action='incrementMSSecond'><div class='jqx-icon-up'></div></a>"
                    + "</td>"
                    + "<td class='separator'>&nbsp;</td>"
                    + "<td class='increment-meridian-column'><a href='javascript:;' data-action='toggleMeridian'><div class='jqx-icon-up'></div></a>"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td>"
                    + "<input type='text' class='jqx-timepicker-hour' maxlength='2'>"
                    + "</td>"
                    + "<td class='separator'>:</td>"
                    + "<td>"
                    + "<input type='text' class='jqx-timepicker-minute' maxlength='2'>"
                    + "</td>"
                    + "<td class='separator'>:</td>"
                    + "<td>"
                    + "<input type='text' class='jqx-timepicker-second' maxlength='2'>"
                    + "</td>"
                    + "<td class='separator'>:</td>"
                    + "<td>"
                    + "<input type='text' class='jqx-timepicker-millisecond' maxlength='3'>"
                    + "</td>"
                    + "<td class='separator'>&nbsp;</td>"
                    + "<td>"
                    + "<input type='text' class='jqx-timepicker-meridian' maxlength='2'>"
                    + "</td>"
                    + "</tr>"
                    + "<tr>"
                    + "<td><a class='decrement-hour-column' href='javascript:;' data-action='decrementHour'><div class='jqx-icon-down'></div></a>"
                    + "</td>"
                    + "<td class='separator'></td>"
                    + "<td><a class='decrement-minute-column' href='javascript:;' data-action='decrementMinute'><div class='jqx-icon-down'></div></a>"
                    + "</td>"
                    + "<td class='separator'></td>"
                    + "<td><a class='decrement-second-column' href='javascript:;' data-action='decrementSecond'><div class='jqx-icon-down'></div></a>"
                    + "</td>"
                    + "<td class='separator'></td>"
                    + "<td><a class='decrement-millisecond-column' href='javascript:;' data-action='decrementMillisecond'><div class='jqx-icon-down'></div></a>"
                    + "</td>"
                    + "<td class='separator'>&nbsp;</td>"
                    + "<td><a class='decrement-meridian-column' href='javascript:;' data-action='toggleMeridian'><div class='jqx-icon-down'></div></a>"
                    + "</td>"
                    + "</tr>"
                    + "</tbody>"
                    + "</table>";
                var formatString = this._getFormatValue(this.formatString);

                if (this.selectionMode != "range") {
                    this.timePopupElement[0].innerHTML = popupTable;
                }
                else {
                    this.timePopupElement[0].innerHTML = "<table><tr><td>" + popupTable + "</td><td>-</td><td>" + popupTable + "</td></tr></table>";
                }
                this.timePopupElement.find('.jqx-icon-down').addClass(this.toThemeProperty('jqx-icon jqx-icon-arrow-down'));
                this.timePopupElement.find('.jqx-icon-up').addClass(this.toThemeProperty('jqx-icon jqx-icon-arrow-up'));
                var inputs = this.timePopupElement.find('input');
                inputs.addClass(this.toThemeProperty('jqx-input'));
                inputs.addClass(this.toThemeProperty('jqx-rc-all'));
                this.addHandler(inputs, "mousedown", function (event) {
                    event.stopPropagation();
                });

                var spinDown = function (event) {
                    if (event.target.className.indexOf("hour") >= 0) {
                        that._decrementHour($(event.target));
                    }
                    if (event.target.className.indexOf("minute") >= 0) {
                        that._decrementMinuteSecond($(event.target));
                    }
                    if (event.target.className.indexOf("second") >= 0) {
                        that._decrementMinuteSecond($(event.target));
                    }
                    if (event.target.className.indexOf("millisecond") >= 0) {
                        that._decrementMillisecond($(event.target));
                    }
                    if (event.target.className.indexOf("meridian") >= 0) {
                        that._decrementMeridian($(event.target));
                    }
                }

                var spinUp = function (event) {
                    if (event.target.className.indexOf("hour") >= 0) {
                        that._incrementHour($(event.target));
                    }
                    if (event.target.className.indexOf("minute") >= 0) {
                        that._incrementMinuteSecond($(event.target));
                    }
                    if (event.target.className.indexOf("second") >= 0) {
                        that._incrementMinuteSecond($(event.target));
                    }
                    if (event.target.className.indexOf("millisecond") >= 0) {
                        that._incrementMillisecond($(event.target));
                    }
                    if (event.target.className.indexOf("meridian") >= 0) {
                        that._incrementMeridian($(event.target));
                    }
                }

                var wheel = function (event, self) {
                    if (!self.isEditing)
                        return;

                    var delta = 0;
                    if (!event) /* For IE. */
                        event = window.event;
                    if (event.originalEvent && event.originalEvent.wheelDelta) {
                        event.wheelDelta = event.originalEvent.wheelDelta;
                    }
                    if (event.originalEvent && event.originalEvent.deltaY != undefined) {
                        delta = -event.originalEvent.deltaY;
                    }

                    if (event.wheelDelta) { /* IE/Opera. */
                        delta = event.wheelDelta / 120;
                    } else if (event.detail) { /** Mozilla case. */
                        delta = -event.detail / 3;
                    }

                    if (delta) {
                        if (document.activeElement == event.target && event.target.nodeName.toLowerCase() == "input") {
                            if (delta < 0) {
                                spinDown(event);
                            }
                            else {
                                spinUp(event);
                            }
                        }
                        if (event.preventDefault)
                            event.preventDefault();
                        event.returnValue = false;
                    }

                    if (event.preventDefault)
                        event.preventDefault();
                    event.returnValue = false;
                }


                this.addHandler(inputs, "wheel", function (event) {
                    wheel(event, that);
                });
                this.addHandler(inputs, "keydown", function (event) {
                    var input = $(event.target);
                    if (event.ctrlKey) {
                        if (event.keyCode == 38) {
                            if (that.isOpened()) {
                                that.hideCalendar("keyboard", "keyboard");
                                that.dateTimeInput.focus();
                                return false;
                            }
                        }
                        else if (event.keyCode == 40) {
                            if (!that.isOpened()) {
                                that.showCalendar("keyboard", "keyboard");
                                that.dateTimeInput.focus();
                                return false;
                            }
                        }
                    }

                    if (event.keyCode == 40) {
                        spinDown(event);
                        event.preventDefault();
                    }
                    else if (event.keyCode == 38) {
                        spinUp(event);
                        event.preventDefault();
                    }
                    else if (event.keyCode == 13) {
                        event.preventDefault();
                        that.hideCalendar("keyboard", "keyboard");
                        that.dateTimeInput.focus();
                    }
                    else if (event.keyCode == 27) {
                        event.preventDefault();
                        that.hideCalendar("cancel");
                        that.dateTimeInput.focus();
                    }
                });
                this.hourInput = $(inputs[0]);
                this.minuteInput = $(inputs[1]);
                this.secondInput = $(inputs[2]);
                this.mssecondInput = $(inputs[3]);
                this.meridianInput = $(inputs[4]);

                this.hourInput2 = $(inputs[5]);
                this.minuteInput2 = $(inputs[6]);
                this.secondInput2 = $(inputs[7]);
                this.mssecondInput2 = $(inputs[8]);
                this.meridianInput2 = $(inputs[9]);
                var that = this;
                var hourIncrementColumns = this.timePopupElement.find('.increment-hour-column');
                this.hourIncrement = $(hourIncrementColumns[0]);
                this.hourIncrement2 = $(hourIncrementColumns[1]);
                this.addHandler(inputs, "change", function (event) {
                    var input = $(event.target);
                    if (input.val().length <= 1) {
                        input.val("0" + $(event.target).val());
                    }
                    if (event.target.className.indexOf("hour") >= 0) {
                        var value = parseInt($(event.target).val());
                        if (formatString.indexOf('HH') >= 0) {
                            while (value > 24) value = value - 24;
                        }
                        else {
                            while (value > 12) value = value - 12;
                        }
                        if (value < 10) value = "0" + value;
                        if (input.val() != value) {
                            input.val(value);
                        }
                    }
                    if (event.target.className.indexOf("minute") >= 0 || event.target.className.indexOf("second") >= 0) {
                        var value = parseInt($(event.target).val());
                        while (value > 59) value--;
                        if (value < 10) value = "0" + value;
                        if (input.val() != value) {
                            input.val(value);
                        }
                    }
                });

                this._incrementHour = function (input) {
                    var value = parseInt(input.val());
                    value++;
                    if (formatString.indexOf('HH') >= 0) {
                        if (value > 23) value = 0;
                    }
                    else if (value > 12) value = 1;
                    if (value < 10) value = "0" + value;
                    input.val(value);
                }

                this._incrementMinuteSecond = function (input) {
                    var value = parseInt(input.val());
                    value++;
                    if (value > 59) value = 0;
                    if (value < 10) value = "0" + value;
                    input.val(value);
                }
                this._incrementMillisecond = function (input) {
                    var value = parseInt(input.val());
                    value++;
                    if (value > 999) value = 0;
                    if (value < 10) value = "0" + value;
                    input.val(value);
                }
                this._incrementMeridian = function (input) {
                    var value = input.val();
                    if (value.toLowerCase().indexOf("a") >= 0) {
                        value = "PM";
                    }
                    else value = "AM";
                    input.val(value);
                }
                this._decrementHour = function (input) {
                    var value = parseInt(input.val());
                    value--;
                    if (formatString.indexOf('HH') >= 0) {
                        if (value < 0) value = 23;
                    }
                    else if (value < 1) value = 12;
                    if (value < 10) value = "0" + value;
                    input.val(value);
                }

                this._decrementMinuteSecond = function (input) {
                    var value = parseInt(input.val());
                    value--
                    if (value < 0) value = 59;
                    if (value < 10) value = "0" + value;
                    input.val(value);
                }
                this._decrementMillisecond = function (input) {
                    var value = parseInt(input.val());
                    value--
                    if (value < 0) value = 999;
                    if (value < 10) value = "0" + value;
                    input.val(value);
                }
                this._decrementMeridian = function (input) {
                    var value = input.val();
                    if (value.toLowerCase().indexOf("a") >= 0) {
                        value = "PM";
                    }
                    else value = "AM";
                    input.val(value);
                }

                this.addHandler(this.hourIncrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementHour(that.hourInput);
                });
                this.addHandler(this.hourIncrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementHour(that.hourInput2);
                });
                var minuteIncrementColumns = this.timePopupElement.find('.increment-minute-column');
                this.minuteIncrement = $(minuteIncrementColumns[0]);
                this.minuteIncrement2 = $(minuteIncrementColumns[1]);
                this.addHandler(this.minuteIncrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementMinuteSecond(that.minuteInput);
                });
                this.addHandler(this.minuteIncrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementMinuteSecond(that.minuteInput2);
                });
                var secondIncrementColumns = this.timePopupElement.find('.increment-second-column');
                this.secondIncrement = $(secondIncrementColumns[0]);
                this.secondIncrement2 = $(secondIncrementColumns[1]);
                this.addHandler(this.secondIncrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementMinuteSecond(that.secondInput);
                });
                this.addHandler(this.secondIncrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementMinuteSecond(that.secondInput2);
                });
                var millisecondsIncrementColumns = this.timePopupElement.find('.increment-millisecond-column');
                this.millisecondsIncrement = $(millisecondsIncrementColumns[0]);
                this.millisecondsIncrement2 = $(millisecondsIncrementColumns[1]);
                this.addHandler(this.millisecondsIncrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementMillisecond(that.mssecondInput);
                });
                this.addHandler(this.millisecondsIncrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementMillisecond(that.mssecondInput2);

                });
                var meridianIncrementColumns = this.timePopupElement.find('.increment-meridian-column');
                this.meridianIncrement = $(meridianIncrementColumns[0]);
                this.meridianIncrement2 = $(meridianIncrementColumns[1]);
                this.addHandler(this.meridianIncrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementMeridian(that.meridianInput);
                });
                this.addHandler(this.meridianIncrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._incrementMeridian(that.meridianInput2);
                });
                // decrement
                var hourDecrementColumns = this.timePopupElement.find('.decrement-hour-column');
                this.hourDecrement = $(hourDecrementColumns[0]);
                this.hourDecrement2 = $(hourDecrementColumns[1]);
                this.addHandler(this.hourDecrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementHour(that.hourInput);
                });
                this.addHandler(this.hourDecrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementHour(that.hourInput2);
                });
                var minuteDecrementColumns = this.timePopupElement.find('.decrement-minute-column');
                this.minuteDecrement = $(minuteDecrementColumns[0]);
                this.minuteDecrement2 = $(minuteDecrementColumns[1]);
                this.addHandler(this.minuteDecrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementMinuteSecond(that.minuteInput);
                });
                this.addHandler(this.minuteDecrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementMinuteSecond(that.minuteInput2);
                });
                var secondDecrementColumns = this.timePopupElement.find('.decrement-second-column');
                this.secondDecrement = $(secondDecrementColumns[0]);
                this.secondDecrement2 = $(secondDecrementColumns[1]);
                this.addHandler(this.secondDecrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementMinuteSecond(that.secondInput);
                });
                this.addHandler(this.secondDecrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementMinuteSecond(that.secondInput2);
                });
                var millisecondsDecrementColumns = this.timePopupElement.find('.decrement-millisecond-column');
                this.millisecondsDecrement = $(millisecondsDecrementColumns[0]);
                this.millisecondsDecrement2 = $(millisecondsDecrementColumns[1]);
                this.addHandler(this.millisecondsDecrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementMillisecond(that.mssecondInput);
                });
                this.addHandler(this.millisecondsDecrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementMillisecond(that.mssecondInput2);
                });
                var meridianDecrementColumns = this.timePopupElement.find('.decrement-meridian-column');
                this.meridianDecrement = $(meridianDecrementColumns[0]);
                this.meridianDecrement2 = $(meridianDecrementColumns[1]);
                this.addHandler(this.meridianDecrement, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementMeridian(that.meridianInput);
                });
                this.addHandler(this.meridianDecrement2, "mousedown", function (event) {
                    event.stopPropagation();
                    that._decrementMeridian(that.meridianInput2);
                });

                var table = this.timePopupElement.find('table');
                this.addHandler(this.timePopupElement, "mousedown", function (event) {
                    event.stopPropagation();
                });

                var hideByTable = function (table) {
                    var rows = table.find('tr');
                    if (formatString.indexOf('mm') == -1) {
                        that.minuteInput.hide();
                        that.minuteInput2.hide();
                        $($(rows[0]).children()[1]).hide();
                        $($(rows[0]).children()[2]).hide();
                        $($(rows[1]).children()[1]).hide();
                        $($(rows[1]).children()[2]).hide();
                        $($(rows[2]).children()[1]).hide();
                        $($(rows[2]).children()[2]).hide();
                    }
                    if (formatString.indexOf('ss') == -1) {
                        that.secondInput.hide();
                        that.secondInput2.hide();
                        $($(rows[0]).children()[3]).hide();
                        $($(rows[0]).children()[4]).hide();
                        $($(rows[1]).children()[3]).hide();
                        $($(rows[1]).children()[4]).hide();
                        $($(rows[2]).children()[3]).hide();
                        $($(rows[2]).children()[4]).hide();
                    }
                    if (formatString.indexOf('tt') == -1 && formatString.indexOf('hh') == -1) {
                        that.meridianInput.hide();
                        that.meridianInput2.hide();
                        $($(rows[0]).children()[7]).hide();
                        $($(rows[0]).children()[8]).hide();
                        $($(rows[1]).children()[7]).hide();
                        $($(rows[1]).children()[8]).hide();
                        $($(rows[2]).children()[7]).hide();
                        $($(rows[2]).children()[8]).hide();
                    }
                    if (formatString.indexOf('zz') == -1) {
                        that.mssecondInput.hide();
                        that.mssecondInput2.hide();
                        $($(rows[0]).children()[5]).hide();
                        $($(rows[0]).children()[6]).hide();
                        $($(rows[1]).children()[5]).hide();
                        $($(rows[1]).children()[6]).hide();
                        $($(rows[2]).children()[5]).hide();
                        $($(rows[2]).children()[6]).hide();
                    }
                }
                if (table.length == 1) {
                    hideByTable(table);
                }
                else {
                    hideByTable($($(table)[1]));
                    hideByTable($($(table)[2]));
                }
            },

            updateTimePopup: function () {
                var formatString = this._getFormatValue(this.formatString);
                if (this.selectionMode != "range") {
                    var date = this.getDate();
                    if (this.hourInput) {
                        if (date) {
                            var hour = date.getHours();
                            var minute = date.getMinutes();
                            var meridian = date.getHours();
                            var second = date.getSeconds();
                            var milliseconds = date.getMilliseconds();
                        }
                        else {
                            var hour = 0;
                            var minute = 0;
                            var meridian = 0;
                            var second = 0;
                            var milliseconds = 0;
                        }

                        if (hour >= 12) {
                            meridian = "PM";
                            if (formatString.indexOf("HH") == -1) {
                                hour -= 12;
                                if (hour == 0) hour = 12;
                            }
                        }
                        else meridian = "AM";
                        if (this.meridianInput.css('display') != "none") {
                            if (hour == 0) hour = 12;
                        }

                        if (hour < 10) hour = "0" + hour;
                        if (minute < 10) minute = "0" + minute;
                        if (second < 10) second = "0" + second;
                        if (milliseconds < 10) milliseconds = "0" + milliseconds;

                        this.hourInput.val(hour);
                        this.minuteInput.val(minute);
                        this.secondInput.val(second);
                        this.mssecondInput.val(milliseconds);
                        this.meridianInput.val(meridian);
                    }
                }
                else {
                    var date = this.getRange().from;
                    if (this.hourInput) {
                        if (date) {
                            var hour = date.getHours();
                            var minute = date.getMinutes();
                            var meridian = date.getHours();
                            var second = date.getSeconds();
                            var milliseconds = date.getMilliseconds();
                        }
                        else {
                            var hour = 0;
                            var minute = 0;
                            var meridian = 0;
                            var second = 0;
                            var milliseconds = 0;
                        }
                        if (hour >= 12) {
                            meridian = "PM";
                            if (formatString.indexOf("HH") == -1) {
                                hour -= 12;
                                if (hour == 0) hour = 12;
                            }
                        }
                        else meridian = "AM";
                        if (this.meridianInput.css('display') != "none") {
                            if (hour == 0) hour = 12;
                        }
                        if (hour < 10) hour = "0" + hour;
                        if (minute < 10) minute = "0" + minute;
                        if (second < 10) second = "0" + second;
                        if (milliseconds < 10) milliseconds = "0" + milliseconds;

                        this.hourInput.val(hour);
                        this.minuteInput.val(minute);
                        this.secondInput.val(second);
                        this.mssecondInput.val(milliseconds);
                        this.meridianInput.val(meridian);
                    }
                    var date = this.getRange().to;
                    if (this.hourInput2) {
                        if (date) {
                            var hour = date.getHours();
                            var minute = date.getMinutes();
                            var meridian = date.getHours();
                            var second = date.getSeconds();
                            var milliseconds = date.getMilliseconds();
                        }
                        else {
                            var hour = 0;
                            var minute = 0;
                            var meridian = 0;
                            var second = 0;
                            var milliseconds = 0;
                        }
                        if (hour >= 12) {
                            meridian = "PM";
                            if (formatString.indexOf("HH") == -1) {
                                hour -= 12;
                                if (hour == 0) hour = 12;
                            }
                        }
                        else meridian = "AM";
                        if (this.meridianInput.css('display') != "none") {
                            if (hour == 0) hour = 12;
                        }

                        if (hour < 10) hour = "0" + hour;
                        if (minute < 10) minute = "0" + minute;
                        if (second < 10) second = "0" + second;
                        if (milliseconds < 10) milliseconds = "0" + milliseconds;

                        this.hourInput2.val(hour);
                        this.minuteInput2.val(minute);
                        this.secondInput2.val(second);
                        this.mssecondInput2.val(milliseconds);
                        this.meridianInput2.val(meridian);
                    }
                }
            },

            showCalendar: function () {
                var calendar = this.calendarContainer;
                var calendarInstance = this._calendar;
                $.jqx.aria(this, "aria-expanded", true);

                if (this.showTimeButton) {
                    if (this.timePopup) {
                        if (!this.timePopupElement) {
                            this.initTimePopup();
                        }
                        this.calendarContainer.css('visibility', 'hidden');
                        this.timeContainer.css('visibility', 'visible');
                        this.updateTimePopup();
                        var inputs = this.timeContainer.find('input');
                        var width = 0;
                        for (var i = 0; i < inputs.length; i++) {
                            if (inputs[i].style.display != "none") {
                                width += 50;
                            }
                        }
                        this.container.width(parseInt(width));

                        if (!this.touch) {
                            setTimeout(function () {
                                inputs[0].focus();
                                $(inputs[0]).select();
                            }, 150 + this.openDelay);
                        }
                    }
                    else {
                        this.container.width(parseInt(this.calendarContainer.width()) + 25);
                        this.timeContainer.css('visibility', 'hidden');
                        this.calendarContainer.css('visibility', 'visible');
                    }
                }

                if (this.value != null) {
                    if (this.selectionMode != 'range') {
                        this._oldDT = new Date(this.value.dateTime);
                    }
                    else {
                        this._oldDT = this.getRange();
                    }
                }
                else {
                    this._oldDT = null;
                }
                if (!calendarInstance.canRender) {
                    calendarInstance.canRender = true;
                    calendarInstance.render();
                }
                var container = this.container;
                var self = this;
                var scrollPosition = $(window).scrollTop();
                var scrollLeftPosition = $(window).scrollLeft();
                var top = parseInt(this._findPos(this.host[0])[1]) + parseInt(this.host.outerHeight()) - 1 + 'px';
                var left, leftPos = parseInt(Math.round(this.host.coord(true).left));
                if (this.dropDownContainer === 'element') {
                    top = parseInt(this.host.outerHeight()) - 1 + 'px';
                    left = 0;
                }
                left = leftPos + 'px';

                var isMobileBrowser = false;// $.jqx.mobile.isSafariMobileBrowser() || $.jqx.mobile.isWindowsPhone();

                if ((isMobileBrowser != null && isMobileBrowser)) {
                    left = $.jqx.mobile.getLeftPos(this.element);
                    top = $.jqx.mobile.getTopPos(this.element) + parseInt(this.host.outerHeight());
                    if ($('body').css('border-top-width') != '0px') {
                        top = parseInt(top) - this._getBodyOffset().top + 'px';
                    }
                    if ($('body').css('border-left-width') != '0px') {
                        left = parseInt(left) - this._getBodyOffset().left + 'px';
                    }
                }

                this.container.css('left', left);
                this.container.css('top', top);

                var closeAfterSelection = this.closeCalendarAfterSelection;
                this.closeCalendarAfterSelection = false;
                this.isEditing = false;
                if (self.selectionMode == 'default') {
                    this._validateValue();
                    this._updateText();
                    var value = this.value != null ? this.value.dateTime : new Date();
                    calendarInstance.setDate(value);
                }
                this.closeCalendarAfterSelection = closeAfterSelection;

                var positionChanged = false;

                if (this.dropDownHorizontalAlignment == 'right' || this.rtl) {
                    var containerWidth = this.container.outerWidth();
                    var containerLeftOffset = Math.abs(containerWidth - this.host.outerWidth() + 2);
                    if (!this.rtl) containerLeftOffset -= 2;

                    if (containerWidth > this.host.width()) {
                        var offset = 23;
                        this.container.css('left', offset + parseInt(Math.round(leftPos)) - containerLeftOffset + "px");
                    }
                    else this.container.css('left', 25 + parseInt(Math.round(leftPos)) + containerLeftOffset + "px");
                }

                if (this.dropDownVerticalAlignment == "top") {
                    var dpHeight = calendar.height();
                    if (this.timePopup) {
                        this.timeContainer.css('top', this.container.height() - 75);
                    }
                    positionChanged = true;

                    calendar.css('top', 23);
                    calendar.addClass(this.toThemeProperty('jqx-popup-up'));
                    var inputHeight = parseInt(this.host.outerHeight());
                    var t = parseInt(top) - Math.abs(dpHeight + inputHeight + 23);

                    this.container.css('top', t);
                }

                if (this.enableBrowserBoundsDetection) {
                    var newOffset = this.testOffset(calendar, { left: parseInt(this.container.css('left')), top: parseInt(top) }, parseInt(this.host.outerHeight()));
                    if (parseInt(this.container.css('top')) != newOffset.top) {
                        positionChanged = true;
                        calendar.css('top', 23);
                        calendar.addClass(this.toThemeProperty('jqx-popup-up'));
                    }
                    else calendar.css('top', 0);

                    this.container.css('top', newOffset.top);
                    if (parseInt(this.container.css('left')) != newOffset.left) {
                        this.container.css('left', newOffset.left);
                    }
                }

                this._raiseEvent(7, calendar);

                if (this.animationType != 'none' && this.animationType != 'transform') {
                    this.container.css('display', 'block');
                    var height = parseInt(calendar.outerHeight());
                    calendar.stop();

                    this.isanimating = true;
                    this.opening = true;
                    if (this.animationType == 'fade') {
                        calendar.css('margin-top', 0);
                        calendar.css('opacity', 0);
                        calendar.animate({ 'opacity': 1 }, this.openDelay, function () {
                            self.isanimating = false;
                            self.opening = false;
                            $.data(document.body, "openedJQXCalendar" + self.id, calendar);
                            self.calendarContainer.focus();
                        });
                        if (this.timePopup) {
                            this.timeContainer.css('margin-top', 0);
                            this.timeContainer.css('opacity', 0);
                            this.timeContainer.animate({ 'opacity': 1 }, this.openDelay, function () {
                                self.isanimating = false;
                                self.opening = false;
                                $.data(document.body, "openedJQXCalendar" + self.id, calendar);
                                self.timeContainer.focus();
                            });
                        }
                    }
                    else {
                        calendar.css('opacity', 1);
                        if (this.timePopup) {
                            this.timeContainer.css('opacity', 1);
                        }
                        if (positionChanged) {
                            calendar.css('margin-top', height);
                        }
                        else {
                            calendar.css('margin-top', -height);
                        }
                        if (this.timePopup) {
                            if (positionChanged) {
                                this.timeContainer.css('margin-top', height);
                            }
                            else {
                                this.timeContainer.css('margin-top', -height);
                            }
                            this.timeContainer.animate({ 'margin-top': 0 }, this.openDelay, function () {
                                self.isanimating = false;
                                self.opening = false;
                                $.data(document.body, "openedJQXCalendar" + self.id, calendar);
                                self.timeContainer.focus();
                            });
                        }
                        calendar.animate({ 'margin-top': 0 }, this.openDelay, function () {
                            self.isanimating = false;
                            self.opening = false;
                            $.data(document.body, "openedJQXCalendar" + self.id, calendar);
                            self.calendarContainer.focus();
                        });
                    }
                }
                else {
                    calendar.stop();
                    self.isanimating = false;
                    self.opening = false;
                    calendar.css('opacity', 1);
                    calendar.css('margin-top', 0);
                    this.container.css('display', 'block');
                    $.data(document.body, "openedJQXCalendar" + self.id, calendar);
                    this.calendarContainer.focus();
                    if (this.timePopup) {
                        this.timeContainer.stop();
                        this.timeContainer.css('opacity', 1);
                        this.timeContainer.css('margin-top', 0);
                        this.timeContainer.focus();
                    }
                }

                if (this.value == null) {
                    if (this._calendar && this._calendar._getSelectedCell()) {
                        this._calendar._getSelectedCell().isSelected = false;
                    }
                }

                if (this.timePopup) {
                    this.timeButtonIcon.addClass(this.toThemeProperty('jqx-icon-time-pressed'));
                    this.timeButton.addClass(this.toThemeProperty('jqx-fill-state-hover'));
                    this.timeButton.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
                    this.timeContainer.addClass(this.toThemeProperty('jqx-fill-state-focus'));
                }
                else {
                    this.calendarButtonIcon.addClass(this.toThemeProperty('jqx-icon-calendar-pressed'));
                    this.calendarButton.addClass(this.toThemeProperty('jqx-fill-state-hover'));
                    this.calendarButton.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
                    this.calendarContainer.addClass(this.toThemeProperty('jqx-fill-state-focus'));

                }
                this.host.addClass(this.toThemeProperty('jqx-fill-state-focus'));
                this.calendarContainer.addClass(this.toThemeProperty('jqx-popup-show'));

                if (this.isMaterialized()) {
                    this._calendar.refresh();
                }
            },

            hideCalendar: function (reason, changeType) {
                if (changeType) {
                    this.changeType = changeType;
                }

                var calendar = this.calendarContainer;
                var container = this.container;
                var self = this;
                $.jqx.aria(this, "aria-expanded", false);
                if (this.showTimeButton) {
                    if (this.timeContainer.css('visibility') != "hidden" && reason != "cancel") {
                        if (this.selectionMode != "range" && this.hourInput) {
                            var date = this.getDate();
                            var hour = parseInt(this.hourInput.val());
                            var minute = parseInt(this.minuteInput.val());
                            var second = parseInt(this.secondInput.val());
                            var millisecond = parseInt(this.mssecondInput.val());
                            var meridian = this.meridianInput.val();
                            if (isNaN(hour))
                                hour = 0;
                            if (isNaN(minute))
                                minute = 0;
                            if (isNaN(second))
                                second = 0;
                            if (isNaN(millisecond))
                                millisecond = 0;

                            if (this.meridianInput.css('display') != "none") {
                                if (meridian.toLowerCase().indexOf("p") >= 0) {
                                    if (hour < 12) {
                                        hour += 12;
                                    }
                                }
                                if (meridian.toLowerCase().indexOf("a") >= 0) {
                                    if (hour >= 12) {
                                        hour -= 12;
                                    }
                                }
                            }
                            if (!date) date = new Date();
                            date.setHours(hour, minute, second, millisecond);
                            this.setDate(date);
                        }
                        else if (this.hourInput && reason != "selected") {
                            var range = this.getRange();
                            var hour = parseInt(this.hourInput.val());
                            var minute = parseInt(this.minuteInput.val());
                            var second = parseInt(this.secondInput.val());
                            var millisecond = parseInt(this.mssecondInput.val());
                            var meridian = this.meridianInput.val();
                            if (isNaN(hour))
                                hour = 0;
                            if (isNaN(minute))
                                minute = 0;
                            if (isNaN(second))
                                second = 0;
                            if (isNaN(millisecond))
                                millisecond = 0;

                            if (this.meridianInput.css('display') != "none") {
                                if (meridian.toLowerCase().indexOf("p") >= 0) {
                                    if (hour < 12) {
                                        hour += 12;
                                    }
                                }
                                if (meridian.toLowerCase().indexOf("a") >= 0) {
                                    if (hour >= 12) {
                                        hour -= 12;
                                    }
                                }
                            }
                            var from = range.from;
                            if (!from) from = new Date();

                            from.setHours(hour, minute, second, millisecond);

                            var hour = parseInt(this.hourInput2.val());
                            var minute = parseInt(this.minuteInput2.val());
                            var second = parseInt(this.secondInput2.val());
                            var millisecond = parseInt(this.mssecondInput2.val());
                            var meridian = this.meridianInput2.val();
                            if (minute == "") minute = 0;
                            if (second == "") second = 0;
                            if (millisecond == "") millisecond = 0;
                            if (this.meridianInput2.css('display') != "none") {
                                if (meridian.toLowerCase().indexOf("p") >= 0) {
                                    if (hour < 12) {
                                        hour += 12;
                                    }
                                }
                                if (meridian.toLowerCase().indexOf("a") >= 0) {
                                    if (hour >= 12) {
                                        hour -= 12;
                                    }
                                }
                            }
                            var to = range.to;
                            if (!to) to = new Date();
                            to.setHours(hour, minute, second, millisecond);
                            if (to.valueOf() < from.valueOf()) {
                                return false;
                            }

                            this.setRange(from, to);
                        }
                        else if (reason == "selected") {
                            return;
                        }
                    }
                }

                $.data(document.body, "openedJQXCalendar" + this.id, null);
                if (this.animationType != 'none' && this.animationType != 'transform') {
                    var height = calendar.outerHeight();
                    calendar.css('margin-top', 0);
                    if (this.showTimeButton) {
                        this.timeContainer.css('margin-top', 0);
                    }
                    this.isanimating = true;
                    var animationValue = -height;
                    if (parseInt(this.container.coord().top) < parseInt(this.host.coord().top)) {
                        animationValue = height;
                    }
                    if (this.animationType == 'fade') {
                        calendar.animate({ 'opacity': 0 }, this.closeDelay, function () { container.css('display', 'none'); self.isanimating = false; });
                    }
                    else {
                        calendar.animate({ 'margin-top': animationValue }, this.closeDelay, function () { container.css('display', 'none'); self.isanimating = false; });
                    }
                    if (this.showTimeButton) {
                        if (this.animationType == 'fade') {
                            this.timeContainer.animate({ 'opacity': 0 }, this.closeDelay, function () { container.css('display', 'none'); self.isanimating = false; });
                        }
                        else {
                            this.timeContainer.animate({ 'margin-top': animationValue }, this.closeDelay, function () { container.css('display', 'none'); self.isanimating = false; });
                        }
                    }
                }
                else if (this.animationType === "transform") {
                    setTimeout(function () {
                        container.css('display', 'none');
                    }, this.closeDelay);
                }
                else {
                    container.css('display', 'none');
                }

                if (reason != undefined) {
                    this._updateSelectedDate(reason);
                }

                this.timeButtonIcon.removeClass(this.toThemeProperty('jqx-icon-time-pressed'));
                this.timeButton.removeClass(this.toThemeProperty('jqx-fill-state-hover'));
                this.timeButton.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                this.calendarButtonIcon.removeClass(this.toThemeProperty('jqx-icon-calendar-pressed'));
                this.calendarButton.removeClass(this.toThemeProperty('jqx-fill-state-hover'));
                this.calendarButton.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                this.host.removeClass(this.toThemeProperty('jqx-fill-state-focus'));
                this.timeContainer.removeClass(this.toThemeProperty('jqx-fill-state-focus'));
                this.calendarContainer.removeClass(this.toThemeProperty('jqx-fill-state-focus'));

                this._raiseEvent(8, calendar);
                this.calendarContainer.removeClass(this.toThemeProperty('jqx-popup-show'));
            },

            _updateSelectedDate: function () {
                var value = this.value;
                if (value == null) {
                    value = new $.jqx._jqxDateTimeInput.getDateTime(new Date());
                    value._setHours(0);
                    value._setMinutes(0);
                    value._setSeconds(0);
                    value._setMilliseconds(0);
                }

                var hour = value.hour;
                var minute = value.minute;
                var second = value.second;
                var milisecond = value.millisecond;
                if (this.selectionMode == 'range' && this._calendar.getRange().from == null) {
                    this.setDate(null);
                    return;
                }

                var date = new $.jqx._jqxDateTimeInput.getDateTime(this._calendar.value.dateTime);

                date._setHours(hour);
                date._setMinutes(minute);
                date._setSeconds(second);
                date._setMilliseconds(milisecond);
                var result = this.setDate(date.dateTime);
                if (this.selectionMode == "range" && !result && this._oldDT) {
                    var range = this.getRange();
                    var oldRange = this._oldDT;
                    var from = false;
                    var to = false;
                    var oldDate = this._oldDT.from;
                    var date = range.from;
                    if (date != null && oldDate) {
                        if (!(date.getFullYear() != oldDate.getFullYear() || date.getMonth() != oldDate.getMonth() || date.getDate() != oldDate.getDate() || date.getHours() != oldDate.getHours() || date.getMinutes() != oldDate.getMinutes() || date.getSeconds() != oldDate.getSeconds())) {
                            from = true;
                        }
                    }
                    var date = range.to;
                    if (date != null) {
                        oldDate = this._oldDT.to;
                        if (oldDate) {
                            if (!(date.getFullYear() != oldDate.getFullYear() || date.getMonth() != oldDate.getMonth() || date.getDate() != oldDate.getDate() || date.getHours() != oldDate.getHours() || date.getMinutes() != oldDate.getMinutes() || date.getSeconds() != oldDate.getSeconds())) {
                                to = true;
                            }
                        }
                    }
                    if (from && to) {
                        return true;
                    }
                    this._raiseEvent(0, {});
                    this._raiseEvent(9, {});
                }
            },

            _closeOpenedCalendar: function (event) {
                var $target = $(event.target);
                var openedCalendar = $.data(document.body, "openedJQXCalendar" + event.data.me.id);
                var isCalendar = false;
                $.each($target.parents(), function () {
                    if (this.className && this.className.indexOf) {
                        if (this.className.indexOf('jqx-calendar') != -1) {
                            isCalendar = true;
                            return false;
                        }
                        if (this.className.indexOf('jqx-date-time-input-popup') != -1) {
                            isCalendar = true;
                            return false;
                        }
                        if (this.className.indexOf('jqx-input') != -1) {
                            //      isCalendar = true;
                            return false;
                        }
                    }
                });

                if ($(event.target).ischildof(event.data.me.host)) {
                    return true;
                }

                if (event.target != null && (event.target.tagName == "B" || event.target.tagName == 'b')) {
                    var hostOffset = event.data.me.host.coord();
                    var hostWidth = event.data.me.host.width();
                    var hostHeight = event.data.me.host.height();
                    var top = parseInt(hostOffset.top);
                    var left = parseInt(hostOffset.left);

                    if (top <= event.pageY && event.pageY <= top + hostHeight) {
                        if (left <= event.pageX && event.pageX <= left + hostWidth) {
                            return true;
                        }
                    }
                }

                if (openedCalendar != null && !isCalendar) {
                    if (openedCalendar.length > 0) {
                        var calendarID = openedCalendar[0].id.toString();
                        var inputID = calendarID.toString().substring(13);
                        var datetimeinput = $(document).find("#" + inputID);
                        var result = event.data.me.hideCalendar();
                        if (result !== false) {
                            $.data(document.body, "openedJQXCalendar" + event.data.me.id, null);
                        }
                    }
                }
            },

            _loadItems: function () {
                if (this.value != null) {
                    this.items = new Array();
                    var expandedMask = this._getFormatValue(this.formatString);
                    this.items = this._parseFormatValue(expandedMask);
                    this.editors = new Array();
                    for (var i = 0; i < this.items.length; i++) {
                        var editor = this.items[i].getDateTimeEditorByItemType(this.value, this);
                        this.editors[i] = editor;
                    }
                }

                this._updateEditorsValue();
                this._updateText();
            },

            _updateText: function () {
                var that = this;
                var text = "";
                if (that.items.length == 0 && that.value != null) {
                    that._loadItems();
                }

                if (that.value != null) {
                    if (that.items.length >= 1) {
                        text = that.format(that.value, 0, that.items.length);
                    }


                    var oldText = that.dateTimeInput.val();
                    if (oldText != text) {
                        that._raiseEvent(1, that.value);
                    }
                }

                if (that.selectionMode == 'range') {
                    var range = that.getRange();
                    var fromText = that.format(that.value, 0, that.items.length);
                    if (range.to) {
                        var from = $.jqx._jqxDateTimeInput.getDateTime(range.from);
                        fromText = that.format(from, 0, that.items.length);
                        var to = $.jqx._jqxDateTimeInput.getDateTime(range.to);
                        var toText = that.format(to, 0, that.items.length);
                        var text = fromText + " - " + toText;
                        if (text == ' - ') text = "";
                    }
                    else {
                        text = "";
                    }
                }

                that.dateTimeInput.val(text)
            },

            format: function (value, startFormatIndex, endFormatIndex) {
                var result = "";
                for (var i = startFormatIndex; i < endFormatIndex; ++i) {
                    var item = this.items[i];

                    var parsedValue = item.dateParser(value, this);

                    if (this.isEditing && item.type != 'ReadOnly') {
                        if (this.selectionMode != 'range') {
                            var isReadOnlyDay = item.type == 'Day' && item.format.length > 2;
                            if (item.type == 'FORMAT_AMPM') {
                                isReadOnlyDay = true;
                                if (this.editors[i].value == 0)
                                    parsedValue = this.editors[i].amString;
                                else parsedValue = this.editors[i].pmString;
                            }

                            if (!isReadOnlyDay) {
                                if (this.yearCutoff !== null && item.type === 'Year' && item.format === 'yy') {
                                    parsedValue = this.editors[i].value.toString().substring(2);
                                }
                                else {
                                    parsedValue = item.dateParserInEditMode(new Number(this.editors[i].value), "d" + this.editors[i].maxEditPositions, this);
                                    while (parsedValue.length < this.editors[i].maxEditPositions) {
                                        parsedValue = '0' + parsedValue;
                                    }
                                }
                            }
                        }
                    }
                    result += parsedValue;
                }
                return result;
            },

            _getFormatValueGroupLength: function (item) {
                for (var i = 1; i < item.toString().length; ++i) {
                    if (item.substring(i, i + 1) != item.substring(0, 1))
                        return i;
                }
                return item.length;
            },

            _parseFormatValue: function (value) {
                var myResult = new Array();
                var currentValue = value.toString();
                var i = 0;
                while (currentValue.length > 0) {
                    var formatItemLength = this._getFormatValueGroupLength(currentValue);
                    var myItem = null;

                    switch (currentValue.substring(0, 1)) {
                        case ':':
                        case '/':
                            formatItemLength = 1;
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, 1), 'ReadOnly', this.culture);
                            break;
                        case '"':
                        case '\'':
                            var closingQuotePosition = currentValue.indexOf(currentValue[0], 1);
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(1, 1 + Math.max(1, closingQuotePosition - 1)), 'ReadOnly', this.culture);
                            formatItemLength = Math.max(1, closingQuotePosition + 1);
                            break;
                        case '\\':
                            if (currentValue.length >= 2) {
                                myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(1, 1), 'ReadOnly', this.culture);
                                formatItemLength = 2;
                            }
                            break;
                        case 'd':
                        case 'D':
                            if (formatItemLength > 2) {
                                myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'Day', this.culture);
                            }
                            else {
                                myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'Day', this.culture);

                            }
                            break;
                        case 'f':
                        case 'F':
                            if (formatItemLength > 7) {
                                formatItemLength = 7;
                            }
                            if (formatItemLength > 3) {
                                myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'ReadOnly', this.culture);
                            }
                            else {
                                myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'Millisecond', this.culture);
                            }
                            break;
                        case 'g':
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'ReadOnly', this.culture);
                            break;
                        case 'h':
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'FORMAT_hh', this.culture);
                            break;
                        case 'H':
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'FORMAT_HH', this.culture);
                            break;
                        case 'm':
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'Minute', this.culture);
                            break;
                        case 'M':
                            if (formatItemLength > 4)
                                formatItemLength = 4;
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'Month', this.culture);
                            break;
                        case 's':
                        case 'S':
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'Second', this.culture);
                            break;
                        case 't':
                        case 'T':
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'FORMAT_AMPM', this.culture);
                            break;
                        case 'y':
                        case 'Y':
                            if (formatItemLength > 1) {
                                myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'Year', this.culture);
                            }
                            else {
                                formatItemLength = 1;
                                myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, 1), null, 'ReadOnly', this.culture);
                            }
                            break;
                        case 'z':
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, formatItemLength), 'ReadOnly', this.culture);
                            break;

                        default:
                            formatItemLength = 1;
                            myItem = $.jqx._jqxDateTimeInput.DateTimeFormatItem._create(currentValue.substring(0, 1), 'ReadOnly', this.culture);
                            break;
                    }

                    myResult[i] = $.extend(true, {}, myItem);
                    currentValue = currentValue.substring(formatItemLength);
                    i++;
                }

                return myResult;
            },

            _getFormatValue: function (format) {
                if (format == null || format.length == 0)
                    format = "d";

                if (format.length == 1) {
                    switch (format.substring(0, 1)) {
                        case "d":
                            return this.localization.calendar.patterns.d;
                        case "D":
                            return this.localization.calendar.patterns.D;
                        case "t":
                            return this.localization.calendar.patterns.t;
                        case "T":
                            return this.localization.calendar.patterns.T;
                        case "f":
                            return this.localization.calendar.patterns.f;
                        case "F":
                            return this.localization.calendar.patterns.F;
                        case "M":
                            return this.localization.calendar.patterns.M;
                        case "Y":
                            return this.localization.calendar.patterns.Y;
                        case "S":
                            return this.localization.calendar.patterns.S;
                    }
                }
                if (format.length == 2 && format.substring(0, 1) == '%')
                    format = format.substring(1);
                return format;
            },

            _updateEditorsValue: function () {
                var value = this.value;

                if (value == null)
                    return;

                var year = value.year;
                var day = value.day;
                var hour = value.hour;
                var millisecond = value.millisecond;
                var second = value.second;
                var minute = value.minute;
                var month = value.month;

                if (this.items == null)
                    return;

                for (var i = 0; i < this.items.length; i++) {
                    switch (this.items[i].type) {
                        case 'FORMAT_AMPM':
                            var initialValue = hour % 12;
                            if (initialValue == 0)
                                initialValue = 12;

                            if (hour >= 0 && hour < 12) {
                                this.editors[i].value = 0;
                            }
                            else {
                                this.editors[i].value = 1;
                            }
                            break;
                        case 'Day':
                            this.editors[i].value = day;
                            break;
                        case 'FORMAT_hh':
                            var initialValue = hour % 12;
                            if (initialValue == 0)
                                initialValue = 12;

                            this.editors[i].value = initialValue;
                            break;
                        case 'FORMAT_HH':
                            this.editors[i].value = hour;
                            break;
                        case 'Millisecond':
                            this.editors[i].value = millisecond;
                            break;
                        case 'Minute':
                            this.editors[i].value = minute;
                            break;
                        case 'Month':
                            this.editors[i].value = month;
                            break;
                        case 'Second':
                            this.editors[i].value = second;
                            break;
                        case 'Year':
                            this.editors[i].value = year;
                            break;
                    }
                }
            },


            updateValue: function (blur) {
                if (this.isEditing) {
                    return;
                }
                if (this.items && this.items.length == 0) {
                    return;
                }

                var dateTime = 0;
                var year = 1;
                var day = 1;
                var hour = 0;
                var milisecond = 0;
                var second = 0;
                var minute = 0;
                var month = 1;
                var amPmOffset = 0;
                var hasYear = false;
                var hasMonth = false;
                var hasDay = false;
                var hasHour = false;
                var hasMinute = false;
                var hasSecond = false;
                var hasMillisecond = false;
                var dayEditors = new Array();
                var amPmEditor = null;

                var k = 0;
                for (var i = 0; i < this.items.length; i++) {
                    switch (this.items[i].type) {
                        case 'FORMAT_AMPM':
                            amPmOffset = this.editors[i].value;
                            amPmEditor = this.editors[i];
                            break;
                        case 'Character':
                            break;
                        case 'Day':
                            if (this.items[i].format.length < 3) {
                                day = this.editors[i].value;
                                dayEditors[k++] = this.editors[i];
                                if (day == 0)
                                    day = 1;

                                hasDay = true;
                            }
                            break;
                        case 'FORMAT_hh':
                            var hoursEditor = this.editors[i];
                            hour = hoursEditor.value;
                            hasHour = true;
                            break;
                        case 'FORMAT_HH':
                            hour = this.editors[i].value;
                            hasHour = true;
                            break;
                        case 'Millisecond':
                            milisecond = this.editors[i].value;
                            hasMillisecond = true;
                            break;
                        case 'Minute':
                            minute = this.editors[i].value;
                            hasMinute = true;
                            break;
                        case 'Month':
                            month = this.editors[i].value;
                            hasMonth = true;
                            if (month == 0)
                                month = 1; break;
                        case 'ReadOnly':
                            break;
                        case 'Second':
                            second = this.editors[i].value;
                            hasSecond = true;
                            break;
                        case 'Year':
                            hasYear = true;
                            year = this.editors[i].value;

                            var yearFormatValue = this.editors[i].getDateTimeItem().format;
                            if (yearFormatValue.length < 3) {
                                var yearString = "1900";
                                if (yearString.Length == 4) {
                                    var baseYearString = "" + yearString[0] + yearString[1];
                                    var baseYear;
                                    baseYear = parseInt(baseYearString);
                                    year = year + (baseYear * 100);
                                }
                            }

                            if (year == 0)
                                year = 1;
                            break;
                    }
                }

                var oldDate = this.value != null ? new Date(this.value.dateTime) : null;

                if (year > 0 && month > 0 && day > 0 && minute >= 0 && hour >= 0 && second >= 0 && milisecond >= 0) {
                    var val = this.value;
                    if (val != null) {
                        if (!hasYear) {
                            year = val.year;
                        }

                        if (!hasMonth) {
                            month = val.month;
                        }

                        if (!hasDay) {
                            day = val.day;
                        }
                    }

                    try {
                        if (month > 12) month = 12;
                        if (month < 1) month = 1;
                        if (blur && val._daysInMonth(year, month) <= day) {
                            day = val._daysInMonth(year, month);
                            if (dayEditors != null && dayEditors.length > 0) {
                                for (i = 0; i < dayEditors.length; i++) {
                                    dayEditors[i].value = day;
                                }
                            }
                        }

                        if (amPmEditor != null) {
                            if (amPmEditor.value == 0) {
                                if (hour >= 12) {
                                    hour -= 12;
                                }
                            }
                            else {
                                if (hour + 12 < 24) {
                                    hour += 12;
                                }
                            }
                        }

                        var oldDay = this.value.dateTime.getDate();

                        this.value._setYear(parseInt(year));
                        this.value._setDay(day);
                        this.value._setMonth(month);
                        if (hasHour) {
                            this.value._setHours(hour);
                        }
                        if (hasMinute) {
                            this.value._setMinutes(minute);
                        }
                        if (hasSecond) {
                            this.value._setSeconds(second);
                        }
                        if (hasMillisecond) {
                            this.value._setMilliseconds(milisecond);
                        }
                        this._validateTimeRange();
                    }
                    catch (err) {
                        this.value = val;
                    }

                    if (oldDate != null) {
                        var areEqual = this.value.dateTime.getFullYear() == oldDate.getFullYear() && this.value.dateTime.getDate() == oldDate.getDate() && this.value.dateTime.getMonth() == oldDate.getMonth() && this.value.dateTime.getHours() == oldDate.getHours() && this.value.dateTime.getMinutes() == oldDate.getMinutes() && this.value.dateTime.getSeconds() == oldDate.getSeconds();
                        if (!areEqual) {
                            if (this.changing) {
                                var newDate = this.changing(oldDate, this.value.dateTime);
                                if (newDate) {
                                    this.value = $.jqx._jqxDateTimeInput.getDateTime(newDate);
                                }
                            }

                            this._raiseEvent('0', this.value.dateTime);
                            if (this.cookies) {
                                if (this.value != null) {
                                    $.jqx.cookie.cookie("jqxDateTimeInput" + this.element.id, this.value.dateTime.toString(), this.cookieoptions);
                                }
                            }
                            if (this.change) {
                                this.change(this.value.dateTime);
                            }
                        }
                    }
                }

                var editorIndex = this.editors.indexOf(this.activeEditor);
                var currentItem = this.items[editorIndex];

                if (this.value) {
                    if (this.calendarContainer.jqxCalendar('_isDisabled', this.value.dateTime)) {
                        this.dateTimeInput.addClass(this.toThemeProperty("jqx-input-invalid"));
                    }
                    else {
                        this.dateTimeInput.removeClass(this.toThemeProperty("jqx-input-invalid"));
                    }
                }
            },

            _internalSetValue: function (date) {
                this.value._setYear(parseInt(date.year));
                this.value._setDay(date.day);
                this.value._setMonth(date.month);
                this.value._setHours(date.hour);
                this.value._setMinutes(date.minute);
                this.value._setSeconds(date.second);
                this.value._setMilliseconds(date.milisecond);
            },

            _raiseEvent: function (id, arg, arg2) {
                var evt = this.events[id];
                var args = {};
                args.owner = this;
                if (arg == null) {
                    arg = {};
                }
                if (arg2 == null) {
                    arg2 = arg;
                }

                var key = arg.charCode ? arg.charCode : arg.keyCode ? arg.keyCode : 0;
                var result = true;
                var isreadOnly = this.readonly;
                var event = new $.Event(evt);
                event.owner = this;
                event.args = args;
                event.args.date = this.getDate();
                if (id == 9) {
                    event.args.type = this.changeType;
                    this.changeType = null;
                }
                this.element.value = this.dateTimeInput.val();
                if (id == 9 && this.selectionMode != 'range') {
                    var date = event.args.date;

                    if (this._oldDT) {
                        if (date != null) {
                            if (!(date.getFullYear() != this._oldDT.getFullYear() || date.getMonth() != this._oldDT.getMonth() || date.getDate() != this._oldDT.getDate() || date.getHours() != this._oldDT.getHours() || date.getMinutes() != this._oldDT.getMinutes() || date.getSeconds() != this._oldDT.getSeconds())) {
                                return true;
                            }
                        }

                        //      $.jqx.aria(this, "aria-valuenow", this.getDate());
                        $.jqx.aria(this, "aria-valuetext", this.getText());
                        if (this.getDate() != null) {
                            $.jqx.aria(this, "aria-label", "Current focused date is " + this.getDate().toLocaleString());
                        }
                        else {
                            $.jqx.aria(this, "aria-label", "Current focused date is Null");
                        }
                    }
                    event.args.oldValue = arg2;
                    event.args.newValue = event.args.date;
                    if (this._oldDT) {
                        event.args.oldValue = this._oldDT;
                    }
                }
                if (this.selectionMode == 'range') {
                    event.args.date = this.getRange();
                    if (this._oldDT) {
                        var date = event.args.date.from;
                        if (id == 9) {
                            var from = false;
                            var to = false;
                            var oldDate = this._oldDT.from;
                            if (date != null && oldDate) {
                                if (!(date.getFullYear() != oldDate.getFullYear() || date.getMonth() != oldDate.getMonth() || date.getDate() != oldDate.getDate() || date.getHours() != oldDate.getHours() || date.getMinutes() != oldDate.getMinutes() || date.getSeconds() != oldDate.getSeconds())) {
                                    from = true;
                                }
                            }
                            var date = event.args.date.to;
                            if (date != null) {
                                oldDate = this._oldDT.to;
                                if (oldDate) {
                                    if (!(date.getFullYear() != oldDate.getFullYear() || date.getMonth() != oldDate.getMonth() || date.getDate() != oldDate.getDate() || date.getHours() != oldDate.getHours() || date.getMinutes() != oldDate.getMinutes() || date.getSeconds() != oldDate.getSeconds())) {
                                        to = true;
                                    }
                                }
                            }
                            if (from && to) {
                                return true;
                            }

                            var from = event.args.date.from;
                            if (from == null) from = "";
                            else from = from.toString();
                            var to = event.args.date.to;
                            if (to == null) to = "";
                            else to = to.toString();

                            //  $.jqx.aria(this, "aria-valuenow", from + "-" + to);
                            $.jqx.aria(this, "aria-valuetext", this.getText());
                            if (from && to) {
                                $.jqx.aria(this, "aria-label", "Current focused range is " + from.toLocaleString() + "-" + to.toLocaleString());
                            }
                        }
                    }
                    event.args.oldValue = arg2;
                    event.args.newValue = event.args.date;
                    if (this._oldDT) {
                        event.args.oldValue = this._oldDT;
                    }
                }

                if (this.host.css('display') == 'none')
                    return true;

                if (id != 2 && id != 3 && id != 4 && id != 5 && id != 6) {
                    result = this.host.trigger(event);
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                }
                var me = this;

                if (!isreadOnly) {
                    if (id == 2 && !this.disabled) {
                        setTimeout(function () {
                            me.isEditing = true;
                            if (this.selectionMode == 'range') {
                                me._selectGroup(-1);
                            }
                            else {
                                me._selectGroup(-1);
                            }
                        }, 25);
                    }
                }


                if (id == 4) {
                    if (isreadOnly || this.disabled) {
                        if (key == 8 || key == 46) {
                            this.isEditing = false;
                            if (this.allowKeyboardDelete) {
                                if (this.allowNullDate) {
                                    this.setDate(null);
                                }
                                else {
                                    if (this.selectionMode != 'range') {
                                        this.setDate(this.getMinDate());
                                    }
                                    else {
                                        this.setRange(this.getMinDate(), this.getMinDate());
                                    }
                                }
                            }
                        }
                        if (key == 9)
                            return true;

                        if (!arg.altKey) {
                            return false;
                        }
                    }

                    result = this._handleKeyDown(arg, key);
                }

                else if (id == 5) {
                    if (key == 9)
                        return true;

                    if (isreadOnly || this.disabled) {
                        return false;
                    }


                }
                else if (id == 6) {
                    if (key == 9)
                        return true;

                    if (isreadOnly || this.disabled) {
                        return false;
                    }

                    result = this._handleKeyPress(arg, key)
                }

                return result;
            },

            _doLeftKey: function () {
                if (this.activeEditor != null) {
                    if (!this.isEditing) this.isEditing = true;

                    var lastEditor = this.activeEditor;
                    var newEditor = false;
                    var index3 = this.editors.indexOf(this.activeEditor);
                    var tmpIndex3 = index3;

                    if (this.enableAbsoluteSelection) {
                        if (index3 >= 0 && this.activeEditor.positions > 0) {
                            this.activeEditor.positions--;
                            this._selectGroup(index3);
                            return;
                        }
                    }

                    while (index3 > 0) {
                        this.activeEditor = this.editors[--index3];
                        this._selectGroup(index3);
                        if (this.items[index3].type != 'ReadOnly') {
                            newEditor = true;
                            break;
                        }
                    }
                    if (!newEditor) {
                        if (tmpIndex3 >= 0) {
                            this.activeEditor = this.editors[tmpIndex3];
                        }
                    }
                    if (this.activeEditor != null && lastEditor != this.activeEditor) {
                        if (this.items[index3].type != 'ReadOnly') {
                            if (this.enableAbsoluteSelection) {
                                this.activeEditor.positions = this.activeEditor.maxEditPositions - 1;
                            }
                            else {
                                this.activeEditor.positions = 0;
                            }
                        }
                    }

                    if (this.activeEditor != lastEditor) {
                        this._validateValue();
                        this._updateText();
                        this._selectGroup(this.editors.indexOf(this.activeEditor));
                        return true;
                    }
                    else return false;
                }
            },

            _doRightKey: function () {
                if (this.activeEditor != null) {
                    if (!this.isEditing) this.isEditing = true;

                    var lastEditor = this.activeEditor;
                    var newEditor = false;
                    var index4 = this.editors.indexOf(this.activeEditor);
                    var tmpIndex3 = index4;

                    if (this.enableAbsoluteSelection) {
                        if (index4 >= 0 && this.activeEditor.positions < this.activeEditor.maxEditPositions - 1) {
                            this.activeEditor.positions++;
                            this._selectGroup(index4);
                            return;
                        }
                    }

                    while (index4 <= this.editors.length - 2) {
                        this.activeEditor = this.editors[++index4];
                        this._selectGroup(index4);
                        if (this.items[index4].type != 'ReadOnly') {
                            if (this.items[index4].type == 'Day' && this.items[index4].format.length > 2)
                                break;

                            newEditor = true;
                            break;
                        }
                    }
                    if (!newEditor) {
                        if (tmpIndex3 >= 0) {
                            this.activeEditor = this.editors[tmpIndex3];
                        }
                    }
                    if (this.activeEditor != null && this.activeEditor != lastEditor) {
                        if (this.items[index4].type != 'ReadOnly') {
                            this.activeEditor.positions = 0;
                        }
                    }

                    if (this.activeEditor != lastEditor) {
                        this._validateValue();
                        this._updateText();
                        this._selectGroup(this.editors.indexOf(this.activeEditor));
                        return true;
                    }
                    else return false;
                }
            },


            _saveSelectedText: function () {
                var selection = this._selection();
                var text = "";
                var allText = this.dateTimeInput.val();
                if (selection.start > 0 || selection.length > 0) {
                    for (var i = selection.start; i < selection.end; i++) {
                        text += allText[i];
                    }
                }
                if (window.clipboardData) {
                    window.clipboardData.setData("Text", text);
                }
                return text;
            },

            _selectWithAdvancePattern: function () {
                var editorIndex = this.editors.indexOf(this.activeEditor);
                var canAdvance = false;
                if (this.items[editorIndex].type != 'ReadOnly') {
                    canAdvance = true;
                }

                if (!canAdvance)
                    return;

                var numericEditor = this.activeEditor;

                if (numericEditor != null) {
                    var canSelectRight = numericEditor.positions == numericEditor.maxEditPositions;
                    if (canSelectRight) {
                        this.editorText = "";
                        var editValue = numericEditor.value;
                        var needValueUpdate = false;

                        switch (this.items[editorIndex].type) {
                            case 'FORMAT_AMPM':
                                if (editValue < 0) {
                                    editValue = 0;
                                }
                                else if (editValue > 1) {
                                    editValue = 1;
                                }
                                break;
                            case 'Character':
                                break;
                            case 'Day':
                                if (editValue < 1) {
                                    editValue = 1;
                                }
                                else if (editValue > 31) {
                                    editValue = 31;
                                }
                                break;
                            case 'FORMAT_hh':
                                if (editValue < 1) {
                                    editValue = 1;
                                }
                                else if (editValue > 12) {
                                    editValue = 12;
                                }
                                break;
                            case 'FORMAT_HH':
                                if (editValue < 0) {
                                    editValue = 0;
                                }
                                else if (editValue > 23) {
                                    editValue = 23;
                                }
                                break;
                            case 'Millisecond':
                                if (editValue < 0) {
                                    editValue = 0;
                                }
                                else if (editValue > 99) {
                                    editValue = 99;
                                }
                                break;
                            case 'Minute':
                                if (editValue < 0) {
                                    editValue = 0;
                                }
                                else if (editValue > 59) {
                                    editValue = 59;
                                }
                                break;
                            case 'Month':
                                if (editValue < 1) {
                                    editValue = 1;
                                }
                                else if (editValue > 12) {
                                    editValue = 12;
                                }
                                break;
                            case 'ReadOnly':
                                break;
                            case 'Second':
                                if (editValue < 0) {
                                    editValue = 0;
                                }
                                else if (editValue > 59) {
                                    editValue = 59;
                                }
                                break;
                            case 'Year':
                                if (editValue < this.minDate.year) {
                                    editValue = this.minDate.year;
                                }
                                else if (editValue > this.maxDate.year) {
                                    editValue = this.maxDate.year;
                                }
                                break;
                        }

                        if (numericEditor.value != editValue) {
                            needValueUpdate = true;
                        }

                        if (!needValueUpdate) {
                            this.isEditing = false;
                            this._validateValue();
                            this._updateText();
                            this.isEditing = true;
                            this._doRightKey();
                            return true;
                        }

                        return false;
                    }
                }
            },


            _handleKeyPress: function (e, key) {
                if (this._fullEditInProgress) {
                    this._enteredValue = true;
                    return;
                }

                var selection = this._selection();
                var rootElement = this;
                var ctrlKey = e.ctrlKey || e.metaKey;
                if ((ctrlKey && key == 97 /* firefox */) || (ctrlKey && key == 65) /* opera */) {
                    return true;
                }

                if (key == 8) {
                    if (selection.start > 0) {
                        rootElement._setSelectionStart(selection.start);
                    }
                    return false;
                }

                if (key == 46) {
                    if (selection.start < this.items.length) {
                        rootElement._setSelectionStart(selection.start);
                    }

                    return false;
                }

                if (key === 27) {
                    if (this._firstFocusDate) {
                        this.setDate(this._firstFocusDate);
                        this._setSelectionStart(0);
                        this._selectGroup(-1);
                    }
                    return false;
                }

                if (selection.start >= 0) {
                    this.changeType = "keyboard";

                    var letter = String.fromCharCode(key);
                    var digit = parseInt(letter);
                    if (letter == "p" || letter == "a" || letter == "A" || letter == "P") {
                        if (this.activeEditor && this.activeEditor.item.type == "FORMAT_AMPM") {
                            if (this.activeEditor.value == 0 && (letter == "p" || letter == "P")) {
                                this.spinUp();
                            }
                            else if (this.activeEditor.value == 1 && (letter == "a" || letter == "A")) {
                                this.spinDown();
                            }
                        }
                    }
                    if (!isNaN(digit)) {
                        if (this.container.css('display') == 'block') {
                            this.hideCalendar();
                        }

                        this.updateValue();
                        this._updateText();
                        var inserted = false;
                        var activeItem = this.editors.indexOf(this.activeEditor);
                        var dateTimeEditor = null;
                        this.isEditing = true;
                        if (activeItem.type != "ReadOnly") {
                            dateTimeEditor = this.activeEditor;
                        }

                        if (dateTimeEditor != null && dateTimeEditor.positions == 0) {
                            this.editorText = "";
                        }

                        if (this.activeEditor == null) {
                            this.activeEditor = this.editors[0];
                        }
                        if (this.activeEditor == null) return false;
                        this.activeEditor.insert(letter);
                        if (dateTimeEditor != null && this.editorText.length >= dateTimeEditor.maxEditPositions) {
                            this.editorText = "";
                        }

                        this.editorText += letter;
                        var advanced = this._selectWithAdvancePattern();

                        if (this.activeEditor.positions == this.activeEditor.maxEditPositions) {
                            var lastEditorIndex = this._getLastEditableEditorIndex();
                            if (this.editors.indexOf(this.activeEditor) == lastEditorIndex && advanced && this.enableAbsoluteSelection) {
                                this.activeEditor.positions = this.activeEditor.maxEditPositions - 1;
                            }
                            else {
                                this.activeEditor.positions = 0;
                            }
                        }

                        inserted = true;

                        this.updateValue();
                        this._updateText();
                        this._selectGroup(this.editors.indexOf(this.activeEditor));

                        return false;
                    }
                }
                var specialKey = this._isSpecialKey(key);
                return specialKey;
            },

            _getLastEditableEditorIndex: function () {
                var i = 0;
                var me = this;
                for (var itemIndex = this.items.length - 1; itemIndex >= 0; itemIndex--) {
                    if (this.items[itemIndex].type != 'ReadOnly') {
                        return itemIndex;
                    }
                }

                return -1;
            },

            _handleKeyDown: function (e, key) {
                var that = this;
                this.timePopup = false;
                if (key == 84) {
                    this.timePopup = true;
                }

                if (e.keyCode == 115) {
                    if (that.isOpened()) {
                        that.hideCalendar("keyboard", "keyboard");
                        return false;
                    }
                    else if (!that.isOpened()) {
                        that.showCalendar("keyboard", "keyboard");
                        return false;
                    }
                }

                if (e.altKey) {
                    if (e.keyCode == 38) {
                        if (that.isOpened()) {
                            if (that.showTimeButton && !that.showCalendarButton) {
                                that.timePopup = true;
                            }
                            that.hideCalendar("keyboard", "keyboard");
                            return false;
                        }
                    }
                    else if (e.keyCode == 40) {
                        if (!that.isOpened()) {
                            if (that.showTimeButton && !that.showCalendarButton) {
                                that.timePopup = true;
                            }
                            that.showCalendar("keyboard", "keyboard");
                            return false;
                        }
                    }
                }
                else if (e.ctrlKey) {
                    this.timePopup = true;
                    if (e.keyCode == 38) {
                        if (that.isOpened()) {
                            that.hideCalendar("keyboard", "keyboard");
                            return false;
                        }
                    }
                    else if (e.keyCode == 40) {
                        if (!that.isOpened()) {
                            that.showCalendar("keyboard", "keyboard");
                            return false;
                        }
                    }
                }

                if (that.isOpened()) {
                    if (e.keyCode == 9) {
                        that.hideCalendar('selected', "keyboard");
                        return true;
                    }

                    return;
                }

                var selection = that._selection();
                var ctrlKey = e.ctrlKey || e.metaKey;
                if ((ctrlKey && key == 99 /* firefox */) || (ctrlKey && key == 67) /* opera */) {
                    that._saveSelectedText(e);
                    return true;
                }

                if ((ctrlKey && key == 122 /* firefox */) || (ctrlKey && key == 90) /* opera */) return false;

                if ((ctrlKey && key == 118 /* firefox */) || (ctrlKey && key == 86) /* opera */
                    || (e.shiftKey && key == 45)) {
                    var value = that.val();
                    var me = this;
                    var pasteFrom = $('<textarea style="position: absolute; left: -1000px; top: -1000px;"/>');
                    $('body').append(pasteFrom);
                    pasteFrom.select();

                    setTimeout(function () {
                        var val = pasteFrom.val();
                        me.setDate(val);
                        pasteFrom.remove();
                    }, 100);

                    return true;
                }

                if (that._fullEditInProgress || that.editMode === 'full' && that.value === null) {
                    if (key == 13 && that._fullEditInProgress) {
                        // Enter has been pressed
                        that._endFullEdit();

                        if (that.value != null) {
                            that.isEditing = false;
                            that._validateValue(true);
                            that._updateText();
                            that._raiseEvent(9, event);

                            var i = that.editors.length - 1,
                                editor = that.editors[i];

                            while (editor && editor.formatValueLength === undefined) {
                                i--;
                                editor = that.editors[i];
                            }

                            if (editor && editor.formatValueLength !== undefined) {
                                that.activeEditor = editor;
                                that._selectGroup(i);
                            }
                        }
                    }
                    else {
                        that._fullEditInProgress = true;
                        delete that._enteredValue;
                    }

                    return;
                }

                if (key == 8 || key == 46) {
                    if (!e.altKey && !ctrlKey && key == 46) {
                        that.isEditing = false;
                        if (that.allowKeyboardDelete) {
                            that.changeType = "keyboard";
                            if (that.allowNullDate) {
                                that.setDate(null);
                            }
                            else {
                                if (that.selectionMode != 'range') {
                                    that.setDate(that.getMinDate());
                                }
                                else {
                                    that.setRange(that.getMinDate(), that.getMinDate());
                                }
                            }
                        }
                    }
                    else {
                        if (that.activeEditor != null) {
                            var activeEditorIndex = that.editors.indexOf(that.activeEditor);
                            if (that.activeEditor.positions >= 0) {
                                var formattedValue = that._format(Number(that.activeEditor.value), "d" + that.activeEditor.maxEditPositions, that.culture)
                                var tmp = formattedValue;
                                tmp = tmp.substring(0, that.activeEditor.positions) + '0' + tmp.substring(that.activeEditor.positions + 1);
                                if (parseInt(tmp) < that.activeEditor.minValue) {
                                    tmp = that._format(Number(that.activeEditor.minValue), "d" + that.activeEditor.maxEditPositions, that.culture)
                                }

                                if (that.enableAbsoluteSelection) {
                                    that.activeEditor.value = tmp;
                                }
                                else that.activeEditor.value = that.activeEditor.minValue;

                                that._validateValue();
                                that._updateText();
                                that.changeType = "keyboard";
                                if (key == 8) {
                                    var myself = this;

                                    if (that.enableAbsoluteSelection && that.activeEditor.positions > 0) {
                                        setTimeout(function () {
                                            myself.activeEditor.positions = myself.activeEditor.positions - 1;
                                            myself._selectGroup(activeEditorIndex);
                                        }, 10);
                                    }
                                    else {
                                        setTimeout(function () {
                                            myself._doLeftKey();
                                        }, 10);
                                    }
                                }
                                else that._selectGroup(activeEditorIndex);
                            }
                            else that._doLeftKey();
                        }
                    }
                    return false;
                }

                if (key == 38) {
                    this.spinUp();
                    that.changeType = "keyboard";
                    return false;
                }
                else if (key == 40) {
                    this.spinDown();
                    that.changeType = "keyboard";
                    return false;
                }

                if (key == 9) {
                    if (that.value == null)
                        return true;

                    if (e.shiftKey) {
                        var result = this._doLeftKey()
                    }
                    else {
                        var result = this._doRightKey();
                    }
                    if (!result)
                        return true;
                    else
                        return false;
                }

                if (key == 37) {
                    if (this._editor) {
                        var result = this._doLeftKey();
                        if (!result) {
                            this.isEditing = false;
                            this._validateValue();
                        }
                        return !result;
                    }
                    else {
                        var result = this._doLeftKey()
                        return false;
                    }
                }
                else if (key == 39 || key == 191) {
                    if (this._editor) {
                        var result = this._doRightKey();
                        if (!result) {
                            this.isEditing = false;
                            this._validateValue();
                        }
                        return !result;
                    }
                    else {
                        var result = this._doRightKey();
                        return false;
                    }
                }

                var specialKey = this._isSpecialKey(key);

                if (this.value == null && (key >= 48 && key <= 57 || key >= 96 && key <= 105)) {
                    that.changeType = "keyboard";

                    if (new Date() >= this.getMinDate() && new Date() <= this.getMaxDate()) {
                        this.setDate(new Date());
                    }
                    else {
                        this.setDate(this.getMaxDate());
                    }
                }

                if (!$.jqx.browser.mozilla)
                    return true;
                if ($.jqx.browser.mozilla && $.jqx.browser.version > 24) {
                    return true;
                }

                return specialKey;
            },


            _isSpecialKey: function (key) {
                if (key != 8 /* backspace */ &&
                    key != 9 /* tab */ &&
                    key != 13 /* enter */ &&
                    key != 35 /* end */ &&
                    key != 36 /* home */ &&
                    key != 37 /* left */ &&
                    key != 39 /* right */ &&
                    key != 27 /* right */ &&
                    key != 46 /* del */
                ) {
                    return false;
                }

                return true;
            },

            _selection: function () {
                if ('selectionStart' in this.dateTimeInput[0]) {
                    var e = this.dateTimeInput[0];
                    var selectionLength = e.selectionEnd - e.selectionStart;
                    return { start: e.selectionStart, end: e.selectionEnd, length: selectionLength, text: e.value };
                }
                else {
                    var r = document.selection.createRange();
                    if (r == null) {
                        return { start: 0, end: e.value.length, length: 0 }
                    }

                    var re = this.dateTimeInput[0].createTextRange();
                    var rc = re.duplicate();
                    re.moveToBookmark(r.getBookmark());
                    rc.setEndPoint('EndToStart', re);
                    var selectionLength = r.text.length;

                    return { start: rc.text.length, end: rc.text.length + r.text.length, length: selectionLength, text: r.text };
                }
            },

            _selectGroup: function (value, selection) {
                if (this.host.css('display') == 'none')
                    return;

                if (this.readonly) return;

                if (!selection) {
                    var selection = this._selection();
                }
                var str = "";
                var currentString = "";
                var activeEditor = null;
                for (var i = 0; i < this.items.length; i++) {
                    currentString = this.items[i].dateParser(this.value, this);
                    if (this.isEditing && this.items[i].type != 'ReadOnly') {
                        var isReadOnlyDay = this.items[i].type == 'Day' && this.items[i].format.length > 2;

                        if (!isReadOnlyDay && this.items[i].type != 'FORMAT_AMPM') {
                            if (this.yearCutoff !== null && this.items[i].type === 'Year' && this.items[i].format === 'yy') {
                                currentString = this.editors[i].value.toString().substring(2);
                            }
                            else {
                                currentString = this.items[i].dateParserInEditMode(new Number(this.editors[i].value), "d" + this.editors[i].maxEditPositions, this);
                                while (currentString.length < this.editors[i].maxEditPositions) {
                                    currentString = '0' + currentString;
                                }
                            }
                        }
                    }

                    str += currentString;

                    if (this.items[i].type == 'ReadOnly')
                        continue;

                    if (this.items[i].type == 'Day' && this.items[i].format.length > 2)
                        continue;

                    if (value != undefined && value != -1) {
                        if (i >= value) {
                            var selectionStart = str.length - currentString.length;
                            var selectionLength = currentString.length;

                            if (this.enableAbsoluteSelection) {
                                if (!isNaN(parseInt(currentString)) && this.isEditing && value != -1) {
                                    selectionLength = 1;
                                    selectionStart += this.editors[i].positions;
                                }
                            }

                            if (selectionStart == this.dateTimeInput.val().length) {
                                selectionStart--;
                            }

                            this._setSelection(selectionStart, selectionStart + selectionLength);
                            activeEditor = this.editors[i];
                            this.activeEditor = activeEditor;
                            break;
                        }
                    }
                    else if (str.length >= selection.start) {
                        activeEditor = this.editors[i];
                        this.activeEditor = activeEditor;
                        var selectionStart = str.length - currentString.length;
                        var selectionLength = 1;
                        if (this.enableAbsoluteSelection) {
                            if (!isNaN(parseInt(currentString)) && this.isEditing && value != -1) {
                                selectionLength = 1;
                                selectionStart += this.editors[i].positions;
                            }
                        }
                        else selectionLength = currentString.length;

                        this._setSelection(selectionStart, selectionStart + selectionLength);
                        break;
                    }
                }

                if (i < this.items.length && value == -1) {
                    if (this.items[i].type != 'ReadOnly') {
                        this.activeEditor.positions = 0;
                    }
                }

                var newSelection = this._selection();
                if (newSelection.length == 0) {
                    if (newSelection.start > 0) {
                        var editorIndex = this._getLastEditableEditorIndex();
                        if (editorIndex >= 0) {
                            //   this._selectGroup(editorIndex);
                        }
                    }
                }
            },

            _getLastEditableEditorIndex: function () {
                var editorIndex = -1;
                for (var i = 0; i < this.editors.length; i++) {
                    if (this.items[i].type == 'ReadOnly')
                        continue;

                    if (this.items[i].type == 'Day' && this.items[i].format.length > 2)
                        continue;

                    editorIndex = i;
                }

                return editorIndex;
            },

            _setSelection: function (start, end) {
                try {
                    if ('selectionStart' in this.dateTimeInput[0]) {
                        //  this.dateTimeInput[0].focus();
                        this.dateTimeInput[0].setSelectionRange(start, end);
                    }
                    else {
                        var range = this.dateTimeInput[0].createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', start);
                        range.select();
                    }
                }
                catch (error) {
                }
            },

            _setSelectionStart: function (start) {
                this._setSelection(start, start);
            },

            destroy: function () {
                $.jqx.utilities.resize(this.host, null, true);
                this.host
                    .removeClass("jqx-rc-all")
                    ;
                if (this.timePopupElement) {
                    this.timePopupElement.remove();
                }
                this._calendar.destroy();
                this.container.remove();
                this._removeHandlers();
                this.dateTimeInput.remove();
                this.host.remove();
            },

            refreshValue: function () {
                this._refreshValue();
            },

            refresh: function (initialRefresh) {
                if (initialRefresh != true) {
                    this._setSize();
                    this._arrange();
                }
            },

            resize: function (width, height) {
                this.width = width;
                this.height = height;
                this.refresh();
            },

            _setOption: function (key, value, oldvalue) {
                if (key === "value") {
                    if (this.selectionMode != 'range') {
                        this._oldDT = null;
                    }
                    else this._oldDT = null;

                    this.value = value;
                    this._refreshValue();
                    this._raiseEvent(9, { type: null });
                }
                if (key == 'maxDate') {
                    this._calendar.maxDate = value;
                    this._raiseEvent(9, { type: null });
                }

                if (key == 'minDate') {
                    this._calendar.minDate = value;
                    this._raiseEvent(9, { type: null });
                }

                if (key == 'showCalendarButton') {
                    if (value) {
                        this.calendarButton.css('display', 'block');
                    }
                    else {
                        this.calendarButton.css('display', 'none');
                    }
                }

                if (key == "disabled") {
                    this.dateTimeInput.attr("disabled", value);
                }

                if (key == "readonly") {
                    this.readonly = value;
                    this.dateTimeInput.css("readonly", value);
                }

                if (key == "textAlign") {
                    this.dateTimeInput.css("text-align", value);
                    this.textAlign = value;
                }

                if (key == "width") {
                    this.width = value;
                    this.width = parseInt(this.width);
                    this._arrange();
                }
                else if (key == "height") {
                    this.height = value;
                    this.height = parseInt(this.height);
                    this._arrange();
                }
            },

            _updateHint: function () {
                var that = this;

                if (!that.hint) {
                    return;
                }

                if (that.isMaterialized()) {
                    setTimeout(function () {
                        if (that.dateTimeInput[0].value.length === 0) {
                            that.element.removeAttribute('hint');
                            that.label[0].innerHTML = that.placeHolder;
                        }
                        else {
                            that.label[0].innerHTML = '';

                            if (that.hint) {
                                that.element.setAttribute('hint', true);
                            }
                        }
                    });
                }
            },

            _refreshValue: function () {
                this._updateEditorsValue();
                this.updateValue();
                this._validateValue();
                this._updateText();
                this._updateHint();
            },

            _getYearBasedOnCutoff: function (lastTwoDigits) {
                var yearCutoff = this.yearCutoff.toString(),
                    threshold = parseFloat(yearCutoff.substring(2)),
                    decade = parseFloat(yearCutoff.substring(0, 2));

                if (parseFloat(lastTwoDigits) < threshold) {
                    decade++;
                }

                return parseFloat(decade + '' + lastTwoDigits);
            },

            _endFullEdit: function () {
                var me = this;

                if (!me._fullEditInProgress) {
                    return;
                }

                var enteredValue = me.dateTimeInput[0].value;

                delete me._fullEditInProgress;
                delete me._enteredValue;

                if (enteredValue === '') {
                    me.value = null;
                }
                else {
                    var enteredDate = new Date(enteredValue);
                    if (this._mask && this.formatString) {
                        var maskKeys = Object.keys(this._mask);
                        if (maskKeys.length === 2) {
                            var mask = [maskKeys[0], maskKeys[1]];
                            var prefix = enteredValue.substring(0, mask[0]);
                            var middle = enteredValue.substring(parseInt(mask[0]) + 1, mask[1]);
                            var suffix = enteredValue.substring(parseInt(mask[1]) + 1);

                            if (this.formatString.substring(0, mask[0]) === "dd") {
                                prefix = parseInt(prefix);
                                middle = parseInt(middle);
                                suffix = parseInt(suffix);

                                enteredDate = new Date(suffix, middle - 1, prefix);
                            }
                        }
                    }

                    if (!isNaN(enteredDate.getTime())) {
                        me.items = [];

                        if (me.yearCutoff) {
                            var year = enteredDate.getFullYear().toString();

                            if (enteredValue.indexOf(year) === -1 && enteredValue.indexOf(year.slice(2))) {
                                // only 2-digit year has been entered by the user
                                var validYear = me._getYearBasedOnCutoff(year.slice(2));

                                enteredDate.setFullYear(validYear);
                            }
                        }

                        me.value = $.jqx._jqxDateTimeInput.getDateTime(enteredDate);
                    }
                    else if (me.value === null) {
                        me._updateText();
                    }
                }
            },

            _getMask: function () {
                var that = this,
                    format = that.formatString,
                    patterns = {
                        // short date pattern
                        d: "M/d/yyyy",
                        // long date pattern
                        D: "dddd, MMMM dd, yyyy",
                        // short time pattern
                        t: "h:mm tt",
                        // long time pattern
                        T: "h:mm:ss tt",
                        // long date, short time pattern
                        f: "dddd, MMMM dd, yyyy h:mm tt",
                        // long date, long time pattern
                        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                        // month/day pattern
                        M: "MMMM dd",
                        // month/year pattern
                        Y: "yyyy MMMM",
                        // S is a sortable format that does not vary by culture
                        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                        // formatting of dates in MySQL DataBases
                        ISO: "yyyy-MM-dd hh:mm:ss",
                        ISO2: "yyyy-MM-dd HH:mm:ss",
                        d1: "dd.MM.yyyy",
                        d2: "dd-MM-yyyy",
                        zone1: "yyyy-MM-ddTHH:mm:ss-HH:mm",
                        zone2: "yyyy-MM-ddTHH:mm:ss+HH:mm",
                        custom: "yyyy-MM-ddTHH:mm:ss.fff",
                        custom2: "yyyy-MM-dd HH:mm:ss.fff"
                    },
                    mask = {};

                if (patterns[format]) {
                    format = patterns[format];
                }

                // expand single digit formats, then escape regular expression characters.
                var expFormat = format.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1"),
                    regexp = ["^"],
                    index = 0,
                    quoteCount = 0,
                    tokenRegExp = /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g,
                    match;

                // iterate through each date token found.
                while ((match = tokenRegExp.exec(expFormat)) !== null) {
                    var preMatch = expFormat.slice(index, match.index);

                    if (preMatch !== '') {
                        mask[index] = preMatch;
                    }

                    index = tokenRegExp.lastIndex;

                    // don't replace any matches that occur inside a string literal.
                    quoteCount += that._appendPreOrPostMatch(preMatch, regexp);
                    if (quoteCount % 2) {
                        regexp.push(match[0]);
                        continue;
                    }

                    // add a regex group for the token.
                    var m = match[0],
                        len = m.length,
                        add;
                    switch (m) {
                        case 'dddd': case 'ddd':
                        case 'MMMM': case 'MMM':
                        case 'gg': case 'g':
                            add = "(\\D+)";
                            break;
                        case 'tt': case 't':
                            add = "(\\D*)";
                            break;
                        case 'yyyy':
                        case 'fff':
                        case 'ff':
                        case 'f':
                            add = "(\\d{" + len + "})";
                            break;
                        case 'dd': case 'd':
                        case 'MM': case 'M':
                        case 'yy': case 'y':
                        case 'HH': case 'H':
                        case 'hh': case 'h':
                        case 'mm': case 'm':
                        case 'ss': case 's':
                            add = "(\\d\\d?)";
                            break;
                        case 'zzz':
                            add = "([+-]?\\d\\d?:\\d{2})";
                            break;
                        case 'zz': case 'z':
                            add = "([+-]?\\d\\d?)";
                            break;
                        case '/':
                            add = "(\\/)";
                            mask[index - 1] = '/';
                            break;
                        default:
                            throw "Invalid date format pattern '" + m + "'.";
                            break;
                    }
                    if (add) {
                        regexp.push(add);
                    }
                }
                that._appendPreOrPostMatch(expFormat.slice(index), regexp);
                regexp.push("$");

                that._mask = mask;
            },

            _appendPreOrPostMatch: function (preMatch, strings) {
                // appends pre- and post- token match strings while removing escaped characters.
                // Returns a single quote count which is used to determine if the token occurs
                // in a string literal.
                var quoteCount = 0,
                    escaped = false;
                for (var i = 0, il = preMatch.length; i < il; i++) {
                    var c = preMatch.charAt(i);
                    switch (c) {
                        case '\'':
                            if (escaped) {
                                strings.push("'");
                            }
                            else {
                                quoteCount++;
                            }
                            escaped = false;
                            break;
                        case '\\':
                            if (escaped) {
                                strings.push("\\");
                            }
                            escaped = !escaped;
                            break;
                        default:
                            strings.push(c);
                            escaped = false;
                            break;
                    }
                }
                return quoteCount;
            }
        })
    })(jqxBaseFramework);


    (function ($) {
        $.jqx._jqxDateTimeInput.DateTimeFormatItem = {};
        $.extend($.jqx._jqxDateTimeInput.DateTimeFormatItem, {

            _create: function (format, type, culture) {
                this.format = format;
                this.type = type;
                this.culture = culture;
                return this;
            },

            _itemValue: function () {
                switch (this.format.length) {
                    case 1:
                        return 9;
                    case 2:
                        return 99;
                    case 3:
                    default:
                        return 999;
                }
            },

            _maximumValue: function () {
                switch (this.format.length) {
                    case 1:
                        return 9;
                    case 2:
                        return 99;
                    case 3:
                    default:
                        return 999;
                }
            },

            dateParser: function (formattedDateTime, that) {
                if (formattedDateTime == null)
                    return "";
                var value = that._format(formattedDateTime.dateTime, this.format.length == 1 ? '%' + this.format : this.format, this.culture);
                return value;
            },

            dateParserInEditMode: function (val, format, that) {
                if (val == null)
                    return "";

                var value = that._format(val.toString(), format.length == 1 ? '%' + format : format, this.culture);
                return value;
            },

            getDateTimeEditorByItemType: function (value, that) {
                switch (this.type) {
                    case 'FORMAT_AMPM':
                        var aMpMEditor = $.jqx._jqxDateTimeInput.AmPmEditor._createAmPmEditor(this.format, value.hour / 12, that.localization.calendar.AM[0], that.localization.calendar.PM[0], this, that);
                        var newEditor = $.extend({}, aMpMEditor);
                        return newEditor;
                    case 'Character':
                        return null;
                    case 'Day':
                        var year = value.year;
                        var month = value.month;
                        var dayNames;
                        if (this.format.length == 3)
                            dayNames = that.localization.calendar.days.namesAbbr;
                        else if (this.format.length > 3)
                            dayNames = that.localization.calendar.days.names;
                        else
                            dayNames = null;

                        var val = value.day;
                        if (dayNames != null)
                            val = value.dayOfWeek + 1;

                        var dayEditor = $.jqx._jqxDateTimeInput.DateEditor._createDayEditor(value, value.day, 1, value._daysInMonth(year, month), this.format.length == 1 ? 1 : 2, 2, dayNames, this, that);
                        var newEditor = $.extend({}, dayEditor);
                        return newEditor;
                    case 'FORMAT_hh':
                        var initialValue = value.hour % 12;
                        if (initialValue == 0)
                            initialValue = 12;
                        var hhEditor = $.jqx._jqxDateTimeInput.NumberEditor._createNumberEditor(initialValue, 1, 12, this.format.length == 1 ? 1 : 2, 2, this, that);
                        var newEditor = $.extend({}, hhEditor);
                        return newEditor;
                    case 'FORMAT_HH':
                        var HHEditor = $.jqx._jqxDateTimeInput.NumberEditor._createNumberEditor(value.hour, 0, 23, this.format.length == 1 ? 1 : 2, 2, this, that);
                        var newEditor = $.extend({}, HHEditor);
                        return newEditor;
                    case 'Millisecond':
                        var milisecondEditor = $.jqx._jqxDateTimeInput.NumberEditor._createNumberEditor(value.millisecond / this._itemValue(), 0, this._maximumValue(), this.format.length, this.format.length, this, that);
                        var newEditor = $.extend({}, milisecondEditor);
                        return newEditor;
                    case 'Minute':
                        var minuteEditor = $.jqx._jqxDateTimeInput.NumberEditor._createNumberEditor(value.minute, 0, 59, this.format.length == 1 ? 1 : 2, 2, this, that);
                        var newEditor = $.extend({}, minuteEditor);
                        return newEditor;
                    case 'Month':
                        var monthNames;
                        if (this.format.length == 3)
                            monthNames = that.localization.calendar.months.namesAbbr;
                        else if (this.format.length > 3)
                            monthNames = that.localization.calendar.months.names;
                        else
                            monthNames = null;
                        var monthEditor = $.jqx._jqxDateTimeInput.DateEditor._createMonthEditor(value.month, this.format.length == 2 ? 2 : 1, monthNames, this, that);
                        var newEditor = $.extend({}, monthEditor);
                        return newEditor;
                    case 'ReadOnly':
                        return $.jqx._jqxDateTimeInput.DisabledEditor._create(this.format.length, value.day, this, that);
                    case 'Second':
                        var secondEditor = $.jqx._jqxDateTimeInput.NumberEditor._createNumberEditor(value.second, 0, 59, this.format.length == 1 ? 1 : 2, 2, this, that);
                        var newEditor = $.extend({}, secondEditor);
                        return newEditor;
                    case 'Year':
                        var yearEditor = $.jqx._jqxDateTimeInput.DateEditor._createYearEditor(value.year, (that.yearCutoff !== null && this.format === 'yy') ? 2 : 4, this, that);
                        var newEditor = $.extend({}, yearEditor);
                        return newEditor;
                }

                return null;
            }

            //getDateTimeWithOffset: function(offset, value)
            //{
            //    if (offset == null || value == null)
            //    {
            //        throw 'Invalid arguments';
            //    }

            //    var hours = value.hour;
            //    var minutes = value.minute;
            //    var seconds = value.second;
            //    var days = value.day();
            //    var months = value.month();
            //    var years = value.year();

            //    var dateTime = value;
            //    var newDateTime = value;

            //    switch (this.type)
            //    {
            //        case 'FORMAT_AMPM':
            //            hours = 12 * (offset - hours / 12);
            //            break;
            //        case 'Day':
            //            days = offset - days;
            //            if (days != offset)
            //            {
            //                if (offset == 29 && months == 2)
            //                {
            //                    newDateTime = dateTime;
            //                    while (!DateTime._isLeapYear(newDateTime.year))
            //                    {
            //                        newDateTime = newDateTime._addYears(1);
            //                    }

            //                        newDateTime = newDateTime._addDays(offset - newDateTime.day);
            //                }
            //                else
            //                {
            //                    newDateTime = dateTime._addMonths(1 - dateTime.month);
            //                    newDateTime = newDateTime._addDays(offset - dateTime.day);
            //                }
            //            }
            //            break;
            //        case 'FORMAT_hh':
            //            var res = offset == 12 ? 0 : offset;
            //            dateTime = dateTime._addHours(res - (dateTime.hour % 12));
            //            break;
            //        case 'FORMAT_HH':
            //            dateTime = dateTime._addHours(offset - dateTime.hour);
            //            break;
            //        case 'Millisecond':
            //            dateTime = dateTime._addMilliseconds(offset * this._itemValue() - dateTime.millisecond);
            //            break;
            //        case 'Minute':
            //            dateTime = dateTime._addMinutes(offset - dateTime.minute);
            //            break;
            //        case 'Month':
            //            newDateTime = dateTime._addMonths(offset - dateTime.month);
            //            if (offset == 2 && dateTime.day == 29 && dateTime.day != newDateTime.day
            //                )
            //            {
            //                newDateTime = dateTime;
            //                while (!dateTime.IsLeapYear(newDateTime.year))
            //                {
            //                    newDateTime = newDateTime._addYears(1);
            //                }

            //                newDateTime = newDateTime._addMonths(offset - newDateTime.month);
            //            }

            //            dateTime = newDateTime;
            //            break;
            //        case 'ReadOnly':
            //            break;
            //        case 'Second':
            //            dateTime = dateTime._addSeconds(offset - dateTime.second);

            //            break;
            //        case 'Year':
            //            if (offset == 0)
            //                offset = 1;

            //            dateTime = dateTime._addYears(offset - value.year);
            //            break;
            //    }
            //    return dateTime;
            //}
        });
    })(jqxBaseFramework);

    (function ($) {
        $.jqx._jqxDateTimeInput.DateEditor = $.extend($.jqx._jqxDateTimeInput.DateEditor, {

            formatValueLength: 0,
            handleYears: false,
            handleDays: false,
            handleMonths: false,
            positions: 0,
            value: 0,
            minEditPositions: 0,
            maxEditPositions: 0,
            minValue: 0,
            maxValue: 0,
            item: null,
            dateTimeFormatInfo: null,
            days: null,
            dateTimeMonths: null,
            lastDayInput: null,

            minPositions: function () {
                if (this.handleYears) {
                    if (this.formatValueLength == 4) {
                        if (this.positions <= 1) {
                            return 1;
                        }
                        else {
                            if (this.positions >= 4) {
                                return 4;
                            }
                        }

                        return this.positions;
                    }
                    else {
                        return this.minEditPositions;
                    }
                }
                return this.minEditPositions;
            },

            initializeFields: function (minValue, maxValue, minEditPositions, maxEditPositions, item) {
                this.minValue = minValue;
                this.maxValue = maxValue;
                this.minEditPositions = minEditPositions;
                this.maxEditPositions = maxEditPositions;
                this.updateActiveEditor(minValue);
                this.item = item;
            },

            _createYearEditor: function (baseYear, formatValueLength, item, that) {
                $.jqx._jqxDateTimeInput.DateEditor = $.extend(true, {}, this);
                this.initializeFields(formatValueLength <= 4 ? 0 : 0, formatValueLength < 4 ? 99 : 9999, (formatValueLength == 2) ? 2 : 1, formatValueLength > 3 ? 4 : 2, item);
                this.initializeYearEditor(baseYear, formatValueLength, item.culture);
                this.handleYears = true;
                this.that = that;
                return this;
            },

            initializeYearEditor: function (baseYear, formatValueLength, info) {
                this.formatValueLength = formatValueLength;
                this.dateTimeFormatInfo = info;

                var realYear = baseYear;
                realYear = Math.min(realYear, 9999);
                realYear = Math.max(realYear, 1);
                realYear = this.formatValueLength < 4 ? realYear % 100 : realYear;
                this.updateActiveEditor(realYear);
                this.value = realYear;
            },

            updateActiveEditor: function (newValue) {
                this.value = newValue;
                this.positions = 0;
            },

            _createDayEditor: function (editedValue, initialValue, minValue, maxValue, minEditingPositions, maxEditingPositions, dayKeys, item, that) {
                $.jqx._jqxDateTimeInput.DateEditor = $.extend(true, {}, this);
                this.initializeFields(minValue, maxValue, 1, maxEditingPositions, item);
                this.currentValue = editedValue;
                this.value = initialValue;
                this.days = dayKeys;
                this.handleDays = true;
                this.that = that;
                return this;
            },

            getDayOfWeek: function (val) {
                if (typeof this.currentValue == $.jqx._jqxDateTimeInput.DateTime) {
                    this.currentValue.dayOfWeek();
                }
                return val;
            },

            defaultTextValue: function () {
                var value = this.value;
                var minPositions = this.minEditPositions;
                var minFormattedPositions = minPositions;
                var formattedValue = this.that._format(this.value, "d" + minFormattedPositions, "");

                return formattedValue;
            },

            textValue: function () {
                if (this.handleDays) {
                    if (this.days == null) {
                        return this.defaultTextValue();
                    }
                    else {
                        var val = (this.value % 7) + 1;
                        val = this.getDayOfWeek(val);
                        return this.days[val];
                    }
                }
                else if (this.handleMonths) {
                    if (this.dateTimeMonths == null || this.value < 1 || this.value > 12) {
                        return this.defaultTextValue();
                    }
                    else {
                        return this.dateTimeMonths[this.value - 1];
                    }
                }
                return this.defaultTextValue();
            },

            defaultInsertString: function (inseredValue) {
                if (inseredValue == null) {
                    return this.deleteValue();
                }

                if (inseredValue.length == 0) {
                    return this.deleteValue();
                }

                var character = inseredValue.substring(0, 1);
                if (isNaN(character)) {
                    return;
                }

                var res = true;
                var tmp;
                var entries = 1;
                var formattedValue = this.that._format(Number(this.value), "d" + this.maxEditPositions, this.culture)
                tmp = formattedValue;
                if (this.positions >= this.maxEditPositions) {
                    this.positions = 0;
                }

                tmp = tmp.substring(0, this.positions) + character + tmp.substring(this.positions + 1);
                tmp = this.setValueByString(tmp, entries);
                return true;
            },

            setValueByString: function (tmp, entries) {
                tmp = this.fixValueString(tmp);
                var nextValue = new Number(tmp);
                this.value = nextValue;
                this.positions += entries;
                return tmp;
            },

            fixValueString: function (tmp) {
                if (tmp.length > this.maxEditPositions) {
                    tmp = tmp.substring(tmp.length - this.maxEditPositions);
                }

                //            var enteredDigit = parseInt(tmp[this.positions]);
                //            var pos = this.maxEditPositions - 1;
                //            while(parseInt(tmp) > this.maxValue)
                //            {
                //                if (pos < 0)
                //                    break;

                //                if (tmp[pos] > 0)
                //                {
                //                    var digit = parseInt(tmp[pos])-1;
                //                    tmp = tmp.substring(0, pos) + digit + tmp.substring(pos+1);
                //                }
                //                else pos--;
                //            }

                return tmp;
            },

            initializeValueString: function (formattedValue) {
                var tmp;
                tmp = "";

                if (this.hasDigits()) {
                    tmp = formattedValue;
                }
                return tmp;
            },

            deleteValue: function () {
                if (this.value == this.minValue && this.hasDigits() == false) {
                    return false;
                }

                this.updateActiveEditor(this.minValue);
                return true;
            },

            hasDigits: function () {
                return this.positions > 0;
            },

            insert: function (input) {
                if (this.handleDays) {
                    if (this.days != null) {
                        var res = false;
                        res = this.insertLongString(input, res);
                        if (res) {
                            return res;
                        }
                        res = this.insertShortString(input, res);
                        if (res) {
                            return res;
                        }
                    }

                    if (this.value == 1 && this.lastDayInput != null && this.lastDayInput.toString().length > 0 && this.lastDayInput.toString() == "0") {
                        this.value = 0;
                    }

                    this.lastDayInput = input;

                    return this.defaultInsertString(input);
                }
                else if (this.handleMonths) {
                    if (this.dateTimeMonths != null) {
                        var res = false;
                        res = this.insertLongString2(input, res);

                        if (res) {
                            return res;
                        }

                        res = this.insertShortString2(input, res);

                        if (res) {
                            return res;
                        }
                    }
                }
                else if (this.that.yearCutoff !== null && this.handleYears && this.formatValueLength === 2) {
                    if (input == null || input.length == 0) {
                        return this.deleteValue();
                    }

                    var character = input.substring(0, 1);

                    if (isNaN(character)) {
                        return;
                    }

                    if (this.positions >= this.maxEditPositions) {
                        this.positions = 0;
                    }

                    var tmp = this.value.toString().substring(2);

                    tmp = tmp.substring(0, this.positions) + character + tmp.substring(this.positions + 1);

                    this.value = this.that._getYearBasedOnCutoff(tmp);
                    this.positions += 1;

                    return true;
                }

                return this.defaultInsertString(input);
            },

            insertShortString: function (input, res) {
                if (input.length == 1) {
                    for (var i = 0; i < 6; ++i) {
                        var testedDay = (this.value + i) % 7 + 1;
                        var dayName = this.days[testedDay - 1];
                        if (dayName.substring(0, 1) == input) {
                            this.updateActiveEditor(testedDay);
                            res = true;
                            return res;
                        }
                    }
                }
                return res;
            },

            insertLongString: function (input, res) {
                if (input.length > 0) {
                    for (var i = 0; i < 6; ++i) {
                        var testedDay = (this.value + i) % 7 + 1;
                        if (this.days[testedDay - 1] == input) {
                            this.updateActiveEditor(testedDay);
                            res = true;
                            return res;
                        }
                    }
                }
                return res;
            },

            _createMonthEditor: function (baseValue, positions, monthsNames, item, that) {
                $.jqx._jqxDateTimeInput.DateEditor = $.extend(true, {}, this);

                this.initializeFields(1, 12, positions, 2, item);
                this.dateTimeMonths = monthsNames;
                this.value = baseValue;
                if (this.dateTimeMonths != null && this.dateTimeMonths[12] != null && this.dateTimeMonths[12].length > 0)
                    this.dateTimeMonths = null;
                this.handleMonths = true;
                this.that = that;
                return this;
            },

            insertLongString2: function (input, res) {
                if (input.length > 0) {
                    for (var i = 0; i < 11; ++i) {
                        var month = (this.value + i) % 12 + 1;
                        if (this.dateTimeMonths[month - 1] == input) {
                            this.updateActiveEditor(month);
                            res = true;
                            return res;
                        }
                    }
                }
                return res;
            },

            insertShortString2: function (input, res) {
                if (input.length == 1) {
                    for (var i = 0; i < 11; ++i) {
                        var month = (this.value + i) % 12 + 1;
                        var monthName = this.dateTimeMonths[month - 1];
                        if (monthName.substring(0, 1) == input) {
                            this.updateActiveEditor(month);
                            res = true;
                            return res;
                        }
                    }
                }
                return res;
            },

            correctMaximumValue: function (val) {
                var maxValue = this.maxValue;

                if (this.that.yearCutoff !== null && this.item.type === 'Year' && this.item.format === 'yy') {
                    maxValue = 9999;
                }

                if (val > maxValue) {
                    val = this.minValue;
                }
                return val;
            },

            correctMinimumValue: function (val) {
                if (val < this.minValue) {
                    val = this.maxValue;
                }
                return val;
            },

            increaseValue: function (byPosition) {
                var formattedValue = this.that._format(Number(this.value), "d" + this.maxEditPositions, this.culture)
                var digit = formattedValue.toString()[this.positions];
                digit = parseInt(digit) + 1;
                if (digit > 9) digit = 0;

                if (!byPosition) {
                    var tmpValue = this.value + 1;
                    tmpValue = this.correctMaximumValue(tmpValue);
                    this.updateActiveEditor(tmpValue);
                    return true;
                }

                var val = formattedValue.substring(0, this.positions) + digit + formattedValue.substring(this.positions + 1);

                if (val != this.value || this.hasDigits()) {
                    this.updateActiveEditor(val);
                    return true;
                }
                else {
                    return false;
                }
            },

            decreaseValue: function (byPosition) {
                var formattedValue = this.that._format(Number(this.value), "d" + this.maxEditPositions, this.culture)
                var digit = formattedValue.toString()[this.positions];
                digit = parseInt(digit) - 1;
                if (digit < 0) digit = 9;

                if (!byPosition) {
                    var tmpValue = this.value - 1;
                    tmpValue = this.correctMinimumValue(tmpValue);
                    this.updateActiveEditor(tmpValue);
                    return true;
                }

                var val = formattedValue.substring(0, this.positions) + digit + formattedValue.substring(this.positions + 1);

                if (val != this.value || this.hasDigits()) {
                    this.updateActiveEditor(val);
                    return true;
                }
                else {
                    return false;
                }
            },

            getDateTimeItem: function () {
                return this.item;
            }
        })
    })(jqxBaseFramework);

    //Number Editor
    (function ($) {
        $.jqx._jqxDateTimeInput.NumberEditor = {};
        $.extend($.jqx._jqxDateTimeInput.NumberEditor, {

            formatValueLength: 0,
            positions: 0,
            value: 0,
            minEditPositions: 0,
            maxEditPositions: 0,
            minValue: 0,
            maxValue: 0,
            item: null,

            minPositions: function () {
                if (this.handleYears) {
                    if (this.formatValueLength == 4) {
                        if (this.positions <= 1) {
                            return 1;
                        }
                        else {
                            if (this.positions >= 4) {
                                return 4;
                            }
                        }

                        return this.positions;
                    }
                    else {
                        return this.minEditPositions;
                    }
                }
                return this.minEditPositions;
            },

            _createNumberEditor: function (value, minValue, maxValue, minEditPositions, maxEditPositions, item, that) {
                $.jqx._jqxDateTimeInput.NumberEditor = $.extend(true, {}, this);
                this.initializeFields(minValue, maxValue, minEditPositions, maxEditPositions, item);
                this.that = that;

                return this;
            },

            initializeFields: function (minValue, maxValue, minEditPositions, maxEditPositions, item) {
                this.minValue = minValue;
                this.maxValue = maxValue;
                this.minEditPositions = minEditPositions;
                this.maxEditPositions = maxEditPositions;
                this.updateActiveEditor(minValue);
                this.item = item;
            },

            updateActiveEditor: function (newValue) {
                this.value = newValue;
                this.positions = 0;
            },

            getDayOfWeek: function (val) {
                if (typeof this.currentValue == $.jqx._jqxDateTimeInput.DateTime) {
                    this.currentValue.dayOfWeek();
                }
                return val;
            },

            textValue: function () {
                var value = this.value;
                var minPositions = this.minEditPositions;
                var minFormattedPositions = minPositions;
                var formattedValue = this.that._format(this.value, "d" + minFormattedPositions, "");

                return formattedValue;
            },

            insert: function (inseredValue) {
                if (inseredValue == null) {
                    return this.deleteValue();
                }

                if (inseredValue.length == 0) {
                    return this.deleteValue();
                }

                var character = inseredValue.substring(0, 1);
                if (isNaN(character)) {
                    return;
                }

                var res = true;
                var tmp;
                var entries = 1;
                var formattedValue = this.that._format(Number(this.value), "d" + this.maxEditPositions, this.culture)
                tmp = formattedValue;
                if (this.positions >= this.maxEditPositions) {
                    this.positions = 0;
                }

                tmp = tmp.substring(0, this.positions) + character + tmp.substring(this.positions + 1);
                tmp = this.setValueByString(tmp, entries);
                return true;
            },

            setValueByString: function (tmp, entries) {
                tmp = this.fixValueString(tmp);
                var nextValue = new Number(tmp);
                this.value = nextValue;
                this.positions += entries;
                return tmp;
            },

            fixValueString: function (tmp) {
                if (tmp.length > this.maxEditPositions) {
                    tmp = tmp.substring(tmp.length - this.maxEditPositions);
                }

                //            var enteredDigit = parseInt(tmp[this.positions]);
                //            var pos = this.maxEditPositions - 1;
                //            while(parseInt(tmp) > this.maxValue)
                //            {
                //                if (pos < 0)
                //                    break;

                //                if (tmp[pos] > 0)
                //                {
                //                    var digit = parseInt(tmp[pos])-1;
                //                    tmp = tmp.substring(0, pos) + digit + tmp.substring(pos+1);
                //                }
                //                else pos--;
                //            }

                return tmp;
            },

            initializeValueString: function (formattedValue) {
                var tmp;
                tmp = "";

                if (this.hasDigits()) {
                    tmp = formattedValue;
                }
                return tmp;
            },

            deleteValue: function () {
                if (this.value == this.minValue && this.hasDigits() == false) {
                    return false;
                }

                this.updateActiveEditor(this.minValue);
                return true;
            },

            hasDigits: function () {
                return this.positions > 0;
            },

            correctMaximumValue: function (val) {
                if (val > this.maxValue) {
                    val = this.minValue;
                }
                return val;
            },

            correctMinimumValue: function (val) {
                if (val < this.minValue) {
                    val = this.maxValue;
                }
                return val;
            },

            increaseValue: function (byPosition) {
                var formattedValue = this.that._format(Number(this.value), "d" + this.maxEditPositions, this.culture)
                var digit = formattedValue.toString()[this.positions];
                digit = parseInt(digit) + 1;
                if (digit > 9) digit = 0;

                if (!byPosition) {
                    var tmpValue = this.value + 1;
                    tmpValue = this.correctMaximumValue(tmpValue);
                    this.updateActiveEditor(tmpValue);
                    return true;
                }

                var val = formattedValue.substring(0, this.positions) + digit + formattedValue.substring(this.positions + 1);

                if (val != this.value || this.hasDigits()) {
                    this.updateActiveEditor(val);
                    return true;
                }
                else {
                    return false;
                }
            },

            decreaseValue: function (byPosition) {
                var formattedValue = this.that._format(Number(this.value), "d" + this.maxEditPositions, this.culture)
                var digit = formattedValue.toString()[this.positions];
                digit = parseInt(digit) - 1;
                if (digit < 0) digit = 9;

                if (!byPosition) {
                    var tmpValue = this.value - 1;
                    tmpValue = this.correctMinimumValue(tmpValue);
                    this.updateActiveEditor(tmpValue);
                    return true;
                }

                var val = formattedValue.substring(0, this.positions) + digit + formattedValue.substring(this.positions + 1);

                if (val != this.value || this.hasDigits()) {
                    this.updateActiveEditor(val);
                    return true;
                }
                else {
                    return false;
                }
            },

            getDateTimeItem: function () {
                return this.item;
            }
        })
    })(jqxBaseFramework);

    //DisabledEditor
    (function ($) {

        $.jqx._jqxDateTimeInput.DisabledEditor = {};
        $.extend($.jqx._jqxDateTimeInput.DisabledEditor, {

            _create: function (format, baseValue, am, pm, item, that) {
                this.format = format;
                this.value = -1;
                this.item = item;
                this.that = that;

                return this;
            },

            textValue: function () {
                return "";
            },

            insert: function (val) {
                return false;
            },

            deleteValue: function () {
                return false;
            },

            increaseValue: function () {
                return false;
            },

            decreaseValue: function () {
                return false;
            },

            getDateTimeItem: function () {
                return this.item;
            }
        })
    })(jqxBaseFramework);

    //AmPmEditor
    (function ($) {

        $.jqx._jqxDateTimeInput.AmPmEditor = {};
        $.extend($.jqx._jqxDateTimeInput.AmPmEditor, {
            _createAmPmEditor: function (format, baseValue, am, pm, item, that) {
                this.format = format;
                this.value = baseValue;
                this.minValue = 0;
                this.amString = am;
                this.pmString = pm;
                this.item = item;
                this.that = that;

                if (am == pm) {
                    this.amString = "<" + am;
                    this.pmString = ">" + pm;
                }
                return this;
            },

            textValue: function () {
                var res = this.amString;
                if (this.value != 0) {
                    res = this.pmString;
                }

                if (this.format.length == 1 && res.length > 1) {
                    res = res.substring(0, 1);
                }

                return res;
            },

            insert: function (val) {
                var inserted = val.toString();
                if (inserted.Length == 0) {
                    return this.deleteValue();
                }

                var res = false;
                if (this.amString.Length > 0
                    && this.pmString.Length > 0) {
                    var amChar = this.amString[0];
                    var newChar = inserted[0];
                    var pmChar = this.pmString[0];

                    if (amChar.toString() == newChar.toString()) {
                        this.value = 0;
                        res = true;

                    }
                    else if (pmChar.toString() == newChar.toString()) {
                        this.value = 1;
                        res = true;
                    }
                }
                else if (this.pmString.Length > 0) {
                    this.value = 1;
                    res = true;
                }
                else if (this.amString.Length > 0) {
                    this.value = 0;
                    res = true;
                }

                return res;
            },

            deleteValue: function () {
                var isValid = true;

                if (this.amString.Length == 0
                    && this.pmString.Length != 0) {
                    if (this.value == 0) {
                        return false;
                    }

                    this.value = 0;
                }
                else {
                    if (this.value == 1) {
                        return false;
                    }

                    this.value = 1;
                }
                return isValid;
            },

            increaseValue: function () {
                this.value = 1 - this.value;
                return true;
            },

            decreaseValue: function () {
                this.increaseValue();
                return true;
            },

            getDateTimeItem: function () {
                return this.item;
            }
        })
    })(jqxBaseFramework);

    // DateTime
    (function ($) {
        $.jqx._jqxDateTimeInput.getDateTime = function (date) {
            var result =
            {
                dateTime: new Date(date),
                daysPer4Years: 0x5b5,
                daysPerYear: 0x16d,
                daysToMonth365: { 0: 0, 1: 0x1f, 2: 0x3b, 3: 90, 4: 120, 5: 0x97, 6: 0xb5, 7: 0xd4, 8: 0xf3, 9: 0x111, 10: 0x130, 11: 0x14e, 12: 0x16d },
                daysToMonth366: { 0: 0, 1: 0x1f, 2: 60, 3: 0x5b, 4: 0x79, 5: 0x98, 6: 0xb6, 7: 0xd5, 8: 0xf4, 9: 0x112, 10: 0x131, 11: 0x14f, 12: 0x16e },
                maxValue: 0x2bca2875f4373fff,
                millisPerDay: 0x5265c00,
                millisPerHour: 0x36ee80,
                millisPerMinute: 0xea60,
                millisPerSecond: 0x3e8,
                minTicks: 0,
                minValue: 0,
                ticksPerDay: 0xc92a69c000,
                ticksPerHour: 0x861c46800,
                ticksPerMillisecond: 0x2710,
                ticksPerMinute: 0x23c34600,
                ticksPerSecond: 0x989680,
                hour: date.getHours(),
                minute: date.getMinutes(),
                day: date.getDate(),
                second: date.getSeconds(),
                month: 1 + date.getMonth(),
                year: date.getFullYear(),
                millisecond: date.getMilliseconds(),
                dayOfWeek: date.getDay(),
                isWeekend: function (value) {
                    if (value == undefined || value == null)
                        value = this.dateTime;

                    var isWeekend = value.getDay() % 6 == 0;
                    return isWeekend;
                },
                dayOfYear: function (value) {
                    if (value == undefined || value == null)
                        value = this.dateTime;

                    var firstDay = new Date(value.getFullYear(), 0, 1);
                    return Math.ceil((value - firstDay) / 86400000);
                },
                _setDay: function (value) {
                    if (value == undefined || value == null)
                        value = 0;

                    this.dateTime.setDate(value);
                    this.day = this.dateTime.getDate();
                },
                _setMonth: function (value) {
                    if (value == undefined || value == null)
                        value = 0;

                    this.dateTime.setMonth(value - 1);
                    this.month = 1 + this.dateTime.getMonth();
                },
                _setYear: function (value) {
                    if (value == undefined || value == null)
                        value = 0;

                    this.dateTime.setFullYear(value);
                    this.year = this.dateTime.getFullYear();
                },
                _setHours: function (value) {
                    if (value == undefined || value == null)
                        value = 0;

                    this.dateTime.setHours(value);
                    this.hour = this.dateTime.getHours();
                },
                _setMinutes: function (value) {
                    if (value == undefined || value == null)
                        value = 0;

                    this.dateTime.setMinutes(value);
                    this.minute = this.dateTime.getMinutes();
                },
                _setSeconds: function (value) {
                    if (value == undefined || value == null)
                        value = 0;

                    this.dateTime.setSeconds(value);
                    this.second = this.dateTime.getSeconds();
                },
                _setMilliseconds: function (value) {
                    if (value == undefined || value == null)
                        value = 0;

                    this.dateTime.setMilliseconds(value);
                    this.millisecond = this.dateTime.getMilliseconds();
                },
                _addDays: function (value) {
                    var newDate = this.dateTime;
                    var day = newDate.getDate();
                    newDate.setDate(newDate.getDate() + value);
                    if (day === newDate.getDate()) {
                        newDate.setHours(newDate.getHours() + newDate.getTimezoneOffset() / 60);
                    }
                    return newDate;
                },
                _addWeeks: function (value) {
                    var newDate = this.dateTime;
                    newDate.setDate(newDate.getDate() + 7 * value);
                    return newDate;
                },
                _addMonths: function (value) {
                    var newDate = this.dateTime;
                    newDate.setMonth(newDate.getMonth() + value);
                    return newDate;
                },
                _addYears: function (value) {
                    var newDate = this.dateTime;
                    newDate.setFullYear(newDate.getFullYear() + value);
                    return newDate;
                },
                _addHours: function (value) {
                    var newDate = this.dateTime;
                    newDate.setHours(newDate.getHours() + value);
                    return newDate;
                },
                _addMinutes: function (value) {
                    var newDate = this.dateTime;
                    newDate.setMinutes(newDate.getMinutes() + value);
                    return newDate;
                },
                _addSeconds: function (value) {
                    var newDate = this.dateTime;
                    newDate.setSeconds(newDate.getSeconds() + value);
                    return newDate;
                },
                _addMilliseconds: function (value) {
                    var newDate = this.dateTime;
                    newDate.setMilliseconds(newDate.getMilliseconds() + value);
                    return newDate;
                },
                _isLeapYear: function (year) {
                    if ((year < 1) || (year > 0x270f)) {
                        throw "invalid year";
                    }
                    if ((year % 4) != 0) {
                        return false;
                    }
                    if ((year % 100) == 0) {
                        return ((year % 400) == 0);
                    }
                    return true;
                },
                _dateToTicks: function (year, month, day) {
                    if (((year >= 1) && (year <= 0x270f)) && ((month >= 1) && (month <= 12))) {
                        var numArray = this._isLeapYear(year) ? this.daysToMonth366 : this.daysToMonth365;
                        if ((day >= 1) && (day <= (numArray[month] - numArray[month - 1]))) {
                            var year = year - 1;
                            var ticks = ((((((year * 0x16d) + (year / 4)) - (year / 100)) + (year / 400)) + numArray[month - 1]) + day) - 1;
                            return (ticks * 0xc92a69c000);
                        }
                    }
                },
                _daysInMonth: function (year, month) {
                    if ((month < 1) || (month > 12)) {
                        throw ("Invalid month.");
                    }
                    var arr = this._isLeapYear(year) ? this.daysToMonth366 : this.daysToMonth365;
                    return (arr[month] - arr[month - 1]);
                },
                _timeToTicks: function (hour, minute, second) {
                    var ticks = ((hour * 0xe10) + (minute * 60)) + second;
                    return (ticks * 0x989680);
                },
                _equalDate: function (date) {
                    if (this.year == date.getFullYear() && this.day == date.getDate() && this.month == date.getMonth() + 1)
                        return true;

                    return false;
                }
            }
            return result;
        }
    })(jqxBaseFramework);
})();



/***/ }),

/***/ 5875:
/***/ (() => {

/* tslint:disable */
/* eslint-disable */
(function () {
    if (typeof document === 'undefined') {
        return;
    }

    (function ($) {
        'use strict';
        $.jqx.jqxWidget('jqxInput', '', {});

        $.extend($.jqx._jqxInput.prototype, {
            defineInstance: function () {
                var that = this;
                var settings = {
                    disabled: false,
                    filter: that._filter,
                    sort: that._sort,
                    highlight: that._highlight,
                    dropDownWidth: null,
                    renderer: that._renderer,
                    opened: false,
                    $popup: document.createElement('ul'),
                    source: [],
                    roundedCorners: true,
                    searchMode: 'default',
                    placeHolder: '',
                    width: null,
                    height: null,
                    value: '',
                    rtl: false,
                    enableBrowserBoundsDetection: true,
                    hint: true,
                    displayMember: '',
                    valueMember: '',
                    inlineAutoComplete: false,
                    events: ['select', 'open', 'close', 'change'],
                    popupZIndex: 1000,
                    items: 8,
                    query: '',
                    minLength: 1,
                    maxLength: null,
                    aiKey: ''
                };
                if (this === $.jqx._jqxInput.prototype) {
                    return settings;
                }
                $.extend(true, this, settings);
                return settings;
            },

            createInstance: function () {
                var that = this;
                if (that.host.css('display') === 'none' || document.body.contains(that.element) === false) {
                    that._initiallyHidden = true;
                }
                that._popupHelper = $(that.$popup);
                that.render();
            },

            getAISuggestions: function (callback) {
                var that = this;
                var response = '';
                if (!that.aiKey) {
                    callback('');
                }

                function buildPrompt(textBefore, textAfter) {
                    var systemMessageBuilder = [];
                    systemMessageBuilder.push("Predict what text the user in the given ROLE would insert after the cursor position indicated by ^^^. Auto-correct the text.\n");
                    systemMessageBuilder.push("RULES:\n");
                    systemMessageBuilder.push("1. Reply with OK:, then in square brackets the predicted text, then END_INSERTION, and no other output.\n");
                    systemMessageBuilder.push("2. When a specific value or quantity cannot be inferred and would need to be provided, use the word NEED_INFO.\n");
                    systemMessageBuilder.push("3. If there isn't enough information to predict any words that the user would type next, just reply with the word NO_PREDICTION.\n");
                    systemMessageBuilder.push("4. NEVER invent new information. If you can't be sure what the user is about to type, ALWAYS stop the prediction with END_INSERTION.\n");

                    /*
                    if (that.userPhrases.length) {
                        systemMessageBuilder.push("\nAlways try to use variations on the following phrases as part of the predictions:\n");
                        for (let i = 0; i < that.userPhrases.length; i++) {
                            systemMessageBuilder.push("- {0}\n", that.userPhrases[i]);
                        }
                    }*/

                    systemMessageBuilder.push("\n\nROLE: " + "User" + " USER_TEXT: " + textBefore + textAfter + "^^^");

                    return systemMessageBuilder.join('\n');
                }

                function fetchAIResponse(prompt, callback) {
                    var apiKey = that.aiKey;  // Replace this with your OpenAI API key (don't expose it on public websites)

                    var headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + apiKey
                    };

                    var body = JSON.stringify({
                        model: "gpt-3.5-turbo", // or "gpt-4" if you have access
                        messages: [{ role: "user", content: prompt }], // The conversation format
                        //      stop_frequences: ["END_INSERTION", "NEED_INFO"],
                        max_tokens: 200 // You can adjust token length based on your needs,
                    });

                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'https://api.openai.com/v1/chat/completions', true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                var response = JSON.parse(xhr.responseText);
                                // Make sure there are choices and content in the response
                                if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
                                    var content = response.choices[0].message.content;

                                    if (content.length > 5 && content.startsWith("OK")) {
                                        content = content.substring(4);
                                        content = content.replace('END_INSERTION', '');

                                        var matches = content.match(/\[(.*?)\]/g);

                                        // Remove the brackets from the extracted text
                                        if (matches) {
                                            // Use map to strip out brackets
                                            var extractedText = matches.map(function (match) {
                                                return match.replace(/^\[|\]$/g, '');
                                            });

                                            content = extractedText[0]
                                        }

                                        content = content.replace('[', '');
                                        content = content.replace(']', '');
                                    }

                                    if (content.indexOf('NO_PREDICTION') >= 0) {
                                        content = '';
                                    }

                                    callback(null, content);
                                }
                                else {
                                    callback('Error: No valid response from AI', null);
                                }
                            } else {
                                callback('Error fetching AI response: ' + xhr.statusText, null);
                            }
                        }
                    };

                    xhr.send(body);
                }

                var textBefore = that.input.value.substring(0, that.input.selectionStart);
                var textAfter = that.input.value.substring(that.input.selectionStart + 1);
                var text = textBefore + textAfter;
                if (text.endsWith(' ')) {
                    var prompt = buildPrompt(textBefore, textAfter);
                    fetchAIResponse(prompt.toString(), function (error, aiResponse) {
                        if (error) {
                            callback('');
                        } else {
                            callback(aiResponse);
                        }
                    }
                    );
                }
            },

            render: function () {
                var that = this;

                this.input = this.element;

                if (that.isMaterialized() && this.input instanceof HTMLInputElement) {
                    var children = this.host.children();
                    $.each(children, function (index) {
                        var classToAdd = 'jqx-input-group-addon';
                        $(this).removeClass(that.toThemeProperty('jqx-rc-all'));
                        if (index === 0) {
                            classToAdd += ' jqx-rc-l';
                        }
                        if (index === children.length - 1) {
                            classToAdd += ' jqx-rc-r';
                        }
                        if (this !== that.element) {
                            classToAdd += ' jqx-fill-state-normal';
                        }
                        this.className += ' ' + that.toThemeProperty(classToAdd);
                    });

                    var group = $("<div></div>");
                    group.addClass(that.toThemeProperty('jqx-input-group'));
                    this.host.after(group);
                    var input = this.element;
                    var data = this.host.data();


                    group.append(input);
                    var label = $("<label></label");

                    if (this.hint) {
                        label[0].innerHTML = this.placeHolder;
                    }

                    label.addClass(that.toThemeProperty('jqx-input-label'));
                    group.append(label);

                    var autoCompleteLabel = $("<label class='jqx-input-inline'></label");
                    autoCompleteLabel[0].style.display = 'none';
                    this._inlineLabel = autoCompleteLabel[0];

                    group.append(autoCompleteLabel);


                    var bar = $("<span></span>");
                    group.append(bar);
                    bar.addClass(that.toThemeProperty('jqx-input-bar'));

                    group[0].id = this.element.id;
                    this.element.removeAttribute('id');

                    group[0].style.cssText = this.element.style.cssText;
                    if (this.element.className.indexOf('underlined') >= 0) {
                        group.addClass('underlined');
                    }

                    that.input = that.element;
                    if (!(this.input instanceof HTMLInputElement)) {
                        this.input = this.host.find('input');
                        if (this.input.length > 0) {
                            this.input = this.input[0];
                        }
                        $(this.input).addClass(this.toThemeProperty("jqx-input-widget"));
                    }
                    this.label = label;
                    this.bar = bar;
                    this.element.style.cssText = '';
                    this.host = group;
                    this.element = group[0];
                    this.host.data(data);

                    var that = this;

                    if (that.template) {
                        that.bar.addClass(that.toThemeProperty("jqx-" + that.template));
                        that.label.addClass(that.toThemeProperty("jqx-" + that.template));
                    }

                    if (children.length > 0) {
                        that._hasAddons = true;
                    }
                }
                else if (this.element.nodeName.toLowerCase() === 'textarea') {
                    this.element.style.overflow = 'auto';
                } else
                    if (this.element.nodeName.toLowerCase() === 'div') {
                        this.baseHost = this.element;
                        var input = that.element.getElementsByTagName('input');
                        var hasTextInput = false;

                        $.each(input, function () {
                            var type = this.type;
                            if (type == null || type === 'text' || type === 'textarea') {
                                input = $(this);
                                hasTextInput = true;
                                return false;
                            }
                        });
                        if (!hasTextInput) {
                            throw new Error('jqxInput: Missing Text Input in the Input Group');
                        }

                        if (input.length > 0) {
                            this.baseHost = $(this.element);
                            that.baseElement = that.element;
                            var data = this.host.data();
                            this.host = input;
                            this.element = input[0];
                            that.input = input[0];
                            this.host.data(data);
                            that.baseElement.className += ' ' + that.toThemeProperty('jqx-widget jqx-rc-all jqx-input-group');
                            var children = this.baseHost.children();
                            $.each(children, function (index) {
                                var classToAdd = 'jqx-input-group-addon';
                                $(this).removeClass(that.toThemeProperty('jqx-rc-all'));
                                if (index === 0) {
                                    classToAdd += ' jqx-rc-l';
                                }
                                if (index === children.length - 1) {
                                    classToAdd += ' jqx-rc-r';
                                }
                                if (this !== that.element) {
                                    classToAdd += ' jqx-fill-state-normal';
                                }
                                this.className += ' ' + that.toThemeProperty(classToAdd);
                            });
                        }
                    }

                this.addHandlers();
                if (this.rtl) {
                    that.element.className += ' ' + that.toThemeProperty('jqx-rtl');
                }

                that.input.setAttribute('autocomplete', 'off');
                that.input.setAttribute('autocorrect', 'off');
                that.input.setAttribute('spellcheck', false);
                that.input.setAttribute('aria-label', 'Text Box');

                that.element.setAttribute('role', 'textbox');
                that.element.setAttribute('aria-label', 'Input');
                $.jqx.aria(this, 'aria-autocomplete', 'both');
                $.jqx.aria(this, 'aria-disabled', this.disabled);
                $.jqx.aria(this, 'aria-readonly', false);
                $.jqx.aria(this, 'aria-multiline', false);
                if (this.source && this.source.length) {
                    $.jqx.aria(this, 'aria-haspopup', true);
                }
                if (this.value !== '') {
                    this.input.value = this.value;
                }

                this._oldsource = this.source;
                this._updateSource();
            },

            _updateSource: function () {
                var that = this;

                var mapItem = function (item) {
                    if (item === undefined) {
                        return null;
                    }

                    if (typeof item === 'string' || item instanceof String) {
                        return { label: item, value: item };
                    }

                    if (typeof item !== 'string' && item instanceof String === false) {
                        var label = '';
                        var value = '';

                        if (that.displayMember !== '' && that.displayMember !== undefined) {
                            if (item[that.displayMember]) {
                                label = item[that.displayMember];
                            }
                        }

                        if (that.valueMember !== '' && that.valueMember !== undefined) {
                            value = item[that.valueMember];
                        }

                        if (label === '') {
                            label = item.label;
                        }
                        if (value === '') {
                            value = item.value;
                        }

                        return { label: label, value: value };
                    }

                    return item;
                };

                var mapItems = function (source) {
                    var items = [];
                    for (var i = 0; i < source.length; i++) {
                        items[i] = mapItem(source[i]);
                    }
                    return items;
                };

                if (this.source && this.source._source) {
                    this.adapter = this.source;
                    if (this.adapter._source.localdata != null) {
                        this.adapter.unbindBindingUpdate(this.element.id);
                        this.adapter.bindBindingUpdate(this.element.id, function () {
                            that.source = mapItems(that.adapter.records);
                        });
                    }
                    else {
                        var postdata = {};
                        if (this.adapter._options.data) {
                            $.extend(that.adapter._options.data, postdata);
                        }
                        else {
                            if (this.source._source.data) {
                                $.extend(postdata, this.source._source.data);
                            }
                            this.adapter._options.data = postdata;
                        }
                        this.adapter.unbindDownloadComplete(this.element.id);
                        this.adapter.bindDownloadComplete(this.element.id, function () {
                            that.source = mapItems(that.adapter.records);
                        });
                    }
                    this.source.dataBind();
                    return;
                }

                if (!$.isFunction(this.source)) {
                    this.source = mapItems(this.source);
                }
            },

            _refreshClasses: function (add) {
                var func = add ? 'addClass' : 'removeClass',
                    hostClass = 'jqx-widget-content jqx-input-widget jqx-input jqx-widget',
                    popupClass = 'jqx-popup jqx-input-popup jqx-menu jqx-menu-vertical jqx-menu-dropdown jqx-widget jqx-widget-content';

                if ($.jqx.browser.msie) {
                    popupClass += ' jqx-noshadow';
                }
                if (this.roundedCorners) {
                    hostClass += ' jqx-rc-all';
                    popupClass += ' jqx-rc-all';
                }
                if (this.disabled) {
                    hostClass += ' jqx-fill-state-disabled';
                } else {
                    this.host.removeClass(this.toThemeProperty('jqx-fill-state-disabled'));
                }
                this.host[func](this.toThemeProperty(hostClass));
                this._popupHelper[func](this.toThemeProperty(popupClass));
            },

            selectAll: function () {
                var that = this;
                var textbox = this.host;

                if (textbox[0] instanceof HTMLInputElement === false) {
                    textbox = $(that.input);
                }

                setTimeout(function () {
                    if ('selectionStart' in textbox[0]) {
                        textbox[0].focus();
                        textbox[0].setSelectionRange(0, textbox[0].value.length);
                    }
                    else {
                        var range = textbox[0].createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', textbox[0].value.length);
                        range.moveStart('character', 0);
                        range.select();
                    }
                }, 10);
            },

            selectLast: function () {
                var that = this;
                var textbox = this.host;

                if (textbox[0] instanceof HTMLInputElement === false) {
                    textbox = $(that.input);
                }

                this.selectStart(textbox[0].value.length);
            },

            selectFirst: function () {
                //var textbox = this.host;
                this.selectStart(0);
            },

            selectStart: function (index) {
                var that = this;
                var textbox = this.host;

                if (textbox[0] instanceof HTMLInputElement === false) {
                    textbox = $(that.input);
                }

                setTimeout(function () {
                    if ('selectionStart' in textbox[0]) {
                        textbox[0].focus();
                        textbox[0].setSelectionRange(index, index);
                    }
                    else {
                        var range = textbox[0].createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', index);
                        range.moveStart('character', index);
                        range.select();
                    }
                }, 10);
            },

            focus: function () {
                try {
                    var that = this;
                    that.element.focus();
                    setTimeout(function () {
                        that.element.focus();
                    }, 25);

                }
                catch (error) {
                }
            },

            resize: function (width, height) {
                this.width = width;
                this.height = height;
                this.refresh();
            },

            refresh: function () {
                this._refreshClasses(false);
                this._refreshClasses(true);

                if (!this.baseHost) {
                    if (this.width != null && this.width.toString().indexOf("px") != -1) {
                        this.element.style.width = parseInt(this.width) + 'px';
                    }
                    else if (this.width != undefined && !isNaN(this.width)) {
                        this.element.style.width = this.width + 'px';
                    }
                    else {
                        this.element.style.width = this.width;
                    }

                    if (this.height != null && this.height.toString().indexOf("px") != -1) {
                        this.element.style.height = parseInt(this.height) + 'px';;
                    }
                    else if (this.height != undefined && !isNaN(this.height)) {
                        this.element.style.height = this.height + 'px';
                    }
                    else {
                        this.element.style.height = this.height;
                    }
                    if (this._hasAddons) {
                        this._addonsWidth = 35;
                        this.input.style.width = 'calc(100% - ' + this._addonsWidth + 'px)';
                    }
                } else {
                    if (this.width != null && this.width.toString().indexOf("px") != -1) {
                        this.baseElement.style.width = parseInt(this.width) + 'px';
                    }
                    else if (this.width != undefined && !isNaN(this.width)) {
                        this.baseElement.style.width = this.width + 'px';
                    }

                    if (this.height != null && this.height.toString().indexOf("px") != -1) {
                        this.baseElement.style.height = parseInt(this.height) + 'px';
                    }
                    else if (this.height != undefined && !isNaN(this.height)) {
                        this.baseElement.style.height = this.height + 'px';
                    };
                    var that = this,
                        IE8 = $.jqx.browser.msie && $.jqx.browser.version < 9,
                        totalWidth = 0;
                    $.each(this.baseHost.children(), function () {
                        this.style.height = '100%';
                        if (this !== that.element) {
                            totalWidth += $(this).outerWidth();
                        }
                    });
                    that._addonsWidth = totalWidth;
                    if (IE8) {
                        var height = Math.max(0, that.baseElement.offsetHeight - 2);
                        that.element.style.width = Math.max(0, (that.baseElement.offsetWidth - totalWidth - 1)) + 'px';
                        that.element.style.minHeight = height + 'px';
                        that.element.style.lineHeight = height + 'px';
                    } else {
                        that.element.style.width = 'calc(100% - ' + totalWidth + 'px)';
                    }
                    $.jqx.utilities.resize(that.baseHost, function () {
                        if (IE8 && typeof that.width === 'string' && that.width.indexOf('%') !== -1 && !that._initiallyHidden) {
                            that.element.style.width = (that.baseElement.offsetWidth - that._addonsWidth - 1) + 'px';
                        } else if (that._initiallyHidden) {
                            that._addonsWidth = that._getAddonsWidth();
                            if (!IE8) {
                                that.element.style.width = 'calc(100% - ' + that._addonsWidth + 'px)';
                            } else {
                                that.element.style.width = (that.baseElement.offsetWidth - that._addonsWidth - 1) + 'px';
                                var height = that.baseElement.offsetHeight - 2;
                                that.element.style.minHeight = height + 'px';
                                that.element.style.lineHeight = height + 'px';
                            }
                            that._initiallyHidden = false;
                        }
                    });
                }

                if (this.disabled) {
                    this.element.setAttribute('disabled', true);
                } else {
                    this.element.removeAttribute('disabled');
                }
                if (this.maxLength) {
                    this.element.setAttribute('maxlength', this.maxLength);

                    if (this.input) {
                        this.input.setAttribute('maxlength', this.maxLength);
                    }
                }

                if (!this.element.getAttribute('placeholder')) {
                    this._refreshPlaceHolder();
                }
            },

            _refreshPlaceHolder: function () {
                var that = this;

                if (!that.isMaterialized() || !that.hint) {

                    if ('placeholder' in this.input && !($.jqx.browser.msie && $.jqx.browser.version < 9)) {
                        that.input.setAttribute('placeHolder', that.placeHolder);
                    } else {
                        if (that.input.value === '') {
                            that.input.value = that.placeHolder;
                        }
                    }
                }

                if (!that.hint) {
                    return;
                }

                if (that.input.value !== "") {
                    that.element.setAttribute("hint", true);
                }
                else {
                    that.element.removeAttribute("hint");
                }

                if (that.label) {
                    that.label.innerHTML = that.placeHolder;
                }

                if (this._inlineLabel && that.inlineAutoComplete) {
                    this._inlineLabel.style.display = 'none';
                    that.host.css('overflow', 'visible');
                }

            },

            destroy: function () {
                this.removeHandlers();
                if (this.baseHost) {
                    this.baseHost.remove();
                } else {
                    this.host.remove();
                }
                if (this.$popup) {
                    this._popupHelper.remove();
                }
            },

            propertiesChangedHandler: function (object, key, value) {
                if (value.width && value.height && Object.keys(value).length === 2) {
                    object.refresh();
                }
            },

            propertyChangedHandler: function (object, key, oldvalue, value) {
                if (key === 'width' && value !== oldvalue) {
                    if (object.baseHost) {
                        object.baseElement.style.width = object._toPx(value);
                        if ($.jqx.browser.msie && $.jqx.browser.version < 9) {
                            object.element.style.width = (object.baseElement.offsetWidth - object._addonsWidth - 1) + 'px';
                        }
                    } else {
                        object.element.style.width = object._toPx(value);
                    }
                    return;
                }

                if (key === 'placeHolder') {
                    if ((!('placeholder' in object.element) || ($.jqx.browser.msie && $.jqx.browser.version < 9)) && object.input.value === oldvalue) {
                        object.input.value = '';
                    }
                    object._refreshPlaceHolder();
                    return;
                }

                if (object.batchUpdate && object.batchUpdate.width && object.batchUpdate.height && Object.keys(object.batchUpdate).length === 2) {
                    return;
                }

                if (key === 'theme') {
                    $.jqx.utilities.setTheme(oldvalue, value, object.host);
                }

                if (key === 'opened') {
                    if (value) {
                        object.open();
                    } else {
                        object.close();
                    }
                    return;
                }
                if (key === 'source') {
                    object._oldsource = value;
                    object._updateSource();
                }
                if (key === 'displayMember' || key === 'valueMember') {
                    object.source = object._oldsource;
                    object._updateSource();
                }
                if (key === 'disabled') {
                    $.jqx.aria(object, 'aria-disabled', object.disabled);
                }

                if (key === 'value') {
                    object.input.value = value;
                    object._refreshPlaceHolder();
                }

                object.refresh();
            },

            select: function (event, ui, changeType) {
                var that = this;
                var selectedItem = this._find('jqx-fill-state-pressed', this._popupHelper);

                if (this.inlineAutoComplete) {
                    selectedItem = this.element.querySelector('.jqx-input-inline');
                    selectedItem.style.display = 'none';
                    that.host.css('overflow', 'visible');
                }

                var val = selectedItem.getAttribute('data-value');
                var label = selectedItem.getAttribute('data-name');
                this.input.value = this.renderer(label, this.input.value);
                this.selectedItem = { 'label': label, 'value': val };
                this.element.setAttribute('data-value', val);
                this.element.setAttribute('data-label', label);
                this._raiseEvent('0', { 'item': { 'label': label, 'value': val }, 'label': label, 'value': val });
                this._raiseEvent('3', { type: changeType, 'item': { 'label': label, 'value': val }, 'label': label, 'value': val });
                this.value = label;
                return this.close();
            },

            val: function (value) {
                if (arguments.length === 0 || (value != null && typeof (value) === 'object' && !value.label && !value.value)) {
                    if (this.displayMember !== '' && this.valueMember !== '' && this.selectedItem) {
                        if (this.input.value === '') {
                            return '';
                        }
                        return this.selectedItem;
                    }

                    return this.input.value;
                }

                if (value && value.label) {
                    this.selectedItem = { 'label': value.label, 'value': value.value };
                    this.element.setAttribute('data-value', value.value);
                    this.element.setAttribute('data-label', value.label);
                    this.value = value;
                    this.input.value = value.label;
                    if (this.input) {
                        this.input.value = value.label;
                    }
                    return this.input.value;
                }

                this.value = value;
                this.input.value = value;

                this.element.setAttribute('data-value', value);
                this.element.setAttribute('data-label', value);
                if (value && value.label) {
                    this._raiseEvent('3', { type: null, 'item': { 'label': value.label, 'value': value.value }, 'label': value.label, 'value': value.value });
                }
                else {
                    this._raiseEvent('3', { type: null, 'item': { 'label': value, 'value': value }, 'label': value, 'value': value });
                }
                this._refreshPlaceHolder();
                return this.input.value;
            },

            _raiseEvent: function (id, arg) {
                if (arg === undefined) {
                    arg = { owner: null };
                }

                var evt = this.events[id];
                arg.owner = this;

                var event = new $.Event(evt);
                event.owner = this;
                event.args = arg;
                if (event.preventDefault) {
                    event.preventDefault();
                }

                var result = this.host.trigger(event);
                return result;
            },

            _renderer: function (item) {
                return item;
            },

            open: function () {
                if ($.jqx.isHidden(this.host)) {
                    return;
                }

                var position = $.extend({}, this.host.coord(true), {
                    height: this.element.offsetHeight
                });

                if (this.$popup.parentNode !== document.body) {
                    var popupId = this.element.id + '_popup';
                    this.$popup.id = popupId;
                    $.jqx.aria(this, 'aria-owns', popupId);
                    document.body.appendChild(this.$popup);
                }

                this.$popup.style.position = 'absolute';
                this.$popup.style.zIndex = this.popupZIndex;
                this.$popup.style.top = this._toPx(position.top + position.height);
                this.$popup.style.left = this._toPx(position.left);
                this.$popup.style.display = 'block';

                var height = 0;
                var children = this._popupHelper.children();
                $.each(children, function () {
                    height += $(this).outerHeight() + 1;
                });
                this.$popup.style.height = this._toPx(height);

                if (this.enableBrowserBoundsDetection) {
                    var viewHeight = $(window).height() + $(window).scrollTop();
                    var offset = $(this.$popup).offset();
                    var dpHeight = $(this.$popup).outerHeight();

                    if (offset.top + dpHeight > viewHeight) {
                        var newPosition = position.top + position.height - dpHeight - this.host.height();
                        if (newPosition < 0) {
                            newPosition = 0;
                        }
                        this.$popup.style.top = newPosition + 'px';
                    }
                }

                this.opened = true;
                this._raiseEvent('1', { popup: this.$popup });
                $.jqx.aria(this, 'aria-expanded', true);
                return this;
            },

            close: function () {
                if (this._inlineLabel) {
                    this._inlineLabel.style.display = 'none';
                }

                if (!this.opened) {
                    return;
                }

                this.$popup.style.display = 'none';
                this.opened = false;
                this._raiseEvent('2', { popup: this.$popup });
                $.jqx.aria(this, 'aria-expanded', false);
                this._refreshPlaceHolder();
                return this;
            },

            suggest: function () {
                var items;
                var that = this;
                this.query = this.input.value;

                if (that.inlineAutoComplete && that.aiKey) {
                    this.load([]);
                    return;
                }
                if (!this.query || this.query.length < this.minLength) {
                    if (this._inlineLabel) {
                        this._inlineLabel.style.display = 'none';
                    }

                    return this.opened ? this.close() : this;
                }

                if ($.isFunction(this.source)) {
                    items = this.source(this.query, $.proxy(this.load, this));
                }
                else {
                    items = this.source;
                }

                if (items) {
                    return this.load(items);
                }

                return this;
            },

            load: function (originalItems) {
                var that = this,
                    items = [];

                var searchMode = this.searchMode;
                if (this.inlineAutoComplete) {
                    this.searchMode = 'startswith';
                }

                for (var i = 0; i < originalItems.length; i++) {
                    var item = originalItems[i];
                    if (that.filter(item)) {
                        items.push(item);
                    }
                }

                items = this.sort(items);

                if (!items.length) {
                    if (this.inlineAutoComplete) {
                        var labelElement = this.element.querySelector('.jqx-input-inline');
                        labelElement.style.display = 'none';
                        that.host.css('overflow', 'visible');

                        if (that._writeTimer) {
                            clearTimeout(that._writeTimer);
                        }
                        that._writeTimer = setTimeout(function () {
                            that.getAISuggestions(function (suggestion) {
                                if (suggestion) {
                                    suggestion = that.input.value + suggestion;
                                    labelElement.textContent = suggestion;
                                    labelElement.setAttribute('data-value', suggestion);
                                    labelElement.setAttribute('data-name', suggestion);
                                    labelElement.style.opacity = 0.5;
                                    labelElement.style.position = 'absolute';
                                    labelElement.style.zIndex = 5;
                                    labelElement.style.display = '';
                                    labelElement.style.left = '6px';
                                    labelElement.style.lineHeight = that.height + 'px';
                                    that.host.css('overflow', 'hidden');
                                    that.searchMode = searchMode;
                                }
                            });
                        }, 500);
                    }

                    if (this.opened) {
                        return this.close();
                    }
                    else {
                        return this;
                    }
                }

                if (this.inlineAutoComplete) {
                    var item = items.length ? items[0] : '';
                    var label = typeof item === 'string' ? item : item.label;
                    var value = typeof item === 'string' ? item : item.value;
                    var labelElement = this.element.querySelector('.jqx-input-inline');
                    labelElement.textContent = label;
                    labelElement.setAttribute('data-value', value);
                    labelElement.setAttribute('data-name', label);
                    labelElement.style.opacity = 0.5;
                    labelElement.style.position = 'absolute';
                    labelElement.style.zIndex = 5;
                    labelElement.style.display = '';
                    labelElement.style.left = '6px';
                    labelElement.style.lineHeight = that.height + 'px';
                    this.searchMode = searchMode;
                    that.host.css('overflow', 'hidden');

                    this.getAISuggestions(function (suggestion) {
                        if (suggestion) {
                            labelElement.textContent = suggestion;
                        }
                    });
                    return;
                }
                return this._render(items.slice(0, this.items)).open();
            },

            _filter: function (item) {
                var value = this.query;
                var itemValue = item;
                if (item.label != null) {
                    itemValue = item.label;
                }
                else if (this.displayMember) {
                    itemValue = item[this.displayMember];
                }

                switch (this.searchMode) {
                    case 'none':
                        break;
                    default: // ('containsignorecase')
                        return $.jqx.string.containsIgnoreCase(itemValue, value);
                    case 'contains':
                        return $.jqx.string.contains(itemValue, value);
                    case 'equals':
                        return $.jqx.string.equals(itemValue, value);
                    case 'equalsignorecase':
                        return $.jqx.string.equalsIgnoreCase(itemValue, value);
                    case 'startswith':
                        return $.jqx.string.startsWith(itemValue, value);
                    case 'startswithignorecase':
                        return $.jqx.string.startsWithIgnoreCase(itemValue, value);
                    case 'endswith':
                        return $.jqx.string.endsWith(itemValue, value);
                    case 'endswithignorecase':
                        return $.jqx.string.endsWithIgnoreCase(itemValue, value);
                }
            },

            _sort: function (items) {
                var bw = [], cs = [], cis = [];

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];

                    var itemValue = item;
                    if (item.label) {
                        itemValue = item.label;
                    }
                    else if (this.displayMember) {
                        itemValue = item[this.displayMember];
                    }

                    if (itemValue.toString().toLowerCase().indexOf(this.query.toString().toLowerCase()) === 0) {
                        bw.push(item);
                    }
                    else if (itemValue.toString().indexOf(this.query) >= 0) {
                        cs.push(item);
                    }
                    else if (itemValue.toString().toLowerCase().indexOf(this.query.toString().toLowerCase()) >= 0) {
                        cis.push(item);
                    }
                }

                return bw.concat(cs, cis);
            },

            _highlight: function (item) {
                var query = this.query;
                query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

                var regex = new RegExp('(' + query + ')', 'ig');
                return item.replace(regex, function ($1, match) {
                    return '<b>' + match + '</b>';
                });
            },

            escapeHTML: function (value) {
                var entityMap = {
                    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
                };

                return String(value).replace(/[&<>"'`=\/]/g, function (s) { return entityMap[s] });
            },

            sanitizeHTML: function (value) {
                var that = this;
                var regExp = new RegExp('<\s*(applet|audio|base|bgsound|embed|form|iframe|isindex|keygen|layout|link|meta|object|script|svg|style|template|video)[^>]*>(.*?)<\s*/\s*(applet|audio|base|bgsound|embed|form|iframe|isindex|keygen|layout|link|meta|object|script|svg|style|template|video)>', 'ig');
                var result = String(value).replace(regExp, function (s) { return that.escapeHTML(s) });

                return result;
            },

            escape_HTML: function (html_str) {
                if (html_str && html_str.indexOf && (html_str.indexOf('onclick') >= 0 || html_str.indexOf('onload') >= 0 || html_str.indexOf('onerror') >= 0)) {
                    return this.escapeHTML(html_str)
                }

                var sanitized = this.sanitizeHTML(html_str);

                return sanitized;
            },

            _render: function (originalItems) {
                var that = this,
                    popupChildren = that._popupHelper.children();

                if (popupChildren.length > 0) {
                    for (var j = 0; j < popupChildren.length; j++) {
                        $(popupChildren[j]).remove();
                    }
                }

                var mapItem = function (item, index) {
                    var itemValue = item,
                        i = document.createElement('li'),
                        a = document.createElement('a'),
                        dataName, dataValue;
                    a.setAttribute('href', '#');
                    i.appendChild(a);
                    if (item.value !== undefined && item.value !== null) {
                        if (item.label !== undefined && item.label !== null) {
                            dataName = item.label;
                            dataValue = that.escape_HTML(item.value);
                        } else {
                            dataName = item.value;
                            dataValue = that.escape_HTML(item.value);
                        }
                    } else if (item.label !== undefined && item.label !== null) {
                        dataName = item.label;
                        dataValue = item.label;
                    } else if (that.displayMember !== undefined && that.displayMember !== '') {
                        dataName = item[that.displayMember];
                        dataValue = item[that.valueMember];
                    } else {
                        dataName = item;
                        dataValue = item;
                    }
                    i.setAttribute('data-value', dataValue);
                    i.setAttribute('data-name', dataName);

                    if (item.label) {
                        itemValue = item.label;
                    }
                    else if (that.displayMember) {
                        itemValue = item[that.displayMember];
                    }

                    a.innerHTML = that.highlight(itemValue);
                    var plusClass = '';
                    if (that.rtl) {
                        plusClass = ' jqx-rtl';
                    }
                    if (index === 0) {
                        plusClass += ' jqx-fill-state-pressed';
                    }
                    i.className = that.toThemeProperty('jqx-item jqx-menu-item jqx-rc-all' + plusClass);
                    that.$popup.appendChild(i);

                    that.addHandler(i, 'mouseenter', function (event) { that.mouseenter(event); });
                };

                var mapItems = function (source) {
                    for (var i = 0; i < source.length; i++) {
                        mapItem(source[i], i);
                    }
                };

                mapItems(originalItems);

                if (!this.dropDownWidth) {
                    this.$popup.style.width = that._toPx(that.element.offsetWidth - 6);
                } else {
                    this.$popup.style.width = that._toPx(that.dropDownWidth);
                }

                return this;
            },

            next: function () {
                var active = this._find('jqx-fill-state-pressed', this._popupHelper),
                    next = active.nextSibling;
                $(active).removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                if (!next) {
                    next = this.$popup.firstChild;
                }

                next.className += ' ' + this.toThemeProperty('jqx-fill-state-pressed');
            },

            prev: function () {
                var active = this._find('jqx-fill-state-pressed', this._popupHelper),
                    prev = active.previousSibling;
                $(active).removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                if (!prev) {
                    prev = this.$popup.lastChild;
                }

                prev.className += ' ' + this.toThemeProperty('jqx-fill-state-pressed');
            },

            addHandlers: function () {
                var that = this,
                    eventNamespace = '.jqxInput' + that.element.id;
                that.addHandler(that.host, 'focus' + eventNamespace, function () { that.onFocus(); });
                that.addHandler(that.host, 'blur' + eventNamespace, function () { that.onBlur(); });
                if (that.isMaterialized() && this.input instanceof HTMLInputElement) {
                    that.addHandler(that.input, 'blur' + eventNamespace, function () { that.onBlur(); });
                }

                that.addHandler(that.host, 'change' + eventNamespace, function (event) {
                    if (that.opened && !event.args) {
                        event.stopPropagation();
                        event.preventDefault();
                        event.stopImmediatePropagation();

                        return;
                    }
                    if (!event.args) {
                        event.stopPropagation();
                        event.preventDefault();
                        event.stopImmediatePropagation();

                        var item = that.val(),
                            label, val;
                        if (item && item.label) {
                            label = item.label;
                            val = item.val;
                        }
                        else {
                            label = item;
                            val = item;
                        }
                        that._raiseEvent('3', { type: 'keyboard', 'item': { 'label': label, 'value': val }, 'label': label, 'value': val });
                        that.value = label;
                        that._refreshPlaceHolder();
                    }
                });

                that.addHandler(that.host, 'keypress' + eventNamespace, function (event) { that.keypress(event); });
                that.addHandler(that.host, 'keyup' + eventNamespace, function (event) { that.keyup(event); });
                that.addHandler(that.host, 'keydown' + eventNamespace, function (event) { that.keydown(event); });
                that.addHandler(that.$popup, 'pointerdown' + eventNamespace, function (event) { that.click(event); });
            },

            removeHandlers: function () {
                var that = this,
                    eventNamespace = '.jqxInput' + that.element.id;
                that.removeHandler(that.host, 'change' + eventNamespace);
                that.removeHandler(that.host, 'focus' + eventNamespace);
                that.removeHandler(that.host, 'blur' + eventNamespace);
                that.removeHandler(that.host, 'keypress' + eventNamespace);
                that.removeHandler(that.host, 'keyup' + eventNamespace);
                that.removeHandler(that.host, 'keydown' + eventNamespace);
                that.removeHandler(that.$popup, 'pointerdown' + eventNamespace);
            },

            move: function (e) {
                if (!this.opened) {
                    return;
                }

                switch (e.keyCode) {
                    case 9: // tab
                    case 13: // enter
                    case 27: // escape
                        e.preventDefault();
                        break;

                    case 38: // up arrow
                        if (!e.shiftKey) {
                            e.preventDefault();
                            this.prev();
                        }
                        break;

                    case 40: // down arrow
                        if (!e.shiftKey) {
                            e.preventDefault();
                            this.next();
                        }
                        break;
                }

                e.stopPropagation();
            },

            keydown: function (e) {
                var arr = [40, 38, 9, 13, 27];
                this.suppressKeyPressRepeat = arr.indexOf(e.keyCode) !== -1;

                if (e.key === 'Tab') {
                    if (!this.opened) {
                        if (this.inlineAutoComplete) {
                            this.select(e, this, 'keyboard');
                        }
                        return;
                    }
                }
                this.move(e);
            },

            keypress: function (e) {
                if (this.suppressKeyPressRepeat) {
                    return;
                }
                this.move(e);
            },

            keyup: function (e) {
                switch (e.keyCode) {
                    case 40: // down arrow
                    case 38: // up arrow
                    case 16: // shift
                    case 17: // ctrl
                    case 18: // alt
                        e.stopPropagation();
                        e.preventDefault();
                        break;

                    case 9: // tab
                    case 13: // enter
                        if (!this.opened) {
                            if (this.inlineAutoComplete) {
                                this.select(e, this, 'keyboard');
                                e.stopPropagation();
                                e.preventDefault();
                            }
                            return;
                        }
                        this.select(e, this, 'keyboard');
                        e.stopPropagation();
                        e.preventDefault();
                        break;

                    case 27: // escape
                        if (!this.opened) {
                            return;
                        }
                        this.close();
                        e.stopPropagation();
                        e.preventDefault();
                        break;

                    default:
                        {
                            var me = this;
                            if (this.timer) {
                                clearTimeout(this.timer);
                            }

                            if (this.inlineAutoComplete) {
                                me.suggest();
                                return;
                            }
                            this.timer = setTimeout(function () {
                                me.suggest();
                            }, 300);
                        }
                }

            },

            clear: function () {
                this.val('');
            },

            onBlur: function () {
                var that = this;
                setTimeout(function () { that.close(); }, 150);
                that.host.removeClass(that.toThemeProperty('jqx-fill-state-focus'));
                that._refreshPlaceHolder();
            },

            onFocus: function () {
                var that = this;
                that.element.className += ' ' + that.toThemeProperty('jqx-fill-state-focus');
                that._refreshPlaceHolder();
            },

            click: function (e) {
                e.stopPropagation();
                e.preventDefault();
                this.select(e, this, 'mouse');
            },

            mouseenter: function (e) {
                $(this._find('jqx-fill-state-pressed', this._popupHelper)).removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                e.currentTarget.className += ' ' + this.toThemeProperty('jqx-fill-state-pressed');
            },

            _toPx: function (value) {
                if (typeof value === 'number') {
                    return value + 'px';
                } else {
                    return value;
                }
            },

            _find: function (className, parentElement) {
                var children = parentElement.children();
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (child.className.indexOf(className) !== -1) {
                        return child;
                    }
                }
            },

            _getAddonsWidth: function () {
                var that = this,
                    children = that.baseHost.children(),
                    result = 0;

                for (var i = 0; i < children.length; i++) {
                    if (children[i] !== that.element) {
                        result += $(children[i]).outerWidth();
                    }
                }

                return result;
            }
        });
    })(jqxBaseFramework); //ignore jslint
})();

/***/ }),

/***/ 887:
/***/ (() => {

/* tslint:disable */
/* eslint-disable */
(function(){
	if (typeof document === 'undefined') { 
		return;
	}

( function ( $ ) {

    'use strict';
    $.jqx.jqxWidget( 'jqxKnob', '', {} );

    $.extend( $.jqx._jqxKnob.prototype, {

        defineInstance: function () {
            var settings = {
                //// properties
                type: "circle",
                allowValueChangeOnClick: true,
                allowValueChangeOnDrag: true,
                allowValueChangeOnMouseWheel: true,
                changing: null,
                dragEndAngle: -1, // - degrees offset for the 0 location. [0-360]
                dragStartAngle: -1, // - degrees offset from 0 location for the maxValue location. [0-360]
                disabled: false, // - disables or enables the knob
                dial: {
                    style: 'transparent',
                    innerRadius: 0, // specifies the inner Radius of the dial
                    outerRadius: 0, // specifies the outer Radius of the dial
                    gradientType: null, // optional: specify gradient type ['linear', 'radial']
                    gradientStops: null,  // optional: specify gradient stops
                    startAngle: null, // optional, if specified dial will use this as the startAngle, otherwise will use widget's
                    endAngle: null  // optional, if specified dial will use this as the endAngle, otherwise will use widget's
                },
                endAngle: 360, // - degrees offset from 0 location for the maxValue location. [0-360]
                height: 400, // - sets the widget height
                labels:
                {
                    type: 'digits',
                    step: null,
                    rotate: false, // specifies if labels should be vertical or rotated with the appropriate angle
                    //intervals: '', // instead of dialLabels
                    offset: null, // specifies offset from
                    //position: '',
                    style: '', // svg text style attributes as string list, can also specify font styles "fill: red; stroke: blue; stroke-width: 3"
                    visible: false // sets whether dial labels should be displayed
                },
                marks: {
                    type: '', // ['circle', 'line']
                    thickness: 1, // specifies thickness in case of lines
                    size: '10%', // specifies radius in case of circular lines, or length in case of lines or arcs
                    colorProgress: 'transparent', // specifies mark colors depending on the value
                    colorRemaining: 'transparent', // specifies mark colors after the value
                    minorInterval: 1,
                    majorInterval: 5,
                    offset: '80%',
                    majorSize: '15%'
                },
                min: 0, // - sets the minValue for the knob. Default 0.
                max: 100, // - sets the maxValue for the knob. Default 100.
                progressBar: {
                    size: '10%', // specifies radius in case of circular lines, or length in case of lines or arcs
                    offset: '60%',
                    color: 'transparent', // specifies mark colors depending on the value
                    background: 'transparent' // specifies mark colors after the value
                },
                pointer:
                {
                    color: {  // optional object, could be just a string 'color' }
                        color: 'transparent',
                        border: null, // optional: specify stroke color
                        gradientType: null, // optional: specify gradient type ['linear', 'radial']
                        gradientStops: null // specify gradient stops
                    },
                    thickness: 1,
                    size: '',
                    type: '', // ['circle', 'line', 'arc', 'arrow']
                    visible: false
                },
                pointerGrabAction: 'normal', // ['normal', 'progressBar', 'pointer' ]
                renderEngine: '', // - sets the renderEngine
                rotation: 'clockwise', // - define knob spin direction. Default: 'clockwise', possible: 'counterclockwise'
                startAngle: 0, // - degrees offset for the 0 location. [0-360]
                spinner: {
                    color: 'transparent',
                    innerRadius: 0, // specifies the inner Radius of the dial
                    outerRadius: 0, // specifies the outer Radius of the dial
                    marks: {
                        step: 1,
                        rotate: false,
                        color: 'transparent',
                        size: 0,
                        steps: 10,
                        thickness: 1,
                        offset: 0
                    }
                },
                style:
                {
                    fill: 'transparent',
                    stroke: 'transparent'
                },
                _touchEvents: {
                    'mousedown': $.jqx.mobile.getTouchEventName( 'touchstart' ),
                    'mouseup': $.jqx.mobile.getTouchEventName( 'touchend' ),
                    'mousemove': $.jqx.mobile.getTouchEventName( 'touchmove' ),
                    'mouseenter': 'mouseenter',
                    'mouseleave': 'mouseleave',
                    'click': $.jqx.mobile.getTouchEventName( 'touchstart' )
                },
                step: 1, // - sets the knob increase/decrease step. Default: 1. ---- Includes the functionality of steps, too.
                snapToStep: true, // - Specifies whether setting the knob value will snap to the closest step true/false
                value: 0, // - sets the knob's initial value. Default equal to minValue.
                width: 400 // - sets the knob width
            };
            if ( this === $.jqx._jqxKnob.prototype ) {
                return settings;
            }
            $.extend( true, this, settings );
            return settings;
        },

        createInstance: function () {
            var that = this;
            // renders the widget
            that._hostInit();
            that._ie8Plugin();
            that._validateProperties();
            that._initValues();
            that._refresh();
            $.jqx.utilities.resize( that.host, function () {
                that.widgetSize = Math.min( that.host.width(), that.host.height() );
                that._refresh();
            } );
        },

        _getEvent: function ( event ) {
            if ( this._isTouchDevice ) {
                return this._touchEvents[ event ] + ".jqxKnob" + this.element.id;;
            } else {
                return event + ".jqxKnob" + this.element.id;
            }
        },

        _ie8Plugin: function () {
            if ( typeof Array.prototype.forEach != 'function' ) { // add forEach function to IE7, IE8
                Array.prototype.forEach = function ( callback ) {
                    for ( var i = 0; i < this.length; i++ ) {
                        callback.apply( this, [ this[ i ], i, this ] );
                    }
                };
            };

            if ( !window.getComputedStyle ) { // add getComputedStyle function to IE7, IE8
                window.getComputedStyle = function ( el, pseudo ) {
                    this.el = el;
                    this.getPropertyValue = function ( prop ) {
                        var re = /(\-([a-z]){1})/g;
                        if ( prop == 'float' ) prop = 'styleFloat';
                        if ( re.test( prop ) ) {
                            prop = prop.replace( re, function () {
                                return arguments[ 2 ].toUpperCase();
                            } );
                        }
                        return el.currentStyle[ prop ] ? el.currentStyle[ prop ] : null;
                    }
                    return this;
                }
            };
        },
        //// methods

        // public methods

        createColorGradient: function ( color, gradientType, gradientStops ) {
            return this._getGradient( color, gradientType, gradientStops );
        },

        // destroy the widget
        destroy: function () {
            var that = this;
            that.removeHandler( $( document ), 'mousemove.jqxKnob' + that.host[ 0 ].id );
            that.removeHandler( $( document ), 'blur.jqxKnob' + that.host[ 0 ].id );
            that.removeHandler( $( document ), 'mouseup.jqxKnob' + that.host[ 0 ].id );
            that.host.empty();
            that.host.remove();
        },

        propertiesChangedHandler: function ( object, key, value ) {
            if ( value.width && value.height && Object.keys( value ).length == 2 ) {
                object._refresh();
            }
        },

        propertyChangedHandler: function ( object, key, oldvalue, value ) {
            var that = this;
            if ( object.batchUpdate && object.batchUpdate.width && object.batchUpdate.height && Object.keys( object.batchUpdate ).length == 2 ) {
                return;
            }

            if ( key === 'disabled' ) {
                object.host.removeClass( object.toThemeProperty( 'jqx-fill-state-disabled' ) );
            }

            if ( key === 'value' ) {
                object._setValue( value, 'propertyChange' );
                return;
            }
            object._validateProperties();
            object._refresh();
        },

        val: function ( value ) {
            var that = this;
            if ( arguments.length == 0 ) {
                return that.value;
            }
            that._setValue( value, null );
        },

        // private methods

        _isPointerGrabbed: false,
        _pointerGrabbedIndex: -1,

        _attatchPointerEventHandlers: function () {
            var that = this;
            //if (!that._pointer) {
            //    return;
            //}

            that.addHandler( that.host, this._getEvent( 'mousedown' ), function ( event ) {
                if ( that.pointerGrabAction === 'pointer' ) {
                    if ( event.target.id !== that._pointerID ) {
                        return;
                    }
                }
                if ( that._isTouchDevice ) {
                    var pos = $.jqx.position( event );
                    event.clientX = pos.left;
                    event.clientY = pos.top;
                }

                if ( that.pointerGrabAction === 'progressBar' ) {
                    var mousePosition = { x: event.clientX, y: event.clientY };
                    var hostPosition = that.host[ 0 ].getBoundingClientRect();
                    var hostWidth = that.widgetSize;
                    var center = { x: hostPosition.left + hostWidth / 2, y: hostPosition.top + hostWidth / 2 };
                    var angle = that._calculateAngleFromCoordinates( mousePosition, center, that.rotation );
                    var distance = that._calculateDistance( mousePosition, center );
                    if ( angle < that.startAngle ) { angle += 360; }
                    if ( angle > that.endAngle ) {
                        if ( angle - that.endAngle !== ( 360 + that.startAngle - angle ) ) {
                            return;
                        }
                    }
                    var minDistance = that._getScale( that.progressBar.offset, 'w', hostWidth / 2 );
                    var size = that._getScale( that.progressBar.size, 'w', hostWidth / 2 );
                    if ( distance < minDistance || distance > minDistance + size ) {
                        return;
                    }
                }
                that._isPointerGrabbed = true;
                if ( that.allowValueChangeOnClick === true ) {
                    that._mouseMovePointer( event );
                }
                event.preventDefault();
                event.stopPropagation();
                return false;

            } );
            var mouseMoveTimer = null;
            that.addHandler( $( document ), this._getEvent( 'mousemove' ), function ( event ) {
                if ( that.allowValueChangeOnDrag ) {
                    if ( mouseMoveTimer ) {
                        clearTimeout( mouseMoveTimer );
                    }
                    mouseMoveTimer = setTimeout( function () {
                        that._mouseMovePointer( event );
                    } );
                    if ( that._isPointerGrabbed ) {
                        return false;
                    }
                }
            } );
            that.addHandler( $( document ), 'blur.jqxKnob' + that.host[ 0 ].id, function () {
                that._isPointerGrabbed = false;
                that._pointerGrabbedIndex = -1;
            } );
            that.addHandler( $( document ), this._getEvent( 'mouseup' ), function ( event ) {
                if ( that._isPointerGrabbed ) {
                    that._isPointerGrabbed = false;
                    that._pointerGrabbedIndex = -1;
                    that._raiseEvent( 0, { originalEvent: event, value: that.value } );
                }
            } );
            that.addHandler( that.host, 'wheel', function ( event ) {
                if ( that.allowValueChangeOnMouseWheel ) {
                    var delta = 0;
                    if ( !event ) {/* For IE. */
                        event = window.event;
                    }

                    if ( event.originalEvent && event.originalEvent.wheelDelta ) {
                        event.wheelDelta = event.originalEvent.wheelDelta;
                    }

                    if ( event.wheelDelta ) { /* IE/Opera. */
                        delta = event.wheelDelta / 120;
                    } else if ( event.detail ) { /** Mozilla case. */
                        delta = -event.detail / 3;
                    } else if ( event.originalEvent && event.originalEvent.deltaY ) {
                        delta = event.originalEvent.deltaY; /* IE/Firefox */
                    }

                    if ( delta > 0 ) {
                        that._increment();
                    } else {
                        that._decrement();
                    }
                    return false;
                }
            } );

        },

        _mouseMovePointer: function ( event ) {
            var that = this;
            if ( that.disabled )
                return;

            if ( that._isPointerGrabbed ) {
                if ( that._isTouchDevice ) {	
					var touches = $.jqx.mobile.getTouches( event );
					var touch = touches[ 0 ];
					event.clientX = parseInt( touch.clientX );
					event.clientY = parseInt( touch.clientY );
                }

                var mousePosition = { x: event.clientX, y: event.clientY };
                var hostPosition = that.host[ 0 ].getBoundingClientRect();
                var hostWidth = that.widgetSize;
                var center = { x: hostPosition.left + hostWidth / 2, y: hostPosition.top + hostWidth / 2 };
                var angle = that._calculateAngleFromCoordinates( mousePosition, center, that.rotation );
                var value = that._calculateValueFromAngle( angle, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
                if ( that.value.length ) {
                    if ( that._pointerGrabbedIndex === -1 ) {
                        for ( var i = 0; i < that.value.length; i++ ) {
                            if ( value <= that.value[ i ] ) {
                                that._pointerGrabbedIndex = i;
                                break;
                            } else if ( i === that.value.length - 1 ) {
                                that._pointerGrabbedIndex = i;
                            } else if ( value <= that.value[ i + 1 ] ) {
                                var mid = that.value[ i ] + ( that.value[ i + 1 ] - that.value[ i ] ) / 2;
                                that._pointerGrabbedIndex = value <= mid ? i : i + 1;
                                break;
                            }
                        }
                    }
                }
                if ( that.pointer && that.pointer.length > 1 ) {
                    if ( that._pointerGrabbedIndex == 1 ) {
                        var startAngle = that._calculateAngleFromValue( that.value[ 0 ], that.dragStartAngle, that.dragEndAngle, that.min, that.max );
                        var endAngle = that._calculateAngleFromValue( that.max, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
                        var angle = that._calculateAngleFromValue( value, that.dragStartAngle, that.dragEndAngle, that.min, that.max );

                        if ( angle <= startAngle )
                            return;
                        if ( angle >= endAngle )
                            return;
                    }
                    if ( that._pointerGrabbedIndex == 0 ) {
                        var endAngle = that._calculateAngleFromValue( that.value[ 1 ], that.dragStartAngle, that.dragEndAngle, that.min, that.max );
                        var startAngle = that._calculateAngleFromValue( that.min, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
                        var angle = that._calculateAngleFromValue( value, that.dragStartAngle, that.dragEndAngle, that.min, that.max );

                        if ( angle <= startAngle )
                            return;
                        if ( angle >= endAngle )
                            return;

                    }
                }
                if ( that.changing ) {
                    if ( Array.isArray( that.value ) ) {
                        var newValue = that.value.slice( 0 );
                        newValue[ that._pointerGrabbedIndex ] = value;
                        var result = that.changing( that.value, newValue );
                        if ( result === false )
                            return;
                    }
                    else {
                        var result = that.changing( that.value, value );
                        if ( result === false )
                            return;
                    }
                }
                that._setValue( value, 'mouse' );
            }
        },

        _getScale: function ( size, dim, parent ) {
            if ( size && size.toString().indexOf( '%' ) >= 0 ) {
                size = parseInt( size, 10 ) / 100;
                if ( typeof ( parent ) == 'object' ) {
                    return parent[ dim ]() * size;
                } else {
                    return parent * size;
                }
            }
            return parseInt( size, 10 );
        },

        _hostInit: function () {
            var that = this;
            this._isTouchDevice = $.jqx.mobile.isTouchDevice();
            var host = that.host;
            host.width( that.width );
            host.height( that.height );
            host.css( 'position', 'relative' );
            that.host.addClass( that.toThemeProperty( 'jqx-widget jqx-knob' ) );

            if ( that.dragStartAngle == -1 ) {
                that.dragStartAngle = that.startAngle;
            }
            if ( that.dragEndAngle == -1 ) {
                that.dragEndAngle = that.endAngle;
            }
            if ( that.dragStartAngle < that.startAngle ) {
                that.dragStartAngle = that.startAngle;
            }
            if ( that.dragEndAngle > that.endAngle ) {
                that.dragEndAngle = that.endAngle;
            }

            that.widgetSize = Math.min( that.host.width(), that.host.height() );
        },

        _initRenderer: function ( host ) {
            if ( !$.jqx.createRenderer )
                throw 'jqxKnob: Please include a reference to jqxdraw.js';
            return $.jqx.createRenderer( this, host );
        },

        _initValues: function () {
            var that = this;
            //if (that.background) {
            //    if (that.background.color){
            //        if (that.background.gradientType && !that.background.gradientStops){
            //            that.background.gradientStops = [[0, 1], [50, 0.5], [100, 1]];
            //        }
            //        if (!that.background.gradientType && that.background.gradientStops){
            //            that.background.gradientType = 'radial';
            //        }
            //    }
            //}
            //if (that.dial) {
            //    if (that.dial.color){
            //        if (that.dial.gradientType && !that.dial.gradientStops){
            //            that.dial.gradientStops = [[0, 1], [50, 0.5], [100, 1]];
            //        }
            //        if (!that.dial.gradientType && that.dial.gradientStops){
            //            that.dial.gradientType = 'radial';
            //        }
            //    }
            //}

            if ( that.marks ) {
                if ( that.marks.style && that.marks.style !== '' ) {
                    if ( that.marks.style === 'line' && !that.marks.thickness ) {
                        that.marks.thickness = 1;
                    }
                    if ( !that.marks.size ) {
                        that.marks.size = '5%';
                    }
                    if ( !that.marks.offset ) {
                        that.marks.offset = '85%';
                    }
                    //if (!that.marks.colorProgress && that.marks.colorRemaining){
                    //    that.marks.colorProgress = 'transparent';
                    //}
                    //if (that.marks.colorProgress && !that.marks.colorRemaining){
                    //    that.marks.colorRemaining = 'transparent';
                    //}
                }
                if ( that.marks.majorInterval ) {
                    if ( that.marks.majorSize === undefined ) {
                        that.marks.majorSize = '10%';
                    }
                }
            }

            that._marksList = that._getMarksArray( that.marks );
            if ( that.spinner ) {
                that._spinnerMarksList = that._getMarksArray( that.spinner.marks );
            }
        },

        _calculateAngleFromValue: function ( value, startAngle, endAngle, minValue, maxValue ) {
            if ( $.jqx.browser.msie && $.jqx.browser.version < 9 ) {
                if ( this.type != "circle" ) {
                    return minValue != maxValue ? parseInt( ( value - minValue ) / ( maxValue - minValue ) ) : 0;
                }

                return minValue != maxValue ? parseInt( ( value - minValue ) / ( maxValue - minValue ) * ( endAngle - startAngle ) ) : 0;
            }
            if ( this.type != "circle" ) {
                return minValue != maxValue ? ( value - minValue ) / ( maxValue - minValue ) : 0;
            }

            return minValue != maxValue ? ( value - minValue ) / ( maxValue - minValue ) * ( endAngle - startAngle ) : 0;
        },

        _calculateAngleFromCoordinates: function ( position, center, rotation ) {
            var x = position.x - center.x;
            var y = position.y - center.y;
            if ( y > 0 ) {
                return rotation === 'clockwise' ? 90 - Math.atan( x / y ) * 180 / Math.PI : 270 + Math.atan( x / y ) * 180 / Math.PI;
            } else if ( y < 0 ) {
                return rotation === 'clockwise' ? 270 - Math.atan( x / y ) * 180 / Math.PI : 90 + Math.atan( x / y ) * 180 / Math.PI;
            } else if ( x >= 0 ) {
                return 0;
            } else {
                return 180;
            }
        },

        _calculateValueFromAngle: function ( angle, startAngle, endAngle, min, max ) {
            if ( angle < startAngle ) { angle += 360; }
            var value = min;
            if ( angle > endAngle ) {
                if ( angle - endAngle < ( 360 + startAngle - angle ) ) {
                    value = max;
                }
            } else {
                value = min + ( angle - startAngle ) * ( max - min ) / ( endAngle - startAngle );
            }
            return value;
        },

        _calculateDistance: function ( position, center ) {
            return Math.sqrt( Math.pow( position.x - center.x, 2 ) + Math.pow( position.y - center.y, 2 ) );
        },

        _drawBackground: function () {
            var that = this;
            var renderer = that.renderer;
            var width, radius, color;
            width = that.widgetSize;
            radius = width / 2;
            var strokeWidth = that.style.strokeWidth ? that.style.strokeWidth : 0;
            radius -= strokeWidth / 2;
            if ( that.style ) {
                var color = that._getColor( that.style.fill );
                var border = that._getColor( that.style.stroke );
                var strokeWidth = that.style.strokeWidth ? that.style.strokeWidth : 1;
                if ( that.type != "circle" ) {
                    renderer.rect( 0, 0, this.host.width(), this.host.height(), { fill: color, stroke: border, 'stroke-width': strokeWidth } );
                }
                else {
                    renderer.circle( width / 2, width / 2, radius, { fill: color, stroke: border, 'stroke-width': strokeWidth } );
                }
            }
        },

        _drawDial: function () {
            var that = this;
            if ( that.dial ) {
                var renderer = that.renderer;
                var width = that.widgetSize;
                var cx, cy, innerRadius, outerRadius, startAngle, endAngle, centerOffset = 0, color;
                cx = cy = width / 2;
                outerRadius = that._getScale( that.dial.outerRadius, 'w', width / 2 );
                innerRadius = that._getScale( that.dial.innerRadius, 'w', width / 2 );
                if ( that.dial.startAngle != null && that.dial.endAngle != null ) {
                    startAngle = that.rotation === 'clockwise' ? 360 - that.dial.endAngle : that.dial.startAngle; // draw direction reversed because renderer requires end to be higher than start.
                    endAngle = that.rotation === 'clockwise' ? 360 - that.dial.startAngle : that.dial.endAngle;
                } else {
                    startAngle = that.rotation === 'clockwise' ? 360 - that.endAngle : that.startAngle; // draw direction reversed because renderer requires end to be higher than start.
                    endAngle = that.rotation === 'clockwise' ? 360 - that.startAngle : that.endAngle;
                }
                color = that._getColor( that.dial.style.fill );
                var border = that._getColor( that.dial.style.stroke ) || '';
                var borderWidth = that.dial.style.strokeWidth || 0;
                renderer.pieslice( cx, cy, innerRadius, outerRadius, startAngle, endAngle, centerOffset, { fill: color, stroke: border, "stroke-width": borderWidth } );
            }
        },

        _getMarksArray: function ( marksObj ) {
            if ( marksObj == undefined ) return [];
            var that = this,
                i, value,
                marks = {},
                max = that.max,
                min = that.min,
                range = max - min,
                minorInterval = marksObj.minorInterval,
                majorInterval = marksObj.majorInterval;
            var formatFunction = function ( value ) { // used to remove formatting error on values less than 1, so as to prevent duplicates;
                return ( parseFloat( value.toPrecision( 12 ) ) );
            };

            if ( minorInterval ) { // not null, 0 or undefined
                for ( i = 0; i < range; i += minorInterval ) {
                    value = formatFunction( min + i );
                    marks[ value ] = { type: 'minor' };
                }
                marks[ max ] = { type: 'minor' };
            }
            if ( majorInterval ) { // not null, 0 or undefined
                for ( i = 0; i < range; i += majorInterval ) {
                    value = formatFunction( min + i );
                    marks[ value ] = { type: 'major' };
                }
                marks[ max ] = { type: 'major' };
            }
            if ( !minorInterval && !majorInterval ) { //neither is defined use step
                var step = that.step;
                if ( step ) { // not null, 0 or undefined
                    for ( i = 0; i < range; i += step ) {
                        value = formatFunction( min + i );
                        marks[ value ] = { type: 'minor' };
                    }
                    marks[ max ] = { type: 'minor' };
                }
            }
            return marks;
        },

        _drawMarks: function () {
            var that = this;
            if ( that.marks ) {
                var renderer = that.renderer;
                var width = that.widgetSize;
                var color = that.marks && that.marks.colorRemaining != null ? that.marks.colorRemaining : 'transparent';
                color = that._getColor( color );
                that._dialMarks = [];
                var size, angle;
                var type = that.marks.type;
                if ( !type ) {
                    type = "line";
                }
                var offset = that._getScale( that.marks.offset, 'w', width / 2 ); // add error handling if value is invalid
                var marksList = that._marksList;
                $.each( marksList, function ( key, value ) {
                    if ( that.dragEndAngle - that.dragStartAngle === 360 ) {
                        if ( key == that.max ) {
                            return;
                        }
                    }
                    angle = that.dragStartAngle + that._calculateAngleFromValue( key, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
                    if ( type === 'circle' ) {
                        var radius = that._getScale( that.marks.size, 'w', width / 2 );
                        var position = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset, angle, that.rotation );
                        that._dialMarks.push( renderer.circle( position.x, position.y, radius, { fill: color } ) );
                    } else if ( type === 'line' ) {
                        if ( value.type === 'major' && that.marks.majorSize !== null && that.marks.majorSize !== undefined ) {
                            size = that._getScale( that.marks.majorSize, 'w', width / 2 );
                        } else {
                            size = that._getScale( that.marks.size, 'w', width / 2 );
                        }
                        var thickness = that._getScale( that.marks.thickness, 'w', width / 2 );
                        var lineStartPosition = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset, angle, that.rotation );
                        var lineEndPosition = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset + size, angle, that.rotation );
                        if ( $.jqx.browser.msie && $.jqx.browser.version < 9 ) {
                            that._dialMarks.push( renderer.line( parseInt( lineStartPosition.x ), parseInt( lineStartPosition.y ), parseInt( lineEndPosition.x ), parseInt( lineEndPosition.y ), {
                                stroke: color,
                                'stroke-width': thickness
                            } ) );
                        }
                        else {
                            that._dialMarks.push( renderer.line( lineStartPosition.x, lineStartPosition.y, lineEndPosition.x, lineEndPosition.y, {
                                stroke: color,
                                'stroke-width': thickness
                            } ) );
                        }
                    }

                } );


            }
        },

        _drawProgressBars: function () {
            var that = this;

            if ( that.progressBar ) {
                that._progressBar = that._progressBar || [];
                for ( var i = 0; i < that._progressBar.length; i++ ) {
                    $( that._progressBar[ i ] ).remove();
                }
                that._progressBar = [];
                if ( that._isArray( that.progressBar.style ) ) {
                    var min = that.value[ 0 ];
                    var max = that.value[ 1 ];

                    var color1 = that.progressBar.style[ 0 ];
                    var color2 = that.progressBar.style[ 1 ];

                    that._progressBar.push( that._drawProgressBar( that.max, that.progressBar.background, 'background' ) );
                    if ( that.progressBar.ranges ) {
                        for ( var i = 0; i < that.progressBar.ranges.length; i++ ) {
                            var fromValue = that.progressBar.ranges[ i ].startValue;
                            var toValue = that.progressBar.ranges[ i ].endValue;
                            that._progressBar.push( that._drawProgressBarFromToValue( fromValue, toValue, that.progressBar.ranges[ i ], 'background' ) );
                        }
                    }
                    that._progressBar.push( that._drawProgressBar( min, color1 ) );
                    that._progressBar.push( that._drawProgressBarFromEndToStart( max, color2 ) );

                } else {
                    that._progressBar.push( that._drawProgressBar( that.max, that.progressBar.background, 'background' ) );
                    if ( that.progressBar.ranges ) {
                        for ( var i = 0; i < that.progressBar.ranges.length; i++ ) {
                            var fromValue = that.progressBar.ranges[ i ].startValue;
                            var toValue = that.progressBar.ranges[ i ].endValue;
                            that._progressBar.push( that._drawProgressBarFromToValue( fromValue, toValue, that.progressBar.ranges[ i ], 'background' ) );
                        }
                    }
                    that._progressBar.push( that._drawProgressBar( that.value, that.progressBar.style ) );
                }
            }
        },

        _drawProgressBarFromEndToStart: function ( value, color ) {
            var that = this;
            var renderer = that.renderer;
            var width = that.widgetSize;
            var size, angle;
            var offset = that._getScale( that.progressBar.offset, 'w', width / 2 );
            var cx, cy, innerRadius, outerRadius, startAngle, endAngle, centerOffset = 0;
            size = that._getScale( that.progressBar.size, 'w', width / 2 );
            cx = cy = width / 2;
            innerRadius = offset;
            outerRadius = offset + size;
            var color1 = that._getColor( color.fill ) || 'transparent';
            var border1 = that._getColor( color.stroke ) || 'transparent';
            angle = that.dragStartAngle + that._calculateAngleFromValue( value, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
            startAngle = that.dragStartAngle; // draw direction reversed because renderer requires end to be higher than start.
            var strokeWidth = color.strokeWidth ? color.strokeWidth : 1;
            if ( that.endAngle != angle ) {
                if ( that.rotation === 'clockwise' ) {
                    return ( renderer.pieslice( cx, cy, innerRadius, outerRadius, 360 - that.endAngle, 360 - angle, centerOffset, { fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
                } else {
                    return ( renderer.pieslice( cx, cy, innerRadius, outerRadius, endAngle, angle, centerOffset, { fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
                }
            }
        },

        _drawProgressBarFromToValue: function ( fromValue, toValue, color, type ) {
            var that = this;
            var renderer = that.renderer;
            var width = that.widgetSize;
            var size, angle;
            var offset = that._getScale( that.progressBar.offset, 'w', width / 2 );
            var cx, cy, innerRadius, outerRadius, startAngle, endAngle, centerOffset = 0;
            size = that._getScale( that.progressBar.size, 'w', width / 2 );
            cx = cy = width / 2;
            innerRadius = offset;
            outerRadius = offset + size;
            var color1 = that._getColor( color.fill ) || 'transparent';
            var border1 = that._getColor( color.stroke ) || 'transparent';
            angle = that.dragStartAngle + that._calculateAngleFromValue( toValue, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
            startAngle = that.dragStartAngle + that._calculateAngleFromValue( fromValue, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
            if ( startAngle == angle )
                return;
            var sw = 1;
            if ( type == "background" ) sw = 0;
            var strokeWidth = color.strokeWidth ? color.strokeWidth : sw;

            if ( that.type != "circle" ) {
                if ( that.type == "rect" ) {
                    var h = angle * ( this.host.height() - 2 * offset );
                    var fullH = ( this.host.height() - 2 * offset );
                    return ( renderer.rect( cx - size / 2, offset + fullH - h, size, h, { fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
                }
                else {
                    return ( renderer.rect( offset, cy - size / 2, this.host.width() - 2 * offset, size, { fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
                }
            }

            if ( that.rotation === 'clockwise' ) {
                return ( renderer.pieslice( cx, cy, innerRadius, outerRadius, 360 - angle, 360 - startAngle, centerOffset, { fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
            } else {
                return ( renderer.pieslice( cx, cy, innerRadius, outerRadius, startAngle, angle, centerOffset, { fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
            }
        },

        _drawProgressBar: function ( value, color, type ) {
            var that = this;
            var renderer = that.renderer;
            var width = that.widgetSize;
            var size, angle;
            var offset = that._getScale( that.progressBar.offset, 'w', width / 2 );
            var cx, cy, innerRadius, outerRadius, startAngle, endAngle, centerOffset = 0;
            size = that._getScale( that.progressBar.size, 'w', width / 2 );
            cx = cy = width / 2;
            innerRadius = offset;
            outerRadius = offset + size;
            var color1 = that._getColor( color.fill ) || 'transparent';
            var border1 = that._getColor( color.stroke ) || 'transparent';
            angle = that.dragStartAngle + that._calculateAngleFromValue( value, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
            startAngle = that.dragStartAngle; // draw direction reversed because renderer requires end to be higher than start.
            if ( startAngle == angle )
                return;
            var sw = 1;
            if ( type == "background" ) sw = 0;
            var strokeWidth = color.strokeWidth ? color.strokeWidth : sw;

            if ( that.type != "circle" ) {
                if ( that.type == "rect" ) {
                    var h = angle * ( this.host.height() - 2 * offset );
                    var fullH = ( this.host.height() - 2 * offset );
                    return ( renderer.rect( cx - size / 2, offset + fullH - h, size, h, { fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
                }
                else {
                    return ( renderer.rect( offset, cy - size / 2, this.host.width() - 2 * offset, size, { fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
                }
            }

            if ( that.rotation === 'clockwise' ) {
                return ( renderer.pieslice( cx, cy, innerRadius, outerRadius, 360 - angle, 360 - startAngle, centerOffset, { opacity: color.opacity || 1, fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
            } else {
                return ( renderer.pieslice( cx, cy, innerRadius, outerRadius, startAngle, angle, centerOffset, { opacity: color.opacity || 1, fill: color1, stroke: border1, 'stroke-width': strokeWidth } ) );
            }
        },

        _drawLabels: function () {
            var that = this;
            that._labels = [];
            var renderer = that.renderer;
            var width = that.widgetSize;
            if ( that.labels.visible === undefined ) {
                that.labels.visible = true;
            }

            if ( that.labels.visible === true ) {
                var offset = that._getScale( that.labels.offset, 'w', width / 2 ); // add error handling if value is invalid
                var type = that.labels.type ? that.labels.type : "digits";
                var style = that.labels.style;
                var color = style && style.fill ? that._getColor( style.fill ) : '#333';

                var i;
                if ( type === 'digits' ) {
                    var labels = [];
                    if ( that.labels.customLabels ) {
                        for ( i = 0; i < that.labels.customLabels.length; i++ ) {
                            labels.push( that.labels.customLabels[ i ].value );
                        }
                    } else {
                        var step = that.labels.step || that.step;
                        for ( i = that.min; i < that.max; i += step ) {
                            labels.push( i );
                        }
                        if ( that.dragEndAngle - 360 < that.dragStartAngle ) {
                            labels.push( that.max );
                        }
                    }
                    // draw labels
                    for ( i = 0; i < labels.length; i++ ) {

                        var labelText = that.labels.customLabels ? that.labels.customLabels[ i ].text : labels[ i ].toString();
                        if ( that.labels.formatFunction ) {
                            labelText = that.labels.formatFunction( labelText );
                        }
                        var labelsStartAngle = that.dragStartAngle;
                        var labelsEndAngle = that.dragEndAngle;

                        var angle = labelsStartAngle + that._calculateAngleFromValue( labels[ i ], labelsStartAngle, labelsEndAngle, that.min, that.max );
                        var labelTextPosition = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset, angle, that.rotation );
                        if ( $.jqx.browser.msie && $.jqx.browser.version < 9 ) {
                            var textSize = renderer.measureText( labelText, 0, { "class": this.toThemeProperty( 'jqx-knob-label' ) } );
                            var rotationAngle = that.labels.rotate ? 90 - angle : 0;
                            renderer.text( labelText, labelTextPosition.x - textSize.width / 2, labelTextPosition.y - textSize.height / 2, textSize.width, textSize.height, rotationAngle, { "class": this.toThemeProperty( 'jqx-knob-label' ) }, false );
                        }
                        else {
                            var textSize = renderer.measureText( labelText, 0, { 'style': { fill: color }, "class": this.toThemeProperty( 'jqx-knob-label' ) } );
                            var rotationAngle = that.labels.rotate ? 90 - angle : 0;
                            renderer.text( labelText, labelTextPosition.x - textSize.width / 2, labelTextPosition.y - textSize.height / 2, textSize.width, textSize.height, rotationAngle, { 'style': { fill: color }, "class": this.toThemeProperty( 'jqx-knob-label' ) }, false );
                        }
                    }
                }
            }

        },

        _drawPointers: function () {
            var that = this;
            that._pointers = that._pointers || [];
            that._pointers.forEach( function ( pointer, index, object ) {
                $( pointer ).remove();
                object.splice( index, 1 );
            } );
            if ( that.pointer ) {
                if ( that._isArray( that.pointer ) ) {
                    for ( var i = 0; i < that.progressBar.style.length; i++ ) {
                        if ( that.pointer[ i ].visible === false )
                            continue;

                        that._pointers.push( that._drawPointer( that.value[ i ], that.pointer[ i ] ) );
                    }
                } else {
                    if ( that.pointer.visible === false )
                        return;

                    that._pointers.push( that._drawPointer( that.value, that.pointer ) );
                }
            }
        },

        _drawPointer: function ( value, pointerObject ) {
            var that = this;
            pointerObject.id = pointerObject.id || that._getID();
            var renderer = that.renderer;
            var width = that.widgetSize;
            var type = pointerObject.type;
            if ( !type ) type = "circle";
            if ( !pointerObject.style ) {
                pointerObject.style = { fill: "#feaf4e", stroke: "#feaf4e" };
            }
            var color = that._getColor( pointerObject.style.fill );
            var border = pointerObject.style.stroke || '';
            var size, thickness;
            var pointerElement;

            var offset = that._getScale( pointerObject.offset, 'w', width / 2 ); // add error handling if value is invalid
            var angle = that.dragStartAngle + that._calculateAngleFromValue( value, that.dragStartAngle, that.dragEndAngle, that.min, that.max );

            if ( type === 'circle' ) {
                var radius = that._getScale( pointerObject.size, 'w', width / 2 );
                var position = that._getPointerPosition( { x: width / 2, y: width / 2 }, offset, angle, that.rotation );
                pointerElement = renderer.circle( position.x, position.y, radius, { id: pointerObject.id, fill: color, stroke: border } );
            } else if ( type === 'line' ) {
                size = that._getScale( pointerObject.size, 'w', width / 2 );
                thickness = pointerObject.thickness;
                var lineStartPosition = that._getPointerPosition( { x: width / 2, y: width / 2 }, offset, angle, that.rotation );
                var lineEndPosition = that._getPointerPosition( { x: width / 2, y: width / 2 }, offset + size, angle, that.rotation );
                pointerElement = renderer.line( lineStartPosition.x, lineStartPosition.y, lineEndPosition.x, lineEndPosition.y, { id: pointerObject.id, stroke: color, 'stroke-width': thickness } );
            } else if ( type === 'arc' ) {
                size = that._getScale( pointerObject.size, 'w', width / 2 );
                var cx, cy, innerRadius, outerRadius, startAngle, endAngle, centerOffset = 0;
                var arcWidth = ( that.dragEndAngle - that.dragStartAngle ) / that._steps.length;
                cx = cy = width / 2;
                innerRadius = offset;
                outerRadius = offset + size;
                startAngle = that.rotation === 'clockwise' ? 360 - ( angle + arcWidth / 2 ) : angle - arcWidth / 2;
                endAngle = that.rotation === 'clockwise' ? 360 - ( angle - arcWidth / 2 ) : angle + arcWidth / 2;
                pointerElement = renderer.pieslice( cx, cy, innerRadius, outerRadius, startAngle, endAngle, centerOffset, { id: pointerObject.id, fill: color, stroke: border } );
            } else if ( type === 'arrow' ) {
                size = that._getScale( pointerObject.size, 'w', width / 2 );
                thickness = pointerObject.thickness;
                var tip = that._getPointerPosition( { x: width / 2, y: width / 2 }, size, angle, that.rotation );
                var baseFoundation = that._getPointerPosition( { x: width / 2, y: width / 2 }, offset, angle, that.rotation );
                var base1 = that._getPointerPosition( { x: baseFoundation.x, y: baseFoundation.y }, thickness / 2, angle - 90, that.rotation );
                var base2 = that._getPointerPosition( { x: baseFoundation.x, y: baseFoundation.y }, thickness / 2, angle + 90, that.rotation );
                var points = 'M ' + tip.x + ',' + tip.y + ' L ' + base1.x + ',' + base1.y + ' L ' + base2.x + ',' + base2.y + ' ' + tip.x + ',' + tip.y;
                pointerElement = this.renderer.path( points, { id: pointerObject.id, stroke: border, fill: color } );
            }
            return pointerElement;
        },

        _rotateSpinnerMarks: function ( newAngle ) {
            var that = this;
            var marks = that.spinner.marks;
            if ( marks ) {
                if ( marks.rotate === false ) return;
                var renderer = that.renderer;
                var width = that.widgetSize;
                var color = marks && marks.colorRemaining != null ? marks.colorRemaining : 'transparent';
                color = that._getColor( color );
                var size, angle;
                var type = marks.type;
                if ( !type ) {
                    type = "line";
                }
                var offset = that._getScale( marks.offset, 'w', width / 2 ); // add error handling if value is invalid
                for ( var i = 0; i < that._spinnerMarks.length; i++ ) {
                    $( that._spinnerMarks[ i ] ).remove();
                }
                that._spinnerMarks = [];
                var marksList = that._spinnerMarksList;
                $.each( marksList, function ( key, value ) {
                    if ( that.endAngle - that.startAngle === 360 ) {
                        if ( key == that.max ) {
                            return;
                        }
                    }
                    angle = newAngle + that._calculateAngleFromValue( key, that.startAngle, that.endAngle, that.min, that.max );
                    if ( angle < that.startAngle )
                        return true;

                    if ( angle > that.endAngle && angle < that.startAngle + 360 )
                        return true;

                    if ( type === 'circle' ) {
                        var radius = that._getScale( marks.size, 'w', width / 2 );
                        var position = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset, angle, that.rotation );
                        that._spinnerMarks.push( renderer.circle( position.x, position.y, radius, { fill: color } ) );
                    } else if ( type === 'line' ) {
                        if ( value.type === 'major' && marks.majorSize !== null && marks.majorSize !== undefined ) {
                            size = that._getScale( marks.majorSize, 'w', width / 2 );
                        } else {
                            size = that._getScale( marks.size, 'w', width / 2 );
                        }
                        var thickness = that._getScale( marks.thickness, 'w', width / 2 );
                        var lineStartPosition = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset, angle, that.rotation );
                        var lineEndPosition = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset + size, angle, that.rotation );
                        that._spinnerMarks.push( renderer.line( lineStartPosition.x, lineStartPosition.y, lineEndPosition.x, lineEndPosition.y, {
                            stroke: color,
                            'stroke-width': thickness
                        } ) );
                    }

                } );
            }
        },

        _drawSpinnerMarks: function ( marks ) {
            var that = this;
            if ( marks ) {
                var renderer = that.renderer;
                var width = that.widgetSize;
                var color = marks && marks.colorRemaining != null ? marks.colorRemaining : 'transparent';
                color = that._getColor( color );
                that._spinnerMarks = [];
                var size, angle;
                var type = marks.type;
                if ( !type ) {
                    type = "line";
                }
                var offset = that._getScale( marks.offset, 'w', width / 2 ); // add error handling if value is invalid
                var marksList = that._spinnerMarksList;
                $.each( marksList, function ( key, value ) {
                    if ( that.dragEndAngle - that.dragStartAngle === 360 ) {
                        if ( key == that.max ) {
                            return;
                        }
                    }
                    angle = that.startAngle + that._calculateAngleFromValue( key, that.startAngle, that.endAngle, that.min, that.max );
                    if ( type === 'circle' ) {
                        var radius = that._getScale( marks.size, 'w', width / 2 );
                        var position = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset, angle, that.rotation );
                        that._spinnerMarks.push( renderer.circle( position.x, position.y, radius, { fill: color } ) );
                    } else if ( type === 'line' ) {
                        if ( value.type === 'major' && marks.majorSize !== null && marks.majorSize !== undefined ) {
                            size = that._getScale( marks.majorSize, 'w', width / 2 );
                        } else {
                            size = that._getScale( marks.size, 'w', width / 2 );
                        }
                        var thickness = that._getScale( marks.thickness, 'w', width / 2 );
                        var lineStartPosition = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset, angle, that.rotation );
                        var lineEndPosition = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset + size, angle, that.rotation );

                        that._spinnerMarks.push( renderer.line( lineStartPosition.x, lineStartPosition.y, lineEndPosition.x, lineEndPosition.y, {
                            stroke: color,
                            'stroke-width': thickness
                        } ) );
                    }

                } );
            }
        },

        _drawSpinner: function () {
            var that = this;
            if ( that.spinner ) {
                var renderer = that.renderer;
                var width = that.widgetSize;
                if ( !that.spinner.style ) {
                    that.spinner.style = { fill: "#dfe3e9", stroke: "#dfe3e9" };
                }
                var color = that._getColor( that.spinner.style.fill );
                var border = that.spinner.style.stroke || '';
                var cx, cy;
                cx = cy = width / 2;
                var outerRadius = that._getScale( that.spinner.outerRadius, 'w', width / 2 );
                var innerRadius = that._getScale( that.spinner.innerRadius, 'w', width / 2 );
                var strokeWidth = color.strokeWidth ? color.strokeWidth : 2;

                renderer.pieslice( cx, cy, innerRadius, outerRadius, 360 - that.endAngle, 360 - that.startAngle, 0, { "stroke-width": strokeWidth, fill: color, stroke: border } );
                if ( that.spinner.marks ) {
                    that._drawSpinnerMarks( that.spinner.marks );
                    return;
                    that._spinnerMarks = [];
                    var size, thickness, marksColor;
                    size = that._getScale( that.spinner.marks.size, 'w', width / 2 );
                    thickness = that._getScale( that.spinner.marks.thickness, 'w', width / 2 );
                    var offset = that._getScale( that.spinner.marks.offset, 'w', width / 2 );
                    var steps = 0;

                    $.each( that._spinnerMarksList, function ( key, value ) {
                        steps++;
                    } );

                    marksColor = that._getColor( that.spinner.marks.colorRemaining );
                    var angle;
                    for ( var i = 0; i < steps; i++ ) {
                        angle = that.startAngle + i / steps * that.dragEndAngle;
                        var lineStartPosition = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset, angle, that.rotation );
                        var lineEndPosition = that._getPointerPosition( {
                            x: width / 2,
                            y: width / 2
                        }, offset + size, angle, that.rotation );
                        that._spinnerMarks.push( renderer.line( lineStartPosition.x, lineStartPosition.y, lineEndPosition.x, lineEndPosition.y, {
                            stroke: marksColor,
                            'stroke-width': thickness
                        } ) );
                    }
                }
            }
        },

        _getColor: function ( color ) {
            if ( color && typeof ( color ) === 'object' ) {
                return this._getGradient( color.color, color.gradientType, color.gradientStops );
            }
            return color;
        },

        _getGradient: function ( color, type, stops ) {
            if ( type && stops != null && typeof ( stops ) === 'object' ) {
                if ( type === 'linear' ) {
                    color = this.renderer._toLinearGradient( color, true, stops );
                }
                else if ( type === 'linearHorizontal' ) {
                    color = this.renderer._toLinearGradient( color, false, stops );
                }
                else if ( type === 'radial' ) {
                    color = this.renderer._toRadialGradient( color, stops );
                }
            }
            return color;
        },

        _isArray: function ( o ) {
            return Object.prototype.toString.call( o ) === '[object Array]';
        },

        _events: [ 'slide', 'change' ],

        _raiseEvent: function ( eventId, args ) {
            var eventType = this._events[ eventId ],
                event = $.Event( eventType );
            event.args = args;
            return this.host.trigger( event );
        },

        _movePointers: function () {
            var that = this;
            var angle;
            for ( var i = 0; i < that._pointers.length; i++ ) {
                if ( that._pointers.length !== 1 ) {
                    angle = that.dragStartAngle + that._calculateAngleFromValue( that.value[ i ], that.dragStartAngle, that.dragEndAngle, that.min, that.max );
                    that._pointers[ i ] = that._movePointer( that._pointers[ i ], that.pointer[ i ], angle, that.value[ i ] );
                } else {
                    angle = that.dragStartAngle + that._calculateAngleFromValue( that.value, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
                    that._pointers[ 0 ] = that._movePointer( that._pointers[ 0 ], that.pointer, angle, that.value );
                }
            }
        },

        _movePointer: function ( pointerElement, pointerObject, angle, value ) {
            var that = this;
            // moving is faster than redrawing, so move when possible
            var renderer = that.renderer;
            var width = that.widgetSize;
            var size;
            var type = pointerObject.type;
            if ( !type ) {
                type = "circle";
            }
            var offset = that._getScale( pointerObject.offset, 'w', width / 2 ); // add error handling if value is invalid
            if ( type === 'circle' ) {
                var position = that._getPointerPosition( { x: width / 2, y: width / 2 }, offset, angle, that.rotation );
                renderer.attr( pointerElement, { cx: position.x, cy: position.y } );
                if ( $.jqx.browser.msie && $.jqx.browser.version < 9 ) {
                    $( '#' + pointerObject.id ).remove();
                    pointerElement = that._drawPointer( value, pointerObject );
                }
            } else if ( type === 'line' ) {
                size = that._getScale( pointerObject.size, 'w', width / 2 );
                var lineStartPosition = that._getPointerPosition( { x: width / 2, y: width / 2 }, offset, angle, that.rotation );
                var lineEndPosition = that._getPointerPosition( { x: width / 2, y: width / 2 }, offset + size, angle, that.rotation );
                renderer.attr( pointerElement, { x1: lineStartPosition.x, y1: lineStartPosition.y, x2: lineEndPosition.x, y2: lineEndPosition.y } );
                if ( $.jqx.browser.msie && $.jqx.browser.version < 9 ) {
                    $( '#' + pointerObject.id ).remove();
                    pointerElement = that._drawPointer( value, pointerObject );
                }
            } else if ( type === 'arrow' ) {
                size = that._getScale( pointerObject.size, 'w', width / 2 );
                var thickness = pointerObject.thickness;
                var tip = that._getPointerPosition( { x: width / 2, y: width / 2 }, size, angle, that.rotation );
                var baseFoundation = that._getPointerPosition( { x: width / 2, y: width / 2 }, offset, angle, that.rotation );
                var base1 = that._getPointerPosition( { x: baseFoundation.x, y: baseFoundation.y }, thickness / 2, angle - 90, that.rotation );
                var base2 = that._getPointerPosition( { x: baseFoundation.x, y: baseFoundation.y }, thickness / 2, angle + 90, that.rotation );
                var points = 'M ' + tip.x + ',' + tip.y + ' L ' + base1.x + ',' + base1.y + ' L ' + base2.x + ',' + base2.y + ' ' + tip.x + ',' + tip.y;
                renderer.attr( pointerElement, { d: points } );
                if ( $.jqx.browser.msie && $.jqx.browser.version < 9 ) {
                    $( '#' + pointerObject.id ).remove();
                    pointerElement = that._drawPointer( value, pointerObject );
                }
            } else if ( type === 'arc' ) {
                $( '#' + pointerObject.id ).remove();
                pointerElement = that._drawPointer( pointerObject );
            }
            if ( that.progressBar ) {
                pointerElement.parentNode.appendChild( pointerElement.parentNode.removeChild( pointerElement ) );
            }
            return pointerElement;
        },

        _getPointerPosition: function ( center, radius, angle, rotation ) {
            if ( $.jqx.browser.msie && $.jqx.browser.version < 9 ) {
                return {
                    x: parseInt( center.x + radius * Math.sin( Math.PI / 180 * ( angle + 90 ) ) ),
                    y: rotation === 'clockwise' ? parseInt( center.y + radius * Math.sin( Math.PI / 180 * ( angle ) ) ) : parseInt( center.y - radius * Math.sin( Math.PI / 180 * ( angle ) ) )
                };
            }
            return {
                x: center.x + radius * Math.sin( Math.PI / 180 * ( angle + 90 ) ),
                y: rotation === 'clockwise' ? center.y + radius * Math.sin( Math.PI / 180 * ( angle ) ) : center.y - radius * Math.sin( Math.PI / 180 * ( angle ) )
            };
        },

        _getID: function () {
            var S4 = function () {
                return ( ( ( 1 + Math.random() ) * 0x10 ) | 0 );
            };
            return ( '' + S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4() );
        },

        _decrement: function () {
            this._setValue( this.value - this.step, "mouse" );
        },

        _increment: function () {
            this._setValue( this.value + this.step, "mouse" );
        },

        _refresh: function () {
            var that = this;
            if ( that.disabled ) {
                that.host.addClass( that.toThemeProperty( 'jqx-fill-state-disabled' ) );
            }

            if ( !that.renderer ) {
                that._isVML = false;
                that.host.empty();
                that._initRenderer( that.host );
            }
            that.removeHandler( $( document ), 'mousemove.jqxKnob' + that.host[ 0 ].id );
            that.removeHandler( $( document ), 'blur.jqxKnob' + that.host[ 0 ].id );
            that.removeHandler( $( document ), 'mouseup.jqxKnob' + that.host[ 0 ].id );
            that.removeHandler( that.host, 'wheel' );
            that.removeHandler( that.host, 'mousedown' );
            that.host.empty();
            that._initRenderer( that.host );
            var renderer = that.renderer;
            if ( !renderer )
                return;


            that._steps = [];
            for ( var i = 0; i <= ( that.max - that.min ) / that.step; i++ ) {
                that._steps.push( that.min + that.step * i );
            }
            that._initValues();
            that._render();
        },

        _render: function () {
            var that = this;
            that._drawBackground();
            that._drawDial();
            that._drawMarks();
            that._drawLabels();
            that._drawSpinner();
            that._drawProgressBars();
            that._updateMarksColor();
            that._updateSpinnerMarksColor();
            that._drawPointers();
            that._attatchPointerEventHandlers();
        },

        _setValue: function ( value, source ) {
            var that = this;
            var oldValue = that.value;
            if ( isNaN( value ) ) {
                value = that.min;
            }
            if ( value > that.max ) {
                value = that.max;
            } else if ( value < that.min ) {
                value = that.min;
            }
            if ( that.snapToStep ) {
                var steps = that._steps;
                for ( var i = 0; i < steps.length; i++ ) {
                    if ( value < steps[ i ] ) {
                        if ( i === 0 ) {
                            value = steps[ i ];
                        } else {
                            if ( steps[ i ] - value < value - steps[ i - 1 ] ) {
                                value = steps[ i ];
                            } else {
                                value = steps[ i - 1 ];
                            }
                        }
                        break;
                    }
                }
            }

            if ( value == oldValue ) {
                return;
            }
            if ( $.isArray( that.value ) ) {
                if ( that._pointerGrabbedIndex != -1 ) {
                    if ( that._pointerGrabbedIndex == 1 ) {
                        var firstPointerValue = that.value[ 0 ];
                        that.value[ that._pointerGrabbedIndex ] = value;
                    }

                    if ( that._pointerGrabbedIndex == 0 ) {
                        var secondPointerValue = that.value[ 1 ];
                        that.value[ that._pointerGrabbedIndex ] = value;
                    }

                    that.value[ that._pointerGrabbedIndex ] = value;
                }
            } else {
                that.value = value;
            }
            that._updateProgressBarColor();
            that._updateMarksColor();
            that._updateSpinnerMarksColor();
            var angle = that.dragStartAngle + that._calculateAngleFromValue( value, that.dragStartAngle, that.dragEndAngle, that.min, that.max );
            that._rotateSpinnerMarks( angle );
            that._movePointers();
            that._raiseEvent( 1, { value: that.value, type: source } );
        },

        _updateMarksColor: function () {
            var that = this;

            if ( that.marks && ( that.marks.colorProgress || that.marks.colorRemaining ) ) {
                var renderer = that.renderer;
                var keys = [];
                $.each( that._marksList, function ( key ) {
                    if ( that.endAngle - that.startAngle === 360 ) {
                        if ( key == that.max ) {
                            keys.push( key );
                            return;
                        }
                    }
                    keys.push( key );
                } );
                var colorProgress = that._getColor( that.marks.colorProgress );
                var colorRemaining = that._getColor( that.marks.colorRemaining );
                var value = that.value.length ? that.value[ 0 ] : that.value;
                for ( var i = 0; i < that._dialMarks.length; i++ ) {
                    if ( keys[ i ] > value ) {
                        if ( that.marks.type === 'circle' ) {
                            renderer.attr( that._dialMarks[ i ], { fill: colorRemaining } );
                        } else {
                            renderer.attr( that._dialMarks[ i ], { stroke: colorRemaining } );
                        }
                    } else {
                        if ( that.marks.type === 'circle' ) {
                            renderer.attr( that._dialMarks[ i ], { fill: colorProgress } );
                        } else {
                            renderer.attr( that._dialMarks[ i ], { stroke: colorProgress } );
                        }
                    }
                    if ( that.progressBar && that.marks.drawAboveProgressBar ) {
                        that._dialMarks[ i ].parentNode.appendChild( that._dialMarks[ i ].parentNode.removeChild( that._dialMarks[ i ] ) );
                    }
                }
            }
        },

        _updateSpinnerMarksColor: function () {
            var that = this;
            if ( !that.spinner )
                return;
            if ( !that.spinner.marks )
                return;

            if ( that.spinner.marks && ( that.spinner.marks.colorProgress || that.spinner.marks.colorRemaining ) ) {
                var renderer = that.renderer;
                var keys = [];
                $.each( that._spinnerMarksList, function ( key ) {
                    if ( that.endAngle - that.startAngle === 360 ) {
                        if ( key == that.max ) {
                            return;
                        }
                    }
                    keys.push( key );
                } );
                var colorProgress = that._getColor( that.spinner.marks.colorProgress );
                var colorRemaining = that._getColor( that.spinner.marks.colorRemaining );
                var value = that.value.length ? that.value[ 0 ] : that.value;
                for ( var i = 0; i < that._spinnerMarks.length; i++ ) {
                    if ( keys[ i ] > value ) {
                        if ( that.spinner.marks.type === 'circle' ) {
                            renderer.attr( that._spinnerMarks[ i ], { fill: colorRemaining } );
                        } else {
                            renderer.attr( that._spinnerMarks[ i ], { stroke: colorRemaining } );
                        }
                    } else {
                        if ( that.spinner.marks.type === 'circle' ) {
                            renderer.attr( that._spinnerMarks[ i ], { fill: colorProgress } );
                        } else {
                            renderer.attr( that._spinnerMarks[ i ], { stroke: colorProgress } );
                        }
                    }
                }
            }
        },

        _updateProgressBarColor: function () {
            var that = this;
            if ( that.progressBar ) {
                that._drawProgressBars(); //arcs need to be redrawn
            }
        },

        _validateProperties: function () {
            var that = this;

            var validateStyleObj = function ( styleObject, color ) {
                if ( styleObject && typeof ( styleObject ) === 'string' ) {
                    var c = styleObject;
                    styleObject = { fill: c, stroke: c };
                    return styleObject;
                    return;
                }

                if ( !styleObject ) {
                    styleObject = {};
                    styleObject.fill = color;
                    styleObject.stroke = color;
                }
                if ( styleObject && styleObject.fill && !styleObject.stroke ) {
                    styleObject.stroke = styleObject.fill;
                }
                if ( styleObject && !styleObject.fill && styleObject.stroke ) {
                    styleObject.fill = styleObject.stroke;
                }

                if ( styleObject && !styleObject.fill ) {
                    styleObject.fill = color;
                }

                if ( styleObject && !styleObject.stroke ) {
                    styleObject.stroke = color;
                }
                return styleObject;
            }
            if ( that.dial ) {
                that.dial.style = validateStyleObj( that.dial.style, "#dddddd" );
            }
            if ( that.style ) {
                that.style = validateStyleObj( that.style, "#dddddd" );
            }
            if ( that.progressBar ) {
                that.progressBar.style = validateStyleObj( that.progressBar.style, "transparent" );
                that.progressBar.background = validateStyleObj( that.progressBar.background, "transparent" );
            }
            if ( that.spinner ) {
                that.spinner.style = validateStyleObj( that.spinner.style, "transparent" );
            }
            if ( that.pointer ) {
                that.pointer.style = validateStyleObj( that.pointer.style, "transparent" );
            }

            if ( that.startAngle >= that.endAngle ) {
                throw new Error( 'jqxKnob: The end angle must be bigger than the start angle!' );
            }
            if ( that.startAngle < 0 || that.startAngle > 360 ) {
                throw new Error( 'jqxKnob: Start angle must be between 0 and 360' );
            }
            if ( that.endAngle > that.startAngle + 360 ) {
                throw new Error( 'jqxKnob: End angle must be between startAngle and startAngle + 360' );
            }
            if ( that.dial && that.dial.color && that.dial.color !== 'transparent' ) {
                if ( !that.dial.outerRadius || !that.dial.innerRadius ) {
                    throw new Error( 'jqxKnob: Dial options innerRadius and outerRadius need to be specified' );
                }
            }

            if ( that._isArray( that.pointer ) || that._isArray( that.value ) ) {
                if ( !that._isArray( that.pointer ) ) {
                    throw new Error( 'jqxKnob: If the value is an array, the pointer must also be an array.' );
                }
                if ( !that._isArray( that.value ) ) {
                    throw new Error( 'jqxKnob: If the pointer is an array, the value must also be an array.' );
                }
                if ( that.pointer.length !== that.value.length ) {
                    throw new Error( 'jqxKnob: The pointer and value array sizes must match.' );
                }
                if ( that.progressBar ) {
                    if ( !that._isArray( that.progressBar.style ) || that.progressBar.style.length !== that.pointer.length ) {
                        throw new Error( 'jqxKnob: progressBar color must be an array with the same number of elements as the pointer and value.' );
                    }
                }
            }
            return true;
        }

    } );
} )( jqxBaseFramework );
})();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_775168__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_775168__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__nested_webpack_require_775168__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_775168__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nested_webpack_require_775168__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_775168__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_775168__.o(definition, key) && !__nested_webpack_require_775168__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_775168__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _jqxcore__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_775168__(5459);
/* harmony import */ var _jqxcore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_775168__.n(_jqxcore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jqxdatetimeinput__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_775168__(4993);
/* harmony import */ var _jqxdatetimeinput__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_775168__.n(_jqxdatetimeinput__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jqxinput__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_775168__(5875);
/* harmony import */ var _jqxinput__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nested_webpack_require_775168__.n(_jqxinput__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jqxknob__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_775168__(887);
/* harmony import */ var _jqxknob__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__nested_webpack_require_775168__.n(_jqxknob__WEBPACK_IMPORTED_MODULE_3__);




})();

/******/ })()
;
/******/ })()
;