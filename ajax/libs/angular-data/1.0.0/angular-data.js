/**
* @author Jason Dobry <jason.dobry@gmail.com>
* @file angular-data.js
* @version 1.0.0 - Homepage <http://angular-data.pseudobry.com/>
* @copyright (c) 2014 Jason Dobry <https://github.com/jmdobry/>
* @license MIT <https://github.com/jmdobry/angular-data/blob/master/LICENSE>
*
* @overview Data store for Angular.js.
*/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright 2012 Google Inc.
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

// Modifications
// Copyright 2014 Jason Dobry
//
// Summary of modifications:
// Removed all code related to:
// - ArrayObserver
// - ArraySplice
// - PathObserver
// - CompoundObserver
// - Path
// - ObserverTransform
(function(global) {
  'use strict';

  // Detect and do basic sanity checking on Object/Array.observe.
  function detectObjectObserve() {
    if (typeof Object.observe !== 'function' ||
        typeof Array.observe !== 'function') {
      return false;
    }

    var records = [];

    function callback(recs) {
      records = recs;
    }

    var test = {};
    var arr = [];
    Object.observe(test, callback);
    Array.observe(arr, callback);
    test.id = 1;
    test.id = 2;
    delete test.id;
    arr.push(1, 2);
    arr.length = 0;

    Object.deliverChangeRecords(callback);
    if (records.length !== 5)
      return false;

    if (records[0].type != 'add' ||
        records[1].type != 'update' ||
        records[2].type != 'delete' ||
        records[3].type != 'splice' ||
        records[4].type != 'splice') {
      return false;
    }

    Object.unobserve(test, callback);
    Array.unobserve(arr, callback);

    return true;
  }

  var hasObserve = detectObjectObserve();

  function detectEval() {
    // Don't test for eval if we're running in a Chrome App environment.
    // We check for APIs set that only exist in a Chrome App context.
    if (typeof chrome !== 'undefined' && chrome.app && chrome.app.runtime) {
      return false;
    }

    try {
      var f = new Function('', 'return true;');
      return f();
    } catch (ex) {
      return false;
    }
  }

  var hasEval = detectEval();

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

  var MAX_DIRTY_CHECK_CYCLES = 1000;

  function dirtyCheck(observer) {
    var cycles = 0;
    while (cycles < MAX_DIRTY_CHECK_CYCLES && observer.check_()) {
      cycles++;
    }
    if (global.testingExposeCycleCount)
      global.dirtyCheckCycleCount = cycles;

    return cycles > 0;
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

  var eomTasks = [];
  function runEOMTasks() {
    if (!eomTasks.length)
      return false;

    for (var i = 0; i < eomTasks.length; i++) {
      eomTasks[i]();
    }
    eomTasks.length = 0;
    return true;
  }

  var runEOM = hasObserve ? (function(){
    var eomObj = { pingPong: true };
    var eomRunScheduled = false;

    Object.observe(eomObj, function() {
      runEOMTasks();
      eomRunScheduled = false;
    });

    return function(fn) {
      eomTasks.push(fn);
      if (!eomRunScheduled) {
        eomRunScheduled = true;
        eomObj.pingPong = !eomObj.pingPong;
      }
    };
  })() :
  (function() {
    return function(fn) {
      eomTasks.push(fn);
    };
  })();

  var observedObjectCache = [];

  function newObservedObject() {
    var observer;
    var object;
    var discardRecords = false;
    var first = true;

    function callback(records) {
      if (observer && observer.state_ === OPENED && !discardRecords)
        observer.check_(records);
    }

    return {
      open: function(obs) {
        if (observer)
          throw Error('ObservedObject in use');

        if (!first)
          Object.deliverChangeRecords(callback);

        observer = obs;
        first = false;
      },
      observe: function(obj, arrayObserve) {
        object = obj;
        if (arrayObserve)
          Array.observe(object, callback);
        else
          Object.observe(object, callback);
      },
      deliver: function(discard) {
        discardRecords = discard;
        Object.deliverChangeRecords(callback);
        discardRecords = false;
      },
      close: function() {
        observer = undefined;
        Object.unobserve(object, callback);
        observedObjectCache.push(this);
      }
    };
  }

  /*
   * The observedSet abstraction is a perf optimization which reduces the total
   * number of Object.observe observations of a set of objects. The idea is that
   * groups of Observers will have some object dependencies in common and this
   * observed set ensures that each object in the transitive closure of
   * dependencies is only observed once. The observedSet acts as a write barrier
   * such that whenever any change comes through, all Observers are checked for
   * changed values.
   *
   * Note that this optimization is explicitly moving work from setup-time to
   * change-time.
   *
   * TODO(rafaelw): Implement "garbage collection". In order to move work off
   * the critical path, when Observers are closed, their observed objects are
   * not Object.unobserve(d). As a result, it's possible that if the observedSet
   * is kept open, but some Observers have been closed, it could cause "leaks"
   * (prevent otherwise collectable objects from being collected). At some
   * point, we should implement incremental "gc" which keeps a list of
   * observedSets which may need clean-up and does small amounts of cleanup on a
   * timeout until all is clean.
   */

  function getObservedObject(observer, object, arrayObserve) {
    var dir = observedObjectCache.pop() || newObservedObject();
    dir.open(observer);
    dir.observe(object, arrayObserve);
    return dir;
  }

  var UNOPENED = 0;
  var OPENED = 1;
  var CLOSED = 2;

  var nextObserverId = 1;

  function Observer() {
    this.state_ = UNOPENED;
    this.callback_ = undefined;
    this.target_ = undefined; // TODO(rafaelw): Should be WeakRef
    this.directObserver_ = undefined;
    this.value_ = undefined;
    this.id_ = nextObserverId++;
  }

  Observer.prototype = {
    open: function(callback, target) {
      if (this.state_ != UNOPENED)
        throw Error('Observer has already been opened.');

      addToAll(this);
      this.callback_ = callback;
      this.target_ = target;
      this.connect_();
      this.state_ = OPENED;
      return this.value_;
    },

    close: function() {
      if (this.state_ != OPENED)
        return;

      removeFromAll(this);
      this.disconnect_();
      this.value_ = undefined;
      this.callback_ = undefined;
      this.target_ = undefined;
      this.state_ = CLOSED;
    },

    deliver: function() {
      if (this.state_ != OPENED)
        return;

      dirtyCheck(this);
    },

    report_: function(changes) {
      try {
        this.callback_.apply(this.target_, changes);
      } catch (ex) {
        Observer._errorThrownDuringCallback = true;
        console.error('Exception caught during observer callback: ' +
                       (ex.stack || ex));
      }
    },

    discardChanges: function() {
      this.check_(undefined, true);
      return this.value_;
    }
  }

  var collectObservers = !hasObserve;
  var allObservers;
  Observer._allObserversCount = 0;

  if (collectObservers) {
    allObservers = [];
  }

  function addToAll(observer) {
    Observer._allObserversCount++;
    if (!collectObservers)
      return;

    allObservers.push(observer);
  }

  function removeFromAll(observer) {
    Observer._allObserversCount--;
  }

  var runningMicrotaskCheckpoint = false;

  var hasDebugForceFullDelivery = hasObserve && hasEval && (function() {
    try {
      eval('%RunMicrotasks()');
      return true;
    } catch (ex) {
      return false;
    }
  })();

  global.Platform = global.Platform || {};

  global.Platform.performMicrotaskCheckpoint = function() {
    if (runningMicrotaskCheckpoint)
      return;

    if (hasDebugForceFullDelivery) {
      eval('%RunMicrotasks()');
      return;
    }

    if (!collectObservers)
      return;

    runningMicrotaskCheckpoint = true;

    var cycles = 0;
    var anyChanged, toCheck;

    do {
      cycles++;
      toCheck = allObservers;
      allObservers = [];
      anyChanged = false;

      for (var i = 0; i < toCheck.length; i++) {
        var observer = toCheck[i];
        if (observer.state_ != OPENED)
          continue;

        if (observer.check_())
          anyChanged = true;

        allObservers.push(observer);
      }
      if (runEOMTasks())
        anyChanged = true;
    } while (cycles < MAX_DIRTY_CHECK_CYCLES && anyChanged);

    if (global.testingExposeCycleCount)
      global.dirtyCheckCycleCount = cycles;

    runningMicrotaskCheckpoint = false;
  };

  if (collectObservers) {
    global.Platform.clearObservers = function() {
      allObservers = [];
    };
  }

  function ObjectObserver(object) {
    Observer.call(this);
    this.value_ = object;
    this.oldObject_ = undefined;
  }

  ObjectObserver.prototype = createObject({
    __proto__: Observer.prototype,

    arrayObserve: false,

    connect_: function(callback, target) {
      if (hasObserve) {
        this.directObserver_ = getObservedObject(this, this.value_,
                                                 this.arrayObserve);
      } else {
        this.oldObject_ = this.copyObject(this.value_);
      }

    },

    copyObject: function(object) {
      var copy = Array.isArray(object) ? [] : {};
      for (var prop in object) {
        copy[prop] = object[prop];
      };
      if (Array.isArray(object))
        copy.length = object.length;
      return copy;
    },

    check_: function(changeRecords, skipChanges) {
      var diff;
      var oldValues;
      if (hasObserve) {
        if (!changeRecords)
          return false;

        oldValues = {};
        diff = diffObjectFromChangeRecords(this.value_, changeRecords,
                                           oldValues);
      } else {
        oldValues = this.oldObject_;
        diff = diffObjectFromOldObject(this.value_, this.oldObject_);
      }

      if (diffIsEmpty(diff))
        return false;

      if (!hasObserve)
        this.oldObject_ = this.copyObject(this.value_);

      this.report_([
        diff.added || {},
        diff.removed || {},
        diff.changed || {},
        function(property) {
          return oldValues[property];
        }
      ]);

      return true;
    },

    disconnect_: function() {
      if (hasObserve) {
        this.directObserver_.close();
        this.directObserver_ = undefined;
      } else {
        this.oldObject_ = undefined;
      }
    },

    deliver: function() {
      if (this.state_ != OPENED)
        return;

      if (hasObserve)
        this.directObserver_.deliver(false);
      else
        dirtyCheck(this);
    },

    discardChanges: function() {
      if (this.directObserver_)
        this.directObserver_.deliver(true);
      else
        this.oldObject_ = this.copyObject(this.value_);

      return this.value_;
    }
  });

  var observerSentinel = {};

  var expectedRecordTypes = {
    add: true,
    update: true,
    delete: true
  };

  function diffObjectFromChangeRecords(object, changeRecords, oldValues) {
    var added = {};
    var removed = {};

    for (var i = 0; i < changeRecords.length; i++) {
      var record = changeRecords[i];
      if (!expectedRecordTypes[record.type]) {
        console.error('Unknown changeRecord type: ' + record.type);
        console.error(record);
        continue;
      }

      if (!(record.name in oldValues))
        oldValues[record.name] = record.oldValue;

      if (record.type == 'update')
        continue;

      if (record.type == 'add') {
        if (record.name in removed)
          delete removed[record.name];
        else
          added[record.name] = true;

        continue;
      }

      // type = 'delete'
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

  global.Observer = Observer;
  global.Observer.runEOM_ = runEOM;
  global.Observer.observerSentinel_ = observerSentinel; // for testing.
  global.Observer.hasObjectObserve = hasObserve;

  global.ObjectObserver = ObjectObserver;
})((exports.Number = { isNaN: window.isNaN }) ? exports : exports);

},{}],2:[function(require,module,exports){
var indexOf = require('./indexOf');

    /**
     * If array contains values.
     */
    function contains(arr, val) {
        return indexOf(arr, val) !== -1;
    }
    module.exports = contains;


},{"./indexOf":5}],3:[function(require,module,exports){
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



},{"../function/makeIterator_":12}],4:[function(require,module,exports){


    /**
     * Array forEach
     */
    function forEach(arr, callback, thisObj) {
        if (arr == null) {
            return;
        }
        var i = -1,
            len = arr.length;
        while (++i < len) {
            // we iterate over sparse items since there is no way to make it
            // work properly on IE 7-8. see #64
            if ( callback.call(thisObj, arr[i], i, arr) === false ) {
                break;
            }
        }
    }

    module.exports = forEach;



},{}],5:[function(require,module,exports){


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


},{}],6:[function(require,module,exports){
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


},{"./filter":3}],7:[function(require,module,exports){
var indexOf = require('./indexOf');

    /**
     * Remove a single item from the array.
     * (it won't remove duplicates, just a single item)
     */
    function remove(arr, item){
        var idx = indexOf(arr, item);
        if (idx !== -1) arr.splice(idx, 1);
    }

    module.exports = remove;


},{"./indexOf":5}],8:[function(require,module,exports){


    /**
     * Create slice of source array or array-like object
     */
    function slice(arr, start, end){
        var len = arr.length;

        if (start == null) {
            start = 0;
        } else if (start < 0) {
            start = Math.max(len + start, 0);
        } else {
            start = Math.min(start, len);
        }

        if (end == null) {
            end = len;
        } else if (end < 0) {
            end = Math.max(len + end, 0);
        } else {
            end = Math.min(end, len);
        }

        var result = [];
        while (start < end) {
            result.push(arr[start++]);
        }

        return result;
    }

    module.exports = slice;



},{}],9:[function(require,module,exports){


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



},{}],10:[function(require,module,exports){
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


},{"../lang/isFunction":19}],11:[function(require,module,exports){


    /**
     * Returns the first argument provided to it.
     */
    function identity(val){
        return val;
    }

    module.exports = identity;



},{}],12:[function(require,module,exports){
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



},{"../object/deepMatches":27,"./identity":11,"./prop":13}],13:[function(require,module,exports){


    /**
     * Returns a function that gets a property of the passed object
     */
    function prop(name){
        return function(obj){
            return obj[name];
        };
    }

    module.exports = prop;



},{}],14:[function(require,module,exports){
var kindOf = require('./kindOf');
var isPlainObject = require('./isPlainObject');
var mixIn = require('../object/mixIn');

    /**
     * Clone native types.
     */
    function clone(val){
        switch (kindOf(val)) {
            case 'Object':
                return cloneObject(val);
            case 'Array':
                return cloneArray(val);
            case 'RegExp':
                return cloneRegExp(val);
            case 'Date':
                return cloneDate(val);
            default:
                return val;
        }
    }

    function cloneObject(source) {
        if (isPlainObject(source)) {
            return mixIn({}, source);
        } else {
            return source;
        }
    }

    function cloneRegExp(r) {
        var flags = '';
        flags += r.multiline ? 'm' : '';
        flags += r.global ? 'g' : '';
        flags += r.ignorecase ? 'i' : '';
        return new RegExp(r.source, flags);
    }

    function cloneDate(date) {
        return new Date(+date);
    }

    function cloneArray(arr) {
        return arr.slice();
    }

    module.exports = clone;



},{"../object/mixIn":34,"./isPlainObject":22,"./kindOf":23}],15:[function(require,module,exports){
var clone = require('./clone');
var forOwn = require('../object/forOwn');
var kindOf = require('./kindOf');
var isPlainObject = require('./isPlainObject');

    /**
     * Recursively clone native types.
     */
    function deepClone(val, instanceClone) {
        switch ( kindOf(val) ) {
            case 'Object':
                return cloneObject(val, instanceClone);
            case 'Array':
                return cloneArray(val, instanceClone);
            default:
                return clone(val);
        }
    }

    function cloneObject(source, instanceClone) {
        if (isPlainObject(source)) {
            var out = {};
            forOwn(source, function(val, key) {
                this[key] = deepClone(val, instanceClone);
            }, out);
            return out;
        } else if (instanceClone) {
            return instanceClone(source);
        } else {
            return source;
        }
    }

    function cloneArray(arr, instanceClone) {
        var out = [],
            i = -1,
            n = arr.length,
            val;
        while (++i < n) {
            out[i] = deepClone(arr[i], instanceClone);
        }
        return out;
    }

    module.exports = deepClone;




},{"../object/forOwn":30,"./clone":14,"./isPlainObject":22,"./kindOf":23}],16:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    var isArray = Array.isArray || function (val) {
        return isKind(val, 'Array');
    };
    module.exports = isArray;


},{"./isKind":20}],17:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isBoolean(val) {
        return isKind(val, 'Boolean');
    }
    module.exports = isBoolean;


},{"./isKind":20}],18:[function(require,module,exports){
var forOwn = require('../object/forOwn');
var isArray = require('./isArray');

    function isEmpty(val){
        if (val == null) {
            // typeof null == 'object' so we check it first
            return true;
        } else if ( typeof val === 'string' || isArray(val) ) {
            return !val.length;
        } else if ( typeof val === 'object' ) {
            var result = true;
            forOwn(val, function(){
                result = false;
                return false; // break loop
            });
            return result;
        } else {
            return true;
        }
    }

    module.exports = isEmpty;



},{"../object/forOwn":30,"./isArray":16}],19:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isFunction(val) {
        return isKind(val, 'Function');
    }
    module.exports = isFunction;


},{"./isKind":20}],20:[function(require,module,exports){
var kindOf = require('./kindOf');
    /**
     * Check if value is from a specific "kind".
     */
    function isKind(val, kind){
        return kindOf(val) === kind;
    }
    module.exports = isKind;


},{"./kindOf":23}],21:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isObject(val) {
        return isKind(val, 'Object');
    }
    module.exports = isObject;


},{"./isKind":20}],22:[function(require,module,exports){


    /**
     * Checks if the value is created by the `Object` constructor.
     */
    function isPlainObject(value) {
        return (!!value && typeof value === 'object' &&
            value.constructor === Object);
    }

    module.exports = isPlainObject;



},{}],23:[function(require,module,exports){


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


},{}],24:[function(require,module,exports){


    /**
     * Typecast a value to a String, using an empty string value for null or
     * undefined.
     */
    function toString(val){
        return val == null ? '' : val.toString();
    }

    module.exports = toString;



},{}],25:[function(require,module,exports){
/**
 * @constant Maximum 32-bit signed integer value. (2^31 - 1)
 */

    module.exports = 2147483647;


},{}],26:[function(require,module,exports){
/**
 * @constant Minimum 32-bit signed integer value (-2^31).
 */

    module.exports = -2147483648;


},{}],27:[function(require,module,exports){
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



},{"../lang/isArray":16,"./forOwn":30}],28:[function(require,module,exports){
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



},{"../lang/isPlainObject":22,"./forOwn":30}],29:[function(require,module,exports){
var hasOwn = require('./hasOwn');

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
            var ctor = obj.constructor,
                isProto = !!ctor && obj === ctor.prototype;

            while (key = _dontEnums[i++]) {
                // For constructor, if it is a prototype object the constructor
                // is always non-enumerable unless defined otherwise (and
                // enumerated above).  For non-prototype objects, it will have
                // to be defined on this object, since it cannot be defined on
                // any prototype objects.
                //
                // For other [[DontEnum]] properties, check if the value is
                // different than Object prototype value.
                if (
                    (key !== 'constructor' ||
                        (!isProto && hasOwn(obj, key))) &&
                    obj[key] !== Object.prototype[key]
                ) {
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



},{"./hasOwn":31}],30:[function(require,module,exports){
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



},{"./forIn":29,"./hasOwn":31}],31:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}],32:[function(require,module,exports){
var forOwn = require('./forOwn');

    /**
     * Get object keys
     */
     var keys = Object.keys || function (obj) {
            var keys = [];
            forOwn(obj, function(val, key){
                keys.push(key);
            });
            return keys;
        };

    module.exports = keys;



},{"./forOwn":30}],33:[function(require,module,exports){
var hasOwn = require('./hasOwn');
var deepClone = require('../lang/deepClone');
var isObject = require('../lang/isObject');

    /**
     * Deep merge objects.
     */
    function merge() {
        var i = 1,
            key, val, obj, target;

        // make sure we don't modify source element and it's properties
        // objects are passed by reference
        target = deepClone( arguments[0] );

        while (obj = arguments[i++]) {
            for (key in obj) {
                if ( ! hasOwn(obj, key) ) {
                    continue;
                }

                val = obj[key];

                if ( isObject(val) && isObject(target[key]) ){
                    // inception, deep merge objects
                    target[key] = merge(target[key], val);
                } else {
                    // make sure arrays, regexp, date, objects are cloned
                    target[key] = deepClone(val);
                }

            }
        }

        return target;
    }

    module.exports = merge;



},{"../lang/deepClone":15,"../lang/isObject":21,"./hasOwn":31}],34:[function(require,module,exports){
var forOwn = require('./forOwn');

    /**
    * Combine properties from all the objects into first one.
    * - This method affects target object in place, if you want to create a new Object pass an empty object as first param.
    * @param {object} target    Target Object
    * @param {...object} objects    Objects to be combined (0...n objects).
    * @return {object} Target Object.
    */
    function mixIn(target, objects){
        var i = 0,
            n = arguments.length,
            obj;
        while(++i < n){
            obj = arguments[i];
            if (obj != null) {
                forOwn(obj, copyProp, target);
            }
        }
        return target;
    }

    function copyProp(val, key){
        this[key] = val;
    }

    module.exports = mixIn;


},{"./forOwn":30}],35:[function(require,module,exports){
var forEach = require('../array/forEach');

    /**
     * Create nested object if non-existent
     */
    function namespace(obj, path){
        if (!path) return obj;
        forEach(path.split('.'), function(key){
            if (!obj[key]) {
                obj[key] = {};
            }
            obj = obj[key];
        });
        return obj;
    }

    module.exports = namespace;



},{"../array/forEach":4}],36:[function(require,module,exports){
var slice = require('../array/slice');

    /**
     * Return a copy of the object, filtered to only have values for the whitelisted keys.
     */
    function pick(obj, var_keys){
        var keys = typeof arguments[1] !== 'string'? arguments[1] : slice(arguments, 1),
            out = {},
            i = 0, key;
        while (key = keys[i++]) {
            out[key] = obj[key];
        }
        return out;
    }

    module.exports = pick;



},{"../array/slice":8}],37:[function(require,module,exports){
var namespace = require('./namespace');

    /**
     * set "nested" object property
     */
    function set(obj, prop, val){
        var parts = (/^(.+)\.(.+)$/).exec(prop);
        if (parts){
            namespace(obj, parts[1])[parts[2]] = val;
        } else {
            obj[prop] = val;
        }
    }

    module.exports = set;



},{"./namespace":35}],38:[function(require,module,exports){
var randInt = require('./randInt');
var isArray = require('../lang/isArray');

    /**
     * Returns a random element from the supplied arguments
     * or from the array (if single argument is an array).
     */
    function choice(items) {
        var target = (arguments.length === 1 && isArray(items))? items : arguments;
        return target[ randInt(0, target.length - 1) ];
    }

    module.exports = choice;



},{"../lang/isArray":16,"./randInt":42}],39:[function(require,module,exports){
var randHex = require('./randHex');
var choice = require('./choice');

  /**
   * Returns pseudo-random guid (UUID v4)
   * IMPORTANT: it's not totally "safe" since randHex/choice uses Math.random
   * by default and sequences can be predicted in some cases. See the
   * "random/random" documentation for more info about it and how to replace
   * the default PRNG.
   */
  function guid() {
    return (
        randHex(8)+'-'+
        randHex(4)+'-'+
        // v4 UUID always contain "4" at this position to specify it was
        // randomly generated
        '4' + randHex(3) +'-'+
        // v4 UUID always contain chars [a,b,8,9] at this position
        choice(8, 9, 'a', 'b') + randHex(3)+'-'+
        randHex(12)
    );
  }
  module.exports = guid;


},{"./choice":38,"./randHex":41}],40:[function(require,module,exports){
var random = require('./random');
var MIN_INT = require('../number/MIN_INT');
var MAX_INT = require('../number/MAX_INT');

    /**
     * Returns random number inside range
     */
    function rand(min, max){
        min = min == null? MIN_INT : min;
        max = max == null? MAX_INT : max;
        return min + (max - min) * random();
    }

    module.exports = rand;


},{"../number/MAX_INT":25,"../number/MIN_INT":26,"./random":43}],41:[function(require,module,exports){
var choice = require('./choice');

    var _chars = '0123456789abcdef'.split('');

    /**
     * Returns a random hexadecimal string
     */
    function randHex(size){
        size = size && size > 0? size : 6;
        var str = '';
        while (size--) {
            str += choice(_chars);
        }
        return str;
    }

    module.exports = randHex;



},{"./choice":38}],42:[function(require,module,exports){
var MIN_INT = require('../number/MIN_INT');
var MAX_INT = require('../number/MAX_INT');
var rand = require('./rand');

    /**
     * Gets random integer inside range or snap to min/max values.
     */
    function randInt(min, max){
        min = min == null? MIN_INT : ~~min;
        max = max == null? MAX_INT : ~~max;
        // can't be max + 0.5 otherwise it will round up if `rand`
        // returns `max` causing it to overflow range.
        // -0.5 and + 0.49 are required to avoid bias caused by rounding
        return Math.round( rand(min - 0.5, max + 0.499999999999) );
    }

    module.exports = randInt;


},{"../number/MAX_INT":25,"../number/MIN_INT":26,"./rand":40}],43:[function(require,module,exports){


    /**
     * Just a wrapper to Math.random. No methods inside mout/random should call
     * Math.random() directly so we can inject the pseudo-random number
     * generator if needed (ie. in case we need a seeded random or a better
     * algorithm than the native one)
     */
    function random(){
        return random.get();
    }

    // we expose the method so it can be swapped if needed
    random.get = Math.random;

    module.exports = random;



},{}],44:[function(require,module,exports){
var toString = require('../lang/toString');
var replaceAccents = require('./replaceAccents');
var removeNonWord = require('./removeNonWord');
var upperCase = require('./upperCase');
var lowerCase = require('./lowerCase');
    /**
    * Convert string to camelCase text.
    */
    function camelCase(str){
        str = toString(str);
        str = replaceAccents(str);
        str = removeNonWord(str)
            .replace(/[\-_]/g, ' ') //convert all hyphens and underscores to spaces
            .replace(/\s[a-z]/g, upperCase) //convert first char of each word to UPPERCASE
            .replace(/\s+/g, '') //remove spaces
            .replace(/^[A-Z]/g, lowerCase); //convert first char to lowercase
        return str;
    }
    module.exports = camelCase;


},{"../lang/toString":24,"./lowerCase":45,"./removeNonWord":48,"./replaceAccents":49,"./upperCase":50}],45:[function(require,module,exports){
var toString = require('../lang/toString');
    /**
     * "Safer" String.toLowerCase()
     */
    function lowerCase(str){
        str = toString(str);
        return str.toLowerCase();
    }

    module.exports = lowerCase;


},{"../lang/toString":24}],46:[function(require,module,exports){
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


},{"../array/join":6,"../array/slice":8}],47:[function(require,module,exports){
var toString = require('../lang/toString');
var camelCase = require('./camelCase');
var upperCase = require('./upperCase');
    /**
     * camelCase + UPPERCASE first char
     */
    function pascalCase(str){
        str = toString(str);
        return camelCase(str).replace(/^[a-z]/, upperCase);
    }

    module.exports = pascalCase;


},{"../lang/toString":24,"./camelCase":44,"./upperCase":50}],48:[function(require,module,exports){
var toString = require('../lang/toString');
    // This pattern is generated by the _build/pattern-removeNonWord.js script
    var PATTERN = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;

    /**
     * Remove non-word chars.
     */
    function removeNonWord(str){
        str = toString(str);
        return str.replace(PATTERN, '');
    }

    module.exports = removeNonWord;


},{"../lang/toString":24}],49:[function(require,module,exports){
var toString = require('../lang/toString');
    /**
    * Replaces all accented chars with regular ones
    */
    function replaceAccents(str){
        str = toString(str);

        // verifies if the String has accents and replace them
        if (str.search(/[\xC0-\xFF]/g) > -1) {
            str = str
                    .replace(/[\xC0-\xC5]/g, "A")
                    .replace(/[\xC6]/g, "AE")
                    .replace(/[\xC7]/g, "C")
                    .replace(/[\xC8-\xCB]/g, "E")
                    .replace(/[\xCC-\xCF]/g, "I")
                    .replace(/[\xD0]/g, "D")
                    .replace(/[\xD1]/g, "N")
                    .replace(/[\xD2-\xD6\xD8]/g, "O")
                    .replace(/[\xD9-\xDC]/g, "U")
                    .replace(/[\xDD]/g, "Y")
                    .replace(/[\xDE]/g, "P")
                    .replace(/[\xE0-\xE5]/g, "a")
                    .replace(/[\xE6]/g, "ae")
                    .replace(/[\xE7]/g, "c")
                    .replace(/[\xE8-\xEB]/g, "e")
                    .replace(/[\xEC-\xEF]/g, "i")
                    .replace(/[\xF1]/g, "n")
                    .replace(/[\xF2-\xF6\xF8]/g, "o")
                    .replace(/[\xF9-\xFC]/g, "u")
                    .replace(/[\xFE]/g, "p")
                    .replace(/[\xFD\xFF]/g, "y");
        }
        return str;
    }
    module.exports = replaceAccents;


},{"../lang/toString":24}],50:[function(require,module,exports){
var toString = require('../lang/toString');
    /**
     * "Safer" String.toUpperCase()
     */
    function upperCase(str){
        str = toString(str);
        return str.toUpperCase();
    }
    module.exports = upperCase;


},{"../lang/toString":24}],51:[function(require,module,exports){
/**
 * @doc function
 * @id DSHttpAdapterProvider
 * @name DSHttpAdapterProvider
 */
function DSHttpAdapterProvider() {

  /**
   * @doc property
   * @id DSHttpAdapterProvider.properties:defaults
   * @name defaults
   * @description
   * Default configuration for this adapter.
   *
   * Properties:
   *
   * - `{function}` - `queryTransform` - See [the guide](/documentation/guide/adapters/index). Default: No-op.
   */
  var defaults = this.defaults = {
    /**
     * @doc property
     * @id DSHttpAdapterProvider.properties:defaults.queryTransform
     * @name defaults.queryTransform
     * @description
     * Transform the angular-data query to something your server understands. You might just do this on the server instead.
     *
     * ## Example:
     * ```js
     * DSHttpAdapterProvider.defaults.queryTransform = function (resourceName, params) {
     *   if (params && params.userId) {
     *     params.user_id = params.userId;
     *     delete params.userId;
     *   }
     *   return params;
     * };
     * ```
     *
     * @param {string} resourceName The name of the resource.
     * @param {object} params Params that will be passed to `$http`.
     * @returns {*} By default just returns `params` as-is.
     */
    queryTransform: function (resourceName, params) {
      return params;
    },

    forceTrailingSlash: false,

    /**
     * @doc property
     * @id DSHttpAdapterProvider.properties:defaults.$httpConfig
     * @name defaults.$httpConfig
     * @description
     * Default `$http` configuration options used whenever `DSHttpAdapter` uses `$http`.
     *
     * ## Example:
     * ```js
     * angular.module('myApp').config(function (DSHttpAdapterProvider) {
     *   angular.extend(DSHttpAdapterProvider.defaults.$httpConfig, {
     *     headers: {
     *       Authorization: 'Basic YmVlcDpib29w'
     *     },
     *     timeout: 20000
     *   });
     * });
     * ```
     */
    $httpConfig: {}
  };

  this.$get = ['$http', '$log', 'DSUtils', function ($http, $log, DSUtils) {

    /**
     * @doc interface
     * @id DSHttpAdapter
     * @name DSHttpAdapter
     * @description
     * Default adapter used by angular-data. This adapter uses AJAX and JSON to send/retrieve data to/from a server.
     * Developers may provide custom adapters that implement the adapter interface.
     */
    return {
      /**
       * @doc property
       * @id DSHttpAdapter.properties:defaults
       * @name defaults
       * @description
       * Reference to [DSHttpAdapterProvider.defaults](/documentation/api/api/DSHttpAdapterProvider.properties:defaults).
       */
      defaults: defaults,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:HTTP
       * @name HTTP
       * @description
       * A wrapper for `$http()`.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.HTTP(config)
       * ```
       *
       * @param {object} config Configuration object.
       * @returns {Promise} Promise.
       */
      HTTP: function (config) {
        var start = new Date().getTime();

        if (this.defaults.forceTrailingSlash && config.url[config.url.length] !== '/') {
          config.url += '/';
        }
        config = DSUtils.deepMixIn(config, defaults.$httpConfig);
        return $http(config).then(function (data) {
          $log.debug(data.config.method + ' request:' + data.config.url + ' Time taken: ' + (new Date().getTime() - start) + 'ms', arguments);
          return data;
        });
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:GET
       * @name GET
       * @description
       * A wrapper for `$http.get()`.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.GET(url[, config])
       * ```
       *
       * @param {string} url The url of the request.
       * @param {object=} config Optional configuration.
       * @returns {Promise} Promise.
       */
      GET: function (url, config) {
        config = config || {};
        if (!('method' in config)) {
          config.method = 'GET';
        }
        return this.HTTP(DSUtils.deepMixIn(config, {
          url: url
        }));
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:POST
       * @name POST
       * @description
       * A wrapper for `$http.post()`.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.POST(url[, attrs][, config])
       * ```
       *
       * @param {string} url The url of the request.
       * @param {object=} attrs Request payload.
       * @param {object=} config Optional configuration.
       * @returns {Promise} Promise.
       */
      POST: function (url, attrs, config) {
        config = config || {};
        if (!('method' in config)) {
          config.method = 'POST';
        }
        return this.HTTP(DSUtils.deepMixIn(config, {
          url: url,
          data: attrs
        }));
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:PUT
       * @name PUT
       * @description
       * A wrapper for `$http.put()`.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.PUT(url[, attrs][, config])
       * ```
       *
       * @param {string} url The url of the request.
       * @param {object=} attrs Request payload.
       * @param {object=} config Optional configuration.
       * @returns {Promise} Promise.
       */
      PUT: function (url, attrs, config) {
        config = config || {};
        if (!('method' in config)) {
          config.method = 'PUT';
        }
        return this.HTTP(DSUtils.deepMixIn(config, {
          url: url,
          data: attrs || {}
        }));
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:DEL
       * @name DEL
       * @description
       * A wrapper for `$http.delete()`.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.DEL(url[, config])
       * ```
       *
       * @param {string} url The url of the request.
       * @param {object=} config Optional configuration.
       * @returns {Promise} Promise.
       */
      DEL: function (url, config) {
        config = config || {};
        if (!('method' in config)) {
          config.method = 'DELETE';
        }
        return this.HTTP(DSUtils.deepMixIn(config, {
          url: url
        }));
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:find
       * @name find
       * @description
       * Retrieve a single entity from the server.
       *
       * Makes a `GET` request.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.find(resourceConfig, id[, options])
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {string|number} id Primary key of the entity to update.
       * @param {object=} options Optional configuration. Also passed along to `$http([config])`. Properties:
       *
       * - `{string=}` - `baseUrl` - Override the default base url.
       * - `{string=}` - `endpoint` - Override the default endpoint.
       * - `{object=}` - `params` - Additional query string parameters to add to the url.
       *
       * @returns {Promise} Promise.
       */
      find: function (resourceConfig, id, options) {
        options = options || {};
        return this.GET(
          DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id),
          options
        );
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:findAll
       * @name findAll
       * @description
       * Retrieve a collection of entities from the server.
       *
       * Makes a `GET` request.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.findAll(resourceConfig[, params][, options])
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {object=} params Search query parameters. See the [query guide](/documentation/guide/queries/index).
       * @param {object=} options Optional configuration. Also passed along to `$http([config])`. Properties:
       *
       * - `{string=}` - `baseUrl` - Override the default base url.
       * - `{string=}` - `endpoint` - Override the default endpoint.
       * - `{object=}` - `params` - Additional query string parameters to add to the url.
       *
       * @returns {Promise} Promise.
       */
      findAll: function (resourceConfig, params, options) {
        options = options || {};
        options.params = options.params || {};
        if (params) {
          params = defaults.queryTransform(resourceConfig.name, params);
          DSUtils.deepMixIn(options.params, params);
        }
        return this.GET(
          DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(null, options)),
          options
        );
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:create
       * @name create
       * @description
       * Create a new entity on the server.
       *
       * Makes a `POST` request.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.create(resourceConfig, attrs[, options])
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {object} attrs The attribute payload.
       * @param {object=} options Optional configuration. Also passed along to `$http([config])`. Properties:
       *
       * - `{string=}` - `baseUrl` - Override the default base url.
       * - `{string=}` - `endpoint` - Override the default endpoint.
       * - `{object=}` - `params` - Additional query string parameters to add to the url.
       *
       * @returns {Promise} Promise.
       */
      create: function (resourceConfig, attrs, options) {
        options = options || {};
        return this.POST(
          DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(attrs, options)),
          attrs,
          options
        );
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:update
       * @name update
       * @description
       * Update an entity on the server.
       *
       * Makes a `PUT` request.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.update(resourceConfig, id, attrs[, options])
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {string|number} id Primary key of the entity to update.
       * @param {object} attrs The attribute payload.
       * @param {object=} options Optional configuration. Also passed along to `$http([config])`. Properties:
       *
       * - `{string=}` - `baseUrl` - Override the default base url.
       * - `{string=}` - `endpoint` - Override the default endpoint.
       * - `{object=}` - `params` - Additional query string parameters to add to the url.
       *
       * @returns {Promise} Promise.
       */
      update: function (resourceConfig, id, attrs, options) {
        options = options || {};
        return this.PUT(
          DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id),
          attrs,
          options
        );
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:updateAll
       * @name updateAll
       * @description
       * Update a collection of entities on the server.
       *
       * Makes a `PUT` request.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.updateAll(resourceConfig, attrs[, params][, options])
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {object} attrs The attribute payload.
       * @param {object=} params Search query parameters. See the [query guide](/documentation/guide/queries/index).
       * @param {object=} options Optional configuration. Also passed along to `$http([config])`. Properties:
       *
       * - `{string=}` - `baseUrl` - Override the default base url.
       * - `{string=}` - `endpoint` - Override the default endpoint.
       * - `{object=}` - `params` - Additional query string parameters to add to the url.
       *
       * @returns {Promise} Promise.
       */
      updateAll: function (resourceConfig, attrs, params, options) {
        options = options || {};
        options.params = options.params || {};
        if (params) {
          params = defaults.queryTransform(resourceConfig.name, params);
          DSUtils.deepMixIn(options.params, params);
        }
        return this.PUT(
          DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(null, options)),
          attrs,
          options
        );
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:destroy
       * @name destroy
       * @description
       * Delete an entity on the server.
       *
       * Makes a `DELETE` request.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.destroy(resourceConfig, id[, options)
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {string|number} id Primary key of the entity to update.
       * @param {object=} options Optional configuration. Also passed along to `$http([config])`. Properties:
       *
       * - `{string=}` - `baseUrl` - Override the default base url.
       * - `{string=}` - `endpoint` - Override the default endpoint.
       * - `{object=}` - `params` - Additional query string parameters to add to the url.
       *
       * @returns {Promise} Promise.
       */
      destroy: function (resourceConfig, id, options) {
        options = options || {};
        return this.DEL(
          DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id),
          options
        );
      },

      /**
       * @doc method
       * @id DSHttpAdapter.methods:destroyAll
       * @name destroyAll
       * @description
       * Delete a collection of entities on the server.
       *
       * Makes `DELETE` request.
       *
       * ## Signature:
       * ```js
       * DSHttpAdapter.destroyAll(resourceConfig[, params][, options])
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {object=} params Search query parameters. See the [query guide](/documentation/guide/queries/index).
       * @param {object=} options Optional configuration. Also passed along to `$http([config])`. Properties:
       *
       * - `{string=}` - `baseUrl` - Override the default base url.
       * - `{string=}` - `endpoint` - Override the default endpoint.
       * - `{object=}` - `params` - Additional query string parameters to add to the url.
       *
       * @returns {Promise} Promise.
       */
      destroyAll: function (resourceConfig, params, options) {
        options = options || {};
        options.params = options.params || {};
        if (params) {
          params = defaults.queryTransform(resourceConfig.name, params);
          DSUtils.deepMixIn(options.params, params);
        }
        return this.DEL(
          DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(null, options)),
          options
        );
      }
    };
  }];
}

module.exports = DSHttpAdapterProvider;

},{}],52:[function(require,module,exports){
/*!
 * @doc function
 * @id DSLocalStorageAdapterProvider
 * @name DSLocalStorageAdapterProvider
 */
function DSLocalStorageAdapterProvider() {

  this.$get = ['$q', 'DSUtils', 'DSErrors', function ($q, DSUtils) {

    /**
     * @doc interface
     * @id DSLocalStorageAdapter
     * @name DSLocalStorageAdapter
     * @description
     * Adapter that uses `localStorage` as its persistence layer. The localStorage adapter does not support operations
     * on collections because localStorage itself is a key-value store.
     */
    return {

      getIds: function (name, options) {
        var ids;
        var idsPath = DSUtils.makePath(options.baseUrl, 'DSKeys', name);
        var idsJson = localStorage.getItem(idsPath);
        if (idsJson) {
          ids = DSUtils.fromJson(idsJson);
        } else {
          localStorage.setItem(idsPath, DSUtils.toJson({}));
          ids = {};
        }
        return ids;
      },

      saveKeys: function (ids, name, options) {
        var keysPath = DSUtils.makePath(options.baseUrl, 'DSKeys', name);
        localStorage.setItem(keysPath, DSUtils.toJson(ids));
      },

      ensureId: function (id, name, options) {
        var ids = this.getIds(name, options);
        ids[id] = 1;
        this.saveKeys(ids, name, options);
      },

      removeId: function (id, name, options) {
        var ids = this.getIds(name, options);
        delete ids[id];
        this.saveKeys(ids, name, options);
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:GET
       * @name GET
       * @description
       * An asynchronous wrapper for `localStorage.getItem(key)`.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.GET(key)
       * ```
       *
       * @param {string} key The key path of the item to retrieve.
       * @returns {Promise} Promise.
       */
      GET: function (key) {
        var deferred = $q.defer();
        try {
          var item = localStorage.getItem(key);
          deferred.resolve(item ? angular.fromJson(item) : undefined);
        } catch (err) {
          deferred.reject(err);
        }
        return deferred.promise;
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:PUT
       * @name PUT
       * @description
       * An asynchronous wrapper for `localStorage.setItem(key, value)`.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.PUT(key, value)
       * ```
       *
       * @param {string} key The key to update.
       * @param {object} value Attributes to put.
       * @returns {Promise} Promise.
       */
      PUT: function (key, value) {
        var DSLocalStorageAdapter = this;
        return DSLocalStorageAdapter.GET(key).then(function (item) {
          if (item) {
            DSUtils.deepMixIn(item, value);
          }
          localStorage.setItem(key, angular.toJson(item || value));
          return DSLocalStorageAdapter.GET(key);
        });
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:DEL
       * @name DEL
       * @description
       * An asynchronous wrapper for `localStorage.removeItem(key)`.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.DEL(key)
       * ```
       *
       * @param {string} key The key to remove.
       * @returns {Promise} Promise.
       */
      DEL: function (key) {
        var deferred = $q.defer();
        try {
          localStorage.removeItem(key);
          deferred.resolve();
        } catch (err) {
          deferred.reject(err);
        }
        return deferred.promise;
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:find
       * @name find
       * @description
       * Retrieve a single entity from localStorage.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.find(resourceConfig, id[, options])
       * ```
       *
       * ## Example:
       * ```js
       * DS.find('user', 5, {
       *   adapter: 'DSLocalStorageAdapter'
       * }).then(function (user) {
       *   user; // { id: 5, ... }
       * });
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {string|number} id Primary key of the entity to retrieve.
       * @param {object=} options Optional configuration. Properties:
       *
       * - `{string=}` - `baseUrl` - Base path to use.
       *
       * @returns {Promise} Promise.
       */
      find: function find(resourceConfig, id, options) {
        options = options || {};
        return this.GET(DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id)).then(function (item) {
          if (!item) {
            return $q.reject(new Error('Not Found!'));
          } else {
            return item;
          }
        });
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:findAll
       * @name findAll
       * @description
       * Retrieve a collections of entities from localStorage.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.findAll(resourceConfig, params[, options])
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {object=} params Query parameters.
       * @param {object=} options Optional configuration. Properties:
       *
       * - `{string=}` - `baseUrl` - Base path to use.
       *
       * @returns {Promise} Promise.
       */
      findAll: function (resourceConfig, params, options) {
        var _this = this;
        var deferred = $q.defer();
        options = options || {};
        if (!('allowSimpleWhere' in options)) {
          options.allowSimpleWhere = true;
        }
        var items = [];
        var ids = DSUtils.keys(_this.getIds(resourceConfig.name, options));
        DSUtils.forEach(ids, function (id) {
          var itemJson = localStorage.getItem(DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id));
          if (itemJson) {
            items.push(DSUtils.fromJson(itemJson));
          }
        });
        deferred.resolve(_this.DS.defaults.defaultFilter.call(_this.DS, items, resourceConfig.name, params, options));
        return deferred.promise;
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:create
       * @name create
       * @description
       * Create an entity in `localStorage`. You must generate the primary key and include it in the `attrs` object.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.create(resourceConfig, attrs[, options])
       * ```
       *
       * ## Example:
       * ```js
       * DS.create('user', {
       *   id: 1,
       *   name: 'john'
       * }, {
       *   adapter: 'DSLocalStorageAdapter'
       * }).then(function (user) {
       *   user; // { id: 1, name: 'john' }
       * });
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {object} attrs Attributes to create in localStorage.
       * @param {object=} options Optional configuration. Properties:
       *
       * - `{string=}` - `baseUrl` - Base path to use.
       *
       * @returns {Promise} Promise.
       */
      create: function (resourceConfig, attrs, options) {
        var _this = this;
        attrs[resourceConfig.idAttribute] = attrs[resourceConfig.idAttribute] || DSUtils.guid();
        options = options || {};
        return this.PUT(
          DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(attrs, options), attrs[resourceConfig.idAttribute]),
          attrs
        ).then(function (item) {
            _this.ensureId(item[resourceConfig.idAttribute], resourceConfig.name, options);
            return item;
          });
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:update
       * @name update
       * @description
       * Update an entity in localStorage.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.update(resourceConfig, id, attrs[, options])
       * ```
       *
       * ## Example:
       * ```js
       * DS.update('user', 5, {
       *   name: 'john'
       * }, {
       *   adapter: 'DSLocalStorageAdapter'
       * }).then(function (user) {
       *   user; // { id: 5, ... }
       * });
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {string|number} id Primary key of the entity to retrieve.
       * @param {object} attrs Attributes with which to update the entity.
       * @param {object=} options Optional configuration. Properties:
       *
       * - `{string=}` - `baseUrl` - Base path to use.
       *
       * @returns {Promise} Promise.
       */
      update: function (resourceConfig, id, attrs, options) {
        options = options || {};
        return this.PUT(DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id), attrs);
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:updateAll
       * @name updateAll
       * @description
       * Update a collections of entities in localStorage.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.updateAll(resourceConfig, attrs, params[, options])
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {object} attrs Attributes with which to update the items.
       * @param {object=} params Query parameters.
       * @param {object=} options Optional configuration. Properties:
       *
       * - `{string=}` - `baseUrl` - Base path to use.
       *
       * @returns {Promise} Promise.
       */
      updateAll: function (resourceConfig, attrs, params, options) {
        var _this = this;
        return this.findAll(resourceConfig, params, options).then(function (items) {
          var tasks = [];
          DSUtils.forEach(items, function (item) {
            tasks.push(_this.update(resourceConfig, item[resourceConfig.idAttribute], attrs, options));
          });
          return $q.all(tasks);
        });
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:destroy
       * @name destroy
       * @description
       * Destroy an entity from localStorage.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.destroy(resourceConfig, id[, options])
       * ```
       *
       * ## Example:
       * ```js
       * DS.destroy('user', 5, {
       *   name: ''
       * }, {
       *   adapter: 'DSLocalStorageAdapter'
       * }).then(function (user) {
       *   user; // { id: 5, ... }
       * });
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {string|number} id Primary key of the entity to destroy.
       * @param {object=} options Optional configuration. Properties:
       *
       * - `{string=}` - `baseUrl` - Base path to use.
       *
       * @returns {Promise} Promise.
       */
      destroy: function (resourceConfig, id, options) {
        options = options || {};
        return this.DEL(DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.getEndpoint(id, options), id));
      },

      /**
       * @doc method
       * @id DSLocalStorageAdapter.methods:destroyAll
       * @name destroyAll
       * @description
       * Destroy a collections of entities from localStorage.
       *
       * ## Signature:
       * ```js
       * DSLocalStorageAdapter.destroyAll(resourceConfig, params[, options])
       * ```
       *
       * @param {object} resourceConfig DS resource definition object:
       * @param {object=} params Query parameters.
       * @param {object=} options Optional configuration. Properties:
       *
       * - `{string=}` - `baseUrl` - Base path to use.
       *
       * @returns {Promise} Promise.
       */
      destroyAll: function (resourceConfig, params, options) {
        var _this = this;
        return this.findAll(resourceConfig, params, options).then(function (items) {
          var tasks = [];
          DSUtils.forEach(items, function (item) {
            tasks.push(_this.destroy(resourceConfig, item[resourceConfig.idAttribute], options));
          });
          return $q.all(tasks);
        });
      }
    };
  }];
}

module.exports = DSLocalStorageAdapterProvider;

},{}],53:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.create(' + resourceName + ', attrs[, options]): ';
}

/**
 * @doc method
 * @id DS.async methods:create
 * @name create
 * @description
 * The "C" in "CRUD". Delegate to the `create` method of whichever adapter is being used (http by default) and inject the
 * result into the data store.
 *
 * ## Signature:
 * ```js
 * DS.create(resourceName, attrs[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.create('document', {
 *   author: 'John Anderson'
 * }).then(function (document) {
 *   document; // { id: 5, author: 'John Anderson' }
 *
 *   // The new document is already in the data store
 *   DS.get('document', document.id); // { id: 5, author: 'John Anderson' }
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} attrs The attributes with which to create the item of the type specified by `resourceName`.
 * @param {object=} options Configuration options. Also passed along to the adapter's `create` method. Properties:
 *
 * - `{boolean=}` - `useClass` - Whether to wrap the injected item with the resource's instance constructor.
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the adapter into the data store. Default: `true`.
 * - `{boolean=}` - `upsert` - If `attrs` already contains a primary key, then attempt to call `DS.update` instead. Default: `true`.
 * - `{boolean=}` - `eagerInject` - Eagerly inject the attributes into the store without waiting for a successful response from the adapter. Default: `false`.
 * - `{function=}` - `beforeValidate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `validate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `afterValidate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `beforeCreate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `afterCreate` - Override the resource or global lifecycle hook.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - A reference to the newly created item.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function create(resourceName, attrs, options) {
  var DS = this;
  var deferred = DS.$q.defer();

  try {
    var definition = DS.definitions[resourceName];
    var injected;

    options = options || {};

    if (!definition) {
      throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
    } else if (!DS.utils.isObject(attrs)) {
      throw new DS.errors.IA(errorPrefix(resourceName) + 'attrs: Must be an object!');
    }
    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    if (!('upsert' in options)) {
      options.upsert = true;
    }

    if (!('eagerInject' in options)) {
      options.eagerInject = definition.eagerInject;
    }

    if (!('notify' in options)) {
      options.notify = definition.notify;
    }

    deferred.resolve(attrs);

    if (options.upsert && attrs[definition.idAttribute]) {
      return DS.update(resourceName, attrs[definition.idAttribute], attrs, options);
    } else {
      return deferred.promise
        .then(function (attrs) {
          var func = options.beforeValidate ? DS.$q.promisify(options.beforeValidate) : definition.beforeValidate;
          return func.call(attrs, resourceName, attrs);
        })
        .then(function (attrs) {
          var func = options.validate ? DS.$q.promisify(options.validate) : definition.validate;
          return func.call(attrs, resourceName, attrs);
        })
        .then(function (attrs) {
          var func = options.afterValidate ? DS.$q.promisify(options.afterValidate) : definition.afterValidate;
          return func.call(attrs, resourceName, attrs);
        })
        .then(function (attrs) {
          var func = options.beforeCreate ? DS.$q.promisify(options.beforeCreate) : definition.beforeCreate;
          return func.call(attrs, resourceName, attrs);
        })
        .then(function (attrs) {
          if (options.notify) {
            DS.emit(definition, 'beforeCreate', DS.utils.merge({}, attrs));
          }
          if (options.eagerInject && options.cacheResponse) {
            attrs[definition.idAttribute] = attrs[definition.idAttribute] || DS.utils.guid();
            injected = DS.inject(resourceName, attrs);
          }
          return DS.adapters[options.adapter || definition.defaultAdapter].create(definition, options.serialize ? options.serialize(resourceName, attrs) : definition.serialize(resourceName, attrs), options);
        })
        .then(function (res) {
          var func = options.afterCreate ? DS.$q.promisify(options.afterCreate) : definition.afterCreate;
          var attrs = options.deserialize ? options.deserialize(resourceName, res) : definition.deserialize(resourceName, res);
          return func.call(attrs, resourceName, attrs);
        })
        .then(function (attrs) {
          if (options.notify) {
            DS.emit(definition, 'afterCreate', DS.utils.merge({}, attrs));
          }
          if (options.cacheResponse) {
            var resource = DS.store[resourceName];
            if (options.eagerInject) {
              var newId = attrs[definition.idAttribute];
              var prevId = injected[definition.idAttribute];
              var prev = DS.get(resourceName, prevId);
              resource.previousAttributes[newId] = resource.previousAttributes[prevId];
              resource.changeHistories[newId] = resource.changeHistories[prevId];
              resource.observers[newId] = resource.observers[prevId];
              resource.modified[newId] = resource.modified[prevId];
              resource.saved[newId] = resource.saved[prevId];
              resource.index.put(newId, prev);
              DS.eject(resourceName, prevId, { notify: false });
              prev[definition.idAttribute] = newId;
              resource.collection.push(prev);
            }
            var created = DS.inject(resourceName, attrs, options);
            var id = created[definition.idAttribute];
            resource.completedQueries[id] = new Date().getTime();
            resource.previousAttributes[id] = DS.utils.deepMixIn({}, created);
            resource.saved[id] = DS.utils.updateTimestamp(resource.saved[id]);
            return DS.get(resourceName, id);
          } else {
            return DS.createInstance(resourceName, attrs, options);
          }
        })
        .catch(function (err) {
          if (options.eagerInject && options.cacheResponse) {
            DS.eject(resourceName, injected[definition.idAttribute], { notify: false });
          }
          return DS.$q.reject(err);
        });
    }
  } catch (err) {
    deferred.reject(err);
    return deferred.promise;
  }
}

module.exports = create;

},{}],54:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.destroy(' + resourceName + ', ' + id + '[, options]): ';
}

/**
 * @doc method
 * @id DS.async methods:destroy
 * @name destroy
 * @description
 * The "D" in "CRUD". Delegate to the `destroy` method of whichever adapter is being used (http by default) and eject the
 * appropriate item from the data store.
 *
 * ## Signature:
 * ```js
 * DS.destroy(resourceName, id[, options]);
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.destroy('document', 5).then(function (id) {
 *   id; // 5
 *
 *   // The document is gone
 *   DS.get('document', 5); // undefined
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to remove.
 * @param {object=} options Configuration options. Also passed along to the adapter's `destroy` method. Properties:
 *
 * - `{function=}` - `beforeDestroy` - Override the resource or global lifecycle hook.
 * - `{function=}` - `afterDestroy` - Override the resource or global lifecycle hook.
 * - `{boolean=}` - `eagerEject` - If `true` eagerly eject the item from the store without waiting for the adapter's response, the item will be re-injected if the adapter operation fails. Default: `false`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{string|number}` - `id` - The primary key of the destroyed item.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 * - `{NonexistentResourceError}`
 */
function destroy(resourceName, id, options) {
  var DS = this;
  var deferred = DS.$q.defer();

  try {
    var definition = DS.definitions[resourceName];

    options = options || {};

    id = DS.utils.resolveId(definition, id);
    if (!definition) {
      throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
    } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
      throw new DS.errors.IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
    }

    var item = DS.get(resourceName, id);
    if (!item) {
      throw new DS.errors.R(errorPrefix(resourceName, id) + 'id: "' + id + '" not found!');
    }

    deferred.resolve(item);

    if (!('eagerEject' in options)) {
      options.eagerEject = definition.eagerEject;
    }

    if (!('notify' in options)) {
      options.notify = definition.notify;
    }

    return deferred.promise
      .then(function (attrs) {
        var func = options.beforeDestroy ? DS.$q.promisify(options.beforeDestroy) : definition.beforeDestroy;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        if (options.notify) {
          DS.emit(definition, 'beforeDestroy', DS.utils.merge({}, attrs));
        }
        if (options.eagerEject) {
          DS.eject(resourceName, id);
        }
        return DS.adapters[options.adapter || definition.defaultAdapter].destroy(definition, id, options);
      })
      .then(function () {
        var func = options.afterDestroy ? DS.$q.promisify(options.afterDestroy) : definition.afterDestroy;
        return func.call(item, resourceName, item);
      })
      .then(function () {
        if (options.notify) {
          DS.emit(definition, 'afterDestroy', DS.utils.merge({}, item));
        }
        DS.eject(resourceName, id);
        return id;
      }).catch(function (err) {
        if (options.eagerEject && item) {
          DS.inject(resourceName, item);
        }
        return DS.$q.reject(err);
      });
  } catch (err) {
    deferred.reject(err);
    return deferred.promise;
  }
}

module.exports = destroy;

},{}],55:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.destroyAll(' + resourceName + ', params[, options]): ';
}

/**
 * @doc method
 * @id DS.async methods:destroyAll
 * @name destroyAll
 * @description
 * The "D" in "CRUD". Delegate to the `destroyAll` method of whichever adapter is being used (http by default) and eject
 * the appropriate items from the data store.
 *
 * ## Signature:
 * ```js
 * DS.destroyAll(resourceName, params[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * var params = {
 *   where: {
 *     author: {
 *       '==': 'John Anderson'
 *     }
 *   }
 * };
 *
 * DS.destroyAll('document', params).then(function (documents) {
 *   // The documents are gone from the data store
 *   DS.filter('document', params); // []
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is serialized into the query string. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Also passed along to the adapter's `destroyAll` method. Properties:
 *
 * - `{boolean=}` - `bypassCache` - Bypass the cache. Default: `false`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function destroyAll(resourceName, params, options) {
  var DS = this;
  var deferred = DS.$q.defer();

  try {
    var IA = DS.errors.IA;
    var definition = DS.definitions[resourceName];

    options = options || {};

    if (!definition) {
      throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
    } else if (!DS.utils.isObject(params)) {
      throw new IA(errorPrefix(resourceName) + 'params: Must be an object!');
    } else if (!DS.utils.isObject(options)) {
      throw new IA(errorPrefix(resourceName) + 'options: Must be an object!');
    }

    deferred.resolve();

    return deferred.promise
      .then(function () {
        return DS.adapters[options.adapter || definition.defaultAdapter].destroyAll(definition, params, options);
      })
      .then(function () {
        return DS.ejectAll(resourceName, params);
      });
  } catch (err) {
    deferred.reject(err);
    return deferred.promise;
  }
}

module.exports = destroyAll;

},{}],56:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.find(' + resourceName + ', ' + id + '[, options]): ';
}

/**
 * @doc method
 * @id DS.async methods:find
 * @name find
 * @description
 * The "R" in "CRUD". Delegate to the `find` method of whichever adapter is being used (http by default) and inject the
 * resulting item into the data store.
 *
 * ## Signature:
 * ```js
 * DS.find(resourceName, id[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.get('document', 5); // undefined
 * DS.find('document', 5).then(function (document) {
 *   document; // { id: 5, author: 'John Anderson' }
 *
 *   // the document is now in the data store
 *   DS.get('document', 5); // { id: 5, author: 'John Anderson' }
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to retrieve.
 * @param {object=} options Optional configuration. Also passed along to the adapter's `find` method. Properties:
 *
 * - `{boolean=}` - `useClass` - Whether to wrap the injected item with the resource's instance constructor.
 * - `{boolean=}` - `bypassCache` - Bypass the cache. Default: `false`.
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the adapter into the data store. Default: `true`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - The item returned by the adapter.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function find(resourceName, id, options) {
  var DS = this;
  var deferred = DS.$q.defer();
  var promise = deferred.promise;

  try {
    var IA = DS.errors.IA;
    var definition = DS.definitions[resourceName];

    options = options || {};

    if (!definition) {
      throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
    } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
      throw new IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
    } else if (!DS.utils.isObject(options)) {
      throw new IA(errorPrefix(resourceName, id) + 'options: Must be an object!');
    }

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }
    var resource = DS.store[resourceName];

    if (options.bypassCache || !options.cacheResponse) {
      delete resource.completedQueries[id];
    }

    if (!(id in resource.completedQueries)) {
      if (!(id in resource.pendingQueries)) {
        promise = resource.pendingQueries[id] = DS.adapters[options.adapter || definition.defaultAdapter].find(definition, id, options)
          .then(function (res) {
            var data = options.deserialize ? options.deserialize(resourceName, res) : definition.deserialize(resourceName, res);
            if (options.cacheResponse) {
              // Query is no longer pending
              delete resource.pendingQueries[id];
              resource.completedQueries[id] = new Date().getTime();
              return DS.inject(resourceName, data, options);
            } else {
              return DS.createInstance(resourceName, data, options);
            }
          }, function (err) {
            delete resource.pendingQueries[id];
            return DS.$q.reject(err);
          });
      }

      return resource.pendingQueries[id];
    } else {
      deferred.resolve(DS.get(resourceName, id));
    }
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = find;

},{}],57:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.findAll(' + resourceName + ', params[, options]): ';
}

function processResults(data, resourceName, queryHash, options) {
  var DS = this;
  var resource = DS.store[resourceName];
  var idAttribute = DS.definitions[resourceName].idAttribute;
  var date = new Date().getTime();

  data = data || [];

  // Query is no longer pending
  delete resource.pendingQueries[queryHash];
  resource.completedQueries[queryHash] = date;

  // Update modified timestamp of collection
  resource.collectionModified = DS.utils.updateTimestamp(resource.collectionModified);

  // Merge the new values into the cache
  var injected = DS.inject(resourceName, data, options);

  // Make sure each object is added to completedQueries
  if (DS.utils.isArray(injected)) {
    angular.forEach(injected, function (item) {
      if (item && item[idAttribute]) {
        resource.completedQueries[item[idAttribute]] = date;
      }
    });
  } else {
    DS.$log.warn(errorPrefix(resourceName) + 'response is expected to be an array!');
    resource.completedQueries[injected[idAttribute]] = date;
  }

  return injected;
}

function _findAll(resourceName, params, options) {
  var DS = this;
  var definition = DS.definitions[resourceName];
  var resource = DS.store[resourceName];
  var queryHash = DS.utils.toJson(params);

  if (options.bypassCache || !options.cacheResponse) {
    delete resource.completedQueries[queryHash];
  }

  if (!(queryHash in resource.completedQueries)) {
    // This particular query has never been completed

    if (!(queryHash in resource.pendingQueries)) {

      // This particular query has never even been made
      resource.pendingQueries[queryHash] = DS.adapters[options.adapter || definition.defaultAdapter].findAll(definition, params, options)
        .then(function (res) {
          delete resource.pendingQueries[queryHash];
          var data = options.deserialize ? options.deserialize(resourceName, res) : definition.deserialize(resourceName, res);
          if (options.cacheResponse) {
            try {
              return processResults.call(DS, data, resourceName, queryHash, options);
            } catch (err) {
              return DS.$q.reject(err);
            }
          } else {
            DS.utils.forEach(data, function (item, i) {
              data[i] = DS.createInstance(resourceName, item, options);
            });
            return data;
          }
        }, function (err) {
          delete resource.pendingQueries[queryHash];
          return DS.$q.reject(err);
        });
    }

    return resource.pendingQueries[queryHash];
  } else {
    return DS.filter(resourceName, params, options);
  }
}

/**
 * @doc method
 * @id DS.async methods:findAll
 * @name findAll
 * @description
 * The "R" in "CRUD". Delegate to the `findAll` method of whichever adapter is being used (http by default) and inject
 * the resulting collection into the data store.
 *
 * ## Signature:
 * ```js
 * DS.findAll(resourceName, params[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * var params = {
 *   where: {
 *     author: {
 *       '==': 'John Anderson'
 *     }
 *   }
 * };
 *
 * DS.filter('document', params); // []
 * DS.findAll('document', params).then(function (documents) {
 *   documents;  // [{ id: '1', author: 'John Anderson', title: 'How to cook' },
 *               //  { id: '2', author: 'John Anderson', title: 'How NOT to cook' }]
 *
 *   // The documents are now in the data store
 *   DS.filter('document', params); // [{ id: '1', author: 'John Anderson', title: 'How to cook' },
 *                                  //  { id: '2', author: 'John Anderson', title: 'How NOT to cook' }]
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object=} params Parameter object that is serialized into the query string. Default properties:
 *
 * - `{object=}` - `where` - Where clause.
 * - `{number=}` - `limit` - Limit clause.
 * - `{number=}` - `skip` - Skip clause.
 * - `{number=}` - `offset` - Same as skip.
 * - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Also passed along to the adapter's `findAll` method. Properties:
 *
 * - `{boolean=}` - `useClass` - Whether to wrap the injected item with the resource's instance constructor.
 * - `{boolean=}` - `bypassCache` - Bypass the cache. Default: `false`.
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the adapter into the data store. Default: `true`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{array}` - `items` - The collection of items returned by the adapter.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function findAll(resourceName, params, options) {
  var DS = this;
  var deferred = DS.$q.defer();

  try {
    var IA = DS.errors.IA;

    options = options || {};
    params = params || {};

    if (!DS.definitions[resourceName]) {
      throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
    } else if (!DS.utils.isObject(params)) {
      throw new IA(errorPrefix(resourceName) + 'params: Must be an object!');
    } else if (!DS.utils.isObject(options)) {
      throw new IA(errorPrefix(resourceName) + 'options: Must be an object!');
    }

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    deferred.resolve();

    return deferred.promise.then(function () {
      return _findAll.call(DS, resourceName, params, options);
    });
  } catch (err) {
    deferred.reject(err);
    return deferred.promise;
  }
}

module.exports = findAll;

},{}],58:[function(require,module,exports){
module.exports = {
  /**
   * @doc method
   * @id DS.async methods:create
   * @name create
   * @methodOf DS
   * @description
   * See [DS.create](/documentation/api/api/DS.async methods:create).
   */
  create: require('./create'),

  /**
   * @doc method
   * @id DS.async methods:destroy
   * @name destroy
   * @methodOf DS
   * @description
   * See [DS.destroy](/documentation/api/api/DS.async methods:destroy).
   */
  destroy: require('./destroy'),

  /**
   * @doc method
   * @id DS.async methods:destroyAll
   * @name destroyAll
   * @methodOf DS
   * @description
   * See [DS.destroyAll](/documentation/api/api/DS.async methods:destroyAll).
   */
  destroyAll: require('./destroyAll'),

  /**
   * @doc method
   * @id DS.async methods:find
   * @name find
   * @methodOf DS
   * @description
   * See [DS.find](/documentation/api/api/DS.async methods:find).
   */
  find: require('./find'),

  /**
   * @doc method
   * @id DS.async methods:findAll
   * @name findAll
   * @methodOf DS
   * @description
   * See [DS.findAll](/documentation/api/api/DS.async methods:findAll).
   */
  findAll: require('./findAll'),

  /**
   * @doc method
   * @id DS.async methods:loadRelations
   * @name loadRelations
   * @methodOf DS
   * @description
   * See [DS.loadRelations](/documentation/api/api/DS.async methods:loadRelations).
   */
  loadRelations: require('./loadRelations'),

  /**
   * @doc method
   * @id DS.async methods:refresh
   * @name refresh
   * @methodOf DS
   * @description
   * See [DS.refresh](/documentation/api/api/DS.async methods:refresh).
   */
  refresh: require('./refresh'),

  /**
   * @doc method
   * @id DS.async methods:save
   * @name save
   * @methodOf DS
   * @description
   * See [DS.save](/documentation/api/api/DS.async methods:save).
   */
  save: require('./save'),

  /**
   * @doc method
   * @id DS.async methods:update
   * @name update
   * @methodOf DS
   * @description
   * See [DS.update](/documentation/api/api/DS.async methods:update).
   */
  update: require('./update'),

  /**
   * @doc method
   * @id DS.async methods:updateAll
   * @name updateAll
   * @methodOf DS
   * @description
   * See [DS.updateAll](/documentation/api/api/DS.async methods:updateAll).
   */
  updateAll: require('./updateAll')
};

},{"./create":53,"./destroy":54,"./destroyAll":55,"./find":56,"./findAll":57,"./loadRelations":59,"./refresh":60,"./save":61,"./update":62,"./updateAll":63}],59:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.loadRelations(' + resourceName + ', instance(Id), relations[, options]): ';
}

/**
 * @doc method
 * @id DS.async methods:loadRelations
 * @name loadRelations
 * @description
 * Asynchronously load the indicated relations of the given instance.
 *
 * ## Signature:
 * ```js
 * DS.loadRelations(resourceName, instance|id, relations[, options])
 * ```
 *
 * ## Examples:
 *
 * ```js
 * DS.loadRelations('user', 10, ['profile']).then(function (user) {
 *   user.profile; // object
 *   assert.deepEqual(user.profile, DS.filter('profile', { userId: 10 })[0]);
 * });
 * ```
 *
 * ```js
 * var user = DS.get('user', 10);
 *
 * DS.loadRelations('user', user, ['profile']).then(function (user) {
 *   user.profile; // object
 *   assert.deepEqual(user.profile, DS.filter('profile', { userId: 10 })[0]);
 * });
 * ```
 *
 * ```js
 * DS.loadRelations('user', 10, ['profile'], { cacheResponse: false }).then(function (user) {
 *   user.profile; // object
 *   assert.equal(DS.filter('profile', { userId: 10 }).length, 0);
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number|object} instance The instance or the id of the instance for which relations are to be loaded.
 * @param {string|array=} relations The relation(s) to load.
 * @param {object=} options Optional configuration. Also passed along to the adapter's `find` or `findAll` methods.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - The instance with its loaded relations.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function loadRelations(resourceName, instance, relations, options) {
  var DS = this;
  var deferred = DS.$q.defer();

  try {
    var IA = DS.errors.IA;
    var definition = DS.definitions[resourceName];

    options = options || {};

    if (angular.isString(instance) || angular.isNumber(instance)) {
      instance = DS.get(resourceName, instance);
    }

    if (angular.isString(relations)) {
      relations = [relations];
    }

    if (!definition) {
      throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
    } else if (!DS.utils.isObject(instance)) {
      throw new IA(errorPrefix(resourceName) + 'instance(Id): Must be a string, number or object!');
    } else if (!DS.utils.isArray(relations)) {
      throw new IA(errorPrefix(resourceName) + 'relations: Must be a string or an array!');
    } else if (!DS.utils.isObject(options)) {
      throw new IA(errorPrefix(resourceName) + 'options: Must be an object!');
    }

    if (!('findBelongsTo' in options)) {
      options.findBelongsTo = true;
    }

    if (!('findHasMany' in options)) {
      options.findHasMany = true;
    }

    var tasks = [];
    var fields = [];

    DS.utils.forEach(definition.relationList, function (def) {
      var relationName = def.relation;
      if (DS.utils.contains(relations, relationName)) {
        var task;
        var params = {};
        params[def.foreignKey] = instance[definition.idAttribute];

        if (def.type === 'hasMany' && params[def.foreignKey]) {
          task = DS.findAll(relationName, params, options);
        } else if (def.type === 'hasOne') {
          if (def.localKey && instance[def.localKey]) {
            task = DS.find(relationName, instance[def.localKey], options);
          } else if (def.foreignKey && params[def.foreignKey]) {
            task = DS.findAll(relationName, params, options).then(function (hasOnes) {
              return hasOnes.length ? hasOnes[0] : null;
            });
          }
        } else if (instance[def.localKey]) {
          task = DS.find(relationName, instance[def.localKey], options);
        }

        if (task) {
          tasks.push(task);
          fields.push(def.localField);
        }
      }
    });

    deferred.resolve();

    return deferred.promise
      .then(function () {
        return DS.$q.all(tasks);
      })
      .then(function (loadedRelations) {
        angular.forEach(fields, function (field, index) {
          instance[field] = loadedRelations[index];
        });
        return instance;
      });
  } catch (err) {
    deferred.reject(err);
    return deferred.promise;
  }
}

module.exports = loadRelations;

},{}],60:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.refresh(' + resourceName + ', ' + id + '[, options]): ';
}

/**
 * @doc method
 * @id DS.async methods:refresh
 * @name refresh
 * @description
 * Like `DS.find`, except the resource is only refreshed from the adapter if it already exists in the data store.
 *
 * ## Signature:
 * ```js
 * DS.refresh(resourceName, id[, options])
 * ```
 * ## Example:
 *
 * ```js
 * // Exists in the data store, but we want a fresh copy
 * DS.get('document', 5);
 *
 * DS.refresh('document', 5).then(function (document) {
 *   document; // The fresh copy
 * });
 *
 * // Does not exist in the data store
 * DS.get('document', 6); // undefined
 *
 * DS.refresh('document', 6).then(function (document) {
 *   document; // undefined
 * });
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to refresh from the adapter.
 * @param {object=} options Optional configuration. Also passed along to the adapter's `find` method.
 * @returns {Promise} A Promise created by the $q service.
 *
 * ## Resolves with:
 *
 * - `{object|undefined}` - `item` - The item returned by the adapter or `undefined` if the item wasn't already in the
 * data store.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function refresh(resourceName, id, options) {
  var DS = this;
  var IA = DS.errors.IA;

  options = options || {};

  id = DS.utils.resolveId(DS.definitions[resourceName], id);
  if (!DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
  } else if (!DS.utils.isObject(options)) {
    throw new IA(errorPrefix(resourceName, id) + 'options: Must be an object!');
  } else {
    options.bypassCache = true;

    if (DS.get(resourceName, id)) {
      return DS.find(resourceName, id, options);
    } else {
      var deferred = DS.$q.defer();
      deferred.resolve();
      return deferred.promise;
    }
  }
}

module.exports = refresh;

},{}],61:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.save(' + resourceName + ', ' + id + '[, options]): ';
}

/**
 * @doc method
 * @id DS.async methods:save
 * @name save
 * @description
 * The "U" in "CRUD". Persist a single item already in the store and in it's current form to whichever adapter is being
 * used (http by default) and inject the resulting item into the data store.
 *
 * ## Signature:
 * ```js
 * DS.save(resourceName, id[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * var document = DS.get('document', 5);
 *
 * document.title = 'How to cook in style';
 *
 * DS.save('document', 5).then(function (document) {
 *   document; // A reference to the document that's been persisted via an adapter
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to save.
 * @param {object=} options Optional configuration. Also passed along to the adapter's `update` method. Properties:
 *
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the adapter into the data store. Default: `true`.
 * - `{boolean=}` - `changesOnly` - Only send changed and added values to the adapter. Default: `false`.
 * - `{function=}` - `beforeValidate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `validate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `afterValidate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `beforeUpdate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `afterUpdate` - Override the resource or global lifecycle hook.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - The item returned by the adapter.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 * - `{NonexistentResourceError}`
 */
function save(resourceName, id, options) {
  var DS = this;
  var deferred = DS.$q.defer();

  try {
    var IA = DS.errors.IA;
    var definition = DS.definitions[resourceName];

    options = options || {};

    id = DS.utils.resolveId(definition, id);
    if (!definition) {
      throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
    } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
      throw new IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
    } else if (!DS.utils.isObject(options)) {
      throw new IA(errorPrefix(resourceName, id) + 'options: Must be an object!');
    }

    var item = DS.get(resourceName, id);
    if (!item) {
      throw new DS.errors.R(errorPrefix(resourceName, id) + 'id: "' + id + '" not found!');
    }

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    if (!('notify' in options)) {
      options.notify = definition.notify;
    }

    deferred.resolve(item);

    return deferred.promise
      .then(function (attrs) {
        var func = options.beforeValidate ? DS.$q.promisify(options.beforeValidate) : definition.beforeValidate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        var func = options.validate ? DS.$q.promisify(options.validate) : definition.validate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        var func = options.afterValidate ? DS.$q.promisify(options.afterValidate) : definition.afterValidate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        var func = options.beforeUpdate ? DS.$q.promisify(options.beforeUpdate) : definition.beforeUpdate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        if (options.notify) {
          DS.emit(definition, 'beforeUpdate', DS.utils.merge({}, attrs));
        }
        if (options.changesOnly) {
          var resource = DS.store[resourceName];
          resource.observers[id].deliver();
          var toKeep = [],
            changes = DS.changes(resourceName, id);

          for (var key in changes.added) {
            toKeep.push(key);
          }
          for (key in changes.changed) {
            toKeep.push(key);
          }
          changes = DS.utils.pick(attrs, toKeep);
          if (DS.utils.isEmpty(changes)) {
            // no changes, return
            return attrs;
          } else {
            attrs = changes;
          }
        }
        return DS.adapters[options.adapter || definition.defaultAdapter].update(definition, id, options.serialize ? options.serialize(resourceName, attrs) : definition.serialize(resourceName, attrs), options);
      })
      .then(function (res) {
        var func = options.afterUpdate ? DS.$q.promisify(options.afterUpdate) : definition.afterUpdate;
        var attrs = options.deserialize ? options.deserialize(resourceName, res) : definition.deserialize(resourceName, res);
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        if (options.notify) {
          DS.emit(definition, 'afterUpdate', DS.utils.merge({}, attrs));
        }
        if (options.cacheResponse) {
          var resource = DS.store[resourceName];
          var saved = DS.inject(definition.name, attrs, options);
          resource.previousAttributes[id] = DS.utils.deepMixIn({}, saved);
          resource.saved[id] = DS.utils.updateTimestamp(resource.saved[id]);
          resource.observers[id].discardChanges();
          return DS.get(resourceName, id);
        } else {
          return attrs;
        }
      });
  } catch (err) {
    deferred.reject(err);
    return deferred.promise;
  }
}

