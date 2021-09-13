(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["flvjs"] = factory();
	else
		root["flvjs"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */
(function (global, factory) {
     true ? module.exports = factory() :
        0;
}(this, (function () {
    'use strict';
    function objectOrFunction(x) {
        var type = typeof x;
        return x !== null && (type === 'object' || type === 'function');
    }
    function isFunction(x) {
        return typeof x === 'function';
    }
    var _isArray = void 0;
    if (Array.isArray) {
        _isArray = Array.isArray;
    }
    else {
        _isArray = function (x) {
            return Object.prototype.toString.call(x) === '[object Array]';
        };
    }
    var isArray = _isArray;
    var len = 0;
    var vertxNext = void 0;
    var customSchedulerFn = void 0;
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
            }
            else {
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
    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
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
            var vertx = Function('return this')().require('vertx');
            vertxNext = vertx.runOnLoop || vertx.runOnContext;
            return useVertxTimer();
        }
        catch (e) {
            return useSetTimeout();
        }
    }
    var scheduleFlush = void 0;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (isNode) {
        scheduleFlush = useNextTick();
    }
    else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver();
    }
    else if (isWorker) {
        scheduleFlush = useMessageChannel();
    }
    else if (browserWindow === undefined && "function" === 'function') {
        scheduleFlush = attemptVertx();
    }
    else {
        scheduleFlush = useSetTimeout();
    }
    function then(onFulfillment, onRejection) {
        var parent = this;
        var child = new this.constructor(noop);
        if (child[PROMISE_ID] === undefined) {
            makePromise(child);
        }
        var _state = parent._state;
        if (_state) {
            var callback = arguments[_state - 1];
            asap(function () {
                return invokeCallback(_state, child, callback, parent._result);
            });
        }
        else {
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
    var PROMISE_ID = Math.random().toString(36).substring(2);
    function noop() { }
    var PENDING = void 0;
    var FULFILLED = 1;
    var REJECTED = 2;
    function selfFulfillment() {
        return new TypeError("You cannot resolve a promise with itself");
    }
    function cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.');
    }
    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
        try {
            then$$1.call(value, fulfillmentHandler, rejectionHandler);
        }
        catch (e) {
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
                }
                else {
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
        }
        else if (thenable._state === REJECTED) {
            reject(promise, thenable._result);
        }
        else {
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
        }
        else {
            if (then$$1 === undefined) {
                fulfill(promise, maybeThenable);
            }
            else if (isFunction(then$$1)) {
                handleForeignThenable(promise, maybeThenable, then$$1);
            }
            else {
                fulfill(promise, maybeThenable);
            }
        }
    }
    function resolve(promise, value) {
        if (promise === value) {
            reject(promise, selfFulfillment());
        }
        else if (objectOrFunction(value)) {
            var then$$1 = void 0;
            try {
                then$$1 = value.then;
            }
            catch (error) {
                reject(promise, error);
                return;
            }
            handleMaybeThenable(promise, value, then$$1);
        }
        else {
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
        var child = void 0, callback = void 0, detail = promise._result;
        for (var i = 0; i < subscribers.length; i += 3) {
            child = subscribers[i];
            callback = subscribers[i + settled];
            if (child) {
                invokeCallback(settled, child, callback, detail);
            }
            else {
                callback(detail);
            }
        }
        promise._subscribers.length = 0;
    }
    function invokeCallback(settled, promise, callback, detail) {
        var hasCallback = isFunction(callback), value = void 0, error = void 0, succeeded = true;
        if (hasCallback) {
            try {
                value = callback(detail);
            }
            catch (e) {
                succeeded = false;
                error = e;
            }
            if (promise === value) {
                reject(promise, cannotReturnOwn());
                return;
            }
        }
        else {
            value = detail;
        }
        if (promise._state !== PENDING) {
            // noop
        }
        else if (hasCallback && succeeded) {
            resolve(promise, value);
        }
        else if (succeeded === false) {
            reject(promise, error);
        }
        else if (settled === FULFILLED) {
            fulfill(promise, value);
        }
        else if (settled === REJECTED) {
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
        }
        catch (e) {
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
    function validationError() {
        return new Error('Array Methods must be provided an Array');
    }
    var Enumerator = function () {
        function Enumerator(Constructor, input) {
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
                }
                else {
                    this.length = this.length || 0;
                    this._enumerate(input);
                    if (this._remaining === 0) {
                        fulfill(this.promise, this._result);
                    }
                }
            }
            else {
                reject(this.promise, validationError());
            }
        }
        Enumerator.prototype._enumerate = function _enumerate(input) {
            for (var i = 0; this._state === PENDING && i < input.length; i++) {
                this._eachEntry(input[i], i);
            }
        };
        Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
            var c = this._instanceConstructor;
            var resolve$$1 = c.resolve;
            if (resolve$$1 === resolve$1) {
                var _then = void 0;
                var error = void 0;
                var didError = false;
                try {
                    _then = entry.then;
                }
                catch (e) {
                    didError = true;
                    error = e;
                }
                if (_then === then && entry._state !== PENDING) {
                    this._settledAt(entry._state, i, entry._result);
                }
                else if (typeof _then !== 'function') {
                    this._remaining--;
                    this._result[i] = entry;
                }
                else if (c === Promise$1) {
                    var promise = new c(noop);
                    if (didError) {
                        reject(promise, error);
                    }
                    else {
                        handleMaybeThenable(promise, entry, _then);
                    }
                    this._willSettleAt(promise, i);
                }
                else {
                    this._willSettleAt(new c(function (resolve$$1) {
                        return resolve$$1(entry);
                    }), i);
                }
            }
            else {
                this._willSettleAt(resolve$$1(entry), i);
            }
        };
        Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
            var promise = this.promise;
            if (promise._state === PENDING) {
                this._remaining--;
                if (state === REJECTED) {
                    reject(promise, value);
                }
                else {
                    this._result[i] = value;
                }
            }
            if (this._remaining === 0) {
                fulfill(promise, this._result);
            }
        };
        Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
            var enumerator = this;
            subscribe(promise, undefined, function (value) {
                return enumerator._settledAt(FULFILLED, i, value);
            }, function (reason) {
                return enumerator._settledAt(REJECTED, i, reason);
            });
        };
        return Enumerator;
    }();
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
    function all(entries) {
        return new Enumerator(this, entries).promise;
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
    function race(entries) {
        /*jshint validthis:true */
        var Constructor = this;
        if (!isArray(entries)) {
            return new Constructor(function (_, reject) {
                return reject(new TypeError('You must pass an array to race.'));
            });
        }
        else {
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
      @param {Function} resolver
      Useful for tooling.
      @constructor
    */
    var Promise$1 = function () {
        function Promise(resolver) {
            this[PROMISE_ID] = nextId();
            this._result = this._state = undefined;
            this._subscribers = [];
            if (noop !== resolver) {
                typeof resolver !== 'function' && needsResolver();
                this instanceof Promise ? initializePromise(this, resolver) : needsNew();
            }
        }
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
        Promise.prototype.catch = function _catch(onRejection) {
            return this.then(null, onRejection);
        };
        /**
          `finally` will be invoked regardless of the promise's fate just as native
          try/catch/finally behaves
        
          Synchronous example:
        
          ```js
          findAuthor() {
            if (Math.random() > 0.5) {
              throw new Error();
            }
            return new Author();
          }
        
          try {
            return findAuthor(); // succeed or fail
          } catch(error) {
            return findOtherAuther();
          } finally {
            // always runs
            // doesn't affect the return value
          }
          ```
        
          Asynchronous example:
        
          ```js
          findAuthor().catch(function(reason){
            return findOtherAuther();
          }).finally(function(){
            // author was either found, or not
          });
          ```
        
          @method finally
          @param {Function} callback
          @return {Promise}
        */
        Promise.prototype.finally = function _finally(callback) {
            var promise = this;
            var constructor = promise.constructor;
            if (isFunction(callback)) {
                return promise.then(function (value) {
                    return constructor.resolve(callback()).then(function () {
                        return value;
                    });
                }, function (reason) {
                    return constructor.resolve(callback()).then(function () {
                        throw reason;
                    });
                });
            }
            return promise.then(callback, callback);
        };
        return Promise;
    }();
    Promise$1.prototype.then = then;
    Promise$1.all = all;
    Promise$1.race = race;
    Promise$1.resolve = resolve$1;
    Promise$1.reject = reject$1;
    Promise$1._setScheduler = setScheduler;
    Promise$1._setAsap = setAsap;
    Promise$1._asap = asap;
    /*global self*/
    function polyfill() {
        var local = void 0;
        if (typeof __webpack_require__.g !== 'undefined') {
            local = __webpack_require__.g;
        }
        else if (typeof self !== 'undefined') {
            local = self;
        }
        else {
            try {
                local = Function('return this')();
            }
            catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
            }
        }
        var P = local.Promise;
        if (P) {
            var promiseToString = null;
            try {
                promiseToString = Object.prototype.toString.call(P.resolve());
            }
            catch (e) {
                // silently ignored
            }
            if (promiseToString === '[object Promise]' && !P.cast) {
                return;
            }
        }
        local.Promise = Promise$1;
    }
    // Strange compat..
    Promise$1.polyfill = polyfill;
    Promise$1.Promise = Promise$1;
    return Promise$1;
})));


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ (function(module) {

"use strict";
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

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function'
    ? R.apply
    : function ReflectApply(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
    };
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
}
else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target)
            .concat(Object.getOwnPropertySymbols(target));
    };
}
else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target);
    };
}
function ProcessEmitWarning(warning) {
    if (console && console.warn)
        console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function () {
        return defaultMaxListeners;
    },
    set: function (arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        }
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function () {
    if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
    var doError = (type === 'error');
    var events = this._events;
    if (events !== undefined)
        doError = (doError && events.error === undefined);
    else if (!doError)
        return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0)
            er = args[0];
        if (er instanceof Error) {
            // Note: The comments on the `throw` lines are intentional, they show
            // up in Node's output if this results in an unhandled exception.
            throw er; // Unhandled 'error' event
        }
        // At least give some kind of context to the user
        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined)
        return false;
    if (typeof handler === 'function') {
        ReflectApply(handler, this, args);
    }
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    }
    else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit('newListener', type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    }
    else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] =
                prepend ? [listener, existing] : [existing, listener];
            // If we've already got an array, just append.
        }
        else if (prepend) {
            existing.unshift(listener);
        }
        else {
            existing.push(listener);
        }
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error('Possible EventEmitter memory leak detected. ' +
                existing.length + ' ' + String(type) + ' listeners ' +
                'added. Use emitter.setMaxListeners() to ' +
                'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
    };
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
            return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
    };
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === undefined)
            return this;
        list = events[type];
        if (list === undefined)
            return this;
        if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
                this._events = Object.create(null);
            else {
                delete events[type];
                if (events.removeListener)
                    this.emit('removeListener', type, list.listener || listener);
            }
        }
        else if (typeof list !== 'function') {
            position = -1;
            for (i = list.length - 1; i >= 0; i--) {
                if (list[i] === listener || list[i].listener === listener) {
                    originalListener = list[i].listener;
                    position = i;
                    break;
                }
            }
            if (position < 0)
                return this;
            if (position === 0)
                list.shift();
            else {
                spliceOne(list, position);
            }
            if (list.length === 1)
                events[type] = list[0];
            if (events.removeListener !== undefined)
                this.emit('removeListener', type, originalListener || listener);
        }
        return this;
    };
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === undefined)
            return this;
        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
            if (arguments.length === 0) {
                this._events = Object.create(null);
                this._eventsCount = 0;
            }
            else if (events[type] !== undefined) {
                if (--this._eventsCount === 0)
                    this._events = Object.create(null);
                else
                    delete events[type];
            }
            return this;
        }
        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
                key = keys[i];
                if (key === 'removeListener')
                    continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
        }
        listeners = events[type];
        if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
        }
        else if (listeners !== undefined) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
                this.removeListener(type, listeners[i]);
            }
        }
        return this;
    };
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined)
        return [];
    var evlistener = events[type];
    if (evlistener === undefined)
        return [];
    if (typeof evlistener === 'function')
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ?
        unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
    }
    else {
        return listenerCount.call(emitter, type);
    }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === 'function') {
            return 1;
        }
        else if (evlistener !== undefined) {
            return evlistener.length;
        }
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
    }
    return ret;
}
function once(emitter, name) {
    return new Promise(function (resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === 'function') {
                emitter.removeListener('error', errorListener);
            }
            resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== 'error') {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
        eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
        if (flags.once) {
            emitter.once(name, listener);
        }
        else {
            emitter.on(name, listener);
        }
    }
    else if (typeof emitter.addEventListener === 'function') {
        // EventTarget does not have `error` event semantics like Node
        // EventEmitters, we do not listen for `error` events here.
        emitter.addEventListener(name, function wrapListener(arg) {
            // IE does not have builtin `{ once: true }` support so we
            // have to do it manually.
            if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
        });
    }
    else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
}


/***/ }),

/***/ "./node_modules/webworkify-webpack/index.js":
/*!**************************************************!*\
  !*** ./node_modules/webworkify-webpack/index.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function webpackBootstrapFunc(modules) {
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/ // The require function
    /******/ function __nested_webpack_require_164__(moduleId) {
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId])
            /******/ return installedModules[moduleId].exports;
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/ 
        };
        /******/ // Execute the module function
        /******/ modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_164__);
        /******/ // Flag the module as loaded
        /******/ module.l = true;
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/ 
    }
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __nested_webpack_require_164__.m = modules;
    /******/ // expose the module cache
    /******/ __nested_webpack_require_164__.c = installedModules;
    /******/ // identity function for calling harmony imports with the correct context
    /******/ __nested_webpack_require_164__.i = function (value) { return value; };
    /******/ // define getter function for harmony exports
    /******/ __nested_webpack_require_164__.d = function (exports, name, getter) {
        /******/ if (!__nested_webpack_require_164__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
                /******/ 
            });
            /******/ }
        /******/ 
    };
    /******/ // define __esModule on exports
    /******/ __nested_webpack_require_164__.r = function (exports) {
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/ 
    };
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __nested_webpack_require_164__.n = function (module) {
        /******/ var getter = module && module.__esModule ?
            /******/ function getDefault() { return module['default']; } :
            /******/ function getModuleExports() { return module; };
        /******/ __nested_webpack_require_164__.d(getter, 'a', getter);
        /******/ return getter;
        /******/ 
    };
    /******/ // Object.prototype.hasOwnProperty.call
    /******/ __nested_webpack_require_164__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/ // __webpack_public_path__
    /******/ __nested_webpack_require_164__.p = "/";
    /******/ // on error function for async loading
    /******/ __nested_webpack_require_164__.oe = function (err) { console.error(err); throw err; };
    var f = __nested_webpack_require_164__(__nested_webpack_require_164__.s = ENTRY_MODULE);
    return f.default || f; // try to call default if defined to also support babel esmodule exports
}
var moduleNameReqExp = '[\\.|\\-|\\+|\\w|\/|@]+';
var dependencyRegExp = '\\(\\s*(\/\\*.*?\\*\/)?\\s*.*?(' + moduleNameReqExp + ').*?\\)'; // additional chars when output.pathinfo is true
// http://stackoverflow.com/a/2593661/130442
function quoteRegExp(str) {
    return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}
function isNumeric(n) {
    return !isNaN(1 * n); // 1 * n converts integers, integers as string ("123"), 1e3 and "1e3" to integers and strings to NaN
}
function getModuleDependencies(sources, module, queueName) {
    var retval = {};
    retval[queueName] = [];
    var fnString = module.toString();
    var wrapperSignature = fnString.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
    if (!wrapperSignature)
        return retval;
    var webpackRequireName = wrapperSignature[1];
    // main bundle deps
    var re = new RegExp('(\\\\n|\\W)' + quoteRegExp(webpackRequireName) + dependencyRegExp, 'g');
    var match;
    while ((match = re.exec(fnString))) {
        if (match[3] === 'dll-reference')
            continue;
        retval[queueName].push(match[3]);
    }
    // dll deps
    re = new RegExp('\\(' + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, 'g');
    while ((match = re.exec(fnString))) {
        if (!sources[match[2]]) {
            retval[queueName].push(match[1]);
            sources[match[2]] = __webpack_require__(match[1]).m;
        }
        retval[match[2]] = retval[match[2]] || [];
        retval[match[2]].push(match[4]);
    }
    // convert 1e3 back to 1000 - this can be important after uglify-js converted 1000 to 1e3
    var keys = Object.keys(retval);
    for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < retval[keys[i]].length; j++) {
            if (isNumeric(retval[keys[i]][j])) {
                retval[keys[i]][j] = 1 * retval[keys[i]][j];
            }
        }
    }
    return retval;
}
function hasValuesInQueues(queues) {
    var keys = Object.keys(queues);
    return keys.reduce(function (hasValues, key) {
        return hasValues || queues[key].length > 0;
    }, false);
}
function getRequiredModules(sources, moduleId) {
    var modulesQueue = {
        main: [moduleId]
    };
    var requiredModules = {
        main: []
    };
    var seenModules = {
        main: {}
    };
    while (hasValuesInQueues(modulesQueue)) {
        var queues = Object.keys(modulesQueue);
        for (var i = 0; i < queues.length; i++) {
            var queueName = queues[i];
            var queue = modulesQueue[queueName];
            var moduleToCheck = queue.pop();
            seenModules[queueName] = seenModules[queueName] || {};
            if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck])
                continue;
            seenModules[queueName][moduleToCheck] = true;
            requiredModules[queueName] = requiredModules[queueName] || [];
            requiredModules[queueName].push(moduleToCheck);
            var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName);
            var newModulesKeys = Object.keys(newModules);
            for (var j = 0; j < newModulesKeys.length; j++) {
                modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || [];
                modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]]);
            }
        }
    }
    return requiredModules;
}
module.exports = function (moduleId, options) {
    options = options || {};
    var sources = {
        main: __webpack_require__.m
    };
    var requiredModules = options.all ? { main: Object.keys(sources.main) } : getRequiredModules(sources, moduleId);
    var src = '';
    Object.keys(requiredModules).filter(function (m) { return m !== 'main'; }).forEach(function (module) {
        var entryModule = 0;
        while (requiredModules[module][entryModule]) {
            entryModule++;
        }
        requiredModules[module].push(entryModule);
        sources[module][entryModule] = '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })';
        src = src + 'var ' + module + ' = (' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(entryModule)) + ')({' + requiredModules[module].map(function (id) { return '' + JSON.stringify(id) + ': ' + sources[module][id].toString(); }).join(',') + '});\n';
    });
    src = src + 'new ((' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(moduleId)) + ')({' + requiredModules.main.map(function (id) { return '' + JSON.stringify(id) + ': ' + sources.main[id].toString(); }).join(',') + '}))(self);';
    var blob = new window.Blob([src], { type: 'text/javascript' });
    if (options.bare) {
        return blob;
    }
    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    var workerUrl = URL.createObjectURL(blob);
    var worker = new window.Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};


/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultConfig": function() { return /* binding */ defaultConfig; },
/* harmony export */   "createDefaultConfig": function() { return /* binding */ createDefaultConfig; }
/* harmony export */ });
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var defaultConfig = {
    enableWorker: false,
    enableStashBuffer: true,
    stashInitialSize: undefined,
    isLive: false,
    lazyLoad: true,
    lazyLoadMaxDuration: 3 * 60,
    lazyLoadRecoverDuration: 30,
    deferLoadAfterSourceOpen: true,
    // autoCleanupSourceBuffer: default as false, leave unspecified
    autoCleanupMaxBackwardDuration: 3 * 60,
    autoCleanupMinBackwardDuration: 2 * 60,
    statisticsInfoReportInterval: 600,
    fixAudioTimestampGap: true,
    accurateSeek: false,
    seekType: 'range',
    seekParamStart: 'bstart',
    seekParamEnd: 'bend',
    rangeLoadZeroStart: false,
    customSeekHandler: undefined,
    reuseRedirectedURL: false,
    // referrerPolicy: leave as unspecified
    headers: undefined,
    customLoader: undefined
};
function createDefaultConfig() {
    return Object.assign({}, defaultConfig);
}


/***/ }),

/***/ "./src/core/features.js":
/*!******************************!*\
  !*** ./src/core/features.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _io_io_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io/io-controller.js */ "./src/io/io-controller.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config.js */ "./src/config.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var Features = /** @class */ (function () {
    function Features() {
    }
    Features.supportMSEH264Playback = function () {
        return window.MediaSource &&
            window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    };
    Features.supportNetworkStreamIO = function () {
        var ioctl = new _io_io_controller_js__WEBPACK_IMPORTED_MODULE_0__.default({}, (0,_config_js__WEBPACK_IMPORTED_MODULE_1__.createDefaultConfig)());
        var loaderType = ioctl.loaderType;
        ioctl.destroy();
        return loaderType == 'fetch-stream-loader' || loaderType == 'xhr-moz-chunked-loader';
    };
    Features.getNetworkLoaderTypeName = function () {
        var ioctl = new _io_io_controller_js__WEBPACK_IMPORTED_MODULE_0__.default({}, (0,_config_js__WEBPACK_IMPORTED_MODULE_1__.createDefaultConfig)());
        var loaderType = ioctl.loaderType;
        ioctl.destroy();
        return loaderType;
    };
    Features.supportNativeMediaPlayback = function (mimeType) {
        if (Features.videoElement == undefined) {
            Features.videoElement = window.document.createElement('video');
        }
        var canPlay = Features.videoElement.canPlayType(mimeType);
        return canPlay === 'probably' || canPlay == 'maybe';
    };
    Features.getFeatureList = function () {
        var features = {
            mseFlvPlayback: false,
            mseLiveFlvPlayback: false,
            networkStreamIO: false,
            networkLoaderName: '',
            nativeMP4H264Playback: false,
            nativeWebmVP8Playback: false,
            nativeWebmVP9Playback: false
        };
        features.mseFlvPlayback = Features.supportMSEH264Playback();
        features.networkStreamIO = Features.supportNetworkStreamIO();
        features.networkLoaderName = Features.getNetworkLoaderTypeName();
        features.mseLiveFlvPlayback = features.mseFlvPlayback && features.networkStreamIO;
        features.nativeMP4H264Playback = Features.supportNativeMediaPlayback('video/mp4; codecs="avc1.42001E, mp4a.40.2"');
        features.nativeWebmVP8Playback = Features.supportNativeMediaPlayback('video/webm; codecs="vp8.0, vorbis"');
        features.nativeWebmVP9Playback = Features.supportNativeMediaPlayback('video/webm; codecs="vp9"');
        return features;
    };
    return Features;
}());
/* harmony default export */ __webpack_exports__["default"] = (Features);


/***/ }),

/***/ "./src/core/media-info.js":
/*!********************************!*\
  !*** ./src/core/media-info.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MediaInfo = /** @class */ (function () {
    function MediaInfo() {
        this.mimeType = null;
        this.duration = null;
        this.hasAudio = null;
        this.hasVideo = null;
        this.audioCodec = null;
        this.videoCodec = null;
        this.audioDataRate = null;
        this.videoDataRate = null;
        this.audioSampleRate = null;
        this.audioChannelCount = null;
        this.width = null;
        this.height = null;
        this.fps = null;
        this.profile = null;
        this.level = null;
        this.refFrames = null;
        this.chromaFormat = null;
        this.sarNum = null;
        this.sarDen = null;
        this.metadata = null;
        this.segments = null; // MediaInfo[]
        this.segmentCount = null;
        this.hasKeyframesIndex = null;
        this.keyframesIndex = null;
    }
    MediaInfo.prototype.isComplete = function () {
        var audioInfoComplete = (this.hasAudio === false) ||
            (this.hasAudio === true &&
                this.audioCodec != null &&
                this.audioSampleRate != null &&
                this.audioChannelCount != null);
        var videoInfoComplete = (this.hasVideo === false) ||
            (this.hasVideo === true &&
                this.videoCodec != null &&
                this.width != null &&
                this.height != null &&
                this.fps != null &&
                this.profile != null &&
                this.level != null &&
                this.refFrames != null &&
                this.chromaFormat != null &&
                this.sarNum != null &&
                this.sarDen != null);
        // keyframesIndex may not be present
        return this.mimeType != null &&
            this.duration != null &&
            this.metadata != null &&
            this.hasKeyframesIndex != null &&
            audioInfoComplete &&
            videoInfoComplete;
    };
    MediaInfo.prototype.isSeekable = function () {
        return this.hasKeyframesIndex === true;
    };
    MediaInfo.prototype.getNearestKeyframe = function (milliseconds) {
        if (this.keyframesIndex == null) {
            return null;
        }
        var table = this.keyframesIndex;
        var keyframeIdx = this._search(table.times, milliseconds);
        return {
            index: keyframeIdx,
            milliseconds: table.times[keyframeIdx],
            fileposition: table.filepositions[keyframeIdx]
        };
    };
    MediaInfo.prototype._search = function (list, value) {
        var idx = 0;
        var last = list.length - 1;
        var mid = 0;
        var lbound = 0;
        var ubound = last;
        if (value < list[0]) {
            idx = 0;
            lbound = ubound + 1; // skip search
        }
        while (lbound <= ubound) {
            mid = lbound + Math.floor((ubound - lbound) / 2);
            if (mid === last || (value >= list[mid] && value < list[mid + 1])) {
                idx = mid;
                break;
            }
            else if (list[mid] < value) {
                lbound = mid + 1;
            }
            else {
                ubound = mid - 1;
            }
        }
        return idx;
    };
    return MediaInfo;
}());
/* harmony default export */ __webpack_exports__["default"] = (MediaInfo);


/***/ }),

/***/ "./src/core/media-segment-info.js":
/*!****************************************!*\
  !*** ./src/core/media-segment-info.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SampleInfo": function() { return /* binding */ SampleInfo; },
/* harmony export */   "MediaSegmentInfo": function() { return /* binding */ MediaSegmentInfo; },
/* harmony export */   "IDRSampleList": function() { return /* binding */ IDRSampleList; },
/* harmony export */   "MediaSegmentInfoList": function() { return /* binding */ MediaSegmentInfoList; }
/* harmony export */ });
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Represents an media sample (audio / video)
var SampleInfo = /** @class */ (function () {
    function SampleInfo(dts, pts, duration, originalDts, isSync) {
        this.dts = dts;
        this.pts = pts;
        this.duration = duration;
        this.originalDts = originalDts;
        this.isSyncPoint = isSync;
        this.fileposition = null;
    }
    return SampleInfo;
}());

// Media Segment concept is defined in Media Source Extensions spec.
// Particularly in ISO BMFF format, an Media Segment contains a moof box followed by a mdat box.
var MediaSegmentInfo = /** @class */ (function () {
    function MediaSegmentInfo() {
        this.beginDts = 0;
        this.endDts = 0;
        this.beginPts = 0;
        this.endPts = 0;
        this.originalBeginDts = 0;
        this.originalEndDts = 0;
        this.syncPoints = []; // SampleInfo[n], for video IDR frames only
        this.firstSample = null; // SampleInfo
        this.lastSample = null; // SampleInfo
    }
    MediaSegmentInfo.prototype.appendSyncPoint = function (sampleInfo) {
        sampleInfo.isSyncPoint = true;
        this.syncPoints.push(sampleInfo);
    };
    return MediaSegmentInfo;
}());

// Ordered list for recording video IDR frames, sorted by originalDts
var IDRSampleList = /** @class */ (function () {
    function IDRSampleList() {
        this._list = [];
    }
    IDRSampleList.prototype.clear = function () {
        this._list = [];
    };
    IDRSampleList.prototype.appendArray = function (syncPoints) {
        var list = this._list;
        if (syncPoints.length === 0) {
            return;
        }
        if (list.length > 0 && syncPoints[0].originalDts < list[list.length - 1].originalDts) {
            this.clear();
        }
        Array.prototype.push.apply(list, syncPoints);
    };
    IDRSampleList.prototype.getLastSyncPointBeforeDts = function (dts) {
        if (this._list.length == 0) {
            return null;
        }
        var list = this._list;
        var idx = 0;
        var last = list.length - 1;
        var mid = 0;
        var lbound = 0;
        var ubound = last;
        if (dts < list[0].dts) {
            idx = 0;
            lbound = ubound + 1;
        }
        while (lbound <= ubound) {
            mid = lbound + Math.floor((ubound - lbound) / 2);
            if (mid === last || (dts >= list[mid].dts && dts < list[mid + 1].dts)) {
                idx = mid;
                break;
            }
            else if (list[mid].dts < dts) {
                lbound = mid + 1;
            }
            else {
                ubound = mid - 1;
            }
        }
        return this._list[idx];
    };
    return IDRSampleList;
}());

// Data structure for recording information of media segments in single track.
var MediaSegmentInfoList = /** @class */ (function () {
    function MediaSegmentInfoList(type) {
        this._type = type;
        this._list = [];
        this._lastAppendLocation = -1; // cached last insert location
    }
    Object.defineProperty(MediaSegmentInfoList.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaSegmentInfoList.prototype, "length", {
        get: function () {
            return this._list.length;
        },
        enumerable: false,
        configurable: true
    });
    MediaSegmentInfoList.prototype.isEmpty = function () {
        return this._list.length === 0;
    };
    MediaSegmentInfoList.prototype.clear = function () {
        this._list = [];
        this._lastAppendLocation = -1;
    };
    MediaSegmentInfoList.prototype._searchNearestSegmentBefore = function (originalBeginDts) {
        var list = this._list;
        if (list.length === 0) {
            return -2;
        }
        var last = list.length - 1;
        var mid = 0;
        var lbound = 0;
        var ubound = last;
        var idx = 0;
        if (originalBeginDts < list[0].originalBeginDts) {
            idx = -1;
            return idx;
        }
        while (lbound <= ubound) {
            mid = lbound + Math.floor((ubound - lbound) / 2);
            if (mid === last || (originalBeginDts > list[mid].lastSample.originalDts &&
                (originalBeginDts < list[mid + 1].originalBeginDts))) {
                idx = mid;
                break;
            }
            else if (list[mid].originalBeginDts < originalBeginDts) {
                lbound = mid + 1;
            }
            else {
                ubound = mid - 1;
            }
        }
        return idx;
    };
    MediaSegmentInfoList.prototype._searchNearestSegmentAfter = function (originalBeginDts) {
        return this._searchNearestSegmentBefore(originalBeginDts) + 1;
    };
    MediaSegmentInfoList.prototype.append = function (mediaSegmentInfo) {
        var list = this._list;
        var msi = mediaSegmentInfo;
        var lastAppendIdx = this._lastAppendLocation;
        var insertIdx = 0;
        if (lastAppendIdx !== -1 && lastAppendIdx < list.length &&
            msi.originalBeginDts >= list[lastAppendIdx].lastSample.originalDts &&
            ((lastAppendIdx === list.length - 1) ||
                (lastAppendIdx < list.length - 1 &&
                    msi.originalBeginDts < list[lastAppendIdx + 1].originalBeginDts))) {
            insertIdx = lastAppendIdx + 1; // use cached location idx
        }
        else {
            if (list.length > 0) {
                insertIdx = this._searchNearestSegmentBefore(msi.originalBeginDts) + 1;
            }
        }
        this._lastAppendLocation = insertIdx;
        this._list.splice(insertIdx, 0, msi);
    };
    MediaSegmentInfoList.prototype.getLastSegmentBefore = function (originalBeginDts) {
        var idx = this._searchNearestSegmentBefore(originalBeginDts);
        if (idx >= 0) {
            return this._list[idx];
        }
        else { // -1
            return null;
        }
    };
    MediaSegmentInfoList.prototype.getLastSampleBefore = function (originalBeginDts) {
        var segment = this.getLastSegmentBefore(originalBeginDts);
        if (segment != null) {
            return segment.lastSample;
        }
        else {
            return null;
        }
    };
    MediaSegmentInfoList.prototype.getLastSyncPointBefore = function (originalBeginDts) {
        var segmentIdx = this._searchNearestSegmentBefore(originalBeginDts);
        var syncPoints = this._list[segmentIdx].syncPoints;
        while (syncPoints.length === 0 && segmentIdx > 0) {
            segmentIdx--;
            syncPoints = this._list[segmentIdx].syncPoints;
        }
        if (syncPoints.length > 0) {
            return syncPoints[syncPoints.length - 1];
        }
        else {
            return null;
        }
    };
    return MediaSegmentInfoList;
}());



/***/ }),

/***/ "./src/core/mse-controller.js":
/*!************************************!*\
  !*** ./src/core/mse-controller.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/browser.js */ "./src/utils/browser.js");
/* harmony import */ var _mse_events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mse-events.js */ "./src/core/mse-events.js");
/* harmony import */ var _media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./media-segment-info.js */ "./src/core/media-segment-info.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






