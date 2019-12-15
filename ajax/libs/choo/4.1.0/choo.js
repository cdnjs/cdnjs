(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.choo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var createLocation = require('sheet-router/create-location');
var onHistoryChange = require('sheet-router/history');
var sheetRouter = require('sheet-router');
var onHref = require('sheet-router/href');
var walk = require('sheet-router/walk');
var mutate = require('xtend/mutable');
var barracks = require('barracks');
var nanoraf = require('nanoraf');
var assert = require('assert');
var xtend = require('xtend');
var yo = require('yo-yo');

module.exports = choo;

// framework for creating sturdy web applications
// null -> fn
function choo(opts) {
  opts = opts || {};

  var _store = start._store = barracks();
  var _router = start._router = null;
  var _routerOpts = null;
  var _rootNode = null;
  var _routes = null;
  var _frame = null;

  if (typeof window !== 'undefined') {
    _store.use({ onStateChange: render });
  }
  _store.use(opts);

  start.toString = toString;
  start.router = router;
  start.model = model;
  start.start = start;
  start.stop = _store.stop;
  start.use = use;

  return start;

  // render the application to a string
  // (str, obj) -> str
  function toString(route, serverState) {
    serverState = serverState || {};
    assert.equal(typeof route, 'string', 'choo.app.toString: route must be a string');
    assert.equal(typeof serverState, 'object', 'choo.app.toString: serverState must be an object');
    _store.start({ subscriptions: false, reducers: false, effects: false });

    var state = _store.state({ state: serverState });
    var router = createRouter(_routerOpts, _routes, createSend);
    var tree = router(route, state);
    return tree.outerHTML || tree.toString();

    function createSend() {
      return function send() {
        assert.ok(false, 'choo: send() cannot be called from Node');
      };
    }
  }

  // start the application
  // (str?, obj?) -> DOMNode
  function start() {
    _store.model(createLocationModel(opts));
    var createSend = _store.start(opts);
    _router = start._router = createRouter(_routerOpts, _routes, createSend);
    var state = _store.state({ state: {} });

    var tree = _router(state.location.href, state);
    assert.ok(tree, 'choo.start: the router should always return a valid DOM node');
    assert.equal(typeof tree, 'object', 'choo.start: the router should always return a valid DOM node');
    _rootNode = tree;
    tree.done = done;

    return tree;

    // allow a 'mount' function to return the new node
    // html -> null
    function done(newNode) {
      _rootNode = newNode;
    }
  }

  // update the DOM after every state mutation
  // (obj, obj, obj, str, fn) -> null
  function render(state, data, prev, name, createSend) {
    if (!_frame) {
      _frame = nanoraf(function (state, prev) {
        var newTree = _router(state.location.href, state, prev);
        _rootNode = yo.update(_rootNode, newTree);
      });
    }
    _frame(state, prev);
  }

  // register all routes on the router
  // (str?, [fn|[fn]]) -> obj
  function router(defaultRoute, routes) {
    _routerOpts = defaultRoute;
    _routes = routes;
  }

  // create a new model
  // (str?, obj) -> null
  function model(model) {
    _store.model(model);
  }

  // register a plugin
  // (obj) -> null
  function use(hooks) {
    assert.equal(typeof hooks, 'object', 'choo.use: hooks should be an object');
    _store.use(hooks);
  }

  // create a new router with a custom `createRoute()` function
  // (str?, obj) -> null
  function createRouter(routerOpts, routes, createSend) {
    var prev = null;
    if (!routes) {
      routes = routerOpts;
      routerOpts = {};
    }
    routerOpts = mutate({ thunk: 'match' }, routerOpts);
    var router = sheetRouter(routerOpts, routes);
    walk(router, wrap);

    return router;

    function wrap(route, handler) {
      var send = createSend('view: ' + route, true);
      return function chooWrap(params) {
        return function (state) {
          // TODO(yw): find a way to wrap handlers so params shows up in state
          var nwState = xtend(state);
          nwState.location = xtend(nwState.location, { params: params });

          var nwPrev = prev;
          prev = nwState; // save for next time

          if (opts.freeze !== false) Object.freeze(nwState);
          return handler(nwState, nwPrev, send);
        };
      };
    }
  }
}

// application location model
// obj -> obj
function createLocationModel(opts) {
  return {
    namespace: 'location',
    state: mutate(createLocation(), { params: {} }),
    subscriptions: createSubscriptions(opts),
    effects: { set: setLocation, touch: touchLocation },
    reducers: { update: updateLocation }
  };

  // update the location on the state
  // try and jump to an anchor on the page if it exists
  // (obj, obj) -> obj
  function updateLocation(state, data) {
    if (opts.history !== false && data.hash && data.hash !== state.hash) {
      try {
        var el = document.querySelector(data.hash);
        if (el) el.scrollIntoView(true);
      } catch (e) {
        return data;
      }
    }
    return data;
  }

  // update internal location only
  // (str, obj, fn, fn) -> null
  function touchLocation(state, data, send, done) {
    var newLocation = createLocation(state, data);
    send('location:update', newLocation, done);
  }

  // set a new location e.g. "/foo/bar#baz?beep=boop"
  // (str, obj, fn, fn) -> null
  function setLocation(state, data, send, done) {
    var newLocation = createLocation(state, data);

    // update url bar if it changed
    if (opts.history !== false && newLocation.href !== state.href) {
      window.history.pushState({}, null, newLocation.href);
    }

    send('location:update', newLocation, done);
  }

  function createSubscriptions(opts) {
    var subs = {};

    if (opts.history !== false) {
      subs.handleHistory = function (send, done) {
        onHistoryChange(function navigate(href) {
          send('location:touch', href, done);
        });
      };
    }

    if (opts.href !== false) {
      subs.handleHref = function (send, done) {
        onHref(function navigate(location) {
          send('location:set', location, done);
        });
      };
    }

    return subs;
  }
}
},{"assert":2,"barracks":4,"nanoraf":10,"sheet-router":15,"sheet-router/create-location":12,"sheet-router/history":13,"sheet-router/href":14,"sheet-router/walk":17,"xtend":24,"xtend/mutable":25,"yo-yo":26}],2:[function(require,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

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

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = function () {
  return function foo() {}.name === 'foo';
}();
function pToString(obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
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
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
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

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' + name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' + self.operator + ' ' + truncate(inspect(self.expected), 128);
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
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

    // 7.2. If the expected value is a Date object, the actual value is
    // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

    // 7.3 If the expected value is a RegExp object, the actual value is
    // equivalent if it is also a RegExp object with the same source and
    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;

    // 7.4. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') && (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

    // If both values are instances of typed arrays, wrap their underlying
    // ArrayBuffers in a Buffer each to increase performance
    // This optimization requires the arrays to have the same type as checked by
    // Object.prototype.toString (aka pToString). Never perform binary
    // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
    // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer)) === 0;

    // 7.5 For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || { actual: [], expected: [] };

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined) return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b)) return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects)) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}

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
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if (isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function (block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function (block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function (err) {
  if (err) throw err;
};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util/":20}],3:[function(require,module,exports){
module.exports = applyHook;

// apply arguments onto an array of functions, useful for hooks
// (arr, any?, any?, any?, any?, any?) -> null
function applyHook(arr, arg1, arg2, arg3, arg4, arg5) {
  arr.forEach(function (fn) {
    fn(arg1, arg2, arg3, arg4, arg5);
  });
}
},{}],4:[function(require,module,exports){
var mutate = require('xtend/mutable');
var nanotick = require('nanotick');
var assert = require('assert');
var xtend = require('xtend');

var applyHook = require('./apply-hook');

module.exports = dispatcher;

// initialize a new barracks instance
// obj -> obj
function dispatcher(hooks) {
  hooks = hooks || {};
  assert.equal(typeof hooks, 'object', 'barracks: hooks should be undefined or an object');

  var onStateChangeHooks = [];
  var onActionHooks = [];
  var onErrorHooks = [];

  var subscriptionWraps = [];
  var initialStateWraps = [];
  var reducerWraps = [];
  var effectWraps = [];

  use(hooks);

  var reducersCalled = false;
  var effectsCalled = false;
  var stateCalled = false;
  var subsCalled = false;
  var stopped = false;

  var subscriptions = start._subscriptions = {};
  var reducers = start._reducers = {};
  var effects = start._effects = {};
  var models = start._models = [];
  var _state = {};

  var tick = nanotick();

  start.model = setModel;
  start.state = getState;
  start.start = start;
  start.stop = stop;
  start.use = use;

  return start;

  // push an object of hooks onto an array
  // obj -> null
  function use(hooks) {
    assert.equal(typeof hooks, 'object', 'barracks.use: hooks should be an object');
    assert.ok(!hooks.onError || typeof hooks.onError === 'function', 'barracks.use: onError should be undefined or a function');
    assert.ok(!hooks.onAction || typeof hooks.onAction === 'function', 'barracks.use: onAction should be undefined or a function');
    assert.ok(!hooks.onStateChange || typeof hooks.onStateChange === 'function', 'barracks.use: onStateChange should be undefined or a function');

    if (hooks.onStateChange) onStateChangeHooks.push(hooks.onStateChange);
    if (hooks.onError) onErrorHooks.push(wrapOnError(hooks.onError));
    if (hooks.onAction) onActionHooks.push(hooks.onAction);
    if (hooks.wrapSubscriptions) subscriptionWraps.push(hooks.wrapSubscriptions);
    if (hooks.wrapInitialState) initialStateWraps.push(hooks.wrapInitialState);
    if (hooks.wrapReducers) reducerWraps.push(hooks.wrapReducers);
    if (hooks.wrapEffects) effectWraps.push(hooks.wrapEffects);
    if (hooks.models) hooks.models.forEach(setModel);
  }

  // push a model to be initiated
  // obj -> null
  function setModel(model) {
    assert.equal(typeof model, 'object', 'barracks.store.model: model should be an object');
    models.push(model);
  }

  // get the current state from the store
  // obj? -> obj
  function getState(opts) {
    opts = opts || {};
    assert.equal(typeof opts, 'object', 'barracks.store.state: opts should be an object');

    var state = opts.state;
    if (!opts.state && opts.freeze === false) return xtend(_state);else if (!opts.state) return Object.freeze(xtend(_state));
    assert.equal(typeof state, 'object', 'barracks.store.state: state should be an object');

    var namespaces = [];
    var newState = {};

    // apply all fields from the model, and namespaced fields from the passed
    // in state
    models.forEach(function (model) {
      var ns = model.namespace;
      namespaces.push(ns);
      var modelState = model.state || {};
      if (ns) {
        newState[ns] = newState[ns] || {};
        apply(ns, modelState, newState);
        newState[ns] = xtend(newState[ns], state[ns]);
      } else {
        mutate(newState, modelState);
      }
    });

    // now apply all fields that weren't namespaced from the passed in state
    Object.keys(state).forEach(function (key) {
      if (namespaces.indexOf(key) !== -1) return;
      newState[key] = state[key];
    });

    var tmpState = xtend(_state, xtend(state, newState));
    var wrappedState = wrapHook(tmpState, initialStateWraps);

    return opts.freeze === false ? wrappedState : Object.freeze(wrappedState);
  }

  // initialize the store hooks, get the send() function
  // obj? -> fn
  function start(opts) {
    opts = opts || {};
    assert.equal(typeof opts, 'object', 'barracks.store.start: opts should be undefined or an object');

    // register values from the models
    models.forEach(function (model) {
      var ns = model.namespace;
      if (!stateCalled && model.state && opts.state !== false) {
        var modelState = model.state || {};
        if (ns) {
          _state[ns] = _state[ns] || {};
          apply(ns, modelState, _state);
        } else {
          mutate(_state, modelState);
        }
      }
      if (!reducersCalled && model.reducers && opts.reducers !== false) {
        apply(ns, model.reducers, reducers, function (cb) {
          return wrapHook(cb, reducerWraps);
        });
      }
      if (!effectsCalled && model.effects && opts.effects !== false) {
        apply(ns, model.effects, effects, function (cb) {
          return wrapHook(cb, effectWraps);
        });
      }
      if (!subsCalled && model.subscriptions && opts.subscriptions !== false) {
        apply(ns, model.subscriptions, subscriptions, function (cb, key) {
          var send = createSend('subscription: ' + (ns ? ns + ':' + key : key));
          cb = wrapHook(cb, subscriptionWraps);
          cb(send, function (err) {
            applyHook(onErrorHooks, err, _state, createSend);
          });
          return cb;
        });
      }
    });

    // the state wrap is special because we want to operate on the full
    // state rather than indvidual chunks, so we apply it outside the loop
    if (!stateCalled && opts.state !== false) {
      _state = wrapHook(_state, initialStateWraps);
      if (onStateChangeHooks.length) {
        applyHook(onStateChangeHooks, _state, {}, {}, 'init', createSend);
      }
    }

    if (!opts.noSubscriptions) subsCalled = true;
    if (!opts.noReducers) reducersCalled = true;
    if (!opts.noEffects) effectsCalled = true;
    if (!opts.noState) stateCalled = true;

    if (!onErrorHooks.length) onErrorHooks.push(wrapOnError(defaultOnError));

    return createSend;

    // call an action from a view
    // (str, bool?) -> (str, any?, fn?) -> null
    function createSend(selfName, callOnError) {
      assert.equal(typeof selfName, 'string', 'barracks.store.start.createSend: selfName should be a string');
      assert.ok(!callOnError || typeof callOnError === 'boolean', 'barracks.store.start.send: callOnError should be undefined or a boolean');

      return function send(name, data, cb) {
        if (!cb && !callOnError) {
          cb = data;
          data = null;
        }
        data = typeof data === 'undefined' ? null : data;

        assert.equal(typeof name, 'string', 'barracks.store.start.send: name should be a string');
        assert.ok(!cb || typeof cb === 'function', 'barracks.store.start.send: cb should be a function');

        var done = callOnError ? onErrorCallback : cb;
        _send(name, data, selfName, done);

        function onErrorCallback(err) {
          err = err || null;
          if (err) {
            applyHook(onErrorHooks, err, _state, function createSend(selfName) {
              return function send(name, data) {
                assert.equal(typeof name, 'string', 'barracks.store.start.send: name should be a string');
                data = typeof data === 'undefined' ? null : data;
                _send(name, data, selfName, done);
              };
            });
          }
        }
      };
    }

    // call an action
    // (str, str, any, fn) -> null
    function _send(name, data, caller, cb) {
      if (stopped) return;

      assert.equal(typeof name, 'string', 'barracks._send: name should be a string');
      assert.equal(typeof caller, 'string', 'barracks._send: caller should be a string');
      assert.equal(typeof cb, 'function', 'barracks._send: cb should be a function');tick(function () {
        var reducersCalled = false;
        var effectsCalled = false;
        var newState = xtend(_state);

        if (onActionHooks.length) {
          applyHook(onActionHooks, _state, data, name, caller, createSend);
        }

        // validate if a namespace exists. Namespaces are delimited by ':'.
        var actionName = name;
        if (/:/.test(name)) {
          var arr = name.split(':');
          var ns = arr.shift();
          actionName = arr.join(':');
        }

        var _reducers = ns ? reducers[ns] : reducers;
        if (_reducers && _reducers[actionName]) {
          if (ns) {
            var reducedState = _reducers[actionName](_state[ns], data);
            newState[ns] = xtend(_state[ns], reducedState);
          } else {
            mutate(newState, reducers[actionName](_state, data));
          }
          reducersCalled = true;
          if (onStateChangeHooks.length) {
            applyHook(onStateChangeHooks, newState, data, _state, actionName, createSend);
          }
          _state = newState;
          cb(null, newState);
        }

        var _effects = ns ? effects[ns] : effects;
        if (!reducersCalled && _effects && _effects[actionName]) {
          var send = createSend('effect: ' + name);
          if (ns) _effects[actionName](_state[ns], data, send, cb);else _effects[actionName](_state, data, send, cb);
          effectsCalled = true;
        }

        if (!reducersCalled && !effectsCalled) {
          throw new Error('Could not find action ' + actionName);
        }
      })();
    }
  }

  // stop an app, essentially turns
  // all send() calls into no-ops.
  // () -> null
  function stop() {
    stopped = true;
  }
}

// compose an object conditionally
// optionally contains a namespace
// which is used to nest properties.
// (str, obj, obj, fn?) -> null
function apply(ns, source, target, wrap) {
  if (ns && !target[ns]) target[ns] = {};
  Object.keys(source).forEach(function (key) {
    var cb = wrap ? wrap(source[key], key) : source[key];
    if (ns) target[ns][key] = cb;else target[key] = cb;
  });
}

// handle errors all the way at the top of the trace
// err? -> null
function defaultOnError(err) {
  throw err;
}

function wrapOnError(onError) {
  return function onErrorWrap(err, state, createSend) {
    if (err) onError(err, state, createSend);
  };
}

// take a apply an array of transforms onto a value. The new value
// must be returned synchronously from the transform
// (any, [fn]) -> any
function wrapHook(value, transforms) {
  transforms.forEach(function (transform) {
    value = transform(value);
  });
  return value;
}
},{"./apply-hook":3,"assert":2,"nanotick":28,"xtend":24,"xtend/mutable":25}],5:[function(require,module,exports){

},{}],6:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
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
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};
},{}],7:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":5}],8:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined") {
    module.exports = self;
} else {
    module.exports = {};
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
'use strict';
// Create a range object for efficently rendering strings to elements.

var range;

var doc = typeof document !== 'undefined' && document;

var testEl = doc ? doc.body || doc.createElement('div') : {};

var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var hasAttributeNS;

if (testEl.hasAttributeNS) {
    hasAttributeNS = function (el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    hasAttributeNS = function (el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    hasAttributeNS = function (el, namespaceURI, name) {
        return !!el.getAttributeNode(name);
    };
}

function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function (fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function (fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function (fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            fromEl.firstChild.nodeValue = newValue;
        }
    }
};

function noop() {}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize && fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
    toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
            // If the target element is a virtual DOM node then we may need to normalize the tag name
            // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
            // are converted to upper case
            return fromNodeName === toNodeName.toUpperCase();
        } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
}

/**
 * Loop over all of the attributes on the target node and make sure the original
 * DOM node has the same attributes. If an attribute found on the original node
 * is not on the new node then remove it from the original node.
 *
 * @param  {Element} fromNode
 * @param  {Element} toNode
 */
function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    if (toNode.assignAttributes) {
        toNode.assignAttributes(fromNode);
    } else {
        for (i = attrs.length - 1; i >= 0; --i) {
            attr = attrs[i];
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;
            attrValue = attr.value;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;
                fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
                }
            } else {
                fromValue = fromNode.getAttribute(attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttribute(attrName, attrValue);
                }
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!hasAttributeNS(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdom(fromNode, toNode, options) {
    if (!options) {
        options = {};
    }

    if (typeof toNode === 'string') {
        if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
            var toNodeHtml = toNode;
            toNode = doc.createElement('html');
            toNode.innerHTML = toNodeHtml;
        } else {
            toNode = toElement(toNode);
        }
    }

    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
    var onNodeAdded = options.onNodeAdded || noop;
    var onBeforeElUpdated = options.onBeforeElUpdated || noop;
    var onElUpdated = options.onElUpdated || noop;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
    var onNodeDiscarded = options.onNodeDiscarded || noop;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
    var childrenOnly = options.childrenOnly === true;

    // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
    var fromNodesLookup = {};
    var keyedRemovalList;

    function addKeyedRemoval(key) {
        if (keyedRemovalList) {
            keyedRemovalList.push(key);
        } else {
            keyedRemovalList = [key];
        }
    }

    function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {

                var key = undefined;

                if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                    // If we are skipping keyed nodes then we add the key
                    // to a list so that it can be handled at the very end.
                    addKeyedRemoval(key);
                } else {
                    // Only report the node as discarded if it is not keyed. We do this because
                    // at the end we loop through all keyed elements that were unmatched
                    // and then discard them in one final pass.
                    onNodeDiscarded(curChild);
                    if (curChild.firstChild) {
                        walkDiscardedChildNodes(curChild, skipKeyedNodes);
                    }
                }

                curChild = curChild.nextSibling;
            }
        }
    }

    /**
     * Removes a DOM node out of the original DOM
     *
     * @param  {Node} node The node to remove
     * @param  {Node} parentNode The nodes parent
     * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
     * @return {undefined}
     */
    function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
            return;
        }

        if (parentNode) {
            parentNode.removeChild(node);
        }

        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
    }

    // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
    // function indexTree(root) {
    //     var treeWalker = document.createTreeWalker(
    //         root,
    //         NodeFilter.SHOW_ELEMENT);
    //
    //     var el;
    //     while((el = treeWalker.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
    //
    // function indexTree(node) {
    //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
    //     var el;
    //     while((el = nodeIterator.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {
                var key = getNodeKey(curChild);
                if (key) {
                    fromNodesLookup[key] = curChild;
                }

                // Walk recursively
                indexTree(curChild);

                curChild = curChild.nextSibling;
            }
        }
    }

    indexTree(fromNode);

    function handleNodeAdded(el) {
        onNodeAdded(el);

        var curChild = el.firstChild;
        while (curChild) {
            var nextSibling = curChild.nextSibling;

            var key = getNodeKey(curChild);
            if (key) {
                var unmatchedFromEl = fromNodesLookup[key];
                if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                    curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                    morphEl(unmatchedFromEl, curChild);
                }
            }

            handleNodeAdded(curChild);
            curChild = nextSibling;
        }
    }

    function morphEl(fromEl, toEl, childrenOnly) {
        var toElKey = getNodeKey(toEl);
        var curFromNodeKey;

        if (toElKey) {
            // If an element with an ID is being morphed then it is will be in the final
            // DOM so clear it out of the saved elements collection
            delete fromNodesLookup[toElKey];
        }

        if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
            return;
        }

        if (!childrenOnly) {
            if (onBeforeElUpdated(fromEl, toEl) === false) {
                return;
            }

            morphAttrs(fromEl, toEl);
            onElUpdated(fromEl);

            if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                return;
            }
        }

        if (fromEl.nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = getNodeKey(curToNodeChild);

                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    curFromNodeKey = getNodeKey(curFromNodeChild);

                    var curFromNodeType = curFromNodeChild.nodeType;

                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                                        if (curFromNodeChild.nextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's moving the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked
                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            if (curFromNodeKey) {
                                                // Since the node is keyed it might be matched up later so we defer
                                                // the actual removal to later
                                                addKeyedRemoval(curFromNodeKey);
                                            } else {
                                                // NOTE: we skip nested keyed nodes from being removed since there is
                                                //       still a chance they will be matched up later
                                                removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                            }
                                            fromNextSibling = curFromNodeChild.nextSibling;
                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild);
                            }
                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }
                    }

                    if (isCompatible) {
                        // Advance both the "to" child and the "from" child since we found a match
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    if (curFromNodeKey) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }

                    curFromNodeChild = fromNextSibling;
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    morphEl(matchingFromEl, curToNodeChild);
                } else {
                    var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                    if (onBeforeNodeAddedResult !== false) {
                        if (onBeforeNodeAddedResult) {
                            curToNodeChild = onBeforeNodeAddedResult;
                        }

                        if (curToNodeChild.actualize) {
                            curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        fromEl.appendChild(curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                    }
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                fromNextSibling = curFromNodeChild.nextSibling;
                if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
                    // Since the node is keyed it might be matched up later so we defer
                    // the actual removal to later
                    addKeyedRemoval(curFromNodeKey);
                } else {
                    // NOTE: we skip nested keyed nodes from being removed since there is
                    //       still a chance they will be matched up later
                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                }
                curFromNodeChild = fromNextSibling;
            }
        }

        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
        // Handle the case where we are given two DOM nodes that are not
        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
        if (morphedNodeType === ELEMENT_NODE) {
            if (toNodeType === ELEMENT_NODE) {
                if (!compareNodeNames(fromNode, toNode)) {
                    onNodeDiscarded(fromNode);
                    morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                }
            } else {
                // Going from an element node to a text node
                morphedNode = toNode;
            }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
            // Text or comment node
            if (toNodeType === morphedNodeType) {
                morphedNode.nodeValue = toNode.nodeValue;
                return morphedNode;
            } else {
                // Text node to something else
                morphedNode = toNode;
            }
        }
    }

    if (morphedNode === toNode) {
        // The "to node" was not compatible with the "from node" so we had to
        // toss out the "from node" and use the "to node"
        onNodeDiscarded(fromNode);
    } else {
        morphEl(morphedNode, toNode, childrenOnly);

        // We now need to loop over any keyed nodes that might need to be
        // removed. We only do the removal if we know that the keyed node
        // never found a match. When a keyed node is matched up we remove
        // it out of fromNodesLookup and we use fromNodesLookup to determine
        // if a keyed node has been matched up or not
        if (keyedRemovalList) {
            for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
                var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                if (elToRemove) {
                    removeNode(elToRemove, elToRemove.parentNode, false);
                }
            }
        }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
            morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        // If we had to swap out the from node with a new node because the old
        // node was not compatible with the target node then we need to
        // replace the old DOM node in the original DOM tree. This is only
        // possible if the original DOM node was part of a DOM tree which
        // we know is the case if it has a parent node.
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
}

