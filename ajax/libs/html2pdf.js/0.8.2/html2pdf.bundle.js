/**
 * html2pdf.js v0.8.2
 * Copyright (c) 2017 Erik Koopmans
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

var html2canvas$1 = createCommonjsModule(function (module, exports) {
/*
  html2canvas 0.5.0-beta4 <http://html2canvas.hertzen.com>
  Copyright (c) 2017 Niklas von Hertzen
  2017-06-14 Custom build by Erik Koopmans, featuring latest bugfixes and features

  Released under MIT License
*/

(function(f){{module.exports=f();}})(function(){var define;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND", f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
/*! https://mths.be/punycode v1.4.1 by @mathias */
(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
},{}],2:[function(_dereq_,module,exports){
var log = _dereq_('./log');

function restoreOwnerScroll(ownerDocument, x, y) {
    if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
        ownerDocument.defaultView.scrollTo(x, y);
    }
}

function cloneCanvasContents(canvas, clonedCanvas) {
    try {
        if (clonedCanvas) {
            clonedCanvas.width = canvas.width;
            clonedCanvas.height = canvas.height;
            clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
        }
    } catch(e) {
        log("Unable to copy canvas content from", canvas, e);
    }
}

function cloneNode(node, javascriptEnabled) {
    var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

    var child = node.firstChild;
    while(child) {
        if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
            clone.appendChild(cloneNode(child, javascriptEnabled));
        }
        child = child.nextSibling;
    }

    if (node.nodeType === 1) {
        clone._scrollTop = node.scrollTop;
        clone._scrollLeft = node.scrollLeft;
        if (node.nodeName === "CANVAS") {
            cloneCanvasContents(node, clone);
        } else if (node.nodeName === "TEXTAREA" || node.nodeName === "SELECT") {
            clone.value = node.value;
        }
    }

    return clone;
}

function initNode(node) {
    if (node.nodeType === 1) {
        node.scrollTop = node._scrollTop;
        node.scrollLeft = node._scrollLeft;

        var child = node.firstChild;
        while(child) {
            initNode(child);
            child = child.nextSibling;
        }
    }
}

module.exports = function(ownerDocument, containerDocument, width, height, options, x ,y) {
    var documentElement = cloneNode(ownerDocument.documentElement, options.javascriptEnabled);
    var container = containerDocument.createElement("iframe");

    container.className = "html2canvas-container";
    container.style.visibility = "hidden";
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0px";
    container.style.border = "0";
    container.width = width;
    container.height = height;
    container.scrolling = "no"; // ios won't scroll without it
    containerDocument.body.appendChild(container);

    return new Promise(function(resolve) {
        var documentClone = container.contentWindow.document;

        /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
         if window url is about:blank, we can assign the url to current by writing onto the document
         */
        container.contentWindow.onload = container.onload = function() {
            var interval = setInterval(function() {
                if (documentClone.body.childNodes.length > 0) {
                    initNode(documentClone.documentElement);
                    clearInterval(interval);
                    if (options.type === "view") {
                        container.contentWindow.scrollTo(x, y);
                        if ((/(iPad|iPhone|iPod)/g).test(navigator.userAgent) && (container.contentWindow.scrollY !== y || container.contentWindow.scrollX !== x)) {
                            documentClone.documentElement.style.top = (-y) + "px";
                            documentClone.documentElement.style.left = (-x) + "px";
                            documentClone.documentElement.style.position = 'absolute';
                        }
                    }
                    resolve(container);
                }
            }, 50);
        };

        documentClone.open();
        documentClone.write("<!DOCTYPE html><html></html>");
        // Chrome scrolls the parent document for some reason after the write to the cloned window???
        restoreOwnerScroll(ownerDocument, x, y);
        documentClone.replaceChild(documentClone.adoptNode(documentElement), documentClone.documentElement);
        documentClone.close();
    });
};

},{"./log":13}],3:[function(_dereq_,module,exports){
// http://dev.w3.org/csswg/css-color/

function Color(value) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = null;
    var result = this.fromArray(value) ||
        this.namedColor(value) ||
        this.rgb(value) ||
        this.rgba(value) ||
        this.hex6(value) ||
        this.hex3(value);
}

Color.prototype.darken = function(amount) {
    var a = 1 - amount;
    return  new Color([
        Math.round(this.r * a),
        Math.round(this.g * a),
        Math.round(this.b * a),
        this.a
    ]);
};

Color.prototype.isTransparent = function() {
    return this.a === 0;
};

Color.prototype.isBlack = function() {
    return this.r === 0 && this.g === 0 && this.b === 0;
};

Color.prototype.fromArray = function(array) {
    if (Array.isArray(array)) {
        this.r = Math.min(array[0], 255);
        this.g = Math.min(array[1], 255);
        this.b = Math.min(array[2], 255);
        if (array.length > 3) {
            this.a = array[3];
        }
    }

    return (Array.isArray(array));
};

var _hex3 = /^#([a-f0-9]{3})$/i;

Color.prototype.hex3 = function(value) {
    var match = null;
    if ((match = value.match(_hex3)) !== null) {
        this.r = parseInt(match[1][0] + match[1][0], 16);
        this.g = parseInt(match[1][1] + match[1][1], 16);
        this.b = parseInt(match[1][2] + match[1][2], 16);
    }
    return match !== null;
};

var _hex6 = /^#([a-f0-9]{6})$/i;

Color.prototype.hex6 = function(value) {
    var match = null;
    if ((match = value.match(_hex6)) !== null) {
        this.r = parseInt(match[1].substring(0, 2), 16);
        this.g = parseInt(match[1].substring(2, 4), 16);
        this.b = parseInt(match[1].substring(4, 6), 16);
    }
    return match !== null;
};


var _rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

Color.prototype.rgb = function(value) {
    var match = null;
    if ((match = value.match(_rgb)) !== null) {
        this.r = Number(match[1]);
        this.g = Number(match[2]);
        this.b = Number(match[3]);
    }
    return match !== null;
};

var _rgba = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;

Color.prototype.rgba = function(value) {
    var match = null;
    if ((match = value.match(_rgba)) !== null) {
        this.r = Number(match[1]);
        this.g = Number(match[2]);
        this.b = Number(match[3]);
        this.a = Number(match[4]);
    }
    return match !== null;
};

Color.prototype.toString = function() {
    return this.a !== null && this.a !== 1 ?
    "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
    "rgb(" + [this.r, this.g, this.b].join(",") + ")";
};

Color.prototype.namedColor = function(value) {
    value = value.toLowerCase();
    var color = colors[value];
    if (color) {
        this.r = color[0];
        this.g = color[1];
        this.b = color[2];
    } else if (value === "transparent") {
        this.r = this.g = this.b = this.a = 0;
        return true;
    }

    return !!color;
};

Color.prototype.isColor = true;

// JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
var colors = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
};

module.exports = Color;

},{}],4:[function(_dereq_,module,exports){
var Support = _dereq_('./support');
var CanvasRenderer = _dereq_('./renderers/canvas');
var ImageLoader = _dereq_('./imageloader');
var NodeParser = _dereq_('./nodeparser');
var NodeContainer = _dereq_('./nodecontainer');
var log = _dereq_('./log');
var utils = _dereq_('./utils');
var createWindowClone = _dereq_('./clone');
var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;
var getBounds = utils.getBounds;

var html2canvasNodeAttribute = "data-html2canvas-node";
var html2canvasCloneIndex = 0;

function html2canvas(nodeList, options) {
    var index = html2canvasCloneIndex++;
    options = options || {};
    if (options.logging) {
        log.options.logging = true;
        log.options.start = Date.now();
    }

    options.async = typeof(options.async) === "undefined" ? true : options.async;
    options.allowTaint = typeof(options.allowTaint) === "undefined" ? false : options.allowTaint;
    options.removeContainer = typeof(options.removeContainer) === "undefined" ? true : options.removeContainer;
    options.javascriptEnabled = typeof(options.javascriptEnabled) === "undefined" ? false : options.javascriptEnabled;
    options.imageTimeout = typeof(options.imageTimeout) === "undefined" ? 10000 : options.imageTimeout;
    options.renderer = typeof(options.renderer) === "function" ? options.renderer : CanvasRenderer;
    options.strict = !!options.strict;

    if (typeof(nodeList) === "string") {
        if (typeof(options.proxy) !== "string") {
            return Promise.reject("Proxy must be used when rendering url");
        }
        var width = options.width != null ? options.width : window.innerWidth;
        var height = options.height != null ? options.height : window.innerHeight;
        return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function(container) {
            return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
        });
    }

    var node = ((nodeList === undefined) ? [document.documentElement] : ((nodeList.length) ? nodeList : [nodeList]))[0];
    node.setAttribute(html2canvasNodeAttribute + index, index);
    return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
        if (typeof(options.onrendered) === "function") {
            log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
            options.onrendered(canvas);
        }
        return canvas;
    });
}

html2canvas.CanvasRenderer = CanvasRenderer;
html2canvas.NodeContainer = NodeContainer;
html2canvas.log = log;
html2canvas.utils = utils;

var html2canvasExport = (typeof(document) === "undefined" || typeof(Object.create) !== "function" || typeof(document.createElement("canvas").getContext) !== "function") ? function() {
    return Promise.reject("No canvas support");
} : html2canvas;

module.exports = html2canvasExport;

if (typeof(define) === 'function' && define.amd) {
    define('html2canvas', [], function() {
        return html2canvasExport;
    });
}

function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
    return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function(container) {
        log("Document cloned");
        var attributeName = html2canvasNodeAttribute + html2canvasIndex;
        var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
        document.querySelector(selector).removeAttribute(attributeName);
        var clonedWindow = container.contentWindow;
        var node = clonedWindow.document.querySelector(selector);
        var oncloneHandler = (typeof(options.onclone) === "function") ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
        return oncloneHandler.then(function() {
            return renderWindow(node, container, options, windowWidth, windowHeight);
        });
    });
}

function renderWindow(node, container, options, windowWidth, windowHeight) {
    var clonedWindow = container.contentWindow;
    var support = new Support(clonedWindow.document);
    var imageLoader = new ImageLoader(options, support);
    var bounds = getBounds(node);
    var width = options.type === "view" ? windowWidth : bounds.right + 1;
    var height = options.type === "view" ? windowHeight : bounds.bottom + 1;
    var renderer = new options.renderer(width, height, imageLoader, options, document);
    var parser = new NodeParser(node, renderer, support, imageLoader, options);
    return parser.ready.then(function() {
        log("Finished rendering");
        var canvas;

        if (options.type === "view") {
            canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
        } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
            canvas = renderer.canvas;
        } else if (options.scale) {
            var origBounds = {width: options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: 0, y: 0};
            var cropBounds = {};
            for (var key in origBounds) {
                if (origBounds.hasOwnProperty(key)) { cropBounds[key] = origBounds[key] * options.scale; }
            }
            canvas = crop(renderer.canvas, cropBounds);
            canvas.style.width = origBounds.width + 'px';
            canvas.style.height = origBounds.height + 'px';
        } else {
            canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: 0, y: 0});
        }

        cleanupContainer(container, options);
        return canvas;
    });
}

function cleanupContainer(container, options) {
    if (options.removeContainer) {
        container.parentNode.removeChild(container);
        log("Cleaned up container");
    }
}

function crop(canvas, bounds) {
    var croppedCanvas = document.createElement("canvas");
    var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
    var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
    var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
    var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
    croppedCanvas.width = bounds.width;
    croppedCanvas.height =  bounds.height;
    var width = x2-x1;
    var height = y2-y1;
    log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", width, "height:", height);
    log("Resulting crop with width", bounds.width, "and height", bounds.height, "with x", x1, "and y", y1);
    croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, bounds.x, bounds.y, width, height);
    return croppedCanvas;
}