// Media Source Extensions controller
var MSEController = /** @class */ (function () {
    function MSEController(config) {
        this.TAG = 'MSEController';
        this._config = config;
        this._emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        if (this._config.isLive && this._config.autoCleanupSourceBuffer == undefined) {
            // For live stream, do auto cleanup by default
            this._config.autoCleanupSourceBuffer = true;
        }
        this.e = {
            onSourceOpen: this._onSourceOpen.bind(this),
            onSourceEnded: this._onSourceEnded.bind(this),
            onSourceClose: this._onSourceClose.bind(this),
            onSourceBufferError: this._onSourceBufferError.bind(this),
            onSourceBufferUpdateEnd: this._onSourceBufferUpdateEnd.bind(this)
        };
        this._mediaSource = null;
        this._mediaSourceObjectURL = null;
        this._mediaElement = null;
        this._isBufferFull = false;
        this._hasPendingEos = false;
        this._requireSetMediaDuration = false;
        this._pendingMediaDuration = 0;
        this._pendingSourceBufferInit = [];
        this._mimeTypes = {
            video: null,
            audio: null
        };
        this._sourceBuffers = {
            video: null,
            audio: null
        };
        this._lastInitSegments = {
            video: null,
            audio: null
        };
        this._pendingSegments = {
            video: [],
            audio: []
        };
        this._pendingRemoveRanges = {
            video: [],
            audio: []
        };
        this._idrList = new _media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.IDRSampleList();
    }
    MSEController.prototype.destroy = function () {
        if (this._mediaElement || this._mediaSource) {
            this.detachMediaElement();
        }
        this.e = null;
        this._emitter.removeAllListeners();
        this._emitter = null;
    };
    MSEController.prototype.on = function (event, listener) {
        this._emitter.addListener(event, listener);
    };
    MSEController.prototype.off = function (event, listener) {
        this._emitter.removeListener(event, listener);
    };
    MSEController.prototype.attachMediaElement = function (mediaElement) {
        if (this._mediaSource) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__.IllegalStateException('MediaSource has been attached to an HTMLMediaElement!');
        }
        var ms = this._mediaSource = new window.MediaSource();
        ms.addEventListener('sourceopen', this.e.onSourceOpen);
        ms.addEventListener('sourceended', this.e.onSourceEnded);
        ms.addEventListener('sourceclose', this.e.onSourceClose);
        this._mediaElement = mediaElement;
        this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource);
        mediaElement.src = this._mediaSourceObjectURL;
    };
    MSEController.prototype.detachMediaElement = function () {
        if (this._mediaSource) {
            var ms = this._mediaSource;
            for (var type in this._sourceBuffers) {
                // pending segments should be discard
                var ps = this._pendingSegments[type];
                ps.splice(0, ps.length);
                this._pendingSegments[type] = null;
                this._pendingRemoveRanges[type] = null;
                this._lastInitSegments[type] = null;
                // remove all sourcebuffers
                var sb = this._sourceBuffers[type];
                if (sb) {
                    if (ms.readyState !== 'closed') {
                        // ms edge can throw an error: Unexpected call to method or property access
                        try {
                            ms.removeSourceBuffer(sb);
                        }
                        catch (error) {
                            _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                        }
                        sb.removeEventListener('error', this.e.onSourceBufferError);
                        sb.removeEventListener('updateend', this.e.onSourceBufferUpdateEnd);
                    }
                    this._mimeTypes[type] = null;
                    this._sourceBuffers[type] = null;
                }
            }
            if (ms.readyState === 'open') {
                try {
                    ms.endOfStream();
                }
                catch (error) {
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                }
            }
            ms.removeEventListener('sourceopen', this.e.onSourceOpen);
            ms.removeEventListener('sourceended', this.e.onSourceEnded);
            ms.removeEventListener('sourceclose', this.e.onSourceClose);
            this._pendingSourceBufferInit = [];
            this._isBufferFull = false;
            this._idrList.clear();
            this._mediaSource = null;
        }
        if (this._mediaElement) {
            this._mediaElement.src = '';
            this._mediaElement.removeAttribute('src');
            this._mediaElement = null;
        }
        if (this._mediaSourceObjectURL) {
            window.URL.revokeObjectURL(this._mediaSourceObjectURL);
            this._mediaSourceObjectURL = null;
        }
    };
    MSEController.prototype.appendInitSegment = function (initSegment, deferred) {
        if (!this._mediaSource || this._mediaSource.readyState !== 'open') {
            // sourcebuffer creation requires mediaSource.readyState === 'open'
            // so we defer the sourcebuffer creation, until sourceopen event triggered
            this._pendingSourceBufferInit.push(initSegment);
            // make sure that this InitSegment is in the front of pending segments queue
            this._pendingSegments[initSegment.type].push(initSegment);
            return;
        }
        var is = initSegment;
        var mimeType = "" + is.container;
        if (is.codec && is.codec.length > 0) {
            mimeType += ";codecs=" + is.codec;
        }
        var firstInitSegment = false;
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'Received Initialization Segment, mimeType: ' + mimeType);
        this._lastInitSegments[is.type] = is;
        if (mimeType !== this._mimeTypes[is.type]) {
            if (!this._mimeTypes[is.type]) { // empty, first chance create sourcebuffer
                firstInitSegment = true;
                try {
                    var sb = this._sourceBuffers[is.type] = this._mediaSource.addSourceBuffer(mimeType);
                    sb.addEventListener('error', this.e.onSourceBufferError);
                    sb.addEventListener('updateend', this.e.onSourceBufferUpdateEnd);
                }
                catch (error) {
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                    this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.ERROR, { code: error.code, msg: error.message });
                    return;
                }
            }
            else {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, "Notice: " + is.type + " mimeType changed, origin: " + this._mimeTypes[is.type] + ", target: " + mimeType);
            }
            this._mimeTypes[is.type] = mimeType;
        }
        if (!deferred) {
            // deferred means this InitSegment has been pushed to pendingSegments queue
            this._pendingSegments[is.type].push(is);
        }
        if (!firstInitSegment) { // append immediately only if init segment in subsequence
            if (this._sourceBuffers[is.type] && !this._sourceBuffers[is.type].updating) {
                this._doAppendSegments();
            }
        }
        if (_utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari && is.container === 'audio/mpeg' && is.mediaDuration > 0) {
            // 'audio/mpeg' track under Safari may cause MediaElement's duration to be NaN
            // Manually correct MediaSource.duration to make progress bar seekable, and report right duration
            this._requireSetMediaDuration = true;
            this._pendingMediaDuration = is.mediaDuration / 1000; // in seconds
            this._updateMediaSourceDuration();
        }
    };
    MSEController.prototype.appendMediaSegment = function (mediaSegment) {
        var ms = mediaSegment;
        this._pendingSegments[ms.type].push(ms);
        if (this._config.autoCleanupSourceBuffer && this._needCleanupSourceBuffer()) {
            this._doCleanupSourceBuffer();
        }
        var sb = this._sourceBuffers[ms.type];
        if (sb && !sb.updating && !this._hasPendingRemoveRanges()) {
            this._doAppendSegments();
        }
    };
    MSEController.prototype.seek = function (seconds) {
        // remove all appended buffers
        for (var type in this._sourceBuffers) {
            if (!this._sourceBuffers[type]) {
                continue;
            }
            // abort current buffer append algorithm
            var sb = this._sourceBuffers[type];
            if (this._mediaSource.readyState === 'open') {
                try {
                    // If range removal algorithm is running, InvalidStateError will be throwed
                    // Ignore it.
                    sb.abort();
                }
                catch (error) {
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                }
            }
            // IDRList should be clear
            this._idrList.clear();
            // pending segments should be discard
            var ps = this._pendingSegments[type];
            ps.splice(0, ps.length);
            if (this._mediaSource.readyState === 'closed') {
                // Parent MediaSource object has been detached from HTMLMediaElement
                continue;
            }
            // record ranges to be remove from SourceBuffer
            for (var i = 0; i < sb.buffered.length; i++) {
                var start = sb.buffered.start(i);
                var end = sb.buffered.end(i);
                this._pendingRemoveRanges[type].push({ start: start, end: end });
            }
            // if sb is not updating, let's remove ranges now!
            if (!sb.updating) {
                this._doRemoveRanges();
            }
            // Safari 10 may get InvalidStateError in the later appendBuffer() after SourceBuffer.remove() call
            // Internal parser's state may be invalid at this time. Re-append last InitSegment to workaround.
            // Related issue: https://bugs.webkit.org/show_bug.cgi?id=159230
            if (_utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari) {
                var lastInitSegment = this._lastInitSegments[type];
                if (lastInitSegment) {
                    this._pendingSegments[type].push(lastInitSegment);
                    if (!sb.updating) {
                        this._doAppendSegments();
                    }
                }
            }
        }
    };
    MSEController.prototype.endOfStream = function () {
        var ms = this._mediaSource;
        var sb = this._sourceBuffers;
        if (!ms || ms.readyState !== 'open') {
            if (ms && ms.readyState === 'closed' && this._hasPendingSegments()) {
                // If MediaSource hasn't turned into open state, and there're pending segments
                // Mark pending endOfStream, defer call until all pending segments appended complete
                this._hasPendingEos = true;
            }
            return;
        }
        if (sb.video && sb.video.updating || sb.audio && sb.audio.updating) {
            // If any sourcebuffer is updating, defer endOfStream operation
            // See _onSourceBufferUpdateEnd()
            this._hasPendingEos = true;
        }
        else {
            this._hasPendingEos = false;
            // Notify media data loading complete
            // This is helpful for correcting total duration to match last media segment
            // Otherwise MediaElement's ended event may not be triggered
            ms.endOfStream();
        }
    };
    MSEController.prototype.getNearestKeyframe = function (dts) {
        return this._idrList.getLastSyncPointBeforeDts(dts);
    };
    MSEController.prototype._needCleanupSourceBuffer = function () {
        if (!this._config.autoCleanupSourceBuffer) {
            return false;
        }
        var currentTime = this._mediaElement.currentTime;
        for (var type in this._sourceBuffers) {
            var sb = this._sourceBuffers[type];
            if (sb) {
                var buffered = sb.buffered;
                if (buffered.length >= 1) {
                    if (currentTime - buffered.start(0) >= this._config.autoCleanupMaxBackwardDuration) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    MSEController.prototype._doCleanupSourceBuffer = function () {
        var currentTime = this._mediaElement.currentTime;
        for (var type in this._sourceBuffers) {
            var sb = this._sourceBuffers[type];
            if (sb) {
                var buffered = sb.buffered;
                var doRemove = false;
                for (var i = 0; i < buffered.length; i++) {
                    var start = buffered.start(i);
                    var end = buffered.end(i);
                    if (start <= currentTime && currentTime < end + 3) { // padding 3 seconds
                        if (currentTime - start >= this._config.autoCleanupMaxBackwardDuration) {
                            doRemove = true;
                            var removeEnd = currentTime - this._config.autoCleanupMinBackwardDuration;
                            this._pendingRemoveRanges[type].push({ start: start, end: removeEnd });
                        }
                    }
                    else if (end < currentTime) {
                        doRemove = true;
                        this._pendingRemoveRanges[type].push({ start: start, end: end });
                    }
                }
                if (doRemove && !sb.updating) {
                    this._doRemoveRanges();
                }
            }
        }
    };
    MSEController.prototype._updateMediaSourceDuration = function () {
        var sb = this._sourceBuffers;
        if (this._mediaElement.readyState === 0 || this._mediaSource.readyState !== 'open') {
            return;
        }
        if ((sb.video && sb.video.updating) || (sb.audio && sb.audio.updating)) {
            return;
        }
        var current = this._mediaSource.duration;
        var target = this._pendingMediaDuration;
        if (target > 0 && (isNaN(current) || target > current)) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, "Update MediaSource duration from " + current + " to " + target);
            this._mediaSource.duration = target;
        }
        this._requireSetMediaDuration = false;
        this._pendingMediaDuration = 0;
    };
    MSEController.prototype._doRemoveRanges = function () {
        for (var type in this._pendingRemoveRanges) {
            if (!this._sourceBuffers[type] || this._sourceBuffers[type].updating) {
                continue;
            }
            var sb = this._sourceBuffers[type];
            var ranges = this._pendingRemoveRanges[type];
            while (ranges.length && !sb.updating) {
                var range = ranges.shift();
                sb.remove(range.start, range.end);
            }
        }
    };
    MSEController.prototype._doAppendSegments = function () {
        var pendingSegments = this._pendingSegments;
        for (var type in pendingSegments) {
            if (!this._sourceBuffers[type] || this._sourceBuffers[type].updating) {
                continue;
            }
            if (pendingSegments[type].length > 0) {
                var segment = pendingSegments[type].shift();
                if (segment.timestampOffset) {
                    // For MPEG audio stream in MSE, if unbuffered-seeking occurred
                    // We need explicitly set timestampOffset to the desired point in timeline for mpeg SourceBuffer.
                    var currentOffset = this._sourceBuffers[type].timestampOffset;
                    var targetOffset = segment.timestampOffset / 1000; // in seconds
                    var delta = Math.abs(currentOffset - targetOffset);
                    if (delta > 0.1) { // If time delta > 100ms
                        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, "Update MPEG audio timestampOffset from " + currentOffset + " to " + targetOffset);
                        this._sourceBuffers[type].timestampOffset = targetOffset;
                    }
                    delete segment.timestampOffset;
                }
                if (!segment.data || segment.data.byteLength === 0) {
                    // Ignore empty buffer
                    continue;
                }
                try {
                    this._sourceBuffers[type].appendBuffer(segment.data);
                    this._isBufferFull = false;
                    if (type === 'video' && segment.hasOwnProperty('info')) {
                        this._idrList.appendArray(segment.info.syncPoints);
                    }
                }
                catch (error) {
                    this._pendingSegments[type].unshift(segment);
                    if (error.code === 22) { // QuotaExceededError
                        /* Notice that FireFox may not throw QuotaExceededError if SourceBuffer is full
                         * Currently we can only do lazy-load to avoid SourceBuffer become scattered.
                         * SourceBuffer eviction policy may be changed in future version of FireFox.
                         *
                         * Related issues:
                         * https://bugzilla.mozilla.org/show_bug.cgi?id=1279885
                         * https://bugzilla.mozilla.org/show_bug.cgi?id=1280023
                         */
                        // report buffer full, abort network IO
                        if (!this._isBufferFull) {
                            this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.BUFFER_FULL);
                        }
                        this._isBufferFull = true;
                    }
                    else {
                        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                        this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.ERROR, { code: error.code, msg: error.message });
                    }
                }
            }
        }
    };
    MSEController.prototype._onSourceOpen = function () {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'MediaSource onSourceOpen');
        this._mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
        // deferred sourcebuffer creation / initialization
        if (this._pendingSourceBufferInit.length > 0) {
            var pendings = this._pendingSourceBufferInit;
            while (pendings.length) {
                var segment = pendings.shift();
                this.appendInitSegment(segment, true);
            }
        }
        // there may be some pending media segments, append them
        if (this._hasPendingSegments()) {
            this._doAppendSegments();
        }
        this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.SOURCE_OPEN);
    };
    MSEController.prototype._onSourceEnded = function () {
        // fired on endOfStream
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'MediaSource onSourceEnded');
    };
    MSEController.prototype._onSourceClose = function () {
        // fired on detaching from media element
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'MediaSource onSourceClose');
        if (this._mediaSource && this.e != null) {
            this._mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
            this._mediaSource.removeEventListener('sourceended', this.e.onSourceEnded);
            this._mediaSource.removeEventListener('sourceclose', this.e.onSourceClose);
        }
    };
    MSEController.prototype._hasPendingSegments = function () {
        var ps = this._pendingSegments;
        return ps.video.length > 0 || ps.audio.length > 0;
    };
    MSEController.prototype._hasPendingRemoveRanges = function () {
        var prr = this._pendingRemoveRanges;
        return prr.video.length > 0 || prr.audio.length > 0;
    };
    MSEController.prototype._onSourceBufferUpdateEnd = function () {
        if (this._requireSetMediaDuration) {
            this._updateMediaSourceDuration();
        }
        else if (this._hasPendingRemoveRanges()) {
            this._doRemoveRanges();
        }
        else if (this._hasPendingSegments()) {
            this._doAppendSegments();
        }
        else if (this._hasPendingEos) {
            this.endOfStream();
        }
        this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.UPDATE_END);
    };
    MSEController.prototype._onSourceBufferError = function (e) {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, "SourceBuffer Error: " + e);
        // this error might not always be fatal, just ignore it
    };
    return MSEController;
}());
/* harmony default export */ __webpack_exports__["default"] = (MSEController);


/***/ }),

/***/ "./src/core/mse-events.js":
/*!********************************!*\
  !*** ./src/core/mse-events.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MSEEvents = {
    ERROR: 'error',
    SOURCE_OPEN: 'source_open',
    UPDATE_END: 'update_end',
    BUFFER_FULL: 'buffer_full'
};
/* harmony default export */ __webpack_exports__["default"] = (MSEEvents);


/***/ }),

/***/ "./src/core/transmuxer.js":
/*!********************************!*\
  !*** ./src/core/transmuxer.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webworkify_webpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webworkify-webpack */ "./node_modules/webworkify-webpack/index.js");
/* harmony import */ var webworkify_webpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webworkify_webpack__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/logging-control.js */ "./src/utils/logging-control.js");
/* harmony import */ var _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transmuxing-controller.js */ "./src/core/transmuxing-controller.js");
/* harmony import */ var _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transmuxing-events.js */ "./src/core/transmuxing-events.js");
/* harmony import */ var _media_info_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./media-info.js */ "./src/core/media-info.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







var Transmuxer = /** @class */ (function () {
    function Transmuxer(mediaDataSource, config) {
        this.TAG = 'Transmuxer';
        this._emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        if (config.enableWorker && typeof (Worker) !== 'undefined') {
            try {
                this._worker = webworkify_webpack__WEBPACK_IMPORTED_MODULE_1___default()(/*require.resolve*/(/*! ./transmuxing-worker */ "./src/core/transmuxing-worker.js"));
                this._workerDestroying = false;
                this._worker.addEventListener('message', this._onWorkerMessage.bind(this));
                this._worker.postMessage({ cmd: 'init', param: [mediaDataSource, config] });
                this.e = {
                    onLoggingConfigChanged: this._onLoggingConfigChanged.bind(this)
                };
                _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_3__.default.registerListener(this.e.onLoggingConfigChanged);
                this._worker.postMessage({ cmd: 'logging_config', param: _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_3__.default.getConfig() });
            }
            catch (error) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_2__.default.e(this.TAG, 'Error while initialize transmuxing worker, fallback to inline transmuxing');
                this._worker = null;
                this._controller = new _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_4__.default(mediaDataSource, config);
            }
        }
        else {
            this._controller = new _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_4__.default(mediaDataSource, config);
        }
        if (this._controller) {
            var ctl = this._controller;
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.IO_ERROR, this._onIOError.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.DEMUX_ERROR, this._onDemuxError.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.INIT_SEGMENT, this._onInitSegment.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_SEGMENT, this._onMediaSegment.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.LOADING_COMPLETE, this._onLoadingComplete.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOVERED_EARLY_EOF, this._onRecoveredEarlyEof.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_INFO, this._onMediaInfo.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.METADATA_ARRIVED, this._onMetaDataArrived.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.SCRIPTDATA_ARRIVED, this._onScriptDataArrived.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.STATISTICS_INFO, this._onStatisticsInfo.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOMMEND_SEEKPOINT, this._onRecommendSeekpoint.bind(this));
        }
    }
    Transmuxer.prototype.destroy = function () {
        if (this._worker) {
            if (!this._workerDestroying) {
                this._workerDestroying = true;
                this._worker.postMessage({ cmd: 'destroy' });
                _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_3__.default.removeListener(this.e.onLoggingConfigChanged);
                this.e = null;
            }
        }
        else {
            this._controller.destroy();
            this._controller = null;
        }
        this._emitter.removeAllListeners();
        this._emitter = null;
    };
    Transmuxer.prototype.on = function (event, listener) {
        this._emitter.addListener(event, listener);
    };
    Transmuxer.prototype.off = function (event, listener) {
        this._emitter.removeListener(event, listener);
    };
    Transmuxer.prototype.hasWorker = function () {
        return this._worker != null;
    };
    Transmuxer.prototype.open = function () {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'start' });
        }
        else {
            this._controller.start();
        }
    };
    Transmuxer.prototype.close = function () {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'stop' });
        }
        else {
            this._controller.stop();
        }
    };
    Transmuxer.prototype.seek = function (milliseconds) {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'seek', param: milliseconds });
        }
        else {
            this._controller.seek(milliseconds);
        }
    };
    Transmuxer.prototype.pause = function () {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'pause' });
        }
        else {
            this._controller.pause();
        }
    };
    Transmuxer.prototype.resume = function () {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'resume' });
        }
        else {
            this._controller.resume();
        }
    };
    Transmuxer.prototype._onInitSegment = function (type, initSegment) {
        var _this = this;
        // do async invoke
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.INIT_SEGMENT, type, initSegment);
        });
    };
    Transmuxer.prototype._onMediaSegment = function (type, mediaSegment) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_SEGMENT, type, mediaSegment);
        });
    };
    Transmuxer.prototype._onLoadingComplete = function () {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.LOADING_COMPLETE);
        });
    };
    Transmuxer.prototype._onRecoveredEarlyEof = function () {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOVERED_EARLY_EOF);
        });
    };
    Transmuxer.prototype._onMediaInfo = function (mediaInfo) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_INFO, mediaInfo);
        });
    };
    Transmuxer.prototype._onMetaDataArrived = function (metadata) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.METADATA_ARRIVED, metadata);
        });
    };
    Transmuxer.prototype._onScriptDataArrived = function (data) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.SCRIPTDATA_ARRIVED, data);
        });
    };
    Transmuxer.prototype._onStatisticsInfo = function (statisticsInfo) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.STATISTICS_INFO, statisticsInfo);
        });
    };
    Transmuxer.prototype._onIOError = function (type, info) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.IO_ERROR, type, info);
        });
    };
    Transmuxer.prototype._onDemuxError = function (type, info) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.DEMUX_ERROR, type, info);
        });
    };
    Transmuxer.prototype._onRecommendSeekpoint = function (milliseconds) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOMMEND_SEEKPOINT, milliseconds);
        });
    };
    Transmuxer.prototype._onLoggingConfigChanged = function (config) {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'logging_config', param: config });
        }
    };
    Transmuxer.prototype._onWorkerMessage = function (e) {
        var message = e.data;
        var data = message.data;
        if (message.msg === 'destroyed' || this._workerDestroying) {
            this._workerDestroying = false;
            this._worker.terminate();
            this._worker = null;
            return;
        }
        switch (message.msg) {
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.INIT_SEGMENT:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_SEGMENT:
                this._emitter.emit(message.msg, data.type, data.data);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.LOADING_COMPLETE:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOVERED_EARLY_EOF:
                this._emitter.emit(message.msg);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_INFO:
                Object.setPrototypeOf(data, _media_info_js__WEBPACK_IMPORTED_MODULE_6__.default.prototype);
                this._emitter.emit(message.msg, data);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.METADATA_ARRIVED:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.SCRIPTDATA_ARRIVED:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.STATISTICS_INFO:
                this._emitter.emit(message.msg, data);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.IO_ERROR:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.DEMUX_ERROR:
                this._emitter.emit(message.msg, data.type, data.info);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOMMEND_SEEKPOINT:
                this._emitter.emit(message.msg, data);
                break;
            case 'logcat_callback':
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_2__.default.emitter.emit('log', data.type, data.logcat);
                break;
            default:
                break;
        }
    };
    return Transmuxer;
}());
/* harmony default export */ __webpack_exports__["default"] = (Transmuxer);


/***/ }),

/***/ "./src/core/transmuxing-controller.js":
/*!********************************************!*\
  !*** ./src/core/transmuxing-controller.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/browser.js */ "./src/utils/browser.js");
/* harmony import */ var _media_info_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./media-info.js */ "./src/core/media-info.js");
/* harmony import */ var _demux_flv_demuxer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demux/flv-demuxer.js */ "./src/demux/flv-demuxer.js");
/* harmony import */ var _remux_mp4_remuxer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../remux/mp4-remuxer.js */ "./src/remux/mp4-remuxer.js");
/* harmony import */ var _demux_demux_errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../demux/demux-errors.js */ "./src/demux/demux-errors.js");
/* harmony import */ var _io_io_controller_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../io/io-controller.js */ "./src/io/io-controller.js");
/* harmony import */ var _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transmuxing-events.js */ "./src/core/transmuxing-events.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









// Transmuxing (IO, Demuxing, Remuxing) controller, with multipart support
var TransmuxingController = /** @class */ (function () {
    function TransmuxingController(mediaDataSource, config) {
        this.TAG = 'TransmuxingController';
        this._emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        this._config = config;
        // treat single part media as multipart media, which has only one segment
        if (!mediaDataSource.segments) {
            mediaDataSource.segments = [{
                    duration: mediaDataSource.duration,
                    filesize: mediaDataSource.filesize,
                    url: mediaDataSource.url
                }];
        }
        // fill in default IO params if not exists
        if (typeof mediaDataSource.cors !== 'boolean') {
            mediaDataSource.cors = true;
        }
        if (typeof mediaDataSource.withCredentials !== 'boolean') {
            mediaDataSource.withCredentials = false;
        }
        this._mediaDataSource = mediaDataSource;
        this._currentSegmentIndex = 0;
        var totalDuration = 0;
        this._mediaDataSource.segments.forEach(function (segment) {
            // timestampBase for each segment, and calculate total duration
            segment.timestampBase = totalDuration;
            totalDuration += segment.duration;
            // params needed by IOController
            segment.cors = mediaDataSource.cors;
            segment.withCredentials = mediaDataSource.withCredentials;
            // referrer policy control, if exist
            if (config.referrerPolicy) {
                segment.referrerPolicy = config.referrerPolicy;
            }
        });
        if (!isNaN(totalDuration) && this._mediaDataSource.duration !== totalDuration) {
            this._mediaDataSource.duration = totalDuration;
        }
        this._mediaInfo = null;
        this._demuxer = null;
        this._remuxer = null;
        this._ioctl = null;
        this._pendingSeekTime = null;
        this._pendingResolveSeekPoint = null;
        this._statisticsReporter = null;
    }
    TransmuxingController.prototype.destroy = function () {
        this._mediaInfo = null;
        this._mediaDataSource = null;
        if (this._statisticsReporter) {
            this._disableStatisticsReporter();
        }
        if (this._ioctl) {
            this._ioctl.destroy();
            this._ioctl = null;
        }
        if (this._demuxer) {
            this._demuxer.destroy();
            this._demuxer = null;
        }
        if (this._remuxer) {
            this._remuxer.destroy();
            this._remuxer = null;
        }
        this._emitter.removeAllListeners();
        this._emitter = null;
    };
    TransmuxingController.prototype.on = function (event, listener) {
        this._emitter.addListener(event, listener);
    };
    TransmuxingController.prototype.off = function (event, listener) {
        this._emitter.removeListener(event, listener);
    };
    TransmuxingController.prototype.start = function () {
        this._loadSegment(0);
        this._enableStatisticsReporter();
    };
    TransmuxingController.prototype._loadSegment = function (segmentIndex, optionalFrom) {
        this._currentSegmentIndex = segmentIndex;
        var dataSource = this._mediaDataSource.segments[segmentIndex];
        var ioctl = this._ioctl = new _io_io_controller_js__WEBPACK_IMPORTED_MODULE_7__.default(dataSource, this._config, segmentIndex);
        ioctl.onError = this._onIOException.bind(this);
        ioctl.onSeeked = this._onIOSeeked.bind(this);
        ioctl.onComplete = this._onIOComplete.bind(this);
        ioctl.onRedirect = this._onIORedirect.bind(this);
        ioctl.onRecoveredEarlyEof = this._onIORecoveredEarlyEof.bind(this);
        if (optionalFrom) {
            this._demuxer.bindDataSource(this._ioctl);
        }
        else {
            ioctl.onDataArrival = this._onInitChunkArrival.bind(this);
        }
        ioctl.open(optionalFrom);
    };
    TransmuxingController.prototype.stop = function () {
        this._internalAbort();
        this._disableStatisticsReporter();
    };
    TransmuxingController.prototype._internalAbort = function () {
        if (this._ioctl) {
            this._ioctl.destroy();
            this._ioctl = null;
        }
    };
    TransmuxingController.prototype.pause = function () {
        if (this._ioctl && this._ioctl.isWorking()) {
            this._ioctl.pause();
            this._disableStatisticsReporter();
        }
    };
    TransmuxingController.prototype.resume = function () {
        if (this._ioctl && this._ioctl.isPaused()) {
            this._ioctl.resume();
            this._enableStatisticsReporter();
        }
    };
    TransmuxingController.prototype.seek = function (milliseconds) {
        if (this._mediaInfo == null || !this._mediaInfo.isSeekable()) {
            return;
        }
        var targetSegmentIndex = this._searchSegmentIndexContains(milliseconds);
        if (targetSegmentIndex === this._currentSegmentIndex) {
            // intra-segment seeking
            var segmentInfo = this._mediaInfo.segments[targetSegmentIndex];
            if (segmentInfo == undefined) {
                // current segment loading started, but mediainfo hasn't received yet
                // wait for the metadata loaded, then seek to expected position
                this._pendingSeekTime = milliseconds;
            }
            else {
                var keyframe = segmentInfo.getNearestKeyframe(milliseconds);
                this._remuxer.seek(keyframe.milliseconds);
                this._ioctl.seek(keyframe.fileposition);
                // Will be resolved in _onRemuxerMediaSegmentArrival()
                this._pendingResolveSeekPoint = keyframe.milliseconds;
            }
        }
        else {
            // cross-segment seeking
            var targetSegmentInfo = this._mediaInfo.segments[targetSegmentIndex];
            if (targetSegmentInfo == undefined) {
                // target segment hasn't been loaded. We need metadata then seek to expected time
                this._pendingSeekTime = milliseconds;
                this._internalAbort();
                this._remuxer.seek();
                this._remuxer.insertDiscontinuity();
                this._loadSegment(targetSegmentIndex);
                // Here we wait for the metadata loaded, then seek to expected position
            }
            else {
                // We have target segment's metadata, direct seek to target position
                var keyframe = targetSegmentInfo.getNearestKeyframe(milliseconds);
                this._internalAbort();
                this._remuxer.seek(milliseconds);
                this._remuxer.insertDiscontinuity();
                this._demuxer.resetMediaInfo();
                this._demuxer.timestampBase = this._mediaDataSource.segments[targetSegmentIndex].timestampBase;
                this._loadSegment(targetSegmentIndex, keyframe.fileposition);
                this._pendingResolveSeekPoint = keyframe.milliseconds;
                this._reportSegmentMediaInfo(targetSegmentIndex);
            }
        }
        this._enableStatisticsReporter();
    };
    TransmuxingController.prototype._searchSegmentIndexContains = function (milliseconds) {
        var segments = this._mediaDataSource.segments;
        var idx = segments.length - 1;
        for (var i = 0; i < segments.length; i++) {
            if (milliseconds < segments[i].timestampBase) {
                idx = i - 1;
                break;
            }
        }
        return idx;
    };
    TransmuxingController.prototype._onInitChunkArrival = function (data, byteStart) {
        var _this = this;
        var probeData = null;
        var consumed = 0;
        if (byteStart > 0) {
            // IOController seeked immediately after opened, byteStart > 0 callback may received
            this._demuxer.bindDataSource(this._ioctl);
            this._demuxer.timestampBase = this._mediaDataSource.segments[this._currentSegmentIndex].timestampBase;
            consumed = this._demuxer.parseChunks(data, byteStart);
        }
        else if ((probeData = _demux_flv_demuxer_js__WEBPACK_IMPORTED_MODULE_4__.default.probe(data)).match) {
            // Always create new FLVDemuxer
            this._demuxer = new _demux_flv_demuxer_js__WEBPACK_IMPORTED_MODULE_4__.default(probeData, this._config);
            if (!this._remuxer) {
                this._remuxer = new _remux_mp4_remuxer_js__WEBPACK_IMPORTED_MODULE_5__.default(this._config);
            }
            var mds = this._mediaDataSource;
            if (mds.duration != undefined && !isNaN(mds.duration)) {
                this._demuxer.overridedDuration = mds.duration;
            }
            if (typeof mds.hasAudio === 'boolean') {
                this._demuxer.overridedHasAudio = mds.hasAudio;
            }
            if (typeof mds.hasVideo === 'boolean') {
                this._demuxer.overridedHasVideo = mds.hasVideo;
            }
            this._demuxer.timestampBase = mds.segments[this._currentSegmentIndex].timestampBase;
            this._demuxer.onError = this._onDemuxException.bind(this);
            this._demuxer.onMediaInfo = this._onMediaInfo.bind(this);
            this._demuxer.onMetaDataArrived = this._onMetaDataArrived.bind(this);
            this._demuxer.onScriptDataArrived = this._onScriptDataArrived.bind(this);
            this._remuxer.bindDataSource(this._demuxer
                .bindDataSource(this._ioctl));
            this._remuxer.onInitSegment = this._onRemuxerInitSegmentArrival.bind(this);
            this._remuxer.onMediaSegment = this._onRemuxerMediaSegmentArrival.bind(this);
            consumed = this._demuxer.parseChunks(data, byteStart);
        }
        else {
            probeData = null;
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, 'Non-FLV, Unsupported media type!');
            Promise.resolve().then(function () {
                _this._internalAbort();
            });
            this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.DEMUX_ERROR, _demux_demux_errors_js__WEBPACK_IMPORTED_MODULE_6__.default.FORMAT_UNSUPPORTED, 'Non-FLV, Unsupported media type');
            consumed = 0;
        }
        return consumed;
    };
    TransmuxingController.prototype._onMediaInfo = function (mediaInfo) {
        var _this = this;
        if (this._mediaInfo == null) {
            // Store first segment's mediainfo as global mediaInfo
            this._mediaInfo = Object.assign({}, mediaInfo);
            this._mediaInfo.keyframesIndex = null;
            this._mediaInfo.segments = [];
            this._mediaInfo.segmentCount = this._mediaDataSource.segments.length;
            Object.setPrototypeOf(this._mediaInfo, _media_info_js__WEBPACK_IMPORTED_MODULE_3__.default.prototype);
        }
        var segmentInfo = Object.assign({}, mediaInfo);
        Object.setPrototypeOf(segmentInfo, _media_info_js__WEBPACK_IMPORTED_MODULE_3__.default.prototype);
        this._mediaInfo.segments[this._currentSegmentIndex] = segmentInfo;
        // notify mediaInfo update
        this._reportSegmentMediaInfo(this._currentSegmentIndex);
        if (this._pendingSeekTime != null) {
            Promise.resolve().then(function () {
                var target = _this._pendingSeekTime;
                _this._pendingSeekTime = null;
                _this.seek(target);
            });
        }
    };
    TransmuxingController.prototype._onMetaDataArrived = function (metadata) {
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.METADATA_ARRIVED, metadata);
    };
    TransmuxingController.prototype._onScriptDataArrived = function (data) {
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.SCRIPTDATA_ARRIVED, data);
    };
    TransmuxingController.prototype._onIOSeeked = function () {
        this._remuxer.insertDiscontinuity();
    };
    TransmuxingController.prototype._onIOComplete = function (extraData) {
        var segmentIndex = extraData;
        var nextSegmentIndex = segmentIndex + 1;
        if (nextSegmentIndex < this._mediaDataSource.segments.length) {
            this._internalAbort();
            this._remuxer.flushStashedSamples();
            this._loadSegment(nextSegmentIndex);
        }
        else {
            this._remuxer.flushStashedSamples();
            this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.LOADING_COMPLETE);
            this._disableStatisticsReporter();
        }
    };
    TransmuxingController.prototype._onIORedirect = function (redirectedURL) {
        var segmentIndex = this._ioctl.extraData;
        this._mediaDataSource.segments[segmentIndex].redirectedURL = redirectedURL;
    };
    TransmuxingController.prototype._onIORecoveredEarlyEof = function () {
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.RECOVERED_EARLY_EOF);
    };
    TransmuxingController.prototype._onIOException = function (type, info) {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, "IOException: type = " + type + ", code = " + info.code + ", msg = " + info.msg);
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.IO_ERROR, type, info);
        this._disableStatisticsReporter();
    };
    TransmuxingController.prototype._onDemuxException = function (type, info) {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, "DemuxException: type = " + type + ", info = " + info);
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.DEMUX_ERROR, type, info);
    };
    TransmuxingController.prototype._onRemuxerInitSegmentArrival = function (type, initSegment) {
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.INIT_SEGMENT, type, initSegment);
    };
    TransmuxingController.prototype._onRemuxerMediaSegmentArrival = function (type, mediaSegment) {
        if (this._pendingSeekTime != null) {
            // Media segments after new-segment cross-seeking should be dropped.
            return;
        }
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.MEDIA_SEGMENT, type, mediaSegment);
        // Resolve pending seekPoint
        if (this._pendingResolveSeekPoint != null && type === 'video') {
            var syncPoints = mediaSegment.info.syncPoints;
            var seekpoint = this._pendingResolveSeekPoint;
            this._pendingResolveSeekPoint = null;
            // Safari: Pass PTS for recommend_seekpoint
            if (_utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari && syncPoints.length > 0 && syncPoints[0].originalDts === seekpoint) {
                seekpoint = syncPoints[0].pts;
            }
            // else: use original DTS (keyframe.milliseconds)
            this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.RECOMMEND_SEEKPOINT, seekpoint);
        }
    };
    TransmuxingController.prototype._enableStatisticsReporter = function () {
        if (this._statisticsReporter == null) {
            this._statisticsReporter = self.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval);
        }
    };
    TransmuxingController.prototype._disableStatisticsReporter = function () {
        if (this._statisticsReporter) {
            self.clearInterval(this._statisticsReporter);
            this._statisticsReporter = null;
        }
    };
    TransmuxingController.prototype._reportSegmentMediaInfo = function (segmentIndex) {
        var segmentInfo = this._mediaInfo.segments[segmentIndex];
        var exportInfo = Object.assign({}, segmentInfo);
        exportInfo.duration = this._mediaInfo.duration;
        exportInfo.segmentCount = this._mediaInfo.segmentCount;
        delete exportInfo.segments;
        delete exportInfo.keyframesIndex;
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.MEDIA_INFO, exportInfo);
    };
    TransmuxingController.prototype._reportStatisticsInfo = function () {
        var info = {};
        info.url = this._ioctl.currentURL;
        info.hasRedirect = this._ioctl.hasRedirect;
        if (info.hasRedirect) {
            info.redirectedURL = this._ioctl.currentRedirectedURL;
        }
        info.speed = this._ioctl.currentSpeed;
        info.loaderType = this._ioctl.loaderType;
        info.currentSegmentIndex = this._currentSegmentIndex;
        info.totalSegmentCount = this._mediaDataSource.segments.length;
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.STATISTICS_INFO, info);
    };
    return TransmuxingController;
}());
/* harmony default export */ __webpack_exports__["default"] = (TransmuxingController);


