/**
 * html2pdf.js v0.9.0
 * Copyright (c) 2018 Erik Koopmans
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.html2pdf = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
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
}(commonjsGlobal, (function () { function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
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

var isArray = _isArray;

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

  var child = new this.constructor(noop);

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

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

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
    } else if (isFunction(then$$1)) {
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
  var hasCallback = isFunction(callback),
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
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
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
      var promise = new c(noop);
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

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
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
  var promise = new Constructor(noop);
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

  if (noop !== resolver) {
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

var auto = es6Promise.polyfill();

var jspdf_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,function(){var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e=(function(e){function n(t){var n={};this.subscribe=function(t,e,r){if("function"!=typeof e)return!1;n.hasOwnProperty(t)||(n[t]={});var i=Math.random().toString(35);return n[t][i]=[e,!!r], i}, this.unsubscribe=function(t){for(var e in n)if(n[e][t])return delete n[e][t], !0;return!1}, this.publish=function(r){if(n.hasOwnProperty(r)){var i=Array.prototype.slice.call(arguments,1),o=[];for(var a in n[r]){var s=n[r][a];try{s[0].apply(t,i);}catch(t){e.console&&console.error("jsPDF PubSub Error",t.message,t);}s[1]&&o.push(a);}o.length&&o.forEach(this.unsubscribe);}};}function i(c,l,u,h){var f={};"object"===(void 0===c?"undefined":t(c))&&(c=(f=c).orientation, l=f.unit||l, u=f.format||u, h=f.compress||f.compressPdf||h), l=l||"mm", u=u||"a4", c=(""+(c||"P")).toLowerCase();(""+u).toLowerCase();var d,p,m,g,w,y,v,b,x,k=!!h&&"function"==typeof Uint8Array,_=f.textColor||"0 g",C=f.drawColor||"0 G",A=f.fontSize||16,S=f.lineHeight||1.15,q=f.lineWidth||.200025,T=2,P=!1,I=[],E={},O={},F=0,B=[],R=[],D=[],j=[],z=[],N=0,L=0,M=0,U={title:"",subject:"",author:"",keywords:"",creator:""},H={},W=new n(H),X=f.hotfixes||[],V=function(t){return t.toFixed(2)},G=function(t){return t.toFixed(3)},Y=function(t){return("0"+parseInt(t)).slice(-2)},J=function(t){P?B[g].push(t):(M+=t.length+1, j.push(t));},Q=function(){return T++, I[T]=M, J(T+" 0 obj"), T},K=function(t){J("stream"), J(t), J("endstream");},$=function(){var t,n,r,a,s,c,l,u,h,f=[];for(l=e.adler32cs||i.adler32cs, k&&void 0===l&&(k=!1), t=1;t<=F;t++){if(f.push(Q()), u=(w=D[t].width)*p, h=(y=D[t].height)*p, J("<</Type /Page"), J("/Parent 1 0 R"), J("/Resources 2 0 R"), J("/MediaBox [0 0 "+V(u)+" "+V(h)+"]"), W.publish("putPage",{pageNumber:t,page:B[t]}), J("/Contents "+(T+1)+" 0 R"), J(">>"), J("endobj"), n=B[t].join("\n"), Q(), k){for(r=[], a=n.length;a--;)r[a]=n.charCodeAt(a);c=l.from(n), (s=new o(6)).append(new Uint8Array(r)), n=s.flush(), (r=new Uint8Array(n.length+6)).set(new Uint8Array([120,156])), r.set(n,2), r.set(new Uint8Array([255&c,c>>8&255,c>>16&255,c>>24&255]),n.length+2), n=String.fromCharCode.apply(null,r), J("<</Length "+n.length+" /Filter [/FlateDecode]>>");}else J("<</Length "+n.length+">>");K(n), J("endobj");}I[1]=M, J("1 0 obj"), J("<</Type /Pages");var d="/Kids [";for(a=0;a<F;a++)d+=f[a]+" 0 R ";J(d+"]"), J("/Count "+F), J(">>"), J("endobj"), W.publish("postPutPages");},Z=function(t){t.objectNumber=Q(), J("<</BaseFont/"+t.PostScriptName+"/Type/Font"), "string"==typeof t.encoding&&J("/Encoding/"+t.encoding), J("/Subtype/Type1>>"), J("endobj");},tt=function(){for(var t in E)E.hasOwnProperty(t)&&Z(E[t]);},et=function(){W.publish("putXobjectDict");},nt=function(){J("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"), J("/Font <<");for(var t in E)E.hasOwnProperty(t)&&J("/"+t+" "+E[t].objectNumber+" 0 R");J(">>"), J("/XObject <<"), et(), J(">>");},rt=function(){tt(), W.publish("putResources"), I[2]=M, J("2 0 obj"), J("<<"), nt(), J(">>"), J("endobj"), W.publish("postPutResources");},it=function(){W.publish("putAdditionalObjects");for(var t=0;t<z.length;t++){var e=z[t];I[e.objId]=M, J(e.objId+" 0 obj"), J(e.content), J("endobj");}T+=z.length, W.publish("postPutAdditionalObjects");},ot=function(t,e,n){O.hasOwnProperty(e)||(O[e]={}), O[e][n]=t;},at=function(t,e,n,r){var i="F"+(Object.keys(E).length+1).toString(10),o=E[i]={id:i,PostScriptName:t,fontName:e,fontStyle:n,encoding:r,metadata:{}};return ot(i,e,n), W.publish("addFont",o), i},st=function(t,e){var n,r,i,o,a,s,c,l,u;if(e=e||{}, i=e.sourceEncoding||"Unicode", a=e.outputEncoding, (e.autoencode||a)&&E[d].metadata&&E[d].metadata[i]&&E[d].metadata[i].encoding&&(o=E[d].metadata[i].encoding, !a&&E[d].encoding&&(a=E[d].encoding), !a&&o.codePages&&(a=o.codePages[0]), "string"==typeof a&&(a=o[a]), a)){for(c=!1, s=[], n=0, r=t.length;n<r;n++)(l=a[t.charCodeAt(n)])?s.push(String.fromCharCode(l)):s.push(t[n]), s[n].charCodeAt(0)>>8&&(c=!0);t=s.join("");}for(n=t.length;void 0===c&&0!==n;)t.charCodeAt(n-1)>>8&&(c=!0), n--;if(!c)return t;for(s=e.noBOM?[]:[254,255], n=0, r=t.length;n<r;n++){if(l=t.charCodeAt(n), (u=l>>8)>>8)throw new Error("Character at position "+n+" of string '"+t+"' exceeds 16bits. Cannot be encoded into UCS-2 BE");s.push(u), s.push(l-(u<<8));}return String.fromCharCode.apply(void 0,s)},ct=function(t,e){return st(t,e).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},lt=function(){J("/Producer (jsPDF "+i.version+")");for(var t in U)U.hasOwnProperty(t)&&U[t]&&J("/"+t.substr(0,1).toUpperCase()+t.substr(1)+" ("+ct(U[t])+")");var e=new Date,n=e.getTimezoneOffset(),r=n<0?"+":"-",o=Math.floor(Math.abs(n/60)),a=Math.abs(n%60),s=[r,Y(o),"'",Y(a),"'"].join("");J(["/CreationDate (D:",e.getFullYear(),Y(e.getMonth()+1),Y(e.getDate()),Y(e.getHours()),Y(e.getMinutes()),Y(e.getSeconds()),s,")"].join(""));},ut=function(){switch(J("/Type /Catalog"), J("/Pages 1 0 R"), b||(b="fullwidth"), b){case"fullwidth":J("/OpenAction [3 0 R /FitH null]");break;case"fullheight":J("/OpenAction [3 0 R /FitV null]");break;case"fullpage":J("/OpenAction [3 0 R /Fit]");break;case"original":J("/OpenAction [3 0 R /XYZ null null 1]");break;default:var t=""+b;"%"===t.substr(t.length-1)&&(b=parseInt(b)/100), "number"==typeof b&&J("/OpenAction [3 0 R /XYZ null null "+V(b)+"]");}switch(x||(x="continuous"), x){case"continuous":J("/PageLayout /OneColumn");break;case"single":J("/PageLayout /SinglePage");break;case"two":case"twoleft":J("/PageLayout /TwoColumnLeft");break;case"tworight":J("/PageLayout /TwoColumnRight");}v&&J("/PageMode /"+v), W.publish("putCatalog");},ht=function(){J("/Size "+(T+1)), J("/Root "+T+" 0 R"), J("/Info "+(T-1)+" 0 R");},ft=function(t,e){var n="string"==typeof e&&e.toLowerCase();if("string"==typeof t){var r=t.toLowerCase();s.hasOwnProperty(r)&&(t=s[r][0]/p, e=s[r][1]/p);}if(Array.isArray(t)&&(e=t[1], t=t[0]), n){switch(n.substr(0,1)){case"l":e>t&&(n="s");break;case"p":t>e&&(n="s");}"s"===n&&(m=t, t=e, e=m);}P=!0, B[++F]=[], D[F]={width:Number(t)||w,height:Number(e)||y}, R[F]={}, mt(F);},dt=function(){ft.apply(this,arguments), J(V(q*p)+" w"), J(C), 0!==N&&J(N+" J"), 0!==L&&J(L+" j"), W.publish("addPage",{pageNumber:F});},pt=function(t){t>0&&t<=F&&(B.splice(t,1), D.splice(t,1), g>--F&&(g=F), this.setPage(g));},mt=function(t){t>0&&t<=F&&(g=t, w=D[t].width, y=D[t].height);},gt=function(t,e){var n;switch(t=void 0!==t?t:E[d].fontName, e=void 0!==e?e:E[d].fontStyle, void 0!==t&&(t=t.toLowerCase()), t){case"sans-serif":case"verdana":case"arial":case"helvetica":t="helvetica";break;case"fixed":case"monospace":case"terminal":case"courier":t="courier";break;case"serif":case"cursive":case"fantasy":default:t="times";}try{n=O[t][e];}catch(t){}return n||null==(n=O.times[e])&&(n=O.times.normal), n},wt=function(){P=!1, T=2, M=0, j=[], I=[], z=[], W.publish("buildDocument"), J("%PDF-"+a), $(), it(), rt(), Q(), J("<<"), lt(), J(">>"), J("endobj"), Q(), J("<<"), ut(), J(">>"), J("endobj");var t,e=M,n="0000000000";for(J("xref"), J("0 "+(T+1)), J(n+" 65535 f "), t=1;t<=T;t++){var r=I[t];J("function"==typeof r?(n+I[t]()).slice(-10)+" 00000 n ":(n+I[t]).slice(-10)+" 00000 n ");}return J("trailer"), J("<<"), ht(), J(">>"), J("startxref"), J(""+e), J("%%EOF"), P=!0, j.join("\n")},yt=function(t){var e="S";return"F"===t?e="f":"FD"===t||"DF"===t?e="B":"f"!==t&&"f*"!==t&&"B"!==t&&"B*"!==t||(e=t), e},vt=function(){for(var t=wt(),e=t.length,n=new ArrayBuffer(e),r=new Uint8Array(n);e--;)r[e]=t.charCodeAt(e);return n},bt=function(){return new Blob([vt()],{type:"application/pdf"})},xt=function(t){return t.foo=function(){try{return t.apply(this,arguments)}catch(t){var n=t.stack||"";~n.indexOf(" at ")&&(n=n.split(" at ")[1]);var r="Error in function "+n.split("\n")[0].split("<")[0]+": "+t.message;if(!e.console)throw new Error(r);e.console.error(r,t), e.alert&&alert(r);}}, t.foo.bar=t, t.foo}(function(t,n){var i="dataur"===(""+t).substr(0,6)?"data:application/pdf;base64,"+btoa(wt()):0;switch(t){case void 0:return wt();case"save":if(navigator.getUserMedia&&(void 0===e.URL||void 0===e.URL.createObjectURL))return H.output("dataurlnewwindow");r(bt(),n), "function"==typeof r.unload&&e.setTimeout&&setTimeout(r.unload,911);break;case"arraybuffer":return vt();case"blob":return bt();case"bloburi":case"bloburl":return e.URL&&e.URL.createObjectURL(bt())||void 0;case"datauristring":case"dataurlstring":return i;case"dataurlnewwindow":var o=e.open(i);if(o||"undefined"==typeof safari)return o;case"datauri":case"dataurl":return e.document.location.href=i;default:throw new Error('Output type "'+t+'" is not supported.')}}),kt=function(t){return!0===Array.isArray(X)&&X.indexOf(t)>-1};switch(l){case"pt":p=1;break;case"mm":p=72/25.4000508;break;case"cm":p=72/2.54000508;break;case"in":p=72;break;case"px":p=1==kt("px_scaling")?.75:96/72;break;case"pc":case"em":p=12;break;case"ex":p=6;break;default:throw"Invalid unit: "+l}H.internal={pdfEscape:ct,getStyle:yt,getFont:function(){return E[gt.apply(H,arguments)]},getFontSize:function(){return A},getLineHeight:function(){return A*S},write:function(t){J(1===arguments.length?t:Array.prototype.join.call(arguments," "));},getCoordinateString:function(t){return V(t*p)},getVerticalCoordinateString:function(t){return V((y-t)*p)},collections:{},newObject:Q,newAdditionalObject:function(){var t=2*B.length+1,e={objId:t+=z.length,content:""};return z.push(e), e},newObjectDeferred:function(){return T++, I[T]=function(){return M}, T},newObjectDeferredBegin:function(t){I[t]=M;},putStream:K,events:W,scaleFactor:p,pageSize:{get width(){return w},get height(){return y}},output:function(t,e){return xt(t,e)},getNumberOfPages:function(){return B.length-1},pages:B,out:J,f2:V,getPageInfo:function(t){return{objId:2*(t-1)+3,pageNumber:t,pageContext:R[t]}},getCurrentPageInfo:function(){return{objId:2*(g-1)+3,pageNumber:g,pageContext:R[g]}},getPDFVersion:function(){return a},hasHotfix:kt}, H.addPage=function(){return dt.apply(this,arguments), this}, H.setPage=function(){return mt.apply(this,arguments), this}, H.insertPage=function(t){return this.addPage(), this.movePage(g,t), this}, H.movePage=function(t,e){if(t>e){for(var n=B[t],r=D[t],i=R[t],o=t;o>e;o--)B[o]=B[o-1], D[o]=D[o-1], R[o]=R[o-1];B[e]=n, D[e]=r, R[e]=i, this.setPage(e);}else if(t<e){for(var n=B[t],r=D[t],i=R[t],o=t;o<e;o++)B[o]=B[o+1], D[o]=D[o+1], R[o]=R[o+1];B[e]=n, D[e]=r, R[e]=i, this.setPage(e);}return this}, H.deletePage=function(){return pt.apply(this,arguments), this}, H.setDisplayMode=function(t,e,n){if(b=t, x=e, v=n, -1==[void 0,null,"UseNone","UseOutlines","UseThumbs","FullScreen"].indexOf(n))throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "'+n+'" is not recognized.');return this}, H.text=function(t,e,n,r,i,o){function a(t){return t=t.split("\t").join(Array(f.TabLen||9).join(" ")), ct(t,r)}"number"==typeof t&&(m=n, n=e, e=t, t=m), "string"==typeof t&&(t=t.match(/[\n\r]/)?t.split(/\r\n|\r|\n/g):[t]), "string"==typeof i&&(o=i, i=null), "string"==typeof r&&(o=r, r=null), "number"==typeof r&&(i=r, r=null);var s="",c="Td";if(i){i*=Math.PI/180;var l=Math.cos(i),u=Math.sin(i);s=[V(l),V(u),V(-1*u),V(l),""].join(" "), c="Tm";}"noBOM"in(r=r||{})||(r.noBOM=!0), "autoencode"in r||(r.autoencode=!0);var h="",g=this.internal.getCurrentPageInfo().pageContext;if(!0===r.stroke?!0!==g.lastTextWasStroke&&(h="1 Tr\n", g.lastTextWasStroke=!0):(g.lastTextWasStroke&&(h="0 Tr\n"), g.lastTextWasStroke=!1), void 0===this._runningPageHeight&&(this._runningPageHeight=0), "string"==typeof t)t=a(t);else{if("[object Array]"!==Object.prototype.toString.call(t))throw new Error('Type of text must be string or Array. "'+t+'" is not recognized.');for(var w=t.concat(),v=[],b=w.length;b--;)v.push(a(w.shift()));if(o){var x,k,C,q=A*S,T=t.map(function(t){return this.getStringUnitWidth(t)*A/p},this);if(C=Math.max.apply(Math,T), "center"===o)x=e-C/2, e-=T[0]/2;else{if("right"!==o)throw new Error('Unrecognized alignment option, use "center" or "right".');x=e-C, e-=T[0];}k=e, t=v[0];for(var P=1,b=v.length;P<b;P++){var I=C-T[P];"center"===o&&(I/=2), t+=") Tj\n"+(x-k+I)+" -"+q+" Td ("+v[P], k=x+I;}}else t=v.join(") Tj\nT* (");}var E;return E=V((y-n)*p), J("BT\n/"+d+" "+A+" Tf\n"+A*S+" TL\n"+h+_+"\n"+s+V(e*p)+" "+E+" "+c+"\n("+t+") Tj\nET"), this}, H.lstext=function(t,e,n,r){console.warn("jsPDF.lstext is deprecated");for(var i=0,o=t.length;i<o;i++, e+=r)this.text(t[i],e,n);return this}, H.line=function(t,e,n,r){return this.lines([[n-t,r-e]],t,e)}, H.clip=function(){J("W"), J("S");}, H.clip_fixed=function(t){J("evenodd"===t?"W*":"W"), J("n");}, H.lines=function(t,e,n,r,i,o){var a,s,c,l,u,h,f,d,g,w,v;for("number"==typeof t&&(m=n, n=e, e=t, t=m), r=r||[1,1], J(G(e*p)+" "+G((y-n)*p)+" m "), a=r[0], s=r[1], l=t.length, w=e, v=n, c=0;c<l;c++)2===(u=t[c]).length?(w=u[0]*a+w, v=u[1]*s+v, J(G(w*p)+" "+G((y-v)*p)+" l")):(h=u[0]*a+w, f=u[1]*s+v, d=u[2]*a+w, g=u[3]*s+v, w=u[4]*a+w, v=u[5]*s+v, J(G(h*p)+" "+G((y-f)*p)+" "+G(d*p)+" "+G((y-g)*p)+" "+G(w*p)+" "+G((y-v)*p)+" c"));return o&&J(" h"), null!==i&&J(yt(i)), this}, H.rect=function(t,e,n,r,i){yt(i);return J([V(t*p),V((y-e)*p),V(n*p),V(-r*p),"re"].join(" ")), null!==i&&J(yt(i)), this}, H.triangle=function(t,e,n,r,i,o,a){return this.lines([[n-t,r-e],[i-n,o-r],[t-i,e-o]],t,e,[1,1],a,!0), this}, H.roundedRect=function(t,e,n,r,i,o,a){var s=4/3*(Math.SQRT2-1);return this.lines([[n-2*i,0],[i*s,0,i,o-o*s,i,o],[0,r-2*o],[0,o*s,-i*s,o,-i,o],[2*i-n,0],[-i*s,0,-i,-o*s,-i,-o],[0,2*o-r],[0,-o*s,i*s,-o,i,-o]],t+i,e,[1,1],a), this}, H.ellipse=function(t,e,n,r,i){var o=4/3*(Math.SQRT2-1)*n,a=4/3*(Math.SQRT2-1)*r;return J([V((t+n)*p),V((y-e)*p),"m",V((t+n)*p),V((y-(e-a))*p),V((t+o)*p),V((y-(e-r))*p),V(t*p),V((y-(e-r))*p),"c"].join(" ")), J([V((t-o)*p),V((y-(e-r))*p),V((t-n)*p),V((y-(e-a))*p),V((t-n)*p),V((y-e)*p),"c"].join(" ")), J([V((t-n)*p),V((y-(e+a))*p),V((t-o)*p),V((y-(e+r))*p),V(t*p),V((y-(e+r))*p),"c"].join(" ")), J([V((t+o)*p),V((y-(e+r))*p),V((t+n)*p),V((y-(e+a))*p),V((t+n)*p),V((y-e)*p),"c"].join(" ")), null!==i&&J(yt(i)), this}, H.circle=function(t,e,n,r){return this.ellipse(t,e,n,n,r)}, H.setProperties=function(t){for(var e in U)U.hasOwnProperty(e)&&t[e]&&(U[e]=t[e]);return this}, H.setFontSize=function(t){return A=t, this}, H.setFont=function(t,e){return d=gt(t,e), this}, H.setFontStyle=H.setFontType=function(t){return d=gt(void 0,t), this}, H.getFontList=function(){var t,e,n,r={};for(t in O)if(O.hasOwnProperty(t)){r[t]=n=[];for(e in O[t])O[t].hasOwnProperty(e)&&n.push(e);}return r}, H.addFont=function(t,e,n){at(t,e,n,"StandardEncoding");}, H.setLineWidth=function(t){return J((t*p).toFixed(2)+" w"), this}, H.setDrawColor=function(t,e,n,r){var i;return i=void 0===e||void 0===r&&t===e===n?"string"==typeof t?t+" G":V(t/255)+" G":void 0===r?"string"==typeof t?[t,e,n,"RG"].join(" "):[V(t/255),V(e/255),V(n/255),"RG"].join(" "):"string"==typeof t?[t,e,n,r,"K"].join(" "):[V(t),V(e),V(n),V(r),"K"].join(" "), J(i), this}, H.setFillColor=function(e,n,r,i){var o;return void 0===n||void 0===i&&e===n===r?o="string"==typeof e?e+" g":V(e/255)+" g":void 0===i||"object"===(void 0===i?"undefined":t(i))?(o="string"==typeof e?[e,n,r,"rg"].join(" "):[V(e/255),V(n/255),V(r/255),"rg"].join(" "), i&&0===i.a&&(o=["255","255","255","rg"].join(" "))):o="string"==typeof e?[e,n,r,i,"k"].join(" "):[V(e),V(n),V(r),V(i),"k"].join(" "), J(o), this}, H.setTextColor=function(t,e,n){if("string"==typeof t&&/^#[0-9A-Fa-f]{6}$/.test(t)){var r=parseInt(t.substr(1),16);t=r>>16&255, e=r>>8&255, n=255&r;}return _=0===t&&0===e&&0===n||void 0===e?G(t/255)+" g":[G(t/255),G(e/255),G(n/255),"rg"].join(" "), this}, H.CapJoinStyles={0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2}, H.setLineCap=function(t){var e=this.CapJoinStyles[t];if(void 0===e)throw new Error("Line cap style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return N=e, J(e+" J"), this}, H.setLineJoin=function(t){var e=this.CapJoinStyles[t];if(void 0===e)throw new Error("Line join style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return L=e, J(e+" j"), this}, H.output=xt, H.save=function(t){H.output("save",t);};for(var _t in i.API)i.API.hasOwnProperty(_t)&&("events"===_t&&i.API.events.length?function(t,e){var n,r,i;for(i=e.length-1;-1!==i;i--)n=e[i][0], r=e[i][1], t.subscribe.apply(t,[n].concat("function"==typeof r?[r]:r));}(W,i.API.events):H[_t]=i.API[_t]);return function(){for(var t=[["Helvetica","helvetica","normal"],["Helvetica-Bold","helvetica","bold"],["Helvetica-Oblique","helvetica","italic"],["Helvetica-BoldOblique","helvetica","bolditalic"],["Courier","courier","normal"],["Courier-Bold","courier","bold"],["Courier-Oblique","courier","italic"],["Courier-BoldOblique","courier","bolditalic"],["Times-Roman","times","normal"],["Times-Bold","times","bold"],["Times-Italic","times","italic"],["Times-BoldItalic","times","bolditalic"],["ZapfDingbats","zapfdingbats"]],e=0,n=t.length;e<n;e++){var r=at(t[e][0],t[e][1],t[e][2],"StandardEncoding"),i=t[e][0].split("-");ot(r,i[0],i[1]||"");}W.publish("addFonts",{fonts:E,dictionary:O});}(), d="F1", dt(u,c), W.publish("initialized"), H}var a="1.3",s={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};return i.API={events:[]}, i.version="1.x-master", "function"==typeof undefined&&undefined.amd?undefined("jsPDF",function(){return i}):"undefined"!='object'&&module.exports?module.exports=i:e.jsPDF=i, i}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||void 0));/**
 * jsPDF AcroForm Plugin
 * Copyright (c) 2016 Alexander Weidt, https://github.com/BiggA94
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
(window.AcroForm=function(t){var n=window.AcroForm;n.scale=function(t){return t*(r.internal.scaleFactor/1)}, n.antiScale=function(t){return 1/r.internal.scaleFactor*t};var r={fields:[],xForms:[],acroFormDictionaryRoot:null,printedOut:!1,internal:null};e.API.acroformPlugin=r;var i=function(){for(var t in this.acroformPlugin.acroFormDictionaryRoot.Fields){var e=this.acroformPlugin.acroFormDictionaryRoot.Fields[t];e.hasAnnotation&&a.call(this,e);}},o=function(){if(this.acroformPlugin.acroFormDictionaryRoot)throw new Error("Exception while creating AcroformDictionary");this.acroformPlugin.acroFormDictionaryRoot=new n.AcroFormDictionary, this.acroformPlugin.internal=this.internal, this.acroformPlugin.acroFormDictionaryRoot._eventID=this.internal.events.subscribe("postPutResources",l), this.internal.events.subscribe("buildDocument",i), this.internal.events.subscribe("putCatalog",c), this.internal.events.subscribe("postPutPages",u);},a=function(t){var n={type:"reference",object:t};e.API.annotationPlugin.annotations[this.internal.getPageInfo(t.page).pageNumber].push(n);},s=function(t){this.acroformPlugin.printedOut&&(this.acroformPlugin.printedOut=!1, this.acroformPlugin.acroFormDictionaryRoot=null), this.acroformPlugin.acroFormDictionaryRoot||o.call(this), this.acroformPlugin.acroFormDictionaryRoot.Fields.push(t);},c=function(){void 0!==this.acroformPlugin.acroFormDictionaryRoot?this.internal.write("/AcroForm "+this.acroformPlugin.acroFormDictionaryRoot.objId+" 0 R"):console.log("Root missing...");},l=function(){this.internal.events.unsubscribe(this.acroformPlugin.acroFormDictionaryRoot._eventID), delete this.acroformPlugin.acroFormDictionaryRoot._eventID, this.acroformPlugin.printedOut=!0;},u=function(t){var e=!t;t||(this.internal.newObjectDeferredBegin(this.acroformPlugin.acroFormDictionaryRoot.objId), this.internal.out(this.acroformPlugin.acroFormDictionaryRoot.getString()));var t=t||this.acroformPlugin.acroFormDictionaryRoot.Kids;for(var r in t){var i=t[r],o=i.Rect;i.Rect&&(i.Rect=n.internal.calculateCoordinates.call(this,i.Rect)), this.internal.newObjectDeferredBegin(i.objId);var a="";if(a+=i.objId+" 0 obj\n", a+="<<\n"+i.getContent(), i.Rect=o, i.hasAppearanceStream&&!i.appearanceStreamContent){var s=n.internal.calculateAppearanceStream.call(this,i);a+="/AP << /N "+s+" >>\n", this.acroformPlugin.xForms.push(s);}if(i.appearanceStreamContent){a+="/AP << ";for(var c in i.appearanceStreamContent){var l=i.appearanceStreamContent[c];if(a+="/"+c+" ", a+="<< ", Object.keys(l).length>=1||Array.isArray(l))for(var r in l)"function"==typeof(u=l[r])&&(u=u.call(this,i)), a+="/"+r+" "+u+" ", this.acroformPlugin.xForms.indexOf(u)>=0||this.acroformPlugin.xForms.push(u);else{var u=l;"function"==typeof u&&(u=u.call(this,i)), a+="/"+r+" "+u+" \n", this.acroformPlugin.xForms.indexOf(u)>=0||this.acroformPlugin.xForms.push(u);}a+=" >>\n";}a+=">>\n";}a+=">>\nendobj\n", this.internal.out(a);}e&&h.call(this,this.acroformPlugin.xForms);},h=function(t){for(var e in t){var n=e,r=t[e];this.internal.newObjectDeferredBegin(r&&r.objId);var i="";i+=r?r.getString():"", this.internal.out(i), delete t[n];}};t.addField=function(t){return t instanceof n.TextField?d.call(this,t):t instanceof n.ChoiceField?p.call(this,t):t instanceof n.Button?f.call(this,t):t instanceof n.ChildClass?s.call(this,t):t&&s.call(this,t), t.page=this.acroformPlugin.internal.getCurrentPageInfo().pageNumber, this};var f=function(t){(t=t||new n.Field).FT="/Btn";var e=t.Ff||0;t.pushbutton&&(e=n.internal.setBitPosition(e,17), delete t.pushbutton), t.radio&&(e=n.internal.setBitPosition(e,16), delete t.radio), t.noToggleToOff&&(e=n.internal.setBitPosition(e,15)), t.Ff=e, s.call(this,t);},d=function(t){(t=t||new n.Field).FT="/Tx";var e=t.Ff||0;t.multiline&&(e|=4096), t.password&&(e|=8192), t.fileSelect&&(e|=1<<20), t.doNotSpellCheck&&(e|=1<<22), t.doNotScroll&&(e|=1<<23), t.Ff=t.Ff||e, s.call(this,t);},p=function(t){var e=t||new n.Field;e.FT="/Ch";var r=e.Ff||0;e.combo&&(r=n.internal.setBitPosition(r,18), delete e.combo), e.edit&&(r=n.internal.setBitPosition(r,19), delete e.edit), e.sort&&(r=n.internal.setBitPosition(r,20), delete e.sort), e.multiSelect&&this.internal.getPDFVersion()>=1.4&&(r=n.internal.setBitPosition(r,22), delete e.multiSelect), e.doNotSpellCheck&&this.internal.getPDFVersion()>=1.4&&(r=n.internal.setBitPosition(r,23), delete e.doNotSpellCheck), e.Ff=r, s.call(this,e);};})(e.API);var n=window.AcroForm;n.internal={}, n.createFormXObject=function(t){var e=new n.FormXObject,r=n.Appearance.internal.getHeight(t)||0,i=n.Appearance.internal.getWidth(t)||0;return e.BBox=[0,0,i,r], e}, n.Appearance={CheckBox:{createAppearanceStream:function(){return{N:{On:n.Appearance.CheckBox.YesNormal},D:{On:n.Appearance.CheckBox.YesPushDown,Off:n.Appearance.CheckBox.OffPushDown}}},createMK:function(){return"<< /CA (3)>>"},YesPushDown:function(t){var e=n.createFormXObject(t),r="";t.Q=1;var i=n.internal.calculateX(t,"3","ZapfDingbats",50);return r+="0.749023 g\n             0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n             f\n             BMC\n             q\n             0 0 1 rg\n             /F13 "+i.fontSize+" Tf 0 g\n             BT\n", r+=i.text, r+="ET\n             Q\n             EMC\n", e.stream=r, e},YesNormal:function(t){var e=n.createFormXObject(t),r="";t.Q=1;var i=n.internal.calculateX(t,"3","ZapfDingbats",.9*n.Appearance.internal.getHeight(t));return r+="1 g\n0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\nf\nq\n0 0 1 rg\n0 0 "+(n.Appearance.internal.getWidth(t)-1)+" "+(n.Appearance.internal.getHeight(t)-1)+" re\nW\nn\n0 g\nBT\n/F13 "+i.fontSize+" Tf 0 g\n", r+=i.text, r+="ET\n             Q\n", e.stream=r, e},OffPushDown:function(t){var e=n.createFormXObject(t),r="";return r+="0.749023 g\n            0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n            f\n", e.stream=r, e}},RadioButton:{Circle:{createAppearanceStream:function(t){var e={D:{Off:n.Appearance.RadioButton.Circle.OffPushDown},N:{}};return e.N[t]=n.Appearance.RadioButton.Circle.YesNormal, e.D[t]=n.Appearance.RadioButton.Circle.YesPushDown, e},createMK:function(){return"<< /CA (l)>>"},YesNormal:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.getWidth(t)<=n.Appearance.internal.getHeight(t)?n.Appearance.internal.getWidth(t)/4:n.Appearance.internal.getHeight(t)/4;i*=.9;var o=n.Appearance.internal.Bezier_C;return r+="q\n1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+i+" 0 m\n"+i+" "+i*o+" "+i*o+" "+i+" 0 "+i+" c\n-"+i*o+" "+i+" -"+i+" "+i*o+" -"+i+" 0 c\n-"+i+" -"+i*o+" -"+i*o+" -"+i+" 0 -"+i+" c\n"+i*o+" -"+i+" "+i+" -"+i*o+" "+i+" 0 c\nf\nQ\n", e.stream=r, e},YesPushDown:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.getWidth(t)<=n.Appearance.internal.getHeight(t)?n.Appearance.internal.getWidth(t)/4:n.Appearance.internal.getHeight(t)/4,o=2*(i*=.9),a=o*n.Appearance.internal.Bezier_C,s=i*n.Appearance.internal.Bezier_C;return r+="0.749023 g\n            q\n           1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+o+" 0 m\n"+o+" "+a+" "+a+" "+o+" 0 "+o+" c\n-"+a+" "+o+" -"+o+" "+a+" -"+o+" 0 c\n-"+o+" -"+a+" -"+a+" -"+o+" 0 -"+o+" c\n"+a+" -"+o+" "+o+" -"+a+" "+o+" 0 c\n            f\n            Q\n            0 g\n            q\n            1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+i+" 0 m\n"+i+" "+s+" "+s+" "+i+" 0 "+i+" c\n-"+s+" "+i+" -"+i+" "+s+" -"+i+" 0 c\n-"+i+" -"+s+" -"+s+" -"+i+" 0 -"+i+" c\n"+s+" -"+i+" "+i+" -"+s+" "+i+" 0 c\n            f\n            Q\n", e.stream=r, e},OffPushDown:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.getWidth(t)<=n.Appearance.internal.getHeight(t)?n.Appearance.internal.getWidth(t)/4:n.Appearance.internal.getHeight(t)/4,o=2*(i*=.9),a=o*n.Appearance.internal.Bezier_C;return r+="0.749023 g\n            q\n 1 0 0 1 "+n.Appearance.internal.getWidth(t)/2+" "+n.Appearance.internal.getHeight(t)/2+" cm\n"+o+" 0 m\n"+o+" "+a+" "+a+" "+o+" 0 "+o+" c\n-"+a+" "+o+" -"+o+" "+a+" -"+o+" 0 c\n-"+o+" -"+a+" -"+a+" -"+o+" 0 -"+o+" c\n"+a+" -"+o+" "+o+" -"+a+" "+o+" 0 c\n            f\n            Q\n", e.stream=r, e}},Cross:{createAppearanceStream:function(t){var e={D:{Off:n.Appearance.RadioButton.Cross.OffPushDown},N:{}};return e.N[t]=n.Appearance.RadioButton.Cross.YesNormal, e.D[t]=n.Appearance.RadioButton.Cross.YesPushDown, e},createMK:function(){return"<< /CA (8)>>"},YesNormal:function(t){var e=n.createFormXObject(t),r="",i=n.Appearance.internal.calculateCross(t);return r+="q\n            1 1 "+(n.Appearance.internal.getWidth(t)-2)+" "+(n.Appearance.internal.getHeight(t)-2)+" re\n            W\n            n\n            "+i.x1.x+" "+i.x1.y+" m\n            "+i.x2.x+" "+i.x2.y+" l\n            "+i.x4.x+" "+i.x4.y+" m\n            "+i.x3.x+" "+i.x3.y+" l\n            s\n            Q\n", e.stream=r, e},YesPushDown:function(t){var e=n.createFormXObject(t),r=n.Appearance.internal.calculateCross(t),i="";return i+="0.749023 g\n            0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n            f\n            q\n            1 1 "+(n.Appearance.internal.getWidth(t)-2)+" "+(n.Appearance.internal.getHeight(t)-2)+" re\n            W\n            n\n            "+r.x1.x+" "+r.x1.y+" m\n            "+r.x2.x+" "+r.x2.y+" l\n            "+r.x4.x+" "+r.x4.y+" m\n            "+r.x3.x+" "+r.x3.y+" l\n            s\n            Q\n", e.stream=i, e},OffPushDown:function(t){var e=n.createFormXObject(t),r="";return r+="0.749023 g\n            0 0 "+n.Appearance.internal.getWidth(t)+" "+n.Appearance.internal.getHeight(t)+" re\n            f\n", e.stream=r, e}}},createDefaultAppearanceStream:function(t){var e="";return e+="/Helv 0 Tf 0 g"}}, n.Appearance.internal={Bezier_C:.551915024494,calculateCross:function(t){var e=n.Appearance.internal.getWidth(t),r=n.Appearance.internal.getHeight(t),i=function(t,e){return t>e?e:t}(e,r);return{x1:{x:(e-i)/2,y:(r-i)/2+i},x2:{x:(e-i)/2+i,y:(r-i)/2},x3:{x:(e-i)/2,y:(r-i)/2},x4:{x:(e-i)/2+i,y:(r-i)/2+i}}}}, n.Appearance.internal.getWidth=function(t){return t.Rect[2]}, n.Appearance.internal.getHeight=function(t){return t.Rect[3]}, n.internal.inherit=function(t,e){t.prototype=Object.create(e.prototype), t.prototype.constructor=t;}, n.internal.arrayToPdfArray=function(t){if(Array.isArray(t)){var e=" [";for(var n in t)e+=t[n].toString(), e+=n<t.length-1?" ":"";return e+="]"}}, n.internal.toPdfString=function(t){return 0!==(t=t||"").indexOf("(")&&(t="("+t), ")"!=t.substring(t.length-1)&&(t+="("), t}, n.PDFObject=function(){var t;Object.defineProperty(this,"objId",{get:function(){return t||(this.internal?t=this.internal.newObjectDeferred():e.API.acroformPlugin.internal&&(t=e.API.acroformPlugin.internal.newObjectDeferred())), t||console.log("Couldn't create Object ID"), t},configurable:!1});}, n.PDFObject.prototype.toString=function(){return this.objId+" 0 R"}, n.PDFObject.prototype.getString=function(){var t=this.objId+" 0 obj\n<<";return t+=this.getContent()+">>\n", this.stream&&(t+="stream\n", t+=this.stream, t+="endstream\n"), t+="endobj\n"}, n.PDFObject.prototype.getContent=function(){var t="";return t+=function(t){var e="",r=Object.keys(t).filter(function(t){return"content"!=t&&"appearanceStreamContent"!=t&&"_"!=t.substring(0,1)});for(var i in r){var o=r[i],a=t[o];a&&(Array.isArray(a)?e+="/"+o+" "+n.internal.arrayToPdfArray(a)+"\n":a instanceof n.PDFObject?e+="/"+o+" "+a.objId+" 0 R\n":e+="/"+o+" "+a+"\n");}return e}(this)}, n.FormXObject=function(){n.PDFObject.call(this), this.Type="/XObject", this.Subtype="/Form", this.FormType=1, this.BBox, this.Matrix, this.Resources="2 0 R", this.PieceInfo;var t;Object.defineProperty(this,"Length",{enumerable:!0,get:function(){return void 0!==t?t.length:0}}), Object.defineProperty(this,"stream",{enumerable:!1,set:function(e){t=e;},get:function(){return t||null}});}, n.internal.inherit(n.FormXObject,n.PDFObject), n.AcroFormDictionary=function(){n.PDFObject.call(this);var t=[];Object.defineProperty(this,"Kids",{enumerable:!1,configurable:!0,get:function(){return t.length>0?t:void 0}}), Object.defineProperty(this,"Fields",{enumerable:!0,configurable:!0,get:function(){return t}}), this.DA;}, n.internal.inherit(n.AcroFormDictionary,n.PDFObject), n.Field=function(){n.PDFObject.call(this);var t;Object.defineProperty(this,"Rect",{enumerable:!0,configurable:!1,get:function(){if(t)return t},set:function(e){t=e;}});var e="";Object.defineProperty(this,"FT",{enumerable:!0,set:function(t){e=t;},get:function(){return e}});var r;Object.defineProperty(this,"T",{enumerable:!0,configurable:!1,set:function(t){r=t;},get:function(){if(!r||r.length<1){if(this instanceof n.ChildClass)return;return"(FieldObject"+n.Field.FieldNum+++")"}return"("==r.substring(0,1)&&r.substring(r.length-1)?r:"("+r+")"}});var i;Object.defineProperty(this,"DA",{enumerable:!0,get:function(){if(i)return"("+i+")"},set:function(t){i=t;}});var o;Object.defineProperty(this,"DV",{enumerable:!0,configurable:!0,get:function(){if(o)return o},set:function(t){o=t;}}), Object.defineProperty(this,"Type",{enumerable:!0,get:function(){return this.hasAnnotation?"/Annot":null}}), Object.defineProperty(this,"Subtype",{enumerable:!0,get:function(){return this.hasAnnotation?"/Widget":null}}), this.BG, Object.defineProperty(this,"hasAnnotation",{enumerable:!1,get:function(){return!!(this.Rect||this.BC||this.BG)}}), Object.defineProperty(this,"hasAppearanceStream",{enumerable:!1,configurable:!0,writable:!0}), Object.defineProperty(this,"page",{enumerable:!1,configurable:!0,writable:!0});}, n.Field.FieldNum=0, n.internal.inherit(n.Field,n.PDFObject), n.ChoiceField=function(){n.Field.call(this), this.FT="/Ch", this.Opt=[], this.V="()", this.TI=0, this.combo=!1, Object.defineProperty(this,"edit",{enumerable:!0,set:function(t){1==t?(this._edit=!0, this.combo=!0):this._edit=!1;},get:function(){return!!this._edit&&this._edit},configurable:!1}), this.hasAppearanceStream=!0, Object.defineProperty(this,"V",{get:function(){n.internal.toPdfString();}});}, n.internal.inherit(n.ChoiceField,n.Field), window.ChoiceField=n.ChoiceField, n.ListBox=function(){n.ChoiceField.call(this);}, n.internal.inherit(n.ListBox,n.ChoiceField), window.ListBox=n.ListBox, n.ComboBox=function(){n.ListBox.call(this), this.combo=!0;}, n.internal.inherit(n.ComboBox,n.ListBox), window.ComboBox=n.ComboBox, n.EditBox=function(){n.ComboBox.call(this), this.edit=!0;}, n.internal.inherit(n.EditBox,n.ComboBox), window.EditBox=n.EditBox, n.Button=function(){n.Field.call(this), this.FT="/Btn";}, n.internal.inherit(n.Button,n.Field), window.Button=n.Button, n.PushButton=function(){n.Button.call(this), this.pushbutton=!0;}, n.internal.inherit(n.PushButton,n.Button), window.PushButton=n.PushButton, n.RadioButton=function(){n.Button.call(this), this.radio=!0;var t=[];Object.defineProperty(this,"Kids",{enumerable:!0,get:function(){if(t.length>0)return t}}), Object.defineProperty(this,"__Kids",{get:function(){return t}});var e;Object.defineProperty(this,"noToggleToOff",{enumerable:!1,get:function(){return e},set:function(t){e=t;}});}, n.internal.inherit(n.RadioButton,n.Button), window.RadioButton=n.RadioButton, n.ChildClass=function(t,e){n.Field.call(this), this.Parent=t, this._AppearanceType=n.Appearance.RadioButton.Circle, this.appearanceStreamContent=this._AppearanceType.createAppearanceStream(e), this.F=n.internal.setBitPosition(this.F,3,1), this.MK=this._AppearanceType.createMK(), this.AS="/Off", this._Name=e;}, n.internal.inherit(n.ChildClass,n.Field), n.RadioButton.prototype.setAppearance=function(t){if("createAppearanceStream"in t&&"createMK"in t)for(var e in this.__Kids){var n=this.__Kids[e];n.appearanceStreamContent=t.createAppearanceStream(n._Name), n.MK=t.createMK();}else console.log("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");}, n.RadioButton.prototype.createOption=function(t){var r=this,i=new n.ChildClass(r,t);return this.__Kids.push(i), e.API.addField(i), i}, n.CheckBox=function(){Button.call(this), this.appearanceStreamContent=n.Appearance.CheckBox.createAppearanceStream(), this.MK=n.Appearance.CheckBox.createMK(), this.AS="/On", this.V="/On";}, n.internal.inherit(n.CheckBox,n.Button), window.CheckBox=n.CheckBox, n.TextField=function(){n.Field.call(this), this.DA=n.Appearance.createDefaultAppearanceStream(), this.F=4;var t;Object.defineProperty(this,"V",{get:function(){return t?"("+t+")":t},enumerable:!0,set:function(e){t=e;}});var e;Object.defineProperty(this,"DV",{get:function(){return e?"("+e+")":e},enumerable:!0,set:function(t){e=t;}});var r=!1;Object.defineProperty(this,"multiline",{enumerable:!1,get:function(){return r},set:function(t){r=t;}});var i=!1;Object.defineProperty(this,"MaxLen",{enumerable:!0,get:function(){return i},set:function(t){i=t;}}), Object.defineProperty(this,"hasAppearanceStream",{enumerable:!1,get:function(){return this.V||this.DV}});}, n.internal.inherit(n.TextField,n.Field), window.TextField=n.TextField, n.PasswordField=function(){TextField.call(this), Object.defineProperty(this,"password",{value:!0,enumerable:!1,configurable:!1,writable:!1});}, n.internal.inherit(n.PasswordField,n.TextField), window.PasswordField=n.PasswordField, n.internal.calculateFontSpace=function(t,e,r){var r=r||"helvetica",i=n.internal.calculateFontSpace.canvas||(n.internal.calculateFontSpace.canvas=document.createElement("canvas"));(s=i.getContext("2d")).save();var o=e+" "+r;s.font=o;var a=s.measureText(t);s.fontcolor="black";var s=i.getContext("2d");return a.height=1.5*s.measureText("3").width, s.restore(), a}, n.internal.calculateX=function(t,e,r,i){var i=i||12,r=r||"helvetica",o={text:"",fontSize:""},a=(e=")"==(e="("==e.substr(0,1)?e.substr(1):e).substr(e.length-1)?e.substr(0,e.length-1):e).split(" "),s=i,c=n.Appearance.internal.getHeight(t)||0;c=c<0?-c:c;var l=n.Appearance.internal.getWidth(t)||0;l=l<0?-l:l;s++;t:for(;;){var e="";s--;var u=n.internal.calculateFontSpace("3",s+"px",r).height,h=t.multiline?c-s:(c-u)/2,f=-2,d=h+=2,p=0,m=0,g=0;if(0==s){s=12, e="(...) Tj\n", e+="% Width of Text: "+n.internal.calculateFontSpace(e,"1px").width+", FieldWidth:"+l+"\n";break}g=n.internal.calculateFontSpace(a[0]+" ",s+"px",r).width;var w="",y=0;for(var v in a){w=" "==(w+=a[v]+" ").substr(w.length-1)?w.substr(0,w.length-1):w;var b=parseInt(v);g=n.internal.calculateFontSpace(w+" ",s+"px",r).width;var x=function(t,e,i){if(t+1<a.length){var o=e+" "+a[t+1];return n.internal.calculateFontSpace(o,i+"px",r).width<=l-4}return!1}(b,w,s),k=v>=a.length-1;if(!x||k){if(x||k){if(k)m=b;else if(t.multiline&&(u+2)*(y+2)+2>c)continue t}else{if(!t.multiline)continue t;if((u+2)*(y+2)+2>c)continue t;m=b;}for(var _="",C=p;C<=m;C++)_+=a[C]+" ";switch(_=" "==_.substr(_.length-1)?_.substr(0,_.length-1):_, g=n.internal.calculateFontSpace(_,s+"px",r).width, t.Q){case 2:f=l-g-2;break;case 1:f=(l-g)/2;break;case 0:default:f=2;}e+=f+" "+d+" Td\n", e+="("+_+") Tj\n", e+=-f+" 0 Td\n", d=-(s+2), g=0, p=m+1, y++, w="";}else w+=" ";}break}return o.text=e, o.fontSize=s, o}, n.internal.calculateAppearanceStream=function(t){if(t.appearanceStreamContent)return t.appearanceStreamContent;if(t.V||t.DV){var e="",r=t.V||t.DV,i=n.internal.calculateX(t,r);e+="/Tx BMC\nq\n/F1 "+i.fontSize+" Tf\n1 0 0 1 0 0 Tm\n", e+="BT\n", e+=i.text, e+="ET\n", e+="Q\nEMC\n";var o=new n.createFormXObject(t);return o.stream=e, o}}, n.internal.calculateCoordinates=function(t,e,r,i){var o={};if(this.internal){var a=function(t){return t*this.internal.scaleFactor};Array.isArray(t)?(t[0]=n.scale(t[0]), t[1]=n.scale(t[1]), t[2]=n.scale(t[2]), t[3]=n.scale(t[3]), o.lowerLeft_X=t[0]||0, o.lowerLeft_Y=a.call(this,this.internal.pageSize.height)-t[3]-t[1]||0, o.upperRight_X=t[0]+t[2]||0, o.upperRight_Y=a.call(this,this.internal.pageSize.height)-t[1]||0):(t=n.scale(t), e=n.scale(e), r=n.scale(r), i=n.scale(i), o.lowerLeft_X=t||0, o.lowerLeft_Y=this.internal.pageSize.height-e||0, o.upperRight_X=t+r||0, o.upperRight_Y=this.internal.pageSize.height-e+i||0);}else Array.isArray(t)?(o.lowerLeft_X=t[0]||0, o.lowerLeft_Y=t[1]||0, o.upperRight_X=t[0]+t[2]||0, o.upperRight_Y=t[1]+t[3]||0):(o.lowerLeft_X=t||0, o.lowerLeft_Y=e||0, o.upperRight_X=t+r||0, o.upperRight_Y=e+i||0);return[o.lowerLeft_X,o.lowerLeft_Y,o.upperRight_X,o.upperRight_Y]}, n.internal.calculateColor=function(t,e,n){var r=new Array(3);return r.r=0|t, r.g=0|e, r.b=0|n, r}, n.internal.getBitPosition=function(t,e){var n=1;return n<<=e-1, (t=t||0)|n}, n.internal.setBitPosition=function(t,e,n){t=t||0;var r=1;if(r<<=e-1, 1==(n=n||1))t=t|r;else var t=t&~r;return t}, e.API.addHTML=function(t,e,n,r,i){if("undefined"==typeof html2canvas&&"undefined"==typeof rasterizeHTML)throw new Error("You need either https://github.com/niklasvh/html2canvas or https://github.com/cburgmer/rasterizeHTML.js");"number"!=typeof e&&(r=e, i=n), "function"==typeof r&&(i=r, r=null);var o=this.internal,a=o.scaleFactor,s=o.pageSize.width,c=o.pageSize.height;if(r=r||{}, r.onrendered=function(t){e=parseInt(e)||0, n=parseInt(n)||0;var o=r.dim||{},l=o.h||0,u=o.w||Math.min(s,t.width/a)-e,h="JPEG";if(r.format&&(h=r.format), t.height>c&&r.pagesplit){var f=function(){for(var r=0;;){var o=document.createElement("canvas");o.width=Math.min(s*a,t.width), o.height=Math.min(c*a,t.height-r), o.getContext("2d").drawImage(t,0,r,t.width,o.height,0,0,o.width,o.height);var l=[o,e,r?0:n,o.width/a,o.height/a,h,null,"SLOW"];if(this.addImage.apply(this,l), (r+=o.height)>=t.height)break;this.addPage();}i(u,r,null,l);}.bind(this);if("CANVAS"===t.nodeName){var d=new Image;d.onload=f, d.src=t.toDataURL("image/png"), t=d;}else f();}else{var p=Math.random().toString(35),m=[t,e,n,u,l,h,p,"SLOW"];this.addImage.apply(this,m), i(u,l,p,m);}}.bind(this), "undefined"!=typeof html2canvas&&!r.rstz)return html2canvas(t,r);if("undefined"!=typeof rasterizeHTML){var l="drawDocument";return"string"==typeof t&&(l=/^http/.test(t)?"drawURL":"drawHTML"), r.width=r.width||s*a, rasterizeHTML[l](t,void 0,r).then(function(t){r.onrendered(t.image);},function(t){i(null,t);})}return null}, function(e){var n=["jpeg","jpg","png"],r=function t(e){var n=this.internal.newObject(),r=this.internal.write,i=this.internal.putStream;if(e.n=n, r("<</Type /XObject"), r("/Subtype /Image"), r("/Width "+e.w), r("/Height "+e.h), e.cs===this.color_spaces.INDEXED?r("/ColorSpace [/Indexed /DeviceRGB "+(e.pal.length/3-1)+" "+("smask"in e?n+2:n+1)+" 0 R]"):(r("/ColorSpace /"+e.cs), e.cs===this.color_spaces.DEVICE_CMYK&&r("/Decode [1 0 1 0 1 0 1 0]")), r("/BitsPerComponent "+e.bpc), "f"in e&&r("/Filter /"+e.f), "dp"in e&&r("/DecodeParms <<"+e.dp+">>"), "trns"in e&&e.trns.constructor==Array){for(var o="",a=0,s=e.trns.length;a<s;a++)o+=e.trns[a]+" "+e.trns[a]+" ";r("/Mask ["+o+"]");}if("smask"in e&&r("/SMask "+(n+1)+" 0 R"), r("/Length "+e.data.length+">>"), i(e.data), r("endobj"), "smask"in e){var c="/Predictor "+e.p+" /Colors 1 /BitsPerComponent "+e.bpc+" /Columns "+e.w,l={w:e.w,h:e.h,cs:"DeviceGray",bpc:e.bpc,dp:c,data:e.smask};"f"in e&&(l.f=e.f), t.call(this,l);}e.cs===this.color_spaces.INDEXED&&(this.internal.newObject(), r("<< /Length "+e.pal.length+">>"), i(this.arrayBufferToBinaryString(new Uint8Array(e.pal))), r("endobj"));},i=function(){var t=this.internal.collections.addImage_images;for(var e in t)r.call(this,t[e]);},o=function(){var t,e=this.internal.collections.addImage_images,n=this.internal.write;for(var r in e)n("/I"+(t=e[r]).i,t.n,"0","R");},a=function(t){return t&&"string"==typeof t&&(t=t.toUpperCase()), t in e.image_compression?t:e.image_compression.NONE},s=function(){var t=this.internal.collections.addImage_images;return t||(this.internal.collections.addImage_images=t={}, this.internal.events.subscribe("putResources",i), this.internal.events.subscribe("putXobjectDict",o)), t},c=function(t){var e=0;return t&&(e=Object.keys?Object.keys(t).length:function(t){var e=0;for(var n in t)t.hasOwnProperty(n)&&e++;return e}(t)), e},l=function(t){return void 0===t||null===t},u=function(t){return"string"==typeof t&&e.sHashCode(t)},h=function(t){return-1===n.indexOf(t)},f=function(t){return"function"!=typeof e["process"+t.toUpperCase()]},d=function(e){return"object"===(void 0===e?"undefined":t(e))&&1===e.nodeType},p=function(e,n,r){if("IMG"===e.nodeName&&e.hasAttribute("src")){var i=""+e.getAttribute("src");if(!r&&0===i.indexOf("data:image/"))return i;!n&&/\.png(?:[?#].*)?$/i.test(i)&&(n="png");}if("CANVAS"===e.nodeName)var o=e;else{(o=document.createElement("canvas")).width=e.clientWidth||e.width, o.height=e.clientHeight||e.height;var a=o.getContext("2d");if(!a)throw"addImage requires canvas to be supported by browser.";if(r){var s,c,l,u,h,f,d,p,m=Math.PI/180;"object"===(void 0===r?"undefined":t(r))&&(s=r.x, c=r.y, l=r.bg, r=r.angle), p=r*m, u=Math.abs(Math.cos(p)), h=Math.abs(Math.sin(p)), f=o.width, d=o.height, o.width=d*h+f*u, o.height=d*u+f*h, isNaN(s)&&(s=o.width/2), isNaN(c)&&(c=o.height/2), a.clearRect(0,0,o.width,o.height), a.fillStyle=l||"white", a.fillRect(0,0,o.width,o.height), a.save(), a.translate(s,c), a.rotate(p), a.drawImage(e,-f/2,-d/2), a.rotate(-p), a.translate(-s,-c), a.restore();}else a.drawImage(e,0,0,o.width,o.height);}return o.toDataURL("png"==(""+n).toLowerCase()?"image/png":"image/jpeg")},m=function(t,e){var n;if(e)for(var r in e)if(t===e[r].alias){n=e[r];break}return n},g=function(t,e,n){return t||e||(t=-96, e=-96), t<0&&(t=-1*n.w*72/t/this.internal.scaleFactor), e<0&&(e=-1*n.h*72/e/this.internal.scaleFactor), 0===t&&(t=e*n.w/n.h), 0===e&&(e=t*n.h/n.w), [t,e]},w=function(t,e,n,r,i,o,a){var s=g.call(this,n,r,i),c=this.internal.getCoordinateString,l=this.internal.getVerticalCoordinateString;n=s[0], r=s[1], a[o]=i, this.internal.write("q",c(n),"0 0",c(r),c(t),l(e+r),"cm /I"+i.i,"Do Q");};e.color_spaces={DEVICE_RGB:"DeviceRGB",DEVICE_GRAY:"DeviceGray",DEVICE_CMYK:"DeviceCMYK",CAL_GREY:"CalGray",CAL_RGB:"CalRGB",LAB:"Lab",ICC_BASED:"ICCBased",INDEXED:"Indexed",PATTERN:"Pattern",SEPARATION:"Separation",DEVICE_N:"DeviceN"}, e.decode={DCT_DECODE:"DCTDecode",FLATE_DECODE:"FlateDecode",LZW_DECODE:"LZWDecode",JPX_DECODE:"JPXDecode",JBIG2_DECODE:"JBIG2Decode",ASCII85_DECODE:"ASCII85Decode",ASCII_HEX_DECODE:"ASCIIHexDecode",RUN_LENGTH_DECODE:"RunLengthDecode",CCITT_FAX_DECODE:"CCITTFaxDecode"}, e.image_compression={NONE:"NONE",FAST:"FAST",MEDIUM:"MEDIUM",SLOW:"SLOW"}, e.sHashCode=function(t){return Array.prototype.reduce&&t.split("").reduce(function(t,e){return(t=(t<<5)-t+e.charCodeAt(0))&t},0)}, e.isString=function(t){return"string"==typeof t}, e.extractInfoFromBase64DataURI=function(t){return/^data:([\w]+?\/([\w]+?));base64,(.+?)$/g.exec(t)}, e.supportsArrayBuffer=function(){return"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array}, e.isArrayBuffer=function(t){return!!this.supportsArrayBuffer()&&t instanceof ArrayBuffer}, e.isArrayBufferView=function(t){return!!this.supportsArrayBuffer()&&("undefined"!=typeof Uint32Array&&(t instanceof Int8Array||t instanceof Uint8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array))}, e.binaryStringToUint8Array=function(t){for(var e=t.length,n=new Uint8Array(e),r=0;r<e;r++)n[r]=t.charCodeAt(r);return n}, e.arrayBufferToBinaryString=function(t){if("function"==typeof window.atob)return atob(this.arrayBufferToBase64(t));for(var e=this.isArrayBuffer(t)?t:new Uint8Array(t),n="",r=Math.round(e.byteLength/20480),i=0;i<r;i++)n+=String.fromCharCode.apply(null,e.slice(20480*i,20480*i+20480));return n}, e.arrayBufferToBase64=function(t){for(var e,n,r,i,o="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=new Uint8Array(t),c=s.byteLength,l=c%3,u=c-l,h=0;h<u;h+=3)e=(258048&(i=s[h]<<16|s[h+1]<<8|s[h+2]))>>12, n=(4032&i)>>6, r=63&i, o+=a[(16515072&i)>>18]+a[e]+a[n]+a[r];return 1==l?(e=(3&(i=s[u]))<<4, o+=a[(252&i)>>2]+a[e]+"=="):2==l&&(e=(1008&(i=s[u]<<8|s[u+1]))>>4, n=(15&i)<<2, o+=a[(64512&i)>>10]+a[e]+a[n]+"="), o}, e.createImageInfo=function(t,e,n,r,i,o,a,s,c,l,u,h,f){var d={alias:s,w:e,h:n,cs:r,bpc:i,i:a,data:t};return o&&(d.f=o), c&&(d.dp=c), l&&(d.trns=l), u&&(d.pal=u), h&&(d.smask=h), f&&(d.p=f), d}, e.addImage=function(e,r,i,o,g,y,v,b,x){if("string"!=typeof r){var k=y;y=g, g=o, o=i, i=r, r=k;}if("object"===(void 0===e?"undefined":t(e))&&!d(e)&&"imageData"in e){var _=e;e=_.imageData, r=_.format||r, i=_.x||i||0, o=_.y||o||0, g=_.w||g, y=_.h||y, v=_.alias||v, b=_.compression||b, x=_.rotation||_.angle||x;}if(isNaN(i)||isNaN(o))throw console.error("jsPDF.addImage: Invalid coordinates",arguments), new Error("Invalid coordinates passed to jsPDF.addImage");var C,A=s.call(this);if(!(C=m(e,A))){var S;if(d(e)&&(e=p(e,r,x)), l(v)&&(v=u(e)), !(C=m(v,A))){if(this.isString(e)){var q=this.extractInfoFromBase64DataURI(e);q?(r=q[2], e=atob(q[3])):137===e.charCodeAt(0)&&80===e.charCodeAt(1)&&78===e.charCodeAt(2)&&71===e.charCodeAt(3)&&(r="png");}if(r=(r||"JPEG").toLowerCase(), h(r))throw new Error("addImage currently only supports formats "+n+", not '"+r+"'");if(f(r))throw new Error("please ensure that the plugin for '"+r+"' support is added");if(this.supportsArrayBuffer()&&(e instanceof Uint8Array||(S=e, e=this.binaryStringToUint8Array(e))), !(C=this["process"+r.toUpperCase()](e,c(A),v,a(b),S)))throw new Error("An unkwown error occurred whilst processing the image")}}return w.call(this,i,o,g,y,C,C.i,A), this};var y=function(t){var e,n,r;if(255===!t.charCodeAt(0)||216===!t.charCodeAt(1)||255===!t.charCodeAt(2)||224===!t.charCodeAt(3)||!t.charCodeAt(6)==="J".charCodeAt(0)||!t.charCodeAt(7)==="F".charCodeAt(0)||!t.charCodeAt(8)==="I".charCodeAt(0)||!t.charCodeAt(9)==="F".charCodeAt(0)||0===!t.charCodeAt(10))throw new Error("getJpegSize requires a binary string jpeg file");for(var i=256*t.charCodeAt(4)+t.charCodeAt(5),o=4,a=t.length;o<a;){if(o+=i, 255!==t.charCodeAt(o))throw new Error("getJpegSize could not find the size of the image");if(192===t.charCodeAt(o+1)||193===t.charCodeAt(o+1)||194===t.charCodeAt(o+1)||195===t.charCodeAt(o+1)||196===t.charCodeAt(o+1)||197===t.charCodeAt(o+1)||198===t.charCodeAt(o+1)||199===t.charCodeAt(o+1))return n=256*t.charCodeAt(o+5)+t.charCodeAt(o+6), e=256*t.charCodeAt(o+7)+t.charCodeAt(o+8), r=t.charCodeAt(o+9), [e,n,r];o+=2, i=256*t.charCodeAt(o)+t.charCodeAt(o+1);}},v=function(t){if(65496!==(t[0]<<8|t[1]))throw new Error("Supplied data is not a JPEG");for(var e,n,r,i,o=t.length,a=(t[4]<<8)+t[5],s=4;s<o;){if(s+=a, e=b(t,s), a=(e[2]<<8)+e[3], (192===e[1]||194===e[1])&&255===e[0]&&a>7)return e=b(t,s+5), n=(e[2]<<8)+e[3], r=(e[0]<<8)+e[1], i=e[4], {width:n,height:r,numcomponents:i};s+=2;}throw new Error("getJpegSizeFromBytes could not find the size of the image")},b=function(t,e){return t.subarray(e,e+5)};e.processJPEG=function(t,e,n,r,i){var o,a=this.color_spaces.DEVICE_RGB,s=this.decode.DCT_DECODE;return this.isString(t)?(o=y(t), this.createImageInfo(t,o[0],o[1],1==o[3]?this.color_spaces.DEVICE_GRAY:a,8,s,e,n)):(this.isArrayBuffer(t)&&(t=new Uint8Array(t)), this.isArrayBufferView(t)?(o=v(t), t=i||this.arrayBufferToBinaryString(t), this.createImageInfo(t,o.width,o.height,1==o.numcomponents?this.color_spaces.DEVICE_GRAY:a,8,s,e,n)):null)}, e.processJPG=function(){return this.processJPEG.apply(this,arguments)};}(e.API), function(t){var n={annotations:[],f2:function(t){return t.toFixed(2)},notEmpty:function(t){if(void 0!==t&&""!=t)return!0}};e.API.annotationPlugin=n, e.API.events.push(["addPage",function(t){this.annotationPlugin.annotations[t.pageNumber]=[];}]), t.events.push(["putPage",function(t){for(var e=this.annotationPlugin.annotations[t.pageNumber],r=!1,i=0;i<e.length&&!r;i++)switch((l=e[i]).type){case"link":if(n.notEmpty(l.options.url)||n.notEmpty(l.options.pageNumber)){r=!0;break}case"reference":case"text":case"freetext":r=!0;}if(0!=r){this.internal.write("/Annots [");for(var o=this.annotationPlugin.f2,a=this.internal.scaleFactor,s=this.internal.pageSize.height,c=this.internal.getPageInfo(t.pageNumber),i=0;i<e.length;i++){var l=e[i];switch(l.type){case"reference":this.internal.write(" "+l.object.objId+" 0 R ");break;case"text":var u=this.internal.newAdditionalObject(),h=this.internal.newAdditionalObject(),f=l.title||"Note";w="<</Type /Annot /Subtype /Text "+(p="/Rect ["+o(l.bounds.x*a)+" "+o(s-(l.bounds.y+l.bounds.h)*a)+" "+o((l.bounds.x+l.bounds.w)*a)+" "+o((s-l.bounds.y)*a)+"] ")+"/Contents ("+l.contents+")", w+=" /Popup "+h.objId+" 0 R", w+=" /P "+c.objId+" 0 R", w+=" /T ("+f+") >>", u.content=w;var d=u.objId+" 0 R";w="<</Type /Annot /Subtype /Popup "+(p="/Rect ["+o((l.bounds.x+30)*a)+" "+o(s-(l.bounds.y+l.bounds.h)*a)+" "+o((l.bounds.x+l.bounds.w+30)*a)+" "+o((s-l.bounds.y)*a)+"] ")+" /Parent "+d, l.open&&(w+=" /Open true"), w+=" >>", h.content=w, this.internal.write(u.objId,"0 R",h.objId,"0 R");break;case"freetext":var p="/Rect ["+o(l.bounds.x*a)+" "+o((s-l.bounds.y)*a)+" "+o(l.bounds.x+l.bounds.w*a)+" "+o(s-(l.bounds.y+l.bounds.h)*a)+"] ",m=l.color||"#000000";w="<</Type /Annot /Subtype /FreeText "+p+"/Contents ("+l.contents+")", w+=" /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#"+m+")", w+=" /Border [0 0 0]", w+=" >>", this.internal.write(w);break;case"link":if(l.options.name){var g=this.annotations._nameMap[l.options.name];l.options.pageNumber=g.page, l.options.top=g.y;}else l.options.top||(l.options.top=0);var p="/Rect ["+o(l.x*a)+" "+o((s-l.y)*a)+" "+o((l.x+l.w)*a)+" "+o((s-(l.y+l.h))*a)+"] ",w="";if(l.options.url)w="<</Type /Annot /Subtype /Link "+p+"/Border [0 0 0] /A <</S /URI /URI ("+l.options.url+") >>";else if(l.options.pageNumber)switch(w="<</Type /Annot /Subtype /Link "+p+"/Border [0 0 0] /Dest ["+(t=this.internal.getPageInfo(l.options.pageNumber)).objId+" 0 R", l.options.magFactor=l.options.magFactor||"XYZ", l.options.magFactor){case"Fit":w+=" /Fit]";break;case"FitH":w+=" /FitH "+l.options.top+"]";break;case"FitV":l.options.left=l.options.left||0, w+=" /FitV "+l.options.left+"]";break;case"XYZ":default:var y=o((s-l.options.top)*a);l.options.left=l.options.left||0, void 0===l.options.zoom&&(l.options.zoom=0), w+=" /XYZ "+l.options.left+" "+y+" "+l.options.zoom+"]";}""!=w&&(w+=" >>", this.internal.write(w));}}this.internal.write("]");}}]), t.createAnnotation=function(t){switch(t.type){case"link":this.link(t.bounds.x,t.bounds.y,t.bounds.w,t.bounds.h,t);break;case"text":case"freetext":this.annotationPlugin.annotations[this.internal.getCurrentPageInfo().pageNumber].push(t);}}, t.link=function(t,e,n,r,i){this.annotationPlugin.annotations[this.internal.getCurrentPageInfo().pageNumber].push({x:t,y:e,w:n,h:r,options:i,type:"link"});}, t.textWithLink=function(t,e,n,r){var i=this.getTextWidth(t),o=this.internal.getLineHeight()/this.internal.scaleFactor;return this.text(t,e,n), n+=.2*o, this.link(e,n-o,i,o,r), i}, t.getTextWidth=function(t){var e=this.internal.getFontSize();return this.getStringUnitWidth(t)*e/this.internal.scaleFactor}, t.getLineHeight=function(){return this.internal.getLineHeight()};}(e.API), e.API.autoPrint=function(){var t;return this.internal.events.subscribe("postPutResources",function(){t=this.internal.newObject(), this.internal.write("<< /S/Named /Type/Action /N/Print >>","endobj");}), this.internal.events.subscribe("putCatalog",function(){this.internal.write("/OpenAction "+t+" 0 R");}), this}, function(t){t.events.push(["initialized",function(){this.canvas.pdf=this;}]), t.canvas={getContext:function(t){return this.pdf.context2d._canvas=this, this.pdf.context2d},style:{}}, Object.defineProperty(t.canvas,"width",{get:function(){return this._width},set:function(t){this._width=t, this.getContext("2d").pageWrapX=t+1;}}), Object.defineProperty(t.canvas,"height",{get:function(){return this._height},set:function(t){this._height=t, this.getContext("2d").pageWrapY=t+1;}});}(e.API), function(t){var e,n,r,i,o={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0},a=1,s=function(t,e,n,r,i){o={x:t,y:e,w:n,h:r,ln:i};},c=function(){return o},l={left:0,top:0,bottom:0};t.setHeaderFunction=function(t){i=t;}, t.getTextDimensions=function(t){e=this.internal.getFont().fontName, n=this.table_font_size||this.internal.getFontSize(), r=this.internal.getFont().fontStyle;var i,o;(o=document.createElement("font")).id="jsPDFCell";try{o.style.fontStyle=r;}catch(t){o.style.fontWeight=r;}o.style.fontName=e, o.style.fontSize=n+"pt";try{o.textContent=t;}catch(e){o.innerText=t;}return document.body.appendChild(o), i={w:(o.offsetWidth+1)*(19.049976/25.4),h:(o.offsetHeight+1)*(19.049976/25.4)}, document.body.removeChild(o), i}, t.cellAddPage=function(){var t=this.margins||l;this.addPage(), s(t.left,t.top,void 0,void 0), a+=1;}, t.cellInitialize=function(){o={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0}, a=1;}, t.cell=function(t,e,n,r,i,o,a){var u=c(),h=!1;if(void 0!==u.ln)if(u.ln===o)t=u.x+u.w, e=u.y;else{var f=this.margins||l;u.y+u.h+r+13>=this.internal.pageSize.height-f.bottom&&(this.cellAddPage(), h=!0, this.printHeaders&&this.tableHeaderRow&&this.printHeaderRow(o,!0)), e=c().y+c().h, h&&(e=23);}if(void 0!==i[0])if(this.printingHeaderRow?this.rect(t,e,n,r,"FD"):this.rect(t,e,n,r), "right"===a){i instanceof Array||(i=[i]);for(var d=0;d<i.length;d++){var p=i[d],m=this.getStringUnitWidth(p)*this.internal.getFontSize();this.text(p,t+n-m-3,e+this.internal.getLineHeight()*(d+1));}}else this.text(i,t+3,e+this.internal.getLineHeight());return s(t,e,n,r,o), this}, t.arrayMax=function(t,e){var n,r,i,o=t[0];for(n=0, r=t.length;n<r;n+=1)i=t[n], e?-1===e(o,i)&&(o=i):i>o&&(o=i);return o}, t.table=function(e,n,r,i,s){if(!r)throw"No data for PDF table";var c,u,h,f,d,p,m,g,w,y,v=[],b=[],x={},k={},_=[],C=[],A=!1,S=!0,q=12,T=l;if(T.width=this.internal.pageSize.width, s&&(!0===s.autoSize&&(A=!0), !1===s.printHeaders&&(S=!1), s.fontSize&&(q=s.fontSize), s.css&&void 0!==s.css["font-size"]&&(q=16*s.css["font-size"]), s.margins&&(T=s.margins)), this.lnMod=0, o={x:void 0,y:void 0,w:void 0,h:void 0,ln:void 0}, a=1, this.printHeaders=S, this.margins=T, this.setFontSize(q), this.table_font_size=q, void 0===i||null===i)v=Object.keys(r[0]);else if(i[0]&&"string"!=typeof i[0]){for(u=0, h=i.length;u<h;u+=1)c=i[u], v.push(c.name), b.push(c.prompt), k[c.name]=c.width*(19.049976/25.4);}else v=i;if(A)for(y=function(t){return t[c]}, u=0, h=v.length;u<h;u+=1){for(x[c=v[u]]=r.map(y), _.push(this.getTextDimensions(b[u]||c).w), m=0, f=(p=x[c]).length;m<f;m+=1)d=p[m], _.push(this.getTextDimensions(d).w);k[c]=t.arrayMax(_), _=[];}if(S){P=this.calculateLineHeight(v,k,b.length?b:v);for(u=0, h=v.length;u<h;u+=1)c=v[u], C.push([e,n,k[c],P,String(b.length?b[u]:c)]);this.setTableHeaderRow(C), this.printHeaderRow(1,!1);}for(u=0, h=r.length;u<h;u+=1){var P;for(g=r[u], P=this.calculateLineHeight(v,k,g), m=0, w=v.length;m<w;m+=1)c=v[m], this.cell(e,n,k[c],P,g[c],u+2,c.align);}return this.lastCellPos=o, this.table_x=e, this.table_y=n, this}, t.calculateLineHeight=function(t,e,n){for(var r,i=0,o=0;o<t.length;o++){n[r=t[o]]=this.splitTextToSize(String(n[r]),e[r]-3);var a=this.internal.getLineHeight()*n[r].length+3;a>i&&(i=a);}return i}, t.setTableHeaderRow=function(t){this.tableHeaderRow=t;}, t.printHeaderRow=function(t,e){if(!this.tableHeaderRow)throw"Property tableHeaderRow does not exist.";var n,r,o,c;if(this.printingHeaderRow=!0, void 0!==i){var l=i(this,a);s(l[0],l[1],l[2],l[3],-1);}this.setFontStyle("bold");var u=[];for(o=0, c=this.tableHeaderRow.length;o<c;o+=1)this.setFillColor(200,200,200), n=this.tableHeaderRow[o], e&&(this.margins.top=13, n[1]=this.margins&&this.margins.top||0, u.push(n)), r=[].concat(n), this.cell.apply(this,r.concat(t));u.length>0&&this.setTableHeaderRow(u), this.setFontStyle("normal"), this.printingHeaderRow=!1;};}(e.API), function(t){function e(){this._isStrokeTransparent=!1, this._strokeOpacity=1, this.strokeStyle="#000000", this.fillStyle="#000000", this._isFillTransparent=!1, this._fillOpacity=1, this.font="12pt times", this.textBaseline="alphabetic", this.textAlign="start", this.lineWidth=1, this.lineJoin="miter", this.lineCap="butt", this._transform=[1,0,0,1,0,0], this.globalCompositeOperation="normal", this.globalAlpha=1, this._clip_path=[], this.ignoreClearRect=!1, this.copy=function(t){this._isStrokeTransparent=t._isStrokeTransparent, this._strokeOpacity=t._strokeOpacity, this.strokeStyle=t.strokeStyle, this._isFillTransparent=t._isFillTransparent, this._fillOpacity=t._fillOpacity, this.fillStyle=t.fillStyle, this.font=t.font, this.lineWidth=t.lineWidth, this.lineJoin=t.lineJoin, this.lineCap=t.lineCap, this.textBaseline=t.textBaseline, this.textAlign=t.textAlign, this._fontSize=t._fontSize, this._transform=t._transform.slice(0), this.globalCompositeOperation=t.globalCompositeOperation, this.globalAlpha=t.globalAlpha, this._clip_path=t._clip_path.slice(0), this.ignoreClearRect=t.ignoreClearRect;};}t.events.push(["initialized",function(){this.context2d.pdf=this, this.context2d.internal.pdf=this, this.context2d.ctx=new e, this.context2d.ctxStack=[], this.context2d.path=[];}]), t.context2d={pageWrapXEnabled:!1,pageWrapYEnabled:!1,pageWrapX:9999999,pageWrapY:9999999,ctx:new e,f2:function(t){return t.toFixed(2)},fillRect:function(t,e,n,r){if(!this._isFillTransparent()){t=this._wrapX(t), e=this._wrapY(e);var i=this._matrix_map_rect(this.ctx._transform,{x:t,y:e,w:n,h:r});this.pdf.rect(i.x,i.y,i.w,i.h,"f");}},strokeRect:function(t,e,n,r){if(!this._isStrokeTransparent()){t=this._wrapX(t), e=this._wrapY(e);var i=this._matrix_map_rect(this.ctx._transform,{x:t,y:e,w:n,h:r});this.pdf.rect(i.x,i.y,i.w,i.h,"s");}},clearRect:function(t,e,n,r){if(!this.ctx.ignoreClearRect){t=this._wrapX(t), e=this._wrapY(e);var i=this._matrix_map_rect(this.ctx._transform,{x:t,y:e,w:n,h:r});this.save(), this.setFillStyle("#ffffff"), this.pdf.rect(i.x,i.y,i.w,i.h,"f"), this.restore();}},save:function(){this.ctx._fontSize=this.pdf.internal.getFontSize();var t=new e;t.copy(this.ctx), this.ctxStack.push(this.ctx), this.ctx=t;},restore:function(){this.ctx=this.ctxStack.pop(), this.setFillStyle(this.ctx.fillStyle), this.setStrokeStyle(this.ctx.strokeStyle), this.setFont(this.ctx.font), this.pdf.setFontSize(this.ctx._fontSize), this.setLineCap(this.ctx.lineCap), this.setLineWidth(this.ctx.lineWidth), this.setLineJoin(this.ctx.lineJoin);},rect:function(t,e,n,r){this.moveTo(t,e), this.lineTo(t+n,e), this.lineTo(t+n,e+r), this.lineTo(t,e+r), this.lineTo(t,e), this.closePath();},beginPath:function(){this.path=[];},closePath:function(){this.path.push({type:"close"});},_getRGBA:function(t){var e,n,r,o;if(!t)return{r:0,g:0,b:0,a:0,style:t};if(this.internal.rxTransparent.test(t))e=0, n=0, r=0, o=0;else{var a=this.internal.rxRgb.exec(t);null!=a?(e=parseInt(a[1]), n=parseInt(a[2]), r=parseInt(a[3]), o=1):null!=(a=this.internal.rxRgba.exec(t))?(e=parseInt(a[1]), n=parseInt(a[2]), r=parseInt(a[3]), o=parseFloat(a[4])):(o=1, "#"!=t.charAt(0)&&((t=i.colorNameToHex(t))||(t="#000000")), 4===t.length?(e=t.substring(1,2), e+=e, n=t.substring(2,3), n+=n, r=t.substring(3,4), r+=r):(e=t.substring(1,3), n=t.substring(3,5), r=t.substring(5,7)), e=parseInt(e,16), n=parseInt(n,16), r=parseInt(r,16));}return{r:e,g:n,b:r,a:o,style:t}},setFillStyle:function(t){var e=this._getRGBA(t);this.ctx.fillStyle=t, this.ctx._isFillTransparent=0===e.a, this.ctx._fillOpacity=e.a, this.pdf.setFillColor(e.r,e.g,e.b,{a:e.a}), this.pdf.setTextColor(e.r,e.g,e.b,{a:e.a});},setStrokeStyle:function(t){var e=this._getRGBA(t);this.ctx.strokeStyle=e.style, this.ctx._isStrokeTransparent=0===e.a, this.ctx._strokeOpacity=e.a, 0===e.a?this.pdf.setDrawColor(255,255,255):(e.a, this.pdf.setDrawColor(e.r,e.g,e.b));},fillText:function(t,e,n,r){if(!this._isFillTransparent()){e=this._wrapX(e), n=this._wrapY(n);var i=this._matrix_map_point(this.ctx._transform,[e,n]);e=i[0], n=i[1];var o=57.2958*this._matrix_rotation(this.ctx._transform);if(this.ctx._clip_path.length>0){var a;(a=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage()).push("q");var s=this.path;this.path=this.ctx._clip_path, this.ctx._clip_path=[], this._fill(null,!0), this.ctx._clip_path=this.path, this.path=s;}var c=1;try{c=this._matrix_decompose(this._getTransform()).scale[0];}catch(t){console.warn(t);}if(c<.01)this.pdf.text(t,e,this._getBaseline(n),null,o);else{var l=this.pdf.internal.getFontSize();this.pdf.setFontSize(l*c), this.pdf.text(t,e,this._getBaseline(n),null,o), this.pdf.setFontSize(l);}this.ctx._clip_path.length>0&&a.push("Q");}},strokeText:function(t,e,n,r){if(!this._isStrokeTransparent()){e=this._wrapX(e), n=this._wrapY(n);var i=this._matrix_map_point(this.ctx._transform,[e,n]);e=i[0], n=i[1];var o=57.2958*this._matrix_rotation(this.ctx._transform);if(this.ctx._clip_path.length>0){var a;(a=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage()).push("q");var s=this.path;this.path=this.ctx._clip_path, this.ctx._clip_path=[], this._fill(null,!0), this.ctx._clip_path=this.path, this.path=s;}var c=1;try{c=this._matrix_decompose(this._getTransform()).scale[0];}catch(t){console.warn(t);}if(1===c)this.pdf.text(t,e,this._getBaseline(n),{stroke:!0},o);else{var l=this.pdf.internal.getFontSize();this.pdf.setFontSize(l*c), this.pdf.text(t,e,this._getBaseline(n),{stroke:!0},o), this.pdf.setFontSize(l);}this.ctx._clip_path.length>0&&a.push("Q");}},setFont:function(t){this.ctx.font=t;var e=/\s*(\w+)\s+(\w+)\s+(\w+)\s+([\d\.]+)(px|pt|em)\s+(.*)?/;if(null!=(u=e.exec(t))){var n=u[1],r=u[3],i=u[4],o=u[5],a=u[6];i="px"===o?Math.floor(parseFloat(i)):"em"===o?Math.floor(parseFloat(i)*this.pdf.getFontSize()):Math.floor(parseFloat(i)), this.pdf.setFontSize(i), "bold"===r||"700"===r?this.pdf.setFontStyle("bold"):"italic"===n?this.pdf.setFontStyle("italic"):this.pdf.setFontStyle("normal");var s,c=(f=a).toLowerCase().split(/\s*,\s*/);s=-1!=c.indexOf("arial")?"Arial":-1!=c.indexOf("verdana")?"Verdana":-1!=c.indexOf("helvetica")?"Helvetica":-1!=c.indexOf("sans-serif")?"sans-serif":-1!=c.indexOf("fixed")?"Fixed":-1!=c.indexOf("monospace")?"Monospace":-1!=c.indexOf("terminal")?"Terminal":-1!=c.indexOf("courier")?"Courier":-1!=c.indexOf("times")?"Times":-1!=c.indexOf("cursive")?"Cursive":-1!=c.indexOf("fantasy")?"Fantasy":(c.indexOf("serif"), "Serif");var l;l="bold"===r?"bold":"normal", this.pdf.setFont(s,l);}else{var u=(e=/\s*(\d+)(pt|px|em)\s+([\w "]+)\s*([\w "]+)?/).exec(t);if(null!=u){var h=u[1],f=u[3];(l=u[4])||(l="normal"), h="em"===o?Math.floor(parseFloat(i)*this.pdf.getFontSize()):Math.floor(parseFloat(h)), this.pdf.setFontSize(h), this.pdf.setFont(f,l);}}},setTextBaseline:function(t){this.ctx.textBaseline=t;},getTextBaseline:function(){return this.ctx.textBaseline},setTextAlign:function(t){this.ctx.textAlign=t;},getTextAlign:function(){return this.ctx.textAlign},setLineWidth:function(t){this.ctx.lineWidth=t, this.pdf.setLineWidth(t);},setLineCap:function(t){this.ctx.lineCap=t, this.pdf.setLineCap(t);},setLineJoin:function(t){this.ctx.lineJoin=t, this.pdf.setLineJoin(t);},moveTo:function(t,e){t=this._wrapX(t), e=this._wrapY(e);var n=this._matrix_map_point(this.ctx._transform,[t,e]),r={type:"mt",x:t=n[0],y:e=n[1]};this.path.push(r);},_wrapX:function(t){return this.pageWrapXEnabled?t%this.pageWrapX:t},_wrapY:function(t){return this.pageWrapYEnabled?(this._gotoPage(this._page(t)), (t-this.lastBreak)%this.pageWrapY):t},transform:function(t,e,n,r,i,o){this.ctx._transform=[t,e,n,r,i,o];},setTransform:function(t,e,n,r,i,o){this.ctx._transform=[t,e,n,r,i,o];},_getTransform:function(){return this.ctx._transform},lastBreak:0,pageBreaks:[],_page:function(t){if(this.pageWrapYEnabled){this.lastBreak=0;for(var e=0,n=0,r=0;r<this.pageBreaks.length;r++)if(t>=this.pageBreaks[r]){e++, 0===this.lastBreak&&n++;var i=this.pageBreaks[r]-this.lastBreak;this.lastBreak=this.pageBreaks[r], n+=o=Math.floor(i/this.pageWrapY);}if(0===this.lastBreak){var o=Math.floor(t/this.pageWrapY)+1;n+=o;}return n+e}return this.pdf.internal.getCurrentPageInfo().pageNumber},_gotoPage:function(t){},lineTo:function(t,e){t=this._wrapX(t), e=this._wrapY(e);var n=this._matrix_map_point(this.ctx._transform,[t,e]),r={type:"lt",x:t=n[0],y:e=n[1]};this.path.push(r);},bezierCurveTo:function(t,e,n,r,i,o){t=this._wrapX(t), e=this._wrapY(e), n=this._wrapX(n), r=this._wrapY(r), i=this._wrapX(i), o=this._wrapY(o);var a;i=(a=this._matrix_map_point(this.ctx._transform,[i,o]))[0], o=a[1];var s={type:"bct",x1:t=(a=this._matrix_map_point(this.ctx._transform,[t,e]))[0],y1:e=a[1],x2:n=(a=this._matrix_map_point(this.ctx._transform,[n,r]))[0],y2:r=a[1],x:i,y:o};this.path.push(s);},quadraticCurveTo:function(t,e,n,r){t=this._wrapX(t), e=this._wrapY(e), n=this._wrapX(n), r=this._wrapY(r);var i;n=(i=this._matrix_map_point(this.ctx._transform,[n,r]))[0], r=i[1];var o={type:"qct",x1:t=(i=this._matrix_map_point(this.ctx._transform,[t,e]))[0],y1:e=i[1],x:n,y:r};this.path.push(o);},arc:function(t,e,n,r,i,o){if(t=this._wrapX(t), e=this._wrapY(e), !this._matrix_is_identity(this.ctx._transform)){var a=this._matrix_map_point(this.ctx._transform,[t,e]);t=a[0], e=a[1];var s=this._matrix_map_point(this.ctx._transform,[0,0]),c=this._matrix_map_point(this.ctx._transform,[0,n]);n=Math.sqrt(Math.pow(c[0]-s[0],2)+Math.pow(c[1]-s[1],2));}var l={type:"arc",x:t,y:e,radius:n,startAngle:r,endAngle:i,anticlockwise:o};this.path.push(l);},drawImage:function(t,e,n,r,i,o,a,s,c){void 0!==o&&(e=o, n=a, r=s, i=c), e=this._wrapX(e), n=this._wrapY(n);var l,u=this._matrix_map_rect(this.ctx._transform,{x:e,y:n,w:r,h:i}),h=(this._matrix_map_rect(this.ctx._transform,{x:o,y:a,w:s,h:c}), /data:image\/(\w+).*/i.exec(t));l=null!=h?h[1]:"png", this.pdf.addImage(t,l,u.x,u.y,u.w,u.h);},_matrix_multiply:function(t,e){var n=e[0],r=e[1],i=e[2],o=e[3],a=e[4],s=e[5],c=n*t[0]+r*t[2],l=i*t[0]+o*t[2],u=a*t[0]+s*t[2]+t[4];return r=n*t[1]+r*t[3], o=i*t[1]+o*t[3], s=a*t[1]+s*t[3]+t[5], n=c, i=l, a=u, [n,r,i,o,a,s]},_matrix_rotation:function(t){return Math.atan2(t[2],t[0])},_matrix_decompose:function(t){var e=t[0],n=t[1],r=t[2],i=t[3],o=Math.sqrt(e*e+n*n),a=(e/=o)*r+(n/=o)*i;r-=e*a, i-=n*a;var s=Math.sqrt(r*r+i*i);return r/=s, i/=s, a/=s, e*i<n*r&&(e=-e, n=-n, a=-a, o=-o), {scale:[o,0,0,s,0,0],translate:[1,0,0,1,t[4],t[5]],rotate:[e,n,-n,e,0,0],skew:[1,0,a,1,0,0]}},_matrix_map_point:function(t,e){var n=t[0],r=t[1],i=t[2],o=t[3],a=t[4],s=t[5],c=e[0],l=e[1];return[c*n+l*i+a,c*r+l*o+s]},_matrix_map_point_obj:function(t,e){var n=this._matrix_map_point(t,[e.x,e.y]);return{x:n[0],y:n[1]}},_matrix_map_rect:function(t,e){var n=this._matrix_map_point(t,[e.x,e.y]),r=this._matrix_map_point(t,[e.x+e.w,e.y+e.h]);return{x:n[0],y:n[1],w:r[0]-n[0],h:r[1]-n[1]}},_matrix_is_identity:function(t){return 1==t[0]&&(0==t[1]&&(0==t[2]&&(1==t[3]&&(0==t[4]&&0==t[5]))))},rotate:function(t){var e=[Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0];this.ctx._transform=this._matrix_multiply(this.ctx._transform,e);},scale:function(t,e){var n=[t,0,0,e,0,0];this.ctx._transform=this._matrix_multiply(this.ctx._transform,n);},translate:function(t,e){var n=[1,0,0,1,t,e];this.ctx._transform=this._matrix_multiply(this.ctx._transform,n);},stroke:function(){if(this.ctx._clip_path.length>0){var t;(t=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage()).push("q");var e=this.path;this.path=this.ctx._clip_path, this.ctx._clip_path=[], this._stroke(!0), this.ctx._clip_path=this.path, this.path=e, this._stroke(!1), t.push("Q");}else this._stroke(!1);},_stroke:function(t){if(t||!this._isStrokeTransparent()){for(var e=[],n=this.path,r=0;r<n.length;r++){var i=n[r];switch(i.type){case"mt":e.push({start:i,deltas:[],abs:[]});break;case"lt":h=[i.x-n[r-1].x,i.y-n[r-1].y];e[e.length-1].deltas.push(h), e[e.length-1].abs.push(i);break;case"bct":h=[i.x1-n[r-1].x,i.y1-n[r-1].y,i.x2-n[r-1].x,i.y2-n[r-1].y,i.x-n[r-1].x,i.y-n[r-1].y];e[e.length-1].deltas.push(h);break;case"qct":var o=n[r-1].x+2/3*(i.x1-n[r-1].x),a=n[r-1].y+2/3*(i.y1-n[r-1].y),s=i.x+2/3*(i.x1-i.x),c=i.y+2/3*(i.y1-i.y),l=i.x,u=i.y,h=[o-n[r-1].x,a-n[r-1].y,s-n[r-1].x,c-n[r-1].y,l-n[r-1].x,u-n[r-1].y];e[e.length-1].deltas.push(h);break;case"arc":0==e.length&&e.push({start:{x:0,y:0},deltas:[],abs:[]}), e[e.length-1].arc=!0, e[e.length-1].abs.push(i);}}for(r=0;r<e.length;r++){var f;if(f=r==e.length-1?"s":null, e[r].arc)for(var d=e[r].abs,p=0;p<d.length;p++){var m=d[p],g=360*m.startAngle/(2*Math.PI),w=360*m.endAngle/(2*Math.PI),y=m.x,v=m.y;this.internal.arc2(this,y,v,m.radius,g,w,m.anticlockwise,f,t);}else{var y=e[r].start.x,v=e[r].start.y;t?(this.pdf.lines(e[r].deltas,y,v,null,null), this.pdf.clip_fixed()):this.pdf.lines(e[r].deltas,y,v,null,f);}}}},_isFillTransparent:function(){return this.ctx._isFillTransparent||0==this.globalAlpha},_isStrokeTransparent:function(){return this.ctx._isStrokeTransparent||0==this.globalAlpha},fill:function(t){if(this.ctx._clip_path.length>0){var e;(e=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage()).push("q");var n=this.path;this.path=this.ctx._clip_path, this.ctx._clip_path=[], this._fill(t,!0), this.ctx._clip_path=this.path, this.path=n, this._fill(t,!1), e.push("Q");}else this._fill(t,!1);},_fill:function(t,e){if(!this._isFillTransparent()){var r,i="function"==typeof this.pdf.internal.newObject2;r=window.outIntercept?"group"===window.outIntercept.type?window.outIntercept.stream:window.outIntercept:this.internal.getCurrentPage();var o=[],a=window.outIntercept;if(i)switch(this.ctx.globalCompositeOperation){case"normal":case"source-over":break;case"destination-in":case"destination-out":var s=this.pdf.internal.newStreamObject(),c=this.pdf.internal.newObject2();c.push("<</Type /ExtGState"), c.push("/SMask <</S /Alpha /G "+s.objId+" 0 R>>"), c.push(">>");d="MASK"+c.objId;this.pdf.internal.addGraphicsState(d,c.objId);var l="/"+d+" gs";r.splice(0,0,"q"), r.splice(1,0,l), r.push("Q"), window.outIntercept=s;break;default:var u="/"+this.pdf.internal.blendModeMap[this.ctx.globalCompositeOperation.toUpperCase()];u&&this.pdf.internal.out(u+" gs");}var h=this.ctx.globalAlpha;if(this.ctx._fillOpacity<1&&(h=this.ctx._fillOpacity), i){var f=this.pdf.internal.newObject2();f.push("<</Type /ExtGState"), f.push("/CA "+h), f.push("/ca "+h), f.push(">>");var d="GS_O_"+f.objId;this.pdf.internal.addGraphicsState(d,f.objId), this.pdf.internal.out("/"+d+" gs");}for(var p=this.path,m=0;m<p.length;m++){var g=p[m];switch(g.type){case"mt":o.push({start:g,deltas:[],abs:[]});break;case"lt":_=[g.x-p[m-1].x,g.y-p[m-1].y];o[o.length-1].deltas.push(_), o[o.length-1].abs.push(g);break;case"bct":_=[g.x1-p[m-1].x,g.y1-p[m-1].y,g.x2-p[m-1].x,g.y2-p[m-1].y,g.x-p[m-1].x,g.y-p[m-1].y];o[o.length-1].deltas.push(_);break;case"qct":var w=p[m-1].x+2/3*(g.x1-p[m-1].x),y=p[m-1].y+2/3*(g.y1-p[m-1].y),v=g.x+2/3*(g.x1-g.x),b=g.y+2/3*(g.y1-g.y),x=g.x,k=g.y,_=[w-p[m-1].x,y-p[m-1].y,v-p[m-1].x,b-p[m-1].y,x-p[m-1].x,k-p[m-1].y];o[o.length-1].deltas.push(_);break;case"arc":0===o.length&&o.push({deltas:[],abs:[]}), o[o.length-1].arc=!0, o[o.length-1].abs.push(g);break;case"close":o.push({close:!0});}}for(m=0;m<o.length;m++){var C;if(m==o.length-1?(C="f", "evenodd"===t&&(C+="*")):C=null, o[m].close)this.pdf.internal.out("h"), this.pdf.internal.out("f");else if(o[m].arc){o[m].start&&this.internal.move2(this,o[m].start.x,o[m].start.y);for(var A=o[m].abs,S=0;S<A.length;S++){var q=A[S];if(void 0!==q.startAngle){var T=360*q.startAngle/(2*Math.PI),P=360*q.endAngle/(2*Math.PI),I=q.x,E=q.y;if(0===S&&this.internal.move2(this,I,E), this.internal.arc2(this,I,E,q.radius,T,P,q.anticlockwise,null,e), S===A.length-1&&o[m].start){var I=o[m].start.x,E=o[m].start.y;this.internal.line2(n,I,E);}}else this.internal.line2(n,q.x,q.y);}}else{var I=o[m].start.x,E=o[m].start.y;e?(this.pdf.lines(o[m].deltas,I,E,null,null), this.pdf.clip_fixed()):this.pdf.lines(o[m].deltas,I,E,null,C);}}window.outIntercept=a;}},pushMask:function(){if("function"==typeof this.pdf.internal.newObject2){var t=this.pdf.internal.newStreamObject(),e=this.pdf.internal.newObject2();e.push("<</Type /ExtGState"), e.push("/SMask <</S /Alpha /G "+t.objId+" 0 R>>"), e.push(">>");var n="MASK"+e.objId;this.pdf.internal.addGraphicsState(n,e.objId);var r="/"+n+" gs";this.pdf.internal.out(r);}else console.log("jsPDF v2 not enabled");},clip:function(){if(this.ctx._clip_path.length>0)for(var t=0;t<this.path.length;t++)this.ctx._clip_path.push(this.path[t]);else this.ctx._clip_path=this.path;this.path=[];},measureText:function(t){var e=this.pdf;return{getWidth:function(){var n=e.internal.getFontSize(),r=e.getStringUnitWidth(t)*n/e.internal.scaleFactor;return r*=1.3333},get width(){return this.getWidth(t)}}},_getBaseline:function(t){var e=parseInt(this.pdf.internal.getFontSize()),n=.25*e;switch(this.ctx.textBaseline){case"bottom":return t-n;case"top":return t+e;case"hanging":return t+e-n;case"middle":return t+e/2-n;case"ideographic":return t;case"alphabetic":default:return t}}};var n=t.context2d;Object.defineProperty(n,"fillStyle",{set:function(t){this.setFillStyle(t);},get:function(){return this.ctx.fillStyle}}), Object.defineProperty(n,"strokeStyle",{set:function(t){this.setStrokeStyle(t);},get:function(){return this.ctx.strokeStyle}}), Object.defineProperty(n,"lineWidth",{set:function(t){this.setLineWidth(t);},get:function(){return this.ctx.lineWidth}}), Object.defineProperty(n,"lineCap",{set:function(t){this.setLineCap(t);},get:function(){return this.ctx.lineCap}}), Object.defineProperty(n,"lineJoin",{set:function(t){this.setLineJoin(t);},get:function(){return this.ctx.lineJoin}}), Object.defineProperty(n,"miterLimit",{set:function(t){this.ctx.miterLimit=t;},get:function(){return this.ctx.miterLimit}}), Object.defineProperty(n,"textBaseline",{set:function(t){this.setTextBaseline(t);},get:function(){return this.getTextBaseline()}}), Object.defineProperty(n,"textAlign",{set:function(t){this.setTextAlign(t);},get:function(){return this.getTextAlign()}}), Object.defineProperty(n,"font",{set:function(t){this.setFont(t);},get:function(){return this.ctx.font}}), Object.defineProperty(n,"globalCompositeOperation",{set:function(t){this.ctx.globalCompositeOperation=t;},get:function(){return this.ctx.globalCompositeOperation}}), Object.defineProperty(n,"globalAlpha",{set:function(t){this.ctx.globalAlpha=t;},get:function(){return this.ctx.globalAlpha}}), Object.defineProperty(n,"ignoreClearRect",{set:function(t){this.ctx.ignoreClearRect=t;},get:function(){return this.ctx.ignoreClearRect}}), n.internal={}, n.internal.rxRgb=/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, n.internal.rxRgba=/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/, n.internal.rxTransparent=/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/, n.internal.arc=function(t,e,n,r,i,o,a,s){for(var c=this.pdf.internal.scaleFactor,l=this.pdf.internal.pageSize.height,u=this.pdf.internal.f2,h=i*(Math.PI/180),f=o*(Math.PI/180),d=this.createArc(r,h,f,a),p=0;p<d.length;p++){var m=d[p];0===p?this.pdf.internal.out([u((m.x1+e)*c),u((l-(m.y1+n))*c),"m",u((m.x2+e)*c),u((l-(m.y2+n))*c),u((m.x3+e)*c),u((l-(m.y3+n))*c),u((m.x4+e)*c),u((l-(m.y4+n))*c),"c"].join(" ")):this.pdf.internal.out([u((m.x2+e)*c),u((l-(m.y2+n))*c),u((m.x3+e)*c),u((l-(m.y3+n))*c),u((m.x4+e)*c),u((l-(m.y4+n))*c),"c"].join(" ")), t._lastPoint={x:e,y:n};}null!==s&&this.pdf.internal.out(this.pdf.internal.getStyle(s));}, n.internal.arc2=function(t,e,n,r,i,o,a,s,c){var l=e,u=n;c?(this.arc(t,l,u,r,i,o,a,null), this.pdf.clip_fixed()):this.arc(t,l,u,r,i,o,a,s);}, n.internal.move2=function(t,e,n){var r=this.pdf.internal.scaleFactor,i=this.pdf.internal.pageSize.height,o=this.pdf.internal.f2;this.pdf.internal.out([o(e*r),o((i-n)*r),"m"].join(" ")), t._lastPoint={x:e,y:n};}, n.internal.line2=function(t,e,n){var r=this.pdf.internal.scaleFactor,i=this.pdf.internal.pageSize.height,o=this.pdf.internal.f2,a={x:e,y:n};this.pdf.internal.out([o(a.x*r),o((i-a.y)*r),"l"].join(" ")), t._lastPoint=a;}, n.internal.createArc=function(t,e,n,r){var i=2*Math.PI,o=Math.PI/2,a=e;for((a<i||a>i)&&(a%=i), a<0&&(a=i+a);e>n;)e-=i;var s=Math.abs(n-e);s<i&&r&&(s=i-s);for(var c=[],l=r?-1:1,u=a;s>1e-5;){var h=u+l*Math.min(s,o);c.push(this.createSmallArc(t,u,h)), s-=Math.abs(h-u), u=h;}return c}, n.internal.getCurrentPage=function(){return this.pdf.internal.pages[this.pdf.internal.getCurrentPageInfo().pageNumber]}, n.internal.createSmallArc=function(t,e,n){var r=(n-e)/2,i=t*Math.cos(r),o=t*Math.sin(r),a=i,s=-o,c=a*a+s*s,l=c+a*i+s*o,u=4/3*(Math.sqrt(2*c*l)-l)/(a*o-s*i),h=a-u*s,f=s+u*a,d=h,p=-f,m=r+e,g=Math.cos(m),w=Math.sin(m);return{x1:t*Math.cos(e),y1:t*Math.sin(e),x2:h*g-f*w,y2:h*w+f*g,x3:d*g-p*w,y3:d*w+p*g,x4:t*Math.cos(n),y4:t*Math.sin(n)}};}(e.API), function(e){var n,r,o,a,s,c,l,u,h,f,d,p,m,g,w,y,v,b,x,k;n=function(){function t(){}return function(e){return t.prototype=e, new t}}(), f=function(t){var e,n,r,i,o,a,s;for(n=0, r=t.length, e=void 0, i=!1, a=!1;!i&&n!==r;)(e=t[n]=t[n].trimLeft())&&(i=!0), n++;for(n=r-1;r&&!a&&-1!==n;)(e=t[n]=t[n].trimRight())&&(a=!0), n--;for(o=/\s+$/g, s=!0, n=0;n!==r;)"\u2028"!=t[n]&&(e=t[n].replace(/\s+/g," "), s&&(e=e.trimLeft()), e&&(s=o.test(e)), t[n]=e), n++;return t}, p=function(t){var e,n,r;for(e=void 0, n=(r=t.split(",")).shift();!e&&n;)e=o[n.trim().toLowerCase()], n=r.shift();return e}, m=function(t){(t="auto"===t?"0px":t).indexOf("em")>-1&&!isNaN(Number(t.replace("em","")))&&(t=18.719*Number(t.replace("em",""))+"px"), t.indexOf("pt")>-1&&!isNaN(Number(t.replace("pt","")))&&(t=1.333*Number(t.replace("pt",""))+"px");var e;return (e=g[t])?e:void 0!==(e={"xx-small":9,"x-small":11,small:13,medium:16,large:19,"x-large":23,"xx-large":28,auto:0}[{css_line_height_string:t}])?g[t]=e/16:(e=parseFloat(t))?g[t]=e/16:3===(e=t.match(/([\d\.]+)(px)/)).length?g[t]=parseFloat(e[1])/16:g[t]=1}, h=function(t){var e,n,r;return r=function(e){var n;return n=function(t){return document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(t,null):t.currentStyle?t.currentStyle:t.style}(t), function(t){return t=t.replace(/-\D/g,function(t){return t.charAt(1).toUpperCase()}), n[t]}}(), e={}, n=void 0, e["font-family"]=p(r("font-family"))||"times", e["font-style"]=a[r("font-style")]||"normal", e["text-align"]=s[r("text-align")]||"left", "bold"===(n=c[r("font-weight")]||"normal")&&("normal"===e["font-style"]?e["font-style"]=n:e["font-style"]=n+e["font-style"]), e["font-size"]=m(r("font-size"))||1, e["line-height"]=m(r("line-height"))||1, e.display="inline"===r("display")?"inline":"block", n="block"===e.display, e["margin-top"]=n&&m(r("margin-top"))||0, e["margin-bottom"]=n&&m(r("margin-bottom"))||0, e["padding-top"]=n&&m(r("padding-top"))||0, e["padding-bottom"]=n&&m(r("padding-bottom"))||0, e["margin-left"]=n&&m(r("margin-left"))||0, e["margin-right"]=n&&m(r("margin-right"))||0, e["padding-left"]=n&&m(r("padding-left"))||0, e["padding-right"]=n&&m(r("padding-right"))||0, e["page-break-before"]=r("page-break-before")||"auto", e.float=l[r("cssFloat")]||"none", e.clear=u[r("clear")]||"none", e.color=r("color"), e}, w=function(t,e,n){var r,i,o,a,s;if(o=!1, i=void 0, a=void 0, r=n["#"+t.id])if("function"==typeof r)o=r(t,e);else for(i=0, a=r.length;!o&&i!==a;)o=r[i](t,e), i++;if(r=n[t.nodeName], !o&&r)if("function"==typeof r)o=r(t,e);else for(i=0, a=r.length;!o&&i!==a;)o=r[i](t,e), i++;for(s=t.className?t.className.split(" "):[], i=0;i<s.length;i++)if(r=n["."+s[i]], !o&&r)if("function"==typeof r)o=r(t,e);else for(i=0, a=r.length;!o&&i!==a;)o=r[i](t,e), i++;return o}, k=function(t,e){var n,r,i,o,a,s,c,l,u;for(n=[], r=[], i=0, u=t.rows[0].cells.length, c=t.clientWidth;i<u;)l=t.rows[0].cells[i], r[i]={name:l.textContent.toLowerCase().replace(/\s+/g,""),prompt:l.textContent.replace(/\r?\n/g,""),width:l.clientWidth/c*e.pdf.internal.pageSize.width}, i++;for(i=1;i<t.rows.length;){for(s=t.rows[i], a={}, o=0;o<s.cells.length;)a[r[o].name]=s.cells[o].textContent.replace(/\r?\n/g,""), o++;n.push(a), i++;}return{rows:n,headers:r}};var _={SCRIPT:1,STYLE:1,NOSCRIPT:1,OBJECT:1,EMBED:1,SELECT:1},C=1;r=function(e,i,o){var a,s,c,l,u,f,d,p;for(s=e.childNodes, a=void 0, (u="block"===(c=h(e)).display)&&(i.setBlockBoundary(), i.setBlockStyle(c)), l=0, f=s.length;l<f;){if("object"===(void 0===(a=s[l])?"undefined":t(a))){if(i.executeWatchFunctions(a), 1===a.nodeType&&"HEADER"===a.nodeName){var m=a,g=i.pdf.margins_doc.top;i.pdf.internal.events.subscribe("addPage",function(t){i.y=g, r(m,i,o), i.pdf.margins_doc.top=i.y+10, i.y+=10;},!1);}if(8===a.nodeType&&"#comment"===a.nodeName)~a.textContent.indexOf("ADD_PAGE")&&(i.pdf.addPage(), i.y=i.pdf.margins_doc.top);else if(1!==a.nodeType||_[a.nodeName])if(3===a.nodeType){var v=a.nodeValue;if(a.nodeValue&&"LI"===a.parentNode.nodeName)if("OL"===a.parentNode.parentNode.nodeName)v=C+++". "+v;else{var b=c["font-size"],x=(3-.75*b)*i.pdf.internal.scaleFactor,A=.75*b*i.pdf.internal.scaleFactor,S=1.74*b/i.pdf.internal.scaleFactor;p=function(t,e){this.pdf.circle(t+x,e+A,S,"FD");};}16&a.ownerDocument.body.compareDocumentPosition(a)&&i.addText(v,c);}else"string"==typeof a&&i.addText(a,c);else{var q;if("IMG"===a.nodeName){var T=a.getAttribute("src");q=y[i.pdf.sHashCode(T)||T];}if(q){i.pdf.internal.pageSize.height-i.pdf.margins_doc.bottom<i.y+a.height&&i.y>i.pdf.margins_doc.top&&(i.pdf.addPage(), i.y=i.pdf.margins_doc.top, i.executeWatchFunctions(a));var P=h(a),I=i.x,E=12/i.pdf.internal.scaleFactor,O=(P["margin-left"]+P["padding-left"])*E,F=(P["margin-right"]+P["padding-right"])*E,B=(P["margin-top"]+P["padding-top"])*E,R=(P["margin-bottom"]+P["padding-bottom"])*E;void 0!==P.float&&"right"===P.float?I+=i.settings.width-a.width-F:I+=O, i.pdf.addImage(q,I,i.y+B,a.width,a.height), q=void 0, "right"===P.float||"left"===P.float?(i.watchFunctions.push(function(t,e,n,r){return i.y>=e?(i.x+=t, i.settings.width+=n, !0):!!(r&&1===r.nodeType&&!_[r.nodeName]&&i.x+r.width>i.pdf.margins_doc.left+i.pdf.margins_doc.width)&&(i.x+=t, i.y=e, i.settings.width+=n, !0)}.bind(this,"left"===P.float?-a.width-O-F:0,i.y+a.height+B+R,a.width)), i.watchFunctions.push(function(t,e,n){return!(i.y<t&&e===i.pdf.internal.getNumberOfPages())||1===n.nodeType&&"both"===h(n).clear&&(i.y=t, !0)}.bind(this,i.y+a.height,i.pdf.internal.getNumberOfPages())), i.settings.width-=a.width+O+F, "left"===P.float&&(i.x+=a.width+O+F)):i.y+=a.height+B+R;}else if("TABLE"===a.nodeName)d=k(a,i), i.y+=10, i.pdf.table(i.x,i.y,d.rows,d.headers,{autoSize:!1,printHeaders:o.printHeaders,margins:i.pdf.margins_doc,css:h(a)}), i.y=i.pdf.lastCellPos.y+i.pdf.lastCellPos.h+20;else if("OL"===a.nodeName||"UL"===a.nodeName)C=1, w(a,i,o)||r(a,i,o), i.y+=10;else if("LI"===a.nodeName){var D=i.x;i.x+=20/i.pdf.internal.scaleFactor, i.y+=3, w(a,i,o)||r(a,i,o), i.x=D;}else"BR"===a.nodeName?(i.y+=c["font-size"]*i.pdf.internal.scaleFactor, i.addText("\u2028",n(c))):w(a,i,o)||r(a,i,o);}}l++;}if(o.outY=i.y, u)return i.setBlockBoundary(p)}, y={}, v=function(t,e,n,r){function i(){e.pdf.internal.events.publish("imagesLoaded"), r(o);}for(var o,a=t.getElementsByTagName("img"),s=a.length,c=0;s--;)!function(t,n,r){if(t){var a=new Image;o=++c, a.crossOrigin="", a.onerror=a.onload=function(){if(a.complete&&(0===a.src.indexOf("data:image/")&&(a.width=n||a.width||0, a.height=r||a.height||0), a.width+a.height)){var o=e.pdf.sHashCode(t)||t;y[o]=y[o]||a;}--c||i();}, a.src=t;}}(a[s].getAttribute("src"),a[s].width,a[s].height);return c||i()}, b=function(t,e,n){var i=t.getElementsByTagName("footer");if(i.length>0){i=i[0];var o=e.pdf.internal.write,a=e.y;e.pdf.internal.write=function(){}, r(i,e,n);var s=Math.ceil(e.y-a)+5;e.y=a, e.pdf.internal.write=o, e.pdf.margins_doc.bottom+=s;for(var c=function(t){var o=void 0!==t?t.pageNumber:1,a=e.y;e.y=e.pdf.internal.pageSize.height-e.pdf.margins_doc.bottom, e.pdf.margins_doc.bottom-=s;for(var c=i.getElementsByTagName("span"),l=0;l<c.length;++l)(" "+c[l].className+" ").replace(/[\n\t]/g," ").indexOf(" pageCounter ")>-1&&(c[l].innerHTML=o), (" "+c[l].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1&&(c[l].innerHTML="###jsPDFVarTotalPages###");r(i,e,n), e.pdf.margins_doc.bottom+=s, e.y=a;},l=i.getElementsByTagName("span"),u=0;u<l.length;++u)(" "+l[u].className+" ").replace(/[\n\t]/g," ").indexOf(" totalPages ")>-1&&e.pdf.internal.events.subscribe("htmlRenderingFinished",e.pdf.putTotalPages.bind(e.pdf,"###jsPDFVarTotalPages###"),!0);e.pdf.internal.events.subscribe("addPage",c,!1), c(), _.FOOTER=1;}}, x=function(t,e,n,i,o,a){if(!e)return!1;"string"==typeof e||e.parentNode||(e=""+e.innerHTML), "string"==typeof e&&(e=function(t){var e,n,r,i;return r="jsPDFhtmlText"+Date.now().toString()+(1e3*Math.random()).toFixed(0), i="position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;", n=document.createElement("div"), n.style.cssText=i, n.innerHTML='<iframe style="height:1px;width:1px" name="'+r+'" />', document.body.appendChild(n), (e=window.frames[r]).document.open(), e.document.writeln(t), e.document.close(), e.document.body}(e.replace(/<\/?script[^>]*?>/gi,"")));var s,c=new d(t,n,i,o);return v.call(this,e,c,o.elementHandlers,function(t){b(e,c,o.elementHandlers), r(e,c,o.elementHandlers), c.pdf.internal.events.publish("htmlRenderingFinished"), s=c.dispose(), "function"==typeof a?a(s):t&&console.error("jsPDF Warning: rendering issues? provide a callback to fromHTML!");}), s||{x:c.x,y:c.y}}, (d=function(t,e,n,r){return this.pdf=t, this.x=e, this.y=n, this.settings=r, this.watchFunctions=[], this.init(), this}).prototype.init=function(){return this.paragraph={text:[],style:[]}, this.pdf.internal.write("q")}, d.prototype.dispose=function(){return this.pdf.internal.write("Q"), {x:this.x,y:this.y,ready:!0}}, d.prototype.executeWatchFunctions=function(t){var e=!1,n=[];if(this.watchFunctions.length>0){for(var r=0;r<this.watchFunctions.length;++r)!0===this.watchFunctions[r](t)?e=!0:n.push(this.watchFunctions[r]);this.watchFunctions=n;}return e}, d.prototype.splitFragmentsIntoLines=function(t,e){var r,i,o,a,s,c,l,u,h,f,d,p,m,g;for(f=this.pdf.internal.scaleFactor, a={}, i=void 0, h=void 0, o=void 0, s=void 0, g=void 0, u=void 0, l=void 0, c=void 0, p=[d=[]], r=0, m=this.settings.width;t.length;)if(s=t.shift(), g=e.shift(), s)if(i=g["font-family"], h=g["font-style"], (o=a[i+h])||(o=this.pdf.internal.getFont(i,h).metadata.Unicode, a[i+h]=o), u={widths:o.widths,kerning:o.kerning,fontSize:12*g["font-size"],textIndent:r}, l=this.pdf.getStringUnitWidth(s,u)*u.fontSize/f, "\u2028"==s)d=[], p.push(d);else if(r+l>m){for(c=this.pdf.splitTextToSize(s,m,u), d.push([c.shift(),g]);c.length;)d=[[c.shift(),g]], p.push(d);r=this.pdf.getStringUnitWidth(d[0][0],u)*u.fontSize/f;}else d.push([s,g]), r+=l;if(void 0!==g["text-align"]&&("center"===g["text-align"]||"right"===g["text-align"]||"justify"===g["text-align"]))for(var w=0;w<p.length;++w){var y=this.pdf.getStringUnitWidth(p[w][0][0],u)*u.fontSize/f;w>0&&(p[w][0][1]=n(p[w][0][1]));var v=m-y;if("right"===g["text-align"])p[w][0][1]["margin-left"]=v;else if("center"===g["text-align"])p[w][0][1]["margin-left"]=v/2;else if("justify"===g["text-align"]){var b=p[w][0][0].split(" ").length-1;p[w][0][1]["word-spacing"]=v/b, w===p.length-1&&(p[w][0][1]["word-spacing"]=0);}}return p}, d.prototype.RenderTextFragment=function(t,e){var n,r;r=0, this.pdf.internal.pageSize.height-this.pdf.margins_doc.bottom<this.y+this.pdf.internal.getFontSize()&&(this.pdf.internal.write("ET","Q"), this.pdf.addPage(), this.y=this.pdf.margins_doc.top, this.pdf.internal.write("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),e.color,"Td"), r=Math.max(r,e["line-height"],e["font-size"]), this.pdf.internal.write(0,(-12*r).toFixed(2),"Td")), n=this.pdf.internal.getFont(e["font-family"],e["font-style"]);var i=this.getPdfColor(e.color);i!==this.lastTextColor&&(this.pdf.internal.write(i), this.lastTextColor=i), void 0!==e["word-spacing"]&&e["word-spacing"]>0&&this.pdf.internal.write(e["word-spacing"].toFixed(2),"Tw"), this.pdf.internal.write("/"+n.id,(12*e["font-size"]).toFixed(2),"Tf","("+this.pdf.internal.pdfEscape(t)+") Tj"), void 0!==e["word-spacing"]&&this.pdf.internal.write(0,"Tw");}, d.prototype.getPdfColor=function(t){var e,n,r,o=/rgb\s*\(\s*(\d+),\s*(\d+),\s*(\d+\s*)\)/.exec(t);if(null!=o?(e=parseInt(o[1]), n=parseInt(o[2]), r=parseInt(o[3])):("#"!=t.charAt(0)&&((t=i.colorNameToHex(t))||(t="#000000")), e=t.substring(1,3), e=parseInt(e,16), n=t.substring(3,5), n=parseInt(n,16), r=t.substring(5,7), r=parseInt(r,16)), "string"==typeof e&&/^#[0-9A-Fa-f]{6}$/.test(e)){var a=parseInt(e.substr(1),16);e=a>>16&255, n=a>>8&255, r=255&a;}var s=this.f3;return 0===e&&0===n&&0===r||void 0===n?s(e/255)+" g":[s(e/255),s(n/255),s(r/255),"rg"].join(" ")}, d.prototype.f3=function(t){return t.toFixed(3)}, d.prototype.renderParagraph=function(t){var e,n,r,i,o,a,s,c,l,u,h,d,p;if(r=f(this.paragraph.text), d=this.paragraph.style, e=this.paragraph.blockstyle, this.paragraph={text:[],style:[],blockstyle:{},priorblockstyle:e}, r.join("").trim()){s=this.splitFragmentsIntoLines(r,d), a=void 0, c=void 0, n=12/this.pdf.internal.scaleFactor, this.priorMarginBottom=this.priorMarginBottom||0, h=(Math.max((e["margin-top"]||0)-this.priorMarginBottom,0)+(e["padding-top"]||0))*n, u=((e["margin-bottom"]||0)+(e["padding-bottom"]||0))*n, this.priorMarginBottom=e["margin-bottom"]||0, "always"===e["page-break-before"]&&(this.pdf.addPage(), this.y=0, h=((e["margin-top"]||0)+(e["padding-top"]||0))*n), l=this.pdf.internal.write, i=void 0, o=void 0, this.y+=h, l("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");for(var m=0;s.length;){for(c=0, i=0, o=(a=s.shift()).length;i!==o;)a[i][0].trim()&&(c=Math.max(c,a[i][1]["line-height"],a[i][1]["font-size"]), p=7*a[i][1]["font-size"]), i++;var g=0,w=0;for(void 0!==a[0][1]["margin-left"]&&a[0][1]["margin-left"]>0&&(g=(w=this.pdf.internal.getCoordinateString(a[0][1]["margin-left"]))-m, m=w), l(g+Math.max(e["margin-left"]||0,0)*n,(-12*c).toFixed(2),"Td"), i=0, o=a.length;i!==o;)a[i][0]&&this.RenderTextFragment(a[i][0],a[i][1]), i++;if(this.y+=c*n, this.executeWatchFunctions(a[0][1])&&s.length>0){var y=[],v=[];s.forEach(function(t){for(var e=0,n=t.length;e!==n;)t[e][0]&&(y.push(t[e][0]+" "), v.push(t[e][1])), ++e;}), s=this.splitFragmentsIntoLines(f(y),v), l("ET","Q"), l("q","BT 0 g",this.pdf.internal.getCoordinateString(this.x),this.pdf.internal.getVerticalCoordinateString(this.y),"Td");}}return t&&"function"==typeof t&&t.call(this,this.x-9,this.y-p/2), l("ET","Q"), this.y+=u}}, d.prototype.setBlockBoundary=function(t){return this.renderParagraph(t)}, d.prototype.setBlockStyle=function(t){return this.paragraph.blockstyle=t}, d.prototype.addText=function(t,e){return this.paragraph.text.push(t), this.paragraph.style.push(e)}, o={helvetica:"helvetica","sans-serif":"helvetica","times new roman":"times",serif:"times",times:"times",monospace:"courier",courier:"courier"}, c={100:"normal",200:"normal",300:"normal",400:"normal",500:"bold",600:"bold",700:"bold",800:"bold",900:"bold",normal:"normal",bold:"bold",bolder:"bold",lighter:"normal"}, a={normal:"normal",italic:"italic",oblique:"italic"}, s={left:"left",right:"right",center:"center",justify:"justify"}, l={none:"none",right:"right",left:"left"}, u={none:"none",both:"both"}, g={normal:1}, e.fromHTML=function(t,e,n,r,i,o){return this.margins_doc=o||{top:0,bottom:0}, r||(r={}), r.elementHandlers||(r.elementHandlers={}), x(this,t,isNaN(e)?4:e,isNaN(n)?4:n,r,i)};}(e.API), function(t){var n,r,i;e.API.addJS=function(t){return i=t, this.internal.events.subscribe("postPutResources",function(t){n=this.internal.newObject(), this.internal.write("<< /Names [(EmbeddedJS) "+(n+1)+" 0 R] >>","endobj"), r=this.internal.newObject(), this.internal.write("<< /S /JavaScript /JS (",i,") >>","endobj");}), this.internal.events.subscribe("putCatalog",function(){void 0!==n&&void 0!==r&&this.internal.write("/Names <</JavaScript "+n+" 0 R>>");}), this};}(), function(t){t.events.push(["postPutResources",function(){var t=this,e=/^(\d+) 0 obj$/;if(this.outline.root.children.length>0)for(var n=t.outline.render().split(/\r\n/),r=0;r<n.length;r++){var i=n[r],o=e.exec(i);if(null!=o){var a=o[1];t.internal.newObjectDeferredBegin(a);}t.internal.write(i);}if(this.outline.createNamedDestinations){for(var s=this.internal.pages.length,c=[],r=0;r<s;r++){var l=t.internal.newObject();c.push(l);var u=t.internal.getPageInfo(r+1);t.internal.write("<< /D["+u.objId+" 0 R /XYZ null null null]>> endobj");}var h=t.internal.newObject();t.internal.write("<< /Names [ ");for(r=0;r<c.length;r++)t.internal.write("(page_"+(r+1)+")"+c[r]+" 0 R");t.internal.write(" ] >>","endobj");t.internal.newObject();t.internal.write("<< /Dests "+h+" 0 R"), t.internal.write(">>","endobj");}}]), t.events.push(["putCatalog",function(){var t=this;t.outline.root.children.length>0&&(t.internal.write("/Outlines",this.outline.makeRef(this.outline.root)), this.outline.createNamedDestinations&&t.internal.write("/Names "+namesOid+" 0 R"));}]), t.events.push(["initialized",function(){var t=this;t.outline={createNamedDestinations:!1,root:{children:[]}}, t.outline.add=function(t,e,n){var r={title:e,options:n,children:[]};return null==t&&(t=this.root), t.children.push(r), r}, t.outline.render=function(){return this.ctx={}, this.ctx.val="", this.ctx.pdf=t, this.genIds_r(this.root), this.renderRoot(this.root), this.renderItems(this.root), this.ctx.val}, t.outline.genIds_r=function(e){e.id=t.internal.newObjectDeferred();for(var n=0;n<e.children.length;n++)this.genIds_r(e.children[n]);}, t.outline.renderRoot=function(t){this.objStart(t), this.line("/Type /Outlines"), t.children.length>0&&(this.line("/First "+this.makeRef(t.children[0])), this.line("/Last "+this.makeRef(t.children[t.children.length-1]))), this.line("/Count "+this.count_r({count:0},t)), this.objEnd();}, t.outline.renderItems=function(e){for(i=0;i<e.children.length;i++){o=e.children[i];this.objStart(o), this.line("/Title "+this.makeString(o.title)), this.line("/Parent "+this.makeRef(e)), i>0&&this.line("/Prev "+this.makeRef(e.children[i-1])), i<e.children.length-1&&this.line("/Next "+this.makeRef(e.children[i+1])), o.children.length>0&&(this.line("/First "+this.makeRef(o.children[0])), this.line("/Last "+this.makeRef(o.children[o.children.length-1])));var n=this.count=this.count_r({count:0},o);if(n>0&&this.line("/Count "+n), o.options&&o.options.pageNumber){var r=t.internal.getPageInfo(o.options.pageNumber);this.line("/Dest ["+r.objId+" 0 R /XYZ 0 "+this.ctx.pdf.internal.pageSize.height+" 0]");}this.objEnd();}for(var i=0;i<e.children.length;i++){var o=e.children[i];this.renderItems(o);}}, t.outline.line=function(t){this.ctx.val+=t+"\r\n";}, t.outline.makeRef=function(t){return t.id+" 0 R"}, t.outline.makeString=function(e){return"("+t.internal.pdfEscape(e)+")"}, t.outline.objStart=function(t){this.ctx.val+="\r\n"+t.id+" 0 obj\r\n<<\r\n";}, t.outline.objEnd=function(t){this.ctx.val+=">> \r\nendobj\r\n";}, t.outline.count_r=function(t,e){for(var n=0;n<e.children.length;n++)t.count++, this.count_r(t,e.children[n]);return t.count};}]);}(e.API), function(t){var e=function(){return"function"!=typeof PNG||"function"!=typeof s},n=function(e){return e!==t.image_compression.NONE&&r()},r=function(){var t="function"==typeof o;if(!t)throw new Error("requires deflate.js for compression");return t},i=function(e,n,r,i){var s=5,u=f;switch(i){case t.image_compression.FAST:s=3, u=h;break;case t.image_compression.MEDIUM:s=6, u=d;break;case t.image_compression.SLOW:s=9, u=p;}e=l(e,n,r,u);var m=new Uint8Array(a(s)),g=c(e),w=new o(s),y=w.append(e),v=w.flush(),b=m.length+y.length+v.length,x=new Uint8Array(b+4);return x.set(m), x.set(y,m.length), x.set(v,m.length+y.length), x[b++]=g>>>24&255, x[b++]=g>>>16&255, x[b++]=g>>>8&255, x[b++]=255&g, t.arrayBufferToBinaryString(x)},a=function(t,e){var n=Math.LOG2E*Math.log(32768)-8<<4|8,r=n<<8;return r|=Math.min(3,(e-1&255)>>1)<<6, r|=0, r+=31-r%31, [n,255&r]},c=function(t,e){for(var n,r=1,i=0,o=t.length,a=0;o>0;){o-=n=o>e?e:o;do{i+=r+=t[a++];}while(--n);r%=65521, i%=65521;}return(i<<16|r)>>>0},l=function(t,e,n,r){for(var i,o,a,s=t.length/e,c=new Uint8Array(t.length+s),l=g(),u=0;u<s;u++){if(a=u*e, i=t.subarray(a,a+e), r)c.set(r(i,n,o),a+u);else{for(var h=0,f=l.length,d=[];h<f;h++)d[h]=l[h](i,n,o);var p=w(d.concat());c.set(d[p],a+u);}o=i;}return c},u=function(t,e,n){var r=Array.apply([],t);return r.unshift(0), r},h=function(t,e,n){var r,i=[],o=0,a=t.length;for(i[0]=1;o<a;o++)r=t[o-e]||0, i[o+1]=t[o]-r+256&255;return i},f=function(t,e,n){var r,i=[],o=0,a=t.length;for(i[0]=2;o<a;o++)r=n&&n[o]||0, i[o+1]=t[o]-r+256&255;return i},d=function(t,e,n){var r,i,o=[],a=0,s=t.length;for(o[0]=3;a<s;a++)r=t[a-e]||0, i=n&&n[a]||0, o[a+1]=t[a]+256-(r+i>>>1)&255;return o},p=function(t,e,n){var r,i,o,a,s=[],c=0,l=t.length;for(s[0]=4;c<l;c++)r=t[c-e]||0, i=n&&n[c]||0, o=n&&n[c-e]||0, a=m(r,i,o), s[c+1]=t[c]-a+256&255;return s},m=function(t,e,n){var r=t+e-n,i=Math.abs(r-t),o=Math.abs(r-e),a=Math.abs(r-n);return i<=o&&i<=a?t:o<=a?e:n},g=function(){return[u,h,f,d,p]},w=function(t){for(var e,n,r,i=0,o=t.length;i<o;)((e=y(t[i].slice(1)))<n||!n)&&(n=e, r=i), i++;return r},y=function(t){for(var e=0,n=t.length,r=0;e<n;)r+=Math.abs(t[e++]);return r},v=function(e){var n;switch(e){case t.image_compression.FAST:n=11;break;case t.image_compression.MEDIUM:n=13;break;case t.image_compression.SLOW:n=14;break;default:n=12;}return n};t.processPNG=function(t,r,o,a,s){var c,l,u,h,f,d,p=this.color_spaces.DEVICE_RGB,m=this.decode.FLATE_DECODE,g=8;if(this.isArrayBuffer(t)&&(t=new Uint8Array(t)), this.isArrayBufferView(t)){if(e())throw new Error("PNG support requires png.js and zlib.js");if(c=new PNG(t), t=c.imgData, g=c.bits, p=c.colorSpace, h=c.colors, -1!==[4,6].indexOf(c.colorType)){if(8===c.bits)for(var w,y=(I=32==c.pixelBitlength?new Uint32Array(c.decodePixels().buffer):16==c.pixelBitlength?new Uint16Array(c.decodePixels().buffer):new Uint8Array(c.decodePixels().buffer)).length,b=new Uint8Array(y*c.colors),x=new Uint8Array(y),k=c.pixelBitlength-c.bits,_=0,C=0;_<y;_++){for(A=I[_], w=0;w<k;)b[C++]=A>>>w&255, w+=c.bits;x[_]=A>>>w&255;}if(16===c.bits){for(var A,y=(I=new Uint32Array(c.decodePixels().buffer)).length,b=new Uint8Array(y*(32/c.pixelBitlength)*c.colors),x=new Uint8Array(y*(32/c.pixelBitlength)),S=c.colors>1,_=0,C=0,q=0;_<y;)A=I[_++], b[C++]=A>>>0&255, S&&(b[C++]=A>>>16&255, A=I[_++], b[C++]=A>>>0&255), x[q++]=A>>>16&255;g=8;}n(a)?(t=i(b,c.width*c.colors,c.colors,a), d=i(x,c.width,1,a)):(t=b, d=x, m=null);}if(3===c.colorType&&(p=this.color_spaces.INDEXED, f=c.palette, c.transparency.indexed)){for(var T=c.transparency.indexed,P=0,_=0,y=T.length;_<y;++_)P+=T[_];if((P/=255)===y-1&&-1!==T.indexOf(0))u=[T.indexOf(0)];else if(P!==y){for(var I=c.decodePixels(),x=new Uint8Array(I.length),_=0,y=I.length;_<y;_++)x[_]=T[I[_]];d=i(x,c.width,1);}}var E=v(a);return l=m===this.decode.FLATE_DECODE?"/Predictor "+E+" /Colors "+h+" /BitsPerComponent "+g+" /Columns "+c.width:"/Colors "+h+" /BitsPerComponent "+g+" /Columns "+c.width, (this.isArrayBuffer(t)||this.isArrayBufferView(t))&&(t=this.arrayBufferToBinaryString(t)), (d&&this.isArrayBuffer(d)||this.isArrayBufferView(d))&&(d=this.arrayBufferToBinaryString(d)), this.createImageInfo(t,c.width,c.height,p,g,m,r,o,l,u,f,d,E)}throw new Error("Unsupported PNG image data, try using JPEG instead.")};}(e.API), e.API.autoPrint=function(){var t;return this.internal.events.subscribe("postPutResources",function(){t=this.internal.newObject(), this.internal.write("<< /S/Named /Type/Action /N/Print >>","endobj");}), this.internal.events.subscribe("putCatalog",function(){this.internal.write("/OpenAction "+t+" 0 R");}), this}, function(t){var e=t.getCharWidthsArray=function(t,e){e||(e={});var n,r,i,o=e.widths?e.widths:this.internal.getFont().metadata.Unicode.widths,a=o.fof?o.fof:1,s=e.kerning?e.kerning:this.internal.getFont().metadata.Unicode.kerning,c=s.fof?s.fof:1,l=0,u=o[0]||a,h=[];for(n=0, r=t.length;n<r;n++)i=t.charCodeAt(n), h.push((o[i]||u)/a+(s[i]&&s[i][l]||0)/c), l=i;return h},n=function(t){for(var e=t.length,n=0;e;)n+=t[--e];return n},r=t.getStringUnitWidth=function(t,r){return n(e.call(this,t,r))},i=function(t,e,n,r){for(var i=[],o=0,a=t.length,s=0;o!==a&&s+e[o]<n;)s+=e[o], o++;i.push(t.slice(0,o));var c=o;for(s=0;o!==a;)s+e[o]>r&&(i.push(t.slice(c,o)), s=0, c=o), s+=e[o], o++;return c!==o&&i.push(t.slice(c,o)), i},o=function(t,o,a){a||(a={});var s,c,l,u,h,f,d=[],p=[d],m=a.textIndent||0,g=0,w=0,y=t.split(" "),v=e(" ",a)[0];if(f=-1===a.lineIndent?y[0].length+2:a.lineIndent||0){var b=Array(f).join(" "),x=[];y.map(function(t){(t=t.split(/\s*\n/)).length>1?x=x.concat(t.map(function(t,e){return(e&&t.length?"\n":"")+t})):x.push(t[0]);}), y=x, f=r(b,a);}for(l=0, u=y.length;l<u;l++){var k=0;if(s=y[l], f&&"\n"==s[0]&&(s=s.substr(1), k=1), c=e(s,a), w=n(c), m+g+w>o||k){if(w>o){for(h=i(s,c,o-(m+g),o), d.push(h.shift()), d=[h.pop()];h.length;)p.push([h.shift()]);w=n(c.slice(s.length-d[0].length));}else d=[s];p.push(d), m=w+f, g=v;}else d.push(s), m+=g+w, g=v;}if(f)_=function(t,e){return(e?b:"")+t.join(" ")};else var _=function(t){return t.join(" ")};return p.map(_)};t.splitTextToSize=function(t,e,n){n||(n={});var r,i=n.fontSize||this.internal.getFontSize(),a=function(t){var e={0:1},n={};if(t.widths&&t.kerning)return{widths:t.widths,kerning:t.kerning};var r=this.internal.getFont(t.fontName,t.fontStyle);return r.metadata.Unicode?{widths:r.metadata.Unicode.widths||e,kerning:r.metadata.Unicode.kerning||n}:{widths:e,kerning:n}}.call(this,n);r=Array.isArray(t)?t:t.split(/\r?\n/);var s=1*this.internal.scaleFactor*e/i;a.textIndent=n.textIndent?1*n.textIndent*this.internal.scaleFactor/i:0, a.lineIndent=n.lineIndent;var c,l,u=[];for(c=0, l=r.length;c<l;c++)u=u.concat(o(r[c],s,a));return u};}(e.API), function(t){var e=function(t){for(var e={},n=0;n<"klmnopqrstuvwxyz".length;n++)e["klmnopqrstuvwxyz"[n]]="0123456789abcdef"[n];var r,i,o,a,s={},c=1,l=s,u=[],h="",f="",d=t.length-1;for(n=1;n!=d;)a=t[n], n+=1, "'"==a?r?(o=r.join(""), r=void 0):r=[]:r?r.push(a):"{"==a?(u.push([l,o]), l={}, o=void 0):"}"==a?((i=u.pop())[0][i[1]]=l, o=void 0, l=i[0]):"-"==a?c=-1:void 0===o?e.hasOwnProperty(a)?(h+=e[a], o=parseInt(h,16)*c, c=1, h=""):h+=a:e.hasOwnProperty(a)?(f+=e[a], l[o]=parseInt(f,16)*c, c=1, o=void 0, f=""):f+=a;return s},n={codePages:["WinAnsiEncoding"],WinAnsiEncoding:e("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")},r={Unicode:{Courier:n,"Courier-Bold":n,"Courier-BoldOblique":n,"Courier-Oblique":n,Helvetica:n,"Helvetica-Bold":n,"Helvetica-BoldOblique":n,"Helvetica-Oblique":n,"Times-Roman":n,"Times-Bold":n,"Times-BoldItalic":n,"Times-Italic":n}},i={Unicode:{"Courier-Oblique":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic":e("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),"Helvetica-Bold":e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),Courier:e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold":e("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),Helvetica:e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),"Helvetica-BoldOblique":e("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),"Courier-Bold":e("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic":e("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),"Times-Roman":e("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),"Helvetica-Oblique":e("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}};t.events.push(["addFont",function(t){var e,n,o;(e=i.Unicode[t.PostScriptName])&&((n=t.metadata.Unicode?t.metadata.Unicode:t.metadata.Unicode={}).widths=e.widths, n.kerning=e.kerning), (o=r.Unicode[t.PostScriptName])&&((n=t.metadata.Unicode?t.metadata.Unicode:t.metadata.Unicode={}).encoding=o, o.codePages&&o.codePages.length&&(t.encoding=o.codePages[0]));}]);}(e.API), e.API.addSVG=function(t,e,n,r,i){function o(t,e){var n=e.createElement("style");n.type="text/css", n.styleSheet?n.styleSheet.cssText=t:n.appendChild(e.createTextNode(t)), e.getElementsByTagName("head")[0].appendChild(n);}if(void 0===e||void 0===n)throw new Error("addSVG needs values for 'x' and 'y'");var a=function(t,e){var n=(e.contentWindow||e.contentDocument).document;return n.write(t), n.close(), n.getElementsByTagName("svg")[0]}(t,function(t){var e=t.createElement("iframe");return o(".jsPDF_sillysvg_iframe {display:none;position:absolute;}",t), e.name="childframe", e.setAttribute("width",0), e.setAttribute("height",0), e.setAttribute("frameborder","0"), e.setAttribute("scrolling","no"), e.setAttribute("seamless","seamless"), e.setAttribute("class","jsPDF_sillysvg_iframe"), t.body.appendChild(e), e}(document)),s=[1,1],c=parseFloat(a.getAttribute("width")),l=parseFloat(a.getAttribute("height"));c&&l&&(r&&i?s=[r/c,i/l]:r?s=[r/c,r/c]:i&&(s=[i/l,i/l]));var u,h,f,d,p=a.childNodes;for(u=0, h=p.length;u<h;u++)(f=p[u]).tagName&&"PATH"===f.tagName.toUpperCase()&&((d=function(t){for(var e=parseFloat(t[1]),n=parseFloat(t[2]),r=[],i=3,o=t.length;i<o;)"c"===t[i]?(r.push([parseFloat(t[i+1]),parseFloat(t[i+2]),parseFloat(t[i+3]),parseFloat(t[i+4]),parseFloat(t[i+5]),parseFloat(t[i+6])]), i+=7):"l"===t[i]?(r.push([parseFloat(t[i+1]),parseFloat(t[i+2])]), i+=3):i+=1;return[e,n,r]}(f.getAttribute("d").split(" ")))[0]=d[0]*s[0]+e, d[1]=d[1]*s[1]+n, this.lines.call(this,d[2],d[0],d[1],s));return this}, e.API.putTotalPages=function(t){for(var e=new RegExp(t,"g"),n=1;n<=this.internal.getNumberOfPages();n++)for(var r=0;r<this.internal.pages[n].length;r++)this.internal.pages[n][r]=this.internal.pages[n][r].replace(e,this.internal.getNumberOfPages());return this}, function(t){var n="",r="",i="";e.API.addMetadata=function(t,e){return r=e||"http://jspdf.default.namespaceuri/", n=t, this.internal.events.subscribe("postPutResources",function(){if(n){var t='<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="'+r+'"><jspdf:metadata>',e=unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')),o=unescape(encodeURIComponent(t)),a=unescape(encodeURIComponent(n)),s=unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")),c=unescape(encodeURIComponent("</x:xmpmeta>")),l=o.length+a.length+s.length+e.length+c.length;i=this.internal.newObject(), this.internal.write("<< /Type /Metadata /Subtype /XML /Length "+l+" >>"), this.internal.write("stream"), this.internal.write(e+o+a+s+c), this.internal.write("endstream"), this.internal.write("endobj");}else i="";}), this.internal.events.subscribe("putCatalog",function(){i&&this.internal.write("/Metadata "+i+" 0 R");}), this};}(), function(t){if(t.URL=t.URL||t.webkitURL, t.Blob&&t.URL)try{return void new Blob}catch(t){}var e=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||function(t){var e=function(t){return Object.prototype.toString.call(t).match(/^\[object\s(.*)\]$/)[1]},n=function(){this.data=[];},r=function(t,e,n){this.data=t, this.size=t.length, this.type=e, this.encoding=n;},i=n.prototype,o=r.prototype,a=t.FileReaderSync,s=function(t){this.code=this[this.name=t];},c="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),l=c.length,u=t.URL||t.webkitURL||t,h=u.createObjectURL,f=u.revokeObjectURL,d=u,p=t.btoa,m=t.atob,g=t.ArrayBuffer,w=t.Uint8Array,y=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;for(r.fake=o.fake=!0;l--;)s.prototype[c[l]]=l+1;return u.createObjectURL||(d=t.URL=function(t){var e,n=document.createElementNS("http://www.w3.org/1999/xhtml","a");return n.href=t, "origin"in n||("data:"===n.protocol.toLowerCase()?n.origin=null:(e=t.match(y), n.origin=e&&e[1])), n}), d.createObjectURL=function(t){var e,n=t.type;return null===n&&(n="application/octet-stream"), t instanceof r?(e="data:"+n, "base64"===t.encoding?e+";base64,"+t.data:"URI"===t.encoding?e+","+decodeURIComponent(t.data):p?e+";base64,"+p(t.data):e+","+encodeURIComponent(t.data)):h?h.call(u,t):void 0}, d.revokeObjectURL=function(t){"data:"!==t.substring(0,5)&&f&&f.call(u,t);}, i.append=function(t){var n=this.data;if(w&&(t instanceof g||t instanceof w)){for(var i="",o=new w(t),c=0,l=o.length;c<l;c++)i+=String.fromCharCode(o[c]);n.push(i);}else if("Blob"===e(t)||"File"===e(t)){if(!a)throw new s("NOT_READABLE_ERR");var u=new a;n.push(u.readAsBinaryString(t));}else t instanceof r?"base64"===t.encoding&&m?n.push(m(t.data)):"URI"===t.encoding?n.push(decodeURIComponent(t.data)):"raw"===t.encoding&&n.push(t.data):("string"!=typeof t&&(t+=""), n.push(unescape(encodeURIComponent(t))));}, i.getBlob=function(t){return arguments.length||(t=null), new r(this.data.join(""),t,"raw")}, i.toString=function(){return"[object BlobBuilder]"}, o.slice=function(t,e,n){var i=arguments.length;return i<3&&(n=null), new r(this.data.slice(t,i>1?e:this.data.length),n,this.encoding)}, o.toString=function(){return"[object Blob]"}, o.close=function(){this.size=0, delete this.data;}, n}(t);t.Blob=function(t,n){var r=n?n.type||"":"",i=new e;if(t)for(var o=0,a=t.length;o<a;o++)Uint8Array&&t[o]instanceof Uint8Array?i.append(t[o].buffer):i.append(t[o]);var s=i.getBlob(r);return!s.slice&&s.webkitSlice&&(s.slice=s.webkitSlice), s};var n=Object.getPrototypeOf||function(t){return t.__proto__};t.Blob.prototype=n(new t.Blob);}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||(void 0).content||void 0);var r=r||function(t){if(!(void 0===t||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=function(){return t.URL||t.webkitURL||t},n=t.document.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in n,i=function(t){var e=new MouseEvent("click");t.dispatchEvent(e);},o=/constructor/i.test(t.HTMLElement)||t.safari,a=/CriOS\/[\d]+/.test(navigator.userAgent),s=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0);},c=function(t){setTimeout(function(){"string"==typeof t?e().revokeObjectURL(t):t.remove();},4e4);},l=function(t,e,n){for(var r=(e=[].concat(e)).length;r--;){var i=t["on"+e[r]];if("function"==typeof i)try{i.call(t,n||t);}catch(t){s(t);}}},u=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},h=function(s,h,f){f||(s=u(s));var d,p=this,m="application/octet-stream"===s.type,g=function(){l(p,"writestart progress write writeend".split(" "));};if(p.readyState=p.INIT, r)return d=e().createObjectURL(s), void setTimeout(function(){n.href=d, n.download=h, i(n), g(), c(d), p.readyState=p.DONE;});!function(){if((a||m&&o)&&t.FileReader){var n=new FileReader;return n.onloadend=function(){var e=a?n.result:n.result.replace(/^data:[^;]*;/,"data:attachment/file;");t.open(e,"_blank")||(t.location.href=e), e=void 0, p.readyState=p.DONE, g();}, n.readAsDataURL(s), void(p.readyState=p.INIT)}d||(d=e().createObjectURL(s)), m?t.location.href=d:t.open(d,"_blank")||(t.location.href=d), p.readyState=p.DONE, g(), c(d);}();},f=h.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download", n||(t=u(t)), navigator.msSaveOrOpenBlob(t,e)}:(f.abort=function(){}, f.readyState=f.INIT=0, f.WRITING=1, f.DONE=2, f.error=f.onwritestart=f.onprogress=f.onwrite=f.onabort=f.onerror=f.onwriteend=null, function(t,e,n){return new h(t,e||t.name||"download",n)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||(void 0).content);"undefined"!='object'&&module.exports?module.exports.saveAs=r:"undefined"!=typeof undefined&&null!==undefined&&null!==undefined.amd&&undefined("FileSaver.js",function(){return r}), function(t,e){module.exports=e();}(e,function(){var t="function"==typeof ArrayBuffer&&"function"==typeof Uint8Array,e=null,n=function(){if(!t)return function(){return!1};try{var n={};"function"==typeof n.Buffer&&(e=n.Buffer);}catch(t){}return function(t){return t instanceof ArrayBuffer||null!==e&&t instanceof e}}(),r=null!==e?function(t){return new e(t,"utf8").toString("binary")}:function(t){return unescape(encodeURIComponent(t))},i=function(t,e){for(var n=65535&t,r=t>>>16,i=0,o=e.length;i<o;i++)r=(r+(n=(n+(255&e.charCodeAt(i)))%65521))%65521;return(r<<16|n)>>>0},o=function(t,e){for(var n=65535&t,r=t>>>16,i=0,o=e.length;i<o;i++)r=(r+(n=(n+e[i])%65521))%65521;return(r<<16|n)>>>0},a={},s=a.Adler32=function(){var e=function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(!isFinite(t=null==t?1:+t))throw new Error("First arguments needs to be a finite number.");this.checksum=t>>>0;},a=e.prototype={};return a.constructor=e, e.from=function(t){return t.prototype=a, t}(function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(null==t)throw new Error("First argument needs to be a string.");this.checksum=i(1,t.toString());}), e.fromUtf8=function(t){return t.prototype=a, t}(function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(null==t)throw new Error("First argument needs to be a string.");var n=r(t.toString());this.checksum=i(1,n);}), t&&(e.fromBuffer=function(t){return t.prototype=a, t}(function(t){if(!(this instanceof e))throw new TypeError("Constructor cannot called be as a function.");if(!n(t))throw new Error("First argument needs to be ArrayBuffer.");var r=new Uint8Array(t);return this.checksum=o(1,r)})), a.update=function(t){if(null==t)throw new Error("First argument needs to be a string.");return t=t.toString(), this.checksum=i(this.checksum,t)}, a.updateUtf8=function(t){if(null==t)throw new Error("First argument needs to be a string.");var e=r(t.toString());return this.checksum=i(this.checksum,e)}, t&&(a.updateBuffer=function(t){if(!n(t))throw new Error("First argument needs to be ArrayBuffer.");var e=new Uint8Array(t);return this.checksum=o(this.checksum,e)}), a.clone=function(){return new s(this.checksum)}, e}();return a.from=function(t){if(null==t)throw new Error("First argument needs to be a string.");return i(1,t.toString())}, a.fromUtf8=function(t){if(null==t)throw new Error("First argument needs to be a string.");var e=r(t.toString());return i(1,e)}, t&&(a.fromBuffer=function(t){if(!n(t))throw new Error("First argument need to be ArrayBuffer.");var e=new Uint8Array(t);return o(1,e)}), a});/**
 * CssColors
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
var i={};i._colorsTable={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"}, i.colorNameToHex=function(t){return t=t.toLowerCase(), void 0!==this._colorsTable[t]&&this._colorsTable[t]};/*
 Deflate.js - https://github.com/gildas-lormeau/zip.js
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var o=function(t){function e(){function t(t){var e,n,i,o,a,c,l=r.dyn_tree,u=r.stat_desc.static_tree,h=r.stat_desc.extra_bits,d=r.stat_desc.extra_base,p=r.stat_desc.max_length,m=0;for(o=0;o<=s;o++)t.bl_count[o]=0;for(l[2*t.heap[t.heap_max]+1]=0, e=t.heap_max+1;e<f;e++)(o=l[2*l[2*(n=t.heap[e])+1]+1]+1)>p&&(o=p, m++), l[2*n+1]=o, n>r.max_code||(t.bl_count[o]++, a=0, n>=d&&(a=h[n-d]), c=l[2*n], t.opt_len+=c*(o+a), u&&(t.static_len+=c*(u[2*n+1]+a)));if(0!==m){do{for(o=p-1;0===t.bl_count[o];)o--;t.bl_count[o]--, t.bl_count[o+1]+=2, t.bl_count[p]--, m-=2;}while(m>0);for(o=p;0!==o;o--)for(n=t.bl_count[o];0!==n;)(i=t.heap[--e])>r.max_code||(l[2*i+1]!=o&&(t.opt_len+=(o-l[2*i+1])*l[2*i], l[2*i+1]=o), n--);}}function e(t,e){var n=0;do{n|=1&t, t>>>=1, n<<=1;}while(--e>0);return n>>>1}function n(t,n,r){var i,o,a,c=[],l=0;for(i=1;i<=s;i++)c[i]=l=l+r[i-1]<<1;for(o=0;o<=n;o++)0!==(a=t[2*o+1])&&(t[2*o]=e(c[a]++,a));}var r=this;r.build_tree=function(e){var i,o,a,s=r.dyn_tree,c=r.stat_desc.static_tree,l=r.stat_desc.elems,u=-1;for(e.heap_len=0, e.heap_max=f, i=0;i<l;i++)0!==s[2*i]?(e.heap[++e.heap_len]=u=i, e.depth[i]=0):s[2*i+1]=0;for(;e.heap_len<2;)s[2*(a=e.heap[++e.heap_len]=u<2?++u:0)]=1, e.depth[a]=0, e.opt_len--, c&&(e.static_len-=c[2*a+1]);for(r.max_code=u, i=Math.floor(e.heap_len/2);i>=1;i--)e.pqdownheap(s,i);a=l;do{i=e.heap[1], e.heap[1]=e.heap[e.heap_len--], e.pqdownheap(s,1), o=e.heap[1], e.heap[--e.heap_max]=i, e.heap[--e.heap_max]=o, s[2*a]=s[2*i]+s[2*o], e.depth[a]=Math.max(e.depth[i],e.depth[o])+1, s[2*i+1]=s[2*o+1]=a, e.heap[1]=a++, e.pqdownheap(s,1);}while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1], t(e), n(s,r.max_code,e.bl_count);};}function n(t,e,n,r,i){var o=this;o.static_tree=t, o.extra_bits=e, o.extra_base=n, o.elems=r, o.max_length=i;}function r(t,e,n,r,i){var o=this;o.good_length=t, o.max_lazy=e, o.nice_length=n, o.max_chain=r, o.func=i;}function i(t,e,n,r){var i=t[2*e],o=t[2*n];return i<o||i==o&&r[e]<=r[n]}function o(){function t(){var t;for(Pt=2*At, Et[Ft-1]=0, t=0;t<Ft-1;t++)Et[t]=0;Vt=z[Gt].max_lazy, Jt=z[Gt].good_length, Qt=z[Gt].nice_length, Xt=z[Gt].max_chain, Mt=0, jt=0, Ht=0, zt=Wt=$-1, Lt=0, Ot=0;}function r(){var t;for(t=0;t<h;t++)Kt[2*t]=0;for(t=0;t<c;t++)$t[2*t]=0;for(t=0;t<l;t++)Zt[2*t]=0;Kt[2*d]=1, te.opt_len=te.static_len=0, ae=ce=0;}function o(){ee.dyn_tree=Kt, ee.stat_desc=n.static_l_desc, ne.dyn_tree=$t, ne.stat_desc=n.static_d_desc, re.dyn_tree=Zt, re.stat_desc=n.static_bl_desc, ue=0, he=0, le=8, r();}function a(t,e){var n,r,i=-1,o=t[1],a=0,s=7,c=4;for(0===o&&(s=138, c=3), t[2*(e+1)+1]=65535, n=0;n<=e;n++)r=o, o=t[2*(n+1)+1], ++a<s&&r==o||(a<c?Zt[2*r]+=a:0!==r?(r!=i&&Zt[2*r]++, Zt[2*p]++):a<=10?Zt[2*m]++:Zt[2*g]++, a=0, i=r, 0===o?(s=138, c=3):r==o?(s=6, c=3):(s=7, c=4));}function s(){var t;for(a(Kt,ee.max_code), a($t,ne.max_code), re.build_tree(te), t=l-1;t>=3&&0===Zt[2*e.bl_order[t]+1];t--);return te.opt_len+=3*(t+1)+5+5+4, t}function f(t){te.pending_buf[te.pending++]=t;}function O(t){f(255&t), f(t>>>8&255);}function et(t){f(t>>8&255), f(255&t);}function nt(t,e){var n,r=e;he>w-r?(O(ue|=(n=t)<<he&65535), ue=n>>>w-he, he+=r-w):(ue|=t<<he&65535, he+=r);}function rt(t,e){var n=2*t;nt(65535&e[n],65535&e[n+1]);}function it(t,e){var n,r,i=-1,o=t[1],a=0,s=7,c=4;for(0===o&&(s=138, c=3), n=0;n<=e;n++)if(r=o, o=t[2*(n+1)+1], !(++a<s&&r==o)){if(a<c)do{rt(r,Zt);}while(0!=--a);else 0!==r?(r!=i&&(rt(r,Zt), a--), rt(p,Zt), nt(a-3,2)):a<=10?(rt(m,Zt), nt(a-3,3)):(rt(g,Zt), nt(a-11,7));a=0, i=r, 0===o?(s=138, c=3):r==o?(s=6, c=3):(s=7, c=4);}}function ot(t,n,r){var i;for(nt(t-257,5), nt(n-1,5), nt(r-4,4), i=0;i<r;i++)nt(Zt[2*e.bl_order[i]+1],3);it(Kt,t-1), it($t,n-1);}function at(){16==he?(O(ue), ue=0, he=0):he>=8&&(f(255&ue), ue>>>=8, he-=8);}function st(){nt(Q<<1,3), rt(d,n.static_ltree), at(), 1+le+10-he<9&&(nt(Q<<1,3), rt(d,n.static_ltree), at()), le=7;}function ct(t,n){var r,i,o;if(te.pending_buf[se+2*ae]=t>>>8&255, te.pending_buf[se+2*ae+1]=255&t, te.pending_buf[ie+ae]=255&n, ae++, 0===t?Kt[2*n]++:(ce++, t--, Kt[2*(e._length_code[n]+u+1)]++, $t[2*e.d_code(t)]++), 0==(8191&ae)&&Gt>2){for(r=8*ae, i=Mt-jt, o=0;o<c;o++)r+=$t[2*o]*(5+e.extra_dbits[o]);if(r>>>=3, ce<Math.floor(ae/2)&&r<Math.floor(i/2))return!0}return ae==oe-1}function lt(t,n){var r,i,o,a,s=0;if(0!==ae)do{r=te.pending_buf[se+2*s]<<8&65280|255&te.pending_buf[se+2*s+1], i=255&te.pending_buf[ie+s], s++, 0===r?rt(i,t):(rt((o=e._length_code[i])+u+1,t), 0!==(a=e.extra_lbits[o])&&nt(i-=e.base_length[o],a), r--, rt(o=e.d_code(r),n), 0!==(a=e.extra_dbits[o])&&nt(r-=e.base_dist[o],a));}while(s<ae);rt(d,t), le=t[2*d+1];}function ut(){he>8?O(ue):he>0&&f(255&ue), ue=0, he=0;}function ht(t,e,n){ut(), le=8, n&&(O(e), O(~e)), te.pending_buf.set(Tt.subarray(t,t+e),te.pending), te.pending+=e;}function ft(t,e,n){nt((J<<1)+(n?1:0),3), ht(t,e,!0);}function dt(t,e,i){var o,a,c=0;Gt>0?(ee.build_tree(te), ne.build_tree(te), c=s(), o=te.opt_len+3+7>>>3, (a=te.static_len+3+7>>>3)<=o&&(o=a)):o=a=e+5, e+4<=o&&-1!=t?ft(t,e,i):a==o?(nt((Q<<1)+(i?1:0),3), lt(n.static_ltree,n.static_dtree)):(nt((K<<1)+(i?1:0),3), ot(ee.max_code+1,ne.max_code+1,c+1), lt(Kt,$t)), r(), i&&ut();}function pt(t){dt(jt>=0?jt:-1,Mt-jt,t), jt=Mt, xt.flush_pending();}function mt(){var t,e,n,r;do{if(0===(r=Pt-Ht-Mt)&&0===Mt&&0===Ht)r=At;else if(-1==r)r--;else if(Mt>=At+At-tt){Tt.set(Tt.subarray(At,At+At),0), Ut-=At, Mt-=At, jt-=At, n=t=Ft;do{e=65535&Et[--n], Et[n]=e>=At?e-At:0;}while(0!=--t);n=t=At;do{e=65535&It[--n], It[n]=e>=At?e-At:0;}while(0!=--t);r+=At;}if(0===xt.avail_in)return;t=xt.read_buf(Tt,Mt+Ht,r), (Ht+=t)>=$&&(Ot=255&Tt[Mt], Ot=(Ot<<Dt^255&Tt[Mt+1])&Rt);}while(Ht<tt&&0!==xt.avail_in)}function gt(t){var e,n=65535;for(n>_t-5&&(n=_t-5);;){if(Ht<=1){if(mt(), 0===Ht&&t==k)return L;if(0===Ht)break}if(Mt+=Ht, Ht=0, e=jt+n, (0===Mt||Mt>=e)&&(Ht=Mt-e, Mt=e, pt(!1), 0===xt.avail_out))return L;if(Mt-jt>=At-tt&&(pt(!1), 0===xt.avail_out))return L}return pt(t==A), 0===xt.avail_out?t==A?U:L:t==A?H:M}function wt(t){var e,n,r=Xt,i=Mt,o=Wt,a=Mt>At-tt?Mt-(At-tt):0,s=Qt,c=qt,l=Mt+Z,u=Tt[i+o-1],h=Tt[i+o];Wt>=Jt&&(r>>=2), s>Ht&&(s=Ht);do{if(e=t, Tt[e+o]==h&&Tt[e+o-1]==u&&Tt[e]==Tt[i]&&Tt[++e]==Tt[i+1]){i+=2, e++;do{}while(Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&Tt[++i]==Tt[++e]&&i<l);if(n=Z-(l-i), i=l-Z, n>o){if(Ut=t, o=n, n>=s)break;u=Tt[i+o-1], h=Tt[i+o];}}}while((t=65535&It[t&c])>a&&0!=--r);return o<=Ht?o:Ht}function yt(t){for(var e,n=0;;){if(Ht<tt){if(mt(), Ht<tt&&t==k)return L;if(0===Ht)break}if(Ht>=$&&(Ot=(Ot<<Dt^255&Tt[Mt+($-1)])&Rt, n=65535&Et[Ot], It[Mt&qt]=Et[Ot], Et[Ot]=Mt), 0!==n&&(Mt-n&65535)<=At-tt&&Yt!=b&&(zt=wt(n)), zt>=$)if(e=ct(Mt-Ut,zt-$), Ht-=zt, zt<=Vt&&Ht>=$){zt--;do{Ot=(Ot<<Dt^255&Tt[++Mt+($-1)])&Rt, n=65535&Et[Ot], It[Mt&qt]=Et[Ot], Et[Ot]=Mt;}while(0!=--zt);Mt++;}else Mt+=zt, zt=0, Ot=255&Tt[Mt], Ot=(Ot<<Dt^255&Tt[Mt+1])&Rt;else e=ct(0,255&Tt[Mt]), Ht--, Mt++;if(e&&(pt(!1), 0===xt.avail_out))return L}return pt(t==A), 0===xt.avail_out?t==A?U:L:t==A?H:M}function vt(t){for(var e,n,r=0;;){if(Ht<tt){if(mt(), Ht<tt&&t==k)return L;if(0===Ht)break}if(Ht>=$&&(Ot=(Ot<<Dt^255&Tt[Mt+($-1)])&Rt, r=65535&Et[Ot], It[Mt&qt]=Et[Ot], Et[Ot]=Mt), Wt=zt, Nt=Ut, zt=$-1, 0!==r&&Wt<Vt&&(Mt-r&65535)<=At-tt&&(Yt!=b&&(zt=wt(r)), zt<=5&&(Yt==v||zt==$&&Mt-Ut>4096)&&(zt=$-1)), Wt>=$&&zt<=Wt){n=Mt+Ht-$, e=ct(Mt-1-Nt,Wt-$), Ht-=Wt-1, Wt-=2;do{++Mt<=n&&(Ot=(Ot<<Dt^255&Tt[Mt+($-1)])&Rt, r=65535&Et[Ot], It[Mt&qt]=Et[Ot], Et[Ot]=Mt);}while(0!=--Wt);if(Lt=0, zt=$-1, Mt++, e&&(pt(!1), 0===xt.avail_out))return L}else if(0!==Lt){if((e=ct(0,255&Tt[Mt-1]))&&pt(!1), Mt++, Ht--, 0===xt.avail_out)return L}else Lt=1, Mt++, Ht--;}return 0!==Lt&&(e=ct(0,255&Tt[Mt-1]), Lt=0), pt(t==A), 0===xt.avail_out?t==A?U:L:t==A?H:M}function bt(e){return e.total_in=e.total_out=0, e.msg=null, te.pending=0, te.pending_out=0, kt=V, Ct=k, o(), t(), S}var xt,kt,_t,Ct,At,St,qt,Tt,Pt,It,Et,Ot,Ft,Bt,Rt,Dt,jt,zt,Nt,Lt,Mt,Ut,Ht,Wt,Xt,Vt,Gt,Yt,Jt,Qt,Kt,$t,Zt,te=this,ee=new e,ne=new e,re=new e;te.depth=[];var ie,oe,ae,se,ce,le,ue,he;te.bl_count=[], te.heap=[], Kt=[], $t=[], Zt=[], te.pqdownheap=function(t,e){for(var n=te.heap,r=n[e],o=e<<1;o<=te.heap_len&&(o<te.heap_len&&i(t,n[o+1],n[o],te.depth)&&o++, !i(t,r,n[o],te.depth));)n[e]=n[o], e=o, o<<=1;n[e]=r;}, te.deflateInit=function(t,e,n,r,i,o){return r||(r=Y), i||(i=B), o||(o=x), t.msg=null, e==y&&(e=6), i<1||i>F||r!=Y||n<9||n>15||e<0||e>9||o<0||o>b?P:(t.dstate=te, St=n, At=1<<St, qt=At-1, Bt=i+7, Ft=1<<Bt, Rt=Ft-1, Dt=Math.floor((Bt+$-1)/$), Tt=new Uint8Array(2*At), It=[], Et=[], oe=1<<i+6, te.pending_buf=new Uint8Array(4*oe), _t=4*oe, se=Math.floor(oe/2), ie=3*oe, Gt=e, Yt=o, bt(t))}, te.deflateEnd=function(){return kt!=X&&kt!=V&&kt!=G?P:(te.pending_buf=null, Et=null, It=null, Tt=null, te.dstate=null, kt==V?I:S)}, te.deflateParams=function(t,e,n){var r=S;return e==y&&(e=6), e<0||e>9||n<0||n>b?P:(z[Gt].func!=z[e].func&&0!==t.total_in&&(r=t.deflate(_)), Gt!=e&&(Vt=z[Gt=e].max_lazy, Jt=z[Gt].good_length, Qt=z[Gt].nice_length, Xt=z[Gt].max_chain), Yt=n, r)}, te.deflateSetDictionary=function(t,e,n){var r,i=n,o=0;if(!e||kt!=X)return P;if(i<$)return S;for(i>At-tt&&(o=n-(i=At-tt)), Tt.set(e.subarray(o,o+i),0), Mt=i, jt=i, Ot=255&Tt[0], Ot=(Ot<<Dt^255&Tt[1])&Rt, r=0;r<=i-$;r++)Ot=(Ot<<Dt^255&Tt[r+($-1)])&Rt, It[r&qt]=Et[Ot], Et[Ot]=r;return S}, te.deflate=function(t,e){var n,r,i,o,a;if(e>A||e<0)return P;if(!t.next_out||!t.next_in&&0!==t.avail_in||kt==G&&e!=A)return t.msg=N[T-P], P;if(0===t.avail_out)return t.msg=N[T-E], E;if(xt=t, o=Ct, Ct=e, kt==X&&(r=Y+(St-8<<4)<<8, (i=(Gt-1&255)>>1)>3&&(i=3), r|=i<<6, 0!==Mt&&(r|=W), kt=V, et(r+=31-r%31)), 0!==te.pending){if(xt.flush_pending(), 0===xt.avail_out)return Ct=-1, S}else if(0===xt.avail_in&&e<=o&&e!=A)return xt.msg=N[T-E], E;if(kt==G&&0!==xt.avail_in)return t.msg=N[T-E], E;if(0!==xt.avail_in||0!==Ht||e!=k&&kt!=G){switch(a=-1, z[Gt].func){case R:a=gt(e);break;case D:a=yt(e);break;case j:a=vt(e);}if(a!=U&&a!=H||(kt=G), a==L||a==U)return 0===xt.avail_out&&(Ct=-1), S;if(a==M){if(e==_)st();else if(ft(0,0,!1), e==C)for(n=0;n<Ft;n++)Et[n]=0;if(xt.flush_pending(), 0===xt.avail_out)return Ct=-1, S}}return e!=A?S:q};}function a(){var t=this;t.next_in_index=0, t.next_out_index=0, t.avail_in=0, t.total_in=0, t.avail_out=0, t.total_out=0;}var s=15,c=30,l=19,u=256,h=u+1+29,f=2*h+1,d=256,p=16,m=17,g=18,w=16,y=-1,v=1,b=2,x=0,k=0,_=1,C=3,A=4,S=0,q=1,T=2,P=-2,I=-3,E=-5,O=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29];e._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28], e.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0], e.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576], e.d_code=function(t){return t<256?O[t]:O[256+(t>>>7)]}, e.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0], e.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13], e.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7], e.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15], n.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8], n.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5], n.static_l_desc=new n(n.static_ltree,e.extra_lbits,u+1,h,s), n.static_d_desc=new n(n.static_dtree,e.extra_dbits,0,c,s), n.static_bl_desc=new n(null,e.extra_blbits,0,l,7);var F=9,B=8,R=0,D=1,j=2,z=[new r(0,0,0,0,R),new r(4,4,8,4,D),new r(4,5,16,8,D),new r(4,6,32,32,D),new r(4,4,16,16,j),new r(8,16,32,32,j),new r(8,16,128,128,j),new r(8,32,128,256,j),new r(32,128,258,1024,j),new r(32,258,258,4096,j)],N=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],L=0,M=1,U=2,H=3,W=32,X=42,V=113,G=666,Y=8,J=0,Q=1,K=2,$=3,Z=258,tt=Z+$+1;return a.prototype={deflateInit:function(t,e){var n=this;return n.dstate=new o, e||(e=s), n.dstate.deflateInit(n,t,e)},deflate:function(t){var e=this;return e.dstate?e.dstate.deflate(e,t):P},deflateEnd:function(){var t=this;if(!t.dstate)return P;var e=t.dstate.deflateEnd();return t.dstate=null, e},deflateParams:function(t,e){var n=this;return n.dstate?n.dstate.deflateParams(n,t,e):P},deflateSetDictionary:function(t,e){var n=this;return n.dstate?n.dstate.deflateSetDictionary(n,t,e):P},read_buf:function(t,e,n){var r=this,i=r.avail_in;return i>n&&(i=n), 0===i?0:(r.avail_in-=i, t.set(r.next_in.subarray(r.next_in_index,r.next_in_index+i),e), r.next_in_index+=i, r.total_in+=i, i)},flush_pending:function(){var t=this,e=t.dstate.pending;e>t.avail_out&&(e=t.avail_out), 0!==e&&(t.next_out.set(t.dstate.pending_buf.subarray(t.dstate.pending_out,t.dstate.pending_out+e),t.next_out_index), t.next_out_index+=e, t.dstate.pending_out+=e, t.total_out+=e, t.avail_out-=e, t.dstate.pending-=e, 0===t.dstate.pending&&(t.dstate.pending_out=0));}}, function(t){var e=this,n=new a,r=k,i=new Uint8Array(512);void 0===t&&(t=y), n.deflateInit(t), n.next_out=i, e.append=function(t,e){var o,a=[],s=0,c=0,l=0;if(t.length){n.next_in_index=0, n.next_in=t, n.avail_in=t.length;do{if(n.next_out_index=0, n.avail_out=512, n.deflate(r)!=S)throw"deflating: "+n.msg;n.next_out_index&&(512==n.next_out_index?a.push(new Uint8Array(i)):a.push(new Uint8Array(i.subarray(0,n.next_out_index)))), l+=n.next_out_index, e&&n.next_in_index>0&&n.next_in_index!=s&&(e(n.next_in_index), s=n.next_in_index);}while(n.avail_in>0||0===n.avail_out);return o=new Uint8Array(l), a.forEach(function(t){o.set(t,c), c+=t.length;}), o}}, e.flush=function(){var t,e,r=[],o=0,a=0;do{if(n.next_out_index=0, n.avail_out=512, (t=n.deflate(A))!=q&&t!=S)throw"deflating: "+n.msg;512-n.avail_out>0&&r.push(new Uint8Array(i.subarray(0,n.next_out_index))), a+=n.next_out_index;}while(n.avail_in>0||0===n.avail_out);return n.deflateEnd(), e=new Uint8Array(a), r.forEach(function(t){e.set(t,o), o+=t.length;}), e};}}();/*
  html2canvas 0.5.0-beta3 <http://html2canvas.hertzen.com>
  Copyright (c) 2016 Niklas von Hertzen

  Released under  License
*/
!function(t){module.exports=t();}(function(){return function t(e,n,r){function i(a,s){if(!n[a]){if(!e[a]){var c="function"==typeof commonjsRequire&&commonjsRequire;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND", l}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n||t)},u,u.exports,t,e,n,r);}return n[a].exports}for(var o="function"==typeof commonjsRequire&&commonjsRequire,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){(function(t){!function(r){function i(t){throw RangeError(E[t])}function o(t,e){for(var n=t.length;n--;)t[n]=e(t[n]);return t}function a(t,e){return o(t.split(I),e).join(".")}function s(t){for(var e,n,r=[],i=0,o=t.length;i<o;)(e=t.charCodeAt(i++))>=55296&&e<=56319&&i<o?56320==(64512&(n=t.charCodeAt(i++)))?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e), i--):r.push(e);return r}function c(t){return o(t,function(t){var e="";return t>65535&&(e+=B((t-=65536)>>>10&1023|55296), t=56320|1023&t), e+=B(t)}).join("")}function l(t){return t-48<10?t-22:t-65<26?t-65:t-97<26?t-97:b}function u(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function h(t,e,n){var r=0;for(t=n?F(t/C):t>>1, t+=F(t/e);t>O*k>>1;r+=b)t=F(t/O);return F(r+(O+1)*t/(t+_))}function f(t){var e,n,r,o,a,s,u,f,d,p,m=[],g=t.length,w=0,y=S,_=A;for((n=t.lastIndexOf(q))<0&&(n=0), r=0;r<n;++r)t.charCodeAt(r)>=128&&i("not-basic"), m.push(t.charCodeAt(r));for(o=n>0?n+1:0;o<g;){for(a=w, s=1, u=b;o>=g&&i("invalid-input"), ((f=l(t.charCodeAt(o++)))>=b||f>F((v-w)/s))&&i("overflow"), w+=f*s, d=u<=_?x:u>=_+k?k:u-_, !(f<d);u+=b)s>F(v/(p=b-d))&&i("overflow"), s*=p;_=h(w-a,e=m.length+1,0==a), F(w/e)>v-y&&i("overflow"), y+=F(w/e), w%=e, m.splice(w++,0,y);}return c(m)}function d(t){var e,n,r,o,a,c,l,f,d,p,m,g,w,y,_,C=[];for(g=(t=s(t)).length, e=S, n=0, a=A, c=0;c<g;++c)(m=t[c])<128&&C.push(B(m));for(r=o=C.length, o&&C.push(q);r<g;){for(l=v, c=0;c<g;++c)(m=t[c])>=e&&m<l&&(l=m);for(l-e>F((v-n)/(w=r+1))&&i("overflow"), n+=(l-e)*w, e=l, c=0;c<g;++c)if((m=t[c])<e&&++n>v&&i("overflow"), m==e){for(f=n, d=b;p=d<=a?x:d>=a+k?k:d-a, !(f<p);d+=b)_=f-p, y=b-p, C.push(B(u(p+_%y,0))), f=F(_/y);C.push(B(u(f,0))), a=h(n,w,r==o), n=0, ++r;}++n, ++e;}return C.join("")}var p="object"==typeof n&&n,m="object"==typeof e&&e&&e.exports==p&&e,g="object"==typeof t&&t;g.global!==g&&g.window!==g||(r=g);var w,y,v=2147483647,b=36,x=1,k=26,_=38,C=700,A=72,S=128,q="-",T=/^xn--/,P=/[^ -~]/,I=/\x2E|\u3002|\uFF0E|\uFF61/g,E={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},O=b-x,F=Math.floor,B=String.fromCharCode;if(w={version:"1.2.4",ucs2:{decode:s,encode:c},decode:f,encode:d,toASCII:function(t){return a(t,function(t){return P.test(t)?"xn--"+d(t):t})},toUnicode:function(t){return a(t,function(t){return T.test(t)?f(t.slice(4).toLowerCase()):t})}}, p&&!p.nodeType)if(m)m.exports=w;else for(y in w)w.hasOwnProperty(y)&&(p[y]=w[y]);else r.punycode=w;}(this);}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],2:[function(t,e,n){function r(t,e,n){!t.defaultView||e===t.defaultView.pageXOffset&&n===t.defaultView.pageYOffset||t.defaultView.scrollTo(e,n);}function i(t,e){try{e&&(e.width=t.width, e.height=t.height, e.getContext("2d").putImageData(t.getContext("2d").getImageData(0,0,t.width,t.height),0,0));}catch(e){s("Unable to copy canvas content from",t,e);}}function o(t,e){for(var n=3===t.nodeType?document.createTextNode(t.nodeValue):t.cloneNode(!1),r=t.firstChild;r;)!0!==e&&1===r.nodeType&&"SCRIPT"===r.nodeName||n.appendChild(o(r,e)), r=r.nextSibling;return 1===t.nodeType&&(n._scrollTop=t.scrollTop, n._scrollLeft=t.scrollLeft, "CANVAS"===t.nodeName?i(t,n):"TEXTAREA"!==t.nodeName&&"SELECT"!==t.nodeName||(n.value=t.value)), n}function a(t){if(1===t.nodeType){t.scrollTop=t._scrollTop, t.scrollLeft=t._scrollLeft;for(var e=t.firstChild;e;)a(e), e=e.nextSibling;}}var s=t("./log");e.exports=function(t,e,n,i,s,c,l){var u=o(t.documentElement,s.javascriptEnabled),h=e.createElement("iframe");return h.className="html2canvas-container", h.style.visibility="hidden", h.style.position="fixed", h.style.left="-10000px", h.style.top="0px", h.style.border="0", h.width=n, h.height=i, h.scrolling="no", e.body.appendChild(h), new Promise(function(e){var n=h.contentWindow.document;h.contentWindow.onload=h.onload=function(){var t=setInterval(function(){n.body.childNodes.length>0&&(a(n.documentElement), clearInterval(t), "view"===s.type&&(h.contentWindow.scrollTo(c,l), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent)||h.contentWindow.scrollY===l&&h.contentWindow.scrollX===c||(n.documentElement.style.top=-l+"px", n.documentElement.style.left=-c+"px", n.documentElement.style.position="absolute")), e(h));},50);}, n.open(), n.write("<!DOCTYPE html><html></html>"), r(t,c,l), n.replaceChild(n.adoptNode(u),n.documentElement), n.close();})};},{"./log":13}],3:[function(t,e,n){function r(t){this.r=0, this.g=0, this.b=0, this.a=null;this.fromArray(t)||this.namedColor(t)||this.rgb(t)||this.rgba(t)||this.hex6(t)||this.hex3(t);}r.prototype.darken=function(t){var e=1-t;return new r([Math.round(this.r*e),Math.round(this.g*e),Math.round(this.b*e),this.a])}, r.prototype.isTransparent=function(){return 0===this.a}, r.prototype.isBlack=function(){return 0===this.r&&0===this.g&&0===this.b}, r.prototype.fromArray=function(t){return Array.isArray(t)&&(this.r=Math.min(t[0],255), this.g=Math.min(t[1],255), this.b=Math.min(t[2],255), t.length>3&&(this.a=t[3])), Array.isArray(t)};var i=/^#([a-f0-9]{3})$/i;r.prototype.hex3=function(t){var e=null;return null!==(e=t.match(i))&&(this.r=parseInt(e[1][0]+e[1][0],16), this.g=parseInt(e[1][1]+e[1][1],16), this.b=parseInt(e[1][2]+e[1][2],16)), null!==e};var o=/^#([a-f0-9]{6})$/i;r.prototype.hex6=function(t){var e=null;return null!==(e=t.match(o))&&(this.r=parseInt(e[1].substring(0,2),16), this.g=parseInt(e[1].substring(2,4),16), this.b=parseInt(e[1].substring(4,6),16)), null!==e};var a=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;r.prototype.rgb=function(t){var e=null;return null!==(e=t.match(a))&&(this.r=Number(e[1]), this.g=Number(e[2]), this.b=Number(e[3])), null!==e};var s=/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;r.prototype.rgba=function(t){var e=null;return null!==(e=t.match(s))&&(this.r=Number(e[1]), this.g=Number(e[2]), this.b=Number(e[3]), this.a=Number(e[4])), null!==e}, r.prototype.toString=function(){return null!==this.a&&1!==this.a?"rgba("+[this.r,this.g,this.b,this.a].join(",")+")":"rgb("+[this.r,this.g,this.b].join(",")+")"}, r.prototype.namedColor=function(t){t=t.toLowerCase();var e=c[t];if(e)this.r=e[0], this.g=e[1], this.b=e[2];else if("transparent"===t)return this.r=this.g=this.b=this.a=0, !0;return!!e}, r.prototype.isColor=!0;var c={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};e.exports=r;},{}],4:[function(t,e,n){function r(t,e){var n=k++;if((e=e||{}).logging&&(g.options.logging=!0, g.options.start=Date.now()), e.async=void 0===e.async||e.async, e.allowTaint=void 0!==e.allowTaint&&e.allowTaint, e.removeContainer=void 0===e.removeContainer||e.removeContainer, e.javascriptEnabled=void 0!==e.javascriptEnabled&&e.javascriptEnabled, e.imageTimeout=void 0===e.imageTimeout?1e4:e.imageTimeout, e.renderer="function"==typeof e.renderer?e.renderer:f, e.strict=!!e.strict, "string"==typeof t){if("string"!=typeof e.proxy)return Promise.reject("Proxy must be used when rendering url");var r=null!=e.width?e.width:window.innerWidth,a=null!=e.height?e.height:window.innerHeight;return v(u(t),e.proxy,document,r,a,e).then(function(t){return o(t.contentWindow.document.documentElement,t,e,r,a)})}var s=(void 0===t?[document.documentElement]:t.length?t:[t])[0];return s.setAttribute(x+n,n), i(s.ownerDocument,e,s.ownerDocument.defaultView.innerWidth,s.ownerDocument.defaultView.innerHeight,n).then(function(t){return"function"==typeof e.onrendered&&(g("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"), e.onrendered(t)), t})}function i(t,e,n,r,i){return y(t,t,n,r,e,t.defaultView.pageXOffset,t.defaultView.pageYOffset).then(function(a){g("Document cloned");var s=x+i,c="["+s+"='"+i+"']";t.querySelector(c).removeAttribute(s);var l=a.contentWindow,u=l.document.querySelector(c);return("function"==typeof e.onclone?Promise.resolve(e.onclone(l.document)):Promise.resolve(!0)).then(function(){return o(u,a,e,n,r)})})}function o(t,e,n,r,i){var o=e.contentWindow,u=new h(o.document),f=new d(n,u),m=b(t),w="view"===n.type?r:c(o.document),y="view"===n.type?i:l(o.document),v=new n.renderer(w,y,f,n,document);return new p(t,v,u,f,n).ready.then(function(){g("Finished rendering");var r;return r="view"===n.type?s(v.canvas,{width:v.canvas.width,height:v.canvas.height,top:0,left:0,x:0,y:0}):t===o.document.body||t===o.document.documentElement||null!=n.canvas?v.canvas:s(v.canvas,{width:null!=n.width?n.width:m.width,height:null!=n.height?n.height:m.height,top:m.top,left:m.left,x:0,y:0}), a(e,n), r})}function a(t,e){e.removeContainer&&(t.parentNode.removeChild(t), g("Cleaned up container"));}function s(t,e){var n=document.createElement("canvas"),r=Math.min(t.width-1,Math.max(0,e.left)),i=Math.min(t.width,Math.max(1,e.left+e.width)),o=Math.min(t.height-1,Math.max(0,e.top)),a=Math.min(t.height,Math.max(1,e.top+e.height));n.width=e.width, n.height=e.height;var s=i-r,c=a-o;return g("Cropping canvas at:","left:",e.left,"top:",e.top,"width:",s,"height:",c), g("Resulting crop with width",e.width,"and height",e.height,"with x",r,"and y",o), n.getContext("2d").drawImage(t,r,o,s,c,e.x,e.y,s,c), n}function c(t){return Math.max(Math.max(t.body.scrollWidth,t.documentElement.scrollWidth),Math.max(t.body.offsetWidth,t.documentElement.offsetWidth),Math.max(t.body.clientWidth,t.documentElement.clientWidth))}function l(t){return Math.max(Math.max(t.body.scrollHeight,t.documentElement.scrollHeight),Math.max(t.body.offsetHeight,t.documentElement.offsetHeight),Math.max(t.body.clientHeight,t.documentElement.clientHeight))}function u(t){var e=document.createElement("a");return e.href=t, e.href=e.href, e}var h=t("./support"),f=t("./renderers/canvas"),d=t("./imageloader"),p=t("./nodeparser"),m=t("./nodecontainer"),g=t("./log"),w=t("./utils"),y=t("./clone"),v=t("./proxy").loadUrlDocument,b=w.getBounds,x="data-html2canvas-node",k=0;r.CanvasRenderer=f, r.NodeContainer=m, r.log=g, r.utils=w;var _="undefined"==typeof document||"function"!=typeof Object.create||"function"!=typeof document.createElement("canvas").getContext?function(){return Promise.reject("No canvas support")}:r;e.exports=_;},{"./clone":2,"./imageloader":11,"./log":13,"./nodecontainer":14,"./nodeparser":15,"./proxy":16,"./renderers/canvas":20,"./support":22,"./utils":26}],5:[function(t,e,n){function r(t){if(this.src=t, i("DummyImageContainer for",t), !this.promise||!this.image){i("Initiating DummyImageContainer"), r.prototype.image=new Image;var e=this.image;r.prototype.promise=new Promise(function(t,n){e.onload=t, e.onerror=n, e.src=o(), !0===e.complete&&t(e);});}}var i=t("./log"),o=t("./utils").smallImage;e.exports=r;},{"./log":13,"./utils":26}],6:[function(t,e,n){var r=t("./utils").smallImage;e.exports=function(t,e){var n,i,o=document.createElement("div"),a=document.createElement("img"),s=document.createElement("span");o.style.visibility="hidden", o.style.fontFamily=t, o.style.fontSize=e, o.style.margin=0, o.style.padding=0, document.body.appendChild(o), a.src=r(), a.width=1, a.height=1, a.style.margin=0, a.style.padding=0, a.style.verticalAlign="baseline", s.style.fontFamily=t, s.style.fontSize=e, s.style.margin=0, s.style.padding=0, s.appendChild(document.createTextNode("Hidden Text")), o.appendChild(s), o.appendChild(a), n=a.offsetTop-s.offsetTop+1, o.removeChild(s), o.appendChild(document.createTextNode("Hidden Text")), o.style.lineHeight="normal", a.style.verticalAlign="super", i=a.offsetTop-o.offsetTop+1, document.body.removeChild(o), this.baseline=n, this.lineWidth=1, this.middle=i;};},{"./utils":26}],7:[function(t,e,n){function r(){this.data={};}var i=t("./font");r.prototype.getMetrics=function(t,e){return void 0===this.data[t+"-"+e]&&(this.data[t+"-"+e]=new i(t,e)), this.data[t+"-"+e]}, e.exports=r;},{"./font":6}],8:[function(t,e,n){function r(e,n,r){this.image=null, this.src=e;var o=this,a=i(e);this.promise=(n?new Promise(function(t){"about:blank"===e.contentWindow.document.URL||null==e.contentWindow.document.documentElement?e.contentWindow.onload=e.onload=function(){t(e);}:t(e);}):this.proxyLoad(r.proxy,a,r)).then(function(e){return t("./core")(e.contentWindow.document.documentElement,{type:"view",width:e.width,height:e.height,proxy:r.proxy,javascriptEnabled:r.javascriptEnabled,removeContainer:r.removeContainer,allowTaint:r.allowTaint,imageTimeout:r.imageTimeout/2})}).then(function(t){return o.image=t});}var i=t("./utils").getBounds,o=t("./proxy").loadUrlDocument;r.prototype.proxyLoad=function(t,e,n){var r=this.src;return o(r.src,t,r.ownerDocument,e.width,e.height,n)}, e.exports=r;},{"./core":4,"./proxy":16,"./utils":26}],9:[function(t,e,n){function r(t){this.src=t.value, this.colorStops=[], this.type=null, this.x0=.5, this.y0=.5, this.x1=.5, this.y1=.5, this.promise=Promise.resolve(!0);}r.TYPES={LINEAR:1,RADIAL:2}, r.REGEXP_COLORSTOP=/^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i, e.exports=r;},{}],10:[function(t,e,n){e.exports=function(t,e){this.src=t, this.image=new Image;var n=this;this.tainted=null, this.promise=new Promise(function(r,i){n.image.onload=r, n.image.onerror=i, e&&(n.image.crossOrigin="anonymous"), n.image.src=t, !0===n.image.complete&&r(n.image);});};},{}],11:[function(t,e,n){function r(t,e){this.link=null, this.options=t, this.support=e, this.origin=this.getOrigin(window.location.href);}var i=t("./log"),o=t("./imagecontainer"),a=t("./dummyimagecontainer"),s=t("./proxyimagecontainer"),c=t("./framecontainer"),l=t("./svgcontainer"),u=t("./svgnodecontainer"),h=t("./lineargradientcontainer"),f=t("./webkitgradientcontainer"),d=t("./utils").bind;r.prototype.findImages=function(t){var e=[];return t.reduce(function(t,e){switch(e.node.nodeName){case"IMG":return t.concat([{args:[e.node.src],method:"url"}]);case"svg":case"IFRAME":return t.concat([{args:[e.node],method:e.node.nodeName}])}return t},[]).forEach(this.addImage(e,this.loadImage),this), e}, r.prototype.findBackgroundImage=function(t,e){return e.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(t,this.loadImage),this), t}, r.prototype.addImage=function(t,e){return function(n){n.args.forEach(function(r){this.imageExists(t,r)||(t.splice(0,0,e.call(this,n)), i("Added image #"+t.length,"string"==typeof r?r.substring(0,100):r));},this);}}, r.prototype.hasImageBackground=function(t){return"none"!==t.method}, r.prototype.loadImage=function(t){if("url"===t.method){var e=t.args[0];return!this.isSVG(e)||this.support.svg||this.options.allowTaint?e.match(/data:image\/.*;base64,/i)?new o(e.replace(/url\(['"]{0,}|['"]{0,}\)$/gi,""),!1):this.isSameOrigin(e)||!0===this.options.allowTaint||this.isSVG(e)?new o(e,!1):this.support.cors&&!this.options.allowTaint&&this.options.useCORS?new o(e,!0):this.options.proxy?new s(e,this.options.proxy):new a(e):new l(e)}return"linear-gradient"===t.method?new h(t):"gradient"===t.method?new f(t):"svg"===t.method?new u(t.args[0],this.support.svg):"IFRAME"===t.method?new c(t.args[0],this.isSameOrigin(t.args[0].src),this.options):new a(t)}, r.prototype.isSVG=function(t){return"svg"===t.substring(t.length-3).toLowerCase()||l.prototype.isInline(t)}, r.prototype.imageExists=function(t,e){return t.some(function(t){return t.src===e})}, r.prototype.isSameOrigin=function(t){return this.getOrigin(t)===this.origin}, r.prototype.getOrigin=function(t){var e=this.link||(this.link=document.createElement("a"));return e.href=t, e.href=e.href, e.protocol+e.hostname+e.port}, r.prototype.getPromise=function(t){return this.timeout(t,this.options.imageTimeout).catch(function(){return new a(t.src).promise.then(function(e){t.image=e;})})}, r.prototype.get=function(t){var e=null;return this.images.some(function(n){return(e=n).src===t})?e:null}, r.prototype.fetch=function(t){return this.images=t.reduce(d(this.findBackgroundImage,this),this.findImages(t)), this.images.forEach(function(t,e){t.promise.then(function(){i("Succesfully loaded image #"+(e+1),t);},function(n){i("Failed loading image #"+(e+1),t,n);});}), this.ready=Promise.all(this.images.map(this.getPromise,this)), i("Finished searching images"), this}, r.prototype.timeout=function(t,e){var n,r=Promise.race([t.promise,new Promise(function(r,o){n=setTimeout(function(){i("Timed out loading image",t), o(t);},e);})]).then(function(t){return clearTimeout(n), t});return r.catch(function(){clearTimeout(n);}), r}, e.exports=r;},{"./dummyimagecontainer":5,"./framecontainer":8,"./imagecontainer":10,"./lineargradientcontainer":12,"./log":13,"./proxyimagecontainer":17,"./svgcontainer":23,"./svgnodecontainer":24,"./utils":26,"./webkitgradientcontainer":27}],12:[function(t,e,n){function r(t){i.apply(this,arguments), this.type=i.TYPES.LINEAR;var e=r.REGEXP_DIRECTION.test(t.args[0])||!i.REGEXP_COLORSTOP.test(t.args[0]);e?t.args[0].split(/\s+/).reverse().forEach(function(t,e){switch(t){case"left":this.x0=0, this.x1=1;break;case"top":this.y0=0, this.y1=1;break;case"right":this.x0=1, this.x1=0;break;case"bottom":this.y0=1, this.y1=0;break;case"to":var n=this.y0,r=this.x0;this.y0=this.y1, this.x0=this.x1, this.x1=r, this.y1=n;break;case"center":break;default:var i=.01*parseFloat(t,10);if(isNaN(i))break;0===e?(this.y0=i, this.y1=1-this.y0):(this.x0=i, this.x1=1-this.x0);}},this):(this.y0=0, this.y1=1), this.colorStops=t.args.slice(e?1:0).map(function(t){var e=t.match(i.REGEXP_COLORSTOP),n=+e[2],r=0===n?"%":e[3];return{color:new o(e[1]),stop:"%"===r?n/100:null}}), null===this.colorStops[0].stop&&(this.colorStops[0].stop=0), null===this.colorStops[this.colorStops.length-1].stop&&(this.colorStops[this.colorStops.length-1].stop=1), this.colorStops.forEach(function(t,e){null===t.stop&&this.colorStops.slice(e).some(function(n,r){return null!==n.stop&&(t.stop=(n.stop-this.colorStops[e-1].stop)/(r+1)+this.colorStops[e-1].stop, !0)},this);},this);}var i=t("./gradientcontainer"),o=t("./color");r.prototype=Object.create(i.prototype), r.REGEXP_DIRECTION=/^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i, e.exports=r;},{"./color":3,"./gradientcontainer":9}],13:[function(t,e,n){var r=function(){r.options.logging&&window.console&&window.console.log&&Function.prototype.bind.call(window.console.log,window.console).apply(window.console,[Date.now()-r.options.start+"ms","html2canvas:"].concat([].slice.call(arguments,0)));};r.options={logging:!1}, e.exports=r;},{}],14:[function(t,e,n){function r(t,e){this.node=t, this.parent=e, this.stack=null, this.bounds=null, this.borders=null, this.clip=[], this.backgroundClip=[], this.offsetBounds=null, this.visible=null, this.computedStyles=null, this.colors={}, this.styles={}, this.backgroundImages=null, this.transformData=null, this.transformMatrix=null, this.isPseudoElement=!1, this.opacity=null;}function i(t){var e=t.options[t.selectedIndex||0];return e?e.text||"":""}function o(t){if(t&&"matrix"===t[1])return t[2].split(",").map(function(t){return parseFloat(t.trim())});if(t&&"matrix3d"===t[1]){var e=t[2].split(",").map(function(t){return parseFloat(t.trim())});return[e[0],e[1],e[4],e[5],e[12],e[13]]}}function a(t){return-1!==t.toString().indexOf("%")}function s(t){return t.replace("px","")}function c(t){return parseFloat(t)}var l=t("./color"),u=t("./utils"),h=u.getBounds,f=u.parseBackgrounds,d=u.offsetBounds;r.prototype.cloneTo=function(t){t.visible=this.visible, t.borders=this.borders, t.bounds=this.bounds, t.clip=this.clip, t.backgroundClip=this.backgroundClip, t.computedStyles=this.computedStyles, t.styles=this.styles, t.backgroundImages=this.backgroundImages, t.opacity=this.opacity;}, r.prototype.getOpacity=function(){return null===this.opacity?this.opacity=this.cssFloat("opacity"):this.opacity}, r.prototype.assignStack=function(t){this.stack=t, t.children.push(this);}, r.prototype.isElementVisible=function(){return this.node.nodeType===Node.TEXT_NODE?this.parent.visible:"none"!==this.css("display")&&"hidden"!==this.css("visibility")&&!this.node.hasAttribute("data-html2canvas-ignore")&&("INPUT"!==this.node.nodeName||"hidden"!==this.node.getAttribute("type"))}, r.prototype.css=function(t){return this.computedStyles||(this.computedStyles=this.isPseudoElement?this.parent.computedStyle(this.before?":before":":after"):this.computedStyle(null)), this.styles[t]||(this.styles[t]=this.computedStyles[t])}, r.prototype.prefixedCss=function(t){var e=["webkit","moz","ms","o"],n=this.css(t);return void 0===n&&e.some(function(e){return void 0!==(n=this.css(e+t.substr(0,1).toUpperCase()+t.substr(1)))},this), void 0===n?null:n}, r.prototype.computedStyle=function(t){return this.node.ownerDocument.defaultView.getComputedStyle(this.node,t)}, r.prototype.cssInt=function(t){var e=parseInt(this.css(t),10);return isNaN(e)?0:e}, r.prototype.color=function(t){return this.colors[t]||(this.colors[t]=new l(this.css(t)))}, r.prototype.cssFloat=function(t){var e=parseFloat(this.css(t));return isNaN(e)?0:e}, r.prototype.fontWeight=function(){var t=this.css("fontWeight");switch(parseInt(t,10)){case 401:t="bold";break;case 400:t="normal";}return t}, r.prototype.parseClip=function(){var t=this.css("clip").match(this.CLIP);return t?{top:parseInt(t[1],10),right:parseInt(t[2],10),bottom:parseInt(t[3],10),left:parseInt(t[4],10)}:null}, r.prototype.parseBackgroundImages=function(){return this.backgroundImages||(this.backgroundImages=f(this.css("backgroundImage")))}, r.prototype.cssList=function(t,e){var n=(this.css(t)||"").split(",");return n=n[e||0]||n[0]||"auto", 1===(n=n.trim().split(" ")).length&&(n=[n[0],a(n[0])?"auto":n[0]]), n}, r.prototype.parseBackgroundSize=function(t,e,n){var r,i,o=this.cssList("backgroundSize",n);if(a(o[0]))r=t.width*parseFloat(o[0])/100;else{if(/contain|cover/.test(o[0])){var s=t.width/t.height,c=e.width/e.height;return s<c^"contain"===o[0]?{width:t.height*c,height:t.height}:{width:t.width,height:t.width/c}}r=parseInt(o[0],10);}return i="auto"===o[0]&&"auto"===o[1]?e.height:"auto"===o[1]?r/e.width*e.height:a(o[1])?t.height*parseFloat(o[1])/100:parseInt(o[1],10), "auto"===o[0]&&(r=i/e.height*e.width), {width:r,height:i}}, r.prototype.parseBackgroundPosition=function(t,e,n,r){var i,o,s=this.cssList("backgroundPosition",n);return i=a(s[0])?(t.width-(r||e).width)*(parseFloat(s[0])/100):parseInt(s[0],10), o="auto"===s[1]?i/e.width*e.height:a(s[1])?(t.height-(r||e).height)*parseFloat(s[1])/100:parseInt(s[1],10), "auto"===s[0]&&(i=o/e.height*e.width), {left:i,top:o}}, r.prototype.parseBackgroundRepeat=function(t){return this.cssList("backgroundRepeat",t)[0]}, r.prototype.parseTextShadows=function(){var t=this.css("textShadow"),e=[];if(t&&"none"!==t)for(var n=t.match(this.TEXT_SHADOW_PROPERTY),r=0;n&&r<n.length;r++){var i=n[r].match(this.TEXT_SHADOW_VALUES);e.push({color:new l(i[0]),offsetX:i[1]?parseFloat(i[1].replace("px","")):0,offsetY:i[2]?parseFloat(i[2].replace("px","")):0,blur:i[3]?i[3].replace("px",""):0});}return e}, r.prototype.parseTransform=function(){if(!this.transformData)if(this.hasTransform()){var t=this.parseBounds(),e=this.prefixedCss("transformOrigin").split(" ").map(s).map(c);e[0]+=t.left, e[1]+=t.top, this.transformData={origin:e,matrix:this.parseTransformMatrix()};}else this.transformData={origin:[0,0],matrix:[1,0,0,1,0,0]};return this.transformData}, r.prototype.parseTransformMatrix=function(){if(!this.transformMatrix){var t=this.prefixedCss("transform"),e=t?o(t.match(this.MATRIX_PROPERTY)):null;this.transformMatrix=e||[1,0,0,1,0,0];}return this.transformMatrix}, r.prototype.parseBounds=function(){return this.bounds||(this.bounds=this.hasTransform()?d(this.node):h(this.node))}, r.prototype.hasTransform=function(){return"1,0,0,1,0,0"!==this.parseTransformMatrix().join(",")||this.parent&&this.parent.hasTransform()}, r.prototype.getValue=function(){var t=this.node.value||"";return"SELECT"===this.node.tagName?t=i(this.node):"password"===this.node.type&&(t=Array(t.length+1).join("•")), 0===t.length?this.node.placeholder||"":t}, r.prototype.MATRIX_PROPERTY=/(matrix|matrix3d)\((.+)\)/, r.prototype.TEXT_SHADOW_PROPERTY=/((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g, r.prototype.TEXT_SHADOW_VALUES=/(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g, r.prototype.CLIP=/^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/, e.exports=r;},{"./color":3,"./utils":26}],15:[function(t,e,n){function r(t,e,n,r,i){L("Starting NodeParser"), this.renderer=e, this.options=i, this.range=null, this.support=n, this.renderQueue=[], this.stack=new G(!0,1,t.ownerDocument,null);var o=new U(t,null);if(i.background&&e.rectangle(0,0,e.width,e.height,new V(i.background)), t===t.ownerDocument.documentElement){var a=new U(o.color("backgroundColor").isTransparent()?t.ownerDocument.body:t.ownerDocument.documentElement,null);e.rectangle(0,0,e.width,e.height,a.color("backgroundColor"));}o.visibile=o.isElementVisible(), this.createPseudoHideStyles(t.ownerDocument), this.disableAnimations(t.ownerDocument), this.nodes=R([o].concat(this.getChildren(o)).filter(function(t){return t.visible=t.isElementVisible()}).map(this.getPseudoElements,this)), this.fontMetrics=new X, L("Fetched nodes, total:",this.nodes.length), L("Calculate overflow clips"), this.calculateOverflowClips(), L("Start fetching images"), this.images=r.fetch(this.nodes.filter(q)), this.ready=this.images.ready.then(J(function(){return L("Images loaded, starting parsing"), L("Creating stacking contexts"), this.createStackingContexts(), L("Sorting stacking contexts"), this.sortStackingContexts(this.stack), this.parse(this.stack), L("Render queue created with "+this.renderQueue.length+" items"), new Promise(J(function(t){i.async?"function"==typeof i.async?i.async.call(this,this.renderQueue,t):this.renderQueue.length>0?(this.renderIndex=0, this.asyncRenderer(this.renderQueue,t)):t():(this.renderQueue.forEach(this.paint,this), t());},this))},this));}function i(t){return t.parent&&t.parent.clip.length}function o(t){return t.replace(/(\-[a-z])/g,function(t){return t.toUpperCase().replace("-","")})}function a(){}function s(t,e,n,r){return t.map(function(i,o){if(i.width>0){var a=e.left,s=e.top,c=e.width,l=e.height-t[2].width;switch(o){case 0:l=t[0].width, i.args=h({c1:[a,s],c2:[a+c,s],c3:[a+c-t[1].width,s+l],c4:[a+t[3].width,s+l]},r[0],r[1],n.topLeftOuter,n.topLeftInner,n.topRightOuter,n.topRightInner);break;case 1:a=e.left+e.width-t[1].width, c=t[1].width, i.args=h({c1:[a+c,s],c2:[a+c,s+l+t[2].width],c3:[a,s+l],c4:[a,s+t[0].width]},r[1],r[2],n.topRightOuter,n.topRightInner,n.bottomRightOuter,n.bottomRightInner);break;case 2:s=s+e.height-t[2].width, l=t[2].width, i.args=h({c1:[a+c,s+l],c2:[a,s+l],c3:[a+t[3].width,s],c4:[a+c-t[3].width,s]},r[2],r[3],n.bottomRightOuter,n.bottomRightInner,n.bottomLeftOuter,n.bottomLeftInner);break;case 3:c=t[3].width, i.args=h({c1:[a,s+l+t[2].width],c2:[a,s],c3:[a+c,s+t[0].width],c4:[a+c,s+l]},r[3],r[0],n.bottomLeftOuter,n.bottomLeftInner,n.topLeftOuter,n.topLeftInner);}}return i})}function c(t,e,n,r){var i=(Math.sqrt(2)-1)/3*4,o=n*i,a=r*i,s=t+n,c=e+r;return{topLeft:u({x:t,y:c},{x:t,y:c-a},{x:s-o,y:e},{x:s,y:e}),topRight:u({x:t,y:e},{x:t+o,y:e},{x:s,y:c-a},{x:s,y:c}),bottomRight:u({x:s,y:e},{x:s,y:e+a},{x:t+o,y:c},{x:t,y:c}),bottomLeft:u({x:s,y:c},{x:s-o,y:c},{x:t,y:e+a},{x:t,y:e})}}function l(t,e,n){var r=t.left,i=t.top,o=t.width,a=t.height,s=e[0][0]<o/2?e[0][0]:o/2,l=e[0][1]<a/2?e[0][1]:a/2,u=e[1][0]<o/2?e[1][0]:o/2,h=e[1][1]<a/2?e[1][1]:a/2,f=e[2][0]<o/2?e[2][0]:o/2,d=e[2][1]<a/2?e[2][1]:a/2,p=e[3][0]<o/2?e[3][0]:o/2,m=e[3][1]<a/2?e[3][1]:a/2,g=o-u,w=a-d,y=o-f,v=a-m;return{topLeftOuter:c(r,i,s,l).topLeft.subdivide(.5),topLeftInner:c(r+n[3].width,i+n[0].width,Math.max(0,s-n[3].width),Math.max(0,l-n[0].width)).topLeft.subdivide(.5),topRightOuter:c(r+g,i,u,h).topRight.subdivide(.5),topRightInner:c(r+Math.min(g,o+n[3].width),i+n[0].width,g>o+n[3].width?0:u-n[3].width,h-n[0].width).topRight.subdivide(.5),bottomRightOuter:c(r+y,i+w,f,d).bottomRight.subdivide(.5),bottomRightInner:c(r+Math.min(y,o-n[3].width),i+Math.min(w,a+n[0].width),Math.max(0,f-n[1].width),d-n[2].width).bottomRight.subdivide(.5),bottomLeftOuter:c(r,i+v,p,m).bottomLeft.subdivide(.5),bottomLeftInner:c(r+n[3].width,i+v,Math.max(0,p-n[3].width),m-n[2].width).bottomLeft.subdivide(.5)}}function u(t,e,n,r){var i=function(t,e,n){return{x:t.x+(e.x-t.x)*n,y:t.y+(e.y-t.y)*n}};return{start:t,startControl:e,endControl:n,end:r,subdivide:function(o){var a=i(t,e,o),s=i(e,n,o),c=i(n,r,o),l=i(a,s,o),h=i(s,c,o),f=i(l,h,o);return[u(t,a,l,f),u(f,h,c,r)]},curveTo:function(t){t.push(["bezierCurve",e.x,e.y,n.x,n.y,r.x,r.y]);},curveToReversed:function(r){r.push(["bezierCurve",n.x,n.y,e.x,e.y,t.x,t.y]);}}}function h(t,e,n,r,i,o,a){var s=[];return e[0]>0||e[1]>0?(s.push(["line",r[1].start.x,r[1].start.y]), r[1].curveTo(s)):s.push(["line",t.c1[0],t.c1[1]]), n[0]>0||n[1]>0?(s.push(["line",o[0].start.x,o[0].start.y]), o[0].curveTo(s), s.push(["line",a[0].end.x,a[0].end.y]), a[0].curveToReversed(s)):(s.push(["line",t.c2[0],t.c2[1]]), s.push(["line",t.c3[0],t.c3[1]])), e[0]>0||e[1]>0?(s.push(["line",i[1].end.x,i[1].end.y]), i[1].curveToReversed(s)):s.push(["line",t.c4[0],t.c4[1]]), s}function f(t,e,n,r,i,o,a){e[0]>0||e[1]>0?(t.push(["line",r[0].start.x,r[0].start.y]), r[0].curveTo(t), r[1].curveTo(t)):t.push(["line",o,a]), (n[0]>0||n[1]>0)&&t.push(["line",i[0].start.x,i[0].start.y]);}function d(t){return t.cssInt("zIndex")<0}function p(t){return t.cssInt("zIndex")>0}function m(t){return 0===t.cssInt("zIndex")}function g(t){return-1!==["inline","inline-block","inline-table"].indexOf(t.css("display"))}function w(t){return t instanceof G}function y(t){return t.node.data.trim().length>0}function v(t){return/^(normal|none|0px)$/.test(t.parent.css("letterSpacing"))}function b(t){return["TopLeft","TopRight","BottomRight","BottomLeft"].map(function(e){var n=t.css("border"+e+"Radius").split(" ");return n.length<=1&&(n[1]=n[0]), n.map(O)})}function x(t){return t.nodeType===Node.TEXT_NODE||t.nodeType===Node.ELEMENT_NODE}function k(t){var e=t.css("position");return"auto"!==(-1!==["absolute","relative","fixed"].indexOf(e)?t.css("zIndex"):"auto")}function _(t){return"static"!==t.css("position")}function C(t){return"none"!==t.css("float")}function A(t){return-1!==["inline-block","inline-table"].indexOf(t.css("display"))}function S(t){var e=this;return function(){return!t.apply(e,arguments)}}function q(t){return t.node.nodeType===Node.ELEMENT_NODE}function T(t){return!0===t.isPseudoElement}function P(t){return t.node.nodeType===Node.TEXT_NODE}function I(t){return function(e,n){return e.cssInt("zIndex")+t.indexOf(e)/t.length-(n.cssInt("zIndex")+t.indexOf(n)/t.length)}}function E(t){return t.getOpacity()<1}function O(t){return parseInt(t,10)}function F(t){return t.width}function B(t){return t.node.nodeType!==Node.ELEMENT_NODE||-1===["SCRIPT","HEAD","TITLE","OBJECT","BR","OPTION"].indexOf(t.node.nodeName)}function R(t){return[].concat.apply([],t)}function D(t){var e=t.substr(0,1);return e===t.substr(t.length-1)&&e.match(/'|"/)?t.substr(1,t.length-2):t}function j(t){for(var e,n=[],r=0,i=!1;t.length;)z(t[r])===i?((e=t.splice(0,r)).length&&n.push(M.ucs2.encode(e)), i=!i, r=0):r++, r>=t.length&&(e=t.splice(0,r)).length&&n.push(M.ucs2.encode(e));return n}function z(t){return-1!==[32,13,10,9,45].indexOf(t)}function N(t){return/[^\u0000-\u00ff]/.test(t)}var L=t("./log"),M=t("punycode"),U=t("./nodecontainer"),H=t("./textcontainer"),W=t("./pseudoelementcontainer"),X=t("./fontmetrics"),V=t("./color"),G=t("./stackingcontext"),Y=t("./utils"),J=Y.bind,Q=Y.getBounds,K=Y.parseBackgrounds,$=Y.offsetBounds;r.prototype.calculateOverflowClips=function(){this.nodes.forEach(function(t){if(q(t)){T(t)&&t.appendToDOM(), t.borders=this.parseBorders(t);var e="hidden"===t.css("overflow")?[t.borders.clip]:[],n=t.parseClip();n&&-1!==["absolute","fixed"].indexOf(t.css("position"))&&e.push([["rect",t.bounds.left+n.left,t.bounds.top+n.top,n.right-n.left,n.bottom-n.top]]), t.clip=i(t)?t.parent.clip.concat(e):e, t.backgroundClip="hidden"!==t.css("overflow")?t.clip.concat([t.borders.clip]):t.clip, T(t)&&t.cleanDOM();}else P(t)&&(t.clip=i(t)?t.parent.clip:[]);T(t)||(t.bounds=null);},this);}, r.prototype.asyncRenderer=function(t,e,n){n=n||Date.now(), this.paint(t[this.renderIndex++]), t.length===this.renderIndex?e():n+20>Date.now()?this.asyncRenderer(t,e,n):setTimeout(J(function(){this.asyncRenderer(t,e);},this),0);}, r.prototype.createPseudoHideStyles=function(t){this.createStyles(t,"."+W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE+':before { content: "" !important; display: none !important; }.'+W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER+':after { content: "" !important; display: none !important; }');}, r.prototype.disableAnimations=function(t){this.createStyles(t,"* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}");}, r.prototype.createStyles=function(t,e){var n=t.createElement("style");n.innerHTML=e, t.body.appendChild(n);}, r.prototype.getPseudoElements=function(t){var e=[[t]];if(t.node.nodeType===Node.ELEMENT_NODE){var n=this.getPseudoElement(t,":before"),r=this.getPseudoElement(t,":after");n&&e.push(n), r&&e.push(r);}return R(e)}, r.prototype.getPseudoElement=function(t,e){var n=t.computedStyle(e);if(!n||!n.content||"none"===n.content||"-moz-alt-content"===n.content||"none"===n.display)return null;for(var r=D(n.content),i="url"===r.substr(0,3),a=document.createElement(i?"img":"html2canvaspseudoelement"),s=new W(a,t,e),c=n.length-1;c>=0;c--){var l=o(n.item(c));a.style[l]=n[l];}if(a.className=W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE+" "+W.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER, i)return a.src=K(r)[0].args[0], [s];var u=document.createTextNode(r);return a.appendChild(u), [s,new H(u,s)]}, r.prototype.getChildren=function(t){return R([].filter.call(t.node.childNodes,x).map(function(e){var n=[e.nodeType===Node.TEXT_NODE?new H(e,t):new U(e,t)].filter(B);return e.nodeType===Node.ELEMENT_NODE&&n.length&&"TEXTAREA"!==e.tagName?n[0].isElementVisible()?n.concat(this.getChildren(n[0])):[]:n},this))}, r.prototype.newStackingContext=function(t,e){var n=new G(e,t.getOpacity(),t.node,t.parent);t.cloneTo(n), (e?n.getParentStack(this):n.parent.stack).contexts.push(n), t.stack=n;}, r.prototype.createStackingContexts=function(){this.nodes.forEach(function(t){q(t)&&(this.isRootElement(t)||E(t)||k(t)||this.isBodyWithTransparentRoot(t)||t.hasTransform())?this.newStackingContext(t,!0):q(t)&&(_(t)&&m(t)||A(t)||C(t))?this.newStackingContext(t,!1):t.assignStack(t.parent.stack);},this);}, r.prototype.isBodyWithTransparentRoot=function(t){return"BODY"===t.node.nodeName&&t.parent.color("backgroundColor").isTransparent()}, r.prototype.isRootElement=function(t){return null===t.parent}, r.prototype.sortStackingContexts=function(t){t.contexts.sort(I(t.contexts.slice(0))), t.contexts.forEach(this.sortStackingContexts,this);}, r.prototype.parseTextBounds=function(t){return function(e,n,r){if("none"!==t.parent.css("textDecoration").substr(0,4)||0!==e.trim().length){if(this.support.rangeBounds&&!t.parent.hasTransform()){var i=r.slice(0,n).join("").length;return this.getRangeBounds(t.node,i,e.length)}if(t.node&&"string"==typeof t.node.data){var o=t.node.splitText(e.length),a=this.getWrapperBounds(t.node,t.parent.hasTransform());return t.node=o, a}}else this.support.rangeBounds&&!t.parent.hasTransform()||(t.node=t.node.splitText(e.length));return{}}}, r.prototype.getWrapperBounds=function(t,e){var n=t.ownerDocument.createElement("html2canvaswrapper"),r=t.parentNode,i=t.cloneNode(!0);n.appendChild(t.cloneNode(!0)), r.replaceChild(n,t);var o=e?$(n):Q(n);return r.replaceChild(i,n), o}, r.prototype.getRangeBounds=function(t,e,n){var r=this.range||(this.range=t.ownerDocument.createRange());return r.setStart(t,e), r.setEnd(t,e+n), r.getBoundingClientRect()}, r.prototype.parse=function(t){var e=t.contexts.filter(d),n=t.children.filter(q),r=n.filter(S(C)),i=r.filter(S(_)).filter(S(g)),o=n.filter(S(_)).filter(C),s=r.filter(S(_)).filter(g),c=t.contexts.concat(r.filter(_)).filter(m),l=t.children.filter(P).filter(y),u=t.contexts.filter(p);e.concat(i).concat(o).concat(s).concat(c).concat(l).concat(u).forEach(function(t){this.renderQueue.push(t), w(t)&&(this.parse(t), this.renderQueue.push(new a));},this);}, r.prototype.paint=function(t){try{t instanceof a?this.renderer.ctx.restore():P(t)?(T(t.parent)&&t.parent.appendToDOM(), this.paintText(t), T(t.parent)&&t.parent.cleanDOM()):this.paintNode(t);}catch(t){if(L(t), this.options.strict)throw t}}, r.prototype.paintNode=function(t){w(t)&&(this.renderer.setOpacity(t.opacity), this.renderer.ctx.save(), t.hasTransform()&&this.renderer.setTransform(t.parseTransform())), "INPUT"===t.node.nodeName&&"checkbox"===t.node.type?this.paintCheckbox(t):"INPUT"===t.node.nodeName&&"radio"===t.node.type?this.paintRadio(t):this.paintElement(t);}, r.prototype.paintElement=function(t){var e=t.parseBounds();this.renderer.clip(t.backgroundClip,function(){this.renderer.renderBackground(t,e,t.borders.borders.map(F));},this), this.renderer.clip(t.clip,function(){this.renderer.renderBorders(t.borders.borders);},this), this.renderer.clip(t.backgroundClip,function(){switch(t.node.nodeName){case"svg":case"IFRAME":var n=this.images.get(t.node);n?this.renderer.renderImage(t,e,t.borders,n):L("Error loading <"+t.node.nodeName+">",t.node);break;case"IMG":var r=this.images.get(t.node.src);r?this.renderer.renderImage(t,e,t.borders,r):L("Error loading <img>",t.node.src);break;case"CANVAS":this.renderer.renderImage(t,e,t.borders,{image:t.node});break;case"SELECT":case"INPUT":case"TEXTAREA":this.paintFormValue(t);}},this);}, r.prototype.paintCheckbox=function(t){var e=t.parseBounds(),n=Math.min(e.width,e.height),r={width:n-1,height:n-1,top:e.top,left:e.left},i=[3,3],o=[i,i,i,i],a=[1,1,1,1].map(function(t){return{color:new V("#A5A5A5"),width:t}}),c=l(r,o,a);this.renderer.clip(t.backgroundClip,function(){this.renderer.rectangle(r.left+1,r.top+1,r.width-2,r.height-2,new V("#DEDEDE")), this.renderer.renderBorders(s(a,r,c,o)), t.node.checked&&(this.renderer.font(new V("#424242"),"normal","normal","bold",n-3+"px","arial"), this.renderer.text("✔",r.left+n/6,r.top+n-1));},this);}, r.prototype.paintRadio=function(t){var e=t.parseBounds(),n=Math.min(e.width,e.height)-2;this.renderer.clip(t.backgroundClip,function(){this.renderer.circleStroke(e.left+1,e.top+1,n,new V("#DEDEDE"),1,new V("#A5A5A5")), t.node.checked&&this.renderer.circle(Math.ceil(e.left+n/4)+1,Math.ceil(e.top+n/4)+1,Math.floor(n/2),new V("#424242"));},this);}, r.prototype.paintFormValue=function(t){var e=t.getValue();if(e.length>0){var n=t.node.ownerDocument,r=n.createElement("html2canvaswrapper");["lineHeight","textAlign","fontFamily","fontWeight","fontSize","color","paddingLeft","paddingTop","paddingRight","paddingBottom","width","height","borderLeftStyle","borderTopStyle","borderLeftWidth","borderTopWidth","boxSizing","whiteSpace","wordWrap"].forEach(function(e){try{r.style[e]=t.css(e);}catch(t){L("html2canvas: Parse: Exception caught in renderFormValue: "+t.message);}});var i=t.parseBounds();r.style.position="fixed", r.style.left=i.left+"px", r.style.top=i.top+"px", r.textContent=e, n.body.appendChild(r), this.paintText(new H(r.firstChild,t)), n.body.removeChild(r);}}, r.prototype.paintText=function(t){t.applyTextTransform();var e=M.ucs2.decode(t.node.data),n=this.options.letterRendering&&!v(t)||N(t.node.data)?e.map(function(t){return M.ucs2.encode([t])}):j(e),r=t.parent.fontWeight(),i=t.parent.css("fontSize"),o=t.parent.css("fontFamily"),a=t.parent.parseTextShadows();this.renderer.font(t.parent.color("color"),t.parent.css("fontStyle"),t.parent.css("fontVariant"),r,i,o), a.length?this.renderer.fontShadow(a[0].color,a[0].offsetX,a[0].offsetY,a[0].blur):this.renderer.clearShadow(), this.renderer.clip(t.parent.clip,function(){n.map(this.parseTextBounds(t),this).forEach(function(e,r){e&&(this.renderer.text(n[r],e.left,e.bottom), this.renderTextDecoration(t.parent,e,this.fontMetrics.getMetrics(o,i)));},this);},this);}, r.prototype.renderTextDecoration=function(t,e,n){switch(t.css("textDecoration").split(" ")[0]){case"underline":this.renderer.rectangle(e.left,Math.round(e.top+n.baseline+n.lineWidth),e.width,1,t.color("color"));break;case"overline":this.renderer.rectangle(e.left,Math.round(e.top),e.width,1,t.color("color"));break;case"line-through":this.renderer.rectangle(e.left,Math.ceil(e.top+n.middle+n.lineWidth),e.width,1,t.color("color"));}};var Z={inset:[["darken",.6],["darken",.1],["darken",.1],["darken",.6]]};r.prototype.parseBorders=function(t){var e=t.parseBounds(),n=b(t),r=["Top","Right","Bottom","Left"].map(function(e,n){var r=t.css("border"+e+"Style"),i=t.color("border"+e+"Color");"inset"===r&&i.isBlack()&&(i=new V([255,255,255,i.a]));var o=Z[r]?Z[r][n]:null;return{width:t.cssInt("border"+e+"Width"),color:o?i[o[0]](o[1]):i,args:null}}),i=l(e,n,r);return{clip:this.parseBackgroundClip(t,i,r,n,e),borders:s(r,e,i,n)}}, r.prototype.parseBackgroundClip=function(t,e,n,r,i){var o=[];switch(t.css("backgroundClip")){case"content-box":case"padding-box":f(o,r[0],r[1],e.topLeftInner,e.topRightInner,i.left+n[3].width,i.top+n[0].width), f(o,r[1],r[2],e.topRightInner,e.bottomRightInner,i.left+i.width-n[1].width,i.top+n[0].width), f(o,r[2],r[3],e.bottomRightInner,e.bottomLeftInner,i.left+i.width-n[1].width,i.top+i.height-n[2].width), f(o,r[3],r[0],e.bottomLeftInner,e.topLeftInner,i.left+n[3].width,i.top+i.height-n[2].width);break;default:f(o,r[0],r[1],e.topLeftOuter,e.topRightOuter,i.left,i.top), f(o,r[1],r[2],e.topRightOuter,e.bottomRightOuter,i.left+i.width,i.top), f(o,r[2],r[3],e.bottomRightOuter,e.bottomLeftOuter,i.left+i.width,i.top+i.height), f(o,r[3],r[0],e.bottomLeftOuter,e.topLeftOuter,i.left,i.top+i.height);}return o}, e.exports=r;},{"./color":3,"./fontmetrics":7,"./log":13,"./nodecontainer":14,"./pseudoelementcontainer":18,"./stackingcontext":21,"./textcontainer":25,"./utils":26,punycode:1}],16:[function(t,e,n){function r(t,e,n){var r="withCredentials"in new XMLHttpRequest;if(!e)return Promise.reject("No proxy configured");var s=o(r),l=a(e,t,s);return r?c(l):i(n,l,s).then(function(t){return f(t.content)})}function i(t,e,n){return new Promise(function(r,i){var o=t.createElement("script"),a=function(){delete window.html2canvas.proxy[n], t.body.removeChild(o);};window.html2canvas.proxy[n]=function(t){a(), r(t);}, o.src=e, o.onerror=function(t){a(), i(t);}, t.body.appendChild(o);})}function o(t){return t?"":"html2canvas_"+Date.now()+"_"+ ++d+"_"+Math.round(1e5*Math.random())}function a(t,e,n){return t+"?url="+encodeURIComponent(e)+(n.length?"&callback=html2canvas.proxy."+n:"")}function s(t){return function(e){var n,r=new DOMParser;try{n=r.parseFromString(e,"text/html");}catch(t){u("DOMParser not supported, falling back to createHTMLDocument"), n=document.implementation.createHTMLDocument("");try{n.open(), n.write(e), n.close();}catch(t){u("createHTMLDocument write not supported, falling back to document.body.innerHTML"), n.body.innerHTML=e;}}var i=n.querySelector("base");if(!i||!i.href.host){var o=n.createElement("base");o.href=t, n.head.insertBefore(o,n.head.firstChild);}return n}}var c=t("./xhr"),l=t("./utils"),u=t("./log"),h=t("./clone"),f=l.decode64,d=0;n.Proxy=r, n.ProxyURL=function(t,e,n){var r="crossOrigin"in new Image,s=o(r),c=a(e,t,s);return r?Promise.resolve(c):i(n,c,s).then(function(t){return"data:"+t.type+";base64,"+t.content})}, n.loadUrlDocument=function(t,e,n,i,o,a){return new r(t,e,window.document).then(s(t)).then(function(t){return h(t,n,i,o,a,0,0)})};},{"./clone":2,"./log":13,"./utils":26,"./xhr":28}],17:[function(t,e,n){var r=t("./proxy").ProxyURL;e.exports=function(t,e){var n=document.createElement("a");n.href=t, t=n.href, this.src=t, this.image=new Image;var i=this;this.promise=new Promise(function(n,o){i.image.crossOrigin="Anonymous", i.image.onload=n, i.image.onerror=o, new r(t,e,document).then(function(t){i.image.src=t;}).catch(o);});};},{"./proxy":16}],18:[function(t,e,n){function r(t,e,n){i.call(this,t,e), this.isPseudoElement=!0, this.before=":before"===n;}var i=t("./nodecontainer");r.prototype.cloneTo=function(t){r.prototype.cloneTo.call(this,t), t.isPseudoElement=!0, t.before=this.before;}, (r.prototype=Object.create(i.prototype)).appendToDOM=function(){this.before?this.parent.node.insertBefore(this.node,this.parent.node.firstChild):this.parent.node.appendChild(this.node), this.parent.node.className+=" "+this.getHideClass();}, r.prototype.cleanDOM=function(){this.node.parentNode.removeChild(this.node), this.parent.node.className=this.parent.node.className.replace(this.getHideClass(),"");}, r.prototype.getHideClass=function(){return this["PSEUDO_HIDE_ELEMENT_CLASS_"+(this.before?"BEFORE":"AFTER")]}, r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE="___html2canvas___pseudoelement_before", r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER="___html2canvas___pseudoelement_after", e.exports=r;},{"./nodecontainer":14}],19:[function(t,e,n){function r(t,e,n,r,i){this.width=t, this.height=e, this.images=n, this.options=r, this.document=i;}var i=t("./log");r.prototype.renderImage=function(t,e,n,r){var i=t.cssInt("paddingLeft"),o=t.cssInt("paddingTop"),a=t.cssInt("paddingRight"),s=t.cssInt("paddingBottom"),c=n.borders,l=e.width-(c[1].width+c[3].width+i+a),u=e.height-(c[0].width+c[2].width+o+s);this.drawImage(r,0,0,r.image.width||l,r.image.height||u,e.left+i+c[3].width,e.top+o+c[0].width,l,u);}, r.prototype.renderBackground=function(t,e,n){e.height>0&&e.width>0&&(this.renderBackgroundColor(t,e), this.renderBackgroundImage(t,e,n));}, r.prototype.renderBackgroundColor=function(t,e){var n=t.color("backgroundColor");n.isTransparent()||this.rectangle(e.left,e.top,e.width,e.height,n);}, r.prototype.renderBorders=function(t){t.forEach(this.renderBorder,this);}, r.prototype.renderBorder=function(t){t.color.isTransparent()||null===t.args||this.drawShape(t.args,t.color);}, r.prototype.renderBackgroundImage=function(t,e,n){t.parseBackgroundImages().reverse().forEach(function(r,o,a){switch(r.method){case"url":var s=this.images.get(r.args[0]);s?this.renderBackgroundRepeating(t,e,s,a.length-(o+1),n):i("Error loading background-image",r.args[0]);break;case"linear-gradient":case"gradient":var c=this.images.get(r.value);c?this.renderBackgroundGradient(c,e,n):i("Error loading background-image",r.args[0]);break;case"none":break;default:i("Unknown background-image type",r.args[0]);}},this);}, r.prototype.renderBackgroundRepeating=function(t,e,n,r,i){var o=t.parseBackgroundSize(e,n.image,r),a=t.parseBackgroundPosition(e,n.image,r,o);switch(t.parseBackgroundRepeat(r)){case"repeat-x":case"repeat no-repeat":this.backgroundRepeatShape(n,a,o,e,e.left+i[3],e.top+a.top+i[0],99999,o.height,i);break;case"repeat-y":case"no-repeat repeat":this.backgroundRepeatShape(n,a,o,e,e.left+a.left+i[3],e.top+i[0],o.width,99999,i);break;case"no-repeat":this.backgroundRepeatShape(n,a,o,e,e.left+a.left+i[3],e.top+a.top+i[0],o.width,o.height,i);break;default:this.renderBackgroundRepeat(n,a,o,{top:e.top,left:e.left},i[3],i[0]);}}, e.exports=r;},{"./log":13}],20:[function(t,e,n){function r(t,e){o.apply(this,arguments), this.canvas=this.options.canvas||this.document.createElement("canvas"), this.options.canvas||(this.canvas.width=t, this.canvas.height=e), this.ctx=this.canvas.getContext("2d"), this.taintCtx=this.document.createElement("canvas").getContext("2d"), this.ctx.textBaseline="bottom", this.variables={}, s("Initialized CanvasRenderer with size",t,"x",e);}function i(t){return t.length>0}var o=t("../renderer"),a=t("../lineargradientcontainer"),s=t("../log");(r.prototype=Object.create(o.prototype)).setFillStyle=function(t){return this.ctx.fillStyle="object"==typeof t&&t.isColor?t.toString():t, this.ctx}, r.prototype.rectangle=function(t,e,n,r,i){this.setFillStyle(i).fillRect(t,e,n,r);}, r.prototype.circle=function(t,e,n,r){this.setFillStyle(r), this.ctx.beginPath(), this.ctx.arc(t+n/2,e+n/2,n/2,0,2*Math.PI,!0), this.ctx.closePath(), this.ctx.fill();}, r.prototype.circleStroke=function(t,e,n,r,i,o){this.circle(t,e,n,r), this.ctx.strokeStyle=o.toString(), this.ctx.stroke();}, r.prototype.drawShape=function(t,e){this.shape(t), this.setFillStyle(e).fill();}, r.prototype.taints=function(t){if(null===t.tainted){this.taintCtx.drawImage(t.image,0,0);try{this.taintCtx.getImageData(0,0,1,1), t.tainted=!1;}catch(e){this.taintCtx=document.createElement("canvas").getContext("2d"), t.tainted=!0;}}return t.tainted}, r.prototype.drawImage=function(t,e,n,r,i,o,a,s,c){this.taints(t)&&!this.options.allowTaint||this.ctx.drawImage(t.image,e,n,r,i,o,a,s,c);}, r.prototype.clip=function(t,e,n){this.ctx.save(), t.filter(i).forEach(function(t){this.shape(t).clip();},this), e.call(n), this.ctx.restore();}, r.prototype.shape=function(t){return this.ctx.beginPath(), t.forEach(function(t,e){"rect"===t[0]?this.ctx.rect.apply(this.ctx,t.slice(1)):this.ctx[0===e?"moveTo":t[0]+"To"].apply(this.ctx,t.slice(1));},this), this.ctx.closePath(), this.ctx}, r.prototype.font=function(t,e,n,r,i,o){this.setFillStyle(t).font=[e,n,r,i,o].join(" ").split(",")[0];}, r.prototype.fontShadow=function(t,e,n,r){this.setVariable("shadowColor",t.toString()).setVariable("shadowOffsetY",e).setVariable("shadowOffsetX",n).setVariable("shadowBlur",r);}, r.prototype.clearShadow=function(){this.setVariable("shadowColor","rgba(0,0,0,0)");}, r.prototype.setOpacity=function(t){this.ctx.globalAlpha=t;}, r.prototype.setTransform=function(t){this.ctx.translate(t.origin[0],t.origin[1]), this.ctx.transform.apply(this.ctx,t.matrix), this.ctx.translate(-t.origin[0],-t.origin[1]);}, r.prototype.setVariable=function(t,e){return this.variables[t]!==e&&(this.variables[t]=this.ctx[t]=e), this}, r.prototype.text=function(t,e,n){this.ctx.fillText(t,e,n);}, r.prototype.backgroundRepeatShape=function(t,e,n,r,i,o,a,s,c){var l=[["line",Math.round(i),Math.round(o)],["line",Math.round(i+a),Math.round(o)],["line",Math.round(i+a),Math.round(s+o)],["line",Math.round(i),Math.round(s+o)]];this.clip([l],function(){this.renderBackgroundRepeat(t,e,n,r,c[3],c[0]);},this);}, r.prototype.renderBackgroundRepeat=function(t,e,n,r,i,o){var a=Math.round(r.left+e.left+i),s=Math.round(r.top+e.top+o);this.setFillStyle(this.ctx.createPattern(this.resizeImage(t,n),"repeat")), this.ctx.translate(a,s), this.ctx.fill(), this.ctx.translate(-a,-s);}, r.prototype.renderBackgroundGradient=function(t,e){if(t instanceof a){var n=this.ctx.createLinearGradient(e.left+e.width*t.x0,e.top+e.height*t.y0,e.left+e.width*t.x1,e.top+e.height*t.y1);t.colorStops.forEach(function(t){n.addColorStop(t.stop,t.color.toString());}), this.rectangle(e.left,e.top,e.width,e.height,n);}}, r.prototype.resizeImage=function(t,e){var n=t.image;if(n.width===e.width&&n.height===e.height)return n;var r=document.createElement("canvas");return r.width=e.width, r.height=e.height, r.getContext("2d").drawImage(n,0,0,n.width,n.height,0,0,e.width,e.height), r}, e.exports=r;},{"../lineargradientcontainer":12,"../log":13,"../renderer":19}],21:[function(t,e,n){function r(t,e,n,r){i.call(this,n,r), this.ownStacking=t, this.contexts=[], this.children=[], this.opacity=(this.parent?this.parent.stack.opacity:1)*e;}var i=t("./nodecontainer");(r.prototype=Object.create(i.prototype)).getParentStack=function(t){var e=this.parent?this.parent.stack:null;return e?e.ownStacking?e:e.getParentStack(t):t.stack}, e.exports=r;},{"./nodecontainer":14}],22:[function(t,e,n){function r(t){this.rangeBounds=this.testRangeBounds(t), this.cors=this.testCORS(), this.svg=this.testSVG();}r.prototype.testRangeBounds=function(t){var e,n,r=!1;return t.createRange&&(e=t.createRange()).getBoundingClientRect&&((n=t.createElement("boundtest")).style.height="123px", n.style.display="block", t.body.appendChild(n), e.selectNode(n), 123===e.getBoundingClientRect().height&&(r=!0), t.body.removeChild(n)), r}, r.prototype.testCORS=function(){return void 0!==(new Image).crossOrigin}, r.prototype.testSVG=function(){var t=new Image,e=document.createElement("canvas"),n=e.getContext("2d");t.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{n.drawImage(t,0,0), e.toDataURL();}catch(t){return!1}return!0}, e.exports=r;},{}],23:[function(t,e,n){function r(t){this.src=t, this.image=null;var e=this;this.promise=this.hasFabric().then(function(){return e.isInline(t)?Promise.resolve(e.inlineFormatting(t)):i(t)}).then(function(t){return new Promise(function(n){window.html2canvas.svg.fabric.loadSVGFromString(t,e.createCanvas.call(e,n));})});}var i=t("./xhr"),o=t("./utils").decode64;r.prototype.hasFabric=function(){return window.html2canvas.svg&&window.html2canvas.svg.fabric?Promise.resolve():Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))}, r.prototype.inlineFormatting=function(t){return/^data:image\/svg\+xml;base64,/.test(t)?this.decode64(this.removeContentType(t)):this.removeContentType(t)}, r.prototype.removeContentType=function(t){return t.replace(/^data:image\/svg\+xml(;base64)?,/,"")}, r.prototype.isInline=function(t){return/^data:image\/svg\+xml/i.test(t)}, r.prototype.createCanvas=function(t){var e=this;return function(n,r){var i=new window.html2canvas.svg.fabric.StaticCanvas("c");e.image=i.lowerCanvasEl, i.setWidth(r.width).setHeight(r.height).add(window.html2canvas.svg.fabric.util.groupSVGElements(n,r)).renderAll(), t(i.lowerCanvasEl);}}, r.prototype.decode64=function(t){return"function"==typeof window.atob?window.atob(t):o(t)}, e.exports=r;},{"./utils":26,"./xhr":28}],24:[function(t,e,n){function r(t,e){this.src=t, this.image=null;var n=this;this.promise=e?new Promise(function(e,r){n.image=new Image, n.image.onload=e, n.image.onerror=r, n.image.src="data:image/svg+xml,"+(new XMLSerializer).serializeToString(t), !0===n.image.complete&&e(n.image);}):this.hasFabric().then(function(){return new Promise(function(e){window.html2canvas.svg.fabric.parseSVGDocument(t,n.createCanvas.call(n,e));})});}var i=t("./svgcontainer");r.prototype=Object.create(i.prototype), e.exports=r;},{"./svgcontainer":23}],25:[function(t,e,n){function r(t,e){o.call(this,t,e);}function i(t,e,n){if(t.length>0)return e+n.toUpperCase()}var o=t("./nodecontainer");(r.prototype=Object.create(o.prototype)).applyTextTransform=function(){this.node.data=this.transform(this.parent.css("textTransform"));}, r.prototype.transform=function(t){var e=this.node.data;switch(t){case"lowercase":return e.toLowerCase();case"capitalize":return e.replace(/(^|\s|:|-|\(|\))([a-z])/g,i);case"uppercase":return e.toUpperCase();default:return e}}, e.exports=r;},{"./nodecontainer":14}],26:[function(t,e,n){n.smallImage=function(){return"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}, n.bind=function(t,e){return function(){return t.apply(e,arguments)}}, n.decode64=function(t){var e,n,r,i,o,a,s,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l=t.length,u="";for(e=0;e<l;e+=4)o=c.indexOf(t[e])<<2|(n=c.indexOf(t[e+1]))>>4, a=(15&n)<<4|(r=c.indexOf(t[e+2]))>>2, s=(3&r)<<6|(i=c.indexOf(t[e+3])), u+=64===r?String.fromCharCode(o):64===i||-1===i?String.fromCharCode(o,a):String.fromCharCode(o,a,s);return u}, n.getBounds=function(t){if(t.getBoundingClientRect){var e=t.getBoundingClientRect(),n=null==t.offsetWidth?e.width:t.offsetWidth;return{top:e.top,bottom:e.bottom||e.top+e.height,right:e.left+n,left:e.left,width:n,height:null==t.offsetHeight?e.height:t.offsetHeight}}return{}}, n.offsetBounds=function(t){var e=t.offsetParent?n.offsetBounds(t.offsetParent):{top:0,left:0};return{top:t.offsetTop+e.top,bottom:t.offsetTop+t.offsetHeight+e.top,right:t.offsetLeft+e.left+t.offsetWidth,left:t.offsetLeft+e.left,width:t.offsetWidth,height:t.offsetHeight}}, n.parseBackgrounds=function(t){var e,n,r,i,o,a,s,c=[],l=0,u=0,h=function(){e&&('"'===n.substr(0,1)&&(n=n.substr(1,n.length-2)), n&&s.push(n), "-"===e.substr(0,1)&&(i=e.indexOf("-",1)+1)>0&&(r=e.substr(0,i), e=e.substr(i)), c.push({prefix:r,method:e.toLowerCase(),value:o,args:s,image:null})), s=[], e=r=n=o="";};return s=[], e=r=n=o="", t.split("").forEach(function(t){if(!(0===l&&" \r\n\t".indexOf(t)>-1)){switch(t){case'"':a?a===t&&(a=null):a=t;break;case"(":if(a)break;if(0===l)return l=1, void(o+=t);u++;break;case")":if(a)break;if(1===l){if(0===u)return l=0, o+=t, void h();u--;}break;case",":if(a)break;if(0===l)return void h();if(1===l&&0===u&&!e.match(/^url$/i))return s.push(n), n="", void(o+=t)}o+=t, 0===l?e+=t:n+=t;}}), h(), c};},{}],27:[function(t,e,n){function r(t){i.apply(this,arguments), this.type="linear"===t.args[0]?i.TYPES.LINEAR:i.TYPES.RADIAL;}var i=t("./gradientcontainer");r.prototype=Object.create(i.prototype), e.exports=r;},{"./gradientcontainer":9}],28:[function(t,e,n){e.exports=function(t){return new Promise(function(e,n){var r=new XMLHttpRequest;r.open("GET",t), r.onload=function(){200===r.status?e(r.responseText):n(new Error(r.statusText));}, r.onerror=function(){n(new Error("Network Error"));}, r.send();})};},{}]},{},[4])(4)}), function(t){var e;e=function(){function e(t){var e,n,r,i,o,a,s,c,l,u,h,f,d,p,m;for(this.data=t, this.pos=8, this.palette=[], this.imgData=[], this.transparency={}, this.animation=null, this.text={}, a=null;;){switch(e=this.readUInt32(), u=function(){var t,e;for(e=[], s=t=0;t<4;s=++t)e.push(String.fromCharCode(this.data[this.pos++]));return e}.call(this).join("")){case"IHDR":this.width=this.readUInt32(), this.height=this.readUInt32(), this.bits=this.data[this.pos++], this.colorType=this.data[this.pos++], this.compressionMethod=this.data[this.pos++], this.filterMethod=this.data[this.pos++], this.interlaceMethod=this.data[this.pos++];break;case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||1/0,frames:[]};break;case"PLTE":this.palette=this.read(e);break;case"fcTL":a&&this.animation.frames.push(a), this.pos+=4, a={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()}, o=this.readUInt16(), i=this.readUInt16()||100, a.delay=1e3*o/i, a.disposeOp=this.data[this.pos++], a.blendOp=this.data[this.pos++], a.data=[];break;case"IDAT":case"fdAT":for("fdAT"===u&&(this.pos+=4, e-=4), t=(null!=a?a.data:void 0)||this.imgData, s=d=0;0<=e?d<e:d>e;s=0<=e?++d:--d)t.push(this.data[this.pos++]);break;case"tRNS":switch(this.transparency={}, this.colorType){case 3:if(r=this.palette.length/3, this.transparency.indexed=this.read(e), this.transparency.indexed.length>r)throw new Error("More transparent colors than palette size");if((h=r-this.transparency.indexed.length)>0)for(s=p=0;0<=h?p<h:p>h;s=0<=h?++p:--p)this.transparency.indexed.push(255);break;case 0:this.transparency.grayscale=this.read(e)[0];break;case 2:this.transparency.rgb=this.read(e);}break;case"tEXt":c=(f=this.read(e)).indexOf(0), l=String.fromCharCode.apply(String,f.slice(0,c)), this.text[l]=String.fromCharCode.apply(String,f.slice(c+1));break;case"IEND":return a&&this.animation.frames.push(a), this.colors=function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}.call(this), this.hasAlphaChannel=4===(m=this.colorType)||6===m, n=this.colors+(this.hasAlphaChannel?1:0), this.pixelBitlength=this.bits*n, this.colorSpace=function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}.call(this), void(this.imgData=new Uint8Array(this.imgData));default:this.pos+=e;}if(this.pos+=4, this.pos>this.data.length)throw new Error("Incomplete or corrupt PNG file")}}var n,r,i;e.load=function(t,n,r){var i;return"function"==typeof n&&(r=n), (i=new XMLHttpRequest).open("GET",t,!0), i.responseType="arraybuffer", i.onload=function(){var t,o;return t=new Uint8Array(i.response||i.mozResponseArrayBuffer), o=new e(t), "function"==typeof(null!=n?n.getContext:void 0)&&o.render(n), "function"==typeof r?r(o):void 0}, i.send(null)}, e.prototype.read=function(t){var e,n;for(n=[], e=0;0<=t?e<t:e>t;0<=t?++e:--e)n.push(this.data[this.pos++]);return n}, e.prototype.readUInt32=function(){var t,e,n,r;return t=this.data[this.pos++]<<24, e=this.data[this.pos++]<<16, n=this.data[this.pos++]<<8, r=this.data[this.pos++], t|e|n|r}, e.prototype.readUInt16=function(){var t,e;return t=this.data[this.pos++]<<8, e=this.data[this.pos++], t|e}, e.prototype.decodePixels=function(t){var e,n,r,i,o,a,c,l,u,h,f,d,p,m,g,w,y,v,b,x,k,_,C;if(null==t&&(t=this.imgData), 0===t.length)return new Uint8Array(0);for(t=(t=new s(t)).getBytes(), w=(d=this.pixelBitlength/8)*this.width, p=new Uint8Array(w*this.height), a=t.length, g=0, m=0, n=0;m<a;){switch(t[m++]){case 0:for(i=b=0;b<w;i=b+=1)p[n++]=t[m++];break;case 1:for(i=x=0;x<w;i=x+=1)e=t[m++], o=i<d?0:p[n-d], p[n++]=(e+o)%256;break;case 2:for(i=k=0;k<w;i=k+=1)e=t[m++], r=(i-i%d)/d, y=g&&p[(g-1)*w+r*d+i%d], p[n++]=(y+e)%256;break;case 3:for(i=_=0;_<w;i=_+=1)e=t[m++], r=(i-i%d)/d, o=i<d?0:p[n-d], y=g&&p[(g-1)*w+r*d+i%d], p[n++]=(e+Math.floor((o+y)/2))%256;break;case 4:for(i=C=0;C<w;i=C+=1)e=t[m++], r=(i-i%d)/d, o=i<d?0:p[n-d], 0===g?y=v=0:(y=p[(g-1)*w+r*d+i%d], v=r&&p[(g-1)*w+(r-1)*d+i%d]), c=o+y-v, l=Math.abs(c-o), h=Math.abs(c-y), f=Math.abs(c-v), u=l<=h&&l<=f?o:h<=f?y:v, p[n++]=(e+u)%256;break;default:throw new Error("Invalid filter algorithm: "+t[m-1])}g++;}return p}, e.prototype.decodePalette=function(){var t,e,n,r,i,o,a,s,c;for(n=this.palette, o=this.transparency.indexed||[], i=new Uint8Array((o.length||0)+n.length), r=0, t=0, e=a=0, s=n.length;a<s;e=a+=3)i[r++]=n[e], i[r++]=n[e+1], i[r++]=n[e+2], i[r++]=null!=(c=o[t++])?c:255;return i}, e.prototype.copyToImageData=function(t,e){var n,r,i,o,a,s,c,l,u,h,f;if(r=this.colors, u=null, n=this.hasAlphaChannel, this.palette.length&&(u=null!=(f=this._decodedPalette)?f:this._decodedPalette=this.decodePalette(), r=4, n=!0), i=t.data||t, l=i.length, a=u||e, o=s=0, 1===r)for(;o<l;)c=u?4*e[o/4]:s, h=a[c++], i[o++]=h, i[o++]=h, i[o++]=h, i[o++]=n?a[c++]:255, s=c;else for(;o<l;)c=u?4*e[o/4]:s, i[o++]=a[c++], i[o++]=a[c++], i[o++]=a[c++], i[o++]=n?a[c++]:255, s=c;}, e.prototype.decode=function(){var t;return t=new Uint8Array(this.width*this.height*4), this.copyToImageData(t,this.decodePixels()), t};try{r=t.document.createElement("canvas"), i=r.getContext("2d");}catch(t){return-1}return n=function(t){var e;return i.width=t.width, i.height=t.height, i.clearRect(0,0,t.width,t.height), i.putImageData(t,0,0), e=new Image, e.src=r.toDataURL(), e}, e.prototype.decodeFrames=function(t){var e,r,i,o,a,s,c,l;if(this.animation){for(l=[], r=a=0, s=(c=this.animation.frames).length;a<s;r=++a)e=c[r], i=t.createImageData(e.width,e.height), o=this.decodePixels(new Uint8Array(e.data)), this.copyToImageData(i,o), e.imageData=i, l.push(e.image=n(i));return l}}, e.prototype.renderFrame=function(t,e){var n,r,i;return r=this.animation.frames, n=r[e], i=r[e-1], 0===e&&t.clearRect(0,0,this.width,this.height), 1===(null!=i?i.disposeOp:void 0)?t.clearRect(i.xOffset,i.yOffset,i.width,i.height):2===(null!=i?i.disposeOp:void 0)&&t.putImageData(i.imageData,i.xOffset,i.yOffset), 0===n.blendOp&&t.clearRect(n.xOffset,n.yOffset,n.width,n.height), t.drawImage(n.image,n.xOffset,n.yOffset)}, e.prototype.animate=function(t){var e,n,r,i,o,a,s=this;return n=0, a=this.animation, i=a.numFrames, r=a.frames, o=a.numPlays, (e=function(){var a,c;if(a=n++%i, c=r[a], s.renderFrame(t,a), i>1&&n/i<o)return s.animation._timeout=setTimeout(e,c.delay)})()}, e.prototype.stopAnimation=function(){var t;return clearTimeout(null!=(t=this.animation)?t._timeout:void 0)}, e.prototype.render=function(t){var e,n;return t._png&&t._png.stopAnimation(), t._png=this, t.width=this.width, t.height=this.height, e=t.getContext("2d"), this.animation?(this.decodeFrames(e), this.animate(e)):(n=e.createImageData(this.width,this.height), this.copyToImageData(n,this.decodePixels()), e.putImageData(n,0,0))}, e}(), t.PNG=e;}("undefined"!=typeof window&&window||void 0);/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
 *
 * 
 */
var a=function(){function t(){this.pos=0, this.bufferLength=0, this.eof=!1, this.buffer=null;}return t.prototype={ensureBuffer:function(t){var e=this.buffer,n=e?e.byteLength:0;if(t<n)return e;for(var r=512;r<t;)r<<=1;for(var i=new Uint8Array(r),o=0;o<n;++o)i[o]=e[o];return this.buffer=i},getByte:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock();}return this.buffer[this.pos++]},getBytes:function(t){var e=this.pos;if(t){this.ensureBuffer(e+t);for(r=e+t;!this.eof&&this.bufferLength<r;)this.readBlock();var n=this.bufferLength;r>n&&(r=n);}else{for(;!this.eof;)this.readBlock();var r=this.bufferLength;}return this.pos=r, this.buffer.subarray(e,r)},lookChar:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock();}return String.fromCharCode(this.buffer[this.pos])},getChar:function(){for(var t=this.pos;this.bufferLength<=t;){if(this.eof)return null;this.readBlock();}return String.fromCharCode(this.buffer[this.pos++])},makeSubStream:function(t,e,n){for(var r=t+e;this.bufferLength<=r&&!this.eof;)this.readBlock();return new Stream(this.buffer,t,e,n)},skip:function(t){t||(t=1), this.pos+=t;},reset:function(){this.pos=0;}}, t}(),s=function(){function t(t){throw new Error(t)}function e(e){var n=0,r=e[n++],i=e[n++];-1!=r&&-1!=i||t("Invalid header in flate stream"), 8!=(15&r)&&t("Unknown compression method in flate stream"), ((r<<8)+i)%31!=0&&t("Bad FCHECK in flate stream"), 32&i&&t("FDICT bit set in flate stream"), this.bytes=e, this.bytesPos=n, this.codeSize=0, this.codeBuf=0, a.call(this);}if("undefined"!=typeof Uint32Array){var n=new Uint32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),r=new Uint32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]),i=new Uint32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]),o=[new Uint32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,59e4,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9],s=[new Uint32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5];return e.prototype=Object.create(a.prototype), e.prototype.getBits=function(e){for(var n,r=this.codeSize,i=this.codeBuf,o=this.bytes,a=this.bytesPos;r<e;)void 0===(n=o[a++])&&t("Bad encoding in flate stream"), i|=n<<r, r+=8;return n=i&(1<<e)-1, this.codeBuf=i>>e, this.codeSize=r-=e, this.bytesPos=a, n}, e.prototype.getCode=function(e){for(var n=e[0],r=e[1],i=this.codeSize,o=this.codeBuf,a=this.bytes,s=this.bytesPos;i<r;){var c;void 0===(c=a[s++])&&t("Bad encoding in flate stream"), o|=c<<i, i+=8;}var l=n[o&(1<<r)-1],u=l>>16,h=65535&l;return(0==i||i<u||0==u)&&t("Bad encoding in flate stream"), this.codeBuf=o>>u, this.codeSize=i-u, this.bytesPos=s, h}, e.prototype.generateHuffmanTable=function(t){for(var e=t.length,n=0,r=0;r<e;++r)t[r]>n&&(n=t[r]);for(var i=1<<n,o=new Uint32Array(i),a=1,s=0,c=2;a<=n;++a, s<<=1, c<<=1)for(var l=0;l<e;++l)if(t[l]==a){for(var u=0,h=s,r=0;r<a;++r)u=u<<1|1&h, h>>=1;for(r=u;r<i;r+=c)o[r]=a<<16|l;++s;}return[o,n]}, e.prototype.readBlock=function(){function e(t,e,n,r,i){for(var o=t.getBits(n)+r;o-- >0;)e[p++]=i;}var a=this.getBits(3);if(1&a&&(this.eof=!0), 0!=(a>>=1)){var c,l;if(1==a)c=o, l=s;else if(2==a){for(var u=this.getBits(5)+257,h=this.getBits(5)+1,f=this.getBits(4)+4,d=Array(n.length),p=0;p<f;)d[n[p++]]=this.getBits(3);for(var m=this.generateHuffmanTable(d),g=0,p=0,w=u+h,y=new Array(w);p<w;){var v=this.getCode(m);16==v?e(this,y,2,3,g):17==v?e(this,y,3,3,g=0):18==v?e(this,y,7,11,g=0):y[p++]=g=v;}c=this.generateHuffmanTable(y.slice(0,u)), l=this.generateHuffmanTable(y.slice(u,w));}else t("Unknown block type in flate stream");for(var b=(O=this.buffer)?O.length:0,x=this.bufferLength;;){var k=this.getCode(c);if(k<256)x+1>=b&&(b=(O=this.ensureBuffer(x+1)).length), O[x++]=k;else{if(256==k)return void(this.bufferLength=x);var _=(k=r[k-=257])>>16;_>0&&(_=this.getBits(_));g=(65535&k)+_;k=this.getCode(l), (_=(k=i[k])>>16)>0&&(_=this.getBits(_));var C=(65535&k)+_;x+g>=b&&(b=(O=this.ensureBuffer(x+g)).length);for(var A=0;A<g;++A, ++x)O[x]=O[x-C];}}}else{var S,q=this.bytes,T=this.bytesPos;void 0===(S=q[T++])&&t("Bad block header in flate stream");var P=S;void 0===(S=q[T++])&&t("Bad block header in flate stream"), P|=S<<8, void 0===(S=q[T++])&&t("Bad block header in flate stream");var I=S;void 0===(S=q[T++])&&t("Bad block header in flate stream"), (I|=S<<8)!=(65535&~P)&&t("Bad uncompressed block length in flate stream"), this.codeBuf=0, this.codeSize=0;var E=this.bufferLength,O=this.ensureBuffer(E+P),F=E+P;this.bufferLength=F;for(var B=E;B<F;++B){if(void 0===(S=q[T++])){this.eof=!0;break}O[B]=S;}this.bytesPos=T;}}, e}}();return function(t){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";void 0===t.btoa&&(t.btoa=function(t){var n,r,i,o,a,s=0,c=0,l="",u=[];if(!t)return t;do{n=(a=t.charCodeAt(s++)<<16|t.charCodeAt(s++)<<8|t.charCodeAt(s++))>>18&63, r=a>>12&63, i=a>>6&63, o=63&a, u[c++]=e.charAt(n)+e.charAt(r)+e.charAt(i)+e.charAt(o);}while(s<t.length);l=u.join("");var h=t.length%3;return(h?l.slice(0,h-3):l)+"===".slice(h||3)}), void 0===t.atob&&(t.atob=function(t){var n,r,i,o,a,s,c=0,l=0,u=[];if(!t)return t;t+="";do{n=(s=e.indexOf(t.charAt(c++))<<18|e.indexOf(t.charAt(c++))<<12|(o=e.indexOf(t.charAt(c++)))<<6|(a=e.indexOf(t.charAt(c++))))>>16&255, r=s>>8&255, i=255&s, u[l++]=64==o?String.fromCharCode(n):64==a?String.fromCharCode(n,r):String.fromCharCode(n,r,i);}while(c<t.length);return u.join("")}), Array.prototype.map||(Array.prototype.map=function(t){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;for(var e=Object(this),n=e.length>>>0,r=new Array(n),i=arguments.length>1?arguments[1]:void 0,o=0;o<n;o++)o in e&&(r[o]=t.call(i,e[o],o,e));return r}), Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}), Array.prototype.forEach||(Array.prototype.forEach=function(t,e){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;for(var n=Object(this),r=n.length>>>0,i=0;i<r;i++)i in n&&t.call(e,n[i],i,n);}), Object.keys||(Object.keys=function(){var t=Object.prototype.hasOwnProperty,e=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(i){if("object"!=typeof i&&("function"!=typeof i||null===i))throw new TypeError;var o,a,s=[];for(o in i)t.call(i,o)&&s.push(o);if(e)for(a=0;a<r;a++)t.call(i,n[a])&&s.push(n[a]);return s}}()), String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}), String.prototype.trimLeft||(String.prototype.trimLeft=function(){return this.replace(/^\s+/g,"")}), String.prototype.trimRight||(String.prototype.trimRight=function(){return this.replace(/\s+$/g,"")});}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||void 0), e});
});

var jspdf_min_1 = jspdf_min.saveAs;

var Path = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var PATH = exports.PATH = {
    VECTOR: 0,
    BEZIER_CURVE: 1,
    CIRCLE: 2
};
});

unwrapExports(Path);
var Path_1 = Path.PATH;

var Color_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HEX3 = /^#([a-f0-9]{3})$/i;
var hex3 = function hex3(value) {
    var match = value.match(HEX3);
    if (match) {
        return [parseInt(match[1][0] + match[1][0], 16), parseInt(match[1][1] + match[1][1], 16), parseInt(match[1][2] + match[1][2], 16), null];
    }
    return false;
};

var HEX6 = /^#([a-f0-9]{6})$/i;
var hex6 = function hex6(value) {
    var match = value.match(HEX6);
    if (match) {
        return [parseInt(match[1].substring(0, 2), 16), parseInt(match[1].substring(2, 4), 16), parseInt(match[1].substring(4, 6), 16), null];
    }
    return false;
};

var RGB = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
var rgb = function rgb(value) {
    var match = value.match(RGB);
    if (match) {
        return [Number(match[1]), Number(match[2]), Number(match[3]), null];
    }
    return false;
};

var RGBA = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;
var rgba = function rgba(value) {
    var match = value.match(RGBA);
    if (match && match.length > 4) {
        return [Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])];
    }
    return false;
};

var fromArray = function fromArray(array) {
    return [Math.min(array[0], 255), Math.min(array[1], 255), Math.min(array[2], 255), array.length > 3 ? array[3] : null];
};

var namedColor = function namedColor(name) {
    var color = NAMED_COLORS[name.toLowerCase()];
    return color ? color : false;
};

var Color = function () {
    function Color(value) {
        _classCallCheck(this, Color);

        var _ref = Array.isArray(value) ? fromArray(value) : hex3(value) || rgb(value) || rgba(value) || namedColor(value) || hex6(value) || [0, 0, 0, null],
            _ref2 = _slicedToArray(_ref, 4),
            r = _ref2[0],
            g = _ref2[1],
            b = _ref2[2],
            a = _ref2[3];

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    _createClass(Color, [{
        key: 'isTransparent',
        value: function isTransparent() {
            return this.a === 0;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.a !== null && this.a !== 1 ? 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')' : 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
        }
    }]);

    return Color;
}();

exports.default = Color;


var NAMED_COLORS = {
    transparent: [0, 0, 0, 0],
    aliceblue: [240, 248, 255, null],
    antiquewhite: [250, 235, 215, null],
    aqua: [0, 255, 255, null],
    aquamarine: [127, 255, 212, null],
    azure: [240, 255, 255, null],
    beige: [245, 245, 220, null],
    bisque: [255, 228, 196, null],
    black: [0, 0, 0, null],
    blanchedalmond: [255, 235, 205, null],
    blue: [0, 0, 255, null],
    blueviolet: [138, 43, 226, null],
    brown: [165, 42, 42, null],
    burlywood: [222, 184, 135, null],
    cadetblue: [95, 158, 160, null],
    chartreuse: [127, 255, 0, null],
    chocolate: [210, 105, 30, null],
    coral: [255, 127, 80, null],
    cornflowerblue: [100, 149, 237, null],
    cornsilk: [255, 248, 220, null],
    crimson: [220, 20, 60, null],
    cyan: [0, 255, 255, null],
    darkblue: [0, 0, 139, null],
    darkcyan: [0, 139, 139, null],
    darkgoldenrod: [184, 134, 11, null],
    darkgray: [169, 169, 169, null],
    darkgreen: [0, 100, 0, null],
    darkgrey: [169, 169, 169, null],
    darkkhaki: [189, 183, 107, null],
    darkmagenta: [139, 0, 139, null],
    darkolivegreen: [85, 107, 47, null],
    darkorange: [255, 140, 0, null],
    darkorchid: [153, 50, 204, null],
    darkred: [139, 0, 0, null],
    darksalmon: [233, 150, 122, null],
    darkseagreen: [143, 188, 143, null],
    darkslateblue: [72, 61, 139, null],
    darkslategray: [47, 79, 79, null],
    darkslategrey: [47, 79, 79, null],
    darkturquoise: [0, 206, 209, null],
    darkviolet: [148, 0, 211, null],
    deeppink: [255, 20, 147, null],
    deepskyblue: [0, 191, 255, null],
    dimgray: [105, 105, 105, null],
    dimgrey: [105, 105, 105, null],
    dodgerblue: [30, 144, 255, null],
    firebrick: [178, 34, 34, null],
    floralwhite: [255, 250, 240, null],
    forestgreen: [34, 139, 34, null],
    fuchsia: [255, 0, 255, null],
    gainsboro: [220, 220, 220, null],
    ghostwhite: [248, 248, 255, null],
    gold: [255, 215, 0, null],
    goldenrod: [218, 165, 32, null],
    gray: [128, 128, 128, null],
    green: [0, 128, 0, null],
    greenyellow: [173, 255, 47, null],
    grey: [128, 128, 128, null],
    honeydew: [240, 255, 240, null],
    hotpink: [255, 105, 180, null],
    indianred: [205, 92, 92, null],
    indigo: [75, 0, 130, null],
    ivory: [255, 255, 240, null],
    khaki: [240, 230, 140, null],
    lavender: [230, 230, 250, null],
    lavenderblush: [255, 240, 245, null],
    lawngreen: [124, 252, 0, null],
    lemonchiffon: [255, 250, 205, null],
    lightblue: [173, 216, 230, null],
    lightcoral: [240, 128, 128, null],
    lightcyan: [224, 255, 255, null],
    lightgoldenrodyellow: [250, 250, 210, null],
    lightgray: [211, 211, 211, null],
    lightgreen: [144, 238, 144, null],
    lightgrey: [211, 211, 211, null],
    lightpink: [255, 182, 193, null],
    lightsalmon: [255, 160, 122, null],
    lightseagreen: [32, 178, 170, null],
    lightskyblue: [135, 206, 250, null],
    lightslategray: [119, 136, 153, null],
    lightslategrey: [119, 136, 153, null],
    lightsteelblue: [176, 196, 222, null],
    lightyellow: [255, 255, 224, null],
    lime: [0, 255, 0, null],
    limegreen: [50, 205, 50, null],
    linen: [250, 240, 230, null],
    magenta: [255, 0, 255, null],
    maroon: [128, 0, 0, null],
    mediumaquamarine: [102, 205, 170, null],
    mediumblue: [0, 0, 205, null],
    mediumorchid: [186, 85, 211, null],
    mediumpurple: [147, 112, 219, null],
    mediumseagreen: [60, 179, 113, null],
    mediumslateblue: [123, 104, 238, null],
    mediumspringgreen: [0, 250, 154, null],
    mediumturquoise: [72, 209, 204, null],
    mediumvioletred: [199, 21, 133, null],
    midnightblue: [25, 25, 112, null],
    mintcream: [245, 255, 250, null],
    mistyrose: [255, 228, 225, null],
    moccasin: [255, 228, 181, null],
    navajowhite: [255, 222, 173, null],
    navy: [0, 0, 128, null],
    oldlace: [253, 245, 230, null],
    olive: [128, 128, 0, null],
    olivedrab: [107, 142, 35, null],
    orange: [255, 165, 0, null],
    orangered: [255, 69, 0, null],
    orchid: [218, 112, 214, null],
    palegoldenrod: [238, 232, 170, null],
    palegreen: [152, 251, 152, null],
    paleturquoise: [175, 238, 238, null],
    palevioletred: [219, 112, 147, null],
    papayawhip: [255, 239, 213, null],
    peachpuff: [255, 218, 185, null],
    peru: [205, 133, 63, null],
    pink: [255, 192, 203, null],
    plum: [221, 160, 221, null],
    powderblue: [176, 224, 230, null],
    purple: [128, 0, 128, null],
    rebeccapurple: [102, 51, 153, null],
    red: [255, 0, 0, null],
    rosybrown: [188, 143, 143, null],
    royalblue: [65, 105, 225, null],
    saddlebrown: [139, 69, 19, null],
    salmon: [250, 128, 114, null],
    sandybrown: [244, 164, 96, null],
    seagreen: [46, 139, 87, null],
    seashell: [255, 245, 238, null],
    sienna: [160, 82, 45, null],
    silver: [192, 192, 192, null],
    skyblue: [135, 206, 235, null],
    slateblue: [106, 90, 205, null],
    slategray: [112, 128, 144, null],
    slategrey: [112, 128, 144, null],
    snow: [255, 250, 250, null],
    springgreen: [0, 255, 127, null],
    steelblue: [70, 130, 180, null],
    tan: [210, 180, 140, null],
    teal: [0, 128, 128, null],
    thistle: [216, 191, 216, null],
    tomato: [255, 99, 71, null],
    turquoise: [64, 224, 208, null],
    violet: [238, 130, 238, null],
    wheat: [245, 222, 179, null],
    white: [255, 255, 255, null],
    whitesmoke: [245, 245, 245, null],
    yellow: [255, 255, 0, null],
    yellowgreen: [154, 205, 50, null]
};

var TRANSPARENT = exports.TRANSPARENT = new Color([0, 0, 0, 0]);
});

unwrapExports(Color_1);
var Color_2 = Color_1.TRANSPARENT;

var textDecoration = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseTextDecoration = exports.TEXT_DECORATION_LINE = exports.TEXT_DECORATION = exports.TEXT_DECORATION_STYLE = undefined;



var _Color2 = _interopRequireDefault(Color_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEXT_DECORATION_STYLE = exports.TEXT_DECORATION_STYLE = {
    SOLID: 0,
    DOUBLE: 1,
    DOTTED: 2,
    DASHED: 3,
    WAVY: 4
};

var TEXT_DECORATION = exports.TEXT_DECORATION = {
    NONE: null
};

var TEXT_DECORATION_LINE = exports.TEXT_DECORATION_LINE = {
    UNDERLINE: 1,
    OVERLINE: 2,
    LINE_THROUGH: 3,
    BLINK: 4
};

var parseLine = function parseLine(line) {
    switch (line) {
        case 'underline':
            return TEXT_DECORATION_LINE.UNDERLINE;
        case 'overline':
            return TEXT_DECORATION_LINE.OVERLINE;
        case 'line-through':
            return TEXT_DECORATION_LINE.LINE_THROUGH;
    }
    return TEXT_DECORATION_LINE.BLINK;
};

var parseTextDecorationLine = function parseTextDecorationLine(line) {
    if (line === 'none') {
        return null;
    }

    return line.split(' ').map(parseLine);
};

var parseTextDecorationStyle = function parseTextDecorationStyle(style) {
    switch (style) {
        case 'double':
            return TEXT_DECORATION_STYLE.DOUBLE;
        case 'dotted':
            return TEXT_DECORATION_STYLE.DOTTED;
        case 'dashed':
            return TEXT_DECORATION_STYLE.DASHED;
        case 'wavy':
            return TEXT_DECORATION_STYLE.WAVY;
    }
    return TEXT_DECORATION_STYLE.SOLID;
};

var parseTextDecoration = exports.parseTextDecoration = function parseTextDecoration(style) {
    var textDecorationLine = parseTextDecorationLine(style.textDecorationLine ? style.textDecorationLine : style.textDecoration);
    if (textDecorationLine === null) {
        return TEXT_DECORATION.NONE;
    }

    var textDecorationColor = style.textDecorationColor ? new _Color2.default(style.textDecorationColor) : null;
    var textDecorationStyle = parseTextDecorationStyle(style.textDecorationStyle);

    return {
        textDecorationLine: textDecorationLine,
        textDecorationColor: textDecorationColor,
        textDecorationStyle: textDecorationStyle
    };
};
});

unwrapExports(textDecoration);
var textDecoration_1 = textDecoration.parseTextDecoration;
var textDecoration_2 = textDecoration.TEXT_DECORATION_LINE;
var textDecoration_3 = textDecoration.TEXT_DECORATION;
var textDecoration_4 = textDecoration.TEXT_DECORATION_STYLE;

var CanvasRenderer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addColorStops = function addColorStops(gradient, canvasGradient) {
    var maxStop = Math.max.apply(null, gradient.colorStops.map(function (colorStop) {
        return colorStop.stop;
    }));
    var f = 1 / Math.max(1, maxStop);
    gradient.colorStops.forEach(function (colorStop) {
        canvasGradient.addColorStop(f * colorStop.stop, colorStop.color.toString());
    });
};

var CanvasRenderer = function () {
    function CanvasRenderer(canvas) {
        _classCallCheck(this, CanvasRenderer);

        this.canvas = canvas ? canvas : document.createElement('canvas');
    }

    _createClass(CanvasRenderer, [{
        key: 'render',
        value: function render(options) {
            this.ctx = this.canvas.getContext('2d');
            this.options = options;
            this.canvas.width = Math.floor(options.width * options.scale);
            this.canvas.height = Math.floor(options.height * options.scale);
            this.canvas.style.width = options.width + 'px';
            this.canvas.style.height = options.height + 'px';

            this.ctx.scale(this.options.scale, this.options.scale);
            this.ctx.translate(-options.x, -options.y);
            this.ctx.textBaseline = 'bottom';
            options.logger.log('Canvas renderer initialized (' + options.width + 'x' + options.height + ' at ' + options.x + ',' + options.y + ') with scale ' + this.options.scale);
        }
    }, {
        key: 'clip',
        value: function clip(clipPaths, callback) {
            var _this = this;

            if (clipPaths.length) {
                this.ctx.save();
                clipPaths.forEach(function (path) {
                    _this.path(path);
                    _this.ctx.clip();
                });
            }

            callback();

            if (clipPaths.length) {
                this.ctx.restore();
            }
        }
    }, {
        key: 'drawImage',
        value: function drawImage(image, source, destination) {
            this.ctx.drawImage(image, source.left, source.top, source.width, source.height, destination.left, destination.top, destination.width, destination.height);
        }
    }, {
        key: 'drawShape',
        value: function drawShape(path, color) {
            this.path(path);
            this.ctx.fillStyle = color.toString();
            this.ctx.fill();
        }
    }, {
        key: 'fill',
        value: function fill(color) {
            this.ctx.fillStyle = color.toString();
            this.ctx.fill();
        }
    }, {
        key: 'getTarget',
        value: function getTarget() {
            this.canvas.getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
            return Promise.resolve(this.canvas);
        }
    }, {
        key: 'path',
        value: function path(_path) {
            var _this2 = this;

            this.ctx.beginPath();
            if (Array.isArray(_path)) {
                _path.forEach(function (point, index) {
                    var start = point.type === Path.PATH.VECTOR ? point : point.start;
                    if (index === 0) {
                        _this2.ctx.moveTo(start.x, start.y);
                    } else {
                        _this2.ctx.lineTo(start.x, start.y);
                    }

                    if (point.type === Path.PATH.BEZIER_CURVE) {
                        _this2.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
                    }
                });
            } else {
                this.ctx.arc(_path.x + _path.radius, _path.y + _path.radius, _path.radius, 0, Math.PI * 2, true);
            }

            this.ctx.closePath();
        }
    }, {
        key: 'rectangle',
        value: function rectangle(x, y, width, height, color) {
            this.ctx.fillStyle = color.toString();
            this.ctx.fillRect(x, y, width, height);
        }
    }, {
        key: 'renderLinearGradient',
        value: function renderLinearGradient(bounds, gradient) {
            var linearGradient = this.ctx.createLinearGradient(bounds.left + gradient.direction.x1, bounds.top + gradient.direction.y1, bounds.left + gradient.direction.x0, bounds.top + gradient.direction.y0);

            addColorStops(gradient, linearGradient);
            this.ctx.fillStyle = linearGradient;
            this.ctx.fillRect(bounds.left, bounds.top, bounds.width, bounds.height);
        }
    }, {
        key: 'renderRadialGradient',
        value: function renderRadialGradient(bounds, gradient) {
            var _this3 = this;

            var x = bounds.left + gradient.center.x;
            var y = bounds.top + gradient.center.y;

            var radialGradient = this.ctx.createRadialGradient(x, y, 0, x, y, gradient.radius.x);
            if (!radialGradient) {
                return;
            }

            addColorStops(gradient, radialGradient);
            this.ctx.fillStyle = radialGradient;

            if (gradient.radius.x !== gradient.radius.y) {
                // transforms for elliptical radial gradient
                var midX = bounds.left + 0.5 * bounds.width;
                var midY = bounds.top + 0.5 * bounds.height;
                var f = gradient.radius.y / gradient.radius.x;
                var invF = 1 / f;

                this.transform(midX, midY, [1, 0, 0, f, 0, 0], function () {
                    return _this3.ctx.fillRect(bounds.left, invF * (bounds.top - midY) + midY, bounds.width, bounds.height * invF);
                });
            } else {
                this.ctx.fillRect(bounds.left, bounds.top, bounds.width, bounds.height);
            }
        }
    }, {
        key: 'renderRepeat',
        value: function renderRepeat(path, image, imageSize, offsetX, offsetY) {
            this.path(path);
            this.ctx.fillStyle = this.ctx.createPattern(this.resizeImage(image, imageSize), 'repeat');
            this.ctx.translate(offsetX, offsetY);
            this.ctx.fill();
            this.ctx.translate(-offsetX, -offsetY);
        }
    }, {
        key: 'renderTextNode',
        value: function renderTextNode(textBounds, color, font, textDecoration$$1, textShadows) {
            var _this4 = this;

            this.ctx.font = [font.fontStyle, font.fontVariant, font.fontWeight, font.fontSize, font.fontFamily].join(' ');

            textBounds.forEach(function (text) {
                _this4.ctx.fillStyle = color.toString();
                if (textShadows && text.text.trim().length) {
                    textShadows.slice(0).reverse().forEach(function (textShadow) {
                        _this4.ctx.shadowColor = textShadow.color.toString();
                        _this4.ctx.shadowOffsetX = textShadow.offsetX * _this4.options.scale;
                        _this4.ctx.shadowOffsetY = textShadow.offsetY * _this4.options.scale;
                        _this4.ctx.shadowBlur = textShadow.blur;

                        _this4.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
                    });
                } else {
                    _this4.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
                }

                if (textDecoration$$1 !== null) {
                    var textDecorationColor = textDecoration$$1.textDecorationColor || color;
                    textDecoration$$1.textDecorationLine.forEach(function (textDecorationLine) {
                        switch (textDecorationLine) {
                            case textDecoration.TEXT_DECORATION_LINE.UNDERLINE:
                                // Draws a line at the baseline of the font
                                // TODO As some browsers display the line as more than 1px if the font-size is big,
                                // need to take that into account both in position and size
                                var _options$fontMetrics$ = _this4.options.fontMetrics.getMetrics(font),
                                    baseline = _options$fontMetrics$.baseline;

                                _this4.rectangle(text.bounds.left, Math.round(text.bounds.top + baseline), text.bounds.width, 1, textDecorationColor);
                                break;
                            case textDecoration.TEXT_DECORATION_LINE.OVERLINE:
                                _this4.rectangle(text.bounds.left, Math.round(text.bounds.top), text.bounds.width, 1, textDecorationColor);
                                break;
                            case textDecoration.TEXT_DECORATION_LINE.LINE_THROUGH:
                                // TODO try and find exact position for line-through
                                var _options$fontMetrics$2 = _this4.options.fontMetrics.getMetrics(font),
                                    middle = _options$fontMetrics$2.middle;

                                _this4.rectangle(text.bounds.left, Math.ceil(text.bounds.top + middle), text.bounds.width, 1, textDecorationColor);
                                break;
                        }
                    });
                }
            });
        }
    }, {
        key: 'resizeImage',
        value: function resizeImage(image, size) {
            if (image.width === size.width && image.height === size.height) {
                return image;
            }

            var canvas = this.canvas.ownerDocument.createElement('canvas');
            canvas.width = size.width;
            canvas.height = size.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height);
            return canvas;
        }
    }, {
        key: 'setOpacity',
        value: function setOpacity(opacity) {
            this.ctx.globalAlpha = opacity;
        }
    }, {
        key: 'transform',
        value: function transform(offsetX, offsetY, matrix, callback) {
            this.ctx.save();
            this.ctx.translate(offsetX, offsetY);
            this.ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
            this.ctx.translate(-offsetX, -offsetY);

            callback();

            this.ctx.restore();
        }
    }]);

    return CanvasRenderer;
}();

exports.default = CanvasRenderer;
});

unwrapExports(CanvasRenderer_1);

var Logger_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger(enabled, id, start) {
        _classCallCheck(this, Logger);

        this.enabled = typeof window !== 'undefined' && enabled;
        this.start = start ? start : Date.now();
        this.id = id;
    }

    _createClass(Logger, [{
        key: 'child',
        value: function child(id) {
            return new Logger(this.enabled, id, this.start);
        }

        // eslint-disable-next-line flowtype/no-weak-types

    }, {
        key: 'log',
        value: function log() {
            if (this.enabled && window.console && window.console.log) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - this.start + 'ms', this.id ? 'html2canvas (' + this.id + '):' : 'html2canvas:'].concat([].slice.call(args, 0)));
            }
        }

        // eslint-disable-next-line flowtype/no-weak-types

    }, {
        key: 'error',
        value: function error() {
            if (this.enabled && window.console && window.console.error) {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                Function.prototype.bind.call(window.console.error, window.console).apply(window.console, [Date.now() - this.start + 'ms', this.id ? 'html2canvas (' + this.id + '):' : 'html2canvas:'].concat([].slice.call(args, 0)));
            }
        }
    }]);

    return Logger;
}();

exports.default = Logger;
});

unwrapExports(Logger_1);

var Util = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var contains = exports.contains = function contains(bit, value) {
    return (bit & value) !== 0;
};

var distance = exports.distance = function distance(a, b) {
    return Math.sqrt(a * a + b * b);
};

var copyCSSStyles = exports.copyCSSStyles = function copyCSSStyles(style, target) {
    // Edge does not provide value for cssText
    for (var i = style.length - 1; i >= 0; i--) {
        var property = style.item(i);
        // Safari shows pseudoelements if content is set
        if (property !== 'content') {
            target.style.setProperty(property, style.getPropertyValue(property));
        }
    }
    return target;
};

var SMALL_IMAGE = exports.SMALL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
});

unwrapExports(Util);
var Util_1 = Util.contains;
var Util_2 = Util.distance;
var Util_3 = Util.copyCSSStyles;
var Util_4 = Util.SMALL_IMAGE;

var Length_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateLengthFromValueWithUnit = exports.LENGTH_TYPE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _NodeContainer2 = _interopRequireDefault(NodeContainer_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LENGTH_TYPE = exports.LENGTH_TYPE = {
    PX: 0,
    PERCENTAGE: 1
};

var Length = function () {
    function Length(value) {
        _classCallCheck(this, Length);

        this.type = value.substr(value.length - 1) === '%' ? LENGTH_TYPE.PERCENTAGE : LENGTH_TYPE.PX;
        var parsedValue = parseFloat(value);
        this.value = isNaN(parsedValue) ? 0 : parsedValue;
    }

    _createClass(Length, [{
        key: 'isPercentage',
        value: function isPercentage() {
            return this.type === LENGTH_TYPE.PERCENTAGE;
        }
    }, {
        key: 'getAbsoluteValue',
        value: function getAbsoluteValue(parentLength) {
            return this.isPercentage() ? parentLength * (this.value / 100) : this.value;
        }
    }], [{
        key: 'create',
        value: function create(v) {
            return new Length(v);
        }
    }]);

    return Length;
}();

exports.default = Length;


var getRootFontSize = function getRootFontSize(container) {
    var parent = container.parent;
    return parent ? getRootFontSize(parent) : parseFloat(container.style.font.fontSize);
};

var calculateLengthFromValueWithUnit = exports.calculateLengthFromValueWithUnit = function calculateLengthFromValueWithUnit(container, value, unit) {
    switch (unit) {
        case 'px':
        case '%':
            return new Length(value + unit);
        case 'em':
        case 'rem':
            var length = new Length(value);
            length.value *= unit === 'em' ? parseFloat(container.style.font.fontSize) : getRootFontSize(container);
            return length;
        default:
            // TODO: handle correctly if unknown unit is used
            return new Length('0');
    }
};
});

unwrapExports(Length_1);
var Length_2 = Length_1.calculateLengthFromValueWithUnit;
var Length_3 = Length_1.LENGTH_TYPE;

var Size_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Size = function Size(width, height) {
    _classCallCheck(this, Size);

    this.width = width;
    this.height = height;
};

exports.default = Size;
});

unwrapExports(Size_1);

var Vector_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.type = Path.PATH.VECTOR;
    this.x = x;
    this.y = y;
    
};

exports.default = Vector;
});

unwrapExports(Vector_1);

var BezierCurve_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





var _Vector2 = _interopRequireDefault(Vector_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lerp = function lerp(a, b, t) {
    return new _Vector2.default(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
};

var BezierCurve = function () {
    function BezierCurve(start, startControl, endControl, end) {
        _classCallCheck(this, BezierCurve);

        this.type = Path.PATH.BEZIER_CURVE;
        this.start = start;
        this.startControl = startControl;
        this.endControl = endControl;
        this.end = end;
    }

    _createClass(BezierCurve, [{
        key: 'subdivide',
        value: function subdivide(t, firstHalf) {
            var ab = lerp(this.start, this.startControl, t);
            var bc = lerp(this.startControl, this.endControl, t);
            var cd = lerp(this.endControl, this.end, t);
            var abbc = lerp(ab, bc, t);
            var bccd = lerp(bc, cd, t);
            var dest = lerp(abbc, bccd, t);
            return firstHalf ? new BezierCurve(this.start, ab, abbc, dest) : new BezierCurve(dest, bccd, cd, this.end);
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            return new BezierCurve(this.end, this.endControl, this.startControl, this.start);
        }
    }]);

    return BezierCurve;
}();

exports.default = BezierCurve;
});

unwrapExports(BezierCurve_1);

var Bounds_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseBoundCurves = exports.calculatePaddingBoxPath = exports.calculateBorderBoxPath = exports.parsePathForBorder = exports.parseDocumentSize = exports.calculateContentBox = exports.calculatePaddingBox = exports.parseBounds = exports.Bounds = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _Vector2 = _interopRequireDefault(Vector_1);



var _BezierCurve2 = _interopRequireDefault(BezierCurve_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOP = 0;
var RIGHT = 1;
var BOTTOM = 2;
var LEFT = 3;

var H = 0;
var V = 1;

var Bounds = exports.Bounds = function () {
    function Bounds(x, y, w, h) {
        _classCallCheck(this, Bounds);

        this.left = x;
        this.top = y;
        this.width = w;
        this.height = h;
    }

    _createClass(Bounds, null, [{
        key: 'fromClientRect',
        value: function fromClientRect(clientRect, scrollX, scrollY) {
            return new Bounds(clientRect.left + scrollX, clientRect.top + scrollY, clientRect.width, clientRect.height);
        }
    }]);

    return Bounds;
}();

var parseBounds = exports.parseBounds = function parseBounds(node, scrollX, scrollY) {
    return Bounds.fromClientRect(node.getBoundingClientRect(), scrollX, scrollY);
};

var calculatePaddingBox = exports.calculatePaddingBox = function calculatePaddingBox(bounds, borders) {
    return new Bounds(bounds.left + borders[LEFT].borderWidth, bounds.top + borders[TOP].borderWidth, bounds.width - (borders[RIGHT].borderWidth + borders[LEFT].borderWidth), bounds.height - (borders[TOP].borderWidth + borders[BOTTOM].borderWidth));
};

var calculateContentBox = exports.calculateContentBox = function calculateContentBox(bounds, padding, borders) {
    // TODO support percentage paddings
    var paddingTop = padding[TOP].value;
    var paddingRight = padding[RIGHT].value;
    var paddingBottom = padding[BOTTOM].value;
    var paddingLeft = padding[LEFT].value;

    return new Bounds(bounds.left + paddingLeft + borders[LEFT].borderWidth, bounds.top + paddingTop + borders[TOP].borderWidth, bounds.width - (borders[RIGHT].borderWidth + borders[LEFT].borderWidth + paddingLeft + paddingRight), bounds.height - (borders[TOP].borderWidth + borders[BOTTOM].borderWidth + paddingTop + paddingBottom));
};

var parseDocumentSize = exports.parseDocumentSize = function parseDocumentSize(document) {
    var body = document.body;
    var documentElement = document.documentElement;

    if (!body || !documentElement) {
        throw new Error('');
    }
    var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));

    var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));

    return new Bounds(0, 0, width, height);
};

var parsePathForBorder = exports.parsePathForBorder = function parsePathForBorder(curves, borderSide) {
    switch (borderSide) {
        case TOP:
            return createPathFromCurves(curves.topLeftOuter, curves.topLeftInner, curves.topRightOuter, curves.topRightInner);
        case RIGHT:
            return createPathFromCurves(curves.topRightOuter, curves.topRightInner, curves.bottomRightOuter, curves.bottomRightInner);
        case BOTTOM:
            return createPathFromCurves(curves.bottomRightOuter, curves.bottomRightInner, curves.bottomLeftOuter, curves.bottomLeftInner);
        case LEFT:
        default:
            return createPathFromCurves(curves.bottomLeftOuter, curves.bottomLeftInner, curves.topLeftOuter, curves.topLeftInner);
    }
};

var createPathFromCurves = function createPathFromCurves(outer1, inner1, outer2, inner2) {
    var path = [];
    if (outer1 instanceof _BezierCurve2.default) {
        path.push(outer1.subdivide(0.5, false));
    } else {
        path.push(outer1);
    }

    if (outer2 instanceof _BezierCurve2.default) {
        path.push(outer2.subdivide(0.5, true));
    } else {
        path.push(outer2);
    }

    if (inner2 instanceof _BezierCurve2.default) {
        path.push(inner2.subdivide(0.5, true).reverse());
    } else {
        path.push(inner2);
    }

    if (inner1 instanceof _BezierCurve2.default) {
        path.push(inner1.subdivide(0.5, false).reverse());
    } else {
        path.push(inner1);
    }

    return path;
};

var calculateBorderBoxPath = exports.calculateBorderBoxPath = function calculateBorderBoxPath(curves) {
    return [curves.topLeftOuter, curves.topRightOuter, curves.bottomRightOuter, curves.bottomLeftOuter];
};

var calculatePaddingBoxPath = exports.calculatePaddingBoxPath = function calculatePaddingBoxPath(curves) {
    return [curves.topLeftInner, curves.topRightInner, curves.bottomRightInner, curves.bottomLeftInner];
};

var parseBoundCurves = exports.parseBoundCurves = function parseBoundCurves(bounds, borders, borderRadius) {
    var tlh = borderRadius[CORNER.TOP_LEFT][H].getAbsoluteValue(bounds.width);
    var tlv = borderRadius[CORNER.TOP_LEFT][V].getAbsoluteValue(bounds.height);
    var trh = borderRadius[CORNER.TOP_RIGHT][H].getAbsoluteValue(bounds.width);
    var trv = borderRadius[CORNER.TOP_RIGHT][V].getAbsoluteValue(bounds.height);
    var brh = borderRadius[CORNER.BOTTOM_RIGHT][H].getAbsoluteValue(bounds.width);
    var brv = borderRadius[CORNER.BOTTOM_RIGHT][V].getAbsoluteValue(bounds.height);
    var blh = borderRadius[CORNER.BOTTOM_LEFT][H].getAbsoluteValue(bounds.width);
    var blv = borderRadius[CORNER.BOTTOM_LEFT][V].getAbsoluteValue(bounds.height);

    var factors = [];
    factors.push((tlh + trh) / bounds.width);
    factors.push((blh + brh) / bounds.width);
    factors.push((tlv + blv) / bounds.height);
    factors.push((trv + brv) / bounds.height);
    var maxFactor = Math.max.apply(Math, factors);

    if (maxFactor > 1) {
        tlh /= maxFactor;
        tlv /= maxFactor;
        trh /= maxFactor;
        trv /= maxFactor;
        brh /= maxFactor;
        brv /= maxFactor;
        blh /= maxFactor;
        blv /= maxFactor;
    }

    var topWidth = bounds.width - trh;
    var rightHeight = bounds.height - brv;
    var bottomWidth = bounds.width - brh;
    var leftHeight = bounds.height - blv;

    return {
        topLeftOuter: tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT) : new _Vector2.default(bounds.left, bounds.top),
        topLeftInner: tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borders[LEFT].borderWidth, bounds.top + borders[TOP].borderWidth, Math.max(0, tlh - borders[LEFT].borderWidth), Math.max(0, tlv - borders[TOP].borderWidth), CORNER.TOP_LEFT) : new _Vector2.default(bounds.left + borders[LEFT].borderWidth, bounds.top + borders[TOP].borderWidth),
        topRightOuter: trh > 0 || trv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT) : new _Vector2.default(bounds.left + bounds.width, bounds.top),
        topRightInner: trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borders[LEFT].borderWidth), bounds.top + borders[TOP].borderWidth, topWidth > bounds.width + borders[LEFT].borderWidth ? 0 : trh - borders[LEFT].borderWidth, trv - borders[TOP].borderWidth, CORNER.TOP_RIGHT) : new _Vector2.default(bounds.left + bounds.width - borders[RIGHT].borderWidth, bounds.top + borders[TOP].borderWidth),
        bottomRightOuter: brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT) : new _Vector2.default(bounds.left + bounds.width, bounds.top + bounds.height),
        bottomRightInner: brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borders[LEFT].borderWidth), bounds.top + Math.min(rightHeight, bounds.height + borders[TOP].borderWidth), Math.max(0, brh - borders[RIGHT].borderWidth), brv - borders[BOTTOM].borderWidth, CORNER.BOTTOM_RIGHT) : new _Vector2.default(bounds.left + bounds.width - borders[RIGHT].borderWidth, bounds.top + bounds.height - borders[BOTTOM].borderWidth),
        bottomLeftOuter: blh > 0 || blv > 0 ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT) : new _Vector2.default(bounds.left, bounds.top + bounds.height),
        bottomLeftInner: blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borders[LEFT].borderWidth, bounds.top + leftHeight, Math.max(0, blh - borders[LEFT].borderWidth), blv - borders[BOTTOM].borderWidth, CORNER.BOTTOM_LEFT) : new _Vector2.default(bounds.left + borders[LEFT].borderWidth, bounds.top + bounds.height - borders[BOTTOM].borderWidth)
    };
};

var CORNER = {
    TOP_LEFT: 0,
    TOP_RIGHT: 1,
    BOTTOM_RIGHT: 2,
    BOTTOM_LEFT: 3
};

var getCurvePoints = function getCurvePoints(x, y, r1, r2, position) {
    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
    var ox = r1 * kappa; // control point offset horizontal
    var oy = r2 * kappa; // control point offset vertical
    var xm = x + r1; // x-middle
    var ym = y + r2; // y-middle

    switch (position) {
        case CORNER.TOP_LEFT:
            return new _BezierCurve2.default(new _Vector2.default(x, ym), new _Vector2.default(x, ym - oy), new _Vector2.default(xm - ox, y), new _Vector2.default(xm, y));
        case CORNER.TOP_RIGHT:
            return new _BezierCurve2.default(new _Vector2.default(x, y), new _Vector2.default(x + ox, y), new _Vector2.default(xm, ym - oy), new _Vector2.default(xm, ym));
        case CORNER.BOTTOM_RIGHT:
            return new _BezierCurve2.default(new _Vector2.default(xm, y), new _Vector2.default(xm, y + oy), new _Vector2.default(x + ox, ym), new _Vector2.default(x, ym));
        case CORNER.BOTTOM_LEFT:
        default:
            return new _BezierCurve2.default(new _Vector2.default(xm, ym), new _Vector2.default(xm - ox, ym), new _Vector2.default(x, y + oy), new _Vector2.default(x, y));
    }
};
});

unwrapExports(Bounds_1);
var Bounds_2 = Bounds_1.parseBoundCurves;
var Bounds_3 = Bounds_1.calculatePaddingBoxPath;
var Bounds_4 = Bounds_1.calculateBorderBoxPath;
var Bounds_5 = Bounds_1.parsePathForBorder;
var Bounds_6 = Bounds_1.parseDocumentSize;
var Bounds_7 = Bounds_1.calculateContentBox;
var Bounds_8 = Bounds_1.calculatePaddingBox;
var Bounds_9 = Bounds_1.parseBounds;
var Bounds_10 = Bounds_1.Bounds;

var padding = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parsePadding = exports.PADDING_SIDES = undefined;



var _Length2 = _interopRequireDefault(Length_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PADDING_SIDES = exports.PADDING_SIDES = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
};

var SIDES = ['top', 'right', 'bottom', 'left'];

var parsePadding = exports.parsePadding = function parsePadding(style) {
    return SIDES.map(function (side) {
        return new _Length2.default(style.getPropertyValue('padding-' + side));
    });
};
});

unwrapExports(padding);
var padding_1 = padding.parsePadding;
var padding_2 = padding.PADDING_SIDES;

var background = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseBackgroundImage = exports.parseBackground = exports.calculateBackgroundRepeatPath = exports.calculateBackgroundPosition = exports.calculateBackgroungPositioningArea = exports.calculateBackgroungPaintingArea = exports.calculateGradientBackgroundSize = exports.calculateBackgroundSize = exports.BACKGROUND_ORIGIN = exports.BACKGROUND_CLIP = exports.BACKGROUND_SIZE = exports.BACKGROUND_REPEAT = undefined;



var _Color2 = _interopRequireDefault(Color_1);



var _Length2 = _interopRequireDefault(Length_1);



var _Size2 = _interopRequireDefault(Size_1);



var _Vector2 = _interopRequireDefault(Vector_1);





function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BACKGROUND_REPEAT = exports.BACKGROUND_REPEAT = {
    REPEAT: 0,
    NO_REPEAT: 1,
    REPEAT_X: 2,
    REPEAT_Y: 3
};

var BACKGROUND_SIZE = exports.BACKGROUND_SIZE = {
    AUTO: 0,
    CONTAIN: 1,
    COVER: 2,
    LENGTH: 3
};

var BACKGROUND_CLIP = exports.BACKGROUND_CLIP = {
    BORDER_BOX: 0,
    PADDING_BOX: 1,
    CONTENT_BOX: 2
};

var BACKGROUND_ORIGIN = exports.BACKGROUND_ORIGIN = BACKGROUND_CLIP;

var AUTO = 'auto';

var BackgroundSize = function BackgroundSize(size) {
    _classCallCheck(this, BackgroundSize);

    switch (size) {
        case 'contain':
            this.size = BACKGROUND_SIZE.CONTAIN;
            break;
        case 'cover':
            this.size = BACKGROUND_SIZE.COVER;
            break;
        case 'auto':
            this.size = BACKGROUND_SIZE.AUTO;
            break;
        default:
            this.value = new _Length2.default(size);
    }
};

var calculateBackgroundSize = exports.calculateBackgroundSize = function calculateBackgroundSize(backgroundImage, image, bounds) {
    var width = 0;
    var height = 0;
    var size = backgroundImage.size;
    if (size[0].size === BACKGROUND_SIZE.CONTAIN || size[0].size === BACKGROUND_SIZE.COVER) {
        var targetRatio = bounds.width / bounds.height;
        var currentRatio = image.width / image.height;
        return targetRatio < currentRatio !== (size[0].size === BACKGROUND_SIZE.COVER) ? new _Size2.default(bounds.width, bounds.width / currentRatio) : new _Size2.default(bounds.height * currentRatio, bounds.height);
    }

    if (size[0].value) {
        width = size[0].value.getAbsoluteValue(bounds.width);
    }

    if (size[0].size === BACKGROUND_SIZE.AUTO && size[1].size === BACKGROUND_SIZE.AUTO) {
        height = image.height;
    } else if (size[1].size === BACKGROUND_SIZE.AUTO) {
        height = width / image.width * image.height;
    } else if (size[1].value) {
        height = size[1].value.getAbsoluteValue(bounds.height);
    }

    if (size[0].size === BACKGROUND_SIZE.AUTO) {
        width = height / image.height * image.width;
    }

    return new _Size2.default(width, height);
};

var calculateGradientBackgroundSize = exports.calculateGradientBackgroundSize = function calculateGradientBackgroundSize(backgroundImage, bounds) {
    var size = backgroundImage.size;
    var width = size[0].value ? size[0].value.getAbsoluteValue(bounds.width) : bounds.width;
    var height = size[1].value ? size[1].value.getAbsoluteValue(bounds.height) : size[0].value ? width : bounds.height;

    return new _Size2.default(width, height);
};

var AUTO_SIZE = new BackgroundSize(AUTO);

var calculateBackgroungPaintingArea = exports.calculateBackgroungPaintingArea = function calculateBackgroungPaintingArea(curves, clip) {
    switch (clip) {
        case BACKGROUND_CLIP.BORDER_BOX:
            return (0, Bounds_1.calculateBorderBoxPath)(curves);
        case BACKGROUND_CLIP.PADDING_BOX:
        default:
            return (0, Bounds_1.calculatePaddingBoxPath)(curves);
    }
};

var calculateBackgroungPositioningArea = exports.calculateBackgroungPositioningArea = function calculateBackgroungPositioningArea(backgroundOrigin, bounds, padding$$1, border) {
    var paddingBox = (0, Bounds_1.calculatePaddingBox)(bounds, border);

    switch (backgroundOrigin) {
        case BACKGROUND_ORIGIN.BORDER_BOX:
            return bounds;
        case BACKGROUND_ORIGIN.CONTENT_BOX:
            var paddingLeft = padding$$1[padding.PADDING_SIDES.LEFT].getAbsoluteValue(bounds.width);
            var paddingRight = padding$$1[padding.PADDING_SIDES.RIGHT].getAbsoluteValue(bounds.width);
            var paddingTop = padding$$1[padding.PADDING_SIDES.TOP].getAbsoluteValue(bounds.width);
            var paddingBottom = padding$$1[padding.PADDING_SIDES.BOTTOM].getAbsoluteValue(bounds.width);
            return new Bounds_1.Bounds(paddingBox.left + paddingLeft, paddingBox.top + paddingTop, paddingBox.width - paddingLeft - paddingRight, paddingBox.height - paddingTop - paddingBottom);
        case BACKGROUND_ORIGIN.PADDING_BOX:
        default:
            return paddingBox;
    }
};

var calculateBackgroundPosition = exports.calculateBackgroundPosition = function calculateBackgroundPosition(position, size, bounds) {
    return new _Vector2.default(position[0].getAbsoluteValue(bounds.width - size.width), position[1].getAbsoluteValue(bounds.height - size.height));
};

var calculateBackgroundRepeatPath = exports.calculateBackgroundRepeatPath = function calculateBackgroundRepeatPath(background, position, size, backgroundPositioningArea, bounds) {
    var repeat = background.repeat;
    switch (repeat) {
        case BACKGROUND_REPEAT.REPEAT_X:
            return [new _Vector2.default(Math.round(bounds.left), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(size.height + backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(bounds.left), Math.round(size.height + backgroundPositioningArea.top + position.y))];
        case BACKGROUND_REPEAT.REPEAT_Y:
            return [new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(bounds.top)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(bounds.top)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(bounds.height + bounds.top)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(bounds.height + bounds.top))];
        case BACKGROUND_REPEAT.NO_REPEAT:
            return [new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(backgroundPositioningArea.top + position.y + size.height)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(backgroundPositioningArea.top + position.y + size.height))];
        default:
            return [new _Vector2.default(Math.round(bounds.left), Math.round(bounds.top)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(bounds.top)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(bounds.height + bounds.top)), new _Vector2.default(Math.round(bounds.left), Math.round(bounds.height + bounds.top))];
    }
};

var parseBackground = exports.parseBackground = function parseBackground(style, resourceLoader) {
    return {
        backgroundColor: new _Color2.default(style.backgroundColor),
        backgroundImage: parseBackgroundImages(style, resourceLoader),
        backgroundClip: parseBackgroundClip(style.backgroundClip),
        backgroundOrigin: parseBackgroundOrigin(style.backgroundOrigin)
    };
};

var parseBackgroundClip = function parseBackgroundClip(backgroundClip) {
    switch (backgroundClip) {
        case 'padding-box':
            return BACKGROUND_CLIP.PADDING_BOX;
        case 'content-box':
            return BACKGROUND_CLIP.CONTENT_BOX;
    }
    return BACKGROUND_CLIP.BORDER_BOX;
};

var parseBackgroundOrigin = function parseBackgroundOrigin(backgroundOrigin) {
    switch (backgroundOrigin) {
        case 'padding-box':
            return BACKGROUND_ORIGIN.PADDING_BOX;
        case 'content-box':
            return BACKGROUND_ORIGIN.CONTENT_BOX;
    }
    return BACKGROUND_ORIGIN.BORDER_BOX;
};

var parseBackgroundRepeat = function parseBackgroundRepeat(backgroundRepeat) {
    switch (backgroundRepeat.trim()) {
        case 'no-repeat':
            return BACKGROUND_REPEAT.NO_REPEAT;
        case 'repeat-x':
        case 'repeat no-repeat':
            return BACKGROUND_REPEAT.REPEAT_X;
        case 'repeat-y':
        case 'no-repeat repeat':
            return BACKGROUND_REPEAT.REPEAT_Y;
        case 'repeat':
            return BACKGROUND_REPEAT.REPEAT;
    }

    return BACKGROUND_REPEAT.REPEAT;
};

var parseBackgroundImages = function parseBackgroundImages(style, resourceLoader) {
    var sources = parseBackgroundImage(style.backgroundImage).map(function (backgroundImage) {
        if (backgroundImage.method === 'url') {
            var key = resourceLoader.loadImage(backgroundImage.args[0]);
            backgroundImage.args = key ? [key] : [];
        }
        return backgroundImage;
    });
    var positions = style.backgroundPosition.split(',');
    var repeats = style.backgroundRepeat.split(',');
    var sizes = style.backgroundSize.split(',');

    return sources.map(function (source, index) {
        var size = (sizes[index] || AUTO).trim().split(' ').map(parseBackgroundSize);
        var position = (positions[index] || AUTO).trim().split(' ').map(parseBackgoundPosition);

        return {
            source: source,
            repeat: parseBackgroundRepeat(typeof repeats[index] === 'string' ? repeats[index] : repeats[0]),
            size: size.length < 2 ? [size[0], AUTO_SIZE] : [size[0], size[1]],
            position: position.length < 2 ? [position[0], position[0]] : [position[0], position[1]]
        };
    });
};

var parseBackgroundSize = function parseBackgroundSize(size) {
    return size === 'auto' ? AUTO_SIZE : new BackgroundSize(size);
};

var parseBackgoundPosition = function parseBackgoundPosition(position) {
    switch (position) {
        case 'bottom':
        case 'right':
            return new _Length2.default('100%');
        case 'left':
        case 'top':
            return new _Length2.default('0%');
        case 'auto':
            return new _Length2.default('0');
    }
    return new _Length2.default(position);
};

var parseBackgroundImage = exports.parseBackgroundImage = function parseBackgroundImage(image) {
    var whitespace = /^\s$/;
    var results = [];

    var args = [];
    var method = '';
    var quote = null;
    var definition = '';
    var mode = 0;
    var numParen = 0;

    var appendResult = function appendResult() {
        var prefix = '';
        if (method) {
            if (definition.substr(0, 1) === '"') {
                definition = definition.substr(1, definition.length - 2);
            }

            if (definition) {
                args.push(definition.trim());
            }

            var prefix_i = method.indexOf('-', 1) + 1;
            if (method.substr(0, 1) === '-' && prefix_i > 0) {
                prefix = method.substr(0, prefix_i).toLowerCase();
                method = method.substr(prefix_i);
            }
            method = method.toLowerCase();
            if (method !== 'none') {
                results.push({
                    prefix: prefix,
                    method: method,
                    args: args
                });
            }
        }
        args = [];
        method = definition = '';
    };

    image.split('').forEach(function (c) {
        if (mode === 0 && whitespace.test(c)) {
            return;
        }
        switch (c) {
            case '"':
                if (!quote) {
                    quote = c;
                } else if (quote === c) {
                    quote = null;
                }
                break;
            case '(':
                if (quote) {
                    break;
                } else if (mode === 0) {
                    mode = 1;
                    return;
                } else {
                    numParen++;
                }
                break;
            case ')':
                if (quote) {
                    break;
                } else if (mode === 1) {
                    if (numParen === 0) {
                        mode = 0;
                        appendResult();
                        return;
                    } else {
                        numParen--;
                    }
                }
                break;

            case ',':
                if (quote) {
                    break;
                } else if (mode === 0) {
                    appendResult();
                    return;
                } else if (mode === 1) {
                    if (numParen === 0 && !method.match(/^url$/i)) {
                        args.push(definition.trim());
                        definition = '';
                        return;
                    }
                }
                break;
        }

        if (mode === 0) {
            method += c;
        } else {
            definition += c;
        }
    });

    appendResult();
    return results;
};
});

unwrapExports(background);
var background_1 = background.parseBackgroundImage;
var background_2 = background.parseBackground;
var background_3 = background.calculateBackgroundRepeatPath;
var background_4 = background.calculateBackgroundPosition;
var background_5 = background.calculateBackgroungPositioningArea;
var background_6 = background.calculateBackgroungPaintingArea;
var background_7 = background.calculateGradientBackgroundSize;
var background_8 = background.calculateBackgroundSize;
var background_9 = background.BACKGROUND_ORIGIN;
var background_10 = background.BACKGROUND_CLIP;
var background_11 = background.BACKGROUND_SIZE;
var background_12 = background.BACKGROUND_REPEAT;

var border = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseBorder = exports.BORDER_SIDES = exports.BORDER_STYLE = undefined;



var _Color2 = _interopRequireDefault(Color_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BORDER_STYLE = exports.BORDER_STYLE = {
    NONE: 0,
    SOLID: 1
};

var BORDER_SIDES = exports.BORDER_SIDES = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
};

var SIDES = Object.keys(BORDER_SIDES).map(function (s) {
    return s.toLowerCase();
});

var parseBorderStyle = function parseBorderStyle(style) {
    switch (style) {
        case 'none':
            return BORDER_STYLE.NONE;
    }
    return BORDER_STYLE.SOLID;
};

var parseBorder = exports.parseBorder = function parseBorder(style) {
    return SIDES.map(function (side) {
        var borderColor = new _Color2.default(style.getPropertyValue('border-' + side + '-color'));
        var borderStyle = parseBorderStyle(style.getPropertyValue('border-' + side + '-style'));
        var borderWidth = parseFloat(style.getPropertyValue('border-' + side + '-width'));
        return {
            borderColor: borderColor,
            borderStyle: borderStyle,
            borderWidth: isNaN(borderWidth) ? 0 : borderWidth
        };
    });
};
});

unwrapExports(border);
var border_1 = border.parseBorder;
var border_2 = border.BORDER_SIDES;
var border_3 = border.BORDER_STYLE;

var borderRadius = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseBorderRadius = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var _Length2 = _interopRequireDefault(Length_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIDES = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

var parseBorderRadius = exports.parseBorderRadius = function parseBorderRadius(style) {
    return SIDES.map(function (side) {
        var value = style.getPropertyValue('border-' + side + '-radius');

        var _value$split$map = value.split(' ').map(_Length2.default.create),
            _value$split$map2 = _slicedToArray(_value$split$map, 2),
            horizontal = _value$split$map2[0],
            vertical = _value$split$map2[1];

        return typeof vertical === 'undefined' ? [horizontal, horizontal] : [horizontal, vertical];
    });
};
});

unwrapExports(borderRadius);
var borderRadius_1 = borderRadius.parseBorderRadius;

var display = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var DISPLAY = exports.DISPLAY = {
    NONE: 1 << 0,
    BLOCK: 1 << 1,
    INLINE: 1 << 2,
    RUN_IN: 1 << 3,
    FLOW: 1 << 4,
    FLOW_ROOT: 1 << 5,
    TABLE: 1 << 6,
    FLEX: 1 << 7,
    GRID: 1 << 8,
    RUBY: 1 << 9,
    SUBGRID: 1 << 10,
    LIST_ITEM: 1 << 11,
    TABLE_ROW_GROUP: 1 << 12,
    TABLE_HEADER_GROUP: 1 << 13,
    TABLE_FOOTER_GROUP: 1 << 14,
    TABLE_ROW: 1 << 15,
    TABLE_CELL: 1 << 16,
    TABLE_COLUMN_GROUP: 1 << 17,
    TABLE_COLUMN: 1 << 18,
    TABLE_CAPTION: 1 << 19,
    RUBY_BASE: 1 << 20,
    RUBY_TEXT: 1 << 21,
    RUBY_BASE_CONTAINER: 1 << 22,
    RUBY_TEXT_CONTAINER: 1 << 23,
    CONTENTS: 1 << 24,
    INLINE_BLOCK: 1 << 25,
    INLINE_LIST_ITEM: 1 << 26,
    INLINE_TABLE: 1 << 27,
    INLINE_FLEX: 1 << 28,
    INLINE_GRID: 1 << 29
};

var parseDisplayValue = function parseDisplayValue(display) {
    switch (display) {
        case 'block':
            return DISPLAY.BLOCK;
        case 'inline':
            return DISPLAY.INLINE;
        case 'run-in':
            return DISPLAY.RUN_IN;
        case 'flow':
            return DISPLAY.FLOW;
        case 'flow-root':
            return DISPLAY.FLOW_ROOT;
        case 'table':
            return DISPLAY.TABLE;
        case 'flex':
            return DISPLAY.FLEX;
        case 'grid':
            return DISPLAY.GRID;
        case 'ruby':
            return DISPLAY.RUBY;
        case 'subgrid':
            return DISPLAY.SUBGRID;
        case 'list-item':
            return DISPLAY.LIST_ITEM;
        case 'table-row-group':
            return DISPLAY.TABLE_ROW_GROUP;
        case 'table-header-group':
            return DISPLAY.TABLE_HEADER_GROUP;
        case 'table-footer-group':
            return DISPLAY.TABLE_FOOTER_GROUP;
        case 'table-row':
            return DISPLAY.TABLE_ROW;
        case 'table-cell':
            return DISPLAY.TABLE_CELL;
        case 'table-column-group':
            return DISPLAY.TABLE_COLUMN_GROUP;
        case 'table-column':
            return DISPLAY.TABLE_COLUMN;
        case 'table-caption':
            return DISPLAY.TABLE_CAPTION;
        case 'ruby-base':
            return DISPLAY.RUBY_BASE;
        case 'ruby-text':
            return DISPLAY.RUBY_TEXT;
        case 'ruby-base-container':
            return DISPLAY.RUBY_BASE_CONTAINER;
        case 'ruby-text-container':
            return DISPLAY.RUBY_TEXT_CONTAINER;
        case 'contents':
            return DISPLAY.CONTENTS;
        case 'inline-block':
            return DISPLAY.INLINE_BLOCK;
        case 'inline-list-item':
            return DISPLAY.INLINE_LIST_ITEM;
        case 'inline-table':
            return DISPLAY.INLINE_TABLE;
        case 'inline-flex':
            return DISPLAY.INLINE_FLEX;
        case 'inline-grid':
            return DISPLAY.INLINE_GRID;
    }

    return DISPLAY.NONE;
};

var setDisplayBit = function setDisplayBit(bit, display) {
    return bit | parseDisplayValue(display);
};

var parseDisplay = exports.parseDisplay = function parseDisplay(display) {
    return display.split(' ').reduce(setDisplayBit, 0);
};
});

unwrapExports(display);
var display_1 = display.DISPLAY;
var display_2 = display.parseDisplay;

var float_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var FLOAT = exports.FLOAT = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
    INLINE_START: 3,
    INLINE_END: 4
};

var parseCSSFloat = exports.parseCSSFloat = function parseCSSFloat(float) {
    switch (float) {
        case 'left':
            return FLOAT.LEFT;
        case 'right':
            return FLOAT.RIGHT;
        case 'inline-start':
            return FLOAT.INLINE_START;
        case 'inline-end':
            return FLOAT.INLINE_END;
    }
    return FLOAT.NONE;
};
});

unwrapExports(float_1);
var float_2 = float_1.FLOAT;
var float_3 = float_1.parseCSSFloat;

var font = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});


var parseFontWeight = function parseFontWeight(weight) {
    switch (weight) {
        case 'normal':
            return 400;
        case 'bold':
            return 700;
    }

    var value = parseInt(weight, 10);
    return isNaN(value) ? 400 : value;
};

var parseFont = exports.parseFont = function parseFont(style) {
    var fontFamily = style.fontFamily;
    var fontSize = style.fontSize;
    var fontStyle = style.fontStyle;
    var fontVariant = style.fontVariant;
    var fontWeight = parseFontWeight(style.fontWeight);

    return {
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontStyle: fontStyle,
        fontVariant: fontVariant,
        fontWeight: fontWeight
    };
};
});

unwrapExports(font);
var font_1 = font.parseFont;

var letterSpacing = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var parseLetterSpacing = exports.parseLetterSpacing = function parseLetterSpacing(letterSpacing) {
    if (letterSpacing === 'normal') {
        return 0;
    }
    var value = parseFloat(letterSpacing);
    return isNaN(value) ? 0 : value;
};
});

unwrapExports(letterSpacing);
var letterSpacing_1 = letterSpacing.parseLetterSpacing;

var lineBreak = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var LINE_BREAK = exports.LINE_BREAK = {
    NORMAL: 'normal',
    STRICT: 'strict'
};

var parseLineBreak = exports.parseLineBreak = function parseLineBreak(wordBreak) {
    switch (wordBreak) {
        case 'strict':
            return LINE_BREAK.STRICT;
        case 'normal':
        default:
            return LINE_BREAK.NORMAL;
    }
};
});

unwrapExports(lineBreak);
var lineBreak_1 = lineBreak.LINE_BREAK;
var lineBreak_2 = lineBreak.parseLineBreak;

var listStyle = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseListStyle = exports.parseListStyleType = exports.LIST_STYLE_TYPE = exports.LIST_STYLE_POSITION = undefined;



var LIST_STYLE_POSITION = exports.LIST_STYLE_POSITION = {
    INSIDE: 0,
    OUTSIDE: 1
};

var LIST_STYLE_TYPE = exports.LIST_STYLE_TYPE = {
    NONE: -1,
    DISC: 0,
    CIRCLE: 1,
    SQUARE: 2,
    DECIMAL: 3,
    CJK_DECIMAL: 4,
    DECIMAL_LEADING_ZERO: 5,
    LOWER_ROMAN: 6,
    UPPER_ROMAN: 7,
    LOWER_GREEK: 8,
    LOWER_ALPHA: 9,
    UPPER_ALPHA: 10,
    ARABIC_INDIC: 11,
    ARMENIAN: 12,
    BENGALI: 13,
    CAMBODIAN: 14,
    CJK_EARTHLY_BRANCH: 15,
    CJK_HEAVENLY_STEM: 16,
    CJK_IDEOGRAPHIC: 17,
    DEVANAGARI: 18,
    ETHIOPIC_NUMERIC: 19,
    GEORGIAN: 20,
    GUJARATI: 21,
    GURMUKHI: 22,
    HEBREW: 22,
    HIRAGANA: 23,
    HIRAGANA_IROHA: 24,
    JAPANESE_FORMAL: 25,
    JAPANESE_INFORMAL: 26,
    KANNADA: 27,
    KATAKANA: 28,
    KATAKANA_IROHA: 29,
    KHMER: 30,
    KOREAN_HANGUL_FORMAL: 31,
    KOREAN_HANJA_FORMAL: 32,
    KOREAN_HANJA_INFORMAL: 33,
    LAO: 34,
    LOWER_ARMENIAN: 35,
    MALAYALAM: 36,
    MONGOLIAN: 37,
    MYANMAR: 38,
    ORIYA: 39,
    PERSIAN: 40,
    SIMP_CHINESE_FORMAL: 41,
    SIMP_CHINESE_INFORMAL: 42,
    TAMIL: 43,
    TELUGU: 44,
    THAI: 45,
    TIBETAN: 46,
    TRAD_CHINESE_FORMAL: 47,
    TRAD_CHINESE_INFORMAL: 48,
    UPPER_ARMENIAN: 49,
    DISCLOSURE_OPEN: 50,
    DISCLOSURE_CLOSED: 51
};

var parseListStyleType = exports.parseListStyleType = function parseListStyleType(type) {
    switch (type) {
        case 'disc':
            return LIST_STYLE_TYPE.DISC;
        case 'circle':
            return LIST_STYLE_TYPE.CIRCLE;
        case 'square':
            return LIST_STYLE_TYPE.SQUARE;
        case 'decimal':
            return LIST_STYLE_TYPE.DECIMAL;
        case 'cjk-decimal':
            return LIST_STYLE_TYPE.CJK_DECIMAL;
        case 'decimal-leading-zero':
            return LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO;
        case 'lower-roman':
            return LIST_STYLE_TYPE.LOWER_ROMAN;
        case 'upper-roman':
            return LIST_STYLE_TYPE.UPPER_ROMAN;
        case 'lower-greek':
            return LIST_STYLE_TYPE.LOWER_GREEK;
        case 'lower-alpha':
            return LIST_STYLE_TYPE.LOWER_ALPHA;
        case 'upper-alpha':
            return LIST_STYLE_TYPE.UPPER_ALPHA;
        case 'arabic-indic':
            return LIST_STYLE_TYPE.ARABIC_INDIC;
        case 'armenian':
            return LIST_STYLE_TYPE.ARMENIAN;
        case 'bengali':
            return LIST_STYLE_TYPE.BENGALI;
        case 'cambodian':
            return LIST_STYLE_TYPE.CAMBODIAN;
        case 'cjk-earthly-branch':
            return LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH;
        case 'cjk-heavenly-stem':
            return LIST_STYLE_TYPE.CJK_HEAVENLY_STEM;
        case 'cjk-ideographic':
            return LIST_STYLE_TYPE.CJK_IDEOGRAPHIC;
        case 'devanagari':
            return LIST_STYLE_TYPE.DEVANAGARI;
        case 'ethiopic-numeric':
            return LIST_STYLE_TYPE.ETHIOPIC_NUMERIC;
        case 'georgian':
            return LIST_STYLE_TYPE.GEORGIAN;
        case 'gujarati':
            return LIST_STYLE_TYPE.GUJARATI;
        case 'gurmukhi':
            return LIST_STYLE_TYPE.GURMUKHI;
        case 'hebrew':
            return LIST_STYLE_TYPE.HEBREW;
        case 'hiragana':
            return LIST_STYLE_TYPE.HIRAGANA;
        case 'hiragana-iroha':
            return LIST_STYLE_TYPE.HIRAGANA_IROHA;
        case 'japanese-formal':
            return LIST_STYLE_TYPE.JAPANESE_FORMAL;
        case 'japanese-informal':
            return LIST_STYLE_TYPE.JAPANESE_INFORMAL;
        case 'kannada':
            return LIST_STYLE_TYPE.KANNADA;
        case 'katakana':
            return LIST_STYLE_TYPE.KATAKANA;
        case 'katakana-iroha':
            return LIST_STYLE_TYPE.KATAKANA_IROHA;
        case 'khmer':
            return LIST_STYLE_TYPE.KHMER;
        case 'korean-hangul-formal':
            return LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL;
        case 'korean-hanja-formal':
            return LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL;
        case 'korean-hanja-informal':
            return LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL;
        case 'lao':
            return LIST_STYLE_TYPE.LAO;
        case 'lower-armenian':
            return LIST_STYLE_TYPE.LOWER_ARMENIAN;
        case 'malayalam':
            return LIST_STYLE_TYPE.MALAYALAM;
        case 'mongolian':
            return LIST_STYLE_TYPE.MONGOLIAN;
        case 'myanmar':
            return LIST_STYLE_TYPE.MYANMAR;
        case 'oriya':
            return LIST_STYLE_TYPE.ORIYA;
        case 'persian':
            return LIST_STYLE_TYPE.PERSIAN;
        case 'simp-chinese-formal':
            return LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL;
        case 'simp-chinese-informal':
            return LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL;
        case 'tamil':
            return LIST_STYLE_TYPE.TAMIL;
        case 'telugu':
            return LIST_STYLE_TYPE.TELUGU;
        case 'thai':
            return LIST_STYLE_TYPE.THAI;
        case 'tibetan':
            return LIST_STYLE_TYPE.TIBETAN;
        case 'trad-chinese-formal':
            return LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL;
        case 'trad-chinese-informal':
            return LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL;
        case 'upper-armenian':
            return LIST_STYLE_TYPE.UPPER_ARMENIAN;
        case 'disclosure-open':
            return LIST_STYLE_TYPE.DISCLOSURE_OPEN;
        case 'disclosure-closed':
            return LIST_STYLE_TYPE.DISCLOSURE_CLOSED;
        case 'none':
        default:
            return LIST_STYLE_TYPE.NONE;
    }
};

var parseListStyle = exports.parseListStyle = function parseListStyle(style) {
    var listStyleImage = (0, background.parseBackgroundImage)(style.getPropertyValue('list-style-image'));
    return {
        listStyleType: parseListStyleType(style.getPropertyValue('list-style-type')),
        listStyleImage: listStyleImage.length ? listStyleImage[0] : null,
        listStylePosition: parseListStylePosition(style.getPropertyValue('list-style-position'))
    };
};

var parseListStylePosition = function parseListStylePosition(position) {
    switch (position) {
        case 'inside':
            return LIST_STYLE_POSITION.INSIDE;
        case 'outside':
        default:
            return LIST_STYLE_POSITION.OUTSIDE;
    }
};
});

unwrapExports(listStyle);
var listStyle_1 = listStyle.parseListStyle;
var listStyle_2 = listStyle.parseListStyleType;
var listStyle_3 = listStyle.LIST_STYLE_TYPE;
var listStyle_4 = listStyle.LIST_STYLE_POSITION;

var margin = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseMargin = undefined;



var _Length2 = _interopRequireDefault(Length_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIDES = ['top', 'right', 'bottom', 'left'];

var parseMargin = exports.parseMargin = function parseMargin(style) {
    return SIDES.map(function (side) {
        return new _Length2.default(style.getPropertyValue('margin-' + side));
    });
};
});

unwrapExports(margin);
var margin_1 = margin.parseMargin;

var overflow = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var OVERFLOW = exports.OVERFLOW = {
    VISIBLE: 0,
    HIDDEN: 1,
    SCROLL: 2,
    AUTO: 3
};

var parseOverflow = exports.parseOverflow = function parseOverflow(overflow) {
    switch (overflow) {
        case 'hidden':
            return OVERFLOW.HIDDEN;
        case 'scroll':
            return OVERFLOW.SCROLL;
        case 'auto':
            return OVERFLOW.AUTO;
        case 'visible':
        default:
            return OVERFLOW.VISIBLE;
    }
};
});

unwrapExports(overflow);
var overflow_1 = overflow.OVERFLOW;
var overflow_2 = overflow.parseOverflow;

var overflowWrap = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var OVERFLOW_WRAP = exports.OVERFLOW_WRAP = {
    NORMAL: 0,
    BREAK_WORD: 1
};

var parseOverflowWrap = exports.parseOverflowWrap = function parseOverflowWrap(overflow) {
    switch (overflow) {
        case 'break-word':
            return OVERFLOW_WRAP.BREAK_WORD;
        case 'normal':
        default:
            return OVERFLOW_WRAP.NORMAL;
    }
};
});

unwrapExports(overflowWrap);
var overflowWrap_1 = overflowWrap.OVERFLOW_WRAP;
var overflowWrap_2 = overflowWrap.parseOverflowWrap;

var position = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var POSITION = exports.POSITION = {
    STATIC: 0,
    RELATIVE: 1,
    ABSOLUTE: 2,
    FIXED: 3,
    STICKY: 4
};

var parsePosition = exports.parsePosition = function parsePosition(position) {
    switch (position) {
        case 'relative':
            return POSITION.RELATIVE;
        case 'absolute':
            return POSITION.ABSOLUTE;
        case 'fixed':
            return POSITION.FIXED;
        case 'sticky':
            return POSITION.STICKY;
    }

    return POSITION.STATIC;
};
});

unwrapExports(position);
var position_1 = position.POSITION;
var position_2 = position.parsePosition;

var textShadow = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseTextShadow = undefined;



var _Color2 = _interopRequireDefault(Color_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NUMBER = /^([+-]|\d|\.)$/i;

var parseTextShadow = exports.parseTextShadow = function parseTextShadow(textShadow) {
    if (textShadow === 'none' || typeof textShadow !== 'string') {
        return null;
    }

    var currentValue = '';
    var isLength = false;
    var values = [];
    var shadows = [];
    var numParens = 0;
    var color = null;

    var appendValue = function appendValue() {
        if (currentValue.length) {
            if (isLength) {
                values.push(parseFloat(currentValue));
            } else {
                color = new _Color2.default(currentValue);
            }
        }
        isLength = false;
        currentValue = '';
    };

    var appendShadow = function appendShadow() {
        if (values.length && color !== null) {
            shadows.push({
                color: color,
                offsetX: values[0] || 0,
                offsetY: values[1] || 0,
                blur: values[2] || 0
            });
        }
        values.splice(0, values.length);
        color = null;
    };

    for (var i = 0; i < textShadow.length; i++) {
        var c = textShadow[i];
        switch (c) {
            case '(':
                currentValue += c;
                numParens++;
                break;
            case ')':
                currentValue += c;
                numParens--;
                break;
            case ',':
                if (numParens === 0) {
                    appendValue();
                    appendShadow();
                } else {
                    currentValue += c;
                }
                break;
            case ' ':
                if (numParens === 0) {
                    appendValue();
                } else {
                    currentValue += c;
                }
                break;
            default:
                if (currentValue.length === 0 && NUMBER.test(c)) {
                    isLength = true;
                }
                currentValue += c;
        }
    }

    appendValue();
    appendShadow();

    if (shadows.length === 0) {
        return null;
    }

    return shadows;
};
});

unwrapExports(textShadow);
var textShadow_1 = textShadow.parseTextShadow;

var textTransform = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var TEXT_TRANSFORM = exports.TEXT_TRANSFORM = {
    NONE: 0,
    LOWERCASE: 1,
    UPPERCASE: 2,
    CAPITALIZE: 3
};

var parseTextTransform = exports.parseTextTransform = function parseTextTransform(textTransform) {
    switch (textTransform) {
        case 'uppercase':
            return TEXT_TRANSFORM.UPPERCASE;
        case 'lowercase':
            return TEXT_TRANSFORM.LOWERCASE;
        case 'capitalize':
            return TEXT_TRANSFORM.CAPITALIZE;
    }

    return TEXT_TRANSFORM.NONE;
};
});

unwrapExports(textTransform);
var textTransform_1 = textTransform.TEXT_TRANSFORM;
var textTransform_2 = textTransform.parseTextTransform;

var transform = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseTransform = undefined;



var _Length2 = _interopRequireDefault(Length_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toFloat = function toFloat(s) {
    return parseFloat(s.trim());
};

var MATRIX = /(matrix|matrix3d)\((.+)\)/;

var parseTransform = exports.parseTransform = function parseTransform(style) {
    var transform = parseTransformMatrix(style.transform || style.webkitTransform || style.mozTransform ||
    // $FlowFixMe
    style.msTransform ||
    // $FlowFixMe
    style.oTransform);
    if (transform === null) {
        return null;
    }

    return {
        transform: transform,
        transformOrigin: parseTransformOrigin(style.transformOrigin || style.webkitTransformOrigin || style.mozTransformOrigin ||
        // $FlowFixMe
        style.msTransformOrigin ||
        // $FlowFixMe
        style.oTransformOrigin)
    };
};

// $FlowFixMe
var parseTransformOrigin = function parseTransformOrigin(origin) {
    if (typeof origin !== 'string') {
        var v = new _Length2.default('0');
        return [v, v];
    }
    var values = origin.split(' ').map(_Length2.default.create);
    return [values[0], values[1]];
};

// $FlowFixMe
var parseTransformMatrix = function parseTransformMatrix(transform) {
    if (transform === 'none' || typeof transform !== 'string') {
        return null;
    }

    var match = transform.match(MATRIX);
    if (match) {
        if (match[1] === 'matrix') {
            var matrix = match[2].split(',').map(toFloat);
            return [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]];
        } else {
            var matrix3d = match[2].split(',').map(toFloat);
            return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
        }
    }
    return null;
};
});

unwrapExports(transform);
var transform_1 = transform.parseTransform;

var visibility = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var VISIBILITY = exports.VISIBILITY = {
    VISIBLE: 0,
    HIDDEN: 1,
    COLLAPSE: 2
};

var parseVisibility = exports.parseVisibility = function parseVisibility(visibility) {
    switch (visibility) {
        case 'hidden':
            return VISIBILITY.HIDDEN;
        case 'collapse':
            return VISIBILITY.COLLAPSE;
        case 'visible':
        default:
            return VISIBILITY.VISIBLE;
    }
};
});

unwrapExports(visibility);
var visibility_1 = visibility.VISIBILITY;
var visibility_2 = visibility.parseVisibility;

var wordBreak = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var WORD_BREAK = exports.WORD_BREAK = {
    NORMAL: 'normal',
    BREAK_ALL: 'break-all',
    KEEP_ALL: 'keep-all'
};

var parseWordBreak = exports.parseWordBreak = function parseWordBreak(wordBreak) {
    switch (wordBreak) {
        case 'break-all':
            return WORD_BREAK.BREAK_ALL;
        case 'keep-all':
            return WORD_BREAK.KEEP_ALL;
        case 'normal':
        default:
            return WORD_BREAK.NORMAL;
    }
};
});

unwrapExports(wordBreak);
var wordBreak_1 = wordBreak.WORD_BREAK;
var wordBreak_2 = wordBreak.parseWordBreak;

var zIndex = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var parseZIndex = exports.parseZIndex = function parseZIndex(zIndex) {
    var auto = zIndex === 'auto';
    return {
        auto: auto,
        order: auto ? 0 : parseInt(zIndex, 10)
    };
};
});

unwrapExports(zIndex);
var zIndex_1 = zIndex.parseZIndex;

var ForeignObjectRenderer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ForeignObjectRenderer = function () {
    function ForeignObjectRenderer(element) {
        _classCallCheck(this, ForeignObjectRenderer);

        this.element = element;
    }

    _createClass(ForeignObjectRenderer, [{
        key: 'render',
        value: function render(options) {
            var _this = this;

            this.options = options;
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = Math.floor(options.width) * options.scale;
            this.canvas.height = Math.floor(options.height) * options.scale;
            this.canvas.style.width = options.width + 'px';
            this.canvas.style.height = options.height + 'px';

            options.logger.log('ForeignObject renderer initialized (' + options.width + 'x' + options.height + ' at ' + options.x + ',' + options.y + ') with scale ' + options.scale);
            var svg = createForeignObjectSVG(Math.max(options.windowWidth, options.width) * options.scale, Math.max(options.windowHeight, options.height) * options.scale, options.scrollX * options.scale, options.scrollY * options.scale, this.element);

            return loadSerializedSVG(svg).then(function (img) {
                if (options.backgroundColor) {
                    _this.ctx.fillStyle = options.backgroundColor.toString();
                    _this.ctx.fillRect(0, 0, options.width * options.scale, options.height * options.scale);
                }

                _this.ctx.drawImage(img, -options.x * options.scale, -options.y * options.scale);
                return _this.canvas;
            });
        }
    }]);

    return ForeignObjectRenderer;
}();

exports.default = ForeignObjectRenderer;
var createForeignObjectSVG = exports.createForeignObjectSVG = function createForeignObjectSVG(width, height, x, y, node) {
    var xmlns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(xmlns, 'svg');
    var foreignObject = document.createElementNS(xmlns, 'foreignObject');
    svg.setAttributeNS(null, 'width', width);
    svg.setAttributeNS(null, 'height', height);

    foreignObject.setAttributeNS(null, 'width', '100%');
    foreignObject.setAttributeNS(null, 'height', '100%');
    foreignObject.setAttributeNS(null, 'x', x);
    foreignObject.setAttributeNS(null, 'y', y);
    foreignObject.setAttributeNS(null, 'externalResourcesRequired', 'true');
    svg.appendChild(foreignObject);

    foreignObject.appendChild(node);

    return svg;
};

var loadSerializedSVG = exports.loadSerializedSVG = function loadSerializedSVG(svg) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            return resolve(img);
        };
        img.onerror = reject;

        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    });
};
});

unwrapExports(ForeignObjectRenderer_1);
var ForeignObjectRenderer_2 = ForeignObjectRenderer_1.createForeignObjectSVG;
var ForeignObjectRenderer_3 = ForeignObjectRenderer_1.loadSerializedSVG;

var Feature = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});



var testRangeBounds = function testRangeBounds(document) {
    var TEST_HEIGHT = 123;

    if (document.createRange) {
        var range = document.createRange();
        if (range.getBoundingClientRect) {
            var testElement = document.createElement('boundtest');
            testElement.style.height = TEST_HEIGHT + 'px';
            testElement.style.display = 'block';
            document.body.appendChild(testElement);

            range.selectNode(testElement);
            var rangeBounds = range.getBoundingClientRect();
            var rangeHeight = Math.round(rangeBounds.height);
            document.body.removeChild(testElement);
            if (rangeHeight === TEST_HEIGHT) {
                return true;
            }
        }
    }

    return false;
};

// iOS 10.3 taints canvas with base64 images unless crossOrigin = 'anonymous'
var testBase64 = function testBase64(document, src) {
    var img = new Image();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    return new Promise(function (resolve) {
        // Single pixel base64 image renders fine on iOS 10.3???
        img.src = src;

        var onload = function onload() {
            try {
                ctx.drawImage(img, 0, 0);
                canvas.toDataURL();
            } catch (e) {
                return resolve(false);
            }

            return resolve(true);
        };

        img.onload = onload;
        img.onerror = function () {
            return resolve(false);
        };

        if (img.complete === true) {
            setTimeout(function () {
                onload();
            }, 500);
        }
    });
};

var testCORS = function testCORS() {
    return typeof new Image().crossOrigin !== 'undefined';
};

var testResponseType = function testResponseType() {
    return typeof new XMLHttpRequest().responseType === 'string';
};

var testSVG = function testSVG(document) {
    var img = new Image();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    img.src = 'data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\'></svg>';

    try {
        ctx.drawImage(img, 0, 0);
        canvas.toDataURL();
    } catch (e) {
        return false;
    }
    return true;
};

var isGreenPixel = function isGreenPixel(data) {
    return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
};

var testForeignObject = function testForeignObject(document) {
    var canvas = document.createElement('canvas');
    var size = 100;
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.fillRect(0, 0, size, size);

    var img = new Image();
    var greenImageSrc = canvas.toDataURL();
    img.src = greenImageSrc;
    var svg = (0, ForeignObjectRenderer_1.createForeignObjectSVG)(size, size, 0, 0, img);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, size, size);

    return (0, ForeignObjectRenderer_1.loadSerializedSVG)(svg).then(function (img) {
        ctx.drawImage(img, 0, 0);
        var data = ctx.getImageData(0, 0, size, size).data;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, size, size);

        var node = document.createElement('div');
        node.style.backgroundImage = 'url(' + greenImageSrc + ')';
        node.style.height = size + 'px';
        // Firefox 55 does not render inline <img /> tags
        return isGreenPixel(data) ? (0, ForeignObjectRenderer_1.loadSerializedSVG)((0, ForeignObjectRenderer_1.createForeignObjectSVG)(size, size, 0, 0, node)) : Promise.reject(false);
    }).then(function (img) {
        ctx.drawImage(img, 0, 0);
        // Edge does not render background-images
        return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
    }).catch(function (e) {
        return false;
    });
};

var FEATURES = {
    // $FlowFixMe - get/set properties not yet supported
    get SUPPORT_RANGE_BOUNDS() {
        var value = testRangeBounds(document);
        Object.defineProperty(FEATURES, 'SUPPORT_RANGE_BOUNDS', { value: value });
        return value;
    },
    // $FlowFixMe - get/set properties not yet supported
    get SUPPORT_SVG_DRAWING() {
        var value = testSVG(document);
        Object.defineProperty(FEATURES, 'SUPPORT_SVG_DRAWING', { value: value });
        return value;
    },
    // $FlowFixMe - get/set properties not yet supported
    get SUPPORT_BASE64_DRAWING() {
        return function (src) {
            var _value = testBase64(document, src);
            Object.defineProperty(FEATURES, 'SUPPORT_BASE64_DRAWING', { value: function value() {
                    return _value;
                } });
            return _value;
        };
    },
    // $FlowFixMe - get/set properties not yet supported
    get SUPPORT_FOREIGNOBJECT_DRAWING() {
        var value = typeof Array.from === 'function' && typeof window.fetch === 'function' ? testForeignObject(document) : Promise.resolve(false);
        Object.defineProperty(FEATURES, 'SUPPORT_FOREIGNOBJECT_DRAWING', { value: value });
        return value;
    },
    // $FlowFixMe - get/set properties not yet supported
    get SUPPORT_CORS_IMAGES() {
        var value = testCORS();
        Object.defineProperty(FEATURES, 'SUPPORT_CORS_IMAGES', { value: value });
        return value;
    },
    // $FlowFixMe - get/set properties not yet supported
    get SUPPORT_RESPONSE_TYPE() {
        var value = testResponseType();
        Object.defineProperty(FEATURES, 'SUPPORT_RESPONSE_TYPE', { value: value });
        return value;
    },
    // $FlowFixMe - get/set properties not yet supported
    get SUPPORT_CORS_XHR() {
        var value = 'withCredentials' in new XMLHttpRequest();
        Object.defineProperty(FEATURES, 'SUPPORT_CORS_XHR', { value: value });
        return value;
    }
};

exports.default = FEATURES;
});

unwrapExports(Feature);

var Util$2 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var toCodePoints = exports.toCodePoints = function toCodePoints(str) {
    var codePoints = [];
    var i = 0;
    var length = str.length;
    while (i < length) {
        var value = str.charCodeAt(i++);
        if (value >= 0xd800 && value <= 0xdbff && i < length) {
            var extra = str.charCodeAt(i++);
            if ((extra & 0xfc00) === 0xdc00) {
                codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
            } else {
                codePoints.push(value);
                i--;
            }
        } else {
            codePoints.push(value);
        }
    }
    return codePoints;
};

var fromCodePoint = exports.fromCodePoint = function fromCodePoint() {
    if (String.fromCodePoint) {
        return String.fromCodePoint.apply(String, arguments);
    }

    var length = arguments.length;
    if (!length) {
        return '';
    }

    var codeUnits = [];

    var index = -1;
    var result = '';
    while (++index < length) {
        var codePoint = arguments.length <= index ? undefined : arguments[index];
        if (codePoint <= 0xffff) {
            codeUnits.push(codePoint);
        } else {
            codePoint -= 0x10000;
            codeUnits.push((codePoint >> 10) + 0xd800, codePoint % 0x400 + 0xdc00);
        }
        if (index + 1 === length || codeUnits.length > 0x4000) {
            result += String.fromCharCode.apply(String, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result;
};

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// Use a lookup table to find the index.
var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}

var decode = exports.decode = function decode(base64) {
    var bufferLength = base64.length * 0.75,
        len = base64.length,
        i = void 0,
        p = 0,
        encoded1 = void 0,
        encoded2 = void 0,
        encoded3 = void 0,
        encoded4 = void 0;

    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint8Array.prototype.slice !== 'undefined' ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
    var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }

    return buffer;
};

var polyUint16Array = exports.polyUint16Array = function polyUint16Array(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var _i = 0; _i < length; _i += 2) {
        bytes.push(buffer[_i + 1] << 8 | buffer[_i]);
    }
    return bytes;
};

var polyUint32Array = exports.polyUint32Array = function polyUint32Array(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var _i2 = 0; _i2 < length; _i2 += 4) {
        bytes.push(buffer[_i2 + 3] << 24 | buffer[_i2 + 2] << 16 | buffer[_i2 + 1] << 8 | buffer[_i2]);
    }
    return bytes;
};
});

unwrapExports(Util$2);
var Util_1$1 = Util$2.toCodePoints;
var Util_2$1 = Util$2.fromCodePoint;
var Util_3$1 = Util$2.decode;
var Util_4$1 = Util$2.polyUint16Array;
var Util_5 = Util$2.polyUint32Array;

var Trie_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Trie = exports.createTrieFromBase64 = exports.UTRIE2_INDEX_2_MASK = exports.UTRIE2_INDEX_2_BLOCK_LENGTH = exports.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = exports.UTRIE2_INDEX_1_OFFSET = exports.UTRIE2_UTF8_2B_INDEX_2_LENGTH = exports.UTRIE2_UTF8_2B_INDEX_2_OFFSET = exports.UTRIE2_INDEX_2_BMP_LENGTH = exports.UTRIE2_LSCP_INDEX_2_LENGTH = exports.UTRIE2_DATA_MASK = exports.UTRIE2_DATA_BLOCK_LENGTH = exports.UTRIE2_LSCP_INDEX_2_OFFSET = exports.UTRIE2_SHIFT_1_2 = exports.UTRIE2_INDEX_SHIFT = exports.UTRIE2_SHIFT_1 = exports.UTRIE2_SHIFT_2 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Shift size for getting the index-2 table offset. */
var UTRIE2_SHIFT_2 = exports.UTRIE2_SHIFT_2 = 5;

/** Shift size for getting the index-1 table offset. */
var UTRIE2_SHIFT_1 = exports.UTRIE2_SHIFT_1 = 6 + 5;

/**
 * Shift size for shifting left the index array values.
 * Increases possible data size with 16-bit index values at the cost
 * of compactability.
 * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
 */
var UTRIE2_INDEX_SHIFT = exports.UTRIE2_INDEX_SHIFT = 2;

/**
 * Difference between the two shift sizes,
 * for getting an index-1 offset from an index-2 offset. 6=11-5
 */
var UTRIE2_SHIFT_1_2 = exports.UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;

/**
 * The part of the index-2 table for U+D800..U+DBFF stores values for
 * lead surrogate code _units_ not code _points_.
 * Values for lead surrogate code _points_ are indexed with this portion of the table.
 * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
 */
var UTRIE2_LSCP_INDEX_2_OFFSET = exports.UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;

/** Number of entries in a data block. 32=0x20 */
var UTRIE2_DATA_BLOCK_LENGTH = exports.UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
/** Mask for getting the lower bits for the in-data-block offset. */
var UTRIE2_DATA_MASK = exports.UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;

var UTRIE2_LSCP_INDEX_2_LENGTH = exports.UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
/** Count the lengths of both BMP pieces. 2080=0x820 */
var UTRIE2_INDEX_2_BMP_LENGTH = exports.UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
/**
 * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
 * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
 */
var UTRIE2_UTF8_2B_INDEX_2_OFFSET = exports.UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
var UTRIE2_UTF8_2B_INDEX_2_LENGTH = exports.UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
/**
 * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
 * Variable length, for code points up to highStart, where the last single-value range starts.
 * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
 * (For 0x100000 supplementary code points U+10000..U+10ffff.)
 *
 * The part of the index-2 table for supplementary code points starts
 * after this index-1 table.
 *
 * Both the index-1 table and the following part of the index-2 table
 * are omitted completely if there is only BMP data.
 */
var UTRIE2_INDEX_1_OFFSET = exports.UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;

/**
 * Number of index-1 entries for the BMP. 32=0x20
 * This part of the index-1 table is omitted from the serialized form.
 */
var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = exports.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;

/** Number of entries in an index-2 block. 64=0x40 */
var UTRIE2_INDEX_2_BLOCK_LENGTH = exports.UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
/** Mask for getting the lower bits for the in-index-2-block offset. */
var UTRIE2_INDEX_2_MASK = exports.UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;

var createTrieFromBase64 = exports.createTrieFromBase64 = function createTrieFromBase64(base64) {
    var buffer = (0, Util$2.decode)(base64);
    var view32 = Array.isArray(buffer) ? (0, Util$2.polyUint32Array)(buffer) : new Uint32Array(buffer);
    var view16 = Array.isArray(buffer) ? (0, Util$2.polyUint16Array)(buffer) : new Uint16Array(buffer);
    var headerLength = 24;

    var index = view16.slice(headerLength / 2, view32[4] / 2);
    var data = view32[5] === 2 ? view16.slice((headerLength + view32[4]) / 2) : view32.slice(Math.ceil((headerLength + view32[4]) / 4));

    return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
};

var Trie = exports.Trie = function () {
    function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
        _classCallCheck(this, Trie);

        this.initialValue = initialValue;
        this.errorValue = errorValue;
        this.highStart = highStart;
        this.highValueIndex = highValueIndex;
        this.index = index;
        this.data = data;
    }

    /**
     * Get the value for a code point as stored in the Trie.
     *
     * @param codePoint the code point
     * @return the value
     */


    _createClass(Trie, [{
        key: 'get',
        value: function get(codePoint) {
            var ix = void 0;
            if (codePoint >= 0) {
                if (codePoint < 0x0d800 || codePoint > 0x0dbff && codePoint <= 0x0ffff) {
                    // Ordinary BMP code point, excluding leading surrogates.
                    // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                    // 16 bit data is stored in the index array itself.
                    ix = this.index[codePoint >> UTRIE2_SHIFT_2];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }

                if (codePoint <= 0xffff) {
                    // Lead Surrogate Code Point.  A Separate index section is stored for
                    // lead surrogate code units and code points.
                    //   The main index has the code unit data.
                    //   For this function, we need the code point data.
                    // Note: this expression could be refactored for slightly improved efficiency, but
                    //       surrogate code points will be so rare in practice that it's not worth it.
                    ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (codePoint - 0xd800 >> UTRIE2_SHIFT_2)];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }

                if (codePoint < this.highStart) {
                    // Supplemental code point, use two-level lookup.
                    ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
                    ix = this.index[ix];
                    ix += codePoint >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK;
                    ix = this.index[ix];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }
                if (codePoint <= 0x10ffff) {
                    return this.data[this.highValueIndex];
                }
            }

            // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
            return this.errorValue;
        }
    }]);

    return Trie;
}();
});

unwrapExports(Trie_1);
var Trie_2 = Trie_1.Trie;
var Trie_3 = Trie_1.createTrieFromBase64;
var Trie_4 = Trie_1.UTRIE2_INDEX_2_MASK;
var Trie_5 = Trie_1.UTRIE2_INDEX_2_BLOCK_LENGTH;
var Trie_6 = Trie_1.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH;
var Trie_7 = Trie_1.UTRIE2_INDEX_1_OFFSET;
var Trie_8 = Trie_1.UTRIE2_UTF8_2B_INDEX_2_LENGTH;
var Trie_9 = Trie_1.UTRIE2_UTF8_2B_INDEX_2_OFFSET;
var Trie_10 = Trie_1.UTRIE2_INDEX_2_BMP_LENGTH;
var Trie_11 = Trie_1.UTRIE2_LSCP_INDEX_2_LENGTH;
var Trie_12 = Trie_1.UTRIE2_DATA_MASK;
var Trie_13 = Trie_1.UTRIE2_DATA_BLOCK_LENGTH;
var Trie_14 = Trie_1.UTRIE2_LSCP_INDEX_2_OFFSET;
var Trie_15 = Trie_1.UTRIE2_SHIFT_1_2;
var Trie_16 = Trie_1.UTRIE2_INDEX_SHIFT;
var Trie_17 = Trie_1.UTRIE2_SHIFT_1;
var Trie_18 = Trie_1.UTRIE2_SHIFT_2;

var linebreakTrie = 'KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA';

var LineBreak = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LineBreaker = exports.inlineBreakOpportunities = exports.lineBreakAtIndex = exports.codePointsToCharacterClasses = exports.UnicodeTrie = exports.BREAK_ALLOWED = exports.BREAK_NOT_ALLOWED = exports.BREAK_MANDATORY = exports.classes = exports.LETTER_NUMBER_MODIFIER = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();





var _linebreakTrie2 = _interopRequireDefault(linebreakTrie);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LETTER_NUMBER_MODIFIER = exports.LETTER_NUMBER_MODIFIER = 50;

// Non-tailorable Line Breaking Classes
var BK = 1; //  Cause a line break (after)
var CR = 2; //  Cause a line break (after), except between CR and LF
var LF = 3; //  Cause a line break (after)
var CM = 4; //  Prohibit a line break between the character and the preceding character
var NL = 5; //  Cause a line break (after)
var SG = 6; //  Do not occur in well-formed text
var WJ = 7; //  Prohibit line breaks before and after
var ZW = 8; //  Provide a break opportunity
var GL = 9; //  Prohibit line breaks before and after
var SP = 10; // Enable indirect line breaks
var ZWJ = 11; // Prohibit line breaks within joiner sequences
// Break Opportunities
var B2 = 12; //  Provide a line break opportunity before and after the character
var BA = 13; //  Generally provide a line break opportunity after the character
var BB = 14; //  Generally provide a line break opportunity before the character
var HY = 15; //  Provide a line break opportunity after the character, except in numeric context
var CB = 16; //   Provide a line break opportunity contingent on additional information
// Characters Prohibiting Certain Breaks
var CL = 17; //  Prohibit line breaks before
var CP = 18; //  Prohibit line breaks before
var EX = 19; //  Prohibit line breaks before
var IN = 20; //  Allow only indirect line breaks between pairs
var NS = 21; //  Allow only indirect line breaks before
var OP = 22; //  Prohibit line breaks after
var QU = 23; //  Act like they are both opening and closing
// Numeric Context
var IS = 24; //  Prevent breaks after any and before numeric
var NU = 25; //  Form numeric expressions for line breaking purposes
var PO = 26; //  Do not break following a numeric expression
var PR = 27; //  Do not break in front of a numeric expression
var SY = 28; //  Prevent a break before; and allow a break after
// Other Characters
var AI = 29; //  Act like AL when the resolvedEAW is N; otherwise; act as ID
var AL = 30; //  Are alphabetic characters or symbols that are used with alphabetic characters
var CJ = 31; //  Treat as NS or ID for strict or normal breaking.
var EB = 32; //  Do not break from following Emoji Modifier
var EM = 33; //  Do not break from preceding Emoji Base
var H2 = 34; //  Form Korean syllable blocks
var H3 = 35; //  Form Korean syllable blocks
var HL = 36; //  Do not break around a following hyphen; otherwise act as Alphabetic
var ID = 37; //  Break before or after; except in some numeric context
var JL = 38; //  Form Korean syllable blocks
var JV = 39; //  Form Korean syllable blocks
var JT = 40; //  Form Korean syllable blocks
var RI = 41; //  Keep pairs together. For pairs; break before and after other classes
var SA = 42; //  Provide a line break opportunity contingent on additional, language-specific context analysis
var XX = 43; //  Have as yet unknown line breaking behavior or unassigned code positions

var classes = exports.classes = {
    BK: BK,
    CR: CR,
    LF: LF,
    CM: CM,
    NL: NL,
    SG: SG,
    WJ: WJ,
    ZW: ZW,
    GL: GL,
    SP: SP,
    ZWJ: ZWJ,
    B2: B2,
    BA: BA,
    BB: BB,
    HY: HY,
    CB: CB,
    CL: CL,
    CP: CP,
    EX: EX,
    IN: IN,
    NS: NS,
    OP: OP,
    QU: QU,
    IS: IS,
    NU: NU,
    PO: PO,
    PR: PR,
    SY: SY,
    AI: AI,
    AL: AL,
    CJ: CJ,
    EB: EB,
    EM: EM,
    H2: H2,
    H3: H3,
    HL: HL,
    ID: ID,
    JL: JL,
    JV: JV,
    JT: JT,
    RI: RI,
    SA: SA,
    XX: XX
};

var BREAK_MANDATORY = exports.BREAK_MANDATORY = '!';
var BREAK_NOT_ALLOWED = exports.BREAK_NOT_ALLOWED = '×';
var BREAK_ALLOWED = exports.BREAK_ALLOWED = '÷';
var UnicodeTrie = exports.UnicodeTrie = (0, Trie_1.createTrieFromBase64)(_linebreakTrie2.default);

var ALPHABETICS = [AL, HL];
var HARD_LINE_BREAKS = [BK, CR, LF, NL];
var SPACE = [SP, ZW];
var PREFIX_POSTFIX = [PR, PO];
var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE);
var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
var HYPHEN = [HY, BA];

var codePointsToCharacterClasses = exports.codePointsToCharacterClasses = function codePointsToCharacterClasses(codePoints) {
    var lineBreak = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'strict';

    var types = [];
    var indicies = [];
    var categories = [];
    codePoints.forEach(function (codePoint, index) {
        var classType = UnicodeTrie.get(codePoint);
        if (classType > LETTER_NUMBER_MODIFIER) {
            categories.push(true);
            classType -= LETTER_NUMBER_MODIFIER;
        } else {
            categories.push(false);
        }

        if (['normal', 'auto', 'loose'].indexOf(lineBreak) !== -1) {
            // U+2010, – U+2013, 〜 U+301C, ゠ U+30A0
            if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
                indicies.push(index);
                return types.push(CB);
            }
        }

        if (classType === CM || classType === ZWJ) {
            // LB10 Treat any remaining combining mark or ZWJ as AL.
            if (index === 0) {
                indicies.push(index);
                return types.push(AL);
            }

            // LB9 Do not break a combining character sequence; treat it as if it has the line breaking class of
            // the base character in all of the following rules. Treat ZWJ as if it were CM.
            var prev = types[index - 1];
            if (LINE_BREAKS.indexOf(prev) === -1) {
                indicies.push(indicies[index - 1]);
                return types.push(prev);
            }
            indicies.push(index);
            return types.push(AL);
        }

        indicies.push(index);

        if (classType === CJ) {
            return types.push(lineBreak === 'strict' ? NS : ID);
        }

        if (classType === SA) {
            return types.push(AL);
        }

        if (classType === AI) {
            return types.push(AL);
        }

        // For supplementary characters, a useful default is to treat characters in the range 10000..1FFFD as AL
        // and characters in the ranges 20000..2FFFD and 30000..3FFFD as ID, until the implementation can be revised
        // to take into account the actual line breaking properties for these characters.
        if (classType === XX) {
            if (codePoint >= 0x20000 && codePoint <= 0x2fffd || codePoint >= 0x30000 && codePoint <= 0x3fffd) {
                return types.push(ID);
            } else {
                return types.push(AL);
            }
        }

        types.push(classType);
    });

    return [indicies, types, categories];
};

var isAdjacentWithSpaceIgnored = function isAdjacentWithSpaceIgnored(a, b, currentIndex, classTypes) {
    var current = classTypes[currentIndex];
    if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
        var i = currentIndex;
        while (i <= classTypes.length) {
            i++;
            var next = classTypes[i];

            if (next === b) {
                return true;
            }

            if (next !== SP) {
                break;
            }
        }
    }

    if (current === SP) {
        var _i = currentIndex;

        while (_i > 0) {
            _i--;
            var prev = classTypes[_i];

            if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
                var n = currentIndex;
                while (n <= classTypes.length) {
                    n++;
                    var _next = classTypes[n];

                    if (_next === b) {
                        return true;
                    }

                    if (_next !== SP) {
                        break;
                    }
                }
            }

            if (prev !== SP) {
                break;
            }
        }
    }
    return false;
};

var previousNonSpaceClassType = function previousNonSpaceClassType(currentIndex, classTypes) {
    var i = currentIndex;
    while (i >= 0) {
        var type = classTypes[i];
        if (type === SP) {
            i--;
        } else {
            return type;
        }
    }
    return 0;
};

var _lineBreakAtIndex = function _lineBreakAtIndex(codePoints, classTypes, indicies, index, forbiddenBreaks) {
    if (indicies[index] === 0) {
        return BREAK_NOT_ALLOWED;
    }

    var currentIndex = index - 1;
    if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
        return BREAK_NOT_ALLOWED;
    }

    var beforeIndex = currentIndex - 1;
    var afterIndex = currentIndex + 1;
    var current = classTypes[currentIndex];

    // LB4 Always break after hard line breaks.
    // LB5 Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks.
    var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
    var next = classTypes[afterIndex];

    if (current === CR && next === LF) {
        return BREAK_NOT_ALLOWED;
    }

    if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
        return BREAK_MANDATORY;
    }

    // LB6 Do not break before hard line breaks.
    if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB7 Do not break before spaces or zero width space.
    if (SPACE.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB8 Break before any character following a zero-width space, even if one or more spaces intervene.
    if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
        return BREAK_ALLOWED;
    }

    // LB8a Do not break between a zero width joiner and an ideograph, emoji base or emoji modifier.
    if (UnicodeTrie.get(codePoints[currentIndex]) === ZWJ && (next === ID || next === EB || next === EM)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB11 Do not break before or after Word joiner and related characters.
    if (current === WJ || next === WJ) {
        return BREAK_NOT_ALLOWED;
    }

    // LB12 Do not break after NBSP and related characters.
    if (current === GL) {
        return BREAK_NOT_ALLOWED;
    }

    // LB12a Do not break before NBSP and related characters, except after spaces and hyphens.
    if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
        return BREAK_NOT_ALLOWED;
    }

    // LB13 Do not break before ‘]’ or ‘!’ or ‘;’ or ‘/’, even after spaces.
    if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB14 Do not break after ‘[’, even after spaces.
    if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
        return BREAK_NOT_ALLOWED;
    }

    // LB15 Do not break within ‘”[’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB16 Do not break between closing punctuation and a nonstarter (lb=NS), even with intervening spaces.
    if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB17 Do not break within ‘——’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB18 Break after spaces.
    if (current === SP) {
        return BREAK_ALLOWED;
    }

    // LB19 Do not break before or after quotation marks, such as ‘ ” ’.
    if (current === QU || next === QU) {
        return BREAK_NOT_ALLOWED;
    }

    // LB20 Break before and after unresolved CB.
    if (next === CB || current === CB) {
        return BREAK_ALLOWED;
    }

    // LB21 Do not break before hyphen-minus, other hyphens, fixed-width spaces, small kana, and other non-starters, or after acute accents.
    if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
        return BREAK_NOT_ALLOWED;
    }

    // LB21a Don't break after Hebrew + Hyphen.
    if (before === HL && HYPHEN.indexOf(current) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB21b Don’t break between Solidus and Hebrew letters.
    if (current === SY && next === HL) {
        return BREAK_NOT_ALLOWED;
    }

    // LB22 Do not break between two ellipses, or between letters, numbers or exclamations and ellipsis.
    if (next === IN && ALPHABETICS.concat(IN, EX, NU, ID, EB, EM).indexOf(current) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB23 Do not break between digits and letters.
    if (ALPHABETICS.indexOf(next) !== -1 && current === NU || ALPHABETICS.indexOf(current) !== -1 && next === NU) {
        return BREAK_NOT_ALLOWED;
    }

    // LB23a Do not break between numeric prefixes and ideographs, or between ideographs and numeric postfixes.
    if (current === PR && [ID, EB, EM].indexOf(next) !== -1 || [ID, EB, EM].indexOf(current) !== -1 && next === PO) {
        return BREAK_NOT_ALLOWED;
    }

    // LB24 Do not break between numeric prefix/postfix and letters, or between letters and prefix/postfix.
    if (ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1 || PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB25 Do not break between the following pairs of classes relevant to numbers:
    if (
    // (PR | PO) × ( OP | HY )? NU
    [PR, PO].indexOf(current) !== -1 && (next === NU || [OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU) ||
    // ( OP | HY ) × NU
    [OP, HY].indexOf(current) !== -1 && next === NU ||
    // NU ×	(NU | SY | IS)
    current === NU && [NU, SY, IS].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // NU (NU | SY | IS)* × (NU | SY | IS | CL | CP)
    if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
        var prevIndex = currentIndex;
        while (prevIndex >= 0) {
            var type = classTypes[prevIndex];
            if (type === NU) {
                return BREAK_NOT_ALLOWED;
            } else if ([SY, IS].indexOf(type) !== -1) {
                prevIndex--;
            } else {
                break;
            }
        }
    }

    // NU (NU | SY | IS)* (CL | CP)? × (PO | PR))
    if ([PR, PO].indexOf(next) !== -1) {
        var _prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
        while (_prevIndex >= 0) {
            var _type = classTypes[_prevIndex];
            if (_type === NU) {
                return BREAK_NOT_ALLOWED;
            } else if ([SY, IS].indexOf(_type) !== -1) {
                _prevIndex--;
            } else {
                break;
            }
        }
    }

    // LB26 Do not break a Korean syllable.
    if (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1 || [JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1 || [JT, H3].indexOf(current) !== -1 && next === JT) {
        return BREAK_NOT_ALLOWED;
    }

    // LB27 Treat a Korean Syllable Block the same as ID.
    if (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1 || KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR) {
        return BREAK_NOT_ALLOWED;
    }

    // LB28 Do not break between alphabetics (“at”).
    if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB29 Do not break between numeric punctuation and alphabetics (“e.g.”).
    if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB30 Do not break between letters, numbers, or ordinary symbols and opening or closing parentheses.
    if (ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP || ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP) {
        return BREAK_NOT_ALLOWED;
    }

    // LB30a Break between two regional indicator symbols if and only if there are an even number of regional
    // indicators preceding the position of the break.
    if (current === RI && next === RI) {
        var i = indicies[currentIndex];
        var count = 1;
        while (i > 0) {
            i--;
            if (classTypes[i] === RI) {
                count++;
            } else {
                break;
            }
        }
        if (count % 2 !== 0) {
            return BREAK_NOT_ALLOWED;
        }
    }

    // LB30b Do not break between an emoji base and an emoji modifier.
    if (current === EB && next === EM) {
        return BREAK_NOT_ALLOWED;
    }

    return BREAK_ALLOWED;
};

var lineBreakAtIndex = exports.lineBreakAtIndex = function lineBreakAtIndex(codePoints, index) {
    // LB2 Never break at the start of text.
    if (index === 0) {
        return BREAK_NOT_ALLOWED;
    }

    // LB3 Always break at the end of text.
    if (index >= codePoints.length) {
        return BREAK_MANDATORY;
    }

    var _codePointsToCharacte = codePointsToCharacterClasses(codePoints),
        _codePointsToCharacte2 = _slicedToArray(_codePointsToCharacte, 2),
        indicies = _codePointsToCharacte2[0],
        classTypes = _codePointsToCharacte2[1];

    return _lineBreakAtIndex(codePoints, classTypes, indicies, index);
};

var cssFormattedClasses = function cssFormattedClasses(codePoints, options) {
    if (!options) {
        options = { lineBreak: 'normal', wordBreak: 'normal' };
    }

    var _codePointsToCharacte3 = codePointsToCharacterClasses(codePoints, options.lineBreak),
        _codePointsToCharacte4 = _slicedToArray(_codePointsToCharacte3, 3),
        indicies = _codePointsToCharacte4[0],
        classTypes = _codePointsToCharacte4[1],
        isLetterNumber = _codePointsToCharacte4[2];

    if (options.wordBreak === 'break-all' || options.wordBreak === 'break-word') {
        classTypes = classTypes.map(function (type) {
            return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;
        });
    }

    var forbiddenBreakpoints = options.wordBreak === 'keep-all' ? isLetterNumber.map(function (isLetterNumber, i) {
        return isLetterNumber && codePoints[i] >= 0x4e00 && codePoints[i] <= 0x9fff;
    }) : null;

    return [indicies, classTypes, forbiddenBreakpoints];
};

var inlineBreakOpportunities = exports.inlineBreakOpportunities = function inlineBreakOpportunities(str, options) {
    var codePoints = (0, Util$2.toCodePoints)(str);
    var output = BREAK_NOT_ALLOWED;

    var _cssFormattedClasses = cssFormattedClasses(codePoints, options),
        _cssFormattedClasses2 = _slicedToArray(_cssFormattedClasses, 3),
        indicies = _cssFormattedClasses2[0],
        classTypes = _cssFormattedClasses2[1],
        forbiddenBreakpoints = _cssFormattedClasses2[2];

    codePoints.forEach(function (codePoint, i) {
        output += (0, Util$2.fromCodePoint)(codePoint) + (i >= codePoints.length - 1 ? BREAK_MANDATORY : _lineBreakAtIndex(codePoints, classTypes, indicies, i + 1, forbiddenBreakpoints));
    });

    return output;
};

var Break = function () {
    function Break(codePoints, lineBreak, start, end) {
        _classCallCheck(this, Break);

        this._codePoints = codePoints;
        this.required = lineBreak === BREAK_MANDATORY;
        this.start = start;
        this.end = end;
    }

    _createClass(Break, [{
        key: 'slice',
        value: function slice() {
            return Util$2.fromCodePoint.apply(undefined, _toConsumableArray(this._codePoints.slice(this.start, this.end)));
        }
    }]);

    return Break;
}();

var LineBreaker = exports.LineBreaker = function LineBreaker(str, options) {
    var codePoints = (0, Util$2.toCodePoints)(str);

    var _cssFormattedClasses3 = cssFormattedClasses(codePoints, options),
        _cssFormattedClasses4 = _slicedToArray(_cssFormattedClasses3, 3),
        indicies = _cssFormattedClasses4[0],
        classTypes = _cssFormattedClasses4[1],
        forbiddenBreakpoints = _cssFormattedClasses4[2];

    var length = codePoints.length;
    var lastEnd = 0;
    var nextIndex = 0;

    return {
        next: function next() {
            if (nextIndex >= length) {
                return { done: true };
            }
            var lineBreak = BREAK_NOT_ALLOWED;
            while (nextIndex < length && (lineBreak = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) === BREAK_NOT_ALLOWED) {}

            if (lineBreak !== BREAK_NOT_ALLOWED || nextIndex === length) {
                var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
                lastEnd = nextIndex;
                return { value: value, done: false };
            }

            return { done: true };
        }
    };
};
});

unwrapExports(LineBreak);
var LineBreak_1 = LineBreak.LineBreaker;
var LineBreak_2 = LineBreak.inlineBreakOpportunities;
var LineBreak_3 = LineBreak.lineBreakAtIndex;
var LineBreak_4 = LineBreak.codePointsToCharacterClasses;
var LineBreak_5 = LineBreak.UnicodeTrie;
var LineBreak_6 = LineBreak.BREAK_ALLOWED;
var LineBreak_7 = LineBreak.BREAK_NOT_ALLOWED;
var LineBreak_8 = LineBreak.BREAK_MANDATORY;
var LineBreak_9 = LineBreak.classes;
var LineBreak_10 = LineBreak.LETTER_NUMBER_MODIFIER;

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
  value: true
});



Object.defineProperty(exports, 'toCodePoints', {
  enumerable: true,
  get: function get() {
    return Util$2.toCodePoints;
  }
});
Object.defineProperty(exports, 'fromCodePoint', {
  enumerable: true,
  get: function get() {
    return Util$2.fromCodePoint;
  }
});



Object.defineProperty(exports, 'LineBreaker', {
  enumerable: true,
  get: function get() {
    return LineBreak.LineBreaker;
  }
});
});

unwrapExports(dist);

var Unicode = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.breakWords = exports.fromCodePoint = exports.toCodePoints = undefined;



Object.defineProperty(exports, 'toCodePoints', {
    enumerable: true,
    get: function get() {
        return dist.toCodePoints;
    }
});
Object.defineProperty(exports, 'fromCodePoint', {
    enumerable: true,
    get: function get() {
        return dist.fromCodePoint;
    }
});



var _NodeContainer2 = _interopRequireDefault(NodeContainer_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var breakWords = exports.breakWords = function breakWords(str, parent) {
    var breaker = (0, dist.LineBreaker)(str, {
        lineBreak: parent.style.lineBreak,
        wordBreak: parent.style.overflowWrap === overflowWrap.OVERFLOW_WRAP.BREAK_WORD ? 'break-word' : parent.style.wordBreak
    });

    var words = [];
    var bk = void 0;

    while (!(bk = breaker.next()).done) {
        words.push(bk.value.slice());
    }

    return words;
};
});

unwrapExports(Unicode);
var Unicode_1 = Unicode.breakWords;
var Unicode_2 = Unicode.fromCodePoint;
var Unicode_3 = Unicode.toCodePoints;

var TextBounds_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseTextBounds = exports.TextBounds = undefined;







var _Feature2 = _interopRequireDefault(Feature);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextBounds = exports.TextBounds = function TextBounds(text, bounds) {
    _classCallCheck(this, TextBounds);

    this.text = text;
    this.bounds = bounds;
};

var parseTextBounds = exports.parseTextBounds = function parseTextBounds(value, parent, node) {
    var letterRendering = parent.style.letterSpacing !== 0;
    var textList = letterRendering ? (0, Unicode.toCodePoints)(value).map(function (i) {
        return (0, Unicode.fromCodePoint)(i);
    }) : (0, Unicode.breakWords)(value, parent);
    var length = textList.length;
    var defaultView = node.parentNode ? node.parentNode.ownerDocument.defaultView : null;
    var scrollX = defaultView ? defaultView.pageXOffset : 0;
    var scrollY = defaultView ? defaultView.pageYOffset : 0;
    var textBounds = [];
    var offset = 0;
    for (var i = 0; i < length; i++) {
        var text = textList[i];
        if (parent.style.textDecoration !== textDecoration.TEXT_DECORATION.NONE || text.trim().length > 0) {
            if (_Feature2.default.SUPPORT_RANGE_BOUNDS) {
                textBounds.push(new TextBounds(text, getRangeBounds(node, offset, text.length, scrollX, scrollY)));
            } else {
                var replacementNode = node.splitText(text.length);
                textBounds.push(new TextBounds(text, getWrapperBounds(node, scrollX, scrollY)));
                node = replacementNode;
            }
        } else if (!_Feature2.default.SUPPORT_RANGE_BOUNDS) {
            node = node.splitText(text.length);
        }
        offset += text.length;
    }
    return textBounds;
};

var getWrapperBounds = function getWrapperBounds(node, scrollX, scrollY) {
    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
    wrapper.appendChild(node.cloneNode(true));
    var parentNode = node.parentNode;
    if (parentNode) {
        parentNode.replaceChild(wrapper, node);
        var bounds = (0, Bounds_1.parseBounds)(wrapper, scrollX, scrollY);
        if (wrapper.firstChild) {
            parentNode.replaceChild(wrapper.firstChild, wrapper);
        }
        return bounds;
    }
    return new Bounds_1.Bounds(0, 0, 0, 0);
};

var getRangeBounds = function getRangeBounds(node, offset, length, scrollX, scrollY) {
    var range = node.ownerDocument.createRange();
    range.setStart(node, offset);
    range.setEnd(node, offset + length);
    return Bounds_1.Bounds.fromClientRect(range.getBoundingClientRect(), scrollX, scrollY);
};
});

unwrapExports(TextBounds_1);
var TextBounds_2 = TextBounds_1.parseTextBounds;
var TextBounds_3 = TextBounds_1.TextBounds;

var TextContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextContainer = function () {
    function TextContainer(text, parent, bounds) {
        _classCallCheck(this, TextContainer);

        this.text = text;
        this.parent = parent;
        this.bounds = bounds;
    }

    _createClass(TextContainer, null, [{
        key: 'fromTextNode',
        value: function fromTextNode(node, parent) {
            var text = transform(node.data, parent.style.textTransform);
            return new TextContainer(text, parent, (0, TextBounds_1.parseTextBounds)(text, parent, node));
        }
    }]);

    return TextContainer;
}();

exports.default = TextContainer;


var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;

var transform = function transform(text, _transform) {
    switch (_transform) {
        case textTransform.TEXT_TRANSFORM.LOWERCASE:
            return text.toLowerCase();
        case textTransform.TEXT_TRANSFORM.CAPITALIZE:
            return text.replace(CAPITALIZE, capitalize);
        case textTransform.TEXT_TRANSFORM.UPPERCASE:
            return text.toUpperCase();
        default:
            return text;
    }
};

function capitalize(m, p1, p2) {
    if (m.length > 0) {
        return p1 + p2.toUpperCase();
    }

    return m;
}
});

unwrapExports(TextContainer_1);

var Circle_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function Circle(x, y, radius) {
    _classCallCheck(this, Circle);

    this.type = Path.PATH.CIRCLE;
    this.x = x;
    this.y = y;
    this.radius = radius;
    
};

exports.default = Circle;
});

unwrapExports(Circle_1);

var Input = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reformatInputBounds = exports.inlineSelectElement = exports.inlineTextAreaElement = exports.inlineInputElement = exports.getInputBorderRadius = exports.INPUT_BACKGROUND = exports.INPUT_BORDERS = exports.INPUT_COLOR = undefined;



var _TextContainer2 = _interopRequireDefault(TextContainer_1);







var _Circle2 = _interopRequireDefault(Circle_1);



var _Vector2 = _interopRequireDefault(Vector_1);



var _Color2 = _interopRequireDefault(Color_1);



var _Length2 = _interopRequireDefault(Length_1);







function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INPUT_COLOR = exports.INPUT_COLOR = new _Color2.default([42, 42, 42]);
var INPUT_BORDER_COLOR = new _Color2.default([165, 165, 165]);
var INPUT_BACKGROUND_COLOR = new _Color2.default([222, 222, 222]);
var INPUT_BORDER = {
    borderWidth: 1,
    borderColor: INPUT_BORDER_COLOR,
    borderStyle: border.BORDER_STYLE.SOLID
};
var INPUT_BORDERS = exports.INPUT_BORDERS = [INPUT_BORDER, INPUT_BORDER, INPUT_BORDER, INPUT_BORDER];
var INPUT_BACKGROUND = exports.INPUT_BACKGROUND = {
    backgroundColor: INPUT_BACKGROUND_COLOR,
    backgroundImage: [],
    backgroundClip: background.BACKGROUND_CLIP.PADDING_BOX,
    backgroundOrigin: background.BACKGROUND_ORIGIN.PADDING_BOX
};

var RADIO_BORDER_RADIUS = new _Length2.default('50%');
var RADIO_BORDER_RADIUS_TUPLE = [RADIO_BORDER_RADIUS, RADIO_BORDER_RADIUS];
var INPUT_RADIO_BORDER_RADIUS = [RADIO_BORDER_RADIUS_TUPLE, RADIO_BORDER_RADIUS_TUPLE, RADIO_BORDER_RADIUS_TUPLE, RADIO_BORDER_RADIUS_TUPLE];

var CHECKBOX_BORDER_RADIUS = new _Length2.default('3px');
var CHECKBOX_BORDER_RADIUS_TUPLE = [CHECKBOX_BORDER_RADIUS, CHECKBOX_BORDER_RADIUS];
var INPUT_CHECKBOX_BORDER_RADIUS = [CHECKBOX_BORDER_RADIUS_TUPLE, CHECKBOX_BORDER_RADIUS_TUPLE, CHECKBOX_BORDER_RADIUS_TUPLE, CHECKBOX_BORDER_RADIUS_TUPLE];

var getInputBorderRadius = exports.getInputBorderRadius = function getInputBorderRadius(node) {
    return node.type === 'radio' ? INPUT_RADIO_BORDER_RADIUS : INPUT_CHECKBOX_BORDER_RADIUS;
};

var inlineInputElement = exports.inlineInputElement = function inlineInputElement(node, container) {
    if (node.type === 'radio' || node.type === 'checkbox') {
        if (node.checked) {
            var size = Math.min(container.bounds.width, container.bounds.height);
            container.childNodes.push(node.type === 'checkbox' ? [new _Vector2.default(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79), new _Vector2.default(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549), new _Vector2.default(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071), new _Vector2.default(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649), new _Vector2.default(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23), new _Vector2.default(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085), new _Vector2.default(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)] : new _Circle2.default(container.bounds.left + size / 4, container.bounds.top + size / 4, size / 4));
        }
    } else {
        inlineFormElement(getInputValue(node), node, container, false);
    }
};

var inlineTextAreaElement = exports.inlineTextAreaElement = function inlineTextAreaElement(node, container) {
    inlineFormElement(node.value, node, container, true);
};

var inlineSelectElement = exports.inlineSelectElement = function inlineSelectElement(node, container) {
    var option = node.options[node.selectedIndex || 0];
    inlineFormElement(option ? option.text || '' : '', node, container, false);
};

var reformatInputBounds = exports.reformatInputBounds = function reformatInputBounds(bounds) {
    if (bounds.width > bounds.height) {
        bounds.left += (bounds.width - bounds.height) / 2;
        bounds.width = bounds.height;
    } else if (bounds.width < bounds.height) {
        bounds.top += (bounds.height - bounds.width) / 2;
        bounds.height = bounds.width;
    }
    return bounds;
};

var inlineFormElement = function inlineFormElement(value, node, container, allowLinebreak) {
    var body = node.ownerDocument.body;
    if (value.length > 0 && body) {
        var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
        (0, Util.copyCSSStyles)(node.ownerDocument.defaultView.getComputedStyle(node, null), wrapper);
        wrapper.style.position = 'absolute';
        wrapper.style.left = container.bounds.left + 'px';
        wrapper.style.top = container.bounds.top + 'px';
        if (!allowLinebreak) {
            wrapper.style.whiteSpace = 'nowrap';
        }
        var text = node.ownerDocument.createTextNode(value);
        wrapper.appendChild(text);
        body.appendChild(wrapper);
        container.childNodes.push(_TextContainer2.default.fromTextNode(text, container));
        body.removeChild(wrapper);
    }
};

var getInputValue = function getInputValue(node) {
    var value = node.type === 'password' ? new Array(node.value.length + 1).join('\u2022') : node.value;

    return value.length === 0 ? node.placeholder || '' : value;
};
});

unwrapExports(Input);
var Input_1 = Input.reformatInputBounds;
var Input_2 = Input.inlineSelectElement;
var Input_3 = Input.inlineTextAreaElement;
var Input_4 = Input.inlineInputElement;
var Input_5 = Input.getInputBorderRadius;
var Input_6 = Input.INPUT_BACKGROUND;
var Input_7 = Input.INPUT_BORDERS;
var Input_8 = Input.INPUT_COLOR;

var ListItem = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCounterText = exports.inlineListItemElement = exports.getListOwner = undefined;





var _NodeContainer2 = _interopRequireDefault(NodeContainer_1);



var _TextContainer2 = _interopRequireDefault(TextContainer_1);





function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Margin between the enumeration and the list item content
var MARGIN_RIGHT = 7;

var ancestorTypes = ['OL', 'UL', 'MENU'];

var getListOwner = exports.getListOwner = function getListOwner(container) {
    var parent = container.parent;
    if (!parent) {
        return null;
    }

    do {
        var isAncestor = ancestorTypes.indexOf(parent.tagName) !== -1;
        if (isAncestor) {
            return parent;
        }
        parent = parent.parent;
    } while (parent);

    return container.parent;
};

var inlineListItemElement = exports.inlineListItemElement = function inlineListItemElement(node, container, resourceLoader) {
    var listStyle$$1 = container.style.listStyle;

    if (!listStyle$$1) {
        return;
    }

    var style = node.ownerDocument.defaultView.getComputedStyle(node, null);
    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
    (0, Util.copyCSSStyles)(style, wrapper);

    wrapper.style.position = 'absolute';
    wrapper.style.bottom = 'auto';
    wrapper.style.display = 'block';
    wrapper.style.letterSpacing = 'normal';

    switch (listStyle$$1.listStylePosition) {
        case listStyle.LIST_STYLE_POSITION.OUTSIDE:
            wrapper.style.left = 'auto';
            wrapper.style.right = node.ownerDocument.defaultView.innerWidth - container.bounds.left - container.style.margin[1].getAbsoluteValue(container.bounds.width) + MARGIN_RIGHT + 'px';
            wrapper.style.textAlign = 'right';
            break;
        case listStyle.LIST_STYLE_POSITION.INSIDE:
            wrapper.style.left = container.bounds.left - container.style.margin[3].getAbsoluteValue(container.bounds.width) + 'px';
            wrapper.style.right = 'auto';
            wrapper.style.textAlign = 'left';
            break;
    }

    var text = void 0;
    var MARGIN_TOP = container.style.margin[0].getAbsoluteValue(container.bounds.width);
    var styleImage = listStyle$$1.listStyleImage;
    if (styleImage) {
        if (styleImage.method === 'url') {
            var image = node.ownerDocument.createElement('img');
            image.src = styleImage.args[0];
            wrapper.style.top = container.bounds.top - MARGIN_TOP + 'px';
            wrapper.style.width = 'auto';
            wrapper.style.height = 'auto';
            wrapper.appendChild(image);
        } else {
            var size = parseFloat(container.style.font.fontSize) * 0.5;
            wrapper.style.top = container.bounds.top - MARGIN_TOP + container.bounds.height - 1.5 * size + 'px';
            wrapper.style.width = size + 'px';
            wrapper.style.height = size + 'px';
            wrapper.style.backgroundImage = style.listStyleImage;
        }
    } else if (typeof container.listIndex === 'number') {
        text = node.ownerDocument.createTextNode(createCounterText(container.listIndex, listStyle$$1.listStyleType, true));
        wrapper.appendChild(text);
        wrapper.style.top = container.bounds.top - MARGIN_TOP + 'px';
    }

    // $FlowFixMe
    var body = node.ownerDocument.body;
    body.appendChild(wrapper);

    if (text) {
        container.childNodes.push(_TextContainer2.default.fromTextNode(text, container));
        body.removeChild(wrapper);
    } else {
        // $FlowFixMe
        container.childNodes.push(new _NodeContainer2.default(wrapper, container, resourceLoader, 0));
    }
};

var ROMAN_UPPER = {
    integers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    values: ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
};

var ARMENIAN = {
    integers: [9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    values: ['Ք', 'Փ', 'Ւ', 'Ց', 'Ր', 'Տ', 'Վ', 'Ս', 'Ռ', 'Ջ', 'Պ', 'Չ', 'Ո', 'Շ', 'Ն', 'Յ', 'Մ', 'Ճ', 'Ղ', 'Ձ', 'Հ', 'Կ', 'Ծ', 'Խ', 'Լ', 'Ի', 'Ժ', 'Թ', 'Ը', 'Է', 'Զ', 'Ե', 'Դ', 'Գ', 'Բ', 'Ա']
};

var HEBREW = {
    integers: [10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    values: ['י׳', 'ט׳', 'ח׳', 'ז׳', 'ו׳', 'ה׳', 'ד׳', 'ג׳', 'ב׳', 'א׳', 'ת', 'ש', 'ר', 'ק', 'צ', 'פ', 'ע', 'ס', 'נ', 'מ', 'ל', 'כ', 'יט', 'יח', 'יז', 'טז', 'טו', 'י', 'ט', 'ח', 'ז', 'ו', 'ה', 'ד', 'ג', 'ב', 'א']
};

var GEORGIAN = {
    integers: [10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    values: ['ჵ', 'ჰ', 'ჯ', 'ჴ', 'ხ', 'ჭ', 'წ', 'ძ', 'ც', 'ჩ', 'შ', 'ყ', 'ღ', 'ქ', 'ფ', 'ჳ', 'ტ', 'ს', 'რ', 'ჟ', 'პ', 'ო', 'ჲ', 'ნ', 'მ', 'ლ', 'კ', 'ი', 'თ', 'ჱ', 'ზ', 'ვ', 'ე', 'დ', 'გ', 'ბ', 'ა']
};

var createAdditiveCounter = function createAdditiveCounter(value, min, max, symbols, fallback, suffix) {
    if (value < min || value > max) {
        return createCounterText(value, fallback, suffix.length > 0);
    }

    return symbols.integers.reduce(function (string, integer, index) {
        while (value >= integer) {
            value -= integer;
            string += symbols.values[index];
        }
        return string;
    }, '') + suffix;
};

var createCounterStyleWithSymbolResolver = function createCounterStyleWithSymbolResolver(value, codePointRangeLength, isNumeric, resolver) {
    var string = '';

    do {
        if (!isNumeric) {
            value--;
        }
        string = resolver(value) + string;
        value /= codePointRangeLength;
    } while (value * codePointRangeLength >= codePointRangeLength);

    return string;
};

var createCounterStyleFromRange = function createCounterStyleFromRange(value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
    var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;

    return (value < 0 ? '-' : '') + (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function (codePoint) {
        return (0, Unicode.fromCodePoint)(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
    }) + suffix);
};

var createCounterStyleFromSymbols = function createCounterStyleFromSymbols(value, symbols) {
    var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '. ';

    var codePointRangeLength = symbols.length;
    return createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function (codePoint) {
        return symbols[Math.floor(codePoint % codePointRangeLength)];
    }) + suffix;
};

var CJK_ZEROS = 1 << 0;
var CJK_TEN_COEFFICIENTS = 1 << 1;
var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
var CJK_HUNDRED_COEFFICIENTS = 1 << 3;

var createCJKCounter = function createCJKCounter(value, numbers, multipliers, negativeSign, suffix, flags) {
    if (value < -9999 || value > 9999) {
        return createCounterText(value, listStyle.LIST_STYLE_TYPE.CJK_DECIMAL, suffix.length > 0);
    }
    var tmp = Math.abs(value);
    var string = suffix;

    if (tmp === 0) {
        return numbers[0] + string;
    }

    for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
        var coefficient = tmp % 10;

        if (coefficient === 0 && (0, Util.contains)(flags, CJK_ZEROS) && string !== '') {
            string = numbers[coefficient] + string;
        } else if (coefficient > 1 || coefficient === 1 && digit === 0 || coefficient === 1 && digit === 1 && (0, Util.contains)(flags, CJK_TEN_COEFFICIENTS) || coefficient === 1 && digit === 1 && (0, Util.contains)(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100 || coefficient === 1 && digit > 1 && (0, Util.contains)(flags, CJK_HUNDRED_COEFFICIENTS)) {
            string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : '') + string;
        } else if (coefficient === 1 && digit > 0) {
            string = multipliers[digit - 1] + string;
        }
        tmp = Math.floor(tmp / 10);
    }

    return (value < 0 ? negativeSign : '') + string;
};

var CHINESE_INFORMAL_MULTIPLIERS = '十百千萬';
var CHINESE_FORMAL_MULTIPLIERS = '拾佰仟萬';
var JAPANESE_NEGATIVE = 'マイナス';
var KOREAN_NEGATIVE = '마이너스 ';

var createCounterText = exports.createCounterText = function createCounterText(value, type, appendSuffix) {
    var defaultSuffix = appendSuffix ? '. ' : '';
    var cjkSuffix = appendSuffix ? '、' : '';
    var koreanSuffix = appendSuffix ? ', ' : '';
    switch (type) {
        case listStyle.LIST_STYLE_TYPE.DISC:
            return '•';
        case listStyle.LIST_STYLE_TYPE.CIRCLE:
            return '◦';
        case listStyle.LIST_STYLE_TYPE.SQUARE:
            return '◾';
        case listStyle.LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:
            var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
            return string.length < 4 ? '0' + string : string;
        case listStyle.LIST_STYLE_TYPE.CJK_DECIMAL:
            return createCounterStyleFromSymbols(value, '〇一二三四五六七八九', cjkSuffix);
        case listStyle.LIST_STYLE_TYPE.LOWER_ROMAN:
            return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
        case listStyle.LIST_STYLE_TYPE.UPPER_ROMAN:
            return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.LOWER_GREEK:
            return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.LOWER_ALPHA:
            return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.UPPER_ALPHA:
            return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.ARABIC_INDIC:
            return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.ARMENIAN:
        case listStyle.LIST_STYLE_TYPE.UPPER_ARMENIAN:
            return createAdditiveCounter(value, 1, 9999, ARMENIAN, listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.LOWER_ARMENIAN:
            return createAdditiveCounter(value, 1, 9999, ARMENIAN, listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
        case listStyle.LIST_STYLE_TYPE.BENGALI:
            return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.CAMBODIAN:
        case listStyle.LIST_STYLE_TYPE.KHMER:
            return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:
            return createCounterStyleFromSymbols(value, '子丑寅卯辰巳午未申酉戌亥', cjkSuffix);
        case listStyle.LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:
            return createCounterStyleFromSymbols(value, '甲乙丙丁戊己庚辛壬癸', cjkSuffix);
        case listStyle.LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:
        case listStyle.LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:
            return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
        case listStyle.LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:
            return createCJKCounter(value, '零壹貳參肆伍陸柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
        case listStyle.LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:
            return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
        case listStyle.LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:
            return createCJKCounter(value, '零壹贰叁肆伍陆柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
        case listStyle.LIST_STYLE_TYPE.JAPANESE_INFORMAL:
            return createCJKCounter(value, '〇一二三四五六七八九', '十百千万', JAPANESE_NEGATIVE, cjkSuffix, 0);
        case listStyle.LIST_STYLE_TYPE.JAPANESE_FORMAL:
            return createCJKCounter(value, '零壱弐参四伍六七八九', '拾百千万', JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
        case listStyle.LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:
            return createCJKCounter(value, '영일이삼사오육칠팔구', '십백천만', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
        case listStyle.LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:
            return createCJKCounter(value, '零一二三四五六七八九', '十百千萬', KOREAN_NEGATIVE, koreanSuffix, 0);
        case listStyle.LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:
            return createCJKCounter(value, '零壹貳參四五六七八九', '拾百千', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
        case listStyle.LIST_STYLE_TYPE.DEVANAGARI:
            return createCounterStyleFromRange(value, 0x966, 0x96f, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.GEORGIAN:
            return createAdditiveCounter(value, 1, 19999, GEORGIAN, listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.GUJARATI:
            return createCounterStyleFromRange(value, 0xae6, 0xaef, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.GURMUKHI:
            return createCounterStyleFromRange(value, 0xa66, 0xa6f, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.HEBREW:
            return createAdditiveCounter(value, 1, 10999, HEBREW, listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.HIRAGANA:
            return createCounterStyleFromSymbols(value, 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん');
        case listStyle.LIST_STYLE_TYPE.HIRAGANA_IROHA:
            return createCounterStyleFromSymbols(value, 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす');
        case listStyle.LIST_STYLE_TYPE.KANNADA:
            return createCounterStyleFromRange(value, 0xce6, 0xcef, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.KATAKANA:
            return createCounterStyleFromSymbols(value, 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン', cjkSuffix);
        case listStyle.LIST_STYLE_TYPE.KATAKANA_IROHA:
            return createCounterStyleFromSymbols(value, 'イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス', cjkSuffix);
        case listStyle.LIST_STYLE_TYPE.LAO:
            return createCounterStyleFromRange(value, 0xed0, 0xed9, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.MONGOLIAN:
            return createCounterStyleFromRange(value, 0x1810, 0x1819, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.MYANMAR:
            return createCounterStyleFromRange(value, 0x1040, 0x1049, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.ORIYA:
            return createCounterStyleFromRange(value, 0xb66, 0xb6f, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.PERSIAN:
            return createCounterStyleFromRange(value, 0x6f0, 0x6f9, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.TAMIL:
            return createCounterStyleFromRange(value, 0xbe6, 0xbef, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.TELUGU:
            return createCounterStyleFromRange(value, 0xc66, 0xc6f, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.THAI:
            return createCounterStyleFromRange(value, 0xe50, 0xe59, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.TIBETAN:
            return createCounterStyleFromRange(value, 0xf20, 0xf29, true, defaultSuffix);
        case listStyle.LIST_STYLE_TYPE.DECIMAL:
        default:
            return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
    }
};
});

unwrapExports(ListItem);
var ListItem_1 = ListItem.createCounterText;
var ListItem_2 = ListItem.inlineListItemElement;
var ListItem_3 = ListItem.getListOwner;

var NodeContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _Color2 = _interopRequireDefault(Color_1);



















































function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

var NodeContainer = function () {
    function NodeContainer(node, parent, resourceLoader, index) {
        var _this = this;

        _classCallCheck(this, NodeContainer);

        this.parent = parent;
        this.tagName = node.tagName;
        this.index = index;
        this.childNodes = [];
        this.listItems = [];
        if (typeof node.start === 'number') {
            this.listStart = node.start;
        }
        var defaultView = node.ownerDocument.defaultView;
        var scrollX = defaultView.pageXOffset;
        var scrollY = defaultView.pageYOffset;
        var style = defaultView.getComputedStyle(node, null);
        var display$$1 = (0, display.parseDisplay)(style.display);

        var IS_INPUT = node.type === 'radio' || node.type === 'checkbox';

        var position$$1 = (0, position.parsePosition)(style.position);

        this.style = {
            background: IS_INPUT ? Input.INPUT_BACKGROUND : (0, background.parseBackground)(style, resourceLoader),
            border: IS_INPUT ? Input.INPUT_BORDERS : (0, border.parseBorder)(style),
            borderRadius: (node instanceof defaultView.HTMLInputElement || node instanceof HTMLInputElement) && IS_INPUT ? (0, Input.getInputBorderRadius)(node) : (0, borderRadius.parseBorderRadius)(style),
            color: IS_INPUT ? Input.INPUT_COLOR : new _Color2.default(style.color),
            display: display$$1,
            float: (0, float_1.parseCSSFloat)(style.float),
            font: (0, font.parseFont)(style),
            letterSpacing: (0, letterSpacing.parseLetterSpacing)(style.letterSpacing),
            listStyle: display$$1 === display.DISPLAY.LIST_ITEM ? (0, listStyle.parseListStyle)(style) : null,
            lineBreak: (0, lineBreak.parseLineBreak)(style.lineBreak),
            margin: (0, margin.parseMargin)(style),
            opacity: parseFloat(style.opacity),
            overflow: INPUT_TAGS.indexOf(node.tagName) === -1 ? (0, overflow.parseOverflow)(style.overflow) : overflow.OVERFLOW.HIDDEN,
            overflowWrap: (0, overflowWrap.parseOverflowWrap)(style.overflowWrap ? style.overflowWrap : style.wordWrap),
            padding: (0, padding.parsePadding)(style),
            position: position$$1,
            textDecoration: (0, textDecoration.parseTextDecoration)(style),
            textShadow: (0, textShadow.parseTextShadow)(style.textShadow),
            textTransform: (0, textTransform.parseTextTransform)(style.textTransform),
            transform: (0, transform.parseTransform)(style),
            visibility: (0, visibility.parseVisibility)(style.visibility),
            wordBreak: (0, wordBreak.parseWordBreak)(style.wordBreak),
            zIndex: (0, zIndex.parseZIndex)(position$$1 !== position.POSITION.STATIC ? style.zIndex : 'auto')
        };

        if (this.isTransformed()) {
            // getBoundingClientRect provides values post-transform, we want them without the transformation
            node.style.transform = 'matrix(1,0,0,1,0,0)';
        }

        if (display$$1 === display.DISPLAY.LIST_ITEM) {
            var listOwner = (0, ListItem.getListOwner)(this);
            if (listOwner) {
                var listIndex = listOwner.listItems.length;
                listOwner.listItems.push(this);
                this.listIndex = node.hasAttribute('value') && typeof node.value === 'number' ? node.value : listIndex === 0 ? typeof listOwner.listStart === 'number' ? listOwner.listStart : 1 : listOwner.listItems[listIndex - 1].listIndex + 1;
            }
        }

        // TODO move bound retrieval for all nodes to a later stage?
        if (node.tagName === 'IMG') {
            node.addEventListener('load', function () {
                _this.bounds = (0, Bounds_1.parseBounds)(node, scrollX, scrollY);
                _this.curvedBounds = (0, Bounds_1.parseBoundCurves)(_this.bounds, _this.style.border, _this.style.borderRadius);
            });
        }
        this.image = getImage(node, resourceLoader);
        this.bounds = IS_INPUT ? (0, Input.reformatInputBounds)((0, Bounds_1.parseBounds)(node, scrollX, scrollY)) : (0, Bounds_1.parseBounds)(node, scrollX, scrollY);
        this.curvedBounds = (0, Bounds_1.parseBoundCurves)(this.bounds, this.style.border, this.style.borderRadius);

        
    }

    _createClass(NodeContainer, [{
        key: 'getClipPaths',
        value: function getClipPaths() {
            var parentClips = this.parent ? this.parent.getClipPaths() : [];
            var isClipped = this.style.overflow !== overflow.OVERFLOW.VISIBLE;

            return isClipped ? parentClips.concat([(0, Bounds_1.calculatePaddingBoxPath)(this.curvedBounds)]) : parentClips;
        }
    }, {
        key: 'isInFlow',
        value: function isInFlow() {
            return this.isRootElement() && !this.isFloating() && !this.isAbsolutelyPositioned();
        }
    }, {
        key: 'isVisible',
        value: function isVisible() {
            return !(0, Util.contains)(this.style.display, display.DISPLAY.NONE) && this.style.opacity > 0 && this.style.visibility === visibility.VISIBILITY.VISIBLE;
        }
    }, {
        key: 'isAbsolutelyPositioned',
        value: function isAbsolutelyPositioned() {
            return this.style.position !== position.POSITION.STATIC && this.style.position !== position.POSITION.RELATIVE;
        }
    }, {
        key: 'isPositioned',
        value: function isPositioned() {
            return this.style.position !== position.POSITION.STATIC;
        }
    }, {
        key: 'isFloating',
        value: function isFloating() {
            return this.style.float !== float_1.FLOAT.NONE;
        }
    }, {
        key: 'isRootElement',
        value: function isRootElement() {
            return this.parent === null;
        }
    }, {
        key: 'isTransformed',
        value: function isTransformed() {
            return this.style.transform !== null;
        }
    }, {
        key: 'isPositionedWithZIndex',
        value: function isPositionedWithZIndex() {
            return this.isPositioned() && !this.style.zIndex.auto;
        }
    }, {
        key: 'isInlineLevel',
        value: function isInlineLevel() {
            return (0, Util.contains)(this.style.display, display.DISPLAY.INLINE) || (0, Util.contains)(this.style.display, display.DISPLAY.INLINE_BLOCK) || (0, Util.contains)(this.style.display, display.DISPLAY.INLINE_FLEX) || (0, Util.contains)(this.style.display, display.DISPLAY.INLINE_GRID) || (0, Util.contains)(this.style.display, display.DISPLAY.INLINE_LIST_ITEM) || (0, Util.contains)(this.style.display, display.DISPLAY.INLINE_TABLE);
        }
    }, {
        key: 'isInlineBlockOrInlineTable',
        value: function isInlineBlockOrInlineTable() {
            return (0, Util.contains)(this.style.display, display.DISPLAY.INLINE_BLOCK) || (0, Util.contains)(this.style.display, display.DISPLAY.INLINE_TABLE);
        }
    }]);

    return NodeContainer;
}();

exports.default = NodeContainer;


var getImage = function getImage(node, resourceLoader) {
    if (node instanceof node.ownerDocument.defaultView.SVGSVGElement || node instanceof SVGSVGElement) {
        var s = new XMLSerializer();
        return resourceLoader.loadImage('data:image/svg+xml,' + encodeURIComponent(s.serializeToString(node)));
    }
    switch (node.tagName) {
        case 'IMG':
            // $FlowFixMe
            var img = node;
            return resourceLoader.loadImage(img.currentSrc || img.src);
        case 'CANVAS':
            // $FlowFixMe
            var canvas = node;
            return resourceLoader.loadCanvas(canvas);
        case 'IFRAME':
            var iframeKey = node.getAttribute('data-html2canvas-internal-iframe-key');
            if (iframeKey) {
                return iframeKey;
            }
            break;
    }

    return null;
};
});

unwrapExports(NodeContainer_1);

var StackingContext_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _NodeContainer2 = _interopRequireDefault(NodeContainer_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StackingContext = function () {
    function StackingContext(container, parent, treatAsRealStackingContext) {
        _classCallCheck(this, StackingContext);

        this.container = container;
        this.parent = parent;
        this.contexts = [];
        this.children = [];
        this.treatAsRealStackingContext = treatAsRealStackingContext;
    }

    _createClass(StackingContext, [{
        key: 'getOpacity',
        value: function getOpacity() {
            return this.parent ? this.container.style.opacity * this.parent.getOpacity() : this.container.style.opacity;
        }
    }, {
        key: 'getRealParentStackingContext',
        value: function getRealParentStackingContext() {
            return !this.parent || this.treatAsRealStackingContext ? this : this.parent.getRealParentStackingContext();
        }
    }]);

    return StackingContext;
}();

exports.default = StackingContext;
});

unwrapExports(StackingContext_1);

var NodeParser_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NodeParser = undefined;



var _StackingContext2 = _interopRequireDefault(StackingContext_1);



var _NodeContainer2 = _interopRequireDefault(NodeContainer_1);



var _TextContainer2 = _interopRequireDefault(TextContainer_1);







function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeParser = exports.NodeParser = function NodeParser(node, resourceLoader, logger) {
    var index = 0;

    var container = new _NodeContainer2.default(node, null, resourceLoader, index++);
    var stack = new _StackingContext2.default(container, null, true);

    parseNodeTree(node, container, stack, resourceLoader, index);

    return stack;
};

var IGNORED_NODE_NAMES = ['SCRIPT', 'HEAD', 'TITLE', 'OBJECT', 'BR', 'OPTION'];

var parseNodeTree = function parseNodeTree(node, parent, stack, resourceLoader, index) {
    for (var childNode = node.firstChild, nextNode; childNode; childNode = nextNode) {
        nextNode = childNode.nextSibling;
        var defaultView = childNode.ownerDocument.defaultView;
        if (childNode instanceof defaultView.Text || childNode instanceof Text || defaultView.parent && childNode instanceof defaultView.parent.Text) {
            if (childNode.data.trim().length > 0) {
                parent.childNodes.push(_TextContainer2.default.fromTextNode(childNode, parent));
            }
        } else if (childNode instanceof defaultView.HTMLElement || childNode instanceof HTMLElement || defaultView.parent && childNode instanceof defaultView.parent.HTMLElement) {
            if (IGNORED_NODE_NAMES.indexOf(childNode.nodeName) === -1) {
                var container = new _NodeContainer2.default(childNode, parent, resourceLoader, index++);
                if (container.isVisible()) {
                    if (childNode.tagName === 'INPUT') {
                        // $FlowFixMe
                        (0, Input.inlineInputElement)(childNode, container);
                    } else if (childNode.tagName === 'TEXTAREA') {
                        // $FlowFixMe
                        (0, Input.inlineTextAreaElement)(childNode, container);
                    } else if (childNode.tagName === 'SELECT') {
                        // $FlowFixMe
                        (0, Input.inlineSelectElement)(childNode, container);
                    } else if (container.style.listStyle && container.style.listStyle.listStyleType !== listStyle.LIST_STYLE_TYPE.NONE) {
                        (0, ListItem.inlineListItemElement)(childNode, container, resourceLoader);
                    }

                    var SHOULD_TRAVERSE_CHILDREN = childNode.tagName !== 'TEXTAREA';
                    var treatAsRealStackingContext = createsRealStackingContext(container, childNode);
                    if (treatAsRealStackingContext || createsStackingContext(container)) {
                        // for treatAsRealStackingContext:false, any positioned descendants and descendants
                        // which actually create a new stacking context should be considered part of the parent stacking context
                        var parentStack = treatAsRealStackingContext || container.isPositioned() ? stack.getRealParentStackingContext() : stack;
                        var childStack = new _StackingContext2.default(container, parentStack, treatAsRealStackingContext);
                        parentStack.contexts.push(childStack);
                        if (SHOULD_TRAVERSE_CHILDREN) {
                            parseNodeTree(childNode, container, childStack, resourceLoader, index);
                        }
                    } else {
                        stack.children.push(container);
                        if (SHOULD_TRAVERSE_CHILDREN) {
                            parseNodeTree(childNode, container, stack, resourceLoader, index);
                        }
                    }
                }
            }
        } else if (childNode instanceof defaultView.SVGSVGElement || childNode instanceof SVGSVGElement || defaultView.parent && childNode instanceof defaultView.parent.SVGSVGElement) {
            var _container = new _NodeContainer2.default(childNode, parent, resourceLoader, index++);
            var _treatAsRealStackingContext = createsRealStackingContext(_container, childNode);
            if (_treatAsRealStackingContext || createsStackingContext(_container)) {
                // for treatAsRealStackingContext:false, any positioned descendants and descendants
                // which actually create a new stacking context should be considered part of the parent stacking context
                var _parentStack = _treatAsRealStackingContext || _container.isPositioned() ? stack.getRealParentStackingContext() : stack;
                var _childStack = new _StackingContext2.default(_container, _parentStack, _treatAsRealStackingContext);
                _parentStack.contexts.push(_childStack);
            } else {
                stack.children.push(_container);
            }
        }
    }
};

var createsRealStackingContext = function createsRealStackingContext(container, node) {
    return container.isRootElement() || container.isPositionedWithZIndex() || container.style.opacity < 1 || container.isTransformed() || isBodyWithTransparentRoot(container, node);
};

var createsStackingContext = function createsStackingContext(container) {
    return container.isPositioned() || container.isFloating();
};

var isBodyWithTransparentRoot = function isBodyWithTransparentRoot(container, node) {
    return node.nodeName === 'BODY' && container.parent instanceof _NodeContainer2.default && container.parent.style.background.backgroundColor.isTransparent();
};
});

unwrapExports(NodeParser_1);
var NodeParser_2 = NodeParser_1.NodeParser;

var Font = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FontMetrics = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SAMPLE_TEXT = 'Hidden Text';

var FontMetrics = exports.FontMetrics = function () {
    function FontMetrics(document) {
        _classCallCheck(this, FontMetrics);

        this._data = {};
        this._document = document;
    }

    _createClass(FontMetrics, [{
        key: '_parseMetrics',
        value: function _parseMetrics(font) {
            var container = this._document.createElement('div');
            var img = this._document.createElement('img');
            var span = this._document.createElement('span');

            var body = this._document.body;
            if (!body) {
                throw new Error('');
            }

            container.style.visibility = 'hidden';
            container.style.fontFamily = font.fontFamily;
            container.style.fontSize = font.fontSize;
            container.style.margin = '0';
            container.style.padding = '0';

            body.appendChild(container);

            img.src = Util.SMALL_IMAGE;
            img.width = 1;
            img.height = 1;

            img.style.margin = '0';
            img.style.padding = '0';
            img.style.verticalAlign = 'baseline';

            span.style.fontFamily = font.fontFamily;
            span.style.fontSize = font.fontSize;
            span.style.margin = '0';
            span.style.padding = '0';

            span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
            container.appendChild(span);
            container.appendChild(img);
            var baseline = img.offsetTop - span.offsetTop + 2;

            container.removeChild(span);
            container.appendChild(this._document.createTextNode(SAMPLE_TEXT));

            container.style.lineHeight = 'normal';
            img.style.verticalAlign = 'super';

            var middle = img.offsetTop - container.offsetTop + 2;

            body.removeChild(container);

            return { baseline: baseline, middle: middle };
        }
    }, {
        key: 'getMetrics',
        value: function getMetrics(font) {
            var key = font.fontFamily + ' ' + font.fontSize;
            if (this._data[key] === undefined) {
                this._data[key] = this._parseMetrics(font);
            }

            return this._data[key];
        }
    }]);

    return FontMetrics;
}();
});

unwrapExports(Font);
var Font_1 = Font.FontMetrics;

var Angle = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
var ANGLE = /([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;

var parseAngle = exports.parseAngle = function parseAngle(angle) {
    var match = angle.match(ANGLE);

    if (match) {
        var value = parseFloat(match[1]);
        switch (match[2].toLowerCase()) {
            case 'deg':
                return Math.PI * value / 180;
            case 'grad':
                return Math.PI / 200 * value;
            case 'rad':
                return value;
            case 'turn':
                return Math.PI * 2 * value;
        }
    }

    return null;
};
});

unwrapExports(Angle);
var Angle_1 = Angle.parseAngle;

var Gradient = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transformWebkitRadialGradientArgs = exports.parseGradient = exports.RadialGradient = exports.LinearGradient = exports.RADIAL_GRADIENT_SHAPE = exports.GRADIENT_TYPE = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var _NodeContainer2 = _interopRequireDefault(NodeContainer_1);





var _Color2 = _interopRequireDefault(Color_1);



var _Length2 = _interopRequireDefault(Length_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SIDE_OR_CORNER = /^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i;
var PERCENTAGE_ANGLES = /^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i;
var ENDS_WITH_LENGTH = /(px)|%|( 0)$/i;
var FROM_TO_COLORSTOP = /^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i;
var RADIAL_SHAPE_DEFINITION = /^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i;

var GRADIENT_TYPE = exports.GRADIENT_TYPE = {
    LINEAR_GRADIENT: 0,
    RADIAL_GRADIENT: 1
};

var RADIAL_GRADIENT_SHAPE = exports.RADIAL_GRADIENT_SHAPE = {
    CIRCLE: 0,
    ELLIPSE: 1
};

var LENGTH_FOR_POSITION = {
    left: new _Length2.default('0%'),
    top: new _Length2.default('0%'),
    center: new _Length2.default('50%'),
    right: new _Length2.default('100%'),
    bottom: new _Length2.default('100%')
};

var LinearGradient = exports.LinearGradient = function LinearGradient(colorStops, direction) {
    _classCallCheck(this, LinearGradient);

    this.type = GRADIENT_TYPE.LINEAR_GRADIENT;
    this.colorStops = colorStops;
    this.direction = direction;
};

var RadialGradient = exports.RadialGradient = function RadialGradient(colorStops, shape, center, radius) {
    _classCallCheck(this, RadialGradient);

    this.type = GRADIENT_TYPE.RADIAL_GRADIENT;
    this.colorStops = colorStops;
    this.shape = shape;
    this.center = center;
    this.radius = radius;
};

var parseGradient = exports.parseGradient = function parseGradient(container, _ref, bounds) {
    var args = _ref.args,
        method = _ref.method,
        prefix = _ref.prefix;

    if (method === 'linear-gradient') {
        return parseLinearGradient(args, bounds, !!prefix);
    } else if (method === 'gradient' && args[0] === 'linear') {
        // TODO handle correct angle
        return parseLinearGradient(['to bottom'].concat(transformObsoleteColorStops(args.slice(3))), bounds, !!prefix);
    } else if (method === 'radial-gradient') {
        return parseRadialGradient(container, prefix === '-webkit-' ? transformWebkitRadialGradientArgs(args) : args, bounds);
    } else if (method === 'gradient' && args[0] === 'radial') {
        return parseRadialGradient(container, transformObsoleteColorStops(transformWebkitRadialGradientArgs(args.slice(1))), bounds);
    }
};

var parseColorStops = function parseColorStops(args, firstColorStopIndex, lineLength) {
    var colorStops = [];

    for (var i = firstColorStopIndex; i < args.length; i++) {
        var value = args[i];
        var HAS_LENGTH = ENDS_WITH_LENGTH.test(value);
        var lastSpaceIndex = value.lastIndexOf(' ');
        var _color = new _Color2.default(HAS_LENGTH ? value.substring(0, lastSpaceIndex) : value);
        var _stop = HAS_LENGTH ? new _Length2.default(value.substring(lastSpaceIndex + 1)) : i === firstColorStopIndex ? new _Length2.default('0%') : i === args.length - 1 ? new _Length2.default('100%') : null;
        colorStops.push({ color: _color, stop: _stop });
    }

    var absoluteValuedColorStops = colorStops.map(function (_ref2) {
        var color = _ref2.color,
            stop = _ref2.stop;

        var absoluteStop = lineLength === 0 ? 0 : stop ? stop.getAbsoluteValue(lineLength) / lineLength : null;

        return {
            color: color,
            // $FlowFixMe
            stop: absoluteStop
        };
    });

    var previousColorStop = absoluteValuedColorStops[0].stop;
    for (var _i = 0; _i < absoluteValuedColorStops.length; _i++) {
        if (previousColorStop !== null) {
            var _stop2 = absoluteValuedColorStops[_i].stop;
            if (_stop2 === null) {
                var n = _i;
                while (absoluteValuedColorStops[n].stop === null) {
                    n++;
                }
                var steps = n - _i + 1;
                var nextColorStep = absoluteValuedColorStops[n].stop;
                var stepSize = (nextColorStep - previousColorStop) / steps;
                for (; _i < n; _i++) {
                    previousColorStop = absoluteValuedColorStops[_i].stop = previousColorStop + stepSize;
                }
            } else {
                previousColorStop = _stop2;
            }
        }
    }

    return absoluteValuedColorStops;
};

var parseLinearGradient = function parseLinearGradient(args, bounds, hasPrefix) {
    var angle = (0, Angle.parseAngle)(args[0]);
    var HAS_SIDE_OR_CORNER = SIDE_OR_CORNER.test(args[0]);
    var HAS_DIRECTION = HAS_SIDE_OR_CORNER || angle !== null || PERCENTAGE_ANGLES.test(args[0]);
    var direction = HAS_DIRECTION ? angle !== null ? calculateGradientDirection(
    // if there is a prefix, the 0° angle points due East (instead of North per W3C)
    hasPrefix ? angle - Math.PI * 0.5 : angle, bounds) : HAS_SIDE_OR_CORNER ? parseSideOrCorner(args[0], bounds) : parsePercentageAngle(args[0], bounds) : calculateGradientDirection(Math.PI, bounds);
    var firstColorStopIndex = HAS_DIRECTION ? 1 : 0;

    // TODO: Fix some inaccuracy with color stops with px values
    var lineLength = Math.min((0, Util.distance)(Math.abs(direction.x0) + Math.abs(direction.x1), Math.abs(direction.y0) + Math.abs(direction.y1)), bounds.width * 2, bounds.height * 2);

    return new LinearGradient(parseColorStops(args, firstColorStopIndex, lineLength), direction);
};

var parseRadialGradient = function parseRadialGradient(container, args, bounds) {
    var m = args[0].match(RADIAL_SHAPE_DEFINITION);
    var shape = m && (m[1] === 'circle' || // explicit shape specification
    m[3] !== undefined && m[5] === undefined) // only one radius coordinate
    ? RADIAL_GRADIENT_SHAPE.CIRCLE : RADIAL_GRADIENT_SHAPE.ELLIPSE;
    var radius = {};
    var center = {};

    if (m) {
        // Radius
        if (m[3] !== undefined) {
            radius.x = (0, Length_1.calculateLengthFromValueWithUnit)(container, m[3], m[4]).getAbsoluteValue(bounds.width);
        }

        if (m[5] !== undefined) {
            radius.y = (0, Length_1.calculateLengthFromValueWithUnit)(container, m[5], m[6]).getAbsoluteValue(bounds.height);
        }

        // Position
        if (m[7]) {
            center.x = LENGTH_FOR_POSITION[m[7].toLowerCase()];
        } else if (m[8] !== undefined) {
            center.x = (0, Length_1.calculateLengthFromValueWithUnit)(container, m[8], m[9]);
        }

        if (m[10]) {
            center.y = LENGTH_FOR_POSITION[m[10].toLowerCase()];
        } else if (m[11] !== undefined) {
            center.y = (0, Length_1.calculateLengthFromValueWithUnit)(container, m[11], m[12]);
        }
    }

    var gradientCenter = {
        x: center.x === undefined ? bounds.width / 2 : center.x.getAbsoluteValue(bounds.width),
        y: center.y === undefined ? bounds.height / 2 : center.y.getAbsoluteValue(bounds.height)
    };
    var gradientRadius = calculateRadius(m && m[2] || 'farthest-corner', shape, gradientCenter, radius, bounds);

    return new RadialGradient(parseColorStops(args, m ? 1 : 0, Math.min(gradientRadius.x, gradientRadius.y)), shape, gradientCenter, gradientRadius);
};

var calculateGradientDirection = function calculateGradientDirection(radian, bounds) {
    var width = bounds.width;
    var height = bounds.height;
    var HALF_WIDTH = width * 0.5;
    var HALF_HEIGHT = height * 0.5;
    var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
    var HALF_LINE_LENGTH = lineLength / 2;

    var x0 = HALF_WIDTH + Math.sin(radian) * HALF_LINE_LENGTH;
    var y0 = HALF_HEIGHT - Math.cos(radian) * HALF_LINE_LENGTH;
    var x1 = width - x0;
    var y1 = height - y0;

    return { x0: x0, x1: x1, y0: y0, y1: y1 };
};

var parseTopRight = function parseTopRight(bounds) {
    return Math.acos(bounds.width / 2 / ((0, Util.distance)(bounds.width, bounds.height) / 2));
};

var parseSideOrCorner = function parseSideOrCorner(side, bounds) {
    switch (side) {
        case 'bottom':
        case 'to top':
            return calculateGradientDirection(0, bounds);
        case 'left':
        case 'to right':
            return calculateGradientDirection(Math.PI / 2, bounds);
        case 'right':
        case 'to left':
            return calculateGradientDirection(3 * Math.PI / 2, bounds);
        case 'top right':
        case 'right top':
        case 'to bottom left':
        case 'to left bottom':
            return calculateGradientDirection(Math.PI + parseTopRight(bounds), bounds);
        case 'top left':
        case 'left top':
        case 'to bottom right':
        case 'to right bottom':
            return calculateGradientDirection(Math.PI - parseTopRight(bounds), bounds);
        case 'bottom left':
        case 'left bottom':
        case 'to top right':
        case 'to right top':
            return calculateGradientDirection(parseTopRight(bounds), bounds);
        case 'bottom right':
        case 'right bottom':
        case 'to top left':
        case 'to left top':
            return calculateGradientDirection(2 * Math.PI - parseTopRight(bounds), bounds);
        case 'top':
        case 'to bottom':
        default:
            return calculateGradientDirection(Math.PI, bounds);
    }
};

var parsePercentageAngle = function parsePercentageAngle(angle, bounds) {
    var _angle$split$map = angle.split(' ').map(parseFloat),
        _angle$split$map2 = _slicedToArray(_angle$split$map, 2),
        left = _angle$split$map2[0],
        top = _angle$split$map2[1];

    var ratio = left / 100 * bounds.width / (top / 100 * bounds.height);

    return calculateGradientDirection(Math.atan(isNaN(ratio) ? 1 : ratio) + Math.PI / 2, bounds);
};

var findCorner = function findCorner(bounds, x, y, closest) {
    var corners = [{ x: 0, y: 0 }, { x: 0, y: bounds.height }, { x: bounds.width, y: 0 }, { x: bounds.width, y: bounds.height }];

    // $FlowFixMe
    return corners.reduce(function (stat, corner) {
        var d = (0, Util.distance)(x - corner.x, y - corner.y);
        if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
            return {
                optimumCorner: corner,
                optimumDistance: d
            };
        }

        return stat;
    }, {
        optimumDistance: closest ? Infinity : -Infinity,
        optimumCorner: null
    }).optimumCorner;
};

var calculateRadius = function calculateRadius(extent, shape, center, radius, bounds) {
    var x = center.x;
    var y = center.y;
    var rx = 0;
    var ry = 0;

    switch (extent) {
        case 'closest-side':
            // The ending shape is sized so that that it exactly meets the side of the gradient box closest to the gradient’s center.
            // If the shape is an ellipse, it exactly meets the closest side in each dimension.
            if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
                rx = ry = Math.min(Math.abs(x), Math.abs(x - bounds.width), Math.abs(y), Math.abs(y - bounds.height));
            } else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
                rx = Math.min(Math.abs(x), Math.abs(x - bounds.width));
                ry = Math.min(Math.abs(y), Math.abs(y - bounds.height));
            }
            break;

        case 'closest-corner':
            // The ending shape is sized so that that it passes through the corner of the gradient box closest to the gradient’s center.
            // If the shape is an ellipse, the ending shape is given the same aspect-ratio it would have if closest-side were specified.
            if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
                rx = ry = Math.min((0, Util.distance)(x, y), (0, Util.distance)(x, y - bounds.height), (0, Util.distance)(x - bounds.width, y), (0, Util.distance)(x - bounds.width, y - bounds.height));
            } else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
                // Compute the ratio ry/rx (which is to be the same as for "closest-side")
                var c = Math.min(Math.abs(y), Math.abs(y - bounds.height)) / Math.min(Math.abs(x), Math.abs(x - bounds.width));
                var corner = findCorner(bounds, x, y, true);
                rx = (0, Util.distance)(corner.x - x, (corner.y - y) / c);
                ry = c * rx;
            }
            break;

        case 'farthest-side':
            // Same as closest-side, except the ending shape is sized based on the farthest side(s)
            if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
                rx = ry = Math.max(Math.abs(x), Math.abs(x - bounds.width), Math.abs(y), Math.abs(y - bounds.height));
            } else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
                rx = Math.max(Math.abs(x), Math.abs(x - bounds.width));
                ry = Math.max(Math.abs(y), Math.abs(y - bounds.height));
            }
            break;

        case 'farthest-corner':
            // Same as closest-corner, except the ending shape is sized based on the farthest corner.
            // If the shape is an ellipse, the ending shape is given the same aspect ratio it would have if farthest-side were specified.
            if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
                rx = ry = Math.max((0, Util.distance)(x, y), (0, Util.distance)(x, y - bounds.height), (0, Util.distance)(x - bounds.width, y), (0, Util.distance)(x - bounds.width, y - bounds.height));
            } else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
                // Compute the ratio ry/rx (which is to be the same as for "farthest-side")
                var _c = Math.max(Math.abs(y), Math.abs(y - bounds.height)) / Math.max(Math.abs(x), Math.abs(x - bounds.width));
                var _corner = findCorner(bounds, x, y, false);
                rx = (0, Util.distance)(_corner.x - x, (_corner.y - y) / _c);
                ry = _c * rx;
            }
            break;

        default:
            // pixel or percentage values
            rx = radius.x || 0;
            ry = radius.y !== undefined ? radius.y : rx;
            break;
    }

    return {
        x: rx,
        y: ry
    };
};

var transformWebkitRadialGradientArgs = exports.transformWebkitRadialGradientArgs = function transformWebkitRadialGradientArgs(args) {
    var shape = '';
    var radius = '';
    var extent = '';
    var position = '';
    var idx = 0;

    var POSITION = /^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i;
    var SHAPE_AND_EXTENT = /^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i;
    var RADIUS = /^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i;

    var matchStartPosition = args[idx].match(POSITION);
    if (matchStartPosition) {
        idx++;
    }

    var matchShapeExtent = args[idx].match(SHAPE_AND_EXTENT);
    if (matchShapeExtent) {
        shape = matchShapeExtent[1] || '';
        extent = matchShapeExtent[2] || '';
        if (extent === 'contain') {
            extent = 'closest-side';
        } else if (extent === 'cover') {
            extent = 'farthest-corner';
        }
        idx++;
    }

    var matchStartRadius = args[idx].match(RADIUS);
    if (matchStartRadius) {
        idx++;
    }

    var matchEndPosition = args[idx].match(POSITION);
    if (matchEndPosition) {
        idx++;
    }

    var matchEndRadius = args[idx].match(RADIUS);
    if (matchEndRadius) {
        idx++;
    }

    var matchPosition = matchEndPosition || matchStartPosition;
    if (matchPosition && matchPosition[1]) {
        position = matchPosition[1] + (/^\d+$/.test(matchPosition[1]) ? 'px' : '');
        if (matchPosition[2]) {
            position += ' ' + matchPosition[2] + (/^\d+$/.test(matchPosition[2]) ? 'px' : '');
        }
    }

    var matchRadius = matchEndRadius || matchStartRadius;
    if (matchRadius) {
        radius = matchRadius[0];
        if (!matchRadius[1]) {
            radius += 'px';
        }
    }

    if (position && !shape && !radius && !extent) {
        radius = position;
        position = '';
    }

    if (position) {
        position = 'at ' + position;
    }

    return [[shape, extent, radius, position].filter(function (s) {
        return !!s;
    }).join(' ')].concat(args.slice(idx));
};

var transformObsoleteColorStops = function transformObsoleteColorStops(args) {
    return args.map(function (color) {
        return color.match(FROM_TO_COLORSTOP);
    })
    // $FlowFixMe
    .map(function (v, index) {
        if (!v) {
            return args[index];
        }

        switch (v[1]) {
            case 'from':
                return v[4] + ' 0%';
            case 'to':
                return v[4] + ' 100%';
            case 'color-stop':
                if (v[3] === '%') {
                    return v[4] + ' ' + v[2];
                }
                return v[4] + ' ' + parseFloat(v[2]) * 100 + '%';
        }
    });
};
});

unwrapExports(Gradient);
var Gradient_1 = Gradient.transformWebkitRadialGradientArgs;
var Gradient_2 = Gradient.parseGradient;
var Gradient_3 = Gradient.RadialGradient;
var Gradient_4 = Gradient.LinearGradient;
var Gradient_5 = Gradient.RADIAL_GRADIENT_SHAPE;
var Gradient_6 = Gradient.GRADIENT_TYPE;

var Renderer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();









var _TextContainer2 = _interopRequireDefault(TextContainer_1);





function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
    function Renderer(target, options) {
        _classCallCheck(this, Renderer);

        this.target = target;
        this.options = options;
        target.render(options);
    }

    _createClass(Renderer, [{
        key: 'renderNode',
        value: function renderNode(container) {
            if (container.isVisible()) {
                this.renderNodeBackgroundAndBorders(container);
                this.renderNodeContent(container);
            }
        }
    }, {
        key: 'renderNodeContent',
        value: function renderNodeContent(container) {
            var _this = this;

            var callback = function callback() {
                if (container.childNodes.length) {
                    container.childNodes.forEach(function (child) {
                        if (child instanceof _TextContainer2.default) {
                            var style = child.parent.style;
                            _this.target.renderTextNode(child.bounds, style.color, style.font, style.textDecoration, style.textShadow);
                        } else {
                            _this.target.drawShape(child, container.style.color);
                        }
                    });
                }

                if (container.image) {
                    var _image = _this.options.imageStore.get(container.image);
                    if (_image) {
                        var contentBox = (0, Bounds_1.calculateContentBox)(container.bounds, container.style.padding, container.style.border);
                        var _width = typeof _image.width === 'number' && _image.width > 0 ? _image.width : contentBox.width;
                        var _height = typeof _image.height === 'number' && _image.height > 0 ? _image.height : contentBox.height;
                        if (_width > 0 && _height > 0) {
                            _this.target.clip([(0, Bounds_1.calculatePaddingBoxPath)(container.curvedBounds)], function () {
                                _this.target.drawImage(_image, new Bounds_1.Bounds(0, 0, _width, _height), contentBox);
                            });
                        }
                    }
                }
            };
            var paths = container.getClipPaths();
            if (paths.length) {
                this.target.clip(paths, callback);
            } else {
                callback();
            }
        }
    }, {
        key: 'renderNodeBackgroundAndBorders',
        value: function renderNodeBackgroundAndBorders(container) {
            var _this2 = this;

            var HAS_BACKGROUND = !container.style.background.backgroundColor.isTransparent() || container.style.background.backgroundImage.length;

            var hasRenderableBorders = container.style.border.some(function (border$$2) {
                return border$$2.borderStyle !== border.BORDER_STYLE.NONE && !border$$2.borderColor.isTransparent();
            });

            var callback = function callback() {
                var backgroundPaintingArea = (0, background.calculateBackgroungPaintingArea)(container.curvedBounds, container.style.background.backgroundClip);

                if (HAS_BACKGROUND) {
                    _this2.target.clip([backgroundPaintingArea], function () {
                        if (!container.style.background.backgroundColor.isTransparent()) {
                            _this2.target.fill(container.style.background.backgroundColor);
                        }

                        _this2.renderBackgroundImage(container);
                    });
                }

                container.style.border.forEach(function (border$$2, side) {
                    if (border$$2.borderStyle !== border.BORDER_STYLE.NONE && !border$$2.borderColor.isTransparent()) {
                        _this2.renderBorder(border$$2, side, container.curvedBounds);
                    }
                });
            };

            if (HAS_BACKGROUND || hasRenderableBorders) {
                var paths = container.parent ? container.parent.getClipPaths() : [];
                if (paths.length) {
                    this.target.clip(paths, callback);
                } else {
                    callback();
                }
            }
        }
    }, {
        key: 'renderBackgroundImage',
        value: function renderBackgroundImage(container) {
            var _this3 = this;

            container.style.background.backgroundImage.slice(0).reverse().forEach(function (backgroundImage) {
                if (backgroundImage.source.method === 'url' && backgroundImage.source.args.length) {
                    _this3.renderBackgroundRepeat(container, backgroundImage);
                } else if (/gradient/i.test(backgroundImage.source.method)) {
                    _this3.renderBackgroundGradient(container, backgroundImage);
                }
            });
        }
    }, {
        key: 'renderBackgroundRepeat',
        value: function renderBackgroundRepeat(container, background$$2) {
            var image = this.options.imageStore.get(background$$2.source.args[0]);
            if (image) {
                var backgroundPositioningArea = (0, background.calculateBackgroungPositioningArea)(container.style.background.backgroundOrigin, container.bounds, container.style.padding, container.style.border);
                var backgroundImageSize = (0, background.calculateBackgroundSize)(background$$2, image, backgroundPositioningArea);
                var position = (0, background.calculateBackgroundPosition)(background$$2.position, backgroundImageSize, backgroundPositioningArea);
                var _path = (0, background.calculateBackgroundRepeatPath)(background$$2, position, backgroundImageSize, backgroundPositioningArea, container.bounds);

                var _offsetX = Math.round(backgroundPositioningArea.left + position.x);
                var _offsetY = Math.round(backgroundPositioningArea.top + position.y);
                this.target.renderRepeat(_path, image, backgroundImageSize, _offsetX, _offsetY);
            }
        }
    }, {
        key: 'renderBackgroundGradient',
        value: function renderBackgroundGradient(container, background$$2) {
            var backgroundPositioningArea = (0, background.calculateBackgroungPositioningArea)(container.style.background.backgroundOrigin, container.bounds, container.style.padding, container.style.border);
            var backgroundImageSize = (0, background.calculateGradientBackgroundSize)(background$$2, backgroundPositioningArea);
            var position = (0, background.calculateBackgroundPosition)(background$$2.position, backgroundImageSize, backgroundPositioningArea);
            var gradientBounds = new Bounds_1.Bounds(Math.round(backgroundPositioningArea.left + position.x), Math.round(backgroundPositioningArea.top + position.y), backgroundImageSize.width, backgroundImageSize.height);

            var gradient = (0, Gradient.parseGradient)(container, background$$2.source, gradientBounds);
            if (gradient) {
                switch (gradient.type) {
                    case Gradient.GRADIENT_TYPE.LINEAR_GRADIENT:
                        // $FlowFixMe
                        this.target.renderLinearGradient(gradientBounds, gradient);
                        break;
                    case Gradient.GRADIENT_TYPE.RADIAL_GRADIENT:
                        // $FlowFixMe
                        this.target.renderRadialGradient(gradientBounds, gradient);
                        break;
                }
            }
        }
    }, {
        key: 'renderBorder',
        value: function renderBorder(border$$2, side, curvePoints) {
            this.target.drawShape((0, Bounds_1.parsePathForBorder)(curvePoints, side), border$$2.borderColor);
        }
    }, {
        key: 'renderStack',
        value: function renderStack(stack) {
            var _this4 = this;

            if (stack.container.isVisible()) {
                var _opacity = stack.getOpacity();
                if (_opacity !== this._opacity) {
                    this.target.setOpacity(stack.getOpacity());
                    this._opacity = _opacity;
                }

                var _transform = stack.container.style.transform;
                if (_transform !== null) {
                    this.target.transform(stack.container.bounds.left + _transform.transformOrigin[0].value, stack.container.bounds.top + _transform.transformOrigin[1].value, _transform.transform, function () {
                        return _this4.renderStackContent(stack);
                    });
                } else {
                    this.renderStackContent(stack);
                }
            }
        }
    }, {
        key: 'renderStackContent',
        value: function renderStackContent(stack) {
            var _splitStackingContext = splitStackingContexts(stack),
                _splitStackingContext2 = _slicedToArray(_splitStackingContext, 5),
                negativeZIndex = _splitStackingContext2[0],
                zeroOrAutoZIndexOrTransformedOrOpacity = _splitStackingContext2[1],
                positiveZIndex = _splitStackingContext2[2],
                nonPositionedFloats = _splitStackingContext2[3],
                nonPositionedInlineLevel = _splitStackingContext2[4];

            var _splitDescendants = splitDescendants(stack),
                _splitDescendants2 = _slicedToArray(_splitDescendants, 2),
                inlineLevel = _splitDescendants2[0],
                nonInlineLevel = _splitDescendants2[1];

            // https://www.w3.org/TR/css-position-3/#painting-order
            // 1. the background and borders of the element forming the stacking context.


            this.renderNodeBackgroundAndBorders(stack.container);
            // 2. the child stacking contexts with negative stack levels (most negative first).
            negativeZIndex.sort(sortByZIndex).forEach(this.renderStack, this);
            // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
            this.renderNodeContent(stack.container);
            nonInlineLevel.forEach(this.renderNode, this);
            // 4. All non-positioned floating descendants, in tree order. For each one of these,
            // treat the element as if it created a new stacking context, but any positioned descendants and descendants
            // which actually create a new stacking context should be considered part of the parent stacking context,
            // not this new one.
            nonPositionedFloats.forEach(this.renderStack, this);
            // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
            nonPositionedInlineLevel.forEach(this.renderStack, this);
            inlineLevel.forEach(this.renderNode, this);
            // 6. All positioned, opacity or transform descendants, in tree order that fall into the following categories:
            //  All positioned descendants with 'z-index: auto' or 'z-index: 0', in tree order.
            //  For those with 'z-index: auto', treat the element as if it created a new stacking context,
            //  but any positioned descendants and descendants which actually create a new stacking context should be
            //  considered part of the parent stacking context, not this new one. For those with 'z-index: 0',
            //  treat the stacking context generated atomically.
            //
            //  All opacity descendants with opacity less than 1
            //
            //  All transform descendants with transform other than none
            zeroOrAutoZIndexOrTransformedOrOpacity.forEach(this.renderStack, this);
            // 7. Stacking contexts formed by positioned descendants with z-indices greater than or equal to 1 in z-index
            // order (smallest first) then tree order.
            positiveZIndex.sort(sortByZIndex).forEach(this.renderStack, this);
        }
    }, {
        key: 'render',
        value: function render(stack) {
            if (this.options.backgroundColor) {
                this.target.rectangle(this.options.x, this.options.y, this.options.width, this.options.height, this.options.backgroundColor);
            }
            this.renderStack(stack);
            var target = this.target.getTarget();
            return target;
        }
    }]);

    return Renderer;
}();

exports.default = Renderer;


var splitDescendants = function splitDescendants(stack) {
    var inlineLevel = [];
    var nonInlineLevel = [];

    var length = stack.children.length;
    for (var i = 0; i < length; i++) {
        var child = stack.children[i];
        if (child.isInlineLevel()) {
            inlineLevel.push(child);
        } else {
            nonInlineLevel.push(child);
        }
    }
    return [inlineLevel, nonInlineLevel];
};

var splitStackingContexts = function splitStackingContexts(stack) {
    var negativeZIndex = [];
    var zeroOrAutoZIndexOrTransformedOrOpacity = [];
    var positiveZIndex = [];
    var nonPositionedFloats = [];
    var nonPositionedInlineLevel = [];
    var length = stack.contexts.length;
    for (var i = 0; i < length; i++) {
        var child = stack.contexts[i];
        if (child.container.isPositioned() || child.container.style.opacity < 1 || child.container.isTransformed()) {
            if (child.container.style.zIndex.order < 0) {
                negativeZIndex.push(child);
            } else if (child.container.style.zIndex.order > 0) {
                positiveZIndex.push(child);
            } else {
                zeroOrAutoZIndexOrTransformedOrOpacity.push(child);
            }
        } else {
            if (child.container.isFloating()) {
                nonPositionedFloats.push(child);
            } else {
                nonPositionedInlineLevel.push(child);
            }
        }
    }
    return [negativeZIndex, zeroOrAutoZIndexOrTransformedOrOpacity, positiveZIndex, nonPositionedFloats, nonPositionedInlineLevel];
};

var sortByZIndex = function sortByZIndex(a, b) {
    if (a.container.style.zIndex.order > b.container.style.zIndex.order) {
        return 1;
    } else if (a.container.style.zIndex.order < b.container.style.zIndex.order) {
        return -1;
    }

    return a.container.index > b.container.index ? 1 : -1;
};
});

unwrapExports(Renderer_1);

var _Proxy = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Proxy = undefined;



var _Feature2 = _interopRequireDefault(Feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Proxy = exports.Proxy = function Proxy(src, options) {
    if (!options.proxy) {
        return Promise.reject(null);
    }
    var proxy = options.proxy;

    return new Promise(function (resolve, reject) {
        var responseType = _Feature2.default.SUPPORT_CORS_XHR && _Feature2.default.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
        var xhr = _Feature2.default.SUPPORT_CORS_XHR ? new XMLHttpRequest() : new XDomainRequest();
        xhr.onload = function () {
            if (xhr instanceof XMLHttpRequest) {
                if (xhr.status === 200) {
                    if (responseType === 'text') {
                        resolve(xhr.response);
                    } else {
                        var reader = new FileReader();
                        // $FlowFixMe
                        reader.addEventListener('load', function () {
                            return resolve(reader.result);
                        }, false);
                        // $FlowFixMe
                        reader.addEventListener('error', function (e) {
                            return reject(e);
                        }, false);
                        reader.readAsDataURL(xhr.response);
                    }
                } else {
                    reject('');
                }
            } else {
                resolve(xhr.responseText);
            }
        };

        xhr.onerror = reject;
        xhr.open('GET', proxy + '?url=' + encodeURIComponent(src) + '&responseType=' + responseType);

        if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
            xhr.responseType = responseType;
        }

        if (options.imageTimeout) {
            var timeout = options.imageTimeout;
            xhr.timeout = timeout;
            xhr.ontimeout = function () {
                return reject('');
            };
        }

        xhr.send();
    });
};
});

unwrapExports(_Proxy);
var _Proxy_1 = _Proxy.Proxy;

var ResourceLoader_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResourceStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _Feature2 = _interopRequireDefault(Feature);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceLoader = function () {
    function ResourceLoader(options, logger, window) {
        _classCallCheck(this, ResourceLoader);

        this.options = options;
        this._window = window;
        this.origin = this.getOrigin(window.location.href);
        this.cache = {};
        this.logger = logger;
        this._index = 0;
    }

    _createClass(ResourceLoader, [{
        key: 'loadImage',
        value: function loadImage(src) {
            var _this = this;

            if (this.hasResourceInCache(src)) {
                return src;
            }
            if (isBlobImage(src)) {
                this.cache[src] = _loadImage(src, this.options.imageTimeout || 0);
                return src;
            }

            if (!isSVG(src) || _Feature2.default.SUPPORT_SVG_DRAWING) {
                if (this.options.allowTaint === true || isInlineImage(src) || this.isSameOrigin(src)) {
                    return this.addImage(src, src, false);
                } else if (!this.isSameOrigin(src)) {
                    if (typeof this.options.proxy === 'string') {
                        this.cache[src] = (0, _Proxy.Proxy)(src, this.options).then(function (src) {
                            return _loadImage(src, _this.options.imageTimeout || 0);
                        });
                        return src;
                    } else if (this.options.useCORS === true && _Feature2.default.SUPPORT_CORS_IMAGES) {
                        return this.addImage(src, src, true);
                    }
                }
            }
        }
    }, {
        key: 'inlineImage',
        value: function inlineImage(src) {
            var _this2 = this;

            if (isInlineImage(src)) {
                return _loadImage(src, this.options.imageTimeout || 0);
            }
            if (this.hasResourceInCache(src)) {
                return this.cache[src];
            }
            if (!this.isSameOrigin(src) && typeof this.options.proxy === 'string') {
                return this.cache[src] = (0, _Proxy.Proxy)(src, this.options).then(function (src) {
                    return _loadImage(src, _this2.options.imageTimeout || 0);
                });
            }

            return this.xhrImage(src);
        }
    }, {
        key: 'xhrImage',
        value: function xhrImage(src) {
            var _this3 = this;

            this.cache[src] = new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status !== 200) {
                            reject('Failed to fetch image ' + src.substring(0, 256) + ' with status code ' + xhr.status);
                        } else {
                            var reader = new FileReader();
                            reader.addEventListener('load', function () {
                                // $FlowFixMe
                                var result = reader.result;
                                resolve(result);
                            }, false);
                            reader.addEventListener('error', function (e) {
                                return reject(e);
                            }, false);
                            reader.readAsDataURL(xhr.response);
                        }
                    }
                };
                xhr.responseType = 'blob';
                if (_this3.options.imageTimeout) {
                    var timeout = _this3.options.imageTimeout;
                    xhr.timeout = timeout;
                    xhr.ontimeout = function () {
                        return reject('');
                    };
                }
                xhr.open('GET', src, true);
                xhr.send();
            }).then(function (src) {
                return _loadImage(src, _this3.options.imageTimeout || 0);
            });

            return this.cache[src];
        }
    }, {
        key: 'loadCanvas',
        value: function loadCanvas(node) {
            var key = String(this._index++);
            this.cache[key] = Promise.resolve(node);
            return key;
        }
    }, {
        key: 'hasResourceInCache',
        value: function hasResourceInCache(key) {
            return typeof this.cache[key] !== 'undefined';
        }
    }, {
        key: 'addImage',
        value: function addImage(key, src, useCORS) {
            var _this4 = this;

            var imageLoadHandler = function imageLoadHandler(supportsDataImages) {
                return new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.onload = function () {
                        return resolve(img);
                    };
                    //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
                    if (!supportsDataImages || useCORS) {
                        img.crossOrigin = 'anonymous';
                    }

                    img.onerror = reject;
                    img.src = src;
                    if (img.complete === true) {
                        // Inline XML images may fail to parse, throwing an Error later on
                        setTimeout(function () {
                            resolve(img);
                        }, 500);
                    }
                    if (_this4.options.imageTimeout) {
                        var timeout = _this4.options.imageTimeout;
                        setTimeout(function () {
                            return reject('');
                        }, timeout);
                    }
                });
            };

            this.cache[key] = isInlineBase64Image(src) && !isSVG(src) ? // $FlowFixMe
            _Feature2.default.SUPPORT_BASE64_DRAWING(src).then(imageLoadHandler) : imageLoadHandler(true);
            return key;
        }
    }, {
        key: 'isSameOrigin',
        value: function isSameOrigin(url) {
            return this.getOrigin(url) === this.origin;
        }
    }, {
        key: 'getOrigin',
        value: function getOrigin(url) {
            var link = this._link || (this._link = this._window.document.createElement('a'));
            link.href = url;
            link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
            return link.protocol + link.hostname + link.port;
        }
    }, {
        key: 'ready',
        value: function ready() {
            var _this5 = this;

            var keys = Object.keys(this.cache);
            var values = keys.map(function (str) {
                return _this5.cache[str].catch(function (e) {
                    return null;
                });
            });
            return Promise.all(values).then(function (images) {
                return new ResourceStore(keys, images);
            });
        }
    }]);

    return ResourceLoader;
}();

exports.default = ResourceLoader;

var ResourceStore = exports.ResourceStore = function () {
    function ResourceStore(keys, resources) {
        _classCallCheck(this, ResourceStore);

        this._keys = keys;
        this._resources = resources;
    }

    _createClass(ResourceStore, [{
        key: 'get',
        value: function get(key) {
            var index = this._keys.indexOf(key);
            return index === -1 ? null : this._resources[index];
        }
    }]);

    return ResourceStore;
}();

var INLINE_SVG = /^data:image\/svg\+xml/i;
var INLINE_BASE64 = /^data:image\/.*;base64,/i;
var INLINE_IMG = /^data:image\/.*/i;

var isInlineImage = function isInlineImage(src) {
    return INLINE_IMG.test(src);
};
var isInlineBase64Image = function isInlineBase64Image(src) {
    return INLINE_BASE64.test(src);
};
var isBlobImage = function isBlobImage(src) {
    return src.substr(0, 4) === 'blob';
};

var isSVG = function isSVG(src) {
    return src.substr(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src);
};

var _loadImage = function _loadImage(src, timeout) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            return resolve(img);
        };
        img.onerror = reject;
        img.src = src;
        if (img.complete === true) {
            // Inline XML images may fail to parse, throwing an Error later on
            setTimeout(function () {
                resolve(img);
            }, 500);
        }
        if (timeout) {
            setTimeout(function () {
                return reject('');
            }, timeout);
        }
    });
};
});

unwrapExports(ResourceLoader_1);
var ResourceLoader_2 = ResourceLoader_1.ResourceStore;

var PseudoNodeContent = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseContent = exports.resolvePseudoContent = exports.popCounters = exports.parseCounterReset = exports.TOKEN_TYPE = exports.PSEUDO_CONTENT_ITEM_TYPE = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();





var PSEUDO_CONTENT_ITEM_TYPE = exports.PSEUDO_CONTENT_ITEM_TYPE = {
    TEXT: 0,
    IMAGE: 1
};

var TOKEN_TYPE = exports.TOKEN_TYPE = {
    STRING: 0,
    ATTRIBUTE: 1,
    URL: 2,
    COUNTER: 3,
    COUNTERS: 4,
    OPENQUOTE: 5,
    CLOSEQUOTE: 6
};

var parseCounterReset = exports.parseCounterReset = function parseCounterReset(style, data) {
    if (!style || !style.counterReset || style.counterReset === 'none') {
        return [];
    }

    var counterNames = [];
    var counterResets = style.counterReset.split(/\s*,\s*/);
    var lenCounterResets = counterResets.length;

    for (var i = 0; i < lenCounterResets; i++) {
        var _counterResets$i$spli = counterResets[i].split(/\s+/),
            _counterResets$i$spli2 = _slicedToArray(_counterResets$i$spli, 2),
            counterName = _counterResets$i$spli2[0],
            initialValue = _counterResets$i$spli2[1];

        counterNames.push(counterName);
        var counter = data.counters[counterName];
        if (!counter) {
            counter = data.counters[counterName] = [];
        }
        counter.push(parseInt(initialValue || 0, 10));
    }

    return counterNames;
};

var popCounters = exports.popCounters = function popCounters(counterNames, data) {
    var lenCounters = counterNames.length;
    for (var i = 0; i < lenCounters; i++) {
        data.counters[counterNames[i]].pop();
    }
};

var resolvePseudoContent = exports.resolvePseudoContent = function resolvePseudoContent(node, style, data) {
    if (!style || !style.content || style.content === 'none' || style.content === '-moz-alt-content' || style.display === 'none') {
        return null;
    }

    var tokens = parseContent(style.content);

    var len = tokens.length;
    var contentItems = [];
    var s = '';

    // increment the counter (if there is a "counter-increment" declaration)
    var counterIncrement = style.counterIncrement;
    if (counterIncrement && counterIncrement !== 'none') {
        var _counterIncrement$spl = counterIncrement.split(/\s+/),
            _counterIncrement$spl2 = _slicedToArray(_counterIncrement$spl, 2),
            counterName = _counterIncrement$spl2[0],
            incrementValue = _counterIncrement$spl2[1];

        var counter = data.counters[counterName];
        if (counter) {
            counter[counter.length - 1] += incrementValue === undefined ? 1 : parseInt(incrementValue, 10);
        }
    }

    // build the content string
    for (var i = 0; i < len; i++) {
        var token = tokens[i];
        switch (token.type) {
            case TOKEN_TYPE.STRING:
                s += token.value || '';
                break;

            case TOKEN_TYPE.ATTRIBUTE:
                if (node instanceof HTMLElement && token.value) {
                    s += node.getAttribute(token.value) || '';
                }
                break;

            case TOKEN_TYPE.COUNTER:
                var _counter = data.counters[token.name || ''];
                if (_counter) {
                    s += formatCounterValue([_counter[_counter.length - 1]], '', token.format);
                }
                break;

            case TOKEN_TYPE.COUNTERS:
                var _counters = data.counters[token.name || ''];
                if (_counters) {
                    s += formatCounterValue(_counters, token.glue, token.format);
                }
                break;

            case TOKEN_TYPE.OPENQUOTE:
                s += getQuote(style, true, data.quoteDepth);
                data.quoteDepth++;
                break;

            case TOKEN_TYPE.CLOSEQUOTE:
                data.quoteDepth--;
                s += getQuote(style, false, data.quoteDepth);
                break;

            case TOKEN_TYPE.URL:
                if (s) {
                    contentItems.push({ type: PSEUDO_CONTENT_ITEM_TYPE.TEXT, value: s });
                    s = '';
                }
                contentItems.push({ type: PSEUDO_CONTENT_ITEM_TYPE.IMAGE, value: token.value || '' });
                break;
        }
    }

    if (s) {
        contentItems.push({ type: PSEUDO_CONTENT_ITEM_TYPE.TEXT, value: s });
    }

    return contentItems;
};

var parseContent = exports.parseContent = function parseContent(content, cache) {
    if (cache && cache[content]) {
        return cache[content];
    }

    var tokens = [];
    var len = content.length;

    var isString = false;
    var isEscaped = false;
    var isFunction = false;
    var str = '';
    var functionName = '';
    var args = [];

    for (var i = 0; i < len; i++) {
        var c = content.charAt(i);

        switch (c) {
            case "'":
            case '"':
                if (isEscaped) {
                    str += c;
                } else {
                    isString = !isString;
                    if (!isFunction && !isString) {
                        tokens.push({ type: TOKEN_TYPE.STRING, value: str });
                        str = '';
                    }
                }
                break;

            case '\\':
                if (isEscaped) {
                    str += c;
                    isEscaped = false;
                } else {
                    isEscaped = true;
                }
                break;

            case '(':
                if (isString) {
                    str += c;
                } else {
                    isFunction = true;
                    functionName = str;
                    str = '';
                    args = [];
                }
                break;

            case ')':
                if (isString) {
                    str += c;
                } else if (isFunction) {
                    if (str) {
                        args.push(str);
                    }

                    switch (functionName) {
                        case 'attr':
                            if (args.length > 0) {
                                tokens.push({ type: TOKEN_TYPE.ATTRIBUTE, value: args[0] });
                            }
                            break;

                        case 'counter':
                            if (args.length > 0) {
                                var counter = {
                                    type: TOKEN_TYPE.COUNTER,
                                    name: args[0]
                                };
                                if (args.length > 1) {
                                    counter.format = args[1];
                                }
                                tokens.push(counter);
                            }
                            break;

                        case 'counters':
                            if (args.length > 0) {
                                var _counters2 = {
                                    type: TOKEN_TYPE.COUNTERS,
                                    name: args[0]
                                };
                                if (args.length > 1) {
                                    _counters2.glue = args[1];
                                }
                                if (args.length > 2) {
                                    _counters2.format = args[2];
                                }
                                tokens.push(_counters2);
                            }
                            break;

                        case 'url':
                            if (args.length > 0) {
                                tokens.push({ type: TOKEN_TYPE.URL, value: args[0] });
                            }
                            break;
                    }

                    isFunction = false;
                    str = '';
                }
                break;

            case ',':
                if (isString) {
                    str += c;
                } else if (isFunction) {
                    args.push(str);
                    str = '';
                }
                break;

            case ' ':
            case '\t':
                if (isString) {
                    str += c;
                } else if (str) {
                    addOtherToken(tokens, str);
                    str = '';
                }
                break;

            default:
                str += c;
        }

        if (c !== '\\') {
            isEscaped = false;
        }
    }

    if (str) {
        addOtherToken(tokens, str);
    }

    if (cache) {
        cache[content] = tokens;
    }

    return tokens;
};

var addOtherToken = function addOtherToken(tokens, identifier) {
    switch (identifier) {
        case 'open-quote':
            tokens.push({ type: TOKEN_TYPE.OPENQUOTE });
            break;
        case 'close-quote':
            tokens.push({ type: TOKEN_TYPE.CLOSEQUOTE });
            break;
    }
};

var getQuote = function getQuote(style, isOpening, quoteDepth) {
    var quotes = style.quotes ? style.quotes.split(/\s+/) : ["'\"'", "'\"'"];
    var idx = quoteDepth * 2;
    if (idx >= quotes.length) {
        idx = quotes.length - 2;
    }
    if (!isOpening) {
        ++idx;
    }
    return quotes[idx].replace(/^["']|["']$/g, '');
};

var formatCounterValue = function formatCounterValue(counter, glue, format) {
    var len = counter.length;
    var result = '';

    for (var i = 0; i < len; i++) {
        if (i > 0) {
            result += glue || '';
        }
        result += (0, ListItem.createCounterText)(counter[i], (0, listStyle.parseListStyleType)(format || 'decimal'), false);
    }

    return result;
};
});

unwrapExports(PseudoNodeContent);
var PseudoNodeContent_1 = PseudoNodeContent.parseContent;
var PseudoNodeContent_2 = PseudoNodeContent.resolvePseudoContent;
var PseudoNodeContent_3 = PseudoNodeContent.popCounters;
var PseudoNodeContent_4 = PseudoNodeContent.parseCounterReset;
var PseudoNodeContent_5 = PseudoNodeContent.TOKEN_TYPE;
var PseudoNodeContent_6 = PseudoNodeContent.PSEUDO_CONTENT_ITEM_TYPE;

var Clone = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cloneWindow = exports.DocumentCloner = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();







var _ResourceLoader2 = _interopRequireDefault(ResourceLoader_1);







var _CanvasRenderer2 = _interopRequireDefault(CanvasRenderer_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IGNORE_ATTRIBUTE = 'data-html2canvas-ignore';

var DocumentCloner = exports.DocumentCloner = function () {
    function DocumentCloner(element, options, logger, copyInline, renderer) {
        _classCallCheck(this, DocumentCloner);

        this.referenceElement = element;
        this.scrolledElements = [];
        this.copyStyles = copyInline;
        this.inlineImages = copyInline;
        this.logger = logger;
        this.options = options;
        this.renderer = renderer;
        this.resourceLoader = new _ResourceLoader2.default(options, logger, window);
        this.pseudoContentData = {
            counters: {},
            quoteDepth: 0
        };
        // $FlowFixMe
        this.documentElement = this.cloneNode(element.ownerDocument.documentElement);
    }

    _createClass(DocumentCloner, [{
        key: 'inlineAllImages',
        value: function inlineAllImages(node) {
            var _this = this;

            if (this.inlineImages && node) {
                var style = node.style;
                Promise.all((0, background.parseBackgroundImage)(style.backgroundImage).map(function (backgroundImage) {
                    if (backgroundImage.method === 'url') {
                        return _this.resourceLoader.inlineImage(backgroundImage.args[0]).then(function (img) {
                            return img && typeof img.src === 'string' ? 'url("' + img.src + '")' : 'none';
                        }).catch(function (e) {
                            
                        });
                    }
                    return Promise.resolve('' + backgroundImage.prefix + backgroundImage.method + '(' + backgroundImage.args.join(',') + ')');
                })).then(function (backgroundImages) {
                    if (backgroundImages.length > 1) {
                        // TODO Multiple backgrounds somehow broken in Chrome
                        style.backgroundColor = '';
                    }
                    style.backgroundImage = backgroundImages.join(',');
                });

                if (node instanceof HTMLImageElement) {
                    this.resourceLoader.inlineImage(node.src).then(function (img) {
                        if (img && node instanceof HTMLImageElement && node.parentNode) {
                            var parentNode = node.parentNode;
                            var clonedChild = (0, Util.copyCSSStyles)(node.style, img.cloneNode(false));
                            parentNode.replaceChild(clonedChild, node);
                        }
                    }).catch(function (e) {
                        
                    });
                }
            }
        }
    }, {
        key: 'inlineFonts',
        value: function inlineFonts(document) {
            var _this2 = this;

            return Promise.all(Array.from(document.styleSheets).map(function (sheet) {
                if (sheet.href) {
                    return fetch(sheet.href).then(function (res) {
                        return res.text();
                    }).then(function (text) {
                        return createStyleSheetFontsFromText(text, sheet.href);
                    }).catch(function (e) {
                        return [];
                    });
                }
                return getSheetFonts(sheet, document);
            })).then(function (fonts) {
                return fonts.reduce(function (acc, font) {
                    return acc.concat(font);
                }, []);
            }).then(function (fonts) {
                return Promise.all(fonts.map(function (font) {
                    return fetch(font.formats[0].src).then(function (response) {
                        return response.blob();
                    }).then(function (blob) {
                        return new Promise(function (resolve, reject) {
                            var reader = new FileReader();
                            reader.onerror = reject;
                            reader.onload = function () {
                                // $FlowFixMe
                                var result = reader.result;
                                resolve(result);
                            };
                            reader.readAsDataURL(blob);
                        });
                    }).then(function (dataUri) {
                        font.fontFace.setProperty('src', 'url("' + dataUri + '")');
                        return '@font-face {' + font.fontFace.cssText + ' ';
                    });
                }));
            }).then(function (fontCss) {
                var style = document.createElement('style');
                style.textContent = fontCss.join('\n');
                _this2.documentElement.appendChild(style);
            });
        }
    }, {
        key: 'createElementClone',
        value: function createElementClone(node) {
            var _this3 = this;

            if (this.copyStyles && node instanceof HTMLCanvasElement) {
                var img = node.ownerDocument.createElement('img');
                try {
                    img.src = node.toDataURL();
                    return img;
                } catch (e) {
                    
                }
            }

            if (node instanceof HTMLIFrameElement) {
                var tempIframe = node.cloneNode(false);
                var iframeKey = generateIframeKey();
                tempIframe.setAttribute('data-html2canvas-internal-iframe-key', iframeKey);

                var _parseBounds = (0, Bounds_1.parseBounds)(node, 0, 0),
                    width = _parseBounds.width,
                    height = _parseBounds.height;

                this.resourceLoader.cache[iframeKey] = getIframeDocumentElement(node, this.options).then(function (documentElement) {
                    return _this3.renderer(documentElement, {
                        async: _this3.options.async,
                        allowTaint: _this3.options.allowTaint,
                        backgroundColor: '#ffffff',
                        canvas: null,
                        imageTimeout: _this3.options.imageTimeout,
                        logging: _this3.options.logging,
                        proxy: _this3.options.proxy,
                        removeContainer: _this3.options.removeContainer,
                        scale: _this3.options.scale,
                        foreignObjectRendering: _this3.options.foreignObjectRendering,
                        useCORS: _this3.options.useCORS,
                        target: new _CanvasRenderer2.default(),
                        width: width,
                        height: height,
                        x: 0,
                        y: 0,
                        windowWidth: documentElement.ownerDocument.defaultView.innerWidth,
                        windowHeight: documentElement.ownerDocument.defaultView.innerHeight,
                        scrollX: documentElement.ownerDocument.defaultView.pageXOffset,
                        scrollY: documentElement.ownerDocument.defaultView.pageYOffset
                    }, _this3.logger.child(iframeKey));
                }).then(function (canvas) {
                    return new Promise(function (resolve, reject) {
                        var iframeCanvas = document.createElement('img');
                        iframeCanvas.onload = function () {
                            return resolve(canvas);
                        };
                        iframeCanvas.onerror = reject;
                        iframeCanvas.src = canvas.toDataURL();
                        if (tempIframe.parentNode) {
                            tempIframe.parentNode.replaceChild((0, Util.copyCSSStyles)(node.ownerDocument.defaultView.getComputedStyle(node), iframeCanvas), tempIframe);
                        }
                    });
                });
                return tempIframe;
            }

            if (node instanceof HTMLStyleElement && node.sheet && node.sheet.cssRules) {
                var css = [].slice.call(node.sheet.cssRules, 0).reduce(function (css, rule) {
                    try {
                        if (rule && rule.cssText) {
                            return css + rule.cssText;
                        }
                        return css;
                    } catch (err) {
                        _this3.logger.log('Unable to access cssText property', rule.name);
                        return css;
                    }
                }, '');
                var style = node.cloneNode(false);
                style.textContent = css;
                return style;
            }

            return node.cloneNode(false);
        }
    }, {
        key: 'cloneNode',
        value: function cloneNode(node) {
            var clone = node.nodeType === Node.TEXT_NODE ? document.createTextNode(node.nodeValue) : this.createElementClone(node);

            var window = node.ownerDocument.defaultView;
            var style = node instanceof window.HTMLElement ? window.getComputedStyle(node) : null;
            var styleBefore = node instanceof window.HTMLElement ? window.getComputedStyle(node, ':before') : null;
            var styleAfter = node instanceof window.HTMLElement ? window.getComputedStyle(node, ':after') : null;

            if (this.referenceElement === node && clone instanceof window.HTMLElement) {
                this.clonedReferenceElement = clone;
            }

            if (clone instanceof window.HTMLBodyElement) {
                createPseudoHideStyles(clone);
            }

            var counters = (0, PseudoNodeContent.parseCounterReset)(style, this.pseudoContentData);
            var contentBefore = (0, PseudoNodeContent.resolvePseudoContent)(node, styleBefore, this.pseudoContentData);

            for (var child = node.firstChild; child; child = child.nextSibling) {
                if (child.nodeType !== Node.ELEMENT_NODE || child.nodeName !== 'SCRIPT' &&
                // $FlowFixMe
                !child.hasAttribute(IGNORE_ATTRIBUTE) && (typeof this.options.ignoreElements !== 'function' ||
                // $FlowFixMe
                !this.options.ignoreElements(child))) {
                    if (!this.copyStyles || child.nodeName !== 'STYLE') {
                        clone.appendChild(this.cloneNode(child));
                    }
                }
            }

            var contentAfter = (0, PseudoNodeContent.resolvePseudoContent)(node, styleAfter, this.pseudoContentData);
            (0, PseudoNodeContent.popCounters)(counters, this.pseudoContentData);

            if (node instanceof window.HTMLElement && clone instanceof window.HTMLElement) {
                if (styleBefore) {
                    this.inlineAllImages(inlinePseudoElement(node, clone, styleBefore, contentBefore, PSEUDO_BEFORE));
                }
                if (styleAfter) {
                    this.inlineAllImages(inlinePseudoElement(node, clone, styleAfter, contentAfter, PSEUDO_AFTER));
                }
                if (style && this.copyStyles && !(node instanceof HTMLIFrameElement)) {
                    (0, Util.copyCSSStyles)(style, clone);
                }
                this.inlineAllImages(clone);
                if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
                    this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
                }
                switch (node.nodeName) {
                    case 'CANVAS':
                        if (!this.copyStyles) {
                            cloneCanvasContents(node, clone);
                        }
                        break;
                    case 'TEXTAREA':
                    case 'SELECT':
                        clone.value = node.value;
                        break;
                }
            }
            return clone;
        }
    }]);

    return DocumentCloner;
}();

var getSheetFonts = function getSheetFonts(sheet, document) {
    // $FlowFixMe
    return (sheet.cssRules ? Array.from(sheet.cssRules) : []).filter(function (rule) {
        return rule.type === CSSRule.FONT_FACE_RULE;
    }).map(function (rule) {
        var src = (0, background.parseBackgroundImage)(rule.style.getPropertyValue('src'));
        var formats = [];
        for (var i = 0; i < src.length; i++) {
            if (src[i].method === 'url' && src[i + 1] && src[i + 1].method === 'format') {
                var a = document.createElement('a');
                a.href = src[i].args[0];
                if (document.body) {
                    document.body.appendChild(a);
                }

                var font = {
                    src: a.href,
                    format: src[i + 1].args[0]
                };
                formats.push(font);
            }
        }

        return {
            // TODO select correct format for browser),

            formats: formats.filter(function (font) {
                return (/^woff/i.test(font.format)
                );
            }),
            fontFace: rule.style
        };
    }).filter(function (font) {
        return font.formats.length;
    });
};

var createStyleSheetFontsFromText = function createStyleSheetFontsFromText(text, baseHref) {
    var doc = document.implementation.createHTMLDocument('');
    var base = document.createElement('base');
    // $FlowFixMe
    base.href = baseHref;
    var style = document.createElement('style');

    style.textContent = text;
    if (doc.head) {
        doc.head.appendChild(base);
    }
    if (doc.body) {
        doc.body.appendChild(style);
    }

    return style.sheet ? getSheetFonts(style.sheet, doc) : [];
};

var restoreOwnerScroll = function restoreOwnerScroll(ownerDocument, x, y) {
    if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
        ownerDocument.defaultView.scrollTo(x, y);
    }
};

var cloneCanvasContents = function cloneCanvasContents(canvas, clonedCanvas) {
    try {
        if (clonedCanvas) {
            clonedCanvas.width = canvas.width;
            clonedCanvas.height = canvas.height;
            var ctx = canvas.getContext('2d');
            var clonedCtx = clonedCanvas.getContext('2d');
            if (ctx) {
                clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
            } else {
                clonedCtx.drawImage(canvas, 0, 0);
            }
        }
    } catch (e) {}
};

var inlinePseudoElement = function inlinePseudoElement(node, clone, style, contentItems, pseudoElt) {
    if (!style || !style.content || style.content === 'none' || style.content === '-moz-alt-content' || style.display === 'none') {
        return;
    }

    var anonymousReplacedElement = clone.ownerDocument.createElement('html2canvaspseudoelement');
    (0, Util.copyCSSStyles)(style, anonymousReplacedElement);

    if (contentItems) {
        var len = contentItems.length;
        for (var i = 0; i < len; i++) {
            var item = contentItems[i];
            switch (item.type) {
                case PseudoNodeContent.PSEUDO_CONTENT_ITEM_TYPE.IMAGE:
                    var img = clone.ownerDocument.createElement('img');
                    img.src = (0, background.parseBackgroundImage)('url(' + item.value + ')')[0].args[0];
                    img.style.opacity = '1';
                    anonymousReplacedElement.appendChild(img);
                    break;
                case PseudoNodeContent.PSEUDO_CONTENT_ITEM_TYPE.TEXT:
                    anonymousReplacedElement.appendChild(clone.ownerDocument.createTextNode(item.value));
                    break;
            }
        }
    }

    anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ' ' + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
    clone.className += pseudoElt === PSEUDO_BEFORE ? ' ' + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE : ' ' + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
    if (pseudoElt === PSEUDO_BEFORE) {
        clone.insertBefore(anonymousReplacedElement, clone.firstChild);
    } else {
        clone.appendChild(anonymousReplacedElement);
    }

    return anonymousReplacedElement;
};

var PSEUDO_BEFORE = ':before';
var PSEUDO_AFTER = ':after';
var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = '___html2canvas___pseudoelement_before';
var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = '___html2canvas___pseudoelement_after';

var PSEUDO_HIDE_ELEMENT_STYLE = '{\n    content: "" !important;\n    display: none !important;\n}';

var createPseudoHideStyles = function createPseudoHideStyles(body) {
    createStyles(body, '.' + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + '\n         .' + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
};

var createStyles = function createStyles(body, styles) {
    var style = body.ownerDocument.createElement('style');
    style.innerHTML = styles;
    body.appendChild(style);
};

var initNode = function initNode(_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        element = _ref2[0],
        x = _ref2[1],
        y = _ref2[2];

    element.scrollLeft = x;
    element.scrollTop = y;
};

var generateIframeKey = function generateIframeKey() {
    return Math.ceil(Date.now() + Math.random() * 10000000).toString(16);
};

var DATA_URI_REGEXP = /^data:text\/(.+);(base64)?,(.*)$/i;

var getIframeDocumentElement = function getIframeDocumentElement(node, options) {
    try {
        return Promise.resolve(node.contentWindow.document.documentElement);
    } catch (e) {
        return options.proxy ? (0, _Proxy.Proxy)(node.src, options).then(function (html) {
            var match = html.match(DATA_URI_REGEXP);
            if (!match) {
                return Promise.reject();
            }

            return match[2] === 'base64' ? window.atob(decodeURIComponent(match[3])) : decodeURIComponent(match[3]);
        }).then(function (html) {
            return createIframeContainer(node.ownerDocument, (0, Bounds_1.parseBounds)(node, 0, 0)).then(function (cloneIframeContainer) {
                var cloneWindow = cloneIframeContainer.contentWindow;
                var documentClone = cloneWindow.document;

                documentClone.open();
                documentClone.write(html);
                var iframeLoad = iframeLoader(cloneIframeContainer).then(function () {
                    return documentClone.documentElement;
                });

                documentClone.close();
                return iframeLoad;
            });
        }) : Promise.reject();
    }
};

var createIframeContainer = function createIframeContainer(ownerDocument, bounds) {
    var cloneIframeContainer = ownerDocument.createElement('iframe');

    cloneIframeContainer.className = 'html2canvas-container';
    cloneIframeContainer.style.visibility = 'hidden';
    cloneIframeContainer.style.position = 'fixed';
    cloneIframeContainer.style.left = '-10000px';
    cloneIframeContainer.style.top = '0px';
    cloneIframeContainer.style.border = '0';
    cloneIframeContainer.width = bounds.width.toString();
    cloneIframeContainer.height = bounds.height.toString();
    cloneIframeContainer.scrolling = 'no'; // ios won't scroll without it
    cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, 'true');
    if (!ownerDocument.body) {
        return Promise.reject('');
    }

    ownerDocument.body.appendChild(cloneIframeContainer);

    return Promise.resolve(cloneIframeContainer);
};

var iframeLoader = function iframeLoader(cloneIframeContainer) {
    var cloneWindow = cloneIframeContainer.contentWindow;
    var documentClone = cloneWindow.document;

    return new Promise(function (resolve, reject) {
        cloneWindow.onload = cloneIframeContainer.onload = documentClone.onreadystatechange = function () {
            var interval = setInterval(function () {
                if (documentClone.body.childNodes.length > 0 && documentClone.readyState === 'complete') {
                    clearInterval(interval);
                    resolve(cloneIframeContainer);
                }
            }, 50);
        };
    });
};

var cloneWindow = exports.cloneWindow = function cloneWindow(ownerDocument, bounds, referenceElement, options, logger, renderer) {
    var cloner = new DocumentCloner(referenceElement, options, logger, false, renderer);
    var scrollX = ownerDocument.defaultView.pageXOffset;
    var scrollY = ownerDocument.defaultView.pageYOffset;

    return createIframeContainer(ownerDocument, bounds).then(function (cloneIframeContainer) {
        var cloneWindow = cloneIframeContainer.contentWindow;
        var documentClone = cloneWindow.document;

        /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
             if window url is about:blank, we can assign the url to current by writing onto the document
             */

        var iframeLoad = iframeLoader(cloneIframeContainer).then(function () {
            cloner.scrolledElements.forEach(initNode);
            cloneWindow.scrollTo(bounds.left, bounds.top);
            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (cloneWindow.scrollY !== bounds.top || cloneWindow.scrollX !== bounds.left)) {
                documentClone.documentElement.style.top = -bounds.top + 'px';
                documentClone.documentElement.style.left = -bounds.left + 'px';
                documentClone.documentElement.style.position = 'absolute';
            }

            var result = Promise.resolve([cloneIframeContainer, cloner.clonedReferenceElement, cloner.resourceLoader]);

            var onclone = options.onclone;

            return cloner.clonedReferenceElement instanceof cloneWindow.HTMLElement || cloner.clonedReferenceElement instanceof ownerDocument.defaultView.HTMLElement || cloner.clonedReferenceElement instanceof HTMLElement ? typeof onclone === 'function' ? Promise.resolve().then(function () {
                return onclone(documentClone);
            }).then(function () {
                return result;
            }) : result : Promise.reject('');
        });

        documentClone.open();
        documentClone.write(serializeDoctype(document.doctype) + '<html></html>');
        // Chrome scrolls the parent document for some reason after the write to the cloned window???
        restoreOwnerScroll(referenceElement.ownerDocument, scrollX, scrollY);
        documentClone.replaceChild(documentClone.adoptNode(cloner.documentElement), documentClone.documentElement);
        documentClone.close();

        return iframeLoad;
    });
};

var serializeDoctype = function serializeDoctype(doctype) {
    var str = '';
    if (doctype) {
        str += '<!DOCTYPE ';
        if (doctype.name) {
            str += doctype.name;
        }

        if (doctype.internalSubset) {
            str += doctype.internalSubset;
        }

        if (doctype.publicId) {
            str += '"' + doctype.publicId + '"';
        }

        if (doctype.systemId) {
            str += '"' + doctype.systemId + '"';
        }

        str += '>';
    }

    return str;
};
});

unwrapExports(Clone);
var Clone_1 = Clone.cloneWindow;
var Clone_2 = Clone.DocumentCloner;

var Window = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderElement = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var _Logger2 = _interopRequireDefault(Logger_1);





var _Renderer2 = _interopRequireDefault(Renderer_1);



var _ForeignObjectRenderer2 = _interopRequireDefault(ForeignObjectRenderer_1);



var _Feature2 = _interopRequireDefault(Feature);









var _Color2 = _interopRequireDefault(Color_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderElement = exports.renderElement = function renderElement(element, options, logger) {
    var ownerDocument = element.ownerDocument;

    var windowBounds = new Bounds_1.Bounds(options.scrollX, options.scrollY, options.windowWidth, options.windowHeight);

    // http://www.w3.org/TR/css3-background/#special-backgrounds
    var documentBackgroundColor = ownerDocument.documentElement ? new _Color2.default(getComputedStyle(ownerDocument.documentElement).backgroundColor) : Color_1.TRANSPARENT;
    var bodyBackgroundColor = ownerDocument.body ? new _Color2.default(getComputedStyle(ownerDocument.body).backgroundColor) : Color_1.TRANSPARENT;

    var backgroundColor = element === ownerDocument.documentElement ? documentBackgroundColor.isTransparent() ? bodyBackgroundColor.isTransparent() ? options.backgroundColor ? new _Color2.default(options.backgroundColor) : null : bodyBackgroundColor : documentBackgroundColor : options.backgroundColor ? new _Color2.default(options.backgroundColor) : null;

    return (options.foreignObjectRendering ? // $FlowFixMe
    _Feature2.default.SUPPORT_FOREIGNOBJECT_DRAWING : Promise.resolve(false)).then(function (supportForeignObject) {
        return supportForeignObject ? function (cloner) {
            return cloner.inlineFonts(ownerDocument).then(function () {
                return cloner.resourceLoader.ready();
            }).then(function () {
                var renderer = new _ForeignObjectRenderer2.default(cloner.documentElement);

                var defaultView = ownerDocument.defaultView;
                var scrollX = defaultView.pageXOffset;
                var scrollY = defaultView.pageYOffset;

                var isDocument = element.tagName === 'HTML' || element.tagName === 'BODY';

                var _ref = isDocument ? (0, Bounds_1.parseDocumentSize)(ownerDocument) : (0, Bounds_1.parseBounds)(element, scrollX, scrollY),
                    width = _ref.width,
                    height = _ref.height,
                    left = _ref.left,
                    top = _ref.top;

                return renderer.render({
                    backgroundColor: backgroundColor,
                    logger: logger,
                    scale: options.scale,
                    x: typeof options.x === 'number' ? options.x : left,
                    y: typeof options.y === 'number' ? options.y : top,
                    width: typeof options.width === 'number' ? options.width : Math.ceil(width),
                    height: typeof options.height === 'number' ? options.height : Math.ceil(height),
                    windowWidth: options.windowWidth,
                    windowHeight: options.windowHeight,
                    scrollX: options.scrollX,
                    scrollY: options.scrollY
                });
            });
        }(new Clone.DocumentCloner(element, options, logger, true, renderElement)) : (0, Clone.cloneWindow)(ownerDocument, windowBounds, element, options, logger, renderElement).then(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 3),
                container = _ref3[0],
                clonedElement = _ref3[1],
                resourceLoader = _ref3[2];

            var stack = (0, NodeParser_1.NodeParser)(clonedElement, resourceLoader, logger);
            var clonedDocument = clonedElement.ownerDocument;

            if (backgroundColor === stack.container.style.background.backgroundColor) {
                stack.container.style.background.backgroundColor = Color_1.TRANSPARENT;
            }

            return resourceLoader.ready().then(function (imageStore) {
                var fontMetrics = new Font.FontMetrics(clonedDocument);
                var defaultView = clonedDocument.defaultView;
                var scrollX = defaultView.pageXOffset;
                var scrollY = defaultView.pageYOffset;

                var isDocument = clonedElement.tagName === 'HTML' || clonedElement.tagName === 'BODY';

                var _ref4 = isDocument ? (0, Bounds_1.parseDocumentSize)(ownerDocument) : (0, Bounds_1.parseBounds)(clonedElement, scrollX, scrollY),
                    width = _ref4.width,
                    height = _ref4.height,
                    left = _ref4.left,
                    top = _ref4.top;

                var renderOptions = {
                    backgroundColor: backgroundColor,
                    fontMetrics: fontMetrics,
                    imageStore: imageStore,
                    logger: logger,
                    scale: options.scale,
                    x: typeof options.x === 'number' ? options.x : left,
                    y: typeof options.y === 'number' ? options.y : top,
                    width: typeof options.width === 'number' ? options.width : Math.ceil(width),
                    height: typeof options.height === 'number' ? options.height : Math.ceil(height)
                };

                if (Array.isArray(options.target)) {
                    return Promise.all(options.target.map(function (target) {
                        var renderer = new _Renderer2.default(target, renderOptions);
                        return renderer.render(stack);
                    }));
                } else {
                    var renderer = new _Renderer2.default(options.target, renderOptions);
                    var canvas = renderer.render(stack);
                    if (options.removeContainer === true) {
                        if (container.parentNode) {
                            container.parentNode.removeChild(container);
                        } else {}
                    }

                    return canvas;
                }
            });
        });
    });
};
});

unwrapExports(Window);
var Window_1 = Window.renderElement;

var npm = createCommonjsModule(function (module) {
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _CanvasRenderer2 = _interopRequireDefault(CanvasRenderer_1);



var _Logger2 = _interopRequireDefault(Logger_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html2canvas = function html2canvas(element, conf) {
    var config = conf || {};
    var logger = new _Logger2.default(typeof config.logging === 'boolean' ? config.logging : true);
    logger.log('html2canvas ' + "$npm_package_version");

    var ownerDocument = element.ownerDocument;
    if (!ownerDocument) {
        return Promise.reject('Provided element is not within a Document');
    }
    var defaultView = ownerDocument.defaultView;

    var defaultOptions = {
        async: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        imageTimeout: 15000,
        logging: true,
        proxy: null,
        removeContainer: true,
        foreignObjectRendering: false,
        scale: defaultView.devicePixelRatio || 1,
        target: new _CanvasRenderer2.default(config.canvas),
        useCORS: false,
        windowWidth: defaultView.innerWidth,
        windowHeight: defaultView.innerHeight,
        scrollX: defaultView.pageXOffset,
        scrollY: defaultView.pageYOffset
    };

    var result = (0, Window.renderElement)(element, _extends({}, defaultOptions, config), logger);

    return result;
};

html2canvas.CanvasRenderer = _CanvasRenderer2.default;

module.exports = html2canvas;
});

var html2canvas$1 = unwrapExports(npm);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

// Determine the type of a variable/object.
var objType = function objType(obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  if (type === 'undefined') return 'undefined';else if (type === 'string' || obj instanceof String) return 'string';else if (type === 'number' || obj instanceof Number) return 'number';else if (type === 'function' || obj instanceof Function) return 'function';else if (!!obj && obj.constructor === Array) return 'array';else if (obj && obj.nodeType === 1) return 'element';else if (type === 'object') return 'object';else return 'unknown';
};

// Create an HTML element with optional className, innerHTML, and style.
var createElement = function createElement(tagName, opt) {
  var el = document.createElement(tagName);
  if (opt.className) el.className = opt.className;
  if (opt.innerHTML) {
    el.innerHTML = opt.innerHTML;
    var scripts = el.getElementsByTagName('script');
    for (var i = scripts.length; i-- > 0; null) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
  }
  for (var key in opt.style) {
    el.style[key] = opt.style[key];
  }
  return el;
};

// Deep-clone a node and preserve contents/properties.
var cloneNode = function cloneNode(node, javascriptEnabled) {
  // Recursively clone the node.
  var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);
  for (var child = node.firstChild; child; child = child.nextSibling) {
    if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
      clone.appendChild(cloneNode(child, javascriptEnabled));
    }
  }

  if (node.nodeType === 1) {
    // Preserve contents/properties of special nodes.
    if (node.nodeName === 'CANVAS') {
      clone.width = node.width;
      clone.height = node.height;
      clone.getContext('2d').drawImage(node, 0, 0);
    } else if (node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT') {
      clone.value = node.value;
    }

    // Preserve the node's scroll position when it loads.
    clone.addEventListener('load', function () {
      clone.scrollTop = node.scrollTop;
      clone.scrollLeft = node.scrollLeft;
    }, true);
  }

  // Return the cloned node.
  return clone;
};

// Convert units using the conversion value 'k' from jsPDF.
var unitConvert = function unitConvert(obj, k) {
  var newObj = {};
  for (var key in obj) {
    newObj[key] = obj[key] * 72 / 96 / k;
  }
  return newObj;
};

/* ----- CONSTRUCTOR ----- */

var Worker = function Worker(opt) {
  // Create the root parent for the proto chain, and the starting Worker.
  var root = _extends(Worker.convert(Promise.resolve()), JSON.parse(JSON.stringify(Worker.template)));
  var self = Worker.convert(Promise.resolve(), root);

  // Set progress, optional settings, and return.
  self = self.setProgress(1, Worker, 1, [Worker]);
  self = self.set(opt);
  return self;
};

// Boilerplate for subclassing Promise.
Worker.prototype = Object.create(Promise.prototype);
Worker.prototype.constructor = Worker;

// Converts/casts promises into Workers.
Worker.convert = function convert(promise, inherit) {
  // Uses prototypal inheritance to receive changes made to ancestors' properties.
  promise.__proto__ = inherit || Worker.prototype;
  return promise;
};

Worker.template = {
  prop: {
    src: null,
    container: null,
    overlay: null,
    canvas: null,
    img: null,
    pdf: null,
    pageSize: null
  },
  progress: {
    val: 0,
    state: null,
    n: 0,
    stack: []
  },
  opt: {
    filename: 'file.pdf',
    margin: [0, 0, 0, 0],
    image: { type: 'jpeg', quality: 0.95 },
    enableLinks: true,
    html2canvas: {},
    jsPDF: {}
  }
};

/* ----- FROM / TO ----- */

Worker.prototype.from = function from(src, type) {
  function getType(src) {
    switch (objType(src)) {
      case 'string':
        return 'string';
      case 'element':
        return src.nodeName.toLowerCase === 'canvas' ? 'canvas' : 'element';
      default:
        return 'unknown';
    }
  }

  return this.then(function from_main() {
    type = type || getType(src);
    switch (type) {
      case 'string':
        return this.set({ src: createElement('div', { innerHTML: src }) });
      case 'element':
        return this.set({ src: src });
      case 'canvas':
        return this.set({ canvas: src });
      case 'img':
        return this.set({ img: src });
      default:
        return this.error('Unknown source type.');
    }
  });
};

Worker.prototype.to = function to(target) {
  // Route the 'to' request to the appropriate method.
  switch (target) {
    case 'container':
      return this.toContainer();
    case 'canvas':
      return this.toCanvas();
    case 'img':
      return this.toImg();
    case 'pdf':
      return this.toPdf();
    default:
      return this.error('Invalid target.');
  }
};

Worker.prototype.toContainer = function toContainer() {
  // Set up function prerequisites.
  var prereqs = [function checkSrc() {
    return this.prop.src || this.error('Cannot duplicate - no source HTML.');
  }, function checkPageSize() {
    return this.prop.pageSize || this.setPageSize();
  }];

  return this.thenList(prereqs).then(function toContainer_main() {
    // Define the CSS styles for the container and its overlay parent.
    var overlayCSS = {
      position: 'fixed', overflow: 'hidden', zIndex: 1000,
      left: 0, right: 0, bottom: 0, top: 0,
      backgroundColor: 'rgba(0,0,0,0.8)'
    };
    var containerCSS = {
      position: 'absolute', width: this.prop.pageSize.inner.width + this.prop.pageSize.unit,
      left: 0, right: 0, top: 0, height: 'auto', margin: 'auto',
      backgroundColor: 'white'
    };

    // Set the overlay to hidden (could be changed in the future to provide a print preview).
    overlayCSS.opacity = 0;

    // Create and attach the elements.
    var source = cloneNode(this.prop.src, this.opt.html2canvas.javascriptEnabled);
    this.prop.overlay = createElement('div', { className: 'html2pdf__overlay', style: overlayCSS });
    this.prop.container = createElement('div', { className: 'html2pdf__container', style: containerCSS });
    this.prop.container.appendChild(source);
    this.prop.overlay.appendChild(this.prop.container);
    document.body.appendChild(this.prop.overlay);
  });
};

Worker.prototype.toCanvas = function toCanvas() {
  // Set up function prerequisites.
  var prereqs = [function checkContainer() {
    return document.body.contains(this.prop.container) || this.toContainer();
  }];

  // Fulfill prereqs then create the canvas.
  return this.thenList(prereqs).then(function toCanvas_main() {
    // Handle old-fashioned 'onrendered' argument.
    var options = _extends({}, this.opt.html2canvas);
    delete options.onrendered;

    return html2canvas$1(this.prop.container, options);
  }).then(function toCanvas_post(canvas) {
    // Handle old-fashioned 'onrendered' argument.
    var onRendered = this.opt.html2canvas.onrendered || function () {};
    onRendered(canvas);

    this.prop.canvas = canvas;
    document.body.removeChild(this.prop.overlay);
  });
};

Worker.prototype.toImg = function toImg() {
  // Set up function prerequisites.
  var prereqs = [function checkCanvas() {
    return this.prop.canvas || this.toCanvas();
  }];

  // Fulfill prereqs then create the image.
  return this.thenList(prereqs).then(function toImg_main() {
    var imgData = this.prop.canvas.toDataURL('image/' + this.opt.image.type, this.opt.image.quality);
    this.prop.img = document.createElement('img');
    this.prop.img.src = imgData;
  });
};

Worker.prototype.toPdf = function toPdf() {
  // Set up function prerequisites.
  var prereqs = [function checkCanvas() {
    return this.prop.canvas || this.toCanvas();
  }];

  // Fulfill prereqs then create the image.
  return this.thenList(prereqs).then(function toPdf_main() {
    // Create local copies of frequently used properties.
    var canvas = this.prop.canvas;
    var opt = this.opt;

    // Calculate the number of pages.
    var ctx = canvas.getContext('2d');
    var pxFullHeight = canvas.height;
    var pxPageHeight = Math.floor(canvas.width * this.prop.pageSize.inner.ratio);
    var nPages = Math.ceil(pxFullHeight / pxPageHeight);

    // Define pageHeight separately so it can be trimmed on the final page.
    var pageHeight = this.prop.pageSize.inner.height;

    // Create a one-page canvas to split up the full image.
    var pageCanvas = document.createElement('canvas');
    var pageCtx = pageCanvas.getContext('2d');
    pageCanvas.width = canvas.width;
    pageCanvas.height = pxPageHeight;

    // Initialize the PDF.
    this.prop.pdf = this.prop.pdf || new jspdf_min(opt.jsPDF);

    for (var page = 0; page < nPages; page++) {
      // Trim the final page to reduce file size.
      if (page === nPages - 1) {
        pageCanvas.height = pxFullHeight % pxPageHeight;
        pageHeight = pageCanvas.height * this.prop.pageSize.inner.width / pageCanvas.width;
      }

      // Display the page.
      var w = pageCanvas.width;
      var h = pageCanvas.height;
      pageCtx.fillStyle = 'white';
      pageCtx.fillRect(0, 0, w, h);
      pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

      // Add the page to the PDF.
      if (page) this.prop.pdf.addPage();
      var imgData = pageCanvas.toDataURL('image/' + opt.image.type, opt.image.quality);
      this.prop.pdf.addImage(imgData, opt.image.type, opt.margin[1], opt.margin[0], this.prop.pageSize.inner.width, pageHeight);
    }
  });
};

/* ----- OUTPUT / SAVE ----- */

Worker.prototype.output = function output(type, options, src) {
  // Redirect requests to the correct function (outputPdf / outputImg).
  src = src || 'pdf';
  if (src.toLowerCase() === 'img' || src.toLowerCase() === 'image') {
    return this.outputImg(type, options);
  } else {
    return this.outputPdf(type, options);
  }
};

Worker.prototype.outputPdf = function outputPdf(type, options) {
  // Set up function prerequisites.
  var prereqs = [function checkPdf() {
    return this.prop.pdf || this.toPdf();
  }];

  // Fulfill prereqs then perform the appropriate output.
  return this.thenList(prereqs).then(function outputPdf_main() {
    /* Currently implemented output types:
     *    https://rawgit.com/MrRio/jsPDF/master/docs/jspdf.js.html#line992
     *  save(options), arraybuffer, blob, bloburi/bloburl,
     *  datauristring/dataurlstring, dataurlnewwindow, datauri/dataurl
     */
    return this.prop.pdf.output(type, options);
  });
};

Worker.prototype.outputImg = function outputImg(type, options) {
  // Set up function prerequisites.
  var prereqs = [function checkImg() {
    return this.prop.img || this.toImg();
  }];

  // Fulfill prereqs then perform the appropriate output.
  return this.thenList(prereqs).then(function outputImg_main() {
    switch (type) {
      case undefined:
      case 'img':
        return this.prop.img;
      case 'datauristring':
      case 'dataurlstring':
        return this.prop.img.src;
      case 'datauri':
      case 'dataurl':
        return document.location.href = this.prop.img.src;
      default:
        throw 'Image output type "' + type + '" is not supported.';
    }
  });
};

Worker.prototype.save = function save(filename) {
  // Set up function prerequisites.
  var prereqs = [function checkPdf() {
    return this.prop.pdf || this.toPdf();
  }];

  // Fulfill prereqs, update the filename (if provided), and save the PDF.
  return this.thenList(prereqs).set(filename ? { filename: filename } : null).then(function save_main() {
    this.prop.pdf.save(this.opt.filename);
  });
};

/* ----- SET / GET ----- */

Worker.prototype.set = function set$$1(opt) {
  // TODO: Implement ordered pairs?

  // Silently ignore invalid or empty input.
  if (objType(opt) !== 'object') {
    return this;
  }

  // Build an array of setter functions to queue.
  var fns = Object.keys(opt || {}).map(function (key) {
    if (key in Worker.template.prop) {
      // Set pre-defined properties.
      return function set_prop() {
        this.prop[key] = opt[key];
      };
    } else {
      switch (key) {
        case 'margin':
          return this.setMargin.bind(this, opt.margin);
        case 'jsPDF':
          return function set_jsPDF() {
            this.opt.jsPDF = opt.jsPDF;return this.setPageSize();
          };
        case 'pageSize':
          return this.setPageSize.bind(this, opt.pageSize);
        default:
          // Set any other properties in opt.
          return function set_opt() {
            this.opt[key] = opt[key];
          };
      }
    }
  }, this);

  // Set properties within the promise chain.
  return this.then(function set_main() {
    return this.thenList(fns);
  });
};

Worker.prototype.get = function get$$1(key, cbk) {
  return this.then(function get_main() {
    // Fetch the requested property, either as a predefined prop or in opt.
    var val = key in Worker.template.prop ? this.prop[key] : this.opt[key];
    return cbk ? cbk(val) : val;
  });
};

Worker.prototype.setMargin = function setMargin(margin) {
  return this.then(function setMargin_main() {
    // Parse the margin property.
    switch (objType(margin)) {
      case 'number':
        margin = [margin, margin, margin, margin];
      case 'array':
        if (margin.length === 2) {
          margin = [margin[0], margin[1], margin[0], margin[1]];
        }
        if (margin.length === 4) {
          break;
        }
      default:
        return this.error('Invalid margin array.');
    }

    // Set the margin property, then update pageSize.
    this.opt.margin = margin;
  }).then(this.setPageSize);
};

Worker.prototype.setPageSize = function setPageSize(pageSize) {
  function toPx(val, k) {
    return Math.floor(val * k / 72 * 96);
  }

  return this.then(function setPageSize_main() {
    // Retrieve page-size based on jsPDF settings, if not explicitly provided.
    pageSize = pageSize || jspdf_min.getPageSize(this.opt.jsPDF);

    // Add 'inner' field if not present.
    if (!pageSize.hasOwnProperty('inner')) {
      pageSize.inner = {
        width: pageSize.width - this.opt.margin[1] - this.opt.margin[3],
        height: pageSize.height - this.opt.margin[0] - this.opt.margin[2]
      };
      pageSize.inner.px = {
        width: toPx(pageSize.inner.width, pageSize.k),
        height: toPx(pageSize.inner.height, pageSize.k)
      };
      pageSize.inner.ratio = pageSize.inner.height / pageSize.inner.width;
    }

    // Attach pageSize to this.
    this.prop.pageSize = pageSize;
  });
};

Worker.prototype.setProgress = function setProgress(val, state, n, stack) {
  // Immediately update all progress values.
  if (val != null) this.progress.val = val;
  if (state != null) this.progress.state = state;
  if (n != null) this.progress.n = n;
  if (stack != null) this.progress.stack = stack;
  this.progress.ratio = this.progress.val / this.progress.state;

  // Return this for command chaining.
  return this;
};

Worker.prototype.updateProgress = function updateProgress(val, state, n, stack) {
  // Immediately update all progress values, using setProgress.
  return this.setProgress(val ? this.progress.val + val : null, state ? state : null, n ? this.progress.n + n : null, stack ? this.progress.stack.concat(stack) : null);
};

/* ----- PROMISE MAPPING ----- */

Worker.prototype.then = function then(onFulfilled, onRejected) {
  // Wrap `this` for encapsulation.
  var self = this;

  return this.thenCore(onFulfilled, onRejected, function then_main(onFulfilled, onRejected) {
    // Update progress while queuing, calling, and resolving `then`.
    self.updateProgress(null, null, 1, [onFulfilled]);
    return Promise.prototype.then.call(this, function then_pre(val) {
      self.updateProgress(null, onFulfilled);
      return val;
    }).then(onFulfilled, onRejected).then(function then_post(val) {
      self.updateProgress(1);
      return val;
    });
  });
};

Worker.prototype.thenCore = function thenCore(onFulfilled, onRejected, thenBase) {
  // Handle optional thenBase parameter.
  thenBase = thenBase || Promise.prototype.then;

  // Wrap `this` for encapsulation and bind it to the promise handlers.
  var self = this;
  if (onFulfilled) {
    onFulfilled = onFulfilled.bind(self);
  }
  if (onRejected) {
    onRejected = onRejected.bind(self);
  }

  // Cast self into a Promise to avoid polyfills recursively defining `then`.
  var isNative = Promise.toString().indexOf('[native code]') !== -1 && Promise.name === 'Promise';
  var selfPromise = isNative ? self : Worker.convert(_extends({}, self), Promise.prototype);

  // Return the promise, after casting it into a Worker and preserving props.
  var returnVal = thenBase.call(selfPromise, onFulfilled, onRejected);
  return Worker.convert(returnVal, self.__proto__);
};

Worker.prototype.thenExternal = function thenExternal(onFulfilled, onRejected) {
  // Call `then` and return a standard promise (exits the Worker chain).
  return Promise.prototype.then.call(this, onFulfilled, onRejected);
};

Worker.prototype.thenList = function thenList(fns) {
  // Queue a series of promise 'factories' into the promise chain.
  var self = this;
  fns.forEach(function thenList_forEach(fn) {
    self = self.thenCore(fn);
  });
  return self;
};

Worker.prototype['catch'] = function (onRejected) {
  // Bind `this` to the promise handler, call `catch`, and return a Worker.
  if (onRejected) {
    onRejected = onRejected.bind(this);
  }
  var returnVal = Promise.prototype['catch'].call(this, onRejected);
  return Worker.convert(returnVal, this);
};

Worker.prototype.catchExternal = function catchExternal(onRejected) {
  // Call `catch` and return a standard promise (exits the Worker chain).
  return Promise.prototype['catch'].call(this, onRejected);
};

Worker.prototype.error = function error(msg) {
  // Throw the error in the Promise chain.
  return this.then(function error_main() {
    throw new Error(msg);
  });
};

/* ----- ALIASES ----- */

Worker.prototype.using = Worker.prototype.set;
Worker.prototype.saveAs = Worker.prototype.save;
Worker.prototype.export = Worker.prototype.output;
Worker.prototype.run = Worker.prototype.then;

// Import dependencies.
// Get dimensions of a PDF page, as determined by jsPDF.
jspdf_min.getPageSize = function (orientation, unit, format) {
  // Decode options object
  if ((typeof orientation === 'undefined' ? 'undefined' : _typeof(orientation)) === 'object') {
    var options = orientation;
    orientation = options.orientation;
    unit = options.unit || unit;
    format = options.format || format;
  }

  // Default options
  unit = unit || 'mm';
  format = format || 'a4';
  orientation = ('' + (orientation || 'P')).toLowerCase();
  var format_as_string = ('' + format).toLowerCase();

  // Size in pt of various paper formats
  var pageFormats = {
    'a0': [2383.94, 3370.39], 'a1': [1683.78, 2383.94],
    'a2': [1190.55, 1683.78], 'a3': [841.89, 1190.55],
    'a4': [595.28, 841.89], 'a5': [419.53, 595.28],
    'a6': [297.64, 419.53], 'a7': [209.76, 297.64],
    'a8': [147.40, 209.76], 'a9': [104.88, 147.40],
    'a10': [73.70, 104.88], 'b0': [2834.65, 4008.19],
    'b1': [2004.09, 2834.65], 'b2': [1417.32, 2004.09],
    'b3': [1000.63, 1417.32], 'b4': [708.66, 1000.63],
    'b5': [498.90, 708.66], 'b6': [354.33, 498.90],
    'b7': [249.45, 354.33], 'b8': [175.75, 249.45],
    'b9': [124.72, 175.75], 'b10': [87.87, 124.72],
    'c0': [2599.37, 3676.54], 'c1': [1836.85, 2599.37],
    'c2': [1298.27, 1836.85], 'c3': [918.43, 1298.27],
    'c4': [649.13, 918.43], 'c5': [459.21, 649.13],
    'c6': [323.15, 459.21], 'c7': [229.61, 323.15],
    'c8': [161.57, 229.61], 'c9': [113.39, 161.57],
    'c10': [79.37, 113.39], 'dl': [311.81, 623.62],
    'letter': [612, 792],
    'government-letter': [576, 756],
    'legal': [612, 1008],
    'junior-legal': [576, 360],
    'ledger': [1224, 792],
    'tabloid': [792, 1224],
    'credit-card': [153, 243]
  };

  // Unit conversion
  switch (unit) {
    case 'pt':
      var k = 1;break;
    case 'mm':
      var k = 72 / 25.4;break;
    case 'cm':
      var k = 72 / 2.54;break;
    case 'in':
      var k = 72;break;
    case 'px':
      var k = 72 / 96;break;
    case 'pc':
      var k = 12;break;
    case 'em':
      var k = 12;break;
    case 'ex':
      var k = 6;break;
    default:
      throw 'Invalid unit: ' + unit;
  }

  // Dimensions are stored as user units and converted to points on output
  if (pageFormats.hasOwnProperty(format_as_string)) {
    var pageHeight = pageFormats[format_as_string][1] / k;
    var pageWidth = pageFormats[format_as_string][0] / k;
  } else {
    try {
      var pageHeight = format[1];
      var pageWidth = format[0];
    } catch (err) {
      throw new Error('Invalid format: ' + format);
    }
  }

  // Handle page orientation
  if (orientation === 'p' || orientation === 'portrait') {
    orientation = 'p';
    if (pageWidth > pageHeight) {
      var tmp = pageWidth;
      pageWidth = pageHeight;
      pageHeight = tmp;
    }
  } else if (orientation === 'l' || orientation === 'landscape') {
    orientation = 'l';
    if (pageHeight > pageWidth) {
      var tmp = pageWidth;
      pageWidth = pageHeight;
      pageHeight = tmp;
    }
  } else {
    throw 'Invalid orientation: ' + orientation;
  }

  // Return information (k is the unit conversion ratio from pts)
  var info = { 'width': pageWidth, 'height': pageHeight, 'unit': unit, 'k': k };
  return info;
};

var orig = {
  toContainer: Worker.prototype.toContainer
};

Worker.prototype.toContainer = function toContainer() {
  return orig.toContainer.call(this).then(function toContainer_pagebreak() {
    // Enable page-breaks.
    var pageBreaks = this.prop.container.querySelectorAll('.html2pdf__page-break');
    var pxPageHeight = this.prop.pageSize.inner.px.height;
    Array.prototype.forEach.call(pageBreaks, function pageBreak_loop(el) {
      el.style.display = 'block';
      var clientRect = el.getBoundingClientRect();
      el.style.height = pxPageHeight - clientRect.top % pxPageHeight + 'px';
    }, this);
  });
};

// Add hyperlink functionality to the PDF creation.

// Main link array, and refs to original functions.
var linkInfo = [];
var orig$1 = {
  toContainer: Worker.prototype.toContainer,
  toPdf: Worker.prototype.toPdf
};

Worker.prototype.toContainer = function toContainer() {
  return orig$1.toContainer.call(this).then(function toContainer_hyperlink() {
    // Retrieve hyperlink info if the option is enabled.
    if (this.opt.enableLinks) {
      // Find all anchor tags and get the container's bounds for reference.
      var container = this.prop.container;
      var links = container.querySelectorAll('a');
      var containerRect = unitConvert(container.getBoundingClientRect(), this.prop.pageSize.k);
      linkInfo = [];

      // Loop through each anchor tag.
      Array.prototype.forEach.call(links, function (link) {
        // Treat each client rect as a separate link (for text-wrapping).
        var clientRects = link.getClientRects();
        for (var i = 0; i < clientRects.length; i++) {
          var clientRect = unitConvert(clientRects[i], this.prop.pageSize.k);
          clientRect.left -= containerRect.left;
          clientRect.top -= containerRect.top;

          var page = Math.floor(clientRect.top / this.prop.pageSize.inner.height) + 1;
          var top = this.opt.margin[0] + clientRect.top % this.prop.pageSize.inner.height;
          var left = this.opt.margin[1] + clientRect.left;

          linkInfo.push({ page: page, top: top, left: left, clientRect: clientRect, link: link });
        }
      }, this);
    }
  });
};

Worker.prototype.toPdf = function toPdf() {
  return orig$1.toPdf.call(this).then(function toPdf_hyperlink() {
    // Add hyperlinks if the option is enabled.
    if (this.opt.enableLinks) {
      // Attach each anchor tag based on info from toContainer().
      linkInfo.forEach(function (l) {
        this.prop.pdf.setPage(l.page);
        this.prop.pdf.link(l.left, l.top, l.clientRect.width, l.clientRect.height, { url: l.link.href });
      }, this);

      // Reset the active page of the PDF to the final page.
      var nPages = this.prop.pdf.internal.getNumberOfPages();
      this.prop.pdf.setPage(nPages);
    }
  });
};

/**
 * Generate a PDF from an HTML element or string using html2canvas and jsPDF.
 *
 * @param {Element|string} source The source element or HTML string.
 * @param {Object=} opt An object of optional settings: 'margin', 'filename',
 *    'image' ('type' and 'quality'), and 'html2canvas' / 'jspdf', which are
 *    sent as settings to their corresponding functions.
 */
var html2pdf = function html2pdf(src, opt) {
  // Create a new worker with the given options.
  var worker = new html2pdf.Worker(opt);

  if (src) {
    // If src is specified, perform the traditional 'simple' operation.
    return worker.from(src).save();
  } else {
    // Otherwise, return the worker for new Promise-based operation.
    return worker;
  }
};
html2pdf.Worker = Worker;

return html2pdf;

})));
