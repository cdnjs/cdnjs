/**
 * Copyright (C) 2010-2014, Dexter.Yy, MIT License
 * vim: et:ts=4:sw=4:sts=4
 */
if (typeof module === 'undefined' 
        && (typeof define !== 'function' || !define.amd)) {
    define = function(mid, deps, factory){
        factory();
    };
}
define("mo/lang/es6-promise", [], function(){

var host = this;

if (host.Promise) {
    return host.Promise;
}

// forked from jakearchibald/es6-promise

var PENDING   = void 0, // Hasn't fulfilled or rejected yet
    SEALED    = 0,      // Has fulfilled or rejected
    FULFILLED = 1,      // The action relating to the promise succeeded
    REJECTED  = 2,      // The action relating to the promise failed
    ERROR_CALLBACK = "A promises callback cannot return that same promise.",
    ERROR_CYCLE = "Chaining cycle detected",
    ERROR_ALL = "You must pass an array to all.";

function Promise(fn){
    var self = this;
    self._state = PENDING;
    self._subscribers = [];
    self._result = undefined;
    try {
        fn(onFulfilled, onRejected);
    } catch(e) {
        onRejected(e);
    }
    // @params {thenable|msg} value
    function onFulfilled(value) {
        resolve.call(self, value);
    }
    // @params {msg} reason 
    function onRejected(reason) {
        reject.call(self, reason);
    }
}

Promise.prototype = {

    constructor: Promise,

    // * if either/both are omitted, the next in the chain is called
    // * Both callbacks have a single parameter
    // * returns a new promise equivalent to the value you return from 
    //   onFulfilled/onRejected after being passed through Promise.resolve
    then: function(onFulfilled, onRejected){
        var me = this;
        var sub_promise = new this.constructor(function(){});
        if (this._state) {
            var callbacks = arguments;
            setTimeout(function() {
                followCallback.call(sub_promise, 
                    callbacks[me._state - 1], me._result, me._state);
            }, 0);
        } else {
            this._subscribers.push(sub_promise, onFulfilled, onRejected);
        }
        return sub_promise;
    },

    'catch': function(onRejected){
        return this.then(null, onRejected);
    }

};

// private methods for Promise.prototype

function resolve(value) {
    var self = this;
    if (self === value) {
        throw new TypeError(ERROR_CYCLE);
    } else if (!follow.call(self, value)) {
        fulfill.call(self, value);
    }
}

function fulfill(value) {
    var self = this;
    if (self._state !== PENDING) {
        return;
    }
    self._state = SEALED;
    self._result = value;
    setTimeout(function(){
        publish.call(self, self._state = FULFILLED);
    }, 0);
}

function reject(reason) {
    var self = this;
    if (self._state !== PENDING) {
        return;
    }
    self._state = SEALED;
    self._result = reason;
    setTimeout(function(){
        publish.call(self, self._state = REJECTED);
    }, 0);
}

function publish(final_state) {
    var sub_promise, 
        callback,
        subscribers = this._subscribers,
        result = this._result;
    for (var i = 0; i < subscribers.length; i += 3) {
        sub_promise = subscribers[i];
        callback = subscribers[i + final_state];
        followCallback.call(sub_promise, 
            callback, result, final_state);
    }
    this._subscribers.length = 0;
}

function follow(thenable) {
    var resolved,
        self = this;
    try {
        if (self === thenable) {
            throw new TypeError(ERROR_CALLBACK);
        }
        if (!is_thenable(thenable)) {
            return false;
        }
        thenable.then(function(value){
            if (resolved) {
                return;
            }
            resolved = true;
            if (thenable !== value) {
                resolve.call(self, value);
            } else {
                fulfill.call(self, value);
            }
        }, function(reason){
            if (resolved) {
                return;
            }
            resolved = true;
            reject.call(self, reason);
        });
    } catch (error) {
        if (resolved) {
            return true;
        }
        reject.call(self, error);
    }
    return true;
}

function followCallback(callback, result, final_state) {
    var self = this,
        need_pipe = is_function(callback);
    if (need_pipe) {
        try {
            result = callback(result);
        } catch(ex) {
            return reject.call(self, ex);
        }
    }
    if (follow.call(self, result)) {
        return;
    }
    if (need_pipe || final_state === FULFILLED) {
        resolve.call(self, result);
    } else if (final_state === REJECTED) {
        reject.call(self, result);
    }
}

// @params {Promise|thenable|msg} value
Promise.resolve = function(value){
    if (value && typeof value === 'object' 
            && value.constructor === this) {
        return value;
    }
    return new this(function(onFulfilled){
        onFulfilled(value);
    });
};
// @params {msg} reason 
Promise.reject = function(reason){
    return new this(function(onFulfilled, onRejected){
        onRejected(reason);
    });
};

Promise.all = function(promises){
    if (!Array.isArray(promises)) {
        throw new TypeError(ERROR_ALL);
    }
    return new this(function(onFulfilled, onRejected) {
        var results = [],
            promise,
            remaining = promises.length;
        if (remaining === 0) {
            onFulfilled([]);
        }
        for (var i = 0; i < promises.length; i++) {
            promise = promises[i];
            if (promise && is_function(promise.then)) {
                promise.then(track(i), onRejected);
            } else {
                mark(i, promise);
            }
        }
        function track(index) {
            return function(value) {
                mark(index, value);
            };
        }
        function mark(index, value) {
            results[index] = value;
            if (--remaining === 0) {
                onFulfilled(results);
            }
        }
    });
};

Promise.race = function(promises){
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to race.');
    }
    return new this(function(resolve, reject) {
        var promise;
        for (var i = 0; i < promises.length; i++) {
            promise = promises[i];
            if (promise && is_function(promise.then)) {
                promise.then(resolve, reject);
            } else {
                resolve.call(promise);
            }
        }
    });
};

function is_thenable(x) {
    var type = typeof x;
    return x && (type === 'object' || type === 'function')
        && is_function(x.then);
}

function is_function(x) {
    return typeof x === "function";
}

return host.Promise = Promise;

});
