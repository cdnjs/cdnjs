/* Inspire Tree
 * @version 4.0.0
 * https://github.com/helion3/inspire-tree
 * @copyright Copyright 2015 Helion3, and other contributors
 * @license Licensed under MIT
 *          see https://github.com/helion3/inspire-tree/blob/master/LICENSE
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash')) :
	typeof define === 'function' && define.amd ? define(['lodash'], factory) :
	(global.InspireTree = factory(global._));
}(this, (function (_) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = commonjsGlobal.crypto || commonjsGlobal.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

var rngBrowser = rng;

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

var bytesToUuid_1 = bytesToUuid;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rngBrowser)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1 = v4;

/**
 * Reset a node's state to the tree default.
 *
 * @private
 * @param {TreeNode} node Node object.
 * @returns {TreeNode} Node object.
 */
function resetState(node) {
    _.each(node._tree.defaultState, function (val, prop) {
        node.state(prop, val);
    });

    return node;
}

/**
 * Stores repetitive state change logic for most state methods.
 *
 * @private
 * @param {string} prop State property name.
 * @param {boolean} value New state value.
 * @param {string} verb Verb used for events.
 * @param {TreeNode} node Node object.
 * @param {string} deep Optional name of state method to call recursively.
 * @return {TreeNode} Node object.
 */
function baseStateChange(prop, value, verb, node, deep) {
    if (node.state(prop) !== value) {
        node._tree.batch();

        if (node._tree.config.nodes.resetStateOnRestore && verb === 'restored') {
            resetState(node);
        }

        node.state(prop, value);

        node._tree.emit('node.' + verb, node, false);

        if (deep && node.hasChildren()) {
            node.children.recurseDown(function (child) {
                baseStateChange(prop, value, verb, child);
            });
        }

        node.markDirty();
        node._tree.end();
    }

    return node;
}