module.exports = save;

},{}],62:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.update(' + resourceName + ', ' + id + ', attrs[, options]): ';
}

/**
 * @doc method
 * @id DS.async methods:update
 * @name update
 * @description
 * The "U" in "CRUD". Update the item of type `resourceName` and primary key `id` with `attrs`. This is useful when you
 * want to update an item that isn't already in the data store, or you don't want to update the item that's in the data
 * store until the adapter operation succeeds. This differs from `DS.save` which simply saves items in their current
 * form that already exist in the data store. The resulting item (by default) will be injected into the data store.
 *
 * ## Signature:
 * ```js
 * DS.update(resourceName, id, attrs[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.get('document', 5); // undefined
 *
 * DS.update('document', 5, {
 *   title: 'How to cook in style'
 * }).then(function (document) {
 *   document; // A reference to the document that's been saved via an adapter
 *             // and now resides in the data store
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to update.
 * @param {object} attrs The attributes with which to update the item.
 * @param {object=} options Optional configuration. Also passed along to the adapter's `update` method. Properties:
 *
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the adapter into the data store. Default: `true`.
 * - `{function=}` - `beforeValidate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `validate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `afterValidate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `beforeUpdate` - Override the resource or global lifecycle hook.
 * - `{function=}` - `afterUpdate` - Override the resource or global lifecycle hook.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - The item returned by the adapter.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function update(resourceName, id, attrs, options) {
  var DS = this;
  var deferred = DS.$q.defer();

  try {
    var IA = DS.errors.IA;
    var definition = DS.definitions[resourceName];

    options = options || {};

    id = DS.utils.resolveId(definition, id);
    if (!definition) {
      throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
    } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
      throw new IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
    } else if (!DS.utils.isObject(attrs)) {
      throw new IA(errorPrefix(resourceName, id) + 'attrs: Must be an object!');
    } else if (!DS.utils.isObject(options)) {
      throw new IA(errorPrefix(resourceName, id) + 'options: Must be an object!');
    }

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    if (!('notify' in options)) {
      options.notify = definition.notify;
    }

    deferred.resolve(attrs);

    return deferred.promise
      .then(function (attrs) {
        var func = options.beforeValidate ? DS.$q.promisify(options.beforeValidate) : definition.beforeValidate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        var func = options.validate ? DS.$q.promisify(options.validate) : definition.validate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        var func = options.afterValidate ? DS.$q.promisify(options.afterValidate) : definition.afterValidate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        var func = options.beforeUpdate ? DS.$q.promisify(options.beforeUpdate) : definition.beforeUpdate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        if (options.notify) {
          DS.emit(definition, 'beforeUpdate', DS.utils.merge({}, attrs));
        }
        return DS.adapters[options.adapter || definition.defaultAdapter].update(definition, id, options.serialize ? options.serialize(resourceName, attrs) : definition.serialize(resourceName, attrs), options);
      })
      .then(function (res) {
        var func = options.afterUpdate ? DS.$q.promisify(options.afterUpdate) : definition.afterUpdate;
        var attrs = options.deserialize ? options.deserialize(resourceName, res) : definition.deserialize(resourceName, res);
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        if (options.notify) {
          DS.emit(definition, 'afterUpdate', DS.utils.merge({}, attrs));
        }
        if (options.cacheResponse) {
          var resource = DS.store[resourceName];
          var updated = DS.inject(definition.name, attrs, options);
          var id = updated[definition.idAttribute];
          resource.previousAttributes[id] = DS.utils.deepMixIn({}, updated);
          resource.saved[id] = DS.utils.updateTimestamp(resource.saved[id]);
          resource.observers[id].discardChanges();
          return DS.get(definition.name, id);
        } else {
          return attrs;
        }
      });
  } catch (err) {
    deferred.reject(err);
    return deferred.promise;
  }
}

module.exports = update;

},{}],63:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.updateAll(' + resourceName + ', attrs, params[, options]): ';
}

/**
 * @doc method
 * @id DS.async methods:updateAll
 * @name updateAll
 * @description
 * The "U" in "CRUD". Update items of type `resourceName` with `attrs` according to the criteria specified by `params`.
 * This is useful when you want to update multiple items with the same attributes or you don't want to update the items
 * in the data store until the adapter operation succeeds. The resulting items (by default) will be injected into the
 * data store.
 *
 * ## Signature:
 * ```js
 * DS.updateAll(resourceName, attrs, params[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * var params = {
 *   where: {
 *     author: {
 *       '==': 'John Anderson'
 *     }
 *   }
 * };
 *
 * DS.filter('document', params); // []
 *
 * DS.updateAll('document', 5, {
 *   author: 'Sally'
 * }, params).then(function (documents) {
 *   documents; // The documents that were updated via an adapter
 *              // and now reside in the data store
 *
 *   documents[0].author; // "Sally"
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} attrs The attributes with which to update the items.
 * @param {object} params Parameter object that is serialized into the query string. Default properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Also passed along to the adapter's `updateAll` method. Properties:
 *
 * - `{boolean=}` - `cacheResponse` - Inject the items returned by the adapter into the data store. Default: `true`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{array}` - `items` - The items returned by the adapter.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function updateAll(resourceName, attrs, params, options) {
  var DS = this;
  var deferred = DS.$q.defer();

  try {
    var IA = DS.errors.IA;
    var definition = DS.definitions[resourceName];

    options = options || {};

    if (!definition) {
      throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
    } else if (!DS.utils.isObject(attrs)) {
      throw new IA(errorPrefix(resourceName) + 'attrs: Must be an object!');
    } else if (!DS.utils.isObject(params)) {
      throw new IA(errorPrefix(resourceName) + 'params: Must be an object!');
    } else if (!DS.utils.isObject(options)) {
      throw new IA(errorPrefix(resourceName) + 'options: Must be an object!');
    }

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    if (!('notify' in options)) {
      options.notify = definition.notify;
    }

    deferred.resolve(attrs);

    return deferred.promise
      .then(function (attrs) {
        var func = options.beforeValidate ? DS.$q.promisify(options.beforeValidate) : definition.beforeValidate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        var func = options.validate ? DS.$q.promisify(options.validate) : definition.validate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        var func = options.afterValidate ? DS.$q.promisify(options.afterValidate) : definition.afterValidate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        var func = options.beforeUpdate ? DS.$q.promisify(options.beforeUpdate) : definition.beforeUpdate;
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        if (options.notify) {
          DS.emit(definition, 'beforeUpdate', DS.utils.merge({}, attrs));
        }
        return DS.adapters[options.adapter || definition.defaultAdapter].updateAll(definition, options.serialize ? options.serialize(resourceName, attrs) : definition.serialize(resourceName, attrs), params, options);
      })
      .then(function (res) {
        var func = options.afterUpdate ? DS.$q.promisify(options.afterUpdate) : definition.afterUpdate;
        var attrs = options.deserialize ? options.deserialize(resourceName, res) : definition.deserialize(resourceName, res);
        return func.call(attrs, resourceName, attrs);
      })
      .then(function (attrs) {
        if (options.notify) {
          DS.emit(definition, 'afterUpdate', DS.utils.merge({}, attrs));
        }
        if (options.cacheResponse) {
          return DS.inject(definition.name, attrs, options);
        } else {
          return attrs;
        }
      });
  } catch (err) {
    deferred.reject(err);
    return deferred.promise;
  }
}

module.exports = updateAll;

},{}],64:[function(require,module,exports){
var utils = require('../utils')[0]();

function lifecycleNoop(resourceName, attrs, cb) {
  cb(null, attrs);
}

function Defaults() {
}

Defaults.prototype.idAttribute = 'id';
Defaults.prototype.defaultAdapter = 'DSHttpAdapter';
Defaults.prototype.defaultFilter = function (collection, resourceName, params, options) {
  var _this = this;
  var filtered = collection;
  var where = null;
  var reserved = {
    skip: '',
    offset: '',
    where: '',
    limit: '',
    orderBy: '',
    sort: ''
  };

  if (this.utils.isObject(params.where)) {
    where = params.where;
  } else {
    where = {};
  }

  if (options.allowSimpleWhere) {
    this.utils.forEach(params, function (value, key) {
      if (!(key in reserved) && !(key in where)) {
        where[key] = {
          '==': value
        };
      }
    });
  }

  if (this.utils.isEmpty(where)) {
    where = null;
  }

  if (where) {
    filtered = this.utils.filter(filtered, function (attrs) {
      var first = true;
      var keep = true;
      _this.utils.forEach(where, function (clause, field) {
        if (_this.utils.isString(clause)) {
          clause = {
            '===': clause
          };
        } else if (_this.utils.isNumber(clause) || _this.utils.isBoolean(clause)) {
          clause = {
            '==': clause
          };
        }
        if (_this.utils.isObject(clause)) {
          _this.utils.forEach(clause, function (val, op) {
            if (op === '==') {
              keep = first ? (attrs[field] == val) : keep && (attrs[field] == val);
            } else if (op === '===') {
              keep = first ? (attrs[field] === val) : keep && (attrs[field] === val);
            } else if (op === '!=') {
              keep = first ? (attrs[field] != val) : keep && (attrs[field] != val);
            } else if (op === '!==') {
              keep = first ? (attrs[field] !== val) : keep && (attrs[field] !== val);
            } else if (op === '>') {
              keep = first ? (attrs[field] > val) : keep && (attrs[field] > val);
            } else if (op === '>=') {
              keep = first ? (attrs[field] >= val) : keep && (attrs[field] >= val);
            } else if (op === '<') {
              keep = first ? (attrs[field] < val) : keep && (attrs[field] < val);
            } else if (op === '<=') {
              keep = first ? (attrs[field] <= val) : keep && (attrs[field] <= val);
            } else if (op === 'in') {
              keep = first ? _this.utils.contains(val, attrs[field]) : keep && _this.utils.contains(val, attrs[field]);
            } else if (op === 'notIn') {
              keep = first ? !_this.utils.contains(val, attrs[field]) : keep && !_this.utils.contains(val, attrs[field]);
            } else if (op === '|==') {
              keep = first ? (attrs[field] == val) : keep || (attrs[field] == val);
            } else if (op === '|===') {
              keep = first ? (attrs[field] === val) : keep || (attrs[field] === val);
            } else if (op === '|!=') {
              keep = first ? (attrs[field] != val) : keep || (attrs[field] != val);
            } else if (op === '|!==') {
              keep = first ? (attrs[field] !== val) : keep || (attrs[field] !== val);
            } else if (op === '|>') {
              keep = first ? (attrs[field] > val) : keep || (attrs[field] > val);
            } else if (op === '|>=') {
              keep = first ? (attrs[field] >= val) : keep || (attrs[field] >= val);
            } else if (op === '|<') {
              keep = first ? (attrs[field] < val) : keep || (attrs[field] < val);
            } else if (op === '|<=') {
              keep = first ? (attrs[field] <= val) : keep || (attrs[field] <= val);
            } else if (op === '|in') {
              keep = first ? _this.utils.contains(val, attrs[field]) : keep || _this.utils.contains(val, attrs[field]);
            } else if (op === '|notIn') {
              keep = first ? !_this.utils.contains(val, attrs[field]) : keep || !_this.utils.contains(val, attrs[field]);
            }
            first = false;
          });
        }
      });
      return keep;
    });
  }

  var orderBy = null;

  if (this.utils.isString(params.orderBy)) {
    orderBy = [
      [params.orderBy, 'ASC']
    ];
  } else if (this.utils.isArray(params.orderBy)) {
    orderBy = params.orderBy;
  }

  if (!orderBy && this.utils.isString(params.sort)) {
    orderBy = [
      [params.sort, 'ASC']
    ];
  } else if (!orderBy && this.utils.isArray(params.sort)) {
    orderBy = params.sort;
  }

  // Apply 'orderBy'
  if (orderBy) {
    angular.forEach(orderBy, function (def) {
      if (_this.utils.isString(def)) {
        def = [def, 'ASC'];
      } else if (!_this.utils.isArray(def)) {
        throw new _this.errors.IllegalArgumentError('DS.filter(resourceName[, params][, options]): ' + angular.toJson(def) + ': Must be a string or an array!', { params: { 'orderBy[i]': { actual: typeof def, expected: 'string|array' } } });
      }
      filtered = _this.utils.sort(filtered, function (a, b) {
        var cA = a[def[0]], cB = b[def[0]];
        if (_this.utils.isString(cA)) {
          cA = _this.utils.upperCase(cA);
        }
        if (_this.utils.isString(cB)) {
          cB = _this.utils.upperCase(cB);
        }
        if (def[1] === 'DESC') {
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
    });
  }

  var limit = angular.isNumber(params.limit) ? params.limit : null;
  var skip = null;

  if (angular.isNumber(params.skip)) {
    skip = params.skip;
  } else if (angular.isNumber(params.offset)) {
    skip = params.offset;
  }

  // Apply 'limit' and 'skip'
  if (limit && skip) {
    filtered = this.utils.slice(filtered, skip, Math.min(filtered.length, skip + limit));
  } else if (this.utils.isNumber(limit)) {
    filtered = this.utils.slice(filtered, 0, Math.min(filtered.length, limit));
  } else if (this.utils.isNumber(skip)) {
    if (skip < filtered.length) {
      filtered = this.utils.slice(filtered, skip);
    } else {
      filtered = [];
    }
  }

  return filtered;
};
Defaults.prototype.baseUrl = '';
Defaults.prototype.endpoint = '';
Defaults.prototype.useClass = true;
Defaults.prototype.keepChangeHistory = false;
Defaults.prototype.resetHistoryOnInject = true;
Defaults.prototype.eagerInject = false;
Defaults.prototype.eagerEject = false;
Defaults.prototype.notify = true;
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeValidate
 * @name defaults.beforeValidate
 * @description
 * Called before the `validate` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeValidate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeValidate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeValidate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.validate
 * @name defaults.validate
 * @description
 * Called before the `afterValidate` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * validate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.validate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.validate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterValidate
 * @name defaults.afterValidate
 * @description
 * Called before the `beforeCreate` or `beforeUpdate` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterValidate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterValidate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterValidate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeCreate
 * @name defaults.beforeCreate
 * @description
 * Called before the `create` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeCreate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeCreate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeCreate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterCreate
 * @name defaults.afterCreate
 * @description
 * Called after the `create` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterCreate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterCreate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterCreate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeUpdate
 * @name defaults.beforeUpdate
 * @description
 * Called before the `update` or `save` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeUpdate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeUpdate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeUpdate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterUpdate
 * @name defaults.afterUpdate
 * @description
 * Called after the `update` or `save` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterUpdate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterUpdate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterUpdate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeDestroy
 * @name defaults.beforeDestroy
 * @description
 * Called before the `destroy` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeDestroy(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeDestroy = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeDestroy = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterDestroy
 * @name defaults.afterDestroy
 * @description
 * Called after the `destroy` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterDestroy(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterDestroy = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterDestroy = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeInject
 * @name defaults.beforeInject
 * @description
 * Called before the `inject` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeInject(resourceName, attrs)
 * ```
 *
 * Throwing an error inside this step will cancel the injection.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeInject = function (resourceName, attrs) {
 *      // do somthing/inspect/modify attrs
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeInject = function (resourceName, attrs) {
  return attrs;
};
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterInject
 * @name defaults.afterInject
 * @description
 * Called after the `inject` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterInject(resourceName, attrs)
 * ```
 *
 * Throwing an error inside this step will cancel the injection.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterInject = function (resourceName, attrs) {
 *      // do somthing/inspect/modify attrs
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterInject = function (resourceName, attrs) {
  return attrs;
};
/**
 * @doc property
 * @id DSProvider.properties:defaults.serialize
 * @name defaults.serialize
 * @description
 * Your server might expect a custom request object rather than the plain POJO payload. Use `serialize` to
 * create your custom request object.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.serialize = function (resourceName, data) {
 *      return {
 *          payload: data
 *      };
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource to serialize.
 * @param {object} data Data to be sent to the server.
 * @returns {*} By default returns `data` as-is.
 */