/***/ }),

/***/ "./src/core/transmuxing-events.js":
/*!****************************************!*\
  !*** ./src/core/transmuxing-events.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var TransmuxingEvents = {
    IO_ERROR: 'io_error',
    DEMUX_ERROR: 'demux_error',
    INIT_SEGMENT: 'init_segment',
    MEDIA_SEGMENT: 'media_segment',
    LOADING_COMPLETE: 'loading_complete',
    RECOVERED_EARLY_EOF: 'recovered_early_eof',
    MEDIA_INFO: 'media_info',
    METADATA_ARRIVED: 'metadata_arrived',
    SCRIPTDATA_ARRIVED: 'scriptdata_arrived',
    STATISTICS_INFO: 'statistics_info',
    RECOMMEND_SEEKPOINT: 'recommend_seekpoint'
};
/* harmony default export */ __webpack_exports__["default"] = (TransmuxingEvents);


/***/ }),

/***/ "./src/core/transmuxing-worker.js":
/*!****************************************!*\
  !*** ./src/core/transmuxing-worker.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logging-control.js */ "./src/utils/logging-control.js");
/* harmony import */ var _utils_polyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/polyfill.js */ "./src/utils/polyfill.js");
/* harmony import */ var _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transmuxing-controller.js */ "./src/core/transmuxing-controller.js");
/* harmony import */ var _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transmuxing-events.js */ "./src/core/transmuxing-events.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/* post message to worker:
   data: {
       cmd: string
       param: any
   }

   receive message from worker:
   data: {
       msg: string,
       data: any
   }
 */
var TransmuxingWorker = function (self) {
    var TAG = 'TransmuxingWorker';
    var controller = null;
    var logcatListener = onLogcatCallback.bind(this);
    _utils_polyfill_js__WEBPACK_IMPORTED_MODULE_1__.default.install();
    self.addEventListener('message', function (e) {
        switch (e.data.cmd) {
            case 'init':
                controller = new _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_2__.default(e.data.param[0], e.data.param[1]);
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.IO_ERROR, onIOError.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.DEMUX_ERROR, onDemuxError.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.INIT_SEGMENT, onInitSegment.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_SEGMENT, onMediaSegment.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.LOADING_COMPLETE, onLoadingComplete.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.RECOVERED_EARLY_EOF, onRecoveredEarlyEof.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_INFO, onMediaInfo.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.METADATA_ARRIVED, onMetaDataArrived.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.SCRIPTDATA_ARRIVED, onScriptDataArrived.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.STATISTICS_INFO, onStatisticsInfo.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.RECOMMEND_SEEKPOINT, onRecommendSeekpoint.bind(this));
                break;
            case 'destroy':
                if (controller) {
                    controller.destroy();
                    controller = null;
                }
                self.postMessage({ msg: 'destroyed' });
                break;
            case 'start':
                controller.start();
                break;
            case 'stop':
                controller.stop();
                break;
            case 'seek':
                controller.seek(e.data.param);
                break;
            case 'pause':
                controller.pause();
                break;
            case 'resume':
                controller.resume();
                break;
            case 'logging_config': {
                var config = e.data.param;
                _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_0__.default.applyConfig(config);
                if (config.enableCallback === true) {
                    _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_0__.default.addLogListener(logcatListener);
                }
                else {
                    _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_0__.default.removeLogListener(logcatListener);
                }
                break;
            }
        }
    });
    function onInitSegment(type, initSegment) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.INIT_SEGMENT,
            data: {
                type: type,
                data: initSegment
            }
        };
        self.postMessage(obj, [initSegment.data]); // data: ArrayBuffer
    }
    function onMediaSegment(type, mediaSegment) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_SEGMENT,
            data: {
                type: type,
                data: mediaSegment
            }
        };
        self.postMessage(obj, [mediaSegment.data]); // data: ArrayBuffer
    }
    function onLoadingComplete() {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.LOADING_COMPLETE
        };
        self.postMessage(obj);
    }
    function onRecoveredEarlyEof() {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.RECOVERED_EARLY_EOF
        };
        self.postMessage(obj);
    }
    function onMediaInfo(mediaInfo) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_INFO,
            data: mediaInfo
        };
        self.postMessage(obj);
    }
    function onMetaDataArrived(metadata) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.METADATA_ARRIVED,
            data: metadata
        };
        self.postMessage(obj);
    }
    function onScriptDataArrived(data) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.SCRIPTDATA_ARRIVED,
            data: data
        };
        self.postMessage(obj);
    }
    function onStatisticsInfo(statInfo) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.STATISTICS_INFO,
            data: statInfo
        };
        self.postMessage(obj);
    }
    function onIOError(type, info) {
        self.postMessage({
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.IO_ERROR,
            data: {
                type: type,
                info: info
            }
        });
    }
    function onDemuxError(type, info) {
        self.postMessage({
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.DEMUX_ERROR,
            data: {
                type: type,
                info: info
            }
        });
    }
    function onRecommendSeekpoint(milliseconds) {
        self.postMessage({
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.RECOMMEND_SEEKPOINT,
            data: milliseconds
        });
    }
    function onLogcatCallback(type, str) {
        self.postMessage({
            msg: 'logcat_callback',
            data: {
                type: type,
                logcat: str
            }
        });
    }
};
/* harmony default export */ __webpack_exports__["default"] = (TransmuxingWorker);


/***/ }),

/***/ "./src/demux/amf-parser.js":
/*!*********************************!*\
  !*** ./src/demux/amf-parser.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _utils_utf8_conv_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utf8-conv.js */ "./src/utils/utf8-conv.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var le = (function () {
    var buf = new ArrayBuffer(2);
    (new DataView(buf)).setInt16(0, 256, true); // little-endian write
    return (new Int16Array(buf))[0] === 256; // platform-spec read, if equal then LE
})();
var AMF = /** @class */ (function () {
    function AMF() {
    }
    AMF.parseScriptData = function (arrayBuffer, dataOffset, dataSize) {
        var data = {};
        try {
            var name_1 = AMF.parseValue(arrayBuffer, dataOffset, dataSize);
            var value = AMF.parseValue(arrayBuffer, dataOffset + name_1.size, dataSize - name_1.size);
            data[name_1.data] = value.data;
        }
        catch (e) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.e('AMF', e.toString());
        }
        return data;
    };
    AMF.parseObject = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 3) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data not enough when parse ScriptDataObject');
        }
        var name = AMF.parseString(arrayBuffer, dataOffset, dataSize);
        var value = AMF.parseValue(arrayBuffer, dataOffset + name.size, dataSize - name.size);
        var isObjectEnd = value.objectEnd;
        return {
            data: {
                name: name.data,
                value: value.data
            },
            size: name.size + value.size,
            objectEnd: isObjectEnd
        };
    };
    AMF.parseVariable = function (arrayBuffer, dataOffset, dataSize) {
        return AMF.parseObject(arrayBuffer, dataOffset, dataSize);
    };
    AMF.parseString = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 2) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data not enough when parse String');
        }
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var length = v.getUint16(0, !le);
        var str;
        if (length > 0) {
            str = (0,_utils_utf8_conv_js__WEBPACK_IMPORTED_MODULE_1__.default)(new Uint8Array(arrayBuffer, dataOffset + 2, length));
        }
        else {
            str = '';
        }
        return {
            data: str,
            size: 2 + length
        };
    };
    AMF.parseLongString = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 4) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data not enough when parse LongString');
        }
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var length = v.getUint32(0, !le);
        var str;
        if (length > 0) {
            str = (0,_utils_utf8_conv_js__WEBPACK_IMPORTED_MODULE_1__.default)(new Uint8Array(arrayBuffer, dataOffset + 4, length));
        }
        else {
            str = '';
        }
        return {
            data: str,
            size: 4 + length
        };
    };
    AMF.parseDate = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 10) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data size invalid when parse Date');
        }
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var timestamp = v.getFloat64(0, !le);
        var localTimeOffset = v.getInt16(8, !le);
        timestamp += localTimeOffset * 60 * 1000; // get UTC time
        return {
            data: new Date(timestamp),
            size: 8 + 2
        };
    };
    AMF.parseValue = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 1) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data not enough when parse Value');
        }
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var offset = 1;
        var type = v.getUint8(0);
        var value;
        var objectEnd = false;
        try {
            switch (type) {
                case 0: // Number(Double) type
                    value = v.getFloat64(1, !le);
                    offset += 8;
                    break;
                case 1: { // Boolean type
                    var b = v.getUint8(1);
                    value = b ? true : false;
                    offset += 1;
                    break;
                }
                case 2: { // String type
                    var amfstr = AMF.parseString(arrayBuffer, dataOffset + 1, dataSize - 1);
                    value = amfstr.data;
                    offset += amfstr.size;
                    break;
                }
                case 3: { // Object(s) type
                    value = {};
                    var terminal = 0; // workaround for malformed Objects which has missing ScriptDataObjectEnd
                    if ((v.getUint32(dataSize - 4, !le) & 0x00FFFFFF) === 9) {
                        terminal = 3;
                    }
                    while (offset < dataSize - 4) { // 4 === type(UI8) + ScriptDataObjectEnd(UI24)
                        var amfobj = AMF.parseObject(arrayBuffer, dataOffset + offset, dataSize - offset - terminal);
                        if (amfobj.objectEnd)
                            break;
                        value[amfobj.data.name] = amfobj.data.value;
                        offset += amfobj.size;
                    }
                    if (offset <= dataSize - 3) {
                        var marker = v.getUint32(offset - 1, !le) & 0x00FFFFFF;
                        if (marker === 9) {
                            offset += 3;
                        }
                    }
                    break;
                }
                case 8: { // ECMA array type (Mixed array)
                    value = {};
                    offset += 4; // ECMAArrayLength(UI32)
                    var terminal = 0; // workaround for malformed MixedArrays which has missing ScriptDataObjectEnd
                    if ((v.getUint32(dataSize - 4, !le) & 0x00FFFFFF) === 9) {
                        terminal = 3;
                    }
                    while (offset < dataSize - 8) { // 8 === type(UI8) + ECMAArrayLength(UI32) + ScriptDataVariableEnd(UI24)
                        var amfvar = AMF.parseVariable(arrayBuffer, dataOffset + offset, dataSize - offset - terminal);
                        if (amfvar.objectEnd)
                            break;
                        value[amfvar.data.name] = amfvar.data.value;
                        offset += amfvar.size;
                    }
                    if (offset <= dataSize - 3) {
                        var marker = v.getUint32(offset - 1, !le) & 0x00FFFFFF;
                        if (marker === 9) {
                            offset += 3;
                        }
                    }
                    break;
                }
                case 9: // ScriptDataObjectEnd
                    value = undefined;
                    offset = 1;
                    objectEnd = true;
                    break;
                case 10: { // Strict array type
                    // ScriptDataValue[n]. NOTE: according to video_file_format_spec_v10_1.pdf
                    value = [];
                    var strictArrayLength = v.getUint32(1, !le);
                    offset += 4;
                    for (var i = 0; i < strictArrayLength; i++) {
                        var val = AMF.parseValue(arrayBuffer, dataOffset + offset, dataSize - offset);
                        value.push(val.data);
                        offset += val.size;
                    }
                    break;
                }
                case 11: { // Date type
                    var date = AMF.parseDate(arrayBuffer, dataOffset + 1, dataSize - 1);
                    value = date.data;
                    offset += date.size;
                    break;
                }
                case 12: { // Long string type
                    var amfLongStr = AMF.parseString(arrayBuffer, dataOffset + 1, dataSize - 1);
                    value = amfLongStr.data;
                    offset += amfLongStr.size;
                    break;
                }
                default:
                    // ignore and skip
                    offset = dataSize;
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w('AMF', 'Unsupported AMF value type ' + type);
            }
        }
        catch (e) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.e('AMF', e.toString());
        }
        return {
            data: value,
            size: offset,
            objectEnd: objectEnd
        };
    };
    return AMF;
}());
/* harmony default export */ __webpack_exports__["default"] = (AMF);


/***/ }),

/***/ "./src/demux/demux-errors.js":
/*!***********************************!*\
  !*** ./src/demux/demux-errors.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DemuxErrors = {
    OK: 'OK',
    FORMAT_ERROR: 'FormatError',
    FORMAT_UNSUPPORTED: 'FormatUnsupported',
    CODEC_UNSUPPORTED: 'CodecUnsupported'
};
/* harmony default export */ __webpack_exports__["default"] = (DemuxErrors);


/***/ }),

/***/ "./src/demux/exp-golomb.js":
/*!*********************************!*\
  !*** ./src/demux/exp-golomb.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Exponential-Golomb buffer decoder
var ExpGolomb = /** @class */ (function () {
    function ExpGolomb(uint8array) {
        this.TAG = 'ExpGolomb';
        this._buffer = uint8array;
        this._buffer_index = 0;
        this._total_bytes = uint8array.byteLength;
        this._total_bits = uint8array.byteLength * 8;
        this._current_word = 0;
        this._current_word_bits_left = 0;
    }
    ExpGolomb.prototype.destroy = function () {
        this._buffer = null;
    };
    ExpGolomb.prototype._fillCurrentWord = function () {
        var buffer_bytes_left = this._total_bytes - this._buffer_index;
        if (buffer_bytes_left <= 0)
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_0__.IllegalStateException('ExpGolomb: _fillCurrentWord() but no bytes available');
        var bytes_read = Math.min(4, buffer_bytes_left);
        var word = new Uint8Array(4);
        word.set(this._buffer.subarray(this._buffer_index, this._buffer_index + bytes_read));
        this._current_word = new DataView(word.buffer).getUint32(0, false);
        this._buffer_index += bytes_read;
        this._current_word_bits_left = bytes_read * 8;
    };
    ExpGolomb.prototype.readBits = function (bits) {
        if (bits > 32)
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_0__.InvalidArgumentException('ExpGolomb: readBits() bits exceeded max 32bits!');
        if (bits <= this._current_word_bits_left) {
            var result_1 = this._current_word >>> (32 - bits);
            this._current_word <<= bits;
            this._current_word_bits_left -= bits;
            return result_1;
        }
        var result = this._current_word_bits_left ? this._current_word : 0;
        result = result >>> (32 - this._current_word_bits_left);
        var bits_need_left = bits - this._current_word_bits_left;
        this._fillCurrentWord();
        var bits_read_next = Math.min(bits_need_left, this._current_word_bits_left);
        var result2 = this._current_word >>> (32 - bits_read_next);
        this._current_word <<= bits_read_next;
        this._current_word_bits_left -= bits_read_next;
        result = (result << bits_read_next) | result2;
        return result;
    };
    ExpGolomb.prototype.readBool = function () {
        return this.readBits(1) === 1;
    };
    ExpGolomb.prototype.readByte = function () {
        return this.readBits(8);
    };
    ExpGolomb.prototype._skipLeadingZero = function () {
        var zero_count;
        for (zero_count = 0; zero_count < this._current_word_bits_left; zero_count++) {
            if (0 !== (this._current_word & (0x80000000 >>> zero_count))) {
                this._current_word <<= zero_count;
                this._current_word_bits_left -= zero_count;
                return zero_count;
            }
        }
        this._fillCurrentWord();
        return zero_count + this._skipLeadingZero();
    };
    ExpGolomb.prototype.readUEG = function () {
        var leading_zeros = this._skipLeadingZero();
        return this.readBits(leading_zeros + 1) - 1;
    };
    ExpGolomb.prototype.readSEG = function () {
        var value = this.readUEG();
        if (value & 0x01) {
            return (value + 1) >>> 1;
        }
        else {
            return -1 * (value >>> 1);
        }
    };
    return ExpGolomb;
}());
/* harmony default export */ __webpack_exports__["default"] = (ExpGolomb);


/***/ }),

/***/ "./src/demux/flv-demuxer.js":
/*!**********************************!*\
  !*** ./src/demux/flv-demuxer.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _amf_parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./amf-parser.js */ "./src/demux/amf-parser.js");
/* harmony import */ var _sps_parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sps-parser.js */ "./src/demux/sps-parser.js");
/* harmony import */ var _demux_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demux-errors.js */ "./src/demux/demux-errors.js");
/* harmony import */ var _core_media_info_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/media-info.js */ "./src/core/media-info.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






