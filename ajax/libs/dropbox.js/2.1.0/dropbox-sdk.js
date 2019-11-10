/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Dropbox = __webpack_require__(13);

	module.exports = Dropbox;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(19);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;

	      var child = new this.constructor(lib$es6$promise$$internal$$noop);

	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }

	      var state = parent._state;

	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }

	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }

	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }

	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;


	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
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
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

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
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,

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
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }

	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._result = new Array(this.length);

	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }

	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }

	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
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

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(9)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), (function() { return this; }()), __webpack_require__(10)(module)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(4);
	var reduce = __webpack_require__(6);
	var requestBase = __webpack_require__(7);
	var isObject = __webpack_require__(3);

	/**
	 * Root reference for iframes.
	 */

	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  root = this;
	}

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Expose `request`.
	 */

	var request = module.exports = __webpack_require__(8).bind(null, Request);

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pushEncodedKeyValuePair(pairs, key, obj[key]);
	        }
	      }
	  return pairs.join('&');
	}

	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */

	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (Array.isArray(val)) {
	    return val.forEach(function(v) {
	      pushEncodedKeyValuePair(pairs, key, v);
	    });
	  }
	  pairs.push(encodeURIComponent(key)
	    + '=' + encodeURIComponent(val));
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */

	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype.parseBody = function(str){
	  var parse = request.parse[this.type];
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype.setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }

	  var type = status / 100 | 0;

	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      // issue #876: return the http status code if the response parsing fails
	      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
	      return self.callback(err);
	    }

	    self.emit('response', res);

	    if (err) {
	      return self.callback(err, res);
	    }

	    if (res.status >= 200 && res.status < 300) {
	      return self.callback(err, res);
	    }

	    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	    new_err.original = err;
	    new_err.response = res;
	    new_err.status = res.status;

	    self.callback(new_err, res);
	  });
	}

	/**
	 * Mixin `Emitter` and `requestBase`.
	 */

	Emitter(Request.prototype);
	for (var key in requestBase) {
	  Request.prototype[key] = requestBase[key];
	}

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */

	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set responseType to `val`. Presently valid responseTypes are 'blob' and 
	 * 'arraybuffer'.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.responseType = function(val){
	  this._responseType = val;
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass, options){
	  if (!options) {
	    options = {
	      type: 'basic'
	    }
	  }

	  switch (options.type) {
	    case 'basic':
	      var str = btoa(user + ':' + pass);
	      this.set('Authorization', 'Basic ' + str);
	    break;

	    case 'auto':
	      this.username = user;
	      this.password = pass;
	    break;
	  }
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  this._getFormData().append(field, file, filename || file.name);
	  return this;
	};

	Request.prototype._getFormData = function(){
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};

	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this._header['content-type'];

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj || isHost(data)) return this;
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * @deprecated
	 */
	Response.prototype.parse = function serialize(fn){
	  if (root.console) {
	    console.warn("Client-side parse() method has been renamed to serialize(). This method is not compatible with superagent v2.0");
	  }
	  this.serialize(fn);
	  return this;
	};

	Response.prototype.serialize = function serialize(fn){
	  this._parser = fn;
	  return this;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;

	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;

	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }

	    if (0 == status) {
	      if (self.timedout) return self.timeoutError();
	      if (self.aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = 'download';
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }

	  // initiate request
	  if (this.username && this.password) {
	    xhr.open(this.method, this.url, true, this.username, this.password);
	  } else {
	    xhr.open(this.method, this.url, true);
	  }

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }

	  // send stuff
	  this.emit('request', this);

	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};


	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	request['del'] = del;
	request['delete'] = del;

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return null != obj && 'object' == typeof obj;
	}

	module.exports = isObject;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

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

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */

	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];

	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(3);

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.clearTimeout = function _clearTimeout(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Force given parser
	 *
	 * Sets the body parser no matter type.
	 *
	 * @param {Function}
	 * @api public
	 */

	exports.parse = function parse(fn){
	  this._parser = fn;
	  return this;
	};

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.timeout = function timeout(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Faux promise support
	 *
	 * @param {Function} fulfill
	 * @param {Function} reject
	 * @return {Request}
	 */

	exports.then = function then(fulfill, reject) {
	  return this.end(function(err, res) {
	    err ? reject(err) : fulfill(res);
	  });
	}

	/**
	 * Allow for extension
	 */

	exports.use = function use(fn) {
	  fn(this);
	  return this;
	}


	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	exports.get = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */

	exports.getHeader = exports.get;

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	exports.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	exports.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	exports.field = function(name, val) {
	  this._getFormData().append(name, val);
	  return this;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	// The node and browser modules expose versions of this with the
	// appropriate constructor function bound as first argument
	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(RequestConstructor, method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new RequestConstructor('GET', method).end(url);
	  }

	  // url first
	  if (2 == arguments.length) {
	    return new RequestConstructor('GET', method);
	  }

	  return new RequestConstructor(method, url);
	}

	module.exports = request;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(2);
	var Promise = __webpack_require__(1).Promise;

	var buildCustomError;
	var downloadRequest;
	var nodeBinaryParser;
	var BASE_URL = 'https://content.dropboxapi.com/2/';

	// Register a handler that will instruct superagent how to parse the response
	request.parse['application/octect-stream'] = function (obj) {
	  return obj;
	};

	// This doesn't match what was spec'd in paper doc yet
	buildCustomError = function (error, response) {
	  return {
	    status: error.status,
	    error: response.text,
	    response: response
	  };
	};

	nodeBinaryParser = function (res, done) {
	  res.text = '';
	  res.setEncoding('binary');
	  res.on('data', function (chunk) { res.text += chunk; });
	  res.on('end', function () {
	    done();
	  });
	};

	downloadRequest = function (path, args, accessToken, selectUser) {
	  var promiseFunction = function (resolve, reject) {
	    var apiRequest;

	    function success(data) {
	      if (resolve) {
	        resolve(data);
	      }
	    }

	    function failure(error) {
	      if (reject) {
	        reject(error);
	      }
	    }

	    function responseHandler(error, response) {
	      var data;
	      if (error) {
	        failure(buildCustomError(error, response));
	      } else {
	        // In the browser, the file is passed as a blob and in node the file is
	        // passed as a string of binary data.
	        data = JSON.parse(response.headers['dropbox-api-result']);
	        if (response.xhr) {
	          data.fileBlob = response.xhr.response;
	        } else {
	          data.fileBinary = response.res.text;
	        }
	        success(data);
	      }
	    }

	    apiRequest = request.post(BASE_URL + path)
	      .set('Authorization', 'Bearer ' + accessToken)
	      .set('Dropbox-API-Arg', JSON.stringify(args))
	      .on('request', function () {
	        if (this.xhr) {
	          this.xhr.responseType = 'blob';
	        }
	      });

	    if (selectUser) {
	      apiRequest = apiRequest.set('Dropbox-API-Select-User', selectUser);
	    }

	    // Apply the node binary parser to the response if executing in node
	    if (typeof window === 'undefined') {
	      apiRequest
	        .buffer(true)
	        .parse(nodeBinaryParser)
	        .end(responseHandler);
	    } else {
	      apiRequest.end(responseHandler);
	    }
	  };

	  return new Promise(promiseFunction);
	};

	module.exports = downloadRequest;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var downloadRequest = __webpack_require__(11);
	var rpcRequest = __webpack_require__(17);
	var uploadRequest = __webpack_require__(18);
	var REQUEST_CONSTANTS = __webpack_require__(15);
	var DropboxBase;

	// Polyfill Object.assign() for older browsers
	__webpack_require__(14);

	/**
	 * @private
	 * @class DropboxBase
	 * @classdesc The main Dropbox SDK class. This contains the methods that are
	 * shared between Dropbox and DropboxTeam classes. It is marked as private so
	 * that it doesn't show up in the docs because it is never used directly.
	 * @arg {Object} options
	 * @arg {String} [options.accessToken] - An access token for making authenticated
	 * requests.
	 * @arg {String} [options.clientId] - The client id fo ryour app. Used to create
	 * authentication URL.
	 * @arg {Number} [options.selectUser] - User is the team access token would like
	 * to act as.
	 */
	DropboxBase = function (options) {
	  options = options || {};
	  this.accessToken = options.accessToken;
	  this.clientId = options.clientId;
	  this.selectUser = options.selectUser;
	};

	/**
	 * Set the access token used to authenticate requests to the API.
	 * @arg {String} accessToken - An access token
	 * @returns {undefined}
	 */
	DropboxBase.prototype.setAccessToken = function (accessToken) {
	  this.accessToken = accessToken;
	};

	/**
	 * Get the access token
	 * @returns {String} Access token
	 */
	DropboxBase.prototype.getAccessToken = function () {
	  return this.accessToken;
	};

	/**
	 * Set the client id, which is used to help gain an access token.
	 * @arg {String} clientId - Your apps client id
	 * @returns {undefined}
	 */
	DropboxBase.prototype.setClientId = function (clientId) {
	  this.clientId = clientId;
	};

	/**
	 * Get the client id
	 * @returns {String} Client id
	 */
	DropboxBase.prototype.getClientId = function () {
	  return this.clientId;
	};

	/**
	 * Get a URL that can be used to authenticate users for the Dropbox API.
	 * @arg {String} redirectUri - A URL to redirect the user to after
	 * authenticating. This must be added to your app through the admin interface.
	 * @arg {String} [state] - State that will be returned in the redirect URL to help
	 * prevent cross site scripting attacks.
	 * @returns {String} Url to send user to for Dropbox API authentication
	 */
	DropboxBase.prototype.getAuthenticationUrl = function (redirectUri, state) {
	  var AUTH_BASE_URL = 'https://www.dropbox.com/oauth2/authorize';
	  var clientId = this.getClientId();
	  var authUrl;
	  if (!clientId) {
	    throw new Error('A client id is required. You can set the client id using .setClientId().');
	  }
	  if (!redirectUri) {
	    throw new Error('A redirect uri is required.');
	  }

	  authUrl = AUTH_BASE_URL + '?response_type=token&client_id=' + clientId;
	  if (redirectUri) {
	    authUrl = authUrl + '&redirect_uri=' + redirectUri;
	  }
	  if (state) {
	    authUrl = authUrl + '&state=' + state;
	  }
	  return authUrl;
	};

	DropboxBase.prototype.request = function (path, args, host, style) {
	  if (style === REQUEST_CONSTANTS.RPC) {
	    return this.rpcRequest(path, args, this.getAccessToken(), this.selectUser);
	  } else if (style === REQUEST_CONSTANTS.DOWNLOAD) {
	    return this.downloadRequest(path, args, this.getAccessToken(), this.selectUser);
	  } else if (style === REQUEST_CONSTANTS.UPLOAD) {
	    return this.uploadRequest(path, args, this.getAccessToken(), this.selectUser);
	  }
	  throw new Error('Invalid request type');
	};

	DropboxBase.prototype.rpcRequest = rpcRequest;

	DropboxBase.prototype.setRpcRequest = function (newRpcRequest) {
	  DropboxBase.prototype.rpcRequest = newRpcRequest;
	};

	DropboxBase.prototype.getRpcRequest = function () {
	  return DropboxBase.prototype.rpcRequest;
	};

	DropboxBase.prototype.downloadRequest = downloadRequest;

	DropboxBase.prototype.setDownloadRequest = function (newDownloadRequest) {
	  DropboxBase.prototype.downloadRequest = newDownloadRequest;
	};

	DropboxBase.prototype.getDownloadRequest = function () {
	  return DropboxBase.prototype.downloadRequest;
	};

	DropboxBase.prototype.uploadRequest = uploadRequest;

	DropboxBase.prototype.setUploadRequest = function (newUploadRequest) {
	  DropboxBase.prototype.uploadRequest = newUploadRequest;
	};

	DropboxBase.prototype.getUploadRequest = function () {
	  return DropboxBase.prototype.uploadRequest;
	};

	module.exports = DropboxBase;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var DropboxBase = __webpack_require__(12);
	var routes = __webpack_require__(16);
	var Dropbox;

	/**
	 * @class Dropbox
	 * @extends DropboxBase
	 * @classdesc The Dropbox SDK class that provides methods to read, write and
	 * create files or folders in a user's Dropbox.
	 * @arg {Object} options
	 * @arg {String} [options.accessToken] - An access token for making authenticated
	 * requests.
	 * @arg {String} [options.clientId] - The client id for your app. Used to create
	 * authentication URL.
	 * @arg {String} [options.selectUser] - Select user is only used by DropboxTeam.
	 * It specifies which user the team access token should be acting as.
	 */
	Dropbox = function (options) {
	  DropboxBase.call(this, options);
	};

	Dropbox.prototype = Object.create(DropboxBase.prototype);

	Dropbox.prototype.constructor = Dropbox;

	// Add the user endpoint methods to the prototype
	Dropbox.prototype = Object.assign(Dropbox.prototype, routes);

	Dropbox.prototype.filesGetSharedLinkFile = function (arg) {
	  return this.request('sharing/get_shared_link_file', arg, 'api', 'download');
	};

	module.exports = Dropbox;


/***/ },
/* 14 */
/***/ function(module, exports) {

	// Polyfill object.assign for legacy browsers
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	if (typeof Object.assign !== 'function') {
	  (function () {
	    Object.assign = function (target) {
	      'use strict';
	      var output;
	      var index;
	      var source;
	      var nextKey;
	      if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	      }

	      output = Object(target);
	      for (index = 1; index < arguments.length; index++) {
	        source = arguments[index];
	        if (source !== undefined && source !== null) {
	          for (nextKey in source) {
	            if (source.hasOwnProperty(nextKey)) {
	              output[nextKey] = source[nextKey];
	            }
	          }
	        }
	      }
	      return output;
	    };
	  }());
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	var REQUEST_CONSTANTS = {
	  RPC: 'rpc',
	  DOWNLOAD: 'download',
	  UPLOAD: 'upload'
	};

	module.exports = REQUEST_CONSTANTS;


/***/ },
/* 16 */
/***/ function(module, exports) {

	// Auto-generated by Stone, do not modify.
	var routes = {};

	/**
	 * Disables the access token used to authenticate the call.
	 * @function Dropbox#authTokenRevoke
	 * @arg {null} arg - The request parameters.
	 * @returns {null}
	 */
	routes.authTokenRevoke = function (arg) {
	  return this.request('auth/token/revoke', arg, 'api', 'rpc');
	};

	/**
	 * Returns the metadata for a file or folder. This is an alpha endpoint
	 * compatible with the properties API. Note: Metadata for the root folder is
	 * unsupported.
	 * @function Dropbox#filesAlphaGetMetadata
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path of a file or folder on Dropbox.
	 * @arg {Boolean} arg.include_media_info - If true, FileMetadata.media_info is
	 * set for photo and video.
	 * @arg {Boolean} arg.include_deleted - If true, DeletedMetadata will be
	 * returned for deleted file or folder, otherwise LookupError.not_found will be
	 * returned.
	 * @arg {Boolean} arg.include_has_explicit_shared_members - If true, the results
	 * will include a flag for each file indicating whether or not  that file has
	 * any explicit members.
	 * @arg {Array|null} arg.include_property_templates - If true,
	 * FileMetadata.property_groups is set for files with custom properties.
	 * @returns {Object}
	 */
	routes.filesAlphaGetMetadata = function (arg) {
	  return this.request('files/alpha/get_metadata', arg, 'api', 'rpc');
	};

	/**
	 * Create a new file with the contents provided in the request. Note that this
	 * endpoint is part of the properties API alpha and is slightly different from
	 * upload. Do not use this to upload a file larger than 150 MB. Instead, create
	 * an upload session with upload_session/start.
	 * @function Dropbox#filesAlphaUpload
	 * @arg {Object} arg - The request parameters.
	 * @arg {Object} arg.contents - The file contents to be uploaded.
	 * @arg {String} arg.path - Path in the user's Dropbox to save the file.
	 * @arg {Object} arg.mode - Selects what to do if the file already exists.
	 * @arg {Boolean} arg.autorename - If there's a conflict, as determined by mode,
	 * have the Dropbox server try to autorename the file to avoid conflict.
	 * @arg {Object|null} arg.client_modified - The value to store as the
	 * client_modified timestamp. Dropbox automatically records the time at which
	 * the file was written to the Dropbox servers. It can also record an additional
	 * timestamp, provided by Dropbox desktop clients, mobile clients, and API apps
	 * of when the file was actually created or modified.
	 * @arg {Boolean} arg.mute - Normally, users are made aware of any file
	 * modifications in their Dropbox account via notifications in the client
	 * software. If true, this tells the clients that this modification shouldn't
	 * result in a user notification.
	 * @arg {Array|null} arg.property_groups - List of custom properties to add to
	 * file.
	 * @returns {Object}
	 */
	routes.filesAlphaUpload = function (arg) {
	  return this.request('files/alpha/upload', arg, 'content', 'upload');
	};

	/**
	 * Copy a file or folder to a different location in the user's Dropbox. If the
	 * source path is a folder all its contents will be copied.
	 * @function Dropbox#filesCopy
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.from_path - Path in the user's Dropbox to be copied or
	 * moved.
	 * @arg {String} arg.to_path - Path in the user's Dropbox that is the
	 * destination.
	 * @returns {Object}
	 */
	routes.filesCopy = function (arg) {
	  return this.request('files/copy', arg, 'api', 'rpc');
	};

	/**
	 * Get a copy reference to a file or folder. This reference string can be used
	 * to save that file or folder to another user's Dropbox by passing it to
	 * copy_reference/save.
	 * @function Dropbox#filesCopyReferenceGet
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to the file or folder you want to get a
	 * copy reference to.
	 * @returns {Object}
	 */
	routes.filesCopyReferenceGet = function (arg) {
	  return this.request('files/copy_reference/get', arg, 'api', 'rpc');
	};

	/**
	 * Save a copy reference returned by copy_reference/get to the user's Dropbox.
	 * @function Dropbox#filesCopyReferenceSave
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.copy_reference - A copy reference returned by
	 * copy_reference/get.
	 * @arg {String} arg.path - Path in the user's Dropbox that is the destination.
	 * @returns {Object}
	 */
	routes.filesCopyReferenceSave = function (arg) {
	  return this.request('files/copy_reference/save', arg, 'api', 'rpc');
	};

	/**
	 * Create a folder at a given path.
	 * @function Dropbox#filesCreateFolder
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - Path in the user's Dropbox to create.
	 * @returns {Object}
	 */
	routes.filesCreateFolder = function (arg) {
	  return this.request('files/create_folder', arg, 'api', 'rpc');
	};

	/**
	 * Delete the file or folder at a given path. If the path is a folder, all its
	 * contents will be deleted too. A successful response indicates that the file
	 * or folder was deleted. The returned metadata will be the corresponding
	 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
	 * DeletedMetadata object.
	 * @function Dropbox#filesDelete
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - Path in the user's Dropbox to delete.
	 * @returns {Object}
	 */
	routes.filesDelete = function (arg) {
	  return this.request('files/delete', arg, 'api', 'rpc');
	};

	/**
	 * Download a file from a user's Dropbox.
	 * @function Dropbox#filesDownload
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path of the file to download.
	 * @arg {String|null} arg.rev - Deprecated. Please specify revision in path
	 * instead
	 * @returns {Object}
	 */
	routes.filesDownload = function (arg) {
	  return this.request('files/download', arg, 'content', 'download');
	};

	/**
	 * Returns the metadata for a file or folder. Note: Metadata for the root folder
	 * is unsupported.
	 * @function Dropbox#filesGetMetadata
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path of a file or folder on Dropbox.
	 * @arg {Boolean} arg.include_media_info - If true, FileMetadata.media_info is
	 * set for photo and video.
	 * @arg {Boolean} arg.include_deleted - If true, DeletedMetadata will be
	 * returned for deleted file or folder, otherwise LookupError.not_found will be
	 * returned.
	 * @arg {Boolean} arg.include_has_explicit_shared_members - If true, the results
	 * will include a flag for each file indicating whether or not  that file has
	 * any explicit members.
	 * @returns {Object}
	 */
	routes.filesGetMetadata = function (arg) {
	  return this.request('files/get_metadata', arg, 'api', 'rpc');
	};

	/**
	 * Get a preview for a file. Currently previews are only generated for the files
	 * with  the following extensions: .doc, .docx, .docm, .ppt, .pps, .ppsx, .ppsm,
	 * .pptx, .pptm,  .xls, .xlsx, .xlsm, .rtf
	 * @function Dropbox#filesGetPreview
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path of the file to preview.
	 * @arg {String|null} arg.rev - Deprecated. Please specify revision in path
	 * instead
	 * @returns {Object}
	 */
	routes.filesGetPreview = function (arg) {
	  return this.request('files/get_preview', arg, 'content', 'download');
	};

	/**
	 * Get a temporary link to stream content of a file. This link will expire in
	 * four hours and afterwards you will get 410 Gone. Content-Type of the link is
	 * determined automatically by the file's mime type.
	 * @function Dropbox#filesGetTemporaryLink
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to the file you want a temporary link to.
	 * @returns {Object}
	 */
	routes.filesGetTemporaryLink = function (arg) {
	  return this.request('files/get_temporary_link', arg, 'api', 'rpc');
	};

	/**
	 * Get a thumbnail for an image. This method currently supports files with the
	 * following file extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos
	 * that are larger than 20MB in size won't be converted to a thumbnail.
	 * @function Dropbox#filesGetThumbnail
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to the image file you want to thumbnail.
	 * @arg {Object} arg.format - The format for the thumbnail image, jpeg (default)
	 * or png. For  images that are photos, jpeg should be preferred, while png is
	 * better for screenshots and digital arts.
	 * @arg {Object} arg.size - The size for the thumbnail image.
	 * @returns {Object}
	 */
	routes.filesGetThumbnail = function (arg) {
	  return this.request('files/get_thumbnail', arg, 'content', 'download');
	};

	/**
	 * Returns the contents of a folder.
	 * @function Dropbox#filesListFolder
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to the folder you want to see the contents
	 * of.
	 * @arg {Boolean} arg.recursive - If true, the list folder operation will be
	 * applied recursively to all subfolders and the response will contain contents
	 * of all subfolders.
	 * @arg {Boolean} arg.include_media_info - If true, FileMetadata.media_info is
	 * set for photo and video.
	 * @arg {Boolean} arg.include_deleted - If true, the results will include
	 * entries for files and folders that used to exist but were deleted.
	 * @arg {Boolean} arg.include_has_explicit_shared_members - If true, the results
	 * will include a flag for each file indicating whether or not  that file has
	 * any explicit members.
	 * @returns {Object}
	 */
	routes.filesListFolder = function (arg) {
	  return this.request('files/list_folder', arg, 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_folder, use this to paginate
	 * through all files and retrieve updates to the folder.
	 * @function Dropbox#filesListFolderContinue
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.cursor - The cursor returned by your last call to
	 * list_folder or list_folder/continue.
	 * @returns {Object}
	 */
	routes.filesListFolderContinue = function (arg) {
	  return this.request('files/list_folder/continue', arg, 'api', 'rpc');
	};

	/**
	 * A way to quickly get a cursor for the folder's state. Unlike list_folder,
	 * list_folder/get_latest_cursor doesn't return any entries. This endpoint is
	 * for app which only needs to know about new files and modifications and
	 * doesn't need to know about files that already exist in Dropbox.
	 * @function Dropbox#filesListFolderGetLatestCursor
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to the folder you want to see the contents
	 * of.
	 * @arg {Boolean} arg.recursive - If true, the list folder operation will be
	 * applied recursively to all subfolders and the response will contain contents
	 * of all subfolders.
	 * @arg {Boolean} arg.include_media_info - If true, FileMetadata.media_info is
	 * set for photo and video.
	 * @arg {Boolean} arg.include_deleted - If true, the results will include
	 * entries for files and folders that used to exist but were deleted.
	 * @arg {Boolean} arg.include_has_explicit_shared_members - If true, the results
	 * will include a flag for each file indicating whether or not  that file has
	 * any explicit members.
	 * @returns {Object}
	 */
	routes.filesListFolderGetLatestCursor = function (arg) {
	  return this.request('files/list_folder/get_latest_cursor', arg, 'api', 'rpc');
	};

	/**
	 * A longpoll endpoint to wait for changes on an account. In conjunction with
	 * list_folder/continue, this call gives you a low-latency way to monitor an
	 * account for file changes. The connection will block until there are changes
	 * available or a timeout occurs. This endpoint is useful mostly for client-side
	 * apps. If you're looking for server-side notifications, check out our webhooks
	 * documentation https://www.dropbox.com/developers/reference/webhooks.
	 * @function Dropbox#filesListFolderLongpoll
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.cursor - A cursor as returned by list_folder or
	 * list_folder/continue. Cursors retrieved by setting
	 * ListFolderArg.include_media_info to true are not supported.
	 * @arg {Number} arg.timeout - A timeout in seconds. The request will block for
	 * at most this length of time, plus up to 90 seconds of random jitter added to
	 * avoid the thundering herd problem. Care should be taken when using this
	 * parameter, as some network infrastructure does not support long timeouts.
	 * @returns {Object}
	 */
	routes.filesListFolderLongpoll = function (arg) {
	  return this.request('files/list_folder/longpoll', arg, 'notify', 'rpc');
	};

	/**
	 * Return revisions of a file
	 * @function Dropbox#filesListRevisions
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to the file you want to see the revisions
	 * of.
	 * @arg {Number} arg.limit - The maximum number of revision entries returned.
	 * @returns {Object}
	 */
	routes.filesListRevisions = function (arg) {
	  return this.request('files/list_revisions', arg, 'api', 'rpc');
	};

	/**
	 * Move a file or folder to a different location in the user's Dropbox. If the
	 * source path is a folder all its contents will be moved.
	 * @function Dropbox#filesMove
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.from_path - Path in the user's Dropbox to be copied or
	 * moved.
	 * @arg {String} arg.to_path - Path in the user's Dropbox that is the
	 * destination.
	 * @returns {Object}
	 */
	routes.filesMove = function (arg) {
	  return this.request('files/move', arg, 'api', 'rpc');
	};

	/**
	 * Permanently delete the file or folder at a given path (see
	 * https://www.dropbox.com/en/help/40). Note: This endpoint is only available
	 * for Dropbox Business apps.
	 * @function Dropbox#filesPermanentlyDelete
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - Path in the user's Dropbox to delete.
	 * @returns {null}
	 */
	routes.filesPermanentlyDelete = function (arg) {
	  return this.request('files/permanently_delete', arg, 'api', 'rpc');
	};

	/**
	 * Add custom properties to a file using a filled property template. See
	 * properties/template/add to create new property templates.
	 * @function Dropbox#filesPropertiesAdd
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - A unique identifier for the file.
	 * @arg {Array} arg.property_groups - Filled custom property templates
	 * associated with a file.
	 * @returns {null}
	 */
	routes.filesPropertiesAdd = function (arg) {
	  return this.request('files/properties/add', arg, 'api', 'rpc');
	};

	/**
	 * Overwrite custom properties from a specified template associated with a file.
	 * @function Dropbox#filesPropertiesOverwrite
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - A unique identifier for the file.
	 * @arg {Array} arg.property_groups - Filled custom property templates
	 * associated with a file.
	 * @returns {null}
	 */
	routes.filesPropertiesOverwrite = function (arg) {
	  return this.request('files/properties/overwrite', arg, 'api', 'rpc');
	};

	/**
	 * Remove all custom properties from a specified template associated with a
	 * file. To remove specific property key value pairs, see properties/update. To
	 * update a property template, see properties/template/update. Property
	 * templates can't be removed once created.
	 * @function Dropbox#filesPropertiesRemove
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - A unique identifier for the file.
	 * @arg {Array} arg.property_template_ids - A list of identifiers for a property
	 * template created by route properties/template/add.
	 * @returns {null}
	 */
	routes.filesPropertiesRemove = function (arg) {
	  return this.request('files/properties/remove', arg, 'api', 'rpc');
	};

	/**
	 * Get the schema for a specified template.
	 * @function Dropbox#filesPropertiesTemplateGet
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.template_id - An identifier for property template added by
	 * route properties/template/add.
	 * @returns {Object}
	 */
	routes.filesPropertiesTemplateGet = function (arg) {
	  return this.request('files/properties/template/get', arg, 'api', 'rpc');
	};

	/**
	 * Get the property template identifiers for a user. To get the schema of each
	 * template use properties/template/get.
	 * @function Dropbox#filesPropertiesTemplateList
	 * @arg {null} arg - The request parameters.
	 * @returns {Object}
	 */
	routes.filesPropertiesTemplateList = function (arg) {
	  return this.request('files/properties/template/list', arg, 'api', 'rpc');
	};

	/**
	 * Add, update or remove custom properties from a specified template associated
	 * with a file. Fields that already exist and not described in the request will
	 * not be modified.
	 * @function Dropbox#filesPropertiesUpdate
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - A unique identifier for the file.
	 * @arg {Array} arg.update_property_groups - Filled custom property templates
	 * associated with a file.
	 * @returns {null}
	 */
	routes.filesPropertiesUpdate = function (arg) {
	  return this.request('files/properties/update', arg, 'api', 'rpc');
	};

	/**
	 * Restore a file to a specific revision
	 * @function Dropbox#filesRestore
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to the file you want to restore.
	 * @arg {String} arg.rev - The revision to restore for the file.
	 * @returns {Object}
	 */
	routes.filesRestore = function (arg) {
	  return this.request('files/restore', arg, 'api', 'rpc');
	};

	/**
	 * Save a specified URL into a file in user's Dropbox. If the given path already
	 * exists, the file will be renamed to avoid the conflict (e.g. myfile (1).txt).
	 * @function Dropbox#filesSaveUrl
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path in Dropbox where the URL will be saved to.
	 * @arg {String} arg.url - The URL to be saved.
	 * @returns {Object}
	 */
	routes.filesSaveUrl = function (arg) {
	  return this.request('files/save_url', arg, 'api', 'rpc');
	};

	/**
	 * Check the status of a save_url job.
	 * @function Dropbox#filesSaveUrlCheckJobStatus
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.async_job_id - Id of the asynchronous job. This is the
	 * value of a response returned from the method that launched the job.
	 * @returns {Object}
	 */
	routes.filesSaveUrlCheckJobStatus = function (arg) {
	  return this.request('files/save_url/check_job_status', arg, 'api', 'rpc');
	};

	/**
	 * Searches for files and folders. Note: Recent changes may not immediately be
	 * reflected in search results due to a short delay in indexing.
	 * @function Dropbox#filesSearch
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path in the user's Dropbox to search. Should
	 * probably be a folder.
	 * @arg {String} arg.query - The string to search for. The search string is
	 * split on spaces into multiple tokens. For file name searching, the last token
	 * is used for prefix matching (i.e. "bat c" matches "bat cave" but not "batman
	 * car").
	 * @arg {Number} arg.start - The starting index within the search results (used
	 * for paging).
	 * @arg {Number} arg.max_results - The maximum number of search results to
	 * return.
	 * @arg {Object} arg.mode - The search mode (filename, filename_and_content, or
	 * deleted_filename). Note that searching file content is only available for
	 * Dropbox Business accounts.
	 * @returns {Object}
	 */
	routes.filesSearch = function (arg) {
	  return this.request('files/search', arg, 'api', 'rpc');
	};

	/**
	 * Create a new file with the contents provided in the request. Do not use this
	 * to upload a file larger than 150 MB. Instead, create an upload session with
	 * upload_session/start.
	 * @function Dropbox#filesUpload
	 * @arg {Object} arg - The request parameters.
	 * @arg {Object} arg.contents - The file contents to be uploaded.
	 * @arg {String} arg.path - Path in the user's Dropbox to save the file.
	 * @arg {Object} arg.mode - Selects what to do if the file already exists.
	 * @arg {Boolean} arg.autorename - If there's a conflict, as determined by mode,
	 * have the Dropbox server try to autorename the file to avoid conflict.
	 * @arg {Object|null} arg.client_modified - The value to store as the
	 * client_modified timestamp. Dropbox automatically records the time at which
	 * the file was written to the Dropbox servers. It can also record an additional
	 * timestamp, provided by Dropbox desktop clients, mobile clients, and API apps
	 * of when the file was actually created or modified.
	 * @arg {Boolean} arg.mute - Normally, users are made aware of any file
	 * modifications in their Dropbox account via notifications in the client
	 * software. If true, this tells the clients that this modification shouldn't
	 * result in a user notification.
	 * @returns {Object}
	 */
	routes.filesUpload = function (arg) {
	  return this.request('files/upload', arg, 'content', 'upload');
	};

	/**
	 * Append more data to an upload session. A single request should not upload
	 * more than 150 MB of file contents.
	 * @function Dropbox#filesUploadSessionAppend
	 * @deprecated
	 * @arg {Object} arg - The request parameters.
	 * @arg {Object} arg.contents - The file contents to be uploaded.
	 * @arg {String} arg.session_id - The upload session ID (returned by
	 * upload_session/start).
	 * @arg {Number} arg.offset - The amount of data that has been uploaded so far.
	 * We use this to make sure upload data isn't lost or duplicated in the event of
	 * a network error.
	 * @returns {null}
	 */
	routes.filesUploadSessionAppend = function (arg) {
	  return this.request('files/upload_session/append', arg, 'content', 'upload');
	};

	/**
	 * Append more data to an upload session. When the parameter close is set, this
	 * call will close the session. A single request should not upload more than 150
	 * MB of file contents.
	 * @function Dropbox#filesUploadSessionAppendV2
	 * @arg {Object} arg - The request parameters.
	 * @arg {Object} arg.contents - The file contents to be uploaded.
	 * @arg {Object} arg.cursor - Contains the upload session ID and the offset.
	 * @arg {Boolean} arg.close - If true, the current session will be closed, at
	 * which point you won't be able to call upload_session/append_v2 anymore with
	 * the current session.
	 * @returns {null}
	 */
	routes.filesUploadSessionAppendV2 = function (arg) {
	  return this.request('files/upload_session/append_v2', arg, 'content', 'upload');
	};

	/**
	 * Finish an upload session and save the uploaded data to the given file path. A
	 * single request should not upload more than 150 MB of file contents.
	 * @function Dropbox#filesUploadSessionFinish
	 * @arg {Object} arg - The request parameters.
	 * @arg {Object} arg.contents - The file contents to be uploaded.
	 * @arg {Object} arg.cursor - Contains the upload session ID and the offset.
	 * @arg {Object} arg.commit - Contains the path and other optional modifiers for
	 * the commit.
	 * @returns {Object}
	 */
	routes.filesUploadSessionFinish = function (arg) {
	  return this.request('files/upload_session/finish', arg, 'content', 'upload');
	};

	/**
	 * Upload sessions allow you to upload a single file using multiple requests.
	 * This call starts a new upload session with the given data.  You can then use
	 * upload_session/append_v2 to add more data and upload_session/finish to save
	 * all the data to a file in Dropbox. A single request should not upload more
	 * than 150 MB of file contents.
	 * @function Dropbox#filesUploadSessionStart
	 * @arg {Object} arg - The request parameters.
	 * @arg {Object} arg.contents - The file contents to be uploaded.
	 * @arg {Boolean} arg.close - If true, the current session will be closed, at
	 * which point you won't be able to call upload_session/append_v2 anymore with
	 * the current session.
	 * @returns {Object}
	 */
	routes.filesUploadSessionStart = function (arg) {
	  return this.request('files/upload_session/start', arg, 'content', 'upload');
	};

	/**
	 * Adds specified members to a file.
	 * @function Dropbox#sharingAddFileMember
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.file - File to which to add members.
	 * @arg {Array} arg.members - Members to add. Note that even an email address is
	 * given, this may result in a user being directy added to the membership if
	 * that email is the user's main account email.
	 * @arg {String|null} arg.custom_message - Message to send to added members in
	 * their invitation.
	 * @arg {Boolean} arg.quiet - Whether added members should be notified via
	 * device notifications of their invitation.
	 * @arg {Object} arg.access_level - AccessLevel union object, describing what
	 * access level we want to give new members.
	 * @arg {Boolean} arg.add_message_as_comment - If the custom message should be
	 * added as a comment on the file.
	 * @returns {Array}
	 */
	routes.sharingAddFileMember = function (arg) {
	  return this.request('sharing/add_file_member', arg, 'api', 'rpc');
	};

	/**
	 * Allows an owner or editor (if the ACL update policy allows) of a shared
	 * folder to add another member. For the new member to get access to all the
	 * functionality for this folder, you will need to call mount_folder on their
	 * behalf. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingAddFolderMember
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @arg {Array} arg.members - The intended list of members to add.  Added
	 * members will receive invites to join the shared folder.
	 * @arg {Boolean} arg.quiet - Whether added members should be notified via email
	 * and device notifications of their invite.
	 * @arg {String|null} arg.custom_message - Optional message to display to added
	 * members in their invitation.
	 * @returns {null}
	 */
	routes.sharingAddFolderMember = function (arg) {
	  return this.request('sharing/add_folder_member', arg, 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job. Apps must have full Dropbox access
	 * to use this endpoint.
	 * @function Dropbox#sharingCheckJobStatus
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.async_job_id - Id of the asynchronous job. This is the
	 * value of a response returned from the method that launched the job.
	 * @returns {Object}
	 */
	routes.sharingCheckJobStatus = function (arg) {
	  return this.request('sharing/check_job_status', arg, 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job for sharing a folder. Apps must
	 * have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingCheckRemoveMemberJobStatus
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.async_job_id - Id of the asynchronous job. This is the
	 * value of a response returned from the method that launched the job.
	 * @returns {Object}
	 */
	routes.sharingCheckRemoveMemberJobStatus = function (arg) {
	  return this.request('sharing/check_remove_member_job_status', arg, 'api', 'rpc');
	};

	/**
	 * Returns the status of an asynchronous job for sharing a folder. Apps must
	 * have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingCheckShareJobStatus
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.async_job_id - Id of the asynchronous job. This is the
	 * value of a response returned from the method that launched the job.
	 * @returns {Object}
	 */
	routes.sharingCheckShareJobStatus = function (arg) {
	  return this.request('sharing/check_share_job_status', arg, 'api', 'rpc');
	};

	/**
	 * Create a shared link. If a shared link already exists for the given path,
	 * that link is returned. Note that in the returned PathLinkMetadata, the
	 * PathLinkMetadata.url field is the shortened URL if
	 * CreateSharedLinkArg.short_url argument is set to true. Previously, it was
	 * technically possible to break a shared link by moving or renaming the
	 * corresponding file or folder. In the future, this will no longer be the case,
	 * so your app shouldn't rely on this behavior. Instead, if your app needs to
	 * revoke a shared link, use revoke_shared_link.
	 * @function Dropbox#sharingCreateSharedLink
	 * @deprecated
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to share.
	 * @arg {Boolean} arg.short_url - Whether to return a shortened URL.
	 * @arg {Object|null} arg.pending_upload - If it's okay to share a path that
	 * does not yet exist, set this to either PendingUploadMode.file or
	 * PendingUploadMode.folder to indicate whether to assume it's a file or folder.
	 * @returns {Object}
	 */
	routes.sharingCreateSharedLink = function (arg) {
	  return this.request('sharing/create_shared_link', arg, 'api', 'rpc');
	};

	/**
	 * Create a shared link with custom settings. If no settings are given then the
	 * default visibility is RequestedVisibility.public (The resolved visibility,
	 * though, may depend on other aspects such as team and shared folder settings).
	 * @function Dropbox#sharingCreateSharedLinkWithSettings
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to be shared by the shared link
	 * @arg {Object|null} arg.settings - The requested settings for the newly
	 * created shared link
	 * @returns {Object}
	 */
	routes.sharingCreateSharedLinkWithSettings = function (arg) {
	  return this.request('sharing/create_shared_link_with_settings', arg, 'api', 'rpc');
	};

	/**
	 * Returns shared file metadata.
	 * @function Dropbox#sharingGetFileMetadata
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.file - The file to query.
	 * @arg {Array|null} arg.actions - File actions to query.
	 * @returns {Object}
	 */
	routes.sharingGetFileMetadata = function (arg) {
	  return this.request('sharing/get_file_metadata', arg, 'api', 'rpc');
	};

	/**
	 * Returns shared file metadata.
	 * @function Dropbox#sharingGetFileMetadataBatch
	 * @arg {Object} arg - The request parameters.
	 * @arg {Array} arg.files - The files to query.
	 * @arg {Array|null} arg.actions - File actions to query.
	 * @returns {Array}
	 */
	routes.sharingGetFileMetadataBatch = function (arg) {
	  return this.request('sharing/get_file_metadata/batch', arg, 'api', 'rpc');
	};

	/**
	 * Returns shared folder metadata by its folder ID. Apps must have full Dropbox
	 * access to use this endpoint.
	 * @function Dropbox#sharingGetFolderMetadata
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @arg {Array|null} arg.actions - This is a list indicating whether the
	 * returned folder data will include a boolean value  FolderPermission.allow
	 * that describes whether the current user can perform the  FolderAction on the
	 * folder.
	 * @returns {Object}
	 */
	routes.sharingGetFolderMetadata = function (arg) {
	  return this.request('sharing/get_folder_metadata', arg, 'api', 'rpc');
	};

	/**
	 * Download the shared link's file from a user's Dropbox.
	 * @function Dropbox#sharingGetSharedLinkFile
	 * @arg {Object} arg - The request parameters.
	 * @returns {Object}
	 */
	routes.sharingGetSharedLinkFile = function (arg) {
	  return this.request('sharing/get_shared_link_file', arg, 'content', 'download');
	};

	/**
	 * Get the shared link's metadata.
	 * @function Dropbox#sharingGetSharedLinkMetadata
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.url - URL of the shared link.
	 * @arg {String|null} arg.path - If the shared link is to a folder, this
	 * parameter can be used to retrieve the metadata for a specific file or
	 * sub-folder in this folder. A relative path should be used.
	 * @arg {String|null} arg.link_password - If the shared link has a password,
	 * this parameter can be used.
	 * @returns {Object}
	 */
	routes.sharingGetSharedLinkMetadata = function (arg) {
	  return this.request('sharing/get_shared_link_metadata', arg, 'api', 'rpc');
	};

	/**
	 * Returns a list of LinkMetadata objects for this user, including collection
	 * links. If no path is given or the path is empty, returns a list of all shared
	 * links for the current user, including collection links. If a non-empty path
	 * is given, returns a list of all shared links that allow access to the given
	 * path.  Collection links are never returned in this case. Note that the url
	 * field in the response is never the shortened URL.
	 * @function Dropbox#sharingGetSharedLinks
	 * @deprecated
	 * @arg {Object} arg - The request parameters.
	 * @arg {String|null} arg.path - See get_shared_links description.
	 * @returns {Object}
	 */
	routes.sharingGetSharedLinks = function (arg) {
	  return this.request('sharing/get_shared_links', arg, 'api', 'rpc');
	};

	/**
	 * Use to obtain the members who have been invited to a file, both inherited and
	 * uninherited members.
	 * @function Dropbox#sharingListFileMembers
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.file - The file for which you want to see members.
	 * @arg {Array|null} arg.actions - The actions for which to return permissions
	 * on a member
	 * @arg {Boolean} arg.include_inherited - Whether to include members who only
	 * have access from a parent shared folder.
	 * @arg {Number} arg.limit - Number of members to return max per query. Defaults
	 * to 100 if no limit is specified.
	 * @returns {Object}
	 */
	routes.sharingListFileMembers = function (arg) {
	  return this.request('sharing/list_file_members', arg, 'api', 'rpc');
	};

	/**
	 * Get members of multiple files at once. The arguments to this route are more
	 * limited, and the limit on query result size per file is more strict. To
	 * customize the results more, use the individual file endpoint. Inherited users
	 * are not included in the result, and permissions are not returned for this
	 * endpoint.
	 * @function Dropbox#sharingListFileMembersBatch
	 * @arg {Object} arg - The request parameters.
	 * @arg {Array} arg.files - Files for which to return members.
	 * @arg {Number} arg.limit - Number of members to return max per query. Defaults
	 * to 10 if no limit is specified.
	 * @returns {Array}
	 */
	routes.sharingListFileMembersBatch = function (arg) {
	  return this.request('sharing/list_file_members/batch', arg, 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_file_members or
	 * list_file_members/batch, use this to paginate through all shared file
	 * members.
	 * @function Dropbox#sharingListFileMembersContinue
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.cursor - The cursor returned by your last call to
	 * list_file_members, list_file_members/continue, or list_file_members/batch.
	 * @returns {Object}
	 */
	routes.sharingListFileMembersContinue = function (arg) {
	  return this.request('sharing/list_file_members/continue', arg, 'api', 'rpc');
	};

	/**
	 * Returns shared folder membership by its folder ID. Apps must have full
	 * Dropbox access to use this endpoint.
	 * @function Dropbox#sharingListFolderMembers
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @arg {Array|null} arg.actions - This is a list indicating whether each
	 * returned member will include a boolean value MemberPermission.allow that
	 * describes whether the current user can perform the MemberAction on the
	 * member.
	 * @arg {Number} arg.limit - The maximum number of results that include members,
	 * groups and invitees to return per request.
	 * @returns {Object}
	 */
	routes.sharingListFolderMembers = function (arg) {
	  return this.request('sharing/list_folder_members', arg, 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_folder_members, use this to
	 * paginate through all shared folder members. Apps must have full Dropbox
	 * access to use this endpoint.
	 * @function Dropbox#sharingListFolderMembersContinue
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.cursor - The cursor returned by your last call to
	 * list_folder_members or list_folder_members/continue.
	 * @returns {Object}
	 */
	routes.sharingListFolderMembersContinue = function (arg) {
	  return this.request('sharing/list_folder_members/continue', arg, 'api', 'rpc');
	};

	/**
	 * Return the list of all shared folders the current user has access to. Apps
	 * must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingListFolders
	 * @arg {Object} arg - The request parameters.
	 * @arg {Number} arg.limit - The maximum number of results to return per
	 * request.
	 * @arg {Array|null} arg.actions - This is a list indicating whether each
	 * returned folder data entry will include a boolean field
	 * FolderPermission.allow that describes whether the current user can perform
	 * the `FolderAction` on the folder.
	 * @returns {Object}
	 */
	routes.sharingListFolders = function (arg) {
	  return this.request('sharing/list_folders', arg, 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_folders, use this to paginate
	 * through all shared folders. The cursor must come from a previous call to
	 * list_folders or list_folders/continue. Apps must have full Dropbox access to
	 * use this endpoint.
	 * @function Dropbox#sharingListFoldersContinue
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.cursor - The cursor returned by the previous API call
	 * specified in the endpoint description.
	 * @returns {Object}
	 */
	routes.sharingListFoldersContinue = function (arg) {
	  return this.request('sharing/list_folders/continue', arg, 'api', 'rpc');
	};

	/**
	 * Return the list of all shared folders the current user can mount or unmount.
	 * Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingListMountableFolders
	 * @arg {Object} arg - The request parameters.
	 * @arg {Number} arg.limit - The maximum number of results to return per
	 * request.
	 * @arg {Array|null} arg.actions - This is a list indicating whether each
	 * returned folder data entry will include a boolean field
	 * FolderPermission.allow that describes whether the current user can perform
	 * the `FolderAction` on the folder.
	 * @returns {Object}
	 */
	routes.sharingListMountableFolders = function (arg) {
	  return this.request('sharing/list_mountable_folders', arg, 'api', 'rpc');
	};

	/**
	 * Once a cursor has been retrieved from list_mountable_folders, use this to
	 * paginate through all mountable shared folders. The cursor must come from a
	 * previous call to list_mountable_folders or list_mountable_folders/continue.
	 * Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingListMountableFoldersContinue
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.cursor - The cursor returned by the previous API call
	 * specified in the endpoint description.
	 * @returns {Object}
	 */
	routes.sharingListMountableFoldersContinue = function (arg) {
	  return this.request('sharing/list_mountable_folders/continue', arg, 'api', 'rpc');
	};

	/**
	 * Returns a list of all files shared with current user.  Does not include files
	 * the user has received via shared folders, and does  not include unclaimed
	 * invitations.
	 * @function Dropbox#sharingListReceivedFiles
	 * @arg {Object} arg - The request parameters.
	 * @arg {Number} arg.limit - Number of files to return max per query. Defaults
	 * to 100 if no limit is specified.
	 * @arg {Array|null} arg.actions - File actions to query.
	 * @returns {Object}
	 */
	routes.sharingListReceivedFiles = function (arg) {
	  return this.request('sharing/list_received_files', arg, 'api', 'rpc');
	};

	/**
	 * Get more results with a cursor from list_received_files.
	 * @function Dropbox#sharingListReceivedFilesContinue
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.cursor - Cursor in ListFilesResult.cursor
	 * @returns {Object}
	 */
	routes.sharingListReceivedFilesContinue = function (arg) {
	  return this.request('sharing/list_received_files/continue', arg, 'api', 'rpc');
	};

	/**
	 * List shared links of this user. If no path is given or the path is empty,
	 * returns a list of all shared links for the current user. If a non-empty path
	 * is given, returns a list of all shared links that allow access to the given
	 * path - direct links to the given path and links to parent folders of the
	 * given path. Links to parent folders can be suppressed by setting direct_only
	 * to true.
	 * @function Dropbox#sharingListSharedLinks
	 * @arg {Object} arg - The request parameters.
	 * @arg {String|null} arg.path - See list_shared_links description.
	 * @arg {String|null} arg.cursor - The cursor returned by your last call to
	 * list_shared_links.
	 * @arg {Boolean|null} arg.direct_only - See list_shared_links description.
	 * @returns {Object}
	 */
	routes.sharingListSharedLinks = function (arg) {
	  return this.request('sharing/list_shared_links', arg, 'api', 'rpc');
	};

	/**
	 * Modify the shared link's settings. If the requested visibility conflict with
	 * the shared links policy of the team or the shared folder (in case the linked
	 * file is part of a shared folder) then the LinkPermissions.resolved_visibility
	 * of the returned SharedLinkMetadata will reflect the actual visibility of the
	 * shared link and the LinkPermissions.requested_visibility will reflect the
	 * requested visibility.
	 * @function Dropbox#sharingModifySharedLinkSettings
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.url - URL of the shared link to change its settings
	 * @arg {Object} arg.settings - Set of settings for the shared link.
	 * @arg {Boolean} arg.remove_expiration - If set to true, removes the expiration
	 * of the shared link.
	 * @returns {Object}
	 */
	routes.sharingModifySharedLinkSettings = function (arg) {
	  return this.request('sharing/modify_shared_link_settings', arg, 'api', 'rpc');
	};

	/**
	 * The current user mounts the designated folder. Mount a shared folder for a
	 * user after they have been added as a member. Once mounted, the shared folder
	 * will appear in their Dropbox. Apps must have full Dropbox access to use this
	 * endpoint.
	 * @function Dropbox#sharingMountFolder
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID of the shared folder to mount.
	 * @returns {Object}
	 */
	routes.sharingMountFolder = function (arg) {
	  return this.request('sharing/mount_folder', arg, 'api', 'rpc');
	};

	/**
	 * The current user relinquishes their membership in the designated file. Note
	 * that the current user may still have inherited access to this file through
	 * the parent folder. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingRelinquishFileMembership
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.file - The path or id for the file.
	 * @returns {null}
	 */
	routes.sharingRelinquishFileMembership = function (arg) {
	  return this.request('sharing/relinquish_file_membership', arg, 'api', 'rpc');
	};

	/**
	 * The current user relinquishes their membership in the designated shared
	 * folder and will no longer have access to the folder.  A folder owner cannot
	 * relinquish membership in their own folder. This will run synchronously if
	 * leave_a_copy is false, and asynchronously if leave_a_copy is true. Apps must
	 * have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingRelinquishFolderMembership
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @arg {Boolean} arg.leave_a_copy - Keep a copy of the folder's contents upon
	 * relinquishing membership.
	 * @returns {Object}
	 */
	routes.sharingRelinquishFolderMembership = function (arg) {
	  return this.request('sharing/relinquish_folder_membership', arg, 'api', 'rpc');
	};

	/**
	 * Identical to remove_file_member_2 but with less information returned.
	 * @function Dropbox#sharingRemoveFileMember
	 * @deprecated
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.file - File from which to remove members.
	 * @arg {Object} arg.member - Member to remove from this file. Note that even if
	 * an email is specified, it may result in the removal of a user (not an
	 * invitee) if the user's main account corresponds to that email address.
	 * @returns {Object}
	 */
	routes.sharingRemoveFileMember = function (arg) {
	  return this.request('sharing/remove_file_member', arg, 'api', 'rpc');
	};

	/**
	 * Removes a specified member from the file.
	 * @function Dropbox#sharingRemoveFileMember2
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.file - File from which to remove members.
	 * @arg {Object} arg.member - Member to remove from this file. Note that even if
	 * an email is specified, it may result in the removal of a user (not an
	 * invitee) if the user's main account corresponds to that email address.
	 * @returns {Object}
	 */
	routes.sharingRemoveFileMember2 = function (arg) {
	  return this.request('sharing/remove_file_member_2', arg, 'api', 'rpc');
	};

	/**
	 * Allows an owner or editor (if the ACL update policy allows) of a shared
	 * folder to remove another member. Apps must have full Dropbox access to use
	 * this endpoint.
	 * @function Dropbox#sharingRemoveFolderMember
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @arg {Object} arg.member - The member to remove from the folder.
	 * @arg {Boolean} arg.leave_a_copy - If true, the removed user will keep their
	 * copy of the folder after it's unshared, assuming it was mounted. Otherwise,
	 * it will be removed from their Dropbox. Also, this must be set to false when
	 * kicking a group.
	 * @returns {Object}
	 */
	routes.sharingRemoveFolderMember = function (arg) {
	  return this.request('sharing/remove_folder_member', arg, 'api', 'rpc');
	};

	/**
	 * Revoke a shared link. Note that even after revoking a shared link to a file,
	 * the file may be accessible if there are shared links leading to any of the
	 * file parent folders. To list all shared links that enable access to a
	 * specific file, you can use the list_shared_links with the file as the
	 * ListSharedLinksArg.path argument.
	 * @function Dropbox#sharingRevokeSharedLink
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.url - URL of the shared link.
	 * @returns {null}
	 */
	routes.sharingRevokeSharedLink = function (arg) {
	  return this.request('sharing/revoke_shared_link', arg, 'api', 'rpc');
	};

	/**
	 * Share a folder with collaborators. Most sharing will be completed
	 * synchronously. Large folders will be completed asynchronously. To make
	 * testing the async case repeatable, set `ShareFolderArg.force_async`. If a
	 * ShareFolderLaunch.async_job_id is returned, you'll need to call
	 * check_share_job_status until the action completes to get the metadata for the
	 * folder. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingShareFolder
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.path - The path to the folder to share. If it does not
	 * exist, then a new one is created.
	 * @arg {Object} arg.member_policy - Who can be a member of this shared folder.
	 * Only applicable if the current user is on a team.
	 * @arg {Object} arg.acl_update_policy - Who can add and remove members of this
	 * shared folder.
	 * @arg {Object} arg.shared_link_policy - The policy to apply to shared links
	 * created for content inside this shared folder.  The current user must be on a
	 * team to set this policy to SharedLinkPolicy.members.
	 * @arg {Boolean} arg.force_async - Whether to force the share to happen
	 * asynchronously.
	 * @returns {Object}
	 */
	routes.sharingShareFolder = function (arg) {
	  return this.request('sharing/share_folder', arg, 'api', 'rpc');
	};

	/**
	 * Transfer ownership of a shared folder to a member of the shared folder. User
	 * must have AccessLevel.owner access to the shared folder to perform a
	 * transfer. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingTransferFolder
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @arg {String} arg.to_dropbox_id - A account or team member ID to transfer
	 * ownership to.
	 * @returns {null}
	 */
	routes.sharingTransferFolder = function (arg) {
	  return this.request('sharing/transfer_folder', arg, 'api', 'rpc');
	};

	/**
	 * The current user unmounts the designated folder. They can re-mount the folder
	 * at a later time using mount_folder. Apps must have full Dropbox access to use
	 * this endpoint.
	 * @function Dropbox#sharingUnmountFolder
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @returns {null}
	 */
	routes.sharingUnmountFolder = function (arg) {
	  return this.request('sharing/unmount_folder', arg, 'api', 'rpc');
	};

	/**
	 * Remove all members from this file. Does not remove inherited members.
	 * @function Dropbox#sharingUnshareFile
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.file - The file to unshare.
	 * @returns {null}
	 */
	routes.sharingUnshareFile = function (arg) {
	  return this.request('sharing/unshare_file', arg, 'api', 'rpc');
	};

	/**
	 * Allows a shared folder owner to unshare the folder. You'll need to call
	 * check_job_status to determine if the action has completed successfully. Apps
	 * must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingUnshareFolder
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @arg {Boolean} arg.leave_a_copy - If true, members of this shared folder will
	 * get a copy of this folder after it's unshared. Otherwise, it will be removed
	 * from their Dropbox. The current user, who is an owner, will always retain
	 * their copy.
	 * @returns {Object}
	 */
	routes.sharingUnshareFolder = function (arg) {
	  return this.request('sharing/unshare_folder', arg, 'api', 'rpc');
	};

	/**
	 * Allows an owner or editor of a shared folder to update another member's
	 * permissions. Apps must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingUpdateFolderMember
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @arg {Object} arg.member - The member of the shared folder to update.  Only
	 * the MemberSelector.dropbox_id may be set at this time.
	 * @arg {Object} arg.access_level - The new access level for member.
	 * AccessLevel.owner is disallowed.
	 * @returns {Object}
	 */
	routes.sharingUpdateFolderMember = function (arg) {
	  return this.request('sharing/update_folder_member', arg, 'api', 'rpc');
	};

	/**
	 * Update the sharing policies for a shared folder. User must have
	 * AccessLevel.owner access to the shared folder to update its policies. Apps
	 * must have full Dropbox access to use this endpoint.
	 * @function Dropbox#sharingUpdateFolderPolicy
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.shared_folder_id - The ID for the shared folder.
	 * @arg {Object|null} arg.member_policy - Who can be a member of this shared
	 * folder. Only applicable if the current user is on a team.
	 * @arg {Object|null} arg.acl_update_policy - Who can add and remove members of
	 * this shared folder.
	 * @arg {Object|null} arg.shared_link_policy - The policy to apply to shared
	 * links created for content inside this shared folder. The current user must be
	 * on a team to set this policy to SharedLinkPolicy.members.
	 * @returns {Object}
	 */
	routes.sharingUpdateFolderPolicy = function (arg) {
	  return this.request('sharing/update_folder_policy', arg, 'api', 'rpc');
	};

	/**
	 * Get information about a user's account.
	 * @function Dropbox#usersGetAccount
	 * @arg {Object} arg - The request parameters.
	 * @arg {String} arg.account_id - A user's account identifier.
	 * @returns {Object}
	 */
	routes.usersGetAccount = function (arg) {
	  return this.request('users/get_account', arg, 'api', 'rpc');
	};

	/**
	 * Get information about multiple user accounts.  At most 300 accounts may be
	 * queried per request.
	 * @function Dropbox#usersGetAccountBatch
	 * @arg {Object} arg - The request parameters.
	 * @arg {Array} arg.account_ids - List of user account identifiers.  Should not
	 * contain any duplicate account IDs.
	 * @returns {Object}
	 */
	routes.usersGetAccountBatch = function (arg) {
	  return this.request('users/get_account_batch', arg, 'api', 'rpc');
	};

	/**
	 * Get information about the current user's account.
	 * @function Dropbox#usersGetCurrentAccount
	 * @arg {null} arg - The request parameters.
	 * @returns {Object}
	 */
	routes.usersGetCurrentAccount = function (arg) {
	  return this.request('users/get_current_account', arg, 'api', 'rpc');
	};

	/**
	 * Get the space usage information for the current user's account.
	 * @function Dropbox#usersGetSpaceUsage
	 * @arg {null} arg - The request parameters.
	 * @returns {Object}
	 */
	routes.usersGetSpaceUsage = function (arg) {
	  return this.request('users/get_space_usage', arg, 'api', 'rpc');
	};

	module.exports = routes;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(2);
	var Promise = __webpack_require__(1).Promise;

	var BASE_URL = 'https://api.dropboxapi.com/2/';

	// This doesn't match what was spec'd in paper doc yet
	var buildCustomError = function (error, response) {
	  return {
	    status: error.status,
	    error: response.text,
	    response: response
	  };
	};

	var rpcRequest = function (path, body, accessToken, selectUser) {
	  var promiseFunction = function (resolve, reject) {
	    var apiRequest;

	    function success(data) {
	      if (resolve) {
	        resolve(data);
	      }
	    }

	    function failure(error) {
	      if (reject) {
	        reject(error);
	      }
	    }

	    function responseHandler(error, response) {
	      if (error) {
	        failure(buildCustomError(error, response));
	      } else {
	        success(response.body);
	      }
	    }

	    // The API expects null to be passed for endpoints that dont accept any
	    // parameters
	    if (!body) {
	      body = null;
	    }

	    apiRequest = request.post(BASE_URL + path)
	      .type('application/json')
	      .set('Authorization', 'Bearer ' + accessToken);

	    if (selectUser) {
	      apiRequest = apiRequest.set('Dropbox-API-Select-User', selectUser);
	    }

	    apiRequest.send(body)
	      .end(responseHandler);
	  };

	  return new Promise(promiseFunction);
	};

	module.exports = rpcRequest;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(2);
	var Promise = __webpack_require__(1).Promise;

	var BASE_URL = 'https://content.dropboxapi.com/2/';

	// This doesn't match what was spec'd in paper doc yet
	var buildCustomError = function (error, response) {
	  return {
	    status: error.status,
	    error: response.text,
	    response: response
	  };
	};

	var uploadRequest = function (path, args, accessToken, selectUser) {
	  var promiseFunction = function (resolve, reject) {
	    var apiRequest;

	    // Since args.contents is sent as the body of the request and not added to
	    // the url, it needs to be remove it from args.
	    var contents = args.contents;
	    delete args.contents;

	    function success(data) {
	      if (resolve) {
	        resolve(data);
	      }
	    }

	    function failure(error) {
	      if (reject) {
	        reject(error);
	      }
	    }

	    function responseHandler(error, response) {
	      if (error) {
	        failure(buildCustomError(error, response));
	      } else {
	        success(response.body);
	      }
	    }

	    apiRequest = request.post(BASE_URL + path)
	      .type('application/octet-stream')
	      .set('Authorization', 'Bearer ' + accessToken)
	      .set('Dropbox-API-Arg', JSON.stringify(args));

	    if (selectUser) {
	      apiRequest = apiRequest.set('Dropbox-API-Select-User', selectUser);
	    }

	    apiRequest
	      .send(contents)
	      .end(responseHandler);
	  };

	  return new Promise(promiseFunction);
	};

	module.exports = uploadRequest;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ]);