function absoluteUrl(url) {
    var link = document.createElement("a");
    link.href = url;
    link.href = link.href;
    return link;
}

},{"./clone":2,"./imageloader":11,"./log":13,"./nodecontainer":14,"./nodeparser":15,"./proxy":16,"./renderers/canvas":20,"./support":22,"./utils":26}],5:[function(_dereq_,module,exports){
var log = _dereq_('./log');
var smallImage = _dereq_('./utils').smallImage;

function DummyImageContainer(src) {
    this.src = src;
    log("DummyImageContainer for", src);
    if (!this.promise || !this.image) {
        log("Initiating DummyImageContainer");
        DummyImageContainer.prototype.image = new Image();
        var image = this.image;
        DummyImageContainer.prototype.promise = new Promise(function(resolve, reject) {
            image.onload = resolve;
            image.onerror = reject;
            image.src = smallImage();
            if (image.complete === true) {
                resolve(image);
            }
        });
    }
}

module.exports = DummyImageContainer;

},{"./log":13,"./utils":26}],6:[function(_dereq_,module,exports){
var smallImage = _dereq_('./utils').smallImage;

function Font(family, size) {
    var container = document.createElement('div'),
        img = document.createElement('img'),
        span = document.createElement('span'),
        sampleText = 'Hidden Text',
        baseline,
        middle;

    container.style.visibility = "hidden";
    container.style.fontFamily = family;
    container.style.fontSize = size;
    container.style.margin = 0;
    container.style.padding = 0;

    document.body.appendChild(container);

    img.src = smallImage();
    img.width = 1;
    img.height = 1;

    img.style.margin = 0;
    img.style.padding = 0;
    img.style.verticalAlign = "baseline";

    span.style.fontFamily = family;
    span.style.fontSize = size;
    span.style.margin = 0;
    span.style.padding = 0;

    span.appendChild(document.createTextNode(sampleText));
    container.appendChild(span);
    container.appendChild(img);
    baseline = (img.offsetTop - span.offsetTop) + 1;

    container.removeChild(span);
    container.appendChild(document.createTextNode(sampleText));

    container.style.lineHeight = "normal";
    img.style.verticalAlign = "super";

    middle = (img.offsetTop-container.offsetTop) + 1;

    document.body.removeChild(container);

    this.baseline = baseline;
    this.lineWidth = 1;
    this.middle = middle;
}

module.exports = Font;

},{"./utils":26}],7:[function(_dereq_,module,exports){
var Font = _dereq_('./font');

function FontMetrics() {
    this.data = {};
}

FontMetrics.prototype.getMetrics = function(family, size) {
    if (this.data[family + "-" + size] === undefined) {
        this.data[family + "-" + size] = new Font(family, size);
    }
    return this.data[family + "-" + size];
};

module.exports = FontMetrics;

},{"./font":6}],8:[function(_dereq_,module,exports){
var utils = _dereq_('./utils');
var getBounds = utils.getBounds;
var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;

function FrameContainer(container, sameOrigin, options) {
    this.image = null;
    this.src = container;
    var self = this;
    var bounds = getBounds(container);
    this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function(resolve) {
        if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
            container.contentWindow.onload = container.onload = function() {
                resolve(container);
            };
        } else {
            resolve(container);
        }
    })).then(function(container) {
        var html2canvas = _dereq_('./core');
        return html2canvas(container.contentWindow.document.documentElement, {type: 'view', width: container.width, height: container.height, proxy: options.proxy, javascriptEnabled: options.javascriptEnabled, removeContainer: options.removeContainer, allowTaint: options.allowTaint, imageTimeout: options.imageTimeout / 2});
    }).then(function(canvas) {
        return self.image = canvas;
    });
}

FrameContainer.prototype.proxyLoad = function(proxy, bounds, options) {
    var container = this.src;
    return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
};

module.exports = FrameContainer;

},{"./core":4,"./proxy":16,"./utils":26}],9:[function(_dereq_,module,exports){
function GradientContainer(imageData) {
    this.src = imageData.value;
    this.colorStops = [];
    this.type = null;
    this.x0 = 0.5;
    this.y0 = 0.5;
    this.x1 = 0.5;
    this.y1 = 0.5;
    this.promise = Promise.resolve(true);
}

GradientContainer.TYPES = {
    LINEAR: 1,
    RADIAL: 2
};

// TODO: support hsl[a], negative %/length values
// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
GradientContainer.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i;

module.exports = GradientContainer;

},{}],10:[function(_dereq_,module,exports){
function ImageContainer(src, cors) {
    this.src = src;
    this.image = new Image();
    var self = this;
    this.tainted = null;
    this.promise = new Promise(function(resolve, reject) {
        self.image.onload = resolve;
        self.image.onerror = reject;
        if (cors) {
            self.image.crossOrigin = "anonymous";
        }
        self.image.src = src;
        if (self.image.complete === true) {
            resolve(self.image);
        }
    });
}

module.exports = ImageContainer;

},{}],11:[function(_dereq_,module,exports){
var log = _dereq_('./log');
var ImageContainer = _dereq_('./imagecontainer');
var DummyImageContainer = _dereq_('./dummyimagecontainer');
var ProxyImageContainer = _dereq_('./proxyimagecontainer');
var FrameContainer = _dereq_('./framecontainer');
var SVGContainer = _dereq_('./svgcontainer');
var SVGNodeContainer = _dereq_('./svgnodecontainer');
var LinearGradientContainer = _dereq_('./lineargradientcontainer');
var WebkitGradientContainer = _dereq_('./webkitgradientcontainer');
var bind = _dereq_('./utils').bind;

function ImageLoader(options, support) {
    this.link = null;
    this.options = options;
    this.support = support;
    this.origin = this.getOrigin(window.location.href);
}

ImageLoader.prototype.findImages = function(nodes) {
    var images = [];
    nodes.reduce(function(imageNodes, container) {
        switch(container.node.nodeName) {
        case "IMG":
            return imageNodes.concat([{
                args: [container.node.src],
                method: "url"
            }]);
        case "svg":
        case "IFRAME":
            return imageNodes.concat([{
                args: [container.node],
                method: container.node.nodeName
            }]);
        }
        return imageNodes;
    }, []).forEach(this.addImage(images, this.loadImage), this);
    return images;
};

ImageLoader.prototype.findBackgroundImage = function(images, container) {
    container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
    return images;
};

ImageLoader.prototype.addImage = function(images, callback) {
    return function(newImage) {
        newImage.args.forEach(function(image) {
            if (!this.imageExists(images, image)) {
                images.splice(0, 0, callback.call(this, newImage));
                log('Added image #' + (images.length), typeof(image) === "string" ? image.substring(0, 100) : image);
            }
        }, this);
    };
};

ImageLoader.prototype.hasImageBackground = function(imageData) {
    return imageData.method !== "none";
};

ImageLoader.prototype.loadImage = function(imageData) {
    if (imageData.method === "url") {
        var src = imageData.args[0];
        if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
            return new SVGContainer(src);
        } else if (src.match(/data:image\/.*;base64,/i)) {
            return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
        } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
            return new ImageContainer(src, false);
        } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
            return new ImageContainer(src, true);
        } else if (this.options.proxy) {
            return new ProxyImageContainer(src, this.options.proxy);
        } else {
            return new DummyImageContainer(src);
        }
    } else if (imageData.method === "linear-gradient") {
        return new LinearGradientContainer(imageData);
    } else if (imageData.method === "gradient") {
        return new WebkitGradientContainer(imageData);
    } else if (imageData.method === "svg") {
        return new SVGNodeContainer(imageData.args[0], this.support.svg);
    } else if (imageData.method === "IFRAME") {
        return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
    } else {
        return new DummyImageContainer(imageData);
    }
};

ImageLoader.prototype.isSVG = function(src) {
    return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
};

ImageLoader.prototype.imageExists = function(images, src) {
    return images.some(function(image) {
        return image.src === src;
    });
};

ImageLoader.prototype.isSameOrigin = function(url) {
    return (this.getOrigin(url) === this.origin);
};

ImageLoader.prototype.getOrigin = function(url) {
    var link = this.link || (this.link = document.createElement("a"));
    link.href = url;
    link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
    return link.protocol + link.hostname + link.port;
};

ImageLoader.prototype.getPromise = function(container) {
    return this.timeout(container, this.options.imageTimeout)['catch'](function() {
        var dummy = new DummyImageContainer(container.src);
        return dummy.promise.then(function(image) {
            container.image = image;
        });
    });
};

ImageLoader.prototype.get = function(src) {
    var found = null;
    return this.images.some(function(img) {
        return (found = img).src === src;
    }) ? found : null;
};

ImageLoader.prototype.fetch = function(nodes) {
    this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
    this.images.forEach(function(image, index) {
        image.promise.then(function() {
            log("Succesfully loaded image #"+ (index+1), image);
        }, function(e) {
            log("Failed loading image #"+ (index+1), image, e);
        });
    });
    this.ready = Promise.all(this.images.map(this.getPromise, this));
    log("Finished searching images");
    return this;
};

ImageLoader.prototype.timeout = function(container, timeout) {
    var timer;
    var promise = Promise.race([container.promise, new Promise(function(res, reject) {
        timer = setTimeout(function() {
            log("Timed out loading image", container);
            reject(container);
        }, timeout);
    })]).then(function(container) {
        clearTimeout(timer);
        return container;
    });
    promise['catch'](function() {
        clearTimeout(timer);
    });
    return promise;
};

