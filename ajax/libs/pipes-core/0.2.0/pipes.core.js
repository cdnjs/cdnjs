(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chain;

var _connect = require("./connect");

var _connect2 = _interopRequireDefault(_connect);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// chain :: TransformStreams... -> { readable, writable }
// chain function takes one or more
// transform streams / { readable, writable } pairs
// connects them to each other,
// takes the readable of the end and the writable of the head,
// returns the { readable, writable } pair that is
// compatible with `ReadableStream::pipeThrough`
//

var compatibilityError = "\n    Only transform streams and readable-writable pairs can be chained\n  ";

function chain(origin) {

  // Check that origin is a transform stream / { readable, writable }
  if (!(0, _utils.isTransform)(origin)) throw new Error(compatibilityError);

  // connect the streams

  for (var _len = arguments.length, streams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    streams[_key - 1] = arguments[_key];
  }

  var writable = origin.writable;
  var readable = _connect2.default.apply(undefined, [origin].concat(streams));

  // Check if null stream
  if (!(0, _utils.isReadable)(readable)) throw new Error(compatibilityError);

  // return readable-writable pair
  return {
    readable: readable,
    writable: writable
  };
}
},{"./connect":2,"./utils":18}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connect;

var _utils = require("./utils");

function connect(origin) {
  // Check origin
  if (!origin) throw new Error("No streams passed");

  var sink = undefined,
      end = undefined;

  // Get the last stream

  for (var _len = arguments.length, streams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    streams[_key - 1] = arguments[_key];
  }

  sink = streams.pop();

  // if origin is a transform$, take it's readable part
  end = origin.readable || origin;

  // Connect the streams
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = streams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var stream = _step.value;


      // Check for transform streams
      if (!(0, _utils.isTransform)(stream)) throw new Error("Only transform streams allowed in the center");

      // piping through a transform returns it's readable part
      end = end.pipeThrough(stream);
    }

    // Handle sink
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if ((0, _utils.isWritable)(sink)) end = end.pipeTo(sink);else if ((0, _utils.isTransform)(sink)) end = end.pipeThrough(sink);else throw new Error("Only writable and transform streams allowed at the end.");

  // Return result
  return end;
} // connect :: Streams... -> ReadableStream | Promise
// connect function takes one or more streams
// and sequentially pipes them to each other,
// returning the result of the last pipe operation.
//
},{"./utils":18}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

var _streams = require("./streams");

var _utils = require("./utils");

// flatten :: ReadableStream... -> ReadableStream
// flatten function takes one or more streams
// and returns a readable combining the streams,
// returning chunks as they arrive in combined streams.
//

function flatten() {
  for (var _len = arguments.length, streams = Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var flattenedStream = undefined,
      writers = [];

  return flattenedStream = new _streams.ReadableStream({
    start: function start(controller) {
      // Create writers for each stream
      while (writers.length < streams.length) {
        writers.push(new _streams.WritableStream({
          // write incoming to flattenedStream
          write: controller.enqueue.bind(controller)
        }));
      } // Connect streams to writers
      var connect = function connect(r, w) {
        return r.pipeTo(w);
      },
          pipedAll = undefined;

      try {
        pipedAll = (0, _utils.zipWith)(connect, streams, writers);
      } catch (e) {
        throw new Error("Only readable streams can be flattened.");
      }

      // Set up closing
      return Promise.all(pipedAll).then(controller.close.bind(controller), controller.error.bind(controller));
    },
    cancel: function cancel() {
      // If cancelled, cancel all streams
      streams.forEach(function (stream) {
        return stream.cancel();
      });
    }
  });
};
},{"./streams":17,"./utils":18}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.split = exports.pipe = exports.merge = exports.flatten = exports.chain = exports.connect = undefined;

var _connect = require("./connect");

var _connect2 = _interopRequireDefault(_connect);

var _chain = require("./chain");

var _chain2 = _interopRequireDefault(_chain);

var _flatten = require("./flatten");

var _flatten2 = _interopRequireDefault(_flatten);

var _merge = require("./merge");

var _merge2 = _interopRequireDefault(_merge);

var _pipe = require("./pipe");

var _pipe2 = _interopRequireDefault(_pipe);

var _split = require("./split");

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Exports
exports.connect = _connect2.default;
exports.chain = _chain2.default;
exports.flatten = _flatten2.default;
exports.merge = _merge2.default;
exports.pipe = _pipe2.default;
exports.split = _split2.default;

// Default exports

var fns = {
  connect: _connect2.default,
  chain: _chain2.default,
  flatten: _flatten2.default,
  merge: _merge2.default,
  pipe: _pipe2.default,
  split: _split2.default
};

exports.default = fns;
},{"./chain":1,"./connect":2,"./flatten":3,"./merge":5,"./pipe":12,"./split":16}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;

var _streams = require("./streams");

// Parses arrays of {value, done} pairs to final pair
function parseResults(results) {
  var ended = false,
      values = [];

  // Accumulate values
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value;
      var value = _step$value.value;
      var done = _step$value.done;

      ended = ended || done;
      values.push(value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    value: values,
    done: ended
  };
} // merge :: ReadableStream... -> ReadableStream
// merge function takes one or more streams
// and returns a readable combining the streams,
// such that it gathers chunks from all streams
// into an array and then pushes them onto the combined
// stream, by waiting for all streams to have pushed a chunk.
//

