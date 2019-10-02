/*
	Ractive.js v1.3.8
	Build: 2584a0f8b90e1ff96a15df9d956d71e500f8eaa0
	Date: Mon Sep 16 2019 20:54:41 GMT+0000 (UTC)
	Website: https://ractive.js.org
	License: MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(function() {
		var current = global.Ractive;
		var exports = factory();
		global.Ractive = exports;
		exports.noConflict = function() { global.Ractive = current; return exports; };
	})();
}(this, (function () { 'use strict';

/* istanbul ignore if */
if (!Object.assign) {
  Object.assign = function(target) {
    var sources = [], len = arguments.length - 1;
    while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

    if (target == null) { throw new TypeError('Cannot convert undefined or null to object'); }

    var to = Object(target);
    var sourcesLength = sources.length;

    for (var index = 0; index < sourcesLength; index++) {
      var nextSource = sources[index];
      for (var nextKey in nextSource) {
        if (!Object.prototype.hasOwnProperty.call(nextSource, nextKey)) { continue; }
        to[nextKey] = nextSource[nextKey];
      }
    }

    return to;
  };
}

function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function fillGaps(target) {
  var sources = [], len = arguments.length - 1;
  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

  for (var i = 0; i < sources.length; i++) {
    var source = sources[i];
    for (var key in source) {
      // Source can be a prototype-less object.
      if (key in target || !hasOwn(source, key)) { continue; }
      target[key] = source[key];
    }
  }

  return target;
}

function toPairs(obj) {
  if ( obj === void 0 ) obj = {};

  var pairs = [];
  for (var key in obj) {
    // Source can be a prototype-less object.
    if (!hasOwn(obj, key)) { continue; }
    pairs.push([key, obj[key]]);
  }
  return pairs;
}

var obj = Object;

var assign = obj.assign;

var create = obj.create;

var defineProperty = obj.defineProperty;

var defineProperties = obj.defineProperties;

var keys = obj.keys;

var toString = Object.prototype.toString;


var isArray = Array.isArray;

function isEqual(a, b) {
  if (a === null && b === null) {
    return true;
  }

  if (isObjectType(a) || isObjectType(b)) {
    return false;
  }

  return a === b;
}

// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
function isNumeric(thing) {
  return !isNaN(parseFloat(thing)) && isFinite(thing);
}

function isObject(thing) {
  return thing && toString.call(thing) === '[object Object]';
}

function isObjectLike(thing) {
  return !!(thing && (isObjectType(thing) || isFunction(thing)));
}

function isObjectType(thing) {
  return typeof thing === 'object';
}

function isFunction(thing) {
  return typeof thing === 'function';
}

function isString(thing) {
  return typeof thing === 'string';
}

function isNumber(thing) {
  return typeof thing === 'number';
}

function isUndefined(thing) {
  return thing === undefined;
}

/* istanbul ignore if */
if (!Array.prototype.find) {
  defineProperty(Array.prototype, 'find', {
    value: function value(callback, thisArg) {
      if (this === null || isUndefined(this))
        { throw new TypeError('Array.prototype.find called on null or undefined'); }

      if (!isFunction(callback)) { throw new TypeError((callback + " is not a function")); }

      var array = Object(this);
      var arrayLength = array.length >>> 0;

      for (var index = 0; index < arrayLength; index++) {
        if (!hasOwn(array, index)) { continue; }
        if (!callback.call(thisArg, array[index], index, array)) { continue; }
        return array[index];
      }

      return undefined;
    },
    configurable: true,
    writable: true
  });
}

// NOTE: Node doesn't exist in IE8. Nothing can be done.
/* istanbul ignore if */
if (
  typeof window !== 'undefined' &&
  window.Node &&
  window.Node.prototype &&
  !window.Node.prototype.contains
) {
  Node.prototype.contains = function(node) {
    var this$1 = this;

    if (!node) { throw new TypeError('node required'); }

    do {
      if (this$1 === node) { return true; }
    } while ((node = node && node.parentNode));

    return false;
  };
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.performance && !window.performance.now) {
  window.performance = window.performance || {};

  var nowOffset = Date.now();

  window.performance.now = function() {
    return Date.now() - nowOffset;
  };
}

/* eslint no-console:"off" */
var win = typeof window !== 'undefined' ? window : null;
var doc = win ? document : null;
var isClient = !!doc;
var base = typeof global !== 'undefined' ? global : win;
var hasConsole =
  typeof console !== 'undefined' && isFunction(console.warn) && isFunction(console.warn.apply);

var svg = doc
  ? doc.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')
  : false;

var vendors = ['o', 'ms', 'moz', 'webkit'];

/* istanbul ignore if */
if (!base.Promise) {
  var PENDING = {};
  var FULFILLED = {};
  var REJECTED = {};

  var Promise$1 = (base.Promise = function(callback) {
    var fulfilledHandlers = [];
    var rejectedHandlers = [];
    var state = PENDING;
    var result;
    var dispatchHandlers;

    var makeResolver = function (newState) {
      return function(value) {
        if (state !== PENDING) { return; }
        result = value;
        state = newState;
        dispatchHandlers = makeDispatcher(
          state === FULFILLED ? fulfilledHandlers : rejectedHandlers,
          result
        );
        wait(dispatchHandlers);
      };
    };

    var fulfill = makeResolver(FULFILLED);
    var reject = makeResolver(REJECTED);

    try {
      callback(fulfill, reject);
    } catch (err) {
      reject(err);
    }

    return {
      // `then()` returns a Promise - 2.2.7
      then: function then(onFulfilled, onRejected) {
        var promise2 = new Promise$1(function (fulfill, reject) {
          var processResolutionHandler = function (handler, handlers, forward) {
            if (isFunction(handler)) {
              handlers.push(function (p1result) {
                try {
                  resolve$1(promise2, handler(p1result), fulfill, reject);
                } catch (err) {
                  reject(err);
                }
              });
            } else {
              handlers.push(forward);
            }
          };

          processResolutionHandler(onFulfilled, fulfilledHandlers, fulfill);
          processResolutionHandler(onRejected, rejectedHandlers, reject);

          if (state !== PENDING) {
            wait(dispatchHandlers);
          }
        });
        return promise2;
      },
      catch: function catch$1(onRejected) {
        return this.then(null, onRejected);
      },
      finally: function finally$1(callback) {
        return this.then(
          function (v) {
            callback();
            return v;
          },
          function (e) {
            callback();
            throw e;
          }
        );
      }
    };
  });

  Promise$1.all = function(promises) {
    return new Promise$1(function (fulfill, reject) {
      var result = [];
      var pending;
      var i;

      if (!promises.length) {
        fulfill(result);
        return;
      }

      var processPromise = function (promise, i) {
        if (promise && isFunction(promise.then)) {
          promise.then(function (value) {
            result[i] = value;
            --pending || fulfill(result);
          }, reject);
        } else {
          result[i] = promise;
          --pending || fulfill(result);
        }
      };

      pending = i = promises.length;

      while (i--) {
        processPromise(promises[i], i);
      }
    });
  };

  Promise$1.race = function(promises) {
    return new Promise$1(function (fulfill, reject) {
      var pending = true;
      function ok(v) {
        if (!pending) { return; }
        pending = false;
        fulfill(v);
      }
      function fail(e) {
        if (!pending) { return; }
        pending = false;
        reject(e);
      }
      for (var i = 0; i < promises.length; i++) {
        if (promises[i] && isFunction(promises[i].then)) {
          promises[i].then(ok, fail);
        }
      }
    });
  };

  Promise$1.resolve = function(value) {
    if (value && isFunction(value.then)) { return value; }
    return new Promise$1(function (fulfill) {
      fulfill(value);
    });
  };

  Promise$1.reject = function(reason) {
    if (reason && isFunction(reason.then)) { return reason; }
    return new Promise$1(function (fulfill, reject) {
      reject(reason);
    });
  };

  // TODO use MutationObservers or something to simulate setImmediate
  var wait = function(callback) {
    setTimeout(callback, 0);
  };

  var makeDispatcher = function(handlers, result) {
    return function() {
      for (var handler = (void 0); (handler = handlers.shift()); ) {
        handler(result);
      }
    };
  };

  var resolve$1 = function(promise, x, fulfil, reject) {
    var then;
    if (x === promise) {
      throw new TypeError("A promise's fulfillment handler cannot return the same promise");
    }
    if (x instanceof Promise$1) {
      x.then(fulfil, reject);
    } else if (x && (isObjectType(x) || isFunction(x))) {
      try {
        then = x.then;
      } catch (e) {
        reject(e);
        return;
      }
      if (isFunction(then)) {
        var called;

        var resolvePromise = function(y) {
          if (called) { return; }
          called = true;
          resolve$1(promise, y, fulfil, reject);
        };
        var rejectPromise = function(r) {
          if (called) { return; }
          called = true;
          reject(r);
        };

        try {
          then.call(x, resolvePromise, rejectPromise);
        } catch (e) {
          if (!called) {
            reject(e);
            called = true;
            return;
          }
        }
      } else {
        fulfil(x);
      }
    } else {
      fulfil(x);
    }
  };
}

/* istanbul ignore if */
if (
  typeof window !== 'undefined' &&
  !(window.requestAnimationFrame && window.cancelAnimationFrame)
) {
  var lastTime = 0;
  window.requestAnimationFrame = function(callback) {
    var currentTime = Date.now();
    var timeToNextCall = Math.max(0, 16 - (currentTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currentTime + timeToNextCall);
    }, timeToNextCall);
    lastTime = currentTime + timeToNextCall;
    return id;
  };
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}

var defaults = {
  // render placement:
  el: void 0,
  append: false,
  delegate: true,
  enhance: false,

  // template:
  template: null,

  // parse:
  allowExpressions: true,
  delimiters: ['{{', '}}'],
  tripleDelimiters: ['{{{', '}}}'],
  staticDelimiters: ['[[', ']]'],
  staticTripleDelimiters: ['[[[', ']]]'],
  csp: true,
  interpolate: false,
  preserveWhitespace: false,
  sanitize: false,
  stripComments: true,
  contextLines: 0,

  // data & binding:
  data: create(null),
  helpers: create(null),
  computed: create(null),
  syncComputedChildren: false,
  resolveInstanceMembers: false,
  warnAboutAmbiguity: false,
  adapt: [],
  isolated: true,
  twoway: true,
  lazy: false,

  // transitions:
  noIntro: false,
  noOutro: false,
  transitionsEnabled: true,
  complete: void 0,
  nestedTransitions: true,

  // css:
  css: null,
  noCSSTransform: false
};

// These are a subset of the easing equations found at
// https://raw.github.com/danro/easing-js - license info
// follows:

// --------------------------------------------------
// easing.js v0.5.4
// Generic set of easing functions with AMD support
// https://github.com/danro/easing-js
// This code may be freely distributed under the MIT license
// http://danro.mit-license.org/
// --------------------------------------------------
// All functions adapted from Thomas Fuchs & Jeremy Kahn
// Easing Equations (c) 2003 Robert Penner, BSD license
// https://raw.github.com/danro/easing-js/master/LICENSE
// --------------------------------------------------

// In that library, the functions named easeIn, easeOut, and
// easeInOut below are named easeInCubic, easeOutCubic, and
// (you guessed it) easeInOutCubic.
//
// You can add additional easing functions to this list, and they
// will be globally available.

var easing = {
  linear: function linear(pos) {
    return pos;
  },
  easeIn: function easeIn(pos) {
    /* istanbul ignore next */
    return Math.pow(pos, 3);
  },
  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeInOut: function easeInOut(pos) {
    /* istanbul ignore next */
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    }
    /* istanbul ignore next */
    return 0.5 * (Math.pow(pos - 2, 3) + 2);
  }
};

function noop() {}

/* global console */
/* eslint no-console:"off" */

var alreadyWarned = {};
var log;
var printWarning;
var welcome;

if (hasConsole) {
  var welcomeIntro = [
    "%cRactive.js %c1.3.8 %cin debug mode, %cmore...",
    'color: rgb(114, 157, 52); font-weight: normal;',
    'color: rgb(85, 85, 85); font-weight: normal;',
    'color: rgb(85, 85, 85); font-weight: normal;',
    'color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;'
  ];
  var welcomeMessage = "You're running Ractive 1.3.8 in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\nTo disable debug mode, add this line at the start of your app:\n  Ractive.DEBUG = false;\n\nTo disable debug mode when your app is minified, add this snippet:\n  Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});\n\nGet help and support:\n  http://ractive.js.org\n  http://stackoverflow.com/questions/tagged/ractivejs\n  http://groups.google.com/forum/#!forum/ractive-js\n  http://twitter.com/ractivejs\n\nFound a bug? Raise an issue:\n  https://github.com/ractivejs/ractive/issues\n\n";

  welcome = function () {
    if (Ractive.WELCOME_MESSAGE === false) {
      welcome = noop;
      return;
    }
    var message = 'WELCOME_MESSAGE' in Ractive ? Ractive.WELCOME_MESSAGE : welcomeMessage;
    var hasGroup = !!console.groupCollapsed;
    if (hasGroup) { console.groupCollapsed.apply(console, welcomeIntro); }
    console.log(message);
    if (hasGroup) {
      console.groupEnd(welcomeIntro);
    }

    welcome = noop;
  };

  printWarning = function (message, args) {
    welcome();

    // extract information about the instance this message pertains to, if applicable
    if (isObjectType(args[args.length - 1])) {
      var options = args.pop();
      var ractive = options ? options.ractive : null;

      if (ractive) {
        // if this is an instance of a component that we know the name of, add
        // it to the message
        var name;
        if (ractive.component && (name = ractive.component.name)) {
          message = "<" + name + "> " + message;
        }

        var node;
        if (
          (node =
            options.node || (ractive.fragment && ractive.fragment.rendered && ractive.find('*')))
        ) {
          args.push(node);
        }
      }
    }

    console.warn.apply(
      console,
      ['%cRactive.js: %c' + message, 'color: rgb(114, 157, 52);', 'color: rgb(85, 85, 85);'].concat(
        args
      )
    );
  };

  log = function() {
    console.log.apply(console, arguments);
  };
} else {
  printWarning = log = welcome = noop;
}

function format(message, args) {
  return message.replace(/%s/g, function () { return args.shift(); });
}

function fatal(message) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  message = format(message, args);
  throw new Error(message);
}

function logIfDebug() {
  if (Ractive.DEBUG) {
    log.apply(null, arguments);
  }
}

function warn(message) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  message = format(message, args);
  printWarning(message, args);
}

function warnOnce(message) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  message = format(message, args);

  if (alreadyWarned[message]) {
    return;
  }

  alreadyWarned[message] = true;
  printWarning(message, args);
}

function warnIfDebug() {
  if (Ractive.DEBUG) {
    warn.apply(null, arguments);
  }
}

function warnOnceIfDebug() {
  if (Ractive.DEBUG) {
    warnOnce.apply(null, arguments);
  }
}

// Error messages that are used (or could be) in multiple places
var badArguments = 'Bad arguments';
var noRegistryFunctionReturn =
  'A function was specified for "%s" %s, but no %s was returned';
var missingPlugin = function (name, type) { return ("Missing \"" + name + "\" " + type + " plugin. You may need to download a plugin via http://ractive.js.org/integrations/#" + type + "s"); };

function findInViewHierarchy(registryName, ractive, name) {
  var instance = findInstance(registryName, ractive, name);
  return instance ? instance[registryName][name] : null;
}

function findInstance(registryName, ractive, name) {
  while (ractive) {
    if (name in ractive[registryName]) {
      return ractive;
    }

    if (ractive.isolated) {
      return null;
    }

    ractive = ractive.parent;
  }
}

function interpolate(from, to, ractive, type) {
  if (from === to) { return null; }

  if (type) {
    var interpol = findInViewHierarchy('interpolators', ractive, type);
    if (interpol) { return interpol(from, to) || null; }

    fatal(missingPlugin(type, 'interpolator'));
  }

  return (
    interpolators.number(from, to) ||
    interpolators.array(from, to) ||
    interpolators.object(from, to) ||
    null
  );
}

var interpolators = {
  number: function number(from, to) {
    if (!isNumeric(from) || !isNumeric(to)) {
      return null;
    }

    from = +from;
    to = +to;

    var delta = to - from;

    if (!delta) {
      return function() {
        return from;
      };
    }

    return function(t) {
      return from + t * delta;
    };
  },

  array: function array(from, to) {
    var len, i;

    if (!isArray(from) || !isArray(to)) {
      return null;
    }

    var intermediate = [];
    var interpolators = [];

    i = len = Math.min(from.length, to.length);
    while (i--) {
      interpolators[i] = interpolate(from[i], to[i]);
    }

    // surplus values - don't interpolate, but don't exclude them either
    for (i = len; i < from.length; i += 1) {
      intermediate[i] = from[i];
    }

    for (i = len; i < to.length; i += 1) {
      intermediate[i] = to[i];
    }

    return function(t) {
      var i = len;

      while (i--) {
        intermediate[i] = interpolators[i](t);
      }

      return intermediate;
    };
  },

  object: function object(from, to) {
    if (!isObject(from) || !isObject(to)) {
      return null;
    }

    var properties = [];
    var intermediate = {};
    var interpolators = {};

    var loop = function ( prop ) {
      if (hasOwn(from, prop)) {
        if (hasOwn(to, prop)) {
          properties.push(prop);
          interpolators[prop] = interpolate(from[prop], to[prop]) || (function () { return to[prop]; });
        } else {
          intermediate[prop] = from[prop];
        }
      }
    };

    for (var prop in from) loop( prop );

    for (var prop$1 in to) {
      if (hasOwn(to, prop$1) && !hasOwn(from, prop$1)) {
        intermediate[prop$1] = to[prop$1];
      }
    }

    var len = properties.length;

    return function(t) {
      var i = len;

      while (i--) {
        var prop = properties[i];

        intermediate[prop] = interpolators[prop](t);
      }

      return intermediate;
    };
  }
};

var refPattern = /\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g;
var splitPattern = /([^\\](?:\\\\)*)\./;
var escapeKeyPattern = /\\|\./g;
var unescapeKeyPattern = /((?:\\)+)\1|\\(\.)/g;

function escapeKey(key) {
  if (isString(key)) {
    return key.replace(escapeKeyPattern, '\\$&');
  }

  return key;
}

function normalise(ref) {
  return ref ? ref.replace(refPattern, '.$1') : '';
}

function splitKeypath(keypath) {
  var result = [];
  var match;

  keypath = normalise(keypath);

  while ((match = splitPattern.exec(keypath))) {
    var index = match.index + match[1].length;
    result.push(keypath.substr(0, index));
    keypath = keypath.substr(index + 1);
  }

  result.push(keypath);

  return result;
}

function unescapeKey(key) {
  if (isString(key)) {
    return key.replace(unescapeKeyPattern, '$1$2');
  }

  return key;
}

function addToArray(array, value) {
  var index = array.indexOf(value);

  if (index === -1) {
    array.push(value);
  }
}

function arrayContains(array, value) {
  for (var i = 0, c = array.length; i < c; i++) {
    if (array[i] == value) {
      return true;
    }
  }

  return false;
}

function arrayContentsMatch(a, b) {
  var i;

  if (!isArray(a) || !isArray(b)) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  i = a.length;
  while (i--) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function ensureArray(x) {
  if (isString(x)) {
    return [x];
  }

  if (isUndefined(x)) {
    return [];
  }

  return x;
}

function lastItem(array) {
  return array[array.length - 1];
}

function removeFromArray(array, member) {
  if (!array) {
    return;
  }

  var index = array.indexOf(member);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

function combine() {
  var arrays = [], len = arguments.length;
  while ( len-- ) arrays[ len ] = arguments[ len ];

  var res = arrays.concat.apply([], arrays);
  var i = res.length;
  while (i--) {
    var idx = res.indexOf(res[i]);
    if (~idx && idx < i) { res.splice(i, 1); }
  }

  return res;
}

function toArray(arrayLike) {
  var array = [];
  var i = arrayLike.length;
  while (i--) {
    array[i] = arrayLike[i];
  }

  return array;
}

function findMap(array, fn) {
  var len = array.length;
  for (var i = 0; i < len; i++) {
    var result = fn(array[i]);
    if (result) { return result; }
  }
}

function buildNewIndices(one, two, comparator) {
  var oldArray = one;
  var newArray = two;
  if (comparator) {
    oldArray = oldArray.map(comparator);
    newArray = newArray.map(comparator);
  }

  var oldLength = oldArray.length;

  var usedIndices = {};
  var firstUnusedIndex = 0;

  var result = oldArray.map(function (item) {
    var index;
    var start = firstUnusedIndex;

    do {
      index = newArray.indexOf(item, start);

      if (index === -1) {
        return -1;
      }

      start = index + 1;
    } while (usedIndices[index] === true && start < oldLength);

    // keep track of the first unused index, so we don't search
    // the whole of newArray for each item in oldArray unnecessarily
    if (index === firstUnusedIndex) {
      firstUnusedIndex += 1;
    }
    // allow next instance of next "equal" to be found item
    usedIndices[index] = true;
    return index;
  });

  var len = (result.oldLen = oldArray.length);
  result.newLen = newArray.length;

  if (len === result.newLen) {
    var i = 0;
    for (i; i < len; i++) {
      if (result[i] !== i) { break; }
    }

    if (i === len) { result.same = true; }
  }

  return result;
}

var fnBind = Function.prototype.bind;

function bind(fn, context) {
  if (!/this/.test(fn.toString())) { return fn; }

  var bound = fnBind.call(fn, context);
  for (var prop in fn) { bound[prop] = fn[prop]; }

  return bound;
}

var shuffleTasks = { early: [], mark: [] };
var registerQueue = { early: [], mark: [] };
var noVirtual = { virtual: false };

var ModelBase = function ModelBase(parent) {
  this.deps = [];

  this.children = [];
  this.childByKey = {};
  this.links = [];

  this.bindings = [];

  if (parent) {
    this.parent = parent;
    this.root = parent.root;
  }
};
var ModelBase__proto__ = ModelBase.prototype;

ModelBase__proto__.addShuffleTask = function addShuffleTask (task, stage) {
    if ( stage === void 0 ) stage = 'early';

  shuffleTasks[stage].push(task);
};
ModelBase__proto__.addShuffleRegister = function addShuffleRegister (item, stage) {
    if ( stage === void 0 ) stage = 'early';

  registerQueue[stage].push({ model: this, item: item });
};

ModelBase__proto__.downstreamChanged = function downstreamChanged () {};

ModelBase__proto__.findMatches = function findMatches (keys$$1) {
  var len = keys$$1.length;

  var existingMatches = [this];
  var matches;
  var i;

  var loop = function (  ) {
    var key = keys$$1[i];

    if (key === '*') {
      matches = [];
      existingMatches.forEach(function (model) {
        matches.push.apply(matches, model.getValueChildren(model.get()));
      });
    } else {
      matches = existingMatches.map(function (model) { return model.joinKey(key); });
    }

    existingMatches = matches;
  };

    for (i = 0; i < len; i += 1) loop(  );

  return matches;
};

ModelBase__proto__.getKeypath = function getKeypath (ractive) {
  if (ractive !== this.ractive && this._link) { return this._link.target.getKeypath(ractive); }

  if (!this.keypath) {
    var parent = this.parent && this.parent.getKeypath(ractive);
    this.keypath = parent
      ? ((this.parent.getKeypath(ractive)) + "." + (escapeKey(this.key)))
      : escapeKey(this.key);
  }

  return this.keypath;
};

ModelBase__proto__.getValueChildren = function getValueChildren (value) {
    var this$1 = this;

  var children;
  if (isArray(value)) {
    children = [];
    if ('length' in this && this.length !== value.length) {
      children.push(this.joinKey('length'));
    }
    value.forEach(function (m, i) {
      children.push(this$1.joinKey(i));
    });
  } else if (isObject(value) || isFunction(value)) {
    children = keys(value).map(function (key) { return this$1.joinKey(key); });
  } else if (value != null) {
    children = [];
  }

  var computed = this.computed;
  if (computed) {
    children.push.apply(children, keys(computed).map(function (k) { return this$1.joinKey(k); }));
  }

  return children;
};

ModelBase__proto__.getVirtual = function getVirtual (shouldCapture) {
    var this$1 = this;

  var value = this.get(shouldCapture, { virtual: false });
  if (isObject(value)) {
    var result = isArray(value) ? [] : create(null);

    var keys$$1 = keys(value);
    var i = keys$$1.length;
    while (i--) {
      var child = this$1.childByKey[keys$$1[i]];
      if (!child) { result[keys$$1[i]] = value[keys$$1[i]]; }
      else if (child._link) { result[keys$$1[i]] = child._link.getVirtual(); }
      else { result[keys$$1[i]] = child.getVirtual(); }
    }

    i = this.children.length;
    while (i--) {
      var child$1 = this$1.children[i];
      if (!(child$1.key in result) && child$1._link) {
        result[child$1.key] = child$1._link.getVirtual();
      }
    }

    if (this.computed) {
      keys$$1 = keys(this.computed);
      i = keys$$1.length;
      while (i--) {
        result[keys$$1[i]] = this$1.computed[keys$$1[i]].get();
      }
    }

    return result;
  } else { return value; }
};

ModelBase__proto__.has = function has (key) {
    var this$1 = this;

  if (this._link) { return this._link.has(key); }

  var value = this.get(false, noVirtual);
  if (!value) { return false; }

  key = unescapeKey(key);
  if ((isFunction(value) || isObject(value)) && key in value) { return true; }

  var computed = this.computed;
  if (computed && key in this.computed) { return true; }

  computed = this.root.ractive && this.root.ractive.computed;
  if (computed) {
    keys(computed).forEach(function (k) {
      if (computed[k].pattern && computed[k].pattern.test(this$1.getKeypath())) { return true; }
    });
  }

  return false;
};

ModelBase__proto__.joinAll = function joinAll (keys$$1, opts) {
  var model = this;
  for (var i = 0; i < keys$$1.length; i += 1) {
    if (
      opts &&
      opts.lastLink === false &&
      i + 1 === keys$$1.length &&
      model.childByKey[keys$$1[i]] &&
      model.childByKey[keys$$1[i]]._link
    )
      { return model.childByKey[keys$$1[i]]; }
    model = model.joinKey(keys$$1[i], opts);
  }

  return model;
};

ModelBase__proto__.notifyUpstream = function notifyUpstream (startPath) {
    var this$1 = this;

  var parent = this.parent;
  var path = startPath || [this.key];
  while (parent) {
    if (parent.patterns) { parent.patterns.forEach(function (o) { return o.notify(path.slice()); }); }
    path.unshift(parent.key);
    parent.links.forEach(function (l) { return l.notifiedUpstream(path, this$1.root); });
    parent.deps.forEach(function (d) { return d.handleChange(path); });
    parent.downstreamChanged(startPath);
    parent = parent.parent;
  }
};

ModelBase__proto__.rebind = function rebind (next, previous, safe) {
    var this$1 = this;

  if (this._link) {
    this._link.rebind(next, previous, false);
  }

  // tell the deps to move to the new target
  var i = this.deps.length;
  while (i--) {
    if (this$1.deps[i].rebind) { this$1.deps[i].rebind(next, previous, safe); }
  }

  i = this.links.length;
  while (i--) {
    var link = this$1.links[i];
    // only relink the root of the link tree
    if (link.owner && link.owner._link) { link.relinking(next, safe); }
  }

  i = this.children.length;
  while (i--) {
    var child = this$1.children[i];
    child.rebind(next ? next.joinKey(child.key) : undefined, child._link || child, safe);
    if (this$1.dataModel) {
      this$1.addShuffleTask(function () { return checkDataLink(this$1, this$1.retrieve()); }, 'early');
    }
  }

  i = this.bindings.length;
  while (i--) {
    this$1.bindings[i].rebind(next, previous, safe);
  }
};

ModelBase__proto__.reference = function reference () {
  'refs' in this ? this.refs++ : (this.refs = 1);
};

ModelBase__proto__.register = function register (dep) {
  this.deps.push(dep);
};

ModelBase__proto__.registerLink = function registerLink (link) {
  addToArray(this.links, link);
};

ModelBase__proto__.registerPatternObserver = function registerPatternObserver (observer) {
  (this.patterns || (this.patterns = [])).push(observer);
  this.register(observer);
};

ModelBase__proto__.registerTwowayBinding = function registerTwowayBinding (binding) {
  this.bindings.push(binding);
};

ModelBase__proto__.unreference = function unreference () {
  if ('refs' in this) { this.refs--; }
};

ModelBase__proto__.unregister = function unregister (dep) {
  removeFromArray(this.deps, dep);
};

ModelBase__proto__.unregisterLink = function unregisterLink (link) {
  removeFromArray(this.links, link);
};

ModelBase__proto__.unregisterPatternObserver = function unregisterPatternObserver (observer) {
  removeFromArray(this.patterns, observer);
  this.unregister(observer);
};

ModelBase__proto__.unregisterTwowayBinding = function unregisterTwowayBinding (binding) {
  removeFromArray(this.bindings, binding);
};

ModelBase__proto__.updateFromBindings = function updateFromBindings$1 (cascade) {
    var this$1 = this;

  var i = this.bindings.length;
  while (i--) {
    var value = this$1.bindings[i].getValue();
    if (value !== this$1.value) { this$1.set(value); }
  }

  // check for one-way bindings if there are no two-ways
  if (!this.bindings.length) {
    var oneway = findBoundValue(this.deps);
    if (oneway && oneway.value !== this.value) { this.set(oneway.value); }
  }

  if (cascade) {
    this.children.forEach(updateFromBindings);
    this.links.forEach(updateFromBindings);
    if (this._link) { this._link.updateFromBindings(cascade); }
  }
};

// TODO: this may be better handled by overriding `get` on models with a parent that isRoot
function maybeBind(model, value, shouldBind) {
  if (shouldBind && isFunction(value) && model.parent && model.parent.isRoot) {
    if (!model.boundValue) {
      model.boundValue = bind(value._r_unbound || value, model.parent.ractive);
    }

    return model.boundValue;
  }

  return value;
}

function updateFromBindings(model) {
  model.updateFromBindings(true);
}

function findBoundValue(list) {
  var i = list.length;
  while (i--) {
    if (list[i].bound) {
      var owner = list[i].owner;
      if (owner) {
        var value = owner.name === 'checked' ? owner.node.checked : owner.node.value;
        return { value: value };
      }
    }
  }
}

function fireShuffleTasks(stage) {
  if (!stage) {
    fireShuffleTasks('early');
    fireShuffleTasks('mark');
  } else {
    var tasks = shuffleTasks[stage];
    shuffleTasks[stage] = [];
    var i = tasks.length;
    while (i--) { tasks[i](); }

    var register = registerQueue[stage];
    registerQueue[stage] = [];
    i = register.length;
    while (i--) { register[i].model.register(register[i].item); }
  }
}

function shuffle(model, newIndices, link, unsafe) {
  model.shuffling = true;

  var i = newIndices.length;
  while (i--) {
    var idx = newIndices[i];
    // nothing is actually changing, so move in the index and roll on
    if (i === idx) {
      continue;
    }

    // rebind the children on i to idx
    if (i in model.childByKey)
      { model.childByKey[i].rebind(
        !~idx ? undefined : model.joinKey(idx),
        model.childByKey[i],
        !unsafe
      ); }
  }

  var upstream = model.source().length !== model.source().value.length;

  model.links.forEach(function (l) { return l.shuffle(newIndices); });
  if (!link) { fireShuffleTasks('early'); }

  i = model.deps.length;
  while (i--) {
    if (model.deps[i].shuffle) { model.deps[i].shuffle(newIndices); }
  }

  model[link ? 'marked' : 'mark']();
  if (!link) { fireShuffleTasks('mark'); }

  if (upstream) { model.notifyUpstream(); }

  model.shuffling = false;
}

function checkDataLink(model, value) {
  if (value !== model.dataModel) {
    if (value && value.viewmodel && value.viewmodel.isRoot && model.childByKey.data) {
      model.childByKey.data.link(value.viewmodel, 'data');
      model.dataModel = value;
    } else if (model.dataModel) {
      model.childByKey.data.unlink();
      model.dataModel = true;
    }
  }
}

var stack = [];
var captureGroup;

function startCapturing() {
  stack.push((captureGroup = []));
}

function stopCapturing() {
  var dependencies = stack.pop();
  captureGroup = stack[stack.length - 1];
  return dependencies;
}

function capture(model) {
  if (captureGroup) {
    captureGroup.push(model);
  }
}

function bind$1(x) {
  x.bind();
}
function cancel(x) {
  x.cancel();
}
function destroyed(x) {
  x.destroyed();
}
function handleChange(x) {
  x.handleChange();
}
function mark(x) {
  x.mark();
}
function markForce(x) {
  x.mark(true);
}
function marked(x) {
  x.marked();
}
function markedAll(x) {
  x.markedAll();
}
function render(x) {
  x.render();
}
function shuffled(x) {
  x.shuffled();
}
function teardown(x) {
  x.teardown();
}
function unbind(x) {
  x.unbind();
}
function unrender(x) {
  x.unrender();
}

function update(x) {
  x.update();
}
function toString$1(x) {
  return x.toString();
}
function toEscapedString(x) {
  return x.toString(true);
}

// this is the dry method of checking to see if a rebind applies to
// a particular keypath because in some cases, a dep may be bound
// directly to a particular keypath e.g. foo.bars.0.baz and need
// to avoid getting kicked to foo.bars.1.baz if foo.bars is unshifted
function rebindMatch(template, next, previous, fragment) {
  var keypath = template.r || template;

  // no valid keypath, go with next
  if (!keypath || !isString(keypath)) { return next; }

  // completely contextual ref, go with next
  if (
    keypath === '.' ||
    keypath[0] === '@' ||
    (next || previous).isKey ||
    (next || previous).isKeypath
  )
    { return next; }

  var parts = keypath.split('/');
  var keys = splitKeypath(parts[parts.length - 1]);
  var last = keys[keys.length - 1];

  // check the keypath against the model keypath to see if it matches
  var model = next || previous;

  // check to see if this was an alias
  if (model && keys.length === 1 && last !== model.key && fragment) {
    keys = findAlias(last, fragment) || keys;
  }

  var i = keys.length;
  var match = true;
  var shuffling = false;

  while (model && i--) {
    if (model.shuffling) { shuffling = true; }
    // non-strict comparison to account for indices in keypaths
    if (keys[i] != model.key) { match = false; }
    model = model.parent;
  }

  // next is undefined, but keypath is shuffling and previous matches
  if (!next && match && shuffling) { return previous; }
  else if (next && !match && shuffling)
    // next is defined, but doesn't match the keypath
    { return previous; }
  else { return next; }
}

function findAlias(name, fragment) {
  while (fragment) {
    var z = fragment.aliases;
    if (z && z[name]) {
      var aliases = (fragment.owner.iterations ? fragment.owner : fragment).owner.template.z;
      for (var i = 0; i < aliases.length; i++) {
        if (aliases[i].n === name) {
          var alias = aliases[i].x;
          if (!alias.r) { return false; }
          var parts = alias.r.split('/');
          return splitKeypath(parts[parts.length - 1]);
        }
      }
      return;
    }

    fragment = fragment.componentParent || fragment.parent;
  }
}

// temporary placeholder target for detached implicit links
var Missing = {
  key: '@missing',
  animate: noop,
  applyValue: noop,
  get: noop,
  getKeypath: function getKeypath() {
    return this.key;
  },
  joinAll: function joinAll() {
    return this;
  },
  joinKey: function joinKey() {
    return this;
  },
  mark: noop,
  registerLink: noop,
  shufle: noop,
  set: noop,
  unregisterLink: noop
};
Missing.parent = Missing;

var LinkModel = (function (ModelBase) {
  function LinkModel(parent, owner, target, key) {
    ModelBase.call(this, parent);

    this.owner = owner;
    this.target = target;
    this.key = isUndefined(key) ? owner.key : key;
    if (owner && owner.isLink) { this.sourcePath = (owner.sourcePath) + "." + (this.key); }

    if (target) { target.registerLink(this); }

    if (parent) { this.isReadonly = parent.isReadonly; }

    this.isLink = true;
  }

  if ( ModelBase ) LinkModel.__proto__ = ModelBase;
  var LinkModel__proto__ = LinkModel.prototype = Object.create( ModelBase && ModelBase.prototype );
  LinkModel__proto__.constructor = LinkModel;

  LinkModel__proto__.animate = function animate (from, to, options, interpolator) {
    return this.target.animate(from, to, options, interpolator);
  };

  LinkModel__proto__.applyValue = function applyValue (value) {
    if (this.boundValue) { this.boundValue = null; }
    this.target.applyValue(value);
  };

  LinkModel__proto__.attach = function attach (fragment) {
    var model = resolveReference(fragment, this.key);
    if (model) {
      this.relinking(model, false);
    } else {
      // if there is no link available, move everything here to real models
      this.owner.unlink();
    }
  };

  LinkModel__proto__.detach = function detach () {
    this.relinking(Missing, false);
  };

  LinkModel__proto__.get = function get (shouldCapture, opts) {
    if ( opts === void 0 ) opts = {};

    if (shouldCapture) {
      capture(this);

      // may need to tell the target to unwrap
      opts.unwrap = 'unwrap' in opts ? opts.unwrap : true;
    }

    var bind = 'shouldBind' in opts ? opts.shouldBind : true;
    opts.shouldBind = this.mapping && this.target.parent && this.target.parent.isRoot;

    return maybeBind(this, this.target.get(false, opts), bind);
  };

  LinkModel__proto__.getKeypath = function getKeypath (ractive) {
    if (ractive && ractive !== this.root.ractive) { return this.target.getKeypath(ractive); }

    return ModelBase.prototype.getKeypath.call(this, ractive);
  };

  LinkModel__proto__.handleChange = function handleChange$1 () {
    this.deps.forEach(handleChange);
    this.links.forEach(handleChange);
    this.notifyUpstream();
  };

  LinkModel__proto__.isDetached = function isDetached () {
    return this.virtual && this.target === Missing;
  };

  LinkModel__proto__.joinKey = function joinKey (key) {
    // TODO: handle nested links
    if (isUndefined(key) || key === '') { return this; }

    if (!hasOwn(this.childByKey, key)) {
      var child = new LinkModel(this, this, this.target.joinKey(key), key);
      this.children.push(child);
      this.childByKey[key] = child;
    }

    return this.childByKey[key];
  };

  LinkModel__proto__.mark = function mark (force) {
    this.target.mark(force);
  };

  LinkModel__proto__.marked = function marked$1 () {
    if (this.boundValue) { this.boundValue = null; }

    this.links.forEach(marked);

    this.deps.forEach(handleChange);
  };

  LinkModel__proto__.markedAll = function markedAll$1 () {
    this.children.forEach(markedAll);
    this.marked();
  };

  LinkModel__proto__.notifiedUpstream = function notifiedUpstream (startPath, root) {
    var this$1 = this;

    this.links.forEach(function (l) { return l.notifiedUpstream(startPath, this$1.root); });
    this.deps.forEach(handleChange);
    if (startPath && this.rootLink && this.root !== root) {
      var path = startPath.slice(1);
      path.unshift(this.key);
      this.notifyUpstream(path);
    }
  };

  LinkModel__proto__.relinked = function relinked () {
    this.target.registerLink(this);
    this.children.forEach(function (c) { return c.relinked(); });
  };

  LinkModel__proto__.relinking = function relinking (target, safe) {
    var this$1 = this;

    if (this.rootLink && this.sourcePath)
      { target = rebindMatch(this.sourcePath, target, this.target); }
    if (!target || this.target === target) { return; }

    this.target && this.target.unregisterLink(this);

    this.target = target;
    this.children.forEach(function (c) {
      c.relinking(target.joinKey(c.key), safe);
    });

    if (this.rootLink)
      { this.addShuffleTask(function () {
        this$1.relinked();
        if (!safe) {
          this$1.markedAll();
          this$1.notifyUpstream();
        }
      }); }
  };

  LinkModel__proto__.set = function set (value) {
    if (this.boundValue) { this.boundValue = null; }
    this.target.set(value);
  };

  LinkModel__proto__.shuffle = function shuffle$1 (newIndices) {
    // watch for extra shuffles caused by a shuffle in a downstream link
    if (this.shuffling) { return; }

    // let the real model handle firing off shuffles
    if (!this.target.shuffling) {
      if (this.target.shuffle) {
        this.target.shuffle(newIndices);
      } else {
        // the target is a computation, which can't shuffle
        this.target.mark();
      }
    } else {
      shuffle(this, newIndices, true);
    }
  };

  LinkModel__proto__.source = function source () {
    if (this.target.source) { return this.target.source(); }
    else { return this.target; }
  };

  LinkModel__proto__.teardown = function teardown$3 () {
    if (this._link) { this._link.teardown(); }
    this.target.unregisterLink(this);
    this.children.forEach(teardown);
  };

  return LinkModel;
}(ModelBase));

ModelBase.prototype.link = function link(model, keypath, options) {
  var lnk = this._link || new LinkModel(this.parent, this, model, this.key);
  lnk.implicit = options && options.implicit;
  lnk.mapping = options && options.mapping;
  lnk.sourcePath = keypath;
  lnk.rootLink = true;
  if (this._link) { this._link.relinking(model, false); }
  this.rebind(lnk, this, false);
  fireShuffleTasks();

  this._link = lnk;
  lnk.markedAll();

  this.notifyUpstream();
  return lnk;
};

ModelBase.prototype.unlink = function unlink() {
  if (this._link) {
    var ln = this._link;
    this._link = undefined;
    ln.rebind(this, ln, false);
    fireShuffleTasks();
    ln.teardown();
    this.notifyUpstream();
  }
};

function fromExpression(body, length) {
  if ( length === void 0 ) length = 0;

  var args = new Array(length);

  while (length--) {
    args[length] = "_" + length;
  }

  // Functions created directly with new Function() look like this:
  //     function anonymous (_0 /**/) { return _0*2 }
  //
  // With this workaround, we get a little more compact:
  //     function (_0){return _0*2}
  return new Function([], ("return function (" + (args.join(',')) + "){return(" + body + ");};"))();
}

var functions = create(null);

function getFunction(str, i) {
  if (functions[str]) { return functions[str]; }
  return (functions[str] = createFunction(str, i));
}

function addFunctions(template) {
  if (!template) { return; }

  var exp = template.e;

  if (!exp) { return; }

  keys(exp).forEach(function (str) {
    if (functions[str]) { return; }
    functions[str] = exp[str];
  });
}

var TEMPLATE_VERSION = 4;

var leadingWhitespace = /^\s+/;

var ParseError = function(message) {
  this.name = 'ParseError';
  this.message = message;
  try {
    throw new Error(message);
  } catch (e) {
    this.stack = e.stack;
  }
};

ParseError.prototype = Error.prototype;

var Parser = function(str, options) {
  var item;
  var lineStart = 0;

  this.str = str;
  this.options = options || {};
  this.pos = 0;

  this.lines = this.str.split('\n');
  this.lineEnds = this.lines.map(function (line) {
    var lineEnd = lineStart + line.length + 1; // +1 for the newline

    lineStart = lineEnd;
    return lineEnd;
  }, 0);

  // Custom init logic
  if (this.init) { this.init(str, options); }

  var items = [];

  while (this.pos < this.str.length && (item = this.read())) {
    items.push(item);
  }

  this.leftover = this.remaining();
  this.result = this.postProcess ? this.postProcess(items, options) : items;
};

Parser.prototype = {
  read: function read(converters) {
    var this$1 = this;

    var i, item;

    if (!converters) { converters = this.converters; }

    var pos = this.pos;

    var len = converters.length;
    for (i = 0; i < len; i += 1) {
      this$1.pos = pos; // reset for each attempt

      if ((item = converters[i](this$1))) {
        return item;
      }
    }

    return null;
  },

  getContextMessage: function getContextMessage(pos, message) {
    var ref = this.getLinePos(pos);
    var lineNum = ref[0];
    var columnNum = ref[1];
    if (this.options.contextLines === -1) {
      return [lineNum, columnNum, (message + " at line " + lineNum + " character " + columnNum)];
    }

    var line = this.lines[lineNum - 1];

    var contextUp = '';
    var contextDown = '';
    if (this.options.contextLines) {
      var start =
        lineNum - 1 - this.options.contextLines < 0 ? 0 : lineNum - 1 - this.options.contextLines;
      contextUp = this.lines
        .slice(start, lineNum - 1 - start)
        .join('\n')
        .replace(/\t/g, '  ');
      contextDown = this.lines
        .slice(lineNum, lineNum + this.options.contextLines)
        .join('\n')
        .replace(/\t/g, '  ');
      if (contextUp) {
        contextUp += '\n';
      }
      if (contextDown) {
        contextDown = '\n' + contextDown;
      }
    }

    var numTabs = 0;
    var annotation =
      contextUp +
      line.replace(/\t/g, function (match, char) {
        if (char < columnNum) {
          numTabs += 1;
        }

        return '  ';
      }) +
      '\n' +
      new Array(columnNum + numTabs).join(' ') +
      '^----' +
      contextDown;

    return [
      lineNum,
      columnNum,
      (message + " at line " + lineNum + " character " + columnNum + ":\n" + annotation)
    ];
  },

  getLinePos: function getLinePos(char) {
    var this$1 = this;

    var lineNum = 0;
    var lineStart = 0;

    while (char >= this.lineEnds[lineNum]) {
      lineStart = this$1.lineEnds[lineNum];
      lineNum += 1;
    }

    var columnNum = char - lineStart;
    return [lineNum + 1, columnNum + 1, char]; // line/col should be one-based, not zero-based!
  },

  error: function error(message) {
    var ref = this.getContextMessage(this.pos, message);
    var lineNum = ref[0];
    var columnNum = ref[1];
    var msg = ref[2];

    var error = new ParseError(msg);

    error.line = lineNum;
    error.character = columnNum;
    error.shortMessage = message;

    throw error;
  },

  matchString: function matchString(string) {
    if (this.str.substr(this.pos, string.length) === string) {
      this.pos += string.length;
      return string;
    }
  },

  matchPattern: function matchPattern(pattern) {
    var match;

    if ((match = pattern.exec(this.remaining()))) {
      this.pos += match[0].length;
      return match[1] || match[0];
    }
  },

  sp: function sp() {
    this.matchPattern(leadingWhitespace);
  },

  remaining: function remaining() {
    return this.str.substring(this.pos);
  },

  nextChar: function nextChar() {
    return this.str.charAt(this.pos);
  },

  warn: function warn(message) {
    var msg = this.getContextMessage(this.pos, message)[2];

    warnIfDebug(msg);
  }
};

Parser.extend = function(proto) {
  var Parent = this;
  var Child = function(str, options) {
    Parser.call(this, str, options);
  };

  Child.prototype = create(Parent.prototype);

  for (var key in proto) {
    if (hasOwn(proto, key)) {
      Child.prototype[key] = proto[key];
    }
  }

  Child.extend = Parser.extend;
  return Child;
};

var TEXT = 1;
var INTERPOLATOR = 2;
var TRIPLE = 3;
var SECTION = 4;
var INVERTED = 5;
var CLOSING = 6;
var ELEMENT = 7;
var PARTIAL = 8;
var COMMENT = 9;
var DELIMCHANGE = 10;
var ANCHOR = 11;
var ATTRIBUTE = 13;
var CLOSING_TAG = 14;
var COMPONENT = 15;
var YIELDER = 16;
var INLINE_PARTIAL = 17;
var DOCTYPE = 18;
var ALIAS = 19;

var AWAIT = 55;

var NUMBER_LITERAL = 20;
var STRING_LITERAL = 21;
var ARRAY_LITERAL = 22;
var OBJECT_LITERAL = 23;
var BOOLEAN_LITERAL = 24;
var REGEXP_LITERAL = 25;

var GLOBAL = 26;
var KEY_VALUE_PAIR = 27;

var REFERENCE = 30;
var REFINEMENT = 31;
var MEMBER = 32;
var PREFIX_OPERATOR = 33;
var BRACKETED = 34;
var CONDITIONAL = 35;
var INFIX_OPERATOR = 36;

var INVOCATION = 40;

var SECTION_IF = 50;
var SECTION_UNLESS = 51;
var SECTION_EACH = 52;
var SECTION_WITH = 53;
var SECTION_IF_WITH = 54;

var ELSE = 60;
var ELSEIF = 61;
var THEN = 62;
var CATCH = 63;

var EVENT = 70;
var DECORATOR = 71;
var TRANSITION = 72;
var BINDING_FLAG = 73;
var DELEGATE_FLAG = 74;

var delimiterChangePattern = /^[^\s=]+/;
var whitespacePattern = /^\s+/;

function readDelimiterChange(parser) {
  if (!parser.matchString('=')) {
    return null;
  }

  var start = parser.pos;

  // allow whitespace before new opening delimiter
  parser.sp();

  var opening = parser.matchPattern(delimiterChangePattern);
  if (!opening) {
    parser.pos = start;
    return null;
  }

  // allow whitespace (in fact, it's necessary...)
  if (!parser.matchPattern(whitespacePattern)) {
    return null;
  }

  var closing = parser.matchPattern(delimiterChangePattern);
  if (!closing) {
    parser.pos = start;
    return null;
  }

  // allow whitespace before closing '='
  parser.sp();

  if (!parser.matchString('=')) {
    parser.pos = start;
    return null;
  }

  return [opening, closing];
}

var regexpPattern = /^(\/(?:[^\n\r\u2028\u2029/\\[]|\\.|\[(?:[^\n\r\u2028\u2029\]\\]|\\.)*])+\/(?:([gimuy])(?![a-z]*\2))*(?![a-zA-Z_$0-9]))/;

function readNumberLiteral(parser) {
  var result;

  if ((result = parser.matchPattern(regexpPattern))) {
    return {
      t: REGEXP_LITERAL,
      v: result
    };
  }

  return null;
}

var pattern = /[-/\\^$*+?.()|[\]{}]/g;

function escapeRegExp(str) {
  return str.replace(pattern, '\\$&');
}

var regExpCache = {};

function getLowestIndex(haystack, needles) {
  return haystack.search(
    regExpCache[needles.join()] ||
      (regExpCache[needles.join()] = new RegExp(needles.map(escapeRegExp).join('|')))
  );
}

// https://github.com/kangax/html-minifier/issues/63#issuecomment-37763316
//export const booleanAttributes = /^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i;
var booleanAttributes = {
  allowfullscreen: 1,
  async: 1,
  autofocus: 1,
  autoplay: 1,
  checked: 1,
  compact: 1,
  controls: 1,
  declare: 1,
  default: 1,
  defaultchecked: 1,
  defaultmuted: 1,
  defaultselected: 1,
  defer: 1,
  disabled: 1,
  enabled: 1,
  formnovalidate: 1,
  hidden: 1,
  indeterminate: 1,
  inert: 1,
  ismap: 1,
  itemscope: 1,
  loop: 1,
  multiple: 1,
  muted: 1,
  nohref: 1,
  noresize: 1,
  noshade: 1,
  novalidate: 1,
  nowrap: 1,
  open: 1,
  pauseonexit: 1,
  readonly: 1,
  required: 1,
  reversed: 1,
  scoped: 1,
  seamless: 1,
  selected: 1,
  sortable: 1,
  translate: 1,
  truespeed: 1,
  typemustmatch: 1,
  visible: 1
};
var voidElements = {
  area: 1,
  base: 1,
  br: 1,
  col: 1,
  command: 1,
  doctype: 1,
  embed: 1,
  hr: 1,
  img: 1,
  input: 1,
  keygen: 1,
  link: 1,
  meta: 1,
  param: 1,
  source: 1,
  track: 1,
  wbr: 1
};

var htmlEntities = {
  quot: 34,
  amp: 38,
  apos: 39,
  lt: 60,
  gt: 62,
  nbsp: 160,
  iexcl: 161,
  cent: 162,
  pound: 163,
  curren: 164,
  yen: 165,
  brvbar: 166,
  sect: 167,
  uml: 168,
  copy: 169,
  ordf: 170,
  laquo: 171,
  not: 172,
  shy: 173,
  reg: 174,
  macr: 175,
  deg: 176,
  plusmn: 177,
  sup2: 178,
  sup3: 179,
  acute: 180,
  micro: 181,
  para: 182,
  middot: 183,
  cedil: 184,
  sup1: 185,
  ordm: 186,
  raquo: 187,
  frac14: 188,
  frac12: 189,
  frac34: 190,
  iquest: 191,
  Agrave: 192,
  Aacute: 193,
  Acirc: 194,
  Atilde: 195,
  Auml: 196,
  Aring: 197,
  AElig: 198,
  Ccedil: 199,
  Egrave: 200,
  Eacute: 201,
  Ecirc: 202,
  Euml: 203,
  Igrave: 204,
  Iacute: 205,
  Icirc: 206,
  Iuml: 207,
  ETH: 208,
  Ntilde: 209,
  Ograve: 210,
  Oacute: 211,
  Ocirc: 212,
  Otilde: 213,
  Ouml: 214,
  times: 215,
  Oslash: 216,
  Ugrave: 217,
  Uacute: 218,
  Ucirc: 219,
  Uuml: 220,
  Yacute: 221,
  THORN: 222,
  szlig: 223,
  agrave: 224,
  aacute: 225,
  acirc: 226,
  atilde: 227,
  auml: 228,
  aring: 229,
  aelig: 230,
  ccedil: 231,
  egrave: 232,
  eacute: 233,
  ecirc: 234,
  euml: 235,
  igrave: 236,
  iacute: 237,
  icirc: 238,
  iuml: 239,
  eth: 240,
  ntilde: 241,
  ograve: 242,
  oacute: 243,
  ocirc: 244,
  otilde: 245,
  ouml: 246,
  divide: 247,
  oslash: 248,
  ugrave: 249,
  uacute: 250,
  ucirc: 251,
  uuml: 252,
  yacute: 253,
  thorn: 254,
  yuml: 255,
  OElig: 338,
  oelig: 339,
  Scaron: 352,
  scaron: 353,
  Yuml: 376,
  fnof: 402,
  circ: 710,
  tilde: 732,
  Alpha: 913,
  Beta: 914,
  Gamma: 915,
  Delta: 916,
  Epsilon: 917,
  Zeta: 918,
  Eta: 919,
  Theta: 920,
  Iota: 921,
  Kappa: 922,
  Lambda: 923,
  Mu: 924,
  Nu: 925,
  Xi: 926,
  Omicron: 927,
  Pi: 928,
  Rho: 929,
  Sigma: 931,
  Tau: 932,
  Upsilon: 933,
  Phi: 934,
  Chi: 935,
  Psi: 936,
  Omega: 937,
  alpha: 945,
  beta: 946,
  gamma: 947,
  delta: 948,
  epsilon: 949,
  zeta: 950,
  eta: 951,
  theta: 952,
  iota: 953,
  kappa: 954,
  lambda: 955,
  mu: 956,
  nu: 957,
  xi: 958,
  omicron: 959,
  pi: 960,
  rho: 961,
  sigmaf: 962,
  sigma: 963,
  tau: 964,
  upsilon: 965,
  phi: 966,
  chi: 967,
  psi: 968,
  omega: 969,
  thetasym: 977,
  upsih: 978,
  piv: 982,
  ensp: 8194,
  emsp: 8195,
  thinsp: 8201,
  zwnj: 8204,
  zwj: 8205,
  lrm: 8206,
  rlm: 8207,
  ndash: 8211,
  mdash: 8212,
  lsquo: 8216,
  rsquo: 8217,
  sbquo: 8218,
  ldquo: 8220,
  rdquo: 8221,
  bdquo: 8222,
  dagger: 8224,
  Dagger: 8225,
  bull: 8226,
  hellip: 8230,
  permil: 8240,
  prime: 8242,
  Prime: 8243,
  lsaquo: 8249,
  rsaquo: 8250,
  oline: 8254,
  frasl: 8260,
  euro: 8364,
  image: 8465,
  weierp: 8472,
  real: 8476,
  trade: 8482,
  alefsym: 8501,
  larr: 8592,
  uarr: 8593,
  rarr: 8594,
  darr: 8595,
  harr: 8596,
  crarr: 8629,
  lArr: 8656,
  uArr: 8657,
  rArr: 8658,
  dArr: 8659,
  hArr: 8660,
  forall: 8704,
  part: 8706,
  exist: 8707,
  empty: 8709,
  nabla: 8711,
  isin: 8712,
  notin: 8713,
  ni: 8715,
  prod: 8719,
  sum: 8721,
  minus: 8722,
  lowast: 8727,
  radic: 8730,
  prop: 8733,
  infin: 8734,
  ang: 8736,
  and: 8743,
  or: 8744,
  cap: 8745,
  cup: 8746,
  int: 8747,
  there4: 8756,
  sim: 8764,
  cong: 8773,
  asymp: 8776,
  ne: 8800,
  equiv: 8801,
  le: 8804,
  ge: 8805,
  sub: 8834,
  sup: 8835,
  nsub: 8836,
  sube: 8838,
  supe: 8839,
  oplus: 8853,
  otimes: 8855,
  perp: 8869,
  sdot: 8901,
  lceil: 8968,
  rceil: 8969,
  lfloor: 8970,
  rfloor: 8971,
  lang: 9001,
  rang: 9002,
  loz: 9674,
  spades: 9824,
  clubs: 9827,
  hearts: 9829,
  diams: 9830
};
var controlCharacters = [
  8364,
  129,
  8218,
  402,
  8222,
  8230,
  8224,
  8225,
  710,
  8240,
  352,
  8249,
  338,
  141,
  381,
  143,
  144,
  8216,
  8217,
  8220,
  8221,
  8226,
  8211,
  8212,
  732,
  8482,
  353,
  8250,
  339,
  157,
  382,
  376
];
var entityPattern = new RegExp(
  '&(#?(?:x[\\w\\d]+|\\d+|' + keys(htmlEntities).join('|') + '));?',
  'g'
);
var codePointSupport = isFunction(String.fromCodePoint);
var codeToChar = codePointSupport ? String.fromCodePoint : String.fromCharCode;

function decodeCharacterReferences(html) {
  return html.replace(entityPattern, function (match, entity) {
    var code;

    // Handle named entities
    if (entity[0] !== '#') {
      code = htmlEntities[entity];
    } else if (entity[1] === 'x') {
      code = parseInt(entity.substring(2), 16);
    } else {
      code = parseInt(entity.substring(1), 10);
    }

    if (!code) {
      return match;
    }

    return codeToChar(validateCode(code));
  });
}

var lessThan = /</g;
var greaterThan = />/g;
var amp = /&/g;
var invalid = 65533;

function escapeHtml(str) {
  return str
    .replace(amp, '&amp;')
    .replace(lessThan, '&lt;')
    .replace(greaterThan, '&gt;');
}

// some code points are verboten. If we were inserting HTML, the browser would replace the illegal
// code points with alternatives in some cases - since we're bypassing that mechanism, we need
// to replace them ourselves
//
// Source: http://en.wikipedia.org/wiki/Character_encodings_in_HTML#Illegal_characters
/* istanbul ignore next */
function validateCode(code) {
  if (!code) {
    return invalid;
  }

  // line feed becomes generic whitespace
  if (code === 10) {
    return 32;
  }

  // ASCII range. (Why someone would use HTML entities for ASCII characters I don't know, but...)
  if (code < 128) {
    return code;
  }

  // code points 128-159 are dealt with leniently by browsers, but they're incorrect. We need
  // to correct the mistake or we'll end up with missing € signs and so on
  if (code <= 159) {
    return controlCharacters[code - 128];
  }

  // basic multilingual plane
  if (code < 55296) {
    return code;
  }

  // UTF-16 surrogate halves
  if (code <= 57343) {
    return invalid;
  }

  // rest of the basic multilingual plane
  if (code <= 65535) {
    return code;
  } else if (!codePointSupport) {
    return invalid;
  }

  // supplementary multilingual plane 0x10000 - 0x1ffff
  if (code >= 65536 && code <= 131071) {
    return code;
  }

  // supplementary ideographic plane 0x20000 - 0x2ffff
  if (code >= 131072 && code <= 196607) {
    return code;
  }

  return invalid;
}

var expectedExpression = 'Expected a JavaScript expression';
var expectedParen = 'Expected closing paren';

// bulletproof number regex from https://gist.github.com/Rich-Harris/7544330
var numberPattern = /^(?:[+-]?)0*(?:(?:(?:[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;

function readNumberLiteral$1(parser) {
  var result;

  if ((result = parser.matchPattern(numberPattern))) {
    return {
      t: NUMBER_LITERAL,
      v: result
    };
  }

  return null;
}

function readBooleanLiteral(parser) {
  var remaining = parser.remaining();

  if (remaining.substr(0, 4) === 'true') {
    parser.pos += 4;
    return {
      t: BOOLEAN_LITERAL,
      v: 'true'
    };
  }

  if (remaining.substr(0, 5) === 'false') {
    parser.pos += 5;
    return {
      t: BOOLEAN_LITERAL,
      v: 'false'
    };
  }

  return null;
}

// Match one or more characters until: ", ', \, or EOL/EOF.
// EOL/EOF is written as (?!.) (meaning there's no non-newline char next).
var stringMiddlePattern = /^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/;

// Match one escape sequence, including the backslash.
var escapeSequencePattern = /^\\(?:[`'"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/;

// Match one ES5 line continuation (backslash + line terminator).
var lineContinuationPattern = /^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/;

// Helper for defining getDoubleQuotedString and getSingleQuotedString.
function makeQuotedStringMatcher(okQuote) {
  return function(parser) {
    var literal = '"';
    var done = false;
    var next;

    while (!done) {
      next =
        parser.matchPattern(stringMiddlePattern) ||
        parser.matchPattern(escapeSequencePattern) ||
        parser.matchString(okQuote);
      if (next) {
        if (next === "\"") {
          literal += "\\\"";
        } else if (next === "\\'") {
          literal += "'";
        } else {
          literal += next;
        }
      } else {
        next = parser.matchPattern(lineContinuationPattern);
        if (next) {
          // convert \(newline-like) into a \u escape, which is allowed in JSON
          literal += '\\u' + ('000' + next.charCodeAt(1).toString(16)).slice(-4);
        } else {
          done = true;
        }
      }
    }

    literal += '"';

    // use JSON.parse to interpret escapes
    return JSON.parse(literal);
  };
}

var singleMatcher = makeQuotedStringMatcher("\"");
var doubleMatcher = makeQuotedStringMatcher("'");

function readStringLiteral(parser) {
  var start = parser.pos;
  var quote = parser.matchString("'") || parser.matchString("\"");

  if (quote) {
    var string = (quote === "'" ? singleMatcher : doubleMatcher)(parser);

    if (!parser.matchString(quote)) {
      parser.pos = start;
      return null;
    }

    return {
      t: STRING_LITERAL,
      v: string
    };
  }

  return null;
}

// Match one or more characters until: ", ', or \
var stringMiddlePattern$1 = /^[^`"\\\$]+?(?:(?=[`"\\\$]))/;

var escapes = /[\r\n\t\b\f]/g;
function getString(literal) {
  return JSON.parse(("\"" + (literal.replace(escapes, escapeChar)) + "\""));
}

function escapeChar(c) {
  switch (c) {
    case '\n':
      return '\\n';
    case '\r':
      return '\\r';
    case '\t':
      return '\\t';
    case '\b':
      return '\\b';
    case '\f':
      return '\\f';
  }
}

function readTemplateStringLiteral(parser) {
  if (!parser.matchString('`')) { return null; }

  var literal = '';
  var done = false;
  var next;
  var parts = [];

  while (!done) {
    next =
      parser.matchPattern(stringMiddlePattern$1) ||
      parser.matchPattern(escapeSequencePattern) ||
      parser.matchString('$') ||
      parser.matchString('"');
    if (next) {
      if (next === "\"") {
        literal += "\\\"";
      } else if (next === '\\`') {
        literal += '`';
      } else if (next === '$') {
        if (parser.matchString('{')) {
          parts.push({ t: STRING_LITERAL, v: getString(literal) });
          literal = '';

          parser.sp();
          var expr = readExpression(parser);

          if (!expr) { parser.error('Expected valid expression'); }

          parts.push({ t: BRACKETED, x: expr });

          parser.sp();
          if (!parser.matchString('}'))
            { parser.error("Expected closing '}' after interpolated expression"); }
        } else {
          literal += '$';
        }
      } else {
        literal += next;
      }
    } else {
      next = parser.matchPattern(lineContinuationPattern);
      if (next) {
        // convert \(newline-like) into a \u escape, which is allowed in JSON
        literal += '\\u' + ('000' + next.charCodeAt(1).toString(16)).slice(-4);
      } else {
        done = true;
      }
    }
  }

  if (literal.length) { parts.push({ t: STRING_LITERAL, v: getString(literal) }); }

  if (!parser.matchString('`')) { parser.error("Expected closing '`'"); }

  if (parts.length === 1) {
    return parts[0];
  } else {
    var result = parts.pop();
    var part;

    while ((part = parts.pop())) {
      result = {
        t: INFIX_OPERATOR,
        s: '+',
        o: [part, result]
      };
    }

    return {
      t: BRACKETED,
      x: result
    };
  }
}

var name = /^[a-zA-Z_$][a-zA-Z_$0-9]*/;
var spreadPattern = /^\s*\.{3}/;
var legalReference = /^(?:[a-zA-Z$_0-9]|\\\.)+(?:(?:\.(?:[a-zA-Z$_0-9]|\\\.)+)|(?:\[[0-9]+\]))*/;
var relaxedName = /^[a-zA-Z_$][-\/a-zA-Z_$0-9]*(?:\.(?:[a-zA-Z_$][-\/a-zA-Z_$0-9]*))*/;

var identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;

// http://mathiasbynens.be/notes/javascript-properties
// can be any name, string literal, or number literal
function readKey(parser) {
  var token;

  if ((token = readStringLiteral(parser))) {
    return identifier.test(token.v) ? token.v : '"' + token.v.replace(/"/g, '\\"') + '"';
  }

  if ((token = readNumberLiteral$1(parser))) {
    return token.v;
  }

  if ((token = parser.matchPattern(name))) {
    return token;
  }

  return null;
}

function readKeyValuePair(parser) {
  var spread;
  var start = parser.pos;

  // allow whitespace between '{' and key
  parser.sp();

  var refKey = parser.nextChar() !== "'" && parser.nextChar() !== '"';
  if (refKey) { spread = parser.matchPattern(spreadPattern); }

  var key = spread ? readExpression(parser) : readKey(parser);
  if (key === null) {
    parser.pos = start;
    return null;
  }

  // allow whitespace between key and ':'
  parser.sp();

  // es2015 shorthand property
  if (refKey && (parser.nextChar() === ',' || parser.nextChar() === '}')) {
    if (!spread && !name.test(key)) {
      parser.error(("Expected a valid reference, but found '" + key + "' instead."));
    }

    var pair = {
      t: KEY_VALUE_PAIR,
      k: key,
      v: {
        t: REFERENCE,
        n: key
      }
    };

    if (spread) {
      pair.p = true;
    }

    return pair;
  }

  // next character must be ':'
  if (!parser.matchString(':')) {
    parser.pos = start;
    return null;
  }

  // allow whitespace between ':' and value
  parser.sp();

  // next expression must be a, well... expression
  var value = readExpression(parser);
  if (value === null) {
    parser.pos = start;
    return null;
  }

  return {
    t: KEY_VALUE_PAIR,
    k: key,
    v: value
  };
}

function readKeyValuePairs(parser) {
  var start = parser.pos;

  var pair = readKeyValuePair(parser);
  if (pair === null) {
    return null;
  }

  var pairs = [pair];

  if (parser.matchString(',')) {
    var keyValuePairs = readKeyValuePairs(parser);

    if (!keyValuePairs) {
      parser.pos = start;
      return null;
    }

    return pairs.concat(keyValuePairs);
  }

  return pairs;
}

function readObjectLiteral(parser) {
  var start = parser.pos;

  // allow whitespace
  parser.sp();

  if (!parser.matchString('{')) {
    parser.pos = start;
    return null;
  }

  var keyValuePairs = readKeyValuePairs(parser);

  // allow whitespace between final value and '}'
  parser.sp();

  if (!parser.matchString('}')) {
    parser.pos = start;
    return null;
  }

  return {
    t: OBJECT_LITERAL,
    m: keyValuePairs
  };
}

function readArrayLiteral(parser) {
  var start = parser.pos;

  // allow whitespace before '['
  parser.sp();

  if (!parser.matchString('[')) {
    parser.pos = start;
    return null;
  }

  var expressionList = readExpressionList(parser, true);

  if (!parser.matchString(']')) {
    parser.pos = start;
    return null;
  }

  return {
    t: ARRAY_LITERAL,
    m: expressionList
  };
}

function readLiteral(parser) {
  return (
    readNumberLiteral$1(parser) ||
    readBooleanLiteral(parser) ||
    readStringLiteral(parser) ||
    readTemplateStringLiteral(parser) ||
    readObjectLiteral(parser) ||
    readArrayLiteral(parser) ||
    readNumberLiteral(parser)
  );
}

// if a reference is a browser global, we don't deference it later, so it needs special treatment
var globals = /^(?:Array|console|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null|Object|Number|String|Boolean)\b/;

// keywords are not valid references, with the exception of `this`
var keywords = /^(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|var|void|while|with)$/;

var prefixPattern = /^(?:\@\.|\@|~\/|(?:\^\^\/(?:\^\^\/)*(?:\.\.\/)*)|(?:\.\.\/)+|\.\/(?:\.\.\/)*|\.)/;
var specials = /^(key|index|keypath|rootpath|this|global|shared|context|event|node|local|style|helpers|last|macro)/;

function readReference(parser) {
  var prefix, name$$1, global, reference, lastDotIndex;

  var startPos = parser.pos;

  prefix = parser.matchPattern(prefixPattern) || '';
  name$$1 =
    (!prefix && parser.relaxedNames && parser.matchPattern(relaxedName)) ||
    parser.matchPattern(legalReference);
  var actual = prefix.length + ((name$$1 && name$$1.length) || 0);

  if (prefix === '@.') {
    prefix = '@';
    if (name$$1) { name$$1 = 'this.' + name$$1; }
    else { name$$1 = 'this'; }
  }

  if (!name$$1 && prefix) {
    name$$1 = prefix;
    prefix = '';
  }

  if (!name$$1) {
    return null;
  }

  if (prefix === '@') {
    if (!specials.test(name$$1)) {
      parser.error(("Unrecognized special reference @" + name$$1));
    } else if ((!name$$1.indexOf('event') || !name$$1.indexOf('node')) && !parser.inEvent) {
      parser.error("@event and @node are only valid references within an event directive");
    } else if (~name$$1.indexOf('context')) {
      parser.pos = parser.pos - (name$$1.length - 7);
      return {
        t: BRACKETED,
        x: {
          t: REFERENCE,
          n: '@context'
        }
      };
    }
  }

  // bug out if it's a keyword (exception for ancestor/restricted refs - see https://github.com/ractivejs/ractive/issues/1497)
  if (!prefix && !parser.relaxedNames && keywords.test(name$$1)) {
    parser.pos = startPos;
    return null;
  }

  // if this is a browser global, stop here
  if (!prefix && globals.test(name$$1)) {
    global = globals.exec(name$$1)[0];
    parser.pos = startPos + global.length;

    return {
      t: GLOBAL,
      v: global
    };
  }

  reference = (prefix || '') + normalise(name$$1);

  if (parser.matchString('(')) {
    // if this is a method invocation (as opposed to a function) we need
    // to strip the method name from the reference combo, else the context
    // will be wrong
    // but only if the reference was actually a member and not a refinement
    lastDotIndex = reference.lastIndexOf('.');
    if (lastDotIndex !== -1 && name$$1[name$$1.length - 1] !== ']') {
      if (lastDotIndex === 0) {
        reference = '.';
        parser.pos = startPos;
      } else {
        var refLength = reference.length;
        reference = reference.substr(0, lastDotIndex);
        parser.pos = startPos + (actual - (refLength - lastDotIndex));
      }
    } else {
      parser.pos -= 1;
    }
  }

  return {
    t: REFERENCE,
    n: reference.replace(/^this\./, './').replace(/^this$/, '.')
  };
}

function readBracketedExpression(parser) {
  if (!parser.matchString('(')) { return null; }

  parser.sp();

  var expr = readExpression(parser);

  if (!expr) { parser.error(expectedExpression); }

  parser.sp();

  if (!parser.matchString(')')) { parser.error(expectedParen); }

  return {
    t: BRACKETED,
    x: expr
  };
}

function readPrimary(parser) {
  return readLiteral(parser) || readReference(parser) || readBracketedExpression(parser);
}

function readRefinement(parser) {
  // some things call for strict refinement (partial names), meaning no space between reference and refinement
  if (!parser.strictRefinement) {
    parser.sp();
  }

  // "." name
  if (parser.matchString('.')) {
    parser.sp();

    var name$$1 = parser.matchPattern(name);
    if (name$$1) {
      return {
        t: REFINEMENT,
        n: name$$1
      };
    }

    parser.error('Expected a property name');
  }

  // "[" expression "]"
  if (parser.matchString('[')) {
    parser.sp();

    var expr = readExpression(parser);
    if (!expr) { parser.error(expectedExpression); }

    parser.sp();

    if (!parser.matchString(']')) { parser.error("Expected ']'"); }

    return {
      t: REFINEMENT,
      x: expr
    };
  }

  return null;
}

function readMemberOrInvocation(parser) {
  var expression = readPrimary(parser);

  if (!expression) { return null; }

  while (expression) {
    var refinement = readRefinement(parser);
    if (refinement) {
      expression = {
        t: MEMBER,
        x: expression,
        r: refinement
      };
    } else if (parser.matchString('(')) {
      parser.sp();
      var expressionList = readExpressionList(parser, true);

      parser.sp();

      if (!parser.matchString(')')) {
        parser.error(expectedParen);
      }

      expression = {
        t: INVOCATION,
        x: expression
      };

      if (expressionList) { expression.o = expressionList; }
    } else {
      break;
    }
  }

  return expression;
}

var readTypeOf;

var makePrefixSequenceMatcher = function(symbol, fallthrough) {
  return function(parser) {
    var expression;

    if ((expression = fallthrough(parser))) {
      return expression;
    }

    if (!parser.matchString(symbol)) {
      return null;
    }

    parser.sp();

    expression = readExpression(parser);
    if (!expression) {
      parser.error(expectedExpression);
    }

    return {
      s: symbol,
      o: expression,
      t: PREFIX_OPERATOR
    };
  };
};

// create all prefix sequence matchers, return readTypeOf
(function() {
  var i, len, matcher, fallthrough;

  var prefixOperators = '! ~ + - typeof'.split(' ');

  fallthrough = readMemberOrInvocation;
  for (i = 0, len = prefixOperators.length; i < len; i += 1) {
    matcher = makePrefixSequenceMatcher(prefixOperators[i], fallthrough);
    fallthrough = matcher;
  }

  // typeof operator is higher precedence than multiplication, so provides the
  // fallthrough for the multiplication sequence matcher we're about to create
  // (we're skipping void and delete)
  readTypeOf = fallthrough;
})();

var readTypeof = readTypeOf;

var readLogicalOr;

var makeInfixSequenceMatcher = function(symbol, fallthrough) {
  return function(parser) {
    // > and / have to be quoted
    if (parser.inUnquotedAttribute && (symbol === '>' || symbol === '/'))
      { return fallthrough(parser); }

    var start, left, right;

    left = fallthrough(parser);
    if (!left) {
      return null;
    }

    // Loop to handle left-recursion in a case like `a * b * c` and produce
    // left association, i.e. `(a * b) * c`.  The matcher can't call itself
    // to parse `left` because that would be infinite regress.
    while (true) {
      start = parser.pos;

      parser.sp();

      if (!parser.matchString(symbol)) {
        parser.pos = start;
        return left;
      }

      // special case - in operator must not be followed by [a-zA-Z_$0-9]
      if (symbol === 'in' && /[a-zA-Z_$0-9]/.test(parser.remaining().charAt(0))) {
        parser.pos = start;
        return left;
      }

      parser.sp();

      // right operand must also consist of only higher-precedence operators
      right = fallthrough(parser);
      if (!right) {
        parser.pos = start;
        return left;
      }

      left = {
        t: INFIX_OPERATOR,
        s: symbol,
        o: [left, right]
      };

      // Loop back around.  If we don't see another occurrence of the symbol,
      // we'll return left.
    }
  };
};

// create all infix sequence matchers, and return readLogicalOr
(function() {
  var i, len, matcher, fallthrough;

  // All the infix operators on order of precedence (source: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Operator_Precedence)
  // Each sequence matcher will initially fall through to its higher precedence
  // neighbour, and only attempt to match if one of the higher precedence operators
  // (or, ultimately, a literal, reference, or bracketed expression) already matched
  var infixOperators = '* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||'.split(
    ' '
  );

  // A typeof operator is higher precedence than multiplication
  fallthrough = readTypeof;
  for (i = 0, len = infixOperators.length; i < len; i += 1) {
    matcher = makeInfixSequenceMatcher(infixOperators[i], fallthrough);
    fallthrough = matcher;
  }

  // Logical OR is the fallthrough for the conditional matcher
  readLogicalOr = fallthrough;
})();

var readLogicalOr$1 = readLogicalOr;

// The conditional operator is the lowest precedence operator, so we start here
function getConditional(parser) {
  var expression = readLogicalOr$1(parser);
  if (!expression) {
    return null;
  }

  var start = parser.pos;

  parser.sp();

  if (!parser.matchString('?')) {
    parser.pos = start;
    return expression;
  }

  parser.sp();

  var ifTrue = readExpression(parser);
  if (!ifTrue) {
    parser.error(expectedExpression);
  }

  parser.sp();

  if (!parser.matchString(':')) {
    parser.error('Expected ":"');
  }

  parser.sp();

  var ifFalse = readExpression(parser);
  if (!ifFalse) {
    parser.error(expectedExpression);
  }

  return {
    t: CONDITIONAL,
    o: [expression, ifTrue, ifFalse]
  };
}

function readExpression(parser) {
  // if eval is false, no expressions
  if (parser.allowExpressions === false) {
    var ref = readReference(parser);
    parser.sp();
    return ref;
  }

  // The conditional operator is the lowest precedence operator (except yield,
  // assignment operators, and commas, none of which are supported), so we
  // start there. If it doesn't match, it 'falls through' to progressively
  // higher precedence operators, until it eventually matches (or fails to
  // match) a 'primary' - a literal or a reference. This way, the abstract syntax
  // tree has everything in its proper place, i.e. 2 + 3 * 4 === 14, not 20.
  return getConditional(parser);
}

function readExpressionList(parser, spread) {
  var isSpread;
  var expressions = [];

  var pos = parser.pos;

  do {
    parser.sp();

    if (spread) {
      isSpread = parser.matchPattern(spreadPattern);
    }

    var expr = readExpression(parser);

    if (expr === null && expressions.length) {
      parser.error(expectedExpression);
    } else if (expr === null) {
      parser.pos = pos;
      return null;
    }

    if (isSpread) {
      expr.p = true;
    }

    expressions.push(expr);

    parser.sp();
  } while (parser.matchString(','));

  return expressions;
}

function readExpressionOrReference(parser, expectedFollowers) {
  var start = parser.pos;
  var expression = readExpression(parser);

  if (!expression) {
    // valid reference but invalid expression e.g. `{{new}}`?
    var ref = parser.matchPattern(/^(\w+)/);
    if (ref) {
      return {
        t: REFERENCE,
        n: ref
      };
    }

    return null;
  }

  for (var i = 0; i < expectedFollowers.length; i += 1) {
    if (parser.remaining().substr(0, expectedFollowers[i].length) === expectedFollowers[i]) {
      return expression;
    }
  }

  parser.pos = start;
  return readReference(parser);
}

function flattenExpression(expression) {
  var refs;
  var count = 0;

  extractRefs(expression, (refs = []));
  var stringified = stringify(expression);

  return {
    r: refs,
    s: getVars(stringified)
  };

  function getVars(expr) {
    var vars = [];
    for (var i = count - 1; i >= 0; i--) {
      vars.push(("x$" + i));
    }
    return vars.length ? ("(function(){var " + (vars.join(',')) + ";return(" + expr + ");})()") : expr;
  }

  function stringify(node) {
    if (isString(node)) {
      return node;
    }

    switch (node.t) {
      case BOOLEAN_LITERAL:
      case GLOBAL:
      case NUMBER_LITERAL:
      case REGEXP_LITERAL:
        return node.v;

      case STRING_LITERAL:
        return JSON.stringify(String(node.v));

      case ARRAY_LITERAL:
        if (node.m && hasSpread(node.m)) {
          return ("[].concat(" + (makeSpread(node.m, '[', ']', stringify)) + ")");
        } else {
          return '[' + (node.m ? node.m.map(stringify).join(',') : '') + ']';
        }

      case OBJECT_LITERAL:
        if (node.m && hasSpread(node.m)) {
          return ("Object.assign({}," + (makeSpread(node.m, '{', '}', stringifyPair)) + ")");
        } else {
          return '{' + (node.m ? node.m.map(function (n) { return ((n.k) + ":" + (stringify(n.v))); }).join(',') : '') + '}';
        }

      case PREFIX_OPERATOR:
        return (node.s === 'typeof' ? 'typeof ' : node.s) + stringify(node.o);

      case INFIX_OPERATOR:
        return (
          stringify(node.o[0]) +
          (node.s.substr(0, 2) === 'in' ? ' ' + node.s + ' ' : node.s) +
          stringify(node.o[1])
        );

      case INVOCATION:
        if (node.o && hasSpread(node.o)) {
          var id = count++;
          return ("(x$" + id + "=" + (stringify(node.x)) + ").apply(x$" + id + "," + (stringify({
            t: ARRAY_LITERAL,
            m: node.o
          })) + ")");
        } else {
          return stringify(node.x) + '(' + (node.o ? node.o.map(stringify).join(',') : '') + ')';
        }

      case BRACKETED:
        return '(' + stringify(node.x) + ')';

      case MEMBER:
        return stringify(node.x) + stringify(node.r);

      case REFINEMENT:
        return node.n ? '.' + node.n : '[' + stringify(node.x) + ']';

      case CONDITIONAL:
        return stringify(node.o[0]) + '?' + stringify(node.o[1]) + ':' + stringify(node.o[2]);

      case REFERENCE:
        return '_' + refs.indexOf(node.n);

      default:
        throw new Error('Expected legal JavaScript');
    }
  }

  function stringifyPair(node) {
    return node.p ? stringify(node.k) : ((node.k) + ":" + (stringify(node.v)));
  }

  function makeSpread(list, open, close, fn) {
    var out = list.reduce(
      function (a, c) {
        if (c.p) {
          a.str += "" + (a.open ? close + ',' : a.str.length ? ',' : '') + (fn(c));
        } else {
          a.str += "" + (!a.str.length ? open : !a.open ? ',' + open : ',') + (fn(c));
        }
        a.open = !c.p;
        return a;
      },
      { open: false, str: '' }
    );
    if (out.open) { out.str += close; }
    return out.str;
  }
}

function hasSpread(list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].p) { return true; }
  }

  return false;
}

// TODO maybe refactor this?
function extractRefs(node, refs) {
  if (node.t === REFERENCE && isString(node.n)) {
    if (!~refs.indexOf(node.n)) {
      refs.unshift(node.n);
    }
  }

  var list = node.o || node.m;
  if (list) {
    if (isObject(list)) {
      extractRefs(list, refs);
    } else {
      var i = list.length;
      while (i--) {
        extractRefs(list[i], refs);
      }
    }
  }

  if (node.k && node.t === KEY_VALUE_PAIR && !isString(node.k)) {
    extractRefs(node.k, refs);
  }

  if (node.x) {
    extractRefs(node.x, refs);
  }

  if (node.r) {
    extractRefs(node.r, refs);
  }

  if (node.v) {
    extractRefs(node.v, refs);
  }
}

function refineExpression(expression, mustache) {
  var referenceExpression;

  if (expression) {
    while (expression.t === BRACKETED && expression.x) {
      expression = expression.x;
    }

    if (expression.t === REFERENCE) {
      var n = expression.n;
      if (!~n.indexOf('@context')) {
        mustache.r = expression.n;
      } else {
        mustache.x = flattenExpression(expression);
      }
    } else {
      if ((referenceExpression = getReferenceExpression(expression))) {
        mustache.rx = referenceExpression;
      } else {
        mustache.x = flattenExpression(expression);
      }
    }

    return mustache;
  }
}

// TODO refactor this! it's bewildering
function getReferenceExpression(expression) {
  var members = [];
  var refinement;

  while (expression.t === MEMBER && expression.r.t === REFINEMENT) {
    refinement = expression.r;

    if (refinement.x) {
      if (refinement.x.t === REFERENCE) {
        members.unshift(refinement.x);
      } else {
        members.unshift(flattenExpression(refinement.x));
      }
    } else {
      members.unshift(refinement.n);
    }

    expression = expression.x;
  }

  if (expression.t !== REFERENCE) {
    return null;
  }

  return {
    r: expression.n,
    m: members
  };
}

var attributeNamePattern = /^[^\s"'>\/=(]+/;
var onPattern = /^on/;
var eventPattern = /^on-([a-zA-Z\*\.$_]((?:[a-zA-Z\*\.$_0-9\-]|\\-)+))$/;
var reservedEventNames = /^(?:change|reset|teardown|update|construct|config|init|render|complete|unrender|detach|insert|destruct|attachchild|detachchild)$/;
var decoratorPattern = /^as-([a-z-A-Z][-a-zA-Z_0-9]*)$/;
var transitionPattern = /^([a-zA-Z](?:(?!-in-out)[-a-zA-Z_0-9])*)-(in|out|in-out)$/;
var boundPattern = /^((bind|class)-(([-a-zA-Z0-9_])+))$/;
var directives = {
  lazy: { t: BINDING_FLAG, v: 'l' },
  twoway: { t: BINDING_FLAG, v: 't' },
  'no-delegation': { t: DELEGATE_FLAG }
};
var unquotedAttributeValueTextPattern = /^[^\s"'=<>\/`]+/;
var proxyEvent = /^[^\s"'=<>@\[\]()]*/;
var whitespace = /^\s+/;

var slashes = /\\/g;
function splitEvent(str) {
  var result = [];
  var s = 0;

  for (var i = 0; i < str.length; i++) {
    if (str[i] === '-' && str[i - 1] !== '\\') {
      result.push(str.substring(s, i).replace(slashes, ''));
      s = i + 1;
    }
  }

  result.push(str.substring(s).replace(slashes, ''));

  return result;
}

function readAttribute(parser) {
  var name, i, nearest, idx;

  parser.sp();

  name = parser.matchPattern(attributeNamePattern);
  if (!name) {
    return null;
  }

  // check for accidental delimiter consumption e.g. <tag bool{{>attrs}} />
  nearest = name.length;
  for (i = 0; i < parser.tags.length; i++) {
    if (~(idx = name.indexOf(parser.tags[i].open))) {
      if (idx < nearest) { nearest = idx; }
    }
  }
  if (nearest < name.length) {
    parser.pos -= name.length - nearest;
    name = name.substr(0, nearest);
    if (!name) { return null; }
  }

  return { n: name };
}

function readAttributeValue(parser) {
  var start = parser.pos;

  // next character must be `=`, `/`, `>` or whitespace
  if (!/[=\/>\s]/.test(parser.nextChar())) {
    parser.error('Expected `=`, `/`, `>` or whitespace');
  }

  parser.sp();

  if (!parser.matchString('=')) {
    parser.pos = start;
    return null;
  }

  parser.sp();

  var valueStart = parser.pos;
  var startDepth = parser.sectionDepth;

  var value =
    readQuotedAttributeValue(parser, "'") ||
    readQuotedAttributeValue(parser, "\"") ||
    readUnquotedAttributeValue(parser);

  if (value === null) {
    parser.error('Expected valid attribute value');
  }

  if (parser.sectionDepth !== startDepth) {
    parser.pos = valueStart;
    parser.error(
      'An attribute value must contain as many opening section tags as closing section tags'
    );
  }

  if (!value.length) {
    return '';
  }

  if (value.length === 1 && isString(value[0])) {
    return decodeCharacterReferences(value[0]);
  }

  return value;
}

function readUnquotedAttributeValueToken(parser) {
  var text, index;

  var start = parser.pos;

  text = parser.matchPattern(unquotedAttributeValueTextPattern);

  if (!text) {
    return null;
  }

  var haystack = text;
  var needles = parser.tags.map(function (t) { return t.open; }); // TODO refactor... we do this in readText.js as well

  if ((index = getLowestIndex(haystack, needles)) !== -1) {
    text = text.substr(0, index);
    parser.pos = start + text.length;
  }

  return text;
}

function readUnquotedAttributeValue(parser) {
  parser.inAttribute = true;

  var tokens = [];

  var token = readMustache(parser) || readUnquotedAttributeValueToken(parser);
  while (token) {
    tokens.push(token);
    token = readMustache(parser) || readUnquotedAttributeValueToken(parser);
  }

  if (!tokens.length) {
    return null;
  }

  parser.inAttribute = false;
  return tokens;
}

function readQuotedAttributeValue(parser, quoteMark) {
  var start = parser.pos;

  if (!parser.matchString(quoteMark)) {
    return null;
  }

  parser.inAttribute = quoteMark;

  var tokens = [];

  var token = readMustache(parser) || readQuotedStringToken(parser, quoteMark);
  while (token !== null) {
    tokens.push(token);
    token = readMustache(parser) || readQuotedStringToken(parser, quoteMark);
  }

  if (!parser.matchString(quoteMark)) {
    parser.pos = start;
    return null;
  }

  parser.inAttribute = false;

  return tokens;
}

function readQuotedStringToken(parser, quoteMark) {
  var haystack = parser.remaining();

  var needles = parser.tags.map(function (t) { return t.open; }); // TODO refactor... we do this in readText.js as well
  needles.push(quoteMark);

  var index = getLowestIndex(haystack, needles);

  if (index === -1) {
    parser.error('Quoted attribute value must have a closing quote');
  }

  if (!index) {
    return null;
  }

  parser.pos += index;
  return haystack.substr(0, index);
}

function readAttributeOrDirective(parser) {
  var match, directive;

  var attribute = readAttribute(parser, false);

  if (!attribute) { return null; }

  // lazy, twoway
  if ((directive = directives[attribute.n])) {
    attribute.t = directive.t;
    if (directive.v) { attribute.v = directive.v; }
    delete attribute.n; // no name necessary
    parser.sp();
    if (parser.nextChar() === '=') { attribute.f = readAttributeValue(parser); }
  } else if ((match = decoratorPattern.exec(attribute.n))) {
    // decorators
    attribute.n = match[1];
    attribute.t = DECORATOR;
    readArguments(parser, attribute);
  } else if ((match = transitionPattern.exec(attribute.n))) {
    // transitions
    attribute.n = match[1];
    attribute.t = TRANSITION;
    readArguments(parser, attribute);
    attribute.v = match[2] === 'in-out' ? 't0' : match[2] === 'in' ? 't1' : 't2';
  } else if ((match = eventPattern.exec(attribute.n))) {
    // on-click etc
    attribute.n = splitEvent(match[1]);
    attribute.t = EVENT;

    if (parser.matchString('(')) {
      attribute.a = flattenExpression({
        t: ARRAY_LITERAL,
        m: readExpressionList(parser)
      });
      if (!parser.matchString(')')) { parser.error("Expected closing ')'"); }
    }

    parser.inEvent = true;

    // check for a proxy event
    if (!readProxyEvent(parser, attribute)) {
      // otherwise, it's an expression
      readArguments(parser, attribute, true);
    } else if (reservedEventNames.test(attribute.f)) {
      parser.pos -= attribute.f.length;
      parser.error(
        'Cannot use reserved event names (change, reset, teardown, update, construct, config, init, render, unrender, complete, detach, insert, destruct, attachchild, detachchild)'
      );
    }

    parser.inEvent = false;
  } else if ((match = boundPattern.exec(attribute.n))) {
    // bound directives
    var bind = match[2] === 'bind';
    attribute.n = bind ? match[3] : match[1];
    attribute.t = ATTRIBUTE;
    readArguments(parser, attribute, false, true);

    if (!attribute.f && bind) {
      attribute.f = [{ t: INTERPOLATOR, r: match[3] }];
    }
  } else {
    parser.sp();
    var value = parser.nextChar() === '=' ? readAttributeValue(parser) : null;
    attribute.f = value != null ? value : attribute.f;

    if (parser.sanitizeEventAttributes && onPattern.test(attribute.n)) {
      return { exclude: true };
    } else {
      attribute.f = attribute.f || (attribute.f === '' ? '' : 0);
      attribute.t = ATTRIBUTE;
    }
  }

  return attribute;
}

function readProxyEvent(parser, attribute) {
  var start = parser.pos;
  if (!parser.matchString('=')) { parser.error("Missing required directive arguments"); }

  var quote = parser.matchString("'") || parser.matchString("\"");
  parser.sp();
  var proxy = parser.matchPattern(proxyEvent);

  if (proxy !== undefined) {
    if (quote) {
      parser.sp();
      if (!parser.matchString(quote)) { parser.pos = start; }
      else { return (attribute.f = proxy) || true; }
    } else if (!parser.matchPattern(whitespace)) {
      parser.pos = start;
    } else {
      return (attribute.f = proxy) || true;
    }
  } else {
    parser.pos = start;
  }
}

function readArguments(parser, attribute, required, single) {
  if ( required === void 0 ) required = false;
  if ( single === void 0 ) single = false;

  parser.sp();
  if (!parser.matchString('=')) {
    if (required) { parser.error("Missing required directive arguments"); }
    return;
  }
  parser.sp();

  var quote = parser.matchString('"') || parser.matchString("'");
  var spread = parser.spreadArgs;
  parser.spreadArgs = true;
  parser.inUnquotedAttribute = !quote;
  var expr = single
    ? readExpressionOrReference(parser, [quote || ' ', '/', '>'])
    : { m: readExpressionList(parser), t: ARRAY_LITERAL };
  parser.inUnquotedAttribute = false;
  parser.spreadArgs = spread;

  if (quote) {
    parser.sp();
    if (parser.matchString(quote) !== quote) { parser.error(("Expected matching quote '" + quote + "'")); }
  }

  if (single) {
    var interpolator = { t: INTERPOLATOR };
    refineExpression(expr, interpolator);
    attribute.f = [interpolator];
  } else {
    attribute.f = flattenExpression(expr);
  }
}

var delimiterChangeToken = { t: DELIMCHANGE, exclude: true };

function readMustache(parser) {
  var mustache, i;

  // If we're inside a <script> or <style> tag, and we're not
  // interpolating, bug out
  if (parser.interpolate[parser.inside] === false) {
    return null;
  }

  for (i = 0; i < parser.tags.length; i += 1) {
    if ((mustache = readMustacheOfType(parser, parser.tags[i]))) {
      return mustache;
    }
  }

  if (parser.inTag && !parser.inAttribute) {
    mustache = readAttributeOrDirective(parser);
    if (mustache) {
      parser.sp();
      return mustache;
    }
  }
}

function readMustacheOfType(parser, tag) {
  var mustache, reader, i;

  var start = parser.pos;

  if (parser.matchString('\\' + tag.open)) {
    if (start === 0 || parser.str[start - 1] !== '\\') {
      return tag.open;
    }
  } else if (!parser.matchString(tag.open)) {
    return null;
  }

  // delimiter change?
  if ((mustache = readDelimiterChange(parser))) {
    // find closing delimiter or abort...
    if (!parser.matchString(tag.close)) {
      return null;
    }

    // ...then make the switch
    tag.open = mustache[0];
    tag.close = mustache[1];
    parser.sortMustacheTags();

    return delimiterChangeToken;
  }

  parser.sp();

  // illegal section closer
  if (parser.matchString('/')) {
    parser.pos -= 1;
    var rewind = parser.pos;
    if (!readNumberLiteral(parser)) {
      parser.pos = rewind - tag.close.length;
      if (parser.inAttribute) {
        parser.pos = start;
        return null;
      } else {
        parser.error("Attempted to close a section that wasn't open");
      }
    } else {
      parser.pos = rewind;
    }
  }

  for (i = 0; i < tag.readers.length; i += 1) {
    reader = tag.readers[i];

    if ((mustache = reader(parser, tag))) {
      if (tag.isStatic) {
        mustache.s = 1;
      }

      if (parser.includeLinePositions) {
        mustache.q = parser.getLinePos(start);
      }

      return mustache;
    }
  }

  parser.pos = start;
  return null;
}

function readTriple(parser, tag) {
  var expression = readExpression(parser);

  if (!expression) {
    return null;
  }

  if (!parser.matchString(tag.close)) {
    parser.error(("Expected closing delimiter '" + (tag.close) + "'"));
  }

  var triple = { t: TRIPLE };
  refineExpression(expression, triple); // TODO handle this differently - it's mysterious

  return triple;
}

function readUnescaped(parser, tag) {
  if (!parser.matchString('&')) {
    return null;
  }

  parser.sp();

  var expression = readExpression(parser);

  if (!expression) {
    return null;
  }

  if (!parser.matchString(tag.close)) {
    parser.error(("Expected closing delimiter '" + (tag.close) + "'"));
  }

  var triple = { t: TRIPLE };
  refineExpression(expression, triple); // TODO handle this differently - it's mysterious

  return triple;
}

var legalAlias = /^(?:[a-zA-Z$_0-9]|\\\.)+(?:(?:(?:[a-zA-Z$_0-9]|\\\.)+)|(?:\[[0-9]+\]))*/;
var asRE = /^as/i;

function readAliases(parser) {
  var aliases = [];
  var alias;
  var start = parser.pos;

  parser.sp();

  alias = readAlias(parser);

  if (alias) {
    alias.x = refineExpression(alias.x, {});
    aliases.push(alias);

    parser.sp();

    while (parser.matchString(',')) {
      alias = readAlias(parser);

      if (!alias) {
        parser.error('Expected another alias.');
      }

      alias.x = refineExpression(alias.x, {});
      aliases.push(alias);

      parser.sp();
    }

    return aliases;
  }

  parser.pos = start;
  return null;
}

function readAlias(parser) {
  var start = parser.pos;

  parser.sp();

  var expr = readExpression(parser, []);

  if (!expr) {
    parser.pos = start;
    return null;
  }

  parser.sp();
  parser.matchPattern(asRE);
  parser.sp();

  var alias = parser.matchPattern(legalAlias);

  if (!alias) {
    parser.pos = start;
    return null;
  }

  return { n: alias, x: expr };
}

function readPartial(parser, tag) {
  var type = parser.matchString('>') || parser.matchString('yield');
  var partial = { t: type === '>' ? PARTIAL : YIELDER };
  var aliases;

  if (!type) { return null; }

  parser.sp();

  if (type === '>' || !(aliases = parser.matchString('with'))) {
    // Partial names can include hyphens, so we can't use readExpression
    // blindly. Instead, we use the `relaxedNames` flag to indicate that
    // `foo-bar` should be read as a single name, rather than 'subtract
    // bar from foo'
    parser.relaxedNames = parser.strictRefinement = true;
    var expression = readExpression(parser);
    parser.relaxedNames = parser.strictRefinement = false;

    if (!expression && type === '>') { return null; }

    if (expression) {
      refineExpression(expression, partial); // TODO...
      parser.sp();
      if (type !== '>') { aliases = parser.matchString('with'); }
    }
  }

  parser.sp();

  // check for alias context e.g. `{{>foo bar as bat, bip as bop}}`
  if (aliases || type === '>') {
    aliases = readAliases(parser);
    if (aliases && aliases.length) {
      partial.z = aliases;
    } else {
      // otherwise check for literal context e.g. `{{>foo bar}}` then
      // turn it into `{{#with bar}}{{>foo}}{{/with}}`
      var context = readExpression(parser);
      if (context) {
        partial.c = {};
        refineExpression(context, partial.c);
      }

      // allow aliases after context
      if (parser.matchString(',')) {
        aliases = readAliases(parser);
        if (aliases && aliases.length) {
          partial.z = aliases;
        }
      }
    }

    if (type !== '>' && (!partial.c && !partial.z)) {
      // {{yield with}} requires some aliases
      parser.error("Expected a context or one or more aliases");
    }
  }

  parser.sp();

  if (!parser.matchString(tag.close)) {
    parser.error(("Expected closing delimiter '" + (tag.close) + "'"));
  }

  return partial;
}

function readComment(parser, tag) {
  if (!parser.matchString('!')) {
    return null;
  }

  var index = parser.remaining().indexOf(tag.close);

  if (index !== -1) {
    parser.pos += index + tag.close.length;
    return { t: COMMENT };
  }
}

function readInterpolator(parser, tag) {
  var expression, err;

  var start = parser.pos;

  // TODO would be good for perf if we could do away with the try-catch
  try {
    expression = readExpressionOrReference(parser, [tag.close]);
  } catch (e) {
    err = e;
  }

  if (!expression) {
    if (parser.str.charAt(start) === '!') {
      // special case - comment
      parser.pos = start;
      return null;
    }

    if (err) {
      throw err;
    }
  }

  if (!parser.matchString(tag.close)) {
    parser.error(("Expected closing delimiter '" + (tag.close) + "' after reference"));

    if (!expression) {
      // special case - comment
      if (parser.nextChar() === '!') {
        return null;
      }

      parser.error("Expected expression or legal reference");
    }
  }

  var interpolator = { t: INTERPOLATOR };
  refineExpression(expression, interpolator); // TODO handle this differently - it's mysterious

  return interpolator;
}

function readClosing(parser, tag) {
  var start = parser.pos;

  if (!parser.matchString(tag.open)) {
    return null;
  }

  parser.sp();

  if (!parser.matchString('/')) {
    parser.pos = start;
    return null;
  }

  parser.sp();

  var remaining = parser.remaining();
  var index = remaining.indexOf(tag.close);

  if (index !== -1) {
    var closing = {
      t: CLOSING,
      r: remaining.substr(0, index).split(' ')[0]
    };

    parser.pos += index;

    if (!parser.matchString(tag.close)) {
      parser.error(("Expected closing delimiter '" + (tag.close) + "'"));
    }

    return closing;
  }

  parser.pos = start;
  return null;
}

var patterns = {
  else: /^\s*else\s*/,
  elseif: /^\s*elseif\s+/,
  then: /^\s*then\s*/,
  catch: /^\s*catch\s*/
};

var types = {
  else: ELSE,
  elseif: ELSEIF,
  then: THEN,
  catch: CATCH
};

function readInlineBlock(parser, tag, type) {
  var start = parser.pos;

  if (!parser.matchString(tag.open)) {
    return null;
  }

  if (!parser.matchPattern(patterns[type])) {
    parser.pos = start;
    return null;
  }

  var res = { t: types[type] };

  if (type === 'elseif') {
    res.x = readExpression(parser);
  } else if (type === 'catch' || type === 'then') {
    var nm = parser.matchPattern(name);
    if (nm) { res.n = nm; }
  }

  if (!parser.matchString(tag.close)) {
    parser.error(("Expected closing delimiter '" + (tag.close) + "'"));
  }

  return res;
}

var handlebarsBlockCodes = {
  each: SECTION_EACH,
  if: SECTION_IF,
  with: SECTION_IF_WITH,
  unless: SECTION_UNLESS
};

var indexRefPattern = /^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/;
var keyIndexRefPattern = /^\s*,\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/;
var handlebarsBlockPattern = new RegExp('^(' + keys(handlebarsBlockCodes).join('|') + ')\\b');

function readSection(parser, tag) {
  var expression,
    section,
    child,
    children,
    hasElse,
    block,
    unlessBlock,
    closed,
    i,
    expectedClose,
    hasThen,
    hasCatch,
    inlineThen;
  var aliasOnly = false;

  var start = parser.pos;

  if (parser.matchString('^')) {
    // watch out for parent context refs - {{^^/^^/foo}}
    if (parser.matchString('^/')) {
      parser.pos = start;
      return null;
    }
    section = { t: SECTION, f: [], n: SECTION_UNLESS };
  } else if (parser.matchString('#')) {
    section = { t: SECTION, f: [] };

    if (parser.matchString('partial')) {
      parser.pos = start - parser.standardDelimiters[0].length;
      parser.error(
        'Partial definitions can only be at the top level of the template, or immediately inside components'
      );
    }

    if ((block = parser.matchString('await'))) {
      expectedClose = block;
      section.t = AWAIT;
    } else if ((block = parser.matchPattern(handlebarsBlockPattern))) {
      expectedClose = block;
      section.n = handlebarsBlockCodes[block];
    }
  } else {
    return null;
  }

  parser.sp();

  if (block === 'with') {
    var aliases = readAliases(parser);
    if (aliases) {
      aliasOnly = true;
      section.z = aliases;
      section.t = ALIAS;
    }
  } else if (block === 'each') {
    var alias = readAlias(parser);
    if (alias) {
      section.z = [{ n: alias.n, x: { r: '.' } }];
      expression = alias.x;
    }
  }

  if (!aliasOnly) {
    if (!expression) { expression = readExpression(parser); }

    if (!expression) {
      parser.error('Expected expression');
    }

    // extra each aliases
    if (block === 'each' && parser.matchString(',')) {
      var aliases$1 = readAliases(parser);
      if (aliases$1) {
        if (section.z) { aliases$1.unshift(section.z[0]); }
        section.z = aliases$1;
      }
    }

    // optional index and key references
    if ((block === 'each' || !block) && (i = parser.matchPattern(indexRefPattern))) {
      var extra;

      if ((extra = parser.matchPattern(keyIndexRefPattern))) {
        section.i = i + ',' + extra;
      } else {
        section.i = i;
      }
    } else if (block === 'await' && parser.matchString('then')) {
      parser.sp();
      hasThen = true;
      inlineThen = parser.matchPattern(name);
      if (!inlineThen) { inlineThen = true; }
    }

    if (!block && expression.n) {
      expectedClose = expression.n;
    }
  }

  parser.sp();

  if (!parser.matchString(tag.close)) {
    parser.error(("Expected closing delimiter '" + (tag.close) + "'"));
  }

  parser.sectionDepth += 1;
  children = section.f;

  var pos;
  do {
    pos = parser.pos;
    if ((child = readClosing(parser, tag))) {
      if (expectedClose && child.r !== expectedClose) {
        if (!block) {
          if (child.r)
            { parser.warn(
              ("Expected " + (tag.open) + "/" + expectedClose + (tag.close) + " but found " + (tag.open) + "/" + (child.r) + (tag.close))
            ); }
        } else {
          parser.pos = pos;
          parser.error(("Expected " + (tag.open) + "/" + expectedClose + (tag.close)));
        }
      }

      parser.sectionDepth -= 1;
      closed = true;
    } else if (
      !aliasOnly &&
      ((child = readInlineBlock(parser, tag, 'elseif')) ||
        (child = readInlineBlock(parser, tag, 'else')) ||
        (block === 'await' &&
          ((child = readInlineBlock(parser, tag, 'then')) ||
            (child = readInlineBlock(parser, tag, 'catch')))))
    ) {
      if (section.n === SECTION_UNLESS) {
        parser.error('{{else}} not allowed in {{#unless}}');
      }

      if (hasElse) {
        if (child.t === ELSE) {
          parser.error('there can only be one {{else}} block, at the end of a section');
        } else if (child.t === ELSEIF) {
          parser.error('illegal {{elseif...}} after {{else}}');
        }
      }

      if (!unlessBlock && (inlineThen || !hasThen) && !hasCatch) {
        if (block === 'await') {
          var s = { f: children };
          section.f = [s];
          if (inlineThen) {
            s.t = THEN;
            inlineThen !== true && (s.n = inlineThen);
          } else {
            s.t = SECTION;
          }
        } else {
          unlessBlock = [];
        }
      }

      var mustache = {
        t: SECTION,
        f: (children = [])
      };

      if (child.t === ELSE) {
        if (block === 'await') {
          section.f.push(mustache);
          mustache.t = ELSE;
        } else {
          mustache.n = SECTION_UNLESS;
          unlessBlock.push(mustache);
        }
        hasElse = true;
      } else if (child.t === ELSEIF) {
        mustache.n = SECTION_IF;
        refineExpression(child.x, mustache);
        unlessBlock.push(mustache);
      } else if (child.t === THEN) {
        if (hasElse) { parser.error('{{then}} block must appear before any {{else}} block'); }
        if (hasCatch) { parser.error('{{then}} block must appear before any {{catch}} block'); }
        if (hasThen) { parser.error('there can only be one {{then}} block per {{#await}}'); }
        mustache.t = THEN;
        hasThen = true;
        child.n && (mustache.n = child.n);
        section.f.push(mustache);
      } else if (child.t === CATCH) {
        if (hasElse) { parser.error('{{catch}} block must appear before any {{else}} block'); }
        if (hasCatch) { parser.error('there can only be one {{catch}} block per {{#await}}'); }
        mustache.t = CATCH;
        hasCatch = true;
        mustache.n = child.n;
        section.f.push(mustache);
      }
    } else {
      child = parser.read(READERS);

      if (!child) {
        break;
      }

      children.push(child);
    }
  } while (!closed);

  if (unlessBlock) {
    section.l = unlessBlock;
  }

  if (!aliasOnly) {
    refineExpression(expression, section);
  }

  if (block === 'await' && (inlineThen || !hasThen) && !hasCatch && !hasElse) {
    var s$1 = { f: section.f };
    section.f = [s$1];
    if (inlineThen) {
      s$1.t = THEN;
      inlineThen !== true && (s$1.n = inlineThen);
    } else {
      s$1.t = SECTION;
    }
  }

  // TODO if a section is empty it should be discarded. Don't do
  // that here though - we need to clean everything up first, as
  // it may contain removeable whitespace. As a temporary measure,
  // to pass the existing tests, remove empty `f` arrays
  if (!section.f.length) {
    delete section.f;
  }

  return section;
}

var OPEN_COMMENT = '<!--';
var CLOSE_COMMENT = '-->';

function readHtmlComment(parser) {
  var start = parser.pos;

  if (parser.textOnlyMode || !parser.matchString(OPEN_COMMENT)) {
    return null;
  }

  var remaining = parser.remaining();
  var endIndex = remaining.indexOf(CLOSE_COMMENT);

  if (endIndex === -1) {
    parser.error("Illegal HTML - expected closing comment sequence ('-->')");
  }

  var content = remaining.substr(0, endIndex);
  parser.pos += endIndex + 3;

  var comment = {
    t: COMMENT,
    c: content
  };

  if (parser.includeLinePositions) {
    comment.q = parser.getLinePos(start);
  }

  return comment;
}

var leadingLinebreak = /^[ \t\f\r\n]*\r?\n/;
var trailingLinebreak = /\r?\n[ \t\f\r\n]*$/;

function stripStandalones(items) {
  var i, current, backOne, backTwo, lastSectionItem;

  for (i = 1; i < items.length; i += 1) {
    current = items[i];
    backOne = items[i - 1];
    backTwo = items[i - 2];

    // if we're at the end of a [text][comment][text] sequence...
    if (isString(current) && isComment(backOne) && isString(backTwo)) {
      // ... and the comment is a standalone (i.e. line breaks either side)...
      if (trailingLinebreak.test(backTwo) && leadingLinebreak.test(current)) {
        // ... then we want to remove the whitespace after the first line break
        items[i - 2] = backTwo.replace(trailingLinebreak, '\n');

        // and the leading line break of the second text token
        items[i] = current.replace(leadingLinebreak, '');
      }
    }

    // if the current item is a section, and it is preceded by a linebreak, and
    // its first item is a linebreak...
    if (isSection(current) && isString(backOne)) {
      if (
        trailingLinebreak.test(backOne) &&
        isString(current.f[0]) &&
        leadingLinebreak.test(current.f[0])
      ) {
        items[i - 1] = backOne.replace(trailingLinebreak, '\n');
        current.f[0] = current.f[0].replace(leadingLinebreak, '');
      }
    }

    // if the last item was a section, and it is followed by a linebreak, and
    // its last item is a linebreak...
    if (isString(current) && isSection(backOne)) {
      lastSectionItem = lastItem(backOne.f);

      if (
        isString(lastSectionItem) &&
        trailingLinebreak.test(lastSectionItem) &&
        leadingLinebreak.test(current)
      ) {
        backOne.f[backOne.f.length - 1] = lastSectionItem.replace(trailingLinebreak, '\n');
        items[i] = current.replace(leadingLinebreak, '');
      }
    }
  }

  return items;
}

function isComment(item) {
  return item.t === COMMENT || item.t === DELIMCHANGE;
}

function isSection(item) {
  return (item.t === SECTION || item.t === INVERTED) && item.f;
}

function trimWhitespace(items, leadingPattern, trailingPattern) {
  var item;

  if (leadingPattern) {
    item = items[0];
    if (isString(item)) {
      item = item.replace(leadingPattern, '');

      if (!item) {
        items.shift();
      } else {
        items[0] = item;
      }
    }
  }

  if (trailingPattern) {
    item = lastItem(items);
    if (isString(item)) {
      item = item.replace(trailingPattern, '');

      if (!item) {
        items.pop();
      } else {
        items[items.length - 1] = item;
      }
    }
  }
}

var contiguousWhitespace = /[ \t\f\r\n]+/g;
var leadingWhitespace$1 = /^[ \t\f\r\n]+/;
var trailingWhitespace = /[ \t\f\r\n]+$/;
var leadingNewLine = /^(?:\r\n|\r|\n)/;
var trailingNewLine = /(?:\r\n|\r|\n)$/;

function cleanup(
  items,
  stripComments,
  preserveWhitespace,
  removeLeadingWhitespace,
  removeTrailingWhitespace,
  whiteSpaceElements
) {
  if (isString(items)) { return; }

  var i,
    item,
    previousItem,
    nextItem,
    preserveWhitespaceInsideFragment,
    removeLeadingWhitespaceInsideFragment,
    removeTrailingWhitespaceInsideFragment;

  // First pass - remove standalones and comments etc
  stripStandalones(items);

  i = items.length;
  while (i--) {
    item = items[i];

    // Remove delimiter changes, unsafe elements etc
    if (item.exclude) {
      items.splice(i, 1);
    } else if (stripComments && item.t === COMMENT) {
      // Remove comments, unless we want to keep them
      items.splice(i, 1);
    }
  }

  // If necessary, remove leading and trailing whitespace
  trimWhitespace(
    items,
    removeLeadingWhitespace ? leadingWhitespace$1 : null,
    removeTrailingWhitespace ? trailingWhitespace : null
  );

  i = items.length;
  while (i--) {
    item = items[i];
    removeLeadingWhitespaceInsideFragment = removeTrailingWhitespaceInsideFragment = false;

    // Recurse
    if (item.f) {
      var isPreserveWhitespaceElement =
        item.t === ELEMENT &&
        (whiteSpaceElements[item.e.toLowerCase()] || whiteSpaceElements[item.e]);
      preserveWhitespaceInsideFragment = preserveWhitespace || isPreserveWhitespaceElement;

      if (!preserveWhitespace && isPreserveWhitespaceElement) {
        trimWhitespace(item.f, leadingNewLine, trailingNewLine);
      }

      if (!preserveWhitespaceInsideFragment) {
        previousItem = items[i - 1];
        nextItem = items[i + 1];

        // if the previous item was a text item with trailing whitespace,
        // remove leading whitespace inside the fragment
        if (!previousItem || (isString(previousItem) && trailingWhitespace.test(previousItem))) {
          removeLeadingWhitespaceInsideFragment = true;
        }

        // and vice versa
        if (!nextItem || (isString(nextItem) && leadingWhitespace$1.test(nextItem))) {
          removeTrailingWhitespaceInsideFragment = true;
        }
      }

      cleanup(
        item.f,
        stripComments,
        preserveWhitespaceInsideFragment,
        removeLeadingWhitespaceInsideFragment,
        removeTrailingWhitespaceInsideFragment,
        whiteSpaceElements
      );
    }

    // Split if-else blocks into two (an if, and an unless)
    if (item.l) {
      cleanup(
        item.l,
        stripComments,
        preserveWhitespace,
        removeLeadingWhitespaceInsideFragment,
        removeTrailingWhitespaceInsideFragment,
        whiteSpaceElements
      );

      item.l.forEach(function (s) { return (s.l = 1); });
      item.l.unshift(i + 1, 0);
      items.splice.apply(items, item.l);
      delete item.l; // TODO would be nice if there was a way around this
    }

    // Clean up conditional attributes
    if (item.m) {
      cleanup(
        item.m,
        stripComments,
        preserveWhitespace,
        removeLeadingWhitespaceInsideFragment,
        removeTrailingWhitespaceInsideFragment,
        whiteSpaceElements
      );
      if (item.m.length < 1) { delete item.m; }
    }
  }

  // final pass - fuse text nodes together
  i = items.length;
  while (i--) {
    if (isString(items[i])) {
      if (isString(items[i + 1])) {
        items[i] = items[i] + items[i + 1];
        items.splice(i + 1, 1);
      }

      if (!preserveWhitespace) {
        items[i] = items[i].replace(contiguousWhitespace, ' ');
      }

      if (items[i] === '') {
        items.splice(i, 1);
      }
    }
  }
}

var closingTagPattern = /^([a-zA-Z]{1,}:?[a-zA-Z0-9\-]*)\s*\>/;

function readClosingTag(parser) {
  var tag;

  var start = parser.pos;

  // are we looking at a closing tag?
  if (!parser.matchString('</')) {
    return null;
  }

  if ((tag = parser.matchPattern(closingTagPattern))) {
    if (parser.inside && tag !== parser.inside) {
      parser.pos = start;
      return null;
    }

    return {
      t: CLOSING_TAG,
      e: tag
    };
  }

  // We have an illegal closing tag, report it
  parser.pos -= 2;
  parser.error('Illegal closing tag');
}

function hyphenateCamel(camelCaseStr) {
  return camelCaseStr.replace(/([A-Z])/g, function (match, $1) {
    return '-' + $1.toLowerCase();
  });
}

var tagNamePattern = /^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/;
var anchorPattern = /^[a-zA-Z_$][-a-zA-Z0-9_$]*/;
var validTagNameFollower = /^[\s\n\/>]/;
var semiEnd = /;\s*$/;
var exclude = { exclude: true };

// based on http://developers.whatwg.org/syntax.html#syntax-tag-omission
var disallowedContents = {
  li: ['li'],
  dt: ['dt', 'dd'],
  dd: ['dt', 'dd'],
  p: 'address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul'.split(
    ' '
  ),
  rt: ['rt', 'rp'],
  rp: ['rt', 'rp'],
  optgroup: ['optgroup'],
  option: ['option', 'optgroup'],
  thead: ['tbody', 'tfoot'],
  tbody: ['tbody', 'tfoot'],
  tfoot: ['tbody'],
  tr: ['tr', 'tbody'],
  td: ['td', 'th', 'tr'],
  th: ['td', 'th', 'tr']
};

function readElement$1(parser) {
  var attribute,
    selfClosing,
    children,
    partials,
    hasPartials,
    child,
    closed,
    pos,
    remaining,
    closingTag,
    anchor;

  var start = parser.pos;

  if (parser.inside || parser.inAttribute || parser.textOnlyMode) {
    return null;
  }

  if (!parser.matchString('<')) {
    return null;
  }

  // if this is a closing tag, abort straight away
  if (parser.nextChar() === '/') {
    return null;
  }

  var element = {};
  if (parser.includeLinePositions) {
    element.q = parser.getLinePos(start);
  }

  // check for doctype decl
  if (parser.matchString('!')) {
    element.t = DOCTYPE;
    if (!parser.matchPattern(/^doctype/i)) {
      parser.error('Expected DOCTYPE declaration');
    }

    element.a = parser.matchPattern(/^(.+?)>/);
    return element;
  } else if ((anchor = parser.matchString('#'))) {
    // check for anchor
    parser.sp();
    element.t = ANCHOR;
    element.n = parser.matchPattern(anchorPattern);
  } else {
    // otherwise, it's an element/component
    element.t = ELEMENT;

    // element name
    element.e = parser.matchPattern(tagNamePattern);
    if (!element.e) {
      return null;
    }
  }

  // next character must be whitespace, closing solidus or '>'
  if (!validTagNameFollower.test(parser.nextChar())) {
    parser.error('Illegal tag name');
  }

  parser.sp();

  parser.inTag = true;

  // directives and attributes
  while ((attribute = readMustache(parser))) {
    if (attribute !== false) {
      if (!element.m) { element.m = []; }
      element.m.push(attribute);
    }

    parser.sp();
  }

  parser.inTag = false;

  // allow whitespace before closing solidus
  parser.sp();

  // self-closing solidus?
  if (parser.matchString('/')) {
    selfClosing = true;
  }

  // closing angle bracket
  if (!parser.matchString('>')) {
    return null;
  }

  var lowerCaseName = (element.e || element.n).toLowerCase();
  var preserveWhitespace = parser.preserveWhitespace;

  if (!selfClosing && (anchor || !voidElements[element.e.toLowerCase()])) {
    if (!anchor) {
      parser.elementStack.push(lowerCaseName);

      // Special case - if we open a script element, further tags should
      // be ignored unless they're a closing script element
      if (lowerCaseName in parser.interpolate) {
        parser.inside = lowerCaseName;
      }
    }

    children = [];
    partials = create(null);

    do {
      pos = parser.pos;
      remaining = parser.remaining();

      if (!remaining) {
        // if this happens to be a script tag and there's no content left, it's because
        // a closing script tag can't appear in a script
        if (parser.inside === 'script') {
          closed = true;
          break;
        }

        parser.error(
          ("Missing end " + (parser.elementStack.length > 1 ? 'tags' : 'tag') + " (" + (parser.elementStack
            .reverse()
            .map(function (x) { return ("</" + x + ">"); })
            .join('')) + ")")
        );
      }

      // if for example we're in an <li> element, and we see another
      // <li> tag, close the first so they become siblings
      if (!anchor && !canContain(lowerCaseName, remaining)) {
        closed = true;
      } else if (!anchor && (closingTag = readClosingTag(parser))) {
        // closing tag
        closed = true;

        var closingTagName = closingTag.e.toLowerCase();

        // if this *isn't* the closing tag for the current element...
        if (closingTagName !== lowerCaseName) {
          // rewind parser
          parser.pos = pos;

          // if it doesn't close a parent tag, error
          if (!~parser.elementStack.indexOf(closingTagName)) {
            var errorMessage = 'Unexpected closing tag';

            // add additional help for void elements, since component names
            // might clash with them
            if (voidElements[closingTagName.toLowerCase()]) {
              errorMessage += " (<" + closingTagName + "> is a void element - it cannot contain children)";
            }

            parser.error(errorMessage);
          }
        }
      } else if (anchor && readAnchorClose(parser, element.n)) {
        closed = true;
      } else {
        // implicit close by closing section tag. TODO clean this up
        var tag = {
          open: parser.standardDelimiters[0],
          close: parser.standardDelimiters[1]
        };
        if (readClosing(parser, tag) || readInline(parser, tag)) {
          closed = true;
          parser.pos = pos;
        } else if ((child = parser.read(PARTIAL_READERS))) {
          if (partials[child.n]) {
            parser.pos = pos;
            parser.error('Duplicate partial definition');
          }

          cleanup(
            child.f,
            parser.stripComments,
            preserveWhitespace,
            !preserveWhitespace,
            !preserveWhitespace,
            parser.whiteSpaceElements
          );

          partials[child.n] = child.f;
          hasPartials = true;
        } else {
          if ((child = parser.read(READERS))) {
            children.push(child);
          } else {
            closed = true;
          }
        }
      }
    } while (!closed);

    if (children.length) {
      element.f = children;
    }

    if (hasPartials) {
      element.p = partials;
    }

    parser.elementStack.pop();
  }

  parser.inside = null;

  if (parser.sanitizeElements && parser.sanitizeElements.indexOf(lowerCaseName) !== -1) {
    return exclude;
  }

  if (
    element.m &&
    lowerCaseName !== 'input' &&
    lowerCaseName !== 'select' &&
    lowerCaseName !== 'textarea' &&
    lowerCaseName !== 'option'
  ) {
    var attrs = element.m;
    var classes, styles, cls, style;
    var i = 0;
    var a;
    while (i < attrs.length) {
      a = attrs[i];

      if (a.t !== ATTRIBUTE) {
        i++;
        continue;
      }

      if (a.n.indexOf('class-') === 0 && !a.f) {
        // static class directives
        (classes || (classes = [])).push(a.n.slice(6));
        attrs.splice(i, 1);
      } else if (a.n.indexOf('style-') === 0 && isString(a.f)) {
        // static style directives
        (styles || (styles = [])).push(((hyphenateCamel(a.n.slice(6))) + ": " + (a.f) + ";"));
        attrs.splice(i, 1);
      } else if (a.n === 'class' && isString(a.f)) {
        // static class attrs
        (classes || (classes = [])).push(a.f);
        attrs.splice(i, 1);
      } else if (a.n === 'style' && isString(a.f)) {
        // static style attrs
        (styles || (styles = [])).push(a.f + (semiEnd.test(a.f) ? '' : ';'));
        attrs.splice(i, 1);
      } else if (a.n === 'class') {
        cls = a;
        i++;
      } else if (a.n === 'style') {
        style = a;
        i++;
      } else if (
        !~a.n.indexOf(':') &&
        a.n !== 'value' &&
        a.n !== 'contenteditable' &&
        isString(a.f)
      ) {
        a.g = 1;
        i++;
      } else {
        i++;
      }
    }

    if (classes) {
      if (!cls || !isString(cls.f))
        { attrs.unshift({ t: ATTRIBUTE, n: 'class', f: classes.join(' '), g: 1 }); }
      else { cls.f += ' ' + classes.join(' '); }
    } else if (cls && isString(cls.f)) { cls.g = 1; }

    if (styles) {
      if (!style || !isString(style.f))
        { attrs.unshift({ t: ATTRIBUTE, n: 'style', f: styles.join(' '), g: 1 }); }
      else { style.f += '; ' + styles.join(' '); }
    } else if (style && isString(style.f)) { style.g = 1; }
  }

  return element;
}

function canContain(name, remaining) {
  var match = /^<([a-zA-Z][a-zA-Z0-9]*)/.exec(remaining);
  var disallowed = disallowedContents[name];

  if (!match || !disallowed) {
    return true;
  }

  return !~disallowed.indexOf(match[1].toLowerCase());
}

function readAnchorClose(parser, name) {
  var pos = parser.pos;
  if (!parser.matchString('</')) {
    return null;
  }

  parser.matchString('#');
  parser.sp();

  if (!parser.matchString(name)) {
    parser.pos = pos;
    return null;
  }

  parser.sp();

  if (!parser.matchString('>')) {
    parser.pos = pos;
    return null;
  }

  return true;
}

var inlines = /^\s*(elseif|else|then|catch)\s*/;
function readInline(parser, tag) {
  var pos = parser.pos;
  if (!parser.matchString(tag.open)) { return; }
  if (parser.matchPattern(inlines)) {
    return true;
  } else {
    parser.pos = pos;
  }
}

function readText(parser) {
  var index, disallowed, barrier;

  var remaining = parser.remaining();

  if (parser.textOnlyMode) {
    disallowed = parser.tags.map(function (t) { return t.open; });
    disallowed = disallowed.concat(parser.tags.map(function (t) { return '\\' + t.open; }));

    index = getLowestIndex(remaining, disallowed);
  } else {
    barrier = parser.inside ? '</' + parser.inside : '<';

    if (parser.inside && !parser.interpolate[parser.inside]) {
      index = remaining.indexOf(barrier);
    } else {
      disallowed = parser.tags.map(function (t) { return t.open; });
      disallowed = disallowed.concat(parser.tags.map(function (t) { return '\\' + t.open; }));

      // http://developers.whatwg.org/syntax.html#syntax-attributes
      if (parser.inAttribute === true) {
        // we're inside an unquoted attribute value
        disallowed.push("\"", "'", "=", "<", ">", '`');
      } else if (parser.inAttribute) {
        // quoted attribute value
        disallowed.push(parser.inAttribute);
      } else {
        disallowed.push(barrier);
      }

      index = getLowestIndex(remaining, disallowed);
    }
  }

  if (!index) {
    return null;
  }

  if (index === -1) {
    index = remaining.length;
  }

  parser.pos += index;

  if ((parser.inside && parser.inside !== 'textarea') || parser.textOnlyMode) {
    return remaining.substr(0, index);
  } else {
    return decodeCharacterReferences(remaining.substr(0, index));
  }
}

var partialDefinitionSectionPattern = /^\s*#\s*partial\s+/;

function readPartialDefinitionSection(parser) {
  var child, closed;

  var start = parser.pos;

  var delimiters = parser.standardDelimiters;

  if (!parser.matchString(delimiters[0])) {
    return null;
  }

  if (!parser.matchPattern(partialDefinitionSectionPattern)) {
    parser.pos = start;
    return null;
  }

  var name = parser.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-\/]*/);

  if (!name) {
    parser.error('expected legal partial name');
  }

  parser.sp();
  if (!parser.matchString(delimiters[1])) {
    parser.error(("Expected closing delimiter '" + (delimiters[1]) + "'"));
  }

  var content = [];

  var open = delimiters[0];
  var close = delimiters[1];

  do {
    if ((child = readClosing(parser, { open: open, close: close }))) {
      if (child.r !== 'partial') {
        parser.error(("Expected " + open + "/partial" + close));
      }

      closed = true;
    } else {
      child = parser.read(READERS);

      if (!child) {
        parser.error(("Expected " + open + "/partial" + close));
      }

      content.push(child);
    }
  } while (!closed);

  return {
    t: INLINE_PARTIAL,
    n: name,
    f: content
  };
}

function readTemplate(parser) {
  var fragment = [];
  var partials = create(null);
  var hasPartials = false;

  var preserveWhitespace = parser.preserveWhitespace;

  while (parser.pos < parser.str.length) {
    var pos = parser.pos;
    var item = (void 0), partial = (void 0);

    if ((partial = parser.read(PARTIAL_READERS))) {
      if (partials[partial.n]) {
        parser.pos = pos;
        parser.error('Duplicated partial definition');
      }

      cleanup(
        partial.f,
        parser.stripComments,
        preserveWhitespace,
        !preserveWhitespace,
        !preserveWhitespace,
        parser.whiteSpaceElements
      );

      partials[partial.n] = partial.f;
      hasPartials = true;
    } else if ((item = parser.read(READERS))) {
      fragment.push(item);
    } else {
      parser.error('Unexpected template content');
    }
  }

  var result = {
    v: TEMPLATE_VERSION,
    t: fragment
  };

  if (hasPartials) {
    result.p = partials;
  }

  return result;
}

function insertExpressions(obj, expr) {
  keys(obj).forEach(function (key) {
    if (isExpression(key, obj)) { return addTo(obj, expr); }

    var ref = obj[key];
    if (hasChildren(ref)) { insertExpressions(ref, expr); }
  });
}

function isExpression(key, obj) {
  return key === 's' && isArray(obj.r);
}

function addTo(obj, expr) {
  var s = obj.s;
  var r = obj.r;
  if (!expr[s]) { expr[s] = fromExpression(s, r.length); }
}

function hasChildren(ref) {
  return isArray(ref) || isObject(ref);
}

var shared = {};

// See https://github.com/ractivejs/template-spec for information
// about the Ractive template specification

var STANDARD_READERS = [
  readPartial,
  readUnescaped,
  readSection,
  readInterpolator,
  readComment
];
var TRIPLE_READERS = [readTriple];

var READERS = [readMustache, readHtmlComment, readElement$1, readText];
var PARTIAL_READERS = [readPartialDefinitionSection];

var preserveWhitespaceElements = { pre: 1, script: 1, style: 1, textarea: 1 };

var defaultInterpolate = { textarea: true, script: true, style: true, template: true };

var StandardParser = Parser.extend({
  init: function init(str, options) {
    var tripleDelimiters = options.tripleDelimiters || shared.defaults.tripleDelimiters;
    var staticDelimiters = options.staticDelimiters || shared.defaults.staticDelimiters;
    var staticTripleDelimiters =
      options.staticTripleDelimiters || shared.defaults.staticTripleDelimiters;

    this.standardDelimiters = options.delimiters || shared.defaults.delimiters;

    this.tags = [
      {
        isStatic: false,
        isTriple: false,
        open: this.standardDelimiters[0],
        close: this.standardDelimiters[1],
        readers: STANDARD_READERS
      },
      {
        isStatic: false,
        isTriple: true,
        open: tripleDelimiters[0],
        close: tripleDelimiters[1],
        readers: TRIPLE_READERS
      },
      {
        isStatic: true,
        isTriple: false,
        open: staticDelimiters[0],
        close: staticDelimiters[1],
        readers: STANDARD_READERS
      },
      {
        isStatic: true,
        isTriple: true,
        open: staticTripleDelimiters[0],
        close: staticTripleDelimiters[1],
        readers: TRIPLE_READERS
      }
    ];

    this.contextLines = options.contextLines || shared.defaults.contextLines;

    this.sortMustacheTags();

    this.sectionDepth = 0;
    this.elementStack = [];

    this.interpolate = assign(
      {},
      defaultInterpolate,
      shared.defaults.interpolate,
      options.interpolate
    );

    if (options.sanitize === true) {
      options.sanitize = {
        // blacklist from https://code.google.com/p/google-caja/source/browse/trunk/src/com/google/caja/lang/html/html4-elements-whitelist.json
        elements: 'applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title'.split(
          ' '
        ),
        eventAttributes: true
      };
    }

    this.stripComments = options.stripComments !== false;
    this.preserveWhitespace = isObjectType(options.preserveWhitespace)
      ? false
      : options.preserveWhitespace;
    this.sanitizeElements = options.sanitize && options.sanitize.elements;
    this.sanitizeEventAttributes = options.sanitize && options.sanitize.eventAttributes;
    this.includeLinePositions = options.includeLinePositions;
    this.textOnlyMode = options.textOnlyMode;
    this.csp = options.csp;
    this.allowExpressions = options.allowExpressions;

    if (options.expression) { this.converters = [readExpression]; }

    if (options.attributes) { this.inTag = true; }

    // special whitespace handling requested for certain elements
    this.whiteSpaceElements = assign({}, options.preserveWhitespace, preserveWhitespaceElements);
  },

  postProcess: function postProcess(result, options) {
    var parserResult = result[0];

    if (options.expression) {
      var expr = flattenExpression(parserResult);
      expr.e = fromExpression(expr.s, expr.r.length);
      return expr;
    } else {
      // special case - empty string
      if (!result.length) {
        return { t: [], v: TEMPLATE_VERSION };
      }

      if (this.sectionDepth > 0) {
        this.error('A section was left open');
      }

      cleanup(
        parserResult.t,
        this.stripComments,
        this.preserveWhitespace,
        !this.preserveWhitespace,
        !this.preserveWhitespace,
        this.whiteSpaceElements
      );

      if (this.csp !== false) {
        var expr$1 = {};

        insertExpressions(parserResult.t, expr$1);
        insertExpressions(parserResult.p || {}, expr$1);

        if (keys(expr$1).length) { parserResult.e = expr$1; }
      }

      return parserResult;
    }
  },

  converters: [readTemplate],

  sortMustacheTags: function sortMustacheTags() {
    // Sort in order of descending opening delimiter length (longer first),
    // to protect against opening delimiters being substrings of each other
    this.tags.sort(function (a, b) {
      return b.open.length - a.open.length;
    });
  }
});

function parse(template, options) {
  return new StandardParser(template, options || {}).result;
}

var parseOptions = [
  'delimiters',
  'tripleDelimiters',
  'staticDelimiters',
  'staticTripleDelimiters',
  'csp',
  'interpolate',
  'preserveWhitespace',
  'sanitize',
  'stripComments',
  'contextLines',
  'allowExpressions',
  'attributes'
];

var TEMPLATE_INSTRUCTIONS = "Either preparse or use a ractive runtime source that includes the parser. ";

var COMPUTATION_INSTRUCTIONS = "Either include a version of Ractive that can parse or convert your computation strings to functions.";

function throwNoParse(method, error, instructions) {
  if (!method) {
    fatal(("Missing Ractive.parse - cannot parse " + error + ". " + instructions));
  }
}

function createFunction(body, length) {
  throwNoParse(fromExpression, 'new expression function', TEMPLATE_INSTRUCTIONS);
  return fromExpression(body, length);
}

function createFunctionFromString(str, bindTo) {
  throwNoParse(parse, 'compution string "${str}"', COMPUTATION_INSTRUCTIONS);
  var tpl = parse(str, { expression: true });
  return function() {
    return tpl.e.apply(bindTo, tpl.r.map(function (r) { return bindTo.get(r); }));
  };
}

var parser = {
  fromId: function fromId(id, options) {
    if (!doc) {
      if (options && options.noThrow) {
        return;
      }
      throw new Error(("Cannot retrieve template #" + id + " as Ractive is not running in a browser."));
    }

    if (id) { id = id.replace(/^#/, ''); }

    var template;

    if (!(template = doc.getElementById(id))) {
      if (options && options.noThrow) {
        return;
      }
      throw new Error(("Could not find template element with id #" + id));
    }

    if (template.tagName.toUpperCase() !== 'SCRIPT') {
      if (options && options.noThrow) {
        return;
      }
      throw new Error(("Template element with id #" + id + ", must be a <script> element"));
    }

    return 'textContent' in template ? template.textContent : template.innerHTML;
  },

  isParsed: function isParsed(template) {
    return !isString(template);
  },

  getParseOptions: function getParseOptions(ractive) {
    // Could be Ractive or a Component
    if (ractive.defaults) {
      ractive = ractive.defaults;
    }

    return parseOptions.reduce(function (val, key) {
      val[key] = ractive[key];
      return val;
    }, {});
  },

  parse: function parse$1(template, options) {
    throwNoParse(parse, 'template', TEMPLATE_INSTRUCTIONS);
    var parsed = parse(template, options);
    addFunctions(parsed);
    return parsed;
  },

  parseFor: function parseFor(template, ractive) {
    return this.parse(template, this.getParseOptions(ractive));
  }
};

function getComputationSignature(ractive, key, signature) {
  var getter;
  var setter;

  // useful for debugging
  var getterString;
  var getterUseStack;
  var setterString;

  if (isFunction(signature)) {
    getter = bind(signature, ractive);
    getterString = signature.toString();
    getterUseStack = true;
  }

  if (isString(signature)) {
    getter = createFunctionFromString(signature, ractive);
    getterString = signature;
  }

  if (isObjectType(signature)) {
    if (isString(signature.get)) {
      getter = createFunctionFromString(signature.get, ractive);
      getterString = signature.get;
    } else if (isFunction(signature.get)) {
      getter = bind(signature.get, ractive);
      getterString = signature.get.toString();
      getterUseStack = true;
    } else {
      fatal('`%s` computation must have a `get()` method', key);
    }

    if (isFunction(signature.set)) {
      setter = bind(signature.set, ractive);
      setterString = signature.set.toString();
    }
  }

  return {
    getter: getter,
    setter: setter,
    getterString: getterString,
    setterString: setterString,
    getterUseStack: getterUseStack
  };
}

var id = 0;

var TransitionManager = function TransitionManager(callback, parent) {
  this.callback = callback;
  this.parent = parent;

  this.intros = [];
  this.outros = [];

  this.children = [];
  this.totalChildren = this.outroChildren = 0;

  this.detachQueue = [];
  this.outrosComplete = false;

  this.id = id++;

  if (parent) {
    parent.addChild(this);
  }
};
var TransitionManager__proto__ = TransitionManager.prototype;

TransitionManager__proto__.add = function add (transition) {
  var list = transition.isIntro ? this.intros : this.outros;
  transition.starting = true;
  list.push(transition);
};

TransitionManager__proto__.addChild = function addChild (child) {
  this.children.push(child);

  this.totalChildren += 1;
  this.outroChildren += 1;
};

TransitionManager__proto__.checkStart = function checkStart () {
  if (this.parent && this.parent.started) { this.start(); }
};

TransitionManager__proto__.decrementOutros = function decrementOutros () {
  this.outroChildren -= 1;
  check(this);
};

TransitionManager__proto__.decrementTotal = function decrementTotal () {
  this.totalChildren -= 1;
  check(this);
};

TransitionManager__proto__.detachNodes = function detachNodes () {
    var this$1 = this;

  var len = this.detachQueue.length;
  for (var i = 0; i < len; i++) { this$1.detachQueue[i].detach(); }
  len = this.children.length;
  for (var i$1 = 0; i$1 < len; i$1++) { this$1.children[i$1].detachNodes(); }
  this.detachQueue = [];
};

TransitionManager__proto__.ready = function ready () {
  if (this.detachQueue.length) { detachImmediate(this); }
};

TransitionManager__proto__.remove = function remove (transition) {
  var list = transition.isIntro ? this.intros : this.outros;
  removeFromArray(list, transition);
  check(this);
};

TransitionManager__proto__.start = function start () {
  this.started = true;
  this.children.forEach(function (c) { return c.start(); });
  this.intros.concat(this.outros).forEach(function (t) { return t.start(); });
  check(this);
};

function check(tm) {
  if (!tm.started || tm.outros.length || tm.outroChildren) { return; }

  // If all outros are complete, and we haven't already done this,
  // we notify the parent if there is one, otherwise
  // start detaching nodes
  if (!tm.outrosComplete) {
    tm.outrosComplete = true;

    if (tm.parent) { tm.parent.decrementOutros(tm); }

    if (!tm.parent || tm.parent.outrosComplete) {
      tm.detachNodes();
    }
  }

  // Once everything is done, we can notify parent transition
  // manager and call the callback
  if (!tm.intros.length && !tm.totalChildren) {
    if (isFunction(tm.callback)) {
      tm.callback();
    }

    if (tm.parent && !tm.notifiedTotal) {
      tm.notifiedTotal = true;
      tm.parent.decrementTotal();
    }
  }
}

// check through the detach queue to see if a node is up or downstream from a
// transition and if not, go ahead and detach it
function detachImmediate(manager) {
  var queue = manager.detachQueue;
  var outros = collectAllOutros(manager);

  if (!outros.length) {
    manager.detachNodes();
  } else {
    var i = queue.length;
    var j = 0;
    var node, trans;
    var nqueue = (manager.detachQueue = []);

    start: while (i--) {
      node = queue[i].node;
      j = outros.length;
      while (j--) {
        trans = outros[j].element.node;
        // check to see if the node is, contains, or is contained by the transitioning node
        if (trans === node || trans.contains(node) || node.contains(trans)) {
          nqueue.push(queue[i]);
          continue start;
        }
      }

      // no match, we can drop it
      queue[i].detach();
    }
  }
}

function collectAllOutros(manager, _list) {
  var list = _list;

  // if there's no list, we're starting at the root to build one
  if (!list) {
    list = [];
    var parent = manager;
    while (parent.parent) { parent = parent.parent; }
    return collectAllOutros(parent, list);
  } else {
    // grab all outros from child managers
    var i = manager.children.length;
    while (i--) {
      list = collectAllOutros(manager.children[i], list);
    }

    // grab any from this manager if there are any
    if (manager.outros.length) { list = list.concat(manager.outros); }

    return list;
  }
}

var batch;

var runloop = {
  active: function active() {
    return !!batch;
  },

  start: function start() {
    var fulfilPromise;
    var promise = new Promise(function (f) { return (fulfilPromise = f); });

    batch = {
      previousBatch: batch,
      transitionManager: new TransitionManager(fulfilPromise, batch && batch.transitionManager),
      fragments: [],
      tasks: [],
      immediateObservers: [],
      deferredObservers: [],
      promise: promise
    };

    return promise;
  },

  end: function end() {
    flushChanges();

    if (!batch.previousBatch) { batch.transitionManager.start(); }
    else { batch.transitionManager.checkStart(); }

    batch = batch.previousBatch;
  },

  addFragment: function addFragment(fragment) {
    addToArray(batch.fragments, fragment);
  },

  // TODO: come up with a better way to handle fragments that trigger their own update
  addFragmentToRoot: function addFragmentToRoot(fragment) {
    if (!batch) { return; }

    var b = batch;
    while (b.previousBatch) {
      b = b.previousBatch;
    }

    addToArray(b.fragments, fragment);
  },

  addObserver: function addObserver(observer, defer) {
    if (!batch) {
      observer.dispatch();
    } else {
      addToArray(defer ? batch.deferredObservers : batch.immediateObservers, observer);
    }
  },

  registerTransition: function registerTransition(transition) {
    transition._manager = batch.transitionManager;
    batch.transitionManager.add(transition);
  },

  // synchronise node detachments with transition ends
  detachWhenReady: function detachWhenReady(thing) {
    batch.transitionManager.detachQueue.push(thing);
  },

  scheduleTask: function scheduleTask(task, postRender) {
    var _batch;

    if (!batch) {
      task();
    } else {
      _batch = batch;
      while (postRender && _batch.previousBatch) {
        // this can't happen until the DOM has been fully updated
        // otherwise in some situations (with components inside elements)
        // transitions and decorators will initialise prematurely
        _batch = _batch.previousBatch;
      }

      _batch.tasks.push(task);
    }
  },

  promise: function promise() {
    if (!batch) { return Promise.resolve(); }

    var target = batch;
    while (target.previousBatch) {
      target = target.previousBatch;
    }

    return target.promise || Promise.resolve();
  }
};

function dispatch(observer) {
  observer.dispatch();
}

function flushChanges() {
  var which = batch.immediateObservers;
  batch.immediateObservers = [];
  which.forEach(dispatch);

  // Now that changes have been fully propagated, we can update the DOM
  // and complete other tasks
  var i = batch.fragments.length;
  var fragment;

  which = batch.fragments;
  batch.fragments = [];

  while (i--) {
    fragment = which[i];
    fragment.update();
  }

  batch.transitionManager.ready();

  which = batch.deferredObservers;
  batch.deferredObservers = [];
  which.forEach(dispatch);

  var tasks = batch.tasks;
  batch.tasks = [];

  for (i = 0; i < tasks.length; i += 1) {
    tasks[i]();
  }

  // If updating the view caused some model blowback - e.g. a triple
  // containing <option> elements caused the binding on the <select>
  // to update - then we start over
  if (
    batch.fragments.length ||
    batch.immediateObservers.length ||
    batch.deferredObservers.length ||
    batch.tasks.length
  )
    { return flushChanges(); }
}

// TODO what happens if a transition is aborted?

var tickers = [];
var running = false;

function tick() {
  runloop.start();

  var now = performance.now();

  var i;
  var ticker;

  for (i = 0; i < tickers.length; i += 1) {
    ticker = tickers[i];

    if (!ticker.tick(now)) {
      // ticker is complete, remove it from the stack, and decrement i so we don't miss one
      tickers.splice(i--, 1);
    }
  }

  runloop.end();

  if (tickers.length) {
    requestAnimationFrame(tick);
  } else {
    running = false;
  }
}

var Ticker = function Ticker(options) {
  this.duration = options.duration;
  this.step = options.step;
  this.complete = options.complete;
  this.easing = options.easing;

  this.start = performance.now();
  this.end = this.start + this.duration;

  this.running = true;

  tickers.push(this);
  if (!running) { requestAnimationFrame(tick); }
};
var Ticker__proto__ = Ticker.prototype;

Ticker__proto__.tick = function tick (now) {
  if (!this.running) { return false; }

  if (now > this.end) {
    if (this.step) { this.step(1); }
    if (this.complete) { this.complete(1); }

    return false;
  }

  var elapsed = now - this.start;
  var eased = this.easing(elapsed / this.duration);

  if (this.step) { this.step(eased); }

  return true;
};

Ticker__proto__.stop = function stop () {
  if (this.abort) { this.abort(); }
  this.running = false;
};

var prefixers = {};

// TODO this is legacy. sooner we can replace the old adaptor API the better
/* istanbul ignore next */
function prefixKeypath(obj, prefix) {
  var prefixed = {};

  if (!prefix) {
    return obj;
  }

  prefix += '.';

  for (var key in obj) {
    if (hasOwn(obj, key)) {
      prefixed[prefix + key] = obj[key];
    }
  }

  return prefixed;
}

function getPrefixer(rootKeypath) {
  var rootDot;

  if (!prefixers[rootKeypath]) {
    rootDot = rootKeypath ? rootKeypath + '.' : '';

    /* istanbul ignore next */
    prefixers[rootKeypath] = function(relativeKeypath, value) {
      var obj;

      if (isString(relativeKeypath)) {
        obj = {};
        obj[rootDot + relativeKeypath] = value;
        return obj;
      }

      if (isObjectType(relativeKeypath)) {
        // 'relativeKeypath' is in fact a hash, not a keypath
        return rootDot ? prefixKeypath(relativeKeypath, rootKeypath) : relativeKeypath;
      }
    };
  }

  return prefixers[rootKeypath];
}

var shared$1 = {};

var Model = (function (ModelBase) {
  function Model(parent, key) {
    ModelBase.call(this, parent);

    this.ticker = null;

    if (parent) {
      this.key = unescapeKey(key);
      this.isReadonly = parent.isReadonly;

      if (parent.value) {
        this.value = parent.value[this.key];
        if (isArray(this.value)) { this.length = this.value.length; }
        this.adapt();
      }
    }
  }

  if ( ModelBase ) Model.__proto__ = ModelBase;
  var Model__proto__ = Model.prototype = Object.create( ModelBase && ModelBase.prototype );
  Model__proto__.constructor = Model;

  Model__proto__.adapt = function adapt () {
    var this$1 = this;

    var adaptors = this.root.adaptors;
    var len = adaptors.length;

    this.rewrap = false;

    // Exit early if no adaptors
    if (len === 0) { return; }

    var value = this.wrapper
      ? 'newWrapperValue' in this
        ? this.newWrapperValue
        : this.wrapperValue
      : this.value;

    // TODO remove this legacy nonsense
    var ractive = this.root.ractive;
    var keypath = this.getKeypath();

    // tear previous adaptor down if present
    if (this.wrapper) {
      var shouldTeardown =
        this.wrapperValue === value
          ? false
          : !this.wrapper.reset || this.wrapper.reset(value) === false;

      if (shouldTeardown) {
        this.wrapper.teardown();
        delete this.wrapper;
        delete this.wrapperValue;
        delete this.newWrapperValue;

        // don't branch for undefined values
        if (this.value !== undefined) {
          var parentValue = this.parent.value || this.parent.createBranch(this.key);
          if (parentValue[this.key] !== value) { parentValue[this.key] = value; }
          this.value = value;
        }
      } else {
        delete this.newWrapperValue;
        this.value = this.wrapper.get();
        return;
      }
    }

    var i;

    for (i = 0; i < len; i += 1) {
      var adaptor = adaptors[i];
      if (adaptor.filter(value, keypath, ractive)) {
        this$1.wrapper = adaptor.wrap(ractive, value, keypath, getPrefixer(keypath));
        this$1.wrapperValue = value;
        this$1.wrapper.__model = this$1; // massive temporary hack to enable array adaptor

        this$1.value = this$1.wrapper.get();

        break;
      }
    }
  };

  Model__proto__.animate = function animate (from, to, options, interpolator) {
    var this$1 = this;

    if (this.ticker) { this.ticker.stop(); }

    var fulfilPromise;
    var promise = new Promise(function (fulfil) { return (fulfilPromise = fulfil); });

    this.ticker = new Ticker({
      duration: options.duration,
      easing: options.easing,
      step: function (t) {
        var value = interpolator(t);
        this$1.applyValue(value);
        if (options.step) { options.step(t, value); }
      },
      complete: function () {
        this$1.applyValue(to);
        if (options.complete) { options.complete(to); }

        this$1.ticker = null;
        fulfilPromise(to);
      }
    });

    promise.stop = this.ticker.stop;
    return promise;
  };

  Model__proto__.applyValue = function applyValue (value, notify) {
    if ( notify === void 0 ) notify = true;

    if (isEqual(value, this.value)) { return; }
    if (this.boundValue) { this.boundValue = null; }

    if (this.parent.wrapper && this.parent.wrapper.set) {
      this.parent.wrapper.set(this.key, value);
      this.parent.value = this.parent.wrapper.get();

      this.value = this.parent.value[this.key];
      if (this.wrapper) { this.newWrapperValue = this.value; }
      this.adapt();
    } else if (this.wrapper) {
      this.newWrapperValue = value;
      this.adapt();
    } else {
      var parentValue = this.parent.value || this.parent.createBranch(this.key);
      if (isObjectLike(parentValue)) {
        parentValue[this.key] = value;
      } else {
        warnIfDebug(("Attempted to set a property of a non-object '" + (this.getKeypath()) + "'"));
        return;
      }

      this.value = value;
      this.adapt();
    }

    if (this.dataModel || (value && value.viewmodel && value.viewmodel.isRoot)) {
      checkDataLink(this, value);
    }

    // keep track of array stuff
    if (isArray(value)) {
      this.length = value.length;
      this.isArray = true;
    } else {
      this.isArray = false;
    }

    // notify dependants
    this.links.forEach(handleChange);
    this.children.forEach(mark);
    this.deps.forEach(handleChange);

    if (notify) { this.notifyUpstream(); }

    if (this.parent.isArray) {
      if (this.key === 'length') { this.parent.length = value; }
      else { this.parent.joinKey('length').mark(); }
    }
  };

  Model__proto__.compute = function compute (key, computed) {
    var registry = this.computed || (this.computed = {});

    if (registry[key]) {
      registry[key].signature = getComputationSignature(this.root.ractive, key, computed);
      registry[key].mark();
    } else {
      registry[key] = new shared$1.Computation(
        this,
        getComputationSignature(this.root.ractive, key, computed),
        key
      );
    }

    return registry[key];
  };

  Model__proto__.createBranch = function createBranch (key) {
    var branch = isNumeric(key) ? [] : {};
    this.applyValue(branch, false);

    return branch;
  };

  Model__proto__.get = function get (shouldCapture, opts) {
    if (this._link) { return this._link.get(shouldCapture, opts); }
    if (shouldCapture) { capture(this); }
    // if capturing, this value needs to be unwrapped because it's for external use
    if (opts && opts.virtual) { return this.getVirtual(false); }
    return maybeBind(
      this,
      (opts && 'unwrap' in opts ? opts.unwrap !== false : shouldCapture) && this.wrapper
        ? this.wrapperValue
        : this.value,
      !opts || opts.shouldBind !== false
    );
  };

  Model__proto__.joinKey = function joinKey (key, opts) {
    var this$1 = this;

    if (this._link) {
      if (opts && opts.lastLink !== false && (isUndefined(key) || key === '')) { return this; }
      return this._link.joinKey(key);
    }

    if (isUndefined(key) || key === '') { return this; }

    var child;
    if (hasOwn(this.childByKey, key)) { child = this.childByKey[key]; }
    else { child = this.computed && this.computed[key]; }

    if (!child) {
      var computed;
      if (this.isRoot && this.ractive && (computed = this.ractive.computed[key])) {
        child = this.compute(key, computed);
      } else if (!this.isRoot && this.root.ractive) {
        var registry = this.root.ractive.computed;
        for (var k in registry) {
          computed = registry[k];
          if (computed.pattern && computed.pattern.test(this$1.getKeypath() + '.' + key)) {
            child = this$1.compute(key, computed);
          }
        }
      }
    }

    if (!child) {
      child = new Model(this, key);
      this.children.push(child);
      this.childByKey[key] = child;

      if (key === 'data') {
        var val = this.retrieve();
        if (val && val.viewmodel && val.viewmodel.isRoot) {
          child.link(val.viewmodel, 'data');
          this.dataModel = val;
        }
      }
    }

    if (child._link && (!opts || opts.lastLink !== false)) { return child._link; }

    return child;
  };

  Model__proto__.mark = function mark$1 (force) {
    if (this._link) { return this._link.mark(force); }

    var old = this.value;
    var value = this.retrieve();

    if (this.dataModel || (value && value.viewmodel && value.viewmodel.isRoot)) {
      checkDataLink(this, value);
    }

    if (force || !isEqual(value, old)) {
      this.value = value;
      if (this.boundValue) { this.boundValue = null; }

      // make sure the wrapper stays in sync
      if (old !== value || this.rewrap) {
        if (this.wrapper) { this.newWrapperValue = value; }
        this.adapt();
      }

      // keep track of array stuff
      if (isArray(value)) {
        this.length = value.length;
        this.isArray = true;
      } else {
        this.isArray = false;
      }

      this.children.forEach(force ? markForce : mark);
      this.links.forEach(marked);

      this.deps.forEach(handleChange);
    }
  };

  Model__proto__.merge = function merge (array, comparator) {
    var newIndices = buildNewIndices(
      this.value === array ? recreateArray(this) : this.value,
      array,
      comparator
    );
    this.parent.value[this.key] = array;
    this.shuffle(newIndices, true);
  };

  Model__proto__.retrieve = function retrieve () {
    return this.parent.value ? this.parent.value[this.key] : undefined;
  };

  Model__proto__.set = function set (value) {
    if (this.ticker) { this.ticker.stop(); }
    this.applyValue(value);
  };

  Model__proto__.shuffle = function shuffle$2 (newIndices, unsafe) {
    shuffle(this, newIndices, false, unsafe);
  };

  Model__proto__.source = function source () {
    return this;
  };

  Model__proto__.teardown = function teardown$4 () {
    var this$1 = this;

    if (this._link) {
      this._link.teardown();
      this._link = null;
    }
    this.children.forEach(teardown);
    if (this.wrapper) { this.wrapper.teardown(); }
    if (this.computed) { keys(this.computed).forEach(function (k) { return this$1.computed[k].teardown(); }); }
  };

  return Model;
}(ModelBase));

function recreateArray(model) {
  var array = [];

  for (var i = 0; i < model.length; i++) {
    array[i] = (model.childByKey[i] || {}).value;
  }

  return array;
}

/* global global */
var data = {};

var SharedModel = (function (Model) {
  function SharedModel(value, name, ractive) {
    Model.call(this, null, ("@" + name));
    this.key = "@" + name;
    this.value = value;
    this.isRoot = true;
    this.root = this;
    this.adaptors = [];
    this.ractive = ractive;
  }

  if ( Model ) SharedModel.__proto__ = Model;
  var SharedModel__proto__ = SharedModel.prototype = Object.create( Model && Model.prototype );
  SharedModel__proto__.constructor = SharedModel;

  SharedModel__proto__.getKeypath = function getKeypath () {
    return this.key;
  };

  SharedModel__proto__.retrieve = function retrieve () {
    return this.value;
  };

  return SharedModel;
}(Model));

var SharedModel$1 = new SharedModel(data, 'shared');

var GlobalModel = new SharedModel(base, 'global');

function findContext(fragment) {
  var frag = fragment;
  while (frag && !frag.context && !frag.aliases) { frag = frag.parent; }
  return frag;
}

function resolveReference(fragment, ref) {
  var initialFragment = fragment;
  // current context ref
  if (ref === '.') { return fragment.findContext(); }

  // ancestor references
  if (ref[0] === '~') { return fragment.ractive.viewmodel.joinAll(splitKeypath(ref.slice(2))); }

  // scoped references
  if (ref[0] === '.' || ref[0] === '^') {
    var frag = fragment;
    var parts = ref.split('/');
    var explicitContext = parts[0] === '^^';

    // find nearest context node
    while (frag && !frag.context) {
      frag = up(frag);
    }
    var context$1 = frag && frag.context;

    // walk up the context chain
    while (frag && parts[0] === '^^') {
      parts.shift();

      // the current fragment should always be a context,
      // and if it happens to be an iteration, jump above the each block
      if (frag.isIteration) {
        frag = frag.parent.parent;
      } else {
        // otherwise jump above the current fragment
        frag = up(frag);
      }

      // walk to the next contexted fragment
      while (frag && !frag.context) {
        frag = up(frag);
      }
      context$1 = frag && frag.context;
    }

    if (!context$1 && explicitContext) {
      throw new Error(
        ("Invalid context parent reference ('" + ref + "'). There is not context at that level.")
      );
    }

    // walk up the context path
    while (parts[0] === '.' || parts[0] === '..') {
      var part = parts.shift();

      if (part === '..') {
        context$1 = context$1.parent;
      }
    }

    ref = parts.join('/');

    // special case - `{{.foo}}` means the same as `{{./foo}}`
    if (ref[0] === '.') { ref = ref.slice(1); }
    return context$1.joinAll(splitKeypath(ref));
  }

  var keys$$1 = splitKeypath(ref);
  if (!keys$$1.length) { return; }
  var base = keys$$1.shift();

  // special refs
  if (base[0] === '@') {
    // shorthand from outside the template
    // @this referring to local ractive instance
    if (base === '@this' || base === '@') {
      return fragment.ractive.viewmodel.getRactiveModel().joinAll(keys$$1);
    } else if (base === '@index' || base === '@key') {
      // @index or @key referring to the nearest repeating index or key
      if (keys$$1.length) { badReference(base); }
      var repeater = findIter(fragment);
      return repeater && repeater[("get" + (base[1] === 'i' ? 'Index' : 'Key'))]();
    } else if (base === '@last') {
      var repeater$1 = findIter(fragment);
      return repeater$1 && repeater$1.parent.getLast();
    } else if (base === '@global') {
      // @global referring to window or global
      return GlobalModel.joinAll(keys$$1);
    } else if (base === '@shared') {
      // @global referring to window or global
      return SharedModel$1.joinAll(keys$$1);
    } else if (base === '@keypath' || base === '@rootpath') {
      // @keypath or @rootpath, the current keypath string
      var root = ref[1] === 'r' ? fragment.ractive.root : null;
      var f = fragment;

      while (
        f &&
        (!f.context || (f.isRoot && f.ractive.component && (root || !f.ractive.isolated)))
      ) {
        f = f.isRoot ? f.componentParent : f.parent;
      }

      return f.getKeypath(root);
    } else if (base === '@context') {
      return new SharedModel(fragment.getContext(), 'context').joinAll(keys$$1);
    } else if (base === '@local') {
      // @context-local data
      return fragment.getContext()._data.joinAll(keys$$1);
    } else if (base === '@style') {
      // @style shared model
      return fragment.ractive.constructor._cssModel.joinAll(keys$$1);
    } else if (base === '@helpers') {
      // @helpers instance model
      return fragment.ractive.viewmodel.getHelpers().joinAll(keys$$1);
    } else if (base === '@macro') {
      var handle = findMacro(fragment);
      if (handle) { return new SharedModel(handle, 'macro').joinAll(keys$$1); }
      else { return; }
    } else {
      // nope
      throw new Error(("Invalid special reference '" + base + "'"));
    }
  }

  // helpers
  if (base && !keys$$1.length) {
    var helpers = fragment.ractive.viewmodel.getHelpers();
    if (helpers.has(base)) { return helpers.joinKey(base); }
  }

  var context = findContext(fragment);

  // check immediate context for a match
  if (context) {
    if (context.context) {
      context = context.context;
    } else {
      // alias block, so get next full context for later
      context = fragment.findContext();
    }
  } else {
    context = fragment.findContext();
  }

  // walk up the fragment hierarchy looking for a matching ref, alias, or key in a context
  var createMapping = false;
  var shouldWarn = fragment.ractive.warnAboutAmbiguity;
  var crossed = 0;
  var model;

  while (fragment) {
    // repeated fragments
    if (fragment.isIteration) {
      if (base === fragment.parent.keyRef) {
        model = fragment.getKey();
      } else if (base === fragment.parent.indexRef) {
        model = fragment.getIndex();
      }

      if (model && keys$$1.length) { badReference(base); }
    }

    // alias node or iteration
    if (!model && fragment.aliases && hasOwn(fragment.aliases, base)) {
      model = fragment.aliases[base];
    }

    // check fragment context to see if it has the key we need
    if (!model && fragment.context && fragment.context.has(base)) {
      model = fragment.context.joinKey(base);

      // this is an implicit mapping
      if (createMapping) {
        if (shouldWarn)
          { warnIfDebug(
            ("'" + ref + "' resolved but is ambiguous and will create a mapping to a parent component.")
          ); }
      } else if (shouldWarn && crossed) { warnIfDebug(("'" + ref + "' resolved but is ambiguous.")); }
    }

    if (model) {
      if (createMapping) {
        model = initialFragment.ractive.viewmodel.createLink(base, model, base, { implicit: true });
      }

      if (keys$$1.length > 0 && isFunction(model.joinAll)) {
        model = model.joinAll(keys$$1);
      }

      return model;
    }

    // don't consider alias blocks when checking for ambiguity
    if (fragment.context && !fragment.aliases) { crossed = 1; }

    if (
      (fragment.componentParent || (!fragment.parent && fragment.ractive.component)) &&
      !fragment.ractive.isolated
    ) {
      // ascend through component boundary
      fragment = fragment.componentParent || fragment.ractive.component.up;
      createMapping = true;
    } else {
      fragment = fragment.parent;
    }
  }

  // if enabled, check the instance for a match
  var instance = initialFragment.ractive;
  if (instance.resolveInstanceMembers && base !== 'data' && base in instance) {
    return instance.viewmodel
      .getRactiveModel()
      .joinKey(base)
      .joinAll(keys$$1);
  }

  if (shouldWarn) {
    warnIfDebug(("'" + ref + "' is ambiguous and did not resolve."));
  }

  // didn't find anything, so go ahead and create the key on the local model
  return context.joinKey(base).joinAll(keys$$1);
}

function up(fragment) {
  return fragment && ((!fragment.ractive.isolated && fragment.componentParent) || fragment.parent);
}

function findIter(start) {
  var fragment = start;
  var next;
  while (!fragment.isIteration && (next = up(fragment))) {
    fragment = next;
  }

  return fragment.isIteration && fragment;
}

function findMacro(start) {
  var fragment = start;
  while (fragment) {
    if (fragment.owner.handle) { return fragment.owner.handle; }
    fragment = up(fragment);
  }
}

function badReference(key) {
  throw new Error(("An index or key reference (" + key + ") cannot have child properties"));
}

var extern = {};

function getRactiveContext(ractive) {
  var assigns = [], len = arguments.length - 1;
  while ( len-- > 0 ) assigns[ len ] = arguments[ len + 1 ];

  var fragment =
    ractive.fragment ||
    ractive._fakeFragment ||
    (ractive._fakeFragment = new FakeFragment(ractive));
  return fragment.getContext.apply(fragment, assigns);
}

function getContext() {
  var assigns = [], len = arguments.length;
  while ( len-- ) assigns[ len ] = arguments[ len ];

  if (!this.ctx) { this.ctx = new extern.Context(this); }
  assigns.unshift(create(this.ctx));
  return assign.apply(null, assigns);
}

var FakeFragment = function FakeFragment(ractive) {
  this.ractive = ractive;
};

FakeFragment.prototype.findContext = function findContext () {
  return this.ractive.viewmodel;
};
var proto = FakeFragment.prototype;
proto.getContext = getContext;
proto.find = proto.findComponent = proto.findAll = proto.findAllComponents = noop;

function findParentWithContext(fragment) {
  var frag = fragment;
  while (frag && !frag.context) { frag = frag.parent; }
  if (!frag) { return fragment && fragment.ractive.fragment; }
  else { return frag; }
}

var keep = false;

function set(pairs, options) {
  var k = keep;

  var deep = options && options.deep;
  var shuffle = options && options.shuffle;
  var promise = runloop.start();
  if (options && 'keep' in options) { keep = options.keep; }

  var i = pairs.length;
  while (i--) {
    var model = pairs[i][0];
    var value = pairs[i][1];
    var keypath = pairs[i][2];

    if (!model) {
      runloop.end();
      throw new Error(("Failed to set invalid keypath '" + keypath + "'"));
    }

    if (deep) { deepSet(model, value); }
    else if (shuffle) {
      var array = value;
      var target = model.get();
      // shuffle target array with itself
      if (!array) { array = target; }

      // if there's not an array there yet, go ahead and set
      if (isUndefined(target)) {
        model.set(array);
      } else {
        if (!isArray(target) || !isArray(array)) {
          runloop.end();
          throw new Error('You cannot merge an array with a non-array');
        }

        var comparator = getComparator(shuffle);
        model.merge(array, comparator);
      }
    } else { model.set(value); }
  }

  runloop.end();

  keep = k;

  return promise;
}

var star = /\*/;
function gather(ractive, keypath, base, isolated) {
  if (!base && (keypath[0] === '.' || keypath[1] === '^')) {
    warnIfDebug(
      "Attempted to set a relative keypath from a non-relative context. You can use a context object to set relative keypaths."
    );
    return [];
  }

  var keys$$1 = splitKeypath(keypath);
  var model = base || ractive.viewmodel;

  if (star.test(keypath)) {
    return model.findMatches(keys$$1);
  } else {
    if (model === ractive.viewmodel) {
      // allow implicit mappings
      if (
        ractive.component &&
        !ractive.isolated &&
        !model.has(keys$$1[0]) &&
        keypath[0] !== '@' &&
        keypath[0] &&
        !isolated
      ) {
        return [resolveReference(ractive.fragment || new FakeFragment(ractive), keypath)];
      } else {
        return [model.joinAll(keys$$1)];
      }
    } else {
      return [model.joinAll(keys$$1)];
    }
  }
}

function build(ractive, keypath, value, isolated) {
  var sets = [];

  // set multiple keypaths in one go
  if (isObject(keypath)) {
    var loop = function ( k ) {
      if (hasOwn(keypath, k)) {
        sets.push.apply(sets, gather(ractive, k, null, isolated).map(function (m) { return [m, keypath[k], k]; }));
      }
    };

    for (var k in keypath) loop( k );
  } else {
    // set a single keypath
    sets.push.apply(sets, gather(ractive, keypath, null, isolated).map(function (m) { return [m, value, keypath]; }));
  }

  return sets;
}

var deepOpts = { virtual: false };
function deepSet(model, value) {
  var dest = model.get(false, deepOpts);

  // if dest doesn't exist, just set it
  if (dest == null || !isObjectType(value)) { return model.set(value); }
  if (!isObjectType(dest)) { return model.set(value); }

  for (var k in value) {
    if (hasOwn(value, k)) {
      deepSet(model.joinKey(k), value[k]);
    }
  }
}

var comparators = {};
function getComparator(option) {
  if (option === true) { return null; } // use existing arrays
  if (isFunction(option)) { return option; }

  if (isString(option)) {
    return comparators[option] || (comparators[option] = function (thing) { return thing[option]; });
  }

  throw new Error('If supplied, options.compare must be a string, function, or true'); // TODO link to docs
}

var errorMessage = 'Cannot add to a non-numeric value';

function add(ractive, keypath, d, options) {
  if (!isString(keypath) || !isNumeric(d)) {
    throw new Error('Bad arguments');
  }

  var sets = build(ractive, keypath, d, options && options.isolated);

  return set(
    sets.map(function (pair) {
      var model = pair[0];
      var add = pair[1];
      var value = model.get();
      if (!isNumeric(add) || !isNumeric(value)) { throw new Error(errorMessage); }
      return [model, value + add];
    })
  );
}

function Ractive$add(keypath, d, options) {
  var num = isNumber(d) ? d : 1;
  var opts = isObjectType(d) ? d : options;
  return add(this, keypath, num, opts);
}

function immediate(value) {
  var result = Promise.resolve(value);
  defineProperty(result, 'stop', { value: noop });
  return result;
}

var linear = easing.linear;

function getOptions(options, instance) {
  options = options || {};

  var easing$$1;
  if (options.easing) {
    easing$$1 = isFunction(options.easing) ? options.easing : instance.easing[options.easing];
  }

  return {
    easing: easing$$1 || linear,
    duration: 'duration' in options ? options.duration : 400,
    complete: options.complete || noop,
    step: options.step || noop,
    interpolator: options.interpolator
  };
}

function animate(ractive, model, to, options) {
  options = getOptions(options, ractive);
  var from = model.get();

  // don't bother animating values that stay the same
  if (isEqual(from, to)) {
    options.complete(options.to);
    return immediate(to);
  }

  var interpolator = interpolate(from, to, ractive, options.interpolator);

  // if we can't interpolate the value, set it immediately
  if (!interpolator) {
    runloop.start();
    model.set(to);
    runloop.end();

    return immediate(to);
  }

  return model.animate(from, to, options, interpolator);
}

function Ractive$animate(keypath, to, options) {
  if (isObjectType(keypath)) {
    var keys$$1 = keys(keypath);

    throw new Error(("ractive.animate(...) no longer supports objects. Instead of ractive.animate({\n  " + (keys$$1.map(function (key) { return ("'" + key + "': " + (keypath[key])); }).join('\n  ')) + "\n}, {...}), do\n\n" + (keys$$1.map(function (key) { return ("ractive.animate('" + key + "', " + (keypath[key]) + ", {...});"); }).join('\n')) + "\n"));
  }

  return animate(this, this.viewmodel.joinAll(splitKeypath(keypath)), to, options);
}

function enqueue(ractive, event) {
  if (ractive.event) {
    ractive._eventQueue.push(ractive.event);
  }

  ractive.event = event;
}

function dequeue(ractive) {
  if (ractive._eventQueue.length) {
    ractive.event = ractive._eventQueue.pop();
  } else {
    ractive.event = null;
  }
}

var initStars = {};
var bubbleStars = {};

// cartesian product of name parts and stars
// adjusted appropriately for special cases
function variants(name, initial) {
  var map = initial ? initStars : bubbleStars;
  if (map[name]) { return map[name]; }

  var parts = name.split('.');
  var result = [];
  var base = false;

  // initial events the implicit namespace of 'this'
  if (initial) {
    parts.unshift('this');
    base = true;
  }

  // use max - 1 bits as a bitmap to pick a part or a *
  // need to skip the full star case if the namespace is synthetic
  var max = Math.pow(2, parts.length) - (initial ? 1 : 0);
  for (var i = 0; i < max; i++) {
    var join = [];
    for (var j = 0; j < parts.length; j++) {
      join.push(1 & (i >> j) ? '*' : parts[j]);
    }
    result.unshift(join.join('.'));
  }

  if (base) {
    // include non-this-namespaced versions
    if (parts.length > 2) {
      result.push.apply(result, variants(name, false));
    } else {
      result.push('*');
      result.push(name);
    }
  }

  map[name] = result;
  return result;
}

function fireEvent(ractive, eventName, context, args) {
  if ( args === void 0 ) args = [];

  if (!eventName) {
    return;
  }

  context.name = eventName;
  args.unshift(context);

  var eventNames = ractive._nsSubs ? variants(eventName, true) : ['*', eventName];

  return fireEventAs(ractive, eventNames, context, args, true);
}

function fireEventAs(ractive, eventNames, context, args, initialFire) {
  if ( initialFire === void 0 ) initialFire = false;

  var bubble = true;

  if (initialFire || ractive._nsSubs) {
    enqueue(ractive, context);

    var i = eventNames.length;
    while (i--) {
      if (eventNames[i] in ractive._subs) {
        bubble = notifySubscribers(ractive, ractive._subs[eventNames[i]], context, args) && bubble;
      }
    }

    dequeue(ractive);
  }

  if (ractive.parent && bubble) {
    if (initialFire && ractive.component) {
      var fullName = ractive.component.name + '.' + eventNames[eventNames.length - 1];
      eventNames = variants(fullName, false);

      if (context && !context.component) {
        context.component = ractive;
      }
    }

    bubble = fireEventAs(ractive.parent, eventNames, context, args);
  }

  return bubble;
}

function notifySubscribers(ractive, subscribers, context, args) {
  var originalEvent = null;
  var stopEvent = false;

  // subscribers can be modified inflight, e.g. "once" functionality
  // so we need to copy to make sure everyone gets called
  subscribers = subscribers.slice();

  for (var i = 0, len = subscribers.length; i < len; i += 1) {
    if (!subscribers[i].off && subscribers[i].handler.apply(ractive, args) === false) {
      stopEvent = true;
    }
  }

  if (context && stopEvent && (originalEvent = context.event)) {
    originalEvent.preventDefault && originalEvent.preventDefault();
    originalEvent.stopPropagation && originalEvent.stopPropagation();
  }

  return !stopEvent;
}

var Hook = function Hook(event) {
  this.event = event;
  this.method = 'on' + event;
};

Hook.prototype.fire = function fire (ractive, arg) {
  var context = getRactiveContext(ractive);
  var method = this.method;

  if (ractive[method]) {
    arg ? ractive[method](context, arg) : ractive[method](context);
  }

  fireEvent(ractive, this.event, context, arg ? [arg, ractive] : [ractive]);
};

function getChildQueue(queue, ractive) {
  return queue[ractive._guid] || (queue[ractive._guid] = []);
}

function fire(hookQueue, ractive) {
  var childQueue = getChildQueue(hookQueue.queue, ractive);

  hookQueue.hook.fire(ractive);

  // queue is "live" because components can end up being
  // added while hooks fire on parents that modify data values.
  while (childQueue.length) {
    fire(hookQueue, childQueue.shift());
  }

  delete hookQueue.queue[ractive._guid];
}

var HookQueue = function HookQueue(event) {
  this.hook = new Hook(event);
  this.inProcess = {};
  this.queue = {};
};
var HookQueue__proto__ = HookQueue.prototype;

HookQueue__proto__.begin = function begin (ractive) {
  this.inProcess[ractive._guid] = true;
};

HookQueue__proto__.end = function end (ractive) {
  var parent = ractive.parent;

  // If this is *isn't* a child of a component that's in process,
  // it should call methods or fire at this point
  if (!parent || !this.inProcess[parent._guid]) {
    fire(this, ractive);
  } else {
    // elsewise, handoff to parent to fire when ready
    getChildQueue(this.queue, parent).push(ractive);
  }

  delete this.inProcess[ractive._guid];
};

var hooks = {};
[
  'construct',
  'config',
  'attachchild',
  'detach',
  'detachchild',
  'insert',
  'complete',
  'reset',
  'render',
  'unrendering',
  'unrender',
  'teardown',
  'destruct',
  'update'
].forEach(function (hook) {
  hooks[hook] = new Hook(hook);
});
hooks.init = new HookQueue('init');

function findAnchors(fragment, name) {
  if ( name === void 0 ) name = null;

  var res = [];

  findAnchorsIn(fragment, name, res);

  return res;
}

function findAnchorsIn(item, name, result) {
  if (item.isAnchor) {
    if (!name || item.name === name) {
      result.push(item);
    }
  } else if (item.items) {
    item.items.forEach(function (i) { return findAnchorsIn(i, name, result); });
  } else if (item.iterations) {
    item.iterations.forEach(function (i) { return findAnchorsIn(i, name, result); });
  } else if (item.fragment && !item.component) {
    findAnchorsIn(item.fragment, name, result);
  }
}

function updateAnchors(instance, name) {
  if ( name === void 0 ) name = null;

  var anchors = findAnchors(instance.fragment, name);
  var idxs = {};
  var children = instance._children.byName;

  anchors.forEach(function (a) {
    var name = a.name;
    if (!(name in idxs)) { idxs[name] = 0; }
    var idx = idxs[name];
    var child = (children[name] || [])[idx];

    if (child && child.lastBound !== a) {
      if (child.lastBound) { child.lastBound.removeChild(child); }
      a.addChild(child);
    }

    idxs[name]++;
  });
}

function unrenderChild(meta) {
  if (meta.instance.fragment.rendered) {
    meta.shouldDestroy = true;
    meta.instance.unrender();
  }
  meta.instance.el = null;
}

function attachChild(child, options) {
  if ( options === void 0 ) options = {};

  var children = this._children;
  var idx;

  if (child.parent && child.parent !== this)
    { throw new Error(
      ("Instance " + (child._guid) + " is already attached to a different instance " + (child.parent._guid) + ". Please detach it from the other instance using detachChild first.")
    ); }
  else if (child.parent)
    { throw new Error(("Instance " + (child._guid) + " is already attached to this instance.")); }

  var meta = {
    instance: child,
    ractive: this,
    name: options.name || child.constructor.name || 'Ractive',
    target: options.target || false,
    bubble: bubble,
    findNextNode: findNextNode
  };
  meta.nameOption = options.name;

  // child is managing itself
  if (!meta.target) {
    meta.up = this.fragment;
    meta.external = true;
  } else {
    var list;
    if (!(list = children.byName[meta.target])) {
      list = [];
      this.set(("@this.children.byName." + (meta.target)), list);
    }
    idx = options.prepend ? 0 : options.insertAt !== undefined ? options.insertAt : list.length;
  }

  child.parent = this;
  child.root = this.root;
  child.component = meta;
  children.push(meta);

  var promise = runloop.start();

  var rm = child.viewmodel.getRactiveModel();
  rm.joinKey('parent', { lastLink: false }).link(this.viewmodel.getRactiveModel());
  rm.joinKey('root', { lastLink: false }).link(this.root.viewmodel.getRactiveModel());

  hooks.attachchild.fire(child);

  if (meta.target) {
    unrenderChild(meta);
    this.splice(("@this.children.byName." + (meta.target)), idx, 0, meta);
    updateAnchors(this, meta.target);
  } else {
    if (!child.isolated) { child.viewmodel.attached(this.fragment); }
  }

  runloop.end();

  promise.ractive = child;
  return promise.then(function () { return child; });
}

function bubble() {
  runloop.addFragment(this.instance.fragment);
}

function findNextNode() {
  if (this.anchor) { return this.anchor.findNextNode(); }
}

function compute(path, computed) {
  this.computed[path] = computed;
  if (isString(computed) || isFunction(computed))
    { computed = this.computed[path] = { get: computed }; }

  var keys = splitKeypath(path);
  if (!~path.indexOf('*')) {
    var last = keys.pop();
    return this.viewmodel.joinAll(keys).compute(last, computed);
  } else {
    computed.pattern = new RegExp(
      '^' +
        keys
          .map(function (k) { return k.replace(/\*\*/g, '(.+)').replace(/\*/g, '((?:\\\\.|[^\\.])+)'); })
          .join('\\.') +
        '$'
    );
  }
}

function Ractive$compute(path, computed) {
  var promise = runloop.start();
  var comp = compute.call(this, path, computed);

  if (comp) {
    var keys = splitKeypath(path);
    if (keys.length === 1 && !comp.isReadonly) {
      comp.set(this.viewmodel.value[keys[0]]);
    }

    var first = keys.reduce(function (a, c) { return a && a.childByKey[c]; }, this.viewmodel);
    if (first) {
      first.rebind(comp, first, false);
      if (first.parent) { delete first.parent.childByKey[first.key]; }
      fireShuffleTasks();
    }
  }

  runloop.end();

  return promise;
}

function Ractive$detach() {
  if (this.isDetached) {
    return this.el;
  }

  if (this.el) {
    removeFromArray(this.el.__ractive_instances__, this);
  }

  this.el = this.fragment.detach();
  this.isDetached = true;

  hooks.detach.fire(this);
  return this.el;
}

function detachChild(child) {
  var children = this._children;
  var meta, index;

  var i = children.length;
  while (i--) {
    if (children[i].instance === child) {
      index = i;
      meta = children[i];
      break;
    }
  }

  if (!meta || child.parent !== this)
    { throw new Error(("Instance " + (child._guid) + " is not attached to this instance.")); }

  var promise = runloop.start();

  if (meta.anchor) { meta.anchor.removeChild(meta); }
  if (!child.isolated) { child.viewmodel.detached(); }

  children.splice(index, 1);
  if (meta.target) {
    this.splice(
      ("@this.children.byName." + (meta.target)),
      children.byName[meta.target].indexOf(meta),
      1
    );
    updateAnchors(this, meta.target);
  }
  var rm = child.viewmodel.getRactiveModel();
  rm.joinKey('parent', { lastLink: false }).unlink();
  rm.joinKey('root', { lastLink: false }).link(rm);
  child.root = child;
  child.parent = null;
  child.component = null;

  hooks.detachchild.fire(child);

  runloop.end();

  promise.ractive = child;
  return promise.then(function () { return child; });
}

function Ractive$find(selector, options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  if (!this.rendered)
    { throw new Error(
      ("Cannot call ractive.find('" + selector + "') unless instance is rendered to the DOM")
    ); }

  var node = this.fragment.find(selector, options);
  if (node) { return node; }

  if (options.remote) {
    for (var i = 0; i < this._children.length; i++) {
      if (!this$1._children[i].instance.fragment.rendered) { continue; }
      node = this$1._children[i].instance.find(selector, options);
      if (node) { return node; }
    }
  }
}

function Ractive$findAll(selector, options) {
  if ( options === void 0 ) options = {};

  if (!this.rendered)
    { throw new Error(
      ("Cannot call ractive.findAll('" + selector + "', ...) unless instance is rendered to the DOM")
    ); }

  if (!isArray(options.result)) { options.result = []; }

  this.fragment.findAll(selector, options);

  if (options.remote) {
    // seach non-fragment children
    this._children.forEach(function (c) {
      if (!c.target && c.instance.fragment && c.instance.fragment.rendered) {
        c.instance.findAll(selector, options);
      }
    });
  }

  return options.result;
}

function Ractive$findAllComponents(selector, options) {
  if (!options && isObjectType(selector)) {
    options = selector;
    selector = '';
  }

  options = options || {};

  if (!isArray(options.result)) { options.result = []; }

  this.fragment.findAllComponents(selector, options);

  if (options.remote) {
    // search non-fragment children
    this._children.forEach(function (c) {
      if (!c.target && c.instance.fragment && c.instance.fragment.rendered) {
        if (!selector || c.name === selector) {
          options.result.push(c.instance);
        }

        c.instance.findAllComponents(selector, options);
      }
    });
  }

  return options.result;
}

function Ractive$findComponent(selector, options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  if (isObjectType(selector)) {
    options = selector;
    selector = '';
  }

  var child = this.fragment.findComponent(selector, options);
  if (child) { return child; }

  if (options.remote) {
    if (!selector && this._children.length) { return this._children[0].instance; }
    for (var i = 0; i < this._children.length; i++) {
      // skip children that are or should be in an anchor
      if (this$1._children[i].target) { continue; }
      if (this$1._children[i].name === selector) { return this$1._children[i].instance; }
      child = this$1._children[i].instance.findComponent(selector, options);
      if (child) { return child; }
    }
  }
}

function Ractive$findContainer(selector) {
  if (this.container) {
    if (this.container.component && this.container.component.name === selector) {
      return this.container;
    } else {
      return this.container.findContainer(selector);
    }
  }

  return null;
}

function Ractive$findParent(selector) {
  if (this.parent) {
    if (this.parent.component && this.parent.component.name === selector) {
      return this.parent;
    } else {
      return this.parent.findParent(selector);
    }
  }

  return null;
}

function findElement(start, orComponent, name) {
  if ( orComponent === void 0 ) orComponent = true;

  while (
    start &&
    (start.type !== ELEMENT || (name && start.name !== name)) &&
    (!orComponent || (start.type !== COMPONENT && start.type !== ANCHOR))
  ) {
    // start is a fragment - look at the owner
    if (start.owner) { start = start.owner; }
    else if (start.component || start.yield)
      // start is a component or yielder - look at the container
      { start = start.containerFragment || start.component.up; }
    else if (start.parent)
      // start is an item - look at the parent
      { start = start.parent; }
    else if (start.up)
      // start is an item without a parent - look at the parent fragment
      { start = start.up; }
    else { start = undefined; }
  }

  return start;
}

// This function takes an array, the name of a mutator method, and the
// arguments to call that mutator method with, and returns an array that
// maps the old indices to their new indices.

// So if you had something like this...
//
//     array = [ 'a', 'b', 'c', 'd' ];
//     array.push( 'e' );
//
// ...you'd get `[ 0, 1, 2, 3 ]` - in other words, none of the old indices
// have changed. If you then did this...
//
//     array.unshift( 'z' );
//
// ...the indices would be `[ 1, 2, 3, 4, 5 ]` - every item has been moved
// one higher to make room for the 'z'. If you removed an item, the new index
// would be -1...
//
//     array.splice( 2, 2 );
//
// ...this would result in [ 0, 1, -1, -1, 2, 3 ].
//
// This information is used to enable fast, non-destructive shuffling of list
// sections when you do e.g. `ractive.splice( 'items', 2, 2 );

function getNewIndices(length, methodName, args) {
  var newIndices = [];

  var spliceArguments = getSpliceEquivalent(length, methodName, args);

  if (!spliceArguments) {
    return null; // TODO support reverse and sort?
  }

  var balance = spliceArguments.length - 2 - spliceArguments[1];

  var removeStart = Math.min(length, spliceArguments[0]);
  var removeEnd = removeStart + spliceArguments[1];
  newIndices.startIndex = removeStart;

  var i;
  for (i = 0; i < removeStart; i += 1) {
    newIndices.push(i);
  }

  for (; i < removeEnd; i += 1) {
    newIndices.push(-1);
  }

  for (; i < length; i += 1) {
    newIndices.push(i + balance);
  }

  // there is a net shift for the rest of the array starting with index + balance
  if (balance !== 0) {
    newIndices.touchedFrom = spliceArguments[0];
  } else {
    newIndices.touchedFrom = length;
  }

  return newIndices;
}

// The pop, push, shift an unshift methods can all be represented
// as an equivalent splice
function getSpliceEquivalent(length, methodName, args) {
  switch (methodName) {
    case 'splice':
      if (args[0] !== undefined && args[0] < 0) {
        args[0] = length + Math.max(args[0], -length);
      }

      if (isUndefined(args[0])) { args[0] = 0; }

      while (args.length < 2) {
        args.push(length - args[0]);
      }

      if (!isNumber(args[1])) {
        args[1] = length - args[0];
      }

      // ensure we only remove elements that exist
      args[1] = Math.min(args[1], length - args[0]);

      return args;

    case 'sort':
    case 'reverse':
      return null;

    case 'pop':
      if (length) {
        return [length - 1, 1];
      }
      return [0, 0];

    case 'push':
      return [length, 0].concat(args);

    case 'shift':
      return [0, length ? 1 : 0];

    case 'unshift':
      return [0, 0].concat(args);
  }
}

var arrayProto = Array.prototype;

function makeArrayMethod(methodName) {
  function path(keypath) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    return model(this.viewmodel.joinAll(splitKeypath(keypath)), args);
  }

  function model(mdl, args) {
    var array = mdl.get();

    if (!isArray(array)) {
      if (isUndefined(array)) {
        array = [];
        var result$1 = arrayProto[methodName].apply(array, args);
        var promise$1 = runloop.start().then(function () { return result$1; });
        mdl.set(array);
        runloop.end();
        return promise$1;
      } else {
        throw new Error(
          ("shuffle array method " + methodName + " called on non-array at " + (mdl.getKeypath()))
        );
      }
    }

    var newIndices = getNewIndices(array.length, methodName, args);
    var result = arrayProto[methodName].apply(array, args);

    var promise = runloop.start().then(function () { return result; });
    promise.result = result;

    if (newIndices) {
      if (mdl.shuffle) {
        mdl.shuffle(newIndices);
      } else {
        // it's a computation, which don't have a shuffle, so just invalidate
        mdl.mark();
      }
    } else {
      mdl.set(result);
    }

    runloop.end();

    return promise;
  }

  return { path: path, model: model };
}

function update$1(ractive, model, options) {
  // if the parent is wrapped, the adaptor will need to be updated before
  // updating on this keypath
  if (model.parent && model.parent.wrapper) {
    model.parent.adapt();
  }

  var promise = runloop.start();

  model.mark(options && options.force);

  // notify upstream of changes
  model.notifyUpstream();

  runloop.end();

  hooks.update.fire(ractive, model);

  return promise;
}

function Ractive$update(keypath, options) {
  var opts, path;

  if (isString(keypath)) {
    path = splitKeypath(keypath);
    opts = options;
  } else {
    opts = keypath;
  }

  return update$1(this, path ? this.viewmodel.joinAll(path) : this.viewmodel, opts);
}

var modelPush = makeArrayMethod('push').model;
var modelPop = makeArrayMethod('pop').model;
var modelShift = makeArrayMethod('shift').model;
var modelUnshift = makeArrayMethod('unshift').model;
var modelSort = makeArrayMethod('sort').model;
var modelSplice = makeArrayMethod('splice').model;
var modelReverse = makeArrayMethod('reverse').model;

var ContextData = (function (Model) {
  function ContextData(options) {
    Model.call(this, null, null);

    this.isRoot = true;
    this.root = this;
    this.value = {};
    this.ractive = options.ractive;
    this.adaptors = [];
    this.context = options.context;
  }

  if ( Model ) ContextData.__proto__ = Model;
  var ContextData__proto__ = ContextData.prototype = Object.create( Model && Model.prototype );
  ContextData__proto__.constructor = ContextData;

  ContextData__proto__.getKeypath = function getKeypath () {
    return '@context.data';
  };

  ContextData__proto__.rebound = function rebound () {};

  return ContextData;
}(Model));

var Context = function Context(fragment, element) {
  this.fragment = fragment;
  this.element = element || findElement(fragment);
  this.node = this.element && this.element.node;
  this.ractive = fragment.ractive;
  this.root = this;
};
var Context__proto__ = Context.prototype;

var prototypeAccessors = { decorators: {},_data: {} };

prototypeAccessors.decorators.get = function () {
  var items = {};
  if (!this.element) { return items; }
  this.element.decorators.forEach(function (d) { return (items[d.name] = d.handle); });
  return items;
};

prototypeAccessors._data.get = function () {
  return (
    this.model ||
    (this.root.model = new ContextData({
      ractive: this.ractive,
      context: this.root
    }))
  );
};

// the usual mutation suspects
Context__proto__.add = function add (keypath, d, options) {
  var num = isNumber(d) ? +d : 1;
  var opts = isObjectType(d) ? d : options;
  return set(
    build$1(this, keypath, num).map(function (pair) {
      var model = pair[0];
        var val = pair[1];
      var value = model.get();
      if (!isNumeric(val) || !isNumeric(value)) { throw new Error('Cannot add non-numeric value'); }
      return [model, value + val];
    }),
    opts
  );
};

Context__proto__.animate = function animate$1 (keypath, value, options) {
  var model = findModel(this, keypath).model;
  return animate(this.ractive, model, value, options);
};

Context__proto__.find = function find (selector) {
  return this.fragment.find(selector);
};

Context__proto__.findAll = function findAll (selector) {
  var result = [];
  this.fragment.findAll(selector, { result: result });
  return result;
};

Context__proto__.findAllComponents = function findAllComponents (selector) {
  var result = [];
  this.fragment.findAllComponents(selector, { result: result });
  return result;
};

Context__proto__.findComponent = function findComponent (selector) {
  return this.fragment.findComponent(selector);
};

// get relative keypaths and values
Context__proto__.get = function get (keypath) {
  if (!keypath) { return this.fragment.findContext().get(true); }

  var ref = findModel(this, keypath);
    var model = ref.model;

  return model ? model.get(true) : undefined;
};

Context__proto__.getParent = function getParent (component) {
  var fragment = this.fragment;

  if (!fragment.parent && component) { fragment = fragment.componentParent; }
  else {
    if (fragment.context) { fragment = findParentWithContext(fragment.parent); }
    else {
      fragment = findParentWithContext(fragment.parent);
      if (fragment) {
        if (!fragment.parent && component) { fragment = fragment.componentParent; }
        else { fragment = findParentWithContext(fragment.parent); }
      }
    }
  }

  if (!fragment || fragment === this.fragment) { return; }
  else { return fragment.getContext(); }
};

Context__proto__.hasListener = function hasListener (name, bubble) {
  // if the owner is a component, start there because the nearest element
  // may exist outside of the immediate context (yield)
  var el = this.fragment.owner.component
    ? this.fragment.owner
    : this.element || this.fragment.owner;
  var base;

  do {
    base = el.component || el;
    if (base.template.t === ELEMENT) {
      if (findEvent(base, name)) { return true; }
    }
    el = el.up && el.up.owner;
    if (el && el.component) { el = el.component; }
  } while (el && bubble);
};

Context__proto__.link = function link (source, dest) {
  var there = findModel(this, source).model;
  var here = findModel(this, dest).model;
  var promise = runloop.start();
  here.link(there, source);
  runloop.end();
  return promise;
};

Context__proto__.listen = function listen (event, handler) {
  var el = this.element;
  el.on(event, handler);
  return {
    cancel: function cancel() {
      el.off(event, handler);
    }
  };
};

Context__proto__.observe = function observe (keypath, callback, options) {
    if ( options === void 0 ) options = {};

  if (isObject(keypath)) { options = callback || {}; }
  options.fragment = this.fragment;
  return this.ractive.observe(keypath, callback, options);
};

Context__proto__.observeOnce = function observeOnce (keypath, callback, options) {
    if ( options === void 0 ) options = {};

  if (isObject(keypath)) { options = callback || {}; }
  options.fragment = this.fragment;
  return this.ractive.observeOnce(keypath, callback, options);
};

Context__proto__.pop = function pop (keypath) {
  return modelPop(findModel(this, keypath).model, []);
};

Context__proto__.push = function push (keypath) {
    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

  return modelPush(findModel(this, keypath).model, values);
};

Context__proto__.raise = function raise (name, event) {
    var args = [], len = arguments.length - 2;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

  var el = this.element;
  var ev;

  while (el) {
    if (el.component) { el = el.component; }
    ev = findEvent(el, name);
    if (ev) {
      return ev.fire(
        ev.element.getContext(
          event || {},
          event && !('original' in event) ? { original: {} } : {}
        ),
        args
      );
    }

    el = el.up && el.up.owner;
  }
};

Context__proto__.readLink = function readLink (keypath, options) {
  return this.ractive.readLink(this.resolve(keypath), options);
};

Context__proto__.resolve = function resolve (path, ractive) {
  var ref = findModel(this, path);
    var model = ref.model;
    var instance = ref.instance;
  return model ? model.getKeypath(ractive || instance) : path;
};

Context__proto__.reverse = function reverse (keypath) {
  return modelReverse(findModel(this, keypath).model, []);
};

Context__proto__.set = function set$2 (keypath, value, options) {
  return set(build$1(this, keypath, value), options);
};

Context__proto__.shift = function shift (keypath) {
  return modelShift(findModel(this, keypath).model, []);
};

Context__proto__.splice = function splice (keypath, index, drop) {
    var add = [], len = arguments.length - 3;
    while ( len-- > 0 ) add[ len ] = arguments[ len + 3 ];

  add.unshift(index, drop);
  return modelSplice(findModel(this, keypath).model, add);
};

Context__proto__.sort = function sort (keypath) {
  return modelSort(findModel(this, keypath).model, []);
};

Context__proto__.subtract = function subtract (keypath, d, options) {
  var num = isNumber(d) ? d : 1;
  var opts = isObjectType(d) ? d : options;
  return set(
    build$1(this, keypath, num).map(function (pair) {
      var model = pair[0];
        var val = pair[1];
      var value = model.get();
      if (!isNumeric(val) || !isNumeric(value)) { throw new Error('Cannot add non-numeric value'); }
      return [model, value - val];
    }),
    opts
  );
};

Context__proto__.toggle = function toggle (keypath, options) {
  var ref = findModel(this, keypath);
    var model = ref.model;
  return set([[model, !model.get()]], options);
};

Context__proto__.unlink = function unlink (dest) {
  var here = findModel(this, dest).model;
  var promise = runloop.start();
  if (here.owner && here.owner._link) { here.owner.unlink(); }
  runloop.end();
  return promise;
};

Context__proto__.unlisten = function unlisten (event, handler) {
  this.element.off(event, handler);
};

Context__proto__.unshift = function unshift (keypath) {
    var add = [], len = arguments.length - 1;
    while ( len-- > 0 ) add[ len ] = arguments[ len + 1 ];

  return modelUnshift(findModel(this, keypath).model, add);
};

Context__proto__.update = function update (keypath, options) {
  return update$1(this.ractive, findModel(this, keypath).model, options);
};

Context__proto__.updateModel = function updateModel (keypath, cascade) {
  var ref = findModel(this, keypath);
    var model = ref.model;
  var promise = runloop.start();
  model.updateFromBindings(cascade);
  runloop.end();
  return promise;
};

// two-way binding related helpers
Context__proto__.isBound = function isBound () {
  var ref = this.getBindingModel(this);
    var model = ref.model;
  return !!model;
};

Context__proto__.getBindingPath = function getBindingPath (ractive) {
  var ref = this.getBindingModel(this);
    var model = ref.model;
    var instance = ref.instance;
  if (model) { return model.getKeypath(ractive || instance); }
};

Context__proto__.getBinding = function getBinding () {
  var ref = this.getBindingModel(this);
    var model = ref.model;
  if (model) { return model.get(true); }
};

Context__proto__.getBindingModel = function getBindingModel (ctx) {
  var el = ctx.element;
  return { model: el.binding && el.binding.model, instance: el.up.ractive };
};

Context__proto__.setBinding = function setBinding (value) {
  var ref = this.getBindingModel(this);
    var model = ref.model;
  return set([[model, value]]);
};

Object.defineProperties( Context__proto__, prototypeAccessors );

Context.forRactive = getRactiveContext;
// circular deps are fun
extern.Context = Context;

// TODO: at some point perhaps this could support relative * keypaths?
function build$1(ctx, keypath, value) {
  var sets = [];

  // set multiple keypaths in one go
  if (isObject(keypath)) {
    for (var k in keypath) {
      if (hasOwn(keypath, k)) {
        sets.push([findModel(ctx, k).model, keypath[k]]);
      }
    }
  } else {
    // set a single keypath
    sets.push([findModel(ctx, keypath).model, value]);
  }

  return sets;
}

function findModel(ctx, path) {
  var frag = ctx.fragment;

  if (!isString(path)) {
    return { model: frag.findContext(), instance: path };
  }

  return { model: resolveReference(frag, path), instance: frag.ractive };
}

function findEvent(el, name) {
  return el.events && el.events.find && el.events.find(function (e) { return ~e.template.n.indexOf(name); });
}

function Ractive$fire(eventName) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var ctx;

  // watch for reproxy
  if (args[0] instanceof Context) {
    var proto = args.shift();
    ctx = create(proto);
    assign(ctx, proto);
  } else if (isObjectType(args[0]) && (args[0] === null || args[0].constructor === Object)) {
    ctx = Context.forRactive(this, args.shift());
  } else {
    ctx = Context.forRactive(this);
  }

  return fireEvent(this, eventName, ctx, args);
}

function Ractive$get(keypath, opts) {
  if (!isString(keypath)) { return this.viewmodel.get(true, keypath); }

  var keys = splitKeypath(keypath);
  var key = keys[0];

  var model;

  if (!this.viewmodel.has(key)) {
    // if this is an inline component, we may need to create
    // an implicit mapping
    if (this.component && !this.isolated) {
      model = resolveReference(this.fragment || new FakeFragment(this), key);
    }
  }

  model = this.viewmodel.joinAll(keys);
  return model.get(true, opts);
}

var query = doc && doc.querySelector;

function getContext$1(node) {
  if (isString(node) && query) {
    node = query.call(document, node);
  }

  var instances;
  if (node) {
    if (node._ractive) {
      return node._ractive.proxy.getContext();
    } else if ((instances = node.__ractive_instances__)) {
      if (instances.length === 1) { return getRactiveContext(instances[0]); }
    } else { return getContext$1(node.parentNode); }
  }
}

function getContext$2(node, options) {
  if (!node) { return getRactiveContext(this); }

  if (isString(node)) {
    node = this.find(node, options);
  }

  return getContext$1(node);
}

var html = 'http://www.w3.org/1999/xhtml';
var mathml = 'http://www.w3.org/1998/Math/MathML';
var svg$1 = 'http://www.w3.org/2000/svg';
var xlink = 'http://www.w3.org/1999/xlink';
var xml = 'http://www.w3.org/XML/1998/namespace';
var xmlns = 'http://www.w3.org/2000/xmlns';

var namespaces = { html: html, mathml: mathml, svg: svg$1, xlink: xlink, xml: xml, xmlns: xmlns };

var createElement;
var matches;
var div;
var methodNames;
var unprefixed;
var prefixed;
var i;
var j;
var makeFunction;

// Test for SVG support
if (!svg) {
  /* istanbul ignore next */
  createElement = function (type, ns, extend) {
    if (ns && ns !== html) {
      throw "This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://ractive.js.org/support/#svgs for more information";
    }

    return extend ? doc.createElement(type, extend) : doc.createElement(type);
  };
} else {
  createElement = function (type, ns, extend) {
    if (!ns || ns === html) {
      return extend ? doc.createElement(type, extend) : doc.createElement(type);
    }

    return extend ? doc.createElementNS(ns, type, extend) : doc.createElementNS(ns, type);
  };
}

function createDocumentFragment() {
  return doc.createDocumentFragment();
}

function getElement(input) {
  var output;

  if (!input || typeof input === 'boolean') {
    return;
  }

  /* istanbul ignore next */
  if (!win || !doc || !input) {
    return null;
  }

  // We already have a DOM node - no work to do. (Duck typing alert!)
  if (input.nodeType) {
    return input;
  }

  // Get node from string
  if (isString(input)) {
    // try ID first
    output = doc.getElementById(input);

    // then as selector, if possible
    if (!output && doc.querySelector) {
      try {
        output = doc.querySelector(input);
      } catch (e) {
        /* this space intentionally left blank */
      }
    }

    // did it work?
    if (output && output.nodeType) {
      return output;
    }
  }

  // If we've been given a collection (jQuery, Zepto etc), extract the first item
  if (input[0] && input[0].nodeType) {
    return input[0];
  }

  return null;
}

if (!isClient) {
  matches = null;
} else {
  div = createElement('div');
  methodNames = ['matches', 'matchesSelector'];

  makeFunction = function(methodName) {
    return function(node, selector) {
      return node[methodName](selector);
    };
  };

  i = methodNames.length;

  while (i-- && !matches) {
    unprefixed = methodNames[i];

    if (div[unprefixed]) {
      matches = makeFunction(unprefixed);
    } else {
      j = vendors.length;
      while (j--) {
        prefixed = vendors[i] + unprefixed.substr(0, 1).toUpperCase() + unprefixed.substring(1);

        if (div[prefixed]) {
          matches = makeFunction(prefixed);
          break;
        }
      }
    }
  }

  // IE8... and apparently phantom some?
  /* istanbul ignore next */
  if (!matches) {
    matches = function(node, selector) {
      var parentNode, i;

      parentNode = node.parentNode;

      if (!parentNode) {
        // empty dummy <div>
        div.innerHTML = '';

        parentNode = div;
        node = node.cloneNode();

        div.appendChild(node);
      }

      var nodes = parentNode.querySelectorAll(selector);

      i = nodes.length;
      while (i--) {
        if (nodes[i] === node) {
          return true;
        }
      }

      return false;
    };
  }
}

function detachNode(node) {
  // stupid ie
  // eslint-disable-next-line valid-typeof
  if (node && typeof node.parentNode !== 'unknown' && node.parentNode) {
    node.parentNode.removeChild(node);
  }

  return node;
}

function safeToStringValue(value) {
  return value == null || (isNumber(value) && isNaN(value)) || !value.toString ? '' : '' + value;
}

function safeAttributeString(string) {
  return safeToStringValue(string)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function Ractive$insert(target, anchor) {
  if (!this.fragment.rendered) {
    // TODO create, and link to, documentation explaining this
    throw new Error(
      'The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.'
    );
  }

  target = getElement(target);
  anchor = getElement(anchor) || null;

  if (!target) {
    throw new Error('You must specify a valid target to insert into');
  }

  target.insertBefore(this.detach(), anchor);
  this.el = target;

  (target.__ractive_instances__ || (target.__ractive_instances__ = [])).push(this);
  this.isDetached = false;

  fireInsertHook(this);
}

function fireInsertHook(ractive) {
  hooks.insert.fire(ractive);

  ractive.findAllComponents('*').forEach(function (child) {
    fireInsertHook(child.instance);
  });
}

function link(there, here, options) {
  var model;
  var target = (options && (options.ractive || options.instance)) || this;

  // may need to allow a mapping to resolve implicitly
  var sourcePath = splitKeypath(there);
  if (!target.viewmodel.has(sourcePath[0]) && target.component) {
    model = resolveReference(target.component.up, sourcePath[0]);
    model = model.joinAll(sourcePath.slice(1));
  }

  var src = model || target.viewmodel.joinAll(sourcePath);
  var dest = this.viewmodel.joinAll(splitKeypath(here), { lastLink: false });

  if (isUpstream(src, dest) || isUpstream(dest, src)) {
    throw new Error('A keypath cannot be linked to itself.');
  }

  var promise = runloop.start();

  dest.link(src, (options && options.keypath) || there);

  runloop.end();

  return promise;
}

function isUpstream(check, start) {
  var model = start;
  while (model) {
    if (model === check || model.owner === check) { return true; }
    model = model.target || model.parent;
  }
}

var Observer = function Observer(ractive, model, callback, options) {
  this.context = options.context || ractive;
  this.callback = callback;
  this.ractive = ractive;
  this.keypath = options.keypath;
  this.options = options;

  if (model) { this.resolved(model); }

  if (isFunction(options.old)) {
    this.oldContext = create(ractive);
    this.oldFn = options.old;
  }

  if (options.init !== false) {
    this.dirty = true;
    this.dispatch();
  } else {
    updateOld(this);
  }

  this.dirty = false;
};
var Observer__proto__ = Observer.prototype;

Observer__proto__.cancel = function cancel () {
  this.cancelled = true;
  if (this.model) {
    this.model.unregister(this);
  } else {
    this.resolver.unbind();
  }
  removeFromArray(this.ractive._observers, this);
};

Observer__proto__.dispatch = function dispatch () {
  if (!this.cancelled) {
    this.callback.call(this.context, this.newValue, this.oldValue, this.keypath);
    updateOld(this, true);
    this.dirty = false;
  }
};

Observer__proto__.handleChange = function handleChange () {
    var this$1 = this;

  if (!this.dirty) {
    var newValue = this.model.get();
    if (isEqual(newValue, this.oldValue)) { return; }

    this.newValue = newValue;

    if (this.options.strict && this.newValue === this.oldValue) { return; }

    runloop.addObserver(this, this.options.defer);
    this.dirty = true;

    if (this.options.once) { runloop.scheduleTask(function () { return this$1.cancel(); }); }
  } else {
    // make sure the newValue stays updated in case this observer gets touched multiple times in one loop
    this.newValue = this.model.get();
  }
};

Observer__proto__.rebind = function rebind (next, previous) {
    var this$1 = this;

  next = rebindMatch(this.keypath, next, previous);
  if (next === this.model) { return false; }

  if (this.model) { this.model.unregister(this); }
  if (next) { next.addShuffleTask(function () { return this$1.resolved(next); }); }
};

Observer__proto__.resolved = function resolved (model) {
  this.model = model;

  this.oldValue = undefined;
  this.newValue = model.get();

  model.register(this);
};

function updateOld(observer, fresh) {
  var next = fresh
    ? observer.model
      ? observer.model.get()
      : observer.newValue
    : observer.newValue;
  observer.oldValue = observer.oldFn
    ? observer.oldFn.call(observer.oldContext, undefined, next, observer.keypath)
    : next;
}

var star$1 = /\*+/g;

var PatternObserver = function PatternObserver(ractive, baseModel, keys$$1, callback, options) {
  var this$1 = this;

  this.context = options.context || ractive;
  this.ractive = ractive;
  this.baseModel = baseModel;
  this.keys = keys$$1;
  this.callback = callback;

  var pattern = keys$$1.join('\\.').replace(star$1, '(.+)');
  var baseKeypath = (this.baseKeypath = baseModel.getKeypath(ractive));
  this.pattern = new RegExp(("^" + (baseKeypath ? baseKeypath + '\\.' : '') + pattern + "$"));
  this.recursive = keys$$1.length === 1 && keys$$1[0] === '**';
  if (this.recursive) { this.keys = ['*']; }
  if (options.old) {
    this.oldContext = create(ractive);
    this.oldFn = options.old;
  }

  this.oldValues = {};
  this.newValues = {};

  this.defer = options.defer;
  this.once = options.once;
  this.strict = options.strict;

  this.dirty = false;
  this.changed = [];
  this.partial = false;
  this.links = options.links;

  var models = baseModel.findMatches(this.keys);

  models.forEach(function (model) {
    this$1.newValues[model.getKeypath(this$1.ractive)] = model.get();
  });

  if (options.init !== false) {
    this.dispatch();
  } else {
    updateOld$1(this, this.newValues);
  }

  baseModel.registerPatternObserver(this);
};
var PatternObserver__proto__ = PatternObserver.prototype;

PatternObserver__proto__.cancel = function cancel () {
  this.baseModel.unregisterPatternObserver(this);
  removeFromArray(this.ractive._observers, this);
};

PatternObserver__proto__.dispatch = function dispatch () {
    var this$1 = this;

  var newValues = this.newValues;
  this.newValues = {};
  keys(newValues).forEach(function (keypath) {
    var newValue = newValues[keypath];
    var oldValue = this$1.oldValues[keypath];

    if (this$1.strict && newValue === oldValue) { return; }
    if (isEqual(newValue, oldValue)) { return; }

    var args = [newValue, oldValue, keypath];
    if (keypath) {
      var wildcards = this$1.pattern.exec(keypath);
      if (wildcards) {
        args = args.concat(wildcards.slice(1));
      }
    }

    this$1.callback.apply(this$1.context, args);
  });

  updateOld$1(this, newValues, this.partial);

  this.dirty = false;
};

PatternObserver__proto__.notify = function notify (key) {
  this.changed.push(key);
};

PatternObserver__proto__.shuffle = function shuffle (newIndices) {
    var this$1 = this;

  if (!isArray(this.baseModel.value)) { return; }

  var max = this.baseModel.value.length;

  for (var i = 0; i < newIndices.length; i++) {
    if (newIndices[i] === -1 || newIndices[i] === i) { continue; }
    this$1.changed.push([i]);
  }

  for (var i$1 = newIndices.touchedFrom; i$1 < max; i$1++) {
    this$1.changed.push([i$1]);
  }
};

PatternObserver__proto__.handleChange = function handleChange () {
    var this$1 = this;

  if (!this.dirty || this.changed.length) {
    if (!this.dirty) { this.newValues = {}; }

    if (!this.changed.length) {
      this.baseModel.findMatches(this.keys).forEach(function (model) {
        var keypath = model.getKeypath(this$1.ractive);
        this$1.newValues[keypath] = model.get();
      });
      this.partial = false;
    } else {
      var count = 0;

      if (this.recursive) {
        this.changed.forEach(function (keys$$1) {
          var model = this$1.baseModel.joinAll(keys$$1);
          if (model.isLink && !this$1.links) { return; }
          count++;
          this$1.newValues[model.getKeypath(this$1.ractive)] = model.get();
        });
      } else {
        var ok = this.baseModel.isRoot
          ? this.changed.map(function (keys$$1) { return keys$$1.map(escapeKey).join('.'); })
          : this.changed.map(function (keys$$1) { return this$1.baseKeypath + '.' + keys$$1.map(escapeKey).join('.'); });

        this.baseModel.findMatches(this.keys).forEach(function (model) {
          var keypath = model.getKeypath(this$1.ractive);
          var check = function (k) {
            return (
              (k.indexOf(keypath) === 0 &&
                (k.length === keypath.length || k[keypath.length] === '.')) ||
              (keypath.indexOf(k) === 0 &&
                (k.length === keypath.length || keypath[k.length] === '.'))
            );
          };

          // is this model on a changed keypath?
          if (ok.filter(check).length) {
            count++;
            this$1.newValues[keypath] = model.get();
          }
        });
      }

      // no valid change triggered, so bail to avoid breakage
      if (!count) { return; }

      this.partial = true;
    }

    runloop.addObserver(this, this.defer);
    this.dirty = true;
    this.changed.length = 0;

    if (this.once) { this.cancel(); }
  }
};

function updateOld$1(observer, vals, partial) {
  var olds = observer.oldValues;

  if (observer.oldFn) {
    if (!partial) { observer.oldValues = {}; }

    keys(vals).forEach(function (k) {
      var args = [olds[k], vals[k], k];
      var parts = observer.pattern.exec(k);
      if (parts) {
        args.push.apply(args, parts.slice(1));
      }
      observer.oldValues[k] = observer.oldFn.apply(observer.oldContext, args);
    });
  } else {
    if (partial) {
      keys(vals).forEach(function (k) { return (olds[k] = vals[k]); });
    } else {
      observer.oldValues = vals;
    }
  }
}

function negativeOne() {
  return -1;
}

var ArrayObserver = function ArrayObserver(ractive, model, callback, options) {
  this.ractive = ractive;
  this.model = model;
  this.keypath = model.getKeypath();
  this.callback = callback;
  this.options = options;

  this.pending = null;

  model.register(this);

  if (options.init !== false) {
    this.sliced = [];
    this.shuffle([]);
    this.dispatch();
  } else {
    this.sliced = this.slice();
  }
};
var ArrayObserver__proto__ = ArrayObserver.prototype;

ArrayObserver__proto__.cancel = function cancel () {
  this.model.unregister(this);
  removeFromArray(this.ractive._observers, this);
};

ArrayObserver__proto__.dispatch = function dispatch () {
  this.callback(this.pending);
  this.pending = null;
  if (this.options.once) { this.cancel(); }
};

ArrayObserver__proto__.handleChange = function handleChange (path) {
  if (this.pending) {
    // post-shuffle
    runloop.addObserver(this, this.options.defer);
  } else if (!path) {
    // entire array changed
    this.shuffle(this.sliced.map(negativeOne));
    this.handleChange();
  }
};

ArrayObserver__proto__.shuffle = function shuffle (newIndices) {
    var this$1 = this;

  var newValue = this.slice();

  var inserted = [];
  var deleted = [];
  var start;

  var hadIndex = {};

  newIndices.forEach(function (newIndex, oldIndex) {
    hadIndex[newIndex] = true;

    if (newIndex !== oldIndex && isUndefined(start)) {
      start = oldIndex;
    }

    if (newIndex === -1) {
      deleted.push(this$1.sliced[oldIndex]);
    }
  });

  if (isUndefined(start)) { start = newIndices.length; }

  var len = newValue.length;
  for (var i = 0; i < len; i += 1) {
    if (!hadIndex[i]) { inserted.push(newValue[i]); }
  }

  this.pending = { inserted: inserted, deleted: deleted, start: start };
  this.sliced = newValue;
};

ArrayObserver__proto__.slice = function slice () {
  var value = this.model.get();
  return isArray(value) ? value.slice() : [];
};

function observe(keypath, callback, options) {
  var this$1 = this;

  var observers = [];
  var map;
  var opts;

  if (isObject(keypath)) {
    map = keypath;
    opts = callback || {};
  } else {
    if (isFunction(keypath)) {
      map = { '': keypath };
      opts = callback || {};
    } else {
      map = {};
      map[keypath] = callback;
      opts = options || {};
    }
  }

  var silent = false;
  keys(map).forEach(function (keypath) {
    var callback = map[keypath];
    var caller = function() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (silent) { return; }
      return callback.apply(this, args);
    };

    var keypaths = keypath.split(' ');
    if (keypaths.length > 1) { keypaths = keypaths.filter(function (k) { return k; }); }

    keypaths.forEach(function (keypath) {
      opts.keypath = keypath;
      var observer = createObserver(this$1, keypath, caller, opts);
      if (observer) { observers.push(observer); }
    });
  });

  // add observers to the Ractive instance, so they can be
  // cancelled on ractive.teardown()
  this._observers.push.apply(this._observers, observers);

  return {
    cancel: function () { return observers.forEach(function (o) { return o.cancel(); }); },
    isSilenced: function () { return silent; },
    silence: function () { return (silent = true); },
    resume: function () { return (silent = false); }
  };
}

function createObserver(ractive, keypath, callback, options) {
  var keys$$1 = splitKeypath(keypath);
  var wildcardIndex = keys$$1.indexOf('*');
  if (!~wildcardIndex) { wildcardIndex = keys$$1.indexOf('**'); }

  options.fragment = options.fragment || ractive.fragment;

  var model;
  if (!options.fragment) {
    model = ractive.viewmodel.joinKey(keys$$1[0]);
  } else {
    // .*.whatever relative wildcard is a special case because splitkeypath doesn't handle the leading .
    if (~keys$$1[0].indexOf('.*')) {
      model = options.fragment.findContext();
      wildcardIndex = 0;
      keys$$1[0] = keys$$1[0].slice(1);
    } else {
      model =
        wildcardIndex === 0
          ? options.fragment.findContext()
          : resolveReference(options.fragment, keys$$1[0]);
    }
  }

  // the model may not exist key
  if (!model) { model = ractive.viewmodel.joinKey(keys$$1[0]); }

  if (!~wildcardIndex) {
    model = model.joinAll(keys$$1.slice(1));
    if (options.array) {
      return new ArrayObserver(ractive, model, callback, options);
    } else {
      return new Observer(ractive, model, callback, options);
    }
  } else {
    var double = keys$$1.indexOf('**');
    if (~double) {
      if (double + 1 !== keys$$1.length || ~keys$$1.indexOf('*')) {
        warnOnceIfDebug(
          "Recursive observers may only specify a single '**' at the end of the path."
        );
        return;
      }
    }

    model = model.joinAll(keys$$1.slice(1, wildcardIndex));

    return new PatternObserver(ractive, model, keys$$1.slice(wildcardIndex), callback, options);
  }
}

var onceOptions = { init: false, once: true };

function observeOnce(keypath, callback, options) {
  if (isObject(keypath) || isFunction(keypath)) {
    options = assign(callback || {}, onceOptions);
    return this.observe(keypath, options);
  }

  options = assign(options || {}, onceOptions);
  return this.observe(keypath, callback, options);
}

var trim = function (str) { return str.trim(); };

var notEmptyString = function (str) { return str !== ''; };

function Ractive$off(eventName, callback) {
  var this$1 = this;

  // if no event is specified, remove _all_ event listeners
  if (!eventName) {
    this._subs = {};
  } else {
    // Handle multiple space-separated event names
    var eventNames = eventName
      .split(' ')
      .map(trim)
      .filter(notEmptyString);

    eventNames.forEach(function (event) {
      var subs = this$1._subs[event];
      // if given a specific callback to remove, remove only it
      if (subs && callback) {
        var entry = subs.find(function (s) { return s.callback === callback; });
        if (entry) {
          removeFromArray(subs, entry);
          entry.off = true;

          if (event.indexOf('.')) { this$1._nsSubs--; }
        }
      } else if (subs) {
        // otherwise, remove all listeners for this event
        if (event.indexOf('.')) { this$1._nsSubs -= subs.length; }
        subs.length = 0;
      }
    });
  }

  return this;
}

function Ractive$on(eventName, callback) {
  var this$1 = this;

  // eventName may already be a map
  var map = isObjectType(eventName) ? eventName : {};
  // or it may be a string along with a callback
  if (isString(eventName)) { map[eventName] = callback; }

  var silent = false;
  var events = [];

  var loop = function ( k ) {
    var callback$1 = map[k];
    var caller = function() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (!silent) { return callback$1.apply(this, args); }
    };
    var entry = {
      callback: callback$1,
      handler: caller
    };

    if (hasOwn(map, k)) {
      var names = k
        .split(' ')
        .map(trim)
        .filter(notEmptyString);
      names.forEach(function (n) {
        (this$1._subs[n] || (this$1._subs[n] = [])).push(entry);
        if (n.indexOf('.')) { this$1._nsSubs++; }
        events.push([n, entry]);
      });
    }
  };

  for (var k in map) loop( k );

  return {
    cancel: function () { return events.forEach(function (e) { return this$1.off(e[0], e[1].callback); }); },
    isSilenced: function () { return silent; },
    silence: function () { return (silent = true); },
    resume: function () { return (silent = false); }
  };
}

function Ractive$once(eventName, handler) {
  var listener = this.on(eventName, function() {
    handler.apply(this, arguments);
    listener.cancel();
  });

  // so we can still do listener.cancel() manually
  return listener;
}

var pop = makeArrayMethod('pop').path;

var push = makeArrayMethod('push').path;

function readLink(keypath, options) {
  if ( options === void 0 ) options = {};

  var path = splitKeypath(keypath);

  if (this.viewmodel.has(path[0])) {
    var model = this.viewmodel.joinAll(path);

    if (!model.isLink) { return; }

    while ((model = model.target) && options.canonical !== false) {
      if (!model.isLink) { break; }
    }

    if (model) { return { ractive: model.root.ractive, keypath: model.getKeypath() }; }
  }
}

var PREFIX = '/* Ractive.js component styles */';

// Holds current definitions of styles.
var styleDefinitions = [];

// Flag to tell if we need to update the CSS
var isDirty = false;

// These only make sense on the browser. See additional setup below.
var styleElement = null;
var useCssText = null;

function addCSS(styleDefinition) {
  styleDefinitions.push(styleDefinition);
  isDirty = true;
}

function applyCSS(force) {
  var styleElement = style();

  // Apply only seems to make sense when we're in the DOM. Server-side renders
  // can call toCSS to get the updated CSS.
  if (!styleElement || (!force && !isDirty)) { return; }

  if (useCssText) {
    styleElement.styleSheet.cssText = getCSS(null);
  } else {
    styleElement.innerHTML = getCSS(null);
  }

  isDirty = false;
}

function getCSS(cssIds) {
  var filteredStyleDefinitions = cssIds
    ? styleDefinitions.filter(function (style) { return ~cssIds.indexOf(style.id); })
    : styleDefinitions;

  filteredStyleDefinitions.forEach(function (d) { return (d.applied = true); });

  return filteredStyleDefinitions.reduce(
    function (styles, style) { return ("" + (styles ? (styles + "\n\n/* {" + (style.id) + "} */\n" + (style.styles)) : '')); },
    PREFIX
  );
}

function style() {
  // If we're on the browser, additional setup needed.
  if (doc && !styleElement) {
    styleElement = doc.createElement('style');
    styleElement.type = 'text/css';
    styleElement.setAttribute('data-ractive-css', '');

    doc.getElementsByTagName('head')[0].appendChild(styleElement);

    useCssText = !!styleElement.styleSheet;
  }

  return styleElement;
}

var adaptConfigurator = {
  extend: function (Parent, proto, options) {
    proto.adapt = combine(proto.adapt, ensureArray(options.adapt));
  },

  init: function init() {}
};

var remove = /\/\*(?:[\s\S]*?)\*\//g;
var escape = /url\(\s*(['"])(?:\\[\s\S]|(?!\1).)*\1\s*\)|url\((?:\\[\s\S]|[^)])*\)|(['"])(?:\\[\s\S]|(?!\2).)*\2/gi;
var value = /\0(\d+)/g;

// Removes comments and strings from the given CSS to make it easier to parse.
// Callback receives the cleaned CSS and a function which can be used to put
// the removed strings back in place after parsing is done.
function cleanCss(css, callback, additionalReplaceRules) {
  if ( additionalReplaceRules === void 0 ) additionalReplaceRules = [];

  var values = [];
  var reconstruct = function (css) { return css.replace(value, function (match, n) { return values[n]; }); };
  css = css.replace(escape, function (match) { return ("\u0000" + (values.push(match) - 1)); }).replace(remove, '');

  additionalReplaceRules.forEach(function (pattern) {
    css = css.replace(pattern, function (match) { return ("\u0000" + (values.push(match) - 1)); });
  });

  return callback(css, reconstruct);
}

var selectorsPattern = /(?:^|\}|\{|\x01)\s*([^\{\}\0\x01]+)\s*(?=\{)/g;
var importPattern = /@import\s*\([^)]*\)\s*;?/gi;
var importEndPattern = /\x01/g;
var keyframesDeclarationPattern = /@keyframes\s+[^\{\}]+\s*\{(?:[^{}]+|\{[^{}]+})*}/gi;
var selectorUnitPattern = /((?:(?:\[[^\]]+\])|(?:[^\s\+\>~:]))+)((?:::?[^\s\+\>\~\(:]+(?:\([^\)]+\))?)*\s*[\s\+\>\~]?)\s*/g;
var excludePattern = /^(?:@|\d+%)/;
var dataRvcGuidPattern = /\[data-ractive-css~="\{[a-z0-9-]+\}"]/g;

function trim$1(str) {
  return str.trim();
}

function extractString(unit) {
  return unit.str;
}

function transformSelector(selector, parent) {
  var selectorUnits = [];
  var match;

  while ((match = selectorUnitPattern.exec(selector))) {
    selectorUnits.push({
      str: match[0],
      base: match[1],
      modifiers: match[2]
    });
  }

  // For each simple selector within the selector, we need to create a version
  // that a) combines with the id, and b) is inside the id
  var base = selectorUnits.map(extractString);

  var transformed = [];
  var i = selectorUnits.length;

  while (i--) {
    var appended = base.slice();

    // Pseudo-selectors should go after the attribute selector
    var unit = selectorUnits[i];
    appended[i] = unit.base + parent + unit.modifiers || '';

    var prepended = base.slice();
    prepended[i] = parent + ' ' + prepended[i];

    transformed.push(appended.join(' '), prepended.join(' '));
  }

  return transformed.join(', ');
}

function transformCss(css, id) {
  var dataAttr = "[data-ractive-css~=\"{" + id + "}\"]";

  var transformed;

  if (dataRvcGuidPattern.test(css)) {
    transformed = css.replace(dataRvcGuidPattern, dataAttr);
  } else {
    transformed = cleanCss(
      css,
      function (css, reconstruct) {
        css = css
          .replace(importPattern, '$&\x01')
          .replace(selectorsPattern, function (match, $1) {
            // don't transform at-rules and keyframe declarations
            if (excludePattern.test($1)) { return match; }

            var selectors = $1.split(',').map(trim$1);
            var transformed =
              selectors.map(function (selector) { return transformSelector(selector, dataAttr); }).join(', ') + ' ';

            return match.replace($1, transformed);
          })
          .replace(importEndPattern, '');

        return reconstruct(css);
      },
      [keyframesDeclarationPattern]
    );
  }

  return transformed;
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function uuid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function setCSSData(keypath, value, options) {
  var opts = isObjectType(keypath) ? value : options;
  var model = this._cssModel;

  model.locked = true;
  var promise = set(build({ viewmodel: model }, keypath, value, true), opts);
  model.locked = false;

  var cascade = runloop.start();
  this.extensions.forEach(function (e) {
    var model = e._cssModel;
    model.mark();
    model.downstreamChanged('', 1);
  });
  runloop.end();

  applyChanges(this, !opts || opts.apply !== false);

  return promise.then(function () { return cascade; });
}

function applyChanges(component, apply) {
  var local = recomputeCSS(component);
  var child = component.extensions
    .map(function (e) { return applyChanges(e, false); })
    .reduce(function (a, c) { return c || a; }, false);

  if (apply && (local || child)) {
    var def = component._cssDef;
    if (!def || (def && def.applied)) { applyCSS(true); }
  }

  return local || child;
}

function recomputeCSS(component) {
  var css = component.css;

  if (!isFunction(css)) { return; }

  var def = component._cssDef;
  var result = evalCSS(component, css);
  var styles = def.transform ? transformCss(result, def.id) : result;

  if (def.styles === styles) { return; }

  def.styles = styles;

  return true;
}

var CSSModel = (function (SharedModel) {
  function CSSModel(component) {
    SharedModel.call(this, component.cssData, '@style');
    this.component = component;
  }

  if ( SharedModel ) CSSModel.__proto__ = SharedModel;
  var CSSModel__proto__ = CSSModel.prototype = Object.create( SharedModel && SharedModel.prototype );
  CSSModel__proto__.constructor = CSSModel;

  CSSModel__proto__.downstreamChanged = function downstreamChanged (path, depth) {
    if (this.locked) { return; }

    var component = this.component;

    component.extensions.forEach(function (e) {
      var model = e._cssModel;
      model.mark();
      model.downstreamChanged(path, depth || 1);
    });

    if (!depth) {
      applyChanges(component, true);
    }
  };

  return CSSModel;
}(SharedModel));

var hasCurly = /\{/;
var cssConfigurator = {
  name: 'css',

  // Called when creating a new component definition
  extend: function (Parent, proto, options, Child) {
    Child._cssIds = gatherIds(Parent);

    defineProperty(Child, 'cssData', {
      configurable: true,
      value: assign(create(Parent.cssData), options.cssData || {})
    });

    defineProperty(Child, '_cssModel', {
      configurable: true,
      value: new CSSModel(Child)
    });

    if (options.css) { initCSS(options, Child, proto); }
  },

  // Called when creating a new component instance
  init: function (Parent, target, options) {
    if (!options.css) { return; }

    warnIfDebug("\nThe css option is currently not supported on a per-instance basis and will be discarded. Instead, we recommend instantiating from a component definition with a css option.\n\nconst Component = Ractive.extend({\n\t...\n\tcss: '/* your css */',\n\t...\n});\n\nconst componentInstance = new Component({ ... })\n\t\t");
  }
};

function gatherIds(start) {
  var cmp = start;
  var ids = [];

  while (cmp) {
    if (cmp.prototype.cssId) { ids.push(cmp.prototype.cssId); }
    cmp = cmp.Parent;
  }

  return ids;
}

function evalCSS(component, css) {
  if (isString(css)) { return css; }

  var cssData = component.cssData;
  var model = component._cssModel;
  var data = function data(path) {
    return model.joinAll(splitKeypath(path)).get();
  };
  data.__proto__ = cssData;

  var result = css.call(component, data);
  return isString(result) ? result : '';
}

function initCSS(options, target, proto) {
  var css =
    options.css === true
      ? ''
      : isString(options.css) && !hasCurly.test(options.css)
      ? getElement(options.css) || options.css
      : options.css;
  var cssProp = css;

  var id = options.cssId || uuid();

  if (isObjectType(css)) {
    css = 'textContent' in css ? css.textContent : css.innerHTML;
    cssProp = css;
  } else if (isFunction(css)) {
    cssProp = css;
    css = evalCSS(target, css);
  }

  var def = {
    transform: 'noCSSTransform' in options ? !options.noCSSTransform : !options.noCssTransform
  };

  defineProperty(target, '_cssDef', { configurable: true, value: def });

  defineProperty(target, 'css', {
    get: function get() {
      return cssProp;
    },
    set: function set(next) {
      cssProp = next;
      var css = evalCSS(target, cssProp);
      var styles = def.styles;
      def.styles = def.transform ? transformCss(css, id) : css;
      if (def.applied && styles !== def.styles) { applyCSS(true); }
    }
  });

  def.styles = def.transform ? transformCss(css, id) : css;
  def.id = proto.cssId = id;
  target._cssIds.push(id);

  addCSS(target._cssDef);
}

function validate(data) {
  // Warn if userOptions.data is a non-POJO
  if (data && data.constructor !== Object) {
    if (isFunction(data)) {
      // TODO do we need to support this in the new Ractive() case?
    } else if (!isObjectType(data)) {
      fatal(("data option must be an object or a function, `" + data + "` is not valid"));
    } else {
      warnIfDebug(
        'If supplied, options.data should be a plain JavaScript object - using a non-POJO as the root object may work, but is discouraged'
      );
    }
  }
}

var dataConfigurator = {
  name: 'data',

  extend: function (Parent, proto, options) {
    var key;
    var value;

    // check for non-primitives, which could cause mutation-related bugs
    if (options.data && isObject(options.data)) {
      for (key in options.data) {
        value = options.data[key];

        if (value && isObjectType(value)) {
          if (isObject(value) || isArray(value)) {
            warnIfDebug("Passing a `data` option with object and array properties to Ractive.extend() is discouraged, as mutating them is likely to cause bugs. Consider using a data function instead:\n\n  // this...\n  data: function () {\n    return {\n      myObject: {}\n    };\n  })\n\n  // instead of this:\n  data: {\n    myObject: {}\n  }");
          }
        }
      }
    }

    proto.data = combine$1(proto.data, options.data);
  },

  init: function (Parent, ractive, options) {
    var result = combine$1(Parent.prototype.data, options.data);

    if (isFunction(result)) { result = result.call(ractive); }

    // bind functions to the ractive instance at the top level,
    // unless it's a non-POJO (in which case alarm bells should ring)
    if (result && result.constructor === Object) {
      for (var prop in result) {
        if (isFunction(result[prop])) {
          var value = result[prop];
          result[prop] = bind(value, ractive);
          result[prop]._r_unbound = value;
        }
      }
    }

    return result || {};
  },

  reset: function reset(ractive) {
    var result = this.init(ractive.constructor, ractive, ractive.viewmodel);
    ractive.viewmodel.root.set(result);
    return true;
  }
};

function emptyData() {
  return {};
}

function combine$1(parentValue, childValue) {
  validate(childValue);

  var parentIsFn = isFunction(parentValue);

  // Very important, otherwise child instance can become
  // the default data object on Ractive or a component.
  // then ractive.set() ends up setting on the prototype!
  if (!childValue && !parentIsFn) {
    // this needs to be a function so that it can still inherit parent defaults
    childValue = emptyData;
  }

  var childIsFn = isFunction(childValue);

  // Fast path, where we just need to copy properties from
  // parent to child
  if (!parentIsFn && !childIsFn) {
    return fromProperties(childValue, parentValue);
  }

  return function() {
    var child = childIsFn ? callDataFunction(childValue, this) : childValue;
    var parent = parentIsFn ? callDataFunction(parentValue, this) : parentValue;

    return fromProperties(child, parent);
  };
}

function callDataFunction(fn, context) {
  var data = fn.call(context);

  if (!data) { return; }

  if (!isObjectType(data)) {
    fatal('Data function must return an object');
  }

  if (data.constructor !== Object) {
    warnOnceIfDebug(
      'Data function returned something other than a plain JavaScript object. This might work, but is strongly discouraged'
    );
  }

  return data;
}

function fromProperties(primary, secondary) {
  if (primary && secondary) {
    for (var key in secondary) {
      if (!(key in primary)) {
        primary[key] = secondary[key];
      }
    }

    return primary;
  }

  return primary || secondary;
}

var templateConfigurator = {
  name: 'template',

  extend: function extend(Parent, proto, options) {
    // only assign if exists
    if ('template' in options) {
      var template = options.template;

      if (isFunction(template)) {
        proto.template = template;
      } else {
        proto.template = parseTemplate(template, proto);
      }
    }
  },

  init: function init(Parent, ractive, options) {
    // TODO because of prototypal inheritance, we might just be able to use
    // ractive.template, and not bother passing through the Parent object.
    // At present that breaks the test mocks' expectations
    var template = 'template' in options ? options.template : Parent.prototype.template;
    template = template || { v: TEMPLATE_VERSION, t: [] };

    if (isFunction(template)) {
      var fn = template;
      template = getDynamicTemplate(ractive, fn);

      ractive._config.template = {
        fn: fn,
        result: template
      };
    }

    template = parseTemplate(template, ractive);

    // TODO the naming of this is confusing - ractive.template refers to [...],
    // but Component.prototype.template refers to {v:1,t:[],p:[]}...
    // it's unnecessary, because the developer never needs to access
    // ractive.template
    ractive.template = template.t;

    if (template.p) {
      extendPartials(ractive.partials, template.p);
    }
  },

  reset: function reset(ractive) {
    var result = resetValue(ractive);

    if (result) {
      var parsed = parseTemplate(result, ractive);

      ractive.template = parsed.t;
      extendPartials(ractive.partials, parsed.p, true);

      return true;
    }
  }
};

function resetValue(ractive) {
  var initial = ractive._config.template;

  // If this isn't a dynamic template, there's nothing to do
  if (!initial || !initial.fn) {
    return;
  }

  var result = getDynamicTemplate(ractive, initial.fn);

  // TODO deep equality check to prevent unnecessary re-rendering
  // in the case of already-parsed templates
  if (result !== initial.result) {
    initial.result = result;
    return result;
  }
}

function getDynamicTemplate(ractive, fn) {
  return fn.call(ractive, {
    fromId: parser.fromId,
    isParsed: parser.isParsed,
    parse: function parse(template, options) {
      if ( options === void 0 ) options = parser.getParseOptions(ractive);

      return parser.parse(template, options);
    }
  });
}

function parseTemplate(template, ractive) {
  if (isString(template)) {
    // parse will validate and add expression functions
    template = parseAsString(template, ractive);
  } else {
    // need to validate and add exp for already parsed template
    validate$1(template);
    addFunctions(template);
  }

  return template;
}

function parseAsString(template, ractive) {
  // ID of an element containing the template?
  if (template[0] === '#') {
    template = parser.fromId(template);
  }

  return parser.parseFor(template, ractive);
}

function validate$1(template) {
  // Check that the template even exists
  if (template == undefined) {
    throw new Error(("The template cannot be " + template + "."));
  } else if (!isNumber(template.v)) {
    // Check the parsed template has a version at all
    throw new Error(
      "The template parser was passed a non-string template, but the template doesn't have a version.  Make sure you're passing in the template you think you are."
    );
  } else if (template.v !== TEMPLATE_VERSION) {
    // Check we're using the correct version
    throw new Error(
      ("Mismatched template version (expected " + TEMPLATE_VERSION + ", got " + (template.v) + ") Please ensure you are using the latest version of Ractive.js in your build process as well as in your app")
    );
  }
}

function extendPartials(existingPartials, newPartials, overwrite) {
  if (!newPartials) { return; }

  // TODO there's an ambiguity here - we need to overwrite in the `reset()`
  // case, but not initially...

  for (var key in newPartials) {
    if (overwrite || !hasOwn(existingPartials, key)) {
      existingPartials[key] = newPartials[key];
    }
  }
}

var registryNames = [
  'adaptors',
  'components',
  'computed',
  'decorators',
  'easing',
  'events',
  'helpers',
  'interpolators',
  'partials',
  'transitions'
];

var registriesOnDefaults = ['computed', 'helpers'];

var Registry = function Registry(name, useDefaults) {
  this.name = name;
  this.useDefaults = useDefaults;
};
var Registry__proto__ = Registry.prototype;

Registry__proto__.extend = function extend (Parent, proto, options) {
  var parent = this.useDefaults ? Parent.defaults : Parent;
  var target = this.useDefaults ? proto : proto.constructor;
  this.configure(parent, target, options);
};

Registry__proto__.init = function init () {
  // noop
};

Registry__proto__.configure = function configure (Parent, target, options) {
  var name = this.name;
  var option = options[name];

  var registry = create(Parent[name]);

  assign(registry, option);

  target[name] = registry;

  if (name === 'partials' && target[name]) {
    keys(target[name]).forEach(function (key) {
      addFunctions(target[name][key]);
    });
  }
};

Registry__proto__.reset = function reset (ractive) {
  var registry = ractive[this.name];
  var changed = false;

  keys(registry).forEach(function (key) {
    var item = registry[key];

    if (item._fn) {
      if (item._fn.isOwner) {
        registry[key] = item._fn;
      } else {
        delete registry[key];
      }
      changed = true;
    }
  });

  return changed;
};

var registries = registryNames.map(function (name) {
  var putInDefaults = registriesOnDefaults.indexOf(name) > -1;
  return new Registry(name, putInDefaults);
});

function wrap(parent, name, method) {
  if (!/_super/.test(method)) { return method; }

  function wrapper() {
    var superMethod = getSuperMethod(wrapper._parent, name);
    var hasSuper = '_super' in this;
    var oldSuper = this._super;

    this._super = superMethod;

    var result = method.apply(this, arguments);

    if (hasSuper) {
      this._super = oldSuper;
    } else {
      delete this._super;
    }

    return result;
  }

  wrapper._parent = parent;
  wrapper._method = method;

  return wrapper;
}

function getSuperMethod(parent, name) {
  if (name in parent) {
    var value = parent[name];

    return isFunction(value) ? value : function () { return value; };
  }

  return noop;
}

function getMessage(deprecated, correct, isError) {
  return (
    "options." + deprecated + " has been deprecated in favour of options." + correct + "." +
    (isError ? (" You cannot specify both options, please use options." + correct + ".") : '')
  );
}

function deprecateOption(options, deprecatedOption, correct) {
  if (deprecatedOption in options) {
    if (!(correct in options)) {
      warnIfDebug(getMessage(deprecatedOption, correct));
      options[correct] = options[deprecatedOption];
    } else {
      throw new Error(getMessage(deprecatedOption, correct, true));
    }
  }
}

function deprecate(options) {
  deprecateOption(options, 'beforeInit', 'onconstruct');
  deprecateOption(options, 'init', 'onrender');
  deprecateOption(options, 'complete', 'oncomplete');
  deprecateOption(options, 'eventDefinitions', 'events');

  // Using extend with Component instead of options,
  // like Human.extend( Spider ) means adaptors as a registry
  // gets copied to options. So we have to check if actually an array
  if (isArray(options.adaptors)) {
    deprecateOption(options, 'adaptors', 'adapt');
  }
}

var config = {
  extend: function (Parent, proto, options, Child) { return configure('extend', Parent, proto, options, Child); },
  init: function (Parent, ractive, options) { return configure('init', Parent, ractive, options); },
  reset: function (ractive) { return order.filter(function (c) { return c.reset && c.reset(ractive); }).map(function (c) { return c.name; }); }
};

var custom = {
  adapt: adaptConfigurator,
  computed: config,
  css: cssConfigurator,
  data: dataConfigurator,
  helpers: config,
  template: templateConfigurator
};

var defaultKeys = keys(defaults);

var isStandardKey = makeObj(defaultKeys.filter(function (key) { return !custom[key]; }));

// blacklisted keys that we don't double extend
var isBlacklisted = makeObj(
  defaultKeys.concat(registries.map(function (r) { return r.name; }), ['on', 'observe', 'attributes', 'cssData', 'use'])
);

var order = [].concat(
  defaultKeys.filter(function (key) { return !registries[key] && !custom[key]; }),
  registries,
  //custom.data,
  custom.template,
  custom.css
);

function configure(method, Parent, target, options, Child) {
  deprecate(options);

  for (var key in options) {
    if (hasOwn(isStandardKey, key)) {
      var value = options[key];

      // warn the developer if they passed a function and ignore its value

      // NOTE: we allow some functions on "el" because we duck type element lists
      // and some libraries or ef'ed-up virtual browsers (phantomJS) return a
      // function object as the result of querySelector methods
      if (key !== 'el' && isFunction(value)) {
        warnIfDebug(
          (key + " is a Ractive option that does not expect a function and will be ignored"),
          method === 'init' ? target : null
        );
      } else {
        target[key] = value;
      }
    }
  }

  // disallow combination of `append` and `enhance`
  if (target.append && target.enhance) {
    throw new Error('Cannot use append and enhance at the same time');
  }

  registries.forEach(function (registry) {
    registry[method](Parent, target, options, Child);
  });

  adaptConfigurator[method](Parent, target, options, Child);
  templateConfigurator[method](Parent, target, options, Child);
  cssConfigurator[method](Parent, target, options, Child);

  extendOtherMethods(Parent.prototype, target, options);
}

var _super = /\b_super\b/;
function extendOtherMethods(parent, target, options) {
  for (var key in options) {
    if (!isBlacklisted[key] && hasOwn(options, key)) {
      var member = options[key];

      // if this is a method that overwrites a method, wrap it:
      if (isFunction(member)) {
        if (
          (key in proto$9 ||
            (key.slice(0, 2) === 'on' && key.slice(2) in hooks && key in target)) &&
          !_super.test(member.toString())
        ) {
          warnIfDebug(
            ("Overriding Ractive prototype function '" + key + "' without calling the '" + _super + "' method can be very dangerous.")
          );
        }
        member = wrap(parent, key, member);
      }

      target[key] = member;
    }
  }
}

function makeObj(array) {
  var obj = {};
  array.forEach(function (x) { return (obj[x] = true); });
  return obj;
}

var Item = function Item(options) {
  this.up = options.up;
  this.ractive = options.up.ractive;

  this.template = options.template;
  this.index = options.index;
  this.type = options.template.t;

  this.dirty = false;
};
var Item__proto__ = Item.prototype;

Item__proto__.bubble = function bubble () {
  if (!this.dirty) {
    this.dirty = true;
    this.up.bubble();
  }
};

Item__proto__.destroyed = function destroyed () {
  if (this.fragment) { this.fragment.destroyed(); }
};

Item__proto__.find = function find () {
  return null;
};

Item__proto__.findComponent = function findComponent () {
  return null;
};

Item__proto__.findNextNode = function findNextNode () {
  return this.up.findNextNode(this);
};

Item__proto__.rebound = function rebound (update) {
  if (this.fragment) { this.fragment.rebound(update); }
};

Item__proto__.shuffled = function shuffled () {
  if (this.fragment) { this.fragment.shuffled(); }
};

Item__proto__.valueOf = function valueOf () {
  return this.toString();
};

Item.prototype.findAll = noop;
Item.prototype.findAllComponents = noop;

var ContainerItem = (function (Item) {
  function ContainerItem(options) {
    Item.call(this, options);
  }

  if ( Item ) ContainerItem.__proto__ = Item;
  var ContainerItem__proto__ = ContainerItem.prototype = Object.create( Item && Item.prototype );
  ContainerItem__proto__.constructor = ContainerItem;

  ContainerItem__proto__.detach = function detach () {
    return this.fragment ? this.fragment.detach() : createDocumentFragment();
  };

  ContainerItem__proto__.find = function find (selector) {
    if (this.fragment) {
      return this.fragment.find(selector);
    }
  };

  ContainerItem__proto__.findAll = function findAll (selector, options) {
    if (this.fragment) {
      this.fragment.findAll(selector, options);
    }
  };

  ContainerItem__proto__.findComponent = function findComponent (name) {
    if (this.fragment) {
      return this.fragment.findComponent(name);
    }
  };

  ContainerItem__proto__.findAllComponents = function findAllComponents (name, options) {
    if (this.fragment) {
      this.fragment.findAllComponents(name, options);
    }
  };

  ContainerItem__proto__.firstNode = function firstNode (skipParent) {
    return this.fragment && this.fragment.firstNode(skipParent);
  };

  ContainerItem__proto__.toString = function toString (escape) {
    return this.fragment ? this.fragment.toString(escape) : '';
  };

  return ContainerItem;
}(Item));

var space = /\s+/;

function readStyle(css) {
  if (!isString(css)) { return {}; }

  return cleanCss(css, function (css, reconstruct) {
    return css
      .split(';')
      .filter(function (rule) { return !!rule.trim(); })
      .map(reconstruct)
      .reduce(function (rules, rule) {
        var i = rule.indexOf(':');
        var name = rule.substr(0, i).trim();
        rules[name] = rule.substr(i + 1).trim();
        return rules;
      }, {});
  });
}

function readClass(str) {
  var list = str.split(space);

  // remove any empty entries
  var i = list.length;
  while (i--) {
    if (!list[i]) { list.splice(i, 1); }
  }

  return list;
}

var textTypes = [
  undefined,
  'text',
  'search',
  'url',
  'email',
  'hidden',
  'password',
  'search',
  'reset',
  'submit'
];

function getUpdateDelegate(attribute) {
  var element = attribute.element;
  var name = attribute.name;

  if (name === 'value') {
    if (attribute.interpolator) { attribute.interpolator.bound = true; }

    // special case - selects
    if (element.name === 'select' && name === 'value') {
      return element.getAttribute('multiple') ? updateMultipleSelectValue : updateSelectValue;
    }

    if (element.name === 'textarea') { return updateStringValue; }

    // special case - contenteditable
    if (element.getAttribute('contenteditable') != null) { return updateContentEditableValue; }

    // special case - <input>
    if (element.name === 'input') {
      var type = element.getAttribute('type');

      // type='file' value='{{fileList}}'>
      if (type === 'file') { return noop; } // read-only

      // type='radio' name='{{twoway}}'
      if (type === 'radio' && element.binding && element.binding.attribute.name === 'name')
        { return updateRadioValue; }

      if (~textTypes.indexOf(type)) { return updateStringValue; }
    }

    return updateValue;
  }

  var node = element.node;

  // special case - <input type='radio' name='{{twoway}}' value='foo'>
  if (attribute.isTwoway && name === 'name') {
    if (node.type === 'radio') { return updateRadioName; }
    if (node.type === 'checkbox') { return updateCheckboxName; }
  }

  if (name === 'style') { return updateStyleAttribute; }

  if (name.indexOf('style-') === 0) { return updateInlineStyle; }

  // special case - class names. IE fucks things up, again
  if (name === 'class' && (!node.namespaceURI || node.namespaceURI === html))
    { return updateClassName; }

  if (name.indexOf('class-') === 0) { return updateInlineClass; }

  if (attribute.isBoolean) {
    var type$1 = element.getAttribute('type');
    if (attribute.interpolator && name === 'checked' && (type$1 === 'checkbox' || type$1 === 'radio'))
      { attribute.interpolator.bound = true; }
    return updateBoolean;
  }

  if (attribute.namespace && attribute.namespace !== attribute.node.namespaceURI)
    { return updateNamespacedAttribute; }

  return updateAttribute;
}

function updateMultipleSelectValue(reset) {
  var value = this.getValue();

  if (!isArray(value)) { value = [value]; }

  var options = this.node.options;
  var i = options.length;

  if (reset) {
    while (i--) { options[i].selected = false; }
  } else {
    while (i--) {
      var option = options[i];
      var optionValue = option._ractive ? option._ractive.value : option.value; // options inserted via a triple don't have _ractive

      option.selected = arrayContains(value, optionValue);
    }
  }
}

function updateSelectValue(reset) {
  var value = this.getValue();

  if (!this.locked) {
    // TODO is locked still a thing?
    this.node._ractive.value = value;

    var options = this.node.options;
    var i = options.length;
    var wasSelected = false;

    if (reset) {
      while (i--) { options[i].selected = false; }
    } else {
      while (i--) {
        var option = options[i];
        var optionValue = option._ractive ? option._ractive.value : option.value; // options inserted via a triple don't have _ractive
        if (option.disabled && option.selected) { wasSelected = true; }

        if (optionValue == value) {
          // double equals as we may be comparing numbers with strings
          option.selected = true;
          return;
        }
      }
    }

    if (!wasSelected) { this.node.selectedIndex = -1; }
  }
}

function updateContentEditableValue(reset) {
  var value = this.getValue();

  if (!this.locked) {
    if (reset) { this.node.innerHTML = ''; }
    else { this.node.innerHTML = isUndefined(value) ? '' : value; }
  }
}

function updateRadioValue(reset) {
  var node = this.node;
  var wasChecked = node.checked;

  var value = this.getValue();

  if (reset) { return (node.checked = false); }

  //node.value = this.element.getAttribute( 'value' );
  node.value = this.node._ractive.value = value;
  node.checked = this.element.compare(value, this.element.getAttribute('name'));

  // This is a special case - if the input was checked, and the value
  // changed so that it's no longer checked, the twoway binding is
  // most likely out of date. To fix it we have to jump through some
  // hoops... this is a little kludgy but it works
  if (wasChecked && !node.checked && this.element.binding && this.element.binding.rendered) {
    this.element.binding.group.model.set(this.element.binding.group.getValue());
  }
}

function updateValue(reset) {
  if (!this.locked) {
    if (reset) {
      this.node.removeAttribute('value');
      this.node.value = this.node._ractive.value = null;
    } else {
      var value = this.getValue();

      this.node.value = this.node._ractive.value = value;
      this.node.setAttribute('value', safeToStringValue(value));
    }
  }
}

function updateStringValue(reset) {
  if (!this.locked) {
    if (reset) {
      this.node._ractive.value = '';
      this.node.removeAttribute('value');
    } else {
      var value = this.getValue();

      this.node._ractive.value = value;

      var safeValue = safeToStringValue(value);

      // fixes #3281 – Safari moves caret position when setting an input value to the same value
      if (this.node.value !== safeValue) {
        this.node.value = safeValue;
      }

      this.node.setAttribute('value', safeValue);
    }
  }
}

function updateRadioName(reset) {
  if (reset) { this.node.checked = false; }
  else { this.node.checked = this.element.compare(this.getValue(), this.element.binding.getValue()); }
}

function updateCheckboxName(reset) {
  var ref = this;
  var element = ref.element;
  var node = ref.node;
  var binding = element.binding;

  var value = this.getValue();
  var valueAttribute = element.getAttribute('value');

  if (!isArray(value)) {
    binding.isChecked = node.checked = element.compare(value, valueAttribute);
  } else {
    var i = value.length;
    while (i--) {
      if (element.compare(valueAttribute, value[i])) {
        binding.isChecked = node.checked = true;
        return;
      }
    }
    binding.isChecked = node.checked = false;
  }
}

function updateStyleAttribute(reset) {
  var props = reset ? {} : readStyle(this.getValue() || '');
  var style = this.node.style;
  var keys$$1 = keys(props);
  var prev = this.previous || [];

  var i = 0;
  while (i < keys$$1.length) {
    if (keys$$1[i] in style) {
      var safe = props[keys$$1[i]].replace('!important', '');
      style.setProperty(keys$$1[i], safe, safe.length !== props[keys$$1[i]].length ? 'important' : '');
    }
    i++;
  }

  // remove now-missing attrs
  i = prev.length;
  while (i--) {
    if (!~keys$$1.indexOf(prev[i]) && prev[i] in style) { style.setProperty(prev[i], '', ''); }
  }

  this.previous = keys$$1;
}

function updateInlineStyle(reset) {
  if (!this.style) {
    this.style = hyphenateCamel(this.name.substr(6));
  }

  if (reset && this.node.style.getPropertyValue(this.style) !== this.last) { return; }

  var value = reset ? '' : safeToStringValue(this.getValue());
  var safe = value.replace('!important', '');
  this.node.style.setProperty(this.style, safe, safe.length !== value.length ? 'important' : '');
  this.last = this.node.style.getPropertyValue(this.style);
}

function updateClassName(reset) {
  var value = reset ? [] : readClass(safeToStringValue(this.getValue()));

  // watch out for werdo svg elements
  var cls = this.node.className;
  cls = cls.baseVal !== undefined ? cls.baseVal : cls;

  var attr = readClass(cls);
  var prev = this.previous || [];

  var className = value.concat(attr.filter(function (c) { return !~prev.indexOf(c); })).join(' ');

  if (className !== cls) {
    if (!isString(this.node.className)) {
      this.node.className.baseVal = className;
    } else {
      this.node.className = className;
    }
  }

  this.previous = value;
}

function updateInlineClass(reset) {
  var name = this.name.substr(6);

  // watch out for werdo svg elements
  var cls = this.node.className;
  cls = cls.baseVal !== undefined ? cls.baseVal : cls;

  var attr = readClass(cls);
  var value = reset ? false : this.getValue();

  if (!this.inlineClass) { this.inlineClass = name; }

  if (value && !~attr.indexOf(name)) { attr.push(name); }
  else if (!value && ~attr.indexOf(name)) { attr.splice(attr.indexOf(name), 1); }

  if (!isString(this.node.className)) {
    this.node.className.baseVal = attr.join(' ');
  } else {
    this.node.className = attr.join(' ');
  }
}

function updateBoolean(reset) {
  // with two-way binding, only update if the change wasn't initiated by the user
  // otherwise the cursor will often be sent to the wrong place
  if (!this.locked) {
    if (reset) {
      if (this.useProperty) { this.node[this.propertyName] = false; }
      this.node.removeAttribute(this.propertyName);
    } else {
      if (this.useProperty) {
        this.node[this.propertyName] = this.getValue();
      } else {
        var val = this.getValue();
        if (val) {
          this.node.setAttribute(this.propertyName, isString(val) ? val : '');
        } else {
          this.node.removeAttribute(this.propertyName);
        }
      }
    }
  }
}

function updateAttribute(reset) {
  if (reset) {
    if (this.node.getAttribute(this.name) === this.value) {
      this.node.removeAttribute(this.name);
    }
  } else {
    this.value = safeToStringValue(this.getString());
    this.node.setAttribute(this.name, this.value);
  }
}

function updateNamespacedAttribute(reset) {
  if (reset) {
    if (
      this.value ===
      this.node.getAttributeNS(this.namespace, this.name.slice(this.name.indexOf(':') + 1))
    ) {
      this.node.removeAttributeNS(this.namespace, this.name.slice(this.name.indexOf(':') + 1));
    }
  } else {
    this.value = safeToStringValue(this.getString());
    this.node.setAttributeNS(
      this.namespace,
      this.name.slice(this.name.indexOf(':') + 1),
      this.value
    );
  }
}

var propertyNames = {
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  bgcolor: 'bgColor',
  class: 'className',
  codebase: 'codeBase',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  datetime: 'dateTime',
  dirname: 'dirName',
  for: 'htmlFor',
  'http-equiv': 'httpEquiv',
  ismap: 'isMap',
  maxlength: 'maxLength',
  novalidate: 'noValidate',
  pubdate: 'pubDate',
  readonly: 'readOnly',
  rowspan: 'rowSpan',
  tabindex: 'tabIndex',
  usemap: 'useMap'
};

var div$1 = doc ? createElement('div') : null;

var attributes = false;
function inAttributes() {
  return attributes;
}

var ConditionalAttribute = (function (Item) {
  function ConditionalAttribute(options) {
    Item.call(this, options);

    this.attributes = [];

    this.owner = options.owner;

    this.fragment = new Fragment({
      ractive: this.ractive,
      owner: this,
      template: this.template
    });

    // this fragment can't participate in node-y things
    this.fragment.findNextNode = noop;

    this.dirty = false;
  }

  if ( Item ) ConditionalAttribute.__proto__ = Item;
  var ConditionalAttribute__proto__ = ConditionalAttribute.prototype = Object.create( Item && Item.prototype );
  ConditionalAttribute__proto__.constructor = ConditionalAttribute;

  ConditionalAttribute__proto__.bind = function bind () {
    this.fragment.bind();
  };

  ConditionalAttribute__proto__.bubble = function bubble () {
    if (!this.dirty) {
      this.dirty = true;
      this.owner.bubble();
    }
  };

  ConditionalAttribute__proto__.destroyed = function destroyed () {
    this.unrender();
  };

  ConditionalAttribute__proto__.render = function render () {
    this.node = this.owner.node;
    if (this.node) {
      this.isSvg = this.node.namespaceURI === svg$1;
    }

    attributes = true;
    if (!this.rendered) { this.fragment.render(); }

    this.rendered = true;
    this.dirty = true; // TODO this seems hacky, but necessary for tests to pass in browser AND node.js
    this.update();
    attributes = false;
  };

  ConditionalAttribute__proto__.toString = function toString () {
    return this.fragment.toString();
  };

  ConditionalAttribute__proto__.unbind = function unbind (view) {
    this.fragment.unbind(view);
  };

  ConditionalAttribute__proto__.unrender = function unrender () {
    this.rendered = false;
    this.fragment.unrender();
  };

  ConditionalAttribute__proto__.update = function update () {
    var this$1 = this;

    var str;
    var attrs;

    if (this.dirty) {
      this.dirty = false;

      var current = attributes;
      attributes = true;
      this.fragment.update();

      if (this.rendered && this.node) {
        str = this.fragment.toString();

        attrs = parseAttributes(str, this.isSvg);

        // any attributes that previously existed but no longer do
        // must be removed
        this.attributes
          .filter(function (a) { return notIn(attrs, a); })
          .forEach(function (a) {
            this$1.node.removeAttribute(a.name);
          });

        attrs.forEach(function (a) {
          this$1.node.setAttribute(a.name, a.value);
        });

        this.attributes = attrs;
      }

      attributes = current || false;
    }
  };

  return ConditionalAttribute;
}(Item));

var onlyWhitespace = /^\s*$/;
function parseAttributes(str, isSvg) {
  if (onlyWhitespace.test(str)) { return []; }
  var tagName = isSvg ? 'svg' : 'div';
  return str
    ? (div$1.innerHTML = "<" + tagName + " " + str + "></" + tagName + ">") && toArray(div$1.childNodes[0].attributes)
    : [];
}

function notIn(haystack, needle) {
  var i = haystack.length;

  while (i--) {
    if (haystack[i].name === needle.name) {
      return false;
    }
  }

  return true;
}

function lookupNamespace(node, prefix) {
  var qualified = "xmlns:" + prefix;

  while (node) {
    if (node.hasAttribute && node.hasAttribute(qualified)) { return node.getAttribute(qualified); }
    node = node.parentNode;
  }

  return namespaces[prefix];
}

var attribute = false;
function inAttribute() {
  return attribute;
}

var Attribute = (function (Item) {
  function Attribute(options) {
    Item.call(this, options);

    this.name = options.template.n;
    this.namespace = null;

    this.owner = options.owner || options.up.owner || options.element || findElement(options.up);
    this.element =
      options.element || (this.owner.attributeByName ? this.owner : findElement(options.up));
    this.up = options.up; // shared
    this.ractive = this.up.ractive;

    this.rendered = false;
    this.updateDelegate = null;
    this.fragment = null;

    this.element.attributeByName[this.name] = this;

    if (!isArray(options.template.f)) {
      this.value = options.template.f;
      if (this.value === 0) {
        this.value = '';
      } else if (isUndefined(this.value)) {
        this.value = true;
      }
      return;
    } else {
      this.fragment = new Fragment({
        owner: this,
        template: options.template.f
      });
    }

    this.interpolator =
      this.fragment &&
      this.fragment.items.length === 1 &&
      this.fragment.items[0].type === INTERPOLATOR &&
      this.fragment.items[0];

    if (this.interpolator) { this.interpolator.owner = this; }
  }

  if ( Item ) Attribute.__proto__ = Item;
  var Attribute__proto__ = Attribute.prototype = Object.create( Item && Item.prototype );
  Attribute__proto__.constructor = Attribute;

  Attribute__proto__.bind = function bind () {
    if (this.fragment) {
      this.fragment.bind();
    }
  };

  Attribute__proto__.bubble = function bubble () {
    if (!this.dirty) {
      this.up.bubble();
      this.element.bubble();
      this.dirty = true;
    }
  };

  Attribute__proto__.firstNode = function firstNode () {};

  Attribute__proto__.getString = function getString () {
    attribute = true;
    var value = this.fragment
      ? this.fragment.toString()
      : this.value != null
      ? '' + this.value
      : '';
    attribute = false;
    return value;
  };

  // TODO could getValue ever be called for a static attribute,
  // or can we assume that this.fragment exists?
  Attribute__proto__.getValue = function getValue () {
    attribute = true;
    var value = this.fragment
      ? this.fragment.valueOf()
      : booleanAttributes[this.name.toLowerCase()]
      ? true
      : this.value;
    attribute = false;
    return value;
  };

  Attribute__proto__.render = function render () {
    var node = this.element.node;
    this.node = node;

    // should we use direct property access, or setAttribute?
    if (!node.namespaceURI || node.namespaceURI === namespaces.html) {
      this.propertyName = propertyNames[this.name] || this.name;

      if (node[this.propertyName] !== undefined) {
        this.useProperty = true;
      }

      // is attribute a boolean attribute or 'value'? If so we're better off doing e.g.
      // node.selected = true rather than node.setAttribute( 'selected', '' )
      if (booleanAttributes[this.name.toLowerCase()] || this.isTwoway) {
        this.isBoolean = true;
      }

      if (this.propertyName === 'value') {
        node._ractive.value = this.value;
      }
    }

    if (node.namespaceURI) {
      var index = this.name.indexOf(':');
      if (index !== -1) {
        this.namespace = lookupNamespace(node, this.name.slice(0, index));
      } else {
        this.namespace = node.namespaceURI;
      }
    }

    this.rendered = true;
    this.updateDelegate = getUpdateDelegate(this);
    this.updateDelegate();
  };

  Attribute__proto__.toString = function toString () {
    if (inAttributes()) { return ''; }
    attribute = true;

    var value = this.getValue();

    // Special case - select and textarea values (should not be stringified)
    if (
      this.name === 'value' &&
      (this.element.getAttribute('contenteditable') !== undefined ||
        (this.element.name === 'select' || this.element.name === 'textarea'))
    ) {
      return;
    }

    // Special case – bound radio `name` attributes
    if (
      this.name === 'name' &&
      this.element.name === 'input' &&
      this.interpolator &&
      this.element.getAttribute('type') === 'radio'
    ) {
      return ("name=\"{{" + (this.interpolator.model.getKeypath()) + "}}\"");
    }

    // Special case - style and class attributes and directives
    if (
      this.owner === this.element &&
      (this.name === 'style' || this.name === 'class' || this.style || this.inlineClass)
    ) {
      return;
    }

    if (
      !this.rendered &&
      this.owner === this.element &&
      (!this.name.indexOf('style-') || !this.name.indexOf('class-'))
    ) {
      if (!this.name.indexOf('style-')) {
        this.style = hyphenateCamel(this.name.substr(6));
      } else {
        this.inlineClass = this.name.substr(6);
      }

      return;
    }

    if (booleanAttributes[this.name.toLowerCase()])
      { return value
        ? isString(value)
          ? ((this.name) + "=\"" + (safeAttributeString(value)) + "\"")
          : this.name
        : ''; }
    if (value == null) { return ''; }

    var str = safeAttributeString(this.getString());
    attribute = false;

    return str ? ((this.name) + "=\"" + str + "\"") : this.name;
  };

  Attribute__proto__.unbind = function unbind (view) {
    if (this.fragment) { this.fragment.unbind(view); }
  };

  Attribute__proto__.unrender = function unrender () {
    this.updateDelegate(true);

    this.rendered = false;
  };

  Attribute__proto__.update = function update () {
    if (this.dirty) {
      var binding;
      this.dirty = false;
      if (this.fragment) { this.fragment.update(); }
      if (this.rendered) { this.updateDelegate(); }
      if (this.isTwoway && !this.locked) {
        this.interpolator.twowayBinding.lastVal(true, this.interpolator.model.get());
      } else if (this.name === 'value' && (binding = this.element.binding)) {
        // special case: name bound element with dynamic value
        var attr = binding.attribute;
        if (attr && !attr.dirty && attr.rendered) {
          this.element.binding.attribute.updateDelegate();
        }
      }
    }
  };

  return Attribute;
}(Item));

var BindingFlag = (function (Item) {
  function BindingFlag(options) {
    Item.call(this, options);

    this.owner = options.owner || options.up.owner || findElement(options.up);
    this.element = this.owner.attributeByName ? this.owner : findElement(options.up);
    this.flag = options.template.v === 'l' ? 'lazy' : 'twoway';
    this.bubbler = this.owner === this.element ? this.element : this.up;

    if (this.element.type === ELEMENT) {
      if (isArray(options.template.f)) {
        this.fragment = new Fragment({
          owner: this,
          template: options.template.f
        });
      }

      this.interpolator =
        this.fragment &&
        this.fragment.items.length === 1 &&
        this.fragment.items[0].type === INTERPOLATOR &&
        this.fragment.items[0];
    }
  }

  if ( Item ) BindingFlag.__proto__ = Item;
  var BindingFlag__proto__ = BindingFlag.prototype = Object.create( Item && Item.prototype );
  BindingFlag__proto__.constructor = BindingFlag;

  BindingFlag__proto__.bind = function bind () {
    if (this.fragment) { this.fragment.bind(); }
    set$1(this, this.getValue(), true);
  };

  BindingFlag__proto__.bubble = function bubble () {
    if (!this.dirty) {
      this.bubbler.bubble();
      this.dirty = true;
    }
  };

  BindingFlag__proto__.getValue = function getValue () {
    if (this.fragment) { return this.fragment.valueOf(); }
    else if ('value' in this) { return this.value; }
    else if ('f' in this.template) { return this.template.f; }
    else { return true; }
  };

  BindingFlag__proto__.render = function render () {
    set$1(this, this.getValue(), true);
  };

  BindingFlag__proto__.toString = function toString () {
    return '';
  };

  BindingFlag__proto__.unbind = function unbind (view) {
    if (this.fragment) { this.fragment.unbind(view); }

    delete this.element[this.flag];
  };

  BindingFlag__proto__.unrender = function unrender () {
    if (this.element.rendered) { this.element.recreateTwowayBinding(); }
  };

  BindingFlag__proto__.update = function update () {
    if (this.dirty) {
      this.dirty = false;
      if (this.fragment) { this.fragment.update(); }
      set$1(this, this.getValue(), true);
    }
  };

  return BindingFlag;
}(Item));

function set$1(flag, value, update) {
  if (value === 0) {
    flag.value = true;
  } else if (value === 'true') {
    flag.value = true;
  } else if (value === 'false' || value === '0') {
    flag.value = false;
  } else {
    flag.value = value;
  }

  var current = flag.element[flag.flag];
  flag.element[flag.flag] = flag.value;
  if (update && !flag.element.attributes.binding && current !== flag.value) {
    flag.element.recreateTwowayBinding();
  }

  return flag.value;
}

function Comment(options) {
  Item.call(this, options);
}

var proto$1 = create(Item.prototype);

assign(proto$1, {
  bind: noop,
  unbind: noop,
  update: noop,

  detach: function detach() {
    return detachNode(this.node);
  },

  firstNode: function firstNode() {
    return this.node;
  },

  render: function render(target) {
    this.rendered = true;

    this.node = doc.createComment(this.template.c);
    target.appendChild(this.node);
  },

  toString: function toString() {
    return ("<!-- " + (this.template.c) + " -->");
  },

  unrender: function unrender(shouldDestroy) {
    if (this.rendered && shouldDestroy) { this.detach(); }
    this.rendered = false;
  }
});

Comment.prototype = proto$1;

// Teardown. This goes through the root fragment and all its children, removing observers
// and generally cleaning up after itself

function Ractive$teardown() {
  var this$1 = this;

  if (this.torndown) {
    warnIfDebug('ractive.teardown() was called on a Ractive instance that was already torn down');
    return Promise.resolve();
  }

  this.shouldDestroy = true;
  return teardown$1(this, function () { return (this$1.fragment.rendered ? this$1.unrender() : Promise.resolve()); });
}

function teardown$1(instance, getPromise) {
  instance.torndown = true;
  instance.fragment.unbind();
  instance._observers.slice().forEach(cancel);

  if (instance.el && instance.el.__ractive_instances__) {
    removeFromArray(instance.el.__ractive_instances__, instance);
  }

  var promise = getPromise();

  hooks.teardown.fire(instance);

  promise.then(function () {
    hooks.destruct.fire(instance);
    instance.viewmodel.teardown();
  });

  return promise;
}

var RactiveModel = (function (SharedModel) {
  function RactiveModel(ractive) {
    SharedModel.call(this, ractive, '@this');
    this.ractive = ractive;
  }

  if ( SharedModel ) RactiveModel.__proto__ = SharedModel;
  var RactiveModel__proto__ = RactiveModel.prototype = Object.create( SharedModel && SharedModel.prototype );
  RactiveModel__proto__.constructor = RactiveModel;

  RactiveModel__proto__.joinKey = function joinKey (key) {
    var model = SharedModel.prototype.joinKey.call(this, key);

    if ((key === 'root' || key === 'parent') && !model.isLink) { return initLink(model, key); }
    else if (key === 'data') { return this.ractive.viewmodel; }
    else if (key === 'cssData') { return this.ractive.constructor._cssModel; }

    return model;
  };

  return RactiveModel;
}(SharedModel));

function initLink(model, key) {
  model.applyValue = function(value) {
    this.parent.value[key] = value;
    if (value && value.viewmodel) {
      this.link(value.viewmodel.getRactiveModel(), key);
      this._link.markedAll();
    } else {
      this.link(create(Missing), key);
      this._link.markedAll();
    }
  };

  if (key === 'root') {
    var mark = model.mark;
    model.mark = function(force) {
      if (this._marking) { return; }
      this._marking = true;
      mark.apply(this, force);
      this._marking = false;
    };
  }

  model.applyValue(model.parent.ractive[key], key);
  model._link.set = function (v) { return model.applyValue(v); };
  model._link.applyValue = function (v) { return model.applyValue(v); };

  return model._link;
}

var specialModels = {
  '@this': function _this(root) {
    return root.getRactiveModel();
  },
  '@global': function _global() {
    return GlobalModel;
  },
  '@shared': function _shared() {
    return SharedModel$1;
  },
  '@style': function _style(root) {
    return root.getRactiveModel().joinKey('cssData');
  },
  '@helpers': function _helpers(root) {
    return root.getHelpers();
  }
};
specialModels['@'] = specialModels['@this'];

var RootModel = (function (Model) {
  function RootModel(options) {
    Model.call(this, null, null);

    this.isRoot = true;
    this.root = this;
    this.ractive = options.ractive; // TODO sever this link

    this.value = options.data;
    this.adaptors = options.adapt;
    this.adapt();
  }

  if ( Model ) RootModel.__proto__ = Model;
  var RootModel__proto__ = RootModel.prototype = Object.create( Model && Model.prototype );
  RootModel__proto__.constructor = RootModel;

  RootModel__proto__.attached = function attached (fragment) {
    attachImplicits(this, fragment);
  };

  RootModel__proto__.createLink = function createLink (keypath, target, targetPath, options) {
    var keys = splitKeypath(keypath);

    var model = this;
    while (keys.length) {
      var key = keys.shift();
      model = model.childByKey[key] || model.joinKey(key);
    }

    return model.link(target, targetPath, options);
  };

  RootModel__proto__.detached = function detached () {
    detachImplicits(this);
  };

  RootModel__proto__.get = function get (shouldCapture, options) {
    if (shouldCapture) { capture(this); }

    if (!options || options.virtual !== false) {
      return this.getVirtual();
    } else {
      return this.value;
    }
  };

  RootModel__proto__.getHelpers = function getHelpers () {
    if (!this.helpers) { this.helpers = new SharedModel(this.ractive.helpers, 'helpers', this.ractive); }
    return this.helpers;
  };

  RootModel__proto__.getKeypath = function getKeypath () {
    return '';
  };

  RootModel__proto__.getRactiveModel = function getRactiveModel () {
    return this.ractiveModel || (this.ractiveModel = new RactiveModel(this.ractive));
  };

  RootModel__proto__.getValueChildren = function getValueChildren () {
    var children = Model.prototype.getValueChildren.call(this, this.value);

    this.children.forEach(function (child) {
      if (child._link) {
        var idx = children.indexOf(child);
        if (~idx) { children.splice(idx, 1, child._link); }
        else { children.push(child._link); }
      }
    });

    return children;
  };

  RootModel__proto__.has = function has (key) {
    if (key[0] === '~' && key[1] === '/') { key = key.slice(2); }
    if (specialModels[key] || key === '') { return true; }

    if (Model.prototype.has.call(this, key)) {
      return true;
    } else {
      var unescapedKey = unescapeKey(key);

      // mappings/links and computations
      if (this.childByKey[unescapedKey] && this.childByKey[unescapedKey]._link) { return true; }
    }
  };

  RootModel__proto__.joinKey = function joinKey (key, opts) {
    if (key[0] === '~' && key[1] === '/') { key = key.slice(2); }

    if (key[0] === '@') {
      var fn = specialModels[key];
      if (fn) { return fn(this); }
    } else {
      return Model.prototype.joinKey.call(this, key, opts);
    }
  };

  RootModel__proto__.set = function set (value) {
    // TODO wrapping root node is a baaaad idea. We should prevent this
    var wrapper = this.wrapper;
    if (wrapper) {
      var shouldTeardown = !wrapper.reset || wrapper.reset(value) === false;

      if (shouldTeardown) {
        wrapper.teardown();
        this.wrapper = null;
        this.value = value;
        this.adapt();
      }
    } else {
      this.value = value;
      this.adapt();
    }

    this.deps.forEach(handleChange);
    this.children.forEach(mark);
  };

  RootModel__proto__.retrieve = function retrieve () {
    return this.wrapper ? this.wrapper.get() : this.value;
  };

  RootModel__proto__.teardown = function teardown () {
    Model.prototype.teardown.call(this);
    this.ractiveModel && this.ractiveModel.teardown();
  };

  return RootModel;
}(Model));
RootModel.prototype.update = noop;

function attachImplicits(model, fragment) {
  if (model._link && model._link.implicit && model._link.isDetached()) {
    model.attach(fragment);
  }

  // look for virtual children to relink and cascade
  for (var k in model.childByKey) {
    if (model.value) {
      if (k in model.value) {
        attachImplicits(model.childByKey[k], fragment);
      } else if (!model.childByKey[k]._link || model.childByKey[k]._link.isDetached()) {
        var mdl = resolveReference(fragment, k);
        if (mdl) {
          model.childByKey[k].link(mdl, k, { implicit: true });
        }
      }
    }
  }
}

function detachImplicits(model) {
  if (model._link && model._link.implicit) {
    model.unlink();
  }

  for (var k in model.childByKey) {
    detachImplicits(model.childByKey[k]);
  }
}

function subscribe(instance, options, type) {
  var subs = (instance.constructor[("_" + type)] || []).concat(toPairs(options[type] || []));
  var single = type === 'on' ? 'once' : (type + "Once");

  subs.forEach(function (ref) {
    var target = ref[0];
    var config = ref[1];

    if (isFunction(config)) {
      instance[type](target, config);
    } else if (isObjectType(config) && isFunction(config.handler)) {
      instance[config.once ? single : type](target, config.handler, create(config));
    }
  });
}

var registryNames$1 = [
  'adaptors',
  'components',
  'decorators',
  'easing',
  'events',
  'interpolators',
  'partials',
  'transitions'
];

var protoRegistries = ['computed', 'helpers'];

var uid = 0;

function construct(ractive, options) {
  if (Ractive.DEBUG) { welcome(); }

  initialiseProperties(ractive);
  handleAttributes(ractive);

  // set up event subscribers
  subscribe(ractive, options, 'on');

  // if there's not a delegation setting, inherit from parent if it's not default
  if (
    !hasOwn(options, 'delegate') &&
    ractive.parent &&
    ractive.parent.delegate !== ractive.delegate
  ) {
    ractive.delegate = false;
  }

  // plugins that need to run at construct
  if (isArray(options.use)) {
    ractive.use.apply(ractive, options.use.filter(function (p) { return p.construct; }));
  }

  hooks.construct.fire(ractive, options);
  if (options.onconstruct) { options.onconstruct.call(ractive, getRactiveContext(ractive), options); }

  // Add registries
  var i = registryNames$1.length;
  while (i--) {
    var name = registryNames$1[i];
    ractive[name] = assign(create(ractive.constructor[name] || null), options[name]);
  }

  i = protoRegistries.length;
  while (i--) {
    var name$1 = protoRegistries[i];
    ractive[name$1] = assign(create(ractive.constructor.prototype[name$1]), options[name$1]);
  }

  if (ractive._attributePartial) {
    ractive.partials['extra-attributes'] = ractive._attributePartial;
    delete ractive._attributePartial;
  }

  // Create a viewmodel
  var viewmodel = new RootModel({
    adapt: getAdaptors(ractive, ractive.adapt, options),
    data: dataConfigurator.init(ractive.constructor, ractive, options),
    ractive: ractive
  });

  // once resolved, share the adaptors array between the root model and instance
  ractive.adapt = viewmodel.adaptors;

  ractive.viewmodel = viewmodel;

  for (var k in ractive.computed) {
    compute.call(ractive, k, ractive.computed[k]);
  }
}

function getAdaptors(ractive, protoAdapt, options) {
  protoAdapt = protoAdapt.map(lookup);
  var adapt = ensureArray(options.adapt).map(lookup);

  var srcs = [protoAdapt, adapt];
  if (ractive.parent && !ractive.isolated) {
    srcs.push(ractive.parent.viewmodel.adaptors);
  }

  return combine.apply(null, srcs);

  function lookup(adaptor) {
    if (isString(adaptor)) {
      adaptor = findInViewHierarchy('adaptors', ractive, adaptor);

      if (!adaptor) {
        fatal(missingPlugin(adaptor, 'adaptor'));
      }
    }

    return adaptor;
  }
}

function initialiseProperties(ractive) {
  // Generate a unique identifier, for places where you'd use a weak map if it
  // existed
  ractive._guid = 'r-' + uid++;

  // events
  ractive._subs = create(null);
  ractive._nsSubs = 0;

  // storage for item configuration from instantiation to reset,
  // like dynamic functions or original values
  ractive._config = {};

  // events
  ractive.event = null;
  ractive._eventQueue = [];

  // observers
  ractive._observers = [];

  // external children
  ractive._children = [];
  ractive._children.byName = {};
  ractive.children = ractive._children;

  if (!ractive.component) {
    ractive.root = ractive;
    ractive.parent = ractive.container = null; // TODO container still applicable?
  }
}

function handleAttributes(ractive) {
  var component = ractive.component;
  var attributes = ractive.constructor.attributes;

  if (attributes && component) {
    var tpl = component.template;
    var attrs = tpl.m ? tpl.m.slice() : [];

    // grab all of the passed attribute names
    var props = attrs.filter(function (a) { return a.t === ATTRIBUTE; }).map(function (a) { return a.n; });

    // warn about missing requireds
    attributes.required.forEach(function (p) {
      if (!~props.indexOf(p)) {
        warnIfDebug(("Component '" + (component.name) + "' requires attribute '" + p + "' to be provided"));
      }
    });

    // set up a partial containing non-property attributes
    var all = attributes.optional.concat(attributes.required);
    var partial = [];
    var i = attrs.length;
    while (i--) {
      var a = attrs[i];
      if (a.t === ATTRIBUTE && !~all.indexOf(a.n)) {
        if (attributes.mapAll) {
          // map the attribute if requested and make the extra attribute in the partial refer to the mapping
          partial.unshift({
            t: ATTRIBUTE,
            n: a.n,
            f: [{ t: INTERPOLATOR, r: ("~/" + (a.n)) }]
          });
        } else {
          // transfer the attribute to the extra attributes partal
          partial.unshift(attrs.splice(i, 1)[0]);
        }
      } else if (
        !attributes.mapAll &&
        (a.t === DECORATOR || a.t === TRANSITION || a.t === BINDING_FLAG)
      ) {
        partial.unshift(attrs.splice(i, 1)[0]);
      }
    }

    if (partial.length) { component.template = { t: tpl.t, e: tpl.e, f: tpl.f, m: attrs, p: tpl.p }; }
    ractive._attributePartial = partial;
  }
}

var Component = (function (Item) {
  function Component(options, ComponentConstructor) {
    var this$1 = this;

    Item.call(this, options);
    var template = options.template;
    this.isAnchor = template.t === ANCHOR;
    this.type = this.isAnchor ? ANCHOR : COMPONENT; // override ELEMENT from super
    var attrs = template.m;

    var partials = template.p || {};
    if (!('content' in partials)) { partials.content = template.f || []; }
    this._partials = partials; // TEMP

    if (this.isAnchor) {
      this.name = template.n;

      this.addChild = addChild;
      this.removeChild = removeChild;
    } else {
      var instance = create(ComponentConstructor.prototype);

      this.instance = instance;
      this.name = template.e;

      if (instance.el || instance.target) {
        warnIfDebug(
          ("The <" + (this.name) + "> component has a default '" + (instance.el ? 'el' : 'target') + "' property; it has been disregarded")
        );
        instance.el = instance.target = null;
      }

      // find container
      var fragment = options.up;
      var container;
      while (fragment) {
        if (fragment.owner.type === YIELDER) {
          container = fragment.owner.container;
          break;
        }

        fragment = fragment.parent;
      }

      // add component-instance-specific properties
      instance.parent = this.up.ractive;
      instance.container = container || null;
      instance.root = instance.parent.root;
      instance.component = this;

      construct(this.instance, { partials: partials });

      // these can be modified during construction
      template = this.template;
      attrs = template.m;

      // allow components that are so inclined to add programmatic mappings
      if (isArray(this.mappings)) {
        attrs = (attrs || []).concat(this.mappings);
      } else if (isString(this.mappings)) {
        attrs = (attrs || []).concat(parser.parse(this.mappings, { attributes: true }).t);
      }

      // for hackability, this could be an open option
      // for any ractive instance, but for now, just
      // for components and just for ractive...
      instance._inlinePartials = partials;
    }

    this.attributeByName = {};
    this.attributes = [];

    if (attrs) {
      var leftovers = [];
      attrs.forEach(function (template) {
        switch (template.t) {
          case ATTRIBUTE:
          case EVENT:
            this$1.attributes.push(
              createItem({
                owner: this$1,
                up: this$1.up,
                template: template
              })
            );
            break;

          case TRANSITION:
          case BINDING_FLAG:
          case DECORATOR:
            break;

          default:
            leftovers.push(template);
            break;
        }
      });

      if (leftovers.length) {
        this.attributes.push(
          new ConditionalAttribute({
            owner: this,
            up: this.up,
            template: leftovers
          })
        );
      }
    }

    this.eventHandlers = [];
  }

  if ( Item ) Component.__proto__ = Item;
  var Component__proto__ = Component.prototype = Object.create( Item && Item.prototype );
  Component__proto__.constructor = Component;

  Component__proto__.bind = function bind () {
    if (!this.isAnchor) {
      this.attributes.forEach(bind$1);
      this.eventHandlers.forEach(bind$1);

      initialise(
        this.instance,
        {
          partials: this._partials
        },
        {
          cssIds: this.up.cssIds
        }
      );

      if (this.instance.target || this.instance.el) { this.extern = true; }

      this.bound = true;
    }
  };

  Component__proto__.bubble = function bubble () {
    if (!this.dirty) {
      this.dirty = true;
      this.up.bubble();
    }
  };

  Component__proto__.destroyed = function destroyed () {
    if (!this.isAnchor && this.instance.fragment) { this.instance.fragment.destroyed(); }
  };

  Component__proto__.detach = function detach () {
    if (this.isAnchor) {
      if (this.instance) { return this.instance.fragment.detach(); }
      return createDocumentFragment();
    }

    return this.instance.fragment.detach();
  };

  Component__proto__.find = function find (selector, options) {
    if (this.instance) { return this.instance.fragment.find(selector, options); }
  };

  Component__proto__.findAll = function findAll (selector, options) {
    if (this.instance) { this.instance.fragment.findAll(selector, options); }
  };

  Component__proto__.findComponent = function findComponent (name, options) {
    if (!name || this.name === name) { return this.instance; }

    if (this.instance.fragment) {
      return this.instance.fragment.findComponent(name, options);
    }
  };

  Component__proto__.findAllComponents = function findAllComponents (name, options) {
    var result = options.result;

    if (this.instance && (!name || this.name === name)) {
      result.push(this.instance);
    }

    if (this.instance) { this.instance.findAllComponents(name, options); }
  };

  Component__proto__.firstNode = function firstNode (skipParent) {
    if (this.instance) { return this.instance.fragment.firstNode(skipParent); }
  };

  Component__proto__.getContext = function getContext () {
    var assigns = [], len = arguments.length;
    while ( len-- ) assigns[ len ] = arguments[ len ];

    assigns.unshift(this.instance);
    return getRactiveContext.apply(null, assigns);
  };

  Component__proto__.rebound = function rebound (update$$1) {
    this.attributes.forEach(function (x) { return x.rebound(update$$1); });
  };

  Component__proto__.render = function render$2 (target, occupants) {
    if (this.isAnchor) {
      this.rendered = true;
      this.target = target;

      if (!checking.length) {
        checking.push(this.ractive);
        if (occupants) {
          this.occupants = occupants;
          checkAnchors();
          this.occupants = null;
        } else {
          runloop.scheduleTask(checkAnchors, true);
        }
      }
    } else {
      this.attributes.forEach(render);
      this.eventHandlers.forEach(render);

      if (this.extern) {
        this.instance.delegate = false;
        this.instance.render();
      } else {
        render$1(this.instance, target, null, occupants);
      }

      this.rendered = true;
    }
  };

  Component__proto__.shuffled = function shuffled () {
    Item.prototype.shuffled.call(this);
    this.instance &&
      !this.instance.isolated &&
      this.instance.fragment &&
      this.instance.fragment.shuffled();
  };

  Component__proto__.toString = function toString () {
    if (this.instance) { return this.instance.toHTML(); }
  };

  Component__proto__.unbind = function unbind$1 (view) {
    if (!this.isAnchor) {
      this.bound = false;

      this.attributes.forEach(unbind);

      if (view) { this.instance.fragment.unbind(); }
      else { teardown$1(this.instance, function () { return runloop.promise(); }); }
    }
  };

  Component__proto__.unrender = function unrender$1 (shouldDestroy) {
    this.shouldDestroy = shouldDestroy;

    if (this.isAnchor) {
      if (this.item) { unrenderItem(this, this.item); }
      this.target = null;
      if (!checking.length) {
        checking.push(this.ractive);
        runloop.scheduleTask(checkAnchors, true);
      }
    } else {
      this.instance.unrender();
      this.instance.el = this.instance.target = null;
      this.attributes.forEach(unrender);
      this.eventHandlers.forEach(unrender);
    }

    this.rendered = false;
  };

  Component__proto__.update = function update$2 () {
    this.dirty = false;
    if (this.instance) {
      this.instance.fragment.update();
      this.attributes.forEach(update);
      this.eventHandlers.forEach(update);
    }
  };

  return Component;
}(Item));

function addChild(meta) {
  if (this.item) { this.removeChild(this.item); }

  var child = meta.instance;
  meta.anchor = this;

  meta.up = this.up;
  meta.name = meta.nameOption || this.name;
  this.name = meta.name;

  if (!child.isolated) { child.viewmodel.attached(this.up); }

  // render as necessary
  if (this.rendered) {
    renderItem(this, meta);
  }
}

function removeChild(meta) {
  // unrender as necessary
  if (this.item === meta) {
    unrenderItem(this, meta);
    this.name = this.template.n;
  }
}

function renderItem(anchor, meta) {
  if (!anchor.rendered) { return; }

  meta.shouldDestroy = false;
  meta.up = anchor.up;

  anchor.item = meta;
  anchor.instance = meta.instance;
  var nextNode = anchor.up.findNextNode(anchor);

  if (meta.instance.fragment.rendered) {
    meta.instance.unrender();
  }

  meta.partials = meta.instance.partials;
  meta.instance.partials = assign(create(meta.partials), meta.partials, anchor._partials);

  meta.instance.fragment.unbind(true);
  meta.instance.fragment.componentParent = anchor.up;
  meta.instance.fragment.bind(meta.instance.viewmodel);

  anchor.attributes.forEach(bind$1);
  anchor.eventHandlers.forEach(bind$1);
  anchor.attributes.forEach(render);
  anchor.eventHandlers.forEach(render);

  var target = anchor.up.findParentNode();
  render$1(meta.instance, target, target.contains(nextNode) ? nextNode : null, anchor.occupants);

  if (meta.lastBound !== anchor) {
    meta.lastBound = anchor;
  }
}

function unrenderItem(anchor, meta) {
  if (!anchor.rendered) { return; }

  meta.shouldDestroy = true;
  meta.instance.unrender();

  anchor.eventHandlers.forEach(unrender);
  anchor.attributes.forEach(unrender);
  anchor.eventHandlers.forEach(unbind);
  anchor.attributes.forEach(unbind);

  meta.instance.el = meta.instance.anchor = null;
  meta.instance.fragment.componentParent = null;
  meta.up = null;
  meta.anchor = null;
  anchor.item = null;
  anchor.instance = null;
}

var checking = [];
function checkAnchors() {
  var list = checking;
  checking = [];

  list.forEach(updateAnchors);
}

function setupArgsFn(item, template, fragment, opts) {
  if ( opts === void 0 ) opts = {};

  if (template && template.f && template.f.s) {
    item.fn = getFunction(template.f.s, template.f.r.length);
    if (opts.register === true) {
      item.models = resolveArgs(item, template, fragment, opts);
    }
  }
}

function resolveArgs(item, template, fragment, opts) {
  if ( opts === void 0 ) opts = {};

  return template.f.r.map(function (ref, i) {
    var model;

    if (opts.specialRef && (model = opts.specialRef(ref, i))) { return model; }

    model = resolveReference(fragment, ref);
    if (opts.register === true) {
      model.register(item);
    }

    return model;
  });
}

function teardownArgsFn(item, template) {
  if (template && template.f && template.f.s) {
    if (item.models)
      { item.models.forEach(function (m) {
        if (m && m.unregister) { m.unregister(item); }
      }); }
    item.models = null;
  }
}

var missingDecorator = {
  update: noop,
  teardown: noop
};

var Decorator = function Decorator(options) {
  this.owner = options.owner || options.up.owner || findElement(options.up);
  this.element = this.owner.attributeByName ? this.owner : findElement(options.up);
  this.up = options.up || this.owner.up;
  this.ractive = this.owner.ractive;
  var template = (this.template = options.template);

  this.name = template.n;

  this.node = null;
  this.handle = null;

  this.element.decorators.push(this);
};
var Decorator__proto__ = Decorator.prototype;

Decorator__proto__.bind = function bind () {
  // if the owner is the elment, make sure the context includes the element
  var frag = this.element === this.owner ? new Fragment({ owner: this.owner }) : this.up;
  setupArgsFn(this, this.template, frag, { register: true });
};

Decorator__proto__.bubble = function bubble () {
  if (!this.dirty) {
    this.dirty = true;
    // decorators may be owned directly by an element or by a fragment if conditional
    this.owner.bubble();
    this.up.bubble();
  }
};

Decorator__proto__.destroyed = function destroyed () {
  if (this.handle) {
    this.handle.teardown();
    this.handle = null;
  }
  this.shouldDestroy = true;
};

Decorator__proto__.handleChange = function handleChange () {
  this.bubble();
};

Decorator__proto__.rebind = function rebind (next, previous, safe) {
  var idx = this.models.indexOf(previous);
  if (!~idx) { return; }

  next = rebindMatch(this.template.f.r[idx], next, previous);
  if (next === previous) { return; }

  previous.unregister(this);
  this.models.splice(idx, 1, next);
  if (next) { next.addShuffleRegister(this, 'mark'); }

  if (!safe) { this.bubble(); }
};

Decorator__proto__.rebound = function rebound (update) {
  teardownArgsFn(this, this.template);
  setupArgsFn(this, this.template, this.up, { register: true });
  if (update) { this.bubble(); }
};

Decorator__proto__.render = function render () {
    var this$1 = this;

  this.shouldDestroy = false;
  if (this.handle) { this.unrender(); }
  runloop.scheduleTask(function () {
    // bail if the host element has managed to become unrendered
    if (!this$1.element.rendered) { return; }

    var fn = findInViewHierarchy('decorators', this$1.ractive, this$1.name);

    if (!fn) {
      warnOnce(missingPlugin(this$1.name, 'decorator'));
      this$1.handle = missingDecorator;
      return;
    }

    this$1.node = this$1.element.node;

    var args;
    if (this$1.fn) {
      args = this$1.models.map(function (model) {
        if (!model) { return undefined; }

        return model.get();
      });
      args = this$1.fn.apply(this$1.ractive, args);
    }

    this$1.handle = fn.apply(this$1.ractive, [this$1.node].concat(args));

    if (!this$1.handle || !this$1.handle.teardown) {
      throw new Error(
        ("The '" + (this$1.name) + "' decorator must return an object with a teardown method")
      );
    }

    // watch out for decorators that cause their host element to be unrendered
    if (this$1.shouldDestroy) { this$1.destroyed(); }
  }, true);
};

Decorator__proto__.toString = function toString () {
  return '';
};

Decorator__proto__.unbind = function unbind () {
  teardownArgsFn(this, this.template);
};

Decorator__proto__.unrender = function unrender (shouldDestroy) {
  if ((!shouldDestroy || this.element.rendered) && this.handle) {
    this.handle.teardown();
    this.handle = null;
  }
};

Decorator__proto__.update = function update () {
  var instance = this.handle;

  if (!this.dirty) {
    if (instance && instance.invalidate) {
      runloop.scheduleTask(function () { return instance.invalidate(); }, true);
    }
    return;
  }

  this.dirty = false;

  if (instance) {
    if (!instance.update) {
      this.unrender();
      this.render();
    } else {
      var args = this.models.map(function (model) { return model && model.get(); });
      instance.update.apply(this.ractive, this.fn.apply(this.ractive, args));
    }
  }
};

Decorator.prototype.firstNode = noop;

var Doctype = (function (Item) {
  function Doctype () {
    Item.apply(this, arguments);
  }

  if ( Item ) Doctype.__proto__ = Item;
  var Doctype__proto__ = Doctype.prototype = Object.create( Item && Item.prototype );
  Doctype__proto__.constructor = Doctype;

  Doctype__proto__.toString = function toString () {
    return '<!DOCTYPE' + this.template.a + '>';
  };

  return Doctype;
}(Item));

var proto$2 = Doctype.prototype;
proto$2.bind = proto$2.render = proto$2.teardown = proto$2.unbind = proto$2.unrender = proto$2.update = noop;

var Binding = function Binding(element, name) {
  if ( name === void 0 ) name = 'value';

  this.element = element;
  this.ractive = element.ractive;
  this.attribute = element.attributeByName[name];

  var interpolator = this.attribute.interpolator;
  interpolator.twowayBinding = this;

  var model = interpolator.model;

  if (model.isReadonly && !model.setRoot) {
    var keypath = model.getKeypath().replace(/^@/, '');
    warnOnceIfDebug(
      ("Cannot use two-way binding on <" + (element.name) + "> element: " + keypath + " is read-only. To suppress this warning use <" + (element.name) + " twoway='false'...>"),
      { ractive: this.ractive }
    );
    return false;
  }

  this.attribute.isTwoway = true;
  this.model = model;

  // initialise value, if it's undefined
  var value = model.get();
  this.wasUndefined = isUndefined(value);

  if (isUndefined(value) && this.getInitialValue) {
    value = this.getInitialValue();
    model.set(value);
  }
  this.lastVal(true, value);

  var parentForm = findElement(this.element, false, 'form');
  if (parentForm) {
    this.resetValue = value;
    parentForm.formBindings.push(this);
  }
};
var Binding__proto__ = Binding.prototype;

Binding__proto__.bind = function bind () {
  this.model.registerTwowayBinding(this);
};

Binding__proto__.handleChange = function handleChange () {
    var this$1 = this;

  var value = this.getValue();
  if (this.lastVal() === value) { return; }

  runloop.start();
  this.attribute.locked = true;
  this.model.set(value);
  this.lastVal(true, value);

  // if the value changes before observers fire, unlock to be updatable cause something weird and potentially freezy is up
  if (this.model.get() !== value) { this.attribute.locked = false; }
  else { runloop.scheduleTask(function () { return (this$1.attribute.locked = false); }); }

  runloop.end();
};

Binding__proto__.lastVal = function lastVal (setting, value) {
  if (setting) { this.lastValue = value; }
  else { return this.lastValue; }
};

Binding__proto__.rebind = function rebind (next, previous) {
    var this$1 = this;

  if (this.model && this.model === previous) { previous.unregisterTwowayBinding(this); }
  if (next) {
    this.model = next;
    runloop.scheduleTask(function () { return next.registerTwowayBinding(this$1); });
  }
};

Binding__proto__.rebound = function rebound () {
  if (this.model) { this.model.unregisterTwowayBinding(this); }
  this.model = this.attribute.interpolator.model;
  this.model && this.model.registerTwowayBinding(this);
};

Binding__proto__.render = function render () {
  this.node = this.element.node;
  this.node._ractive.binding = this;
  this.rendered = true; // TODO is this used anywhere?
};

Binding__proto__.setFromNode = function setFromNode (node) {
  this.model.set(node.value);
};

Binding__proto__.unbind = function unbind () {
  this.model && this.model.unregisterTwowayBinding(this);
};

Binding.prototype.unrender = noop;

// This is the handler for DOM events that would lead to a change in the model
// (i.e. change, sometimes, input, and occasionally click and keyup)
function handleDomEvent() {
  this._ractive.binding.handleChange();
}

var CheckboxBinding = (function (Binding) {
  function CheckboxBinding(element) {
    Binding.call(this, element, 'checked');
  }

  if ( Binding ) CheckboxBinding.__proto__ = Binding;
  var CheckboxBinding__proto__ = CheckboxBinding.prototype = Object.create( Binding && Binding.prototype );
  CheckboxBinding__proto__.constructor = CheckboxBinding;

  CheckboxBinding__proto__.render = function render () {
    Binding.prototype.render.call(this);

    this.element.on('change', handleDomEvent);

    if (this.node.attachEvent) {
      this.element.on('click', handleDomEvent);
    }
  };

  CheckboxBinding__proto__.unrender = function unrender () {
    this.element.off('change', handleDomEvent);

    if (this.node.attachEvent) {
      this.element.off('click', handleDomEvent);
    }
  };

  CheckboxBinding__proto__.getInitialValue = function getInitialValue () {
    return !!this.element.getAttribute('checked');
  };

  CheckboxBinding__proto__.getValue = function getValue () {
    return this.node.checked;
  };

  CheckboxBinding__proto__.setFromNode = function setFromNode (node) {
    this.model.set(node.checked);
  };

  return CheckboxBinding;
}(Binding));

function getBindingGroup(group, model, getValue) {
  var hash = group + "-bindingGroup";
  return model[hash] || (model[hash] = new BindingGroup(hash, model, getValue));
}

var BindingGroup = function BindingGroup(hash, model, getValue) {
  var this$1 = this;

  this.model = model;
  this.hash = hash;
  this.getValue = function () {
    this$1.value = getValue.call(this$1);
    return this$1.value;
  };

  this.bindings = [];
};
var BindingGroup__proto__ = BindingGroup.prototype;

BindingGroup__proto__.add = function add (binding) {
  this.bindings.push(binding);
};

BindingGroup__proto__.bind = function bind () {
    var this$1 = this;

  this.value = this.model.get();
  this.bindings.forEach(function (b) { return b.lastVal(true, this$1.value); });
  this.model.registerTwowayBinding(this);
  this.bound = true;
};

BindingGroup__proto__.remove = function remove (binding) {
  removeFromArray(this.bindings, binding);
  if (!this.bindings.length) {
    this.unbind();
  }
};

BindingGroup__proto__.unbind = function unbind () {
  this.model.unregisterTwowayBinding(this);
  this.bound = false;
  delete this.model[this.hash];
};

BindingGroup.prototype.rebind = Binding.prototype.rebind;

var push$1 = [].push;

function getValue() {
  var this$1 = this;

  var all = this.bindings
    .filter(function (b) { return b.node && b.node.checked; })
    .map(function (b) { return b.element.getAttribute('value'); });
  var res = [];
  all.forEach(function (v) {
    if (!this$1.bindings[0].arrayContains(res, v)) { res.push(v); }
  });
  return res;
}

var CheckboxNameBinding = (function (Binding) {
  function CheckboxNameBinding(element) {
    Binding.call(this, element, 'name');

    this.checkboxName = true; // so that ractive.updateModel() knows what to do with this

    // Each input has a reference to an array containing it and its
    // group, as two-way binding depends on being able to ascertain
    // the status of all inputs within the group
    this.group = getBindingGroup('checkboxes', this.model, getValue);
    this.group.add(this);

    if (this.noInitialValue) {
      this.group.noInitialValue = true;
    }

    // If no initial value was set, and this input is checked, we
    // update the model
    if (this.group.noInitialValue && this.element.getAttribute('checked')) {
      var existingValue = this.model.get();
      var bindingValue = this.element.getAttribute('value');

      if (!this.arrayContains(existingValue, bindingValue)) {
        push$1.call(existingValue, bindingValue); // to avoid triggering runloop with array adaptor
      }
    }
  }

  if ( Binding ) CheckboxNameBinding.__proto__ = Binding;
  var CheckboxNameBinding__proto__ = CheckboxNameBinding.prototype = Object.create( Binding && Binding.prototype );
  CheckboxNameBinding__proto__.constructor = CheckboxNameBinding;

  CheckboxNameBinding__proto__.bind = function bind () {
    if (!this.group.bound) {
      this.group.bind();
    }
  };

  CheckboxNameBinding__proto__.getInitialValue = function getInitialValue () {
    // This only gets called once per group (of inputs that
    // share a name), because it only gets called if there
    // isn't an initial value. By the same token, we can make
    // a note of that fact that there was no initial value,
    // and populate it using any `checked` attributes that
    // exist (which users should avoid, but which we should
    // support anyway to avoid breaking expectations)
    this.noInitialValue = true; // TODO are noInitialValue and wasUndefined the same thing?
    return [];
  };

  CheckboxNameBinding__proto__.getValue = function getValue () {
    return this.group.value;
  };

  CheckboxNameBinding__proto__.handleChange = function handleChange () {
    this.isChecked = this.element.node.checked;
    this.group.value = this.model.get().slice();
    var value = this.element.getAttribute('value');
    if (this.isChecked && !this.arrayContains(this.group.value, value)) {
      this.group.value.push(value);
    } else if (!this.isChecked && this.arrayContains(this.group.value, value)) {
      this.removeFromArray(this.group.value, value);
    }
    // make sure super knows there's a change
    this.lastValue = null;
    Binding.prototype.handleChange.call(this);
  };

  CheckboxNameBinding__proto__.render = function render () {
    Binding.prototype.render.call(this);

    var node = this.node;

    var existingValue = this.model.get();
    var bindingValue = this.element.getAttribute('value');

    if (isArray(existingValue)) {
      this.isChecked = this.arrayContains(existingValue, bindingValue);
    } else {
      this.isChecked = this.element.compare(existingValue, bindingValue);
    }
    node.name = '{{' + this.model.getKeypath() + '}}';
    node.checked = this.isChecked;

    this.element.on('change', handleDomEvent);

    // in case of IE emergency, bind to click event as well
    if (this.node.attachEvent) {
      this.element.on('click', handleDomEvent);
    }
  };

  CheckboxNameBinding__proto__.setFromNode = function setFromNode (node) {
    this.group.bindings.forEach(function (binding) { return (binding.wasUndefined = true); });

    if (node.checked) {
      var valueSoFar = this.group.getValue();
      valueSoFar.push(this.element.getAttribute('value'));

      this.group.model.set(valueSoFar);
    }
  };

  CheckboxNameBinding__proto__.unbind = function unbind () {
    this.group.remove(this);
  };

  CheckboxNameBinding__proto__.unrender = function unrender () {
    var el = this.element;

    el.off('change', handleDomEvent);

    if (this.node.attachEvent) {
      el.off('click', handleDomEvent);
    }
  };

  CheckboxNameBinding__proto__.arrayContains = function arrayContains (selectValue, optionValue) {
    var this$1 = this;

    var i = selectValue.length;
    while (i--) {
      if (this$1.element.compare(optionValue, selectValue[i])) { return true; }
    }
    return false;
  };

  CheckboxNameBinding__proto__.removeFromArray = function removeFromArray (array, item) {
    var this$1 = this;

    if (!array) { return; }
    var i = array.length;
    while (i--) {
      if (this$1.element.compare(item, array[i])) {
        array.splice(i, 1);
      }
    }
  };

  return CheckboxNameBinding;
}(Binding));

var ContentEditableBinding = (function (Binding) {
  function ContentEditableBinding () {
    Binding.apply(this, arguments);
  }

  if ( Binding ) ContentEditableBinding.__proto__ = Binding;
  var ContentEditableBinding__proto__ = ContentEditableBinding.prototype = Object.create( Binding && Binding.prototype );
  ContentEditableBinding__proto__.constructor = ContentEditableBinding;

  ContentEditableBinding__proto__.getInitialValue = function getInitialValue () {
    return this.element.fragment ? this.element.fragment.toString() : '';
  };

  ContentEditableBinding__proto__.getValue = function getValue () {
    return this.element.node.innerHTML;
  };

  ContentEditableBinding__proto__.render = function render () {
    Binding.prototype.render.call(this);

    var el = this.element;

    el.on('change', handleDomEvent);
    el.on('blur', handleDomEvent);

    if (!this.ractive.lazy) {
      el.on('input', handleDomEvent);

      if (this.node.attachEvent) {
        el.on('keyup', handleDomEvent);
      }
    }
  };

  ContentEditableBinding__proto__.setFromNode = function setFromNode (node) {
    this.model.set(node.innerHTML);
  };

  ContentEditableBinding__proto__.unrender = function unrender () {
    var el = this.element;

    el.off('blur', handleDomEvent);
    el.off('change', handleDomEvent);
    el.off('input', handleDomEvent);
    el.off('keyup', handleDomEvent);
  };

  return ContentEditableBinding;
}(Binding));

function handleBlur() {
  handleDomEvent.call(this);

  var value = this._ractive.binding.model.get();
  this.value = value == undefined ? '' : value;
}

function handleDelay(delay) {
  var timeout;

  return function() {
    var this$1 = this;

    if (timeout) { clearTimeout(timeout); }

    timeout = setTimeout(function () {
      var binding = this$1._ractive.binding;
      if (binding.rendered) { handleDomEvent.call(this$1); }
      timeout = null;
    }, delay);
  };
}

var GenericBinding = (function (Binding) {
  function GenericBinding () {
    Binding.apply(this, arguments);
  }

  if ( Binding ) GenericBinding.__proto__ = Binding;
  var GenericBinding__proto__ = GenericBinding.prototype = Object.create( Binding && Binding.prototype );
  GenericBinding__proto__.constructor = GenericBinding;

  GenericBinding__proto__.getInitialValue = function getInitialValue () {
    return '';
  };

  GenericBinding__proto__.getValue = function getValue () {
    return this.node.value;
  };

  GenericBinding__proto__.render = function render () {
    Binding.prototype.render.call(this);

    // any lazy setting for this element overrides the root
    // if the value is a number, it's a timeout
    var lazy = this.ractive.lazy;
    var timeout = false;
    var el = this.element;

    if ('lazy' in this.element) {
      lazy = this.element.lazy;
    }

    if (isNumeric(lazy)) {
      timeout = +lazy;
      lazy = false;
    }

    this.handler = timeout ? handleDelay(timeout) : handleDomEvent;

    var node = this.node;

    el.on('change', handleDomEvent);

    if (node.type !== 'file') {
      if (!lazy) {
        el.on('input', this.handler);

        // IE is a special snowflake
        if (node.attachEvent) {
          el.on('keyup', this.handler);
        }
      }

      el.on('blur', handleBlur);
    }
  };

  GenericBinding__proto__.unrender = function unrender () {
    var el = this.element;
    this.rendered = false;

    el.off('change', handleDomEvent);
    el.off('input', this.handler);
    el.off('keyup', this.handler);
    el.off('blur', handleBlur);
  };

  return GenericBinding;
}(Binding));

var FileBinding = (function (GenericBinding) {
  function FileBinding () {
    GenericBinding.apply(this, arguments);
  }

  if ( GenericBinding ) FileBinding.__proto__ = GenericBinding;
  var FileBinding__proto__ = FileBinding.prototype = Object.create( GenericBinding && GenericBinding.prototype );
  FileBinding__proto__.constructor = FileBinding;

  FileBinding__proto__.getInitialValue = function getInitialValue () {
    /* istanbul ignore next */
    return undefined;
  };

  FileBinding__proto__.getValue = function getValue () {
    /* istanbul ignore next */
    return this.node.files;
  };

  FileBinding__proto__.render = function render () {
    /* istanbul ignore next */
    this.element.lazy = false;
    /* istanbul ignore next */
    GenericBinding.prototype.render.call(this);
  };

  FileBinding__proto__.setFromNode = function setFromNode (node) {
    /* istanbul ignore next */
    this.model.set(node.files);
  };

  return FileBinding;
}(GenericBinding));

function getSelectedOptions(select) {
  /* istanbul ignore next */
  return select.selectedOptions
    ? toArray(select.selectedOptions)
    : select.options
    ? toArray(select.options).filter(function (option) { return option.selected; })
    : [];
}

var MultipleSelectBinding = (function (Binding) {
  function MultipleSelectBinding () {
    Binding.apply(this, arguments);
  }

  if ( Binding ) MultipleSelectBinding.__proto__ = Binding;
  var MultipleSelectBinding__proto__ = MultipleSelectBinding.prototype = Object.create( Binding && Binding.prototype );
  MultipleSelectBinding__proto__.constructor = MultipleSelectBinding;

  MultipleSelectBinding__proto__.getInitialValue = function getInitialValue () {
    return this.element.options
      .filter(function (option) { return option.getAttribute('selected'); })
      .map(function (option) { return option.getAttribute('value'); });
  };

  MultipleSelectBinding__proto__.getValue = function getValue () {
    var options = this.element.node.options;
    var len = options.length;

    var selectedValues = [];

    for (var i = 0; i < len; i += 1) {
      var option = options[i];

      if (option.selected) {
        var optionValue = option._ractive ? option._ractive.value : option.value;
        selectedValues.push(optionValue);
      }
    }

    return selectedValues;
  };

  MultipleSelectBinding__proto__.handleChange = function handleChange () {
    var attribute = this.attribute;
    var previousValue = attribute.getValue();

    var value = this.getValue();

    if (isUndefined(previousValue) || !arrayContentsMatch(value, previousValue)) {
      Binding.prototype.handleChange.call(this);
    }

    return this;
  };

  MultipleSelectBinding__proto__.render = function render () {
    Binding.prototype.render.call(this);

    this.element.on('change', handleDomEvent);

    if (isUndefined(this.model.get())) {
      // get value from DOM, if possible
      this.handleChange();
    }
  };

  MultipleSelectBinding__proto__.setFromNode = function setFromNode (node) {
    var selectedOptions = getSelectedOptions(node);
    var i = selectedOptions.length;
    var result = new Array(i);

    while (i--) {
      var option = selectedOptions[i];
      result[i] = option._ractive ? option._ractive.value : option.value;
    }

    this.model.set(result);
  };

  MultipleSelectBinding__proto__.unrender = function unrender () {
    this.element.off('change', handleDomEvent);
  };

  return MultipleSelectBinding;
}(Binding));

var NumericBinding = (function (GenericBinding) {
  function NumericBinding () {
    GenericBinding.apply(this, arguments);
  }

  if ( GenericBinding ) NumericBinding.__proto__ = GenericBinding;
  var NumericBinding__proto__ = NumericBinding.prototype = Object.create( GenericBinding && GenericBinding.prototype );
  NumericBinding__proto__.constructor = NumericBinding;

  NumericBinding__proto__.getInitialValue = function getInitialValue () {
    return undefined;
  };

  NumericBinding__proto__.getValue = function getValue () {
    var value = parseFloat(this.node.value);
    return isNaN(value) ? undefined : value;
  };

  NumericBinding__proto__.setFromNode = function setFromNode (node) {
    var value = parseFloat(node.value);
    if (!isNaN(value)) { this.model.set(value); }
  };

  return NumericBinding;
}(GenericBinding));

var siblings = {};

function getSiblings(hash) {
  return siblings[hash] || (siblings[hash] = []);
}

var RadioBinding = (function (Binding) {
  function RadioBinding(element) {
    Binding.call(this, element, 'checked');

    this.siblings = getSiblings(this.ractive._guid + this.element.getAttribute('name'));
    this.siblings.push(this);
  }

  if ( Binding ) RadioBinding.__proto__ = Binding;
  var RadioBinding__proto__ = RadioBinding.prototype = Object.create( Binding && Binding.prototype );
  RadioBinding__proto__.constructor = RadioBinding;

  RadioBinding__proto__.getValue = function getValue () {
    return this.node.checked;
  };

  RadioBinding__proto__.handleChange = function handleChange () {
    runloop.start();

    this.siblings.forEach(function (binding) {
      binding.model.set(binding.getValue());
    });

    runloop.end();
  };

  RadioBinding__proto__.render = function render () {
    Binding.prototype.render.call(this);

    this.element.on('change', handleDomEvent);

    if (this.node.attachEvent) {
      this.element.on('click', handleDomEvent);
    }
  };

  RadioBinding__proto__.setFromNode = function setFromNode (node) {
    this.model.set(node.checked);
  };

  RadioBinding__proto__.unbind = function unbind () {
    removeFromArray(this.siblings, this);
  };

  RadioBinding__proto__.unrender = function unrender () {
    this.element.off('change', handleDomEvent);

    if (this.node.attachEvent) {
      this.element.off('click', handleDomEvent);
    }
  };

  return RadioBinding;
}(Binding));

function getValue$1() {
  var checked = this.bindings.filter(function (b) { return b.node.checked; });
  if (checked.length > 0) {
    return checked[0].element.getAttribute('value');
  }
}

var RadioNameBinding = (function (Binding) {
  function RadioNameBinding(element) {
    var this$1 = this;

    Binding.call(this, element, 'name');

    this.group = getBindingGroup('radioname', this.model, getValue$1);
    this.group.add(this);

    if (element.checked) {
      this.group.value = this.getValue();
    }

    this.attribute.interpolator.pathChanged = function () { return this$1.updateName(); };
  }

  if ( Binding ) RadioNameBinding.__proto__ = Binding;
  var RadioNameBinding__proto__ = RadioNameBinding.prototype = Object.create( Binding && Binding.prototype );
  RadioNameBinding__proto__.constructor = RadioNameBinding;

  RadioNameBinding__proto__.bind = function bind () {
    if (!this.group.bound) {
      this.group.bind();
    }
  };

  RadioNameBinding__proto__.getInitialValue = function getInitialValue () {
    if (this.element.getAttribute('checked')) {
      return this.element.getAttribute('value');
    }
  };

  RadioNameBinding__proto__.getValue = function getValue () {
    return this.element.getAttribute('value');
  };

  RadioNameBinding__proto__.handleChange = function handleChange () {
    // If this <input> is the one that's checked, then the value of its
    // `name` model gets set to its value
    if (this.node.checked) {
      this.group.value = this.getValue();
      Binding.prototype.handleChange.call(this);
    }

    this.updateName();
  };

  RadioNameBinding__proto__.lastVal = function lastVal (setting, value) {
    if (!this.group) { return; }
    if (setting) { this.group.lastValue = value; }
    else { return this.group.lastValue; }
  };

  RadioNameBinding__proto__.rebind = function rebind (next, previous) {
    Binding.prototype.rebind.call(this, next, previous);
    this.updateName();
  };

  RadioNameBinding__proto__.rebound = function rebound (update) {
    Binding.prototype.rebound.call(this, update);
    this.updateName();
  };

  RadioNameBinding__proto__.render = function render () {
    Binding.prototype.render.call(this);

    var node = this.node;

    this.updateName();
    node.checked = this.element.compare(this.model.get(), this.element.getAttribute('value'));

    this.element.on('change', handleDomEvent);

    if (node.attachEvent) {
      this.element.on('click', handleDomEvent);
    }
  };

  RadioNameBinding__proto__.setFromNode = function setFromNode (node) {
    if (node.checked) {
      this.group.model.set(this.element.getAttribute('value'));
    }
  };

  RadioNameBinding__proto__.unbind = function unbind () {
    this.group.remove(this);
  };

  RadioNameBinding__proto__.unrender = function unrender () {
    var el = this.element;

    el.off('change', handleDomEvent);

    if (this.node.attachEvent) {
      el.off('click', handleDomEvent);
    }
  };

  RadioNameBinding__proto__.updateName = function updateName () {
    if (this.node) { this.node.name = "{{" + (this.model.getKeypath()) + "}}"; }
  };

  return RadioNameBinding;
}(Binding));

var SingleSelectBinding = (function (Binding) {
  function SingleSelectBinding () {
    Binding.apply(this, arguments);
  }

  if ( Binding ) SingleSelectBinding.__proto__ = Binding;
  var SingleSelectBinding__proto__ = SingleSelectBinding.prototype = Object.create( Binding && Binding.prototype );
  SingleSelectBinding__proto__.constructor = SingleSelectBinding;

  SingleSelectBinding__proto__.forceUpdate = function forceUpdate () {
    var this$1 = this;

    var value = this.getValue();

    if (value !== undefined) {
      this.attribute.locked = true;
      runloop.scheduleTask(function () { return (this$1.attribute.locked = false); });
      this.model.set(value);
    }
  };

  SingleSelectBinding__proto__.getInitialValue = function getInitialValue () {
    if (this.element.getAttribute('value') !== undefined) {
      return;
    }

    var options = this.element.options;
    var len = options.length;

    if (!len) { return; }

    var value;
    var optionWasSelected;
    var i = len;

    // take the final selected option...
    while (i--) {
      var option = options[i];

      if (option.getAttribute('selected')) {
        if (!option.getAttribute('disabled')) {
          value = option.getAttribute('value');
        }

        optionWasSelected = true;
        break;
      }
    }

    // or the first non-disabled option, if none are selected
    if (!optionWasSelected) {
      while (++i < len) {
        if (!options[i].getAttribute('disabled')) {
          value = options[i].getAttribute('value');
          break;
        }
      }
    }

    // This is an optimisation (aka hack) that allows us to forgo some
    // other more expensive work
    // TODO does it still work? seems at odds with new architecture
    if (value !== undefined) {
      this.element.attributeByName.value.value = value;
    }

    return value;
  };

  SingleSelectBinding__proto__.getValue = function getValue () {
    var options = this.node.options;
    var len = options.length;

    var i;
    for (i = 0; i < len; i += 1) {
      var option = options[i];

      if (options[i].selected && !options[i].disabled) {
        return option._ractive ? option._ractive.value : option.value;
      }
    }
  };

  SingleSelectBinding__proto__.render = function render () {
    Binding.prototype.render.call(this);
    this.element.on('change', handleDomEvent);
  };

  SingleSelectBinding__proto__.setFromNode = function setFromNode (node) {
    var option = getSelectedOptions(node)[0];
    this.model.set(option._ractive ? option._ractive.value : option.value);
  };

  SingleSelectBinding__proto__.unrender = function unrender () {
    this.element.off('change', handleDomEvent);
  };

  return SingleSelectBinding;
}(Binding));

function isBindable(attribute) {
  // The fragment must be a single non-string fragment
  if (
    !attribute ||
    !attribute.template.f ||
    attribute.template.f.length !== 1 ||
    attribute.template.f[0].s
  )
    { return false; }

  // A binding is an interpolator `{{ }}`, yey.
  if (attribute.template.f[0].t === INTERPOLATOR) { return true; }

  // The above is probably the only true case. For the rest, show an appropriate
  // warning before returning false.

  // You can't bind a triple curly. HTML values on an attribute makes no sense.
  if (attribute.template.f[0].t === TRIPLE)
    { warnIfDebug('It is not possible create a binding using a triple mustache.'); }

  return false;
}

function selectBinding(element) {
  var name = element.name;
  var attributes = element.attributeByName;
  if (name !== 'input' && name !== 'textarea' && name !== 'select' && !attributes.contenteditable)
    { return; }
  var isBindableByValue = isBindable(attributes.value);
  var isBindableByContentEditable = isBindable(attributes.contenteditable);
  var isContentEditable = element.getAttribute('contenteditable');

  // contenteditable
  // Bind if the contenteditable is true or a binding that may become true.
  if ((isContentEditable || isBindableByContentEditable) && isBindableByValue)
    { return ContentEditableBinding; }

  // <input>
  if (name === 'input') {
    var type = element.getAttribute('type');

    if (type === 'radio') {
      var isBindableByName = isBindable(attributes.name);
      var isBindableByChecked = isBindable(attributes.checked);

      // For radios we can either bind the name or checked, but not both.
      // Name binding is handed instead.
      if (isBindableByName && isBindableByChecked) {
        warnIfDebug(
          'A radio input can have two-way binding on its name attribute, or its checked attribute - not both',
          { ractive: element.root }
        );
        return RadioNameBinding;
      }

      if (isBindableByName) { return RadioNameBinding; }

      if (isBindableByChecked) { return RadioBinding; }

      // Dead end. Unknown binding on radio input.
      return null;
    }

    if (type === 'checkbox') {
      var isBindableByName$1 = isBindable(attributes.name);
      var isBindableByChecked$1 = isBindable(attributes.checked);

      // A checkbox with bindings for both name and checked. Checked treated as
      // the checkbox value, name is treated as a regular binding.
      //
      // See https://github.com/ractivejs/ractive/issues/1749
      if (isBindableByName$1 && isBindableByChecked$1) { return CheckboxBinding; }

      if (isBindableByName$1) { return CheckboxNameBinding; }

      if (isBindableByChecked$1) { return CheckboxBinding; }

      // Dead end. Unknown binding on checkbox input.
      return null;
    }

    if (type === 'file' && isBindableByValue) { return FileBinding; }

    if (type === 'number' && isBindableByValue) { return NumericBinding; }

    if (type === 'range' && isBindableByValue) { return NumericBinding; }

    // Some input of unknown type (browser usually falls back to text).
    if (isBindableByValue) { return GenericBinding; }

    // Dead end. Some unknown input and an unbindable.
    return null;
  }

  // <select>
  if (name === 'select' && isBindableByValue) {
    return element.getAttribute('multiple') ? MultipleSelectBinding : SingleSelectBinding;
  }

  // <textarea>
  if (name === 'textarea' && isBindableByValue) { return GenericBinding; }

  // Dead end. Some unbindable element.
  return null;
}

var endsWithSemi = /;\s*$/;

var Element = (function (ContainerItem) {
  function Element(options) {
    var this$1 = this;

    ContainerItem.call(this, options);

    this.name = options.template.e.toLowerCase();

    // find parent element
    this.parent = findElement(this.up, false);

    if (this.parent && this.parent.name === 'option') {
      throw new Error(
        ("An <option> element cannot contain other elements (encountered <" + (this.name) + ">)")
      );
    }

    this.decorators = [];

    // create attributes
    this.attributeByName = {};

    var attrs;
    var n, attr, val, cls, name, template, leftovers;

    var m = this.template.m;
    var len = (m && m.length) || 0;

    for (var i = 0; i < len; i++) {
      template = m[i];
      if (template.g) {
        (this$1.statics || (this$1.statics = {}))[template.n] = isString(template.f)
          ? template.f
          : template.n;
      } else {
        switch (template.t) {
          case ATTRIBUTE:
          case BINDING_FLAG:
          case DECORATOR:
          case EVENT:
          case TRANSITION:
            attr = createItem({
              owner: this$1,
              up: this$1.up,
              template: template
            });

            n = template.n;

            attrs = attrs || (attrs = this$1.attributes = []);

            if (n === 'value') { val = attr; }
            else if (n === 'name') { name = attr; }
            else if (n === 'class') { cls = attr; }
            else { attrs.push(attr); }

            break;

          case DELEGATE_FLAG:
            this$1.delegate = false;
            break;

          default:
            (leftovers || (leftovers = [])).push(template);
            break;
        }
      }
    }

    if (val) { attrs.push(val); }
    if (name) { attrs.push(name); }
    if (cls) { attrs.unshift(cls); }

    if (leftovers) {
      (attrs || (this.attributes = [])).push(
        new ConditionalAttribute({
          owner: this,
          up: this.up,
          template: leftovers
        })
      );

      // empty leftovers array
      leftovers = [];
    }

    // create children
    if (options.template.f && !options.deferContent) {
      this.fragment = new Fragment({
        template: options.template.f,
        owner: this,
        cssIds: null
      });
    }

    this.binding = null; // filled in later
  }

  if ( ContainerItem ) Element.__proto__ = ContainerItem;
  var Element__proto__ = Element.prototype = Object.create( ContainerItem && ContainerItem.prototype );
  Element__proto__.constructor = Element;

  Element__proto__.bind = function bind () {
    var attrs = this.attributes;
    if (attrs) {
      attrs.binding = true;
      var len = attrs.length;
      for (var i = 0; i < len; i++) { attrs[i].bind(); }
      attrs.binding = false;
    }

    if (this.fragment) { this.fragment.bind(); }

    // create two-way binding if necessary
    if (!this.binding) { this.recreateTwowayBinding(); }
    else { this.binding.bind(); }
  };

  Element__proto__.createTwowayBinding = function createTwowayBinding () {
    if ('twoway' in this ? this.twoway : this.ractive.twoway) {
      var Binding = selectBinding(this);
      if (Binding) {
        var binding = new Binding(this);
        if (binding && binding.model) { return binding; }
      }
    }
  };

  Element__proto__.destroyed = function destroyed$1 () {
    if (this.attributes) { this.attributes.forEach(destroyed); }
    if (this.fragment) { this.fragment.destroyed(); }
  };

  Element__proto__.detach = function detach () {
    // if this element is no longer rendered, the transitions are complete and the attributes can be torn down
    if (!this.rendered) { this.destroyed(); }

    return detachNode(this.node);
  };

  Element__proto__.find = function find (selector, options) {
    if (this.node && matches(this.node, selector)) { return this.node; }
    if (this.fragment) {
      return this.fragment.find(selector, options);
    }
  };

  Element__proto__.findAll = function findAll (selector, options) {
    var result = options.result;

    if (matches(this.node, selector)) {
      result.push(this.node);
    }

    if (this.fragment) {
      this.fragment.findAll(selector, options);
    }
  };

  Element__proto__.findNextNode = function findNextNode () {
    return null;
  };

  Element__proto__.firstNode = function firstNode () {
    return this.node;
  };

  Element__proto__.getAttribute = function getAttribute (name) {
    if (this.statics && name in this.statics) { return this.statics[name]; }
    var attribute = this.attributeByName[name];
    return attribute ? attribute.getValue() : undefined;
  };

  Element__proto__.getContext = function getContext () {
    var assigns = [], len = arguments.length;
    while ( len-- ) assigns[ len ] = arguments[ len ];

    if (this.fragment) { return (ref = this.fragment).getContext.apply(ref, assigns); }

    if (!this.ctx) { this.ctx = new Context(this.up, this); }
    assigns.unshift(create(this.ctx));
    return assign.apply(null, assigns);
    var ref;
  };

  Element__proto__.off = function off (event, callback, capture) {
    if ( capture === void 0 ) capture = false;

    var delegate = this.up.delegate;
    var ref = this.listeners && this.listeners[event];

    if (!ref) { return; }
    removeFromArray(ref, callback);

    if (delegate) {
      var listeners =
        (delegate.listeners || (delegate.listeners = [])) &&
        (delegate.listeners[event] || (delegate.listeners[event] = []));
      if (listeners.refs && !--listeners.refs) { delegate.off(event, delegateHandler, true); }
    } else if (this.rendered) {
      var n = this.node;
      var add = n.addEventListener;
      var rem = n.removeEventListener;

      if (!ref.length) {
        rem.call(n, event, handler, capture);
      } else if (ref.length && !ref.refs && capture) {
        rem.call(n, event, handler, true);
        add.call(n, event, handler, false);
      }
    }
  };

  Element__proto__.on = function on (event, callback, capture) {
    if ( capture === void 0 ) capture = false;

    var delegate = this.up.delegate;
    var ref = (this.listeners || (this.listeners = {}))[event] || (this.listeners[event] = []);

    if (delegate) {
      var listeners =
        ((delegate.listeners || (delegate.listeners = [])) && delegate.listeners[event]) ||
        (delegate.listeners[event] = []);
      if (!listeners.refs) {
        listeners.refs = 0;
        delegate.on(event, delegateHandler, true);
        listeners.refs++;
      } else {
        listeners.refs++;
      }
    } else if (this.rendered) {
      var n = this.node;
      var add = n.addEventListener;
      var rem = n.removeEventListener;

      if (!ref.length) {
        add.call(n, event, handler, capture);
      } else if (ref.length && !ref.refs && capture) {
        rem.call(n, event, handler, false);
        add.call(n, event, handler, true);
      }
    }

    addToArray(this.listeners[event], callback);
  };

  Element__proto__.recreateTwowayBinding = function recreateTwowayBinding () {
    if (this.binding) {
      this.binding.unbind();
      this.binding.unrender();
    }

    if ((this.binding = this.createTwowayBinding())) {
      this.binding.bind();
      if (this.rendered) { this.binding.render(); }
    }
  };

  Element__proto__.rebound = function rebound (update$$1) {
    ContainerItem.prototype.rebound.call(this, update$$1);
    if (this.attributes) { this.attributes.forEach(function (x) { return x.rebound(update$$1); }); }
    if (this.binding) { this.binding.rebound(update$$1); }
  };

  Element__proto__.render = function render (target, occupants) {
    var this$1 = this;

    // TODO determine correct namespace
    this.namespace = getNamespace(this);

    var node;
    var existing = false;

    if (occupants) {
      var n;
      while ((n = occupants.shift())) {
        if (
          n.nodeName.toUpperCase() === this$1.template.e.toUpperCase() &&
          n.namespaceURI === this$1.namespace
        ) {
          this$1.node = node = n;
          existing = true;
          break;
        } else {
          detachNode(n);
        }
      }
    }

    if (!existing && this.node) {
      node = this.node;
      target.appendChild(node);
      existing = true;
    }

    if (!node) {
      var name = this.template.e;
      node = createElement(
        this.namespace === html ? name.toLowerCase() : name,
        this.namespace,
        this.getAttribute('is')
      );
      this.node = node;
    }

    // tie the node to this vdom element
    defineProperty(node, '_ractive', {
      value: {
        proxy: this
      },
      configurable: true
    });

    if (this.statics) {
      keys(this.statics).forEach(function (k) {
        node.setAttribute(k, this$1.statics[k]);
      });
    }

    if (existing && this.foundNode) { this.foundNode(node); }

    // register intro before rendering content so children can find the intro
    var intro = this.intro;
    if (intro && intro.shouldFire('intro')) {
      intro.isIntro = true;
      intro.isOutro = false;
      runloop.registerTransition(intro);
    }

    if (this.fragment) {
      var children = existing ? toArray(node.childNodes) : undefined;

      this.fragment.render(node, children);

      // clean up leftover children
      if (children) {
        children.forEach(detachNode);
      }
    }

    if (existing) {
      // store initial values for two-way binding
      if (this.binding && this.binding.wasUndefined) { this.binding.setFromNode(node); }
      // remove unused attributes
      var i = node.attributes.length;
      while (i--) {
        var name$1 = node.attributes[i].name;
        if (!(name$1 in this$1.attributeByName) && (!this$1.statics || !(name$1 in this$1.statics)))
          { node.removeAttribute(name$1); }
      }
    }

    // Is this a top-level node of a component? If so, we may need to add
    // a data-ractive-css attribute, for CSS encapsulation
    if (this.up.cssIds) {
      node.setAttribute('data-ractive-css', this.up.cssIds.map(function (x) { return ("{" + x + "}"); }).join(' '));
    }

    if (this.attributes) {
      var len = this.attributes.length;
      for (var i$1 = 0; i$1 < len; i$1++) { this$1.attributes[i$1].render(); }
    }
    if (this.binding) { this.binding.render(); }

    if (!this.up.delegate && this.listeners) {
      var ls = this.listeners;
      for (var k in ls) {
        if (ls[k] && ls[k].length) { this$1.node.addEventListener(k, handler, !!ls[k].refs); }
      }
    }

    if (!existing) {
      target.appendChild(node);
    }

    this.rendered = true;
  };

  Element__proto__.toString = function toString () {
    var this$1 = this;

    var tagName = this.template.e;

    var attrs = (this.attributes && this.attributes.map(stringifyAttribute).join('')) || '';

    if (this.statics)
      { keys(this.statics).forEach(
        function (k) { return k !== 'class' &&
          k !== 'style' &&
          (attrs = " " + k + "=\"" + (safeAttributeString(this$1.statics[k])) + "\"" + attrs); }
      ); }

    // Special case - selected options
    if (this.name === 'option' && this.isSelected()) {
      attrs += ' selected';
    }

    // Special case - two-way radio name bindings
    if (this.name === 'input' && inputIsCheckedRadio(this)) {
      attrs += ' checked';
    }

    // Special case style and class attributes and directives
    var style = this.statics ? this.statics.style : undefined;
    var cls = this.statics ? this.statics.class : undefined;
    this.attributes &&
      this.attributes.forEach(function (attr) {
        if (attr.name === 'class') {
          cls = (cls || '') + (cls ? ' ' : '') + safeAttributeString(attr.getString());
        } else if (attr.name === 'style') {
          style = (style || '') + (style ? ' ' : '') + safeAttributeString(attr.getString());
          if (style && !endsWithSemi.test(style)) { style += ';'; }
        } else if (attr.style) {
          style =
            (style || '') +
            (style ? ' ' : '') +
            (attr.style) + ": " + (safeAttributeString(attr.getString())) + ";";
        } else if (attr.inlineClass && attr.getValue()) {
          cls = (cls || '') + (cls ? ' ' : '') + attr.inlineClass;
        }
      });
    // put classes first, then inline style
    if (style !== undefined) { attrs = ' style' + (style ? ("=\"" + style + "\"") : '') + attrs; }
    if (cls !== undefined) { attrs = ' class' + (cls ? ("=\"" + cls + "\"") : '') + attrs; }

    if (this.up.cssIds) {
      attrs += " data-ractive-css=\"" + (this.up.cssIds.map(function (x) { return ("{" + x + "}"); }).join(' ')) + "\"";
    }

    var str = "<" + tagName + attrs + ">";

    if (voidElements[this.name.toLowerCase()]) { return str; }

    // Special case - textarea
    if (this.name === 'textarea' && this.getAttribute('value') !== undefined) {
      str += escapeHtml(this.getAttribute('value'));
    } else if (this.getAttribute('contenteditable') !== undefined) {
      // Special case - contenteditable
      str += this.getAttribute('value') || '';
    }

    if (this.fragment) {
      str += this.fragment.toString(!/^(?:script|style)$/i.test(this.template.e)); // escape text unless script/style
    }

    str += "</" + tagName + ">";
    return str;
  };

  Element__proto__.unbind = function unbind (view) {
    var attrs = this.attributes;
    if (attrs) {
      attrs.unbinding = true;
      var len = attrs.length;
      for (var i = 0; i < len; i++) { attrs[i].unbind(view); }
      attrs.unbinding = false;
    }

    if (this.binding) { this.binding.unbind(view); }
    if (this.fragment) { this.fragment.unbind(view); }
  };

  Element__proto__.unrender = function unrender (shouldDestroy) {
    if (!this.rendered) { return; }
    this.rendered = false;

    // unrendering before intro completed? complete it now
    // TODO should be an API for aborting transitions
    var transition = this.intro;
    if (transition && transition.complete) { transition.complete(); }

    // Detach as soon as we can
    if (this.name === 'option') {
      // <option> elements detach immediately, so that
      // their parent <select> element syncs correctly, and
      // since option elements can't have transitions anyway
      this.detach();
    } else if (shouldDestroy) {
      runloop.detachWhenReady(this);
    }

    // outro transition
    var outro = this.outro;
    if (outro && outro.shouldFire('outro')) {
      outro.isIntro = false;
      outro.isOutro = true;
      runloop.registerTransition(outro);
    }

    if (this.fragment) { this.fragment.unrender(); }

    if (this.binding) { this.binding.unrender(); }
  };

  Element__proto__.update = function update () {
    if (this.dirty) {
      this.dirty = false;

      var attrs = this.attributes;
      if (attrs) {
        var len = attrs.length;
        for (var i = 0; i < len; i++) { attrs[i].update(); }
      }

      if (this.fragment) { this.fragment.update(); }
    }
  };

  return Element;
}(ContainerItem));

function inputIsCheckedRadio(element) {
  var nameAttr = element.attributeByName.name;
  return (
    element.getAttribute('type') === 'radio' &&
    (nameAttr || {}).interpolator &&
    element.getAttribute('value') === nameAttr.interpolator.model.get()
  );
}

function stringifyAttribute(attribute) {
  var str = attribute.toString();
  return str ? ' ' + str : '';
}

function getNamespace(element) {
  // Use specified namespace...
  var xmlns$$1 = element.getAttribute('xmlns');
  if (xmlns$$1) { return xmlns$$1; }

  // ...or SVG namespace, if this is an <svg> element
  if (element.name === 'svg') { return svg$1; }

  var parent = element.parent;

  if (parent) {
    // ...or HTML, if the parent is a <foreignObject>
    if (parent.name === 'foreignobject') { return html; }

    // ...or inherit from the parent node
    return parent.node.namespaceURI;
  }

  return element.ractive.el.namespaceURI;
}

function delegateHandler(ev) {
  var name = ev.type;
  var end = ev.currentTarget;
  var endEl = end._ractive && end._ractive.proxy;
  var node = ev.target;
  var bubble = true;
  var listeners;

  // starting with the origin node, walk up the DOM looking for ractive nodes with a matching event listener
  while (bubble && node && node !== end) {
    var proxy = node._ractive && node._ractive.proxy;
    if (proxy && proxy.up.delegate === endEl && shouldFire(ev, node, end)) {
      listeners = proxy.listeners && proxy.listeners[name];

      if (listeners) {
        var len = listeners.length;
        for (var i = 0; i < len; i++) { bubble = listeners[i].call(node, ev) !== false && bubble; }
      }
    }

    node = node.parentNode || node.correspondingUseElement; // SVG with a <use> element in certain environments
  }

  return bubble;
}

var UIEvent = win !== null ? win.UIEvent : null;
function shouldFire(event, start, end) {
  if (UIEvent && event instanceof UIEvent) {
    var node = start;
    while (node && node !== end) {
      if (node.disabled) { return false; }
      node = node.parentNode || node.correspondingUseElement;
    }
  }

  return true;
}

function handler(ev) {
  var this$1 = this;

  var el = this._ractive.proxy;
  var listeners;
  if (el.listeners && (listeners = el.listeners[ev.type])) {
    var len = listeners.length;
    for (var i = 0; i < len; i++) { listeners[i].call(this$1, ev); }
  }
}

var Form = (function (Element) {
  function Form(options) {
    Element.call(this, options);
    this.formBindings = [];
  }

  if ( Element ) Form.__proto__ = Element;
  var Form__proto__ = Form.prototype = Object.create( Element && Element.prototype );
  Form__proto__.constructor = Form;

  Form__proto__.render = function render (target, occupants) {
    Element.prototype.render.call(this, target, occupants);
    this.on('reset', handleReset);
  };

  Form__proto__.unrender = function unrender (shouldDestroy) {
    this.off('reset', handleReset);
    Element.prototype.unrender.call(this, shouldDestroy);
  };

  return Form;
}(Element));

function handleReset() {
  var element = this._ractive.proxy;

  runloop.start();
  element.formBindings.forEach(updateModel);
  runloop.end();
}

function updateModel(binding) {
  binding.model.set(binding.resetValue);
}

var DOMEvent = function DOMEvent(name, owner) {
  if (name.indexOf('*') !== -1) {
    fatal(
      ("Only component proxy-events may contain \"*\" wildcards, <" + (owner.name) + " on-" + name + "=\"...\"/> is not valid")
    );
  }

  this.name = name;
  this.owner = owner;
  this.handler = null;
};
var DOMEvent__proto__ = DOMEvent.prototype;

DOMEvent__proto__.bind = function bind () {};

DOMEvent__proto__.render = function render (directive) {
    var this$1 = this;

  var name = this.name;

  var register = function () {
    var node = this$1.owner.node;

    this$1.owner.on(
      name,
      (this$1.handler = function (event) {
        return directive.fire({
          node: node,
          original: event,
          event: event,
          name: name
        });
      })
    );
  };

  if (name !== 'load') {
    // schedule events so that they take place after twoway binding
    runloop.scheduleTask(register, true);
  } else {
    // unless its a load event
    register();
  }
};

DOMEvent__proto__.unbind = function unbind () {};

DOMEvent__proto__.unrender = function unrender () {
  if (this.handler) { this.owner.off(this.name, this.handler); }
};

var CustomEvent = function CustomEvent(eventPlugin, owner, name, args) {
  this.eventPlugin = eventPlugin;
  this.owner = owner;
  this.name = name;
  this.handler = null;
  this.args = args;
};
var CustomEvent__proto__ = CustomEvent.prototype;

CustomEvent__proto__.bind = function bind () {};

CustomEvent__proto__.render = function render (directive) {
    var this$1 = this;

  runloop.scheduleTask(function () {
    var node = this$1.owner.node;

    this$1.handler = this$1.eventPlugin.apply(
      this$1.owner.ractive,
      [
        node,
        function (event) {
            if ( event === void 0 ) event = {};

          if (event.original) { event.event = event.original; }
          else { event.original = event.event; }

          event.name = this$1.name;
          event.node = event.node || node;
          return directive.fire(event);
        }
      ].concat(this$1.args || [])
    );
  });
};

CustomEvent__proto__.unbind = function unbind () {};

CustomEvent__proto__.unrender = function unrender () {
  this.handler.teardown();
};

var RactiveEvent = function RactiveEvent(component, name) {
  this.component = component;
  this.name = name;
  this.handler = null;
};
var RactiveEvent__proto__ = RactiveEvent.prototype;

RactiveEvent__proto__.bind = function bind (directive) {
  var ractive = this.component.instance;

  this.handler = ractive.on(this.name, function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    // watch for reproxy
    if (args[0] instanceof Context) {
      var ctx = args.shift();
      ctx.component = ractive;
      directive.fire(ctx, args);
    } else {
      directive.fire({}, args);
    }

    // cancel bubbling
    return false;
  });
};

RactiveEvent__proto__.render = function render () {};

RactiveEvent__proto__.unbind = function unbind () {
  this.handler.cancel();
};

RactiveEvent__proto__.unrender = function unrender () {};

var specialPattern = /^(event|arguments|@node|@event|@context)(\..+)?$/;
var dollarArgsPattern = /^\$(\d+)(\..+)?$/;

var EventDirective = function EventDirective(options) {
  this.owner = options.owner || options.up.owner || findElement(options.up);
  this.element = this.owner.attributeByName ? this.owner : findElement(options.up, true);
  this.template = options.template;
  this.up = options.up;
  this.ractive = options.up.ractive;
  this.events = [];
};
var EventDirective__proto__ = EventDirective.prototype;

EventDirective__proto__.bind = function bind () {
    var this$1 = this;

  // sometimes anchors will cause an unbind without unrender
  if (this.events.length) {
    this.events.forEach(function (e) { return e.unrender(); });
    this.events = [];
  }

  if (this.element.type === COMPONENT || this.element.type === ANCHOR) {
    this.template.n.forEach(function (n) {
      this$1.events.push(new RactiveEvent(this$1.element, n));
    });
  } else {
    var args;
    if ((args = this.template.a)) {
      var rs = args.r.map(function (r) {
        var model = resolveReference(this$1.up, r);
        return model ? model.get() : undefined;
      });
      try {
        args = getFunction(args.s, rs.length).apply(null, rs);
      } catch (err) {
        args = null;
        warnIfDebug(
          ("Failed to compute args for event on-" + (this.template.n.join('- ')) + ": " + (err.message ||
            err))
        );
      }
    }

    this.template.n.forEach(function (n) {
      var fn = findInViewHierarchy('events', this$1.ractive, n);
      if (fn) {
        this$1.events.push(new CustomEvent(fn, this$1.element, n, args));
      } else {
        this$1.events.push(new DOMEvent(n, this$1.element));
      }
    });
  }

  // method calls
  this.models = null;

  addToArray(this.element.events || (this.element.events = []), this);

  setupArgsFn(this, this.template);
  if (!this.fn) { this.action = this.template.f; }

  this.events.forEach(function (e) { return e.bind(this$1); });
};

EventDirective__proto__.destroyed = function destroyed () {
  this.events.forEach(function (e) { return e.unrender(); });
};

EventDirective__proto__.fire = function fire (event, args) {
    var this$1 = this;
    if ( args === void 0 ) args = [];

  var context =
    event instanceof Context && event.refire ? event : this.element.getContext(event);

  if (this.fn) {
    var values = [];

    var models = resolveArgs(this, this.template, this.up, {
      specialRef: function specialRef(ref) {
        var specialMatch = specialPattern.exec(ref);
        if (specialMatch) {
          // on-click="foo(event.node)"
          return {
            special: specialMatch[1],
            keys: specialMatch[2] ? splitKeypath(specialMatch[2].substr(1)) : []
          };
        }

        var dollarMatch = dollarArgsPattern.exec(ref);
        if (dollarMatch) {
          // on-click="foo($1)"
          return {
            special: 'arguments',
            keys: [dollarMatch[1] - 1].concat(
              dollarMatch[2] ? splitKeypath(dollarMatch[2].substr(1)) : []
            )
          };
        }
      }
    });

    if (models) {
      models.forEach(function (model) {
        if (!model) { return values.push(undefined); }

        if (model.special) {
          var which = model.special;
          var obj;

          if (which === '@node') {
            obj = this$1.element.node;
          } else if (which === '@event') {
            obj = event && event.event;
          } else if (which === 'event') {
            warnOnceIfDebug(
              "The event reference available to event directives is deprecated and should be replaced with @context and @event"
            );
            obj = context;
          } else if (which === '@context') {
            obj = context;
          } else {
            obj = args;
          }

          var keys = model.keys.slice();

          while (obj && keys.length) { obj = obj[keys.shift()]; }
          return values.push(obj);
        }

        if (model.wrapper) {
          return values.push(model.wrapperValue);
        }

        values.push(model.get());
      });
    }

    // make event available as `this.event`
    var ractive = this.ractive;
    var oldEvent = ractive.event;

    ractive.event = context;
    var returned = this.fn.apply(ractive, values);
    var result = returned.pop();

    // Auto prevent and stop if return is explicitly false
    if (result === false) {
      var original = event ? event.original : undefined;
      if (original) {
        original.preventDefault && original.preventDefault();
        original.stopPropagation && original.stopPropagation();
      } else {
        warnOnceIfDebug(
          ("handler '" + (this.template.n.join(
            ' '
          )) + "' returned false, but there is no event available to cancel")
        );
      }
    } else if (!returned.length && isArray(result) && isString(result[0])) {
      // watch for proxy events
      result = fireEvent(this.ractive, result.shift(), context, result);
    }

    ractive.event = oldEvent;

    return result;
  } else {
    return fireEvent(this.ractive, this.action, context, args);
  }
};

EventDirective__proto__.handleChange = function handleChange () {};

EventDirective__proto__.render = function render () {
    var this$1 = this;

  this.events.forEach(function (e) { return e.render(this$1); });
};

EventDirective__proto__.toString = function toString () {
  return '';
};

EventDirective__proto__.unbind = function unbind (view) {
  removeFromArray(this.element.events, this);
  this.events.forEach(function (e) { return e.unbind(view); });
};

EventDirective__proto__.unrender = function unrender () {
  this.events.forEach(function (e) { return e.unrender(); });
};

var proto$3 = EventDirective.prototype;
proto$3.firstNode = proto$3.rebound = proto$3.update = noop;

function progressiveText(item, target, occupants, text) {
  if (occupants) {
    var n = occupants[0];
    if (n && n.nodeType === 3) {
      var idx = n.nodeValue.indexOf(text);
      occupants.shift();

      if (idx === 0) {
        if (n.nodeValue.length !== text.length) {
          occupants.unshift(n.splitText(text.length));
        }
      } else {
        n.nodeValue = text;
      }
    } else {
      n = item.node = doc.createTextNode(text);
      if (occupants[0]) {
        target.insertBefore(n, occupants[0]);
      } else {
        target.appendChild(n);
      }
    }

    item.node = n;
  } else {
    if (!item.node) { item.node = doc.createTextNode(text); }
    target.appendChild(item.node);
  }
}

var ComputationChild = (function (Model) {
  function ComputationChild(parent, key) {
    Model.call(this, parent, key);

    this.isReadonly = !this.root.ractive.syncComputedChildren;
    this.dirty = true;
    this.isComputed = true;
  }

  if ( Model ) ComputationChild.__proto__ = Model;
  var ComputationChild__proto__ = ComputationChild.prototype = Object.create( Model && Model.prototype );
  ComputationChild__proto__.constructor = ComputationChild;

  var prototypeAccessors$1 = { setRoot: {} };

  prototypeAccessors$1.setRoot.get = function () {
    return this.parent.setRoot;
  };

  ComputationChild__proto__.applyValue = function applyValue (value) {
    Model.prototype.applyValue.call(this, value);

    if (!this.isReadonly) {
      var source = this.parent;
      // computed models don't have a shuffle method
      while (source && source.shuffle) {
        source = source.parent;
      }

      if (source) {
        source.dependencies.forEach(mark);
      }
    }

    if (this.setRoot) {
      this.setRoot.set(this.setRoot.value);
    }
  };

  ComputationChild__proto__.get = function get (shouldCapture, opts) {
    if (shouldCapture) { capture(this); }

    if (this.dirty) {
      this.dirty = false;
      var parentValue = this.parent.get();
      this.value = parentValue ? parentValue[this.key] : undefined;
      if (this.wrapper) { this.newWrapperValue = this.value; }
      this.adapt();
    }

    return (opts && 'unwrap' in opts ? opts.unwrap !== false : shouldCapture) && this.wrapper
      ? this.wrapperValue
      : this.value;
  };

  ComputationChild__proto__.handleChange = function handleChange$2 () {
    if (this.dirty) { return; }
    this.dirty = true;

    if (this.boundValue) { this.boundValue = null; }

    this.links.forEach(marked);
    this.deps.forEach(handleChange);
    this.children.forEach(handleChange);
  };

  ComputationChild__proto__.joinKey = function joinKey (key) {
    if (isUndefined(key) || key === '') { return this; }

    if (!hasOwn(this.childByKey, key)) {
      var child = new ComputationChild(this, key);
      this.children.push(child);
      this.childByKey[key] = child;
    }

    return this.childByKey[key];
  };

  Object.defineProperties( ComputationChild__proto__, prototypeAccessors$1 );

  return ComputationChild;
}(Model));

/* global console */
/* eslint no-console:"off" */

var Computation = (function (Model) {
  function Computation(parent, signature, key) {
    Model.call(this, parent, key);

    this.signature = signature;

    this.isReadonly = !this.signature.setter;
    this.isComputed = true;

    this.dependencies = [];

    this.children = [];
    this.childByKey = {};

    this.deps = [];

    this.dirty = true;

    // TODO: is there a less hackish way to do this?
    this.shuffle = undefined;
  }

  if ( Model ) Computation.__proto__ = Model;
  var Computation__proto__ = Computation.prototype = Object.create( Model && Model.prototype );
  Computation__proto__.constructor = Computation;

  var prototypeAccessors$2 = { setRoot: {} };

  prototypeAccessors$2.setRoot.get = function () {
    if (this.signature.setter) { return this; }
  };

  Computation__proto__.get = function get (shouldCapture, opts) {
    if (shouldCapture) { capture(this); }

    if (this.dirty) {
      this.dirty = false;
      var old = this.value;
      this.value = this.getValue();
      // this may cause a view somewhere to update, so it must be in a runloop
      if (!runloop.active()) {
        runloop.start();
        if (!isEqual(old, this.value)) { this.notifyUpstream(); }
        runloop.end();
      } else {
        if (!isEqual(old, this.value)) { this.notifyUpstream(); }
      }
      if (this.wrapper) { this.newWrapperValue = this.value; }
      this.adapt();
    }

    // if capturing, this value needs to be unwrapped because it's for external use
    return maybeBind(
      this,
      // if unwrap is supplied, it overrides capture
      this.wrapper && (opts && 'unwrap' in opts ? opts.unwrap !== false : shouldCapture)
        ? this.wrapperValue
        : this.value,
      !opts || opts.shouldBind !== false
    );
  };

  Computation__proto__.getContext = function getContext () {
    return this.parent.isRoot ? this.root.ractive : this.parent.get(false, noVirtual);
  };

  Computation__proto__.getValue = function getValue () {
    startCapturing();
    var result;

    try {
      result = this.signature.getter.call(this.root.ractive, this.getContext());
    } catch (err) {
      warnIfDebug(("Failed to compute " + (this.getKeypath()) + ": " + (err.message || err)));

      // TODO this is all well and good in Chrome, but...
      // ...also, should encapsulate this stuff better, and only
      // show it if Ractive.DEBUG
      if (hasConsole) {
        if (console.groupCollapsed)
          { console.groupCollapsed(
            '%cshow details',
            'color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;'
          ); }
        var sig = this.signature;
        console.error(
          ((err.name) + ": " + (err.message) + "\n\n" + (sig.getterString) + (sig.getterUseStack ? '\n\n' + err.stack : ''))
        );
        if (console.groupCollapsed) { console.groupEnd(); }
      }
    }

    var dependencies = stopCapturing();
    this.setDependencies(dependencies);

    return result;
  };

  Computation__proto__.mark = function mark () {
    this.handleChange();
  };

  Computation__proto__.rebind = function rebind (next, previous) {
    // computations will grab all of their deps again automagically
    if (next !== previous) { this.handleChange(); }
  };

  Computation__proto__.set = function set (value) {
    if (this.isReadonly) {
      throw new Error(("Cannot set read-only computed value '" + (this.key) + "'"));
    }

    this.signature.setter(value);
    this.mark();
  };

  Computation__proto__.setDependencies = function setDependencies (dependencies) {
    var this$1 = this;

    // unregister any soft dependencies we no longer have
    var i = this.dependencies.length;
    while (i--) {
      var model = this$1.dependencies[i];
      if (!~dependencies.indexOf(model)) { model.unregister(this$1); }
    }

    // and add any new ones
    i = dependencies.length;
    while (i--) {
      var model$1 = dependencies[i];
      if (!~this$1.dependencies.indexOf(model$1)) { model$1.register(this$1); }
    }

    this.dependencies = dependencies;
  };

  Computation__proto__.teardown = function teardown () {
    var this$1 = this;

    var i = this.dependencies.length;
    while (i--) {
      if (this$1.dependencies[i]) { this$1.dependencies[i].unregister(this$1); }
    }
    if (this.parent.computed[this.key] === this) { delete this.parent.computed[this.key]; }
    Model.prototype.teardown.call(this);
  };

  Object.defineProperties( Computation__proto__, prototypeAccessors$2 );

  return Computation;
}(Model));

var prototype = Computation.prototype;
var child = ComputationChild.prototype;
prototype.handleChange = child.handleChange;
prototype.joinKey = child.joinKey;

shared$1.Computation = Computation;

var ExpressionProxy = (function (Model) {
  function ExpressionProxy(fragment, template) {
    var this$1 = this;

    Model.call(this, fragment.ractive.viewmodel, null);

    this.fragment = fragment;
    this.template = template;

    this.isReadonly = true;
    this.isComputed = true;
    this.dirty = true;

    this.fn =
      fragment.ractive.allowExpressions === false
        ? noop
        : getFunction(template.s, template.r.length);

    this.models = this.template.r.map(function (ref) {
      return resolveReference(this$1.fragment, ref);
    });
    this.dependencies = [];

    this.shuffle = undefined;

    this.bubble();
  }

  if ( Model ) ExpressionProxy.__proto__ = Model;
  var ExpressionProxy__proto__ = ExpressionProxy.prototype = Object.create( Model && Model.prototype );
  ExpressionProxy__proto__.constructor = ExpressionProxy;

  ExpressionProxy__proto__.bubble = function bubble (actuallyChanged) {
    if ( actuallyChanged === void 0 ) actuallyChanged = true;

    // refresh the keypath
    this.keypath = undefined;

    if (actuallyChanged) {
      this.handleChange();
    }
  };

  ExpressionProxy__proto__.getKeypath = function getKeypath () {
    var this$1 = this;

    if (!this.template) { return '@undefined'; }
    if (!this.keypath) {
      this.keypath =
        '@' +
        this.template.s.replace(/_(\d+)/g, function (match, i) {
          if (i >= this$1.models.length) { return match; }

          var model = this$1.models[i];
          return model ? model.getKeypath() : '@undefined';
        });
    }

    return this.keypath;
  };

  ExpressionProxy__proto__.getValue = function getValue () {
    var this$1 = this;

    startCapturing();
    var result;

    try {
      var params = this.models.map(function (m) { return (m ? m.get(true) : undefined); });
      result = this.fn.apply(this.fragment.ractive, params);
    } catch (err) {
      warnIfDebug(("Failed to compute " + (this.getKeypath()) + ": " + (err.message || err)));
    }

    var dependencies = stopCapturing();
    // remove missing deps
    this.dependencies
      .filter(function (d) { return !~dependencies.indexOf(d); })
      .forEach(function (d) {
        d.unregister(this$1);
        removeFromArray(this$1.dependencies, d);
      });
    // register new deps
    dependencies
      .filter(function (d) { return !~this$1.dependencies.indexOf(d); })
      .forEach(function (d) {
        d.register(this$1);
        this$1.dependencies.push(d);
      });

    return result;
  };

  ExpressionProxy__proto__.notifyUpstream = function notifyUpstream () {};

  ExpressionProxy__proto__.rebind = function rebind (next, previous, safe) {
    var idx = this.models.indexOf(previous);

    if (~idx) {
      next = rebindMatch(this.template.r[idx], next, previous);
      if (next !== previous) {
        previous.unregister(this);
        this.models.splice(idx, 1, next);
        if (next) { next.addShuffleRegister(this, 'mark'); }
      }
    }
    this.bubble(!safe);
  };

  ExpressionProxy__proto__.rebound = function rebound (update) {
    var this$1 = this;

    this.models = this.template.r.map(function (ref) { return resolveReference(this$1.fragment, ref); });
    if (update) { this.bubble(true); }
  };

  ExpressionProxy__proto__.retrieve = function retrieve () {
    return this.get();
  };

  ExpressionProxy__proto__.teardown = function teardown () {
    var this$1 = this;

    this.fragment = undefined;
    if (this.dependencies) { this.dependencies.forEach(function (d) { return d.unregister(this$1); }); }
    Model.prototype.teardown.call(this);
  };

  ExpressionProxy__proto__.unreference = function unreference () {
    Model.prototype.unreference.call(this);
    collect(this);
  };

  ExpressionProxy__proto__.unregister = function unregister (dep) {
    Model.prototype.unregister.call(this, dep);
    collect(this);
  };

  ExpressionProxy__proto__.unregisterLink = function unregisterLink (link) {
    Model.prototype.unregisterLink.call(this, link);
    collect(this);
  };

  return ExpressionProxy;
}(Model));

var prototype$1 = ExpressionProxy.prototype;
var computation = Computation.prototype;
prototype$1.get = computation.get;
prototype$1.handleChange = computation.handleChange;
prototype$1.joinKey = computation.joinKey;
prototype$1.mark = computation.mark;
prototype$1.unbind = noop;

function collect(model) {
  if (!model.deps.length && !model.refs && !model.links.length) { model.teardown(); }
}

var ReferenceExpressionProxy = (function (LinkModel) {
  function ReferenceExpressionProxy(fragment, template) {
    LinkModel.call(this, null, null, null, '@undefined');
    this.root = fragment.ractive.viewmodel;
    this.template = template;
    this.rootLink = true;
    this.template = template;
    this.fragment = fragment;

    this.rebound();
  }

  if ( LinkModel ) ReferenceExpressionProxy.__proto__ = LinkModel;
  var ReferenceExpressionProxy__proto__ = ReferenceExpressionProxy.prototype = Object.create( LinkModel && LinkModel.prototype );
  ReferenceExpressionProxy__proto__.constructor = ReferenceExpressionProxy;

  ReferenceExpressionProxy__proto__.getKeypath = function getKeypath () {
    return this.model ? this.model.getKeypath() : '@undefined';
  };

  ReferenceExpressionProxy__proto__.rebound = function rebound () {
    var this$1 = this;

    var fragment = this.fragment;
    var template = this.template;

    var base = (this.base = resolve(fragment, template));
    var idx;

    if (this.proxy) {
      teardown$2(this);
    }

    var proxy = (this.proxy = {
      rebind: function (next, previous) {
        if (previous === base) {
          next = rebindMatch(template, next, previous);
          if (next !== base) {
            this$1.base = base = next;
          }
        } else if (~(idx = members.indexOf(previous))) {
          next = rebindMatch(template.m[idx].n, next, previous);
          if (next !== members[idx]) {
            members.splice(idx, 1, next || Missing);
          }
        }

        if (next !== previous) {
          previous.unregister(proxy);
          if (next) { next.addShuffleTask(function () { return next.register(proxy); }); }
        }
      },
      handleChange: function () {
        pathChanged();
      }
    });

    base.register(proxy);

    var members = (this.members = template.m.map(function (tpl) {
      if (isString(tpl)) {
        return { get: function () { return tpl; } };
      }

      var model;

      if (tpl.t === REFERENCE) {
        model = resolveReference(fragment, tpl.n);
        model.register(proxy);

        return model;
      }

      model = new ExpressionProxy(fragment, tpl);
      model.register(proxy);
      return model;
    }));

    var pathChanged = function () {
      var model =
        base &&
        base.joinAll(
          members.reduce(function (list, m) {
            var k = m.get();
            if (isArray(k)) { return list.concat(k); }
            else { list.push(escapeKey(String(k))); }
            return list;
          }, [])
        );

      if (model !== this$1.model) {
        this$1.model = model;
        this$1.relinking(model);
        fireShuffleTasks();
        refreshPathDeps(this$1);
      }
    };

    pathChanged();
  };

  ReferenceExpressionProxy__proto__.teardown = function teardown () {
    teardown$2(this);
    LinkModel.prototype.teardown.call(this);
  };

  ReferenceExpressionProxy__proto__.unreference = function unreference () {
    LinkModel.prototype.unreference.call(this);
    if (!this.deps.length && !this.refs) { this.teardown(); }
  };

  ReferenceExpressionProxy__proto__.unregister = function unregister (dep) {
    LinkModel.prototype.unregister.call(this, dep);
    if (!this.deps.length && !this.refs) { this.teardown(); }
  };

  return ReferenceExpressionProxy;
}(LinkModel));

function teardown$2(proxy) {
  if (proxy.base) { proxy.base.unregister(proxy.proxy); }
  if (proxy.models) {
    proxy.models.forEach(function (m) {
      if (m.unregister) { m.unregister(proxy); }
    });
  }
}

function refreshPathDeps(proxy) {
  var len = proxy.deps.length;
  var i, v;

  for (i = 0; i < len; i++) {
    v = proxy.deps[i];
    if (v.pathChanged) { v.pathChanged(); }
    if (v.fragment && v.fragment.pathModel) { v.fragment.pathModel.applyValue(proxy.getKeypath()); }
  }

  len = proxy.children.length;
  for (i = 0; i < len; i++) {
    refreshPathDeps(proxy.children[i]);
  }
}

var eproto = ExpressionProxy.prototype;
var proto$4 = ReferenceExpressionProxy.prototype;

proto$4.unreference = eproto.unreference;
proto$4.unregister = eproto.unregister;
proto$4.unregisterLink = eproto.unregisterLink;

function resolve(fragment, template) {
  if (template.r) {
    return resolveReference(fragment, template.r);
  } else if (template.x) {
    return new ExpressionProxy(fragment, template.x);
  } else if (template.rx) {
    return new ReferenceExpressionProxy(fragment, template.rx);
  }
}

var Mustache = (function (Item) {
  function Mustache(options) {
    Item.call(this, options);

    if (options.owner) { this.parent = options.owner; }

    this.isStatic = !!options.template.s;

    this.model = null;
    this.dirty = false;
  }

  if ( Item ) Mustache.__proto__ = Item;
  var Mustache__proto__ = Mustache.prototype = Object.create( Item && Item.prototype );
  Mustache__proto__.constructor = Mustache;

  Mustache__proto__.bind = function bind (pre) {
    // yield mustaches and inner contexts should resolve in container context
    var start = this.template.y
      ? this.template.y.containerFragment
      : this.containerFragment || this.up;
    // try to find a model for this view
    var model = pre || resolve(start, this.template);

    if (model) {
      var value = model.get();

      if (this.isStatic) {
        this.model = { get: function () { return value; } };
        model.unreference();
        return;
      }

      model.register(this);
      this.model = model;
    }
  };

  Mustache__proto__.handleChange = function handleChange () {
    this.bubble();
  };

  Mustache__proto__.rebind = function rebind (next, previous, safe) {
    if (this.isStatic) { return; }

    next = rebindMatch(this.template, next, previous, this.up);
    if (next === this.model) { return false; }

    if (this.model) {
      this.model.unregister(this);
    }
    if (next) { next.addShuffleRegister(this, 'mark'); }
    this.model = next;
    if (!safe) { this.handleChange(); }
    return true;
  };

  Mustache__proto__.rebound = function rebound (update) {
    if (this.model) {
      if (this.model.rebound) { this.model.rebound(update); }
      else {
        // check to see if the model actually changed...
        // yield mustaches and inner contexts should resolve in container context
        var start = this.template.y
          ? this.template.y.containerFragment
          : this.containerFragment || this.up;
        // try to find a model for this view
        var model = resolve(start, this.template);
        if (model !== this.model) {
          this.model.unregister(this);
          this.bind(model);
        }
      }

      if (update) { this.bubble(); }
    }
    if (this.fragment) { this.fragment.rebound(update); }
  };

  Mustache__proto__.unbind = function unbind () {
    if (!this.isStatic) {
      this.model && this.model.unregister(this);
      this.model = undefined;
    }
  };

  return Mustache;
}(Item));

function MustacheContainer(options) {
  Mustache.call(this, options);
}

var proto$5 = (MustacheContainer.prototype = Object.create(ContainerItem.prototype));

assign(proto$5, Mustache.prototype, { constructor: MustacheContainer });

var Interpolator = (function (Mustache) {
  function Interpolator () {
    Mustache.apply(this, arguments);
  }

  if ( Mustache ) Interpolator.__proto__ = Mustache;
  var Interpolator__proto__ = Interpolator.prototype = Object.create( Mustache && Mustache.prototype );
  Interpolator__proto__.constructor = Interpolator;

  Interpolator__proto__.bubble = function bubble () {
    if (this.owner) { this.owner.bubble(); }
    Mustache.prototype.bubble.call(this);
  };

  Interpolator__proto__.detach = function detach () {
    return detachNode(this.node);
  };

  Interpolator__proto__.firstNode = function firstNode () {
    return this.node;
  };

  Interpolator__proto__.getString = function getString () {
    return this.model ? safeToStringValue(this.model.get()) : '';
  };

  Interpolator__proto__.render = function render (target, occupants) {
    if (inAttributes()) { return; }
    var value = (this.value = this.getString());

    this.rendered = true;

    progressiveText(this, target, occupants, value);
  };

  Interpolator__proto__.toString = function toString (escape) {
    var string = this.getString();
    return escape ? escapeHtml(string) : string;
  };

  Interpolator__proto__.unrender = function unrender (shouldDestroy) {
    if (shouldDestroy) { this.detach(); }
    this.rendered = false;
  };

  Interpolator__proto__.update = function update () {
    if (this.dirty) {
      this.dirty = false;
      if (this.rendered) {
        var value = this.getString();
        if (value !== this.value) { this.node.data = this.value = value; }
      }
    }
  };

  Interpolator__proto__.valueOf = function valueOf () {
    return this.model ? this.model.get() : undefined;
  };

  return Interpolator;
}(Mustache));

var Input = (function (Element) {
  function Input () {
    Element.apply(this, arguments);
  }

  if ( Element ) Input.__proto__ = Element;
  var Input__proto__ = Input.prototype = Object.create( Element && Element.prototype );
  Input__proto__.constructor = Input;

  Input__proto__.render = function render (target, occupants) {
    Element.prototype.render.call(this, target, occupants);
    this.node.defaultValue = this.node.value;
  };
  Input__proto__.compare = function compare (value, attrValue) {
    var comparator = this.getAttribute('value-comparator');
    if (comparator) {
      if (isFunction(comparator)) {
        return comparator(value, attrValue);
      }
      if (value && attrValue) {
        return value[comparator] == attrValue[comparator];
      }
    }
    return value == attrValue;
  };

  return Input;
}(Element));

// simple JSON parser, without the restrictions of JSON parse
// (i.e. having to double-quote keys).
//
// If passed a hash of values as the second argument, ${placeholders}
// will be replaced with those values

var specials$1 = {
  true: true,
  false: false,
  null: null,
  undefined: undefined
};

var specialsPattern = new RegExp('^(?:' + keys(specials$1).join('|') + ')');
var numberPattern$1 = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
var placeholderPattern = /\$\{([^\}]+)\}/g;
var placeholderAtStartPattern = /^\$\{([^\}]+)\}/;
var onlyWhitespace$1 = /^\s*$/;

var JsonParser = Parser.extend({
  init: function init(str, options) {
    this.values = options.values;
    this.sp();
  },

  postProcess: function postProcess(result) {
    if (result.length !== 1 || !onlyWhitespace$1.test(this.leftover)) {
      return null;
    }

    return { value: result[0].v };
  },

  converters: [
    function getPlaceholder(parser) {
      if (!parser.values) { return null; }

      var placeholder = parser.matchPattern(placeholderAtStartPattern);

      if (placeholder && hasOwn(parser.values, placeholder)) {
        return { v: parser.values[placeholder] };
      }
    },

    function getSpecial(parser) {
      var special = parser.matchPattern(specialsPattern);
      if (special) { return { v: specials$1[special] }; }
    },

    function getNumber(parser) {
      var number = parser.matchPattern(numberPattern$1);
      if (number) { return { v: +number }; }
    },

    function getString(parser) {
      var stringLiteral = readStringLiteral(parser);
      var values = parser.values;

      if (stringLiteral && values) {
        return {
          v: stringLiteral.v.replace(placeholderPattern, function (match, $1) { return $1 in values ? values[$1] : $1; }
          )
        };
      }

      return stringLiteral;
    },

    function getObject(parser) {
      if (!parser.matchString('{')) { return null; }

      var result = {};

      parser.sp();

      if (parser.matchString('}')) {
        return { v: result };
      }

      var pair;
      while ((pair = getKeyValuePair(parser))) {
        result[pair.key] = pair.value;

        parser.sp();

        if (parser.matchString('}')) {
          return { v: result };
        }

        if (!parser.matchString(',')) {
          return null;
        }
      }

      return null;
    },

    function getArray(parser) {
      if (!parser.matchString('[')) { return null; }

      var result = [];

      parser.sp();

      if (parser.matchString(']')) {
        return { v: result };
      }

      var valueToken;
      while ((valueToken = parser.read())) {
        result.push(valueToken.v);

        parser.sp();

        if (parser.matchString(']')) {
          return { v: result };
        }

        if (!parser.matchString(',')) {
          return null;
        }

        parser.sp();
      }

      return null;
    }
  ]
});

function getKeyValuePair(parser) {
  parser.sp();

  var key = readKey(parser);

  if (!key) { return null; }

  var pair = { key: key };

  parser.sp();
  if (!parser.matchString(':')) {
    return null;
  }
  parser.sp();

  var valueToken = parser.read();

  if (!valueToken) { return null; }

  pair.value = valueToken.v;
  return pair;
}

function parseJSON(str, values) {
  var parser = new JsonParser(str, { values: values });
  return parser.result;
}

var Mapping = (function (Item) {
  function Mapping(options) {
    Item.call(this, options);

    this.name = options.template.n;

    this.owner = options.owner || options.up.owner || options.element || findElement(options.up);
    this.element =
      options.element || (this.owner.attributeByName ? this.owner : findElement(options.up));
    this.up = this.element.up; // shared
    this.ractive = this.up.ractive;

    this.element.attributeByName[this.name] = this;

    this.value = options.template.f;
  }

  if ( Item ) Mapping.__proto__ = Item;
  var Mapping__proto__ = Mapping.prototype = Object.create( Item && Item.prototype );
  Mapping__proto__.constructor = Mapping;

  Mapping__proto__.bind = function bind () {
    var template = this.template.f;
    var viewmodel = this.element.instance.viewmodel;

    if (template === 0) {
      // empty attributes are `true`
      viewmodel.joinKey(this.name).set(true);
    } else if (isString(template)) {
      var parsed = parseJSON(template);
      viewmodel.joinKey(this.name).set(parsed ? parsed.value : template);
    } else if (isArray(template)) {
      createMapping(this, true);
    }
  };

  Mapping__proto__.rebound = function rebound (update) {
    if (this.boundFragment) { this.boundFragment.rebound(update); }
    if (this.link) {
      this.model = resolve(this.up, this.template.f[0]);
      var model = this.element.instance.viewmodel.joinAll(splitKeypath(this.name));
      model.link(this.model, this.name, { mapping: true });
    }
  };

  Mapping__proto__.render = function render () {};

  Mapping__proto__.unbind = function unbind (view) {
    if (this.model) { this.model.unregister(this); }
    if (this.boundFragment) { this.boundFragment.unbind(view); }

    if (this.element.bound) {
      if (this.link.target === this.model) { this.link.owner.unlink(); }
    }
  };

  Mapping__proto__.unrender = function unrender () {};

  Mapping__proto__.update = function update () {
    if (this.dirty) {
      this.dirty = false;
      if (this.boundFragment) { this.boundFragment.update(); }
    }
  };

  return Mapping;
}(Item));

function createMapping(item) {
  var template = item.template.f;
  var viewmodel = item.element.instance.viewmodel;
  var childData = viewmodel.value;

  if (template.length === 1 && template[0].t === INTERPOLATOR) {
    var model = resolve(item.up, template[0]);
    var val = model.get(false);

    // if the interpolator is not static
    if (!template[0].s) {
      item.model = model;
      item.link = viewmodel.createLink(item.name, model, template[0].r, {
        mapping: true
      });

      // initialize parent side of the mapping from child data
      if (isUndefined(val) && !model.isReadonly && item.name in childData) {
        model.set(childData[item.name]);
      }
    } else if (!isObjectType(val) || template[0].x) {
      // copy non-object, non-computed vals through
      viewmodel.joinKey(splitKeypath(item.name)).set(val);
    } else {
      // warn about trying to copy an object
      warnIfDebug(("Cannot copy non-computed object value from static mapping '" + (item.name) + "'"));
    }

    // if the item isn't going to manage the model, give it a change to tear down if it's computed
    if (model !== item.model) { model.unregister(); }
  } else {
    item.boundFragment = new Fragment({
      owner: item,
      template: template
    }).bind();

    item.model = viewmodel.joinKey(splitKeypath(item.name));
    item.model.set(item.boundFragment.valueOf());

    // item is a *bit* of a hack
    item.boundFragment.bubble = function () {
      Fragment.prototype.bubble.call(item.boundFragment);
      // defer this to avoid mucking around model deps if there happens to be an expression involved
      runloop.scheduleTask(function () {
        item.boundFragment.update();
        item.model.set(item.boundFragment.valueOf());
      });
    };
  }
}

var Option = (function (Element) {
  function Option(options) {
    var template = options.template;
    if (!template.a) { template.a = {}; }

    // If the value attribute is missing, use the element's content,
    // as long as it isn't disabled
    if (isUndefined(template.a.value) && !('disabled' in template.a)) {
      template.a.value = template.f || '';
    }

    Element.call(this, options);

    this.select = findElement(this.parent || this.up, false, 'select');
  }

  if ( Element ) Option.__proto__ = Element;
  var Option__proto__ = Option.prototype = Object.create( Element && Element.prototype );
  Option__proto__.constructor = Option;

  Option__proto__.bind = function bind () {
    if (!this.select) {
      Element.prototype.bind.call(this);
      return;
    }

    // If the select has a value, it overrides the `selected` attribute on
    // this option - so we delete the attribute
    var selectedAttribute = this.attributeByName.selected;
    if (selectedAttribute && this.select.getAttribute('value') !== undefined) {
      var index = this.attributes.indexOf(selectedAttribute);
      this.attributes.splice(index, 1);
      delete this.attributeByName.selected;
    }

    Element.prototype.bind.call(this);
    this.select.options.push(this);
  };

  Option__proto__.bubble = function bubble () {
    // if we're using content as value, may need to update here
    var value = this.getAttribute('value');
    if (this.node && this.node.value !== value) {
      this.node._ractive.value = value;
    }
    Element.prototype.bubble.call(this);
  };

  Option__proto__.getAttribute = function getAttribute (name) {
    var attribute = this.attributeByName[name];
    return attribute
      ? attribute.getValue()
      : name === 'value' && this.fragment
      ? this.fragment.valueOf()
      : undefined;
  };

  Option__proto__.isSelected = function isSelected () {
    var this$1 = this;

    var optionValue = this.getAttribute('value');

    if (isUndefined(optionValue) || !this.select) {
      return false;
    }

    var selectValue = this.select.getAttribute('value');

    if (this.select.compare(selectValue, optionValue)) {
      return true;
    }

    if (this.select.getAttribute('multiple') && isArray(selectValue)) {
      var i = selectValue.length;
      while (i--) {
        if (this$1.select.compare(selectValue[i], optionValue)) {
          return true;
        }
      }
    }
  };

  Option__proto__.render = function render (target, occupants) {
    Element.prototype.render.call(this, target, occupants);

    if (!this.attributeByName.value) {
      this.node._ractive.value = this.getAttribute('value');
    }
  };

  Option__proto__.unbind = function unbind (view) {
    Element.prototype.unbind.call(this, view);

    if (this.select) {
      removeFromArray(this.select.options, this);
    }
  };

  return Option;
}(Element));

function getPartialTemplate(ractive, name, up) {
  // If the partial in instance or view heirarchy instances, great
  var partial = getPartialFromRegistry(ractive, name, up || {});
  if (partial) { return partial; }

  // Does it exist on the page as a script tag?
  partial = parser.fromId(name, { noThrow: true });
  if (partial) {
    // parse and register to this ractive instance
    var parsed = parser.parseFor(partial, ractive);

    // register extra partials on the ractive instance if they don't already exist
    if (parsed.p) { fillGaps(ractive.partials, parsed.p); }

    // register (and return main partial if there are others in the template)
    return (ractive.partials[name] = parsed.t);
  }
}

function getPartialFromRegistry(ractive, name, up) {
  // if there was an instance up-hierarchy, cool
  var partial = findParentPartial(name, up.owner);
  if (partial) { return partial; }

  // find first instance in the ractive or view hierarchy that has this partial
  var instance = findInstance('partials', ractive, name);

  if (!instance) {
    return;
  }

  partial = instance.partials[name];

  // partial is a function?
  var fn;
  if (isFunction(partial)) {
    fn = partial;
    // super partial
    if (fn.styleSet) { return fn; }

    fn = partial.bind(instance);
    fn.isOwner = hasOwn(instance.partials, name);
    partial = fn.call(ractive, parser);
  }

  if (!partial && partial !== '') {
    warnIfDebug(noRegistryFunctionReturn, name, 'partial', 'partial', {
      ractive: ractive
    });
    return;
  }

  // If this was added manually to the registry,
  // but hasn't been parsed, parse it now
  if (!parser.isParsed(partial)) {
    // use the parseOptions of the ractive instance on which it was found
    var parsed = parser.parseFor(partial, instance);

    // Partials cannot contain nested partials!
    // TODO add a test for this
    if (parsed.p) {
      warnIfDebug('Partials ({{>%s}}) cannot contain nested inline partials', name, { ractive: ractive });
    }

    // if fn, use instance to store result, otherwise needs to go
    // in the correct point in prototype chain on instance or constructor
    var target = fn ? instance : findOwner(instance, name);

    // may be a template with partials, which need to be registered and main template extracted
    target.partials[name] = partial = parsed.t;
  }

  // store for reset
  if (fn) { partial._fn = fn; }

  // if the partial is a pre-parsed template object, import any expressions and update the registry
  if (partial.v) {
    addFunctions(partial);
    return (instance.partials[name] = partial.t);
  } else {
    return partial;
  }
}

function findOwner(ractive, key) {
  return hasOwn(ractive.partials, key) ? ractive : findConstructor(ractive.constructor, key);
}

function findConstructor(constructor, key) {
  if (!constructor) {
    return;
  }
  return hasOwn(constructor.partials, key) ? constructor : findConstructor(constructor.Parent, key);
}

function findParentPartial(name, parent) {
  if (parent) {
    if (
      parent.template &&
      parent.template.p &&
      !isArray(parent.template.p) &&
      hasOwn(parent.template.p, name)
    ) {
      return parent.template.p[name];
    } else if (parent.up && parent.up.owner) {
      return findParentPartial(name, parent.up.owner);
    }
  }
}

function Partial(options) {
  MustacheContainer.call(this, options);

  var tpl = options.template;

  // yielder is a special form of partial that will later require special handling
  if (tpl.t === YIELDER) {
    this.yielder = 1;
  } else if (tpl.t === ELEMENT) {
    // this is a macro partial, complete with macro constructor
    // leaving this as an element will confuse up-template searches
    this.type = PARTIAL;
    this.macro = options.macro;
  }
}

var proto$6 = (Partial.prototype = create(MustacheContainer.prototype));

assign(proto$6, {
  constructor: Partial,

  bind: function bind() {
    var template = this.template;

    if (this.yielder) {
      // the container is the instance that owns this node
      this.container = this.up.ractive;
      this.component = this.container.component;
      this.containerFragment = this.up;

      // normal component
      if (this.component) {
        // yields skip the owning instance and go straight to the surrounding context
        this.up = this.component.up;

        // {{yield}} is equivalent to {{yield content}}
        if (!template.r && !template.x && !template.rx) { this.refName = 'content'; }
      } else {
        // plain-ish instance that may be attached to a parent later
        this.fragment = new Fragment({
          owner: this,
          template: []
        });
        this.fragment.bind();
        return;
      }
    }

    // this is a macro/super partial
    if (this.macro) {
      this.fn = this.macro;
    } else {
      // this is a plain partial or yielder
      if (!this.refName) { this.refName = template.r; }

      // if the refName exists as a partial, this is a plain old partial reference where no model binding will happen
      if (this.refName) {
        partialFromValue(this, this.refName);
      }

      // this is a dynamic/inline partial
      if (!this.partial && !this.fn) {
        MustacheContainer.prototype.bind.call(this);
        if (this.model) { partialFromValue(this, this.model.get()); }
      }
    }

    if (!this.partial && !this.fn) {
      warnOnceIfDebug(("Could not find template for partial '" + (this.name) + "'"));
    }

    createFragment(this, this.partial || []);

    // macro/super partial
    if (this.fn) { initMacro(this); }

    this.fragment.bind();
  },

  bubble: function bubble() {
    if (!this.dirty) {
      this.dirty = true;

      if (this.yielder) {
        this.containerFragment.bubble();
      } else {
        this.up.bubble();
      }
    }
  },

  findNextNode: function findNextNode() {
    return (this.containerFragment || this.up).findNextNode(this);
  },

  handleChange: function handleChange() {
    this.dirtyTemplate = true;
    this.externalChange = true;
    this.bubble();
  },

  rebound: function rebound(update) {
    var this$1 = this;

    if (this._attrs) {
      keys(this._attrs).forEach(function (k) { return this$1._attrs[k].rebound(update); });
    }
    MustacheContainer.prototype.rebound.call(this, update);
  },

  refreshAttrs: function refreshAttrs() {
    var this$1 = this;

    keys(this._attrs).forEach(function (k) {
      this$1.handle.attributes[k] = !this$1._attrs[k].items.length || this$1._attrs[k].valueOf();
    });
  },

  resetTemplate: function resetTemplate() {
    var this$1 = this;

    if (this.fn && this.proxy) {
      this.last = 0;
      if (this.externalChange) {
        if (isFunction(this.proxy.teardown)) { this.proxy.teardown(); }
        this.fn = this.proxy = null;
      } else {
        this.partial = this.fnTemplate;
        return true;
      }
    }

    this.partial = null;

    if (this.refName) {
      this.partial = getPartialTemplate(this.ractive, this.refName, this.up);
    }

    if (!this.partial && this.model) {
      partialFromValue(this, this.model.get());
    }

    if (!this.fn) {
      if (this.last && this.partial === this.last) { return false; }
      else if (this.partial) {
        this.last = this.partial;
        contextifyTemplate(this);
      }
    }

    this.unbindAttrs();

    if (this.fn) {
      initMacro(this);
      if (isFunction(this.proxy.render)) { runloop.scheduleTask(function () { return this$1.proxy.render(); }); }
    } else if (!this.partial) {
      warnOnceIfDebug(("Could not find template for partial '" + (this.name) + "'"));
    }

    return true;
  },

  render: function render(target, occupants) {
    if (this.fn && this.fn._cssDef && !this.fn._cssDef.applied) { applyCSS(); }

    this.fragment.render(target, occupants);

    if (this.proxy && isFunction(this.proxy.render)) { this.proxy.render(); }
  },

  unbind: function unbind(view) {
    this.fragment.unbind(view);

    this.unbindAttrs(view);

    MustacheContainer.prototype.unbind.call(this, view);
  },

  unbindAttrs: function unbindAttrs(view) {
    var this$1 = this;

    if (this._attrs) {
      keys(this._attrs).forEach(function (k) {
        this$1._attrs[k].unbind(view);
      });
    }
  },

  unrender: function unrender(shouldDestroy) {
    if (this.proxy && isFunction(this.proxy.teardown)) { this.proxy.teardown(); }

    this.fragment.unrender(shouldDestroy);
  },

  update: function update() {
    var this$1 = this;

    var proxy = this.proxy;
    this.updating = 1;

    if (this.dirtyAttrs) {
      this.dirtyAttrs = false;
      keys(this._attrs).forEach(function (k) { return this$1._attrs[k].update(); });
      this.refreshAttrs();
      if (isFunction(proxy.update)) { proxy.update(this.handle.attributes); }
    }

    if (this.dirtyTemplate) {
      this.dirtyTemplate = false;
      this.resetTemplate() && this.fragment.resetTemplate(this.partial || []);
    }

    if (this.dirty) {
      this.dirty = false;
      if (proxy && isFunction(proxy.invalidate)) { proxy.invalidate(); }
      this.fragment.update();
    }

    this.externalChange = false;
    this.updating = 0;
  }
});

function createFragment(self, partial) {
  self.partial = self.last = partial;
  contextifyTemplate(self);

  var options = {
    owner: self,
    template: self.partial
  };

  if (self.yielder) { options.ractive = self.container.parent; }

  if (self.fn) { options.cssIds = self.fn._cssIds; }

  self.fragment = new Fragment(options);
}

function contextifyTemplate(self) {
  if (self.template.c) {
    self.partial = [{ t: SECTION, n: SECTION_WITH, f: self.partial }];
    assign(self.partial[0], self.template.c);
    if (self.yielder) { self.partial[0].y = self; }
    else { self.partial[0].z = self.template.z; }
  }
}

function partialFromValue(self, value, okToParse) {
  var tpl = value;

  if (isArray(tpl)) {
    self.partial = tpl;
  } else if (tpl && isObjectType(tpl)) {
    if (isArray(tpl.t)) { self.partial = tpl.t; }
    else if (isString(tpl.template))
      { self.partial = parsePartial(tpl.template, tpl.template, self.ractive).t; }
  } else if (isFunction(tpl) && tpl.styleSet) {
    self.fn = tpl;
    if (self.fragment) { self.fragment.cssIds = tpl._cssIds; }
  } else if (tpl != null) {
    tpl = getPartialTemplate(self.ractive, '' + tpl, self.containerFragment || self.up);
    if (tpl) {
      self.name = value;
      if (tpl.styleSet) {
        self.fn = tpl;
        if (self.fragment) { self.fragment.cssIds = tpl._cssIds; }
      } else { self.partial = tpl; }
    } else if (okToParse) {
      self.partial = parsePartial('' + value, '' + value, self.ractive).t;
    } else {
      self.name = value;
    }
  }

  return self.partial;
}

function setTemplate(template) {
  partialFromValue(this, template, true);

  if (!this.initing) {
    this.dirtyTemplate = true;
    this.fnTemplate = this.partial;

    if (this.updating) {
      this.bubble();
      runloop.promise();
    } else {
      var promise = runloop.start();

      this.bubble();
      runloop.end();

      return promise;
    }
  }
}

function aliasLocal(ref, name) {
  var aliases = this.fragment.aliases || (this.fragment.aliases = {});
  if (!name) {
    aliases[ref] = this._data;
  } else {
    aliases[name] = this._data.joinAll(splitKeypath(ref));
  }
}

var extras = 'extra-attributes';

function initMacro(self) {
  var fn = self.fn;
  var fragment = self.fragment;

  // defensively copy the template in case it changes
  var template = (self.template = assign({}, self.template));
  var handle = (self.handle = fragment.getContext({
    proxy: self,
    aliasLocal: aliasLocal,
    name: self.template.e || self.name,
    attributes: {},
    setTemplate: setTemplate.bind(self),
    template: template,
    macro: fn
  }));

  if (!template.p) { template.p = {}; }
  template.p = handle.partials = assign({}, template.p);
  if (!hasOwn(template.p, 'content')) { template.p.content = template.f || []; }

  if (isArray(fn.attributes)) {
    self._attrs = {};

    var invalidate = function() {
      this.dirty = true;
      self.dirtyAttrs = true;
      self.bubble();
    };

    if (isArray(template.m)) {
      var attrs = template.m;
      template.p[extras] = template.m = attrs.filter(function (a) { return !~fn.attributes.indexOf(a.n); });
      attrs
        .filter(function (a) { return ~fn.attributes.indexOf(a.n); })
        .forEach(function (a) {
          var fragment = new Fragment({
            template: a.f,
            owner: self
          });
          fragment.bubble = invalidate;
          fragment.findFirstNode = noop;
          self._attrs[a.n] = fragment;
        });
    } else {
      template.p[extras] = [];
    }
  } else {
    template.p[extras] = template.m;
  }

  if (self._attrs) {
    keys(self._attrs).forEach(function (k) {
      self._attrs[k].bind();
    });
    self.refreshAttrs();
  }

  self.initing = 1;
  self.proxy = fn.call(self.ractive, handle, handle.attributes) || {};
  if (!self.partial) { self.partial = []; }
  self.fnTemplate = self.partial;
  self.initing = 0;

  contextifyTemplate(self);
  fragment.resetTemplate(self.partial);
}

function parsePartial(name, partial, ractive) {
  var parsed;

  try {
    parsed = parser.parse(partial, parser.getParseOptions(ractive));
  } catch (e) {
    warnIfDebug(("Could not parse partial from expression '" + name + "'\n" + (e.message)));
  }

  return parsed || { t: [] };
}

var KeyModel = function KeyModel(value, context, instance) {
  this.value = this.key = value;
  this.context = context;
  this.isReadonly = this.isKey = true;
  this.deps = [];
  this.links = [];
  this.children = [];
  this.instance = instance;
};
var KeyModel__proto__ = KeyModel.prototype;

KeyModel__proto__.applyValue = function applyValue (value) {
  if (value !== this.value) {
    this.value = this.key = value;
    this.deps.forEach(handleChange);
    this.links.forEach(handleChange);
    this.children.forEach(function (c) {
      c.applyValue(c.context.getKeypath(c.instance));
    });
  }
};

KeyModel__proto__.destroyed = function destroyed () {
  if (this.upstream) { this.upstream.unregisterChild(this); }
};

KeyModel__proto__.get = function get (shouldCapture) {
  if (shouldCapture) { capture(this); }
  return unescapeKey(this.value);
};

KeyModel__proto__.getKeypath = function getKeypath () {
  return unescapeKey(this.value);
};

KeyModel__proto__.has = function has () {
  return false;
};

KeyModel__proto__.rebind = function rebind (next, previous) {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) { this$1.deps[i].rebind(next, previous, false); }

  i = this.links.length;
  while (i--) { this$1.links[i].relinking(next, false); }
};

KeyModel__proto__.register = function register (dependant) {
  this.deps.push(dependant);
};

KeyModel__proto__.registerChild = function registerChild (child) {
  addToArray(this.children, child);
  child.upstream = this;
};

KeyModel__proto__.registerLink = function registerLink (link) {
  addToArray(this.links, link);
};

KeyModel__proto__.unregister = function unregister (dependant) {
  removeFromArray(this.deps, dependant);
};

KeyModel__proto__.unregisterChild = function unregisterChild (child) {
  removeFromArray(this.children, child);
};

KeyModel__proto__.unregisterLink = function unregisterLink (link) {
  removeFromArray(this.links, link);
};

KeyModel.prototype.reference = noop;
KeyModel.prototype.unreference = noop;

var keypathString = /^"(\\"|[^"])+"$/;

var RepeatedFragment = function RepeatedFragment(options) {
  this.parent = options.owner.up;

  // bit of a hack, so reference resolution works without another
  // layer of indirection
  this.up = this;
  this.owner = options.owner;
  this.ractive = this.parent.ractive;
  this.delegate =
    this.ractive.delegate !== false && (this.parent.delegate || findDelegate(this.parent));
  // delegation disabled by directive
  if (this.delegate && this.delegate.delegate === false) { this.delegate = false; }
  // let the element know it's a delegate handler
  if (this.delegate) { this.delegate.delegate = this.delegate; }

  // encapsulated styles should be inherited until they get applied by an element
  this.cssIds = 'cssIds' in options ? options.cssIds : this.parent ? this.parent.cssIds : null;

  this.context = null;
  this.rendered = false;
  this.iterations = [];

  this.template = options.template;

  this.indexRef = options.indexRef;
  this.keyRef = options.keyRef;

  this.pendingNewIndices = null;
  this.previousIterations = null;

  // track array versus object so updates of type rest
  this.isArray = false;
};
var RepeatedFragment__proto__ = RepeatedFragment.prototype;

RepeatedFragment__proto__.bind = function bind (context) {
    var this$1 = this;

  this.context = context;
  this.bound = true;
  var value = context.get();

  var aliases = (this.aliases = this.owner.template.z && this.owner.template.z.slice());

  var shuffler = aliases && aliases.find(function (a) { return a.n === 'shuffle'; });
  if (shuffler && shuffler.x && shuffler.x.x) {
    if (shuffler.x.x.s === 'true') { this.shuffler = true; }
    else if (keypathString.test(shuffler.x.x.s))
      { this.shuffler = splitKeypath(shuffler.x.x.s.slice(1, -1)); }
  }

  if (this.shuffler) { this.values = shuffleValues(this, this.shuffler); }

  if (this.source) { this.source.model.unbind(this.source); }
  var source = context.isComputed && aliases && aliases.find(function (a) { return a.n === 'source'; });
  if (source && source.x && source.x.r) {
    var model = resolve(this, source.x);
    this.source = {
      handleChange: function handleChange() {},
      rebind: function rebind(next) {
        this.model.unregister(this);
        this.model = next;
        next.register(this);
      }
    };
    this.source.model = model;
    model.register(this.source);
  }

  // {{#each array}}...
  if ((this.isArray = isArray(value))) {
    // we can't use map, because of sparse arrays
    this.iterations = [];
    var max = (this.length = value.length);
    for (var i = 0; i < max; i += 1) {
      this$1.iterations[i] = this$1.createIteration(i, i);
    }
  } else if (isObject(value)) {
    // {{#each object}}...
    this.isArray = false;

    // TODO this is a dreadful hack. There must be a neater way
    if (this.indexRef) {
      var refs = this.indexRef.split(',');
      this.keyRef = refs[0];
      this.indexRef = refs[1];
    }

    var ks = keys(value);
    this.length = ks.length;

    this.iterations = ks.map(function (key, index) {
      return this$1.createIteration(key, index);
    });
  }

  return this;
};

RepeatedFragment__proto__.bubble = function bubble (index) {
  if (!this.bubbled) { this.bubbled = []; }
  this.bubbled.push(index);

  if (!this.rebounding) { this.owner.bubble(); }
};

RepeatedFragment__proto__.createIteration = function createIteration (key, index) {
  var fragment = new Fragment({
    owner: this,
    template: this.template
  });

  fragment.isIteration = true;
  fragment.delegate = this.delegate;

  if (this.aliases) { fragment.aliases = {}; }
  swizzleFragment(this, fragment, key, index);

  return fragment.bind(fragment.context);
};

RepeatedFragment__proto__.destroyed = function destroyed () {
    var this$1 = this;

  var len = this.iterations.length;
  for (var i = 0; i < len; i++) { this$1.iterations[i].destroyed(); }
  if (this.pathModel) { this.pathModel.destroyed(); }
  if (this.rootModel) { this.rootModel.destroyed(); }
};

RepeatedFragment__proto__.detach = function detach () {
  var docFrag = createDocumentFragment();
  this.iterations.forEach(function (fragment) { return docFrag.appendChild(fragment.detach()); });
  return docFrag;
};

RepeatedFragment__proto__.find = function find (selector, options) {
  return findMap(this.iterations, function (i) { return i.find(selector, options); });
};

RepeatedFragment__proto__.findAll = function findAll (selector, options) {
  return this.iterations.forEach(function (i) { return i.findAll(selector, options); });
};

RepeatedFragment__proto__.findAllComponents = function findAllComponents (name, options) {
  return this.iterations.forEach(function (i) { return i.findAllComponents(name, options); });
};

RepeatedFragment__proto__.findComponent = function findComponent (name, options) {
  return findMap(this.iterations, function (i) { return i.findComponent(name, options); });
};

RepeatedFragment__proto__.findContext = function findContext () {
  return this.context;
};

RepeatedFragment__proto__.findNextNode = function findNextNode (iteration) {
    var this$1 = this;

  if (iteration.index < this.iterations.length - 1) {
    for (var i = iteration.index + 1; i < this.iterations.length; i++) {
      var node = this$1.iterations[i].firstNode(true);
      if (node) { return node; }
    }
  }

  return this.owner.findNextNode();
};

RepeatedFragment__proto__.firstNode = function firstNode (skipParent) {
  return this.iterations[0] ? this.iterations[0].firstNode(skipParent) : null;
};

RepeatedFragment__proto__.getLast = function getLast () {
  return this.lastModel || (this.lastModel = new KeyModel(this.length - 1));
};

RepeatedFragment__proto__.rebind = function rebind (next) {
    var this$1 = this;

  this.context = next;
  if (this.source) { return; }
  this.iterations.forEach(function (fragment) {
    swizzleFragment(this$1, fragment, fragment.key, fragment.index);
  });
};

RepeatedFragment__proto__.rebound = function rebound (update$$1) {
    var this$1 = this;

  this.context = this.owner.model;
  this.iterations.forEach(function (f, i) {
    f.context = contextFor(this$1, f, i);
    f.rebound(update$$1);
  });
};

RepeatedFragment__proto__.render = function render (target, occupants) {
  var xs = this.iterations;
  if (xs) {
    var len = xs.length;
    for (var i = 0; i < len; i++) {
      xs[i].render(target, occupants);
    }
  }

  this.rendered = true;
};

RepeatedFragment__proto__.shuffle = function shuffle (newIndices, merge) {
    var this$1 = this;

  if (!this.pendingNewIndices) { this.previousIterations = this.iterations.slice(); }

  if (!this.pendingNewIndices) { this.pendingNewIndices = []; }

  this.pendingNewIndices.push(newIndices);

  var iterations = [];

  newIndices.forEach(function (newIndex, oldIndex) {
    if (newIndex === -1) { return; }

    var fragment = this$1.iterations[oldIndex];
    iterations[newIndex] = fragment;

    if (newIndex !== oldIndex && fragment) {
      fragment.dirty = true;
      if (merge) { fragment.shouldRebind = 1; }
    }
  });

  this.iterations = iterations;

  // if merging, we're in the midst of an update already
  if (!merge) { this.bubble(); }
};

RepeatedFragment__proto__.shuffled = function shuffled$1 () {
  this.iterations.forEach(shuffled);
};

RepeatedFragment__proto__.toString = function toString (escape) {
  return this.iterations ? this.iterations.map(escape ? toEscapedString : toString$1).join('') : '';
};

RepeatedFragment__proto__.unbind = function unbind (view) {
  this.bound = false;
  if (this.source) { this.source.model.unregister(this.source); }
  var iterations = this.pendingNewIndices ? this.previousIterations : this.iterations;
  var len = iterations.length;
  for (var i = 0; i < len; i++) { iterations[i].unbind(view); }
  return this;
};

RepeatedFragment__proto__.unrender = function unrender (shouldDestroy) {
    var this$1 = this;

  var len = this.iterations.length;
  for (var i = 0; i < len; i++) { this$1.iterations[i].unrender(shouldDestroy); }
  if (this.pendingNewIndices && this.previousIterations) {
    len = this.previousIterations.length;
    for (var i$1 = 0; i$1 < len; i$1++) { this$1.previousIterations[i$1].unrender(shouldDestroy); }
  }
  this.rendered = false;
};

RepeatedFragment__proto__.update = function update$3 () {
    var this$1 = this;

  if (this.pendingNewIndices) {
    this.bubbled.length = 0;
    this.updatePostShuffle();
    return;
  }

  if (this.updating) { return; }
  this.updating = true;

  if (this.shuffler) {
    var values = shuffleValues(this, this.shuffler);
    var newIndices = buildNewIndices(this.values, values);
    if (!newIndices.same) {
      this.shuffle(newIndices, true);
      this.updatePostShuffle();
    } else {
      this.iterations.forEach(update);
    }
  } else {
    var len = this.iterations.length;
    for (var i = 0; i < len; i++) {
      var f = this$1.iterations[i];
      f && f.idxModel && f.idxModel.applyValue(i);
    }

    var value = this.context.get();
    var wasArray = this.isArray;

    var toRemove;
    var oldKeys;
    var reset = true;
    var i$1;

    if ((this.isArray = isArray(value))) {
      // if there's a source to map back to, make sure everything stays bound correctly
      if (this.source) {
        this.rebounding = 1;
        var source = this.source.model.get();
        this.iterations.forEach(function (f, c) {
          if (c < value.length && f.lastValue !== value[c] && ~(i$1 = source.indexOf(value[c]))) {
            swizzleFragment(this$1, f, c, c);
            f.rebound(true);
          }
        });
        this.rebounding = 0;
      }

      if (wasArray) {
        reset = false;
        if (this.iterations.length > value.length) {
          toRemove = this.iterations.splice(value.length);
        }
      }
    } else if (isObject(value) && !wasArray) {
      reset = false;
      toRemove = [];
      oldKeys = {};
      i$1 = this.iterations.length;

      while (i$1--) {
        var fragment = this$1.iterations[i$1];
        if (fragment.key in value) {
          oldKeys[fragment.key] = true;
        } else {
          this$1.iterations.splice(i$1, 1);
          toRemove.push(fragment);
        }
      }
    }

    var newLength = isArray(value) ? value.length : isObject(value) ? keys(value).length : 0;
    this.length = newLength;
    this.updateLast();

    if (reset) {
      toRemove = this.iterations;
      this.iterations = [];
    }

    if (toRemove) {
      len = toRemove.length;
      for (var i$2 = 0; i$2 < len; i$2++) { toRemove[i$2].unbind().unrender(true); }
    }

    // update the remaining ones
    if (!reset && this.isArray && this.bubbled && this.bubbled.length) {
      var bubbled = this.bubbled;
      this.bubbled = [];
      len = bubbled.length;
      for (var i$3 = 0; i$3 < len; i$3++)
        { this$1.iterations[bubbled[i$3]] && this$1.iterations[bubbled[i$3]].update(); }
    } else {
      len = this.iterations.length;
      for (var i$4 = 0; i$4 < len; i$4++) { this$1.iterations[i$4].update(); }
    }

    // add new iterations
    var docFrag;
    var fragment$1;

    if (newLength > this.iterations.length) {
      docFrag = this.rendered ? createDocumentFragment() : null;
      i$1 = this.iterations.length;

      if (isArray(value)) {
        while (i$1 < value.length) {
          fragment$1 = this$1.createIteration(i$1, i$1);

          this$1.iterations.push(fragment$1);
          if (this$1.rendered) { fragment$1.render(docFrag); }

          i$1 += 1;
        }
      } else if (isObject(value)) {
        // TODO this is a dreadful hack. There must be a neater way
        if (this.indexRef && !this.keyRef) {
          var refs = this.indexRef.split(',');
          this.keyRef = refs[0];
          this.indexRef = refs[1];
        }

        keys(value).forEach(function (key) {
          if (!oldKeys || !(key in oldKeys)) {
            fragment$1 = this$1.createIteration(key, i$1);

            this$1.iterations.push(fragment$1);
            if (this$1.rendered) { fragment$1.render(docFrag); }

            i$1 += 1;
          }
        });
      }

      if (this.rendered) {
        var parentNode = this.parent.findParentNode();
        var anchor = this.parent.findNextNode(this.owner);

        parentNode.insertBefore(docFrag, anchor);
      }
    }
  }

  this.updating = false;
};

RepeatedFragment__proto__.updateLast = function updateLast () {
  if (this.lastModel) { this.lastModel.applyValue(this.length - 1); }
};

RepeatedFragment__proto__.updatePostShuffle = function updatePostShuffle () {
    var this$1 = this;

  var newIndices = this.pendingNewIndices[0];
  var parentNode = this.rendered ? this.parent.findParentNode() : null;
  var nextNode = parentNode && this.owner.findNextNode();
  var docFrag = parentNode ? createDocumentFragment() : null;

  // map first shuffle through
  this.pendingNewIndices.slice(1).forEach(function (indices) {
    newIndices.forEach(function (newIndex, oldIndex) {
      newIndices[oldIndex] = indices[newIndex];
    });
  });

  var len = (this.length = this.context.get().length);
  var prev = this.previousIterations;
  var iters = this.iterations;
  var value = this.context.get();
  var stash = {};
  var idx, dest, pos, next, anchor, rebound;

  var map = new Array(newIndices.length);
  newIndices.forEach(function (e, i) { return (map[e] = i); });

  this.updateLast();

  idx = pos = 0;
  while (idx < len) {
    // if there's not an existing thing to shuffle, handle that
    if (isUndefined(map[idx])) {
      next = iters[idx] = this$1.createIteration(idx, idx);
      if (parentNode) {
        anchor = prev[pos];
        anchor = (anchor && parentNode && anchor.firstNode()) || nextNode;

        next.render(docFrag);
        parentNode.insertBefore(docFrag, anchor);
      }

      idx++;
    } else {
      dest = newIndices[pos];

      if (dest === -1) {
        // if it needs to be dropped, drop it
        prev[pos] && prev[pos].unbind().unrender(true);
        prev[pos++] = 0;
      } else if (dest > idx) {
        // if it needs to move down, stash it
        stash[dest] = prev[pos];
        prev[pos++] = null;
      } else {
        // get the fragment that goes for this idx
        iters[idx] = next = iters[idx] || stash[idx] || this$1.createIteration(idx, idx);

        // if it's an existing fragment, swizzle
        if (stash[idx] || pos !== idx) {
          rebound = this$1.source && next.lastValue !== value[idx];
          swizzleFragment(this$1, next, idx, idx);
        }

        // does next need to be moved?
        if (parentNode && (stash[idx] || !prev[pos])) {
          anchor = prev[pos + 1];
          anchor = (anchor && parentNode && anchor.firstNode()) || nextNode;

          if (stash[idx]) {
            parentNode.insertBefore(next.detach(), anchor);
          } else {
            next.render(docFrag);
            parentNode.insertBefore(docFrag, anchor);
          }
        }

        prev[pos++] = 0;
        idx++;
      }

      if (next && isObjectType(next)) {
        if (next.shouldRebind || rebound) {
          next.rebound(rebound);
          next.shouldRebind = 0;
        }
        next.update();
        next.shuffled();
      }
    }
  }

  // clean up any stragglers
  var plen = prev.length;
  for (var i = 0; i < plen; i++) { prev[i] && prev[i].unbind().unrender(true); }

  if (this.shuffler) { this.values = shuffleValues(this, this.shuffler); }

  this.pendingNewIndices = null;
  this.previousIterations = null;
};

RepeatedFragment.prototype.getContext = getContext;
RepeatedFragment.prototype.getKeypath = getKeypath;

// find the topmost delegate
function findDelegate(start) {
  var frag = start;
  var delegate, el;

  out: while (frag) {
    // find next element
    el = 0;
    while (!el && frag) {
      if (frag.owner.type === ELEMENT) { el = frag.owner; }
      if (frag.owner.ractive && frag.owner.ractive.delegate === false) { break out; }
      frag = frag.parent || frag.componentParent;
    }

    if (el.delegate === false) { break out; }
    delegate = el.delegate || el;

    // find next repeated fragment
    while (frag) {
      if (frag.iterations) { break; }
      if (frag.owner.ractive && frag.owner.ractive.delegate === false) { break out; }
      frag = frag.parent || frag.componentParent;
    }
  }

  return delegate;
}

function swizzleFragment(section, fragment, key, idx) {
  var model = section.context ? contextFor(section, fragment, key) : undefined;

  fragment.key = key;
  fragment.index = idx;
  fragment.context = model;
  if (section.source) { fragment.lastValue = model && model.get(); }

  if (fragment.idxModel) { fragment.idxModel.applyValue(idx); }
  if (fragment.keyModel) { fragment.keyModel.applyValue(key); }
  if (fragment.pathModel) {
    fragment.pathModel.context = model;
    fragment.pathModel.applyValue(model.getKeypath());
  }
  if (fragment.rootModel) {
    fragment.rootModel.context = model;
    fragment.rootModel.applyValue(model.getKeypath(fragment.ractive.root));
  }

  // handle any aliases
  var aliases = fragment.aliases;
  section.aliases &&
    section.aliases.forEach(function (a) {
      if (a.x.r === '.') { aliases[a.n] = model; }
      else if (a.x.r === '@index') { aliases[a.n] = fragment.getIndex(); }
      else if (a.x.r === '@key') { aliases[a.n] = fragment.getKey(); }
      else if (a.x.r === '@keypath') { aliases[a.n] = fragment.getKeypath(); }
      else if (a.x.r === '@rootpath') { aliases[a.n] = fragment.getKeypath(true); }
    });
}

function shuffleValues(section, shuffler) {
  var array = section.context.get() || [];
  if (shuffler === true) {
    return array.slice();
  } else {
    return array.map(function (v) { return shuffler.reduce(function (a, c) { return a && a[c]; }, v); });
  }
}

function contextFor(section, fragment, key) {
  if (section.source) {
    var idx;
    var source = section.source.model.get();
    if (source.indexOf && ~(idx = source.indexOf(section.context.joinKey(key).get())))
      { return section.source.model.joinKey(idx); }
  }

  return section.context.joinKey(key);
}

function isEmpty(value) {
  return (
    !value ||
    (isArray(value) && value.length === 0) ||
    (isObject(value) && keys(value).length === 0)
  );
}

function getType(value, hasIndexRef) {
  if (hasIndexRef || isArray(value)) { return SECTION_EACH; }
  if (isObjectLike(value)) { return SECTION_IF_WITH; }
  if (isUndefined(value)) { return null; }
  return SECTION_IF;
}

var Section = (function (MustacheContainer) {
  function Section(options) {
    MustacheContainer.call(this, options);

    this.isAlias = options.template.t === ALIAS;
    this.sectionType = options.template.n || (this.isAlias && SECTION_WITH) || null;
    this.templateSectionType = this.sectionType;
    this.subordinate = options.template.l === 1;
    this.fragment = null;
  }

  if ( MustacheContainer ) Section.__proto__ = MustacheContainer;
  var Section__proto__ = Section.prototype = Object.create( MustacheContainer && MustacheContainer.prototype );
  Section__proto__.constructor = Section;

  Section__proto__.bind = function bind () {
    MustacheContainer.prototype.bind.call(this);

    if (this.subordinate) {
      this.sibling = this.up.items[this.up.items.indexOf(this) - 1];
      this.sibling.nextSibling = this;
    }

    // if we managed to bind, we need to create children
    if (this.model || this.isAlias) {
      this.dirty = true;
      this.update();
    } else if (
      this.sectionType &&
      this.sectionType === SECTION_UNLESS &&
      (!this.sibling || !this.sibling.isTruthy())
    ) {
      this.fragment = new Fragment({
        owner: this,
        template: this.template.f
      }).bind();
    }
  };

  Section__proto__.bubble = function bubble () {
    if (!this.dirty && this.yield) {
      this.dirty = true;
      this.containerFragment.bubble();
    } else { MustacheContainer.prototype.bubble.call(this); }
  };

  Section__proto__.detach = function detach () {
    var frag = this.fragment || this.detached;
    return frag ? frag.detach() : MustacheContainer.prototype.detach.call(this);
  };

  Section__proto__.isTruthy = function isTruthy () {
    if (this.subordinate && this.sibling.isTruthy()) { return true; }
    var value = !this.model ? undefined : this.model.isRoot ? this.model.value : this.model.get();
    return !!value && (this.templateSectionType === SECTION_IF_WITH || !isEmpty(value));
  };

  Section__proto__.rebind = function rebind (next, previous, safe) {
    if (MustacheContainer.prototype.rebind.call(this, next, previous, safe)) {
      if (this.fragment && this.sectionType !== SECTION_IF && this.sectionType !== SECTION_UNLESS) {
        this.fragment.rebind(next);
      }
    }
  };

  Section__proto__.rebound = function rebound (update) {
    if (this.model) {
      if (this.model.rebound) { this.model.rebound(update); }
      else {
        MustacheContainer.prototype.unbind.call(this);
        MustacheContainer.prototype.bind.call(this);
        if (
          this.sectionType === SECTION_WITH ||
          this.sectionType === SECTION_IF_WITH ||
          this.sectionType === SECTION_EACH
        ) {
          if (this.fragment) { this.fragment.rebind(this.model); }
        }

        if (update) { this.bubble(); }
      }
    }
    if (this.fragment) { this.fragment.rebound(update); }
  };

  Section__proto__.render = function render (target, occupants) {
    this.rendered = true;
    if (this.fragment) { this.fragment.render(target, occupants); }
  };

  Section__proto__.shuffle = function shuffle (newIndices) {
    if (this.fragment && this.sectionType === SECTION_EACH) {
      this.fragment.shuffle(newIndices);
    }
  };

  Section__proto__.unbind = function unbind (view) {
    MustacheContainer.prototype.unbind.call(this, view);
    if (this.fragment) { this.fragment.unbind(view); }
  };

  Section__proto__.unrender = function unrender (shouldDestroy) {
    if (this.rendered && this.fragment) { this.fragment.unrender(shouldDestroy); }
    this.rendered = false;
  };

  Section__proto__.update = function update () {
    var this$1 = this;

    if (!this.dirty) { return; }

    if (this.fragment && this.sectionType !== SECTION_IF && this.sectionType !== SECTION_UNLESS) {
      this.fragment.context = this.model;
    }

    if (!this.model && this.sectionType !== SECTION_UNLESS && !this.isAlias) { return; }

    this.dirty = false;

    var value = !this.model ? undefined : this.model.isRoot ? this.model.value : this.model.get();
    var siblingFalsey = !this.subordinate || !this.sibling.isTruthy();
    var lastType = this.sectionType;

    if (this.yield && this.yield !== value) {
      this.up = this.containerFragment;
      this.container = null;
      this.yield = null;
      if (this.rendered) { this.fragment.unbind().unrender(true); }
      this.fragment = null;
    } else if (this.rendered && !this.yield && value instanceof Context) {
      if (this.rendered && this.fragment) { this.fragment.unbind().unrender(true); }
      this.fragment = null;
    }

    // watch for switching section types
    if (this.sectionType === null || this.templateSectionType === null)
      { this.sectionType = getType(value, this.template.i); }
    if (lastType && lastType !== this.sectionType && this.fragment) {
      if (this.rendered) {
        this.fragment.unbind().unrender(true);
      }

      this.fragment = null;
    }

    var newFragment;

    var fragmentShouldExist =
      this.sectionType === SECTION_EACH || // each always gets a fragment, which may have no iterations
      this.sectionType === SECTION_WITH || // with (partial context) always gets a fragment
      (siblingFalsey &&
        (this.sectionType === SECTION_UNLESS ? !this.isTruthy() : this.isTruthy())) || // if, unless, and if-with depend on siblings and the condition
      this.isAlias;

    if (fragmentShouldExist) {
      if (!this.fragment) { this.fragment = this.detached; }

      if (this.fragment) {
        // check for detached fragment
        if (this.detached) {
          attach(this, this.fragment);
          this.detached = false;
          this.rendered = true;
        }

        if (!this.fragment.bound) { this.fragment.bind(this.model); }
        this.fragment.update();
      } else {
        if (this.sectionType === SECTION_EACH) {
          newFragment = new RepeatedFragment({
            owner: this,
            template: this.template.f,
            indexRef: this.template.i
          }).bind(this.model);
        } else {
          // only with and if-with provide context - if and unless do not
          var context =
            this.sectionType !== SECTION_IF && this.sectionType !== SECTION_UNLESS
              ? this.model
              : null;

          if (value instanceof Context) {
            this.yield = value;
            this.containerFragment = this.up;
            this.up = value.fragment;
            this.container = value.ractive;
            context = undefined;
          }

          newFragment = new Fragment({
            owner: this,
            template: this.template.f
          }).bind(context);
        }
      }
    } else {
      if (this.fragment && this.rendered) {
        if (keep !== true) {
          this.fragment.unbind().unrender(true);
        } else {
          this.unrender(false);
          this.detached = this.fragment;
          runloop.promise().then(function () {
            if (this$1.detached) { this$1.detach(); }
          });
        }
      } else if (this.fragment) {
        this.fragment.unbind();
      }

      this.fragment = null;
    }

    if (newFragment) {
      if (this.rendered) {
        attach(this, newFragment);
      }

      this.fragment = newFragment;
    }

    if (this.nextSibling) {
      this.nextSibling.dirty = true;
      this.nextSibling.update();
    }
  };

  return Section;
}(MustacheContainer));

function attach(section, fragment) {
  var anchor = (section.containerFragment || section.up).findNextNode(section);

  if (anchor) {
    var docFrag = createDocumentFragment();
    fragment.render(docFrag);

    anchor.parentNode.insertBefore(docFrag, anchor);
  } else {
    fragment.render(section.up.findParentNode());
  }
}

var Select = (function (Element) {
  function Select(options) {
    Element.call(this, options);
    this.options = [];
  }

  if ( Element ) Select.__proto__ = Element;
  var Select__proto__ = Select.prototype = Object.create( Element && Element.prototype );
  Select__proto__.constructor = Select;

  Select__proto__.foundNode = function foundNode (node) {
    if (this.binding) {
      var selectedOptions = getSelectedOptions(node);

      if (selectedOptions.length > 0) {
        this.selectedOptions = selectedOptions;
      }
    }
  };

  Select__proto__.render = function render (target, occupants) {
    Element.prototype.render.call(this, target, occupants);
    this.sync();

    var node = this.node;

    var i = node.options.length;
    while (i--) {
      node.options[i].defaultSelected = node.options[i].selected;
    }

    this.rendered = true;
  };

  Select__proto__.sync = function sync () {
    var this$1 = this;

    var selectNode = this.node;

    if (!selectNode) { return; }

    var options = toArray(selectNode.options);

    if (this.selectedOptions) {
      options.forEach(function (o) {
        if (this$1.selectedOptions.indexOf(o) >= 0) { o.selected = true; }
        else { o.selected = false; }
      });
      this.binding.setFromNode(selectNode);
      delete this.selectedOptions;
      return;
    }

    var selectValue = this.getAttribute('value');
    var isMultiple = this.getAttribute('multiple');
    var array = isMultiple && isArray(selectValue);

    // If the <select> has a specified value, that should override
    // these options
    if (selectValue !== undefined) {
      var optionWasSelected;

      options.forEach(function (o) {
        var optionValue = o._ractive ? o._ractive.value : o.value;
        var shouldSelect = isMultiple
          ? array && this$1.valueContains(selectValue, optionValue)
          : this$1.compare(selectValue, optionValue);

        if (shouldSelect) {
          optionWasSelected = true;
        }

        o.selected = shouldSelect;
      });

      if (!optionWasSelected && !isMultiple) {
        if (this.binding) {
          this.binding.forceUpdate();
        }
      }
    } else if (this.binding && this.binding.forceUpdate) {
      // Otherwise the value should be initialised according to which
      // <option> element is selected, if twoway binding is in effect
      this.binding.forceUpdate();
    }
  };
  Select__proto__.valueContains = function valueContains (selectValue, optionValue) {
    var this$1 = this;

    var i = selectValue.length;
    while (i--) {
      if (this$1.compare(optionValue, selectValue[i])) { return true; }
    }
  };
  Select__proto__.compare = function compare (optionValue, selectValue) {
    var comparator = this.getAttribute('value-comparator');
    if (comparator) {
      if (isFunction(comparator)) {
        return comparator(selectValue, optionValue);
      }
      if (selectValue && optionValue) {
        return selectValue[comparator] == optionValue[comparator];
      }
    }
    return selectValue == optionValue;
  };
  Select__proto__.update = function update () {
    var dirty = this.dirty;
    Element.prototype.update.call(this);
    if (dirty) {
      this.sync();
    }
  };

  return Select;
}(Element));

var Textarea = (function (Input) {
  function Textarea(options) {
    var template = options.template;

    options.deferContent = true;

    Input.call(this, options);

    // check for single interpolator binding
    if (!this.attributeByName.value) {
      if (template.f && isBindable({ template: template })) {
        (this.attributes || (this.attributes = [])).push(
          createItem({
            owner: this,
            template: { t: ATTRIBUTE, f: template.f, n: 'value' },
            up: this.up
          })
        );
      } else {
        this.fragment = new Fragment({
          owner: this,
          cssIds: null,
          template: template.f
        });
      }
    }
  }

  if ( Input ) Textarea.__proto__ = Input;
  var Textarea__proto__ = Textarea.prototype = Object.create( Input && Input.prototype );
  Textarea__proto__.constructor = Textarea;

  Textarea__proto__.bubble = function bubble () {
    var this$1 = this;

    if (!this.dirty) {
      this.dirty = true;

      if (this.rendered && !this.binding && this.fragment) {
        runloop.scheduleTask(function () {
          this$1.dirty = false;
          this$1.node.value = this$1.fragment.toString();
        });
      }

      this.up.bubble(); // default behaviour
    }
  };

  return Textarea;
}(Input));

var Text = (function (Item) {
  function Text(options) {
    Item.call(this, options);
    this.type = TEXT;
  }

  if ( Item ) Text.__proto__ = Item;
  var Text__proto__ = Text.prototype = Object.create( Item && Item.prototype );
  Text__proto__.constructor = Text;

  Text__proto__.detach = function detach () {
    return detachNode(this.node);
  };

  Text__proto__.firstNode = function firstNode () {
    return this.node;
  };

  Text__proto__.render = function render (target, occupants) {
    if (inAttributes()) { return; }
    this.rendered = true;

    progressiveText(this, target, occupants, this.template);
  };

  Text__proto__.toString = function toString (escape) {
    return escape ? escapeHtml(this.template) : this.template;
  };

  Text__proto__.unrender = function unrender (shouldDestroy) {
    if (this.rendered && shouldDestroy) { this.detach(); }
    this.rendered = false;
  };

  Text__proto__.valueOf = function valueOf () {
    return this.template;
  };

  return Text;
}(Item));

var proto$7 = Text.prototype;
proto$7.bind = proto$7.unbind = proto$7.update = noop;

var visible;
var hidden = 'hidden';

if (doc) {
  var prefix$2;

  /* istanbul ignore next */
  if (hidden in doc) {
    prefix$2 = '';
  } else {
    var i$1 = vendors.length;
    while (i$1--) {
      var vendor = vendors[i$1];
      hidden = vendor + 'Hidden';

      if (hidden in doc) {
        prefix$2 = vendor;
        break;
      }
    }
  }

  /* istanbul ignore else */
  if (prefix$2 !== undefined) {
    doc.addEventListener(prefix$2 + 'visibilitychange', onChange);
    onChange();
  } else {
    // gah, we're in an old browser
    if ('onfocusout' in doc) {
      doc.addEventListener('focusout', onHide);
      doc.addEventListener('focusin', onShow);
    } else {
      win.addEventListener('pagehide', onHide);
      win.addEventListener('blur', onHide);

      win.addEventListener('pageshow', onShow);
      win.addEventListener('focus', onShow);
    }

    visible = true; // until proven otherwise. Not ideal but hey
  }
}

function onChange() {
  visible = !doc[hidden];
}

/* istanbul ignore next */
function onHide() {
  visible = false;
}

/* istanbul ignore next */
function onShow() {
  visible = true;
}

var prefix;

/* istanbul ignore next */
if (!isClient) {
  prefix = null;
} else {
  var prefixCache = {};
  var testStyle = createElement('div').style;

  // technically this also normalizes on hyphenated styles as well
  prefix = function(prop) {
    if (!prefixCache[prop]) {
      var name = hyphenateCamel(prop);

      if (testStyle[prop] !== undefined) {
        prefixCache[prop] = name;
      } else {
        /* istanbul ignore next */
        // test vendors...
        var i = vendors.length;
        while (i--) {
          var vendor = "-" + (vendors[i]) + "-" + name;
          if (testStyle[vendor] !== undefined) {
            prefixCache[prop] = vendor;
            break;
          }
        }
      }
    }

    return prefixCache[prop];
  };
}

var prefix$1 = prefix;

var vendorPattern = new RegExp('^(?:' + vendors.join('|') + ')([A-Z])');

function hyphenate(str) {
  /* istanbul ignore next */
  if (!str) { return ''; } // edge case

  /* istanbul ignore next */
  if (vendorPattern.test(str)) { str = '-' + str; }

  return str.replace(/[A-Z]/g, function (match) { return '-' + match.toLowerCase(); });
}

var createTransitions;

if (!isClient) {
  createTransitions = null;
} else {
  var testStyle$1 = createElement('div').style;
  var linear$1 = function (x) { return x; };

  var canUseCssTransitions = {};
  var cannotUseCssTransitions = {};

  // determine some facts about our environment
  var TRANSITION$1;
  var TRANSITIONEND;
  var CSS_TRANSITIONS_ENABLED;
  var TRANSITION_DURATION;
  var TRANSITION_PROPERTY;
  var TRANSITION_TIMING_FUNCTION;

  if (testStyle$1.transition !== undefined) {
    TRANSITION$1 = 'transition';
    TRANSITIONEND = 'transitionend';
    CSS_TRANSITIONS_ENABLED = true;
  } else if (testStyle$1.webkitTransition !== undefined) {
    TRANSITION$1 = 'webkitTransition';
    TRANSITIONEND = 'webkitTransitionEnd';
    CSS_TRANSITIONS_ENABLED = true;
  } else {
    CSS_TRANSITIONS_ENABLED = false;
  }

  if (TRANSITION$1) {
    TRANSITION_DURATION = TRANSITION$1 + 'Duration';
    TRANSITION_PROPERTY = TRANSITION$1 + 'Property';
    TRANSITION_TIMING_FUNCTION = TRANSITION$1 + 'TimingFunction';
  }

  createTransitions = function(t, to, options, changedProperties, resolve) {
    // Wait a beat (otherwise the target styles will be applied immediately)
    // TODO use a fastdom-style mechanism?
    setTimeout(function () {
      var jsTransitionsComplete;
      var cssTransitionsComplete;
      var cssTimeout; // eslint-disable-line prefer-const

      function transitionDone() {
        clearTimeout(cssTimeout);
      }

      function checkComplete() {
        if (jsTransitionsComplete && cssTransitionsComplete) {
          t.unregisterCompleteHandler(transitionDone);
          // will changes to events and fire have an unexpected consequence here?
          t.ractive.fire(t.name + ':end', t.node, t.isIntro);
          resolve();
        }
      }

      // this is used to keep track of which elements can use CSS to animate
      // which properties
      var hashPrefix = (t.node.namespaceURI || '') + t.node.tagName;

      // need to reset transition properties
      var style = t.node.style;
      var previous = {
        property: style[TRANSITION_PROPERTY],
        timing: style[TRANSITION_TIMING_FUNCTION],
        duration: style[TRANSITION_DURATION]
      };

      function transitionEndHandler(event) {
        if (event.target !== t.node) { return; }
        var index = changedProperties.indexOf(event.propertyName);

        if (index !== -1) {
          changedProperties.splice(index, 1);
        }

        if (changedProperties.length) {
          // still transitioning...
          return;
        }

        clearTimeout(cssTimeout);
        cssTransitionsDone();
      }

      function cssTransitionsDone() {
        style[TRANSITION_PROPERTY] = previous.property;
        style[TRANSITION_TIMING_FUNCTION] = previous.duration;
        style[TRANSITION_DURATION] = previous.timing;

        t.node.removeEventListener(TRANSITIONEND, transitionEndHandler, false);

        cssTransitionsComplete = true;
        checkComplete();
      }

      t.node.addEventListener(TRANSITIONEND, transitionEndHandler, false);

      // safety net in case transitionend never fires
      cssTimeout = setTimeout(function () {
        changedProperties = [];
        cssTransitionsDone();
      }, options.duration + (options.delay || 0) + 50);
      t.registerCompleteHandler(transitionDone);

      style[TRANSITION_PROPERTY] = changedProperties.join(',');
      var easingName = hyphenate(options.easing || 'linear');
      style[TRANSITION_TIMING_FUNCTION] = easingName;
      var cssTiming = style[TRANSITION_TIMING_FUNCTION] === easingName;
      style[TRANSITION_DURATION] = options.duration / 1000 + 's';

      setTimeout(function () {
        var i = changedProperties.length;
        var hash;
        var originalValue = null;
        var index;
        var propertiesToTransitionInJs = [];
        var prop;
        var suffix;
        var interpolator;

        while (i--) {
          prop = changedProperties[i];
          hash = hashPrefix + prop;

          if (cssTiming && CSS_TRANSITIONS_ENABLED && !cannotUseCssTransitions[hash]) {
            var initial = style[prop];
            style[prop] = to[prop];

            // If we're not sure if CSS transitions are supported for
            // this tag/property combo, find out now
            if (!(hash in canUseCssTransitions)) {
              originalValue = t.getStyle(prop);

              // if this property is transitionable in this browser,
              // the current style will be different from the target style
              canUseCssTransitions[hash] = t.getStyle(prop) != to[prop];
              cannotUseCssTransitions[hash] = !canUseCssTransitions[hash];

              // Reset, if we're going to use timers after all
              if (cannotUseCssTransitions[hash]) {
                style[prop] = initial;
              }
            }
          }

          if (!cssTiming || !CSS_TRANSITIONS_ENABLED || cannotUseCssTransitions[hash]) {
            // we need to fall back to timer-based stuff
            if (originalValue === null) { originalValue = t.getStyle(prop); }

            // need to remove this from changedProperties, otherwise transitionEndHandler
            // will get confused
            index = changedProperties.indexOf(prop);
            if (index === -1) {
              warnIfDebug(
                'Something very strange happened with transitions. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!',
                { node: t.node }
              );
            } else {
              changedProperties.splice(index, 1);
            }

            // TODO Determine whether this property is animatable at all

            suffix = /[^\d]*$/.exec(originalValue)[0];
            interpolator = interpolate(parseFloat(originalValue), parseFloat(to[prop]));

            // ...then kick off a timer-based transition
            if (interpolator) {
              propertiesToTransitionInJs.push({
                name: prop,
                interpolator: interpolator,
                suffix: suffix
              });
            } else {
              style[prop] = to[prop];
            }

            originalValue = null;
          }
        }

        // javascript transitions
        if (propertiesToTransitionInJs.length) {
          var easing;

          if (isString(options.easing)) {
            easing = t.ractive.easing[options.easing];

            if (!easing) {
              warnOnceIfDebug(missingPlugin(options.easing, 'easing'));
              easing = linear$1;
            }
          } else if (isFunction(options.easing)) {
            easing = options.easing;
          } else {
            easing = linear$1;
          }

          new Ticker({
            duration: options.duration,
            easing: easing,
            step: function step(pos) {
              var i = propertiesToTransitionInJs.length;
              while (i--) {
                var prop = propertiesToTransitionInJs[i];
                style[prop.name] = prop.interpolator(pos) + prop.suffix;
              }
            },
            complete: function complete() {
              jsTransitionsComplete = true;
              checkComplete();
            }
          });
        } else {
          jsTransitionsComplete = true;
        }

        if (changedProperties.length) {
          style[TRANSITION_PROPERTY] = changedProperties.join(',');
        } else {
          style[TRANSITION_PROPERTY] = 'none';

          // We need to cancel the transitionEndHandler, and deal with
          // the fact that it will never fire
          t.node.removeEventListener(TRANSITIONEND, transitionEndHandler, false);
          cssTransitionsComplete = true;
          checkComplete();
        }
      }, 0);
    }, options.delay || 0);
  };
}

var createTransitions$1 = createTransitions;

var getComputedStyle = win && win.getComputedStyle;
var resolved = Promise.resolve();

var names = {
  t0: 'intro-outro',
  t1: 'intro',
  t2: 'outro'
};

var Transition = function Transition(options) {
  this.owner = options.owner || options.up.owner || findElement(options.up);
  this.element = this.owner.attributeByName ? this.owner : findElement(options.up);
  this.ractive = this.owner.ractive;
  this.template = options.template;
  this.up = options.up;
  this.options = options;
  this.onComplete = [];
};
var Transition__proto__ = Transition.prototype;

Transition__proto__.animateStyle = function animateStyle (style, value, options) {
    var this$1 = this;

  if (arguments.length === 4) {
    throw new Error(
      't.animateStyle() returns a promise - use .then() instead of passing a callback'
    );
  }

  // Special case - page isn't visible. Don't animate anything, because
  // that way you'll never get CSS transitionend events
  if (!visible) {
    this.setStyle(style, value);
    return resolved;
  }

  var to;

  if (isString(style)) {
    to = {};
    to[style] = value;
  } else {
    to = style;

    // shuffle arguments
    options = value;
  }

  return new Promise(function (fulfil) {
    // Edge case - if duration is zero, set style synchronously and complete
    if (!options.duration) {
      this$1.setStyle(to);
      fulfil();
      return;
    }

    // Get a list of the properties we're animating
    var propertyNames = keys(to);
    var changedProperties = [];

    // Store the current styles
    var computedStyle = getComputedStyle(this$1.node);

    var i = propertyNames.length;
    while (i--) {
      var prop = propertyNames[i];
      var name = prefix$1(prop);

      var current = computedStyle[prefix$1(prop)];

      // record the starting points
      var init = this$1.node.style[name];
      if (!(name in this$1.originals)) { this$1.originals[name] = this$1.node.style[name]; }
      this$1.node.style[name] = to[prop];
      this$1.targets[name] = this$1.node.style[name];
      this$1.node.style[name] = init;

      // we need to know if we're actually changing anything
      if (current != to[prop]) {
        // use != instead of !==, so we can compare strings with numbers
        changedProperties.push(name);

        // if we happened to prefix, make sure there is a properly prefixed value
        to[name] = to[prop];

        // make the computed style explicit, so we can animate where
        // e.g. height='auto'
        this$1.node.style[name] = current;
      }
    }

    // If we're not actually changing anything, the transitionend event
    // will never fire! So we complete early
    if (!changedProperties.length) {
      fulfil();
      return;
    }

    createTransitions$1(this$1, to, options, changedProperties, fulfil);
  });
};

Transition__proto__.bind = function bind () {
  var options = this.options;
  var type = options.template && options.template.v;
  if (type) {
    if (type === 't0' || type === 't1') { this.element.intro = this; }
    if (type === 't0' || type === 't2') { this.element.outro = this; }
    this.eventName = names[type];
  }

  var ractive = this.owner.ractive;

  this.name = options.name || options.template.n;

  if (options.params) {
    this.params = options.params;
  }

  if (isFunction(this.name)) {
    this._fn = this.name;
    this.name = this._fn.name;
  } else {
    this._fn = findInViewHierarchy('transitions', ractive, this.name);
  }

  if (!this._fn) {
    warnOnceIfDebug(missingPlugin(this.name, 'transition'), { ractive: ractive });
  }

  setupArgsFn(this, options.template);
};

Transition__proto__.getParams = function getParams () {
  if (this.params) { return this.params; }

  // get expression args if supplied
  if (this.fn) {
    var values = resolveArgs(this, this.template, this.up).map(function (model) {
      if (!model) { return undefined; }

      return model.get();
    });
    return this.fn.apply(this.ractive, values);
  }
};

Transition__proto__.getStyle = function getStyle (props) {
  var computedStyle = getComputedStyle(this.node);

  if (isString(props)) {
    return computedStyle[prefix$1(props)];
  }

  if (!isArray(props)) {
    throw new Error(
      'Transition$getStyle must be passed a string, or an array of strings representing CSS properties'
    );
  }

  var styles = {};

  var i = props.length;
  while (i--) {
    var prop = props[i];
    var value = computedStyle[prefix$1(prop)];

    if (value === '0px') { value = 0; }
    styles[prop] = value;
  }

  return styles;
};

Transition__proto__.processParams = function processParams (params, defaults) {
  if (isNumber(params)) {
    params = { duration: params };
  } else if (isString(params)) {
    if (params === 'slow') {
      params = { duration: 600 };
    } else if (params === 'fast') {
      params = { duration: 200 };
    } else {
      params = { duration: 400 };
    }
  } else if (!params) {
    params = {};
  }

  return assign({}, defaults, params);
};

Transition__proto__.registerCompleteHandler = function registerCompleteHandler (fn) {
  addToArray(this.onComplete, fn);
};

Transition__proto__.setStyle = function setStyle (style, value) {
    var this$1 = this;

  if (isString(style)) {
    var name = prefix$1(style);
    if (!hasOwn(this.originals, name)) { this.originals[name] = this.node.style[name]; }
    this.node.style[name] = value;
    this.targets[name] = this.node.style[name];
  } else {
    var prop;
    for (prop in style) {
      if (hasOwn(style, prop)) {
        this$1.setStyle(prop, style[prop]);
      }
    }
  }

  return this;
};

Transition__proto__.shouldFire = function shouldFire (type) {
  if (!this.ractive.transitionsEnabled) { return false; }

  // check for noIntro and noOutro cases, which only apply when the owner ractive is rendering and unrendering, respectively
  if (type === 'intro' && this.ractive.rendering && nearestProp('noIntro', this.ractive, true))
    { return false; }
  if (type === 'outro' && this.ractive.unrendering && nearestProp('noOutro', this.ractive, false))
    { return false; }

  var params = this.getParams(); // this is an array, the params object should be the first member
  // if there's not a parent element, this can't be nested, so roll on
  if (!this.element.parent) { return true; }

  // if there is a local param, it takes precedent
  if (params && params[0] && isObject(params[0]) && 'nested' in params[0]) {
    if (params[0].nested !== false) { return true; }
  } else {
    // use the nearest instance setting
    // find the nearest instance that actually has a nested setting
    if (nearestProp('nestedTransitions', this.ractive) !== false) { return true; }
  }

  // check to see if this is actually a nested transition
  var el = this.element.parent;
  while (el) {
    if (el[type] && el[type].starting) { return false; }
    el = el.parent;
  }

  return true;
};

Transition__proto__.start = function start () {
    var this$1 = this;

  var node = (this.node = this.element.node);
  var originals = (this.originals = {}); //= node.getAttribute( 'style' );
  var targets = (this.targets = {});

  var completed;
  var args = this.getParams();

  // create t.complete() - we don't want this on the prototype,
  // because we don't want `this` silliness when passing it as
  // an argument
  this.complete = function (noReset) {
    this$1.starting = false;
    if (completed) {
      return;
    }

    this$1.onComplete.forEach(function (fn) { return fn(); });
    if (!noReset && this$1.isIntro) {
      for (var k in targets) {
        if (node.style[k] === targets[k]) { node.style[k] = originals[k]; }
      }
    }

    this$1._manager.remove(this$1);

    completed = true;
  };

  // If the transition function doesn't exist, abort
  if (!this._fn) {
    this.complete();
    return;
  }

  var promise = this._fn.apply(this.ractive, [this].concat(args));
  if (promise) { promise.then(this.complete); }
};

Transition__proto__.toString = function toString () {
  return '';
};

Transition__proto__.unbind = function unbind () {
  if (!this.element.attributes.unbinding) {
    var type = this.options && this.options.template && this.options.template.v;
    if (type === 't0' || type === 't1') { this.element.intro = null; }
    if (type === 't0' || type === 't2') { this.element.outro = null; }
  }
};

Transition__proto__.unregisterCompleteHandler = function unregisterCompleteHandler (fn) {
  removeFromArray(this.onComplete, fn);
};

var proto$8 = Transition.prototype;
proto$8.destroyed = proto$8.firstNode = proto$8.rebound = proto$8.render = proto$8.unrender = proto$8.update = noop;

function nearestProp(prop, ractive, rendering) {
  var instance = ractive;
  while (instance) {
    if (
      hasOwn(instance, prop) &&
      (isUndefined(rendering) || rendering ? instance.rendering : instance.unrendering)
    )
      { return instance[prop]; }
    instance = instance.component && instance.component.ractive;
  }

  return ractive[prop];
}

var elementCache = {};

var ieBug;
var ieBlacklist;

try {
  createElement('table').innerHTML = 'foo';
} catch (/* istanbul ignore next */ err) {
  ieBug = true;

  ieBlacklist = {
    TABLE: ['<table class="x">', '</table>'],
    THEAD: ['<table><thead class="x">', '</thead></table>'],
    TBODY: ['<table><tbody class="x">', '</tbody></table>'],
    TR: ['<table><tr class="x">', '</tr></table>'],
    SELECT: ['<select class="x">', '</select>']
  };
}

function insertHtml(html$$1, node) {
  var nodes = [];

  // render 0 and false
  if (html$$1 == null || html$$1 === '') { return nodes; }

  var container;
  var wrapper;
  var selectedOption;

  /* istanbul ignore if */
  if (ieBug && (wrapper = ieBlacklist[node.tagName])) {
    container = element('DIV');
    container.innerHTML = wrapper[0] + html$$1 + wrapper[1];
    container = container.querySelector('.x');

    if (container.tagName === 'SELECT') {
      selectedOption = container.options[container.selectedIndex];
    }
  } else if (node.namespaceURI === svg$1) {
    container = element('DIV');
    container.innerHTML = '<svg class="x">' + html$$1 + '</svg>';
    container = container.querySelector('.x');
  } else if (node.tagName === 'TEXTAREA') {
    container = createElement('div');

    if (typeof container.textContent !== 'undefined') {
      container.textContent = html$$1;
    } else {
      container.innerHTML = html$$1;
    }
  } else {
    container = element(node.tagName);
    container.innerHTML = html$$1;

    if (container.tagName === 'SELECT') {
      selectedOption = container.options[container.selectedIndex];
    }
  }

  var child;
  while ((child = container.firstChild)) {
    nodes.push(child);
    container.removeChild(child);
  }

  // This is really annoying. Extracting <option> nodes from the
  // temporary container <select> causes the remaining ones to
  // become selected. So now we have to deselect them. IE8, you
  // amaze me. You really do
  // ...and now Chrome too
  var i;
  if (node.tagName === 'SELECT') {
    i = nodes.length;
    while (i--) {
      if (nodes[i] !== selectedOption) {
        nodes[i].selected = false;
      }
    }
  }

  return nodes;
}

function element(tagName) {
  return elementCache[tagName] || (elementCache[tagName] = createElement(tagName));
}

var Triple = (function (Mustache) {
  function Triple(options) {
    Mustache.call(this, options);
  }

  if ( Mustache ) Triple.__proto__ = Mustache;
  var Triple__proto__ = Triple.prototype = Object.create( Mustache && Mustache.prototype );
  Triple__proto__.constructor = Triple;

  Triple__proto__.detach = function detach () {
    var docFrag = createDocumentFragment();
    if (this.nodes) { this.nodes.forEach(function (node) { return docFrag.appendChild(node); }); }
    return docFrag;
  };

  Triple__proto__.find = function find (selector) {
    var this$1 = this;

    var len = this.nodes.length;
    var i;

    for (i = 0; i < len; i += 1) {
      var node = this$1.nodes[i];

      if (node.nodeType !== 1) { continue; }

      if (matches(node, selector)) { return node; }

      var queryResult = node.querySelector(selector);
      if (queryResult) { return queryResult; }
    }

    return null;
  };

  Triple__proto__.findAll = function findAll (selector, options) {
    var this$1 = this;

    var result = options.result;
    var len = this.nodes.length;
    var i;

    for (i = 0; i < len; i += 1) {
      var node = this$1.nodes[i];

      if (node.nodeType !== 1) { continue; }

      if (matches(node, selector)) { result.push(node); }

      var queryAllResult = node.querySelectorAll(selector);
      if (queryAllResult) {
        result.push.apply(result, queryAllResult);
      }
    }
  };

  Triple__proto__.findComponent = function findComponent () {
    return null;
  };

  Triple__proto__.firstNode = function firstNode () {
    return this.rendered && this.nodes[0];
  };

  Triple__proto__.render = function render (target, occupants, anchor) {
    var this$1 = this;

    if (!this.nodes) {
      var html = this.model ? this.model.get() : '';
      this.nodes = insertHtml(html, target);
    }

    var nodes = this.nodes;

    // progressive enhancement
    if (occupants) {
      var i = -1;
      var next;

      // start with the first node that should be rendered
      while (occupants.length && (next = this.nodes[i + 1])) {
        var n = (void 0);
        // look through the occupants until a matching node is found
        while ((n = occupants.shift())) {
          var t = n.nodeType;

          if (
            t === next.nodeType &&
            ((t === 1 && n.outerHTML === next.outerHTML) ||
              ((t === 3 || t === 8) && n.nodeValue === next.nodeValue))
          ) {
            this$1.nodes.splice(++i, 1, n); // replace the generated node with the existing one
            break;
          } else {
            target.removeChild(n); // remove the non-matching existing node
          }
        }
      }

      if (i >= 0) {
        // update the list of remaining nodes to attach, excluding any that were replaced by existing nodes
        nodes = this.nodes.slice(i);
      }

      // update the anchor to be the next occupant
      if (occupants.length) { anchor = occupants[0]; }
    }

    // attach any remainging nodes to the parent
    if (nodes.length) {
      var frag = createDocumentFragment();
      nodes.forEach(function (n) { return frag.appendChild(n); });

      if (anchor) {
        target.insertBefore(frag, anchor);
      } else {
        target.appendChild(frag);
      }
    }

    this.rendered = true;
  };

  Triple__proto__.toString = function toString () {
    var value = this.model && this.model.get();
    value = value != null ? '' + value : '';

    return inAttribute() ? decodeCharacterReferences(value) : value;
  };

  Triple__proto__.unrender = function unrender () {
    if (this.nodes)
      { this.nodes.forEach(function (node) {
        // defer detachment until all relevant outros are done
        runloop.detachWhenReady({
          node: node,
          detach: function detach() {
            detachNode(node);
          }
        });
      }); }
    this.rendered = false;
    this.nodes = null;
  };

  Triple__proto__.update = function update () {
    if (this.rendered && this.dirty) {
      this.dirty = false;

      this.unrender();
      this.render(this.up.findParentNode(), null, this.up.findNextNode(this));
    } else {
      // make sure to reset the dirty flag even if not rendered
      this.dirty = false;
    }
  };

  return Triple;
}(Mustache));

// finds the component constructor in the registry or view hierarchy registries
function getComponentConstructor(ractive, name) {
  var instance = findInstance('components', ractive, name);
  var Component;

  if (instance) {
    Component = instance.components[name];

    if (Component && !Component.isInstance) {
      if (Component.default && Component.default.isInstance) { Component = Component.default; }
      else if (!Component.then && isFunction(Component)) {
        // function option, execute and store for reset
        var fn = Component.bind(instance);
        fn.isOwner = hasOwn(instance.components, name);
        Component = fn();

        if (!Component) {
          warnIfDebug(noRegistryFunctionReturn, name, 'component', 'component', {
            ractive: ractive
          });
          return;
        }

        if (isString(Component)) {
          // allow string lookup
          Component = getComponentConstructor(ractive, Component);
        }

        Component._fn = fn;
        instance.components[name] = Component;
      }
    }
  }

  return Component;
}

function asyncProxy(promise, options) {
  var partials = options.template.p || {};
  var name = options.template.e;

  var opts = assign({}, options, {
    template: { t: ELEMENT, e: name },
    macro: function macro(handle) {
      handle.setTemplate(partials['async-loading'] || []);
      promise.then(
        function (cmp) {
          options.up.ractive.components[name] = cmp;
          if (partials['async-loaded']) {
            handle.partials.component = [options.template];
            handle.setTemplate(partials['async-loaded']);
          } else {
            handle.setTemplate([options.template]);
          }
        },
        function (err) {
          if (partials['async-failed']) {
            handle.aliasLocal('error', 'error');
            handle.set('@local.error', err);
            handle.setTemplate(partials['async-failed']);
          } else {
            handle.setTemplate([]);
          }
        }
      );
    }
  });
  return new Partial(opts);
}

function extract(tpl, type, name) {
  var p = tpl.f.find(function (s) { return s.t === type; });
  if (p) {
    if (p.n)
      { return [
        {
          t: 19,
          n: 54,
          f: p.f || [],
          z: [{ n: p.n, x: { r: ("__await." + name) } }]
        }
      ]; }
    else { return p.f || []; }
  } else { return []; }
}

function Await(options) {
  var tpl = options.template;

  var success = extract(tpl, THEN, 'value');
  var error = extract(tpl, CATCH, 'error');
  var pending = extract(tpl, SECTION);
  var undef = extract(tpl, ELSE);

  var opts = assign({}, options, {
    template: {
      t: ELEMENT,
      m: [
        {
          t: ATTRIBUTE,
          n: 'for',
          f: [{ t: INTERPOLATOR, r: tpl.r, rx: tpl.rx, x: tpl.x }]
        }
      ]
    },
    macro: function macro(handle, attrs) {
      handle.aliasLocal('__await');

      function update(attrs) {
        if (attrs.for && isFunction(attrs.for.then)) {
          handle.setTemplate(pending);

          attrs.for.then(
            function (v) {
              handle.set('@local.value', v);
              handle.setTemplate(success);
            },
            function (e) {
              handle.set('@local.error', e);
              handle.setTemplate(error);
            }
          );
        } else if (isUndefined(attrs.for)) {
          handle.setTemplate(undef);
        } else {
          handle.set('@local.value', attrs.for);
          handle.setTemplate(success);
        }
      }

      update(attrs);

      return {
        update: update
      };
    }
  });

  opts.macro.attributes = ['for'];

  return new Partial(opts);
}

var constructors = {};
constructors[ALIAS] = Section;
constructors[ANCHOR] = Component;
constructors[AWAIT] = Await;
constructors[DOCTYPE] = Doctype;
constructors[INTERPOLATOR] = Interpolator;
constructors[PARTIAL] = Partial;
constructors[SECTION] = Section;
constructors[TRIPLE] = Triple;
constructors[YIELDER] = Partial;

constructors[ATTRIBUTE] = Attribute;
constructors[BINDING_FLAG] = BindingFlag;
constructors[DECORATOR] = Decorator;
constructors[EVENT] = EventDirective;
constructors[TRANSITION] = Transition;
constructors[COMMENT] = Comment;

var specialElements = {
  doctype: Doctype,
  form: Form,
  input: Input,
  option: Option,
  select: Select,
  textarea: Textarea
};

function createItem(options) {
  if (isString(options.template)) {
    return new Text(options);
  }

  var ctor;
  var name;
  var type = options.template.t;

  if (type === ELEMENT) {
    name = options.template.e;

    // could be a macro partial
    ctor = findInstance('partials', options.up.ractive, name);
    if (ctor) {
      ctor = ctor.partials[name];
      if (ctor.styleSet) {
        options.macro = ctor;
        return new Partial(options);
      }
    }

    // could be component or element
    ctor = getComponentConstructor(options.up.ractive, name);
    if (ctor) {
      if (isFunction(ctor.then)) {
        return asyncProxy(ctor, options);
      } else if (isFunction(ctor)) {
        return new Component(options, ctor);
      }
    }

    ctor = specialElements[name.toLowerCase()] || Element;
    return new ctor(options);
  }

  var Item;

  // component mappings are a special case of attribute
  if (type === ATTRIBUTE) {
    var el = options.owner;
    if (!el || (el.type !== ANCHOR && el.type !== COMPONENT && el.type !== ELEMENT)) {
      el = findElement(options.up);
    }
    options.element = el;

    Item = el.type === COMPONENT || el.type === ANCHOR ? Mapping : Attribute;
  } else {
    Item = constructors[type];
  }

  if (!Item) { throw new Error(("Unrecognised item type " + type)); }

  return new Item(options);
}

// TODO all this code needs to die
function processItems(items, values, guid, counter) {
  if ( counter === void 0 ) counter = 0;

  return items
    .map(function (item) {
      if (item.type === TEXT) {
        return item.template;
      }

      if (item.fragment) {
        if (item.fragment.iterations) {
          return item.fragment.iterations
            .map(function (fragment) {
              return processItems(fragment.items, values, guid, counter);
            })
            .join('');
        } else {
          return processItems(item.fragment.items, values, guid, counter);
        }
      }

      var placeholderId = guid + "-" + (counter++);
      var model = item.model || item.newModel;

      values[placeholderId] = model
        ? model.wrapper
          ? model.wrapperValue
          : model.get()
        : undefined;

      return '${' + placeholderId + '}';
    })
    .join('');
}

function resolveAliases(aliases, fragment, dest) {
  if ( dest === void 0 ) dest = {};

  for (var i = 0; i < aliases.length; i++) {
    if (!dest[aliases[i].n]) {
      var m = resolve(fragment, aliases[i].x);
      dest[aliases[i].n] = m;
      m.reference();
    }
  }

  return dest;
}

var Fragment = function Fragment(options) {
  this.owner = options.owner; // The item that owns this fragment - an element, section, partial, or attribute

  this.isRoot = !options.owner.up;
  this.parent = this.isRoot ? null : this.owner.up;
  this.ractive = options.ractive || (this.isRoot ? options.owner : this.parent.ractive);

  this.componentParent = this.isRoot && this.ractive.component ? this.ractive.component.up : null;
  if (!this.isRoot || this.ractive.delegate) {
    this.delegate = this.owner.containerFragment
      ? this.owner.containerFragment && this.owner.containerFragment.delegate
      : (this.componentParent && this.componentParent.delegate) ||
        (this.parent && this.parent.delegate);
  } else {
    this.delegate = false;
  }

  this.context = null;
  this.rendered = false;

  // encapsulated styles should be inherited until they get applied by an element
  if ('cssIds' in options) {
    this.cssIds = options.cssIds && options.cssIds.length && options.cssIds;
  } else {
    this.cssIds = this.parent ? this.parent.cssIds : null;
  }

  this.dirty = false;
  this.dirtyValue = true; // used for attribute values

  this.template = options.template || [];
  this.createItems();
};
var Fragment__proto__ = Fragment.prototype;

Fragment__proto__.bind = function bind (context) {
    var this$1 = this;

  this.context = context;

  if (this.owner.template.z) {
    this.aliases = resolveAliases(
      this.owner.template.z,
      this.owner.containerFragment || this.parent
    );
  }

  var len = this.items.length;
  for (var i = 0; i < len; i++) { this$1.items[i].bind(); }
  this.bound = true;

  // in rare cases, a forced resolution (or similar) will cause the
  // fragment to be dirty before it's even finished binding. In those
  // cases we update immediately
  if (this.dirty) { this.update(); }

  return this;
};

Fragment__proto__.bubble = function bubble () {
  this.dirtyValue = true;

  if (!this.dirty) {
    this.dirty = true;

    if (this.isRoot) {
      // TODO encapsulate 'is component root, but not overall root' check?
      if (this.ractive.component) {
        this.ractive.component.bubble();
      } else if (this.bound) {
        runloop.addFragment(this);
      }
    } else {
      this.owner.bubble(this.index);
    }
  }
};

Fragment__proto__.createItems = function createItems () {
    var this$1 = this;

  // this is a hot code path
  var max = this.template.length;
  this.items = [];
  for (var i = 0; i < max; i++) {
    this$1.items[i] = createItem({
      up: this$1,
      template: this$1.template[i],
      index: i
    });
  }
};

Fragment__proto__.destroyed = function destroyed () {
    var this$1 = this;

  var len = this.items.length;
  for (var i = 0; i < len; i++) { this$1.items[i].destroyed(); }
  if (this.pathModel) { this.pathModel.destroyed(); }
  if (this.rootModel) { this.rootModel.destroyed(); }
};

Fragment__proto__.detach = function detach () {
  var docFrag = createDocumentFragment();
  var xs = this.items;
  var len = xs.length;
  for (var i = 0; i < len; i++) {
    docFrag.appendChild(xs[i].detach());
  }
  return docFrag;
};

Fragment__proto__.find = function find (selector, options) {
  return findMap(this.items, function (i) { return i.find(selector, options); });
};

Fragment__proto__.findAll = function findAll (selector, options) {
  if (this.items) {
    this.items.forEach(function (i) { return i.findAll && i.findAll(selector, options); });
  }
};

Fragment__proto__.findComponent = function findComponent (name, options) {
  return findMap(this.items, function (i) { return i.findComponent(name, options); });
};

Fragment__proto__.findAllComponents = function findAllComponents (name, options) {
  if (this.items) {
    this.items.forEach(function (i) { return i.findAllComponents && i.findAllComponents(name, options); });
  }
};

Fragment__proto__.findContext = function findContext () {
  var base = findParentWithContext(this);
  if (!base || !base.context) { return this.ractive.viewmodel; }
  else { return base.context; }
};

Fragment__proto__.findNextNode = function findNextNode (item) {
    var this$1 = this;

  // search for the next node going forward
  if (item) {
    var it;
    for (var i = item.index + 1; i < this.items.length; i++) {
      it = this$1.items[i];
      if (!it || !it.firstNode) { continue; }

      var node = it.firstNode(true);
      if (node) { return node; }
    }
  }

  // if this is the root fragment, and there are no more items,
  // it means we're at the end...
  if (this.isRoot) {
    if (this.ractive.component) {
      return this.ractive.component.up.findNextNode(this.ractive.component);
    }

    // TODO possible edge case with other content
    // appended to this.ractive.el?
    return null;
  }

  if (this.parent) { return this.owner.findNextNode(this); } // the argument is in case the parent is a RepeatedFragment
};

Fragment__proto__.findParentNode = function findParentNode () {
  var fragment = this;

  do {
    if (fragment.owner.type === ELEMENT) {
      return fragment.owner.node;
    }

    if (fragment.isRoot && !fragment.ractive.component) {
      // TODO encapsulate check
      return fragment.ractive.el;
    }

    if (fragment.owner.type === YIELDER) {
      fragment = fragment.owner.containerFragment;
    } else {
      fragment = fragment.componentParent || fragment.parent; // TODO ugh
    }
  } while (fragment);

  throw new Error('Could not find parent node'); // TODO link to issue tracker
};

Fragment__proto__.firstNode = function firstNode (skipParent) {
  var node = findMap(this.items, function (i) { return i.firstNode(true); });
  if (node) { return node; }
  if (skipParent) { return null; }

  return this.parent.findNextNode(this.owner);
};

Fragment__proto__.getKey = function getKey () {
  return this.keyModel || (this.keyModel = new KeyModel(this.key));
};

Fragment__proto__.getIndex = function getIndex () {
  return this.idxModel || (this.idxModel = new KeyModel(this.index));
};

Fragment__proto__.rebind = function rebind (next) {
  this.context = next;
  if (this.rootModel) { this.rootModel.context = this.context; }
  if (this.pathModel) { this.pathModel.context = this.context; }
};

Fragment__proto__.rebound = function rebound (update$$1) {
  if (this.owner.template.z) {
    var aliases = this.aliases;
    for (var k in aliases) {
      if (aliases[k].rebound) { aliases[k].rebound(update$$1); }
      else {
        aliases[k].unreference();
        aliases[k] = 0;
      }
    }

    resolveAliases(this.owner.template.z, this.owner.containerFragment || this.parent, aliases);
  }

  this.items.forEach(function (x) { return x.rebound(update$$1); });
  if (update$$1) {
    if (this.rootModel) { this.rootModel.applyValue(this.context.getKeypath(this.ractive.root)); }
    if (this.pathModel) { this.pathModel.applyValue(this.context.getKeypath()); }
  }
};

Fragment__proto__.render = function render (target, occupants) {
  if (this.rendered) { throw new Error('Fragment is already rendered!'); }
  this.rendered = true;

  var xs = this.items;
  var len = xs.length;
  for (var i = 0; i < len; i++) {
    xs[i].render(target, occupants);
  }
};

Fragment__proto__.resetTemplate = function resetTemplate (template) {
  var wasBound = this.bound;
  var wasRendered = this.rendered;

  // TODO ensure transitions are disabled globally during reset

  if (wasBound) {
    if (wasRendered) { this.unrender(true); }
    this.unbind();
  }

  this.template = template;
  this.createItems();

  if (wasBound) {
    this.bind(this.context);

    if (wasRendered) {
      var parentNode = this.findParentNode();
      var anchor = this.findNextNode();

      if (anchor) {
        var docFrag = createDocumentFragment();
        this.render(docFrag);
        parentNode.insertBefore(docFrag, anchor);
      } else {
        this.render(parentNode);
      }
    }
  }
};

Fragment__proto__.shuffled = function shuffled$2 () {
  this.items.forEach(shuffled);
  if (this.rootModel) { this.rootModel.applyValue(this.context.getKeypath(this.ractive.root)); }
  if (this.pathModel) { this.pathModel.applyValue(this.context.getKeypath()); }
};

Fragment__proto__.toString = function toString (escape) {
  return this.items.map(escape ? toEscapedString : toString$1).join('');
};

Fragment__proto__.unbind = function unbind (view) {
    var this$1 = this;

  if (this.owner.template.z && !this.owner.yielder) {
    for (var k in this$1.aliases) {
      this$1.aliases[k].unreference();
    }

    this.aliases = {};
  }

  this.context = null;
  var len = this.items.length;
  for (var i = 0; i < len; i++) { this$1.items[i].unbind(view); }
  this.bound = false;

  return this;
};

Fragment__proto__.unrender = function unrender (shouldDestroy) {
    var this$1 = this;

  var len = this.items.length;
  for (var i = 0; i < len; i++) { this$1.items[i].unrender(shouldDestroy); }
  this.rendered = false;
};

Fragment__proto__.update = function update () {
    var this$1 = this;

  if (this.dirty) {
    if (!this.updating) {
      this.dirty = false;
      this.updating = true;
      var len = this.items.length;
      for (var i = 0; i < len; i++) { this$1.items[i].update(); }
      this.updating = false;
    } else if (this.isRoot) {
      runloop.addFragmentToRoot(this);
    }
  }
};

Fragment__proto__.valueOf = function valueOf () {
  if (this.items.length === 1) {
    return this.items[0].valueOf();
  }

  if (this.dirtyValue) {
    var values = {};
    var source = processItems(this.items, values, this.ractive._guid);
    var parsed = parseJSON(source, values);

    this.value = parsed ? parsed.value : this.toString();

    this.dirtyValue = false;
  }

  return this.value;
};
Fragment.prototype.getContext = getContext;
Fragment.prototype.getKeypath = getKeypath;

function getKeypath(root) {
  var base = findParentWithContext(this);
  var model;
  if (root) {
    if (!this.rootModel) {
      this.rootModel = new KeyModel(
        this.context.getKeypath(this.ractive.root),
        this.context,
        this.ractive.root
      );
      model = this.rootModel;
    } else { return this.rootModel; }
  } else {
    if (!this.pathModel) {
      this.pathModel = new KeyModel(this.context.getKeypath(), this.context);
      model = this.pathModel;
    } else { return this.pathModel; }
  }

  if (base && base.context) { base.getKeypath(root).registerChild(model); }

  return model;
}

function initialise(ractive, userOptions, options) {
  // initialize settable computeds
  var computed = ractive.viewmodel.computed;
  if (computed) {
    for (var k in computed) {
      if (k in ractive.viewmodel.value && computed[k] && !computed[k].isReadonly) {
        computed[k].set(ractive.viewmodel.value[k]);
      }
    }
  }

  // init config from Parent and options
  config.init(ractive.constructor, ractive, userOptions);

  // call any passed in plugins
  if (isArray(userOptions.use))
    { ractive.use.apply(ractive, userOptions.use.filter(function (p) { return !p.construct; })); }

  hooks.config.fire(ractive);

  hooks.init.begin(ractive);

  var fragment = (ractive.fragment = createFragment$1(ractive, options));
  if (fragment) { fragment.bind(ractive.viewmodel); }

  hooks.init.end(ractive);

  // general config done, set up observers
  subscribe(ractive, userOptions, 'observe');

  if (fragment) {
    // render automatically ( if `el` is specified )
    var el = (ractive.el = ractive.target = getElement(ractive.el || ractive.target));
    if (el && !ractive.component) {
      var promise = ractive.render(el, ractive.append);

      if (Ractive.DEBUG_PROMISES) {
        promise.catch(function (err) {
          warnOnceIfDebug(
            'Promise debugging is enabled, to help solve errors that happen asynchronously. Some browsers will log unhandled promise rejections, in which case you can safely disable promise debugging:\n  Ractive.DEBUG_PROMISES = false;'
          );
          warnIfDebug('An error happened during rendering', { ractive: ractive });
          logIfDebug(err);

          throw err;
        });
      }
    }
  }
}

function createFragment$1(ractive, options) {
  if ( options === void 0 ) options = {};

  if (ractive.template) {
    var cssIds = [].concat(ractive.constructor._cssIds || [], options.cssIds || []);

    return new Fragment({
      owner: ractive,
      template: ractive.template,
      cssIds: cssIds
    });
  }
}

function render$1(ractive, target, anchor, occupants) {
  // set a flag to let any transitions know that this instance is currently rendering
  ractive.rendering = true;

  var promise = runloop.start();
  runloop.scheduleTask(function () { return hooks.render.fire(ractive); }, true);

  if (ractive.fragment.rendered) {
    throw new Error(
      'You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first'
    );
  }

  if (ractive.destroyed) {
    ractive.destroyed = false;
    ractive.fragment = createFragment$1(ractive).bind(ractive.viewmodel);
  }

  anchor = getElement(anchor) || ractive.anchor;

  ractive.el = ractive.target = target;
  ractive.anchor = anchor;

  // ensure encapsulated CSS is up-to-date
  if (ractive.cssId) { applyCSS(); }

  if (target) {
    (target.__ractive_instances__ || (target.__ractive_instances__ = [])).push(ractive);

    if (anchor) {
      var docFrag = doc.createDocumentFragment();
      ractive.fragment.render(docFrag);
      target.insertBefore(docFrag, anchor);
    } else {
      ractive.fragment.render(target, occupants);
    }
  }

  runloop.end();
  ractive.rendering = false;

  return promise.then(function () {
    if (ractive.torndown) { return; }

    hooks.complete.fire(ractive);
  });
}

function Ractive$render(target, anchor) {
  if (this.torndown) {
    warnIfDebug('ractive.render() was called on a Ractive instance that was already torn down');
    return Promise.resolve();
  }

  target = getElement(target) || this.el;

  if (!this.append && target) {
    // Teardown any existing instances *before* trying to set up the new one -
    // avoids certain weird bugs
    var others = target.__ractive_instances__;
    if (others) { others.forEach(teardown); }

    // make sure we are the only occupants
    if (!this.enhance) {
      target.innerHTML = ''; // TODO is this quicker than removeChild? Initial research inconclusive
    }
  }

  var occupants = this.enhance ? toArray(target.childNodes) : null;
  var promise = render$1(this, target, anchor, occupants);

  if (occupants) {
    while (occupants.length) { target.removeChild(occupants.pop()); }
  }

  return promise;
}

var shouldRerender = ['template', 'partials', 'components', 'decorators', 'events'];

function Ractive$reset(data) {
  data = data || {};

  if (!isObjectType(data)) {
    throw new Error('The reset method takes either no arguments, or an object containing new data');
  }

  // TEMP need to tidy this up
  data = dataConfigurator.init(this.constructor, this, { data: data });

  var promise = runloop.start();

  // If the root object is wrapped, try and use the wrapper's reset value
  var wrapper = this.viewmodel.wrapper;
  if (wrapper && wrapper.reset) {
    if (wrapper.reset(data) === false) {
      // reset was rejected, we need to replace the object
      this.viewmodel.set(data);
    }
  } else {
    this.viewmodel.set(data);
  }

  // reset config items and track if need to rerender
  var changes = config.reset(this);
  var rerender;

  var i = changes.length;
  while (i--) {
    if (shouldRerender.indexOf(changes[i]) > -1) {
      rerender = true;
      break;
    }
  }

  if (rerender) {
    hooks.unrender.fire(this);
    this.fragment.resetTemplate(this.template);
    hooks.render.fire(this);
    hooks.complete.fire(this);
  }

  runloop.end();

  hooks.reset.fire(this, data);

  return promise;
}

function collect$1(source, name, attr, dest) {
  source.forEach(function (item) {
    // queue to rerender if the item is a partial and the current name matches
    if (item.type === PARTIAL && (item.refName === name || item.name === name)) {
      item.inAttribute = attr;
      dest.push(item);
      return; // go no further
    }

    // if it has a fragment, process its items
    if (item.fragment) {
      collect$1(item.fragment.iterations || item.fragment.items, name, attr, dest);
    } else if (isArray(item.items)) {
      // or if it is itself a fragment, process its items
      collect$1(item.items, name, attr, dest);
    } else if (item.type === COMPONENT && item.instance) {
      // or if it is a component, step in and process its items
      // ...unless the partial is shadowed
      if (item.instance.partials[name]) { return; }
      collect$1(item.instance.fragment.items, name, attr, dest);
    }

    // if the item is an element, process its attributes too
    if (item.type === ELEMENT) {
      if (isArray(item.attributes)) {
        collect$1(item.attributes, name, true, dest);
      }
    }
  });
}

function resetPartial(name, partial) {
  var collection = [];
  collect$1(this.fragment.items, name, false, collection);

  var promise = runloop.start();

  this.partials[name] = partial;
  collection.forEach(handleChange);

  runloop.end();

  return promise;
}

// TODO should resetTemplate be asynchronous? i.e. should it be a case
// of outro, update template, intro? I reckon probably not, since that
// could be achieved with unrender-resetTemplate-render. Also, it should
// conceptually be similar to resetPartial, which couldn't be async

function Ractive$resetTemplate(template) {
  templateConfigurator.init(null, this, { template: template });

  var transitionsEnabled = this.transitionsEnabled;
  this.transitionsEnabled = false;

  // Is this is a component, we need to set the `shouldDestroy`
  // flag, otherwise it will assume by default that a parent node
  // will be detached, and therefore it doesn't need to bother
  // detaching its own nodes
  var component = this.component;
  if (component) { component.shouldDestroy = true; }
  this.unrender();
  if (component) { component.shouldDestroy = false; }

  var promise = runloop.start();

  // remove existing fragment and create new one
  this.fragment.unbind().unrender(true);

  this.fragment = new Fragment({
    template: this.template,
    root: this,
    owner: this
  });

  var docFrag = createDocumentFragment();
  this.fragment.bind(this.viewmodel).render(docFrag);

  // if this is a component, its el may not be valid, so find a
  // target based on the component container
  if (component && !component.external) {
    this.fragment.findParentNode().insertBefore(docFrag, component.findNextNode());
  } else {
    this.el.insertBefore(docFrag, this.anchor);
  }

  runloop.end();

  this.transitionsEnabled = transitionsEnabled;

  return promise;
}

var reverse = makeArrayMethod('reverse').path;

function Ractive$set(keypath, value, options) {
  var ractive = this;

  var opts = isObjectType(keypath) ? value : options;

  return set(build(ractive, keypath, value, opts && opts.isolated), opts);
}

var shift = makeArrayMethod('shift').path;

var sort = makeArrayMethod('sort').path;

var splice = makeArrayMethod('splice').path;

function Ractive$subtract(keypath, d, options) {
  var num = isNumber(d) ? -d : -1;
  var opts = isObjectType(d) ? d : options;
  return add(this, keypath, num, opts);
}

function Ractive$toggle(keypath, options) {
  if (!isString(keypath)) {
    throw new TypeError(badArguments);
  }

  return set(
    gather(this, keypath, null, options && options.isolated).map(function (m) { return [m, !m.get()]; }),
    options
  );
}

function Ractive$toCSS() {
  var cssIds = [this.cssId ].concat( this.findAllComponents().map(function (c) { return c.cssId; }));
  var uniqueCssIds = keys(cssIds.reduce(function (ids, id) { return (ids[id] = true, ids); }, {}));
  return getCSS(uniqueCssIds);
}

function Ractive$toHTML() {
  return this.fragment.toString(true);
}

function toText() {
  return this.fragment.toString(false);
}

function Ractive$transition(name, node, params) {
  if (node instanceof HTMLElement) {
    // good to go
  } else if (isObject(node)) {
    // omitted, use event node
    params = node;
  }

  // if we allow query selector, then it won't work
  // simple params like "fast"

  // else if ( typeof node === 'string' ) {
  // 	// query selector
  // 	node = this.find( node )
  // }

  node = node || this.event.node;

  if (!node || !node._ractive) {
    fatal(("No node was supplied for transition " + name));
  }

  params = params || {};
  var owner = node._ractive.proxy;
  var transition = new Transition({ owner: owner, up: owner.up, name: name, params: params });
  transition.bind();

  var promise = runloop.start();
  runloop.registerTransition(transition);
  runloop.end();

  promise.then(function () { return transition.unbind(); });
  return promise;
}

function unlink(here) {
  var promise = runloop.start();
  this.viewmodel.joinAll(splitKeypath(here), { lastLink: false }).unlink();
  runloop.end();
  return promise;
}

function Ractive$unrender() {
  if (!this.fragment.rendered) {
    warnIfDebug('ractive.unrender() was called on a Ractive instance that was not rendered');
    return Promise.resolve();
  }

  this.unrendering = true;
  var promise = runloop.start();

  hooks.unrendering.fire(this);

  // If this is a component, and the component isn't marked for destruction,
  // don't detach nodes from the DOM unnecessarily
  var shouldDestroy =
    !this.component ||
    (this.component.anchor || {}).shouldDestroy ||
    this.component.shouldDestroy ||
    this.shouldDestroy;
  this.fragment.unrender(shouldDestroy);
  if (shouldDestroy) { this.destroyed = true; }

  removeFromArray(this.el.__ractive_instances__, this);

  hooks.unrender.fire(this);

  runloop.end();
  this.unrendering = false;

  return promise;
}

var unshift = makeArrayMethod('unshift').path;

function Ractive$updateModel(keypath, cascade) {
  var promise = runloop.start();

  if (!keypath) {
    this.viewmodel.updateFromBindings(true);
  } else {
    this.viewmodel.joinAll(splitKeypath(keypath)).updateFromBindings(cascade !== false);
  }

  runloop.end();

  return promise;
}

function use() {
  var this$1 = this;
  var plugins = [], len = arguments.length;
  while ( len-- ) plugins[ len ] = arguments[ len ];

  plugins.forEach(function (p) {
    p({
      proto: this$1,
      Ractive: this$1.constructor.Ractive,
      instance: this$1
    });
  });
  return this;
}

var proto$9 = {
  add: Ractive$add,
  animate: Ractive$animate,
  attachChild: attachChild,
  compute: Ractive$compute,
  detach: Ractive$detach,
  detachChild: detachChild,
  find: Ractive$find,
  findAll: Ractive$findAll,
  findAllComponents: Ractive$findAllComponents,
  findComponent: Ractive$findComponent,
  findContainer: Ractive$findContainer,
  findParent: Ractive$findParent,
  fire: Ractive$fire,
  get: Ractive$get,
  getContext: getContext$2,
  insert: Ractive$insert,
  link: link,
  observe: observe,
  observeOnce: observeOnce,
  off: Ractive$off,
  on: Ractive$on,
  once: Ractive$once,
  pop: pop,
  push: push,
  readLink: readLink,
  render: Ractive$render,
  reset: Ractive$reset,
  resetPartial: resetPartial,
  resetTemplate: Ractive$resetTemplate,
  reverse: reverse,
  set: Ractive$set,
  shift: shift,
  sort: sort,
  splice: splice,
  subtract: Ractive$subtract,
  teardown: Ractive$teardown,
  toggle: Ractive$toggle,
  toCSS: Ractive$toCSS,
  toCss: Ractive$toCSS,
  toHTML: Ractive$toHTML,
  toHtml: Ractive$toHTML,
  toText: toText,
  transition: Ractive$transition,
  unlink: unlink,
  unrender: Ractive$unrender,
  unshift: unshift,
  update: Ractive$update,
  updateModel: Ractive$updateModel,
  use: use
};

function isInstance(object) {
  return object && object instanceof this;
}

function styleGet(keypath, opts) {
  return this._cssModel.joinAll(splitKeypath(keypath)).get(true, opts);
}

var styles = [];

function addStyle(id, css) {
  if (styles.find(function (s) { return s.id === id; }))
    { throw new Error(("Extra styles with the id '" + id + "' have already been added.")); }
  styles.push({ id: id, css: css });

  if (!this.css) {
    Object.defineProperty(this, 'css', { configurable: false, writable: false, value: buildCSS });
  }

  if (!this._cssDef) {
    Object.defineProperty(this, '_cssDef', {
      configurable: true,
      writable: false,
      value: {
        transform: false,
        id: 'Ractive.addStyle'
      }
    });

    addCSS(this._cssDef);
  }

  recomputeCSS(this);
  applyCSS(true);
}

function buildCSS(data) {
  return styles
    .map(function (s) { return "\n/* ---- extra style " + (s.id) + " */\n" + (isFunction(s.css) ? s.css(data) : s.css); })
    .join('');
}

function hasStyle(id) {
  return !!styles.find(function (s) { return s.id === id; });
}

function sharedSet(keypath, value, options) {
  var opts = isObjectType(keypath) ? value : options;
  var model = SharedModel$1;

  return set(build({ viewmodel: model }, keypath, value, true), opts);
}

function sharedGet(keypath, opts) {
  return SharedModel$1.joinAll(splitKeypath(keypath)).get(true, opts);
}

function use$1() {
  var this$1 = this;
  var plugins = [], len = arguments.length;
  while ( len-- ) plugins[ len ] = arguments[ len ];

  plugins.forEach(function (p) {
    isFunction(p) &&
      p({
        proto: this$1.prototype,
        Ractive: this$1.Ractive,
        instance: this$1
      });
  });
  return this;
}

var callsSuper = /super\s*\(|\.call\s*\(\s*this/;

function extend() {
  var options = [], len = arguments.length;
  while ( len-- ) options[ len ] = arguments[ len ];

  if (!options.length) {
    return extendOne(this);
  } else {
    return options.reduce(extendOne, this);
  }
}

function extendWith(Class, options) {
  if ( options === void 0 ) options = {};

  return extendOne(this, options, Class);
}

function extendOne(Parent, options, Target) {
  if ( options === void 0 ) options = {};

  var proto;
  var Child = isFunction(Target) && Target;

  if (options.prototype instanceof Ractive) {
    throw new Error("Ractive no longer supports multiple inheritance.");
  }

  if (Child) {
    if (!(Child.prototype instanceof Parent)) {
      throw new Error(
        "Only classes that inherit the appropriate prototype may be used with extend"
      );
    }
    if (!callsSuper.test(Child.toString())) {
      throw new Error("Only classes that call super in their constructor may be used with extend");
    }

    proto = Child.prototype;
  } else {
    Child = function(options) {
      if (!(this instanceof Child)) { return new Child(options); }

      construct(this, options || {});
      initialise(this, options || {}, {});
    };

    proto = create(Parent.prototype);
    proto.constructor = Child;

    Child.prototype = proto;
  }

  // Static properties
  defineProperties(Child, {
    // alias prototype as defaults
    defaults: { value: proto },

    extend: { value: extend, writable: true, configurable: true },
    extendWith: { value: extendWith, writable: true, configurable: true },
    extensions: { value: [] },
    use: { value: use$1 },

    isInstance: { value: isInstance },

    Parent: { value: Parent },
    Ractive: { value: Ractive },

    styleGet: { value: styleGet.bind(Child), configurable: true },
    styleSet: { value: setCSSData.bind(Child), configurable: true }
  });

  // extend configuration
  config.extend(Parent, proto, options, Child);

  // store event and observer registries on the constructor when extending
  Child._on = (Parent._on || []).concat(toPairs(options.on));
  Child._observe = (Parent._observe || []).concat(toPairs(options.observe));

  Parent.extensions.push(Child);

  // attribute defs are not inherited, but they need to be stored
  if (options.attributes) {
    var attrs;

    // allow an array of optional props or an object with arrays for optional and required props
    if (isArray(options.attributes)) {
      attrs = { optional: options.attributes, required: [] };
    } else {
      attrs = options.attributes;
    }

    // make sure the requisite keys actually store arrays
    if (!isArray(attrs.required)) { attrs.required = []; }
    if (!isArray(attrs.optional)) { attrs.optional = []; }

    Child.attributes = attrs;
  }

  dataConfigurator.extend(Parent, proto, options, Child);

  defineProperty(Child, 'helpers', { writable: true, value: proto.helpers });

  if (isArray(options.use)) { Child.use.apply(Child, options.use); }

  return Child;
}

defineProperties(Ractive, {
  sharedGet: { value: sharedGet },
  sharedSet: { value: sharedSet },
  styleGet: { configurable: true, value: styleGet.bind(Ractive) },
  styleSet: { configurable: true, value: setCSSData.bind(Ractive) },
  addCSS: { configurable: false, value: addStyle.bind(Ractive) },
  hasCSS: { configurable: false, value: hasStyle.bind(Ractive) }
});

function macro(fn, opts) {
  if (!isFunction(fn)) { throw new Error("The macro must be a function"); }

  assign(fn, opts);

  defineProperties(fn, {
    extensions: { value: [] },
    _cssIds: { value: [] },
    cssData: { value: assign(create(this.cssData), fn.cssData || {}) },

    styleGet: { value: styleGet.bind(fn) },
    styleSet: { value: setCSSData.bind(fn) }
  });

  defineProperty(fn, '_cssModel', { value: new CSSModel(fn) });

  if (fn.css) { initCSS(fn, fn, fn); }

  this.extensions.push(fn);

  return fn;
}

function joinKeys() {
  var keys = [], len = arguments.length;
  while ( len-- ) keys[ len ] = arguments[ len ];

  return keys.map(escapeKey).join('.');
}

function splitKeypath$1(keypath) {
  return splitKeypath(keypath).map(unescapeKey);
}

function findPlugin(name, type, instance) {
  return findInViewHierarchy(type, instance, name);
}

function Ractive(options) {
  if (!(this instanceof Ractive)) { return new Ractive(options); }

  construct(this, options || {});
  initialise(this, options || {}, {});
}

// check to see if we're being asked to force Ractive as a global for some weird environments
if (win && !win.Ractive) {
  var opts$1 = '';
  var script =
    document.currentScript ||
    /* istanbul ignore next */ document.querySelector('script[data-ractive-options]');

  if (script) { opts$1 = script.getAttribute('data-ractive-options') || ''; }

  /* istanbul ignore next */
  if (~opts$1.indexOf('ForceGlobal')) { win.Ractive = Ractive; }
} else if (win) {
  warn("Ractive already appears to be loaded while loading 1.3.8.");
}

assign(Ractive.prototype, proto$9, defaults);
Ractive.prototype.constructor = Ractive;

// alias prototype as `defaults`
Ractive.defaults = Ractive.prototype;

// share defaults with the parser
shared.defaults = Ractive.defaults;
shared.Ractive = Ractive;

// static properties
defineProperties(Ractive, {
  // debug flag
  DEBUG: { writable: true, value: true },
  DEBUG_PROMISES: { writable: true, value: true },

  // static methods:
  extend: { value: extend },
  extendWith: { value: extendWith },
  escapeKey: { value: escapeKey },
  evalObjectString: { value: parseJSON },
  findPlugin: { value: findPlugin },
  getContext: { value: getContext$1 },
  getCSS: { value: getCSS },
  isInstance: { value: isInstance },
  joinKeys: { value: joinKeys },
  macro: { value: macro },
  normaliseKeypath: { value: normalise },
  parse: { value: parse },
  splitKeypath: { value: splitKeypath$1 },
  // sharedSet and styleSet are in _extend because circular refs
  unescapeKey: { value: unescapeKey },
  use: { value: use$1 },

  // support
  enhance: { writable: true, value: false },
  svg: { value: svg },
  tick: {
    get: function get() {
      return batch && batch.promise;
    }
  },

  // version
  VERSION: { value: '1.3.8' },

  // plugins
  adaptors: { writable: true, value: {} },
  components: { writable: true, value: {} },
  decorators: { writable: true, value: {} },
  easing: { writable: true, value: easing },
  events: { writable: true, value: {} },
  extensions: { value: [] },
  helpers: { writable: true, value: defaults.helpers },
  interpolators: { writable: true, value: interpolators },
  partials: { writable: true, value: {} },
  transitions: { writable: true, value: {} },

  // CSS variables
  cssData: { configurable: true, value: {} },

  // access to @shared without an instance
  sharedData: { value: data },

  // for getting the source Ractive lib from a constructor
  Ractive: { value: Ractive },

  // to allow extending contexts
  Context: { value: extern.Context.prototype }
});

// cssData must already be in place
defineProperty(Ractive, '_cssModel', {
  configurable: true,
  value: new CSSModel(Ractive)
});

defineProperty(Ractive.prototype, 'rendered', {
  get: function get() {
    return this.fragment && this.fragment.rendered;
  }
});

return Ractive;

})));
//# sourceMappingURL=ractive.js.map