module.exports = ImageLoader;

},{"./dummyimagecontainer":5,"./framecontainer":8,"./imagecontainer":10,"./lineargradientcontainer":12,"./log":13,"./proxyimagecontainer":17,"./svgcontainer":23,"./svgnodecontainer":24,"./utils":26,"./webkitgradientcontainer":27}],12:[function(_dereq_,module,exports){
var GradientContainer = _dereq_('./gradientcontainer');
var Color = _dereq_('./color');

function LinearGradientContainer(imageData) {
    GradientContainer.apply(this, arguments);
    this.type = GradientContainer.TYPES.LINEAR;

    var hasDirection = LinearGradientContainer.REGEXP_DIRECTION.test( imageData.args[0] ) ||
        !GradientContainer.REGEXP_COLORSTOP.test( imageData.args[0] );

    if (hasDirection) {
        imageData.args[0].split(/\s+/).reverse().forEach(function(position, index) {
            switch(position) {
            case "left":
                this.x0 = 0;
                this.x1 = 1;
                break;
            case "top":
                this.y0 = 0;
                this.y1 = 1;
                break;
            case "right":
                this.x0 = 1;
                this.x1 = 0;
                break;
            case "bottom":
                this.y0 = 1;
                this.y1 = 0;
                break;
            case "to":
                var y0 = this.y0;
                var x0 = this.x0;
                this.y0 = this.y1;
                this.x0 = this.x1;
                this.x1 = x0;
                this.y1 = y0;
                break;
            case "center":
                break; // centered by default
            // Firefox internally converts position keywords to percentages:
            // http://www.w3.org/TR/2010/WD-CSS2-20101207/colors.html#propdef-background-position
            default: // percentage or absolute length
                // TODO: support absolute start point positions (e.g., use bounds to convert px to a ratio)
                var ratio = parseFloat(position, 10) * 1e-2;
                if (isNaN(ratio)) { // invalid or unhandled value
                    break;
                }
                if (index === 0) {
                    this.y0 = ratio;
                    this.y1 = 1 - this.y0;
                } else {
                    this.x0 = ratio;
                    this.x1 = 1 - this.x0;
                }
                break;
            }
        }, this);
    } else {
        this.y0 = 0;
        this.y1 = 1;
    }

    this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function(colorStop) {
        var colorStopMatch = colorStop.match(GradientContainer.REGEXP_COLORSTOP);
        var value = +colorStopMatch[2];
        var unit = value === 0 ? "%" : colorStopMatch[3]; // treat "0" as "0%"
        return {
            color: new Color(colorStopMatch[1]),
            // TODO: support absolute stop positions (e.g., compute gradient line length & convert px to ratio)
            stop: unit === "%" ? value / 100 : null
        };
    });

    if (this.colorStops[0].stop === null) {
        this.colorStops[0].stop = 0;
    }

    if (this.colorStops[this.colorStops.length - 1].stop === null) {
        this.colorStops[this.colorStops.length - 1].stop = 1;
    }

    // calculates and fills-in explicit stop positions when omitted from rule
    this.colorStops.forEach(function(colorStop, index) {
        if (colorStop.stop === null) {
            this.colorStops.slice(index).some(function(find, count) {
                if (find.stop !== null) {
                    colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
                    return true;
                } else {
                    return false;
                }
            }, this);
        }
    }, this);
}

LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
LinearGradientContainer.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i;

module.exports = LinearGradientContainer;

},{"./color":3,"./gradientcontainer":9}],13:[function(_dereq_,module,exports){
var logger = function() {
    if (logger.options.logging && window.console && window.console.log) {
        Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - logger.options.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
    }
};

logger.options = {logging: false};
module.exports = logger;

},{}],14:[function(_dereq_,module,exports){
var Color = _dereq_('./color');
var utils = _dereq_('./utils');
var getBounds = utils.getBounds;
var parseBackgrounds = utils.parseBackgrounds;
var offsetBounds = utils.offsetBounds;

function NodeContainer(node, parent) {
    this.node = node;
    this.parent = parent;
    this.stack = null;
    this.bounds = null;
    this.borders = null;
    this.clip = [];
    this.backgroundClip = [];
    this.offsetBounds = null;
    this.visible = null;
    this.computedStyles = null;
    this.colors = {};
    this.styles = {};
    this.backgroundImages = null;
    this.transformData = null;
    this.transformMatrix = null;
    this.isPseudoElement = false;
    this.opacity = null;
}

NodeContainer.prototype.cloneTo = function(stack) {
    stack.visible = this.visible;
    stack.borders = this.borders;
    stack.bounds = this.bounds;
    stack.clip = this.clip;
    stack.backgroundClip = this.backgroundClip;
    stack.computedStyles = this.computedStyles;
    stack.styles = this.styles;
    stack.backgroundImages = this.backgroundImages;
    stack.opacity = this.opacity;
};

NodeContainer.prototype.getOpacity = function() {
    return this.opacity === null ? (this.opacity = this.cssFloat('opacity')) : this.opacity;
};

NodeContainer.prototype.assignStack = function(stack) {
    this.stack = stack;
    stack.children.push(this);
};

NodeContainer.prototype.isElementVisible = function() {
    return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : (
        this.css('display') !== "none" &&
        this.css('visibility') !== "hidden" &&
        !this.node.hasAttribute("data-html2canvas-ignore") &&
        (this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden")
    );
};

NodeContainer.prototype.css = function(attribute) {
    if (!this.computedStyles) {
        this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
    }

    return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
};

NodeContainer.prototype.prefixedCss = function(attribute) {
    var prefixes = ["webkit", "moz", "ms", "o"];
    var value = this.css(attribute);
    if (value === undefined) {
        prefixes.some(function(prefix) {
            value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
            return value !== undefined;
        }, this);
    }
    return value === undefined ? null : value;
};

NodeContainer.prototype.computedStyle = function(type) {
    return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
};

NodeContainer.prototype.cssInt = function(attribute) {
    var value = parseInt(this.css(attribute), 10);
    return (isNaN(value)) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
};

NodeContainer.prototype.color = function(attribute) {
    return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
};

NodeContainer.prototype.cssFloat = function(attribute) {
    var value = parseFloat(this.css(attribute));
    return (isNaN(value)) ? 0 : value;
};

NodeContainer.prototype.fontWeight = function() {
    var weight = this.css("fontWeight");
    switch(parseInt(weight, 10)){
    case 401:
        weight = "bold";
        break;
    case 400:
        weight = "normal";
        break;
    }
    return weight;
};

NodeContainer.prototype.parseClip = function() {
    var matches = this.css('clip').match(this.CLIP);
    if (matches) {
        return {
            top: parseInt(matches[1], 10),
            right: parseInt(matches[2], 10),
            bottom: parseInt(matches[3], 10),
            left: parseInt(matches[4], 10)
        };
    }
    return null;
};

NodeContainer.prototype.parseBackgroundImages = function() {
    return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
};

NodeContainer.prototype.cssList = function(property, index) {
    var value = (this.css(property) || '').split(',');
    value = value[index || 0] || value[0] || 'auto';
    value = value.trim().split(' ');
    if (value.length === 1) {
        value = [value[0], isPercentage(value[0]) ? 'auto' : value[0]];
    }
    return value;
};

NodeContainer.prototype.parseBackgroundSize = function(bounds, image, index) {
    var size = this.cssList("backgroundSize", index);
    var width, height;

    if (isPercentage(size[0])) {
        width = bounds.width * parseFloat(size[0]) / 100;
    } else if (/contain|cover/.test(size[0])) {
        var targetRatio = bounds.width / bounds.height, currentRatio = image.width / image.height;
        return (targetRatio < currentRatio ^ size[0] === 'contain') ?  {width: bounds.height * currentRatio, height: bounds.height} : {width: bounds.width, height: bounds.width / currentRatio};
    } else {
        width = parseInt(size[0], 10);
    }

    if (size[0] === 'auto' && size[1] === 'auto') {
        height = image.height;
    } else if (size[1] === 'auto') {
        height = width / image.width * image.height;
    } else if (isPercentage(size[1])) {
        height =  bounds.height * parseFloat(size[1]) / 100;
    } else {
        height = parseInt(size[1], 10);
    }

    if (size[0] === 'auto') {
        width = height / image.height * image.width;
    }

    return {width: width, height: height};
};

NodeContainer.prototype.parseBackgroundPosition = function(bounds, image, index, backgroundSize) {
    var position = this.cssList('backgroundPosition', index);
    var left, top;

    if (isPercentage(position[0])){
        left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
    } else {
        left = parseInt(position[0], 10);
    }

    if (position[1] === 'auto') {
        top = left / image.width * image.height;
    } else if (isPercentage(position[1])){
        top =  (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
    } else {
        top = parseInt(position[1], 10);
    }

    if (position[0] === 'auto') {
        left = top / image.height * image.width;
    }

    return {left: left, top: top};
};

NodeContainer.prototype.parseBackgroundRepeat = function(index) {
    return this.cssList("backgroundRepeat", index)[0];
};

NodeContainer.prototype.parseTextShadows = function() {
    var textShadow = this.css("textShadow");
    var results = [];

    if (textShadow && textShadow !== 'none') {
        var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
        for (var i = 0; shadows && (i < shadows.length); i++) {
            var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
            results.push({
                color: new Color(s[0]),
                offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
                offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
                blur: s[3] ? s[3].replace('px', '') : 0
            });
        }
    }
    return results;
};

NodeContainer.prototype.parseTransform = function() {
    if (!this.transformData) {
        if (this.hasTransform()) {
            var offset = this.parseBounds();
            var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
            origin[0] += offset.left;
            origin[1] += offset.top;
            this.transformData = {
                origin: origin,
                matrix: this.parseTransformMatrix()
            };
        } else {
            this.transformData = {
                origin: [0, 0],
                matrix: [1, 0, 0, 1, 0, 0]
            };
        }
    }
    return this.transformData;
};

NodeContainer.prototype.parseTransformMatrix = function() {
    if (!this.transformMatrix) {
        var transform = this.prefixedCss("transform");
        var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
        this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
    }
    return this.transformMatrix;
};

NodeContainer.prototype.inverseTransform = function() {
    var transformData = this.parseTransform();
    return { origin: transformData.origin, matrix: matrixInverse(transformData.matrix) };
};

NodeContainer.prototype.parseBounds = function() {
    return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
};

NodeContainer.prototype.hasTransform = function() {
    return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || (this.parent && this.parent.hasTransform());
};

NodeContainer.prototype.getValue = function() {
    var value = this.node.value || "";
    if (this.node.tagName === "SELECT") {
        value = selectionValue(this.node);
    } else if (this.node.type === "password") {
        value = Array(value.length + 1).join('\u2022'); // jshint ignore:line
    }
    return value.length === 0 ? (this.node.placeholder || "") : value;
};

NodeContainer.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/;
NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

function selectionValue(node) {
    var option = node.options[node.selectedIndex || 0];
    return option ? (option.text || "") : "";
}

function parseMatrix(match) {
    if (match && match[1] === "matrix") {
        return match[2].split(",").map(function(s) {
            return parseFloat(s.trim());
        });
    } else if (match && match[1] === "matrix3d") {
        var matrix3d = match[2].split(",").map(function(s) {
          return parseFloat(s.trim());
        });
        return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
    }
}

function matrixInverse(m) {
    // This is programmed specifically for transform matrices, which have a fixed structure.
    var a = m[0], b = m[2], c = m[4], d = m[1], e = m[3], f = m[5];
    var det = a*e - b*d;
    var M = [e, -d, -b, a, b*f-c*e, c*d-a*f].map(function(val) { return val/det; });
    return M;
}

function isPercentage(value) {
    return value.toString().indexOf("%") !== -1;
}

function removePx(str) {
    return str.replace("px", "");
}

function asFloat(str) {
    return parseFloat(str);
}

module.exports = NodeContainer;

},{"./color":3,"./utils":26}],15:[function(_dereq_,module,exports){
var log = _dereq_('./log');
var punycode = _dereq_('punycode');
var NodeContainer = _dereq_('./nodecontainer');
var TextContainer = _dereq_('./textcontainer');
var PseudoElementContainer = _dereq_('./pseudoelementcontainer');
var FontMetrics = _dereq_('./fontmetrics');
var Color = _dereq_('./color');
var StackingContext = _dereq_('./stackingcontext');
var utils = _dereq_('./utils');
var bind = utils.bind;
var getBounds = utils.getBounds;
var parseBackgrounds = utils.parseBackgrounds;
var offsetBounds = utils.offsetBounds;

function NodeParser(element, renderer, support, imageLoader, options) {
    log("Starting NodeParser");
    this.renderer = renderer;
    this.options = options;
    this.range = null;
    this.support = support;
    this.renderQueue = [];
    this.stack = new StackingContext(true, 1, element.ownerDocument, null);
    var parent = new NodeContainer(element, null);
    if (options.background) {
        renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
    }
    if (element === element.ownerDocument.documentElement) {
        // http://www.w3.org/TR/css3-background/#special-backgrounds
        var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
        renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
    }
    parent.visibile = parent.isElementVisible();
    this.createPseudoHideStyles(element.ownerDocument);
    this.disableAnimations(element.ownerDocument);
    this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function(container) {
        return container.visible = container.isElementVisible();
    }).map(this.getPseudoElements, this));
    this.fontMetrics = new FontMetrics();
    log("Fetched nodes, total:", this.nodes.length);
    log("Calculate overflow clips");
    this.calculateOverflowClips();
    log("Start fetching images");
    this.images = imageLoader.fetch(this.nodes.filter(isElement));
    this.ready = this.images.ready.then(bind(function() {
        log("Images loaded, starting parsing");
        log("Creating stacking contexts");
        this.createStackingContexts();
        log("Sorting stacking contexts");
        this.sortStackingContexts(this.stack);
        this.parse(this.stack);
        log("Render queue created with " + this.renderQueue.length + " items");
        return new Promise(bind(function(resolve) {
            if (!options.async) {
                this.renderQueue.forEach(this.paint, this);
                resolve();
            } else if (typeof(options.async) === "function") {
                options.async.call(this, this.renderQueue, resolve);
            } else if (this.renderQueue.length > 0){
                this.renderIndex = 0;
                this.asyncRenderer(this.renderQueue, resolve);
            } else {
                resolve();
            }
        }, this));
    }, this));
}

NodeParser.prototype.calculateOverflowClips = function() {
    this.nodes.forEach(function(container) {
        if (isElement(container)) {
            if (isPseudoElement(container)) {
                container.appendToDOM();
            }
            container.borders = this.parseBorders(container);
            var clip = (container.css('overflow') === "hidden") ? [container.borders.clip] : [];
            var cssClip = container.parseClip();
            if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
                clip.push([["rect",
                        container.bounds.left + cssClip.left,
                        container.bounds.top + cssClip.top,
                        cssClip.right - cssClip.left,
                        cssClip.bottom - cssClip.top
                ]]);
            }
            container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
            container.backgroundClip = (container.css('overflow') !== "hidden") ? container.clip.concat([container.borders.clip]) : container.clip;
            if (isPseudoElement(container)) {
                container.cleanDOM();
            }
        } else if (isTextNode(container)) {
            container.clip = hasParentClip(container) ? container.parent.clip : [];
        }
        if (!isPseudoElement(container)) {
            container.bounds = null;
        }
    }, this);
};

function hasParentClip(container) {
    return container.parent && container.parent.clip.length;
}

NodeParser.prototype.asyncRenderer = function(queue, resolve, asyncTimer) {
    asyncTimer = asyncTimer || Date.now();
    this.paint(queue[this.renderIndex++]);
    if (queue.length === this.renderIndex) {
        resolve();
    } else if (asyncTimer + 20 > Date.now()) {
        this.asyncRenderer(queue, resolve, asyncTimer);
    } else {
        setTimeout(bind(function() {
            this.asyncRenderer(queue, resolve);
        }, this), 0);
    }
};

NodeParser.prototype.createPseudoHideStyles = function(document) {
    this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
        '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
};

NodeParser.prototype.disableAnimations = function(document) {
    this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
        '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
};

NodeParser.prototype.createStyles = function(document, styles) {
    var hidePseudoElements = document.createElement('style');
    hidePseudoElements.innerHTML = styles;
    document.body.appendChild(hidePseudoElements);
};

NodeParser.prototype.getPseudoElements = function(container) {
    var nodes = [[container]];
    if (container.node.nodeType === Node.ELEMENT_NODE) {
        var before = this.getPseudoElement(container, ":before");
        var after = this.getPseudoElement(container, ":after");

        if (before) {
            nodes.push(before);
        }

        if (after) {
            nodes.push(after);
        }
    }
    return flatten(nodes);
};

function toCamelCase(str) {
    return str.replace(/(\-[a-z])/g, function(match){
        return match.toUpperCase().replace('-','');
    });
}

NodeParser.prototype.getPseudoElement = function(container, type) {
    var style = container.computedStyle(type);
    if(!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
        return null;
    }

    var content = stripQuotes(style.content);
    var isImage = content.substr(0, 3) === 'url';
    var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
    var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

    for (var i = style.length-1; i >= 0; i--) {
        var property = toCamelCase(style.item(i));
        pseudoNode.style[property] = style[property];
    }

    pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

    if (isImage) {
        pseudoNode.src = parseBackgrounds(content)[0].args[0];
        return [pseudoContainer];
    } else {
        var text = document.createTextNode(content);
        pseudoNode.appendChild(text);
        return [pseudoContainer, new TextContainer(text, pseudoContainer)];
    }
};


NodeParser.prototype.getChildren = function(parentContainer) {
    return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function(node) {
        var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
        return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? (container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : []) : container;
    }, this));
};