Defaults.prototype.serialize = function (resourceName, data) {
  return data;
};

/**
 * @doc property
 * @id DSProvider.properties:defaults.deserialize
 * @name DSProvider.properties:defaults.deserialize
 * @description
 * Your server might return a custom response object instead of the plain POJO payload. Use `deserialize` to
 * pull the payload out of your response object so angular-data can use it.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.deserialize = function (resourceName, data) {
 *      return data ? data.payload : data;
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource to deserialize.
 * @param {object} data Response object from `$http()`.
 * @returns {*} By default returns `data.data`.
 */
Defaults.prototype.deserialize = function (resourceName, data) {
  return data ? (data.data ? data.data : data) : data;
};

/**
 * @doc property
 * @id DSProvider.properties:defaults.events
 * @name DSProvider.properties:defaults.events
 * @description
 * Whether to broadcast, emit, or disable DS events on the `$rootScope`.
 *
 * Possible values are: `"broadcast"`, `"emit"`, `"none"`.
 *
 * `"broadcast"` events will be [broadcasted](https://code.angularjs.org/1.2.22/docs/api/ng/type/$rootScope.Scope#$broadcast) on the `$rootScope`.
 *
 * `"emit"` events will be [emitted](https://code.angularjs.org/1.2.22/docs/api/ng/type/$rootScope.Scope#$emit) on the `$rootScope`.
 *
 * `"none"` events will be will neither be broadcasted nor emitted.
 *
 * Current events are `"DS.inject"` and `"DS.eject"`.
 *
 * Overridable per resource.
 */
