/*! React InstantSearch 5.3.2 | © Algolia, inc. | https://community.algolia.com/react-instantsearch */
(function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
            typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
            (factory((global.ReactInstantSearch = global.ReactInstantSearch || {}, global.ReactInstantSearch.Core = {}),global.React));
}(this, (function (exports,React) { 'use strict';

            var React__default = 'default' in React ? React['default'] : React;

            var global$1 = (typeof global !== "undefined" ? global :
                        typeof self !== "undefined" ? self :
                        typeof window !== "undefined" ? window : {});

            if (typeof global$1.setTimeout === 'function') ;
            if (typeof global$1.clearTimeout === 'function') ;

            // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
            var performance = global$1.performance || {};
            var performanceNow =
              performance.now        ||
              performance.mozNow     ||
              performance.msNow      ||
              performance.oNow       ||
              performance.webkitNow  ||
              function(){ return (new Date()).getTime() };

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

            var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

            function createCommonjsModule(fn, module) {
            	return module = { exports: {} }, fn(module, module.exports), module.exports;
            }

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
            var hasOwnProperty = objectProto.hasOwnProperty;

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
              var isOwn = hasOwnProperty.call(value, symToStringTag),
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
            var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

            /** Used to detect if a method is native. */
            var reIsNative = RegExp('^' +
              funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
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
            var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

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
              return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
            }

            var _hashGet = hashGet;

            /** Used for built-in method references. */
            var objectProto$4 = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

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
              return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
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
            var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

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
              return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
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
            var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

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
                if ((inherited || hasOwnProperty$5.call(value, key)) &&
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
            var hasOwnProperty$6 = objectProto$9.hasOwnProperty;

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
                if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
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
            var hasOwnProperty$7 = objectProto$a.hasOwnProperty;

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
                if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
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
            var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

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
                var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
                    othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');

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

            /**
             * A specialized version of `matchesProperty` for source values suitable
             * for strict equality comparisons, i.e. `===`.
             *
             * @private
             * @param {string} key The key of the property to get.
             * @param {*} srcValue The value to match.
             * @returns {Function} Returns the new spec function.
             */

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
             * The base implementation of `_.hasIn` without support for deep paths.
             *
             * @private
             * @param {Object} [object] The object to query.
             * @param {Array|string} key The key to check.
             * @returns {boolean} Returns `true` if `key` exists, else `false`.
             */

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

            /**
             * The base implementation of `_.property` without support for deep paths.
             *
             * @private
             * @param {string} key The key of the property to get.
             * @returns {Function} Returns the new accessor function.
             */

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

            /** Used for built-in method references. */
            var objectProto$c = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

            /**
             * The base implementation of `_.has` without support for deep paths.
             *
             * @private
             * @param {Object} [object] The object to query.
             * @param {Array|string} key The key to check.
             * @returns {boolean} Returns `true` if `key` exists, else `false`.
             */
            function baseHas(object, key) {
              return object != null && hasOwnProperty$9.call(object, key);
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
            function has(object, path) {
              return object != null && _hasPath(object, path, _baseHas);
            }

            var has_1 = has;

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
            var hasOwnProperty$a = Object.prototype.hasOwnProperty;
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
            			if (hasOwnProperty$a.call(from, key)) {
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

            /** Built-in value references. */
            var getPrototype = _overArg(Object.getPrototypeOf, Object);

            var _getPrototype = getPrototype;

            /** `Object#toString` result references. */
            var objectTag$3 = '[object Object]';

            /** Used for built-in method references. */
            var funcProto$2 = Function.prototype,
                objectProto$d = Object.prototype;

            /** Used to resolve the decompiled source of functions. */
            var funcToString$2 = funcProto$2.toString;

            /** Used to check objects for own properties. */
            var hasOwnProperty$b = objectProto$d.hasOwnProperty;

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
              if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$3) {
                return false;
              }
              var proto = _getPrototype(value);
              if (proto === null) {
                return true;
              }
              var Ctor = hasOwnProperty$b.call(proto, 'constructor') && proto.constructor;
              return typeof Ctor == 'function' && Ctor instanceof Ctor &&
                funcToString$2.call(Ctor) == objectCtorString;
            }

            var isPlainObject_1 = isPlainObject;

            /** `Object#toString` result references. */
            var mapTag$3 = '[object Map]',
                setTag$3 = '[object Set]';

            /** Used for built-in method references. */
            var objectProto$e = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty$c = objectProto$e.hasOwnProperty;

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
                if (hasOwnProperty$c.call(value, key)) {
                  return false;
                }
              }
              return true;
            }

            var isEmpty_1 = isEmpty;

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

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
              return typeof obj;
            } : function (obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            var _extends$1 = Object.assign || function (target) {
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
              }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
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
                  _inherits(Connector, _Component);

                  function Connector(props, context) {
                    _classCallCheck(this, Connector);

                    var _this = _possibleConstructorReturn(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).call(this, props, context));

                    _initialiseProps.call(_this);

                    var _context$ais = context.ais,
                        store = _context$ais.store,
                        widgetsManager = _context$ais.widgetsManager;

                    var canRender = false;
                    _this.state = {
                      props: _this.getProvidedProps(_extends$1({}, props, { canRender: canRender })),
                      canRender: canRender // use to know if a component is rendered (browser), or not (server).
                    };

                    _this.unsubscribe = store.subscribe(function () {
                      if (_this.state.canRender) {
                        _this.setState({
                          props: _this.getProvidedProps(_extends$1({}, _this.props, {
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

                  _createClass(Connector, [{
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
                          this.context.ais.store.setState(_extends$1({}, this.context.ais.store.getState(), {
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

                      return React__default.createElement(Composed, _extends$1({}, this.props, this.state.props, refineProps, searchForFacetValuesProps));
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

            /* eslint-disable */

            exports.createConnector = createConnector;

            Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Core.js.map