function merge() {
  for (var _len = arguments.length, streams = Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var readers = undefined,
      chunkWaiters = undefined,
      mergedStream = undefined,
      merger = undefined;

  // Get readers
  try {
    readers = streams.map(function (stream) {
      return stream.getReader();
    });

    // Check for transform streams
  } catch (e) {

    throw new Error("Only ReadableStreams can be flattened");
  }

  // Merging function
  merger = function merger(controller) {
    var
    // Get read promises
    promises = readers.map(function (r) {
      return r.read();
    }),
        merged = undefined,
        push = undefined;

    // Read values and push them onto the stream
    push = function push(_ref) {
      var value = _ref.value;
      var done = _ref.done;

      if (done) return controller.close();

      controller.enqueue(value);
    };

    // Combine values into an array
    merged = Promise.all(promises).then(parseResults).then(push, controller.error.bind(controller));

    return merged;
  };

  return mergedStream = new _streams.ReadableStream({
    start: merger,
    pull: merger,

    cancel: function cancel() {
      // If cancelled, cancel all streams
      streams.forEach(function (stream) {
        return stream.cancel();
      });
    }
  });
};
},{"./streams":17}],6:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && !isFinite(value)) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b)) {
    return a === b;
  }
  var aIsArgs = isArguments(a),
      bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  var ka = objectKeys(a),
      kb = objectKeys(b),
      key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":10}],7:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],8:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
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
    var timeout = setTimeout(cleanUpNextTick);
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
    clearTimeout(timeout);
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
        setTimeout(drainQueue, 0);
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

},{}],9:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],10:[function(require,module,exports){
(function (process,global){
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

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":9,"_process":8,"inherits":7}],11:[function(require,module,exports){
(function (process,global){
"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function typeIsObject(x){return"object"===("undefined"==typeof x?"undefined":_typeof(x))&&null!==x||"function"==typeof x}function createDataProperty(o,p,v){assert$1(typeIsObject(o)),Object.defineProperty(o,p,{value:v,writable:!0,enumerable:!0,configurable:!0})}function createArrayFromList(elements){return elements.slice()}function CreateIterResultObject(value,done){assert$1("boolean"==typeof done);var obj={};return Object.defineProperty(obj,"value",{value:value,enumerable:!0,writable:!0,configurable:!0}),Object.defineProperty(obj,"done",{value:done,enumerable:!0,writable:!0,configurable:!0}),obj}function InvokeOrNoop(O,P,args){var method=O[P];if(void 0!==method)return method.apply(O,args)}function PromiseInvokeOrNoop(O,P,args){var method=void 0;try{method=O[P]}catch(methodE){return Promise.reject(methodE)}if(void 0===method)return Promise.resolve(void 0);try{return Promise.resolve(method.apply(O,args))}catch(e){return Promise.reject(e)}}function PromiseInvokeOrFallbackOrNoop(O,P1,args1,P2,args2){var method=void 0;try{method=O[P1]}catch(methodE){return Promise.reject(methodE)}if(void 0===method)return PromiseInvokeOrNoop(O,P2,args2);try{return Promise.resolve(method.apply(O,args1))}catch(e){return Promise.reject(e)}}function ValidateAndNormalizeQueuingStrategy(size,highWaterMark){if(void 0!==size&&"function"!=typeof size)throw new TypeError("size property of a queuing strategy must be a function");if(highWaterMark=Number(highWaterMark),Number.isNaN(highWaterMark))throw new TypeError("highWaterMark property of a queuing strategy must be convertible to a non-NaN number");if(0>highWaterMark)throw new RangeError("highWaterMark property of a queuing strategy must be nonnegative");return{size:size,highWaterMark:highWaterMark}}function rethrowAssertionErrorRejection(e){e&&e.constructor===assert$2.AssertionError&&setTimeout(function(){throw e},0)}function DequeueValue(queue){assert$3(queue.length>0,"Spec-level failure: should never dequeue from an empty queue.");var pair=queue.shift();return pair.value}function EnqueueValueWithSize(queue,value,size){if(size=Number(size),Number.isNaN(size)||size===+(1/0)||0>size)throw new RangeError("Size must be a finite, non-NaN, non-negative number.");queue.push({value:value,size:size})}function GetTotalQueueSize(queue){var totalSize=0;return queue.forEach(function(pair){assert$3("number"==typeof pair.size&&!Number.isNaN(pair.size)&&pair.size!==+(1/0)&&pair.size!==-(1/0),"Spec-level failure: should never find an invalid size in the queue."),totalSize+=pair.size}),totalSize}function PeekQueueValue(queue){assert$3(queue.length>0,"Spec-level failure: should never peek at an empty queue.");var pair=queue[0];return pair.value}function AcquireReadableStreamReader(stream){return new ReadableStreamReader(stream)}function CancelReadableStream(stream,reason){if(stream._disturbed=!0,"closed"===stream._state)return Promise.resolve(void 0);if("errored"===stream._state)return Promise.reject(stream._storedError);stream._queue=[],FinishClosingReadableStream(stream);var sourceCancelPromise=PromiseInvokeOrNoop(stream._underlyingSource,"cancel",[reason]);return sourceCancelPromise.then(function(){})}function CloseReadableStream(stream){return assert(stream._closeRequested===!1),assert("errored"!==stream._state),"closed"!==stream._state?(stream._closeRequested=!0,0===stream._queue.length?FinishClosingReadableStream(stream):void 0):void 0}function EnqueueInReadableStream(stream,chunk){if(assert(stream._closeRequested===!1),assert("errored"!==stream._state),"closed"!==stream._state){if(IsReadableStreamLocked(stream)===!0&&stream._reader._readRequests.length>0){var readRequest=stream._reader._readRequests.shift();readRequest._resolve(CreateIterResultObject(chunk,!1))}else{var chunkSize=1;if(void 0!==stream._strategySize)try{chunkSize=stream._strategySize(chunk)}catch(chunkSizeE){throw"readable"===stream._state&&ErrorReadableStream(stream,chunkSizeE),chunkSizeE}try{EnqueueValueWithSize(stream._queue,chunk,chunkSize)}catch(enqueueE){throw"readable"===stream._state&&ErrorReadableStream(stream,enqueueE),enqueueE}}RequestReadableStreamPull(stream)}}function ErrorReadableStream(stream,e){assert("readable"===stream._state),stream._queue=[],stream._storedError=e,stream._state="errored";var reader=stream._reader;if(void 0!==reader){var _iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=reader._readRequests[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var _reject=_step.value._reject;_reject(e)}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator["return"]&&_iterator["return"]()}finally{if(_didIteratorError)throw _iteratorError}}reader._readRequests=[],reader._closedPromise_reject(e),reader._closedPromise_resolve=void 0,reader._closedPromise_reject=void 0}}function FinishClosingReadableStream(stream){assert("readable"===stream._state),stream._state="closed";var reader=stream._reader;if(void 0!==reader){var _iteratorNormalCompletion2=!0,_didIteratorError2=!1,_iteratorError2=void 0;try{for(var _step2,_iterator2=reader._readRequests[Symbol.iterator]();!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=!0){var _resolve=_step2.value._resolve;_resolve(CreateIterResultObject(void 0,!0))}}catch(err){_didIteratorError2=!0,_iteratorError2=err}finally{try{!_iteratorNormalCompletion2&&_iterator2["return"]&&_iterator2["return"]()}finally{if(_didIteratorError2)throw _iteratorError2}}reader._readRequests=[],reader._closedPromise_resolve(void 0),reader._closedPromise_resolve=void 0,reader._closedPromise_reject=void 0}}function GetReadableStreamDesiredSize(stream){var queueSize=GetTotalQueueSize(stream._queue);return stream._strategyHWM-queueSize}function IsReadableStream(x){return typeIsObject(x)?!!Object.prototype.hasOwnProperty.call(x,"_underlyingSource"):!1}function IsReadableStreamLocked(stream){return assert(IsReadableStream(stream)===!0,"IsReadableStreamLocked should only be used on known readable streams"),void 0!==stream._reader}function IsReadableStreamController(x){return typeIsObject(x)?!!Object.prototype.hasOwnProperty.call(x,"_controlledReadableStream"):!1}function IsReadableStreamReader(x){return typeIsObject(x)?!!Object.prototype.hasOwnProperty.call(x,"_ownerReadableStream"):!1}function ReadFromReadableStreamReader(reader){if(assert(void 0!==reader._ownerReadableStream),reader._ownerReadableStream._disturbed=!0,"closed"===reader._ownerReadableStream._state)return Promise.resolve(CreateIterResultObject(void 0,!0));if("errored"===reader._ownerReadableStream._state)return Promise.reject(reader._ownerReadableStream._storedError);if(assert("readable"===reader._ownerReadableStream._state),reader._ownerReadableStream._queue.length>0){var chunk=DequeueValue(reader._ownerReadableStream._queue);return reader._ownerReadableStream._closeRequested===!0&&0===reader._ownerReadableStream._queue.length?FinishClosingReadableStream(reader._ownerReadableStream):RequestReadableStreamPull(reader._ownerReadableStream),Promise.resolve(CreateIterResultObject(chunk,!1))}var _ret=function(){var readRequest={};return readRequest.promise=new Promise(function(resolve,reject){readRequest._resolve=resolve,readRequest._reject=reject}),reader._readRequests.push(readRequest),RequestReadableStreamPull(reader._ownerReadableStream),{v:readRequest.promise}}();return"object"===("undefined"==typeof _ret?"undefined":_typeof(_ret))?_ret.v:void 0}function RequestReadableStreamPull(stream){var shouldPull=ShouldReadableStreamPull(stream);if(shouldPull!==!1){if(stream._pulling===!0)return void(stream._pullAgain=!0);stream._pulling=!0;var pullPromise=PromiseInvokeOrNoop(stream._underlyingSource,"pull",[stream._controller]);pullPromise.then(function(){return stream._pulling=!1,stream._pullAgain===!0?(stream._pullAgain=!1,RequestReadableStreamPull(stream)):void 0},function(e){return"readable"===stream._state?ErrorReadableStream(stream,e):void 0})["catch"](rethrowAssertionErrorRejection)}}function ShouldReadableStreamPull(stream){if("closed"===stream._state||"errored"===stream._state)return!1;if(stream._closeRequested===!0)return!1;if(stream._started===!1)return!1;if(IsReadableStreamLocked(stream)===!0&&stream._reader._readRequests.length>0)return!0;var desiredSize=GetReadableStreamDesiredSize(stream);return desiredSize>0}function TeeReadableStream(stream,shouldClone){assert(IsReadableStream(stream)===!0),assert("boolean"==typeof shouldClone);var reader=AcquireReadableStreamReader(stream),teeState={closedOrErrored:!1,canceled1:!1,canceled2:!1,reason1:void 0,reason2:void 0};teeState.promise=new Promise(function(resolve){return teeState._resolve=resolve});var pull=create_TeeReadableStreamPullFunction();pull._reader=reader,pull._teeState=teeState,pull._shouldClone=shouldClone;var cancel1=create_TeeReadableStreamBranch1CancelFunction();cancel1._stream=stream,cancel1._teeState=teeState;var cancel2=create_TeeReadableStreamBranch2CancelFunction();cancel2._stream=stream,cancel2._teeState=teeState;var underlyingSource1=Object.create(Object.prototype);createDataProperty(underlyingSource1,"pull",pull),createDataProperty(underlyingSource1,"cancel",cancel1);var branch1=new ReadableStream(underlyingSource1),underlyingSource2=Object.create(Object.prototype);createDataProperty(underlyingSource2,"pull",pull),createDataProperty(underlyingSource2,"cancel",cancel2);var branch2=new ReadableStream(underlyingSource2);return pull._branch1=branch1,pull._branch2=branch2,reader._closedPromise["catch"](function(r){teeState.closedOrErrored!==!0&&(ErrorReadableStream(branch1,r),ErrorReadableStream(branch2,r),teeState.closedOrErrored=!0)}),[branch1,branch2]}function create_TeeReadableStreamPullFunction(){var f=function f(){var reader=f._reader,branch1=f._branch1,branch2=f._branch2,teeState=f._teeState;f._shouldClone;return ReadFromReadableStreamReader(reader).then(function(result){assert(typeIsObject(result));var value=result.value,done=result.done;if(assert("boolean"==typeof done),done===!0&&teeState.closedOrErrored===!1&&(CloseReadableStream(branch1),CloseReadableStream(branch2),teeState.closedOrErrored=!0),teeState.closedOrErrored!==!0){if(teeState.canceled1===!1){var value1=value;EnqueueInReadableStream(branch1,value1)}if(teeState.canceled2===!1){var value2=value;EnqueueInReadableStream(branch2,value2)}}})};return f}function create_TeeReadableStreamBranch1CancelFunction(){var f=function f(reason){var stream=f._stream,teeState=f._teeState;if(teeState.canceled1=!0,teeState.reason1=reason,teeState.canceled2===!0){var compositeReason=createArrayFromList([teeState.reason1,teeState.reason2]),cancelResult=CancelReadableStream(stream,compositeReason);teeState._resolve(cancelResult)}return teeState.promise};return f}function create_TeeReadableStreamBranch2CancelFunction(){var f=function f(reason){var stream=f._stream,teeState=f._teeState;if(teeState.canceled2=!0,teeState.reason2=reason,teeState.canceled1===!0){var compositeReason=createArrayFromList([teeState.reason1,teeState.reason2]),cancelResult=CancelReadableStream(stream,compositeReason);teeState._resolve(cancelResult)}return teeState.promise};return f}function closure_WritableStreamErrorFunction(){var f=function f(e){return ErrorWritableStream(f._stream,e)};return f}function CallOrScheduleWritableStreamAdvanceQueue(stream){return stream._started===!1?void stream._startedPromise.then(function(){WritableStreamAdvanceQueue(stream)})["catch"](rethrowAssertionErrorRejection):stream._started===!0?WritableStreamAdvanceQueue(stream):void 0}function CloseWritableStream(stream){assert$4("closing"===stream._state,"stream must be in closing state while calling CloseWritableStream");var sinkClosePromise=PromiseInvokeOrNoop(stream._underlyingSink,"close");sinkClosePromise.then(function(){"errored"!==stream._state&&(assert$4("closing"===stream._state),stream._closedPromise_resolve(void 0),stream._closedPromise_resolve=void 0,stream._closedPromise_reject=void 0,stream._state="closed")},function(r){return ErrorWritableStream(stream,r)})["catch"](rethrowAssertionErrorRejection)}function ErrorWritableStream(stream,e){if("closed"!==stream._state&&"errored"!==stream._state){for(;stream._queue.length>0;){var writeRecord=DequeueValue(stream._queue);"close"!==writeRecord&&writeRecord._reject(e)}stream._storedError=e,"waiting"===stream._state&&stream._readyPromise_resolve(void 0),stream._closedPromise_reject(e),stream._closedPromise_resolve=void 0,stream._closedPromise_reject=void 0,stream._state="errored"}}function IsWritableStream(x){return typeIsObject(x)?!!Object.prototype.hasOwnProperty.call(x,"_underlyingSink"):!1}function SyncWritableStreamStateWithQueue(stream){if("closing"!==stream._state){assert$4("writable"===stream._state||"waiting"===stream._state,"stream must be in a writable or waiting state while calling SyncWritableStreamStateWithQueue");var queueSize=GetTotalQueueSize(stream._queue),shouldApplyBackpressure=queueSize>stream._strategyHWM;shouldApplyBackpressure===!0&&"writable"===stream._state&&(stream._state="waiting",stream._readyPromise=new Promise(function(resolve,reject){stream._readyPromise_resolve=resolve})),shouldApplyBackpressure===!1&&"waiting"===stream._state&&(stream._state="writable",stream._readyPromise_resolve(void 0))}}function WritableStreamAdvanceQueue(stream){if(0!==stream._queue.length&&stream._writing!==!0){var writeRecord=PeekQueueValue(stream._queue);return"close"===writeRecord?(assert$4("closing"===stream._state,"can't process final write record unless already closing"),DequeueValue(stream._queue),assert$4(0===stream._queue.length,"queue must be empty once the final write record is dequeued"),CloseWritableStream(stream)):(stream._writing=!0,void PromiseInvokeOrNoop(stream._underlyingSink,"write",[writeRecord.chunk]).then(function(){"errored"!==stream._state&&(stream._writing=!1,writeRecord._resolve(void 0),DequeueValue(stream._queue),SyncWritableStreamStateWithQueue(stream),WritableStreamAdvanceQueue(stream))},function(r){return ErrorWritableStream(stream,r)})["catch"](rethrowAssertionErrorRejection))}}function ReadableByteStreamControllerCallPull(controller){var stream=controller._controlledReadableByteStream;controller._pullAgain=!1,controller._pulling=!0;try{InvokeOrNoop(controller._underlyingByteSource,"pull",[])}catch(e){DestroyReadableByteStreamController(controller),"readable"===stream._state&&ErrorReadableByteStream(stream,e)}controller._pulling=!1}function ReadableByteStreamControllerCallPullInto(controller){controller._controlledReadableByteStream;assert$5(controller._pendingPullIntos.length>0);var pullIntoDescriptor=controller._pendingPullIntos[0];controller._pullAgain=!1,controller._pulling=!0;try{InvokeOrNoop(controller._underlyingByteSource,"pullInto",[new Uint8Array(pullIntoDescriptor.buffer,pullIntoDescriptor.byteOffset+pullIntoDescriptor.bytesFilled,pullIntoDescriptor.byteLength-pullIntoDescriptor.bytesFilled)])}catch(e){DestroyReadableByteStreamController(controller);var _stream=controller._controlledReadableByteStream;"readable"===_stream._state&&ErrorReadableByteStream(_stream,e)}controller._pulling=!1}function ReadableByteStreamControllerCallPullOrPullIntoLaterIfNeeded(controller){controller._pullAgain=!0,controller._pulling||process.nextTick(ReadableByteStreamControllerCallPullOrPullIntoRepeatedlyIfNeeded.bind(void 0,controller))}function ReadableByteStreamControllerCallPullOrPullIntoRepeatedlyIfNeeded(controller){for(var stream=controller._controlledReadableByteStream;;){if(!controller._pullAgain)return;if(controller._closeRequested)return;if("readable"!==stream._state)return;var reader=stream._reader;if(void 0===reader)return;if(IsReadableByteStreamReader(reader)){if(0===reader._readRequests.length)return;ReadableByteStreamControllerCallPull(controller)}else{if(assert$5(IsReadableByteStreamByobReader(reader),"reader must be ReadableByteStreamByobReader"),0===reader._readIntoRequests.length)return;ReadableByteStreamControllerCallPullInto(controller)}}}function CancelReadableByteStream(stream,reason){if("closed"===stream._state)return Promise.resolve(void 0);if("errored"===stream._state)return Promise.reject(stream._storedError);CloseReadableByteStream(stream);var sourceCancelPromise=CancelReadableByteStreamController(stream._controller,reason);return sourceCancelPromise.then(function(){})}function CancelReadableByteStreamController(controller,reason){return controller._pendingPullIntos.length>0&&(controller._pendingPullIntos[0].bytesFilled=0),controller._queue=[],controller._totalQueuedBytes=0,PromiseInvokeOrNoop(controller._underlyingByteSource,"cancel",[reason])}function CloseReadableByteStream(stream){assert$5(IsReadableByteStream(stream),"stream must be ReadableByteStream"),assert$5("readable"===stream._state,"state must be readable"),stream._state="closed";var reader=stream._reader;if(void 0!==reader){if(IsReadableByteStreamReader(reader)){var _iteratorNormalCompletion3=!0,_didIteratorError3=!1,_iteratorError3=void 0;try{for(var _step3,_iterator3=reader._readRequests[Symbol.iterator]();!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=!0){var req=_step3.value;req.resolve(CreateIterResultObject(void 0,!0))}}catch(err){_didIteratorError3=!0,_iteratorError3=err}finally{try{!_iteratorNormalCompletion3&&_iterator3["return"]&&_iterator3["return"]()}finally{if(_didIteratorError3)throw _iteratorError3}}reader._readRequests=[],ReleaseReadableByteStreamReaderGeneric(reader)}else assert$5(IsReadableByteStreamByobReader(reader),"reader must be ReadableByteStreamByobReader"),0===reader._readIntoRequests.length&&ReleaseReadableByteStreamReaderGeneric(reader);CloseReadableByteStreamReaderGeneric(reader)}}function CloseReadableByteStreamReaderGeneric(reader){reader._state="closed",reader._closedPromise_resolve(void 0),reader._closedPromise_resolve=void 0,reader._closedPromise_reject=void 0}function DestroyReadableByteStreamController(controller){controller._pendingPullIntos=[],controller._queue=[]}function TransferArrayBuffer(buffer){return buffer}function ReleaseReadableByteStreamReaderGeneric(reader){assert$5(void 0!==reader._ownerReadableByteStream._reader),assert$5(void 0!==reader._ownerReadableByteStream),reader._ownerReadableByteStream._reader=void 0,reader._ownerReadableByteStream=void 0}function EnqueueInReadableByteStreamController(controller,buffer,byteOffset,byteLength){controller._queue.push({buffer:buffer,byteOffset:byteOffset,byteLength:byteLength}),controller._totalQueuedBytes+=byteLength}function ErrorReadableByteStream(stream,e){assert$5(IsReadableByteStream(stream),"stream must be ReadableByteStream"),assert$5("readable"===stream._state,"state must be readable"),stream._state="errored",stream._storedError=e;var reader=stream._reader;if(void 0!==reader){if(IsReadableByteStreamReader(reader)){var _iteratorNormalCompletion4=!0,_didIteratorError4=!1,_iteratorError4=void 0;try{for(var _step4,_iterator4=reader._readRequests[Symbol.iterator]();!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=!0){var req=_step4.value;req.reject(e)}}catch(err){_didIteratorError4=!0,_iteratorError4=err}finally{try{!_iteratorNormalCompletion4&&_iterator4["return"]&&_iterator4["return"]()}finally{if(_didIteratorError4)throw _iteratorError4}}reader._readRequests=[]}else{assert$5(IsReadableByteStreamByobReader(reader),"reader must be ReadableByteStreamByobReader");var _iteratorNormalCompletion5=!0,_didIteratorError5=!1,_iteratorError5=void 0;try{for(var _step5,_iterator5=reader._readIntoRequests[Symbol.iterator]();!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=!0){var req=_step5.value;req.reject(e)}}catch(err){_didIteratorError5=!0,_iteratorError5=err}finally{try{!_iteratorNormalCompletion5&&_iterator5["return"]&&_iterator5["return"]()}finally{if(_didIteratorError5)throw _iteratorError5}}reader._readIntoRequests=[]}ReleaseReadableByteStreamReaderGeneric(reader),reader._state="errored",reader._storedError=e,reader._closedPromise_reject(e),reader._closedPromise_resolve=void 0,reader._closedPromise_reject=void 0}}function FillPullIntoDescriptorFromQueue(controller,pullIntoDescriptor){var elementSize=pullIntoDescriptor.elementSize,currentAlignedBytes=pullIntoDescriptor.bytesFilled-pullIntoDescriptor.bytesFilled%elementSize,maxBytesToCopy=Math.min(controller._totalQueuedBytes,pullIntoDescriptor.byteLength-pullIntoDescriptor.bytesFilled),maxBytesFilled=pullIntoDescriptor.bytesFilled+maxBytesToCopy,maxAlignedBytes=maxBytesFilled-maxBytesFilled%elementSize,totalBytesToCopyRemaining=maxBytesToCopy,ready=!1;maxAlignedBytes>currentAlignedBytes&&(totalBytesToCopyRemaining=maxAlignedBytes-pullIntoDescriptor.bytesFilled,ready=!0);for(var queue=controller._queue;totalBytesToCopyRemaining>0;){var headOfQueue=queue[0],bytesToCopy=Math.min(totalBytesToCopyRemaining,headOfQueue.byteLength),destStart=pullIntoDescriptor.byteOffset+pullIntoDescriptor.bytesFilled;new Uint8Array(pullIntoDescriptor.buffer).set(new Uint8Array(headOfQueue.buffer,headOfQueue.byteOffset,bytesToCopy),destStart),headOfQueue.byteLength===bytesToCopy?queue.shift():(headOfQueue.byteOffset+=bytesToCopy,headOfQueue.byteLength-=bytesToCopy),controller._totalQueuedBytes-=bytesToCopy,pullIntoDescriptor.bytesFilled+=bytesToCopy,totalBytesToCopyRemaining-=bytesToCopy}return ready||(assert$5(0===controller._totalQueuedBytes,"queue must be empty"),assert$5(pullIntoDescriptor.bytesFilled>0),assert$5(pullIntoDescriptor.bytesFilled<pullIntoDescriptor.elementSize)),ready}function InitializeReadableByteStreamReaderGeneric(reader,stream){reader._state=stream._state,"readable"===stream._state?(stream._reader=reader,reader._ownerReadableByteStream=stream,reader._storedError=void 0,reader._closedPromise=new Promise(function(resolve,reject){reader._closedPromise_resolve=resolve,reader._closedPromise_reject=reject})):(reader._ownerReadableByteStream=void 0,"closed"===stream._state?(reader._storedError=void 0,reader._closedPromise=Promise.resolve(void 0),reader._closedPromise_resolve=void 0,reader._closedPromise_reject=void 0):(assert$5("errored"===stream._state,"state must be errored"),reader._storedError=stream._storedError,reader._closedPromise=Promise.reject(stream._storedError),reader._closedPromise_resolve=void 0,reader._closedPromise_reject=void 0))}function IsReadableByteStream(x){return typeIsObject(x)?!!Object.prototype.hasOwnProperty.call(x,"_controller"):!1}function IsReadableByteStreamByobReader(x){return typeIsObject(x)?!!Object.prototype.hasOwnProperty.call(x,"_readIntoRequests"):!1}function IsReadableByteStreamController(x){return typeIsObject(x)?!!Object.prototype.hasOwnProperty.call(x,"_controlledReadableByteStream"):!1}function IsReadableByteStreamLocked(stream){return assert$5(IsReadableByteStream(stream),"IsReadableByteStreamLocked should only be used on known readable byte streams"),void 0!==stream._reader}function IsReadableByteStreamReader(x){return typeIsObject(x)?!!Object.prototype.hasOwnProperty.call(x,"_readRequests"):!1}function PullFromReadableByteStream(stream){var controller=stream._controller,reader=stream._reader;if(!(reader._readRequests.length>1)){if(assert$5(1===reader._readRequests.length),controller._totalQueuedBytes>0){var entry=controller._queue.shift();controller._totalQueuedBytes-=entry.byteLength;var view=new Uint8Array(entry.buffer,entry.byteOffset,entry.byteLength);return RespondToReadRequest(reader,view),void(0===controller._totalQueuedBytes&&controller._closeRequested&&CloseReadableByteStream(stream))}if(controller._pulling)return void(controller._pullAgain=!0);ReadableByteStreamControllerCallPull(controller),ReadableByteStreamControllerCallPullOrPullIntoRepeatedlyIfNeeded(controller)}}function PullFromReadableByteStreamInto(stream,buffer,byteOffset,byteLength,elementSize){var controller=stream._controller,pullIntoDescriptor={buffer:buffer,byteOffset:byteOffset,byteLength:byteLength,bytesFilled:0,elementSize:elementSize};if(controller._pendingPullIntos.length>0)return pullIntoDescriptor.buffer=TransferArrayBuffer(pullIntoDescriptor.buffer),void controller._pendingPullIntos.push(pullIntoDescriptor);if(controller._totalQueuedBytes>0){var ready=FillPullIntoDescriptorFromQueue(controller,pullIntoDescriptor);if(ready)return RespondToReadIntoRequest(stream._reader,pullIntoDescriptor.buffer,pullIntoDescriptor.bytesFilled),void(0===controller._totalQueuedBytes&&controller._closeRequested&&CloseReadableByteStream(stream));if(controller._closeRequested)return DestroyReadableByteStreamController(controller),void ErrorReadableByteStream(stream,new TypeError("Insufficient bytes to fill elements in the given buffer"))}return pullIntoDescriptor.buffer=TransferArrayBuffer(pullIntoDescriptor.buffer),controller._pendingPullIntos.push(pullIntoDescriptor),controller._pulling?void(controller._pullAgain=!0):(ReadableByteStreamControllerCallPullInto(controller),void ReadableByteStreamControllerCallPullOrPullIntoRepeatedlyIfNeeded(controller))}function RespondToByobReaderInClosedState(controller,reader,buffer){var firstDescriptor=controller._pendingPullIntos[0];for(void 0!==buffer&&(firstDescriptor.buffer=buffer),firstDescriptor.buffer=TransferArrayBuffer(firstDescriptor.buffer),assert$5(0===firstDescriptor.bytesFilled,"bytesFilled must be 0");reader._readIntoRequests.length>0;){var descriptor=controller._pendingPullIntos.shift();RespondToReadIntoRequest(reader,descriptor.buffer)}ReleaseReadableByteStreamReaderGeneric(reader)}function RespondToByobReaderInReadableState(controller,reader,bytesWritten,buffer){var pullIntoDescriptor=controller._pendingPullIntos[0];if(pullIntoDescriptor.bytesFilled+bytesWritten>pullIntoDescriptor.byteLength)throw new RangeError("bytesWritten out of range");if(void 0!==buffer&&(pullIntoDescriptor.buffer=buffer),pullIntoDescriptor.bytesFilled+=bytesWritten,pullIntoDescriptor.bytesFilled<pullIntoDescriptor.elementSize)return void ReadableByteStreamControllerCallPullOrPullIntoLaterIfNeeded(controller);controller._pendingPullIntos.shift();var remainderSize=pullIntoDescriptor.bytesFilled%pullIntoDescriptor.elementSize;if(remainderSize>0){var end=pullIntoDescriptor.byteOffset+pullIntoDescriptor.bytesFilled,remainder=pullIntoDescriptor.buffer.slice(end-remainderSize,end);EnqueueInReadableByteStreamController(controller,remainder,0,remainder.byteLength)}RespondToReadIntoRequest(reader,TransferArrayBuffer(pullIntoDescriptor.buffer),pullIntoDescriptor.bytesFilled-remainderSize),RespondToReadIntoRequestsFromQueue(controller,reader)}function RespondToReadIntoRequest(reader,buffer,length){assert$5(reader._readIntoRequests.length>0,"readIntoRequest must not be empty when calling RespondToReadIntoRequest"),assert$5("errored"!==reader._state,"state must not be errored");var req=reader._readIntoRequests.shift(),ctor=req.ctor,byteOffset=req.byteOffset;if("closed"===reader._state){assert$5(void 0===length);var _view=new ctor(buffer,byteOffset,0);return void req.resolve(CreateIterResultObject(_view,!0))}assert$5(length<=req.byteLength),assert$5(length%req.elementSize===0);var view=new ctor(buffer,byteOffset,length/req.elementSize);req.resolve(CreateIterResultObject(view,!1))}function RespondToReadRequest(reader,view){var req=reader._readRequests.shift();req.resolve(CreateIterResultObject(view,!1))}function RespondToReadIntoRequestsFromQueue(controller,reader){for(assert$5(!controller._closeRequested);controller._pendingPullIntos.length>0;){if(0===controller._totalQueuedBytes)return void ReadableByteStreamControllerCallPullOrPullIntoLaterIfNeeded(controller);var pullIntoDescriptor=controller._pendingPullIntos[0],ready=FillPullIntoDescriptorFromQueue(controller,pullIntoDescriptor);ready&&(controller._pendingPullIntos.shift(),RespondToReadIntoRequest(reader,pullIntoDescriptor.buffer,pullIntoDescriptor.bytesFilled))}}Object.defineProperty(exports,"__esModule",{value:!0});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i["return"]&&_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj},assert$1=require("assert"),assert$2=require("assert"),assert$3=require("assert"),assert=require("assert"),ReadableStream=function(){function ReadableStream(){var _this=this,underlyingSource=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],size=_ref.size,_ref$highWaterMark=_ref.highWaterMark,highWaterMark=void 0===_ref$highWaterMark?1:_ref$highWaterMark;_classCallCheck(this,ReadableStream),this._underlyingSource=underlyingSource,this._queue=[],this._state="readable",this._started=!1,this._closeRequested=!1,this._pulling=!1,this._pullAgain=!1,this._reader=void 0,this._storedError=void 0,this._disturbed=!1;var normalizedStrategy=ValidateAndNormalizeQueuingStrategy(size,highWaterMark);this._strategySize=normalizedStrategy.size,this._strategyHWM=normalizedStrategy.highWaterMark,this._controller=new ReadableStreamController(this);var startResult=InvokeOrNoop(underlyingSource,"start",[this._controller]);Promise.resolve(startResult).then(function(){_this._started=!0,RequestReadableStreamPull(_this)},function(r){return"readable"===_this._state?ErrorReadableStream(_this,r):void 0})["catch"](rethrowAssertionErrorRejection)}return _createClass(ReadableStream,[{key:"cancel",value:function(reason){return IsReadableStream(this)===!1?Promise.reject(new TypeError("ReadableStream.prototype.cancel can only be used on a ReadableStream")):IsReadableStreamLocked(this)===!0?Promise.reject(new TypeError("Cannot cancel a stream that already has a reader")):CancelReadableStream(this,reason)}},{key:"getReader",value:function(){if(IsReadableStream(this)===!1)throw new TypeError("ReadableStream.prototype.getReader can only be used on a ReadableStream");return AcquireReadableStreamReader(this)}},{key:"pipeThrough",value:function(_ref2,options){var writable=_ref2.writable,readable=_ref2.readable;return this.pipeTo(writable,options),readable}},{key:"pipeTo",value:function(dest){function doPipe(){lastRead=reader.read(),Promise.all([lastRead,dest.ready]).then(function(_ref4){var _ref5=_slicedToArray(_ref4,1),_ref5$=_ref5[0],value=_ref5$.value,done=_ref5$.done;Boolean(done)===!0?closeDest():"writable"===dest.state&&(lastWrite=dest.write(value),doPipe())})["catch"](rethrowAssertionErrorRejection)}function cancelSource(reason){preventCancel===!1?(reader.cancel(reason),reader.releaseLock(),rejectPipeToPromise(reason)):lastRead.then(function(){reader.releaseLock(),rejectPipeToPromise(reason)})}function closeDest(){reader.releaseLock();var destState=dest.state;preventClose!==!1||"waiting"!==destState&&"writable"!==destState?void 0!==lastWrite?lastWrite.then(resolvePipeToPromise,rejectPipeToPromise):resolvePipeToPromise():(closedPurposefully=!0,
dest.close().then(resolvePipeToPromise,rejectPipeToPromise))}function abortDest(reason){reader.releaseLock(),preventAbort===!1&&dest.abort(reason),rejectPipeToPromise(reason)}var _ref3=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],preventClose=_ref3.preventClose,preventAbort=_ref3.preventAbort,preventCancel=_ref3.preventCancel;preventClose=Boolean(preventClose),preventAbort=Boolean(preventAbort),preventCancel=Boolean(preventCancel);var source=this,reader=void 0,lastRead=void 0,lastWrite=void 0,closedPurposefully=!1,resolvePipeToPromise=void 0,rejectPipeToPromise=void 0;return new Promise(function(resolve,reject){resolvePipeToPromise=resolve,rejectPipeToPromise=reject,reader=source.getReader(),reader.closed["catch"](abortDest),dest.closed.then(function(){closedPurposefully||cancelSource(new TypeError("destination is closing or closed and cannot be piped to anymore"))},cancelSource),doPipe()})}},{key:"tee",value:function(){if(IsReadableStream(this)===!1)throw new TypeError("ReadableStream.prototype.tee can only be used on a ReadableStream");var branches=TeeReadableStream(this,!1);return createArrayFromList(branches)}},{key:"locked",get:function(){if(IsReadableStream(this)===!1)throw new TypeError("ReadableStream.prototype.locked can only be used on a ReadableStream");return IsReadableStreamLocked(this)}}]),ReadableStream}(),ReadableStreamController=function(){function ReadableStreamController(stream){if(_classCallCheck(this,ReadableStreamController),IsReadableStream(stream)===!1)throw new TypeError("ReadableStreamController can only be constructed with a ReadableStream instance");if(void 0!==stream._controller)throw new TypeError("ReadableStreamController instances can only be created by the ReadableStream constructor");this._controlledReadableStream=stream}return _createClass(ReadableStreamController,[{key:"close",value:function(){if(IsReadableStreamController(this)===!1)throw new TypeError("ReadableStreamController.prototype.close can only be used on a ReadableStreamController");var stream=this._controlledReadableStream;if(stream._closeRequested===!0)throw new TypeError("The stream has already been closed; do not close it again!");if("errored"===stream._state)throw new TypeError("The stream is in an errored state and cannot be closed");return CloseReadableStream(stream)}},{key:"enqueue",value:function(chunk){if(IsReadableStreamController(this)===!1)throw new TypeError("ReadableStreamController.prototype.enqueue can only be used on a ReadableStreamController");var stream=this._controlledReadableStream;if("errored"===stream._state)throw stream._storedError;if(stream._closeRequested===!0)throw new TypeError("stream is closed or draining");return EnqueueInReadableStream(stream,chunk)}},{key:"error",value:function(e){if(IsReadableStreamController(this)===!1)throw new TypeError("ReadableStreamController.prototype.error can only be used on a ReadableStreamController");if("readable"!==this._controlledReadableStream._state)throw new TypeError("The stream is "+this._controlledReadableStream._state+" and so cannot be errored");return ErrorReadableStream(this._controlledReadableStream,e)}},{key:"desiredSize",get:function(){if(IsReadableStreamController(this)===!1)throw new TypeError("ReadableStreamController.prototype.desiredSize can only be used on a ReadableStreamController");return GetReadableStreamDesiredSize(this._controlledReadableStream)}}]),ReadableStreamController}(),ReadableStreamReader=function(){function ReadableStreamReader(stream){var _this2=this;if(_classCallCheck(this,ReadableStreamReader),IsReadableStream(stream)===!1)throw new TypeError("ReadableStreamReader can only be constructed with a ReadableStream instance");if(IsReadableStreamLocked(stream)===!0)throw new TypeError("This stream has already been locked for exclusive reading by another reader");this._ownerReadableStream=stream,stream._reader=this,this._readRequests=[],"readable"===stream._state?this._closedPromise=new Promise(function(resolve,reject){_this2._closedPromise_resolve=resolve,_this2._closedPromise_reject=reject}):"closed"===stream._state?(this._closedPromise=Promise.resolve(void 0),this._closedPromise_resolve=void 0,this._closedPromise_reject=void 0):(assert("errored"===stream._state),this._closedPromise=Promise.reject(stream._storedError),this._closedPromise_resolve=void 0,this._closedPromise_reject=void 0)}return _createClass(ReadableStreamReader,[{key:"cancel",value:function(reason){return IsReadableStreamReader(this)===!1?Promise.reject(new TypeError("ReadableStreamReader.prototype.cancel can only be used on a ReadableStreamReader")):void 0===this._ownerReadableStream?Promise.reject(new TypeError("Cannot cancel a stream using a released reader")):CancelReadableStream(this._ownerReadableStream,reason)}},{key:"read",value:function(){return IsReadableStreamReader(this)===!1?Promise.reject(new TypeError("ReadableStreamReader.prototype.read can only be used on a ReadableStreamReader")):void 0===this._ownerReadableStream?Promise.reject(new TypeError("Cannot read from a released reader")):ReadFromReadableStreamReader(this)}},{key:"releaseLock",value:function(){if(IsReadableStreamReader(this)===!1)throw new TypeError("ReadableStreamReader.prototype.releaseLock can only be used on a ReadableStreamReader");if(void 0!==this._ownerReadableStream){if(this._readRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");"readable"===this._ownerReadableStream._state?this._closedPromise_reject(new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")):this._closedPromise=Promise.reject(new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")),this._ownerReadableStream._reader=void 0,this._ownerReadableStream=void 0}}},{key:"closed",get:function(){return IsReadableStreamReader(this)===!1?Promise.reject(new TypeError("ReadableStreamReader.prototype.closed can only be used on a ReadableStreamReader")):this._closedPromise}}]),ReadableStreamReader}(),CountQueuingStrategy=function(){function CountQueuingStrategy(_ref6){var highWaterMark=_ref6.highWaterMark;_classCallCheck(this,CountQueuingStrategy),createDataProperty(this,"highWaterMark",highWaterMark)}return _createClass(CountQueuingStrategy,[{key:"size",value:function(chunk){return 1}}]),CountQueuingStrategy}(),assert$4=require("assert"),WritableStream=function(){function WritableStream(){var _this3=this,underlyingSink=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref7=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],size=_ref7.size,_ref7$highWaterMark=_ref7.highWaterMark,highWaterMark=void 0===_ref7$highWaterMark?0:_ref7$highWaterMark;_classCallCheck(this,WritableStream),this._underlyingSink=underlyingSink,this._closedPromise=new Promise(function(resolve,reject){_this3._closedPromise_resolve=resolve,_this3._closedPromise_reject=reject}),this._readyPromise=Promise.resolve(void 0),this._readyPromise_resolve=null,this._queue=[],this._state="writable",this._started=!1,this._writing=!1;var normalizedStrategy=ValidateAndNormalizeQueuingStrategy(size,highWaterMark);this._strategySize=normalizedStrategy.size,this._strategyHWM=normalizedStrategy.highWaterMark,SyncWritableStreamStateWithQueue(this);var error=closure_WritableStreamErrorFunction();error._stream=this;var startResult=InvokeOrNoop(underlyingSink,"start",[error]);this._startedPromise=Promise.resolve(startResult),this._startedPromise.then(function(){_this3._started=!0,_this3._startedPromise=void 0}),this._startedPromise["catch"](function(r){return ErrorWritableStream(_this3,r)})["catch"](rethrowAssertionErrorRejection)}return _createClass(WritableStream,[{key:"abort",value:function(reason){if(!IsWritableStream(this))return Promise.reject(new TypeError("WritableStream.prototype.abort can only be used on a WritableStream"));if("closed"===this._state)return Promise.resolve(void 0);if("errored"===this._state)return Promise.reject(this._storedError);ErrorWritableStream(this,reason);var sinkAbortPromise=PromiseInvokeOrFallbackOrNoop(this._underlyingSink,"abort",[reason],"close",[]);return sinkAbortPromise.then(function(){})}},{key:"close",value:function(){return IsWritableStream(this)?"closing"===this._state?Promise.reject(new TypeError("cannot close an already-closing stream")):"closed"===this._state?Promise.reject(new TypeError("cannot close an already-closed stream")):"errored"===this._state?Promise.reject(this._storedError):("waiting"===this._state&&this._readyPromise_resolve(void 0),this._state="closing",EnqueueValueWithSize(this._queue,"close",0),CallOrScheduleWritableStreamAdvanceQueue(this),this._closedPromise):Promise.reject(new TypeError("WritableStream.prototype.close can only be used on a WritableStream"))}},{key:"write",value:function(chunk){if(!IsWritableStream(this))return Promise.reject(new TypeError("WritableStream.prototype.write can only be used on a WritableStream"));if("closing"===this._state)return Promise.reject(new TypeError("cannot write while stream is closing"));if("closed"===this._state)return Promise.reject(new TypeError("cannot write after stream is closed"));if("errored"===this._state)return Promise.reject(this._storedError);assert$4("waiting"===this._state||"writable"===this._state);var chunkSize=1;if(void 0!==this._strategySize)try{chunkSize=this._strategySize(chunk)}catch(chunkSizeE){return ErrorWritableStream(this,chunkSizeE),Promise.reject(chunkSizeE)}var resolver=void 0,rejecter=void 0,promise=new Promise(function(resolve,reject){resolver=resolve,rejecter=reject}),writeRecord={promise:promise,chunk:chunk,_resolve:resolver,_reject:rejecter};try{EnqueueValueWithSize(this._queue,writeRecord,chunkSize)}catch(enqueueResultE){return ErrorWritableStream(this,enqueueResultE),Promise.reject(enqueueResultE)}return SyncWritableStreamStateWithQueue(this),CallOrScheduleWritableStreamAdvanceQueue(this),promise}},{key:"closed",get:function(){return IsWritableStream(this)?this._closedPromise:Promise.reject(new TypeError("WritableStream.prototype.closed can only be used on a WritableStream"))}},{key:"state",get:function(){if(!IsWritableStream(this))throw new TypeError("WritableStream.prototype.state can only be used on a WritableStream");return this._state}},{key:"ready",get:function(){return IsWritableStream(this)?this._readyPromise:Promise.reject(new TypeError("WritableStream.prototype.ready can only be used on a WritableStream"))}}]),WritableStream}(),ByteLengthQueuingStrategy=function(){function ByteLengthQueuingStrategy(_ref8){var highWaterMark=_ref8.highWaterMark;_classCallCheck(this,ByteLengthQueuingStrategy),createDataProperty(this,"highWaterMark",highWaterMark)}return _createClass(ByteLengthQueuingStrategy,[{key:"size",value:function(chunk){return chunk.byteLength}}]),ByteLengthQueuingStrategy}(),TransformStream=function TransformStream(transformer){function maybeDoTransform(){if(transforming===!1){transforming=!0;try{transformer.transform(writeChunk,enqueueInReadable,transformDone),writeChunk=void 0,chunkWrittenButNotYetTransformed=!1}catch(e){transforming=!1,errorWritable(e),errorReadable(e)}}}function transformDone(){transforming=!1,writeDone()}if(_classCallCheck(this,TransformStream),void 0===transformer.flush&&(transformer.flush=function(enqueue,close){return close()}),"function"!=typeof transformer.transform)throw new TypeError("transform must be a function");var writeChunk=void 0,writeDone=void 0,errorWritable=void 0,transforming=!1,chunkWrittenButNotYetTransformed=!1;this.writable=new WritableStream({start:function(error){errorWritable=error},write:function(chunk){writeChunk=chunk,chunkWrittenButNotYetTransformed=!0;var p=new Promise(function(resolve){return writeDone=resolve});return maybeDoTransform(),p},close:function(){try{transformer.flush(enqueueInReadable,closeReadable)}catch(e){errorWritable(e),errorReadable(e)}}},transformer.writableStrategy);var enqueueInReadable=void 0,closeReadable=void 0,errorReadable=void 0;this.readable=new ReadableStream({start:function(c){enqueueInReadable=c.enqueue.bind(c),closeReadable=c.close.bind(c),errorReadable=c.error.bind(c)},pull:function(){chunkWrittenButNotYetTransformed===!0&&maybeDoTransform()}},transformer.readableStrategy)},assert$5=require("assert"),ReadableByteStream=function(){function ReadableByteStream(){var underlyingByteSource=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];_classCallCheck(this,ReadableByteStream),this._state="readable",this._reader=void 0,this._storedError=void 0,this._controller=void 0,this._controller=new ReadableByteStreamController(this,underlyingByteSource)}return _createClass(ReadableByteStream,[{key:"cancel",value:function(reason){return IsReadableByteStream(this)===!1?Promise.reject(new TypeError("ReadableByteStream.prototype.cancel can only be used on a ReadableByteStream")):IsReadableByteStreamLocked(this)===!0?Promise.reject(new TypeError("Cannot cancel a stream that already has a reader")):CancelReadableByteStream(this,reason)}},{key:"getByobReader",value:function(){if(IsReadableByteStream(this)===!1)throw new TypeError("ReadableByteStream.prototype.getByobReader can only be used on a ReadableByteStream");return new ReadableByteStreamByobReader(this)}},{key:"getReader",value:function(){if(IsReadableByteStream(this)===!1)throw new TypeError("ReadableByteStream.prototype.getReader can only be used on a ReadableByteStream");return new ReadableByteStreamReader(this)}}]),ReadableByteStream}(),ReadableByteStreamController=function(){function ReadableByteStreamController(controlledReadableByteStream,underlyingByteSource){if(_classCallCheck(this,ReadableByteStreamController),IsReadableByteStream(controlledReadableByteStream)===!1)throw new TypeError("ReadableByteStreamController can only be constructed with a ReadableByteStream instance");if(void 0!==controlledReadableByteStream._controller)throw new TypeError("ReadableByteStreamController instances can only be created by the ReadableByteStream constructor");this._controlledReadableByteStream=controlledReadableByteStream,this._underlyingByteSource=underlyingByteSource,this._pullAgain=!1,this._pulling=!1,this._pendingPullIntos=[],this._queue=[],this._totalQueuedBytes=0,this._closeRequested=!1,InvokeOrNoop(underlyingByteSource,"start",[this])}return _createClass(ReadableByteStreamController,[{key:"close",value:function(){if(!IsReadableByteStreamController(this))throw new TypeError("ReadableByteStreamController.prototype.close can only be used on a ReadableByteStreamController");var stream=this._controlledReadableByteStream;if(this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!");if("readable"!==stream._state)throw new TypeError("The stream is not in the readable state and cannot be closed");if(this._totalQueuedBytes>0)return void(this._closeRequested=!0);var reader=stream._reader;if(IsReadableByteStreamByobReader(reader)&&this._pendingPullIntos.length>0){var pullInto=this._pendingPullIntos[0];if(pullInto.bytesFilled>0){DestroyReadableByteStreamController(this);var e=new TypeError("Insufficient bytes to fill elements in the given buffer");throw ErrorReadableByteStream(stream,e),e}}CloseReadableByteStream(stream)}},{key:"enqueue",value:function(chunk){if(!IsReadableByteStreamController(this))throw new TypeError("ReadableByteStreamController.prototype.enqueue can only be used on a ReadableByteStreamController");var stream=this._controlledReadableByteStream;if(this._closeRequested)throw new TypeError("stream is closed or draining");if("readable"!==stream._state)throw new TypeError("The stream is not in the readable state and cannot be enqueued to");var reader=stream._reader,buffer=chunk.buffer,byteOffset=chunk.byteOffset,byteLength=chunk.byteLength;if(void 0===reader)EnqueueInReadableByteStreamController(this,TransferArrayBuffer(buffer),byteOffset,byteLength);else if(IsReadableByteStreamReader(reader))if(0===reader._readRequests.length)EnqueueInReadableByteStreamController(this,TransferArrayBuffer(buffer),byteOffset,byteLength);else{assert$5(0===this._queue.length);var transferredView=new Uint8Array(TransferArrayBuffer(buffer),byteOffset,byteLength);RespondToReadRequest(reader,transferredView),reader._readRequests.length>0&&ReadableByteStreamControllerCallPullOrPullIntoLaterIfNeeded(this)}else assert$5(IsReadableByteStreamByobReader(reader),"reader must be ReadableByteStreamByobReader"),EnqueueInReadableByteStreamController(this,TransferArrayBuffer(buffer),byteOffset,byteLength),RespondToReadIntoRequestsFromQueue(this,reader)}},{key:"error",value:function(e){if(!IsReadableByteStreamController(this))throw new TypeError("ReadableByteStreamController.prototype.error can only be used on a ReadableByteStreamController");var stream=this._controlledReadableByteStream;if("readable"!==stream._state)throw new TypeError("The stream is "+stream._state+" and so cannot be errored");DestroyReadableByteStreamController(this),ErrorReadableByteStream(stream,e)}},{key:"respond",value:function(bytesWritten,buffer){if(!IsReadableByteStreamController(this))throw new TypeError("ReadableByteStreamController.prototype.respond can only be used on a ReadableByteStreamController");var stream=this._controlledReadableByteStream;if(0===this._pendingPullIntos.length)throw new TypeError("No pending BYOB read");assert$5(IsReadableByteStreamLocked(stream),"stream must be locked");var reader=stream._reader;if(assert$5(IsReadableByteStreamByobReader(reader),"reader must be ReadableByteStreamByobReader"),"closed"===stream._state){if(0!==bytesWritten)throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");RespondToByobReaderInClosedState(this,reader,buffer)}else assert$5("readable"===stream._state),RespondToByobReaderInReadableState(this,reader,bytesWritten,buffer)}}]),ReadableByteStreamController}(),ReadableByteStreamReader=function(){function ReadableByteStreamReader(stream){if(_classCallCheck(this,ReadableByteStreamReader),!IsReadableByteStream(stream))throw new TypeError("ReadableByteStreamReader can only be constructed with a ReadableByteStream instance");if(IsReadableByteStreamLocked(stream))throw new TypeError("This stream has already been locked for exclusive reading by another reader");InitializeReadableByteStreamReaderGeneric(this,stream),this._readRequests=[]}return _createClass(ReadableByteStreamReader,[{key:"cancel",value:function(reason){return IsReadableByteStreamReader(this)?"closed"===this._state?Promise.resolve(void 0):"errored"===this._state?Promise.reject(this._storedError):(assert$5(void 0!==this._ownerReadableByteStream,"This reader must be attached to a stream"),CancelReadableByteStream(this._ownerReadableByteStream,reason)):Promise.reject(new TypeError("ReadableByteStreamReader.prototype.cancel can only be used on a ReadableByteStreamReader"))}},{key:"read",value:function(){var _this4=this;if(!IsReadableByteStreamReader(this))return Promise.reject(new TypeError("ReadableByteStreamReader.prototype.read can only be used on a ReadableByteStreamReader"));if("closed"===this._state)return Promise.resolve(CreateIterResultObject(void 0,!0));if("errored"===this._state)return Promise.reject(this._storedError);assert$5(void 0!==this._ownerReadableByteStream,"This reader must be attached to a stream"),assert$5("readable"===this._ownerReadableByteStream._state,"The owner stream must be in readable state");var promise=new Promise(function(resolve,reject){_this4._readRequests.push({resolve:resolve,reject:reject})});return PullFromReadableByteStream(this._ownerReadableByteStream),promise}},{key:"releaseLock",value:function(){if(!IsReadableByteStreamReader(this))throw new TypeError("ReadableByteStreamReader.prototype.releaseLock can only be used on a ReadableByteStreamReader");if(void 0!==this._ownerReadableByteStream){if(this._readRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");assert$5("readable"===this._ownerReadableByteStream._state),ReleaseReadableByteStreamReaderGeneric(this),CloseReadableByteStreamReaderGeneric(this)}}},{key:"closed",get:function(){return IsReadableByteStreamReader(this)?this._closedPromise:Promise.reject(new TypeError("ReadableByteStreamReader.prototype.closed can only be used on a ReadableByteStreamReader"))}}]),ReadableByteStreamReader}(),ReadableByteStreamByobReader=function(){function ReadableByteStreamByobReader(stream){if(_classCallCheck(this,ReadableByteStreamByobReader),!IsReadableByteStream(stream))throw new TypeError("ReadableByteStreamByobReader can only be constructed with a ReadableByteStream instance");if(IsReadableByteStreamLocked(stream))throw new TypeError("This stream has already been locked for exclusive reading by another reader");InitializeReadableByteStreamReaderGeneric(this,stream),this._readIntoRequests=[]}return _createClass(ReadableByteStreamByobReader,[{key:"cancel",value:function(reason){return IsReadableByteStreamByobReader(this)?"closed"===this._state?Promise.resolve(void 0):"errored"===this._state?Promise.reject(this._storedError):(assert$5(void 0!==this._ownerReadableByteStream,"This stream must be attached to a stream"),CancelReadableByteStream(this._ownerReadableByteStream,reason)):Promise.reject(new TypeError("ReadableByteStreamByobReader.prototype.cancel can only be used on a ReadableByteStreamByobReader"))}},{key:"read",value:function(view){var _this5=this;if(!IsReadableByteStreamByobReader(this))return Promise.reject(new TypeError("ReadableByteStreamByobReader.prototype.read can only be used on a ReadableByteStreamByobReader"));if(void 0===view||!ArrayBuffer.isView(view))return Promise.reject(new TypeError("Valid view must be provided"));var ctor=view.constructor,elementSize=1;if(ctor===Int16Array||ctor===Uint16Array||ctor===Int32Array||ctor===Uint32Array||ctor===Float32Array||ctor===Float64Array||ctor===Int8Array||ctor===Uint8Array||ctor===Uint8ClampedArray)elementSize=ctor.BYTES_PER_ELEMENT;else if(ctor!==DataView)return Promise.reject(new TypeError("view is of an unsupported type"));if(0===view.byteLength)return Promise.reject(new TypeError("view must have non-zero byteLength"));if("errored"===this._state)return assert$5(void 0===this._ownerReadableByteStream,"This reader must be detached"),Promise.reject(this._storedError);if("closed"===this._state&&void 0===this._ownerReadableByteStream)return Promise.resolve(CreateIterResultObject(new ctor(view.buffer,view.byteOffset,0),!0));var promise=new Promise(function(resolve,reject){var req={resolve:resolve,reject:reject,byteOffset:view.byteOffset,byteLength:view.byteLength,ctor:ctor,elementSize:elementSize};_this5._readIntoRequests.push(req)});return PullFromReadableByteStreamInto(this._ownerReadableByteStream,view.buffer,view.byteOffset,view.byteLength,elementSize),promise}},{key:"releaseLock",value:function(){if(!IsReadableByteStreamByobReader(this))throw new TypeError("ReadableByteStreamByobReader.prototype.releaseLock can only be used on a ReadableByteStreamByobReader");if(void 0!==this._ownerReadableByteStream){if(this._readIntoRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");assert$5("readable"===this._ownerReadableByteStream._state),ReleaseReadableByteStreamReaderGeneric(this),CloseReadableByteStreamReaderGeneric(this)}}},{key:"closed",get:function(){return IsReadableByteStreamByobReader(this)?this._closedPromise:Promise.reject(new TypeError("ReadableByteStreamByobReader.prototype.closed can only be used on a ReadableByteStreamByobReader"))}}]),ReadableByteStreamByobReader}(),interfaces={ReadableByteStream:ReadableByteStream,ReadableStream:ReadableStream,WritableStream:WritableStream,ByteLengthQueuingStrategy:ByteLengthQueuingStrategy,CountQueuingStrategy:CountQueuingStrategy,TransformStream:TransformStream};Object.assign(global,interfaces),exports["default"]=interfaces;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":8,"assert":6}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipe;

var _utils = require("./utils");

var _pipeAsync = require("./pipeAsync");

var _pipeAsync2 = _interopRequireDefault(_pipeAsync);

var _pipeFn = require("./pipeFn");

var _pipeFn2 = _interopRequireDefault(_pipeFn);

var _pipeGen = require("./pipeGen");

var _pipeGen2 = _interopRequireDefault(_pipeGen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pipe :: Function | Generator Function -> Opts {} -> TransformBlueprint
// pipe takes any normal/generator func and returns transform stream blueprint.
//
// pipe.async :: Async Function -> Opts {} -> TransformBlueprint
// pipe.async takes any async func and returns transform stream blueprint.
//

function pipe(fn, opts) {
  // Route to appropriate function
  if ((0, _utils.isGeneratorFn)(fn)) return (0, _pipeGen2.default)(fn, opts);else if ((0, _utils.isFunction)(fn)) return (0, _pipeFn2.default)(fn, opts);else throw new Error("Invalid argument");
}

// Add async support
pipe.async = _pipeAsync2.default;
},{"./pipeAsync":13,"./pipeFn":14,"./pipeGen":15,"./utils":18}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipeAsync;

var _streams = require("./streams");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // pipeAsync :: Async Function -> Opts {} -> TransformBlueprint
// pipeAsync takes an async function and wraps it into
// a transform streams. Waits till completion, before enqueuing.
//
// Returns a blueprint class that can be used to
// instantiate above streams.
//

function pipeAsync(fn) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var
  // opts
  init = _ref.init;
  var readableStrategy = _ref.readableStrategy;
  var writableStrategy = _ref.writableStrategy;


  // Prepare transformer
  var transformer = {
    // Store awaiting functions
    _unfulfilledFutures: [],

    // Run function and enqueue result
    transform: function transform(chunk, enqueue, done) {
      // Run async fn
      var self = transformer,
          future = fn(chunk),


      // Get index of current future
      findex = self._unfulfilledFutures.length;

      // Add to executing futures list
      self._unfulfilledFutures.push(future);

      // Proceed to enqueue
      future.then(enqueue, function () {
        // Signal error to stream
        throw new Error();
      })

      // Remove itself from the _unfulfilledFutures list
      .then(function () {
        return self._unfulfilledFutures.splice(findex, 1);
      }).done(done);

      return future;
    },
    flush: function flush(enqueue, close) {
      var self = transformer;

      // Check if anything is left
      Promise.all(self._unfulfilledFutures).then(function (vs) {
        return vs.map(enqueue);
      }).done(close);
    },


    // if passed
    readableStrategy: readableStrategy,
    writableStrategy: writableStrategy
  };

  // Wrap in blueprint class

  var TransformBlueprint = function (_TransformStream) {
    _inherits(TransformBlueprint, _TransformStream);

    function TransformBlueprint() {
      var _this, _ret;

      _classCallCheck(this, TransformBlueprint);

      // Make stream
      var stream = (_this = _possibleConstructorReturn(this, Object.getPrototypeOf(TransformBlueprint).call(this, transformer)), _this);

      // If init, push chunk
      if (init !== void 0) stream.writable.write(init);

      return _ret = stream, _possibleConstructorReturn(_this, _ret);
    }

    return TransformBlueprint;
  }(_streams.TransformStream);

  return TransformBlueprint;
}
},{"./streams":17}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipeFn;

var _streams = require("./streams");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // pipeFn :: Function -> Opts {} -> TransformBlueprint
// pipeFn takes a function and wraps it into
// a transform streams.
// Returns a blueprint class that can be used to
// instantiate above streams.
//

function pipeFn(fn) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var
  // opts
  init = _ref.init;
  var readableStrategy = _ref.readableStrategy;
  var writableStrategy = _ref.writableStrategy;


  // Prepare transformer
  var transformer = {
    // Run function and enqueue result

    transform: function transform(chunk, enqueue, done) {
      enqueue(fn(chunk));

      return done();
    },


    // if passed
    readableStrategy: readableStrategy,
    writableStrategy: writableStrategy
  };

  // Wrap in blueprint class

  var TransformBlueprint = function (_TransformStream) {
    _inherits(TransformBlueprint, _TransformStream);

    function TransformBlueprint() {
      var _this, _ret;

      _classCallCheck(this, TransformBlueprint);

      // Make stream
      var stream = (_this = _possibleConstructorReturn(this, Object.getPrototypeOf(TransformBlueprint).call(this, transformer)), _this);

      // If init, push chunk
      if (init !== void 0) stream.writable.write(init);

      return _ret = stream, _possibleConstructorReturn(_this, _ret);
    }

    return TransformBlueprint;
  }(_streams.TransformStream);

  return TransformBlueprint;
}
},{"./streams":17}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // pipeGen :: Generator Function -> Opts {} -> TransformBlueprint
// pipeGen takes a generator function and wraps it into
// a transform streams. Waits till completion, before enqueuing.
// All yields are enqueued, back-pressure is respected and
// the generator paused if queue getting back-pressured.
//
// Returns a blueprint class that can be used to
// instantiate above streams.
//

exports.default = pipeGen;

var _streams = require("./streams");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Manages generator object and consumes it
// while taking backpressure into account

var GenObjManager = function () {
  function GenObjManager(gen, enqueue, readable) {
    _classCallCheck(this, GenObjManager);

    var done = undefined,
        promise = new Promise(function (resolve) {
      done = resolve;
    });

    // Add props
    Object.assign(this, {
      done: done, gen: gen, enqueue: enqueue, readable: readable, promise: promise,
      running: false
    });
  }

  // Make manager a thenable


  _createClass(GenObjManager, [{
    key: "start",


    // Kick start the read loop
    value: function start() {
      if (this.running || !this.gen) return;

      // Start the loop
      this.running = true;
      this.tick();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.running = false;
    }
  }, {
    key: "close",
    value: function close() {
      this.pause();

      // Close generator
      this.gen.return();
      this.gen = null;

      // Call done
      this.done();
    }

    // Flush the gen and close

  }, {
    key: "flush",
    value: function flush() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      if (!this.gen) return;

      // Pause
      this.pause();

      // Read gen n times
      // passing it a true value to signal shutdown
      while (n--) {
        this.tick(true);
      } // Close the generator
      this.close();
    }
  }, {
    key: "tick",
    value: function tick(msg) {
      // Get next value

      var _gen$next = this.gen.next(msg);

      var value = _gen$next.value;
      var done = _gen$next.done;

      // Enqueue value to stream

      this.enqueue(value);

      // Process next tick
      if (done) {
        this.close();
      } else if (this.running && this.ready) {
        this.tick(msg);
      } else {
        this.pause();
      }
    }
  }, {
    key: "then",
    get: function get() {
      return this.promise.then.bind(this.promise);
    }

    // Get backpressure signals

  }, {
    key: "ready",
    get: function get() {
      return this.readable._controller.desiredSize >= 0;
    }
  }]);

  return GenObjManager;
}();

function pipeGen(fn) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var
  // opts
  init = _ref.init;
  var readableStrategy = _ref.readableStrategy;
  var writableStrategy = _ref.writableStrategy;


  // Prepare transformer
  var genManager = undefined,
      transformer = {
    transform: function transform(chunk, enqueue, done) {
      // Create generator manager
      genManager = new GenObjManager(fn(chunk), enqueue, this.readable);

      // Set up closing
      genManager.then(function () {
        return done();
      });

      // Start consuming
      genManager.start();
    },
    flush: function flush(enqueue, close) {
      // Flush generator
      genManager && genManager.flush();
      close();
    },


    // if passed
    readableStrategy: readableStrategy,
    writableStrategy: writableStrategy
  };

  // Wrap in blueprint class

  var TransformBlueprint = function (_TransformStream) {
    _inherits(TransformBlueprint, _TransformStream);

    function TransformBlueprint() {
      var _this, _ret;

      _classCallCheck(this, TransformBlueprint);

      // Make stream
      var stream = (_this = _possibleConstructorReturn(this, Object.getPrototypeOf(TransformBlueprint).call(this, transformer)), _this);

      // Bind transform function to stream
      transformer.transform = transformer.transform.bind(stream);

      // Super hacky because TransformStream doesn't allow an easy way to do this
      // Wrap pull so that it can signal generator to resume
      var _pull = stream.readable._underlyingSource.pull;
      stream.readable._underlyingSource.pull = function (c) {

        // Resume generator manager
        genManager && genManager.start();

        return _pull(c);
      };

      // If init, push chunk
      if (init !== void 0) stream.writable.write(init);

      return _ret = stream, _possibleConstructorReturn(_this, _ret);
    }

    return TransformBlueprint;
  }(_streams.TransformStream);

  return TransformBlueprint;
}
},{"./streams":17}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = split;
// split :: ReadableStream -> Int -> [ReadableStream]
// split function takes a readable stream and number
// and returns an array of tee'd readable streams,
// with a `cancelAll` function that cancels all the tee'd
// streams and hence the original stream.
//