function Swap16(src) {
    return (((src >>> 8) & 0xFF) |
        ((src & 0xFF) << 8));
}
function Swap32(src) {
    return (((src & 0xFF000000) >>> 24) |
        ((src & 0x00FF0000) >>> 8) |
        ((src & 0x0000FF00) << 8) |
        ((src & 0x000000FF) << 24));
}
function ReadBig32(array, index) {
    return ((array[index] << 24) |
        (array[index + 1] << 16) |
        (array[index + 2] << 8) |
        (array[index + 3]));
}
var FLVDemuxer = /** @class */ (function () {
    function FLVDemuxer(probeData, config) {
        this.TAG = 'FLVDemuxer';
        this._config = config;
        this._onError = null;
        this._onMediaInfo = null;
        this._onMetaDataArrived = null;
        this._onScriptDataArrived = null;
        this._onTrackMetadata = null;
        this._onDataAvailable = null;
        this._dataOffset = probeData.dataOffset;
        this._firstParse = true;
        this._dispatch = false;
        this._hasAudio = probeData.hasAudioTrack;
        this._hasVideo = probeData.hasVideoTrack;
        this._hasAudioFlagOverrided = false;
        this._hasVideoFlagOverrided = false;
        this._audioInitialMetadataDispatched = false;
        this._videoInitialMetadataDispatched = false;
        this._mediaInfo = new _core_media_info_js__WEBPACK_IMPORTED_MODULE_4__.default();
        this._mediaInfo.hasAudio = this._hasAudio;
        this._mediaInfo.hasVideo = this._hasVideo;
        this._metadata = null;
        this._audioMetadata = null;
        this._videoMetadata = null;
        this._naluLengthSize = 4;
        this._timestampBase = 0; // int32, in milliseconds
        this._timescale = 1000;
        this._duration = 0; // int32, in milliseconds
        this._durationOverrided = false;
        this._referenceFrameRate = {
            fixed: true,
            fps: 23.976,
            fps_num: 23976,
            fps_den: 1000
        };
        this._flvSoundRateTable = [5500, 11025, 22050, 44100, 48000];
        this._mpegSamplingRates = [
            96000, 88200, 64000, 48000, 44100, 32000,
            24000, 22050, 16000, 12000, 11025, 8000, 7350
        ];
        this._mpegAudioV10SampleRateTable = [44100, 48000, 32000, 0];
        this._mpegAudioV20SampleRateTable = [22050, 24000, 16000, 0];
        this._mpegAudioV25SampleRateTable = [11025, 12000, 8000, 0];
        this._mpegAudioL1BitRateTable = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1];
        this._mpegAudioL2BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1];
        this._mpegAudioL3BitRateTable = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1];
        this._videoTrack = { type: 'video', id: 1, sequenceNumber: 0, samples: [], length: 0 };
        this._audioTrack = { type: 'audio', id: 2, sequenceNumber: 0, samples: [], length: 0 };
        this._littleEndian = (function () {
            var buf = new ArrayBuffer(2);
            (new DataView(buf)).setInt16(0, 256, true); // little-endian write
            return (new Int16Array(buf))[0] === 256; // platform-spec read, if equal then LE
        })();
    }
    FLVDemuxer.prototype.destroy = function () {
        this._mediaInfo = null;
        this._metadata = null;
        this._audioMetadata = null;
        this._videoMetadata = null;
        this._videoTrack = null;
        this._audioTrack = null;
        this._onError = null;
        this._onMediaInfo = null;
        this._onMetaDataArrived = null;
        this._onScriptDataArrived = null;
        this._onTrackMetadata = null;
        this._onDataAvailable = null;
    };
    FLVDemuxer.probe = function (buffer) {
        var data = new Uint8Array(buffer);
        var mismatch = { match: false };
        if (data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01) {
            return mismatch;
        }
        var hasAudio = ((data[4] & 4) >>> 2) !== 0;
        var hasVideo = (data[4] & 1) !== 0;
        var offset = ReadBig32(data, 5);
        if (offset < 9) {
            return mismatch;
        }
        return {
            match: true,
            consumed: offset,
            dataOffset: offset,
            hasAudioTrack: hasAudio,
            hasVideoTrack: hasVideo
        };
    };
    FLVDemuxer.prototype.bindDataSource = function (loader) {
        loader.onDataArrival = this.parseChunks.bind(this);
        return this;
    };
    Object.defineProperty(FLVDemuxer.prototype, "onTrackMetadata", {
        // prototype: function(type: string, metadata: any): void
        get: function () {
            return this._onTrackMetadata;
        },
        set: function (callback) {
            this._onTrackMetadata = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onMediaInfo", {
        // prototype: function(mediaInfo: MediaInfo): void
        get: function () {
            return this._onMediaInfo;
        },
        set: function (callback) {
            this._onMediaInfo = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onMetaDataArrived", {
        get: function () {
            return this._onMetaDataArrived;
        },
        set: function (callback) {
            this._onMetaDataArrived = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onScriptDataArrived", {
        get: function () {
            return this._onScriptDataArrived;
        },
        set: function (callback) {
            this._onScriptDataArrived = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onError", {
        // prototype: function(type: number, info: string): void
        get: function () {
            return this._onError;
        },
        set: function (callback) {
            this._onError = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onDataAvailable", {
        // prototype: function(videoTrack: any, audioTrack: any): void
        get: function () {
            return this._onDataAvailable;
        },
        set: function (callback) {
            this._onDataAvailable = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "timestampBase", {
        // timestamp base for output samples, must be in milliseconds
        get: function () {
            return this._timestampBase;
        },
        set: function (base) {
            this._timestampBase = base;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "overridedDuration", {
        get: function () {
            return this._duration;
        },
        // Force-override media duration. Must be in milliseconds, int32
        set: function (duration) {
            this._durationOverrided = true;
            this._duration = duration;
            this._mediaInfo.duration = duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "overridedHasAudio", {
        // Force-override audio track present flag, boolean
        set: function (hasAudio) {
            this._hasAudioFlagOverrided = true;
            this._hasAudio = hasAudio;
            this._mediaInfo.hasAudio = hasAudio;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "overridedHasVideo", {
        // Force-override video track present flag, boolean
        set: function (hasVideo) {
            this._hasVideoFlagOverrided = true;
            this._hasVideo = hasVideo;
            this._mediaInfo.hasVideo = hasVideo;
        },
        enumerable: false,
        configurable: true
    });
    FLVDemuxer.prototype.resetMediaInfo = function () {
        this._mediaInfo = new _core_media_info_js__WEBPACK_IMPORTED_MODULE_4__.default();
    };
    FLVDemuxer.prototype._isInitialMetadataDispatched = function () {
        if (this._hasAudio && this._hasVideo) { // both audio & video
            return this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched;
        }
        if (this._hasAudio && !this._hasVideo) { // audio only
            return this._audioInitialMetadataDispatched;
        }
        if (!this._hasAudio && this._hasVideo) { // video only
            return this._videoInitialMetadataDispatched;
        }
        return false;
    };
    // function parseChunks(chunk: ArrayBuffer, byteStart: number): number;
    FLVDemuxer.prototype.parseChunks = function (chunk, byteStart) {
        if (!this._onError || !this._onMediaInfo || !this._onTrackMetadata || !this._onDataAvailable) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__.IllegalStateException('Flv: onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified');
        }
        var offset = 0;
        var le = this._littleEndian;
        if (byteStart === 0) { // buffer with FLV header
            if (chunk.byteLength > 13) {
                var probeData = FLVDemuxer.probe(chunk);
                offset = probeData.dataOffset;
            }
            else {
                return 0;
            }
        }
        if (this._firstParse) { // handle PreviousTagSize0 before Tag1
            this._firstParse = false;
            if (byteStart + offset !== this._dataOffset) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'First time parsing but chunk byteStart invalid!');
            }
            var v = new DataView(chunk, offset);
            var prevTagSize0 = v.getUint32(0, !le);
            if (prevTagSize0 !== 0) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'PrevTagSize0 !== 0 !!!');
            }
            offset += 4;
        }
        while (offset < chunk.byteLength) {
            this._dispatch = true;
            var v = new DataView(chunk, offset);
            if (offset + 11 + 4 > chunk.byteLength) {
                // data not enough for parsing an flv tag
                break;
            }
            var tagType = v.getUint8(0);
            var dataSize = v.getUint32(0, !le) & 0x00FFFFFF;
            if (offset + 11 + dataSize + 4 > chunk.byteLength) {
                // data not enough for parsing actual data body
                break;
            }
            if (tagType !== 8 && tagType !== 9 && tagType !== 18) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Unsupported tag type " + tagType + ", skipped");
                // consume the whole tag (skip it)
                offset += 11 + dataSize + 4;
                continue;
            }
            var ts2 = v.getUint8(4);
            var ts1 = v.getUint8(5);
            var ts0 = v.getUint8(6);
            var ts3 = v.getUint8(7);
            var timestamp = ts0 | (ts1 << 8) | (ts2 << 16) | (ts3 << 24);
            var streamId = v.getUint32(7, !le) & 0x00FFFFFF;
            if (streamId !== 0) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Meet tag which has StreamID != 0!');
            }
            var dataOffset = offset + 11;
            switch (tagType) {
                case 8: // Audio
                    this._parseAudioData(chunk, dataOffset, dataSize, timestamp);
                    break;
                case 9: // Video
                    this._parseVideoData(chunk, dataOffset, dataSize, timestamp, byteStart + offset);
                    break;
                case 18: // ScriptDataObject
                    this._parseScriptData(chunk, dataOffset, dataSize);
                    break;
            }
            var prevTagSize = v.getUint32(11 + dataSize, !le);
            if (prevTagSize !== 11 + dataSize) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Invalid PrevTagSize " + prevTagSize);
            }
            offset += 11 + dataSize + 4; // tagBody + dataSize + prevTagSize
        }
        // dispatch parsed frames to consumer (typically, the remuxer)
        if (this._isInitialMetadataDispatched()) {
            if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
                this._onDataAvailable(this._audioTrack, this._videoTrack);
            }
        }
        return offset; // consumed bytes, just equals latest offset index
    };
    FLVDemuxer.prototype._parseScriptData = function (arrayBuffer, dataOffset, dataSize) {
        var scriptData = _amf_parser_js__WEBPACK_IMPORTED_MODULE_1__.default.parseScriptData(arrayBuffer, dataOffset, dataSize);
        if (scriptData.hasOwnProperty('onMetaData')) {
            if (scriptData.onMetaData == null || typeof scriptData.onMetaData !== 'object') {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Invalid onMetaData structure!');
                return;
            }
            if (this._metadata) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Found another onMetaData tag!');
            }
            this._metadata = scriptData;
            var onMetaData = this._metadata.onMetaData;
            if (this._onMetaDataArrived) {
                this._onMetaDataArrived(Object.assign({}, onMetaData));
            }
            if (typeof onMetaData.hasAudio === 'boolean') { // hasAudio
                if (this._hasAudioFlagOverrided === false) {
                    this._hasAudio = onMetaData.hasAudio;
                    this._mediaInfo.hasAudio = this._hasAudio;
                }
            }
            if (typeof onMetaData.hasVideo === 'boolean') { // hasVideo
                if (this._hasVideoFlagOverrided === false) {
                    this._hasVideo = onMetaData.hasVideo;
                    this._mediaInfo.hasVideo = this._hasVideo;
                }
            }
            if (typeof onMetaData.audiodatarate === 'number') { // audiodatarate
                this._mediaInfo.audioDataRate = onMetaData.audiodatarate;
            }
            if (typeof onMetaData.videodatarate === 'number') { // videodatarate
                this._mediaInfo.videoDataRate = onMetaData.videodatarate;
            }
            if (typeof onMetaData.width === 'number') { // width
                this._mediaInfo.width = onMetaData.width;
            }
            if (typeof onMetaData.height === 'number') { // height
                this._mediaInfo.height = onMetaData.height;
            }
            if (typeof onMetaData.duration === 'number') { // duration
                if (!this._durationOverrided) {
                    var duration = Math.floor(onMetaData.duration * this._timescale);
                    this._duration = duration;
                    this._mediaInfo.duration = duration;
                }
            }
            else {
                this._mediaInfo.duration = 0;
            }
            if (typeof onMetaData.framerate === 'number') { // framerate
                var fps_num = Math.floor(onMetaData.framerate * 1000);
                if (fps_num > 0) {
                    var fps = fps_num / 1000;
                    this._referenceFrameRate.fixed = true;
                    this._referenceFrameRate.fps = fps;
                    this._referenceFrameRate.fps_num = fps_num;
                    this._referenceFrameRate.fps_den = 1000;
                    this._mediaInfo.fps = fps;
                }
            }
            if (typeof onMetaData.keyframes === 'object') { // keyframes
                this._mediaInfo.hasKeyframesIndex = true;
                var keyframes = onMetaData.keyframes;
                this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(keyframes);
                onMetaData.keyframes = null; // keyframes has been extracted, remove it
            }
            else {
                this._mediaInfo.hasKeyframesIndex = false;
            }
            this._dispatch = false;
            this._mediaInfo.metadata = onMetaData;
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.v(this.TAG, 'Parsed onMetaData');
            if (this._mediaInfo.isComplete()) {
                this._onMediaInfo(this._mediaInfo);
            }
        }
        if (Object.keys(scriptData).length > 0) {
            if (this._onScriptDataArrived) {
                this._onScriptDataArrived(Object.assign({}, scriptData));
            }
        }
    };
    FLVDemuxer.prototype._parseKeyframesIndex = function (keyframes) {
        var times = [];
        var filepositions = [];
        // ignore first keyframe which is actually AVC Sequence Header (AVCDecoderConfigurationRecord)
        for (var i = 1; i < keyframes.times.length; i++) {
            var time = this._timestampBase + Math.floor(keyframes.times[i] * 1000);
            times.push(time);
            filepositions.push(keyframes.filepositions[i]);
        }
        return {
            times: times,
            filepositions: filepositions
        };
    };
    FLVDemuxer.prototype._parseAudioData = function (arrayBuffer, dataOffset, dataSize, tagTimestamp) {
        if (dataSize <= 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid audio packet, missing SoundData payload!');
            return;
        }
        if (this._hasAudioFlagOverrided === true && this._hasAudio === false) {
            // If hasAudio: false indicated explicitly in MediaDataSource,
            // Ignore all the audio packets
            return;
        }
        var le = this._littleEndian;
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var soundSpec = v.getUint8(0);
        var soundFormat = soundSpec >>> 4;
        if (soundFormat !== 2 && soundFormat !== 10) { // MP3 or AAC
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.CODEC_UNSUPPORTED, 'Flv: Unsupported audio codec idx: ' + soundFormat);
            return;
        }
        var soundRate = 0;
        var soundRateIndex = (soundSpec & 12) >>> 2;
        if (soundRateIndex >= 0 && soundRateIndex <= 4) {
            soundRate = this._flvSoundRateTable[soundRateIndex];
        }
        else {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: Invalid audio sample rate idx: ' + soundRateIndex);
            return;
        }
        var soundSize = (soundSpec & 2) >>> 1; // unused
        var soundType = (soundSpec & 1);
        var meta = this._audioMetadata;
        var track = this._audioTrack;
        if (!meta) {
            if (this._hasAudio === false && this._hasAudioFlagOverrided === false) {
                this._hasAudio = true;
                this._mediaInfo.hasAudio = true;
            }
            // initial metadata
            meta = this._audioMetadata = {};
            meta.type = 'audio';
            meta.id = track.id;
            meta.timescale = this._timescale;
            meta.duration = this._duration;
            meta.audioSampleRate = soundRate;
            meta.channelCount = (soundType === 0 ? 1 : 2);
        }
        if (soundFormat === 10) { // AAC
            var aacData = this._parseAACAudioData(arrayBuffer, dataOffset + 1, dataSize - 1);
            if (aacData == undefined) {
                return;
            }
            if (aacData.packetType === 0) { // AAC sequence header (AudioSpecificConfig)
                if (meta.config) {
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Found another AudioSpecificConfig!');
                }
                var misc = aacData.data;
                meta.audioSampleRate = misc.samplingRate;
                meta.channelCount = misc.channelCount;
                meta.codec = misc.codec;
                meta.originalCodec = misc.originalCodec;
                meta.config = misc.config;
                // The decode result of an aac sample is 1024 PCM samples
                meta.refSampleDuration = 1024 / meta.audioSampleRate * meta.timescale;
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.v(this.TAG, 'Parsed AudioSpecificConfig');
                if (this._isInitialMetadataDispatched()) {
                    // Non-initial metadata, force dispatch (or flush) parsed frames to remuxer
                    if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
                        this._onDataAvailable(this._audioTrack, this._videoTrack);
                    }
                }
                else {
                    this._audioInitialMetadataDispatched = true;
                }
                // then notify new metadata
                this._dispatch = false;
                this._onTrackMetadata('audio', meta);
                var mi = this._mediaInfo;
                mi.audioCodec = meta.originalCodec;
                mi.audioSampleRate = meta.audioSampleRate;
                mi.audioChannelCount = meta.channelCount;
                if (mi.hasVideo) {
                    if (mi.videoCodec != null) {
                        mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
                    }
                }
                else {
                    mi.mimeType = 'video/x-flv; codecs="' + mi.audioCodec + '"';
                }
                if (mi.isComplete()) {
                    this._onMediaInfo(mi);
                }
            }
            else if (aacData.packetType === 1) { // AAC raw frame data
                var dts = this._timestampBase + tagTimestamp;
                var aacSample = { unit: aacData.data, length: aacData.data.byteLength, dts: dts, pts: dts };
                track.samples.push(aacSample);
                track.length += aacData.data.length;
            }
            else {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.e(this.TAG, "Flv: Unsupported AAC data type " + aacData.packetType);
            }
        }
        else if (soundFormat === 2) { // MP3
            if (!meta.codec) {
                // We need metadata for mp3 audio track, extract info from frame header
                var misc = this._parseMP3AudioData(arrayBuffer, dataOffset + 1, dataSize - 1, true);
                if (misc == undefined) {
                    return;
                }
                meta.audioSampleRate = misc.samplingRate;
                meta.channelCount = misc.channelCount;
                meta.codec = misc.codec;
                meta.originalCodec = misc.originalCodec;
                // The decode result of an mp3 sample is 1152 PCM samples
                meta.refSampleDuration = 1152 / meta.audioSampleRate * meta.timescale;
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.v(this.TAG, 'Parsed MPEG Audio Frame Header');
                this._audioInitialMetadataDispatched = true;
                this._onTrackMetadata('audio', meta);
                var mi = this._mediaInfo;
                mi.audioCodec = meta.codec;
                mi.audioSampleRate = meta.audioSampleRate;
                mi.audioChannelCount = meta.channelCount;
                mi.audioDataRate = misc.bitRate;
                if (mi.hasVideo) {
                    if (mi.videoCodec != null) {
                        mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
                    }
                }
                else {
                    mi.mimeType = 'video/x-flv; codecs="' + mi.audioCodec + '"';
                }
                if (mi.isComplete()) {
                    this._onMediaInfo(mi);
                }
            }
            // This packet is always a valid audio packet, extract it
            var data = this._parseMP3AudioData(arrayBuffer, dataOffset + 1, dataSize - 1, false);
            if (data == undefined) {
                return;
            }
            var dts = this._timestampBase + tagTimestamp;
            var mp3Sample = { unit: data, length: data.byteLength, dts: dts, pts: dts };
            track.samples.push(mp3Sample);
            track.length += data.length;
        }
    };
    FLVDemuxer.prototype._parseAACAudioData = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize <= 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid AAC packet, missing AACPacketType or/and Data!');
            return;
        }
        var result = {};
        var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
        result.packetType = array[0];
        if (array[0] === 0) {
            result.data = this._parseAACAudioSpecificConfig(arrayBuffer, dataOffset + 1, dataSize - 1);
        }
        else {
            result.data = array.subarray(1);
        }
        return result;
    };
    FLVDemuxer.prototype._parseAACAudioSpecificConfig = function (arrayBuffer, dataOffset, dataSize) {
        var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
        var config = null;
        /* Audio Object Type:
           0: Null
           1: AAC Main
           2: AAC LC
           3: AAC SSR (Scalable Sample Rate)
           4: AAC LTP (Long Term Prediction)
           5: HE-AAC / SBR (Spectral Band Replication)
           6: AAC Scalable
        */
        var audioObjectType = 0;
        var originalAudioObjectType = 0;
        var audioExtensionObjectType = null;
        var samplingIndex = 0;
        var extensionSamplingIndex = null;
        // 5 bits
        audioObjectType = originalAudioObjectType = array[0] >>> 3;
        // 4 bits
        samplingIndex = ((array[0] & 0x07) << 1) | (array[1] >>> 7);
        if (samplingIndex < 0 || samplingIndex >= this._mpegSamplingRates.length) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: AAC invalid sampling frequency index!');
            return;
        }
        var samplingFrequence = this._mpegSamplingRates[samplingIndex];
        // 4 bits
        var channelConfig = (array[1] & 0x78) >>> 3;
        if (channelConfig < 0 || channelConfig >= 8) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: AAC invalid channel configuration');
            return;
        }
        if (audioObjectType === 5) { // HE-AAC?
            // 4 bits
            extensionSamplingIndex = ((array[1] & 0x07) << 1) | (array[2] >>> 7);
            // 5 bits
            audioExtensionObjectType = (array[2] & 0x7C) >>> 2;
        }
        // workarounds for various browsers
        var userAgent = self.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('firefox') !== -1) {
            // firefox: use SBR (HE-AAC) if freq less than 24kHz
            if (samplingIndex >= 6) {
                audioObjectType = 5;
                config = new Array(4);
                extensionSamplingIndex = samplingIndex - 3;
            }
            else { // use LC-AAC
                audioObjectType = 2;
                config = new Array(2);
                extensionSamplingIndex = samplingIndex;
            }
        }
        else if (userAgent.indexOf('android') !== -1) {
            // android: always use LC-AAC
            audioObjectType = 2;
            config = new Array(2);
            extensionSamplingIndex = samplingIndex;
        }
        else {
            // for other browsers, e.g. chrome...
            // Always use HE-AAC to make it easier to switch aac codec profile
            audioObjectType = 5;
            extensionSamplingIndex = samplingIndex;
            config = new Array(4);
            if (samplingIndex >= 6) {
                extensionSamplingIndex = samplingIndex - 3;
            }
            else if (channelConfig === 1) { // Mono channel
                audioObjectType = 2;
                config = new Array(2);
                extensionSamplingIndex = samplingIndex;
            }
        }
        config[0] = audioObjectType << 3;
        config[0] |= (samplingIndex & 0x0F) >>> 1;
        config[1] = (samplingIndex & 0x0F) << 7;
        config[1] |= (channelConfig & 0x0F) << 3;
        if (audioObjectType === 5) {
            config[1] |= ((extensionSamplingIndex & 0x0F) >>> 1);
            config[2] = (extensionSamplingIndex & 0x01) << 7;
            // extended audio object type: force to 2 (LC-AAC)
            config[2] |= (2 << 2);
            config[3] = 0;
        }
        return {
            config: config,
            samplingRate: samplingFrequence,
            channelCount: channelConfig,
            codec: 'mp4a.40.' + audioObjectType,
            originalCodec: 'mp4a.40.' + originalAudioObjectType
        };
    };
    FLVDemuxer.prototype._parseMP3AudioData = function (arrayBuffer, dataOffset, dataSize, requestHeader) {
        if (dataSize < 4) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid MP3 packet, header missing!');
            return;
        }
        var le = this._littleEndian;
        var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
        var result = null;
        if (requestHeader) {
            if (array[0] !== 0xFF) {
                return;
            }
            var ver = (array[1] >>> 3) & 0x03;
            var layer = (array[1] & 0x06) >> 1;
            var bitrate_index = (array[2] & 0xF0) >>> 4;
            var sampling_freq_index = (array[2] & 0x0C) >>> 2;
            var channel_mode = (array[3] >>> 6) & 0x03;
            var channel_count = channel_mode !== 3 ? 2 : 1;
            var sample_rate = 0;
            var bit_rate = 0;
            var object_type = 34; // Layer-3, listed in MPEG-4 Audio Object Types
            var codec = 'mp3';
            switch (ver) {
                case 0: // MPEG 2.5
                    sample_rate = this._mpegAudioV25SampleRateTable[sampling_freq_index];
                    break;
                case 2: // MPEG 2
                    sample_rate = this._mpegAudioV20SampleRateTable[sampling_freq_index];
                    break;
                case 3: // MPEG 1
                    sample_rate = this._mpegAudioV10SampleRateTable[sampling_freq_index];
                    break;
            }
            switch (layer) {
                case 1: // Layer 3
                    object_type = 34;
                    if (bitrate_index < this._mpegAudioL3BitRateTable.length) {
                        bit_rate = this._mpegAudioL3BitRateTable[bitrate_index];
                    }
                    break;
                case 2: // Layer 2
                    object_type = 33;
                    if (bitrate_index < this._mpegAudioL2BitRateTable.length) {
                        bit_rate = this._mpegAudioL2BitRateTable[bitrate_index];
                    }
                    break;
                case 3: // Layer 1
                    object_type = 32;
                    if (bitrate_index < this._mpegAudioL1BitRateTable.length) {
                        bit_rate = this._mpegAudioL1BitRateTable[bitrate_index];
                    }
                    break;
            }
            result = {
                bitRate: bit_rate,
                samplingRate: sample_rate,
                channelCount: channel_count,
                codec: codec,
                originalCodec: codec
            };
        }
        else {
            result = array;
        }
        return result;
    };
    FLVDemuxer.prototype._parseVideoData = function (arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition) {
        if (dataSize <= 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid video packet, missing VideoData payload!');
            return;
        }
        if (this._hasVideoFlagOverrided === true && this._hasVideo === false) {
            // If hasVideo: false indicated explicitly in MediaDataSource,
            // Ignore all the video packets
            return;
        }
        var spec = (new Uint8Array(arrayBuffer, dataOffset, dataSize))[0];
        var frameType = (spec & 240) >>> 4;
        var codecId = spec & 15;
        if (codecId !== 7) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: " + codecId);
            return;
        }
        this._parseAVCVideoPacket(arrayBuffer, dataOffset + 1, dataSize - 1, tagTimestamp, tagPosition, frameType);
    };
    FLVDemuxer.prototype._parseAVCVideoPacket = function (arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType) {
        if (dataSize < 4) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
            return;
        }
        var le = this._littleEndian;
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var packetType = v.getUint8(0);
        var cts_unsigned = v.getUint32(0, !le) & 0x00FFFFFF;
        var cts = (cts_unsigned << 8) >> 8; // convert to 24-bit signed int
        if (packetType === 0) { // AVCDecoderConfigurationRecord
            this._parseAVCDecoderConfigurationRecord(arrayBuffer, dataOffset + 4, dataSize - 4);
        }
        else if (packetType === 1) { // One or more Nalus
            this._parseAVCVideoData(arrayBuffer, dataOffset + 4, dataSize - 4, tagTimestamp, tagPosition, frameType, cts);
        }
        else if (packetType === 2) {
            // empty, AVC end of sequence
        }
        else {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, "Flv: Invalid video packet type " + packetType);
            return;
        }
    };
    FLVDemuxer.prototype._parseAVCDecoderConfigurationRecord = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 7) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid AVCDecoderConfigurationRecord, lack of data!');
            return;
        }
        var meta = this._videoMetadata;
        var track = this._videoTrack;
        var le = this._littleEndian;
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        if (!meta) {
            if (this._hasVideo === false && this._hasVideoFlagOverrided === false) {
                this._hasVideo = true;
                this._mediaInfo.hasVideo = true;
            }
            meta = this._videoMetadata = {};
            meta.type = 'video';
            meta.id = track.id;
            meta.timescale = this._timescale;
            meta.duration = this._duration;
        }
        else {
            if (typeof meta.avcc !== 'undefined') {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Found another AVCDecoderConfigurationRecord!');
            }
        }
        var version = v.getUint8(0); // configurationVersion
        var avcProfile = v.getUint8(1); // avcProfileIndication
        var profileCompatibility = v.getUint8(2); // profile_compatibility
        var avcLevel = v.getUint8(3); // AVCLevelIndication
        if (version !== 1 || avcProfile === 0) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord');
            return;
        }
        this._naluLengthSize = (v.getUint8(4) & 3) + 1; // lengthSizeMinusOne
        if (this._naluLengthSize !== 3 && this._naluLengthSize !== 4) { // holy shit!!!
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1));
            return;
        }
        var spsCount = v.getUint8(5) & 31; // numOfSequenceParameterSets
        if (spsCount === 0) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord: No SPS');
            return;
        }
        else if (spsCount > 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: SPS Count = " + spsCount);
        }
        var offset = 6;
        for (var i = 0; i < spsCount; i++) {
            var len = v.getUint16(offset, !le); // sequenceParameterSetLength
            offset += 2;
            if (len === 0) {
                continue;
            }
            // Notice: Nalu without startcode header (00 00 00 01)
            var sps = new Uint8Array(arrayBuffer, dataOffset + offset, len);
            offset += len;
            var config = _sps_parser_js__WEBPACK_IMPORTED_MODULE_2__.default.parseSPS(sps);
            if (i !== 0) {
                // ignore other sps's config
                continue;
            }
            meta.codecWidth = config.codec_size.width;
            meta.codecHeight = config.codec_size.height;
            meta.presentWidth = config.present_size.width;
            meta.presentHeight = config.present_size.height;
            meta.profile = config.profile_string;
            meta.level = config.level_string;
            meta.bitDepth = config.bit_depth;
            meta.chromaFormat = config.chroma_format;
            meta.sarRatio = config.sar_ratio;
            meta.frameRate = config.frame_rate;
            if (config.frame_rate.fixed === false ||
                config.frame_rate.fps_num === 0 ||
                config.frame_rate.fps_den === 0) {
                meta.frameRate = this._referenceFrameRate;
            }
            var fps_den = meta.frameRate.fps_den;
            var fps_num = meta.frameRate.fps_num;
            meta.refSampleDuration = meta.timescale * (fps_den / fps_num);
            var codecArray = sps.subarray(1, 4);
            var codecString = 'avc1.';
            for (var j = 0; j < 3; j++) {
                var h = codecArray[j].toString(16);
                if (h.length < 2) {
                    h = '0' + h;
                }
                codecString += h;
            }
            meta.codec = codecString;
            var mi = this._mediaInfo;
            mi.width = meta.codecWidth;
            mi.height = meta.codecHeight;
            mi.fps = meta.frameRate.fps;
            mi.profile = meta.profile;
            mi.level = meta.level;
            mi.refFrames = config.ref_frames;
            mi.chromaFormat = config.chroma_format_string;
            mi.sarNum = meta.sarRatio.width;
            mi.sarDen = meta.sarRatio.height;
            mi.videoCodec = codecString;
            if (mi.hasAudio) {
                if (mi.audioCodec != null) {
                    mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
                }
            }
            else {
                mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + '"';
            }
            if (mi.isComplete()) {
                this._onMediaInfo(mi);
            }
        }
        var ppsCount = v.getUint8(offset); // numOfPictureParameterSets
        if (ppsCount === 0) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord: No PPS');
            return;
        }
        else if (ppsCount > 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: PPS Count = " + ppsCount);
        }
        offset++;
        for (var i = 0; i < ppsCount; i++) {
            var len = v.getUint16(offset, !le); // pictureParameterSetLength
            offset += 2;
            if (len === 0) {
                continue;
            }
            // pps is useless for extracting video information
            offset += len;
        }
        meta.avcc = new Uint8Array(dataSize);
        meta.avcc.set(new Uint8Array(arrayBuffer, dataOffset, dataSize), 0);
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.v(this.TAG, 'Parsed AVCDecoderConfigurationRecord');
        if (this._isInitialMetadataDispatched()) {
            // flush parsed frames
            if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
                this._onDataAvailable(this._audioTrack, this._videoTrack);
            }
        }
        else {
            this._videoInitialMetadataDispatched = true;
        }
        // notify new metadata
        this._dispatch = false;
        this._onTrackMetadata('video', meta);
    };
    FLVDemuxer.prototype._parseAVCVideoData = function (arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType, cts) {
        var le = this._littleEndian;
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var units = [], length = 0;
        var offset = 0;
        var lengthSize = this._naluLengthSize;
        var dts = this._timestampBase + tagTimestamp;
        var keyframe = (frameType === 1); // from FLV Frame Type constants
        while (offset < dataSize) {
            if (offset + 4 >= dataSize) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Malformed Nalu near timestamp " + dts + ", offset = " + offset + ", dataSize = " + dataSize);
                break; // data not enough for next Nalu
            }
            // Nalu with length-header (AVC1)
            var naluSize = v.getUint32(offset, !le); // Big-Endian read
            if (lengthSize === 3) {
                naluSize >>>= 8;
            }
            if (naluSize > dataSize - lengthSize) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Malformed Nalus near timestamp " + dts + ", NaluSize > DataSize!");
                return;
            }
            var unitType = v.getUint8(offset + lengthSize) & 0x1F;
            if (unitType === 5) { // IDR
                keyframe = true;
            }
            var data = new Uint8Array(arrayBuffer, dataOffset + offset, lengthSize + naluSize);
            var unit = { type: unitType, data: data };
            units.push(unit);
            length += data.byteLength;
            offset += lengthSize + naluSize;
        }
        if (units.length) {
            var track = this._videoTrack;
            var avcSample = {
                units: units,
                length: length,
                isKeyframe: keyframe,
                dts: dts,
                cts: cts,
                pts: (dts + cts)
            };
            if (keyframe) {
                avcSample.fileposition = tagPosition;
            }
            track.samples.push(avcSample);
            track.length += length;
        }
    };
    return FLVDemuxer;
}());
/* harmony default export */ __webpack_exports__["default"] = (FLVDemuxer);


/***/ }),

/***/ "./src/demux/sps-parser.js":
/*!*********************************!*\
  !*** ./src/demux/sps-parser.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _exp_golomb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exp-golomb.js */ "./src/demux/exp-golomb.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var SPSParser = /** @class */ (function () {
    function SPSParser() {
    }
    SPSParser._ebsp2rbsp = function (uint8array) {
        var src = uint8array;
        var src_length = src.byteLength;
        var dst = new Uint8Array(src_length);
        var dst_idx = 0;
        for (var i = 0; i < src_length; i++) {
            if (i >= 2) {
                // Unescape: Skip 0x03 after 00 00
                if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
                    continue;
                }
            }
            dst[dst_idx] = src[i];
            dst_idx++;
        }
        return new Uint8Array(dst.buffer, 0, dst_idx);
    };
    SPSParser.parseSPS = function (uint8array) {
        var rbsp = SPSParser._ebsp2rbsp(uint8array);
        var gb = new _exp_golomb_js__WEBPACK_IMPORTED_MODULE_0__.default(rbsp);
        gb.readByte();
        var profile_idc = gb.readByte(); // profile_idc
        gb.readByte(); // constraint_set_flags[5] + reserved_zero[3]
        var level_idc = gb.readByte(); // level_idc
        gb.readUEG(); // seq_parameter_set_id
        var profile_string = SPSParser.getProfileString(profile_idc);
        var level_string = SPSParser.getLevelString(level_idc);
        var chroma_format_idc = 1;
        var chroma_format = 420;
        var chroma_format_table = [0, 420, 422, 444];
        var bit_depth = 8;
        if (profile_idc === 100 || profile_idc === 110 || profile_idc === 122 ||
            profile_idc === 244 || profile_idc === 44 || profile_idc === 83 ||
            profile_idc === 86 || profile_idc === 118 || profile_idc === 128 ||
            profile_idc === 138 || profile_idc === 144) {
            chroma_format_idc = gb.readUEG();
            if (chroma_format_idc === 3) {
                gb.readBits(1); // separate_colour_plane_flag
            }
            if (chroma_format_idc <= 3) {
                chroma_format = chroma_format_table[chroma_format_idc];
            }
            bit_depth = gb.readUEG() + 8; // bit_depth_luma_minus8
            gb.readUEG(); // bit_depth_chroma_minus8
            gb.readBits(1); // qpprime_y_zero_transform_bypass_flag
            if (gb.readBool()) { // seq_scaling_matrix_present_flag
                var scaling_list_count = (chroma_format_idc !== 3) ? 8 : 12;
                for (var i = 0; i < scaling_list_count; i++) {
                    if (gb.readBool()) { // seq_scaling_list_present_flag
                        if (i < 6) {
                            SPSParser._skipScalingList(gb, 16);
                        }
                        else {
                            SPSParser._skipScalingList(gb, 64);
                        }
                    }
                }
            }
        }
        gb.readUEG(); // log2_max_frame_num_minus4
        var pic_order_cnt_type = gb.readUEG();
        if (pic_order_cnt_type === 0) {
            gb.readUEG(); // log2_max_pic_order_cnt_lsb_minus_4
        }
        else if (pic_order_cnt_type === 1) {
            gb.readBits(1); // delta_pic_order_always_zero_flag
            gb.readSEG(); // offset_for_non_ref_pic
            gb.readSEG(); // offset_for_top_to_bottom_field
            var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
            for (var i = 0; i < num_ref_frames_in_pic_order_cnt_cycle; i++) {
                gb.readSEG(); // offset_for_ref_frame
            }
        }
        var ref_frames = gb.readUEG(); // max_num_ref_frames
        gb.readBits(1); // gaps_in_frame_num_value_allowed_flag
        var pic_width_in_mbs_minus1 = gb.readUEG();
        var pic_height_in_map_units_minus1 = gb.readUEG();
        var frame_mbs_only_flag = gb.readBits(1);
        if (frame_mbs_only_flag === 0) {
            gb.readBits(1); // mb_adaptive_frame_field_flag
        }
        gb.readBits(1); // direct_8x8_inference_flag
        var frame_crop_left_offset = 0;
        var frame_crop_right_offset = 0;
        var frame_crop_top_offset = 0;
        var frame_crop_bottom_offset = 0;
        var frame_cropping_flag = gb.readBool();
        if (frame_cropping_flag) {
            frame_crop_left_offset = gb.readUEG();
            frame_crop_right_offset = gb.readUEG();
            frame_crop_top_offset = gb.readUEG();
            frame_crop_bottom_offset = gb.readUEG();
        }
        var sar_width = 1, sar_height = 1;
        var fps = 0, fps_fixed = true, fps_num = 0, fps_den = 0;
        var vui_parameters_present_flag = gb.readBool();
        if (vui_parameters_present_flag) {
            if (gb.readBool()) { // aspect_ratio_info_present_flag
                var aspect_ratio_idc = gb.readByte();
                var sar_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
                var sar_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];
                if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
                    sar_width = sar_w_table[aspect_ratio_idc - 1];
                    sar_height = sar_h_table[aspect_ratio_idc - 1];
                }
                else if (aspect_ratio_idc === 255) {
                    sar_width = gb.readByte() << 8 | gb.readByte();
                    sar_height = gb.readByte() << 8 | gb.readByte();
                }
            }
            if (gb.readBool()) { // overscan_info_present_flag
                gb.readBool(); // overscan_appropriate_flag
            }
            if (gb.readBool()) { // video_signal_type_present_flag
                gb.readBits(4); // video_format & video_full_range_flag
                if (gb.readBool()) { // colour_description_present_flag
                    gb.readBits(24); // colour_primaries & transfer_characteristics & matrix_coefficients
                }
            }
            if (gb.readBool()) { // chroma_loc_info_present_flag
                gb.readUEG(); // chroma_sample_loc_type_top_field
                gb.readUEG(); // chroma_sample_loc_type_bottom_field
            }
            if (gb.readBool()) { // timing_info_present_flag
                var num_units_in_tick = gb.readBits(32);
                var time_scale = gb.readBits(32);
                fps_fixed = gb.readBool(); // fixed_frame_rate_flag
                fps_num = time_scale;
                fps_den = num_units_in_tick * 2;
                fps = fps_num / fps_den;
            }
        }
        var sarScale = 1;
        if (sar_width !== 1 || sar_height !== 1) {
            sarScale = sar_width / sar_height;
        }
        var crop_unit_x = 0, crop_unit_y = 0;
        if (chroma_format_idc === 0) {
            crop_unit_x = 1;
            crop_unit_y = 2 - frame_mbs_only_flag;
        }
        else {
            var sub_wc = (chroma_format_idc === 3) ? 1 : 2;
            var sub_hc = (chroma_format_idc === 1) ? 2 : 1;
            crop_unit_x = sub_wc;
            crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
        }
        var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
        var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);
        codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
        codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;
        var present_width = Math.ceil(codec_width * sarScale);
        gb.destroy();
        gb = null;
        return {
            profile_string: profile_string,
            level_string: level_string,
            bit_depth: bit_depth,
            ref_frames: ref_frames,
            chroma_format: chroma_format,
            chroma_format_string: SPSParser.getChromaFormatString(chroma_format),
            frame_rate: {
                fixed: fps_fixed,
                fps: fps,
                fps_den: fps_den,
                fps_num: fps_num
            },
            sar_ratio: {
                width: sar_width,
                height: sar_height
            },
            codec_size: {
                width: codec_width,
                height: codec_height
            },
            present_size: {
                width: present_width,
                height: codec_height
            }
        };
    };
    SPSParser._skipScalingList = function (gb, count) {
        var last_scale = 8, next_scale = 8;
        var delta_scale = 0;
        for (var i = 0; i < count; i++) {
            if (next_scale !== 0) {
                delta_scale = gb.readSEG();
                next_scale = (last_scale + delta_scale + 256) % 256;
            }
            last_scale = (next_scale === 0) ? last_scale : next_scale;
        }
    };
    SPSParser.getProfileString = function (profile_idc) {
        switch (profile_idc) {
            case 66:
                return 'Baseline';
            case 77:
                return 'Main';
            case 88:
                return 'Extended';
            case 100:
                return 'High';
            case 110:
                return 'High10';
            case 122:
                return 'High422';
            case 244:
                return 'High444';
            default:
                return 'Unknown';
        }
    };
    SPSParser.getLevelString = function (level_idc) {
        return (level_idc / 10).toFixed(1);
    };
    SPSParser.getChromaFormatString = function (chroma) {
        switch (chroma) {
            case 420:
                return '4:2:0';
            case 422:
                return '4:2:2';
            case 444:
                return '4:4:4';
            default:
                return 'Unknown';
        }
    };
    return SPSParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPSParser);


/***/ }),

/***/ "./src/flv.js":
/*!********************!*\
  !*** ./src/flv.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/polyfill.js */ "./src/utils/polyfill.js");
/* harmony import */ var _core_features_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/features.js */ "./src/core/features.js");
/* harmony import */ var _io_loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./io/loader.js */ "./src/io/loader.js");
/* harmony import */ var _player_flv_player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player/flv-player.js */ "./src/player/flv-player.js");
/* harmony import */ var _player_native_player_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player/native-player.js */ "./src/player/native-player.js");
/* harmony import */ var _player_player_events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./player/player-events.js */ "./src/player/player-events.js");
/* harmony import */ var _player_player_errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./player/player-errors.js */ "./src/player/player-errors.js");
/* harmony import */ var _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/logging-control.js */ "./src/utils/logging-control.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









// here are all the interfaces
// install polyfills
_utils_polyfill_js__WEBPACK_IMPORTED_MODULE_0__.default.install();
// factory method
function createPlayer(mediaDataSource, optionalConfig) {
    var mds = mediaDataSource;
    if (mds == null || typeof mds !== 'object') {
        throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_8__.InvalidArgumentException('MediaDataSource must be an javascript object!');
    }
    if (!mds.hasOwnProperty('type')) {
        throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_8__.InvalidArgumentException('MediaDataSource must has type field to indicate video file type!');
    }
    switch (mds.type) {
        case 'flv':
            return new _player_flv_player_js__WEBPACK_IMPORTED_MODULE_3__.default(mds, optionalConfig);
        default:
            return new _player_native_player_js__WEBPACK_IMPORTED_MODULE_4__.default(mds, optionalConfig);
    }
}
// feature detection
function isSupported() {
    return _core_features_js__WEBPACK_IMPORTED_MODULE_1__.default.supportMSEH264Playback();
}
function getFeatureList() {
    return _core_features_js__WEBPACK_IMPORTED_MODULE_1__.default.getFeatureList();
}
// interfaces
var flvjs = {};
flvjs.createPlayer = createPlayer;
flvjs.isSupported = isSupported;
flvjs.getFeatureList = getFeatureList;
flvjs.BaseLoader = _io_loader_js__WEBPACK_IMPORTED_MODULE_2__.BaseLoader;
flvjs.LoaderStatus = _io_loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderStatus;
flvjs.LoaderErrors = _io_loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors;
flvjs.Events = _player_player_events_js__WEBPACK_IMPORTED_MODULE_5__.default;
flvjs.ErrorTypes = _player_player_errors_js__WEBPACK_IMPORTED_MODULE_6__.ErrorTypes;
flvjs.ErrorDetails = _player_player_errors_js__WEBPACK_IMPORTED_MODULE_6__.ErrorDetails;
flvjs.FlvPlayer = _player_flv_player_js__WEBPACK_IMPORTED_MODULE_3__.default;
flvjs.NativePlayer = _player_native_player_js__WEBPACK_IMPORTED_MODULE_4__.default;
flvjs.LoggingControl = _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_7__.default;
Object.defineProperty(flvjs, 'version', {
    enumerable: true,
    get: function () {
        // replace by webpack.DefinePlugin
        return "1.6.2";
    }
});
/* harmony default export */ __webpack_exports__["default"] = (flvjs);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// entry/index file
// make it compatible with browserify's umd wrapper
module.exports = __webpack_require__(/*! ./flv.js */ "./src/flv.js").default;


/***/ }),

/***/ "./src/io/fetch-stream-loader.js":
/*!***************************************!*\
  !*** ./src/io/fetch-stream-loader.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_browser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/browser.js */ "./src/utils/browser.js");
/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader.js */ "./src/io/loader.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/* fetch + stream IO loader. Currently working on chrome 43+.
 * fetch provides a better alternative http API to XMLHttpRequest
 *
 * fetch spec   https://fetch.spec.whatwg.org/
 * stream spec  https://streams.spec.whatwg.org/
 */
var FetchStreamLoader = /** @class */ (function (_super) {
    __extends(FetchStreamLoader, _super);
    function FetchStreamLoader(seekHandler, config) {
        var _this = _super.call(this, 'fetch-stream-loader') || this;
        _this.TAG = 'FetchStreamLoader';
        _this._seekHandler = seekHandler;
        _this._config = config;
        _this._needStash = true;
        _this._requestAbort = false;
        _this._contentLength = null;
        _this._receivedLength = 0;
        return _this;
    }
    FetchStreamLoader.isSupported = function () {
        try {
            // fetch + stream is broken on Microsoft Edge. Disable before build 15048.
            // see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8196907/
            // Fixed in Jan 10, 2017. Build 15048+ removed from blacklist.
            var isWorkWellEdge = _utils_browser_js__WEBPACK_IMPORTED_MODULE_0__.default.msedge && _utils_browser_js__WEBPACK_IMPORTED_MODULE_0__.default.version.minor >= 15048;
            var browserNotBlacklisted = _utils_browser_js__WEBPACK_IMPORTED_MODULE_0__.default.msedge ? isWorkWellEdge : true;
            return (self.fetch && self.ReadableStream && browserNotBlacklisted);
        }
        catch (e) {
            return false;
        }
    };
    FetchStreamLoader.prototype.destroy = function () {
        if (this.isWorking()) {
            this.abort();
        }
        _super.prototype.destroy.call(this);
    };
    FetchStreamLoader.prototype.open = function (dataSource, range) {
        var _this = this;
        this._dataSource = dataSource;
        this._range = range;
        var sourceURL = dataSource.url;
        if (this._config.reuseRedirectedURL && dataSource.redirectedURL != undefined) {
            sourceURL = dataSource.redirectedURL;
        }
        var seekConfig = this._seekHandler.getConfig(sourceURL, range);
        var headers = new self.Headers();
        if (typeof seekConfig.headers === 'object') {
            var configHeaders = seekConfig.headers;
            for (var key in configHeaders) {
                if (configHeaders.hasOwnProperty(key)) {
                    headers.append(key, configHeaders[key]);
                }
            }
        }
        var params = {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default',
            // The default policy of Fetch API in the whatwg standard
            // Safari incorrectly indicates 'no-referrer' as default policy, fuck it
            referrerPolicy: 'no-referrer-when-downgrade'
        };
        // add additional headers
        if (typeof this._config.headers === 'object') {
            for (var key in this._config.headers) {
                headers.append(key, this._config.headers[key]);
            }
        }
        // cors is enabled by default
        if (dataSource.cors === false) {
            // no-cors means 'disregard cors policy', which can only be used in ServiceWorker
            params.mode = 'same-origin';
        }
        // withCredentials is disabled by default
        if (dataSource.withCredentials) {
            params.credentials = 'include';
        }
        // referrerPolicy from config
        if (dataSource.referrerPolicy) {
            params.referrerPolicy = dataSource.referrerPolicy;
        }
        // add abort controller, by wmlgl 2019-5-10 12:21:27
        if (self.AbortController) {
            this._abortController = new self.AbortController();
            params.signal = this._abortController.signal;
        }
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kConnecting;
        self.fetch(seekConfig.url, params).then(function (res) {
            if (_this._requestAbort) {
                _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kIdle;
                res.body.cancel();
                return;
            }
            if (res.ok && (res.status >= 200 && res.status <= 299)) {
                if (res.url !== seekConfig.url) {
                    if (_this._onURLRedirect) {
                        var redirectedURL = _this._seekHandler.removeURLParameters(res.url);
                        _this._onURLRedirect(redirectedURL);
                    }
                }
                var lengthHeader = res.headers.get('Content-Length');
                if (lengthHeader != null) {
                    _this._contentLength = parseInt(lengthHeader);
                    if (_this._contentLength !== 0) {
                        if (_this._onContentLengthKnown) {
                            _this._onContentLengthKnown(_this._contentLength);
                        }
                    }
                }
                return _this._pump.call(_this, res.body.getReader());
            }
            else {
                _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kError;
                if (_this._onError) {
                    _this._onError(_loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderErrors.HTTP_STATUS_CODE_INVALID, { code: res.status, msg: res.statusText });
                }
                else {
                    throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.RuntimeException('FetchStreamLoader: Http code invalid, ' + res.status + ' ' + res.statusText);
                }
            }
        }).catch(function (e) {
            if (_this._abortController && _this._abortController.signal.aborted) {
                return;
            }
            _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kError;
            if (_this._onError) {
                _this._onError(_loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderErrors.EXCEPTION, { code: -1, msg: e.message });
            }
            else {
                throw e;
            }
        });
    };
    FetchStreamLoader.prototype.abort = function () {
        this._requestAbort = true;
        if (this._status !== _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kBuffering || !_utils_browser_js__WEBPACK_IMPORTED_MODULE_0__.default.chrome) {
            // Chrome may throw Exception-like things here, avoid using if is buffering
            if (this._abortController) {
                try {
                    this._abortController.abort();
                }
                catch (e) { }
            }
        }
    };
    FetchStreamLoader.prototype._pump = function (reader) {
        var _this = this;
        return reader.read().then(function (result) {
            if (result.done) {
                // First check received length
                if (_this._contentLength !== null && _this._receivedLength < _this._contentLength) {
                    // Report Early-EOF
                    _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kError;
                    var type = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderErrors.EARLY_EOF;
                    var info = { code: -1, msg: 'Fetch stream meet Early-EOF' };
                    if (_this._onError) {
                        _this._onError(type, info);
                    }
                    else {
                        throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.RuntimeException(info.msg);
                    }
                }
                else {
                    // OK. Download complete
                    _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kComplete;
                    if (_this._onComplete) {
                        _this._onComplete(_this._range.from, _this._range.from + _this._receivedLength - 1);
                    }
                }
            }
            else {
                if (_this._abortController && _this._abortController.signal.aborted) {
                    _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kComplete;
                    return;
                }
                else if (_this._requestAbort === true) {
                    _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kComplete;
                    return reader.cancel();
                }
                _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kBuffering;
                var chunk = result.value.buffer;
                var byteStart = _this._range.from + _this._receivedLength;
                _this._receivedLength += chunk.byteLength;
                if (_this._onDataArrival) {
                    _this._onDataArrival(chunk, byteStart, _this._receivedLength);
                }
                _this._pump(reader);
            }
        }).catch(function (e) {
            if (_this._abortController && _this._abortController.signal.aborted) {
                _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kComplete;
                return;
            }
            if (e.code === 11 && _utils_browser_js__WEBPACK_IMPORTED_MODULE_0__.default.msedge) { // InvalidStateError on Microsoft Edge
                // Workaround: Edge may throw InvalidStateError after ReadableStreamReader.cancel() call
                // Ignore the unknown exception.
                // Related issue: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11265202/
                return;
            }
            _this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kError;
            var type = 0;
            var info = null;
            if ((e.code === 19 || e.message === 'network error') && // NETWORK_ERR
                (_this._contentLength === null ||
                    (_this._contentLength !== null && _this._receivedLength < _this._contentLength))) {
                type = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderErrors.EARLY_EOF;
                info = { code: e.code, msg: 'Fetch stream meet Early-EOF' };
            }
            else {
                type = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderErrors.EXCEPTION;
                info = { code: e.code, msg: e.message };
            }
            if (_this._onError) {
                _this._onError(type, info);
            }
            else {
                throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.RuntimeException(info.msg);
            }
        });
    };
    return FetchStreamLoader;
}(_loader_js__WEBPACK_IMPORTED_MODULE_1__.BaseLoader));
/* harmony default export */ __webpack_exports__["default"] = (FetchStreamLoader);


