/*!
 * @overview RSVP - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
 * @version   3.0.15
 */

(function() {
    "use strict";
    function $$rsvp$events$$indexOf(callbacks, callback) {
      for (var i=0, l=callbacks.length; i<l; i++) {
        if (callbacks[i] === callback) { return i; }
      }

      return -1;
    }

    function $$rsvp$events$$callbacksFor(object) {
      var callbacks = object._promiseCallbacks;

      if (!callbacks) {
        callbacks = object._promiseCallbacks = {};
      }

      return callbacks;
    }

    var $$rsvp$events$$default = {

      /**
        `RSVP.EventTarget.mixin` extends an object with EventTarget methods. For
        Example:

        ```javascript
        var object = {};

        RSVP.EventTarget.mixin(object);

        object.on('finished', function(event) {
          // handle event
        });

        object.trigger('finished', { detail: value });
        ```

        `EventTarget.mixin` also works with prototypes:

        ```javascript
        var Person = function() {};
        RSVP.EventTarget.mixin(Person.prototype);

        var yehuda = new Person();
        var tom = new Person();

        yehuda.on('poke', function(event) {
          console.log('Yehuda says OW');
        });

        tom.on('poke', function(event) {
          console.log('Tom says OW');
        });

        yehuda.trigger('poke');
        tom.trigger('poke');
        ```

        @method mixin
        @for RSVP.EventTarget
        @private
        @param {Object} object object to extend with EventTarget methods
      */
      'mixin': function(object) {
        object['on']      = this['on'];
        object['off']     = this['off'];
        object['trigger'] = this['trigger'];
        object._promiseCallbacks = undefined;
        return object;
      },

      /**
        Registers a callback to be executed when `eventName` is triggered

        ```javascript
        object.on('event', function(eventInfo){
          // handle the event
        });

        object.trigger('event');
        ```

        @method on
        @for RSVP.EventTarget
        @private
        @param {String} eventName name of the event to listen for
        @param {Function} callback function to be called when the event is triggered.
      */
      'on': function(eventName, callback) {
        var allCallbacks = $$rsvp$events$$callbacksFor(this), callbacks;

        callbacks = allCallbacks[eventName];

        if (!callbacks) {
          callbacks = allCallbacks[eventName] = [];
        }

        if ($$rsvp$events$$indexOf(callbacks, callback) === -1) {
          callbacks.push(callback);
        }
      },

      /**
        You can use `off` to stop firing a particular callback for an event:

        ```javascript
        function doStuff() { // do stuff! }
        object.on('stuff', doStuff);

        object.trigger('stuff'); // doStuff will be called

        // Unregister ONLY the doStuff callback
        object.off('stuff', doStuff);
        object.trigger('stuff'); // doStuff will NOT be called
        ```

        If you don't pass a `callback` argument to `off`, ALL callbacks for the
        event will not be executed when the event fires. For example:

        ```javascript
        var callback1 = function(){};
        var callback2 = function(){};

        object.on('stuff', callback1);
        object.on('stuff', callback2);

        object.trigger('stuff'); // callback1 and callback2 will be executed.

        object.off('stuff');
        object.trigger('stuff'); // callback1 and callback2 will not be executed!
        ```

        @method off
        @for RSVP.EventTarget
        @private
        @param {String} eventName event to stop listening to
        @param {Function} callback optional argument. If given, only the function
        given will be removed from the event's callback queue. If no `callback`
        argument is given, all callbacks will be removed from the event's callback
        queue.
      */
      'off': function(eventName, callback) {
        var allCallbacks = $$rsvp$events$$callbacksFor(this), callbacks, index;

        if (!callback) {
          allCallbacks[eventName] = [];
          return;
        }

        callbacks = allCallbacks[eventName];

        index = $$rsvp$events$$indexOf(callbacks, callback);

        if (index !== -1) { callbacks.splice(index, 1); }
      },

      /**
        Use `trigger` to fire custom events. For example:

        ```javascript
        object.on('foo', function(){
          console.log('foo event happened!');
        });
        object.trigger('foo');
        // 'foo event happened!' logged to the console
        ```

        You can also pass a value as a second argument to `trigger` that will be
        passed as an argument to all event listeners for the event:

        ```javascript
        object.on('foo', function(value){
          console.log(value.name);
        });

        object.trigger('foo', { name: 'bar' });
        // 'bar' logged to the console
        ```

        @method trigger
        @for RSVP.EventTarget
        @private
        @param {String} eventName name of the event to be triggered
        @param {Any} options optional value to be passed to any event handlers for
        the given `eventName`
      */
      'trigger': function(eventName, options) {
        var allCallbacks = $$rsvp$events$$callbacksFor(this), callbacks, callback;

        if (callbacks = allCallbacks[eventName]) {
          // Don't cache the callbacks.length since it may grow
          for (var i=0; i<callbacks.length; i++) {
            callback = callbacks[i];

            callback(options);
          }
        }
      }
    };

    var $$rsvp$config$$config = {
      instrument: false
    };

    $$rsvp$events$$default['mixin']($$rsvp$config$$config);

    function $$rsvp$config$$configure(name, value) {
      if (name === 'onerror') {
        // handle for legacy users that expect the actual
        // error to be passed to their function added via
        // `RSVP.configure('onerror', someFunctionHere);`
        $$rsvp$config$$config['on']('error', value);
        return;
      }

      if (arguments.length === 2) {
        $$rsvp$config$$config[name] = value;
      } else {
        return $$rsvp$config$$config[name];
      }
    }

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

    var $$instrument$$queue = [];

    function $$instrument$$scheduleFlush() {
      setTimeout(function() {
        var entry;
        for (var i = 0; i < $$instrument$$queue.length; i++) {
          entry = $$instrument$$queue[i];

          var payload = entry.payload;

          payload.guid = payload.key + payload.id;
          payload.childGuid = payload.key + payload.childId;
          if (payload.error) {
            payload.stack = payload.error.stack;
          }

          $$rsvp$config$$config['trigger'](entry.name, entry.payload);
        }
        $$instrument$$queue.length = 0;
      }, 50);
    }

    function $$instrument$$instrument(eventName, promise, child) {
      if (1 === $$instrument$$queue.push({
          name: eventName,
          payload: {
            key: promise._guidKey,
            id:  promise._id,
            eventName: eventName,
            detail: promise._result,
            childId: child && child._id,
            label: promise._label,
            timeStamp: $$utils$$now(),
            error: $$rsvp$config$$config["instrument-with-stack"] ? new Error(promise._label) : null
          }})) {
            $$instrument$$scheduleFlush();
          }
      }
    var $$instrument$$default = $$instrument$$instrument;

    function  $$$internal$$withOwnPromise() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function $$$internal$$noop() {}

    var $$$internal$$PENDING   = void 0;
    var $$$internal$$FULFILLED = 1;
    var $$$internal$$REJECTED  = 2;

    var $$$internal$$GET_THEN_ERROR = new $$$internal$$ErrorObject();

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
      $$rsvp$config$$config.async(function(promise) {
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
      } else if (thenable._state === $$$internal$$REJECTED) {
        thenable._onError = null;
        $$$internal$$reject(promise, thenable._result);
      } else {
        $$$internal$$subscribe(thenable, undefined, function(value) {
          if (thenable !== value) {
            $$$internal$$resolve(promise, value);
          } else {
            $$$internal$$fulfill(promise, value);
          }
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
        $$$internal$$fulfill(promise, value);
      } else if ($$utils$$objectOrFunction(value)) {
        $$$internal$$handleMaybeThenable(promise, value);
      } else {
        $$$internal$$fulfill(promise, value);
      }
    }

    function $$$internal$$publishRejection(promise) {
      if (promise._onError) {
        promise._onError(promise._result);
      }

      $$$internal$$publish(promise);
    }

    function $$$internal$$fulfill(promise, value) {
      if (promise._state !== $$$internal$$PENDING) { return; }

      promise._result = value;
      promise._state = $$$internal$$FULFILLED;

      if (promise._subscribers.length === 0) {
        if ($$rsvp$config$$config.instrument) {
          $$instrument$$default('fulfilled', promise);
        }
      } else {
        $$rsvp$config$$config.async($$$internal$$publish, promise);
      }
    }

    function $$$internal$$reject(promise, reason) {
      if (promise._state !== $$$internal$$PENDING) { return; }
      promise._state = $$$internal$$REJECTED;
      promise._result = reason;
      $$rsvp$config$$config.async($$$internal$$publishRejection, promise);
    }

    function $$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      parent._onError = null;

      subscribers[length] = child;
      subscribers[length + $$$internal$$FULFILLED] = onFulfillment;
      subscribers[length + $$$internal$$REJECTED]  = onRejection;

      if (length === 0 && parent._state) {
        $$rsvp$config$$config.async($$$internal$$publish, parent);
      }
    }

    function $$$internal$$publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if ($$rsvp$config$$config.instrument) {
        $$instrument$$default(settled === $$$internal$$FULFILLED ? 'fulfilled' : 'rejected', promise);
      }

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
          $$$internal$$reject(promise, $$$internal$$withOwnPromise());
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
      var resolved = false;
      try {
        resolver(function resolvePromise(value){
          if (resolved) { return; }
          resolved = true;
          $$$internal$$resolve(promise, value);
        }, function rejectPromise(reason) {
          if (resolved) { return; }
          resolved = true;
          $$$internal$$reject(promise, reason);
        });
      } catch(e) {
        $$$internal$$reject(promise, e);
      }
    }

    function $$enumerator$$makeSettledResult(state, position, value) {
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

    function $$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
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

    var $$enumerator$$default = $$enumerator$$Enumerator;

    $$enumerator$$Enumerator.prototype._validateInput = function(input) {
      return $$utils$$isArray(input);
    };

    $$enumerator$$Enumerator.prototype._validationError = function() {
      return new Error('Array Methods must be provided an Array');
    };

    $$enumerator$$Enumerator.prototype._init = function() {
      this._result = new Array(this.length);
    };

    $$enumerator$$Enumerator.prototype._enumerate = function() {
      var length  = this.length;
      var promise = this.promise;
      var input   = this._input;

      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
        this._eachEntry(input[i], i);
      }
    };

    $$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
      var c = this._instanceConstructor;
      if ($$utils$$isMaybeThenable(entry)) {
        if (entry.constructor === c && entry._state !== $$$internal$$PENDING) {
          entry._onError = null;
          this._settledAt(entry._state, i, entry._result);
        } else {
          this._willSettleAt(c.resolve(entry), i);
        }
      } else {
        this._remaining--;
        this._result[i] = this._makeResult($$$internal$$FULFILLED, i, entry);
      }
    };

    $$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
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

    $$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
      return value;
    };

    $$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
      var enumerator = this;

      $$$internal$$subscribe(promise, undefined, function(value) {
        enumerator._settledAt($$$internal$$FULFILLED, i, value);
      }, function(reason) {
        enumerator._settledAt($$$internal$$REJECTED, i, reason);
      });
    };
    function $$promise$all$$all(entries, label) {
      return new $$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
    }
    var $$promise$all$$default = $$promise$all$$all;
    function $$promise$race$$race(entries, label) {
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
    }
    var $$promise$race$$default = $$promise$race$$race;
    function $$promise$resolve$$resolve(object, label) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor($$$internal$$noop, label);
      $$$internal$$resolve(promise, object);
      return promise;
    }
    var $$promise$resolve$$default = $$promise$resolve$$resolve;
    function $$promise$reject$$reject(reason, label) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor($$$internal$$noop, label);
      $$$internal$$reject(promise, reason);
      return promise;
    }
    var $$promise$reject$$default = $$promise$reject$$reject;

    var $$rsvp$promise$$guidKey = 'rsvp_' + $$utils$$now() + '-';
    var $$rsvp$promise$$counter = 0;

    function $$rsvp$promise$$needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function $$rsvp$promise$$needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    function $$rsvp$promise$$Promise(resolver, label) {
      this._id = $$rsvp$promise$$counter++;
      this._label = label;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      if ($$rsvp$config$$config.instrument) {
        $$instrument$$default('created', this);
      }

      if ($$$internal$$noop !== resolver) {
        if (!$$utils$$isFunction(resolver)) {
          $$rsvp$promise$$needsResolver();
        }

        if (!(this instanceof $$rsvp$promise$$Promise)) {
          $$rsvp$promise$$needsNew();
        }

        $$$internal$$initializePromise(this, resolver);
      }
    }

    var $$rsvp$promise$$default = $$rsvp$promise$$Promise;

    // deprecated
    $$rsvp$promise$$Promise.cast = $$promise$resolve$$default;
    $$rsvp$promise$$Promise.all = $$promise$all$$default;
    $$rsvp$promise$$Promise.race = $$promise$race$$default;
    $$rsvp$promise$$Promise.resolve = $$promise$resolve$$default;
    $$rsvp$promise$$Promise.reject = $$promise$reject$$default;

    $$rsvp$promise$$Promise.prototype = {
      constructor: $$rsvp$promise$$Promise,

      _guidKey: $$rsvp$promise$$guidKey,

      _onError: function (reason) {
        $$rsvp$config$$config.async(function(promise) {
          setTimeout(function() {
            if (promise._onError) {
              $$rsvp$config$$config['trigger']('error', reason);
            }
          }, 0);
        }, this);
      },

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
          if ($$rsvp$config$$config.instrument) {
            $$instrument$$default('chained', this, this);
          }
          return this;
        }

        parent._onError = null;

        var child = new this.constructor($$$internal$$noop, label);
        var result = parent._result;

        if ($$rsvp$config$$config.instrument) {
          $$instrument$$default('chained', parent, child);
        }

        if (state) {
          var callback = arguments[state - 1];
          $$rsvp$config$$config.async(function(){
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
      },

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
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      'finally': function(callback, label) {
        var constructor = this.constructor;

        return this.then(function(value) {
          return constructor.resolve(callback()).then(function(){
            return value;
          });
        }, function(reason) {
          return constructor.resolve(callback()).then(function(){
            throw reason;
          });
        }, label);
      }
    };

    function $$rsvp$node$$Result() {
      this.value = undefined;
    }

    var $$rsvp$node$$ERROR = new $$rsvp$node$$Result();
    var $$rsvp$node$$GET_THEN_ERROR = new $$rsvp$node$$Result();

    function $$rsvp$node$$getThen(obj) {
      try {
       return obj.then;
      } catch(error) {
        $$rsvp$node$$ERROR.value= error;
        return $$rsvp$node$$ERROR;
      }
    }


    function $$rsvp$node$$tryApply(f, s, a) {
      try {
        f.apply(s, a);
      } catch(error) {
        $$rsvp$node$$ERROR.value = error;
        return $$rsvp$node$$ERROR;
      }
    }

    function $$rsvp$node$$makeObject(_, argumentNames) {
      var obj = {};
      var name;
      var i;
      var length = _.length;
      var args = new Array(length);

      for (var x = 0; x < length; x++) {
        args[x] = _[x];
      }

      for (i = 0; i < argumentNames.length; i++) {
        name = argumentNames[i];
        obj[name] = args[i + 1];
      }

      return obj;
    }

    function $$rsvp$node$$arrayResult(_) {
      var length = _.length;
      var args = new Array(length - 1);

      for (var i = 1; i < length; i++) {
        args[i - 1] = _[i];
      }

      return args;
    }

    function $$rsvp$node$$wrapThenable(then, promise) {
      return {
        then: function(onFulFillment, onRejection) {
          return then.call(promise, onFulFillment, onRejection);
        }
      };
    }

    function $$rsvp$node$$denodeify(nodeFunc, options) {
      var fn = function() {
        var self = this;
        var l = arguments.length;
        var args = new Array(l + 1);
        var arg;
        var promiseInput = false;

        for (var i = 0; i < l; ++i) {
          arg = arguments[i];

          if (!promiseInput) {
            // TODO: clean this up
            promiseInput = $$rsvp$node$$needsPromiseInput(arg);
            if (promiseInput === $$rsvp$node$$GET_THEN_ERROR) {
              var p = new $$rsvp$promise$$default($$$internal$$noop);
              $$$internal$$reject(p, $$rsvp$node$$GET_THEN_ERROR.value);
              return p;
            } else if (promiseInput && promiseInput !== true) {
              arg = $$rsvp$node$$wrapThenable(promiseInput, arg);
            }
          }
          args[i] = arg;
        }

        var promise = new $$rsvp$promise$$default($$$internal$$noop);

        args[l] = function(err, val) {
          if (err)
            $$$internal$$reject(promise, err);
          else if (options === undefined)
            $$$internal$$resolve(promise, val);
          else if (options === true)
            $$$internal$$resolve(promise, $$rsvp$node$$arrayResult(arguments));
          else if ($$utils$$isArray(options))
            $$$internal$$resolve(promise, $$rsvp$node$$makeObject(arguments, options));
          else
            $$$internal$$resolve(promise, val);
        };

        if (promiseInput) {
          return $$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self);
        } else {
          return $$rsvp$node$$handleValueInput(promise, args, nodeFunc, self);
        }
      };

      fn.__proto__ = nodeFunc;

      return fn;
    }

    var $$rsvp$node$$default = $$rsvp$node$$denodeify;

    function $$rsvp$node$$handleValueInput(promise, args, nodeFunc, self) {
      var result = $$rsvp$node$$tryApply(nodeFunc, self, args);
      if (result === $$rsvp$node$$ERROR) {
        $$$internal$$reject(promise, result.value);
      }
      return promise;
    }

    function $$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self){
      return $$rsvp$promise$$default.all(args).then(function(args){
        var result = $$rsvp$node$$tryApply(nodeFunc, self, args);
        if (result === $$rsvp$node$$ERROR) {
          $$$internal$$reject(promise, result.value);
        }
        return promise;
      });
    }

    function $$rsvp$node$$needsPromiseInput(arg) {
      if (arg && typeof arg === 'object') {
        if (arg.constructor === $$rsvp$promise$$default) {
          return true;
        } else {
          return $$rsvp$node$$getThen(arg);
        }
      } else {
        return false;
      }
    }
    function $$rsvp$all$$all(array, label) {
      return $$rsvp$promise$$default.all(array, label);
    }
    var $$rsvp$all$$default = $$rsvp$all$$all;

    function $$rsvp$all$settled$$AllSettled(Constructor, entries, label) {
      this._superConstructor(Constructor, entries, false /* don't abort on reject */, label);
    }

    $$rsvp$all$settled$$AllSettled.prototype = $$utils$$o_create($$enumerator$$default.prototype);
    $$rsvp$all$settled$$AllSettled.prototype._superConstructor = $$enumerator$$default;
    $$rsvp$all$settled$$AllSettled.prototype._makeResult = $$enumerator$$makeSettledResult;
    $$rsvp$all$settled$$AllSettled.prototype._validationError = function() {
      return new Error('allSettled must be called with an array');
    };

    function $$rsvp$all$settled$$allSettled(entries, label) {
      return new $$rsvp$all$settled$$AllSettled($$rsvp$promise$$default, entries, label).promise;
    }
    var $$rsvp$all$settled$$default = $$rsvp$all$settled$$allSettled;
    function $$rsvp$race$$race(array, label) {
      return $$rsvp$promise$$default.race(array, label);
    }
    var $$rsvp$race$$default = $$rsvp$race$$race;
    function $$promise$hash$$PromiseHash(Constructor, object, label) {
      this._superConstructor(Constructor, object, true, label);
    }

    var $$promise$hash$$default = $$promise$hash$$PromiseHash;

    $$promise$hash$$PromiseHash.prototype = $$utils$$o_create($$enumerator$$default.prototype);
    $$promise$hash$$PromiseHash.prototype._superConstructor = $$enumerator$$default;
    $$promise$hash$$PromiseHash.prototype._init = function() {
      this._result = {};
    };

    $$promise$hash$$PromiseHash.prototype._validateInput = function(input) {
      return input && typeof input === 'object';
    };

    $$promise$hash$$PromiseHash.prototype._validationError = function() {
      return new Error('Promise.hash must be called with an object');
    };

    $$promise$hash$$PromiseHash.prototype._enumerate = function() {
      var promise = this.promise;
      var input   = this._input;
      var results = [];

      for (var key in input) {
        if (promise._state === $$$internal$$PENDING && input.hasOwnProperty(key)) {
          results.push({
            position: key,
            entry: input[key]
          });
        }
      }

      var length = results.length;
      this._remaining = length;
      var result;

      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
        result = results[i];
        this._eachEntry(result.entry, result.position);
      }
    };
    function $$rsvp$hash$$hash(object, label) {
      return new $$promise$hash$$default($$rsvp$promise$$default, object, label).promise;
    }
    var $$rsvp$hash$$default = $$rsvp$hash$$hash;

    function $$rsvp$hash$settled$$HashSettled(Constructor, object, label) {
      this._superConstructor(Constructor, object, false, label);
    }

    $$rsvp$hash$settled$$HashSettled.prototype = $$utils$$o_create($$promise$hash$$default.prototype);
    $$rsvp$hash$settled$$HashSettled.prototype._superConstructor = $$enumerator$$default;
    $$rsvp$hash$settled$$HashSettled.prototype._makeResult = $$enumerator$$makeSettledResult;

    $$rsvp$hash$settled$$HashSettled.prototype._validationError = function() {
      return new Error('hashSettled must be called with an object');
    };

    function $$rsvp$hash$settled$$hashSettled(object, label) {
      return new $$rsvp$hash$settled$$HashSettled($$rsvp$promise$$default, object, label).promise;
    }
    var $$rsvp$hash$settled$$default = $$rsvp$hash$settled$$hashSettled;
    function $$rsvp$rethrow$$rethrow(reason) {
      setTimeout(function() {
        throw reason;
      });
      throw reason;
    }
    var $$rsvp$rethrow$$default = $$rsvp$rethrow$$rethrow;
    function $$rsvp$defer$$defer(label) {
      var deferred = { };

      deferred['promise'] = new $$rsvp$promise$$default(function(resolve, reject) {
        deferred['resolve'] = resolve;
        deferred['reject'] = reject;
      }, label);

      return deferred;
    }
    var $$rsvp$defer$$default = $$rsvp$defer$$defer;
    function $$rsvp$map$$map(promises, mapFn, label) {
      return $$rsvp$promise$$default.all(promises, label).then(function(values) {
        if (!$$utils$$isFunction(mapFn)) {
          throw new TypeError("You must pass a function as map's second argument.");
        }

        var length = values.length;
        var results = new Array(length);

        for (var i = 0; i < length; i++) {
          results[i] = mapFn(values[i]);
        }

        return $$rsvp$promise$$default.all(results, label);
      });
    }
    var $$rsvp$map$$default = $$rsvp$map$$map;
    function $$rsvp$resolve$$resolve(value, label) {
      return $$rsvp$promise$$default.resolve(value, label);
    }
    var $$rsvp$resolve$$default = $$rsvp$resolve$$resolve;
    function $$rsvp$reject$$reject(reason, label) {
      return $$rsvp$promise$$default.reject(reason, label);
    }
    var $$rsvp$reject$$default = $$rsvp$reject$$reject;
    function $$rsvp$filter$$filter(promises, filterFn, label) {
      return $$rsvp$promise$$default.all(promises, label).then(function(values) {
        if (!$$utils$$isFunction(filterFn)) {
          throw new TypeError("You must pass a function as filter's second argument.");
        }

        var length = values.length;
        var filtered = new Array(length);

        for (var i = 0; i < length; i++) {
          filtered[i] = filterFn(values[i]);
        }

        return $$rsvp$promise$$default.all(filtered, label).then(function(filtered) {
          var results = new Array(length);
          var newLength = 0;

          for (var i = 0; i < length; i++) {
            if (filtered[i]) {
              results[newLength] = values[i];
              newLength++;
            }
          }

          results.length = newLength;

          return results;
        });
      });
    }
    var $$rsvp$filter$$default = $$rsvp$filter$$filter;
    var $$rsvp$asap$$len = 0;

    function $$rsvp$asap$$asap(callback, arg) {
      $$rsvp$asap$$queue[$$rsvp$asap$$len] = callback;
      $$rsvp$asap$$queue[$$rsvp$asap$$len + 1] = arg;
      $$rsvp$asap$$len += 2;
      if ($$rsvp$asap$$len === 2) {
        // If len is 1, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        $$rsvp$asap$$scheduleFlush();
      }
    }

    var $$rsvp$asap$$default = $$rsvp$asap$$asap;

    var $$rsvp$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
    var $$rsvp$asap$$browserGlobal = $$rsvp$asap$$browserWindow || {};
    var $$rsvp$asap$$BrowserMutationObserver = $$rsvp$asap$$browserGlobal.MutationObserver || $$rsvp$asap$$browserGlobal.WebKitMutationObserver;
    var $$rsvp$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var $$rsvp$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
      typeof importScripts !== 'undefined' &&
      typeof MessageChannel !== 'undefined';

    // node
    function $$rsvp$asap$$useNextTick() {
      var nextTick = process.nextTick;
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // setImmediate should be used instead instead
      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
        nextTick = setImmediate;
      }
      return function() {
        nextTick($$rsvp$asap$$flush);
      };
    }

    // vertx
    function $$rsvp$asap$$useVertxTimer() {
      return function() {
        vertxNext($$rsvp$asap$$flush);
      };
    }

    function $$rsvp$asap$$useMutationObserver() {
      var iterations = 0;
      var observer = new $$rsvp$asap$$BrowserMutationObserver($$rsvp$asap$$flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    // web worker
    function $$rsvp$asap$$useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = $$rsvp$asap$$flush;
      return function () {
        channel.port2.postMessage(0);
      };
    }

    function $$rsvp$asap$$useSetTimeout() {
      return function() {
        setTimeout($$rsvp$asap$$flush, 1);
      };
    }

    var $$rsvp$asap$$queue = new Array(1000);
    function $$rsvp$asap$$flush() {
      for (var i = 0; i < $$rsvp$asap$$len; i+=2) {
        var callback = $$rsvp$asap$$queue[i];
        var arg = $$rsvp$asap$$queue[i+1];

        callback(arg);

        $$rsvp$asap$$queue[i] = undefined;
        $$rsvp$asap$$queue[i+1] = undefined;
      }

      $$rsvp$asap$$len = 0;
    }

    function $$rsvp$asap$$attemptVertex() {
      try {
        var vertx = require('vertx');
        var vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return $$rsvp$asap$$useVertxTimer();
      } catch(e) {
        return $$rsvp$asap$$useSetTimeout();
      }
    }

    var $$rsvp$asap$$scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if ($$rsvp$asap$$isNode) {
      $$rsvp$asap$$scheduleFlush = $$rsvp$asap$$useNextTick();
    } else if ($$rsvp$asap$$BrowserMutationObserver) {
      $$rsvp$asap$$scheduleFlush = $$rsvp$asap$$useMutationObserver();
    } else if ($$rsvp$asap$$isWorker) {
      $$rsvp$asap$$scheduleFlush = $$rsvp$asap$$useMessageChannel();
    } else if ($$rsvp$asap$$browserWindow === undefined && typeof require === 'function') {
      $$rsvp$asap$$scheduleFlush = $$rsvp$asap$$attemptVertex();
    } else {
      $$rsvp$asap$$scheduleFlush = $$rsvp$asap$$useSetTimeout();
    }

    // default async is asap;
    $$rsvp$config$$config.async = $$rsvp$asap$$default;
    var $$rsvp$$cast = $$rsvp$resolve$$default;
    function $$rsvp$$async(callback, arg) {
      $$rsvp$config$$config.async(callback, arg);
    }

    function $$rsvp$$on() {
      $$rsvp$config$$config['on'].apply($$rsvp$config$$config, arguments);
    }

    function $$rsvp$$off() {
      $$rsvp$config$$config['off'].apply($$rsvp$config$$config, arguments);
    }

    // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
    if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
      var $$rsvp$$callbacks = window['__PROMISE_INSTRUMENTATION__'];
      $$rsvp$config$$configure('instrument', true);
      for (var $$rsvp$$eventName in $$rsvp$$callbacks) {
        if ($$rsvp$$callbacks.hasOwnProperty($$rsvp$$eventName)) {
          $$rsvp$$on($$rsvp$$eventName, $$rsvp$$callbacks[$$rsvp$$eventName]);
        }
      }
    }

    var rsvp$umd$$RSVP = {
      'race': $$rsvp$race$$default,
      'Promise': $$rsvp$promise$$default,
      'allSettled': $$rsvp$all$settled$$default,
      'hash': $$rsvp$hash$$default,
      'hashSettled': $$rsvp$hash$settled$$default,
      'denodeify': $$rsvp$node$$default,
      'on': $$rsvp$$on,
      'off': $$rsvp$$off,
      'map': $$rsvp$map$$default,
      'filter': $$rsvp$filter$$default,
      'resolve': $$rsvp$resolve$$default,
      'reject': $$rsvp$reject$$default,
      'all': $$rsvp$all$$default,
      'rethrow': $$rsvp$rethrow$$default,
      'defer': $$rsvp$defer$$default,
      'EventTarget': $$rsvp$events$$default,
      'configure': $$rsvp$config$$configure,
      'async': $$rsvp$$async
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return rsvp$umd$$RSVP; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = rsvp$umd$$RSVP;
    } else if (typeof this !== 'undefined') {
      this['RSVP'] = rsvp$umd$$RSVP;
    }
}).call(this);

//# sourceMappingURL=rsvp.js.map