function split(stream) {
  var parts = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

  // Check for readable stream
  if (!stream.tee) throw new Error("Only readable streams can be split");

  // Decls
  var result = undefined,
      cancelFns = undefined,
      cancelAll = undefined;

  // Generate parts
  result = [stream];

  while (parts > result.length) {
    // Take last part
    var s = result.pop();

    // Add new parts after tee'ing
    result = result.concat(s.tee());
  }

  // Take cancel functions
  cancelFns = result.map(function (s) {
    return s.cancel.bind(s);
  });

  // Gen cancelAll
  cancelAll = function cancelAll() {
    return cancelFns.forEach(function (c) {
      return c();
    });
  };

  // Add cancelAll to all the parts
  result.forEach(function (s) {
    s.cancelAll = cancelAll;
  });

  return result;
}
},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Access stream interface

var interfaces = undefined,
    global = global || {};

if (typeof window !== 'undefined') global = window;

if (!!global.ReadableStream) {

  interfaces = {
    ReadableByteStream: global.ReadableByteStream,
    ReadableStream: global.ReadableStream,
    WritableStream: global.WritableStream,
    ByteLengthQueuingStrategy: global.ByteLengthQueuingStrategy,
    CountQueuingStrategy: global.CountQueuingStrategy,
    TransformStream: global.TransformStream
  };
} else {

  try {
    interfaces = require("web-streams-polyfill")["default"];
  } catch (e) {

    throw new Error("No Stream implementation found");
  }
}