/***/ }),

/***/ "./src/io/io-controller.js":
/*!*********************************!*\
  !*** ./src/io/io-controller.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _speed_sampler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./speed-sampler.js */ "./src/io/speed-sampler.js");
/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loader.js */ "./src/io/loader.js");
/* harmony import */ var _fetch_stream_loader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fetch-stream-loader.js */ "./src/io/fetch-stream-loader.js");
/* harmony import */ var _xhr_moz_chunked_loader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./xhr-moz-chunked-loader.js */ "./src/io/xhr-moz-chunked-loader.js");
/* harmony import */ var _xhr_range_loader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./xhr-range-loader.js */ "./src/io/xhr-range-loader.js");
/* harmony import */ var _websocket_loader_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./websocket-loader.js */ "./src/io/websocket-loader.js");
/* harmony import */ var _range_seek_handler_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./range-seek-handler.js */ "./src/io/range-seek-handler.js");
/* harmony import */ var _param_seek_handler_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./param-seek-handler.js */ "./src/io/param-seek-handler.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */










/**
 * DataSource: {
 *     url: string,
 *     filesize: number,
 *     cors: boolean,
 *     withCredentials: boolean
 * }
 *
 */
// Manage IO Loaders
var IOController = /** @class */ (function () {
    function IOController(dataSource, config, extraData) {
        this.TAG = 'IOController';
        this._config = config;
        this._extraData = extraData;
        this._stashInitialSize = 1024 * 384; // default initial size: 384KB
        if (config.stashInitialSize != undefined && config.stashInitialSize > 0) {
            // apply from config
            this._stashInitialSize = config.stashInitialSize;
        }
        this._stashUsed = 0;
        this._stashSize = this._stashInitialSize;
        this._bufferSize = 1024 * 1024 * 3; // initial size: 3MB
        this._stashBuffer = new ArrayBuffer(this._bufferSize);
        this._stashByteStart = 0;
        this._enableStash = true;
        if (config.enableStashBuffer === false) {
            this._enableStash = false;
        }
        this._loader = null;
        this._loaderClass = null;
        this._seekHandler = null;
        this._dataSource = dataSource;
        this._isWebSocketURL = /wss?:\/\/(.+?)/.test(dataSource.url);
        this._refTotalLength = dataSource.filesize ? dataSource.filesize : null;
        this._totalLength = this._refTotalLength;
        this._fullRequestFlag = false;
        this._currentRange = null;
        this._redirectedURL = null;
        this._speedNormalized = 0;
        this._speedSampler = new _speed_sampler_js__WEBPACK_IMPORTED_MODULE_1__.default();
        this._speedNormalizeList = [64, 128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096];
        this._isEarlyEofReconnecting = false;
        this._paused = false;
        this._resumeFrom = 0;
        this._onDataArrival = null;
        this._onSeeked = null;
        this._onError = null;
        this._onComplete = null;
        this._onRedirect = null;
        this._onRecoveredEarlyEof = null;
        this._selectSeekHandler();
        this._selectLoader();
        this._createLoader();
    }
    IOController.prototype.destroy = function () {
        if (this._loader.isWorking()) {
            this._loader.abort();
        }
        this._loader.destroy();
        this._loader = null;
        this._loaderClass = null;
        this._dataSource = null;
        this._stashBuffer = null;
        this._stashUsed = this._stashSize = this._bufferSize = this._stashByteStart = 0;
        this._currentRange = null;
        this._speedSampler = null;
        this._isEarlyEofReconnecting = false;
        this._onDataArrival = null;
        this._onSeeked = null;
        this._onError = null;
        this._onComplete = null;
        this._onRedirect = null;
        this._onRecoveredEarlyEof = null;
        this._extraData = null;
    };
    IOController.prototype.isWorking = function () {
        return this._loader && this._loader.isWorking() && !this._paused;
    };
    IOController.prototype.isPaused = function () {
        return this._paused;
    };
    Object.defineProperty(IOController.prototype, "status", {
        get: function () {
            return this._loader.status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "extraData", {
        get: function () {
            return this._extraData;
        },
        set: function (data) {
            this._extraData = data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "onDataArrival", {
        // prototype: function onDataArrival(chunks: ArrayBuffer, byteStart: number): number
        get: function () {
            return this._onDataArrival;
        },
        set: function (callback) {
            this._onDataArrival = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "onSeeked", {
        get: function () {
            return this._onSeeked;
        },
        set: function (callback) {
            this._onSeeked = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "onError", {
        // prototype: function onError(type: number, info: {code: number, msg: string}): void
        get: function () {
            return this._onError;
        },
        set: function (callback) {
            this._onError = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "onComplete", {
        get: function () {
            return this._onComplete;
        },
        set: function (callback) {
            this._onComplete = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "onRedirect", {
        get: function () {
            return this._onRedirect;
        },
        set: function (callback) {
            this._onRedirect = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "onRecoveredEarlyEof", {
        get: function () {
            return this._onRecoveredEarlyEof;
        },
        set: function (callback) {
            this._onRecoveredEarlyEof = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "currentURL", {
        get: function () {
            return this._dataSource.url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "hasRedirect", {
        get: function () {
            return (this._redirectedURL != null || this._dataSource.redirectedURL != undefined);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "currentRedirectedURL", {
        get: function () {
            return this._redirectedURL || this._dataSource.redirectedURL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "currentSpeed", {
        // in KB/s
        get: function () {
            if (this._loaderClass === _xhr_range_loader_js__WEBPACK_IMPORTED_MODULE_5__.default) {
                // SpeedSampler is inaccuracy if loader is RangeLoader
                return this._loader.currentSpeed;
            }
            return this._speedSampler.lastSecondKBps;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IOController.prototype, "loaderType", {
        get: function () {
            return this._loader.type;
        },
        enumerable: false,
        configurable: true
    });
    IOController.prototype._selectSeekHandler = function () {
        var config = this._config;
        if (config.seekType === 'range') {
            this._seekHandler = new _range_seek_handler_js__WEBPACK_IMPORTED_MODULE_7__.default(this._config.rangeLoadZeroStart);
        }
        else if (config.seekType === 'param') {
            var paramStart = config.seekParamStart || 'bstart';
            var paramEnd = config.seekParamEnd || 'bend';
            this._seekHandler = new _param_seek_handler_js__WEBPACK_IMPORTED_MODULE_8__.default(paramStart, paramEnd);
        }
        else if (config.seekType === 'custom') {
            if (typeof config.customSeekHandler !== 'function') {
                throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_9__.InvalidArgumentException('Custom seekType specified in config but invalid customSeekHandler!');
            }
            this._seekHandler = new config.customSeekHandler();
        }
        else {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_9__.InvalidArgumentException("Invalid seekType in config: " + config.seekType);
        }
    };
    IOController.prototype._selectLoader = function () {
        if (this._config.customLoader != null) {
            this._loaderClass = this._config.customLoader;
        }
        else if (this._isWebSocketURL) {
            this._loaderClass = _websocket_loader_js__WEBPACK_IMPORTED_MODULE_6__.default;
        }
        else if (_fetch_stream_loader_js__WEBPACK_IMPORTED_MODULE_3__.default.isSupported()) {
            this._loaderClass = _fetch_stream_loader_js__WEBPACK_IMPORTED_MODULE_3__.default;
        }
        else if (_xhr_moz_chunked_loader_js__WEBPACK_IMPORTED_MODULE_4__.default.isSupported()) {
            this._loaderClass = _xhr_moz_chunked_loader_js__WEBPACK_IMPORTED_MODULE_4__.default;
        }
        else if (_xhr_range_loader_js__WEBPACK_IMPORTED_MODULE_5__.default.isSupported()) {
            this._loaderClass = _xhr_range_loader_js__WEBPACK_IMPORTED_MODULE_5__.default;
        }
        else {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_9__.RuntimeException('Your browser doesn\'t support xhr with arraybuffer responseType!');
        }
    };
    IOController.prototype._createLoader = function () {
        this._loader = new this._loaderClass(this._seekHandler, this._config);
        if (this._loader.needStashBuffer === false) {
            this._enableStash = false;
        }
        this._loader.onContentLengthKnown = this._onContentLengthKnown.bind(this);
        this._loader.onURLRedirect = this._onURLRedirect.bind(this);
        this._loader.onDataArrival = this._onLoaderChunkArrival.bind(this);
        this._loader.onComplete = this._onLoaderComplete.bind(this);
        this._loader.onError = this._onLoaderError.bind(this);
    };
    IOController.prototype.open = function (optionalFrom) {
        this._currentRange = { from: 0, to: -1 };
        if (optionalFrom) {
            this._currentRange.from = optionalFrom;
        }
        this._speedSampler.reset();
        if (!optionalFrom) {
            this._fullRequestFlag = true;
        }
        this._loader.open(this._dataSource, Object.assign({}, this._currentRange));
    };
    IOController.prototype.abort = function () {
        this._loader.abort();
        if (this._paused) {
            this._paused = false;
            this._resumeFrom = 0;
        }
    };
    IOController.prototype.pause = function () {
        if (this.isWorking()) {
            this._loader.abort();
            if (this._stashUsed !== 0) {
                this._resumeFrom = this._stashByteStart;
                this._currentRange.to = this._stashByteStart - 1;
            }
            else {
                this._resumeFrom = this._currentRange.to + 1;
            }
            this._stashUsed = 0;
            this._stashByteStart = 0;
            this._paused = true;
        }
    };
    IOController.prototype.resume = function () {
        if (this._paused) {
            this._paused = false;
            var bytes = this._resumeFrom;
            this._resumeFrom = 0;
            this._internalSeek(bytes, true);
        }
    };
    IOController.prototype.seek = function (bytes) {
        this._paused = false;
        this._stashUsed = 0;
        this._stashByteStart = 0;
        this._internalSeek(bytes, true);
    };
    /**
     * When seeking request is from media seeking, unconsumed stash data should be dropped
     * However, stash data shouldn't be dropped if seeking requested from http reconnection
     *
     * @dropUnconsumed: Ignore and discard all unconsumed data in stash buffer
     */
    IOController.prototype._internalSeek = function (bytes, dropUnconsumed) {
        if (this._loader.isWorking()) {
            this._loader.abort();
        }
        // dispatch & flush stash buffer before seek
        this._flushStashBuffer(dropUnconsumed);
        this._loader.destroy();
        this._loader = null;
        var requestRange = { from: bytes, to: -1 };
        this._currentRange = { from: requestRange.from, to: -1 };
        this._speedSampler.reset();
        this._stashSize = this._stashInitialSize;
        this._createLoader();
        this._loader.open(this._dataSource, requestRange);
        if (this._onSeeked) {
            this._onSeeked();
        }
    };
    IOController.prototype.updateUrl = function (url) {
        if (!url || typeof url !== 'string' || url.length === 0) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_9__.InvalidArgumentException('Url must be a non-empty string!');
        }
        this._dataSource.url = url;
        // TODO: replace with new url
    };
    IOController.prototype._expandBuffer = function (expectedBytes) {
        var bufferNewSize = this._stashSize;
        while (bufferNewSize + 1024 * 1024 * 1 < expectedBytes) {
            bufferNewSize *= 2;
        }
        bufferNewSize += 1024 * 1024 * 1; // bufferSize = stashSize + 1MB
        if (bufferNewSize === this._bufferSize) {
            return;
        }
        var newBuffer = new ArrayBuffer(bufferNewSize);
        if (this._stashUsed > 0) { // copy existing data into new buffer
            var stashOldArray = new Uint8Array(this._stashBuffer, 0, this._stashUsed);
            var stashNewArray = new Uint8Array(newBuffer, 0, bufferNewSize);
            stashNewArray.set(stashOldArray, 0);
        }
        this._stashBuffer = newBuffer;
        this._bufferSize = bufferNewSize;
    };
    IOController.prototype._normalizeSpeed = function (input) {
        var list = this._speedNormalizeList;
        var last = list.length - 1;
        var mid = 0;
        var lbound = 0;
        var ubound = last;
        if (input < list[0]) {
            return list[0];
        }
        // binary search
        while (lbound <= ubound) {
            mid = lbound + Math.floor((ubound - lbound) / 2);
            if (mid === last || (input >= list[mid] && input < list[mid + 1])) {
                return list[mid];
            }
            else if (list[mid] < input) {
                lbound = mid + 1;
            }
            else {
                ubound = mid - 1;
            }
        }
    };
    IOController.prototype._adjustStashSize = function (normalized) {
        var stashSizeKB = 0;
        if (this._config.isLive) {
            // live stream: always use single normalized speed for size of stashSizeKB
            stashSizeKB = normalized;
        }
        else {
            if (normalized < 512) {
                stashSizeKB = normalized;
            }
            else if (normalized >= 512 && normalized <= 1024) {
                stashSizeKB = Math.floor(normalized * 1.5);
            }
            else {
                stashSizeKB = normalized * 2;
            }
        }
        if (stashSizeKB > 8192) {
            stashSizeKB = 8192;
        }
        var bufferSize = stashSizeKB * 1024 + 1024 * 1024 * 1; // stashSize + 1MB
        if (this._bufferSize < bufferSize) {
            this._expandBuffer(bufferSize);
        }
        this._stashSize = stashSizeKB * 1024;
    };
    IOController.prototype._dispatchChunks = function (chunks, byteStart) {
        this._currentRange.to = byteStart + chunks.byteLength - 1;
        return this._onDataArrival(chunks, byteStart);
    };
    IOController.prototype._onURLRedirect = function (redirectedURL) {
        this._redirectedURL = redirectedURL;
        if (this._onRedirect) {
            this._onRedirect(redirectedURL);
        }
    };
    IOController.prototype._onContentLengthKnown = function (contentLength) {
        if (contentLength && this._fullRequestFlag) {
            this._totalLength = contentLength;
            this._fullRequestFlag = false;
        }
    };
    IOController.prototype._onLoaderChunkArrival = function (chunk, byteStart, receivedLength) {
        if (!this._onDataArrival) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_9__.IllegalStateException('IOController: No existing consumer (onDataArrival) callback!');
        }
        if (this._paused) {
            return;
        }
        if (this._isEarlyEofReconnecting) {
            // Auto-reconnect for EarlyEof succeed, notify to upper-layer by callback
            this._isEarlyEofReconnecting = false;
            if (this._onRecoveredEarlyEof) {
                this._onRecoveredEarlyEof();
            }
        }
        this._speedSampler.addBytes(chunk.byteLength);
        // adjust stash buffer size according to network speed dynamically
        var KBps = this._speedSampler.lastSecondKBps;
        if (KBps !== 0) {
            var normalized = this._normalizeSpeed(KBps);
            if (this._speedNormalized !== normalized) {
                this._speedNormalized = normalized;
                this._adjustStashSize(normalized);
            }
        }
        if (!this._enableStash) { // disable stash
            if (this._stashUsed === 0) {
                // dispatch chunk directly to consumer;
                // check ret value (consumed bytes) and stash unconsumed to stashBuffer
                var consumed = this._dispatchChunks(chunk, byteStart);
                if (consumed < chunk.byteLength) { // unconsumed data remain.
                    var remain = chunk.byteLength - consumed;
                    if (remain > this._bufferSize) {
                        this._expandBuffer(remain);
                    }
                    var stashArray = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
                    stashArray.set(new Uint8Array(chunk, consumed), 0);
                    this._stashUsed += remain;
                    this._stashByteStart = byteStart + consumed;
                }
            }
            else {
                // else: Merge chunk into stashBuffer, and dispatch stashBuffer to consumer.
                if (this._stashUsed + chunk.byteLength > this._bufferSize) {
                    this._expandBuffer(this._stashUsed + chunk.byteLength);
                }
                var stashArray = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
                stashArray.set(new Uint8Array(chunk), this._stashUsed);
                this._stashUsed += chunk.byteLength;
                var consumed = this._dispatchChunks(this._stashBuffer.slice(0, this._stashUsed), this._stashByteStart);
                if (consumed < this._stashUsed && consumed > 0) { // unconsumed data remain
                    var remainArray = new Uint8Array(this._stashBuffer, consumed);
                    stashArray.set(remainArray, 0);
                }
                this._stashUsed -= consumed;
                this._stashByteStart += consumed;
            }
        }
        else { // enable stash
            if (this._stashUsed === 0 && this._stashByteStart === 0) { // seeked? or init chunk?
                // This is the first chunk after seek action
                this._stashByteStart = byteStart;
            }
            if (this._stashUsed + chunk.byteLength <= this._stashSize) {
                // just stash
                var stashArray = new Uint8Array(this._stashBuffer, 0, this._stashSize);
                stashArray.set(new Uint8Array(chunk), this._stashUsed);
                this._stashUsed += chunk.byteLength;
            }
            else { // stashUsed + chunkSize > stashSize, size limit exceeded
                var stashArray = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
                if (this._stashUsed > 0) { // There're stash datas in buffer
                    // dispatch the whole stashBuffer, and stash remain data
                    // then append chunk to stashBuffer (stash)
                    var buffer = this._stashBuffer.slice(0, this._stashUsed);
                    var consumed = this._dispatchChunks(buffer, this._stashByteStart);
                    if (consumed < buffer.byteLength) {
                        if (consumed > 0) {
                            var remainArray = new Uint8Array(buffer, consumed);
                            stashArray.set(remainArray, 0);
                            this._stashUsed = remainArray.byteLength;
                            this._stashByteStart += consumed;
                        }
                    }
                    else {
                        this._stashUsed = 0;
                        this._stashByteStart += consumed;
                    }
                    if (this._stashUsed + chunk.byteLength > this._bufferSize) {
                        this._expandBuffer(this._stashUsed + chunk.byteLength);
                        stashArray = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
                    }
                    stashArray.set(new Uint8Array(chunk), this._stashUsed);
                    this._stashUsed += chunk.byteLength;
                }
                else { // stash buffer empty, but chunkSize > stashSize (oh, holy shit)
                    // dispatch chunk directly and stash remain data
                    var consumed = this._dispatchChunks(chunk, byteStart);
                    if (consumed < chunk.byteLength) {
                        var remain = chunk.byteLength - consumed;
                        if (remain > this._bufferSize) {
                            this._expandBuffer(remain);
                            stashArray = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
                        }
                        stashArray.set(new Uint8Array(chunk, consumed), 0);
                        this._stashUsed += remain;
                        this._stashByteStart = byteStart + consumed;
                    }
                }
            }
        }
    };
    IOController.prototype._flushStashBuffer = function (dropUnconsumed) {
        if (this._stashUsed > 0) {
            var buffer = this._stashBuffer.slice(0, this._stashUsed);
            var consumed = this._dispatchChunks(buffer, this._stashByteStart);
            var remain = buffer.byteLength - consumed;
            if (consumed < buffer.byteLength) {
                if (dropUnconsumed) {
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, remain + " bytes unconsumed data remain when flush buffer, dropped");
                }
                else {
                    if (consumed > 0) {
                        var stashArray = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
                        var remainArray = new Uint8Array(buffer, consumed);
                        stashArray.set(remainArray, 0);
                        this._stashUsed = remainArray.byteLength;
                        this._stashByteStart += consumed;
                    }
                    return 0;
                }
            }
            this._stashUsed = 0;
            this._stashByteStart = 0;
            return remain;
        }
        return 0;
    };
    IOController.prototype._onLoaderComplete = function (from, to) {
        // Force-flush stash buffer, and drop unconsumed data
        this._flushStashBuffer(true);
        if (this._onComplete) {
            this._onComplete(this._extraData);
        }
    };
    IOController.prototype._onLoaderError = function (type, data) {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.e(this.TAG, "Loader error, code = " + data.code + ", msg = " + data.msg);
        this._flushStashBuffer(false);
        if (this._isEarlyEofReconnecting) {
            // Auto-reconnect for EarlyEof failed, throw UnrecoverableEarlyEof error to upper-layer
            this._isEarlyEofReconnecting = false;
            type = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.UNRECOVERABLE_EARLY_EOF;
        }
        switch (type) {
            case _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.EARLY_EOF: {
                if (!this._config.isLive) {
                    // Do internal http reconnect if not live stream
                    if (this._totalLength) {
                        var nextFrom = this._currentRange.to + 1;
                        if (nextFrom < this._totalLength) {
                            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Connection lost, trying reconnect...');
                            this._isEarlyEofReconnecting = true;
                            this._internalSeek(nextFrom, false);
                        }
                        return;
                    }
                    // else: We don't know totalLength, throw UnrecoverableEarlyEof
                }
                // live stream: throw UnrecoverableEarlyEof error to upper-layer
                type = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.UNRECOVERABLE_EARLY_EOF;
                break;
            }
            case _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.UNRECOVERABLE_EARLY_EOF:
            case _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.CONNECTING_TIMEOUT:
            case _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.HTTP_STATUS_CODE_INVALID:
            case _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.EXCEPTION:
                break;
        }
        if (this._onError) {
            this._onError(type, data);
        }
        else {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_9__.RuntimeException('IOException: ' + data.msg);
        }
    };
    return IOController;
}());
/* harmony default export */ __webpack_exports__["default"] = (IOController);


/***/ }),

/***/ "./src/io/loader.js":
/*!**************************!*\
  !*** ./src/io/loader.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoaderStatus": function() { return /* binding */ LoaderStatus; },
/* harmony export */   "LoaderErrors": function() { return /* binding */ LoaderErrors; },
/* harmony export */   "BaseLoader": function() { return /* binding */ BaseLoader; }
/* harmony export */ });
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var LoaderStatus = {
    kIdle: 0,
    kConnecting: 1,
    kBuffering: 2,
    kError: 3,
    kComplete: 4
};
var LoaderErrors = {
    OK: 'OK',
    EXCEPTION: 'Exception',
    HTTP_STATUS_CODE_INVALID: 'HttpStatusCodeInvalid',
    CONNECTING_TIMEOUT: 'ConnectingTimeout',
    EARLY_EOF: 'EarlyEof',
    UNRECOVERABLE_EARLY_EOF: 'UnrecoverableEarlyEof'
};
/* Loader has callbacks which have following prototypes:
 *     function onContentLengthKnown(contentLength: number): void
 *     function onURLRedirect(url: string): void
 *     function onDataArrival(chunk: ArrayBuffer, byteStart: number, receivedLength: number): void
 *     function onError(errorType: number, errorInfo: {code: number, msg: string}): void
 *     function onComplete(rangeFrom: number, rangeTo: number): void
 */
var BaseLoader = /** @class */ (function () {
    function BaseLoader(typeName) {
        this._type = typeName || 'undefined';
        this._status = LoaderStatus.kIdle;
        this._needStash = false;
        // callbacks
        this._onContentLengthKnown = null;
        this._onURLRedirect = null;
        this._onDataArrival = null;
        this._onError = null;
        this._onComplete = null;
    }
    BaseLoader.prototype.destroy = function () {
        this._status = LoaderStatus.kIdle;
        this._onContentLengthKnown = null;
        this._onURLRedirect = null;
        this._onDataArrival = null;
        this._onError = null;
        this._onComplete = null;
    };
    BaseLoader.prototype.isWorking = function () {
        return this._status === LoaderStatus.kConnecting || this._status === LoaderStatus.kBuffering;
    };
    Object.defineProperty(BaseLoader.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseLoader.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseLoader.prototype, "needStashBuffer", {
        get: function () {
            return this._needStash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseLoader.prototype, "onContentLengthKnown", {
        get: function () {
            return this._onContentLengthKnown;
        },
        set: function (callback) {
            this._onContentLengthKnown = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseLoader.prototype, "onURLRedirect", {
        get: function () {
            return this._onURLRedirect;
        },
        set: function (callback) {
            this._onURLRedirect = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseLoader.prototype, "onDataArrival", {
        get: function () {
            return this._onDataArrival;
        },
        set: function (callback) {
            this._onDataArrival = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseLoader.prototype, "onError", {
        get: function () {
            return this._onError;
        },
        set: function (callback) {
            this._onError = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseLoader.prototype, "onComplete", {
        get: function () {
            return this._onComplete;
        },
        set: function (callback) {
            this._onComplete = callback;
        },
        enumerable: false,
        configurable: true
    });
    // pure virtual
    BaseLoader.prototype.open = function (dataSource, range) {
        throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_0__.NotImplementedException('Unimplemented abstract function!');
    };
    BaseLoader.prototype.abort = function () {
        throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_0__.NotImplementedException('Unimplemented abstract function!');
    };
    return BaseLoader;
}());



/***/ }),

/***/ "./src/io/param-seek-handler.js":
/*!**************************************!*\
  !*** ./src/io/param-seek-handler.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ParamSeekHandler = /** @class */ (function () {
    function ParamSeekHandler(paramStart, paramEnd) {
        this._startName = paramStart;
        this._endName = paramEnd;
    }
    ParamSeekHandler.prototype.getConfig = function (baseUrl, range) {
        var url = baseUrl;
        if (range.from !== 0 || range.to !== -1) {
            var needAnd = true;
            if (url.indexOf('?') === -1) {
                url += '?';
                needAnd = false;
            }
            if (needAnd) {
                url += '&';
            }
            url += this._startName + "=" + range.from.toString();
            if (range.to !== -1) {
                url += "&" + this._endName + "=" + range.to.toString();
            }
        }
        return {
            url: url,
            headers: {}
        };
    };
    ParamSeekHandler.prototype.removeURLParameters = function (seekedURL) {
        var baseURL = seekedURL.split('?')[0];
        var params = undefined;
        var queryIndex = seekedURL.indexOf('?');
        if (queryIndex !== -1) {
            params = seekedURL.substring(queryIndex + 1);
        }
        var resultParams = '';
        if (params != undefined && params.length > 0) {
            var pairs = params.split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split('=');
                var requireAnd = (i > 0);
                if (pair[0] !== this._startName && pair[0] !== this._endName) {
                    if (requireAnd) {
                        resultParams += '&';
                    }
                    resultParams += pairs[i];
                }
            }
        }
        return (resultParams.length === 0) ? baseURL : baseURL + '?' + resultParams;
    };
    return ParamSeekHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (ParamSeekHandler);


/***/ }),

/***/ "./src/io/range-seek-handler.js":
/*!**************************************!*\
  !*** ./src/io/range-seek-handler.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var RangeSeekHandler = /** @class */ (function () {
    function RangeSeekHandler(zeroStart) {
        this._zeroStart = zeroStart || false;
    }
    RangeSeekHandler.prototype.getConfig = function (url, range) {
        var headers = {};
        if (range.from !== 0 || range.to !== -1) {
            var param = void 0;
            if (range.to !== -1) {
                param = "bytes=" + range.from.toString() + "-" + range.to.toString();
            }
            else {
                param = "bytes=" + range.from.toString() + "-";
            }
            headers['Range'] = param;
        }
        else if (this._zeroStart) {
            headers['Range'] = 'bytes=0-';
        }
        return {
            url: url,
            headers: headers
        };
    };
    RangeSeekHandler.prototype.removeURLParameters = function (seekedURL) {
        return seekedURL;
    };
    return RangeSeekHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (RangeSeekHandler);


/***/ }),

/***/ "./src/io/speed-sampler.js":
/*!*********************************!*\
  !*** ./src/io/speed-sampler.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Utility class to calculate realtime network I/O speed
var SpeedSampler = /** @class */ (function () {
    function SpeedSampler() {
        // milliseconds
        this._firstCheckpoint = 0;
        this._lastCheckpoint = 0;
        this._intervalBytes = 0;
        this._totalBytes = 0;
        this._lastSecondBytes = 0;
        // compatibility detection
        if (self.performance && self.performance.now) {
            this._now = self.performance.now.bind(self.performance);
        }
        else {
            this._now = Date.now;
        }
    }
    SpeedSampler.prototype.reset = function () {
        this._firstCheckpoint = this._lastCheckpoint = 0;
        this._totalBytes = this._intervalBytes = 0;
        this._lastSecondBytes = 0;
    };
    SpeedSampler.prototype.addBytes = function (bytes) {
        if (this._firstCheckpoint === 0) {
            this._firstCheckpoint = this._now();
            this._lastCheckpoint = this._firstCheckpoint;
            this._intervalBytes += bytes;
            this._totalBytes += bytes;
        }
        else if (this._now() - this._lastCheckpoint < 1000) {
            this._intervalBytes += bytes;
            this._totalBytes += bytes;
        }
        else { // duration >= 1000
            this._lastSecondBytes = this._intervalBytes;
            this._intervalBytes = bytes;
            this._totalBytes += bytes;
            this._lastCheckpoint = this._now();
        }
    };
    Object.defineProperty(SpeedSampler.prototype, "currentKBps", {
        get: function () {
            this.addBytes(0);
            var durationSeconds = (this._now() - this._lastCheckpoint) / 1000;
            if (durationSeconds == 0)
                durationSeconds = 1;
            return (this._intervalBytes / durationSeconds) / 1024;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeedSampler.prototype, "lastSecondKBps", {
        get: function () {
            this.addBytes(0);
            if (this._lastSecondBytes !== 0) {
                return this._lastSecondBytes / 1024;
            }
            else { // lastSecondBytes === 0
                if (this._now() - this._lastCheckpoint >= 500) {
                    // if time interval since last checkpoint has exceeded 500ms
                    // the speed is nearly accurate
                    return this.currentKBps;
                }
                else {
                    // We don't know
                    return 0;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeedSampler.prototype, "averageKBps", {
        get: function () {
            var durationSeconds = (this._now() - this._firstCheckpoint) / 1000;
            return (this._totalBytes / durationSeconds) / 1024;
        },
        enumerable: false,
        configurable: true
    });
    return SpeedSampler;
}());
/* harmony default export */ __webpack_exports__["default"] = (SpeedSampler);


/***/ }),

/***/ "./src/io/websocket-loader.js":
/*!************************************!*\
  !*** ./src/io/websocket-loader.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader.js */ "./src/io/loader.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


// For FLV over WebSocket live stream
var WebSocketLoader = /** @class */ (function (_super) {
    __extends(WebSocketLoader, _super);
    function WebSocketLoader() {
        var _this = _super.call(this, 'websocket-loader') || this;
        _this.TAG = 'WebSocketLoader';
        _this._needStash = true;
        _this._ws = null;
        _this._requestAbort = false;
        _this._receivedLength = 0;
        return _this;
    }
    WebSocketLoader.isSupported = function () {
        try {
            return (typeof self.WebSocket !== 'undefined');
        }
        catch (e) {
            return false;
        }
    };
    WebSocketLoader.prototype.destroy = function () {
        if (this._ws) {
            this.abort();
        }
        _super.prototype.destroy.call(this);
    };
    WebSocketLoader.prototype.open = function (dataSource) {
        try {
            var ws = this._ws = new self.WebSocket(dataSource.url);
            ws.binaryType = 'arraybuffer';
            ws.onopen = this._onWebSocketOpen.bind(this);
            ws.onclose = this._onWebSocketClose.bind(this);
            ws.onmessage = this._onWebSocketMessage.bind(this);
            ws.onerror = this._onWebSocketError.bind(this);
            this._status = _loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderStatus.kConnecting;
        }
        catch (e) {
            this._status = _loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderStatus.kError;
            var info = { code: e.code, msg: e.message };
            if (this._onError) {
                this._onError(_loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderErrors.EXCEPTION, info);
            }
            else {
                throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_1__.RuntimeException(info.msg);
            }
        }
    };
    WebSocketLoader.prototype.abort = function () {
        var ws = this._ws;
        if (ws && (ws.readyState === 0 || ws.readyState === 1)) { // CONNECTING || OPEN
            this._requestAbort = true;
            ws.close();
        }
        this._ws = null;
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderStatus.kComplete;
    };
    WebSocketLoader.prototype._onWebSocketOpen = function (e) {
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderStatus.kBuffering;
    };
    WebSocketLoader.prototype._onWebSocketClose = function (e) {
        if (this._requestAbort === true) {
            this._requestAbort = false;
            return;
        }
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderStatus.kComplete;
        if (this._onComplete) {
            this._onComplete(0, this._receivedLength - 1);
        }
    };
    WebSocketLoader.prototype._onWebSocketMessage = function (e) {
        var _this = this;
        if (e.data instanceof ArrayBuffer) {
            this._dispatchArrayBuffer(e.data);
        }
        else if (e.data instanceof Blob) {
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                _this._dispatchArrayBuffer(reader_1.result);
            };
            reader_1.readAsArrayBuffer(e.data);
        }
        else {
            this._status = _loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderStatus.kError;
            var info = { code: -1, msg: 'Unsupported WebSocket message type: ' + e.data.constructor.name };
            if (this._onError) {
                this._onError(_loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderErrors.EXCEPTION, info);
            }
            else {
                throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_1__.RuntimeException(info.msg);
            }
        }
    };
    WebSocketLoader.prototype._dispatchArrayBuffer = function (arraybuffer) {
        var chunk = arraybuffer;
        var byteStart = this._receivedLength;
        this._receivedLength += chunk.byteLength;
        if (this._onDataArrival) {
            this._onDataArrival(chunk, byteStart, this._receivedLength);
        }
    };
    WebSocketLoader.prototype._onWebSocketError = function (e) {
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderStatus.kError;
        var info = {
            code: e.code,
            msg: e.message
        };
        if (this._onError) {
            this._onError(_loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderErrors.EXCEPTION, info);
        }
        else {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_1__.RuntimeException(info.msg);
        }
    };
    return WebSocketLoader;
}(_loader_js__WEBPACK_IMPORTED_MODULE_0__.BaseLoader));
/* harmony default export */ __webpack_exports__["default"] = (WebSocketLoader);


/***/ }),

/***/ "./src/io/xhr-moz-chunked-loader.js":
/*!******************************************!*\
  !*** ./src/io/xhr-moz-chunked-loader.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader.js */ "./src/io/loader.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



// For FireFox browser which supports `xhr.responseType = 'moz-chunked-arraybuffer'`
var MozChunkedLoader = /** @class */ (function (_super) {
    __extends(MozChunkedLoader, _super);
    function MozChunkedLoader(seekHandler, config) {
        var _this = _super.call(this, 'xhr-moz-chunked-loader') || this;
        _this.TAG = 'MozChunkedLoader';
        _this._seekHandler = seekHandler;
        _this._config = config;
        _this._needStash = true;
        _this._xhr = null;
        _this._requestAbort = false;
        _this._contentLength = null;
        _this._receivedLength = 0;
        return _this;
    }
    MozChunkedLoader.isSupported = function () {
        try {
            var xhr = new XMLHttpRequest();
            // Firefox 37- requires .open() to be called before setting responseType
            xhr.open('GET', 'https://example.com', true);
            xhr.responseType = 'moz-chunked-arraybuffer';
            return (xhr.responseType === 'moz-chunked-arraybuffer');
        }
        catch (e) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w('MozChunkedLoader', e.message);
            return false;
        }
    };
    MozChunkedLoader.prototype.destroy = function () {
        if (this.isWorking()) {
            this.abort();
        }
        if (this._xhr) {
            this._xhr.onreadystatechange = null;
            this._xhr.onprogress = null;
            this._xhr.onloadend = null;
            this._xhr.onerror = null;
            this._xhr = null;
        }
        _super.prototype.destroy.call(this);
    };
    MozChunkedLoader.prototype.open = function (dataSource, range) {
        this._dataSource = dataSource;
        this._range = range;
        var sourceURL = dataSource.url;
        if (this._config.reuseRedirectedURL && dataSource.redirectedURL != undefined) {
            sourceURL = dataSource.redirectedURL;
        }
        var seekConfig = this._seekHandler.getConfig(sourceURL, range);
        this._requestURL = seekConfig.url;
        var xhr = this._xhr = new XMLHttpRequest();
        xhr.open('GET', seekConfig.url, true);
        xhr.responseType = 'moz-chunked-arraybuffer';
        xhr.onreadystatechange = this._onReadyStateChange.bind(this);
        xhr.onprogress = this._onProgress.bind(this);
        xhr.onloadend = this._onLoadEnd.bind(this);
        xhr.onerror = this._onXhrError.bind(this);
        // cors is auto detected and enabled by xhr
        // withCredentials is disabled by default
        if (dataSource.withCredentials) {
            xhr.withCredentials = true;
        }
        if (typeof seekConfig.headers === 'object') {
            var headers = seekConfig.headers;
            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }
        // add additional headers
        if (typeof this._config.headers === 'object') {
            var headers = this._config.headers;
            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kConnecting;
        xhr.send();
    };
    MozChunkedLoader.prototype.abort = function () {
        this._requestAbort = true;
        if (this._xhr) {
            this._xhr.abort();
        }
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kComplete;
    };
    MozChunkedLoader.prototype._onReadyStateChange = function (e) {
        var xhr = e.target;
        if (xhr.readyState === 2) { // HEADERS_RECEIVED
            if (xhr.responseURL != undefined && xhr.responseURL !== this._requestURL) {
                if (this._onURLRedirect) {
                    var redirectedURL = this._seekHandler.removeURLParameters(xhr.responseURL);
                    this._onURLRedirect(redirectedURL);
                }
            }
            if (xhr.status !== 0 && (xhr.status < 200 || xhr.status > 299)) {
                this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kError;
                if (this._onError) {
                    this._onError(_loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderErrors.HTTP_STATUS_CODE_INVALID, { code: xhr.status, msg: xhr.statusText });
                }
                else {
                    throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.RuntimeException('MozChunkedLoader: Http code invalid, ' + xhr.status + ' ' + xhr.statusText);
                }
            }
            else {
                this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kBuffering;
            }
        }
    };
    MozChunkedLoader.prototype._onProgress = function (e) {
        if (this._status === _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kError) {
            // Ignore error response
            return;
        }
        if (this._contentLength === null) {
            if (e.total !== null && e.total !== 0) {
                this._contentLength = e.total;
                if (this._onContentLengthKnown) {
                    this._onContentLengthKnown(this._contentLength);
                }
            }
        }
        var chunk = e.target.response;
        var byteStart = this._range.from + this._receivedLength;
        this._receivedLength += chunk.byteLength;
        if (this._onDataArrival) {
            this._onDataArrival(chunk, byteStart, this._receivedLength);
        }
    };
    MozChunkedLoader.prototype._onLoadEnd = function (e) {
        if (this._requestAbort === true) {
            this._requestAbort = false;
            return;
        }
        else if (this._status === _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kError) {
            return;
        }
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kComplete;
        if (this._onComplete) {
            this._onComplete(this._range.from, this._range.from + this._receivedLength - 1);
        }
    };
    MozChunkedLoader.prototype._onXhrError = function (e) {
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderStatus.kError;
        var type = 0;
        var info = null;
        if (this._contentLength && e.loaded < this._contentLength) {
            type = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderErrors.EARLY_EOF;
            info = { code: -1, msg: 'Moz-Chunked stream meet Early-Eof' };
        }
        else {
            type = _loader_js__WEBPACK_IMPORTED_MODULE_1__.LoaderErrors.EXCEPTION;
            info = { code: -1, msg: e.constructor.name + ' ' + e.type };
        }
        if (this._onError) {
            this._onError(type, info);
        }
        else {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.RuntimeException(info.msg);
        }
    };
    return MozChunkedLoader;
}(_loader_js__WEBPACK_IMPORTED_MODULE_1__.BaseLoader));
/* harmony default export */ __webpack_exports__["default"] = (MozChunkedLoader);


/***/ }),

/***/ "./src/io/xhr-range-loader.js":
/*!************************************!*\
  !*** ./src/io/xhr-range-loader.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _speed_sampler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./speed-sampler.js */ "./src/io/speed-sampler.js");
/* harmony import */ var _loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loader.js */ "./src/io/loader.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




// Universal IO Loader, implemented by adding Range header in xhr's request header
var RangeLoader = /** @class */ (function (_super) {
    __extends(RangeLoader, _super);
    function RangeLoader(seekHandler, config) {
        var _this = _super.call(this, 'xhr-range-loader') || this;
        _this.TAG = 'RangeLoader';
        _this._seekHandler = seekHandler;
        _this._config = config;
        _this._needStash = false;
        _this._chunkSizeKBList = [
            128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 5120, 6144, 7168, 8192
        ];
        _this._currentChunkSizeKB = 384;
        _this._currentSpeedNormalized = 0;
        _this._zeroSpeedChunkCount = 0;
        _this._xhr = null;
        _this._speedSampler = new _speed_sampler_js__WEBPACK_IMPORTED_MODULE_1__.default();
        _this._requestAbort = false;
        _this._waitForTotalLength = false;
        _this._totalLengthReceived = false;
        _this._currentRequestURL = null;
        _this._currentRedirectedURL = null;
        _this._currentRequestRange = null;
        _this._totalLength = null; // size of the entire file
        _this._contentLength = null; // Content-Length of entire request range
        _this._receivedLength = 0; // total received bytes
        _this._lastTimeLoaded = 0; // received bytes of current request sub-range
        return _this;
    }
    RangeLoader.isSupported = function () {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://example.com', true);
            xhr.responseType = 'arraybuffer';
            return (xhr.responseType === 'arraybuffer');
        }
        catch (e) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w('RangeLoader', e.message);
            return false;
        }
    };
    RangeLoader.prototype.destroy = function () {
        if (this.isWorking()) {
            this.abort();
        }
        if (this._xhr) {
            this._xhr.onreadystatechange = null;
            this._xhr.onprogress = null;
            this._xhr.onload = null;
            this._xhr.onerror = null;
            this._xhr = null;
        }
        _super.prototype.destroy.call(this);
    };
    Object.defineProperty(RangeLoader.prototype, "currentSpeed", {
        get: function () {
            return this._speedSampler.lastSecondKBps;
        },
        enumerable: false,
        configurable: true
    });
    RangeLoader.prototype.open = function (dataSource, range) {
        this._dataSource = dataSource;
        this._range = range;
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderStatus.kConnecting;
        var useRefTotalLength = false;
        if (this._dataSource.filesize != undefined && this._dataSource.filesize !== 0) {
            useRefTotalLength = true;
            this._totalLength = this._dataSource.filesize;
        }
        if (!this._totalLengthReceived && !useRefTotalLength) {
            // We need total filesize
            this._waitForTotalLength = true;
            this._internalOpen(this._dataSource, { from: 0, to: -1 });
        }
        else {
            // We have filesize, start loading
            this._openSubRange();
        }
    };
    RangeLoader.prototype._openSubRange = function () {
        var chunkSize = this._currentChunkSizeKB * 1024;
        var from = this._range.from + this._receivedLength;
        var to = from + chunkSize;
        if (this._contentLength != null) {
            if (to - this._range.from >= this._contentLength) {
                to = this._range.from + this._contentLength - 1;
            }
        }
        this._currentRequestRange = { from: from, to: to };
        this._internalOpen(this._dataSource, this._currentRequestRange);
    };
    RangeLoader.prototype._internalOpen = function (dataSource, range) {
        this._lastTimeLoaded = 0;
        var sourceURL = dataSource.url;
        if (this._config.reuseRedirectedURL) {
            if (this._currentRedirectedURL != undefined) {
                sourceURL = this._currentRedirectedURL;
            }
            else if (dataSource.redirectedURL != undefined) {
                sourceURL = dataSource.redirectedURL;
            }
        }
        var seekConfig = this._seekHandler.getConfig(sourceURL, range);
        this._currentRequestURL = seekConfig.url;
        var xhr = this._xhr = new XMLHttpRequest();
        xhr.open('GET', seekConfig.url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onreadystatechange = this._onReadyStateChange.bind(this);
        xhr.onprogress = this._onProgress.bind(this);
        xhr.onload = this._onLoad.bind(this);
        xhr.onerror = this._onXhrError.bind(this);
        if (dataSource.withCredentials) {
            xhr.withCredentials = true;
        }
        if (typeof seekConfig.headers === 'object') {
            var headers = seekConfig.headers;
            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }
        // add additional headers
        if (typeof this._config.headers === 'object') {
            var headers = this._config.headers;
            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }
        xhr.send();
    };
    RangeLoader.prototype.abort = function () {
        this._requestAbort = true;
        this._internalAbort();
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderStatus.kComplete;
    };
    RangeLoader.prototype._internalAbort = function () {
        if (this._xhr) {
            this._xhr.onreadystatechange = null;
            this._xhr.onprogress = null;
            this._xhr.onload = null;
            this._xhr.onerror = null;
            this._xhr.abort();
            this._xhr = null;
        }
    };
    RangeLoader.prototype._onReadyStateChange = function (e) {
        var xhr = e.target;
        if (xhr.readyState === 2) { // HEADERS_RECEIVED
            if (xhr.responseURL != undefined) { // if the browser support this property
                var redirectedURL = this._seekHandler.removeURLParameters(xhr.responseURL);
                if (xhr.responseURL !== this._currentRequestURL && redirectedURL !== this._currentRedirectedURL) {
                    this._currentRedirectedURL = redirectedURL;
                    if (this._onURLRedirect) {
                        this._onURLRedirect(redirectedURL);
                    }
                }
            }
            if ((xhr.status >= 200 && xhr.status <= 299)) {
                if (this._waitForTotalLength) {
                    return;
                }
                this._status = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderStatus.kBuffering;
            }
            else {
                this._status = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderStatus.kError;
                if (this._onError) {
                    this._onError(_loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.HTTP_STATUS_CODE_INVALID, { code: xhr.status, msg: xhr.statusText });
                }
                else {
                    throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_3__.RuntimeException('RangeLoader: Http code invalid, ' + xhr.status + ' ' + xhr.statusText);
                }
            }
        }
    };
    RangeLoader.prototype._onProgress = function (e) {
        if (this._status === _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderStatus.kError) {
            // Ignore error response
            return;
        }
        if (this._contentLength === null) {
            var openNextRange = false;
            if (this._waitForTotalLength) {
                this._waitForTotalLength = false;
                this._totalLengthReceived = true;
                openNextRange = true;
                var total = e.total;
                this._internalAbort();
                if (total != null & total !== 0) {
                    this._totalLength = total;
                }
            }
            // calculate currrent request range's contentLength
            if (this._range.to === -1) {
                this._contentLength = this._totalLength - this._range.from;
            }
            else { // to !== -1
                this._contentLength = this._range.to - this._range.from + 1;
            }
            if (openNextRange) {
                this._openSubRange();
                return;
            }
            if (this._onContentLengthKnown) {
                this._onContentLengthKnown(this._contentLength);
            }
        }
        var delta = e.loaded - this._lastTimeLoaded;
        this._lastTimeLoaded = e.loaded;
        this._speedSampler.addBytes(delta);
    };
    RangeLoader.prototype._normalizeSpeed = function (input) {
        var list = this._chunkSizeKBList;
        var last = list.length - 1;
        var mid = 0;
        var lbound = 0;
        var ubound = last;
        if (input < list[0]) {
            return list[0];
        }
        while (lbound <= ubound) {
            mid = lbound + Math.floor((ubound - lbound) / 2);
            if (mid === last || (input >= list[mid] && input < list[mid + 1])) {
                return list[mid];
            }
            else if (list[mid] < input) {
                lbound = mid + 1;
            }
            else {
                ubound = mid - 1;
            }
        }
    };
    RangeLoader.prototype._onLoad = function (e) {
        if (this._status === _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderStatus.kError) {
            // Ignore error response
            return;
        }
        if (this._waitForTotalLength) {
            this._waitForTotalLength = false;
            return;
        }
        this._lastTimeLoaded = 0;
        var KBps = this._speedSampler.lastSecondKBps;
        if (KBps === 0) {
            this._zeroSpeedChunkCount++;
            if (this._zeroSpeedChunkCount >= 3) {
                // Try get currentKBps after 3 chunks
                KBps = this._speedSampler.currentKBps;
            }
        }
        if (KBps !== 0) {
            var normalized = this._normalizeSpeed(KBps);
            if (this._currentSpeedNormalized !== normalized) {
                this._currentSpeedNormalized = normalized;
                this._currentChunkSizeKB = normalized;
            }
        }
        var chunk = e.target.response;
        var byteStart = this._range.from + this._receivedLength;
        this._receivedLength += chunk.byteLength;
        var reportComplete = false;
        if (this._contentLength != null && this._receivedLength < this._contentLength) {
            // continue load next chunk
            this._openSubRange();
        }
        else {
            reportComplete = true;
        }
        // dispatch received chunk
        if (this._onDataArrival) {
            this._onDataArrival(chunk, byteStart, this._receivedLength);
        }
        if (reportComplete) {
            this._status = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderStatus.kComplete;
            if (this._onComplete) {
                this._onComplete(this._range.from, this._range.from + this._receivedLength - 1);
            }
        }
    };
    RangeLoader.prototype._onXhrError = function (e) {
        this._status = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderStatus.kError;
        var type = 0;
        var info = null;
        if (this._contentLength && this._receivedLength > 0
            && this._receivedLength < this._contentLength) {
            type = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.EARLY_EOF;
            info = { code: -1, msg: 'RangeLoader meet Early-Eof' };
        }
        else {
            type = _loader_js__WEBPACK_IMPORTED_MODULE_2__.LoaderErrors.EXCEPTION;
            info = { code: -1, msg: e.constructor.name + ' ' + e.type };
        }
        if (this._onError) {
            this._onError(type, info);
        }
        else {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_3__.RuntimeException(info.msg);
        }
    };
    return RangeLoader;
}(_loader_js__WEBPACK_IMPORTED_MODULE_2__.BaseLoader));
/* harmony default export */ __webpack_exports__["default"] = (RangeLoader);


/***/ }),

/***/ "./src/player/flv-player.js":
/*!**********************************!*\
  !*** ./src/player/flv-player.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/browser.js */ "./src/utils/browser.js");
/* harmony import */ var _player_events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player-events.js */ "./src/player/player-events.js");
/* harmony import */ var _core_transmuxer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/transmuxer.js */ "./src/core/transmuxer.js");
/* harmony import */ var _core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/transmuxing-events.js */ "./src/core/transmuxing-events.js");
/* harmony import */ var _core_mse_controller_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/mse-controller.js */ "./src/core/mse-controller.js");
/* harmony import */ var _core_mse_events_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/mse-events.js */ "./src/core/mse-events.js");
/* harmony import */ var _player_errors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./player-errors.js */ "./src/player/player-errors.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../config.js */ "./src/config.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */











var FlvPlayer = /** @class */ (function () {
    function FlvPlayer(mediaDataSource, config) {
        this.TAG = 'FlvPlayer';
        this._type = 'FlvPlayer';
        this._emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        this._config = (0,_config_js__WEBPACK_IMPORTED_MODULE_9__.createDefaultConfig)();
        if (typeof config === 'object') {
            Object.assign(this._config, config);
        }
        if (mediaDataSource.type.toLowerCase() !== 'flv') {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_10__.InvalidArgumentException('FlvPlayer requires an flv MediaDataSource input!');
        }
        if (mediaDataSource.isLive === true) {
            this._config.isLive = true;
        }
        this.e = {
            onvLoadedMetadata: this._onvLoadedMetadata.bind(this),
            onvSeeking: this._onvSeeking.bind(this),
            onvCanPlay: this._onvCanPlay.bind(this),
            onvStalled: this._onvStalled.bind(this),
            onvProgress: this._onvProgress.bind(this)
        };
        if (self.performance && self.performance.now) {
            this._now = self.performance.now.bind(self.performance);
        }
        else {
            this._now = Date.now;
        }
        this._pendingSeekTime = null; // in seconds
        this._requestSetTime = false;
        this._seekpointRecord = null;
        this._progressChecker = null;
        this._mediaDataSource = mediaDataSource;
        this._mediaElement = null;
        this._msectl = null;
        this._transmuxer = null;
        this._mseSourceOpened = false;
        this._hasPendingLoad = false;
        this._receivedCanPlay = false;
        this._mediaInfo = null;
        this._statisticsInfo = null;
        var chromeNeedIDRFix = (_utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.chrome &&
            (_utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.version.major < 50 ||
                (_utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.version.major === 50 && _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.version.build < 2661)));
        this._alwaysSeekKeyframe = (chromeNeedIDRFix || _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.msedge || _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.msie) ? true : false;
        if (this._alwaysSeekKeyframe) {
            this._config.accurateSeek = false;
        }
    }
    FlvPlayer.prototype.destroy = function () {
        if (this._progressChecker != null) {
            window.clearInterval(this._progressChecker);
            this._progressChecker = null;
        }
        if (this._transmuxer) {
            this.unload();
        }
        if (this._mediaElement) {
            this.detachMediaElement();
        }
        this.e = null;
        this._mediaDataSource = null;
        this._emitter.removeAllListeners();
        this._emitter = null;
    };
    FlvPlayer.prototype.on = function (event, listener) {
        var _this = this;
        if (event === _player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_INFO) {
            if (this._mediaInfo != null) {
                Promise.resolve().then(function () {
                    _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_INFO, _this.mediaInfo);
                });
            }
        }
        else if (event === _player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.STATISTICS_INFO) {
            if (this._statisticsInfo != null) {
                Promise.resolve().then(function () {
                    _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.STATISTICS_INFO, _this.statisticsInfo);
                });
            }
        }
        this._emitter.addListener(event, listener);
    };
    FlvPlayer.prototype.off = function (event, listener) {
        this._emitter.removeListener(event, listener);
    };
    FlvPlayer.prototype.attachMediaElement = function (mediaElement) {
        var _this = this;
        this._mediaElement = mediaElement;
        mediaElement.addEventListener('loadedmetadata', this.e.onvLoadedMetadata);
        mediaElement.addEventListener('seeking', this.e.onvSeeking);
        mediaElement.addEventListener('canplay', this.e.onvCanPlay);
        mediaElement.addEventListener('stalled', this.e.onvStalled);
        mediaElement.addEventListener('progress', this.e.onvProgress);
        this._msectl = new _core_mse_controller_js__WEBPACK_IMPORTED_MODULE_6__.default(this._config);
        this._msectl.on(_core_mse_events_js__WEBPACK_IMPORTED_MODULE_7__.default.UPDATE_END, this._onmseUpdateEnd.bind(this));
        this._msectl.on(_core_mse_events_js__WEBPACK_IMPORTED_MODULE_7__.default.BUFFER_FULL, this._onmseBufferFull.bind(this));
        this._msectl.on(_core_mse_events_js__WEBPACK_IMPORTED_MODULE_7__.default.SOURCE_OPEN, function () {
            _this._mseSourceOpened = true;
            if (_this._hasPendingLoad) {
                _this._hasPendingLoad = false;
                _this.load();
            }
        });
        this._msectl.on(_core_mse_events_js__WEBPACK_IMPORTED_MODULE_7__.default.ERROR, function (info) {
            _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.ERROR, _player_errors_js__WEBPACK_IMPORTED_MODULE_8__.ErrorTypes.MEDIA_ERROR, _player_errors_js__WEBPACK_IMPORTED_MODULE_8__.ErrorDetails.MEDIA_MSE_ERROR, info);
        });
        this._msectl.attachMediaElement(mediaElement);
        if (this._pendingSeekTime != null) {
            try {
                mediaElement.currentTime = this._pendingSeekTime;
                this._pendingSeekTime = null;
            }
            catch (e) {
                // IE11 may throw InvalidStateError if readyState === 0
                // We can defer set currentTime operation after loadedmetadata
            }
        }
    };
    FlvPlayer.prototype.detachMediaElement = function () {
        if (this._mediaElement) {
            this._msectl.detachMediaElement();
            this._mediaElement.removeEventListener('loadedmetadata', this.e.onvLoadedMetadata);
            this._mediaElement.removeEventListener('seeking', this.e.onvSeeking);
            this._mediaElement.removeEventListener('canplay', this.e.onvCanPlay);
            this._mediaElement.removeEventListener('stalled', this.e.onvStalled);
            this._mediaElement.removeEventListener('progress', this.e.onvProgress);
            this._mediaElement = null;
        }
        if (this._msectl) {
            this._msectl.destroy();
            this._msectl = null;
        }
    };
    FlvPlayer.prototype.load = function () {
        var _this = this;
        if (!this._mediaElement) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_10__.IllegalStateException('HTMLMediaElement must be attached before load()!');
        }
        if (this._transmuxer) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_10__.IllegalStateException('FlvPlayer.load() has been called, please call unload() first!');
        }
        if (this._hasPendingLoad) {
            return;
        }
        if (this._config.deferLoadAfterSourceOpen && this._mseSourceOpened === false) {
            this._hasPendingLoad = true;
            return;
        }
        if (this._mediaElement.readyState > 0) {
            this._requestSetTime = true;
            // IE11 may throw InvalidStateError if readyState === 0
            this._mediaElement.currentTime = 0;
        }
        this._transmuxer = new _core_transmuxer_js__WEBPACK_IMPORTED_MODULE_4__.default(this._mediaDataSource, this._config);
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.INIT_SEGMENT, function (type, is) {
            _this._msectl.appendInitSegment(is);
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_SEGMENT, function (type, ms) {
            _this._msectl.appendMediaSegment(ms);
            // lazyLoad check
            if (_this._config.lazyLoad && !_this._config.isLive) {
                var currentTime = _this._mediaElement.currentTime;
                if (ms.info.endDts >= (currentTime + _this._config.lazyLoadMaxDuration) * 1000) {
                    if (_this._progressChecker == null) {
                        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(_this.TAG, 'Maximum buffering duration exceeded, suspend transmuxing task');
                        _this._suspendTransmuxer();
                    }
                }
            }
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.LOADING_COMPLETE, function () {
            _this._msectl.endOfStream();
            _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.LOADING_COMPLETE);
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOVERED_EARLY_EOF, function () {
            _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.RECOVERED_EARLY_EOF);
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.IO_ERROR, function (detail, info) {
            _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.ERROR, _player_errors_js__WEBPACK_IMPORTED_MODULE_8__.ErrorTypes.NETWORK_ERROR, detail, info);
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.DEMUX_ERROR, function (detail, info) {
            _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.ERROR, _player_errors_js__WEBPACK_IMPORTED_MODULE_8__.ErrorTypes.MEDIA_ERROR, detail, { code: -1, msg: info });
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_INFO, function (mediaInfo) {
            _this._mediaInfo = mediaInfo;
            _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_INFO, Object.assign({}, mediaInfo));
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.METADATA_ARRIVED, function (metadata) {
            _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.METADATA_ARRIVED, metadata);
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.SCRIPTDATA_ARRIVED, function (data) {
            _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.SCRIPTDATA_ARRIVED, data);
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.STATISTICS_INFO, function (statInfo) {
            _this._statisticsInfo = _this._fillStatisticsInfo(statInfo);
            _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_3__.default.STATISTICS_INFO, Object.assign({}, _this._statisticsInfo));
        });
        this._transmuxer.on(_core_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOMMEND_SEEKPOINT, function (milliseconds) {
            if (_this._mediaElement && !_this._config.accurateSeek) {
                _this._requestSetTime = true;
                _this._mediaElement.currentTime = milliseconds / 1000;
            }
        });
        this._transmuxer.open();
    };
    FlvPlayer.prototype.unload = function () {
        if (this._mediaElement) {
            this._mediaElement.pause();
        }
        if (this._msectl) {
            this._msectl.seek(0);
        }
        if (this._transmuxer) {
            this._transmuxer.close();
            this._transmuxer.destroy();
            this._transmuxer = null;
        }
    };
    FlvPlayer.prototype.play = function () {
        return this._mediaElement.play();
    };
    FlvPlayer.prototype.pause = function () {
        this._mediaElement.pause();
    };
    Object.defineProperty(FlvPlayer.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlvPlayer.prototype, "buffered", {
        get: function () {
            return this._mediaElement.buffered;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlvPlayer.prototype, "duration", {
        get: function () {
            return this._mediaElement.duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlvPlayer.prototype, "volume", {
        get: function () {
            return this._mediaElement.volume;
        },
        set: function (value) {
            this._mediaElement.volume = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlvPlayer.prototype, "muted", {
        get: function () {
            return this._mediaElement.muted;
        },
        set: function (muted) {
            this._mediaElement.muted = muted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlvPlayer.prototype, "currentTime", {
        get: function () {
            if (this._mediaElement) {
                return this._mediaElement.currentTime;
            }
            return 0;
        },
        set: function (seconds) {
            if (this._mediaElement) {
                this._internalSeek(seconds);
            }
            else {
                this._pendingSeekTime = seconds;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlvPlayer.prototype, "mediaInfo", {
        get: function () {
            return Object.assign({}, this._mediaInfo);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlvPlayer.prototype, "statisticsInfo", {
        get: function () {
            if (this._statisticsInfo == null) {
                this._statisticsInfo = {};
            }
            this._statisticsInfo = this._fillStatisticsInfo(this._statisticsInfo);
            return Object.assign({}, this._statisticsInfo);
        },
        enumerable: false,
        configurable: true
    });
    FlvPlayer.prototype._fillStatisticsInfo = function (statInfo) {
        statInfo.playerType = this._type;
        if (!(this._mediaElement instanceof HTMLVideoElement)) {
            return statInfo;
        }
        var hasQualityInfo = true;
        var decoded = 0;
        var dropped = 0;
        if (this._mediaElement.getVideoPlaybackQuality) {
            var quality = this._mediaElement.getVideoPlaybackQuality();
            decoded = quality.totalVideoFrames;
            dropped = quality.droppedVideoFrames;
        }
        else if (this._mediaElement.webkitDecodedFrameCount != undefined) {
            decoded = this._mediaElement.webkitDecodedFrameCount;
            dropped = this._mediaElement.webkitDroppedFrameCount;
        }
        else {
            hasQualityInfo = false;
        }
        if (hasQualityInfo) {
            statInfo.decodedFrames = decoded;
            statInfo.droppedFrames = dropped;
        }
        return statInfo;
    };
    FlvPlayer.prototype._onmseUpdateEnd = function () {
        if (!this._config.lazyLoad || this._config.isLive) {
            return;
        }
        var buffered = this._mediaElement.buffered;
        var currentTime = this._mediaElement.currentTime;
        var currentRangeStart = 0;
        var currentRangeEnd = 0;
        for (var i = 0; i < buffered.length; i++) {
            var start = buffered.start(i);
            var end = buffered.end(i);
            if (start <= currentTime && currentTime < end) {
                currentRangeStart = start;
                currentRangeEnd = end;
                break;
            }
        }
        if (currentRangeEnd >= currentTime + this._config.lazyLoadMaxDuration && this._progressChecker == null) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'Maximum buffering duration exceeded, suspend transmuxing task');
            this._suspendTransmuxer();
        }
    };
    FlvPlayer.prototype._onmseBufferFull = function () {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'MSE SourceBuffer is full, suspend transmuxing task');
        if (this._progressChecker == null) {
            this._suspendTransmuxer();
        }
    };
    FlvPlayer.prototype._suspendTransmuxer = function () {
        if (this._transmuxer) {
            this._transmuxer.pause();
            if (this._progressChecker == null) {
                this._progressChecker = window.setInterval(this._checkProgressAndResume.bind(this), 1000);
            }
        }
    };
    FlvPlayer.prototype._checkProgressAndResume = function () {
        var currentTime = this._mediaElement.currentTime;
        var buffered = this._mediaElement.buffered;
        var needResume = false;
        for (var i = 0; i < buffered.length; i++) {
            var from = buffered.start(i);
            var to = buffered.end(i);
            if (currentTime >= from && currentTime < to) {
                if (currentTime >= to - this._config.lazyLoadRecoverDuration) {
                    needResume = true;
                }
                break;
            }
        }
        if (needResume) {
            window.clearInterval(this._progressChecker);
            this._progressChecker = null;
            if (needResume) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'Continue loading from paused position');
                this._transmuxer.resume();
            }
        }
    };
    FlvPlayer.prototype._isTimepointBuffered = function (seconds) {
        var buffered = this._mediaElement.buffered;
        for (var i = 0; i < buffered.length; i++) {
            var from = buffered.start(i);
            var to = buffered.end(i);
            if (seconds >= from && seconds < to) {
                return true;
            }
        }
        return false;
    };
    FlvPlayer.prototype._internalSeek = function (seconds) {
        var directSeek = this._isTimepointBuffered(seconds);
        var directSeekBegin = false;
        var directSeekBeginTime = 0;
        if (seconds < 1.0 && this._mediaElement.buffered.length > 0) {
            var videoBeginTime = this._mediaElement.buffered.start(0);
            if ((videoBeginTime < 1.0 && seconds < videoBeginTime) || _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari) {
                directSeekBegin = true;
                // also workaround for Safari: Seek to 0 may cause video stuck, use 0.1 to avoid
                directSeekBeginTime = _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari ? 0.1 : videoBeginTime;
            }
        }
        if (directSeekBegin) { // seek to video begin, set currentTime directly if beginPTS buffered
            this._requestSetTime = true;
            this._mediaElement.currentTime = directSeekBeginTime;
        }
        else if (directSeek) { // buffered position
            if (!this._alwaysSeekKeyframe) {
                this._requestSetTime = true;
                this._mediaElement.currentTime = seconds;
            }
            else {
                var idr = this._msectl.getNearestKeyframe(Math.floor(seconds * 1000));
                this._requestSetTime = true;
                if (idr != null) {
                    this._mediaElement.currentTime = idr.dts / 1000;
                }
                else {
                    this._mediaElement.currentTime = seconds;
                }
            }
            if (this._progressChecker != null) {
                this._checkProgressAndResume();
            }
        }
        else {
            if (this._progressChecker != null) {
                window.clearInterval(this._progressChecker);
                this._progressChecker = null;
            }
            this._msectl.seek(seconds);
            this._transmuxer.seek(Math.floor(seconds * 1000)); // in milliseconds
            // no need to set mediaElement.currentTime if non-accurateSeek,
            // just wait for the recommend_seekpoint callback
            if (this._config.accurateSeek) {
                this._requestSetTime = true;
                this._mediaElement.currentTime = seconds;
            }
        }
    };
    FlvPlayer.prototype._checkAndApplyUnbufferedSeekpoint = function () {
        if (this._seekpointRecord) {
            if (this._seekpointRecord.recordTime <= this._now() - 100) {
                var target = this._mediaElement.currentTime;
                this._seekpointRecord = null;
                if (!this._isTimepointBuffered(target)) {
                    if (this._progressChecker != null) {
                        window.clearTimeout(this._progressChecker);
                        this._progressChecker = null;
                    }
                    // .currentTime is consists with .buffered timestamp
                    // Chrome/Edge use DTS, while FireFox/Safari use PTS
                    this._msectl.seek(target);
                    this._transmuxer.seek(Math.floor(target * 1000));
                    // set currentTime if accurateSeek, or wait for recommend_seekpoint callback
                    if (this._config.accurateSeek) {
                        this._requestSetTime = true;
                        this._mediaElement.currentTime = target;
                    }
                }
            }
            else {
                window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50);
            }
        }
    };
    FlvPlayer.prototype._checkAndResumeStuckPlayback = function (stalled) {
        var media = this._mediaElement;
        if (stalled || !this._receivedCanPlay || media.readyState < 2) { // HAVE_CURRENT_DATA
            var buffered = media.buffered;
            if (buffered.length > 0 && media.currentTime < buffered.start(0)) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.w(this.TAG, "Playback seems stuck at " + media.currentTime + ", seek to " + buffered.start(0));
                this._requestSetTime = true;
                this._mediaElement.currentTime = buffered.start(0);
                this._mediaElement.removeEventListener('progress', this.e.onvProgress);
            }
        }
        else {
            // Playback didn't stuck, remove progress event listener
            this._mediaElement.removeEventListener('progress', this.e.onvProgress);
        }
    };
    FlvPlayer.prototype._onvLoadedMetadata = function (e) {
        if (this._pendingSeekTime != null) {
            this._mediaElement.currentTime = this._pendingSeekTime;
            this._pendingSeekTime = null;
        }
    };
    FlvPlayer.prototype._onvSeeking = function (e) {
        var target = this._mediaElement.currentTime;
        var buffered = this._mediaElement.buffered;
        if (this._requestSetTime) {
            this._requestSetTime = false;
            return;
        }
        if (target < 1.0 && buffered.length > 0) {
            // seek to video begin, set currentTime directly if beginPTS buffered
            var videoBeginTime = buffered.start(0);
            if ((videoBeginTime < 1.0 && target < videoBeginTime) || _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari) {
                this._requestSetTime = true;
                // also workaround for Safari: Seek to 0 may cause video stuck, use 0.1 to avoid
                this._mediaElement.currentTime = _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari ? 0.1 : videoBeginTime;
                return;
            }
        }
        if (this._isTimepointBuffered(target)) {
            if (this._alwaysSeekKeyframe) {
                var idr = this._msectl.getNearestKeyframe(Math.floor(target * 1000));
                if (idr != null) {
                    this._requestSetTime = true;
                    this._mediaElement.currentTime = idr.dts / 1000;
                }
            }
            if (this._progressChecker != null) {
                this._checkProgressAndResume();
            }
            return;
        }
        this._seekpointRecord = {
            seekPoint: target,
            recordTime: this._now()
        };
        window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50);
    };
    FlvPlayer.prototype._onvCanPlay = function (e) {
        this._receivedCanPlay = true;
        this._mediaElement.removeEventListener('canplay', this.e.onvCanPlay);
    };
    FlvPlayer.prototype._onvStalled = function (e) {
        this._checkAndResumeStuckPlayback(true);
    };
    FlvPlayer.prototype._onvProgress = function (e) {
        this._checkAndResumeStuckPlayback();
    };
    return FlvPlayer;
}());
/* harmony default export */ __webpack_exports__["default"] = (FlvPlayer);


/***/ }),

/***/ "./src/player/native-player.js":
/*!*************************************!*\
  !*** ./src/player/native-player.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _player_events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player-events.js */ "./src/player/player-events.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.js */ "./src/config.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




// Player wrapper for browser's native player (HTMLVideoElement) without MediaSource src. 
var NativePlayer = /** @class */ (function () {
    function NativePlayer(mediaDataSource, config) {
        this.TAG = 'NativePlayer';
        this._type = 'NativePlayer';
        this._emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        this._config = (0,_config_js__WEBPACK_IMPORTED_MODULE_2__.createDefaultConfig)();
        if (typeof config === 'object') {
            Object.assign(this._config, config);
        }
        if (mediaDataSource.type.toLowerCase() === 'flv') {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_3__.InvalidArgumentException('NativePlayer does\'t support flv MediaDataSource input!');
        }
        if (mediaDataSource.hasOwnProperty('segments')) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_3__.InvalidArgumentException("NativePlayer(" + mediaDataSource.type + ") doesn't support multipart playback!");
        }
        this.e = {
            onvLoadedMetadata: this._onvLoadedMetadata.bind(this)
        };
        this._pendingSeekTime = null;
        this._statisticsReporter = null;
        this._mediaDataSource = mediaDataSource;
        this._mediaElement = null;
    }
    NativePlayer.prototype.destroy = function () {
        if (this._mediaElement) {
            this.unload();
            this.detachMediaElement();
        }
        this.e = null;
        this._mediaDataSource = null;
        this._emitter.removeAllListeners();
        this._emitter = null;
    };
    NativePlayer.prototype.on = function (event, listener) {
        var _this = this;
        if (event === _player_events_js__WEBPACK_IMPORTED_MODULE_1__.default.MEDIA_INFO) {
            if (this._mediaElement != null && this._mediaElement.readyState !== 0) { // HAVE_NOTHING
                Promise.resolve().then(function () {
                    _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_1__.default.MEDIA_INFO, _this.mediaInfo);
                });
            }
        }
        else if (event === _player_events_js__WEBPACK_IMPORTED_MODULE_1__.default.STATISTICS_INFO) {
            if (this._mediaElement != null && this._mediaElement.readyState !== 0) {
                Promise.resolve().then(function () {
                    _this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_1__.default.STATISTICS_INFO, _this.statisticsInfo);
                });
            }
        }
        this._emitter.addListener(event, listener);
    };
    NativePlayer.prototype.off = function (event, listener) {
        this._emitter.removeListener(event, listener);
    };
    NativePlayer.prototype.attachMediaElement = function (mediaElement) {
        this._mediaElement = mediaElement;
        mediaElement.addEventListener('loadedmetadata', this.e.onvLoadedMetadata);
        if (this._pendingSeekTime != null) {
            try {
                mediaElement.currentTime = this._pendingSeekTime;
                this._pendingSeekTime = null;
            }
            catch (e) {
                // IE11 may throw InvalidStateError if readyState === 0
                // Defer set currentTime operation after loadedmetadata
            }
        }
    };
    NativePlayer.prototype.detachMediaElement = function () {
        if (this._mediaElement) {
            this._mediaElement.src = '';
            this._mediaElement.removeAttribute('src');
            this._mediaElement.removeEventListener('loadedmetadata', this.e.onvLoadedMetadata);
            this._mediaElement = null;
        }
        if (this._statisticsReporter != null) {
            window.clearInterval(this._statisticsReporter);
            this._statisticsReporter = null;
        }
    };
    NativePlayer.prototype.load = function () {
        if (!this._mediaElement) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_3__.IllegalStateException('HTMLMediaElement must be attached before load()!');
        }
        this._mediaElement.src = this._mediaDataSource.url;
        if (this._mediaElement.readyState > 0) {
            this._mediaElement.currentTime = 0;
        }
        this._mediaElement.preload = 'auto';
        this._mediaElement.load();
        this._statisticsReporter = window.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval);
    };
    NativePlayer.prototype.unload = function () {
        if (this._mediaElement) {
            this._mediaElement.src = '';
            this._mediaElement.removeAttribute('src');
        }
        if (this._statisticsReporter != null) {
            window.clearInterval(this._statisticsReporter);
            this._statisticsReporter = null;
        }
    };
    NativePlayer.prototype.play = function () {
        return this._mediaElement.play();
    };
    NativePlayer.prototype.pause = function () {
        this._mediaElement.pause();
    };
    Object.defineProperty(NativePlayer.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativePlayer.prototype, "buffered", {
        get: function () {
            return this._mediaElement.buffered;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativePlayer.prototype, "duration", {
        get: function () {
            return this._mediaElement.duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativePlayer.prototype, "volume", {
        get: function () {
            return this._mediaElement.volume;
        },
        set: function (value) {
            this._mediaElement.volume = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativePlayer.prototype, "muted", {
        get: function () {
            return this._mediaElement.muted;
        },
        set: function (muted) {
            this._mediaElement.muted = muted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativePlayer.prototype, "currentTime", {
        get: function () {
            if (this._mediaElement) {
                return this._mediaElement.currentTime;
            }
            return 0;
        },
        set: function (seconds) {
            if (this._mediaElement) {
                this._mediaElement.currentTime = seconds;
            }
            else {
                this._pendingSeekTime = seconds;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativePlayer.prototype, "mediaInfo", {
        get: function () {
            var mediaPrefix = (this._mediaElement instanceof HTMLAudioElement) ? 'audio/' : 'video/';
            var info = {
                mimeType: mediaPrefix + this._mediaDataSource.type
            };
            if (this._mediaElement) {
                info.duration = Math.floor(this._mediaElement.duration * 1000);
                if (this._mediaElement instanceof HTMLVideoElement) {
                    info.width = this._mediaElement.videoWidth;
                    info.height = this._mediaElement.videoHeight;
                }
            }
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativePlayer.prototype, "statisticsInfo", {
        get: function () {
            var info = {
                playerType: this._type,
                url: this._mediaDataSource.url
            };
            if (!(this._mediaElement instanceof HTMLVideoElement)) {
                return info;
            }
            var hasQualityInfo = true;
            var decoded = 0;
            var dropped = 0;
            if (this._mediaElement.getVideoPlaybackQuality) {
                var quality = this._mediaElement.getVideoPlaybackQuality();
                decoded = quality.totalVideoFrames;
                dropped = quality.droppedVideoFrames;
            }
            else if (this._mediaElement.webkitDecodedFrameCount != undefined) {
                decoded = this._mediaElement.webkitDecodedFrameCount;
                dropped = this._mediaElement.webkitDroppedFrameCount;
            }
            else {
                hasQualityInfo = false;
            }
            if (hasQualityInfo) {
                info.decodedFrames = decoded;
                info.droppedFrames = dropped;
            }
            return info;
        },
        enumerable: false,
        configurable: true
    });
    NativePlayer.prototype._onvLoadedMetadata = function (e) {
        if (this._pendingSeekTime != null) {
            this._mediaElement.currentTime = this._pendingSeekTime;
            this._pendingSeekTime = null;
        }
        this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_1__.default.MEDIA_INFO, this.mediaInfo);
    };
    NativePlayer.prototype._reportStatisticsInfo = function () {
        this._emitter.emit(_player_events_js__WEBPACK_IMPORTED_MODULE_1__.default.STATISTICS_INFO, this.statisticsInfo);
    };
    return NativePlayer;
}());
/* harmony default export */ __webpack_exports__["default"] = (NativePlayer);


/***/ }),

/***/ "./src/player/player-errors.js":
/*!*************************************!*\
  !*** ./src/player/player-errors.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorTypes": function() { return /* binding */ ErrorTypes; },
/* harmony export */   "ErrorDetails": function() { return /* binding */ ErrorDetails; }
/* harmony export */ });
/* harmony import */ var _io_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io/loader.js */ "./src/io/loader.js");
/* harmony import */ var _demux_demux_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../demux/demux-errors.js */ "./src/demux/demux-errors.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var ErrorTypes = {
    NETWORK_ERROR: 'NetworkError',
    MEDIA_ERROR: 'MediaError',
    OTHER_ERROR: 'OtherError'
};
var ErrorDetails = {
    NETWORK_EXCEPTION: _io_loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderErrors.EXCEPTION,
    NETWORK_STATUS_CODE_INVALID: _io_loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderErrors.HTTP_STATUS_CODE_INVALID,
    NETWORK_TIMEOUT: _io_loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderErrors.CONNECTING_TIMEOUT,
    NETWORK_UNRECOVERABLE_EARLY_EOF: _io_loader_js__WEBPACK_IMPORTED_MODULE_0__.LoaderErrors.UNRECOVERABLE_EARLY_EOF,
    MEDIA_MSE_ERROR: 'MediaMSEError',
    MEDIA_FORMAT_ERROR: _demux_demux_errors_js__WEBPACK_IMPORTED_MODULE_1__.default.FORMAT_ERROR,
    MEDIA_FORMAT_UNSUPPORTED: _demux_demux_errors_js__WEBPACK_IMPORTED_MODULE_1__.default.FORMAT_UNSUPPORTED,
    MEDIA_CODEC_UNSUPPORTED: _demux_demux_errors_js__WEBPACK_IMPORTED_MODULE_1__.default.CODEC_UNSUPPORTED
};


/***/ }),

/***/ "./src/player/player-events.js":
/*!*************************************!*\
  !*** ./src/player/player-events.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PlayerEvents = {
    ERROR: 'error',
    LOADING_COMPLETE: 'loading_complete',
    RECOVERED_EARLY_EOF: 'recovered_early_eof',
    MEDIA_INFO: 'media_info',
    METADATA_ARRIVED: 'metadata_arrived',
    SCRIPTDATA_ARRIVED: 'scriptdata_arrived',
    STATISTICS_INFO: 'statistics_info'
};
/* harmony default export */ __webpack_exports__["default"] = (PlayerEvents);


/***/ }),

/***/ "./src/remux/aac-silent.js":
/*!*********************************!*\
  !*** ./src/remux/aac-silent.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * This file is modified from dailymotion's hls.js library (hls.js/src/helper/aac.js)
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AAC = /** @class */ (function () {
    function AAC() {
    }
    AAC.getSilentFrame = function (codec, channelCount) {
        if (codec === 'mp4a.40.2') {
            // handle LC-AAC
            if (channelCount === 1) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
            }
            else if (channelCount === 2) {
                return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
            }
            else if (channelCount === 3) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
            }
            else if (channelCount === 4) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
            }
            else if (channelCount === 5) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
            }
            else if (channelCount === 6) {
                return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
            }
        }
        else {
            // handle HE-AAC (mp4a.40.5 / mp4a.40.29)
            if (channelCount === 1) {
                // ffmpeg -y -f lavfi -i "aevalsrc=0:d=0.05" -c:a libfdk_aac -profile:a aac_he -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
                return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x4e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x1c, 0x6, 0xf1, 0xc1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
            }
            else if (channelCount === 2) {
                // ffmpeg -y -f lavfi -i "aevalsrc=0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
                return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
            }
            else if (channelCount === 3) {
                // ffmpeg -y -f lavfi -i "aevalsrc=0|0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
                return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
            }
        }
        return null;
    };
    return AAC;
}());
/* harmony default export */ __webpack_exports__["default"] = (AAC);


/***/ }),