var es6Promise = createCommonjsModule(function (module, exports) {
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	module.exports = factory();
}(commonjsGlobal, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction$$1(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray$$1 = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = commonjsRequire;
    var vertx = r('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop$$1);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop$$1);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop$$1() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction$$1(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction$$1(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop$$1);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray$$1(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop$$1);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray$$1(entries)) {
    return new Constructor(function (_$$1, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop$$1);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
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
  let promise = new Promise(function(resolve, reject) {
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
      let xhr = new XMLHttpRequest();

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
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop$$1 !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

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
    let result;
  
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
    let author, books;
  
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
    Useful for tooling.
    @return {Promise}
  */
  then: then,

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
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof commonjsGlobal !== 'undefined') {
        local = commonjsGlobal;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));


});

var es6Promise_1 = es6Promise.Promise;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

















var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

// Libs

function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
        cls.apply(this, arguments);
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

/**
 * Base function to filter nodes by state value.
 *
 * @private
 * @param {string} state State property
 * @param {boolean} full Return a non-flat hierarchy
 * @return {TreeNodes} Array of matching nodes.
 */
function baseStatePredicate(state, full) {
    if (full) {
        return this.extract(state);
    }

    // Cache a state predicate function
    var fn = getPredicateFunction(state);

    return this.flatten(function (node) {
        // Never include removed nodes unless specifically requested
        if (state !== 'removed' && node.removed()) {
            return false;
        }

        return fn(node);
    });
}

/**
 * Base function to invoke given method(s) on tree nodes.
 *
 * @private
 * @param {TreeNode} nodes Array of node objects.
 * @param {string|array} methods Method names.
 * @param {array|Arguments} args Array of arguments to proxy.
 * @param {boolean} deep Invoke deeply.
 * @return {TreeNodes} Array of node objects.
 */
function baseInvoke(nodes, methods, args, deep) {
    methods = _.castArray(methods);

    nodes._tree.batch();

    nodes[deep ? 'recurseDown' : 'each'](function (node) {
        _.each(methods, function (method) {
            if (_.isFunction(node[method])) {
                node[method].apply(node, args);
            }
        });
    });

    nodes._tree.end();

    return nodes;
}

/**
 * Creates a predicate function.
 *
 * @private
 * @param {string|function} predicate Property name or custom function.
 * @return {function} Predicate function.
 */
function getPredicateFunction(predicate) {
    var fn = predicate;
    if (_.isString(predicate)) {
        fn = function fn(node) {
            return _.isFunction(node[predicate]) ? node[predicate]() : node[predicate];
        };
    }

    return fn;
}

/**
 * An Array-like collection of TreeNodes.
 *
 * Note: Due to issue in many javascript environments,
 * native objects are problematic to extend correctly
 * so we mimic it, not actually extend it.
 *
 * @category TreeNodes
 * @param {array} array Array of TreeNode objects.
 * @return {TreeNodes} Collection of TreeNode
 */
var TreeNodes = function (_extendableBuiltin2) {
    inherits(TreeNodes, _extendableBuiltin2);

    function TreeNodes(tree, array) {
        classCallCheck(this, TreeNodes);

        var _this = possibleConstructorReturn(this, (TreeNodes.__proto__ || Object.getPrototypeOf(TreeNodes)).call(this));

        if (_.isFunction(_.get(tree, 'isTree')) && !tree.isTree(tree)) {
            throw new TypeError('Invalid tree instance.');
        }

        _this._tree = tree;
        _this.length = 0;

        // Init pagination
        _this._pagination = {
            limit: tree.config.pagination.limit,
            total: 0
        };

        if (_.isArray(array) || array instanceof TreeNodes) {
            _.each(array, function (node) {
                if (node instanceof TreeNode) {
                    _this.push(node.clone());
                } else {
                    _this.addNode(node);
                }
            });
        }
        return _this;
    }

    /**
     * Adds a new node to this collection. If a sort
     * method is configured, the node will be added
     * in the appropriate order.
     *
     * @category TreeNodes
     * @param {object} object Node
     * @return {TreeNode} Node object.
     */


    createClass(TreeNodes, [{
        key: 'addNode',
        value: function addNode(object) {
            // Base insertion index
            var index = this.length;

            // If tree is sorted, insert in correct position
            if (this._tree.config.sort) {
                index = _.sortedIndexBy(this, object, this._tree.config.sort);
            }

            return this.insertAt(index, object);
        }

        /**
         * Query for all available nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'available',
        value: function available(full) {
            return baseStatePredicate.call(this, 'available', full);
        }

        /**
         * Blur children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'blur',
        value: function blur() {
            return this.invoke('blur');
        }

        /**
         * Blur all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'blurDeep',
        value: function blurDeep() {
            return this.invokeDeep('blur');
        }

        /**
         * Query for all checked nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'checked',
        value: function checked(full) {
            return baseStatePredicate.call(this, 'checked', full);
        }

        /**
         * Clean children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'clean',
        value: function clean() {
            return this.invoke('clean');
        }

        /**
         * Clones (deep) the array of nodes.
         *
         * Note: Cloning will *not* clone the context pointer.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of cloned nodes.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return new TreeNodes(this._tree, this);
        }

        /**
         * Collapse children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapse',
        value: function collapse() {
            return this.invoke('collapse');
        }

        /**
         * Query for all collapsed nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapsed',
        value: function collapsed(full) {
            return baseStatePredicate.call(this, 'collapsed', full);
        }

        /**
         * Collapse all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapseDeep',
        value: function collapseDeep() {
            return this.invokeDeep('collapse');
        }

        /**
         * Concat nodes like an Array would.
         *
         * @category TreeNodes
         * @param {TreeNodes} nodes Array of nodes.
         * @return {TreeNodes} Resulting node array.
         */

    }, {
        key: 'concat',
        value: function concat(nodes) {
            var newNodes = new TreeNodes(this._tree);
            newNodes._context = this._context;

            var pusher = function pusher(node) {
                if (node instanceof TreeNode) {
                    newNodes.push(node);
                }
            };

            _.each(this, pusher);
            _.each(nodes, pusher);

            // Copy pagination limit
            newNodes._pagination.limit = this._pagination.limit;

            return newNodes;
        }

        /**
         * Get the context of this collection. If a collection
         * of children, context is the parent node. Otherwise
         * the context is the tree itself.
         *
         * @category TreeNodes
         * @return {TreeNode|object} Node object or tree instance.
         */

    }, {
        key: 'context',
        value: function context() {
            return this._context || this._tree;
        }

        /**
         * Copies nodes to a new tree instance.
         *
         * @category TreeNodes
         * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
         * @return {object} Methods to perform action on copied nodes.
         */

    }, {
        key: 'copy',
        value: function copy(hierarchy) {
            var _this2 = this;

            return {

                /**
                 * Sets a destination.
                 *
                 * @category CopyNode
                 * @param {object} dest Destination Inspire Tree.
                 * @return {array} Array of new nodes.
                 */
                to: function to(dest) {
                    if (!_.isFunction(dest.addNodes)) {
                        throw new Error('Destination must be an Inspire Tree instance.');
                    }

                    var newNodes = new TreeNodes(_this2._tree);

                    _.each(_this2, function (node) {
                        newNodes.push(node.copy(hierarchy).to(dest));
                    });

                    return newNodes;
                }
            };
        }

        /**
         * Returns deepest nodes from this array.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deepest',
        value: function deepest() {
            var matches = new TreeNodes(this._tree);

            this.recurseDown(function (node) {
                if (!node.children) {
                    matches.push(node);
                }
            });

            return matches;
        }

        /**
         * Deselect children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deselect',
        value: function deselect() {
            return this.invoke('deselect');
        }

        /**
         * Deselect all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deselectDeep',
        value: function deselectDeep() {
            return this.invokeDeep('deselect');
        }

        /**
         * Iterate every TreeNode in this collection.
         *
         * @category TreeNodes
         * @param {function} iteratee Iteratee invoke for each node.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'each',
        value: function each$$1(iteratee) {
            _.each(this, iteratee);

            return this;
        }

        /**
         * Query for all editable nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'editable',
        value: function editable(full) {
            return baseStatePredicate.call(this, 'editable', full);
        }

        /**
         * Query for all nodes in editing mode.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'editing',
        value: function editing(full) {
            return baseStatePredicate.call(this, 'editing', full);
        }

        /**
         * Expand children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expand',
        value: function expand() {
            return this.invoke('expand');
        }

        /**
         * Query for all expanded nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expanded',
        value: function expanded(full) {
            return baseStatePredicate.call(this, 'expanded', full);
        }

        /**
         * Recursively expands all nodes, loading all dynamic calls.
         *
         * @category TreeNodes
         * @return {Promise} Promise resolved only when all children have loaded and expanded.
         */

    }, {
        key: 'expandDeep',
        value: function expandDeep() {
            var _this3 = this;

            return new es6Promise_1(function (resolve) {
                var waitCount = 0;

                var done = function done() {
                    if (--waitCount === 0) {
                        resolve(_this3);
                    }
                };

                _this3.recurseDown(function (node) {
                    waitCount++;

                    // Ignore nodes without children
                    if (node.children) {
                        node.expand().catch(done).then(function () {
                            // Manually trigger expansion on newly loaded children
                            node.children.expandDeep().catch(done).then(done);
                        });
                    } else {
                        done();
                    }
                });
            });
        }

        /**
         * Expand parents of children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expandParents',
        value: function expandParents() {
            return this.invoke('expandParents');
        }

        /**
         * Returns a cloned hierarchy of all nodes matching a predicate.
         *
         * Because it filters deeply, we must clone all nodes so that we
         * don't affect the actual node array.
         *
         * @category TreeNodes
         * @param {string|function} predicate State flag or custom function.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'extract',
        value: function extract(predicate) {
            var flat = this.flatten(predicate);
            var matches = new TreeNodes(this._tree);

            _.each(flat, function (node) {
                matches.addNode(node.copyHierarchy());
            });

            return matches;
        }

        /**
         * Iterate every TreeNode in this collection.
         *
         * @category TreeNodes
         * @param {function} iteratee Iteratee invoke for each node.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'forEach',
        value: function forEach(iteratee) {
            return this.each(iteratee);
        }

        /**
         * Returns nodes which match a predicate.
         *
         * @category TreeNodes
         * @param {string|function} predicate State flag or custom function.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'filterBy',
        value: function filterBy(predicate) {
            var fn = getPredicateFunction(predicate);
            var matches = new TreeNodes(this._tree);

            _.each(this, function (node) {
                if (fn(node)) {
                    matches.push(node);
                }
            });

            return matches;
        }

        /**
         * Flattens a hierarchy, returning only node(s) matching the
         * expected state or predicate function.
         *
         * @category TreeNodes
         * @param {string|function} predicate State property or custom function.
         * @return {TreeNodes} Flat array of matching nodes.
         */

    }, {
        key: 'flatten',
        value: function flatten(predicate) {
            var flat = new TreeNodes(this._tree);

            var fn = getPredicateFunction(predicate);
            this.recurseDown(function (node) {
                if (fn(node)) {
                    flat.push(node);
                }
            });

            return flat;
        }

        /**
         * Query for all focused nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'focused',
        value: function focused(full) {
            return baseStatePredicate.call(this, 'focused', full);
        }

        /**
         * Get a specific node in the collection, or undefined if it doesn't exist.
         *
         * @category TreeNodes
         * @param {int} index Numeric index of requested node.
         * @return {TreeNode} Node object. Undefined if invalid index.
         */

    }, {
        key: 'get',
        value: function get$$1(index) {
            return this[index];
        }

        /**
         * Query for all hidden nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hidden',
        value: function hidden(full) {
            return baseStatePredicate.call(this, 'hidden', full);
        }

        /**
         * Hide children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hide',
        value: function hide() {
            return this.invoke('hide');
        }

        /**
         * Hide all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hideDeep',
        value: function hideDeep() {
            return this.invokeDeep('hide');
        }

        /**
         * Query for all indeterminate nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'indeterminate',
        value: function indeterminate(full) {
            return baseStatePredicate.call(this, 'indeterminate', full);
        }

        /**
         * Insert a new node at a given position.
         *
         * @category TreeNodes
         * @param {integer} index Index at which to insert the node.
         * @param {object} object Raw node object or TreeNode.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'insertAt',
        value: function insertAt(index, object) {
            // If node has a pre-existing ID
            if (object.id) {
                // Is it already in the tree?
                var existingNode = this.node(object.id);
                if (existingNode) {
                    existingNode.restore().show();

                    // Merge children
                    if (_.isArrayLike(object.children)) {
                        // Setup existing node's children property if needed
                        if (!_.isArrayLike(existingNode.children)) {
                            existingNode.children = new TreeNodes(this._tree);
                            existingNode.children._context = existingNode;
                        }

                        // Copy each child (using addNode, which uses insertAt)
                        _.each(object.children, function (child) {
                            existingNode.children.addNode(child);
                        });
                    }

                    // Merge truthy children
                    else if (object.children && _.isBoolean(existingNode.children)) {
                            existingNode.children = object.children;
                        }

                    existingNode.markDirty();
                    this._tree.applyChanges();

                    // Node merged, return it.
                    return existingNode;
                }
            }

            // Node is new, insert at given location.
            var node = this._tree.constructor.isTreeNode(object) ? object : objectToNode(this._tree, object);

            // Grab remaining nodes
            this.splice(index, 0, node);

            // Refresh parent state and mark dirty
            if (this._context) {
                node.itree.parent = this._context;
                this._context.refreshIndeterminateState().markDirty();
            }

            // Event
            this._tree.emit('node.added', node);

            // Always mark this node as dirty
            node.markDirty();

            // If pushing this node anywhere but the end, other nodes may change.
            if (this.length - 1 !== index) {
                this.invoke('markDirty');
            }

            this._tree.applyChanges();

            return node;
        }

        /**
         * Invoke method(s) on each node.
         *
         * @category TreeNodes
         * @param {string|array} methods Method name(s).
         * @param {array|Arguments} args Array of arguments to proxy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'invoke',
        value: function invoke$$1(methods, args) {
            return baseInvoke(this, methods, args);
        }

        /**
         * Invoke method(s) deeply.
         *
         * @category TreeNodes
         * @param {string|array} methods Method name(s).
         *  @param {array|Arguments} args Array of arguments to proxy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'invokeDeep',
        value: function invokeDeep(methods, args) {
            return baseInvoke(this, methods, args, true);
        }

        /**
         * Query for all loading nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'loading',
        value: function loading(full) {
            return baseStatePredicate.call(this, 'loading', full);
        }

        /**
         * Loads additional nodes for this context.
         *
         * @category TreeNodes
         * @param {Event} event Click or scroll event if DOM interaction triggered this call.
         * @return {Promise} Resolves with request results.
         */

    }, {
        key: 'loadMore',
        value: function loadMore(event) {
            var _this4 = this;

            // Never refire if node is loading
            if (this._loading) {
                return es6Promise_1.reject(new Error('Pending loadMore call must complete before being invoked again.'));
            }

            var promise = void 0;

            // If no records remain, immediately resolve
            if (this._pagination.limit === this._pagination.total) {
                return es6Promise_1.resolve();
            }

            // Set loading flag, prevents repeat requests
            this._loading = true;
            this._tree.batch();

            // Mark this context as dirty since we'll update text/tree nodes
            _.invoke(this._context, 'markDirty');

            // Increment the pagination
            this._pagination.limit += this._tree.config.pagination.limit;

            // Emit an event
            this._tree.emit('node.paginated', this._context || this._tree, this.pagination, event);

            if (this._tree.config.deferredLoading) {
                if (this._context) {
                    promise = this._context.loadChildren();
                } else {
                    promise = this._tree.load(this._tree.config.data);
                }
            } else {
                this._loading = false;

                promise = es6Promise_1.resolve();
            }

            this._tree.end();

            // Clear the loading flag
            if (this._tree.config.deferredLoading) {
                promise.then(function () {
                    _this4._loading = false;
                    _this4._tree.applyChanges();
                }).catch(function () {
                    _this4._loading = false;
                    _this4._tree.applyChanges();
                });
            }

            return promise;
        }

        /**
         * Query for all nodes which matched the last search.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'matched',
        value: function matched(full) {
            return baseStatePredicate.call(this, 'matched', full);
        }

        /**
         * Moves the node at a given index to a new index.
         *
         * @category TreeNodes
         * @param {int} index Current index.
         * @param {int} newIndex New index.
         * @param {TreeNodes} target Target TreeNodes array. Defaults to this.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'move',
        value: function move(index, newIndex) {
            var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

            this._tree.batch();

            var oldNode = this[index].remove();
            var node = target.insertAt(newIndex, oldNode);

            this._tree.emit('node.moved', node, this, index, target, newIndex);

            this._tree.end();

            return node;
        }

        /**
         * Get a node.
         *
         * @category TreeNodes
         * @param {string|number} id ID of node.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'node',
        value: function node(id) {
            var match = void 0;

            this.recurseDown(function (node) {
                if (node.id === id) {
                    match = node;

                    return false;
                }
            });

            return match;
        }

        /**
         * Get all nodes in a tree, or nodes for an array of IDs.
         *
         * @category TreeNodes
         * @param {array} refs Array of ID references.
         * @return {TreeNodes} Array of node objects.
         * @example
         *
         * let all = tree.nodes()
         * let some = tree.nodes([1, 2, 3])
         */

    }, {
        key: 'nodes',
        value: function nodes(refs) {
            var results = void 0;

            if (_.isArray(refs)) {
                results = new TreeNodes(this._tree);

                this.recurseDown(function (node) {
                    if (refs.indexOf(node.id) > -1) {
                        results.push(node);
                    }
                });
            }

            return _.isArray(refs) ? results : this;
        }

        /**
         * Get the pagination.
         *
         * @category TreeNodes
         * @return {object} Pagination configuration object.
         */

    }, {
        key: 'pagination',
        value: function pagination() {
            return this._pagination;
        }

        /**
         * Iterate down all nodes and any children.
         *
         * @category TreeNodes
         * @param {function} iteratee Iteratee function.
         * @return {TreeNodes} Resulting nodes.
         */

    }, {
        key: 'recurseDown',
        value: function recurseDown$$1(iteratee) {
            recurseDown(this, iteratee);

            return this;
        }

        /**
         * Removes a node from this list.
         *
         * @category TreeNodes
         * @param {TreeNode} node Node object.
         * @return {TreeNodes} Resulting nodes.
         */

    }, {
        key: 'remove',
        value: function remove$$1(node) {
            _.remove(this, { id: node.id });

            _.invoke(this._context, 'markDirty');

            this._tree.applyChanges();

            return this;
        }

        /**
         * Query for all soft-removed nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'removed',
        value: function removed(full) {
            return baseStatePredicate.call(this, 'removed', full);
        }

        /**
         * Restore children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'restore',
        value: function restore() {
            return this.invoke('restore');
        }

        /**
         * Restore all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'restoreDeep',
        value: function restoreDeep() {
            return this.invokeDeep('restore');
        }

        /**
         * Select children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'select',
        value: function select() {
            return this.invoke('select');
        }

        /**
         * Query for all selectable nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selectable',
        value: function selectable(full) {
            return baseStatePredicate.call(this, 'selectable', full);
        }

        /**
         * Select all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selectDeep',
        value: function selectDeep() {
            return this.invokeDeep('select');
        }

        /**
         * Query for all selected nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selected',
        value: function selected(full) {
            return baseStatePredicate.call(this, 'selected', full);
        }

        /**
         * Show children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'show',
        value: function show() {
            return this.invoke('show');
        }

        /**
         * Show all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'showDeep',
        value: function showDeep() {
            return this.invokeDeep('show');
        }

        /**
         * Soft-remove children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'softRemove',
        value: function softRemove() {
            return this.invoke('softRemove');
        }

        /**
         * Sorts all TreeNode objects in this collection.
         *
         * If no custom sorter given, the configured "sort" value will be used.
         *
         * @category TreeNodes
         * @param {string|function} sorter Sort function or property name.
         * @return {TreeNodes} Array of node obejcts.
         */

    }, {
        key: 'sortBy',
        value: function sortBy$$1(sorter) {
            var _this5 = this;

            sorter = sorter || this._tree.config.sort;

            // Only apply sort if one provided
            if (sorter) {
                var sorted = _.sortBy(this, sorter);

                this.length = 0;
                _.each(sorted, function (node) {
                    _this5.push(node);
                });
            }

            return this;
        }

        /**
         * Set state values for nodes in this collection.
         *
         * @category TreeNodes
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'state',
        value: function state() {
            return this.invoke('state', arguments);
        }

        /**
         * Set state values recursively.
         *
         * @category TreeNodes
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'stateDeep',
        value: function stateDeep() {
            return this.invokeDeep('state', arguments);
        }

        /**
         * Swaps two node positions.
         *
         * @category TreeNodes
         * @param {TreeNode} node1 Node 1.
         * @param {TreeNode} node2 Node 2.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'swap',
        value: function swap(node1, node2) {
            this._tree.batch();

            var n1Context = node1.context();
            var n2Context = node2.context();

            // Cache. Note: n2Index is only usable once
            var n1Index = n1Context.indexOf(node1);
            var n2Index = n2Context.indexOf(node2);

            // If contexts match, we can simply re-assign them
            if (n1Context === n2Context) {
                this[n1Index] = node2;
                this[n2Index] = node1;

                // Emit move events for each node
                this._tree.emit('node.moved', node1, n1Context, n1Index, n2Context, n2Index);
                this._tree.emit('node.moved', node2, n2Context, n2Index, n1Context, n1Index);
            } else {
                // Otherwise, we have to move between contexts
                // Move node 1 to node 2's index
                n1Context.move(n1Index, n2Context.indexOf(node2), n2Context);

                // Move node 2 to node 1s original index
                n2Context.move(n2Context.indexOf(node2), n1Index, n1Context);
            }

            this._tree.end();

            this._tree.emit('node.swapped', node1, n1Context, n1Index, node2, n2Context, n2Index);

            return this;
        }

        /**
         * Get the tree this collection ultimately belongs to.
         *
         * @category TreeNodes
         * @return {[type]} [description]
         */

    }, {
        key: 'tree',
        value: function tree() {
            return this._tree;
        }

        /**
         * Returns a native Array of nodes.
         *
         * @category TreeNodes
         * @return {array} Array of node objects.
         */

    }, {
        key: 'toArray',
        value: function toArray$$1() {
            var array = [];

            _.each(this, function (node) {
                array.push(node.toObject());
            });

            return array;
        }

        /**
         * Query for all visible nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'visible',
        value: function visible(full) {
            return baseStatePredicate.call(this, 'visible', full);
        }
    }]);
    return TreeNodes;
}(_extendableBuiltin(Array));

/**
 * Base recursion function for a collection or node.
 *
 * Returns false if execution should cease.
 *
 * @private
 * @param {TreeNode|TreeNodes} obj Node or collection.
 * @param {function} iteratee Iteratee function
 * @return {boolean} Cease iteration.
 */
function recurseDown(obj, iteratee) {
    var res = void 0;

    if (obj instanceof TreeNodes) {
        _.each(obj, function (node) {
            res = recurseDown(node, iteratee);

            return res;
        });
    } else if (obj instanceof TreeNode) {
        res = iteratee(obj);

        // Recurse children
        if (res !== false && obj.hasChildren()) {
            res = recurseDown(obj.children, iteratee);
        }
    }

    return res;
}

/**
 * Resolve promise-like objects consistently.
 *
 * @private
 * @param {object} promise Promise-like object.
 * @returns {Promise} Promise
 */
function standardizePromise(promise) {
    return new es6Promise_1(function (resolve, reject) {
        if (!_.isObject(promise)) {
            return reject(new Error('Invalid Promise'));
        }

        if (_.isFunction(promise.then)) {
            promise.then(resolve);
        }

        // jQuery promises use "error"
        if (_.isFunction(promise.error)) {
            promise.error(reject);
        } else if (_.isFunction(promise.catch)) {
            promise.catch(reject);
        }
    });
}

// Libs

/**
 * Helper method to clone an ITree config object.
 *
 * Rejects non-clonable properties like ref.
 *
 * @private
 * @param {object} itree ITree configuration object
 * @param {array} excludeKeys Keys to exclude, if any
 * @return {object} Cloned ITree.
 */
function cloneItree(itree, excludeKeys) {
    var clone = {};
    excludeKeys = _.castArray(excludeKeys);
    excludeKeys.push('ref');

    _.each(itree, function (v, k) {
        if (!_.includes(excludeKeys, k)) {
            clone[k] = _.cloneDeep(v);
        }
    });

    return clone;
}

/**
 * Represents a singe node object within the tree.
 *
 * @category TreeNode
 * @param {TreeNode} source TreeNode to copy.
 * @return {TreeNode} Tree node object.
 */
var TreeNode = function () {
    function TreeNode(tree, source, excludeKeys) {
        var _this = this;

        classCallCheck(this, TreeNode);

        this._tree = tree;

        if (source instanceof TreeNode) {
            excludeKeys = _.castArray(excludeKeys);
            excludeKeys.push('_tree');

            // Iterate manually for better perf
            _.each(source, function (value, key) {
                // Skip vars
                if (!_.includes(excludeKeys, key)) {
                    if (_.isObject(value)) {
                        if (value instanceof TreeNodes) {
                            _this[key] = value.clone();
                        } else if (key === 'itree') {
                            _this[key] = cloneItree(value);
                        } else {
                            _this[key] = _.cloneDeep(value);
                        }
                    } else {
                        // Copy primitives
                        _this[key] = value;
                    }
                }
            });
        }
    }

    /**
     * Add a child to this node.
     *
     * @category TreeNode
     * @param {object} child Node object.
     * @return {TreeNode} Node object.
     */


    createClass(TreeNode, [{
        key: 'addChild',
        value: function addChild(child) {
            if (_.isArray(this.children) || !_.isArrayLike(this.children)) {
                this.children = new TreeNodes(this._tree);
                this.children._context = this;
            }

            return this.children.addNode(child);
        }

        /**
         * Add multiple children to this node.
         *
         * @category TreeNode
         * @param {object} children Array of nodes.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'addChildren',
        value: function addChildren(children) {
            var _this2 = this;

            var nodes = new TreeNodes(this._tree);

            this._tree.batch();
            _.each(children, function (child) {
                nodes.push(_this2.addChild(child));
            });
            this._tree.end();

            return nodes;
        }

        /**
         * Ensure this node allows dynamic children.
         *
         * @private
         * @return {boolean} If tree/node allows dynamic children.
         */

    }, {
        key: 'allowDynamicLoad',
        value: function allowDynamicLoad() {
            return this._tree.isDynamic && (_.isArrayLike(this.children) || this.children === true);
        }

        /**
         * Get if node available.
         *
         * @category TreeNode
         * @return {boolean} If available.
         */

    }, {
        key: 'available',
        value: function available() {
            return !this.hidden() && !this.removed();
        }

        /**
         * Blur focus from this node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'blur',
        value: function blur() {
            this.state('editing', false);

            return baseStateChange('focused', false, 'blurred', this);
        }
    }, {
        key: 'check',


        /**
         * Marks this node as checked.
         *
         * @category TreeNode
         * @param {boolean} shallow Skip auto-checking children.
         * @return {TreeNode} Node object.
         */
        value: function check(shallow) {
            this._tree.batch();

            // Will we automatically apply state changes to our children
            var deep = !shallow && this._tree.config.checkbox.autoCheckChildren;

            baseStateChange('checked', true, 'checked', this, deep);

            // Reset indeterminate state
            this.state('indeterminate', false);

            // Refresh parent
            if (this.hasParent()) {
                this.getParent().refreshIndeterminateState();
            }

            this._tree.end();

            return this;
        }
    }, {
        key: 'checked',


        /**
         * Get whether this node is checked.
         *
         * @category TreeNode
         * @return {boolean} Get if node checked.
         */
        value: function checked() {
            return this.state('checked');
        }

        /**
         * Hides parents without any visible children.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'clean',
        value: function clean() {
            this.recurseUp(function (node) {
                if (node.hasParent()) {
                    var parent = node.getParent();
                    if (!parent.hasVisibleChildren()) {
                        parent.hide();
                    }
                }
            });

            return this;
        }

        /**
         * Clones this node.
         *
         * @category TreeNode
         * @param {array} excludeKeys Keys to exclude from the clone.
         * @return {TreeNode} New node object.
         */

    }, {
        key: 'clone',
        value: function clone(excludeKeys) {
            return new TreeNode(this._tree, this, excludeKeys);
        }

        /**
         * Collapse this node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'collapse',
        value: function collapse() {
            return baseStateChange('collapsed', true, 'collapsed', this);
        }

        /**
         * Get whether this node is collapsed.
         *
         * @category TreeNode
         * @return {boolean} Get if node collapsed.
         */

    }, {
        key: 'collapsed',
        value: function collapsed() {
            return this.state('collapsed');
        }

        /**
         * Get the containing context. If no parent present, the root context is returned.
         *
         * @category TreeNode
         * @return {TreeNodes} Node array object.
         */

    }, {
        key: 'context',
        value: function context() {
            return this.hasParent() ? this.getParent().children : this._tree.model;
        }

        /**
         * Copies node to a new tree instance.
         *
         * @category TreeNode
         * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
         * @return {object} Property "to" for defining destination.
         */

    }, {
        key: 'copy',
        value: function copy(hierarchy) {
            var node = this;

            if (hierarchy) {
                node = node.copyHierarchy();
            }

            return {

                /**
                 * Sets a destination.
                 *
                 * @category CopyNode
                 * @param {object} dest Destination Inspire Tree.
                 * @return {object} New node object.
                 */
                to: function to(dest) {
                    if (!_.isFunction(dest.addNode)) {
                        throw new Error('Destination must be an Inspire Tree instance.');
                    }

                    return dest.addNode(node.toObject());
                }
            };
        }

        /**
         * Copies all parents of a node.
         *
         * @category TreeNode
         * @param {boolean} excludeNode Exclude given node from hierarchy.
         * @return {TreeNode} Root node object with hierarchy.
         */

    }, {
        key: 'copyHierarchy',
        value: function copyHierarchy(excludeNode) {
            var nodes = [];
            var parents = this.getParents();

            // Remove old hierarchy data
            _.each(parents, function (node) {
                nodes.push(node.toObject(excludeNode));
            });

            parents = nodes.reverse();

            if (!excludeNode) {
                var clone = this.toObject(true);

                // Filter out hidden children
                if (this.hasChildren()) {
                    clone.children = this.children.filterBy(function (n) {
                        return !n.state('hidden');
                    }).toArray();

                    clone.children._context = clone;
                }

                nodes.push(clone);
            }

            var hierarchy = nodes[0];
            var pointer = hierarchy;
            var l = nodes.length;
            _.each(nodes, function (parent, key) {
                var children = [];

                if (key + 1 < l) {
                    children.push(nodes[key + 1]);
                    pointer.children = children;

                    pointer = pointer.children[0];
                }
            });

            return objectToNode(this._tree, hierarchy);
        }
    }, {
        key: 'deselect',


        /**
         * Deselect this node.
         *
         * If selection.require is true and this is the last selected
         * node, the node will remain in a selected state.
         *
         * @category TreeNode
         * @param {boolean} shallow Skip auto-deselecting children.
         * @return {TreeNode} Node object.
         */
        value: function deselect(shallow) {
            if (this.selected() && (!this._tree.config.selection.require || this._tree.selected().length > 1)) {
                this._tree.batch();

                // Will we apply this state change to our children?
                var deep = !shallow && this._tree.config.selection.autoSelectChildren;

                baseStateChange('selected', false, 'deselected', this, deep);

                this._tree.end();
            }

            return this;
        }

        /**
         * Get if node editable. Required editing.edit to be enable via config.
         *
         * @category TreeNode
         * @return {boolean} If node editable.
         */

    }, {
        key: 'editable',
        value: function editable() {
            return this._tree.config.editable && this._tree.config.editing.edit && this.state('editable');
        }

        /**
         * Get if node is currently in edit mode.
         *
         * @category TreeNode
         * @return {boolean} If node in edit mode.
         */

    }, {
        key: 'editing',
        value: function editing() {
            return this.state('editing');
        }

        /**
         * Expand this node.
         *
         * @category TreeNode
         * @return {Promise} Promise resolved on successful load and expand of children.
         */

    }, {
        key: 'expand',
        value: function expand() {
            var node = this;

            return new es6Promise_1(function (resolve, reject) {
                var allow = node.hasChildren() || node._tree.isDynamic && node.children === true;

                if (allow && (node.collapsed() || node.hidden())) {
                    node.state('collapsed', false);
                    node.state('hidden', false);

                    node._tree.emit('node.expanded', node);

                    if (node._tree.isDynamic && node.children === true) {
                        node.loadChildren().then(resolve).catch(reject);
                    } else {
                        node.markDirty();
                        node._tree.applyChanges();
                        resolve(node);
                    }
                } else {
                    // Resolve immediately
                    resolve(node);
                }
            });
        }

        /**
         * Get if node expanded.
         *
         * @category TreeNode
         * @return {boolean} If expanded.
         */

    }, {
        key: 'expanded',
        value: function expanded() {
            return !this.collapsed();
        }

        /**
         * Expand parent nodes.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'expandParents',
        value: function expandParents() {
            if (this.hasParent()) {
                this.getParent().recurseUp(function (node) {
                    node.expand();
                });
            }

            return this;
        }

        /**
         * Focus a node without changing its selection.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'focus',
        value: function focus() {
            if (!this.focused()) {
                // Batch selection changes
                this._tree.batch();
                this._tree.blurDeep();
                this.state('focused', true);

                // Emit this event
                this._tree.emit('node.focused', this);

                // Mark hierarchy dirty and apply
                this.markDirty();
                this._tree.end();
            }

            return this;
        }

        /**
         * Get whether this node is focused.
         *
         * @category TreeNode
         * @return {boolean} Get if node focused.
         */

    }, {
        key: 'focused',
        value: function focused() {
            return this.state('focused');
        }

        /**
         * Get children for this node. If no children exist, an empty TreeNodes
         * collection is returned for safe chaining.
         *
         * @category TreeNode
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'getChildren',
        value: function getChildren() {
            return this.hasChildren() ? this.children : new TreeNodes(this._tree);
        }

        /**
         * Get the immediate parent, if any.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'getParent',
        value: function getParent() {
            return this.itree.parent;
        }

        /**
         * Returns parent nodes. Excludes any siblings.
         *
         * @category TreeNode
         * @return {TreeNodes} Node objects.
         */

    }, {
        key: 'getParents',
        value: function getParents() {
            var parents = new TreeNodes(this._tree);

            if (this.hasParent()) {
                this.getParent().recurseUp(function (node) {
                    parents.push(node);
                });
            }

            return parents;
        }

        /**
         * Get a textual hierarchy for a given node. An array
         * of text from this node's root ancestor to the given node.
         *
         * @category TreeNode
         * @return {array} Array of node texts.
         */

    }, {
        key: 'getTextualHierarchy',
        value: function getTextualHierarchy() {
            var paths = [];

            this.recurseUp(function (node) {
                paths.unshift(node.text);
            });

            return paths;
        }

        /**
         * If node has any children.
         *
         * @category TreeNode
         * @return {boolean} If children.
         */

    }, {
        key: 'hasChildren',
        value: function hasChildren() {
            return _.isArrayLike(this.children) && this.children.length > 0;
        }

        /**
         * If children loading method has completed. Will always be true for non-dynamic nodes.
         *
         * @category TreeNode
         * @return {boolean} If we've attempted to load children.
         */

    }, {
        key: 'hasLoadedChildren',
        value: function hasLoadedChildren() {
            return _.isArrayLike(this.children);
        }

        /**
         * If node has any children, or allows dynamic loading.
         *
         * @category TreeNode
         * @return {boolean} If children.
         */

    }, {
        key: 'hasOrWillHaveChildren',
        value: function hasOrWillHaveChildren() {
            return _.isArrayLike(this.children) ? Boolean(this.children.length) : this.allowDynamicLoad();
        }

        /**
         * If node has a parent.
         *
         * @category TreeNode
         * @return {boolean} If parent.
         */

    }, {
        key: 'hasParent',
        value: function hasParent() {
            return Boolean(this.itree.parent);
        }

        /**
         * If node has any visible children.
         *
         * @category TreeNode
         * @return {boolean} If visible children.
         */

    }, {
        key: 'hasVisibleChildren',
        value: function hasVisibleChildren() {
            var hasVisibleChildren = false;

            if (this.hasChildren()) {
                hasVisibleChildren = this.children.filterBy('available').length > 0;
            }

            return hasVisibleChildren;
        }

        /**
         * Hide this node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'hide',
        value: function hide() {
            var node = baseStateChange('hidden', true, 'hidden', this);

            // Update children
            if (node.hasChildren()) {
                node.children.hide();
            }

            return node;
        }

        /**
         * Get whether this node is hidden.
         *
         * @category TreeNode
         * @return {boolean} Get if node hidden.
         */

    }, {
        key: 'hidden',
        value: function hidden() {
            return this.state('hidden');
        }

        /**
         * Returns a "path" of indices, values which map this node's location within all parent contexts.
         *
         * @category TreeNode
         * @return {string} Index path
         */

    }, {
        key: 'indexPath',
        value: function indexPath() {
            var indices = [];

            this.recurseUp(function (node) {
                indices.push(_.indexOf(node.context(), node));
            });

            return indices.reverse().join('.');
        }

        /**
         * Get whether this node is indeterminate.
         *
         * @category TreeNode
         * @return {boolean} Get if node indeterminate.
         */

    }, {
        key: 'indeterminate',
        value: function indeterminate() {
            return this.state('indeterminate');
        }

        /**
         * Find the last + deepest visible child of the previous sibling.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'lastDeepestVisibleChild',
        value: function lastDeepestVisibleChild() {
            var found = void 0;

            if (this.hasChildren() && !this.collapsed()) {
                found = _.findLast(this.children, function (node) {
                    return node.visible();
                });

                var res = found.lastDeepestVisibleChild();
                if (res) {
                    found = res;
                }
            }

            return found;
        }

        /**
         * Initiate a dynamic load of children for a given node.
         *
         * This requires `tree.config.data` to be a function which accepts
         * three arguments: node, resolve, reject.
         *
         * Use the `node` to filter results.
         *
         * On load success, pass the result array to `resolve`.
         * On error, pass the Error to `reject`.
         *
         * @category TreeNode
         * @return {Promise} Promise resolving children nodes.
         */

    }, {
        key: 'loadChildren',
        value: function loadChildren() {
            var _this3 = this;

            return new es6Promise_1(function (resolve, reject) {
                if (!_this3.allowDynamicLoad()) {
                    return reject(new Error('Node does not have or support dynamic children.'));
                }

                _this3.state('loading', true);
                _this3.markDirty();
                _this3._tree.applyChanges();

                var complete = function complete(nodes, totalNodes) {
                    // A little type-safety for silly situations
                    if (!_.isArrayLike(nodes)) {
                        return reject(new TypeError('Loader requires an array-like `nodes` parameter.'));
                    }

                    _this3._tree.batch();
                    _this3.state('loading', false);

                    var model = collectionToModel(_this3._tree, nodes, _this3);
                    if (_.isArrayLike(_this3.children)) {
                        _this3.children = _this3.children.concat(model);
                    } else {
                        _this3.children = model;
                    }

                    if (_.parseInt(totalNodes) > nodes.length) {
                        _this3.children._pagination.total = _.parseInt(totalNodes);
                    }

                    // If using checkbox mode, share selection with newly loaded children
                    if (_this3._tree.config.selection.mode === 'checkbox' && _this3.selected()) {
                        _this3.children.select();
                    }

                    _this3.markDirty();
                    _this3._tree.end();

                    resolve(_this3.children);

                    _this3._tree.emit('children.loaded', _this3);
                };

                var error = function error(err) {
                    _this3.state('loading', false);
                    _this3.children = new TreeNodes(_this3._tree);
                    _this3.children._context = _this3;
                    _this3.markDirty();
                    _this3._tree.applyChanges();

                    reject(err);

                    _this3._tree.emit('tree.loaderror', err);
                };

                var pagination = _this3._tree.constructor.isTreeNodes(_this3.children) ? _this3.children.pagination() : null;

                var loader = _this3._tree.config.data(_this3, complete, error, pagination);

                // Data loader is likely a promise
                if (_.isObject(loader)) {
                    standardizePromise(loader).then(complete).catch(error);
                }
            });
        }

        /**
         * Get whether this node is loading child data.
         *
         * @category TreeNode
         * @return {boolean} Get if node loading.
         */

    }, {
        key: 'loading',
        value: function loading() {
            return this.state('loading');
        }

        /**
         * Loads additional child nodes.
         *
         * @category TreeNode
         * @param {Event} event Click or scroll event if DOM interaction triggered this call.
         * @return {Promise} Resolves with request results.
         */

    }, {
        key: 'loadMore',
        value: function loadMore() {
            if (!this.children || this.children === true) {
                return es6Promise_1.reject(new Error('Children have not yet been loaded.'));
            }

            return this.children.loadMore();
        }

        /**
         * Mark a node as dirty, rebuilding this node in the virtual DOM
         * and rerendering to the live DOM, next time applyChanges is called.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'markDirty',
        value: function markDirty() {
            if (!this.itree.dirty) {
                this.itree.dirty = true;

                if (this.hasParent()) {
                    this.getParent().markDirty();
                }
            }

            return this;
        }

        /**
         * Get whether this node was matched during the last search.
         *
         * @category TreeNode
         * @return {boolean} Get if node matched.
         */

    }, {
        key: 'matched',
        value: function matched() {
            return this.state('matched');
        }

        /**
         * Find the next visible sibling of our ancestor. Continues
         * seeking up the tree until a valid node is found or we
         * reach the root node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'nextVisibleAncestralSiblingNode',
        value: function nextVisibleAncestralSiblingNode() {
            var next = void 0;

            if (this.hasParent()) {
                var parent = this.getParent();
                next = parent.nextVisibleSiblingNode();

                if (!next) {
                    next = parent.nextVisibleAncestralSiblingNode();
                }
            }

            return next;
        }

        /**
         * Find next visible child node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object, if any.
         */

    }, {
        key: 'nextVisibleChildNode',
        value: function nextVisibleChildNode() {
            var next = void 0;

            if (this.hasChildren()) {
                next = _.find(this.children, function (child) {
                    return child.visible();
                });
            }

            return next;
        }

        /**
         * Get the next visible node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object if any.
         */

    }, {
        key: 'nextVisibleNode',
        value: function nextVisibleNode() {
            var next = void 0;

            // 1. Any visible children
            next = this.nextVisibleChildNode();

            // 2. Any Siblings
            if (!next) {
                next = this.nextVisibleSiblingNode();
            }

            // 3. Find sibling of ancestor(s)
            if (!next) {
                next = this.nextVisibleAncestralSiblingNode();
            }

            return next;
        }

        /**
         * Find the next visible sibling node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object, if any.
         */

    }, {
        key: 'nextVisibleSiblingNode',
        value: function nextVisibleSiblingNode() {
            var context = this.hasParent() ? this.getParent().children : this._tree.nodes();
            var i = _.findIndex(context, { id: this.id });

            return _.find(_.slice(context, i + 1), function (node) {
                return node.visible();
            });
        }

        /**
         * Get pagination object for this tree node.
         *
         * @category TreeNode
         * @return {object} Pagination configuration object.
         */

    }, {
        key: 'pagination',
        value: function pagination() {
            return _.get(this, 'children._pagination');
        }

        /**
         * Find the previous visible node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object, if any.
         */

    }, {
        key: 'previousVisibleNode',
        value: function previousVisibleNode() {
            var prev = void 0;

            // 1. Any Siblings
            prev = this.previousVisibleSiblingNode();

            // 2. If that sibling has children though, go there
            if (prev && prev.hasChildren() && !prev.collapsed()) {
                prev = prev.lastDeepestVisibleChild();
            }

            // 3. Parent
            if (!prev && this.hasParent()) {
                prev = this.getParent();
            }

            return prev;
        }

        /**
         * Find the previous visible sibling node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object, if any.
         */

    }, {
        key: 'previousVisibleSiblingNode',
        value: function previousVisibleSiblingNode() {
            var context = this.hasParent() ? this.getParent().children : this._tree.nodes();
            var i = _.findIndex(context, { id: this.id });
            return _.findLast(_.slice(context, 0, i), function (node) {
                return node.visible();
            });
        }

        /**
         * Iterate down node and any children.
         *
         * @category TreeNode
         * @param {function} iteratee Iteratee function.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'recurseDown',
        value: function recurseDown$$1(iteratee) {
            recurseDown(this, iteratee);

            return this;
        }

        /**
         * Iterate up a node and its parents.
         *
         * @category TreeNode
         * @param {function} iteratee Iteratee function.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'recurseUp',
        value: function recurseUp(iteratee) {
            var result = iteratee(this);

            if (result !== false && this.hasParent()) {
                this.getParent().recurseUp(iteratee);
            }

            return this;
        }

        /**
         * Updates the indeterminate state of this node.
         *
         * True if some, but not all children are checked.
         * False if no children are checked.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'refreshIndeterminateState',
        value: function refreshIndeterminateState() {
            var oldValue = this.indeterminate();
            this.state('indeterminate', false);

            if (this.hasChildren()) {
                var childrenCount = this.children.length;
                var indeterminate = 0;
                var checked = 0;

                this.children.each(function (n) {
                    if (n.checked()) {
                        checked++;
                    }

                    if (n.indeterminate()) {
                        indeterminate++;
                    }
                });

                // Set selected if all children are
                if (checked === childrenCount) {
                    baseStateChange('checked', true, 'checked', this);
                } else {
                    baseStateChange('checked', false, 'unchecked', this);
                }

                // Set indeterminate if any children are, or some children are selected
                if (!this.checked()) {
                    this.state('indeterminate', indeterminate > 0 || childrenCount > 0 && checked > 0 && checked < childrenCount);
                }
            }

            if (this.hasParent()) {
                this.getParent().refreshIndeterminateState();
            }

            if (oldValue !== this.state('indeterminate')) {
                this.markDirty();
            }

            return this;
        }

        /**
         * Removes all current children and re-executes a loadChildren call.
         *
         * @category TreeNode
         * @return {Promise} Promise resolved on load.
         */

    }, {
        key: 'reload',
        value: function reload() {
            var _this4 = this;

            return new es6Promise_1(function (resolve, reject) {
                if (!_this4.allowDynamicLoad()) {
                    return reject(new Error('Node or tree does not support dynamic children.'));
                }

                // Reset children
                _this4.children = true;

                // Collapse
                _this4.collapse();

                // Load and the proxy the promise
                _this4.loadChildren().then(resolve).catch(reject);
            });
        }

        /**
         * Remove a node from the tree.
         *
         * @category TreeNode
         * @return {object} Removed tree node object.
         */

    }, {
        key: 'remove',
        value: function remove$$1() {
            // Cache parent before we remove the node
            var parent = this.getParent();

            // Remove self
            this.context().remove(this);

            // Refresh parent states
            if (parent) {
                parent.refreshIndeterminateState();
                parent.markDirty();
            }

            var pagination = parent ? parent.pagination() : this._tree.pagination();
            pagination.total--;

            // Export/event
            var exported = this.toObject();
            this._tree.emit('node.removed', exported, parent);

            this._tree.applyChanges();

            return exported;
        }

        /**
         * Get whether this node is soft-removed.
         *
         * @category TreeNode
         * @return {boolean} Get if node removed.
         */

    }, {
        key: 'removed',
        value: function removed() {
            return this.state('removed');
        }

        /**
         * Get whether this node has been rendered.
         *
         * Will be false if deferred rendering is enable and the node has
         * not yet been loaded, or if a custom DOM renderer is used.
         *
         * @category TreeNode
         * @return {boolean} Get if node rendered.
         */

    }, {
        key: 'rendered',
        value: function rendered() {
            return this.state('rendered');
        }

        /**
         * Restore state if soft-removed.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'restore',
        value: function restore() {
            return baseStateChange('removed', false, 'restored', this);
        }

        /**
         * Select this node.
         *
         * @category TreeNode
         * @param {boolean} shallow Skip auto-selecting children.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'select',
        value: function select(shallow) {
            if (!this.selected() && this.selectable()) {
                // Batch selection changes
                this._tree.batch();

                if (this._tree.canAutoDeselect()) {
                    var oldVal = this._tree.config.selection.require;
                    this._tree.config.selection.require = false;
                    this._tree.deselectDeep();
                    this._tree.config.selection.require = oldVal;
                }

                // Will we apply this state change to our children?
                var deep = !shallow && this._tree.config.selection.autoSelectChildren;

                baseStateChange('selected', true, 'selected', this, deep);

                // Cache as the last selected node
                this._tree._lastSelectedNode = this;

                // Mark hierarchy dirty and apply
                this.markDirty();
                this._tree.end();
            }

            return this;
        }

        /**
         * Get if node selectable.
         *
         * @category TreeNode
         * @return {boolean} If node selectable.
         */

    }, {
        key: 'selectable',
        value: function selectable() {
            var allow = this._tree.config.selection.allow(this);
            return typeof allow === 'boolean' ? allow : this.state('selectable');
        }

        /**
         * Get whether this node is selected.
         *
         * @category TreeNode
         * @return {boolean} Get if node selected.
         */

    }, {
        key: 'selected',
        value: function selected() {
            return this.state('selected');
        }

        /**
         * Set a root property on this node.
         *
         * @category TreeNode
         * @param {string|number} property Property name.
         * @param {*} value New value.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'set',
        value: function set$$1(property, value) {
            this[property] = value;
            this.markDirty();

            this._tree.applyChanges();

            return this;
        }

        /**
         * Show this node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'show',
        value: function show() {
            return baseStateChange('hidden', false, 'shown', this);
        }

        /**
         * Get or set a state value.
         *
         * This is a base method and will not invoke related changes, for example
         * setting selected=false will not trigger any deselection logic.
         *
         * @category TreeNode
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {boolean} Current value on read, old value on set.
         */

    }, {
        key: 'state',
        value: function state(name, newVal) {
            var currentVal = this.itree.state[name];

            if (typeof newVal !== 'undefined' && currentVal !== newVal) {
                // Update values
                this.itree.state[name] = newVal;

                if (name !== 'rendered') {
                    this.markDirty();
                }

                // Emit an event
                this._tree.emit('node.state.changed', this, name, currentVal, newVal);
            }

            return currentVal;
        }

        /**
         * Swaps position with the given node.
         *
         * @category TreeNode
         * @param {TreeNode} node Node.
         * @return {TreeNode} Node objects.
         */

    }, {
        key: 'swap',
        value: function swap(node) {
            this.context().swap(this, node);

            return this;
        }

        /**
         * Mark this node as "removed" without actually removing it.
         *
         * Expand/show methods will never reveal this node until restored.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'softRemove',
        value: function softRemove() {
            return baseStateChange('removed', true, 'softremoved', this, 'softRemove');
        }

        /**
         * Toggles checked state.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'toggleCheck',
        value: function toggleCheck() {
            return this.checked() ? this.uncheck() : this.check();
        }

        /**
         * Toggles collapsed state.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'toggleCollapse',
        value: function toggleCollapse() {
            return this.collapsed() ? this.expand() : this.collapse();
        }

        /**
         * Toggles editing state.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'toggleEditing',
        value: function toggleEditing() {
            this.state('editing', !this.state('editing'));

            this.markDirty();
            this._tree.applyChanges();

            return this;
        }

        /**
         * Toggles selected state.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'toggleSelect',
        value: function toggleSelect() {
            return this.selected() ? this.deselect() : this.select();
        }

        /**
         * Export this node as a native Object.
         *
         * @category TreeNode
         * @param {boolean} excludeChildren Exclude children.
         * @return {object} Node object.
         */

    }, {
        key: 'toObject',
        value: function toObject(excludeChildren) {
            var object = {};

            _.each(this, function (v, k) {
                if (k !== '_tree' && k !== 'children' && k !== 'itree') {
                    object[k] = v;
                }
            });

            if (!excludeChildren && this.hasChildren() && _.isFunction(this.children.toArray)) {
                object.children = this.children.toArray();
            }

            return object;
        }

        /**
         * Get the text content of this tree node.
         *
         * @return {string} Text content.
         */

    }, {
        key: 'toString',
        value: function toString() {
            return this.text;
        }

        /**
         * Get the tree this node ultimately belongs to.
         *
         * @category TreeNode
         * @return {InspireTree} Tree instance.
         */

    }, {
        key: 'tree',
        value: function tree() {
            return this.context().tree();
        }

        /**
         * Unchecks this node.
         *
         * @category TreeNode
         * @param {boolean} shallow Skip auto-unchecking children.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'uncheck',
        value: function uncheck(shallow) {
            this._tree.batch();

            // Will we apply this state change to our children?
            var deep = !shallow && this._tree.config.checkbox.autoCheckChildren;

            baseStateChange('checked', false, 'unchecked', this, deep);

            // Reset indeterminate state
            this.state('indeterminate', false);

            // Refresh our parent
            if (this.hasParent()) {
                this.getParent().refreshIndeterminateState();
            }

            this._tree.end();

            return this;
        }
    }, {
        key: 'visible',


        /**
         * Checks whether a node is visible to a user. Returns false
         * if it's hidden, or if any ancestor is hidden or collapsed.
         *
         * @category TreeNode
         * @return {boolean} Whether visible.
         */
        value: function visible() {
            var isVisible = true;
            if (this.hidden() || this.removed() || this._tree.usesNativeDOM && !this.rendered()) {
                isVisible = false;
            } else if (this.hasParent()) {
                if (this.getParent().collapsed()) {
                    isVisible = false;
                } else {
                    isVisible = this.getParent().visible();
                }
            } else {
                isVisible = true;
            }

            return isVisible;
        }
    }]);
    return TreeNode;
}();

/**
 * Parse a raw object into a TreeNode used within a tree.
 *
 * Note: Uses native js over lodash where performance
 * benefits most, since this handles every node.
 *
 * @private
 * @param {object} tree Tree instance.
 * @param {object} object Source object
 * @param {object} parent Pointer to parent object.
 * @return {object} Final object
 */
function objectToNode(tree, object, parent) {
    // Create or type-ensure ID
    object.id = object.id || v4_1();
    if (typeof object.id !== 'string' && typeof object.id !== 'number') {
        object.id = object.id.toString();
    }

    // High-performance default assignments
    var itree = object.itree = object.itree || {};
    itree.icon = itree.icon || false;
    itree.dirty = false;

    var li = itree.li = itree.li || {};
    li.attributes = li.attributes || {};

    var a = itree.a = itree.a || {};
    a.attributes = a.attributes || {};

    var pagination = itree.pagination = {};
    pagination.limit = tree.config.pagination.limit;
    pagination.total = _.isArray(object.children) ? object.children.length : 0;

    var state = itree.state = itree.state || {};

    // Enabled by default
    state.collapsed = typeof state.collapsed === 'boolean' ? state.collapsed : tree.defaultState.collapsed;
    state.selectable = typeof state.selectable === 'boolean' ? state.selectable : tree.defaultState.selectable;

    // Disabled by default
    state.checked = typeof state.checked === 'boolean' ? state.checked : false;
    state.editable = typeof state.editable === 'boolean' ? state.editable : tree.defaultState.editable;
    state.editing = typeof state.editing === 'boolean' ? state.editing : tree.defaultState.editing;
    state.focused = state.focused || tree.defaultState.focused;
    state.hidden = state.hidden || tree.defaultState.hidden;
    state.indeterminate = state.indeterminate || tree.defaultState.indeterminate;
    state.loading = state.loading || tree.defaultState.loading;
    state.removed = state.removed || tree.defaultState.removed;
    state.rendered = state.rendered || tree.defaultState.rendered;
    state.selected = state.selected || tree.defaultState.selected;

    // Save parent, if any.
    object.itree.parent = parent;

    // Wrap
    object = _.assign(new TreeNode(tree), object);

    if (_.isArrayLike(object.children)) {
        object.children = collectionToModel(tree, object.children, object);
    }

    // Fire events for pre-set states, if enabled
    if (tree.allowsLoadEvents) {
        _.each(tree.config.allowLoadEvents, function (eventName) {
            if (state[eventName]) {
                tree.emit('node.' + eventName, object, true);
            }
        });
    }

    return object;
}

/**
 * Parses a raw collection of objects into a model used
 * within a tree. Adds state and other internal properties.
 *
 * @private
 * @param {object} tree Tree instance.
 * @param {array} array Array of nodes
 * @param {object} parent Pointer to parent object
 * @return {array|object} Object model.
 */
function collectionToModel(tree, array, parent) {
    var collection = new TreeNodes(tree);

    // Sort
    if (tree.config.sort) {
        array = _.sortBy(array, tree.config.sort);
    }

    _.each(array, function (node) {
        collection.push(objectToNode(tree, node, parent));
    });

    collection._context = parent;

    return collection;
}

var eventemitter2 = createCommonjsModule(function (module, exports) {
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
!function(undefined) {

  var isArray$$1 = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' +
        'leak detected. ' + count + ' listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.';

    if(this.verboseMemoryLeak){
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if(typeof process !== 'undefined' && process.emitWarning){
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace){
        console.trace();
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (
            !tree._listeners.warned &&
            this._maxListeners > 0 &&
            tree._listeners.length > this._maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';


  EventEmitter.prototype.once = function(event, fn) {
    return this._once(event, fn, false);
  };

  EventEmitter.prototype.prependOnceListener = function(event, fn) {
    return this._once(event, fn, true);
  };

  EventEmitter.prototype._once = function(event, fn, prepend) {
    this._many(event, 1, fn, prepend);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    return this._many(event, ttl, fn, false);
  };

  EventEmitter.prototype.prependMany = function(event, ttl, fn) {
    return this._many(event, ttl, fn, true);
  };

  EventEmitter.prototype._many = function(event, ttl, fn, prepend) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    this._on(event, listener, prepend);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) args[j] = arguments[j];
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    var promises= [];

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) args[j] = arguments[j];
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener) {
    return this._on(type, listener, false);
  };

  EventEmitter.prototype.prependListener = function(type, listener) {
    return this._on(type, listener, true);
  };

  EventEmitter.prototype.onAny = function(fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function(fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function(fn, prepend){
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if(prepend){
      this._all.unshift(fn);
    }else{
      this._all.push(fn);
    }

    return this;
  };

  EventEmitter.prototype._on = function(type, listener, prepend) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if(prepend){
        this._events[type].unshift(listener);
      }else{
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._maxListeners > 0 &&
        this._events[type].length > this._maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  };

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray$$1(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }

        this.emit("removeListener", type, listener);

        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }

        this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if ((obj instanceof Function) || (typeof obj !== "object") || (obj === null))
          continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++)
        this.emit("removeListenerAny", fns[i]);
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray$$1(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.eventNames = function(){
    return Object.keys(this._events);
  };

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof undefined === 'function' && undefined.amd) {
     // AMD. Register as an anonymous module.
    undefined(function() {
      return EventEmitter;
    });
  } else {
    // CommonJS
    module.exports = EventEmitter;
  }
}();
});

var eventemitter2_1 = eventemitter2.EventEmitter2;

// Libs

/**
 * Maps a method to the root TreeNodes collection.
 *
 * @private
 * @param {InspireTree} tree Tree instance.
 * @param {string} method Method name.
 * @param {arguments} args Proxied arguments.
 * @return {mixed} Proxied return value.
 */
function _map(tree, method, args) {
    return tree.model[method].apply(tree.model, args);
}

/**
 * Represents a singe tree instance.
 *
 * @category Tree
 * @return {InspireTree} Tree instance.
 */

var InspireTree = function (_EventEmitter) {
    inherits(InspireTree, _EventEmitter);

    function InspireTree(opts) {
        classCallCheck(this, InspireTree);

        var _this = possibleConstructorReturn(this, (InspireTree.__proto__ || Object.getPrototypeOf(InspireTree)).call(this));

        var tree = _this;

        // Init properties
        tree._lastSelectedNode;
        tree._muted = false;
        tree.allowsLoadEvents = false;
        tree.batching = 0;
        tree.id = v4_1();
        tree.initialized = false;
        tree.isDynamic = false;
        tree.opts = opts;
        tree.preventDeselection = false;

        // Assign defaults
        tree.config = _.defaultsDeep({}, opts, {
            allowLoadEvents: [],
            checkbox: {
                autoCheckChildren: true
            },
            contextMenu: false,
            data: false,
            editable: false,
            editing: {
                add: false,
                edit: false,
                remove: false
            },
            nodes: {
                resetStateOnRestore: true
            },
            pagination: {
                limit: -1
            },
            renderer: false,
            search: {
                matcher: false,
                matchProcessor: false
            },
            selection: {
                allow: _.noop,
                autoDeselect: true,
                autoSelectChildren: false,
                disableDirectDeselection: false,
                mode: 'default',
                multiple: false,
                require: false
            },
            showCheckboxes: false,
            sort: false
        });

        // If checkbox mode, we must force auto-selecting children
        if (tree.config.selection.mode === 'checkbox') {
            tree.config.selection.autoSelectChildren = true;

            // In checkbox mode, checked=selected
            tree.on('node.checked', function (node) {
                if (!node.selected()) {
                    node.select(true);
                }
            });

            tree.on('node.selected', function (node) {
                if (!node.checked()) {
                    node.check(true);
                }
            });

            tree.on('node.unchecked', function (node) {
                if (node.selected()) {
                    node.deselect(true);
                }
            });

            tree.on('node.deselected', function (node) {
                if (node.checked()) {
                    node.uncheck(true);
                }
            });
        }

        // If auto-selecting children, we must force multiselect
        if (tree.config.selection.autoSelectChildren) {
            tree.config.selection.multiple = true;
            tree.config.selection.autoDeselect = false;
        }

        // Treat editable as full edit mode
        if (opts.editable && !opts.editing) {
            tree.config.editing.add = true;
            tree.config.editing.edit = true;
            tree.config.editing.remove = true;
        }

        // Support simple config for search
        if (_.isFunction(opts.search)) {
            tree.config.search = {
                matcher: opts.search,
                matchProcessor: false
            };
        }

        // Init the default state for nodes
        tree.defaultState = {
            collapsed: true,
            editable: _.get(tree, 'config.editing.edit'),
            editing: false,
            focused: false,
            hidden: false,
            indeterminate: false,
            loading: false,
            matched: false,
            removed: false,
            rendered: false,
            selectable: true,
            selected: false
        };

        // Cache some configs
        tree.allowsLoadEvents = _.isArray(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
        tree.isDynamic = _.isFunction(tree.config.data);

        // Override emitter so we can better control flow
        var emit = tree.emit;
        tree.emit = function (eventName) {
            if (!tree.isEventMuted(eventName)) {
                // Duck-type for a DOM event
                if (_.isFunction(_.get(arguments, '[1].preventDefault'))) {
                    var event = arguments[1];
                    event.treeDefaultPrevented = false;
                    event.preventTreeDefault = function () {
                        event.treeDefaultPrevented = true;
                    };
                }

                emit.apply(tree, arguments);
            }
        };

        // Init the model
        tree.model = new TreeNodes(tree);

        // Load initial user data
        if (tree.config.data) {
            tree.load(tree.config.data);
        }

        tree.initialized = true;
        return _this;
    }

    /**
     * Adds a new node to this collection. If a sort
     * method is configured, the node will be added
     * in the appropriate order.
     *
     * @category Tree
     * @param {object} node Node
     * @return {TreeNode} Node object.
     */


    createClass(InspireTree, [{
        key: 'addNode',
        value: function addNode() {
            return _map(this, 'addNode', arguments);
        }

        /**
         * Add nodes.
         *
         * @category Tree
         * @param {array} nodes Array of node objects.
         * @return {TreeNodes} Added node objects.
         */

    }, {
        key: 'addNodes',
        value: function addNodes(nodes) {
            var _this2 = this;

            this.batch();

            var newNodes = new TreeNodes(this);
            _.each(nodes, function (node) {
                newNodes.push(_this2.addNode(node));
            });

            this.end();

            return newNodes;
        }

        /**
         * Release any pending data changes to any listeners.
         *
         * Will skip rendering as long as any calls
         * to `batch` have yet to be resolved,
         *
         * @category Tree
         * @private
         * @return {void}
         */

    }, {
        key: 'applyChanges',
        value: function applyChanges() {
            // Never rerender when until batch complete
            if (this.batching > 0) {
                return;
            }

            this.emit('changes.applied');
        }

        /**
         * Query for all available nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'available',
        value: function available() {
            return _map(this, 'available', arguments);
        }

        /**
         * Batch multiple changes for any listeners (i.e. DOM)
         *
         * @category Tree
         * @private
         * @return {void}
         */

    }, {
        key: 'batch',
        value: function batch() {
            if (this.batching < 0) {
                this.batching = 0;
            }

            this.batching++;
        }

        /**
         * Blur children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'blur',
        value: function blur() {
            return _map(this, 'blur', arguments);
        }

        /**
         * Blur all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'blurDeep',
        value: function blurDeep() {
            return _map(this, 'blurDeep', arguments);
        }

        /**
         * Compares any number of TreeNode objects and returns
         * the minimum and maximum (starting/ending) nodes.
         *
         * @category Tree
         * @return {array} Array with two TreeNode objects.
         */

    }, {
        key: 'boundingNodes',
        value: function boundingNodes() {
            var pathMap = _.transform(arguments, function (map$$1, node) {
                map$$1[node.indexPath().replace(/\./g, '')] = node;
            }, {});

            var _$sortBy = _.sortBy(Object.keys(pathMap)),
                _$sortBy2 = toArray(_$sortBy),
                head = _$sortBy2[0],
                tail = _$sortBy2.slice(1);

            return [_.get(pathMap, head), _.get(pathMap, tail)];
        }

        /**
         * Get if the tree will auto-deselect currently selected nodes
         * when a new selection is made.
         *
         * @category Tree
         * @return {boolean} If tree will auto-deselect nodes.
         */

    }, {
        key: 'canAutoDeselect',
        value: function canAutoDeselect() {
            return this.config.selection.autoDeselect && !this.preventDeselection;
        }

        /**
         * Query for all checked nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'checked',
        value: function checked() {
            return _map(this, 'checked', arguments);
        }

        /**
         * Clean children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'clean',
        value: function clean() {
            return _map(this, 'clean', arguments);
        }

        /**
         * Clears matched nodes, shows all nodes and collapses parents.
         *
         * @category Tree
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'clearSearch',
        value: function clearSearch() {
            this.matched().state('matched', false);
            return this.showDeep().collapseDeep().tree();
        }

        /**
         * Clones (deep) the array of nodes.
         *
         * Note: Cloning will *not* clone the context pointer.
         *
         * @category Tree
         * @return {TreeNodes} Array of cloned nodes.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return _map(this, 'clone', arguments);
        }

        /**
         * Collapse children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapse',
        value: function collapse() {
            return _map(this, 'collapse', arguments);
        }

        /**
         * Query for all collapsed nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapsed',
        value: function collapsed() {
            return _map(this, 'collapsed', arguments);
        }

        /**
         * Collapse all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapseDeep',
        value: function collapseDeep() {
            return _map(this, 'collapseDeep', arguments);
        }

        /**
         * Concat nodes like an Array would.
         *
         * @category Tree
         * @param {TreeNodes} nodes Array of nodes.
         * @return {TreeNodes} Resulting node array.
         */

    }, {
        key: 'concat',
        value: function concat() {
            return _map(this, 'concat', arguments);
        }

        /**
         * Copies nodes to a new tree instance.
         *
         * @category Tree
         * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
         * @return {object} Methods to perform action on copied nodes.
         */

    }, {
        key: 'copy',
        value: function copy() {
            return _map(this, 'copy', arguments);
        }

        /**
         * Creates a TreeNode without adding it. If the obj is already a TreeNode it's returned without modification.
         *
         * @category Tree
         * @param {object} obj Source node object.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'createNode',
        value: function createNode(obj) {
            return InspireTree.isTreeNode(obj) ? obj : objectToNode(this, obj);
        }

        /**
         * Returns deepest nodes from this array.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deepest',
        value: function deepest() {
            return _map(this, 'deepest', arguments);
        }

        /**
         * Deselect children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deselect',
        value: function deselect() {
            return _map(this, 'deselect', arguments);
        }

        /**
         * Deselect all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deselectDeep',
        value: function deselectDeep() {
            return _map(this, 'deselectDeep', arguments);
        }

        /**
         * Disable auto-deselection of currently selected nodes.
         *
         * @category Tree
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'disableDeselection',
        value: function disableDeselection() {
            if (this.config.selection.multiple) {
                this.preventDeselection = true;
            }

            return this;
        }

        /**
         * Iterate every TreeNode in this collection.
         *
         * @category Tree
         * @param {function} iteratee Iteratee invoke for each node.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'each',
        value: function each$$1() {
            return _map(this, 'each', arguments);
        }

        /**
         * Returns whether every root node passes the given test.
         *
         * @category Tree
         * @param {function} tester Test each node in this collection,
         * @return {boolean} True if every node passes the test.
         */

    }, {
        key: 'every',
        value: function every() {
            return _map(this, 'every', arguments);
        }

        /**
         * Query for all editable nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'editable',
        value: function editable() {
            return _map(this, 'editable', arguments);
        }

        /**
         * Query for all nodes in editing mode.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'editing',
        value: function editing() {
            return _map(this, 'editing', arguments);
        }

        /**
         * Enable auto-deselection of currently selected nodes.
         *
         * @category Tree
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'enableDeselection',
        value: function enableDeselection() {
            this.preventDeselection = false;

            return this;
        }

        /**
         * Release the current batch.
         *
         * @category Tree
         * @private
         * @return {void}
         */

    }, {
        key: 'end',
        value: function end() {
            this.batching--;

            if (this.batching === 0) {
                this.applyChanges();
            }
        }

        /**
         * Expand children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expand',
        value: function expand() {
            return _map(this, 'expand', arguments);
        }

        /**
         * Recursively expands all nodes, loading all dynamic calls.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expandDeep',
        value: function expandDeep() {
            return _map(this, 'expandDeep', arguments);
        }

        /**
         * Query for all expanded nodes.
         *
         * @category Tree
         * @return {Promise} Promise resolved only when all children have loaded and expanded.
         */

    }, {
        key: 'expanded',
        value: function expanded() {
            return _map(this, 'expanded', arguments);
        }

        /**
         * Returns a cloned hierarchy of all nodes matching a predicate.
         *
         * Because it filters deeply, we must clone all nodes so that we
         * don't affect the actual node array.
         *
         * @category Tree
         * @param {string|function} predicate State flag or custom function.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'extract',
        value: function extract() {
            return _map(this, 'extract', arguments);
        }

        /**
         * Returns nodes which match a predicate.
         *
         * @category Tree
         * @param {function} predicate Test function.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'filter',
        value: function filter() {
            return _map(this, 'filter', arguments);
        }

        /**
         * Returns nodes which match a predicate.
         *
         * @category Tree
         * @param {string|function} predicate State flag or custom function.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'filterBy',
        value: function filterBy() {
            return _map(this, 'filterBy', arguments);
        }

        /**
         * Flattens a hierarchy, returning only node(s) matching the
         * expected state or predicate function.
         *
         * @category Tree
         * @param {string|function} predicate State property or custom function.
         * @return {TreeNodes} Flat array of matching nodes.
         */

    }, {
        key: 'flatten',
        value: function flatten() {
            return _map(this, 'flatten', arguments);
        }

        /**
         * Query for all focused nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'focused',
        value: function focused() {
            return _map(this, 'focused', arguments);
        }

        /**
         * Iterate every TreeNode in this collection.
         *
         * @category Tree
         * @param {function} iteratee Iteratee invoke for each node.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'forEach',
        value: function forEach() {
            return _map(this, 'each', arguments);
        }

        /**
         * Get a specific node in the collection, or undefined if it doesn't exist.
         *
         * @category Tree
         * @param {int} index Numeric index of requested node.
         * @return {TreeNode} Node object. Undefined if invalid index.
         */

    }, {
        key: 'get',
        value: function get$$1() {
            return _map(this, 'get', arguments);
        }

        /**
         * Query for all hidden nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hidden',
        value: function hidden() {
            return _map(this, 'hidden', arguments);
        }

        /**
         * Hide children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hide',
        value: function hide() {
            return _map(this, 'hide', arguments);
        }

        /**
         * Hide all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hideDeep',
        value: function hideDeep() {
            return _map(this, 'hideDeep', arguments);
        }

        /**
         * Query for all indeterminate nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'indeterminate',
        value: function indeterminate() {
            return _map(this, 'indeterminate', arguments);
        }

        /**
         * Get the array index of the given root node.
         *
         * @category Tree
         * @param {TreeNode} node Root tree node.
         * @return {int} Index of the node.
         */

    }, {
        key: 'indexOf',
        value: function indexOf$$1() {
            return _map(this, 'indexOf', arguments);
        }

        /**
         * Insert a new node at a given position.
         *
         * @category Tree
         * @param {integer} index Index at which to insert the node.
         * @param {object} object Raw node object or TreeNode.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'insertAt',
        value: function insertAt() {
            return _map(this, 'insertAt', arguments);
        }

        /**
         * Invoke method(s) on each node.
         *
         * @category Tree
         * @param {string|array} methods Method name(s).
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'invoke',
        value: function invoke$$1() {
            return _map(this, 'invoke', arguments);
        }

        /**
         * Invoke method(s) deeply.
         *
         * @category Tree
         * @param {string|array} methods Method name(s).
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'invokeDeep',
        value: function invokeDeep() {
            return _map(this, 'invokeDeep', arguments);
        }

        /**
         * Check if an event is currently muted.
         *
         * @category Tree
         * @param {string} eventName Event name.
         * @return {boolean} If event is muted.
         */

    }, {
        key: 'isEventMuted',
        value: function isEventMuted(eventName) {
            if (_.isBoolean(this.muted())) {
                return this.muted();
            }

            return _.includes(this.muted(), eventName);
        }

        /**
         * Check if an object is a Tree.
         *
         * @category Tree
         * @param {object} object Object
         * @return {boolean} If object is a Tree.
         */

    }, {
        key: 'isTree',
        value: function isTree(object) {
            return object instanceof InspireTree;
        }

        /**
         * Check if an object is a TreeNode.
         *
         * @category Tree
         * @param {object} obj Object
         * @return {boolean} If object is a TreeNode.
         */

    }, {
        key: 'join',


        /**
         * Returns a string from root node objects.
         *
         * @category Tree
         * @param {string} separator Separator, defaults to a comma
         * @return {string} Strings from root node objects.
         */
        value: function join() {
            return _map(this, 'join', arguments);
        }

        /**
         * Get the most recently selected node, if any.
         *
         * @category Tree
         * @return {TreeNode} Last selected node, or undefined.
         */

    }, {
        key: 'lastSelectedNode',
        value: function lastSelectedNode() {
            return this._lastSelectedNode;
        }

        /**
         * Loads tree. Accepts an array or a promise.
         *
         * @category Tree
         * @param {array|function} loader Array of nodes, or promise resolving an array of nodes.
         * @return {Promise} Promise resolved upon successful load, rejected on error.
         * @example
         *
         * tree.load($.getJSON('nodes.json'));
         */

    }, {
        key: 'load',
        value: function load(loader) {
            var _this3 = this;

            var promise = new es6Promise_1(function (resolve, reject) {
                var complete = function complete(nodes, totalNodes) {
                    // A little type-safety for silly situations
                    if (!_.isArrayLike(nodes)) {
                        return reject(new TypeError('Loader requires an array-like `nodes` parameter.'));
                    }

                    // Delay event for synchronous loader. Otherwise it fires
                    // before the user has a chance to listen.
                    if (!_this3.initialized && _.isArrayLike(nodes)) {
                        setTimeout(function () {
                            _this3.emit('data.loaded', nodes);
                        });
                    } else {
                        _this3.emit('data.loaded', nodes);
                    }

                    // Parse newly-loaded nodes
                    var newModel = collectionToModel(_this3, nodes);

                    // Concat only if loading is deferred
                    if (_this3.config.deferredLoading) {
                        _this3.model = _this3.model.concat(newModel);
                    } else {
                        _this3.model = newModel;
                    }

                    // Set pagination
                    _this3.model._pagination.total = nodes.length;
                    if (_.parseInt(totalNodes) > nodes.length) {
                        _this3.model._pagination.total = _.parseInt(totalNodes);
                    }

                    if (_this3.config.selection.require && !_this3.selected().length) {
                        _this3.selectFirstAvailableNode();
                    }

                    var init = function init() {
                        _this3.emit('model.loaded', _this3.model);

                        resolve(_this3.model);

                        _this3.applyChanges();
                    };

                    // Delay event for synchronous loader
                    if (!_this3.initialized && _.isArray(nodes)) {
                        setTimeout(init);
                    } else {
                        init();
                    }
                };

                // Data given already as an array
                if (_.isArrayLike(loader)) {
                    complete(loader);
                }

                // Data loader requires a caller/callback
                else if (_.isFunction(loader)) {
                        var resp = loader(null, complete, reject, _this3.pagination());

                        // Loader returned its own object
                        if (resp) {
                            loader = resp;
                        }
                    }

                // Data loader is likely a promise
                if (_.isObject(loader)) {
                    standardizePromise(loader).then(complete).catch(reject);
                } else {
                    error(new Error('Invalid data loader.'));
                }
            });

            // Copy to event listeners
            promise.catch(function (err) {
                _this3.emit('data.loaderror', err);
            });

            // Cache to allow access after tree instantiation
            this._loader = {
                promise: promise
            };

            return promise;
        }

        /**
         * Query for all loading nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'loading',
        value: function loading() {
            return _map(this, 'loading', arguments);
        }

        /**
         * Loads additional nodes for the root context.
         *
         * @category Tree
         * @param {Event} event Click or scroll event if DOM interaction triggered this call.
         * @return {Promise} Resolves with request results.
         */

    }, {
        key: 'loadMore',
        value: function loadMore() {
            return _map(this, 'loadMore', arguments);
        }

        /**
         * Creates a new collection after passing every node through iteratee.
         *
         * @category Tree
         * @param {function} iteratee Node iteratee.
         * @return {TreeNodes} New array of node objects.
         */

    }, {
        key: 'map',
        value: function map$$1() {
            return _map(this, 'map', arguments);
        }

        /**
         * Query for all nodes matched in the last search.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'matched',
        value: function matched() {
            return _map(this, 'matched', arguments);
        }

        /**
         * Moves the node at a given index to a new index.
         *
         * @category Tree
         * @param {int} index Current index.
         * @param {int} newIndex New index.
         * @param {TreeNodes} target Target TreeNodes array. Defaults to this.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'move',
        value: function move() {
            return _map(this, 'move', arguments);
        }

        /*
         * Pause events.
         *
         * @category Tree
         * @param {array} events Event names to mute.
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'mute',
        value: function mute(events) {
            if (_.isString(events) || _.isArray(events)) {
                this._muted = _.castArray(events);
            } else {
                this._muted = true;
            }

            return this;
        }

        /**
         * Get current mute settings.
         *
         * @category Tree
         * @return {boolean|array} Muted events. If all, true.
         */

    }, {
        key: 'muted',
        value: function muted() {
            return this._muted;
        }

        /**
         * Get a node.
         *
         * @category Tree
         * @param {string|number} id ID of node.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'node',
        value: function node() {
            return _map(this, 'node', arguments);
        }

        /**
         * Get all nodes in a tree, or nodes for an array of IDs.
         *
         * @category Tree
         * @param {array} refs Array of ID references.
         * @return {TreeNodes} Array of node objects.
         * @example
         *
         * let all = tree.nodes()
         * let some = tree.nodes([1, 2, 3])
         */

    }, {
        key: 'nodes',
        value: function nodes() {
            return _map(this, 'nodes', arguments);
        }

        /**
         * Get the root TreeNodes pagination.
         *
         * @category Tree
         * @return {object} Pagination configuration object.
         */

    }, {
        key: 'pagination',
        value: function pagination() {
            return _map(this, 'pagination', arguments);
        }

        /**
         * Pops the last node off the root collection.
         *
         * @category Tree
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'pop',
        value: function pop() {
            return _map(this, 'pop', arguments);
        }

        /**
         * Adds a TreeNode to the end of the root collection.
         *
         * @category Tree
         * @param {TreeNode} node Node object.
         * @return {int} The new length
         */

    }, {
        key: 'push',
        value: function push() {
            return _map(this, 'push', arguments);
        }

        /**
         * Base recursion function for a collection or node.
         *
         * Returns false if execution should cease.
         *
         * @private
         * @param {function} iteratee Iteratee function
         * @return {TreeNodes} Resulting nodes.
         */

    }, {
        key: 'recurseDown',
        value: function recurseDown() {
            return _map(this, 'recurseDown', arguments);
        }

        /**
         * Reduces root nodes.
         *
         * @category Tree
         * @param {function} iteratee Iteratee function
         * @return {any} Resulting data.
         */

    }, {
        key: 'reduce',
        value: function reduce() {
            return _map(this, 'reduce', arguments);
        }

        /**
         * Right-reduces root nodes.
         *
         * @category Tree
         * @param {function} iteratee Iteratee function
         * @return {any} Resulting data.
         */

    }, {
        key: 'reduceRight',
        value: function reduceRight() {
            return _map(this, 'reduceRight', arguments);
        }

        /**
         * Reloads/re-executes the original data loader.
         *
         * @category Tree
         * @return {Promise} Load method promise.
         */

    }, {
        key: 'reload',
        value: function reload() {
            this.removeAll();

            return this.load(this.opts.data || this.config.data);
        }

        /**
         * Removes a direct descendant node.
         *
         * @category Tree
         * @param {TreeNode} node Node object.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'remove',
        value: function remove$$1() {
            return _map(this, 'remove', arguments);
        }

        /**
         * Removes all nodes.
         *
         * @category Tree
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'removeAll',
        value: function removeAll() {
            this.model = new TreeNodes(this);
            this.applyChanges();

            return this;
        }

        /**
         * Query for all soft-removed nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'removed',
        value: function removed() {
            return _map(this, 'removed', arguments);
        }

        /**
         * Restore children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'restore',
        value: function restore() {
            return _map(this, 'restore', arguments);
        }

        /**
         * Restore all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'restoreDeep',
        value: function restoreDeep() {
            return _map(this, 'restoreDeep', arguments);
        }

        /**
         * Reduces root nodes.
         *
         * @category Tree
         * @return {TreeNodes} Reversed array of node objects.
         */

    }, {
        key: 'reverse',
        value: function reverse() {
            return _map(this, 'reverse', arguments);
        }

        /**
         * Search nodes, showing only those that match and the necessary hierarchy.
         *
         * @category Tree
         * @param {*} query Search string, RegExp, or function.
         * @return {TreeNodes} Array of matching node objects.
         */

    }, {
        key: 'search',
        value: function search(query) {
            var _this4 = this;

            var _config$search = this.config.search,
                matcher = _config$search.matcher,
                matchProcessor = _config$search.matchProcessor;

            // Don't search if query empty

            if (!query || _.isString(query) && _.isEmpty(query)) {
                return es6Promise_1.resolve(this.clearSearch());
            }

            this.batch();

            // Reset states
            this.recurseDown(function (node) {
                node.state('hidden', true);
                node.state('matched', false);
            });

            this.end();

            // Query nodes for any matching the query
            matcher = _.isFunction(matcher) ? matcher : function (query, resolve) {
                var matches = new TreeNodes(_this4);

                // Convery the query into a usable predicate
                if (_.isString(query)) {
                    query = new RegExp(query, 'i');
                }

                var predicate = void 0;
                if (_.isRegExp(query)) {
                    predicate = function predicate(node) {
                        return query.test(node.text);
                    };
                } else {
                    predicate = query;
                }

                // Recurse down and find all matches
                _this4.model.recurseDown(function (node) {
                    if (!node.removed()) {
                        if (predicate(node)) {
                            // Return as a match
                            matches.push(node);
                        }
                    }
                });

                resolve(matches);
            };

            // Process all matching nodes.
            matchProcessor = _.isFunction(matchProcessor) ? matchProcessor : function (matches) {
                matches.each(function (node) {
                    node.show().state('matched', true);

                    node.expandParents().collapse();

                    if (node.hasChildren()) {
                        node.children.showDeep();
                    }
                });
            };

            // Wrap the search matcher with a promise since it could require async requests
            return new es6Promise_1(function (resolve, reject) {
                // Execute the matcher and pipe results to the processor
                matcher(query, function (matches) {
                    // Convert to a TreeNodes array if we're receiving external nodes
                    if (!InspireTree.isTreeNodes(matches)) {
                        matches = _this4.nodes(_.map(matches, 'id'));
                    }

                    _this4.batch();

                    matchProcessor(matches);

                    _this4.end();

                    resolve(matches);
                }, reject);
            });
        }

        /**
         * Select children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'select',
        value: function select() {
            return _map(this, 'select', arguments);
        }

        /**
         * Query for all selectable nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selectable',
        value: function selectable() {
            return _map(this, 'selectable', arguments);
        }

        /**
         * Select all nodes between a start and end node.
         * Starting node must have a higher index path so we can work down to endNode.
         *
         * @category Tree
         * @param {TreeNode} startNode Starting node
         * @param {TreeNode} endNode Ending node
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'selectBetween',
        value: function selectBetween(startNode, endNode) {
            this.batch();

            var node = startNode.nextVisibleNode();
            while (node.id !== endNode.id) {
                node.select();

                node = node.nextVisibleNode();
            }

            this.end();

            return this;
        }
    }, {
        key: 'selectDeep',


        /**
         * Select all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */
        value: function selectDeep() {
            return _map(this, 'selectDeep', arguments);
        }

        /**
         * Query for all selected nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selected',
        value: function selected() {
            return _map(this, 'selected', arguments);
        }

        /**
         * Select the first available node at the root level.
         *
         * @category Tree
         * @return {TreeNode} Selected node object.
         */

    }, {
        key: 'selectFirstAvailableNode',
        value: function selectFirstAvailableNode() {
            var node = this.model.filterBy('available').get(0);
            if (node) {
                node.select();
            }

            return node;
        }
    }, {
        key: 'shift',


        /**
         * Shifts the first node off the root collection.
         *
         * @category Tree
         * @return {TreeNode} Node object.
         */
        value: function shift() {
            return _map(this, 'shift', arguments);
        }

        /**
         * Show children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'show',
        value: function show() {
            return _map(this, 'show', arguments);
        }

        /**
         * Show all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'showDeep',
        value: function showDeep() {
            return _map(this, 'showDeep', arguments);
        }

        /**
         * Returns a shallow copy of a portion of root nodes into a new array
         * object selected from begin to end (end not included)
         *
         * @category Tree
         * @param {int} begin Starting index.
         * @param {int} end End index.
         * @return {Array} Array of selected subset.
         */

    }, {
        key: 'slice',
        value: function slice$$1() {
            return _map(this, 'slice', arguments);
        }

        /**
         * Soft-remove children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'softRemove',
        value: function softRemove() {
            return _map(this, 'softRemove', arguments);
        }

        /**
         * Returns whether at least one root node passes the given test.
         *
         * @category Tree
         * @param {function} tester Test each node in this collection,
         * @return {boolean} True if at least one node passes the test.
         */

    }, {
        key: 'some',
        value: function some() {
            return _map(this, 'some', arguments);
        }

        /**
         * Sorts root nodes in-place.
         *
         * @category Tree
         * @param {function} compareFn Comparison function.
         * @return {TreeNodes} Root array of node objects.
         */

    }, {
        key: 'sort',
        value: function sort() {
            return _map(this, 'sort', arguments);
        }

        /**
         * Sorts all TreeNode objects in this collection.
         *
         * If no custom sorter given, the configured "sort" value will be used.
         *
         * @category Tree
         * @param {string|function} sorter Sort function or property name.
         * @return {TreeNodes} Array of node obejcts.
         */

    }, {
        key: 'sortBy',
        value: function sortBy$$1() {
            return _map(this, 'sortBy', arguments);
        }

        /**
         * Removes and adds new TreeNodes into the root collection.
         *
         * @category Tree
         * @param {int} start Starting index.
         * @param {int} deleteCount Count of nodes to delete.
         * @param {TreeNode} node Node(s) to insert.
         * @return {Array} Array of selected subset.
         */

    }, {
        key: 'splice',
        value: function splice() {
            return _map(this, 'slice', arguments);
        }

        /**
         * Set state values for nodes in this collection.
         *
         * @category Tree
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'state',
        value: function state() {
            return _map(this, 'state', arguments);
        }

        /**
         * Set state values for nodes in this collection.
         *
         * @category Tree
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'stateDeep',
        value: function stateDeep() {
            return _map(this, 'stateDeep', arguments);
        }

        /**
         * Swaps two node positions.
         *
         * @category Tree
         * @param {TreeNode} node1 Node 1.
         * @param {TreeNode} node2 Node 2.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'swap',
        value: function swap() {
            return _map(this, 'swap', arguments);
        }

        /**
         * Returns a native Array of nodes.
         *
         * @category Tree
         * @return {array} Array of node objects.
         */

    }, {
        key: 'toArray',
        value: function toArray$$1() {
            return _map(this, 'toArray', arguments);
        }

        /**
         * Returns a string from root node objects.
         *
         * @category Tree
         * @return {string} Strings from root node objects.
         */

    }, {
        key: 'toString',
        value: function toString() {
            return _map(this, 'toString', arguments);
        }

        /**
         * Resume events.
         *
         * @category Tree
         * @param {array} events Events to unmute.
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'unmute',
        value: function unmute(events) {
            // Diff array and set to false if we're now empty
            if (_.isString(events) || _.isArray(events)) {
                this._muted = _.difference(this._muted, _.castArray(events));
                if (!this._muted.length) {
                    this._muted = false;
                }
            } else {
                this._muted = false;
            }

            return this;
        }
    }, {
        key: 'unshift',


        /**
         * Adds a TreeNode to the start of the root collection.
         *
         * @category Tree
         * @return {number} The new length
         */
        value: function unshift() {
            return _map(this, 'unshift', arguments);
        }

        /**
         * Query for all visible nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'visible',
        value: function visible() {
            return _map(this, 'visible', arguments);
        }
    }], [{
        key: 'isTreeNode',
        value: function isTreeNode(obj) {
            return obj instanceof TreeNode;
        }

        /**
         * Check if an object is a TreeNodes array.
         *
         * @category Tree
         * @param {object} obj Object
         * @return {boolean} If object is a TreeNodes array.
         */

    }, {
        key: 'isTreeNodes',
        value: function isTreeNodes(obj) {
            return obj instanceof TreeNodes;
        }
    }]);
    return InspireTree;
}(eventemitter2_1);

return InspireTree;

})));