Defaults.prototype.events = 'broadcast';

/**
 * @doc function
 * @id DSProvider
 * @name DSProvider
 */
function DSProvider() {

  /**
   * @doc property
   * @id DSProvider.properties:defaults
   * @name defaults
   * @description
   * See the [configuration guide](/documentation/guide/configure/global).
   *
   * Properties:
   *
   * - `{string}` - `baseUrl` - The url relative to which all AJAX requests will be made.
   * - `{string}` - `idAttribute` - Default: `"id"` - The attribute that specifies the primary key for resources.
   * - `{string}` - `defaultAdapter` - Default: `"DSHttpAdapter"`
   * - `{string}` - `events` - Default: `"broadcast"` [DSProvider.defaults.events](/documentation/api/angular-data/DSProvider.properties:defaults.events)
   * - `{function}` - `filter` - Default: See [angular-data query language](/documentation/guide/queries/custom).
   * - `{function}` - `beforeValidate` - See [DSProvider.defaults.beforeValidate](/documentation/api/angular-data/DSProvider.properties:defaults.beforeValidate). Default: No-op
   * - `{function}` - `validate` - See [DSProvider.defaults.validate](/documentation/api/angular-data/DSProvider.properties:defaults.validate). Default: No-op
   * - `{function}` - `afterValidate` - See [DSProvider.defaults.afterValidate](/documentation/api/angular-data/DSProvider.properties:defaults.afterValidate). Default: No-op
   * - `{function}` - `beforeCreate` - See [DSProvider.defaults.beforeCreate](/documentation/api/angular-data/DSProvider.properties:defaults.beforeCreate). Default: No-op
   * - `{function}` - `afterCreate` - See [DSProvider.defaults.afterCreate](/documentation/api/angular-data/DSProvider.properties:defaults.afterCreate). Default: No-op
   * - `{function}` - `beforeUpdate` - See [DSProvider.defaults.beforeUpdate](/documentation/api/angular-data/DSProvider.properties:defaults.beforeUpdate). Default: No-op
   * - `{function}` - `afterUpdate` - See [DSProvider.defaults.afterUpdate](/documentation/api/angular-data/DSProvider.properties:defaults.afterUpdate). Default: No-op
   * - `{function}` - `beforeDestroy` - See [DSProvider.defaults.beforeDestroy](/documentation/api/angular-data/DSProvider.properties:defaults.beforeDestroy). Default: No-op
   * - `{function}` - `afterDestroy` - See [DSProvider.defaults.afterDestroy](/documentation/api/angular-data/DSProvider.properties:defaults.afterDestroy). Default: No-op
   * - `{function}` - `afterInject` - See [DSProvider.defaults.afterInject](/documentation/api/angular-data/DSProvider.properties:defaults.afterInject). Default: No-op
   * - `{function}` - `beforeInject` - See [DSProvider.defaults.beforeInject](/documentation/api/angular-data/DSProvider.properties:defaults.beforeInject). Default: No-op
   * - `{function}` - `serialize` - See [DSProvider.defaults.serialize](/documentation/api/angular-data/DSProvider.properties:defaults.serialize). Default: No-op
   * - `{function}` - `deserialize` - See [DSProvider.defaults.deserialize](/documentation/api/angular-data/DSProvider.properties:defaults.deserialize). Default: No-op
   */
  var defaults = this.defaults = new Defaults();

  this.$get = [
    '$rootScope', '$log', '$q', 'DSHttpAdapter', 'DSLocalStorageAdapter', 'DSUtils', 'DSErrors',
    function ($rootScope, $log, $q, DSHttpAdapter, DSLocalStorageAdapter, DSUtils, DSErrors) {

      var syncMethods = require('./sync_methods'),
        asyncMethods = require('./async_methods'),
        cache;

      try {
        cache = angular.injector(['angular-data.DSCacheFactory']).get('DSCacheFactory');
      } catch (err) {
        $log.debug('DSCacheFactory is unavailable. Resorting to the lesser capabilities of $cacheFactory.');
        cache = angular.injector(['ng']).get('$cacheFactory');
      }

      /**
       * @doc interface
       * @id DS
       * @name DS
       * @description
       * Public data store interface. Consists of several properties and a number of methods. Injectable as `DS`.
       *
       * See the [guide](/documentation/guide/overview/index).
       */
      var DS = {
        emit: function (definition, event) {
          var args = Array.prototype.slice.call(arguments, 2);
          args.unshift(definition.name);
          args.unshift('DS.' + event);
          definition.emit.apply(definition, args);
          if (definition.events === 'broadcast') {
            $rootScope.$broadcast.apply($rootScope, args);
          } else if (definition.events === 'emit') {
            $rootScope.$emit.apply($rootScope, args);
          }
        },
        $rootScope: $rootScope,
        $log: $log,
        $q: $q,

        cacheFactory: cache,

        /**
         * @doc property
         * @id DS.properties:defaults
         * @name defaults
         * @description
         * Reference to [DSProvider.defaults](/documentation/api/api/DSProvider.properties:defaults).
         */
        defaults: defaults,

        /*!
         * @doc property
         * @id DS.properties:store
         * @name store
         * @description
         * Meta data for each registered resource.
         */
        store: {},

        /*!
         * @doc property
         * @id DS.properties:definitions
         * @name definitions
         * @description
         * Registered resource definitions available to the data store.
         */
        definitions: {},

        /**
         * @doc property
         * @id DS.properties:adapters
         * @name adapters
         * @description
         * Registered adapters available to the data store. Object consists of key-values pairs where the key is
         * the name of the adapter and the value is the adapter itself.
         */
        adapters: {
          DSHttpAdapter: DSHttpAdapter,
          DSLocalStorageAdapter: DSLocalStorageAdapter
        },

        /**
         * @doc property
         * @id DS.properties:errors
         * @name errors
         * @description
         * References to the various [error types](/documentation/api/api/errors) used by angular-data.
         */
        errors: DSErrors,

        /*!
         * @doc property
         * @id DS.properties:utils
         * @name utils
         * @description
         * Utility functions used internally by angular-data.
         */
        utils: DSUtils
      };

      DSUtils.deepFreeze(syncMethods);
      DSUtils.deepFreeze(asyncMethods);

      DSUtils.deepMixIn(DS, syncMethods);
      DSUtils.deepMixIn(DS, asyncMethods);

      DSUtils.deepFreeze(DS.errors);
      DSUtils.deepFreeze(DS.utils);

      DSHttpAdapter.DS = DS;
      DSLocalStorageAdapter.DS = DS;

      if (typeof Object.observe !== 'function' ||
        typeof Array.observe !== 'function') {
        $rootScope.$watch(function () {
          // Throttle angular-data's digest loop to tenths of a second
          return new Date().getTime() / 100 | 0;
        }, function () {
          DS.digest();
        });
      }

      return DS;
    }
  ];
}