/***/ "./src/remux/mp4-generator.js":
/*!************************************!*\
  !*** ./src/remux/mp4-generator.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * This file is derived from dailymotion's hls.js library (hls.js/src/remux/mp4-generator.js)
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//  MP4 boxes generator for ISO BMFF (ISO Base Media File Format, defined in ISO/IEC 14496-12)
var MP4 = /** @class */ (function () {
    function MP4() {
    }
    MP4.init = function () {
        MP4.types = {
            avc1: [], avcC: [], btrt: [], dinf: [],
            dref: [], esds: [], ftyp: [], hdlr: [],
            mdat: [], mdhd: [], mdia: [], mfhd: [],
            minf: [], moof: [], moov: [], mp4a: [],
            mvex: [], mvhd: [], sdtp: [], stbl: [],
            stco: [], stsc: [], stsd: [], stsz: [],
            stts: [], tfdt: [], tfhd: [], traf: [],
            trak: [], trun: [], trex: [], tkhd: [],
            vmhd: [], smhd: [], '.mp3': []
        };
        for (var name_1 in MP4.types) {
            if (MP4.types.hasOwnProperty(name_1)) {
                MP4.types[name_1] = [
                    name_1.charCodeAt(0),
                    name_1.charCodeAt(1),
                    name_1.charCodeAt(2),
                    name_1.charCodeAt(3)
                ];
            }
        }
        var constants = MP4.constants = {};
        constants.FTYP = new Uint8Array([
            0x69, 0x73, 0x6F, 0x6D,
            0x0, 0x0, 0x0, 0x1,
            0x69, 0x73, 0x6F, 0x6D,
            0x61, 0x76, 0x63, 0x31 // avc1
        ]);
        constants.STSD_PREFIX = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x01 // entry_count
        ]);
        constants.STTS = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00 // entry_count
        ]);
        constants.STSC = constants.STCO = constants.STTS;
        constants.STSZ = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00 // sample_count
        ]);
        constants.HDLR_VIDEO = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x76, 0x69, 0x64, 0x65,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x56, 0x69, 0x64, 0x65,
            0x6F, 0x48, 0x61, 0x6E,
            0x64, 0x6C, 0x65, 0x72, 0x00 // name: VideoHandler
        ]);
        constants.HDLR_AUDIO = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x73, 0x6F, 0x75, 0x6E,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x53, 0x6F, 0x75, 0x6E,
            0x64, 0x48, 0x61, 0x6E,
            0x64, 0x6C, 0x65, 0x72, 0x00 // name: SoundHandler
        ]);
        constants.DREF = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x01,
            0x00, 0x00, 0x00, 0x0C,
            0x75, 0x72, 0x6C, 0x20,
            0x00, 0x00, 0x00, 0x01 // version(0) + flags
        ]);
        // Sound media header
        constants.SMHD = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00 // balance(2) + reserved(2)
        ]);
        // video media header
        constants.VMHD = new Uint8Array([
            0x00, 0x00, 0x00, 0x01,
            0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00
        ]);
    };
    // Generate a box
    MP4.box = function (type) {
        var size = 8;
        var result = null;
        var datas = Array.prototype.slice.call(arguments, 1);
        var arrayCount = datas.length;
        for (var i = 0; i < arrayCount; i++) {
            size += datas[i].byteLength;
        }
        result = new Uint8Array(size);
        result[0] = (size >>> 24) & 0xFF; // size
        result[1] = (size >>> 16) & 0xFF;
        result[2] = (size >>> 8) & 0xFF;
        result[3] = (size) & 0xFF;
        result.set(type, 4); // type
        var offset = 8;
        for (var i = 0; i < arrayCount; i++) { // data body
            result.set(datas[i], offset);
            offset += datas[i].byteLength;
        }
        return result;
    };
    // emit ftyp & moov
    MP4.generateInitSegment = function (meta) {
        var ftyp = MP4.box(MP4.types.ftyp, MP4.constants.FTYP);
        var moov = MP4.moov(meta);
        var result = new Uint8Array(ftyp.byteLength + moov.byteLength);
        result.set(ftyp, 0);
        result.set(moov, ftyp.byteLength);
        return result;
    };
    // Movie metadata box
    MP4.moov = function (meta) {
        var mvhd = MP4.mvhd(meta.timescale, meta.duration);
        var trak = MP4.trak(meta);
        var mvex = MP4.mvex(meta);
        return MP4.box(MP4.types.moov, mvhd, trak, mvex);
    };
    // Movie header box
    MP4.mvhd = function (timescale, duration) {
        return MP4.box(MP4.types.mvhd, new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            (timescale >>> 24) & 0xFF,
            (timescale >>> 16) & 0xFF,
            (timescale >>> 8) & 0xFF,
            (timescale) & 0xFF,
            (duration >>> 24) & 0xFF,
            (duration >>> 16) & 0xFF,
            (duration >>> 8) & 0xFF,
            (duration) & 0xFF,
            0x00, 0x01, 0x00, 0x00,
            0x01, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x01, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x01, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x40, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0xFF, 0xFF, 0xFF, 0xFF // next_track_ID
        ]));
    };
    // Track box
    MP4.trak = function (meta) {
        return MP4.box(MP4.types.trak, MP4.tkhd(meta), MP4.mdia(meta));
    };
    // Track header box
    MP4.tkhd = function (meta) {
        var trackId = meta.id, duration = meta.duration;
        var width = meta.presentWidth, height = meta.presentHeight;
        return MP4.box(MP4.types.tkhd, new Uint8Array([
            0x00, 0x00, 0x00, 0x07,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            (trackId >>> 24) & 0xFF,
            (trackId >>> 16) & 0xFF,
            (trackId >>> 8) & 0xFF,
            (trackId) & 0xFF,
            0x00, 0x00, 0x00, 0x00,
            (duration >>> 24) & 0xFF,
            (duration >>> 16) & 0xFF,
            (duration >>> 8) & 0xFF,
            (duration) & 0xFF,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x01, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x01, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x40, 0x00, 0x00, 0x00,
            (width >>> 8) & 0xFF,
            (width) & 0xFF,
            0x00, 0x00,
            (height >>> 8) & 0xFF,
            (height) & 0xFF,
            0x00, 0x00
        ]));
    };
    // Media Box
    MP4.mdia = function (meta) {
        return MP4.box(MP4.types.mdia, MP4.mdhd(meta), MP4.hdlr(meta), MP4.minf(meta));
    };
    // Media header box
    MP4.mdhd = function (meta) {
        var timescale = meta.timescale;
        var duration = meta.duration;
        return MP4.box(MP4.types.mdhd, new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            (timescale >>> 24) & 0xFF,
            (timescale >>> 16) & 0xFF,
            (timescale >>> 8) & 0xFF,
            (timescale) & 0xFF,
            (duration >>> 24) & 0xFF,
            (duration >>> 16) & 0xFF,
            (duration >>> 8) & 0xFF,
            (duration) & 0xFF,
            0x55, 0xC4,
            0x00, 0x00 // pre_defined = 0
        ]));
    };
    // Media handler reference box
    MP4.hdlr = function (meta) {
        var data = null;
        if (meta.type === 'audio') {
            data = MP4.constants.HDLR_AUDIO;
        }
        else {
            data = MP4.constants.HDLR_VIDEO;
        }
        return MP4.box(MP4.types.hdlr, data);
    };
    // Media infomation box
    MP4.minf = function (meta) {
        var xmhd = null;
        if (meta.type === 'audio') {
            xmhd = MP4.box(MP4.types.smhd, MP4.constants.SMHD);
        }
        else {
            xmhd = MP4.box(MP4.types.vmhd, MP4.constants.VMHD);
        }
        return MP4.box(MP4.types.minf, xmhd, MP4.dinf(), MP4.stbl(meta));
    };
    // Data infomation box
    MP4.dinf = function () {
        var result = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, MP4.constants.DREF));
        return result;
    };
    // Sample table box
    MP4.stbl = function (meta) {
        var result = MP4.box(MP4.types.stbl, // type: stbl
        MP4.stsd(meta), // Sample Description Table
        MP4.box(MP4.types.stts, MP4.constants.STTS), // Time-To-Sample
        MP4.box(MP4.types.stsc, MP4.constants.STSC), // Sample-To-Chunk
        MP4.box(MP4.types.stsz, MP4.constants.STSZ), // Sample size
        MP4.box(MP4.types.stco, MP4.constants.STCO) // Chunk offset
        );
        return result;
    };
    // Sample description box
    MP4.stsd = function (meta) {
        if (meta.type === 'audio') {
            if (meta.codec === 'mp3') {
                return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp3(meta));
            }
            // else: aac -> mp4a
            return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.mp4a(meta));
        }
        else {
            return MP4.box(MP4.types.stsd, MP4.constants.STSD_PREFIX, MP4.avc1(meta));
        }
    };
    MP4.mp3 = function (meta) {
        var channelCount = meta.channelCount;
        var sampleRate = meta.audioSampleRate;
        var data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x01,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, channelCount,
            0x00, 0x10,
            0x00, 0x00, 0x00, 0x00,
            (sampleRate >>> 8) & 0xFF,
            (sampleRate) & 0xFF,
            0x00, 0x00
        ]);
        return MP4.box(MP4.types['.mp3'], data);
    };
    MP4.mp4a = function (meta) {
        var channelCount = meta.channelCount;
        var sampleRate = meta.audioSampleRate;
        var data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x01,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, channelCount,
            0x00, 0x10,
            0x00, 0x00, 0x00, 0x00,
            (sampleRate >>> 8) & 0xFF,
            (sampleRate) & 0xFF,
            0x00, 0x00
        ]);
        return MP4.box(MP4.types.mp4a, data, MP4.esds(meta));
    };
    MP4.esds = function (meta) {
        var config = meta.config || [];
        var configSize = config.length;
        var data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x03,
            0x17 + configSize,
            0x00, 0x01,
            0x00,
            0x04,
            0x0F + configSize,
            0x40,
            0x15,
            0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x05 // descriptor_type
        ].concat([
            configSize
        ]).concat(config).concat([
            0x06, 0x01, 0x02 // GASpecificConfig
        ]));
        return MP4.box(MP4.types.esds, data);
    };
    MP4.avc1 = function (meta) {
        var avcc = meta.avcc;
        var width = meta.codecWidth, height = meta.codecHeight;
        var data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x01,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            (width >>> 8) & 0xFF,
            (width) & 0xFF,
            (height >>> 8) & 0xFF,
            (height) & 0xFF,
            0x00, 0x48, 0x00, 0x00,
            0x00, 0x48, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x01,
            0x0A,
            0x78, 0x71, 0x71, 0x2F,
            0x66, 0x6C, 0x76, 0x2E,
            0x6A, 0x73, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00,
            0x00, 0x18,
            0xFF, 0xFF // pre_defined = -1
        ]);
        return MP4.box(MP4.types.avc1, data, MP4.box(MP4.types.avcC, avcc));
    };
    // Movie Extends box
    MP4.mvex = function (meta) {
        return MP4.box(MP4.types.mvex, MP4.trex(meta));
    };
    // Track Extends box
    MP4.trex = function (meta) {
        var trackId = meta.id;
        var data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            (trackId >>> 24) & 0xFF,
            (trackId >>> 16) & 0xFF,
            (trackId >>> 8) & 0xFF,
            (trackId) & 0xFF,
            0x00, 0x00, 0x00, 0x01,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x01, 0x00, 0x01 // default_sample_flags
        ]);
        return MP4.box(MP4.types.trex, data);
    };
    // Movie fragment box
    MP4.moof = function (track, baseMediaDecodeTime) {
        return MP4.box(MP4.types.moof, MP4.mfhd(track.sequenceNumber), MP4.traf(track, baseMediaDecodeTime));
    };
    MP4.mfhd = function (sequenceNumber) {
        var data = new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            (sequenceNumber >>> 24) & 0xFF,
            (sequenceNumber >>> 16) & 0xFF,
            (sequenceNumber >>> 8) & 0xFF,
            (sequenceNumber) & 0xFF
        ]);
        return MP4.box(MP4.types.mfhd, data);
    };
    // Track fragment box
    MP4.traf = function (track, baseMediaDecodeTime) {
        var trackId = track.id;
        // Track fragment header box
        var tfhd = MP4.box(MP4.types.tfhd, new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            (trackId >>> 24) & 0xFF,
            (trackId >>> 16) & 0xFF,
            (trackId >>> 8) & 0xFF,
            (trackId) & 0xFF
        ]));
        // Track Fragment Decode Time
        var tfdt = MP4.box(MP4.types.tfdt, new Uint8Array([
            0x00, 0x00, 0x00, 0x00,
            (baseMediaDecodeTime >>> 24) & 0xFF,
            (baseMediaDecodeTime >>> 16) & 0xFF,
            (baseMediaDecodeTime >>> 8) & 0xFF,
            (baseMediaDecodeTime) & 0xFF
        ]));
        var sdtp = MP4.sdtp(track);
        var trun = MP4.trun(track, sdtp.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
        return MP4.box(MP4.types.traf, tfhd, tfdt, trun, sdtp);
    };
    // Sample Dependency Type box
    MP4.sdtp = function (track) {
        var samples = track.samples || [];
        var sampleCount = samples.length;
        var data = new Uint8Array(4 + sampleCount);
        // 0~4 bytes: version(0) & flags
        for (var i = 0; i < sampleCount; i++) {
            var flags = samples[i].flags;
            data[i + 4] = (flags.isLeading << 6) // is_leading: 2 (bit)
                | (flags.dependsOn << 4) // sample_depends_on
                | (flags.isDependedOn << 2) // sample_is_depended_on
                | (flags.hasRedundancy); // sample_has_redundancy
        }
        return MP4.box(MP4.types.sdtp, data);
    };
    // Track fragment run box
    MP4.trun = function (track, offset) {
        var samples = track.samples || [];
        var sampleCount = samples.length;
        var dataSize = 12 + 16 * sampleCount;
        var data = new Uint8Array(dataSize);
        offset += 8 + dataSize;
        data.set([
            0x00, 0x00, 0x0F, 0x01,
            (sampleCount >>> 24) & 0xFF,
            (sampleCount >>> 16) & 0xFF,
            (sampleCount >>> 8) & 0xFF,
            (sampleCount) & 0xFF,
            (offset >>> 24) & 0xFF,
            (offset >>> 16) & 0xFF,
            (offset >>> 8) & 0xFF,
            (offset) & 0xFF
        ], 0);
        for (var i = 0; i < sampleCount; i++) {
            var duration = samples[i].duration;
            var size = samples[i].size;
            var flags = samples[i].flags;
            var cts = samples[i].cts;
            data.set([
                (duration >>> 24) & 0xFF,
                (duration >>> 16) & 0xFF,
                (duration >>> 8) & 0xFF,
                (duration) & 0xFF,
                (size >>> 24) & 0xFF,
                (size >>> 16) & 0xFF,
                (size >>> 8) & 0xFF,
                (size) & 0xFF,
                (flags.isLeading << 2) | flags.dependsOn,
                (flags.isDependedOn << 6) | (flags.hasRedundancy << 4) | flags.isNonSync,
                0x00, 0x00,
                (cts >>> 24) & 0xFF,
                (cts >>> 16) & 0xFF,
                (cts >>> 8) & 0xFF,
                (cts) & 0xFF
            ], 12 + 16 * i);
        }
        return MP4.box(MP4.types.trun, data);
    };
    MP4.mdat = function (data) {
        return MP4.box(MP4.types.mdat, data);
    };
    return MP4;
}());
MP4.init();
/* harmony default export */ __webpack_exports__["default"] = (MP4);


