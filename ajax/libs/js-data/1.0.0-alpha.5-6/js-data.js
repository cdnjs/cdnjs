/**
* @author Jason Dobry <jason.dobry@gmail.com>
* @file js-data.js
* @version 1.0.0-alpha.5-6 - Homepage <http://www.js-data.io/>
* @copyright (c) 2014 Jason Dobry 
* @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
*
* @overview Data store.
*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.JSData=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
// Fixed use of "delete" keyword for IE8 compatibility
// Exposed diffObjectFromOldObject on the exported object
// Added the "equals" argument to diffObjectFromOldObject to be used to check equality
// Added a way to to define a default equality operator for diffObjectFromOldObject
// Added a way in diffObjectFromOldObject to ignore changes to certain properties
// Removed all code related to:
// - ArrayObserver
// - ArraySplice
// - PathObserver
// - CompoundObserver
// - Path
// - ObserverTransform
(function(global) {
  'use strict';

  var equalityFn = function (a, b) {
    return a === b;
  };

  var blacklist = [];

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

  function isBlacklisted(prop, bl) {
    if (!bl || !bl.length) {
      return false;
    }
    var matches;
    for (var i = 0; i < bl.length; i++) {
      if ((Object.prototype.toString.call(bl[i]) === '[object RegExp]' && bl[i].test(prop)) || bl[i] === prop) {
        return matches = prop;
      }
    }
    return !!matches;
  }

  function diffObjectFromOldObject(object, oldObject, equals, bl) {
    var added = {};
    var removed = {};
    var changed = {};

    for (var prop in oldObject) {
      var newValue = object[prop];

      if (isBlacklisted(prop, bl))
        continue;

      if (newValue !== undefined && (equals ? equals(newValue, oldObject[prop]) : newValue === oldObject[prop]))
        continue;

      if (!(prop in object)) {
        removed[prop] = undefined;
        continue;
      }

      if (equals ? !equals(newValue, oldObject[prop]) : newValue !== oldObject[prop])
        changed[prop] = newValue;
    }

    for (var prop in object) {
      if (prop in oldObject)
        continue;

      if (isBlacklisted(prop, bl))
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
        diff = diffObjectFromOldObject(this.value_, this.oldObject_, equalityFn, blacklist);
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
    'delete': true
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
  global.diffObjectFromOldObject = diffObjectFromOldObject;
  global.setEqualityFn = function (fn) {
    equalityFn = fn;
  };
  global.setBlacklist = function (bl) {
    blacklist = bl;
  };
  global.Observer.runEOM_ = runEOM;
  global.Observer.observerSentinel_ = observerSentinel; // for testing.
  global.Observer.hasObjectObserve = hasObserve;

  global.ObjectObserver = ObjectObserver;
})(exports);

},{}],2:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   2.0.0
 */