module.exports = DSProvider;

},{"../utils":89,"./async_methods":58,"./sync_methods":78}],65:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.bindAll(scope, expr, ' + resourceName + ', params[, cb]): ';
}

/**
 * @doc method
 * @id DS.sync methods:bindAll
 * @name bindAll
 * @description
 * Bind a collection of items in the data store to `scope` under the property specified by `expr` filtered by `params`.
 *
 * ## Signature:
 * ```js
 * DS.bindAll(scope, expr, resourceName, params[, cb])
 * ```
 *
 * ## Example:
 *
 * ```js
 * // bind the documents with ownerId of 5 to the 'docs' property of the $scope
 * var deregisterFunc = DS.bindAll($scope, 'docs', 'document', {
 *   where: {
 *     ownerId: 5
 *   }
 * });
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {object} scope The scope to bind to.
 * @param {string} expr An expression used to bind to the scope. Can be used to set nested keys, i.e. `"user.comments"`.
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is used in filtering the collection. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {function=} cb Optional callback executed on change. Signature: `cb(err, items)`.
 *
 * @returns {function} Scope $watch deregistration function.
 */
function bindAll(scope, expr, resourceName, params, cb) {
  var DS = this;
  var IA = DS.errors.IA;

  params = params || {};

  if (!DS.utils.isObject(scope)) {
    throw new IA(errorPrefix(resourceName) + 'scope: Must be an object!');
  } else if (!DS.utils.isString(expr)) {
    throw new IA(errorPrefix(resourceName) + 'expr: Must be a string!');
  } else if (!DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (!DS.utils.isObject(params)) {
    throw new IA(errorPrefix(resourceName) + 'params: Must be an object!');
  }

  try {
    return scope.$watch(function () {
      return DS.lastModified(resourceName);
    }, function () {
      var items = DS.filter(resourceName, params);
      DS.utils.set(scope, expr, items);
      if (cb) {
        cb(null, items);
      }
    });
  } catch (err) {
    if (cb) {
      cb(err);
    } else {
      throw err;
    }
  }
}

module.exports = bindAll;

},{}],66:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.bindOne(scope, expr, ' + resourceName + ', id[, cb]): ';
}

/**
 * @doc method
 * @id DS.sync methods:bindOne
 * @name bindOne
 * @description
 * Bind an item in the data store to `scope` under the property specified by `expr`.
 *
 * ## Signature:
 * ```js
 * DS.bindOne(scope, expr, resourceName, id[, cb])
 * ```
 *
 * ## Example:
 *
 * ```js
 * // bind the document with id 5 to the 'doc' property of the $scope
 * var deregisterFunc = DS.bindOne($scope, 'doc', 'document', 5);
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {object} scope The scope to bind to.
 * @param {string} expr An expression used to bind to the scope. Can be used to set nested keys, i.e. `"user.profile"`.
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to bind.
 * @param {function=} cb Optional callback executed on change. Signature: `cb(err, item)`.
 * @returns {function} Scope $watch deregistration function.
 */
function bindOne(scope, expr, resourceName, id, cb) {
  var DS = this;
  var IA = DS.errors.IA;

  id = DS.utils.resolveId(DS.definitions[resourceName], id);
  if (!DS.utils.isObject(scope)) {
    throw new IA(errorPrefix(resourceName) + 'scope: Must be an object!');
  } else if (!DS.utils.isString(expr)) {
    throw new IA(errorPrefix(resourceName) + 'expr: Must be a string!');
  } else if (!DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new IA(errorPrefix(resourceName) + 'id: Must be a string or a number!');
  }

  try {
    return scope.$watch(function () {
      return DS.lastModified(resourceName, id);
    }, function () {
      var item = DS.get(resourceName, id);
      DS.utils.set(scope, expr, item);
      if (cb) {
        cb(null, item);
      }
    });
  } catch (err) {
    if (cb) {
      cb(err);
    } else {
      throw err;
    }
  }
}

module.exports = bindOne;

},{}],67:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.changeHistory(' + resourceName + ', id): ';
}

/**
 * @doc method
 * @id DS.sync methods:changeHistory
 * @name changeHistory
 * @description
 * Synchronously return the changeHistory of the item of the type specified by `resourceName` that has the primary key
 * specified by `id`. This object represents the history of changes in the item since the item was last injected or
 * re-injected (on save, update, etc.) into the data store.
 *
 * ## Signature:
 * ```js
 * DS.changeHistory(resourceName, id)
 * ```
 *
 * ## Example:
 *
 * ```js
 * var d = DS.get('document', 5); // { author: 'John Anderson', id: 5 }
 *
 * d.author = 'Sally';
 *
 * // You might have to do $scope.$apply() first
 *
 * DS.changeHistory('document', 5); // [{...}] Array of changes
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number=} id The primary key of the item for which to retrieve the changeHistory.
 * @returns {object} The changeHistory of the item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function changeHistory(resourceName, id) {
  var DS = this;
  var DSUtils = DS.utils;
  var definition = DS.definitions[resourceName];
  var resource = DS.store[resourceName];

  id = DS.utils.resolveId(definition, id);
  if (resourceName && !DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (id && !DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new DS.errors.IA(errorPrefix(resourceName) + 'id: Must be a string or a number!');
  }

  if (!definition.keepChangeHistory) {
    DS.$log.warn(errorPrefix(resourceName) + 'changeHistory is disabled for this resource!');
  } else {
    if (resourceName) {
      var item = DS.get(resourceName, id);
      if (item) {
        return resource.changeHistories[id];
      }
    } else {
      return resource.changeHistory;
    }
  }
}

module.exports = changeHistory;

},{}],68:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.changes(' + resourceName + ', id): ';
}

/**
 * @doc method
 * @id DS.sync methods:changes
 * @name changes
 * @description
 * Synchronously return the changes object of the item of the type specified by `resourceName` that has the primary key
 * specified by `id`. This object represents the diff between the item in its current state and the state of the item
 * the last time it was saved via an adapter.
 *
 * ## Signature:
 * ```js
 * DS.changes(resourceName, id)
 * ```
 *
 * ## Example:
 *
 * ```js
 * var d = DS.get('document', 5); // { author: 'John Anderson', id: 5 }
 *
 * d.author = 'Sally';
 *
 * // You might have to do $scope.$apply() first
 *
 * DS.changes('document', 5); // {...} Object describing changes
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item of the changes to retrieve.
 * @returns {object} The changes of the item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function changes(resourceName, id) {
  var DS = this;

  id = DS.utils.resolveId(DS.definitions[resourceName], id);
  if (!DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new DS.errors.IA(errorPrefix(resourceName) + 'id: Must be a string or a number!');
  }

  var item = DS.get(resourceName, id);
  if (item) {
    DS.store[resourceName].observers[id].deliver();
    var diff = DS.utils.diffObjectFromOldObject(item, DS.store[resourceName].previousAttributes[id]);
    DS.utils.forEach(diff, function (changeset, name) {
      var toKeep = [];
      DS.utils.forEach(changeset, function (value, field) {
        if (!angular.isFunction(value)) {
          toKeep.push(field);
        }
      });
      diff[name] = DS.utils.pick(diff[name], toKeep);
    });
    DS.utils.forEach(DS.definitions[resourceName].relationFields, function (field) {
      delete diff.added[field];
      delete diff.removed[field];
      delete diff.changed[field];
    });
    return diff;
  }
}

module.exports = changes;

},{}],69:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.compute(' + resourceName + ', instance): ';
}

function _compute(fn, field) {
  var _this = this;
  var args = [];
  angular.forEach(fn.deps, function (dep) {
    args.push(_this[dep]);
  });
  // compute property
  this[field] = fn[fn.length - 1].apply(this, args);
}

/**
 * @doc method
 * @id DS.sync methods:compute
 * @name compute
 * @description
 * Force the given instance or the item with the given primary key to recompute its computed properties.
 *
 * ## Signature:
 * ```js
 * DS.compute(resourceName, instance)
 * ```
 *
 * ## Example:
 *
 * ```js
 * var User = DS.defineResource({
 *   name: 'user',
 *   computed: {
 *     fullName: ['first', 'last', function (first, last) {
 *       return first + ' ' + last;
 *     }]
 *   }
 * });
 *
 * var user = User.createInstance({ first: 'John', last: 'Doe' });
 * user.fullName; // undefined
 *
 * User.compute(user);
 *
 * user.fullName; // "John Doe"
 *
 * var user2 = User.inject({ id: 2, first: 'Jane', last: 'Doe' });
 * user2.fullName; // undefined
 *
 * User.compute(1);
 *
 * user2.fullName; // "Jane Doe"
 *
 * // if you don't pass useClass: false then you can do:
 * var user3 = User.createInstance({ first: 'Sally', last: 'Doe' });
 * user3.fullName; // undefined
 * user3.DSCompute();
 * user3.fullName; // "Sally Doe"
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object|string|number} instance Instance or primary key of the instance (must be in the store) for which to recompute properties.
 * @returns {Object} The instance.
 */
