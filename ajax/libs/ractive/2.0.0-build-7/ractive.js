/*
	Ractive.js v2.0.0-edge
	Build: 2ed5b3f5a61d3aaa33cefd33050f060a612491b7
	Date: Thu Mar 25 2021 02:22:46 GMT+0000 (Coordinated Universal Time)
	Website: https://ractive.js.org
	License: MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (function () {
    var current = global.Ractive;
    var exports = global.Ractive = factory();
    exports.noConflict = function () { global.Ractive = current; return exports; };
  }()));
}(this, (function () { 'use strict';

  /* istanbul ignore if */
  if (!Object.assign) {
    Object.assign = function (target) {
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

  var toString = Object.prototype.toString;
  /* Basic */
  function isString(thing) {
      return typeof thing === 'string';
  }
  function isUndefined(thing) {
      return thing === undefined;
  }
  function isFunction(thing) {
      return typeof thing === 'function';
  }
  function isNumber(thing) {
      return typeof thing === 'number';
  }
  /**
   * @see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
   */
  function isNumeric(thing) {
      return !isNaN(parseFloat(thing)) && isFinite(thing);
  }
  /* Object */
  function isObject(thing) {
      return thing && toString.call(thing) === '[object Object]';
  }
  function isObjectType(thing) {
      return typeof thing === 'object';
  }
  function isObjectLike(thing) {
      return !!(thing && (isObjectType(thing) || isFunction(thing)));
  }
  /* Array */
  var isArray = Array.isArray;
  /* Misc */
  function isEqual(a, b) {
      if (a === null && b === null) {
          return true;
      }
      if (isObjectType(a) || isObjectType(b)) {
          return false;
      }
      return a === b;
  }

  var obj = Object;
  // TODO might worth to convert into a class with only static methods?
  var assign = obj.assign;
  var create = obj.create;
  var defineProperty = obj.defineProperty;
  var defineProperties = obj.defineProperties;
  var keys = obj.keys;
  function hasOwn(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  function fillGaps(target) {
      var arguments$1 = arguments;

      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          sources[_i - 1] = arguments$1[_i];
      }
      for (var i = 0; i < sources.length; i++) {
          var source = sources[i];
          for (var key in source) {
              // Source can be a prototype-less object.
              if (key in target || !hasOwn(source, key))
                  { continue; }
              target[key] = source[key];
          }
      }
      return target;
  }
  /** Same behavior of `Object.entries` */
  function toPairs(obj) {
      if (obj === void 0) { obj = {}; }
      var pairs = [];
      for (var key in obj) {
          // Source can be a prototype-less object.
          if (!hasOwn(obj, key))
              { continue; }
          pairs.push([key, obj[key]]);
      }
      return pairs;
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
    Node.prototype.contains = function (node) {
      if (!node) { throw new TypeError('node required'); }

      do {
        if (this === node) { return true; }
      } while ((node = node && node.parentNode));

      return false;
    };
  }

  /* istanbul ignore if */
  if (typeof window !== 'undefined' && window.performance && !window.performance.now) {
    window.performance = window.performance || {};

    var nowOffset = Date.now();

    window.performance.now = function () {
      return Date.now() - nowOffset;
    };
  }

  /* eslint no-console:"off" */
  var win = typeof window !== 'undefined' ? window : null;
  var doc = win ? document : null;
  var isClient = !!doc;
  var base = typeof global !== 'undefined' ? global : win;
  var hasConsole = typeof console !== 'undefined' && isFunction(console.warn) && isFunction(console.warn.apply);
  var svg = doc
      ? doc.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')
      : false;
  var vendors = ['o', 'ms', 'moz', 'webkit'];

  /* istanbul ignore if */
  if (!base.Promise) {
    var PENDING = {};
    var FULFILLED = {};
    var REJECTED = {};

    var Promise$1 = (base.Promise = function (callback) {
      var fulfilledHandlers = [];
      var rejectedHandlers = [];
      var state = PENDING;
      var result;
      var dispatchHandlers;

      var makeResolver = function (newState) {
        return function (value) {
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
                    resolve(promise2, handler(p1result), fulfill, reject);
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

    Promise$1.all = function (promises) {
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

    Promise$1.race = function (promises) {
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

    Promise$1.resolve = function (value) {
      if (value && isFunction(value.then)) { return value; }
      return new Promise$1(function (fulfill) {
        fulfill(value);
      });
    };

    Promise$1.reject = function (reason) {
      if (reason && isFunction(reason.then)) { return reason; }
      return new Promise$1(function (fulfill, reject) {
        reject(reason);
      });
    };

    // TODO use MutationObservers or something to simulate setImmediate
    var wait = function (callback) {
      setTimeout(callback, 0);
    };

    var makeDispatcher = function (handlers, result) {
      return function () {
        for (var handler = (void 0); (handler = handlers.shift()); ) {
          handler(result);
        }
      };
    };

    var resolve = function (promise, x, fulfil, reject) {
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

          var resolvePromise = function (y) {
            if (called) { return; }
            called = true;
            resolve(promise, y, fulfil, reject);
          };
          var rejectPromise = function (r) {
            if (called) { return; }
            called = true;
            reject(r);
          };

          try {
            then.call(x, resolvePromise, rejectPromise);
          } catch (e$1) {
            if (!called) {
              reject(e$1);
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
    window.requestAnimationFrame = function (callback) {
      var currentTime = Date.now();
      var timeToNextCall = Math.max(0, 16 - (currentTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currentTime + timeToNextCall);
      }, timeToNextCall);
      lastTime = currentTime + timeToNextCall;
      return id;
    };
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function noop () { }

  /* eslint no-console:"off" */
  var alreadyWarned = {};
  var log;
  var printWarning;
  var welcome;
  if (hasConsole) {
      var welcomeIntro_1 = [
          "%cRactive.js %c2.0.0-edge %cin debug mode, %cmore...",
          'color: rgb(114, 157, 52); font-weight: normal;',
          'color: rgb(85, 85, 85); font-weight: normal;',
          'color: rgb(85, 85, 85); font-weight: normal;',
          'color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;'
      ];
      var welcomeMessage_1 = "You're running Ractive 2.0.0-edge in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\nTo disable debug mode, add this line at the start of your app:\n  Ractive.DEBUG = false;\n\nTo disable debug mode when your app is minified, add this snippet:\n  Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});\n\nGet help and support:\n  http://ractive.js.org\n  http://stackoverflow.com/questions/tagged/ractivejs\n  http://groups.google.com/forum/#!forum/ractive-js\n  http://twitter.com/ractivejs\n\nFound a bug? Raise an issue:\n  https://github.com/ractivejs/ractive/issues\n\n";
      welcome = function () {
          if (Ractive.WELCOME_MESSAGE === false) {
              welcome = noop;
              return;
          }
          var message = 'WELCOME_MESSAGE' in Ractive ? Ractive.WELCOME_MESSAGE : welcomeMessage_1;
          var hasGroup = !!console.groupCollapsed;
          if (hasGroup)
              { console.groupCollapsed.apply(console, welcomeIntro_1); }
          console.log(message);
          if (hasGroup) {
              console.groupEnd();
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
                  var name_1;
                  if (ractive.component && (name_1 = ractive.component.name)) {
                      message = "<" + name_1 + "> " + message;
                  }
                  var node = void 0;
                  if ((node =
                      options.node || (ractive.fragment && ractive.fragment.rendered && ractive.find('*')))) {
                      args.push(node);
                  }
              }
          }
          console.warn.apply(console, __spreadArrays(['%cRactive.js: %c' + message,
              'color: rgb(114, 157, 52);',
              'color: rgb(85, 85, 85);'], args));
      };
      log = function () {
          var arguments$1 = arguments;

          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments$1[_i];
          }
          console.log.apply(console, args);
      };
  }
  else {
      printWarning = log = welcome = noop;
  }
  function format(message, args) {
      return message.replace(/%s/g, function () { return args.shift(); });
  }
  function fatal(message) {
      var arguments$1 = arguments;

      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments$1[_i];
      }
      message = format(message, args);
      throw new Error(message);
  }
  function logIfDebug() {
      var arguments$1 = arguments;

      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments$1[_i];
      }
      if (Ractive.DEBUG) {
          log.apply(void 0, args);
      }
  }
  function warn(message) {
      var arguments$1 = arguments;

      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments$1[_i];
      }
      message = format(message, args);
      printWarning(message, args);
  }
  function warnOnce(message) {
      var arguments$1 = arguments;

      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments$1[_i];
      }
      message = format(message, args);
      if (alreadyWarned[message]) {
          return;
      }
      alreadyWarned[message] = true;
      printWarning(message, args);
  }
  function warnIfDebug(message) {
      var arguments$1 = arguments;

      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments$1[_i];
      }
      if (Ractive.DEBUG) {
          warn.apply(void 0, __spreadArrays([message], args));
      }
  }
  function warnOnceIfDebug(message) {
      var arguments$1 = arguments;

      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments$1[_i];
      }
      if (Ractive.DEBUG) {
          warnOnce.apply(void 0, __spreadArrays([message], args));
      }
  }

  var extern = {};
  function getRactiveContext(ractive) {
      var arguments$1 = arguments;

      var assigns = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          assigns[_i - 1] = arguments$1[_i];
      }
      var fragment = ractive.fragment ||
          ractive._fakeFragment ||
          (ractive._fakeFragment = new FakeFragment(ractive));
      return fragment.getContext.apply(fragment, assigns);
  }
  function getContext() {
      var arguments$1 = arguments;

      var assigns = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          assigns[_i] = arguments$1[_i];
      }
      if (!this.ctx)
          { this.ctx = new extern.Context(this); }
      var target = create(this.ctx);
      return assign.apply(void 0, __spreadArrays([target], assigns));
  }
  var FakeFragment = /** @class */ (function () {
      function FakeFragment(ractive) {
          this.getContext = getContext;
          this.findComponent = noop;
          this.findAll = noop;
          this.findAllComponents = noop;
          this.ractive = ractive;
      }
      FakeFragment.prototype.findContext = function () {
          return this.ractive.viewmodel;
      };
      return FakeFragment;
  }());
  function findParentWithContext(fragment) {
      var frag = fragment;
      while (frag && !frag.context)
          { frag = frag.parent; }
      if (!frag)
          { return fragment && fragment.ractive.fragment; }
      else
          { return frag; }
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
      }
      else {
          ractive.event = null;
      }
  }

  var initStars = {};
  var bubbleStars = {};
  /**
   * cartesian product of name parts and stars
   * adjusted appropriately for special cases
   */
  function variants(name, initial) {
      var map = initial ? initStars : bubbleStars;
      if (map[name])
          { return map[name]; }
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
          }
          else {
              result.push('*');
              result.push(name);
          }
      }
      map[name] = result;
      return result;
  }
  function fireEvent(ractive, eventName, context, args) {
      if (args === void 0) { args = []; }
      if (!eventName) {
          return;
      }
      context.name = eventName;
      args.unshift(context);
      var eventNames = ractive._nsSubs ? variants(eventName, true) : ['*', eventName];
      return fireEventAs(ractive, eventNames, context, args, true);
  }
  function fireEventAs(ractive, eventNames, context, args, initialFire) {
      if (initialFire === void 0) { initialFire = false; }
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

  var Hook = /** @class */ (function () {
      function Hook(event) {
          this.event = event;
          this.method = 'on' + event;
      }
      Hook.prototype.fire = function (ractive, arg) {
          var context = getRactiveContext(ractive);
          var method = this.method;
          if (ractive[method]) {
              arg ? ractive[method](context, arg) : ractive[method](context);
          }
          fireEvent(ractive, this.event, context, arg ? [arg, ractive] : [ractive]);
      };
      return Hook;
  }());
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
  var HookQueue = /** @class */ (function () {
      function HookQueue(event) {
          this.hook = new Hook(event);
          this.inProcess = {};
          this.queue = {};
      }
      HookQueue.prototype.begin = function (ractive) {
          this.inProcess[ractive._guid] = true;
      };
      HookQueue.prototype.end = function (ractive) {
          var parent = ractive.parent;
          // If this is *isn't* a child of a component that's in process,
          // it should call methods or fire at this point
          if (!parent || !this.inProcess[parent._guid]) {
              fire(this, ractive);
          }
          else {
              // elsewise, handoff to parent to fire when ready
              getChildQueue(this.queue, parent).push(ractive);
          }
          delete this.inProcess[ractive._guid];
      };
      return HookQueue;
  }());
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

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  function bind(x) {
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

  function addToArray(array, value) {
      var index = array.indexOf(value);
      if (index === -1) {
          array.push(value);
      }
  }
  function arrayContains(array, value) {
      var valueIndex = array.indexOf(value);
      return valueIndex !== -1;
  }
  function arrayContentsMatch(a, b) {
      if (!isArray(a) || !isArray(b)) {
          return false;
      }
      if (a.length !== b.length) {
          return false;
      }
      var i = a.length;
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
      var arguments$1 = arguments;

      var arrays = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          arrays[_i] = arguments$1[_i];
      }
      var res = arrays.concat.apply([], arrays);
      var i = res.length;
      while (i--) {
          var idx = res.indexOf(res[i]);
          if (~idx && idx < i)
              { res.splice(i, 1); }
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
          if (result)
              { return result; }
      }
  }
  function buildNewIndices(one, two, mapper) {
      var oldArray = one;
      var newArray = two;
      if (mapper) {
          oldArray = oldArray.map(mapper);
          newArray = newArray.map(mapper);
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
              if (result[i] !== i)
                  { break; }
          }
          if (i === len)
              { result.same = true; }
      }
      return result;
  }

  var id = 0;
  var TransitionManager = /** @class */ (function () {
      function TransitionManager(callback, parent) {
          this.totalChildren = 0;
          this.outroChildren = 0;
          this.outrosComplete = false;
          this.intros = [];
          this.outros = [];
          this.children = [];
          this.detachQueue = [];
          this.callback = callback;
          this.parent = parent;
          this.id = id++;
          if (parent) {
              parent.addChild(this);
          }
      }
      TransitionManager.prototype.add = function (transition) {
          var list = transition.isIntro ? this.intros : this.outros;
          transition.starting = true;
          list.push(transition);
      };
      TransitionManager.prototype.addChild = function (child) {
          this.children.push(child);
          this.totalChildren += 1;
          this.outroChildren += 1;
      };
      TransitionManager.prototype.checkStart = function () {
          var _a;
          if ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.started)
              { this.start(); }
      };
      TransitionManager.prototype.decrementOutros = function () {
          this.outroChildren -= 1;
          check(this);
      };
      TransitionManager.prototype.decrementTotal = function () {
          this.totalChildren -= 1;
          check(this);
      };
      TransitionManager.prototype.detachNodes = function () {
          var len = this.detachQueue.length;
          for (var i = 0; i < len; i++)
              { this.detachQueue[i].detach(); }
          len = this.children.length;
          for (var i = 0; i < len; i++)
              { this.children[i].detachNodes(); }
          this.detachQueue = [];
      };
      TransitionManager.prototype.ready = function () {
          if (this.detachQueue.length)
              { detachImmediate(this); }
      };
      TransitionManager.prototype.remove = function (transition) {
          var list = transition.isIntro ? this.intros : this.outros;
          removeFromArray(list, transition);
          check(this);
      };
      TransitionManager.prototype.start = function () {
          this.started = true;
          this.children.forEach(function (c) { return c.start(); });
          this.intros.concat(this.outros).forEach(function (t) { return t.start(); });
          check(this);
      };
      return TransitionManager;
  }());
  function check(tm) {
      if (!tm.started || tm.outros.length || tm.outroChildren)
          { return; }
      // If all outros are complete, and we haven't already done this,
      // we notify the parent if there is one, otherwise
      // start detaching nodes
      if (!tm.outrosComplete) {
          tm.outrosComplete = true;
          if (tm.parent)
              { tm.parent.decrementOutros(); }
          if (allOutrosComplete(tm)) {
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
  function allOutrosComplete(manager) {
      return !manager || (manager.outrosComplete && allOutrosComplete(manager.parent));
  }
  // check through the detach queue to see if a node is up or downstream from a
  // transition and if not, go ahead and detach it
  function detachImmediate(manager) {
      var queue = manager.detachQueue;
      var outros = collectAllOutros(manager);
      if (!outros.length) {
          manager.detachNodes();
      }
      else {
          var i = queue.length;
          var j = 0;
          var node = void 0, trans = void 0;
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
          var parent_1 = manager;
          while (parent_1.parent)
              { parent_1 = parent_1.parent; }
          return collectAllOutros(parent_1, list);
      }
      else {
          // grab all outros from child managers
          var i = manager.children.length;
          while (i--) {
              list = collectAllOutros(manager.children[i], list);
          }
          // grab any from this manager if there are any
          if (manager.outros.length)
              { list = list.concat(manager.outros); }
          return list;
      }
  }

  var batch;
  var Runloop = /** @class */ (function () {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      function Runloop() {
      }
      Runloop.getInstance = function () {
          if (!Runloop.instance) {
              Runloop.instance = new Runloop();
          }
          return Runloop.instance;
      };
      Runloop.prototype.active = function () {
          return !!batch;
      };
      Runloop.prototype.start = function () {
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
      };
      Runloop.prototype.end = function () {
          flushChanges();
          if (!batch.previousBatch)
              { batch.transitionManager.start(); }
          else
              { batch.transitionManager.checkStart(); }
          batch = batch.previousBatch;
      };
      Runloop.prototype.addFragment = function (fragment) {
          addToArray(batch.fragments, fragment);
      };
      // TODO: come up with a better way to handle fragments that trigger their own update
      Runloop.prototype.addFragmentToRoot = function (fragment) {
          if (!batch)
              { return; }
          var b = batch;
          while (b.previousBatch) {
              b = b.previousBatch;
          }
          addToArray(b.fragments, fragment);
      };
      Runloop.prototype.addObserver = function (observer, defer) {
          if (!batch) {
              observer.dispatch();
          }
          else {
              addToArray(defer ? batch.deferredObservers : batch.immediateObservers, observer);
          }
      };
      Runloop.prototype.registerTransition = function (transition) {
          transition._manager = batch.transitionManager;
          batch.transitionManager.add(transition);
      };
      // synchronise node detachments with transition ends
      Runloop.prototype.detachWhenReady = function (thing) {
          batch.transitionManager.detachQueue.push(thing);
      };
      Runloop.prototype.scheduleTask = function (task, postRender) {
          var _batch;
          if (!batch) {
              task();
          }
          else {
              _batch = batch;
              while (postRender && _batch.previousBatch) {
                  // this can't happen until the DOM has been fully updated
                  // otherwise in some situations (with components inside elements)
                  // transitions and decorators will initialise prematurely
                  _batch = _batch.previousBatch;
              }
              _batch.tasks.push(task);
          }
      };
      Runloop.prototype.promise = function () {
          if (!batch)
              { return Promise.resolve(); }
          var target = batch;
          while (target.previousBatch) {
              target = target.previousBatch;
          }
          return target.promise || Promise.resolve();
      };
      return Runloop;
  }());
  var runloop = Runloop.getInstance();
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
      var fragments = batch.fragments;
      batch.fragments = [];
      while (i--) {
          fragment = fragments[i];
          fragment.update();
      }
      batch.transitionManager.ready();
      var deferredObservers = batch.deferredObservers;
      batch.deferredObservers = [];
      deferredObservers.forEach(dispatch);
      var tasks = batch.tasks;
      batch.tasks = [];
      for (var i_1 = 0; i_1 < tasks.length; i_1 += 1) {
          tasks[i_1]();
      }
      // If updating the view caused some model blowback - e.g. a triple
      // containing <option> elements caused the binding on the <select>
      // to update - then we start over
      if (batch.fragments.length ||
          batch.immediateObservers.length ||
          batch.deferredObservers.length ||
          batch.tasks.length) {
          return flushChanges();
      }
  }

  // TODO what happens if a transition is aborted?
  var tickers = [];
  var running = false;
  function tick() {
      runloop.start();
      var now = performance.now();
      var ticker;
      for (var i = 0; i < tickers.length; i += 1) {
          ticker = tickers[i];
          if (!ticker.tick(now)) {
              // ticker is complete, remove it from the stack, and decrement i so we don't miss one
              tickers.splice(i--, 1);
          }
      }
      runloop.end();
      if (tickers.length) {
          requestAnimationFrame(tick);
      }
      else {
          running = false;
      }
  }
  var Ticker = /** @class */ (function () {
      function Ticker(options) {
          assign(this, options);
          this.start = performance.now();
          this.end = this.start + this.duration;
          this.running = true;
          tickers.push(this);
          if (!running)
              { requestAnimationFrame(tick); }
      }
      Ticker.prototype.tick = function (now) {
          if (!this.running)
              { return false; }
          if (now > this.end) {
              if (this.step)
                  { this.step(1); }
              if (this.complete)
                  { this.complete(1); }
              return false;
          }
          var elapsed = now - this.start;
          var eased = this.easing(elapsed / this.duration);
          if (this.step)
              { this.step(eased); }
          return true;
      };
      Ticker.prototype.stop = function () {
          // if (this.abort) this.abort();
          this.running = false;
      };
      return Ticker;
  }());

  // TODO refine types on this two variables and in stopCapturing function
  var stack = [];
  var captureGroup;
  function startCapturing() {
      stack.push((captureGroup = []));
  }
  function capture(model) {
      if (captureGroup) {
          addToArray(captureGroup, model);
      }
  }
  function stopCapturing() {
      var dependencies = stack.pop();
      captureGroup = stack[stack.length - 1];
      return dependencies;
  }

  var fnBind = Function.prototype.bind;
  function bind$1(fn, context) {
      if (!/this/.test(fn.toString()))
          { return fn; }
      var bound = fnBind.call(fn, context);
      for (var prop in fn)
          { bound[prop] = fn[prop]; }
      return bound;
  }

  var TEMPLATE_VERSION = 4;

  var shared = {};

  // todo rename file in TemplateItemType
  var TemplateItemType;
  (function (TemplateItemType) {
      TemplateItemType[TemplateItemType["TEXT"] = 1] = "TEXT";
      TemplateItemType[TemplateItemType["INTERPOLATOR"] = 2] = "INTERPOLATOR";
      TemplateItemType[TemplateItemType["TRIPLE"] = 3] = "TRIPLE";
      TemplateItemType[TemplateItemType["SECTION"] = 4] = "SECTION";
      TemplateItemType[TemplateItemType["INVERTED"] = 5] = "INVERTED";
      TemplateItemType[TemplateItemType["CLOSING"] = 6] = "CLOSING";
      TemplateItemType[TemplateItemType["ELEMENT"] = 7] = "ELEMENT";
      TemplateItemType[TemplateItemType["PARTIAL"] = 8] = "PARTIAL";
      TemplateItemType[TemplateItemType["COMMENT"] = 9] = "COMMENT";
      TemplateItemType[TemplateItemType["DELIMCHANGE"] = 10] = "DELIMCHANGE";
      TemplateItemType[TemplateItemType["ANCHOR"] = 11] = "ANCHOR";
      TemplateItemType[TemplateItemType["ATTRIBUTE"] = 13] = "ATTRIBUTE";
      TemplateItemType[TemplateItemType["CLOSING_TAG"] = 14] = "CLOSING_TAG";
      TemplateItemType[TemplateItemType["COMPONENT"] = 15] = "COMPONENT";
      TemplateItemType[TemplateItemType["YIELDER"] = 16] = "YIELDER";
      TemplateItemType[TemplateItemType["INLINE_PARTIAL"] = 17] = "INLINE_PARTIAL";
      TemplateItemType[TemplateItemType["DOCTYPE"] = 18] = "DOCTYPE";
      TemplateItemType[TemplateItemType["ALIAS"] = 19] = "ALIAS";
      TemplateItemType[TemplateItemType["AWAIT"] = 55] = "AWAIT";
      TemplateItemType[TemplateItemType["NUMBER_LITERAL"] = 20] = "NUMBER_LITERAL";
      TemplateItemType[TemplateItemType["STRING_LITERAL"] = 21] = "STRING_LITERAL";
      TemplateItemType[TemplateItemType["ARRAY_LITERAL"] = 22] = "ARRAY_LITERAL";
      TemplateItemType[TemplateItemType["OBJECT_LITERAL"] = 23] = "OBJECT_LITERAL";
      TemplateItemType[TemplateItemType["BOOLEAN_LITERAL"] = 24] = "BOOLEAN_LITERAL";
      TemplateItemType[TemplateItemType["REGEXP_LITERAL"] = 25] = "REGEXP_LITERAL";
      TemplateItemType[TemplateItemType["GLOBAL"] = 26] = "GLOBAL";
      TemplateItemType[TemplateItemType["KEY_VALUE_PAIR"] = 27] = "KEY_VALUE_PAIR";
      TemplateItemType[TemplateItemType["REFERENCE"] = 30] = "REFERENCE";
      TemplateItemType[TemplateItemType["REFINEMENT"] = 31] = "REFINEMENT";
      TemplateItemType[TemplateItemType["MEMBER"] = 32] = "MEMBER";
      TemplateItemType[TemplateItemType["PREFIX_OPERATOR"] = 33] = "PREFIX_OPERATOR";
      TemplateItemType[TemplateItemType["BRACKETED"] = 34] = "BRACKETED";
      TemplateItemType[TemplateItemType["CONDITIONAL"] = 35] = "CONDITIONAL";
      TemplateItemType[TemplateItemType["INFIX_OPERATOR"] = 36] = "INFIX_OPERATOR";
      TemplateItemType[TemplateItemType["INVOCATION"] = 40] = "INVOCATION";
      TemplateItemType[TemplateItemType["SECTION_IF"] = 50] = "SECTION_IF";
      TemplateItemType[TemplateItemType["SECTION_UNLESS"] = 51] = "SECTION_UNLESS";
      TemplateItemType[TemplateItemType["SECTION_EACH"] = 52] = "SECTION_EACH";
      TemplateItemType[TemplateItemType["SECTION_WITH"] = 53] = "SECTION_WITH";
      TemplateItemType[TemplateItemType["SECTION_IF_WITH"] = 54] = "SECTION_IF_WITH";
      TemplateItemType[TemplateItemType["ELSE"] = 60] = "ELSE";
      TemplateItemType[TemplateItemType["ELSEIF"] = 61] = "ELSEIF";
      TemplateItemType[TemplateItemType["THEN"] = 62] = "THEN";
      TemplateItemType[TemplateItemType["CATCH"] = 63] = "CATCH";
      TemplateItemType[TemplateItemType["EVENT"] = 70] = "EVENT";
      TemplateItemType[TemplateItemType["DECORATOR"] = 71] = "DECORATOR";
      TemplateItemType[TemplateItemType["TRANSITION"] = 72] = "TRANSITION";
      TemplateItemType[TemplateItemType["BINDING_FLAG"] = 73] = "BINDING_FLAG";
      TemplateItemType[TemplateItemType["DELEGATE_FLAG"] = 74] = "DELEGATE_FLAG";
  })(TemplateItemType || (TemplateItemType = {}));
  var TemplateItemType$1 = TemplateItemType;
  // export const TEXT = 1;
  // export const INTERPOLATOR = 2;
  // export const TRIPLE = 3;
  // export const SECTION = 4;
  // export const INVERTED = 5;
  // export const CLOSING = 6;
  // export const ELEMENT = 7;
  // export const PARTIAL = 8;
  // export const COMMENT = 9;
  // export const DELIMCHANGE = 10;
  // export const ANCHOR = 11;
  // export const ATTRIBUTE = 13;
  // export const CLOSING_TAG = 14;
  // export const COMPONENT = 15;
  // export const YIELDER = 16;
  // export const INLINE_PARTIAL = 17;
  // export const DOCTYPE = 18;
  // export const ALIAS = 19;
  // export const AWAIT = 55;
  // export const NUMBER_LITERAL = 20;
  // export const STRING_LITERAL = 21;
  // export const ARRAY_LITERAL = 22;
  // export const OBJECT_LITERAL = 23;
  // export const BOOLEAN_LITERAL = 24;
  // export const REGEXP_LITERAL = 25;
  // export const GLOBAL = 26;
  // export const KEY_VALUE_PAIR = 27;
  // export const REFERENCE = 30;
  // export const REFINEMENT = 31;
  // export const MEMBER = 32;
  // export const PREFIX_OPERATOR = 33;
  // export const BRACKETED = 34;
  // export const CONDITIONAL = 35;
  // export const INFIX_OPERATOR = 36;
  // export const INVOCATION = 40;
  // export const SECTION_IF = 50;
  // export const SECTION_UNLESS = 51;
  // export const SECTION_EACH = 52;
  // export const SECTION_WITH = 53;
  // export const SECTION_IF_WITH = 54;
  // export const ELSE = 60;
  // export const ELSEIF = 61;
  // export const THEN = 62;
  // export const CATCH = 63;
  // export const EVENT = 70;
  // export const DECORATOR = 71;
  // export const TRANSITION = 72;
  // export const BINDING_FLAG = 73;
  // export const DELEGATE_FLAG = 74;

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
              vars.push("x$" + i);
          }
          return vars.length ? "(function(){var " + vars.join(',') + ";return(" + expr + ");})()" : expr;
      }
      function stringify(node) {
          if (isString(node)) {
              return node;
          }
          switch (node.t) {
              case TemplateItemType$1.BOOLEAN_LITERAL:
              case TemplateItemType$1.GLOBAL:
              case TemplateItemType$1.NUMBER_LITERAL:
              case TemplateItemType$1.REGEXP_LITERAL:
                  return node.v;
              case TemplateItemType$1.STRING_LITERAL:
                  return JSON.stringify(String(node.v));
              case TemplateItemType$1.ARRAY_LITERAL:
                  if (node.m && hasSpread(node.m)) {
                      return "[].concat(" + makeSpread(node.m, '[', ']', stringify) + ")";
                  }
                  else {
                      return '[' + (node.m ? node.m.map(stringify).join(',') : '') + ']';
                  }
              case TemplateItemType$1.OBJECT_LITERAL:
                  if (node.m && hasSpread(node.m)) {
                      return "Object.assign({}," + makeSpread(node.m, '{', '}', stringifyPair) + ")";
                  }
                  else {
                      return '{' + (node.m ? node.m.map(function (n) { return n.k + ":" + stringify(n.v); }).join(',') : '') + '}';
                  }
              case TemplateItemType$1.PREFIX_OPERATOR:
                  return (node.s === 'typeof' ? 'typeof ' : node.s) + stringify(node.o);
              case TemplateItemType$1.INFIX_OPERATOR:
                  return (stringify(node.o[0]) +
                      (node.s.substr(0, 2) === 'in' ? ' ' + node.s + ' ' : node.s) +
                      stringify(node.o[1]));
              case TemplateItemType$1.INVOCATION:
                  if (node.o && hasSpread(node.o)) {
                      var id = count++;
                      return "(x$" + id + "=" + stringify(node.x) + ").apply(x$" + id + "," + stringify({
                          t: TemplateItemType$1.ARRAY_LITERAL,
                          m: node.o
                      }) + ")";
                  }
                  else {
                      return stringify(node.x) + '(' + (node.o ? node.o.map(stringify).join(',') : '') + ')';
                  }
              case TemplateItemType$1.BRACKETED:
                  return '(' + stringify(node.x) + ')';
              case TemplateItemType$1.MEMBER:
                  return stringify(node.x) + stringify(node.r);
              case TemplateItemType$1.REFINEMENT:
                  return node.n ? '.' + node.n : '[' + stringify(node.x) + ']';
              case TemplateItemType$1.CONDITIONAL:
                  return stringify(node.o[0]) + '?' + stringify(node.o[1]) + ':' + stringify(node.o[2]);
              case TemplateItemType$1.REFERENCE:
                  return '_' + refs.indexOf(node.n);
              default:
                  throw new Error('Expected legal JavaScript');
          }
      }
      function stringifyPair(node) {
          return node.p ? stringify(node.k) : node.k + ":" + stringify(node.v);
      }
      function makeSpread(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      list, open, close, fn) {
          var out = list.reduce(function (a, c) {
              if (c.p) {
                  a.str += "" + (a.open ? close + ',' : a.str.length ? ',' : '') + fn(c);
              }
              else {
                  a.str += "" + (!a.str.length ? open : !a.open ? ',' + open : ',') + fn(c);
              }
              a.open = !c.p;
              return a;
          }, { open: false, str: '' });
          if (out.open)
              { out.str += close; }
          return out.str;
      }
  }
  function hasSpread(list) {
      for (var i = 0; i < list.length; i++) {
          if (list[i].p)
              { return true; }
      }
      return false;
  }
  function extractRefs(node, refs) {
      if (node.t === TemplateItemType$1.REFERENCE && isString(node.n)) {
          if (!~refs.indexOf(node.n)) {
              refs.unshift(node.n);
          }
      }
      var list = node.o || node.m;
      if (list) {
          if (isArray(list)) {
              var i = list.length;
              while (i--) {
                  extractRefs(list[i], refs);
              }
          }
          else {
              extractRefs(list, refs);
          }
      }
      var nodeAsKeyValuePair = node;
      if (nodeAsKeyValuePair.k &&
          nodeAsKeyValuePair.t === TemplateItemType$1.KEY_VALUE_PAIR &&
          !isString(nodeAsKeyValuePair.k)) {
          extractRefs(nodeAsKeyValuePair.k, refs);
      }
      var nodeWithExpression = node;
      if (nodeWithExpression.x) {
          extractRefs(nodeWithExpression.x, refs);
      }
      var nodeAsMember = node;
      if (nodeAsMember.r) {
          extractRefs(nodeAsMember.r, refs);
      }
      var nodeWithValue = node;
      if (nodeWithValue.v) {
          extractRefs(nodeWithValue.v, refs);
      }
  }

  function refineExpression(expression, mustache) {
      var referenceExpression;
      if (expression) {
          while (expression.t === TemplateItemType$1.BRACKETED && expression.x) {
              expression = expression.x;
          }
          if (expression.t === TemplateItemType$1.REFERENCE) {
              var n = expression.n;
              if (!~n.indexOf('@context')) {
                  mustache.r = expression.n;
              }
              else {
                  mustache.x = flattenExpression(expression);
              }
          }
          else {
              if ((referenceExpression = getReferenceExpression(expression))) {
                  mustache.rx = referenceExpression;
              }
              else {
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
      while (expression.t === TemplateItemType$1.MEMBER &&
          expression.r.t === TemplateItemType$1.REFINEMENT) {
          refinement = expression.r;
          if (refinement.x) {
              if (refinement.x.t === TemplateItemType$1.REFERENCE) {
                  members.unshift(refinement.x);
              }
              else {
                  members.unshift(flattenExpression(refinement.x));
              }
          }
          else {
              members.unshift(refinement.n);
          }
          expression = expression.x;
      }
      if (expression.t !== TemplateItemType$1.REFERENCE) {
          return null;
      }
      return {
          r: expression.n,
          m: members
      };
  }

  var name = /^[a-zA-Z_$][a-zA-Z_$0-9]*/;
  var spreadPattern = /^\s*\.{3}/;
  var legalReference = /^(?:[a-zA-Z$_0-9]|\\\.)+(?:(?:\.(?:[a-zA-Z$_0-9]|\\\.)+)|(?:\[[0-9]+\]))*/;
  var relaxedName = /^[a-zA-Z_$][-\/a-zA-Z_$0-9]*(?:\.(?:[a-zA-Z_$][-\/a-zA-Z_$0-9]*))*/;

  // if a reference is a browser global, we don't deference it later, so it needs special treatment
  var globals = /^(?:Array|console|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null|Object|Number|String|Boolean)\b/;
  // keywords are not valid references, with the exception of `this`
  var keywords = /^(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|var|void|while|with)$/;
  var prefixPattern = /^(?:\@\.|\@|~\/|(?:\^\^\/(?:\^\^\/)*(?:\.\.\/)*)|(?:\.\.\/)+|\.\/(?:\.\.\/)*|\.)/;
  var specials = /^(key|index|keypath|rootpath|this|global|shared|context|event|node|local|style|helpers|last|macro)/;
  function readReference(parser) {
      var prefix, name, global, reference;
      var startPos = parser.pos;
      prefix = parser.matchPattern(prefixPattern) || '';
      name =
          (!prefix && parser.relaxedNames && parser.matchPattern(relaxedName)) ||
              parser.matchPattern(legalReference);
      var actual = prefix.length + ((name && name.length) || 0);
      if (prefix === '@.') {
          prefix = '@';
          if (name)
              { name = 'this.' + name; }
          else
              { name = 'this'; }
      }
      if (!name && prefix) {
          name = prefix;
          prefix = '';
      }
      if (!name) {
          return null;
      }
      if (prefix === '@') {
          if (!specials.test(name)) {
              parser.error("Unrecognized special reference @" + name);
          }
          else if ((!name.indexOf('event') || !name.indexOf('node')) && !parser.inEvent) {
              parser.error("@event and @node are only valid references within an event directive");
          }
          else if (!name.indexOf('context')) {
              parser.pos = parser.pos - (name.length - 7);
              return {
                  t: TemplateItemType$1.BRACKETED,
                  x: {
                      t: TemplateItemType$1.REFERENCE,
                      n: '@context'
                  }
              };
          }
      }
      // bug out if it's a keyword (exception for ancestor/restricted refs - see https://github.com/ractivejs/ractive/issues/1497)
      if (!prefix && !parser.relaxedNames && keywords.test(name)) {
          parser.pos = startPos;
          return null;
      }
      // if this is a browser global, stop here
      if (!prefix && globals.test(name)) {
          global = globals.exec(name)[0];
          parser.pos = startPos + global.length;
          return {
              t: TemplateItemType$1.GLOBAL,
              v: global
          };
      }
      reference = (prefix || '') + normalise(name);
      if (parser.matchString('(')) {
          // if this is a method invocation (as opposed to a function) we need
          // to strip the method name from the reference combo, else the context
          // will be wrong
          // but only if the reference was actually a member and not a refinement
          var lastDotIndex = reference.lastIndexOf('.');
          if (lastDotIndex !== -1 && name[name.length - 1] !== ']') {
              if (lastDotIndex === 0) {
                  reference = '.';
                  parser.pos = startPos;
              }
              else {
                  var refLength = reference.length;
                  reference = reference.substr(0, lastDotIndex);
                  parser.pos = startPos + (actual - (refLength - lastDotIndex));
              }
          }
          else {
              parser.pos -= 1;
          }
      }
      return {
          t: TemplateItemType$1.REFERENCE,
          n: reference.replace(/^this\./, './').replace(/^this$/, '.')
      };
  }

  var expectedExpression = 'Expected a JavaScript expression';
  var expectedParen = 'Expected closing paren';

  function readBracketedExpression(parser) {
      if (!parser.matchString('('))
          { return null; }
      parser.sp();
      var expr = readExpression(parser);
      if (!expr)
          { parser.error(expectedExpression); }
      parser.sp();
      if (!parser.matchString(')'))
          { parser.error(expectedParen); }
      return {
          t: TemplateItemType$1.BRACKETED,
          x: expr
      };
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
          }
          else if (expr === null) {
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

  function readArrayLiteral (parser) {
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
          t: TemplateItemType$1.ARRAY_LITERAL,
          m: expressionList
      };
  }

  function readBooleanLiteral(parser) {
      var remaining = parser.remaining();
      if (remaining.substr(0, 4) === 'true') {
          parser.pos += 4;
          return {
              t: TemplateItemType$1.BOOLEAN_LITERAL,
              v: 'true'
          };
      }
      if (remaining.substr(0, 5) === 'false') {
          parser.pos += 5;
          return {
              t: TemplateItemType$1.BOOLEAN_LITERAL,
              v: 'false'
          };
      }
      return null;
  }

  // bulletproof number regex from https://gist.github.com/Rich-Harris/7544330
  var numberPattern = /^(?:[+-]?)0*(?:(?:(?:[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
  function readNumberLiteral(parser) {
      var result;
      if ((result = parser.matchPattern(numberPattern))) {
          return {
              t: TemplateItemType$1.NUMBER_LITERAL,
              v: result
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
  function makeQuotedStringMatcher (okQuote) {
      return function (parser) {
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
                  }
                  else if (next === "\\'") {
                      literal += "'";
                  }
                  else {
                      literal += next;
                  }
              }
              else {
                  next = parser.matchPattern(lineContinuationPattern);
                  if (next) {
                      // convert \(newline-like) into a \u escape, which is allowed in JSON
                      literal += '\\u' + ('000' + next.charCodeAt(1).toString(16)).slice(-4);
                  }
                  else {
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
  function readStringLiteral (parser) {
      var start = parser.pos;
      var quote = parser.matchString("'") || parser.matchString("\"");
      if (quote) {
          var string = (quote === "'" ? singleMatcher : doubleMatcher)(parser);
          if (!parser.matchString(quote)) {
              parser.pos = start;
              return null;
          }
          return {
              t: TemplateItemType$1.STRING_LITERAL,
              v: string
          };
      }
      return null;
  }

  var identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
  /**
   * can be any name, string literal, or number literal
   *
   * @see http://mathiasbynens.be/notes/javascript-properties
   */
  function readKey(parser) {
      var token;
      if ((token = readStringLiteral(parser))) {
          return identifier.test(token.v) ? token.v : '"' + token.v.replace(/"/g, '\\"') + '"';
      }
      if ((token = readNumberLiteral(parser))) {
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
      if (refKey)
          { spread = parser.matchPattern(spreadPattern); }
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
              parser.error("Expected a valid reference, but found '" + key + "' instead.");
          }
          var pair = {
              t: TemplateItemType$1.KEY_VALUE_PAIR,
              k: key,
              v: {
                  t: TemplateItemType$1.REFERENCE,
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
          t: TemplateItemType$1.KEY_VALUE_PAIR,
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

  function readObjectLiteral (parser) {
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
          t: TemplateItemType$1.OBJECT_LITERAL,
          m: keyValuePairs
      };
  }

  var regexpPattern = /^(\/(?:[^\n\r\u2028\u2029/\\[]|\\.|\[(?:[^\n\r\u2028\u2029\]\\]|\\.)*])+\/(?:([gimuy])(?![a-z]*\2))*(?![a-zA-Z_$0-9]))/;
  function readNumberLiteral$1(parser) {
      var result;
      if ((result = parser.matchPattern(regexpPattern))) {
          return {
              t: TemplateItemType$1.REGEXP_LITERAL,
              v: result
          };
      }
      return null;
  }

  // Match one or more characters until: ", ', or \
  var stringMiddlePattern$1 = /^[^`"\\\$]+?(?:(?=[`"\\\$]))/;
  var escapes = /[\r\n\t\b\f]/g;
  function getString(literal) {
      return JSON.parse("\"" + literal.replace(escapes, escapeChar) + "\"");
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
      if (!parser.matchString('`'))
          { return null; }
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
              }
              else if (next === '\\`') {
                  literal += '`';
              }
              else if (next === '$') {
                  if (parser.matchString('{')) {
                      parts.push({ t: TemplateItemType$1.STRING_LITERAL, v: getString(literal) });
                      literal = '';
                      parser.sp();
                      var expr = readExpression(parser);
                      if (!expr)
                          { parser.error('Expected valid expression'); }
                      parts.push({ t: TemplateItemType$1.BRACKETED, x: expr });
                      parser.sp();
                      if (!parser.matchString('}'))
                          { parser.error("Expected closing '}' after interpolated expression"); }
                  }
                  else {
                      literal += '$';
                  }
              }
              else {
                  literal += next;
              }
          }
          else {
              next = parser.matchPattern(lineContinuationPattern);
              if (next) {
                  // convert \(newline-like) into a \u escape, which is allowed in JSON
                  literal += '\\u' + ('000' + next.charCodeAt(1).toString(16)).slice(-4);
              }
              else {
                  done = true;
              }
          }
      }
      if (literal.length)
          { parts.push({ t: TemplateItemType$1.STRING_LITERAL, v: getString(literal) }); }
      if (!parser.matchString('`'))
          { parser.error("Expected closing '`'"); }
      if (!parts.length) {
          // empty string literal
          return { t: TemplateItemType$1.STRING_LITERAL, v: '' };
      }
      else if (parts.length === 1) {
          return parts[0];
      }
      else {
          var result = parts.pop();
          var part = void 0;
          while ((part = parts.pop())) {
              result = {
                  t: TemplateItemType$1.INFIX_OPERATOR,
                  s: '+',
                  o: [part, result]
              };
          }
          return {
              t: TemplateItemType$1.BRACKETED,
              x: result
          };
      }
  }

  function readLiteral(parser) {
      return (readNumberLiteral(parser) ||
          readBooleanLiteral(parser) ||
          readStringLiteral(parser) ||
          readTemplateStringLiteral(parser) ||
          readObjectLiteral(parser) ||
          readArrayLiteral(parser) ||
          readNumberLiteral$1(parser));
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
          var name_1 = parser.matchPattern(name);
          if (name_1) {
              return {
                  t: TemplateItemType$1.REFINEMENT,
                  n: name_1
              };
          }
          parser.error('Expected a property name');
      }
      // "[" expression "]"
      if (parser.matchString('[')) {
          parser.sp();
          var expr = readExpression(parser);
          if (!expr)
              { parser.error(expectedExpression); }
          parser.sp();
          if (!parser.matchString(']'))
              { parser.error("Expected ']'"); }
          return {
              t: TemplateItemType$1.REFINEMENT,
              x: expr
          };
      }
      return null;
  }

  function readMemberOfInvocation(parser) {
      var expression = readPrimary(parser);
      if (!expression)
          { return null; }
      while (expression) {
          var refinement = readRefinement(parser);
          if (refinement) {
              expression = {
                  t: TemplateItemType$1.MEMBER,
                  x: expression,
                  r: refinement
              };
          }
          else if (parser.matchString('(')) {
              parser.sp();
              var expressionList = readExpressionList(parser, true);
              parser.sp();
              if (!parser.matchString(')')) {
                  parser.error(expectedParen);
              }
              expression = {
                  t: TemplateItemType$1.INVOCATION,
                  x: expression
              };
              if (expressionList)
                  { expression.o = expressionList; }
          }
          else {
              break;
          }
      }
      return expression;
  }

  var readTypeOf;
  var makePrefixSequenceMatcher = function (symbol, fallthrough) {
      return function (parser) {
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
              t: TemplateItemType$1.PREFIX_OPERATOR,
              s: symbol,
              o: expression
          };
      };
  };
  // create all prefix sequence matchers, return readTypeOf
  {
      var i = void 0, len = void 0, matcher = void 0;
      var prefixOperators = '! ~ + - typeof'.split(' ');
      var fallthrough = readMemberOfInvocation;
      for (i = 0, len = prefixOperators.length; i < len; i += 1) {
          matcher = makePrefixSequenceMatcher(prefixOperators[i], fallthrough);
          fallthrough = matcher;
      }
      // typeof operator is higher precedence than multiplication, so provides the
      // fallthrough for the multiplication sequence matcher we're about to create
      // (we're skipping void and delete)
      readTypeOf = fallthrough;
  }
  var readTypeof = readTypeOf;

  var readLogicalOr;
  var makeInfixSequenceMatcher = function (symbol, fallthrough) {
      return function (parser) {
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
                  t: TemplateItemType$1.INFIX_OPERATOR,
                  s: symbol,
                  o: [left, right]
              };
              // Loop back around.  If we don't see another occurrence of the symbol,
              // we'll return left.
          }
      };
  };
  // create all infix sequence matchers, and return readLogicalOr
  {
      var i$1 = void 0, len$1 = void 0, matcher$1 = void 0, fallthrough$1 = void 0;
      // All the infix operators on order of precedence (source: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Operator_Precedence)
      // Each sequence matcher will initially fall through to its higher precedence
      // neighbour, and only attempt to match if one of the higher precedence operators
      // (or, ultimately, a literal, reference, or bracketed expression) already matched
      var infixOperators = '* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||'.split(' ');
      // A typeof operator is higher precedence than multiplication
      fallthrough$1 = readTypeof;
      for (i$1 = 0, len$1 = infixOperators.length; i$1 < len$1; i$1 += 1) {
          matcher$1 = makeInfixSequenceMatcher(infixOperators[i$1], fallthrough$1);
          fallthrough$1 = matcher$1;
      }
      // Logical OR is the fallthrough for the conditional matcher
      readLogicalOr = fallthrough$1;
  }
  var readLogicalOr$1 = readLogicalOr;

  // The conditional operator is the lowest precedence operator, so we start here
  function readConditional(parser) {
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
          t: TemplateItemType$1.CONDITIONAL,
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
      /**
       * @todo consider to remove move inside one place all logic for sequence matcher
       *  inside readType and readLogicalOr
       */
      // The conditional operator is the lowest precedence operator (except yield,
      // assignment operators, and commas, none of which are supported), so we
      // start there. If it doesn't match, it 'falls through' to progressively
      // higher precedence operators, until it eventually matches (or fails to
      // match) a 'primary' - a literal or a reference. This way, the abstract syntax
      // tree has everything in its proper place, i.e. 2 + 3 * 4 === 14, not 20.
      return readConditional(parser);
  }

  function readExpressionOrReference(parser, expectedFollowers) {
      var start = parser.pos;
      var expression = readExpression(parser);
      if (!expression) {
          // valid reference but invalid expression e.g. `{{new}}`?
          var ref = parser.matchPattern(/^(\w+)/);
          if (ref) {
              return {
                  t: TemplateItemType$1.REFERENCE,
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

  function readInterpolator(parser, tag) {
      var expression, err;
      var start = parser.pos;
      // TODO would be good for perf if we could do away with the try-catch
      try {
          expression = readExpressionOrReference(parser, [tag.close]);
      }
      catch (e) {
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
          parser.error("Expected closing delimiter '" + tag.close + "' after reference");
          if (!expression) {
              // special case - comment
              if (parser.nextChar() === '!') {
                  return null;
              }
              parser.error("Expected expression or legal reference");
          }
      }
      var interpolator = { t: TemplateItemType$1.INTERPOLATOR };
      refineExpression(expression, interpolator); // TODO handle this differently - it's mysterious
      return interpolator;
  }

  function readComment(parser, tag) {
      if (!parser.matchString('!')) {
          return null;
      }
      var index = parser.remaining().indexOf(tag.close);
      if (index !== -1) {
          parser.pos += index + tag.close.length;
          return { t: TemplateItemType$1.COMMENT };
      }
  }

  var legalAlias = /^(?:[a-zA-Z$_0-9]|\\\.)+(?:(?:(?:[a-zA-Z$_0-9]|\\\.)+)|(?:\[[0-9]+\]))*/;
  var asRE = /^as/i;
  function readAliases(parser) {
      var aliases = [];
      var start = parser.pos;
      parser.sp();
      // we are going for sure to process this alias using refineExpression
      // so force type to AliasDefinitionRefinedTemplateItem
      var alias = readAlias(parser);
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
      var expr = readExpression(parser);
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
      var partial = {
          t: type === '>' ? TemplateItemType$1.PARTIAL : TemplateItemType$1.YIELDER
      };
      var aliases;
      if (!type)
          { return null; }
      parser.sp();
      if (type === '>' || !(aliases = parser.matchString('with'))) {
          // Partial names can include hyphens, so we can't use readExpression
          // blindly. Instead, we use the `relaxedNames`.
          parser.relaxedNames = parser.strictRefinement = true;
          var expression = readExpression(parser);
          parser.relaxedNames = parser.strictRefinement = false;
          if (!expression && type === '>')
              { return null; }
          if (expression) {
              refineExpression(expression, partial); // TODO...
              parser.sp();
              if (type !== '>')
                  { aliases = parser.matchString('with'); }
          }
      }
      parser.sp();
      // check for alias context e.g. `{{>foo bar as bat, bip as bop}}`
      if (aliases || type === '>') {
          aliases = readAliases(parser);
          if (aliases && aliases.length) {
              partial.z = aliases;
          }
          else {
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
          if (type !== '>' && !partial.c && !partial.z) {
              // {{yield with}} requires some aliases
              parser.error("Expected a context or one or more aliases");
          }
      }
      parser.sp();
      if (!parser.matchString(tag.close)) {
          parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      return partial;
  }

  var handlebarsBlockCodes = {
      each: TemplateItemType$1.SECTION_EACH,
      if: TemplateItemType$1.SECTION_IF,
      with: TemplateItemType$1.SECTION_IF_WITH,
      unless: TemplateItemType$1.SECTION_UNLESS
  };

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
              t: TemplateItemType$1.CLOSING,
              r: remaining.substr(0, index).split(' ')[0]
          };
          parser.pos += index;
          if (!parser.matchString(tag.close)) {
              parser.error("Expected closing delimiter '" + tag.close + "'");
          }
          return closing;
      }
      parser.pos = start;
      return null;
  }

  /**
   * Auxilliary support configuration for readInlineBlock. Include template type and pattern
   */
  var InlinBlockConfig = {
      else: [TemplateItemType$1.ELSE, /^\s*else\s*/],
      elseif: [TemplateItemType$1.ELSEIF, /^\s*elseif\s+/],
      then: [TemplateItemType$1.THEN, /^\s*then\s*/],
      catch: [TemplateItemType$1.CATCH, /^\s*catch\s*/]
  };
  function readInlineBlock(parser, tag, type) {
      var start = parser.pos;
      if (!parser.matchString(tag.open)) {
          return null;
      }
      var _a = InlinBlockConfig[type], templateType = _a[0], pattern = _a[1];
      if (!parser.matchPattern(pattern)) {
          parser.pos = start;
          return null;
      }
      var res = { t: templateType };
      if (type === 'elseif') {
          res.x = readExpression(parser);
      }
      else if (type === 'catch' || type === 'then') {
          var nm = parser.matchPattern(name);
          if (nm)
              { res.n = nm; }
      }
      if (!parser.matchString(tag.close)) {
          parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      return res;
  }

  var indexRefPattern = /^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/;
  var keyIndexRefPattern = /^\s*,\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/;
  var handlebarsBlockPattern = new RegExp('^(' + keys(handlebarsBlockCodes).join('|') + ')\\b');
  function readSection(parser, tag) {
      var expression;
      var section;
      var child;
      var children;
      var hasElse;
      var block;
      var unlessBlock;
      var closed;
      var i;
      var expectedClose;
      var hasThen;
      var hasCatch;
      var inlineThen;
      var aliasOnly = false;
      var start = parser.pos;
      if (parser.matchString('^')) {
          // watch out for parent context refs - {{^^/^^/foo}}
          if (parser.matchString('^/')) {
              parser.pos = start;
              return null;
          }
          section = {
              t: TemplateItemType$1.SECTION,
              f: [],
              n: TemplateItemType$1.SECTION_UNLESS
          };
      }
      else if (parser.matchString('#')) {
          section = { t: TemplateItemType$1.SECTION, f: [] };
          if (parser.matchString('partial')) {
              parser.pos = start - parser.standardDelimiters[0].length;
              parser.error('Partial definitions can only be at the top level of the template, or immediately inside components');
          }
          if ((block = parser.matchString('await'))) {
              expectedClose = block;
              section.t = TemplateItemType$1.AWAIT;
          }
          else if ((block = parser.matchPattern(handlebarsBlockPattern))) {
              expectedClose = block;
              section.n = handlebarsBlockCodes[block];
          }
      }
      else {
          return null;
      }
      parser.sp();
      if (block === 'with') {
          var aliases = readAliases(parser);
          if (aliases) {
              aliasOnly = true;
              section.z = aliases;
              section.t = TemplateItemType$1.ALIAS;
          }
      }
      else if (block === 'each') {
          var alias = readAlias(parser);
          if (alias) {
              section.z = [{ n: alias.n, x: { r: '.' } }];
              expression = alias.x;
          }
      }
      if (!aliasOnly) {
          if (!expression)
              { expression = readExpression(parser); }
          if (!expression) {
              parser.error('Expected expression');
          }
          // extra each aliases
          if (block === 'each' && parser.matchString(',')) {
              var aliases = readAliases(parser);
              if (aliases) {
                  if (section.z)
                      { aliases.unshift(section.z[0]); }
                  section.z = aliases;
              }
          }
          // optional index and key references
          if ((block === 'each' || !block) && (i = parser.matchPattern(indexRefPattern))) {
              var extra = void 0;
              if ((extra = parser.matchPattern(keyIndexRefPattern))) {
                  section.i = i + ',' + extra;
              }
              else {
                  section.i = i;
              }
          }
          else if (block === 'await' && parser.matchString('then')) {
              parser.sp();
              hasThen = true;
              inlineThen = parser.matchPattern(name);
              if (!inlineThen)
                  { inlineThen = true; }
          }
          if (!block && 'n' in expression) {
              expectedClose = expression.n;
          }
      }
      parser.sp();
      if (!parser.matchString(tag.close)) {
          parser.error("Expected closing delimiter '" + tag.close + "'");
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
                          { parser.warn("Expected " + tag.open + "/" + expectedClose + tag.close + " but found " + tag.open + "/" + child.r + tag.close); }
                  }
                  else {
                      parser.pos = pos;
                      parser.error("Expected " + tag.open + "/" + expectedClose + tag.close);
                  }
              }
              parser.sectionDepth -= 1;
              closed = true;
          }
          else if (!aliasOnly &&
              ((child = readInlineBlock(parser, tag, 'elseif')) ||
                  (child = readInlineBlock(parser, tag, 'else')) ||
                  (block === 'await' &&
                      ((child = readInlineBlock(parser, tag, 'then')) ||
                          (child = readInlineBlock(parser, tag, 'catch')))))) {
              if (section.n === TemplateItemType$1.SECTION_UNLESS) {
                  parser.error('{{else}} not allowed in {{#unless}}');
              }
              if (hasElse) {
                  if (child.t === TemplateItemType$1.ELSE) {
                      parser.error('there can only be one {{else}} block, at the end of a section');
                  }
                  else if (child.t === TemplateItemType$1.ELSEIF) {
                      parser.error('illegal {{elseif...}} after {{else}}');
                  }
              }
              if (!unlessBlock && (inlineThen || !hasThen) && !hasCatch) {
                  if (block === 'await') {
                      var s = void 0;
                      if (inlineThen) {
                          s = {
                              t: TemplateItemType$1.THEN,
                              f: children
                          };
                          if (inlineThen !== true)
                              { s.n = inlineThen; }
                      }
                      else {
                          s = {
                              t: TemplateItemType$1.SECTION,
                              f: children
                          };
                      }
                      section.f = [s];
                  }
                  else {
                      unlessBlock = [];
                  }
              }
              children = [];
              if (child.t === TemplateItemType$1.ELSE) {
                  if (block === 'await') {
                      var elseMustache = {
                          t: TemplateItemType$1.ELSE,
                          f: children
                      };
                      section.f.push(elseMustache);
                  }
                  else {
                      var unlessMustache = {
                          t: TemplateItemType$1.SECTION,
                          f: children,
                          n: TemplateItemType$1.SECTION_UNLESS
                      };
                      unlessBlock.push(unlessMustache);
                  }
                  hasElse = true;
              }
              else if (child.t === TemplateItemType$1.ELSEIF) {
                  var elseIfMustache = {
                      t: TemplateItemType$1.SECTION,
                      f: children,
                      n: TemplateItemType$1.SECTION_IF
                  };
                  refineExpression(child.x, elseIfMustache);
                  unlessBlock.push(elseIfMustache);
              }
              else if (child.t === TemplateItemType$1.THEN) {
                  if (hasElse)
                      { parser.error('{{then}} block must appear before any {{else}} block'); }
                  if (hasCatch)
                      { parser.error('{{then}} block must appear before any {{catch}} block'); }
                  if (hasThen)
                      { parser.error('there can only be one {{then}} block per {{#await}}'); }
                  var thenMustache = {
                      t: TemplateItemType$1.THEN,
                      f: children
                  };
                  hasThen = true;
                  if (child.n)
                      { thenMustache.n = child.n; }
                  section.f.push(thenMustache);
              }
              else if (child.t === TemplateItemType$1.CATCH) {
                  if (hasElse)
                      { parser.error('{{catch}} block must appear before any {{else}} block'); }
                  if (hasCatch)
                      { parser.error('there can only be one {{catch}} block per {{#await}}'); }
                  var catchMustache = {
                      t: TemplateItemType$1.CATCH,
                      n: child.n,
                      f: children
                  };
                  hasCatch = true;
                  section.f.push(catchMustache);
              }
          }
          else {
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
          var s = void 0;
          if (inlineThen) {
              s = {
                  t: TemplateItemType$1.THEN,
                  f: section.f
              };
              if (inlineThen !== true)
                  { s.n = inlineThen; }
          }
          else {
              s = {
                  t: TemplateItemType$1.SECTION,
                  f: section.f
              };
          }
          section.f = [s];
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

  function readTriple(parser, tag) {
      var expression = readExpression(parser);
      if (!expression) {
          return null;
      }
      if (!parser.matchString(tag.close)) {
          parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      var triple = { t: TemplateItemType$1.TRIPLE };
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
          parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      var triple = { t: TemplateItemType$1.TRIPLE };
      refineExpression(expression, triple); // TODO handle this differently - it's mysterious
      // force casting since population is done as side effect of refineExpression
      return triple;
  }

  var leadingLinebreak = /^[ \t\f\r\n]*\r?\n/;
  var trailingLinebreak = /\r?\n[ \t\f\r\n]*$/;
  function stripStandalones(items) {
      var i;
      var current;
      var backOne;
      var backTwo;
      var lastSectionItem;
      for (i = 1; i < items.length; i += 1) {
          current = items[i];
          backOne = items[i - 1];
          backTwo = items[i - 2];
          // if we're at the end of a [text][comment][text] sequence...
          if (isString(current) &&
              (isComment(backOne) || isDelimiterChange(backOne)) &&
              isString(backTwo)) {
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
              if (trailingLinebreak.test(backOne) &&
                  isString(current.f[0]) &&
                  leadingLinebreak.test(current.f[0])) {
                  items[i - 1] = backOne.replace(trailingLinebreak, '\n');
                  current.f[0] = current.f[0].replace(leadingLinebreak, '');
              }
          }
          // if the last item was a section, and it is followed by a linebreak, and
          // its last item is a linebreak...
          if (isString(current) && isSection(backOne)) {
              lastSectionItem = lastItem(backOne.f);
              if (isString(lastSectionItem) &&
                  trailingLinebreak.test(lastSectionItem) &&
                  leadingLinebreak.test(current)) {
                  backOne.f[backOne.f.length - 1] = lastSectionItem.replace(trailingLinebreak, '\n');
                  items[i] = current.replace(leadingLinebreak, '');
              }
          }
      }
      return items;
  }
  function isComment(item) {
      return item.t === TemplateItemType$1.COMMENT;
  }
  function isDelimiterChange(item) {
      return item.t === TemplateItemType$1.DELIMCHANGE;
  }
  function isSection(item) {
      return item.t === TemplateItemType$1.SECTION && item.f;
  }

  // type TrimWhiteSpaceTemplateItem =
  //   | AliasTemplateItem
  //   | AnchorTemplateItem
  //   | NoDelegationFlagDirectiveTemplateItem
  //   | DecoratorDirectiveTemplateItem
  //   | PartialMustacheTemplateItem
  //   | EventDirectiveTemplateItem
  //   | TripleMustacheTemplateItem
  //   | BindingFlagDirectiveTemplateItem
  //   | GenericAttributeTemplateItem
  //   | InterpolatorTemplateItem
  //   | SectionMustacheTemplateItem
  //   | ElementTemplateItem;
  function trimWhiteSpace(items, leadingPattern, trailingPattern) {
      var item;
      if (leadingPattern) {
          item = items[0];
          if (isString(item)) {
              item = item.replace(leadingPattern, '');
              if (!item) {
                  items.shift();
              }
              else {
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
              }
              else {
                  items[items.length - 1] = item;
              }
          }
      }
  }

  var contiguousWhitespace = /[ \t\f\r\n]+/g;
  var leadingWhitespace = /^[ \t\f\r\n]+/;
  var trailingWhitespace = /[ \t\f\r\n]+$/;
  var leadingNewLine = /^(?:\r\n|\r|\n)/;
  var trailingNewLine = /(?:\r\n|\r|\n)$/;
  // todo add types on items
  function cleanup(items, stripComments, preserveWhitespace, removeLeadingWhitespace, removeTrailingWhitespace, whiteSpaceElements) {
      if (isString(items))
          { return; }
      var i;
      var item;
      var previousItem;
      var nextItem;
      var preserveWhitespaceInsideFragment;
      var removeLeadingWhitespaceInsideFragment;
      var removeTrailingWhitespaceInsideFragment;
      // First pass - remove standalones and comments etc
      stripStandalones(items);
      i = items.length;
      while (i--) {
          item = items[i];
          // Remove delimiter changes, unsafe elements etc
          if (item.exclude) {
              items.splice(i, 1);
          }
          else if (stripComments && item.t === TemplateItemType$1.COMMENT) {
              // Remove comments, unless we want to keep them
              items.splice(i, 1);
          }
      }
      // If necessary, remove leading and trailing whitespace
      trimWhiteSpace(items, removeLeadingWhitespace ? leadingWhitespace : null, removeTrailingWhitespace ? trailingWhitespace : null);
      i = items.length;
      while (i--) {
          item = items[i];
          removeLeadingWhitespaceInsideFragment = removeTrailingWhitespaceInsideFragment = false;
          // Recurse
          if (item.f) {
              var isPreserveWhitespaceElement = item.t === TemplateItemType$1.ELEMENT &&
                  (whiteSpaceElements[item.e.toLowerCase()] || whiteSpaceElements[item.e]);
              preserveWhitespaceInsideFragment = preserveWhitespace || isPreserveWhitespaceElement;
              if (!preserveWhitespace && isPreserveWhitespaceElement) {
                  trimWhiteSpace(item.f, leadingNewLine, trailingNewLine);
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
                  if (!nextItem || (isString(nextItem) && leadingWhitespace.test(nextItem))) {
                      removeTrailingWhitespaceInsideFragment = true;
                  }
              }
              cleanup(item.f, stripComments, preserveWhitespaceInsideFragment, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment, whiteSpaceElements);
          }
          // Split if-else blocks into two (an if, and an unless)
          if (item.l) {
              cleanup(item.l, stripComments, preserveWhitespace, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment, whiteSpaceElements);
              // todo we need to update template item with l definition
              item.l.forEach(function (s) { return (s.l = 1); });
              item.l.unshift(i + 1, 0);
              items.splice.apply(items, item.l);
              delete item.l; // TODO would be nice if there was a way around this
          }
          // Clean up conditional attributes
          if (item.m) {
              cleanup(item.m, stripComments, preserveWhitespace, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment, whiteSpaceElements);
              if (item.m.length < 1)
                  { delete item.m; }
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

  // https://github.com/kangax/html-minifier/issues/63#issuecomment-37763316
  // export const booleanAttributes = /^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i;
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
  var entityPattern = new RegExp('&(#?(?:x[\\w\\d]+|\\d+|' + keys(htmlEntities).join('|') + '));?', 'g');
  var codePointSupport = isFunction(String.fromCodePoint);
  var codeToChar = codePointSupport ? String.fromCodePoint : String.fromCharCode;
  var lessThan = /</g;
  var greaterThan = />/g;
  var amp = /&/g;
  var invalid = 65533;
  function escapeHtml(str) {
      return str.replace(amp, '&amp;').replace(lessThan, '&lt;').replace(greaterThan, '&gt;');
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
      }
      else if (!codePointSupport) {
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
  function decodeCharacterReferences(html) {
      return html.replace(entityPattern, function (match, entity) {
          var code;
          // Handle named entities
          if (entity[0] !== '#') {
              code = htmlEntities[entity];
          }
          else if (entity[1] === 'x') {
              code = parseInt(entity.substring(2), 16);
          }
          else {
              code = parseInt(entity.substring(1), 10);
          }
          if (!code) {
              return match;
          }
          return codeToChar(validateCode(code));
      });
  }

  function hyphenateCamel (camelCaseStr) {
      return camelCaseStr.replace(/([A-Z])/g, function (_match, $1) {
          return '-' + $1.toLowerCase();
      });
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
              t: TemplateItemType$1.CLOSING_TAG,
              e: tag
          };
      }
      // We have an illegal closing tag, report it
      parser.pos -= 2;
      parser.error('Illegal closing tag');
  }

  var pattern = /[-/\\^$*+?.()|[\]{}]/g;
  function escapeRegExp(str) {
      return str.replace(pattern, '\\$&');
  }

  var regExpCache = {};
  function getLowestIndex (haystack, needles) {
      return haystack.search(regExpCache[needles.join()] ||
          (regExpCache[needles.join()] = new RegExp(needles.map(escapeRegExp).join('|'))));
  }

  var unquotedAttributeValueTextPattern = /^[^\s"'=<>\/`]+/;
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
      var value = readQuotedAttributeValue(parser, "'") ||
          readQuotedAttributeValue(parser, "\"") ||
          readUnquotedAttributeValue(parser);
      if (value === null) {
          parser.error('Expected valid attribute value');
      }
      if (parser.sectionDepth !== startDepth) {
          parser.pos = valueStart;
          parser.error('An attribute value must contain as many opening section tags as closing section tags');
      }
      if (!value.length) {
          return '';
      }
      if (value.length === 1 && isString(value[0])) {
          return decodeCharacterReferences(value[0]);
      }
      return value;
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

  var attributeNamePattern = /^[^\s"'>\/=(]+/;
  var onPattern = /^on/;
  var eventPattern = /^on-([a-zA-Z\*\.$_]((?:[a-zA-Z\*\.$_0-9\-]|\\-)+))$/;
  var reservedEventNamesList = [
      'change',
      'reset',
      'teardown',
      'update',
      'construct',
      'config',
      'init',
      'render',
      'complete',
      'unrender',
      'detach',
      'insert',
      'destruct',
      'attachchild',
      'detachchild'
  ];
  var reservedEventNames = new RegExp("^(?:" + reservedEventNamesList.join('|') + ")$");
  var decoratorPattern = /^as-([a-z-A-Z][-a-zA-Z_0-9]*)$/;
  var transitionPattern = /^([a-zA-Z](?:(?!-in-out)[-a-zA-Z_0-9])*)-(in|out|in-out)$/;
  var boundPattern = /^((bind|class)-(([-a-zA-Z0-9_])+))$/;
  var directives = {
      lazy: { t: TemplateItemType$1.BINDING_FLAG, v: 'l' },
      twoway: { t: TemplateItemType$1.BINDING_FLAG, v: 't' }
  };
  var proxyEvent = /^[^\s"'=<>@\[\]()]*/;
  var whitespace = /^\s+/;
  function readAttributeOrDirective(parser) {
      var match, directive;
      var attributeName = readAttributeName(parser);
      if (!attributeName)
          { return null; }
      var attribute;
      if ((directive = directives[attributeName])) {
          // lazy, twoway
          var directiveTemplatrItem = {
              t: directive.t,
              v: directive.v
          };
          parser.sp();
          if (parser.nextChar() === '=')
              { directiveTemplatrItem.f = readAttributeValue(parser); }
          attribute = directiveTemplatrItem;
      }
      else if (attributeName === 'no-delegation') {
          // no-delegation directive
          attribute = {
              t: TemplateItemType$1.DELEGATE_FLAG
          };
      }
      else if ((match = decoratorPattern.exec(attributeName))) {
          // decorators
          var decoratorTemplateItem = {
              t: TemplateItemType$1.DECORATOR,
              n: match[1]
          };
          readArguments(parser, decoratorTemplateItem);
          attribute = decoratorTemplateItem;
      }
      else if ((match = transitionPattern.exec(attributeName))) {
          // transitions
          var transitionTemplateItem = {
              t: TemplateItemType$1.TRANSITION,
              n: match[1],
              v: match[2] === 'in-out'
                  ? "t0" /* INTRO_OUTRO */
                  : match[2] === 'in'
                      ? "t1" /* INTRO */
                      : "t2" /* OUTRO */
          };
          readArguments(parser, transitionTemplateItem);
          attribute = transitionTemplateItem;
      }
      else if ((match = eventPattern.exec(attributeName))) {
          // on-click etc
          var eventTemplateItem = {
              t: TemplateItemType$1.EVENT,
              n: splitEvent(match[1]),
              f: undefined
          };
          if (parser.matchString('(')) {
              eventTemplateItem.a = flattenExpression({
                  t: TemplateItemType$1.ARRAY_LITERAL,
                  m: readExpressionList(parser)
              });
              if (!parser.matchString(')'))
                  { parser.error("Expected closing ')'"); }
          }
          parser.inEvent = true;
          // check for a proxy event
          if (!readProxyEvent(parser, eventTemplateItem)) {
              // otherwise, it's an expression
              readArguments(parser, eventTemplateItem, true);
          }
          else if (reservedEventNames.test(eventTemplateItem.f)) {
              parser.pos -= eventTemplateItem.f.length;
              parser.error("Cannot use reserved event names (" + reservedEventNamesList.join(' ') + ")");
          }
          parser.inEvent = false;
          attribute = eventTemplateItem;
      }
      else if ((match = boundPattern.exec(attributeName))) {
          // bound directives
          var bind = match[2] === 'bind';
          var genericAttributeTemplateItem = {
              t: TemplateItemType$1.ATTRIBUTE,
              n: bind ? match[3] : match[1]
          };
          readArguments(parser, genericAttributeTemplateItem, false, true);
          if (!genericAttributeTemplateItem.f && bind) {
              genericAttributeTemplateItem.f = [{ t: TemplateItemType$1.INTERPOLATOR, r: match[3] }];
          }
          attribute = genericAttributeTemplateItem;
      }
      else {
          parser.sp();
          var value = parser.nextChar() === '=' ? readAttributeValue(parser) : null;
          if (parser.sanitizeEventAttributes && onPattern.test(attributeName)) {
              return { exclude: true };
          }
          var f = value != null ? value : value === '' ? '' : 0;
          var genericAttributeTemplateItem = {
              t: TemplateItemType$1.ATTRIBUTE,
              n: attributeName,
              f: f
          };
          attribute = genericAttributeTemplateItem;
      }
      return attribute;
  }
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
  function readAttributeName(parser) {
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
              if (idx < nearest)
                  { nearest = idx; }
          }
      }
      if (nearest < name.length) {
          parser.pos -= name.length - nearest;
          name = name.substr(0, nearest);
          if (!name)
              { return null; }
      }
      return name;
  }
  function readProxyEvent(parser, attribute) {
      var start = parser.pos;
      if (!parser.matchString('='))
          { parser.error("Missing required directive arguments"); }
      var quote = parser.matchString("'") || parser.matchString("\"");
      parser.sp();
      var proxy = parser.matchPattern(proxyEvent);
      if (proxy !== undefined) {
          if (quote) {
              parser.sp();
              if (!parser.matchString(quote))
                  { parser.pos = start; }
              else
                  { return (attribute.f = proxy) || true; }
          }
          else if (!parser.matchPattern(whitespace)) {
              parser.pos = start;
          }
          else {
              return (attribute.f = proxy) || true;
          }
      }
      else {
          parser.pos = start;
      }
  }
  function readArguments(parser, attribute, required, single) {
      if (required === void 0) { required = false; }
      if (single === void 0) { single = false; }
      parser.sp();
      if (!parser.matchString('=')) {
          if (required)
              { parser.error("Missing required directive arguments"); }
          return;
      }
      parser.sp();
      var quote = parser.matchString('"') || parser.matchString("'");
      var spread = parser.spreadArgs;
      parser.spreadArgs = true;
      parser.inUnquotedAttribute = !quote;
      var expr = single
          ? readExpressionOrReference(parser, [quote || ' ', '/', '>'])
          : { m: readExpressionList(parser), t: TemplateItemType$1.ARRAY_LITERAL };
      parser.inUnquotedAttribute = false;
      parser.spreadArgs = spread;
      if (quote) {
          parser.sp();
          if (parser.matchString(quote) !== quote)
              { parser.error("Expected matching quote '" + quote + "'"); }
      }
      if (single) {
          // only for GenericAttributeTemplateItem
          var interpolator = { t: TemplateItemType$1.INTERPOLATOR };
          refineExpression(expr, interpolator);
          attribute.f = [interpolator];
      }
      else {
          attribute.f = flattenExpression(expr);
      }
  }

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

  var delimiterChangeToken = {
      t: TemplateItemType$1.DELIMCHANGE,
      exclude: true
  };
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
      var start = parser.pos;
      if (parser.matchString('\\' + tag.open)) {
          if (start === 0 || parser.str[start - 1] !== '\\') {
              return tag.open;
          }
      }
      else if (!parser.matchString(tag.open)) {
          return null;
      }
      // delimiter change?
      var mustache;
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
          if (!readNumberLiteral$1(parser)) {
              parser.pos = rewind - tag.close.length;
              if (parser.inAttribute) {
                  parser.pos = start;
                  return null;
              }
              else {
                  parser.error("Attempted to close a section that wasn't open");
              }
          }
          else {
              parser.pos = rewind;
          }
      }
      // todo integrate MustachePrimaryItem with the s and q properties
      var mustacheItem, reader, i;
      for (i = 0; i < tag.readers.length; i += 1) {
          reader = tag.readers[i];
          if ((mustacheItem = reader(parser, tag))) {
              if (tag.isStatic) {
                  mustacheItem.s = 1;
              }
              if (parser.includeLinePositions) {
                  mustacheItem.q = parser.getLinePos(start);
              }
              return mustacheItem;
          }
      }
      parser.pos = start;
      return null;
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
      p: 'address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul'.split(' '),
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
  function readElement(parser) {
      // todo add correct typings on all variables below
      var attribute;
      var selfClosing;
      var children;
      var partials;
      var hasPartials;
      var child;
      var closed;
      var pos;
      var remaining;
      var closingTag;
      var anchor;
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
          var doctypeTemplateElement = element;
          doctypeTemplateElement.t = TemplateItemType$1.DOCTYPE;
          if (!parser.matchPattern(/^doctype/i)) {
              parser.error('Expected DOCTYPE declaration');
          }
          doctypeTemplateElement.a = parser.matchPattern(/^(.+?)>/);
          return doctypeTemplateElement;
      }
      else if ((anchor = parser.matchString('#'))) {
          // check for anchor
          parser.sp();
          // create a reference to element but with AnchorTemplateItem type
          var anchor_1 = element;
          anchor_1.t = TemplateItemType$1.ANCHOR;
          anchor_1.n = parser.matchPattern(anchorPattern);
      }
      else {
          // otherwise, it's an element/component
          element.t = TemplateItemType$1.ELEMENT;
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
              if (!element.m)
                  { element.m = []; }
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
      var templateItemName = getTemplateItemName(element);
      var lowerCaseName = templateItemName.toLowerCase();
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
                  parser.error("Missing end " + (parser.elementStack.length > 1 ? 'tags' : 'tag') + " (" + parser.elementStack
                      .reverse()
                      .map(function (x) { return "</" + x + ">"; })
                      .join('') + ")");
              }
              // if for example we're in an <li> element, and we see another
              // <li> tag, close the first so they become siblings
              if (!anchor && !canContain(lowerCaseName, remaining)) {
                  closed = true;
              }
              else if (!anchor && (closingTag = readClosingTag(parser))) {
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
              }
              else if (anchor && readAnchorClose(parser, templateItemName)) {
                  closed = true;
              }
              else {
                  // implicit close by closing section tag. TODO clean this up
                  var tag = {
                      open: parser.standardDelimiters[0],
                      close: parser.standardDelimiters[1]
                  };
                  if (readClosing(parser, tag) ||
                      readInline(parser, tag)) {
                      closed = true;
                      parser.pos = pos;
                  }
                  else if ((child = parser.read(PARTIAL_READERS))) {
                      if (partials[child.n]) {
                          parser.pos = pos;
                          parser.error('Duplicate partial definition');
                      }
                      cleanup(child.f, parser.stripComments, preserveWhitespace, !preserveWhitespace, !preserveWhitespace, parser.whiteSpaceElements);
                      partials[child.n] = child.f;
                      hasPartials = true;
                  }
                  else {
                      if ((child = parser.read(READERS))) {
                          children.push(child);
                      }
                      else {
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
      if (element.t === TemplateItemType$1.ELEMENT) {
          processInputElement(element);
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
      if (!parser.matchString(tag.open))
          { return; }
      if (parser.matchPattern(inlines)) {
          return true;
      }
      else {
          parser.pos = pos;
      }
  }
  function processInputElement(element) {
      var lowerCaseName = element.e.toLowerCase();
      if (element.m &&
          lowerCaseName !== 'input' &&
          lowerCaseName !== 'select' &&
          lowerCaseName !== 'textarea' &&
          lowerCaseName !== 'option') {
          var attrs = element.m;
          var classes = void 0, styles = void 0, cls = void 0, style = void 0;
          var i = 0;
          var attribute = void 0;
          while (i < attrs.length) {
              attribute = attrs[i];
              if (attribute.t !== TemplateItemType$1.ATTRIBUTE) {
                  i++;
                  continue;
              }
              if (attribute.n.indexOf('class-') === 0 && !attribute.f) {
                  // static class directives
                  (classes || (classes = [])).push(attribute.n.slice(6));
                  attrs.splice(i, 1);
              }
              else if (attribute.n.indexOf('style-') === 0 && isString(attribute.f)) {
                  // static style directives
                  (styles || (styles = [])).push(hyphenateCamel(attribute.n.slice(6)) + ": " + attribute.f + ";");
                  attrs.splice(i, 1);
              }
              else if (attribute.n === 'class' && isString(attribute.f)) {
                  // static class attrs
                  (classes || (classes = [])).push(attribute.f);
                  attrs.splice(i, 1);
              }
              else if (attribute.n === 'style' && isString(attribute.f)) {
                  // static style attrs
                  (styles || (styles = [])).push(attribute.f + (semiEnd.test(attribute.f) ? '' : ';'));
                  attrs.splice(i, 1);
              }
              else if (attribute.n === 'class') {
                  cls = attribute;
                  i++;
              }
              else if (attribute.n === 'style') {
                  style = attribute;
                  i++;
              }
              else if (!~attribute.n.indexOf(':') &&
                  attribute.n !== 'value' &&
                  attribute.n !== 'contenteditable' &&
                  isString(attribute.f)) {
                  attribute.g = 1;
                  i++;
              }
              else {
                  i++;
              }
          }
          if (classes) {
              if (!cls || !isString(cls.f))
                  { attrs.unshift({ t: TemplateItemType$1.ATTRIBUTE, n: 'class', f: classes.join(' '), g: 1 }); }
              else
                  { cls.f += ' ' + classes.join(' '); }
          }
          else if (cls && isString(cls.f))
              { cls.g = 1; }
          if (styles) {
              if (!style || !isString(style.f))
                  { attrs.unshift({ t: TemplateItemType$1.ATTRIBUTE, n: 'style', f: styles.join(' '), g: 1 }); }
              else
                  { style.f += '; ' + styles.join(' '); }
          }
          else if (style && isString(style.f))
              { style.g = 1; }
      }
  }
  function getTemplateItemName(input) {
      if (input.t === TemplateItemType$1.ANCHOR) {
          return input.n;
      }
      return input.e;
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
          t: TemplateItemType$1.COMMENT,
          c: content
      };
      if (parser.includeLinePositions) {
          comment.q = parser.getLinePos(start);
      }
      return comment;
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
          parser.error("Expected closing delimiter '" + delimiters[1] + "'");
      }
      var content = [];
      var open = delimiters[0], close = delimiters[1];
      do {
          // We don't need all StandardParserTag inside readClosing so force type
          if ((child = readClosing(parser, { open: open, close: close }))) {
              if (child.r !== 'partial') {
                  parser.error("Expected " + open + "/partial" + close);
              }
              closed = true;
          }
          else {
              child = parser.read(READERS);
              if (!child) {
                  parser.error("Expected " + open + "/partial" + close);
              }
              content.push(child);
          }
      } while (!closed);
      return {
          t: TemplateItemType$1.INLINE_PARTIAL,
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
          var item = void 0;
          var partial = void 0;
          if ((partial = parser.read(PARTIAL_READERS))) {
              if (partials[partial.n]) {
                  parser.pos = pos;
                  parser.error('Duplicated partial definition');
              }
              cleanup(partial.f, parser.stripComments, preserveWhitespace, !preserveWhitespace, !preserveWhitespace, parser.whiteSpaceElements);
              partials[partial.n] = partial.f;
              hasPartials = true;
          }
          else if ((item = parser.read(READERS))) {
              fragment.push(item);
          }
          else {
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

  function readText(parser) {
      var index, disallowed, barrier;
      var remaining = parser.remaining();
      if (parser.textOnlyMode) {
          disallowed = parser.tags.map(function (t) { return t.open; });
          disallowed = disallowed.concat(parser.tags.map(function (t) { return '\\' + t.open; }));
          index = getLowestIndex(remaining, disallowed);
      }
      else {
          barrier = parser.inside ? '</' + parser.inside : '<';
          if (parser.inside && !parser.interpolate[parser.inside]) {
              index = remaining.indexOf(barrier);
          }
          else {
              disallowed = parser.tags.map(function (t) { return t.open; });
              disallowed = disallowed.concat(parser.tags.map(function (t) { return '\\' + t.open; }));
              // http://developers.whatwg.org/syntax.html#syntax-attributes
              if (parser.inAttribute === true) {
                  // we're inside an unquoted attribute value
                  disallowed.push("\"", "'", "=", "<", ">", '`');
              }
              else if (parser.inAttribute) {
                  // quoted attribute value
                  disallowed.push(parser.inAttribute);
              }
              else {
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
      }
      else {
          return decodeCharacterReferences(remaining.substr(0, index));
      }
  }

  var leadingWhitespace$1 = /^\s+/;
  var ParseError = /** @class */ (function (_super) {
      __extends(ParseError, _super);
      function ParseError(message) {
          var _this = _super.call(this) || this;
          _this.name = 'ParseError';
          _this.message = message;
          return _this;
      }
      return ParseError;
  }(Error));
  // todo add correct return types on props and methods
  var Parser = /** @class */ (function () {
      function Parser(str, options) {
          this.str = str;
          this.options = options || {};
          this.pos = 0;
          this.lines = this.str.split('\n');
          var lineStart = 0;
          this.lineEnds = this.lines.map(function (line) {
              var lineEnd = lineStart + line.length + 1; // +1 for the newline
              lineStart = lineEnd;
              return lineEnd;
          }, 0);
          // Custom init logic
          if (this.init)
              { this.init(str, options); }
          var items = [];
          var item;
          while (this.pos < this.str.length && (item = this.read())) {
              items.push(item);
          }
          this.leftover = this.remaining();
          this.result = this.postProcess(items, options);
      }
      Parser.prototype.read = function (converters) {
          var i;
          var item;
          if (!converters)
              { converters = this.converters; }
          var pos = this.pos;
          var len = converters.length;
          for (i = 0; i < len; i += 1) {
              this.pos = pos; // reset for each attempt
              if ((item = converters[i](this))) {
                  return item;
              }
          }
          return null;
      };
      Parser.prototype.getContextMessage = function (pos, message) {
          var _a = this.getLinePos(pos), lineNum = _a[0], columnNum = _a[1];
          if (this.options.contextLines === -1) {
              return [lineNum, columnNum, message + " at line " + lineNum + " character " + columnNum];
          }
          var line = this.lines[lineNum - 1];
          var contextUp = '';
          var contextDown = '';
          if (this.options.contextLines) {
              var start = lineNum - 1 - this.options.contextLines < 0 ? 0 : lineNum - 1 - this.options.contextLines;
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
          var annotation = contextUp +
              line.replace(/\t/g, function (_match, char) {
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
              message + " at line " + lineNum + " character " + columnNum + ":\n" + annotation
          ];
      };
      Parser.prototype.getLinePos = function (char) {
          var lineNum = 0;
          var lineStart = 0;
          while (char >= this.lineEnds[lineNum]) {
              lineStart = this.lineEnds[lineNum];
              lineNum += 1;
          }
          var columnNum = char - lineStart;
          return [lineNum + 1, columnNum + 1, char]; // line/col should be one-based, not zero-based!
      };
      Parser.prototype.error = function (message) {
          var _a = this.getContextMessage(this.pos, message), lineNum = _a[0], columnNum = _a[1], msg = _a[2];
          var error = new ParseError(msg);
          error.line = lineNum;
          error.character = columnNum;
          error.shortMessage = message;
          throw error;
      };
      Parser.prototype.matchString = function (string) {
          if (this.str.substr(this.pos, string.length) === string) {
              this.pos += string.length;
              return string;
          }
      };
      Parser.prototype.matchPattern = function (pattern) {
          var match = pattern.exec(this.remaining());
          if (match) {
              this.pos += match[0].length;
              return match[1] || match[0];
          }
      };
      Parser.prototype.sp = function () {
          this.matchPattern(leadingWhitespace$1);
      };
      Parser.prototype.remaining = function () {
          return this.str.substring(this.pos);
      };
      Parser.prototype.nextChar = function () {
          return this.str.charAt(this.pos);
      };
      Parser.prototype.warn = function (message) {
          var msg = this.getContextMessage(this.pos, message)[2];
          warnIfDebug(msg);
      };
      return Parser;
  }());

  function fromExpression(body, length) {
      if (length === void 0) { length = 0; }
      var args = new Array(length);
      while (length--) {
          args[length] = "_" + length;
      }
      /*
       * Functions created directly with new Function() look like this:
       * `function anonymous (_0 /*\*\/) { return _0 * 2 }`
       *
       * With this workaround, we get a little more compact:
       * `function (_0){return _0*2}`
       */
      return new Function("return function (" + args.join(',') + "){return(" + body + ");};")();
      // the following instruction do not work with conversion not working with ts
      // return new Function([], `return function (${args.join(',')}){return(${body});};`)();
  }

  /**
   * @param obj Template definition with expressions
   */
  function insertExpressions(obj, expr) {
      keys(obj).forEach(function (key) {
          if (isExpression(key, obj))
              { return addTo(obj, expr); }
          var ref = obj[key];
          if (hasChildren(ref))
              { insertExpressions(ref, expr); }
      });
  }
  function isExpression(key, obj) {
      return key === 's' && isArray(obj['r']);
  }
  function addTo(obj, expr) {
      var s = obj.s, r = obj.r;
      if (!expr[s])
          { expr[s] = fromExpression(s, r.length); }
  }
  function hasChildren(ref) {
      return isArray(ref) || isObject(ref);
  }

  var STANDARD_READERS = [
      readPartial,
      readUnescaped,
      readSection,
      readInterpolator,
      readComment
  ];
  var TRIPLE_READERS = [readTriple];
  var READERS = [readMustache, readHtmlComment, readElement, readText];
  var PARTIAL_READERS = [readPartialDefinitionSection];
  var preserveWhitespaceElements = {
      pre: 1,
      script: 1,
      style: 1,
      textarea: 1
  };
  var defaultInterpolate = {
      textarea: true,
      script: true,
      style: true,
      template: true
  };
  var StandardParser = /** @class */ (function (_super) {
      __extends(StandardParser, _super);
      function StandardParser() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      StandardParser.prototype.init = function (_str, options) {
          var tripleDelimiters = options.tripleDelimiters || shared.defaults.tripleDelimiters;
          var staticDelimiters = options.staticDelimiters || shared.defaults.staticDelimiters;
          var staticTripleDelimiters = options.staticTripleDelimiters || shared.defaults.staticTripleDelimiters;
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
          this.interpolate = assign({}, defaultInterpolate, shared.defaults.interpolate, options.interpolate);
          if (options.sanitize === true) {
              options.sanitize = {
                  // blacklist from https://code.google.com/p/google-caja/source/browse/trunk/src/com/google/caja/lang/html/html4-elements-whitelist.json
                  elements: 'applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title'.split(' '),
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
          if (options.expression)
              { this.converters = [readExpression]; }
          else
              { this.converters = [readTemplate]; }
          if (options.attributes)
              { this.inTag = true; }
          // special whitespace handling requested for certain elements
          this.whiteSpaceElements = assign({}, options.preserveWhitespace, preserveWhitespaceElements);
      };
      StandardParser.prototype.postProcess = function (result, options) {
          var parserResult = result[0];
          if (options.expression) {
              var expr = flattenExpression(parserResult);
              expr.e = fromExpression(expr.s, expr.r.length);
              return expr;
          }
          else {
              // special case - empty string
              if (!result.length) {
                  return { t: [], v: TEMPLATE_VERSION };
              }
              if (this.sectionDepth > 0) {
                  this.error('A section was left open');
              }
              cleanup(parserResult.t, this.stripComments, this.preserveWhitespace, !this.preserveWhitespace, !this.preserveWhitespace, this.whiteSpaceElements);
              if (this.csp !== false) {
                  var expr = {};
                  insertExpressions(parserResult.t, expr);
                  insertExpressions(parserResult.p || {}, expr);
                  if (keys(expr).length)
                      { parserResult.e = expr; }
              }
              return parserResult;
          }
      };
      /**
       * Sort in order of descending opening delimiter length (longer first),
       * to protect against opening delimiters being substrings of each other
       */
      StandardParser.prototype.sortMustacheTags = function () {
          this.tags.sort(function (a, b) {
              return b.open.length - a.open.length;
          });
      };
      return StandardParser;
  }(Parser));
  function parse(template, options) {
      return new StandardParser(template, options || {}).result;
  }

  var functions = create(null);
  function getFunction(str, i) {
      if (functions[str])
          { return functions[str]; }
      return (functions[str] = createFunction(str, i));
  }
  // TODO refine function using types
  function addFunctions(template) {
      if (!template)
          { return; }
      var exp = template.e;
      if (!exp)
          { return; }
      keys(exp).forEach(function (str) {
          if (functions[str])
              { return; }
          functions[str] = exp[str];
      });
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
          fatal("Missing Ractive.parse - cannot parse " + error + ". " + instructions);
      }
  }
  function createFunction(body, length) {
      throwNoParse(fromExpression, 'new expression function', TEMPLATE_INSTRUCTIONS);
      return fromExpression(body, length);
  }
  function createFunctionFromString(str, bindTo) {
      throwNoParse(parse, 'computation string "${str}"', COMPUTATION_INSTRUCTIONS);
      var template = parse(str, { expression: true });
      return function () {
          return template.e.apply(bindTo, template.r.map(function (r) { return bindTo.get(r); }));
      };
  }
  // TODO use type ParserHelper
  var parser = {
      fromId: function (id, options) {
          if (options === void 0) { options = {}; }
          if (!doc) {
              if (options === null || options === void 0 ? void 0 : options.noThrow) {
                  return;
              }
              throw new Error("Cannot retrieve template #" + id + " as Ractive is not running in a browser.");
          }
          if (id)
              { id = id.replace(/^#/, ''); }
          var template;
          if (!(template = doc.getElementById(id))) {
              if (options === null || options === void 0 ? void 0 : options.noThrow) {
                  return;
              }
              throw new Error("Could not find template element with id #" + id);
          }
          if (template.tagName.toUpperCase() !== 'SCRIPT') {
              if (options === null || options === void 0 ? void 0 : options.noThrow) {
                  return;
              }
              throw new Error("Template element with id #" + id + ", must be a <script> element");
          }
          // TSRChange - was `'textContent' in template ? template.textContent : template.innerHTML;`
          return (template === null || template === void 0 ? void 0 : template.textContent) || template.innerHTML;
      },
      isParsed: function (template) {
          return !isString(template);
      },
      getParseOptions: function (ractive) {
          // Could be Ractive or a Component
          if (ractive.defaults) {
              ractive = ractive.defaults;
          }
          return parseOptions.reduce(function (val, key) {
              val[key] = ractive[key];
              return val;
          }, {});
      },
      parse: function (template, options) {
          throwNoParse(parse, 'template', TEMPLATE_INSTRUCTIONS);
          var parsed = parse(template, options);
          addFunctions(parsed);
          return parsed;
      },
      parseFor: function (template, ractive) {
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
          getter = bind$1(signature, ractive);
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
          }
          else if (isFunction(signature.get)) {
              getter = bind$1(signature.get, ractive);
              getterString = signature.get.toString();
              getterUseStack = true;
          }
          else {
              fatal('`%s` computation must have a `get()` method', key);
          }
          if (isFunction(signature.set)) {
              setter = bind$1(signature.set, ractive);
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

  // this is the dry method of checking to see if a rebind applies to
  // a particular keypath because in some cases, a dep may be bound
  // directly to a particular keypath e.g. foo.bars.0.baz and need
  // to avoid getting kicked to foo.bars.1.baz if foo.bars is unshifted
  function rebindMatch(template, next, previous, fragment) {
      var keypath = template.r || template;
      // no valid keypath, go with next
      if (!keypath || !isString(keypath))
          { return next; }
      // completely contextual ref, go with next
      if (keypath === '.' ||
          keypath[0] === '@' ||
          (next || previous).isKey
      // TSRChange isKeypath do not exists
      // (next || previous).isKeypath
      )
          { return next; }
      var parts = keypath.split('/');
      var keys = splitKeypath(parts[parts.length - 1]);
      var last = keys[keys.length - 1];
      // check the keypath against the model keypath to see if it matches
      var model = next || previous;
      // check to see if this was an alias
      if (model && keys.length === 1 && last !== model.key && fragment) {
          var alias = findAlias(last, fragment);
          keys = alias ? alias : keys;
      }
      var i = keys.length;
      var match = true;
      var shuffling = false;
      while (model && i--) {
          if (model.shuffling)
              { shuffling = true; }
          // non-strict comparison to account for indices in keypaths
          if (keys[i] != model.key)
              { match = false; }
          model = model.parent;
      }
      // next is undefined, but keypath is shuffling and previous matches
      if (!next && match && shuffling)
          { return previous; }
      // next is defined, but doesn't match the keypath
      else if (next && !match && shuffling)
          { return previous; }
      else
          { return next; }
  }
  function findAlias(name, fragment) {
      while (fragment) {
          var z = fragment.aliases;
          if (z && z[name]) {
              var aliases = (fragment.owner.iterations ? fragment.owner : fragment).owner.template.z;
              for (var i = 0; i < aliases.length; i++) {
                  if (aliases[i].n === name) {
                      var alias = aliases[i].x;
                      if (!alias.r)
                          { return false; }
                      var parts = alias.r.split('/');
                      return splitKeypath(parts[parts.length - 1]);
                  }
              }
              return;
          }
          fragment = fragment.componentParent || fragment.parent;
      }
  }

  var shuffleTasks = { early: [], mark: [] };
  var registerQueue = { early: [], mark: [] };
  var noVirtual = { virtual: false };
  // Options <<
  // TODO add correct types
  var ModelBase = /** @class */ (function () {
      function ModelBase(parent) {
          this.deps = [];
          this.children = [];
          this.childByKey = {};
          this.links = [];
          this.bindings = [];
          this.patterns = [];
          if (parent) {
              this.parent = parent;
              this.root = parent.root;
          }
      }
      ModelBase.prototype.retrieve = function () { };
      ModelBase.prototype.addShuffleTask = function (task, stage) {
          if (stage === void 0) { stage = 'early'; }
          shuffleTasks[stage].push(task);
      };
      ModelBase.prototype.addShuffleRegister = function (item, stage) {
          if (stage === void 0) { stage = 'early'; }
          registerQueue[stage].push({ model: this, item: item });
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ModelBase.prototype.downstreamChanged = function (_path, _depth) { };
      ModelBase.prototype.findMatches = function (keys) {
          var len = keys.length;
          var existingMatches = [this];
          var matches;
          var _loop_1 = function (i) {
              var key = keys[i];
              if (key === '*') {
                  matches = [];
                  existingMatches.forEach(function (model) {
                      matches.push.apply(matches, model.getValueChildren(model.get()));
                  });
              }
              else {
                  matches = existingMatches.map(function (model) { return model.joinKey(key); });
              }
              existingMatches = matches;
          };
          for (var i = 0; i < len; i += 1) {
              _loop_1(i);
          }
          return matches;
      };
      ModelBase.prototype.getKeypath = function (ractive) {
          if (ractive !== this.ractive && this._link)
              { return this._link.target.getKeypath(ractive); }
          if (!this.keypath) {
              var parent_1 = this.parent && this.parent.getKeypath(ractive);
              this.keypath = parent_1
                  ? this.parent.getKeypath(ractive) + "." + escapeKey(this.key)
                  : escapeKey(this.key);
          }
          return this.keypath;
      };
      ModelBase.prototype.getValueChildren = function (value) {
          var _this = this;
          var children;
          if (isArray(value)) {
              children = [];
              if ('length' in this && this.length !== value.length) {
                  children.push(this.joinKey('length'));
              }
              value.forEach(function (_m, i) {
                  children.push(_this.joinKey(i));
              });
          }
          else if (isObject(value) || isFunction(value)) {
              children = keys(value).map(function (key) { return _this.joinKey(escapeKey(key)); });
          }
          else if (value != null) {
              children = [];
          }
          var computed = this.computed;
          if (computed) {
              children.push.apply(children, keys(computed).map(function (k) { return _this.joinKey(k); }));
          }
          return children;
      };
      ModelBase.prototype.getVirtual = function (shouldCapture) {
          var value = this.get(shouldCapture, { virtual: false });
          if (isObjectLike(value)) {
              var result = isArray(value) ? [] : create(null);
              var keys$1 = keys(value);
              var i = keys$1.length;
              while (i--) {
                  var child = this.childByKey[keys$1[i]];
                  if (!child)
                      { result[keys$1[i]] = value[keys$1[i]]; }
                  else if (child._link)
                      { result[keys$1[i]] = child._link.getVirtual(); }
                  else
                      { result[keys$1[i]] = child.getVirtual(); }
              }
              i = this.children.length;
              while (i--) {
                  var child = this.children[i];
                  if (!(child.key in result) && child._link) {
                      result[child.key] = child._link.getVirtual();
                  }
              }
              if (this.computed) {
                  keys$1 = keys(this.computed);
                  i = keys$1.length;
                  while (i--) {
                      result[keys$1[i]] = this.computed[keys$1[i]].get();
                  }
              }
              return result;
          }
          return value;
      };
      ModelBase.prototype.has = function (key) {
          var _this = this;
          var _a;
          if (this._link)
              { return this._link.has(key); }
          var value = this.get(false, noVirtual);
          if (!value)
              { return false; }
          key = unescapeKey(key);
          if ((isFunction(value) || isObject(value)) && key in value)
              { return true; }
          var computed = this.computed;
          if (computed && key in this.computed)
              { return true; }
          computed = (_a = this.root.ractive) === null || _a === void 0 ? void 0 : _a.computed;
          if (computed) {
              keys(computed).forEach(function (k) {
                  if (computed[k].pattern && computed[k].pattern.test(_this.getKeypath()))
                      { return true; }
              });
          }
          return false;
      };
      ModelBase.prototype.joinAll = function (keys, opts) {
          var _a;
          // add any to avoid warning on below reassign. Maybe we can find a more clean solution?
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-this-alias
          var model = this;
          for (var i = 0; i < keys.length; i += 1) {
              if ((opts === null || opts === void 0 ? void 0 : opts.lastLink) === false && i + 1 === keys.length && ((_a = this.childByKey[keys[i]]) === null || _a === void 0 ? void 0 : _a._link)) {
                  return model.childByKey[keys[i]];
              }
              model = model.joinKey(keys[i], opts);
          }
          return model;
      };
      ModelBase.prototype.notifyUpstream = function (startPath) {
          var _this = this;
          var parent = this.parent;
          var path = startPath || [this.key];
          while (parent) {
              if (parent.patterns)
                  { parent.patterns.forEach(function (o) { return o.notify(path.slice()); }); }
              path.unshift(parent.key);
              parent.links.forEach(function (l) { return l.notifiedUpstream(path, _this.root); });
              parent.deps.forEach(function (d) { return d.handleChange(path); });
              parent.downstreamChanged(startPath);
              parent = parent.parent;
          }
      };
      ModelBase.prototype.rebind = function (next, previous, safe) {
          var _this = this;
          var _a;
          if (this._link) {
              this._link.rebind(next, previous, false);
          }
          if (next === this)
              { return; }
          // tell the deps to move to the new target
          var i = this.deps.length;
          while (i--) {
              var dep = this.deps[i];
              if ('rebind' in dep && typeof dep.rebind === 'function')
                  { dep.rebind(next, previous, safe); }
          }
          i = this.links.length;
          while (i--) {
              var link = this.links[i];
              // only relink the root of the link tree
              if ((_a = link.owner) === null || _a === void 0 ? void 0 : _a._link) {
                  link.relinking(next, safe);
              }
          }
          i = this.children.length;
          while (i--) {
              var child = this.children[i];
              child.rebind(next ? next.joinKey(child.key) : undefined, child._link || child, safe);
              if (this.dataModel) {
                  this.addShuffleTask(function () { return checkDataLink(_this, _this.retrieve()); }, 'early');
              }
          }
          i = this.bindings.length;
          while (i--) {
              this.bindings[i].rebind(next, previous, safe);
          }
      };
      ModelBase.prototype.reference = function () {
          var hasRefs = 'refs' in this;
          hasRefs ? this.refs++ : (this.refs = 1);
      };
      ModelBase.prototype.register = function (dep) {
          this.deps.push(dep);
      };
      ModelBase.prototype.registerLink = function (link) {
          addToArray(this.links, link);
      };
      ModelBase.prototype.registerPatternObserver = function (observer) {
          this.patterns.push(observer);
          this.register(observer);
      };
      ModelBase.prototype.registerTwowayBinding = function (binding) {
          this.bindings.push(binding);
      };
      ModelBase.prototype.unreference = function () {
          if ('refs' in this)
              { this.refs--; }
      };
      ModelBase.prototype.unregister = function (dep) {
          removeFromArray(this.deps, dep);
      };
      ModelBase.prototype.unregisterLink = function (link) {
          removeFromArray(this.links, link);
      };
      ModelBase.prototype.unregisterPatternObserver = function (observer) {
          removeFromArray(this.patterns, observer);
          this.unregister(observer);
      };
      ModelBase.prototype.unregisterTwowayBinding = function (binding) {
          removeFromArray(this.bindings, binding);
      };
      ModelBase.prototype.updateFromBindings = function (cascade) {
          var i = this.bindings.length;
          while (i--) {
              var value = this.bindings[i].getValue();
              if (value !== this.value)
                  { this.set(value); }
          }
          // check for one-way bindings if there are no two-ways
          if (!this.bindings.length) {
              var oneway = findBoundValue(this.deps);
              if (oneway && oneway.value !== this.value)
                  { this.set(oneway.value); }
          }
          if (cascade) {
              this.children.forEach(updateFromBindings);
              this.links.forEach(updateFromBindings);
              if (this._link)
                  { this._link.updateFromBindings(cascade); }
          }
      };
      ModelBase.prototype.link = function (model, keypath, options) {
          var lnk = this._link || new LinkModel(this.parent, this, model, this.key);
          lnk.implicit = options === null || options === void 0 ? void 0 : options.implicit;
          lnk.mapping = options === null || options === void 0 ? void 0 : options.mapping;
          lnk.sourcePath = keypath;
          lnk.rootLink = true;
          if (this._link)
              { this._link.relinking(model, false); }
          this.rebind(lnk, this, false);
          fireShuffleTasks();
          this._link = lnk;
          lnk.markedAll();
          this.notifyUpstream();
          return lnk;
      };
      ModelBase.prototype.unlink = function () {
          if (this._link) {
              var ln = this._link;
              this._link = undefined;
              ln.rebind(this, ln, false);
              fireShuffleTasks();
              ln.teardown();
              this.notifyUpstream();
          }
      };
      return ModelBase;
  }());
  // TODO: this may be better handled by overriding `get` on models with a parent that isRoot
  function maybeBind(model, value, shouldBind) {
      if (shouldBind && isFunction(value) && (model === null || model === void 0 ? void 0 : model.parent.isRoot)) {
          if (!model.boundValue) {
              model.boundValue = bind$1(value._r_unbound || value, model.parent.ractive);
          }
          return model.boundValue;
      }
      return value;
  }
  function updateFromBindings(model) {
      model.updateFromBindings(true);
  }
  // TSRChange - removed export
  function findBoundValue(list) {
      var i = list.length;
      while (i--) {
          var item = list[i];
          if (item.bound) {
              var owner = item.owner;
              if (owner) {
                  var ownerNode = owner.node;
                  var value = owner.name === 'checked' ? ownerNode.checked : ownerNode.value;
                  return { value: value };
              }
          }
      }
  }
  function fireShuffleTasks(stage) {
      if (!stage) {
          fireShuffleTasks('early');
          fireShuffleTasks('mark');
      }
      else {
          var tasks = shuffleTasks[stage];
          shuffleTasks[stage] = [];
          var i = tasks.length;
          while (i--)
              { tasks[i](); }
          var register = registerQueue[stage];
          registerQueue[stage] = [];
          i = register.length;
          while (i--)
              { register[i].model.register(register[i].item); }
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
              { model.childByKey[i].rebind(!~idx ? undefined : model.joinKey(idx), model.childByKey[i], !unsafe); }
      }
      var upstream = model.source().length !== model.source().value.length;
      model.links.forEach(function (l) { return l.shuffle(newIndices); });
      if (!link)
          { fireShuffleTasks('early'); }
      i = model.deps.length;
      while (i--) {
          // TSRChange - `model.deps[i].shuffle === 'function'` -> was `model.deps[i].shuffle`
          if (typeof model.deps[i].shuffle === 'function')
              { model.deps[i].shuffle(newIndices); }
      }
      model[link ? 'marked' : 'mark']();
      if (!link)
          { fireShuffleTasks('mark'); }
      if (upstream)
          { model.notifyUpstream(); }
      model.shuffling = false;
  }
  function checkDataLink(model, value) {
      if (value !== model.dataModel) {
          if (value && value.viewmodel && value.viewmodel.isRoot && model.childByKey.data) {
              model.childByKey.data.link(value.viewmodel, 'data');
              model.dataModel = value;
          }
          else if (model.dataModel) {
              model.childByKey.data.unlink();
              model.dataModel = true;
          }
      }
  }

  /**
   * temporary placeholder target for detached implicit links
   * so force it as Model to avoid type warning
   */
  var Missing = {
      parent: undefined,
      key: '@missing',
      animate: noop,
      applyValue: noop,
      get: noop,
      getKeypath: function () {
          return this.key;
      },
      joinAll: function () {
          return this;
      },
      joinKey: function () {
          return this;
      },
      mark: noop,
      registerLink: noop,
      shuffle: noop,
      set: noop,
      unregisterLink: noop
  };
  Missing.parent = Missing;
  var LinkModel = /** @class */ (function (_super) {
      __extends(LinkModel, _super);
      function LinkModel(parent, owner, target, key) {
          var _this = _super.call(this, parent) || this;
          _this.owner = owner;
          _this.target = target;
          _this.key = isUndefined(key) ? owner.key : key;
          if (owner && owner instanceof LinkModel)
              { _this.sourcePath = owner.sourcePath + "." + _this.key; }
          if (target)
              { target.registerLink(_this); }
          if (parent)
              { _this.isReadonly = parent.isReadonly; }
          _this.isLink = true;
          return _this;
      }
      LinkModel.prototype.animate = function (from, to, options, interpolator) {
          return this.target.animate(from, to, options, interpolator);
      };
      LinkModel.prototype.applyValue = function (value) {
          if (this.boundValue)
              { this.boundValue = null; }
          this.target.applyValue(value);
      };
      // TSRChange - it seems that this function is not used
      // attach(fragment): void {
      //   const model = resolveReference(fragment, this.key);
      //   if (model) {
      //     this.relinking(model, false);
      //   } else {
      //     // if there is no link available, move everything here to real models
      //     this.owner.unlink();
      //   }
      // }
      LinkModel.prototype.detach = function () {
          this.relinking(Missing, false);
      };
      LinkModel.prototype.get = function (shouldCapture, opts) {
          if (opts === void 0) { opts = {}; }
          if (shouldCapture) {
              capture(this);
              // may need to tell the target to unwrap
              opts.unwrap = 'unwrap' in opts ? opts.unwrap : true;
          }
          var bind = 'shouldBind' in opts ? opts.shouldBind : true;
          opts.shouldBind =
              this.mapping &&
                  this.target.parent &&
                  'isRoot' in this.target.parent &&
                  this.target.parent.isRoot;
          return maybeBind(this, this.target.get(false, opts), bind);
      };
      LinkModel.prototype.getKeypath = function (ractive) {
          if (ractive && ractive !== this.root.ractive)
              { return this.target.getKeypath(ractive); }
          return _super.prototype.getKeypath.call(this, ractive);
      };
      LinkModel.prototype.handleChange = function () {
          this.deps.forEach(handleChange);
          this.links.forEach(handleChange);
          this.notifyUpstream();
      };
      LinkModel.prototype.isDetached = function () {
          return this.virtual && this.target === Missing;
      };
      LinkModel.prototype.joinKey = function (key) {
          // TODO: handle nested links
          if (isUndefined(key) || key === '')
              { return this; }
          if (!hasOwn(this.childByKey, key)) {
              var child = new LinkModel(this, this, this.target.joinKey(key), key);
              this.children.push(child);
              this.childByKey[key] = child;
          }
          return this.childByKey[key];
      };
      LinkModel.prototype.mark = function (force) {
          this.target.mark(force);
      };
      LinkModel.prototype.marked = function () {
          if (this.boundValue)
              { this.boundValue = null; }
          this.links.forEach(marked);
          this.deps.forEach(handleChange);
      };
      LinkModel.prototype.markedAll = function () {
          this.children.forEach(markedAll);
          this.marked();
      };
      LinkModel.prototype.notifiedUpstream = function (startPath, root) {
          var _this = this;
          this.links.forEach(function (l) { return l.notifiedUpstream(startPath, _this.root); });
          this.deps.forEach(handleChange);
          if (startPath && this.rootLink && this.root !== root) {
              var path = startPath.slice(1);
              path.unshift(this.key);
              this.notifyUpstream(path);
          }
      };
      LinkModel.prototype.relinked = function () {
          this.target.registerLink(this);
          this.children.forEach(function (c) { return c.relinked(); });
      };
      LinkModel.prototype.relinking = function (target, safe) {
          var _this = this;
          if (this.rootLink && this.sourcePath)
              { target = rebindMatch(this.sourcePath, target, this.target); }
          if (!target || this.target === target)
              { return; }
          this.target && this.target.unregisterLink(this);
          this.target = target;
          this.children.forEach(function (c) {
              c.relinking(target.joinKey(c.key), safe);
          });
          if (!safe)
              { this.keypath = undefined; }
          if (this.rootLink)
              { this.addShuffleTask(function () {
                  _this.relinked();
                  if (!safe) {
                      _this.markedAll();
                      _this.notifyUpstream();
                  }
              }); }
      };
      LinkModel.prototype.set = function (value) {
          if (this.boundValue)
              { this.boundValue = null; }
          this.target.set(value);
      };
      LinkModel.prototype.shuffle = function (newIndices) {
          // watch for extra shuffles caused by a shuffle in a downstream link
          if (this.shuffling)
              { return; }
          // let the real model handle firing off shuffles
          if (!this.target.shuffling) {
              if (this.target.shuffle) {
                  this.target.shuffle(newIndices);
              }
              else {
                  // the target is a computation, which can't shuffle
                  this.target.mark();
              }
          }
          else {
              shuffle(this, newIndices, true);
          }
      };
      LinkModel.prototype.source = function () {
          if (this.target.source)
              { return this.target.source(); }
          else
              { return this.target; }
      };
      LinkModel.prototype.teardown = function () {
          if (this._link)
              { this._link.teardown(); }
          this.target.unregisterLink(this);
          this.children.forEach(teardown);
      };
      return LinkModel;
  }(ModelBase));

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
  var prefixers = {};
  function getPrefixer(rootKeypath) {
      var rootDot;
      if (!prefixers[rootKeypath]) {
          rootDot = rootKeypath ? rootKeypath + '.' : '';
          /* istanbul ignore next */
          prefixers[rootKeypath] = function (relativeKeypath, value) {
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
  var Model = /** @class */ (function (_super) {
      __extends(Model, _super);
      function Model(parent, key) {
          var _this = _super.call(this, parent) || this;
          _this.ticker = null;
          if (parent) {
              _this.key = unescapeKey(key);
              _this.isReadonly = parent.isReadonly;
              if (parent.value) {
                  _this.value = parent.value[_this.key];
                  if (isArray(_this.value))
                      { _this.length = _this.value.length; }
                  _this.adapt();
              }
          }
          return _this;
      }
      Model.prototype.adapt = function () {
          var adaptors = this.root.adaptors;
          var len = adaptors.length;
          this.rewrap = false;
          // Exit early if no adaptors
          if (len === 0)
              { return; }
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
              var shouldTeardown = this.wrapperValue === value
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
                      if (parentValue[this.key] !== value)
                          { parentValue[this.key] = value; }
                      this.value = value;
                  }
              }
              else {
                  delete this.newWrapperValue;
                  this.value = this.wrapper.get();
                  return;
              }
          }
          for (var i = 0; i < len; i += 1) {
              var adaptor = adaptors[i];
              if (adaptor.filter(value, keypath, ractive)) {
                  this.wrapper = adaptor.wrap(ractive, value, keypath, getPrefixer(keypath));
                  this.wrapperValue = value;
                  // TSRChange - comment since it's not used elsewhere
                  // this.wrapper.__model = this; // massive temporary hack to enable array adaptor
                  this.value = this.wrapper.get();
                  break;
              }
          }
      };
      Model.prototype.animate = function (_from, to, options, interpolator) {
          var _this = this;
          if (this.ticker)
              { this.ticker.stop(); }
          var fulfilPromise;
          var promise = new Promise(function (fulfil) { return (fulfilPromise = fulfil); });
          this.ticker = new Ticker({
              duration: options.duration,
              easing: options.easing,
              step: function (t) {
                  var value = interpolator(t);
                  _this.applyValue(value);
                  if (options.step)
                      { options.step(t, value); }
              },
              complete: function () {
                  _this.applyValue(to);
                  // TSRChange - remove paramter `to` (not used and not present in the doc)
                  if (options.complete)
                      { options.complete(); }
                  _this.ticker = null;
                  fulfilPromise(to);
              }
          });
          promise.stop = this.ticker.stop;
          return promise;
      };
      Model.prototype.applyValue = function (value, notify) {
          var _a;
          if (notify === void 0) { notify = true; }
          if (isEqual(value, this.value))
              { return; }
          if (this.boundValue)
              { this.boundValue = null; }
          if (this.parent.wrapper && this.parent.wrapper.set) {
              this.parent.wrapper.set(this.key, value);
              this.parent.value = this.parent.wrapper.get();
              this.value = this.parent.value[this.key];
              if (this.wrapper)
                  { this.newWrapperValue = this.value; }
              this.adapt();
          }
          else if (this.wrapper) {
              this.newWrapperValue = value;
              this.adapt();
          }
          else {
              var parentValue = this.parent.value || this.parent.createBranch(this.key);
              if (isObjectLike(parentValue)) {
                  parentValue[this.key] = value;
              }
              else {
                  warnIfDebug("Attempted to set a property of a non-object '" + this.getKeypath() + "'");
                  return;
              }
              this.value = value;
              this.adapt();
          }
          if (this.dataModel || ((_a = value === null || value === void 0 ? void 0 : value.viewmodel) === null || _a === void 0 ? void 0 : _a.isRoot)) {
              checkDataLink(this, value);
          }
          // keep track of array stuff
          if (isArray(value)) {
              this.length = value.length;
              this.isArray = true;
          }
          else {
              this.isArray = false;
          }
          // notify dependants
          this.links.forEach(handleChange);
          this.children.forEach(mark);
          this.deps.forEach(handleChange);
          if (notify)
              { this.notifyUpstream(); }
          if (this.parent.isArray) {
              if (this.key === 'length')
                  { this.parent.length = value; }
              else
                  { this.parent.joinKey('length').mark(); }
          }
      };
      Model.prototype.compute = function (key, computed) {
          var registry = this.computed || (this.computed = {});
          if (registry[key]) {
              registry[key].signature = getComputationSignature(this.root.ractive, key, computed);
              registry[key].mark();
          }
          else {
              registry[key] = new shared$1.Computation(this, getComputationSignature(this.root.ractive, key, computed), key);
          }
          return registry[key];
      };
      Model.prototype.createBranch = function (key) {
          var branch = isNumeric(key) ? [] : {};
          this.applyValue(branch, false);
          return branch;
      };
      Model.prototype.get = function (shouldCapture, opts) {
          if (this._link)
              { return this._link.get(shouldCapture, opts); }
          if (shouldCapture)
              { capture(this); }
          // if capturing, this value needs to be unwrapped because it's for external use
          if (opts && opts.virtual)
              { return this.getVirtual(false); }
          return maybeBind(this, (opts && 'unwrap' in opts ? opts.unwrap !== false : shouldCapture) && this.wrapper
              ? this.wrapperValue
              : this.value, !opts || opts.shouldBind !== false);
      };
      Model.prototype.joinKey = function (key, opts) {
          var _a;
          if (this._link) {
              if (opts && opts.lastLink !== false && (isUndefined(key) || key === ''))
                  { return this; }
              return this._link.joinKey(key);
          }
          if (isUndefined(key) || key === '')
              { return this; }
          var child;
          if (hasOwn(this.childByKey, key))
              { child = this.childByKey[key]; }
          else
              { child = this.computed && this.computed[key]; }
          if (!child) {
              var computed = void 0;
              if (this.isRoot && this.ractive && (computed = this.ractive.computed[key])) {
                  child = this.compute(key, computed);
              }
              else if (!this.isRoot && this.root.ractive) {
                  var registry = this.root.ractive.computed;
                  for (var k in registry) {
                      computed = registry[k];
                      if (computed.pattern && computed.pattern.test(this.getKeypath() + '.' + key)) {
                          child = this.compute(key, computed);
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
                  if ((_a = val === null || val === void 0 ? void 0 : val.viewmodel) === null || _a === void 0 ? void 0 : _a.isRoot) {
                      child.link(val.viewmodel, 'data');
                      this.dataModel = val;
                  }
              }
          }
          if (child._link && (!opts || opts.lastLink !== false))
              { return child._link; }
          return child;
      };
      Model.prototype.mark = function (force) {
          var _a;
          if (this._link)
              { return this._link.mark(force); }
          var old = this.value;
          var value = this.retrieve();
          if (this.dataModel || ((_a = value === null || value === void 0 ? void 0 : value.viewmodel) === null || _a === void 0 ? void 0 : _a.isRoot)) {
              checkDataLink(this, value);
          }
          if (force || !isEqual(value, old)) {
              this.value = value;
              if (this.boundValue)
                  { this.boundValue = null; }
              // make sure the wrapper stays in sync
              if (old !== value || this.rewrap) {
                  if (this.wrapper)
                      { this.newWrapperValue = value; }
                  this.adapt();
              }
              // keep track of array stuff
              if (isArray(value)) {
                  this.length = value.length;
                  this.isArray = true;
              }
              else {
                  this.isArray = false;
              }
              this.children.forEach(force ? markForce : mark);
              this.links.forEach(marked);
              this.deps.forEach(handleChange);
          }
      };
      Model.prototype.merge = function (array, comparator) {
          var newIndices = buildNewIndices(this.value === array ? recreateArray(this) : this.value, array, comparator);
          this.parent.value[this.key] = array;
          this.shuffle(newIndices, true);
      };
      Model.prototype.retrieve = function () {
          var _a;
          return (_a = this.parent.value) === null || _a === void 0 ? void 0 : _a[this.key];
      };
      Model.prototype.set = function (value) {
          if (this.ticker)
              { this.ticker.stop(); }
          this.applyValue(value);
      };
      Model.prototype.shuffle = function (newIndices, unsafe) {
          shuffle(this, newIndices, false, unsafe);
      };
      Model.prototype.source = function () {
          return this;
      };
      Model.prototype.teardown = function () {
          var _this = this;
          if (this._link) {
              this._link.teardown();
              this._link = null;
          }
          this.children.forEach(teardown);
          if (this.wrapper)
              { this.wrapper.teardown(); }
          if (this.computed)
              { keys(this.computed).forEach(function (k) { return _this.computed[k].teardown(); }); }
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

  var data = {};
  /**
   * ### Dependencies
   * - ExpressionProxy
   */
  var SharedModel = /** @class */ (function (_super) {
      __extends(SharedModel, _super);
      function SharedModel(value, name, ractive) {
          var _this = _super.call(this, null, "@" + name) || this;
          _this.key = "@" + name;
          _this.value = value;
          _this.isRoot = true;
          _this.root = _this;
          _this.adaptors = [];
          _this.ractive = ractive;
          return _this;
      }
      SharedModel.prototype.getKeypath = function () {
          return this.key;
      };
      SharedModel.prototype.retrieve = function () {
          return this.value;
      };
      return SharedModel;
  }(Model));
  var SharedModel$1 = new SharedModel(data, 'shared');
  var GlobalModel = new SharedModel(base, 'global');

  function findContext(fragment) {
      var frag = fragment;
      while (frag && !frag.context && !frag.aliases)
          { frag = frag.parent; }
      return frag;
  }
  function resolveReference(fragment, ref) {
      var initialFragment = fragment;
      // current context ref
      if (ref === '.') {
          return fragment.findContext();
      }
      // ancestor references
      if (ref[0] === '~')
          { return fragment.ractive.viewmodel.joinAll(splitKeypath(ref.slice(2))); }
      // scoped references
      if (ref[0] === '.' || ref[0] === '^') {
          var parts = ref.split('/');
          var explicitContext = parts[0] === '^^';
          // find nearest context node
          var frag = fragment;
          while (frag && !frag.context) {
              frag = up(frag);
          }
          var context_1 = frag === null || frag === void 0 ? void 0 : frag.context;
          // walk up the context chain
          while (frag && parts[0] === '^^') {
              parts.shift();
              // the current fragment should always be a context,
              // and if it happens to be an iteration, jump above the each block
              if ('isIteration' in frag && frag.isIteration) {
                  frag = frag.parent.parent;
              }
              else {
                  // otherwise jump above the current fragment
                  frag = up(frag);
              }
              // walk to the next contexted fragment
              while (frag && !frag.context) {
                  frag = up(frag);
              }
              context_1 = frag && frag.context;
          }
          if (!context_1 && explicitContext) {
              throw new Error("Invalid context parent reference ('" + ref + "'). There is not context at that level.");
          }
          // walk up the context path
          while (parts[0] === '.' || parts[0] === '..') {
              var part = parts.shift();
              if (part === '..') {
                  context_1 = context_1.parent;
              }
          }
          ref = parts.join('/');
          // special case - `{{.foo}}` means the same as `{{./foo}}`
          if (ref[0] === '.')
              { ref = ref.slice(1); }
          return context_1.joinAll(splitKeypath(ref));
      }
      var keys = splitKeypath(ref);
      if (!keys.length)
          { return; }
      var base = keys.shift();
      // special refs
      if (base[0] === '@') {
          // shorthand from outside the template
          // @this referring to local ractive instance
          if (base === '@this' || base === '@') {
              return fragment.ractive.viewmodel.getRactiveModel().joinAll(keys);
          }
          else if (base === '@index' || base === '@key') {
              // @index or @key referring to the nearest repeating index or key
              if (keys.length)
                  { badReference(base); }
              var repeater = findIter(fragment);
              return repeater && repeater["get" + (base[1] === 'i' ? 'Index' : 'Key')]();
          }
          else if (base === '@last') {
              var repeater = findIter(fragment);
              return repeater && repeater.parent.getLast();
          }
          else if (base === '@global') {
              // @global referring to window or global
              return GlobalModel.joinAll(keys);
          }
          else if (base === '@shared') {
              // @global referring to window or global
              return SharedModel$1.joinAll(keys);
          }
          else if (base === '@keypath' || base === '@rootpath') {
              // @keypath or @rootpath, the current keypath string
              var root = ref[1] === 'r' ? fragment.ractive.root : null;
              var f = fragment;
              while (f &&
                  (!f.context || (f.isRoot && f.ractive.component && (root || !f.ractive.isolated)))) {
                  f = f.isRoot ? f.componentParent : f.parent;
              }
              // TODO remove casting
              return f.getKeypath(!!root);
          }
          else if (base === '@context') {
              return new SharedModel(fragment.getContext(), 'context').joinAll(keys);
          }
          else if (base === '@local') {
              // @context-local data
              return fragment.getContext()._data.joinAll(keys);
          }
          else if (base === '@style') {
              // @style shared model
              // TODO fix _cssModel type error
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return fragment.ractive.constructor._cssModel.joinAll(keys);
          }
          else if (base === '@helpers') {
              // @helpers instance model
              return fragment.ractive.viewmodel.getHelpers().joinAll(keys);
          }
          else if (base === '@macro') {
              var handle = findMacro(fragment);
              if (handle)
                  { return new SharedModel(handle, 'macro').joinAll(keys); }
              else
                  { return; }
          }
          else {
              // nope
              throw new Error("Invalid special reference '" + base + "'");
          }
      }
      // helpers
      if (base && !keys.length) {
          var helpers = fragment.ractive.viewmodel.getHelpers();
          if (helpers.has(base))
              { return helpers.joinKey(base); }
      }
      var asd = findContext(fragment);
      var context;
      // TSRChange - use optional chain to simply if { if else } else
      // check immediate context for a match
      if (asd === null || asd === void 0 ? void 0 : asd.context) {
          context = asd.context;
      }
      else {
          // If there is no context or if is an alias block, get next full context for later
          context = fragment.findContext();
      }
      // walk up the fragment hierarchy looking for a matching ref, alias, or key in a context
      var createMapping = false;
      var shouldWarn = fragment.ractive.warnAboutAmbiguity;
      var crossed = 0;
      var model;
      while (fragment) {
          // repeated fragments
          // TSRChange - add in guard for type checking
          if ('isIteration' in fragment && fragment.isIteration) {
              if (base === fragment.parent.keyRef) {
                  model = fragment.getKey();
              }
              else if (base === fragment.parent.indexRef) {
                  model = fragment.getIndex();
              }
              if (model && keys.length)
                  { badReference(base); }
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
                      { warnIfDebug("'" + ref + "' resolved but is ambiguous and will create a mapping to a parent component."); }
              }
              else if (shouldWarn && crossed)
                  { warnIfDebug("'" + ref + "' resolved but is ambiguous."); }
          }
          if (model) {
              if (createMapping) {
                  model = initialFragment.ractive.viewmodel.createLink(base, model, base, { implicit: true });
              }
              if (keys.length > 0 && isFunction(model.joinAll)) {
                  model = model.joinAll(keys);
              }
              return model;
          }
          // don't consider alias blocks when checking for ambiguity
          if (fragment.context && !fragment.aliases)
              { crossed = 1; }
          var componentParent = 'componentParent' in fragment && fragment.componentParent;
          if (!fragment.ractive.isolated &&
              !(fragment.owner && fragment.owner.containerFragment) &&
              (fragment.componentParent || (!fragment.parent && fragment.ractive.component))) {
              // ascend through component boundary
              fragment = componentParent || fragment.ractive.component.up;
              createMapping = true;
          }
          else {
              fragment = fragment.parent;
          }
      }
      // if enabled, check the instance for a match
      var instance = initialFragment.ractive;
      if (instance.resolveInstanceMembers && base !== 'data' && base in instance) {
          return instance.viewmodel.getRactiveModel().joinKey(base).joinAll(keys);
      }
      if (shouldWarn) {
          warnIfDebug("'" + ref + "' is ambiguous and did not resolve.");
      }
      // didn't find anything, so go ahead and create the key on the local model
      return context.joinKey(base).joinAll(keys);
  }
  function up(fragment) {
      return (fragment &&
          ((!fragment.ractive.isolated &&
              !(fragment.owner && fragment.owner.containerFragment) &&
              (fragment.componentParent || (!fragment.parent && fragment.ractive.component))) ||
              fragment.parent));
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
          if (fragment.owner.handle) {
              return fragment.owner.handle;
          }
          fragment = up(fragment);
      }
  }
  function badReference(key) {
      throw new Error("An index or key reference (" + key + ") cannot have child properties");
  }

  var keep = false;
  function set(pairs, options) {
      var k = keep;
      var deep = options && options.deep;
      var shuffle = options && options.shuffle;
      var promise = runloop.start();
      if (options && 'keep' in options)
          { keep = options.keep; }
      var i = pairs.length;
      while (i--) {
          var _a = pairs[i], model = _a[0], value = _a[1], keypath = _a[2];
          if (!model) {
              runloop.end();
              throw new Error("Failed to set invalid keypath '" + keypath + "'");
          }
          if (deep)
              { deepSet(model, value); }
          else if (shuffle) {
              var array = value;
              var target = model.get();
              // shuffle target array with itself
              if (!array)
                  { array = target; }
              // if there's not an array there yet, go ahead and set
              if (isUndefined(target)) {
                  model.set(array);
              }
              else {
                  if (!isArray(target) || !isArray(array)) {
                      runloop.end();
                      throw new Error('You cannot merge an array with a non-array');
                  }
                  var comparator = getComparator(shuffle);
                  model.merge(array, comparator);
              }
          }
          else
              { model.set(value); }
      }
      runloop.end();
      keep = k;
      if (pairs.length === 1) {
          return promise.then(function () { return pairs[0][1]; });
      }
      return promise;
  }
  var star = /\*/;
  /**
   * @param base SharedModel | CSSModel | RootModel
   */
  function gather(ractive, keypath, base, isolated) {
      if (!base && (keypath[0] === '.' || keypath[1] === '^')) {
          warnIfDebug("Attempted to set a relative keypath from a non-relative context. You can use a context object to set relative keypaths.");
          return [];
      }
      var keys = splitKeypath(keypath);
      var model = base || ractive.viewmodel;
      if (star.test(keypath)) {
          return model.findMatches(keys);
      }
      else {
          if (model === ractive.viewmodel) {
              // allow implicit mappings
              if (ractive.component &&
                  !ractive.isolated &&
                  !model.has(keys[0]) &&
                  keypath[0] !== '@' &&
                  keypath[0] &&
                  !isolated) {
                  return [resolveReference(ractive.fragment || new FakeFragment(ractive), keypath)];
              }
              else {
                  return [model.joinAll(keys)];
              }
          }
          else {
              return [model.joinAll(keys)];
          }
      }
  }
  function build(ractive, keypath, value, isolated) {
      var sets = [];
      // set multiple keypaths in one go
      if (isObject(keypath)) {
          var _loop_1 = function (k) {
              if (hasOwn(keypath, k)) {
                  sets.push.apply(sets, gather(ractive, k, null, isolated).map(function (m) { return [m, keypath[k], k]; }));
              }
          };
          for (var k in keypath) {
              _loop_1(k);
          }
      }
      else {
          // set a single keypath
          sets.push.apply(sets, gather(ractive, keypath, null, isolated).map(function (m) { return [m, value, keypath]; }));
      }
      return sets;
  }
  var deepOpts = { virtual: false };
  function deepSet(model, value) {
      var dest = model.get(false, deepOpts);
      // if dest doesn't exist, just set it
      if (dest == null || !isObjectType(value))
          { return model.set(value); }
      if (!isObjectType(dest))
          { return model.set(value); }
      for (var k in value) {
          if (hasOwn(value, k)) {
              deepSet(model.joinKey(k), value[k]);
          }
      }
  }
  var comparators = {};
  // TODO define a decent return type
  function getComparator(option) {
      if (option === true)
          { return null; } // use existing arrays
      if (isFunction(option))
          { return option; }
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
      var sets = build(ractive, keypath, d, options === null || options === void 0 ? void 0 : options.isolated);
      return set(sets.map(function (pair) {
          var model = pair[0], add = pair[1];
          var value = model.get();
          if (!isNumeric(add) || !isNumeric(value))
              { throw new Error(errorMessage); }
          return [model, value + add];
      }));
  }

  function Ractive$add(keypath, d, options) {
      var num = isNumber(d) ? d : 1;
      var opts = isObjectType(d) ? d : options;
      return add(this, keypath, num, opts);
  }

  // Error messages that are used (or could be) in multiple places
  var badArguments = 'Bad arguments';
  var noRegistryFunctionReturn = 'A function was specified for "%s" %s, but no %s was returned';
  var missingPlugin = function (name, type) {
      return "Missing \"" + name + "\" " + type + " plugin. You may need to download a plugin via http://ractive.js.org/integrations/#" + type + "s";
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var interpolators = {
      number: function (from, to) {
          if (!isNumeric(from) || !isNumeric(to)) {
              return null;
          }
          from = +from;
          to = +to;
          var delta = to - from;
          if (!delta) {
              return function () {
                  return from;
              };
          }
          return function (t) {
              return from + t * delta;
          };
      },
      array: function (from, to) {
          if (!isArray(from) || !isArray(to)) {
              return null;
          }
          var len, i;
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
          return function (t) {
              var i = len;
              while (i--) {
                  intermediate[i] = interpolators[i](t);
              }
              return intermediate;
          };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      object: function (from, to) {
          if (!isObject(from) || !isObject(to)) {
              return null;
          }
          var properties = [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          var intermediate = {};
          var interpolators = {};
          var _loop_1 = function (prop) {
              if (hasOwn(from, prop)) {
                  if (hasOwn(to, prop)) {
                      properties.push(prop);
                      interpolators[prop] = interpolate(from[prop], to[prop]) || (function () { return to[prop]; });
                  }
                  else {
                      intermediate[prop] = from[prop];
                  }
              }
          };
          for (var prop in from) {
              _loop_1(prop);
          }
          for (var prop in to) {
              if (hasOwn(to, prop) && !hasOwn(from, prop)) {
                  intermediate[prop] = to[prop];
              }
          }
          var len = properties.length;
          return function (t) {
              var i = len;
              while (i--) {
                  var prop = properties[i];
                  intermediate[prop] = interpolators[prop](t);
              }
              return intermediate;
          };
      }
  };

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
      if (from === to)
          { return null; }
      if (type) {
          var interpol = findInViewHierarchy('interpolators', ractive, type);
          if (interpol)
              { return interpol(from, to) || null; }
          fatal(missingPlugin(type, 'interpolator'));
      }
      return (interpolators.number(from, to) ||
          interpolators.array(from, to) ||
          interpolators.object(from, to) ||
          null);
  }

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
  var Easings = {
      linear: function (pos) {
          return pos;
      },
      easeIn: function (pos) {
          /* istanbul ignore next */
          return Math.pow(pos, 3);
      },
      easeOut: function (pos) {
          return Math.pow(pos - 1, 3) + 1;
      },
      easeInOut: function (pos) {
          /* istanbul ignore next */
          if ((pos /= 0.5) < 1) {
              return 0.5 * Math.pow(pos, 3);
          }
          /* istanbul ignore next */
          return 0.5 * (Math.pow(pos - 2, 3) + 2);
      }
  };

  var linear = Easings.linear;
  function immediate(value) {
      var result = Promise.resolve(value);
      defineProperty(result, 'stop', { value: noop });
      // In these scenario the promise doesn't respect types of animate promise so force casting
      // we can consider to change promise return type in animate promise in the future
      return result;
  }
  function getOptions(options, instance) {
      options = options || {};
      var easing;
      if (options.easing) {
          easing = isFunction(options.easing) ? options.easing : instance.easing[options.easing];
      }
      return {
          easing: easing || linear,
          duration: 'duration' in options ? options.duration : 400,
          complete: options.complete || noop,
          step: options.step || noop,
          interpolator: options.interpolator
      };
  }
  function animate(ractive, model, to, _options) {
      var options = getOptions(_options, ractive);
      var from = model.get();
      // don't bother animating values that stay the same
      if (isEqual(from, to)) {
          // TSRChange - remove options.to from complete param since do not exists
          options.complete();
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
          var keys$1 = keys(keypath);
          throw new Error("ractive.animate(...) no longer supports objects. Instead of ractive.animate({\n  " + keys$1.map(function (key) { return "'" + key + "': " + keypath[key]; }).join('\n  ') + "\n}, {...}), do\n\n" + keys$1.map(function (key) { return "ractive.animate('" + key + "', " + keypath[key] + ", {...});"; }).join('\n') + "\n");
      }
      return animate(this, this.viewmodel.joinAll(splitKeypath(keypath)), to, options);
  }

  function findAnchors(fragment, name) {
      if (name === void 0) { name = null; }
      var res = [];
      findAnchorsIn(fragment, name, res, fragment.ractive);
      return res;
  }
  function findAnchorsIn(item, name, result, instance) {
      if (item.isAnchor) {
          if (!name || item.name === name) {
              result.push(item);
          }
      }
      else if (item.items) {
          item.items.forEach(function (i) { return findAnchorsIn(i, name, result, instance); });
      }
      else if (item.iterations) {
          item.iterations.forEach(function (i) { return findAnchorsIn(i, name, result, instance); });
      }
      else if (item.fragment && (!item.component || item.fragment.ractive === instance)) {
          findAnchorsIn(item.fragment, name, result, instance);
      }
      else if (item.instance && item.instance.fragment) {
          var anchors = [];
          findAnchorsIn(item.instance.fragment, name, anchors, instance);
          anchors.forEach(function (a) { return a.ractive === instance && result.push(a); });
      }
  }
  function updateAnchors(instance, name) {
      if (name === void 0) { name = null; }
      var anchors = findAnchors(instance.fragment, name);
      var idxs = {};
      var children = instance._children.byName;
      anchors.forEach(function (a) {
          var name = a.name;
          if (!(name in idxs))
              { idxs[name] = 0; }
          var idx = idxs[name];
          var child = (children[name] || [])[idx];
          if (child && child.lastBound !== a) {
              if (child.lastBound)
                  { child.lastBound.removeChild(child); }
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

  function Ractive$attachChild(child, options) {
      if (options === void 0) { options = {}; }
      var children = this._children;
      var idx;
      if (child.parent && child.parent !== this)
          { throw new Error("Instance " + child._guid + " is already attached to a different instance " + child.parent._guid + ". Please detach it from the other instance using detachChild first."); }
      else if (child.parent)
          { throw new Error("Instance " + child._guid + " is already attached to this instance."); }
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
      }
      else {
          var list = children.byName[meta.target];
          if (!list) {
              list = [];
              this.set("@this.children.byName." + meta.target, list);
          }
          idx = options.prepend ? 0 : options.insertAt !== undefined ? options.insertAt : list.length;
      }
      child.parent = this;
      child.root = this.root;
      child.component = meta;
      children.push(meta);
      var promise = runloop.start();
      var rm = child.viewmodel.getRactiveModel();
      rm.joinKey('parent').link(this.viewmodel.getRactiveModel());
      rm.joinKey('root').link(this.root.viewmodel.getRactiveModel());
      hooks.attachchild.fire(child);
      if (meta.target) {
          unrenderChild(meta);
          this.splice("@this.children.byName." + meta.target, idx, 0, meta);
          updateAnchors(this, meta.target);
      }
      else {
          if (!child.isolated)
              { child.viewmodel.attached(this.fragment); }
      }
      runloop.end();
      promise.ractive = child;
      return promise.then(function () { return child; });
  }
  function bubble() {
      runloop.addFragment(this.instance.fragment);
  }
  function findNextNode() {
      if (this.anchor)
          { return this.anchor.findNextNode(); }
  }

  function compute(path, computed) {
      var _computed;
      if (isString(computed) || isFunction(computed)) {
          _computed = { get: computed };
      }
      else {
          _computed = computed;
      }
      // This is a hack to avoid type error since these registry should store computation model
      this.computed[path] = _computed;
      var keys = splitKeypath(path);
      if (!~path.indexOf('*')) {
          var last = keys.pop();
          return this.viewmodel.joinAll(keys).compute(last, _computed);
      }
      else {
          _computed.pattern = new RegExp('^' +
              keys
                  .map(function (k) { return k.replace(/\*\*/g, '(.+)').replace(/\*/g, '((?:\\\\.|[^\\.])+)'); })
                  .join('\\.') +
              '$');
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
              if (first.parent)
                  { delete first.parent.childByKey[first.key]; }
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

  function Ractive$detachChild(child) {
      var children = this._children;
      // TODO define meta type
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
          { throw new Error("Instance " + child._guid + " is not attached to this instance."); }
      var promise = runloop.start();
      if (meta.anchor)
          { meta.anchor.removeChild(meta); }
      if (!child.isolated)
          { child.viewmodel.detached(); }
      children.splice(index, 1);
      if (meta.target) {
          this.splice("@this.children.byName." + meta.target, children.byName[meta.target].indexOf(meta), 1);
          updateAnchors(this, meta.target);
      }
      var rm = child.viewmodel.getRactiveModel();
      rm.joinKey('parent').unlink();
      rm.joinKey('root').link(rm);
      child.root = child;
      child.parent = null;
      child.component = null;
      hooks.detachchild.fire(child);
      runloop.end();
      promise.ractive = child;
      return promise.then(function () { return child; });
  }

  // TODO add this as Ractive
  function Ractive$find(selector, options) {
      if (options === void 0) { options = {}; }
      if (!this.rendered)
          { throw new Error("Cannot call ractive.find('" + selector + "') unless instance is rendered to the DOM"); }
      var node = this.fragment.find(selector, options);
      if (node)
          { return node; }
      if (options.remote) {
          for (var i = 0; i < this._children.length; i++) {
              if (!this._children[i].instance.fragment.rendered)
                  { continue; }
              node = this._children[i].instance.find(selector, options);
              if (node)
                  { return node; }
          }
      }
  }

  function Ractive$findAll(selector, options) {
      if (options === void 0) { options = {}; }
      if (!this.rendered)
          { throw new Error("Cannot call ractive.findAll('" + selector + "', ...) unless instance is rendered to the DOM"); }
      if (!isArray(options.result))
          { options.result = []; }
      this.fragment.findAll(selector, options);
      if (options.remote) {
          // search non-fragment children
          this._children.forEach(function (c) {
              var _a;
              if (!c.target && ((_a = c.instance.fragment) === null || _a === void 0 ? void 0 : _a.rendered)) {
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
      if (!isArray(options.result))
          { options.result = []; }
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

  function Ractive$findComponent(name, options) {
      if (options === void 0) { options = {}; }
      if (isObjectType(name)) {
          options = name;
          name = '';
      }
      var child = this.fragment.findComponent(name, options);
      if (child)
          { return child; }
      if (options.remote) {
          if (!name && this._children.length)
              { return this._children[0].instance; }
          for (var i = 0; i < this._children.length; i++) {
              // skip children that are or should be in an anchor
              if (this._children[i].target)
                  { continue; }
              if (this._children[i].name === name)
                  { return this._children[i].instance; }
              child = this._children[i].instance.findComponent(name, options);
              if (child)
                  { return child; }
          }
      }
  }

  function Ractive$findContainer(selector) {
      if (this.container) {
          if (this.container.component && this.container.component.name === selector) {
              return this.container;
          }
          else {
              return this.container.findContainer(selector);
          }
      }
      return null;
  }

  function Ractive$findParent(selector) {
      if (this.parent) {
          if (this.parent.component && this.parent.component.name === selector) {
              return this.parent;
          }
          else {
              return this.parent.findParent(selector);
          }
      }
      return null;
  }

  function findElement(start, orComponent, name) {
      if (orComponent === void 0) { orComponent = true; }
      // TODO: maybe we can use better type here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var result = start;
      while (result &&
          (result.type !== TemplateItemType$1.ELEMENT || (name && result.name !== name)) &&
          (!orComponent ||
              (result.type !== TemplateItemType$1.COMPONENT && result.type !== TemplateItemType$1.ANCHOR))) {
          // start is a fragment - look at the owner
          if (result.owner)
              { result = result.owner; }
          else if (result.component || result.yield)
              // start is a component or yielder - look at the container
              { result = result.containerFragment || result.component.up; }
          else if (result.parent)
              // start is an item - look at the parent
              { result = result.parent; }
          else if (result.up)
              // start is an item without a parent - look at the parent fragment
              { result = result.up; }
          else
              { result = undefined; }
      }
      return result;
  }

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
      }
      else {
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
              if (isUndefined(args[0]))
                  { args[0] = 0; }
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
      var path = function (keypath) {
          var arguments$1 = arguments;

          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments$1[_i];
          }
          return model(this.viewmodel.joinAll(splitKeypath(keypath)), args);
      };
      var model = function (mdl, args) {
          var array = mdl.get();
          if (!isArray(array)) {
              if (isUndefined(array)) {
                  array = [];
                  var result_1 = arrayProto[methodName].apply(array, args);
                  var promise_1 = runloop.start().then(function () { return result_1; });
                  mdl.set(array);
                  runloop.end();
                  return promise_1;
              }
              else {
                  throw new Error("shuffle array method " + methodName + " called on non-array at " + mdl.getKeypath());
              }
          }
          var newIndices = getNewIndices(array.length, methodName, args);
          var result = arrayProto[methodName].apply(array, args);
          var promise = runloop.start().then(function () { return result; });
          promise.result = result;
          if (newIndices) {
              if (mdl.shuffle) {
                  mdl.shuffle(newIndices);
              }
              else {
                  // it's a computation, which don't have a shuffle, so just invalidate
                  mdl.mark();
              }
          }
          else {
              mdl.set(result);
          }
          runloop.end();
          return promise;
      };
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
      }
      else {
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
  var localFragment = {};
  var ContextData = /** @class */ (function (_super) {
      __extends(ContextData, _super);
      function ContextData(options) {
          var _this = _super.call(this, null, null) || this;
          _this.isRoot = true;
          _this.root = _this;
          _this.value = {};
          _this.ractive = options.ractive;
          _this.adaptors = [];
          _this.context = options.context;
          return _this;
      }
      ContextData.prototype.getKeypath = function () {
          return '@context.data';
      };
      ContextData.prototype.rebound = function () { };
      return ContextData;
  }(Model));
  // TODO check that params between this class and `ContextHelper` are the same
  var Context = /** @class */ (function () {
      function Context(fragment, element) {
          this.fragment = fragment;
          this.element = element || findElement(fragment);
          this.node = this.element && this.element.node;
          this.ractive = fragment.ractive;
          this.root = this;
      }
      Object.defineProperty(Context.prototype, "decorators", {
          get: function () {
              var items = {};
              if (!this.element)
                  { return items; }
              this.element.decorators.forEach(function (d) { return (items[d.name] = d.handle); });
              return items;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(Context.prototype, "_data", {
          get: function () {
              return (this.model ||
                  (this.root.model = new ContextData({
                      ractive: this.ractive,
                      context: this.root
                  })));
          },
          enumerable: false,
          configurable: true
      });
      // the usual mutation suspects
      Context.prototype.add = function (keypath, d, options) {
          var num = isNumber(d) ? +d : 1;
          var opts = isObjectType(d) ? d : options;
          return set(build$1(this, keypath, num).map(function (pair) {
              var model = pair[0], val = pair[1];
              var value = model.get();
              if (!isNumeric(val) || !isNumeric(value))
                  { throw new Error('Cannot add non-numeric value'); }
              return [model, value + val];
          }), opts);
      };
      Context.prototype.animate = function (keypath, value, options) {
          var model = findModel(this, keypath).model;
          return animate(this.ractive, model, value, options);
      };
      Context.prototype.find = function (selector, opts) {
          return this.fragment.find(selector, opts);
      };
      Context.prototype.findAll = function (selector, opts) {
          var result = [];
          opts = opts || {};
          opts.result = result;
          this.fragment.findAll(selector, opts);
          return result;
      };
      Context.prototype.findAllComponents = function (selector, opts) {
          var result = [];
          opts = opts || {};
          opts.result = result;
          this.fragment.findAllComponents(selector, opts);
          return result;
      };
      Context.prototype.findComponent = function (selector, opts) {
          return this.fragment.findComponent(selector, opts);
      };
      // get relative keypaths and values
      Context.prototype.get = function (keypath) {
          if (!keypath)
              { return this.fragment.findContext().get(true); }
          var model = findModel(this, keypath).model;
          return model ? model.get(true) : undefined;
      };
      Context.prototype.getParent = function (component) {
          var fragment = this.fragment;
          if (!fragment.parent && component)
              { fragment = fragment.componentParent; }
          else {
              if (fragment.context)
                  { fragment = findParentWithContext(fragment.parent); }
              else {
                  fragment = findParentWithContext(fragment.parent);
                  if (fragment) {
                      if (!fragment.parent && component)
                          { fragment = fragment.componentParent; }
                      else
                          { fragment = findParentWithContext(fragment.parent); }
                  }
              }
          }
          if (!fragment || fragment === this.fragment)
              { return; }
          return fragment.getContext();
      };
      Context.prototype.hasListener = function (name, bubble) {
          // if the owner is a component, start there because the nearest element
          // may exist outside of the immediate context (yield)
          var el = this.fragment.owner.component
              ? this.fragment.owner
              : this.element || this.fragment.owner;
          var base;
          do {
              base = el.component || el;
              if (base.template.t === TemplateItemType$1.ELEMENT) {
                  if (findEvent(base, name))
                      { return true; }
              }
              el = el.up && el.up.owner;
              if (el && el.component)
                  { el = el.component; }
          } while (el && bubble);
      };
      Context.prototype.link = function (source, dest) {
          var there = findModel(this, source).model;
          var here = findModel(this, dest).model;
          var promise = runloop.start();
          here.link(there, source);
          runloop.end();
          return promise;
      };
      Context.prototype.listen = function (event, handler) {
          var el = this.element;
          el.on(event, handler);
          return {
              cancel: function () {
                  el.off(event, handler);
              }
          };
      };
      /** @see Ractive$observe for implementation */
      // eslint-disable-next-line
      Context.prototype.observe = function (keypath, callback, options) {
          if (options === void 0) { options = {}; }
          if (isObject(keypath))
              { options = callback || {}; }
          options.fragment = this.fragment;
          return this.ractive.observe(keypath, callback, options);
      };
      /** @see Ractive$observe for implementation */
      // eslint-disable-next-line
      Context.prototype.observeOnce = function (keypath, callback, options) {
          if (options === void 0) { options = {}; }
          if (isObject(keypath))
              { options = callback || {}; }
          options.fragment = this.fragment;
          return this.ractive.observeOnce(keypath, callback, options);
      };
      Context.prototype.pop = function (keypath) {
          return modelPop(findModel(this, keypath).model, []);
      };
      Context.prototype.push = function (keypath) {
          var arguments$1 = arguments;

          var values = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              values[_i - 1] = arguments$1[_i];
          }
          return modelPush(findModel(this, keypath).model, values);
      };
      Context.prototype.raise = function (name, event) {
          var arguments$1 = arguments;

          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
              args[_i - 2] = arguments$1[_i];
          }
          var el = this.element;
          var ev;
          while (el) {
              if (el.component)
                  { el = el.component; }
              ev = findEvent(el, name);
              if (ev) {
                  return ev.fire(ev.element.getContext(event || {}, event && !('original' in event) ? { original: {} } : {}), args);
              }
              el = el.up && el.up.owner;
          }
      };
      Context.prototype.readLink = function (keypath, options) {
          return this.ractive.readLink(this.resolve(keypath), options);
      };
      Context.prototype.resolve = function (path, ractive) {
          var _a = findModel(this, path), model = _a.model, instance = _a.instance;
          return model ? model.getKeypath(ractive || instance) : path;
      };
      Context.prototype.reverse = function (keypath) {
          return modelReverse(findModel(this, keypath).model, []);
      };
      Context.prototype.set = function (keypath, value, options) {
          return set(build$1(this, keypath, value), options);
      };
      Context.prototype.shift = function (keypath) {
          return modelShift(findModel(this, keypath).model, []);
      };
      Context.prototype.splice = function (keypath, index, drop) {
          var arguments$1 = arguments;

          var add = [];
          for (var _i = 3; _i < arguments.length; _i++) {
              add[_i - 3] = arguments$1[_i];
          }
          add.unshift(index, drop);
          return modelSplice(findModel(this, keypath).model, add);
      };
      Context.prototype.sort = function (keypath) {
          return modelSort(findModel(this, keypath).model, []);
      };
      Context.prototype.subtract = function (keypath, d, options) {
          var num = isNumber(d) ? d : 1;
          var opts = isObjectType(d) ? d : options;
          return set(build$1(this, keypath, num).map(function (pair) {
              var model = pair[0], val = pair[1];
              var value = model.get();
              if (!isNumeric(val) || !isNumeric(value))
                  { throw new Error('Cannot add non-numeric value'); }
              return [model, value - val];
          }), opts);
      };
      Context.prototype.toggle = function (keypath) {
          var model = findModel(this, keypath).model;
          return set([[model, !model.get()]]);
      };
      Context.prototype.unlink = function (dest) {
          var _a;
          var here = findModel(this, dest).model;
          var promise = runloop.start();
          // TSRChange - change guard with instanceof
          if (here instanceof LinkModel && ((_a = here.owner) === null || _a === void 0 ? void 0 : _a._link))
              { here.owner.unlink(); }
          runloop.end();
          return promise;
      };
      Context.prototype.unlisten = function (event, handler) {
          this.element.off(event, handler);
      };
      Context.prototype.unshift = function (keypath) {
          var arguments$1 = arguments;

          var add = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              add[_i - 1] = arguments$1[_i];
          }
          return modelUnshift(findModel(this, keypath).model, add);
      };
      Context.prototype.update = function (keypath, options) {
          return update$1(this.ractive, findModel(this, keypath).model, options);
      };
      Context.prototype.updateModel = function (keypath, cascade) {
          var model = findModel(this, keypath).model;
          var promise = runloop.start();
          model.updateFromBindings(cascade);
          runloop.end();
          return promise;
      };
      // two-way binding related helpers
      Context.prototype.isBound = function () {
          var model = this.getBindingModel(this).model;
          return !!model;
      };
      Context.prototype.getBindingPath = function (ractive) {
          var _a = this.getBindingModel(this), model = _a.model, instance = _a.instance;
          if (model)
              { return model.getKeypath(ractive || instance); }
      };
      Context.prototype.getBinding = function () {
          var model = this.getBindingModel(this).model;
          if (model)
              { return model.get(true); }
      };
      Context.prototype.getBindingModel = function (ctx) {
          var _a;
          var el = ctx.element;
          return { model: (_a = el.binding) === null || _a === void 0 ? void 0 : _a.model, instance: el.up.ractive };
      };
      Context.prototype.setBinding = function (value) {
          var model = this.getBindingModel(this).model;
          return set([[model, value]]);
      };
      return Context;
  }());
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
      }
      else {
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
      var _a;
      return ((_a = el === null || el === void 0 ? void 0 : el.events) === null || _a === void 0 ? void 0 : _a.find) && el.events.find(function (e) { return ~e.template.n.indexOf(name); });
  }

  function Ractive$fire(eventName) {
      var arguments$1 = arguments;

      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments$1[_i];
      }
      var ctx;
      // watch for reproxy
      if (args[0] instanceof Context) {
          var proto = args.shift();
          ctx = create(proto);
          assign(ctx, proto);
      }
      else if (isObjectType(args[0]) && (args[0] === null || args[0].constructor === Object)) {
          ctx = Context.forRactive(this, args.shift());
      }
      else {
          ctx = Context.forRactive(this);
      }
      return fireEvent(this, eventName, ctx, args);
  }

  function Ractive$get(keypath, opts) {
      if (!isString(keypath))
          { return this.viewmodel.get(true, keypath); }
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

  var query = doc === null || doc === void 0 ? void 0 : doc.querySelector;
  function getContext$1(startNode) {
      if (isString(startNode) && query) {
          startNode = query.call(document, startNode);
      }
      var node = startNode;
      var instances;
      if (node) {
          if (node._ractive) {
              return node._ractive.proxy.getContext();
          }
          else if ((instances = node.__ractive_instances__)) {
              if (instances.length === 1) {
                  return getRactiveContext(instances[0]);
              }
          }
          else {
              return getContext$1(node.parentNode);
          }
      }
  }

  function Ractive$getContext(node) {
      if (!node)
          { return getRactiveContext(this); }
      if (isString(node)) {
          node = this.find(node);
      }
      return getContext$1(node);
  }

  function Ractive$getLocalContext() {
      if (localFragment.f)
          { return localFragment.f.getContext(); }
  }

  var Namespace;
  (function (Namespace) {
      Namespace["html"] = "http://www.w3.org/1999/xhtml";
      Namespace["mathml"] = "http://www.w3.org/1998/Math/MathML";
      Namespace["svg"] = "http://www.w3.org/2000/svg";
      Namespace["xlink"] = "http://www.w3.org/1999/xlink";
      Namespace["xml"] = "http://www.w3.org/XML/1998/namespace";
      Namespace["xmlns"] = "http://www.w3.org/2000/xmlns";
  })(Namespace || (Namespace = {}));
  var Namespace$1 = Namespace;

  var createElement, matches;
  var customStr = isClient && 'registerElement' in doc;
  function wrap(is) {
      return customStr ? is : { is: is };
  }
  // Test for SVG support
  if (!svg) {
      /* istanbul ignore next */
      createElement = function (type, namespace, is) {
          if (namespace && namespace !== Namespace$1.html) {
              throw "This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://ractive.js.org/support/#svgs for more information";
          }
          return is ? doc.createElement(type, wrap(is)) : doc.createElement(type);
      };
  }
  else {
      createElement = function (type, namespace, is) {
          if (!namespace || namespace === Namespace$1.html) {
              return is
                  ? doc.createElement(type, wrap(is))
                  : doc.createElement(type);
          }
          return is
              ? doc.createElementNS(namespace, type, wrap(is))
              : doc.createElementNS(namespace, type);
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
      if (input instanceof Element && input.nodeType) {
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
              }
              catch (e) {
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
  }
  else {
      var div = createElement('div');
      var methodNames = ['matches', 'matchesSelector'];
      var makeFunction = function (methodName) {
          return function (node, selector) {
              return node[methodName](selector);
          };
      };
      var i$2 = methodNames.length;
      var unprefixed = void 0;
      while (i$2-- && !matches) {
          unprefixed = methodNames[i$2];
          if (div[unprefixed]) {
              matches = makeFunction(unprefixed);
          }
          else {
              var j = vendors.length;
              while (j--) {
                  var prefixed = vendors[i$2] + unprefixed.substr(0, 1).toUpperCase() + unprefixed.substring(1);
                  if (div[prefixed]) {
                      matches = makeFunction(prefixed);
                      break;
                  }
              }
          }
      }
      // TSRChange - IE8 is no longer supported and phantom is not used. Maybe we can remove this code?
      // // IE8... and apparently phantom some?
      // /* istanbul ignore next */
      // if (!matches) {
      //   matches = function(node: HTMLElement, selector: string): bo {
      //     let parentNode, i;
      //     parentNode = node.parentNode;
      //     if (!parentNode) {
      //       // empty dummy <div>
      //       div.innerHTML = '';
      //       parentNode = div;
      //       node = node.cloneNode();
      //       div.appendChild(node);
      //     }
      //     const nodes = parentNode.querySelectorAll(selector);
      //     i = nodes.length;
      //     while (i--) {
      //       if (nodes[i] === node) {
      //         return true;
      //       }
      //     }
      //     return false;
      //   };
      // }
  }
  function detachNode(node) {
      /**
       * I'm going to remove `typeof node.parentNode !== 'unknown'` match.
       * It was only occuring in IE < 8 which is no longer supported from 0.8
       *
       * @see https://github.com/ractivejs/ractive/blob/dev/CHANGELOG.md#080
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#IE-specific_notes
       */
      if (node && node.parentNode) {
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
          throw new Error('The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.');
      }
      var _target = getElement(target);
      var _anchor = getElement(anchor) || null;
      if (!_target) {
          throw new Error('You must specify a valid target to insert into');
      }
      _target.insertBefore(this.detach(), _anchor);
      this.el = _target;
      (_target.__ractive_instances__ || (_target.__ractive_instances__ = [])).push(this);
      this.isDetached = false;
      fireInsertHook(this);
  }
  function fireInsertHook(ractive) {
      hooks.insert.fire(ractive);
      ractive.findAllComponents('*').forEach(function (child) {
          fireInsertHook(child.instance);
      });
  }

  function Ractive$link(source, here, options) {
      var target = (options === null || options === void 0 ? void 0 : options.ractive) || (options === null || options === void 0 ? void 0 : options.instance) || this;
      var model;
      // may need to allow a mapping to resolve implicitly
      var sourcePath = splitKeypath(source);
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
      dest.link(src, (options === null || options === void 0 ? void 0 : options.keypath) || source);
      runloop.end();
      return promise;
  }
  // TODO add typings
  function isUpstream(check, start) {
      var model = start;
      while (model) {
          if (model === check || model.owner === check)
              { return true; }
          model = model.target || model.parent;
      }
      return false;
  }

  function negativeOne() {
      return -1;
  }
  var ArrayObserver = /** @class */ (function () {
      function ArrayObserver(ractive, model, callback, options) {
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
          }
          else {
              this.sliced = this.slice();
          }
      }
      ArrayObserver.prototype.cancel = function () {
          this.model.unregister(this);
          removeFromArray(this.ractive._observers, this);
      };
      ArrayObserver.prototype.dispatch = function () {
          try {
              this.callback.call(this.ractive, this.pending);
          }
          catch (err) {
              warnIfDebug("Failed to execute array observer callback for '" + this.keypath + "': " + (err.message || err));
          }
          this.pending = null;
          if (this.options.once)
              { this.cancel(); }
      };
      ArrayObserver.prototype.handleChange = function (path) {
          if (this.pending) {
              // post-shuffle
              runloop.addObserver(this, this.options.defer);
          }
          else if (!path) {
              // entire array changed
              this.shuffle(this.sliced.map(negativeOne));
              this.handleChange();
          }
      };
      ArrayObserver.prototype.shuffle = function (newIndices) {
          var _this = this;
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
                  deleted.push(_this.sliced[oldIndex]);
              }
          });
          if (isUndefined(start))
              { start = newIndices.length; }
          var len = newValue.length;
          for (var i = 0; i < len; i += 1) {
              if (!hadIndex[i])
                  { inserted.push(newValue[i]); }
          }
          this.pending = { inserted: inserted, deleted: deleted, start: start };
          this.sliced = newValue;
      };
      ArrayObserver.prototype.slice = function () {
          var value = this.model.get();
          return isArray(value) ? value.slice() : [];
      };
      return ArrayObserver;
  }());

  var Observer = /** @class */ (function () {
      function Observer(ractive, model, callback, options) {
          this.context = options.context || ractive;
          this.callback = callback;
          this.ractive = ractive;
          this.keypath = options.keypath;
          this.options = options;
          if (model)
              { this.resolved(model); }
          if (isFunction(options.old)) {
              this.oldContext = create(ractive);
              this.oldFn = options.old;
          }
          if (options.init !== false) {
              this.dirty = true;
              this.dispatch();
          }
          else {
              updateOld(this);
          }
          this.dirty = false;
      }
      Observer.prototype.cancel = function () {
          this.cancelled = true;
          this.model.unregister(this);
          // TSRChange - see comment in resolver prop
          // if (this.model) {
          //   this.model.unregister(this);
          // } else {
          //   this.resolver.unbind();
          // }
          removeFromArray(this.ractive._observers, this);
      };
      Observer.prototype.dispatch = function () {
          if (!this.cancelled) {
              try {
                  this.callback.call(this.context, this.newValue, this.oldValue, this.keypath);
              }
              catch (err) {
                  warnIfDebug("Failed to execute observer callback for '" + this.keypath + "': " + (err.message || err));
              }
              updateOld(this, true);
              this.dirty = false;
          }
      };
      Observer.prototype.handleChange = function () {
          var _this = this;
          if (!this.dirty) {
              var newValue = this.model.get();
              if (isEqual(newValue, this.oldValue))
                  { return; }
              this.newValue = newValue;
              if (this.options.strict && this.newValue === this.oldValue)
                  { return; }
              runloop.addObserver(this, this.options.defer);
              this.dirty = true;
              if (this.options.once)
                  { runloop.scheduleTask(function () { return _this.cancel(); }); }
          }
          else {
              // make sure the newValue stays updated in case this observer gets touched multiple times in one loop
              this.newValue = this.model.get();
          }
      };
      Observer.prototype.rebind = function (next, previous) {
          var _this = this;
          next = rebindMatch(this.keypath, next, previous);
          if (next === this.model)
              { return false; }
          if (this.model)
              { this.model.unregister(this); }
          if (next)
              { next.addShuffleTask(function () { return _this.resolved(next); }); }
      };
      Observer.prototype.resolved = function (model) {
          this.model = model;
          this.oldValue = undefined;
          this.newValue = model.get();
          model.register(this);
      };
      return Observer;
  }());
  function updateOld(observer, fresh) {
      var next = fresh
          ? observer.model
              ? observer.model.get()
              : observer.newValue
          : observer.newValue;
      try {
          observer.oldValue = observer.oldFn
              ? observer.oldFn.call(observer.oldContext, undefined, next, observer.keypath)
              : next;
      }
      catch (err) {
          warnIfDebug("Failed to execute observer oldValue callback for '" + this.keypath + "': " + (err.message || err));
          observer.oldValue = next;
      }
  }

  function joinKeys() {
      var arguments$1 = arguments;

      var keys = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          keys[_i] = arguments$1[_i];
      }
      return keys.map(escapeKey).join('.');
  }
  function splitKeypath$1(keypath) {
      return splitKeypath(keypath).map(unescapeKey);
  }

  var star$1 = /\*+/g;
  var PatternObserver = /** @class */ (function () {
      function PatternObserver(ractive, baseModel, keys, callback, options) {
          var _this = this;
          this.context = options.context || ractive;
          this.ractive = ractive;
          this.baseModel = baseModel;
          this.keys = keys;
          this.callback = callback;
          var pattern = keys.join('\\.').replace(star$1, '(.+)');
          var baseKeypath = (this.baseKeypath = baseModel.getKeypath(ractive));
          this.pattern = new RegExp("^" + (baseKeypath ? baseKeypath + '\\.' : '') + pattern + "$");
          this.recursive = keys.length === 1 && keys[0] === '**';
          if (this.recursive)
              { this.keys = ['*']; }
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
          this.cache = [];
          this.partial = false;
          this.links = options.links;
          var models = baseModel.findMatches(this.keys);
          models.forEach(function (model) {
              _this.newValues[model.getKeypath(_this.ractive)] = model.get();
          });
          if (options.init !== false) {
              this.dispatch();
          }
          else {
              updateOld$1(this, this.newValues);
          }
          baseModel.registerPatternObserver(this);
      }
      PatternObserver.prototype.cancel = function () {
          this.baseModel.unregisterPatternObserver(this);
          removeFromArray(this.ractive._observers, this);
      };
      PatternObserver.prototype.dispatch = function () {
          var _this = this;
          var newValues = this.newValues;
          this.newValues = {};
          keys(newValues).forEach(function (keypath) {
              var newValue = newValues[keypath];
              var oldValue = _this.oldValues[keypath];
              if (_this.strict && newValue === oldValue)
                  { return; }
              if (isEqual(newValue, oldValue))
                  { return; }
              var args = [newValue, oldValue, keypath];
              if (keypath) {
                  var wildcards = _this.pattern.exec(keypath);
                  if (wildcards) {
                      args = args.concat(wildcards.slice(1));
                  }
              }
              try {
                  _this.callback.apply(_this.context, args);
              }
              catch (err) {
                  warnIfDebug("Failed to execute pattern observer callback for '" + _this.keypath + "': " + (err.message || err));
              }
          });
          updateOld$1(this, newValues, this.partial);
          this.dirty = false;
      };
      PatternObserver.prototype.notify = function (keys) {
          var path = joinKeys(keys);
          if (!~this.cache.indexOf(path)) {
              this.cache.push(path);
              this.changed.push(keys);
          }
      };
      PatternObserver.prototype.shuffle = function (newIndices) {
          if (!isArray(this.baseModel.value))
              { return; }
          var max = this.baseModel.value.length;
          for (var i = 0; i < newIndices.length; i++) {
              if (newIndices[i] === -1 || newIndices[i] === i)
                  { continue; }
              this.changed.push([i]);
          }
          for (var i = newIndices.touchedFrom; i < max; i++) {
              this.changed.push([i]);
          }
      };
      PatternObserver.prototype.handleChange = function () {
          var _this = this;
          if (!this.dirty || this.changed.length) {
              if (!this.dirty)
                  { this.newValues = {}; }
              if (!this.changed.length) {
                  this.baseModel.findMatches(this.keys).forEach(function (model) {
                      var keypath = model.getKeypath(_this.ractive);
                      _this.newValues[keypath] = model.get();
                  });
                  this.partial = false;
              }
              else {
                  var count_1 = 0;
                  if (this.recursive) {
                      var changed = this.changed.slice();
                      this.changed.length = 0;
                      this.dirty = true;
                      changed.forEach(function (keys) {
                          var model = _this.baseModel.joinAll(keys);
                          if (model.isLink && !_this.links)
                              { return; }
                          count_1++;
                          _this.newValues[model.getKeypath(_this.ractive)] = model.get();
                      });
                      this.dirty = false;
                  }
                  else {
                      var ok_1 = 
                      // TSRChange - changed to `in` guard
                      'isRoot' in this.baseModel
                          ? this.changed.map(function (keys) { return keys.map(escapeKey).join('.'); })
                          : this.changed.map(function (keys) { return _this.baseKeypath + '.' + keys.map(escapeKey).join('.'); });
                      this.baseModel.findMatches(this.keys).forEach(function (model) {
                          var keypath = model.getKeypath(_this.ractive);
                          var check = function (k) {
                              return ((k.indexOf(keypath) === 0 &&
                                  (k.length === keypath.length || k[keypath.length] === '.')) ||
                                  (keypath.indexOf(k) === 0 &&
                                      (k.length === keypath.length || keypath[k.length] === '.')));
                          };
                          // is this model on a changed keypath?
                          if (ok_1.filter(check).length) {
                              count_1++;
                              _this.newValues[keypath] = model.get();
                          }
                      });
                  }
                  // no valid change triggered, so bail to avoid breakage
                  if (!count_1)
                      { return; }
                  this.partial = true;
              }
              runloop.addObserver(this, this.defer);
              this.dirty = true;
              this.changed.length = 0;
              this.cache = [];
              if (this.once)
                  { this.cancel(); }
          }
      };
      return PatternObserver;
  }());
  function updateOld$1(observer, vals, partial) {
      var olds = observer.oldValues;
      if (observer.oldFn) {
          if (!partial)
              { observer.oldValues = {}; }
          keys(vals).forEach(function (k) {
              var args = [olds[k], vals[k], k];
              var parts = observer.pattern.exec(k);
              if (parts) {
                  args.push.apply(args, parts.slice(1));
              }
              observer.oldValues[k] = observer.oldFn.apply(observer.oldContext, args);
          });
      }
      else {
          if (partial) {
              keys(vals).forEach(function (k) { return (olds[k] = vals[k]); });
          }
          else {
              observer.oldValues = vals;
          }
      }
  }

  function Ractive$observe(keypath, callback, options) {
      var _a;
      var _this = this;
      var observers = [];
      var map;
      var opts;
      if (isObjectType(keypath)) {
          map = keypath;
          opts = callback || {};
      }
      else if (isFunction(keypath)) {
          map = { '': keypath };
          opts = callback || {};
      }
      else if (isFunction(callback)) {
          map = {};
          map[keypath] = callback;
          opts = options || {};
      }
      var silent = false;
      keys(map).forEach(function (keypath) {
          var callback = map[keypath];
          var caller = function () {
              var arguments$1 = arguments;

              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments$1[_i];
              }
              if (silent)
                  { return; }
              return callback.apply(this, args);
          };
          var keypaths = keypath.split(' ');
          if (keypaths.length > 1)
              { keypaths = keypaths.filter(function (k) { return k; }); }
          keypaths.forEach(function (keypath) {
              opts.keypath = keypath;
              var observer = createObserver(_this, keypath, caller, opts);
              if (observer)
                  { observers.push(observer); }
          });
      });
      // add observers to the Ractive instance, so they can be
      // cancelled on ractive.teardown()
      (_a = this._observers).push.apply(_a, observers);
      return {
          cancel: function () { return observers.forEach(function (o) { return o.cancel(); }); },
          isSilenced: function () { return silent; },
          silence: function () { return (silent = true); },
          resume: function () { return (silent = false); }
      };
  }
  function createObserver(ractive, keypath, callback, options) {
      var keys = splitKeypath(keypath);
      var wildcardIndex = keys.indexOf('*');
      if (!~wildcardIndex)
          { wildcardIndex = keys.indexOf('**'); }
      options.fragment = options.fragment || ractive.fragment;
      var model;
      if (!options.fragment) {
          model = ractive.viewmodel.joinKey(keys[0]);
      }
      else {
          // .*.whatever relative wildcard is a special case because splitkeypath doesn't handle the leading .
          if (~keys[0].indexOf('.*')) {
              model = options.fragment.findContext();
              wildcardIndex = 0;
              keys[0] = keys[0].slice(1);
          }
          else {
              model =
                  wildcardIndex === 0
                      ? options.fragment.findContext()
                      : resolveReference(options.fragment, keys[0]);
          }
      }
      // the model may not exist key
      if (!model)
          { model = ractive.viewmodel.joinKey(keys[0]); }
      if (!~wildcardIndex) {
          model = model.joinAll(keys.slice(1));
          if ('array' in options && options.array) {
              return new ArrayObserver(ractive, model, callback, options);
          }
          else {
              return new Observer(ractive, model, callback, options);
          }
      }
      else {
          var double = keys.indexOf('**');
          if (~double) {
              if (double + 1 !== keys.length || ~keys.indexOf('*')) {
                  warnOnceIfDebug("Recursive observers may only specify a single '**' at the end of the path.");
                  return;
              }
          }
          model = model.joinAll(keys.slice(1, wildcardIndex));
          return new PatternObserver(ractive, model, keys.slice(wildcardIndex), callback, options);
      }
  }

  var onceOptions = { init: false, once: true };
  function Ractive$observeOnce(keypath, callback, options) {
      if (isString(keypath) && isFunction(callback)) {
          options = assign(options || {}, onceOptions);
          return this.observe(keypath, callback, options);
      }
      // TSRChange - add if for avoid type errors - consider to add an error add the end of the function?
      if (isObjectType(keypath)) {
          options = assign(callback || {}, onceOptions);
          return this.observe(keypath, options);
      }
  }

  function trim(str) {
      return str.trim();
  }
  function notEmptyString(str) {
      return str !== '';
  }

  function Ractive$off(eventName, callback) {
      var _this = this;
      // if no event is specified, remove _all_ event listeners
      if (!eventName) {
          this._subs = {};
      }
      else {
          // Handle multiple space-separated event names
          var eventNames = eventName.split(' ').map(trim).filter(notEmptyString);
          eventNames.forEach(function (event) {
              var subs = _this._subs[event];
              // if given a specific callback to remove, remove only it
              if (subs && callback) {
                  var entry = subs.find(function (s) { return s.callback === callback; });
                  if (entry) {
                      removeFromArray(subs, entry);
                      entry.off = true;
                      if (event.indexOf('.'))
                          { _this._nsSubs--; }
                  }
              }
              else if (subs) {
                  // otherwise, remove all listeners for this event
                  if (event.indexOf('.'))
                      { _this._nsSubs -= subs.length; }
                  subs.length = 0;
              }
          });
      }
      return this;
  }

  function Ractive$on(eventName, callback) {
      var _this = this;
      // eventName may already be a map
      var map = isObjectType(eventName) ? eventName : {};
      // or it may be a string along with a callback
      if (isString(eventName))
          { map[eventName] = callback; }
      var silent = false;
      var events = [];
      var _loop_1 = function (k) {
          var callback_1 = map[k];
          var entry = {
              callback: callback_1,
              handler: function () {
                  var arguments$1 = arguments;

                  var args = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments$1[_i];
                  }
                  if (!silent)
                      { return callback_1.apply(this, args); }
              }
          };
          if (hasOwn(map, k)) {
              var names = k.split(' ').map(trim).filter(notEmptyString);
              names.forEach(function (n) {
                  (_this._subs[n] || (_this._subs[n] = [])).push(entry);
                  if (n.indexOf('.'))
                      { _this._nsSubs++; }
                  events.push([n, entry]);
              });
          }
      };
      for (var k in map) {
          _loop_1(k);
      }
      return {
          cancel: function () { return events.forEach(function (e) { return _this.off(e[0], e[1].callback); }); },
          isSilenced: function () { return silent; },
          silence: function () { return (silent = true); },
          resume: function () { return (silent = false); }
      };
  }

  function Ractive$once(eventName, handler) {
      var _this = this;
      var listener = this.on(eventName, function () {
          var arguments$1 = arguments;

          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments$1[_i];
          }
          handler.call.apply(handler, __spreadArrays([_this], args));
          listener.cancel();
      });
      // so we can still do listener.cancel() manually
      return listener;
  }

  var Ractive$pop = makeArrayMethod('pop').path;

  var Ractive$push = makeArrayMethod('push').path;

  function Ractive$readLink(keypath, options) {
      if (options === void 0) { options = {}; }
      var path = splitKeypath(keypath);
      if (this.viewmodel.has(path[0])) {
          var model = this.viewmodel.joinAll(path);
          if (!model.isLink)
              { return; }
          while ((model = 'target' in model && model.target) && options.canonical !== false) {
              if (!model.isLink)
                  { break; }
          }
          if (model)
              { return { ractive: model.root.ractive, keypath: model.getKeypath() }; }
      }
  }

  var PREFIX = '/* Ractive.js component styles */';
  // Holds current definitions of styles.
  var styleDefinitions = [];
  // Flag to tell if we need to update the CSS
  var isDirty = false;
  // These only make sense on the browser. See additional setup below.
  var styleElement = null;
  // flag to use multiple style tags
  var _splitTag = false;
  function splitTag(v) {
      return v === undefined ? _splitTag : (_splitTag = v);
  }
  function makeStyle(id) {
      if (doc) {
          var el = doc.createElement('style');
          el.type = 'text/css';
          el.setAttribute('data-ractive-css', id || '');
          doc.getElementsByTagName('head')[0].appendChild(el);
          return el;
      }
  }
  function style() {
      if (!styleElement)
          { styleElement = makeStyle(); }
      return styleElement;
  }
  function getStyle(id) {
      return doc && (doc.querySelector("[data-ractive-css=\"" + id + "\"]") || makeStyle(id));
  }
  function getCSS(cssIds) {
      if (cssIds && !isArray(cssIds))
          { cssIds = [cssIds]; }
      var filteredStyleDefinitions = cssIds
          ? styleDefinitions.filter(function (style) { return ~cssIds.indexOf(style.id); })
          : styleDefinitions;
      filteredStyleDefinitions.forEach(function (d) { return (d.applied = true); });
      return filteredStyleDefinitions.reduce(function (styles, style) { return "" + (styles ? styles + "\n\n/* {" + style.id + "} */\n" + style.styles : ''); }, PREFIX);
  }
  function addCSS(styleDefinition) {
      styleDefinitions.push(styleDefinition);
      isDirty = true;
  }
  function applyCSS(force) {
      var styleElement = style();
      // Apply only seems to make sense when we're in the DOM. Server-side renders
      // can call toCSS to get the updated CSS.
      if (!styleElement || (!force && !isDirty))
          { return; }
      if (_splitTag) {
          styleDefinitions.forEach(function (s) {
              var el = getStyle(s.id);
              if (el) {
                  var css = getCSS(s.id);
                  if (el.innerHTML !== css) {
                      el.innerHTML = css;
                  }
              }
          });
      }
      else {
          styleElement.innerHTML = getCSS(null);
      }
      isDirty = false;
  }

  var KeyModel = /** @class */ (function () {
      function KeyModel(value, context, instance) {
          this.deps = [];
          this.links = [];
          this.children = [];
          this.isReadonly = true;
          this.isKey = true;
          this.reference = noop;
          this.unreference = noop;
          this.value = value;
          this.key = value;
          this.context = context;
          this.instance = instance;
      }
      KeyModel.prototype.applyValue = function (value) {
          if (value !== this.value) {
              this.value = this.key = value;
              this.deps.forEach(handleChange);
              this.links.forEach(handleChange);
              this.children.forEach(function (c) {
                  c.applyValue(c.context.getKeypath(c.instance));
              });
          }
      };
      KeyModel.prototype.destroyed = function () {
          if (this.upstream)
              { this.upstream.unregisterChild(this); }
      };
      KeyModel.prototype.get = function (shouldCapture) {
          if (shouldCapture)
              { capture(this); }
          return unescapeKey(this.value);
      };
      KeyModel.prototype.getKeypath = function () {
          return unescapeKey(this.value);
      };
      KeyModel.prototype.has = function () {
          return false;
      };
      KeyModel.prototype.rebind = function (next, previous) {
          var i = this.deps.length;
          while (i--)
              { this.deps[i].rebind(next, previous, false); }
          i = this.links.length;
          while (i--)
              { this.links[i].relinking(next, false); }
      };
      KeyModel.prototype.register = function (dependant) {
          this.deps.push(dependant);
      };
      KeyModel.prototype.registerChild = function (child) {
          addToArray(this.children, child);
          child.upstream = this;
      };
      KeyModel.prototype.registerLink = function (link) {
          addToArray(this.links, link);
      };
      KeyModel.prototype.unregister = function (dependant) {
          removeFromArray(this.deps, dependant);
      };
      KeyModel.prototype.unregisterChild = function (child) {
          removeFromArray(this.children, child);
      };
      KeyModel.prototype.unregisterLink = function (link) {
          removeFromArray(this.links, link);
      };
      return KeyModel;
  }());

  /**
   * simple JSON parser, without the restrictions of JSON parse
   * (i.e. having to double-quote keys).
   *
   * If passed a hash of values as the second argument, ${placeholders}
   * will be replaced with those values
   */
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
  var onlyWhitespace = /^\s*$/;
  var JsonParser = /** @class */ (function (_super) {
      __extends(JsonParser, _super);
      function JsonParser() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      JsonParser.prototype.init = function (_str, options) {
          this.values = options.values;
          this.converters = [
              function getPlaceholder(parser) {
                  if (!parser.values)
                      { return null; }
                  var placeholder = parser.matchPattern(placeholderAtStartPattern);
                  if (placeholder && hasOwn(parser.values, placeholder)) {
                      return { v: parser.values[placeholder] };
                  }
              },
              function getSpecial(parser) {
                  var special = parser.matchPattern(specialsPattern);
                  if (special)
                      { return { v: specials$1[special] }; }
              },
              function getNumber(parser) {
                  var number = parser.matchPattern(numberPattern$1);
                  if (number)
                      { return { v: +number }; }
              },
              function getString(parser) {
                  var stringLiteral = readStringLiteral(parser);
                  var values = parser.values;
                  if (stringLiteral && values) {
                      return {
                          v: stringLiteral.v.replace(placeholderPattern, function (_match, $1) {
                              return $1 in values ? values[$1] : $1;
                          })
                      };
                  }
                  return stringLiteral;
              },
              function getObject(parser) {
                  if (!parser.matchString('{'))
                      { return null; }
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
                  if (!parser.matchString('['))
                      { return null; }
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
          ];
          this.sp();
      };
      JsonParser.prototype.postProcess = function (result) {
          if (result.length !== 1 || !onlyWhitespace.test(this.leftover)) {
              return null;
          }
          return { value: result[0].v };
      };
      return JsonParser;
  }(Parser));
  function getKeyValuePair(parser) {
      parser.sp();
      var key = readKey(parser);
      if (!key)
          { return null; }
      var pair = { key: key };
      parser.sp();
      if (!parser.matchString(':')) {
          return null;
      }
      parser.sp();
      var valueToken = parser.read();
      if (!valueToken)
          { return null; }
      pair.value = valueToken.v;
      return pair;
  }
  function parseJSON(str, values) {
      var parser = new JsonParser(str, { values: values });
      return parser.result;
  }

  // TODO all this code needs to die
  function processItems(items, values, guid, counter) {
      if (counter === void 0) { counter = 0; }
      return items
          .map(function (item) {
          if (item.type === TemplateItemType$1.TEXT) {
              return item.template;
          }
          if (item.fragment) {
              if (item.fragment.iterations) {
                  return item.fragment.iterations
                      .map(function (fragment) {
                      return processItems(fragment.items, values, guid, counter);
                  })
                      .join('');
              }
              else {
                  return processItems(item.fragment.items, values, guid, counter);
              }
          }
          var placeholderId = guid + "-" + counter++;
          // TSRChange - it seems that `item.newModel` is never set
          var model = item.model;
          values[placeholderId] = model
              ? model.wrapper
                  ? model.wrapperValue
                  : model.get()
              : undefined;
          return '${' + placeholderId + '}';
      })
          .join('');
  }

  function getPartialTemplate(ractive, name, up) {
      // If the partial in instance or view hierarchy instances, great
      var partial = getPartialFromRegistry(ractive, name, up);
      if (partial)
          { return partial; }
      // Does it exist on the page as a script tag?
      var partialText = parser.fromId(name, { noThrow: true });
      if (partialText) {
          // parse and register to this ractive instance
          var parsed = parser.parseFor(partialText, ractive);
          // register extra partials on the ractive instance if they don't already exist
          if (parsed.p)
              { fillGaps(ractive.partials, parsed.p); }
          // register (and return main partial if there are others in the template)
          return (ractive.partials[name] = parsed.t);
      }
  }
  function getPartialFromRegistry(ractive, name, up) {
      // if there was an instance up-hierarchy, cool
      var parentPartial = findParentPartial(name, up === null || up === void 0 ? void 0 : up.owner);
      if (parentPartial)
          { return parentPartial; }
      // find first instance in the ractive or view hierarchy that has this partial
      var instance = findInstance('partials', ractive, name);
      if (!instance) {
          return;
      }
      var partial = instance.partials[name];
      // partial is a function?
      var fn;
      if (isFunction(partial)) {
          fn = partial;
          // super partial
          if ('styleSet' in fn)
              { return fn; }
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
      if (fn)
          { partial._fn = fn; }
      // if the partial is a pre-parsed template object, import any expressions and update the registry
      if (partial.v) {
          addFunctions(partial);
          return (instance.partials[name] = partial.t);
      }
      else {
          return partial;
      }
  }
  function findOwner(ractive, key) {
      return hasOwn(ractive.partials, key)
          ? ractive
          : findConstructor(ractive.constructor, key);
  }
  function findConstructor(constructor, key) {
      if (!constructor)
          { return; }
      return hasOwn(constructor.partials, key) ? constructor : findConstructor(constructor.Parent, key);
  }
  function findParentPartial(name, parent) {
      var _a, _b;
      if (parent) {
          if (((_a = parent.template) === null || _a === void 0 ? void 0 : _a.p) && !isArray(parent.template.p) && hasOwn(parent.template.p, name)) {
              return parent.template.p[name];
          }
          else if ((_b = parent.up) === null || _b === void 0 ? void 0 : _b.owner) {
              return findParentPartial(name, parent.up.owner);
          }
      }
  }

  var ComputationChild = /** @class */ (function (_super) {
      __extends(ComputationChild, _super);
      function ComputationChild(parent, key) {
          var _this = _super.call(this, parent, key) || this;
          _this.isReadonly = !_this.root.ractive.syncComputedChildren;
          _this.dirty = true;
          _this.isComputed = true;
          return _this;
      }
      Object.defineProperty(ComputationChild.prototype, "setRoot", {
          get: function () {
              return this.parent.setRoot;
          },
          enumerable: false,
          configurable: true
      });
      ComputationChild.prototype.applyValue = function (value) {
          _super.prototype.applyValue.call(this, value);
          if (!this.isReadonly) {
              var source = this.parent;
              // computed models don't have a shuffle method
              while (source === null || source === void 0 ? void 0 : source.shuffle) {
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
      ComputationChild.prototype.get = function (shouldCapture, opts) {
          if (shouldCapture)
              { capture(this); }
          if (this.dirty) {
              this.dirty = false;
              var parentValue = this.parent.get();
              this.value = parentValue ? parentValue[this.key] : undefined;
              if (this.wrapper)
                  { this.newWrapperValue = this.value; }
              this.adapt();
          }
          return (opts && 'unwrap' in opts ? opts.unwrap !== false : shouldCapture) && this.wrapper
              ? this.wrapperValue
              : this.value;
      };
      ComputationChild.prototype.handleChange = function () {
          if (this.dirty)
              { return; }
          this.dirty = true;
          if (this.boundValue)
              { this.boundValue = null; }
          this.links.forEach(marked);
          this.deps.forEach(handleChange);
          this.children.forEach(handleChange);
      };
      ComputationChild.prototype.joinKey = function (key) {
          if (isUndefined(key) || key === '')
              { return this; }
          if (!hasOwn(this.childByKey, key)) {
              var child = new ComputationChild(this, key);
              this.children.push(child);
              this.childByKey[key] = child;
          }
          return this.childByKey[key];
      };
      return ComputationChild;
  }(Model));

  var Computation = /** @class */ (function (_super) {
      __extends(Computation, _super);
      function Computation(parent, signature, key) {
          var _this = _super.call(this, parent, key) || this;
          _this.signature = signature;
          _this.isReadonly = !_this.signature.setter;
          _this.isComputed = true;
          _this.dependencies = [];
          _this.dirty = true;
          // TODO: is there a less hackish way to do this?
          _this.shuffle = undefined;
          return _this;
      }
      Object.defineProperty(Computation.prototype, "setRoot", {
          get: function () {
              if (this.signature.setter)
                  { return this; }
              return undefined;
          },
          enumerable: false,
          configurable: true
      });
      Computation.prototype.get = function (shouldCapture, opts) {
          if (shouldCapture)
              { capture(this); }
          if (this.dirty) {
              var old = this.value;
              this.value = this.getValue();
              // this may cause a view somewhere to update, so it must be in a runloop
              if (!runloop.active()) {
                  runloop.start();
                  if (!isEqual(old, this.value))
                      { this.notifyUpstream(); }
                  runloop.end();
              }
              else {
                  if (!isEqual(old, this.value))
                      { this.notifyUpstream(); }
              }
              if (this.wrapper)
                  { this.newWrapperValue = this.value; }
              this.adapt();
              this.dirty = false;
          }
          // if capturing, this value needs to be unwrapped because it's for external use
          return maybeBind(this, 
          // if unwrap is supplied, it overrides capture
          this.wrapper && (opts && 'unwrap' in opts ? opts.unwrap !== false : shouldCapture)
              ? this.wrapperValue
              : this.value, !opts || opts.shouldBind !== false);
      };
      Computation.prototype.getContext = function () {
          return this.parent.isRoot ? this.root.ractive : this.parent.get(false, noVirtual);
      };
      Computation.prototype.getValue = function () {
          startCapturing();
          var result;
          try {
              result = this.signature.getter.call(this.root.ractive, this.getContext(), this.getKeypath());
          }
          catch (err) {
              warnIfDebug("Failed to compute " + this.getKeypath() + ": " + (err.message || err));
              /* eslint-disable no-console */
              // TODO this is all well and good in Chrome, but...
              // ...also, should encapsulate this stuff better, and only
              // show it if Ractive.DEBUG
              if (hasConsole) {
                  if (console.groupCollapsed)
                      { console.groupCollapsed('%cshow details', 'color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;'); }
                  var sig = this.signature;
                  console.error(err.name + ": " + err.message + "\n\n" + sig.getterString + (sig.getterUseStack ? '\n\n' + err.stack : ''));
                  if (console.groupCollapsed)
                      { console.groupEnd(); }
              }
              /* eslint-enable no-console */
          }
          var dependencies = stopCapturing();
          if (this.parent.keypath && !~dependencies.indexOf(this.parent))
              { dependencies.push(this.parent); }
          this.setDependencies(dependencies);
          return result;
      };
      Computation.prototype.mark = function () {
          this.handleChange();
      };
      Computation.prototype.rebind = function (next, previous) {
          // computations will grab all of their deps again automagically
          if (next !== previous)
              { this.handleChange(); }
      };
      Computation.prototype.set = function (value) {
          if (this.isReadonly) {
              throw new Error("Cannot set read-only computed value '" + this.key + "'");
          }
          this.signature.setter(value, this.getContext(), this.getKeypath());
          this.mark();
      };
      Computation.prototype.setDependencies = function (dependencies) {
          // unregister any soft dependencies we no longer have
          var i = this.dependencies.length;
          while (i--) {
              var model = this.dependencies[i];
              if (!~dependencies.indexOf(model))
                  { model.unregister(this); }
          }
          // and add any new ones
          i = dependencies.length;
          while (i--) {
              var model = dependencies[i];
              if (!~this.dependencies.indexOf(model))
                  { model.register(this); }
          }
          this.dependencies = dependencies;
      };
      Computation.prototype.handleChange = function () { };
      Computation.prototype.teardown = function () {
          var i = this.dependencies.length;
          while (i--) {
              if (this.dependencies[i])
                  { this.dependencies[i].unregister(this); }
          }
          if (this.parent.computed[this.key] === this)
              { delete this.parent.computed[this.key]; }
          _super.prototype.teardown.call(this);
      };
      return Computation;
  }(Model));
  var prototype = Computation.prototype;
  var child = ComputationChild.prototype;
  prototype.handleChange = child.handleChange;
  prototype.joinKey = child.joinKey;
  shared$1.Computation = Computation;

  // todo add ModelWithRebound interface
  var ExpressionProxy = /** @class */ (function (_super) {
      __extends(ExpressionProxy, _super);
      function ExpressionProxy(fragment, template) {
          var _this = _super.call(this, fragment.ractive.viewmodel, null) || this;
          _this.get = Computation.prototype.get;
          _this.handleChange = Computation.prototype.handleChange;
          _this.joinKey = Computation.prototype.joinKey;
          _this.mark = Computation.prototype.mark;
          _this.unbind = noop;
          _this.fragment = fragment;
          _this.template = template;
          _this.isReadonly = true;
          _this.isComputed = true;
          _this.dirty = true;
          _this.fn =
              fragment.ractive.allowExpressions === false
                  ? noop
                  : getFunction(template.s, template.r.length);
          _this.models = _this.template.r.map(function (ref) {
              return resolveReference(_this.fragment, ref);
          });
          _this.dependencies = [];
          _this.shuffle = undefined;
          _this.bubble();
          return _this;
      }
      ExpressionProxy.prototype.bubble = function (actuallyChanged) {
          if (actuallyChanged === void 0) { actuallyChanged = true; }
          // refresh the keypath
          this.keypath = undefined;
          if (actuallyChanged) {
              this.handleChange();
          }
      };
      ExpressionProxy.prototype.getKeypath = function () {
          var _this = this;
          if (!this.template)
              { return '@undefined'; }
          if (!this.keypath) {
              this.keypath =
                  '@' +
                      this.template.s.replace(/_(\d+)/g, function (match, i) {
                          if (i >= _this.models.length)
                              { return match; }
                          var model = _this.models[i];
                          return model ? model.getKeypath() : '@undefined';
                      });
          }
          return this.keypath;
      };
      ExpressionProxy.prototype.getValue = function () {
          var _this = this;
          startCapturing();
          var result;
          try {
              var params = this.models.map(function (m) { return (m ? m.get(true) : undefined); });
              result = this.fn.apply(this.fragment.ractive, params);
          }
          catch (err) {
              warnIfDebug("Failed to compute " + this.getKeypath() + ": " + (err.message || err));
          }
          var dependencies = stopCapturing();
          // remove missing deps
          this.dependencies
              .filter(function (d) { return !~dependencies.indexOf(d); })
              .forEach(function (d) {
              d.unregister(_this);
              removeFromArray(_this.dependencies, d);
          });
          // register new deps
          dependencies
              .filter(function (d) { return !~_this.dependencies.indexOf(d); })
              .forEach(function (d) {
              d.register(_this);
              _this.dependencies.push(d);
          });
          return result;
      };
      ExpressionProxy.prototype.notifyUpstream = function () { };
      ExpressionProxy.prototype.rebind = function (next, previous, safe) {
          var idx = this.models.indexOf(previous);
          if (~idx) {
              next = rebindMatch(this.template.r[idx], next, previous);
              if (next !== previous) {
                  previous.unregister(this);
                  this.models.splice(idx, 1, next);
                  if (next)
                      { next.addShuffleRegister(this, 'mark'); }
              }
          }
          this.bubble(!safe);
      };
      ExpressionProxy.prototype.rebound = function (update) {
          var _this = this;
          this.models = this.template.r.map(function (ref) { return resolveReference(_this.fragment, ref); });
          if (update)
              { this.bubble(true); }
      };
      ExpressionProxy.prototype.retrieve = function () {
          return this.get();
      };
      ExpressionProxy.prototype.teardown = function () {
          var _this = this;
          this.fragment = undefined;
          if (this.dependencies)
              { this.dependencies.forEach(function (d) { return d.unregister(_this); }); }
          _super.prototype.teardown.call(this);
      };
      ExpressionProxy.prototype.unreference = function () {
          _super.prototype.unreference.call(this);
          collect(this);
      };
      ExpressionProxy.prototype.unregister = function (dep) {
          _super.prototype.unregister.call(this, dep);
          collect(this);
      };
      ExpressionProxy.prototype.unregisterLink = function (link) {
          _super.prototype.unregisterLink.call(this, link);
          collect(this);
      };
      return ExpressionProxy;
  }(Model));
  // TSRChange - move below function inside class body
  // const prototype = ExpressionProxy.prototype;
  // const computation = Computation.prototype;
  // prototype.get = computation.get;
  // prototype.handleChange = computation.handleChange;
  // prototype.joinKey = computation.joinKey;
  // prototype.mark = computation.mark;
  // prototype.unbind = noop;
  function collect(model) {
      if (!model.deps.length && !model.refs && !model.links.length)
          { model.teardown(); }
  }

  var ReferenceExpressionProxy = /** @class */ (function (_super) {
      __extends(ReferenceExpressionProxy, _super);
      function ReferenceExpressionProxy(fragment, template) {
          var _this = _super.call(this, null, null, null, '@undefined') || this;
          _this.unregisterLink = ExpressionProxy.prototype.unregisterLink;
          _this.root = fragment.ractive.viewmodel;
          _this.template = template;
          _this.rootLink = true;
          _this.template = template;
          _this.fragment = fragment;
          _this.rebound();
          return _this;
      }
      ReferenceExpressionProxy.prototype.getKeypath = function () {
          return this.model ? this.model.getKeypath() : '@undefined';
      };
      ReferenceExpressionProxy.prototype.rebound = function () {
          var _this = this;
          var fragment = this.fragment;
          var template = this.template;
          var base = (this.base = resolve$1(fragment, template));
          var idx;
          if (this.proxy) {
              teardown$1(this);
          }
          var proxy = (this.proxy = {
              rebind: function (next, previous) {
                  if (previous === base) {
                      next = rebindMatch(template, next, previous);
                      if (next !== base) {
                          _this.base = base = next;
                      }
                  }
                  else if (~(idx = members.indexOf(previous))) {
                      var referenceTemplateItem = template.m[idx];
                      next = rebindMatch(referenceTemplateItem.n, next, previous);
                      if (next !== members[idx]) {
                          members.splice(idx, 1, next || Missing);
                      }
                  }
                  if (next !== previous) {
                      previous.unregister(proxy);
                      if (next)
                          { next.addShuffleTask(function () { return next.register(proxy); }); }
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
              if ('t' in tpl && tpl.t === TemplateItemType$1.REFERENCE) {
                  model = resolveReference(fragment, tpl.n);
                  model.register(proxy);
                  return model;
              }
              model = new ExpressionProxy(fragment, tpl);
              model.register(proxy);
              return model;
          }));
          var pathChanged = function () {
              var model = base && base.joinAll(members.reduce(function (list, m) {
                  var k = m.get();
                  if (isArray(k))
                      { return list.concat(k); }
                  else
                      { list.push(escapeKey(String(k))); }
                  return list;
              }, []));
              if (model !== _this.model) {
                  _this.model = model;
                  _this.relinking(model);
                  fireShuffleTasks();
                  refreshPathDeps(_this);
                  _this.fragment.shuffled();
              }
          };
          pathChanged();
      };
      ReferenceExpressionProxy.prototype.teardown = function () {
          teardown$1(this);
          _super.prototype.teardown.call(this);
      };
      ReferenceExpressionProxy.prototype.unreference = function () {
          _super.prototype.unreference.call(this);
          if (!this.deps.length && !this.refs)
              { this.teardown(); }
      };
      ReferenceExpressionProxy.prototype.unregister = function (dep) {
          _super.prototype.unregister.call(this, dep);
          if (!this.deps.length && !this.refs)
              { this.teardown(); }
      };
      return ReferenceExpressionProxy;
  }(LinkModel));
  // TSRChange - move below function inside class body
  // TSRChange - unreference & unregister are already present in body removed override
  // const eproto = ExpressionProxy.prototype;
  // const proto = ReferenceExpressionProxy.prototype;
  // proto.unreference = eproto.unreference;
  // proto.unregister = eproto.unregister;
  // proto.unregisterLink = eproto.unregisterLink;
  function teardown$1(proxy) {
      if (proxy.base)
          { proxy.base.unregister(proxy.proxy); }
      if (proxy.models) {
          proxy.models.forEach(function (m) {
              if (m.unregister)
                  { m.unregister(proxy); }
          });
      }
  }
  function refreshPathDeps(proxy) {
      var len = proxy.deps.length;
      var i, v;
      for (i = 0; i < len; i++) {
          v = proxy.deps[i];
          if (v.pathChanged)
              { v.pathChanged(); }
          if (v.fragment && v.fragment.pathModel)
              { v.fragment.pathModel.applyValue(proxy.getKeypath()); }
      }
      len = proxy.children.length;
      for (i = 0; i < len; i++) {
          refreshPathDeps(proxy.children[i]);
      }
  }

  function resolve$1(fragment, template) {
      if (template.r) {
          return resolveReference(fragment, template.r);
      }
      else if (template.x) {
          return new ExpressionProxy(fragment, template.x);
      }
      else if (template.rx) {
          return new ReferenceExpressionProxy(fragment, template.rx);
      }
  }

  var Item = /** @class */ (function () {
      function Item(options) {
          this.dirty = false;
          this.up = options.up;
          this.ractive = options.up.ractive;
          this.template = options.template;
          this.type = options.template.t;
          this.index = options.index;
      }
      Item.prototype.bubble = function () {
          if (!this.dirty) {
              this.dirty = true;
              this.up.bubble();
          }
      };
      Item.prototype.destroyed = function () {
          if (this.fragment)
              { this.fragment.destroyed(); }
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Item.prototype.find = function (_selector, _options) {
          return null;
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Item.prototype.findAll = function (_selector, _options) {
          return null;
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Item.prototype.findComponent = function (_name, _options) {
          return null;
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Item.prototype.findAllComponents = function (_name, _options) { };
      Item.prototype.findNextNode = function () {
          return this.up.findNextNode(this);
      };
      Item.prototype.rebound = function (update) {
          if (this.fragment)
              { this.fragment.rebound(update); }
      };
      Item.prototype.shuffled = function () {
          if (this.fragment)
              { this.fragment.shuffled(); }
      };
      Item.prototype.valueOf = function () {
          return this.toString();
      };
      return Item;
  }());
  var ContainerItem = /** @class */ (function (_super) {
      __extends(ContainerItem, _super);
      function ContainerItem(options) {
          return _super.call(this, options) || this;
      }
      /**
       * Function signature include also Element to be compatible
       * with other classes which extend this class
       */
      ContainerItem.prototype.detach = function () {
          return this.fragment ? this.fragment.detach() : createDocumentFragment();
      };
      ContainerItem.prototype.find = function (selector) {
          if (this.fragment) {
              return this.fragment.find(selector);
          }
      };
      ContainerItem.prototype.findAll = function (selector, options) {
          if (this.fragment) {
              this.fragment.findAll(selector, options);
          }
      };
      ContainerItem.prototype.findComponent = function (name) {
          if (this.fragment) {
              return this.fragment.findComponent(name);
          }
      };
      ContainerItem.prototype.findAllComponents = function (name, options) {
          if (this.fragment) {
              this.fragment.findAllComponents(name, options);
          }
      };
      ContainerItem.prototype.firstNode = function (skipParent) {
          return this.fragment && this.fragment.firstNode(skipParent);
      };
      ContainerItem.prototype.toString = function (escape) {
          return this.fragment ? this.fragment.toString(escape) : '';
      };
      return ContainerItem;
  }(Item));
  /**
   * From a given item check if it match the given TemplateItemType
   */
  function isItemType(item, type) {
      return isObject(item) && item.type === type;
  }

  var Mustache = /** @class */ (function (_super) {
      __extends(Mustache, _super);
      function Mustache(options) {
          var _this = _super.call(this, options) || this;
          // if (options.owner) this.parent = options.owner;
          _this.isStatic = !!options.template.s;
          _this.model = null;
          _this.dirty = false;
          return _this;
      }
      Mustache.prototype.bind = function (pre) {
          // yield mustaches and inner contexts should resolve in container context
          var start = this.template.y
              ? this.template.y.containerFragment
              : this.containerFragment || this.up;
          // try to find a model for this view
          var model = pre || resolve$1(start, this.template);
          if (model) {
              var value_1 = model.get();
              if (this.isStatic) {
                  this.model = { get: function () { return value_1; } };
                  model.unreference();
                  return;
              }
              model.register(this);
              this.model = model;
          }
      };
      Mustache.prototype.handleChange = function () {
          this.bubble();
      };
      Mustache.prototype.rebind = function (next, previous, safe) {
          if (this.isStatic)
              { return; }
          next = rebindMatch(this.template, next, previous, this.up);
          if (next === this.model)
              { return false; }
          if (this.model) {
              this.model.unregister(this);
          }
          if (next)
              { next.addShuffleRegister(this, 'mark'); }
          this.model = next;
          if (!safe)
              { this.handleChange(); }
          return true;
      };
      Mustache.prototype.rebound = function (update) {
          if (this.model) {
              if ('rebound' in this.model)
                  { this.model.rebound(update); }
              else {
                  // check to see if the model actually changed...
                  // yield mustaches and inner contexts should resolve in container context
                  var start = this.template.y
                      ? this.template.y.containerFragment
                      : this.containerFragment || this.up;
                  // try to find a model for this view
                  var model = resolve$1(start, this.template);
                  if (model !== this.model) {
                      this.model.unregister(this);
                      this.bind(model);
                  }
              }
              if (update)
                  { this.bubble(); }
          }
          if (this.fragment)
              { this.fragment.rebound(update); }
      };
      Mustache.prototype.unbind = function () {
          if (!this.isStatic) {
              this.model && this.model.unregister(this);
              this.model = undefined;
          }
      };
      return Mustache;
  }(Item));
  // TSRChange
  // TODO - Maybe this can be done using mixins or something more "elegant"
  // export function MustacheContainer(options): void {
  //   Mustache.call(this, options);
  // }
  // const proto = (MustacheContainer.prototype = Object.create(ContainerItem.prototype));
  // assign(proto, Mustache.prototype, { constructor: MustacheContainer });
  var MustacheContainer = /** @class */ (function (_super) {
      __extends(MustacheContainer, _super);
      function MustacheContainer(options) {
          var _this = _super.call(this, options) || this;
          _this.find = ContainerItem.prototype.find;
          _this.findAll = ContainerItem.prototype.findAll;
          _this.findComponent = ContainerItem.prototype.findComponent;
          _this.findAllComponents = ContainerItem.prototype.findAllComponents;
          _this.firstNode = ContainerItem.prototype.firstNode;
          _this.toString = ContainerItem.prototype.toString;
          return _this;
      }
      // This function is called using super by child classes so we can't declare it as a property
      MustacheContainer.prototype.detach = function () {
          return ContainerItem.prototype.detach.call(this);
      };
      return MustacheContainer;
  }(Mustache));

  var Partial = /** @class */ (function (_super) {
      __extends(Partial, _super);
      function Partial(options) {
          var _this = _super.call(this, options) || this;
          var template = options.template;
          // yielder is a special form of partial that will later require special handling
          if (template.t === TemplateItemType$1.YIELDER) {
              _this.yielder = 1;
          }
          else if (template.t === TemplateItemType$1.ELEMENT) {
              // this is a macro partial, complete with macro constructor
              // leaving this as an element will confuse up-template searches
              _this.type = TemplateItemType$1.PARTIAL;
              _this.macro = options.macro;
          }
          return _this;
      }
      Partial.prototype.bind = function () {
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
                  if (!template.r && !template.x && !template.rx)
                      { this.refName = 'content'; }
              }
              else {
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
          }
          else {
              // this is a plain partial or yielder
              if (!this.refName)
                  { this.refName = template.r; }
              // if the refName exists as a partial, this is a plain old partial reference where no model binding will happen
              if (this.refName) {
                  partialFromValue(this, this.refName);
              }
              // this is a dynamic/inline partial
              if (!this.partial && !this.fn) {
                  _super.prototype.bind.call(this);
                  if (this.model)
                      { partialFromValue(this, this.model.get()); }
              }
          }
          if (!this.partial && !this.fn) {
              warnOnceIfDebug("Could not find template for partial '" + this.name + "'");
          }
          createFragment(this, this.partial || []);
          // macro/super partial
          if (this.fn)
              { initMacro(this); }
          this.fragment.bind();
      };
      Partial.prototype.bubble = function () {
          if (!this.dirty) {
              this.dirty = true;
              if (this.yielder) {
                  this.containerFragment.bubble();
              }
              else {
                  this.up.bubble();
              }
          }
      };
      Partial.prototype.findNextNode = function () {
          return (this.containerFragment || this.up).findNextNode(this);
      };
      Partial.prototype.handleChange = function () {
          this.dirtyTemplate = true;
          this.externalChange = true;
          this.bubble();
      };
      Partial.prototype.rebound = function (update) {
          var _this = this;
          if (this._attrs) {
              keys(this._attrs).forEach(function (k) { return _this._attrs[k].rebound(update); });
          }
          _super.prototype.rebound.call(this, update);
      };
      Partial.prototype.refreshAttrs = function () {
          var _this = this;
          keys(this._attrs).forEach(function (k) {
              _this.handle.attributes[k] = !_this._attrs[k].items.length || _this._attrs[k].valueOf();
          });
      };
      Partial.prototype.resetTemplate = function () {
          var _this = this;
          if (this.fn && this.proxy) {
              // TSRChange - change 0 to null to avoid type conflict
              this.last = null;
              if (this.externalChange) {
                  if (isFunction(this.proxy.teardown))
                      { this.proxy.teardown(); }
                  this.fn = this.proxy = null;
              }
              else {
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
              if (this.last && this.partial === this.last)
                  { return false; }
              else if (this.partial) {
                  this.last = this.partial;
                  contextifyTemplate(this);
              }
          }
          this.unbindAttrs();
          if (this.fn) {
              initMacro(this);
              if (isFunction(this.proxy.render))
                  { runloop.scheduleTask(function () { return _this.proxy.render(); }); }
          }
          else if (!this.partial) {
              warnOnceIfDebug("Could not find template for partial '" + this.name + "'");
          }
          return true;
      };
      Partial.prototype.render = function (target, occupants) {
          if (this.fn && this.fn._cssDef && !this.fn._cssDef.applied)
              { applyCSS(); }
          this.fragment.render(target, occupants);
          if (this.proxy && isFunction(this.proxy.render))
              { this.proxy.render(); }
      };
      Partial.prototype.unbind = function (view) {
          this.fragment.unbind(view);
          this.unbindAttrs(view);
          _super.prototype.unbind.call(this);
      };
      Partial.prototype.unbindAttrs = function (view) {
          var _this = this;
          if (this._attrs) {
              keys(this._attrs).forEach(function (k) {
                  _this._attrs[k].unbind(view);
              });
          }
      };
      Partial.prototype.unrender = function (shouldDestroy) {
          if (this.proxy && isFunction(this.proxy.teardown))
              { this.proxy.teardown(); }
          this.fragment.unrender(shouldDestroy);
      };
      Partial.prototype.update = function () {
          var _this = this;
          var proxy = this.proxy;
          this.updating = 1;
          if (this.dirtyAttrs) {
              this.dirtyAttrs = false;
              keys(this._attrs).forEach(function (k) { return _this._attrs[k].update(); });
              this.refreshAttrs();
              if (isFunction(proxy.update))
                  { proxy.update(this.handle.attributes); }
          }
          if (this.dirtyTemplate) {
              this.dirtyTemplate = false;
              this.resetTemplate() && this.fragment.resetTemplate(this.partial || []);
          }
          if (this.dirty) {
              this.dirty = false;
              if (proxy && isFunction(proxy.invalidate))
                  { proxy.invalidate(); }
              this.fragment.update();
          }
          this.externalChange = false;
          this.updating = 0;
      };
      return Partial;
  }(MustacheContainer));
  function createFragment(self, partial) {
      self.partial = self.last = partial;
      contextifyTemplate(self);
      var options = {
          owner: self,
          template: self.partial
      };
      if (self.yielder)
          { options.ractive = self.container.parent; }
      if (self.fn)
          { options.cssIds = self.fn._cssIds; }
      self.fragment = new Fragment(options);
  }
  function contextifyTemplate(self) {
      if (self.template.c) {
          self.partial = [
              { t: TemplateItemType$1.SECTION, n: TemplateItemType$1.SECTION_WITH, f: self.partial }
          ];
          assign(self.partial[0], self.template.c);
          if (self.yielder)
              { self.partial[0].y = self; }
          else
              { self.partial[0].z = self.template.z; }
      }
  }
  function partialFromValue(self, value, okToParse) {
      var tpl = value;
      if (isArray(tpl)) {
          self.partial = tpl;
      }
      else if (tpl && isObjectType(tpl)) {
          if (isArray(tpl.t))
              { self.partial = tpl.t; }
          else if (isString(tpl.template))
              { self.partial = parsePartial(tpl.template, tpl.template, self.ractive).t; }
      }
      else if (isFunction(tpl) && tpl.styleSet) {
          self.fn = tpl;
          if (self.fragment)
              { self.fragment.cssIds = tpl._cssIds; }
      }
      else if (tpl != null) {
          tpl = getPartialTemplate(self.ractive, '' + tpl, self.containerFragment || self.up);
          if (tpl) {
              self.name = value;
              if (tpl.styleSet) {
                  self.fn = tpl;
                  if (self.fragment)
                      { self.fragment.cssIds = tpl._cssIds; }
              }
              else
                  { self.partial = tpl; }
          }
          else if (okToParse) {
              self.partial = parsePartial('' + value, '' + value, self.ractive).t;
          }
          else {
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
          }
          else {
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
      }
      else {
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
      if (!template.p)
          { template.p = {}; }
      template.p = handle.partials = assign({}, template.p);
      if (!hasOwn(template.p, 'content'))
          { template.p.content = template.f || []; }
      if (isArray(fn.attributes)) {
          self._attrs = {};
          var invalidate_1 = function () {
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
                  fragment.bubble = invalidate_1;
                  // TSRChange - removed since findFirstNode is not defined on fragment
                  // fragment.findFirstNode = noop;
                  self._attrs[a.n] = fragment;
              });
          }
          else {
              template.p[extras] = [];
          }
      }
      else {
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
      if (!self.partial)
          { self.partial = []; }
      self.fnTemplate = self.partial;
      self.initing = 0;
      contextifyTemplate(self);
      fragment.resetTemplate(self.partial);
  }
  function parsePartial(name, partial, ractive) {
      var parsed;
      try {
          parsed = parser.parse(partial, parser.getParseOptions(ractive));
      }
      catch (e) {
          warnIfDebug("Could not parse partial from expression '" + name + "'\n" + e.message);
      }
      return parsed || { t: [] };
  }

  function asyncProxy(promise, options) {
      var _a = options.template, _b = _a.p, partials = _b === void 0 ? {} : _b, name = _a.e;
      var opts = __assign(__assign({}, options), { template: { t: TemplateItemType$1.ELEMENT, e: name }, macro: function (handle) {
              handle.setTemplate(partials['async-loading'] || []);
              promise.then(function (cmp) {
                  options.up.ractive.components[name] = cmp;
                  if (partials['async-loaded']) {
                      handle.partials.component = [options.template];
                      handle.setTemplate(partials['async-loaded']);
                  }
                  else {
                      handle.setTemplate([options.template]);
                  }
              }, function (err) {
                  if (partials['async-failed']) {
                      handle.aliasLocal('error', 'error');
                      handle.set('@local.error', err);
                      handle.setTemplate(partials['async-failed']);
                  }
                  else {
                      handle.setTemplate([]);
                  }
              });
          } });
      return new Partial(opts);
  }

  function extract(tpl, type, name) {
      var p = tpl.f.find(function (s) { return typeof s !== 'string' && s.t === type; });
      if (p && typeof p !== 'string') {
          if ('n' in p && p.n)
              { return [
                  {
                      t: TemplateItemType$1.ALIAS,
                      n: 54,
                      f: p.f || [],
                      z: [{ n: p.n, x: { r: "__await." + name } }]
                  }
              ]; }
          else
              { return p.f || []; }
      }
      else
          { return []; }
  }
  function Await(options) {
      var tpl = options.template;
      var success = extract(tpl, TemplateItemType$1.THEN, 'value');
      var error = extract(tpl, TemplateItemType$1.CATCH, 'error');
      var pending = extract(tpl, TemplateItemType$1.SECTION);
      var undef = extract(tpl, TemplateItemType$1.ELSE);
      var opts = __assign(__assign({}, options), { template: {
              t: TemplateItemType$1.ELEMENT,
              m: [
                  {
                      t: TemplateItemType$1.ATTRIBUTE,
                      n: 'for',
                      f: [{ t: TemplateItemType$1.INTERPOLATOR, r: tpl.r, rx: tpl.rx, x: tpl.x }]
                  }
              ]
          }, macro: function (handle, attrs) {
              handle.aliasLocal('__await');
              function update(attrs) {
                  if (attrs.for && isFunction(attrs.for.then)) {
                      handle.setTemplate(pending);
                      attrs.for.then(function (v) {
                          handle.set('@local.value', v);
                          handle.setTemplate(success);
                      }, function (e) {
                          handle.set('@local.error', e);
                          handle.setTemplate(error);
                      });
                  }
                  else if (isUndefined(attrs.for)) {
                      handle.setTemplate(undef);
                  }
                  else {
                      handle.set('@local.value', attrs.for);
                      handle.setTemplate(success);
                  }
              }
              update(attrs);
              return {
                  update: update
              };
          } });
      // TODO Integrate MacroFn with `attributes`
      opts.macro.attributes = ['for'];
      return new Partial(opts);
  }

  var Comment = /** @class */ (function (_super) {
      __extends(Comment, _super);
      function Comment(options) {
          return _super.call(this, options) || this;
      }
      Comment.prototype.bind = function () { };
      Comment.prototype.unbind = function () { };
      Comment.prototype.update = function () { };
      Comment.prototype.detach = function () {
          return detachNode(this.node);
      };
      Comment.prototype.firstNode = function () {
          return this.node;
      };
      Comment.prototype.render = function (target) {
          this.rendered = true;
          this.node = doc.createComment(this.template.c);
          target.appendChild(this.node);
      };
      Comment.prototype.toString = function () {
          return "<!-- " + this.template.c + " -->";
      };
      Comment.prototype.unrender = function (shouldDestroy) {
          if (this.rendered && shouldDestroy)
              { this.detach(); }
          this.rendered = false;
      };
      return Comment;
  }(Item));

  var RactiveModel = /** @class */ (function (_super) {
      __extends(RactiveModel, _super);
      function RactiveModel(ractive) {
          var _this = _super.call(this, ractive, '@this') || this;
          _this.ractive = ractive;
          return _this;
      }
      RactiveModel.prototype.joinKey = function (key) {
          var model = _super.prototype.joinKey.call(this, key);
          // TSRChange - `model instanceof LinkModel` -> was `!model.isLink`
          if ((key === 'root' || key === 'parent') && !(model instanceof LinkModel))
              { return initLink(model, key); }
          else if (key === 'data')
              { return this.ractive.viewmodel; }
          else if (key === 'cssData')
              { return this.ractive.constructor._cssModel; }
          return model;
      };
      return RactiveModel;
  }(SharedModel));
  function initLink(model, key) {
      model.applyValue = function (value) {
          this.parent.value[key] = value;
          if (value && value.viewmodel) {
              this.link(value.viewmodel.getRactiveModel(), key);
              this._link.markedAll();
          }
          else {
              this.link(create(Missing), key);
              this._link.markedAll();
          }
      };
      if (key === 'root') {
          var mark_1 = model.mark;
          model.mark = function (force) {
              if (this._marking)
                  { return; }
              this._marking = true;
              mark_1.apply(this, force);
              this._marking = false;
          };
      }
      model.applyValue(model.parent.ractive[key], !!key);
      model._link.set = function (v) { return model.applyValue(v); };
      model._link.applyValue = function (v) { return model.applyValue(v); };
      return model._link;
  }

  var specialModels = {
      '@this': function (root) {
          return root.getRactiveModel();
      },
      '@global': function () {
          return GlobalModel;
      },
      '@shared': function () {
          return SharedModel$1;
      },
      '@style': function (root) {
          return root.getRactiveModel().joinKey('cssData');
      },
      '@helpers': function (root) {
          return root.getHelpers();
      }
  };
  specialModels['@'] = specialModels['@this'];
  /**
   * ### Dependencies
   * - ExpressionProxy
   * - PatternObserver
   * - Observer
   */
  var RootModel = /** @class */ (function (_super) {
      __extends(RootModel, _super);
      function RootModel(options) {
          var _this = _super.call(this, null, null) || this;
          _this.update = noop;
          _this.isRoot = true;
          _this.root = _this;
          _this.ractive = options.ractive; // TODO sever this link
          _this.value = options.data;
          _this.adaptors = options.adapt;
          _this.adapt();
          return _this;
      }
      RootModel.prototype.attached = function (fragment) {
          attachImplicits(this, fragment);
      };
      RootModel.prototype.createLink = function (keypath, target, targetPath, options) {
          var keys = splitKeypath(keypath);
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          var model = this;
          while (keys.length) {
              var key = keys.shift();
              model = model.childByKey[key] || model.joinKey(key);
          }
          return model.link(target, targetPath, options);
      };
      RootModel.prototype.detached = function () {
          detachImplicits(this);
      };
      RootModel.prototype.get = function (shouldCapture, options) {
          if (shouldCapture)
              { capture(this); }
          if (!options || options.virtual !== false) {
              var asd = this.getVirtual();
              return asd;
          }
          else {
              return this.value;
          }
      };
      RootModel.prototype.getHelpers = function () {
          if (!this.helpers)
              { this.helpers = new SharedModel(this.ractive.helpers, 'helpers', this.ractive); }
          return this.helpers;
      };
      RootModel.prototype.getKeypath = function () {
          return '';
      };
      RootModel.prototype.getRactiveModel = function () {
          return this.ractiveModel || (this.ractiveModel = new RactiveModel(this.ractive));
      };
      RootModel.prototype.getValueChildren = function () {
          var children = _super.prototype.getValueChildren.call(this, this.value);
          this.children.forEach(function (child) {
              if (child._link) {
                  var idx = children.indexOf(child);
                  if (~idx)
                      { children.splice(idx, 1, child._link); }
                  else
                      { children.push(child._link); }
              }
          });
          return children;
      };
      RootModel.prototype.has = function (key) {
          if (key[0] === '~' && key[1] === '/')
              { key = key.slice(2); }
          if (specialModels[key] || key === '')
              { return true; }
          if (_super.prototype.has.call(this, key)) {
              return true;
          }
          else {
              var unescapedKey = unescapeKey(key);
              // mappings/links and computations
              if (this.childByKey[unescapedKey] && this.childByKey[unescapedKey]._link)
                  { return true; }
          }
      };
      RootModel.prototype.joinKey = function (key, opts) {
          if (key[0] === '~' && key[1] === '/')
              { key = key.slice(2); }
          if (key[0] === '@') {
              var fn = specialModels[key];
              if (fn)
                  { return fn(this); }
          }
          else {
              return _super.prototype.joinKey.call(this, key, opts);
          }
      };
      RootModel.prototype.set = function (value) {
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
          }
          else {
              this.value = value;
              this.adapt();
          }
          this.deps.forEach(handleChange);
          this.children.forEach(mark);
      };
      RootModel.prototype.retrieve = function () {
          var cose = this.wrapper ? this.wrapper.get() : this.value;
          return cose;
      };
      RootModel.prototype.teardown = function () {
          _super.prototype.teardown.call(this);
          this.ractiveModel && this.ractiveModel.teardown();
      };
      return RootModel;
  }(Model));
  function attachImplicits(model, fragment) {
      // TSRChange - attach function doesn't exists on RootModel maybe this code is no longer valid?
      // if (model._link && model._link.implicit && model._link.isDetached()) {
      //   model.attach(fragment);
      // }
      // look for virtual children to relink and cascade
      for (var k in model.childByKey) {
          if (model.value) {
              if (k in model.value) {
                  attachImplicits(model.childByKey[k], fragment);
              }
              else if (!model.childByKey[k]._link || model.childByKey[k]._link.isDetached()) {
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

  var dataConfigurator = {
      name: 'data',
      extend: function (_Parent, proto, options) {
          var key;
          var value;
          // check for non-primitives, which could cause mutation-related bugs
          if (isObject(options === null || options === void 0 ? void 0 : options.data)) {
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
          if (isFunction(result))
              { result = result.call(ractive); }
          // bind functions to the ractive instance at the top level,
          // unless it's a non-POJO (in which case alarm bells should ring)
          if (result && result.constructor === Object) {
              for (var prop in result) {
                  if (isFunction(result[prop])) {
                      var value = result[prop];
                      result[prop] = bind$1(value, ractive);
                      result[prop]._r_unbound = value;
                  }
              }
          }
          return result || {};
      }
      // TSRChange - it's seems that this method is not used
      // reset(this: DataManager, ractive): true {
      //   const result = this.init(ractive.constructor, ractive, ractive.viewmodel);
      //   ractive.viewmodel.root.set(result);
      //   return true;
      // }
  };
  function emptyData() {
      return {};
  }
  function validate(data) {
      // Warn if userOptions.data is a non-POJO
      if (data && data.constructor !== Object) {
          if (isFunction(data)) ;
          else if (!isObjectType(data)) {
              fatal("data option must be an object or a function, `" + data + "` is not valid");
          }
          else {
              warnIfDebug('If supplied, options.data should be a plain JavaScript object - using a non-POJO as the root object may work, but is discouraged');
          }
      }
  }
  function combine$1(parentValue, childValue) {
      validate(childValue);
      // Very important, otherwise child instance can become
      // the default data object on Ractive or a component.
      // then ractive.set() ends up setting on the prototype!
      if (!childValue && !isFunction(parentValue)) {
          // this needs to be a function so that it can still inherit parent defaults
          childValue = emptyData;
      }
      // Fast path, where we just need to copy properties from
      // parent to child
      if (!isFunction(childValue) && !isFunction(parentValue)) {
          return fromProperties(childValue, parentValue);
      }
      return function () {
          var child = isFunction(childValue) ? callDataFunction(childValue, this) : childValue;
          var parent = isFunction(parentValue) ? callDataFunction(parentValue, this) : parentValue;
          return fromProperties(child, parent);
      };
  }
  function callDataFunction(fn, context) {
      var data = fn.call(context);
      if (!data)
          { return; }
      if (!isObjectType(data)) {
          fatal('Data function must return an object');
      }
      if (data.constructor !== Object) {
          warnOnceIfDebug('Data function returned something other than a plain JavaScript object. This might work, but is strongly discouraged');
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

  function subscribe(instance, options, type) {
      var subs = (instance.constructor["_" + type] || []).concat(toPairs(options[type] || {}));
      var single = type === 'on' ? 'once' : type + "Once";
      subs.forEach(function (_a) {
          var target = _a[0], config = _a[1];
          if (isFunction(config)) {
              instance[type](target, config);
          }
          else if (isObjectType(config) &&
              isFunction(config.handler)) {
              instance[config.once ? single : type](target, config.handler, create(config));
          }
      });
  }

  var registryNames = [
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
      if (Ractive.DEBUG)
          { welcome(); }
      initialiseProperties(ractive);
      handleAttributes(ractive);
      // set up event subscribers
      subscribe(ractive, options, 'on');
      // if there's not a delegation setting, inherit from parent if it's not default
      if (!hasOwn(options, 'delegate') &&
          ractive.parent &&
          ractive.parent.delegate !== ractive.delegate) {
          ractive.delegate = false;
      }
      // plugins that need to run at construct
      if (isArray(options.use)) {
          // TODO refine plugin to handle construct prop
          ractive.use.apply(ractive, options.use.filter(function (p) { return p.construct; }));
      }
      hooks.construct.fire(ractive, options);
      if (options.onconstruct)
          { options.onconstruct.call(ractive, getRactiveContext(ractive), options); }
      // Add registries
      var i = registryNames.length;
      while (i--) {
          var name_1 = registryNames[i];
          ractive[name_1] = assign(create(ractive.constructor[name_1] || null), options[name_1]);
      }
      i = protoRegistries.length;
      while (i--) {
          var name_2 = protoRegistries[i];
          ractive[name_2] = assign(create(ractive.constructor.prototype[name_2]), options[name_2]);
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
      var instanceAdaptor = protoAdapt.map(lookup);
      var adapt = ensureArray(options.adapt).map(lookup);
      var srcs = [instanceAdaptor, adapt];
      if (ractive.parent && !ractive.isolated) {
          srcs.push(ractive.parent.viewmodel.adaptors);
      }
      return combine.apply(void 0, srcs);
      function lookup(adaptor) {
          if (isString(adaptor)) {
              var adaptorName = adaptor;
              adaptor = findInViewHierarchy('adaptors', ractive, adaptorName);
              if (!adaptor) {
                  fatal(missingPlugin(adaptorName, 'adaptor'));
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
          var props_1 = attrs.filter(function (a) { return a.t === TemplateItemType$1.ATTRIBUTE; }).map(function (a) { return a.n; });
          // warn about missing requireds
          attributes.required.forEach(function (p) {
              if (!~props_1.indexOf(p)) {
                  warnIfDebug("Component '" + component.name + "' requires attribute '" + p + "' to be provided");
              }
          });
          // set up a partial containing non-property attributes
          var all = __spreadArrays(attributes.optional, attributes.required);
          var partial = [];
          var i = attrs.length;
          while (i--) {
              var a = attrs[i];
              if (a.t === TemplateItemType$1.ATTRIBUTE && !~all.indexOf(a.n)) {
                  if (attributes.mapAll) {
                      // map the attribute if requested and make the extra attribute in the partial refer to the mapping
                      partial.unshift({
                          t: TemplateItemType$1.ATTRIBUTE,
                          n: a.n,
                          f: [{ t: TemplateItemType$1.INTERPOLATOR, r: "~/" + a.n }]
                      });
                  }
                  else {
                      // transfer the attribute to the extra attributes partial
                      partial.unshift(attrs.splice(i, 1)[0]);
                  }
              }
              else if (!attributes.mapAll &&
                  (a.t === TemplateItemType$1.DECORATOR ||
                      a.t === TemplateItemType$1.TRANSITION ||
                      a.t === TemplateItemType$1.BINDING_FLAG)) {
                  partial.unshift(attrs.splice(i, 1)[0]);
              }
          }
          if (partial.length)
              { component.template = { t: tpl.t, e: tpl.e, f: tpl.f, m: attrs, p: tpl.p }; }
          ractive._attributePartial = partial;
      }
  }

  // Teardown. This goes through the root fragment and all its children, removing observers
  // and generally cleaning up after itself
  function Ractive$teardown() {
      var _this = this;
      if (this.torndown) {
          warnIfDebug('ractive.teardown() was called on a Ractive instance that was already torn down');
          return Promise.resolve();
      }
      this.shouldDestroy = true;
      return teardown$2(this, function () { return (_this.fragment.rendered ? _this.unrender() : Promise.resolve()); });
  }
  function teardown$2(instance, getPromise) {
      instance.torndown = true;
      instance.fragment.unbind();
      instance._observers.slice().forEach(cancel);
      var el = instance.el;
      if (el === null || el === void 0 ? void 0 : el.__ractive_instances__) {
          removeFromArray(el.__ractive_instances__, instance);
      }
      var promise = getPromise();
      hooks.teardown.fire(instance);
      promise.then(function () {
          hooks.destruct.fire(instance);
          instance.viewmodel.teardown();
      });
      return promise;
  }

  var div$1 = doc ? createElement('div') : null;
  var attributes = false;
  function inAttributes() {
      return attributes;
  }
  var ConditionalAttribute = /** @class */ (function (_super) {
      __extends(ConditionalAttribute, _super);
      function ConditionalAttribute(options) {
          var _this = _super.call(this, options) || this;
          _this.attributes = [];
          _this.owner = options.owner;
          _this.fragment = new Fragment({
              ractive: _this.ractive,
              owner: _this,
              template: _this.template
          });
          // this fragment can't participate in node-y things
          _this.fragment.findNextNode = noop;
          _this.dirty = false;
          return _this;
      }
      ConditionalAttribute.prototype.bind = function () {
          this.fragment.bind();
      };
      ConditionalAttribute.prototype.bubble = function () {
          if (!this.dirty) {
              this.dirty = true;
              this.owner.bubble();
          }
      };
      ConditionalAttribute.prototype.destroyed = function () {
          this.unrender();
      };
      ConditionalAttribute.prototype.render = function () {
          this.node = this.owner.node;
          if (this.node) {
              this.isSvg = this.node.namespaceURI === Namespace$1.svg;
          }
          attributes = true;
          if (!this.rendered)
              { this.fragment.render(); }
          this.rendered = true;
          this.dirty = true; // TODO this seems hacky, but necessary for tests to pass in browser AND node.js
          this.update();
          attributes = false;
      };
      ConditionalAttribute.prototype.toString = function () {
          return this.fragment.toString();
      };
      ConditionalAttribute.prototype.unbind = function (view) {
          this.fragment.unbind(view);
      };
      ConditionalAttribute.prototype.unrender = function () {
          this.rendered = false;
          this.fragment.unrender();
      };
      ConditionalAttribute.prototype.update = function () {
          var _this = this;
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
                      _this.node.removeAttribute(a.name);
                  });
                  attrs.forEach(function (a) {
                      _this.node.setAttribute(a.name, a.value);
                  });
                  this.attributes = attrs;
              }
              attributes = current || false;
          }
      };
      return ConditionalAttribute;
  }(Item));
  var onlyWhitespace$1 = /^\s*$/;
  function parseAttributes(str, isSvg) {
      if (onlyWhitespace$1.test(str))
          { return []; }
      var tagName = isSvg ? 'svg' : 'div';
      if (str) {
          div$1.innerHTML = "<" + tagName + " " + str + "></" + tagName + ">";
          return toArray(div$1.childNodes[0].attributes);
      }
      return [];
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

  var Component = /** @class */ (function (_super) {
      __extends(Component, _super);
      function Component(options, ComponentConstructor) {
          var _this = _super.call(this, options) || this;
          var template = options.template;
          _this.isAnchor = template.t === TemplateItemType$1.ANCHOR;
          // override ELEMENT from super
          _this.type = _this.isAnchor ? TemplateItemType$1.ANCHOR : TemplateItemType$1.COMPONENT;
          var attrs = template.m;
          var partials = template.p || {};
          if (!('content' in partials))
              { partials.content = template.f || []; }
          _this._partials = partials; // TEMP
          if (_this.isAnchor) {
              _this.name = template.n;
              _this.addChild = addChild;
              _this.removeChild = removeChild;
          }
          else {
              var instance = new ComponentConstructor({ component: true });
              _this.instance = instance;
              _this.name = template.e;
              if (instance.el || instance.target) {
                  warnIfDebug("The <" + _this.name + "> component has a default '" + (instance.el ? 'el' : 'target') + "' property; it has been disregarded");
                  instance.el = instance.target = null;
              }
              // find container
              var fragment = options.up;
              var container = void 0;
              while (fragment) {
                  if (fragment.owner.type === TemplateItemType$1.YIELDER) {
                      container = fragment.owner.container;
                      break;
                  }
                  fragment = fragment.parent;
              }
              // add component-instance-specific properties
              instance.parent = _this.up.ractive;
              instance.container = container || null;
              instance.root = instance.parent.root;
              instance.component = _this;
              construct(_this.instance, { partials: partials } /* ComponentConstructor */);
              // these can be modified during construction
              template = _this.template;
              attrs = template.m;
              // allow components that are so inclined to add programmatic mappings
              if (isArray(_this.mappings)) {
                  attrs = (attrs || []).concat(_this.mappings);
              }
              else if (isString(_this.mappings)) {
                  var parsedMappings = parser.parse(_this.mappings, { attributes: true });
                  attrs = (attrs || []).concat(parsedMappings.t);
              }
              // for hackability, this could be an open option
              // for any ractive instance, but for now, just
              // for components and just for ractive...
              instance._inlinePartials = partials;
          }
          _this.attributeByName = {};
          _this.attributes = [];
          if (attrs) {
              var leftovers_1 = [];
              attrs.forEach(function (template) {
                  switch (template.t) {
                      case TemplateItemType$1.ATTRIBUTE:
                      case TemplateItemType$1.EVENT:
                          _this.attributes.push(createItem({
                              owner: _this,
                              up: _this.up,
                              template: template
                          }));
                          break;
                      case TemplateItemType$1.TRANSITION:
                      case TemplateItemType$1.BINDING_FLAG:
                      case TemplateItemType$1.DECORATOR:
                          break;
                      default:
                          leftovers_1.push(template);
                          break;
                  }
              });
              if (leftovers_1.length) {
                  _this.attributes.push(new ConditionalAttribute({
                      owner: _this,
                      up: _this.up,
                      template: leftovers_1
                  }));
              }
          }
          return _this;
          // this.eventHandlers = [];
      }
      Component.prototype.bind = function () {
          if (!this.isAnchor) {
              this.attributes.forEach(bind);
              // this.eventHandlers.forEach(bind);
              initialise(this.instance, {
                  partials: this._partials
              }, {
                  cssIds: this.up.cssIds
              });
              if (this.instance.target || this.instance.el)
                  { this.extern = true; }
              this.bound = true;
          }
      };
      Component.prototype.bubble = function () {
          if (!this.dirty) {
              this.dirty = true;
              this.up.bubble();
          }
      };
      Component.prototype.destroyed = function () {
          if (!this.isAnchor && this.instance.fragment)
              { this.instance.fragment.destroyed(); }
      };
      Component.prototype.detach = function () {
          if (this.isAnchor) {
              if (this.instance)
                  { return this.instance.fragment.detach(); }
              return createDocumentFragment();
          }
          return this.instance.fragment.detach();
      };
      Component.prototype.find = function (selector, options) {
          if (this.instance)
              { return this.instance.fragment.find(selector, options); }
      };
      Component.prototype.findAll = function (selector, options) {
          if (this.instance)
              { this.instance.fragment.findAll(selector, options); }
      };
      Component.prototype.findComponent = function (name, options) {
          if (!name || this.name === name)
              { return this.instance; }
          if (this.instance.fragment) {
              return this.instance.fragment.findComponent(name, options);
          }
      };
      Component.prototype.findAllComponents = function (name, options) {
          var result = options.result;
          if (this.instance && (!name || this.name === name)) {
              result.push(this.instance);
          }
          if (this.instance)
              { this.instance.findAllComponents(name, options); }
      };
      Component.prototype.firstNode = function (skipParent) {
          if (this.instance)
              { return this.instance.fragment.firstNode(skipParent); }
      };
      Component.prototype.getContext = function () {
          var arguments$1 = arguments;

          var assigns = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              assigns[_i] = arguments$1[_i];
          }
          return getRactiveContext.apply(void 0, __spreadArrays([this.instance], assigns));
      };
      Component.prototype.rebound = function (update) {
          this.attributes.forEach(function (x) { return x.rebound(update); });
      };
      Component.prototype.render = function (target, occupants) {
          if (this.isAnchor) {
              this.rendered = true;
              this.target = target;
              if (!checking.length) {
                  checking.push(this.ractive);
                  if (occupants) {
                      this.occupants = occupants;
                      checkAnchors();
                      this.occupants = null;
                  }
                  else {
                      runloop.scheduleTask(checkAnchors, true);
                  }
              }
          }
          else {
              this.attributes.forEach(render);
              // this.eventHandlers.forEach(callRender);
              if (this.extern) {
                  this.instance.delegate = false;
                  // TSRChange - add undefined params to avoid ts errors
                  this.instance.render(undefined, undefined);
              }
              else {
                  render$1(this.instance, target, null, occupants);
              }
              this.rendered = true;
          }
      };
      Component.prototype.shuffled = function () {
          _super.prototype.shuffled.call(this);
          this.instance &&
              !this.instance.isolated &&
              this.instance.fragment &&
              this.instance.fragment.shuffled();
      };
      Component.prototype.toString = function () {
          if (this.instance)
              { return this.instance.toHTML(); }
      };
      Component.prototype.unbind = function (view) {
          if (!this.isAnchor) {
              this.bound = false;
              this.attributes.forEach(unbind);
              if (view)
                  { this.instance.fragment.unbind(); }
              else
                  { teardown$2(this.instance, function () { return runloop.promise(); }); }
          }
      };
      Component.prototype.unrender = function (shouldDestroy) {
          this.shouldDestroy = shouldDestroy;
          if (this.isAnchor) {
              if (this.item)
                  { unrenderItem(this, this.item); }
              this.target = null;
              if (!checking.length) {
                  checking.push(this.ractive);
                  runloop.scheduleTask(checkAnchors, true);
              }
          }
          else {
              this.instance.unrender();
              this.instance.el = this.instance.target = null;
              this.attributes.forEach(unrender);
              // this.eventHandlers.forEach(unrender);
          }
          this.rendered = false;
      };
      Component.prototype.update = function () {
          this.dirty = false;
          if (this.instance) {
              this.instance.fragment.update();
              this.attributes.forEach(update);
              // this.eventHandlers.forEach(update);
          }
      };
      return Component;
  }(Item));
  // TODO understand what is meta
  function addChild(meta) {
      if (this.item)
          { this.removeChild(this.item); }
      var child = meta.instance;
      meta.anchor = this;
      meta.up = this.up;
      meta.name = meta.nameOption || this.name;
      this.name = meta.name;
      if (!child.isolated)
          { child.viewmodel.attached(this.up); }
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
      if (!anchor.rendered)
          { return; }
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
      anchor.attributes.forEach(bind);
      // anchor.eventHandlers.forEach(bind);
      anchor.attributes.forEach(render);
      // anchor.eventHandlers.forEach(callRender);
      var target = anchor.up.findParentNode();
      render$1(meta.instance, target, target.contains(nextNode) ? nextNode : null, anchor.occupants);
      if (meta.lastBound !== anchor) {
          meta.lastBound = anchor;
      }
  }
  function unrenderItem(anchor, meta) {
      if (!anchor.rendered)
          { return; }
      meta.shouldDestroy = true;
      meta.instance.unrender();
      // anchor.eventHandlers.forEach(unrender);
      anchor.attributes.forEach(unrender);
      // anchor.eventHandlers.forEach(unbind);
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
      list.forEach(function (it) { return updateAnchors(it); });
  }

  // finds the component constructor in the registry or view hierarchy registries
  function getComponentConstructor(ractive, name) {
      var _a;
      var instance = findInstance('components', ractive, name);
      var Component;
      if (instance) {
          Component = instance.components[name];
          if (Component && !Component.isInstance) {
              if ((_a = Component.default) === null || _a === void 0 ? void 0 : _a.isInstance)
                  { Component = Component.default; }
              // TSRChange - change match to from `!Component.then` to `instanceof Promise`
              else if (!(Component instanceof Promise) && isFunction(Component)) {
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

  var Mapping = /** @class */ (function (_super) {
      __extends(Mapping, _super);
      function Mapping(options) {
          var _this = _super.call(this, options) || this;
          _this.name = options.template.n;
          _this.owner = options.owner || options.up.owner || options.element || findElement(options.up);
          _this.element =
              options.element || ('attributeByName' in _this.owner ? _this.owner : findElement(options.up));
          _this.up = _this.element.up; // shared
          _this.ractive = _this.up.ractive;
          _this.element.attributeByName[_this.name] = _this;
          _this.value = options.template.f;
          return _this;
      }
      Mapping.prototype.bind = function () {
          var template = this.template.f;
          var viewmodel = this.element.instance.viewmodel;
          if (template === 0) {
              // empty attributes are `true`
              viewmodel.joinKey(this.name).set(true);
          }
          else if (isString(template)) {
              var parsed = parseJSON(template);
              viewmodel.joinKey(this.name).set(parsed ? parsed.value : template);
          }
          else if (isArray(template)) {
              createMapping(this);
          }
      };
      Mapping.prototype.rebound = function (update) {
          if (this.boundFragment)
              { this.boundFragment.rebound(update); }
          if (this.link) {
              this.model = resolve$1(this.up, this.template.f[0]);
              var model = this.element.instance.viewmodel.joinAll(splitKeypath(this.name));
              model.link(this.model, this.name, { mapping: true });
          }
      };
      Mapping.prototype.render = function () { };
      Mapping.prototype.unbind = function (view) {
          // Check casting
          if (this.model)
              { this.model.unregister(this); }
          if (this.boundFragment)
              { this.boundFragment.unbind(view); }
          if (this.element.bound) {
              if (this.link.target === this.model)
                  { this.link.owner.unlink(); }
          }
      };
      Mapping.prototype.unrender = function () { };
      Mapping.prototype.update = function () {
          if (this.dirty) {
              this.dirty = false;
              if (this.boundFragment)
                  { this.boundFragment.update(); }
          }
      };
      return Mapping;
  }(Item));
  function createMapping(item) {
      var template = item.template.f;
      var viewmodel = item.element.instance.viewmodel;
      var childData = viewmodel.value;
      if (isArray(template) &&
          template.length === 1 &&
          typeof template[0] !== 'string' &&
          template[0].t === TemplateItemType$1.INTERPOLATOR) {
          var model = resolve$1(item.up, template[0]);
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
          }
          else if (!isObjectType(val) || template[0].x) {
              // copy non-object, non-computed vals through
              // TODO check if splitKeypath is needed since joinKey works with plain string
              viewmodel.joinKey(splitKeypath(item.name)).set(val);
          }
          else {
              // warn about trying to copy an object
              warnIfDebug("Cannot copy non-computed object value from static mapping '" + item.name + "'");
          }
          // TSRChange - remove unregister invocation since it has no param an at least 1 param is needed
          // if the item isn't going to manage the model, give it a change to tear down if it's computed
          // if (model !== item.model) model.unregister();
      }
      else {
          item.boundFragment = new Fragment({
              owner: item,
              template: template
          }).bind();
          // TODO check if splitKeypath is needed since joinKey works with plain string
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

  var Doctype = /** @class */ (function (_super) {
      __extends(Doctype, _super);
      function Doctype() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Doctype.prototype.toString = function () {
          return '<!DOCTYPE' + this.template.a + '>';
      };
      Doctype.prototype.bind = function () { };
      Doctype.prototype.render = function () { };
      Doctype.prototype.teardown = function () { };
      Doctype.prototype.unbind = function () { };
      Doctype.prototype.unrender = function () { };
      Doctype.prototype.update = function () { };
      return Doctype;
  }(Item));

  var Binding = /** @class */ (function () {
      function Binding(element, name) {
          if (name === void 0) { name = 'value'; }
          this.element = element;
          this.ractive = element.ractive;
          this.attribute = element.attributeByName[name];
          var interpolator = this.attribute.interpolator;
          interpolator.twowayBinding = this;
          var model = interpolator.model;
          if (model.isReadonly && !('setRoot' in model)) {
              var keypath = model.getKeypath().replace(/^@/, '');
              warnOnceIfDebug("Cannot use two-way binding on <" + element.name + "> element: " + keypath + " is read-only. To suppress this warning use <" + element.name + " twoway='false'...>", { ractive: this.ractive });
              return;
          }
          this.attribute.isTwoway = true;
          this.model = model;
          // initialise value, if it's undefined
          var value = model.get();
          this.wasUndefined = isUndefined(value);
          // Use any casting since not all bindings have getInitialValue function
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (isUndefined(value) && typeof this.getInitialValue === 'function') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value = this.getInitialValue();
              model.set(value);
          }
          this.lastVal(true, value);
          var parentForm = findElement(this.element, false, 'form');
          if (parentForm) {
              this.resetValue = value;
              parentForm.formBindings.push(this);
          }
      }
      Binding.prototype.bind = function () {
          this.model.registerTwowayBinding(this);
      };
      Binding.prototype.handleChange = function () {
          var _this = this;
          var value = this.getValue();
          if (this.lastVal() === value)
              { return; }
          runloop.start();
          this.attribute.locked = true;
          this.model.set(value);
          this.lastVal(true, value);
          // if the value changes before observers fire, unlock to be updatable cause something weird and potentially freezy is up
          if (this.model.get() !== value)
              { this.attribute.locked = false; }
          else
              { runloop.scheduleTask(function () { return (_this.attribute.locked = false); }); }
          runloop.end();
      };
      Binding.prototype.lastVal = function (setting, value) {
          if (setting)
              { this.lastValue = value; }
          else
              { return this.lastValue; }
      };
      Binding.prototype.rebind = function (next, previous) {
          var _this = this;
          if (this.model && this.model === previous)
              { previous.unregisterTwowayBinding(this); }
          if (next) {
              this.model = next;
              runloop.scheduleTask(function () { return next.registerTwowayBinding(_this); });
          }
      };
      Binding.prototype.rebound = function () {
          if (this.model)
              { this.model.unregisterTwowayBinding(this); }
          this.model = this.attribute.interpolator.model;
          this.model && this.model.registerTwowayBinding(this);
      };
      Binding.prototype.render = function () {
          this.node = this.element.node;
          this.node._ractive.binding = this;
          this.rendered = true;
      };
      Binding.prototype.setFromNode = function (node) {
          this.model.set(node.value);
      };
      Binding.prototype.unbind = function () {
          this.model && this.model.unregisterTwowayBinding(this);
      };
      return Binding;
  }());

  /**
   * This is the handler for DOM events that would lead to a change in the model
   * (i.e. change, sometimes, input, and occasionally click and keyup)
   */
  function handleDomEvent() {
      this._ractive.binding.handleChange();
  }

  var CheckboxBinding = /** @class */ (function (_super) {
      __extends(CheckboxBinding, _super);
      function CheckboxBinding(element) {
          return _super.call(this, element, 'checked') || this;
      }
      CheckboxBinding.prototype.render = function () {
          _super.prototype.render.call(this);
          this.element.on('change', handleDomEvent);
          // TSRChange - change guard using `in`
          if ('attachEvent' in this.node) {
              this.element.on('click', handleDomEvent);
          }
      };
      CheckboxBinding.prototype.unrender = function () {
          this.element.off('change', handleDomEvent);
          // TSRChange - change guard using `in`
          if ('attachEvent' in this.node) {
              this.element.off('click', handleDomEvent);
          }
      };
      CheckboxBinding.prototype.getInitialValue = function () {
          return !!this.element.getAttribute('checked');
      };
      CheckboxBinding.prototype.getValue = function () {
          return this.node.checked;
      };
      CheckboxBinding.prototype.setFromNode = function (node) {
          this.model.set(node.checked);
      };
      return CheckboxBinding;
  }(Binding));

  function getBindingGroup(group, model, getValue) {
      var hash = group + "-bindingGroup";
      return model[hash] || (model[hash] = new BindingGroup(hash, model, getValue));
  }
  /**
   * Value is the value processed in the Item
   *
   * BindingType is the Binding where the group is attached
   */
  var BindingGroup = /** @class */ (function () {
      function BindingGroup(hash, model, getValue) {
          var _this = this;
          this.rebind = Binding.prototype.rebind;
          this.model = model;
          this.hash = hash;
          this.getValue = function () {
              _this.value = getValue.call(_this);
              return _this.value;
          };
          this.bindings = [];
          // avoid ts errors
          this.noInitialValue = undefined;
      }
      BindingGroup.prototype.add = function (binding) {
          this.bindings.push(binding);
      };
      BindingGroup.prototype.bind = function () {
          var _this = this;
          this.value = this.model.get();
          this.bindings.forEach(function (b) { return b.lastVal(true, _this.value); });
          this.model.registerTwowayBinding(this);
          this.bound = true;
      };
      BindingGroup.prototype.remove = function (binding) {
          removeFromArray(this.bindings, binding);
          if (!this.bindings.length) {
              this.unbind();
          }
      };
      BindingGroup.prototype.unbind = function () {
          this.model.unregisterTwowayBinding(this);
          this.bound = false;
          delete this.model[this.hash];
      };
      return BindingGroup;
  }());

  var push = [].push;
  /** `this` must be a {@link BindingGroup} instance */
  function getValue() {
      var _this = this;
      var all = this.bindings
          .filter(function (b) { var _a; return (_a = b.node) === null || _a === void 0 ? void 0 : _a.checked; })
          .map(function (b) { return b.element.getAttribute('value'); });
      var res = [];
      all.forEach(function (v) {
          if (!_this.bindings[0].arrayContains(res, v))
              { res.push(v); }
      });
      return res;
  }
  var CheckboxNameBinding = /** @class */ (function (_super) {
      __extends(CheckboxNameBinding, _super);
      function CheckboxNameBinding(element) {
          var _this = _super.call(this, element, 'name') || this;
          _this.checkboxName = true; // so that ractive.updateModel() knows what to do with this
          // Each input has a reference to an array containing it and its
          // group, as two-way binding depends on being able to ascertain
          // the status of all inputs within the group
          _this.group = getBindingGroup('checkboxes', _this.model, getValue);
          _this.group.add(_this);
          if (_this.noInitialValue) {
              _this.group.noInitialValue = true;
          }
          // If no initial value was set, and this input is checked, we
          // update the model
          if (_this.group.noInitialValue && _this.element.getAttribute('checked')) {
              var existingValue = _this.model.get();
              var bindingValue = _this.element.getAttribute('value');
              if (!_this.arrayContains(existingValue, bindingValue)) {
                  push.call(existingValue, bindingValue); // to avoid triggering runloop with array adaptor
              }
          }
          return _this;
      }
      CheckboxNameBinding.prototype.bind = function () {
          if (!this.group.bound) {
              this.group.bind();
          }
      };
      CheckboxNameBinding.prototype.getInitialValue = function () {
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
      CheckboxNameBinding.prototype.getValue = function () {
          return this.group.value;
      };
      CheckboxNameBinding.prototype.handleChange = function () {
          this.isChecked = this.element.node.checked;
          this.group.value = this.model.get().slice();
          var value = this.element.getAttribute('value');
          if (this.isChecked && !this.arrayContains(this.group.value, value)) {
              this.group.value.push(value);
          }
          else if (!this.isChecked && this.arrayContains(this.group.value, value)) {
              this.removeFromArray(this.group.value, value);
          }
          // make sure super knows there's a change
          this.lastValue = null;
          _super.prototype.handleChange.call(this);
      };
      CheckboxNameBinding.prototype.render = function () {
          _super.prototype.render.call(this);
          var node = this.node;
          var existingValue = this.model.get();
          var bindingValue = this.element.getAttribute('value');
          if (isArray(existingValue)) {
              this.isChecked = this.arrayContains(existingValue, bindingValue);
          }
          else {
              this.isChecked = this.element.compare(existingValue, bindingValue);
          }
          node.name = '{{' + this.model.getKeypath() + '}}';
          node.checked = this.isChecked;
          this.element.on('change', handleDomEvent);
          // in case of IE emergency, bind to click event as well
          // TSRChange - change guard using `in`
          if ('attachEvent' in this.node) {
              this.element.on('click', handleDomEvent);
          }
      };
      CheckboxNameBinding.prototype.setFromNode = function (node) {
          this.group.bindings.forEach(function (binding) { return (binding.wasUndefined = true); });
          if (node.checked) {
              var valueSoFar = this.group.getValue();
              valueSoFar.push(this.element.getAttribute('value'));
              this.group.model.set(valueSoFar);
          }
      };
      CheckboxNameBinding.prototype.unbind = function () {
          this.group.remove(this);
      };
      CheckboxNameBinding.prototype.unrender = function () {
          var el = this.element;
          el.off('change', handleDomEvent);
          // TSRChange - change guard using `in`
          if ('attachEvent' in this.node) {
              el.off('click', handleDomEvent);
          }
      };
      CheckboxNameBinding.prototype.arrayContains = function (selectValue, optionValue) {
          var i = selectValue.length;
          while (i--) {
              if (this.element.compare(optionValue, selectValue[i]))
                  { return true; }
          }
          return false;
      };
      CheckboxNameBinding.prototype.removeFromArray = function (array, item) {
          if (!array)
              { return; }
          var i = array.length;
          while (i--) {
              if (this.element.compare(item, array[i])) {
                  array.splice(i, 1);
              }
          }
      };
      return CheckboxNameBinding;
  }(Binding));

  var ContentEditableBinding = /** @class */ (function (_super) {
      __extends(ContentEditableBinding, _super);
      function ContentEditableBinding() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ContentEditableBinding.prototype.getInitialValue = function () {
          return this.element.fragment ? this.element.fragment.toString() : '';
      };
      ContentEditableBinding.prototype.getValue = function () {
          return this.element.node.innerHTML;
      };
      ContentEditableBinding.prototype.render = function () {
          _super.prototype.render.call(this);
          var el = this.element;
          el.on('change', handleDomEvent);
          el.on('blur', handleDomEvent);
          if (!this.ractive.lazy) {
              el.on('input', handleDomEvent);
              // TSRChange - change guard using `in`
              if ('attachEvent' in this.node) {
                  el.on('keyup', handleDomEvent);
              }
          }
      };
      ContentEditableBinding.prototype.setFromNode = function (node) {
          this.model.set(node.innerHTML);
      };
      ContentEditableBinding.prototype.unrender = function () {
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
      return function () {
          var _this = this;
          if (timeout)
              { clearTimeout(timeout); }
          timeout = setTimeout(function () {
              var binding = _this._ractive.binding;
              if (binding.rendered)
                  { handleDomEvent.call(_this); }
              timeout = null;
          }, delay);
      };
  }
  var GenericBinding = /** @class */ (function (_super) {
      __extends(GenericBinding, _super);
      function GenericBinding() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      GenericBinding.prototype.getInitialValue = function () {
          return '';
      };
      GenericBinding.prototype.getValue = function () {
          return this.node.value;
      };
      GenericBinding.prototype.render = function () {
          _super.prototype.render.call(this);
          // any lazy setting for this element overrides the root
          // if the value is a number, it's a timeout
          var lazy = this.ractive.lazy;
          var timeout = 0;
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
                  // TSRChange - change condition using in
                  // IE is a special snowflake
                  if ('attachEvent' in node) {
                      el.on('keyup', this.handler);
                  }
              }
              el.on('blur', handleBlur);
          }
      };
      GenericBinding.prototype.unrender = function () {
          var el = this.element;
          this.rendered = false;
          el.off('change', handleDomEvent);
          el.off('input', this.handler);
          el.off('keyup', this.handler);
          el.off('blur', handleBlur);
      };
      return GenericBinding;
  }(Binding));

  var FileBinding = /** @class */ (function (_super) {
      __extends(FileBinding, _super);
      function FileBinding() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      FileBinding.prototype.getInitialValue = function () {
          /* istanbul ignore next */
          return undefined;
      };
      FileBinding.prototype.getValue = function () {
          /* istanbul ignore next */
          return this.node.files;
      };
      FileBinding.prototype.render = function () {
          /* istanbul ignore next */
          this.element.lazy = false;
          /* istanbul ignore next */
          _super.prototype.render.call(this);
      };
      FileBinding.prototype.setFromNode = function (node) {
          /* istanbul ignore next */
          this.model.set(node.files);
      };
      return FileBinding;
  }(GenericBinding));

  function getSelectedOptions(select) {
      /* istanbul ignore next */
      if (select.selectedOptions) {
          return toArray(select.selectedOptions);
      }
      else if (select.options) {
          return toArray(select.options).filter(function (option) { return option.selected; });
      }
      return [];
  }

  var MultipleSelectBinding = /** @class */ (function (_super) {
      __extends(MultipleSelectBinding, _super);
      function MultipleSelectBinding() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      MultipleSelectBinding.prototype.getInitialValue = function () {
          return this.element.options
              .filter(function (option) { return option.getAttribute('selected'); })
              .map(function (option) { return option.getAttribute('value'); });
      };
      MultipleSelectBinding.prototype.getValue = function () {
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
      MultipleSelectBinding.prototype.handleChange = function () {
          var attribute = this.attribute;
          var previousValue = attribute.getValue();
          var value = this.getValue();
          if (isUndefined(previousValue) || !arrayContentsMatch(value, previousValue)) {
              _super.prototype.handleChange.call(this);
          }
          return this;
      };
      MultipleSelectBinding.prototype.render = function () {
          _super.prototype.render.call(this);
          this.element.on('change', handleDomEvent);
          if (isUndefined(this.model.get())) {
              // get value from DOM, if possible
              this.handleChange();
          }
      };
      MultipleSelectBinding.prototype.setFromNode = function (node) {
          var selectedOptions = getSelectedOptions(node);
          var i = selectedOptions.length;
          var result = new Array(i);
          while (i--) {
              var option = selectedOptions[i];
              result[i] = option._ractive ? option._ractive.value : option.value;
          }
          this.model.set(result);
      };
      MultipleSelectBinding.prototype.unrender = function () {
          this.element.off('change', handleDomEvent);
      };
      return MultipleSelectBinding;
  }(Binding));

  var NumericBinding = /** @class */ (function (_super) {
      __extends(NumericBinding, _super);
      function NumericBinding() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      /** @override */
      NumericBinding.prototype.getInitialValue = function () {
          return undefined;
      };
      /** @override */
      NumericBinding.prototype.getValue = function () {
          var value = parseFloat(this.node.value);
          return isNaN(value) ? undefined : value;
      };
      NumericBinding.prototype.setFromNode = function (node) {
          var value = parseFloat(node.value);
          if (!isNaN(value))
              { this.model.set(value); }
      };
      return NumericBinding;
  }(GenericBinding));

  var siblings = {};
  function getSiblings(hash) {
      return siblings[hash] || (siblings[hash] = []);
  }
  var RadioBinding = /** @class */ (function (_super) {
      __extends(RadioBinding, _super);
      function RadioBinding(element) {
          var _this = _super.call(this, element, 'checked') || this;
          _this.siblings = getSiblings(_this.ractive._guid + _this.element.getAttribute('name'));
          _this.siblings.push(_this);
          return _this;
      }
      RadioBinding.prototype.getValue = function () {
          return this.node.checked;
      };
      RadioBinding.prototype.handleChange = function () {
          runloop.start();
          this.siblings.forEach(function (binding) {
              binding.model.set(binding.getValue());
          });
          runloop.end();
      };
      RadioBinding.prototype.render = function () {
          _super.prototype.render.call(this);
          this.element.on('change', handleDomEvent);
          // TSRChange - change condition using in
          if ('attachEvent' in this.node) {
              this.element.on('click', handleDomEvent);
          }
      };
      RadioBinding.prototype.setFromNode = function (node) {
          this.model.set(node.checked);
      };
      RadioBinding.prototype.unbind = function () {
          removeFromArray(this.siblings, this);
      };
      RadioBinding.prototype.unrender = function () {
          this.element.off('change', handleDomEvent);
          // TSRChange - change condition using in
          if ('attachEvent' in this.node) {
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
  var RadioNameBinding = /** @class */ (function (_super) {
      __extends(RadioNameBinding, _super);
      function RadioNameBinding(element) {
          var _this = _super.call(this, element, 'name') || this;
          _this.group = getBindingGroup('radioname', _this.model, getValue$1);
          _this.group.add(_this);
          if (element.checked) {
              _this.group.value = _this.getValue();
          }
          _this.attribute.interpolator.pathChanged = function () { return _this.updateName(); };
          return _this;
      }
      RadioNameBinding.prototype.bind = function () {
          if (!this.group.bound) {
              this.group.bind();
          }
      };
      RadioNameBinding.prototype.getInitialValue = function () {
          if (this.element.getAttribute('checked')) {
              return this.element.getAttribute('value');
          }
      };
      RadioNameBinding.prototype.getValue = function () {
          return this.element.getAttribute('value');
      };
      RadioNameBinding.prototype.handleChange = function () {
          // If this <input> is the one that's checked, then the value of its
          // `name` model gets set to its value
          if (this.node.checked) {
              this.group.value = this.getValue();
              _super.prototype.handleChange.call(this);
          }
          this.updateName();
      };
      RadioNameBinding.prototype.lastVal = function (setting, value) {
          if (!this.group)
              { return; }
          if (setting)
              { this.group.lastValue = value; }
          else
              { return this.group.lastValue; }
      };
      RadioNameBinding.prototype.rebind = function (next, previous) {
          _super.prototype.rebind.call(this, next, previous);
          this.updateName();
      };
      RadioNameBinding.prototype.rebound = function () {
          _super.prototype.rebound.call(this);
          this.updateName();
      };
      RadioNameBinding.prototype.render = function () {
          _super.prototype.render.call(this);
          var node = this.node;
          this.updateName();
          node.checked = this.element.compare(this.model.get(), this.element.getAttribute('value'));
          this.element.on('change', handleDomEvent);
          // TSRChange - change condition using in
          if ('attachEvent' in node) {
              this.element.on('click', handleDomEvent);
          }
      };
      RadioNameBinding.prototype.setFromNode = function (node) {
          if (node.checked) {
              this.group.model.set(this.element.getAttribute('value'));
          }
      };
      RadioNameBinding.prototype.unbind = function () {
          this.group.remove(this);
      };
      RadioNameBinding.prototype.unrender = function () {
          var el = this.element;
          el.off('change', handleDomEvent);
          // TSRChange - change condition using in
          if ('attachEvent' in this.node) {
              el.off('click', handleDomEvent);
          }
      };
      RadioNameBinding.prototype.updateName = function () {
          if (this.node)
              { this.node.name = "{{" + this.model.getKeypath() + "}}"; }
      };
      return RadioNameBinding;
  }(Binding));

  var SingleSelectBinding = /** @class */ (function (_super) {
      __extends(SingleSelectBinding, _super);
      function SingleSelectBinding() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      SingleSelectBinding.prototype.forceUpdate = function () {
          var _this = this;
          var value = this.getValue();
          if (value !== undefined) {
              this.attribute.locked = true;
              runloop.scheduleTask(function () { return (_this.attribute.locked = false); });
              this.model.set(value);
          }
      };
      SingleSelectBinding.prototype.getInitialValue = function () {
          if (this.element.getAttribute('value') !== undefined) {
              return;
          }
          var options = this.element.options;
          var len = options.length;
          if (!len)
              { return; }
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
      SingleSelectBinding.prototype.getValue = function () {
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
      SingleSelectBinding.prototype.render = function () {
          _super.prototype.render.call(this);
          this.element.on('change', handleDomEvent);
      };
      SingleSelectBinding.prototype.setFromNode = function (node) {
          // todo add correct type when we will have an inrerface for augmented HTML elements
          var option = getSelectedOptions(node)[0];
          this.model.set(option._ractive ? option._ractive.value : option.value);
      };
      SingleSelectBinding.prototype.unrender = function () {
          this.element.off('change', handleDomEvent);
      };
      return SingleSelectBinding;
  }(Binding));

  function isBindable(attribute) {
      var _a;
      // The fragment must be a single non-string fragment
      if (!((_a = attribute === null || attribute === void 0 ? void 0 : attribute.template) === null || _a === void 0 ? void 0 : _a.f) || attribute.template.f.length !== 1 || attribute.template.f[0].s)
          { return false; }
      var attributeTemplateType = attribute.template.f[0].t;
      // A binding is an interpolator `{{ }}`, yey.
      if (attributeTemplateType === TemplateItemType$1.INTERPOLATOR)
          { return true; }
      // The above is probably the only true case. For the rest, show an appropriate
      // warning before returning false.
      // You can't bind a triple curly. HTML values on an attribute makes no sense.
      if (attributeTemplateType === TemplateItemType$1.TRIPLE)
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
                  warnIfDebug('A radio input can have two-way binding on its name attribute, or its checked attribute - not both', { ractive: element.root });
                  return RadioNameBinding;
              }
              if (isBindableByName)
                  { return RadioNameBinding; }
              if (isBindableByChecked)
                  { return RadioBinding; }
              // Dead end. Unknown binding on radio input.
              return null;
          }
          if (type === 'checkbox') {
              var isBindableByName = isBindable(attributes.name);
              var isBindableByChecked = isBindable(attributes.checked);
              // A checkbox with bindings for both name and checked. Checked treated as
              // the checkbox value, name is treated as a regular binding.
              //
              // See https://github.com/ractivejs/ractive/issues/1749
              if (isBindableByName && isBindableByChecked)
                  { return CheckboxBinding; }
              if (isBindableByName)
                  { return CheckboxNameBinding; }
              if (isBindableByChecked)
                  { return CheckboxBinding; }
              // Dead end. Unknown binding on checkbox input.
              return null;
          }
          if (type === 'file' && isBindableByValue)
              { return FileBinding; }
          if (type === 'number' && isBindableByValue)
              { return NumericBinding; }
          if (type === 'range' && isBindableByValue)
              { return NumericBinding; }
          // Some input of unknown type (browser usually falls back to text).
          if (isBindableByValue)
              { return GenericBinding; }
          // Dead end. Some unknown input and an unbindable.
          return null;
      }
      // <select>
      if (name === 'select' && isBindableByValue) {
          return element.getAttribute('multiple') ? MultipleSelectBinding : SingleSelectBinding;
      }
      // <textarea>
      if (name === 'textarea' && isBindableByValue)
          { return GenericBinding; }
      // Dead end. Some unbindable element.
      return null;
  }

  var endsWithSemi = /;\s*$/;
  var Element$1 = /** @class */ (function (_super) {
      __extends(Element, _super);
      function Element(options) {
          var _this = _super.call(this, options) || this;
          _this.name = options.template.e.toLowerCase();
          // find parent element
          _this.parent = findElement(_this.up, false);
          if (_this.parent && _this.parent.name === 'option') {
              throw new Error("An <option> element cannot contain other elements (encountered <" + _this.name + ">)");
          }
          _this.decorators = [];
          // create attributes
          _this.attributeByName = {};
          // todo refine types
          var attrs;
          var n, attr, val, cls, name, template, leftovers;
          var m = _this.template.m;
          var len = (m && m.length) || 0;
          for (var i = 0; i < len; i++) {
              template = m[i];
              if (template.g) {
                  (_this.statics || (_this.statics = {}))[template.n] = isString(template.f)
                      ? template.f
                      : template.n;
              }
              else {
                  switch (template.t) {
                      case TemplateItemType$1.ATTRIBUTE:
                      case TemplateItemType$1.BINDING_FLAG:
                      case TemplateItemType$1.DECORATOR:
                      case TemplateItemType$1.EVENT:
                      case TemplateItemType$1.TRANSITION:
                          attr = createItem({
                              owner: _this,
                              up: _this.up,
                              template: template
                          });
                          n = template.n;
                          attrs = attrs || (attrs = _this.attributes = []);
                          if (n === 'value')
                              { val = attr; }
                          else if (n === 'name')
                              { name = attr; }
                          else if (n === 'class')
                              { cls = attr; }
                          else
                              { attrs.push(attr); }
                          break;
                      case TemplateItemType$1.DELEGATE_FLAG:
                          _this.delegate = false;
                          break;
                      default:
                          (leftovers || (leftovers = [])).push(template);
                          break;
                  }
              }
          }
          if (val)
              { attrs.push(val); }
          if (name)
              { attrs.push(name); }
          if (cls)
              { attrs.unshift(cls); }
          if (leftovers) {
              (attrs || (_this.attributes = [])).push(new ConditionalAttribute({
                  owner: _this,
                  up: _this.up,
                  template: leftovers
              }));
              // empty leftovers array
              leftovers = [];
          }
          // create children
          if (options.template.f && !options.deferContent) {
              _this.fragment = new Fragment({
                  template: options.template.f,
                  owner: _this,
                  cssIds: null
              });
          }
          _this.binding = null; // filled in later
          return _this;
      }
      Element.prototype.bind = function () {
          var attrs = this.attributes;
          if (attrs) {
              attrs.binding = true;
              var len = attrs.length;
              for (var i = 0; i < len; i++)
                  { attrs[i].bind(); }
              attrs.binding = false;
          }
          if (this.fragment)
              { this.fragment.bind(); }
          // create two-way binding if necessary
          if (!this.binding)
              { this.recreateTwowayBinding(); }
          else
              { this.binding.bind(); }
      };
      Element.prototype.createTwowayBinding = function () {
          var hasTwoWay = 'twoway' in this;
          if (hasTwoWay ? this.twoway : this.ractive.twoway) {
              var Binding_1 = selectBinding(this);
              if (Binding_1) {
                  var binding = new Binding_1(this);
                  if (binding === null || binding === void 0 ? void 0 : binding.model)
                      { return binding; }
              }
          }
      };
      Element.prototype.destroyed = function () {
          if (this.attributes)
              { this.attributes.forEach(destroyed); }
          if (this.fragment)
              { this.fragment.destroyed(); }
      };
      Element.prototype.detach = function () {
          // if this element is no longer rendered, the transitions are complete and the attributes can be torn down
          if (!this.rendered)
              { this.destroyed(); }
          return detachNode(this.node);
      };
      Element.prototype.find = function (selector, options) {
          if (this.node && matches(this.node, selector))
              { return this.node; }
          if (this.fragment) {
              return this.fragment.find(selector, options);
          }
      };
      Element.prototype.findAll = function (selector, options) {
          var result = options.result;
          if (matches(this.node, selector)) {
              result.push(this.node);
          }
          if (this.fragment) {
              this.fragment.findAll(selector, options);
          }
      };
      Element.prototype.findNextNode = function () {
          return null;
      };
      Element.prototype.firstNode = function () {
          return this.node;
      };
      Element.prototype.getAttribute = function (name) {
          if (this.statics && name in this.statics)
              { return this.statics[name]; }
          var attribute = this.attributeByName[name];
          return attribute ? attribute.getValue() : undefined;
      };
      Element.prototype.getContext = function () {
          var arguments$1 = arguments;

          var _a;
          var assigns = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              assigns[_i] = arguments$1[_i];
          }
          if (this.fragment)
              { return (_a = this.fragment).getContext.apply(_a, assigns); }
          if (!this.ctx)
              { this.ctx = new Context(this.up, this); }
          var target = create(this.ctx);
          return assign.apply(void 0, __spreadArrays([target], assigns));
      };
      Element.prototype.off = function (event, callback, capture) {
          if (capture === void 0) { capture = false; }
          var delegate = this.up.delegate;
          var ref = this.listeners && this.listeners[event];
          if (!ref)
              { return; }
          removeFromArray(ref, callback);
          if (delegate) {
              var listeners = (delegate.listeners || (delegate.listeners = {})) &&
                  (delegate.listeners[event] || (delegate.listeners[event] = []));
              if (listeners.refs && !--listeners.refs)
                  { delegate.off(event, delegateHandler, true); }
          }
          else if (this.rendered) {
              var n = this.node;
              var add = n.addEventListener;
              var rem = n.removeEventListener;
              if (!ref.length) {
                  rem.call(n, event, handler, capture);
              }
              else if (ref.length && !ref.refs && capture) {
                  rem.call(n, event, handler, true);
                  add.call(n, event, handler, false);
              }
          }
      };
      Element.prototype.on = function (event, callback, capture) {
          if (capture === void 0) { capture = false; }
          var delegate = this.up.delegate;
          var ref = (this.listeners || (this.listeners = {}))[event] || (this.listeners[event] = []);
          if (delegate) {
              var listeners = ((delegate.listeners || (delegate.listeners = {})) && delegate.listeners[event]) ||
                  (delegate.listeners[event] = []);
              if (!listeners.refs) {
                  listeners.refs = 0;
                  delegate.on(event, delegateHandler, true);
                  listeners.refs++;
              }
              else {
                  listeners.refs++;
              }
          }
          else if (this.rendered) {
              var n = this.node;
              var add = n.addEventListener;
              var rem = n.removeEventListener;
              if (!ref.length) {
                  add.call(n, event, handler, capture);
              }
              else if (ref.length && !ref.refs && capture) {
                  rem.call(n, event, handler, false);
                  add.call(n, event, handler, true);
              }
          }
          addToArray(this.listeners[event], callback);
      };
      Element.prototype.recreateTwowayBinding = function () {
          if (this.binding) {
              this.binding.unbind();
              this.binding.unrender();
          }
          if ((this.binding = this.createTwowayBinding())) {
              this.binding.bind();
              if (this.rendered)
                  { this.binding.render(); }
          }
      };
      Element.prototype.rebound = function (update) {
          _super.prototype.rebound.call(this, update);
          if (this.attributes)
              { this.attributes.forEach(function (x) { return x.rebound(update); }); }
          if (this.binding)
              { this.binding.rebound(); }
      };
      Element.prototype.render = function (target, occupants) {
          var _this = this;
          // TODO determine correct namespace
          this.namespace = getNamespace(this);
          var node;
          var existing = false;
          if (occupants) {
              var n = void 0;
              while ((n = occupants.shift())) {
                  if (n.nodeName.toUpperCase() === this.template.e.toUpperCase() &&
                      n.namespaceURI === this.namespace) {
                      this.node = node = n;
                      existing = true;
                      break;
                  }
                  else {
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
              var name_1 = this.template.e;
              node = createElement(this.namespace === Namespace$1.html ? name_1.toLowerCase() : name_1, this.namespace, this.getAttribute('is'));
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
                  node.setAttribute(k, _this.statics[k]);
              });
          }
          if (existing && this.foundNode)
              { this.foundNode(node); }
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
              if (this.binding && this.binding.wasUndefined)
                  { this.binding.setFromNode(node); }
              // remove unused attributes
              var i = node.attributes.length;
              while (i--) {
                  var name_2 = node.attributes[i].name;
                  if (!(name_2 in this.attributeByName) && (!this.statics || !(name_2 in this.statics)))
                      { node.removeAttribute(name_2); }
              }
          }
          // Is this a top-level node of a component? If so, we may need to add
          // a data-ractive-css attribute, for CSS encapsulation
          if (this.up.cssIds) {
              node.setAttribute('data-ractive-css', this.up.cssIds.map(function (x) { return "{" + x + "}"; }).join(' '));
          }
          if (this.attributes) {
              var len = this.attributes.length;
              for (var i = 0; i < len; i++)
                  { this.attributes[i].render(); }
          }
          if (this.binding)
              { this.binding.render(); }
          if (!this.up.delegate && this.listeners) {
              var ls = this.listeners;
              for (var k in ls) {
                  if (ls[k] && ls[k].length)
                      { this.node.addEventListener(k, handler, !!ls[k].refs); }
              }
          }
          if (!existing) {
              target.appendChild(node);
          }
          this.rendered = true;
      };
      Element.prototype.shuffled = function () {
          _super.prototype.shuffled.call(this);
          this.decorators.forEach(shuffled);
      };
      Element.prototype.toString = function () {
          var _this = this;
          var tagName = this.template.e;
          var attrs = (this.attributes && this.attributes.map(stringifyAttribute).join('')) || '';
          if (this.statics)
              { keys(this.statics).forEach(function (k) {
                  return k !== 'class' &&
                      k !== 'style' &&
                      (attrs = " " + k + "=\"" + safeAttributeString(_this.statics[k]) + "\"" + attrs);
              }); }
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
                  }
                  else if (attr.name === 'style') {
                      style = (style || '') + (style ? ' ' : '') + safeAttributeString(attr.getString());
                      if (style && !endsWithSemi.test(style))
                          { style += ';'; }
                  }
                  else if (attr.style) {
                      style =
                          (style || '') +
                              (style ? ' ' : '') +
                              (attr.style + ": " + safeAttributeString(attr.getString()) + ";");
                  }
                  else if (attr.inlineClass && attr.getValue()) {
                      cls = (cls || '') + (cls ? ' ' : '') + attr.inlineClass;
                  }
              });
          // put classes first, then inline style
          if (style !== undefined)
              { attrs = ' style' + (style ? "=\"" + style + "\"" : '') + attrs; }
          if (cls !== undefined)
              { attrs = ' class' + (cls ? "=\"" + cls + "\"" : '') + attrs; }
          if (this.up.cssIds) {
              attrs += " data-ractive-css=\"" + this.up.cssIds.map(function (x) { return "{" + x + "}"; }).join(' ') + "\"";
          }
          var str = "<" + tagName + attrs + ">";
          if (voidElements[this.name.toLowerCase()])
              { return str; }
          // Special case - textarea
          if (this.name === 'textarea' && this.getAttribute('value') !== undefined) {
              str += escapeHtml(this.getAttribute('value'));
          }
          else if (this.getAttribute('contenteditable') !== undefined) {
              // Special case - contenteditable
              str += this.getAttribute('value') || '';
          }
          if (this.fragment) {
              str += this.fragment.toString(!/^(?:script|style)$/i.test(this.template.e)); // escape text unless script/style
          }
          str += "</" + tagName + ">";
          return str;
      };
      Element.prototype.unbind = function (view) {
          var attrs = this.attributes;
          if (attrs) {
              attrs.unbinding = true;
              var len = attrs.length;
              for (var i = 0; i < len; i++)
                  { attrs[i].unbind(view); }
              attrs.unbinding = false;
          }
          if (this.binding)
              { this.binding.unbind(); }
          if (this.fragment)
              { this.fragment.unbind(view); }
      };
      Element.prototype.unrender = function (shouldDestroy) {
          if (!this.rendered)
              { return; }
          this.rendered = false;
          // unrendering before intro completed? complete it now
          // TODO should be an API for aborting transitions
          var transition = this.intro;
          if (transition && transition.complete)
              { transition.complete(); }
          // Detach as soon as we can
          if (this.name === 'option') {
              // <option> elements detach immediately, so that
              // their parent <select> element syncs correctly, and
              // since option elements can't have transitions anyway
              this.detach();
          }
          else if (shouldDestroy) {
              runloop.detachWhenReady(this);
          }
          // outro transition
          var outro = this.outro;
          if (outro && outro.shouldFire('outro')) {
              outro.isIntro = false;
              outro.isOutro = true;
              runloop.registerTransition(outro);
          }
          if (this.fragment)
              { this.fragment.unrender(); }
          if (this.binding)
              { this.binding.unrender(); }
      };
      Element.prototype.update = function () {
          if (this.dirty) {
              this.dirty = false;
              var attrs = this.attributes;
              if (attrs) {
                  var len = attrs.length;
                  for (var i = 0; i < len; i++)
                      { attrs[i].update(); }
              }
              if (this.fragment)
                  { this.fragment.update(); }
          }
      };
      return Element;
  }(ContainerItem));
  function inputIsCheckedRadio(element) {
      var nameAttr = element.attributeByName.name;
      return (element.getAttribute('type') === 'radio' &&
          (nameAttr || {}).interpolator &&
          element.getAttribute('value') === nameAttr.interpolator.model.get());
  }
  function stringifyAttribute(attribute) {
      var str = attribute.toString();
      return str ? ' ' + str : '';
  }
  function getNamespace(element) {
      // Use specified namespace...
      var xmlns = element.getAttribute('xmlns');
      if (xmlns)
          { return xmlns; }
      // ...or SVG namespace, if this is an <svg> element
      if (element.name === 'svg')
          { return Namespace$1.svg; }
      var parent = element.parent;
      if (parent) {
          // ...or HTML, if the parent is a <foreignObject>
          if (parent.name === 'foreignobject')
              { return Namespace$1.html; }
          // ...or inherit from the parent node
          return parent.node.namespaceURI;
      }
      return element.ractive.el.namespaceURI;
  }
  // todo refine types
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
                  for (var i = 0; i < len; i++)
                      { bubble = listeners[i].call(node, ev) !== false && bubble; }
              }
          }
          node = node.parentNode || node.correspondingUseElement; // SVG with a <use> element in certain environments
      }
      return bubble;
  }
  var UIEvent = win !== null ? window.UIEvent : null;
  function shouldFire(event, start, end) {
      if (UIEvent && event instanceof UIEvent) {
          var node = start;
          while (node && node !== end) {
              if (node.disabled)
                  { return false; }
              node = node.parentNode || node.correspondingUseElement;
          }
      }
      return true;
  }
  function handler(ev) {
      var el = this._ractive.proxy;
      var listeners;
      if (el.listeners && (listeners = el.listeners[ev.type])) {
          var len = listeners.length;
          for (var i = 0; i < len; i++)
              { listeners[i] && listeners[i].call(this, ev); }
      }
  }

  var remove = /\/\*(?:[\s\S]*?)\*\//g;
  var escape = /url\(\s*(['"])(?:\\[\s\S]|(?!\1).)*\1\s*\)|url\((?:\\[\s\S]|[^)])*\)|(['"])(?:\\[\s\S]|(?!\2).)*\2/gi;
  var value = /\0(\d+)/g;
  /**
   * Removes comments and strings from the given CSS to make it easier to parse.
   *
   * @param css
   * @param callback receives the cleaned CSS and a {@link ReconstructCSSFunction}
   * @param additionalReplaceRules
   */
  function cleanCss(css, callback, additionalReplaceRules) {
      if (additionalReplaceRules === void 0) { additionalReplaceRules = []; }
      var values = [];
      css = css.replace(escape, function (match) { return "\0" + (values.push(match) - 1); }).replace(remove, '');
      additionalReplaceRules.forEach(function (pattern) {
          css = css.replace(pattern, function (match) { return "\0" + (values.push(match) - 1); });
      });
      var reconstruct = function (css) {
          return css.replace(value, function (_match, n) { return values[n]; });
      };
      return callback(css, reconstruct);
  }

  var space = /\s+/;
  function readStyle(css) {
      if (!isString(css))
          { return {}; }
      return cleanCss(css, function (css, reconstruct) {
          return css
              .split(';')
              .filter(function (rule) { return !!rule.trim(); })
              .map(reconstruct)
              .reduce(function (rules, rule) {
              var separatorIndex = rule.indexOf(':');
              var name = rule.substr(0, separatorIndex).trim();
              rules[name] = rule.substr(separatorIndex + 1).trim();
              return rules;
          }, {});
      });
  }
  function readClass(str) {
      var list = str.split(space);
      // remove any empty entries
      var i = list.length;
      while (i--) {
          if (!list[i])
              { list.splice(i, 1); }
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
      var element = attribute.element, name = attribute.name;
      if (name === 'value') {
          if (attribute.interpolator)
              { attribute.interpolator.bound = true; }
          // special case - selects
          if (element.name === 'select' && name === 'value') {
              return element.getAttribute('multiple') ? updateMultipleSelectValue : updateSelectValue;
          }
          if (element.name === 'textarea')
              { return updateStringValue; }
          // special case - contenteditable
          if (element.getAttribute('contenteditable') != null)
              { return updateContentEditableValue; }
          // special case - <input>
          if (element.name === 'input') {
              var type = element.getAttribute('type');
              // type='file' value='{{fileList}}'>
              if (type === 'file')
                  { return noop; } // read-only
              // type='radio' name='{{twoway}}'
              if (type === 'radio' && element.binding && element.binding.attribute.name === 'name')
                  { return updateRadioValue; }
              if (~textTypes.indexOf(type))
                  { return updateStringValue; }
          }
          return updateValue;
      }
      var node = element.node;
      // special case - <input type='radio' name='{{twoway}}' value='foo'>
      if (attribute.isTwoway && name === 'name') {
          if (node.type === 'radio')
              { return updateRadioName; }
          if (node.type === 'checkbox')
              { return updateCheckboxName; }
      }
      if (name === 'style')
          { return updateStyleAttribute; }
      if (name.indexOf('style-') === 0)
          { return updateInlineStyle; }
      // special case - class names. IE fucks things up, again
      if (name === 'class' && (!node.namespaceURI || node.namespaceURI === Namespace$1.html))
          { return updateClassName; }
      if (name.indexOf('class-') === 0)
          { return updateInlineClass; }
      if (attribute.isBoolean) {
          var type = element.getAttribute('type');
          if (attribute.interpolator && name === 'checked' && (type === 'checkbox' || type === 'radio'))
              { attribute.interpolator.bound = true; }
          return updateBoolean;
      }
      if (attribute.namespace && attribute.namespace !== attribute.node.namespaceURI)
          { return updateNamespacedAttribute; }
      return updateAttribute;
  }
  var updateMultipleSelectValue = function (reset) {
      var value = this.getValue();
      if (!isArray(value))
          { value = [value]; }
      var options = this.node.options;
      var i = options.length;
      if (reset) {
          while (i--)
              { options[i].selected = false; }
      }
      else {
          while (i--) {
              var option = options[i];
              var optionValue = option._ractive ? option._ractive.value : option.value; // options inserted via a triple don't have _ractive
              option.selected = arrayContains(value, optionValue);
          }
      }
  };
  var updateSelectValue = function (reset) {
      var value = this.getValue();
      if (!this.locked) {
          // TODO is locked still a thing?
          this.node._ractive.value = value;
          var options = this.node.options;
          var i = options.length;
          var wasSelected = false;
          if (reset) {
              while (i--)
                  { options[i].selected = false; }
          }
          else {
              while (i--) {
                  var option = options[i];
                  var optionValue = option._ractive ? option._ractive.value : option.value; // options inserted via a triple don't have _ractive
                  if (option.disabled && option.selected)
                      { wasSelected = true; }
                  if (optionValue == value) {
                      // double equals as we may be comparing numbers with strings
                      option.selected = true;
                      return;
                  }
              }
          }
          if (!wasSelected)
              { this.node.selectedIndex = -1; }
      }
  };
  var updateContentEditableValue = function (reset) {
      var value = this.getValue();
      if (!this.locked) {
          if (reset)
              { this.node.innerHTML = ''; }
          else
              { this.node.innerHTML = isUndefined(value) ? '' : value; }
      }
  };
  var updateRadioValue = function (reset) {
      var node = this.node;
      var wasChecked = node.checked;
      var value = this.getValue();
      if (reset)
          { return (node.checked = false); }
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
  };
  var updateValue = function (reset) {
      if (!this.locked) {
          if (reset) {
              this.node.removeAttribute('value');
              this.node.value = this.node._ractive.value = null;
          }
          else {
              var value = this.getValue();
              this.node.value = this.node._ractive.value = value;
              this.node.setAttribute('value', safeToStringValue(value));
          }
      }
  };
  var updateStringValue = function (reset) {
      if (!this.locked) {
          if (reset) {
              this.node._ractive.value = '';
              this.node.removeAttribute('value');
          }
          else {
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
  };
  var updateRadioName = function (reset) {
      if (reset)
          { this.node.checked = false; }
      else
          { this.node.checked = this.element.compare(this.getValue(), this.element.binding.getValue()); }
  };
  var updateCheckboxName = function (reset) {
      var _a = this, element = _a.element, node = _a.node;
      var binding = element.binding;
      var value = this.getValue();
      var valueAttribute = element.getAttribute('value');
      if (!isArray(value)) {
          binding.isChecked = node.checked = element.compare(value, valueAttribute);
      }
      else {
          var i = value.length;
          while (i--) {
              if (element.compare(valueAttribute, value[i])) {
                  binding.isChecked = node.checked = true;
                  return;
              }
          }
          binding.isChecked = node.checked = false;
      }
  };
  var updateStyleAttribute = function (reset) {
      var props = reset ? {} : readStyle(this.getValue() || '');
      var style = this.node.style;
      var keys$1 = keys(props);
      var prev = this.previous || [];
      var i = 0;
      while (i < keys$1.length) {
          if (keys$1[i] in style) {
              var safe = props[keys$1[i]].replace('!important', '');
              style.setProperty(keys$1[i], safe, safe.length !== props[keys$1[i]].length ? 'important' : '');
          }
          i++;
      }
      // remove now-missing attrs
      i = prev.length;
      while (i--) {
          if (!~keys$1.indexOf(prev[i]) && prev[i] in style)
              { style.setProperty(prev[i], '', ''); }
      }
      this.previous = keys$1;
  };
  var updateInlineStyle = function (reset) {
      if (!this.style) {
          this.style = hyphenateCamel(this.name.substr(6));
      }
      if (reset && this.node.style.getPropertyValue(this.style) !== this.last)
          { return; }
      var value = reset ? '' : safeToStringValue(this.getValue());
      var safe = value.replace('!important', '');
      this.node.style.setProperty(this.style, safe, safe.length !== value.length ? 'important' : '');
      this.last = this.node.style.getPropertyValue(this.style);
  };
  var updateClassName = function (reset) {
      var value = reset ? [] : readClass(safeToStringValue(this.getValue()));
      // watch out for weirdo svg elements
      var cls = this.node.className;
      cls = cls.baseVal !== undefined ? cls.baseVal : cls;
      var attr = readClass(cls);
      var prev = this.previous || [];
      var className = value.concat(attr.filter(function (c) { return !~prev.indexOf(c); })).join(' ');
      if (className !== cls) {
          if (!isString(this.node.className)) {
              this.node.className.baseVal = className;
          }
          else {
              this.node.className = className;
          }
      }
      this.previous = value;
  };
  var updateInlineClass = function (reset) {
      var name = this.name.substr(6);
      // watch out for weirdo svg elements
      var cls = this.node.className;
      cls = cls.baseVal !== undefined ? cls.baseVal : cls;
      var attr = readClass(cls);
      var value = reset ? false : this.getValue();
      if (!this.inlineClass)
          { this.inlineClass = name; }
      if (value && !~attr.indexOf(name))
          { attr.push(name); }
      else if (!value && ~attr.indexOf(name))
          { attr.splice(attr.indexOf(name), 1); }
      if (!isString(this.node.className)) {
          this.node.className.baseVal = attr.join(' ');
      }
      else {
          this.node.className = attr.join(' ');
      }
  };
  var updateBoolean = function (reset) {
      // with two-way binding, only update if the change wasn't initiated by the user
      // otherwise the cursor will often be sent to the wrong place
      if (!this.locked) {
          if (reset) {
              if (this.useProperty)
                  { this.node[this.propertyName] = false; }
              this.node.removeAttribute(this.propertyName);
          }
          else {
              if (this.useProperty) {
                  this.node[this.propertyName] = this.getValue();
              }
              else {
                  var val = this.getValue();
                  if (val) {
                      this.node.setAttribute(this.propertyName, isString(val) ? val : '');
                  }
                  else {
                      this.node.removeAttribute(this.propertyName);
                  }
              }
          }
      }
  };
  var updateAttribute = function (reset) {
      if (reset) {
          if (this.node.getAttribute(this.name) === this.value) {
              this.node.removeAttribute(this.name);
          }
      }
      else {
          this.value = safeToStringValue(this.getString());
          this.node.setAttribute(this.name, this.value);
      }
  };
  var updateNamespacedAttribute = function (reset) {
      if (reset) {
          if (this.value ===
              this.node.getAttributeNS(this.namespace, this.name.slice(this.name.indexOf(':') + 1))) {
              this.node.removeAttributeNS(this.namespace, this.name.slice(this.name.indexOf(':') + 1));
          }
      }
      else {
          this.value = safeToStringValue(this.getString());
          this.node.setAttributeNS(this.namespace, this.name.slice(this.name.indexOf(':') + 1), this.value);
      }
  };

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

  function lookupNamespace(node, prefix) {
      var qualified = "xmlns:" + prefix;
      while (node) {
          if (node.hasAttribute && node.hasAttribute(qualified))
              { return node.getAttribute(qualified); }
          node = node.parentNode;
      }
      return Namespace$1[prefix];
  }
  var attribute = false;
  function inAttribute() {
      return attribute;
  }
  var Attribute = /** @class */ (function (_super) {
      __extends(Attribute, _super);
      function Attribute(options) {
          var _a;
          var _this = _super.call(this, options) || this;
          _this.name = options.template.n;
          _this.namespace = null;
          _this.owner = options.owner || options.up.owner || options.element || findElement(options.up);
          _this.element =
              options.element || (_this.owner.attributeByName ? _this.owner : findElement(options.up));
          _this.up = options.up; // shared
          _this.ractive = _this.up.ractive;
          _this.rendered = false;
          _this.updateDelegate = null;
          _this.fragment = null;
          _this.element.attributeByName[_this.name] = _this;
          if (!isArray(options.template.f)) {
              _this.value = options.template.f;
              if (_this.value === 0) {
                  _this.value = '';
              }
              else if (isUndefined(_this.value)) {
                  _this.value = true;
              }
              return _this;
          }
          else {
              _this.fragment = new Fragment({
                  owner: _this,
                  template: options.template.f
              });
          }
          var firstAndOnlyFragment = ((_a = _this.fragment) === null || _a === void 0 ? void 0 : _a.items.length) === 1 && _this.fragment.items[0];
          _this.interpolator =
              isItemType(firstAndOnlyFragment, TemplateItemType$1.INTERPOLATOR) &&
                  firstAndOnlyFragment;
          if (_this.interpolator)
              { _this.interpolator.owner = _this; }
          _this.isTwoway = undefined;
          return _this;
      }
      Attribute.prototype.bind = function () {
          if (this.fragment) {
              this.fragment.bind();
          }
      };
      Attribute.prototype.bubble = function () {
          if (!this.dirty) {
              this.up.bubble();
              this.element.bubble();
              this.dirty = true;
          }
      };
      Attribute.prototype.firstNode = function () {
          return undefined;
      };
      Attribute.prototype.getString = function () {
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
      Attribute.prototype.getValue = function () {
          attribute = true;
          var value = this.fragment
              ? this.fragment.valueOf()
              : booleanAttributes[this.name.toLowerCase()]
                  ? true
                  : this.value;
          attribute = false;
          return value;
      };
      Attribute.prototype.render = function () {
          var node = this.element.node;
          this.node = node;
          // should we use direct property access, or setAttribute?
          if (!node.namespaceURI || node.namespaceURI === Namespace$1.html) {
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
              }
              else {
                  this.namespace = node.namespaceURI;
              }
          }
          this.rendered = true;
          this.updateDelegate = getUpdateDelegate(this);
          this.updateDelegate();
      };
      Attribute.prototype.toString = function () {
          if (inAttributes())
              { return ''; }
          attribute = true;
          var value = this.getValue();
          // Special case - select and textarea values (should not be stringified)
          if (this.name === 'value' &&
              (this.element.getAttribute('contenteditable') !== undefined ||
                  this.element.name === 'select' ||
                  this.element.name === 'textarea')) {
              return;
          }
          // Special case – bound radio `name` attributes
          if (this.name === 'name' &&
              this.element.name === 'input' &&
              this.interpolator &&
              this.element.getAttribute('type') === 'radio') {
              return "name=\"{{" + this.interpolator.model.getKeypath() + "}}\"";
          }
          // Special case - style and class attributes and directives
          if (this.owner === this.element &&
              (this.name === 'style' || this.name === 'class' || this.style || this.inlineClass)) {
              return;
          }
          if (!this.rendered &&
              this.owner === this.element &&
              (!this.name.indexOf('style-') || !this.name.indexOf('class-'))) {
              if (!this.name.indexOf('style-')) {
                  this.style = hyphenateCamel(this.name.substr(6));
              }
              else {
                  this.inlineClass = this.name.substr(6);
              }
              return;
          }
          if (booleanAttributes[this.name.toLowerCase()])
              { return value
                  ? isString(value)
                      ? this.name + "=\"" + safeAttributeString(value) + "\""
                      : this.name
                  : ''; }
          if (value == null)
              { return ''; }
          var str = safeAttributeString(this.getString());
          attribute = false;
          return str ? this.name + "=\"" + str + "\"" : this.name;
      };
      Attribute.prototype.unbind = function (view) {
          if (this.fragment)
              { this.fragment.unbind(view); }
      };
      Attribute.prototype.unrender = function () {
          this.updateDelegate(true);
          this.rendered = false;
      };
      Attribute.prototype.update = function () {
          if (this.dirty) {
              var binding = void 0;
              this.dirty = false;
              if (this.fragment)
                  { this.fragment.update(); }
              if (this.rendered)
                  { this.updateDelegate(); }
              if (this.isTwoway && !this.locked) {
                  this.interpolator.twowayBinding.lastVal(true, this.interpolator.model.get());
              }
              else if (this.name === 'value' && (binding = this.element.binding)) {
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

  var BindingFlag = /** @class */ (function (_super) {
      __extends(BindingFlag, _super);
      function BindingFlag(options) {
          var _a;
          var _this = _super.call(this, options) || this;
          _this.owner = options.owner || options.up.owner || findElement(options.up);
          _this.element = 'attributeByName' in _this.owner ? _this.owner : findElement(options.up);
          _this.flag = options.template.v === 'l' ? 'lazy' : 'twoway';
          _this.bubbler = _this.owner === _this.element ? _this.element : _this.up;
          if (_this.element.type === TemplateItemType$1.ELEMENT) {
              if (isArray(options.template.f)) {
                  _this.fragment = new Fragment({
                      owner: _this,
                      template: options.template.f
                  });
              }
              var firstAndOnlyFragment = ((_a = _this.fragment) === null || _a === void 0 ? void 0 : _a.items.length) === 1 && _this.fragment.items[0];
              _this.interpolator =
                  isItemType(firstAndOnlyFragment, TemplateItemType$1.INTERPOLATOR) &&
                      firstAndOnlyFragment;
          }
          return _this;
      }
      BindingFlag.prototype.bind = function () {
          if (this.fragment)
              { this.fragment.bind(); }
          set$1(this, this.getValue(), true);
      };
      BindingFlag.prototype.bubble = function () {
          if (!this.dirty) {
              this.bubbler.bubble();
              this.dirty = true;
          }
      };
      BindingFlag.prototype.getValue = function () {
          if (this.fragment)
              { return this.fragment.valueOf(); }
          else if ('value' in this)
              { return this.value; }
          // TODO find a way to not trigger this compilation error
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          else if ('f' in this.template)
              { return this.template.f; }
          else
              { return true; }
      };
      BindingFlag.prototype.render = function () {
          set$1(this, this.getValue(), true);
      };
      BindingFlag.prototype.toString = function () {
          return '';
      };
      BindingFlag.prototype.unbind = function (view) {
          if (this.fragment)
              { this.fragment.unbind(view); }
          delete this.element[this.flag];
      };
      BindingFlag.prototype.unrender = function () {
          if (this.element.rendered)
              { this.element.recreateTwowayBinding(); }
      };
      BindingFlag.prototype.update = function () {
          if (this.dirty) {
              this.dirty = false;
              if (this.fragment)
                  { this.fragment.update(); }
              set$1(this, this.getValue(), true);
          }
      };
      return BindingFlag;
  }(Item));
  function set$1(flag, value, update) {
      if (value === 0) {
          flag.value = true;
      }
      else if (value === 'true') {
          flag.value = true;
      }
      else if (value === 'false' || value === '0') {
          flag.value = false;
      }
      else {
          flag.value = value;
      }
      var current = flag.element[flag.flag];
      // TSRChange - split assignment to handle two different types
      if (flag.flag === 'twoway') {
          flag.element[flag.flag] = !!flag.value;
      }
      else {
          flag.element[flag.flag] = flag.value;
      }
      if (update && !flag.element.attributes.binding && current !== flag.value) {
          flag.element.recreateTwowayBinding();
      }
      return flag.value;
  }

  function setupArgsFn(item, template) {
      if ((template === null || template === void 0 ? void 0 : template.f) && typeof (template === null || template === void 0 ? void 0 : template.f) !== 'string') {
          item.fn = getFunction(template.f.s, template.f.r.length);
      }
  }
  // TSRChange - these function body was part of `setupArgsFn` using additional paramter.
  function setupArgsFnWithRegister(item, template, fragment) {
      if ((template === null || template === void 0 ? void 0 : template.f) && typeof (template === null || template === void 0 ? void 0 : template.f) !== 'string') {
          item.model = new ExpressionProxy(fragment, template.f);
          item.model.register(item);
      }
  }
  function resolveArgs(_item, template, fragment, opts) {
      if (opts === void 0) { opts = {}; }
      var references = template.f.r;
      return references.map(function (ref) {
          var model;
          if (opts.specialRef && (model = opts.specialRef(ref))) {
              return model;
          }
          model = resolveReference(fragment, ref);
          return model;
      });
  }
  function teardownArgsFn(item) {
      if (item.model)
          { item.model.unregister(item); }
  }

  var missingDecorator = {
      update: noop,
      teardown: noop
  };
  var Decorator = /** @class */ (function () {
      function Decorator(options) {
          this.firstNode = noop;
          this.owner = options.owner || options.up.owner || findElement(options.up);
          this.element = 'attributeByName' in this.owner ? this.owner : findElement(options.up);
          this.up = options.up || this.owner.up;
          this.ractive = this.up.ractive || this.owner.ractive;
          var template = (this.template = options.template);
          this.name = template.n;
          this.node = null;
          this.handle = null;
          this.element.decorators.push(this);
      }
      Decorator.prototype.bind = function () {
          // if the owner is the element, make sure the context includes the element
          var frag = this.element === this.owner ? new Fragment({ owner: this.owner }) : this.up;
          setupArgsFnWithRegister(this, this.template, frag);
      };
      Decorator.prototype.bubble = function () {
          if (!this.dirty) {
              this.dirty = true;
              // decorators may be owned directly by an element or by a fragment if conditional
              this.owner.bubble();
              this.up.bubble();
          }
      };
      Decorator.prototype.destroyed = function () {
          if (this.handle) {
              this.handle.teardown();
              this.handle = null;
          }
          this.shouldDestroy = true;
      };
      Decorator.prototype.handleChange = function () {
          this.bubble();
      };
      Decorator.prototype.rebound = function (update) {
          if (this.model)
              { this.model.rebound(update); }
      };
      Decorator.prototype.render = function () {
          var _this = this;
          this.shouldDestroy = false;
          if (this.handle)
              { this.unrender(); }
          var ractive = this.ractive;
          runloop.scheduleTask(function () {
              // bail if the host element has managed to become unrendered
              if (!_this.element.rendered)
                  { return; }
              var fn = findInViewHierarchy('decorators', ractive, _this.name);
              if (!fn) {
                  warnOnce(missingPlugin(_this.name, 'decorator'));
                  _this.handle = missingDecorator;
                  return;
              }
              _this.node = _this.element.node;
              var args = _this.model ? _this.model.get() : [];
              localFragment.f = _this.up;
              _this.handle = fn.apply(ractive, __spreadArrays([_this.node], args));
              localFragment.f = null;
              if (!_this.handle || !_this.handle.teardown) {
                  throw new Error("The '" + _this.name + "' decorator must return an object with a teardown method");
              }
              // watch out for decorators that cause their host element to be unrendered
              if (_this.shouldDestroy)
                  { _this.destroyed(); }
          }, true);
      };
      Decorator.prototype.shuffled = function () {
          if (this.handle && this.handle.shuffled)
              { this.handle.shuffled(); }
      };
      Decorator.prototype.toString = function () {
          return '';
      };
      Decorator.prototype.unbind = function () {
          teardownArgsFn(this);
      };
      Decorator.prototype.unrender = function (shouldDestroy) {
          if ((!shouldDestroy || this.element.rendered) && this.handle) {
              this.handle.teardown();
              this.handle = null;
          }
      };
      Decorator.prototype.update = function () {
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
              }
              else {
                  var args = this.model ? this.model.get() : [];
                  instance.update.apply(this.ractive, args);
              }
          }
      };
      return Decorator;
  }());

  var Form = /** @class */ (function (_super) {
      __extends(Form, _super);
      function Form(options) {
          var _this = _super.call(this, options) || this;
          _this.formBindings = [];
          return _this;
      }
      Form.prototype.render = function (target, occupants) {
          _super.prototype.render.call(this, target, occupants);
          this.on('reset', handleReset);
      };
      Form.prototype.unrender = function (shouldDestroy) {
          this.off('reset', handleReset);
          _super.prototype.unrender.call(this, shouldDestroy);
      };
      return Form;
  }(Element$1));
  function handleReset() {
      var element = this._ractive.proxy;
      runloop.start();
      element.formBindings.forEach(updateModel);
      runloop.end();
  }
  function updateModel(binding) {
      binding.model.set(binding.resetValue);
  }

  var Input = /** @class */ (function (_super) {
      __extends(Input, _super);
      function Input() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Input.prototype.render = function (target, occupants) {
          _super.prototype.render.call(this, target, occupants);
          this.node.defaultValue = this.node.value;
      };
      Input.prototype.compare = function (value, attrValue) {
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
  }(Element$1));

  var Option = /** @class */ (function (_super) {
      __extends(Option, _super);
      function Option(options) {
          var _this = this;
          var template = options.template;
          if (!template.a)
              { template.a = {}; }
          // If the value attribute is missing, use the element's content,
          // as long as it isn't disabled
          if (isUndefined(template.a.value) && !('disabled' in template.a)) {
              template.a.value = template.f || '';
          }
          _this = _super.call(this, options) || this;
          _this.select = findElement(_this.parent || _this.up, false, 'select');
          _this.isSelected = function () {
              var optionValue = _this.getAttribute('value');
              if (isUndefined(optionValue) || !_this.select) {
                  return false;
              }
              var selectValue = _this.select.getAttribute('value');
              if (_this.select.compare(selectValue, optionValue)) {
                  return true;
              }
              if (_this.select.getAttribute('multiple') && isArray(selectValue)) {
                  var i = selectValue.length;
                  while (i--) {
                      if (_this.select.compare(selectValue[i], optionValue)) {
                          return true;
                      }
                  }
              }
          };
          return _this;
      }
      Option.prototype.bind = function () {
          if (!this.select) {
              _super.prototype.bind.call(this);
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
          _super.prototype.bind.call(this);
          this.select.options.push(this);
      };
      Option.prototype.bubble = function () {
          // if we're using content as value, may need to update here
          var value = this.getAttribute('value');
          if (this.node && this.node.value !== value) {
              this.node._ractive.value = value;
          }
          _super.prototype.bubble.call(this);
      };
      // added any to avoid conflict with element function declaration
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Option.prototype.getAttribute = function (name) {
          var attribute = this.attributeByName[name];
          return attribute
              ? attribute.getValue()
              : name === 'value' && this.fragment
                  ? this.fragment.valueOf()
                  : undefined;
      };
      Option.prototype.render = function (target, occupants) {
          _super.prototype.render.call(this, target, occupants);
          if (!this.attributeByName.value) {
              this.node._ractive.value = this.getAttribute('value');
          }
      };
      Option.prototype.unbind = function (view) {
          _super.prototype.unbind.call(this, view);
          if (this.select) {
              removeFromArray(this.select.options, this);
          }
      };
      return Option;
  }(Element$1));

  var Select = /** @class */ (function (_super) {
      __extends(Select, _super);
      function Select(options) {
          var _this = _super.call(this, options) || this;
          _this.options = [];
          _this.foundNode = function (node) {
              if (_this.binding) {
                  var selectedOptions = getSelectedOptions(node);
                  if (selectedOptions.length > 0) {
                      _this.selectedOptions = selectedOptions;
                  }
              }
          };
          return _this;
      }
      Select.prototype.render = function (target, occupants) {
          _super.prototype.render.call(this, target, occupants);
          this.sync();
          var node = this.node;
          var i = node.options.length;
          while (i--) {
              node.options[i].defaultSelected = node.options[i].selected;
          }
          this.rendered = true;
      };
      Select.prototype.sync = function () {
          var _this = this;
          var selectNode = this.node;
          if (!selectNode)
              { return; }
          var options = toArray(selectNode.options);
          if (this.selectedOptions) {
              options.forEach(function (o) {
                  if (_this.selectedOptions.indexOf(o) >= 0)
                      { o.selected = true; }
                  else
                      { o.selected = false; }
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
          var binding = this.binding;
          if (selectValue !== undefined) {
              var optionWasSelected_1;
              options.forEach(function (o) {
                  var optionValue = o._ractive ? o._ractive.value : o.value;
                  var shouldSelect = isMultiple
                      ? array && _this.valueContains(selectValue, optionValue)
                      : _this.compare(selectValue, optionValue);
                  if (shouldSelect) {
                      optionWasSelected_1 = true;
                  }
                  o.selected = shouldSelect;
              });
              if (!optionWasSelected_1 && !isMultiple) {
                  if (binding) {
                      binding.forceUpdate();
                  }
              }
          }
          else if (binding === null || binding === void 0 ? void 0 : binding.forceUpdate) {
              // Otherwise the value should be initialised according to which
              // <option> element is selected, if twoway binding is in effect
              binding.forceUpdate();
          }
      };
      Select.prototype.valueContains = function (selectValue, optionValue) {
          var i = selectValue.length;
          while (i--) {
              if (this.compare(optionValue, selectValue[i]))
                  { return true; }
          }
      };
      Select.prototype.compare = function (optionValue, selectValue) {
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
      Select.prototype.update = function () {
          var dirty = this.dirty;
          _super.prototype.update.call(this);
          if (dirty) {
              this.sync();
          }
      };
      return Select;
  }(Element$1));

  var Textarea = /** @class */ (function (_super) {
      __extends(Textarea, _super);
      function Textarea(options) {
          var _this = this;
          var template = options.template;
          options.deferContent = true;
          _this = _super.call(this, options) || this;
          // check for single interpolator binding
          if (!_this.attributeByName.value) {
              if (template.f && isBindable({ template: template })) {
                  (_this.attributes || (_this.attributes = [])).push(createItem({
                      owner: _this,
                      template: { t: TemplateItemType$1.ATTRIBUTE, f: template.f, n: 'value' },
                      up: _this.up
                  }));
              }
              else {
                  _this.fragment = new Fragment({
                      owner: _this,
                      cssIds: null,
                      template: template.f
                  });
              }
          }
          return _this;
      }
      Textarea.prototype.bubble = function () {
          var _this = this;
          if (!this.dirty) {
              this.dirty = true;
              if (this.rendered && !this.binding && this.fragment) {
                  runloop.scheduleTask(function () {
                      _this.dirty = false;
                      _this.node.value = _this.fragment.toString();
                  });
              }
              this.up.bubble(); // default behaviour
          }
      };
      return Textarea;
  }(Input));

  var visible;
  var hidden = 'hidden';
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
  if (doc) {
      var prefix = void 0;
      /* istanbul ignore next */
      if (hidden in doc) {
          prefix = '';
      }
      else {
          var i$3 = vendors.length;
          while (i$3--) {
              var vendor = vendors[i$3];
              hidden = vendor + 'Hidden';
              if (hidden in doc) {
                  prefix = vendor;
                  break;
              }
          }
      }
      /* istanbul ignore else */
      if (prefix !== undefined) {
          doc.addEventListener(prefix + 'visibilitychange', onChange);
          onChange();
      }
      else {
          // gah, we're in an old browser
          if ('onfocusout' in doc) {
              // Why `as Document` because otherwise doc has type never (only inside this if)
              doc.addEventListener('focusout', onHide);
              doc.addEventListener('focusin', onShow);
          }
          else {
              win.addEventListener('pagehide', onHide);
              win.addEventListener('blur', onHide);
              win.addEventListener('pageshow', onShow);
              win.addEventListener('focus', onShow);
          }
          visible = true; // until proven otherwise. Not ideal but hey
      }
  }

  var vendorPattern = new RegExp('^(?:' + vendors.join('|') + ')([A-Z])');
  function hyphenate (str) {
      /* istanbul ignore next */
      if (!str)
          { return ''; } // edge case
      /* istanbul ignore next */
      if (vendorPattern.test(str))
          { str = '-' + str; }
      return str.replace(/[A-Z]/g, function (match) { return '-' + match.toLowerCase(); });
  }

  var createTransitions;
  if (!isClient) {
      createTransitions = null;
  }
  else {
      var testStyle = createElement('div').style;
      var linear_1 = function (x) { return x; };
      var canUseCssTransitions_1 = {};
      var cannotUseCssTransitions_1 = {};
      // determine some facts about our environment
      var TRANSITION = void 0;
      var TRANSITIONEND_1;
      var CSS_TRANSITIONS_ENABLED_1;
      var TRANSITION_DURATION_1;
      var TRANSITION_PROPERTY_1;
      var TRANSITION_TIMING_FUNCTION_1;
      if (testStyle.transition !== undefined) {
          TRANSITION = 'transition';
          TRANSITIONEND_1 = 'transitionend';
          CSS_TRANSITIONS_ENABLED_1 = true;
      }
      else if (testStyle.webkitTransition !== undefined) {
          TRANSITION = 'webkitTransition';
          TRANSITIONEND_1 = 'webkitTransitionEnd';
          CSS_TRANSITIONS_ENABLED_1 = true;
      }
      else {
          CSS_TRANSITIONS_ENABLED_1 = false;
      }
      if (TRANSITION) {
          TRANSITION_DURATION_1 = TRANSITION + 'Duration';
          TRANSITION_PROPERTY_1 = TRANSITION + 'Property';
          TRANSITION_TIMING_FUNCTION_1 = TRANSITION + 'TimingFunction';
      }
      createTransitions = function (t, to, options, changedProperties, resolve) {
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
                  property: style[TRANSITION_PROPERTY_1],
                  timing: style[TRANSITION_TIMING_FUNCTION_1],
                  duration: style[TRANSITION_DURATION_1]
              };
              function transitionEndHandler(event) {
                  if (event.target !== t.node)
                      { return; }
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
                  style[TRANSITION_PROPERTY_1] = previous.property;
                  style[TRANSITION_TIMING_FUNCTION_1] = previous.duration;
                  style[TRANSITION_DURATION_1] = previous.timing;
                  t.node.removeEventListener(TRANSITIONEND_1, transitionEndHandler, false);
                  cssTransitionsComplete = true;
                  checkComplete();
              }
              t.node.addEventListener(TRANSITIONEND_1, transitionEndHandler, false);
              // safety net in case transitionend never fires
              cssTimeout = setTimeout(function () {
                  changedProperties = [];
                  cssTransitionsDone();
              }, Number(options.duration) + (options.delay || 0) + 50);
              t.registerCompleteHandler(transitionDone);
              style[TRANSITION_PROPERTY_1] = changedProperties.join(',');
              var easingName = hyphenate(options.easing || 'linear');
              style[TRANSITION_TIMING_FUNCTION_1] = easingName;
              var cssTiming = style[TRANSITION_TIMING_FUNCTION_1] === easingName;
              style[TRANSITION_DURATION_1] = Number(options.duration) / 1000 + 's';
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
                      if (cssTiming && CSS_TRANSITIONS_ENABLED_1 && !cannotUseCssTransitions_1[hash]) {
                          var initial = style[prop];
                          style[prop] = to[prop];
                          // If we're not sure if CSS transitions are supported for
                          // this tag/property combo, find out now
                          if (!(hash in canUseCssTransitions_1)) {
                              originalValue = t.getStyle(prop);
                              // if this property is transitionable in this browser,
                              // the current style will be different from the target style
                              canUseCssTransitions_1[hash] = t.getStyle(prop) != to[prop];
                              cannotUseCssTransitions_1[hash] = !canUseCssTransitions_1[hash];
                              // Reset, if we're going to use timers after all
                              if (cannotUseCssTransitions_1[hash]) {
                                  style[prop] = initial;
                              }
                          }
                      }
                      if (!cssTiming || !CSS_TRANSITIONS_ENABLED_1 || cannotUseCssTransitions_1[hash]) {
                          // we need to fall back to timer-based stuff
                          if (originalValue === null)
                              { originalValue = t.getStyle(prop); }
                          // need to remove this from changedProperties, otherwise transitionEndHandler
                          // will get confused
                          index = changedProperties.indexOf(prop);
                          if (index === -1) {
                              warnIfDebug('Something very strange happened with transitions. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!', { node: t.node });
                          }
                          else {
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
                          }
                          else {
                              style[prop] = to[prop];
                          }
                          originalValue = null;
                      }
                  }
                  // javascript transitions
                  if (propertiesToTransitionInJs.length) {
                      var easing = void 0;
                      if (isString(options.easing)) {
                          easing = t.ractive.easing[options.easing];
                          if (!easing) {
                              warnOnceIfDebug(missingPlugin(options.easing, 'easing'));
                              easing = linear_1;
                          }
                      }
                      else if (isFunction(options.easing)) {
                          easing = options.easing;
                      }
                      else {
                          easing = linear_1;
                      }
                      new Ticker({
                          duration: Number(options.duration),
                          easing: easing,
                          step: function (pos) {
                              var i = propertiesToTransitionInJs.length;
                              while (i--) {
                                  var prop_1 = propertiesToTransitionInJs[i];
                                  style[prop_1.name] = prop_1.interpolator(pos) + prop_1.suffix;
                              }
                          },
                          complete: function () {
                              jsTransitionsComplete = true;
                              checkComplete();
                          }
                      });
                  }
                  else {
                      jsTransitionsComplete = true;
                  }
                  if (changedProperties.length) {
                      style[TRANSITION_PROPERTY_1] = changedProperties.join(',');
                  }
                  else {
                      style[TRANSITION_PROPERTY_1] = 'none';
                      // We need to cancel the transitionEndHandler, and deal with
                      // the fact that it will never fire
                      t.node.removeEventListener(TRANSITIONEND_1, transitionEndHandler, false);
                      cssTransitionsComplete = true;
                      checkComplete();
                  }
              }, 0);
          }, options.delay || 0);
      };
  }
  var createTransitions$1 = createTransitions;

  var prefix$1;
  /* istanbul ignore next */
  if (!isClient) {
      prefix$1 = null;
  }
  else {
      var prefixCache_1 = {};
      var testStyle_1 = createElement('div').style;
      // technically this also normalizes on hyphenated styles as well
      prefix$1 = function (prop) {
          if (!prefixCache_1[prop]) {
              var name_1 = hyphenateCamel(prop);
              if (testStyle_1[prop] !== undefined) {
                  prefixCache_1[prop] = name_1;
              }
              else {
                  /* istanbul ignore next */
                  // test vendors...
                  var i = vendors.length;
                  while (i--) {
                      var vendor = "-" + vendors[i] + "-" + name_1;
                      if (testStyle_1[vendor] !== undefined) {
                          prefixCache_1[prop] = vendor;
                          break;
                      }
                  }
              }
          }
          return prefixCache_1[prop];
      };
  }
  var prefix$2 = prefix$1;

  var getComputedStyle = win && win.getComputedStyle;
  var resolved = Promise.resolve();
  var names = {
      t0: 'intro-outro',
      t1: 'intro',
      t2: 'outro'
  };
  var Transition = /** @class */ (function () {
      function Transition(options) {
          this.destroyed = noop;
          this.firstNode = noop;
          this.rebound = noop;
          this.render = noop;
          this.unrender = noop;
          this.update = noop;
          this.owner = options.owner || options.up.owner || findElement(options.up);
          // TSRChange - changed check using in to avoid errors related to type
          this.element = 'attributeByName' in this.owner ? this.owner : findElement(options.up);
          this.ractive = this.owner.ractive;
          this.template = options.template;
          this.up = options.up;
          this.options = options;
          this.onComplete = [];
      }
      Transition.prototype.animateStyle = function (style, value, options) {
          var _this = this;
          if (arguments.length === 4) {
              throw new Error('t.animateStyle() returns a promise - use .then() instead of passing a callback');
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
          }
          else {
              to = style;
              // shuffle arguments
              options = value;
          }
          return new Promise(function (fulfil) {
              // Edge case - if duration is zero, set style synchronously and complete
              if (!options.duration) {
                  _this.setStyle(to);
                  fulfil();
                  return;
              }
              // Get a list of the properties we're animating
              var propertyNames = keys(to);
              var changedProperties = [];
              // Store the current styles
              var computedStyle = getComputedStyle(_this.node);
              var i = propertyNames.length;
              while (i--) {
                  var prop = propertyNames[i];
                  var name_1 = prefix$2(prop);
                  var current = computedStyle[prefix$2(prop)];
                  // record the starting points
                  var init = _this.node.style[name_1];
                  if (!(name_1 in _this.originals))
                      { _this.originals[name_1] = _this.node.style[name_1]; }
                  _this.node.style[name_1] = to[prop];
                  _this.targets[name_1] = _this.node.style[name_1];
                  _this.node.style[name_1] = init;
                  // we need to know if we're actually changing anything
                  if (current != to[prop]) {
                      // use != instead of !==, so we can compare strings with numbers
                      changedProperties.push(name_1);
                      // if we happened to prefix, make sure there is a properly prefixed value
                      to[name_1] = to[prop];
                      // make the computed style explicit, so we can animate where
                      // e.g. height='auto'
                      _this.node.style[name_1] = current;
                  }
              }
              // If we're not actually changing anything, the transitionend event
              // will never fire! So we complete early
              if (!changedProperties.length) {
                  fulfil();
                  return;
              }
              createTransitions$1(_this, to, options, changedProperties, fulfil);
          });
      };
      Transition.prototype.bind = function () {
          var options = this.options;
          var type = options.template && options.template.v;
          if (type) {
              if (type === "t0" /* INTRO_OUTRO */ || type === "t1" /* INTRO */)
                  { this.element.intro = this; }
              if (type === "t0" /* INTRO_OUTRO */ || type === "t2" /* OUTRO */)
                  { this.element.outro = this; }
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
          }
          else {
              this._fn = findInViewHierarchy('transitions', ractive, this.name);
          }
          if (!this._fn) {
              warnOnceIfDebug(missingPlugin(this.name, 'transition'), { ractive: ractive });
          }
          setupArgsFn(this, options.template);
      };
      Transition.prototype.getParams = function () {
          if (this.params)
              { return this.params; }
          // get expression args if supplied
          if (this.fn) {
              var values = resolveArgs(this, this.template, this.up).map(function (model) {
                  if (!model)
                      { return undefined; }
                  return model.get();
              });
              return this.fn.apply(this.ractive, values);
          }
      };
      Transition.prototype.getStyle = function (props) {
          var computedStyle = getComputedStyle(this.node);
          if (isString(props)) {
              return computedStyle[prefix$2(props)];
          }
          if (!isArray(props)) {
              throw new Error('Transition$getStyle must be passed a string, or an array of strings representing CSS properties');
          }
          var styles = {};
          var i = props.length;
          while (i--) {
              var prop = props[i];
              var value = computedStyle[prefix$2(prop)];
              if (value === '0px')
                  { value = '0'; }
              styles[prop] = value;
          }
          return styles;
      };
      Transition.prototype.processParams = function (params, defaults) {
          if (isNumber(params)) {
              params = { duration: params };
          }
          else if (isString(params)) {
              if (params === 'slow') {
                  params = { duration: 600 };
              }
              else if (params === 'fast') {
                  params = { duration: 200 };
              }
              else {
                  params = { duration: 400 };
              }
          }
          else if (!params) {
              params = {};
          }
          return assign({}, defaults, params);
      };
      Transition.prototype.registerCompleteHandler = function (fn) {
          addToArray(this.onComplete, fn);
      };
      Transition.prototype.setStyle = function (style, value) {
          if (isString(style)) {
              var name_2 = prefix$2(style);
              if (!hasOwn(this.originals, name_2))
                  { this.originals[name_2] = this.node.style[name_2]; }
              this.node.style[name_2] = value;
              this.targets[name_2] = this.node.style[name_2];
          }
          else {
              var prop = void 0;
              for (prop in style) {
                  if (hasOwn(style, prop)) {
                      this.setStyle(prop, style[prop]);
                  }
              }
          }
          return this;
      };
      Transition.prototype.shouldFire = function (type) {
          if (!this.ractive.transitionsEnabled)
              { return false; }
          // check for noIntro and noOutro cases, which only apply when the owner ractive is rendering and unrendering, respectively
          if (type === 'intro' && this.ractive.rendering && nearestProp('noIntro', this.ractive, true))
              { return false; }
          if (type === 'outro' && this.ractive.unrendering && nearestProp('noOutro', this.ractive, false))
              { return false; }
          var params = this.getParams(); // this is an array, the params object should be the first member
          // if there's not a parent element, this can't be nested, so roll on
          if (!this.element.parent)
              { return true; }
          // if there is a local param, it takes precedent
          if (params && params[0] && isObject(params[0]) && 'nested' in params[0]) {
              if (params[0].nested !== false)
                  { return true; }
          }
          else {
              // use the nearest instance setting
              // find the nearest instance that actually has a nested setting
              if (nearestProp('nestedTransitions', this.ractive) !== false)
                  { return true; }
          }
          // check to see if this is actually a nested transition
          var el = this.element.parent;
          while (el) {
              if (el[type] && el[type].starting)
                  { return false; }
              el = el.parent;
          }
          return true;
      };
      Transition.prototype.start = function () {
          var _this = this;
          var node = (this.node = this.element.node);
          var originals = (this.originals = {}); //= node.getAttribute( 'style' );
          var targets = (this.targets = {});
          var completed;
          var args = this.getParams();
          // create t.complete() - we don't want this on the prototype,
          // because we don't want `this` silliness when passing it as
          // an argument
          this.complete = function (noReset) {
              _this.starting = false;
              if (completed) {
                  return;
              }
              _this.onComplete.forEach(function (fn) { return fn(); });
              if (!noReset && _this.isIntro) {
                  for (var k in targets) {
                      if (node.style[k] === targets[k])
                          { node.style[k] = originals[k]; }
                  }
              }
              _this._manager.remove(_this);
              completed = true;
          };
          // If the transition function doesn't exist, abort
          if (!this._fn) {
              this.complete();
              return;
          }
          var promise = this._fn.apply(this.ractive, [this].concat(args));
          if (promise)
              { promise.then(this.complete); }
      };
      Transition.prototype.toString = function () {
          return '';
      };
      Transition.prototype.unbind = function () {
          if (!this.element.attributes.unbinding) {
              var type = this.options && this.options.template && this.options.template.v;
              if (type === "t0" /* INTRO_OUTRO */ || type === "t1" /* INTRO */)
                  { this.element.intro = null; }
              if (type === "t0" /* INTRO_OUTRO */ || type === "t2" /* OUTRO */)
                  { this.element.outro = null; }
          }
      };
      Transition.prototype.unregisterCompleteHandler = function (fn) {
          removeFromArray(this.onComplete, fn);
      };
      return Transition;
  }());
  // const proto = Transition.prototype;
  // proto.destroyed = proto.firstNode = proto.rebound = proto.render = proto.unrender = proto.update = noop;
  function nearestProp(prop, ractive, rendering) {
      var instance = ractive;
      while (instance) {
          if (hasOwn(instance, prop) &&
              (isUndefined(rendering) || rendering ? instance.rendering : instance.unrendering))
              { return instance[prop]; }
          instance = instance.component && instance.component.ractive;
      }
      return ractive[prop];
  }

  function progressiveText(item, target, occupants, text) {
      if (occupants) {
          var n = occupants[0];
          if ((n === null || n === void 0 ? void 0 : n.nodeType) === Node.TEXT_NODE) {
              var idx = n.nodeValue.indexOf(text);
              occupants.shift();
              if (idx === 0) {
                  if (n.nodeValue.length !== text.length) {
                      // Check if the node is text is performed before
                      occupants.unshift(n.splitText(text.length));
                  }
              }
              else {
                  n.nodeValue = text;
              }
          }
          else {
              n = item.node = doc.createTextNode(text);
              if (occupants[0]) {
                  target.insertBefore(n, occupants[0]);
              }
              else {
                  target.appendChild(n);
              }
          }
          item.node = n;
      }
      else {
          if (!item.node)
              { item.node = doc.createTextNode(text); }
          target.appendChild(item.node);
      }
  }

  var Interpolator = /** @class */ (function (_super) {
      __extends(Interpolator, _super);
      function Interpolator(options) {
          return _super.call(this, options) || this;
      }
      Interpolator.prototype.bubble = function () {
          if (this.owner)
              { this.owner.bubble(); }
          _super.prototype.bubble.call(this);
      };
      Interpolator.prototype.detach = function () {
          return detachNode(this.node);
      };
      Interpolator.prototype.firstNode = function () {
          return this.node;
      };
      Interpolator.prototype.getString = function () {
          return this.model ? safeToStringValue(this.model.get()) : '';
      };
      Interpolator.prototype.render = function (target, occupants) {
          if (inAttributes())
              { return; }
          var value = (this.value = this.getString());
          this.rendered = true;
          progressiveText(this, target, occupants, value);
      };
      Interpolator.prototype.toString = function (escape) {
          var string = this.getString();
          return escape ? escapeHtml(string) : string;
      };
      Interpolator.prototype.unrender = function (shouldDestroy) {
          if (shouldDestroy)
              { this.detach(); }
          this.rendered = false;
      };
      Interpolator.prototype.update = function () {
          if (this.dirty) {
              this.dirty = false;
              if (this.rendered) {
                  var value = this.getString();
                  if (value !== this.value)
                      { this.node.data = this.value = value; }
              }
          }
      };
      Interpolator.prototype.valueOf = function () {
          return this.model ? this.model.get() : undefined;
      };
      return Interpolator;
  }(Mustache));

  var keypathString = /^"(\\"|[^"])+"$/;
  var RepeatedFragment = /** @class */ (function () {
      function RepeatedFragment(options) {
          this.getContext = getContext;
          this.getKeypath = getKeypath;
          this.parent = options.owner.up;
          // bit of a hack, so reference resolution works without another
          // layer of indirection
          this.up = this;
          this.owner = options.owner;
          this.ractive = this.parent.ractive;
          this.delegate =
              this.ractive.delegate !== false && (this.parent.delegate || findDelegate(this.parent));
          // delegation disabled by directive
          if (this.delegate && this.delegate.delegate === false)
              { this.delegate = false; }
          // let the element know it's a delegate handler
          if (this.delegate)
              { this.delegate.delegate = this.delegate; }
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
      }
      RepeatedFragment.prototype.bind = function (context) {
          var _this = this;
          var _a;
          this.context = context;
          this.bound = true;
          var value = context.get();
          var aliases = (this.aliases = this.owner.template.z && this.owner.template.z.slice());
          var shuffler = aliases && aliases.find(function (a) { return a.n === 'shuffle'; });
          if ((_a = shuffler === null || shuffler === void 0 ? void 0 : shuffler.x) === null || _a === void 0 ? void 0 : _a.x) {
              if (shuffler.x.x.s === 'true')
                  { this.shuffler = true; }
              else if (keypathString.test(shuffler.x.x.s))
                  { this.shuffler = splitKeypath(shuffler.x.x.s.slice(1, -1)); }
          }
          if (this.shuffler)
              { this.values = shuffleValues(this, this.shuffler); }
          // TSRChange - unbind is present on an item and not on a model
          // if (this.source) this.source.model.unbind(this.source);
          var source = context.isComputed && aliases && aliases.find(function (a) { return a.n === 'source'; });
          if (source && source.x && source.x.r) {
              var model = resolve$1(this, source.x);
              this.source = {
                  handleChange: function () { },
                  rebind: function (next) {
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
                  this.iterations[i] = this.createIteration(i, i);
              }
          }
          else if (isObject(value)) {
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
                  return _this.createIteration(key, index);
              });
          }
          return this;
      };
      RepeatedFragment.prototype.bubble = function (index) {
          if (!this.bubbled)
              { this.bubbled = []; }
          this.bubbled.push(index);
          if (!this.rebounding)
              { this.owner.bubble(); }
      };
      RepeatedFragment.prototype.createIteration = function (key, index) {
          var fragment = new Fragment({
              owner: this,
              template: this.template
          });
          fragment.isIteration = true;
          fragment.delegate = this.delegate;
          if (this.aliases)
              { fragment.aliases = {}; }
          swizzleFragment(this, fragment, key, index);
          return fragment.bind(fragment.context);
      };
      RepeatedFragment.prototype.destroyed = function () {
          var len = this.iterations.length;
          for (var i = 0; i < len; i++)
              { this.iterations[i].destroyed(); }
          if (this.pathModel)
              { this.pathModel.destroyed(); }
          if (this.rootModel)
              { this.rootModel.destroyed(); }
      };
      RepeatedFragment.prototype.detach = function () {
          var docFrag = createDocumentFragment();
          this.iterations.forEach(function (fragment) { return docFrag.appendChild(fragment.detach()); });
          return docFrag;
      };
      RepeatedFragment.prototype.find = function (selector, options) {
          return findMap(this.iterations, function (i) { return i.find(selector, options); });
      };
      RepeatedFragment.prototype.findAll = function (selector, options) {
          return this.iterations.forEach(function (i) { return i.findAll(selector, options); });
      };
      RepeatedFragment.prototype.findAllComponents = function (name, options) {
          return this.iterations.forEach(function (i) { return i.findAllComponents(name, options); });
      };
      RepeatedFragment.prototype.findComponent = function (name, options) {
          return findMap(this.iterations, function (i) { return i.findComponent(name, options); });
      };
      RepeatedFragment.prototype.findContext = function () {
          return this.context;
      };
      RepeatedFragment.prototype.findNextNode = function (iteration) {
          if (iteration.index < this.iterations.length - 1) {
              for (var i = iteration.index + 1; i < this.iterations.length; i++) {
                  var node = this.iterations[i].firstNode(true);
                  if (node)
                      { return node; }
              }
          }
          return this.owner.findNextNode();
      };
      RepeatedFragment.prototype.firstNode = function (skipParent) {
          return this.iterations[0] ? this.iterations[0].firstNode(skipParent) : null;
      };
      RepeatedFragment.prototype.getLast = function () {
          return this.lastModel || (this.lastModel = new KeyModel(this.length - 1));
      };
      RepeatedFragment.prototype.rebind = function (next) {
          var _this = this;
          this.context = next;
          if (this.source)
              { return; }
          if (next) {
              this.iterations.forEach(function (fragment) {
                  swizzleFragment(_this, fragment, fragment.key, fragment.index);
              });
          }
      };
      RepeatedFragment.prototype.rebound = function (update) {
          var _this = this;
          this.context = this.owner.model;
          this.iterations.forEach(function (f, i) {
              f.context = contextFor(_this, i);
              f.rebound(update);
          });
      };
      RepeatedFragment.prototype.render = function (target, occupants) {
          var xs = this.iterations;
          if (xs) {
              var len = xs.length;
              for (var i = 0; i < len; i++) {
                  xs[i].render(target, occupants);
              }
          }
          this.rendered = true;
      };
      RepeatedFragment.prototype.shuffle = function (newIndices, merge) {
          var _this = this;
          if (!this.pendingNewIndices)
              { this.previousIterations = this.iterations.slice(); }
          if (!this.pendingNewIndices)
              { this.pendingNewIndices = []; }
          this.pendingNewIndices.push(newIndices);
          var iterations = [];
          newIndices.forEach(function (newIndex, oldIndex) {
              if (newIndex === -1)
                  { return; }
              var fragment = _this.iterations[oldIndex];
              iterations[newIndex] = fragment;
              if (newIndex !== oldIndex && fragment) {
                  fragment.dirty = true;
                  if (merge)
                      { fragment.shouldRebind = 1; }
              }
          });
          this.iterations = iterations;
          // if merging, we're in the midst of an update already
          if (!merge)
              { this.bubble(); }
      };
      RepeatedFragment.prototype.shuffled = function () {
          this.iterations.forEach(shuffled);
      };
      RepeatedFragment.prototype.toString = function (escape) {
          return this.iterations ? this.iterations.map(escape ? toEscapedString : toString$1).join('') : '';
      };
      RepeatedFragment.prototype.unbind = function (view) {
          this.bound = false;
          if (this.source)
              { this.source.model.unregister(this.source); }
          var iterations = this.pendingNewIndices ? this.previousIterations : this.iterations;
          var len = iterations.length;
          for (var i = 0; i < len; i++)
              { iterations[i].unbind(view); }
          return this;
      };
      RepeatedFragment.prototype.unrender = function (shouldDestroy) {
          var len = this.iterations.length;
          for (var i = 0; i < len; i++)
              { this.iterations[i].unrender(shouldDestroy); }
          if (this.pendingNewIndices && this.previousIterations) {
              len = this.previousIterations.length;
              for (var i = 0; i < len; i++)
                  { this.previousIterations[i].unrender(shouldDestroy); }
          }
          this.rendered = false;
      };
      RepeatedFragment.prototype.update = function () {
          var _this = this;
          if (this.pendingNewIndices) {
              this.bubbled.length = 0;
              this.updatePostShuffle();
              return;
          }
          if (this.updating)
              { return; }
          this.updating = true;
          if (this.shuffler) {
              var values = shuffleValues(this, this.shuffler);
              var newIndices = buildNewIndices(this.values, values);
              if (!newIndices.same) {
                  this.shuffle(newIndices, true);
                  this.updatePostShuffle();
              }
              else {
                  this.iterations.forEach(update);
              }
          }
          else {
              var len = this.iterations.length;
              for (var i_1 = 0; i_1 < len; i_1++) {
                  var f = this.iterations[i_1];
                  f && f.idxModel && f.idxModel.applyValue(i_1);
              }
              var value_1 = this.context.get();
              var wasArray = this.isArray;
              var toRemove = void 0;
              var oldKeys_1;
              var reset = true;
              var i_2;
              if ((this.isArray = isArray(value_1))) {
                  // if there's a source to map back to, make sure everything stays bound correctly
                  if (this.source) {
                      this.rebounding = 1;
                      var source_1 = this.source.model.get();
                      this.iterations.forEach(function (f, c) {
                          if (c < value_1.length && f.lastValue !== value_1[c] && ~(i_2 = source_1.indexOf(value_1[c]))) {
                              swizzleFragment(_this, f, c, c);
                              f.rebound(true);
                          }
                      });
                      this.rebounding = 0;
                  }
                  if (wasArray) {
                      reset = false;
                      if (this.iterations.length > value_1.length) {
                          toRemove = this.iterations.splice(value_1.length);
                      }
                  }
              }
              else if (isObject(value_1) && !wasArray) {
                  reset = false;
                  toRemove = [];
                  oldKeys_1 = {};
                  i_2 = this.iterations.length;
                  while (i_2--) {
                      var fragment_1 = this.iterations[i_2];
                      if (fragment_1.key in value_1) {
                          oldKeys_1[fragment_1.key] = true;
                      }
                      else {
                          this.iterations.splice(i_2, 1);
                          toRemove.push(fragment_1);
                      }
                  }
              }
              var newLength = isArray(value_1) ? value_1.length : isObject(value_1) ? keys(value_1).length : 0;
              this.length = newLength;
              this.updateLast();
              if (reset) {
                  toRemove = this.iterations;
                  this.iterations = [];
              }
              if (toRemove) {
                  len = toRemove.length;
                  for (var i_3 = 0; i_3 < len; i_3++)
                      { toRemove[i_3].unbind().unrender(true); }
              }
              // update the remaining ones
              if (!reset && this.isArray && this.bubbled && this.bubbled.length) {
                  var bubbled = this.bubbled;
                  this.bubbled = [];
                  len = bubbled.length;
                  for (var i_4 = 0; i_4 < len; i_4++)
                      { this.iterations[bubbled[i_4]] && this.iterations[bubbled[i_4]].update(); }
              }
              else {
                  len = this.iterations.length;
                  for (var i_5 = 0; i_5 < len; i_5++)
                      { this.iterations[i_5].update(); }
              }
              // add new iterations
              var docFrag_1;
              var fragment_2;
              if (newLength > this.iterations.length) {
                  docFrag_1 = this.rendered ? createDocumentFragment() : null;
                  i_2 = this.iterations.length;
                  if (isArray(value_1)) {
                      while (i_2 < value_1.length) {
                          fragment_2 = this.createIteration(i_2, i_2);
                          this.iterations.push(fragment_2);
                          if (this.rendered)
                              { fragment_2.render(docFrag_1); }
                          i_2 += 1;
                      }
                  }
                  else if (isObject(value_1)) {
                      // TODO this is a dreadful hack. There must be a neater way
                      if (this.indexRef && !this.keyRef) {
                          var refs = this.indexRef.split(',');
                          this.keyRef = refs[0];
                          this.indexRef = refs[1];
                      }
                      keys(value_1).forEach(function (key) {
                          if (!oldKeys_1 || !(key in oldKeys_1)) {
                              fragment_2 = _this.createIteration(key, i_2);
                              _this.iterations.push(fragment_2);
                              if (_this.rendered)
                                  { fragment_2.render(docFrag_1); }
                              i_2 += 1;
                          }
                      });
                  }
                  if (this.rendered) {
                      var parentNode = this.parent.findParentNode();
                      var anchor = this.parent.findNextNode(this.owner);
                      parentNode.insertBefore(docFrag_1, anchor);
                  }
              }
          }
          this.updating = false;
      };
      RepeatedFragment.prototype.updateLast = function () {
          if (this.lastModel)
              { this.lastModel.applyValue(this.length - 1); }
      };
      RepeatedFragment.prototype.updatePostShuffle = function () {
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
                  next = iters[idx] = this.createIteration(idx, idx);
                  if (parentNode) {
                      anchor = prev[pos];
                      anchor = (anchor && parentNode && anchor.firstNode()) || nextNode;
                      next.render(docFrag);
                      parentNode.insertBefore(docFrag, anchor);
                  }
                  idx++;
              }
              else {
                  dest = newIndices[pos];
                  if (dest === -1) {
                      // if it needs to be dropped, drop it
                      prev[pos] && prev[pos].unbind().unrender(true);
                      // TSRChange - change `0` to `null` to avoid type conflict
                      prev[pos++] = null;
                  }
                  else if (dest > idx) {
                      // if it needs to move down, stash it
                      stash[dest] = prev[pos];
                      prev[pos++] = null;
                  }
                  else {
                      // get the fragment that goes for this idx
                      iters[idx] = next = iters[idx] || stash[idx] || this.createIteration(idx, idx);
                      // if it's an existing fragment, swizzle
                      if (stash[idx] || pos !== idx) {
                          rebound = this.source && next.lastValue !== value[idx];
                          swizzleFragment(this, next, idx, idx);
                      }
                      // does next need to be moved?
                      if (parentNode && (stash[idx] || !prev[pos])) {
                          anchor = prev[pos + 1];
                          anchor = (anchor && parentNode && anchor.firstNode()) || nextNode;
                          if (stash[idx]) {
                              parentNode.insertBefore(next.detach(), anchor);
                          }
                          else {
                              next.render(docFrag);
                              parentNode.insertBefore(docFrag, anchor);
                          }
                      }
                      // TSRChange - change `0` to `null` to avoid type conflict
                      prev[pos++] = null;
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
          for (var i = 0; i < plen; i++)
              { prev[i] && prev[i].unbind().unrender(true); }
          if (this.shuffler)
              { this.values = shuffleValues(this, this.shuffler); }
          this.pendingNewIndices = null;
          this.previousIterations = null;
      };
      return RepeatedFragment;
  }());
  // find the topmost delegate
  function findDelegate(start) {
      var frag = start;
      var delegate, el;
      out: while (frag) {
          // find next element
          el = 0;
          while (!el && frag) {
              if (frag.owner.type === TemplateItemType$1.ELEMENT)
                  { el = frag.owner; }
              if (frag.owner.ractive && frag.owner.ractive.delegate === false)
                  { break out; }
              frag = frag.parent || frag.componentParent;
          }
          if (el.delegate === false)
              { break out; }
          delegate = el.delegate || el;
          // find next repeated fragment
          while (frag) {
              if (frag.iterations)
                  { break; }
              if (frag.owner.ractive && frag.owner.ractive.delegate === false)
                  { break out; }
              frag = frag.parent || frag.componentParent;
          }
      }
      return delegate;
  }
  function swizzleFragment(section, fragment, key, idx) {
      var _a;
      var model = section.context ? contextFor(section, key) : undefined;
      fragment.key = key;
      fragment.index = idx;
      fragment.context = model;
      if (section.source)
          { fragment.lastValue = model && model.get(); }
      if (fragment.idxModel)
          { fragment.idxModel.applyValue(idx); }
      if (fragment.keyModel)
          { fragment.keyModel.applyValue(key); }
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
      (_a = section.aliases) === null || _a === void 0 ? void 0 : _a.forEach(function (a) {
          if (a.x.r === '.')
              { aliases[a.n] = model; }
          else if (a.x.r === '@index')
              { aliases[a.n] = fragment.getIndex(); }
          else if (a.x.r === '@key')
              { aliases[a.n] = fragment.getKey(); }
          else if (a.x.r === '@keypath')
              { aliases[a.n] = fragment.getKeypath(); }
          else if (a.x.r === '@rootpath')
              { aliases[a.n] = fragment.getKeypath(true); }
      });
  }
  function shuffleValues(section, shuffler) {
      var array = section.context.get() || [];
      if (shuffler === true) {
          return array.slice();
      }
      else {
          return array.map(function (v) { return shuffler.reduce(function (a, c) { return a && a[c]; }, v); });
      }
  }
  // TSRChange - removed fragment param
  function contextFor(section, key) {
      if (section.source) {
          var idx = void 0;
          var source = section.source.model.get();
          if (source.indexOf && ~(idx = source.indexOf(section.context.joinKey(key).get())))
              { return section.source.model.joinKey(idx); }
      }
      return section.context.joinKey(key);
  }

  function isEmpty(value) {
      return (!value ||
          (isArray(value) && value.length === 0) ||
          (isObject(value) && keys(value).length === 0));
  }
  function getType(value, hasIndexRef) {
      if (hasIndexRef || isArray(value))
          { return TemplateItemType$1.SECTION_EACH; }
      if (isObjectLike(value))
          { return TemplateItemType$1.SECTION_IF_WITH; }
      if (isUndefined(value))
          { return null; }
      return TemplateItemType$1.SECTION_IF;
  }
  var Section = /** @class */ (function (_super) {
      __extends(Section, _super);
      function Section(options) {
          var _this = _super.call(this, options) || this;
          _this.isAlias = options.template.t === TemplateItemType$1.ALIAS;
          _this.sectionType =
              options.template.n || (_this.isAlias && TemplateItemType$1.SECTION_WITH) || null;
          _this.templateSectionType = _this.sectionType;
          _this.subordinate = options.template.l === 1;
          _this.fragment = null;
          return _this;
      }
      Section.prototype.bind = function () {
          _super.prototype.bind.call(this);
          if (this.subordinate) {
              this.sibling = this.up.items[this.up.items.indexOf(this) - 1];
              this.sibling.nextSibling = this;
          }
          // if we managed to bind, we need to create children
          if (this.model || this.isAlias) {
              this.dirty = true;
              this.update();
          }
          else if (this.sectionType &&
              this.sectionType === TemplateItemType$1.SECTION_UNLESS &&
              (!this.sibling || !this.sibling.isTruthy())) {
              this.fragment = new Fragment({
                  owner: this,
                  template: this.template.f
              }).bind();
          }
      };
      Section.prototype.bubble = function () {
          if (!this.dirty && this.yield) {
              this.dirty = true;
              this.containerFragment.bubble();
          }
          else
              { _super.prototype.bubble.call(this); }
      };
      Section.prototype.detach = function () {
          var frag = this.fragment || this.detached;
          return frag ? frag.detach() : _super.prototype.detach.call(this);
      };
      Section.prototype.findNextNode = function () {
          return (this.containerFragment || this.up).findNextNode(this);
      };
      Section.prototype.isTruthy = function () {
          if (this.subordinate && this.sibling.isTruthy())
              { return true; }
          var value = !this.model ? undefined : this.model.isRoot ? this.model.value : this.model.get();
          return (!!value && (this.templateSectionType === TemplateItemType$1.SECTION_IF_WITH || !isEmpty(value)));
      };
      Section.prototype.rebind = function (next, previous, safe) {
          if (_super.prototype.rebind.call(this, next, previous, safe)) {
              if (this.fragment &&
                  this.sectionType !== TemplateItemType$1.SECTION_IF &&
                  this.sectionType !== TemplateItemType$1.SECTION_UNLESS) {
                  this.fragment.rebind(next);
              }
          }
          return true;
      };
      Section.prototype.rebound = function (update) {
          if (this.model) {
              if ('rebound' in this.model)
                  { this.model.rebound(update); }
              else {
                  _super.prototype.unbind.call(this);
                  _super.prototype.bind.call(this);
                  if (this.sectionType === TemplateItemType$1.SECTION_WITH ||
                      this.sectionType === TemplateItemType$1.SECTION_IF_WITH ||
                      this.sectionType === TemplateItemType$1.SECTION_EACH) {
                      if (this.fragment)
                          { this.fragment.rebind(this.model); }
                  }
                  if (update)
                      { this.bubble(); }
              }
          }
          if (this.fragment)
              { this.fragment.rebound(update); }
      };
      Section.prototype.render = function (target, occupants) {
          this.rendered = true;
          if (this.fragment)
              { this.fragment.render(target, occupants); }
      };
      Section.prototype.shuffle = function (newIndices) {
          if (this.fragment && this.sectionType === TemplateItemType$1.SECTION_EACH) {
              this.fragment.shuffle(newIndices);
          }
      };
      Section.prototype.unbind = function (view) {
          _super.prototype.unbind.call(this);
          if (this.fragment)
              { this.fragment.unbind(view); }
      };
      Section.prototype.unrender = function (shouldDestroy) {
          if (this.rendered && this.fragment)
              { this.fragment.unrender(shouldDestroy); }
          this.rendered = false;
      };
      Section.prototype.update = function () {
          var _this = this;
          if (!this.dirty)
              { return; }
          if (this.fragment &&
              this.sectionType !== TemplateItemType$1.SECTION_IF &&
              this.sectionType !== TemplateItemType$1.SECTION_UNLESS) {
              this.fragment.context = this.model;
          }
          if (!this.model && this.sectionType !== TemplateItemType$1.SECTION_UNLESS && !this.isAlias)
              { return; }
          this.dirty = false;
          var value = !this.model ? undefined : this.model.isRoot ? this.model.value : this.model.get();
          var siblingFalsey = !this.subordinate || !this.sibling.isTruthy();
          var lastType = this.sectionType;
          if (this.yield && this.yield !== value) {
              this.up = this.containerFragment;
              this.container = null;
              this.yield = null;
              if (this.rendered)
                  { this.fragment.unbind().unrender(true); }
              this.fragment = null;
          }
          else if (this.rendered && !this.yield && value instanceof Context) {
              if (this.rendered && this.fragment)
                  { this.fragment.unbind().unrender(true); }
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
          var fragmentShouldExist = this.sectionType === TemplateItemType$1.SECTION_EACH || // each always gets a fragment, which may have no iterations
              this.sectionType === TemplateItemType$1.SECTION_WITH || // with (partial context) always gets a fragment
              (siblingFalsey &&
                  (this.sectionType === TemplateItemType$1.SECTION_UNLESS
                      ? !this.isTruthy()
                      : this.isTruthy())) || // if, unless, and if-with depend on siblings and the condition
              this.isAlias;
          if (fragmentShouldExist) {
              if (!this.fragment)
                  { this.fragment = this.detached; }
              if (this.fragment) {
                  // check for detached fragment
                  if (this.detached) {
                      attach(this, this.fragment);
                      this.detached = null;
                      this.rendered = true;
                  }
                  if (!this.fragment.bound)
                      { this.fragment.bind(this.model); }
                  this.fragment.update();
              }
              else {
                  if (this.sectionType === TemplateItemType$1.SECTION_EACH) {
                      newFragment = new RepeatedFragment({
                          owner: this,
                          template: this.template.f,
                          indexRef: this.template.i
                      }).bind(this.model);
                  }
                  else {
                      // only with and if-with provide context - if and unless do not
                      var context = this.sectionType !== TemplateItemType$1.SECTION_IF &&
                          this.sectionType !== TemplateItemType$1.SECTION_UNLESS
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
          }
          else {
              if (this.fragment && this.rendered) {
                  if (keep !== true) {
                      this.fragment.unbind().unrender(true);
                  }
                  else {
                      this.unrender(false);
                      this.detached = this.fragment;
                      runloop.promise().then(function () {
                          if (_this.detached)
                              { _this.detach(); }
                      });
                  }
              }
              else if (this.fragment) {
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
      }
      else {
          fragment.render(section.up.findParentNode());
      }
  }

  var RactiveEvent = /** @class */ (function () {
      function RactiveEvent(component, name) {
          this.component = component;
          this.name = name;
          this.handler = null;
      }
      RactiveEvent.prototype.bind = function (directive) {
          var ractive = this.component.instance;
          this.handler = ractive.on(this.name, function () {
              var arguments$1 = arguments;

              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments$1[_i];
              }
              // watch for reproxy
              if (args[0] instanceof Context) {
                  var ctx = args.shift();
                  ctx.component = ractive;
                  directive.fire(ctx, args);
              }
              else {
                  directive.fire({}, args);
              }
              // cancel bubbling
              return false;
          });
      };
      RactiveEvent.prototype.render = function () { };
      RactiveEvent.prototype.unbind = function () {
          this.handler.cancel();
      };
      RactiveEvent.prototype.unrender = function () { };
      return RactiveEvent;
  }());

  var DOMEvent = /** @class */ (function () {
      function DOMEvent(name, owner) {
          if (name.indexOf('*') !== -1) {
              fatal("Only component proxy-events may contain \"*\" wildcards, <" + owner.name + " on-" + name + "=\"...\"/> is not valid");
          }
          this.name = name;
          this.owner = owner;
      }
      DOMEvent.prototype.bind = function () { };
      DOMEvent.prototype.render = function (directive) {
          var _this = this;
          var name = this.name;
          var register = function () {
              var node = _this.owner.node;
              _this.owner.on(name, (_this.handler = function (event) {
                  return directive.fire({
                      node: node,
                      original: event,
                      event: event,
                      name: name
                  });
              }));
          };
          if (name !== 'load') {
              // schedule events so that they take place after twoway binding
              runloop.scheduleTask(register, true);
          }
          else {
              // unless its a load event
              register();
          }
      };
      DOMEvent.prototype.unbind = function () { };
      DOMEvent.prototype.unrender = function () {
          if (this.handler)
              { this.owner.off(this.name, this.handler); }
      };
      return DOMEvent;
  }());
  var CustomEvent = /** @class */ (function () {
      function CustomEvent(eventPlugin, owner, name, args) {
          this.eventPlugin = eventPlugin;
          this.owner = owner;
          this.name = name;
          this.args = args;
          this.handler = null;
      }
      CustomEvent.prototype.bind = function () { };
      CustomEvent.prototype.render = function (directive) {
          var _this = this;
          runloop.scheduleTask(function () {
              var node = _this.owner.node;
              localFragment.f = directive.up;
              _this.handler = _this.eventPlugin.apply(_this.owner.ractive, __spreadArrays([
                  node,
                  function (event) {
                      if (event === void 0) { event = {}; }
                      if (event.original)
                          { event.event = event.original; }
                      else
                          { event.original = event.event; }
                      event.name = _this.name;
                      event.node = event.node || node;
                      return directive.fire(event);
                  }
              ], (_this.args || [])));
              localFragment.f = null;
          });
      };
      CustomEvent.prototype.unbind = function () { };
      CustomEvent.prototype.unrender = function () {
          this.handler.teardown();
      };
      return CustomEvent;
  }());

  var specialPattern = /^(event|arguments|@node|@event|@context)(\..+)?$/;
  var dollarArgsPattern = /^\$(\d+)(\..+)?$/;
  var EventDirective = /** @class */ (function () {
      function EventDirective(options) {
          this.owner = options.owner || options.up.owner || findElement(options.up);
          // TSRChange - changed check using in to avoid errors related to type (attributeByName is present in component and Element)
          this.element = 'attributeByName' in this.owner ? this.owner : findElement(options.up, true);
          this.template = options.template;
          this.up = options.up;
          this.ractive = options.up.ractive;
          this.events = [];
      }
      EventDirective.prototype.bind = function () {
          var _this = this;
          // sometimes anchors will cause an unbind without unrender
          if (this.events.length) {
              this.events.forEach(function (e) { return e.unrender(); });
              this.events = [];
          }
          if (this.element.type === TemplateItemType$1.COMPONENT ||
              this.element.type === TemplateItemType$1.ANCHOR) {
              this.template.n.forEach(function (n) {
                  _this.events.push(new RactiveEvent(_this.element, n));
              });
          }
          else {
              var args_1;
              if ((args_1 = this.template.a)) {
                  var rs = args_1.r.map(function (r) {
                      var model = resolveReference(_this.up, r);
                      return model ? model.get() : undefined;
                  });
                  try {
                      // todo check if passing null as this is necessary for getFunction output
                      // eslint-disable-next-line prefer-spread
                      args_1 = getFunction(args_1.s, rs.length).apply(null, rs);
                  }
                  catch (err) {
                      args_1 = null;
                      warnIfDebug("Failed to compute args for event on-" + this.template.n.join('- ') + ": " + (err.message || err));
                  }
              }
              this.template.n.forEach(function (n) {
                  var fn = findInViewHierarchy('events', _this.ractive, n);
                  if (fn) {
                      _this.events.push(new CustomEvent(fn, _this.element, n, args_1));
                  }
                  else {
                      _this.events.push(new DOMEvent(n, _this.element));
                  }
              });
          }
          // TSRChange - removed it seems not used
          // method calls
          // this.models = null;
          addToArray(this.element.events || (this.element.events = []), this);
          setupArgsFn(this, this.template);
          if (!this.fn) {
              this.action = this.template.f;
          }
          this.events.forEach(function (e) { return e.bind(_this); });
      };
      EventDirective.prototype.destroyed = function () {
          this.events.forEach(function (e) { return e.unrender(); });
      };
      // Unable to find a good way to better define return type of this function
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      EventDirective.prototype.fire = function (event, args) {
          var _this = this;
          if (args === void 0) { args = []; }
          var context = event instanceof Context && event.refire ? event : this.element.getContext(event);
          if (this.fn) {
              var values_1 = [];
              var models = resolveArgs(this, this.template, this.up, {
                  specialRef: function (ref) {
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
                              keys: __spreadArrays([
                                  // TSRChange - added number casting
                                  Number(dollarMatch[1]) - 1
                              ], (dollarMatch[2] ? splitKeypath(dollarMatch[2].substr(1)) : []))
                          };
                      }
                  }
              });
              if (models) {
                  models.forEach(function (model) {
                      if (!model)
                          { return values_1.push(undefined); }
                      // TSRChange - replace `model.special` with in for type checking
                      if ('special' in model) {
                          var which = model.special;
                          var obj = void 0;
                          if (which === '@node') {
                              obj = _this.element.node;
                          }
                          else if (which === '@event') {
                              obj = event === null || event === void 0 ? void 0 : event.event;
                          }
                          else if (which === 'event') {
                              warnOnceIfDebug("The event reference available to event directives is deprecated and should be replaced with @context and @event");
                              obj = context;
                          }
                          else if (which === '@context') {
                              obj = context;
                          }
                          else {
                              obj = args;
                          }
                          var keys = model.keys.slice();
                          while (obj && keys.length)
                              { obj = obj[keys.shift()]; }
                          return values_1.push(obj);
                      }
                      // TSRChange - added instanceof condition
                      if (model instanceof Model && model.wrapper) {
                          return values_1.push(model.wrapperValue);
                      }
                      values_1.push(model.get());
                  });
              }
              // make event available as `this.event`
              var ractive = this.ractive;
              var oldEvent = ractive.event;
              ractive.event = context;
              var returned = this.fn.apply(ractive, values_1);
              var result = returned.pop();
              // Auto prevent and stop if return is explicitly false
              if (result === false) {
                  var original = event ? event.original : undefined;
                  if (original) {
                      original && original.preventDefault();
                      original && original.stopPropagation();
                  }
                  else {
                      warnOnceIfDebug("handler '" + this.template.n.join(' ') + "' returned false, but there is no event available to cancel");
                  }
              }
              else if (!returned.length && isArray(result) && isString(result[0])) {
                  // watch for proxy events
                  result = fireEvent(this.ractive, result.shift(), context, result);
              }
              ractive.event = oldEvent;
              return result;
          }
          else {
              var out = fireEvent(this.ractive, this.action, context, args);
              return out;
          }
      };
      EventDirective.prototype.handleChange = function () { };
      EventDirective.prototype.render = function () {
          var _this = this;
          this.events.forEach(function (e) { return e.render(_this); });
      };
      EventDirective.prototype.toString = function () {
          return '';
      };
      EventDirective.prototype.unbind = function () {
          removeFromArray(this.element.events, this);
          this.events.forEach(function (e) { return e.unbind(); });
      };
      EventDirective.prototype.unrender = function () {
          this.events.forEach(function (e) { return e.unrender(); });
      };
      EventDirective.prototype.firstNode = function () { };
      EventDirective.prototype.rebound = function () { };
      EventDirective.prototype.update = function () { };
      return EventDirective;
  }());
  // TSRChange - move function inside body class
  // const proto = EventDirective.prototype;
  // proto.firstNode = proto.rebound = proto.update = noop;

  var Text = /** @class */ (function (_super) {
      __extends(Text, _super);
      function Text(options) {
          var _this = _super.call(this, options) || this;
          _this.type = TemplateItemType$1.TEXT;
          return _this;
      }
      Text.prototype.detach = function () {
          return detachNode(this.node);
      };
      Text.prototype.firstNode = function () {
          // Override this to avoid clash with default return type since this is a special node
          return this.node;
      };
      Text.prototype.render = function (target, occupants) {
          if (inAttributes())
              { return; }
          this.rendered = true;
          progressiveText(this, target, occupants, this.template);
      };
      Text.prototype.toString = function (escape) {
          return escape ? escapeHtml(this.template) : this.template;
      };
      Text.prototype.unrender = function (shouldDestroy) {
          if (this.rendered && shouldDestroy)
              { this.detach(); }
          this.rendered = false;
      };
      Text.prototype.valueOf = function () {
          return this.template;
      };
      Text.prototype.bind = function () { };
      Text.prototype.unbind = function () { };
      Text.prototype.update = function () { };
      return Text;
  }(Item));

  var elementCache = {};
  var ieBug;
  var ieBlacklist;
  try {
      createElement('table').innerHTML = 'foo';
  }
  catch ( /* istanbul ignore next */err) {
      ieBug = true;
      ieBlacklist = {
          TABLE: ['<table class="x">', '</table>'],
          THEAD: ['<table><thead class="x">', '</thead></table>'],
          TBODY: ['<table><tbody class="x">', '</tbody></table>'],
          TR: ['<table><tr class="x">', '</tr></table>'],
          SELECT: ['<select class="x">', '</select>']
      };
  }
  function insertHtml(html, node) {
      var nodes = [];
      // render 0 and false
      if (html == null || html === '')
          { return nodes; }
      var container;
      var wrapper;
      var selectedOption;
      /* istanbul ignore if */
      if (ieBug && (wrapper = ieBlacklist[node.tagName])) {
          container = element('div');
          container.innerHTML = wrapper[0] + html + wrapper[1];
          container = container.querySelector('.x');
          // TSRChange - replace `container.tagName === 'SELECT'` with instanceof
          if (container instanceof HTMLSelectElement) {
              selectedOption = container.options[container.selectedIndex];
          }
      }
      else if (node.namespaceURI === Namespace$1.svg) {
          container = element('div');
          container.innerHTML = '<svg class="x">' + html + '</svg>';
          container = container.querySelector('.x');
      }
      else if (node.tagName === 'TEXTAREA') {
          container = createElement('div');
          if (typeof container.textContent !== 'undefined') {
              container.textContent = html;
          }
          else {
              container.innerHTML = html;
          }
      }
      else {
          container = element(node.tagName);
          container.innerHTML = html;
          // TSRChange - replace `container.tagName === 'SELECT'` with instanceof
          if (container instanceof HTMLSelectElement) {
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
      if (node.tagName === 'SELECT') {
          var i = nodes.length;
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

  var Triple = /** @class */ (function (_super) {
      __extends(Triple, _super);
      function Triple(options) {
          return _super.call(this, options) || this;
      }
      Triple.prototype.detach = function () {
          var docFrag = createDocumentFragment();
          if (this.nodes)
              { this.nodes.forEach(function (node) { return docFrag.appendChild(node); }); }
          return docFrag;
      };
      Triple.prototype.find = function (selector) {
          var len = this.nodes.length;
          for (var i = 0; i < len; i += 1) {
              var node = this.nodes[i];
              if (node.nodeType !== 1)
                  { continue; }
              if (matches(node, selector))
                  { return node; }
              var queryResult = node.querySelector(selector);
              if (queryResult)
                  { return queryResult; }
          }
          return null;
      };
      Triple.prototype.findAll = function (selector, options) {
          var result = options.result;
          var len = this.nodes.length;
          for (var i = 0; i < len; i += 1) {
              var node = this.nodes[i];
              if (node.nodeType !== 1)
                  { continue; }
              if (matches(node, selector))
                  { result.push(node); }
              var queryAllResult = node.querySelectorAll(selector);
              if (queryAllResult) {
                  // TSRChange - add to array invocation
                  result.push.apply(result, toArray(queryAllResult));
              }
          }
      };
      Triple.prototype.findComponent = function () {
          return null;
      };
      Triple.prototype.firstNode = function () {
          return this.rendered && this.nodes[0];
      };
      Triple.prototype.render = function (target, occupants, anchor) {
          if (!this.nodes) {
              var html = this.model ? this.model.get() : '';
              this.nodes = insertHtml(html, target);
          }
          var nodes = this.nodes;
          // progressive enhancement
          if (occupants) {
              var i = -1;
              var next = void 0;
              // start with the first node that should be rendered
              while (occupants.length && (next = this.nodes[i + 1])) {
                  var n = void 0;
                  // look through the occupants until a matching node is found
                  while ((n = occupants.shift())) {
                      var t = n.nodeType;
                      if (t === next.nodeType &&
                          ((t === 1 && n.outerHTML === next.outerHTML) ||
                              ((t === 3 || t === 8) && n.nodeValue === next.nodeValue))) {
                          this.nodes.splice(++i, 1, n); // replace the generated node with the existing one
                          break;
                      }
                      else {
                          target.removeChild(n); // remove the non-matching existing node
                      }
                  }
              }
              if (i >= 0) {
                  // update the list of remaining nodes to attach, excluding any that were replaced by existing nodes
                  nodes = this.nodes.slice(i);
              }
              // update the anchor to be the next occupant
              if (occupants.length)
                  { anchor = occupants[0]; }
          }
          // attach any remainging nodes to the parent
          if (nodes.length) {
              var frag_1 = createDocumentFragment();
              nodes.forEach(function (n) { return frag_1.appendChild(n); });
              if (anchor) {
                  target.insertBefore(frag_1, anchor);
              }
              else {
                  target.appendChild(frag_1);
              }
          }
          this.rendered = true;
      };
      Triple.prototype.toString = function () {
          var value = this.model && this.model.get();
          value = value != null ? '' + value : '';
          return inAttribute() ? decodeCharacterReferences(value) : value;
      };
      Triple.prototype.unrender = function () {
          if (this.nodes)
              { this.nodes.forEach(function (node) {
                  // defer detachment until all relevant outros are done
                  runloop.detachWhenReady({
                      node: node,
                      detach: function () {
                          detachNode(node);
                      }
                  });
              }); }
          this.rendered = false;
          this.nodes = null;
      };
      Triple.prototype.update = function () {
          if (this.rendered && this.dirty) {
              this.dirty = false;
              this.unrender();
              this.render(this.up.findParentNode(), null, this.up.findNextNode(this));
          }
          else {
              // make sure to reset the dirty flag even if not rendered
              this.dirty = false;
          }
      };
      return Triple;
  }(Mustache));

  var _a;
  var constructors = (_a = {},
      _a[TemplateItemType$1.ALIAS] = Section,
      _a[TemplateItemType$1.ANCHOR] = Component,
      _a[TemplateItemType$1.AWAIT] = Await,
      _a[TemplateItemType$1.DOCTYPE] = Doctype,
      _a[TemplateItemType$1.INTERPOLATOR] = Interpolator,
      _a[TemplateItemType$1.PARTIAL] = Partial,
      _a[TemplateItemType$1.SECTION] = Section,
      _a[TemplateItemType$1.TRIPLE] = Triple,
      _a[TemplateItemType$1.YIELDER] = Partial,
      _a[TemplateItemType$1.ATTRIBUTE] = Attribute,
      _a[TemplateItemType$1.BINDING_FLAG] = BindingFlag,
      _a[TemplateItemType$1.DECORATOR] = Decorator,
      _a[TemplateItemType$1.EVENT] = EventDirective,
      _a[TemplateItemType$1.TRANSITION] = Transition,
      _a[TemplateItemType$1.COMMENT] = Comment,
      _a);
  var specialElements = {
      doctype: Doctype,
      form: Form,
      input: Input,
      option: Option,
      select: Select,
      textarea: Textarea
  };
  // TODO refine types
  function createItem(options) {
      if (isString(options.template)) {
          return new Text(options);
      }
      var ctor;
      var name;
      var type = options.template.t;
      if (type === TemplateItemType$1.ELEMENT) {
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
              }
              else if (isFunction(ctor)) {
                  return new Component(options, ctor);
              }
          }
          ctor = specialElements[name.toLowerCase()] || Element$1;
          return new ctor(options);
      }
      var ItemConstructor;
      // component mappings are a special case of attribute
      if (type === TemplateItemType$1.ATTRIBUTE) {
          var el = options.owner;
          if (!el ||
              (el.type !== TemplateItemType$1.ANCHOR &&
                  el.type !== TemplateItemType$1.COMPONENT &&
                  el.type !== TemplateItemType$1.ELEMENT)) {
              el = findElement(options.up);
          }
          options.element = el;
          ItemConstructor =
              el.type === TemplateItemType$1.COMPONENT || el.type === TemplateItemType$1.ANCHOR
                  ? Mapping
                  : Attribute;
      }
      else {
          ItemConstructor = constructors[type];
      }
      if (!ItemConstructor)
          { throw new Error("Unrecognised item type " + type); }
      return new ItemConstructor(options);
  }

  function resolveAliases(aliases, fragment, dest) {
      if (dest === void 0) { dest = {}; }
      for (var i = 0; i < aliases.length; i++) {
          if (!dest[aliases[i].n]) {
              var m = resolve$1(fragment, aliases[i].x);
              dest[aliases[i].n] = m;
              m.reference();
          }
      }
      return dest;
  }
  var Fragment = /** @class */ (function () {
      function Fragment(options) {
          var _a;
          this.getContext = getContext;
          this.getKeypath = getKeypath;
          this.owner = options.owner;
          this.isRoot = !options.owner.up;
          this.parent = this.isRoot ? null : this.owner.up;
          this.ractive = options.ractive || (this.isRoot ? options.owner : this.parent.ractive);
          this.componentParent =
              this.isRoot && this.ractive.component
                  ? this.ractive.component.up
                  : this.owner.containerFragment || null;
          if (!this.isRoot || this.ractive.delegate) {
              this.delegate = this.owner.containerFragment
                  ? this.owner.containerFragment && this.owner.containerFragment.delegate
                  : (this.componentParent && this.componentParent.delegate) ||
                      (this.parent && this.parent.delegate);
          }
          else {
              this.delegate = false;
          }
          this.context = null;
          this.rendered = false;
          // encapsulated styles should be inherited until they get applied by an element
          if ('cssIds' in options) {
              this.cssIds = ((_a = options.cssIds) === null || _a === void 0 ? void 0 : _a.length) && options.cssIds;
          }
          else {
              this.cssIds = this.parent ? this.parent.cssIds : null;
          }
          this.dirty = false;
          this.dirtyValue = true; // used for attribute values
          this.template = options.template || [];
          this.createItems();
      }
      // LinkModel
      // ExpressionProxy
      // ReferenceExpressionProxy
      // ComputationChild
      // Model
      // RootModel
      Fragment.prototype.bind = function (context) {
          this.context = context;
          if (this.owner.template.z) {
              this.aliases = resolveAliases(this.owner.template.z, this.owner.containerFragment || this.parent);
          }
          var len = this.items.length;
          for (var i = 0; i < len; i++)
              { this.items[i].bind(); }
          this.bound = true;
          // in rare cases, a forced resolution (or similar) will cause the
          // fragment to be dirty before it's even finished binding. In those
          // cases we update immediately
          if (this.dirty)
              { this.update(); }
          return this;
      };
      Fragment.prototype.bubble = function () {
          this.dirtyValue = true;
          if (!this.dirty) {
              this.dirty = true;
              if (this.isRoot) {
                  // TODO encapsulate 'is component root, but not overall root' check?
                  if (this.ractive.component) {
                      this.ractive.component.bubble();
                  }
                  else if (this.bound) {
                      runloop.addFragment(this);
                  }
              }
              else {
                  this.owner.bubble(this.index);
              }
          }
      };
      Fragment.prototype.createItems = function () {
          // this is a hot code path
          var max = this.template.length;
          this.items = [];
          // todo refine items type
          // 'Triple'
          // 'Attribute'
          // 'Textarea'
          // 'Option'
          // 'Select'
          // 'BindingFlag'
          // 'Section'
          // 'Interpolator'
          // 'Input'
          // 'Component'
          // 'Element'
          // 'Partial'
          // 'Text'
          for (var index = 0; index < max; index++) {
              this.items[index] = createItem({
                  up: this,
                  template: this.template[index],
                  index: index
              });
          }
      };
      Fragment.prototype.destroyed = function () {
          var len = this.items.length;
          for (var i = 0; i < len; i++)
              { this.items[i].destroyed(); }
          if (this.pathModel)
              { this.pathModel.destroyed(); }
          if (this.rootModel)
              { this.rootModel.destroyed(); }
      };
      Fragment.prototype.detach = function () {
          var docFrag = createDocumentFragment();
          var xs = this.items;
          var len = xs.length;
          for (var i = 0; i < len; i++) {
              docFrag.appendChild(xs[i].detach());
          }
          return docFrag;
      };
      Fragment.prototype.find = function (selector, options) {
          return findMap(this.items, function (i) { return i.find(selector, options); });
      };
      Fragment.prototype.findAll = function (selector, options) {
          if (this.items) {
              this.items.forEach(function (i) { return i.findAll && i.findAll(selector, options); });
          }
      };
      Fragment.prototype.findComponent = function (name, options) {
          return findMap(this.items, function (i) { return i.findComponent(name, options); });
      };
      Fragment.prototype.findAllComponents = function (name, options) {
          if (this.items) {
              this.items.forEach(function (i) { return i.findAllComponents && i.findAllComponents(name, options); });
          }
      };
      Fragment.prototype.findContext = function () {
          var base = findParentWithContext(this);
          if (!base || !base.context)
              { return this.ractive.viewmodel; }
          else
              { return base.context; }
      };
      Fragment.prototype.findNextNode = function (item) {
          // search for the next node going forward
          if (item) {
              var it = void 0;
              for (var i = item.index + 1; i < this.items.length; i++) {
                  it = this.items[i];
                  if (!it || !it.firstNode)
                      { continue; }
                  var node = it.firstNode(true);
                  if (node)
                      { return node; }
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
          if (this.parent)
              { return this.owner.findNextNode(this); } // the argument is in case the parent is a RepeatedFragment
      };
      Fragment.prototype.findParentNode = function () {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          var fragment = this;
          do {
              if (fragment.owner.type === TemplateItemType$1.ELEMENT) {
                  return fragment.owner.node;
              }
              if (fragment.isRoot && !fragment.ractive.component) {
                  // TODO encapsulate check
                  return fragment.ractive.el;
              }
              if (fragment.owner.type === TemplateItemType$1.YIELDER) {
                  fragment = fragment.owner.containerFragment;
              }
              else {
                  fragment = fragment.componentParent || fragment.parent; // TODO ugh
              }
          } while (fragment);
          throw new Error('Could not find parent node'); // TODO link to issue tracker
      };
      Fragment.prototype.firstNode = function (skipParent) {
          var node = findMap(this.items, function (i) { return i.firstNode(true); });
          if (node)
              { return node; }
          if (skipParent)
              { return null; }
          return this.parent.findNextNode(this.owner);
      };
      Fragment.prototype.getKey = function () {
          return this.keyModel || (this.keyModel = new KeyModel(this.key));
      };
      Fragment.prototype.getIndex = function () {
          return this.idxModel || (this.idxModel = new KeyModel(this.index));
      };
      Fragment.prototype.rebind = function (next) {
          this.context = next;
          if (this.rootModel)
              { this.rootModel.context = this.context; }
          if (this.pathModel)
              { this.pathModel.context = this.context; }
      };
      Fragment.prototype.rebound = function (update) {
          if (this.owner.template.z) {
              var aliases = this.aliases;
              for (var k in aliases) {
                  if ('rebound' in aliases[k]) {
                      aliases[k].rebound(update);
                  }
                  else {
                      aliases[k].unreference();
                      aliases[k] = null;
                  }
              }
              resolveAliases(this.owner.template.z, this.owner.containerFragment || this.parent, aliases);
          }
          this.items.forEach(function (x) { return x.rebound(update); });
          if (update) {
              if (this.rootModel)
                  { this.rootModel.applyValue(this.context.getKeypath(this.ractive.root)); }
              if (this.pathModel)
                  { this.pathModel.applyValue(this.context.getKeypath()); }
          }
      };
      Fragment.prototype.render = function (target, occupants) {
          if (this.rendered)
              { throw new Error('Fragment is already rendered!'); }
          this.rendered = true;
          var xs = this.items;
          var len = xs.length;
          for (var i = 0; i < len; i++) {
              xs[i].render(target, occupants);
          }
      };
      Fragment.prototype.resetTemplate = function (template) {
          var wasBound = this.bound;
          var wasRendered = this.rendered;
          // TODO ensure transitions are disabled globally during reset
          if (wasBound) {
              if (wasRendered)
                  { this.unrender(true); }
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
                  }
                  else {
                      this.render(parentNode);
                  }
              }
          }
      };
      Fragment.prototype.shuffled = function () {
          this.items.forEach(shuffled);
          if (this.rootModel)
              { this.rootModel.applyValue(this.context.getKeypath(this.ractive.root)); }
          if (this.pathModel)
              { this.pathModel.applyValue(this.context.getKeypath()); }
      };
      Fragment.prototype.toString = function (escape) {
          return this.items.map(escape ? toEscapedString : toString$1).join('');
      };
      Fragment.prototype.unbind = function (view) {
          if (this.owner.template.z && !this.owner.yielder) {
              for (var k in this.aliases) {
                  this.aliases[k].unreference();
              }
              this.aliases = {};
          }
          this.context = null;
          var len = this.items.length;
          for (var i = 0; i < len; i++)
              { this.items[i].unbind(view); }
          this.bound = false;
          return this;
      };
      Fragment.prototype.unrender = function (shouldDestroy) {
          var len = this.items.length;
          for (var i = 0; i < len; i++)
              { this.items[i].unrender(shouldDestroy); }
          this.rendered = false;
      };
      Fragment.prototype.update = function () {
          if (this.dirty) {
              if (!this.updating) {
                  this.dirty = false;
                  this.updating = true;
                  var len = this.items.length;
                  for (var i = 0; i < len; i++)
                      { this.items[i].update(); }
                  this.updating = false;
              }
              else if (this.isRoot) {
                  runloop.addFragmentToRoot(this);
              }
          }
      };
      Fragment.prototype.valueOf = function () {
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
      return Fragment;
  }());
  function getKeypath(root) {
      var base = findParentWithContext(this);
      var model;
      if (root) {
          if (!this.rootModel) {
              this.rootModel = new KeyModel(this.context.getKeypath(this.ractive.root), this.context, this.ractive.root);
              model = this.rootModel;
          }
          else
              { return this.rootModel; }
      }
      else {
          if (!this.pathModel) {
              this.pathModel = new KeyModel(this.context.getKeypath(), this.context);
              model = this.pathModel;
          }
          else
              { return this.pathModel; }
      }
      if (base && base.context)
          { base.getKeypath(root).registerChild(model); }
      return model;
  }
  function isFragment(item) {
      return item instanceof Fragment;
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
      if (fragment)
          { fragment.bind(ractive.viewmodel); }
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
                      warnOnceIfDebug('Promise debugging is enabled, to help solve errors that happen asynchronously. Some browsers will log unhandled promise rejections, in which case you can safely disable promise debugging:\n  Ractive.DEBUG_PROMISES = false;');
                      warnIfDebug('An error happened during rendering', { ractive: ractive });
                      logIfDebug(err);
                      throw err;
                  });
              }
          }
      }
  }
  function createFragment$1(ractive, options) {
      if (options === void 0) { options = {}; }
      if (ractive.template) {
          var cssIds = __spreadArrays((ractive.constructor._cssIds || []), (options.cssIds || []));
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
          throw new Error('You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first');
      }
      if (ractive.destroyed) {
          ractive.destroyed = false;
          ractive.fragment = createFragment$1(ractive).bind(ractive.viewmodel);
      }
      var anchorNode = getElement(anchor) || ractive.anchor;
      ractive.el = ractive.target = target;
      ractive.anchor = anchorNode;
      // ensure encapsulated CSS is up-to-date
      if (ractive.cssId)
          { applyCSS(); }
      if (target) {
          (target.__ractive_instances__ || (target.__ractive_instances__ = [])).push(ractive);
          if (anchorNode) {
              var docFrag = doc.createDocumentFragment();
              ractive.fragment.render(docFrag);
              target.insertBefore(docFrag, anchorNode);
          }
          else {
              ractive.fragment.render(target, occupants);
          }
      }
      runloop.end();
      ractive.rendering = false;
      return promise.then(function () {
          if (ractive.torndown)
              { return; }
          hooks.complete.fire(ractive);
      });
  }

  // TODO anchor is not documented so it's required?
  function Ractive$render(target, anchor) {
      if (this.torndown) {
          warnIfDebug('ractive.render() was called on a Ractive instance that was already torn down');
          return Promise.resolve();
      }
      var _target = (getElement(target) || this.el);
      if (!this.append && _target) {
          // Teardown any existing instances *before* trying to set up the new one -
          // avoids certain weird bugs
          var others = _target.__ractive_instances__;
          if (others)
              { others.forEach(teardown); }
          // make sure we are the only occupants
          if (!this.enhance) {
              _target.innerHTML = ''; // TODO is this quicker than removeChild? Initial research inconclusive
          }
      }
      var occupants = this.enhance ? toArray(_target.childNodes) : null;
      var promise = render$1(this, _target, anchor, occupants);
      if (occupants) {
          while (occupants.length)
              { _target.removeChild(occupants.pop()); }
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
      }
      else {
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
          if (isItemType(item, TemplateItemType$1.PARTIAL) &&
              (item.refName === name || item.name === name)) {
              // TSRChange - it seems that this property is not used inside partial class
              // item.inAttribute = attr;
              dest.push(item);
              return; // go no further
          }
          // if it has a fragment, process its items
          // TSRChange - add in guard
          if ('fragment' in item && item.fragment) {
              collect$1(item.fragment.iterations || item.fragment.items, name, attr, dest);
          }
          else if (isFragment(item) && isArray(item.items)) {
              // or if it is itself a fragment, process its items
              collect$1(item.items, name, attr, dest);
          }
          else if (isItemType(item, TemplateItemType$1.COMPONENT) && item.instance) {
              // or if it is a component, step in and process its items
              // ...unless the partial is shadowed
              if (item.instance.partials[name])
                  { return; }
              collect$1(item.instance.fragment.items, name, attr, dest);
          }
          // if the item is an element, process its attributes too
          if (isItemType(item, TemplateItemType$1.ELEMENT)) {
              if (isArray(item.attributes)) {
                  collect$1(item.attributes, name, true, dest);
              }
          }
      });
  }
  function Ractive$resetPartial(name, partial) {
      var collection = [];
      collect$1(this.fragment.items, name, false, collection);
      var promise = runloop.start();
      this.partials[name] = partial;
      collection.forEach(handleChange);
      runloop.end();
      return promise;
  }

  var templateConfigurator = {
      name: 'template',
      extend: function (_Parent, proto, options) {
          // only assign if exists
          if ('template' in options) {
              var template = options.template;
              if (isFunction(template)) {
                  proto.template = template;
              }
              else {
                  proto.template = parseTemplate(template, proto);
              }
          }
      },
      init: function (Parent, ractive, options) {
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
      reset: function (ractive) {
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
          parse: function (template, options) {
              if (options === void 0) { options = parser.getParseOptions(ractive); }
              return parser.parse(template, options);
          }
      });
  }
  function parseTemplate(template, ractive) {
      var parsed;
      if (isString(template)) {
          // parse will validate and add expression functions
          parsed = parseAsString(template, ractive);
      }
      else {
          // need to validate and add exp for already parsed template
          validate$1(template);
          parsed = template;
          addFunctions(parsed);
      }
      return parsed;
  }
  function parseAsString(template, ractive) {
      // ID of an element containing the template?
      if (typeof template === 'string' && template[0] === '#') {
          template = parser.fromId(template);
      }
      return parser.parseFor(template, ractive);
  }
  function validate$1(template) {
      // Check that the template even exists
      if (template == undefined) {
          throw new Error("The template cannot be " + template + ".");
      }
      // Check the parsed template has a version at all
      if (isObject(template) && !isNumber(template.v)) {
          throw new Error("The template parser was passed a non-string template, but the template doesn't have a version.  Make sure you're passing in the template you think you are.");
      }
      // Check we're using the correct version
      if (isObject(template) && template.v !== TEMPLATE_VERSION) {
          throw new Error("Mismatched template version (expected " + TEMPLATE_VERSION + ", got " + template.v + ") Please ensure you are using the latest version of Ractive.js in your build process as well as in your app");
      }
  }
  function extendPartials(existingPartials, newPartials, overwrite) {
      if (!newPartials)
          { return; }
      // TODO there's an ambiguity here - we need to overwrite in the `reset()`
      // case, but not initially...
      for (var key in newPartials) {
          if (overwrite || !hasOwn(existingPartials, key)) {
              existingPartials[key] = newPartials[key];
          }
      }
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
      if (component)
          { component.shouldDestroy = true; }
      this.unrender();
      if (component)
          { component.shouldDestroy = false; }
      var promise = runloop.start();
      // remove existing fragment and create new one
      this.fragment.unbind().unrender(true);
      this.fragment = new Fragment({
          template: this.template,
          // TSRChange - it seems that `root` prop do not exists on fragment
          // root: this,
          owner: this
      });
      var docFrag = createDocumentFragment();
      this.fragment.bind(this.viewmodel).render(docFrag);
      // if this is a component, its el may not be valid, so find a
      // target based on the component container
      if (component && !component.external) {
          this.fragment.findParentNode().insertBefore(docFrag, component.findNextNode());
      }
      else {
          this.el.insertBefore(docFrag, this.anchor);
      }
      runloop.end();
      this.transitionsEnabled = transitionsEnabled;
      return promise;
  }

  var Ractive$reverse = makeArrayMethod('reverse').path;

  function Ractive$set(keypath, value, options) {
      var opts = isObjectType(keypath) ? value : options;
      return set(build(this, keypath, value, opts === null || opts === void 0 ? void 0 : opts.isolated), opts);
  }

  var Ractive$shift = makeArrayMethod('shift').path;

  var Ractive$sort = makeArrayMethod('sort').path;

  var Ractive$splice = makeArrayMethod('splice').path;

  function Ractive$subtract(keypath, d, options) {
      var num = isNumber(d) ? -d : -1;
      var opts = isObjectType(d) ? d : options;
      return add(this, keypath, num, opts);
  }

  function Ractive$toCSS() {
      var cssIds = __spreadArrays([this.cssId], this.findAllComponents().map(function (c) { return c.cssId; }));
      // TODO consider to use Set to get unique items
      var uniqueCssIds = keys(cssIds.reduce(function (ids, id) { return ((ids[id] = true), ids); }, {}));
      return getCSS(uniqueCssIds);
  }

  // TODO add options to documentation
  function Ractive$toggle(keypath, options) {
      if (!isString(keypath)) {
          throw new TypeError(badArguments);
      }
      return set(gather(this, keypath, null, options && options.isolated).map(function (m) { return [m, !m.get()]; }), options);
  }

  function Ractive$toHTML() {
      return this.fragment.toString(true);
  }

  function Ractive$toText() {
      return this.fragment.toString(false);
  }

  function Ractive$transition(name, node, params) {
      if (node instanceof HTMLElement) ;
      else if (isObject(node)) {
          // omitted, use event node
          params = node;
      }
      // if we allow query selector, then it won't work
      // simple params like "fast"
      // else if ( typeof node === 'string' ) {
      // 	// query selector
      // 	node = this.find( node )
      // }
      var _node = (node || this.event.node);
      if (!_node || !_node._ractive) {
          fatal("No node was supplied for transition " + name);
      }
      params = params || {};
      var owner = _node._ractive.proxy;
      var transition = new Transition({ owner: owner, up: owner.up, name: name, params: params });
      transition.bind();
      var promise = runloop.start();
      runloop.registerTransition(transition);
      runloop.end();
      promise.then(function () { return transition.unbind(); });
      return promise;
  }

  function Ractive$unlink(keypath) {
      var promise = runloop.start();
      this.viewmodel.joinAll(splitKeypath(keypath), { lastLink: false }).unlink();
      runloop.end();
      return promise;
  }

  function Ractive$unrender() {
      var _a;
      if (!this.fragment.rendered) {
          warnIfDebug('ractive.unrender() was called on a Ractive instance that was not rendered');
          return Promise.resolve();
      }
      this.unrendering = true;
      var promise = runloop.start();
      hooks.unrendering.fire(this);
      // If this is a component, and the component isn't marked for destruction,
      // don't detach nodes from the DOM unnecessarily
      var shouldDestroy = !this.component || ((_a = this.component.anchor) === null || _a === void 0 ? void 0 : _a.shouldDestroy) ||
          this.component.shouldDestroy ||
          this.shouldDestroy;
      this.fragment.unrender(shouldDestroy);
      if (shouldDestroy)
          { this.destroyed = true; }
      removeFromArray(this.el.__ractive_instances__, this);
      hooks.unrender.fire(this);
      runloop.end();
      this.unrendering = false;
      return promise;
  }

  var Ractive$unshift = makeArrayMethod('unshift').path;

  function Ractive$updateModel(keypath, cascade) {
      var promise = runloop.start();
      if (!keypath) {
          this.viewmodel.updateFromBindings(true);
      }
      else {
          this.viewmodel.joinAll(splitKeypath(keypath)).updateFromBindings(cascade !== false);
      }
      runloop.end();
      return promise;
  }

  function Ractive$use() {
      var arguments$1 = arguments;

      var _this = this;
      var plugins = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          plugins[_i] = arguments$1[_i];
      }
      plugins.forEach(function (p) {
          p({
              proto: _this,
              Ractive: _this.constructor,
              instance: _this
          });
      });
      return this;
  }

  var proto = {
      add: Ractive$add,
      animate: Ractive$animate,
      attachChild: Ractive$attachChild,
      compute: Ractive$compute,
      detach: Ractive$detach,
      detachChild: Ractive$detachChild,
      find: Ractive$find,
      findAll: Ractive$findAll,
      findAllComponents: Ractive$findAllComponents,
      findComponent: Ractive$findComponent,
      findContainer: Ractive$findContainer,
      findParent: Ractive$findParent,
      fire: Ractive$fire,
      get: Ractive$get,
      getLocalContext: Ractive$getLocalContext,
      getContext: Ractive$getContext,
      insert: Ractive$insert,
      link: Ractive$link,
      observe: Ractive$observe,
      observeOnce: Ractive$observeOnce,
      off: Ractive$off,
      on: Ractive$on,
      once: Ractive$once,
      pop: Ractive$pop,
      push: Ractive$push,
      readLink: Ractive$readLink,
      render: Ractive$render,
      reset: Ractive$reset,
      resetPartial: Ractive$resetPartial,
      resetTemplate: Ractive$resetTemplate,
      reverse: Ractive$reverse,
      set: Ractive$set,
      shift: Ractive$shift,
      sort: Ractive$sort,
      splice: Ractive$splice,
      subtract: Ractive$subtract,
      teardown: Ractive$teardown,
      toggle: Ractive$toggle,
      toCSS: Ractive$toCSS,
      toCss: Ractive$toCSS,
      toHTML: Ractive$toHTML,
      toHtml: Ractive$toHTML,
      toText: Ractive$toText,
      transition: Ractive$transition,
      unlink: Ractive$unlink,
      unrender: Ractive$unrender,
      unshift: Ractive$unshift,
      update: Ractive$update,
      updateModel: Ractive$updateModel,
      use: Ractive$use
  };

  var adaptConfiguration = {
      extend: function (_Parent, proto, options) {
          proto.adapt = combine(proto.adapt, ensureArray(options.adapt));
      },
      init: function () { }
  };

  var selectorsPattern = /(?:^|\}|\{|\x01)\s*([^\{\}\0\x01]+)\s*(?=\{)/g;
  var importPattern = /@import\s*\([^)]*\)\s*;?/gi;
  var importEndPattern = /\x01/g;
  var keyframesDeclarationPattern = /@keyframes\s+[^\{\}]+\s*\{(?:[^{}]+|\{[^{}]+})*}/gi;
  var selectorUnitPattern = /((?:(?:\[[^\]]+\])|(?:[^\s\+\>~:]))+)((?:::?[^\s\+\>\~\(:]+(?:\([^\)]+\))?)*\s*[\s\+\>\~]?)\s*/g;
  var excludePattern = /^(?:@|\d+%)/;
  var dataRvcGuidPattern = /\[data-ractive-css~="\{[a-z0-9-]+\}"]/g;
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
      }
      else {
          transformed = cleanCss(css, function (css, reconstruct) {
              css = css
                  .replace(importPattern, '$&\x01')
                  .replace(selectorsPattern, function (match, $1) {
                  // don't transform at-rules and keyframe declarations
                  if (excludePattern.test($1))
                      { return match; }
                  var selectors = $1.split(',').map(trim);
                  var transformed = selectors.map(function (selector) { return transformSelector(selector, dataAttr); }).join(', ') + ' ';
                  return match.replace($1, transformed);
              })
                  .replace(importEndPattern, '');
              return reconstruct(css);
          }, [keyframesDeclarationPattern]);
      }
      return transformed;
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
          if (!def || (def && def.applied))
              { applyCSS(true); }
      }
      return local || child;
  }
  function recomputeCSS(component) {
      var css = component.css;
      if (!isFunction(css))
          { return; }
      var def = component._cssDef;
      var result = evalCSS(component, css);
      var styles = def.transform ? transformCss(result, def.id) : result;
      if (def.styles === styles)
          { return; }
      def.styles = styles;
      return true;
  }

  var CSSModel = /** @class */ (function (_super) {
      __extends(CSSModel, _super);
      function CSSModel(component) {
          var _this = _super.call(this, component.cssData, '@style') || this;
          _this.component = component;
          return _this;
      }
      CSSModel.prototype.downstreamChanged = function (path, depth) {
          if (this.locked)
              { return; }
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

  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  function uuid() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  // TODO complete refactor
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
          if (options.css)
              { initCSS(options, Child, proto); }
      },
      // Called when creating a new component instance
      init: function (_Parent, _target, options) {
          if (!options.css)
              { return; }
          warnIfDebug("\nThe css option is currently not supported on a per-instance basis and will be discarded. Instead, we recommend instantiating from a component definition with a css option.\n\nconst Component = Ractive.extend({\n\t...\n\tcss: '/* your css */',\n\t...\n});\n\nconst componentInstance = new Component({ ... })\n\t\t");
      }
  };
  function gatherIds(start) {
      var cmp = start;
      var ids = [];
      while (cmp) {
          if (cmp.prototype.cssId)
              { ids.push(cmp.prototype.cssId); }
          cmp = cmp.Parent;
      }
      return ids;
  }
  function evalCSS(component, css) {
      if (isString(css))
          { return css; }
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
      var css = options.css === true
          ? ''
          : isString(options.css) && !hasCurly.test(options.css)
              ? getElement(options.css) || options.css
              : options.css;
      var cssProp;
      var id = options.cssId || uuid();
      if (isObjectType(css)) {
          css = 'textContent' in css ? css.textContent : css.innerHTML;
          cssProp = css;
      }
      else if (isFunction(css)) {
          cssProp = css;
          css = evalCSS(target, css);
      }
      else {
          cssProp = css;
      }
      var def = {
          // TODO remove `noCssTransform` code?
          transform: 'noCSSTransform' in options ? !options.noCSSTransform : !options.noCssTransform
      };
      defineProperty(target, '_cssDef', { configurable: true, value: def });
      defineProperty(target, 'css', {
          get: function () {
              return cssProp;
          },
          set: function (next) {
              cssProp = next;
              var css = evalCSS(target, cssProp);
              var styles = def.styles;
              def.styles = def.transform ? transformCss(css, id) : css;
              if (def.applied && styles !== def.styles)
                  { applyCSS(true); }
          }
      });
      def.styles = def.transform ? transformCss(css, id) : css;
      def.id = proto.cssId = id;
      target._cssIds.push(id);
      addCSS(target._cssDef);
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

  function getMessage(deprecated, correct, isError) {
      return ("options." + deprecated + " has been deprecated in favour of options." + correct + "." +
          (isError ? " You cannot specify both options, please use options." + correct + "." : ''));
  }
  function deprecateOption(options, deprecatedOption, correct) {
      if (deprecatedOption in options) {
          if (!(correct in options)) {
              warnIfDebug(getMessage(deprecatedOption, correct));
              options[correct] = options[deprecatedOption];
          }
          else {
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

  var registryNames$1 = [
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
  var Registry = /** @class */ (function () {
      function Registry(name, useDefaults) {
          this.name = name;
          this.useDefaults = useDefaults;
      }
      Registry.prototype.extend = function (Parent, proto, options) {
          var parent = this.useDefaults ? Parent.defaults : Parent;
          var target = this.useDefaults ? proto : proto.constructor;
          this.configure(parent, target, options);
      };
      Registry.prototype.init = function () {
          // noop
      };
      Registry.prototype.configure = function (Parent, target, options) {
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
      Registry.prototype.reset = function (ractive) {
          var registry = ractive[this.name];
          var changed = false;
          keys(registry).forEach(function (key) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              var item = registry[key];
              // component and partials
              if (item._fn) {
                  if (item._fn.isOwner) {
                      registry[key] = item._fn;
                  }
                  else {
                      delete registry[key];
                  }
                  changed = true;
              }
          });
          return changed;
      };
      return Registry;
  }());
  var registries = registryNames$1.map(function (name) {
      var putInDefaults = registriesOnDefaults.indexOf(name) > -1;
      return new Registry(name, putInDefaults);
  });

  function wrap$1(parent, name, method) {
      // TSRChange - add `toString` to method
      if (!/_super/.test(method.toString()))
          { return method; }
      function wrapper() {
          var arguments$1 = arguments;

          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments$1[_i];
          }
          var superMethod = getSuperMethod(wrapper._parent, name);
          var hasSuper = '_super' in this;
          var oldSuper = this._super;
          this._super = superMethod;
          var result = method.apply(this, args);
          if (hasSuper) {
              this._super = oldSuper;
          }
          else {
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
          var value_1 = parent[name];
          return isFunction(value_1) ? value_1 : function () { return value_1; };
      }
      return noop;
  }

  var config = {
      extend: function (Parent, proto, options, Child) { return configure('extend', Parent, proto, options, Child); },
      init: function (Parent, ractive, options) { return configure('init', Parent, ractive, options); },
      reset: function (ractive) {
          return order.filter(function (c) { return c.reset && c.reset(ractive); }).map(function (c) { return c.name; });
      }
  };
  var custom = {
      adapt: adaptConfiguration,
      computed: config,
      css: cssConfigurator,
      data: dataConfigurator,
      helpers: config,
      template: templateConfigurator
  };
  var defaultKeys = keys(defaults);
  var isStandardKey = makeObj(defaultKeys.filter(function (key) { return !custom[key]; }));
  // blacklisted keys that we don't double extend
  var isBlacklisted = makeObj(__spreadArrays(defaultKeys, registries.map(function (r) { return r.name; }), [
      'on',
      'observe',
      'attributes',
      'cssData',
      'use'
  ]));
  var order = __spreadArrays(defaultKeys.filter(function (key) { return !registries[key] && !custom[key]; }), registries, [
      //custom.data,
      custom.template,
      custom.css
  ]);
  function configure(method, Parent, target, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options, Child) {
      deprecate(options);
      for (var key in options) {
          if (hasOwn(isStandardKey, key)) {
              var value = options[key];
              // warn the developer if they passed a function and ignore its value
              // NOTE: we allow some functions on "el" because we duck type element lists
              // and some libraries or ef'ed-up virtual browsers (phantomJS) return a
              // function object as the result of querySelector methods
              if (key !== 'el' && isFunction(value)) {
                  warnIfDebug(key + " is a Ractive option that does not expect a function and will be ignored", method === 'init' ? target : null);
              }
              else {
                  target[key] = value;
              }
          }
      }
      // disallow combination of `append` and `enhance`
      if (target.append && target.enhance) {
          throw new Error('Cannot use append and enhance at the same time');
      }
      registries.forEach(function (registry) {
          registry[method](Parent, target, options);
      });
      adaptConfiguration[method](Parent, target, options);
      templateConfigurator[method](Parent, target, options);
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
                  if ((key in proto ||
                      (key.slice(0, 2) === 'on' && key.slice(2) in hooks && key in target)) &&
                      !_super.test(member.toString())) {
                      warnIfDebug("Overriding Ractive prototype function '" + key + "' without calling the '" + _super + "' method can be very dangerous.");
                  }
                  member = wrap$1(parent, key, member);
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

  // todo change return value to `object is Ractive`
  function isInstance(object) {
      return object && object instanceof this;
  }

  function sharedGet(keypath, opts) {
      return SharedModel$1.joinAll(splitKeypath(keypath)).get(true, opts);
  }

  function sharedSet(keypath, value, options) {
      var opts = isObjectType(keypath) ? value : options;
      var model = SharedModel$1;
      return set(build({ viewmodel: model }, keypath, value, true), opts);
  }

  function styleGet(keypath, opts) {
      return this._cssModel.joinAll(splitKeypath(keypath)).get(true, opts);
  }

  var styles = [];
  function addStyle(id, css) {
      if (styles.find(function (s) { return s.id === id; }))
          { throw new Error("Extra styles with the id '" + id + "' have already been added."); }
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
          .map(function (s) { return "\n/* ---- extra style " + s.id + " */\n" + (isFunction(s.css) ? s.css(data) : s.css); })
          .join('');
  }
  function hasStyle(id) {
      return !!styles.find(function (s) { return s.id === id; });
  }

  function use() {
      var arguments$1 = arguments;

      var _this = this;
      var plugins = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          plugins[_i] = arguments$1[_i];
      }
      plugins.forEach(function (p) {
          if (isFunction(p)) {
              p({
                  proto: _this.prototype,
                  Ractive: _this.Ractive,
                  instance: _this
              });
          }
      });
      return this;
  }

  var callsSuper = /super\s*\(|\.call\s*\(\s*this/;
  function extend() {
      var arguments$1 = arguments;

      var options = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          options[_i] = arguments$1[_i];
      }
      if (!options.length) {
          return extendOne(this);
      }
      else {
          return options.reduce(function (acc, option) {
              return extendOne(acc, option);
          }, this);
      }
  }
  function extendWith(Class, options) {
      return extendOne(this, options, Class);
  }
  function extendOne(Parent, options, Target) {
      if (options === void 0) { options = {}; }
      var proto;
      var Child = isFunction(Target) && Target;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (options.prototype instanceof Ractive) {
          throw new Error("Ractive no longer supports multiple inheritance.");
      }
      if (Child) {
          if (!(Child.prototype instanceof Parent)) {
              throw new Error("Only classes that inherit the appropriate prototype may be used with extend");
          }
          if (!callsSuper.test(Child.toString())) {
              throw new Error("Only classes that call super in their constructor may be used with extend");
          }
          proto = Child.prototype;
      }
      else {
          Child = function (options) {
              if (!(this instanceof Child))
                  { return new Child(options); }
              if (options && options.component === true)
                  { return; }
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
          use: { value: use },
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
          var attrs = void 0;
          // allow an array of optional props or an object with arrays for optional and required props
          if (isArray(options.attributes)) {
              attrs = { optional: options.attributes, required: [] };
          }
          else {
              attrs = options.attributes;
          }
          // make sure the requisite keys actually store arrays
          if (!isArray(attrs.required))
              { attrs.required = []; }
          if (!isArray(attrs.optional))
              { attrs.optional = []; }
          Child.attributes = attrs;
      }
      dataConfigurator.extend(Parent, proto, options);
      defineProperty(Child, 'helpers', { writable: true, value: proto.helpers });
      if (isArray(options.use))
          { Child.use.apply(Child, options.use); }
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
      if (!isFunction(fn))
          { throw new Error("The macro must be a function"); }
      var macro = fn;
      assign(macro, opts);
      defineProperties(macro, {
          extensions: { value: [] },
          _cssIds: { value: [] },
          cssData: { value: assign(create(this.cssData), macro.cssData || {}) },
          styleGet: { value: styleGet.bind(macro) },
          styleSet: { value: setCSSData.bind(macro) }
      });
      defineProperty(macro, '_cssModel', { value: new CSSModel(macro) });
      // TODO make the function support macro
      if (macro.css)
          { initCSS(macro, macro, macro); }
      this.extensions.push(macro);
      return macro;
  }

  /** This function is exposed but it seems not documented */
  function findPlugin(name, type, instance) {
      return findInViewHierarchy(type, instance, name);
  }

  function Ractive(options) {
      if (!(this instanceof Ractive))
          { return new Ractive(options); }
      if (options && options.component)
          { return; }
      construct(this, options || {});
      initialise(this, options || {}, {});
  }
  // check to see if we're being asked to force Ractive as a global for some weird environments
  if (win && !win.Ractive) {
      var opts = '';
      var script = document.currentScript ||
          /* istanbul ignore next */ document.querySelector('script[data-ractive-options]');
      if (script)
          { opts = script.getAttribute('data-ractive-options') || ''; }
      /* istanbul ignore next */
      if (~opts.indexOf('ForceGlobal'))
          { win.Ractive = Ractive; }
  }
  else if (win) {
      warn("Ractive already appears to be loaded while loading 2.0.0-edge.");
  }
  assign(Ractive.prototype, proto, defaults);
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
      use: { value: use },
      // support
      enhance: { writable: true, value: false },
      svg: { value: svg },
      tick: {
          get: function () {
              return batch && batch.promise;
          }
      },
      // version
      VERSION: { value: '2.0.0-edge' },
      // plugins
      adaptors: { writable: true, value: {} },
      components: { writable: true, value: {} },
      decorators: { writable: true, value: {} },
      easing: { writable: true, value: Easings },
      events: { writable: true, value: {} },
      extensions: { value: [] },
      helpers: { writable: true, value: defaults.helpers },
      interpolators: { writable: true, value: interpolators },
      partials: { writable: true, value: {} },
      transitions: { writable: true, value: {} },
      // CSS variables
      cssData: { configurable: true, value: {} },
      perComponentStyleElements: { get: splitTag, set: splitTag },
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
      get: function () {
          return this.fragment && this.fragment.rendered;
      }
  });

  return Ractive;

})));
//# sourceMappingURL=ractive.js.map
