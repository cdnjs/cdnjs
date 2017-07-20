/*
Copyright 2014, modulex-promise@1.1.2
MIT Licensed
build time: Thu, 16 Oct 2014 06:36:42 GMT
*/
modulex.add("promise", [], function(require, exports, module) {

/*
combined modules:
promise
*/
var _promise_;
_promise_ = function (exports) {
  /**
   * @ignore
   * implement Promise specification by KISSY
   * @author yiminghe@gmail.com
   */
  var PROMISE_VALUE = '__promise_value';
  var PROMISE_STATUS = '__promise_status';
  var PROMISE_PROGRESS_LISTENERS = '__promise_progress_listeners';
  var PROMISE_PENDINGS = '__promise_pendings';
  var PENDING = 'Pending';
  var FULFILLED = 'Fulfilled';
  var REJECTED = 'Rejected';
  function each(arr, fn) {
    if (arr) {
      for (var i = 0, l = arr.length; i < l; i++) {
        if (fn(arr[i], i) === false) {
          break;
        }
      }
    }
  }
  function mix(r, s) {
    for (var p in s) {
      r[p] = s[p];
    }
  }
  function isThenable(v) {
    return v && typeof v.then === 'function';
  }
  /*
   two effects:
   1. call fulfilled with immediate value
   2. push fulfilled in right promise
   */
  function promiseWhen(promise, fulfilled, rejected) {
    // simply call rejected
    if (promise instanceof Reject) {
      // if there is a rejected , should always has! see when()
      rejected.call(promise, promise.reason);
    } else if (!(promise instanceof Promise) && isThenable(promise)) {
      // flatten
      promise.then(fulfilled, rejected);
    } else {
      var v = promise[PROMISE_VALUE];
      if (isThenable(v) || v instanceof Reject) {
        // rejected or nested promise
        promiseWhen(v, fulfilled, rejected);
        return;
      }
      if (promise[PROMISE_STATUS] === PENDING) {
        // flatten
        promise[PROMISE_PENDINGS].push([
          fulfilled,
          rejected
        ]);
      } else {
        // fulfilled value
        // normal value represents ok
        // need return user's return value
        // if return promise then forward
        if (fulfilled) {
          fulfilled.call(promise, v);
        }
      }
    }
  }
  /**
   * @class Defer
   * Defer constructor For KISSY, implement Promise specification.
   */
  function Defer(promise) {
    var self = this;
    if (!(self instanceof Defer)) {
      return new Defer(promise);
    }
    // http://en.wikipedia.org/wiki/Object-capability_model
    // principal of least authority
    /**
     * defer object's promise
     * @type {Promise}
     */
    self.promise = promise || new Promise();
    self.promise.defer = self;
  }
  Defer.prototype = {
    constructor: Defer,
    /**
     * fulfill defer object's promise
     * note: can only be called once
     * @param value defer object's value
     * @return {Promise} defer object's promise
     */
    resolve: function (value) {
      var promise = this.promise;
      if (promise[PROMISE_STATUS] !== PENDING) {
        return null;
      }
      promise[PROMISE_STATUS] = value instanceof Reject ? REJECTED : FULFILLED;
      // set current promise 's resolved value
      // maybe a promise or instant value
      promise[PROMISE_VALUE] = value;
      var pendings = promise[PROMISE_PENDINGS];
      each(pendings, function (p) {
        promiseWhen(promise, p[0], p[1]);
      });
      promise[PROMISE_PENDINGS] = [];
      promise[PROMISE_PROGRESS_LISTENERS] = [];
      return this.promise;
    },
    /**
     * reject defer object's promise
     * @param reason
     * @return {Promise} defer object's promise
     */
    reject: function (reason) {
      return this.resolve(new Reject(reason));
    },
    /**
     * notify promise 's progress listeners
     * @param message
     */
    notify: function (message) {
      if (this.promise[PROMISE_STATUS] !== PENDING) {
        return null;
      }
      each(this.promise[PROMISE_PROGRESS_LISTENERS], function (listener) {
        listener(message);
      });
    }
  };
  function isPromise(obj) {
    return obj && obj instanceof Promise;
  }
  function bind(fn, context) {
    return function () {
      return fn.apply(context, arguments);
    };
  }
  /**
   * @class Promise
   * Promise constructor.
   * This class should not be instantiated manually.
   * Instances will be created and returned as needed by {@link Defer#promise}
   * @param [v] promise 's resolved value
   */
  function Promise(v) {
    var self = this;
    self[PROMISE_PENDINGS] = [];
    self[PROMISE_PROGRESS_LISTENERS] = [];
    if (!v) {
      self[PROMISE_STATUS] = PENDING;
    } else if (typeof v === 'function') {
      self[PROMISE_STATUS] = PENDING;
      var defer = new Defer(self);
      var resolve = bind(defer.resolve, defer);
      var reject = bind(defer.reject, defer);
      try {
        v(resolve, reject);
      } catch (e) {
        console.error(e.stack || e);
        reject(e);
      }
    } else {
      self[PROMISE_STATUS] = FULFILLED;
    }
  }
  Promise.prototype = {
    constructor: Promise,
    /**
     * register callbacks when this promise object is resolved
     * @param {Function} fulfilled called when resolved successfully,pass a resolved value to this function and
     * return a value (could be promise object) for the new promise 's resolved value.
     * @param {Function} [rejected] called when error occurs,pass error reason to this function and
     * return a new reason for the new promise 's error reason
     * @param {Function} [progressListener] progress listener
     * @return {Promise} a new promise object
     */
    then: function (fulfilled, rejected, progressListener) {
      if (progressListener) {
        this.progress(progressListener);
      }
      return when(this, fulfilled, rejected);
    },
    /**
     * call progress listener when defer.notify is called
     * @param {Function} [progressListener] progress listener
     */
    progress: function (progressListener) {
      var self = this, listeners = self[PROMISE_PROGRESS_LISTENERS];
      if (self[PROMISE_STATUS] !== PENDING) {
        return self;
      }
      if (!listeners) {
        listeners = self[PROMISE_PROGRESS_LISTENERS] = [];
      }
      listeners.push(progressListener);
      return self;
    },
    /**
     * call rejected callback when this promise object is rejected
     * @param {Function} rejected called with rejected reason
     * @return {Promise} a new promise object
     */
    fail: function (rejected) {
      return this.then(0, rejected);
    },
    /**
     * call callback when this promise object is rejected or resolved
     * @param {Function} callback the second parameter is
     * true when resolved and false when rejected
     * @@return {Promise} a new promise object
     */
    fin: function (callback) {
      return this.then(function (value) {
        return callback(value, true);
      }, function (reason) {
        return callback(reason, false);
      });
    },
    /**
     * register callbacks when this promise object is resolved,
     * and throw error at next event loop if promise
     * (current instance if no fulfilled and rejected parameter or
     * new instance caused by call this.then(fulfilled, rejected))
     * fails.
     * @param {Function} [fulfilled] called when resolved successfully,pass a resolved value to this function and
     * return a value (could be promise object) for the new promise 's resolved value.
     * @param {Function} [rejected] called when error occurs,pass error reason to this function and
     * return a new reason for the new promise 's error reason
     */
    done: function (fulfilled, rejected) {
      var self = this, onUnhandledError = function (e) {
          setTimeout(function () {
            throw e;
          }, 0);
        }, promiseToHandle = fulfilled || rejected ? self.then(fulfilled, rejected) : self;
      promiseToHandle.fail(onUnhandledError);
    },
    /**
     * whether the given object is a resolved promise
     * if it is resolved with another promise,
     * then that promise needs to be resolved as well.
     * @member Promise
     */
    isResolved: function () {
      return isResolved(this);
    },
    /**
     * whether the given object is a rejected promise
     */
    isRejected: function () {
      return isRejected(this);
    }
  };
  /**
   * Sugar for promise.then(undefined, onRejected)
   * @method catch
   * @member {Promise}
   */
  Promise.prototype['catch'] = Promise.prototype.fail;
  /**
   * Reject promise
   * @param {String|Promise.Reject} reason reject reason
   * @class Promise.Reject
   * @extend Promise
   * @private
   */
  function Reject(reason) {
    if (reason instanceof Reject) {
      return reason;
    }
    this.reason = reason;
  }
  // wrap for promiseWhen
  function when(value, fulfilled, rejected) {
    var defer = new Defer(), done = 0;
    // wrap user's callback to catch exception
    function _fulfilled(value) {
      try {
        return fulfilled ? fulfilled.call(this, value) : // propagate
        value;
      } catch (e) {
        // can not use logger.error
        // must expose to user
        // print stack info for firefox/chrome
        console.error(e.stack || e);
        return new Reject(e);
      }
    }
    function _rejected(reason) {
      try {
        return rejected ? // error recovery
        rejected.call(this, reason) : // propagate
        new Reject(reason);
      } catch (e) {
        // print stack info for firefox/chrome
        console.error(e.stack || e);
        return new Reject(e);
      }
    }
    function finalFulfill(value) {
      if (done) {
        return;
      }
      done = 1;
      defer.resolve(_fulfilled.call(this, value));
    }
    if (isThenable(value)) {
      promiseWhen(value, finalFulfill, function (reason) {
        if (done) {
          return;
        }
        done = 1;
        // _reject may return non-Reject object for error recovery
        defer.resolve(_rejected.call(this, reason));
      });
    } else {
      finalFulfill(value);
    }
    // chained and leveled
    // wait for value's resolve
    return defer.promise;
  }
  function isResolved(obj) {
    // exclude Reject at first
    return obj && obj[PROMISE_STATUS] === FULFILLED;
  }
  function isRejected(obj) {
    // implicit by obj[PROMISE_VALUE]
    // isPromise(obj) &&
    return obj && obj[PROMISE_STATUS] === REJECTED;
  }
  Promise.Defer = Defer;
  mix(Promise, {
    version: '1.1.2',
    /**
     * register callbacks when obj as a promise is resolved
     * or call fulfilled callback directly when obj is not a promise object
     * @param {Promise|*} obj a promise object or value of any type
     * @param {Function} fulfilled called when obj resolved successfully,pass a resolved value to this function and
     * return a value (could be promise object) for the new promise 's resolved value.
     * @param {Function} [rejected] called when error occurs in obj,pass error reason to this function and
     * return a new reason for the new promise 's error reason
     * @return {Promise} a new promise object
     *
     * for example:
     *      @example
     *      function check(p) {
             *          Promise.when(p, function(v){
             *              alert(v === 1);
             *          });
             *      }
     *
     *      var defer = S.Defer();
     *      defer.resolve(1);
     *
     *      check(1); // => alert(true)
     *
     *      check(defer.promise); //=> alert(true);
     *
     * @static
     * @method
     * @member Promise
     */
    when: when,
    /**
     * Returns promise (only if promise.constructor == Promise)
     * or
     * Make a promise that fulfills to obj.
     */
    cast: function (obj) {
      if (obj instanceof Promise) {
        return obj;
      }
      return new Promise(function (resolve) {
        resolve(obj);
      });
    },
    /**
     * Make a promise that fulfills to obj.
     */
    resolve: function (obj) {
      return new Promise(function (resolve) {
        resolve(obj);
      });
    },
    /**
     * Make a promise that rejects to obj. For consistency and debugging (e.g. stack traces), obj should be an instanceof Error.
     * @param reason
     * @returns {Promise.Reject}
     */
    reject: function (reason) {
      return new Promise(function (resolve, reject) {
        reject(reason);
      });
    },
    /**
     * whether the given object is a promise
     * @method
     * @static
     * @param obj the tested object
     * @return {Boolean}
     * @member Promise
     */
    isPromise: isPromise,
    /**
     * whether the given object is a resolved promise
     * @method
     * @static
     * @param obj the tested object
     * @return {Boolean}
     * @member Promise
     */
    isResolved: isResolved,
    /**
     * whether the given object is a rejected promise
     * @method
     * @static
     * @param obj the tested object
     * @return {Boolean}
     * @member Promise
     */
    isRejected: isRejected,
    /**
     * return a new promise
     * which is resolved when all promises is resolved
     * and rejected when any one of promises is rejected
     * @param {Promise[]} promises list of promises
     * @static
     * @return {Promise}
     * @member Promise
     */
    all: function (promises) {
      var count = promises.length;
      if (!count) {
        return null;
      }
      var defer = new Defer();
      for (var i = 0; i < promises.length; i++) {
        /*jshint loopfunc:true*/
        (function (promise, i) {
          when(promise, function (value) {
            promises[i] = value;
            if (--count === 0) {
              // if all is resolved
              // then resolve final returned promise with all value
              defer.resolve(promises);
            }
          }, function (r) {
            // if any one is rejected
            // then reject final return promise with first reason
            defer.reject(r);
          });
        }(promises[i], i));
      }
      return defer.promise;
    },
    /**
     * provide es6 generator
     * @param generatorFunc es6 generator function which has yielded promise
     */
    async: function (generatorFunc) {
      return function () {
        var generator = generatorFunc.apply(this, arguments);
        function doAction(action, arg) {
          var result;
          result = generator[action](arg);
          if (result.done) {
            return result.value;
          }
          return when(result.value, next, throwEx);
        }
        function next(v) {
          return doAction('next', v);
        }
        function throwEx(e) {
          return doAction('throw', e);
        }
        try {
          return next();
        } catch (e) {
          return Promise.reject(e);
        }
      };
    }
  });
  exports = Promise;
  return exports;
}();
module.exports = _promise_;
});