NodeParser.prototype.newStackingContext = function(container, hasOwnStacking) {
    var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
    container.cloneTo(stack);
    var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
    parentStack.contexts.push(stack);
    container.stack = stack;
};

NodeParser.prototype.createStackingContexts = function() {
    this.nodes.forEach(function(container) {
        if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
            this.newStackingContext(container, true);
        } else if (isElement(container) && ((isPositioned(container) && zIndex0(container)) || isInlineBlock(container) || isFloating(container))) {
            this.newStackingContext(container, false);
        } else {
            container.assignStack(container.parent.stack);
        }
    }, this);
};

NodeParser.prototype.isBodyWithTransparentRoot = function(container) {
    return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
};

NodeParser.prototype.isRootElement = function(container) {
    return container.parent === null;
};

NodeParser.prototype.sortStackingContexts = function(stack) {
    stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
    stack.contexts.forEach(this.sortStackingContexts, this);
};

NodeParser.prototype.parseTextBounds = function(container) {
    return function(text, index, textList) {
        if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
            if (this.support.rangeBounds && !container.parent.hasTransform()) {
                var offset = textList.slice(0, index).join("").length;
                return this.getRangeBounds(container.node, offset, text.length);
            } else if (container.node && typeof(container.node.data) === "string") {
                var replacementNode = container.node.splitText(text.length);
                var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
                container.node = replacementNode;
                return bounds;
            }
        } else if(!this.support.rangeBounds || container.parent.hasTransform()){
            container.node = container.node.splitText(text.length);
        }
        return {};
    };
};

NodeParser.prototype.getWrapperBounds = function(node, transform) {
    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
    var parent = node.parentNode,
        backupText = node.cloneNode(true);

    wrapper.appendChild(node.cloneNode(true));
    parent.replaceChild(wrapper, node);
    var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
    parent.replaceChild(backupText, wrapper);
    return bounds;
};

NodeParser.prototype.getRangeBounds = function(node, offset, length) {
    var range = this.range || (this.range = node.ownerDocument.createRange());
    range.setStart(node, offset);
    range.setEnd(node, offset + length);
    return range.getBoundingClientRect();
};

function ClearTransform() {}

NodeParser.prototype.parse = function(stack) {
    // http://www.w3.org/TR/CSS21/visuren.html#z-index
    var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
    var descendantElements = stack.children.filter(isElement);
    var descendantNonFloats = descendantElements.filter(not(isFloating));
    var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
    var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
    var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
    var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
    var text = stack.children.filter(isTextNode).filter(hasText);
    var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
    negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats)
        .concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function(container) {
            this.renderQueue.push(container);
            if (isStackingContext(container)) {
                this.parse(container);
                this.renderQueue.push(new ClearTransform());
            }
        }, this);
};

NodeParser.prototype.paint = function(container) {
    try {
        if (container instanceof ClearTransform) {
            this.renderer.ctx.restore();
        } else if (isTextNode(container)) {
            if (isPseudoElement(container.parent)) {
                container.parent.appendToDOM();
            }
            this.paintText(container);
            if (isPseudoElement(container.parent)) {
                container.parent.cleanDOM();
            }
        } else {
            this.paintNode(container);
        }
    } catch(e) {
        log(e);
        if (this.options.strict) {
            throw e;
        }
    }
};

NodeParser.prototype.paintNode = function(container) {
    if (isStackingContext(container)) {
        this.renderer.setOpacity(container.opacity);
        this.renderer.ctx.save();
        if (container.hasTransform()) {
            this.renderer.setTransform(container.parseTransform());
        }
    }

    if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
        this.paintCheckbox(container);
    } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
        this.paintRadio(container);
    } else {
        this.paintElement(container);
    }
};

NodeParser.prototype.paintElement = function(container) {
    var bounds = container.parseBounds();
    this.renderer.clip(container.backgroundClip, function() {
        this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
    }, this, container);

    this.renderer.mask(container.backgroundClip, function() {
        this.renderer.renderShadows(container, container.borders.clip);
    }, this, container);

    this.renderer.clip(container.clip, function() {
        this.renderer.renderBorders(container.borders.borders);
    }, this, container);

    this.renderer.clip(container.backgroundClip, function() {
        switch (container.node.nodeName) {
        case "svg":
        case "IFRAME":
            var imgContainer = this.images.get(container.node);
            if (imgContainer) {
                this.renderer.renderImage(container, bounds, container.borders, imgContainer);
            } else {
                log("Error loading <" + container.node.nodeName + ">", container.node);
            }
            break;
        case "IMG":
            var imageContainer = this.images.get(container.node.src);
            if (imageContainer) {
                this.renderer.renderImage(container, bounds, container.borders, imageContainer);
            } else {
                log("Error loading <img>", container.node.src);
            }
            break;
        case "CANVAS":
            this.renderer.renderImage(container, bounds, container.borders, {image: container.node});
            break;
        case "SELECT":
        case "INPUT":
        case "TEXTAREA":
            this.paintFormValue(container);
            break;
        }
    }, this, container);
};

NodeParser.prototype.paintCheckbox = function(container) {
    var b = container.parseBounds();

    var size = Math.min(b.width, b.height);
    var bounds = {width: size - 1, height: size - 1, top: b.top, left: b.left};
    var r = [3, 3];
    var radius = [r, r, r, r];
    var borders = [1,1,1,1].map(function(w) {
        return {color: new Color('#A5A5A5'), width: w};
    });

    var borderPoints = calculateCurvePoints(bounds, radius, borders);

    this.renderer.clip(container.backgroundClip, function() {
        this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
        this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
        if (container.node.checked) {
            this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', (size - 3) + "px", 'arial');
            this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
        }
    }, this, container);
};

NodeParser.prototype.paintRadio = function(container) {
    var bounds = container.parseBounds();

    var size = Math.min(bounds.width, bounds.height) - 2;

    this.renderer.clip(container.backgroundClip, function() {
        this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
        if (container.node.checked) {
            this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
        }
    }, this, container);
};

NodeParser.prototype.paintFormValue = function(container) {
    var value = container.getValue();
    if (value.length > 0) {
        var document = container.node.ownerDocument;
        var wrapper = document.createElement('html2canvaswrapper');
        var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
            'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
            'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
            'boxSizing', 'whiteSpace', 'wordWrap'];

        properties.forEach(function(property) {
            try {
                wrapper.style[property] = container.css(property);
            } catch(e) {
                // Older IE has issues with "border"
                log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
            }
        });
        var bounds = container.parseBounds();
        wrapper.style.position = "fixed";
        wrapper.style.left = bounds.left + "px";
        wrapper.style.top = bounds.top + "px";
        wrapper.textContent = value;
        document.body.appendChild(wrapper);
        this.paintText(new TextContainer(wrapper.firstChild, container));
        document.body.removeChild(wrapper);
    }
};

NodeParser.prototype.paintText = function(container) {
    container.applyTextTransform();
    var characters = punycode.ucs2.decode(container.node.data);
    var wordRendering = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data);
    var textList = wordRendering ? getWords(characters) : characters.map(function(character) {
        return punycode.ucs2.encode([character]);
    });
    if (!wordRendering) {
        container.parent.node.style.fontVariantLigatures = 'none';
    }

    var weight = container.parent.fontWeight();
    var size = container.parent.css('fontSize');
    var family = container.parent.css('fontFamily');
    var shadows = container.parent.parseTextShadows();

    this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
    if (shadows.length) {
        // TODO: support multiple text shadows
        this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
    } else {
        this.renderer.clearShadow();
    }

    this.renderer.clip(container.parent.clip, function() {
        textList.map(this.parseTextBounds(container), this).forEach(function(bounds, index) {
            if (bounds) {
                this.renderer.text(textList[index], bounds.left, bounds.bottom);
                this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
            }
        }, this);
    }, this, container.parent);
};

