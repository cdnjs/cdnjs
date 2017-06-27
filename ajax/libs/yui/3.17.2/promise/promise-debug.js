/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('promise', function (Y, NAME) {

/**
Wraps the execution of asynchronous operations, providing a promise object that
can be used to subscribe to the various ways the operation may terminate.

When the operation completes successfully, call the Resolver's `resolve()`
method, passing any relevant response data for subscribers.  If the operation
encounters an error or is unsuccessful in some way, call `reject()`, again
passing any relevant data for subscribers.

The Resolver object should be shared only with the code resposible for
resolving or rejecting it. Public access for the Resolver is through its
_promise_, which is returned from the Resolver's `promise` property. While both
Resolver and promise allow subscriptions to the Resolver's state changes, the
promise may be exposed to non-controlling code. It is the preferable interface
for adding subscriptions.

Subscribe to state changes in the Resolver with the promise's
`then(callback, errback)` method.  `then()` wraps the passed callbacks in a
new Resolver and returns the corresponding promise, allowing chaining of
asynchronous or synchronous operations. E.g.
`promise.then(someAsyncFunc).then(anotherAsyncFunc)`

@module promise
@since 3.9.0
**/

var Lang  = Y.Lang,
    slice = [].slice;

/**
A promise represents a value that may not yet be available. Promises allow
you to chain asynchronous operations, write synchronous looking code and
handle errors throughout the process.

This constructor takes a function as a parameter where you can insert the logic
that fulfills or rejects this promise. The fulfillment value and the rejection
reason can be any JavaScript value. It's encouraged that rejection reasons be
error objects

<pre><code>
var fulfilled = new Y.Promise(function (resolve) {
    resolve('I am a fulfilled promise');
});

var rejected = new Y.Promise(function (resolve, reject) {
    reject(new Error('I am a rejected promise'));
});
</code></pre>

@class Promise
@constructor
@param {Function} fn A function where to insert the logic that resolves this
        promise. Receives `resolve` and `reject` functions as parameters.
        This function is called synchronously.
**/
function Promise(fn) {
    if (!(this instanceof Promise)) {
        Y.log('Promises should always be created with new Promise(). This will throw an error in the future', 'warn', NAME);
        return new Promise(fn);
    }

    var resolver = new Promise.Resolver(this);

    /**
    A reference to the resolver object that handles this promise

    @property _resolver
    @type Object
    @private
    */
    this._resolver = resolver;

    try {
        fn.call(this, function (value) {
            resolver.resolve(value);
        }, function (reason) {
            resolver.reject(reason);
        });
    } catch (e) {
        resolver.reject(e);
    }
}

Y.mix(Promise.prototype, {
    /**
    Schedule execution of a callback to either or both of "fulfill" and
    "reject" resolutions for this promise. The callbacks are wrapped in a new
    promise and that promise is returned.  This allows operation chaining ala
    `functionA().then(functionB).then(functionC)` where `functionA` returns
    a promise, and `functionB` and `functionC` _may_ return promises.

    Asynchronicity of the callbacks is guaranteed.

    @method then
    @param {Function} [callback] function to execute if the promise
                resolves successfully
    @param {Function} [errback] function to execute if the promise
                resolves unsuccessfully
    @return {Promise} A promise wrapping the resolution of either "resolve" or
                "reject" callback
    **/
    then: function (callback, errback) {
        var Constructor = this.constructor,
            resolver = this._resolver;

        // using this.constructor allows for customized promises to be
        // returned instead of plain ones
        return new Constructor(function (resolve, reject) {
            resolver._addCallbacks(
                // Check if callbacks are functions. If not, default to
                // `resolve` and `reject` respectively.
                // The wrapping of the callbacks is done here and not in
                // `_addCallbacks` because it is a feature specific to  `then`.
                // If `done` is added to promises it would call `_addCallbacks`
                // without defaulting to anything and without wrapping
                typeof callback === 'function' ?
                    Promise._wrap(resolve, reject, callback) : resolve,
                typeof errback === 'function' ?
                    Promise._wrap(resolve, reject, errback) : reject
            );
        });
    },

    /**
    A shorthand for `promise.then(undefined, callback)`.

    Returns a new promise and the error callback gets the same treatment as in
    `then`: errors get caught and turned into rejections, and the return value
    of the callback becomes the fulfilled value of the returned promise.

    @method catch
    @param [Function] errback Callback to be called in case this promise is
                        rejected
    @return {Promise} A new promise modified by the behavior of the error
                        callback
    **/
    'catch': function (errback) {
        return this.then(undefined, errback);
    },

    /**
    Returns the current status of the operation. Possible results are
    "pending", "fulfilled", and "rejected".

    @method getStatus
    @return {String}
    @deprecated
    **/
    getStatus: function () {
        Y.log('promise.getStatus() will be removed in the future', 'warn', NAME);
        return this._resolver.getStatus();
    }
});

/**
Wraps the callback in another function to catch exceptions and turn them into
rejections.

@method _wrap
@param {Function} resolve Resolving function of the resolver that
                    handles this promise
@param {Function} reject Rejection function of the resolver that
                    handles this promise
@param {Function} fn Callback to wrap
@return {Function}
@private
**/
Promise._wrap = function (resolve, reject, fn) {
    // callbacks and errbacks only get one argument
    return function (valueOrReason) {
        var result;

        // Promises model exception handling through callbacks
        // making both synchronous and asynchronous errors behave
        // the same way
        try {
            // Use the argument coming in to the callback/errback from the
            // resolution of the parent promise.
            // The function must be called as a normal function, with no
            // special value for |this|, as per Promises A+
            result = fn(valueOrReason);
        } catch (e) {
            reject(e);
            return;
        }

        resolve(result);
    };
};

/**
Checks if an object or value is a promise. This is cross-implementation
compatible, so promises returned from other libraries or native components
that are compatible with the Promises A+ spec should be recognized by this
method.

@method isPromise
@param {Any} obj The object to test
@return {Boolean} Whether the object is a promise or not
@static
**/
Promise.isPromise = function (obj) {
    var then;
    // We test promises by structure to be able to identify other
    // implementations' promises. This is important for cross compatibility and
    // In particular Y.when which should recognize any kind of promise
    // Use try...catch when retrieving obj.then. Return false if it throws
    // See Promises/A+ 1.1
    try {
        then = obj.then;
    } catch (_) {}
    return typeof then === 'function';
};

/**
Ensures that a certain value is a promise. If it is not a promise, it wraps it
in one.

This method can be copied or inherited in subclasses. In that case it will
check that the value passed to it is an instance of the correct class.
This means that `PromiseSubclass.resolve()` will always return instances of
`PromiseSubclass`.

@method resolve
@param {Any} Any object that may or may not be a promise
@return {Promise}
@static
**/
Promise.resolve = function (value) {
    return Promise.isPromise(value) && value.constructor === this ? value :
        /*jshint newcap: false */
        new this(function (resolve) {
        /*jshint newcap: true */
            resolve(value);
        });
};

/**
A shorthand for creating a rejected promise.

@method reject
@param {Any} reason Reason for the rejection of this promise. Usually an Error
    Object
@return {Promise} A rejected promise
@static
**/
Promise.reject = function (reason) {
    /*jshint newcap: false */
    return new this(function (resolve, reject) {
    /*jshint newcap: true */
        reject(reason);
    });
};

/**
Returns a promise that is resolved or rejected when all values are resolved or
any is rejected. This is useful for waiting for the resolution of multiple
promises, such as reading multiple files in Node.js or making multiple XHR
requests in the browser.

@method all
@param {Any[]} values An array of any kind of values, promises or not. If a value is not
@return [Promise] A promise for an array of all the fulfillment values
@static
**/
Promise.all = function (values) {
    var Promise = this;
    return new Promise(function (resolve, reject) {
        if (!Lang.isArray(values)) {
            reject(new TypeError('Promise.all expects an array of values or promises'));
            return;
        }

        var remaining = values.length,
            i         = 0,
            length    = values.length,
            results   = [];

        function oneDone(index) {
            return function (value) {
                results[index] = value;

                remaining--;

                if (!remaining) {
                    resolve(results);
                }
            };
        }

        if (length < 1) {
            return resolve(results);
        }

        for (; i < length; i++) {
            Promise.resolve(values[i]).then(oneDone(i), reject);
        }
    });
};

/**
Returns a promise that is resolved or rejected when any of values is either
resolved or rejected. Can be used for providing early feedback in the UI
while other operations are still pending.

@method race
@param {Any[]} values An array of values or promises
@return {Promise}
@static
**/
Promise.race = function (values) {
    var Promise = this;
    return new Promise(function (resolve, reject) {
        if (!Lang.isArray(values)) {
            reject(new TypeError('Promise.race expects an array of values or promises'));
            return;
        }
        
        // just go through the list and resolve and reject at the first change
        // This abuses the fact that calling resolve/reject multiple times
        // doesn't change the state of the returned promise
        for (var i = 0, count = values.length; i < count; i++) {
            Promise.resolve(values[i]).then(resolve, reject);
        }
    });
};

Y.Promise = Promise;
/**
Represents an asynchronous operation. Provides a
standard API for subscribing to the moment that the operation completes either
successfully (`fulfill()`) or unsuccessfully (`reject()`).

@class Promise.Resolver
@constructor
@param {Promise} promise The promise instance this resolver will be handling
**/
function Resolver(promise) {
    /**
    List of success callbacks

    @property _callbacks
    @type Array
    @private
    **/
    this._callbacks = [];

    /**
    List of failure callbacks

    @property _errbacks
    @type Array
    @private
    **/
    this._errbacks = [];

    /**
    The promise for this Resolver.

    @property promise
    @type Promise
    @deprecated
    **/
    this.promise = promise;

    /**
    The status of the operation. This property may take only one of the following
    values: 'pending', 'fulfilled' or 'rejected'.

    @property _status
    @type String
    @default 'pending'
    @private
    **/
    this._status = 'pending';

    /**
    This value that this promise represents.

    @property _result
    @type Any
    @private
    **/
    this._result = null;
}

Y.mix(Resolver.prototype, {
    /**
    Resolves the promise, signaling successful completion of the
    represented operation. All "onFulfilled" subscriptions are executed and passed
    the value provided to this method. After calling `fulfill()`, `reject()` and
    `notify()` are disabled.

    @method fulfill
    @param {Any} value Value to pass along to the "onFulfilled" subscribers
    **/
    fulfill: function (value) {
        if (this._status === 'pending') {
            this._result = value;
            this._status = 'fulfilled';
        }

        if (this._status === 'fulfilled') {
            this._notify(this._callbacks, this._result);

            // Reset the callback list so that future calls to fulfill()
            // won't call the same callbacks again. Promises keep a list
            // of callbacks, they're not the same as events. In practice,
            // calls to fulfill() after the first one should not be made by
            // the user but by then()
            this._callbacks = [];

            // Once a promise gets fulfilled it can't be rejected, so
            // there is no point in keeping the list. Remove it to help
            // garbage collection
            this._errbacks = null;
        }
    },

    /**
    Resolves the promise, signaling *un*successful completion of the
    represented operation. All "onRejected" subscriptions are executed with
    the value provided to this method. After calling `reject()`, `resolve()`
    and `notify()` are disabled.

    @method reject
    @param {Any} value Value to pass along to the "reject" subscribers
    **/
    reject: function (reason) {
        if (this._status === 'pending') {
            this._result = reason;
            this._status = 'rejected';
        }

        if (this._status === 'rejected') {
            if (!this._errbacks.length) { Y.log('This promise was rejected but no error handlers were registered to it', 'info', NAME); }
            this._notify(this._errbacks, this._result);

            // See fulfill()
            this._callbacks = null;
            this._errbacks = [];
        }
    },

    /*
    Given a certain value A passed as a parameter, this method resolves the
    promise to the value A.

    If A is a promise, `resolve` will cause the resolver to adopt the state of A
    and once A is resolved, it will resolve the resolver's promise as well.
    This behavior "flattens" A by calling `then` recursively and essentially
    disallows promises-for-promises.

    This is the default algorithm used when using the function passed as the
    first argument to the promise initialization function. This means that
    the following code returns a promise for the value 'hello world':

        var promise1 = new Y.Promise(function (resolve) {
            resolve('hello world');
        });
        var promise2 = new Y.Promise(function (resolve) {
            resolve(promise1);
        });
        promise2.then(function (value) {
            assert(value === 'hello world'); // true
        });

    @method resolve
    @param [Any] value A regular JS value or a promise
    */
    resolve: function (value) {
        var self = this;

        if (Promise.isPromise(value)) {
            value.then(function (value) {
                self.resolve(value);
            }, function (reason) {
                self.reject(reason);
            });
        } else {
            this.fulfill(value);
        }
    },

    /**
    Schedule execution of a callback to either or both of "resolve" and
    "reject" resolutions for the Resolver.  The callbacks
    are wrapped in a new Resolver and that Resolver's corresponding promise
    is returned.  This allows operation chaining ala
    `functionA().then(functionB).then(functionC)` where `functionA` returns
    a promise, and `functionB` and `functionC` _may_ return promises.

    @method then
    @param {Function} [callback] function to execute if the Resolver
                resolves successfully
    @param {Function} [errback] function to execute if the Resolver
                resolves unsuccessfully
    @return {Promise} The promise of a new Resolver wrapping the resolution
                of either "resolve" or "reject" callback
    @deprecated
    **/
    then: function (callback, errback) {
        return this.promise.then(callback, errback);
    },

    /**
    Schedule execution of a callback to either or both of "resolve" and
    "reject" resolutions of this resolver. If the resolver is not pending,
    the correct callback gets called automatically.

    @method _addCallbacks
    @param {Function} [callback] function to execute if the Resolver
                resolves successfully
    @param {Function} [errback] function to execute if the Resolver
                resolves unsuccessfully
    @private
    **/
    _addCallbacks: function (callback, errback) {
        var callbackList = this._callbacks,
            errbackList  = this._errbacks,
            status       = this._status,
            result       = this._result;

        if (callbackList && typeof callback === 'function') {
            callbackList.push(callback);
        }
        if (errbackList && typeof errback === 'function') {
            errbackList.push(errback);
        }

        // If a promise is already fulfilled or rejected, notify the newly added
        // callbacks by calling fulfill() or reject()
        if (status === 'fulfilled') {
            this.fulfill(result);
        } else if (status === 'rejected') {
            this.reject(result);
        }
    },

    /**
    Returns the current status of the Resolver as a string "pending",
    "fulfilled", or "rejected".

    @method getStatus
    @return {String}
    @deprecated
    **/
    getStatus: function () {
        Y.log('resolver.getStatus() will be removed in the future', 'warn', NAME);
        return this._status;
    },

    /**
    Executes an array of callbacks from a specified context, passing a set of
    arguments.

    @method _notify
    @param {Function[]} subs The array of subscriber callbacks
    @param {Any} result Value to pass the callbacks
    @protected
    **/
    _notify: function (subs, result) {
        // Since callback lists are reset synchronously, the subs list never
        // changes after _notify() receives it. Avoid calling Y.soon() for
        // an empty list
        if (subs.length) {
            // Calling all callbacks after Y.soon to guarantee
            // asynchronicity. Because setTimeout can cause unnecessary
            // delays that *can* become noticeable in some situations
            // (especially in Node.js)
            Y.soon(function () {
                var i, len;

                for (i = 0, len = subs.length; i < len; ++i) {
                    subs[i](result);
                }
            });
        }
    }

}, true);

Y.Promise.Resolver = Resolver;
/**
Abstraction API allowing you to interact with promises or raw values as if they
were promises. If a non-promise object is passed in, a new Resolver is created
and scheduled to resolve asynchronously with the provided value.

In either case, a promise is returned.  If either _callback_ or _errback_ are
provided, the promise returned is the one returned from calling
`promise.then(callback, errback)` on the provided or created promise.  If neither
are provided, the original promise is returned.

@for YUI
@method when
@param {Any} promise Promise object or value to wrap in a resolved promise
@param {Function} [callback] callback to execute if the promise is resolved
@param {Function} [errback] callback to execute if the promise is rejected
@return {Promise}
**/
Y.when = function (promise, callback, errback) {
    promise = Promise.resolve(promise);

    return (callback || errback) ? promise.then(callback, errback) : promise;
};
/**
Returns a new promise that will be resolved when all operations have completed.
Takes both any numer of values as arguments. If an argument is a not a promise,
it will be wrapped in a new promise, same as in `Y.when()`.

@for YUI
@method batch
@param {Any} operation* Any number of Y.Promise objects or regular JS values
@return {Promise} Promise to be fulfilled when all provided promises are
                    resolved
**/
Y.batch = function () {
    return Promise.all(slice.call(arguments));
};


}, '3.17.2', {"requires": ["timers"]});