var ReadableByteStream = exports.ReadableByteStream = interfaces.ReadableByteStream,
    ReadableStream = exports.ReadableStream = interfaces.ReadableStream,
    WritableStream = exports.WritableStream = interfaces.WritableStream,
    ByteLengthQueuingStrategy = exports.ByteLengthQueuingStrategy = interfaces.ByteLengthQueuingStrategy,
    CountQueuingStrategy = exports.CountQueuingStrategy = interfaces.CountQueuingStrategy,
    TransformStream = exports.TransformStream = interfaces.TransformStream;

exports.default = interfaces;
},{"web-streams-polyfill":11}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = zipWith;
// Utils
var isTransform = exports.isTransform = function isTransform(s) {
  return s && s.writable && s.readable;
},
    isReadable = exports.isReadable = function isReadable(s) {
  return s && s.pipeThrough;
},
    isWritable = exports.isWritable = function isWritable(s) {
  return s && s.write;
},


// Inspired by code from @tj/co library
isFunction = exports.isFunction = function isFunction(f) {
  return f && typeof f === "function";
},
    isGenerator = exports.isGenerator = function isGenerator(o) {
  return o && isFunction(o.next);
},
    isGeneratorFn = exports.isGeneratorFn = function isGeneratorFn(_ref) {
  var constructor = _ref.constructor;

  return constructor && (constructor.name === "GeneratorFunction" || constructor.displayName === "GeneratorFunction");
};

// Zips together two arrays using given fn
function zipWith(fn, arr1, arr2) {
  var res = [];

  // Pop values, push zipped values
  while (arr1.length && arr2.length) {
    res.push(fn(arr1.pop(), arr2.pop()));
  }return res;
}
},{}]},{},[4]);