NodeParser.prototype.renderTextDecoration = function(container, bounds, metrics) {
    switch(container.css("textDecoration").split(" ")[0]) {
    case "underline":
        // Draws a line at the baseline of the font
        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
        this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
        break;
    case "overline":
        this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
        break;
    case "line-through":
        // TODO try and find exact position for line-through
        this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
        break;
    }
};

var borderColorTransforms = {
    inset: [
        ["darken", 0.60],
        ["darken", 0.10],
        ["darken", 0.10],
        ["darken", 0.60]
    ]
};

NodeParser.prototype.parseBorders = function(container) {
    var nodeBounds = container.parseBounds();
    var radius = getBorderRadiusData(container);
    var borders = ["Top", "Right", "Bottom", "Left"].map(function(side, index) {
        var style = container.css('border' + side + 'Style');
        var color = container.color('border' + side + 'Color');
        if (style === "inset" && color.isBlack()) {
            color = new Color([255, 255, 255, color.a]); // this is wrong, but
        }
        var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
        return {
            width: container.cssInt('border' + side + 'Width'),
            color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
            style: style,
            pathArgs: null,
            args: null
        };
    });
    var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

    return {
        clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
        borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
    };
};

function calculateBorders(borders, nodeBounds, borderPoints, radius) {
    var pathBounds = {
        top: nodeBounds.top + borders[0].width/2,
        right: nodeBounds.right - borders[1].width/2,
        bottom: nodeBounds.bottom - borders[2].width/2,
        left: nodeBounds.left + borders[3].width/2
    };
    return borders.map(function(border, borderSide) {
        if (border.width > 0) {
            var bx = nodeBounds.left;
            var by = nodeBounds.top;
            var bw = nodeBounds.width;
            var bh = nodeBounds.height - (borders[2].width);

            switch(borderSide) {
            case 0:
                // top border
                bh = borders[0].width;
                border.args = drawSide({
                        c1: [bx, by],
                        c2: [bx + bw, by],
                        c3: [bx + bw - borders[1].width, by + bh],
                        c4: [bx + borders[3].width, by + bh]
                    }, radius[0], radius[1],
                    borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
                border.pathArgs = drawSidePath({
                        c1: [pathBounds.left, pathBounds.top],
                        c2: [pathBounds.right, pathBounds.top]
                    }, radius[0], radius[1],
                    borderPoints.topLeft, borderPoints.topRight);
                break;
            case 1:
                // right border
                bx = nodeBounds.left + nodeBounds.width - (borders[1].width);
                bw = borders[1].width;

                border.args = drawSide({
                        c1: [bx + bw, by],
                        c2: [bx + bw, by + bh + borders[2].width],
                        c3: [bx, by + bh],
                        c4: [bx, by + borders[0].width]
                    }, radius[1], radius[2],
                    borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
                border.pathArgs = drawSidePath({
                        c1: [pathBounds.right, pathBounds.top],
                        c2: [pathBounds.right, pathBounds.bottom]
                    }, radius[1], radius[2],
                    borderPoints.topRight, borderPoints.bottomRight);
                break;
            case 2:
                // bottom border
                by = (by + nodeBounds.height) - (borders[2].width);
                bh = borders[2].width;
                border.args = drawSide({
                        c1: [bx + bw, by + bh],
                        c2: [bx, by + bh],
                        c3: [bx + borders[3].width, by],
                        c4: [bx + bw - borders[3].width, by]
                    }, radius[2], radius[3],
                    borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
                border.pathArgs = drawSidePath({
                        c1: [pathBounds.right, pathBounds.bottom],
                        c2: [pathBounds.left, pathBounds.bottom]
                    }, radius[2], radius[3],
                    borderPoints.bottomRight, borderPoints.bottomLeft);
                break;
            case 3:
                // left border
                bw = borders[3].width;
                border.args = drawSide({
                        c1: [bx, by + bh + borders[2].width],
                        c2: [bx, by],
                        c3: [bx + bw, by + borders[0].width],
                        c4: [bx + bw, by + bh]
                    }, radius[3], radius[0],
                    borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
                border.pathArgs = drawSidePath({
                        c1: [pathBounds.left, pathBounds.bottom],
                        c2: [pathBounds.left, pathBounds.top]
                    }, radius[3], radius[0],
                    borderPoints.bottomLeft, borderPoints.topLeft);
                break;
            }
        }
        return border;
    });
}

NodeParser.prototype.parseBackgroundClip = function(container, borderPoints, borders, radius, bounds) {
    var backgroundClip = container.css('backgroundClip'),
        borderArgs = [];

    switch(backgroundClip) {
    case "content-box":
    case "padding-box":
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
        break;

    default:
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
        break;
    }

    return borderArgs;
};

function getCurvePoints(x, y, r1, r2) {
    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
    var ox = (r1) * kappa, // control point offset horizontal
        oy = (r2) * kappa, // control point offset vertical
        xm = x + r1, // x-middle
        ym = y + r2; // y-middle
    return {
        topLeft: bezierCurve({x: x, y: ym}, {x: x, y: ym - oy}, {x: xm - ox, y: y}, {x: xm, y: y}),
        topRight: bezierCurve({x: x, y: y}, {x: x + ox,y: y}, {x: xm, y: ym - oy}, {x: xm, y: ym}),
        bottomRight: bezierCurve({x: xm, y: y}, {x: xm, y: y + oy}, {x: x + ox, y: ym}, {x: x, y: ym}),
        bottomLeft: bezierCurve({x: xm, y: ym}, {x: xm - ox, y: ym}, {x: x, y: y + oy}, {x: x, y:y})
    };
}

function calculateCurvePoints(bounds, borderRadius, borders) {
    var x = bounds.left,
        y = bounds.top,
        width = bounds.width,
        height = bounds.height,

        tlh = borderRadius[0][0] < width / 2 ? borderRadius[0][0] : width / 2,
        tlv = borderRadius[0][1] < height / 2 ? borderRadius[0][1] : height / 2,
        trh = borderRadius[1][0] < width / 2 ? borderRadius[1][0] : width / 2,
        trv = borderRadius[1][1] < height / 2 ? borderRadius[1][1] : height / 2,
        brh = borderRadius[2][0] < width / 2 ? borderRadius[2][0] : width / 2,
        brv = borderRadius[2][1] < height / 2 ? borderRadius[2][1] : height / 2,
        blh = borderRadius[3][0] < width / 2 ? borderRadius[3][0] : width / 2,
        blv = borderRadius[3][1] < height / 2 ? borderRadius[3][1] : height / 2;

    var topWidth = width - trh,
        rightHeight = height - brv,
        bottomWidth = width - brh,
        leftHeight = height - blv;

    return {
        topLeft: getCurvePoints(x + borders[3].width/2, y + borders[0].width/2, Math.max(0, tlh - borders[3].width/2), Math.max(0, tlv - borders[0].width/2)).topLeft.subdivide(0.5),
        topRight: getCurvePoints(x + Math.min(topWidth, width + borders[3].width/2), y + borders[0].width/2, (topWidth > width + borders[3].width/2) ? 0 :trh - borders[3].width/2, trv - borders[0].width/2).topRight.subdivide(0.5),
        bottomRight: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width/2), y + Math.min(rightHeight, height + borders[0].width/2), Math.max(0, brh - borders[1].width/2),  brv - borders[2].width/2).bottomRight.subdivide(0.5),
        bottomLeft: getCurvePoints(x + borders[3].width/2, y + leftHeight, Math.max(0, blh - borders[3].width/2), blv - borders[2].width/2).bottomLeft.subdivide(0.5),

        topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
        topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
        topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
        topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
        bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
        bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width),  brv - borders[2].width).bottomRight.subdivide(0.5),
        bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
        bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
    };
}

function bezierCurve(start, startControl, endControl, end) {
    var lerp = function (a, b, t) {
        return {
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t
        };
    };

    return {
        start: start,
        startControl: startControl,
        endControl: endControl,
        end: end,
        subdivide: function(t) {
            var ab = lerp(start, startControl, t),
                bc = lerp(startControl, endControl, t),
                cd = lerp(endControl, end, t),
                abbc = lerp(ab, bc, t),
                bccd = lerp(bc, cd, t),
                dest = lerp(abbc, bccd, t);
            return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
        },
        curveTo: function(borderArgs) {
            borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
        },
        curveToReversed: function(borderArgs) {
            borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
        }
    };
}

function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
    var borderArgs = [];

    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
        outer1[1].curveTo(borderArgs);
    } else {
        borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
        borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
        outer2[0].curveTo(borderArgs);
        borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
        inner2[0].curveToReversed(borderArgs);
    } else {
        borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
        borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
    }

    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
        inner1[1].curveToReversed(borderArgs);
    } else {
        borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
    }

    return borderArgs;
}

function drawSidePath(borderData, radius1, radius2, curve1, curve2) {
    var borderArgs = [];
    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", curve1[1].start.x, curve1[1].start.y]);
        curve1[1].curveTo(borderArgs);
    } else {
        borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
    }
    if (radius2[0] > 0 || radius2[1] > 0) {
        borderArgs.push(["line", curve2[0].start.x, curve2[0].start.y]);
        curve2[0].curveTo(borderArgs);
    } else {
        borderArgs.push([ "line", borderData.c2[0], borderData.c2[1]]);
    }

    return borderArgs;
}

function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
        corner1[0].curveTo(borderArgs);
        corner1[1].curveTo(borderArgs);
    } else {
        borderArgs.push(["line", x, y]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
        borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
    }
}

function negativeZIndex(container) {
    return container.cssInt("zIndex") < 0;
}

function positiveZIndex(container) {
    return container.cssInt("zIndex") > 0;
}

function zIndex0(container) {
    return container.cssInt("zIndex") === 0;
}

function inlineLevel(container) {
    return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
}

function isStackingContext(container) {
    return (container instanceof StackingContext);
}

function hasText(container) {
    return container.node.data.trim().length > 0;
}

function noLetterSpacing(container) {
    return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
}

function getBorderRadiusData(container) {
    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
        var value = container.css('border' + side + 'Radius');
        var arr = value.split(" ");
        if (arr.length <= 1) {
            arr[1] = arr[0];
        }
        return arr.map(asInt);
    });
}

function renderableNode(node) {
    return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
}

function isPositionedForStacking(container) {
    var position = container.css("position");
    var zIndex = (["absolute", "relative", "fixed"].indexOf(position) !== -1) ? container.css("zIndex") : "auto";
    return zIndex !== "auto";
}

function isPositioned(container) {
    return container.css("position") !== "static";
}

function isFloating(container) {
    return container.css("float") !== "none";
}

function isInlineBlock(container) {
    return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
}

function not(callback) {
    var context = this;
    return function() {
        return !callback.apply(context, arguments);
    };
}

function isElement(container) {
    return container.node.nodeType === Node.ELEMENT_NODE;
}

function isPseudoElement(container) {
    return container.isPseudoElement === true;
}

function isTextNode(container) {
    return container.node.nodeType === Node.TEXT_NODE;
}

function zIndexSort(contexts) {
    return function(a, b) {
        return (a.cssInt("zIndex") + (contexts.indexOf(a) / contexts.length)) - (b.cssInt("zIndex") + (contexts.indexOf(b) / contexts.length));
    };
}

