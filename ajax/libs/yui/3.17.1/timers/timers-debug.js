/*
YUI 3.17.1 (build 0eb5a52)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('timers', function (Y, NAME) {

/**
Provides utilities for timed asynchronous callback execution.
Y.soon is a setImmediate/process.nextTick/setTimeout wrapper.

This module includes [asap.js](https://github.com/kriskowal/asap) for scheduling
asynchronous tasks.

@module timers
@author Steven Olmsted
**/

// Hack. asap.js is written as a Node module and expects require, module and
// global to be available in the module's scope.
var module = {},
    global = Y.config.global;

// `asap` only requires a `queue` module that is bundled into this same file.
function require(mod) {
    return Queue;
}
"use strict";

module.exports = Queue;
function Queue(capacity) {
    this.capacity = this.snap(capacity);
    this.length = 0;
    this.front = 0;
    this.initialize();
}

Queue.prototype.push = function (value) {
    var length = this.length;
    if (this.capacity <= length) {
        this.grow(this.snap(this.capacity * this.growFactor));
    }
    var index = (this.front + length) & (this.capacity - 1);
    this[index] = value;
    this.length = length + 1;
};

Queue.prototype.shift = function () {
    var front = this.front;
    var result = this[front];

    this[front] = void 0;
    this.front = (front + 1) & (this.capacity - 1);
    this.length--;
    return result;
};

Queue.prototype.grow = function (capacity) {
    var oldFront = this.front;
    var oldCapacity = this.capacity;
    var oldQueue = new Array(oldCapacity);
    var length = this.length;

    copy(this, 0, oldQueue, 0, oldCapacity);
    this.capacity = capacity;
    this.initialize();
    this.front = 0;
    if (oldFront + length <= oldCapacity) {
        // Can perform direct linear copy
        copy(oldQueue, oldFront, this, 0, length);
    } else {
        // Cannot perform copy directly, perform as much as possible at the
        // end, and then copy the rest to the beginning of the buffer
        var lengthBeforeWrapping =
            length - ((oldFront + length) & (oldCapacity - 1));
        copy(
            oldQueue,
            oldFront,
            this,
            0,
            lengthBeforeWrapping
        );
        copy(
            oldQueue,
            0,
            this,
            lengthBeforeWrapping,
            length - lengthBeforeWrapping
        );
    }
};

Queue.prototype.initialize = function () {
    var length = this.capacity;
    for (var i = 0; i < length; ++i) {
        this[i] = void 0;
    }
};

Queue.prototype.snap = function (capacity) {
    if (typeof capacity !== "number") {
        return this.minCapacity;
    }
    return pow2AtLeast(
        Math.min(this.maxCapacity, Math.max(this.minCapacity, capacity))
    );
};

Queue.prototype.maxCapacity = (1 << 30) | 0;
Queue.prototype.minCapacity = 16;
Queue.prototype.growFactor = 8;

function copy(source, sourceIndex, target, targetIndex, length) {
    for (var index = 0; index < length; ++index) {
        target[index + targetIndex] = source[index + sourceIndex];
    }
}

function pow2AtLeast(n) {
    n = n >>> 0;
    n = n - 1;
    n = n | (n >> 1);
    n = n | (n >> 2);
    n = n | (n >> 4);
    n = n | (n >> 8);
    n = n | (n >> 16);
    return n + 1;
}
"use strict";

// Use the fastest possible means to execute a task in a future turn
// of the event loop.

// Queue is a circular buffer with good locality of reference and doesn't
// allocate new memory unless there are more than `InitialCapacity` parallel
// tasks in which case it will resize itself generously to x8 more capacity.
// The use case of asap should require no or few amount of resizes during
// runtime.
// Calling a task frees a slot immediately so if the calling
// has a side effect of queuing itself again, it can be sustained
// without additional memory
// Queue specifically uses
// http://en.wikipedia.org/wiki/Circular_buffer#Use_a_Fill_Count
// Because:
// 1. We need fast .length operation, since queue
//   could have changed after every iteration
// 2. Modulus can be negated by using power-of-two
//   capacities and replacing it with bitwise AND
// 3. It will not be used in a multi-threaded situation.