function compute(resourceName, instance) {
  var DS = this;
  var IA = DS.errors.IA;
  var definition = DS.definitions[resourceName];

  instance = DS.utils.resolveItem(DS.store[resourceName], instance);
  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (!DS.utils.isObject(instance) && !DS.utils.isString(instance) && !DS.utils.isNumber(instance)) {
    throw new IA(errorPrefix(resourceName) + 'instance: Must be an object, string or number!');
  }

  if (DS.utils.isString(instance) || DS.utils.isNumber(instance)) {
    instance = DS.get(resourceName, instance);
  }

  DS.utils.forEach(definition.computed, function (fn, field) {
    _compute.call(instance, fn, field);
  });

  return instance;
}

module.exports = {
  compute: compute,
  _compute: _compute
};

},{}],70:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.createInstance(' + resourceName + '[, attrs][, options]): ';
}

/**
 * @doc method
 * @id DS.sync methods:createInstance
 * @name createInstance
 * @description
 * Return a new instance of the specified resource.
 *
 * ## Signature:
 * ```js
 * DS.createInstance(resourceName[, attrs][, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * var User = DS.defineResource({
 *   name: 'user',
 *   methods: {
 *     say: function () {
 *       return 'hi';
 *     }
 *   }
 * });
 *
 * var user = User.createInstance();
 * var user2 = DS.createInstance('user');
 *
 * user instanceof User[User.class]; // true
 * user2 instanceof User[User.class]; // true
 *
 * user.say(); // hi
 * user2.say(); // hi
 *
 * var user3 = User.createInstance({ name: 'John' }, { useClass: false });
 * var user4 = DS.createInstance('user', { name: 'John' }, { useClass: false });
 *
 * user3; // { name: 'John' }
 * user3 instanceof User[User.class]; // false
 *
 * user4; // { name: 'John' }
 * user4 instanceof User[User.class]; // false
 *
 * user3.say(); // TypeError: undefined is not a function
 * user4.say(); // TypeError: undefined is not a function
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object=} attrs Optional attributes to mix in to the new instance.
 * @param {object=} options Optional configuration. Properties:
 *
 * - `{boolean=}` - `useClass` - Whether to wrap the injected item with the resource's instance constructor.
 *
 * @returns {object} The new instance.
 */
function createInstance(resourceName, attrs, options) {
  var DS = this;
  var IA = DS.errors.IA;
  var definition = DS.definitions[resourceName];

  attrs = attrs || {};
  options = options || {};

  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (attrs && !DS.utils.isObject(attrs)) {
    throw new IA(errorPrefix(resourceName) + 'attrs: Must be an object!');
  } else if (!DS.utils.isObject(options)) {
    throw new IA(errorPrefix(resourceName) + 'options: Must be an object!');
  }

  if (!('useClass' in options)) {
    options.useClass = definition.useClass;
  }

  var item;

  if (options.useClass) {
    var Func = definition[definition.class];
    item = new Func();
  } else {
    item = {};
  }
  return DS.utils.deepMixIn(item, attrs);
}

module.exports = createInstance;

},{}],71:[function(require,module,exports){
/*jshint evil:true*/
var errorPrefix = 'DS.defineResource(definition): ';

function Resource(utils, options) {

  utils.deepMixIn(this, options);

  if ('endpoint' in options) {
    this.endpoint = options.endpoint;
  } else {
    this.endpoint = this.name;
  }
}

var methodsToProxy = [
  'bindAll',
  'bindOne',
  'changes',
  'changeHistory',
  'create',
  'createInstance',
  'destroy',
  'destroyAll',
  'eject',
  'ejectAll',
  'filter',
  'find',
  'findAll',
  'get',
  'hasChanges',
  'inject',
  'lastModified',
  'lastSaved',
  'link',
  'linkAll',
  'linkInverse',
  'loadRelations',
  'previous',
  'refresh',
  'save',
  'update',
  'updateAll'
];

/**
 * @doc method
 * @id DS.sync methods:defineResource
 * @name defineResource
 * @description
 * Define a resource and register it with the data store.
 *
 * ## Signature:
 * ```js
 * DS.defineResource(definition)
 * ```
 *
 * ## Example:
 *
 * ```js
 *  DS.defineResource({
 *      name: 'document',
 *      idAttribute: '_id',
 *      endpoint: '/documents
 *      baseUrl: 'http://myapp.com/api',
 *      beforeDestroy: function (resourceName attrs, cb) {
 *          console.log('looks good to me');
 *          cb(null, attrs);
 *      }
 *  });
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 *
 * @param {string|object} definition Name of resource or resource definition object: Properties:
 *
 * - `{string}` - `name` - The name by which this resource will be identified.
 * - `{string="id"}` - `idAttribute` - The attribute that specifies the primary key for this resource.
 * - `{string=}` - `endpoint` - The attribute that specifies the primary key for this resource. Default is the value of `name`.
 * - `{string=}` - `baseUrl` - The url relative to which all AJAX requests will be made.
 * - `{boolean=}` - `useClass` - Whether to use a wrapper class created from the ProperCase name of the resource. The wrapper will always be used for resources that have `methods` defined.
 * - `{boolean=}` - `keepChangeHistory` - Whether to keep a history of changes for items in the data store. Default: `false`.
 * - `{boolean=}` - `resetHistoryOnInject` - Whether to reset the history of changes for items when they are injected of re-injected into the data store. This will also reset an item's previous attributes. Default: `true`.
 * - `{function=}` - `defaultFilter` - Override the filtering used internally by `DS.filter` with you own function here.
 * - `{*=}` - `meta` - A property reserved for developer use. This will never be used by the API.
 * - `{object=}` - `methods` - If provided, items of this resource will be wrapped in a constructor function that is
 * empty save for the attributes in this option which will be mixed in to the constructor function prototype. Enabling
 * this feature for this resource will incur a slight performance penalty, but allows you to give custom behavior to what
 * are now "instances" of this resource.
 * - `{function=}` - `beforeValidate` - Lifecycle hook. Overrides global. Signature: `beforeValidate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `validate` - Lifecycle hook. Overrides global. Signature: `validate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterValidate` - Lifecycle hook. Overrides global. Signature: `afterValidate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeCreate` - Lifecycle hook. Overrides global. Signature: `beforeCreate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterCreate` - Lifecycle hook. Overrides global. Signature: `afterCreate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeUpdate` - Lifecycle hook. Overrides global. Signature: `beforeUpdate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterUpdate` - Lifecycle hook. Overrides global. Signature: `afterUpdate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeDestroy` - Lifecycle hook. Overrides global. Signature: `beforeDestroy(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterDestroy` - Lifecycle hook. Overrides global. Signature: `afterDestroy(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeInject` - Lifecycle hook. Overrides global. Signature: `beforeInject(resourceName, attrs)`.
 * - `{function=}` - `afterInject` - Lifecycle hook. Overrides global. Signature: `afterInject(resourceName, attrs)`.
 * - `{function=}` - `serialize` - Serialization hook. Overrides global. Signature: `serialize(resourceName, attrs)`.
 * - `{function=}` - `deserialize` - Deserialization hook. Overrides global. Signature: `deserialize(resourceName, attrs)`.
 *
 * See [DSProvider.defaults](/documentation/api/angular-data/DSProvider.properties:defaults).
 */
function defineResource(definition) {
  var DS = this;
  var DSUtils = DS.utils;
  var definitions = DS.definitions;
  var IA = DS.errors.IA;

  if (DSUtils.isString(definition)) {
    definition = definition.replace(/\s/gi, '');
    definition = {
      name: definition
    };
  }
  if (!DSUtils.isObject(definition)) {
    throw new IA(errorPrefix + 'definition: Must be an object!');
  } else if (!DSUtils.isString(definition.name)) {
    throw new IA(errorPrefix + 'definition.name: Must be a string!');
  } else if (definition.idAttribute && !DSUtils.isString(definition.idAttribute)) {
    throw new IA(errorPrefix + 'definition.idAttribute: Must be a string!');
  } else if (definition.endpoint && !DSUtils.isString(definition.endpoint)) {
    throw new IA(errorPrefix + 'definition.endpoint: Must be a string!');
  } else if (DS.store[definition.name]) {
    throw new DS.errors.R(errorPrefix + definition.name + ' is already registered!');
  }

  try {
    // Inherit from global defaults
    Resource.prototype = DS.defaults;
    definitions[definition.name] = new Resource(DSUtils, definition);

    var def = definitions[definition.name];

    // Setup nested parent configuration
    if (def.relations) {
      def.relationList = [];
      def.relationFields = [];
      DSUtils.forEach(def.relations, function (relatedModels, type) {
        DSUtils.forEach(relatedModels, function (defs, relationName) {
          if (!DSUtils.isArray(defs)) {
            relatedModels[relationName] = [defs];
          }
          DSUtils.forEach(relatedModels[relationName], function (d) {
            d.type = type;
            d.relation = relationName;
            d.name = def.name;
            def.relationList.push(d);
            def.relationFields.push(d.localField);
          });
        });
      });
      if (def.relations.belongsTo) {
        DSUtils.forEach(def.relations.belongsTo, function (relatedModel, modelName) {
          DSUtils.forEach(relatedModel, function (relation) {
            if (relation.parent) {
              def.parent = modelName;
              def.parentKey = relation.localKey;
            }
          });
        });
      }
      DSUtils.deepFreeze(def.relations);
      DSUtils.deepFreeze(def.relationList);
    }

    def.getEndpoint = function (attrs, options) {
      var parent = this.parent;
      var parentKey = this.parentKey;
      var item;
      var endpoint;
      var thisEndpoint = options.endpoint || this.endpoint;
      delete options.endpoint;
      options = options || {};
      options.params = options.params || {};
      if (parent && parentKey && definitions[parent] && options.params[parentKey] !== false) {
        if (DSUtils.isNumber(attrs) || DSUtils.isString(attrs)) {
          item = DS.get(this.name, attrs);
        }
        if (DSUtils.isObject(attrs) && parentKey in attrs) {
          delete options.params[parentKey];
          endpoint = DSUtils.makePath(definitions[parent].getEndpoint(attrs, options), attrs[parentKey], thisEndpoint);
        } else if (item && parentKey in item) {
          delete options.params[parentKey];
          endpoint = DSUtils.makePath(definitions[parent].getEndpoint(attrs, options), item[parentKey], thisEndpoint);
        } else if (options && options.params[parentKey]) {
          endpoint = DSUtils.makePath(definitions[parent].getEndpoint(attrs, options), options.params[parentKey], thisEndpoint);
          delete options.params[parentKey];
        }
      }
      if (options.params[parentKey] === false) {
        delete options.params[parentKey];
      }
      return endpoint || thisEndpoint;
    };

    // Remove this in v0.11.0 and make a breaking change notice
    // the the `filter` option has been renamed to `defaultFilter`
    if (def.filter) {
      def.defaultFilter = def.filter;
      delete def.filter;
    }

    // Setup the cache
    var cache = DS.cacheFactory('DS.' + def.name, {
      maxAge: def.maxAge || null,
      recycleFreq: def.recycleFreq || 1000,
      cacheFlushInterval: def.cacheFlushInterval || null,
      deleteOnExpire: def.deleteOnExpire || 'none',
      onExpire: function (id) {
        var item = DS.eject(def.name, id);
        if (DSUtils.isFunction(def.onExpire)) {
          def.onExpire(id, item);
        }
      },
      capacity: Number.MAX_VALUE,
      storageMode: 'memory',
      storageImpl: null,
      disabled: false,
      storagePrefix: 'DS.' + def.name
    });

    // Create the wrapper class for the new resource
    def.class = DSUtils.pascalCase(definition.name);
    eval('function ' + def.class + '() {}');
    def[def.class] = eval(def.class);

    // Apply developer-defined methods
    if (def.methods) {
      DSUtils.deepMixIn(def[def.class].prototype, def.methods);
    }

    // Prepare for computed properties
    if (def.computed) {
      DSUtils.forEach(def.computed, function (fn, field) {
        if (angular.isFunction(fn)) {
          def.computed[field] = [fn];
          fn = def.computed[field];
        }
        if (def.methods && field in def.methods) {
          DS.$log.warn(errorPrefix + 'Computed property "' + field + '" conflicts with previously defined prototype method!');
        }
        var deps;
        if (fn.length === 1) {
          var match = fn[0].toString().match(/function.*?\(([\s\S]*?)\)/);
          deps = match[1].split(',');
          def.computed[field] = deps.concat(fn);
          fn = def.computed[field];
          if (deps.length) {
            DS.$log.warn(errorPrefix + 'Use the computed property array syntax for compatibility with minified code!');
          }
        }
        deps = fn.slice(0, fn.length - 1);
        angular.forEach(deps, function (val, index) {
          deps[index] = val.trim();
        });
        fn.deps = DSUtils.filter(deps, function (dep) {
          return !!dep;
        });
      });

      def[def.class].prototype.DSCompute = function () {
        return DS.compute(def.name, this);
      };
    }

    def[def.class].prototype.DSUpdate = function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(this[def.idAttribute]);
      args.unshift(def.name);
      return DS.update.apply(DS, args);
    };

    def[def.class].prototype.DSSave = function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(this[def.idAttribute]);
      args.unshift(def.name);
      return DS.save.apply(DS, args);
    };

    // Initialize store data for the new resource
    DS.store[def.name] = {
      collection: [],
      completedQueries: {},
      pendingQueries: {},
      index: cache,
      modified: {},
      saved: {},
      previousAttributes: {},
      observers: {},
      changeHistories: {},
      changeHistory: [],
      collectionModified: 0
    };

    // Proxy DS methods with shorthand ones
    angular.forEach(methodsToProxy, function (name) {
      if (name === 'bindOne' || name === 'bindAll') {
        def[name] = function () {
          var args = Array.prototype.slice.call(arguments);
          args.splice(2, 0, def.name);
          return DS[name].apply(DS, args);
        };
      } else {
        def[name] = function () {
          var args = Array.prototype.slice.call(arguments);
          args.unshift(def.name);
          return DS[name].apply(DS, args);
        };
      }
    });

    def.beforeValidate = DS.$q.promisify(def.beforeValidate);
    def.validate = DS.$q.promisify(def.validate);
    def.afterValidate = DS.$q.promisify(def.afterValidate);
    def.beforeCreate = DS.$q.promisify(def.beforeCreate);
    def.afterCreate = DS.$q.promisify(def.afterCreate);
    def.beforeUpdate = DS.$q.promisify(def.beforeUpdate);
    def.afterUpdate = DS.$q.promisify(def.afterUpdate);
    def.beforeDestroy = DS.$q.promisify(def.beforeDestroy);
    def.afterDestroy = DS.$q.promisify(def.afterDestroy);

    // Mix-in events
    DSUtils.Events(def);

    return def;
  } catch (err) {
    DS.$log.error(err);
    delete definitions[definition.name];
    delete DS.store[definition.name];
    throw err;
  }
}

module.exports = defineResource;

},{}],72:[function(require,module,exports){
var observe = require('../../../lib/observe-js/observe-js');

/**
 * @doc method
 * @id DS.sync methods:digest
 * @name digest
 * @description
 * Trigger a digest loop that checks for changes and updates the `lastModified` timestamp if an object has changed.
 * Anything $watching `DS.lastModified(...)` will detect the updated timestamp and execute the callback function. If
 * your browser supports `Object.observe` then this function has no effect.
 *
 * ## Signature:
 * ```js
 * DS.digest()
 * ```
 *
 * ## Example:
 *
 * ```js
 * Works like $scope.$apply()
 * ```
 *
 */
function digest() {
  if (!this.$rootScope.$$phase) {
    this.$rootScope.$apply(function () {
      observe.Platform.performMicrotaskCheckpoint();
    });
  } else {
    observe.Platform.performMicrotaskCheckpoint();
  }
}

module.exports = digest;

},{"../../../lib/observe-js/observe-js":1}],73:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.eject(' + resourceName + ', ' + id + '): ';
}

function _eject(definition, resource, id, options) {
  var item;
  var DS = this;
  var found = false;
  for (var i = 0; i < resource.collection.length; i++) {
    if (resource.collection[i][definition.idAttribute] == id) {
      item = resource.collection[i];
      found = true;
      break;
    }
  }
  if (found) {
    this.unlinkInverse(definition.name, id);
    resource.collection.splice(i, 1);
    resource.observers[id].close();
    delete resource.observers[id];

    resource.index.remove(id);
    delete resource.previousAttributes[id];
    delete resource.completedQueries[id];
    delete resource.pendingQueries[id];
    DS.utils.forEach(resource.changeHistories[id], function (changeRecord) {
      DS.utils.remove(resource.changeHistory, changeRecord);
    });
    delete resource.changeHistories[id];
    delete resource.modified[id];
    delete resource.saved[id];
    resource.collectionModified = this.utils.updateTimestamp(resource.collectionModified);

    if (options.notify) {
      this.emit(definition, 'eject', item);
    }

    return item;
  }
}

/**
 * @doc method
 * @id DS.sync methods:eject
 * @name eject
 * @description
 * Eject the item of the specified type that has the given primary key from the data store. Ejection only removes items
 * from the data store and does not attempt to destroy items via an adapter.
 *
 * ## Signature:
 * ```js
 * DS.eject(resourceName[, id])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
 *
 * DS.eject('document', 45);
 *
 * DS.get('document', 45); // undefined
 * ```
 *
 * ```js
 * $rootScope.$on('DS.eject', function ($event, resourceName, ejected) {...});
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to eject.
 * @param {object=} options Optional configuration.
 * @returns {object} A reference to the item that was ejected from the data store.
 */
function eject(resourceName, id, options) {
  var DS = this;
  var definition = DS.definitions[resourceName];
  options = options || {};

  id = DS.utils.resolveId(definition, id);
  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new DS.errors.IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
  }
  var resource = DS.store[resourceName];
  var ejected;

  if (!('notify' in options)) {
    options.notify = definition.notify;
  }

  if (!DS.$rootScope.$$phase) {
    DS.$rootScope.$apply(function () {
      ejected = _eject.call(DS, definition, resource, id, options);
    });
  } else {
    ejected = _eject.call(DS, definition, resource, id, options);
  }

  return ejected;
}

module.exports = eject;

},{}],74:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.ejectAll(' + resourceName + '[, params]): ';
}

function _ejectAll(definition, resource, params, options) {
  var DS = this;
  var queryHash = DS.utils.toJson(params);
  var items = DS.filter(definition.name, params);
  var ids = DS.utils.toLookup(items, definition.idAttribute);

  angular.forEach(ids, function (item, id) {
    DS.eject(definition.name, id);
  });

  delete resource.completedQueries[queryHash];
  resource.collectionModified = DS.utils.updateTimestamp(resource.collectionModified);

  if (options.notify) {
    DS.emit(definition, 'eject', items);
  }

  return items;
}

/**
 * @doc method
 * @id DS.sync methods:ejectAll
 * @name ejectAll
 * @description
 * Eject all matching items of the specified type from the data store. Ejection only removes items from the data store
 * and does not attempt to destroy items via an adapter.
 *
 * ## Signature:
 * ```js
 * DS.ejectAll(resourceName[, params])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
 *
 * DS.eject('document', 45);
 *
 * DS.get('document', 45); // undefined
 * ```
 *
 * Eject all items of the specified type that match the criteria from the data store.
 *
 * ```js
 * DS.filter('document');   // [ { title: 'How to Cook', id: 45, author: 'John Anderson' },
 *                          //   { title: 'How to Eat', id: 46, author: 'Sally Jane' } ]
 *
 * DS.ejectAll('document', { where: { author: 'Sally Jane' } });
 *
 * DS.filter('document'); // [ { title: 'How to Cook', id: 45, author: 'John Anderson' } ]
 * ```
 *
 * Eject all items of the specified type from the data store.
 *
 * ```js
 * DS.filter('document');   // [ { title: 'How to Cook', id: 45, author: 'John Anderson' },
 *                          //   { title: 'How to Eat', id: 46, author: 'Sally Jane' } ]
 *
 * DS.ejectAll('document');
 *
 * DS.filter('document'); // [ ]
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is used to filter items. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration.
 *
 * @returns {array} The items that were ejected from the data store.
 */
function ejectAll(resourceName, params, options) {
  var DS = this;
  var definition = DS.definitions[resourceName];
  params = params || {};
  options = options || {};

  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (!DS.utils.isObject(params)) {
    throw new DS.errors.IA(errorPrefix(resourceName) + 'params: Must be an object!');
  }
  var resource = DS.store[resourceName];
  var ejected;

  if (DS.utils.isEmpty(params)) {
    resource.completedQueries = {};
  }

  if (!('notify' in options)) {
    options.notify = definition.notify;
  }

  if (!DS.$rootScope.$$phase) {
    DS.$rootScope.$apply(function () {
      ejected = _ejectAll.call(DS, definition, resource, params, options);
    });
  } else {
    ejected = _ejectAll.call(DS, definition, resource, params, options);
  }

  return ejected;
}

module.exports = ejectAll;

},{}],75:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.filter(' + resourceName + '[, params][, options]): ';
}

