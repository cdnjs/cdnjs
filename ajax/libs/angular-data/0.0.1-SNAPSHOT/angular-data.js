/**
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @file angular-data.js
 * @version 0.0.1-SNAPSHOT - Homepage <http://jmdobry.github.io/angular-data/>
 * @copyright (c) 2014 Jason Dobry <http://jmdobry.github.io/angular-data>
 * @license MIT <https://github.com/jmdobry/angular-data/blob/master/LICENSE>
 *
 * @overview Data store for Angular.js.
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var indexOf = require('./indexOf');

    /**
     * If array contains values.
     */
    function contains(arr, val) {
        return indexOf(arr, val) !== -1;
    }
    module.exports = contains;


},{"./indexOf":3}],2:[function(require,module,exports){
var makeIterator = require('../function/makeIterator_');

    /**
     * Array filter
     */
    function filter(arr, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        var results = [];
        if (arr == null) {
            return results;
        }

        var i = -1, len = arr.length, value;
        while (++i < len) {
            value = arr[i];
            if (callback(value, i, arr)) {
                results.push(value);
            }
        }

        return results;
    }

    module.exports = filter;



},{"../function/makeIterator_":9}],3:[function(require,module,exports){


    /**
     * Array.indexOf
     */
    function indexOf(arr, item, fromIndex) {
        fromIndex = fromIndex || 0;
        if (arr == null) {
            return -1;
        }

        var len = arr.length,
            i = fromIndex < 0 ? len + fromIndex : fromIndex;
        while (i < len) {
            // we iterate over sparse items since there is no way to make it
            // work properly on IE 7-8. see #64
            if (arr[i] === item) {
                return i;
            }

            i++;
        }

        return -1;
    }

    module.exports = indexOf;


},{}],4:[function(require,module,exports){
var filter = require('./filter');

    function isValidString(val) {
        return (val != null && val !== '');
    }

    /**
     * Joins strings with the specified separator inserted between each value.
     * Null values and empty strings will be excluded.
     */
    function join(items, separator) {
        separator = separator || '';
        return filter(items, isValidString).join(separator);
    }

    module.exports = join;


},{"./filter":2}],5:[function(require,module,exports){


    var arrSlice = Array.prototype.slice;

    /**
     * Create slice of source array or array-like object
     */
    function slice(arr, start, end){
        return arrSlice.call(arr, start, end);
    }

    module.exports = slice;



},{}],6:[function(require,module,exports){


    /**
     * Merge sort (http://en.wikipedia.org/wiki/Merge_sort)
     */
    function mergeSort(arr, compareFn) {
        if (arr == null) {
            return [];
        } else if (arr.length < 2) {
            return arr;
        }

        if (compareFn == null) {
            compareFn = defaultCompare;
        }

        var mid, left, right;

        mid   = ~~(arr.length / 2);
        left  = mergeSort( arr.slice(0, mid), compareFn );
        right = mergeSort( arr.slice(mid, arr.length), compareFn );

        return merge(left, right, compareFn);
    }

    function defaultCompare(a, b) {
        return a < b ? -1 : (a > b? 1 : 0);
    }

    function merge(left, right, compareFn) {
        var result = [];

        while (left.length && right.length) {
            if (compareFn(left[0], right[0]) <= 0) {
                // if 0 it should preserve same order (stable)
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }

        if (left.length) {
            result.push.apply(result, left);
        }

        if (right.length) {
            result.push.apply(result, right);
        }

        return result;
    }

    module.exports = mergeSort;



},{}],7:[function(require,module,exports){
var isFunction = require('../lang/isFunction');

    /**
     * Creates an object that holds a lookup for the objects in the array.
     */
    function toLookup(arr, key) {
        var result = {};
        if (arr == null) {
            return result;
        }

        var i = -1, len = arr.length, value;
        if (isFunction(key)) {
            while (++i < len) {
                value = arr[i];
                result[key(value)] = value;
            }
        } else {
            while (++i < len) {
                value = arr[i];
                result[value[key]] = value;
            }
        }

        return result;
    }
    module.exports = toLookup;


},{"../lang/isFunction":13}],8:[function(require,module,exports){


    /**
     * Returns the first argument provided to it.
     */
    function identity(val){
        return val;
    }

    module.exports = identity;



},{}],9:[function(require,module,exports){
var identity = require('./identity');
var prop = require('./prop');
var deepMatches = require('../object/deepMatches');

    /**
     * Converts argument into a valid iterator.
     * Used internally on most array/object/collection methods that receives a
     * callback/iterator providing a shortcut syntax.
     */
    function makeIterator(src, thisObj){
        if (src == null) {
            return identity;
        }
        switch(typeof src) {
            case 'function':
                // function is the first to improve perf (most common case)
                // also avoid using `Function#call` if not needed, which boosts
                // perf a lot in some cases
                return (typeof thisObj !== 'undefined')? function(val, i, arr){
                    return src.call(thisObj, val, i, arr);
                } : src;
            case 'object':
                return function(val){
                    return deepMatches(val, src);
                };
            case 'string':
            case 'number':
                return prop(src);
        }
    }

    module.exports = makeIterator;



},{"../object/deepMatches":18,"./identity":8,"./prop":10}],10:[function(require,module,exports){


    /**
     * Returns a function that gets a property of the passed object
     */
    function prop(name){
        return function(obj){
            return obj[name];
        };
    }

    module.exports = prop;



},{}],11:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    var isArray = Array.isArray || function (val) {
        return isKind(val, 'Array');
    };
    module.exports = isArray;


},{"./isKind":14}],12:[function(require,module,exports){
var forOwn = require('../object/forOwn');
var isArray = require('./isArray');

    function isEmpty(val){
        if (val == null) {
            // typeof null == 'object' so we check it first
            return false;
        } else if ( typeof val === 'string' || isArray(val) ) {
            return !val.length;
        } else if ( typeof val === 'object' || typeof val === 'function' ) {
            var result = true;
            forOwn(val, function(){
                result = false;
                return false; // break loop
            });
            return result;
        } else {
            return false;
        }
    }

    module.exports = isEmpty;



},{"../object/forOwn":21,"./isArray":11}],13:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isFunction(val) {
        return isKind(val, 'Function');
    }
    module.exports = isFunction;


},{"./isKind":14}],14:[function(require,module,exports){
var kindOf = require('./kindOf');
    /**
     * Check if value is from a specific "kind".
     */
    function isKind(val, kind){
        return kindOf(val) === kind;
    }
    module.exports = isKind;


},{"./kindOf":16}],15:[function(require,module,exports){


    /**
     * Checks if the value is created by the `Object` constructor.
     */
    function isPlainObject(value) {
        return (!!value && typeof value === 'object' &&
            value.constructor === Object);
    }

    module.exports = isPlainObject;



},{}],16:[function(require,module,exports){


    var _rKind = /^\[object (.*)\]$/,
        _toString = Object.prototype.toString,
        UNDEF;

    /**
     * Gets the "kind" of value. (e.g. "String", "Number", etc)
     */
    function kindOf(val) {
        if (val === null) {
            return 'Null';
        } else if (val === UNDEF) {
            return 'Undefined';
        } else {
            return _rKind.exec( _toString.call(val) )[1];
        }
    }
    module.exports = kindOf;


},{}],17:[function(require,module,exports){


    /**
     * Typecast a value to a String, using an empty string value for null or
     * undefined.
     */
    function toString(val){
        return val == null ? '' : val.toString();
    }

    module.exports = toString;



},{}],18:[function(require,module,exports){
var forOwn = require('./forOwn');
var isArray = require('../lang/isArray');

    function containsMatch(array, pattern) {
        var i = -1, length = array.length;
        while (++i < length) {
            if (deepMatches(array[i], pattern)) {
                return true;
            }
        }

        return false;
    }

    function matchArray(target, pattern) {
        var i = -1, patternLength = pattern.length;
        while (++i < patternLength) {
            if (!containsMatch(target, pattern[i])) {
                return false;
            }
        }

        return true;
    }

    function matchObject(target, pattern) {
        var result = true;
        forOwn(pattern, function(val, key) {
            if (!deepMatches(target[key], val)) {
                // Return false to break out of forOwn early
                return (result = false);
            }
        });

        return result;
    }

    /**
     * Recursively check if the objects match.
     */
    function deepMatches(target, pattern){
        if (target && typeof target === 'object') {
            if (isArray(target) && isArray(pattern)) {
                return matchArray(target, pattern);
            } else {
                return matchObject(target, pattern);
            }
        } else {
            return target === pattern;
        }
    }

    module.exports = deepMatches;



},{"../lang/isArray":11,"./forOwn":21}],19:[function(require,module,exports){
var forOwn = require('./forOwn');
var isPlainObject = require('../lang/isPlainObject');

    /**
     * Mixes objects into the target object, recursively mixing existing child
     * objects.
     */
    function deepMixIn(target, objects) {
        var i = 0,
            n = arguments.length,
            obj;

        while(++i < n){
            obj = arguments[i];
            if (obj) {
                forOwn(obj, copyProp, target);
            }
        }

        return target;
    }

    function copyProp(val, key) {
        var existing = this[key];
        if (isPlainObject(val) && isPlainObject(existing)) {
            deepMixIn(existing, val);
        } else {
            this[key] = val;
        }
    }

    module.exports = deepMixIn;



},{"../lang/isPlainObject":15,"./forOwn":21}],20:[function(require,module,exports){


    var _hasDontEnumBug,
        _dontEnums;

    function checkDontEnum(){
        _dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ];

        _hasDontEnumBug = true;

        for (var key in {'toString': null}) {
            _hasDontEnumBug = false;
        }
    }

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forIn(obj, fn, thisObj){
        var key, i = 0;
        // no need to check if argument is a real object that way we can use
        // it for arrays, functions, date, etc.

        //post-pone check till needed
        if (_hasDontEnumBug == null) checkDontEnum();

        for (key in obj) {
            if (exec(fn, obj, key, thisObj) === false) {
                break;
            }
        }

        if (_hasDontEnumBug) {
            while (key = _dontEnums[i++]) {
                // since we aren't using hasOwn check we need to make sure the
                // property was overwritten
                if (obj[key] !== Object.prototype[key]) {
                    if (exec(fn, obj, key, thisObj) === false) {
                        break;
                    }
                }
            }
        }
    }

    function exec(fn, obj, key, thisObj){
        return fn.call(thisObj, obj[key], key, obj);
    }

    module.exports = forIn;



},{}],21:[function(require,module,exports){
var hasOwn = require('./hasOwn');
var forIn = require('./forIn');

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forOwn(obj, fn, thisObj){
        forIn(obj, function(val, key){
            if (hasOwn(obj, key)) {
                return fn.call(thisObj, obj[key], key, obj);
            }
        });
    }

    module.exports = forOwn;



},{"./forIn":20,"./hasOwn":22}],22:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}],23:[function(require,module,exports){
var join = require('../array/join');
var slice = require('../array/slice');

    /**
     * Group arguments as path segments, if any of the args is `null` or an
     * empty string it will be ignored from resulting path.
     */
    function makePath(var_args){
        var result = join(slice(arguments), '/');
        // need to disconsider duplicate '/' after protocol (eg: 'http://')
        return result.replace(/([^:\/]|^)\/{2,}/g, '$1/');
    }

    module.exports = makePath;


},{"../array/join":4,"../array/slice":5}],24:[function(require,module,exports){
var toString = require('../lang/toString');
    /**
     * "Safer" String.toUpperCase()
     */
    function upperCase(str){
        str = toString(str);
        return str.toUpperCase();
    }
    module.exports = upperCase;


},{"../lang/toString":17}],"observejs":[function(require,module,exports){
module.exports=require('q+M0EE');
},{}],"q+M0EE":[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};// Copyright 2012 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function(global) {
  'use strict';

  function detectObjectObserve() {
    if (typeof Object.observe !== 'function' ||
        typeof Array.observe !== 'function') {
      return false;
    }

    var gotSplice = false;
    function callback(records) {
      if (records[0].type === 'splice' && records[1].type === 'splice')
        gotSplice = true;
    }

    var test = [0];
    Array.observe(test, callback);
    test[1] = 1;
    test.length = 0;
    Object.deliverChangeRecords(callback);
    return gotSplice;
  }

  var hasObserve = detectObjectObserve();

  var hasEval = false;
  try {
    var f = new Function('', 'return true;');
    hasEval = f();
  } catch (ex) {
  }

  function isIndex(s) {
    return +s === s >>> 0;
  }

  function toNumber(s) {
    return +s;
  }

  function isObject(obj) {
    return obj === Object(obj);
  }

  var numberIsNaN = global.Number.isNaN || function isNaN(value) {
    return typeof value === 'number' && global.isNaN(value);
  }

  function areSameValue(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    if (numberIsNaN(left) && numberIsNaN(right))
      return true;

    return left !== left && right !== right;
  }

  var createObject = ('__proto__' in {}) ?
    function(obj) { return obj; } :
    function(obj) {
      var proto = obj.__proto__;
      if (!proto)
        return obj;
      var newObject = Object.create(proto);
      Object.getOwnPropertyNames(obj).forEach(function(name) {
        Object.defineProperty(newObject, name,
                             Object.getOwnPropertyDescriptor(obj, name));
      });
      return newObject;
    };

  var identStart = '[\$_a-zA-Z]';
  var identPart = '[\$_a-zA-Z0-9]';
  var ident = identStart + '+' + identPart + '*';
  var elementIndex = '(?:[0-9]|[1-9]+[0-9]+)';
  var identOrElementIndex = '(?:' + ident + '|' + elementIndex + ')';
  var path = '(?:' + identOrElementIndex + ')(?:\\.' + identOrElementIndex + ')*';
  var pathRegExp = new RegExp('^' + path + '$');

  function isPathValid(s) {
    if (typeof s != 'string')
      return false;
    s = s.replace(/\s/g, '');

    if (s == '')
      return true;

    if (s[0] == '.')
      return false;

    return pathRegExp.test(s);
  }

  // TODO(rafaelw): Make simple LRU cache
  var pathCache = {};

  function getPath(str) {
    var path = pathCache[str];
    if (path)
      return path;
    if (!isPathValid(str))
      return;
    var path = new Path(str);
    pathCache[str] = path;
    return path;
  }

  function Path(s) {
    if (s.trim() == '')
      return this;

    if (isIndex(s)) {
      this.push(String(s));
      return this;
    }

    s.split(/\./).filter(function(part) {
      return part;
    }).forEach(function(part) {
      this.push(part);
    }, this);

    if (hasEval && this.length) {
      this.getValueFrom = this.compiledGetValueFromFn();
    }
  }

  Path.prototype = createObject({
    __proto__: [],

    toString: function() {
      return this.join('.');
    },

    getValueFrom: function(obj, allValues) {
      for (var i = 0; i < this.length; i++) {
        if (obj === undefined || obj === null)
          return;
        obj = obj[this[i]];
      }

      return obj;
    },

    getValueFromObserved: function(obj, observedSet) {
      observedSet.reset();
      for (var i = 0; i < this.length; i++) {
        if (obj === undefined || obj === null) {
          observedSet.cleanup();
          return;
        }
        observedSet.observe(obj);
        obj = obj[this[i]];
      }

      return obj;
    },

    compiledGetValueFromFn: function() {
      var accessors = this.map(function(ident) {
        return isIndex(ident) ? '["' + ident + '"]' : '.' + ident;
      });

      var str = '';
      var pathString = 'obj';
      str += 'if (obj !== null && obj !== undefined';
      var i = 0;
      for (; i < (this.length - 1); i++) {
        var ident = this[i];
        pathString += accessors[i];
        str += ' &&\n     ' + pathString + ' !== null && ' +
               pathString + ' !== undefined';
      }
      str += ')\n';

      pathString += accessors[i];

      str += '  return ' + pathString + ';\nelse\n  return undefined;';
      return new Function('obj', str);
    },

    setValueFrom: function(obj, value) {
      if (!this.length)
        return false;

      for (var i = 0; i < this.length - 1; i++) {
        if (obj === undefined || obj === null)
          return false;
        obj = obj[this[i]];
      }

      if (obj === undefined || obj === null)
        return false;

      obj[this[this.length - 1]] = value;
      return true;
    }
  });

  var MAX_DIRTY_CHECK_CYCLES = 1000;

  function dirtyCheck(observer) {
    var cycles = 0;
    while (cycles < MAX_DIRTY_CHECK_CYCLES && observer.check()) {
      observer.report();
      cycles++;
    }
  }

  function objectIsEmpty(object) {
    for (var prop in object)
      return false;
    return true;
  }

  function diffIsEmpty(diff) {
    return objectIsEmpty(diff.added) &&
           objectIsEmpty(diff.removed) &&
           objectIsEmpty(diff.changed);
  }

  function diffObjectFromOldObject(object, oldObject) {
    var added = {};
    var removed = {};
    var changed = {};
    var oldObjectHas = {};

    for (var prop in oldObject) {
      var newValue = object[prop];

      if (newValue !== undefined && newValue === oldObject[prop])
        continue;

      if (!(prop in object)) {
        removed[prop] = undefined;
        continue;
      }

      if (newValue !== oldObject[prop])
        changed[prop] = newValue;
    }

    for (var prop in object) {
      if (prop in oldObject)
        continue;

      added[prop] = object[prop];
    }

    if (Array.isArray(object) && object.length !== oldObject.length)
      changed.length = object.length;

    return {
      added: added,
      removed: removed,
      changed: changed
    };
  }

  function copyObject(object, opt_copy) {
    var copy = opt_copy || (Array.isArray(object) ? [] : {});
    for (var prop in object) {
      copy[prop] = object[prop];
    };
    if (Array.isArray(object))
      copy.length = object.length;
    return copy;
  }

  function Observer(object, callback, target, token) {
    this.closed = false;
    this.object = object;
    this.callback = callback;
    // TODO(rafaelw): Hold this.target weakly when WeakRef is available.
    this.target = target;
    this.token = token;
    this.reporting = true;
    if (hasObserve) {
      var self = this;
      this.boundInternalCallback = function(records) {
        self.internalCallback(records);
      };
    }

    addToAll(this);
    this.connect();
    this.sync(true);
  }

  Observer.prototype = {
    internalCallback: function(records) {
      if (this.closed)
        return;
      if (this.reporting && this.check(records)) {
        this.report();
        if (this.testingResults)
          this.testingResults.anyChanged = true;
      }
    },

    close: function() {
      if (this.closed)
        return;
      if (this.object && typeof this.object.unobserved === 'function')
        this.object.unobserved();

      this.disconnect();
      this.object = undefined;
      this.closed = true;
    },

    deliver: function(testingResults) {
      if (this.closed)
        return;
      if (hasObserve) {
        this.testingResults = testingResults;
        Object.deliverChangeRecords(this.boundInternalCallback);
        this.testingResults = undefined;
      } else {
        dirtyCheck(this);
      }
    },

    report: function() {
      if (!this.reporting)
        return;

      this.sync(false);
      this.reportArgs.push(this.token);
      this.invokeCallback(this.reportArgs);
      this.reportArgs = undefined;
    },

    invokeCallback: function(args) {
      try {
        this.callback.apply(this.target, args);
      } catch (ex) {
        Observer._errorThrownDuringCallback = true;
        console.error('Exception caught during observer callback: ' + ex);
      }
    },

    reset: function() {
      if (this.closed)
        return;

      if (hasObserve) {
        this.reporting = false;
        Object.deliverChangeRecords(this.boundInternalCallback);
        this.reporting = true;
      }

      this.sync(true);
    }
  }

  var collectObservers = !hasObserve || global.forceCollectObservers;
  var allObservers;
  Observer._allObserversCount = 0;

  if (collectObservers) {
    allObservers = [];
  }

  function addToAll(observer) {
    if (!collectObservers)
      return;

    allObservers.push(observer);
    Observer._allObserversCount++;
  }

  var runningMicrotaskCheckpoint = false;

  var hasDebugForceFullDelivery = typeof Object.deliverAllChangeRecords == 'function';

  global.Platform = global.Platform || {};

  global.Platform.performMicrotaskCheckpoint = function() {
    if (runningMicrotaskCheckpoint)
      return;

    if (hasDebugForceFullDelivery) {
      Object.deliverAllChangeRecords();
      return;
    }

    if (!collectObservers)
      return;

    runningMicrotaskCheckpoint = true;

    var cycles = 0;
    var results = {};

    do {
      cycles++;
      var toCheck = allObservers;
      allObservers = [];
      results.anyChanged = false;

      for (var i = 0; i < toCheck.length; i++) {
        var observer = toCheck[i];
        if (observer.closed)
          continue;

        if (hasObserve) {
          observer.deliver(results);
        } else if (observer.check()) {
          results.anyChanged = true;
          observer.report();
        }

        allObservers.push(observer);
      }
    } while (cycles < MAX_DIRTY_CHECK_CYCLES && results.anyChanged);

    Observer._allObserversCount = allObservers.length;
    runningMicrotaskCheckpoint = false;
  };

  if (collectObservers) {
    global.Platform.clearObservers = function() {
      allObservers = [];
    };
  }

  function ObjectObserver(object, callback, target, token) {
    Observer.call(this, object, callback, target, token);
  }

  ObjectObserver.prototype = createObject({
    __proto__: Observer.prototype,

    connect: function() {
      if (hasObserve)
        Object.observe(this.object, this.boundInternalCallback);
    },

    sync: function(hard) {
      if (!hasObserve)
        this.oldObject = copyObject(this.object);
    },

    check: function(changeRecords) {
      var diff;
      var oldValues;
      if (hasObserve) {
        if (!changeRecords)
          return false;

        oldValues = {};
        diff = diffObjectFromChangeRecords(this.object, changeRecords,
                                           oldValues);
      } else {
        oldValues = this.oldObject;
        diff = diffObjectFromOldObject(this.object, this.oldObject);
      }

      if (diffIsEmpty(diff))
        return false;

      this.reportArgs =
          [diff.added || {}, diff.removed || {}, diff.changed || {}];
      this.reportArgs.push(function(property) {
        return oldValues[property];
      });

      return true;
    },

    disconnect: function() {
      if (!hasObserve)
        this.oldObject = undefined;
      else if (this.object)
        Object.unobserve(this.object, this.boundInternalCallback);
    }
  });

  function ArrayObserver(array, callback, target, token) {
    if (!Array.isArray(array))
      throw Error('Provided object is not an Array');
    Observer.call(this, array, callback, target, token);
  }

  ArrayObserver.prototype = createObject({
    __proto__: ObjectObserver.prototype,

    connect: function() {
      if (hasObserve)
        Array.observe(this.object, this.boundInternalCallback);
    },

    sync: function() {
      if (!hasObserve)
        this.oldObject = this.object.slice();
    },

    check: function(changeRecords) {
      var splices;
      if (hasObserve) {
        if (!changeRecords)
          return false;
        splices = projectArraySplices(this.object, changeRecords);
      } else {
        splices = calcSplices(this.object, 0, this.object.length,
                              this.oldObject, 0, this.oldObject.length);
      }

      if (!splices || !splices.length)
        return false;

      this.reportArgs = [splices];
      return true;
    }
  });

  ArrayObserver.applySplices = function(previous, current, splices) {
    splices.forEach(function(splice) {
      var spliceArgs = [splice.index, splice.removed.length];
      var addIndex = splice.index;
      while (addIndex < splice.index + splice.addedCount) {
        spliceArgs.push(current[addIndex]);
        addIndex++;
      }

      Array.prototype.splice.apply(previous, spliceArgs);
    });
  };

  function getPathValue(object, path) {
    return path.getValueFrom(object);
  }

  function ObservedSet(callback) {
    this.arr = [];
    this.callback = callback;
    this.isObserved = true;
  }

  var objProto = Object.getPrototypeOf({});
  var arrayProto = Object.getPrototypeOf([]);
  ObservedSet.prototype = {
    reset: function() {
      this.isObserved = !this.isObserved;
    },

    observe: function(obj) {
      if (!isObject(obj) || obj === objProto || obj === arrayProto)
        return;
      var i = this.arr.indexOf(obj);
      if (i >= 0 && this.arr[i+1] === this.isObserved)
        return;

      if (i < 0) {
        i = this.arr.length;
        this.arr[i] = obj;
        Object.observe(obj, this.callback);
      }

      this.arr[i+1] = this.isObserved;
      this.observe(Object.getPrototypeOf(obj));
    },

    cleanup: function() {
      var i = 0, j = 0;
      var isObserved = this.isObserved;
      while(j < this.arr.length) {
        var obj = this.arr[j];
        if (this.arr[j + 1] == isObserved) {
          if (i < j) {
            this.arr[i] = obj;
            this.arr[i + 1] = isObserved;
          }
          i += 2;
        } else {
          Object.unobserve(obj, this.callback);
        }
        j += 2;
      }

      this.arr.length = i;
    }
  };

  function PathObserver(object, pathString, callback, target, token) {
    this.value = undefined;

    var path = getPath(pathString);
    if (!path) {
      this.closed = true;
      this.value = undefined;
      return;
    }

    if (!path.length) {
      this.closed = true;
      this.value = object;
      return;
    }

    if (!isObject(object)) {
      this.closed = true;
      this.value = undefined;
      return;
    }

    this.path = path;
    Observer.call(this, object, callback, target, token);
  }

  PathObserver.prototype = createObject({
    __proto__: Observer.prototype,

    connect: function() {
      if (hasObserve)
        this.observedSet = new ObservedSet(this.boundInternalCallback);
    },

    disconnect: function() {
      this.value = undefined;
      if (hasObserve) {
        this.observedSet.reset();
        this.observedSet.cleanup();
        this.observedSet = undefined;
      }
    },

    check: function() {
      this.value = !hasObserve ? this.path.getValueFrom(this.object) :
          this.path.getValueFromObserved(this.object, this.observedSet);
      if (areSameValue(this.value, this.oldValue))
        return false;

      this.reportArgs = [this.value, this.oldValue];
      return true;
    },

    sync: function(hard) {
      if (hard) {
        this.value = !hasObserve ? this.path.getValueFrom(this.object) :
            this.path.getValueFromObserved(this.object, this.observedSet);
      }
      this.oldValue = this.value;
    }
  });

  PathObserver.getValueAtPath = function(obj, pathString) {
    var path = getPath(pathString);
    if (!path)
      return;
    return path.getValueFrom(obj);
  }

  PathObserver.setValueAtPath = function(obj, pathString, value) {
    var path = getPath(pathString);
    if (!path)
      return;

    path.setValueFrom(obj, value);
  };

  var knownRecordTypes = {
    'new': true,
    'updated': true,
    'deleted': true
  };

  function notifyFunction(object, name) {
    if (typeof Object.observe !== 'function')
      return;

    var notifier = Object.getNotifier(object);
    return function(type, oldValue) {
      var changeRecord = {
        object: object,
        type: type,
        name: name
      };
      if (arguments.length === 2)
        changeRecord.oldValue = oldValue;
      notifier.notify(changeRecord);
    }
  }

  // TODO(rafaelw): It should be possible for the Object.observe case to have
  // every PathObserver used by defineProperty share a single Object.observe
  // callback, and thus get() can simply call observer.deliver() and any changes
  // to any dependent value will be observed.
  PathObserver.defineProperty = function(object, name, descriptor) {
    // TODO(rafaelw): Validate errors
    var obj = descriptor.object;
    var path = getPath(descriptor.path);
    var notify = notifyFunction(object, name);

    var observer = new PathObserver(obj, descriptor.path,
        function(newValue, oldValue) {
          if (notify)
            notify('updated', oldValue);
        }
    );

    Object.defineProperty(object, name, {
      get: function() {
        return path.getValueFrom(obj);
      },
      set: function(newValue) {
        path.setValueFrom(obj, newValue);
      },
      configurable: true
    });

    return {
      close: function() {
        var oldValue = path.getValueFrom(obj);
        if (notify)
          observer.deliver();
        observer.close();
        Object.defineProperty(object, name, {
          value: oldValue,
          writable: true,
          configurable: true
        });
      }
    };
  }

  function diffObjectFromChangeRecords(object, changeRecords, oldValues) {
    var added = {};
    var removed = {};

    for (var i = 0; i < changeRecords.length; i++) {
      var record = changeRecords[i];
      if (!knownRecordTypes[record.type]) {
        console.error('Unknown changeRecord type: ' + record.type);
        console.error(record);
        continue;
      }

      if (!(record.name in oldValues))
        oldValues[record.name] = record.oldValue;

      if (record.type == 'updated')
        continue;

      if (record.type == 'new') {
        if (record.name in removed)
          delete removed[record.name];
        else
          added[record.name] = true;

        continue;
      }

      // type = 'deleted'
      if (record.name in added) {
        delete added[record.name];
        delete oldValues[record.name];
      } else {
        removed[record.name] = true;
      }
    }

    for (var prop in added)
      added[prop] = object[prop];

    for (var prop in removed)
      removed[prop] = undefined;

    var changed = {};
    for (var prop in oldValues) {
      if (prop in added || prop in removed)
        continue;

      var newValue = object[prop];
      if (oldValues[prop] !== newValue)
        changed[prop] = newValue;
    }

    return {
      added: added,
      removed: removed,
      changed: changed
    };
  }

  // Note: This function is *based* on the computation of the Levenshtein
  // "edit" distance. The one change is that "updates" are treated as two
  // edits - not one. With Array splices, an update is really a delete
  // followed by an add. By retaining this, we optimize for "keeping" the
  // maximum array items in the original array. For example:
  //
  //   'xxxx123' -> '123yyyy'
  //
  // With 1-edit updates, the shortest path would be just to update all seven
  // characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
  // leaves the substring '123' intact.
  function calcEditDistances(current, currentStart, currentEnd,
                             old, oldStart, oldEnd) {
    // "Deletion" columns
    var rowCount = oldEnd - oldStart + 1;
    var columnCount = currentEnd - currentStart + 1;
    var distances = new Array(rowCount);

    // "Addition" rows. Initialize null column.
    for (var i = 0; i < rowCount; i++) {
      distances[i] = new Array(columnCount);
      distances[i][0] = i;
    }

    // Initialize null row
    for (var j = 0; j < columnCount; j++)
      distances[0][j] = j;

    for (var i = 1; i < rowCount; i++) {
      for (var j = 1; j < columnCount; j++) {
        if (old[oldStart + i - 1] === current[currentStart + j - 1])
          distances[i][j] = distances[i - 1][j - 1];
        else {
          var north = distances[i - 1][j] + 1;
          var west = distances[i][j - 1] + 1;
          distances[i][j] = north < west ? north : west;
        }
      }
    }

    return distances;
  }

  var EDIT_LEAVE = 0;
  var EDIT_UPDATE = 1;
  var EDIT_ADD = 2;
  var EDIT_DELETE = 3;

  // This starts at the final weight, and walks "backward" by finding
  // the minimum previous weight recursively until the origin of the weight
  // matrix.
  function spliceOperationsFromEditDistances(distances) {
    var i = distances.length - 1;
    var j = distances[0].length - 1;
    var current = distances[i][j];
    var edits = [];
    while (i > 0 || j > 0) {
      if (i == 0) {
        edits.push(EDIT_ADD);
        j--;
        continue;
      }
      if (j == 0) {
        edits.push(EDIT_DELETE);
        i--;
        continue;
      }
      var northWest = distances[i - 1][j - 1];
      var west = distances[i - 1][j];
      var north = distances[i][j - 1];

      var min;
      if (west < north)
        min = west < northWest ? west : northWest;
      else
        min = north < northWest ? north : northWest;

      if (min == northWest) {
        if (northWest == current) {
          edits.push(EDIT_LEAVE);
        } else {
          edits.push(EDIT_UPDATE);
          current = northWest;
        }
        i--;
        j--;
      } else if (min == west) {
        edits.push(EDIT_DELETE);
        i--;
        current = west;
      } else {
        edits.push(EDIT_ADD);
        j--;
        current = north;
      }
    }

    edits.reverse();
    return edits;
  }

  function sharedPrefix(arr1, arr2, searchLength) {
    for (var i = 0; i < searchLength; i++)
      if (arr1[i] !== arr2[i])
        return i;
    return searchLength;
  }

  function sharedSuffix(arr1, arr2, searchLength) {
    var index1 = arr1.length;
    var index2 = arr2.length;
    var count = 0;
    while (count < searchLength && arr1[--index1] === arr2[--index2])
      count++;

    return count;
  }

  function newSplice(index, removed, addedCount) {
    return {
      index: index,
      removed: removed,
      addedCount: addedCount
    };
  }

  /**
   * Splice Projection functions:
   *
   * A splice map is a representation of how a previous array of items
   * was transformed into a new array of items. Conceptually it is a list of
   * tuples of
   *
   *   <index, removed, addedCount>
   *
   * which are kept in ascending index order of. The tuple represents that at
   * the |index|, |removed| sequence of items were removed, and counting forward
   * from |index|, |addedCount| items were added.
   */

  /**
   * Lacking individual splice mutation information, the minimal set of
   * splices can be synthesized given the previous state and final state of an
   * array. The basic approach is to calculate the edit distance matrix and
   * choose the shortest path through it.
   *
   * Complexity: O(l * p)
   *   l: The length of the current array
   *   p: The length of the old array
   */
  function calcSplices(current, currentStart, currentEnd,
                       old, oldStart, oldEnd) {
    var prefixCount = 0;
    var suffixCount = 0;

    var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
    if (currentStart == 0 && oldStart == 0)
      prefixCount = sharedPrefix(current, old, minLength);

    if (currentEnd == current.length && oldEnd == old.length)
      suffixCount = sharedSuffix(current, old, minLength - prefixCount);

    currentStart += prefixCount;
    oldStart += prefixCount;
    currentEnd -= suffixCount;
    oldEnd -= suffixCount;

    if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
      return [];

    if (currentStart == currentEnd) {
      var splice = newSplice(currentStart, [], 0);
      while (oldStart < oldEnd)
        splice.removed.push(old[oldStart++]);

      return [ splice ];
    } else if (oldStart == oldEnd)
      return [ newSplice(currentStart, [], currentEnd - currentStart) ];

    var ops = spliceOperationsFromEditDistances(calcEditDistances(current, currentStart, currentEnd,
                                           old, oldStart, oldEnd));

    var splice = undefined;
    var splices = [];
    var index = currentStart;
    var oldIndex = oldStart;
    for (var i = 0; i < ops.length; i++) {
      switch(ops[i]) {
        case EDIT_LEAVE:
          if (splice) {
            splices.push(splice);
            splice = undefined;
          }

          index++;
          oldIndex++;
          break;
        case EDIT_UPDATE:
          if (!splice)
            splice = newSplice(index, [], 0);

          splice.addedCount++;
          index++;

          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
        case EDIT_ADD:
          if (!splice)
            splice = newSplice(index, [], 0);

          splice.addedCount++;
          index++;
          break;
        case EDIT_DELETE:
          if (!splice)
            splice = newSplice(index, [], 0);

          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
      }
    }

    if (splice) {
      splices.push(splice);
    }
    return splices;
  }

  function intersect(start1, end1, start2, end2) {
    // Disjoint
    if (end1 < start2 || end2 < start1)
      return -1;

    // Adjacent
    if (end1 == start2 || end2 == start1)
      return 0;

    // Non-zero intersect, span1 first
    if (start1 < start2) {
      if (end1 < end2)
        return end1 - start2; // Overlap
      else
        return end2 - start2; // Contained
    } else {
      // Non-zero intersect, span2 first
      if (end2 < end1)
        return end2 - start1; // Overlap
      else
        return end1 - start1; // Contained
    }
  }

  function mergeSplice(splices, index, removed, addedCount) {

    var splice = newSplice(index, removed, addedCount);

    var inserted = false;
    var insertionOffset = 0;

    for (var i = 0; i < splices.length; i++) {
      var current = splices[i];
      current.index += insertionOffset;

      if (inserted)
        continue;

      var intersectCount = intersect(splice.index,
                                     splice.index + splice.removed.length,
                                     current.index,
                                     current.index + current.addedCount);

      if (intersectCount >= 0) {
        // Merge the two splices

        splices.splice(i, 1);
        i--;

        insertionOffset -= current.addedCount - current.removed.length;

        splice.addedCount += current.addedCount - intersectCount;
        var deleteCount = splice.removed.length +
                          current.removed.length - intersectCount;

        if (!splice.addedCount && !deleteCount) {
          // merged splice is a noop. discard.
          inserted = true;
        } else {
          var removed = current.removed;

          if (splice.index < current.index) {
            // some prefix of splice.removed is prepended to current.removed.
            var prepend = splice.removed.slice(0, current.index - splice.index);
            Array.prototype.push.apply(prepend, removed);
            removed = prepend;
          }

          if (splice.index + splice.removed.length > current.index + current.addedCount) {
            // some suffix of splice.removed is appended to current.removed.
            var append = splice.removed.slice(current.index + current.addedCount - splice.index);
            Array.prototype.push.apply(removed, append);
          }

          splice.removed = removed;
          if (current.index < splice.index) {
            splice.index = current.index;
          }
        }
      } else if (splice.index < current.index) {
        // Insert splice here.

        inserted = true;

        splices.splice(i, 0, splice);
        i++;

        var offset = splice.addedCount - splice.removed.length
        current.index += offset;
        insertionOffset += offset;
      }
    }

    if (!inserted)
      splices.push(splice);
  }

  function createInitialSplices(array, changeRecords) {
    var splices = [];

    for (var i = 0; i < changeRecords.length; i++) {
      var record = changeRecords[i];
      switch(record.type) {
        case 'splice':
          mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
          break;
        case 'new':
        case 'updated':
        case 'deleted':
          if (!isIndex(record.name))
            continue;
          var index = toNumber(record.name);
          if (index < 0)
            continue;
          mergeSplice(splices, index, [record.oldValue], 1);
          break;
        default:
          console.error('Unexpected record type: ' + JSON.stringify(record));
          break;
      }
    }

    return splices;
  }

  function projectArraySplices(array, changeRecords) {
    var splices = [];

    createInitialSplices(array, changeRecords).forEach(function(splice) {
      if (splice.addedCount == 1 && splice.removed.length == 1) {
        if (splice.removed[0] !== array[splice.index])
          splices.push(splice);

        return
      };

      splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount,
                                           splice.removed, 0, splice.removed.length));
    });

    return splices;
  }

  global.Observer = Observer;
  global.Observer.hasObjectObserve = hasObserve;
  global.ArrayObserver = ArrayObserver;
  global.ArrayObserver.calculateSplices = function(current, previous) {
    return calcSplices(current, 0, current.length, previous, 0, previous.length);
  };
  global.ObjectObserver = ObjectObserver;
  global.PathObserver = PathObserver;
  global.Path = Path;
})((exports.Number = { isNaN: window.isNaN }) ? exports : exports);

},{}],27:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services');