module.exports = morphdom;
},{}],10:[function(require,module,exports){
var window = require('global/window');
var assert = require('assert');

module.exports = nanoraf;

// Only call RAF when needed
// (fn, fn?) -> fn
function nanoraf(render, raf) {
  assert.equal(typeof render, 'function', 'nanoraf: render should be a function');
  assert.ok(typeof raf === 'function' || typeof raf === 'undefined', 'nanoraf: raf should be a function or undefined');

  if (!raf) raf = window.requestAnimationFrame;

  var inRenderingTransaction = false;
  var redrawScheduled = false;
  var currentState = null;

  // pass new state to be rendered
  // (obj, obj?) -> null
  return function frame(state, prev) {
    assert.equal(typeof state, 'object', 'nanoraf: state should be an object');
    assert.equal(typeof prev, 'object', 'nanoraf: prev should be an object');
    assert.equal(inRenderingTransaction, false, 'nanoraf: infinite loop detected');

    // request a redraw for next frame
    if (currentState === null && !redrawScheduled) {
      redrawScheduled = true;

      raf(function redraw() {
        redrawScheduled = false;
        if (!currentState) return;

        inRenderingTransaction = true;
        render(currentState, prev);
        inRenderingTransaction = false;

        currentState = null;
      });
    }

    // update data for redraw
    currentState = state;
  };
}
},{"assert":2,"global/window":8}],11:[function(require,module,exports){
/* eslint-disable no-useless-escape */
var electron = '^(file:\/\/|\/)(.*\.html?\/?)?';
var protocol = '^(http(s)?(:\/\/))?(www\.)?';
var domain = '[a-zA-Z0-9-_\.]+(:[0-9]{1,5})?(\/{1})?';
var qs = '[\?].*$';
/* eslint-enable no-useless-escape */

var stripElectron = new RegExp(electron);
var prefix = new RegExp(protocol + domain);
var normalize = new RegExp('#');
var suffix = new RegExp(qs);

module.exports = pathname;

// replace everything in a route but the pathname and hash
// TODO(yw): ditch 'suffix' and allow qs routing
// (str, bool) -> str
function pathname(route, isElectron) {
  if (isElectron) route = route.replace(stripElectron, '');else route = route.replace(prefix, '');
  return route.replace(suffix, '').replace(normalize, '/');
}
},{}],12:[function(require,module,exports){
var document = require('global/document');
var assert = require('assert');
var xtend = require('xtend');

var qs = require('./qs');

module.exports = createLocation;

// takes an initial representation of the location state
// and then synchronize a mutation across all fields
//
// scenarios:
// - create a state object from document.location; we got no state yet
// - create a new state object from a string we pass in; full override mode
// - patch a state object with some value we pass in - lil patchy stuff
//
// (obj?, str?) -> obj
function createLocation(state, patch) {
  if (!state) {
    var newLocation = {
      pathname: document.location.pathname,
      search: document.location.search ? qs(document.location.search) : {},
      hash: document.location.hash,
      href: document.location.href
    };
    return newLocation;
  } else {
    assert.equal(typeof state, 'object', 'sheet-router/create-location: state should be an object');
    if (typeof patch === 'string') {
      var _newLocation = parseUrl(patch);
      return _newLocation;
    } else {
      assert.equal(typeof patch, 'object', 'sheet-router/create-location: patch should be an object');
      var _newLocation2 = xtend(state, patch);
      return _newLocation2;
    }
  }

  // parse a URL into a kv object inside the browser
  // str -> obj
  function parseUrl(url) {
    var a = document.createElement('a');
    a.href = url;

    return {
      href: a.href,
      pathname: a.pathname,
      search: a.search ? qs(a.search) : {},
      hash: a.hash
    };
  }
}
},{"./qs":16,"assert":2,"global/document":7,"xtend":24}],13:[function(require,module,exports){
var document = require('global/document');
var window = require('global/window');
var assert = require('assert');

module.exports = history;

// listen to html5 pushstate events
// and update router accordingly
// fn(str) -> null
function history(cb) {
  assert.equal(typeof cb, 'function', 'sheet-router/history: cb must be a function');
  window.onpopstate = function () {
    cb({
      pathname: document.location.pathname,
      search: document.location.search,
      href: document.location.href,
      hash: document.location.hash
    });
  };
}
},{"assert":2,"global/document":7,"global/window":8}],14:[function(require,module,exports){
var window = require('global/window');
var assert = require('assert');

var qs = require('./qs');

module.exports = href;

var noRoutingAttrName = 'data-no-routing';

// handle a click if is anchor tag with an href
// and url lives on the same domain. Replaces
// trailing '#' so empty links work as expected.
// (fn(str), obj?) -> undefined
function href(cb, root) {
  assert.equal(typeof cb, 'function', 'sheet-router/href: cb must be a function');

  window.onclick = function (e) {
    if (e.button && e.button !== 0 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

    var node = function traverse(node) {
      if (!node || node === root) return;
      if (node.localName !== 'a') return traverse(node.parentNode);
      if (node.href === undefined) return traverse(node.parentNode);
      if (window.location.host !== node.host) return traverse(node.parentNode);
      return node;
    }(e.target);

    if (!node) return;

    var isRoutingDisabled = node.hasAttribute(noRoutingAttrName);
    if (isRoutingDisabled) return;

    e.preventDefault();
    cb({
      pathname: node.pathname,
      search: node.search ? qs(node.search) : {},
      href: node.href,
      hash: node.hash
    });
  };
}
},{"./qs":16,"assert":2,"global/window":8}],15:[function(require,module,exports){
var window = require('global/window');
var pathname = require('./_pathname');
var wayfarer = require('wayfarer');
var assert = require('assert');

var isElectron = window.process && window.process.type;

module.exports = sheetRouter;

// Fast, modular client router
// fn(str, any[..]) -> fn(str, any[..])
function sheetRouter(opts, tree) {
  if (!tree) {
    tree = opts;
    opts = {};
  }

  assert.equal(typeof opts, 'object', 'sheet-router: opts must be a object');
  assert.ok(Array.isArray(tree), 'sheet-router: tree must be an array');

  var dft = opts.default || '/404';
  assert.equal(typeof dft, 'string', 'sheet-router: dft must be a string');

  var router = wayfarer(dft);
  var prevCallback = null;
  var prevRoute = null;

  match._router = router

  // register tree in router
  // tree[0] is a string, thus a route
  // tree[0] is an array, thus not a route
  // tree[1] is a function
  // tree[2] is an array
  // tree[2] is not an array
  // tree[1] is an array
  ;(function walk(tree, fullRoute) {
    if (typeof tree[0] === 'string') {
      var route = tree[0].replace(/^[#\/]/, '');
    } else {
      var rootArr = tree[0];
    }

    var cb = typeof tree[1] === 'function' ? tree[1] : null;
    var children = Array.isArray(tree[1]) ? tree[1] : Array.isArray(tree[2]) ? tree[2] : null;

    if (rootArr) {
      tree.forEach(function (node) {
        walk(node, fullRoute);
      });
    }

    if (cb) {
      var innerRoute = route ? fullRoute.concat(route).join('/') : fullRoute.length ? fullRoute.join('/') : route;

      // if opts.thunk is false or only enabled for match, don't thunk
      var handler = opts.thunk === false || opts.thunk === 'match' ? cb : thunkify(cb);
      router.on(innerRoute, handler);
    }

    if (Array.isArray(children)) {
      walk(children, fullRoute.concat(route));
    }
  })(tree, []);

  return match;

  // match a route on the router
  //
  // no thunking -> call route with all arguments
  // thunking only for match -> call route with all arguments
  // thunking and route is same -> call prev cb with new args
  // thunking and route is diff -> create cb and call with new args
  //
  // (str, [any..]) -> any
  function match(route, arg1, arg2, arg3, arg4, arg5) {
    assert.equal(typeof route, 'string', 'sheet-router: route must be a string');

    if (opts.thunk === false) {
      return router(pathname(route, isElectron), arg1, arg2, arg3, arg4, arg5);
    } else if (route === prevRoute) {
      return prevCallback(arg1, arg2, arg3, arg4, arg5);
    } else {
      prevRoute = pathname(route, isElectron);
      prevCallback = router(prevRoute);
      return prevCallback(arg1, arg2, arg3, arg4, arg5);
    }
  }
}

// wrap a function in a function so it can be called at a later time
// fn -> obj -> (any, any, any, any, any)
function thunkify(cb) {
  return function (params) {
    return function (arg1, arg2, arg3, arg4, arg5) {
      return cb(params, arg1, arg2, arg3, arg4, arg5);
    };
  };
}
},{"./_pathname":11,"assert":2,"global/window":8,"wayfarer":21}],16:[function(require,module,exports){
var window = require('global/window');

var decodeURIComponent = window.decodeURIComponent;
var reg = new RegExp('([^?=&]+)(=([^&]*))?', 'g');

module.exports = qs;

// decode a uri into a kv representation :: str -> obj
function qs(uri) {
  var obj = {};
  uri.replace(/^.*\?/, '').replace(reg, map);
  return obj;

  function map(a0, a1, a2, a3) {
    obj[decodeURIComponent(a1)] = decodeURIComponent(a3);
  }
}
},{"global/window":8}],17:[function(require,module,exports){
var walk = require('wayfarer/walk');
var assert = require('assert');

module.exports = walkSheetRouter;

function walkSheetRouter(router, cb) {
  assert.equal(typeof router, 'function', 'sheet-router/walk: router should be a function');
  assert.equal(typeof cb, 'function', 'sheet-router/walk: cb should be a function');

  router = router._router;
  return walk(router, cb);
}
},{"assert":2,"wayfarer/walk":23}],18:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
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
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
},{}],19:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};
},{}],20:[function(require,module,exports){
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
exports.format = function (f) {
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
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
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
exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
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
exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
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
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
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
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};

  array.forEach(function (val, idx) {
    hash[val] = true;
  });

  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) &&
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
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
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

  var base = '',
      array = false,
      braces = ['{', '}'];

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
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
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
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
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
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
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
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
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

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
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

exports._extend = function (origin, add) {
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
},{"./support/isBuffer":19,"_process":6,"inherits":18}],21:[function(require,module,exports){
var assert = require('assert');
var trie = require('./trie');

module.exports = Wayfarer;

// create a router
// str -> obj
function Wayfarer(dft) {
  if (!(this instanceof Wayfarer)) return new Wayfarer(dft);

  var _default = (dft || '').replace(/^\//, '');
  var _trie = trie();

  emit._trie = _trie;
  emit.emit = emit;
  emit.on = on;
  emit._wayfarer = true;

  return emit;

  // define a route
  // (str, fn) -> obj
  function on(route, cb) {
    assert.equal(typeof route, 'string');
    assert.equal(typeof cb, 'function');

    route = route || '/';

    if (cb && cb._wayfarer && cb._trie) {
      _trie.mount(route, cb._trie.trie);
    } else {
      var node = _trie.create(route);
      node.cb = cb;
    }

    return emit;
  }

  // match and call a route
  // (str, obj?) -> null
  function emit(route) {
    assert.notEqual(route, undefined, "'route' must be defined");
    var args = new Array(arguments.length);
    for (var i = 1; i < args.length; i++) {
      args[i] = arguments[i];
    }

    var node = _trie.match(route);
    if (node && node.cb) {
      args[0] = node.params;
      return node.cb.apply(null, args);
    }

    var dft = _trie.match(_default);
    if (dft && dft.cb) {
      args[0] = dft.params;
      return dft.cb.apply(null, args);
    }

    throw new Error("route '" + route + "' did not match");
  }
}
},{"./trie":22,"assert":2}],22:[function(require,module,exports){
var mutate = require('xtend/mutable');
var assert = require('assert');
var xtend = require('xtend');

module.exports = Trie;

// create a new trie
// null -> obj
function Trie() {
  if (!(this instanceof Trie)) return new Trie();
  this.trie = { nodes: {} };
}

// create a node on the trie at route
// and return a node
// str -> null
Trie.prototype.create = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string');
  // strip leading '/' and split routes
  var routes = route.replace(/^\//, '').split('/');
  return function createNode(index, trie, routes) {
    var route = routes[index];

    if (route === undefined) return trie;

    var node = null;
    if (/^:/.test(route)) {
      // if node is a name match, set name and append to ':' node
      if (!trie.nodes['$$']) {
        node = { nodes: {} };
        trie.nodes['$$'] = node;
      } else {
        node = trie.nodes['$$'];
      }
      trie.name = route.replace(/^:/, '');
    } else if (!trie.nodes[route]) {
      node = { nodes: {} };
      trie.nodes[route] = node;
    } else {
      node = trie.nodes[route];
    }

    // we must recurse deeper
    return createNode(index + 1, node, routes);
  }(0, this.trie, routes);
};

// match a route on the trie
// and return the node
// str -> obj
Trie.prototype.match = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string');

  var routes = route.replace(/^\//, '').split('/');
  var params = {};

  var node = function search(index, trie) {
    // either there's no match, or we're done searching
    if (trie === undefined) return undefined;
    var route = routes[index];
    if (route === undefined) return trie;

    if (trie.nodes[route]) {
      // match regular routes first
      return search(index + 1, trie.nodes[route]);
    } else if (trie.name) {
      // match named routes
      params[trie.name] = route;
      return search(index + 1, trie.nodes['$$']);
    } else {
      // no matches found
      return search(index + 1);
    }
  }(0, this.trie);

  if (!node) return undefined;
  node = xtend(node);
  node.params = params;
  return node;
};

// mount a trie onto a node at route
// (str, obj) -> null
Trie.prototype.mount = function (route, trie) {
  assert.equal(typeof route, 'string', 'route should be a string');
  assert.equal(typeof trie, 'object', 'trie should be a object');

  var split = route.replace(/^\//, '').split('/');
  var node = null;
  var key = null;

  if (split.length === 1) {
    key = split[0];
    node = this.create(key);
  } else {
    var headArr = split.splice(0, split.length - 1);
    var head = headArr.join('/');
    key = split[0];
    node = this.create(head);
  }

  mutate(node.nodes, trie.nodes);
  if (trie.name) node.name = trie.name;

  // delegate properties from '/' to the new node
  // '/' cannot be reached once mounted
  if (node.nodes['']) {
    Object.keys(node.nodes['']).forEach(function (key) {
      if (key === 'nodes') return;
      node[key] = node.nodes[''][key];
    });
    mutate(node.nodes, node.nodes[''].nodes);
    delete node.nodes[''].nodes;
  }
};
},{"assert":2,"xtend":24,"xtend/mutable":25}],23:[function(require,module,exports){
var assert = require('assert');

module.exports = walk;

// walk a wayfarer trie
// (obj, fn) -> null
function walk(router, transform) {
  assert.equal(typeof router, 'function', 'wayfarer.walk: router should be an function');
  assert.equal(typeof transform, 'function', 'wayfarer.walk: transform should be a function');

  var trie = router._trie;
  assert.equal(typeof trie, 'object', 'wayfarer.walk: trie should be an object')

  // (str, obj) -> null
  ;(function walk(route, trie) {
    if (trie.cb) {
      trie.cb = transform(route, trie.cb);
    }

    if (trie.nodes) {
      (function () {
        var nodes = trie.nodes;
        Object.keys(nodes).forEach(function (key) {
          var node = nodes[key];
          var newRoute = key === '$$' ? route + '/:' + trie.name : route + '/' + key;
          walk(newRoute, node);
        });
      })();
    }
  })('', trie.trie);
}
},{"assert":2}],24:[function(require,module,exports){
module.exports = extend;

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
}
},{}],25:[function(require,module,exports){
module.exports = extend;

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
}
},{}],26:[function(require,module,exports){
var bel = {}; // turns template tag into DOM elements
var morphdom = require('morphdom'); // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js'); // default events to be copied when dom elements update

module.exports = bel;

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {};
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier;
  }

  return morphdom(fromNode, toNode, opts);

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier(f, t) {
    // copy events:
    var events = opts.events || defaultEvents;
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      if (t[ev]) {
        // if new element has a whitelisted attribute
        f[ev] = t[ev]; // update existing element
      } else if (f[ev]) {
        // if existing element has it and new one doesnt
        f[ev] = undefined; // remove it from existing element
      }
    }
    // copy values for form elements
    if (f.nodeName === 'INPUT' && f.type !== 'file' || f.nodeName === 'SELECT') {
      if (t.getAttribute('value') === null) t.value = f.value;
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value;
    }
  }
};
},{"./update-events.js":27,"morphdom":9}],27:[function(require,module,exports){
module.exports = [
// attribute events (can be set with attributes)
'onclick', 'ondblclick', 'onmousedown', 'onmouseup', 'onmouseover', 'onmousemove', 'onmouseout', 'ondragstart', 'ondrag', 'ondragenter', 'ondragleave', 'ondragover', 'ondrop', 'ondragend', 'onkeydown', 'onkeypress', 'onkeyup', 'onunload', 'onabort', 'onerror', 'onresize', 'onscroll', 'onselect', 'onchange', 'onsubmit', 'onreset', 'onfocus', 'onblur', 'oninput',
// other common events
'oncontextmenu', 'onfocusin', 'onfocusout'];
},{}],28:[function(require,module,exports){
/* eslint-disable no-eval */
var assert = require('assert');

module.exports = nanotick;
var delay = typeof window !== 'undefined' && window.document ? typeof setImmediate !== 'undefined' ? setImmediate : setTimeout : eval('process.nextTick');

// Process.nextTick() batching ulity
// null -> fn(any) -> fn(any)
function nanotick() {
  var callbacks = [];
  var interval = false;

  return function tick(cb) {
    assert.equal(typeof cb, 'function', 'nanotick.tick: cb should be a function');

    var isAsync = false;

    executeAsync(function () {
      isAsync = true;
    });

    return function wrappedTick() {
      var length = arguments.length;
      var args = [];
      for (var i = 0; i < length; i++) {
        args.push[arguments[i]];
      }

      if (isAsync) {
        cb.apply(cb, args);
      } else {
        executeAsync(function () {
          cb.apply(cb, args);
        });
      }
    };
  };

  function executeAsync(cb) {
    callbacks.push(cb);

    if (!interval) {
      interval = true;
      delay(function () {
        while (callbacks.length > 0) {
          callbacks.shift()();
        }
        interval = false;
      });
    }
  }
}
},{"assert":2}]},{},[1])(1)
});