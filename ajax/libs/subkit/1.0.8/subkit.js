// SubkitJS - 1.0.8
// https://github.com/subkit
// Copyright 2012 - 2014 http://subkit.io
// MIT License

!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.Subkit=e():"undefined"!=typeof global?global.Subkit=e():"undefined"!=typeof self&&(self.Subkit=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],2:[function(require,module,exports){
var process=require("__browserify_process");// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    // Turn off strict mode for this function so we can assign to global.Q
    /* jshint strict: false */

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else {
        Q = definition();
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;

    function flush() {
        /* jshint loopfunc: true */

        while (head.next) {
            head = head.next;
            var task = head.task;
            head.task = void 0;
            var domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }

            try {
                task();

            } catch (e) {
                if (isNodeJS) {
                    // In node, uncaught exceptions are considered fatal errors.
                    // Re-throw them synchronously to interrupt flushing!

                    // Ensure continuation if the uncaught exception is suppressed
                    // listening "uncaughtException" events (as domains does).
                    // Continue in next event to avoid tick recursion.
                    if (domain) {
                        domain.exit();
                    }
                    setTimeout(flush, 0);
                    if (domain) {
                        domain.enter();
                    }

                    throw e;

                } else {
                    // In browsers, uncaught exceptions are not fatal.
                    // Re-throw them asynchronously to avoid slow-downs.
                    setTimeout(function() {
                       throw e;
                    }, 0);
                }
            }

            if (domain) {
                domain.exit();
            }
        }

        flushing = false;
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process !== "undefined" && process.nextTick) {
        // Node.js before 0.9. Note that some fake-Node environments, like the
        // Mocha test runner, introduce a `process` global without a `nextTick`.
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }

    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (isPromise(value)) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined, message) {
            nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become fulfilled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be fulfilled
 */
Q.race = race;
function race(answerPs) {
    return promise(function(resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function(answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return isObject(object) &&
        typeof object.promiseDispatch === "function" &&
        typeof object.inspect === "function";
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return result.value;
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return exception.value;
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var countDown = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++countDown;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--countDown === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (countDown === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {String} custom error message (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, message) {
    return Q(object).timeout(ms, message);
};

Promise.prototype.timeout = function (ms, message) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        deferred.reject(new Error(message || "Timed out after " + ms + " ms"));
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

},{"__browserify_process":1}],3:[function(require,module,exports){
module.exports = function(subkit){
	'use strict';
	
	return {
		list: function(callback){
			var url = subkit.baseUrl + '/baas';
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(status !== 200) return callback('Request error.');
				callback(null, result.json());
			});
		},
		listByAccountId: function(name, callback){
			var url = subkit.baseUrl + '/baas/by/accounts/' + name;
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(status !== 200) return callback('Request error.');
				callback(null, result.json());
			});
		},
		get: function(name, callback){
			var url = subkit.baseUrl + '/baas/' + name;
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(status !== 200) return callback('Request error.');
				callback(null, result.json());
			});
		},
		set: function(id, username, password, callback){
			var url = subkit.baseUrl + '/baas/' + id;
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg['data'] = {
				username: username,
				password: password
			};
			subkit.httpRequest.post(url, msg, function(status, result){
				if(status !== 201) return callback('Request error.');
				callback(null, result.json());
			});
		},
		remove: function(id, callback){
			var url = subkit.baseUrl + '/baas/' + id;
			subkit.httpRequest.del(url,subkit.options, function(status, result){
				if(status !== 202) return callback('Request error.');
				callback(null, result.json());
			});
		},
		start: function(id, callback){
			var url = subkit.baseUrl + '/baas/command/' + id;
			subkit.httpRequest.put(url,subkit.options, function(status, result){
				if(status !== 202) return callback('Request error.');
				callback(null, result.json());
			});
		},
		stop: function(id, callback){
			var url = subkit.baseUrl + '/baas/command/' + id;
			subkit.httpRequest.del(url,subkit.options, function(status, result){
				if(status !== 202) return callback('Request error.');
				callback(null, result.json());
			});
		}
	};
};

},{}],4:[function(require,module,exports){
module.exports = function(subkit){
	'use strict';
	
	return {
		Email: function(){
			var self = this;
			self.recipient = '';
			self.templateId = '';
			self.subject = '';
			self.metadata;
		},
		send: function(email, callback){
			var url = subkit.baseUrl + "/email/action/send/" + email.recipient;
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg["data"] = email;
			subkit.httpRequest.post(url, msg, function(status, result){
				if(status!==202) {
					if(callback) callback(result.json());
				}else{
					if(callback) callback(null, result.json());
				}
			});
		},
		setSettings: function(value, callback){
			var url = subkit.baseUrl + "/email/settings";
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg["data"] = value;
			subkit.httpRequest.put(url, msg, function(status, result){
				if(status!==202) {
					if(callback) callback(result.json());
				}else{
					if(callback) callback(null, result.json());
				}
			});
		},
		getSettings: function(callback){
			var url = subkit.baseUrl + "/email/settings";
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(status!==200) {
					if(callback) callback(result.json());
				}else{
					if(callback) callback(null, result.json());
				}
			});
		}
	};
};
},{}],5:[function(require,module,exports){
module.exports = function(subkit){
	'use strict';
	
	return {
		upload: function(file, callback){
			var deferred = subkit.$q.defer();
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg.headers['Content-Type'] = 'application/octed-stream';
			msg["data"] = file;
			var url = subkit.baseUrl + "/file/upload/" + file.name;
			subkit.httpRequest.post(url, msg, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 201 && status!==202) deferred.reject(new Error(result.json().message));
				else deferred.resolve(result.json());
			});
			return deferred.promise.nodeify(callback);
		},
		download: function(fileName, callback){
			var deferred = subkit.$q.defer();
			var url = subkit.baseUrl + "/file/download/" + fileName;
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 200) deferred.reject(new Error(result.json().message));
				else deferred.resolve(result.text());
			});
			return deferred.promise.nodeify(callback);
		},
		delete: function(fileName, callback){
			var deferred = subkit.$q.defer();
			var url = subkit.baseUrl + "/file/" + fileName;
			subkit.httpRequest.del(url, subkit.options, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 201 && status!==204) deferred.reject(new Error(result.json().message));
				else deferred.resolve(result.json());
			});
			return deferred.promise.nodeify(callback);
		},
		list: function (callback){
			var deferred = subkit.$q.defer();
			var url = subkit.baseUrl + "/file";
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 200) deferred.reject(new Error(result.json().message));
				else deferred.resolve(result.json());
			});
			return deferred.promise.nodeify(callback);
		},
		open: function(fileName, callback){
			var deferred = subkit.$q.defer();
			var url = subkit.baseUrl + "/file/" + fileName;
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 200) deferred.reject(new Error(result.json().message));
				else deferred.resolve(result.text());
			});
			return deferred.promise.nodeify(callback);
		}
	};
};
},{}],6:[function(require,module,exports){
module.exports = function(subkit){
	'use strict';
	
	return {
		list: function(callback){
			var url = subkit.baseUrl + '/processes';
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg['data'] = {filter: '{}'};
			subkit.httpRequest.get(url, msg,function (status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				callback(null, result.json().map(function(itm){
					return itm.value;
				}));
			});
		},
		get: function(id, callback){
			var url = subkit.baseUrl + '/processes/' + id;
			subkit.httpRequest.get(url,subkit.options,function (status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				callback(null, result.json().map(function(itm){
					return itm.value;
				}));
			});
		},
		run: function(document, callback){
			var url = subkit.baseUrl + '/processes/actions/run/' + document.rel;
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg['data'] = document;
			subkit.httpRequest.post(url, msg, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status!==201) return callback(result.json());
				callback(null, result.json());
			});
		}
	};
};
},{}],7:[function(require,module,exports){
module.exports = function(subkit){
	'use strict';
	
	return {
	};
};
},{}],8:[function(require,module,exports){
module.exports = function(subkit){
	'use strict';
	
	return {
		set: function(task, callback){
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg["data"] = task;
			var url = subkit.baseUrl + "/task/" + task.Name;
			subkit.httpRequest.put(url, msg, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==201 && status!==202) return callback(result.json());

				callback(null, result.json());
			});
		},	
		get: function(taskName, callback){
			var url = subkit.baseUrl + "/task/" + taskName;
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==200) return callback(result.json());

				callback(null, result.json());
			});
		},
		remove: function(taskName, callback){
			var url = subkit.baseUrl + "/task/" + taskName;
			subkit.httpRequest.del(url, subkit.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==202 && status!==204) return callback(result.json());

				callback(null, result.json());
			});
		},
		list: function(callback){
			var url = subkit.baseUrl + "/task";
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==200) return callback(result.json());

				callback(null, result.json());
			});
		},
		run: function(taskName, callback, logCallback){
			var url = subkit.baseUrl + '/task/run/' + taskName;
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==200) return callback(result.json());

				callback(null, result.json());
			}, logCallback);
		}
	};
};
},{}],9:[function(require,module,exports){
module.exports = function(subkit){
	'use strict';
	
	return {
		add: function(templateName,template,callback){
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg.headers['Content-Type'] = 'application/octed-stream';
			msg["data"] = template;
			var url = subkit.baseUrl + "/template/" + templateName;
			subkit.httpRequest.post(url, msg, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==201 && status!==202) return callback(result.json());

				callback(null, result.json());
			});
		},	
		set: function(templateName, template, callback){
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg.headers['Content-Type'] = 'application/octed-stream';
			msg["data"] = template;
			var url = subkit.baseUrl + "/template/" + templateName;
			subkit.httpRequest.put(url, msg, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==201 && status!==202) return callback(result.json());

				callback(null, result.json());
			});
		},	
		get: function(templateName, callback){
			var url = subkit.baseUrl + "/template/" + templateName;
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==200) return callback(result.json());

				callback(null, result.text());
			});
		},
		remove: function(templateName, callback){
			var url = subkit.baseUrl + "/template/" + templateName;
			subkit.httpRequest.del(url, subkit.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==202) return callback(result.json());

				callback(null, result.json());
			});
		},
		list: function(callback){
			var url = subkit.baseUrl + "/template";
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status!==200) return callback(result.json());

				callback(null, result.json());
			});
		},
		open: function(templateName, metadata, callback){
			var url = subkit.baseUrl + '/template/'+templateName+'/actions/render';
			if(metadata){
				subkit.options.cache = true;
				var str = [];
				for(var p in metadata){
				   if (metadata.hasOwnProperty(p)) {
				       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(metadata[p]));
				   }
				}
				url += '?' + str.join("&");
			}
			
			subkit.httpRequest.get(url, subkit.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: "Connection failure."});
				if(status !== 200) return callback(result.json());
				callback(null, result.text());
			});
		}
	};
};
},{}],10:[function(require,module,exports){
module.exports = function(subkit){
	'use strict';
	
	return {
		login: function(callback){
			var deferred = subkit.$q.defer();
			var url = subkit.baseUrl + '/users/actions/login';
			subkit.httpRequest.authBasic(subkit.options.username, subkit.options.password);
			subkit.httpRequest.post(url, subkit.options, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 200) deferred.reject(new Error('Authentication failed.'));
				else {
					subkit.options.apiKey = result.json().apiKey;
					var result = {
						apiKey: subkit.options.apiKey,
						username: subkit.options.username,
						password: subkit.options.password,
						baseUrl: subkit.baseUrl,
						devCenterUrl: subkit.baseUrl + '/devcenter/index'
					};
					deferred.resolve(result);
				}
			});
			return deferred.promise.nodeify(callback);
		},
		listAll: function(callback){
			var url = subkit.baseUrl + '/users';
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg['data'] = {filter: '{}'};
			subkit.httpRequest.get(url, msg,function (status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				callback(null, result.json().map(function(itm){
					return itm.value;
				}));
			});
		},
		list: function(callback){
			var url = subkit.baseUrl + '/users';
			subkit.httpRequest.get(url,subkit.options,function (status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				callback(null, result.json().map(function(itm){
					return itm.value;
				}));
			});
		},
		groups: function(callback){
			var url = subkit.baseUrl + '/users/groups';
			subkit.httpRequest.get(url,subkit.options,function (status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				var results = [];
				for(var idx in result.json()) results.push(idx);
				callback(null, results);
			});
		},
		register: function(username, password, callback){
			var url = subkit.baseUrl + '/users/actions/register';
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg['data'] = { 
				username: username,
				password: password
			};
			subkit.httpRequest.post(url, msg, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status!==201) return callback(result.json());
				callback(null, result.json());
			});
		},
		remove: function(key, callback){
			var url = subkit.baseUrl + '/users/' + key;
			subkit.httpRequest.del(url, subkit.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status!==204) return callback(result.json());
				callback(null, {message: 'Remove accepted'});
			});
		},
		set: function(key, account, callback){
			var url = subkit.baseUrl + '/users/' + key;
			var msg = JSON.parse(JSON.stringify(subkit.options));
			msg['data'] = account;
			subkit.httpRequest.put(url, msg, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status!==204) return callback(result.json());
				callback(null, {message: 'Change accepted'});
			});
		}
	};
};
},{}],11:[function(require,module,exports){
'use strict';

module.exports = function(config){
	var self = this;
	self.$q = require('q');
	self.user = require('./plugins/user')(self);
	self.file = require('./plugins/file')(self);
	self.task = require('./plugins/task')(self);
	self.template = require('./plugins/template')(self);
	self.email = require('./plugins/email')(self);
	self.flow = require('./plugins/flow')(self);
	self.geolocation = require('./plugins/geolocation')(self);
	self.baas = require('./plugins/baas')(self);
	
	self.UUID = function () {
		// http://www.ietf.org/rfc/rfc4122.txt
		var s = [];
		var hexDigits = '0123456789abcdef';
		for (var i = 0; i < 36; i++) {
		    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = '-';

		var uuid = s.join('');
		return uuid;
	};
	var getXhr = function (callback) {
		if (window.XMLHttpRequest) {
		  return callback(null, new XMLHttpRequest());
		} else if (window.ActiveXObject) {
		  try {
		    return callback(null, new ActiveXObject('Msxml2.XMLHTTP'));
		  } catch (e) {
		    return callback(null, new ActiveXObject('Microsoft.XMLHTTP'));
		  }
		}
		return callback(new Error());
	};
	var encodeUsingUrlEncoding = function (data) {
		if(typeof data === 'string') {
		  return data;
		}

		var result = [];
		for(var dataItem in data) {
		  if(data.hasOwnProperty(dataItem)) {
		    result.push(encodeURIComponent(dataItem) + '=' + encodeURIComponent(data[dataItem]));
		  }
		}

		return result.join('&');
	};
	var utf8 = function (text) {
		text = text.replace(/\r\n/g, '\n');
		var result = '';

		for(var i = 0; i < text.length; i++) {
		  var c = text.charCodeAt(i);

		  if(c < 128) {
		      result += String.fromCharCode(c);
		  } else if((c > 127) && (c < 2048)) {
		      result += String.fromCharCode((c >> 6) | 192);
		      result += String.fromCharCode((c & 63) | 128);
		  } else {
		      result += String.fromCharCode((c >> 12) | 224);
		      result += String.fromCharCode(((c >> 6) & 63) | 128);
		      result += String.fromCharCode((c & 63) | 128);
		  }
		}

		return result;
	};
	var base64 = function (text) {
		var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

		text = utf8(text);
		var result = '',
		    chr1, chr2, chr3,
		    enc1, enc2, enc3, enc4,
		    i = 0;

		do {
		  chr1 = text.charCodeAt(i++);
		  chr2 = text.charCodeAt(i++);
		  chr3 = text.charCodeAt(i++);

		  enc1 = chr1 >> 2;
		  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		  enc4 = chr3 & 63;

		  if(isNaN(chr2)) {
		    enc3 = enc4 = 64;
		  } else if(isNaN(chr3)) {
		    enc4 = 64;
		  }

		  result +=
		    keyStr.charAt(enc1) +
		    keyStr.charAt(enc2) +
		    keyStr.charAt(enc3) +
		    keyStr.charAt(enc4);
		  chr1 = chr2 = chr3 = '';
		  enc1 = enc2 = enc3 = enc4 = '';
		} while(i < text.length);

		return result;
	};
	var mergeHeaders = function () {
		var result = arguments[0];
		for(var i = 1; i < arguments.length; i++) {
		  var currentHeaders = arguments[i];
		  for(var header in currentHeaders) {
		    if(currentHeaders.hasOwnProperty(header)) {
		      result[header] = currentHeaders[header];
		    }
		  }
		}
		return result;
	};
	var ajax = function (method, url, options, callback, logCallback) {
		if(typeof options === 'function') {
		  callback = options;
		  options = {};
		}
		options.cache = options.cache || true;
		options.headers = options.headers || {};
		options.jsonp = options.jsonp || false;

		var headers = mergeHeaders({
		  'accept': '*/*',
		  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		  'x-auth-token': options.apiKey
		}, ajax.headers, options.headers);

		if(options.data) {
			var payload;
			if ((method === 'GET') && (headers['Content-Type'] === 'application/json')) {
			  payload = encodeUsingUrlEncoding(options.data);
			} 
			else if (headers['Content-Type'] === 'application/json') {
			  payload = JSON.stringify(options.data);
			} 
			else if(headers['Content-Type'].indexOf('application/octed-stream') !== -1){
			  payload = options.data;
			}
			else {
			  payload = encodeUsingUrlEncoding(options.data);      
			}
		}

		if(method === 'GET') {
		  var queryString = [];
		  if(payload) {
		    queryString.push(payload);
		    payload = null;
		  }

		  if(!options.cache) {
		    queryString.push('_=' + (new Date()).getTime());
		  }

		  if(options.jsonp) {
		    queryString.push('callback=' + options.jsonp);
		    queryString.push('jsonp=' + options.jsonp);
		  }

		  queryString = '?' + queryString.join('&');
		  url += queryString !== '?' ? queryString : '';

		  if(options.jsonp) {
		    var head = document.getElementsByTagName('head')[0];
		    var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.src = url;
		    head.appendChild(script);        
		    return;
		  }
		}
		var xhrRef = null;
		getXhr(function (err, xhr) {
			xhrRef = xhr;
		  if(err) return callback(err);
		  xhr.open(method, url, options.async || true);
		  for(var header in headers) {
		    if(headers.hasOwnProperty(header)) {
		      xhr.setRequestHeader(header, headers[header]);
		    }
		  }
		  xhr.onerror = function(){
			callback(xhr.status, {
				text: function () {
				  return xhr.statusText;
				}
			});
		  };
		  xhr.onreadystatechange = function () {
		    if(xhr.readyState === 4 && xhr.status !== 0) {
				var log = this.getResponseHeader('subkit-log');
				if(logCallback) logCallback(log);	

				if(!callback) return;
				var data = xhr.responseText || '';
				callback(xhr.status, {
					text: function () {
					  return data;
					},
					json: function () {
						if(data) return JSON.parse(data);
						return {};
					},
					headers: function(){
 						return xhr.getAllResponseHeaders();
  					}
				});
		    };
		  };

		  xhr.send(payload);
		});
		return xhrRef;
	};
	var httpRequest = {
		authBasic: function (username, password) {
		  httpRequest.headers({});
		  ajax.headers['Authorization'] = 'Basic ' + base64(username + ':' + password);
		},
		connect: function (url, options, callback, logCallback) {
		  return ajax('CONNECT', url, options, callback, logCallback);      
		},
		del: function (url, options, callback, logCallback) {
		  return ajax('DELETE', url, options, callback, logCallback);      
		},
		get: function (url, options, callback, logCallback) {
		  return ajax('GET', url, options, callback, logCallback);
		},
		head: function (url, options, callback, logCallback) {
		  return ajax('HEAD', url, options, callback, logCallback);
		},
		headers: function (headers) {
		  ajax.headers = headers || {};
		},
		isAllowed: function (url, verb, callback, logCallback) {
		  this.options(url, function (status, data) {
		    callback(data.text().indexOf(verb) !== -1);
		  }, logCallback);
		},
		options: function (url, options, callback, logCallback) {
		  return ajax('OPTIONS', url, options, callback, logCallback);
		},
		patch: function (url, options, callback, logCallback) {
		  return ajax('PATCH', url, options, callback, logCallback);      
		},
		post: function (url, options, callback, logCallback) {
		  return ajax('POST', url, options, callback, logCallback);      
		},
		put: function (url, options, callback, logCallback) {
		  return ajax('PUT', url, options, callback, logCallback);      
		},
		trace: function (url, options, callback, logCallback) {
		  return ajax('TRACE', url, options, callback, logCallback);
		}
	};

	var _init = function(clientId){
		var clientId = window.sessionStorage.getItem('clientId');
		if(!clientId) {
			clientId = self.UUID();
			window.sessionStorage.setItem('clientId', clientId);
		}
		return clientId;
	};
	self.clientId = config.clientId || _init();
	self.baseUrl = config.baseUrl || ((window.location.origin.indexOf('http') !== -1) ? window.location.origin : 'https://localhost:8080');
    self.options = { 
    	apiKey: config.apiKey || '',
    	username: config.username || '',
    	password: config.password || '',
    	headers : {
    		'Content-Type': 'application/json'
    	}
    };
	var statusListeners = [];
	self.subscribed = {};
	
	var _changeStatus = function(status){
		if(status.json) status = status.json();
		
		statusListeners.forEach(function(listener){
			listener(status);
		});
	};

	self.manage = {
		login: function(callback){
			var deferred = self.$q.defer();
			var url = self.baseUrl + '/manage/login';
			httpRequest.authBasic(self.options.username, self.options.password);
			httpRequest.post(url, self.options, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 200) deferred.reject(new Error('Authentication failed.'));
				else {
					self.options.apiKey = result.json().api.apiKey;
					var result = {
						apiKey: self.options.apiKey,
						username: self.options.username,
						password: self.options.password,
						baseUrl: self.baseUrl,
						devCenterUrl: self.baseUrl + '/devcenter/index'
					}
					deferred.resolve(result);
				}
			});
			return deferred.promise.nodeify(callback);
		},
		import: function(file, callback){
			var deferred = self.$q.defer();
			var msg = JSON.parse(JSON.stringify(self.options));
			msg.headers = {
			  'Content-Type': 'application/octed-stream',
			  apiKey: config.apiKey
			};
			msg['data'] = file;
			var url = self.baseUrl + '/manage/import';
			httpRequest.post(url, msg, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 201) deferred.reject(new Error(result.json().message));
				else deferred.resolve(result.json());
			});
			return deferred.promise.nodeify(callback);
		},
		export: function(callback){
			var deferred = self.$q.defer();
			var url = self.baseUrl + '/manage/export';
			httpRequest.get(url, self.options, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 200) deferred.reject(new Error(result.json().message));
				else deferred.resolve('data:application/octet-stream,' + result.text());
			});
			return deferred.promise.nodeify(callback);
		},
		backup: function(callback){
		},
		restore: function(name, callback){
		},
		acl:{
			list: function(identity, callback){
				var url = self.baseUrl + '/shares/';
				
				if(typeof identity === 'function'){
					url += 'identities';
					callback = identity;
				} else {
					url += identity;
				}

				httpRequest.get(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200) return callback(result.json());
					callback(null, result.json());
				});
			},
			set: function(key, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key);
				httpRequest.post(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 201) return callback(result.json());
					callback(null, result.json());
				});
			},
			remove: function(key, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key);
				httpRequest.del(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			grantWrite: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/grantwrite/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			grantDelete: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/grantdelete/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			grantRead: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/grantread/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			revokeWrite: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/revokewrite/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			revokeDelete: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/revokedelete/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			},
			revokeRead: function(key, identity, callback){
				var url = self.baseUrl + '/shares/' + encodeURIComponent(key) + '/actions/revokeread/' + identity;
				httpRequest.put(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 202) return callback(result.json());
					callback(null, result.json());
				});
			}
		},
		password: {
			set: function(oldPassword, newPassword, verifyPassword, callback){
				var deferred = self.$q.defer();
				var url = self.baseUrl + '/manage/password/actions/reset';
				var msg = JSON.parse(JSON.stringify(self.options));
				msg['data'] = {
					password: oldPassword,
					newPassword: newPassword,
					newPasswordValidation: verifyPassword
				};
				httpRequest.put(url, msg, function(status, result){
					if (status === 0) deferred.reject(new Error('No network connection.'));
					else if (status !== 200 && status !== 202) deferred.reject(new Error(result.json().message));
					else deferred.resolve(result.json());
				});
				return deferred.promise.nodeify(callback);
			}
		},
		user: {
			set: function(username, callback){
				var deferred = self.$q.defer();
				var url = self.baseUrl + '/manage/user';
				var msg = JSON.parse(JSON.stringify(self.options));
				msg['data'] = {
					username: username
				};
				httpRequest.put(url, msg, function(status, result){
					if (status === 0) deferred.reject(new Error('No network connection.'));
					else if (status !== 200 && status !== 202) deferred.reject(new Error(result.json().message));
					else deferred.resolve(result.json());
				});
				return deferred.promise.nodeify(callback);
			}
		},
		apikey: {
			reset: function(callback){
				var deferred = self.$q.defer();
				var url = self.baseUrl + '/manage/apikey/actions/reset';
				httpRequest.put(url, self.options, function(status, result){
					if (status === 0) deferred.reject(new Error('No network connection.'));
					else if (status !== 200 && status !== 202) deferred.reject(new Error(result.json().message));
					else deferred.resolve(result.json());
				});
				return deferred.promise.nodeify(callback);
			}
		},
		certificate:{
			get: function(callback){
				var deferred = self.$q.defer();
				var url = self.baseUrl + '/manage/certificate';
				httpRequest.get(url, self.options, function(status, result){
					if (status === 0) deferred.reject(new Error('No network connection.'));
					else if (status !== 200) deferred.reject(new Error(result.json().message));
					else deferred.resolve(result.json());
				});
				return deferred.promise.nodeify(callback);
			},
			set: function(certificate, key, callback){
				var deferred = self.$q.defer();
				var url = self.baseUrl + '/manage/certificate/actions/change';
				var msg = JSON.parse(JSON.stringify(self.options));
				msg['data'] = {
					certificate: certificate,
					key: key
				};
				httpRequest.put(url, msg, function(status, result){
					if (status === 0) deferred.reject(new Error('No network connection.'));
					else if (status !== 200 && status !== 202) deferred.reject(new Error(result.json().message));
					else deferred.resolve(result.json());
				});
				return deferred.promise.nodeify(callback);
			}
		},
		status: {
			get: function(callback){
				var deferred = self.$q.defer();
				var url = self.baseUrl + '/manage/os';
				httpRequest.get(url, self.options, function(status, result){
					if (status === 0) deferred.reject(new Error('No network connection.'));
					else if (status !== 200) deferred.reject(new Error(result.json().message));
					else deferred.resolve(result.json());
				});
				return deferred.promise.nodeify(callback);
			}
		},
		run: function(taskName,value,callback){
			var deferred = self.$q.defer();
			var url = self.baseUrl + '/task/run/'+taskName;
			var msg = JSON.parse(JSON.stringify(self.options));
			msg['data'] = value;
			httpRequest.get(url, self.options, function(status, result){
				if (status === 0) deferred.reject(new Error('No network connection.'));
				else if (status !== 200) deferred.reject(new Error(result.json().message));
				else deferred.resolve(result.json());
			});
			return deferred.promise.nodeify(callback);
  		}
	};
	self.store = function(store){
		var _prepareUrl = function(key){
			if(store && !key) return self.baseUrl + '/stores/' + store;
			if(store && key) return self.baseUrl + '/stores/' + store + '/' + key;
			if(!store && key && key.indexOf('!') !== -1) {
				key = key.replace(/^[a-zA-z0-9]\/\//, '!');
				return self.baseUrl + '/stores/' + key;
			}
			if(!store && key) return self.baseUrl + '/stores/' + key;
			return self.baseUrl + '/stores';
		};
		var Continuation = function(){
			var self = this;
			self.doneResult = function(){};
			self.errorResult = function(){};
			self.done = function(callback){
				self.doneResult = callback;
				return self;
			};
			self.error = function(callback){
				self.errorResult = callback;
				return self;
			};
		};
		var pollingRequestRef = null;

		var ref = {
			key: function(){
				return self.UUID();
			},
			import: function(file, callback){
				var msg = JSON.parse(JSON.stringify(self.options));
				msg.headers = {
					'Content-Type': 'application/octed-stream',
					apiKey: config.apiKey
				};
				msg['data'] = file;
				var url = self.baseUrl + '/manage/import/' + store;
				httpRequest.post(url, msg, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 201) return callback(result.json());
					callback(null, result.json());
				});
			},
			export: function(callback){
				var url = self.baseUrl + '/manage/export/' + store;
				httpRequest.get(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200) return callback(result.json());
					callback(null, 'data:application/octet-stream,' + result.text());
				});
			},
			set: function(key, value, callback){
				var key = arguments[0];
				var value = arguments[1];

				if(arguments.length == 1 && key instanceof Object){
					value = key;
					key = self.UUID()
				}
				var url = _prepareUrl(key);
				var continueWith = new Continuation();
				var msg = JSON.parse(JSON.stringify(self.options));
				msg['data'] = value;
				
				httpRequest.post(url, msg, function(status, result){
					if(status!==200 && status!==201) {
						continueWith.errorResult(result.text());
						_changeStatus(result.text());
						if(callback) callback(result.text());
					}else{
						continueWith.doneResult(result.json());
						if(callback) callback(null, result.json());
					}
				});
				return continueWith;
			},
			get: function(key, callback){
				var continueWith = new Continuation();
				httpRequest.get(_prepareUrl(key), self.options, function(status, result){
					if(status===0 && status!==200) {
						continueWith.errorResult(result.text());
						_changeStatus(result.text());
						if(callback) callback(result.text());
					}else{
						continueWith.doneResult(result.json());
						if(callback) callback(null, result.json());
					}
				});
				return continueWith;
			},
			remove: function(key, callback){
				var continueWith = new Continuation();
				httpRequest.del(_prepareUrl(key), self.options, function(status, result){
					if(status!==200 && status!==202) {
						continueWith.errorResult(result.text());
						_changeStatus(result.text());
						if(callback) callback(result.text());
					}else{
						continueWith.doneResult(result.json());
						if(callback) callback(null, result.json());
					}
				});
				return continueWith;
			},
			history: function(callback){
				var continueWith = new Continuation();
				var result = [];
				continueWith.doneResult(result);
				if(callback) callback(null, result);
				return ref;
			},
			on: function(callback){
				if(self.subscribed[store] && pollingRequestRef) {
					pollingRequestRef().abort();
				}
				self.subscribed[store] = true;
				pollingRequestRef = _poll(store, self.clientId, callback);
				_changeStatus('subscribed to ' + store);	
				return ref;
			},
			off: function(){
				delete self.subscribed[store];
				if(pollingRequestRef) pollingRequestRef().abort();
				_changeStatus('unsubscribed from ' + store);	
				return ref;
			}
		};
		return ref;
	};
	self.notify = {
		upload: function(provider, env, file, callback){
			var msg = JSON.parse(JSON.stringify(self.options));
			msg.headers = {
			  'Content-Type': 'application/octed-stream',
			  apiKey: config.apiKey
			};
			msg['data'] = file;
			var url = self.baseUrl + '/push/upload/' + provider + '/' + env;
			httpRequest.post(url, msg, function(status, result){
				if(status!==201) {
					if(callback) _changeStatus(result);
				}else{
					if(callback) callback();
				}
			});
		},
		send: function(value, callback){
			var url = self.baseUrl + '/push/send';
			var msg = JSON.parse(JSON.stringify(self.options));
			msg['data'] = value;
			httpRequest.post(url, msg, function(status, result){
				if(status!==200 && status!==201) {
					if(callback) _changeStatus(result);
				}else{
					if(callback) callback(null, result.json());
				}
			});
		},
		settings: {
			load: function(callback){
				_get('/push/settings', callback);
			},
			save: function(value, callback){
				var url = self.baseUrl + '/push/settings';
				var msg = JSON.parse(JSON.stringify(self.options));
				msg['data'] = value;
				httpRequest.put(url, msg, function(status, result){
					if(status!==200 && status!==201) {
						if(callback) _changeStatus(result);
					}else{
						if(callback) callback(null, result.json());
					}
				});
			}
		}
	};
	self.pubsub = {
		channels: function(callback){
			var url = self.baseUrl + '/pubsub/channels';
			httpRequest.get(url, self.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				callback(null, result.json());
			});
		},
		push: function(channel, value, callback){
			var url = self.baseUrl + '/pubsub/channel/publish/' + channel;
			var msg = JSON.parse(JSON.stringify(self.options));
			msg['data'] = value;
			httpRequest.post(url, msg, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				callback(null, result.json());
			});
		},
		on: function(channel, callback) {
			channel = channel.replace('/', '_');
			self.subscribed[channel] = true;
			_changeStatus('subscribed to ' + channel);
			var pollingRequestRef = _poll(channel, self.clientId, callback);
			return {
				off: function(){
					delete self.subscribed[channel];
					if(pollingRequestRef) pollingRequestRef().abort();
					_changeStatus('unsubscribed from ' + channel);	
				},
				push: function(value, callback){
					self.pubsub.push(channel, value, callback);
				}
			}
		}
	};
	self.statistics = {
		minutes: function(callback){
			var url = self.baseUrl + '/statistics/minutes';
			httpRequest.get(url, self.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				callback(null, result.json());
			});
		},
		summary: function(callback){
			var url = self.baseUrl + '/statistics/summary';
			httpRequest.get(url, self.options, function(status, result){
				if(!callback) return;
				if(status === 0) return callback({message: 'No network connection.'});
				if(status !== 200) return callback(result.json());
				callback(null, result.json());
			});
		}
	};
	self.plugin = {
		list: function(callback){
			var url = self.baseUrl + '/plugin';
			httpRequest.get(url, self.options, function(status, result){
				if(status !== 200) {
					if(callback) callback(result.json());
				}else{
					if(callback) callback(null, result.json());
				}
			});
		}
	};
	if(!self.task){
		self.task = {
			run: function(taskName,value,callback){
				var url = self.baseUrl + '/task/run/'+taskName;
				var msg = JSON.parse(JSON.stringify(self.options));
				msg['data'] = value;
				httpRequest.get(url, self.options, function(status, result){
					if(!callback) return;
					if(status === 0) return callback({message: 'No network connection.'});
					if(status !== 200) return callback(result.json());
					callback(null, result.json());
				});
			}
		};
	}
	self.httpRequest = httpRequest;
	
	var _get = function(path, callback){
		var url = self.baseUrl + path;
		httpRequest.get(url, self.options, function(status, result){
			if(!callback) return;
			if(status === 0) return callback({message: 'No network connection.'});
			if(status !== 200) return callback(result.json());
			callback(null, result.json());
		});		
	};
	var _poll = function(channel, clientId, callback) {
		var subscribeUrl = self.baseUrl + '/pubsub/subscribe/' + channel + '/' + clientId;
		var request = null;
		var count = 1;

		(function _pollRef(){
			request = httpRequest.get(subscribeUrl, self.options, function(status, result){
				if(status !== 200) {
					if(self.subscribed[channel]){
						callback({message: 'subscription error - retry'});
						setTimeout(function(){_pollRef(channel, clientId, callback);},300*count++);
					}
				}else{
					count = 1;
					result.json().forEach(function(item){
						callback(null, item.value);
					});
					if(self.subscribed[channel]) _pollRef(channel, clientId, callback);
				}
			});
		})();

		return function(){
			return request;
		};
	};


};
},{"./plugins/baas":3,"./plugins/email":4,"./plugins/file":5,"./plugins/flow":6,"./plugins/geolocation":7,"./plugins/task":8,"./plugins/template":9,"./plugins/user":10,"q":2}]},{},[11])
(11)
});
;