function _$http(deferred, config) {
	var start = new Date().getTime();

	services.$http(config).success(function (data, status, headers, config) {
		services.$log.debug(config.method + ' request:' + config.url + ' Time taken: ' + (new Date().getTime() - start) + 'ms', arguments);
		deferred.resolve(data);
	}).error(function (data, status, headers, config) {
			services.$log.error(arguments);
			deferred.reject(data);
		});
}

/**
 * @doc method
 * @id DS.async_methods:HTTP
 * @name HTTP
 * @description
 * `DS.HTTP(config)`
 *
 * Wrapper for `$http()`.
 *
 * Example:
 *
 * ```js
 * TODO: HTTP(config) example
 * ```
 *
 * @param {object} config Configuration for the request.
 * @returns {Promise} Promise produced by the `$q` service.
 */
function HTTP(config) {
	var deferred = services.$q.defer();

	try {
		if (!services.$rootScope.$$phase) {
			services.$rootScope.$apply(function () {
				_$http(deferred, config);
			});
		} else {
			_$http(deferred, config);
		}
	} catch (err) {
		deferred.reject(new errors.UnhandledError(err));
	}

	return deferred.promise;
}

/**
 * @doc method
 * @id DS.async_methods:GET
 * @name GET
 * @description
 * `DS.GET(url[, config])`
 *
 * Wrapper for `$http.get()`.
 *
 * Example:
 *
 * ```js
 * TODO: GET(url[, config]) example
 * ```
 *
 * @param {string} url The url of the request.
 * @param {object} config Configuration for the request.
 * @returns {Promise} Promise produced by the `$q` service.
 */