/***/ }),

/***/ "./src/remux/mp4-remuxer.js":
/*!**********************************!*\
  !*** ./src/remux/mp4-remuxer.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _mp4_generator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mp4-generator.js */ "./src/remux/mp4-generator.js");
/* harmony import */ var _aac_silent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aac-silent.js */ "./src/remux/aac-silent.js");
/* harmony import */ var _utils_browser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/browser.js */ "./src/utils/browser.js");
/* harmony import */ var _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/media-segment-info.js */ "./src/core/media-segment-info.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






// Fragmented mp4 remuxer
var MP4Remuxer = /** @class */ (function () {
    function MP4Remuxer(config) {
        this.TAG = 'MP4Remuxer';
        this._config = config;
        this._isLive = (config.isLive === true) ? true : false;
        this._dtsBase = -1;
        this._dtsBaseInited = false;
        this._audioDtsBase = Infinity;
        this._videoDtsBase = Infinity;
        this._audioNextDts = undefined;
        this._videoNextDts = undefined;
        this._audioStashedLastSample = null;
        this._videoStashedLastSample = null;
        this._audioMeta = null;
        this._videoMeta = null;
        this._audioSegmentInfoList = new _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.MediaSegmentInfoList('audio');
        this._videoSegmentInfoList = new _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.MediaSegmentInfoList('video');
        this._onInitSegment = null;
        this._onMediaSegment = null;
        // Workaround for chrome < 50: Always force first sample as a Random Access Point in media segment
        // see https://bugs.chromium.org/p/chromium/issues/detail?id=229412
        this._forceFirstIDR = (_utils_browser_js__WEBPACK_IMPORTED_MODULE_3__.default.chrome &&
            (_utils_browser_js__WEBPACK_IMPORTED_MODULE_3__.default.version.major < 50 ||
                (_utils_browser_js__WEBPACK_IMPORTED_MODULE_3__.default.version.major === 50 && _utils_browser_js__WEBPACK_IMPORTED_MODULE_3__.default.version.build < 2661))) ? true : false;
        // Workaround for IE11/Edge: Fill silent aac frame after keyframe-seeking
        // Make audio beginDts equals with video beginDts, in order to fix seek freeze
        this._fillSilentAfterSeek = (_utils_browser_js__WEBPACK_IMPORTED_MODULE_3__.default.msedge || _utils_browser_js__WEBPACK_IMPORTED_MODULE_3__.default.msie);
        // While only FireFox supports 'audio/mp4, codecs="mp3"', use 'audio/mpeg' for chrome, safari, ...
        this._mp3UseMpegAudio = !_utils_browser_js__WEBPACK_IMPORTED_MODULE_3__.default.firefox;
        this._fillAudioTimestampGap = this._config.fixAudioTimestampGap;
    }
    MP4Remuxer.prototype.destroy = function () {
        this._dtsBase = -1;
        this._dtsBaseInited = false;
        this._audioMeta = null;
        this._videoMeta = null;
        this._audioSegmentInfoList.clear();
        this._audioSegmentInfoList = null;
        this._videoSegmentInfoList.clear();
        this._videoSegmentInfoList = null;
        this._onInitSegment = null;
        this._onMediaSegment = null;
    };
    MP4Remuxer.prototype.bindDataSource = function (producer) {
        producer.onDataAvailable = this.remux.bind(this);
        producer.onTrackMetadata = this._onTrackMetadataReceived.bind(this);
        return this;
    };
    Object.defineProperty(MP4Remuxer.prototype, "onInitSegment", {
        /* prototype: function onInitSegment(type: string, initSegment: ArrayBuffer): void
           InitSegment: {
               type: string,
               data: ArrayBuffer,
               codec: string,
               container: string
           }
        */
        get: function () {
            return this._onInitSegment;
        },
        set: function (callback) {
            this._onInitSegment = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MP4Remuxer.prototype, "onMediaSegment", {
        /* prototype: function onMediaSegment(type: string, mediaSegment: MediaSegment): void
           MediaSegment: {
               type: string,
               data: ArrayBuffer,
               sampleCount: int32
               info: MediaSegmentInfo
           }
        */
        get: function () {
            return this._onMediaSegment;
        },
        set: function (callback) {
            this._onMediaSegment = callback;
        },
        enumerable: false,
        configurable: true
    });
    MP4Remuxer.prototype.insertDiscontinuity = function () {
        this._audioNextDts = this._videoNextDts = undefined;
    };
    MP4Remuxer.prototype.seek = function (originalDts) {
        this._audioStashedLastSample = null;
        this._videoStashedLastSample = null;
        this._videoSegmentInfoList.clear();
        this._audioSegmentInfoList.clear();
    };
    MP4Remuxer.prototype.remux = function (audioTrack, videoTrack) {
        if (!this._onMediaSegment) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__.IllegalStateException('MP4Remuxer: onMediaSegment callback must be specificed!');
        }
        if (!this._dtsBaseInited) {
            this._calculateDtsBase(audioTrack, videoTrack);
        }
        this._remuxVideo(videoTrack);
        this._remuxAudio(audioTrack);
    };
    MP4Remuxer.prototype._onTrackMetadataReceived = function (type, metadata) {
        var metabox = null;
        var container = 'mp4';
        var codec = metadata.codec;
        if (type === 'audio') {
            this._audioMeta = metadata;
            if (metadata.codec === 'mp3' && this._mp3UseMpegAudio) {
                // 'audio/mpeg' for MP3 audio track
                container = 'mpeg';
                codec = '';
                metabox = new Uint8Array();
            }
            else {
                // 'audio/mp4, codecs="codec"'
                metabox = _mp4_generator_js__WEBPACK_IMPORTED_MODULE_1__.default.generateInitSegment(metadata);
            }
        }
        else if (type === 'video') {
            this._videoMeta = metadata;
            metabox = _mp4_generator_js__WEBPACK_IMPORTED_MODULE_1__.default.generateInitSegment(metadata);
        }
        else {
            return;
        }
        // dispatch metabox (Initialization Segment)
        if (!this._onInitSegment) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__.IllegalStateException('MP4Remuxer: onInitSegment callback must be specified!');
        }
        this._onInitSegment(type, {
            type: type,
            data: metabox.buffer,
            codec: codec,
            container: type + "/" + container,
            mediaDuration: metadata.duration // in timescale 1000 (milliseconds)
        });
    };
    MP4Remuxer.prototype._calculateDtsBase = function (audioTrack, videoTrack) {
        if (this._dtsBaseInited) {
            return;
        }
        if (audioTrack.samples && audioTrack.samples.length) {
            this._audioDtsBase = audioTrack.samples[0].dts;
        }
        if (videoTrack.samples && videoTrack.samples.length) {
            this._videoDtsBase = videoTrack.samples[0].dts;
        }
        this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase);
        this._dtsBaseInited = true;
    };
    MP4Remuxer.prototype.flushStashedSamples = function () {
        var videoSample = this._videoStashedLastSample;
        var audioSample = this._audioStashedLastSample;
        var videoTrack = {
            type: 'video',
            id: 1,
            sequenceNumber: 0,
            samples: [],
            length: 0
        };
        if (videoSample != null) {
            videoTrack.samples.push(videoSample);
            videoTrack.length = videoSample.length;
        }
        var audioTrack = {
            type: 'audio',
            id: 2,
            sequenceNumber: 0,
            samples: [],
            length: 0
        };
        if (audioSample != null) {
            audioTrack.samples.push(audioSample);
            audioTrack.length = audioSample.length;
        }
        this._videoStashedLastSample = null;
        this._audioStashedLastSample = null;
        this._remuxVideo(videoTrack, true);
        this._remuxAudio(audioTrack, true);
    };
    MP4Remuxer.prototype._remuxAudio = function (audioTrack, force) {
        if (this._audioMeta == null) {
            return;
        }
        var track = audioTrack;
        var samples = track.samples;
        var dtsCorrection = undefined;
        var firstDts = -1, lastDts = -1, lastPts = -1;
        var refSampleDuration = this._audioMeta.refSampleDuration;
        var mpegRawTrack = this._audioMeta.codec === 'mp3' && this._mp3UseMpegAudio;
        var firstSegmentAfterSeek = this._dtsBaseInited && this._audioNextDts === undefined;
        var insertPrefixSilentFrame = false;
        if (!samples || samples.length === 0) {
            return;
        }
        if (samples.length === 1 && !force) {
            // If [sample count in current batch] === 1 && (force != true)
            // Ignore and keep in demuxer's queue
            return;
        } // else if (force === true) do remux
        var offset = 0;
        var mdatbox = null;
        var mdatBytes = 0;
        // calculate initial mdat size
        if (mpegRawTrack) {
            // for raw mpeg buffer
            offset = 0;
            mdatBytes = track.length;
        }
        else {
            // for fmp4 mdat box
            offset = 8; // size + type
            mdatBytes = 8 + track.length;
        }
        var lastSample = null;
        // Pop the lastSample and waiting for stash
        if (samples.length > 1) {
            lastSample = samples.pop();
            mdatBytes -= lastSample.length;
        }
        // Insert [stashed lastSample in the previous batch] to the front
        if (this._audioStashedLastSample != null) {
            var sample = this._audioStashedLastSample;
            this._audioStashedLastSample = null;
            samples.unshift(sample);
            mdatBytes += sample.length;
        }
        // Stash the lastSample of current batch, waiting for next batch
        if (lastSample != null) {
            this._audioStashedLastSample = lastSample;
        }
        var firstSampleOriginalDts = samples[0].dts - this._dtsBase;
        // calculate dtsCorrection
        if (this._audioNextDts) {
            dtsCorrection = firstSampleOriginalDts - this._audioNextDts;
        }
        else { // this._audioNextDts == undefined
            if (this._audioSegmentInfoList.isEmpty()) {
                dtsCorrection = 0;
                if (this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty()) {
                    if (this._audioMeta.originalCodec !== 'mp3') {
                        insertPrefixSilentFrame = true;
                    }
                }
            }
            else {
                var lastSample_1 = this._audioSegmentInfoList.getLastSampleBefore(firstSampleOriginalDts);
                if (lastSample_1 != null) {
                    var distance = (firstSampleOriginalDts - (lastSample_1.originalDts + lastSample_1.duration));
                    if (distance <= 3) {
                        distance = 0;
                    }
                    var expectedDts = lastSample_1.dts + lastSample_1.duration + distance;
                    dtsCorrection = firstSampleOriginalDts - expectedDts;
                }
                else { // lastSample == null, cannot found
                    dtsCorrection = 0;
                }
            }
        }
        if (insertPrefixSilentFrame) {
            // align audio segment beginDts to match with current video segment's beginDts
            var firstSampleDts = firstSampleOriginalDts - dtsCorrection;
            var videoSegment = this._videoSegmentInfoList.getLastSegmentBefore(firstSampleOriginalDts);
            if (videoSegment != null && videoSegment.beginDts < firstSampleDts) {
                var silentUnit = _aac_silent_js__WEBPACK_IMPORTED_MODULE_2__.default.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount);
                if (silentUnit) {
                    var dts = videoSegment.beginDts;
                    var silentFrameDuration = firstSampleDts - videoSegment.beginDts;
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.v(this.TAG, "InsertPrefixSilentAudio: dts: " + dts + ", duration: " + silentFrameDuration);
                    samples.unshift({ unit: silentUnit, dts: dts, pts: dts });
                    mdatBytes += silentUnit.byteLength;
                } // silentUnit == null: Cannot generate, skip
            }
            else {
                insertPrefixSilentFrame = false;
            }
        }
        var mp4Samples = [];
        // Correct dts for each sample, and calculate sample duration. Then output to mp4Samples
        for (var i = 0; i < samples.length; i++) {
            var sample = samples[i];
            var unit = sample.unit;
            var originalDts = sample.dts - this._dtsBase;
            var dts = originalDts;
            var needFillSilentFrames = false;
            var silentFrames = null;
            var sampleDuration = 0;
            if (originalDts < -0.001) {
                continue; //pass the first sample with the invalid dts
            }
            if (this._audioMeta.codec !== 'mp3') {
                // for AAC codec, we need to keep dts increase based on refSampleDuration
                var curRefDts = originalDts;
                var maxAudioFramesDrift = 3;
                if (this._audioNextDts) {
                    curRefDts = this._audioNextDts;
                }
                dtsCorrection = originalDts - curRefDts;
                if (dtsCorrection <= -maxAudioFramesDrift * refSampleDuration) {
                    // If we're overlapping by more than maxAudioFramesDrift number of frame, drop this sample
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Dropping 1 audio frame (originalDts: " + originalDts + " ms ,curRefDts: " + curRefDts + " ms)  due to dtsCorrection: " + dtsCorrection + " ms overlap.");
                    continue;
                }
                else if (dtsCorrection >= maxAudioFramesDrift * refSampleDuration && this._fillAudioTimestampGap && !_utils_browser_js__WEBPACK_IMPORTED_MODULE_3__.default.safari) {
                    // Silent frame generation, if large timestamp gap detected && config.fixAudioTimestampGap
                    needFillSilentFrames = true;
                    // We need to insert silent frames to fill timestamp gap
                    var frameCount = Math.floor(dtsCorrection / refSampleDuration);
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Large audio timestamp gap detected, may cause AV sync to drift. ' +
                        'Silent frames will be generated to avoid unsync.\n' +
                        ("originalDts: " + originalDts + " ms, curRefDts: " + curRefDts + " ms, ") +
                        ("dtsCorrection: " + Math.round(dtsCorrection) + " ms, generate: " + frameCount + " frames"));
                    dts = Math.floor(curRefDts);
                    sampleDuration = Math.floor(curRefDts + refSampleDuration) - dts;
                    var silentUnit = _aac_silent_js__WEBPACK_IMPORTED_MODULE_2__.default.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount);
                    if (silentUnit == null) {
                        _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Unable to generate silent frame for ' +
                            (this._audioMeta.originalCodec + " with " + this._audioMeta.channelCount + " channels, repeat last frame"));
                        // Repeat last frame
                        silentUnit = unit;
                    }
                    silentFrames = [];
                    for (var j = 0; j < frameCount; j++) {
                        curRefDts = curRefDts + refSampleDuration;
                        var intDts = Math.floor(curRefDts); // change to integer
                        var intDuration = Math.floor(curRefDts + refSampleDuration) - intDts;
                        var frame = {
                            dts: intDts,
                            pts: intDts,
                            cts: 0,
                            unit: silentUnit,
                            size: silentUnit.byteLength,
                            duration: intDuration,
                            originalDts: originalDts,
                            flags: {
                                isLeading: 0,
                                dependsOn: 1,
                                isDependedOn: 0,
                                hasRedundancy: 0
                            }
                        };
                        silentFrames.push(frame);
                        mdatBytes += frame.size;
                        ;
                    }
                    this._audioNextDts = curRefDts + refSampleDuration;
                }
                else {
                    dts = Math.floor(curRefDts);
                    sampleDuration = Math.floor(curRefDts + refSampleDuration) - dts;
                    this._audioNextDts = curRefDts + refSampleDuration;
                }
            }
            else {
                // keep the original dts calculate algorithm for mp3
                dts = originalDts - dtsCorrection;
                if (i !== samples.length - 1) {
                    var nextDts = samples[i + 1].dts - this._dtsBase - dtsCorrection;
                    sampleDuration = nextDts - dts;
                }
                else { // the last sample
                    if (lastSample != null) { // use stashed sample's dts to calculate sample duration
                        var nextDts = lastSample.dts - this._dtsBase - dtsCorrection;
                        sampleDuration = nextDts - dts;
                    }
                    else if (mp4Samples.length >= 1) { // use second last sample duration
                        sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                    }
                    else { // the only one sample, use reference sample duration
                        sampleDuration = Math.floor(refSampleDuration);
                    }
                }
                this._audioNextDts = dts + sampleDuration;
            }
            if (firstDts === -1) {
                firstDts = dts;
            }
            mp4Samples.push({
                dts: dts,
                pts: dts,
                cts: 0,
                unit: sample.unit,
                size: sample.unit.byteLength,
                duration: sampleDuration,
                originalDts: originalDts,
                flags: {
                    isLeading: 0,
                    dependsOn: 1,
                    isDependedOn: 0,
                    hasRedundancy: 0
                }
            });
            if (needFillSilentFrames) {
                // Silent frames should be inserted after wrong-duration frame
                mp4Samples.push.apply(mp4Samples, silentFrames);
            }
        }
        if (mp4Samples.length === 0) {
            //no samples need to remux
            track.samples = [];
            track.length = 0;
            return;
        }
        // allocate mdatbox
        if (mpegRawTrack) {
            // allocate for raw mpeg buffer
            mdatbox = new Uint8Array(mdatBytes);
        }
        else {
            // allocate for fmp4 mdat box
            mdatbox = new Uint8Array(mdatBytes);
            // size field
            mdatbox[0] = (mdatBytes >>> 24) & 0xFF;
            mdatbox[1] = (mdatBytes >>> 16) & 0xFF;
            mdatbox[2] = (mdatBytes >>> 8) & 0xFF;
            mdatbox[3] = (mdatBytes) & 0xFF;
            // type field (fourCC)
            mdatbox.set(_mp4_generator_js__WEBPACK_IMPORTED_MODULE_1__.default.types.mdat, 4);
        }
        // Write samples into mdatbox
        for (var i = 0; i < mp4Samples.length; i++) {
            var unit = mp4Samples[i].unit;
            mdatbox.set(unit, offset);
            offset += unit.byteLength;
        }
        var latest = mp4Samples[mp4Samples.length - 1];
        lastDts = latest.dts + latest.duration;
        //this._audioNextDts = lastDts;
        // fill media segment info & add to info list
        var info = new _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.MediaSegmentInfo();
        info.beginDts = firstDts;
        info.endDts = lastDts;
        info.beginPts = firstDts;
        info.endPts = lastDts;
        info.originalBeginDts = mp4Samples[0].originalDts;
        info.originalEndDts = latest.originalDts + latest.duration;
        info.firstSample = new _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.SampleInfo(mp4Samples[0].dts, mp4Samples[0].pts, mp4Samples[0].duration, mp4Samples[0].originalDts, false);
        info.lastSample = new _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.SampleInfo(latest.dts, latest.pts, latest.duration, latest.originalDts, false);
        if (!this._isLive) {
            this._audioSegmentInfoList.append(info);
        }
        track.samples = mp4Samples;
        track.sequenceNumber++;
        var moofbox = null;
        if (mpegRawTrack) {
            // Generate empty buffer, because useless for raw mpeg
            moofbox = new Uint8Array();
        }
        else {
            // Generate moof for fmp4 segment
            moofbox = _mp4_generator_js__WEBPACK_IMPORTED_MODULE_1__.default.moof(track, firstDts);
        }
        track.samples = [];
        track.length = 0;
        var segment = {
            type: 'audio',
            data: this._mergeBoxes(moofbox, mdatbox).buffer,
            sampleCount: mp4Samples.length,
            info: info
        };
        if (mpegRawTrack && firstSegmentAfterSeek) {
            // For MPEG audio stream in MSE, if seeking occurred, before appending new buffer
            // We need explicitly set timestampOffset to the desired point in timeline for mpeg SourceBuffer.
            segment.timestampOffset = firstDts;
        }
        this._onMediaSegment('audio', segment);
    };
    MP4Remuxer.prototype._remuxVideo = function (videoTrack, force) {
        if (this._videoMeta == null) {
            return;
        }
        var track = videoTrack;
        var samples = track.samples;
        var dtsCorrection = undefined;
        var firstDts = -1, lastDts = -1;
        var firstPts = -1, lastPts = -1;
        if (!samples || samples.length === 0) {
            return;
        }
        if (samples.length === 1 && !force) {
            // If [sample count in current batch] === 1 && (force != true)
            // Ignore and keep in demuxer's queue
            return;
        } // else if (force === true) do remux
        var offset = 8;
        var mdatbox = null;
        var mdatBytes = 8 + videoTrack.length;
        var lastSample = null;
        // Pop the lastSample and waiting for stash
        if (samples.length > 1) {
            lastSample = samples.pop();
            mdatBytes -= lastSample.length;
        }
        // Insert [stashed lastSample in the previous batch] to the front
        if (this._videoStashedLastSample != null) {
            var sample = this._videoStashedLastSample;
            this._videoStashedLastSample = null;
            samples.unshift(sample);
            mdatBytes += sample.length;
        }
        // Stash the lastSample of current batch, waiting for next batch
        if (lastSample != null) {
            this._videoStashedLastSample = lastSample;
        }
        var firstSampleOriginalDts = samples[0].dts - this._dtsBase;
        // calculate dtsCorrection
        if (this._videoNextDts) {
            dtsCorrection = firstSampleOriginalDts - this._videoNextDts;
        }
        else { // this._videoNextDts == undefined
            if (this._videoSegmentInfoList.isEmpty()) {
                dtsCorrection = 0;
            }
            else {
                var lastSample_2 = this._videoSegmentInfoList.getLastSampleBefore(firstSampleOriginalDts);
                if (lastSample_2 != null) {
                    var distance = (firstSampleOriginalDts - (lastSample_2.originalDts + lastSample_2.duration));
                    if (distance <= 3) {
                        distance = 0;
                    }
                    var expectedDts = lastSample_2.dts + lastSample_2.duration + distance;
                    dtsCorrection = firstSampleOriginalDts - expectedDts;
                }
                else { // lastSample == null, cannot found
                    dtsCorrection = 0;
                }
            }
        }
        var info = new _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.MediaSegmentInfo();
        var mp4Samples = [];
        // Correct dts for each sample, and calculate sample duration. Then output to mp4Samples
        for (var i = 0; i < samples.length; i++) {
            var sample = samples[i];
            var originalDts = sample.dts - this._dtsBase;
            var isKeyframe = sample.isKeyframe;
            var dts = originalDts - dtsCorrection;
            var cts = sample.cts;
            var pts = dts + cts;
            if (firstDts === -1) {
                firstDts = dts;
                firstPts = pts;
            }
            var sampleDuration = 0;
            if (i !== samples.length - 1) {
                var nextDts = samples[i + 1].dts - this._dtsBase - dtsCorrection;
                sampleDuration = nextDts - dts;
            }
            else { // the last sample
                if (lastSample != null) { // use stashed sample's dts to calculate sample duration
                    var nextDts = lastSample.dts - this._dtsBase - dtsCorrection;
                    sampleDuration = nextDts - dts;
                }
                else if (mp4Samples.length >= 1) { // use second last sample duration
                    sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
                }
                else { // the only one sample, use reference sample duration
                    sampleDuration = Math.floor(this._videoMeta.refSampleDuration);
                }
            }
            if (isKeyframe) {
                var syncPoint = new _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.SampleInfo(dts, pts, sampleDuration, sample.dts, true);
                syncPoint.fileposition = sample.fileposition;
                info.appendSyncPoint(syncPoint);
            }
            mp4Samples.push({
                dts: dts,
                pts: pts,
                cts: cts,
                units: sample.units,
                size: sample.length,
                isKeyframe: isKeyframe,
                duration: sampleDuration,
                originalDts: originalDts,
                flags: {
                    isLeading: 0,
                    dependsOn: isKeyframe ? 2 : 1,
                    isDependedOn: isKeyframe ? 1 : 0,
                    hasRedundancy: 0,
                    isNonSync: isKeyframe ? 0 : 1
                }
            });
        }
        // allocate mdatbox
        mdatbox = new Uint8Array(mdatBytes);
        mdatbox[0] = (mdatBytes >>> 24) & 0xFF;
        mdatbox[1] = (mdatBytes >>> 16) & 0xFF;
        mdatbox[2] = (mdatBytes >>> 8) & 0xFF;
        mdatbox[3] = (mdatBytes) & 0xFF;
        mdatbox.set(_mp4_generator_js__WEBPACK_IMPORTED_MODULE_1__.default.types.mdat, 4);
        // Write samples into mdatbox
        for (var i = 0; i < mp4Samples.length; i++) {
            var units = mp4Samples[i].units;
            while (units.length) {
                var unit = units.shift();
                var data = unit.data;
                mdatbox.set(data, offset);
                offset += data.byteLength;
            }
        }
        var latest = mp4Samples[mp4Samples.length - 1];
        lastDts = latest.dts + latest.duration;
        lastPts = latest.pts + latest.duration;
        this._videoNextDts = lastDts;
        // fill media segment info & add to info list
        info.beginDts = firstDts;
        info.endDts = lastDts;
        info.beginPts = firstPts;
        info.endPts = lastPts;
        info.originalBeginDts = mp4Samples[0].originalDts;
        info.originalEndDts = latest.originalDts + latest.duration;
        info.firstSample = new _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.SampleInfo(mp4Samples[0].dts, mp4Samples[0].pts, mp4Samples[0].duration, mp4Samples[0].originalDts, mp4Samples[0].isKeyframe);
        info.lastSample = new _core_media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.SampleInfo(latest.dts, latest.pts, latest.duration, latest.originalDts, latest.isKeyframe);
        if (!this._isLive) {
            this._videoSegmentInfoList.append(info);
        }
        track.samples = mp4Samples;
        track.sequenceNumber++;
        // workaround for chrome < 50: force first sample as a random access point
        // see https://bugs.chromium.org/p/chromium/issues/detail?id=229412
        if (this._forceFirstIDR) {
            var flags = mp4Samples[0].flags;
            flags.dependsOn = 2;
            flags.isNonSync = 0;
        }
        var moofbox = _mp4_generator_js__WEBPACK_IMPORTED_MODULE_1__.default.moof(track, firstDts);
        track.samples = [];
        track.length = 0;
        this._onMediaSegment('video', {
            type: 'video',
            data: this._mergeBoxes(moofbox, mdatbox).buffer,
            sampleCount: mp4Samples.length,
            info: info
        });
    };
    MP4Remuxer.prototype._mergeBoxes = function (moof, mdat) {
        var result = new Uint8Array(moof.byteLength + mdat.byteLength);
        result.set(moof, 0);
        result.set(mdat, moof.byteLength);
        return result;
    };
    return MP4Remuxer;
}());
/* harmony default export */ __webpack_exports__["default"] = (MP4Remuxer);


