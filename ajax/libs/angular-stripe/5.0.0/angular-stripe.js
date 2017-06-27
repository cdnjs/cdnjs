(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularStripe = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict'

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)

module.exports = angular.module('assert-q-constructor', [])
  .factory('assertQConstructor', main)
  .name

main.$inject = ['$q']
function main ($q) {
  return function assertQConstructor (message) {
    if (typeof $q !== 'function') {
      throw new Error(message || '$q is not a function')
    }
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
(function (global){
'use strict'

var promisify = _dereq_('./promisify')

module.exports = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)
  .module('promisify', [])
  .service('promisify', promisify)
  .name

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./promisify":3}],3:[function(_dereq_,module,exports){
(function (global){
'use strict'

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)
var assertFn = _dereq_('assert-function')
var toArray = _dereq_('to-array')

module.exports = promisify$Q

promisify$Q.$inject = ['$q', '$rootScope']
function promisify$Q ($q, $rootScope) {
  function promisify (callback, receiver) {
    receiver = receiver || {}

    if (typeof callback === 'string') {
      callback = receiver[callback]
    }

    assertFn(callback)

    function promisifed () {
      var args = arguments
      return $q(function (resolve, reject) {
        var apply = $rootScope.$apply.bind($rootScope)
        try {
          callback.apply(receiver, toArray(args).concat(Nodeback(apply, resolve, reject)))
        } catch (err) {
          setTimeout(function () {
            apply(function () {
              reject(err)
            })
          })
        }
      })
    }
    promisifed.__isPromisifed__ = true
    return promisifed
  }

  function promisifyAll (object) {
    return angular.forEach(object, function (value, key) {
      key = key + 'Async'
      if (!value || typeof value !== 'function' || value.__isPromisifed__) return
      object[key] = promisify(value, object)
    })
  }

  return angular.extend(promisify, {
    promisifyAll: promisifyAll
  })
}

function Nodeback (apply, resolve, reject) {
  return function nodeback (err, value) {
    var args = arguments
    apply(function () {
      if (err) {
        return reject(err)
      }

      if (args.length <= 2) {
        return resolve(value)
      }

      resolve(toArray(args, 1))
    })
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"assert-function":10,"to-array":31}],4:[function(_dereq_,module,exports){
/*!
 * array-last <https://github.com/jonschlinkert/array-last>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

var isNumber = _dereq_('is-number');
var slice = _dereq_('array-slice');

module.exports = function last(arr, num) {
  if (!Array.isArray(arr)) {
    throw new Error('array-last expects an array as the first argument.');
  }

  if (arr.length === 0) {
    return null;
  }

  var res = slice(arr, arr.length - (isNumber(num) ? +num : 1));
  if (+num === 1 || num == null) {
    return res[0];
  }
  return res;
};

},{"array-slice":6,"is-number":5}],5:[function(_dereq_,module,exports){
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

module.exports = function isNumber(n) {
  return !!(+n) || n === 0 || n === '0';
};

},{}],6:[function(_dereq_,module,exports){
/*!
 * array-slice <https://github.com/jonschlinkert/array-slice>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function slice(arr, start, end) {
  var len = arr.length >>> 0;
  var range = [];

  start = idx(arr, start);
  end = idx(arr, end, len);

  while (start < end) {
    range.push(arr[start++]);
  }
  return range;
};


function idx(arr, pos, end) {
  var len = arr.length >>> 0;

  if (pos == null) {
    pos = end || 0;
  } else if (pos < 0) {
    pos = Math.max(len + pos, 0);
  } else {
    pos = Math.min(pos, len);
  }

  return pos;
}
},{}],7:[function(_dereq_,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = _dereq_("./raw");
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};

},{"./raw":8}],8:[function(_dereq_,module,exports){
(function (global){
"use strict";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(_dereq_,module,exports){
'use strict'

var assert = _dereq_('assert-ok')
var format = _dereq_('simple-format')
var print = _dereq_('print-value')

module.exports = function assertEqual (a, b) {
  assert(a === b, format('expected `%s` to equal `%s`', print(a), print(b)))
}

},{"assert-ok":11,"print-value":27,"simple-format":29}],10:[function(_dereq_,module,exports){
'use strict'

module.exports = function assertFunction (value) {
  if (typeof value !== 'function') {
    throw new TypeError('Expected function, got: ' + value)
  }
}

},{}],11:[function(_dereq_,module,exports){
'use strict'

module.exports = function assertOk (value, message) {
  if (!value) {
    throw new Error(message || 'Expected true, got ' + value)
  }
}

},{}],12:[function(_dereq_,module,exports){
'use strict'

var toArray = _dereq_('to-array')

module.exports = CallAll

function CallAll (fns) {
  fns = Array.isArray(fns) ? fns : toArray(arguments)
  return function callAll () {
    var args = arguments
    return fns.map(function (fn) {
      return fn.apply(null, args)
    })
  }
}

},{"to-array":31}],13:[function(_dereq_,module,exports){
/**
 * cuid.js
 * Collision-resistant UID generator for browsers and node.
 * Sequential for fast db lookups and recency sorting.
 * Safe for element IDs and server-side lookups.
 *
 * Extracted from CLCTR
 *
 * Copyright (c) Eric Elliott 2012
 * MIT License
 */

/*global window, navigator, document, require, process, module */
(function (app) {
  'use strict';
  var namespace = 'cuid',
    c = 0,
    blockSize = 4,
    base = 36,
    discreteValues = Math.pow(base, blockSize),

    pad = function pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length-size);
    },

    randomBlock = function randomBlock() {
      return pad((Math.random() *
            discreteValues << 0)
            .toString(base), blockSize);
    },

    safeCounter = function () {
      c = (c < discreteValues) ? c : 0;
      c++; // this is not subliminal
      return c - 1;
    },

    api = function cuid() {
      // Starting with a lowercase letter makes
      // it HTML element ID friendly.
      var letter = 'c', // hard-coded allows for sequential access

        // timestamp
        // warning: this exposes the exact date and time
        // that the uid was created.
        timestamp = (new Date().getTime()).toString(base),

        // Prevent same-machine collisions.
        counter,

        // A few chars to generate distinct ids for different
        // clients (so different computers are far less
        // likely to generate the same id)
        fingerprint = api.fingerprint(),

        // Grab some more chars from Math.random()
        random = randomBlock() + randomBlock();

        counter = pad(safeCounter().toString(base), blockSize);

      return  (letter + timestamp + counter + fingerprint + random);
    };

  api.slug = function slug() {
    var date = new Date().getTime().toString(36),
      counter,
      print = api.fingerprint().slice(0,1) +
        api.fingerprint().slice(-1),
      random = randomBlock().slice(-2);

      counter = safeCounter().toString(36).slice(-4);

    return date.slice(-2) +
      counter + print + random;
  };

  api.globalCount = function globalCount() {
    // We want to cache the results of this
    var cache = (function calc() {
        var i,
          count = 0;

        for (i in window) {
          count++;
        }

        return count;
      }());

    api.globalCount = function () { return cache; };
    return cache;
  };

  api.fingerprint = function browserPrint() {
    return pad((navigator.mimeTypes.length +
      navigator.userAgent.length).toString(36) +
      api.globalCount().toString(36), 4);
  };

  // don't change anything from here down.
  if (app.register) {
    app.register(namespace, api);
  } else if (typeof module !== 'undefined') {
    module.exports = api;
  } else {
    app[namespace] = api;
  }

}(this.applitude || this));

},{}],14:[function(_dereq_,module,exports){
var wrappy = _dereq_('wrappy')
module.exports = wrappy(dezalgo)

var asap = _dereq_('asap')

function dezalgo (cb) {
  var sync = true
  asap(function () {
    sync = false
  })

  return function zalgoSafe() {
    var args = arguments
    var me = this
    if (sync)
      asap(function() {
        cb.apply(me, args)
      })
    else
      cb.apply(me, args)
  }
}

},{"asap":7,"wrappy":32}],15:[function(_dereq_,module,exports){
'use strict';
var isObj = _dereq_('is-obj');

module.exports.get = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return obj;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		var descriptor = Object.getOwnPropertyDescriptor(obj, pathArr[i]) || Object.getOwnPropertyDescriptor(Object.prototype, pathArr[i]);
		if (descriptor && !descriptor.enumerable) {
			return;
		}

		obj = obj[pathArr[i]];

		if (obj === undefined || obj === null) {
			// `obj` is either `undefined` or `null` so we want to stop the loop, and
			// if this is not the last bit of the path, and
			// if it did't return `undefined`
			// it would return `null` if `obj` is `null`
			// but we want `get({foo: null}, 'foo.bar')` to equal `undefined` not `null`
			if (i !== pathArr.length - 1) {
				return undefined;
			}

			break;
		}
	}

	return obj;
};

module.exports.set = function (obj, path, value) {
	if (!isObj(obj) || typeof path !== 'string') {
		return;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		if (!isObj(obj[p])) {
			obj[p] = {};
		}

		if (i === pathArr.length - 1) {
			obj[p] = value;
		}

		obj = obj[p];
	}
};

module.exports.delete = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		if (i === pathArr.length - 1) {
			delete obj[p];
			return;
		}

		obj = obj[p];
	}
};