(function() {
    "use strict";

    function $$utils$$objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'object' && x !== null);
    }

    function $$utils$$isFunction(x) {
      return typeof x === 'function';
    }

    function $$utils$$isMaybeThenable(x) {
      return typeof x === 'object' && x !== null;
    }

    var $$utils$$_isArray;

    if (!Array.isArray) {
      $$utils$$_isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      $$utils$$_isArray = Array.isArray;
    }

    var $$utils$$isArray = $$utils$$_isArray;
    var $$utils$$now = Date.now || function() { return new Date().getTime(); };
    function $$utils$$F() { }

    var $$utils$$o_create = (Object.create || function (o) {
      if (arguments.length > 1) {
        throw new Error('Second argument not supported');
      }
      if (typeof o !== 'object') {
        throw new TypeError('Argument must be an object');
      }
      $$utils$$F.prototype = o;
      return new $$utils$$F();
    });

    var $$asap$$len = 0;

    var $$asap$$default = function asap(callback, arg) {
      $$asap$$queue[$$asap$$len] = callback;
      $$asap$$queue[$$asap$$len + 1] = arg;
      $$asap$$len += 2;
      if ($$asap$$len === 2) {
        // If len is 1, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        $$asap$$scheduleFlush();
      }
    };

    var $$asap$$browserGlobal = (typeof window !== 'undefined') ? window : {};
    var $$asap$$BrowserMutationObserver = $$asap$$browserGlobal.MutationObserver || $$asap$$browserGlobal.WebKitMutationObserver;

    // test for web worker but not in IE10
    var $$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
      typeof importScripts !== 'undefined' &&
      typeof MessageChannel !== 'undefined';

    // node
    function $$asap$$useNextTick() {
      return function() {
        process.nextTick($$asap$$flush);
      };
    }

    function $$asap$$useMutationObserver() {
      var iterations = 0;
      var observer = new $$asap$$BrowserMutationObserver($$asap$$flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    // web worker
    function $$asap$$useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = $$asap$$flush;
      return function () {
        channel.port2.postMessage(0);
      };
    }

    function $$asap$$useSetTimeout() {
      return function() {
        setTimeout($$asap$$flush, 1);
      };
    }

    var $$asap$$queue = new Array(1000);

    function $$asap$$flush() {
      for (var i = 0; i < $$asap$$len; i+=2) {
        var callback = $$asap$$queue[i];
        var arg = $$asap$$queue[i+1];

        callback(arg);

        $$asap$$queue[i] = undefined;
        $$asap$$queue[i+1] = undefined;
      }

      $$asap$$len = 0;
    }

    var $$asap$$scheduleFlush;

    // Decide what async method to use to triggering processing of queued callbacks:
    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
      $$asap$$scheduleFlush = $$asap$$useNextTick();
    } else if ($$asap$$BrowserMutationObserver) {
      $$asap$$scheduleFlush = $$asap$$useMutationObserver();
    } else if ($$asap$$isWorker) {
      $$asap$$scheduleFlush = $$asap$$useMessageChannel();
    } else {
      $$asap$$scheduleFlush = $$asap$$useSetTimeout();
    }

    function $$$internal$$noop() {}
    var $$$internal$$PENDING   = void 0;
    var $$$internal$$FULFILLED = 1;
    var $$$internal$$REJECTED  = 2;
    var $$$internal$$GET_THEN_ERROR = new $$$internal$$ErrorObject();

    function $$$internal$$selfFullfillment() {
      return new TypeError("You cannot resolve a promise with itself");
    }

    function $$$internal$$cannotReturnOwn() {
      return new TypeError('A promises callback cannot return that same promise.')
    }

    function $$$internal$$getThen(promise) {
      try {
        return promise.then;
      } catch(error) {
        $$$internal$$GET_THEN_ERROR.error = error;
        return $$$internal$$GET_THEN_ERROR;
      }
    }

    function $$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch(e) {
        return e;
      }
    }

    function $$$internal$$handleForeignThenable(promise, thenable, then) {
       $$asap$$default(function(promise) {
        var sealed = false;
        var error = $$$internal$$tryThen(then, thenable, function(value) {
          if (sealed) { return; }
          sealed = true;
          if (thenable !== value) {
            $$$internal$$resolve(promise, value);
          } else {
            $$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          if (sealed) { return; }
          sealed = true;

          $$$internal$$reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          $$$internal$$reject(promise, error);
        }
      }, promise);
    }

    function $$$internal$$handleOwnThenable(promise, thenable) {
      if (thenable._state === $$$internal$$FULFILLED) {
        $$$internal$$fulfill(promise, thenable._result);
      } else if (promise._state === $$$internal$$REJECTED) {
        $$$internal$$reject(promise, thenable._result);
      } else {
        $$$internal$$subscribe(thenable, undefined, function(value) {
          $$$internal$$resolve(promise, value);
        }, function(reason) {
          $$$internal$$reject(promise, reason);
        });
      }
    }

    function $$$internal$$handleMaybeThenable(promise, maybeThenable) {
      if (maybeThenable.constructor === promise.constructor) {
        $$$internal$$handleOwnThenable(promise, maybeThenable);
      } else {
        var then = $$$internal$$getThen(maybeThenable);

        if (then === $$$internal$$GET_THEN_ERROR) {
          $$$internal$$reject(promise, $$$internal$$GET_THEN_ERROR.error);
        } else if (then === undefined) {
          $$$internal$$fulfill(promise, maybeThenable);
        } else if ($$utils$$isFunction(then)) {
          $$$internal$$handleForeignThenable(promise, maybeThenable, then);
        } else {
          $$$internal$$fulfill(promise, maybeThenable);
        }
      }
    }

    function $$$internal$$resolve(promise, value) {
      if (promise === value) {
        $$$internal$$reject(promise, $$$internal$$selfFullfillment());
      } else if ($$utils$$objectOrFunction(value)) {
        $$$internal$$handleMaybeThenable(promise, value);
      } else {
        $$$internal$$fulfill(promise, value);
      }
    }

    function $$$internal$$publishRejection(promise) {
      if (promise._onerror) {
        promise._onerror(promise._result);
      }

      $$$internal$$publish(promise);
    }

    function $$$internal$$fulfill(promise, value) {
      if (promise._state !== $$$internal$$PENDING) { return; }

      promise._result = value;
      promise._state = $$$internal$$FULFILLED;

      if (promise._subscribers.length === 0) {
      } else {
        $$asap$$default($$$internal$$publish, promise);
      }
    }

    function $$$internal$$reject(promise, reason) {
      if (promise._state !== $$$internal$$PENDING) { return; }
      promise._state = $$$internal$$REJECTED;
      promise._result = reason;

      $$asap$$default($$$internal$$publishRejection, promise);
    }

    function $$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      parent._onerror = null;

      subscribers[length] = child;
      subscribers[length + $$$internal$$FULFILLED] = onFulfillment;
      subscribers[length + $$$internal$$REJECTED]  = onRejection;

      if (length === 0 && parent._state) {
        $$asap$$default($$$internal$$publish, parent);
      }
    }

    function $$$internal$$publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (subscribers.length === 0) { return; }

      var child, callback, detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          $$$internal$$invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function $$$internal$$ErrorObject() {
      this.error = null;
    }

    var $$$internal$$TRY_CATCH_ERROR = new $$$internal$$ErrorObject();

    function $$$internal$$tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch(e) {
        $$$internal$$TRY_CATCH_ERROR.error = e;
        return $$$internal$$TRY_CATCH_ERROR;
      }
    }

    function $$$internal$$invokeCallback(settled, promise, callback, detail) {
      var hasCallback = $$utils$$isFunction(callback),
          value, error, succeeded, failed;

      if (hasCallback) {
        value = $$$internal$$tryCatch(callback, detail);

        if (value === $$$internal$$TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          $$$internal$$reject(promise, $$$internal$$cannotReturnOwn());
          return;
        }

      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== $$$internal$$PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        $$$internal$$resolve(promise, value);
      } else if (failed) {
        $$$internal$$reject(promise, error);
      } else if (settled === $$$internal$$FULFILLED) {
        $$$internal$$fulfill(promise, value);
      } else if (settled === $$$internal$$REJECTED) {
        $$$internal$$reject(promise, value);
      }
    }

    function $$$internal$$initializePromise(promise, resolver) {
      try {
        resolver(function resolvePromise(value){
          $$$internal$$resolve(promise, value);
        }, function rejectPromise(reason) {
          $$$internal$$reject(promise, reason);
        });
      } catch(e) {
        $$$internal$$reject(promise, e);
      }
    }

    function $$$enumerator$$makeSettledResult(state, position, value) {
      if (state === $$$internal$$FULFILLED) {
        return {
          state: 'fulfilled',
          value: value
        };
      } else {
        return {
          state: 'rejected',
          reason: value
        };
      }
    }

    function $$$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor($$$internal$$noop, label);
      this._abortOnReject = abortOnReject;

      if (this._validateInput(input)) {
        this._input     = input;
        this.length     = input.length;
        this._remaining = input.length;

        this._init();

        if (this.length === 0) {
          $$$internal$$fulfill(this.promise, this._result);
        } else {
          this.length = this.length || 0;
          this._enumerate();
          if (this._remaining === 0) {
            $$$internal$$fulfill(this.promise, this._result);
          }
        }
      } else {
        $$$internal$$reject(this.promise, this._validationError());
      }
    }

    $$$enumerator$$Enumerator.prototype._validateInput = function(input) {
      return $$utils$$isArray(input);
    };

    $$$enumerator$$Enumerator.prototype._validationError = function() {
      return new Error('Array Methods must be provided an Array');
    };

    $$$enumerator$$Enumerator.prototype._init = function() {
      this._result = new Array(this.length);
    };

    var $$$enumerator$$default = $$$enumerator$$Enumerator;

    $$$enumerator$$Enumerator.prototype._enumerate = function() {
      var length  = this.length;
      var promise = this.promise;
      var input   = this._input;

      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
        this._eachEntry(input[i], i);
      }
    };

    $$$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
      var c = this._instanceConstructor;
      if ($$utils$$isMaybeThenable(entry)) {
        if (entry.constructor === c && entry._state !== $$$internal$$PENDING) {
          entry._onerror = null;
          this._settledAt(entry._state, i, entry._result);
        } else {
          this._willSettleAt(c.resolve(entry), i);
        }
      } else {
        this._remaining--;
        this._result[i] = this._makeResult($$$internal$$FULFILLED, i, entry);
      }
    };

    $$$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
      var promise = this.promise;

      if (promise._state === $$$internal$$PENDING) {
        this._remaining--;

        if (this._abortOnReject && state === $$$internal$$REJECTED) {
          $$$internal$$reject(promise, value);
        } else {
          this._result[i] = this._makeResult(state, i, value);
        }
      }

      if (this._remaining === 0) {
        $$$internal$$fulfill(promise, this._result);
      }
    };

    $$$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
      return value;
    };

    $$$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
      var enumerator = this;

      $$$internal$$subscribe(promise, undefined, function(value) {
        enumerator._settledAt($$$internal$$FULFILLED, i, value);
      }, function(reason) {
        enumerator._settledAt($$$internal$$REJECTED, i, reason);
      });
    };

    var $$promise$all$$default = function all(entries, label) {
      return new $$$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
    };

    var $$promise$race$$default = function race(entries, label) {
      /*jshint validthis:true */
      var Constructor = this;

      var promise = new Constructor($$$internal$$noop, label);

      if (!$$utils$$isArray(entries)) {
        $$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
        return promise;
      }

      var length = entries.length;

      function onFulfillment(value) {
        $$$internal$$resolve(promise, value);
      }

      function onRejection(reason) {
        $$$internal$$reject(promise, reason);
      }

      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
        $$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
      }

      return promise;
    };

    var $$promise$resolve$$default = function resolve(object, label) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor($$$internal$$noop, label);
      $$$internal$$resolve(promise, object);
      return promise;
    };

    var $$promise$reject$$default = function reject(reason, label) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor($$$internal$$noop, label);
      $$$internal$$reject(promise, reason);
      return promise;
    };

    var $$es6$promise$promise$$counter = 0;

    function $$es6$promise$promise$$needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function $$es6$promise$promise$$needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    var $$es6$promise$promise$$default = $$es6$promise$promise$$Promise;

    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise’s eventual value or the reason
      why the promise cannot be fulfilled.

      Terminology
      -----------

      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.

      A promise can be in one of three states: pending, fulfilled, or rejected.

      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.

      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.


      Basic Usage:
      ------------

      ```js
      var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Advanced Usage:
      ---------------

      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.

      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Unlike callbacks, promises are great composable primitives.

      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
      ```

      @class Promise
      @param {function} resolver
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @constructor
    */
    function $$es6$promise$promise$$Promise(resolver, label) {
      this._id = $$es6$promise$promise$$counter++;
      this._label = label;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      if ($$$internal$$noop !== resolver) {
        if (!$$utils$$isFunction(resolver)) {
          $$es6$promise$promise$$needsResolver();
        }

        if (!(this instanceof $$es6$promise$promise$$Promise)) {
          $$es6$promise$promise$$needsNew();
        }

        $$$internal$$initializePromise(this, resolver);
      }
    }

    $$es6$promise$promise$$Promise.all = $$promise$all$$default;
    $$es6$promise$promise$$Promise.race = $$promise$race$$default;
    $$es6$promise$promise$$Promise.resolve = $$promise$resolve$$default;
    $$es6$promise$promise$$Promise.reject = $$promise$reject$$default;

    $$es6$promise$promise$$Promise.prototype = {
      constructor: $$es6$promise$promise$$Promise,

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.

      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```

      Chaining
      --------

      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.

      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```

      Assimilation
      ------------

      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```

      If the assimliated promise rejects, then the downstream promise will also reject.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```

      Simple Example
      --------------

      Synchronous Example

      ```javascript
      var result;

      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```

      Advanced Example
      --------------

      Synchronous Example

      ```javascript
      var author, books;

      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js

      function foundBooks(books) {

      }

      function failure(reason) {

      }

      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```

      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      then: function(onFulfillment, onRejection, label) {
        var parent = this;
        var state = parent._state;

        if (state === $$$internal$$FULFILLED && !onFulfillment || state === $$$internal$$REJECTED && !onRejection) {
          return this;
        }

        parent._onerror = null;

        var child = new this.constructor($$$internal$$noop, label);
        var result = parent._result;

        if (state) {
          var callback = arguments[state - 1];
          $$asap$$default(function(){
            $$$internal$$invokeCallback(state, child, callback, result);
          });
        } else {
          $$$internal$$subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
      },

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.

      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }

      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```

      @method catch
      @param {Function} onRejection
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      'catch': function(onRejection, label) {
        return this.then(null, onRejection, label);
      }
    };

    var $$es6$promise$polyfill$$default = function polyfill() {
      var local;

      if (typeof global !== 'undefined') {
        local = global;
      } else if (typeof window !== 'undefined' && window.document) {
        local = window;
      } else {
        local = self;
      }

      var es6PromiseSupport =
        "Promise" in local &&
        // Some of these methods are missing from
        // Firefox/Chrome experimental implementations
        "resolve" in local.Promise &&
        "reject" in local.Promise &&
        "all" in local.Promise &&
        "race" in local.Promise &&
        // Older version of the spec had a resolver object
        // as the arg rather than a function
        (function() {
          var resolve;
          new local.Promise(function(r) { resolve = r; });
          return $$utils$$isFunction(resolve);
        }());

      if (!es6PromiseSupport) {
        local.Promise = $$es6$promise$promise$$default;
      }
    };

    var es6$promise$umd$$ES6Promise = {
      Promise: $$es6$promise$promise$$default,
      polyfill: $$es6$promise$polyfill$$default
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return es6$promise$umd$$ES6Promise; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = es6$promise$umd$$ES6Promise;
    } else if (typeof this !== 'undefined') {
      this['ES6Promise'] = es6$promise$umd$$ES6Promise;
    }
}).call(this);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":3}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],4:[function(require,module,exports){
var indexOf = require('./indexOf');

    /**
     * If array contains values.
     */
    function contains(arr, val) {
        return indexOf(arr, val) !== -1;
    }
    module.exports = contains;


},{"./indexOf":6}],5:[function(require,module,exports){


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



},{}],6:[function(require,module,exports){


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


},{}],7:[function(require,module,exports){
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


},{"./indexOf":6}],8:[function(require,module,exports){


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


    /**
     * Checks if the value is created by the `Object` constructor.
     */
    function isPlainObject(value) {
        return (!!value && typeof value === 'object' &&
            value.constructor === Object);
    }

    module.exports = isPlainObject;



},{}],11:[function(require,module,exports){


    /**
     * Typecast a value to a String, using an empty string value for null or
     * undefined.
     */
    function toString(val){
        return val == null ? '' : val.toString();
    }

    module.exports = toString;



},{}],12:[function(require,module,exports){
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



},{"../lang/isPlainObject":10,"./forOwn":14}],13:[function(require,module,exports){
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



},{"./hasOwn":15}],14:[function(require,module,exports){
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



},{"./forIn":13,"./hasOwn":15}],15:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}],16:[function(require,module,exports){
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



},{"../array/forEach":5}],17:[function(require,module,exports){
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



},{"../array/slice":8}],18:[function(require,module,exports){
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



},{"./namespace":16}],19:[function(require,module,exports){
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


},{"../lang/toString":11,"./lowerCase":20,"./removeNonWord":22,"./replaceAccents":23,"./upperCase":24}],20:[function(require,module,exports){
var toString = require('../lang/toString');
    /**
     * "Safer" String.toLowerCase()
     */
    function lowerCase(str){
        str = toString(str);
        return str.toLowerCase();
    }

    module.exports = lowerCase;


},{"../lang/toString":11}],21:[function(require,module,exports){
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


},{"../lang/toString":11,"./camelCase":19,"./upperCase":24}],22:[function(require,module,exports){
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


},{"../lang/toString":11}],23:[function(require,module,exports){
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


},{"../lang/toString":11}],24:[function(require,module,exports){
var toString = require('../lang/toString');
    /**
     * "Safer" String.toUpperCase()
     */
    function upperCase(str){
        str = toString(str);
        return str.toUpperCase();
    }
    module.exports = upperCase;


},{"../lang/toString":11}],25:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function create(resourceName, attrs, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];

  options = options || {};
  attrs = attrs || {};

  var promise = new DSUtils.Promise(function (resolve, reject) {
    if (!definition) {
      reject(new DSErrors.NER(resourceName));
    } else if (!DSUtils.isObject(attrs)) {
      reject(new DSErrors.IA('"attrs" must be an object!'));
    } else {
      options = DSUtils._(definition, options);
      resolve(attrs);
    }
  });

  if (definition && options.upsert && attrs[definition.idAttribute]) {
    return _this.update(resourceName, attrs[definition.idAttribute], attrs, options);
  } else {
    return promise
      .then(function (attrs) {
        return options.beforeValidate.call(attrs, options, attrs);
      })
      .then(function (attrs) {
        return options.validate.call(attrs, options, attrs);
      })
      .then(function (attrs) {
        return options.afterValidate.call(attrs, options, attrs);
      })
      .then(function (attrs) {
        return options.beforeCreate.call(attrs, options, attrs);
      })
      .then(function (attrs) {
        if (options.notify) {
          _this.emit(options, 'beforeCreate', DSUtils.copy(attrs));
        }
        return _this.getAdapter(options).create(definition, attrs, options);
      })
      .then(function (attrs) {
        return options.afterCreate.call(attrs, options, attrs);
      })
      .then(function (attrs) {
        if (options.notify) {
          _this.emit(options, 'afterCreate', DSUtils.copy(attrs));
        }
        if (options.cacheResponse) {
          var created = _this.inject(definition.name, attrs, options);
          var id = created[definition.idAttribute];
          _this.store[resourceName].completedQueries[id] = new Date().getTime();
          return created;
        } else {
          return _this.createInstance(resourceName, attrs, options);
        }
      });
  }
}

module.exports = create;

},{"../../errors":46,"../../utils":48}],26:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function destroy(resourceName, id, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var item;

  return new DSUtils.Promise(function (resolve, reject) {
    id = DSUtils.resolveId(definition, id);
    if (!definition) {
      reject(new DSErrors.NER(resourceName));
    } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
      reject(new DSErrors.IA('"id" must be a string or a number!'));
    } else {
      item = _this.get(resourceName, id) || { id: id };
      options = DSUtils._(definition, options);
      resolve(item);
    }
  })
    .then(function (attrs) {
      return options.beforeDestroy.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      if (options.notify) {
        _this.emit(options, 'beforeDestroy', DSUtils.copy(attrs));
      }
      if (options.eagerEject) {
        _this.eject(resourceName, id);
      }
      return _this.getAdapter(options).destroy(definition, id, options);
    })
    .then(function () {
      return options.afterDestroy.call(item, options, item);
    })
    .then(function (item) {
      if (options.notify) {
        _this.emit(options, 'afterDestroy', DSUtils.copy(item));
      }
      _this.eject(resourceName, id);
      return id;
    })['catch'](function (err) {
    if (options && options.eagerEject && item) {
      _this.inject(resourceName, item, { notify: false });
    }
    throw err;
  });
}

module.exports = destroy;

},{"../../errors":46,"../../utils":48}],27:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function destroyAll(resourceName, params, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var ejected, toEject;

  params = params || {};

  return new DSUtils.Promise(function (resolve, reject) {
    if (!definition) {
      reject(new DSErrors.NER(resourceName));
    } else if (!DSUtils.isObject(params)) {
      reject(new DSErrors.IA('"params" must be an object!'));
    } else {
      options = DSUtils._(definition, options);
      resolve();
    }
  }).then(function () {
      toEject = _this.defaults.defaultFilter.call(_this, resourceName, params);
      return options.beforeDestroy(options, toEject);
    }).then(function () {
      if (options.notify) {
        _this.emit(options, 'beforeDestroy', DSUtils.copy(toEject));
      }
      if (options.eagerEject) {
        ejected = _this.ejectAll(resourceName, params);
      }
      return _this.getAdapter(options).destroyAll(definition, params, options);
    }).then(function () {
      return options.afterDestroy(options, toEject);
    }).then(function () {
      if (options.notify) {
        _this.emit(options, 'afterDestroy', DSUtils.copy(toEject));
      }
      return ejected || _this.ejectAll(resourceName, params);
    })['catch'](function (err) {
      if (options && options.eagerEject && ejected) {
        _this.inject(resourceName, ejected, { notify: false });
      }
      throw err;
    });
}

module.exports = destroyAll;

},{"../../errors":46,"../../utils":48}],28:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function find(resourceName, id, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var resource = _this.store[resourceName];

  return new DSUtils.Promise(function (resolve, reject) {
    if (!definition) {
      reject(new DSErrors.NER(resourceName));
    } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
      reject(new DSErrors.IA('"id" must be a string or a number!'));
    } else {
      options = DSUtils._(definition, options);
      if (options.bypassCache || !options.cacheResponse) {
        delete resource.completedQueries[id];
      }
      if (id in resource.completedQueries) {
        resolve(_this.get(resourceName, id));
      } else {
        resolve();
      }
    }
  }).then(function (item) {
      if (!(id in resource.completedQueries)) {
        if (!(id in resource.pendingQueries)) {
          resource.pendingQueries[id] = _this.getAdapter(options).find(definition, id, options)
            .then(function (data) {
              // Query is no longer pending
              delete resource.pendingQueries[id];
              if (options.cacheResponse) {
                resource.completedQueries[id] = new Date().getTime();
                return _this.inject(resourceName, data, options);
              } else {
                return _this.createInstance(resourceName, data, options);
              }
            });
        }
        return resource.pendingQueries[id];
      } else {
        return item;
      }
    })['catch'](function (err) {
    if (resource) {
      delete resource.pendingQueries[id];
    }
    throw err;
  });
}

module.exports = find;

},{"../../errors":46,"../../utils":48}],29:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function processResults(data, resourceName, queryHash, options) {
  var _this = this;
  var resource = _this.store[resourceName];
  var idAttribute = _this.definitions[resourceName].idAttribute;
  var date = new Date().getTime();

  data = data || [];

  // Query is no longer pending
  delete resource.pendingQueries[queryHash];
  resource.completedQueries[queryHash] = date;

  // Update modified timestamp of collection
  resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);

  // Merge the new values into the cache
  var injected = _this.inject(resourceName, data, options);

  // Make sure each object is added to completedQueries
  if (DSUtils.isArray(injected)) {
    DSUtils.forEach(injected, function (item) {
      if (item && item[idAttribute]) {
        resource.completedQueries[item[idAttribute]] = date;
      }
    });
  } else {
    console.warn(errorPrefix(resourceName) + 'response is expected to be an array!');
    resource.completedQueries[injected[idAttribute]] = date;
  }

  return injected;
}

function findAll(resourceName, params, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var resource = _this.store[resourceName];
  var queryHash;

  return new DSUtils.Promise(function (resolve, reject) {
    params = params || {};

    if (!_this.definitions[resourceName]) {
      reject(new DSErrors.NER(resourceName));
    } else if (!DSUtils.isObject(params)) {
      reject(new DSErrors.IA('"params" must be an object!'));
    } else {
      options = DSUtils._(definition, options);
      queryHash = DSUtils.toJson(params);

      if (options.bypassCache || !options.cacheResponse) {
        delete resource.completedQueries[queryHash];
      }
      if (queryHash in resource.completedQueries) {
        resolve(_this.filter(resourceName, params, options));
      } else {
        resolve();
      }
    }
  }).then(function (items) {
      if (!(queryHash in resource.completedQueries)) {
        if (!(queryHash in resource.pendingQueries)) {
          resource.pendingQueries[queryHash] = _this.getAdapter(options).findAll(definition, params, options)
            .then(function (data) {
              delete resource.pendingQueries[queryHash];
              if (options.cacheResponse) {
                return processResults.call(_this, data, resourceName, queryHash, options);
              } else {
                DSUtils.forEach(data, function (item, i) {
                  data[i] = _this.createInstance(resourceName, item, options);
                });
                return data;
              }
            });
        }

        return resource.pendingQueries[queryHash];
      } else {
        return items;
      }
    })['catch'](function (err) {
    if (resource) {
      delete resource.pendingQueries[queryHash];
    }
    throw err;
  });
}

module.exports = findAll;

},{"../../errors":46,"../../utils":48}],30:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function reap(resourceName, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var resource = _this.store[resourceName];

  return new DSUtils.Promise(function (resolve, reject) {

    if (!definition) {
      reject(new _this.errors.NER(resourceName));
    } else {
      options = DSUtils._(definition, options);
      if (!options.hasOwnProperty('notify')) {
        options.notify = false;
      }
      var items = [];
      var now = new Date().getTime();
      var expiredItem;
      while ((expiredItem = resource.expiresHeap.peek()) && expiredItem.expires < now) {
        items.push(expiredItem.item);
        delete expiredItem.item;
        resource.expiresHeap.pop();
      }
      resolve(items);
    }
  }).then(function (items) {
      if (options.isInterval || options.notify) {
        definition.beforeReap(options, items);
        _this.emit(options, 'beforeReap', DSUtils.copy(items));
      }
      if (options.reapAction === 'inject') {
        DSUtils.forEach(items, function (item) {
          var id = item[definition.idAttribute];
          resource.expiresHeap.push({
            item: item,
            timestamp: resource.saved[id],
            expires: definition.maxAge ? resource.saved[id] + definition.maxAge : Number.MAX_VALUE
          });
        });
      } else if (options.reapAction === 'eject') {
        DSUtils.forEach(items, function (item) {
          _this.eject(resourceName, item[definition.idAttribute]);
        });
      } else if (options.reapAction === 'refresh') {
        var tasks = [];
        DSUtils.forEach(items, function (item) {
          tasks.push(_this.refresh(resourceName, item[definition.idAttribute]));
        });
        return DSUtils.Promise.all(tasks);
      }
      return items;
    }).then(function (items) {
      if (options.isInterval || options.notify) {
        definition.afterReap(options, items);
        _this.emit(options, 'afterReap', DSUtils.copy(items));
      }
      return items;
    });
}

function refresh(resourceName, id, options) {
  var _this = this;

  return new DSUtils.Promise(function (resolve, reject) {
    var definition = _this.definitions[resourceName];
    id = DSUtils.resolveId(_this.definitions[resourceName], id);
    if (!definition) {
      reject(new _this.errors.NER(resourceName));
    } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
      reject(new DSErrors.IA('"id" must be a string or a number!'));
    } else {
      options = DSUtils._(definition, options);
      options.bypassCache = true;
      resolve(_this.get(resourceName, id));
    }
  }).then(function (item) {
      if (item) {
        return _this.find(resourceName, id, options);
      } else {
        return item;
      }
    });
}

module.exports = {
  create: require('./create'),
  destroy: require('./destroy'),
  destroyAll: require('./destroyAll'),
  find: require('./find'),
  findAll: require('./findAll'),
  loadRelations: require('./loadRelations'),
  reap: reap,
  refresh: refresh,
  save: require('./save'),
  update: require('./update'),
  updateAll: require('./updateAll')
};

},{"../../errors":46,"../../utils":48,"./create":25,"./destroy":26,"./destroyAll":27,"./find":28,"./findAll":29,"./loadRelations":31,"./save":32,"./update":33,"./updateAll":34}],31:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function loadRelations(resourceName, instance, relations, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var fields = [];

  return new DSUtils.Promise(function (resolve, reject) {
    if (DSUtils.isString(instance) || DSUtils.isNumber(instance)) {
      instance = _this.get(resourceName, instance);
    }

    if (DSUtils.isString(relations)) {
      relations = [relations];
    }

    if (!definition) {
      reject(new DSErrors.NER(resourceName));
    } else if (!DSUtils.isObject(instance)) {
      reject(new DSErrors.IA('"instance(id)" must be a string, number or object!'));
    } else if (!DSUtils.isArray(relations)) {
      reject(new DSErrors.IA('"relations" must be a string or an array!'));
    } else {
      options = DSUtils._(definition, options);
      if (!options.hasOwnProperty('findBelongsTo')) {
        options.findBelongsTo = true;
      }
      if (!options.hasOwnProperty('findHasMany')) {
        options.findHasMany = true;
      }

      var tasks = [];

      DSUtils.forEach(definition.relationList, function (def) {
        var relationName = def.relation;
        if (DSUtils.contains(relations, relationName)) {
          var task;
          var params = {};
          if (options.allowSimpleWhere) {
            params[def.foreignKey] = instance[definition.idAttribute];
          } else {
            params.where = {};
            params.where[def.foreignKey] = {
              '==': instance[definition.idAttribute]
            };
          }

          if (def.type === 'hasMany' && params[def.foreignKey]) {
            task = _this.findAll(relationName, params, options);
          } else if (def.type === 'hasOne') {
            if (def.localKey && instance[def.localKey]) {
              task = _this.find(relationName, instance[def.localKey], options);
            } else if (def.foreignKey && params[def.foreignKey]) {
              task = _this.findAll(relationName, params, options).then(function (hasOnes) {
                return hasOnes.length ? hasOnes[0] : null;
              });
            }
          } else if (instance[def.localKey]) {
            task = _this.find(relationName, instance[def.localKey], options);
          }

          if (task) {
            tasks.push(task);
            fields.push(def.localField);
          }
        }
      });

      resolve(tasks);
    }
  })
    .then(function (tasks) {
      return DSUtils.Promise.all(tasks);
    })
    .then(function (loadedRelations) {
      DSUtils.forEach(fields, function (field, index) {
        instance[field] = loadedRelations[index];
      });
      return instance;
    });
}

module.exports = loadRelations;

},{"../../errors":46,"../../utils":48}],32:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function save(resourceName, id, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var item;

  return new DSUtils.Promise(function (resolve, reject) {
    id = DSUtils.resolveId(definition, id);
    if (!definition) {
      reject(new DSErrors.NER(resourceName));
    } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
      reject(new DSErrors.IA('"id" must be a string or a number!'));
    } else if (!_this.get(resourceName, id)) {
      reject(new DSErrors.R('id "' + id + '" not found in cache!'));
    } else {
      item = _this.get(resourceName, id);
      options = DSUtils._(definition, options);
      resolve(item);
    }
  }).then(function (attrs) {
      return options.beforeValidate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      return options.validate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      return options.afterValidate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      return options.beforeUpdate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      if (options.notify) {
        _this.emit(options, 'beforeUpdate', DSUtils.copy(attrs));
      }
      if (options.changesOnly) {
        var resource = _this.store[resourceName];
        if (DSUtils.w) {
          resource.observers[id].deliver();
        }
        var toKeep = [];
        var changes = _this.changes(resourceName, id);

        for (var key in changes.added) {
          toKeep.push(key);
        }
        for (key in changes.changed) {
          toKeep.push(key);
        }
        changes = DSUtils.pick(attrs, toKeep);
        if (DSUtils.isEmpty(changes)) {
          // no changes, return
          return attrs;
        } else {
          attrs = changes;
        }
      }
      return _this.getAdapter(options).update(definition, id, attrs, options);
    })
    .then(function (data) {
      return options.afterUpdate.call(data, options, data);
    })
    .then(function (attrs) {
      if (options.notify) {
        _this.emit(options, 'afterUpdate', DSUtils.copy(attrs));
      }
      if (options.cacheResponse) {
        return _this.inject(definition.name, attrs, options);
      } else {
        return attrs;
      }
    });
}

module.exports = save;

},{"../../errors":46,"../../utils":48}],33:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function update(resourceName, id, attrs, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];

  return new DSUtils.Promise(function (resolve, reject) {
    id = DSUtils.resolveId(definition, id);
    if (!definition) {
      reject(new DSErrors.NER(resourceName));
    } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
      reject(new DSErrors.IA('"id" must be a string or a number!'));
    } else {
      options = DSUtils._(definition, options);
      resolve(attrs);
    }
  }).then(function (attrs) {
      return options.beforeValidate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      return options.validate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      return options.afterValidate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      return options.beforeUpdate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      if (options.notify) {
        _this.emit(options, 'beforeUpdate', DSUtils.copy(attrs));
      }
      return _this.getAdapter(options).update(definition, id, attrs, options);
    })
    .then(function (data) {
      return options.afterUpdate.call(data, options, data);
    })
    .then(function (attrs) {
      if (options.notify) {
        _this.emit(options, 'afterUpdate', DSUtils.copy(attrs));
      }
      if (options.cacheResponse) {
        return _this.inject(definition.name, attrs, options);
      } else {
        return attrs;
      }
    });
}

module.exports = update;

},{"../../errors":46,"../../utils":48}],34:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function updateAll(resourceName, attrs, params, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];

  return new DSUtils.Promise(function (resolve, reject) {
    if (!definition) {
      reject(new DSErrors.NER(resourceName));
    } else {
      options = DSUtils._(definition, options);
      resolve(attrs);
    }
  }).then(function (attrs) {
      return options.beforeValidate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      return options.validate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      return options.afterValidate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      return options.beforeUpdate.call(attrs, options, attrs);
    })
    .then(function (attrs) {
      if (options.notify) {
        _this.emit(options, 'beforeUpdate', DSUtils.copy(attrs));
      }
      return _this.getAdapter(options).updateAll(definition, attrs, params, options);
    })
    .then(function (data) {
      return options.afterUpdate.call(data, options, data);
    })
    .then(function (data) {
      if (options.notify) {
        _this.emit(options, 'afterUpdate', DSUtils.copy(attrs));
      }
      if (options.cacheResponse) {
        return _this.inject(definition.name, data, options);
      } else {
        return data;
      }
    });
}

module.exports = updateAll;

},{"../../errors":46,"../../utils":48}],35:[function(require,module,exports){
var DSUtils = require('../utils');
var DSErrors = require('../errors');
var syncMethods = require('./sync_methods');
var asyncMethods = require('./async_methods');
var Schemator;

function lifecycleNoopCb(resource, attrs, cb) {
  cb(null, attrs);
}

function lifecycleNoop(resource, attrs) {
  return attrs;
}

function compare(orderBy, index, a, b) {
  var def = orderBy[index];
  var cA = a[def[0]], cB = b[def[0]];
  if (DSUtils.isString(cA)) {
    cA = DSUtils.upperCase(cA);
  }
  if (DSUtils.isString(cB)) {
    cB = DSUtils.upperCase(cB);
  }
  if (def[1] === 'DESC') {
    if (cB < cA) {
      return -1;
    } else if (cB > cA) {
      return 1;
    } else {
      if (index < orderBy.length - 1) {
        return compare(orderBy, index + 1, a, b);
      } else {
        return 0;
      }
    }
  } else {
    if (cA < cB) {
      return -1;
    } else if (cA > cB) {
      return 1;
    } else {
      if (index < orderBy.length - 1) {
        return compare(orderBy, index + 1, a, b);
      } else {
        return 0;
      }
    }
  }
}

function Defaults() {
}

var defaultsPrototype = Defaults.prototype;

defaultsPrototype.idAttribute = 'id';
defaultsPrototype.basePath = '';
defaultsPrototype.endpoint = '';
defaultsPrototype.useClass = true;
defaultsPrototype.keepChangeHistory = false;
defaultsPrototype.resetHistoryOnInject = true;
defaultsPrototype.eagerEject = false;
// TODO: Implement eagerInject in DS#create
defaultsPrototype.eagerInject = false;
defaultsPrototype.allowSimpleWhere = true;
defaultsPrototype.defaultAdapter = 'http';
defaultsPrototype.loadFromServer = false;
defaultsPrototype.notify = !!DSUtils.w;
defaultsPrototype.upsert = !!DSUtils.w;
defaultsPrototype.cacheResponse = !!DSUtils.w;
defaultsPrototype.bypassCache = false;
defaultsPrototype.ignoreMissing = false;
defaultsPrototype.findInverseLinks = true;
defaultsPrototype.findBelongsTo = true;
defaultsPrototype.findHasOne = true;
defaultsPrototype.findHasMany = true;
defaultsPrototype.reapInterval = !!DSUtils.w ? 30000 : false;
defaultsPrototype.reapAction = !!DSUtils.w ? 'inject' : 'none';
defaultsPrototype.maxAge = false;
defaultsPrototype.ignoredChanges = [/\$/];
defaultsPrototype.beforeValidate = lifecycleNoopCb;
defaultsPrototype.validate = lifecycleNoopCb;
defaultsPrototype.afterValidate = lifecycleNoopCb;
defaultsPrototype.beforeCreate = lifecycleNoopCb;
defaultsPrototype.afterCreate = lifecycleNoopCb;
defaultsPrototype.beforeUpdate = lifecycleNoopCb;
defaultsPrototype.afterUpdate = lifecycleNoopCb;
defaultsPrototype.beforeDestroy = lifecycleNoopCb;
defaultsPrototype.afterDestroy = lifecycleNoopCb;
defaultsPrototype.beforeCreateInstance = lifecycleNoop;
defaultsPrototype.afterCreateInstance = lifecycleNoop;
defaultsPrototype.beforeInject = lifecycleNoop;
defaultsPrototype.afterInject = lifecycleNoop;
defaultsPrototype.beforeEject = lifecycleNoop;
defaultsPrototype.afterEject = lifecycleNoop;
defaultsPrototype.beforeReap = lifecycleNoop;
defaultsPrototype.afterReap = lifecycleNoop;
defaultsPrototype.defaultFilter = function (collection, resourceName, params, options) {
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

  params = params || {};
  options = options || {};

  if (DSUtils.isObject(params.where)) {
    where = params.where;
  } else {
    where = {};
  }

  if (options.allowSimpleWhere) {
    DSUtils.forOwn(params, function (value, key) {
      if (!(key in reserved) && !(key in where)) {
        where[key] = {
          '==': value
        };
      }
    });
  }

  if (DSUtils.isEmpty(where)) {
    where = null;
  }

  if (where) {
    filtered = DSUtils.filter(filtered, function (attrs) {
      var first = true;
      var keep = true;
      DSUtils.forOwn(where, function (clause, field) {
        if (DSUtils.isString(clause)) {
          clause = {
            '===': clause
          };
        } else if (DSUtils.isNumber(clause) || DSUtils.isBoolean(clause)) {
          clause = {
            '==': clause
          };
        }
        if (DSUtils.isObject(clause)) {
          DSUtils.forOwn(clause, function (term, op) {
            var expr;
            var isOr = op[0] === '|';
            var val = attrs[field];
            op = isOr ? op.substr(1) : op;
            if (op === '==') {
              expr = val == term;
            } else if (op === '===') {
              expr = val === term;
            } else if (op === '!=') {
              expr = val != term;
            } else if (op === '!==') {
              expr = val !== term;
            } else if (op === '>') {
              expr = val > term;
            } else if (op === '>=') {
              expr = val >= term;
            } else if (op === '<') {
              expr = val < term;
            } else if (op === '<=') {
              expr = val <= term;
            } else if (op === 'isectEmpty') {
              expr = !DSUtils.intersection((val || []), (term || [])).length;
            } else if (op === 'isectNotEmpty') {
              expr = DSUtils.intersection((val || []), (term || [])).length;
            } else if (op === 'in') {
              if (DSUtils.isString(term)) {
                expr = term.indexOf(val) !== -1;
              } else {
                expr = DSUtils.contains(term, val);
              }
            } else if (op === 'notIn') {
              if (DSUtils.isString(term)) {
                expr = term.indexOf(val) === -1;
              } else {
                expr = !DSUtils.contains(term, val);
              }
            }
            if (expr !== undefined) {
              keep = first ? expr : (isOr ? keep || expr : keep && expr);
            }
            first = false;
          });
        }
      });
      return keep;
    });
  }

  var orderBy = null;

  if (DSUtils.isString(params.orderBy)) {
    orderBy = [
      [params.orderBy, 'ASC']
    ];
  } else if (DSUtils.isArray(params.orderBy)) {
    orderBy = params.orderBy;
  }

  if (!orderBy && DSUtils.isString(params.sort)) {
    orderBy = [
      [params.sort, 'ASC']
    ];
  } else if (!orderBy && DSUtils.isArray(params.sort)) {
    orderBy = params.sort;
  }

  // Apply 'orderBy'
  if (orderBy) {
    var index = 0;
    DSUtils.forEach(orderBy, function (def, i) {
      if (DSUtils.isString(def)) {
        orderBy[i] = [def, 'ASC'];
      } else if (!DSUtils.isArray(def)) {
        throw new _this.errors.IllegalArgumentError('DS.filter(resourceName[, params][, options]): ' + DSUtils.toJson(def) + ': Must be a string or an array!', {
          params: {
            'orderBy[i]': {
              actual: typeof def,
              expected: 'string|array'
            }
          }
        });
      }
    });
    filtered = DSUtils.sort(filtered, function (a, b) {
      return compare(orderBy, index, a, b);
    });
  }

  var limit = DSUtils.isNumber(params.limit) ? params.limit : null;
  var skip = null;

  if (DSUtils.isNumber(params.skip)) {
    skip = params.skip;
  } else if (DSUtils.isNumber(params.offset)) {
    skip = params.offset;
  }

  // Apply 'limit' and 'skip'
  if (limit && skip) {
    filtered = DSUtils.slice(filtered, skip, Math.min(filtered.length, skip + limit));
  } else if (DSUtils.isNumber(limit)) {
    filtered = DSUtils.slice(filtered, 0, Math.min(filtered.length, limit));
  } else if (DSUtils.isNumber(skip)) {
    if (skip < filtered.length) {
      filtered = DSUtils.slice(filtered, skip);
    } else {
      filtered = [];
    }
  }

  return filtered;
};

function DS(options) {
  options = options || {};

  try {
    Schemator = require('js-data-schema');
  } catch (e) {
  }

  if (!Schemator) {
    try {
      Schemator = window.Schemator;
    } catch (e) {
    }
  }

  if (Schemator || options.schemator) {
    this.schemator = options.schemator || new Schemator();
  }

  this.store = {};
  this.definitions = {};
  this.adapters = {};
  this.defaults = new Defaults();
  this.observe = DSUtils.observe;
  DSUtils.deepMixIn(this.defaults, options);
}

var dsPrototype = DS.prototype;

dsPrototype.getAdapter = function (options) {
  options = options || {};
  return this.adapters[options.adapter] || this.adapters[options.defaultAdapter];
};

dsPrototype.registerAdapter = function (name, Adapter, options) {
  options = options || {};
  if (DSUtils.isFunction(Adapter)) {
    this.adapters[name] = new Adapter(options);
  } else {
    this.adapters[name] = Adapter;
  }
  if (options.default) {
    this.defaults.defaultAdapter = name;
  }
};

dsPrototype.emit = function (definition, event) {
  var args = Array.prototype.slice.call(arguments, 2);
  args.unshift(definition.name);
  args.unshift('DS.' + event);
  definition.emit.apply(definition, args);
};

dsPrototype.errors = require('../errors');
dsPrototype.utils = DSUtils;
DSUtils.deepMixIn(dsPrototype, syncMethods);
DSUtils.deepMixIn(dsPrototype, asyncMethods);

module.exports = DS;

},{"../errors":46,"../utils":48,"./async_methods":30,"./sync_methods":40,"js-data-schema":"js-data-schema"}],36:[function(require,module,exports){
/*jshint evil:true, loopfunc:true*/
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function Resource(options) {

  DSUtils.deepMixIn(this, options);

  if ('endpoint' in options) {
    this.endpoint = options.endpoint;
  } else {
    this.endpoint = this.name;
  }
}

var instanceMethods = [
  'compute',
  'refresh',
  'save',
  'update',
  'destroy',
  'loadRelations',
  'changeHistory',
  'changes',
  'hasChanges',
  'lastModified',
  'lastSaved',
  'link',
  'linkInverse',
  'previous',
  'unlinkInverse'
];

function defineResource(definition) {
  var _this = this;
  var definitions = _this.definitions;

  if (DSUtils.isString(definition)) {
    definition = {
      name: definition.replace(/\s/gi, '')
    };
  }
  if (!DSUtils.isObject(definition)) {
    throw new DSErrors.IA('"definition" must be an object!');
  } else if (!DSUtils.isString(definition.name)) {
    throw new DSErrors.IA('"name" must be a string!');
  } else if (_this.store[definition.name]) {
    throw new DSErrors.R(definition.name + ' is already registered!');
  }

  try {
    // Inherit from global defaults
    Resource.prototype = _this.defaults;
    definitions[definition.name] = new Resource(definition);

    var def = definitions[definition.name];

    if (!DSUtils.isString(def.idAttribute)) {
      throw new DSErrors.IA('"idAttribute" must be a string!');
    }

    // Setup nested parent configuration
    if (def.relations) {
      def.relationList = [];
      def.relationFields = [];
      DSUtils.forOwn(def.relations, function (relatedModels, type) {
        DSUtils.forOwn(relatedModels, function (defs, relationName) {
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
        DSUtils.forOwn(def.relations.belongsTo, function (relatedModel, modelName) {
          DSUtils.forEach(relatedModel, function (relation) {
            if (relation.parent) {
              def.parent = modelName;
              def.parentKey = relation.localKey;
            }
          });
        });
      }
      if (typeof Object.freeze === 'function') {
        Object.freeze(def.relations);
        Object.freeze(def.relationList);
      }
    }

    def.getEndpoint = function (attrs, options) {
      options = DSUtils.deepMixIn({}, options);
      var parent = this.parent;
      var parentKey = this.parentKey;
      var item;
      var endpoint;
      var thisEndpoint = options.endpoint || this.endpoint;
      var parentDef = definitions[parent];
      delete options.endpoint;
      options = options || {};
      options.params = options.params || {};
      if (parent && parentKey && parentDef && options.params[parentKey] !== false) {
        if (DSUtils.isNumber(attrs) || DSUtils.isString(attrs)) {
          item = _this.get(this.name, attrs);
        }
        if (DSUtils.isObject(attrs) && parentKey in attrs) {
          delete options.params[parentKey];
          endpoint = DSUtils.makePath(parentDef.getEndpoint(attrs, options), attrs[parentKey], thisEndpoint);
        } else if (item && parentKey in item) {
          delete options.params[parentKey];
          endpoint = DSUtils.makePath(parentDef.getEndpoint(attrs, options), item[parentKey], thisEndpoint);
        } else if (options && options.params[parentKey]) {
          endpoint = DSUtils.makePath(parentDef.getEndpoint(attrs, options), options.params[parentKey], thisEndpoint);
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

    // Create the wrapper class for the new resource
    def['class'] = DSUtils.pascalCase(definition.name);
    try {
      eval('function ' + def['class'] + '() {}');
      def[def['class']] = eval(def['class']);
    } catch (e) {
      def[def['class']] = function () {
      };
    }

    // Apply developer-defined methods
    if (def.methods) {
      DSUtils.deepMixIn(def[def['class']].prototype, def.methods);
    }

    // Prepare for computed properties
    if (def.computed) {
      DSUtils.forOwn(def.computed, function (fn, field) {
        if (DSUtils.isFunction(fn)) {
          def.computed[field] = [fn];
          fn = def.computed[field];
        }
        if (def.methods && field in def.methods) {
          console.warn('Computed property "' + field + '" conflicts with previously defined prototype method!');
        }
        var deps;
        if (fn.length === 1) {
          var match = fn[0].toString().match(/function.*?\(([\s\S]*?)\)/);
          deps = match[1].split(',');
          def.computed[field] = deps.concat(fn);
          fn = def.computed[field];
          if (deps.length) {
            console.warn('Use the computed property array syntax for compatibility with minified code!');
          }
        }
        deps = fn.slice(0, fn.length - 1);
        DSUtils.forEach(deps, function (val, index) {
          deps[index] = val.trim();
        });
        fn.deps = DSUtils.filter(deps, function (dep) {
          return !!dep;
        });
      });
    }

    if (definition.schema && _this.schemator) {
      def.schema = _this.schemator.defineSchema(def.name, definition.schema);

      if (!definition.hasOwnProperty('validate')) {
        def.validate = function (resourceName, attrs, cb) {
          def.schema.validate(attrs, {
            ignoreMissing: def.ignoreMissing
          }, function (err) {
            if (err) {
              return cb(err);
            } else {
              return cb(null, attrs);
            }
          });
        };
      }
    }

    DSUtils.forEach(instanceMethods, function (name) {
      def[def['class']].prototype['DS' + DSUtils.pascalCase(name)] = function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this[def.idAttribute] || this);
        args.unshift(def.name);
        return _this[name].apply(_this, args);
      };
    });

    // Initialize store data for the new resource
    _this.store[def.name] = {
      collection: [],
      expiresHeap: new DSUtils.DSBinaryHeap(function (x) {
        return x.expires;
      }, function (x, y) {
        return x.item === y;
      }),
      completedQueries: {},
      pendingQueries: {},
      index: {},
      modified: {},
      saved: {},
      previousAttributes: {},
      observers: {},
      changeHistories: {},
      changeHistory: [],
      collectionModified: 0
    };

    if (def.reapInterval) {
      setInterval(function () {
        _this.reap(def.name, { isInterval: true });
      }, def.reapInterval);
    }

    // Proxy DS methods with shorthand ones
    for (var key in _this) {
      if (typeof _this[key] === 'function' && key !== 'defineResource') {
        (function (k) {
          def[k] = function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(def.name);
            return _this[k].apply(_this, args);
          };
        })(key);
      }
    }

    def.beforeValidate = DSUtils.promisify(def.beforeValidate);
    def.validate = DSUtils.promisify(def.validate);
    def.afterValidate = DSUtils.promisify(def.afterValidate);
    def.beforeCreate = DSUtils.promisify(def.beforeCreate);
    def.afterCreate = DSUtils.promisify(def.afterCreate);
    def.beforeUpdate = DSUtils.promisify(def.beforeUpdate);
    def.afterUpdate = DSUtils.promisify(def.afterUpdate);
    def.beforeDestroy = DSUtils.promisify(def.beforeDestroy);
    def.afterDestroy = DSUtils.promisify(def.afterDestroy);

    // Mix-in events
    DSUtils.Events(def);

    return def;
  } catch (err) {
    delete definitions[definition.name];
    delete _this.store[definition.name];
    throw err;
  }
}

module.exports = defineResource;

},{"../../errors":46,"../../utils":48}],37:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function eject(resourceName, id, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var resource = _this.store[resourceName];
  var item;
  var found = false;

  id = DSUtils.resolveId(definition, id);

  if (!definition) {
    throw new DSErrors.NER(resourceName);
  } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new DSErrors.IA('"id" must be a string or a number!');
  }

  options = DSUtils._(definition, options);

  for (var i = 0; i < resource.collection.length; i++) {
    if (resource.collection[i][definition.idAttribute] == id) {
      item = resource.collection[i];
      resource.expiresHeap.remove(item);
      found = true;
      break;
    }
  }
  if (found) {
    if (options.notify) {
      definition.beforeEject(options, item);
      _this.emit(options, 'beforeEject', DSUtils.copy(item));
    }
    _this.unlinkInverse(definition.name, id);
    resource.collection.splice(i, 1);
    if (DSUtils.w) {
      resource.observers[id].close();
    }
    delete resource.observers[id];

    delete resource.index[id];
    delete resource.previousAttributes[id];
    delete resource.completedQueries[id];
    delete resource.pendingQueries[id];
    DSUtils.forEach(resource.changeHistories[id], function (changeRecord) {
      DSUtils.remove(resource.changeHistory, changeRecord);
    });
    delete resource.changeHistories[id];
    delete resource.modified[id];
    delete resource.saved[id];
    resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);

    if (options.notify) {
      definition.afterEject(options, item);
      _this.emit(options, 'afterEject', DSUtils.copy(item));
    }

    return item;
  }
}

module.exports = eject;

},{"../../errors":46,"../../utils":48}],38:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function ejectAll(resourceName, params, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  params = params || {};

  if (!definition) {
    throw new DSErrors.NER(resourceName);
  } else if (!DSUtils.isObject(params)) {
    throw new DSErrors.IA('"params" must be an object!');
  }
  var resource = _this.store[resourceName];
  if (DSUtils.isEmpty(params)) {
    resource.completedQueries = {};
  }
  var queryHash = DSUtils.toJson(params);
  var items = _this.filter(definition.name, params);
  var ids = [];
  DSUtils.forEach(items, function (item) {
    if (item && item[definition.idAttribute]) {
      ids.push(item[definition.idAttribute]);
    }
  });

  DSUtils.forEach(ids, function (id) {
    _this.eject(definition.name, id, options);
  });

  delete resource.completedQueries[queryHash];
  resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);

  return items;
}

module.exports = ejectAll;

},{"../../errors":46,"../../utils":48}],39:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function filter(resourceName, params, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var resource = _this.store[resourceName];

  if (!definition) {
    throw new DSErrors.NER(resourceName);
  } else if (params && !DSUtils.isObject(params)) {
    throw new DSErrors.IA('"params" must be an object!');
  }

  options = DSUtils._(definition, options);

  // Protect against null
  params = params || {};

  var queryHash = DSUtils.toJson(params);

  if (!(queryHash in resource.completedQueries) && options.loadFromServer) {
    // This particular query has never been completed

    if (!resource.pendingQueries[queryHash]) {
      // This particular query has never even been started
      _this.findAll(resourceName, params, options);
    }
  }

  return definition.defaultFilter.call(_this, resource.collection, resourceName, params, options);
}

module.exports = filter;

},{"../../errors":46,"../../utils":48}],40:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');
var NER = DSErrors.NER;
var IA = DSErrors.IA;

function changes(resourceName, id, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  options = options || {};

  id = DSUtils.resolveId(definition, id);
  if (!definition) {
    throw new NER(resourceName);
  } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new IA('"id" must be a string or a number!');
  }
  options = DSUtils._(definition, options);

  var item = _this.get(resourceName, id);
  if (item) {
    if (DSUtils.w) {
      _this.store[resourceName].observers[id].deliver();
    }
    var diff = DSUtils.diffObjectFromOldObject(item, _this.store[resourceName].previousAttributes[id], DSUtils.equals, options.ignoredChanges);
    DSUtils.forOwn(diff, function (changeset, name) {
      var toKeep = [];
      DSUtils.forOwn(changeset, function (value, field) {
        if (!DSUtils.isFunction(value)) {
          toKeep.push(field);
        }
      });
      diff[name] = DSUtils.pick(diff[name], toKeep);
    });
    DSUtils.forEach(definition.relationFields, function (field) {
      delete diff.added[field];
      delete diff.removed[field];
      delete diff.changed[field];
    });
    return diff;
  }
}

function changeHistory(resourceName, id) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var resource = _this.store[resourceName];

  id = DSUtils.resolveId(definition, id);
  if (resourceName && !_this.definitions[resourceName]) {
    throw new NER(resourceName);
  } else if (id && !DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new IA('"id" must be a string or a number!');
  }

  if (!definition.keepChangeHistory) {
    console.warn('changeHistory is disabled for this resource!');
  } else {
    if (resourceName) {
      var item = _this.get(resourceName, id);
      if (item) {
        return resource.changeHistories[id];
      }
    } else {
      return resource.changeHistory;
    }
  }
}

function compute(resourceName, instance) {
  var _this = this;
  var definition = _this.definitions[resourceName];

  instance = DSUtils.resolveItem(_this.store[resourceName], instance);
  if (!definition) {
    throw new NER(resourceName);
  } else if (!DSUtils.isObject(instance) && !DSUtils.isString(instance) && !DSUtils.isNumber(instance)) {
    throw new IA('"instance" must be an object, string or number!');
  }

  if (DSUtils.isString(instance) || DSUtils.isNumber(instance)) {
    instance = _this.get(resourceName, instance);
  }

  DSUtils.forOwn(definition.computed, function (fn, field) {
    DSUtils.compute.call(instance, fn, field);
  });

  return instance;
}

function createInstance(resourceName, attrs, options) {
  var definition = this.definitions[resourceName];
  var item;

  attrs = attrs || {};

  if (!definition) {
    throw new NER(resourceName);
  } else if (attrs && !DSUtils.isObject(attrs)) {
    throw new IA('"attrs" must be an object!');
  }

  options = DSUtils._(definition, options);

  if (options.notify) {
    options.beforeCreateInstance(options, attrs);
  }

  if (options.useClass) {
    var Constructor = definition[definition.class];
    item = new Constructor();
  } else {
    item = {};
  }
  DSUtils.deepMixIn(item, attrs);
  if (options.notify) {
    options.afterCreateInstance(options, attrs);
  }
  return item;
}

function diffIsEmpty(diff) {
  return !(DSUtils.isEmpty(diff.added) &&
  DSUtils.isEmpty(diff.removed) &&
  DSUtils.isEmpty(diff.changed));
}

function digest() {
  this.observe.Platform.performMicrotaskCheckpoint();
}

function get(resourceName, id, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];

  if (!definition) {
    throw new NER(resourceName);
  } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new IA('"id" must be a string or a number!');
  }

  options = DSUtils._(definition, options);

  // cache miss, request resource from server
  var item = _this.store[resourceName].index[id];
  if (!item && options.loadFromServer) {
    _this.find(resourceName, id, options);
  }

  // return resource from cache
  return item;
}

function getAll(resourceName, ids) {
  var _this = this;
  var resource = _this.store[resourceName];
  var collection = [];

  if (!_this.definitions[resourceName]) {
    throw new NER(resourceName);
  } else if (ids && !DSUtils.isArray(ids)) {
    throw new IA('"ids" must be an array!');
  }

  if (DSUtils.isArray(ids)) {
    var length = ids.length;
    for (var i = 0; i < length; i++) {
      if (resource.index[ids[i]]) {
        collection.push(resource.index[ids[i]]);
      }
    }
  } else {
    collection = resource.collection.slice();
  }

  return collection;
}

function hasChanges(resourceName, id) {
  var _this = this;

  id = DSUtils.resolveId(_this.definitions[resourceName], id);

  if (!_this.definitions[resourceName]) {
    throw new NER(resourceName);
  } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new IA('"id" must be a string or a number!');
  }

  // return resource from cache
  if (_this.get(resourceName, id)) {
    return diffIsEmpty(_this.changes(resourceName, id));
  } else {
    return false;
  }
}

function lastModified(resourceName, id) {
  var definition = this.definitions[resourceName];
  var resource = this.store[resourceName];

  id = DSUtils.resolveId(definition, id);
  if (!definition) {
    throw new NER(resourceName);
  }
  if (id) {
    if (!(id in resource.modified)) {
      resource.modified[id] = 0;
    }
    return resource.modified[id];
  }
  return resource.collectionModified;
}

function lastSaved(resourceName, id) {
  var definition = this.definitions[resourceName];
  var resource = this.store[resourceName];

  id = DSUtils.resolveId(definition, id);
  if (!definition) {
    throw new NER(resourceName);
  }
  if (!(id in resource.saved)) {
    resource.saved[id] = 0;
  }
  return resource.saved[id];
}

function previous(resourceName, id) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var resource = _this.store[resourceName];

  id = DSUtils.resolveId(definition, id);
  if (!definition) {
    throw new NER(resourceName);
  } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new IA('"id" must be a string or a number!');
  }

  // return resource from cache
  return resource.previousAttributes[id] ? DSUtils.copy(resource.previousAttributes[id]) : undefined;
}

module.exports = {
  changes: changes,
  changeHistory: changeHistory,
  compute: compute,
  createInstance: createInstance,
  defineResource: require('./defineResource'),
  digest: digest,
  eject: require('./eject'),
  ejectAll: require('./ejectAll'),
  filter: require('./filter'),
  get: get,
  getAll: getAll,
  hasChanges: hasChanges,
  inject: require('./inject'),
  lastModified: lastModified,
  lastSaved: lastSaved,
  link: require('./link'),
  linkAll: require('./linkAll'),
  linkInverse: require('./linkInverse'),
  previous: previous,
  unlinkInverse: require('./unlinkInverse')
};

},{"../../errors":46,"../../utils":48,"./defineResource":36,"./eject":37,"./ejectAll":38,"./filter":39,"./inject":41,"./link":42,"./linkAll":43,"./linkInverse":44,"./unlinkInverse":45}],41:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function _getReactFunction(DS, definition, resource) {
  var name = definition.name;
  return function _react(added, removed, changed, oldValueFn, firstTime) {
    var target = this;
    var item;
    var innerId = (oldValueFn && oldValueFn(definition.idAttribute)) ? oldValueFn(definition.idAttribute) : target[definition.idAttribute];

    DSUtils.forEach(definition.relationFields, function (field) {
      delete added[field];
      delete removed[field];
      delete changed[field];
    });

    if (!DSUtils.isEmpty(added) || !DSUtils.isEmpty(removed) || !DSUtils.isEmpty(changed) || firstTime) {
      item = DS.get(name, innerId);
      resource.modified[innerId] = DSUtils.updateTimestamp(resource.modified[innerId]);
      resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);
      if (definition.keepChangeHistory) {
        var changeRecord = {
          resourceName: name,
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
      item = item || DS.get(name, innerId);
      DSUtils.forOwn(definition.computed, function (fn, field) {
        var compute = false;
        // check if required fields changed
        DSUtils.forEach(fn.deps, function (dep) {
          if (dep in added || dep in removed || dep in changed || !(field in item)) {
            compute = true;
          }
        });
        compute = compute || !fn.deps.length;
        if (compute) {
          DSUtils.compute.call(item, fn, field);
        }
      });
    }

    if (definition.relations) {
      item = item || DS.get(name, innerId);
      DSUtils.forEach(definition.relationList, function (def) {
        if (item[def.localField] && (def.localKey in added || def.localKey in removed || def.localKey in changed)) {
          DS.link(name, item[definition.idAttribute], [def.relation]);
        }
      });
    }

    if (definition.idAttribute in changed) {
      console.error('Doh! You just changed the primary key of an object! Your data for the' + name +
      '" resource is now in an undefined (probably broken) state.');
    }
  };
}

function _inject(definition, resource, attrs, options) {
  var _this = this;
  var _react = _getReactFunction(_this, definition, resource, attrs, options);

  var injected;
  if (DSUtils.isArray(attrs)) {
    injected = [];
    for (var i = 0; i < attrs.length; i++) {
      injected.push(_inject.call(_this, definition, resource, attrs[i], options));
    }
  } else {
    // check if "idAttribute" is a computed property
    var c = definition.computed;
    var idA = definition.idAttribute;
    if (c && c[idA]) {
      var args = [];
      DSUtils.forEach(c[idA].deps, function (dep) {
        args.push(attrs[dep]);
      });
      attrs[idA] = c[idA][c[idA].length - 1].apply(attrs, args);
    }
    if (!(idA in attrs)) {
      var error = new DSErrors.R(definition.name + '.inject: "attrs" must contain the property specified by `idAttribute`!');
      console.error(error);
      throw error;
    } else {
      try {
        DSUtils.forEach(definition.relationList, function (def) {
          var relationName = def.relation;
          var relationDef = _this.definitions[relationName];
          var toInject = attrs[def.localField];
          if (toInject) {
            if (!relationDef) {
              throw new DSErrors.R(definition.name + ' relation is defined but the resource is not!');
            }
            if (DSUtils.isArray(toInject)) {
              var items = [];
              DSUtils.forEach(toInject, function (toInjectItem) {
                if (toInjectItem !== _this.store[relationName][toInjectItem[relationDef.idAttribute]]) {
                  try {
                    var injectedItem = _this.inject(relationName, toInjectItem, options);
                    if (def.foreignKey) {
                      injectedItem[def.foreignKey] = attrs[definition.idAttribute];
                    }
                    items.push(injectedItem);
                  } catch (err) {
                    console.error(definition.name + ': Failed to inject ' + def.type + ' relation: "' + relationName + '"!', err);
                  }
                }
              });
              attrs[def.localField] = items;
            } else {
              if (toInject !== _this.store[relationName][toInject[relationDef.idAttribute]]) {
                try {
                  attrs[def.localField] = _this.inject(relationName, attrs[def.localField], options);
                  if (def.foreignKey) {
                    attrs[def.localField][def.foreignKey] = attrs[definition.idAttribute];
                  }
                } catch (err) {
                  console.error(definition.name + ': Failed to inject ' + def.type + ' relation: "' + relationName + '"!', err);
                }
              }
            }
          }
        });

        var id = attrs[idA];
        var item = _this.get(definition.name, id);
        var initialLastModified = item ? resource.modified[id] : 0;

        if (!item) {
          if (options.useClass) {
            if (attrs instanceof definition[definition['class']]) {
              item = attrs;
            } else {
              item = new definition[definition['class']]();
            }
          } else {
            item = {};
          }
          resource.previousAttributes[id] = DSUtils.copy(attrs);

          DSUtils.deepMixIn(item, attrs);

          resource.collection.push(item);
          resource.changeHistories[id] = [];

          if (DSUtils.w) {
            resource.observers[id] = new _this.observe.ObjectObserver(item);
            resource.observers[id].open(_react, item);
          }

          resource.index[id] = item;
          _react.call(item, {}, {}, {}, null, true);
        } else {
          DSUtils.deepMixIn(item, attrs);
          if (definition.resetHistoryOnInject) {
            resource.previousAttributes[id] = {};
            DSUtils.deepMixIn(resource.previousAttributes[id], attrs);
            if (resource.changeHistories[id].length) {
              DSUtils.forEach(resource.changeHistories[id], function (changeRecord) {
                DSUtils.remove(resource.changeHistory, changeRecord);
              });
              resource.changeHistories[id].splice(0, resource.changeHistories[id].length);
            }
          }
          if (DSUtils.w) {
            resource.observers[id].deliver();
          }
        }
        resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
        resource.modified[id] = initialLastModified && resource.modified[id] === initialLastModified ? DSUtils.updateTimestamp(resource.modified[id]) : resource.modified[id];
        resource.expiresHeap.remove(item);
        resource.expiresHeap.push({
          item: item,
          timestamp: resource.saved[id],
          expires: definition.maxAge ? resource.saved[id] + definition.maxAge : Number.MAX_VALUE
        });
        injected = item;
      } catch (err) {
        console.error(err.stack);
        console.error('inject failed!', definition.name, attrs);
      }
    }
  }
  return injected;
}

function _link(definition, injected, options) {
  var _this = this;

  DSUtils.forEach(definition.relationList, function (def) {
    if (options.findBelongsTo && def.type === 'belongsTo' && injected[definition.idAttribute]) {
      _this.link(definition.name, injected[definition.idAttribute], [def.relation]);
    } else if ((options.findHasMany && def.type === 'hasMany') || (options.findHasOne && def.type === 'hasOne')) {
      _this.link(definition.name, injected[definition.idAttribute], [def.relation]);
    }
  });
}

function inject(resourceName, attrs, options) {
  var _this = this;
  var definition = _this.definitions[resourceName];
  var resource = _this.store[resourceName];
  var injected;

  if (!definition) {
    throw new DSErrors.NER(resourceName);
  } else if (!DSUtils.isObject(attrs) && !DSUtils.isArray(attrs)) {
    throw new DSErrors.IA(resourceName + '.inject: "attrs" must be an object or an array!');
  }

  var name = definition.name;
  options = DSUtils._(definition, options);

  if (options.notify) {
    options.beforeInject(options, attrs);
    _this.emit(options, 'beforeInject', DSUtils.copy(attrs));
  }

  injected = _inject.call(_this, definition, resource, attrs, options);
  resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);

  if (options.findInverseLinks) {
    if (DSUtils.isArray(injected)) {
      if (injected.length) {
        _this.linkInverse(name, injected[0][definition.idAttribute]);
      }
    } else {
      _this.linkInverse(name, injected[definition.idAttribute]);
    }
  }

  if (DSUtils.isArray(injected)) {
    DSUtils.forEach(injected, function (injectedI) {
      _link.call(_this, definition, injectedI, options);
    });
  } else {
    _link.call(_this, definition, injected, options);
  }

  if (options.notify) {
    options.afterInject(options, injected);
    _this.emit(options, 'afterInject', DSUtils.copy(injected));
  }

  return injected;
}

module.exports = inject;

},{"../../errors":46,"../../utils":48}],42:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function link(resourceName, id, relations) {
  var _this = this;
  var definition = _this.definitions[resourceName];

  relations = relations || [];

  id = DSUtils.resolveId(definition, id);
  if (!definition) {
    throw new DSErrors.NER(resourceName);
  } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new DSErrors.IA('"id" must be a string or a number!');
  } else if (!DSUtils.isArray(relations)) {
    throw new DSErrors.IA('"relations" must be an array!');
  }
  var linked = _this.get(resourceName, id);

  if (linked) {
    DSUtils.forEach(definition.relationList, function (def) {
      var relationName = def.relation;
      if (relations.length && !DSUtils.contains(relations, relationName)) {
        return;
      }
      var params = {};
      if (def.type === 'belongsTo') {
        var parent = linked[def.localKey] ? _this.get(relationName, linked[def.localKey]) : null;
        if (parent) {
          linked[def.localField] = parent;
        }
      } else if (def.type === 'hasMany') {
        params[def.foreignKey] = linked[definition.idAttribute];
        linked[def.localField] = _this.defaults.constructor.prototype.defaultFilter.call(_this, _this.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
      } else if (def.type === 'hasOne') {
        params[def.foreignKey] = linked[definition.idAttribute];
        var children = _this.defaults.constructor.prototype.defaultFilter.call(_this, _this.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
        if (children.length) {
          linked[def.localField] = children[0];
        }
      }
    });
  }

  return linked;
}

module.exports = link;

},{"../../errors":46,"../../utils":48}],43:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function linkAll(resourceName, params, relations) {
  var _this = this;
  var definition = _this.definitions[resourceName];

  relations = relations || [];

  if (!definition) {
    throw new DSErrors.NER(resourceName);
  } else if (!DSUtils.isArray(relations)) {
    throw new DSErrors.IA('"relations" must be an array!');
  }
  var linked = _this.filter(resourceName, params);

  if (linked) {
    DSUtils.forEach(definition.relationList, function (def) {
      var relationName = def.relation;
      if (relations.length && !DSUtils.contains(relations, relationName)) {
        return;
      }
      if (def.type === 'belongsTo') {
        DSUtils.forEach(linked, function (injectedItem) {
          var parent = injectedItem[def.localKey] ? _this.get(relationName, injectedItem[def.localKey]) : null;
          if (parent) {
            injectedItem[def.localField] = parent;
          }
        });
      } else if (def.type === 'hasMany') {
        DSUtils.forEach(linked, function (injectedItem) {
          var params = {};
          params[def.foreignKey] = injectedItem[definition.idAttribute];
          injectedItem[def.localField] = _this.defaults.constructor.prototype.defaultFilter.call(_this, _this.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
        });
      } else if (def.type === 'hasOne') {
        DSUtils.forEach(linked, function (injectedItem) {
          var params = {};
          params[def.foreignKey] = injectedItem[definition.idAttribute];
          var children = _this.defaults.constructor.prototype.defaultFilter.call(_this, _this.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
          if (children.length) {
            injectedItem[def.localField] = children[0];
          }
        });
      }
    });
  }

  return linked;
}

module.exports = linkAll;

},{"../../errors":46,"../../utils":48}],44:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function linkInverse(resourceName, id, relations) {
  var _this = this;
  var definition = _this.definitions[resourceName];

  relations = relations || [];

  id = DSUtils.resolveId(definition, id);
  if (!definition) {
    throw new DSErrors.NER(resourceName);
  } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new DSErrors.IA('"id" must be a string or a number!');
  } else if (!DSUtils.isArray(relations)) {
    throw new DSErrors.IA('"relations" must be an array!');
  }
  var linked = _this.get(resourceName, id);

  if (linked) {
    DSUtils.forOwn(_this.definitions, function (d) {
      DSUtils.forOwn(d.relations, function (relatedModels) {
        DSUtils.forOwn(relatedModels, function (defs, relationName) {
          if (relations.length && !DSUtils.contains(relations, d.name)) {
            return;
          }
          if (definition.name === relationName) {
            _this.linkAll(d.name, {}, [definition.name]);
          }
        });
      });
    });
  }

  return linked;
}

module.exports = linkInverse;

},{"../../errors":46,"../../utils":48}],45:[function(require,module,exports){
var DSUtils = require('../../utils');
var DSErrors = require('../../errors');

function unlinkInverse(resourceName, id, relations) {
  var _this = this;
  var definition = _this.definitions[resourceName];

  relations = relations || [];

  id = DSUtils.resolveId(definition, id);
  if (!definition) {
    throw new DSErrors.NER(resourceName);
  } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
    throw new DSErrors.IA('"id" must be a string or a number!');
  } else if (!DSUtils.isArray(relations)) {
    throw new DSErrors.IA('"relations" must be an array!');
  }
  var linked = _this.get(resourceName, id);

  if (linked) {
    DSUtils.forOwn(_this.definitions, function (d) {
      DSUtils.forOwn(d.relations, function (relatedModels) {
        DSUtils.forOwn(relatedModels, function (defs, relationName) {
          if (definition.name === relationName) {
            DSUtils.forEach(defs, function (def) {
              DSUtils.forEach(_this.store[def.name].collection, function (item) {
                if (def.type === 'hasMany' && item[def.localField]) {
                  var index;
                  DSUtils.forEach(item[def.localField], function (subItem, i) {
                    if (subItem === linked) {
                      index = i;
                    }
                  });
                  item[def.localField].splice(index, 1);
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

  return linked;
}

module.exports = unlinkInverse;

},{"../../errors":46,"../../utils":48}],46:[function(require,module,exports){
function IllegalArgumentError(message) {
  Error.call(this);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }
  this.type = this.constructor.name;
  this.message = message || 'Illegal Argument!';
}

IllegalArgumentError.prototype = new Error();
IllegalArgumentError.prototype.constructor = IllegalArgumentError;

function RuntimeError(message) {
  Error.call(this);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }
  this.type = this.constructor.name;
  this.message = message || 'RuntimeError Error!';
}

RuntimeError.prototype = new Error();
RuntimeError.prototype.constructor = RuntimeError;

function NonexistentResourceError(resourceName) {
  Error.call(this);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }
  this.type = this.constructor.name;
  this.message = (resourceName || '') + ' is not a registered resource!';
}

NonexistentResourceError.prototype = new Error();
NonexistentResourceError.prototype.constructor = NonexistentResourceError;

module.exports = {
  IllegalArgumentError: IllegalArgumentError,
  IA: IllegalArgumentError,
  RuntimeError: RuntimeError,
  R: RuntimeError,
  NonexistentResourceError: NonexistentResourceError,
  NER: NonexistentResourceError
};

},{}],47:[function(require,module,exports){
var DS = require('./datastore');

module.exports = {
  DS: DS,
  createStore: function (options) {
    return new DS(options);
  },
  DSUtils: require('./utils'),
  DSErrors: require('./errors')
};

},{"./datastore":35,"./errors":46,"./utils":48}],48:[function(require,module,exports){
/* jshint -W041 */
var w, _Promise;
var objectProto = Object.prototype;
var toString = objectProto.toString;
var DSErrors = require('./errors');
var forEach = require('mout/array/forEach');
var slice = require('mout/array/slice');
var forOwn = require('mout/object/forOwn');
var observe = require('../lib/observe-js/observe-js');
var es6Promise = require('es6-promise');
es6Promise.polyfill();

var isArray = Array.isArray || function isArray(value) {
    return toString.call(value) == '[object Array]' || false;
  };

function isRegExp(value) {
  return toString.call(value) == '[object RegExp]' || false;
}

// adapted from lodash.isBoolean
function isBoolean(value) {
  return (value === true || value === false || value && typeof value == 'object' && toString.call(value) == '[object Boolean]') || false;
}

// adapted from lodash.isString
function isString(value) {
  return typeof value == 'string' || (value && typeof value == 'object' && toString.call(value) == '[object String]') || false;
}

function isObject(value) {
  return toString.call(value) == '[object Object]' || false;
}

// adapted from lodash.isDate
function isDate(value) {
  return (value && typeof value == 'object' && toString.call(value) == '[object Date]') || false;
}

// adapted from lodash.isNumber
function isNumber(value) {
  var type = typeof value;
  return type == 'number' || (value && type == 'object' && toString.call(value) == '[object Number]') || false;
}

// adapted from lodash.isFunction
function isFunction(value) {
  return typeof value == 'function' || (value && toString.call(value) === '[object Function]') || false;
}

// adapted from mout.isEmpty
function isEmpty(val) {
  if (val == null) {
    // typeof null == 'object' so we check it first
    return true;
  } else if (typeof val === 'string' || isArray(val)) {
    return !val.length;
  } else if (typeof val === 'object') {
    var result = true;
    forOwn(val, function () {
      result = false;
      return false; // break loop
    });
    return result;
  } else {
    return true;
  }
}

function intersection(array1, array2) {
  if (!array1 || !array2) {
    return [];
  }
  var result = [];
  var item;
  for (var i = 0, length = array1.length; i < length; i++) {
    item = array1[i];
    if (DSUtils.contains(result, item)) {
      continue;
    }
    if (DSUtils.contains(array2, item)) {
      result.push(item);
    }
  }
  return result;
}

function filter(array, cb, thisObj) {
  var results = [];
  forEach(array, function (value, key, arr) {
    if (cb(value, key, arr)) {
      results.push(value);
    }
  }, thisObj);
  return results;
}

function finallyPolyfill(cb) {
  var constructor = this.constructor;

  return this.then(function (value) {
    return constructor.resolve(cb()).then(function () {
      return value;
    });
  }, function (reason) {
    return constructor.resolve(cb()).then(function () {
      throw reason;
    });
  });
}

try {
  w = window;
  if (!w.Promise.prototype['finally']) {
    w.Promise.prototype['finally'] = finallyPolyfill;
  }
  _Promise = w.Promise;
  w = {};
} catch (e) {
  w = null;
  _Promise = require('bluebird');
}

function updateTimestamp(timestamp) {
  var newTimestamp = typeof Date.now === 'function' ? Date.now() : new Date().getTime();
  if (timestamp && newTimestamp <= timestamp) {
    return timestamp + 1;
  } else {
    return newTimestamp;
  }
}

function Events(target) {
  var events = {};
  target = target || this;
  target.on = function (type, func, ctx) {
    events[type] = events[type] || [];
    events[type].push({
      f: func,
      c: ctx
    });
  };
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

/**
 * @method bubbleUp
 * @param {array} heap The heap.
 * @param {function} weightFunc The weight function.
 * @param {number} n The index of the element to bubble up.
 */
function bubbleUp(heap, weightFunc, n) {
  var element = heap[n];
  var weight = weightFunc(element);
  // When at 0, an element can not go up any further.
  while (n > 0) {
    // Compute the parent element's index, and fetch it.
    var parentN = Math.floor((n + 1) / 2) - 1;
    var parent = heap[parentN];
    // If the parent has a lesser weight, things are in order and we
    // are done.
    if (weight >= weightFunc(parent)) {
      break;
    } else {
      heap[parentN] = element;
      heap[n] = parent;
      n = parentN;
    }
  }
}

/**
 * @method bubbleDown
 * @param {array} heap The heap.
 * @param {function} weightFunc The weight function.
 * @param {number} n The index of the element to sink down.
 */
function bubbleDown(heap, weightFunc, n) {
  var length = heap.length;
  var node = heap[n];
  var nodeWeight = weightFunc(node);

  while (true) {
    var child2N = (n + 1) * 2,
      child1N = child2N - 1;
    var swap = null;
    if (child1N < length) {
      var child1 = heap[child1N],
        child1Weight = weightFunc(child1);
      // If the score is less than our node's, we need to swap.
      if (child1Weight < nodeWeight) {
        swap = child1N;
      }
    }
    // Do the same checks for the other child.
    if (child2N < length) {
      var child2 = heap[child2N],
        child2Weight = weightFunc(child2);
      if (child2Weight < (swap === null ? nodeWeight : weightFunc(heap[child1N]))) {
        swap = child2N;
      }
    }

    if (swap === null) {
      break;
    } else {
      heap[n] = heap[swap];
      heap[swap] = node;
      n = swap;
    }
  }
}

function DSBinaryHeap(weightFunc, compareFunc) {
  if (weightFunc && !isFunction(weightFunc)) {
    throw new Error('DSBinaryHeap(weightFunc): weightFunc: must be a function!');
  }
  weightFunc = weightFunc || function (x) {
    return x;
  };
  compareFunc = compareFunc || function (x, y) {
    return x === y;
  };
  this.weightFunc = weightFunc;
  this.compareFunc = compareFunc;
  this.heap = [];
}

var dsp = DSBinaryHeap.prototype;

dsp.push = function (node) {
  this.heap.push(node);
  bubbleUp(this.heap, this.weightFunc, this.heap.length - 1);
};

dsp.peek = function () {
  return this.heap[0];
};

dsp.pop = function () {
  var front = this.heap[0],
    end = this.heap.pop();
  if (this.heap.length > 0) {
    this.heap[0] = end;
    bubbleDown(this.heap, this.weightFunc, 0);
  }
  return front;
};

dsp.remove = function (node) {
  var length = this.heap.length;
  for (var i = 0; i < length; i++) {
    if (this.compareFunc(this.heap[i], node)) {
      var removed = this.heap[i];
      var end = this.heap.pop();
      if (i !== length - 1) {
        this.heap[i] = end;
        bubbleUp(this.heap, this.weightFunc, i);
        bubbleDown(this.heap, this.weightFunc, i);
      }
      return removed;
    }
  }
  return null;
};

dsp.removeAll = function () {
  this.heap = [];
};

dsp.size = function () {
  return this.heap.length;
};

var toPromisify = [
  'beforeValidate',
  'validate',
  'afterValidate',
  'beforeCreate',
  'afterCreate',
  'beforeUpdate',
  'afterUpdate',
  'beforeDestroy',
  'afterDestroy'
];

// adapted from angular.copy
function copy(source, destination, stackSource, stackDest) {
  if (!destination) {
    destination = source;
    if (source) {
      if (isArray(source)) {
        destination = copy(source, [], stackSource, stackDest);
      } else if (isDate(source)) {
        destination = new Date(source.getTime());
      } else if (isRegExp(source)) {
        destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
        destination.lastIndex = source.lastIndex;
      } else if (isObject(source)) {
        var emptyObject = Object.create(Object.getPrototypeOf(source));
        destination = copy(source, emptyObject, stackSource, stackDest);
      }
    }
  } else {
    if (source === destination) {
      throw new Error('Cannot copy! Source and destination are identical.');
    }

    stackSource = stackSource || [];
    stackDest = stackDest || [];

    if (isObject(source)) {
      var index = stackSource.indexOf(source);
      if (index !== -1) return stackDest[index];

      stackSource.push(source);
      stackDest.push(destination);
    }

    var result;
    if (isArray(source)) {
      destination.length = 0;
      for (var i = 0; i < source.length; i++) {
        result = copy(source[i], null, stackSource, stackDest);
        if (isObject(source[i])) {
          stackSource.push(source[i]);
          stackDest.push(result);
        }
        destination.push(result);
      }
    } else {
      if (isArray(destination)) {
        destination.length = 0;
      } else {
        forEach(destination, function (value, key) {
          delete destination[key];
        });
      }
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          result = copy(source[key], null, stackSource, stackDest);
          if (isObject(source[key])) {
            stackSource.push(source[key]);
            stackDest.push(result);
          }
          destination[key] = result;
        }
      }
    }

  }
  return destination;
}

// adapted from angular.equals
function equals(o1, o2) {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
  var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
  if (t1 == t2) {
    if (t1 == 'object') {
      if (isArray(o1)) {
        if (!isArray(o2)) return false;
        if ((length = o1.length) == o2.length) {
          for (key = 0; key < length; key++) {
            if (!equals(o1[key], o2[key])) return false;
          }
          return true;
        }
      } else if (isDate(o1)) {
        if (!isDate(o2)) return false;
        return equals(o1.getTime(), o2.getTime());
      } else if (isRegExp(o1) && isRegExp(o2)) {
        return o1.toString() == o2.toString();
      } else {
        if (isArray(o2)) return false;
        keySet = {};
        for (key in o1) {
          if (key.charAt(0) === '$' || isFunction(o1[key])) continue;
          if (!equals(o1[key], o2[key])) return false;
          keySet[key] = true;
        }
        for (key in o2) {
          if (!keySet.hasOwnProperty(key) &&
            key.charAt(0) !== '$' &&
            o2[key] !== undefined && !isFunction(o2[key])) return false;
        }
        return true;
      }
    }
  }
  return false;
}

function resolveId(definition, idOrInstance) {
  if (this.isString(idOrInstance) || isNumber(idOrInstance)) {
    return idOrInstance;
  } else if (idOrInstance && definition) {
    return idOrInstance[definition.idAttribute] || idOrInstance;
  } else {
    return idOrInstance;
  }
}

function resolveItem(resource, idOrInstance) {
  if (resource && (isString(idOrInstance) || isNumber(idOrInstance))) {
    return resource.index[idOrInstance] || idOrInstance;
  } else {
    return idOrInstance;
  }
}

function isValidString(val) {
  return (val != null && val !== '');
}

function join(items, separator) {
  separator = separator || '';
  return filter(items, isValidString).join(separator);
}

function makePath(var_args) {
  var result = join(slice(arguments), '/');
  return result.replace(/([^:\/]|^)\/{2,}/g, '$1/');
}

observe.setEqualityFn(equals);

var DSUtils = {
  // Options that inherit from defaults
  _: function (parent, options) {
    var _this = this;
    options = options || {};
    if (options && options.constructor === parent.constructor) {
      return options;
    } else if (!isObject(options)) {
      throw new DSErrors.IA('"options" must be an object!');
    }
    forEach(toPromisify, function (name) {
      if (typeof options[name] === 'function' && options[name].toString().indexOf('var args = Array') === -1) {
        options[name] = _this.promisify(options[name]);
      }
    });
    var O = function Options(attrs) {
      var self = this;
      forOwn(attrs, function (value, key) {
        self[key] = value;
      });
    };
    O.prototype = parent;
    return new O(options);
  },
  compute: function (fn, field) {
    var _this = this;
    var args = [];
    forEach(fn.deps, function (dep) {
      args.push(_this[dep]);
    });
    // compute property
    _this[field] = fn[fn.length - 1].apply(_this, args);
  },
  contains: require('mout/array/contains'),
  copy: copy,
  deepMixIn: require('mout/object/deepMixIn'),
  diffObjectFromOldObject: observe.diffObjectFromOldObject,
  DSBinaryHeap: DSBinaryHeap,
  equals: equals,
  Events: Events,
  filter: filter,
  forEach: forEach,
  forOwn: forOwn,
  fromJson: function (json) {
    return isString(json) ? JSON.parse(json) : json;
  },
  intersection: intersection,
  isArray: isArray,
  isBoolean: isBoolean,
  isDate: isDate,
  isEmpty: isEmpty,
  isFunction: isFunction,
  isObject: isObject,
  isNumber: isNumber,
  isRegExp: isRegExp,
  isString: isString,
  makePath: makePath,
  observe: observe,
  pascalCase: require('mout/string/pascalCase'),
  pick: require('mout/object/pick'),
  Promise: _Promise,
  promisify: function (fn, target) {
    var Promise = this.Promise;
    if (!fn) {
      return;
    } else if (typeof fn !== 'function') {
      throw new Error('Can only promisify functions!');
    }
    return function () {
      var args = Array.prototype.slice.apply(arguments);
      return new Promise(function (resolve, reject) {

        args.push(function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });

        try {
          var promise = fn.apply(target || this, args);
          if (promise && promise.then) {
            promise.then(resolve, reject);
          }
        } catch (err) {
          reject(err);
        }
      });
    };
  },
  remove: require('mout/array/remove'),
  set: require('mout/object/set'),
  slice: slice,
  sort: require('mout/array/sort'),
  toJson: JSON.stringify,
  updateTimestamp: updateTimestamp,
  upperCase: require('mout/string/upperCase'),
  resolveItem: resolveItem,
  resolveId: resolveId,
  w: w
};

module.exports = DSUtils;

},{"../lib/observe-js/observe-js":1,"./errors":46,"bluebird":"bluebird","es6-promise":2,"mout/array/contains":4,"mout/array/forEach":5,"mout/array/remove":7,"mout/array/slice":8,"mout/array/sort":9,"mout/object/deepMixIn":12,"mout/object/forOwn":14,"mout/object/pick":17,"mout/object/set":18,"mout/string/pascalCase":21,"mout/string/upperCase":24}]},{},[47])(47)
});