/***/ }),

/***/ "./src/utils/browser.js":
/*!******************************!*\
  !*** ./src/utils/browser.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Browser = {};
function detect() {
    // modified from jquery-browser-plugin
    var ua = self.navigator.userAgent.toLowerCase();
    var match = /(edge)\/([\w.]+)/.exec(ua) ||
        /(opr)[\/]([\w.]+)/.exec(ua) ||
        /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(iemobile)[\/]([\w.]+)/.exec(ua) ||
        /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
        ua.indexOf('compatible') < 0 && /(firefox)[ \/]([\w.]+)/.exec(ua) ||
        [];
    var platform_match = /(ipad)/.exec(ua) ||
        /(ipod)/.exec(ua) ||
        /(windows phone)/.exec(ua) ||
        /(iphone)/.exec(ua) ||
        /(kindle)/.exec(ua) ||
        /(android)/.exec(ua) ||
        /(windows)/.exec(ua) ||
        /(mac)/.exec(ua) ||
        /(linux)/.exec(ua) ||
        /(cros)/.exec(ua) ||
        [];
    var matched = {
        browser: match[5] || match[3] || match[1] || '',
        version: match[2] || match[4] || '0',
        majorVersion: match[4] || match[2] || '0',
        platform: platform_match[0] || ''
    };
    var browser = {};
    if (matched.browser) {
        browser[matched.browser] = true;
        var versionArray = matched.majorVersion.split('.');
        browser.version = {
            major: parseInt(matched.majorVersion, 10),
            string: matched.version
        };
        if (versionArray.length > 1) {
            browser.version.minor = parseInt(versionArray[1], 10);
        }
        if (versionArray.length > 2) {
            browser.version.build = parseInt(versionArray[2], 10);
        }
    }
    if (matched.platform) {
        browser[matched.platform] = true;
    }
    if (browser.chrome || browser.opr || browser.safari) {
        browser.webkit = true;
    }
    // MSIE. IE11 has 'rv' identifer
    if (browser.rv || browser.iemobile) {
        if (browser.rv) {
            delete browser.rv;
        }
        var msie = 'msie';
        matched.browser = msie;
        browser[msie] = true;
    }
    // Microsoft Edge
    if (browser.edge) {
        delete browser.edge;
        var msedge = 'msedge';
        matched.browser = msedge;
        browser[msedge] = true;
    }
    // Opera 15+
    if (browser.opr) {
        var opera = 'opera';
        matched.browser = opera;
        browser[opera] = true;
    }
    // Stock android browsers are marked as Safari
    if (browser.safari && browser.android) {
        var android = 'android';
        matched.browser = android;
        browser[android] = true;
    }
    browser.name = matched.browser;
    browser.platform = matched.platform;
    for (var key in Browser) {
        if (Browser.hasOwnProperty(key)) {
            delete Browser[key];
        }
    }
    Object.assign(Browser, browser);
}
detect();
/* harmony default export */ __webpack_exports__["default"] = (Browser);


/***/ }),

/***/ "./src/utils/exception.js":
/*!********************************!*\
  !*** ./src/utils/exception.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RuntimeException": function() { return /* binding */ RuntimeException; },
/* harmony export */   "IllegalStateException": function() { return /* binding */ IllegalStateException; },
/* harmony export */   "InvalidArgumentException": function() { return /* binding */ InvalidArgumentException; },
/* harmony export */   "NotImplementedException": function() { return /* binding */ NotImplementedException; }
/* harmony export */ });
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RuntimeException = /** @class */ (function () {
    function RuntimeException(message) {
        this._message = message;
    }
    Object.defineProperty(RuntimeException.prototype, "name", {
        get: function () {
            return 'RuntimeException';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RuntimeException.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: false,
        configurable: true
    });
    RuntimeException.prototype.toString = function () {
        return this.name + ': ' + this.message;
    };
    return RuntimeException;
}());

var IllegalStateException = /** @class */ (function (_super) {
    __extends(IllegalStateException, _super);
    function IllegalStateException(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(IllegalStateException.prototype, "name", {
        get: function () {
            return 'IllegalStateException';
        },
        enumerable: false,
        configurable: true
    });
    return IllegalStateException;
}(RuntimeException));

var InvalidArgumentException = /** @class */ (function (_super) {
    __extends(InvalidArgumentException, _super);
    function InvalidArgumentException(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(InvalidArgumentException.prototype, "name", {
        get: function () {
            return 'InvalidArgumentException';
        },
        enumerable: false,
        configurable: true
    });
    return InvalidArgumentException;
}(RuntimeException));

var NotImplementedException = /** @class */ (function (_super) {
    __extends(NotImplementedException, _super);
    function NotImplementedException(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(NotImplementedException.prototype, "name", {
        get: function () {
            return 'NotImplementedException';
        },
        enumerable: false,
        configurable: true
    });
    return NotImplementedException;
}(RuntimeException));



/***/ }),

/***/ "./src/utils/logger.js":
/*!*****************************!*\
  !*** ./src/utils/logger.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Log = /** @class */ (function () {
    function Log() {
    }
    Log.e = function (tag, msg) {
        if (!tag || Log.FORCE_GLOBAL_TAG)
            tag = Log.GLOBAL_TAG;
        var str = "[" + tag + "] > " + msg;
        if (Log.ENABLE_CALLBACK) {
            Log.emitter.emit('log', 'error', str);
        }
        if (!Log.ENABLE_ERROR) {
            return;
        }
        if (console.error) {
            console.error(str);
        }
        else if (console.warn) {
            console.warn(str);
        }
        else {
            console.log(str);
        }
    };
    Log.i = function (tag, msg) {
        if (!tag || Log.FORCE_GLOBAL_TAG)
            tag = Log.GLOBAL_TAG;
        var str = "[" + tag + "] > " + msg;
        if (Log.ENABLE_CALLBACK) {
            Log.emitter.emit('log', 'info', str);
        }
        if (!Log.ENABLE_INFO) {
            return;
        }
        if (console.info) {
            console.info(str);
        }
        else {
            console.log(str);
        }
    };
    Log.w = function (tag, msg) {
        if (!tag || Log.FORCE_GLOBAL_TAG)
            tag = Log.GLOBAL_TAG;
        var str = "[" + tag + "] > " + msg;
        if (Log.ENABLE_CALLBACK) {
            Log.emitter.emit('log', 'warn', str);
        }
        if (!Log.ENABLE_WARN) {
            return;
        }
        if (console.warn) {
            console.warn(str);
        }
        else {
            console.log(str);
        }
    };
    Log.d = function (tag, msg) {
        if (!tag || Log.FORCE_GLOBAL_TAG)
            tag = Log.GLOBAL_TAG;
        var str = "[" + tag + "] > " + msg;
        if (Log.ENABLE_CALLBACK) {
            Log.emitter.emit('log', 'debug', str);
        }
        if (!Log.ENABLE_DEBUG) {
            return;
        }
        if (console.debug) {
            console.debug(str);
        }
        else {
            console.log(str);
        }
    };
    Log.v = function (tag, msg) {
        if (!tag || Log.FORCE_GLOBAL_TAG)
            tag = Log.GLOBAL_TAG;
        var str = "[" + tag + "] > " + msg;
        if (Log.ENABLE_CALLBACK) {
            Log.emitter.emit('log', 'verbose', str);
        }
        if (!Log.ENABLE_VERBOSE) {
            return;
        }
        console.log(str);
    };
    return Log;
}());
Log.GLOBAL_TAG = 'flv.js';
Log.FORCE_GLOBAL_TAG = false;
Log.ENABLE_ERROR = true;
Log.ENABLE_INFO = true;
Log.ENABLE_WARN = true;
Log.ENABLE_DEBUG = true;
Log.ENABLE_VERBOSE = true;
Log.ENABLE_CALLBACK = false;
Log.emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
/* harmony default export */ __webpack_exports__["default"] = (Log);


/***/ }),

/***/ "./src/utils/logging-control.js":
/*!**************************************!*\
  !*** ./src/utils/logging-control.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.js */ "./src/utils/logger.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var LoggingControl = /** @class */ (function () {
    function LoggingControl() {
    }
    Object.defineProperty(LoggingControl, "forceGlobalTag", {
        get: function () {
            return _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.FORCE_GLOBAL_TAG;
        },
        set: function (enable) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.FORCE_GLOBAL_TAG = enable;
            LoggingControl._notifyChange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoggingControl, "globalTag", {
        get: function () {
            return _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.GLOBAL_TAG;
        },
        set: function (tag) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.GLOBAL_TAG = tag;
            LoggingControl._notifyChange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoggingControl, "enableAll", {
        get: function () {
            return _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_VERBOSE
                && _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_DEBUG
                && _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_INFO
                && _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_WARN
                && _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_ERROR;
        },
        set: function (enable) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_VERBOSE = enable;
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_DEBUG = enable;
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_INFO = enable;
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_WARN = enable;
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_ERROR = enable;
            LoggingControl._notifyChange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoggingControl, "enableDebug", {
        get: function () {
            return _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_DEBUG;
        },
        set: function (enable) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_DEBUG = enable;
            LoggingControl._notifyChange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoggingControl, "enableVerbose", {
        get: function () {
            return _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_VERBOSE;
        },
        set: function (enable) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_VERBOSE = enable;
            LoggingControl._notifyChange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoggingControl, "enableInfo", {
        get: function () {
            return _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_INFO;
        },
        set: function (enable) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_INFO = enable;
            LoggingControl._notifyChange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoggingControl, "enableWarn", {
        get: function () {
            return _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_WARN;
        },
        set: function (enable) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_WARN = enable;
            LoggingControl._notifyChange();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoggingControl, "enableError", {
        get: function () {
            return _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_ERROR;
        },
        set: function (enable) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_ERROR = enable;
            LoggingControl._notifyChange();
        },
        enumerable: false,
        configurable: true
    });
    LoggingControl.getConfig = function () {
        return {
            globalTag: _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.GLOBAL_TAG,
            forceGlobalTag: _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.FORCE_GLOBAL_TAG,
            enableVerbose: _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_VERBOSE,
            enableDebug: _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_DEBUG,
            enableInfo: _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_INFO,
            enableWarn: _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_WARN,
            enableError: _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_ERROR,
            enableCallback: _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_CALLBACK
        };
    };
    LoggingControl.applyConfig = function (config) {
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.GLOBAL_TAG = config.globalTag;
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.FORCE_GLOBAL_TAG = config.forceGlobalTag;
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_VERBOSE = config.enableVerbose;
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_DEBUG = config.enableDebug;
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_INFO = config.enableInfo;
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_WARN = config.enableWarn;
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_ERROR = config.enableError;
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_CALLBACK = config.enableCallback;
    };
    LoggingControl._notifyChange = function () {
        var emitter = LoggingControl.emitter;
        if (emitter.listenerCount('change') > 0) {
            var config = LoggingControl.getConfig();
            emitter.emit('change', config);
        }
    };
    LoggingControl.registerListener = function (listener) {
        LoggingControl.emitter.addListener('change', listener);
    };
    LoggingControl.removeListener = function (listener) {
        LoggingControl.emitter.removeListener('change', listener);
    };
    LoggingControl.addLogListener = function (listener) {
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.emitter.addListener('log', listener);
        if (_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.emitter.listenerCount('log') > 0) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_CALLBACK = true;
            LoggingControl._notifyChange();
        }
    };
    LoggingControl.removeLogListener = function (listener) {
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.emitter.removeListener('log', listener);
        if (_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.emitter.listenerCount('log') === 0) {
            _logger_js__WEBPACK_IMPORTED_MODULE_1__.default.ENABLE_CALLBACK = false;
            LoggingControl._notifyChange();
        }
    };
    return LoggingControl;
}());
LoggingControl.emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
/* harmony default export */ __webpack_exports__["default"] = (LoggingControl);


/***/ }),

/***/ "./src/utils/polyfill.js":
/*!*******************************!*\
  !*** ./src/utils/polyfill.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Polyfill = /** @class */ (function () {
    function Polyfill() {
    }
    Polyfill.install = function () {
        // ES6 Object.setPrototypeOf
        Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
            obj.__proto__ = proto;
            return obj;
        };
        // ES6 Object.assign
        Object.assign = Object.assign || function (target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var output = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                if (source !== undefined && source !== null) {
                    for (var key in source) {
                        if (source.hasOwnProperty(key)) {
                            output[key] = source[key];
                        }
                    }
                }
            }
            return output;
        };
        // ES6 Promise (missing support in IE11)
        if (typeof self.Promise !== 'function') {
            __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill();
        }
    };
    return Polyfill;
}());
Polyfill.install();
/* harmony default export */ __webpack_exports__["default"] = (Polyfill);


/***/ }),

/***/ "./src/utils/utf8-conv.js":
/*!********************************!*\
  !*** ./src/utils/utf8-conv.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * This file is derived from C++ project libWinTF8 (https://github.com/m13253/libWinTF8)
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function checkContinuation(uint8array, start, checkLength) {
    var array = uint8array;
    if (start + checkLength < array.length) {
        while (checkLength--) {
            if ((array[++start] & 0xC0) !== 0x80)
                return false;
        }
        return true;
    }
    else {
        return false;
    }
}
function decodeUTF8(uint8array) {
    var out = [];
    var input = uint8array;
    var i = 0;
    var length = uint8array.length;
    while (i < length) {
        if (input[i] < 0x80) {
            out.push(String.fromCharCode(input[i]));
            ++i;
            continue;
        }
        else if (input[i] < 0xC0) {
            // fallthrough
        }
        else if (input[i] < 0xE0) {
            if (checkContinuation(input, i, 1)) {
                var ucs4 = (input[i] & 0x1F) << 6 | (input[i + 1] & 0x3F);
                if (ucs4 >= 0x80) {
                    out.push(String.fromCharCode(ucs4 & 0xFFFF));
                    i += 2;
                    continue;
                }
            }
        }
        else if (input[i] < 0xF0) {
            if (checkContinuation(input, i, 2)) {
                var ucs4 = (input[i] & 0xF) << 12 | (input[i + 1] & 0x3F) << 6 | input[i + 2] & 0x3F;
                if (ucs4 >= 0x800 && (ucs4 & 0xF800) !== 0xD800) {
                    out.push(String.fromCharCode(ucs4 & 0xFFFF));
                    i += 3;
                    continue;
                }
            }
        }
        else if (input[i] < 0xF8) {
            if (checkContinuation(input, i, 3)) {
                var ucs4 = (input[i] & 0x7) << 18 | (input[i + 1] & 0x3F) << 12
                    | (input[i + 2] & 0x3F) << 6 | (input[i + 3] & 0x3F);
                if (ucs4 > 0x10000 && ucs4 < 0x110000) {
                    ucs4 -= 0x10000;
                    out.push(String.fromCharCode((ucs4 >>> 10) | 0xD800));
                    out.push(String.fromCharCode((ucs4 & 0x3FF) | 0xDC00));
                    i += 4;
                    continue;
                }
            }
        }
        out.push(String.fromCharCode(0xFFFD));
        ++i;
    }
    return out.join('');
}
/* harmony default export */ __webpack_exports__["default"] = (decodeUTF8);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module factories are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=flv.js.map