/**
 * @doc method
 * @id DS.sync methods:filter
 * @name filter
 * @description
 * Synchronously filter items in the data store of the type specified by `resourceName`.
 *
 * ## Signature:
 * ```js
 * DS.filter(resourceName[, params][, options])
 * ```
 *
 * ## Example:
 *
 * For many examples see the [tests for DS.filter](https://github.com/jmdobry/angular-data/blob/master/test/integration/datastore/sync methods/filter.test.js).
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object=} params Parameter object that is used to filter items. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Properties:
 *
 * - `{boolean=}` - `loadFromServer` - Send the query to server if it has not been sent yet. Default: `false`.
 * - `{boolean=}` - `allowSimpleWhere` - Treat top-level fields on the `params` argument as simple "where" equality clauses. Default: `true`.
 *
 * @returns {array} The filtered collection of items of the type specified by `resourceName`.
 */
function filter(resourceName, params, options) {
  var DS = this;
  var IA = DS.errors.IA;
  var definition = DS.definitions[resourceName];

  options = options || {};

  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (params && !DS.utils.isObject(params)) {
    throw new IA(errorPrefix(resourceName) + 'params: Must be an object!');
  } else if (!DS.utils.isObject(options)) {
    throw new IA(errorPrefix(resourceName) + 'options: Must be an object!');
  }
  var resource = DS.store[resourceName];

  // Protect against null
  params = params || {};

  if ('allowSimpleWhere' in options) {
    options.allowSimpleWhere = !!options.allowSimpleWhere;
  } else {
    options.allowSimpleWhere = true;
  }

  var queryHash = DS.utils.toJson(params);

  if (!(queryHash in resource.completedQueries) && options.loadFromServer) {
    // This particular query has never been completed

    if (!resource.pendingQueries[queryHash]) {
      // This particular query has never even been started
      DS.findAll(resourceName, params, options);
    }
  }

  return definition.defaultFilter.call(DS, resource.collection, resourceName, params, options);
}

module.exports = filter;

},{}],76:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.get(' + resourceName + ', ' + id + '): ';
}

/**
 * @doc method
 * @id DS.sync methods:get
 * @name get
 * @description
 * Synchronously return the resource with the given id. The data store will forward the request to an adapter if
 * `loadFromServer` is `true` in the options hash.
 *
 * ## Signature:
 * ```js
 * DS.get(resourceName, id[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.get('document', 5'); // { author: 'John Anderson', id: 5 }
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to retrieve.
 * @param {object=} options Optional configuration. Also passed along to `DS.find` if `loadFromServer` is `true`. Properties:
 *
 * - `{boolean=}` - `loadFromServer` - Send the query to server if it has not been sent yet. Default: `false`.
 *
 * @returns {object} The item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function get(resourceName, id, options) {
  var DS = this;
  var IA = DS.errors.IA;

  options = options || {};

  if (!DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
  } else if (!DS.utils.isObject(options)) {
    throw new IA(errorPrefix(resourceName, id) + 'options: Must be an object!');
  }
  // cache miss, request resource from server
  var item = DS.store[resourceName].index.get(id);
  if (!item && options.loadFromServer) {
    DS.find(resourceName, id, options).then(null, function (err) {
      return DS.$q.reject(err);
    });
  }

  // return resource from cache
  return item;
}

module.exports = get;

},{}],77:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.hasChanges(' + resourceName + ', ' + id + '): ';
}

function diffIsEmpty(utils, diff) {
  return !(utils.isEmpty(diff.added) &&
    utils.isEmpty(diff.removed) &&
    utils.isEmpty(diff.changed));
}

/**
 * @doc method
 * @id DS.sync methods:hasChanges
 * @name hasChanges
 * @description
 * Synchronously return whether object of the item of the type specified by `resourceName` that has the primary key
 * specified by `id` has changes.
 *
 * ## Signature:
 * ```js
 * DS.hasChanges(resourceName, id)
 * ```
 *
 * ## Example:
 *
 * ```js
 * var d = DS.get('document', 5); // { author: 'John Anderson', id: 5 }
 *
 * d.author = 'Sally';
 *
 * // You may have to do $scope.$apply() first
 *
 * DS.hasChanges('document', 5); // true
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item.
 * @returns {boolean} Whether the item of the type specified by `resourceName` with the primary key specified by `id` has changes.
 */
function hasChanges(resourceName, id) {
  var DS = this;

  id = DS.utils.resolveId(DS.definitions[resourceName], id);
  if (!DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new DS.errors.IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
  }

  // return resource from cache
  if (DS.get(resourceName, id)) {
    return diffIsEmpty(DS.utils, DS.changes(resourceName, id));
  } else {
    return false;
  }
}

module.exports = hasChanges;

},{}],78:[function(require,module,exports){
module.exports = {

  /**
   * @doc method
   * @id DS.sync methods:bindOne
   * @name bindOne
   * @methodOf DS
   * @description
   * See [DS.bindOne](/documentation/api/api/DS.sync methods:bindOne).
   */
  bindOne: require('./bindOne'),

  /**
   * @doc method
   * @id DS.sync methods:bindAll
   * @name bindAll
   * @methodOf DS
   * @description
   * See [DS.bindAll](/documentation/api/api/DS.sync methods:bindAll).
   */
  bindAll: require('./bindAll'),

  /**
   * @doc method
   * @id DS.sync methods:changes
   * @name changes
   * @methodOf DS
   * @description
   * See [DS.changes](/documentation/api/api/DS.sync methods:changes).
   */
  changes: require('./changes'),

  /**
   * @doc method
   * @id DS.sync methods:changeHistory
   * @name changeHistory
   * @methodOf DS
   * @description
   * See [DS.changeHistory](/documentation/api/api/DS.sync methods:changeHistory).
   */
  changeHistory: require('./changeHistory'),

  /**
   * @doc method
   * @id DS.sync methods:compute
   * @name compute
   * @methodOf DS
   * @description
   * See [DS.compute](/documentation/api/api/DS.sync methods:compute).
   */
  compute: require('./compute').compute,

  /**
   * @doc method
   * @id DS.sync methods:createInstance
   * @name createInstance
   * @methodOf DS
   * @description
   * See [DS.createInstance](/documentation/api/api/DS.sync methods:createInstance).
   */
  createInstance: require('./createInstance'),

  /**
   * @doc method
   * @id DS.sync methods:defineResource
   * @name defineResource
   * @methodOf DS
   * @description
   * See [DS.defineResource](/documentation/api/api/DS.sync methods:defineResource).
   */
  defineResource: require('./defineResource'),

  /**
   * @doc method
   * @id DS.sync methods:digest
   * @name digest
   * @methodOf DS
   * @description
   * See [DS.digest](/documentation/api/api/DS.sync methods:digest).
   */
  digest: require('./digest'),

  /**
   * @doc method
   * @id DS.sync methods:eject
   * @name eject
   * @methodOf DS
   * @description
   * See [DS.eject](/documentation/api/api/DS.sync methods:eject).
   */
  eject: require('./eject'),

  /**
   * @doc method
   * @id DS.sync methods:ejectAll
   * @name ejectAll
   * @methodOf DS
   * @description
   * See [DS.ejectAll](/documentation/api/api/DS.sync methods:ejectAll).
   */
  ejectAll: require('./ejectAll'),

  /**
   * @doc method
   * @id DS.sync methods:filter
   * @name filter
   * @methodOf DS
   * @description
   * See [DS.filter](/documentation/api/api/DS.sync methods:filter).
   */
  filter: require('./filter'),

  /**
   * @doc method
   * @id DS.sync methods:get
   * @name get
   * @methodOf DS
   * @description
   * See [DS.get](/documentation/api/api/DS.sync methods:get).
   */
  get: require('./get'),

  /**
   * @doc method
   * @id DS.sync methods:hasChanges
   * @name hasChanges
   * @methodOf DS
   * @description
   * See [DS.hasChanges](/documentation/api/api/DS.sync methods:hasChanges).
   */
  hasChanges: require('./hasChanges'),

  /**
   * @doc method
   * @id DS.sync methods:inject
   * @name inject
   * @methodOf DS
   * @description
   * See [DS.inject](/documentation/api/api/DS.sync methods:inject).
   */
  inject: require('./inject'),

  /**
   * @doc method
   * @id DS.sync methods:lastModified
   * @name lastModified
   * @methodOf DS
   * @description
   * See [DS.lastModified](/documentation/api/api/DS.sync methods:lastModified).
   */
  lastModified: require('./lastModified'),

  /**
   * @doc method
   * @id DS.sync methods:lastSaved
   * @name lastSaved
   * @methodOf DS
   * @description
   * See [DS.lastSaved](/documentation/api/api/DS.sync methods:lastSaved).
   */
  lastSaved: require('./lastSaved'),

  /**
   * @doc method
   * @id DS.sync methods:link
   * @name link
   * @methodOf DS
   * @description
   * See [DS.link](/documentation/api/api/DS.sync methods:link).
   */
  link: require('./link'),

  /**
   * @doc method
   * @id DS.sync methods:linkAll
   * @name linkAll
   * @methodOf DS
   * @description
   * See [DS.linkAll](/documentation/api/api/DS.sync methods:linkAll).
   */
  linkAll: require('./linkAll'),

  /**
   * @doc method
   * @id DS.sync methods:linkInverse
   * @name linkInverse
   * @methodOf DS
   * @description
   * See [DS.linkInverse](/documentation/api/api/DS.sync methods:linkInverse).
   */
  linkInverse: require('./linkInverse'),

  /**
   * @doc method
   * @id DS.sync methods:previous
   * @name previous
   * @methodOf DS
   * @description
   * See [DS.previous](/documentation/api/api/DS.sync methods:previous).
   */
  previous: require('./previous'),

  /**
   * @doc method
   * @id DS.sync methods:unlinkInverse
   * @name unlinkInverse
   * @methodOf DS
   * @description
   * See [DS.unlinkInverse](/documentation/api/api/DS.sync methods:unlinkInverse).
   */
  unlinkInverse: require('./unlinkInverse')
};

},{"./bindAll":65,"./bindOne":66,"./changeHistory":67,"./changes":68,"./compute":69,"./createInstance":70,"./defineResource":71,"./digest":72,"./eject":73,"./ejectAll":74,"./filter":75,"./get":76,"./hasChanges":77,"./inject":79,"./lastModified":80,"./lastSaved":81,"./link":82,"./linkAll":83,"./linkInverse":84,"./previous":85,"./unlinkInverse":86}],79:[function(require,module,exports){
var observe = require('../../../lib/observe-js/observe-js');
var _compute = require('./compute')._compute;

function errorPrefix(resourceName) {
  return 'DS.inject(' + resourceName + ', attrs[, options]): ';
}

function _injectRelations(definition, injected, options) {
  var DS = this;

  DS.utils.forEach(definition.relationList, function (def) {
    var relationName = def.relation;
    var relationDef = DS.definitions[relationName];
    if (injected[def.localField]) {
      if (!relationDef) {
        throw new DS.errors.R(definition.name + 'relation is defined but the resource is not!');
      }
      try {
        injected[def.localField] = DS.inject(relationName, injected[def.localField], options);
      } catch (err) {
        DS.$log.error(errorPrefix(definition.name) + 'Failed to inject ' + def.type + ' relation: "' + relationName + '"!', err);
      }
    }
  });
}

function _inject(definition, resource, attrs, options) {
  var DS = this;
  var $log = DS.$log;

  function _react(added, removed, changed, oldValueFn, firstTime) {
    var target = this;
    var item;
    var innerId = (oldValueFn && oldValueFn(definition.idAttribute)) ? oldValueFn(definition.idAttribute) : target[definition.idAttribute];

    DS.utils.forEach(definition.relationFields, function (field) {
      delete added[field];
      delete removed[field];
      delete changed[field];
    });

    if (!DS.utils.isEmpty(added) || !DS.utils.isEmpty(removed) || !DS.utils.isEmpty(changed) || firstTime) {
      item = DS.get(definition.name, innerId);
      resource.modified[innerId] = DS.utils.updateTimestamp(resource.modified[innerId]);
      resource.collectionModified = DS.utils.updateTimestamp(resource.collectionModified);
      if (definition.keepChangeHistory) {
        var changeRecord = {
          resourceName: definition.name,
          target: item,
          added: added,
          removed: removed,
          changed: changed,
          timestamp: resource.modified[innerId]
        };
        resource.changeHistories[innerId].push(changeRecord);
        resource.changeHistory.push(changeRecord);
      }
    }

    if (definition.computed) {
      item = item || DS.get(definition.name, innerId);
      DS.utils.forEach(definition.computed, function (fn, field) {
        var compute = false;
        // check if required fields changed
        angular.forEach(fn.deps, function (dep) {
          if (dep in added || dep in removed || dep in changed || !(field in item)) {
            compute = true;
          }
        });
        compute = compute || !fn.deps.length;
        if (compute) {
          _compute.call(item, fn, field);
        }
      });
    }

    if (definition.relations) {
      item = item || DS.get(definition.name, innerId);
      DS.utils.forEach(definition.relationList, function (def) {
        if (item[def.localField] && (def.localKey in added || def.localKey in removed || def.localKey in changed)) {
          DS.link(definition.name, item[definition.idAttribute], [def.relation]);
        }
      });
    }

    if (definition.idAttribute in changed) {
      $log.error('Doh! You just changed the primary key of an object! ' +
        'I don\'t know how to handle this yet, so your data for the "' + definition.name +
        '" resource is now in an undefined (probably broken) state.');
    }
  }

  var injected;
  if (DS.utils.isArray(attrs)) {
    injected = [];
    for (var i = 0; i < attrs.length; i++) {
      injected.push(_inject.call(DS, definition, resource, attrs[i], options));
    }
  } else {
    // check if "idAttribute" is a computed property
    var c = definition.computed;
    var idA = definition.idAttribute;
    if (c && c[idA]) {
      var args = [];
      angular.forEach(c[idA].deps, function (dep) {
        args.push(attrs[dep]);
      });
      attrs[idA] = c[idA][c[idA].length - 1].apply(attrs, args);
    }
    if (!(idA in attrs)) {
      var error = new DS.errors.R(errorPrefix(definition.name) + 'attrs: Must contain the property specified by `idAttribute`!');
      $log.error(error);
      throw error;
    } else {
      try {
        definition.beforeInject(definition.name, attrs);
        var id = attrs[idA];
        var item = DS.get(definition.name, id);

        if (!item) {
          if (options.useClass) {
            if (attrs instanceof definition[definition.class]) {
              item = attrs;
            } else {
              item = new definition[definition.class]();
            }
          } else {
            item = {};
          }
          resource.previousAttributes[id] = {};

          DS.utils.deepMixIn(item, attrs);
          DS.utils.deepMixIn(resource.previousAttributes[id], attrs);

          resource.collection.push(item);

          resource.changeHistories[id] = [];
          resource.observers[id] = new observe.ObjectObserver(item);
          resource.observers[id].open(_react, item);
          resource.index.put(id, item);

          _react.call(item, {}, {}, {}, null, true);

          if (definition.relations) {
            _injectRelations.call(DS, definition, item, options);
          }
        } else {
          DS.utils.deepMixIn(item, attrs);
          if (definition.resetHistoryOnInject) {
            resource.previousAttributes[id] = {};
            DS.utils.deepMixIn(resource.previousAttributes[id], attrs);
            if (resource.changeHistories[id].length) {
              DS.utils.forEach(resource.changeHistories[id], function (changeRecord) {
                DS.utils.remove(resource.changeHistory, changeRecord);
              });
              resource.changeHistories[id].splice(0, resource.changeHistories[id].length);
            }
          }
          if (typeof resource.index.touch === 'function') {
            resource.index.touch(id);
          } else {
            resource.index.put(id, resource.index.get(id));
          }
          resource.observers[id].deliver();
        }
        resource.saved[id] = DS.utils.updateTimestamp(resource.saved[id]);
        definition.afterInject(definition.name, item);
        injected = item;
      } catch (err) {
        $log.error(err);
        $log.error('inject failed!', definition.name, attrs);
      }
    }
  }
  return injected;
}

function _link(definition, injected, options) {
  var DS = this;

  DS.utils.forEach(definition.relationList, function (def) {
    if (options.findBelongsTo && def.type === 'belongsTo' && injected[definition.idAttribute]) {
      DS.link(definition.name, injected[definition.idAttribute], [def.relation]);
    } else if ((options.findHasMany && def.type === 'hasMany') || (options.findHasOne && def.type === 'hasOne')) {
      DS.link(definition.name, injected[definition.idAttribute], [def.relation]);
    }
  });
}

/**
 * @doc method
 * @id DS.sync methods:inject
 * @name inject
 * @description
 * Inject the given item into the data store as the specified type. If `attrs` is an array, inject each item into the
 * data store. Injecting an item into the data store does not save it to the server. Emits a `"DS.inject"` event.
 *
 * ## Signature:
 * ```js
 * DS.inject(resourceName, attrs[, options])
 * ```
 *
 * ## Examples:
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
 * ```js
 * $rootScope.$on('DS.inject', function ($event, resourceName, injected) {...});
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object|array} attrs The item or collection of items to inject into the data store.
 * @param {object=} options The item or collection of items to inject into the data store. Properties:
 *
 * - `{boolean=}` - `useClass` - Whether to wrap the injected item with the resource's instance constructor.
 * - `{boolean=}` - `findBelongsTo` - Find and attach any existing "belongsTo" relationships to the newly injected item. Potentially expensive if enabled. Default: `false`.
 * - `{boolean=}` - `findHasMany` - Find and attach any existing "hasMany" relationships to the newly injected item. Potentially expensive if enabled. Default: `false`.
 * - `{boolean=}` - `findHasOne` - Find and attach any existing "hasOne" relationships to the newly injected item. Potentially expensive if enabled. Default: `false`.
 * - `{boolean=}` - `linkInverse` - Look in the data store for relations of the injected item(s) and update their links to the injected. Potentially expensive if enabled. Default: `false`.
 *
 * @returns {object|array} A reference to the item that was injected into the data store or an array of references to
 * the items that were injected into the data store.
 */
function inject(resourceName, attrs, options) {
  var DS = this;
  var IA = DS.errors.IA;
  var definition = DS.definitions[resourceName];

  options = options || {};

  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (!DS.utils.isObject(attrs) && !DS.utils.isArray(attrs)) {
    throw new IA(errorPrefix(resourceName) + 'attrs: Must be an object or an array!');
  } else if (!DS.utils.isObject(options)) {
    throw new IA(errorPrefix(resourceName) + 'options: Must be an object!');
  }
  var resource = DS.store[resourceName];
  var injected;

  if (!('useClass' in options)) {
    options.useClass = definition.useClass;
  }
  if (!('notify' in options)) {
    options.notify = definition.notify;
  }
  if (!DS.$rootScope.$$phase) {
    DS.$rootScope.$apply(function () {
      injected = _inject.call(DS, definition, resource, attrs, options);
    });
  } else {
    injected = _inject.call(DS, definition, resource, attrs, options);
  }

  if (options.linkInverse) {
    if (DS.utils.isArray(injected) && injected.length) {
      DS.linkInverse(definition.name, injected[0][definition.idAttribute]);
    } else {
      DS.linkInverse(definition.name, injected[definition.idAttribute]);
    }
  }

  if (DS.utils.isArray(injected)) {
    DS.utils.forEach(injected, function (injectedI) {
      _link.call(DS, definition, injectedI, options);
    });
  } else {
    _link.call(DS, definition, injected, options);
  }

  if (options.notify) {
    DS.emit(definition, 'inject', injected);
  }


  return injected;
}

module.exports = inject;

},{"../../../lib/observe-js/observe-js":1,"./compute":69}],80:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.lastModified(' + resourceName + '[, ' + id + ']): ';
}

/**
 * @doc method
 * @id DS.sync methods:lastModified
 * @name lastModified
 * @description
 * Return the timestamp of the last time either the collection for `resourceName` or the item of type `resourceName`
 * with the given primary key was modified.
 *
 * ## Signature:
 * ```js
 * DS.lastModified(resourceName[, id])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.lastModified('document', 5); // undefined
 *
 * DS.find('document', 5).then(function (document) {
 *   DS.lastModified('document', 5); // 1234235825494
 * });
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number=} id The primary key of the item to remove.
 * @returns {number} The timestamp of the last time either the collection for `resourceName` or the item of type
 * `resourceName` with the given primary key was modified.
 */
function lastModified(resourceName, id) {
  var DS = this;
  var resource = DS.store[resourceName];

  id = DS.utils.resolveId(DS.definitions[resourceName], id);
  if (!DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
  } else if (id && !DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new DS.errors.IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
  }
  if (id) {
    if (!(id in resource.modified)) {
      resource.modified[id] = 0;
    }
    return resource.modified[id];
  }
  return resource.collectionModified;
}

module.exports = lastModified;

},{}],81:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.lastSaved(' + resourceName + '[, ' + id + ']): ';
}

/**
 * @doc method
 * @id DS.sync methods:lastSaved
 * @name lastSaved
 * @description
 * Return the timestamp of the last time either the collection for `resourceName` or the item of type `resourceName`
 * with the given primary key was saved via an async adapter.
 *
 * ## Signature:
 * ```js
 * DS.lastSaved(resourceName[, id])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.lastModified('document', 5); // undefined
 * DS.lastSaved('document', 5); // undefined
 *
 * DS.find('document', 5).then(function (document) {
 *   DS.lastModified('document', 5); // 1234235825494
 *   DS.lastSaved('document', 5); // 1234235825494
 *
 *   document.author = 'Sally';
 *
 *   // You may have to call $scope.$apply() first
 *
 *   DS.lastModified('document', 5); // 1234304985344 - something different
 *   DS.lastSaved('document', 5); // 1234235825494 - still the same
 * });
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item for which to retrieve the lastSaved timestamp.
 * @returns {number} The timestamp of the last time the item of type `resourceName` with the given primary key was saved.
 */
function lastSaved(resourceName, id) {
  var DS = this;
  var resource = DS.store[resourceName];

  id = DS.utils.resolveId(DS.definitions[resourceName], id);
  if (!DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new DS.errors.IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
  }
  if (!(id in resource.saved)) {
    resource.saved[id] = 0;
  }
  return resource.saved[id];
}

module.exports = lastSaved;

},{}],82:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.link(' + resourceName + ', id[, relations]): ';
}