function hasOpacity(container) {
    return container.getOpacity() < 1;
}

function asInt(value) {
    return parseInt(value, 10);
}

function getWidth(border) {
    return border.width;
}

function nonIgnoredElement(nodeContainer) {
    return (nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1);
}

function flatten(arrays) {
    return [].concat.apply([], arrays);
}

function stripQuotes(content) {
    var first = content.substr(0, 1);
    return (first === content.substr(content.length - 1) && first.match(/'|"/)) ? content.substr(1, content.length - 2) : content;
}

function getWords(characters) {
    var words = [], i = 0, onWordBoundary = false, word;
    while(characters.length) {
        if (isWordBoundary(characters[i]) === onWordBoundary) {
            word = characters.splice(0, i);
            if (word.length) {
                words.push(punycode.ucs2.encode(word));
            }
            onWordBoundary =! onWordBoundary;
            i = 0;
        } else {
            i++;
        }

        if (i >= characters.length) {
            word = characters.splice(0, i);
            if (word.length) {
                words.push(punycode.ucs2.encode(word));
            }
        }
    }
    return words;
}

function isWordBoundary(characterCode) {
    return [
        32, // <space>
        13, // \r
        10, // \n
        9, // \t
        45 // -
    ].indexOf(characterCode) !== -1;
}

function hasUnicode(string) {
    return (/[^\u0000-\u00ff]/).test(string);
}

module.exports = NodeParser;

},{"./color":3,"./fontmetrics":7,"./log":13,"./nodecontainer":14,"./pseudoelementcontainer":18,"./stackingcontext":21,"./textcontainer":25,"./utils":26,"punycode":1}],16:[function(_dereq_,module,exports){
var XHR = _dereq_('./xhr');
var utils = _dereq_('./utils');
var log = _dereq_('./log');
var createWindowClone = _dereq_('./clone');
var decode64 = utils.decode64;

function Proxy(src, proxyUrl, document) {
    var supportsCORS = ('withCredentials' in new XMLHttpRequest());
    if (!proxyUrl) {
        return Promise.reject("No proxy configured");
    }
    var callback = createCallback(supportsCORS);
    var url = createProxyUrl(proxyUrl, src, callback);

    return supportsCORS ? XHR(url) : (jsonp(document, url, callback).then(function(response) {
        return decode64(response.content);
    }));
}
var proxyCount = 0;

function ProxyURL(src, proxyUrl, document) {
    var supportsCORSImage = ('crossOrigin' in new Image());
    var callback = createCallback(supportsCORSImage);
    var url = createProxyUrl(proxyUrl, src, callback);
    return (supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function(response) {
        return "data:" + response.type + ";base64," + response.content;
    }));
}

function jsonp(document, url, callback) {
    return new Promise(function(resolve, reject) {
        var s = document.createElement("script");
        var cleanup = function() {
            delete window.html2canvas.proxy[callback];
            document.body.removeChild(s);
        };
        window.html2canvas.proxy[callback] = function(response) {
            cleanup();
            resolve(response);
        };
        s.src = url;
        s.onerror = function(e) {
            cleanup();
            reject(e);
        };
        document.body.appendChild(s);
    });
}

function createCallback(useCORS) {
    return !useCORS ? "html2canvas_" + Date.now() + "_" + (++proxyCount) + "_" + Math.round(Math.random() * 100000) : "";
}

function createProxyUrl(proxyUrl, src, callback) {
    return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
}

function documentFromHTML(src) {
    return function(html) {
        var parser = new DOMParser(), doc;
        try {
            doc = parser.parseFromString(html, "text/html");
        } catch(e) {
            log("DOMParser not supported, falling back to createHTMLDocument");
            doc = document.implementation.createHTMLDocument("");
            try {
                doc.open();
                doc.write(html);
                doc.close();
            } catch(ee) {
                log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
                doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
            }
        }

        var b = doc.querySelector("base");
        if (!b || !b.href.host) {
            var base = doc.createElement("base");
            base.href = src;
            doc.head.insertBefore(base, doc.head.firstChild);
        }

        return doc;
    };
}

function loadUrlDocument(src, proxy, document, width, height, options) {
    return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function(doc) {
        return createWindowClone(doc, document, width, height, options, 0, 0);
    });
}

exports.Proxy = Proxy;
exports.ProxyURL = ProxyURL;
exports.loadUrlDocument = loadUrlDocument;

},{"./clone":2,"./log":13,"./utils":26,"./xhr":28}],17:[function(_dereq_,module,exports){
var ProxyURL = _dereq_('./proxy').ProxyURL;

function ProxyImageContainer(src, proxy) {
    var link = document.createElement("a");
    link.href = src;
    src = link.href;
    this.src = src;
    this.image = new Image();
    var self = this;
    this.promise = new Promise(function(resolve, reject) {
        self.image.crossOrigin = "Anonymous";
        self.image.onload = resolve;
        self.image.onerror = reject;

        new ProxyURL(src, proxy, document).then(function(url) {
            self.image.src = url;
        })['catch'](reject);
    });
}

module.exports = ProxyImageContainer;

},{"./proxy":16}],18:[function(_dereq_,module,exports){
var NodeContainer = _dereq_('./nodecontainer');

function PseudoElementContainer(node, parent, type) {
    NodeContainer.call(this, node, parent);
    this.isPseudoElement = true;
    this.before = type === ":before";
}

PseudoElementContainer.prototype.cloneTo = function(stack) {
    PseudoElementContainer.prototype.cloneTo.call(this, stack);
    stack.isPseudoElement = true;
    stack.before = this.before;
};

PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

PseudoElementContainer.prototype.appendToDOM = function() {
    if (this.before) {
        this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
    } else {
        this.parent.node.appendChild(this.node);
    }
    this.parent.node.className += " " + this.getHideClass();
};

PseudoElementContainer.prototype.cleanDOM = function() {
    this.node.parentNode.removeChild(this.node);
    this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
};

PseudoElementContainer.prototype.getHideClass = function() {
    return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
};

PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

module.exports = PseudoElementContainer;

},{"./nodecontainer":14}],19:[function(_dereq_,module,exports){
var log = _dereq_('./log');

function Renderer(width, height, images, options, document) {
    this.width = width;
    this.height = height;
    this.images = images;
    this.options = options;
    this.document = document;
}

Renderer.prototype.renderImage = function(container, bounds, borderData, imageContainer) {
    var paddingLeft = container.cssInt('paddingLeft'),
        paddingTop = container.cssInt('paddingTop'),
        paddingRight = container.cssInt('paddingRight'),
        paddingBottom = container.cssInt('paddingBottom'),
        borders = borderData.borders;

    var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
    var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
    this.drawImage(
        imageContainer,
        0,
        0,
        imageContainer.image.width || width,
        imageContainer.image.height || height,
        bounds.left + paddingLeft + borders[3].width,
        bounds.top + paddingTop + borders[0].width,
        width,
        height
    );
};

Renderer.prototype.renderBackground = function(container, bounds, borderData) {
    if (bounds.height > 0 && bounds.width > 0) {
        this.renderBackgroundColor(container, bounds);
        this.renderBackgroundImage(container, bounds, borderData);
    }
};

Renderer.prototype.renderBackgroundColor = function(container, bounds) {
    var color = container.color("backgroundColor");
    if (!color.isTransparent()) {
        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
    }
};

Renderer.prototype.renderShadows = function(container, shape) {
    var boxShadow = container.css('boxShadow');
    if (boxShadow !== 'none') {
        var shadows = boxShadow.split(/,(?![^(]*\))/);
        this.shadow(shape, shadows);
    }
};

Renderer.prototype.renderBorders = function(borders) {
    borders.forEach(this.renderBorder, this);
};

Renderer.prototype.renderBorder = function(data) {
    if (!data.color.isTransparent() && data.args !== null) {
        if (data.style === 'dashed' || data.style === 'dotted') {
            var dash = (data.style === 'dashed') ? 3 : data.width;
            this.ctx.setLineDash([dash]);
            this.path(data.pathArgs);
            this.ctx.strokeStyle = data.color;
            this.ctx.lineWidth = data.width;
            this.ctx.stroke();
        } else {
            this.drawShape(data.args, data.color);
        }
    }
};

Renderer.prototype.renderBackgroundImage = function(container, bounds, borderData) {
    var backgroundImages = container.parseBackgroundImages();
    backgroundImages.reverse().forEach(function(backgroundImage, index, arr) {
        switch(backgroundImage.method) {
        case "url":
            var image = this.images.get(backgroundImage.args[0]);
            if (image) {
                this.renderBackgroundRepeating(container, bounds, image, arr.length - (index+1), borderData);
            } else {
                log("Error loading background-image", backgroundImage.args[0]);
            }
            break;
        case "linear-gradient":
        case "gradient":
            var gradientImage = this.images.get(backgroundImage.value);
            if (gradientImage) {
                this.renderBackgroundGradient(gradientImage, bounds, borderData);
            } else {
                log("Error loading background-image", backgroundImage.args[0]);
            }
            break;
        case "none":
            break;
        default:
            log("Unknown background-image type", backgroundImage.args[0]);
        }
    }, this);
};

Renderer.prototype.renderBackgroundRepeating = function(container, bounds, imageContainer, index, borderData) {
    var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
    var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
    var repeat = container.parseBackgroundRepeat(index);
    switch (repeat) {
    case "repeat-x":
    case "repeat no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
        break;
    case "repeat-y":
    case "no-repeat repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
        break;
    case "no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
        break;
    default:
        this.renderBackgroundRepeat(imageContainer, position, size, {top: bounds.top, left: bounds.left}, borderData[3], borderData[0]);
        break;
    }
};

module.exports = Renderer;

},{"./log":13}],20:[function(_dereq_,module,exports){
var Renderer = _dereq_('../renderer');
var LinearGradientContainer = _dereq_('../lineargradientcontainer');
var log = _dereq_('../log');

function CanvasRenderer(width, height) {
    Renderer.apply(this, arguments);
    this.canvas = this.options.canvas || this.document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    if (!this.options.canvas) {
        if (this.options.dpi) {
            this.options.scale = this.options.dpi / 96;   // 1 CSS inch = 96px.
        }
        if (this.options.scale) {
            this.canvas.style.width = width + 'px';
            this.canvas.style.height = height + 'px';
            this.canvas.width = Math.floor(width * this.options.scale);
            this.canvas.height = Math.floor(height * this.options.scale);
            this.ctx.scale(this.options.scale, this.options.scale);
        } else {
            this.canvas.width = width;
            this.canvas.height = height;
        }
    }
    this.taintCtx = this.document.createElement("canvas").getContext("2d");
    this.ctx.textBaseline = "bottom";
    this.variables = {};
    log("Initialized CanvasRenderer with size", width, "x", height);
}

CanvasRenderer.prototype = Object.create(Renderer.prototype);

CanvasRenderer.prototype.setFillStyle = function(fillStyle) {
    this.ctx.fillStyle = typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
    return this.ctx;
};

CanvasRenderer.prototype.rectangle = function(left, top, width, height, color) {
    this.setFillStyle(color).fillRect(left, top, width, height);
};

CanvasRenderer.prototype.circle = function(left, top, size, color) {
    this.setFillStyle(color);
    this.ctx.beginPath();
    this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI*2, true);
    this.ctx.closePath();
    this.ctx.fill();
};

CanvasRenderer.prototype.circleStroke = function(left, top, size, color, stroke, strokeColor) {
    this.circle(left, top, size, color);
    this.ctx.strokeStyle = strokeColor.toString();
    this.ctx.stroke();
};

CanvasRenderer.prototype.shadow = function(shape, shadows) {
    var parseShadow = function(str) {
        var propertyFilters = { color: /^(#|rgb|hsl|(?!(inset|initial|inherit))\D+)/i, inset: /^inset/i, px: /px$/i };
        var pxPropertyNames = [ 'x', 'y', 'blur', 'spread' ];
        var properties = str.split(/ (?![^(]*\))/);
        var info = {};
        for (var key in propertyFilters) {
            info[key] = properties.filter(propertyFilters[key].test.bind(propertyFilters[key]));
            info[key] = info[key].length === 0 ? null : info[key].length === 1 ? info[key][0] : info[key];
        }
        for (var i=0; i<info.px.length; i++) {
            info[pxPropertyNames[i]] = parseInt(info.px[i]);
        }
        return info;
    };
    var drawShadow = function(shadow) {
        var info = parseShadow(shadow);
        if (!info.inset) {
            context.shadowOffsetX = info.x;
            context.shadowOffsetY = info.y;
            context.shadowColor = info.color;
            context.shadowBlur = info.blur;
            context.fill();
        }
    };
    var context = this.setFillStyle('white');
    context.save();
    this.shape(shape);
    shadows.forEach(drawShadow, this);
    context.restore();
};

CanvasRenderer.prototype.drawShape = function(shape, color) {
    this.shape(shape);
    this.setFillStyle(color).fill();
};

CanvasRenderer.prototype.taints = function(imageContainer) {
    if (imageContainer.tainted === null) {
        this.taintCtx.drawImage(imageContainer.image, 0, 0);
        try {
            this.taintCtx.getImageData(0, 0, 1, 1);
            imageContainer.tainted = false;
        } catch(e) {
            this.taintCtx = document.createElement("canvas").getContext("2d");
            imageContainer.tainted = true;
        }
    }

    return imageContainer.tainted;
};

CanvasRenderer.prototype.drawImage = function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (!this.taints(imageContainer) || this.options.allowTaint) {
        this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
};

CanvasRenderer.prototype.clip = function(shapes, callback, context, container) {
    this.ctx.save();
    if (container && container.hasTransform()) {
        this.setTransform(container.inverseTransform());
        shapes.filter(hasEntries).forEach(function(shape) {
            this.shape(shape).clip();
        }, this);
        this.setTransform(container.parseTransform());
    } else {
        shapes.filter(hasEntries).forEach(function(shape) {
            this.shape(shape).clip();
        }, this);
    }
    callback.call(context);
    this.ctx.restore();
};

CanvasRenderer.prototype.mask = function(shapes, callback, context, container) {
    var borderClip = shapes[shapes.length-1];
    if (borderClip && borderClip.length) {
        var canvasBorderCCW = ["rect", this.canvas.width, 0, -this.canvas.width, this.canvas.height];
        var maskShape = [canvasBorderCCW].concat(borderClip).concat([borderClip[0]]);
        shapes = shapes.slice(0,-1).concat([maskShape]);
    }
    this.clip(shapes, callback, context, container);
};

CanvasRenderer.prototype.shape = function(shape) {
    this.ctx.beginPath();
    shape.forEach(function(point, index) {
        if (point[0] === "rect") {
            this.ctx.rect.apply(this.ctx, point.slice(1));
        } else {
            this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
        }
    }, this);
    this.ctx.closePath();
    return this.ctx;
};

CanvasRenderer.prototype.path = function(shape) {
    this.ctx.beginPath();
    shape.forEach(function(point, index) {
        if (point[0] === "rect") {
            this.ctx.rect.apply(this.ctx, point.slice(1));
        } else {
            this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
        }
    }, this);
    return this.ctx;
};

CanvasRenderer.prototype.font = function(color, style, variant, weight, size, family) {
    variant = /^(normal|small-caps)$/i.test(variant) ? variant : '';
    this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
};

CanvasRenderer.prototype.fontShadow = function(color, offsetX, offsetY, blur) {
    this.setVariable("shadowColor", color.toString())
        .setVariable("shadowOffsetY", offsetX)
        .setVariable("shadowOffsetX", offsetY)
        .setVariable("shadowBlur", blur);
};

CanvasRenderer.prototype.clearShadow = function() {
    this.setVariable("shadowColor", "rgba(0,0,0,0)");
};

CanvasRenderer.prototype.setOpacity = function(opacity) {
    this.ctx.globalAlpha = opacity;
};

CanvasRenderer.prototype.setTransform = function(transform) {
    this.ctx.translate(transform.origin[0], transform.origin[1]);
    this.ctx.transform.apply(this.ctx, transform.matrix);
    this.ctx.translate(-transform.origin[0], -transform.origin[1]);
};

CanvasRenderer.prototype.setVariable = function(property, value) {
    if (this.variables[property] !== value) {
        this.variables[property] = this.ctx[property] = value;
    }

    return this;
};

CanvasRenderer.prototype.text = function(text, left, bottom) {
    this.ctx.fillText(text, left, bottom);
};

CanvasRenderer.prototype.backgroundRepeatShape = function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
    var shape = [
        ["line", Math.round(left), Math.round(top)],
        ["line", Math.round(left + width), Math.round(top)],
        ["line", Math.round(left + width), Math.round(height + top)],
        ["line", Math.round(left), Math.round(height + top)]
    ];
    this.clip([shape], function() {
        this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
    }, this);
};

CanvasRenderer.prototype.renderBackgroundRepeat = function(imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
    var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft), offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
    this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
    this.ctx.translate(offsetX, offsetY);
    this.ctx.fill();
    this.ctx.translate(-offsetX, -offsetY);
};

CanvasRenderer.prototype.renderBackgroundGradient = function(gradientImage, bounds) {
    if (gradientImage instanceof LinearGradientContainer) {
        var gradient = this.ctx.createLinearGradient(
            bounds.left + bounds.width * gradientImage.x0,
            bounds.top + bounds.height * gradientImage.y0,
            bounds.left +  bounds.width * gradientImage.x1,
            bounds.top +  bounds.height * gradientImage.y1);
        gradientImage.colorStops.forEach(function(colorStop) {
            gradient.addColorStop(colorStop.stop, colorStop.color.toString());
        });
        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
    }
};

CanvasRenderer.prototype.resizeImage = function(imageContainer, size) {
    var image = imageContainer.image;
    if(image.width === size.width && image.height === size.height) {
        return image;
    }

    var ctx, canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height );
    return canvas;
};