module.exports.has = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return false;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		obj = obj[pathArr[i]];

		if (obj === undefined) {
			return false;
		}
	}

	return true;
};

function getPathSegments(path) {
	var pathArr = path.split('.');
	var parts = [];

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
			p = p.slice(0, -1) + '.';
			p += pathArr[++i];
		}

		parts.push(p);
	}

	return parts;
}

},{"is-obj":18}],16:[function(_dereq_,module,exports){
'use strict'

var assertFn = _dereq_('assert-function')

module.exports = Ear

function Ear () {
  var callbacks = []

  function listeners () {
    var args = arguments
    var i = 0
    var length = callbacks.length
    for (; i < length; i++) {
      var callback = callbacks[i]
      callback.apply(null, args)
    }
  }

  listeners.add = function (listener) {
    assertFn(listener)
    callbacks.push(listener)
    return function remove () {
      var i = 0
      var length = callbacks.length
      for (; i < length; i++) {
        if (callbacks[i] === listener) {
          callbacks.splice(i, 1)
          return
        }
      }
    }
  }

  return listeners
}

},{"assert-function":10}],17:[function(_dereq_,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],18:[function(_dereq_,module,exports){
'use strict';
module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};

},{}],19:[function(_dereq_,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],20:[function(_dereq_,module,exports){
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isArray = _dereq_('isarray');

module.exports = function isObject(o) {
  return o != null && typeof o === 'object' && !isArray(o);
};

},{"isarray":19}],21:[function(_dereq_,module,exports){
exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

},{}],22:[function(_dereq_,module,exports){
'use strict'

var assert = _dereq_('assert-ok')
var assertEqual = _dereq_('assert-equal')
var dot = _dereq_('dot-prop')
var toArray = _dereq_('to-array')
var last = _dereq_('array-last')
var dezalgo = _dereq_('dezalgo')
var all = _dereq_('call-all-fns')

module.exports = Lazy

function Lazy (methods, load) {
  assert(Array.isArray(methods), 'methods are required')
  assertEqual(typeof load, 'function', 'load fn is required')

  var api = null
  var error = null
  var queue = []

  load(function (err, lib) {
    error = err
    api = lib
    all(queue)(err, lib)
    queue = null
  })

  return methods.reduce(function (lazy, method) {
    dot.set(lazy, method, Deferred(method))
    return lazy
  }, {})

  function Deferred (method) {
    return function deferred () {
      var args = arguments
      onReady(function (err, api) {
        if (!err) return dot.get(api, method).apply(null, args)
        var callback = last(toArray(args))
        if (typeof callback === 'function') {
          return callback(err)
        }
      })
    }
  }

  function onReady (callback) {
    callback = dezalgo(callback)

    if (api || error) return callback(error, api)
    queue.push(callback)
  }
}

},{"array-last":4,"assert-equal":9,"assert-ok":11,"call-all-fns":12,"dezalgo":14,"dot-prop":23,"to-array":31}],23:[function(_dereq_,module,exports){
'use strict';
var isObj = _dereq_('is-obj');

module.exports.get = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return obj;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		obj = obj[pathArr[i]];

		if (obj === undefined) {
			break;
		}
	}

	return obj;
};

module.exports.set = function (obj, path, value) {
	if (!isObj(obj) || typeof path !== 'string') {
		return;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		if (!isObj(obj[p])) {
			obj[p] = {};
		}

		if (i === pathArr.length - 1) {
			obj[p] = value;
		}

		obj = obj[p];
	}
};

module.exports.delete = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		if (i === pathArr.length - 1) {
			delete obj[p];
			return;
		}

		obj = obj[p];
	}
};