function _link(definition, linked, relations) {
  var DS = this;
  DS.utils.forEach(definition.relationList, function (def) {
    var relationName = def.relation;
    if (relations.length && !DS.utils.contains(relations, relationName)) {
      return;
    }
    var params = {};
    if (def.type === 'belongsTo') {
      var parent = linked[def.localKey] ? DS.get(relationName, linked[def.localKey]) : null;
      if (parent) {
        linked[def.localField] = parent;
      }
    } else if (def.type === 'hasMany') {
      params[def.foreignKey] = linked[definition.idAttribute];
      linked[def.localField] = DS.defaults.constructor.prototype.defaultFilter.call(DS, DS.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
    } else if (def.type === 'hasOne') {
      params[def.foreignKey] = linked[definition.idAttribute];
      var children = DS.defaults.constructor.prototype.defaultFilter.call(DS, DS.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
      if (children.length) {
        linked[def.localField] = children[0];
      }
    }
  });
}

/**
 * @doc method
 * @id DS.sync methods:link
 * @name link
 * @description
 * Find relations of the item with the given primary key that are already in the data store and link them to the item.
 *
 * ## Signature:
 * ```js
 * DS.link(resourceName, id[, relations])
 * ```
 *
 * ## Examples:
 *
 * Assume `user` has `hasMany` relationships to `post` and `comment`.
 * ```js
 * DS.get('user', 1); // { name: 'John', id: 1 }
 *
 * // link posts
 * DS.link('user', 1, ['post']);
 *
 * DS.get('user', 1); // { name: 'John', id: 1, posts: [...] }
 *
 * // link all relations
 * DS.link('user', 1);
 *
 * DS.get('user', 1); // { name: 'John', id: 1, posts: [...], comments: [...] }
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item for to link relations.
 * @param {array=} relations The relations to be linked. If not provided then all relations will be linked. Default: `[]`.
 * @returns {object|array} A reference to the item with its linked relations.
 */
function link(resourceName, id, relations) {
  var DS = this;
  var IA = DS.errors.IA;
  var definition = DS.definitions[resourceName];

  relations = relations || [];

  id = DS.utils.resolveId(definition, id);
  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new IA(errorPrefix(resourceName) + 'id: Must be a string or a number!');
  } else if (!DS.utils.isArray(relations)) {
    throw new IA(errorPrefix(resourceName) + 'relations: Must be an array!');
  }
  var linked = DS.get(resourceName, id);

  if (linked) {
    if (!DS.$rootScope.$$phase) {
      DS.$rootScope.$apply(function () {
        _link.call(DS, definition, linked, relations);
      });
    } else {
      _link.call(DS, definition, linked, relations);
    }
  }

  return linked;
}

module.exports = link;

},{}],83:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.linkAll(' + resourceName + '[, params][, relations]): ';
}

function _linkAll(definition, linked, relations) {
  var DS = this;
  DS.utils.forEach(definition.relationList, function (def) {
    var relationName = def.relation;
    if (relations.length && !DS.utils.contains(relations, relationName)) {
      return;
    }
    if (def.type === 'belongsTo') {
      DS.utils.forEach(linked, function (injectedItem) {
        var parent = injectedItem[def.localKey] ? DS.get(relationName, injectedItem[def.localKey]) : null;
        if (parent) {
          injectedItem[def.localField] = parent;
        }
      });
    } else if (def.type === 'hasMany') {
      DS.utils.forEach(linked, function (injectedItem) {
        var params = {};
        params[def.foreignKey] = injectedItem[definition.idAttribute];
        injectedItem[def.localField] = DS.defaults.constructor.prototype.defaultFilter.call(DS, DS.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
      });
    } else if (def.type === 'hasOne') {
      DS.utils.forEach(linked, function (injectedItem) {
        var params = {};
        params[def.foreignKey] = injectedItem[definition.idAttribute];
        var children = DS.defaults.constructor.prototype.defaultFilter.call(DS, DS.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
        if (children.length) {
          injectedItem[def.localField] = children[0];
        }
      });
    }
  });
}

/**
 * @doc method
 * @id DS.sync methods:linkAll
 * @name linkAll
 * @description
 * Find relations of a collection of items that are already in the data store and link them to the items.
 *
 * ## Signature:
 * ```js
 * DS.linkAll(resourceName[, params][, relations])
 * ```
 *
 * ## Examples:
 *
 * Assume `user` has `hasMany` relationships to `post` and `comment`.
 * ```js
 * DS.filter('user'); // [{ name: 'John', id: 1 }, { name: 'Sally', id: 2 }]
 *
 * // link posts
 * DS.linkAll('user', {
 *   name: : 'John'
 * }, ['post']);
 *
 * DS.filter('user'); // [{ name: 'John', id: 1, posts: [...] }, { name: 'Sally', id: 2 }]
 *
 * // link all relations
 * DS.linkAll('user', { name: : 'John' });
 *
 * DS.filter('user'); // [{ name: 'John', id: 1, posts: [...], comments: [...] }, { name: 'Sally', id: 2 }]
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object=} params Parameter object that is used to filter items. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {array=} relations The relations to be linked. If not provided then all relations will be linked. Default: `[]`.
 * @returns {object|array} A reference to the item with its linked relations.
 */
function linkAll(resourceName, params, relations) {
  var DS = this;
  var IA = DS.errors.IA;
  var definition = DS.definitions[resourceName];

  relations = relations || [];

  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (params && !DS.utils.isObject(params)) {
    throw new IA(errorPrefix(resourceName) + 'params: Must be an object!');
  } else if (!DS.utils.isArray(relations)) {
    throw new IA(errorPrefix(resourceName) + 'relations: Must be an array!');
  }
  var linked = DS.filter(resourceName, params);

  if (linked) {
    if (!DS.$rootScope.$$phase) {
      DS.$rootScope.$apply(function () {
        _linkAll.call(DS, definition, linked, relations);
      });
    } else {
      _linkAll.call(DS, definition, linked, relations);
    }
  }

  return linked;
}

module.exports = linkAll;

},{}],84:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.linkInverse(' + resourceName + ', id[, relations]): ';
}

function _linkInverse(definition, relations) {
  var DS = this;
  DS.utils.forEach(DS.definitions, function (d) {
    DS.utils.forEach(d.relations, function (relatedModels) {
      DS.utils.forEach(relatedModels, function (defs, relationName) {
        if (relations.length && !DS.utils.contains(relations, d.name)) {
          return;
        }
        if (definition.name === relationName) {
          DS.linkAll(d.name, {}, [definition.name]);
        }
      });
    });
  });
}

/**
 * @doc method
 * @id DS.sync methods:linkInverse
 * @name linkInverse
 * @description
 * Find relations of the item with the given primary key that are already in the data store and link this item to those
 * relations. This creates links in the opposite direction of `DS.link`.
 *
 * ## Signature:
 * ```js
 * DS.linkInverse(resourceName, id[, relations])
 * ```
 *
 * ## Examples:
 *
 * Assume `organization` has `hasMany` relationship to `user` and `post` has a `belongsTo` relationship to `user`.
 * ```js
 * DS.get('user', 1); // { organizationId: 5, id: 1 }
 * DS.get('organization', 5); // { id: 5 }
 * DS.filter('post', { userId: 1 }); // [ { id: 23, userId: 1 }, { id: 44, userId: 1 }]
 *
 * // link user to its relations
 * DS.linkInverse('user', 1, ['organization']);
 *
 * DS.get('organization', 5); // { id: 5, users: [{ organizationId: 5, id: 1 }] }
 *
 * // link user to all of its all relations
 * DS.linkInverse('user', 1);
 *
 * DS.get('user', 1); // { organizationId: 5, id: 1 }
 * DS.get('organization', 5); // { id: 5, users: [{ organizationId: 5, id: 1 }] }
 * DS.filter('post', { userId: 1 }); // [ { id: 23, userId: 1, user: {...} }, { id: 44, userId: 1, user: {...} }]
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item for to link relations.
 * @param {array=} relations The relations to be linked. If not provided then all relations will be linked. Default: `[]`.
 * @returns {object|array} A reference to the item with its linked relations.
 */
function linkInverse(resourceName, id, relations) {
  var DS = this;
  var IA = DS.errors.IA;
  var definition = DS.definitions[resourceName];

  relations = relations || [];


  id = DS.utils.resolveId(definition, id);
  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new IA(errorPrefix(resourceName) + 'id: Must be a string or a number!');
  } else if (!DS.utils.isArray(relations)) {
    throw new IA(errorPrefix(resourceName) + 'relations: Must be an array!');
  }
  var linked = DS.get(resourceName, id);

  if (linked) {
    if (!DS.$rootScope.$$phase) {
      DS.$rootScope.$apply(function () {
        _linkInverse.call(DS, definition, relations);
      });
    } else {
      _linkInverse.call(DS, definition, relations);
    }
  }

  return linked;
}

module.exports = linkInverse;

},{}],85:[function(require,module,exports){
function errorPrefix(resourceName, id) {
  return 'DS.previous(' + resourceName + '[, ' + id + ']): ';
}

/**
 * @doc method
 * @id DS.sync methods:previous
 * @name previous
 * @description
 * Synchronously return the previous attributes of the item of the type specified by `resourceName` that has the primary key
 * specified by `id`. This object represents the state of the item the last time it was saved via an async adapter.
 *
 * ## Signature:
 * ```js
 * DS.previous(resourceName, id)
 * ```
 *
 * ## Example:
 *
 * ```js
 * var d = DS.get('document', 5); // { author: 'John Anderson', id: 5 }
 *
 * d.author = 'Sally';
 *
 * d; // { author: 'Sally', id: 5 }
 *
 * // You may have to do $scope.$apply() first
 *
 * DS.previous('document', 5); // { author: 'John Anderson', id: 5 }
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item whose previous attributes are to be retrieved.
 * @returns {object} The previous attributes of the item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function previous(resourceName, id) {
  var DS = this;

  id = DS.utils.resolveId(DS.definitions[resourceName], id);
  if (!DS.definitions[resourceName]) {
    throw new DS.errors.NER(errorPrefix(resourceName, id) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new DS.errors.IA(errorPrefix(resourceName, id) + 'id: Must be a string or a number!');
  }

  // return resource from cache
  return angular.copy(DS.store[resourceName].previousAttributes[id]);
}

module.exports = previous;

},{}],86:[function(require,module,exports){
function errorPrefix(resourceName) {
  return 'DS.unlinkInverse(' + resourceName + ', id[, relations]): ';
}

function _unlinkInverse(definition, linked) {
  var DS = this;
  DS.utils.forEach(DS.definitions, function (d) {
    DS.utils.forEach(d.relations, function (relatedModels) {
      DS.utils.forEach(relatedModels, function (defs, relationName) {
        if (definition.name === relationName) {
          DS.utils.forEach(defs, function (def) {
            DS.utils.forEach(DS.store[def.name].collection, function (item) {
              if (def.type === 'hasMany' && item[def.localField]) {
                var index;
                DS.utils.forEach(item[def.localField], function (subItem, i) {
                  if (subItem === linked) {
                    index = i;
                  }
                });
                if (index !== undefined) {
                  item[def.localField].splice(index, 1);
                }
              } else if (item[def.localField] === linked) {
                delete item[def.localField];
              }
            });
          });
        }
      });
    });
  });
}

/**
 * @doc method
 * @id DS.sync methods:unlinkInverse
 * @name unlinkInverse
 * @description
 * Find relations of the item with the given primary key that are already in the data store and _unlink_ this item from those
 * relations. This unlinks links that would be created by `DS.linkInverse`.
 *
 * ## Signature:
 * ```js
 * DS.unlinkInverse(resourceName, id[, relations])
 * ```
 *
 * ## Examples:
 *
 * Assume `organization` has `hasMany` relationship to `user` and `post` has a `belongsTo` relationship to `user`.
 * ```js
 * DS.get('organization', 5); // { id: 5, users: [{ organizationId: 5, id: 1 }] }
 *
 * // unlink user 1 from its relations
 * DS.unlinkInverse('user', 1, ['organization']);
 *
 * DS.get('organization', 5); // { id: 5, users: [] }
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item for which to unlink relations.
 * @param {array=} relations The relations to be unlinked. If not provided then all relations will be unlinked. Default: `[]`.
 * @returns {object|array} A reference to the item that has been unlinked.
 */
function unlinkInverse(resourceName, id, relations) {
  var DS = this;
  var IA = DS.errors.IA;
  var definition = DS.definitions[resourceName];

  relations = relations || [];

  id = DS.utils.resolveId(definition, id);
  if (!definition) {
    throw new DS.errors.NER(errorPrefix(resourceName) + resourceName);
  } else if (!DS.utils.isString(id) && !DS.utils.isNumber(id)) {
    throw new IA(errorPrefix(resourceName) + 'id: Must be a string or a number!');
  } else if (!DS.utils.isArray(relations)) {
    throw new IA(errorPrefix(resourceName) + 'relations: Must be an array!');
  }
  var linked = DS.get(resourceName, id);

  if (linked) {
    if (!DS.$rootScope.$$phase) {
      DS.$rootScope.$apply(function () {
        _unlinkInverse.call(DS, definition, linked, relations);
      });
    } else {
      _unlinkInverse.call(DS, definition, linked, relations);
    }
  }

  return linked;
}

module.exports = unlinkInverse;

},{}],87:[function(require,module,exports){
/**
 * @doc function
 * @id errors.types:IllegalArgumentError
 * @name IllegalArgumentError
 * @description Error that is thrown/returned when a caller does not honor the pre-conditions of a method/function.
 * @param {string=} message Error message. Default: `"Illegal Argument!"`.
 * @returns {IllegalArgumentError} A new instance of `IllegalArgumentError`.
 */
function IllegalArgumentError(message) {
  Error.call(this);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }

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
 * @id errors.types:RuntimeError
 * @name RuntimeError
 * @description Error that is thrown/returned for invalid state during runtime.
 * @param {string=} message Error message. Default: `"Runtime Error!"`.
 * @returns {RuntimeError} A new instance of `RuntimeError`.
 */
function RuntimeError(message) {
  Error.call(this);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }

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
   * @id errors.types:RuntimeError.message
   * @name message
   * @propertyOf errors.types:RuntimeError
   * @description Error message. Default: `"Runtime Error!"`.
   */
  this.message = message || 'RuntimeError Error!';
}

RuntimeError.prototype = Object.create(Error.prototype);
RuntimeError.prototype.constructor = RuntimeError;

/**
 * @doc function
 * @id errors.types:NonexistentResourceError
 * @name NonexistentResourceError
 * @description Error that is thrown/returned when trying to access a resource that does not exist.
 * @param {string=} resourceName Name of non-existent resource.
 * @returns {NonexistentResourceError} A new instance of `NonexistentResourceError`.
 */
function NonexistentResourceError(resourceName) {
  Error.call(this);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @doc property
   * @id errors.types:NonexistentResourceError.type
   * @name type
   * @propertyOf errors.types:NonexistentResourceError
   * @description Name of error type. Default: `"NonexistentResourceError"`.
   */
  this.type = this.constructor.name;

  /**
   * @doc property
   * @id errors.types:NonexistentResourceError.message
   * @name message
   * @propertyOf errors.types:NonexistentResourceError
   * @description Error message. Default: `"Runtime Error!"`.
   */
  this.message = (resourceName || '') + ' is not a registered resource!';
}

NonexistentResourceError.prototype = Object.create(Error.prototype);
NonexistentResourceError.prototype.constructor = NonexistentResourceError;

/**
 * @doc interface
 * @id errors
 * @name angular-data error types
 * @description
 * Various error types that may be thrown by angular-data.
 *
 * - [IllegalArgumentError](/documentation/api/api/errors.types:IllegalArgumentError)
 * - [RuntimeError](/documentation/api/api/errors.types:RuntimeError)
 * - [NonexistentResourceError](/documentation/api/api/errors.types:NonexistentResourceError)
 *
 * References to the constructor functions of these errors can be found in `DS.errors`.
 */
module.exports = [function () {
  return {
    IllegalArgumentError: IllegalArgumentError,
    IA: IllegalArgumentError,
    RuntimeError: RuntimeError,
    R: RuntimeError,
    NonexistentResourceError: NonexistentResourceError,
    NER: NonexistentResourceError
  };
}];

},{}],88:[function(require,module,exports){
(function (window, angular, undefined) {
  'use strict';

  /**
   * @doc overview
   * @id angular-data
   * @name angular-data
   * @description
   * __Version:__ 1.0.0
   *
   * ## Install
   *
   * #### Bower
   * ```text
   * bower install angular-data
   * ```
   *
   * Load `dist/angular-data.js` or `dist/angular-data.min.js` onto your web page after Angular.js.
   *
   * #### Npm
   * ```text
   * npm install angular-data
   * ```
   *
   * Load `dist/angular-data.js` or `dist/angular-data.min.js` onto your web page after Angular.js.
   *
   * #### Manual download
   * Download angular-data from the [Releases](https://github.com/jmdobry/angular-data/releases)
   * section of the angular-data GitHub project.
   *
   * ## Load into Angular
   * Your Angular app must depend on the module `"angular-data.DS"` in order to use angular-data. Loading
   * angular-data into your app allows you to inject the following:
   *
   * - `DS`
   * - `DSHttpAdapter`
   * - `DSUtils`
   * - `DSErrors`
   *
   * [DS](/documentation/api/api/DS) is the Data Store itself, which you will inject often.
   * [DSHttpAdapter](/documentation/api/api/DSHttpAdapter) is useful as a wrapper for `$http` and is configurable.
   * [DSUtils](/documentation/api/api/DSUtils) has some useful utility methods.
   * [DSErrors](/documentation/api/api/DSErrors) provides references to the various errors thrown by the data store.
   */
  angular.module('angular-data.DS', ['ng'])
    .factory('DSUtils', require('./utils'))
    .factory('DSErrors', require('./errors'))
    .provider('DSHttpAdapter', require('./adapters/http'))
    .provider('DSLocalStorageAdapter', require('./adapters/localStorage'))
    .provider('DS', require('./datastore'))
    .config(['$provide', function ($provide) {
      $provide.decorator('$q', ['$delegate', function ($delegate) {
        // do whatever you you want
        $delegate.promisify = function (fn, target) {
          if (!fn) {
            return;
          } else if (typeof fn !== 'function') {
            throw new Error('Can only promisify functions!');
          }
          var $q = this;
          return function () {
            var deferred = $q.defer();
            var args = Array.prototype.slice.apply(arguments);

            args.push(function (err, result) {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(result);
              }
            });

            try {
              var promise = fn.apply(target || this, args);
              if (promise && promise.then) {
                promise.then(deferred.resolve, deferred.reject);
              }
            } catch (err) {
              deferred.reject(err);
            }

            return deferred.promise;
          };
        };
        return $delegate;
      }]);
    }]);

})(window, window.angular);

},{"./adapters/http":51,"./adapters/localStorage":52,"./datastore":64,"./errors":87,"./utils":89}],89:[function(require,module,exports){
function Events(target) {
  var events = {};
  target = target || this;
  /**
   *  On: listen to events
   */
  target.on = function (type, func, ctx) {
    events[type] = events[type] || [];
    events[type].push({
      f: func,
      c: ctx
    });
  };

  /**
   *  Off: stop listening to event / specific callback
   */
  target.off = function (type, func) {
    var listeners = events[type];
    if (!listeners) {
      events = {};
    } else if (func) {
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i] === func) {
          listeners.splice(i, 1);
          break;
        }
      }
    } else {
      listeners.splice(0, listeners.length);
    }
  };

  target.emit = function () {
    var args = Array.prototype.slice.call(arguments);
    var listeners = events[args.shift()] || [];
    if (listeners) {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i].f.apply(listeners[i].c, args);
      }
    }
  };
}

module.exports = [function () {
  return {
    isBoolean: require('mout/lang/isBoolean'),
    isString: angular.isString,
    isArray: angular.isArray,
    isObject: angular.isObject,
    isNumber: angular.isNumber,
    isFunction: angular.isFunction,
    isEmpty: require('mout/lang/isEmpty'),
    toJson: angular.toJson,
    fromJson: angular.fromJson,
    makePath: require('mout/string/makePath'),
    upperCase: require('mout/string/upperCase'),
    pascalCase: require('mout/string/pascalCase'),
    deepMixIn: require('mout/object/deepMixIn'),
    forEach: angular.forEach,
    pick: require('mout/object/pick'),
    set: require('mout/object/set'),
    merge: require('mout/object/merge'),
    contains: require('mout/array/contains'),
    filter: require('mout/array/filter'),
    toLookup: require('mout/array/toLookup'),
    remove: require('mout/array/remove'),
    slice: require('mout/array/slice'),
    sort: require('mout/array/sort'),
    guid: require('mout/random/guid'),
    keys: require('mout/object/keys'),
    resolveItem: function (resource, idOrInstance) {
      if (resource && (this.isString(idOrInstance) || this.isNumber(idOrInstance))) {
        return resource.index[idOrInstance] || idOrInstance;
      } else {
        return idOrInstance;
      }
    },
    resolveId: function (definition, idOrInstance) {
      if (this.isString(idOrInstance) || this.isNumber(idOrInstance)) {
        return idOrInstance;
      } else if (idOrInstance && definition) {
        return idOrInstance[definition.idAttribute] || idOrInstance;
      } else {
        return idOrInstance;
      }
    },
    updateTimestamp: function (timestamp) {
      var newTimestamp = typeof Date.now === 'function' ? Date.now() : new Date().getTime();
      if (timestamp && newTimestamp <= timestamp) {
        return timestamp + 1;
      } else {
        return newTimestamp;
      }
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
    },
    Events: Events
  };
}];

},{"mout/array/contains":2,"mout/array/filter":3,"mout/array/remove":7,"mout/array/slice":8,"mout/array/sort":9,"mout/array/toLookup":10,"mout/lang/isBoolean":17,"mout/lang/isEmpty":18,"mout/object/deepMixIn":28,"mout/object/keys":32,"mout/object/merge":33,"mout/object/pick":36,"mout/object/set":37,"mout/random/guid":39,"mout/string/makePath":46,"mout/string/pascalCase":47,"mout/string/upperCase":50}]},{},[88]);