function hasEntries(array) {
    return array.length > 0;
}

module.exports = CanvasRenderer;

},{"../lineargradientcontainer":12,"../log":13,"../renderer":19}],21:[function(_dereq_,module,exports){
var NodeContainer = _dereq_('./nodecontainer');

function StackingContext(hasOwnStacking, opacity, element, parent) {
    NodeContainer.call(this, element, parent);
    this.ownStacking = hasOwnStacking;
    this.contexts = [];
    this.children = [];
    this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
}

StackingContext.prototype = Object.create(NodeContainer.prototype);

StackingContext.prototype.getParentStack = function(context) {
    var parentStack = (this.parent) ? this.parent.stack : null;
    return parentStack ? (parentStack.ownStacking ? parentStack : parentStack.getParentStack(context)) : context.stack;
};

module.exports = StackingContext;

},{"./nodecontainer":14}],22:[function(_dereq_,module,exports){
function Support(document) {
    this.rangeBounds = this.testRangeBounds(document);
    this.cors = this.testCORS();
    this.svg = this.testSVG();
}

Support.prototype.testRangeBounds = function(document) {
    var range, testElement, rangeBounds, rangeHeight, support = false;

    if (document.createRange) {
        range = document.createRange();
        if (range.getBoundingClientRect) {
            testElement = document.createElement('boundtest');
            testElement.style.height = "123px";
            testElement.style.display = "block";
            document.body.appendChild(testElement);

            range.selectNode(testElement);
            rangeBounds = range.getBoundingClientRect();
            rangeHeight = rangeBounds.height;

            if (rangeHeight === 123) {
                support = true;
            }
            document.body.removeChild(testElement);
        }
    }

    return support;
};

Support.prototype.testCORS = function() {
    return typeof((new Image()).crossOrigin) !== "undefined";
};

Support.prototype.testSVG = function() {
    var img = new Image();
    var canvas = document.createElement("canvas");
    var ctx =  canvas.getContext("2d");
    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

    try {
        ctx.drawImage(img, 0, 0);
        canvas.toDataURL();
    } catch(e) {
        return false;
    }
    return true;
};

module.exports = Support;

},{}],23:[function(_dereq_,module,exports){
var XHR = _dereq_('./xhr');
var decode64 = _dereq_('./utils').decode64;

function SVGContainer(src) {
    this.src = src;
    this.image = null;
    var self = this;

    this.promise = this.hasFabric().then(function() {
        return (self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src));
    }).then(function(svg) {
        return new Promise(function(resolve) {
            window.html2canvas.svg.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
        });
    });
}

SVGContainer.prototype.hasFabric = function() {
    return !window.html2canvas.svg || !window.html2canvas.svg.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
};

SVGContainer.prototype.inlineFormatting = function(src) {
    return (/^data:image\/svg\+xml;base64,/.test(src)) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
};

SVGContainer.prototype.removeContentType = function(src) {
    return src.replace(/^data:image\/svg\+xml(;base64)?,/,'');
};

SVGContainer.prototype.isInline = function(src) {
    return (/^data:image\/svg\+xml/i.test(src));
};

SVGContainer.prototype.createCanvas = function(resolve) {
    var self = this;
    return function (objects, options) {
        var canvas = new window.html2canvas.svg.fabric.StaticCanvas('c');
        self.image = canvas.lowerCanvasEl;
        canvas
            .setWidth(options.width)
            .setHeight(options.height)
            .add(window.html2canvas.svg.fabric.util.groupSVGElements(objects, options))
            .renderAll();
        resolve(canvas.lowerCanvasEl);
    };
};

SVGContainer.prototype.decode64 = function(str) {
    return (typeof(window.atob) === "function") ? window.atob(str) : decode64(str);
};

module.exports = SVGContainer;

},{"./utils":26,"./xhr":28}],24:[function(_dereq_,module,exports){
var SVGContainer = _dereq_('./svgcontainer');

function SVGNodeContainer(node, _native) {
    this.src = node;
    this.image = null;
    var self = this;

    this.promise = _native ? new Promise(function(resolve, reject) {
        self.image = new Image();
        self.image.onload = resolve;
        self.image.onerror = reject;
        self.image.src = "data:image/svg+xml," + (new XMLSerializer()).serializeToString(node);
        if (self.image.complete === true) {
            resolve(self.image);
        }
    }) : this.hasFabric().then(function() {
        return new Promise(function(resolve) {
            window.html2canvas.svg.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
        });
    });
}

SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);

module.exports = SVGNodeContainer;

},{"./svgcontainer":23}],25:[function(_dereq_,module,exports){
var NodeContainer = _dereq_('./nodecontainer');

function TextContainer(node, parent) {
    NodeContainer.call(this, node, parent);
}

TextContainer.prototype = Object.create(NodeContainer.prototype);

TextContainer.prototype.applyTextTransform = function() {
    this.node.data = this.transform(this.parent.css("textTransform"));
};

TextContainer.prototype.transform = function(transform) {
    var text = this.node.data;
    switch(transform){
        case "lowercase":
            return text.toLowerCase();
        case "capitalize":
            return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
        case "uppercase":
            return text.toUpperCase();
        default:
            return text;
    }
};

function capitalize(m, p1, p2) {
    if (m.length > 0) {
        return p1 + p2.toUpperCase();
    }
}

module.exports = TextContainer;

},{"./nodecontainer":14}],26:[function(_dereq_,module,exports){
exports.smallImage = function smallImage() {
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
};

exports.bind = function(callback, context) {
    return function() {
        return callback.apply(context, arguments);
    };
};

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

exports.decode64 = function(base64) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var len = base64.length, i, encoded1, encoded2, encoded3, encoded4, byte1, byte2, byte3;

    var output = "";

    for (i = 0; i < len; i+=4) {
        encoded1 = chars.indexOf(base64[i]);
        encoded2 = chars.indexOf(base64[i+1]);
        encoded3 = chars.indexOf(base64[i+2]);
        encoded4 = chars.indexOf(base64[i+3]);

        byte1 = (encoded1 << 2) | (encoded2 >> 4);
        byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        byte3 = ((encoded3 & 3) << 6) | encoded4;
        if (encoded3 === 64) {
            output += String.fromCharCode(byte1);
        } else if (encoded4 === 64 || encoded4 === -1) {
            output += String.fromCharCode(byte1, byte2);
        } else{
            output += String.fromCharCode(byte1, byte2, byte3);
        }
    }

    return output;
};

exports.getBounds = function(node) {
    if (node.getBoundingClientRect) {
        var clientRect = node.getBoundingClientRect();
        var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
        return {
            top: clientRect.top,
            bottom: clientRect.bottom || (clientRect.top + clientRect.height),
            right: clientRect.left + width,
            left: clientRect.left,
            width:  width,
            height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
        };
    }
    return {};
};

exports.offsetBounds = function(node) {
    var parent = node.offsetParent ? exports.offsetBounds(node.offsetParent) : {top: 0, left: 0};

    return {
        top: node.offsetTop + parent.top,
        bottom: node.offsetTop + node.offsetHeight + parent.top,
        right: node.offsetLeft + parent.left + node.offsetWidth,
        left: node.offsetLeft + parent.left,
        width: node.offsetWidth,
        height: node.offsetHeight
    };
};

exports.parseBackgrounds = function(backgroundImage) {
    var whitespace = ' \r\n\t',
        method, definition, prefix, prefix_i, block, results = [],
        mode = 0, numParen = 0, quote, args;
    var appendResult = function() {
        if(method) {
            if (definition.substr(0, 1) === '"') {
                definition = definition.substr(1, definition.length - 2);
            }
            if (definition) {
                args.push(definition);
            }
            if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1 ) + 1) > 0) {
                prefix = method.substr(0, prefix_i);
                method = method.substr(prefix_i);
            }
            results.push({
                prefix: prefix,
                method: method.toLowerCase(),
                value: block,
                args: args,
                image: null
            });
        }
        args = [];
        method = prefix = definition = block = '';
    };
    args = [];
    method = prefix = definition = block = '';
    backgroundImage.split("").forEach(function(c) {
        if (mode === 0 && whitespace.indexOf(c) > -1) {
            return;
        }
        switch(c) {
        case '"':
            if(!quote) {
                quote = c;
            } else if(quote === c) {
                quote = null;
            }
            break;
        case '(':
            if(quote) {
                break;
            } else if(mode === 0) {
                mode = 1;
                block += c;
                return;
            } else {
                numParen++;
            }
            break;
        case ')':
            if (quote) {
                break;
            } else if(mode === 1) {
                if(numParen === 0) {
                    mode = 0;
                    block += c;
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
            } else if(mode === 0) {
                appendResult();
                return;
            } else if (mode === 1) {
                if (numParen === 0 && !method.match(/^url$/i)) {
                    args.push(definition);
                    definition = '';
                    block += c;
                    return;
                }
            }
            break;
        }

        block += c;
        if (mode === 0) {
            method += c;
        } else {
            definition += c;
        }
    });

    appendResult();
    return results;
};

},{}],27:[function(_dereq_,module,exports){
var GradientContainer = _dereq_('./gradientcontainer');

function WebkitGradientContainer(imageData) {
    GradientContainer.apply(this, arguments);
    this.type = imageData.args[0] === "linear" ? GradientContainer.TYPES.LINEAR : GradientContainer.TYPES.RADIAL;
}

WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);

module.exports = WebkitGradientContainer;

},{"./gradientcontainer":9}],28:[function(_dereq_,module,exports){
function XHR(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.statusText));
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}