var Queue = require("./queue");

//1024 = InitialCapacity
var queue = new Queue(1024);
var flushing = false;
var requestFlush = void 0;
var hasSetImmediate = typeof setImmediate === "function";
var domain;

// Avoid shims from browserify.
// The existence of `global` in browsers is guaranteed by browserify.
var process = global.process;

// Note that some fake-Node environments,
// like the Mocha test runner, introduce a `process` global.
var isNodeJS = !!process && ({}).toString.call(process) === "[object process]";

function flush() {
    /* jshint loopfunc: true */

    while (queue.length > 0) {
        var task = queue.shift();

        try {
            task.call();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them to interrupt flushing!

                // Ensure continuation if an uncaught exception is suppressed
                // listening process.on("uncaughtException") or domain("error").
                requestFlush();

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }
    }

    flushing = false;
}

if (isNodeJS) {
    // Node.js
    requestFlush = function () {
        // Ensure flushing is not bound to any domain.
        var currentDomain = process.domain;
        if (currentDomain) {
            domain = domain || (1,require)("domain");
            domain.active = process.domain = null;
        }

        // Avoid tick recursion - use setImmediate if it exists.
        if (flushing && hasSetImmediate) {
            setImmediate(flush);
        } else {
            process.nextTick(flush);
        }

        if (currentDomain) {
            domain.active = process.domain = currentDomain;
        }
    };

} else if (hasSetImmediate) {
    // In IE10, or https://github.com/NobleJS/setImmediate
    requestFlush = function () {
        setImmediate(flush);
    };

} else if (typeof MessageChannel !== "undefined") {
    // modern browsers
    // http://www.nonblocking.io/2011/06/windownexttick.html
    var channel = new MessageChannel();
    // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
    // working message ports the first time a page loads.
    channel.port1.onmessage = function () {
        requestFlush = requestPortFlush;
        channel.port1.onmessage = flush;
        flush();
    };
    var requestPortFlush = function () {
        // Opera requires us to provide a message payload, regardless of
        // whether we use it.
        channel.port2.postMessage(0);
    };
    requestFlush = function () {
        setTimeout(flush, 0);
        requestPortFlush();
    };

} else {
    // old browsers
    requestFlush = function () {
        setTimeout(flush, 0);
    };
}

function asap(task) {
    if (isNodeJS && process.domain) {
        task = process.domain.bind(task);
    }

    queue.push(task);

    if (!flushing) {
        requestFlush();
        flushing = true;
    }
};

module.exports = asap;
/**
Y.soon accepts a callback function.  The callback function will be called
once in a future turn of the JavaScript event loop.  If the function
requires a specific execution context or arguments, wrap it with Y.bind.
Y.soon returns an object with a cancel method.  If the cancel method is
called before the callback function, the callback function won't be
called.

@method soon
@for YUI
@param {Function} callbackFunction
@return {Object} An object with a cancel method.  If the cancel method is
    called before the callback function, the callback function won't be
    called.
**/
function soon(callbackFunction) {
    var canceled;

    soon._asynchronizer(function () {
        // Some asynchronizers may provide their own cancellation
        // methods such as clearImmediate or clearTimeout but some
        // asynchronizers do not.  For simplicity, cancellation is
        // entirely handled here rather than wrapping the other methods.
        // All asynchronizers are expected to always call this anonymous
        // function.
        if (!canceled) {
            callbackFunction();
        }
    });

    return {
        cancel: function () {
            canceled = 1;
        }
    };
}

soon._asynchronizer = asap;
soon._impl = 'asap';

Y.soon = soon;


}, '3.17.1', {"requires": ["yui-base"]});