function GET(url, config) {
	config = config || {};
	return HTTP(utils.deepMixIn(config, {
		url: url,
		method: 'GET'
	}));
}

/**
 * @doc method
 * @id DS.async_methods:PUT
 * @name PUT
 * @description
 * `DS.PUT(url[, attrs][, config])`
 *
 * Wrapper for `$http.put()`.
 *
 * Example:
 *
 * ```js
 * TODO: PUT(url[, attrs][, config]) example
 * ```
 *
 * @param {string} url The url of the request.
 * @param {object} attrs Request payload.
 * @param {object} config Configuration for the request.
 * @returns {Promise} Promise produced by the `$q` service.
 */
function PUT(url, attrs, config) {
	config = config || {};
	return HTTP(utils.deepMixIn(config, {
		url: url,
		data: attrs,
		method: 'PUT'
	}));
}

/**
 * @doc method
 * @id DS.async_methods:POST
 * @name POST
 * @description
 * `DS.POST(url[, attrs][, config])`
 *
 * Wrapper for `$http.post()`.
 *
 * Example:
 *
 * ```js
 * TODO: POST(url[, attrs][, config]) example
 * ```
 *
 * @param {string} url The url of the request.
 * @param {object} attrs Request payload.
 * @param {object} config Configuration for the request.
 * @returns {Promise} Promise produced by the `$q` service.
 */
