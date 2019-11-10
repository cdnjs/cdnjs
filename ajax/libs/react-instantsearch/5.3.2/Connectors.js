/*! React InstantSearch 5.3.2 | © Algolia, inc. | https://community.algolia.com/react-instantsearch */
(function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
            typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
            (factory((global.ReactInstantSearch = global.ReactInstantSearch || {}, global.ReactInstantSearch.Connectors = {}),global.React));
}(this, (function (exports,React) { 'use strict';

            var React__default = 'default' in React ? React['default'] : React;

            var global$1 = (typeof global !== "undefined" ? global :
                        typeof self !== "undefined" ? self :
                        typeof window !== "undefined" ? window : {});

            // shim for using process in browser
            // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }
            function defaultClearTimeout () {
                throw new Error('clearTimeout has not been defined');
            }
            var cachedSetTimeout = defaultSetTimout;
            var cachedClearTimeout = defaultClearTimeout;
            if (typeof global$1.setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            }
            if (typeof global$1.clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            }

            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                    //normal enviroments in sane situations
                    return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedSetTimeout(fun, 0);
                } catch(e){
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch(e){
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }


            }
            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                    //normal enviroments in sane situations
                    return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedClearTimeout(marker);
                } catch (e){
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e){
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                        return cachedClearTimeout.call(this, marker);
                    }
                }



            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                    return;
                }
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while(len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        if (currentQueue) {
                            currentQueue[queueIndex].run();
                        }
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
            }
            function nextTick(fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                }
            }
            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function () {
                this.fun.apply(null, this.array);
            };
            var title = 'browser';
            var platform = 'browser';
            var browser = true;
            var env = {};
            var argv = [];
            var version = ''; // empty string to avoid regexp issues
            var versions = {};
            var release = {};
            var config = {};

            function noop() {}

            var on = noop;
            var addListener = noop;
            var once = noop;
            var off = noop;
            var removeListener = noop;
            var removeAllListeners = noop;
            var emit = noop;

            function binding(name) {
                throw new Error('process.binding is not supported');
            }

            function cwd () { return '/' }
            function chdir (dir) {
                throw new Error('process.chdir is not supported');
            }function umask() { return 0; }

            // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
            var performance = global$1.performance || {};
            var performanceNow =
              performance.now        ||
              performance.mozNow     ||
              performance.msNow      ||
              performance.oNow       ||
              performance.webkitNow  ||
              function(){ return (new Date()).getTime() };

            // generate timestamp or delta
            // see http://nodejs.org/api/process.html#process_process_hrtime
            function hrtime(previousTimestamp){
              var clocktime = performanceNow.call(performance)*1e-3;
              var seconds = Math.floor(clocktime);
              var nanoseconds = Math.floor((clocktime%1)*1e9);
              if (previousTimestamp) {
                seconds = seconds - previousTimestamp[0];
                nanoseconds = nanoseconds - previousTimestamp[1];
                if (nanoseconds<0) {
                  seconds--;
                  nanoseconds += 1e9;
                }
              }
              return [seconds,nanoseconds]
            }

            var startTime = new Date();
            function uptime() {
              var currentTime = new Date();
              var dif = currentTime - startTime;
              return dif / 1000;
            }

            var process = {
              nextTick: nextTick,
              title: title,
              browser: browser,
              env: env,
              argv: argv,
              version: version,
              versions: versions,
              on: on,
              addListener: addListener,
              once: once,
              off: off,
              removeListener: removeListener,
              removeAllListeners: removeAllListeners,
              emit: emit,
              binding: binding,
              cwd: cwd,
              chdir: chdir,
              umask: umask,
              hrtime: hrtime,
              platform: platform,
              release: release,
              config: config,
              uptime: uptime
            };

            var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

            function createCommonjsModule(fn, module) {
            	return module = { exports: {} }, fn(module, module.exports), module.exports;
            }

            /**
             * Copyright (c) 2013-present, Facebook, Inc.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             *
             * 
             */

            function makeEmptyFunction(arg) {
              return function () {
                return arg;
              };
            }

            /**
             * This function accepts and discards inputs; it has no side effects. This is
             * primarily useful idiomatically for overridable function endpoints which
             * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
             */
            var emptyFunction = function emptyFunction() {};

            emptyFunction.thatReturns = makeEmptyFunction;
            emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
            emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
            emptyFunction.thatReturnsNull = makeEmptyFunction(null);
            emptyFunction.thatReturnsThis = function () {
              return this;
            };
            emptyFunction.thatReturnsArgument = function (arg) {
              return arg;
            };

            var emptyFunction_1 = emptyFunction;

            /**
             * Use invariant() to assert state which your program assumes to be true.
             *
             * Provide sprintf-style format (only %s is supported) and arguments
             * to provide information about what broke and what you were
             * expecting.
             *
             * The invariant message will be stripped in production, but the invariant
             * will remain to ensure logic does not differ in production.
             */

            var validateFormat = function validateFormat(format) {};

            function invariant(condition, format, a, b, c, d, e, f) {
              validateFormat(format);

              if (!condition) {
                var error;
                if (format === undefined) {
                  error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
                } else {
                  var args = [a, b, c, d, e, f];
                  var argIndex = 0;
                  error = new Error(format.replace(/%s/g, function () {
                    return args[argIndex++];
                  }));
                  error.name = 'Invariant Violation';
                }

                error.framesToPop = 1; // we don't care about invariant's own frame
                throw error;
              }
            }

            var invariant_1 = invariant;

            /*
            object-assign
            (c) Sindre Sorhus
            @license MIT
            */
            /* eslint-disable no-unused-vars */
            var getOwnPropertySymbols = Object.getOwnPropertySymbols;
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var propIsEnumerable = Object.prototype.propertyIsEnumerable;

            function toObject(val) {
            	if (val === null || val === undefined) {
            		throw new TypeError('Object.assign cannot be called with null or undefined');
            	}

            	return Object(val);
            }

            function shouldUseNative() {
            	try {
            		if (!Object.assign) {
            			return false;
            		}

            		// Detect buggy property enumeration order in older V8 versions.

            		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
            		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
            		test1[5] = 'de';
            		if (Object.getOwnPropertyNames(test1)[0] === '5') {
            			return false;
            		}

            		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
            		var test2 = {};
            		for (var i = 0; i < 10; i++) {
            			test2['_' + String.fromCharCode(i)] = i;
            		}
            		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
            			return test2[n];
            		});
            		if (order2.join('') !== '0123456789') {
            			return false;
            		}

            		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
            		var test3 = {};
            		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
            			test3[letter] = letter;
            		});
            		if (Object.keys(Object.assign({}, test3)).join('') !==
            				'abcdefghijklmnopqrst') {
            			return false;
            		}

            		return true;
            	} catch (err) {
            		// We don't expect any of the above to throw, but better to be safe.
            		return false;
            	}
            }

            var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
            	var from;
            	var to = toObject(target);
            	var symbols;

            	for (var s = 1; s < arguments.length; s++) {
            		from = Object(arguments[s]);

            		for (var key in from) {
            			if (hasOwnProperty.call(from, key)) {
            				to[key] = from[key];
            			}
            		}

            		if (getOwnPropertySymbols) {
            			symbols = getOwnPropertySymbols(from);
            			for (var i = 0; i < symbols.length; i++) {
            				if (propIsEnumerable.call(from, symbols[i])) {
            					to[symbols[i]] = from[symbols[i]];
            				}
            			}
            		}
            	}

            	return to;
            };

            /**
             * Copyright (c) 2013-present, Facebook, Inc.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */

            var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

            var ReactPropTypesSecret_1 = ReactPropTypesSecret;

            var factoryWithThrowingShims = function() {
              function shim(props, propName, componentName, location, propFullName, secret) {
                if (secret === ReactPropTypesSecret_1) {
                  // It is still safe when called from React.
                  return;
                }
                invariant_1(
                  false,
                  'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
                  'Use PropTypes.checkPropTypes() to call them. ' +
                  'Read more at http://fb.me/use-check-prop-types'
                );
              }  shim.isRequired = shim;
              function getShim() {
                return shim;
              }  // Important!
              // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
              var ReactPropTypes = {
                array: shim,
                bool: shim,
                func: shim,
                number: shim,
                object: shim,
                string: shim,
                symbol: shim,

                any: shim,
                arrayOf: getShim,
                element: shim,
                instanceOf: getShim,
                node: shim,
                objectOf: getShim,
                oneOf: getShim,
                oneOfType: getShim,
                shape: getShim,
                exact: getShim
              };

              ReactPropTypes.checkPropTypes = emptyFunction_1;
              ReactPropTypes.PropTypes = ReactPropTypes;

              return ReactPropTypes;
            };

            var propTypes = createCommonjsModule(function (module) {
            /**
             * Copyright (c) 2013-present, Facebook, Inc.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */

            {
              // By explicitly using `prop-types` you are opting into new production behavior.
              // http://fb.me/prop-types-in-prod
              module.exports = factoryWithThrowingShims();
            }
            });

            /**
             * Removes all key-value entries from the list cache.
             *
             * @private
             * @name clear
             * @memberOf ListCache
             */
            function listCacheClear() {
              this.__data__ = [];
              this.size = 0;
            }

            var _listCacheClear = listCacheClear;

            /**
             * Performs a
             * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
             * comparison between two values to determine if they are equivalent.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to compare.
             * @param {*} other The other value to compare.
             * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
             * @example
             *
             * var object = { 'a': 1 };
             * var other = { 'a': 1 };
             *
             * _.eq(object, object);
             * // => true
             *
             * _.eq(object, other);
             * // => false
             *
             * _.eq('a', 'a');
             * // => true
             *
             * _.eq('a', Object('a'));
             * // => false
             *
             * _.eq(NaN, NaN);
             * // => true
             */
            function eq(value, other) {
              return value === other || (value !== value && other !== other);
            }

            var eq_1 = eq;

            /**
             * Gets the index at which the `key` is found in `array` of key-value pairs.
             *
             * @private
             * @param {Array} array The array to inspect.
             * @param {*} key The key to search for.
             * @returns {number} Returns the index of the matched value, else `-1`.
             */
            function assocIndexOf(array, key) {
              var length = array.length;
              while (length--) {
                if (eq_1(array[length][0], key)) {
                  return length;
                }
              }
              return -1;
            }

            var _assocIndexOf = assocIndexOf;

            /** Used for built-in method references. */
            var arrayProto = Array.prototype;

            /** Built-in value references. */
            var splice = arrayProto.splice;

            /**
             * Removes `key` and its value from the list cache.
             *
             * @private
             * @name delete
             * @memberOf ListCache
             * @param {string} key The key of the value to remove.
             * @returns {boolean} Returns `true` if the entry was removed, else `false`.
             */
            function listCacheDelete(key) {
              var data = this.__data__,
                  index = _assocIndexOf(data, key);

              if (index < 0) {
                return false;
              }
              var lastIndex = data.length - 1;
              if (index == lastIndex) {
                data.pop();
              } else {
                splice.call(data, index, 1);
              }
              --this.size;
              return true;
            }

            var _listCacheDelete = listCacheDelete;

            /**
             * Gets the list cache value for `key`.
             *
             * @private
             * @name get
             * @memberOf ListCache
             * @param {string} key The key of the value to get.
             * @returns {*} Returns the entry value.
             */
            function listCacheGet(key) {
              var data = this.__data__,
                  index = _assocIndexOf(data, key);

              return index < 0 ? undefined : data[index][1];
            }

            var _listCacheGet = listCacheGet;

            /**
             * Checks if a list cache value for `key` exists.
             *
             * @private
             * @name has
             * @memberOf ListCache
             * @param {string} key The key of the entry to check.
             * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
             */
            function listCacheHas(key) {
              return _assocIndexOf(this.__data__, key) > -1;
            }

            var _listCacheHas = listCacheHas;

            /**
             * Sets the list cache `key` to `value`.
             *
             * @private
             * @name set
             * @memberOf ListCache
             * @param {string} key The key of the value to set.
             * @param {*} value The value to set.
             * @returns {Object} Returns the list cache instance.
             */
            function listCacheSet(key, value) {
              var data = this.__data__,
                  index = _assocIndexOf(data, key);

              if (index < 0) {
                ++this.size;
                data.push([key, value]);
              } else {
                data[index][1] = value;
              }
              return this;
            }

            var _listCacheSet = listCacheSet;

            /**
             * Creates an list cache object.
             *
             * @private
             * @constructor
             * @param {Array} [entries] The key-value pairs to cache.
             */
            function ListCache(entries) {
              var index = -1,
                  length = entries == null ? 0 : entries.length;

              this.clear();
              while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
              }
            }

            // Add methods to `ListCache`.
            ListCache.prototype.clear = _listCacheClear;
            ListCache.prototype['delete'] = _listCacheDelete;
            ListCache.prototype.get = _listCacheGet;
            ListCache.prototype.has = _listCacheHas;
            ListCache.prototype.set = _listCacheSet;

            var _ListCache = ListCache;

            /**
             * Removes all key-value entries from the stack.
             *
             * @private
             * @name clear
             * @memberOf Stack
             */
            function stackClear() {
              this.__data__ = new _ListCache;
              this.size = 0;
            }

            var _stackClear = stackClear;

            /**
             * Removes `key` and its value from the stack.
             *
             * @private
             * @name delete
             * @memberOf Stack
             * @param {string} key The key of the value to remove.
             * @returns {boolean} Returns `true` if the entry was removed, else `false`.
             */
            function stackDelete(key) {
              var data = this.__data__,
                  result = data['delete'](key);

              this.size = data.size;
              return result;
            }

            var _stackDelete = stackDelete;

            /**
             * Gets the stack value for `key`.
             *
             * @private
             * @name get
             * @memberOf Stack
             * @param {string} key The key of the value to get.
             * @returns {*} Returns the entry value.
             */
            function stackGet(key) {
              return this.__data__.get(key);
            }

            var _stackGet = stackGet;

            /**
             * Checks if a stack value for `key` exists.
             *
             * @private
             * @name has
             * @memberOf Stack
             * @param {string} key The key of the entry to check.
             * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
             */
            function stackHas(key) {
              return this.__data__.has(key);
            }

            var _stackHas = stackHas;

            /** Detect free variable `global` from Node.js. */
            var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

            var _freeGlobal = freeGlobal;

            /** Detect free variable `self`. */
            var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

            /** Used as a reference to the global object. */
            var root = _freeGlobal || freeSelf || Function('return this')();

            var _root = root;

            /** Built-in value references. */
            var Symbol$1 = _root.Symbol;

            var _Symbol = Symbol$1;

            /** Used for built-in method references. */
            var objectProto = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$1 = objectProto.hasOwnProperty;

            /**
             * Used to resolve the
             * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
             * of values.
             */
            var nativeObjectToString = objectProto.toString;

            /** Built-in value references. */
            var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

            /**
             * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
             *
             * @private
             * @param {*} value The value to query.
             * @returns {string} Returns the raw `toStringTag`.
             */
            function getRawTag(value) {
              var isOwn = hasOwnProperty$1.call(value, symToStringTag),
                  tag = value[symToStringTag];

              try {
                value[symToStringTag] = undefined;
              } catch (e) {}

              var result = nativeObjectToString.call(value);
              {
                if (isOwn) {
                  value[symToStringTag] = tag;
                } else {
                  delete value[symToStringTag];
                }
              }
              return result;
            }

            var _getRawTag = getRawTag;

            /** Used for built-in method references. */
            var objectProto$1 = Object.prototype;

            /**
             * Used to resolve the
             * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
             * of values.
             */
            var nativeObjectToString$1 = objectProto$1.toString;

            /**
             * Converts `value` to a string using `Object.prototype.toString`.
             *
             * @private
             * @param {*} value The value to convert.
             * @returns {string} Returns the converted string.
             */
            function objectToString(value) {
              return nativeObjectToString$1.call(value);
            }

            var _objectToString = objectToString;

            /** `Object#toString` result references. */
            var nullTag = '[object Null]',
                undefinedTag = '[object Undefined]';

            /** Built-in value references. */
            var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

            /**
             * The base implementation of `getTag` without fallbacks for buggy environments.
             *
             * @private
             * @param {*} value The value to query.
             * @returns {string} Returns the `toStringTag`.
             */
            function baseGetTag(value) {
              if (value == null) {
                return value === undefined ? undefinedTag : nullTag;
              }
              return (symToStringTag$1 && symToStringTag$1 in Object(value))
                ? _getRawTag(value)
                : _objectToString(value);
            }

            var _baseGetTag = baseGetTag;

            /**
             * Checks if `value` is the
             * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
             * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is an object, else `false`.
             * @example
             *
             * _.isObject({});
             * // => true
             *
             * _.isObject([1, 2, 3]);
             * // => true
             *
             * _.isObject(_.noop);
             * // => true
             *
             * _.isObject(null);
             * // => false
             */
            function isObject(value) {
              var type = typeof value;
              return value != null && (type == 'object' || type == 'function');
            }

            var isObject_1 = isObject;

            /** `Object#toString` result references. */
            var asyncTag = '[object AsyncFunction]',
                funcTag = '[object Function]',
                genTag = '[object GeneratorFunction]',
                proxyTag = '[object Proxy]';

            /**
             * Checks if `value` is classified as a `Function` object.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a function, else `false`.
             * @example
             *
             * _.isFunction(_);
             * // => true
             *
             * _.isFunction(/abc/);
             * // => false
             */
            function isFunction(value) {
              if (!isObject_1(value)) {
                return false;
              }
              // The use of `Object#toString` avoids issues with the `typeof` operator
              // in Safari 9 which returns 'object' for typed arrays and other constructors.
              var tag = _baseGetTag(value);
              return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
            }

            var isFunction_1 = isFunction;

            /** Used to detect overreaching core-js shims. */
            var coreJsData = _root['__core-js_shared__'];

            var _coreJsData = coreJsData;

            /** Used to detect methods masquerading as native. */
            var maskSrcKey = (function() {
              var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
              return uid ? ('Symbol(src)_1.' + uid) : '';
            }());

            /**
             * Checks if `func` has its source masked.
             *
             * @private
             * @param {Function} func The function to check.
             * @returns {boolean} Returns `true` if `func` is masked, else `false`.
             */
            function isMasked(func) {
              return !!maskSrcKey && (maskSrcKey in func);
            }

            var _isMasked = isMasked;

            /** Used for built-in method references. */
            var funcProto = Function.prototype;

            /** Used to resolve the decompiled source of functions. */
            var funcToString = funcProto.toString;

            /**
             * Converts `func` to its source code.
             *
             * @private
             * @param {Function} func The function to convert.
             * @returns {string} Returns the source code.
             */
            function toSource(func) {
              if (func != null) {
                try {
                  return funcToString.call(func);
                } catch (e) {}
                try {
                  return (func + '');
                } catch (e) {}
              }
              return '';
            }

            var _toSource = toSource;

            /**
             * Used to match `RegExp`
             * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
             */
            var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

            /** Used to detect host constructors (Safari). */
            var reIsHostCtor = /^\[object .+?Constructor\]$/;

            /** Used for built-in method references. */
            var funcProto$1 = Function.prototype,
                objectProto$2 = Object.prototype;

            /** Used to resolve the decompiled source of functions. */
            var funcToString$1 = funcProto$1.toString;

            /** Used to check objects for own properties. */
            var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

            /** Used to detect if a method is native. */
            var reIsNative = RegExp('^' +
              funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
              .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
            );

            /**
             * The base implementation of `_.isNative` without bad shim checks.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a native function,
             *  else `false`.
             */
            function baseIsNative(value) {
              if (!isObject_1(value) || _isMasked(value)) {
                return false;
              }
              var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
              return pattern.test(_toSource(value));
            }

            var _baseIsNative = baseIsNative;

            /**
             * Gets the value at `key` of `object`.
             *
             * @private
             * @param {Object} [object] The object to query.
             * @param {string} key The key of the property to get.
             * @returns {*} Returns the property value.
             */
            function getValue(object, key) {
              return object == null ? undefined : object[key];
            }

            var _getValue = getValue;

            /**
             * Gets the native function at `key` of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @param {string} key The key of the method to get.
             * @returns {*} Returns the function if it's native, else `undefined`.
             */
            function getNative(object, key) {
              var value = _getValue(object, key);
              return _baseIsNative(value) ? value : undefined;
            }

            var _getNative = getNative;

            /* Built-in method references that are verified to be native. */
            var Map = _getNative(_root, 'Map');

            var _Map = Map;

            /* Built-in method references that are verified to be native. */
            var nativeCreate = _getNative(Object, 'create');

            var _nativeCreate = nativeCreate;

            /**
             * Removes all key-value entries from the hash.
             *
             * @private
             * @name clear
             * @memberOf Hash
             */
            function hashClear() {
              this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
              this.size = 0;
            }

            var _hashClear = hashClear;

            /**
             * Removes `key` and its value from the hash.
             *
             * @private
             * @name delete
             * @memberOf Hash
             * @param {Object} hash The hash to modify.
             * @param {string} key The key of the value to remove.
             * @returns {boolean} Returns `true` if the entry was removed, else `false`.
             */
            function hashDelete(key) {
              var result = this.has(key) && delete this.__data__[key];
              this.size -= result ? 1 : 0;
              return result;
            }

            var _hashDelete = hashDelete;

            /** Used to stand-in for `undefined` hash values. */
            var HASH_UNDEFINED = '__lodash_hash_undefined__';

            /** Used for built-in method references. */
            var objectProto$3 = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

            /**
             * Gets the hash value for `key`.
             *
             * @private
             * @name get
             * @memberOf Hash
             * @param {string} key The key of the value to get.
             * @returns {*} Returns the entry value.
             */
            function hashGet(key) {
              var data = this.__data__;
              if (_nativeCreate) {
                var result = data[key];
                return result === HASH_UNDEFINED ? undefined : result;
              }
              return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
            }

            var _hashGet = hashGet;

            /** Used for built-in method references. */
            var objectProto$4 = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

            /**
             * Checks if a hash value for `key` exists.
             *
             * @private
             * @name has
             * @memberOf Hash
             * @param {string} key The key of the entry to check.
             * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
             */
            function hashHas(key) {
              var data = this.__data__;
              return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
            }

            var _hashHas = hashHas;

            /** Used to stand-in for `undefined` hash values. */
            var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

            /**
             * Sets the hash `key` to `value`.
             *
             * @private
             * @name set
             * @memberOf Hash
             * @param {string} key The key of the value to set.
             * @param {*} value The value to set.
             * @returns {Object} Returns the hash instance.
             */
            function hashSet(key, value) {
              var data = this.__data__;
              this.size += this.has(key) ? 0 : 1;
              data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
              return this;
            }

            var _hashSet = hashSet;

            /**
             * Creates a hash object.
             *
             * @private
             * @constructor
             * @param {Array} [entries] The key-value pairs to cache.
             */
            function Hash(entries) {
              var index = -1,
                  length = entries == null ? 0 : entries.length;

              this.clear();
              while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
              }
            }

            // Add methods to `Hash`.
            Hash.prototype.clear = _hashClear;
            Hash.prototype['delete'] = _hashDelete;
            Hash.prototype.get = _hashGet;
            Hash.prototype.has = _hashHas;
            Hash.prototype.set = _hashSet;

            var _Hash = Hash;

            /**
             * Removes all key-value entries from the map.
             *
             * @private
             * @name clear
             * @memberOf MapCache
             */
            function mapCacheClear() {
              this.size = 0;
              this.__data__ = {
                'hash': new _Hash,
                'map': new (_Map || _ListCache),
                'string': new _Hash
              };
            }

            var _mapCacheClear = mapCacheClear;

            /**
             * Checks if `value` is suitable for use as unique object key.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
             */
            function isKeyable(value) {
              var type = typeof value;
              return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
                ? (value !== '__proto__')
                : (value === null);
            }

            var _isKeyable = isKeyable;

            /**
             * Gets the data for `map`.
             *
             * @private
             * @param {Object} map The map to query.
             * @param {string} key The reference key.
             * @returns {*} Returns the map data.
             */
            function getMapData(map, key) {
              var data = map.__data__;
              return _isKeyable(key)
                ? data[typeof key == 'string' ? 'string' : 'hash']
                : data.map;
            }

            var _getMapData = getMapData;

            /**
             * Removes `key` and its value from the map.
             *
             * @private
             * @name delete
             * @memberOf MapCache
             * @param {string} key The key of the value to remove.
             * @returns {boolean} Returns `true` if the entry was removed, else `false`.
             */
            function mapCacheDelete(key) {
              var result = _getMapData(this, key)['delete'](key);
              this.size -= result ? 1 : 0;
              return result;
            }

            var _mapCacheDelete = mapCacheDelete;

            /**
             * Gets the map value for `key`.
             *
             * @private
             * @name get
             * @memberOf MapCache
             * @param {string} key The key of the value to get.
             * @returns {*} Returns the entry value.
             */
            function mapCacheGet(key) {
              return _getMapData(this, key).get(key);
            }

            var _mapCacheGet = mapCacheGet;

            /**
             * Checks if a map value for `key` exists.
             *
             * @private
             * @name has
             * @memberOf MapCache
             * @param {string} key The key of the entry to check.
             * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
             */
            function mapCacheHas(key) {
              return _getMapData(this, key).has(key);
            }

            var _mapCacheHas = mapCacheHas;

            /**
             * Sets the map `key` to `value`.
             *
             * @private
             * @name set
             * @memberOf MapCache
             * @param {string} key The key of the value to set.
             * @param {*} value The value to set.
             * @returns {Object} Returns the map cache instance.
             */
            function mapCacheSet(key, value) {
              var data = _getMapData(this, key),
                  size = data.size;

              data.set(key, value);
              this.size += data.size == size ? 0 : 1;
              return this;
            }

            var _mapCacheSet = mapCacheSet;

            /**
             * Creates a map cache object to store key-value pairs.
             *
             * @private
             * @constructor
             * @param {Array} [entries] The key-value pairs to cache.
             */
            function MapCache(entries) {
              var index = -1,
                  length = entries == null ? 0 : entries.length;

              this.clear();
              while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
              }
            }

            // Add methods to `MapCache`.
            MapCache.prototype.clear = _mapCacheClear;
            MapCache.prototype['delete'] = _mapCacheDelete;
            MapCache.prototype.get = _mapCacheGet;
            MapCache.prototype.has = _mapCacheHas;
            MapCache.prototype.set = _mapCacheSet;

            var _MapCache = MapCache;

            /** Used as the size to enable large array optimizations. */
            var LARGE_ARRAY_SIZE = 200;

            /**
             * Sets the stack `key` to `value`.
             *
             * @private
             * @name set
             * @memberOf Stack
             * @param {string} key The key of the value to set.
             * @param {*} value The value to set.
             * @returns {Object} Returns the stack cache instance.
             */
            function stackSet(key, value) {
              var data = this.__data__;
              if (data instanceof _ListCache) {
                var pairs = data.__data__;
                if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
                  pairs.push([key, value]);
                  this.size = ++data.size;
                  return this;
                }
                data = this.__data__ = new _MapCache(pairs);
              }
              data.set(key, value);
              this.size = data.size;
              return this;
            }

            var _stackSet = stackSet;

            /**
             * Creates a stack cache object to store key-value pairs.
             *
             * @private
             * @constructor
             * @param {Array} [entries] The key-value pairs to cache.
             */
            function Stack(entries) {
              var data = this.__data__ = new _ListCache(entries);
              this.size = data.size;
            }

            // Add methods to `Stack`.
            Stack.prototype.clear = _stackClear;
            Stack.prototype['delete'] = _stackDelete;
            Stack.prototype.get = _stackGet;
            Stack.prototype.has = _stackHas;
            Stack.prototype.set = _stackSet;

            var _Stack = Stack;

            /** Used to stand-in for `undefined` hash values. */
            var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

            /**
             * Adds `value` to the array cache.
             *
             * @private
             * @name add
             * @memberOf SetCache
             * @alias push
             * @param {*} value The value to cache.
             * @returns {Object} Returns the cache instance.
             */
            function setCacheAdd(value) {
              this.__data__.set(value, HASH_UNDEFINED$2);
              return this;
            }

            var _setCacheAdd = setCacheAdd;

            /**
             * Checks if `value` is in the array cache.
             *
             * @private
             * @name has
             * @memberOf SetCache
             * @param {*} value The value to search for.
             * @returns {number} Returns `true` if `value` is found, else `false`.
             */
            function setCacheHas(value) {
              return this.__data__.has(value);
            }

            var _setCacheHas = setCacheHas;

            /**
             *
             * Creates an array cache object to store unique values.
             *
             * @private
             * @constructor
             * @param {Array} [values] The values to cache.
             */
            function SetCache(values) {
              var index = -1,
                  length = values == null ? 0 : values.length;

              this.__data__ = new _MapCache;
              while (++index < length) {
                this.add(values[index]);
              }
            }

            // Add methods to `SetCache`.
            SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
            SetCache.prototype.has = _setCacheHas;

            var _SetCache = SetCache;

            /**
             * A specialized version of `_.some` for arrays without support for iteratee
             * shorthands.
             *
             * @private
             * @param {Array} [array] The array to iterate over.
             * @param {Function} predicate The function invoked per iteration.
             * @returns {boolean} Returns `true` if any element passes the predicate check,
             *  else `false`.
             */
            function arraySome(array, predicate) {
              var index = -1,
                  length = array == null ? 0 : array.length;

              while (++index < length) {
                if (predicate(array[index], index, array)) {
                  return true;
                }
              }
              return false;
            }

            var _arraySome = arraySome;

            /**
             * Checks if a `cache` value for `key` exists.
             *
             * @private
             * @param {Object} cache The cache to query.
             * @param {string} key The key of the entry to check.
             * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
             */
            function cacheHas(cache, key) {
              return cache.has(key);
            }

            var _cacheHas = cacheHas;

            /** Used to compose bitmasks for value comparisons. */
            var COMPARE_PARTIAL_FLAG = 1,
                COMPARE_UNORDERED_FLAG = 2;

            /**
             * A specialized version of `baseIsEqualDeep` for arrays with support for
             * partial deep comparisons.
             *
             * @private
             * @param {Array} array The array to compare.
             * @param {Array} other The other array to compare.
             * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
             * @param {Function} customizer The function to customize comparisons.
             * @param {Function} equalFunc The function to determine equivalents of values.
             * @param {Object} stack Tracks traversed `array` and `other` objects.
             * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
             */
            function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                  arrLength = array.length,
                  othLength = other.length;

              if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
                return false;
              }
              // Assume cyclic values are equal.
              var stacked = stack.get(array);
              if (stacked && stack.get(other)) {
                return stacked == other;
              }
              var index = -1,
                  result = true,
                  seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

              stack.set(array, other);
              stack.set(other, array);

              // Ignore non-index properties.
              while (++index < arrLength) {
                var arrValue = array[index],
                    othValue = other[index];

                if (customizer) {
                  var compared = isPartial
                    ? customizer(othValue, arrValue, index, other, array, stack)
                    : customizer(arrValue, othValue, index, array, other, stack);
                }
                if (compared !== undefined) {
                  if (compared) {
                    continue;
                  }
                  result = false;
                  break;
                }
                // Recursively compare arrays (susceptible to call stack limits).
                if (seen) {
                  if (!_arraySome(other, function(othValue, othIndex) {
                        if (!_cacheHas(seen, othIndex) &&
                            (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                          return seen.push(othIndex);
                        }
                      })) {
                    result = false;
                    break;
                  }
                } else if (!(
                      arrValue === othValue ||
                        equalFunc(arrValue, othValue, bitmask, customizer, stack)
                    )) {
                  result = false;
                  break;
                }
              }
              stack['delete'](array);
              stack['delete'](other);
              return result;
            }

            var _equalArrays = equalArrays;

            /** Built-in value references. */
            var Uint8Array = _root.Uint8Array;

            var _Uint8Array = Uint8Array;

            /**
             * Converts `map` to its key-value pairs.
             *
             * @private
             * @param {Object} map The map to convert.
             * @returns {Array} Returns the key-value pairs.
             */
            function mapToArray(map) {
              var index = -1,
                  result = Array(map.size);

              map.forEach(function(value, key) {
                result[++index] = [key, value];
              });
              return result;
            }

            var _mapToArray = mapToArray;

            /**
             * Converts `set` to an array of its values.
             *
             * @private
             * @param {Object} set The set to convert.
             * @returns {Array} Returns the values.
             */
            function setToArray(set) {
              var index = -1,
                  result = Array(set.size);

              set.forEach(function(value) {
                result[++index] = value;
              });
              return result;
            }

            var _setToArray = setToArray;

            /** Used to compose bitmasks for value comparisons. */
            var COMPARE_PARTIAL_FLAG$1 = 1,
                COMPARE_UNORDERED_FLAG$1 = 2;

            /** `Object#toString` result references. */
            var boolTag = '[object Boolean]',
                dateTag = '[object Date]',
                errorTag = '[object Error]',
                mapTag = '[object Map]',
                numberTag = '[object Number]',
                regexpTag = '[object RegExp]',
                setTag = '[object Set]',
                stringTag = '[object String]',
                symbolTag = '[object Symbol]';

            var arrayBufferTag = '[object ArrayBuffer]',
                dataViewTag = '[object DataView]';

            /** Used to convert symbols to primitives and strings. */
            var symbolProto = _Symbol ? _Symbol.prototype : undefined,
                symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

            /**
             * A specialized version of `baseIsEqualDeep` for comparing objects of
             * the same `toStringTag`.
             *
             * **Note:** This function only supports comparing values with tags of
             * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
             *
             * @private
             * @param {Object} object The object to compare.
             * @param {Object} other The other object to compare.
             * @param {string} tag The `toStringTag` of the objects to compare.
             * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
             * @param {Function} customizer The function to customize comparisons.
             * @param {Function} equalFunc The function to determine equivalents of values.
             * @param {Object} stack Tracks traversed `object` and `other` objects.
             * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
             */
            function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
              switch (tag) {
                case dataViewTag:
                  if ((object.byteLength != other.byteLength) ||
                      (object.byteOffset != other.byteOffset)) {
                    return false;
                  }
                  object = object.buffer;
                  other = other.buffer;

                case arrayBufferTag:
                  if ((object.byteLength != other.byteLength) ||
                      !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
                    return false;
                  }
                  return true;

                case boolTag:
                case dateTag:
                case numberTag:
                  // Coerce booleans to `1` or `0` and dates to milliseconds.
                  // Invalid dates are coerced to `NaN`.
                  return eq_1(+object, +other);

                case errorTag:
                  return object.name == other.name && object.message == other.message;

                case regexpTag:
                case stringTag:
                  // Coerce regexes to strings and treat strings, primitives and objects,
                  // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
                  // for more details.
                  return object == (other + '');

                case mapTag:
                  var convert = _mapToArray;

                case setTag:
                  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
                  convert || (convert = _setToArray);

                  if (object.size != other.size && !isPartial) {
                    return false;
                  }
                  // Assume cyclic values are equal.
                  var stacked = stack.get(object);
                  if (stacked) {
                    return stacked == other;
                  }
                  bitmask |= COMPARE_UNORDERED_FLAG$1;

                  // Recursively compare objects (susceptible to call stack limits).
                  stack.set(object, other);
                  var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                  stack['delete'](object);
                  return result;

                case symbolTag:
                  if (symbolValueOf) {
                    return symbolValueOf.call(object) == symbolValueOf.call(other);
                  }
              }
              return false;
            }

            var _equalByTag = equalByTag;

            /**
             * Appends the elements of `values` to `array`.
             *
             * @private
             * @param {Array} array The array to modify.
             * @param {Array} values The values to append.
             * @returns {Array} Returns `array`.
             */
            function arrayPush(array, values) {
              var index = -1,
                  length = values.length,
                  offset = array.length;

              while (++index < length) {
                array[offset + index] = values[index];
              }
              return array;
            }

            var _arrayPush = arrayPush;

            /**
             * Checks if `value` is classified as an `Array` object.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is an array, else `false`.
             * @example
             *
             * _.isArray([1, 2, 3]);
             * // => true
             *
             * _.isArray(document.body.children);
             * // => false
             *
             * _.isArray('abc');
             * // => false
             *
             * _.isArray(_.noop);
             * // => false
             */
            var isArray = Array.isArray;

            var isArray_1 = isArray;

            /**
             * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
             * `keysFunc` and `symbolsFunc` to get the enumerable property names and
             * symbols of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @param {Function} keysFunc The function to get the keys of `object`.
             * @param {Function} symbolsFunc The function to get the symbols of `object`.
             * @returns {Array} Returns the array of property names and symbols.
             */
            function baseGetAllKeys(object, keysFunc, symbolsFunc) {
              var result = keysFunc(object);
              return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
            }

            var _baseGetAllKeys = baseGetAllKeys;

            /**
             * A specialized version of `_.filter` for arrays without support for
             * iteratee shorthands.
             *
             * @private
             * @param {Array} [array] The array to iterate over.
             * @param {Function} predicate The function invoked per iteration.
             * @returns {Array} Returns the new filtered array.
             */
            function arrayFilter(array, predicate) {
              var index = -1,
                  length = array == null ? 0 : array.length,
                  resIndex = 0,
                  result = [];

              while (++index < length) {
                var value = array[index];
                if (predicate(value, index, array)) {
                  result[resIndex++] = value;
                }
              }
              return result;
            }

            var _arrayFilter = arrayFilter;

            /**
             * This method returns a new empty array.
             *
             * @static
             * @memberOf _
             * @since 4.13.0
             * @category Util
             * @returns {Array} Returns the new empty array.
             * @example
             *
             * var arrays = _.times(2, _.stubArray);
             *
             * console.log(arrays);
             * // => [[], []]
             *
             * console.log(arrays[0] === arrays[1]);
             * // => false
             */
            function stubArray() {
              return [];
            }

            var stubArray_1 = stubArray;

            /** Used for built-in method references. */
            var objectProto$5 = Object.prototype;

            /** Built-in value references. */
            var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeGetSymbols = Object.getOwnPropertySymbols;

            /**
             * Creates an array of the own enumerable symbols of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of symbols.
             */
            var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
              if (object == null) {
                return [];
              }
              object = Object(object);
              return _arrayFilter(nativeGetSymbols(object), function(symbol) {
                return propertyIsEnumerable.call(object, symbol);
              });
            };

            var _getSymbols = getSymbols;

            /**
             * The base implementation of `_.times` without support for iteratee shorthands
             * or max array length checks.
             *
             * @private
             * @param {number} n The number of times to invoke `iteratee`.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Array} Returns the array of results.
             */
            function baseTimes(n, iteratee) {
              var index = -1,
                  result = Array(n);

              while (++index < n) {
                result[index] = iteratee(index);
              }
              return result;
            }

            var _baseTimes = baseTimes;

            /**
             * Checks if `value` is object-like. A value is object-like if it's not `null`
             * and has a `typeof` result of "object".
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
             * @example
             *
             * _.isObjectLike({});
             * // => true
             *
             * _.isObjectLike([1, 2, 3]);
             * // => true
             *
             * _.isObjectLike(_.noop);
             * // => false
             *
             * _.isObjectLike(null);
             * // => false
             */
            function isObjectLike(value) {
              return value != null && typeof value == 'object';
            }

            var isObjectLike_1 = isObjectLike;

            /** `Object#toString` result references. */
            var argsTag = '[object Arguments]';

            /**
             * The base implementation of `_.isArguments`.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is an `arguments` object,
             */
            function baseIsArguments(value) {
              return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
            }

            var _baseIsArguments = baseIsArguments;

            /** Used for built-in method references. */
            var objectProto$6 = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

            /** Built-in value references. */
            var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

            /**
             * Checks if `value` is likely an `arguments` object.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is an `arguments` object,
             *  else `false`.
             * @example
             *
             * _.isArguments(function() { return arguments; }());
             * // => true
             *
             * _.isArguments([1, 2, 3]);
             * // => false
             */
            var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
              return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') &&
                !propertyIsEnumerable$1.call(value, 'callee');
            };

            var isArguments_1 = isArguments;

            /**
             * This method returns `false`.
             *
             * @static
             * @memberOf _
             * @since 4.13.0
             * @category Util
             * @returns {boolean} Returns `false`.
             * @example
             *
             * _.times(2, _.stubFalse);
             * // => [false, false]
             */
            function stubFalse() {
              return false;
            }

            var stubFalse_1 = stubFalse;

            var isBuffer_1 = createCommonjsModule(function (module, exports) {
            /** Detect free variable `exports`. */
            var freeExports = exports && !exports.nodeType && exports;

            /** Detect free variable `module`. */
            var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

            /** Detect the popular CommonJS extension `module.exports`. */
            var moduleExports = freeModule && freeModule.exports === freeExports;

            /** Built-in value references. */
            var Buffer = moduleExports ? _root.Buffer : undefined;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

            /**
             * Checks if `value` is a buffer.
             *
             * @static
             * @memberOf _
             * @since 4.3.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
             * @example
             *
             * _.isBuffer(new Buffer(2));
             * // => true
             *
             * _.isBuffer(new Uint8Array(2));
             * // => false
             */
            var isBuffer = nativeIsBuffer || stubFalse_1;

            module.exports = isBuffer;
            });

            /** Used as references for various `Number` constants. */
            var MAX_SAFE_INTEGER = 9007199254740991;

            /** Used to detect unsigned integer values. */
            var reIsUint = /^(?:0|[1-9]\d*)$/;

            /**
             * Checks if `value` is a valid array-like index.
             *
             * @private
             * @param {*} value The value to check.
             * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
             * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
             */
            function isIndex(value, length) {
              var type = typeof value;
              length = length == null ? MAX_SAFE_INTEGER : length;

              return !!length &&
                (type == 'number' ||
                  (type != 'symbol' && reIsUint.test(value))) &&
                    (value > -1 && value % 1 == 0 && value < length);
            }

            var _isIndex = isIndex;

            /** Used as references for various `Number` constants. */
            var MAX_SAFE_INTEGER$1 = 9007199254740991;

            /**
             * Checks if `value` is a valid array-like length.
             *
             * **Note:** This method is loosely based on
             * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
             * @example
             *
             * _.isLength(3);
             * // => true
             *
             * _.isLength(Number.MIN_VALUE);
             * // => false
             *
             * _.isLength(Infinity);
             * // => false
             *
             * _.isLength('3');
             * // => false
             */
            function isLength(value) {
              return typeof value == 'number' &&
                value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
            }

            var isLength_1 = isLength;

            /** `Object#toString` result references. */
            var argsTag$1 = '[object Arguments]',
                arrayTag = '[object Array]',
                boolTag$1 = '[object Boolean]',
                dateTag$1 = '[object Date]',
                errorTag$1 = '[object Error]',
                funcTag$1 = '[object Function]',
                mapTag$1 = '[object Map]',
                numberTag$1 = '[object Number]',
                objectTag = '[object Object]',
                regexpTag$1 = '[object RegExp]',
                setTag$1 = '[object Set]',
                stringTag$1 = '[object String]',
                weakMapTag = '[object WeakMap]';

            var arrayBufferTag$1 = '[object ArrayBuffer]',
                dataViewTag$1 = '[object DataView]',
                float32Tag = '[object Float32Array]',
                float64Tag = '[object Float64Array]',
                int8Tag = '[object Int8Array]',
                int16Tag = '[object Int16Array]',
                int32Tag = '[object Int32Array]',
                uint8Tag = '[object Uint8Array]',
                uint8ClampedTag = '[object Uint8ClampedArray]',
                uint16Tag = '[object Uint16Array]',
                uint32Tag = '[object Uint32Array]';

            /** Used to identify `toStringTag` values of typed arrays. */
            var typedArrayTags = {};
            typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
            typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
            typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
            typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
            typedArrayTags[uint32Tag] = true;
            typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
            typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
            typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
            typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
            typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
            typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] =
            typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
            typedArrayTags[weakMapTag] = false;

            /**
             * The base implementation of `_.isTypedArray` without Node.js optimizations.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
             */
            function baseIsTypedArray(value) {
              return isObjectLike_1(value) &&
                isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
            }

            var _baseIsTypedArray = baseIsTypedArray;

            /**
             * The base implementation of `_.unary` without support for storing metadata.
             *
             * @private
             * @param {Function} func The function to cap arguments for.
             * @returns {Function} Returns the new capped function.
             */
            function baseUnary(func) {
              return function(value) {
                return func(value);
              };
            }

            var _baseUnary = baseUnary;

            var _nodeUtil = createCommonjsModule(function (module, exports) {
            /** Detect free variable `exports`. */
            var freeExports = exports && !exports.nodeType && exports;

            /** Detect free variable `module`. */
            var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

            /** Detect the popular CommonJS extension `module.exports`. */
            var moduleExports = freeModule && freeModule.exports === freeExports;

            /** Detect free variable `process` from Node.js. */
            var freeProcess = moduleExports && _freeGlobal.process;

            /** Used to access faster Node.js helpers. */
            var nodeUtil = (function() {
              try {
                return freeProcess && freeProcess.binding && freeProcess.binding('util');
              } catch (e) {}
            }());

            module.exports = nodeUtil;
            });

            /* Node.js helper references. */
            var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

            /**
             * Checks if `value` is classified as a typed array.
             *
             * @static
             * @memberOf _
             * @since 3.0.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
             * @example
             *
             * _.isTypedArray(new Uint8Array);
             * // => true
             *
             * _.isTypedArray([]);
             * // => false
             */
            var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

            var isTypedArray_1 = isTypedArray;

            /** Used for built-in method references. */
            var objectProto$7 = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

            /**
             * Creates an array of the enumerable property names of the array-like `value`.
             *
             * @private
             * @param {*} value The value to query.
             * @param {boolean} inherited Specify returning inherited property names.
             * @returns {Array} Returns the array of property names.
             */
            function arrayLikeKeys(value, inherited) {
              var isArr = isArray_1(value),
                  isArg = !isArr && isArguments_1(value),
                  isBuff = !isArr && !isArg && isBuffer_1(value),
                  isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
                  skipIndexes = isArr || isArg || isBuff || isType,
                  result = skipIndexes ? _baseTimes(value.length, String) : [],
                  length = result.length;

              for (var key in value) {
                if ((inherited || hasOwnProperty$6.call(value, key)) &&
                    !(skipIndexes && (
                       // Safari 9 has enumerable `arguments.length` in strict mode.
                       key == 'length' ||
                       // Node.js 0.10 has enumerable non-index properties on buffers.
                       (isBuff && (key == 'offset' || key == 'parent')) ||
                       // PhantomJS 2 has enumerable non-index properties on typed arrays.
                       (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
                       // Skip index properties.
                       _isIndex(key, length)
                    ))) {
                  result.push(key);
                }
              }
              return result;
            }

            var _arrayLikeKeys = arrayLikeKeys;

            /** Used for built-in method references. */
            var objectProto$8 = Object.prototype;

            /**
             * Checks if `value` is likely a prototype object.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
             */
            function isPrototype(value) {
              var Ctor = value && value.constructor,
                  proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

              return value === proto;
            }

            var _isPrototype = isPrototype;

            /**
             * Creates a unary function that invokes `func` with its argument transformed.
             *
             * @private
             * @param {Function} func The function to wrap.
             * @param {Function} transform The argument transform.
             * @returns {Function} Returns the new function.
             */
            function overArg(func, transform) {
              return function(arg) {
                return func(transform(arg));
              };
            }

            var _overArg = overArg;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeKeys = _overArg(Object.keys, Object);

            var _nativeKeys = nativeKeys;

            /** Used for built-in method references. */
            var objectProto$9 = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

            /**
             * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names.
             */
            function baseKeys(object) {
              if (!_isPrototype(object)) {
                return _nativeKeys(object);
              }
              var result = [];
              for (var key in Object(object)) {
                if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
                  result.push(key);
                }
              }
              return result;
            }

            var _baseKeys = baseKeys;

            /**
             * Checks if `value` is array-like. A value is considered array-like if it's
             * not a function and has a `value.length` that's an integer greater than or
             * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
             * @example
             *
             * _.isArrayLike([1, 2, 3]);
             * // => true
             *
             * _.isArrayLike(document.body.children);
             * // => true
             *
             * _.isArrayLike('abc');
             * // => true
             *
             * _.isArrayLike(_.noop);
             * // => false
             */
            function isArrayLike(value) {
              return value != null && isLength_1(value.length) && !isFunction_1(value);
            }

            var isArrayLike_1 = isArrayLike;

            /**
             * Creates an array of the own enumerable property names of `object`.
             *
             * **Note:** Non-object values are coerced to objects. See the
             * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
             * for more details.
             *
             * @static
             * @since 0.1.0
             * @memberOf _
             * @category Object
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names.
             * @example
             *
             * function Foo() {
             *   this.a = 1;
             *   this.b = 2;
             * }
             *
             * Foo.prototype.c = 3;
             *
             * _.keys(new Foo);
             * // => ['a', 'b'] (iteration order is not guaranteed)
             *
             * _.keys('hi');
             * // => ['0', '1']
             */
            function keys(object) {
              return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
            }

            var keys_1 = keys;

            /**
             * Creates an array of own enumerable property names and symbols of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names and symbols.
             */
            function getAllKeys(object) {
              return _baseGetAllKeys(object, keys_1, _getSymbols);
            }

            var _getAllKeys = getAllKeys;

            /** Used to compose bitmasks for value comparisons. */
            var COMPARE_PARTIAL_FLAG$2 = 1;

            /** Used for built-in method references. */
            var objectProto$a = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

            /**
             * A specialized version of `baseIsEqualDeep` for objects with support for
             * partial deep comparisons.
             *
             * @private
             * @param {Object} object The object to compare.
             * @param {Object} other The other object to compare.
             * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
             * @param {Function} customizer The function to customize comparisons.
             * @param {Function} equalFunc The function to determine equivalents of values.
             * @param {Object} stack Tracks traversed `object` and `other` objects.
             * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
             */
            function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
                  objProps = _getAllKeys(object),
                  objLength = objProps.length,
                  othProps = _getAllKeys(other),
                  othLength = othProps.length;

              if (objLength != othLength && !isPartial) {
                return false;
              }
              var index = objLength;
              while (index--) {
                var key = objProps[index];
                if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
                  return false;
                }
              }
              // Assume cyclic values are equal.
              var stacked = stack.get(object);
              if (stacked && stack.get(other)) {
                return stacked == other;
              }
              var result = true;
              stack.set(object, other);
              stack.set(other, object);

              var skipCtor = isPartial;
              while (++index < objLength) {
                key = objProps[index];
                var objValue = object[key],
                    othValue = other[key];

                if (customizer) {
                  var compared = isPartial
                    ? customizer(othValue, objValue, key, other, object, stack)
                    : customizer(objValue, othValue, key, object, other, stack);
                }
                // Recursively compare objects (susceptible to call stack limits).
                if (!(compared === undefined
                      ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
                      : compared
                    )) {
                  result = false;
                  break;
                }
                skipCtor || (skipCtor = key == 'constructor');
              }
              if (result && !skipCtor) {
                var objCtor = object.constructor,
                    othCtor = other.constructor;

                // Non `Object` object instances with different constructors are not equal.
                if (objCtor != othCtor &&
                    ('constructor' in object && 'constructor' in other) &&
                    !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
                      typeof othCtor == 'function' && othCtor instanceof othCtor)) {
                  result = false;
                }
              }
              stack['delete'](object);
              stack['delete'](other);
              return result;
            }

            var _equalObjects = equalObjects;

            /* Built-in method references that are verified to be native. */
            var DataView = _getNative(_root, 'DataView');

            var _DataView = DataView;

            /* Built-in method references that are verified to be native. */
            var Promise$1 = _getNative(_root, 'Promise');

            var _Promise = Promise$1;

            /* Built-in method references that are verified to be native. */
            var Set = _getNative(_root, 'Set');

            var _Set = Set;

            /* Built-in method references that are verified to be native. */
            var WeakMap = _getNative(_root, 'WeakMap');

            var _WeakMap = WeakMap;

            /** `Object#toString` result references. */
            var mapTag$2 = '[object Map]',
                objectTag$1 = '[object Object]',
                promiseTag = '[object Promise]',
                setTag$2 = '[object Set]',
                weakMapTag$1 = '[object WeakMap]';

            var dataViewTag$2 = '[object DataView]';

            /** Used to detect maps, sets, and weakmaps. */
            var dataViewCtorString = _toSource(_DataView),
                mapCtorString = _toSource(_Map),
                promiseCtorString = _toSource(_Promise),
                setCtorString = _toSource(_Set),
                weakMapCtorString = _toSource(_WeakMap);

            /**
             * Gets the `toStringTag` of `value`.
             *
             * @private
             * @param {*} value The value to query.
             * @returns {string} Returns the `toStringTag`.
             */
            var getTag = _baseGetTag;

            // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
            if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
                (_Map && getTag(new _Map) != mapTag$2) ||
                (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
                (_Set && getTag(new _Set) != setTag$2) ||
                (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
              getTag = function(value) {
                var result = _baseGetTag(value),
                    Ctor = result == objectTag$1 ? value.constructor : undefined,
                    ctorString = Ctor ? _toSource(Ctor) : '';

                if (ctorString) {
                  switch (ctorString) {
                    case dataViewCtorString: return dataViewTag$2;
                    case mapCtorString: return mapTag$2;
                    case promiseCtorString: return promiseTag;
                    case setCtorString: return setTag$2;
                    case weakMapCtorString: return weakMapTag$1;
                  }
                }
                return result;
              };
            }

            var _getTag = getTag;

            /** Used to compose bitmasks for value comparisons. */
            var COMPARE_PARTIAL_FLAG$3 = 1;

            /** `Object#toString` result references. */
            var argsTag$2 = '[object Arguments]',
                arrayTag$1 = '[object Array]',
                objectTag$2 = '[object Object]';

            /** Used for built-in method references. */
            var objectProto$b = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

            /**
             * A specialized version of `baseIsEqual` for arrays and objects which performs
             * deep comparisons and tracks traversed objects enabling objects with circular
             * references to be compared.
             *
             * @private
             * @param {Object} object The object to compare.
             * @param {Object} other The other object to compare.
             * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
             * @param {Function} customizer The function to customize comparisons.
             * @param {Function} equalFunc The function to determine equivalents of values.
             * @param {Object} [stack] Tracks traversed `object` and `other` objects.
             * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
             */
            function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
              var objIsArr = isArray_1(object),
                  othIsArr = isArray_1(other),
                  objTag = objIsArr ? arrayTag$1 : _getTag(object),
                  othTag = othIsArr ? arrayTag$1 : _getTag(other);

              objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
              othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

              var objIsObj = objTag == objectTag$2,
                  othIsObj = othTag == objectTag$2,
                  isSameTag = objTag == othTag;

              if (isSameTag && isBuffer_1(object)) {
                if (!isBuffer_1(other)) {
                  return false;
                }
                objIsArr = true;
                objIsObj = false;
              }
              if (isSameTag && !objIsObj) {
                stack || (stack = new _Stack);
                return (objIsArr || isTypedArray_1(object))
                  ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
                  : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
              }
              if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
                var objIsWrapped = objIsObj && hasOwnProperty$9.call(object, '__wrapped__'),
                    othIsWrapped = othIsObj && hasOwnProperty$9.call(other, '__wrapped__');

                if (objIsWrapped || othIsWrapped) {
                  var objUnwrapped = objIsWrapped ? object.value() : object,
                      othUnwrapped = othIsWrapped ? other.value() : other;

                  stack || (stack = new _Stack);
                  return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
                }
              }
              if (!isSameTag) {
                return false;
              }
              stack || (stack = new _Stack);
              return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
            }

            var _baseIsEqualDeep = baseIsEqualDeep;

            /**
             * The base implementation of `_.isEqual` which supports partial comparisons
             * and tracks traversed objects.
             *
             * @private
             * @param {*} value The value to compare.
             * @param {*} other The other value to compare.
             * @param {boolean} bitmask The bitmask flags.
             *  1 - Unordered comparison
             *  2 - Partial comparison
             * @param {Function} [customizer] The function to customize comparisons.
             * @param {Object} [stack] Tracks traversed `value` and `other` objects.
             * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
             */
            function baseIsEqual(value, other, bitmask, customizer, stack) {
              if (value === other) {
                return true;
              }
              if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
                return value !== value && other !== other;
              }
              return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
            }

            var _baseIsEqual = baseIsEqual;

            /** Used to compose bitmasks for value comparisons. */
            var COMPARE_PARTIAL_FLAG$4 = 1,
                COMPARE_UNORDERED_FLAG$2 = 2;

            /**
             * The base implementation of `_.isMatch` without support for iteratee shorthands.
             *
             * @private
             * @param {Object} object The object to inspect.
             * @param {Object} source The object of property values to match.
             * @param {Array} matchData The property names, values, and compare flags to match.
             * @param {Function} [customizer] The function to customize comparisons.
             * @returns {boolean} Returns `true` if `object` is a match, else `false`.
             */
            function baseIsMatch(object, source, matchData, customizer) {
              var index = matchData.length,
                  length = index,
                  noCustomizer = !customizer;

              if (object == null) {
                return !length;
              }
              object = Object(object);
              while (index--) {
                var data = matchData[index];
                if ((noCustomizer && data[2])
                      ? data[1] !== object[data[0]]
                      : !(data[0] in object)
                    ) {
                  return false;
                }
              }
              while (++index < length) {
                data = matchData[index];
                var key = data[0],
                    objValue = object[key],
                    srcValue = data[1];

                if (noCustomizer && data[2]) {
                  if (objValue === undefined && !(key in object)) {
                    return false;
                  }
                } else {
                  var stack = new _Stack;
                  if (customizer) {
                    var result = customizer(objValue, srcValue, key, object, source, stack);
                  }
                  if (!(result === undefined
                        ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
                        : result
                      )) {
                    return false;
                  }
                }
              }
              return true;
            }

            var _baseIsMatch = baseIsMatch;

            /**
             * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` if suitable for strict
             *  equality comparisons, else `false`.
             */
            function isStrictComparable(value) {
              return value === value && !isObject_1(value);
            }

            var _isStrictComparable = isStrictComparable;

            /**
             * Gets the property names, values, and compare flags of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {Array} Returns the match data of `object`.
             */
            function getMatchData(object) {
              var result = keys_1(object),
                  length = result.length;

              while (length--) {
                var key = result[length],
                    value = object[key];

                result[length] = [key, value, _isStrictComparable(value)];
              }
              return result;
            }

            var _getMatchData = getMatchData;

            /**
             * A specialized version of `matchesProperty` for source values suitable
             * for strict equality comparisons, i.e. `===`.
             *
             * @private
             * @param {string} key The key of the property to get.
             * @param {*} srcValue The value to match.
             * @returns {Function} Returns the new spec function.
             */
            function matchesStrictComparable(key, srcValue) {
              return function(object) {
                if (object == null) {
                  return false;
                }
                return object[key] === srcValue &&
                  (srcValue !== undefined || (key in Object(object)));
              };
            }

            var _matchesStrictComparable = matchesStrictComparable;

            /**
             * The base implementation of `_.matches` which doesn't clone `source`.
             *
             * @private
             * @param {Object} source The object of property values to match.
             * @returns {Function} Returns the new spec function.
             */
            function baseMatches(source) {
              var matchData = _getMatchData(source);
              if (matchData.length == 1 && matchData[0][2]) {
                return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
              }
              return function(object) {
                return object === source || _baseIsMatch(object, source, matchData);
              };
            }

            var _baseMatches = baseMatches;

            /** `Object#toString` result references. */
            var symbolTag$1 = '[object Symbol]';

            /**
             * Checks if `value` is classified as a `Symbol` primitive or object.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
             * @example
             *
             * _.isSymbol(Symbol.iterator);
             * // => true
             *
             * _.isSymbol('abc');
             * // => false
             */
            function isSymbol(value) {
              return typeof value == 'symbol' ||
                (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
            }

            var isSymbol_1 = isSymbol;

            /** Used to match property names within property paths. */
            var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                reIsPlainProp = /^\w*$/;

            /**
             * Checks if `value` is a property name and not a property path.
             *
             * @private
             * @param {*} value The value to check.
             * @param {Object} [object] The object to query keys on.
             * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
             */
            function isKey(value, object) {
              if (isArray_1(value)) {
                return false;
              }
              var type = typeof value;
              if (type == 'number' || type == 'symbol' || type == 'boolean' ||
                  value == null || isSymbol_1(value)) {
                return true;
              }
              return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
                (object != null && value in Object(object));
            }

            var _isKey = isKey;

            /** Error message constants. */
            var FUNC_ERROR_TEXT = 'Expected a function';

            /**
             * Creates a function that memoizes the result of `func`. If `resolver` is
             * provided, it determines the cache key for storing the result based on the
             * arguments provided to the memoized function. By default, the first argument
             * provided to the memoized function is used as the map cache key. The `func`
             * is invoked with the `this` binding of the memoized function.
             *
             * **Note:** The cache is exposed as the `cache` property on the memoized
             * function. Its creation may be customized by replacing the `_.memoize.Cache`
             * constructor with one whose instances implement the
             * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
             * method interface of `clear`, `delete`, `get`, `has`, and `set`.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Function
             * @param {Function} func The function to have its output memoized.
             * @param {Function} [resolver] The function to resolve the cache key.
             * @returns {Function} Returns the new memoized function.
             * @example
             *
             * var object = { 'a': 1, 'b': 2 };
             * var other = { 'c': 3, 'd': 4 };
             *
             * var values = _.memoize(_.values);
             * values(object);
             * // => [1, 2]
             *
             * values(other);
             * // => [3, 4]
             *
             * object.a = 2;
             * values(object);
             * // => [1, 2]
             *
             * // Modify the result cache.
             * values.cache.set(object, ['a', 'b']);
             * values(object);
             * // => ['a', 'b']
             *
             * // Replace `_.memoize.Cache`.
             * _.memoize.Cache = WeakMap;
             */
            function memoize(func, resolver) {
              if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
                throw new TypeError(FUNC_ERROR_TEXT);
              }
              var memoized = function() {
                var args = arguments,
                    key = resolver ? resolver.apply(this, args) : args[0],
                    cache = memoized.cache;

                if (cache.has(key)) {
                  return cache.get(key);
                }
                var result = func.apply(this, args);
                memoized.cache = cache.set(key, result) || cache;
                return result;
              };
              memoized.cache = new (memoize.Cache || _MapCache);
              return memoized;
            }

            // Expose `MapCache`.
            memoize.Cache = _MapCache;

            var memoize_1 = memoize;

            /** Used as the maximum memoize cache size. */
            var MAX_MEMOIZE_SIZE = 500;

            /**
             * A specialized version of `_.memoize` which clears the memoized function's
             * cache when it exceeds `MAX_MEMOIZE_SIZE`.
             *
             * @private
             * @param {Function} func The function to have its output memoized.
             * @returns {Function} Returns the new memoized function.
             */
            function memoizeCapped(func) {
              var result = memoize_1(func, function(key) {
                if (cache.size === MAX_MEMOIZE_SIZE) {
                  cache.clear();
                }
                return key;
              });

              var cache = result.cache;
              return result;
            }

            var _memoizeCapped = memoizeCapped;

            /** Used to match property names within property paths. */
            var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

            /** Used to match backslashes in property paths. */
            var reEscapeChar = /\\(\\)?/g;

            /**
             * Converts `string` to a property path array.
             *
             * @private
             * @param {string} string The string to convert.
             * @returns {Array} Returns the property path array.
             */
            var stringToPath = _memoizeCapped(function(string) {
              var result = [];
              if (string.charCodeAt(0) === 46 /* . */) {
                result.push('');
              }
              string.replace(rePropName, function(match, number, quote, subString) {
                result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
              });
              return result;
            });

            var _stringToPath = stringToPath;

            /**
             * A specialized version of `_.map` for arrays without support for iteratee
             * shorthands.
             *
             * @private
             * @param {Array} [array] The array to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Array} Returns the new mapped array.
             */
            function arrayMap(array, iteratee) {
              var index = -1,
                  length = array == null ? 0 : array.length,
                  result = Array(length);

              while (++index < length) {
                result[index] = iteratee(array[index], index, array);
              }
              return result;
            }

            var _arrayMap = arrayMap;

            /** Used as references for various `Number` constants. */
            var INFINITY = 1 / 0;

            /** Used to convert symbols to primitives and strings. */
            var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
                symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

            /**
             * The base implementation of `_.toString` which doesn't convert nullish
             * values to empty strings.
             *
             * @private
             * @param {*} value The value to process.
             * @returns {string} Returns the string.
             */
            function baseToString(value) {
              // Exit early for strings to avoid a performance hit in some environments.
              if (typeof value == 'string') {
                return value;
              }
              if (isArray_1(value)) {
                // Recursively convert values (susceptible to call stack limits).
                return _arrayMap(value, baseToString) + '';
              }
              if (isSymbol_1(value)) {
                return symbolToString ? symbolToString.call(value) : '';
              }
              var result = (value + '');
              return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
            }

            var _baseToString = baseToString;

            /**
             * Converts `value` to a string. An empty string is returned for `null`
             * and `undefined` values. The sign of `-0` is preserved.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to convert.
             * @returns {string} Returns the converted string.
             * @example
             *
             * _.toString(null);
             * // => ''
             *
             * _.toString(-0);
             * // => '-0'
             *
             * _.toString([1, 2, 3]);
             * // => '1,2,3'
             */
            function toString(value) {
              return value == null ? '' : _baseToString(value);
            }

            var toString_1 = toString;

            /**
             * Casts `value` to a path array if it's not one.
             *
             * @private
             * @param {*} value The value to inspect.
             * @param {Object} [object] The object to query keys on.
             * @returns {Array} Returns the cast property path array.
             */
            function castPath(value, object) {
              if (isArray_1(value)) {
                return value;
              }
              return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
            }

            var _castPath = castPath;

            /** Used as references for various `Number` constants. */
            var INFINITY$1 = 1 / 0;

            /**
             * Converts `value` to a string key if it's not a string or symbol.
             *
             * @private
             * @param {*} value The value to inspect.
             * @returns {string|symbol} Returns the key.
             */
            function toKey(value) {
              if (typeof value == 'string' || isSymbol_1(value)) {
                return value;
              }
              var result = (value + '');
              return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
            }

            var _toKey = toKey;

            /**
             * The base implementation of `_.get` without support for default values.
             *
             * @private
             * @param {Object} object The object to query.
             * @param {Array|string} path The path of the property to get.
             * @returns {*} Returns the resolved value.
             */
            function baseGet(object, path) {
              path = _castPath(path, object);

              var index = 0,
                  length = path.length;

              while (object != null && index < length) {
                object = object[_toKey(path[index++])];
              }
              return (index && index == length) ? object : undefined;
            }

            var _baseGet = baseGet;

            /**
             * Gets the value at `path` of `object`. If the resolved value is
             * `undefined`, the `defaultValue` is returned in its place.
             *
             * @static
             * @memberOf _
             * @since 3.7.0
             * @category Object
             * @param {Object} object The object to query.
             * @param {Array|string} path The path of the property to get.
             * @param {*} [defaultValue] The value returned for `undefined` resolved values.
             * @returns {*} Returns the resolved value.
             * @example
             *
             * var object = { 'a': [{ 'b': { 'c': 3 } }] };
             *
             * _.get(object, 'a[0].b.c');
             * // => 3
             *
             * _.get(object, ['a', '0', 'b', 'c']);
             * // => 3
             *
             * _.get(object, 'a.b.c', 'default');
             * // => 'default'
             */
            function get(object, path, defaultValue) {
              var result = object == null ? undefined : _baseGet(object, path);
              return result === undefined ? defaultValue : result;
            }

            var get_1 = get;

            /**
             * The base implementation of `_.hasIn` without support for deep paths.
             *
             * @private
             * @param {Object} [object] The object to query.
             * @param {Array|string} key The key to check.
             * @returns {boolean} Returns `true` if `key` exists, else `false`.
             */
            function baseHasIn(object, key) {
              return object != null && key in Object(object);
            }

            var _baseHasIn = baseHasIn;

            /**
             * Checks if `path` exists on `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @param {Array|string} path The path to check.
             * @param {Function} hasFunc The function to check properties.
             * @returns {boolean} Returns `true` if `path` exists, else `false`.
             */
            function hasPath(object, path, hasFunc) {
              path = _castPath(path, object);

              var index = -1,
                  length = path.length,
                  result = false;

              while (++index < length) {
                var key = _toKey(path[index]);
                if (!(result = object != null && hasFunc(object, key))) {
                  break;
                }
                object = object[key];
              }
              if (result || ++index != length) {
                return result;
              }
              length = object == null ? 0 : object.length;
              return !!length && isLength_1(length) && _isIndex(key, length) &&
                (isArray_1(object) || isArguments_1(object));
            }

            var _hasPath = hasPath;

            /**
             * Checks if `path` is a direct or inherited property of `object`.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Object
             * @param {Object} object The object to query.
             * @param {Array|string} path The path to check.
             * @returns {boolean} Returns `true` if `path` exists, else `false`.
             * @example
             *
             * var object = _.create({ 'a': _.create({ 'b': 2 }) });
             *
             * _.hasIn(object, 'a');
             * // => true
             *
             * _.hasIn(object, 'a.b');
             * // => true
             *
             * _.hasIn(object, ['a', 'b']);
             * // => true
             *
             * _.hasIn(object, 'b');
             * // => false
             */
            function hasIn(object, path) {
              return object != null && _hasPath(object, path, _baseHasIn);
            }

            var hasIn_1 = hasIn;

            /** Used to compose bitmasks for value comparisons. */
            var COMPARE_PARTIAL_FLAG$5 = 1,
                COMPARE_UNORDERED_FLAG$3 = 2;

            /**
             * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
             *
             * @private
             * @param {string} path The path of the property to get.
             * @param {*} srcValue The value to match.
             * @returns {Function} Returns the new spec function.
             */
            function baseMatchesProperty(path, srcValue) {
              if (_isKey(path) && _isStrictComparable(srcValue)) {
                return _matchesStrictComparable(_toKey(path), srcValue);
              }
              return function(object) {
                var objValue = get_1(object, path);
                return (objValue === undefined && objValue === srcValue)
                  ? hasIn_1(object, path)
                  : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
              };
            }

            var _baseMatchesProperty = baseMatchesProperty;

            /**
             * This method returns the first argument it receives.
             *
             * @static
             * @since 0.1.0
             * @memberOf _
             * @category Util
             * @param {*} value Any value.
             * @returns {*} Returns `value`.
             * @example
             *
             * var object = { 'a': 1 };
             *
             * console.log(_.identity(object) === object);
             * // => true
             */
            function identity(value) {
              return value;
            }

            var identity_1 = identity;

            /**
             * The base implementation of `_.property` without support for deep paths.
             *
             * @private
             * @param {string} key The key of the property to get.
             * @returns {Function} Returns the new accessor function.
             */
            function baseProperty(key) {
              return function(object) {
                return object == null ? undefined : object[key];
              };
            }

            var _baseProperty = baseProperty;

            /**
             * A specialized version of `baseProperty` which supports deep paths.
             *
             * @private
             * @param {Array|string} path The path of the property to get.
             * @returns {Function} Returns the new accessor function.
             */
            function basePropertyDeep(path) {
              return function(object) {
                return _baseGet(object, path);
              };
            }

            var _basePropertyDeep = basePropertyDeep;

            /**
             * Creates a function that returns the value at `path` of a given object.
             *
             * @static
             * @memberOf _
             * @since 2.4.0
             * @category Util
             * @param {Array|string} path The path of the property to get.
             * @returns {Function} Returns the new accessor function.
             * @example
             *
             * var objects = [
             *   { 'a': { 'b': 2 } },
             *   { 'a': { 'b': 1 } }
             * ];
             *
             * _.map(objects, _.property('a.b'));
             * // => [2, 1]
             *
             * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
             * // => [1, 2]
             */
            function property(path) {
              return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
            }

            var property_1 = property;

            /**
             * The base implementation of `_.iteratee`.
             *
             * @private
             * @param {*} [value=_.identity] The value to convert to an iteratee.
             * @returns {Function} Returns the iteratee.
             */
            function baseIteratee(value) {
              // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
              // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
              if (typeof value == 'function') {
                return value;
              }
              if (value == null) {
                return identity_1;
              }
              if (typeof value == 'object') {
                return isArray_1(value)
                  ? _baseMatchesProperty(value[0], value[1])
                  : _baseMatches(value);
              }
              return property_1(value);
            }

            var _baseIteratee = baseIteratee;

            /**
             * Creates a `_.find` or `_.findLast` function.
             *
             * @private
             * @param {Function} findIndexFunc The function to find the collection index.
             * @returns {Function} Returns the new find function.
             */
            function createFind(findIndexFunc) {
              return function(collection, predicate, fromIndex) {
                var iterable = Object(collection);
                if (!isArrayLike_1(collection)) {
                  var iteratee = _baseIteratee(predicate, 3);
                  collection = keys_1(collection);
                  predicate = function(key) { return iteratee(iterable[key], key, iterable); };
                }
                var index = findIndexFunc(collection, predicate, fromIndex);
                return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
              };
            }

            var _createFind = createFind;

            /**
             * The base implementation of `_.findIndex` and `_.findLastIndex` without
             * support for iteratee shorthands.
             *
             * @private
             * @param {Array} array The array to inspect.
             * @param {Function} predicate The function invoked per iteration.
             * @param {number} fromIndex The index to search from.
             * @param {boolean} [fromRight] Specify iterating from right to left.
             * @returns {number} Returns the index of the matched value, else `-1`.
             */
            function baseFindIndex(array, predicate, fromIndex, fromRight) {
              var length = array.length,
                  index = fromIndex + (fromRight ? 1 : -1);

              while ((fromRight ? index-- : ++index < length)) {
                if (predicate(array[index], index, array)) {
                  return index;
                }
              }
              return -1;
            }

            var _baseFindIndex = baseFindIndex;

            /** Used as references for various `Number` constants. */
            var NAN = 0 / 0;

            /** Used to match leading and trailing whitespace. */
            var reTrim = /^\s+|\s+$/g;

            /** Used to detect bad signed hexadecimal string values. */
            var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

            /** Used to detect binary string values. */
            var reIsBinary = /^0b[01]+$/i;

            /** Used to detect octal string values. */
            var reIsOctal = /^0o[0-7]+$/i;

            /** Built-in method references without a dependency on `root`. */
            var freeParseInt = parseInt;

            /**
             * Converts `value` to a number.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to process.
             * @returns {number} Returns the number.
             * @example
             *
             * _.toNumber(3.2);
             * // => 3.2
             *
             * _.toNumber(Number.MIN_VALUE);
             * // => 5e-324
             *
             * _.toNumber(Infinity);
             * // => Infinity
             *
             * _.toNumber('3.2');
             * // => 3.2
             */
            function toNumber(value) {
              if (typeof value == 'number') {
                return value;
              }
              if (isSymbol_1(value)) {
                return NAN;
              }
              if (isObject_1(value)) {
                var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
                value = isObject_1(other) ? (other + '') : other;
              }
              if (typeof value != 'string') {
                return value === 0 ? value : +value;
              }
              value = value.replace(reTrim, '');
              var isBinary = reIsBinary.test(value);
              return (isBinary || reIsOctal.test(value))
                ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
                : (reIsBadHex.test(value) ? NAN : +value);
            }

            var toNumber_1 = toNumber;

            /** Used as references for various `Number` constants. */
            var INFINITY$2 = 1 / 0,
                MAX_INTEGER = 1.7976931348623157e+308;

            /**
             * Converts `value` to a finite number.
             *
             * @static
             * @memberOf _
             * @since 4.12.0
             * @category Lang
             * @param {*} value The value to convert.
             * @returns {number} Returns the converted number.
             * @example
             *
             * _.toFinite(3.2);
             * // => 3.2
             *
             * _.toFinite(Number.MIN_VALUE);
             * // => 5e-324
             *
             * _.toFinite(Infinity);
             * // => 1.7976931348623157e+308
             *
             * _.toFinite('3.2');
             * // => 3.2
             */
            function toFinite(value) {
              if (!value) {
                return value === 0 ? value : 0;
              }
              value = toNumber_1(value);
              if (value === INFINITY$2 || value === -INFINITY$2) {
                var sign = (value < 0 ? -1 : 1);
                return sign * MAX_INTEGER;
              }
              return value === value ? value : 0;
            }

            var toFinite_1 = toFinite;

            /**
             * Converts `value` to an integer.
             *
             * **Note:** This method is loosely based on
             * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to convert.
             * @returns {number} Returns the converted integer.
             * @example
             *
             * _.toInteger(3.2);
             * // => 3
             *
             * _.toInteger(Number.MIN_VALUE);
             * // => 0
             *
             * _.toInteger(Infinity);
             * // => 1.7976931348623157e+308
             *
             * _.toInteger('3.2');
             * // => 3
             */
            function toInteger(value) {
              var result = toFinite_1(value),
                  remainder = result % 1;

              return result === result ? (remainder ? result - remainder : result) : 0;
            }

            var toInteger_1 = toInteger;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMax = Math.max;

            /**
             * This method is like `_.find` except that it returns the index of the first
             * element `predicate` returns truthy for instead of the element itself.
             *
             * @static
             * @memberOf _
             * @since 1.1.0
             * @category Array
             * @param {Array} array The array to inspect.
             * @param {Function} [predicate=_.identity] The function invoked per iteration.
             * @param {number} [fromIndex=0] The index to search from.
             * @returns {number} Returns the index of the found element, else `-1`.
             * @example
             *
             * var users = [
             *   { 'user': 'barney',  'active': false },
             *   { 'user': 'fred',    'active': false },
             *   { 'user': 'pebbles', 'active': true }
             * ];
             *
             * _.findIndex(users, function(o) { return o.user == 'barney'; });
             * // => 0
             *
             * // The `_.matches` iteratee shorthand.
             * _.findIndex(users, { 'user': 'fred', 'active': false });
             * // => 1
             *
             * // The `_.matchesProperty` iteratee shorthand.
             * _.findIndex(users, ['active', false]);
             * // => 0
             *
             * // The `_.property` iteratee shorthand.
             * _.findIndex(users, 'active');
             * // => 2
             */
            function findIndex(array, predicate, fromIndex) {
              var length = array == null ? 0 : array.length;
              if (!length) {
                return -1;
              }
              var index = fromIndex == null ? 0 : toInteger_1(fromIndex);
              if (index < 0) {
                index = nativeMax(length + index, 0);
              }
              return _baseFindIndex(array, _baseIteratee(predicate, 3), index);
            }

            var findIndex_1 = findIndex;

            /**
             * Iterates over elements of `collection`, returning the first element
             * `predicate` returns truthy for. The predicate is invoked with three
             * arguments: (value, index|key, collection).
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Collection
             * @param {Array|Object} collection The collection to inspect.
             * @param {Function} [predicate=_.identity] The function invoked per iteration.
             * @param {number} [fromIndex=0] The index to search from.
             * @returns {*} Returns the matched element, else `undefined`.
             * @example
             *
             * var users = [
             *   { 'user': 'barney',  'age': 36, 'active': true },
             *   { 'user': 'fred',    'age': 40, 'active': false },
             *   { 'user': 'pebbles', 'age': 1,  'active': true }
             * ];
             *
             * _.find(users, function(o) { return o.age < 40; });
             * // => object for 'barney'
             *
             * // The `_.matches` iteratee shorthand.
             * _.find(users, { 'age': 1, 'active': true });
             * // => object for 'pebbles'
             *
             * // The `_.matchesProperty` iteratee shorthand.
             * _.find(users, ['active', false]);
             * // => object for 'fred'
             *
             * // The `_.property` iteratee shorthand.
             * _.find(users, 'active');
             * // => object for 'barney'
             */
            var find = _createFind(findIndex_1);

            var find_1 = find;

            /** `Object#toString` result references. */
            var mapTag$3 = '[object Map]',
                setTag$3 = '[object Set]';

            /** Used for built-in method references. */
            var objectProto$c = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$a = objectProto$c.hasOwnProperty;

            /**
             * Checks if `value` is an empty object, collection, map, or set.
             *
             * Objects are considered empty if they have no own enumerable string keyed
             * properties.
             *
             * Array-like values such as `arguments` objects, arrays, buffers, strings, or
             * jQuery-like collections are considered empty if they have a `length` of `0`.
             * Similarly, maps and sets are considered empty if they have a `size` of `0`.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is empty, else `false`.
             * @example
             *
             * _.isEmpty(null);
             * // => true
             *
             * _.isEmpty(true);
             * // => true
             *
             * _.isEmpty(1);
             * // => true
             *
             * _.isEmpty([1, 2, 3]);
             * // => false
             *
             * _.isEmpty({ 'a': 1 });
             * // => false
             */
            function isEmpty(value) {
              if (value == null) {
                return true;
              }
              if (isArrayLike_1(value) &&
                  (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' ||
                    isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
                return !value.length;
              }
              var tag = _getTag(value);
              if (tag == mapTag$3 || tag == setTag$3) {
                return !value.size;
              }
              if (_isPrototype(value)) {
                return !_baseKeys(value).length;
              }
              for (var key in value) {
                if (hasOwnProperty$a.call(value, key)) {
                  return false;
                }
              }
              return true;
            }

            var isEmpty_1 = isEmpty;

            /**
             * A specialized version of `_.forEach` for arrays without support for
             * iteratee shorthands.
             *
             * @private
             * @param {Array} [array] The array to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Array} Returns `array`.
             */
            function arrayEach(array, iteratee) {
              var index = -1,
                  length = array == null ? 0 : array.length;

              while (++index < length) {
                if (iteratee(array[index], index, array) === false) {
                  break;
                }
              }
              return array;
            }

            var _arrayEach = arrayEach;

            var defineProperty = (function() {
              try {
                var func = _getNative(Object, 'defineProperty');
                func({}, '', {});
                return func;
              } catch (e) {}
            }());

            var _defineProperty = defineProperty;

            /**
             * The base implementation of `assignValue` and `assignMergeValue` without
             * value checks.
             *
             * @private
             * @param {Object} object The object to modify.
             * @param {string} key The key of the property to assign.
             * @param {*} value The value to assign.
             */
            function baseAssignValue(object, key, value) {
              if (key == '__proto__' && _defineProperty) {
                _defineProperty(object, key, {
                  'configurable': true,
                  'enumerable': true,
                  'value': value,
                  'writable': true
                });
              } else {
                object[key] = value;
              }
            }

            var _baseAssignValue = baseAssignValue;

            /** Used for built-in method references. */
            var objectProto$d = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$b = objectProto$d.hasOwnProperty;

            /**
             * Assigns `value` to `key` of `object` if the existing value is not equivalent
             * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
             * for equality comparisons.
             *
             * @private
             * @param {Object} object The object to modify.
             * @param {string} key The key of the property to assign.
             * @param {*} value The value to assign.
             */
            function assignValue(object, key, value) {
              var objValue = object[key];
              if (!(hasOwnProperty$b.call(object, key) && eq_1(objValue, value)) ||
                  (value === undefined && !(key in object))) {
                _baseAssignValue(object, key, value);
              }
            }

            var _assignValue = assignValue;

            /**
             * Copies properties of `source` to `object`.
             *
             * @private
             * @param {Object} source The object to copy properties from.
             * @param {Array} props The property identifiers to copy.
             * @param {Object} [object={}] The object to copy properties to.
             * @param {Function} [customizer] The function to customize copied values.
             * @returns {Object} Returns `object`.
             */
            function copyObject(source, props, object, customizer) {
              var isNew = !object;
              object || (object = {});

              var index = -1,
                  length = props.length;

              while (++index < length) {
                var key = props[index];

                var newValue = customizer
                  ? customizer(object[key], source[key], key, object, source)
                  : undefined;

                if (newValue === undefined) {
                  newValue = source[key];
                }
                if (isNew) {
                  _baseAssignValue(object, key, newValue);
                } else {
                  _assignValue(object, key, newValue);
                }
              }
              return object;
            }

            var _copyObject = copyObject;

            /**
             * The base implementation of `_.assign` without support for multiple sources
             * or `customizer` functions.
             *
             * @private
             * @param {Object} object The destination object.
             * @param {Object} source The source object.
             * @returns {Object} Returns `object`.
             */
            function baseAssign(object, source) {
              return object && _copyObject(source, keys_1(source), object);
            }

            var _baseAssign = baseAssign;

            /**
             * This function is like
             * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
             * except that it includes inherited enumerable properties.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names.
             */
            function nativeKeysIn(object) {
              var result = [];
              if (object != null) {
                for (var key in Object(object)) {
                  result.push(key);
                }
              }
              return result;
            }

            var _nativeKeysIn = nativeKeysIn;

            /** Used for built-in method references. */
            var objectProto$e = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$c = objectProto$e.hasOwnProperty;

            /**
             * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names.
             */
            function baseKeysIn(object) {
              if (!isObject_1(object)) {
                return _nativeKeysIn(object);
              }
              var isProto = _isPrototype(object),
                  result = [];

              for (var key in object) {
                if (!(key == 'constructor' && (isProto || !hasOwnProperty$c.call(object, key)))) {
                  result.push(key);
                }
              }
              return result;
            }

            var _baseKeysIn = baseKeysIn;

            /**
             * Creates an array of the own and inherited enumerable property names of `object`.
             *
             * **Note:** Non-object values are coerced to objects.
             *
             * @static
             * @memberOf _
             * @since 3.0.0
             * @category Object
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names.
             * @example
             *
             * function Foo() {
             *   this.a = 1;
             *   this.b = 2;
             * }
             *
             * Foo.prototype.c = 3;
             *
             * _.keysIn(new Foo);
             * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
             */
            function keysIn$1(object) {
              return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
            }

            var keysIn_1 = keysIn$1;

            /**
             * The base implementation of `_.assignIn` without support for multiple sources
             * or `customizer` functions.
             *
             * @private
             * @param {Object} object The destination object.
             * @param {Object} source The source object.
             * @returns {Object} Returns `object`.
             */
            function baseAssignIn(object, source) {
              return object && _copyObject(source, keysIn_1(source), object);
            }

            var _baseAssignIn = baseAssignIn;

            var _cloneBuffer = createCommonjsModule(function (module, exports) {
            /** Detect free variable `exports`. */
            var freeExports = exports && !exports.nodeType && exports;

            /** Detect free variable `module`. */
            var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

            /** Detect the popular CommonJS extension `module.exports`. */
            var moduleExports = freeModule && freeModule.exports === freeExports;

            /** Built-in value references. */
            var Buffer = moduleExports ? _root.Buffer : undefined,
                allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

            /**
             * Creates a clone of  `buffer`.
             *
             * @private
             * @param {Buffer} buffer The buffer to clone.
             * @param {boolean} [isDeep] Specify a deep clone.
             * @returns {Buffer} Returns the cloned buffer.
             */
            function cloneBuffer(buffer, isDeep) {
              if (isDeep) {
                return buffer.slice();
              }
              var length = buffer.length,
                  result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

              buffer.copy(result);
              return result;
            }

            module.exports = cloneBuffer;
            });

            /**
             * Copies the values of `source` to `array`.
             *
             * @private
             * @param {Array} source The array to copy values from.
             * @param {Array} [array=[]] The array to copy values to.
             * @returns {Array} Returns `array`.
             */
            function copyArray(source, array) {
              var index = -1,
                  length = source.length;

              array || (array = Array(length));
              while (++index < length) {
                array[index] = source[index];
              }
              return array;
            }

            var _copyArray = copyArray;

            /**
             * Copies own symbols of `source` to `object`.
             *
             * @private
             * @param {Object} source The object to copy symbols from.
             * @param {Object} [object={}] The object to copy symbols to.
             * @returns {Object} Returns `object`.
             */
            function copySymbols(source, object) {
              return _copyObject(source, _getSymbols(source), object);
            }

            var _copySymbols = copySymbols;

            /** Built-in value references. */
            var getPrototype = _overArg(Object.getPrototypeOf, Object);

            var _getPrototype = getPrototype;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

            /**
             * Creates an array of the own and inherited enumerable symbols of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of symbols.
             */
            var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
              var result = [];
              while (object) {
                _arrayPush(result, _getSymbols(object));
                object = _getPrototype(object);
              }
              return result;
            };

            var _getSymbolsIn = getSymbolsIn;

            /**
             * Copies own and inherited symbols of `source` to `object`.
             *
             * @private
             * @param {Object} source The object to copy symbols from.
             * @param {Object} [object={}] The object to copy symbols to.
             * @returns {Object} Returns `object`.
             */
            function copySymbolsIn(source, object) {
              return _copyObject(source, _getSymbolsIn(source), object);
            }

            var _copySymbolsIn = copySymbolsIn;

            /**
             * Creates an array of own and inherited enumerable property names and
             * symbols of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property names and symbols.
             */
            function getAllKeysIn(object) {
              return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
            }

            var _getAllKeysIn = getAllKeysIn;

            /** Used for built-in method references. */
            var objectProto$f = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$d = objectProto$f.hasOwnProperty;

            /**
             * Initializes an array clone.
             *
             * @private
             * @param {Array} array The array to clone.
             * @returns {Array} Returns the initialized clone.
             */
            function initCloneArray(array) {
              var length = array.length,
                  result = new array.constructor(length);

              // Add properties assigned by `RegExp#exec`.
              if (length && typeof array[0] == 'string' && hasOwnProperty$d.call(array, 'index')) {
                result.index = array.index;
                result.input = array.input;
              }
              return result;
            }

            var _initCloneArray = initCloneArray;

            /**
             * Creates a clone of `arrayBuffer`.
             *
             * @private
             * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
             * @returns {ArrayBuffer} Returns the cloned array buffer.
             */
            function cloneArrayBuffer(arrayBuffer) {
              var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
              new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
              return result;
            }

            var _cloneArrayBuffer = cloneArrayBuffer;

            /**
             * Creates a clone of `dataView`.
             *
             * @private
             * @param {Object} dataView The data view to clone.
             * @param {boolean} [isDeep] Specify a deep clone.
             * @returns {Object} Returns the cloned data view.
             */
            function cloneDataView(dataView, isDeep) {
              var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
              return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
            }

            var _cloneDataView = cloneDataView;

            /** Used to match `RegExp` flags from their coerced string values. */
            var reFlags = /\w*$/;

            /**
             * Creates a clone of `regexp`.
             *
             * @private
             * @param {Object} regexp The regexp to clone.
             * @returns {Object} Returns the cloned regexp.
             */
            function cloneRegExp(regexp) {
              var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
              result.lastIndex = regexp.lastIndex;
              return result;
            }

            var _cloneRegExp = cloneRegExp;

            /** Used to convert symbols to primitives and strings. */
            var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
                symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

            /**
             * Creates a clone of the `symbol` object.
             *
             * @private
             * @param {Object} symbol The symbol object to clone.
             * @returns {Object} Returns the cloned symbol object.
             */
            function cloneSymbol(symbol) {
              return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
            }

            var _cloneSymbol = cloneSymbol;

            /**
             * Creates a clone of `typedArray`.
             *
             * @private
             * @param {Object} typedArray The typed array to clone.
             * @param {boolean} [isDeep] Specify a deep clone.
             * @returns {Object} Returns the cloned typed array.
             */
            function cloneTypedArray(typedArray, isDeep) {
              var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
              return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
            }

            var _cloneTypedArray = cloneTypedArray;

            /** `Object#toString` result references. */
            var boolTag$2 = '[object Boolean]',
                dateTag$2 = '[object Date]',
                mapTag$4 = '[object Map]',
                numberTag$2 = '[object Number]',
                regexpTag$2 = '[object RegExp]',
                setTag$4 = '[object Set]',
                stringTag$2 = '[object String]',
                symbolTag$2 = '[object Symbol]';

            var arrayBufferTag$2 = '[object ArrayBuffer]',
                dataViewTag$3 = '[object DataView]',
                float32Tag$1 = '[object Float32Array]',
                float64Tag$1 = '[object Float64Array]',
                int8Tag$1 = '[object Int8Array]',
                int16Tag$1 = '[object Int16Array]',
                int32Tag$1 = '[object Int32Array]',
                uint8Tag$1 = '[object Uint8Array]',
                uint8ClampedTag$1 = '[object Uint8ClampedArray]',
                uint16Tag$1 = '[object Uint16Array]',
                uint32Tag$1 = '[object Uint32Array]';

            /**
             * Initializes an object clone based on its `toStringTag`.
             *
             * **Note:** This function only supports cloning values with tags of
             * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
             *
             * @private
             * @param {Object} object The object to clone.
             * @param {string} tag The `toStringTag` of the object to clone.
             * @param {boolean} [isDeep] Specify a deep clone.
             * @returns {Object} Returns the initialized clone.
             */
            function initCloneByTag(object, tag, isDeep) {
              var Ctor = object.constructor;
              switch (tag) {
                case arrayBufferTag$2:
                  return _cloneArrayBuffer(object);

                case boolTag$2:
                case dateTag$2:
                  return new Ctor(+object);

                case dataViewTag$3:
                  return _cloneDataView(object, isDeep);

                case float32Tag$1: case float64Tag$1:
                case int8Tag$1: case int16Tag$1: case int32Tag$1:
                case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
                  return _cloneTypedArray(object, isDeep);

                case mapTag$4:
                  return new Ctor;

                case numberTag$2:
                case stringTag$2:
                  return new Ctor(object);

                case regexpTag$2:
                  return _cloneRegExp(object);

                case setTag$4:
                  return new Ctor;

                case symbolTag$2:
                  return _cloneSymbol(object);
              }
            }

            var _initCloneByTag = initCloneByTag;

            /** Built-in value references. */
            var objectCreate = Object.create;

            /**
             * The base implementation of `_.create` without support for assigning
             * properties to the created object.
             *
             * @private
             * @param {Object} proto The object to inherit from.
             * @returns {Object} Returns the new object.
             */
            var baseCreate = (function() {
              function object() {}
              return function(proto) {
                if (!isObject_1(proto)) {
                  return {};
                }
                if (objectCreate) {
                  return objectCreate(proto);
                }
                object.prototype = proto;
                var result = new object;
                object.prototype = undefined;
                return result;
              };
            }());

            var _baseCreate = baseCreate;

            /**
             * Initializes an object clone.
             *
             * @private
             * @param {Object} object The object to clone.
             * @returns {Object} Returns the initialized clone.
             */
            function initCloneObject(object) {
              return (typeof object.constructor == 'function' && !_isPrototype(object))
                ? _baseCreate(_getPrototype(object))
                : {};
            }

            var _initCloneObject = initCloneObject;

            /** `Object#toString` result references. */
            var mapTag$5 = '[object Map]';

            /**
             * The base implementation of `_.isMap` without Node.js optimizations.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a map, else `false`.
             */
            function baseIsMap(value) {
              return isObjectLike_1(value) && _getTag(value) == mapTag$5;
            }

            var _baseIsMap = baseIsMap;

            /* Node.js helper references. */
            var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

            /**
             * Checks if `value` is classified as a `Map` object.
             *
             * @static
             * @memberOf _
             * @since 4.3.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a map, else `false`.
             * @example
             *
             * _.isMap(new Map);
             * // => true
             *
             * _.isMap(new WeakMap);
             * // => false
             */
            var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

            var isMap_1 = isMap;

            /** `Object#toString` result references. */
            var setTag$5 = '[object Set]';

            /**
             * The base implementation of `_.isSet` without Node.js optimizations.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a set, else `false`.
             */
            function baseIsSet(value) {
              return isObjectLike_1(value) && _getTag(value) == setTag$5;
            }

            var _baseIsSet = baseIsSet;

            /* Node.js helper references. */
            var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

            /**
             * Checks if `value` is classified as a `Set` object.
             *
             * @static
             * @memberOf _
             * @since 4.3.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a set, else `false`.
             * @example
             *
             * _.isSet(new Set);
             * // => true
             *
             * _.isSet(new WeakSet);
             * // => false
             */
            var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

            var isSet_1 = isSet;

            /** Used to compose bitmasks for cloning. */
            var CLONE_DEEP_FLAG = 1,
                CLONE_FLAT_FLAG = 2,
                CLONE_SYMBOLS_FLAG = 4;

            /** `Object#toString` result references. */
            var argsTag$3 = '[object Arguments]',
                arrayTag$2 = '[object Array]',
                boolTag$3 = '[object Boolean]',
                dateTag$3 = '[object Date]',
                errorTag$2 = '[object Error]',
                funcTag$2 = '[object Function]',
                genTag$1 = '[object GeneratorFunction]',
                mapTag$6 = '[object Map]',
                numberTag$3 = '[object Number]',
                objectTag$3 = '[object Object]',
                regexpTag$3 = '[object RegExp]',
                setTag$6 = '[object Set]',
                stringTag$3 = '[object String]',
                symbolTag$3 = '[object Symbol]',
                weakMapTag$2 = '[object WeakMap]';

            var arrayBufferTag$3 = '[object ArrayBuffer]',
                dataViewTag$4 = '[object DataView]',
                float32Tag$2 = '[object Float32Array]',
                float64Tag$2 = '[object Float64Array]',
                int8Tag$2 = '[object Int8Array]',
                int16Tag$2 = '[object Int16Array]',
                int32Tag$2 = '[object Int32Array]',
                uint8Tag$2 = '[object Uint8Array]',
                uint8ClampedTag$2 = '[object Uint8ClampedArray]',
                uint16Tag$2 = '[object Uint16Array]',
                uint32Tag$2 = '[object Uint32Array]';

            /** Used to identify `toStringTag` values supported by `_.clone`. */
            var cloneableTags = {};
            cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] =
            cloneableTags[arrayBufferTag$3] = cloneableTags[dataViewTag$4] =
            cloneableTags[boolTag$3] = cloneableTags[dateTag$3] =
            cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
            cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
            cloneableTags[int32Tag$2] = cloneableTags[mapTag$6] =
            cloneableTags[numberTag$3] = cloneableTags[objectTag$3] =
            cloneableTags[regexpTag$3] = cloneableTags[setTag$6] =
            cloneableTags[stringTag$3] = cloneableTags[symbolTag$3] =
            cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
            cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
            cloneableTags[errorTag$2] = cloneableTags[funcTag$2] =
            cloneableTags[weakMapTag$2] = false;

            /**
             * The base implementation of `_.clone` and `_.cloneDeep` which tracks
             * traversed objects.
             *
             * @private
             * @param {*} value The value to clone.
             * @param {boolean} bitmask The bitmask flags.
             *  1 - Deep clone
             *  2 - Flatten inherited properties
             *  4 - Clone symbols
             * @param {Function} [customizer] The function to customize cloning.
             * @param {string} [key] The key of `value`.
             * @param {Object} [object] The parent object of `value`.
             * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
             * @returns {*} Returns the cloned value.
             */
            function baseClone(value, bitmask, customizer, key, object, stack) {
              var result,
                  isDeep = bitmask & CLONE_DEEP_FLAG,
                  isFlat = bitmask & CLONE_FLAT_FLAG,
                  isFull = bitmask & CLONE_SYMBOLS_FLAG;

              if (customizer) {
                result = object ? customizer(value, key, object, stack) : customizer(value);
              }
              if (result !== undefined) {
                return result;
              }
              if (!isObject_1(value)) {
                return value;
              }
              var isArr = isArray_1(value);
              if (isArr) {
                result = _initCloneArray(value);
                if (!isDeep) {
                  return _copyArray(value, result);
                }
              } else {
                var tag = _getTag(value),
                    isFunc = tag == funcTag$2 || tag == genTag$1;

                if (isBuffer_1(value)) {
                  return _cloneBuffer(value, isDeep);
                }
                if (tag == objectTag$3 || tag == argsTag$3 || (isFunc && !object)) {
                  result = (isFlat || isFunc) ? {} : _initCloneObject(value);
                  if (!isDeep) {
                    return isFlat
                      ? _copySymbolsIn(value, _baseAssignIn(result, value))
                      : _copySymbols(value, _baseAssign(result, value));
                  }
                } else {
                  if (!cloneableTags[tag]) {
                    return object ? value : {};
                  }
                  result = _initCloneByTag(value, tag, isDeep);
                }
              }
              // Check for circular references and return its corresponding clone.
              stack || (stack = new _Stack);
              var stacked = stack.get(value);
              if (stacked) {
                return stacked;
              }
              stack.set(value, result);

              if (isSet_1(value)) {
                value.forEach(function(subValue) {
                  result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
                });

                return result;
              }

              if (isMap_1(value)) {
                value.forEach(function(subValue, key) {
                  result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
                });

                return result;
              }

              var keysFunc = isFull
                ? (isFlat ? _getAllKeysIn : _getAllKeys)
                : (isFlat ? keysIn : keys_1);

              var props = isArr ? undefined : keysFunc(value);
              _arrayEach(props || value, function(subValue, key) {
                if (props) {
                  key = subValue;
                  subValue = value[key];
                }
                // Recursively populate clone (susceptible to call stack limits).
                _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
              });
              return result;
            }

            var _baseClone = baseClone;

            /**
             * Gets the last element of `array`.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Array
             * @param {Array} array The array to query.
             * @returns {*} Returns the last element of `array`.
             * @example
             *
             * _.last([1, 2, 3]);
             * // => 3
             */
            function last(array) {
              var length = array == null ? 0 : array.length;
              return length ? array[length - 1] : undefined;
            }

            var last_1 = last;

            /**
             * The base implementation of `_.slice` without an iteratee call guard.
             *
             * @private
             * @param {Array} array The array to slice.
             * @param {number} [start=0] The start position.
             * @param {number} [end=array.length] The end position.
             * @returns {Array} Returns the slice of `array`.
             */
            function baseSlice(array, start, end) {
              var index = -1,
                  length = array.length;

              if (start < 0) {
                start = -start > length ? 0 : (length + start);
              }
              end = end > length ? length : end;
              if (end < 0) {
                end += length;
              }
              length = start > end ? 0 : ((end - start) >>> 0);
              start >>>= 0;

              var result = Array(length);
              while (++index < length) {
                result[index] = array[index + start];
              }
              return result;
            }

            var _baseSlice = baseSlice;

            /**
             * Gets the parent value at `path` of `object`.
             *
             * @private
             * @param {Object} object The object to query.
             * @param {Array} path The path to get the parent value of.
             * @returns {*} Returns the parent value.
             */
            function parent(object, path) {
              return path.length < 2 ? object : _baseGet(object, _baseSlice(path, 0, -1));
            }

            var _parent = parent;

            /**
             * The base implementation of `_.unset`.
             *
             * @private
             * @param {Object} object The object to modify.
             * @param {Array|string} path The property path to unset.
             * @returns {boolean} Returns `true` if the property is deleted, else `false`.
             */
            function baseUnset(object, path) {
              path = _castPath(path, object);
              object = _parent(object, path);
              return object == null || delete object[_toKey(last_1(path))];
            }

            var _baseUnset = baseUnset;

            /** `Object#toString` result references. */
            var objectTag$4 = '[object Object]';

            /** Used for built-in method references. */
            var funcProto$2 = Function.prototype,
                objectProto$g = Object.prototype;

            /** Used to resolve the decompiled source of functions. */
            var funcToString$2 = funcProto$2.toString;

            /** Used to check objects for own properties. */
            var hasOwnProperty$e = objectProto$g.hasOwnProperty;

            /** Used to infer the `Object` constructor. */
            var objectCtorString = funcToString$2.call(Object);

            /**
             * Checks if `value` is a plain object, that is, an object created by the
             * `Object` constructor or one with a `[[Prototype]]` of `null`.
             *
             * @static
             * @memberOf _
             * @since 0.8.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
             * @example
             *
             * function Foo() {
             *   this.a = 1;
             * }
             *
             * _.isPlainObject(new Foo);
             * // => false
             *
             * _.isPlainObject([1, 2, 3]);
             * // => false
             *
             * _.isPlainObject({ 'x': 0, 'y': 0 });
             * // => true
             *
             * _.isPlainObject(Object.create(null));
             * // => true
             */
            function isPlainObject(value) {
              if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$4) {
                return false;
              }
              var proto = _getPrototype(value);
              if (proto === null) {
                return true;
              }
              var Ctor = hasOwnProperty$e.call(proto, 'constructor') && proto.constructor;
              return typeof Ctor == 'function' && Ctor instanceof Ctor &&
                funcToString$2.call(Ctor) == objectCtorString;
            }

            var isPlainObject_1 = isPlainObject;

            /**
             * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
             * objects.
             *
             * @private
             * @param {*} value The value to inspect.
             * @param {string} key The key of the property to inspect.
             * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
             */
            function customOmitClone(value) {
              return isPlainObject_1(value) ? undefined : value;
            }

            var _customOmitClone = customOmitClone;

            /** Built-in value references. */
            var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

            /**
             * Checks if `value` is a flattenable `arguments` object or array.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
             */
            function isFlattenable(value) {
              return isArray_1(value) || isArguments_1(value) ||
                !!(spreadableSymbol && value && value[spreadableSymbol]);
            }

            var _isFlattenable = isFlattenable;

            /**
             * The base implementation of `_.flatten` with support for restricting flattening.
             *
             * @private
             * @param {Array} array The array to flatten.
             * @param {number} depth The maximum recursion depth.
             * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
             * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
             * @param {Array} [result=[]] The initial result value.
             * @returns {Array} Returns the new flattened array.
             */
            function baseFlatten(array, depth, predicate, isStrict, result) {
              var index = -1,
                  length = array.length;

              predicate || (predicate = _isFlattenable);
              result || (result = []);

              while (++index < length) {
                var value = array[index];
                if (depth > 0 && predicate(value)) {
                  if (depth > 1) {
                    // Recursively flatten arrays (susceptible to call stack limits).
                    baseFlatten(value, depth - 1, predicate, isStrict, result);
                  } else {
                    _arrayPush(result, value);
                  }
                } else if (!isStrict) {
                  result[result.length] = value;
                }
              }
              return result;
            }

            var _baseFlatten = baseFlatten;

            /**
             * Flattens `array` a single level deep.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Array
             * @param {Array} array The array to flatten.
             * @returns {Array} Returns the new flattened array.
             * @example
             *
             * _.flatten([1, [2, [3, [4]], 5]]);
             * // => [1, 2, [3, [4]], 5]
             */
            function flatten(array) {
              var length = array == null ? 0 : array.length;
              return length ? _baseFlatten(array, 1) : [];
            }

            var flatten_1 = flatten;

            /**
             * A faster alternative to `Function#apply`, this function invokes `func`
             * with the `this` binding of `thisArg` and the arguments of `args`.
             *
             * @private
             * @param {Function} func The function to invoke.
             * @param {*} thisArg The `this` binding of `func`.
             * @param {Array} args The arguments to invoke `func` with.
             * @returns {*} Returns the result of `func`.
             */
            function apply(func, thisArg, args) {
              switch (args.length) {
                case 0: return func.call(thisArg);
                case 1: return func.call(thisArg, args[0]);
                case 2: return func.call(thisArg, args[0], args[1]);
                case 3: return func.call(thisArg, args[0], args[1], args[2]);
              }
              return func.apply(thisArg, args);
            }

            var _apply = apply;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMax$1 = Math.max;

            /**
             * A specialized version of `baseRest` which transforms the rest array.
             *
             * @private
             * @param {Function} func The function to apply a rest parameter to.
             * @param {number} [start=func.length-1] The start position of the rest parameter.
             * @param {Function} transform The rest array transform.
             * @returns {Function} Returns the new function.
             */
            function overRest(func, start, transform) {
              start = nativeMax$1(start === undefined ? (func.length - 1) : start, 0);
              return function() {
                var args = arguments,
                    index = -1,
                    length = nativeMax$1(args.length - start, 0),
                    array = Array(length);

                while (++index < length) {
                  array[index] = args[start + index];
                }
                index = -1;
                var otherArgs = Array(start + 1);
                while (++index < start) {
                  otherArgs[index] = args[index];
                }
                otherArgs[start] = transform(array);
                return _apply(func, this, otherArgs);
              };
            }

            var _overRest = overRest;

            /**
             * Creates a function that returns `value`.
             *
             * @static
             * @memberOf _
             * @since 2.4.0
             * @category Util
             * @param {*} value The value to return from the new function.
             * @returns {Function} Returns the new constant function.
             * @example
             *
             * var objects = _.times(2, _.constant({ 'a': 1 }));
             *
             * console.log(objects);
             * // => [{ 'a': 1 }, { 'a': 1 }]
             *
             * console.log(objects[0] === objects[1]);
             * // => true
             */
            function constant(value) {
              return function() {
                return value;
              };
            }

            var constant_1 = constant;

            /**
             * The base implementation of `setToString` without support for hot loop shorting.
             *
             * @private
             * @param {Function} func The function to modify.
             * @param {Function} string The `toString` result.
             * @returns {Function} Returns `func`.
             */
            var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
              return _defineProperty(func, 'toString', {
                'configurable': true,
                'enumerable': false,
                'value': constant_1(string),
                'writable': true
              });
            };

            var _baseSetToString = baseSetToString;

            /** Used to detect hot functions by number of calls within a span of milliseconds. */
            var HOT_COUNT = 800,
                HOT_SPAN = 16;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeNow = Date.now;

            /**
             * Creates a function that'll short out and invoke `identity` instead
             * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
             * milliseconds.
             *
             * @private
             * @param {Function} func The function to restrict.
             * @returns {Function} Returns the new shortable function.
             */
            function shortOut(func) {
              var count = 0,
                  lastCalled = 0;

              return function() {
                var stamp = nativeNow(),
                    remaining = HOT_SPAN - (stamp - lastCalled);

                lastCalled = stamp;
                if (remaining > 0) {
                  if (++count >= HOT_COUNT) {
                    return arguments[0];
                  }
                } else {
                  count = 0;
                }
                return func.apply(undefined, arguments);
              };
            }

            var _shortOut = shortOut;

            /**
             * Sets the `toString` method of `func` to return `string`.
             *
             * @private
             * @param {Function} func The function to modify.
             * @param {Function} string The `toString` result.
             * @returns {Function} Returns `func`.
             */
            var setToString = _shortOut(_baseSetToString);

            var _setToString = setToString;

            /**
             * A specialized version of `baseRest` which flattens the rest array.
             *
             * @private
             * @param {Function} func The function to apply a rest parameter to.
             * @returns {Function} Returns the new function.
             */
            function flatRest(func) {
              return _setToString(_overRest(func, undefined, flatten_1), func + '');
            }

            var _flatRest = flatRest;

            /** Used to compose bitmasks for cloning. */
            var CLONE_DEEP_FLAG$1 = 1,
                CLONE_FLAT_FLAG$1 = 2,
                CLONE_SYMBOLS_FLAG$1 = 4;

            /**
             * The opposite of `_.pick`; this method creates an object composed of the
             * own and inherited enumerable property paths of `object` that are not omitted.
             *
             * **Note:** This method is considerably slower than `_.pick`.
             *
             * @static
             * @since 0.1.0
             * @memberOf _
             * @category Object
             * @param {Object} object The source object.
             * @param {...(string|string[])} [paths] The property paths to omit.
             * @returns {Object} Returns the new object.
             * @example
             *
             * var object = { 'a': 1, 'b': '2', 'c': 3 };
             *
             * _.omit(object, ['a', 'c']);
             * // => { 'b': '2' }
             */
            var omit = _flatRest(function(object, paths) {
              var result = {};
              if (object == null) {
                return result;
              }
              var isDeep = false;
              paths = _arrayMap(paths, function(path) {
                path = _castPath(path, object);
                isDeep || (isDeep = path.length > 1);
                return path;
              });
              _copyObject(object, _getAllKeysIn(object), result);
              if (isDeep) {
                result = _baseClone(result, CLONE_DEEP_FLAG$1 | CLONE_FLAT_FLAG$1 | CLONE_SYMBOLS_FLAG$1, _customOmitClone);
              }
              var length = paths.length;
              while (length--) {
                _baseUnset(result, paths[length]);
              }
              return result;
            });

            var omit_1 = omit;

            /**
             * The base implementation of `_.isNaN` without support for number objects.
             *
             * @private
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
             */
            function baseIsNaN(value) {
              return value !== value;
            }

            var _baseIsNaN = baseIsNaN;

            /**
             * A specialized version of `_.indexOf` which performs strict equality
             * comparisons of values, i.e. `===`.
             *
             * @private
             * @param {Array} array The array to inspect.
             * @param {*} value The value to search for.
             * @param {number} fromIndex The index to search from.
             * @returns {number} Returns the index of the matched value, else `-1`.
             */
            function strictIndexOf(array, value, fromIndex) {
              var index = fromIndex - 1,
                  length = array.length;

              while (++index < length) {
                if (array[index] === value) {
                  return index;
                }
              }
              return -1;
            }

            var _strictIndexOf = strictIndexOf;

            /**
             * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
             *
             * @private
             * @param {Array} array The array to inspect.
             * @param {*} value The value to search for.
             * @param {number} fromIndex The index to search from.
             * @returns {number} Returns the index of the matched value, else `-1`.
             */
            function baseIndexOf(array, value, fromIndex) {
              return value === value
                ? _strictIndexOf(array, value, fromIndex)
                : _baseFindIndex(array, _baseIsNaN, fromIndex);
            }

            var _baseIndexOf = baseIndexOf;

            /**
             * A specialized version of `_.includes` for arrays without support for
             * specifying an index to search from.
             *
             * @private
             * @param {Array} [array] The array to inspect.
             * @param {*} target The value to search for.
             * @returns {boolean} Returns `true` if `target` is found, else `false`.
             */
            function arrayIncludes(array, value) {
              var length = array == null ? 0 : array.length;
              return !!length && _baseIndexOf(array, value, 0) > -1;
            }

            var _arrayIncludes = arrayIncludes;

            /**
             * This function is like `arrayIncludes` except that it accepts a comparator.
             *
             * @private
             * @param {Array} [array] The array to inspect.
             * @param {*} target The value to search for.
             * @param {Function} comparator The comparator invoked per element.
             * @returns {boolean} Returns `true` if `target` is found, else `false`.
             */
            function arrayIncludesWith(array, value, comparator) {
              var index = -1,
                  length = array == null ? 0 : array.length;

              while (++index < length) {
                if (comparator(value, array[index])) {
                  return true;
                }
              }
              return false;
            }

            var _arrayIncludesWith = arrayIncludesWith;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMin = Math.min;

            /**
             * The base implementation of methods like `_.intersection`, without support
             * for iteratee shorthands, that accepts an array of arrays to inspect.
             *
             * @private
             * @param {Array} arrays The arrays to inspect.
             * @param {Function} [iteratee] The iteratee invoked per element.
             * @param {Function} [comparator] The comparator invoked per element.
             * @returns {Array} Returns the new array of shared values.
             */
            function baseIntersection(arrays, iteratee, comparator) {
              var includes = comparator ? _arrayIncludesWith : _arrayIncludes,
                  length = arrays[0].length,
                  othLength = arrays.length,
                  othIndex = othLength,
                  caches = Array(othLength),
                  maxLength = Infinity,
                  result = [];

              while (othIndex--) {
                var array = arrays[othIndex];
                if (othIndex && iteratee) {
                  array = _arrayMap(array, _baseUnary(iteratee));
                }
                maxLength = nativeMin(array.length, maxLength);
                caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
                  ? new _SetCache(othIndex && array)
                  : undefined;
              }
              array = arrays[0];

              var index = -1,
                  seen = caches[0];

              outer:
              while (++index < length && result.length < maxLength) {
                var value = array[index],
                    computed = iteratee ? iteratee(value) : value;

                value = (comparator || value !== 0) ? value : 0;
                if (!(seen
                      ? _cacheHas(seen, computed)
                      : includes(result, computed, comparator)
                    )) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache = caches[othIndex];
                    if (!(cache
                          ? _cacheHas(cache, computed)
                          : includes(arrays[othIndex], computed, comparator))
                        ) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  result.push(value);
                }
              }
              return result;
            }

            var _baseIntersection = baseIntersection;

            /**
             * The base implementation of `_.rest` which doesn't validate or coerce arguments.
             *
             * @private
             * @param {Function} func The function to apply a rest parameter to.
             * @param {number} [start=func.length-1] The start position of the rest parameter.
             * @returns {Function} Returns the new function.
             */
            function baseRest(func, start) {
              return _setToString(_overRest(func, start, identity_1), func + '');
            }

            var _baseRest = baseRest;

            /**
             * This method is like `_.isArrayLike` except that it also checks if `value`
             * is an object.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is an array-like object,
             *  else `false`.
             * @example
             *
             * _.isArrayLikeObject([1, 2, 3]);
             * // => true
             *
             * _.isArrayLikeObject(document.body.children);
             * // => true
             *
             * _.isArrayLikeObject('abc');
             * // => false
             *
             * _.isArrayLikeObject(_.noop);
             * // => false
             */
            function isArrayLikeObject(value) {
              return isObjectLike_1(value) && isArrayLike_1(value);
            }

            var isArrayLikeObject_1 = isArrayLikeObject;

            /**
             * Casts `value` to an empty array if it's not an array like object.
             *
             * @private
             * @param {*} value The value to inspect.
             * @returns {Array|Object} Returns the cast array-like object.
             */
            function castArrayLikeObject(value) {
              return isArrayLikeObject_1(value) ? value : [];
            }

            var _castArrayLikeObject = castArrayLikeObject;

            /**
             * Creates an array of unique values that are included in all given arrays
             * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
             * for equality comparisons. The order and references of result values are
             * determined by the first array.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Array
             * @param {...Array} [arrays] The arrays to inspect.
             * @returns {Array} Returns the new array of intersecting values.
             * @example
             *
             * _.intersection([2, 1], [2, 3]);
             * // => [2]
             */
            var intersection = _baseRest(function(arrays) {
              var mapped = _arrayMap(arrays, _castArrayLikeObject);
              return (mapped.length && mapped[0] === arrays[0])
                ? _baseIntersection(mapped)
                : [];
            });

            var intersection_1 = intersection;

            /**
             * Creates a base function for methods like `_.forIn` and `_.forOwn`.
             *
             * @private
             * @param {boolean} [fromRight] Specify iterating from right to left.
             * @returns {Function} Returns the new base function.
             */
            function createBaseFor(fromRight) {
              return function(object, iteratee, keysFunc) {
                var index = -1,
                    iterable = Object(object),
                    props = keysFunc(object),
                    length = props.length;

                while (length--) {
                  var key = props[fromRight ? length : ++index];
                  if (iteratee(iterable[key], key, iterable) === false) {
                    break;
                  }
                }
                return object;
              };
            }

            var _createBaseFor = createBaseFor;

            /**
             * The base implementation of `baseForOwn` which iterates over `object`
             * properties returned by `keysFunc` and invokes `iteratee` for each property.
             * Iteratee functions may exit iteration early by explicitly returning `false`.
             *
             * @private
             * @param {Object} object The object to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @param {Function} keysFunc The function to get the keys of `object`.
             * @returns {Object} Returns `object`.
             */
            var baseFor = _createBaseFor();

            var _baseFor = baseFor;

            /**
             * The base implementation of `_.forOwn` without support for iteratee shorthands.
             *
             * @private
             * @param {Object} object The object to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Object} Returns `object`.
             */
            function baseForOwn(object, iteratee) {
              return object && _baseFor(object, iteratee, keys_1);
            }

            var _baseForOwn = baseForOwn;

            /**
             * Casts `value` to `identity` if it's not a function.
             *
             * @private
             * @param {*} value The value to inspect.
             * @returns {Function} Returns cast function.
             */
            function castFunction(value) {
              return typeof value == 'function' ? value : identity_1;
            }

            var _castFunction = castFunction;

            /**
             * Iterates over own enumerable string keyed properties of an object and
             * invokes `iteratee` for each property. The iteratee is invoked with three
             * arguments: (value, key, object). Iteratee functions may exit iteration
             * early by explicitly returning `false`.
             *
             * @static
             * @memberOf _
             * @since 0.3.0
             * @category Object
             * @param {Object} object The object to iterate over.
             * @param {Function} [iteratee=_.identity] The function invoked per iteration.
             * @returns {Object} Returns `object`.
             * @see _.forOwnRight
             * @example
             *
             * function Foo() {
             *   this.a = 1;
             *   this.b = 2;
             * }
             *
             * Foo.prototype.c = 3;
             *
             * _.forOwn(new Foo, function(value, key) {
             *   console.log(key);
             * });
             * // => Logs 'a' then 'b' (iteration order is not guaranteed).
             */
            function forOwn(object, iteratee) {
              return object && _baseForOwn(object, _castFunction(iteratee));
            }

            var forOwn_1 = forOwn;

            /**
             * Creates a `baseEach` or `baseEachRight` function.
             *
             * @private
             * @param {Function} eachFunc The function to iterate over a collection.
             * @param {boolean} [fromRight] Specify iterating from right to left.
             * @returns {Function} Returns the new base function.
             */
            function createBaseEach(eachFunc, fromRight) {
              return function(collection, iteratee) {
                if (collection == null) {
                  return collection;
                }
                if (!isArrayLike_1(collection)) {
                  return eachFunc(collection, iteratee);
                }
                var length = collection.length,
                    index = fromRight ? length : -1,
                    iterable = Object(collection);

                while ((fromRight ? index-- : ++index < length)) {
                  if (iteratee(iterable[index], index, iterable) === false) {
                    break;
                  }
                }
                return collection;
              };
            }

            var _createBaseEach = createBaseEach;

            /**
             * The base implementation of `_.forEach` without support for iteratee shorthands.
             *
             * @private
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Array|Object} Returns `collection`.
             */
            var baseEach = _createBaseEach(_baseForOwn);

            var _baseEach = baseEach;

            /**
             * Iterates over elements of `collection` and invokes `iteratee` for each element.
             * The iteratee is invoked with three arguments: (value, index|key, collection).
             * Iteratee functions may exit iteration early by explicitly returning `false`.
             *
             * **Note:** As with other "Collections" methods, objects with a "length"
             * property are iterated like arrays. To avoid this behavior use `_.forIn`
             * or `_.forOwn` for object iteration.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @alias each
             * @category Collection
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Function} [iteratee=_.identity] The function invoked per iteration.
             * @returns {Array|Object} Returns `collection`.
             * @see _.forEachRight
             * @example
             *
             * _.forEach([1, 2], function(value) {
             *   console.log(value);
             * });
             * // => Logs `1` then `2`.
             *
             * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
             *   console.log(key);
             * });
             * // => Logs 'a' then 'b' (iteration order is not guaranteed).
             */
            function forEach(collection, iteratee) {
              var func = isArray_1(collection) ? _arrayEach : _baseEach;
              return func(collection, _castFunction(iteratee));
            }

            var forEach_1 = forEach;

            /**
             * The base implementation of `_.filter` without support for iteratee shorthands.
             *
             * @private
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Function} predicate The function invoked per iteration.
             * @returns {Array} Returns the new filtered array.
             */
            function baseFilter(collection, predicate) {
              var result = [];
              _baseEach(collection, function(value, index, collection) {
                if (predicate(value, index, collection)) {
                  result.push(value);
                }
              });
              return result;
            }

            var _baseFilter = baseFilter;

            /**
             * Iterates over elements of `collection`, returning an array of all elements
             * `predicate` returns truthy for. The predicate is invoked with three
             * arguments: (value, index|key, collection).
             *
             * **Note:** Unlike `_.remove`, this method returns a new array.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Collection
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Function} [predicate=_.identity] The function invoked per iteration.
             * @returns {Array} Returns the new filtered array.
             * @see _.reject
             * @example
             *
             * var users = [
             *   { 'user': 'barney', 'age': 36, 'active': true },
             *   { 'user': 'fred',   'age': 40, 'active': false }
             * ];
             *
             * _.filter(users, function(o) { return !o.active; });
             * // => objects for ['fred']
             *
             * // The `_.matches` iteratee shorthand.
             * _.filter(users, { 'age': 36, 'active': true });
             * // => objects for ['barney']
             *
             * // The `_.matchesProperty` iteratee shorthand.
             * _.filter(users, ['active', false]);
             * // => objects for ['fred']
             *
             * // The `_.property` iteratee shorthand.
             * _.filter(users, 'active');
             * // => objects for ['barney']
             */
            function filter(collection, predicate) {
              var func = isArray_1(collection) ? _arrayFilter : _baseFilter;
              return func(collection, _baseIteratee(predicate, 3));
            }

            var filter_1 = filter;

            /**
             * The base implementation of `_.map` without support for iteratee shorthands.
             *
             * @private
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {Array} Returns the new mapped array.
             */
            function baseMap(collection, iteratee) {
              var index = -1,
                  result = isArrayLike_1(collection) ? Array(collection.length) : [];

              _baseEach(collection, function(value, key, collection) {
                result[++index] = iteratee(value, key, collection);
              });
              return result;
            }

            var _baseMap = baseMap;

            /**
             * Creates an array of values by running each element in `collection` thru
             * `iteratee`. The iteratee is invoked with three arguments:
             * (value, index|key, collection).
             *
             * Many lodash methods are guarded to work as iteratees for methods like
             * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
             *
             * The guarded methods are:
             * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
             * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
             * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
             * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Collection
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Function} [iteratee=_.identity] The function invoked per iteration.
             * @returns {Array} Returns the new mapped array.
             * @example
             *
             * function square(n) {
             *   return n * n;
             * }
             *
             * _.map([4, 8], square);
             * // => [16, 64]
             *
             * _.map({ 'a': 4, 'b': 8 }, square);
             * // => [16, 64] (iteration order is not guaranteed)
             *
             * var users = [
             *   { 'user': 'barney' },
             *   { 'user': 'fred' }
             * ];
             *
             * // The `_.property` iteratee shorthand.
             * _.map(users, 'user');
             * // => ['barney', 'fred']
             */
            function map(collection, iteratee) {
              var func = isArray_1(collection) ? _arrayMap : _baseMap;
              return func(collection, _baseIteratee(iteratee, 3));
            }

            var map_1 = map;

            /**
             * A specialized version of `_.reduce` for arrays without support for
             * iteratee shorthands.
             *
             * @private
             * @param {Array} [array] The array to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @param {*} [accumulator] The initial value.
             * @param {boolean} [initAccum] Specify using the first element of `array` as
             *  the initial value.
             * @returns {*} Returns the accumulated value.
             */
            function arrayReduce(array, iteratee, accumulator, initAccum) {
              var index = -1,
                  length = array == null ? 0 : array.length;

              if (initAccum && length) {
                accumulator = array[++index];
              }
              while (++index < length) {
                accumulator = iteratee(accumulator, array[index], index, array);
              }
              return accumulator;
            }

            var _arrayReduce = arrayReduce;

            /**
             * The base implementation of `_.reduce` and `_.reduceRight`, without support
             * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
             *
             * @private
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @param {*} accumulator The initial value.
             * @param {boolean} initAccum Specify using the first or last element of
             *  `collection` as the initial value.
             * @param {Function} eachFunc The function to iterate over `collection`.
             * @returns {*} Returns the accumulated value.
             */
            function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
              eachFunc(collection, function(value, index, collection) {
                accumulator = initAccum
                  ? (initAccum = false, value)
                  : iteratee(accumulator, value, index, collection);
              });
              return accumulator;
            }

            var _baseReduce = baseReduce;

            /**
             * Reduces `collection` to a value which is the accumulated result of running
             * each element in `collection` thru `iteratee`, where each successive
             * invocation is supplied the return value of the previous. If `accumulator`
             * is not given, the first element of `collection` is used as the initial
             * value. The iteratee is invoked with four arguments:
             * (accumulator, value, index|key, collection).
             *
             * Many lodash methods are guarded to work as iteratees for methods like
             * `_.reduce`, `_.reduceRight`, and `_.transform`.
             *
             * The guarded methods are:
             * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
             * and `sortBy`
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Collection
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Function} [iteratee=_.identity] The function invoked per iteration.
             * @param {*} [accumulator] The initial value.
             * @returns {*} Returns the accumulated value.
             * @see _.reduceRight
             * @example
             *
             * _.reduce([1, 2], function(sum, n) {
             *   return sum + n;
             * }, 0);
             * // => 3
             *
             * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
             *   (result[value] || (result[value] = [])).push(key);
             *   return result;
             * }, {});
             * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
             */
            function reduce(collection, iteratee, accumulator) {
              var func = isArray_1(collection) ? _arrayReduce : _baseReduce,
                  initAccum = arguments.length < 3;

              return func(collection, _baseIteratee(iteratee, 4), accumulator, initAccum, _baseEach);
            }

            var reduce_1 = reduce;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMax$2 = Math.max;

            /**
             * Gets the index at which the first occurrence of `value` is found in `array`
             * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
             * for equality comparisons. If `fromIndex` is negative, it's used as the
             * offset from the end of `array`.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Array
             * @param {Array} array The array to inspect.
             * @param {*} value The value to search for.
             * @param {number} [fromIndex=0] The index to search from.
             * @returns {number} Returns the index of the matched value, else `-1`.
             * @example
             *
             * _.indexOf([1, 2, 1, 2], 2);
             * // => 1
             *
             * // Search from the `fromIndex`.
             * _.indexOf([1, 2, 1, 2], 2, 2);
             * // => 3
             */
            function indexOf(array, value, fromIndex) {
              var length = array == null ? 0 : array.length;
              if (!length) {
                return -1;
              }
              var index = fromIndex == null ? 0 : toInteger_1(fromIndex);
              if (index < 0) {
                index = nativeMax$2(length + index, 0);
              }
              return _baseIndexOf(array, value, index);
            }

            var indexOf_1 = indexOf;

            /** `Object#toString` result references. */
            var numberTag$4 = '[object Number]';

            /**
             * Checks if `value` is classified as a `Number` primitive or object.
             *
             * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
             * classified as numbers, use the `_.isFinite` method.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a number, else `false`.
             * @example
             *
             * _.isNumber(3);
             * // => true
             *
             * _.isNumber(Number.MIN_VALUE);
             * // => true
             *
             * _.isNumber(Infinity);
             * // => true
             *
             * _.isNumber('3');
             * // => false
             */
            function isNumber(value) {
              return typeof value == 'number' ||
                (isObjectLike_1(value) && _baseGetTag(value) == numberTag$4);
            }

            var isNumber_1 = isNumber;

            /**
             * Checks if `value` is `NaN`.
             *
             * **Note:** This method is based on
             * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
             * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
             * `undefined` and other non-number values.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
             * @example
             *
             * _.isNaN(NaN);
             * // => true
             *
             * _.isNaN(new Number(NaN));
             * // => true
             *
             * isNaN(undefined);
             * // => true
             *
             * _.isNaN(undefined);
             * // => false
             */
            function isNaN$1(value) {
              // An `NaN` primitive is the only value that is not equal to itself.
              // Perform the `toStringTag` check first to avoid errors with some
              // ActiveX objects in IE.
              return isNumber_1(value) && value != +value;
            }

            var _isNaN = isNaN$1;

            /**
             * Performs a deep comparison between two values to determine if they are
             * equivalent.
             *
             * **Note:** This method supports comparing arrays, array buffers, booleans,
             * date objects, error objects, maps, numbers, `Object` objects, regexes,
             * sets, strings, symbols, and typed arrays. `Object` objects are compared
             * by their own, not inherited, enumerable properties. Functions and DOM
             * nodes are compared by strict equality, i.e. `===`.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to compare.
             * @param {*} other The other value to compare.
             * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
             * @example
             *
             * var object = { 'a': 1 };
             * var other = { 'a': 1 };
             *
             * _.isEqual(object, other);
             * // => true
             *
             * object === other;
             * // => false
             */
            function isEqual(value, other) {
              return _baseIsEqual(value, other);
            }

            var isEqual_1 = isEqual;

            /**
             * Checks if `value` is `undefined`.
             *
             * @static
             * @since 0.1.0
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
             * @example
             *
             * _.isUndefined(void 0);
             * // => true
             *
             * _.isUndefined(null);
             * // => false
             */
            function isUndefined(value) {
              return value === undefined;
            }

            var isUndefined_1 = isUndefined;

            /** `Object#toString` result references. */
            var stringTag$4 = '[object String]';

            /**
             * Checks if `value` is classified as a `String` primitive or object.
             *
             * @static
             * @since 0.1.0
             * @memberOf _
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a string, else `false`.
             * @example
             *
             * _.isString('abc');
             * // => true
             *
             * _.isString(1);
             * // => false
             */
            function isString(value) {
              return typeof value == 'string' ||
                (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag$4);
            }

            var isString_1 = isString;

            /**
             * Casts `array` to a slice if it's needed.
             *
             * @private
             * @param {Array} array The array to inspect.
             * @param {number} start The start position.
             * @param {number} [end=array.length] The end position.
             * @returns {Array} Returns the cast slice.
             */
            function castSlice(array, start, end) {
              var length = array.length;
              end = end === undefined ? length : end;
              return (!start && end >= length) ? array : _baseSlice(array, start, end);
            }

            var _castSlice = castSlice;

            /**
             * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
             * that is not found in the character symbols.
             *
             * @private
             * @param {Array} strSymbols The string symbols to inspect.
             * @param {Array} chrSymbols The character symbols to find.
             * @returns {number} Returns the index of the last unmatched string symbol.
             */
            function charsEndIndex(strSymbols, chrSymbols) {
              var index = strSymbols.length;

              while (index-- && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
              return index;
            }

            var _charsEndIndex = charsEndIndex;

            /**
             * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
             * that is not found in the character symbols.
             *
             * @private
             * @param {Array} strSymbols The string symbols to inspect.
             * @param {Array} chrSymbols The character symbols to find.
             * @returns {number} Returns the index of the first unmatched string symbol.
             */
            function charsStartIndex(strSymbols, chrSymbols) {
              var index = -1,
                  length = strSymbols.length;

              while (++index < length && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
              return index;
            }

            var _charsStartIndex = charsStartIndex;

            /**
             * Converts an ASCII `string` to an array.
             *
             * @private
             * @param {string} string The string to convert.
             * @returns {Array} Returns the converted array.
             */
            function asciiToArray(string) {
              return string.split('');
            }

            var _asciiToArray = asciiToArray;

            /** Used to compose unicode character classes. */
            var rsAstralRange = '\\ud800-\\udfff',
                rsComboMarksRange = '\\u0300-\\u036f',
                reComboHalfMarksRange = '\\ufe20-\\ufe2f',
                rsComboSymbolsRange = '\\u20d0-\\u20ff',
                rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
                rsVarRange = '\\ufe0e\\ufe0f';

            /** Used to compose unicode capture groups. */
            var rsZWJ = '\\u200d';

            /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
            var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

            /**
             * Checks if `string` contains Unicode symbols.
             *
             * @private
             * @param {string} string The string to inspect.
             * @returns {boolean} Returns `true` if a symbol is found, else `false`.
             */
            function hasUnicode(string) {
              return reHasUnicode.test(string);
            }

            var _hasUnicode = hasUnicode;

            /** Used to compose unicode character classes. */
            var rsAstralRange$1 = '\\ud800-\\udfff',
                rsComboMarksRange$1 = '\\u0300-\\u036f',
                reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
                rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
                rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
                rsVarRange$1 = '\\ufe0e\\ufe0f';

            /** Used to compose unicode capture groups. */
            var rsAstral = '[' + rsAstralRange$1 + ']',
                rsCombo = '[' + rsComboRange$1 + ']',
                rsFitz = '\\ud83c[\\udffb-\\udfff]',
                rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
                rsNonAstral = '[^' + rsAstralRange$1 + ']',
                rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
                rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
                rsZWJ$1 = '\\u200d';

            /** Used to compose unicode regexes. */
            var reOptMod = rsModifier + '?',
                rsOptVar = '[' + rsVarRange$1 + ']?',
                rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
                rsSeq = rsOptVar + reOptMod + rsOptJoin,
                rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

            /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
            var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

            /**
             * Converts a Unicode `string` to an array.
             *
             * @private
             * @param {string} string The string to convert.
             * @returns {Array} Returns the converted array.
             */
            function unicodeToArray(string) {
              return string.match(reUnicode) || [];
            }

            var _unicodeToArray = unicodeToArray;

            /**
             * Converts `string` to an array.
             *
             * @private
             * @param {string} string The string to convert.
             * @returns {Array} Returns the converted array.
             */
            function stringToArray(string) {
              return _hasUnicode(string)
                ? _unicodeToArray(string)
                : _asciiToArray(string);
            }

            var _stringToArray = stringToArray;

            /** Used to match leading and trailing whitespace. */
            var reTrim$1 = /^\s+|\s+$/g;

            /**
             * Removes leading and trailing whitespace or specified characters from `string`.
             *
             * @static
             * @memberOf _
             * @since 3.0.0
             * @category String
             * @param {string} [string=''] The string to trim.
             * @param {string} [chars=whitespace] The characters to trim.
             * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
             * @returns {string} Returns the trimmed string.
             * @example
             *
             * _.trim('  abc  ');
             * // => 'abc'
             *
             * _.trim('-_-abc-_-', '_-');
             * // => 'abc'
             *
             * _.map(['  foo  ', '  bar  '], _.trim);
             * // => ['foo', 'bar']
             */
            function trim(string, chars, guard) {
              string = toString_1(string);
              if (string && (guard || chars === undefined)) {
                return string.replace(reTrim$1, '');
              }
              if (!string || !(chars = _baseToString(chars))) {
                return string;
              }
              var strSymbols = _stringToArray(string),
                  chrSymbols = _stringToArray(chars),
                  start = _charsStartIndex(strSymbols, chrSymbols),
                  end = _charsEndIndex(strSymbols, chrSymbols) + 1;

              return _castSlice(strSymbols, start, end).join('');
            }

            var trim_1 = trim;

            /**
             * Checks if the given arguments are from an iteratee call.
             *
             * @private
             * @param {*} value The potential iteratee value argument.
             * @param {*} index The potential iteratee index or key argument.
             * @param {*} object The potential iteratee object argument.
             * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
             *  else `false`.
             */
            function isIterateeCall(value, index, object) {
              if (!isObject_1(object)) {
                return false;
              }
              var type = typeof index;
              if (type == 'number'
                    ? (isArrayLike_1(object) && _isIndex(index, object.length))
                    : (type == 'string' && index in object)
                  ) {
                return eq_1(object[index], value);
              }
              return false;
            }

            var _isIterateeCall = isIterateeCall;

            /** Used for built-in method references. */
            var objectProto$h = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$f = objectProto$h.hasOwnProperty;

            /**
             * Assigns own and inherited enumerable string keyed properties of source
             * objects to the destination object for all destination properties that
             * resolve to `undefined`. Source objects are applied from left to right.
             * Once a property is set, additional values of the same property are ignored.
             *
             * **Note:** This method mutates `object`.
             *
             * @static
             * @since 0.1.0
             * @memberOf _
             * @category Object
             * @param {Object} object The destination object.
             * @param {...Object} [sources] The source objects.
             * @returns {Object} Returns `object`.
             * @see _.defaultsDeep
             * @example
             *
             * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
             * // => { 'a': 1, 'b': 2 }
             */
            var defaults = _baseRest(function(object, sources) {
              object = Object(object);

              var index = -1;
              var length = sources.length;
              var guard = length > 2 ? sources[2] : undefined;

              if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
                length = 1;
              }

              while (++index < length) {
                var source = sources[index];
                var props = keysIn_1(source);
                var propsIndex = -1;
                var propsLength = props.length;

                while (++propsIndex < propsLength) {
                  var key = props[propsIndex];
                  var value = object[key];

                  if (value === undefined ||
                      (eq_1(value, objectProto$h[key]) && !hasOwnProperty$f.call(object, key))) {
                    object[key] = source[key];
                  }
                }
              }

              return object;
            });

            var defaults_1 = defaults;

            /**
             * This function is like `assignValue` except that it doesn't assign
             * `undefined` values.
             *
             * @private
             * @param {Object} object The object to modify.
             * @param {string} key The key of the property to assign.
             * @param {*} value The value to assign.
             */
            function assignMergeValue(object, key, value) {
              if ((value !== undefined && !eq_1(object[key], value)) ||
                  (value === undefined && !(key in object))) {
                _baseAssignValue(object, key, value);
              }
            }

            var _assignMergeValue = assignMergeValue;

            /**
             * Gets the value at `key`, unless `key` is "__proto__".
             *
             * @private
             * @param {Object} object The object to query.
             * @param {string} key The key of the property to get.
             * @returns {*} Returns the property value.
             */
            function safeGet(object, key) {
              return key == '__proto__'
                ? undefined
                : object[key];
            }

            var _safeGet = safeGet;

            /**
             * Converts `value` to a plain object flattening inherited enumerable string
             * keyed properties of `value` to own properties of the plain object.
             *
             * @static
             * @memberOf _
             * @since 3.0.0
             * @category Lang
             * @param {*} value The value to convert.
             * @returns {Object} Returns the converted plain object.
             * @example
             *
             * function Foo() {
             *   this.b = 2;
             * }
             *
             * Foo.prototype.c = 3;
             *
             * _.assign({ 'a': 1 }, new Foo);
             * // => { 'a': 1, 'b': 2 }
             *
             * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
             * // => { 'a': 1, 'b': 2, 'c': 3 }
             */
            function toPlainObject(value) {
              return _copyObject(value, keysIn_1(value));
            }

            var toPlainObject_1 = toPlainObject;

            /**
             * A specialized version of `baseMerge` for arrays and objects which performs
             * deep merges and tracks traversed objects enabling objects with circular
             * references to be merged.
             *
             * @private
             * @param {Object} object The destination object.
             * @param {Object} source The source object.
             * @param {string} key The key of the value to merge.
             * @param {number} srcIndex The index of `source`.
             * @param {Function} mergeFunc The function to merge values.
             * @param {Function} [customizer] The function to customize assigned values.
             * @param {Object} [stack] Tracks traversed source values and their merged
             *  counterparts.
             */
            function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
              var objValue = _safeGet(object, key),
                  srcValue = _safeGet(source, key),
                  stacked = stack.get(srcValue);

              if (stacked) {
                _assignMergeValue(object, key, stacked);
                return;
              }
              var newValue = customizer
                ? customizer(objValue, srcValue, (key + ''), object, source, stack)
                : undefined;

              var isCommon = newValue === undefined;

              if (isCommon) {
                var isArr = isArray_1(srcValue),
                    isBuff = !isArr && isBuffer_1(srcValue),
                    isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

                newValue = srcValue;
                if (isArr || isBuff || isTyped) {
                  if (isArray_1(objValue)) {
                    newValue = objValue;
                  }
                  else if (isArrayLikeObject_1(objValue)) {
                    newValue = _copyArray(objValue);
                  }
                  else if (isBuff) {
                    isCommon = false;
                    newValue = _cloneBuffer(srcValue, true);
                  }
                  else if (isTyped) {
                    isCommon = false;
                    newValue = _cloneTypedArray(srcValue, true);
                  }
                  else {
                    newValue = [];
                  }
                }
                else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
                  newValue = objValue;
                  if (isArguments_1(objValue)) {
                    newValue = toPlainObject_1(objValue);
                  }
                  else if (!isObject_1(objValue) || (srcIndex && isFunction_1(objValue))) {
                    newValue = _initCloneObject(srcValue);
                  }
                }
                else {
                  isCommon = false;
                }
              }
              if (isCommon) {
                // Recursively merge objects and arrays (susceptible to call stack limits).
                stack.set(srcValue, newValue);
                mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
                stack['delete'](srcValue);
              }
              _assignMergeValue(object, key, newValue);
            }

            var _baseMergeDeep = baseMergeDeep;

            /**
             * The base implementation of `_.merge` without support for multiple sources.
             *
             * @private
             * @param {Object} object The destination object.
             * @param {Object} source The source object.
             * @param {number} srcIndex The index of `source`.
             * @param {Function} [customizer] The function to customize merged values.
             * @param {Object} [stack] Tracks traversed source values and their merged
             *  counterparts.
             */
            function baseMerge(object, source, srcIndex, customizer, stack) {
              if (object === source) {
                return;
              }
              _baseFor(source, function(srcValue, key) {
                if (isObject_1(srcValue)) {
                  stack || (stack = new _Stack);
                  _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
                }
                else {
                  var newValue = customizer
                    ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
                    : undefined;

                  if (newValue === undefined) {
                    newValue = srcValue;
                  }
                  _assignMergeValue(object, key, newValue);
                }
              }, keysIn_1);
            }

            var _baseMerge = baseMerge;

            /**
             * Creates a function like `_.assign`.
             *
             * @private
             * @param {Function} assigner The function to assign values.
             * @returns {Function} Returns the new assigner function.
             */
            function createAssigner(assigner) {
              return _baseRest(function(object, sources) {
                var index = -1,
                    length = sources.length,
                    customizer = length > 1 ? sources[length - 1] : undefined,
                    guard = length > 2 ? sources[2] : undefined;

                customizer = (assigner.length > 3 && typeof customizer == 'function')
                  ? (length--, customizer)
                  : undefined;

                if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
                  customizer = length < 3 ? undefined : customizer;
                  length = 1;
                }
                object = Object(object);
                while (++index < length) {
                  var source = sources[index];
                  if (source) {
                    assigner(object, source, index, customizer);
                  }
                }
                return object;
              });
            }

            var _createAssigner = createAssigner;

            /**
             * This method is like `_.assign` except that it recursively merges own and
             * inherited enumerable string keyed properties of source objects into the
             * destination object. Source properties that resolve to `undefined` are
             * skipped if a destination value exists. Array and plain object properties
             * are merged recursively. Other objects and value types are overridden by
             * assignment. Source objects are applied from left to right. Subsequent
             * sources overwrite property assignments of previous sources.
             *
             * **Note:** This method mutates `object`.
             *
             * @static
             * @memberOf _
             * @since 0.5.0
             * @category Object
             * @param {Object} object The destination object.
             * @param {...Object} [sources] The source objects.
             * @returns {Object} Returns `object`.
             * @example
             *
             * var object = {
             *   'a': [{ 'b': 2 }, { 'd': 4 }]
             * };
             *
             * var other = {
             *   'a': [{ 'c': 3 }, { 'e': 5 }]
             * };
             *
             * _.merge(object, other);
             * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
             */
            var merge = _createAssigner(function(object, source, srcIndex) {
              _baseMerge(object, source, srcIndex);
            });

            var merge_1 = merge;

            function valToNumber(v) {
              if (isNumber_1(v)) {
                return v;
              } else if (isString_1(v)) {
                return parseFloat(v);
              } else if (Array.isArray(v)) {
                return map_1(v, valToNumber);
              }

              throw new Error('The value should be a number, a parseable string or an array of those.');
            }

            var valToNumber_1 = valToNumber;

            function filterState(state, filters) {
              var partialState = {};
              var attributeFilters = filter_1(filters, function(f) { return f.indexOf('attribute:') !== -1; });
              var attributes = map_1(attributeFilters, function(aF) { return aF.split(':')[1]; });

              if (indexOf_1(attributes, '*') === -1) {
                forEach_1(attributes, function(attr) {
                  if (state.isConjunctiveFacet(attr) && state.isFacetRefined(attr)) {
                    if (!partialState.facetsRefinements) partialState.facetsRefinements = {};
                    partialState.facetsRefinements[attr] = state.facetsRefinements[attr];
                  }

                  if (state.isDisjunctiveFacet(attr) && state.isDisjunctiveFacetRefined(attr)) {
                    if (!partialState.disjunctiveFacetsRefinements) partialState.disjunctiveFacetsRefinements = {};
                    partialState.disjunctiveFacetsRefinements[attr] = state.disjunctiveFacetsRefinements[attr];
                  }

                  if (state.isHierarchicalFacet(attr) && state.isHierarchicalFacetRefined(attr)) {
                    if (!partialState.hierarchicalFacetsRefinements) partialState.hierarchicalFacetsRefinements = {};
                    partialState.hierarchicalFacetsRefinements[attr] = state.hierarchicalFacetsRefinements[attr];
                  }

                  var numericRefinements = state.getNumericRefinements(attr);
                  if (!isEmpty_1(numericRefinements)) {
                    if (!partialState.numericRefinements) partialState.numericRefinements = {};
                    partialState.numericRefinements[attr] = state.numericRefinements[attr];
                  }
                });
              } else {
                if (!isEmpty_1(state.numericRefinements)) {
                  partialState.numericRefinements = state.numericRefinements;
                }
                if (!isEmpty_1(state.facetsRefinements)) partialState.facetsRefinements = state.facetsRefinements;
                if (!isEmpty_1(state.disjunctiveFacetsRefinements)) {
                  partialState.disjunctiveFacetsRefinements = state.disjunctiveFacetsRefinements;
                }
                if (!isEmpty_1(state.hierarchicalFacetsRefinements)) {
                  partialState.hierarchicalFacetsRefinements = state.hierarchicalFacetsRefinements;
                }
              }

              var searchParameters = filter_1(
                filters,
                function(f) {
                  return f.indexOf('attribute:') === -1;
                }
              );

              forEach_1(
                searchParameters,
                function(parameterKey) {
                  partialState[parameterKey] = state[parameterKey];
                }
              );

              return partialState;
            }

            var filterState_1 = filterState;

            /**
             * Functions to manipulate refinement lists
             *
             * The RefinementList is not formally defined through a prototype but is based
             * on a specific structure.
             *
             * @module SearchParameters.refinementList
             *
             * @typedef {string[]} SearchParameters.refinementList.Refinements
             * @typedef {Object.<string, SearchParameters.refinementList.Refinements>} SearchParameters.refinementList.RefinementList
             */











            var lib = {
              /**
               * Adds a refinement to a RefinementList
               * @param {RefinementList} refinementList the initial list
               * @param {string} attribute the attribute to refine
               * @param {string} value the value of the refinement, if the value is not a string it will be converted
               * @return {RefinementList} a new and updated refinement list
               */
              addRefinement: function addRefinement(refinementList, attribute, value) {
                if (lib.isRefined(refinementList, attribute, value)) {
                  return refinementList;
                }

                var valueAsString = '' + value;

                var facetRefinement = !refinementList[attribute] ?
                  [valueAsString] :
                  refinementList[attribute].concat(valueAsString);

                var mod = {};

                mod[attribute] = facetRefinement;

                return defaults_1({}, mod, refinementList);
              },
              /**
               * Removes refinement(s) for an attribute:
               *  - if the value is specified removes the refinement for the value on the attribute
               *  - if no value is specified removes all the refinements for this attribute
               * @param {RefinementList} refinementList the initial list
               * @param {string} attribute the attribute to refine
               * @param {string} [value] the value of the refinement
               * @return {RefinementList} a new and updated refinement lst
               */
              removeRefinement: function removeRefinement(refinementList, attribute, value) {
                if (isUndefined_1(value)) {
                  return lib.clearRefinement(refinementList, attribute);
                }

                var valueAsString = '' + value;

                return lib.clearRefinement(refinementList, function(v, f) {
                  return attribute === f && valueAsString === v;
                });
              },
              /**
               * Toggles the refinement value for an attribute.
               * @param {RefinementList} refinementList the initial list
               * @param {string} attribute the attribute to refine
               * @param {string} value the value of the refinement
               * @return {RefinementList} a new and updated list
               */
              toggleRefinement: function toggleRefinement(refinementList, attribute, value) {
                if (isUndefined_1(value)) throw new Error('toggleRefinement should be used with a value');

                if (lib.isRefined(refinementList, attribute, value)) {
                  return lib.removeRefinement(refinementList, attribute, value);
                }

                return lib.addRefinement(refinementList, attribute, value);
              },
              /**
               * Clear all or parts of a RefinementList. Depending on the arguments, three
               * kinds of behavior can happen:
               *  - if no attribute is provided: clears the whole list
               *  - if an attribute is provided as a string: clears the list for the specific attribute
               *  - if an attribute is provided as a function: discards the elements for which the function returns true
               * @param {RefinementList} refinementList the initial list
               * @param {string} [attribute] the attribute or function to discard
               * @param {string} [refinementType] optional parameter to give more context to the attribute function
               * @return {RefinementList} a new and updated refinement list
               */
              clearRefinement: function clearRefinement(refinementList, attribute, refinementType) {
                if (isUndefined_1(attribute)) {
                  if (isEmpty_1(refinementList)) return refinementList;
                  return {};
                } else if (isString_1(attribute)) {
                  if (isEmpty_1(refinementList[attribute])) return refinementList;
                  return omit_1(refinementList, attribute);
                } else if (isFunction_1(attribute)) {
                  var hasChanged = false;

                  var newRefinementList = reduce_1(refinementList, function(memo, values, key) {
                    var facetList = filter_1(values, function(value) {
                      return !attribute(value, key, refinementType);
                    });

                    if (!isEmpty_1(facetList)) {
                      if (facetList.length !== values.length) hasChanged = true;
                      memo[key] = facetList;
                    }
                    else hasChanged = true;

                    return memo;
                  }, {});

                  if (hasChanged) return newRefinementList;
                  return refinementList;
                }
              },
              /**
               * Test if the refinement value is used for the attribute. If no refinement value
               * is provided, test if the refinementList contains any refinement for the
               * given attribute.
               * @param {RefinementList} refinementList the list of refinement
               * @param {string} attribute name of the attribute
               * @param {string} [refinementValue] value of the filter/refinement
               * @return {boolean}
               */
              isRefined: function isRefined(refinementList, attribute, refinementValue) {
                var indexOf = indexOf_1;

                var containsRefinements = !!refinementList[attribute] &&
                  refinementList[attribute].length > 0;

                if (isUndefined_1(refinementValue) || !containsRefinements) {
                  return containsRefinements;
                }

                var refinementValueAsString = '' + refinementValue;

                return indexOf(refinementList[attribute], refinementValueAsString) !== -1;
              }
            };

            var RefinementList = lib;

            /**
             * like _.find but using _.isEqual to be able to use it
             * to find arrays.
             * @private
             * @param {any[]} array array to search into
             * @param {any} searchedValue the value we're looking for
             * @return {any} the searched value or undefined
             */
            function findArray(array, searchedValue) {
              return find_1(array, function(currentValue) {
                return isEqual_1(currentValue, searchedValue);
              });
            }

            /**
             * The facet list is the structure used to store the list of values used to
             * filter a single attribute.
             * @typedef {string[]} SearchParameters.FacetList
             */

            /**
             * Structure to store numeric filters with the operator as the key. The supported operators
             * are `=`, `>`, `<`, `>=`, `<=` and `!=`.
             * @typedef {Object.<string, Array.<number|number[]>>} SearchParameters.OperatorList
             */

            /**
             * SearchParameters is the data structure that contains all the information
             * usable for making a search to Algolia API. It doesn't do the search itself,
             * nor does it contains logic about the parameters.
             * It is an immutable object, therefore it has been created in a way that each
             * changes does not change the object itself but returns a copy with the
             * modification.
             * This object should probably not be instantiated outside of the helper. It will
             * be provided when needed. This object is documented for reference as you'll
             * get it from events generated by the {@link AlgoliaSearchHelper}.
             * If need be, instantiate the Helper from the factory function {@link SearchParameters.make}
             * @constructor
             * @classdesc contains all the parameters of a search
             * @param {object|SearchParameters} newParameters existing parameters or partial object
             * for the properties of a new SearchParameters
             * @see SearchParameters.make
             * @example <caption>SearchParameters of the first query in
             *   <a href="http://demos.algolia.com/instant-search-demo/">the instant search demo</a></caption>
            {
               "query": "",
               "disjunctiveFacets": [
                  "customerReviewCount",
                  "category",
                  "salePrice_range",
                  "manufacturer"
              ],
               "maxValuesPerFacet": 30,
               "page": 0,
               "hitsPerPage": 10,
               "facets": [
                  "type",
                  "shipping"
              ]
            }
             */
            function SearchParameters(newParameters) {
              var params = newParameters ? SearchParameters._parseNumbers(newParameters) : {};

              /**
               * Targeted index. This parameter is mandatory.
               * @member {string}
               */
              this.index = params.index || '';

              // Query
              /**
               * Query string of the instant search. The empty string is a valid query.
               * @member {string}
               * @see https://www.algolia.com/doc/rest#param-query
               */
              this.query = params.query || '';

              // Facets
              /**
               * This attribute contains the list of all the conjunctive facets
               * used. This list will be added to requested facets in the
               * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
               * @member {string[]}
               */
              this.facets = params.facets || [];
              /**
               * This attribute contains the list of all the disjunctive facets
               * used. This list will be added to requested facets in the
               * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
               * @member {string[]}
               */
              this.disjunctiveFacets = params.disjunctiveFacets || [];
              /**
               * This attribute contains the list of all the hierarchical facets
               * used. This list will be added to requested facets in the
               * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
               * Hierarchical facets are a sub type of disjunctive facets that
               * let you filter faceted attributes hierarchically.
               * @member {string[]|object[]}
               */
              this.hierarchicalFacets = params.hierarchicalFacets || [];

              // Refinements
              /**
               * This attribute contains all the filters that need to be
               * applied on the conjunctive facets. Each facet must be properly
               * defined in the `facets` attribute.
               *
               * The key is the name of the facet, and the `FacetList` contains all
               * filters selected for the associated facet name.
               *
               * When querying algolia, the values stored in this attribute will
               * be translated into the `facetFilters` attribute.
               * @member {Object.<string, SearchParameters.FacetList>}
               */
              this.facetsRefinements = params.facetsRefinements || {};
              /**
               * This attribute contains all the filters that need to be
               * excluded from the conjunctive facets. Each facet must be properly
               * defined in the `facets` attribute.
               *
               * The key is the name of the facet, and the `FacetList` contains all
               * filters excluded for the associated facet name.
               *
               * When querying algolia, the values stored in this attribute will
               * be translated into the `facetFilters` attribute.
               * @member {Object.<string, SearchParameters.FacetList>}
               */
              this.facetsExcludes = params.facetsExcludes || {};
              /**
               * This attribute contains all the filters that need to be
               * applied on the disjunctive facets. Each facet must be properly
               * defined in the `disjunctiveFacets` attribute.
               *
               * The key is the name of the facet, and the `FacetList` contains all
               * filters selected for the associated facet name.
               *
               * When querying algolia, the values stored in this attribute will
               * be translated into the `facetFilters` attribute.
               * @member {Object.<string, SearchParameters.FacetList>}
               */
              this.disjunctiveFacetsRefinements = params.disjunctiveFacetsRefinements || {};
              /**
               * This attribute contains all the filters that need to be
               * applied on the numeric attributes.
               *
               * The key is the name of the attribute, and the value is the
               * filters to apply to this attribute.
               *
               * When querying algolia, the values stored in this attribute will
               * be translated into the `numericFilters` attribute.
               * @member {Object.<string, SearchParameters.OperatorList>}
               */
              this.numericRefinements = params.numericRefinements || {};
              /**
               * This attribute contains all the tags used to refine the query.
               *
               * When querying algolia, the values stored in this attribute will
               * be translated into the `tagFilters` attribute.
               * @member {string[]}
               */
              this.tagRefinements = params.tagRefinements || [];
              /**
               * This attribute contains all the filters that need to be
               * applied on the hierarchical facets. Each facet must be properly
               * defined in the `hierarchicalFacets` attribute.
               *
               * The key is the name of the facet, and the `FacetList` contains all
               * filters selected for the associated facet name. The FacetList values
               * are structured as a string that contain the values for each level
               * separated by the configured separator.
               *
               * When querying algolia, the values stored in this attribute will
               * be translated into the `facetFilters` attribute.
               * @member {Object.<string, SearchParameters.FacetList>}
               */
              this.hierarchicalFacetsRefinements = params.hierarchicalFacetsRefinements || {};

              /**
               * Contains the numeric filters in the raw format of the Algolia API. Setting
               * this parameter is not compatible with the usage of numeric filters methods.
               * @see https://www.algolia.com/doc/javascript#numericFilters
               * @member {string}
               */
              this.numericFilters = params.numericFilters;

              /**
               * Contains the tag filters in the raw format of the Algolia API. Setting this
               * parameter is not compatible with the of the add/remove/toggle methods of the
               * tag api.
               * @see https://www.algolia.com/doc/rest#param-tagFilters
               * @member {string}
               */
              this.tagFilters = params.tagFilters;

              /**
               * Contains the optional tag filters in the raw format of the Algolia API.
               * @see https://www.algolia.com/doc/rest#param-tagFilters
               * @member {string}
               */
              this.optionalTagFilters = params.optionalTagFilters;

              /**
               * Contains the optional facet filters in the raw format of the Algolia API.
               * @see https://www.algolia.com/doc/rest#param-tagFilters
               * @member {string}
               */
              this.optionalFacetFilters = params.optionalFacetFilters;


              // Misc. parameters
              /**
               * Number of hits to be returned by the search API
               * @member {number}
               * @see https://www.algolia.com/doc/rest#param-hitsPerPage
               */
              this.hitsPerPage = params.hitsPerPage;
              /**
               * Number of values for each faceted attribute
               * @member {number}
               * @see https://www.algolia.com/doc/rest#param-maxValuesPerFacet
               */
              this.maxValuesPerFacet = params.maxValuesPerFacet;
              /**
               * The current page number
               * @member {number}
               * @see https://www.algolia.com/doc/rest#param-page
               */
              this.page = params.page || 0;
              /**
               * How the query should be treated by the search engine.
               * Possible values: prefixAll, prefixLast, prefixNone
               * @see https://www.algolia.com/doc/rest#param-queryType
               * @member {string}
               */
              this.queryType = params.queryType;
              /**
               * How the typo tolerance behave in the search engine.
               * Possible values: true, false, min, strict
               * @see https://www.algolia.com/doc/rest#param-typoTolerance
               * @member {string}
               */
              this.typoTolerance = params.typoTolerance;

              /**
               * Number of characters to wait before doing one character replacement.
               * @see https://www.algolia.com/doc/rest#param-minWordSizefor1Typo
               * @member {number}
               */
              this.minWordSizefor1Typo = params.minWordSizefor1Typo;
              /**
               * Number of characters to wait before doing a second character replacement.
               * @see https://www.algolia.com/doc/rest#param-minWordSizefor2Typos
               * @member {number}
               */
              this.minWordSizefor2Typos = params.minWordSizefor2Typos;
              /**
               * Configure the precision of the proximity ranking criterion
               * @see https://www.algolia.com/doc/rest#param-minProximity
               */
              this.minProximity = params.minProximity;
              /**
               * Should the engine allow typos on numerics.
               * @see https://www.algolia.com/doc/rest#param-allowTyposOnNumericTokens
               * @member {boolean}
               */
              this.allowTyposOnNumericTokens = params.allowTyposOnNumericTokens;
              /**
               * Should the plurals be ignored
               * @see https://www.algolia.com/doc/rest#param-ignorePlurals
               * @member {boolean}
               */
              this.ignorePlurals = params.ignorePlurals;
              /**
               * Restrict which attribute is searched.
               * @see https://www.algolia.com/doc/rest#param-restrictSearchableAttributes
               * @member {string}
               */
              this.restrictSearchableAttributes = params.restrictSearchableAttributes;
              /**
               * Enable the advanced syntax.
               * @see https://www.algolia.com/doc/rest#param-advancedSyntax
               * @member {boolean}
               */
              this.advancedSyntax = params.advancedSyntax;
              /**
               * Enable the analytics
               * @see https://www.algolia.com/doc/rest#param-analytics
               * @member {boolean}
               */
              this.analytics = params.analytics;
              /**
               * Tag of the query in the analytics.
               * @see https://www.algolia.com/doc/rest#param-analyticsTags
               * @member {string}
               */
              this.analyticsTags = params.analyticsTags;
              /**
               * Enable the synonyms
               * @see https://www.algolia.com/doc/rest#param-synonyms
               * @member {boolean}
               */
              this.synonyms = params.synonyms;
              /**
               * Should the engine replace the synonyms in the highlighted results.
               * @see https://www.algolia.com/doc/rest#param-replaceSynonymsInHighlight
               * @member {boolean}
               */
              this.replaceSynonymsInHighlight = params.replaceSynonymsInHighlight;
              /**
               * Add some optional words to those defined in the dashboard
               * @see https://www.algolia.com/doc/rest#param-optionalWords
               * @member {string}
               */
              this.optionalWords = params.optionalWords;
              /**
               * Possible values are "lastWords" "firstWords" "allOptional" "none" (default)
               * @see https://www.algolia.com/doc/rest#param-removeWordsIfNoResults
               * @member {string}
               */
              this.removeWordsIfNoResults = params.removeWordsIfNoResults;
              /**
               * List of attributes to retrieve
               * @see https://www.algolia.com/doc/rest#param-attributesToRetrieve
               * @member {string}
               */
              this.attributesToRetrieve = params.attributesToRetrieve;
              /**
               * List of attributes to highlight
               * @see https://www.algolia.com/doc/rest#param-attributesToHighlight
               * @member {string}
               */
              this.attributesToHighlight = params.attributesToHighlight;
              /**
               * Code to be embedded on the left part of the highlighted results
               * @see https://www.algolia.com/doc/rest#param-highlightPreTag
               * @member {string}
               */
              this.highlightPreTag = params.highlightPreTag;
              /**
               * Code to be embedded on the right part of the highlighted results
               * @see https://www.algolia.com/doc/rest#param-highlightPostTag
               * @member {string}
               */
              this.highlightPostTag = params.highlightPostTag;
              /**
               * List of attributes to snippet
               * @see https://www.algolia.com/doc/rest#param-attributesToSnippet
               * @member {string}
               */
              this.attributesToSnippet = params.attributesToSnippet;
              /**
               * Enable the ranking informations in the response, set to 1 to activate
               * @see https://www.algolia.com/doc/rest#param-getRankingInfo
               * @member {number}
               */
              this.getRankingInfo = params.getRankingInfo;
              /**
               * Remove duplicates based on the index setting attributeForDistinct
               * @see https://www.algolia.com/doc/rest#param-distinct
               * @member {boolean|number}
               */
              this.distinct = params.distinct;
              /**
               * Center of the geo search.
               * @see https://www.algolia.com/doc/rest#param-aroundLatLng
               * @member {string}
               */
              this.aroundLatLng = params.aroundLatLng;
              /**
               * Center of the search, retrieve from the user IP.
               * @see https://www.algolia.com/doc/rest#param-aroundLatLngViaIP
               * @member {boolean}
               */
              this.aroundLatLngViaIP = params.aroundLatLngViaIP;
              /**
               * Radius of the geo search.
               * @see https://www.algolia.com/doc/rest#param-aroundRadius
               * @member {number}
               */
              this.aroundRadius = params.aroundRadius;
              /**
               * Precision of the geo search.
               * @see https://www.algolia.com/doc/rest#param-aroundPrecision
               * @member {number}
               */
              this.minimumAroundRadius = params.minimumAroundRadius;
              /**
               * Precision of the geo search.
               * @see https://www.algolia.com/doc/rest#param-minimumAroundRadius
               * @member {number}
               */
              this.aroundPrecision = params.aroundPrecision;
              /**
               * Geo search inside a box.
               * @see https://www.algolia.com/doc/rest#param-insideBoundingBox
               * @member {string}
               */
              this.insideBoundingBox = params.insideBoundingBox;
              /**
               * Geo search inside a polygon.
               * @see https://www.algolia.com/doc/rest#param-insidePolygon
               * @member {string}
               */
              this.insidePolygon = params.insidePolygon;
              /**
               * Allows to specify an ellipsis character for the snippet when we truncate the text
               * (added before and after if truncated).
               * The default value is an empty string and we recommend to set it to "…"
               * @see https://www.algolia.com/doc/rest#param-insidePolygon
               * @member {string}
               */
              this.snippetEllipsisText = params.snippetEllipsisText;
              /**
               * Allows to specify some attributes name on which exact won't be applied.
               * Attributes are separated with a comma (for example "name,address" ), you can also use a
               * JSON string array encoding (for example encodeURIComponent('["name","address"]') ).
               * By default the list is empty.
               * @see https://www.algolia.com/doc/rest#param-disableExactOnAttributes
               * @member {string|string[]}
               */
              this.disableExactOnAttributes = params.disableExactOnAttributes;
              /**
               * Applies 'exact' on single word queries if the word contains at least 3 characters
               * and is not a stop word.
               * Can take two values: true or false.
               * By default, its set to false.
               * @see https://www.algolia.com/doc/rest#param-enableExactOnSingleWordQuery
               * @member {boolean}
               */
              this.enableExactOnSingleWordQuery = params.enableExactOnSingleWordQuery;

              // Undocumented parameters, still needed otherwise we fail
              this.offset = params.offset;
              this.length = params.length;

              var self = this;
              forOwn_1(params, function checkForUnknownParameter(paramValue, paramName) {
                if (SearchParameters.PARAMETERS.indexOf(paramName) === -1) {
                  self[paramName] = paramValue;
                }
              });
            }

            /**
             * List all the properties in SearchParameters and therefore all the known Algolia properties
             * This doesn't contain any beta/hidden features.
             * @private
             */
            SearchParameters.PARAMETERS = keys_1(new SearchParameters());

            /**
             * @private
             * @param {object} partialState full or part of a state
             * @return {object} a new object with the number keys as number
             */
            SearchParameters._parseNumbers = function(partialState) {
              // Do not reparse numbers in SearchParameters, they ought to be parsed already
              if (partialState instanceof SearchParameters) return partialState;

              var numbers = {};

              var numberKeys = [
                'aroundPrecision',
                'aroundRadius',
                'getRankingInfo',
                'minWordSizefor2Typos',
                'minWordSizefor1Typo',
                'page',
                'maxValuesPerFacet',
                'distinct',
                'minimumAroundRadius',
                'hitsPerPage',
                'minProximity'
              ];

              forEach_1(numberKeys, function(k) {
                var value = partialState[k];
                if (isString_1(value)) {
                  var parsedValue = parseFloat(value);
                  numbers[k] = _isNaN(parsedValue) ? value : parsedValue;
                }
              });

              // there's two formats of insideBoundingBox, we need to parse
              // the one which is an array of float geo rectangles
              if (Array.isArray(partialState.insideBoundingBox)) {
                numbers.insideBoundingBox = partialState.insideBoundingBox.map(function(geoRect) {
                  return geoRect.map(function(value) {
                    return parseFloat(value);
                  });
                });
              }

              if (partialState.numericRefinements) {
                var numericRefinements = {};
                forEach_1(partialState.numericRefinements, function(operators, attribute) {
                  numericRefinements[attribute] = {};
                  forEach_1(operators, function(values, operator) {
                    var parsedValues = map_1(values, function(v) {
                      if (Array.isArray(v)) {
                        return map_1(v, function(vPrime) {
                          if (isString_1(vPrime)) {
                            return parseFloat(vPrime);
                          }
                          return vPrime;
                        });
                      } else if (isString_1(v)) {
                        return parseFloat(v);
                      }
                      return v;
                    });
                    numericRefinements[attribute][operator] = parsedValues;
                  });
                });
                numbers.numericRefinements = numericRefinements;
              }

              return merge_1({}, partialState, numbers);
            };

            /**
             * Factory for SearchParameters
             * @param {object|SearchParameters} newParameters existing parameters or partial
             * object for the properties of a new SearchParameters
             * @return {SearchParameters} frozen instance of SearchParameters
             */
            SearchParameters.make = function makeSearchParameters(newParameters) {
              var instance = new SearchParameters(newParameters);

              forEach_1(newParameters.hierarchicalFacets, function(facet) {
                if (facet.rootPath) {
                  var currentRefinement = instance.getHierarchicalRefinement(facet.name);

                  if (currentRefinement.length > 0 && currentRefinement[0].indexOf(facet.rootPath) !== 0) {
                    instance = instance.clearRefinements(facet.name);
                  }

                  // get it again in case it has been cleared
                  currentRefinement = instance.getHierarchicalRefinement(facet.name);
                  if (currentRefinement.length === 0) {
                    instance = instance.toggleHierarchicalFacetRefinement(facet.name, facet.rootPath);
                  }
                }
              });

              return instance;
            };

            /**
             * Validates the new parameters based on the previous state
             * @param {SearchParameters} currentState the current state
             * @param {object|SearchParameters} parameters the new parameters to set
             * @return {Error|null} Error if the modification is invalid, null otherwise
             */
            SearchParameters.validate = function(currentState, parameters) {
              var params = parameters || {};

              if (currentState.tagFilters && params.tagRefinements && params.tagRefinements.length > 0) {
                return new Error(
                  '[Tags] Cannot switch from the managed tag API to the advanced API. It is probably ' +
                  'an error, if it is really what you want, you should first clear the tags with clearTags method.');
              }

              if (currentState.tagRefinements.length > 0 && params.tagFilters) {
                return new Error(
                  '[Tags] Cannot switch from the advanced tag API to the managed API. It is probably ' +
                  'an error, if it is not, you should first clear the tags with clearTags method.');
              }

              if (currentState.numericFilters && params.numericRefinements && !isEmpty_1(params.numericRefinements)) {
                return new Error(
                  "[Numeric filters] Can't switch from the advanced to the managed API. It" +
                  ' is probably an error, if this is really what you want, you have to first' +
                  ' clear the numeric filters.');
              }

              if (!isEmpty_1(currentState.numericRefinements) && params.numericFilters) {
                return new Error(
                  "[Numeric filters] Can't switch from the managed API to the advanced. It" +
                  ' is probably an error, if this is really what you want, you have to first' +
                  ' clear the numeric filters.');
              }

              return null;
            };

            SearchParameters.prototype = {
              constructor: SearchParameters,

              /**
               * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
               * @method
               * @param {undefined|string|SearchParameters.clearCallback} [attribute] optional string or function
               * - If not given, means to clear all the filters.
               * - If `string`, means to clear all refinements for the `attribute` named filter.
               * - If `function`, means to clear all the refinements that return truthy values.
               * @return {SearchParameters}
               */
              clearRefinements: function clearRefinements(attribute) {
                var clear = RefinementList.clearRefinement;
                var patch = {
                  numericRefinements: this._clearNumericRefinements(attribute),
                  facetsRefinements: clear(this.facetsRefinements, attribute, 'conjunctiveFacet'),
                  facetsExcludes: clear(this.facetsExcludes, attribute, 'exclude'),
                  disjunctiveFacetsRefinements: clear(this.disjunctiveFacetsRefinements, attribute, 'disjunctiveFacet'),
                  hierarchicalFacetsRefinements: clear(this.hierarchicalFacetsRefinements, attribute, 'hierarchicalFacet')
                };
                if (patch.numericRefinements === this.numericRefinements &&
                    patch.facetsRefinements === this.facetsRefinements &&
                    patch.facetsExcludes === this.facetsExcludes &&
                    patch.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements &&
                    patch.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements) {
                  return this;
                }
                return this.setQueryParameters(patch);
              },
              /**
               * Remove all the refined tags from the SearchParameters
               * @method
               * @return {SearchParameters}
               */
              clearTags: function clearTags() {
                if (this.tagFilters === undefined && this.tagRefinements.length === 0) return this;

                return this.setQueryParameters({
                  tagFilters: undefined,
                  tagRefinements: []
                });
              },
              /**
               * Set the index.
               * @method
               * @param {string} index the index name
               * @return {SearchParameters}
               */
              setIndex: function setIndex(index) {
                if (index === this.index) return this;

                return this.setQueryParameters({
                  index: index
                });
              },
              /**
               * Query setter
               * @method
               * @param {string} newQuery value for the new query
               * @return {SearchParameters}
               */
              setQuery: function setQuery(newQuery) {
                if (newQuery === this.query) return this;

                return this.setQueryParameters({
                  query: newQuery
                });
              },
              /**
               * Page setter
               * @method
               * @param {number} newPage new page number
               * @return {SearchParameters}
               */
              setPage: function setPage(newPage) {
                if (newPage === this.page) return this;

                return this.setQueryParameters({
                  page: newPage
                });
              },
              /**
               * Facets setter
               * The facets are the simple facets, used for conjunctive (and) faceting.
               * @method
               * @param {string[]} facets all the attributes of the algolia records used for conjunctive faceting
               * @return {SearchParameters}
               */
              setFacets: function setFacets(facets) {
                return this.setQueryParameters({
                  facets: facets
                });
              },
              /**
               * Disjunctive facets setter
               * Change the list of disjunctive (or) facets the helper chan handle.
               * @method
               * @param {string[]} facets all the attributes of the algolia records used for disjunctive faceting
               * @return {SearchParameters}
               */
              setDisjunctiveFacets: function setDisjunctiveFacets(facets) {
                return this.setQueryParameters({
                  disjunctiveFacets: facets
                });
              },
              /**
               * HitsPerPage setter
               * Hits per page represents the number of hits retrieved for this query
               * @method
               * @param {number} n number of hits retrieved per page of results
               * @return {SearchParameters}
               */
              setHitsPerPage: function setHitsPerPage(n) {
                if (this.hitsPerPage === n) return this;

                return this.setQueryParameters({
                  hitsPerPage: n
                });
              },
              /**
               * typoTolerance setter
               * Set the value of typoTolerance
               * @method
               * @param {string} typoTolerance new value of typoTolerance ("true", "false", "min" or "strict")
               * @return {SearchParameters}
               */
              setTypoTolerance: function setTypoTolerance(typoTolerance) {
                if (this.typoTolerance === typoTolerance) return this;

                return this.setQueryParameters({
                  typoTolerance: typoTolerance
                });
              },
              /**
               * Add a numeric filter for a given attribute
               * When value is an array, they are combined with OR
               * When value is a single value, it will combined with AND
               * @method
               * @param {string} attribute attribute to set the filter on
               * @param {string} operator operator of the filter (possible values: =, >, >=, <, <=, !=)
               * @param {number | number[]} value value of the filter
               * @return {SearchParameters}
               * @example
               * // for price = 50 or 40
               * searchparameter.addNumericRefinement('price', '=', [50, 40]);
               * @example
               * // for size = 38 and 40
               * searchparameter.addNumericRefinement('size', '=', 38);
               * searchparameter.addNumericRefinement('size', '=', 40);
               */
              addNumericRefinement: function(attribute, operator, v) {
                var value = valToNumber_1(v);

                if (this.isNumericRefined(attribute, operator, value)) return this;

                var mod = merge_1({}, this.numericRefinements);

                mod[attribute] = merge_1({}, mod[attribute]);

                if (mod[attribute][operator]) {
                  // Array copy
                  mod[attribute][operator] = mod[attribute][operator].slice();
                  // Add the element. Concat can't be used here because value can be an array.
                  mod[attribute][operator].push(value);
                } else {
                  mod[attribute][operator] = [value];
                }

                return this.setQueryParameters({
                  numericRefinements: mod
                });
              },
              /**
               * Get the list of conjunctive refinements for a single facet
               * @param {string} facetName name of the attribute used for faceting
               * @return {string[]} list of refinements
               */
              getConjunctiveRefinements: function(facetName) {
                if (!this.isConjunctiveFacet(facetName)) {
                  throw new Error(facetName + ' is not defined in the facets attribute of the helper configuration');
                }
                return this.facetsRefinements[facetName] || [];
              },
              /**
               * Get the list of disjunctive refinements for a single facet
               * @param {string} facetName name of the attribute used for faceting
               * @return {string[]} list of refinements
               */
              getDisjunctiveRefinements: function(facetName) {
                if (!this.isDisjunctiveFacet(facetName)) {
                  throw new Error(
                    facetName + ' is not defined in the disjunctiveFacets attribute of the helper configuration'
                  );
                }
                return this.disjunctiveFacetsRefinements[facetName] || [];
              },
              /**
               * Get the list of hierarchical refinements for a single facet
               * @param {string} facetName name of the attribute used for faceting
               * @return {string[]} list of refinements
               */
              getHierarchicalRefinement: function(facetName) {
                // we send an array but we currently do not support multiple
                // hierarchicalRefinements for a hierarchicalFacet
                return this.hierarchicalFacetsRefinements[facetName] || [];
              },
              /**
               * Get the list of exclude refinements for a single facet
               * @param {string} facetName name of the attribute used for faceting
               * @return {string[]} list of refinements
               */
              getExcludeRefinements: function(facetName) {
                if (!this.isConjunctiveFacet(facetName)) {
                  throw new Error(facetName + ' is not defined in the facets attribute of the helper configuration');
                }
                return this.facetsExcludes[facetName] || [];
              },

              /**
               * Remove all the numeric filter for a given (attribute, operator)
               * @method
               * @param {string} attribute attribute to set the filter on
               * @param {string} [operator] operator of the filter (possible values: =, >, >=, <, <=, !=)
               * @param {number} [number] the value to be removed
               * @return {SearchParameters}
               */
              removeNumericRefinement: function(attribute, operator, paramValue) {
                if (paramValue !== undefined) {
                  var paramValueAsNumber = valToNumber_1(paramValue);
                  if (!this.isNumericRefined(attribute, operator, paramValueAsNumber)) return this;
                  return this.setQueryParameters({
                    numericRefinements: this._clearNumericRefinements(function(value, key) {
                      return key === attribute && value.op === operator && isEqual_1(value.val, paramValueAsNumber);
                    })
                  });
                } else if (operator !== undefined) {
                  if (!this.isNumericRefined(attribute, operator)) return this;
                  return this.setQueryParameters({
                    numericRefinements: this._clearNumericRefinements(function(value, key) {
                      return key === attribute && value.op === operator;
                    })
                  });
                }

                if (!this.isNumericRefined(attribute)) return this;
                return this.setQueryParameters({
                  numericRefinements: this._clearNumericRefinements(function(value, key) {
                    return key === attribute;
                  })
                });
              },
              /**
               * Get the list of numeric refinements for a single facet
               * @param {string} facetName name of the attribute used for faceting
               * @return {SearchParameters.OperatorList[]} list of refinements
               */
              getNumericRefinements: function(facetName) {
                return this.numericRefinements[facetName] || {};
              },
              /**
               * Return the current refinement for the (attribute, operator)
               * @param {string} attribute attribute in the record
               * @param {string} operator operator applied on the refined values
               * @return {Array.<number|number[]>} refined values
               */
              getNumericRefinement: function(attribute, operator) {
                return this.numericRefinements[attribute] && this.numericRefinements[attribute][operator];
              },
              /**
               * Clear numeric filters.
               * @method
               * @private
               * @param {string|SearchParameters.clearCallback} [attribute] optional string or function
               * - If not given, means to clear all the filters.
               * - If `string`, means to clear all refinements for the `attribute` named filter.
               * - If `function`, means to clear all the refinements that return truthy values.
               * @return {Object.<string, OperatorList>}
               */
              _clearNumericRefinements: function _clearNumericRefinements(attribute) {
                if (isUndefined_1(attribute)) {
                  if (isEmpty_1(this.numericRefinements)) return this.numericRefinements;
                  return {};
                } else if (isString_1(attribute)) {
                  if (isEmpty_1(this.numericRefinements[attribute])) return this.numericRefinements;
                  return omit_1(this.numericRefinements, attribute);
                } else if (isFunction_1(attribute)) {
                  var hasChanged = false;
                  var newNumericRefinements = reduce_1(this.numericRefinements, function(memo, operators, key) {
                    var operatorList = {};

                    forEach_1(operators, function(values, operator) {
                      var outValues = [];
                      forEach_1(values, function(value) {
                        var predicateResult = attribute({val: value, op: operator}, key, 'numeric');
                        if (!predicateResult) outValues.push(value);
                      });
                      if (!isEmpty_1(outValues)) {
                        if (outValues.length !== values.length) hasChanged = true;
                        operatorList[operator] = outValues;
                      }
                      else hasChanged = true;
                    });

                    if (!isEmpty_1(operatorList)) memo[key] = operatorList;

                    return memo;
                  }, {});

                  if (hasChanged) return newNumericRefinements;
                  return this.numericRefinements;
                }
              },
              /**
               * Add a facet to the facets attribute of the helper configuration, if it
               * isn't already present.
               * @method
               * @param {string} facet facet name to add
               * @return {SearchParameters}
               */
              addFacet: function addFacet(facet) {
                if (this.isConjunctiveFacet(facet)) {
                  return this;
                }

                return this.setQueryParameters({
                  facets: this.facets.concat([facet])
                });
              },
              /**
               * Add a disjunctive facet to the disjunctiveFacets attribute of the helper
               * configuration, if it isn't already present.
               * @method
               * @param {string} facet disjunctive facet name to add
               * @return {SearchParameters}
               */
              addDisjunctiveFacet: function addDisjunctiveFacet(facet) {
                if (this.isDisjunctiveFacet(facet)) {
                  return this;
                }

                return this.setQueryParameters({
                  disjunctiveFacets: this.disjunctiveFacets.concat([facet])
                });
              },
              /**
               * Add a hierarchical facet to the hierarchicalFacets attribute of the helper
               * configuration.
               * @method
               * @param {object} hierarchicalFacet hierarchical facet to add
               * @return {SearchParameters}
               * @throws will throw an error if a hierarchical facet with the same name was already declared
               */
              addHierarchicalFacet: function addHierarchicalFacet(hierarchicalFacet) {
                if (this.isHierarchicalFacet(hierarchicalFacet.name)) {
                  throw new Error(
                    'Cannot declare two hierarchical facets with the same name: `' + hierarchicalFacet.name + '`');
                }

                return this.setQueryParameters({
                  hierarchicalFacets: this.hierarchicalFacets.concat([hierarchicalFacet])
                });
              },
              /**
               * Add a refinement on a "normal" facet
               * @method
               * @param {string} facet attribute to apply the faceting on
               * @param {string} value value of the attribute (will be converted to string)
               * @return {SearchParameters}
               */
              addFacetRefinement: function addFacetRefinement(facet, value) {
                if (!this.isConjunctiveFacet(facet)) {
                  throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
                }
                if (RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

                return this.setQueryParameters({
                  facetsRefinements: RefinementList.addRefinement(this.facetsRefinements, facet, value)
                });
              },
              /**
               * Exclude a value from a "normal" facet
               * @method
               * @param {string} facet attribute to apply the exclusion on
               * @param {string} value value of the attribute (will be converted to string)
               * @return {SearchParameters}
               */
              addExcludeRefinement: function addExcludeRefinement(facet, value) {
                if (!this.isConjunctiveFacet(facet)) {
                  throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
                }
                if (RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

                return this.setQueryParameters({
                  facetsExcludes: RefinementList.addRefinement(this.facetsExcludes, facet, value)
                });
              },
              /**
               * Adds a refinement on a disjunctive facet.
               * @method
               * @param {string} facet attribute to apply the faceting on
               * @param {string} value value of the attribute (will be converted to string)
               * @return {SearchParameters}
               */
              addDisjunctiveFacetRefinement: function addDisjunctiveFacetRefinement(facet, value) {
                if (!this.isDisjunctiveFacet(facet)) {
                  throw new Error(
                    facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
                }

                if (RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

                return this.setQueryParameters({
                  disjunctiveFacetsRefinements: RefinementList.addRefinement(
                    this.disjunctiveFacetsRefinements, facet, value)
                });
              },
              /**
               * addTagRefinement adds a tag to the list used to filter the results
               * @param {string} tag tag to be added
               * @return {SearchParameters}
               */
              addTagRefinement: function addTagRefinement(tag) {
                if (this.isTagRefined(tag)) return this;

                var modification = {
                  tagRefinements: this.tagRefinements.concat(tag)
                };

                return this.setQueryParameters(modification);
              },
              /**
               * Remove a facet from the facets attribute of the helper configuration, if it
               * is present.
               * @method
               * @param {string} facet facet name to remove
               * @return {SearchParameters}
               */
              removeFacet: function removeFacet(facet) {
                if (!this.isConjunctiveFacet(facet)) {
                  return this;
                }

                return this.clearRefinements(facet).setQueryParameters({
                  facets: filter_1(this.facets, function(f) {
                    return f !== facet;
                  })
                });
              },
              /**
               * Remove a disjunctive facet from the disjunctiveFacets attribute of the
               * helper configuration, if it is present.
               * @method
               * @param {string} facet disjunctive facet name to remove
               * @return {SearchParameters}
               */
              removeDisjunctiveFacet: function removeDisjunctiveFacet(facet) {
                if (!this.isDisjunctiveFacet(facet)) {
                  return this;
                }

                return this.clearRefinements(facet).setQueryParameters({
                  disjunctiveFacets: filter_1(this.disjunctiveFacets, function(f) {
                    return f !== facet;
                  })
                });
              },
              /**
               * Remove a hierarchical facet from the hierarchicalFacets attribute of the
               * helper configuration, if it is present.
               * @method
               * @param {string} facet hierarchical facet name to remove
               * @return {SearchParameters}
               */
              removeHierarchicalFacet: function removeHierarchicalFacet(facet) {
                if (!this.isHierarchicalFacet(facet)) {
                  return this;
                }

                return this.clearRefinements(facet).setQueryParameters({
                  hierarchicalFacets: filter_1(this.hierarchicalFacets, function(f) {
                    return f.name !== facet;
                  })
                });
              },
              /**
               * Remove a refinement set on facet. If a value is provided, it will clear the
               * refinement for the given value, otherwise it will clear all the refinement
               * values for the faceted attribute.
               * @method
               * @param {string} facet name of the attribute used for faceting
               * @param {string} [value] value used to filter
               * @return {SearchParameters}
               */
              removeFacetRefinement: function removeFacetRefinement(facet, value) {
                if (!this.isConjunctiveFacet(facet)) {
                  throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
                }
                if (!RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

                return this.setQueryParameters({
                  facetsRefinements: RefinementList.removeRefinement(this.facetsRefinements, facet, value)
                });
              },
              /**
               * Remove a negative refinement on a facet
               * @method
               * @param {string} facet name of the attribute used for faceting
               * @param {string} value value used to filter
               * @return {SearchParameters}
               */
              removeExcludeRefinement: function removeExcludeRefinement(facet, value) {
                if (!this.isConjunctiveFacet(facet)) {
                  throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
                }
                if (!RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

                return this.setQueryParameters({
                  facetsExcludes: RefinementList.removeRefinement(this.facetsExcludes, facet, value)
                });
              },
              /**
               * Remove a refinement on a disjunctive facet
               * @method
               * @param {string} facet name of the attribute used for faceting
               * @param {string} value value used to filter
               * @return {SearchParameters}
               */
              removeDisjunctiveFacetRefinement: function removeDisjunctiveFacetRefinement(facet, value) {
                if (!this.isDisjunctiveFacet(facet)) {
                  throw new Error(
                    facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
                }
                if (!RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

                return this.setQueryParameters({
                  disjunctiveFacetsRefinements: RefinementList.removeRefinement(
                    this.disjunctiveFacetsRefinements, facet, value)
                });
              },
              /**
               * Remove a tag from the list of tag refinements
               * @method
               * @param {string} tag the tag to remove
               * @return {SearchParameters}
               */
              removeTagRefinement: function removeTagRefinement(tag) {
                if (!this.isTagRefined(tag)) return this;

                var modification = {
                  tagRefinements: filter_1(this.tagRefinements, function(t) { return t !== tag; })
                };

                return this.setQueryParameters(modification);
              },
              /**
               * Generic toggle refinement method to use with facet, disjunctive facets
               * and hierarchical facets
               * @param  {string} facet the facet to refine
               * @param  {string} value the associated value
               * @return {SearchParameters}
               * @throws will throw an error if the facet is not declared in the settings of the helper
               * @deprecated since version 2.19.0, see {@link SearchParameters#toggleFacetRefinement}
               */
              toggleRefinement: function toggleRefinement(facet, value) {
                return this.toggleFacetRefinement(facet, value);
              },
              /**
               * Generic toggle refinement method to use with facet, disjunctive facets
               * and hierarchical facets
               * @param  {string} facet the facet to refine
               * @param  {string} value the associated value
               * @return {SearchParameters}
               * @throws will throw an error if the facet is not declared in the settings of the helper
               */
              toggleFacetRefinement: function toggleFacetRefinement(facet, value) {
                if (this.isHierarchicalFacet(facet)) {
                  return this.toggleHierarchicalFacetRefinement(facet, value);
                } else if (this.isConjunctiveFacet(facet)) {
                  return this.toggleConjunctiveFacetRefinement(facet, value);
                } else if (this.isDisjunctiveFacet(facet)) {
                  return this.toggleDisjunctiveFacetRefinement(facet, value);
                }

                throw new Error('Cannot refine the undeclared facet ' + facet +
                  '; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets');
              },
              /**
               * Switch the refinement applied over a facet/value
               * @method
               * @param {string} facet name of the attribute used for faceting
               * @param {value} value value used for filtering
               * @return {SearchParameters}
               */
              toggleConjunctiveFacetRefinement: function toggleConjunctiveFacetRefinement(facet, value) {
                if (!this.isConjunctiveFacet(facet)) {
                  throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
                }

                return this.setQueryParameters({
                  facetsRefinements: RefinementList.toggleRefinement(this.facetsRefinements, facet, value)
                });
              },
              /**
               * Switch the refinement applied over a facet/value
               * @method
               * @param {string} facet name of the attribute used for faceting
               * @param {value} value value used for filtering
               * @return {SearchParameters}
               */
              toggleExcludeFacetRefinement: function toggleExcludeFacetRefinement(facet, value) {
                if (!this.isConjunctiveFacet(facet)) {
                  throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
                }

                return this.setQueryParameters({
                  facetsExcludes: RefinementList.toggleRefinement(this.facetsExcludes, facet, value)
                });
              },
              /**
               * Switch the refinement applied over a facet/value
               * @method
               * @param {string} facet name of the attribute used for faceting
               * @param {value} value value used for filtering
               * @return {SearchParameters}
               */
              toggleDisjunctiveFacetRefinement: function toggleDisjunctiveFacetRefinement(facet, value) {
                if (!this.isDisjunctiveFacet(facet)) {
                  throw new Error(
                    facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
                }

                return this.setQueryParameters({
                  disjunctiveFacetsRefinements: RefinementList.toggleRefinement(
                    this.disjunctiveFacetsRefinements, facet, value)
                });
              },
              /**
               * Switch the refinement applied over a facet/value
               * @method
               * @param {string} facet name of the attribute used for faceting
               * @param {value} value value used for filtering
               * @return {SearchParameters}
               */
              toggleHierarchicalFacetRefinement: function toggleHierarchicalFacetRefinement(facet, value) {
                if (!this.isHierarchicalFacet(facet)) {
                  throw new Error(
                    facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration');
                }

                var separator = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(facet));

                var mod = {};

                var upOneOrMultipleLevel = this.hierarchicalFacetsRefinements[facet] !== undefined &&
                  this.hierarchicalFacetsRefinements[facet].length > 0 && (
                  // remove current refinement:
                  // refinement was 'beer > IPA', call is toggleRefine('beer > IPA'), refinement should be `beer`
                  this.hierarchicalFacetsRefinements[facet][0] === value ||
                  // remove a parent refinement of the current refinement:
                  //  - refinement was 'beer > IPA > Flying dog'
                  //  - call is toggleRefine('beer > IPA')
                  //  - refinement should be `beer`
                  this.hierarchicalFacetsRefinements[facet][0].indexOf(value + separator) === 0
                );

                if (upOneOrMultipleLevel) {
                  if (value.indexOf(separator) === -1) {
                    // go back to root level
                    mod[facet] = [];
                  } else {
                    mod[facet] = [value.slice(0, value.lastIndexOf(separator))];
                  }
                } else {
                  mod[facet] = [value];
                }

                return this.setQueryParameters({
                  hierarchicalFacetsRefinements: defaults_1({}, mod, this.hierarchicalFacetsRefinements)
                });
              },

              /**
               * Adds a refinement on a hierarchical facet.
               * @param {string} facet the facet name
               * @param {string} path the hierarchical facet path
               * @return {SearchParameter} the new state
               * @throws Error if the facet is not defined or if the facet is refined
               */
              addHierarchicalFacetRefinement: function(facet, path) {
                if (this.isHierarchicalFacetRefined(facet)) {
                  throw new Error(facet + ' is already refined.');
                }
                var mod = {};
                mod[facet] = [path];
                return this.setQueryParameters({
                  hierarchicalFacetsRefinements: defaults_1({}, mod, this.hierarchicalFacetsRefinements)
                });
              },

              /**
               * Removes the refinement set on a hierarchical facet.
               * @param {string} facet the facet name
               * @return {SearchParameter} the new state
               * @throws Error if the facet is not defined or if the facet is not refined
               */
              removeHierarchicalFacetRefinement: function(facet) {
                if (!this.isHierarchicalFacetRefined(facet)) {
                  throw new Error(facet + ' is not refined.');
                }
                var mod = {};
                mod[facet] = [];
                return this.setQueryParameters({
                  hierarchicalFacetsRefinements: defaults_1({}, mod, this.hierarchicalFacetsRefinements)
                });
              },
              /**
               * Switch the tag refinement
               * @method
               * @param {string} tag the tag to remove or add
               * @return {SearchParameters}
               */
              toggleTagRefinement: function toggleTagRefinement(tag) {
                if (this.isTagRefined(tag)) {
                  return this.removeTagRefinement(tag);
                }

                return this.addTagRefinement(tag);
              },
              /**
               * Test if the facet name is from one of the disjunctive facets
               * @method
               * @param {string} facet facet name to test
               * @return {boolean}
               */
              isDisjunctiveFacet: function(facet) {
                return indexOf_1(this.disjunctiveFacets, facet) > -1;
              },
              /**
               * Test if the facet name is from one of the hierarchical facets
               * @method
               * @param {string} facetName facet name to test
               * @return {boolean}
               */
              isHierarchicalFacet: function(facetName) {
                return this.getHierarchicalFacetByName(facetName) !== undefined;
              },
              /**
               * Test if the facet name is from one of the conjunctive/normal facets
               * @method
               * @param {string} facet facet name to test
               * @return {boolean}
               */
              isConjunctiveFacet: function(facet) {
                return indexOf_1(this.facets, facet) > -1;
              },
              /**
               * Returns true if the facet is refined, either for a specific value or in
               * general.
               * @method
               * @param {string} facet name of the attribute for used for faceting
               * @param {string} value, optional value. If passed will test that this value
               * is filtering the given facet.
               * @return {boolean} returns true if refined
               */
              isFacetRefined: function isFacetRefined(facet, value) {
                if (!this.isConjunctiveFacet(facet)) {
                  throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
                }
                return RefinementList.isRefined(this.facetsRefinements, facet, value);
              },
              /**
               * Returns true if the facet contains exclusions or if a specific value is
               * excluded.
               *
               * @method
               * @param {string} facet name of the attribute for used for faceting
               * @param {string} [value] optional value. If passed will test that this value
               * is filtering the given facet.
               * @return {boolean} returns true if refined
               */
              isExcludeRefined: function isExcludeRefined(facet, value) {
                if (!this.isConjunctiveFacet(facet)) {
                  throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
                }
                return RefinementList.isRefined(this.facetsExcludes, facet, value);
              },
              /**
               * Returns true if the facet contains a refinement, or if a value passed is a
               * refinement for the facet.
               * @method
               * @param {string} facet name of the attribute for used for faceting
               * @param {string} value optional, will test if the value is used for refinement
               * if there is one, otherwise will test if the facet contains any refinement
               * @return {boolean}
               */
              isDisjunctiveFacetRefined: function isDisjunctiveFacetRefined(facet, value) {
                if (!this.isDisjunctiveFacet(facet)) {
                  throw new Error(
                    facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
                }
                return RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value);
              },
              /**
               * Returns true if the facet contains a refinement, or if a value passed is a
               * refinement for the facet.
               * @method
               * @param {string} facet name of the attribute for used for faceting
               * @param {string} value optional, will test if the value is used for refinement
               * if there is one, otherwise will test if the facet contains any refinement
               * @return {boolean}
               */
              isHierarchicalFacetRefined: function isHierarchicalFacetRefined(facet, value) {
                if (!this.isHierarchicalFacet(facet)) {
                  throw new Error(
                    facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration');
                }

                var refinements = this.getHierarchicalRefinement(facet);

                if (!value) {
                  return refinements.length > 0;
                }

                return indexOf_1(refinements, value) !== -1;
              },
              /**
               * Test if the triple (attribute, operator, value) is already refined.
               * If only the attribute and the operator are provided, it tests if the
               * contains any refinement value.
               * @method
               * @param {string} attribute attribute for which the refinement is applied
               * @param {string} [operator] operator of the refinement
               * @param {string} [value] value of the refinement
               * @return {boolean} true if it is refined
               */
              isNumericRefined: function isNumericRefined(attribute, operator, value) {
                if (isUndefined_1(value) && isUndefined_1(operator)) {
                  return !!this.numericRefinements[attribute];
                }

                var isOperatorDefined = this.numericRefinements[attribute] &&
                  !isUndefined_1(this.numericRefinements[attribute][operator]);

                if (isUndefined_1(value) || !isOperatorDefined) {
                  return isOperatorDefined;
                }

                var parsedValue = valToNumber_1(value);
                var isAttributeValueDefined = !isUndefined_1(
                  findArray(this.numericRefinements[attribute][operator], parsedValue)
                );

                return isOperatorDefined && isAttributeValueDefined;
              },
              /**
               * Returns true if the tag refined, false otherwise
               * @method
               * @param {string} tag the tag to check
               * @return {boolean}
               */
              isTagRefined: function isTagRefined(tag) {
                return indexOf_1(this.tagRefinements, tag) !== -1;
              },
              /**
               * Returns the list of all disjunctive facets refined
               * @method
               * @param {string} facet name of the attribute used for faceting
               * @param {value} value value used for filtering
               * @return {string[]}
               */
              getRefinedDisjunctiveFacets: function getRefinedDisjunctiveFacets() {
                // attributes used for numeric filter can also be disjunctive
                var disjunctiveNumericRefinedFacets = intersection_1(
                  keys_1(this.numericRefinements),
                  this.disjunctiveFacets
                );

                return keys_1(this.disjunctiveFacetsRefinements)
                  .concat(disjunctiveNumericRefinedFacets)
                  .concat(this.getRefinedHierarchicalFacets());
              },
              /**
               * Returns the list of all disjunctive facets refined
               * @method
               * @param {string} facet name of the attribute used for faceting
               * @param {value} value value used for filtering
               * @return {string[]}
               */
              getRefinedHierarchicalFacets: function getRefinedHierarchicalFacets() {
                return intersection_1(
                  // enforce the order between the two arrays,
                  // so that refinement name index === hierarchical facet index
                  map_1(this.hierarchicalFacets, 'name'),
                  keys_1(this.hierarchicalFacetsRefinements)
                );
              },
              /**
               * Returned the list of all disjunctive facets not refined
               * @method
               * @return {string[]}
               */
              getUnrefinedDisjunctiveFacets: function() {
                var refinedFacets = this.getRefinedDisjunctiveFacets();

                return filter_1(this.disjunctiveFacets, function(f) {
                  return indexOf_1(refinedFacets, f) === -1;
                });
              },

              managedParameters: [
                'index',
                'facets', 'disjunctiveFacets', 'facetsRefinements',
                'facetsExcludes', 'disjunctiveFacetsRefinements',
                'numericRefinements', 'tagRefinements', 'hierarchicalFacets', 'hierarchicalFacetsRefinements'
              ],
              getQueryParams: function getQueryParams() {
                var managedParameters = this.managedParameters;

                var queryParams = {};

                forOwn_1(this, function(paramValue, paramName) {
                  if (indexOf_1(managedParameters, paramName) === -1 && paramValue !== undefined) {
                    queryParams[paramName] = paramValue;
                  }
                });

                return queryParams;
              },
              /**
               * Let the user retrieve any parameter value from the SearchParameters
               * @param {string} paramName name of the parameter
               * @return {any} the value of the parameter
               */
              getQueryParameter: function getQueryParameter(paramName) {
                if (!this.hasOwnProperty(paramName)) {
                  throw new Error(
                    "Parameter '" + paramName + "' is not an attribute of SearchParameters " +
                    '(http://algolia.github.io/algoliasearch-helper-js/docs/SearchParameters.html)');
                }

                return this[paramName];
              },
              /**
               * Let the user set a specific value for a given parameter. Will return the
               * same instance if the parameter is invalid or if the value is the same as the
               * previous one.
               * @method
               * @param {string} parameter the parameter name
               * @param {any} value the value to be set, must be compliant with the definition
               * of the attribute on the object
               * @return {SearchParameters} the updated state
               */
              setQueryParameter: function setParameter(parameter, value) {
                if (this[parameter] === value) return this;

                var modification = {};

                modification[parameter] = value;

                return this.setQueryParameters(modification);
              },
              /**
               * Let the user set any of the parameters with a plain object.
               * @method
               * @param {object} params all the keys and the values to be updated
               * @return {SearchParameters} a new updated instance
               */
              setQueryParameters: function setQueryParameters(params) {
                if (!params) return this;

                var error = SearchParameters.validate(this, params);

                if (error) {
                  throw error;
                }

                var parsedParams = SearchParameters._parseNumbers(params);

                return this.mutateMe(function mergeWith(newInstance) {
                  var ks = keys_1(params);

                  forEach_1(ks, function(k) {
                    newInstance[k] = parsedParams[k];
                  });

                  return newInstance;
                });
              },

              /**
               * Returns an object with only the selected attributes.
               * @param {string[]} filters filters to retrieve only a subset of the state. It
               * accepts strings that can be either attributes of the SearchParameters (e.g. hitsPerPage)
               * or attributes of the index with the notation 'attribute:nameOfMyAttribute'
               * @return {object}
               */
              filter: function(filters) {
                return filterState_1(this, filters);
              },
              /**
               * Helper function to make it easier to build new instances from a mutating
               * function
               * @private
               * @param {function} fn newMutableState -> previousState -> () function that will
               * change the value of the newMutable to the desired state
               * @return {SearchParameters} a new instance with the specified modifications applied
               */
              mutateMe: function mutateMe(fn) {
                var newState = new this.constructor(this);

                fn(newState, this);
                return newState;
              },

              /**
               * Helper function to get the hierarchicalFacet separator or the default one (`>`)
               * @param  {object} hierarchicalFacet
               * @return {string} returns the hierarchicalFacet.separator or `>` as default
               */
              _getHierarchicalFacetSortBy: function(hierarchicalFacet) {
                return hierarchicalFacet.sortBy || ['isRefined:desc', 'name:asc'];
              },

              /**
               * Helper function to get the hierarchicalFacet separator or the default one (`>`)
               * @private
               * @param  {object} hierarchicalFacet
               * @return {string} returns the hierarchicalFacet.separator or `>` as default
               */
              _getHierarchicalFacetSeparator: function(hierarchicalFacet) {
                return hierarchicalFacet.separator || ' > ';
              },

              /**
               * Helper function to get the hierarchicalFacet prefix path or null
               * @private
               * @param  {object} hierarchicalFacet
               * @return {string} returns the hierarchicalFacet.rootPath or null as default
               */
              _getHierarchicalRootPath: function(hierarchicalFacet) {
                return hierarchicalFacet.rootPath || null;
              },

              /**
               * Helper function to check if we show the parent level of the hierarchicalFacet
               * @private
               * @param  {object} hierarchicalFacet
               * @return {string} returns the hierarchicalFacet.showParentLevel or true as default
               */
              _getHierarchicalShowParentLevel: function(hierarchicalFacet) {
                if (typeof hierarchicalFacet.showParentLevel === 'boolean') {
                  return hierarchicalFacet.showParentLevel;
                }
                return true;
              },

              /**
               * Helper function to get the hierarchicalFacet by it's name
               * @param  {string} hierarchicalFacetName
               * @return {object} a hierarchicalFacet
               */
              getHierarchicalFacetByName: function(hierarchicalFacetName) {
                return find_1(
                  this.hierarchicalFacets,
                  {name: hierarchicalFacetName}
                );
              },

              /**
               * Get the current breadcrumb for a hierarchical facet, as an array
               * @param  {string} facetName Hierarchical facet name
               * @return {array.<string>} the path as an array of string
               */
              getHierarchicalFacetBreadcrumb: function(facetName) {
                if (!this.isHierarchicalFacet(facetName)) {
                  throw new Error(
                    'Cannot get the breadcrumb of an unknown hierarchical facet: `' + facetName + '`');
                }

                var refinement = this.getHierarchicalRefinement(facetName)[0];
                if (!refinement) return [];

                var separator = this._getHierarchicalFacetSeparator(
                  this.getHierarchicalFacetByName(facetName)
                );
                var path = refinement.split(separator);
                return map_1(path, trim_1);
              },

              toString: function() {
                return JSON.stringify(this, null, 2);
              }
            };

            /**
             * Callback used for clearRefinement method
             * @callback SearchParameters.clearCallback
             * @param {OperatorList|FacetList} value the value of the filter
             * @param {string} key the current attribute name
             * @param {string} type `numeric`, `disjunctiveFacet`, `conjunctiveFacet`, `hierarchicalFacet` or `exclude`
             * depending on the type of facet
             * @return {boolean} `true` if the element should be removed. `false` otherwise.
             */
            var SearchParameters_1 = SearchParameters;

            /**
             * Creates an array with all falsey values removed. The values `false`, `null`,
             * `0`, `""`, `undefined`, and `NaN` are falsey.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Array
             * @param {Array} array The array to compact.
             * @returns {Array} Returns the new array of filtered values.
             * @example
             *
             * _.compact([0, 1, false, 2, '', 3]);
             * // => [1, 2, 3]
             */
            function compact(array) {
              var index = -1,
                  length = array == null ? 0 : array.length,
                  resIndex = 0,
                  result = [];

              while (++index < length) {
                var value = array[index];
                if (value) {
                  result[resIndex++] = value;
                }
              }
              return result;
            }

            var compact_1 = compact;

            /**
             * The base implementation of `_.sum` and `_.sumBy` without support for
             * iteratee shorthands.
             *
             * @private
             * @param {Array} array The array to iterate over.
             * @param {Function} iteratee The function invoked per iteration.
             * @returns {number} Returns the sum.
             */
            function baseSum(array, iteratee) {
              var result,
                  index = -1,
                  length = array.length;

              while (++index < length) {
                var current = iteratee(array[index]);
                if (current !== undefined) {
                  result = result === undefined ? current : (result + current);
                }
              }
              return result;
            }

            var _baseSum = baseSum;

            /**
             * This method is like `_.sum` except that it accepts `iteratee` which is
             * invoked for each element in `array` to generate the value to be summed.
             * The iteratee is invoked with one argument: (value).
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Math
             * @param {Array} array The array to iterate over.
             * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
             * @returns {number} Returns the sum.
             * @example
             *
             * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
             *
             * _.sumBy(objects, function(o) { return o.n; });
             * // => 20
             *
             * // The `_.property` iteratee shorthand.
             * _.sumBy(objects, 'n');
             * // => 20
             */
            function sumBy(array, iteratee) {
              return (array && array.length)
                ? _baseSum(array, _baseIteratee(iteratee, 2))
                : 0;
            }

            var sumBy_1 = sumBy;

            /**
             * The base implementation of `_.values` and `_.valuesIn` which creates an
             * array of `object` property values corresponding to the property names
             * of `props`.
             *
             * @private
             * @param {Object} object The object to query.
             * @param {Array} props The property names to get values for.
             * @returns {Object} Returns the array of property values.
             */
            function baseValues(object, props) {
              return _arrayMap(props, function(key) {
                return object[key];
              });
            }

            var _baseValues = baseValues;

            /**
             * Creates an array of the own enumerable string keyed property values of `object`.
             *
             * **Note:** Non-object values are coerced to objects.
             *
             * @static
             * @since 0.1.0
             * @memberOf _
             * @category Object
             * @param {Object} object The object to query.
             * @returns {Array} Returns the array of property values.
             * @example
             *
             * function Foo() {
             *   this.a = 1;
             *   this.b = 2;
             * }
             *
             * Foo.prototype.c = 3;
             *
             * _.values(new Foo);
             * // => [1, 2] (iteration order is not guaranteed)
             *
             * _.values('hi');
             * // => ['h', 'i']
             */
            function values(object) {
              return object == null ? [] : _baseValues(object, keys_1(object));
            }

            var values_1 = values;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMax$3 = Math.max;

            /**
             * Checks if `value` is in `collection`. If `collection` is a string, it's
             * checked for a substring of `value`, otherwise
             * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
             * is used for equality comparisons. If `fromIndex` is negative, it's used as
             * the offset from the end of `collection`.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Collection
             * @param {Array|Object|string} collection The collection to inspect.
             * @param {*} value The value to search for.
             * @param {number} [fromIndex=0] The index to search from.
             * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
             * @returns {boolean} Returns `true` if `value` is found, else `false`.
             * @example
             *
             * _.includes([1, 2, 3], 1);
             * // => true
             *
             * _.includes([1, 2, 3], 1, 2);
             * // => false
             *
             * _.includes({ 'a': 1, 'b': 2 }, 1);
             * // => true
             *
             * _.includes('abcd', 'bc');
             * // => true
             */
            function includes(collection, value, fromIndex, guard) {
              collection = isArrayLike_1(collection) ? collection : values_1(collection);
              fromIndex = (fromIndex && !guard) ? toInteger_1(fromIndex) : 0;

              var length = collection.length;
              if (fromIndex < 0) {
                fromIndex = nativeMax$3(length + fromIndex, 0);
              }
              return isString_1(collection)
                ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
                : (!!length && _baseIndexOf(collection, value, fromIndex) > -1);
            }

            var includes_1 = includes;

            /**
             * The base implementation of `_.sortBy` which uses `comparer` to define the
             * sort order of `array` and replaces criteria objects with their corresponding
             * values.
             *
             * @private
             * @param {Array} array The array to sort.
             * @param {Function} comparer The function to define sort order.
             * @returns {Array} Returns `array`.
             */
            function baseSortBy(array, comparer) {
              var length = array.length;

              array.sort(comparer);
              while (length--) {
                array[length] = array[length].value;
              }
              return array;
            }

            var _baseSortBy = baseSortBy;

            /**
             * Compares values to sort them in ascending order.
             *
             * @private
             * @param {*} value The value to compare.
             * @param {*} other The other value to compare.
             * @returns {number} Returns the sort order indicator for `value`.
             */
            function compareAscending(value, other) {
              if (value !== other) {
                var valIsDefined = value !== undefined,
                    valIsNull = value === null,
                    valIsReflexive = value === value,
                    valIsSymbol = isSymbol_1(value);

                var othIsDefined = other !== undefined,
                    othIsNull = other === null,
                    othIsReflexive = other === other,
                    othIsSymbol = isSymbol_1(other);

                if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
                    (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
                    (valIsNull && othIsDefined && othIsReflexive) ||
                    (!valIsDefined && othIsReflexive) ||
                    !valIsReflexive) {
                  return 1;
                }
                if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
                    (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
                    (othIsNull && valIsDefined && valIsReflexive) ||
                    (!othIsDefined && valIsReflexive) ||
                    !othIsReflexive) {
                  return -1;
                }
              }
              return 0;
            }

            var _compareAscending = compareAscending;

            /**
             * Used by `_.orderBy` to compare multiple properties of a value to another
             * and stable sort them.
             *
             * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
             * specify an order of "desc" for descending or "asc" for ascending sort order
             * of corresponding values.
             *
             * @private
             * @param {Object} object The object to compare.
             * @param {Object} other The other object to compare.
             * @param {boolean[]|string[]} orders The order to sort by for each property.
             * @returns {number} Returns the sort order indicator for `object`.
             */
            function compareMultiple(object, other, orders) {
              var index = -1,
                  objCriteria = object.criteria,
                  othCriteria = other.criteria,
                  length = objCriteria.length,
                  ordersLength = orders.length;

              while (++index < length) {
                var result = _compareAscending(objCriteria[index], othCriteria[index]);
                if (result) {
                  if (index >= ordersLength) {
                    return result;
                  }
                  var order = orders[index];
                  return result * (order == 'desc' ? -1 : 1);
                }
              }
              // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
              // that causes it, under certain circumstances, to provide the same value for
              // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
              // for more details.
              //
              // This also ensures a stable sort in V8 and other engines.
              // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
              return object.index - other.index;
            }

            var _compareMultiple = compareMultiple;

            /**
             * The base implementation of `_.orderBy` without param guards.
             *
             * @private
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
             * @param {string[]} orders The sort orders of `iteratees`.
             * @returns {Array} Returns the new sorted array.
             */
            function baseOrderBy(collection, iteratees, orders) {
              var index = -1;
              iteratees = _arrayMap(iteratees.length ? iteratees : [identity_1], _baseUnary(_baseIteratee));

              var result = _baseMap(collection, function(value, key, collection) {
                var criteria = _arrayMap(iteratees, function(iteratee) {
                  return iteratee(value);
                });
                return { 'criteria': criteria, 'index': ++index, 'value': value };
              });

              return _baseSortBy(result, function(object, other) {
                return _compareMultiple(object, other, orders);
              });
            }

            var _baseOrderBy = baseOrderBy;

            /**
             * This method is like `_.sortBy` except that it allows specifying the sort
             * orders of the iteratees to sort by. If `orders` is unspecified, all values
             * are sorted in ascending order. Otherwise, specify an order of "desc" for
             * descending or "asc" for ascending sort order of corresponding values.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Collection
             * @param {Array|Object} collection The collection to iterate over.
             * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
             *  The iteratees to sort by.
             * @param {string[]} [orders] The sort orders of `iteratees`.
             * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
             * @returns {Array} Returns the new sorted array.
             * @example
             *
             * var users = [
             *   { 'user': 'fred',   'age': 48 },
             *   { 'user': 'barney', 'age': 34 },
             *   { 'user': 'fred',   'age': 40 },
             *   { 'user': 'barney', 'age': 36 }
             * ];
             *
             * // Sort by `user` in ascending order and by `age` in descending order.
             * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
             * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
             */
            function orderBy(collection, iteratees, orders, guard) {
              if (collection == null) {
                return [];
              }
              if (!isArray_1(iteratees)) {
                iteratees = iteratees == null ? [] : [iteratees];
              }
              orders = guard ? undefined : orders;
              if (!isArray_1(orders)) {
                orders = orders == null ? [] : [orders];
              }
              return _baseOrderBy(collection, iteratees, orders);
            }

            var orderBy_1 = orderBy;

            /** Used to store function metadata. */
            var metaMap = _WeakMap && new _WeakMap;

            var _metaMap = metaMap;

            /**
             * The base implementation of `setData` without support for hot loop shorting.
             *
             * @private
             * @param {Function} func The function to associate metadata with.
             * @param {*} data The metadata.
             * @returns {Function} Returns `func`.
             */
            var baseSetData = !_metaMap ? identity_1 : function(func, data) {
              _metaMap.set(func, data);
              return func;
            };

            var _baseSetData = baseSetData;

            /**
             * Creates a function that produces an instance of `Ctor` regardless of
             * whether it was invoked as part of a `new` expression or by `call` or `apply`.
             *
             * @private
             * @param {Function} Ctor The constructor to wrap.
             * @returns {Function} Returns the new wrapped function.
             */
            function createCtor(Ctor) {
              return function() {
                // Use a `switch` statement to work with class constructors. See
                // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
                // for more details.
                var args = arguments;
                switch (args.length) {
                  case 0: return new Ctor;
                  case 1: return new Ctor(args[0]);
                  case 2: return new Ctor(args[0], args[1]);
                  case 3: return new Ctor(args[0], args[1], args[2]);
                  case 4: return new Ctor(args[0], args[1], args[2], args[3]);
                  case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                  case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                  case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                }
                var thisBinding = _baseCreate(Ctor.prototype),
                    result = Ctor.apply(thisBinding, args);

                // Mimic the constructor's `return` behavior.
                // See https://es5.github.io/#x13.2.2 for more details.
                return isObject_1(result) ? result : thisBinding;
              };
            }

            var _createCtor = createCtor;

            /** Used to compose bitmasks for function metadata. */
            var WRAP_BIND_FLAG = 1;

            /**
             * Creates a function that wraps `func` to invoke it with the optional `this`
             * binding of `thisArg`.
             *
             * @private
             * @param {Function} func The function to wrap.
             * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
             * @param {*} [thisArg] The `this` binding of `func`.
             * @returns {Function} Returns the new wrapped function.
             */
            function createBind(func, bitmask, thisArg) {
              var isBind = bitmask & WRAP_BIND_FLAG,
                  Ctor = _createCtor(func);

              function wrapper() {
                var fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;
                return fn.apply(isBind ? thisArg : this, arguments);
              }
              return wrapper;
            }

            var _createBind = createBind;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMax$4 = Math.max;

            /**
             * Creates an array that is the composition of partially applied arguments,
             * placeholders, and provided arguments into a single array of arguments.
             *
             * @private
             * @param {Array} args The provided arguments.
             * @param {Array} partials The arguments to prepend to those provided.
             * @param {Array} holders The `partials` placeholder indexes.
             * @params {boolean} [isCurried] Specify composing for a curried function.
             * @returns {Array} Returns the new array of composed arguments.
             */
            function composeArgs(args, partials, holders, isCurried) {
              var argsIndex = -1,
                  argsLength = args.length,
                  holdersLength = holders.length,
                  leftIndex = -1,
                  leftLength = partials.length,
                  rangeLength = nativeMax$4(argsLength - holdersLength, 0),
                  result = Array(leftLength + rangeLength),
                  isUncurried = !isCurried;

              while (++leftIndex < leftLength) {
                result[leftIndex] = partials[leftIndex];
              }
              while (++argsIndex < holdersLength) {
                if (isUncurried || argsIndex < argsLength) {
                  result[holders[argsIndex]] = args[argsIndex];
                }
              }
              while (rangeLength--) {
                result[leftIndex++] = args[argsIndex++];
              }
              return result;
            }

            var _composeArgs = composeArgs;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMax$5 = Math.max;

            /**
             * This function is like `composeArgs` except that the arguments composition
             * is tailored for `_.partialRight`.
             *
             * @private
             * @param {Array} args The provided arguments.
             * @param {Array} partials The arguments to append to those provided.
             * @param {Array} holders The `partials` placeholder indexes.
             * @params {boolean} [isCurried] Specify composing for a curried function.
             * @returns {Array} Returns the new array of composed arguments.
             */
            function composeArgsRight(args, partials, holders, isCurried) {
              var argsIndex = -1,
                  argsLength = args.length,
                  holdersIndex = -1,
                  holdersLength = holders.length,
                  rightIndex = -1,
                  rightLength = partials.length,
                  rangeLength = nativeMax$5(argsLength - holdersLength, 0),
                  result = Array(rangeLength + rightLength),
                  isUncurried = !isCurried;

              while (++argsIndex < rangeLength) {
                result[argsIndex] = args[argsIndex];
              }
              var offset = argsIndex;
              while (++rightIndex < rightLength) {
                result[offset + rightIndex] = partials[rightIndex];
              }
              while (++holdersIndex < holdersLength) {
                if (isUncurried || argsIndex < argsLength) {
                  result[offset + holders[holdersIndex]] = args[argsIndex++];
                }
              }
              return result;
            }

            var _composeArgsRight = composeArgsRight;

            /**
             * Gets the number of `placeholder` occurrences in `array`.
             *
             * @private
             * @param {Array} array The array to inspect.
             * @param {*} placeholder The placeholder to search for.
             * @returns {number} Returns the placeholder count.
             */
            function countHolders(array, placeholder) {
              var length = array.length,
                  result = 0;

              while (length--) {
                if (array[length] === placeholder) {
                  ++result;
                }
              }
              return result;
            }

            var _countHolders = countHolders;

            /**
             * The function whose prototype chain sequence wrappers inherit from.
             *
             * @private
             */
            function baseLodash() {
              // No operation performed.
            }

            var _baseLodash = baseLodash;

            /** Used as references for the maximum length and index of an array. */
            var MAX_ARRAY_LENGTH = 4294967295;

            /**
             * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
             *
             * @private
             * @constructor
             * @param {*} value The value to wrap.
             */
            function LazyWrapper(value) {
              this.__wrapped__ = value;
              this.__actions__ = [];
              this.__dir__ = 1;
              this.__filtered__ = false;
              this.__iteratees__ = [];
              this.__takeCount__ = MAX_ARRAY_LENGTH;
              this.__views__ = [];
            }

            // Ensure `LazyWrapper` is an instance of `baseLodash`.
            LazyWrapper.prototype = _baseCreate(_baseLodash.prototype);
            LazyWrapper.prototype.constructor = LazyWrapper;

            var _LazyWrapper = LazyWrapper;

            /**
             * This method returns `undefined`.
             *
             * @static
             * @memberOf _
             * @since 2.3.0
             * @category Util
             * @example
             *
             * _.times(2, _.noop);
             * // => [undefined, undefined]
             */
            function noop$1() {
              // No operation performed.
            }

            var noop_1 = noop$1;

            /**
             * Gets metadata for `func`.
             *
             * @private
             * @param {Function} func The function to query.
             * @returns {*} Returns the metadata for `func`.
             */
            var getData = !_metaMap ? noop_1 : function(func) {
              return _metaMap.get(func);
            };

            var _getData = getData;

            /** Used to lookup unminified function names. */
            var realNames = {};

            var _realNames = realNames;

            /** Used for built-in method references. */
            var objectProto$i = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$g = objectProto$i.hasOwnProperty;

            /**
             * Gets the name of `func`.
             *
             * @private
             * @param {Function} func The function to query.
             * @returns {string} Returns the function name.
             */
            function getFuncName(func) {
              var result = (func.name + ''),
                  array = _realNames[result],
                  length = hasOwnProperty$g.call(_realNames, result) ? array.length : 0;

              while (length--) {
                var data = array[length],
                    otherFunc = data.func;
                if (otherFunc == null || otherFunc == func) {
                  return data.name;
                }
              }
              return result;
            }

            var _getFuncName = getFuncName;

            /**
             * The base constructor for creating `lodash` wrapper objects.
             *
             * @private
             * @param {*} value The value to wrap.
             * @param {boolean} [chainAll] Enable explicit method chain sequences.
             */
            function LodashWrapper(value, chainAll) {
              this.__wrapped__ = value;
              this.__actions__ = [];
              this.__chain__ = !!chainAll;
              this.__index__ = 0;
              this.__values__ = undefined;
            }

            LodashWrapper.prototype = _baseCreate(_baseLodash.prototype);
            LodashWrapper.prototype.constructor = LodashWrapper;

            var _LodashWrapper = LodashWrapper;

            /**
             * Creates a clone of `wrapper`.
             *
             * @private
             * @param {Object} wrapper The wrapper to clone.
             * @returns {Object} Returns the cloned wrapper.
             */
            function wrapperClone(wrapper) {
              if (wrapper instanceof _LazyWrapper) {
                return wrapper.clone();
              }
              var result = new _LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
              result.__actions__ = _copyArray(wrapper.__actions__);
              result.__index__  = wrapper.__index__;
              result.__values__ = wrapper.__values__;
              return result;
            }

            var _wrapperClone = wrapperClone;

            /** Used for built-in method references. */
            var objectProto$j = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$h = objectProto$j.hasOwnProperty;

            /**
             * Creates a `lodash` object which wraps `value` to enable implicit method
             * chain sequences. Methods that operate on and return arrays, collections,
             * and functions can be chained together. Methods that retrieve a single value
             * or may return a primitive value will automatically end the chain sequence
             * and return the unwrapped value. Otherwise, the value must be unwrapped
             * with `_#value`.
             *
             * Explicit chain sequences, which must be unwrapped with `_#value`, may be
             * enabled using `_.chain`.
             *
             * The execution of chained methods is lazy, that is, it's deferred until
             * `_#value` is implicitly or explicitly called.
             *
             * Lazy evaluation allows several methods to support shortcut fusion.
             * Shortcut fusion is an optimization to merge iteratee calls; this avoids
             * the creation of intermediate arrays and can greatly reduce the number of
             * iteratee executions. Sections of a chain sequence qualify for shortcut
             * fusion if the section is applied to an array and iteratees accept only
             * one argument. The heuristic for whether a section qualifies for shortcut
             * fusion is subject to change.
             *
             * Chaining is supported in custom builds as long as the `_#value` method is
             * directly or indirectly included in the build.
             *
             * In addition to lodash methods, wrappers have `Array` and `String` methods.
             *
             * The wrapper `Array` methods are:
             * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
             *
             * The wrapper `String` methods are:
             * `replace` and `split`
             *
             * The wrapper methods that support shortcut fusion are:
             * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
             * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
             * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
             *
             * The chainable wrapper methods are:
             * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
             * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
             * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
             * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
             * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
             * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
             * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
             * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
             * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
             * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
             * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
             * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
             * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
             * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
             * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
             * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
             * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
             * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
             * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
             * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
             * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
             * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
             * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
             * `zipObject`, `zipObjectDeep`, and `zipWith`
             *
             * The wrapper methods that are **not** chainable by default are:
             * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
             * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
             * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
             * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
             * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
             * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
             * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
             * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
             * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
             * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
             * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
             * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
             * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
             * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
             * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
             * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
             * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
             * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
             * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
             * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
             * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
             * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
             * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
             * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
             * `upperFirst`, `value`, and `words`
             *
             * @name _
             * @constructor
             * @category Seq
             * @param {*} value The value to wrap in a `lodash` instance.
             * @returns {Object} Returns the new `lodash` wrapper instance.
             * @example
             *
             * function square(n) {
             *   return n * n;
             * }
             *
             * var wrapped = _([1, 2, 3]);
             *
             * // Returns an unwrapped value.
             * wrapped.reduce(_.add);
             * // => 6
             *
             * // Returns a wrapped value.
             * var squares = wrapped.map(square);
             *
             * _.isArray(squares);
             * // => false
             *
             * _.isArray(squares.value());
             * // => true
             */
            function lodash(value) {
              if (isObjectLike_1(value) && !isArray_1(value) && !(value instanceof _LazyWrapper)) {
                if (value instanceof _LodashWrapper) {
                  return value;
                }
                if (hasOwnProperty$h.call(value, '__wrapped__')) {
                  return _wrapperClone(value);
                }
              }
              return new _LodashWrapper(value);
            }

            // Ensure wrappers are instances of `baseLodash`.
            lodash.prototype = _baseLodash.prototype;
            lodash.prototype.constructor = lodash;

            var wrapperLodash = lodash;

            /**
             * Checks if `func` has a lazy counterpart.
             *
             * @private
             * @param {Function} func The function to check.
             * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
             *  else `false`.
             */
            function isLaziable(func) {
              var funcName = _getFuncName(func),
                  other = wrapperLodash[funcName];

              if (typeof other != 'function' || !(funcName in _LazyWrapper.prototype)) {
                return false;
              }
              if (func === other) {
                return true;
              }
              var data = _getData(other);
              return !!data && func === data[0];
            }

            var _isLaziable = isLaziable;

            /**
             * Sets metadata for `func`.
             *
             * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
             * period of time, it will trip its breaker and transition to an identity
             * function to avoid garbage collection pauses in V8. See
             * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
             * for more details.
             *
             * @private
             * @param {Function} func The function to associate metadata with.
             * @param {*} data The metadata.
             * @returns {Function} Returns `func`.
             */
            var setData = _shortOut(_baseSetData);

            var _setData = setData;

            /** Used to match wrap detail comments. */
            var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
                reSplitDetails = /,? & /;

            /**
             * Extracts wrapper details from the `source` body comment.
             *
             * @private
             * @param {string} source The source to inspect.
             * @returns {Array} Returns the wrapper details.
             */
            function getWrapDetails(source) {
              var match = source.match(reWrapDetails);
              return match ? match[1].split(reSplitDetails) : [];
            }

            var _getWrapDetails = getWrapDetails;

            /** Used to match wrap detail comments. */
            var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

            /**
             * Inserts wrapper `details` in a comment at the top of the `source` body.
             *
             * @private
             * @param {string} source The source to modify.
             * @returns {Array} details The details to insert.
             * @returns {string} Returns the modified source.
             */
            function insertWrapDetails(source, details) {
              var length = details.length;
              if (!length) {
                return source;
              }
              var lastIndex = length - 1;
              details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
              details = details.join(length > 2 ? ', ' : ' ');
              return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
            }

            var _insertWrapDetails = insertWrapDetails;

            /** Used to compose bitmasks for function metadata. */
            var WRAP_BIND_FLAG$1 = 1,
                WRAP_BIND_KEY_FLAG = 2,
                WRAP_CURRY_FLAG = 8,
                WRAP_CURRY_RIGHT_FLAG = 16,
                WRAP_PARTIAL_FLAG = 32,
                WRAP_PARTIAL_RIGHT_FLAG = 64,
                WRAP_ARY_FLAG = 128,
                WRAP_REARG_FLAG = 256,
                WRAP_FLIP_FLAG = 512;

            /** Used to associate wrap methods with their bit flags. */
            var wrapFlags = [
              ['ary', WRAP_ARY_FLAG],
              ['bind', WRAP_BIND_FLAG$1],
              ['bindKey', WRAP_BIND_KEY_FLAG],
              ['curry', WRAP_CURRY_FLAG],
              ['curryRight', WRAP_CURRY_RIGHT_FLAG],
              ['flip', WRAP_FLIP_FLAG],
              ['partial', WRAP_PARTIAL_FLAG],
              ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
              ['rearg', WRAP_REARG_FLAG]
            ];

            /**
             * Updates wrapper `details` based on `bitmask` flags.
             *
             * @private
             * @returns {Array} details The details to modify.
             * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
             * @returns {Array} Returns `details`.
             */
            function updateWrapDetails(details, bitmask) {
              _arrayEach(wrapFlags, function(pair) {
                var value = '_.' + pair[0];
                if ((bitmask & pair[1]) && !_arrayIncludes(details, value)) {
                  details.push(value);
                }
              });
              return details.sort();
            }

            var _updateWrapDetails = updateWrapDetails;

            /**
             * Sets the `toString` method of `wrapper` to mimic the source of `reference`
             * with wrapper details in a comment at the top of the source body.
             *
             * @private
             * @param {Function} wrapper The function to modify.
             * @param {Function} reference The reference function.
             * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
             * @returns {Function} Returns `wrapper`.
             */
            function setWrapToString(wrapper, reference, bitmask) {
              var source = (reference + '');
              return _setToString(wrapper, _insertWrapDetails(source, _updateWrapDetails(_getWrapDetails(source), bitmask)));
            }

            var _setWrapToString = setWrapToString;

            /** Used to compose bitmasks for function metadata. */
            var WRAP_BIND_FLAG$2 = 1,
                WRAP_BIND_KEY_FLAG$1 = 2,
                WRAP_CURRY_BOUND_FLAG = 4,
                WRAP_CURRY_FLAG$1 = 8,
                WRAP_PARTIAL_FLAG$1 = 32,
                WRAP_PARTIAL_RIGHT_FLAG$1 = 64;

            /**
             * Creates a function that wraps `func` to continue currying.
             *
             * @private
             * @param {Function} func The function to wrap.
             * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
             * @param {Function} wrapFunc The function to create the `func` wrapper.
             * @param {*} placeholder The placeholder value.
             * @param {*} [thisArg] The `this` binding of `func`.
             * @param {Array} [partials] The arguments to prepend to those provided to
             *  the new function.
             * @param {Array} [holders] The `partials` placeholder indexes.
             * @param {Array} [argPos] The argument positions of the new function.
             * @param {number} [ary] The arity cap of `func`.
             * @param {number} [arity] The arity of `func`.
             * @returns {Function} Returns the new wrapped function.
             */
            function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
              var isCurry = bitmask & WRAP_CURRY_FLAG$1,
                  newHolders = isCurry ? holders : undefined,
                  newHoldersRight = isCurry ? undefined : holders,
                  newPartials = isCurry ? partials : undefined,
                  newPartialsRight = isCurry ? undefined : partials;

              bitmask |= (isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1);
              bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);

              if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
                bitmask &= ~(WRAP_BIND_FLAG$2 | WRAP_BIND_KEY_FLAG$1);
              }
              var newData = [
                func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
                newHoldersRight, argPos, ary, arity
              ];

              var result = wrapFunc.apply(undefined, newData);
              if (_isLaziable(func)) {
                _setData(result, newData);
              }
              result.placeholder = placeholder;
              return _setWrapToString(result, func, bitmask);
            }

            var _createRecurry = createRecurry;

            /**
             * Gets the argument placeholder value for `func`.
             *
             * @private
             * @param {Function} func The function to inspect.
             * @returns {*} Returns the placeholder value.
             */
            function getHolder(func) {
              var object = func;
              return object.placeholder;
            }

            var _getHolder = getHolder;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMin$1 = Math.min;

            /**
             * Reorder `array` according to the specified indexes where the element at
             * the first index is assigned as the first element, the element at
             * the second index is assigned as the second element, and so on.
             *
             * @private
             * @param {Array} array The array to reorder.
             * @param {Array} indexes The arranged array indexes.
             * @returns {Array} Returns `array`.
             */
            function reorder(array, indexes) {
              var arrLength = array.length,
                  length = nativeMin$1(indexes.length, arrLength),
                  oldArray = _copyArray(array);

              while (length--) {
                var index = indexes[length];
                array[length] = _isIndex(index, arrLength) ? oldArray[index] : undefined;
              }
              return array;
            }

            var _reorder = reorder;

            /** Used as the internal argument placeholder. */
            var PLACEHOLDER = '__lodash_placeholder__';

            /**
             * Replaces all `placeholder` elements in `array` with an internal placeholder
             * and returns an array of their indexes.
             *
             * @private
             * @param {Array} array The array to modify.
             * @param {*} placeholder The placeholder to replace.
             * @returns {Array} Returns the new array of placeholder indexes.
             */
            function replaceHolders(array, placeholder) {
              var index = -1,
                  length = array.length,
                  resIndex = 0,
                  result = [];

              while (++index < length) {
                var value = array[index];
                if (value === placeholder || value === PLACEHOLDER) {
                  array[index] = PLACEHOLDER;
                  result[resIndex++] = index;
                }
              }
              return result;
            }

            var _replaceHolders = replaceHolders;

            /** Used to compose bitmasks for function metadata. */
            var WRAP_BIND_FLAG$3 = 1,
                WRAP_BIND_KEY_FLAG$2 = 2,
                WRAP_CURRY_FLAG$2 = 8,
                WRAP_CURRY_RIGHT_FLAG$1 = 16,
                WRAP_ARY_FLAG$1 = 128,
                WRAP_FLIP_FLAG$1 = 512;

            /**
             * Creates a function that wraps `func` to invoke it with optional `this`
             * binding of `thisArg`, partial application, and currying.
             *
             * @private
             * @param {Function|string} func The function or method name to wrap.
             * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
             * @param {*} [thisArg] The `this` binding of `func`.
             * @param {Array} [partials] The arguments to prepend to those provided to
             *  the new function.
             * @param {Array} [holders] The `partials` placeholder indexes.
             * @param {Array} [partialsRight] The arguments to append to those provided
             *  to the new function.
             * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
             * @param {Array} [argPos] The argument positions of the new function.
             * @param {number} [ary] The arity cap of `func`.
             * @param {number} [arity] The arity of `func`.
             * @returns {Function} Returns the new wrapped function.
             */
            function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
              var isAry = bitmask & WRAP_ARY_FLAG$1,
                  isBind = bitmask & WRAP_BIND_FLAG$3,
                  isBindKey = bitmask & WRAP_BIND_KEY_FLAG$2,
                  isCurried = bitmask & (WRAP_CURRY_FLAG$2 | WRAP_CURRY_RIGHT_FLAG$1),
                  isFlip = bitmask & WRAP_FLIP_FLAG$1,
                  Ctor = isBindKey ? undefined : _createCtor(func);

              function wrapper() {
                var length = arguments.length,
                    args = Array(length),
                    index = length;

                while (index--) {
                  args[index] = arguments[index];
                }
                if (isCurried) {
                  var placeholder = _getHolder(wrapper),
                      holdersCount = _countHolders(args, placeholder);
                }
                if (partials) {
                  args = _composeArgs(args, partials, holders, isCurried);
                }
                if (partialsRight) {
                  args = _composeArgsRight(args, partialsRight, holdersRight, isCurried);
                }
                length -= holdersCount;
                if (isCurried && length < arity) {
                  var newHolders = _replaceHolders(args, placeholder);
                  return _createRecurry(
                    func, bitmask, createHybrid, wrapper.placeholder, thisArg,
                    args, newHolders, argPos, ary, arity - length
                  );
                }
                var thisBinding = isBind ? thisArg : this,
                    fn = isBindKey ? thisBinding[func] : func;

                length = args.length;
                if (argPos) {
                  args = _reorder(args, argPos);
                } else if (isFlip && length > 1) {
                  args.reverse();
                }
                if (isAry && ary < length) {
                  args.length = ary;
                }
                if (this && this !== _root && this instanceof wrapper) {
                  fn = Ctor || _createCtor(fn);
                }
                return fn.apply(thisBinding, args);
              }
              return wrapper;
            }

            var _createHybrid = createHybrid;

            /**
             * Creates a function that wraps `func` to enable currying.
             *
             * @private
             * @param {Function} func The function to wrap.
             * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
             * @param {number} arity The arity of `func`.
             * @returns {Function} Returns the new wrapped function.
             */
            function createCurry(func, bitmask, arity) {
              var Ctor = _createCtor(func);

              function wrapper() {
                var length = arguments.length,
                    args = Array(length),
                    index = length,
                    placeholder = _getHolder(wrapper);

                while (index--) {
                  args[index] = arguments[index];
                }
                var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
                  ? []
                  : _replaceHolders(args, placeholder);

                length -= holders.length;
                if (length < arity) {
                  return _createRecurry(
                    func, bitmask, _createHybrid, wrapper.placeholder, undefined,
                    args, holders, undefined, undefined, arity - length);
                }
                var fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;
                return _apply(fn, this, args);
              }
              return wrapper;
            }

            var _createCurry = createCurry;

            /** Used to compose bitmasks for function metadata. */
            var WRAP_BIND_FLAG$4 = 1;

            /**
             * Creates a function that wraps `func` to invoke it with the `this` binding
             * of `thisArg` and `partials` prepended to the arguments it receives.
             *
             * @private
             * @param {Function} func The function to wrap.
             * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
             * @param {*} thisArg The `this` binding of `func`.
             * @param {Array} partials The arguments to prepend to those provided to
             *  the new function.
             * @returns {Function} Returns the new wrapped function.
             */
            function createPartial(func, bitmask, thisArg, partials) {
              var isBind = bitmask & WRAP_BIND_FLAG$4,
                  Ctor = _createCtor(func);

              function wrapper() {
                var argsIndex = -1,
                    argsLength = arguments.length,
                    leftIndex = -1,
                    leftLength = partials.length,
                    args = Array(leftLength + argsLength),
                    fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;

                while (++leftIndex < leftLength) {
                  args[leftIndex] = partials[leftIndex];
                }
                while (argsLength--) {
                  args[leftIndex++] = arguments[++argsIndex];
                }
                return _apply(fn, isBind ? thisArg : this, args);
              }
              return wrapper;
            }

            var _createPartial = createPartial;

            /** Used as the internal argument placeholder. */
            var PLACEHOLDER$1 = '__lodash_placeholder__';

            /** Used to compose bitmasks for function metadata. */
            var WRAP_BIND_FLAG$5 = 1,
                WRAP_BIND_KEY_FLAG$3 = 2,
                WRAP_CURRY_BOUND_FLAG$1 = 4,
                WRAP_CURRY_FLAG$3 = 8,
                WRAP_ARY_FLAG$2 = 128,
                WRAP_REARG_FLAG$1 = 256;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMin$2 = Math.min;

            /**
             * Merges the function metadata of `source` into `data`.
             *
             * Merging metadata reduces the number of wrappers used to invoke a function.
             * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
             * may be applied regardless of execution order. Methods like `_.ary` and
             * `_.rearg` modify function arguments, making the order in which they are
             * executed important, preventing the merging of metadata. However, we make
             * an exception for a safe combined case where curried functions have `_.ary`
             * and or `_.rearg` applied.
             *
             * @private
             * @param {Array} data The destination metadata.
             * @param {Array} source The source metadata.
             * @returns {Array} Returns `data`.
             */
            function mergeData(data, source) {
              var bitmask = data[1],
                  srcBitmask = source[1],
                  newBitmask = bitmask | srcBitmask,
                  isCommon = newBitmask < (WRAP_BIND_FLAG$5 | WRAP_BIND_KEY_FLAG$3 | WRAP_ARY_FLAG$2);

              var isCombo =
                ((srcBitmask == WRAP_ARY_FLAG$2) && (bitmask == WRAP_CURRY_FLAG$3)) ||
                ((srcBitmask == WRAP_ARY_FLAG$2) && (bitmask == WRAP_REARG_FLAG$1) && (data[7].length <= source[8])) ||
                ((srcBitmask == (WRAP_ARY_FLAG$2 | WRAP_REARG_FLAG$1)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG$3));

              // Exit early if metadata can't be merged.
              if (!(isCommon || isCombo)) {
                return data;
              }
              // Use source `thisArg` if available.
              if (srcBitmask & WRAP_BIND_FLAG$5) {
                data[2] = source[2];
                // Set when currying a bound function.
                newBitmask |= bitmask & WRAP_BIND_FLAG$5 ? 0 : WRAP_CURRY_BOUND_FLAG$1;
              }
              // Compose partial arguments.
              var value = source[3];
              if (value) {
                var partials = data[3];
                data[3] = partials ? _composeArgs(partials, value, source[4]) : value;
                data[4] = partials ? _replaceHolders(data[3], PLACEHOLDER$1) : source[4];
              }
              // Compose partial right arguments.
              value = source[5];
              if (value) {
                partials = data[5];
                data[5] = partials ? _composeArgsRight(partials, value, source[6]) : value;
                data[6] = partials ? _replaceHolders(data[5], PLACEHOLDER$1) : source[6];
              }
              // Use source `argPos` if available.
              value = source[7];
              if (value) {
                data[7] = value;
              }
              // Use source `ary` if it's smaller.
              if (srcBitmask & WRAP_ARY_FLAG$2) {
                data[8] = data[8] == null ? source[8] : nativeMin$2(data[8], source[8]);
              }
              // Use source `arity` if one is not provided.
              if (data[9] == null) {
                data[9] = source[9];
              }
              // Use source `func` and merge bitmasks.
              data[0] = source[0];
              data[1] = newBitmask;

              return data;
            }

            var _mergeData = mergeData;

            /** Error message constants. */
            var FUNC_ERROR_TEXT$1 = 'Expected a function';

            /** Used to compose bitmasks for function metadata. */
            var WRAP_BIND_FLAG$6 = 1,
                WRAP_BIND_KEY_FLAG$4 = 2,
                WRAP_CURRY_FLAG$4 = 8,
                WRAP_CURRY_RIGHT_FLAG$2 = 16,
                WRAP_PARTIAL_FLAG$2 = 32,
                WRAP_PARTIAL_RIGHT_FLAG$2 = 64;

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMax$6 = Math.max;

            /**
             * Creates a function that either curries or invokes `func` with optional
             * `this` binding and partially applied arguments.
             *
             * @private
             * @param {Function|string} func The function or method name to wrap.
             * @param {number} bitmask The bitmask flags.
             *    1 - `_.bind`
             *    2 - `_.bindKey`
             *    4 - `_.curry` or `_.curryRight` of a bound function
             *    8 - `_.curry`
             *   16 - `_.curryRight`
             *   32 - `_.partial`
             *   64 - `_.partialRight`
             *  128 - `_.rearg`
             *  256 - `_.ary`
             *  512 - `_.flip`
             * @param {*} [thisArg] The `this` binding of `func`.
             * @param {Array} [partials] The arguments to be partially applied.
             * @param {Array} [holders] The `partials` placeholder indexes.
             * @param {Array} [argPos] The argument positions of the new function.
             * @param {number} [ary] The arity cap of `func`.
             * @param {number} [arity] The arity of `func`.
             * @returns {Function} Returns the new wrapped function.
             */
            function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
              var isBindKey = bitmask & WRAP_BIND_KEY_FLAG$4;
              if (!isBindKey && typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT$1);
              }
              var length = partials ? partials.length : 0;
              if (!length) {
                bitmask &= ~(WRAP_PARTIAL_FLAG$2 | WRAP_PARTIAL_RIGHT_FLAG$2);
                partials = holders = undefined;
              }
              ary = ary === undefined ? ary : nativeMax$6(toInteger_1(ary), 0);
              arity = arity === undefined ? arity : toInteger_1(arity);
              length -= holders ? holders.length : 0;

              if (bitmask & WRAP_PARTIAL_RIGHT_FLAG$2) {
                var partialsRight = partials,
                    holdersRight = holders;

                partials = holders = undefined;
              }
              var data = isBindKey ? undefined : _getData(func);

              var newData = [
                func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
                argPos, ary, arity
              ];

              if (data) {
                _mergeData(newData, data);
              }
              func = newData[0];
              bitmask = newData[1];
              thisArg = newData[2];
              partials = newData[3];
              holders = newData[4];
              arity = newData[9] = newData[9] === undefined
                ? (isBindKey ? 0 : func.length)
                : nativeMax$6(newData[9] - length, 0);

              if (!arity && bitmask & (WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2)) {
                bitmask &= ~(WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2);
              }
              if (!bitmask || bitmask == WRAP_BIND_FLAG$6) {
                var result = _createBind(func, bitmask, thisArg);
              } else if (bitmask == WRAP_CURRY_FLAG$4 || bitmask == WRAP_CURRY_RIGHT_FLAG$2) {
                result = _createCurry(func, bitmask, arity);
              } else if ((bitmask == WRAP_PARTIAL_FLAG$2 || bitmask == (WRAP_BIND_FLAG$6 | WRAP_PARTIAL_FLAG$2)) && !holders.length) {
                result = _createPartial(func, bitmask, thisArg, partials);
              } else {
                result = _createHybrid.apply(undefined, newData);
              }
              var setter = data ? _baseSetData : _setData;
              return _setWrapToString(setter(result, newData), func, bitmask);
            }

            var _createWrap = createWrap;

            /** Used to compose bitmasks for function metadata. */
            var WRAP_PARTIAL_FLAG$3 = 32;

            /**
             * Creates a function that invokes `func` with `partials` prepended to the
             * arguments it receives. This method is like `_.bind` except it does **not**
             * alter the `this` binding.
             *
             * The `_.partial.placeholder` value, which defaults to `_` in monolithic
             * builds, may be used as a placeholder for partially applied arguments.
             *
             * **Note:** This method doesn't set the "length" property of partially
             * applied functions.
             *
             * @static
             * @memberOf _
             * @since 0.2.0
             * @category Function
             * @param {Function} func The function to partially apply arguments to.
             * @param {...*} [partials] The arguments to be partially applied.
             * @returns {Function} Returns the new partially applied function.
             * @example
             *
             * function greet(greeting, name) {
             *   return greeting + ' ' + name;
             * }
             *
             * var sayHelloTo = _.partial(greet, 'hello');
             * sayHelloTo('fred');
             * // => 'hello fred'
             *
             * // Partially applied with placeholders.
             * var greetFred = _.partial(greet, _, 'fred');
             * greetFred('hi');
             * // => 'hi fred'
             */
            var partial = _baseRest(function(func, partials) {
              var holders = _replaceHolders(partials, _getHolder(partial));
              return _createWrap(func, WRAP_PARTIAL_FLAG$3, undefined, partials, holders);
            });

            // Assign default placeholders.
            partial.placeholder = {};

            var partial_1 = partial;

            /** Used to compose bitmasks for function metadata. */
            var WRAP_PARTIAL_RIGHT_FLAG$3 = 64;

            /**
             * This method is like `_.partial` except that partially applied arguments
             * are appended to the arguments it receives.
             *
             * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
             * builds, may be used as a placeholder for partially applied arguments.
             *
             * **Note:** This method doesn't set the "length" property of partially
             * applied functions.
             *
             * @static
             * @memberOf _
             * @since 1.0.0
             * @category Function
             * @param {Function} func The function to partially apply arguments to.
             * @param {...*} [partials] The arguments to be partially applied.
             * @returns {Function} Returns the new partially applied function.
             * @example
             *
             * function greet(greeting, name) {
             *   return greeting + ' ' + name;
             * }
             *
             * var greetFred = _.partialRight(greet, 'fred');
             * greetFred('hi');
             * // => 'hi fred'
             *
             * // Partially applied with placeholders.
             * var sayHelloTo = _.partialRight(greet, 'hello', _);
             * sayHelloTo('fred');
             * // => 'hello fred'
             */
            var partialRight = _baseRest(function(func, partials) {
              var holders = _replaceHolders(partials, _getHolder(partialRight));
              return _createWrap(func, WRAP_PARTIAL_RIGHT_FLAG$3, undefined, partials, holders);
            });

            // Assign default placeholders.
            partialRight.placeholder = {};

            var partialRight_1 = partialRight;

            /**
             * The base implementation of `_.clamp` which doesn't coerce arguments.
             *
             * @private
             * @param {number} number The number to clamp.
             * @param {number} [lower] The lower bound.
             * @param {number} upper The upper bound.
             * @returns {number} Returns the clamped number.
             */
            function baseClamp(number, lower, upper) {
              if (number === number) {
                if (upper !== undefined) {
                  number = number <= upper ? number : upper;
                }
                if (lower !== undefined) {
                  number = number >= lower ? number : lower;
                }
              }
              return number;
            }

            var _baseClamp = baseClamp;

            /**
             * Checks if `string` starts with the given target string.
             *
             * @static
             * @memberOf _
             * @since 3.0.0
             * @category String
             * @param {string} [string=''] The string to inspect.
             * @param {string} [target] The string to search for.
             * @param {number} [position=0] The position to search from.
             * @returns {boolean} Returns `true` if `string` starts with `target`,
             *  else `false`.
             * @example
             *
             * _.startsWith('abc', 'a');
             * // => true
             *
             * _.startsWith('abc', 'b');
             * // => false
             *
             * _.startsWith('abc', 'b', 1);
             * // => true
             */
            function startsWith(string, target, position) {
              string = toString_1(string);
              position = position == null
                ? 0
                : _baseClamp(toInteger_1(position), 0, string.length);

              target = _baseToString(target);
              return string.slice(position, position + target.length) == target;
            }

            var startsWith_1 = startsWith;

            /**
             * Transform sort format from user friendly notation to lodash format
             * @param {string[]} sortBy array of predicate of the form "attribute:order"
             * @return {array.<string[]>} array containing 2 elements : attributes, orders
             */
            var formatSort = function formatSort(sortBy, defaults) {
              return reduce_1(sortBy, function preparePredicate(out, sortInstruction) {
                var sortInstructions = sortInstruction.split(':');
                if (defaults && sortInstructions.length === 1) {
                  var similarDefault = find_1(defaults, function(predicate) {
                    return startsWith_1(predicate, sortInstruction[0]);
                  });
                  if (similarDefault) {
                    sortInstructions = similarDefault.split(':');
                  }
                }
                out[0].push(sortInstructions[0]);
                out[1].push(sortInstructions[1]);
                return out;
              }, [[], []]);
            };

            /**
             * The base implementation of `_.set`.
             *
             * @private
             * @param {Object} object The object to modify.
             * @param {Array|string} path The path of the property to set.
             * @param {*} value The value to set.
             * @param {Function} [customizer] The function to customize path creation.
             * @returns {Object} Returns `object`.
             */
            function baseSet(object, path, value, customizer) {
              if (!isObject_1(object)) {
                return object;
              }
              path = _castPath(path, object);

              var index = -1,
                  length = path.length,
                  lastIndex = length - 1,
                  nested = object;

              while (nested != null && ++index < length) {
                var key = _toKey(path[index]),
                    newValue = value;

                if (index != lastIndex) {
                  var objValue = nested[key];
                  newValue = customizer ? customizer(objValue, key, nested) : undefined;
                  if (newValue === undefined) {
                    newValue = isObject_1(objValue)
                      ? objValue
                      : (_isIndex(path[index + 1]) ? [] : {});
                  }
                }
                _assignValue(nested, key, newValue);
                nested = nested[key];
              }
              return object;
            }

            var _baseSet = baseSet;

            /**
             * The base implementation of  `_.pickBy` without support for iteratee shorthands.
             *
             * @private
             * @param {Object} object The source object.
             * @param {string[]} paths The property paths to pick.
             * @param {Function} predicate The function invoked per property.
             * @returns {Object} Returns the new object.
             */
            function basePickBy(object, paths, predicate) {
              var index = -1,
                  length = paths.length,
                  result = {};

              while (++index < length) {
                var path = paths[index],
                    value = _baseGet(object, path);

                if (predicate(value, path)) {
                  _baseSet(result, _castPath(path, object), value);
                }
              }
              return result;
            }

            var _basePickBy = basePickBy;

            /**
             * Creates an object composed of the `object` properties `predicate` returns
             * truthy for. The predicate is invoked with two arguments: (value, key).
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Object
             * @param {Object} object The source object.
             * @param {Function} [predicate=_.identity] The function invoked per property.
             * @returns {Object} Returns the new object.
             * @example
             *
             * var object = { 'a': 1, 'b': '2', 'c': 3 };
             *
             * _.pickBy(object, _.isNumber);
             * // => { 'a': 1, 'c': 3 }
             */
            function pickBy(object, predicate) {
              if (object == null) {
                return {};
              }
              var props = _arrayMap(_getAllKeysIn(object), function(prop) {
                return [prop];
              });
              predicate = _baseIteratee(predicate);
              return _basePickBy(object, props, function(value, path) {
                return predicate(value, path[0]);
              });
            }

            var pickBy_1 = pickBy;

            var generateHierarchicalTree_1 = generateTrees;











            function generateTrees(state) {
              return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
                var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
                var hierarchicalFacetRefinement = state.hierarchicalFacetsRefinements[hierarchicalFacet.name] &&
                  state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0] || '';
                var hierarchicalSeparator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
                var hierarchicalRootPath = state._getHierarchicalRootPath(hierarchicalFacet);
                var hierarchicalShowParentLevel = state._getHierarchicalShowParentLevel(hierarchicalFacet);
                var sortBy = formatSort(state._getHierarchicalFacetSortBy(hierarchicalFacet));

                var generateTreeFn = generateHierarchicalTree(sortBy, hierarchicalSeparator, hierarchicalRootPath,
                  hierarchicalShowParentLevel, hierarchicalFacetRefinement);

                var results = hierarchicalFacetResult;

                if (hierarchicalRootPath) {
                  results = hierarchicalFacetResult.slice(hierarchicalRootPath.split(hierarchicalSeparator).length);
                }

                return reduce_1(results, generateTreeFn, {
                  name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
                  count: null, // root level, no count
                  isRefined: true, // root level, always refined
                  path: null, // root level, no path
                  data: null
                });
              };
            }

            function generateHierarchicalTree(sortBy, hierarchicalSeparator, hierarchicalRootPath,
                                              hierarchicalShowParentLevel, currentRefinement) {
              return function generateTree(hierarchicalTree, hierarchicalFacetResult, currentHierarchicalLevel) {
                var parent = hierarchicalTree;

                if (currentHierarchicalLevel > 0) {
                  var level = 0;

                  parent = hierarchicalTree;

                  while (level < currentHierarchicalLevel) {
                    parent = parent && find_1(parent.data, {isRefined: true});
                    level++;
                  }
                }

                // we found a refined parent, let's add current level data under it
                if (parent) {
                  // filter values in case an object has multiple categories:
                  //   {
                  //     categories: {
                  //       level0: ['beers', 'bières'],
                  //       level1: ['beers > IPA', 'bières > Belges']
                  //     }
                  //   }
                  //
                  // If parent refinement is `beers`, then we do not want to have `bières > Belges`
                  // showing up

                  var onlyMatchingValuesFn = filterFacetValues(parent.path || hierarchicalRootPath,
                    currentRefinement, hierarchicalSeparator, hierarchicalRootPath, hierarchicalShowParentLevel);

                  parent.data = orderBy_1(
                    map_1(
                      pickBy_1(hierarchicalFacetResult.data, onlyMatchingValuesFn),
                      formatHierarchicalFacetValue(hierarchicalSeparator, currentRefinement)
                    ),
                    sortBy[0], sortBy[1]
                  );
                }

                return hierarchicalTree;
              };
            }

            function filterFacetValues(parentPath, currentRefinement, hierarchicalSeparator, hierarchicalRootPath,
                                       hierarchicalShowParentLevel) {
              return function(facetCount, facetValue) {
                // we want the facetValue is a child of hierarchicalRootPath
                if (hierarchicalRootPath &&
                  (facetValue.indexOf(hierarchicalRootPath) !== 0 || hierarchicalRootPath === facetValue)) {
                  return false;
                }

                // we always want root levels (only when there is no prefix path)
                return !hierarchicalRootPath && facetValue.indexOf(hierarchicalSeparator) === -1 ||
                  // if there is a rootPath, being root level mean 1 level under rootPath
                  hierarchicalRootPath &&
                  facetValue.split(hierarchicalSeparator).length - hierarchicalRootPath.split(hierarchicalSeparator).length === 1 ||
                  // if current refinement is a root level and current facetValue is a root level,
                  // keep the facetValue
                  facetValue.indexOf(hierarchicalSeparator) === -1 &&
                  currentRefinement.indexOf(hierarchicalSeparator) === -1 ||
                  // currentRefinement is a child of the facet value
                  currentRefinement.indexOf(facetValue) === 0 ||
                  // facetValue is a child of the current parent, add it
                  facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 &&
                  (hierarchicalShowParentLevel || facetValue.indexOf(currentRefinement) === 0);
              };
            }

            function formatHierarchicalFacetValue(hierarchicalSeparator, currentRefinement) {
              return function format(facetCount, facetValue) {
                return {
                  name: trim_1(last_1(facetValue.split(hierarchicalSeparator))),
                  path: facetValue,
                  count: facetCount,
                  isRefined: currentRefinement === facetValue || currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
                  data: null
                };
              };
            }

            /**
             * @typedef SearchResults.Facet
             * @type {object}
             * @property {string} name name of the attribute in the record
             * @property {object} data the faceting data: value, number of entries
             * @property {object} stats undefined unless facet_stats is retrieved from algolia
             */

            /**
             * @typedef SearchResults.HierarchicalFacet
             * @type {object}
             * @property {string} name name of the current value given the hierarchical level, trimmed.
             * If root node, you get the facet name
             * @property {number} count number of objects matching this hierarchical value
             * @property {string} path the current hierarchical value full path
             * @property {boolean} isRefined `true` if the current value was refined, `false` otherwise
             * @property {HierarchicalFacet[]} data sub values for the current level
             */

            /**
             * @typedef SearchResults.FacetValue
             * @type {object}
             * @property {string} name the facet value itself
             * @property {number} count times this facet appears in the results
             * @property {boolean} isRefined is the facet currently selected
             * @property {boolean} isExcluded is the facet currently excluded (only for conjunctive facets)
             */

            /**
             * @typedef Refinement
             * @type {object}
             * @property {string} type the type of filter used:
             * `numeric`, `facet`, `exclude`, `disjunctive`, `hierarchical`
             * @property {string} attributeName name of the attribute used for filtering
             * @property {string} name the value of the filter
             * @property {number} numericValue the value as a number. Only for numeric filters.
             * @property {string} operator the operator used. Only for numeric filters.
             * @property {number} count the number of computed hits for this filter. Only on facets.
             * @property {boolean} exhaustive if the count is exhaustive
             */

            function getIndices(obj) {
              var indices = {};

              forEach_1(obj, function(val, idx) { indices[val] = idx; });

              return indices;
            }

            function assignFacetStats(dest, facetStats, key) {
              if (facetStats && facetStats[key]) {
                dest.stats = facetStats[key];
              }
            }

            function findMatchingHierarchicalFacetFromAttributeName(hierarchicalFacets, hierarchicalAttributeName) {
              return find_1(
                hierarchicalFacets,
                function facetKeyMatchesAttribute(hierarchicalFacet) {
                  return includes_1(hierarchicalFacet.attributes, hierarchicalAttributeName);
                }
              );
            }

            /*eslint-disable */
            /**
             * Constructor for SearchResults
             * @class
             * @classdesc SearchResults contains the results of a query to Algolia using the
             * {@link AlgoliaSearchHelper}.
             * @param {SearchParameters} state state that led to the response
             * @param {array.<object>} results the results from algolia client
             * @example <caption>SearchResults of the first query in
             * <a href="http://demos.algolia.com/instant-search-demo">the instant search demo</a></caption>
            {
               "hitsPerPage": 10,
               "processingTimeMS": 2,
               "facets": [
                  {
                     "name": "type",
                     "data": {
                        "HardGood": 6627,
                        "BlackTie": 550,
                        "Music": 665,
                        "Software": 131,
                        "Game": 456,
                        "Movie": 1571
                     },
                     "exhaustive": false
                  },
                  {
                     "exhaustive": false,
                     "data": {
                        "Free shipping": 5507
                     },
                     "name": "shipping"
                  }
              ],
               "hits": [
                  {
                     "thumbnailImage": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_54x108_s.gif",
                     "_highlightResult": {
                        "shortDescription": {
                           "matchLevel": "none",
                           "value": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
                           "matchedWords": []
                        },
                        "category": {
                           "matchLevel": "none",
                           "value": "Computer Security Software",
                           "matchedWords": []
                        },
                        "manufacturer": {
                           "matchedWords": [],
                           "value": "Webroot",
                           "matchLevel": "none"
                        },
                        "name": {
                           "value": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
                           "matchedWords": [],
                           "matchLevel": "none"
                        }
                     },
                     "image": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_105x210_sc.jpg",
                     "shipping": "Free shipping",
                     "bestSellingRank": 4,
                     "shortDescription": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
                     "url": "http://www.bestbuy.com/site/webroot-secureanywhere-internet-security-3-devi…d=1219060687969&skuId=1688832&cmp=RMX&ky=2d3GfEmNIzjA0vkzveHdZEBgpPCyMnLTJ",
                     "name": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
                     "category": "Computer Security Software",
                     "salePrice_range": "1 - 50",
                     "objectID": "1688832",
                     "type": "Software",
                     "customerReviewCount": 5980,
                     "salePrice": 49.99,
                     "manufacturer": "Webroot"
                  },
                  ....
              ],
               "nbHits": 10000,
               "disjunctiveFacets": [
                  {
                     "exhaustive": false,
                     "data": {
                        "5": 183,
                        "12": 112,
                        "7": 149,
                        ...
                     },
                     "name": "customerReviewCount",
                     "stats": {
                        "max": 7461,
                        "avg": 157.939,
                        "min": 1
                     }
                  },
                  {
                     "data": {
                        "Printer Ink": 142,
                        "Wireless Speakers": 60,
                        "Point & Shoot Cameras": 48,
                        ...
                     },
                     "name": "category",
                     "exhaustive": false
                  },
                  {
                     "exhaustive": false,
                     "data": {
                        "> 5000": 2,
                        "1 - 50": 6524,
                        "501 - 2000": 566,
                        "201 - 500": 1501,
                        "101 - 200": 1360,
                        "2001 - 5000": 47
                     },
                     "name": "salePrice_range"
                  },
                  {
                     "data": {
                        "Dynex™": 202,
                        "Insignia™": 230,
                        "PNY": 72,
                        ...
                     },
                     "name": "manufacturer",
                     "exhaustive": false
                  }
              ],
               "query": "",
               "nbPages": 100,
               "page": 0,
               "index": "bestbuy"
            }
             **/
            /*eslint-enable */
            function SearchResults(state, results) {
              var mainSubResponse = results[0];

              this._rawResults = results;

              /**
               * query used to generate the results
               * @member {string}
               */
              this.query = mainSubResponse.query;
              /**
               * The query as parsed by the engine given all the rules.
               * @member {string}
               */
              this.parsedQuery = mainSubResponse.parsedQuery;
              /**
               * all the records that match the search parameters. Each record is
               * augmented with a new attribute `_highlightResult`
               * which is an object keyed by attribute and with the following properties:
               *  - `value` : the value of the facet highlighted (html)
               *  - `matchLevel`: full, partial or none depending on how the query terms match
               * @member {object[]}
               */
              this.hits = mainSubResponse.hits;
              /**
               * index where the results come from
               * @member {string}
               */
              this.index = mainSubResponse.index;
              /**
               * number of hits per page requested
               * @member {number}
               */
              this.hitsPerPage = mainSubResponse.hitsPerPage;
              /**
               * total number of hits of this query on the index
               * @member {number}
               */
              this.nbHits = mainSubResponse.nbHits;
              /**
               * total number of pages with respect to the number of hits per page and the total number of hits
               * @member {number}
               */
              this.nbPages = mainSubResponse.nbPages;
              /**
               * current page
               * @member {number}
               */
              this.page = mainSubResponse.page;
              /**
               * sum of the processing time of all the queries
               * @member {number}
               */
              this.processingTimeMS = sumBy_1(results, 'processingTimeMS');
              /**
               * The position if the position was guessed by IP.
               * @member {string}
               * @example "48.8637,2.3615",
               */
              this.aroundLatLng = mainSubResponse.aroundLatLng;
              /**
               * The radius computed by Algolia.
               * @member {string}
               * @example "126792922",
               */
              this.automaticRadius = mainSubResponse.automaticRadius;
              /**
               * String identifying the server used to serve this request.
               * @member {string}
               * @example "c7-use-2.algolia.net",
               */
              this.serverUsed = mainSubResponse.serverUsed;
              /**
               * Boolean that indicates if the computation of the counts did time out.
               * @deprecated
               * @member {boolean}
               */
              this.timeoutCounts = mainSubResponse.timeoutCounts;
              /**
               * Boolean that indicates if the computation of the hits did time out.
               * @deprecated
               * @member {boolean}
               */
              this.timeoutHits = mainSubResponse.timeoutHits;

              /**
               * True if the counts of the facets is exhaustive
               * @member {boolean}
               */
              this.exhaustiveFacetsCount = mainSubResponse.exhaustiveFacetsCount;

              /**
               * True if the number of hits is exhaustive
               * @member {boolean}
               */
              this.exhaustiveNbHits = mainSubResponse.exhaustiveNbHits;


              /**
               * Contains the userData if they are set by a [query rule](https://www.algolia.com/doc/guides/query-rules/query-rules-overview/).
               * @member {object[]}
               */
              this.userData = mainSubResponse.userData;

              /**
               * queryID is the unique identifier of the query used to generate the current search results.
               * This value is only available if the `clickAnalytics` search parameter is set to `true`.
               * @member {string}
               */
              this.queryID = mainSubResponse.queryID;

              /**
               * disjunctive facets results
               * @member {SearchResults.Facet[]}
               */
              this.disjunctiveFacets = [];
              /**
               * disjunctive facets results
               * @member {SearchResults.HierarchicalFacet[]}
               */
              this.hierarchicalFacets = map_1(state.hierarchicalFacets, function initFutureTree() {
                return [];
              });
              /**
               * other facets results
               * @member {SearchResults.Facet[]}
               */
              this.facets = [];

              var disjunctiveFacets = state.getRefinedDisjunctiveFacets();

              var facetsIndices = getIndices(state.facets);
              var disjunctiveFacetsIndices = getIndices(state.disjunctiveFacets);
              var nextDisjunctiveResult = 1;

              var self = this;
              // Since we send request only for disjunctive facets that have been refined,
              // we get the facets informations from the first, general, response.
              forEach_1(mainSubResponse.facets, function(facetValueObject, facetKey) {
                var hierarchicalFacet = findMatchingHierarchicalFacetFromAttributeName(
                  state.hierarchicalFacets,
                  facetKey
                );

                if (hierarchicalFacet) {
                  // Place the hierarchicalFacet data at the correct index depending on
                  // the attributes order that was defined at the helper initialization
                  var facetIndex = hierarchicalFacet.attributes.indexOf(facetKey);
                  var idxAttributeName = findIndex_1(state.hierarchicalFacets, {name: hierarchicalFacet.name});
                  self.hierarchicalFacets[idxAttributeName][facetIndex] = {
                    attribute: facetKey,
                    data: facetValueObject,
                    exhaustive: mainSubResponse.exhaustiveFacetsCount
                  };
                } else {
                  var isFacetDisjunctive = indexOf_1(state.disjunctiveFacets, facetKey) !== -1;
                  var isFacetConjunctive = indexOf_1(state.facets, facetKey) !== -1;
                  var position;

                  if (isFacetDisjunctive) {
                    position = disjunctiveFacetsIndices[facetKey];
                    self.disjunctiveFacets[position] = {
                      name: facetKey,
                      data: facetValueObject,
                      exhaustive: mainSubResponse.exhaustiveFacetsCount
                    };
                    assignFacetStats(self.disjunctiveFacets[position], mainSubResponse.facets_stats, facetKey);
                  }
                  if (isFacetConjunctive) {
                    position = facetsIndices[facetKey];
                    self.facets[position] = {
                      name: facetKey,
                      data: facetValueObject,
                      exhaustive: mainSubResponse.exhaustiveFacetsCount
                    };
                    assignFacetStats(self.facets[position], mainSubResponse.facets_stats, facetKey);
                  }
                }
              });

              // Make sure we do not keep holes within the hierarchical facets
              this.hierarchicalFacets = compact_1(this.hierarchicalFacets);

              // aggregate the refined disjunctive facets
              forEach_1(disjunctiveFacets, function(disjunctiveFacet) {
                var result = results[nextDisjunctiveResult];
                var hierarchicalFacet = state.getHierarchicalFacetByName(disjunctiveFacet);

                // There should be only item in facets.
                forEach_1(result.facets, function(facetResults, dfacet) {
                  var position;

                  if (hierarchicalFacet) {
                    position = findIndex_1(state.hierarchicalFacets, {name: hierarchicalFacet.name});
                    var attributeIndex = findIndex_1(self.hierarchicalFacets[position], {attribute: dfacet});

                    // previous refinements and no results so not able to find it
                    if (attributeIndex === -1) {
                      return;
                    }

                    self.hierarchicalFacets[position][attributeIndex].data = merge_1(
                      {},
                      self.hierarchicalFacets[position][attributeIndex].data,
                      facetResults
                    );
                  } else {
                    position = disjunctiveFacetsIndices[dfacet];

                    var dataFromMainRequest = mainSubResponse.facets && mainSubResponse.facets[dfacet] || {};

                    self.disjunctiveFacets[position] = {
                      name: dfacet,
                      data: defaults_1({}, facetResults, dataFromMainRequest),
                      exhaustive: result.exhaustiveFacetsCount
                    };
                    assignFacetStats(self.disjunctiveFacets[position], result.facets_stats, dfacet);

                    if (state.disjunctiveFacetsRefinements[dfacet]) {
                      forEach_1(state.disjunctiveFacetsRefinements[dfacet], function(refinementValue) {
                        // add the disjunctive refinements if it is no more retrieved
                        if (!self.disjunctiveFacets[position].data[refinementValue] &&
                          indexOf_1(state.disjunctiveFacetsRefinements[dfacet], refinementValue) > -1) {
                          self.disjunctiveFacets[position].data[refinementValue] = 0;
                        }
                      });
                    }
                  }
                });
                nextDisjunctiveResult++;
              });

              // if we have some root level values for hierarchical facets, merge them
              forEach_1(state.getRefinedHierarchicalFacets(), function(refinedFacet) {
                var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
                var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);

                var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
                // if we are already at a root refinement (or no refinement at all), there is no
                // root level values request
                if (currentRefinement.length === 0 || currentRefinement[0].split(separator).length < 2) {
                  return;
                }

                var result = results[nextDisjunctiveResult];

                forEach_1(result.facets, function(facetResults, dfacet) {
                  var position = findIndex_1(state.hierarchicalFacets, {name: hierarchicalFacet.name});
                  var attributeIndex = findIndex_1(self.hierarchicalFacets[position], {attribute: dfacet});

                  // previous refinements and no results so not able to find it
                  if (attributeIndex === -1) {
                    return;
                  }

                  // when we always get root levels, if the hits refinement is `beers > IPA` (count: 5),
                  // then the disjunctive values will be `beers` (count: 100),
                  // but we do not want to display
                  //   | beers (100)
                  //     > IPA (5)
                  // We want
                  //   | beers (5)
                  //     > IPA (5)
                  var defaultData = {};

                  if (currentRefinement.length > 0) {
                    var root = currentRefinement[0].split(separator)[0];
                    defaultData[root] = self.hierarchicalFacets[position][attributeIndex].data[root];
                  }

                  self.hierarchicalFacets[position][attributeIndex].data = defaults_1(
                    defaultData,
                    facetResults,
                    self.hierarchicalFacets[position][attributeIndex].data
                  );
                });

                nextDisjunctiveResult++;
              });

              // add the excludes
              forEach_1(state.facetsExcludes, function(excludes, facetName) {
                var position = facetsIndices[facetName];

                self.facets[position] = {
                  name: facetName,
                  data: mainSubResponse.facets[facetName],
                  exhaustive: mainSubResponse.exhaustiveFacetsCount
                };
                forEach_1(excludes, function(facetValue) {
                  self.facets[position] = self.facets[position] || {name: facetName};
                  self.facets[position].data = self.facets[position].data || {};
                  self.facets[position].data[facetValue] = 0;
                });
              });

              this.hierarchicalFacets = map_1(this.hierarchicalFacets, generateHierarchicalTree_1(state));

              this.facets = compact_1(this.facets);
              this.disjunctiveFacets = compact_1(this.disjunctiveFacets);

              this._state = state;
            }

            /**
             * Get a facet object with its name
             * @deprecated
             * @param {string} name name of the faceted attribute
             * @return {SearchResults.Facet} the facet object
             */
            SearchResults.prototype.getFacetByName = function(name) {
              var predicate = {name: name};

              return find_1(this.facets, predicate) ||
                find_1(this.disjunctiveFacets, predicate) ||
                find_1(this.hierarchicalFacets, predicate);
            };

            /**
             * Get the facet values of a specified attribute from a SearchResults object.
             * @private
             * @param {SearchResults} results the search results to search in
             * @param {string} attribute name of the faceted attribute to search for
             * @return {array|object} facet values. For the hierarchical facets it is an object.
             */
            function extractNormalizedFacetValues(results, attribute) {
              var predicate = {name: attribute};
              if (results._state.isConjunctiveFacet(attribute)) {
                var facet = find_1(results.facets, predicate);
                if (!facet) return [];

                return map_1(facet.data, function(v, k) {
                  return {
                    name: k,
                    count: v,
                    isRefined: results._state.isFacetRefined(attribute, k),
                    isExcluded: results._state.isExcludeRefined(attribute, k)
                  };
                });
              } else if (results._state.isDisjunctiveFacet(attribute)) {
                var disjunctiveFacet = find_1(results.disjunctiveFacets, predicate);
                if (!disjunctiveFacet) return [];

                return map_1(disjunctiveFacet.data, function(v, k) {
                  return {
                    name: k,
                    count: v,
                    isRefined: results._state.isDisjunctiveFacetRefined(attribute, k)
                  };
                });
              } else if (results._state.isHierarchicalFacet(attribute)) {
                return find_1(results.hierarchicalFacets, predicate);
              }
            }

            /**
             * Sort nodes of a hierarchical facet results
             * @private
             * @param {HierarchicalFacet} node node to upon which we want to apply the sort
             */
            function recSort(sortFn, node) {
              if (!node.data || node.data.length === 0) {
                return node;
              }
              var children = map_1(node.data, partial_1(recSort, sortFn));
              var sortedChildren = sortFn(children);
              var newNode = merge_1({}, node, {data: sortedChildren});
              return newNode;
            }

            SearchResults.DEFAULT_SORT = ['isRefined:desc', 'count:desc', 'name:asc'];

            function vanillaSortFn(order, data) {
              return data.sort(order);
            }

            /**
             * Get a the list of values for a given facet attribute. Those values are sorted
             * refinement first, descending count (bigger value on top), and name ascending
             * (alphabetical order). The sort formula can overridden using either string based
             * predicates or a function.
             *
             * This method will return all the values returned by the Algolia engine plus all
             * the values already refined. This means that it can happen that the
             * `maxValuesPerFacet` [configuration](https://www.algolia.com/doc/rest-api/search#param-maxValuesPerFacet)
             * might not be respected if you have facet values that are already refined.
             * @param {string} attribute attribute name
             * @param {object} opts configuration options.
             * @param {Array.<string> | function} opts.sortBy
             * When using strings, it consists of
             * the name of the [FacetValue](#SearchResults.FacetValue) or the
             * [HierarchicalFacet](#SearchResults.HierarchicalFacet) attributes with the
             * order (`asc` or `desc`). For example to order the value by count, the
             * argument would be `['count:asc']`.
             *
             * If only the attribute name is specified, the ordering defaults to the one
             * specified in the default value for this attribute.
             *
             * When not specified, the order is
             * ascending.  This parameter can also be a function which takes two facet
             * values and should return a number, 0 if equal, 1 if the first argument is
             * bigger or -1 otherwise.
             *
             * The default value for this attribute `['isRefined:desc', 'count:desc', 'name:asc']`
             * @return {FacetValue[]|HierarchicalFacet} depending on the type of facet of
             * the attribute requested (hierarchical, disjunctive or conjunctive)
             * @example
             * helper.on('results', function(content){
             *   //get values ordered only by name ascending using the string predicate
             *   content.getFacetValues('city', {sortBy: ['name:asc']});
             *   //get values  ordered only by count ascending using a function
             *   content.getFacetValues('city', {
             *     // this is equivalent to ['count:asc']
             *     sortBy: function(a, b) {
             *       if (a.count === b.count) return 0;
             *       if (a.count > b.count)   return 1;
             *       if (b.count > a.count)   return -1;
             *     }
             *   });
             * });
             */
            SearchResults.prototype.getFacetValues = function(attribute, opts) {
              var facetValues = extractNormalizedFacetValues(this, attribute);
              if (!facetValues) throw new Error(attribute + ' is not a retrieved facet.');

              var options = defaults_1({}, opts, {sortBy: SearchResults.DEFAULT_SORT});

              if (Array.isArray(options.sortBy)) {
                var order = formatSort(options.sortBy, SearchResults.DEFAULT_SORT);
                if (Array.isArray(facetValues)) {
                  return orderBy_1(facetValues, order[0], order[1]);
                }
                // If facetValues is not an array, it's an object thus a hierarchical facet object
                return recSort(partialRight_1(orderBy_1, order[0], order[1]), facetValues);
              } else if (isFunction_1(options.sortBy)) {
                if (Array.isArray(facetValues)) {
                  return facetValues.sort(options.sortBy);
                }
                // If facetValues is not an array, it's an object thus a hierarchical facet object
                return recSort(partial_1(vanillaSortFn, options.sortBy), facetValues);
              }
              throw new Error(
                'options.sortBy is optional but if defined it must be ' +
                'either an array of string (predicates) or a sorting function'
              );
            };

            /**
             * Returns the facet stats if attribute is defined and the facet contains some.
             * Otherwise returns undefined.
             * @param {string} attribute name of the faceted attribute
             * @return {object} The stats of the facet
             */
            SearchResults.prototype.getFacetStats = function(attribute) {
              if (this._state.isConjunctiveFacet(attribute)) {
                return getFacetStatsIfAvailable(this.facets, attribute);
              } else if (this._state.isDisjunctiveFacet(attribute)) {
                return getFacetStatsIfAvailable(this.disjunctiveFacets, attribute);
              }

              throw new Error(attribute + ' is not present in `facets` or `disjunctiveFacets`');
            };

            function getFacetStatsIfAvailable(facetList, facetName) {
              var data = find_1(facetList, {name: facetName});
              return data && data.stats;
            }

            /**
             * Returns all refinements for all filters + tags. It also provides
             * additional information: count and exhausistivity for each filter.
             *
             * See the [refinement type](#Refinement) for an exhaustive view of the available
             * data.
             *
             * @return {Array.<Refinement>} all the refinements
             */
            SearchResults.prototype.getRefinements = function() {
              var state = this._state;
              var results = this;
              var res = [];

              forEach_1(state.facetsRefinements, function(refinements, attributeName) {
                forEach_1(refinements, function(name) {
                  res.push(getRefinement(state, 'facet', attributeName, name, results.facets));
                });
              });

              forEach_1(state.facetsExcludes, function(refinements, attributeName) {
                forEach_1(refinements, function(name) {
                  res.push(getRefinement(state, 'exclude', attributeName, name, results.facets));
                });
              });

              forEach_1(state.disjunctiveFacetsRefinements, function(refinements, attributeName) {
                forEach_1(refinements, function(name) {
                  res.push(getRefinement(state, 'disjunctive', attributeName, name, results.disjunctiveFacets));
                });
              });

              forEach_1(state.hierarchicalFacetsRefinements, function(refinements, attributeName) {
                forEach_1(refinements, function(name) {
                  res.push(getHierarchicalRefinement(state, attributeName, name, results.hierarchicalFacets));
                });
              });

              forEach_1(state.numericRefinements, function(operators, attributeName) {
                forEach_1(operators, function(values, operator) {
                  forEach_1(values, function(value) {
                    res.push({
                      type: 'numeric',
                      attributeName: attributeName,
                      name: value,
                      numericValue: value,
                      operator: operator
                    });
                  });
                });
              });

              forEach_1(state.tagRefinements, function(name) {
                res.push({type: 'tag', attributeName: '_tags', name: name});
              });

              return res;
            };

            function getRefinement(state, type, attributeName, name, resultsFacets) {
              var facet = find_1(resultsFacets, {name: attributeName});
              var count = get_1(facet, 'data[' + name + ']');
              var exhaustive = get_1(facet, 'exhaustive');
              return {
                type: type,
                attributeName: attributeName,
                name: name,
                count: count || 0,
                exhaustive: exhaustive || false
              };
            }

            function getHierarchicalRefinement(state, attributeName, name, resultsFacets) {
              var facet = find_1(resultsFacets, {name: attributeName});
              var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
              var splitted = name.split(facetDeclaration.separator);
              var configuredName = splitted[splitted.length - 1];
              for (var i = 0; facet !== undefined && i < splitted.length; ++i) {
                facet = find_1(facet.data, {name: splitted[i]});
              }
              var count = get_1(facet, 'count');
              var exhaustive = get_1(facet, 'exhaustive');
              return {
                type: 'hierarchical',
                attributeName: attributeName,
                name: configuredName,
                count: count || 0,
                exhaustive: exhaustive || false
              };
            }

            var SearchResults_1 = SearchResults;

            var isBufferBrowser = function isBuffer(arg) {
              return arg && typeof arg === 'object'
                && typeof arg.copy === 'function'
                && typeof arg.fill === 'function'
                && typeof arg.readUInt8 === 'function';
            };

            var inherits_browser = createCommonjsModule(function (module) {
            if (typeof Object.create === 'function') {
              // implementation from standard node.js 'util' module
              module.exports = function inherits(ctor, superCtor) {
                ctor.super_ = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                  constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                  }
                });
              };
            } else {
              // old school shim for old browsers
              module.exports = function inherits(ctor, superCtor) {
                ctor.super_ = superCtor;
                var TempCtor = function () {};
                TempCtor.prototype = superCtor.prototype;
                ctor.prototype = new TempCtor();
                ctor.prototype.constructor = ctor;
              };
            }
            });

            var util = createCommonjsModule(function (module, exports) {
            // Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.

            var formatRegExp = /%[sdj%]/g;
            exports.format = function(f) {
              if (!isString(f)) {
                var objects = [];
                for (var i = 0; i < arguments.length; i++) {
                  objects.push(inspect(arguments[i]));
                }
                return objects.join(' ');
              }

              var i = 1;
              var args = arguments;
              var len = args.length;
              var str = String(f).replace(formatRegExp, function(x) {
                if (x === '%%') return '%';
                if (i >= len) return x;
                switch (x) {
                  case '%s': return String(args[i++]);
                  case '%d': return Number(args[i++]);
                  case '%j':
                    try {
                      return JSON.stringify(args[i++]);
                    } catch (_) {
                      return '[Circular]';
                    }
                  default:
                    return x;
                }
              });
              for (var x = args[i]; i < len; x = args[++i]) {
                if (isNull(x) || !isObject(x)) {
                  str += ' ' + x;
                } else {
                  str += ' ' + inspect(x);
                }
              }
              return str;
            };


            // Mark that a method should not be used.
            // Returns a modified function which warns once by default.
            // If --no-deprecation is set, then it is a no-op.
            exports.deprecate = function(fn, msg) {
              // Allow for deprecating things in the process of starting up.
              if (isUndefined(commonjsGlobal.process)) {
                return function() {
                  return exports.deprecate(fn, msg).apply(this, arguments);
                };
              }

              var warned = false;
              function deprecated() {
                if (!warned) {
                  {
                    console.error(msg);
                  }
                  warned = true;
                }
                return fn.apply(this, arguments);
              }

              return deprecated;
            };


            var debugs = {};
            var debugEnviron;
            exports.debuglog = function(set) {
              if (isUndefined(debugEnviron))
                debugEnviron = '';
              set = set.toUpperCase();
              if (!debugs[set]) {
                if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
                  var pid = process.pid;
                  debugs[set] = function() {
                    var msg = exports.format.apply(exports, arguments);
                    console.error('%s %d: %s', set, pid, msg);
                  };
                } else {
                  debugs[set] = function() {};
                }
              }
              return debugs[set];
            };


            /**
             * Echos the value of a value. Trys to print the value out
             * in the best way possible given the different types.
             *
             * @param {Object} obj The object to print out.
             * @param {Object} opts Optional options object that alters the output.
             */
            /* legacy: obj, showHidden, depth, colors*/
            function inspect(obj, opts) {
              // default options
              var ctx = {
                seen: [],
                stylize: stylizeNoColor
              };
              // legacy...
              if (arguments.length >= 3) ctx.depth = arguments[2];
              if (arguments.length >= 4) ctx.colors = arguments[3];
              if (isBoolean(opts)) {
                // legacy...
                ctx.showHidden = opts;
              } else if (opts) {
                // got an "options" object
                exports._extend(ctx, opts);
              }
              // set default options
              if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
              if (isUndefined(ctx.depth)) ctx.depth = 2;
              if (isUndefined(ctx.colors)) ctx.colors = false;
              if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
              if (ctx.colors) ctx.stylize = stylizeWithColor;
              return formatValue(ctx, obj, ctx.depth);
            }
            exports.inspect = inspect;


            // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
            inspect.colors = {
              'bold' : [1, 22],
              'italic' : [3, 23],
              'underline' : [4, 24],
              'inverse' : [7, 27],
              'white' : [37, 39],
              'grey' : [90, 39],
              'black' : [30, 39],
              'blue' : [34, 39],
              'cyan' : [36, 39],
              'green' : [32, 39],
              'magenta' : [35, 39],
              'red' : [31, 39],
              'yellow' : [33, 39]
            };

            // Don't use 'blue' not visible on cmd.exe
            inspect.styles = {
              'special': 'cyan',
              'number': 'yellow',
              'boolean': 'yellow',
              'undefined': 'grey',
              'null': 'bold',
              'string': 'green',
              'date': 'magenta',
              // "name": intentionally not styling
              'regexp': 'red'
            };


            function stylizeWithColor(str, styleType) {
              var style = inspect.styles[styleType];

              if (style) {
                return '\u001b[' + inspect.colors[style][0] + 'm' + str +
                       '\u001b[' + inspect.colors[style][1] + 'm';
              } else {
                return str;
              }
            }


            function stylizeNoColor(str, styleType) {
              return str;
            }


            function arrayToHash(array) {
              var hash = {};

              array.forEach(function(val, idx) {
                hash[val] = true;
              });

              return hash;
            }


            function formatValue(ctx, value, recurseTimes) {
              // Provide a hook for user-specified inspect functions.
              // Check that value is an object with an inspect function on it
              if (ctx.customInspect &&
                  value &&
                  isFunction(value.inspect) &&
                  // Filter out the util module, it's inspect function is special
                  value.inspect !== exports.inspect &&
                  // Also filter out any prototype objects using the circular check.
                  !(value.constructor && value.constructor.prototype === value)) {
                var ret = value.inspect(recurseTimes, ctx);
                if (!isString(ret)) {
                  ret = formatValue(ctx, ret, recurseTimes);
                }
                return ret;
              }

              // Primitive types cannot have properties
              var primitive = formatPrimitive(ctx, value);
              if (primitive) {
                return primitive;
              }

              // Look up the keys of the object.
              var keys = Object.keys(value);
              var visibleKeys = arrayToHash(keys);

              if (ctx.showHidden) {
                keys = Object.getOwnPropertyNames(value);
              }

              // IE doesn't make error fields non-enumerable
              // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
              if (isError(value)
                  && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
                return formatError(value);
              }

              // Some type of object without properties can be shortcutted.
              if (keys.length === 0) {
                if (isFunction(value)) {
                  var name = value.name ? ': ' + value.name : '';
                  return ctx.stylize('[Function' + name + ']', 'special');
                }
                if (isRegExp(value)) {
                  return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                }
                if (isDate(value)) {
                  return ctx.stylize(Date.prototype.toString.call(value), 'date');
                }
                if (isError(value)) {
                  return formatError(value);
                }
              }

              var base = '', array = false, braces = ['{', '}'];

              // Make Array say that they are Array
              if (isArray(value)) {
                array = true;
                braces = ['[', ']'];
              }

              // Make functions say that they are functions
              if (isFunction(value)) {
                var n = value.name ? ': ' + value.name : '';
                base = ' [Function' + n + ']';
              }

              // Make RegExps say that they are RegExps
              if (isRegExp(value)) {
                base = ' ' + RegExp.prototype.toString.call(value);
              }

              // Make dates with properties first say the date
              if (isDate(value)) {
                base = ' ' + Date.prototype.toUTCString.call(value);
              }

              // Make error with message first say the error
              if (isError(value)) {
                base = ' ' + formatError(value);
              }

              if (keys.length === 0 && (!array || value.length == 0)) {
                return braces[0] + base + braces[1];
              }

              if (recurseTimes < 0) {
                if (isRegExp(value)) {
                  return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                } else {
                  return ctx.stylize('[Object]', 'special');
                }
              }

              ctx.seen.push(value);

              var output;
              if (array) {
                output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
              } else {
                output = keys.map(function(key) {
                  return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                });
              }

              ctx.seen.pop();

              return reduceToSingleString(output, base, braces);
            }


            function formatPrimitive(ctx, value) {
              if (isUndefined(value))
                return ctx.stylize('undefined', 'undefined');
              if (isString(value)) {
                var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                         .replace(/'/g, "\\'")
                                                         .replace(/\\"/g, '"') + '\'';
                return ctx.stylize(simple, 'string');
              }
              if (isNumber(value))
                return ctx.stylize('' + value, 'number');
              if (isBoolean(value))
                return ctx.stylize('' + value, 'boolean');
              // For some reason typeof null is "object", so special case here.
              if (isNull(value))
                return ctx.stylize('null', 'null');
            }


            function formatError(value) {
              return '[' + Error.prototype.toString.call(value) + ']';
            }


            function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
              var output = [];
              for (var i = 0, l = value.length; i < l; ++i) {
                if (hasOwnProperty(value, String(i))) {
                  output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                      String(i), true));
                } else {
                  output.push('');
                }
              }
              keys.forEach(function(key) {
                if (!key.match(/^\d+$/)) {
                  output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                      key, true));
                }
              });
              return output;
            }


            function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
              var name, str, desc;
              desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
              if (desc.get) {
                if (desc.set) {
                  str = ctx.stylize('[Getter/Setter]', 'special');
                } else {
                  str = ctx.stylize('[Getter]', 'special');
                }
              } else {
                if (desc.set) {
                  str = ctx.stylize('[Setter]', 'special');
                }
              }
              if (!hasOwnProperty(visibleKeys, key)) {
                name = '[' + key + ']';
              }
              if (!str) {
                if (ctx.seen.indexOf(desc.value) < 0) {
                  if (isNull(recurseTimes)) {
                    str = formatValue(ctx, desc.value, null);
                  } else {
                    str = formatValue(ctx, desc.value, recurseTimes - 1);
                  }
                  if (str.indexOf('\n') > -1) {
                    if (array) {
                      str = str.split('\n').map(function(line) {
                        return '  ' + line;
                      }).join('\n').substr(2);
                    } else {
                      str = '\n' + str.split('\n').map(function(line) {
                        return '   ' + line;
                      }).join('\n');
                    }
                  }
                } else {
                  str = ctx.stylize('[Circular]', 'special');
                }
              }
              if (isUndefined(name)) {
                if (array && key.match(/^\d+$/)) {
                  return str;
                }
                name = JSON.stringify('' + key);
                if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                  name = name.substr(1, name.length - 2);
                  name = ctx.stylize(name, 'name');
                } else {
                  name = name.replace(/'/g, "\\'")
                             .replace(/\\"/g, '"')
                             .replace(/(^"|"$)/g, "'");
                  name = ctx.stylize(name, 'string');
                }
              }

              return name + ': ' + str;
            }


            function reduceToSingleString(output, base, braces) {
              var length = output.reduce(function(prev, cur) {
                if (cur.indexOf('\n') >= 0) ;
                return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
              }, 0);

              if (length > 60) {
                return braces[0] +
                       (base === '' ? '' : base + '\n ') +
                       ' ' +
                       output.join(',\n  ') +
                       ' ' +
                       braces[1];
              }

              return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
            }


            // NOTE: These type checking functions intentionally don't use `instanceof`
            // because it is fragile and can be easily faked with `Object.create()`.
            function isArray(ar) {
              return Array.isArray(ar);
            }
            exports.isArray = isArray;

            function isBoolean(arg) {
              return typeof arg === 'boolean';
            }
            exports.isBoolean = isBoolean;

            function isNull(arg) {
              return arg === null;
            }
            exports.isNull = isNull;

            function isNullOrUndefined(arg) {
              return arg == null;
            }
            exports.isNullOrUndefined = isNullOrUndefined;

            function isNumber(arg) {
              return typeof arg === 'number';
            }
            exports.isNumber = isNumber;

            function isString(arg) {
              return typeof arg === 'string';
            }
            exports.isString = isString;

            function isSymbol(arg) {
              return typeof arg === 'symbol';
            }
            exports.isSymbol = isSymbol;

            function isUndefined(arg) {
              return arg === void 0;
            }
            exports.isUndefined = isUndefined;

            function isRegExp(re) {
              return isObject(re) && objectToString(re) === '[object RegExp]';
            }
            exports.isRegExp = isRegExp;

            function isObject(arg) {
              return typeof arg === 'object' && arg !== null;
            }
            exports.isObject = isObject;

            function isDate(d) {
              return isObject(d) && objectToString(d) === '[object Date]';
            }
            exports.isDate = isDate;

            function isError(e) {
              return isObject(e) &&
                  (objectToString(e) === '[object Error]' || e instanceof Error);
            }
            exports.isError = isError;

            function isFunction(arg) {
              return typeof arg === 'function';
            }
            exports.isFunction = isFunction;

            function isPrimitive(arg) {
              return arg === null ||
                     typeof arg === 'boolean' ||
                     typeof arg === 'number' ||
                     typeof arg === 'string' ||
                     typeof arg === 'symbol' ||  // ES6 symbol
                     typeof arg === 'undefined';
            }
            exports.isPrimitive = isPrimitive;

            exports.isBuffer = isBufferBrowser;

            function objectToString(o) {
              return Object.prototype.toString.call(o);
            }


            function pad(n) {
              return n < 10 ? '0' + n.toString(10) : n.toString(10);
            }


            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                          'Oct', 'Nov', 'Dec'];

            // 26 Feb 16:19:34
            function timestamp() {
              var d = new Date();
              var time = [pad(d.getHours()),
                          pad(d.getMinutes()),
                          pad(d.getSeconds())].join(':');
              return [d.getDate(), months[d.getMonth()], time].join(' ');
            }


            // log is just a thin wrapper to console.log that prepends a timestamp
            exports.log = function() {
              console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
            };


            /**
             * Inherit the prototype methods from one constructor into another.
             *
             * The Function.prototype.inherits from lang.js rewritten as a standalone
             * function (not on Function.prototype). NOTE: If this file is to be loaded
             * during bootstrapping this function needs to be rewritten using some native
             * functions as prototype setup using normal JavaScript does not work as
             * expected during bootstrapping (see mirror.js in r114903).
             *
             * @param {function} ctor Constructor function which needs to inherit the
             *     prototype.
             * @param {function} superCtor Constructor function to inherit prototype from.
             */
            exports.inherits = inherits_browser;

            exports._extend = function(origin, add) {
              // Don't do anything if add isn't an object
              if (!add || !isObject(add)) return origin;

              var keys = Object.keys(add);
              var i = keys.length;
              while (i--) {
                origin[keys[i]] = add[keys[i]];
              }
              return origin;
            };

            function hasOwnProperty(obj, prop) {
              return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            });
            var util_1 = util.format;
            var util_2 = util.deprecate;
            var util_3 = util.debuglog;
            var util_4 = util.inspect;
            var util_5 = util.isArray;
            var util_6 = util.isBoolean;
            var util_7 = util.isNull;
            var util_8 = util.isNullOrUndefined;
            var util_9 = util.isNumber;
            var util_10 = util.isString;
            var util_11 = util.isSymbol;
            var util_12 = util.isUndefined;
            var util_13 = util.isRegExp;
            var util_14 = util.isObject;
            var util_15 = util.isDate;
            var util_16 = util.isError;
            var util_17 = util.isFunction;
            var util_18 = util.isPrimitive;
            var util_19 = util.isBuffer;
            var util_20 = util.log;
            var util_21 = util.inherits;
            var util_22 = util._extend;

            // Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.

            function EventEmitter() {
              this._events = this._events || {};
              this._maxListeners = this._maxListeners || undefined;
            }
            var events = EventEmitter;

            // Backwards-compat with node 0.10.x
            EventEmitter.EventEmitter = EventEmitter;

            EventEmitter.prototype._events = undefined;
            EventEmitter.prototype._maxListeners = undefined;

            // By default EventEmitters will print a warning if more than 10 listeners are
            // added to it. This is a useful default which helps finding memory leaks.
            EventEmitter.defaultMaxListeners = 10;

            // Obviously not all Emitters should be limited to 10. This function allows
            // that to be increased. Set to zero for unlimited.
            EventEmitter.prototype.setMaxListeners = function(n) {
              if (!isNumber$1(n) || n < 0 || isNaN(n))
                throw TypeError('n must be a positive number');
              this._maxListeners = n;
              return this;
            };

            EventEmitter.prototype.emit = function(type) {
              var er, handler, len, args, i, listeners;

              if (!this._events)
                this._events = {};

              // If there is no 'error' event listener then throw.
              if (type === 'error') {
                if (!this._events.error ||
                    (isObject$1(this._events.error) && !this._events.error.length)) {
                  er = arguments[1];
                  if (er instanceof Error) {
                    throw er; // Unhandled 'error' event
                  } else {
                    // At least give some kind of context to the user
                    var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
                    err.context = er;
                    throw err;
                  }
                }
              }

              handler = this._events[type];

              if (isUndefined$1(handler))
                return false;

              if (isFunction$1(handler)) {
                switch (arguments.length) {
                  // fast cases
                  case 1:
                    handler.call(this);
                    break;
                  case 2:
                    handler.call(this, arguments[1]);
                    break;
                  case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                  // slower
                  default:
                    args = Array.prototype.slice.call(arguments, 1);
                    handler.apply(this, args);
                }
              } else if (isObject$1(handler)) {
                args = Array.prototype.slice.call(arguments, 1);
                listeners = handler.slice();
                len = listeners.length;
                for (i = 0; i < len; i++)
                  listeners[i].apply(this, args);
              }

              return true;
            };

            EventEmitter.prototype.addListener = function(type, listener) {
              var m;

              if (!isFunction$1(listener))
                throw TypeError('listener must be a function');

              if (!this._events)
                this._events = {};

              // To avoid recursion in the case that type === "newListener"! Before
              // adding it to the listeners, first emit "newListener".
              if (this._events.newListener)
                this.emit('newListener', type,
                          isFunction$1(listener.listener) ?
                          listener.listener : listener);

              if (!this._events[type])
                // Optimize the case of one listener. Don't need the extra array object.
                this._events[type] = listener;
              else if (isObject$1(this._events[type]))
                // If we've already got an array, just append.
                this._events[type].push(listener);
              else
                // Adding the second element, need to change to array.
                this._events[type] = [this._events[type], listener];

              // Check for listener leak
              if (isObject$1(this._events[type]) && !this._events[type].warned) {
                if (!isUndefined$1(this._maxListeners)) {
                  m = this._maxListeners;
                } else {
                  m = EventEmitter.defaultMaxListeners;
                }

                if (m && m > 0 && this._events[type].length > m) {
                  this._events[type].warned = true;
                  console.error('(node) warning: possible EventEmitter memory ' +
                                'leak detected. %d listeners added. ' +
                                'Use emitter.setMaxListeners() to increase limit.',
                                this._events[type].length);
                  if (typeof console.trace === 'function') {
                    // not supported in IE 10
                    console.trace();
                  }
                }
              }

              return this;
            };

            EventEmitter.prototype.on = EventEmitter.prototype.addListener;

            EventEmitter.prototype.once = function(type, listener) {
              if (!isFunction$1(listener))
                throw TypeError('listener must be a function');

              var fired = false;

              function g() {
                this.removeListener(type, g);

                if (!fired) {
                  fired = true;
                  listener.apply(this, arguments);
                }
              }

              g.listener = listener;
              this.on(type, g);

              return this;
            };

            // emits a 'removeListener' event iff the listener was removed
            EventEmitter.prototype.removeListener = function(type, listener) {
              var list, position, length, i;

              if (!isFunction$1(listener))
                throw TypeError('listener must be a function');

              if (!this._events || !this._events[type])
                return this;

              list = this._events[type];
              length = list.length;
              position = -1;

              if (list === listener ||
                  (isFunction$1(list.listener) && list.listener === listener)) {
                delete this._events[type];
                if (this._events.removeListener)
                  this.emit('removeListener', type, listener);

              } else if (isObject$1(list)) {
                for (i = length; i-- > 0;) {
                  if (list[i] === listener ||
                      (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                  }
                }

                if (position < 0)
                  return this;

                if (list.length === 1) {
                  list.length = 0;
                  delete this._events[type];
                } else {
                  list.splice(position, 1);
                }

                if (this._events.removeListener)
                  this.emit('removeListener', type, listener);
              }

              return this;
            };

            EventEmitter.prototype.removeAllListeners = function(type) {
              var key, listeners;

              if (!this._events)
                return this;

              // not listening for removeListener, no need to emit
              if (!this._events.removeListener) {
                if (arguments.length === 0)
                  this._events = {};
                else if (this._events[type])
                  delete this._events[type];
                return this;
              }

              // emit removeListener for all listeners on all events
              if (arguments.length === 0) {
                for (key in this._events) {
                  if (key === 'removeListener') continue;
                  this.removeAllListeners(key);
                }
                this.removeAllListeners('removeListener');
                this._events = {};
                return this;
              }

              listeners = this._events[type];

              if (isFunction$1(listeners)) {
                this.removeListener(type, listeners);
              } else if (listeners) {
                // LIFO order
                while (listeners.length)
                  this.removeListener(type, listeners[listeners.length - 1]);
              }
              delete this._events[type];

              return this;
            };

            EventEmitter.prototype.listeners = function(type) {
              var ret;
              if (!this._events || !this._events[type])
                ret = [];
              else if (isFunction$1(this._events[type]))
                ret = [this._events[type]];
              else
                ret = this._events[type].slice();
              return ret;
            };

            EventEmitter.prototype.listenerCount = function(type) {
              if (this._events) {
                var evlistener = this._events[type];

                if (isFunction$1(evlistener))
                  return 1;
                else if (evlistener)
                  return evlistener.length;
              }
              return 0;
            };

            EventEmitter.listenerCount = function(emitter, type) {
              return emitter.listenerCount(type);
            };

            function isFunction$1(arg) {
              return typeof arg === 'function';
            }

            function isNumber$1(arg) {
              return typeof arg === 'number';
            }

            function isObject$1(arg) {
              return typeof arg === 'object' && arg !== null;
            }

            function isUndefined$1(arg) {
              return arg === void 0;
            }

            /**
             * A DerivedHelper is a way to create sub requests to
             * Algolia from a main helper.
             * @class
             * @classdesc The DerivedHelper provides an event based interface for search callbacks:
             *  - search: when a search is triggered using the `search()` method.
             *  - result: when the response is retrieved from Algolia and is processed.
             *    This event contains a {@link SearchResults} object and the
             *    {@link SearchParameters} corresponding to this answer.
             */
            function DerivedHelper(mainHelper, fn) {
              this.main = mainHelper;
              this.fn = fn;
              this.lastResults = null;
            }

            util.inherits(DerivedHelper, events.EventEmitter);

            /**
             * Detach this helper from the main helper
             * @return {undefined}
             * @throws Error if the derived helper is already detached
             */
            DerivedHelper.prototype.detach = function() {
              this.removeAllListeners();
              this.main.detachDerivedHelper(this);
            };

            DerivedHelper.prototype.getModifiedState = function(parameters) {
              return this.fn(parameters);
            };

            var DerivedHelper_1 = DerivedHelper;

            var requestBuilder = {
              /**
               * Get all the queries to send to the client, those queries can used directly
               * with the Algolia client.
               * @private
               * @return {object[]} The queries
               */
              _getQueries: function getQueries(index, state) {
                var queries = [];

                // One query for the hits
                queries.push({
                  indexName: index,
                  params: requestBuilder._getHitsSearchParams(state)
                });

                // One for each disjunctive facets
                forEach_1(state.getRefinedDisjunctiveFacets(), function(refinedFacet) {
                  queries.push({
                    indexName: index,
                    params: requestBuilder._getDisjunctiveFacetSearchParams(state, refinedFacet)
                  });
                });

                // maybe more to get the root level of hierarchical facets when activated
                forEach_1(state.getRefinedHierarchicalFacets(), function(refinedFacet) {
                  var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);

                  var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
                  // if we are deeper than level 0 (starting from `beer > IPA`)
                  // we want to get the root values
                  var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
                  if (currentRefinement.length > 0 && currentRefinement[0].split(separator).length > 1) {
                    queries.push({
                      indexName: index,
                      params: requestBuilder._getDisjunctiveFacetSearchParams(state, refinedFacet, true)
                    });
                  }
                });

                return queries;
              },

              /**
               * Build search parameters used to fetch hits
               * @private
               * @return {object.<string, any>}
               */
              _getHitsSearchParams: function(state) {
                var facets = state.facets
                  .concat(state.disjunctiveFacets)
                  .concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state));


                var facetFilters = requestBuilder._getFacetFilters(state);
                var numericFilters = requestBuilder._getNumericFilters(state);
                var tagFilters = requestBuilder._getTagFilters(state);
                var additionalParams = {
                  facets: facets,
                  tagFilters: tagFilters
                };

                if (facetFilters.length > 0) {
                  additionalParams.facetFilters = facetFilters;
                }

                if (numericFilters.length > 0) {
                  additionalParams.numericFilters = numericFilters;
                }

                return merge_1(state.getQueryParams(), additionalParams);
              },

              /**
               * Build search parameters used to fetch a disjunctive facet
               * @private
               * @param  {string} facet the associated facet name
               * @param  {boolean} hierarchicalRootLevel ?? FIXME
               * @return {object}
               */
              _getDisjunctiveFacetSearchParams: function(state, facet, hierarchicalRootLevel) {
                var facetFilters = requestBuilder._getFacetFilters(state, facet, hierarchicalRootLevel);
                var numericFilters = requestBuilder._getNumericFilters(state, facet);
                var tagFilters = requestBuilder._getTagFilters(state);
                var additionalParams = {
                  hitsPerPage: 1,
                  page: 0,
                  attributesToRetrieve: [],
                  attributesToHighlight: [],
                  attributesToSnippet: [],
                  tagFilters: tagFilters,
                  analytics: false,
                  clickAnalytics: false
                };

                var hierarchicalFacet = state.getHierarchicalFacetByName(facet);

                if (hierarchicalFacet) {
                  additionalParams.facets = requestBuilder._getDisjunctiveHierarchicalFacetAttribute(
                    state,
                    hierarchicalFacet,
                    hierarchicalRootLevel
                  );
                } else {
                  additionalParams.facets = facet;
                }

                if (numericFilters.length > 0) {
                  additionalParams.numericFilters = numericFilters;
                }

                if (facetFilters.length > 0) {
                  additionalParams.facetFilters = facetFilters;
                }

                return merge_1(state.getQueryParams(), additionalParams);
              },

              /**
               * Return the numeric filters in an algolia request fashion
               * @private
               * @param {string} [facetName] the name of the attribute for which the filters should be excluded
               * @return {string[]} the numeric filters in the algolia format
               */
              _getNumericFilters: function(state, facetName) {
                if (state.numericFilters) {
                  return state.numericFilters;
                }

                var numericFilters = [];

                forEach_1(state.numericRefinements, function(operators, attribute) {
                  forEach_1(operators, function(values, operator) {
                    if (facetName !== attribute) {
                      forEach_1(values, function(value) {
                        if (Array.isArray(value)) {
                          var vs = map_1(value, function(v) {
                            return attribute + operator + v;
                          });
                          numericFilters.push(vs);
                        } else {
                          numericFilters.push(attribute + operator + value);
                        }
                      });
                    }
                  });
                });

                return numericFilters;
              },

              /**
               * Return the tags filters depending
               * @private
               * @return {string}
               */
              _getTagFilters: function(state) {
                if (state.tagFilters) {
                  return state.tagFilters;
                }

                return state.tagRefinements.join(',');
              },


              /**
               * Build facetFilters parameter based on current refinements. The array returned
               * contains strings representing the facet filters in the algolia format.
               * @private
               * @param  {string} [facet] if set, the current disjunctive facet
               * @return {array.<string>}
               */
              _getFacetFilters: function(state, facet, hierarchicalRootLevel) {
                var facetFilters = [];

                forEach_1(state.facetsRefinements, function(facetValues, facetName) {
                  forEach_1(facetValues, function(facetValue) {
                    facetFilters.push(facetName + ':' + facetValue);
                  });
                });

                forEach_1(state.facetsExcludes, function(facetValues, facetName) {
                  forEach_1(facetValues, function(facetValue) {
                    facetFilters.push(facetName + ':-' + facetValue);
                  });
                });

                forEach_1(state.disjunctiveFacetsRefinements, function(facetValues, facetName) {
                  if (facetName === facet || !facetValues || facetValues.length === 0) return;
                  var orFilters = [];

                  forEach_1(facetValues, function(facetValue) {
                    orFilters.push(facetName + ':' + facetValue);
                  });

                  facetFilters.push(orFilters);
                });

                forEach_1(state.hierarchicalFacetsRefinements, function(facetValues, facetName) {
                  var facetValue = facetValues[0];

                  if (facetValue === undefined) {
                    return;
                  }

                  var hierarchicalFacet = state.getHierarchicalFacetByName(facetName);
                  var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
                  var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
                  var attributeToRefine;
                  var attributesIndex;

                  // we ask for parent facet values only when the `facet` is the current hierarchical facet
                  if (facet === facetName) {
                    // if we are at the root level already, no need to ask for facet values, we get them from
                    // the hits query
                    if (facetValue.indexOf(separator) === -1 || (!rootPath && hierarchicalRootLevel === true) ||
                      (rootPath && rootPath.split(separator).length === facetValue.split(separator).length)) {
                      return;
                    }

                    if (!rootPath) {
                      attributesIndex = facetValue.split(separator).length - 2;
                      facetValue = facetValue.slice(0, facetValue.lastIndexOf(separator));
                    } else {
                      attributesIndex = rootPath.split(separator).length - 1;
                      facetValue = rootPath;
                    }

                    attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
                  } else {
                    attributesIndex = facetValue.split(separator).length - 1;

                    attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
                  }

                  if (attributeToRefine) {
                    facetFilters.push([attributeToRefine + ':' + facetValue]);
                  }
                });

                return facetFilters;
              },

              _getHitsHierarchicalFacetsAttributes: function(state) {
                var out = [];

                return reduce_1(
                  state.hierarchicalFacets,
                  // ask for as much levels as there's hierarchical refinements
                  function getHitsAttributesForHierarchicalFacet(allAttributes, hierarchicalFacet) {
                    var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0];

                    // if no refinement, ask for root level
                    if (!hierarchicalRefinement) {
                      allAttributes.push(hierarchicalFacet.attributes[0]);
                      return allAttributes;
                    }

                    var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
                    var level = hierarchicalRefinement.split(separator).length;
                    var newAttributes = hierarchicalFacet.attributes.slice(0, level + 1);

                    return allAttributes.concat(newAttributes);
                  }, out);
              },

              _getDisjunctiveHierarchicalFacetAttribute: function(state, hierarchicalFacet, rootLevel) {
                var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
                if (rootLevel === true) {
                  var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
                  var attributeIndex = 0;

                  if (rootPath) {
                    attributeIndex = rootPath.split(separator).length;
                  }
                  return [hierarchicalFacet.attributes[attributeIndex]];
                }

                var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0] || '';
                // if refinement is 'beers > IPA > Flying dog',
                // then we want `facets: ['beers > IPA']` as disjunctive facet (parent level values)

                var parentLevel = hierarchicalRefinement.split(separator).length - 1;
                return hierarchicalFacet.attributes.slice(0, parentLevel + 1);
              },

              getSearchForFacetQuery: function(facetName, query, maxFacetHits, state) {
                var stateForSearchForFacetValues = state.isDisjunctiveFacet(facetName) ?
                  state.clearRefinements(facetName) :
                  state;
                var searchForFacetSearchParameters = {
                  facetQuery: query,
                  facetName: facetName
                };
                if (typeof maxFacetHits === 'number') {
                  searchForFacetSearchParameters.maxFacetHits = maxFacetHits;
                }
                var queries = merge_1(requestBuilder._getHitsSearchParams(stateForSearchForFacetValues), searchForFacetSearchParameters);
                return queries;
              }
            };

            var requestBuilder_1 = requestBuilder;

            /**
             * The base implementation of `_.invert` and `_.invertBy` which inverts
             * `object` with values transformed by `iteratee` and set by `setter`.
             *
             * @private
             * @param {Object} object The object to iterate over.
             * @param {Function} setter The function to set `accumulator` values.
             * @param {Function} iteratee The iteratee to transform values.
             * @param {Object} accumulator The initial inverted object.
             * @returns {Function} Returns `accumulator`.
             */
            function baseInverter(object, setter, iteratee, accumulator) {
              _baseForOwn(object, function(value, key, object) {
                setter(accumulator, iteratee(value), key, object);
              });
              return accumulator;
            }

            var _baseInverter = baseInverter;

            /**
             * Creates a function like `_.invertBy`.
             *
             * @private
             * @param {Function} setter The function to set accumulator values.
             * @param {Function} toIteratee The function to resolve iteratees.
             * @returns {Function} Returns the new inverter function.
             */
            function createInverter(setter, toIteratee) {
              return function(object, iteratee) {
                return _baseInverter(object, setter, toIteratee(iteratee), {});
              };
            }

            var _createInverter = createInverter;

            /** Used for built-in method references. */
            var objectProto$k = Object.prototype;

            /**
             * Used to resolve the
             * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
             * of values.
             */
            var nativeObjectToString$2 = objectProto$k.toString;

            /**
             * Creates an object composed of the inverted keys and values of `object`.
             * If `object` contains duplicate values, subsequent values overwrite
             * property assignments of previous values.
             *
             * @static
             * @memberOf _
             * @since 0.7.0
             * @category Object
             * @param {Object} object The object to invert.
             * @returns {Object} Returns the new inverted object.
             * @example
             *
             * var object = { 'a': 1, 'b': 2, 'c': 1 };
             *
             * _.invert(object);
             * // => { '1': 'c', '2': 'b' }
             */
            var invert = _createInverter(function(result, value, key) {
              if (value != null &&
                  typeof value.toString != 'function') {
                value = nativeObjectToString$2.call(value);
              }

              result[value] = key;
            }, constant_1(identity_1));

            var invert_1 = invert;

            var keys2Short = {
              advancedSyntax: 'aS',
              allowTyposOnNumericTokens: 'aTONT',
              analyticsTags: 'aT',
              analytics: 'a',
              aroundLatLngViaIP: 'aLLVIP',
              aroundLatLng: 'aLL',
              aroundPrecision: 'aP',
              aroundRadius: 'aR',
              attributesToHighlight: 'aTH',
              attributesToRetrieve: 'aTR',
              attributesToSnippet: 'aTS',
              disjunctiveFacetsRefinements: 'dFR',
              disjunctiveFacets: 'dF',
              distinct: 'd',
              facetsExcludes: 'fE',
              facetsRefinements: 'fR',
              facets: 'f',
              getRankingInfo: 'gRI',
              hierarchicalFacetsRefinements: 'hFR',
              hierarchicalFacets: 'hF',
              highlightPostTag: 'hPoT',
              highlightPreTag: 'hPrT',
              hitsPerPage: 'hPP',
              ignorePlurals: 'iP',
              index: 'idx',
              insideBoundingBox: 'iBB',
              insidePolygon: 'iPg',
              length: 'l',
              maxValuesPerFacet: 'mVPF',
              minimumAroundRadius: 'mAR',
              minProximity: 'mP',
              minWordSizefor1Typo: 'mWS1T',
              minWordSizefor2Typos: 'mWS2T',
              numericFilters: 'nF',
              numericRefinements: 'nR',
              offset: 'o',
              optionalWords: 'oW',
              page: 'p',
              queryType: 'qT',
              query: 'q',
              removeWordsIfNoResults: 'rWINR',
              replaceSynonymsInHighlight: 'rSIH',
              restrictSearchableAttributes: 'rSA',
              synonyms: 's',
              tagFilters: 'tF',
              tagRefinements: 'tR',
              typoTolerance: 'tT',
              optionalTagFilters: 'oTF',
              optionalFacetFilters: 'oFF',
              snippetEllipsisText: 'sET',
              disableExactOnAttributes: 'dEOA',
              enableExactOnSingleWordQuery: 'eEOSWQ'
            };

            var short2Keys = invert_1(keys2Short);

            var shortener = {
              /**
               * All the keys of the state, encoded.
               * @const
               */
              ENCODED_PARAMETERS: keys_1(short2Keys),
              /**
               * Decode a shorten attribute
               * @param {string} shortKey the shorten attribute
               * @return {string} the decoded attribute, undefined otherwise
               */
              decode: function(shortKey) {
                return short2Keys[shortKey];
              },
              /**
               * Encode an attribute into a short version
               * @param {string} key the attribute
               * @return {string} the shorten attribute
               */
              encode: function(key) {
                return keys2Short[key];
              }
            };

            var utils = createCommonjsModule(function (module, exports) {

            var has = Object.prototype.hasOwnProperty;

            var hexTable = (function () {
                var array = [];
                for (var i = 0; i < 256; ++i) {
                    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
                }

                return array;
            }());

            var compactQueue = function compactQueue(queue) {
                var obj;

                while (queue.length) {
                    var item = queue.pop();
                    obj = item.obj[item.prop];

                    if (Array.isArray(obj)) {
                        var compacted = [];

                        for (var j = 0; j < obj.length; ++j) {
                            if (typeof obj[j] !== 'undefined') {
                                compacted.push(obj[j]);
                            }
                        }

                        item.obj[item.prop] = compacted;
                    }
                }

                return obj;
            };

            exports.arrayToObject = function arrayToObject(source, options) {
                var obj = options && options.plainObjects ? Object.create(null) : {};
                for (var i = 0; i < source.length; ++i) {
                    if (typeof source[i] !== 'undefined') {
                        obj[i] = source[i];
                    }
                }

                return obj;
            };

            exports.merge = function merge(target, source, options) {
                if (!source) {
                    return target;
                }

                if (typeof source !== 'object') {
                    if (Array.isArray(target)) {
                        target.push(source);
                    } else if (typeof target === 'object') {
                        if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                            target[source] = true;
                        }
                    } else {
                        return [target, source];
                    }

                    return target;
                }

                if (typeof target !== 'object') {
                    return [target].concat(source);
                }

                var mergeTarget = target;
                if (Array.isArray(target) && !Array.isArray(source)) {
                    mergeTarget = exports.arrayToObject(target, options);
                }

                if (Array.isArray(target) && Array.isArray(source)) {
                    source.forEach(function (item, i) {
                        if (has.call(target, i)) {
                            if (target[i] && typeof target[i] === 'object') {
                                target[i] = exports.merge(target[i], item, options);
                            } else {
                                target.push(item);
                            }
                        } else {
                            target[i] = item;
                        }
                    });
                    return target;
                }

                return Object.keys(source).reduce(function (acc, key) {
                    var value = source[key];

                    if (has.call(acc, key)) {
                        acc[key] = exports.merge(acc[key], value, options);
                    } else {
                        acc[key] = value;
                    }
                    return acc;
                }, mergeTarget);
            };

            exports.assign = function assignSingleSource(target, source) {
                return Object.keys(source).reduce(function (acc, key) {
                    acc[key] = source[key];
                    return acc;
                }, target);
            };

            exports.decode = function (str) {
                try {
                    return decodeURIComponent(str.replace(/\+/g, ' '));
                } catch (e) {
                    return str;
                }
            };

            exports.encode = function encode(str) {
                // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
                // It has been adapted here for stricter adherence to RFC 3986
                if (str.length === 0) {
                    return str;
                }

                var string = typeof str === 'string' ? str : String(str);

                var out = '';
                for (var i = 0; i < string.length; ++i) {
                    var c = string.charCodeAt(i);

                    if (
                        c === 0x2D // -
                        || c === 0x2E // .
                        || c === 0x5F // _
                        || c === 0x7E // ~
                        || (c >= 0x30 && c <= 0x39) // 0-9
                        || (c >= 0x41 && c <= 0x5A) // a-z
                        || (c >= 0x61 && c <= 0x7A) // A-Z
                    ) {
                        out += string.charAt(i);
                        continue;
                    }

                    if (c < 0x80) {
                        out = out + hexTable[c];
                        continue;
                    }

                    if (c < 0x800) {
                        out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
                        continue;
                    }

                    if (c < 0xD800 || c >= 0xE000) {
                        out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
                        continue;
                    }

                    i += 1;
                    c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
                    out += hexTable[0xF0 | (c >> 18)]
                        + hexTable[0x80 | ((c >> 12) & 0x3F)]
                        + hexTable[0x80 | ((c >> 6) & 0x3F)]
                        + hexTable[0x80 | (c & 0x3F)];
                }

                return out;
            };

            exports.compact = function compact(value) {
                var queue = [{ obj: { o: value }, prop: 'o' }];
                var refs = [];

                for (var i = 0; i < queue.length; ++i) {
                    var item = queue[i];
                    var obj = item.obj[item.prop];

                    var keys = Object.keys(obj);
                    for (var j = 0; j < keys.length; ++j) {
                        var key = keys[j];
                        var val = obj[key];
                        if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                            queue.push({ obj: obj, prop: key });
                            refs.push(val);
                        }
                    }
                }

                return compactQueue(queue);
            };

            exports.isRegExp = function isRegExp(obj) {
                return Object.prototype.toString.call(obj) === '[object RegExp]';
            };

            exports.isBuffer = function isBuffer(obj) {
                if (obj === null || typeof obj === 'undefined') {
                    return false;
                }

                return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
            };
            });
            var utils_1 = utils.arrayToObject;
            var utils_2 = utils.merge;
            var utils_3 = utils.assign;
            var utils_4 = utils.decode;
            var utils_5 = utils.encode;
            var utils_6 = utils.compact;
            var utils_7 = utils.isRegExp;
            var utils_8 = utils.isBuffer;

            var replace = String.prototype.replace;
            var percentTwenties = /%20/g;

            var formats = {
                'default': 'RFC3986',
                formatters: {
                    RFC1738: function (value) {
                        return replace.call(value, percentTwenties, '+');
                    },
                    RFC3986: function (value) {
                        return value;
                    }
                },
                RFC1738: 'RFC1738',
                RFC3986: 'RFC3986'
            };

            var arrayPrefixGenerators = {
                brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
                    return prefix + '[]';
                },
                indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
                    return prefix + '[' + key + ']';
                },
                repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
                    return prefix;
                }
            };

            var toISO = Date.prototype.toISOString;

            var defaults$1 = {
                delimiter: '&',
                encode: true,
                encoder: utils.encode,
                encodeValuesOnly: false,
                serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
                    return toISO.call(date);
                },
                skipNulls: false,
                strictNullHandling: false
            };

            var stringify = function stringify( // eslint-disable-line func-name-matching
                object,
                prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ) {
                var obj = object;
                if (typeof filter === 'function') {
                    obj = filter(prefix, obj);
                } else if (obj instanceof Date) {
                    obj = serializeDate(obj);
                } else if (obj === null) {
                    if (strictNullHandling) {
                        return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder) : prefix;
                    }

                    obj = '';
                }

                if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
                    if (encoder) {
                        var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder);
                        return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$1.encoder))];
                    }
                    return [formatter(prefix) + '=' + formatter(String(obj))];
                }

                var values = [];

                if (typeof obj === 'undefined') {
                    return values;
                }

                var objKeys;
                if (Array.isArray(filter)) {
                    objKeys = filter;
                } else {
                    var keys = Object.keys(obj);
                    objKeys = sort ? keys.sort(sort) : keys;
                }

                for (var i = 0; i < objKeys.length; ++i) {
                    var key = objKeys[i];

                    if (skipNulls && obj[key] === null) {
                        continue;
                    }

                    if (Array.isArray(obj)) {
                        values = values.concat(stringify(
                            obj[key],
                            generateArrayPrefix(prefix, key),
                            generateArrayPrefix,
                            strictNullHandling,
                            skipNulls,
                            encoder,
                            filter,
                            sort,
                            allowDots,
                            serializeDate,
                            formatter,
                            encodeValuesOnly
                        ));
                    } else {
                        values = values.concat(stringify(
                            obj[key],
                            prefix + (allowDots ? '.' + key : '[' + key + ']'),
                            generateArrayPrefix,
                            strictNullHandling,
                            skipNulls,
                            encoder,
                            filter,
                            sort,
                            allowDots,
                            serializeDate,
                            formatter,
                            encodeValuesOnly
                        ));
                    }
                }

                return values;
            };

            var stringify_1 = function (object, opts) {
                var obj = object;
                var options = opts ? utils.assign({}, opts) : {};

                if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
                    throw new TypeError('Encoder has to be a function.');
                }

                var delimiter = typeof options.delimiter === 'undefined' ? defaults$1.delimiter : options.delimiter;
                var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults$1.strictNullHandling;
                var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults$1.skipNulls;
                var encode = typeof options.encode === 'boolean' ? options.encode : defaults$1.encode;
                var encoder = typeof options.encoder === 'function' ? options.encoder : defaults$1.encoder;
                var sort = typeof options.sort === 'function' ? options.sort : null;
                var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
                var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults$1.serializeDate;
                var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults$1.encodeValuesOnly;
                if (typeof options.format === 'undefined') {
                    options.format = formats['default'];
                } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
                    throw new TypeError('Unknown format option provided.');
                }
                var formatter = formats.formatters[options.format];
                var objKeys;
                var filter;

                if (typeof options.filter === 'function') {
                    filter = options.filter;
                    obj = filter('', obj);
                } else if (Array.isArray(options.filter)) {
                    filter = options.filter;
                    objKeys = filter;
                }

                var keys = [];

                if (typeof obj !== 'object' || obj === null) {
                    return '';
                }

                var arrayFormat;
                if (options.arrayFormat in arrayPrefixGenerators) {
                    arrayFormat = options.arrayFormat;
                } else if ('indices' in options) {
                    arrayFormat = options.indices ? 'indices' : 'repeat';
                } else {
                    arrayFormat = 'indices';
                }

                var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

                if (!objKeys) {
                    objKeys = Object.keys(obj);
                }

                if (sort) {
                    objKeys.sort(sort);
                }

                for (var i = 0; i < objKeys.length; ++i) {
                    var key = objKeys[i];

                    if (skipNulls && obj[key] === null) {
                        continue;
                    }

                    keys = keys.concat(stringify(
                        obj[key],
                        key,
                        generateArrayPrefix,
                        strictNullHandling,
                        skipNulls,
                        encode ? encoder : null,
                        filter,
                        sort,
                        allowDots,
                        serializeDate,
                        formatter,
                        encodeValuesOnly
                    ));
                }

                var joined = keys.join(delimiter);
                var prefix = options.addQueryPrefix === true ? '?' : '';

                return joined.length > 0 ? prefix + joined : '';
            };

            var has = Object.prototype.hasOwnProperty;

            var defaults$2 = {
                allowDots: false,
                allowPrototypes: false,
                arrayLimit: 20,
                decoder: utils.decode,
                delimiter: '&',
                depth: 5,
                parameterLimit: 1000,
                plainObjects: false,
                strictNullHandling: false
            };

            var parseValues = function parseQueryStringValues(str, options) {
                var obj = {};
                var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
                var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
                var parts = cleanStr.split(options.delimiter, limit);

                for (var i = 0; i < parts.length; ++i) {
                    var part = parts[i];

                    var bracketEqualsPos = part.indexOf(']=');
                    var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

                    var key, val;
                    if (pos === -1) {
                        key = options.decoder(part, defaults$2.decoder);
                        val = options.strictNullHandling ? null : '';
                    } else {
                        key = options.decoder(part.slice(0, pos), defaults$2.decoder);
                        val = options.decoder(part.slice(pos + 1), defaults$2.decoder);
                    }
                    if (has.call(obj, key)) {
                        obj[key] = [].concat(obj[key]).concat(val);
                    } else {
                        obj[key] = val;
                    }
                }

                return obj;
            };

            var parseObject = function (chain, val, options) {
                var leaf = val;

                for (var i = chain.length - 1; i >= 0; --i) {
                    var obj;
                    var root = chain[i];

                    if (root === '[]') {
                        obj = [];
                        obj = obj.concat(leaf);
                    } else {
                        obj = options.plainObjects ? Object.create(null) : {};
                        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
                        var index = parseInt(cleanRoot, 10);
                        if (
                            !isNaN(index)
                            && root !== cleanRoot
                            && String(index) === cleanRoot
                            && index >= 0
                            && (options.parseArrays && index <= options.arrayLimit)
                        ) {
                            obj = [];
                            obj[index] = leaf;
                        } else {
                            obj[cleanRoot] = leaf;
                        }
                    }

                    leaf = obj;
                }

                return leaf;
            };

            var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
                if (!givenKey) {
                    return;
                }

                // Transform dot notation to bracket notation
                var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

                // The regex chunks

                var brackets = /(\[[^[\]]*])/;
                var child = /(\[[^[\]]*])/g;

                // Get the parent

                var segment = brackets.exec(key);
                var parent = segment ? key.slice(0, segment.index) : key;

                // Stash the parent if it exists

                var keys = [];
                if (parent) {
                    // If we aren't using plain objects, optionally prefix keys
                    // that would overwrite object prototype properties
                    if (!options.plainObjects && has.call(Object.prototype, parent)) {
                        if (!options.allowPrototypes) {
                            return;
                        }
                    }

                    keys.push(parent);
                }

                // Loop through children appending to the array until we hit depth

                var i = 0;
                while ((segment = child.exec(key)) !== null && i < options.depth) {
                    i += 1;
                    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
                        if (!options.allowPrototypes) {
                            return;
                        }
                    }
                    keys.push(segment[1]);
                }

                // If there's a remainder, just add whatever is left

                if (segment) {
                    keys.push('[' + key.slice(segment.index) + ']');
                }

                return parseObject(keys, val, options);
            };

            var parse = function (str, opts) {
                var options = opts ? utils.assign({}, opts) : {};

                if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
                    throw new TypeError('Decoder has to be a function.');
                }

                options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
                options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults$2.delimiter;
                options.depth = typeof options.depth === 'number' ? options.depth : defaults$2.depth;
                options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults$2.arrayLimit;
                options.parseArrays = options.parseArrays !== false;
                options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults$2.decoder;
                options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults$2.allowDots;
                options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults$2.plainObjects;
                options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults$2.allowPrototypes;
                options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults$2.parameterLimit;
                options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults$2.strictNullHandling;

                if (str === '' || str === null || typeof str === 'undefined') {
                    return options.plainObjects ? Object.create(null) : {};
                }

                var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
                var obj = options.plainObjects ? Object.create(null) : {};

                // Iterate over the keys and setup the new object

                var keys = Object.keys(tempObj);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    var newObj = parseKeys(key, tempObj[key], options);
                    obj = utils.merge(obj, newObj, options);
                }

                return utils.compact(obj);
            };

            var lib$1 = {
                formats: formats,
                parse: parse,
                stringify: stringify_1
            };

            /** Used to compose bitmasks for function metadata. */
            var WRAP_BIND_FLAG$7 = 1,
                WRAP_PARTIAL_FLAG$4 = 32;

            /**
             * Creates a function that invokes `func` with the `this` binding of `thisArg`
             * and `partials` prepended to the arguments it receives.
             *
             * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
             * may be used as a placeholder for partially applied arguments.
             *
             * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
             * property of bound functions.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Function
             * @param {Function} func The function to bind.
             * @param {*} thisArg The `this` binding of `func`.
             * @param {...*} [partials] The arguments to be partially applied.
             * @returns {Function} Returns the new bound function.
             * @example
             *
             * function greet(greeting, punctuation) {
             *   return greeting + ' ' + this.user + punctuation;
             * }
             *
             * var object = { 'user': 'fred' };
             *
             * var bound = _.bind(greet, object, 'hi');
             * bound('!');
             * // => 'hi fred!'
             *
             * // Bound with placeholders.
             * var bound = _.bind(greet, object, _, '!');
             * bound('hi');
             * // => 'hi fred!'
             */
            var bind = _baseRest(function(func, thisArg, partials) {
              var bitmask = WRAP_BIND_FLAG$7;
              if (partials.length) {
                var holders = _replaceHolders(partials, _getHolder(bind));
                bitmask |= WRAP_PARTIAL_FLAG$4;
              }
              return _createWrap(func, bitmask, thisArg, partials, holders);
            });

            // Assign default placeholders.
            bind.placeholder = {};

            var bind_1 = bind;

            /**
             * The base implementation of `_.pick` without support for individual
             * property identifiers.
             *
             * @private
             * @param {Object} object The source object.
             * @param {string[]} paths The property paths to pick.
             * @returns {Object} Returns the new object.
             */
            function basePick(object, paths) {
              return _basePickBy(object, paths, function(value, path) {
                return hasIn_1(object, path);
              });
            }

            var _basePick = basePick;

            /**
             * Creates an object composed of the picked `object` properties.
             *
             * @static
             * @since 0.1.0
             * @memberOf _
             * @category Object
             * @param {Object} object The source object.
             * @param {...(string|string[])} [paths] The property paths to pick.
             * @returns {Object} Returns the new object.
             * @example
             *
             * var object = { 'a': 1, 'b': '2', 'c': 3 };
             *
             * _.pick(object, ['a', 'c']);
             * // => { 'a': 1, 'c': 3 }
             */
            var pick = _flatRest(function(object, paths) {
              return object == null ? {} : _basePick(object, paths);
            });

            var pick_1 = pick;

            /**
             * The opposite of `_.mapValues`; this method creates an object with the
             * same values as `object` and keys generated by running each own enumerable
             * string keyed property of `object` thru `iteratee`. The iteratee is invoked
             * with three arguments: (value, key, object).
             *
             * @static
             * @memberOf _
             * @since 3.8.0
             * @category Object
             * @param {Object} object The object to iterate over.
             * @param {Function} [iteratee=_.identity] The function invoked per iteration.
             * @returns {Object} Returns the new mapped object.
             * @see _.mapValues
             * @example
             *
             * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
             *   return key + value;
             * });
             * // => { 'a1': 1, 'b2': 2 }
             */
            function mapKeys(object, iteratee) {
              var result = {};
              iteratee = _baseIteratee(iteratee, 3);

              _baseForOwn(object, function(value, key, object) {
                _baseAssignValue(result, iteratee(value, key, object), value);
              });
              return result;
            }

            var mapKeys_1 = mapKeys;

            /**
             * Creates an object with the same keys as `object` and values generated
             * by running each own enumerable string keyed property of `object` thru
             * `iteratee`. The iteratee is invoked with three arguments:
             * (value, key, object).
             *
             * @static
             * @memberOf _
             * @since 2.4.0
             * @category Object
             * @param {Object} object The object to iterate over.
             * @param {Function} [iteratee=_.identity] The function invoked per iteration.
             * @returns {Object} Returns the new mapped object.
             * @see _.mapKeys
             * @example
             *
             * var users = {
             *   'fred':    { 'user': 'fred',    'age': 40 },
             *   'pebbles': { 'user': 'pebbles', 'age': 1 }
             * };
             *
             * _.mapValues(users, function(o) { return o.age; });
             * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
             *
             * // The `_.property` iteratee shorthand.
             * _.mapValues(users, 'age');
             * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
             */
            function mapValues(object, iteratee) {
              var result = {};
              iteratee = _baseIteratee(iteratee, 3);

              _baseForOwn(object, function(value, key, object) {
                _baseAssignValue(result, key, iteratee(value, key, object));
              });
              return result;
            }

            var mapValues_1 = mapValues;

            /**
             * Module containing the functions to serialize and deserialize
             * {SearchParameters} in the query string format
             * @module algoliasearchHelper.url
             */

















            var encode = utils.encode;

            function recursiveEncode(input) {
              if (isPlainObject_1(input)) {
                return mapValues_1(input, recursiveEncode);
              }
              if (Array.isArray(input)) {
                return map_1(input, recursiveEncode);
              }
              if (isString_1(input)) {
                return encode(input);
              }
              return input;
            }

            var refinementsParameters = ['dFR', 'fR', 'nR', 'hFR', 'tR'];
            var stateKeys = shortener.ENCODED_PARAMETERS;
            function sortQueryStringValues(prefixRegexp, invertedMapping, a, b) {
              if (prefixRegexp !== null) {
                a = a.replace(prefixRegexp, '');
                b = b.replace(prefixRegexp, '');
              }

              a = invertedMapping[a] || a;
              b = invertedMapping[b] || b;

              if (stateKeys.indexOf(a) !== -1 || stateKeys.indexOf(b) !== -1) {
                if (a === 'q') return -1;
                if (b === 'q') return 1;

                var isARefinements = refinementsParameters.indexOf(a) !== -1;
                var isBRefinements = refinementsParameters.indexOf(b) !== -1;
                if (isARefinements && !isBRefinements) {
                  return 1;
                } else if (isBRefinements && !isARefinements) {
                  return -1;
                }
              }

              return a.localeCompare(b);
            }

            /**
             * Read a query string and return an object containing the state
             * @param {string} queryString the query string that will be decoded
             * @param {object} [options] accepted options :
             *   - prefix : the prefix used for the saved attributes, you have to provide the
             *     same that was used for serialization
             *   - mapping : map short attributes to another value e.g. {q: 'query'}
             * @return {object} partial search parameters object (same properties than in the
             * SearchParameters but not exhaustive)
             */
            var getStateFromQueryString = function(queryString, options) {
              var prefixForParameters = options && options.prefix || '';
              var mapping = options && options.mapping || {};
              var invertedMapping = invert_1(mapping);

              var partialStateWithPrefix = lib$1.parse(queryString);
              var prefixRegexp = new RegExp('^' + prefixForParameters);
              var partialState = mapKeys_1(
                partialStateWithPrefix,
                function(v, k) {
                  var hasPrefix = prefixForParameters && prefixRegexp.test(k);
                  var unprefixedKey = hasPrefix ? k.replace(prefixRegexp, '') : k;
                  var decodedKey = shortener.decode(invertedMapping[unprefixedKey] || unprefixedKey);
                  return decodedKey || unprefixedKey;
                }
              );

              var partialStateWithParsedNumbers = SearchParameters_1._parseNumbers(partialState);

              return pick_1(partialStateWithParsedNumbers, SearchParameters_1.PARAMETERS);
            };

            /**
             * Retrieve an object of all the properties that are not understandable as helper
             * parameters.
             * @param {string} queryString the query string to read
             * @param {object} [options] the options
             *   - prefixForParameters : prefix used for the helper configuration keys
             *   - mapping : map short attributes to another value e.g. {q: 'query'}
             * @return {object} the object containing the parsed configuration that doesn't
             * to the helper
             */
            var getUnrecognizedParametersInQueryString = function(queryString, options) {
              var prefixForParameters = options && options.prefix;
              var mapping = options && options.mapping || {};
              var invertedMapping = invert_1(mapping);

              var foreignConfig = {};
              var config = lib$1.parse(queryString);
              if (prefixForParameters) {
                var prefixRegexp = new RegExp('^' + prefixForParameters);
                forEach_1(config, function(v, key) {
                  if (!prefixRegexp.test(key)) foreignConfig[key] = v;
                });
              } else {
                forEach_1(config, function(v, key) {
                  if (!shortener.decode(invertedMapping[key] || key)) foreignConfig[key] = v;
                });
              }

              return foreignConfig;
            };

            /**
             * Generate a query string for the state passed according to the options
             * @param {SearchParameters} state state to serialize
             * @param {object} [options] May contain the following parameters :
             *  - prefix : prefix in front of the keys
             *  - mapping : map short attributes to another value e.g. {q: 'query'}
             *  - moreAttributes : more values to be added in the query string. Those values
             *    won't be prefixed.
             *  - safe : get safe urls for use in emails, chat apps or any application auto linking urls.
             *  All parameters and values will be encoded in a way that it's safe to share them.
             *  Default to false for legacy reasons ()
             * @return {string} the query string
             */
            var getQueryStringFromState = function(state, options) {
              var moreAttributes = options && options.moreAttributes;
              var prefixForParameters = options && options.prefix || '';
              var mapping = options && options.mapping || {};
              var safe = options && options.safe || false;
              var invertedMapping = invert_1(mapping);

              var stateForUrl = safe ? state : recursiveEncode(state);

              var encodedState = mapKeys_1(
                stateForUrl,
                function(v, k) {
                  var shortK = shortener.encode(k);
                  return prefixForParameters + (mapping[shortK] || shortK);
                }
              );

              var prefixRegexp = prefixForParameters === '' ? null : new RegExp('^' + prefixForParameters);
              var sort = bind_1(sortQueryStringValues, null, prefixRegexp, invertedMapping);
              if (!isEmpty_1(moreAttributes)) {
                var stateQs = lib$1.stringify(encodedState, {encode: safe, sort: sort});
                var moreQs = lib$1.stringify(moreAttributes, {encode: safe});
                if (!stateQs) return moreQs;
                return stateQs + '&' + moreQs;
              }

              return lib$1.stringify(encodedState, {encode: safe, sort: sort});
            };

            var url = {
            	getStateFromQueryString: getStateFromQueryString,
            	getUnrecognizedParametersInQueryString: getUnrecognizedParametersInQueryString,
            	getQueryStringFromState: getQueryStringFromState
            };

            var version$1 = '2.26.0';

            /**
             * Event triggered when a parameter is set or updated
             * @event AlgoliaSearchHelper#event:change
             * @property {SearchParameters} state the current parameters with the latest changes applied
             * @property {SearchResults} lastResults the previous results received from Algolia. `null` before
             * the first request
             * @example
             * helper.on('change', function(state, lastResults) {
             *   console.log('The parameters have changed');
             * });
             */

            /**
             * Event triggered when a main search is sent to Algolia
             * @event AlgoliaSearchHelper#event:search
             * @property {SearchParameters} state the parameters used for this search
             * @property {SearchResults} lastResults the results from the previous search. `null` if
             * it is the first search.
             * @example
             * helper.on('search', function(state, lastResults) {
             *   console.log('Search sent');
             * });
             */

            /**
             * Event triggered when a search using `searchForFacetValues` is sent to Algolia
             * @event AlgoliaSearchHelper#event:searchForFacetValues
             * @property {SearchParameters} state the parameters used for this search
             * it is the first search.
             * @property {string} facet the facet searched into
             * @property {string} query the query used to search in the facets
             * @example
             * helper.on('searchForFacetValues', function(state, facet, query) {
             *   console.log('searchForFacetValues sent');
             * });
             */

            /**
             * Event triggered when a search using `searchOnce` is sent to Algolia
             * @event AlgoliaSearchHelper#event:searchOnce
             * @property {SearchParameters} state the parameters used for this search
             * it is the first search.
             * @example
             * helper.on('searchOnce', function(state) {
             *   console.log('searchOnce sent');
             * });
             */

            /**
             * Event triggered when the results are retrieved from Algolia
             * @event AlgoliaSearchHelper#event:result
             * @property {SearchResults} results the results received from Algolia
             * @property {SearchParameters} state the parameters used to query Algolia. Those might
             * be different from the one in the helper instance (for example if the network is unreliable).
             * @example
             * helper.on('result', function(results, state) {
             *   console.log('Search results received');
             * });
             */

            /**
             * Event triggered when Algolia sends back an error. For example, if an unknown parameter is
             * used, the error can be caught using this event.
             * @event AlgoliaSearchHelper#event:error
             * @property {Error} error the error returned by the Algolia.
             * @example
             * helper.on('error', function(error) {
             *   console.log('Houston we got a problem.');
             * });
             */

            /**
             * Event triggered when the queue of queries have been depleted (with any result or outdated queries)
             * @event AlgoliaSearchHelper#event:searchQueueEmpty
             * @example
             * helper.on('searchQueueEmpty', function() {
             *   console.log('No more search pending');
             *   // This is received before the result event if we're not expecting new results
             * });
             *
             * helper.search();
             */

            /**
             * Initialize a new AlgoliaSearchHelper
             * @class
             * @classdesc The AlgoliaSearchHelper is a class that ease the management of the
             * search. It provides an event based interface for search callbacks:
             *  - change: when the internal search state is changed.
             *    This event contains a {@link SearchParameters} object and the
             *    {@link SearchResults} of the last result if any.
             *  - search: when a search is triggered using the `search()` method.
             *  - result: when the response is retrieved from Algolia and is processed.
             *    This event contains a {@link SearchResults} object and the
             *    {@link SearchParameters} corresponding to this answer.
             *  - error: when the response is an error. This event contains the error returned by the server.
             * @param  {AlgoliaSearch} client an AlgoliaSearch client
             * @param  {string} index the index name to query
             * @param  {SearchParameters | object} options an object defining the initial
             * config of the search. It doesn't have to be a {SearchParameters},
             * just an object containing the properties you need from it.
             */
            function AlgoliaSearchHelper(client, index, options) {
              if (client.addAlgoliaAgent && !doesClientAgentContainsHelper(client)) {
                client.addAlgoliaAgent('JS Helper ' + version$1);
              }

              this.setClient(client);
              var opts = options || {};
              opts.index = index;
              this.state = SearchParameters_1.make(opts);
              this.lastResults = null;
              this._queryId = 0;
              this._lastQueryIdReceived = -1;
              this.derivedHelpers = [];
              this._currentNbQueries = 0;
            }

            util.inherits(AlgoliaSearchHelper, events.EventEmitter);

            /**
             * Start the search with the parameters set in the state. When the
             * method is called, it triggers a `search` event. The results will
             * be available through the `result` event. If an error occurs, an
             * `error` will be fired instead.
             * @return {AlgoliaSearchHelper}
             * @fires search
             * @fires result
             * @fires error
             * @chainable
             */
            AlgoliaSearchHelper.prototype.search = function() {
              this._search();
              return this;
            };

            /**
             * Gets the search query parameters that would be sent to the Algolia Client
             * for the hits
             * @return {object} Query Parameters
             */
            AlgoliaSearchHelper.prototype.getQuery = function() {
              var state = this.state;
              return requestBuilder_1._getHitsSearchParams(state);
            };

            /**
             * Start a search using a modified version of the current state. This method does
             * not trigger the helper lifecycle and does not modify the state kept internally
             * by the helper. This second aspect means that the next search call will be the
             * same as a search call before calling searchOnce.
             * @param {object} options can contain all the parameters that can be set to SearchParameters
             * plus the index
             * @param {function} [callback] optional callback executed when the response from the
             * server is back.
             * @return {promise|undefined} if a callback is passed the method returns undefined
             * otherwise it returns a promise containing an object with two keys :
             *  - content with a SearchResults
             *  - state with the state used for the query as a SearchParameters
             * @example
             * // Changing the number of records returned per page to 1
             * // This example uses the callback API
             * var state = helper.searchOnce({hitsPerPage: 1},
             *   function(error, content, state) {
             *     // if an error occurred it will be passed in error, otherwise its value is null
             *     // content contains the results formatted as a SearchResults
             *     // state is the instance of SearchParameters used for this search
             *   });
             * @example
             * // Changing the number of records returned per page to 1
             * // This example uses the promise API
             * var state1 = helper.searchOnce({hitsPerPage: 1})
             *                 .then(promiseHandler);
             *
             * function promiseHandler(res) {
             *   // res contains
             *   // {
             *   //   content : SearchResults
             *   //   state   : SearchParameters (the one used for this specific search)
             *   // }
             * }
             */
            AlgoliaSearchHelper.prototype.searchOnce = function(options, cb) {
              var tempState = !options ? this.state : this.state.setQueryParameters(options);
              var queries = requestBuilder_1._getQueries(tempState.index, tempState);
              var self = this;

              this._currentNbQueries++;

              this.emit('searchOnce', tempState);

              if (cb) {
                this.client
                  .search(queries)
                  .then(function(content) {
                    self._currentNbQueries--;
                    if (self._currentNbQueries === 0) {
                      self.emit('searchQueueEmpty');
                    }

                    cb(null, new SearchResults_1(tempState, content.results), tempState);
                  })
                  .catch(function(err) {
                    self._currentNbQueries--;
                    if (self._currentNbQueries === 0) {
                      self.emit('searchQueueEmpty');
                    }

                    cb(err, null, tempState);
                  });

                return undefined;
              }

              return this.client.search(queries).then(function(content) {
                self._currentNbQueries--;
                if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
                return {
                  content: new SearchResults_1(tempState, content.results),
                  state: tempState,
                  _originalResponse: content
                };
              }, function(e) {
                self._currentNbQueries--;
                if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
                throw e;
              });
            };

            /**
             * Structure of each result when using
             * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
             * @typedef FacetSearchHit
             * @type {object}
             * @property {string} value the facet value
             * @property {string} highlighted the facet value highlighted with the query string
             * @property {number} count number of occurrence of this facet value
             * @property {boolean} isRefined true if the value is already refined
             */

            /**
             * Structure of the data resolved by the
             * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
             * promise.
             * @typedef FacetSearchResult
             * @type {object}
             * @property {FacetSearchHit} facetHits the results for this search for facet values
             * @property {number} processingTimeMS time taken by the query inside the engine
             */

            /**
             * Search for facet values based on an query and the name of a faceted attribute. This
             * triggers a search and will return a promise. On top of using the query, it also sends
             * the parameters from the state so that the search is narrowed down to only the possible values.
             *
             * See the description of [FacetSearchResult](reference.html#FacetSearchResult)
             * @param {string} facet the name of the faceted attribute
             * @param {string} query the string query for the search
             * @param {number} [maxFacetHits] the maximum number values returned. Should be > 0 and <= 100
             * @param {object} [userState] the set of custom parameters to use on top of the current state. Setting a property to `undefined` removes
             * it in the generated query.
             * @return {promise.<FacetSearchResult>} the results of the search
             */
            AlgoliaSearchHelper.prototype.searchForFacetValues = function(facet, query, maxFacetHits, userState) {
              var state = this.state.setQueryParameters(userState || {});
              var isDisjunctive = state.isDisjunctiveFacet(facet);
              var algoliaQuery = requestBuilder_1.getSearchForFacetQuery(facet, query, maxFacetHits, state);

              this._currentNbQueries++;
              var self = this;

              this.emit('searchForFacetValues', state, facet, query);
              var searchForFacetValuesPromise = typeof this.client.searchForFacetValues === 'function'
                ? this.client.searchForFacetValues([{indexName: state.index, params: algoliaQuery}])
                : this.client.initIndex(state.index).searchForFacetValues(algoliaQuery);

              return searchForFacetValuesPromise.then(function addIsRefined(content) {
                self._currentNbQueries--;
                if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');

                content = Array.isArray(content) ? content[0] : content;

                content.facetHits = forEach_1(content.facetHits, function(f) {
                  f.isRefined = isDisjunctive ?
                    state.isDisjunctiveFacetRefined(facet, f.value) :
                    state.isFacetRefined(facet, f.value);
                });

                return content;
              }, function(e) {
                self._currentNbQueries--;
                if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
                throw e;
              });
            };

            /**
             * Sets the text query used for the search.
             *
             * This method resets the current page to 0.
             * @param  {string} q the user query
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.setQuery = function(q) {
              this._change(this.state.setPage(0).setQuery(q));
              return this;
            };

            /**
             * Remove all the types of refinements except tags. A string can be provided to remove
             * only the refinements of a specific attribute. For more advanced use case, you can
             * provide a function instead. This function should follow the
             * [clearCallback definition](#SearchParameters.clearCallback).
             *
             * This method resets the current page to 0.
             * @param {string} [name] optional name of the facet / attribute on which we want to remove all refinements
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             * @example
             * // Removing all the refinements
             * helper.clearRefinements().search();
             * @example
             * // Removing all the filters on a the category attribute.
             * helper.clearRefinements('category').search();
             * @example
             * // Removing only the exclude filters on the category facet.
             * helper.clearRefinements(function(value, attribute, type) {
             *   return type === 'exclude' && attribute === 'category';
             * }).search();
             */
            AlgoliaSearchHelper.prototype.clearRefinements = function(name) {
              this._change(this.state.setPage(0).clearRefinements(name));
              return this;
            };

            /**
             * Remove all the tag filters.
             *
             * This method resets the current page to 0.
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.clearTags = function() {
              this._change(this.state.setPage(0).clearTags());
              return this;
            };

            /**
             * Adds a disjunctive filter to a faceted attribute with the `value` provided. If the
             * filter is already set, it doesn't change the filters.
             *
             * This method resets the current page to 0.
             * @param  {string} facet the facet to refine
             * @param  {string} value the associated value (will be converted to string)
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.addDisjunctiveFacetRefinement = function(facet, value) {
              this._change(this.state.setPage(0).addDisjunctiveFacetRefinement(facet, value));
              return this;
            };

            /**
             * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addDisjunctiveFacetRefinement}
             */
            AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function() {
              return this.addDisjunctiveFacetRefinement.apply(this, arguments);
            };

            /**
             * Adds a refinement on a hierarchical facet. It will throw
             * an exception if the facet is not defined or if the facet
             * is already refined.
             *
             * This method resets the current page to 0.
             * @param {string} facet the facet name
             * @param {string} path the hierarchical facet path
             * @return {AlgoliaSearchHelper}
             * @throws Error if the facet is not defined or if the facet is refined
             * @chainable
             * @fires change
             */
            AlgoliaSearchHelper.prototype.addHierarchicalFacetRefinement = function(facet, value) {
              this._change(this.state.setPage(0).addHierarchicalFacetRefinement(facet, value));
              return this;
            };

            /**
             * Adds a an numeric filter to an attribute with the `operator` and `value` provided. If the
             * filter is already set, it doesn't change the filters.
             *
             * This method resets the current page to 0.
             * @param  {string} attribute the attribute on which the numeric filter applies
             * @param  {string} operator the operator of the filter
             * @param  {number} value the value of the filter
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.addNumericRefinement = function(attribute, operator, value) {
              this._change(this.state.setPage(0).addNumericRefinement(attribute, operator, value));
              return this;
            };

            /**
             * Adds a filter to a faceted attribute with the `value` provided. If the
             * filter is already set, it doesn't change the filters.
             *
             * This method resets the current page to 0.
             * @param  {string} facet the facet to refine
             * @param  {string} value the associated value (will be converted to string)
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.addFacetRefinement = function(facet, value) {
              this._change(this.state.setPage(0).addFacetRefinement(facet, value));
              return this;
            };

            /**
             * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetRefinement}
             */
            AlgoliaSearchHelper.prototype.addRefine = function() {
              return this.addFacetRefinement.apply(this, arguments);
            };


            /**
             * Adds a an exclusion filter to a faceted attribute with the `value` provided. If the
             * filter is already set, it doesn't change the filters.
             *
             * This method resets the current page to 0.
             * @param  {string} facet the facet to refine
             * @param  {string} value the associated value (will be converted to string)
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.addFacetExclusion = function(facet, value) {
              this._change(this.state.setPage(0).addExcludeRefinement(facet, value));
              return this;
            };

            /**
             * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetExclusion}
             */
            AlgoliaSearchHelper.prototype.addExclude = function() {
              return this.addFacetExclusion.apply(this, arguments);
            };

            /**
             * Adds a tag filter with the `tag` provided. If the
             * filter is already set, it doesn't change the filters.
             *
             * This method resets the current page to 0.
             * @param {string} tag the tag to add to the filter
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.addTag = function(tag) {
              this._change(this.state.setPage(0).addTagRefinement(tag));
              return this;
            };

            /**
             * Removes an numeric filter to an attribute with the `operator` and `value` provided. If the
             * filter is not set, it doesn't change the filters.
             *
             * Some parameters are optional, triggering different behavior:
             *  - if the value is not provided, then all the numeric value will be removed for the
             *  specified attribute/operator couple.
             *  - if the operator is not provided either, then all the numeric filter on this attribute
             *  will be removed.
             *
             * This method resets the current page to 0.
             * @param  {string} attribute the attribute on which the numeric filter applies
             * @param  {string} [operator] the operator of the filter
             * @param  {number} [value] the value of the filter
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.removeNumericRefinement = function(attribute, operator, value) {
              this._change(this.state.setPage(0).removeNumericRefinement(attribute, operator, value));
              return this;
            };

            /**
             * Removes a disjunctive filter to a faceted attribute with the `value` provided. If the
             * filter is not set, it doesn't change the filters.
             *
             * If the value is omitted, then this method will remove all the filters for the
             * attribute.
             *
             * This method resets the current page to 0.
             * @param  {string} facet the facet to refine
             * @param  {string} [value] the associated value
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.removeDisjunctiveFacetRefinement = function(facet, value) {
              this._change(this.state.setPage(0).removeDisjunctiveFacetRefinement(facet, value));
              return this;
            };

            /**
             * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeDisjunctiveFacetRefinement}
             */
            AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function() {
              return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
            };

            /**
             * Removes the refinement set on a hierarchical facet.
             * @param {string} facet the facet name
             * @return {AlgoliaSearchHelper}
             * @throws Error if the facet is not defined or if the facet is not refined
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.removeHierarchicalFacetRefinement = function(facet) {
              this._change(this.state.setPage(0).removeHierarchicalFacetRefinement(facet));

              return this;
            };

            /**
             * Removes a filter to a faceted attribute with the `value` provided. If the
             * filter is not set, it doesn't change the filters.
             *
             * If the value is omitted, then this method will remove all the filters for the
             * attribute.
             *
             * This method resets the current page to 0.
             * @param  {string} facet the facet to refine
             * @param  {string} [value] the associated value
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.removeFacetRefinement = function(facet, value) {
              this._change(this.state.setPage(0).removeFacetRefinement(facet, value));
              return this;
            };

            /**
             * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetRefinement}
             */
            AlgoliaSearchHelper.prototype.removeRefine = function() {
              return this.removeFacetRefinement.apply(this, arguments);
            };

            /**
             * Removes an exclusion filter to a faceted attribute with the `value` provided. If the
             * filter is not set, it doesn't change the filters.
             *
             * If the value is omitted, then this method will remove all the filters for the
             * attribute.
             *
             * This method resets the current page to 0.
             * @param  {string} facet the facet to refine
             * @param  {string} [value] the associated value
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.removeFacetExclusion = function(facet, value) {
              this._change(this.state.setPage(0).removeExcludeRefinement(facet, value));
              return this;
            };

            /**
             * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetExclusion}
             */
            AlgoliaSearchHelper.prototype.removeExclude = function() {
              return this.removeFacetExclusion.apply(this, arguments);
            };

            /**
             * Removes a tag filter with the `tag` provided. If the
             * filter is not set, it doesn't change the filters.
             *
             * This method resets the current page to 0.
             * @param {string} tag tag to remove from the filter
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.removeTag = function(tag) {
              this._change(this.state.setPage(0).removeTagRefinement(tag));
              return this;
            };

            /**
             * Adds or removes an exclusion filter to a faceted attribute with the `value` provided. If
             * the value is set then it removes it, otherwise it adds the filter.
             *
             * This method resets the current page to 0.
             * @param  {string} facet the facet to refine
             * @param  {string} value the associated value
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.toggleFacetExclusion = function(facet, value) {
              this._change(this.state.setPage(0).toggleExcludeFacetRefinement(facet, value));
              return this;
            };

            /**
             * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetExclusion}
             */
            AlgoliaSearchHelper.prototype.toggleExclude = function() {
              return this.toggleFacetExclusion.apply(this, arguments);
            };

            /**
             * Adds or removes a filter to a faceted attribute with the `value` provided. If
             * the value is set then it removes it, otherwise it adds the filter.
             *
             * This method can be used for conjunctive, disjunctive and hierarchical filters.
             *
             * This method resets the current page to 0.
             * @param  {string} facet the facet to refine
             * @param  {string} value the associated value
             * @return {AlgoliaSearchHelper}
             * @throws Error will throw an error if the facet is not declared in the settings of the helper
             * @fires change
             * @chainable
             * @deprecated since version 2.19.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
             */
            AlgoliaSearchHelper.prototype.toggleRefinement = function(facet, value) {
              return this.toggleFacetRefinement(facet, value);
            };

            /**
             * Adds or removes a filter to a faceted attribute with the `value` provided. If
             * the value is set then it removes it, otherwise it adds the filter.
             *
             * This method can be used for conjunctive, disjunctive and hierarchical filters.
             *
             * This method resets the current page to 0.
             * @param  {string} facet the facet to refine
             * @param  {string} value the associated value
             * @return {AlgoliaSearchHelper}
             * @throws Error will throw an error if the facet is not declared in the settings of the helper
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.toggleFacetRefinement = function(facet, value) {
              this._change(this.state.setPage(0).toggleFacetRefinement(facet, value));
              return this;
            };

            /**
             * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
             */
            AlgoliaSearchHelper.prototype.toggleRefine = function() {
              return this.toggleFacetRefinement.apply(this, arguments);
            };

            /**
             * Adds or removes a tag filter with the `value` provided. If
             * the value is set then it removes it, otherwise it adds the filter.
             *
             * This method resets the current page to 0.
             * @param {string} tag tag to remove or add
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.toggleTag = function(tag) {
              this._change(this.state.setPage(0).toggleTagRefinement(tag));
              return this;
            };

            /**
             * Increments the page number by one.
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             * @example
             * helper.setPage(0).nextPage().getPage();
             * // returns 1
             */
            AlgoliaSearchHelper.prototype.nextPage = function() {
              return this.setPage(this.state.page + 1);
            };

            /**
             * Decrements the page number by one.
             * @fires change
             * @return {AlgoliaSearchHelper}
             * @chainable
             * @example
             * helper.setPage(1).previousPage().getPage();
             * // returns 0
             */
            AlgoliaSearchHelper.prototype.previousPage = function() {
              return this.setPage(this.state.page - 1);
            };

            /**
             * @private
             */
            function setCurrentPage(page) {
              if (page < 0) throw new Error('Page requested below 0.');

              this._change(this.state.setPage(page));
              return this;
            }

            /**
             * Change the current page
             * @deprecated
             * @param  {number} page The page number
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.setCurrentPage = setCurrentPage;

            /**
             * Updates the current page.
             * @function
             * @param  {number} page The page number
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.setPage = setCurrentPage;

            /**
             * Updates the name of the index that will be targeted by the query.
             *
             * This method resets the current page to 0.
             * @param {string} name the index name
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.setIndex = function(name) {
              this._change(this.state.setPage(0).setIndex(name));
              return this;
            };

            /**
             * Update a parameter of the search. This method reset the page
             *
             * The complete list of parameters is available on the
             * [Algolia website](https://www.algolia.com/doc/rest#query-an-index).
             * The most commonly used parameters have their own [shortcuts](#query-parameters-shortcuts)
             * or benefit from higher-level APIs (all the kind of filters and facets have their own API)
             *
             * This method resets the current page to 0.
             * @param {string} parameter name of the parameter to update
             * @param {any} value new value of the parameter
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             * @example
             * helper.setQueryParameter('hitsPerPage', 20).search();
             */
            AlgoliaSearchHelper.prototype.setQueryParameter = function(parameter, value) {
              this._change(this.state.setPage(0).setQueryParameter(parameter, value));
              return this;
            };

            /**
             * Set the whole state (warning: will erase previous state)
             * @param {SearchParameters} newState the whole new state
             * @return {AlgoliaSearchHelper}
             * @fires change
             * @chainable
             */
            AlgoliaSearchHelper.prototype.setState = function(newState) {
              this._change(SearchParameters_1.make(newState));
              return this;
            };

            /**
             * Get the current search state stored in the helper. This object is immutable.
             * @param {string[]} [filters] optional filters to retrieve only a subset of the state
             * @return {SearchParameters|object} if filters is specified a plain object is
             * returned containing only the requested fields, otherwise return the unfiltered
             * state
             * @example
             * // Get the complete state as stored in the helper
             * helper.getState();
             * @example
             * // Get a part of the state with all the refinements on attributes and the query
             * helper.getState(['query', 'attribute:category']);
             */
            AlgoliaSearchHelper.prototype.getState = function(filters) {
              if (filters === undefined) return this.state;
              return this.state.filter(filters);
            };

            /**
             * DEPRECATED Get part of the state as a query string. By default, the output keys will not
             * be prefixed and will only take the applied refinements and the query.
             * @deprecated
             * @param {object} [options] May contain the following parameters :
             *
             * **filters** : possible values are all the keys of the [SearchParameters](#searchparameters), `index` for
             * the index, all the refinements with `attribute:*` or for some specific attributes with
             * `attribute:theAttribute`
             *
             * **prefix** : prefix in front of the keys
             *
             * **moreAttributes** : more values to be added in the query string. Those values
             *    won't be prefixed.
             * @return {string} the query string
             */
            AlgoliaSearchHelper.prototype.getStateAsQueryString = function getStateAsQueryString(options) {
              var filters = options && options.filters || ['query', 'attribute:*'];
              var partialState = this.getState(filters);

              return url.getQueryStringFromState(partialState, options);
            };

            /**
             * DEPRECATED Read a query string and return an object containing the state. Use
             * url module.
             * @deprecated
             * @static
             * @param {string} queryString the query string that will be decoded
             * @param {object} options accepted options :
             *   - prefix : the prefix used for the saved attributes, you have to provide the
             *     same that was used for serialization
             * @return {object} partial search parameters object (same properties than in the
             * SearchParameters but not exhaustive)
             * @see {@link url#getStateFromQueryString}
             */
            AlgoliaSearchHelper.getConfigurationFromQueryString = url.getStateFromQueryString;

            /**
             * DEPRECATED Retrieve an object of all the properties that are not understandable as helper
             * parameters. Use url module.
             * @deprecated
             * @static
             * @param {string} queryString the query string to read
             * @param {object} options the options
             *   - prefixForParameters : prefix used for the helper configuration keys
             * @return {object} the object containing the parsed configuration that doesn't
             * to the helper
             */
            AlgoliaSearchHelper.getForeignConfigurationInQueryString = url.getUnrecognizedParametersInQueryString;

            /**
             * DEPRECATED Overrides part of the state with the properties stored in the provided query
             * string.
             * @deprecated
             * @param {string} queryString the query string containing the informations to url the state
             * @param {object} options optional parameters :
             *  - prefix : prefix used for the algolia parameters
             *  - triggerChange : if set to true the state update will trigger a change event
             */
            AlgoliaSearchHelper.prototype.setStateFromQueryString = function(queryString, options) {
              var triggerChange = options && options.triggerChange || false;
              var configuration = url.getStateFromQueryString(queryString, options);
              var updatedState = this.state.setQueryParameters(configuration);

              if (triggerChange) this.setState(updatedState);
              else this.overrideStateWithoutTriggeringChangeEvent(updatedState);
            };

            /**
             * Override the current state without triggering a change event.
             * Do not use this method unless you know what you are doing. (see the example
             * for a legit use case)
             * @param {SearchParameters} newState the whole new state
             * @return {AlgoliaSearchHelper}
             * @example
             *  helper.on('change', function(state){
             *    // In this function you might want to find a way to store the state in the url/history
             *    updateYourURL(state)
             *  })
             *  window.onpopstate = function(event){
             *    // This is naive though as you should check if the state is really defined etc.
             *    helper.overrideStateWithoutTriggeringChangeEvent(event.state).search()
             *  }
             * @chainable
             */
            AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent = function(newState) {
              this.state = new SearchParameters_1(newState);
              return this;
            };

            /**
             * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasRefinements}
             */
            AlgoliaSearchHelper.prototype.isRefined = function(facet, value) {
              if (this.state.isConjunctiveFacet(facet)) {
                return this.state.isFacetRefined(facet, value);
              } else if (this.state.isDisjunctiveFacet(facet)) {
                return this.state.isDisjunctiveFacetRefined(facet, value);
              }

              throw new Error(facet +
                ' is not properly defined in this helper configuration' +
                '(use the facets or disjunctiveFacets keys to configure it)');
            };

            /**
             * Check if an attribute has any numeric, conjunctive, disjunctive or hierarchical filters.
             * @param {string} attribute the name of the attribute
             * @return {boolean} true if the attribute is filtered by at least one value
             * @example
             * // hasRefinements works with numeric, conjunctive, disjunctive and hierarchical filters
             * helper.hasRefinements('price'); // false
             * helper.addNumericRefinement('price', '>', 100);
             * helper.hasRefinements('price'); // true
             *
             * helper.hasRefinements('color'); // false
             * helper.addFacetRefinement('color', 'blue');
             * helper.hasRefinements('color'); // true
             *
             * helper.hasRefinements('material'); // false
             * helper.addDisjunctiveFacetRefinement('material', 'plastic');
             * helper.hasRefinements('material'); // true
             *
             * helper.hasRefinements('categories'); // false
             * helper.toggleFacetRefinement('categories', 'kitchen > knife');
             * helper.hasRefinements('categories'); // true
             *
             */
            AlgoliaSearchHelper.prototype.hasRefinements = function(attribute) {
              if (!isEmpty_1(this.state.getNumericRefinements(attribute))) {
                return true;
              } else if (this.state.isConjunctiveFacet(attribute)) {
                return this.state.isFacetRefined(attribute);
              } else if (this.state.isDisjunctiveFacet(attribute)) {
                return this.state.isDisjunctiveFacetRefined(attribute);
              } else if (this.state.isHierarchicalFacet(attribute)) {
                return this.state.isHierarchicalFacetRefined(attribute);
              }

              // there's currently no way to know that the user did call `addNumericRefinement` at some point
              // thus we cannot distinguish if there once was a numeric refinement that was cleared
              // so we will return false in every other situations to be consistent
              // while what we should do here is throw because we did not find the attribute in any type
              // of refinement
              return false;
            };

            /**
             * Check if a value is excluded for a specific faceted attribute. If the value
             * is omitted then the function checks if there is any excluding refinements.
             *
             * @param  {string}  facet name of the attribute for used for faceting
             * @param  {string}  [value] optional value. If passed will test that this value
               * is filtering the given facet.
             * @return {boolean} true if refined
             * @example
             * helper.isExcludeRefined('color'); // false
             * helper.isExcludeRefined('color', 'blue') // false
             * helper.isExcludeRefined('color', 'red') // false
             *
             * helper.addFacetExclusion('color', 'red');
             *
             * helper.isExcludeRefined('color'); // true
             * helper.isExcludeRefined('color', 'blue') // false
             * helper.isExcludeRefined('color', 'red') // true
             */
            AlgoliaSearchHelper.prototype.isExcluded = function(facet, value) {
              return this.state.isExcludeRefined(facet, value);
            };

            /**
             * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasRefinements}
             */
            AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function(facet, value) {
              return this.state.isDisjunctiveFacetRefined(facet, value);
            };

            /**
             * Check if the string is a currently filtering tag.
             * @param {string} tag tag to check
             * @return {boolean}
             */
            AlgoliaSearchHelper.prototype.hasTag = function(tag) {
              return this.state.isTagRefined(tag);
            };

            /**
             * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasTag}
             */
            AlgoliaSearchHelper.prototype.isTagRefined = function() {
              return this.hasTagRefinements.apply(this, arguments);
            };


            /**
             * Get the name of the currently used index.
             * @return {string}
             * @example
             * helper.setIndex('highestPrice_products').getIndex();
             * // returns 'highestPrice_products'
             */
            AlgoliaSearchHelper.prototype.getIndex = function() {
              return this.state.index;
            };

            function getCurrentPage() {
              return this.state.page;
            }

            /**
             * Get the currently selected page
             * @deprecated
             * @return {number} the current page
             */
            AlgoliaSearchHelper.prototype.getCurrentPage = getCurrentPage;
            /**
             * Get the currently selected page
             * @function
             * @return {number} the current page
             */
            AlgoliaSearchHelper.prototype.getPage = getCurrentPage;

            /**
             * Get all the tags currently set to filters the results.
             *
             * @return {string[]} The list of tags currently set.
             */
            AlgoliaSearchHelper.prototype.getTags = function() {
              return this.state.tagRefinements;
            };

            /**
             * Get a parameter of the search by its name. It is possible that a parameter is directly
             * defined in the index dashboard, but it will be undefined using this method.
             *
             * The complete list of parameters is
             * available on the
             * [Algolia website](https://www.algolia.com/doc/rest#query-an-index).
             * The most commonly used parameters have their own [shortcuts](#query-parameters-shortcuts)
             * or benefit from higher-level APIs (all the kind of filters have their own API)
             * @param {string} parameterName the parameter name
             * @return {any} the parameter value
             * @example
             * var hitsPerPage = helper.getQueryParameter('hitsPerPage');
             */
            AlgoliaSearchHelper.prototype.getQueryParameter = function(parameterName) {
              return this.state.getQueryParameter(parameterName);
            };

            /**
             * Get the list of refinements for a given attribute. This method works with
             * conjunctive, disjunctive, excluding and numerical filters.
             *
             * See also SearchResults#getRefinements
             *
             * @param {string} facetName attribute name used for faceting
             * @return {Array.<FacetRefinement|NumericRefinement>} All Refinement are objects that contain a value, and
             * a type. Numeric also contains an operator.
             * @example
             * helper.addNumericRefinement('price', '>', 100);
             * helper.getRefinements('price');
             * // [
             * //   {
             * //     "value": [
             * //       100
             * //     ],
             * //     "operator": ">",
             * //     "type": "numeric"
             * //   }
             * // ]
             * @example
             * helper.addFacetRefinement('color', 'blue');
             * helper.addFacetExclusion('color', 'red');
             * helper.getRefinements('color');
             * // [
             * //   {
             * //     "value": "blue",
             * //     "type": "conjunctive"
             * //   },
             * //   {
             * //     "value": "red",
             * //     "type": "exclude"
             * //   }
             * // ]
             * @example
             * helper.addDisjunctiveFacetRefinement('material', 'plastic');
             * // [
             * //   {
             * //     "value": "plastic",
             * //     "type": "disjunctive"
             * //   }
             * // ]
             */
            AlgoliaSearchHelper.prototype.getRefinements = function(facetName) {
              var refinements = [];

              if (this.state.isConjunctiveFacet(facetName)) {
                var conjRefinements = this.state.getConjunctiveRefinements(facetName);

                forEach_1(conjRefinements, function(r) {
                  refinements.push({
                    value: r,
                    type: 'conjunctive'
                  });
                });

                var excludeRefinements = this.state.getExcludeRefinements(facetName);

                forEach_1(excludeRefinements, function(r) {
                  refinements.push({
                    value: r,
                    type: 'exclude'
                  });
                });
              } else if (this.state.isDisjunctiveFacet(facetName)) {
                var disjRefinements = this.state.getDisjunctiveRefinements(facetName);

                forEach_1(disjRefinements, function(r) {
                  refinements.push({
                    value: r,
                    type: 'disjunctive'
                  });
                });
              }

              var numericRefinements = this.state.getNumericRefinements(facetName);

              forEach_1(numericRefinements, function(value, operator) {
                refinements.push({
                  value: value,
                  operator: operator,
                  type: 'numeric'
                });
              });

              return refinements;
            };

            /**
             * Return the current refinement for the (attribute, operator)
             * @param {string} attribute attribute in the record
             * @param {string} operator operator applied on the refined values
             * @return {Array.<number|number[]>} refined values
             */
            AlgoliaSearchHelper.prototype.getNumericRefinement = function(attribute, operator) {
              return this.state.getNumericRefinement(attribute, operator);
            };

            /**
             * Get the current breadcrumb for a hierarchical facet, as an array
             * @param  {string} facetName Hierarchical facet name
             * @return {array.<string>} the path as an array of string
             */
            AlgoliaSearchHelper.prototype.getHierarchicalFacetBreadcrumb = function(facetName) {
              return this.state.getHierarchicalFacetBreadcrumb(facetName);
            };

            // /////////// PRIVATE

            /**
             * Perform the underlying queries
             * @private
             * @return {undefined}
             * @fires search
             * @fires result
             * @fires error
             */
            AlgoliaSearchHelper.prototype._search = function() {
              var state = this.state;
              var mainQueries = requestBuilder_1._getQueries(state.index, state);

              var states = [{
                state: state,
                queriesCount: mainQueries.length,
                helper: this
              }];

              this.emit('search', state, this.lastResults);

              var derivedQueries = map_1(this.derivedHelpers, function(derivedHelper) {
                var derivedState = derivedHelper.getModifiedState(state);
                var queries = requestBuilder_1._getQueries(derivedState.index, derivedState);
                states.push({
                  state: derivedState,
                  queriesCount: queries.length,
                  helper: derivedHelper
                });
                derivedHelper.emit('search', derivedState, derivedHelper.lastResults);
                return queries;
              });

              var queries = mainQueries.concat(flatten_1(derivedQueries));
              var queryId = this._queryId++;

              this._currentNbQueries++;

              try {
                this.client.search(queries)
                  .then(this._dispatchAlgoliaResponse.bind(this, states, queryId))
                  .catch(this._dispatchAlgoliaError.bind(this, queryId));
              } catch (err) {
                // If we reach this part, we're in an internal error state
                this.emit('error', err);
              }
            };

            /**
             * Transform the responses as sent by the server and transform them into a user
             * usable object that merge the results of all the batch requests. It will dispatch
             * over the different helper + derived helpers (when there are some).
             * @private
             * @param {array.<{SearchParameters, AlgoliaQueries, AlgoliaSearchHelper}>}
             *  state state used for to generate the request
             * @param {number} queryId id of the current request
             * @param {object} content content of the response
             * @return {undefined}
             */
            AlgoliaSearchHelper.prototype._dispatchAlgoliaResponse = function(states, queryId, content) {
              // FIXME remove the number of outdated queries discarded instead of just one

              if (queryId < this._lastQueryIdReceived) {
                // Outdated answer
                return;
              }

              this._currentNbQueries -= (queryId - this._lastQueryIdReceived);
              this._lastQueryIdReceived = queryId;

              if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');

              var results = content.results;
              forEach_1(states, function(s) {
                var state = s.state;
                var queriesCount = s.queriesCount;
                var helper = s.helper;
                var specificResults = results.splice(0, queriesCount);

                var formattedResponse = helper.lastResults = new SearchResults_1(state, specificResults);
                helper.emit('result', formattedResponse, state);
              });
            };

            AlgoliaSearchHelper.prototype._dispatchAlgoliaError = function(queryId, err) {
              if (queryId < this._lastQueryIdReceived) {
                // Outdated answer
                return;
              }

              this._currentNbQueries -= queryId - this._lastQueryIdReceived;
              this._lastQueryIdReceived = queryId;

              this.emit('error', err);

              if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');
            };

            AlgoliaSearchHelper.prototype.containsRefinement = function(query, facetFilters, numericFilters, tagFilters) {
              return query ||
                facetFilters.length !== 0 ||
                numericFilters.length !== 0 ||
                tagFilters.length !== 0;
            };

            /**
             * Test if there are some disjunctive refinements on the facet
             * @private
             * @param {string} facet the attribute to test
             * @return {boolean}
             */
            AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function(facet) {
              return this.state.disjunctiveRefinements[facet] &&
                this.state.disjunctiveRefinements[facet].length > 0;
            };

            AlgoliaSearchHelper.prototype._change = function(newState) {
              if (newState !== this.state) {
                this.state = newState;
                this.emit('change', this.state, this.lastResults);
              }
            };

            /**
             * Clears the cache of the underlying Algolia client.
             * @return {AlgoliaSearchHelper}
             */
            AlgoliaSearchHelper.prototype.clearCache = function() {
              this.client.clearCache && this.client.clearCache();
              return this;
            };

            /**
             * Updates the internal client instance. If the reference of the clients
             * are equal then no update is actually done.
             * @param  {AlgoliaSearch} newClient an AlgoliaSearch client
             * @return {AlgoliaSearchHelper}
             */
            AlgoliaSearchHelper.prototype.setClient = function(newClient) {
              if (this.client === newClient) return this;

              if (newClient.addAlgoliaAgent && !doesClientAgentContainsHelper(newClient)) newClient.addAlgoliaAgent('JS Helper ' + version$1);
              this.client = newClient;

              return this;
            };

            /**
             * Gets the instance of the currently used client.
             * @return {AlgoliaSearch}
             */
            AlgoliaSearchHelper.prototype.getClient = function() {
              return this.client;
            };

            /**
             * Creates an derived instance of the Helper. A derived helper
             * is a way to request other indices synchronised with the lifecycle
             * of the main Helper. This mechanism uses the multiqueries feature
             * of Algolia to aggregate all the requests in a single network call.
             *
             * This method takes a function that is used to create a new SearchParameter
             * that will be used to create requests to Algolia. Those new requests
             * are created just before the `search` event. The signature of the function
             * is `SearchParameters -> SearchParameters`.
             *
             * This method returns a new DerivedHelper which is an EventEmitter
             * that fires the same `search`, `result` and `error` events. Those
             * events, however, will receive data specific to this DerivedHelper
             * and the SearchParameters that is returned by the call of the
             * parameter function.
             * @param {function} fn SearchParameters -> SearchParameters
             * @return {DerivedHelper}
             */
            AlgoliaSearchHelper.prototype.derive = function(fn) {
              var derivedHelper = new DerivedHelper_1(this, fn);
              this.derivedHelpers.push(derivedHelper);
              return derivedHelper;
            };

            /**
             * This method detaches a derived Helper from the main one. Prefer using the one from the
             * derived helper itself, to remove the event listeners too.
             * @private
             * @return {undefined}
             * @throws Error
             */
            AlgoliaSearchHelper.prototype.detachDerivedHelper = function(derivedHelper) {
              var pos = this.derivedHelpers.indexOf(derivedHelper);
              if (pos === -1) throw new Error('Derived helper already detached');
              this.derivedHelpers.splice(pos, 1);
            };

            /**
             * This method returns true if there is currently at least one on-going search.
             * @return {boolean} true if there is a search pending
             */
            AlgoliaSearchHelper.prototype.hasPendingRequests = function() {
              return this._currentNbQueries > 0;
            };

            /**
             * @typedef AlgoliaSearchHelper.NumericRefinement
             * @type {object}
             * @property {number[]} value the numbers that are used for filtering this attribute with
             * the operator specified.
             * @property {string} operator the faceting data: value, number of entries
             * @property {string} type will be 'numeric'
             */

            /**
             * @typedef AlgoliaSearchHelper.FacetRefinement
             * @type {object}
             * @property {string} value the string use to filter the attribute
             * @property {string} type the type of filter: 'conjunctive', 'disjunctive', 'exclude'
             */


            /*
             * This function tests if the _ua parameter of the client
             * already contains the JS Helper UA
             */
            function doesClientAgentContainsHelper(client) {
              // this relies on JS Client internal variable, this might break if implementation changes
              var currentAgent = client._ua;
              return !currentAgent ? false :
                currentAgent.indexOf('JS Helper') !== -1;
            }

            var algoliasearch_helper = AlgoliaSearchHelper;

            /**
             * The algoliasearchHelper module is the function that will let its
             * contains everything needed to use the Algoliasearch
             * Helper. It is a also a function that instanciate the helper.
             * To use the helper, you also need the Algolia JS client v3.
             * @example
             * //using the UMD build
             * var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
             * var helper = algoliasearchHelper(client, 'bestbuy', {
             *   facets: ['shipping'],
             *   disjunctiveFacets: ['category']
             * });
             * helper.on('result', function(result) {
             *   console.log(result);
             * });
             * helper.toggleRefine('Movies & TV Shows')
             *       .toggleRefine('Free shipping')
             *       .search();
             * @example
             * // The helper is an event emitter using the node API
             * helper.on('result', updateTheResults);
             * helper.once('result', updateTheResults);
             * helper.removeListener('result', updateTheResults);
             * helper.removeAllListeners('result');
             * @module algoliasearchHelper
             * @param  {AlgoliaSearch} client an AlgoliaSearch client
             * @param  {string} index the name of the index to query
             * @param  {SearchParameters|object} opts an object defining the initial config of the search. It doesn't have to be a {SearchParameters}, just an object containing the properties you need from it.
             * @return {AlgoliaSearchHelper}
             */
            function algoliasearchHelper(client, index, opts) {
              return new algoliasearch_helper(client, index, opts);
            }

            /**
             * The version currently used
             * @member module:algoliasearchHelper.version
             * @type {number}
             */
            algoliasearchHelper.version = version$1;

            /**
             * Constructor for the Helper.
             * @member module:algoliasearchHelper.AlgoliaSearchHelper
             * @type {AlgoliaSearchHelper}
             */
            algoliasearchHelper.AlgoliaSearchHelper = algoliasearch_helper;

            /**
             * Constructor for the object containing all the parameters of the search.
             * @member module:algoliasearchHelper.SearchParameters
             * @type {SearchParameters}
             */
            algoliasearchHelper.SearchParameters = SearchParameters_1;

            /**
             * Constructor for the object containing the results of the search.
             * @member module:algoliasearchHelper.SearchResults
             * @type {SearchResults}
             */
            algoliasearchHelper.SearchResults = SearchResults_1;

            /**
             * URL tools to generate query string and parse them from/into
             * SearchParameters
             * @member module:algoliasearchHelper.url
             * @type {object} {@link url}
             *
             */
            algoliasearchHelper.url = url;

            var algoliasearchHelper_1 = algoliasearchHelper;
            var algoliasearchHelper_4 = algoliasearchHelper_1.SearchParameters;

            // From https://github.com/reactjs/react-redux/blob/master/src/utils/shallowEqual.js
            var shallowEqual = function shallowEqual(objA, objB) {
              if (objA === objB) {
                return true;
              }

              var keysA = Object.keys(objA);
              var keysB = Object.keys(objB);

              if (keysA.length !== keysB.length) {
                return false;
              }

              // Test for A's keys different from B.
              var hasOwn = Object.prototype.hasOwnProperty;
              for (var i = 0; i < keysA.length; i++) {
                if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                  return false;
                }
              }

              return true;
            };

            var getDisplayName = function getDisplayName(Component) {
              return Component.displayName || Component.name || 'UnknownComponent';
            };

            var resolved = Promise.resolve();
            var defer = function defer(f) {
              resolved.then(f);
            };

            var removeEmptyKey = function removeEmptyKey(obj) {
              Object.keys(obj).forEach(function (key) {
                var value = obj[key];
                if (isEmpty_1(value) && isPlainObject_1(value)) {
                  delete obj[key];
                } else if (isPlainObject_1(value)) {
                  removeEmptyKey(value);
                }
              });

              return obj;
            };

            function createWidgetsManager(onWidgetsUpdate) {
              var widgets = [];
              // Is an update scheduled?
              var scheduled = false;

              // The state manager's updates need to be batched since more than one
              // component can register or unregister widgets during the same tick.
              function scheduleUpdate() {
                if (scheduled) {
                  return;
                }
                scheduled = true;
                defer(function () {
                  scheduled = false;
                  onWidgetsUpdate();
                });
              }

              return {
                registerWidget: function registerWidget(widget) {
                  widgets.push(widget);
                  scheduleUpdate();
                  return function unregisterWidget() {
                    widgets.splice(widgets.indexOf(widget), 1);
                    scheduleUpdate();
                  };
                },

                update: scheduleUpdate,
                getWidgets: function getWidgets() {
                  return widgets;
                }
              };
            }

            function createStore(initialState) {
              var state = initialState;
              var listeners = [];
              function dispatch() {
                listeners.forEach(function (listener) {
                  return listener();
                });
              }
              return {
                getState: function getState() {
                  return state;
                },
                setState: function setState(nextState) {
                  state = nextState;
                  dispatch();
                },
                subscribe: function subscribe(listener) {
                  listeners.push(listener);
                  return function unsubcribe() {
                    listeners.splice(listeners.indexOf(listener), 1);
                  };
                }
              };
            }

            var HIGHLIGHT_TAGS = {
              highlightPreTag: '<ais-highlight-0000000000>',
              highlightPostTag: '</ais-highlight-0000000000>'
            };

            /**
             * Parses an highlighted attribute into an array of objects with the string value, and
             * a boolean that indicated if this part is highlighted.
             *
             * @param {string} preTag - string used to identify the start of an highlighted value
             * @param {string} postTag - string used to identify the end of an highlighted value
             * @param {string} highlightedValue - highlighted attribute as returned by Algolia highlight feature
             * @return {object[]} - An array of {value: string, isHighlighted: boolean}.
             */
            function parseHighlightedAttribute(_ref) {
              var preTag = _ref.preTag,
                  postTag = _ref.postTag,
                  _ref$highlightedValue = _ref.highlightedValue,
                  highlightedValue = _ref$highlightedValue === undefined ? '' : _ref$highlightedValue;

              var splitByPreTag = highlightedValue.split(preTag);
              var firstValue = splitByPreTag.shift();
              var elements = firstValue === '' ? [] : [{ value: firstValue, isHighlighted: false }];

              if (postTag === preTag) {
                var isHighlighted = true;
                splitByPreTag.forEach(function (split) {
                  elements.push({ value: split, isHighlighted: isHighlighted });
                  isHighlighted = !isHighlighted;
                });
              } else {
                splitByPreTag.forEach(function (split) {
                  var splitByPostTag = split.split(postTag);

                  elements.push({
                    value: splitByPostTag[0],
                    isHighlighted: true
                  });

                  if (splitByPostTag[1] !== '') {
                    elements.push({
                      value: splitByPostTag[1],
                      isHighlighted: false
                    });
                  }
                });
              }

              return elements;
            }

            /**
             * Find an highlighted attribute given an `attribute` and an `highlightProperty`, parses it,
             * and provided an array of objects with the string value and a boolean if this
             * value is highlighted.
             *
             * In order to use this feature, highlight must be activated in the configuration of
             * the index. The `preTag` and `postTag` attributes are respectively highlightPreTag and
             * highlightPostTag in Algolia configuration.
             *
             * @param {string} preTag - string used to identify the start of an highlighted value
             * @param {string} postTag - string used to identify the end of an highlighted value
             * @param {string} highlightProperty - the property that contains the highlight structure in the results
             * @param {string} attribute - the highlighted attribute to look for
             * @param {object} hit - the actual hit returned by Algolia.
             * @return {object[]} - An array of {value: string, isHighlighted: boolean}.
             */
            function parseAlgoliaHit(_ref2) {
              var _ref2$preTag = _ref2.preTag,
                  preTag = _ref2$preTag === undefined ? '<em>' : _ref2$preTag,
                  _ref2$postTag = _ref2.postTag,
                  postTag = _ref2$postTag === undefined ? '</em>' : _ref2$postTag,
                  highlightProperty = _ref2.highlightProperty,
                  attribute = _ref2.attribute,
                  hit = _ref2.hit;

              if (!hit) throw new Error('`hit`, the matching record, must be provided');

              var highlightObject = get_1(hit[highlightProperty], attribute, {});

              if (Array.isArray(highlightObject)) {
                return highlightObject.map(function (item) {
                  return parseHighlightedAttribute({
                    preTag: preTag,
                    postTag: postTag,
                    highlightedValue: item.value
                  });
                });
              }

              return parseHighlightedAttribute({
                preTag: preTag,
                postTag: postTag,
                highlightedValue: highlightObject.value
              });
            }

            var _extends = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            function _defineProperty$1(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            /**
             * Creates a new instance of the InstantSearchManager which controls the widgets and
             * trigger the search when the widgets are updated.
             * @param {string} indexName - the main index name
             * @param {object} initialState - initial widget state
             * @param {object} SearchParameters - optional additional parameters to send to the algolia API
             * @param {number} stalledSearchDelay - time (in ms) after the search is stalled
             * @return {InstantSearchManager} a new instance of InstantSearchManager
             */
            function createInstantSearchManager(_ref) {
              var indexName = _ref.indexName,
                  _ref$initialState = _ref.initialState,
                  initialState = _ref$initialState === undefined ? {} : _ref$initialState,
                  searchClient = _ref.searchClient,
                  resultsState = _ref.resultsState,
                  stalledSearchDelay = _ref.stalledSearchDelay;

              var baseSP = new algoliasearchHelper_4(_extends({
                index: indexName
              }, HIGHLIGHT_TAGS));

              var stalledSearchTimer = null;

              var helper = algoliasearchHelper_1(searchClient, indexName, baseSP);
              helper.on('result', handleSearchSuccess);
              helper.on('error', handleSearchError);
              helper.on('search', handleNewSearch);

              var derivedHelpers = {};
              var indexMapping = {}; // keep track of the original index where the parameters applied when sortBy is used.

              var initialSearchParameters = helper.state;

              var widgetsManager = createWidgetsManager(onWidgetsUpdate);

              var store = createStore({
                widgets: initialState,
                metadata: [],
                results: resultsState || null,
                error: null,
                searching: false,
                isSearchStalled: true,
                searchingForFacetValues: false
              });

              var skip = false;

              function skipSearch() {
                skip = true;
              }

              function updateClient(client) {
                helper.setClient(client);
                search();
              }

              function clearCache() {
                helper.clearCache();
                search();
              }

              function getMetadata(state) {
                return widgetsManager.getWidgets().filter(function (widget) {
                  return Boolean(widget.getMetadata);
                }).map(function (widget) {
                  return widget.getMetadata(state);
                });
              }

              function getSearchParameters() {
                indexMapping = {};
                var sharedParameters = widgetsManager.getWidgets().filter(function (widget) {
                  return Boolean(widget.getSearchParameters);
                }).filter(function (widget) {
                  return !widget.context.multiIndexContext && (widget.props.indexName === indexName || !widget.props.indexName);
                }).reduce(function (res, widget) {
                  return widget.getSearchParameters(res);
                }, initialSearchParameters);
                indexMapping[sharedParameters.index] = indexName;

                var derivatedWidgets = widgetsManager.getWidgets().filter(function (widget) {
                  return Boolean(widget.getSearchParameters);
                }).filter(function (widget) {
                  return widget.context.multiIndexContext && widget.context.multiIndexContext.targetedIndex !== indexName || widget.props.indexName && widget.props.indexName !== indexName;
                }).reduce(function (indices, widget) {
                  var targetedIndex = widget.context.multiIndexContext ? widget.context.multiIndexContext.targetedIndex : widget.props.indexName;
                  var index = find_1(indices, function (i) {
                    return i.targetedIndex === targetedIndex;
                  });
                  if (index) {
                    index.widgets.push(widget);
                  } else {
                    indices.push({ targetedIndex: targetedIndex, widgets: [widget] });
                  }
                  return indices;
                }, []);

                var mainIndexParameters = widgetsManager.getWidgets().filter(function (widget) {
                  return Boolean(widget.getSearchParameters);
                }).filter(function (widget) {
                  return widget.context.multiIndexContext && widget.context.multiIndexContext.targetedIndex === indexName || widget.props.indexName && widget.props.indexName === indexName;
                }).reduce(function (res, widget) {
                  return widget.getSearchParameters(res);
                }, sharedParameters);

                indexMapping[mainIndexParameters.index] = indexName;

                return { sharedParameters: sharedParameters, mainIndexParameters: mainIndexParameters, derivatedWidgets: derivatedWidgets };
              }

              function search() {
                if (!skip) {
                  var _getSearchParameters = getSearchParameters(helper.state),
                      sharedParameters = _getSearchParameters.sharedParameters,
                      mainIndexParameters = _getSearchParameters.mainIndexParameters,
                      derivatedWidgets = _getSearchParameters.derivatedWidgets;

                  Object.keys(derivedHelpers).forEach(function (key) {
                    return derivedHelpers[key].detach();
                  });
                  derivedHelpers = {};

                  helper.setState(sharedParameters);

                  derivatedWidgets.forEach(function (derivatedSearchParameters) {
                    var index = derivatedSearchParameters.targetedIndex;
                    var derivedHelper = helper.derive(function () {
                      var parameters = derivatedSearchParameters.widgets.reduce(function (res, widget) {
                        return widget.getSearchParameters(res);
                      }, sharedParameters);
                      indexMapping[parameters.index] = index;
                      return parameters;
                    });
                    derivedHelper.on('result', handleSearchSuccess);
                    derivedHelper.on('error', handleSearchError);
                    derivedHelpers[index] = derivedHelper;
                  });

                  helper.setState(mainIndexParameters);

                  helper.search();
                }
              }

              function handleSearchSuccess(content) {
                var state = store.getState();
                var results = state.results ? state.results : {};

                /* if switching from mono index to multi index and vice versa,
                results needs to reset to {}*/
                results = !isEmpty_1(derivedHelpers) && results.getFacetByName ? {} : results;

                if (!isEmpty_1(derivedHelpers)) {
                  results[indexMapping[content.index]] = content;
                } else {
                  results = content;
                }

                var currentState = store.getState();
                var nextIsSearchStalled = currentState.isSearchStalled;
                if (!helper.hasPendingRequests()) {
                  clearTimeout(stalledSearchTimer);
                  stalledSearchTimer = null;
                  nextIsSearchStalled = false;
                }

                var nextState = omit_1(_extends({}, currentState, {
                  results: results,
                  isSearchStalled: nextIsSearchStalled,
                  searching: false,
                  error: null
                }), 'resultsFacetValues');
                store.setState(nextState);
              }

              function handleSearchError(error) {
                var currentState = store.getState();
                var nextIsSearchStalled = currentState.isSearchStalled;
                if (!helper.hasPendingRequests()) {
                  clearTimeout(stalledSearchTimer);
                  nextIsSearchStalled = false;
                }

                var nextState = omit_1(_extends({}, currentState, {
                  isSearchStalled: nextIsSearchStalled,
                  error: error,
                  searching: false
                }), 'resultsFacetValues');
                store.setState(nextState);
              }

              function handleNewSearch() {
                if (!stalledSearchTimer) {
                  stalledSearchTimer = setTimeout(function () {
                    var nextState = omit_1(_extends({}, store.getState(), {
                      isSearchStalled: true
                    }), 'resultsFacetValues');
                    store.setState(nextState);
                  }, stalledSearchDelay);
                }
              }

              // Called whenever a widget has been rendered with new props.
              function onWidgetsUpdate() {
                var metadata = getMetadata(store.getState().widgets);

                store.setState(_extends({}, store.getState(), {
                  metadata: metadata,
                  searching: true
                }));

                // Since the `getSearchParameters` method of widgets also depends on props,
                // the result search parameters might have changed.
                search();
              }

              function transitionState(nextSearchState) {
                var searchState = store.getState().widgets;
                return widgetsManager.getWidgets().filter(function (widget) {
                  return Boolean(widget.transitionState);
                }).reduce(function (res, widget) {
                  return widget.transitionState(searchState, res);
                }, nextSearchState);
              }

              function onExternalStateUpdate(nextSearchState) {
                var metadata = getMetadata(nextSearchState);

                store.setState(_extends({}, store.getState(), {
                  widgets: nextSearchState,
                  metadata: metadata,
                  searching: true
                }));

                search();
              }

              function onSearchForFacetValues(_ref2) {
                var facetName = _ref2.facetName,
                    query = _ref2.query,
                    _ref2$maxFacetHits = _ref2.maxFacetHits,
                    maxFacetHits = _ref2$maxFacetHits === undefined ? 10 : _ref2$maxFacetHits;

                // The values 1, 100 are the min / max values that the engine accepts.
                // see: https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits
                var maxFacetHitsWithinRange = Math.max(1, Math.min(maxFacetHits, 100));

                store.setState(_extends({}, store.getState(), {
                  searchingForFacetValues: true
                }));

                helper.searchForFacetValues(facetName, query, maxFacetHitsWithinRange).then(function (content) {
                  var _extends2;

                  store.setState(_extends({}, store.getState(), {
                    resultsFacetValues: _extends({}, store.getState().resultsFacetValues, (_extends2 = {}, _defineProperty$1(_extends2, facetName, content.facetHits), _defineProperty$1(_extends2, 'query', query), _extends2)),
                    searchingForFacetValues: false
                  }));
                }, function (error) {
                  store.setState(_extends({}, store.getState(), {
                    error: error,
                    searchingForFacetValues: false
                  }));
                }).catch(function (error) {
                  // Since setState is synchronous, any error that occurs in the render of a
                  // component will be swallowed by this promise.
                  // This is a trick to make the error show up correctly in the console.
                  // See http://stackoverflow.com/a/30741722/969302
                  setTimeout(function () {
                    throw error;
                  });
                });
              }

              function updateIndex(newIndex) {
                initialSearchParameters = initialSearchParameters.setIndex(newIndex);
                search();
              }

              function getWidgetsIds() {
                return store.getState().metadata.reduce(function (res, meta) {
                  return typeof meta.id !== 'undefined' ? res.concat(meta.id) : res;
                }, []);
              }

              return {
                store: store,
                widgetsManager: widgetsManager,
                getWidgetsIds: getWidgetsIds,
                onExternalStateUpdate: onExternalStateUpdate,
                transitionState: transitionState,
                onSearchForFacetValues: onSearchForFacetValues,
                updateClient: updateClient,
                updateIndex: updateIndex,
                clearCache: clearCache,
                skipSearch: skipSearch
              };
            }

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
              return typeof obj;
            } : function (obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            var _extends$2 = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
              }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            function validateNextProps(props, nextProps) {
              if (!props.searchState && nextProps.searchState) {
                throw new Error("You can't switch <InstantSearch> from being uncontrolled to controlled");
              } else if (props.searchState && !nextProps.searchState) {
                throw new Error("You can't switch <InstantSearch> from being controlled to uncontrolled");
              }
            }

            /* eslint valid-jsdoc: 0 */
            /**
             * @description
             * `<InstantSearch>` is the root component of all React InstantSearch implementations.
             * It provides all the connected components (aka widgets) a means to interact
             * with the searchState.
             * @kind widget
             * @name <InstantSearch>
             * @requirements You will need to have an Algolia account to be able to use this widget.
             * [Create one now](https://www.algolia.com/users/sign_up).
             * @propType {string} appId - Your Algolia application id.
             * @propType {string} apiKey - Your Algolia search-only API key.
             * @propType {string} indexName - Main index in which to search.
             * @propType {boolean} [refresh=false] - Flag to activate when the cache needs to be cleared so that the front-end is updated when a change occurs in the index.
             * @propType {object} [algoliaClient] - Provide a custom Algolia client instead of the internal one (deprecated in favor of `searchClient`).
             * @propType {object} [searchClient] - Provide a custom search client.
             * @propType {func} [onSearchStateChange] - Function to be called everytime a new search is done. Useful for [URL Routing](guide/Routing.html).
             * @propType {object} [searchState] - Object to inject some search state. Switches the InstantSearch component in controlled mode. Useful for [URL Routing](guide/Routing.html).
             * @propType {func} [createURL] - Function to call when creating links, useful for [URL Routing](guide/Routing.html).
             * @propType {SearchResults|SearchResults[]} [resultsState] - Use this to inject the results that will be used at first rendering. Those results are found by using the `findResultsState` function. Useful for [Server Side Rendering](guide/Server-side_rendering.html).
             * @propType {number} [stalledSearchDelay=200] - The amount of time before considering that the search takes too much time. The time is expressed in milliseconds.
             * @propType {{ Root: string|function, props: object }} [root] - Use this to customize the root element. Default value: `{ Root: 'div' }`
             * @example
             * import React from 'react';
             * import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
             *
             * const App = () => (
             *   <InstantSearch
             *     appId="latency"
             *     apiKey="6be0576ff61c053d5f9a3225e2a90f76"
             *     indexName="instant_search"
             *   >
             *     <SearchBox />
             *     <Hits />
             *   </InstantSearch>
             * );
             */

            var InstantSearch = function (_Component) {
              _inherits(InstantSearch, _Component);

              function InstantSearch(props) {
                _classCallCheck(this, InstantSearch);

                var _this = _possibleConstructorReturn(this, (InstantSearch.__proto__ || Object.getPrototypeOf(InstantSearch)).call(this, props));

                _this.isControlled = Boolean(props.searchState);
                var initialState = _this.isControlled ? props.searchState : {};
                _this.isUnmounting = false;

                _this.aisManager = createInstantSearchManager({
                  indexName: props.indexName,
                  searchClient: props.searchClient,
                  initialState: initialState,
                  resultsState: props.resultsState,
                  stalledSearchDelay: props.stalledSearchDelay
                });
                return _this;
              }

              _createClass(InstantSearch, [{
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                  validateNextProps(this.props, nextProps);

                  if (this.props.indexName !== nextProps.indexName) {
                    this.aisManager.updateIndex(nextProps.indexName);
                  }

                  if (this.props.refresh !== nextProps.refresh) {
                    if (nextProps.refresh) {
                      this.aisManager.clearCache();
                    }
                  }

                  if (this.props.searchClient !== nextProps.searchClient) {
                    this.aisManager.updateClient(nextProps.searchClient);
                  }

                  if (this.isControlled) {
                    this.aisManager.onExternalStateUpdate(nextProps.searchState);
                  }
                }
              }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                  this.isUnmounting = true;
                  this.aisManager.skipSearch();
                }
              }, {
                key: 'getChildContext',
                value: function getChildContext() {
                  // If not already cached, cache the bound methods so that we can forward them as part
                  // of the context.
                  if (!this._aisContextCache) {
                    this._aisContextCache = {
                      ais: {
                        onInternalStateUpdate: this.onWidgetsInternalStateUpdate.bind(this),
                        createHrefForState: this.createHrefForState.bind(this),
                        onSearchForFacetValues: this.onSearchForFacetValues.bind(this),
                        onSearchStateChange: this.onSearchStateChange.bind(this),
                        onSearchParameters: this.onSearchParameters.bind(this)
                      }
                    };
                  }

                  return {
                    ais: _extends$2({}, this._aisContextCache.ais, {
                      store: this.aisManager.store,
                      widgetsManager: this.aisManager.widgetsManager,
                      mainTargetedIndex: this.props.indexName
                    })
                  };
                }
              }, {
                key: 'createHrefForState',
                value: function createHrefForState(searchState) {
                  searchState = this.aisManager.transitionState(searchState);
                  return this.isControlled && this.props.createURL ? this.props.createURL(searchState, this.getKnownKeys()) : '#';
                }
              }, {
                key: 'onWidgetsInternalStateUpdate',
                value: function onWidgetsInternalStateUpdate(searchState) {
                  searchState = this.aisManager.transitionState(searchState);

                  this.onSearchStateChange(searchState);

                  if (!this.isControlled) {
                    this.aisManager.onExternalStateUpdate(searchState);
                  }
                }
              }, {
                key: 'onSearchStateChange',
                value: function onSearchStateChange(searchState) {
                  if (this.props.onSearchStateChange && !this.isUnmounting) {
                    this.props.onSearchStateChange(searchState);
                  }
                }
              }, {
                key: 'onSearchParameters',
                value: function onSearchParameters(getSearchParameters, context, props) {
                  if (this.props.onSearchParameters) {
                    var searchState = this.props.searchState ? this.props.searchState : {};
                    this.props.onSearchParameters(getSearchParameters, context, props, searchState);
                  }
                }
              }, {
                key: 'onSearchForFacetValues',
                value: function onSearchForFacetValues(searchState) {
                  this.aisManager.onSearchForFacetValues(searchState);
                }
              }, {
                key: 'getKnownKeys',
                value: function getKnownKeys() {
                  return this.aisManager.getWidgetsIds();
                }
              }, {
                key: 'render',
                value: function render() {
                  var childrenCount = React.Children.count(this.props.children);
                  var _props$root = this.props.root,
                      Root = _props$root.Root,
                      props = _props$root.props;

                  if (childrenCount === 0) return null;else return React__default.createElement(Root, props, this.props.children);
                }
              }]);

              return InstantSearch;
            }(React.Component);

            InstantSearch.defaultProps = {
              stalledSearchDelay: 200
            };

            InstantSearch.propTypes = {
              // @TODO: These props are currently constant.
              indexName: propTypes.string.isRequired,

              searchClient: propTypes.object.isRequired,

              createURL: propTypes.func,

              refresh: propTypes.bool.isRequired,

              searchState: propTypes.object,
              onSearchStateChange: propTypes.func,

              onSearchParameters: propTypes.func,
              resultsState: propTypes.oneOfType([propTypes.object, propTypes.array]),

              children: propTypes.node,

              root: propTypes.shape({
                Root: propTypes.oneOfType([propTypes.string, propTypes.func, propTypes.object]),
                props: propTypes.object
              }).isRequired,

              stalledSearchDelay: propTypes.number
            };

            InstantSearch.childContextTypes = {
              // @TODO: more precise widgets manager propType
              ais: propTypes.object.isRequired
            };

            var _createClass$2 = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            function _classCallCheck$2(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            function _possibleConstructorReturn$2(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
            }

            function _inherits$2(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
              }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            /* eslint valid-jsdoc: 0 */
            /**
             * @description
             * `<Index>` is the component that allows you to apply widgets to a dedicated index. It's
             * useful if you want to build an interface that targets multiple indices.
             * @kind widget
             * @name <Index>
             * @propType {string} indexName - index in which to search.
             * @propType {{ Root: string|function, props: object }} [root] - Use this to customize the root element. Default value: `{ Root: 'div' }`
             * @example
             * import React from 'react';
             * import { InstantSearch, Index, SearchBox, Hits, Configure } from 'react-instantsearch-dom';
             *
             * const App = () => (
             *   <InstantSearch
             *     appId="latency"
             *     apiKey="6be0576ff61c053d5f9a3225e2a90f76"
             *     indexName="instant_search"
             *   >
             *     <Configure hitsPerPage={5} />
             *     <SearchBox />
             *     <Index indexName="instant_search">
             *       <Hits />
             *     </Index>
             *     <Index indexName="bestbuy">
             *       <Hits />
             *     </Index>
             *   </InstantSearch>
             * );
             */

            var Index = function (_Component) {
              _inherits$2(Index, _Component);

              function Index(props, context) {
                _classCallCheck$2(this, Index);

                var _this = _possibleConstructorReturn$2(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

                var widgetsManager = context.ais.widgetsManager;

                /*
                 we want <Index> to be seen as a regular widget.
                 It means that with only <Index> present a new query will be sent to Algolia.
                 That way you don't need a virtual hits widget to use the connectAutoComplete.
                */

                _this.unregisterWidget = widgetsManager.registerWidget(_this);
                return _this;
              }

              _createClass$2(Index, [{
                key: 'componentWillMount',
                value: function componentWillMount() {
                  this.context.ais.onSearchParameters(this.getSearchParameters.bind(this), this.getChildContext(), this.props);
                }
              }, {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                  if (this.props.indexName !== nextProps.indexName) {
                    this.context.ais.widgetsManager.update();
                  }
                }
              }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                  this.unregisterWidget();
                }
              }, {
                key: 'getChildContext',
                value: function getChildContext() {
                  return {
                    multiIndexContext: {
                      targetedIndex: this.props.indexName
                    }
                  };
                }
              }, {
                key: 'getSearchParameters',
                value: function getSearchParameters(searchParameters, props) {
                  return searchParameters.setIndex(this.props ? this.props.indexName : props.indexName);
                }
              }, {
                key: 'render',
                value: function render() {
                  var childrenCount = React.Children.count(this.props.children);
                  var _props$root = this.props.root,
                      Root = _props$root.Root,
                      props = _props$root.props;

                  if (childrenCount === 0) return null;else return React__default.createElement(Root, props, this.props.children);
                }
              }]);

              return Index;
            }(React.Component);

            Index.propTypes = {
              // @TODO: These props are currently constant.
              indexName: propTypes.string.isRequired,
              children: propTypes.node,
              root: propTypes.shape({
                Root: propTypes.oneOfType([propTypes.string, propTypes.func, propTypes.object]),
                props: propTypes.object
              }).isRequired
            };

            Index.childContextTypes = {
              multiIndexContext: propTypes.object.isRequired
            };

            Index.contextTypes = {
              // @TODO: more precise widgets manager propType
              ais: propTypes.object.isRequired
            };

            /** Used for built-in method references. */
            var objectProto$l = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$i = objectProto$l.hasOwnProperty;

            /**
             * The base implementation of `_.has` without support for deep paths.
             *
             * @private
             * @param {Object} [object] The object to query.
             * @param {Array|string} key The key to check.
             * @returns {boolean} Returns `true` if `key` exists, else `false`.
             */
            function baseHas(object, key) {
              return object != null && hasOwnProperty$i.call(object, key);
            }

            var _baseHas = baseHas;

            /**
             * Checks if `path` is a direct property of `object`.
             *
             * @static
             * @since 0.1.0
             * @memberOf _
             * @category Object
             * @param {Object} object The object to query.
             * @param {Array|string} path The path to check.
             * @returns {boolean} Returns `true` if `path` exists, else `false`.
             * @example
             *
             * var object = { 'a': { 'b': 2 } };
             * var other = _.create({ 'a': _.create({ 'b': 2 }) });
             *
             * _.has(object, 'a');
             * // => true
             *
             * _.has(object, 'a.b');
             * // => true
             *
             * _.has(object, ['a', 'b']);
             * // => true
             *
             * _.has(other, 'a');
             * // => false
             */
            function has$1(object, path) {
              return object != null && _hasPath(object, path, _baseHas);
            }

            var has_1 = has$1;

            var _extends$3 = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            var _createClass$3 = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            function _classCallCheck$3(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            function _possibleConstructorReturn$3(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
            }

            function _inherits$3(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
              }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            /**
             * @typedef {object} ConnectorDescription
             * @property {string} displayName - the displayName used by the wrapper
             * @property {function} refine - a function to filter the local state
             * @property {function} getSearchParameters - function transforming the local state to a SearchParameters
             * @property {function} getMetadata - metadata of the widget
             * @property {function} transitionState - hook after the state has changed
             * @property {function} getProvidedProps - transform the state into props passed to the wrapped component.
             * Receives (props, widgetStates, searchState, metadata) and returns the local state.
             * @property {function} getId - Receives props and return the id that will be used to identify the widget
             * @property {function} cleanUp - hook when the widget will unmount. Receives (props, searchState) and return a cleaned state.
             * @property {object} propTypes - PropTypes forwarded to the wrapped component.
             * @property {object} defaultProps - default values for the props
             */

            /**
             * Connectors are the HOC used to transform React components
             * into InstantSearch widgets.
             * In order to simplify the construction of such connectors
             * `createConnector` takes a description and transform it into
             * a connector.
             * @param {ConnectorDescription} connectorDesc the description of the connector
             * @return {Connector} a function that wraps a component into
             * an instantsearch connected one.
             */
            function createConnector(connectorDesc) {
              if (!connectorDesc.displayName) {
                throw new Error('`createConnector` requires you to provide a `displayName` property.');
              }

              var hasRefine = has_1(connectorDesc, 'refine');
              var hasSearchForFacetValues = has_1(connectorDesc, 'searchForFacetValues');
              var hasSearchParameters = has_1(connectorDesc, 'getSearchParameters');
              var hasMetadata = has_1(connectorDesc, 'getMetadata');
              var hasTransitionState = has_1(connectorDesc, 'transitionState');
              var hasCleanUp = has_1(connectorDesc, 'cleanUp');
              var hasShouldComponentUpdate = has_1(connectorDesc, 'shouldComponentUpdate');
              var isWidget = hasSearchParameters || hasMetadata || hasTransitionState;

              return function (Composed) {
                var _class, _temp, _initialiseProps;

                return _temp = _class = function (_Component) {
                  _inherits$3(Connector, _Component);

                  function Connector(props, context) {
                    _classCallCheck$3(this, Connector);

                    var _this = _possibleConstructorReturn$3(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).call(this, props, context));

                    _initialiseProps.call(_this);

                    var _context$ais = context.ais,
                        store = _context$ais.store,
                        widgetsManager = _context$ais.widgetsManager;

                    var canRender = false;
                    _this.state = {
                      props: _this.getProvidedProps(_extends$3({}, props, { canRender: canRender })),
                      canRender: canRender // use to know if a component is rendered (browser), or not (server).
                    };

                    _this.unsubscribe = store.subscribe(function () {
                      if (_this.state.canRender) {
                        _this.setState({
                          props: _this.getProvidedProps(_extends$3({}, _this.props, {
                            canRender: _this.state.canRender
                          }))
                        });
                      }
                    });
                    if (isWidget) {
                      _this.unregisterWidget = widgetsManager.registerWidget(_this);
                    }
                    return _this;
                  }

                  _createClass$3(Connector, [{
                    key: 'getMetadata',
                    value: function getMetadata(nextWidgetsState) {
                      if (hasMetadata) {
                        return connectorDesc.getMetadata.call(this, this.props, nextWidgetsState);
                      }
                      return {};
                    }
                  }, {
                    key: 'getSearchParameters',
                    value: function getSearchParameters(searchParameters) {
                      if (hasSearchParameters) {
                        return connectorDesc.getSearchParameters.call(this, searchParameters, this.props, this.context.ais.store.getState().widgets);
                      }
                      return null;
                    }
                  }, {
                    key: 'transitionState',
                    value: function transitionState(prevWidgetsState, nextWidgetsState) {
                      if (hasTransitionState) {
                        return connectorDesc.transitionState.call(this, this.props, prevWidgetsState, nextWidgetsState);
                      }
                      return nextWidgetsState;
                    }
                  }, {
                    key: 'componentDidMount',
                    value: function componentDidMount() {
                      this.setState({
                        canRender: true
                      });
                    }
                  }, {
                    key: 'componentWillMount',
                    value: function componentWillMount() {
                      if (connectorDesc.getSearchParameters) {
                        this.context.ais.onSearchParameters(connectorDesc.getSearchParameters.bind(this), this.context, this.props);
                      }
                    }
                  }, {
                    key: 'componentWillReceiveProps',
                    value: function componentWillReceiveProps(nextProps) {
                      if (!isEqual_1(this.props, nextProps)) {
                        this.setState({
                          props: this.getProvidedProps(nextProps)
                        });

                        if (isWidget) {
                          // Since props might have changed, we need to re-run getSearchParameters
                          // and getMetadata with the new props.
                          this.context.ais.widgetsManager.update();
                          if (connectorDesc.transitionState) {
                            this.context.ais.onSearchStateChange(connectorDesc.transitionState.call(this, nextProps, this.context.ais.store.getState().widgets, this.context.ais.store.getState().widgets));
                          }
                        }
                      }
                    }
                  }, {
                    key: 'componentWillUnmount',
                    value: function componentWillUnmount() {
                      this.unsubscribe();
                      if (isWidget) {
                        this.unregisterWidget(); // will schedule an update
                        if (hasCleanUp) {
                          var newState = connectorDesc.cleanUp.call(this, this.props, this.context.ais.store.getState().widgets);
                          this.context.ais.store.setState(_extends$3({}, this.context.ais.store.getState(), {
                            widgets: newState
                          }));
                          this.context.ais.onSearchStateChange(removeEmptyKey(newState));
                        }
                      }
                    }
                  }, {
                    key: 'shouldComponentUpdate',
                    value: function shouldComponentUpdate(nextProps, nextState) {
                      if (hasShouldComponentUpdate) {
                        return connectorDesc.shouldComponentUpdate.call(this, this.props, nextProps, this.state, nextState);
                      }

                      var propsEqual = shallowEqual(this.props, nextProps);
                      if (this.state.props === null || nextState.props === null) {
                        if (this.state.props === nextState.props) {
                          return !propsEqual;
                        }
                        return true;
                      }
                      return !propsEqual || !shallowEqual(this.state.props, nextState.props);
                    }
                  }, {
                    key: 'render',
                    value: function render() {
                      if (this.state.props === null) {
                        return null;
                      }

                      var refineProps = hasRefine ? { refine: this.refine, createURL: this.createURL } : {};

                      var searchForFacetValuesProps = hasSearchForFacetValues ? { searchForItems: this.searchForFacetValues } : {};

                      return React__default.createElement(Composed, _extends$3({}, this.props, this.state.props, refineProps, searchForFacetValuesProps));
                    }
                  }]);

                  return Connector;
                }(React.Component), _class.displayName = connectorDesc.displayName + '(' + getDisplayName(Composed) + ')', _class.defaultClassNames = Composed.defaultClassNames, _class.propTypes = connectorDesc.propTypes, _class.defaultProps = connectorDesc.defaultProps, _class.contextTypes = {
                  // @TODO: more precise state manager propType
                  ais: propTypes.object.isRequired,
                  multiIndexContext: propTypes.object
                }, _initialiseProps = function _initialiseProps() {
                  var _this2 = this;

                  this.getProvidedProps = function (props) {
                    var store = _this2.context.ais.store;

                    var _store$getState = store.getState(),
                        results = _store$getState.results,
                        searching = _store$getState.searching,
                        error = _store$getState.error,
                        widgets = _store$getState.widgets,
                        metadata = _store$getState.metadata,
                        resultsFacetValues = _store$getState.resultsFacetValues,
                        searchingForFacetValues = _store$getState.searchingForFacetValues,
                        isSearchStalled = _store$getState.isSearchStalled;

                    var searchResults = {
                      results: results,
                      searching: searching,
                      error: error,
                      searchingForFacetValues: searchingForFacetValues,
                      isSearchStalled: isSearchStalled
                    };
                    return connectorDesc.getProvidedProps.call(_this2, props, widgets, searchResults, metadata, resultsFacetValues);
                  };

                  this.refine = function () {
                    var _connectorDesc$refine;

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                      args[_key] = arguments[_key];
                    }

                    _this2.context.ais.onInternalStateUpdate((_connectorDesc$refine = connectorDesc.refine).call.apply(_connectorDesc$refine, [_this2, _this2.props, _this2.context.ais.store.getState().widgets].concat(args)));
                  };

                  this.searchForFacetValues = function () {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                      args[_key2] = arguments[_key2];
                    }

                    _this2.context.ais.onSearchForFacetValues(connectorDesc.searchForFacetValues.apply(connectorDesc, [_this2.props, _this2.context.ais.store.getState().widgets].concat(args)));
                  };

                  this.createURL = function () {
                    var _connectorDesc$refine2;

                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                      args[_key3] = arguments[_key3];
                    }

                    return _this2.context.ais.createHrefForState((_connectorDesc$refine2 = connectorDesc.refine).call.apply(_connectorDesc$refine2, [_this2, _this2.props, _this2.context.ais.store.getState().widgets].concat(args)));
                  };

                  this.cleanUp = function () {
                    var _connectorDesc$cleanU;

                    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                      args[_key4] = arguments[_key4];
                    }

                    return (_connectorDesc$cleanU = connectorDesc.cleanUp).call.apply(_connectorDesc$cleanU, [_this2].concat(args));
                  };
                }, _temp;
              };
            }

            /** Used as the size to enable large array optimizations. */
            var LARGE_ARRAY_SIZE$1 = 200;

            /**
             * The base implementation of methods like `_.difference` without support
             * for excluding multiple arrays or iteratee shorthands.
             *
             * @private
             * @param {Array} array The array to inspect.
             * @param {Array} values The values to exclude.
             * @param {Function} [iteratee] The iteratee invoked per element.
             * @param {Function} [comparator] The comparator invoked per element.
             * @returns {Array} Returns the new array of filtered values.
             */
            function baseDifference(array, values, iteratee, comparator) {
              var index = -1,
                  includes = _arrayIncludes,
                  isCommon = true,
                  length = array.length,
                  result = [],
                  valuesLength = values.length;

              if (!length) {
                return result;
              }
              if (iteratee) {
                values = _arrayMap(values, _baseUnary(iteratee));
              }
              if (comparator) {
                includes = _arrayIncludesWith;
                isCommon = false;
              }
              else if (values.length >= LARGE_ARRAY_SIZE$1) {
                includes = _cacheHas;
                isCommon = false;
                values = new _SetCache(values);
              }
              outer:
              while (++index < length) {
                var value = array[index],
                    computed = iteratee == null ? value : iteratee(value);

                value = (comparator || value !== 0) ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  result.push(value);
                }
                else if (!includes(values, computed, comparator)) {
                  result.push(value);
                }
              }
              return result;
            }

            var _baseDifference = baseDifference;

            /**
             * Creates an array of `array` values not included in the other given arrays
             * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
             * for equality comparisons. The order and references of result values are
             * determined by the first array.
             *
             * **Note:** Unlike `_.pullAll`, this method returns a new array.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Array
             * @param {Array} array The array to inspect.
             * @param {...Array} [values] The values to exclude.
             * @returns {Array} Returns the new array of filtered values.
             * @see _.without, _.xor
             * @example
             *
             * _.difference([2, 1], [2, 3]);
             * // => [1]
             */
            var difference = _baseRest(function(array, values) {
              return isArrayLikeObject_1(array)
                ? _baseDifference(array, _baseFlatten(values, 1, isArrayLikeObject_1, true))
                : [];
            });

            var difference_1 = difference;

            var _extends$5 = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            function _defineProperty$2(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function getIndex(context) {
              return context && context.multiIndexContext ? context.multiIndexContext.targetedIndex : context.ais.mainTargetedIndex;
            }

            function getResults(searchResults, context) {
              if (searchResults.results && !searchResults.results.hits) {
                return searchResults.results[getIndex(context)] ? searchResults.results[getIndex(context)] : null;
              } else {
                return searchResults.results ? searchResults.results : null;
              }
            }

            function hasMultipleIndex(context) {
              return context && context.multiIndexContext;
            }

            // eslint-disable-next-line max-params
            function refineValue(searchState, nextRefinement, context, resetPage, namespace) {
              if (hasMultipleIndex(context)) {
                return namespace ? refineMultiIndexWithNamespace(searchState, nextRefinement, context, resetPage, namespace) : refineMultiIndex(searchState, nextRefinement, context, resetPage);
              } else {
                // When we have a multi index page with shared widgets we should also
                // reset their page to 1 if the resetPage is provided. Otherwise the
                // indices will always be reset
                // see: https://github.com/algolia/react-instantsearch/issues/310
                // see: https://github.com/algolia/react-instantsearch/issues/637
                if (searchState.indices && resetPage) {
                  Object.keys(searchState.indices).forEach(function (targetedIndex) {
                    searchState = refineValue(searchState, { page: 1 }, { multiIndexContext: { targetedIndex: targetedIndex } }, true, namespace);
                  });
                }
                return namespace ? refineSingleIndexWithNamespace(searchState, nextRefinement, resetPage, namespace) : refineSingleIndex(searchState, nextRefinement, resetPage);
              }
            }

            function refineMultiIndex(searchState, nextRefinement, context, resetPage) {
              var page = resetPage ? { page: 1 } : undefined;
              var index = getIndex(context);
              var state = has_1(searchState, 'indices.' + index) ? _extends$5({}, searchState.indices, _defineProperty$2({}, index, _extends$5({}, searchState.indices[index], nextRefinement, page))) : _extends$5({}, searchState.indices, _defineProperty$2({}, index, _extends$5({}, nextRefinement, page)));
              return _extends$5({}, searchState, { indices: state });
            }

            function refineSingleIndex(searchState, nextRefinement, resetPage) {
              var page = resetPage ? { page: 1 } : undefined;
              return _extends$5({}, searchState, nextRefinement, page);
            }

            // eslint-disable-next-line max-params
            function refineMultiIndexWithNamespace(searchState, nextRefinement, context, resetPage, namespace) {
              var _extends4;

              var index = getIndex(context);
              var page = resetPage ? { page: 1 } : undefined;
              var state = has_1(searchState, 'indices.' + index) ? _extends$5({}, searchState.indices, _defineProperty$2({}, index, _extends$5({}, searchState.indices[index], (_extends4 = {}, _defineProperty$2(_extends4, namespace, _extends$5({}, searchState.indices[index][namespace], nextRefinement)), _defineProperty$2(_extends4, 'page', 1), _extends4)))) : _extends$5({}, searchState.indices, _defineProperty$2({}, index, _extends$5(_defineProperty$2({}, namespace, nextRefinement), page)));
              return _extends$5({}, searchState, { indices: state });
            }

            function refineSingleIndexWithNamespace(searchState, nextRefinement, resetPage, namespace) {
              var page = resetPage ? { page: 1 } : undefined;
              return _extends$5({}, searchState, _defineProperty$2({}, namespace, _extends$5({}, searchState[namespace], nextRefinement)), page);
            }

            function getNamespaceAndAttributeName(id) {
              var parts = id.match(/^([^.]*)\.(.*)/);
              var namespace = parts && parts[1];
              var attributeName = parts && parts[2];

              return { namespace: namespace, attributeName: attributeName };
            }

            // eslint-disable-next-line max-params
            function getCurrentRefinementValue(props, searchState, context, id, defaultValue) {
              var refinementsCallback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function (x) {
                return x;
              };

              var index = getIndex(context);

              var _getNamespaceAndAttri = getNamespaceAndAttributeName(id),
                  namespace = _getNamespaceAndAttri.namespace,
                  attributeName = _getNamespaceAndAttri.attributeName;

              var refinements = hasMultipleIndex(context) && searchState.indices && namespace && searchState.indices['' + index] && has_1(searchState.indices['' + index][namespace], '' + attributeName) || hasMultipleIndex(context) && searchState.indices && has_1(searchState, 'indices.' + index + '.' + id) || !hasMultipleIndex(context) && namespace && has_1(searchState[namespace], attributeName) || !hasMultipleIndex(context) && has_1(searchState, id);
              if (refinements) {
                var currentRefinement = void 0;

                if (hasMultipleIndex(context)) {
                  currentRefinement = namespace ? get_1(searchState.indices['' + index][namespace], attributeName) : get_1(searchState.indices[index], id);
                } else {
                  currentRefinement = namespace ? get_1(searchState[namespace], attributeName) : get_1(searchState, id);
                }

                return refinementsCallback(currentRefinement);
              }

              if (props.defaultRefinement) {
                return props.defaultRefinement;
              }

              return defaultValue;
            }

            function cleanUpValue(searchState, context, id) {
              var indexName = getIndex(context);

              var _getNamespaceAndAttri2 = getNamespaceAndAttributeName(id),
                  namespace = _getNamespaceAndAttri2.namespace,
                  attributeName = _getNamespaceAndAttri2.attributeName;

              if (hasMultipleIndex(context) && Boolean(searchState.indices)) {
                return cleanUpValueWithMutliIndex({
                  attribute: attributeName,
                  searchState: searchState,
                  indexName: indexName,
                  id: id,
                  namespace: namespace
                });
              }

              return cleanUpValueWithSingleIndex({
                attribute: attributeName,
                searchState: searchState,
                id: id,
                namespace: namespace
              });
            }

            function cleanUpValueWithSingleIndex(_ref) {
              var searchState = _ref.searchState,
                  id = _ref.id,
                  namespace = _ref.namespace,
                  attribute = _ref.attribute;

              if (namespace) {
                return _extends$5({}, searchState, _defineProperty$2({}, namespace, omit_1(searchState[namespace], attribute)));
              }

              return omit_1(searchState, id);
            }

            function cleanUpValueWithMutliIndex(_ref2) {
              var searchState = _ref2.searchState,
                  indexName = _ref2.indexName,
                  id = _ref2.id,
                  namespace = _ref2.namespace,
                  attribute = _ref2.attribute;

              var index = searchState.indices[indexName];

              if (namespace && index) {
                return _extends$5({}, searchState, {
                  indices: _extends$5({}, searchState.indices, _defineProperty$2({}, indexName, _extends$5({}, index, _defineProperty$2({}, namespace, omit_1(index[namespace], attribute)))))
                });
              }

              return omit_1(searchState, 'indices.' + indexName + '.' + id);
            }

            var _extends$6 = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            function _defineProperty$3(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function getId() {
              return 'configure';
            }

            var connectConfigure = createConnector({
              displayName: 'AlgoliaConfigure',
              getProvidedProps: function getProvidedProps() {
                return {};
              },
              getSearchParameters: function getSearchParameters(searchParameters, props) {
                var items = omit_1(props, 'children');
                return searchParameters.setQueryParameters(items);
              },
              transitionState: function transitionState(props, prevSearchState, nextSearchState) {
                var id = getId();
                var items = omit_1(props, 'children');
                var nonPresentKeys = this._props ? difference_1(keys_1(this._props), keys_1(props)) : [];
                this._props = props;
                var nextValue = _defineProperty$3({}, id, _extends$6({}, omit_1(nextSearchState[id], nonPresentKeys), items));
                return refineValue(nextSearchState, nextValue, this.context);
              },
              cleanUp: function cleanUp(props, searchState) {
                var id = getId();
                var index = getIndex(this.context);
                var subState = hasMultipleIndex(this.context) && searchState.indices ? searchState.indices[index] : searchState;
                var configureKeys = subState && subState[id] ? Object.keys(subState[id]) : [];
                var configureState = configureKeys.reduce(function (acc, item) {
                  if (!props[item]) {
                    acc[item] = subState[id][item];
                  }
                  return acc;
                }, {});
                var nextValue = _defineProperty$3({}, id, configureState);
                return refineValue(searchState, nextValue, this.context);
              }
            });

            /**
             * Configure is a widget that lets you provide raw search parameters
             * to the Algolia API.
             *
             * Any of the props added to this widget will be forwarded to Algolia. For more information
             * on the different parameters that can be set, have a look at the
             * [reference](https://www.algolia.com/doc/api-client/javascript/search#search-parameters).
             *
             * This widget can be used either with react-dom and react-native. It will not render anything
             * on screen, only configure some parameters.
             *
             * Read more in the [Search parameters](guide/Search_parameters.html) guide.
             * @name Configure
             * @kind widget
             * @example
             * import React from 'react';
             * import { InstantSearch, Configure, Hits } from 'react-instantsearch-dom';
             *
             * const App = () => (
             *   <InstantSearch
             *     appId="latency"
             *     apiKey="6be0576ff61c053d5f9a3225e2a90f76"
             *     indexName="instant_search"
             *   >
             *     <Configure hitsPerPage={5} />
             *     <Hits />
             *   </InstantSearch>
             * );
             */

            connectConfigure(function () {
              return null;
            });

            function _defineProperty$4(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function _toConsumableArray(arr) {
              if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                  arr2[i] = arr[i];
                }return arr2;
              } else {
                return Array.from(arr);
              }
            }

            var getId$1 = function getId() {
              return 'query';
            };

            function getCurrentRefinement(props, searchState, context) {
              var id = getId$1();
              return getCurrentRefinementValue(props, searchState, context, id, '', function (currentRefinement) {
                if (currentRefinement) {
                  return currentRefinement;
                }
                return '';
              });
            }

            function getHits(searchResults) {
              if (searchResults.results) {
                if (searchResults.results.hits && Array.isArray(searchResults.results.hits)) {
                  return searchResults.results.hits;
                } else {
                  return Object.keys(searchResults.results).reduce(function (hits, index) {
                    return [].concat(_toConsumableArray(hits), [{
                      index: index,
                      hits: searchResults.results[index].hits
                    }]);
                  }, []);
                }
              } else {
                return [];
              }
            }

            function _refine(props, searchState, nextRefinement, context) {
              var id = getId$1();
              var nextValue = _defineProperty$4({}, id, nextRefinement);
              var resetPage = true;
              return refineValue(searchState, nextValue, context, resetPage);
            }

            function _cleanUp(props, searchState, context) {
              return cleanUpValue(searchState, context, getId$1());
            }

            /**
             * connectAutoComplete connector provides the logic to create connected
             * components that will render the results retrieved from
             * Algolia.
             *
             * To configure the number of hits retrieved, use [HitsPerPage widget](widgets/HitsPerPage.html),
             * [connectHitsPerPage connector](connectors/connectHitsPerPage.html) or pass the hitsPerPage
             * prop to a [Configure](guide/Search_parameters.html) widget.
             * @name connectAutoComplete
             * @kind connector
             * @propType {string} [defaultRefinement] - Provide a default value for the query
             * @providedPropType {array.<object>} hits - the records that matched the search state
             * @providedPropType {function} refine - a function to change the query
             * @providedPropType {string} currentRefinement - the query to search for
             */
            var connectAutoComplete = createConnector({
              displayName: 'AlgoliaAutoComplete',

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                return {
                  hits: getHits(searchResults),
                  currentRefinement: getCurrentRefinement(props, searchState, this.context)
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                return _refine(props, searchState, nextRefinement, this.context);
              },
              cleanUp: function cleanUp(props, searchState) {
                return _cleanUp(props, searchState, this.context);
              },

              /* connectAutoComplete needs to be considered as a widget to trigger a search if no others widgets are used.
               * To be considered as a widget you need either getSearchParameters, getMetadata or getTransitionState
               * See createConnector.js
                * */
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                return searchParameters.setQuery(getCurrentRefinement(props, searchState, this.context));
              }
            });

            function _defineProperty$5(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            var getId$2 = function getId(props) {
              return props.attributes[0];
            };

            var namespace = 'hierarchicalMenu';

            function _refine$1(props, searchState, nextRefinement, context) {
              var id = getId$2(props);
              var nextValue = _defineProperty$5({}, id, nextRefinement || '');
              var resetPage = true;
              return refineValue(searchState, nextValue, context, resetPage, namespace);
            }

            function transformValue(values) {
              return values.reduce(function (acc, item) {
                if (item.isRefined) {
                  acc.push({
                    label: item.name,
                    // If dealing with a nested "items", "value" is equal to the previous value concatenated with the current label
                    // If dealing with the first level, "value" is equal to the current label
                    value: item.path
                  });
                  // Create a variable in order to keep the same acc for the recursion, otherwise "reduce" returns a new one
                  if (item.data) {
                    acc = acc.concat(transformValue(item.data, acc));
                  }
                }
                return acc;
              }, []);
            }

            /**
             * The breadcrumb component is s a type of secondary navigation scheme that
             * reveals the user’s location in a website or web application.
             *
             * @name connectBreadcrumb
             * @requirements To use this widget, your attributes must be formatted in a specific way.
             * If you want for example to have a Breadcrumb of categories, objects in your index
             * should be formatted this way:
             *
             * ```json
             * {
             *   "categories.lvl0": "products",
             *   "categories.lvl1": "products > fruits",
             *   "categories.lvl2": "products > fruits > citrus"
             * }
             * ```
             *
             * It's also possible to provide more than one path for each level:
             *
             * ```json
             * {
             *   "categories.lvl0": ["products", "goods"],
             *   "categories.lvl1": ["products > fruits", "goods > to eat"]
             * }
             * ```
             *
             * All attributes passed to the `attributes` prop must be present in "attributes for faceting"
             * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
             *
             * @kind connector
             * @propType {array.<string>} attributes - List of attributes to use to generate the hierarchy of the menu. See the example for the convention to follow.
             * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
             * @providedPropType {function} refine - a function to toggle a refinement
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {array.<{items: object, count: number, isRefined: boolean, label: string, value: string}>} items - the list of items the Breadcrumb can display.
             */

            var connectBreadcrumb = createConnector({
              displayName: 'AlgoliaBreadcrumb',

              propTypes: {
                attributes: function attributes(props, propName, componentName) {
                  var isNotString = function isNotString(val) {
                    return typeof val !== 'string';
                  };
                  if (!Array.isArray(props[propName]) || props[propName].some(isNotString) || props[propName].length < 1) {
                    return new Error('Invalid prop ' + propName + ' supplied to ' + componentName + '. Expected an Array of Strings');
                  }
                  return undefined;
                },
                transformItems: propTypes.func
              },

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var id = getId$2(props);
                var results = getResults(searchResults, this.context);

                var isFacetPresent = Boolean(results) && Boolean(results.getFacetByName(id));

                if (!isFacetPresent) {
                  return {
                    items: [],
                    canRefine: false
                  };
                }

                var values = results.getFacetValues(id);

                var items = values.data ? transformValue(values.data) : [];

                var transformedItems = props.transformItems ? props.transformItems(items) : items;

                return {
                  canRefine: transformedItems.length > 0,
                  items: transformedItems
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                return _refine$1(props, searchState, nextRefinement, this.context);
              }
            });

            var _extends$7 = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            /**
             * connectCurrentRefinements connector provides the logic to build a widget that will
             * give the user the ability to remove all or some of the filters that were
             * set.
             * @name connectCurrentRefinements
             * @kind connector
             * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
             * @propType {function} [clearsQuery=false] - Pass true to also clear the search query
             * @providedPropType {function} refine - a function to remove a single filter
             * @providedPropType {array.<{label: string, attribute: string, currentRefinement: string || object, items: array, value: function}>} items - all the filters, the `value` is to pass to the `refine` function for removing all currentrefinements, `label` is for the display. When existing several refinements for the same atribute name, then you get a nested `items` object that contains a `label` and a `value` function to use to remove a single filter. `attribute` and `currentRefinement` are metadata containing row values.
             * @providedPropType {string} query - the search query
             */
            var connectCurrentRefinements = createConnector({
              displayName: 'AlgoliaCurrentRefinements',

              propTypes: {
                transformItems: propTypes.func
              },

              getProvidedProps: function getProvidedProps(props, searchState, searchResults, metadata) {
                var items = metadata.reduce(function (res, meta) {
                  if (typeof meta.items !== 'undefined') {
                    if (!props.clearsQuery && meta.id === 'query') {
                      return res;
                    } else {
                      if (props.clearsQuery && meta.id === 'query' && meta.items[0].currentRefinement === '') {
                        return res;
                      }
                      return res.concat(meta.items.map(function (item) {
                        return _extends$7({}, item, {
                          id: meta.id,
                          index: meta.index
                        });
                      }));
                    }
                  }
                  return res;
                }, []);

                var transformedItems = props.transformItems ? props.transformItems(items) : items;

                return {
                  items: transformedItems,
                  canRefine: transformedItems.length > 0
                };
              },
              refine: function refine(props, searchState, items) {
                // `value` corresponds to our internal clear function computed in each connector metadata.
                var refinementsToClear = items instanceof Array ? items.map(function (item) {
                  return item.value;
                }) : [items];
                return refinementsToClear.reduce(function (res, clear) {
                  return clear(res);
                }, searchState);
              }
            });

            function _defineProperty$6(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function _objectWithoutProperties(obj, keys) {
              var target = {};for (var i in obj) {
                if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
              }return target;
            }

            /**
             * The GeoSearch connector provides the logic to build a widget that will display the results on a map.
             * It also provides a way to search for results based on their position. The connector provides function to manage the search experience (search on map interaction).
             * @name connectGeoSearch
             * @kind connector
             * @requirements Note that the GeoSearch connector uses the [geosearch](https://www.algolia.com/doc/guides/searching/geo-search) capabilities of Algolia.
             * Your hits **must** have a `_geoloc` attribute in order to be passed to the rendering function. Currently, the feature is not compatible with multiple values in the `_geoloc` attribute
             * (e.g. a restaurant with multiple locations). In that case you can duplicate your records and use the [distinct](https://www.algolia.com/doc/guides/ranking/distinct) feature of Algolia to only retrieve unique results.
             * @propType {{ northEast: { lat: number, lng: number }, southWest: { lat: number, lng: number } }} [defaultRefinement] - Default search state of the widget containing the bounds for the map
             * @providedPropType {function({ northEast: { lat: number, lng: number }, southWest: { lat: number, lng: number } })} refine - a function to toggle the refinement
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {array.<object>} hits - the records that matched the search
             * @providedPropType {boolean} isRefinedWithMap - true if the current refinement is set with the map bounds
             * @providedPropType {{ northEast: { lat: number, lng: number }, southWest: { lat: number, lng: number } }} [currentRefinement] - the refinement currently applied
             * @providedPropType {{ lat: number, lng: number }} [position] - the position of the search
             */

            // To control the map with an external widget the other widget
            // **must** write the value in the attribute `aroundLatLng`
            var getBoundingBoxId = function getBoundingBoxId() {
              return 'boundingBox';
            };
            var getAroundLatLngId = function getAroundLatLngId() {
              return 'aroundLatLng';
            };
            var getConfigureAroundLatLngId = function getConfigureAroundLatLngId() {
              return 'configure.aroundLatLng';
            };

            var currentRefinementToString = function currentRefinementToString(currentRefinement) {
              return [currentRefinement.northEast.lat, currentRefinement.northEast.lng, currentRefinement.southWest.lat, currentRefinement.southWest.lng].join();
            };

            var stringToCurrentRefinement = function stringToCurrentRefinement(value) {
              var values = value.split(',');

              return {
                northEast: {
                  lat: parseFloat(values[0]),
                  lng: parseFloat(values[1])
                },
                southWest: {
                  lat: parseFloat(values[2]),
                  lng: parseFloat(values[3])
                }
              };
            };

            var latLngRegExp = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/;
            var stringToPosition = function stringToPosition(value) {
              var pattern = value.match(latLngRegExp);

              return {
                lat: parseFloat(pattern[1]),
                lng: parseFloat(pattern[2])
              };
            };

            var getCurrentRefinement$1 = function getCurrentRefinement(props, searchState, context) {
              var refinement = getCurrentRefinementValue(props, searchState, context, getBoundingBoxId(), {});

              if (isEmpty_1(refinement)) {
                return;
              }

              // eslint-disable-next-line consistent-return
              return {
                northEast: {
                  lat: parseFloat(refinement.northEast.lat),
                  lng: parseFloat(refinement.northEast.lng)
                },
                southWest: {
                  lat: parseFloat(refinement.southWest.lat),
                  lng: parseFloat(refinement.southWest.lng)
                }
              };
            };

            var getCurrentPosition = function getCurrentPosition(props, searchState, context) {
              var defaultRefinement = props.defaultRefinement,
                  propsWithoutDefaultRefinement = _objectWithoutProperties(props, ['defaultRefinement']);

              var aroundLatLng = getCurrentRefinementValue(propsWithoutDefaultRefinement, searchState, context, getAroundLatLngId());

              if (!aroundLatLng) {
                // Fallback on `configure.aroundLatLng`
                var configureAroundLatLng = getCurrentRefinementValue(propsWithoutDefaultRefinement, searchState, context, getConfigureAroundLatLngId());

                return configureAroundLatLng && stringToPosition(configureAroundLatLng);
              }

              return aroundLatLng;
            };

            var _refine$2 = function _refine(searchState, nextValue, context) {
              var resetPage = true;
              var nextRefinement = _defineProperty$6({}, getBoundingBoxId(), nextValue);

              return refineValue(searchState, nextRefinement, context, resetPage);
            };

            var connectGeoSearch = createConnector({
              displayName: 'AlgoliaGeoSearch',

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var results = getResults(searchResults, this.context);

                // We read it from both because the SearchParameters & the searchState are not always
                // in sync. When we set the refinement the searchState is used but when we clear the refinement
                // the SearchParameters is used. In the first case when we render, the results are not there
                // so we can't find the value from the results. The most up to date value is the searchState.
                // But when we clear the refinement the searchState is immediatly cleared even when the items
                // retrieved are still the one from the previous query with the bounding box. It leads to some
                // issue with the position of the map. We should rely on 1 source of truth or at least always
                // be sync.

                var currentRefinementFromSearchState = getCurrentRefinement$1(props, searchState, this.context);

                var currentRefinementFromSearchParameters = results && results._state.insideBoundingBox && stringToCurrentRefinement(results._state.insideBoundingBox) || undefined;

                var currentPositionFromSearchState = getCurrentPosition(props, searchState, this.context);

                var currentPositionFromSearchParameters = results && results._state.aroundLatLng && stringToPosition(results._state.aroundLatLng) || undefined;

                var currentRefinement = currentRefinementFromSearchState || currentRefinementFromSearchParameters;

                var position = currentPositionFromSearchState || currentPositionFromSearchParameters;

                return {
                  hits: !results ? [] : results.hits.filter(function (_) {
                    return Boolean(_._geoloc);
                  }),
                  isRefinedWithMap: Boolean(currentRefinement),
                  currentRefinement: currentRefinement,
                  position: position
                };
              },
              refine: function refine(props, searchState, nextValue) {
                return _refine$2(searchState, nextValue, this.context);
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                var currentRefinement = getCurrentRefinement$1(props, searchState, this.context);

                if (!currentRefinement) {
                  return searchParameters;
                }

                return searchParameters.setQueryParameter('insideBoundingBox', currentRefinementToString(currentRefinement));
              },
              cleanUp: function cleanUp(props, searchState) {
                return cleanUpValue(searchState, this.context, getBoundingBoxId());
              },
              getMetadata: function getMetadata(props, searchState) {
                var _this = this;

                var items = [];
                var id = getBoundingBoxId();
                var index = getIndex(this.context);
                var nextRefinement = {};
                var currentRefinement = getCurrentRefinement$1(props, searchState, this.context);

                if (currentRefinement) {
                  items.push({
                    label: id + ': ' + currentRefinementToString(currentRefinement),
                    value: function value(nextState) {
                      return _refine$2(nextState, nextRefinement, _this.context);
                    },
                    currentRefinement: currentRefinement
                  });
                }

                return {
                  id: id,
                  index: index,
                  items: items
                };
              },
              shouldComponentUpdate: function shouldComponentUpdate() {
                return true;
              }
            });

            var _extends$8 = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            function _defineProperty$7(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            var getId$3 = function getId(props) {
              return props.attributes[0];
            };

            var namespace$1 = 'hierarchicalMenu';

            function getCurrentRefinement$2(props, searchState, context) {
              return getCurrentRefinementValue(props, searchState, context, namespace$1 + '.' + getId$3(props), null, function (currentRefinement) {
                if (currentRefinement === '') {
                  return null;
                }
                return currentRefinement;
              });
            }

            function getValue$1(path, props, searchState, context) {
              var id = props.id,
                  attributes = props.attributes,
                  separator = props.separator,
                  rootPath = props.rootPath,
                  showParentLevel = props.showParentLevel;

              var currentRefinement = getCurrentRefinement$2(props, searchState, context);
              var nextRefinement = void 0;

              if (currentRefinement === null) {
                nextRefinement = path;
              } else {
                var tmpSearchParameters = new algoliasearchHelper_4({
                  hierarchicalFacets: [{
                    name: id,
                    attributes: attributes,
                    separator: separator,
                    rootPath: rootPath,
                    showParentLevel: showParentLevel
                  }]
                });

                nextRefinement = tmpSearchParameters.toggleHierarchicalFacetRefinement(id, currentRefinement).toggleHierarchicalFacetRefinement(id, path).getHierarchicalRefinement(id)[0];
              }

              return nextRefinement;
            }

            function transformValue$1(value, props, searchState, context) {
              return value.map(function (v) {
                return {
                  label: v.name,
                  value: getValue$1(v.path, props, searchState, context),
                  count: v.count,
                  isRefined: v.isRefined,
                  items: v.data && transformValue$1(v.data, props, searchState, context)
                };
              });
            }

            var truncate = function truncate() {
              var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
              var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
              return items.slice(0, limit).map(function () {
                var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                return Array.isArray(item.items) ? _extends$8({}, item, {
                  items: truncate(item.items, limit)
                }) : item;
              });
            };

            function _refine$3(props, searchState, nextRefinement, context) {
              var id = getId$3(props);
              var nextValue = _defineProperty$7({}, id, nextRefinement || '');
              var resetPage = true;
              return refineValue(searchState, nextValue, context, resetPage, namespace$1);
            }

            function _cleanUp$1(props, searchState, context) {
              return cleanUpValue(searchState, context, namespace$1 + '.' + getId$3(props));
            }

            var sortBy = ['name:asc'];

            /**
             * connectHierarchicalMenu connector provides the logic to build a widget that will
             * give the user the ability to explore a tree-like structure.
             * This is commonly used for multi-level categorization of products on e-commerce
             * websites. From a UX point of view, we suggest not displaying more than two levels deep.
             * @name connectHierarchicalMenu
             * @requirements To use this widget, your attributes must be formatted in a specific way.
             * If you want for example to have a hiearchical menu of categories, objects in your index
             * should be formatted this way:
             *
             * ```json
             * {
             *   "categories.lvl0": "products",
             *   "categories.lvl1": "products > fruits",
             *   "categories.lvl2": "products > fruits > citrus"
             * }
             * ```
             *
             * It's also possible to provide more than one path for each level:
             *
             * ```json
             * {
             *   "categories.lvl0": ["products", "goods"],
             *   "categories.lvl1": ["products > fruits", "goods > to eat"]
             * }
             * ```
             *
             * All attributes passed to the `attributes` prop must be present in "attributes for faceting"
             * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
             *
             * @kind connector
             * @propType {array.<string>} attributes - List of attributes to use to generate the hierarchy of the menu. See the example for the convention to follow.
             * @propType {string} [defaultRefinement] - the item value selected by default
             * @propType {boolean} [showMore=false] - Flag to activate the show more button, for toggling the number of items between limit and showMoreLimit.
             * @propType {number} [limit=10] -  The maximum number of items displayed.
             * @propType {number} [showMoreLimit=20] -  The maximum number of items displayed when the user triggers the show more. Not considered if `showMore` is false.
             * @propType {string} [separator='>'] -  Specifies the level separator used in the data.
             * @propType {string} [rootPath=null] - The path to use if the first level is not the root level.
             * @propType {boolean} [showParentLevel=true] - Flag to set if the parent level should be displayed.
             * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
             * @providedPropType {function} refine - a function to toggle a refinement
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {string} currentRefinement - the refinement currently applied
             * @providedPropType {array.<{items: object, count: number, isRefined: boolean, label: string, value: string}>} items - the list of items the HierarchicalMenu can display. items has the same shape as parent items.
             */
            var connectHierarchicalMenu = createConnector({
              displayName: 'AlgoliaHierarchicalMenu',

              propTypes: {
                attributes: function attributes(props, propName, componentName) {
                  var isNotString = function isNotString(val) {
                    return typeof val !== 'string';
                  };
                  if (!Array.isArray(props[propName]) || props[propName].some(isNotString) || props[propName].length < 1) {
                    return new Error('Invalid prop ' + propName + ' supplied to ' + componentName + '. Expected an Array of Strings');
                  }
                  return undefined;
                },
                separator: propTypes.string,
                rootPath: propTypes.string,
                showParentLevel: propTypes.bool,
                defaultRefinement: propTypes.string,
                showMore: propTypes.bool,
                limit: propTypes.number,
                showMoreLimit: propTypes.number,
                transformItems: propTypes.func
              },

              defaultProps: {
                showMore: false,
                limit: 10,
                showMoreLimit: 20,
                separator: ' > ',
                rootPath: null,
                showParentLevel: true
              },

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var showMore = props.showMore,
                    limit = props.limit,
                    showMoreLimit = props.showMoreLimit;

                var id = getId$3(props);

                var results = getResults(searchResults, this.context);
                var isFacetPresent = Boolean(results) && Boolean(results.getFacetByName(id));

                if (!isFacetPresent) {
                  return {
                    items: [],
                    currentRefinement: getCurrentRefinement$2(props, searchState, this.context),
                    canRefine: false
                  };
                }
                var itemsLimit = showMore ? showMoreLimit : limit;
                var value = results.getFacetValues(id, { sortBy: sortBy });
                var items = value.data ? transformValue$1(value.data, props, searchState, this.context) : [];
                var transformedItems = props.transformItems ? props.transformItems(items) : items;
                return {
                  items: truncate(transformedItems, itemsLimit),
                  currentRefinement: getCurrentRefinement$2(props, searchState, this.context),
                  canRefine: transformedItems.length > 0
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                return _refine$3(props, searchState, nextRefinement, this.context);
              },
              cleanUp: function cleanUp(props, searchState) {
                return _cleanUp$1(props, searchState, this.context);
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                var attributes = props.attributes,
                    separator = props.separator,
                    rootPath = props.rootPath,
                    showParentLevel = props.showParentLevel,
                    showMore = props.showMore,
                    limit = props.limit,
                    showMoreLimit = props.showMoreLimit;

                var id = getId$3(props);
                var itemsLimit = showMore ? showMoreLimit : limit;

                searchParameters = searchParameters.addHierarchicalFacet({
                  name: id,
                  attributes: attributes,
                  separator: separator,
                  rootPath: rootPath,
                  showParentLevel: showParentLevel
                }).setQueryParameters({
                  maxValuesPerFacet: Math.max(searchParameters.maxValuesPerFacet || 0, itemsLimit)
                });

                var currentRefinement = getCurrentRefinement$2(props, searchState, this.context);
                if (currentRefinement !== null) {
                  searchParameters = searchParameters.toggleHierarchicalFacetRefinement(id, currentRefinement);
                }

                return searchParameters;
              },
              getMetadata: function getMetadata(props, searchState) {
                var _this = this;

                var rootAttribute = props.attributes[0];
                var id = getId$3(props);
                var currentRefinement = getCurrentRefinement$2(props, searchState, this.context);

                return {
                  id: id,
                  index: getIndex(this.context),
                  items: !currentRefinement ? [] : [{
                    label: rootAttribute + ': ' + currentRefinement,
                    attribute: rootAttribute,
                    value: function value(nextState) {
                      return _refine$3(props, nextState, '', _this.context);
                    },
                    currentRefinement: currentRefinement
                  }]
                };
              }
            });

            var highlight = function highlight(_ref) {
              var attribute = _ref.attribute,
                  hit = _ref.hit,
                  highlightProperty = _ref.highlightProperty,
                  _ref$preTag = _ref.preTag,
                  preTag = _ref$preTag === undefined ? HIGHLIGHT_TAGS.highlightPreTag : _ref$preTag,
                  _ref$postTag = _ref.postTag,
                  postTag = _ref$postTag === undefined ? HIGHLIGHT_TAGS.highlightPostTag : _ref$postTag;
              return parseAlgoliaHit({
                attribute: attribute,
                highlightProperty: highlightProperty,
                hit: hit,
                preTag: preTag,
                postTag: postTag
              });
            };

            /**
             * connectHighlight connector provides the logic to create an highlighter
             * component that will retrieve, parse and render an highlighted attribute
             * from an Algolia hit.
             * @name connectHighlight
             * @kind connector
             * @category connector
             * @providedPropType {function} highlight - function to retrieve and parse an attribute from a hit. It takes a configuration object with 3 attributes: `highlightProperty` which is the property that contains the highlight structure from the records, `attribute` which is the name of the attribute (it can be either a string or an array of strings) to look for and `hit` which is the hit from Algolia. It returns an array of objects `{value: string, isHighlighted: boolean}`. If the element that corresponds to the attribute is an array of strings, it will return a nested array of objects.
             * @example
             * import React from 'react';
             * import { InstantSearch, SearchBox, Hits, connectHighlight } from 'react-instantsearch-dom';
             *
             * const CustomHighlight = connectHighlight(
             *   ({ highlight, attribute, hit, highlightProperty }) => {
             *     const highlights = highlight({
             *       highlightProperty: '_highlightResult',
             *       attribute,
             *       hit
             *     });
             *
             *     return highlights.map(part => part.isHighlighted ? (
             *       <mark>{part.value}</mark>
             *     ) : (
             *       <span>{part.value}</span>
             *     ));
             *   }
             * );
             *
             * const Hit = ({ hit }) => (
             *   <p>
             *     <CustomHighlight attribute="name" hit={hit} />
             *   </p>
             * );
             *
             * const App = () => (
             *   <InstantSearch
             *     appId="latency"
             *     apiKey="6be0576ff61c053d5f9a3225e2a90f76"
             *     indexName="instant_search"
             *   >
             *     <SearchBox defaultRefinement="pho" />
             *     <Hits hitComponent={Hit} />
             *   </InstantSearch>
             * );
             */
            var connectHighlight = createConnector({
              displayName: 'AlgoliaHighlighter',

              propTypes: {},

              getProvidedProps: function getProvidedProps() {
                return { highlight: highlight };
              }
            });

            /**
             * connectHits connector provides the logic to create connected
             * components that will render the results retrieved from
             * Algolia.
             *
             * To configure the number of hits retrieved, use [HitsPerPage widget](widgets/HitsPerPage.html),
             * [connectHitsPerPage connector](connectors/connectHitsPerPage.html) or pass the hitsPerPage
             * prop to a [Configure](guide/Search_parameters.html) widget.
             *
             * **Warning:** you will need to use the **objectID** property available on every hit as a key
             * when iterating over them. This will ensure you have the best possible UI experience
             * especially on slow networks.
             * @name connectHits
             * @kind connector
             * @providedPropType {array.<object>} hits - the records that matched the search state
             * @example
             * import React from 'react';
             * import { InstantSearch, Highlight, connectHits } from 'react-instantsearch-dom';
             *
             * const CustomHits = connectHits(({ hits }) => (
             *   <div>
             *     {hits.map(hit =>
             *       <p key={hit.objectID}>
             *         <Highlight attribute="name" hit={hit} />
             *       </p>
             *     )}
             *   </div>
             * ));
             *
             * const App = () => (
             *   <InstantSearch
             *     appId="latency"
             *     apiKey="6be0576ff61c053d5f9a3225e2a90f76"
             *     indexName="instant_search"
             *   >
             *     <CustomHits />
             *   </InstantSearch>
             * );
             */
            var connectHits = createConnector({
              displayName: 'AlgoliaHits',

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var results = getResults(searchResults, this.context);
                var hits = results ? results.hits : [];

                return { hits: hits };
              },

              /* Hits needs to be considered as a widget to trigger a search if no others widgets are used.
               * To be considered as a widget you need either getSearchParameters, getMetadata or getTransitionState
               * See createConnector.js
               * */
              getSearchParameters: function getSearchParameters(searchParameters) {
                return searchParameters;
              }
            });

            var _extends$9 = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            function _defineProperty$8(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function getId$4() {
              return 'hitsPerPage';
            }

            function getCurrentRefinement$3(props, searchState, context) {
              var id = getId$4();
              return getCurrentRefinementValue(props, searchState, context, id, null, function (currentRefinement) {
                if (typeof currentRefinement === 'string') {
                  return parseInt(currentRefinement, 10);
                }
                return currentRefinement;
              });
            }

            /**
             * connectHitsPerPage connector provides the logic to create connected
             * components that will allow a user to choose to display more or less results from Algolia.
             * @name connectHitsPerPage
             * @kind connector
             * @propType {number} defaultRefinement - The number of items selected by default
             * @propType {{value: number, label: string}[]} items - List of hits per page options.
             * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
             * @providedPropType {function} refine - a function to remove a single filter
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {string} currentRefinement - the refinement currently applied
             * @providedPropType {array.<{isRefined: boolean, label?: string, value: number}>} items - the list of items the HitsPerPage can display. If no label provided, the value will be displayed.
             */
            var connectHitsPerPage = createConnector({
              displayName: 'AlgoliaHitsPerPage',

              propTypes: {
                defaultRefinement: propTypes.number.isRequired,
                items: propTypes.arrayOf(propTypes.shape({
                  label: propTypes.string,
                  value: propTypes.number.isRequired
                })).isRequired,
                transformItems: propTypes.func
              },

              getProvidedProps: function getProvidedProps(props, searchState) {
                var currentRefinement = getCurrentRefinement$3(props, searchState, this.context);
                var items = props.items.map(function (item) {
                  return item.value === currentRefinement ? _extends$9({}, item, { isRefined: true }) : _extends$9({}, item, { isRefined: false });
                });
                return {
                  items: props.transformItems ? props.transformItems(items) : items,
                  currentRefinement: currentRefinement
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                var id = getId$4();
                var nextValue = _defineProperty$8({}, id, nextRefinement);
                var resetPage = true;
                return refineValue(searchState, nextValue, this.context, resetPage);
              },
              cleanUp: function cleanUp(props, searchState) {
                return cleanUpValue(searchState, this.context, getId$4());
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                return searchParameters.setHitsPerPage(getCurrentRefinement$3(props, searchState, this.context));
              },
              getMetadata: function getMetadata() {
                return { id: getId$4() };
              }
            });

            function _defineProperty$9(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function _toConsumableArray$1(arr) {
              if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                  arr2[i] = arr[i];
                }return arr2;
              } else {
                return Array.from(arr);
              }
            }

            function getId$5() {
              return 'page';
            }

            function getCurrentRefinement$4(props, searchState, context) {
              var id = getId$5();
              var page = 1;
              return getCurrentRefinementValue(props, searchState, context, id, page, function (currentRefinement) {
                if (typeof currentRefinement === 'string') {
                  currentRefinement = parseInt(currentRefinement, 10);
                }
                return currentRefinement;
              });
            }

            /**
             * InfiniteHits connector provides the logic to create connected
             * components that will render an continuous list of results retrieved from
             * Algolia. This connector provides a function to load more results.
             * @name connectInfiniteHits
             * @kind connector
             * @providedPropType {array.<object>} hits - the records that matched the search state
             * @providedPropType {boolean} hasMore - indicates if there are more pages to load
             * @providedPropType {function} refine - call to load more results
             */
            var connectInfiniteHits = createConnector({
              displayName: 'AlgoliaInfiniteHits',

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var results = getResults(searchResults, this.context);

                this._allResults = this._allResults || [];
                this._previousPage = this._previousPage || 0;

                if (!results) {
                  return {
                    hits: [],
                    hasMore: false
                  };
                }

                var hits = results.hits,
                    page = results.page,
                    nbPages = results.nbPages;

                if (page === 0) {
                  this._allResults = hits;
                } else if (page > this._previousPage) {
                  this._allResults = [].concat(_toConsumableArray$1(this._allResults), _toConsumableArray$1(hits));
                } else if (page < this._previousPage) {
                  this._allResults = hits;
                }

                var lastPageIndex = nbPages - 1;
                var hasMore = page < lastPageIndex;

                this._previousPage = page;

                return {
                  hits: this._allResults,
                  hasMore: hasMore
                };
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                return searchParameters.setQueryParameters({
                  page: getCurrentRefinement$4(props, searchState, this.context) - 1
                });
              },
              refine: function refine(props, searchState) {
                var id = getId$5();
                var nextPage = getCurrentRefinement$4(props, searchState, this.context) + 1;
                var nextValue = _defineProperty$9({}, id, nextPage);
                var resetPage = false;
                return refineValue(searchState, nextValue, this.context, resetPage);
              }
            });

            function _defineProperty$a(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            var namespace$2 = 'menu';

            function getId$6(props) {
              return props.attribute;
            }

            function getCurrentRefinement$5(props, searchState, context) {
              return getCurrentRefinementValue(props, searchState, context, namespace$2 + '.' + getId$6(props), null, function (currentRefinement) {
                if (currentRefinement === '') {
                  return null;
                }
                return currentRefinement;
              });
            }

            function getValue$2(name, props, searchState, context) {
              var currentRefinement = getCurrentRefinement$5(props, searchState, context);
              return name === currentRefinement ? '' : name;
            }

            function getLimit(_ref) {
              var showMore = _ref.showMore,
                  limit = _ref.limit,
                  showMoreLimit = _ref.showMoreLimit;

              return showMore ? showMoreLimit : limit;
            }

            function _refine$4(props, searchState, nextRefinement, context) {
              var id = getId$6(props);
              var nextValue = _defineProperty$a({}, id, nextRefinement ? nextRefinement : '');
              var resetPage = true;
              return refineValue(searchState, nextValue, context, resetPage, namespace$2);
            }

            function _cleanUp$2(props, searchState, context) {
              return cleanUpValue(searchState, context, namespace$2 + '.' + getId$6(props));
            }

            var sortBy$1 = ['count:desc', 'name:asc'];

            /**
             * connectMenu connector provides the logic to build a widget that will
             * give the user the ability to choose a single value for a specific facet.
             * @name connectMenu
             * @requirements The attribute passed to the `attribute` prop must be present in "attributes for faceting"
             * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
             * @kind connector
             * @propType {string} attribute - the name of the attribute in the record
             * @propType {boolean} [showMore=false] - true if the component should display a button that will expand the number of items
             * @propType {number} [limit=10] - the minimum number of diplayed items
             * @propType {number} [showMoreLimit=20] - the maximun number of displayed items. Only used when showMore is set to `true`
             * @propType {string} [defaultRefinement] - the value of the item selected by default
             * @propType {boolean} [searchable=false] - allow search inside values
             * @providedPropType {function} refine - a function to toggle a refinement
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {string} currentRefinement - the refinement currently applied
             * @providedPropType {array.<{count: number, isRefined: boolean, label: string, value: string}>} items - the list of items the Menu can display.
             * @providedPropType {function} searchForItems - a function to toggle a search inside items values
             * @providedPropType {boolean} isFromSearch - a boolean that says if the `items` props contains facet values from the global search or from the search inside items.
             */
            var connectMenu = createConnector({
              displayName: 'AlgoliaMenu',

              propTypes: {
                attribute: propTypes.string.isRequired,
                showMore: propTypes.bool,
                limit: propTypes.number,
                showMoreLimit: propTypes.number,
                defaultRefinement: propTypes.string,
                transformItems: propTypes.func,
                searchable: propTypes.bool
              },

              defaultProps: {
                showMore: false,
                limit: 10,
                showMoreLimit: 20
              },

              getProvidedProps: function getProvidedProps(props, searchState, searchResults, meta, searchForFacetValuesResults) {
                var _this = this;

                var attribute = props.attribute,
                    searchable = props.searchable;

                var results = getResults(searchResults, this.context);

                var canRefine = Boolean(results) && Boolean(results.getFacetByName(attribute));

                var isFromSearch = Boolean(searchForFacetValuesResults && searchForFacetValuesResults[attribute] && searchForFacetValuesResults.query !== '');

                // Search For Facet Values is not available with derived helper (used for multi index search)
                if (searchable && this.context.multiIndexContext) {
                  throw new Error('react-instantsearch: searching in *List is not available when used inside a' + ' multi index context');
                }

                if (!canRefine) {
                  return {
                    items: [],
                    currentRefinement: getCurrentRefinement$5(props, searchState, this.context),
                    isFromSearch: isFromSearch,
                    searchable: searchable,
                    canRefine: canRefine
                  };
                }

                var items = isFromSearch ? searchForFacetValuesResults[attribute].map(function (v) {
                  return {
                    label: v.value,
                    value: getValue$2(v.value, props, searchState, _this.context),
                    _highlightResult: { label: { value: v.highlighted } },
                    count: v.count,
                    isRefined: v.isRefined
                  };
                }) : results.getFacetValues(attribute, { sortBy: sortBy$1 }).map(function (v) {
                  return {
                    label: v.name,
                    value: getValue$2(v.name, props, searchState, _this.context),
                    count: v.count,
                    isRefined: v.isRefined
                  };
                });

                var sortedItems = searchable && !isFromSearch ? orderBy_1(items, ['isRefined', 'count', 'label'], ['desc', 'desc', 'asc']) : items;

                var transformedItems = props.transformItems ? props.transformItems(sortedItems) : sortedItems;

                return {
                  items: transformedItems.slice(0, getLimit(props)),
                  currentRefinement: getCurrentRefinement$5(props, searchState, this.context),
                  isFromSearch: isFromSearch,
                  searchable: searchable,
                  canRefine: transformedItems.length > 0
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                return _refine$4(props, searchState, nextRefinement, this.context);
              },
              searchForFacetValues: function searchForFacetValues(props, searchState, nextRefinement) {
                return {
                  facetName: props.attribute,
                  query: nextRefinement,
                  maxFacetHits: getLimit(props)
                };
              },
              cleanUp: function cleanUp(props, searchState) {
                return _cleanUp$2(props, searchState, this.context);
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                var attribute = props.attribute;

                searchParameters = searchParameters.setQueryParameters({
                  maxValuesPerFacet: Math.max(searchParameters.maxValuesPerFacet || 0, getLimit(props))
                });

                searchParameters = searchParameters.addDisjunctiveFacet(attribute);

                var currentRefinement = getCurrentRefinement$5(props, searchState, this.context);
                if (currentRefinement !== null) {
                  searchParameters = searchParameters.addDisjunctiveFacetRefinement(attribute, currentRefinement);
                }

                return searchParameters;
              },
              getMetadata: function getMetadata(props, searchState) {
                var _this2 = this;

                var id = getId$6(props);
                var currentRefinement = getCurrentRefinement$5(props, searchState, this.context);
                return {
                  id: id,
                  index: getIndex(this.context),
                  items: currentRefinement === null ? [] : [{
                    label: props.attribute + ': ' + currentRefinement,
                    attribute: props.attribute,
                    value: function value(nextState) {
                      return _refine$4(props, nextState, '', _this2.context);
                    },
                    currentRefinement: currentRefinement
                  }]
                };
              }
            });

            var _slicedToArray = function () {
              function sliceIterator(arr, i) {
                var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
                  for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);if (i && _arr.length === i) break;
                  }
                } catch (err) {
                  _d = true;_e = err;
                } finally {
                  try {
                    if (!_n && _i["return"]) _i["return"]();
                  } finally {
                    if (_d) throw _e;
                  }
                }return _arr;
              }return function (arr, i) {
                if (Array.isArray(arr)) {
                  return arr;
                } else if (Symbol.iterator in Object(arr)) {
                  return sliceIterator(arr, i);
                } else {
                  throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
              };
            }();

            function _defineProperty$b(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function stringifyItem(item) {
              if (typeof item.start === 'undefined' && typeof item.end === 'undefined') {
                return '';
              }
              return (item.start ? item.start : '') + ':' + (item.end ? item.end : '');
            }

            function parseItem(value) {
              if (value.length === 0) {
                return { start: null, end: null };
              }

              var _value$split = value.split(':'),
                  _value$split2 = _slicedToArray(_value$split, 2),
                  startStr = _value$split2[0],
                  endStr = _value$split2[1];

              return {
                start: startStr.length > 0 ? parseInt(startStr, 10) : null,
                end: endStr.length > 0 ? parseInt(endStr, 10) : null
              };
            }

            var namespace$3 = 'multiRange';

            function getId$7(props) {
              return props.attribute;
            }

            function getCurrentRefinement$6(props, searchState, context) {
              return getCurrentRefinementValue(props, searchState, context, namespace$3 + '.' + getId$7(props), '', function (currentRefinement) {
                if (currentRefinement === '') {
                  return '';
                }
                return currentRefinement;
              });
            }

            function isRefinementsRangeIncludesInsideItemRange(stats, start, end) {
              return stats.min > start && stats.min < end || stats.max > start && stats.max < end;
            }

            function isItemRangeIncludedInsideRefinementsRange(stats, start, end) {
              return start > stats.min && start < stats.max || end > stats.min && end < stats.max;
            }

            function itemHasRefinement(attribute, results, value) {
              var stats = results.getFacetByName(attribute) ? results.getFacetStats(attribute) : null;
              var range = value.split(':');
              var start = Number(range[0]) === 0 || value === '' ? Number.NEGATIVE_INFINITY : Number(range[0]);
              var end = Number(range[1]) === 0 || value === '' ? Number.POSITIVE_INFINITY : Number(range[1]);
              return !(Boolean(stats) && (isRefinementsRangeIncludesInsideItemRange(stats, start, end) || isItemRangeIncludedInsideRefinementsRange(stats, start, end)));
            }

            function _refine$5(props, searchState, nextRefinement, context) {
              var nextValue = _defineProperty$b({}, getId$7(props, searchState), nextRefinement);
              var resetPage = true;
              return refineValue(searchState, nextValue, context, resetPage, namespace$3);
            }

            function _cleanUp$3(props, searchState, context) {
              return cleanUpValue(searchState, context, namespace$3 + '.' + getId$7(props));
            }

            /**
             * connectNumericMenu connector provides the logic to build a widget that will
             * give the user the ability to select a range value for a numeric attribute.
             * Ranges are defined statically.
             * @name connectNumericMenu
             * @requirements The attribute passed to the `attribute` prop must be holding numerical values.
             * @kind connector
             * @propType {string} attribute - the name of the attribute in the records
             * @propType {{label: string, start: number, end: number}[]} items - List of options. With a text label, and upper and lower bounds.
             * @propType {string} [defaultRefinement] - the value of the item selected by default, follow the shape of a `string` with a pattern of `'{start}:{end}'`.
             * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
             * @providedPropType {function} refine - a function to select a range.
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {string} currentRefinement - the refinement currently applied.  follow the shape of a `string` with a pattern of `'{start}:{end}'` which corresponds to the current selected item. For instance, when the selected item is `{start: 10, end: 20}`, the searchState of the widget is `'10:20'`. When `start` isn't defined, the searchState of the widget is `':{end}'`, and the same way around when `end` isn't defined. However, when neither `start` nor `end` are defined, the searchState is an empty string.
             * @providedPropType {array.<{isRefined: boolean, label: string, value: string, isRefined: boolean, noRefinement: boolean}>} items - the list of ranges the NumericMenu can display.
             */
            var connectNumericMenu = createConnector({
              displayName: 'AlgoliaNumericMenu',

              propTypes: {
                id: propTypes.string,
                attribute: propTypes.string.isRequired,
                items: propTypes.arrayOf(propTypes.shape({
                  label: propTypes.node,
                  start: propTypes.number,
                  end: propTypes.number
                })).isRequired,
                transformItems: propTypes.func
              },

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var attribute = props.attribute;
                var currentRefinement = getCurrentRefinement$6(props, searchState, this.context);
                var results = getResults(searchResults, this.context);

                var items = props.items.map(function (item) {
                  var value = stringifyItem(item);
                  return {
                    label: item.label,
                    value: value,
                    isRefined: value === currentRefinement,
                    noRefinement: results ? itemHasRefinement(getId$7(props), results, value) : false
                  };
                });

                var stats = results && results.getFacetByName(attribute) ? results.getFacetStats(attribute) : null;
                var refinedItem = find_1(items, function (item) {
                  return item.isRefined === true;
                });
                if (!items.some(function (item) {
                  return item.value === '';
                })) {
                  items.push({
                    value: '',
                    isRefined: isEmpty_1(refinedItem),
                    noRefinement: !stats,
                    label: 'All'
                  });
                }

                var transformedItems = props.transformItems ? props.transformItems(items) : items;

                return {
                  items: transformedItems,
                  currentRefinement: currentRefinement,
                  canRefine: transformedItems.length > 0 && transformedItems.some(function (item) {
                    return item.noRefinement === false;
                  })
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                return _refine$5(props, searchState, nextRefinement, this.context);
              },
              cleanUp: function cleanUp(props, searchState) {
                return _cleanUp$3(props, searchState, this.context);
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                var attribute = props.attribute;

                var _parseItem = parseItem(getCurrentRefinement$6(props, searchState, this.context)),
                    start = _parseItem.start,
                    end = _parseItem.end;

                searchParameters = searchParameters.addDisjunctiveFacet(attribute);

                if (start) {
                  searchParameters = searchParameters.addNumericRefinement(attribute, '>=', start);
                }
                if (end) {
                  searchParameters = searchParameters.addNumericRefinement(attribute, '<=', end);
                }
                return searchParameters;
              },
              getMetadata: function getMetadata(props, searchState) {
                var _this = this;

                var id = getId$7(props);
                var value = getCurrentRefinement$6(props, searchState, this.context);
                var items = [];
                var index = getIndex(this.context);
                if (value !== '') {
                  var _find2 = find_1(props.items, function (item) {
                    return stringifyItem(item) === value;
                  }),
                      label = _find2.label;

                  items.push({
                    label: props.attribute + ': ' + label,
                    attribute: props.attribute,
                    currentRefinement: label,
                    value: function value(nextState) {
                      return _refine$5(props, nextState, '', _this.context);
                    }
                  });
                }
                return { id: id, index: index, items: items };
              }
            });

            function _defineProperty$c(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function getId$8() {
              return 'page';
            }

            function getCurrentRefinement$7(props, searchState, context) {
              var id = getId$8();
              var page = 1;
              return getCurrentRefinementValue(props, searchState, context, id, page, function (currentRefinement) {
                if (typeof currentRefinement === 'string') {
                  return parseInt(currentRefinement, 10);
                }
                return currentRefinement;
              });
            }

            function _refine$6(props, searchState, nextPage, context) {
              var id = getId$8();
              var nextValue = _defineProperty$c({}, id, nextPage);
              var resetPage = false;
              return refineValue(searchState, nextValue, context, resetPage);
            }

            /**
             * connectPagination connector provides the logic to build a widget that will
             * let the user displays hits corresponding to a certain page.
             * @name connectPagination
             * @kind connector
             * @propType {boolean} [showFirst=true] - Display the first page link.
             * @propType {boolean} [showLast=false] - Display the last page link.
             * @propType {boolean} [showPrevious=true] - Display the previous page link.
             * @propType {boolean} [showNext=true] - Display the next page link.
             * @propType {number} [padding=3] - How many page links to display around the current page.
             * @propType {number} [totalPages=Infinity] - Maximum number of pages to display.
             * @providedPropType {function} refine - a function to remove a single filter
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {number} nbPages - the total of existing pages
             * @providedPropType {number} currentRefinement - the page refinement currently applied
             */
            var connectPagination = createConnector({
              displayName: 'AlgoliaPagination',

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var results = getResults(searchResults, this.context);

                if (!results) {
                  return null;
                }

                var nbPages = results.nbPages;
                return {
                  nbPages: nbPages,
                  currentRefinement: getCurrentRefinement$7(props, searchState, this.context),
                  canRefine: nbPages > 1
                };
              },
              refine: function refine(props, searchState, nextPage) {
                return _refine$6(props, searchState, nextPage, this.context);
              },
              cleanUp: function cleanUp(props, searchState) {
                return cleanUpValue(searchState, this.context, getId$8());
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                return searchParameters.setPage(getCurrentRefinement$7(props, searchState, this.context) - 1);
              },
              getMetadata: function getMetadata() {
                return { id: getId$8() };
              }
            });

            /**
             * connectPoweredBy connector provides the logic to build a widget that
             * will display a link to algolia.
             * @name connectPoweredBy
             * @kind connector
             * @providedPropType {string} url - the url to redirect to algolia
             */
            var connectPoweredBy = createConnector({
              displayName: 'AlgoliaPoweredBy',

              propTypes: {},

              getProvidedProps: function getProvidedProps(props) {
                var url = 'https://www.algolia.com/?' + 'utm_source=react-instantsearch&' + 'utm_medium=website&' + ('utm_content=' + (props.canRender ? location.hostname : '') + '&') + 'utm_campaign=poweredby';
                return { url: url };
              }
            });

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeIsFinite = _root.isFinite;

            /**
             * Checks if `value` is a finite primitive number.
             *
             * **Note:** This method is based on
             * [`Number.isFinite`](https://mdn.io/Number/isFinite).
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
             * @example
             *
             * _.isFinite(3);
             * // => true
             *
             * _.isFinite(Number.MIN_VALUE);
             * // => true
             *
             * _.isFinite(Infinity);
             * // => false
             *
             * _.isFinite('3');
             * // => false
             */
            function isFinite(value) {
              return typeof value == 'number' && nativeIsFinite(value);
            }

            var _isFinite = isFinite;

            function _defineProperty$d(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            /**
             * connectRange connector provides the logic to create connected
             * components that will give the ability for a user to refine results using
             * a numeric range.
             * @name connectRange
             * @kind connector
             * @requirements The attribute passed to the `attribute` prop must be present in “attributes for faceting”
             * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
             * The values inside the attribute must be JavaScript numbers (not strings).
             * @propType {string} attribute - Name of the attribute for faceting
             * @propType {{min?: number, max?: number}} [defaultRefinement] - Default searchState of the widget containing the start and the end of the range.
             * @propType {number} [min] - Minimum value. When this isn't set, the minimum value will be automatically computed by Algolia using the data in the index.
             * @propType {number} [max] - Maximum value. When this isn't set, the maximum value will be automatically computed by Algolia using the data in the index.
             * @propType {number} [precision=0] - Number of digits after decimal point to use.
             * @providedPropType {function} refine - a function to select a range.
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {string} currentRefinement - the refinement currently applied
             * @providedPropType {number} min - the minimum value available.
             * @providedPropType {number} max - the maximum value available.
             * @providedPropType {number} precision - Number of digits after decimal point to use.
             */

            function getId$9(props) {
              return props.attribute;
            }

            var namespace$4 = 'range';

            function getCurrentRange(boundaries, stats, precision) {
              var pow = Math.pow(10, precision);

              var min = void 0;
              if (_isFinite(boundaries.min)) {
                min = boundaries.min;
              } else if (_isFinite(stats.min)) {
                min = stats.min;
              } else {
                min = undefined;
              }

              var max = void 0;
              if (_isFinite(boundaries.max)) {
                max = boundaries.max;
              } else if (_isFinite(stats.max)) {
                max = stats.max;
              } else {
                max = undefined;
              }

              return {
                min: min !== undefined ? Math.floor(min * pow) / pow : min,
                max: max !== undefined ? Math.ceil(max * pow) / pow : max
              };
            }

            function getCurrentRefinement$8(props, searchState, currentRange, context) {
              var refinement = getCurrentRefinementValue(props, searchState, context, namespace$4 + '.' + getId$9(props), {}, function (currentRefinement) {
                var min = currentRefinement.min,
                    max = currentRefinement.max;

                var isFloatPrecision = Boolean(props.precision);

                var nextMin = min;
                if (typeof nextMin === 'string') {
                  nextMin = isFloatPrecision ? parseFloat(nextMin) : parseInt(nextMin, 10);
                }

                var nextMax = max;
                if (typeof nextMax === 'string') {
                  nextMax = isFloatPrecision ? parseFloat(nextMax) : parseInt(nextMax, 10);
                }

                return {
                  min: nextMin,
                  max: nextMax
                };
              });

              var hasMinBound = props.min !== undefined;
              var hasMaxBound = props.max !== undefined;

              var hasMinRefinment = refinement.min !== undefined;
              var hasMaxRefinment = refinement.max !== undefined;

              if (hasMinBound && hasMinRefinment && refinement.min < currentRange.min) {
                throw Error("You can't provide min value lower than range.");
              }

              if (hasMaxBound && hasMaxRefinment && refinement.max > currentRange.max) {
                throw Error("You can't provide max value greater than range.");
              }

              if (hasMinBound && !hasMinRefinment) {
                refinement.min = currentRange.min;
              }

              if (hasMaxBound && !hasMaxRefinment) {
                refinement.max = currentRange.max;
              }

              return refinement;
            }

            function getCurrentRefinementWithRange(refinement, range) {
              return {
                min: refinement.min !== undefined ? refinement.min : range.min,
                max: refinement.max !== undefined ? refinement.max : range.max
              };
            }

            function nextValueForRefinement(hasBound, isReset, range, value) {
              var next = void 0;
              if (!hasBound && range === value) {
                next = undefined;
              } else if (hasBound && isReset) {
                next = range;
              } else {
                next = value;
              }

              return next;
            }

            function _refine$7(props, searchState, nextRefinement, currentRange, context) {
              var nextMin = nextRefinement.min,
                  nextMax = nextRefinement.max;
              var currentMinRange = currentRange.min,
                  currentMaxRange = currentRange.max;

              var isMinReset = nextMin === undefined || nextMin === '';
              var isMaxReset = nextMax === undefined || nextMax === '';

              var nextMinAsNumber = !isMinReset ? parseFloat(nextMin) : undefined;
              var nextMaxAsNumber = !isMaxReset ? parseFloat(nextMax) : undefined;

              var isNextMinValid = isMinReset || _isFinite(nextMinAsNumber);
              var isNextMaxValid = isMaxReset || _isFinite(nextMaxAsNumber);

              if (!isNextMinValid || !isNextMaxValid) {
                throw Error("You can't provide non finite values to the range connector.");
              }

              if (nextMinAsNumber < currentMinRange) {
                throw Error("You can't provide min value lower than range.");
              }

              if (nextMaxAsNumber > currentMaxRange) {
                throw Error("You can't provide max value greater than range.");
              }

              var id = getId$9(props);
              var resetPage = true;
              var nextValue = _defineProperty$d({}, id, {
                min: nextValueForRefinement(props.min !== undefined, isMinReset, currentMinRange, nextMinAsNumber),
                max: nextValueForRefinement(props.max !== undefined, isMaxReset, currentMaxRange, nextMaxAsNumber)
              });

              return refineValue(searchState, nextValue, context, resetPage, namespace$4);
            }

            function _cleanUp$4(props, searchState, context) {
              return cleanUpValue(searchState, context, namespace$4 + '.' + getId$9(props));
            }

            var connectRange = createConnector({
              displayName: 'AlgoliaRange',

              propTypes: {
                id: propTypes.string,
                attribute: propTypes.string.isRequired,
                defaultRefinement: propTypes.shape({
                  min: propTypes.number,
                  max: propTypes.number
                }),
                min: propTypes.number,
                max: propTypes.number,
                precision: propTypes.number,
                header: propTypes.node,
                footer: propTypes.node
              },

              defaultProps: {
                precision: 0
              },

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var attribute = props.attribute,
                    precision = props.precision,
                    minBound = props.min,
                    maxBound = props.max;

                var results = getResults(searchResults, this.context);
                var hasFacet = results && results.getFacetByName(attribute);
                var stats = hasFacet ? results.getFacetStats(attribute) || {} : {};
                var facetValues = hasFacet ? results.getFacetValues(attribute) : [];

                var count = facetValues.map(function (v) {
                  return {
                    value: v.name,
                    count: v.count
                  };
                });

                var _getCurrentRange = getCurrentRange({ min: minBound, max: maxBound }, stats, precision),
                    rangeMin = _getCurrentRange.min,
                    rangeMax = _getCurrentRange.max;

                // The searchState is not always in sync with the helper state. For example
                // when we set boundaries on the first render the searchState don't have
                // the correct refinement. If this behaviour change in the upcoming version
                // we could store the range inside the searchState instead of rely on `this`.


                this._currentRange = {
                  min: rangeMin,
                  max: rangeMax
                };

                var currentRefinement = getCurrentRefinement$8(props, searchState, this._currentRange, this.context);

                return {
                  min: rangeMin,
                  max: rangeMax,
                  canRefine: count.length > 0,
                  currentRefinement: getCurrentRefinementWithRange(currentRefinement, this._currentRange),
                  count: count,
                  precision: precision
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                return _refine$7(props, searchState, nextRefinement, this._currentRange, this.context);
              },
              cleanUp: function cleanUp(props, searchState) {
                return _cleanUp$4(props, searchState, this.context);
              },
              getSearchParameters: function getSearchParameters(params, props, searchState) {
                var attribute = props.attribute;

                var _getCurrentRefinement = getCurrentRefinement$8(props, searchState, this._currentRange, this.context),
                    min = _getCurrentRefinement.min,
                    max = _getCurrentRefinement.max;

                params = params.addDisjunctiveFacet(attribute);

                if (min !== undefined) {
                  params = params.addNumericRefinement(attribute, '>=', min);
                }

                if (max !== undefined) {
                  params = params.addNumericRefinement(attribute, '<=', max);
                }

                return params;
              },
              getMetadata: function getMetadata(props, searchState) {
                var _this = this;

                var _currentRange = this._currentRange,
                    minRange = _currentRange.min,
                    maxRange = _currentRange.max;

                var _getCurrentRefinement2 = getCurrentRefinement$8(props, searchState, this._currentRange, this.context),
                    minValue = _getCurrentRefinement2.min,
                    maxValue = _getCurrentRefinement2.max;

                var items = [];
                var hasMin = minValue !== undefined;
                var hasMax = maxValue !== undefined;
                var shouldDisplayMinLabel = hasMin && minValue !== minRange;
                var shouldDisplayMaxLabel = hasMax && maxValue !== maxRange;

                if (shouldDisplayMinLabel || shouldDisplayMaxLabel) {
                  var fragments = [hasMin ? minValue + ' <= ' : '', props.attribute, hasMax ? ' <= ' + maxValue : ''];

                  items.push({
                    label: fragments.join(''),
                    attribute: props.attribute,
                    value: function value(nextState) {
                      return _refine$7(props, nextState, {}, _this._currentRange, _this.context);
                    },
                    currentRefinement: getCurrentRefinementWithRange({ min: minValue, max: maxValue }, { min: minRange, max: maxRange })
                  });
                }

                return {
                  id: getId$9(props),
                  index: getIndex(this.context),
                  items: items
                };
              }
            });

            function _defineProperty$e(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            var namespace$5 = 'refinementList';

            function getId$a(props) {
              return props.attribute;
            }

            function getCurrentRefinement$9(props, searchState, context) {
              return getCurrentRefinementValue(props, searchState, context, namespace$5 + '.' + getId$a(props), [], function (currentRefinement) {
                if (typeof currentRefinement === 'string') {
                  // All items were unselected
                  if (currentRefinement === '') {
                    return [];
                  }

                  // Only one item was in the searchState but we know it should be an array
                  return [currentRefinement];
                }
                return currentRefinement;
              });
            }

            function getValue$3(name, props, searchState, context) {
              var currentRefinement = getCurrentRefinement$9(props, searchState, context);
              var isAnewValue = currentRefinement.indexOf(name) === -1;
              var nextRefinement = isAnewValue ? currentRefinement.concat([name]) // cannot use .push(), it mutates
              : currentRefinement.filter(function (selectedValue) {
                return selectedValue !== name;
              }); // cannot use .splice(), it mutates
              return nextRefinement;
            }

            function getLimit$1(_ref) {
              var showMore = _ref.showMore,
                  limit = _ref.limit,
                  showMoreLimit = _ref.showMoreLimit;

              return showMore ? showMoreLimit : limit;
            }

            function _refine$8(props, searchState, nextRefinement, context) {
              var id = getId$a(props);
              // Setting the value to an empty string ensures that it is persisted in
              // the URL as an empty value.
              // This is necessary in the case where `defaultRefinement` contains one
              // item and we try to deselect it. `nextSelected` would be an empty array,
              // which would not be persisted to the URL.
              // {foo: ['bar']} => "foo[0]=bar"
              // {foo: []} => ""
              var nextValue = _defineProperty$e({}, id, nextRefinement.length > 0 ? nextRefinement : '');
              var resetPage = true;
              return refineValue(searchState, nextValue, context, resetPage, namespace$5);
            }

            function _cleanUp$5(props, searchState, context) {
              return cleanUpValue(searchState, context, namespace$5 + '.' + getId$a(props));
            }
            /**
             * connectRefinementList connector provides the logic to build a widget that will
             * give the user the ability to choose multiple values for a specific facet.
             * @name connectRefinementList
             * @kind connector
             * @requirements The attribute passed to the `attribute` prop must be present in "attributes for faceting"
             * on the Algolia dashboard or configured as `attributesForFaceting` via a set settings call to the Algolia API.
             * @propType {string} attribute - the name of the attribute in the record
             * @propType {boolean} [searchable=false] - allow search inside values
             * @propType {string} [operator=or] - How to apply the refinements. Possible values: 'or' or 'and'.
             * @propType {boolean} [showMore=false] - true if the component should display a button that will expand the number of items
             * @propType {number} [limit=10] - the minimum number of displayed items
             * @propType {number} [showMoreLimit=20] - the maximun number of displayed items. Only used when showMore is set to `true`
             * @propType {string[]} defaultRefinement - the values of the items selected by default. The searchState of this widget takes the form of a list of `string`s, which correspond to the values of all selected refinements. However, when there are no refinements selected, the value of the searchState is an empty string.
             * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
             * @providedPropType {function} refine - a function to toggle a refinement
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {string[]} currentRefinement - the refinement currently applied
             * @providedPropType {array.<{count: number, isRefined: boolean, label: string, value: string}>} items - the list of items the RefinementList can display.
             * @providedPropType {function} searchForItems - a function to toggle a search inside items values
             * @providedPropType {boolean} isFromSearch - a boolean that says if the `items` props contains facet values from the global search or from the search inside items.
             */

            var sortBy$2 = ['isRefined', 'count:desc', 'name:asc'];
            var connectRefinementList = createConnector({
              displayName: 'AlgoliaRefinementList',

              propTypes: {
                id: propTypes.string,
                attribute: propTypes.string.isRequired,
                operator: propTypes.oneOf(['and', 'or']),
                showMore: propTypes.bool,
                limit: propTypes.number,
                showMoreLimit: propTypes.number,
                defaultRefinement: propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.number])),
                searchable: propTypes.bool,
                transformItems: propTypes.func
              },

              defaultProps: {
                operator: 'or',
                showMore: false,
                limit: 10,
                showMoreLimit: 20
              },

              getProvidedProps: function getProvidedProps(props, searchState, searchResults, metadata, searchForFacetValuesResults) {
                var _this = this;

                var attribute = props.attribute,
                    searchable = props.searchable;

                var results = getResults(searchResults, this.context);

                var canRefine = Boolean(results) && Boolean(results.getFacetByName(attribute));

                var isFromSearch = Boolean(searchForFacetValuesResults && searchForFacetValuesResults[attribute] && searchForFacetValuesResults.query !== '');

                // Search For Facet Values is not available with derived helper (used for multi index search)
                if (searchable && this.context.multiIndexContext) {
                  throw new Error('react-instantsearch: searching in *List is not available when used inside a' + ' multi index context');
                }

                if (!canRefine) {
                  return {
                    items: [],
                    currentRefinement: getCurrentRefinement$9(props, searchState, this.context),
                    canRefine: canRefine,
                    isFromSearch: isFromSearch,
                    searchable: searchable
                  };
                }

                var items = isFromSearch ? searchForFacetValuesResults[attribute].map(function (v) {
                  return {
                    label: v.value,
                    value: getValue$3(v.value, props, searchState, _this.context),
                    _highlightResult: { label: { value: v.highlighted } },
                    count: v.count,
                    isRefined: v.isRefined
                  };
                }) : results.getFacetValues(attribute, { sortBy: sortBy$2 }).map(function (v) {
                  return {
                    label: v.name,
                    value: getValue$3(v.name, props, searchState, _this.context),
                    count: v.count,
                    isRefined: v.isRefined
                  };
                });

                var transformedItems = props.transformItems ? props.transformItems(items) : items;

                return {
                  items: transformedItems.slice(0, getLimit$1(props)),
                  currentRefinement: getCurrentRefinement$9(props, searchState, this.context),
                  isFromSearch: isFromSearch,
                  searchable: searchable,
                  canRefine: transformedItems.length > 0
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                return _refine$8(props, searchState, nextRefinement, this.context);
              },
              searchForFacetValues: function searchForFacetValues(props, searchState, nextRefinement) {
                return {
                  facetName: props.attribute,
                  query: nextRefinement,
                  maxFacetHits: getLimit$1(props)
                };
              },
              cleanUp: function cleanUp(props, searchState) {
                return _cleanUp$5(props, searchState, this.context);
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                var attribute = props.attribute,
                    operator = props.operator;

                var addKey = operator === 'and' ? 'addFacet' : 'addDisjunctiveFacet';
                var addRefinementKey = addKey + 'Refinement';

                searchParameters = searchParameters.setQueryParameters({
                  maxValuesPerFacet: Math.max(searchParameters.maxValuesPerFacet || 0, getLimit$1(props))
                });

                searchParameters = searchParameters[addKey](attribute);

                return getCurrentRefinement$9(props, searchState, this.context).reduce(function (res, val) {
                  return res[addRefinementKey](attribute, val);
                }, searchParameters);
              },
              getMetadata: function getMetadata(props, searchState) {
                var id = getId$a(props);
                var context = this.context;
                return {
                  id: id,
                  index: getIndex(this.context),
                  items: getCurrentRefinement$9(props, searchState, context).length > 0 ? [{
                    attribute: props.attribute,
                    label: props.attribute + ': ',
                    currentRefinement: getCurrentRefinement$9(props, searchState, context),
                    value: function value(nextState) {
                      return _refine$8(props, nextState, [], context);
                    },
                    items: getCurrentRefinement$9(props, searchState, context).map(function (item) {
                      return {
                        label: '' + item,
                        value: function value(nextState) {
                          var nextSelectedItems = getCurrentRefinement$9(props, nextState, context).filter(function (other) {
                            return other !== item;
                          });
                          return _refine$8(props, searchState, nextSelectedItems, context);
                        }
                      };
                    })
                  }] : []
                };
              }
            });

            /**
             * connectScrollTo connector provides the logic to build a widget that will
             * let the page scroll to a certain point.
             * @name connectScrollTo
             * @kind connector
             * @propType {string} [scrollOn="page"] - Widget searchState key on which to listen for changes, default to the pagination widget.
             * @providedPropType {any} value - the current refinement applied to the widget listened by scrollTo
             * @providedPropType {boolean} hasNotChanged - indicates whether the refinement came from the scrollOn argument (for instance page by default)
             */
            var connectScrollTo = createConnector({
              displayName: 'AlgoliaScrollTo',

              propTypes: {
                scrollOn: propTypes.string
              },

              defaultProps: {
                scrollOn: 'page'
              },

              getProvidedProps: function getProvidedProps(props, searchState) {
                var id = props.scrollOn;
                var value = getCurrentRefinementValue(props, searchState, this.context, id, null, function (currentRefinement) {
                  return currentRefinement;
                });

                if (!this._prevSearchState) {
                  this._prevSearchState = {};
                }

                /* Get the subpart of the state that interest us*/
                if (hasMultipleIndex(this.context)) {
                  var index = getIndex(this.context);
                  searchState = searchState.indices ? searchState.indices[index] : {};
                }

                /*
                  if there is a change in the app that has been triggered by another element than
                  "props.scrollOn (id) or the Configure widget, we need to keep track of the search state to
                  know if there's a change in the app that was not triggered by the props.scrollOn (id)
                  or the Configure widget. This is useful when using ScrollTo in combination of Pagination.
                  As pagination can be change by every widget, we want to scroll only if it cames from the pagination
                  widget itself. We also remove the configure key from the search state to do this comparaison because for
                  now configure values are not present in the search state before a first refinement has been made
                  and will false the results.
                  See: https://github.com/algolia/react-instantsearch/issues/164
                */
                var cleanedSearchState = omit_1(omit_1(searchState, 'configure'), id);

                var hasNotChanged = shallowEqual(this._prevSearchState, cleanedSearchState);

                this._prevSearchState = cleanedSearchState;

                return { value: value, hasNotChanged: hasNotChanged };
              }
            });

            function _defineProperty$f(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function getId$b() {
              return 'query';
            }

            function getCurrentRefinement$a(props, searchState, context) {
              var id = getId$b(props);
              return getCurrentRefinementValue(props, searchState, context, id, '', function (currentRefinement) {
                if (currentRefinement) {
                  return currentRefinement;
                }
                return '';
              });
            }

            function _refine$9(props, searchState, nextRefinement, context) {
              var id = getId$b();
              var nextValue = _defineProperty$f({}, id, nextRefinement);
              var resetPage = true;
              return refineValue(searchState, nextValue, context, resetPage);
            }

            function _cleanUp$6(props, searchState, context) {
              return cleanUpValue(searchState, context, getId$b());
            }

            /**
             * connectSearchBox connector provides the logic to build a widget that will
             * let the user search for a query
             * @name connectSearchBox
             * @kind connector
             * @propType {string} [defaultRefinement] - Provide a default value for the query
             * @providedPropType {function} refine - a function to change the current query
             * @providedPropType {string} currentRefinement - the current query used
             * @providedPropType {boolean} isSearchStalled - a flag that indicates if InstantSearch has detected that searches are stalled
             */
            var connectSearchBox = createConnector({
              displayName: 'AlgoliaSearchBox',

              propTypes: {
                defaultRefinement: propTypes.string
              },

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                return {
                  currentRefinement: getCurrentRefinement$a(props, searchState, this.context),
                  isSearchStalled: searchResults.isSearchStalled
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                return _refine$9(props, searchState, nextRefinement, this.context);
              },
              cleanUp: function cleanUp(props, searchState) {
                return _cleanUp$6(props, searchState, this.context);
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                return searchParameters.setQuery(getCurrentRefinement$a(props, searchState, this.context));
              },
              getMetadata: function getMetadata(props, searchState) {
                var _this = this;

                var id = getId$b(props);
                var currentRefinement = getCurrentRefinement$a(props, searchState, this.context);
                return {
                  id: id,
                  index: getIndex(this.context),
                  items: currentRefinement === null ? [] : [{
                    label: id + ': ' + currentRefinement,
                    value: function value(nextState) {
                      return _refine$9(props, nextState, '', _this.context);
                    },
                    currentRefinement: currentRefinement
                  }]
                };
              }
            });

            var _extends$a = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            function _defineProperty$g(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function getId$c() {
              return 'sortBy';
            }

            function getCurrentRefinement$b(props, searchState, context) {
              var id = getId$c(props);
              return getCurrentRefinementValue(props, searchState, context, id, null, function (currentRefinement) {
                if (currentRefinement) {
                  return currentRefinement;
                }
                return null;
              });
            }

            /**
             * The connectSortBy connector provides the logic to build a widget that will
             *  display a list of indices. This allows a user to change how the hits are being sorted.
             * @name connectSortBy
             * @requirements Algolia handles sorting by creating replica indices. [Read more about sorting](https://www.algolia.com/doc/guides/relevance/sorting/) on
             * the Algolia website.
             * @kind connector
             * @propType {string} defaultRefinement - The default selected index.
             * @propType {{value: string, label: string}[]} items - The list of indexes to search in.
             * @propType {function} [transformItems] - Function to modify the items being displayed, e.g. for filtering or sorting them. Takes an items as parameter and expects it back in return.
             * @providedPropType {function} refine - a function to remove a single filter
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             * @providedPropType {string[]} currentRefinement - the refinement currently applied
             * @providedPropType {array.<{isRefined: boolean, label?: string, value: string}>} items - the list of items the HitsPerPage can display.  If no label provided, the value will be displayed.
             */
            var connectSortBy = createConnector({
              displayName: 'AlgoliaSortBy',

              propTypes: {
                defaultRefinement: propTypes.string,
                items: propTypes.arrayOf(propTypes.shape({
                  label: propTypes.string,
                  value: propTypes.string.isRequired
                })).isRequired,
                transformItems: propTypes.func
              },

              getProvidedProps: function getProvidedProps(props, searchState) {
                var currentRefinement = getCurrentRefinement$b(props, searchState, this.context);
                var items = props.items.map(function (item) {
                  return item.value === currentRefinement ? _extends$a({}, item, { isRefined: true }) : _extends$a({}, item, { isRefined: false });
                });
                return {
                  items: props.transformItems ? props.transformItems(items) : items,
                  currentRefinement: currentRefinement
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                var id = getId$c();
                var nextValue = _defineProperty$g({}, id, nextRefinement);
                var resetPage = true;
                return refineValue(searchState, nextValue, this.context, resetPage);
              },
              cleanUp: function cleanUp(props, searchState) {
                return cleanUpValue(searchState, this.context, getId$c());
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                var selectedIndex = getCurrentRefinement$b(props, searchState, this.context);
                return searchParameters.setIndex(selectedIndex);
              },
              getMetadata: function getMetadata() {
                return { id: getId$c() };
              }
            });

            /**
             * The `connectStateResults` connector provides a way to access the `searchState` and the `searchResults`
             * of InstantSearch.
             * For instance this connector allows you to create results/noResults or query/noQuery pages.
             * @name connectStateResults
             * @kind connector
             * @providedPropType {object} searchState - The search state of the instant search component. <br/><br/> See: [Search state structure](https://community.algolia.com/react-instantsearch/guide/Search_state.html)
             * @providedPropType {object} searchResults - The search results. <br/><br/> In case of multiple indices: if used under `<Index>`, results will be those of the corresponding index otherwise it'll be those of the root index  See: [Search results structure](https://community.algolia.com/algoliasearch-helper-js/reference.html#searchresults)
             * @providedPropType {object} allSearchResults - In case of multiple indices you can retrieve all the results
             * @providedPropType {string} error - If the search failed, the error will be logged here.
             * @providedPropType {boolean} searching - If there is a search in progress.
             * @providedPropType {boolean} isSearchStalled - Flag that indicates if React InstantSearch has detected that searches are stalled.
             * @providedPropType {boolean} searchingForFacetValues - If there is a search in a list in progress.
             * @providedPropType {object} props - component props.
             * @example
             * import React from 'react';
             * import { InstantSearch, SearchBox, Hits, connectStateResults } from 'react-instantsearch-dom';
             *
             * const Content = connectStateResults(({ searchState, searchResults }) => {
             *   const hasResults = searchResults && searchResults.nbHits !== 0;
             *
             *    return (
             *      <div>
             *        <div hidden={!hasResults}>
             *          <Hits />
             *        </div>
             *        <div hidden={hasResults}>
             *          <div>No results has been found for {searchState.query}</div>
             *        </div>
             *      </div>
             *    );
             * });
             *
             * const App = () => (
             *   <InstantSearch
             *      appId="latency"
             *      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
             *      indexName="instant_search"
             *    >
             *      <SearchBox />
             *      <Content />
             *    </InstantSearch>
             * );
             */
            var connectStateResults = createConnector({
              displayName: 'AlgoliaStateResults',

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var results = getResults(searchResults, this.context);

                return {
                  searchState: searchState,
                  searchResults: results,
                  allSearchResults: searchResults.results,
                  searching: searchResults.searching,
                  isSearchStalled: searchResults.isSearchStalled,
                  error: searchResults.error,
                  searchingForFacetValues: searchResults.searchingForFacetValues,
                  props: props
                };
              }
            });

            /**
             * connectStats connector provides the logic to build a widget that will
             *  displays algolia search statistics (hits number and processing time).
             * @name connectStats
             * @kind connector
             * @providedPropType {number} nbHits - number of hits returned by Algolia.
             * @providedPropType {number} processingTimeMS - the time in ms took by Algolia to search for results.
             */
            var connectStats = createConnector({
              displayName: 'AlgoliaStats',

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var results = getResults(searchResults, this.context);

                if (!results) {
                  return null;
                }
                return {
                  nbHits: results.nbHits,
                  processingTimeMS: results.processingTimeMS
                };
              }
            });

            function _defineProperty$h(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
              } else {
                obj[key] = value;
              }return obj;
            }

            function getId$d(props) {
              return props.attribute;
            }

            var namespace$6 = 'toggle';

            function getCurrentRefinement$c(props, searchState, context) {
              return getCurrentRefinementValue(props, searchState, context, namespace$6 + '.' + getId$d(props), false, function (currentRefinement) {
                if (currentRefinement) {
                  return currentRefinement;
                }
                return false;
              });
            }

            function _refine$a(props, searchState, nextRefinement, context) {
              var id = getId$d(props);
              var nextValue = _defineProperty$h({}, id, nextRefinement ? nextRefinement : false);
              var resetPage = true;
              return refineValue(searchState, nextValue, context, resetPage, namespace$6);
            }

            function _cleanUp$7(props, searchState, context) {
              return cleanUpValue(searchState, context, namespace$6 + '.' + getId$d(props));
            }

            /**
             * connectToggleRefinement connector provides the logic to build a widget that will
             * provides an on/off filtering feature based on an attribute value.
             * @name connectToggleRefinement
             * @kind connector
             * @requirements To use this widget, you'll need an attribute to toggle on.
             *
             * You can't toggle on null or not-null values. If you want to address this particular use-case you'll need to compute an
             * extra boolean attribute saying if the value exists or not. See this [thread](https://discourse.algolia.com/t/how-to-create-a-toggle-for-the-absence-of-a-string-attribute/2460) for more details.
             *
             * @propType {string} attribute - Name of the attribute on which to apply the `value` refinement. Required when `value` is present.
             * @propType {string} label - Label for the toggle.
             * @propType {string} value - Value of the refinement to apply on `attribute`.
             * @propType {boolean} [defaultRefinement=false] - Default searchState of the widget. Should the toggle be checked by default?
             * @providedPropType {boolean} currentRefinement - `true` when the refinement is applied, `false` otherwise
             * @providedPropType {object} count - an object that contains the count for `checked` and `unchecked` state
             * @providedPropType {function} refine - a function to toggle a refinement
             * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
             */
            var connectToggleRefinement = createConnector({
              displayName: 'AlgoliaToggle',

              propTypes: {
                label: propTypes.string.isRequired,
                attribute: propTypes.string.isRequired,
                value: propTypes.any.isRequired,
                filter: propTypes.func,
                defaultRefinement: propTypes.bool
              },

              getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
                var attribute = props.attribute,
                    value = props.value;

                var results = getResults(searchResults, this.context);
                var currentRefinement = getCurrentRefinement$c(props, searchState, this.context);

                var allFacetValues = results && results.getFacetByName(attribute) ? results.getFacetValues(attribute) : null;

                var facetValue =
                // Use null to always be consistent with type of the value
                // count: number | null
                allFacetValues && allFacetValues.length ? find_1(allFacetValues, function (item) {
                  return item.name === value.toString();
                }) : null;

                var facetValueCount = facetValue && facetValue.count;
                var allFacetValuesCount =
                // Use null to always be consistent with type of the value
                // count: number | null
                allFacetValues && allFacetValues.length ? allFacetValues.reduce(function (acc, item) {
                  return acc + item.count;
                }, 0) : null;

                var canRefine = currentRefinement ? allFacetValuesCount !== null && allFacetValuesCount > 0 : facetValueCount !== null && facetValueCount > 0;

                var count = {
                  checked: allFacetValuesCount,
                  unchecked: facetValueCount
                };

                return {
                  currentRefinement: currentRefinement,
                  canRefine: canRefine,
                  count: count
                };
              },
              refine: function refine(props, searchState, nextRefinement) {
                return _refine$a(props, searchState, nextRefinement, this.context);
              },
              cleanUp: function cleanUp(props, searchState) {
                return _cleanUp$7(props, searchState, this.context);
              },
              getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
                var attribute = props.attribute,
                    value = props.value,
                    filter = props.filter;

                var checked = getCurrentRefinement$c(props, searchState, this.context);

                var nextSearchParameters = searchParameters.addDisjunctiveFacet(attribute);

                if (checked) {
                  nextSearchParameters = nextSearchParameters.addDisjunctiveFacetRefinement(attribute, value);

                  if (filter) {
                    nextSearchParameters = filter(nextSearchParameters);
                  }
                }

                return nextSearchParameters;
              },
              getMetadata: function getMetadata(props, searchState) {
                var _this = this;

                var id = getId$d(props);
                var checked = getCurrentRefinement$c(props, searchState, this.context);
                var items = [];
                var index = getIndex(this.context);

                if (checked) {
                  items.push({
                    label: props.label,
                    currentRefinement: checked,
                    attribute: props.attribute,
                    value: function value(nextState) {
                      return _refine$a(props, nextState, false, _this.context);
                    }
                  });
                }

                return { id: id, index: index, items: items };
              }
            });

            // Core

            exports.connectAutoComplete = connectAutoComplete;
            exports.connectBreadcrumb = connectBreadcrumb;
            exports.connectConfigure = connectConfigure;
            exports.connectCurrentRefinements = connectCurrentRefinements;
            exports.connectGeoSearch = connectGeoSearch;
            exports.connectHierarchicalMenu = connectHierarchicalMenu;
            exports.connectHighlight = connectHighlight;
            exports.connectHits = connectHits;
            exports.connectHitsPerPage = connectHitsPerPage;
            exports.connectInfiniteHits = connectInfiniteHits;
            exports.connectMenu = connectMenu;
            exports.connectNumericMenu = connectNumericMenu;
            exports.connectPagination = connectPagination;
            exports.connectPoweredBy = connectPoweredBy;
            exports.connectRange = connectRange;
            exports.connectRefinementList = connectRefinementList;
            exports.connectScrollTo = connectScrollTo;
            exports.connectSearchBox = connectSearchBox;
            exports.connectSortBy = connectSortBy;
            exports.connectStateResults = connectStateResults;
            exports.connectStats = connectStats;
            exports.connectToggleRefinement = connectToggleRefinement;

            Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Connectors.js.map