module.exports.has = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return false;
	}

	var pathArr = getPathSegments(path);

	for (var i = 0; i < pathArr.length; i++) {
		obj = obj[pathArr[i]];

		if (obj === undefined) {
			return false;
		}
	}

	return true;
};

function getPathSegments(path) {
	var pathArr = path.split('.');
	var parts = [];

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		while (p[p.length - 1] === '\\') {
			p = p.slice(0, -1) + '.';
			p += pathArr[++i];
		}

		parts.push(p);
	}

	return parts;
}

},{"is-obj":18}],24:[function(_dereq_,module,exports){
'use strict'

var load = _dereq_('load-script')
var window = _dereq_('global/window')
var extend = _dereq_('xtend')
var assert = _dereq_('assert-ok')
var dezalgo = _dereq_('dezalgo')
var Listeners = _dereq_('ear')
var extendQuery = _dereq_('query-extend')
var cuid = _dereq_('cuid')

module.exports = loadGlobal

var listeners = {}

function loadGlobal (options, callback) {
  assert(options, 'options required')
  assert(options.url, 'url required')
  assert(options.global, 'global required')
  assert(callback, 'callback required')

  options = extend(options)
  callback = dezalgo(callback)

  if (getGlobal(options)) {
    return callback(null, getGlobal(options))
  }

  callback = cache(options, callback)
  if (!callback) return

  if (options.jsonp) {
    var id = jsonpCallback(options, callback)
    options.url = extendQuery(options.url, {callback: id})
  }

  load(options.url, options, function (err) {
    if (err) return callback(err)
    if (!options.jsonp) {
      var library = getGlobal(options)
      if (!library) return callback(new Error('expected: `window.' + options.global + '`, actual: `' + library + '`'))
      callback(null, library)
    }
  })
}

function cache (options, callback) {
  if (!get()) {
    set(Listeners())
    get().add(callback)
    return function onComplete (err, lib) {
      get()(err, lib)
      set(Listeners())
    }
  }

  get().add(callback)
  return undefined

  function get () {
    return listeners[options.global]
  }

  function set (value) {
    listeners[options.global] = value
  }
}

function getGlobal (options) {
  return window[options.global]
}

function jsonpCallback (options, callback) {
  var id = cuid()
  window[id] = function jsonpCallback () {
    callback(null, getGlobal(options))
    delete window[id]
  }
  return id
}

},{"assert-ok":11,"cuid":13,"dezalgo":14,"ear":16,"global/window":17,"load-script":25,"query-extend":28,"xtend":33}],25:[function(_dereq_,module,exports){

module.exports = function load (src, opts, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}
  cb = cb || function() {}

  script.type = opts.type || 'text/javascript'
  script.charset = opts.charset || 'utf8';
  script.async = 'async' in opts ? !!opts.async : true
  script.src = src

  if (opts.attrs) {
    setAttributes(script, opts.attrs)
  }

  if (opts.text) {
    script.text = '' + opts.text
  }

  var onend = 'onload' in script ? stdOnEnd : ieOnEnd
  onend(script, cb)

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script)
}

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd (script, cb) {
  script.onload = function () {
    this.onerror = this.onload = null
    cb(null, script)
  }
  script.onerror = function () {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null
    cb(new Error('Failed to load ' + this.src), script)
  }
}