function POST(url, attrs, config) {
	config = config || {};
	return HTTP(utils.deepMixIn(config, {
		url: url,
		data: attrs,
		method: 'POST'
	}));
}

/**
 * @doc method
 * @id DS.async_methods:DEL
 * @name DEL
 * @description
 * `DS.DEL(url[, config])`
 *
 * Wrapper for `$http.delete()`.
 *
 * Example:
 *
 * ```js
 * TODO: DEL(url[, config]) example
 * ```
 *
 * @param {string} url The url of the request.
 * @param {object} config Configuration for the request.
 * @returns {Promise} Promise produced by the `$q` service.
 */
function DEL(url, config) {
	config = config || {};
	return HTTP(utils.deepMixIn(config, {
		url: url,
		method: 'DELETE'
	}));
}

module.exports = {
	/**
	 * @doc method
	 * @id DS.async_methods:HTTP
	 * @name HTTP
	 * @methodOf DS
	 * @description
	 * `DS.HTTP(config)`
	 *
	 * Wrapper for `$http()`.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: HTTP(config) example
	 * ```
	 *
	 * @param {object} config Configuration for the request.
	 * @returns {Promise} Promise produced by the `$q` service.
	 */
	HTTP: HTTP,

	/**
	 * @doc method
	 * @id DS.async_methods:GET
	 * @name GET
	 * @methodOf DS
	 * @description
	 * `DS.GET(url[, config])`
	 *
	 * Wrapper for `$http.get()`.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: GET(url[, config]) example
	 * ```
	 *
	 * @param {string} url The url of the request.
	 * @param {object} config Configuration for the request.
	 * @returns {Promise} Promise produced by the `$q` service.
	 */
	GET: GET,

	/**
	 * @doc method
	 * @id DS.async_methods:POST
	 * @name POST
	 * @methodOf DS
	 * @description
	 * `DS.POST(url[, attrs][, config])`
	 *
	 * Wrapper for `$http.post()`.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: POST(url[, attrs][, config]) example
	 * ```
	 *
	 * @param {string} url The url of the request.
	 * @param {object} attrs Request payload.
	 * @param {object} config Configuration for the request.
	 * @returns {Promise} Promise produced by the `$q` service.
	 */
	POST: POST,

	/**
	 * @doc method
	 * @id DS.async_methods:PUT
	 * @name PUT
	 * @methodOf DS
	 * @description
	 * `DS.PUT(url[, attrs][, config])`
	 *
	 * Wrapper for `$http.put()`.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: PUT(url[, attrs][, config]) example
	 * ```
	 *
	 * @param {string} url The url of the request.
	 * @param {object} attrs Request payload.
	 * @param {object} config Configuration for the request.
	 * @returns {Promise} Promise produced by the `$q` service.
	 */
	PUT: PUT,

	/**
	 * @doc method
	 * @id DS.async_methods:DEL
	 * @name DEL
	 * @methodOf DS
	 * @description
	 * `DS.DEL(url[, config])`
	 *
	 * Wrapper for `$http.delete()`.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: DEL(url[, config]) example
	 * ```
	 *
	 * @param {string} url The url of the request.
	 * @param {object} config Configuration for the request.
	 * @returns {Promise} Promise produced by the `$q` service.
	 */
	DEL: DEL
};

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],28:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store'),
	services = require('services');

/**
 * @doc method
 * @id DS.async_methods:create
 * @name create
 * @description
 * `create(resourceName, attrs)`
 *
 * Create a new resource.
 *
 * Example:
 *
 * ```js
 * TODO: create(resourceName, attrs)
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} attrs The attributes with which to update the item of the type specified by `resourceName` that has
 * the primary key specified by `id`.
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## ResolvesWith:
 *
 * - `{object}` - `item` - A reference to the newly created item.
 *
 * ## RejectsWith:
 *
 * - `{IllegalArgumentError}` - `err` - Argument `attrs` must be an object.
 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
 */
function create(resourceName, attrs) {
	var deferred = $q.defer();
	if (!store[resourceName]) {
		deferred.reject(new errors.RuntimeError('DS.create(resourceName, attrs): ' + resourceName + ' is not a registered resource!'));
	} else if (!utils.isObject(attrs)) {
		deferred.reject(new errors.IllegalArgumentError('DS.create(resourceName, attrs): attrs: Must be an object!', { attrs: { actual: typeof attrs, expected: 'object' } }));
	}

	try {
		var resource = store[resourceName],
			_this = this;

		if (resource.validate) {
			resource.validate(attrs, null, function (err) {
				if (err) {
					deferred.reject(err);
				} else {
					_this.POST(resource.url, attrs, null).then(function (data) {
						try {
							deferred.resolve(_this.inject(resource.name, data));
						} catch (err) {
							deferred.reject(err);
						}
					}, deferred.reject);
				}
			});
		} else {
			_this.POST(resource.url, attrs, null).then(function (data) {
				try {
					deferred.resolve(_this.inject(resource.name, data));
				} catch (err) {
					deferred.reject(err);
				}
			}, deferred.reject);
		}
	} catch (err) {
		deferred.reject(new errors.UnhandledError(err));
	}

	return deferred.promise;
}

module.exports = create;

},{"errors":"hIh4e1","services":"cX8q+p","store":"hT1bCX","utils":"uE/lJt"}],29:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store');

/**
 * @doc method
 * @id DS.async_methods:destroy
 * @name destroy
 * @description
 * `destroy(resourceName, id)`
 *
 * Delete the item of the type specified by `resourceName` with the primary key specified by `id` from the data store
 * and the server.
 *
 * Example:
 *
 * ```js
 * TODO: destroy(type, id) example
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to remove.
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## ResolvesWith:
 *
 * - `{string|number}` - `id` - The primary key of the destroyed item.
 *
 * ## RejectsWith:
 *
 * - `{IllegalArgumentError}` - `err` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
 */