module.exports = XHR;

},{}]},{},[4])(4)
});
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

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

/**
 * Generate a PDF from an HTML element or string using html2canvas and jsPDF.
 *
 * @param {Element|string} source The source element or HTML string.
 * @param {Object=} opt An object of optional settings: 'margin', 'filename',
 *    'image' ('type' and 'quality'), and 'html2canvas' / 'jspdf', which are
 *    sent as settings to their corresponding functions.
 */
var html2pdf = function html2pdf(source, opt) {
  // Handle input.
  opt = objType(opt) === 'object' ? opt : {};
  var source = html2pdf.parseInput(source, opt);

  // Determine the PDF page size.
  var pageSize = jspdf_min.getPageSize(opt.jsPDF);
  pageSize.inner = {
    width: pageSize.width - opt.margin[1] - opt.margin[3],
    height: pageSize.height - opt.margin[0] - opt.margin[2]
  };
  pageSize.inner.ratio = pageSize.inner.height / pageSize.inner.width;

  // Copy the source element into a PDF-styled container div.
  var container = html2pdf.makeContainer(source, pageSize);
  var overlay = container.parentElement;

  // Get the locations of all hyperlinks.
  if (opt.enableLinks) {
    // Find all anchor tags and get the container's bounds for reference.
    opt.links = [];
    var links = container.querySelectorAll('a');
    var containerRect = unitConvert(container.getBoundingClientRect(), pageSize.k);

    // Treat each client rect as a separate link (for text-wrapping).
    Array.prototype.forEach.call(links, function (link) {
      var clientRects = link.getClientRects();
      for (var i = 0; i < clientRects.length; i++) {
        var clientRect = unitConvert(clientRects[i], pageSize.k);
        clientRect.left -= containerRect.left;
        clientRect.top -= containerRect.top;
        opt.links.push({ el: link, clientRect: clientRect });
      }
    });
  }

  // Render the canvas and pass the result to makePDF.
  var onRendered = opt.html2canvas.onrendered || function () {};
  delete opt.html2canvas.onrendered;
  var done = function done(canvas) {
    onRendered(canvas);
    document.body.removeChild(overlay);
    html2pdf.makePDF(canvas, pageSize, opt);
  };
  html2canvas$1(container, opt.html2canvas).then(done);
};

html2pdf.parseInput = function (source, opt) {
  // Parse the opt object.
  opt.jsPDF = opt.jsPDF || {};
  opt.html2canvas = opt.html2canvas || {};
  opt.filename = opt.filename && objType(opt.filename) === 'string' ? opt.filename : 'file.pdf';
  opt.enableLinks = opt.hasOwnProperty('enableLinks') ? opt.enableLinks : true;
  opt.image = opt.image || {};
  opt.image.type = opt.image.type || 'jpeg';
  opt.image.quality = opt.image.quality || 0.95;

  // Parse the margin property of the opt object.
  switch (objType(opt.margin)) {
    case 'undefined':
      opt.margin = 0;
    case 'number':
      opt.margin = [opt.margin, opt.margin, opt.margin, opt.margin];
      break;
    case 'array':
      if (opt.margin.length === 2) {
        opt.margin = [opt.margin[0], opt.margin[1], opt.margin[0], opt.margin[1]];
      }
      if (opt.margin.length === 4) {
        break;
      }
    default:
      throw 'Invalid margin array.';
  }

  // Parse the source element/string.
  if (!source) {
    throw 'Missing source element or string.';
  } else if (objType(source) === 'string') {
    source = createElement('div', { innerHTML: source });
  } else if (objType(source) === 'element') {
    source = cloneNode(source, opt.html2canvas.javascriptEnabled);
  } else {
    throw 'Invalid source - please specify an HTML Element or string.';
  }

  // Return the parsed input (opt is modified in-place, no need to return).
  return source;
};

html2pdf.makeContainer = function (source, pageSize) {
  // Define the CSS styles for the container and its overlay parent.
  var overlayCSS = {
    position: 'fixed', overflow: 'hidden', zIndex: 1000,
    left: 0, right: 0, bottom: 0, top: 0,
    backgroundColor: 'rgba(0,0,0,0.8)'
  };
  var containerCSS = {
    position: 'absolute', width: pageSize.inner.width + pageSize.unit,
    left: 0, right: 0, top: 0, height: 'auto', margin: 'auto',
    backgroundColor: 'white'
  };

  // Set the overlay to hidden (could be changed in the future to provide a print preview).
  overlayCSS.opacity = 0;

  // Create and attach the elements.
  var overlay = createElement('div', { className: 'html2pdf__overlay', style: overlayCSS });
  var container = createElement('div', { className: 'html2pdf__container', style: containerCSS });
  container.appendChild(source);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Enable page-breaks.
  var pageBreaks = source.querySelectorAll('.html2pdf__page-break');
  var pxPageHeight = pageSize.inner.height * pageSize.k / 72 * 96;
  Array.prototype.forEach.call(pageBreaks, function (el) {
    el.style.display = 'block';
    var clientRect = el.getBoundingClientRect();
    el.style.height = pxPageHeight - clientRect.top % pxPageHeight + 'px';
  }, this);

  // Return the container.
  return container;
};

html2pdf.makePDF = function (canvas, pageSize, opt) {
  // Calculate the number of pages.
  var ctx = canvas.getContext('2d');
  var pxFullHeight = canvas.height;
  var pxPageHeight = Math.floor(canvas.width * pageSize.inner.ratio);
  var nPages = Math.ceil(pxFullHeight / pxPageHeight);

  // Create a one-page canvas to split up the full image.
  var pageCanvas = document.createElement('canvas');
  var pageCtx = pageCanvas.getContext('2d');
  var pageHeight = pageSize.inner.height;
  pageCanvas.width = canvas.width;
  pageCanvas.height = pxPageHeight;

  // Initialize the PDF.
  var pdf = new jspdf_min(opt.jsPDF);

  for (var page = 0; page < nPages; page++) {
    // Trim the final page to reduce file size.
    if (page === nPages - 1) {
      pageCanvas.height = pxFullHeight % pxPageHeight;
      pageHeight = pageCanvas.height * pageSize.inner.width / pageCanvas.width;
    }

    // Display the page.
    var w = pageCanvas.width;
    var h = pageCanvas.height;
    pageCtx.fillStyle = 'white';
    pageCtx.fillRect(0, 0, w, h);
    pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

    // Add the page to the PDF.
    if (page) pdf.addPage();
    var imgData = pageCanvas.toDataURL('image/' + opt.image.type, opt.image.quality);
    pdf.addImage(imgData, opt.image.type, opt.margin[1], opt.margin[0], pageSize.inner.width, pageHeight);

    // Add hyperlinks.
    if (opt.enableLinks) {
      var pageTop = page * pageSize.inner.height;
      opt.links.forEach(function (link) {
        if (link.clientRect.top > pageTop && link.clientRect.top < pageTop + pageSize.inner.height) {
          var left = opt.margin[1] + link.clientRect.left;
          var top = opt.margin[0] + link.clientRect.top - pageTop;
          pdf.link(left, top, link.clientRect.width, link.clientRect.height, { url: link.el.href });
        }
      });
    }
  }

  // Finish the PDF.
  pdf.save(opt.filename);
};

return html2pdf;

})));