function ieOnEnd (script, cb) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded') return
    this.onreadystatechange = null
    cb(null, script) // there is no way to catch loading errors in IE8
  }
}

},{}],26:[function(_dereq_,module,exports){
'use strict';

module.exports = function split(str) {
    var a = 1,
        res = '';

    var parts = str.split('%'),
        len = parts.length;

    if (len > 0) { res += parts[0]; }

    for (var i = 1; i < len; i++) {
        if (parts[i][0] === 's' || parts[i][0] === 'd') {
            var value = arguments[a++];
            res += parts[i][0] === 'd' ? Math.floor(value) : value;
        } else if (parts[i][0]) {
            res += '%' + parts[i][0];
        } else {
            i++;
            res += '%' + parts[i][0];
        }

        res += parts[i].substring(1);
    }

    return res;
};

},{}],27:[function(_dereq_,module,exports){
'use strict'

var isObject = _dereq_('isobject')
var safeStringify = _dereq_('json-stringify-safe')

module.exports = function print (value) {
  var toString = isJson(value) ? stringify : String
  return toString(value)
}

function isJson (value) {
  return isObject(value) || Array.isArray(value)
}

function stringify (value) {
  return safeStringify(value, null, '')
}

},{"isobject":20,"json-stringify-safe":21}],28:[function(_dereq_,module,exports){
!function(glob) {

  var queryToObject = function(query) {
    var obj = {};
    if (!query) return obj;
    each(query.split('&'), function(val) {
      var pieces = val.split('=');
      var key = parseKey(pieces[0]);
      var keyDecoded = decodeURIComponent(key.val);
      var valDecoded = pieces[1] && decodeURIComponent(pieces[1]);

      if (key.type === 'array') {
        if (!obj[keyDecoded]) obj[keyDecoded] = [];
        obj[keyDecoded].push(valDecoded);
      } else if (key.type === 'string') {
        obj[keyDecoded] = valDecoded;
      }
    });
    return obj;
  };

  var objectToQuery = function(obj) {
    var pieces = [], encodedKey;
    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) continue;
      if (typeof obj[k] === 'undefined') {
        pieces.push(encodeURIComponent(k));
        continue;
      }
      encodedKey = encodeURIComponent(k);
      if (isArray(obj[k])) {
        each(obj[k], function(val) {
          pieces.push(encodedKey + '[]=' + encodeURIComponent(val));
        });
        continue;
      }
      pieces.push(encodedKey + '=' + encodeURIComponent(obj[k]));
    }
    return pieces.length ? ('?' + pieces.join('&')) : '';
  };

  // for now we will only support string and arrays
  var parseKey = function(key) {
    var pos = key.indexOf('[');
    if (pos === -1) return { type: 'string', val: key };
    return { type: 'array', val: key.substr(0, pos) };
  };

  var isArray = function(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  };

  var extract = function(url) {
    var pos = url.lastIndexOf('?');
    var hasQuery = pos !== -1;
    var base = void 0;

    if (hasQuery && pos > 0) {
      base = url.substring(0, pos);
    } else if (!hasQuery && (url && url.length > 0)) {
      base = url;
    }

    return {
      base: base,
      query: hasQuery ? url.substring(pos+1) : void 0
    };
  };

  // thanks raynos!
  // https://github.com/Raynos/xtend
  var extend = function() {
    var target = {};
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

  var queryExtend = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var asObject = args[args.length-1] === true;
    var base = '';

    if (!args.length) {
      return base;
    }

    if (asObject) {
      args.pop();
    }

    var normalized = map(args, function(param) {
      if (typeof param === 'string') {
        var extracted = extract(param);
        if (extracted.base) base = extracted.base;
        return queryToObject(extracted.query);
      }
      return param;
    });

    if (asObject) {
      return extend.apply({}, normalized);
    } else {
      return base + objectToQuery(extend.apply({}, normalized));
    }

  };
    
  var each = function(arr, fn) {
    for (var i = 0, l = arr.length; i < l; i++) {
      fn(arr[i], i);
    }
  };

  var map = function(arr, fn) {
    var res = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      res.push( fn(arr[i], i) );
    } 
    return res;     
  };

  if (typeof module !== 'undefined' && module.exports) {
    // Node.js / browserify
    module.exports = queryExtend;
  } else if  (typeof define === 'function' && define.amd) {
    // require.js / AMD
    define(function() {
      return queryExtend;
    });
  } else {
    // <script>
    glob.queryExtend = queryExtend;
  }

}(this);
},{}],29:[function(_dereq_,module,exports){
'use strict'

var printf = _dereq_('pff')
var toArray = _dereq_('to-array')
var regex = /%[sdj]/

module.exports = function format (message) {
  if (regex.test(message)) return printf.apply(null, arguments)
  return toArray(arguments).join(' ')
}

},{"pff":26,"to-array":31}],30:[function(_dereq_,module,exports){
'use strict'

var assign = _dereq_('xtend/mutable')
var dot = _dereq_('dot-prop')

var methods = stripeErrback.methods = {
  async: [
    'card.createToken',
    'bankAccount.createToken',
    'piiData.createToken',
    'bitcoinReceiver.createReceiver',
    'bitcoinReceiver.pollReceiver',
    'bitcoinReceiver.getReceiver'
  ],
  sync: [
    'setPublishableKey',
    'card.validateCardNumber',
    'card.validateExpiry',
    'card.validateCVC',
    'card.cardType',
    'bankAccount.validateRoutingNumber',
    'bankAccount.validateAccountNumber',
    'bitcoinReceiver.cancelReceiverPoll'
  ]
}

module.exports = stripeErrback

function stripeErrback (Stripe) {
  if (typeof Stripe !== 'function') throw new Error('Stripe.js must be provided')

  var stripe = {}

  methods.async.forEach(function (method) {
    var names = method.split('.')
    var receiverName = names[0]
    var methodName = names[1]
    dot.set(stripe, method, toErrback(methodName, Stripe[receiverName]))
  })

  methods.sync.forEach(function (method) {
    dot.set(stripe, method, dot.get(Stripe, method))
  })

  return stripe
}

function toErrback (method, receiver) {
  return function errback () {
    var args = Array.prototype.slice.call(arguments)
    var callback = args.pop()

    receiver[method].apply(receiver, args.concat(function onStripe (status, response) {
      if (response.error) return callback(assign(new Error(), response.error, {status: status}))
      callback(null, response)
    }))
  }
}

},{"dot-prop":15,"xtend/mutable":34}],31:[function(_dereq_,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}],32:[function(_dereq_,module,exports){
// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}

},{}],33:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],34:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],35:[function(_dereq_,module,exports){
'use strict'

var Lazy = _dereq_('lazy-async')
var dot = _dereq_('dot-prop')
var loadScript = _dereq_('load-script-global')
var stripeErrback = _dereq_('stripe-errback')

module.exports = LazyStripe

function LazyStripe (url, promisify) {
  var methods = stripeErrback.methods.async.concat(stripeErrback.methods.sync)
  var lazy = Lazy(methods, load)

  return methods.reduce(function (acc, method) {
    var fn = dot.get(lazy, method)
    dot.set(acc, method, promisify(fn))
    return acc
  }, {})

  function load (callback) {
    loadScript({
      url: url,
      global: 'Stripe'
    }, onLoad)

    function onLoad (err, Stripe) {
      if (err) return callback(err)
      var stripe = stripeErrback(Stripe)
      stripe.setPublishableKey = Success(stripe.setPublishableKey, stripe)
      callback(null, stripe)
    }
  }
}

function Success (fn, context) {
  return function success () {
    var callback = Array.prototype.pop.call(arguments)
    fn.apply(context, arguments)
    callback()
  }
}

},{"dot-prop":15,"lazy-async":22,"load-script-global":24,"stripe-errback":30}],36:[function(_dereq_,module,exports){
'use strict'

var LazyStripe = _dereq_('./lazy')

module.exports = stripeProvider

function stripeProvider () {
  var key = null
  var stripe = null

  this.url = 'https://js.stripe.com/v2/'
  this.setPublishableKey = function setPublishableKey (_key) {
    key = _key
  }

  this.$get = service
  this.$get.$inject = ['promisify', '$exceptionHandler']

  function service (promisify, $exceptionHandler) {
    if (stripe) return stripe
    stripe = LazyStripe(this.url, promisify)
    stripe.setPublishableKey(key)
    return stripe
  }
}

},{"./lazy":35}],37:[function(_dereq_,module,exports){
(function (global){
'use strict'

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)
var provider = _dereq_('./provider')

module.exports = angular.module('angular-stripe', [
  _dereq_('angular-q-promisify'),
  _dereq_('angular-assert-q-constructor')
])
.provider('stripe', provider)
.run(verifyQ)
.name

verifyQ.$inject = ['assertQConstructor']
function verifyQ (assertQConstructor) {
  assertQConstructor('angular-stripe: For Angular <= 1.2 support, first load https://github.com/bendrucker/angular-q-constructor')
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./provider":36,"angular-assert-q-constructor":1,"angular-q-promisify":2}]},{},[37])(37)
});