function destroy(resourceName, id) {
	var deferred = $q.defer();
	if (!store[resourceName]) {
		deferred.reject(new errors.RuntimeError('DS.destroy(resourceName, id): ' + resourceName + ' is not a registered resource!'));
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		deferred.reject(new errors.IllegalArgumentError('DS.destroy(resourceName, id): id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } }));
	}

	try {
		var resource = store[resourceName],
			_this = this;

		_this.DEL(utils.makePath(resource.url, id), null).then(function () {
			try {
				_this.eject(resourceName, id);
				deferred.resolve(id);
			} catch (err) {
				deferred.reject(err);
			}
		}, deferred.reject);
	} catch (err) {
		deferred.reject(new errors.UnhandledError(err));
	}

	return deferred.promise;
}

module.exports = destroy;

},{"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],30:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store'),
	services = require('services'),
	GET = require('../../HTTP').GET;

/**
 * @doc method
 * @id DS.async_methods:find
 * @name find
 * @description
 * `find(resourceName, id[, forceRefresh])`
 *
 * Asynchronously return the resource with the given id from the server. The result will be added to the data
 * store when it returns from the server.
 *
 * Example:
 *
 * ```js
 * TODO: find(resourceName, id[, forceRefresh]) example
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to retrieve.
 * @param {boolean=} forceRefresh Bypass the cache.
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## ResolvesWith:
 *
 * - `{array}` - `item` - The item with the primary key specified by `id`.
 *
 * ## RejectsWith:
 *
 * - `{IllegalArgumentError}` - `err` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
 */
function find(resourceName, id, forceRefresh) {
	var deferred = $q.defer();
	if (!store[resourceName]) {
		deferred.reject(new errors.RuntimeError('DS.find(resourceName, id[, forceRefresh]): ' + resourceName + ' is not a registered resource!'));
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		deferred.reject(new errors.IllegalArgumentError('DS.find(resourceName, id[, forceRefresh]): id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } }));
	}

	var _this = this;

	try {
		var resource = store[resourceName];

		if (id in resource.index && !forceRefresh) {
			deferred.resolve(_this.get(resourceName, id));
		} else {
			GET(utils.makePath(resource.url, id), null).then(function (data) {
				try {
					_this.inject(resourceName, data);
					deferred.resolve(_this.get(resourceName, id));
				} catch (err) {
					deferred.reject(err);
				}
			}, deferred.reject);
		}
	} catch (err) {
		deferred.reject(new errors.UnhandledError(err));
	}

	return deferred.promise;
}

module.exports = find;

},{"../../HTTP":27,"errors":"hIh4e1","services":"cX8q+p","store":"hT1bCX","utils":"uE/lJt"}],31:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store'),
	services = require('services'),
	GET = require('../../HTTP').GET;

function processResults(data, resourceName, queryHash) {
	var resource = store[resourceName];

	data = data || [];

	// Query is no longer pending
	delete resource.pendingQueries[queryHash];
	resource.completedQueries[queryHash] = new Date().getTime();

	var temp = [];
	for (var i = 0; i < data.length; i++) {
		temp.push(data[i]);
	}
	// Merge the new values into the cache
	resource.collection = utils.mergeArrays(resource.collection, data, resource.idAttribute || 'id');

	// Update the data store's index for this resource
	resource.index = utils.toLookup(resource.collection, resource.idAttribute || 'id');

	// Update modified timestamp for values that were return by the server
	for (var j = 0; j < temp.length; j++) {
		resource.modified[temp[j][resource.idAttribute || 'id']] = utils.updateTimestamp(resource.modified[temp[j][resource.idAttribute || 'id']]);
	}

	// Update modified timestamp of collection
	resource.collectionModified = utils.updateTimestamp(resource.collectionModified);
	return temp;
}

function _findAll(deferred, resourceName, params, forceRefresh) {
	var resource = store[resourceName];

	var queryHash = utils.toJson(params);

	if (forceRefresh) {
		delete resource.completedQueries[queryHash];
	}

	if (!(queryHash in resource.completedQueries)) {
		// This particular query has never been completed

		if (!resource.pendingQueries[queryHash]) {

			// This particular query has never even been started
			resource.pendingQueries[queryHash] = GET(resource.url, { params: params }).then(function (data) {
				try {
					deferred.resolve(processResults(data, resourceName, queryHash));
				} catch (err) {
					deferred.reject(new errors.UnhandledError(err));
				}
			}, deferred.reject);
		}
	} else {
		deferred.resolve(this.filter(resourceName, params));
	}
}

/**
 * @doc method
 * @id DS.async_methods:findAll
 * @name findAll
 * @description
 * `findAll(resourceName[, params][, forceRefresh])`
 *
 * Asynchronously return the resource from the server filtered by the query. The results will be added to the data
 * store when it returns from the server.
 *
 * Example:
 *
 * ```js
 * TODO: findAll(resourceName[, params][, forceRefresh]) example
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object=} params Parameter object that is serialized into the query string. Properties:
 *
 * - `{object=}` - `query` - The query object by which to filter items of the type specified by `resourceName`. Properties:
 *      - `{object=}` - `where` - Where clause.
 *      - `{number=}` - `limit` - Limit clause.
 *      - `{skip=}` - `skip` - Skip clause.
 *
 * @param {boolean=} forceRefresh Bypass the cache.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## ResolvesWith:
 *
 * - `{array}` - `items` - The collection of items returned by the server.
 *
 * ## RejectsWith:
 *
 * - `{IllegalArgumentError}` - `err` - Argument `params` must be an object.
 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
 */
function findAll(resourceName, params, forceRefresh) {
	var deferred = services.$q.defer();

	params = params || {};

	if (!store[resourceName]) {
		deferred.reject(new errors.RuntimeError('DS.findAll(resourceName[, params]): ' + resourceName + ' is not a registered resource!'));
	} else if (!utils.isObject(params)) {
		deferred.reject(new errors.IllegalArgumentError('DS.findAll(resourceName[, params]): params: Must be an object!', { params: { actual: typeof params, expected: 'object' } }));
	} else {
		try {
			_findAll.apply(this, [deferred, resourceName, params, forceRefresh]);
		} catch (err) {
			deferred.reject(new errors.UnhandledError(err));
		}
	}

	return deferred.promise;
}

module.exports = findAll;

},{"../../HTTP":27,"errors":"hIh4e1","services":"cX8q+p","store":"hT1bCX","utils":"uE/lJt"}],32:[function(require,module,exports){
module.exports = {
	/**
	 * @doc method
	 * @id DS.async_methods:create
	 * @name create
	 * @methodOf DS
	 * @description
	 * `create(resourceName, attrs)`
	 *
	 * Create a new resource.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: create(resourceName, attrs)
	 * ```
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {object} attrs The attributes with which to update the item of the type specified by `resourceName` that has
	 * the primary key specified by `id`.
	 * @returns {Promise} Promise produced by the `$q` service.
	 *
	 * ## ResolvesWith:
	 *
	 * - `{object}` - `item` - A reference to the newly created item.
	 *
	 * ## RejectsWith:
	 *
	 * - `{IllegalArgumentError}` - `err` - Argument `attrs` must be an object.
	 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
	 */
	create: require('./create'),

	/**
	 * @doc method
	 * @id DS.async_methods:destroy
	 * @name destroy
	 * @methodOf DS
	 * @description
	 * `destroy(resourceName, id)`
	 *
	 * Delete the item of the type specified by `resourceName` with the primary key specified by `id` from the data store
	 * and the server.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: destroy(type, id) example
	 * ```
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number} id The primary key of the item to remove.
	 * @returns {Promise} Promise produced by the `$q` service.
	 *
	 * ## ResolvesWith:
	 *
	 * - `{string|number}` - `id` - The primary key of the destroyed item.
	 *
	 * ## RejectsWith:
	 *
	 * - `{IllegalArgumentError}` - `err` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
	 */
	destroy: require('./destroy'),

	/**
	 * @doc method
	 * @id DS.async_methods:find
	 * @name find
	 * @methodOf DS
	 * @description
	 * `find(resourceName, id[, forceRefresh])`
	 *
	 * Asynchronously return the resource with the given id from the server. The result will be added to the data
	 * store when it returns from the server.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: find(resourceName, id[, forceRefresh]) example
	 * ```
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number} id The primary key of the item to retrieve.
	 * @param {boolean=} forceRefresh Bypass the cache.
	 * @returns {Promise} Promise produced by the `$q` service.
	 *
	 * ## ResolvesWith:
	 *
	 * - `{array}` - `item` - The item with the primary key specified by `id`.
	 *
	 * ## RejectsWith:
	 *
	 * - `{IllegalArgumentError}` - `err` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
	 */
	find: require('./find'),

	/**
	 * @doc method
	 * @id DS.async_methods:findAll
	 * @name findAll
	 * @methodOf DS
	 * @description
	 * `findAll(resourceName[, params][, forceRefresh])`
	 *
	 * Asynchronously return the resource from the server filtered by the query. The results will be added to the data
	 * store when it returns from the server.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: findAll(resourceName[, params][, forceRefresh]) example
	 * ```
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {object=} params Parameter object that is serialized into the query string. Properties:
	 *
	 * - `{object=}` - `query` - The query object by which to filter items of the type specified by `resourceName`. Properties:
	 *      - `{object=}` - `where` - Where clause.
	 *      - `{number=}` - `limit` - Limit clause.
	 *      - `{skip=}` - `skip` - Skip clause.
	 *
	 * @param {boolean=} forceRefresh Bypass the cache.
	 *
	 * @returns {Promise} Promise produced by the `$q` service.
	 *
	 * ## ResolvesWith:
	 *
	 * - `{array}` - `items` - The collection of items returned by the server.
	 *
	 * ## RejectsWith:
	 *
	 * - `{IllegalArgumentError}` - `err` - Argument `params` must be an object.
	 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
	 */
	findAll: require('./findAll'),

	/**
	 * @doc method
	 * @id DS.async_methods:refresh
	 * @name refresh
	 * @methodOf DS
	 * @description
	 * `refresh(resourceName, id)`
	 *
	 * Like find(), except the resource is only refreshed from the server if it already exists in the data store.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: refresh(resourceName, id) example
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number} id The primary key of the item to refresh from the server.
	 * @returns {false|Promise} `false` if the item doesn't already exist in the data store. A `Promise` if the item does
	 * exist in the data store and is being refreshed.
	 *
	 * ## ResolvesWith:
	 *
	 * - `{object}` - `item` - A reference to the refreshed item.
	 *
	 * ## RejectsWith:
	 *
	 * - `{IllegalArgumentError}` - `err` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
	 */
	refresh: require('./refresh'),

	/**
	 * @doc method
	 * @id DS.async_methods:save
	 * @name save
	 * @methodOf DS
	 * @description
	 * `save(resourceName, id)`
	 *
	 * save the item of the type specified by `resourceName` that has the primary key specified by `id`.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: save(resourceName, id) example
	 * ```
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number} id The primary key of the item to retrieve.
	 * @returns {Promise} Promise produced by the `$q` service.
	 *
	 * ## ResolvesWith:
	 *
	 * - `{object}` - `item` - A reference to the newly saved item.
	 *
	 * ## RejectsWith:
	 *
	 * - `{IllegalArgumentError}` - `err` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
	 */
	save: require('./save')
};

},{"./create":28,"./destroy":29,"./find":30,"./findAll":31,"./refresh":33,"./save":34}],33:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store'),
	PUT = require('../../HTTP').PUT;

/**
 * @doc method
 * @id DS.async_methods:refresh
 * @name refresh
 * @description
 * `refresh(resourceName, id)`
 *
 * Like find(), except the resource is only refreshed from the server if it already exists in the data store.
 *
 * Example:
 *
 * ```js
 * TODO: refresh(resourceName, id) example
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to refresh from the server.
 * @returns {false|Promise} `false` if the item doesn't already exist in the data store. A `Promise` if the item does
 * exist in the data store and is being refreshed.
 *
 * ## ResolvesWith:
 *
 * - `{object}` - `item` - A reference to the refreshed item.
 *
 * ## RejectsWith:
 *
 * - `{IllegalArgumentError}` - `err` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
 */
function refresh(resourceName, id) {
	if (!store[resourceName]) {
		throw new errors.RuntimeError('DS.refresh(resourceName, id): ' + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError('DS.refresh(resourceName, id): id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	if (id in store[resourceName].index) {
		return this.find(resourceName, id, true);
	} else {
		return false;
	}
}

module.exports = refresh;

},{"../../HTTP":27,"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],34:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store'),
	services = require('services'),
	PUT = require('../../HTTP').PUT;

function _save(deferred, resource, id, attrs) {
	var _this = this;
	PUT(utils.makePath(resource.url, id), attrs, null).then(function (data) {
		var saved = _this.inject(resource.name, data);
		resource.saved[saved[resource.idAttribute]] = utils.saveTimestamp(resource.saved[saved[resource.idAttribute]]);
		deferred.resolve(saved);
	}, deferred.reject);
}

/**
 * @doc method
 * @id DS.async_methods:save
 * @name save
 * @description
 * `save(resourceName, id)`
 *
 * save the item of the type specified by `resourceName` that has the primary key specified by `id`.
 *
 * Example:
 *
 * ```js
 * TODO: save(resourceName, id) example
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to retrieve.
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## ResolvesWith:
 *
 * - `{object}` - `item` - A reference to the newly saved item.
 *
 * ## RejectsWith:
 *
 * - `{IllegalArgumentError}` - `err` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - `err` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - `err` - Thrown for any uncaught exception.
 */
function save(resourceName, id) {
	var deferred = $q.defer();
	if (!store[resourceName]) {
		deferred.reject(new errors.RuntimeError('DS.save(resourceName, id, attrs): ' + resourceName + ' is not a registered resource!'));
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		deferred.reject(new errors.IllegalArgumentError('DS.save(resourceName, id, attrs): id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } }));
	}

	var _this = this;

	try {
		var resource = store[resourceName];

		if (resource.validate) {
			resource.validate(resource.index[resource.idAttribute || 'id'], function (err) {
				if (err) {
					deferred.reject(err);
				} else {
					_save.call(_this, deferred, resource, id);
				}
			});
		} else {
			_save.call(_this, deferred, resource, id);
		}
	} catch (err) {
		deferred.reject(new errors.UnhandledError(err));
	}

	return deferred.promise;
}

module.exports = save;

},{"../../HTTP":27,"errors":"hIh4e1","services":"cX8q+p","store":"hT1bCX","utils":"uE/lJt"}],35:[function(require,module,exports){
module.exports=require(27)
},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],36:[function(require,module,exports){
var utils = require('utils'),
	services = require('services');

/**
 * @doc interface
 * @id DSProvider
 * @name DSProvider
 */
function DSProvider() {
	this.$get = ['$rootScope', '$log', '$http', '$q', function ($rootScope, $log, $http, $q) {

		services.$rootScope = $rootScope;
		services.$log = $log;
		services.$http = $http;
		services.$q = $q;

		/**
		 * @doc interface
		 * @id DS
		 * @name DS
		 * @description
		 * Data store
		 */
		var DS = {};

		utils.deepMixIn(DS, require('./http'));
		utils.deepMixIn(DS, require('./sync_methods'));
		utils.deepMixIn(DS, require('./async_methods'));

		utils.deepFreeze(DS);

		var $dirtyCheckScope = $rootScope.$new();

		$dirtyCheckScope.$watch(function () {
			// Throttle angular-data's digest loop to tenths of a second
			return new Date().getTime() / 100 | 0;
		}, function () {
			DS.digest();
		});

		return DS;
	}];
}

module.exports = DSProvider;

},{"./async_methods":32,"./http":35,"./sync_methods":48,"services":"cX8q+p","utils":"uE/lJt"}],"services":[function(require,module,exports){
module.exports=require('cX8q+p');
},{}],"cX8q+p":[function(require,module,exports){
module.exports = {};

},{}],"hT1bCX":[function(require,module,exports){
module.exports = {

};

},{}],"store":[function(require,module,exports){
module.exports=require('hT1bCX');
},{}],41:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store');

/**
 * @doc method
 * @id DS.sync_methods:changes
 * @name changes
 * @description
 * `changes(resourceName, id)`
 *
 * Synchronously return the changes object of the item of the type specified by `resourceName` that has the primary key
 * specified by `id`. This object represents the diff between the item in its current state and the state of the item
 * the last time it was saved via an async adapter.
 *
 * Example:
 *
 * ```js
 * TODO: changes(resourceName, id) example
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item of the changes to retrieve.
 * @returns {object} The changes of the item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function changes(resourceName, id) {
	if (!store[resourceName]) {
		throw new errors.IllegalArgumentError('DS.changes(resourceName, id): ' + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError('DS.changes(resourceName, id): id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		// return resource from cache
		return angular.copy(store[resourceName].changes[id]);
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = changes;

},{"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],42:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store');

/**
 * @doc method
 * @id DS.sync_methods:defineResource
 * @name defineResource
 * @description
 * `defineResource(definition)`
 *
 * Register a resource definition with the data store.
 *
 * Example:
 *
 * ```js
 * TODO: defineResource(definition)
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - Argument `definition` must be a string or an object.
 * - `{RuntimeError}` - Property `name` of argument `definition` must not refer to an already registered resource.
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 *
 * @param {string|object} definition Name of resource or resource definition object: Properties:
 *
 * - `{string}` - `name` - The name by which this resource will be identified.
 * - `{string="id"}` - `idAttribute` - The attribute that specifies the primary key for this resource.
 * - `{string=}` - `endpoint` - The attribute that specifies the primary key for this resource. Default is the value of `name`.
 * - `{string="/"}` - `baseUrl` - The url relative to which all AJAX requests will be made.
 * - `{function=}` - `validate` - The validation function to be executed before create operations.
 */
function defineResource(definition) {
	if (utils.isString(definition)) {
		definition = {
			name: definition
		};
	}
	if (!utils.isObject(definition)) {
		throw new errors.IllegalArgumentError('DS.defineResource(definition): definition: Must be an object!', { definition: { actual: typeof definition, expected: 'object' } });
	} else if (!utils.isString(definition.name)) {
		throw new errors.IllegalArgumentError('DS.defineResource(definition): definition.name: Must be a string!', { definition: { name: { actual: typeof definition.name, expected: 'string' } } });
	} else if (definition.idAttribute && !utils.isString(definition.idAttribute)) {
		throw new errors.IllegalArgumentError('DS.defineResource(definition): definition.idAttribute: Must be a string!', { definition: { idAttribute: { actual: typeof definition.idAttribute, expected: 'string' } } });
	} else if (store[definition.name]) {
		throw new errors.RuntimeError('DS.defineResource(definition): ' + definition.name + ' is already registered!');
	}

	try {
		store[definition.name] = definition;

		var resource = store[definition.name];
		resource.url = utils.makePath(resource.baseUrl, (resource.endpoint || resource.name));
		resource.collection = [];
		resource.completedQueries = {};
		resource.pendingQueries = {};
		resource.index = {};
		resource.modified = {};
		resource.changes = {};
		resource.previous_attributes = {};
		resource.saved = {};
		resource.observers = {};
		resource.collectionModified = 0;
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = defineResource;

},{"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],43:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store'),
	services = require('services'),
	observe = require('observejs');

/**
 * @doc method
 * @id DS.sync_methods:digest
 * @name digest
 * @description
 * `digest()`
 *
 * Trigger a digest loop that checks for changes and updates the `lastModified` timestamp if an object has changed.
 * Anything $watching `DS.lastModified(...)` will detect the updated timestamp and execute the callback function.
 *
 * Example:
 *
 * ```js
 * TODO: digest() example
 * ```
 *
 * ## Throws
 *
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 */
function digest() {
	try {
		if (!services.$rootScope.$$phase) {
			services.$rootScope.$apply(function () {
				observe.Platform.performMicrotaskCheckpoint();
			});
		} else {
			observe.Platform.performMicrotaskCheckpoint();
		}
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = digest;

},{"errors":"hIh4e1","observejs":"q+M0EE","services":"cX8q+p","store":"hT1bCX","utils":"uE/lJt"}],44:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store'),
	services = require('services');

function _eject(resource, id) {
	if (id) {
		for (var i = 0; i < resource.collection.length; i++) {
			if (resource.collection[i][resource.idAttribute || 'id'] == id) {
				break;
			}
		}
		resource.collection.splice(i, 1);
		resource.observers[id].close();
		delete resource.observers[id];
		delete resource.index[id];
		delete resource.changes[id];
		delete resource.previous_attributes[id];
		delete resource.modified[id];
		delete resource.saved[id];
	} else {
		resource.collection = [];
		resource.index = {};
		resource.modified = {};
	}
	resource.collectionModified = utils.updateTimestamp(resource.collectionModified);
}

/**
 * @doc method
 * @id DS.sync_methods:eject
 * @name eject
 * @description
 * `eject(resourceName[, id])`
 *
 * Eject the item of the specified type that has the given primary key from the data store. If no primary key is
 * provided, eject all items of the specified type from the data store. Ejection only removes items from the data store
 * and does not attempt to delete items on the server.
 *
 * Example:
 *
 * ```js
 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
 *
 * DS.eject('document', 45);
 *
 * DS.get('document', 45); // undefined
 * ```
 *
 * Eject all items of the specified type from the data store.
 *
 * ```js
 * DS.filter('document'); // [ { title: 'How to Cook', id: 45 }, { title: 'How to Eat', id: 46 } ]
 *
 * DS.eject('document');
 *
 * DS.filter('document'); // [ ]
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - If provided, argument `id` must be a string or a number.
 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to eject.
 */
function eject(resourceName, id) {
	if (!store[resourceName]) {
		throw new errors.RuntimeError('DS.eject(resourceName, id): ' + resourceName + ' is not a registered resource!');
	} else if (id && !utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError('DS.eject(resourceName, id): id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		if (!services.$rootScope.$$phase) {
			services.$rootScope.$apply(function () {
				_eject(store[resourceName], id);
			});
		} else {
			_eject(store[resourceName], id);
		}
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = eject;

},{"errors":"hIh4e1","services":"cX8q+p","store":"hT1bCX","utils":"uE/lJt"}],45:[function(require,module,exports){
/* jshint loopfunc: true */
var utils = require('utils'),
	errors = require('errors'),
	store = require('store'),
	errorPrefix = 'DS.filter(resourceName, params[, options])';

/**
 * @doc method
 * @id DS.sync_methods:filter
 * @name filter
 * @description
 * Synchronously filter items in the data store of the type specified by `resourceName`.
 *
 * ## Signature:
 * ```js
 * DS.filter(resourceName, params[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * TODO: filter(resourceName, params[, options]) example
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object=} params Parameter object that is serialized into the query string. Properties:
 *
 * - `{object=}` - `query` - The query object by which to filter items of the type specified by `resourceName`. Properties:
 *      - `{object=}` - `where` - Where clause.
 *      - `{number=}` - `limit` - Limit clause.
 *      - `{skip=}` - `skip` - Skip clause.
 * @param {object=} options Whether to load the query from the server if it hasn't been loaded yet. Properties:
 * - `{boolean=}` - `bypassCache` - Bypass the cache.
 *
 * @returns {array} The filtered collection of items of the type specified by `resourceName`.
 */
function filter(resourceName, params, options) {
	options = options || {};

	if (!store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!utils.isObject(params)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'params: Must be an object!', { params: { actual: typeof params, expected: 'object' } });
	} else if (!utils.isObject(options)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } });
	}

	var resource = store[resourceName];

	// Protect against null
	params = params || {};
	params.query = params.query || {};

	var queryHash = utils.toJson(params);

	if (!(queryHash in resource.completedQueries) && options.loadFromServer) {
		// This particular query has never been completed

		if (!resource.pendingQueries[queryHash]) {
			// This particular query has never even been started
			this.findAll(resourceName, params);
		}

		// Return empty results until the query completes
		return [];
	} else {
		// The query has been completed, so hit the cache with the query

		// Apply 'where' clauses
		var filtered = utils.filter(resource.collection, function (value) {
			var keep = true;
			if (params.query.where) {
				if (!utils.isObject(params.query.where)) {
					throw new errors.IllegalArgumentError(errorPrefix + 'params.query.where: Must be an object!', { params: { query: { where: { actual: typeof params.query.where, expected: 'object' } } } });
				}
				utils.forOwn(params.query.where, function (value2, key2) {
					if (utils.isString(value2)) {
						value2 = {
							'==': value2
						};
					}
					if (key2.indexOf('.') !== -1) {
						key2 = key2.split('.')[1];
					}
					if (value2['==']) {
						if (value2['=='] == 'null') {
							keep = keep && (value[key2] === null);
						} else {
							keep = keep && (value[key2] == value2['==']);
						}
					} else if (value2['!=']) {
						keep = keep && (value[key2] != value2['!=']);
					} else if (value2['>']) {
						keep = keep && (value[key2] > value2['>']);
					} else if (value2['>=']) {
						keep = keep && (value[key2] >= value2['>=']);
					} else if (value2['<']) {
						keep = keep && (value[key2] < value2['<']);
					} else if (value2['<=']) {
						keep = keep && (value[key2] <= value2['<=']);
					} else if (value2['in']) {
						keep = keep && utils.contains(value2['in'], value[key2]);
					}
				});
			}
			return keep;
		});

		// Apply 'orderBy'
		if (params.query.orderBy) {
			if (utils.isString(params.query.orderBy)) {
				params.query.orderBy = [
					[params.query.orderBy, 'ASC']
				];
			}
			if (utils.isArray(params.query.orderBy)) {
				for (var i = 0; i < params.query.orderBy.length; i++) {
					if (utils.isString(params.query.orderBy[i])) {
						params.query.orderBy[i] = [params.query.orderBy[i], 'ASC'];
					} else if (!utils.isArray(params.query.orderBy[i])) {
						throw new errors.IllegalArgumentError(errorPrefix + 'params.query.orderBy[' + i + ']: Must be an array!', { params: { query: { 'orderBy[i]': { actual: typeof params.query.orderBy[i], expected: 'array' } } } });
					}
					filtered = utils.sort(filtered, function (a, b) {
						var cA = a[params.query.orderBy[i][0]], cB = b[params.query.orderBy[i][0]];
						if (utils.isString(cA)) {
							cA = utils.upperCase(cA);
						}
						if (utils.isString(cB)) {
							cB = utils.upperCase(cB);
						}
						if (params.query.orderBy[i][1] === 'DESC') {
							if (cB < cA) {
								return -1;
							} else if (cB > cA) {
								return 1;
							} else {
								return 0;
							}
						} else {
							if (cA < cB) {
								return -1;
							} else if (cA > cB) {
								return 1;
							} else {
								return 0;
							}
						}
					});
				}
			} else {
				throw new errors.IllegalArgumentError(errorPrefix + 'params.query.orderBy: Must be an array!', { params: { query: { orderBy: { actual: typeof params.query.orderBy, expected: 'array' } } } });
			}
		}

		// Apply 'limit' and 'offset'
		if (utils.isNumber(params.query.limit) && utils.isNumber(params.query.offset)) {
			filtered = utils.slice(filtered, params.query.offset, params.query.offset + params.query.limit);
		} else if (utils.isNumber(params.query.limit)) {
			filtered = utils.slice(filtered, 0, params.query.limit);
		} else if (utils.isNumber(params.query.offset)) {
			filtered = utils.slice(filtered, params.query.offset);
		}

		return filtered;
	}
}

module.exports = filter;

},{"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],46:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store');

/**
 * @doc method
 * @id DS.sync_methods:get
 * @name get
 * @description
 * `get(resourceName, id)`
 *
 * Synchronously return the resource with the given id. The data store will forward the request to the server if the
 * item is not in the cache.
 *
 * Example:
 *
 * ```js
 * TODO: get(resourceName, id) example
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to retrieve.
 * @returns {object} The item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function get(resourceName, id) {
	if (!store[resourceName]) {
		throw new errors.IllegalArgumentError('DS.get(resourceName, id): ' + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError('DS.get(resourceName, id): id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		// cache miss, request resource from server
		if (!(id in store[resourceName].index)) {
			this.find(resourceName, id);
		}

		// return resource from cache
		return store[resourceName].index[id];
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = get;

},{"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],47:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store');

function diffIsEmpty(diff) {
	return utils.isEmpty(diff.added) &&
		utils.isEmpty(diff.removed) &&
		utils.isEmpty(diff.changed);
}

/**
 * @doc method
 * @id DS.sync_methods:hasChanges
 * @name hasChanges
 * @description
 * `hasChanges(resourceName, id)`
 *
 * Synchronously return whether object of the item of the type specified by `resourceName` that has the primary key
 * specified by `id` has changes.
 *
 * Example:
 *
 * ```js
 * TODO: hasChanges(resourceName, id) example
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item.
 * @returns {boolean} Whether the item of the type specified by `resourceName` with the primary key specified by `id` has changes.
 */
function hasChanges(resourceName, id) {
	if (!store[resourceName]) {
		throw new errors.IllegalArgumentError('DS.hasChanges(resourceName, id): ' + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError('DS.hasChanges(resourceName, id): id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		// return resource from cache
		return diffIsEmpty(store[resourceName].changes[id]);
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = hasChanges;

},{"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],48:[function(require,module,exports){
module.exports = {
	/**
	 * @doc method
	 * @id DS.sync_methods:defineResource
	 * @name defineResource
	 * @methodOf DS
	 * @description
	 * `defineResource(definition)`
	 *
	 * Register a resource definition with the data store.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: defineResource(definition)
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `definition` must be a string or an object.
	 * - `{RuntimeError}` - Property `name` of argument `definition` must not refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string|object} definition Name of resource or resource definition object: Properties:
	 *
	 * - `{string}` - `name` - The name by which this resource will be identified.
	 * - `{string="id"}` - `idAttribute` - The attribute that specifies the primary key for this resource.
	 * - `{string=}` - `endpoint` - The attribute that specifies the primary key for this resource. Default is the value of `name`.
	 * - `{string="/"}` - `baseUrl` - The url relative to which all AJAX requests will be made.
	 * - `{function=}` - `validate` - The validation function to be executed before create operations.
	 */
	defineResource: require('./defineResource'),

	/**
	 * @doc method
	 * @id DS.sync_methods:eject
	 * @name eject
	 * @methodOf DS
	 * @description
	 * `eject(resourceName[, id])`
	 *
	 * Eject the item of the specified type that has the given primary key from the data store. If no primary key is
	 * provided, eject all items of the specified type from the data store. Ejection only removes items from the data store
	 * and does not attempt to delete items on the server.
	 *
	 * Example:
	 *
	 * ```js
	 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
	 *
	 * DS.eject('document', 45);
	 *
	 * DS.get('document', 45); // undefined
	 * ```
	 *
	 * Eject all items of the specified type from the data store.
	 *
	 * ```js
	 * DS.filter('document'); // [ { title: 'How to Cook', id: 45 }, { title: 'How to Eat', id: 46 } ]
	 *
	 * DS.eject('document');
	 *
	 * DS.filter('document'); // [ ]
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - If provided, argument `id` must be a string or a number.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number} id The primary key of the item to eject.
	 */
	eject: require('./eject'),

	/**
	 * @doc method
	 * @id DS.sync_methods:filter
	 * @name filter
	 * @methodOf DS
	 * @description
	 * `filter(resourceName[, params][, loadFromServer])`
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: get(resourceName, id) example
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `params` must be an object.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {object=} params Parameter object that is serialized into the query string. Properties:
	 *
	 * - `{object=}` - `query` - The query object by which to filter items of the type specified by `resourceName`. Properties:
	 *      - `{object=}` - `where` - Where clause.
	 *      - `{number=}` - `limit` - Limit clause.
	 *      - `{skip=}` - `skip` - Skip clause.
	 * @param {boolean=} loadFromServer Whether to load the query from the server if it hasn't been loaded yet.
	 * @returns {array} The filtered collection of items of the type specified by `resourceName`.
	 */
	filter: require('./filter'),

	/**
	 * @doc method
	 * @id DS.sync_methods:get
	 * @name get
	 * @methodOf DS
	 * @description
	 * `get(resourceName, id)`
	 *
	 * Synchronously return the resource with the given id. The data store will forward the request to the server if the
	 * item is not in the cache.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: get(resourceName, id) example
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number} id The primary key of the item to retrieve.
	 * @returns {object} The item of the type specified by `resourceName` with the primary key specified by `id`.
	 */
	get: require('./get'),

	/**
	 * @doc method
	 * @id DS.sync_methods:inject
	 * @name inject
	 * @description
	 * `inject(resourceName, attrs)`
	 *
	 * Inject the given item into the data store as the specified type. If `attrs` is an array, inject each item into the
	 * data store. Injecting an item into the data store does not save it to the server.
	 *
	 * Example:
	 *
	 * ```js
	 * DS.get('document', 45); // undefined
	 *
	 * DS.inject('document', { title: 'How to Cook', id: 45 });
	 *
	 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
	 * ```
	 *
	 * Inject a collection into the data store:
	 *
	 * ```js
	 * DS.filter('document'); // [ ]
	 *
	 * DS.inject('document', [ { title: 'How to Cook', id: 45 }, { title: 'How to Eat', id: 46 } ]);
	 *
	 * DS.filter('document'); // [ { title: 'How to Cook', id: 45 }, { title: 'How to Eat', id: 46 } ]
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `attrs` must be an object.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {object|array} attrs The item or collection of items to inject into the data store.
	 * @returns {object|array} A reference to the item that was injected into the data store or an array of references to
	 * the items that were injected into the data store.
	 */
	inject: require('./inject'),

	/**
	 * @doc method
	 * @id DS.sync_methods:lastModified
	 * @name lastModified
	 * @methodOf DS
	 * @description
	 * `lastModified(resourceName[, id])`
	 *
	 * Return the timestamp of the last time either the collection for `resourceName` or the item of type `resourceName`
	 * with the given primary key was modified.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: lastModified(resourceName, id) example
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number=} id The primary key of the item to remove.
	 * @returns {number} The timestamp of the last time either the collection for `resourceName` or the item of type
	 * `resourceName` with the given primary key was modified.
	 */
	lastModified: require('./lastModified'),

	/**
	 * @doc method
	 * @id DS.sync_methods:lastSaved
	 * @name lastSaved
	 * @methodOf DS
	 * @description
	 * `lastSaved(resourceName[, id])`
	 *
	 * Return the timestamp of the last time either the collection for `resourceName` or the item of type `resourceName`
	 * with the given primary key was saved via an async adapter.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: lastSaved(resourceName, id) example
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number=} id The primary key of the item to remove.
	 * @returns {number} The timestamp of the last time either the collection for `resourceName` or the item of type
	 * `resourceName` with the given primary key was modified.
	 */
	lastSaved: require('./lastSaved'),

	/**
	 * @doc method
	 * @id DS.sync_methods:digest
	 * @name digest
	 * @methodOf DS
	 * @description
	 * `digest()`
	 *
	 * Trigger a digest loop that checks for changes and updates the `lastModified` timestamp if an object has changed.
	 * Anything $watching `DS.lastModified(...)` will detect the updated timestamp and execute the callback function.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: digest() example
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 */
	digest: require('./digest'),

	/**
	 * @doc method
	 * @id DS.sync_methods:changes
	 * @name changes
	 * @methodOf DS
	 * @description
	 * `changes(resourceName, id)`
	 *
	 * Synchronously return the changes object of the item of the type specified by `resourceName` that has the primary key
	 * specified by `id`. This object represents the diff between the item in its current state and the state of the item
	 * the last time it was saved via an async adapter.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: changes(resourceName, id) example
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number} id The primary key of the item of the changes to retrieve.
	 * @returns {object} The changes of the item of the type specified by `resourceName` with the primary key specified by `id`.
	 */
	changes: require('./changes'),

	/**
	 * @doc method
	 * @id DS.sync_methods:previous
	 * @name previous
	 * @methodOf DS
	 * @description
	 * `previous(resourceName, id)`
	 *
	 * Synchronously return the previous attributes of the item of the type specified by `resourceName` that has the primary key
	 * specified by `id`. This object represents the state of the item the last time it was saved via an async adapter.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: previous(resourceName, id) example
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number} id The primary key of the item whose previous attributes are to be retrieved.
	 * @returns {object} The previous attributes of the item of the type specified by `resourceName` with the primary key specified by `id`.
	 */
	previous: require('./previous'),

	/**
	 * @doc method
	 * @id DS.sync_methods:hasChanges
	 * @name hasChanges
	 * @methodOf DS
	 * @description
	 * `hasChanges(resourceName, id)`
	 *
	 * Synchronously return whether object of the item of the type specified by `resourceName` that has the primary key
	 * specified by `id` has changes.
	 *
	 * Example:
	 *
	 * ```js
	 * TODO: hasChanges(resourceName, id) example
	 * ```
	 *
	 * ## Throws
	 *
	 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
	 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
	 * - `{UnhandledError}` - Thrown for any uncaught exception.
	 *
	 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
	 * @param {string|number} id The primary key of the item.
	 * @returns {boolean} Whether the item of the type specified by `resourceName` with the primary key specified by `id` has changes.
	 */
	hasChanges: require('./hasChanges')
};

},{"./changes":41,"./defineResource":42,"./digest":43,"./eject":44,"./filter":45,"./get":46,"./hasChanges":47,"./inject":49,"./lastModified":50,"./lastSaved":51,"./previous":52}],49:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store'),
	services = require('services'),
	observe = require('observejs');

function _inject(resource, attrs) {
	var _this = this;

	if (utils.isArray(attrs)) {
		for (var i = 0; i < attrs.length; i++) {
			_inject.call(_this, resource, attrs[i]);
		}
	} else {
		var id = attrs[resource.idAttribute || 'id'];

		if (!(id in resource.index)) {
			resource.index[id] = {};
			resource.previous_attributes[id] = {};

			utils.deepMixIn(resource.index[id], attrs);
			utils.deepMixIn(resource.previous_attributes[id], attrs);

			resource.collection.push(resource.index[id]);

			resource.observers[id] = new observe.ObjectObserver(resource.index[id], function (added, removed, changed, getOldValueFn) {
				try {
					var innerId = getOldValueFn(resource.idAttribute || 'id');

					if (resource.index[innerId][resource.idAttribute || 'id'] != innerId) {
						resource.index[innerId][resource.idAttribute || 'id'] = innerId;
						services.$log.error('You cannot change the primary key of an object! Reverting change to primary key.');
					}

					resource.changes[innerId] = utils.diffObjectFromOldObject(resource.index[innerId], resource.previous_attributes[innerId]);
					resource.modified[innerId] = utils.updateTimestamp(resource.modified[innerId]);
					resource.collectionModified = utils.updateTimestamp(resource.collectionModified);

					services.$log.debug('old value:', JSON.stringify(resource.previous_attributes[innerId], null, 2));
					services.$log.debug('changes:', resource.changes[innerId]);
					services.$log.debug('new value:', JSON.stringify(resource.index[innerId], null, 2));
				} catch (err) {
					services.$log.error(err.stack);
					throw new errors.UnhandledError(err);
				}
			});

			resource.observers[id].deliver();
		} else {
			utils.deepMixIn(resource.index[id], attrs);
			resource.observers[id].deliver();
		}
	}
}

/**
 * @doc method
 * @id DS.sync_methods:inject
 * @name inject
 * @description
 * `inject(resourceName, attrs)`
 *
 * Inject the given item into the data store as the specified type. If `attrs` is an array, inject each item into the
 * data store. Injecting an item into the data store does not save it to the server.
 *
 * Example:
 *
 * ```js
 * DS.get('document', 45); // undefined
 *
 * DS.inject('document', { title: 'How to Cook', id: 45 });
 *
 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
 * ```
 *
 * Inject a collection into the data store:
 *
 * ```js
 * DS.filter('document'); // [ ]
 *
 * DS.inject('document', [ { title: 'How to Cook', id: 45 }, { title: 'How to Eat', id: 46 } ]);
 *
 * DS.filter('document'); // [ { title: 'How to Cook', id: 45 }, { title: 'How to Eat', id: 46 } ]
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - Argument `attrs` must be an object.
 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object|array} attrs The item or collection of items to inject into the data store.
 * @returns {object|array} A reference to the item that was injected into the data store or an array of references to
 * the items that were injected into the data store.
 */
function inject(resourceName, attrs) {
	if (!store[resourceName]) {
		throw new errors.RuntimeError('DS.inject(resourceName, attrs): ' + resourceName + ' is not a registered resource!');
	} else if (!utils.isObject(attrs) && !utils.isArray(attrs)) {
		throw new errors.IllegalArgumentError('DS.inject(resourceName, attrs): attrs: Must be an object or an array!', { attrs: { actual: typeof attrs, expected: 'object|array' } });
	}

	var resource = store[resourceName],
		_this = this;

	var idAttribute = resource.idAttribute || 'id';
	if (!attrs[idAttribute]) {
		throw new errors.RuntimeError('DS.inject(resourceName, attrs): attrs: Must contain the property specified by `idAttribute` in the resource definition!');
	} else {
		try {
			if (!services.$rootScope.$$phase) {
				services.$rootScope.$apply(function () {
					_inject.apply(_this, [store[resourceName], attrs]);
				});
			} else {
				_inject.apply(_this, [store[resourceName], attrs]);
			}
		} catch (err) {
			throw new errors.UnhandledError(err);
		}
		return resource.index[attrs[idAttribute]];
	}
}

module.exports = inject;

},{"errors":"hIh4e1","observejs":"q+M0EE","services":"cX8q+p","store":"hT1bCX","utils":"uE/lJt"}],50:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store');

/**
 * @doc method
 * @id DS.sync_methods:lastModified
 * @name lastModified
 * @description
 * `lastModified(resourceName[, id])`
 *
 * Return the timestamp of the last time either the collection for `resourceName` or the item of type `resourceName`
 * with the given primary key was modified.
 *
 * Example:
 *
 * ```js
 * TODO: lastModified(resourceName, id) example
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number=} id The primary key of the item to remove.
 * @returns {number} The timestamp of the last time either the collection for `resourceName` or the item of type
 * `resourceName` with the given primary key was modified.
 */
function lastModified(resourceName, id) {
	if (!store[resourceName]) {
		throw new errors.RuntimeError('DS.lastModified(resourceName[, id]): ' + resourceName + ' is not a registered resource!');
	} else if (id && !utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError('DS.lastModified(resourceName[, id]): id: Must be a string or number!', { id: { actual: typeof id, expected: 'string|number' } });
	}
	try {
		if (id) {
			if (!(id in store[resourceName].modified)) {
				store[resourceName].modified[id] = 0;
			}
			return store[resourceName].modified[id];
		}
		return store[resourceName].collectionModified;
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = lastModified;

},{"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],51:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store');

/**
 * @doc method
 * @id DS.sync_methods:lastSaved
 * @name lastSaved
 * @description
 * `lastSaved(resourceName[, id])`
 *
 * Return the timestamp of the last time either the collection for `resourceName` or the item of type `resourceName`
 * with the given primary key was saved via an async adapter.
 *
 * Example:
 *
 * ```js
 * TODO: lastSaved(resourceName, id) example
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number=} id The primary key of the item to remove.
 * @returns {number} The timestamp of the last time either the collection for `resourceName` or the item of type
 * `resourceName` with the given primary key was modified.
 */
function lastSaved(resourceName, id) {
	if (!store[resourceName]) {
		throw new errors.RuntimeError('DS.lastSaved(resourceName[, id]): ' + resourceName + ' is not a registered resource!');
	} else if (id && !utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError('DS.lastSaved(resourceName[, id]): id: Must be a string or number!', { id: { actual: typeof id, expected: 'string|number' } });
	}
	try {
		if (id) {
			if (!(id in store[resourceName].saved)) {
				store[resourceName].saved[id] = 0;
			}
			return store[resourceName].saved[id];
		}
		return store[resourceName].collectionModified;
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = lastSaved;

},{"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],52:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	store = require('store');

/**
 * @doc method
 * @id DS.sync_methods:previous
 * @name previous
 * @description
 * `previous(resourceName, id)`
 *
 * Synchronously return the previous attributes of the item of the type specified by `resourceName` that has the primary key
 * specified by `id`. This object represents the state of the item the last time it was saved via an async adapter.
 *
 * Example:
 *
 * ```js
 * TODO: previous(resourceName, id) example
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}` - Argument `id` must be a string or a number.
 * - `{RuntimeError}` - Argument `resourceName` must refer to an already registered resource.
 * - `{UnhandledError}` - Thrown for any uncaught exception.
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item whose previous attributes are to be retrieved.
 * @returns {object} The previous attributes of the item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function previous(resourceName, id) {
	if (!store[resourceName]) {
		throw new errors.IllegalArgumentError('DS.previous(resourceName, id): ' + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError('DS.previous(resourceName, id): id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		// return resource from cache
		return angular.copy(store[resourceName].previous_attributes[id]);
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = previous;

},{"errors":"hIh4e1","store":"hT1bCX","utils":"uE/lJt"}],"errors":[function(require,module,exports){
module.exports=require('hIh4e1');
},{}],"hIh4e1":[function(require,module,exports){
/**
 * @doc function
 * @id errors.types:UnhandledError
 * @name UnhandledError
 * @description Error that is thrown/returned when Reheat encounters an uncaught/unknown exception.
 * @param {Error} error The originally thrown error.
 * @returns {UnhandledError} A new instance of `UnhandledError`.
 */
function UnhandledError(error) {
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);

	error = error || {};

	/**
	 * @doc property
	 * @id errors.types:UnhandledError.type
	 * @name type
	 * @propertyOf errors.types:UnhandledError
	 * @description Name of error type. Default: `"UnhandledError"`.
	 */
	this.type = this.constructor.name;

	/**
	 * @doc property
	 * @id errors.types:UnhandledError.originalError
	 * @name originalError
	 * @propertyOf errors.types:UnhandledError
	 * @description A reference to the original error that was thrown.
	 */
	this.originalError = error;

	/**
	 * @doc property
	 * @id errors.types:UnhandledError.message
	 * @name message
	 * @propertyOf errors.types:UnhandledError
	 * @description Message and stack trace. Same as `UnhandledError#stack`.
	 */
	this.message = 'UnhandledError: This is an uncaught exception. Please consider submitting an issue at https://github.com/jmdobry/angular-data/issues.\n\n' +
		'Original Uncaught Exception:\n' + (error.stack ? error.stack.toString() : error.stack);

	/**
	 * @doc property
	 * @id errors.types:UnhandledError.stack
	 * @name stack
	 * @propertyOf errors.types:UnhandledError
	 * @description Message and stack trace. Same as `UnhandledError#message`.
	 */
	this.stack = this.message;
}

UnhandledError.prototype = Object.create(Error.prototype);
UnhandledError.prototype.constructor = UnhandledError;

/**
 * @doc function
 * @id errors.types:IllegalArgumentError
 * @name IllegalArgumentError
 * @description Error that is thrown/returned when a caller does not honor the pre-conditions of a method/function.
 * @param {string=} message Error message. Default: `"Illegal Argument!"`.
 * @param {object=} errors Object containing information about the error.
 * @returns {IllegalArgumentError} A new instance of `IllegalArgumentError`.
 */
function IllegalArgumentError(message, errors) {
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);

	/**
	 * @doc property
	 * @id errors.types:IllegalArgumentError.type
	 * @name type
	 * @propertyOf errors.types:IllegalArgumentError
	 * @description Name of error type. Default: `"IllegalArgumentError"`.
	 */
	this.type = this.constructor.name;

	/**
	 * @doc property
	 * @id errors.types:IllegalArgumentError.errors
	 * @name errors
	 * @propertyOf errors.types:IllegalArgumentError
	 * @description Object containing information about the error.
	 */
	this.errors = errors || {};

	/**
	 * @doc property
	 * @id errors.types:IllegalArgumentError.message
	 * @name message
	 * @propertyOf errors.types:IllegalArgumentError
	 * @description Error message. Default: `"Illegal Argument!"`.
	 */
	this.message = message || 'Illegal Argument!';
}

IllegalArgumentError.prototype = Object.create(Error.prototype);
IllegalArgumentError.prototype.constructor = IllegalArgumentError;

/**
 * @doc function
 * @id errors.types:ValidationError
 * @name ValidationError
 * @description Error that is thrown/returned when validation of a schema fails.
 * @param {string=} message Error message. Default: `"Validation Error!"`.
 * @param {object=} errors Object containing information about the error.
 * @returns {ValidationError} A new instance of `ValidationError`.
 */
function ValidationError(message, errors) {
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);

	/**
	 * @doc property
	 * @id errors.types:ValidationError.type
	 * @name type
	 * @propertyOf errors.types:ValidationError
	 * @description Name of error type. Default: `"ValidationError"`.
	 */
	this.type = this.constructor.name;

	/**
	 * @doc property
	 * @id errors.types:ValidationError.errors
	 * @name errors
	 * @propertyOf errors.types:ValidationError
	 * @description Object containing information about the error.
	 */
	this.errors = errors || {};

	/**
	 * @doc property
	 * @id errors.types:ValidationError.message
	 * @name message
	 * @propertyOf errors.types:ValidationError
	 * @description Error message. Default: `"Validation Error!"`.
	 */
	this.message = message || 'Validation Error!';
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

/**
 * @doc interface
 * @id errors
 * @name angular-data error types
 * @description
 * `UnhandledError`, `IllegalArgumentError` and `ValidationError`.
 */
module.exports = {
	UnhandledError: UnhandledError,
	IllegalArgumentError: IllegalArgumentError,
	ValidationError: ValidationError,

	/**
	 * @doc function
	 * @id errors.types:RuntimeError
	 * @name RuntimeError
	 * @description Error that is thrown/returned for invalid state during runtime.
	 * @param {string=} message Error message. Default: `"Runtime Error!"`.
	 * @param {object=} errors Object containing information about the error.
	 * @returns {RuntimeError} A new instance of `RuntimeError`.
	 */
	RuntimeError: function RuntimeError(message, errors) {
		Error.call(this);
		Error.captureStackTrace(this, this.constructor);

		/**
		 * @doc property
		 * @id errors.types:RuntimeError.type
		 * @name type
		 * @propertyOf errors.types:RuntimeError
		 * @description Name of error type. Default: `"RuntimeError"`.
		 */
		this.type = this.constructor.name;

		/**
		 * @doc property
		 * @id errors.types:RuntimeError.errors
		 * @name errors
		 * @propertyOf errors.types:RuntimeError
		 * @description Object containing information about the error.
		 */
		this.errors = errors || {};

		/**
		 * @doc property
		 * @id errors.types:RuntimeError.message
		 * @name message
		 * @propertyOf errors.types:RuntimeError
		 * @description Error message. Default: `"Runtime Error!"`.
		 */
		this.message = message || 'RuntimeError Error!';
	}
};

},{}],55:[function(require,module,exports){
(function (window, angular, undefined) {
	'use strict';

//	angular.module('jmdobry.binary-heap', []);
//
//	/**
//	 * @doc interface
//	 * @id BinaryHeapProvider
//	 * @name BinaryHeapProvider
//	 */
//	function BinaryHeapProvider() {
//
//		var defaults = require('./binaryHeap/defaults');
//
//		/**
//		 * @doc method
//		 * @id BinaryHeapProvider.methods:setDefaultWeightFunction
//		 * @name setDefaultWeightFunction
//		 * @param {function} weightFunc New default weight function.
//		 */
//		function setDefaultWeightFunction(weightFunc) {
//			if (!angular.isFunction(weightFunc)) {
//				throw new Error('BinaryHeapProvider.setDefaultWeightFunction(weightFunc): weightFunc: Must be a function!');
//			}
//			defaults.userProvidedDefaultWeightFunc = weightFunc;
//		}
//
//		/**
//		 * @doc method
//		 * @id BinaryHeapProvider.methods:setDefaultWeightFunction
//		 * @name setDefaultWeightFunction
//		 * @methodOf BinaryHeapProvider
//		 * @param {function} weightFunc New default weight function.
//		 */
//		this.setDefaultWeightFunction = setDefaultWeightFunction;
//
//		this.$get = function () {
//			return require('./binaryHeap');
//		};
//	}
//	angular.module('jmdobry.binary-heap').provider('BinaryHeap', BinaryHeapProvider);

	angular.module('jmdobry.angular-data', ['ng'/*, 'jmdobry.binary-heap'*/]);
	angular.module('jmdobry.angular-data').provider('DS', require('./datastore'));

})(window, window.angular);

},{"./datastore":36}],"utils":[function(require,module,exports){
module.exports=require('uE/lJt');
},{}],"uE/lJt":[function(require,module,exports){
module.exports = {
	isString: angular.isString,
	isArray: angular.isArray,
	isObject: angular.isObject,
	isNumber: angular.isNumber,
	isEmpty: require('mout/lang/isEmpty'),
	toJson: angular.toJson,
	makePath: require('mout/string/makePath'),
	upperCase: require('mout/string/upperCase'),
	deepMixIn: require('mout/object/deepMixIn'),
	forOwn: require('mout/object/forOwn'),
	contains: require('mout/array/contains'),
	filter: require('mout/array/filter'),
	toLookup: require('mout/array/toLookup'),
	slice: require('mout/array/slice'),
	sort: require('mout/array/sort'),
	updateTimestamp: function (timestamp) {
		var newTimestamp = typeof Date.now === 'function' ? Date.now() : new Date().getTime();
		if (timestamp && newTimestamp <= timestamp) {
			return timestamp + 1;
		} else {
			return newTimestamp;
		}
	},
	mergeArrays: function (a, b, mergeKey) {
		mergeKey = mergeKey || 'id';
		for (var i = 0; i < a.length; i++) {
			for (var j = 0; j < b.length; j++) {
				if (a[i][mergeKey] == b[j][mergeKey]) {
					angular.extend(a[i], b[j]);
					b.splice(j, 1);
					break;
				}
			}
		}
		return a.concat(b);
	},
	deepFreeze: function deepFreeze(o) {
		if (typeof Object.freeze === 'function') {
			var prop, propKey;
			Object.freeze(o); // First freeze the object.
			for (propKey in o) {
				prop = o[propKey];
				if (!o.hasOwnProperty(propKey) || typeof prop !== 'object' || Object.isFrozen(prop)) {
					// If the object is on the prototype, not an object, or is already frozen,
					// skip it. Note that this might leave an unfrozen reference somewhere in the
					// object if there is an already frozen object containing an unfrozen object.
					continue;
				}

				deepFreeze(prop); // Recursively call deepFreeze.
			}
		}
	},
	diffObjectFromOldObject: function (object, oldObject) {
		var added = {};
		var removed = {};
		var changed = {};

		for (var prop in oldObject) {
			var newValue = object[prop];

			if (newValue !== undefined && newValue === oldObject[prop])
				continue;

			if (!(prop in object)) {
				removed[prop] = undefined;
				continue;
			}

			if (newValue !== oldObject[prop])
				changed[prop] = newValue;
		}

		for (var prop2 in object) {
			if (prop2 in oldObject)
				continue;

			added[prop2] = object[prop2];
		}

		return {
			added: added,
			removed: removed,
			changed: changed
		};
	}
};

},{"mout/array/contains":1,"mout/array/filter":2,"mout/array/slice":5,"mout/array/sort":6,"mout/array/toLookup":7,"mout/lang/isEmpty":12,"mout/object/deepMixIn":19,"mout/object/forOwn":21,"mout/string/makePath":23,"mout/string/upperCase":24}]},{},[55])
